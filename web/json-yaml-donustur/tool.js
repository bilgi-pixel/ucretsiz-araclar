// JSON ⇄ YAML Dönüştürücü — js-yaml 4.3.2 (MIT) yerel kopyasıyla çalışır. Metin tarayıcıdan çıkmaz,
// hiçbir ağ isteği yapılmaz. Çıktı ekrana yalnızca textContent ile basılır (HTML olarak yorumlanmaz).
import { createDropzone, showError, formatBytes, downloadBlob, baseName, setProgress } from '../assets/js/ba.js';
import { load, loadAll, dump, CORE_SCHEMA, DEFAULT_SCHEMA, Type, types } from '../vendor/js-yaml@4.3.2/js-yaml.mjs';

const $ = (id) => document.getElementById(id);
const WARN_SIZE = 5 * 1024 * 1024;   // 5 MB üstü: "yavaşlayabilir" uyarısı
const BIG_SIZE = 50 * 1024 * 1024;   // 50 MB üstü: güçlü uyarı
const PREVIEW_MAX = 1_000_000;       // önizlemede gösterilen en fazla karakter (indirme tam olur)
const NODE_LIMIT = 5_000_000;        // takma ad (alias) genişlemesiyle oluşabilecek en fazla düğüm
const PROGRESS_MIN = 100_000;        // bu uzunluğun üstünde ilerleme çubuğu gösterilir
const SCAN_MAX = 2 * 1024 * 1024;    // yinelenen JSON anahtarı taraması bu boyuta kadar yapılır

/* Güvenli şemalar: ikisi de yalnızca veri türlerini tanır; !!js/function, !!js/regexp gibi kod
   çalıştırabilecek etiketler js-yaml 4'te zaten yoktur. KEEP_DATES, DEFAULT_SCHEMA'nın aynısıdır;
   tek farkı 2026-01-01 gibi düz değerleri tarihe çevirmemesidir (YAML 1.2 Core şemasıyla uyumlu).
   Açıkça !!timestamp yazılan değerler yine tarih olarak çözülür. */

/* js-yaml eşleme anahtarlarını String() ile metne çevirir; düz Date bu durumda tarayıcının yerel
   saat dilimine bağlı "Thu Jan 01 2026 03:00:00 GMT+0300 (…)" metnine dönüşürdü. Tarih anahtarı da
   değerlerle aynı ISO 8601 (UTC) biçiminde yazılsın diye toString'i ISO veren Date kullanılır. */
class IsoDate extends Date {
  toString() { return Number.isNaN(this.getTime()) ? 'Invalid Date' : this.toISOString(); }
}
const ISO_TIMESTAMP = new Type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: types.timestamp.resolve,
  construct: (data) => new IsoDate(types.timestamp.construct(data).getTime()),
  instanceOf: Date,
  represent: types.timestamp.represent,
});
// Aynı etiketli tür listede eskisinin yerine geçer; geri kalan her şey DEFAULT_SCHEMA ile aynıdır.
const DATES_SCHEMA = DEFAULT_SCHEMA.extend({ implicit: [ISO_TIMESTAMP] });
const KEEP_DATES_SCHEMA = CORE_SCHEMA.extend({
  implicit: [types.merge],
  explicit: [ISO_TIMESTAMP, types.binary, types.omap, types.pairs, types.set],
});

const SAMPLES = {
  json2yaml: '{\n  "uygulama": "Bilişim Ajans Araçları",\n  "sürüm": 2,\n  "etkin": true,\n  "şehirler": ["Diyarbakır", "İstanbul", "Iğdır"],\n  "veritabanı": {\n    "sunucu": "localhost",\n    "port": 5432,\n    "parola": null\n  },\n  "posta_kodu": "02100",\n  "yanıt": "yes"\n}\n',
  yaml2json: '# Örnek yapılandırma (iki belge)\nuygulama: Bilişim Ajans Araçları\nsürüm: 2\netkin: true\nşehirler: [Diyarbakır, İstanbul, Iğdır]\nveritabanı:\n  sunucu: localhost\n  port: 5432\n  parola: ~\nyanıt: yes        # YAML 1.2: metin olarak kalır\nbaşlangıç: 2026-01-01\n---\nikinci_belge: true\n',
};

const input = $('input');
const output = $('output');
const result = $('result');
let mode = 'json2yaml';       // json2yaml | yaml2json
let outText = '';             // son çıktının tamamı (önizleme kısaltılsa da kopyala/indir tamamını kullanır)
let outKind = 'yaml';         // son çıktının türü: yaml | json
let fileBase = 'veri';
let busy = false;

/** Kullanıcıya gösterilecek, çözüm öneren dönüşüm hatası. */
class ConvertError extends Error {
  constructor(message, pos = null) { super(message); this.pos = pos; }
}

/* ---------- Konum yardımcıları ---------- */
function lineCol(text, pos) {
  let line = 1, last = -1;
  for (let i = text.indexOf('\n'); i !== -1 && i < pos; i = text.indexOf('\n', i + 1)) { line++; last = i; }
  return { line, col: pos - last };
}

