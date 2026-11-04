// Lehçe duyarlı, küçük bir SQL sözcük çözümleyici (DOM'a bağımlı değil).
// Küçültme ve sözdizimi renklendirmesi bunu kullanır. Amaç sorguyu anlamak değil; dizeleri, tırnaklı adları ve
// yorumları doğru sınırlarıyla bulmaktır. Böylece tırnak içindeki ";" ya da "--" asla bölünmez veya silinmez.

/** Kapatılmamış dize/yorum hatası; pos girdideki başlangıç konumudur (0 tabanlı). */
export class LexError extends Error {
  constructor(kind, pos, open) {
    super(kind);
    this.kind = kind; // 'quote' | 'comment' | 'dollar'
    this.pos = pos;
    this.open = open;
  }
}

// Satır başında tek başına duran istemci komutları: kendi satırlarında kalmalıdır.
const RE_GO = /GO(?:[ \t]+\d+)?[ \t]*(?=\r?\n|$|--)/iy;            // T-SQL toplu iş ayırıcısı
const RE_SLASH = /\/[ \t]*(?=\r?\n|$)/y;                            // SQL*Plus PL/SQL blok sonlandırıcısı
const RE_DELIMITER = /DELIMITER[ \t]+\S+[ \t]*(?=\r?\n|$)/iy;       // MySQL istemcisi ayraç komutu

