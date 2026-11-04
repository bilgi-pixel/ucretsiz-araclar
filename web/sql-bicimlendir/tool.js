// SQL Biçimlendirici ve Küçültücü — sorgu yalnızca tarayıcıda işlenir; sunucuya gönderilmez ve ÇALIŞTIRILMAZ.
// Biçimlendirme: sql-formatter 15.9.0 (MIT, web/vendor/) ayrı bir Web Worker içinde; worker açılamazsa ana iş parçacığında.
// Küçültme ve renklendirme: sql-lex.js (lehçe duyarlı; dize ve yorum sınırlarını doğru bulur).
// Kullanıcı girdisi hiçbir yerde innerHTML ile basılmaz; renklendirme textContent ile kurulan <span>'lardır.
import { createDropzone, showError, formatBytes, downloadBlob, baseName, setProgress, tick, loadScript } from '../assets/js/ba.js';
import { lex, rulesFor, minifySql, splitByDelimiter, endsWithLineComment, LexError, lineCol, posOf } from './sql-lex.js';

const $ = (id) => document.getElementById(id);
const VENDOR_URL = new URL('../vendor/sql-formatter@15.9.0/sql-formatter.min.js', import.meta.url).href;
const WORKER_URL = new URL('format-worker.js', import.meta.url);
const WARN_SIZE = 5 * 1024 * 1024;      // üstünde "yavaşlayabilir" notu
const BIG_FILE = 50 * 1024 * 1024;      // üstünde belirgin uyarı
const HL_LIMIT = 300 * 1024;            // bu boyuttan büyük çıktıda renklendirme yapılmaz
const PROGRESS_FROM = 20 * 1024;        // bu boyuttan küçük girdide ilerleme çubuğu gösterilmez
const COUNT_LIMIT = 2 * 1024 * 1024;    // biçimlendirmede ifade sayımı bu boyuta kadar yapılır

const tool = $('tool');
const input = $('input');
const output = $('output');
const prog = $('progress');

let outText = '';
let outMode = '';         // 'format' | 'minify'
let fileBase = 'sorgu';
let busy = false;

const SAMPLE = `-- Örnek: şehir bazında sipariş toplamı (İ ve ; içeren dize bozulmaz)
select m.ad, m.şehir, count(*) as siparis_sayisi, sum(s.tutar) as toplam from musteri m join siparis s on s.musteri_id = m.id where s.tarih >= '2026-01-01' and m.not_alani <> 'İsmail; -- test' group by m.ad, m.şehir having sum(s.tutar) > 1000 order by toplam desc;
/* ikinci ifade:
   pasif müşterileri işaretle */
update musteri set aktif = 0 where son_siparis < '2025-01-01' and id not in (select musteri_id from siparis);`;

/* ---------- Mesajlar ---------- */
function showInfo(msg) {
  const el = $('info');
  el.textContent = msg || '';
  el.hidden = !msg;
}
function clearMessages() {
  showError($('error'), '');
  showInfo('');
}
function hideResult() {
  const r = $('result');
  r.classList.remove('is-active');
  r.hidden = true;
  $('out-wrap').hidden = true;
}

/* ---------- Seçenekler ---------- */
function buildOptions(dialect) {
  const kc = $('opt-case').value;
  const indent = $('opt-indent').value;
  const all = $('opt-case-all').checked;
  return {
    language: dialect,
    keywordCase: kc,
    dataTypeCase: all ? kc : 'preserve',
    functionCase: all ? kc : 'preserve',
    tabWidth: indent === 'tab' ? 4 : Number(indent),
    useTabs: indent === 'tab',
    linesBetweenQueries: Number($('opt-lines').value),
  };
}

/* ---------- Biçimlendirme işçisi ---------- */
let worker = null;
let workerBroken = false;
let job = null;
let seq = 0;