/** Hatalı satırı ve altına imleç çizgisini gösteren kısa alıntı üretir. */
function makeSnippet(text, pos) {
  const { line, col } = lineCol(text, pos);
  const lines = text.split('\n');
  const width = String(Math.min(lines.length, line + 1)).length;
  const out = [];
  for (let n = Math.max(1, line - 2); n <= Math.min(lines.length, line + 1); n++) {
    let s = lines[n - 1].replace(/\r$/, '');
    let c = col;
    // Çok uzun satırları hata çevresinden kırp.
    if (s.length > 80) {
      const from = n === line ? Math.max(0, col - 40) : 0;
      s = (from > 0 ? '…' : '') + s.slice(from, from + 80) + (s.length > from + 80 ? '…' : '');
      if (n === line) c = col - from + (from > 0 ? 1 : 0);
    }
    out.push(`${String(n).padStart(width, ' ')} | ${s}`);
    if (n === line) out.push(`${'-'.repeat(width + 2 + Math.max(0, c))}^`);
  }
  return out.join('\n');
}

function goTo(pos) {
  const p = Math.max(0, Math.min(pos, input.value.length));
  const { line } = lineCol(input.value, p);
  input.focus();
  input.setSelectionRange(p, Math.min(p + 1, input.value.length));
  const lh = parseFloat(getComputedStyle(input).lineHeight) || 20;
  input.scrollTop = Math.max(0, (line - 1) * lh - input.clientHeight / 2);
}

/* ---------- JSON hata tanılama ----------
   JSON.parse'ın İngilizce ve tarayıcıya göre değişen mesajlarına güvenmeden hatanın yerini ve
   Türkçe açıklamasını bulur. Geçerli metinde aynı nesnede yinelenen ilk anahtarı da bildirir. */
function scanJson(src) {
  let i = 0;
  const n = src.length;
  let dup = null;
  const fail = (pos, msg) => { throw { pos, msg }; };
  const show = (c) => (c === undefined ? 'metnin sonu' : c === '\n' ? 'satır sonu' : `"${c}"`);
  const ws = () => { while (i < n && (src[i] === ' ' || src[i] === '\t' || src[i] === '\n' || src[i] === '\r')) i++; };

  function str() {
    const start = i;
    i++;
    while (i < n) {
      const c = src[i];
      if (c === '"') { i++; return; }
      if (c < ' ') fail(i, 'Metin içinde gerçek satır sonu ya da denetim karakteri var. Satır sonu için \\n yazın ya da metni tek satırda tutun.');
      if (c === '\\') {
        const e = src[i + 1];
        if (e === 'u') {
          if (!/^[0-9a-fA-F]{4}$/.test(src.slice(i + 2, i + 6))) fail(i, '\\u kaçışından sonra 4 onaltılık rakam gelmeli (örnek: \\u00e7).');
          i += 6; continue;
        }
        if (e === undefined || !'"\\/bfnrt'.includes(e)) fail(i, `Geçersiz kaçış dizisi "\\${e === undefined ? '' : e}". Ters bölüyü çift yazın (\\\\) ya da kaçış karakterini silin.`);
        i += 2; continue;
      }
      i++;
    }
    fail(start, 'Metnin kapanış tırnağı eksik. Açılan çift tırnak kapatılmamış.');
  }

  function value() {
    ws();
    const c = src[i];
    if (c === undefined) fail(i, 'Bir değer bekleniyordu ama metin bitti. Eksik bir değer ya da kapatılmamış parantez olabilir.');
    if (c === '{') return obj();
    if (c === '[') return arr();
    if (c === '"') return str();
    if (c === "'") fail(i, "Tek tırnak kullanılmış. JSON'da metinler ve anahtarlar çift tırnak (\") içinde yazılmalıdır.");
    if (c === '/') fail(i, "JSON'da yorum satırı kullanılamaz. // ve /* */ ifadelerini silin.");
    if (c === '#') fail(i, "JSON'da # ile yorum yazılamaz. Bu bir YAML metniyse yönü 'YAML → JSON' yapın.");
    for (const lit of ['true', 'false', 'null']) {
      if (src.startsWith(lit, i)) { i += lit.length; return; }
    }
    if (c === '-' || (c >= '0' && c <= '9')) {
      const re = /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/y;
      re.lastIndex = i;
      const m = re.exec(src);
      if (!m) fail(i, 'Geçersiz sayı. Eksi işaretinden sonra rakam gelmeli; ondalık için nokta kullanın (3.14).');
      const next = src[i + m[0].length];
      if (next !== undefined && next >= '0' && next <= '9') fail(i, 'Sayı sıfırla başlayamaz (örnek: 0123 yerine 123 yazın ya da baştaki sıfır önemliyse "0123" biçiminde metin yapın).');
      if (next === '.') fail(i + m[0].length, 'Noktadan sonra rakam gelmeli (örnek: 5.0).');
      i += m[0].length; return;
    }
    const word = /^[A-Za-z_$À-ɏ][\w$À-ɏ]*/.exec(src.slice(i, i + 40));
    if (word) fail(i, `Tanınmayan değer "${word[0]}". Metinler çift tırnak içinde olmalı; yalnızca true, false ve null tırnaksız yazılır (undefined, NaN, yes/no geçersizdir).`);
    fail(i, `Beklenmeyen karakter ${show(c)}. Bu konumda bir değer (metin, sayı, nesne, dizi, true, false, null) olmalı.`);
  }

  function obj() {
    i++; ws();
    if (src[i] === '}') { i++; return; }
    const seen = new Set();
    for (;;) {
      ws();
      const c = src[i];
      if (c !== '"') {
        if (c === '}') fail(i, 'Son özellikten sonra fazladan virgül var. Kapanış } işaretinden önceki virgülü silin.');
        if (c === "'") fail(i, "Anahtar tek tırnakla yazılmış. JSON'da anahtarlar çift tırnak içinde olmalıdır.");
        fail(i, `Anahtar çift tırnak içinde yazılmalı, bulunan ${show(c)}. Tırnaksız anahtarlara JSON izin vermez ("anahtar": değer biçiminde yazın).`);
      }
      const ks = i;
      str();
      if (!dup) {
        try {
          const key = JSON.parse(src.slice(ks, i));
          if (seen.has(key)) dup = { key, pos: ks }; else seen.add(key);
        } catch { /* anahtar zaten str() ile doğrulandı */ }
      }
      ws();
      if (src[i] !== ':') fail(i, `Anahtardan sonra iki nokta (:) bekleniyordu, bulunan ${show(src[i])}.`);
      i++; value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === '}') { i++; return; }
      fail(i, `Virgül ya da } bekleniyordu, bulunan ${show(d)}. İki özellik arasında virgül unutulmuş ya da süslü parantez kapatılmamış olabilir.`);
    }
  }

  function arr() {
    i++; ws();
    if (src[i] === ']') { i++; return; }
    for (;;) {
      ws();
      if (src[i] === ']') fail(i, 'Son öğeden sonra fazladan virgül var. Kapanış ] işaretinden önceki virgülü silin.');
      value(); ws();
      const d = src[i];
      if (d === ',') { i++; continue; }
      if (d === ']') { i++; return; }
      fail(i, `Virgül ya da ] bekleniyordu, bulunan ${show(d)}. İki öğe arasında virgül unutulmuş ya da köşeli parantez kapatılmamış olabilir.`);
    }
  }

  try {
    value(); ws();
    if (i < n) fail(i, `Değerden sonra fazladan içerik var (${show(src[i])}). JSON'da tek bir kök değer olmalı; birden çok nesne varsa bir dizinin [ ] içine alın.`);
  } catch (e) {
    if (e && typeof e.pos === 'number') return { error: e };
    return {}; // çok derin yapı: yığın sınırı (yalnızca tanılama yapılamaz)
  }
  return dup ? { dup } : {};
}