const RE_WS = /\s+/y;
const RE_WORD = /[\p{L}\p{M}\p{N}_@$#]+/uy;
const RE_WORD_NOHASH = /[\p{L}\p{M}\p{N}_@$]+/uy;
const RE_DOLLAR = /\$(?:[\p{L}_][\p{L}\p{N}_]*)?\$/uy;
const RE_QQUOTE = /[nN]?[qQ]'/y;
const PAIRS = { '[': ']', '{': '}', '(': ')', '<': '>' };

/** Lehçeye göre sözcük kuralları (biçimlendirme kütüphanesinin sql-formatter 15.9.0 tokenizer ayarlarıyla uyumlu). */
export function rulesFor(dialect) {
  const d = String(dialect || 'sql');
  const mysqlLike = d === 'mysql' || d === 'mariadb';
  const dqString = mysqlLike || d === 'bigquery' || d === 'spark';
  return {
    hash: mysqlLike || d === 'bigquery',                               // # satır yorumu
    slashSlash: d === 'snowflake',                                      // // satır yorumu
    mysqlDash: mysqlLike,                                               // MySQL'de "--" ardından boşluk gelirse yorumdur
    // '...' dizelerinde \' kaçışı. Standart SQL ve Snowflake de kütüphanede ''-qq-bs'dir; aksi hâlde
    // 'it\'s -- x' gibi bir dizenin kalanı yorum sanılıp küçültmede sessizce silinirdi.
    backslash: dqString || d === 'sql' || d === 'snowflake',
    dqString,                                                           // "..." dize mi (MySQL/BigQuery/Spark), yoksa tırnaklı ad mı
    brackets: d === 'transactsql' || d === 'sqlite',                    // [köşeli parantezli ad]
    dollar: d === 'postgresql' || d === 'redshift' || d === 'snowflake', // $$dize$$ / $etiket$dize$etiket$
    estring: d === 'postgresql' || d === 'redshift',                    // E'..\n..'
    nested: d === 'postgresql' || d === 'transactsql',                  // iç içe /* /* */ */
    qquote: d === 'plsql',                                              // q'[...]'
    triple: d === 'bigquery',                                           // '''...''' ve """..."""
    lineRe: d === 'transactsql' ? RE_GO : d === 'plsql' ? RE_SLASH : mysqlLike ? RE_DELIMITER : null,
  };
}

/** q ile açılan tırnaklı bölümün bitiş konumunu (kapanıştan sonraki indeks) döndürür; yoksa -1. */
function quotedEnd(text, i, q, backslash) {
  let j = i + 1;
  let bs = backslash ? text.indexOf('\\', j) : -1;
  for (;;) {
    const k = text.indexOf(q, j);
    if (k < 0) return -1;
    if (backslash) {
      if (bs !== -1 && bs < j) bs = text.indexOf('\\', j);
      if (bs !== -1 && bs < k) { j = bs + 2; bs = text.indexOf('\\', j); continue; }
    }
    if (text[k + 1] === q) { j = k + 2; continue; } // '' ya da "" ya da ]] : kaçırılmış tırnak
    return k + 1;
  }
}

/** BigQuery üçlü tırnaklı dize sonu. */
function tripleEnd(text, i, c) {
  const t = c + c + c;
  let j = i + 3;
  for (;;) {
    const k = text.indexOf(t, j);
    if (k < 0) return -1;
    let b = 0;
    for (let p = k - 1; p >= i + 3 && text[p] === '\\'; p--) b++;
    if (b % 2 === 1) { j = k + 1; continue; }
    return k + 3;
  }
}

/** Blok yorum sonu; nested ise iç içe yorumları sayar. */
function blockEnd(text, i, nested) {
  if (!nested) {
    const k = text.indexOf('*/', i + 2);
    return k < 0 ? -1 : k + 2;
  }
  let depth = 1;
  let j = i + 2;
  while (depth > 0) {
    const close = text.indexOf('*/', j);
    if (close < 0) return -1;
    const open = text.indexOf('/*', j);
    if (open >= 0 && open < close) { depth++; j = open + 2; } else { depth--; j = close + 2; }
  }
  return j;
}

function lineEnd(text, i) {
  const k = text.indexOf('\n', i);
  return k < 0 ? text.length : k;
}

/**
 * Belirteç üreteci. Her belirteç { type, start, end }:
 * ws, comment, hint (/*+ ... *\/ ve /*! ... *\/ — anlam taşıdığı için korunur), string, qident, number, var, word, punct, line.
 */
export function* lex(text, rules) {
  const r = rules || rulesFor('sql');
  const n = text.length;
  const wordRe = r.hash ? RE_WORD_NOHASH : RE_WORD;
  let i = 0;
  let lineStart = true;
  const at = (re) => { re.lastIndex = i; const m = re.exec(text); return m ? m[0] : null; };

  while (i < n) {
    const c = text[i];
    const c2 = text[i + 1];
    let type;
    let end;

    if (lineStart && r.lineRe) {
      const m = at(r.lineRe);
      if (m) {
        yield { type: 'line', start: i, end: i + m.length };
        i += m.length;
        lineStart = false;
        continue;
      }
    }

    if (c === ' ' || c === '\n' || c === '\t' || c === '\r' || /\s/.test(c)) {
      const m = at(RE_WS);
      end = i + m.length;
      if (m.includes('\n')) lineStart = true;
      yield { type: 'ws', start: i, end };
      i = end;
      continue;
    }
    lineStart = false;

    if (c === '-' && c2 === '-' && (!r.mysqlDash || i + 2 >= n || /[\s\x00-\x1f]/.test(text[i + 2]))) {
      type = 'comment'; end = lineEnd(text, i);
    } else if (c === '#' && r.hash) {
      type = 'comment'; end = lineEnd(text, i);
    } else if (c === '/' && c2 === '/' && r.slashSlash) {
      type = 'comment'; end = lineEnd(text, i);
    } else if (c === '/' && c2 === '*') {
      end = blockEnd(text, i, r.nested);
      if (end < 0) throw new LexError('comment', i, '/*');
      type = text[i + 2] === '+' || text[i + 2] === '!' ? 'hint' : 'comment';
    } else if (c === "'" || c === '"') {
      // "..." tırnaklı ad ise ters bölü kaçışı yoktur (yalnızca "" ikilenir).
      const bs = c === "'" ? r.backslash : r.dqString;
      end = r.triple && text.startsWith(c + c + c, i) ? tripleEnd(text, i, c) : quotedEnd(text, i, c, bs);
      if (end < 0) throw new LexError('quote', i, c);
      type = c === "'" || r.dqString ? 'string' : 'qident';
    } else if (c === '`') {
      end = quotedEnd(text, i, '`', false);
      if (end < 0) throw new LexError('quote', i, c);
      type = 'qident';
    } else if (c === '[' && r.brackets) {
      end = quotedEnd(text, i, ']', false);
      if (end < 0) throw new LexError('quote', i, c);
      type = 'qident';
    } else if (c === '$' && r.dollar && at(RE_DOLLAR)) {
      const tag = at(RE_DOLLAR);
      const k = text.indexOf(tag, i + tag.length);
      if (k < 0) throw new LexError('dollar', i, tag);
      type = 'string'; end = k + tag.length;
    } else if (r.qquote && (c === 'q' || c === 'Q' || c === 'n' || c === 'N') && at(RE_QQUOTE)) {
      const k = i + at(RE_QQUOTE).length;
      const d = text[k];
      const close = d === undefined ? -1 : text.indexOf((PAIRS[d] || d) + "'", k + 1);
      if (close < 0) throw new LexError('quote', i, text.slice(i, k + 1));
      type = 'string'; end = close + 2;
    } else if (r.estring && (c === 'e' || c === 'E') && c2 === "'") {
      end = quotedEnd(text, i + 1, "'", true);
      if (end < 0) throw new LexError('quote', i, "E'");
      type = 'string';
    } else {
      const m = at(wordRe);
      if (m) {
        end = i + m.length;
        type = c >= '0' && c <= '9' ? 'number' : c === '@' || (c === '$' && /^\$\d/.test(m)) ? 'var' : 'word';
      } else {
        end = i + 1; type = 'punct';
      }
    }
    yield { type, start: i, end };
    i = end;
  }
}

const NO_SPACE_AFTER = new Set(['(', ',', ';']);
const NO_SPACE_BEFORE = new Set([')', ',', ';']);

// MySQL istemcisi özel ayracı (DELIMITER // ya da $$) yalnızca dize/yorum dışında arar; ayraç bir sözcüğün
// içinde de başlayabilir (ör. END$$), bu yüzden kod belirteçlerinin her konumuna bakılır.
const CODE = new Set(['word', 'punct', 'number', 'var']);
function delimiterArg(line) {
  return line.trim().split(/\s+/)[1] || ';';
}
function delimAt(text, t, delim, from) {
  if (!CODE.has(t.type)) return -1;
  const d0 = delim.charCodeAt(0);
  for (let p = Math.max(t.start, from); p < t.end; p++) {
    if (text.charCodeAt(p) === d0 && text.startsWith(delim, p)) return p;
  }
  return -1;
}

/**
 * MySQL/MariaDB betiğini DELIMITER satırlarına göre parçalar (biçimlendirme kütüphanesi DELIMITER'ı tanımaz;
 * "END //" ayracını "/ /" diye bölüp sonraki DELIMITER satırına yapıştırırdı). Döndürür:
 *   { kind: 'line', text }                         — DELIMITER satırı, olduğu gibi
 *   { kind: 'sql', text, start, delim, closed }    — ayraç hariç SQL; ";" bölgeleri tek parça, özel ayraçlı
 *                                                    bölgeler ifade ifade. closed: parça ayraçla bitti mi.
 */
export function splitByDelimiter(text, dialect) {
  const parts = [];
  let delim = ';';
  let from = 0;
  const pushSql = (end, closed) => {
    if (end > from || closed) parts.push({ kind: 'sql', text: text.slice(from, end), start: from, delim, closed });
  };
  for (const t of lex(text, rulesFor(dialect))) {
    if (t.end <= from) continue; // ayracın parçası olan belirteç
    if (t.type === 'line') {
      const v = text.slice(t.start, t.end).trim();
      if (!/^DELIMITER/i.test(v)) continue;
      pushSql(t.start, false);
      parts.push({ kind: 'line', text: v });
      delim = delimiterArg(v);
      from = t.end;
      continue;
    }
    if (delim === ';') continue;
    for (let q = delimAt(text, t, delim, from); q !== -1; q = delimAt(text, t, delim, from)) {
      pushSql(q, true);
      from = q + delim.length;
    }
  }
  pushSql(text.length, false);
  return parts;
}

/** Metnin son anlamlı belirteci satır yorumu mu (-- ya da #)? Öyleyse arkasına aynı satırda ayraç yazılamaz. */
export function endsWithLineComment(text, dialect) {
  let last = null;
  try {
    for (const t of lex(text, rulesFor(dialect))) if (t.type !== 'ws') last = t;
  } catch { return true; }
  return !!last && last.type === 'comment' && text[last.start] !== '/';
}

/**
 * Yorumları ve fazla boşlukları kaldırır; dize, tırnaklı ad ve optimizer ipuçlarına dokunmaz.
 * Boşluk yalnızca "(" sonrasında, ")" "," ";" çevresinde tamamen silinir; diğer yerlerde tek boşluğa iner
 * (iki belirteç asla birleşmez, ör. "- -1" "--1" olmaz). GO, "/" ve DELIMITER satırları kendi satırında kalır.
 * build=false ise yalnızca ifade sayısını döndürür. onProgress(oran) büyük girdilerde arada beklenir.
 */
export async function minifySql(text, dialect, { onProgress = null, build = true } = {}) {
  const r = rulesFor(dialect);
  const out = [];
  let space = false;
  let prev = null;
  let statements = 0;
  let pending = false;
  let count = 0;
  let delim = ';';   // MySQL DELIMITER ile değişen ifade ayracı (yalnızca sayım için)
  let after = 0;     // özel ayracın bittiği konum
  for (const t of lex(text, r)) {
    if (t.type === 'ws' || t.type === 'comment') { space = true; continue; }
    const v = text.slice(t.start, t.end);
    if (t.type === 'line') {
      if (build) {
        if (prev !== null && prev !== '\n') out.push('\n');
        out.push(v.trim(), '\n');
      }
      if (/^DELIMITER/i.test(v)) { delim = delimiterArg(v); after = 0; }
      else if (pending) { statements++; pending = false; }
      prev = '\n'; space = false;
      continue;
    }
    if (build) {
      if (space && prev !== null && prev !== '\n' && !NO_SPACE_AFTER.has(prev) && !NO_SPACE_BEFORE.has(v)) out.push(' ');
      out.push(v);
    }
    prev = v; space = false;
    if (delim === ';') {
      if (v === ';') { if (pending) { statements++; pending = false; } } else pending = true;
    } else if (t.end > after) {
      // Özel ayraç bölgesi: yordam gövdesindeki ";" ifadeyi bitirmez, yalnızca ayraç bitirir.
      const q = delimAt(text, t, delim, after);
      if (q === -1) pending = true;
      else {
        if (pending || q > Math.max(t.start, after)) statements++;
        after = q + delim.length;
        pending = after < t.end;
      }
    }
    if (onProgress && ++count % 50000 === 0) await onProgress(t.end / text.length);
  }
  if (pending) statements++;
  return { text: build ? out.join('').replace(/\n+$/, '') : '', statements };
}

/** 0 tabanlı konumu 1 tabanlı satır/sütuna çevirir. */
export function lineCol(text, pos) {
  let line = 1;
  let last = -1;
  for (let k = text.indexOf('\n'); k !== -1 && k < pos; k = text.indexOf('\n', k + 1)) { line++; last = k; }
  return { line, col: pos - last };
}

/** 1 tabanlı satır/sütunu 0 tabanlı konuma çevirir. */
export function posOf(text, line, col) {
  let p = 0;
  for (let l = 1; l < line; l++) {
    const k = text.indexOf('\n', p);
    if (k < 0) return text.length;
    p = k + 1;
  }
  return Math.min(text.length, p + Math.max(0, col - 1));
}