function ensureWorker() {
  if (worker || workerBroken) return worker;
  try {
    worker = new Worker(WORKER_URL);
    worker.onmessage = (e) => {
      const d = e.data;
      if (job && d.id === job.id) { const j = job; job = null; j.resolve(d); }
    };
    worker.onerror = (e) => {
      // Worker yüklenemedi (ör. kısıtlı ortam): ana iş parçacığına geç.
      if (e && e.preventDefault) e.preventDefault();
      if (worker) worker.terminate();
      worker = null;
      workerBroken = true;
      if (job) { const j = job; job = null; j.fallback(); }
    };
  } catch {
    worker = null;
    workerBroken = true;
  }
  return worker;
}

async function formatOnMain(text, options) {
  await loadScript(VENDOR_URL);
  try {
    return { ok: true, out: window.sqlFormatter.format(text, options) };
  } catch (err) {
    return { ok: false, message: String((err && err.message) || err).split('\n')[0] };
  }
}

function formatSql(text, options) {
  const w = ensureWorker();
  if (!w) return formatOnMain(text, options);
  return new Promise((resolve, reject) => {
    const id = ++seq;
    job = { id, resolve, reject, fallback: () => formatOnMain(text, options).then(resolve, reject) };
    w.postMessage({ id, text, options });
  });
}

const MYSQL_LIKE = new Set(['mysql', 'mariadb']);
const RE_HAS_DELIMITER = /^[ \t]*DELIMITER[ \t]+\S+[ \t]*\r?$/im;

/**
 * MySQL/MariaDB betiğinde DELIMITER varsa parça parça biçimlendirir: kütüphane DELIMITER'ı tanımadığı için
 * "END //" ayracını "/ /" diye bölüp sonraki DELIMITER satırına yapıştırır ve betik çalışmaz hâle gelirdi.
 * DELIMITER satırları olduğu gibi kalır, özel ayraç her ifadenin sonuna geri yazılır.
 */
async function formatScript(text, dialect, options) {
  let parts = null;
  if (MYSQL_LIKE.has(dialect) && RE_HAS_DELIMITER.test(text)) {
    try { parts = splitByDelimiter(text, dialect); } catch { parts = null; }
  }
  if (!parts || !parts.some((p) => p.kind === 'line')) return formatSql(text, options);
  const sep = '\n'.repeat(options.linesBetweenQueries + 1);
  let out = '';
  let prevLine = null;
  for (const p of parts) {
    let piece;
    if (p.kind === 'line') piece = p.text;
    else {
      if (!p.text.trim()) continue;
      const res = await formatSql(p.text, options);
      if (!res.ok) return { ok: false, message: res.message, offset: p.start, seg: p.text };
      piece = res.out;
      // Satır yorumuyla biten ifadede ayraç yorumun içine düşmesin diye alt satıra yazılır.
      if (p.closed) piece += (endsWithLineComment(piece, dialect) ? '\n' : ' ') + p.delim;
    }
    if (prevLine !== null) out += prevLine ? '\n' : sep;
    out += piece;
    prevLine = p.kind === 'line';
  }
  return { ok: true, out };
}

function cancelJob() {
  if (!job) return;
  const j = job;
  job = null;
  if (worker) { worker.terminate(); worker = null; }
  j.reject(new Error('cancel'));
}

/* ---------- Hata açıklamaları ---------- */
function selectInInput(pos) {
  input.focus();
  input.setSelectionRange(pos, Math.min(input.value.length, pos + 1));
}