/* ---------- YAML hatalarının Türkçe karşılıkları ---------- */
function yamlReasonTr(reason) {
  const r = String(reason || '');
  let m;
  if (r.startsWith('bad indentation of a mapping entry')) return "Girinti hatalı ya da aynı satırda ikinci bir \"anahtar: değer\" var. Aynı düzeydeki anahtarları aynı sayıda boşlukla başlatın; değerin içinde \": \" geçiyorsa değeri tırnak içine alın.";
  if (r.startsWith('bad indentation of a sequence entry')) return 'Liste öğesinin (- ) girintisi hatalı. Aynı listedeki tire işaretlerini aynı sütuna hizalayın.';
  if (r.startsWith('tab characters must not be used in indentation')) return 'Girintide sekme (Tab) karakteri var. YAML girintide yalnızca boşluk kabul eder; sekmeleri boşlukla değiştirin.';
  if (r.startsWith('duplicated mapping key')) return 'Aynı anahtar aynı düzeyde iki kez yazılmış. YAML anahtarların benzersiz olmasını şart koşar; yinelenen anahtarı silin ya da yeniden adlandırın.';
  if ((m = /^unknown tag !<(.*)>/.exec(r))) {
    const tag = m[1].replace('tag:yaml.org,2002:', '!!');
    return `Desteklenmeyen etiket (${tag}). Güvenlik nedeniyle yalnızca standart veri türleri işlenir; !!js/function, !!python/object gibi kod çalıştırabilen ya da dile özgü etiketler kabul edilmez. Etiketi silip değeri düz metin olarak yazın.`;
  }
  if (r.startsWith('unexpected end of the stream within a flow collection')) return 'Köşeli [ ] ya da süslü { } parantez kapatılmamış. Açtığınız her parantezin kapandığından emin olun.';
  if (/within a (single|double) quoted scalar/.test(r)) return 'Tırnak kapatılmamış. Açtığınız tek ya da çift tırnağı aynı değerin sonunda kapatın.';
  if (r.startsWith('missed comma between flow collection entries')) return 'Köşeli ya da süslü parantez içindeki öğeler arasında virgül eksik.';
  if (r.startsWith('end of the stream or a document separator is expected')) return 'Bu satır önceki yapının devamı olamaz: liste ile anahtar-değer karışmış ya da girinti bozulmuş olabilir. Satırın girintisini kontrol edin; ayrı bir belgeyse araya --- satırı koyun.';
  if (r.startsWith('can not read a block mapping entry')) return 'Anahtar birden çok satıra bölünmüş görünüyor. Anahtarı tek satırda yazın ve sonuna iki nokta (:) koyun.';
  if (r.startsWith('can not read an implicit mapping pair')) return 'Anahtardan sonra iki nokta (:) eksik.';
  if (r.startsWith('incomplete explicit mapping pair')) return '? ile başlayan anahtarın değeri ya da anahtarın kendisi eksik.';
  if ((m = /^unidentified alias "(.*)"/.exec(r))) return `Tanımlanmamış takma ad (*${m[1]}). Önce &${m[1]} ile bir çapa (anchor) tanımlayın ya da * ile başlayan değeri tırnak içine alın.`;
  if (r.startsWith('a whitespace character is expected after the key-value separator')) return 'İki noktadan (:) sonra boşluk bırakılmalı: "anahtar:değer" yerine "anahtar: değer" yazın.';
  if (r.startsWith('the stream contains non-printable characters') || r.startsWith('null byte is not allowed')) return 'Metinde yazdırılamayan karakterler var. Dosya ikili (binary) olabilir ya da UTF-16 gibi farklı bir kodlamada kaydedilmiş olabilir; UTF-8 olarak kaydedip yeniden deneyin.';
  if (r.startsWith('nesting exceeded maxDepth')) return 'Yapı 100 düzeyden daha derin iç içe geçmiş. Güvenlik sınırı aşıldı; veriyi sadeleştirin ya da parçalara bölün.';
  if (r.startsWith('merge keys exceeded')) return 'Çok fazla birleştirme anahtarı (<<) var; güvenlik sınırı aşıldı. Belgedeki << kullanımını azaltın.';
  if (r.startsWith('unknown escape sequence')) return 'Çift tırnaklı metinde geçersiz kaçış dizisi var. Ters bölüyü (\\) iki kez yazın ya da metni tek tırnak içine alın.';
  if (r.startsWith("expected the node content, but found ','")) return 'Virgülden önce değer eksik: iki virgül yan yana ya da liste virgülle başlıyor.';
  if (/^name of an (anchor|alias) node must contain/.test(r)) return '& ya da * işaretinden sonra bir ad gelmeli. Bu karakterleri metin olarak kullanacaksanız değeri tırnak içine alın.';
  if (r.startsWith('missing indentation for block scalar')) return '| ya da > ile başlayan çok satırlı metnin satırları girintili yazılmalı.';
  if (r.startsWith('cannot merge mappings')) return 'Birleştirme anahtarı (<<) yalnızca bir eşleme (anahtar-değer) ya da eşleme listesiyle kullanılabilir.';
  return `YAML sözdizimi hatası (${r}). Girintileri, iki noktaları ve tırnakları kontrol edin.`;
}