/** seg/offset: hata, metnin offset konumundan başlayan seg parçasında oluştuysa (DELIMITER'lı betik). */
function formatErrorText(message, text, offset = 0, seg = null) {
  const m = /line (\d+) column (\d+)/i.exec(message);
  let where = '';
  let pos = -1;
  if (m) {
    if (seg === null) {
      where = `Satır ${m[1]}, sütun ${m[2]}: `;
      pos = posOf(text, Number(m[1]), Number(m[2]));
    } else {
      pos = offset + posOf(seg, Number(m[1]), Number(m[2]));
      const lc = lineCol(text, pos);
      where = `Satır ${lc.line}, sütun ${lc.col}: `;
    }
  }
  const unexpected = /Unexpected "([^"]{0,40})/.exec(message);
  let why;
  if (/EOF/.test(message)) why = 'Sorgu beklenmedik biçimde bitti; kapatılmamış bir parantez ya da yarım kalmış bir ifade olabilir.';
  else if (unexpected && /^['"`[]/.test(unexpected[1])) why = 'Kapatılmamış bir tırnak ya da köşeli parantez var gibi görünüyor.';
  else if (unexpected) why = `"${unexpected[1].trim().split(/\s+/)[0]}" bu konumda ve seçili lehçede beklenmiyor.`;
  else why = 'Sorgu seçili lehçeye göre ayrıştırılamadı.';
  if (pos >= 0) selectInInput(pos);
  return `${where}${why} Doğru lehçeyi seçtiğinizden emin olun, parantez ve tırnakları kontrol edin. Girdiniz değiştirilmedi.`;
}

function lexErrorText(err, text) {
  const { line, col } = lineCol(text, err.pos);
  selectInInput(err.pos);
  const where = `Satır ${line}, sütun ${col}: `;
  if (err.kind === 'comment') return `${where}Kapatılmamış çok satırlı yorum (/* … */) var. Yorumu */ ile kapatın ya da silin. Girdiniz değiştirilmedi.`;
  if (err.kind === 'dollar') return `${where}Kapatılmamış dolar tırnaklı dize (${err.open}) var. Dizeyi aynı etiketle kapatın. Girdiniz değiştirilmedi.`;
  return `${where}Kapatılmamış tırnak (${err.open}) var. Dizeyi ya da tırnaklı adı kapatın veya fazladan tırnağı silin; doğru lehçeyi seçtiğinizden de emin olun. Girdiniz değiştirilmedi.`;
}

/* ---------- Sözdizimi renklendirme (textContent tabanlı) ---------- */
const KEYWORDS = new Set((
  'SELECT FROM WHERE AND OR NOT IN IS NULL AS ON JOIN LEFT RIGHT INNER OUTER FULL CROSS NATURAL GROUP BY ORDER HAVING LIMIT OFFSET ' +
  'INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE ALTER DROP ADD COLUMN INDEX VIEW PRIMARY KEY FOREIGN REFERENCES UNIQUE DEFAULT ' +
  'CHECK CONSTRAINT DISTINCT UNION ALL EXCEPT INTERSECT MINUS CASE WHEN THEN ELSE END EXISTS BETWEEN LIKE ILIKE WITH RECURSIVE ASC DESC ' +
  'TOP FETCH NEXT ROWS ROW ONLY FIRST RETURNING BEGIN COMMIT ROLLBACK TRANSACTION DECLARE IF WHILE LOOP RETURN RETURNS PROCEDURE ' +
  'FUNCTION TRIGGER REPLACE TRUNCATE GRANT REVOKE USING OVER PARTITION WINDOW CAST TRUE FALSE MERGE MATCHED DATABASE SCHEMA EXEC ' +
  'EXECUTE GO USE SHOW DESCRIBE EXPLAIN LATERAL QUALIFY PIVOT UNPIVOT IGNORE DUPLICATE CONFLICT DO NOTHING TEMPORARY TEMP ' +
  'AUTO_INCREMENT COLLATE OUTPUT INTERVAL ANY SOME FOR EACH DELIMITER'
).split(' '));

function classFor(type, value) {
  switch (type) {
    case 'comment': case 'hint': return 'sq-com';
    case 'string': return 'sq-str';
    case 'qident': return 'sq-id';
    case 'number': return 'sq-num';
    case 'var': return 'sq-var';
    case 'line': return 'sq-kw';
    // toUpperCase() yerel ayardan bağımsızdır: 'insert' → 'INSERT' (Türkçe 'İNSERT' değil).
    case 'word': return KEYWORDS.has(value.toUpperCase()) ? 'sq-kw' : '';
    default: return '';
  }
}

/** Çıktıyı <pre> içine yazar; renklendirme açık ve çıktı küçükse belirteçleri <span> ile sarar. */
function renderOutput(text, dialect) {
  output.textContent = '';
  const wantHl = $('opt-hl').checked;
  if (!wantHl || text.length > HL_LIMIT) {
    output.textContent = text;
    return wantHl; // true → renklendirme boyut nedeniyle atlandı
  }
  const frag = document.createDocumentFragment();
  try {
    let plain = '';
    const flush = () => { if (plain) { frag.appendChild(document.createTextNode(plain)); plain = ''; } };
    for (const t of lex(text, rulesFor(dialect))) {
      const v = text.slice(t.start, t.end);
      const cls = classFor(t.type, v);
      if (!cls) { plain += v; continue; }
      flush();
      const span = document.createElement('span');
      span.className = cls;
      span.textContent = v;
      frag.appendChild(span);
    }
    flush();
    output.appendChild(frag);
  } catch {
    output.textContent = text;
  }
  return false;
}

/* ---------- Çıktı ---------- */
function countLines(s) {
  let n = 1;
  for (let k = s.indexOf('\n'); k !== -1; k = s.indexOf('\n', k + 1)) n++;
  return n;
}

function setOutput(text, mode, dialect, inText, statements) {
  outText = text;
  outMode = mode;
  const skipped = renderOutput(text, dialect);
  const a = new Blob([inText]).size;
  const b = new Blob([text]).size;
  const parts = [];
  if (mode === 'format') {
    parts.push(`${countLines(text).toLocaleString('tr-TR')} satır`);
  } else {
    const saved = a ? Math.max(0, Math.round((1 - b / a) * 100)) : 0;
    parts.push(`%${saved} küçüldü`);
  }
  if (statements !== null && statements !== undefined) parts.push(`${statements.toLocaleString('tr-TR')} ifade`);
  parts.push(`${formatBytes(a)} → ${formatBytes(b)}`);
  let info = parts.join(' · ') + '.';
  if (skipped) info += ' Çıktı büyük olduğu için renklendirme kapatıldı.';
  $('result-title').textContent = mode === 'format' ? 'SQL biçimlendirildi' : 'SQL küçültüldü';
  $('result-info').textContent = info;
  $('out-label').textContent = mode === 'format' ? 'Biçimlendirilmiş SQL' : 'Küçültülmüş SQL';
  $('out-wrap').hidden = false;
  const r = $('result');
  r.hidden = false;
  r.classList.add('is-active');
}

/* ---------- Ana işlem ---------- */
async function run(mode) {
  if (busy) return;
  clearMessages();
  $('copied').textContent = '';
  let text = input.value;
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  if (!text.trim()) {
    hideResult();
    showInfo('Biçimlendirilecek SQL yok. Sorgunuzu kutuya yapıştırın, bir .sql dosyası seçin ya da "Örnek SQL" düğmesiyle deneyin.');
    return;
  }
  const dialect = $('opt-dialect').value;
  const big = text.length > PROGRESS_FROM;
  busy = true;
  tool.setAttribute('aria-busy', 'true');
  try {
    if (mode === 'format') {
      if (big) {
        setProgress(prog, 35, 'Biçimlendiriliyor… Büyük sorgularda birkaç saniye sürebilir.');
        $('btn-cancel').hidden = false;
        await tick();
      }
      const res = await formatScript(text, dialect, buildOptions(dialect));
      if (!res.ok) {
        hideResult();
        showError($('error'), formatErrorText(res.message, text, res.offset, res.seg ?? null));
        return;
      }
      let statements = null;
      if (text.length <= COUNT_LIMIT) {
        try { statements = (await minifySql(text, dialect, { build: false })).statements; } catch { statements = null; }
      }
      if (big) setProgress(prog, 100, 'Tamamlandı');
      setOutput(res.out, 'format', dialect, text, statements);
    } else {
      const onProgress = big ? async (p) => { setProgress(prog, Math.round(p * 100), `Küçültülüyor… %${Math.round(p * 100)}`); await tick(); } : null;
      if (big) { setProgress(prog, 0, 'Küçültülüyor…'); await tick(); }
      const res = await minifySql(text, dialect, { onProgress });
      if (!res.text) {
        hideResult();
        showInfo('Sorguda yorum ve boşluk dışında içerik bulunamadı; küçültülmüş çıktı boş olurdu. Girdinizi kontrol edin.');
        return;
      }
      if (big) setProgress(prog, 100, 'Tamamlandı');
      setOutput(res.text, 'minify', dialect, text, res.statements);
    }
    // DELIMITER yalnızca MySQL/MariaDB lehçesinde tanınır; başka lehçede satır korunmaz ve betik bozulur.
    if (!MYSQL_LIKE.has(dialect) && RE_HAS_DELIMITER.test(text)) {
      showInfo('Betikte MySQL DELIMITER komutu var. Bu satırların ve // ya da $$ gibi özel ayraçların korunması için lehçe olarak MySQL ya da MariaDB seçin.');
    }
  } catch (err) {
    hideResult();
    if (err && err.message === 'cancel') showInfo('İşlem iptal edildi. Girdiniz olduğu gibi duruyor.');
    else if (err instanceof LexError) showError($('error'), lexErrorText(err, text));
    else showError($('error'), 'Biçimlendirme kütüphanesi yüklenemedi ya da beklenmeyen bir hata oluştu. Sayfayı yenileyip tekrar deneyin; çevrimdışı kullanıyorsanız sayfayı bir kez internete bağlıyken açın.');
  } finally {
    busy = false;
    tool.removeAttribute('aria-busy');
    $('btn-cancel').hidden = true;
    setTimeout(() => { if (!busy) setProgress(prog, null); }, big ? 600 : 0);
  }
}

/* ---------- Kopyala / indir ---------- */
async function copyOut() {
  if (!outText) { showError($('error'), 'Kopyalanacak çıktı yok. Önce "Biçimlendir" ya da "Küçült" düğmesine basın.'); return; }
  showError($('error'), '');
  try {
    await navigator.clipboard.writeText(outText);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = outText;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    if (!ok) {
      showError($('error'), 'Panoya kopyalanamadı. Çıktı kutusundaki metni seçip Ctrl+C (Mac\'te Cmd+C) ile kopyalayın ya da .sql olarak indirin.');
      return;
    }
  }
  $('copied').textContent = 'Kopyalandı';
  setTimeout(() => { $('copied').textContent = ''; }, 2500);
}

function downloadOut() {
  if (!outText) { showError($('error'), 'İndirilecek çıktı yok. Önce "Biçimlendir" ya da "Küçült" düğmesine basın.'); return; }
  showError($('error'), '');
  const body = outText.endsWith('\n') ? outText : `${outText}\n`;
  const name = outMode === 'minify' ? `${fileBase}.min.sql` : `${fileBase}.sql`;
  downloadBlob(new Blob([body], { type: 'application/sql;charset=utf-8' }), name);
}

/* ---------- Dosya okuma (FileReader) ---------- */
function readBuffer(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(fr.error);
    fr.readAsArrayBuffer(file);
  });
}

/** BOM'a göre çözer; BOM yoksa UTF-8 dener, geçersizse Türkçe Windows kodlamasına (1254) düşer. */
function decodeSql(buf) {
  const b = new Uint8Array(buf);
  if (b[0] === 0xFF && b[1] === 0xFE) return { text: new TextDecoder('utf-16le').decode(b.subarray(2)), utf16: true };
  if (b[0] === 0xFE && b[1] === 0xFF) return { text: new TextDecoder('utf-16be').decode(b.subarray(2)), utf16: true };
  const body = b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF ? b.subarray(3) : b;
  // İkili veri denetimi: düz metin SQL dosyasında NUL baytı bulunmaz.
  const head = body.subarray(0, 65536);
  if (head.includes(0)) return { binary: true };
  try {
    return { text: new TextDecoder('utf-8', { fatal: true }).decode(body) };
  } catch {
    return { text: new TextDecoder('windows-1254').decode(body), legacy: true };
  }
}

async function loadFile(files) {
  const f = files[0];
  if (!f) return;
  clearMessages();
  showError($('warning'), '');
  if (f.size > BIG_FILE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı uzun süre meşgul edebilir ve metin kutusu yavaşlayabilir. Mümkünse dosyayı parçalara bölün ya da güçlü bir bilgisayarda deneyin.`);
  else if (f.size > WARN_SIZE) showError($('warning'), `Dosya ${formatBytes(f.size)}; 5 MB üstünde işlem birkaç saniye sürebilir ve renklendirme kapatılır.`);
  try {
    const dec = decodeSql(await readBuffer(f));
    if (dec.binary) {
      showError($('error'), `"${f.name}" düz metin bir SQL dosyası gibi görünmüyor (ikili veri içeriyor). Veritabanı yedeği (.bak, .mdf) ya da sıkıştırılmış bir dosya olabilir; .sql veya .txt uzantılı metin dosyası seçin. Kutudaki metin değiştirilmedi.`);
      return;
    }
    input.value = dec.text.charCodeAt(0) === 0xFEFF ? dec.text.slice(1) : dec.text;
    fileBase = baseName(f.name) || 'sorgu';
    $('file-name').textContent = `${f.name} (${formatBytes(f.size)})`;
    hideResult();
    if (dec.legacy) showInfo('Dosya UTF-8 değil; Türkçe Windows kodlaması (Windows-1254) varsayılarak okundu. Karakterler bozuk görünüyorsa dosyayı UTF-8 olarak kaydedip yeniden seçin.');
    ensureWorker();
  } catch {
    showError($('error'), 'Dosya okunamadı. Dosyanın başka bir programda açık ya da kilitli olmadığını kontrol edip yeniden seçin.');
  }
}

/* ---------- Olaylar ---------- */
createDropzone({ el: $('drop'), accept: '.sql,.txt,.ddl,.pgsql,.psql,.tsql,.mysql,application/sql,text/plain', multiple: false, onFiles: loadFile });

input.addEventListener('input', () => {
  if (input.value.length > WARN_SIZE) showError($('warning'), 'Metin 5 MB üstünde; işlemler birkaç saniye sürebilir ve renklendirme kapatılır.');
  else showError($('warning'), '');
});
// Kütüphaneyi kullanıcı yazmaya başlayınca hazırla; ilk tıklama beklemesin.
input.addEventListener('focus', () => { ensureWorker(); }, { once: true });
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(e.shiftKey ? 'minify' : 'format'); }
});

$('btn-format').addEventListener('click', () => run('format'));
$('btn-minify').addEventListener('click', () => run('minify'));
$('btn-cancel').addEventListener('click', cancelJob);
$('btn-copy').addEventListener('click', copyOut);
$('btn-download').addEventListener('click', downloadOut);
$('btn-sample').addEventListener('click', () => {
  input.value = SAMPLE;
  fileBase = 'ornek';
  $('file-name').textContent = '';
  clearMessages();
  showError($('warning'), '');
  hideResult();
  input.focus();
});
$('btn-clear').addEventListener('click', () => {
  input.value = '';
  outText = '';
  outMode = '';
  fileBase = 'sorgu';
  output.textContent = '';
  $('file-name').textContent = '';
  clearMessages();
  showError($('warning'), '');
  hideResult();
  input.focus();
});

// Seçenek değişince son işlem yeniden uygulanır; renklendirme yalnızca yeniden çizilir.
for (const id of ['opt-dialect', 'opt-case', 'opt-indent', 'opt-lines', 'opt-case-all']) {
  $(id).addEventListener('change', () => { if (outMode && !$('out-wrap').hidden && !busy) run(outMode); });
}
$('opt-hl').addEventListener('change', () => {
  if (outText && !$('out-wrap').hidden) {
    const skipped = renderOutput(outText, $('opt-dialect').value);
    if (skipped && !/renklendirme kapatıldı/.test($('result-info').textContent)) $('result-info').textContent += ' Çıktı büyük olduğu için renklendirme kapatıldı.';
  }
});

tool.dataset.ready = '1';