/* ---------- Değer denetimi ----------
   Takma adlar (alias) aynı nesneyi birden çok yerde kullandırır; JSON'a yazılırken her biri ayrı
   kopyalanır. "Milyar gülüş" türü belgeler bu yüzden milyarlarca düğüme şişebilir. Burada
   genişlemiş düğüm sayısı ezberlemeyle (memo) doğrusal zamanda sayılır, döngü de yakalanır. */
function inspect(root) {
  const memo = new Map();
  const stack = new Set();
  const st = { nodes: 0, nonFinite: 0, binary: 0, dates: 0, unsafe: 0 };
  const visit = (v) => {
    if (v === null || typeof v !== 'object') {
      if (typeof v === 'number') {
        if (!Number.isFinite(v)) st.nonFinite++;
        else if (Number.isInteger(v) && !Number.isSafeInteger(v)) st.unsafe++;
      }
      return 1;
    }
    if (v instanceof Date) { st.dates++; return 1; }
    if (v instanceof Uint8Array) { st.binary++; return 1; }
    if (stack.has(v)) throw new ConvertError('Belgede kendini içeren (döngüsel) bir takma ad var; örneğin bir çapa kendi içinde *ad ile tekrar kullanılmış. JSON döngüsel yapıyı gösteremez; takma adı kaldırıp değeri açıkça yazın.');
    const known = memo.get(v);
    if (known !== undefined) return known;
    stack.add(v);
    let count = 1;
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) { count += visit(v[i]); if (count > NODE_LIMIT) break; }
    } else {
      for (const k of Object.keys(v)) { count += visit(v[k]); if (count > NODE_LIMIT) break; }
    }
    if (count > NODE_LIMIT) throw new ConvertError(`Takma adlar (*ad) açıldığında veri ${NODE_LIMIT.toLocaleString('tr')} öğeyi aşıyor. Bu, tarayıcıyı kilitleyebilecek kasıtlı bir "milyar gülüş" belgesi olabilir; takma ad kullanımını azaltın ya da veriyi bölün.`);
    stack.delete(v);
    memo.set(v, count);
    return count;
  };
  st.nodes = visit(root);
  return st;
}

/** Uint8Array → base64 (YAML !!binary değerleri JSON'da metin olarak yazılır). */
function toBase64(bytes) {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

const trSort = (a, b) => a.localeCompare(b, 'tr');

/* ---------- Dönüşümler ---------- */
function jsonToYaml(text, o) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    const scan = scanJson(text);
    let msg, pos = null;
    if (scan.error) {
      const { line, col } = lineCol(text, scan.error.pos);
      msg = `Geçersiz JSON — satır ${line}, sütun ${col}: ${scan.error.msg}`;
      pos = scan.error.pos;
    } else {
      msg = 'Geçersiz JSON ya da yapı çok derin. Parantezlerin eşleştiğini ve metnin tek bir kök değerden oluştuğunu kontrol edin.';
    }
    // Metin aslında YAML ise kullanıcıyı doğru yöne yönlendir. { ya da [ ile başlayan metin
    // büyük olasılıkla yazım hatalı JSON'dur (YAML akış biçimi neredeyse her şeyi kabul eder);
    // orada yön önerisi yanıltıcı olur, yalnızca JSON hatası gösterilir.
    if (text.length < SCAN_MAX && !/^\s*[[{]/.test(text)) {
      try {
        const y = load(text, { schema: KEEP_DATES_SCHEMA });
        if (y && typeof y === 'object') msg += " İpucu: Bu metin geçerli bir YAML gibi görünüyor; YAML'dan JSON'a çevirmek için \"Yönü değiştir\" düğmesine basın ya da \"YAML → JSON\" yönünü seçin.";
      } catch { /* YAML da değil */ }
    }
    const err = new ConvertError(msg, pos);
    err.snippet = pos !== null ? makeSnippet(text, pos) : '';
    throw err;
  }
  const notes = [];
  if (text.length <= SCAN_MAX) {
    const scan = scanJson(text);
    if (scan.dup) {
      const { line } = lineCol(text, scan.dup.pos);
      notes.push(`"${scan.dup.key}" anahtarı aynı nesnede birden fazla kez geçiyor (satır ${line}). JSON.parse yalnızca son değeri tutar; RFC 8259 anahtarların benzersiz olmasını önerir.`);
    }
  }
  const st = inspect(data);
  if (st.unsafe) notes.push(`${st.unsafe} sayı 2⁵³ sınırını aşıyor; tarayıcı bu sayıları yuvarlamış olabilir. Kimlik numarası gibi uzun sayıları JSON'da tırnak içinde (metin olarak) tutun.`);
  // JSON.parse 1e400 gibi aşırı büyük sayıları Infinity yapar; YAML'a sessizce .inf yazılmasın.
  if (st.nonFinite) notes.push(`${st.nonFinite} sayı tarayıcının sayı sınırını (yaklaşık ±1,8 × 10³⁰⁸) aşıyor; sonsuz kabul edildi ve YAML'a .inf ya da -.inf olarak yazıldı. Değer önemliyse JSON'da tırnak içinde (metin olarak) tutun.`);
  const opts = { indent: o.indent, lineWidth: o.lineWidth, noRefs: true, sortKeys: o.sort ? trSort : false };
  let out;
  let docs = 1;
  if (o.split && Array.isArray(data) && data.length > 0) {
    out = data.map((d) => dump(d, opts)).join('---\n');
    docs = data.length;
  } else {
    out = dump(data, opts);
  }
  return { out, docs, notes };
}

function yamlToJson(text, o) {
  let raw;
  /* loadAll hem içeriksiz belgeyi (yalnızca --- ya da yorum) hem açıkça "null" / "~" yazılmış
     belgeyi null döndürür. Kök düğüm kapanırken hiçbir düğüm türü (kind), etiket ya da çapa yoksa
     belge gerçekten boştur; yalnızca bunlar atlanır, böylece [1, null, 2] gibi bir dizinin null
     öğesi kaybolmaz. (Düz "null" kökte kind = 'scalar' olur; etiketi js-yaml geri sıfırlar.) */
  const empty = [];
  const listener = (ev, state) => {
    if (ev === 'close' && state.depth === 1) empty.push(state.result === null && state.kind === null && state.tag === null && state.anchor === null);
  };
  try {
    raw = loadAll(text, { schema: o.keepDates ? KEEP_DATES_SCHEMA : DATES_SCHEMA, listener });
  } catch (e) {
    if (e && e.name === 'YAMLException') {
      const mark = e.mark || null;
      let line, col, pos = null;
      if (mark && typeof mark.position === 'number' && mark.position < text.length) {
        line = mark.line + 1; col = mark.column + 1; pos = mark.position;
      } else if (mark) {
        // js-yaml metnin sonuna satır sonu ekler; "metin bitti" hatalarını gerçek son satıra çek.
        pos = text.length;
        ({ line, col } = lineCol(text, pos));
      }
      const where = line ? `satır ${line}, sütun ${col}: ` : '';
      const err = new ConvertError(`Geçersiz YAML — ${where}${yamlReasonTr(e.reason)}`, pos);
      err.snippet = pos !== null ? makeSnippet(text, pos) : '';
      throw err;
    }
    throw e;
  }
  const notes = [];
  const aligned = empty.length === raw.length;
  const isEmpty = (d, i) => (d === null || d === undefined) && (aligned ? empty[i] : true);
  let docs = raw;
  if (raw.length > 1) {
    docs = raw.filter((d, i) => !isEmpty(d, i));
    const skipped = raw.length - docs.length;
    if (skipped) notes.push(`${skipped} boş belge (yalnızca --- ya da yorum içeren) atlandı.`);
  }
  const value = docs.length === 0 ? null : docs.length === 1 ? docs[0] : docs;
  if (value === null && (raw.length === 0 || (raw.length === 1 && isEmpty(raw[0], 0)))) notes.push('Belgede veri yok (boş ya da yalnızca yorum); JSON karşılığı null.');
  const st = inspect(value);
  if (st.nonFinite) notes.push(`${st.nonFinite} değer (.inf ya da .nan) JSON'da karşılığı olmadığı için null yazıldı.`);
  if (st.binary) notes.push(`${st.binary} !!binary değer base64 metni olarak yazıldı.`);
  if (st.dates) {
    notes.push(o.keepDates
      ? `Açıkça !!timestamp etiketiyle yazılmış ${st.dates} değer ISO 8601 biçimine (UTC) çevrildi.`
      : `${st.dates} tarih değeri ISO 8601 biçimine (UTC) çevrildi. Tarihlerin yazıldığı gibi kalmasını istiyorsanız "Tarihleri metin olarak koru" seçeneğini işaretleyin.`);
  }
  if (st.unsafe) notes.push(`${st.unsafe} sayı 2⁵³ sınırını aşıyor ve yuvarlandı. Bu değerleri YAML'da tırnak içine alırsanız metin olarak aynen korunur.`);
  const replacer = (k, v) => {
    if (typeof v === 'number' && !Number.isFinite(v)) return null;
    if (v instanceof Uint8Array) return toBase64(v);
    return v;
  };
  const out = JSON.stringify(value, replacer, o.minify ? 0 : o.indent);
  return { out, docs: docs.length, notes };
}

/* ---------- Arayüz ---------- */
function options() {
  return {
    indent: Number($('opt-indent').value) || 2,
    sort: $('opt-sort').checked,
    lineWidth: Number($('opt-width').value) || -1,
    split: $('opt-split').checked,
    minify: $('opt-minify').checked,
    keepDates: $('opt-dates').checked,
  };
}

function showMsg(el, msg) {
  el.textContent = msg || '';
  el.classList.toggle('is-active', Boolean(msg));
}

function hideResult() {
  result.classList.remove('is-active');
  result.hidden = true;
}

function clearErrors() {
  showError($('error'), '');
  $('error-snippet').hidden = true;
  $('error-snippet').textContent = '';
}

function setMode(m) {
  mode = m;
  const j2y = m === 'json2yaml';
  $('mode-j2y').checked = j2y;
  $('mode-y2j').checked = !j2y;
  $('in-label').textContent = j2y ? 'JSON girişi' : 'YAML girişi';
  input.placeholder = j2y ? '{"ad":"Ayşe","yas":30,"etiketler":["a","b"]}' : 'ad: Ayşe\nyas: 30\netiketler:\n  - a\n  - b';
  $('grp-yaml').hidden = !j2y;
  $('grp-json').hidden = j2y;
  $('btn-convert').textContent = j2y ? "JSON'u YAML'a dönüştür" : "YAML'ı JSON'a dönüştür";
  document.documentElement.dataset.jyMode = m;
}

const paint = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

async function convert() {
  if (busy) return;
  clearErrors();
  showMsg($('info'), '');
  if (input.value.charCodeAt(0) === 0xFEFF) input.value = input.value.slice(1); // BOM görünmez; konumlar kaymasın
  const text = input.value;
  if (!text.trim()) {
    hideResult();
    outText = '';
    showMsg($('info'), mode === 'json2yaml'
      ? 'Giriş boş. JSON metnini kutuya yapıştırın, bir .json dosyası seçin ya da "Örnek yükle" düğmesine basın.'
      : 'Giriş boş. YAML metnini kutuya yapıştırın, bir .yaml / .yml dosyası seçin ya da "Örnek yükle" düğmesine basın.');
    return;
  }
  busy = true;
  const btn = $('btn-convert');
  btn.disabled = true;
  const prog = $('progress');
  const big = text.length > PROGRESS_MIN;
  if (text.length > BIG_SIZE) showMsg($('warning'), `Metin ${formatBytes(text.length)}; 50 MB üstünde tarayıcı uzun süre yanıt vermeyebilir. Mümkünse bilgisayarda deneyin ya da dosyayı parçalara bölün.`);
  else if (text.length > WARN_SIZE) showMsg($('warning'), `Metin ${formatBytes(text.length)}; 5 MB üstünde dönüşüm birkaç saniye sürebilir. Önizleme kısaltılır, kopyalanan ve indirilen çıktı tam olur.`);
  try {
    if (big) { setProgress(prog, 20, 'Ayrıştırılıyor…'); await paint(); }
    const o = options();
    const r = mode === 'json2yaml' ? jsonToYaml(text, o) : yamlToJson(text, o);
    if (big) { setProgress(prog, 85, 'Çıktı hazırlanıyor…'); await paint(); }
    outText = r.out;
    outKind = mode === 'json2yaml' ? 'yaml' : 'json';
    const preview = outText.length > PREVIEW_MAX ? `${outText.slice(0, PREVIEW_MAX)}\n…` : outText;
    output.textContent = preview; // textContent: çıktı asla HTML olarak yorumlanmaz
    const inB = new Blob([text]).size;
    const outB = new Blob([outText]).size;
    const head = mode === 'json2yaml'
      ? `JSON → YAML${r.docs > 1 ? ` · ${r.docs} belge (--- ile ayrıldı)` : ''}`
      : `YAML → JSON${r.docs > 1 ? ` · ${r.docs} belge → JSON dizisi` : ''}`;
    $('result-info').textContent = `${head} · ${formatBytes(inB)} → ${formatBytes(outB)}${o.sort && mode === 'json2yaml' ? ' · anahtarlar sıralandı' : ''}${o.minify && mode === 'yaml2json' ? ' · küçültüldü' : ''}`;
    const notes = [...r.notes];
    if (outText.length > PREVIEW_MAX) notes.push(`Önizleme ilk ${PREVIEW_MAX.toLocaleString('tr')} karakteri gösteriyor; Kopyala ve İndir tam çıktıyı verir.`);
    const ul = $('result-notes');
    ul.textContent = '';
    for (const n of notes) { const li = document.createElement('li'); li.textContent = n; ul.appendChild(li); }
    ul.hidden = notes.length === 0;
    $('out-label').textContent = mode === 'json2yaml' ? 'YAML çıktısı' : 'JSON çıktısı';
    $('btn-download').textContent = mode === 'json2yaml' ? 'YAML olarak indir (.yaml)' : 'JSON olarak indir (.json)';
    $('copied').textContent = '';
    result.hidden = false;
    result.classList.add('is-active');
  } catch (e) {
    hideResult();
    outText = '';
    if (e instanceof ConvertError) {
      showError($('error'), e.message);
      if (e.snippet) { $('error-snippet').textContent = e.snippet; $('error-snippet').hidden = false; }
      if (e.pos !== null && e.pos !== undefined) goTo(e.pos);
    } else if (e instanceof RangeError) {
      showError($('error'), 'Veri çok derin iç içe geçmiş ya da çok büyük; tarayıcının sınırı aşıldı. Veriyi daha küçük parçalara bölüp yeniden deneyin.');
    } else if (e && e.name === 'YAMLException') {
      showError($('error'), `YAML yazılamadı: ${yamlReasonTr(e.reason)}`);
    } else {
      showError($('error'), 'Beklenmeyen bir hata oluştu. Sayfayı yenileyip yeniden deneyin; sorun sürerse metnin küçük bir bölümüyle deneyerek hatalı kısmı bulun.');
    }
  } finally {
    setProgress(prog, null);
    btn.disabled = false;
    busy = false;
  }
}

/* ---------- Dosya okuma ---------- */
async function readFileText(f) {
  const buf = new Uint8Array(await f.arrayBuffer());
  if (buf[0] === 0xFF && buf[1] === 0xFE) return { text: new TextDecoder('utf-16le').decode(buf.subarray(2)), enc: 'UTF-16 LE' };
  if (buf[0] === 0xFE && buf[1] === 0xFF) return { text: new TextDecoder('utf-16be').decode(buf.subarray(2)), enc: 'UTF-16 BE' };
  const bom = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  const body = bom ? buf.subarray(3) : buf;
  if (body.subarray(0, 8192).includes(0)) throw new ConvertError('Dosya metin gibi görünmüyor (ikili veri içeriyor). Yalnızca .json, .yaml ve .yml uzantılı metin dosyaları dönüştürülebilir; dosyayı bir metin düzenleyicide açıp içeriğini kontrol edin.');
  try {
    return { text: new TextDecoder('utf-8', { fatal: true }).decode(body), enc: bom ? 'UTF-8, BOM kaldırıldı' : 'UTF-8' };
  } catch {
    // UTF-8 değilse büyük olasılıkla eski Türkçe Windows kodlamasıdır.
    return { text: new TextDecoder('windows-1254').decode(body), enc: 'Windows-1254', legacy: true };
  }
}

async function loadFile(files) {
  const f = files[0];
  if (!f) return;
  // Yeni dosya seçilince eski çıktı geçersizdir.
  hideResult();
  outText = '';
  clearErrors();
  showMsg($('warning'), '');
  showMsg($('info'), '');
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  if (!['json', 'yaml', 'yml', 'txt'].includes(ext) && !/json|yaml|text/.test(f.type)) {
    showError($('error'), `"${f.name}" desteklenen bir dosya değil. Yalnızca .json, .yaml, .yml (ya da düz metin .txt) dosyaları dönüştürülebilir.`);
    return;
  }
  if (f.size > BIG_SIZE) showMsg($('warning'), `Dosya ${formatBytes(f.size)}; 50 MB üstü dosyalar tarayıcıyı uzun süre dondurabilir. Mümkünse bilgisayarda deneyin ya da dosyayı parçalara bölün.`);
  else if (f.size > WARN_SIZE) showMsg($('warning'), `Dosya ${formatBytes(f.size)}; 5 MB üstünde dönüşüm birkaç saniye sürebilir. Önizleme kısaltılır, indirilen dosya tam olur.`);
  let read;
  try {
    read = await readFileText(f);
  } catch (e) {
    showError($('error'), e instanceof ConvertError ? e.message : 'Dosya okunamadı. Dosyanın başka bir programda açık olmadığını kontrol edip yeniden seçin.');
    return;
  }
  if (ext === 'json') setMode('json2yaml');
  else if (ext === 'yaml' || ext === 'yml') setMode('yaml2json');
  input.value = read.text;
  fileBase = baseName(f.name) || 'veri';
  const dir = mode === 'json2yaml' ? 'JSON → YAML' : 'YAML → JSON';
  $('file-name').textContent = `${f.name} (${formatBytes(f.size)}, ${read.enc}) yüklendi · yön: ${dir}`;
  if (read.legacy) showMsg($('warning'), 'Dosya UTF-8 değil; Türkçe Windows kodlaması (Windows-1254) varsayılarak okundu. Karakterler bozuk görünüyorsa dosyayı UTF-8 olarak kaydedip yeniden seçin.');
  if (!read.text.trim()) {
    hideResult();
    showMsg($('info'), 'Dosya boş. İçinde JSON ya da YAML metni olan bir dosya seçin.');
    return;
  }
  await convert();
}

/* ---------- Kopyala / indir ---------- */
async function copyOut() {
  if (!outText) { showError($('error'), 'Kopyalanacak çıktı yok. Önce "Dönüştür" düğmesine basın.'); return; }
  let ok = false;
  try {
    await navigator.clipboard.writeText(outText);
    ok = true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = outText;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
  }
  $('copied').textContent = ok ? 'Kopyalandı' : 'Kopyalanamadı; çıktıyı seçip Ctrl+C ile kopyalayın.';
  setTimeout(() => { $('copied').textContent = ''; }, 2500);
}

function downloadOut() {
  if (!outText) { showError($('error'), 'İndirilecek çıktı yok. Önce "Dönüştür" düğmesine basın.'); return; }
  const mime = outKind === 'yaml' ? 'application/yaml' : 'application/json';
  downloadBlob(new Blob([outText], { type: `${mime};charset=utf-8` }), `${fileBase}.${outKind}`);
}

/* ---------- Olaylar ---------- */
createDropzone({ el: $('drop'), accept: '.json,.yaml,.yml,.txt,application/json,application/yaml,text/yaml,text/plain', multiple: false, onFiles: loadFile });

for (const r of document.querySelectorAll('input[name="mode"]')) {
  r.addEventListener('change', () => {
    if (!r.checked) return;
    setMode(r.value);
    hideResult();
    outText = '';
    clearErrors();
    showMsg($('info'), '');
  });
}

$('btn-swap').addEventListener('click', async () => {
  const next = mode === 'json2yaml' ? 'yaml2json' : 'json2yaml';
  const prev = outText;
  setMode(next);
  clearErrors();
  showMsg($('info'), '');
  if (prev) {
    // Çıktı yeni giriş olur ve ters yönde hemen dönüştürülür; eski girişe ait uyarı geçersizdir.
    showMsg($('warning'), '');
    input.value = prev;
    await convert();
  } else if (input.value.trim()) {
    // Çıktı yoksa (ör. "YAML gibi görünüyor" ipucundan sonra) aynı giriş yeni yönde dönüştürülür.
    await convert();
  } else {
    hideResult();
  }
});

$('btn-convert').addEventListener('click', convert);
$('btn-copy').addEventListener('click', copyOut);
$('btn-download').addEventListener('click', downloadOut);
$('btn-sample').addEventListener('click', () => {
  input.value = SAMPLES[mode];
  fileBase = 'ornek';
  $('file-name').textContent = '';
  showMsg($('warning'), ''); // önceki dosyanın boyut/kodlama uyarısı örneğe ait değil
  convert();
});
$('btn-clear').addEventListener('click', () => {
  input.value = '';
  outText = '';
  output.textContent = '';
  fileBase = 'veri';
  $('file-name').textContent = '';
  hideResult();
  clearErrors();
  showMsg($('info'), '');
  showMsg($('warning'), '');
  input.focus();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); convert(); }
});
input.addEventListener('input', () => {
  if (input.value.length > WARN_SIZE) showMsg($('warning'), 'Metin 5 MB üstünde; dönüşüm birkaç saniye sürebilir.');
  else if ($('warning').textContent.startsWith('Metin')) showMsg($('warning'), '');
});

// Seçenek değişince, sonuç görünüyorsa çıktıyı hemen yenile.
for (const id of ['opt-indent', 'opt-sort', 'opt-width', 'opt-split', 'opt-minify', 'opt-dates']) {
  $(id).addEventListener('change', () => { if (!result.hidden && input.value.trim()) convert(); });
}

setMode('json2yaml');
document.documentElement.dataset.jyReady = '1'; // test kancası: modül yüklendi
