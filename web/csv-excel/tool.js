// CSV ↔ Excel Dönüştürücü — tamamı tarayıcıda. Dosya hiçbir zaman sunucuya gitmez.
// XLSX için harici kütüphane yok: zip katmanı fflate (MIT), XML'i kendimiz yazıp okuyoruz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 20 * 1024 * 1024;   // 20 MB üzeri: uyarı + parça parça işleme
const CHUNK = 1024 * 1024;           // dosya okuma parçası
const PREVIEW_ROWS = 50;             // tabloda gösterilen satır
const SAMPLE_ROWS = 1000;            // tür tahmini için incelenen satır
const SAMPLE_BYTES = 256 * 1024;     // ayraç/kodlama tahmini için okunan bayt
const EXCEL_MAX_ROWS = 1_048_576;
const EXCEL_MAX_COLS = 16_384;

let fflate = null;
async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/* =====================================================================
   Durum
   ===================================================================== */
const state = {
  file: null,
  kind: null,            // 'csv' | 'xlsx'
  // CSV girdisi
  detected: null,        // { encoding, delimiter, bom }
  // XLSX girdisi
  sheets: null,          // [{ name, rows }]
  sheetIndex: 0,
  // Önizleme ve istatistik (her iki tür)
  previewRows: [],       // ilk 50 satır (başlık dâhil)
  rowCount: 0,
  colCount: 0,
  colTypes: [],          // tahmin: 'number' | 'date' | 'text'
  colOverride: [],       // kullanıcı seçimi: 'auto' | 'number' | 'text'
  busy: false,
  out: null,             // { blob, name }
};

/* =====================================================================
   Yardımcılar: kodlama
   ===================================================================== */
const ENC_LABEL = { 'utf-8': 'UTF-8', 'utf-8-bom': 'UTF-8 (BOM\'lu)', 'windows-1254': 'Windows-1254 (Türkçe ANSI)', 'utf-16le': 'UTF-16 LE', 'utf-16be': 'UTF-16 BE' };
const DELIM_LABEL = { ';': 'noktalı virgül (;)', ',': 'virgül (,)', '\t': 'sekme (TAB)', '|': 'dikey çizgi (|)' };

/** BOM ve bayt desenine bakarak kodlamayı tahmin eder. */
function detectEncoding(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) return { encoding: 'utf-8', bom: 3, label: 'utf-8-bom' };
  if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) return { encoding: 'utf-16le', bom: 2, label: 'utf-16le' };
  if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) return { encoding: 'utf-16be', bom: 2, label: 'utf-16be' };
  // BOM'suz UTF-16 LE: çift baytların çoğu sıfırsa
  let zeros = 0; const n = Math.min(bytes.length, 4096);
  for (let i = 1; i < n; i += 2) if (bytes[i] === 0) zeros++;
  if (n > 16 && zeros > n / 4 * 0.9) return { encoding: 'utf-16le', bom: 0, label: 'utf-16le' };
  // Geçerli UTF-8 mi? Değilse Türkçe ANSI (Windows-1254) kabul et.
  let hasHigh = false;
  for (let i = 0; i < n; i++) if (bytes[i] > 0x7F) { hasHigh = true; break; }
  if (!hasHigh) return { encoding: 'utf-8', bom: 0, label: 'utf-8' };
  try {
    // Örnek parça bir karakterin ortasında kesilmiş olabilir; son 3 baytı atarak dene.
    new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, Math.max(0, bytes.length - 3)));
    return { encoding: 'utf-8', bom: 0, label: 'utf-8' };
  } catch {
    return { encoding: 'windows-1254', bom: 0, label: 'windows-1254' };
  }
}

/** Windows-1254 kodlayıcı (TextEncoder yalnızca UTF-8 bilir). */
let cp1254Map = null;
function encodeCp1254(str) {
  if (!cp1254Map) {
    cp1254Map = new Map();
    const dec = new TextDecoder('windows-1254');
    for (let b = 0; b < 256; b++) {
      const ch = dec.decode(new Uint8Array([b]));
      if (ch !== '�' || b === 0) cp1254Map.set(ch, b);
    }
  }
  const out = new Uint8Array(str.length);
  let j = 0;
  for (const ch of str) {
    const b = cp1254Map.get(ch);
    out[j++] = b === undefined ? 0x3F : b; // karşılığı olmayan karakter → "?"
  }
  return out.subarray(0, j);
}

/* =====================================================================
   Yardımcılar: CSV ayrıştırma (RFC 4180, parça parça)
   ===================================================================== */
/** Parça parça gelen metni satırlara ayıran durum makinesi. */
class CsvParser {
  constructor(delim, onRow) {
    this.delim = delim; this.onRow = onRow;
    this.row = []; this.field = ''; this.inQuotes = false; this.afterQuote = false; this.sawCR = false;
    this.stopped = false;
  }
  push(text) {
    const d = this.delim;
    let field = this.field, inQ = this.inQuotes, afterQ = this.afterQuote;
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQ) {
        if (ch === '"') {
          field += text.slice(start, i);
          if (text[i + 1] === '"') { field += '"'; i++; start = i + 1; }
          else { inQ = false; afterQ = true; start = i + 1; }
        }
        continue;
      }
      if (ch === d) {
        field += text.slice(start, i); this.row.push(field); field = ''; afterQ = false; start = i + 1;
      } else if (ch === '\n' || ch === '\r') {
        field += text.slice(start, i); start = i + 1;
        if (ch === '\r' && text[i + 1] === '\n') { i++; start = i + 1; }
        else if (ch === '\r' && i === text.length - 1) { this.sawCR = true; }
        this.row.push(field); field = ''; afterQ = false;
        this.emit();
        if (this.stopped) { this.field = ''; return; }
      } else if (ch === '"' && !afterQ && field === '' && start === i) {
        inQ = true; start = i + 1;
      }
    }
    field += text.slice(start);
    this.field = field; this.inQuotes = inQ; this.afterQuote = afterQ;
  }
  emit() {
    const r = this.row; this.row = [];
    // Tamamen boş satırları atla
    if (r.length === 1 && r[0] === '') return;
    this.onRow(r);
  }
  end() {
    if (this.field !== '' || this.row.length) { this.row.push(this.field); this.field = ''; this.emit(); }
  }
}

/** Örnek metinde en tutarlı ayracı seçer. */
function detectDelimiter(sample) {
  const lines = sample.split(/\r?\n/).filter((l) => l.trim() !== '').slice(0, 30);
  if (lines.length === 0) return ';';
  const cands = [';', ',', '\t', '|'];
  let best = ';', bestScore = -1;
  for (const d of cands) {
    const counts = lines.map((l) => {
      let c = 0, q = false;
      for (const ch of l) { if (ch === '"') q = !q; else if (ch === d && !q) c++; }
      return c;
    });
    const nonzero = counts.filter((c) => c > 0).length;
    if (nonzero === 0) continue;
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    const variance = counts.reduce((a, b) => a + (b - mean) ** 2, 0) / counts.length;
    // Çok satırda görünen, satırlar arası tutarlı ve sık ayraç kazanır
    const score = (nonzero / lines.length) * 10 + mean / (1 + variance);
    if (score > bestScore) { bestScore = score; best = d; }
  }
  return best;
}

/** Dosyayı parça parça okuyup satır satır işler. onRow true döndürürse okuma durur. */
async function streamCsv(file, { encoding, bom, delim }, onRow, onProgress) {
  const decoder = new TextDecoder(encoding);
  let stop = false;
  const parser = new CsvParser(delim, (r) => { if (onRow(r) === true) { stop = true; parser.stopped = true; } });
  let offset = bom || 0;
  while (offset < file.size && !stop) {
    const buf = new Uint8Array(await file.slice(offset, Math.min(file.size, offset + CHUNK)).arrayBuffer());
    offset += buf.length;
    parser.push(decoder.decode(buf, { stream: offset < file.size }));
    if (onProgress) onProgress(offset / file.size);
    await tick();
  }
  if (!stop) { parser.push(decoder.decode()); parser.end(); }
}

/* =====================================================================
   Yardımcılar: tür tahmini
   ===================================================================== */
const RE_NUM = /^[-+]?(?:\d{1,3}(?:[.\s]\d{3})+|\d+)(?:,\d+)?$|^[-+]?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/;
const RE_DATE = /^(?:\d{1,2}[./-]\d{1,2}[./-]\d{2,4}|\d{4}-\d{2}-\d{2})(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?$/;
const RE_LEADING_ZERO = /^0\d/;

function classify(v) {
  const s = v.trim();
  if (s === '') return null;
  if (RE_DATE.test(s)) return 'date';
  if (RE_NUM.test(s)) {
    const digits = s.replace(/\D/g, '');
    // TC kimlik, IBAN, telefon, posta kodu gibi değerler sayı yapılmamalı
    if (RE_LEADING_ZERO.test(s.replace(/^[-+]/, '')) || digits.length > 15) return 'text';
    return 'number';
  }
  return 'text';
}

/** Sütunların türünü örnek satırlara göre tahmin eder. */
function guessTypes(rows, colCount) {
  const types = [];
  for (let c = 0; c < colCount; c++) {
    let num = 0, date = 0, text = 0;
    for (const r of rows) {
      const k = classify(r[c] ?? '');
      if (k === 'number') num++; else if (k === 'date') date++; else if (k === 'text') text++;
    }
    const total = num + date + text;
    if (total === 0) types.push('text');
    else if (num / total >= 0.9) types.push('number');
    else if (date / total >= 0.9) types.push('date');
    else types.push('text');
  }
  return types;
}

/** "1.234,56" / "1,234.56" / "1234" → sayı. Çevrilemezse null. */
function parseNumber(s) {
  s = s.trim();
  if (!RE_NUM.test(s)) return null;
  const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
  let norm;
  if (lastComma > lastDot) norm = s.replace(/[.\s]/g, '').replace(',', '.');      // TR biçimi
  else if (lastDot > lastComma) norm = s.replace(/[,\s]/g, '');                      // EN biçimi
  else norm = s.replace(/\s/g, '');
  const n = Number(norm);
  return Number.isFinite(n) ? n : null;
}

/* =====================================================================
   XLSX yazma (inline string + sayı hücreleri, sharedStrings yok)
   ===================================================================== */
function xmlEsc(s) {
  return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function colLetter(n) { // 0 → A, 25 → Z, 26 → AA
  let s = '';
  n++;
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

const CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>';
const ROOT_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>';
const WB_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
const STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
const APP_XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Bilişim Ajans CSV Excel Dönüştürücü</Application></Properties>';
function coreXml() {
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>Bilişim Ajans Araçlar</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;
}
function workbookXml(sheetName) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${xmlEsc(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`;
}
/** Sayfa adı Excel kurallarına uydurulur (31 karakter, yasak karakterler). */
function safeSheetName(s) {
  const t = s.replace(/[\\/?*[\]:]/g, ' ').trim().slice(0, 31);
  return t || 'Sayfa1';
}

/** Satır üretecini XLSX'e çevirir; sheet XML'i parça parça zip'e akıtılır. */
async function writeXlsx({ rows, hasHeader, colTypes, sheetName, onProgress }) {
  const F = await getFflate();
  const chunks = [];
  const zip = new F.Zip((err, data) => { if (err) throw err; chunks.push(data); });
  const addStatic = (name, text) => { const z = new F.ZipDeflate(name, { level: 6 }); zip.add(z); z.push(new TextEncoder().encode(text), true); };
  addStatic('[Content_Types].xml', CONTENT_TYPES);
  addStatic('_rels/.rels', ROOT_RELS);
  addStatic('xl/workbook.xml', workbookXml(sheetName));
  addStatic('xl/_rels/workbook.xml.rels', WB_RELS);
  addStatic('xl/styles.xml', STYLES);
  addStatic('docProps/app.xml', APP_XML);
  addStatic('docProps/core.xml', coreXml());

  // Sütun genişlikleri: ilk satırlara göre kabaca
  const widths = [];
  const measure = (r) => r.forEach((v, c) => { widths[c] = Math.max(widths[c] || 0, Math.min(60, String(v).length)); });

  const sheet = new F.ZipDeflate('xl/worksheets/sheet1.xml', { level: 6 });
  zip.add(sheet);
  const enc = new TextEncoder();
  let buf = [];
  let bufLen = 0;
  const flush = (final) => { sheet.push(enc.encode(buf.join('')), final); buf = []; bufLen = 0; };
  let rowIndex = 0, maxCols = 0;

  // Önce ilk 200 satırı tamponla (genişlik ölçümü için), sonra başlıkla birlikte yaz
  const head = [];
  buf.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">');
  if (hasHeader) buf.push('<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>');
  let colsWritten = false;

  const writeRow = (r) => {
    rowIndex++;
    if (rowIndex > EXCEL_MAX_ROWS) throw new Error('EXCEL_ROWS');
    if (r.length > EXCEL_MAX_COLS) throw new Error('EXCEL_COLS');
    if (r.length > maxCols) maxCols = r.length;
    const parts = [`<row r="${rowIndex}">`];
    const isHeader = hasHeader && rowIndex === 1;
    for (let c = 0; c < r.length; c++) {
      const v = r[c];
      if (v === '' || v == null) continue;
      const ref = `${colLetter(c)}${rowIndex}`;
      if (isHeader) { parts.push(`<c r="${ref}" t="inlineStr" s="1"><is><t xml:space="preserve">${xmlEsc(v)}</t></is></c>`); continue; }
      const type = colTypes[c] || 'text';
      if (type === 'number') {
        const n = parseNumber(v);
        if (n !== null) { parts.push(`<c r="${ref}"><v>${n}</v></c>`); continue; }
      }
      parts.push(`<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEsc(v)}</t></is></c>`);
    }
    parts.push('</row>');
    const s = parts.join('');
    buf.push(s); bufLen += s.length;
    if (bufLen > 512 * 1024) flush(false);
  };

  const start = () => {
    if (colsWritten) return;
    colsWritten = true;
    if (widths.length) {
      buf.push('<cols>');
      widths.forEach((w, c) => buf.push(`<col min="${c + 1}" max="${c + 1}" width="${Math.max(8, Math.min(60, w + 2))}" customWidth="1"/>`));
      buf.push('</cols>');
    }
    buf.push('<sheetData>');
  };

  for await (const r of rows) {
    if (!colsWritten) {
      head.push(r); measure(r);
      if (head.length >= 200) { start(); head.forEach(writeRow); head.length = 0; }
      continue;
    }
    writeRow(r);
    if (rowIndex % 2000 === 0) { onProgress && onProgress(rowIndex); await tick(); }
  }
  if (!colsWritten) { start(); head.forEach(writeRow); }
  buf.push('</sheetData></worksheet>');
  flush(true);
  zip.end();
  const total = chunks.reduce((a, c) => a + c.length, 0);
  const out = new Uint8Array(total);
  let o = 0; for (const c of chunks) { out.set(c, o); o += c.length; }
  return { bytes: out, rowCount: rowIndex, colCount: maxCols };
}

/* =====================================================================
   XLSX okuma
   ===================================================================== */
const DATE_NUMFMT_IDS = new Set([14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 45, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58]);
function unescapeXml(s) {
  if (s.indexOf('&') === -1) return s;
  return s.replace(/&(lt|gt|amp|quot|apos|#x[0-9a-fA-F]+|#\d+);/g, (m, k) => {
    if (k === 'lt') return '<'; if (k === 'gt') return '>'; if (k === 'amp') return '&'; if (k === 'quot') return '"'; if (k === 'apos') return "'";
    const code = k[1] === 'x' ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
    return String.fromCodePoint(code);
  });
}
function textOf(xml) { // bir <si> ya da <is> içindeki tüm <t> parçalarını birleştir
  let out = '';
  const re = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>|<t(?:\s[^>]*)?\/>/g;
  let m;
  while ((m = re.exec(xml))) out += unescapeXml(m[1] || '');
  return out;
}
function colIndex(ref) { // "AB12" → 27
  let n = 0;
  for (let i = 0; i < ref.length; i++) {
    const c = ref.charCodeAt(i);
    if (c < 65 || c > 90) break;
    n = n * 26 + (c - 64);
  }
  return n - 1;
}
function pad2(n) { return String(n).padStart(2, '0'); }
/** Excel seri tarihini "gg.aa.yyyy[ ss:dd]" metnine çevirir (1900 tarih sistemi). */
function serialToDate(n, date1904) {
  let days = Math.floor(n);
  let frac = n - days;
  if (date1904) days += 1462;
  // Excel'in 1900 artık yıl hatası: 60'tan sonrası 1 gün kaydırılır
  if (days > 59) days -= 1;
  const base = Date.UTC(1899, 11, 31);
  const d = new Date(base + days * 86400000);
  let secs = Math.round(frac * 86400);
  const hh = Math.floor(secs / 3600); secs -= hh * 3600;
  const mm = Math.floor(secs / 60); const ss = secs - mm * 60;
  const datePart = days === 0 ? '' : `${pad2(d.getUTCDate())}.${pad2(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
  const timePart = (hh || mm || ss) ? `${pad2(hh)}:${pad2(mm)}${ss ? ':' + pad2(ss) : ''}` : '';
  return [datePart, timePart].filter(Boolean).join(' ');
}

async function readXlsx(file, onProgress) {
  const F = await getFflate();
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes[0] !== 0x50 || bytes[1] !== 0x4B) throw new Error('NOT_ZIP');
  let files;
  try {
    files = F.unzipSync(bytes, { filter: (f) => /^xl\/(workbook\.xml|_rels\/workbook\.xml\.rels|sharedStrings\.xml|styles\.xml|worksheets\/[^/]+\.xml)$/.test(f.name) });
  } catch (e) { throw new Error('ZIP_BROKEN'); }
  const dec = new TextDecoder('utf-8');
  const text = (name) => (files[name] ? dec.decode(files[name]) : null);
  const wb = text('xl/workbook.xml');
  if (!wb) throw new Error('NOT_XLSX');
  onProgress && onProgress(0.1, 'Çalışma kitabı okunuyor');
  await tick();

  // İlişkiler: rId → dosya yolu
  const rels = {};
  const relXml = text('xl/_rels/workbook.xml.rels') || '';
  for (const m of relXml.matchAll(/<Relationship\b([^>]*)\/?>/g)) {
    const attrs = m[1];
    const id = /\bId="([^"]*)"/.exec(attrs)?.[1];
    const target = /\bTarget="([^"]*)"/.exec(attrs)?.[1];
    if (id && target) rels[id] = target.startsWith('/') ? target.slice(1) : 'xl/' + target.replace(/^\.\//, '');
  }
  const date1904 = /<workbookPr\b[^>]*date1904="(1|true)"/.test(wb);
  const sheetsMeta = [];
  for (const m of wb.matchAll(/<sheet\b([^>]*)\/?>/g)) {
    const attrs = m[1];
    const name = unescapeXml(/\bname="([^"]*)"/.exec(attrs)?.[1] || 'Sayfa');
    const rid = /\br:id="([^"]*)"/.exec(attrs)?.[1] || /\bid="([^"]*)"/.exec(attrs)?.[1];
    const hidden = /\bstate="(hidden|veryHidden)"/.test(attrs);
    const path = rels[rid];
    if (path && files[path]) sheetsMeta.push({ name, path, hidden });
  }
  if (!sheetsMeta.length) throw new Error('NO_SHEETS');

  // Paylaşılan dizgeler
  const shared = [];
  const ssXml = text('xl/sharedStrings.xml');
  if (ssXml) {
    const re = /<si>([\s\S]*?)<\/si>|<si\/>/g;
    let m, i = 0;
    while ((m = re.exec(ssXml))) {
      shared.push(m[1] ? textOf(m[1]) : '');
      if (++i % 20000 === 0) { onProgress && onProgress(0.2, 'Metinler okunuyor'); await tick(); }
    }
  }

  // Stiller: hangi hücre biçimi (s="…") tarih?
  const dateStyles = new Set();
  const stXml = text('xl/styles.xml');
  if (stXml) {
    const customDate = new Set();
    const numFmts = /<numFmts\b[^>]*>([\s\S]*?)<\/numFmts>/.exec(stXml)?.[1] || '';
    for (const m of numFmts.matchAll(/<numFmt\b([^>]*)\/?>/g)) {
      const id = Number(/\bnumFmtId="(\d+)"/.exec(m[1])?.[1]);
      const code = unescapeXml(/\bformatCode="([^"]*)"/.exec(m[1])?.[1] || '').replace(/\[[^\]]*\]/g, '').replace(/"[^"]*"/g, '');
      if (/[dmyhs]/i.test(code) && !/[#0]/.test(code)) customDate.add(id);
    }
    const xfs = /<cellXfs\b[^>]*>([\s\S]*?)<\/cellXfs>/.exec(stXml)?.[1] || '';
    let idx = 0;
    for (const m of xfs.matchAll(/<xf\b([^>]*)\/?>/g)) {
      const id = Number(/\bnumFmtId="(\d+)"/.exec(m[1])?.[1] || 0);
      if (DATE_NUMFMT_IDS.has(id) || customDate.has(id)) dateStyles.add(idx);
      idx++;
    }
  }

  // Sayfaları oku
  const sheets = [];
  for (let s = 0; s < sheetsMeta.length; s++) {
    const meta = sheetsMeta[s];
    const xml = dec.decode(files[meta.path]);
    const rows = [];
    const rowRe = /<row\b([^>]*?)(?:\/>|>([\s\S]*?)<\/row>)/g;
    const cellRe = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g;
    let rm, count = 0, lastRow = 0;
    while ((rm = rowRe.exec(xml))) {
      const rnum = Number(/\br="(\d+)"/.exec(rm[1])?.[1] || lastRow + 1);
      // Boş satır boşlukları: satır numaralarını koru
      while (lastRow + 1 < rnum && rows.length) { rows.push([]); lastRow++; }
      lastRow = rnum;
      const row = [];
      let cm, lastCol = -1;
      cellRe.lastIndex = 0;
      while ((cm = cellRe.exec(rm[2] || ''))) {
        const attrs = cm[1], inner = cm[2] || '';
        const ref = /\br="([A-Z]+)\d*"/.exec(attrs)?.[1];
        const ci = ref ? colIndex(ref) : lastCol + 1;
        lastCol = ci;
        const t = /\bt="([^"]*)"/.exec(attrs)?.[1] || 'n';
        const st = Number(/\bs="(\d+)"/.exec(attrs)?.[1] || -1);
        let val = '';
        if (t === 'inlineStr') val = textOf(inner);
        else {
          const v = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1];
          if (v == null) val = '';
          else if (t === 's') val = shared[Number(v)] ?? '';
          else if (t === 'str' || t === 'e') val = unescapeXml(v);
          else if (t === 'b') val = v === '1' ? 'DOĞRU' : 'YANLIŞ';
          else { // sayı
            const n = Number(v);
            if (dateStyles.has(st) && Number.isFinite(n) && n >= 0) val = serialToDate(n, date1904);
            else val = { num: n }; // sayı hücresi: ondalık ayırıcı çıktıda uygulanır
          }
        }
        row[ci] = val;
      }
      for (let i = 0; i < row.length; i++) if (row[i] === undefined) row[i] = '';
      rows.push(row);
      if (++count % 3000 === 0) { onProgress && onProgress(0.3 + 0.7 * ((s + rowRe.lastIndex / xml.length) / sheetsMeta.length), `"${meta.name}" okunuyor`); await tick(); }
    }
    // Sondaki tamamen boş satırları at
    while (rows.length && rows[rows.length - 1].every((v) => v === '')) rows.pop();
    sheets.push({ name: meta.name, rows, hidden: meta.hidden });
  }
  return sheets;
}

/* =====================================================================
   CSV yazma
   ===================================================================== */
function csvCell(v, delim, decimal) {
  let s;
  if (v && typeof v === 'object' && 'num' in v) {
    s = String(v.num);
    if (decimal === ',') s = s.replace('.', ',');
    return s;
  }
  s = v == null ? '' : String(v);
  if (s === '') return '';
  const needs = s.includes(delim) || s.includes('"') || s.includes('\n') || s.includes('\r') || /^\s|\s$/.test(s);
  return needs ? `"${s.replace(/"/g, '""')}"` : s;
}

async function writeCsv({ rows, delim, encoding, decimal, onProgress }) {
  const parts = [];
  let i = 0;
  const lineBuf = [];
  for await (const r of rows) {
    lineBuf.push(r.map((v) => csvCell(v, delim, decimal)).join(delim));
    if (lineBuf.length >= 2000) {
      parts.push(lineBuf.join('\r\n') + '\r\n'); lineBuf.length = 0;
      onProgress && onProgress(i); await tick();
    }
    i++;
  }
  if (lineBuf.length) parts.push(lineBuf.join('\r\n') + '\r\n');
  const text = parts.join('');
  let bytes;
  if (encoding === 'windows-1254') bytes = encodeCp1254(text);
  else {
    const body = new TextEncoder().encode(text);
    if (encoding === 'utf-8-bom') { bytes = new Uint8Array(body.length + 3); bytes.set([0xEF, 0xBB, 0xBF]); bytes.set(body, 3); }
    else bytes = body;
  }
  return { bytes, rowCount: i };
}

/* =====================================================================
   Satır kaynakları (async üreteç)
   ===================================================================== */
async function* csvRows(file, opts, onProgress) {
  // Akışı üretece bağlamak için küçük bir kuyruk
  let queue = [], done = false, wake = null, error = null;
  const p = streamCsv(file, opts, (r) => { queue.push(r); if (wake) wake(); }, (pct) => { onProgress && onProgress(pct); })
    .then(() => { done = true; wake && wake(); })
    .catch((e) => { error = e; done = true; wake && wake(); });
  while (true) {
    if (queue.length) { const batch = queue; queue = []; for (const r of batch) yield r; continue; }
    if (done) break;
    await new Promise((r) => { wake = r; });
    wake = null;
  }
  await p;
  if (error) throw error;
}
async function* arrayRows(arr) { for (const r of arr) yield r; }

/* =====================================================================
   Arayüz
   ===================================================================== */
const els = {
  drop: $('drop'), fileInfo: $('file-info'), warnBig: $('warn-big'),
  inOptions: $('input-options'), inEncoding: $('in-encoding'), inDelim: $('in-delim'), inHeader: $('in-header'),
  sheetField: $('sheet-field'), inSheet: $('in-sheet'), encField: $('enc-field'), delimField: $('delim-field'),
  detected: $('detected'), stats: $('stats'), previewWrap: $('preview-wrap'), previewTable: $('preview-table'), previewNote: $('preview-note'),
  outOptions: $('output-options'), modeField: $('mode-field'), modeXlsx: $('mode-xlsx'), modeCsv: $('mode-csv'),
  csvOut: $('csv-out-options'), preset: $('out-preset'), outDelim: $('out-delim'), outEncoding: $('out-encoding'), outDecimal: $('out-decimal'), decimalField: $('decimal-field'),
  actions: $('actions'), convert: $('convert'), clear: $('clear'),
  progress: $('progress'), error: $('error'), result: $('result'), resultInfo: $('result-info'), download: $('download'),
};

createDropzone({ el: els.drop, accept: '.csv,.txt,.tsv,.tab,.xlsx,.xlsm,text/csv,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', multiple: false, onFiles: (f) => loadFile(f[0]) });

function resetUI() {
  showError(els.error, null);
  setProgress(els.progress, null);
  els.result.classList.remove('is-active');
  state.out = null;
}
function clearAll() {
  Object.assign(state, { file: null, kind: null, detected: null, sheets: null, sheetIndex: 0, previewRows: [], rowCount: 0, colCount: 0, colTypes: [], colOverride: [], out: null });
  resetUI();
  els.fileInfo.textContent = '';
  els.warnBig.hidden = true;
  els.inOptions.hidden = true; els.previewWrap.hidden = true; els.outOptions.hidden = true; els.actions.hidden = true;
  els.detected.textContent = '';
  els.previewTable.innerHTML = '';
}
els.clear.addEventListener('click', clearAll);

function fail(msg) { showError(els.error, msg); setProgress(els.progress, null); }

function friendly(err) {
  const m = String(err && err.message || err || '');
  if (m === 'NOT_ZIP' || m === 'NOT_XLSX') return 'Bu dosya bir Excel (.xlsx) dosyası değil. Eski ".xls" biçimini Excel\'de "Farklı kaydet → Excel Çalışma Kitabı (.xlsx)" ile dönüştürüp tekrar deneyin.';
  if (m === 'ZIP_BROKEN') return 'Excel dosyası bozuk ya da şifreli görünüyor; Excel\'de açıp şifreyi kaldırarak yeniden kaydedin.';
  if (m === 'NO_SHEETS') return 'Dosyada okunabilir çalışma sayfası bulunamadı. Dosyayı Excel\'de açıp .xlsx olarak yeniden kaydedin.';
  if (m === 'EXCEL_ROWS') return 'Dosya Excel\'in satır sınırını (1.048.576) aşıyor. CSV\'yi birkaç parçaya bölüp her parçayı ayrı dönüştürün.';
  if (m === 'EXCEL_COLS') return 'Dosya Excel\'in sütun sınırını (16.384) aşıyor. Ayraç yanlış algılanmış olabilir; "Ayraç" seçeneğini elle belirleyin.';
  if (m === 'EMPTY') return 'Dosya boş görünüyor ya da hiç satır okunamadı. Ayraç ve kodlama seçeneklerini değiştirip tekrar deneyin.';
  if (m === 'NOT_TEXT') return 'Bu dosya metin tabanlı bir CSV değil (ikili veri içeriyor). CSV, TXT ya da XLSX dosyası seçin; PDF tablolar için önce "PDF Metin Çıkar" aracını kullanın.';
  if (/memory|allocation|Invalid array length/i.test(m)) return 'Dosya tarayıcı belleği için fazla büyük. Dosyayı parçalara bölüp tekrar deneyin.';
  return 'İşlem sırasında beklenmeyen bir hata oluştu. Dosyayı kontrol edip tekrar deneyin.';
}

/* ---------- Dosya yükleme ---------- */
async function loadFile(file) {
  if (state.busy) return;
  clearAll();
  state.file = file;
  els.fileInfo.textContent = `${file.name} · ${formatBytes(file.size)}`;
  els.warnBig.hidden = file.size <= BIG_FILE;
  state.busy = true;
  try {
    const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    const isZip = head[0] === 0x50 && head[1] === 0x4B;
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (isZip || ext === 'xlsx' || ext === 'xlsm') {
      state.kind = 'xlsx';
      await loadXlsx(file);
    } else {
      state.kind = 'csv';
      await loadCsv(file);
    }
  } catch (e) {
    console.error(e);
    fail(friendly(e));
    els.inOptions.hidden = true; els.previewWrap.hidden = true; els.outOptions.hidden = true; els.actions.hidden = true;
  } finally {
    state.busy = false;
  }
}

/** CSV: kodlama + ayraç tahmini, ardından tam okuma (önizleme + sayım). */
async function loadCsv(file) {
  const sample = new Uint8Array(await file.slice(0, SAMPLE_BYTES).arrayBuffer());
  // İkili dosya kontrolü (NUL bayt, UTF-16 hariç)
  const det = detectEncoding(sample);
  if (ext(file) === 'pdf' || (sample[0] === 0x25 && sample[1] === 0x50 && sample[2] === 0x44 && sample[3] === 0x46)) throw new Error('NOT_TEXT');
  if (!det.encoding.startsWith('utf-16')) {
    // NUL ya da çok sayıda denetim karakteri → metin değil
    let bad = 0; const n = Math.min(sample.length, 8192);
    for (let i = 0; i < n; i++) { const b = sample[i]; if (b === 0 || (b < 0x20 && b !== 9 && b !== 10 && b !== 13)) bad++; }
    if (bad > 0 && bad > n * 0.005) throw new Error('NOT_TEXT');
  }
  state.detected = det;
  const sampleText = new TextDecoder(det.encoding).decode(sample.subarray(det.bom));
  state.detected.delimiter = detectDelimiter(sampleText);
  els.inEncoding.value = 'auto'; els.inDelim.value = 'auto';
  els.inHeader.checked = true;
  els.sheetField.hidden = true; els.encField.hidden = false; els.delimField.hidden = false;
  els.inOptions.hidden = false;
  await analyzeCsv();
}
function ext(file) { return (file.name.split('.').pop() || '').toLowerCase(); }

function currentCsvOpts() {
  const encSel = els.inEncoding.value;
  const d = state.detected;
  // BOM varsa kullanıcı hangi kodlamayı seçerse seçsin atlanır (BOM baytları veriye ait değil)
  const encoding = encSel === 'auto' ? d.encoding : (encSel === 'utf-8-bom' ? 'utf-8' : encSel);
  const bom = d.bom;
  const delimSel = els.inDelim.value;
  const delim = delimSel === 'auto' ? d.delimiter : (delimSel === 'tab' ? '\t' : delimSel);
  return { encoding, bom, delim };
}

async function analyzeCsv() {
  resetUI();
  const opts = currentCsvOpts();
  const encLabel = els.inEncoding.value === 'auto' ? `${ENC_LABEL[state.detected.label]} (otomatik)` : ENC_LABEL[els.inEncoding.value] || opts.encoding;
  const delimLabel = els.inDelim.value === 'auto' ? `${DELIM_LABEL[opts.delim]} (otomatik)` : DELIM_LABEL[opts.delim];
  els.detected.textContent = `Kodlama: ${encLabel} · Ayraç: ${delimLabel}`;
  const preview = [], sample = [];
  let count = 0, maxCols = 0;
  setProgress(els.progress, 0, 'Dosya inceleniyor…');
  await streamCsv(state.file, opts, (r) => {
    count++;
    if (r.length > maxCols) maxCols = r.length;
    if (preview.length < PREVIEW_ROWS) preview.push(r);
    if (sample.length < SAMPLE_ROWS) sample.push(r);
  }, (pct) => setProgress(els.progress, pct * 100, `İnceleniyor… ${Math.round(pct * 100)}%`));
  setProgress(els.progress, null);
  if (count === 0) throw new Error('EMPTY');
  state.previewRows = preview; state.rowCount = count; state.colCount = maxCols;
  const hasHeader = els.inHeader.checked;
  state.colTypes = guessTypes(hasHeader ? sample.slice(1) : sample, maxCols);
  state.colOverride = new Array(maxCols).fill('auto');
  renderPreview();
  setupOutputOptions();
}

async function loadXlsx(file) {
  setProgress(els.progress, 5, 'Excel dosyası açılıyor…');
  const sheets = await readXlsx(file, (pct, label) => setProgress(els.progress, pct * 100, label));
  setProgress(els.progress, null);
  state.sheets = sheets;
  // İlk görünür ve dolu sayfayı seç
  state.sheetIndex = Math.max(0, sheets.findIndex((s) => !s.hidden && s.rows.length));
  els.inSheet.innerHTML = '';
  sheets.forEach((s, i) => {
    const o = document.createElement('option');
    o.value = String(i);
    o.textContent = `${s.name} (${s.rows.length} satır${s.hidden ? ', gizli' : ''})`;
    els.inSheet.appendChild(o);
  });
  els.inSheet.value = String(state.sheetIndex);
  els.inHeader.checked = true;
  els.sheetField.hidden = sheets.length < 2; els.encField.hidden = true; els.delimField.hidden = true;
  els.inOptions.hidden = false;
  els.detected.textContent = `Excel çalışma kitabı · ${sheets.length} sayfa`;
  analyzeXlsx();
}
function analyzeXlsx() {
  resetUI();
  const sheet = state.sheets[state.sheetIndex];
  const rows = sheet.rows;
  if (!rows.length) throw new Error('EMPTY');
  state.rowCount = rows.length;
  state.colCount = rows.reduce((m, r) => Math.max(m, r.length), 0);
  state.previewRows = rows.slice(0, PREVIEW_ROWS);
  const strRows = rows.slice(0, SAMPLE_ROWS).map((r) => r.map((v) => (v && typeof v === 'object') ? String(v.num) : v));
  state.colTypes = guessTypes(els.inHeader.checked ? strRows.slice(1) : strRows, state.colCount);
  // Gerçek sayı hücreleri varsa sütun sayı sayılır
  for (let c = 0; c < state.colCount; c++) if (rows.slice(0, SAMPLE_ROWS).some((r) => r[c] && typeof r[c] === 'object')) state.colTypes[c] = 'number';
  state.colOverride = new Array(state.colCount).fill('auto');
  renderPreview();
  setupOutputOptions();
}

/* ---------- Önizleme ---------- */
const TYPE_LABEL = { number: 'sayı', date: 'tarih', text: 'metin' };
function renderPreview() {
  const hasHeader = els.inHeader.checked;
  const rows = state.previewRows;
  const t = els.previewTable;
  t.innerHTML = '';
  const dataRows = hasHeader ? state.rowCount - 1 : state.rowCount;
  els.stats.textContent = `${dataRows.toLocaleString('tr-TR')} veri satırı${hasHeader ? ' + 1 başlık' : ''} · ${state.colCount.toLocaleString('tr-TR')} sütun`;
  const thead = document.createElement('thead');
  const trType = document.createElement('tr');
  const trHead = document.createElement('tr');
  for (let c = 0; c < state.colCount; c++) {
    const thT = document.createElement('th'); thT.scope = 'col'; thT.className = 'ce-type';
    const label = document.createElement('label');
    const span = document.createElement('span'); span.className = 'visually-hidden'; span.textContent = `${c + 1}. sütun türü`;
    const sel = document.createElement('select');
    sel.className = 'ce-type-select'; sel.dataset.col = String(c);
    const guessed = TYPE_LABEL[state.colTypes[c]];
    sel.innerHTML = `<option value="auto">otomatik: ${guessed}</option><option value="text">metin</option><option value="number">sayı</option>`;
    sel.value = state.colOverride[c] || 'auto';
    sel.addEventListener('change', () => { state.colOverride[c] = sel.value; resetUI(); });
    sel.title = 'Excel\'e yazılırken bu sütunun türü';
    label.append(span, sel); thT.appendChild(label); trType.appendChild(thT);
    const th = document.createElement('th'); th.scope = 'col';
    th.textContent = hasHeader ? cellText(rows[0]?.[c]) || `Sütun ${c + 1}` : colLetter(c);
    trHead.appendChild(th);
  }
  thead.append(trHead, state.kind === 'csv' ? trType : document.createDocumentFragment());
  t.appendChild(thead);
  const tbody = document.createElement('tbody');
  const start = hasHeader ? 1 : 0;
  for (let i = start; i < rows.length; i++) {
    const tr = document.createElement('tr');
    for (let c = 0; c < state.colCount; c++) {
      const td = document.createElement('td');
      const v = rows[i][c];
      const s = cellText(v);
      td.textContent = s.length > 80 ? s.slice(0, 80) + '…' : s;
      if (v && typeof v === 'object') td.classList.add('is-num');
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  const shown = rows.length - start;
  els.previewNote.textContent = dataRows > shown ? `İlk ${shown} satır gösteriliyor; dönüştürmede tüm satırlar işlenir.` : '';
  els.previewWrap.hidden = false;
}
function cellText(v) {
  if (v == null) return '';
  if (typeof v === 'object') return String(v.num).replace('.', ',');
  return String(v);
}

/* ---------- Çıktı seçenekleri ---------- */
const PRESETS = {
  'tr-excel': { delim: ';', encoding: 'utf-8-bom', decimal: ',' },
  'standard': { delim: ',', encoding: 'utf-8', decimal: '.' },
  'ansi': { delim: ';', encoding: 'windows-1254', decimal: ',' },
};
function setupOutputOptions() {
  if (state.kind === 'csv') {
    els.modeField.hidden = false;
    if (!els.modeXlsx.checked && !els.modeCsv.checked) els.modeXlsx.checked = true;
  } else {
    els.modeField.hidden = true;
    els.modeCsv.checked = true;
  }
  if (!els.preset.dataset.touched) { els.preset.value = 'tr-excel'; applyPreset(); }
  updateModeUI();
  els.outOptions.hidden = false;
  els.actions.hidden = false;
}
function updateModeUI() {
  const csvMode = els.modeCsv.checked;
  els.csvOut.hidden = !csvMode;
  // CSV → CSV onarımında değerler olduğu gibi kalır; ondalık dönüşümü yalnızca Excel kaynağında anlamlı
  els.decimalField.hidden = state.kind !== 'xlsx';
  els.convert.textContent = csvMode ? 'CSV olarak indir' : 'Excel (.xlsx) oluştur';
}
function applyPreset() {
  const p = PRESETS[els.preset.value];
  if (!p) return;
  els.outDelim.value = p.delim === '\t' ? 'tab' : p.delim;
  els.outEncoding.value = p.encoding;
  els.outDecimal.value = p.decimal;
}
els.preset.addEventListener('change', () => { els.preset.dataset.touched = '1'; applyPreset(); resetUI(); });
[els.outDelim, els.outEncoding, els.outDecimal].forEach((el) => el.addEventListener('change', () => {
  els.preset.dataset.touched = '1';
  const cur = { delim: els.outDelim.value === 'tab' ? '\t' : els.outDelim.value, encoding: els.outEncoding.value, decimal: els.outDecimal.value };
  const match = Object.entries(PRESETS).find(([, p]) => p.delim === cur.delim && p.encoding === cur.encoding && (state.kind !== 'xlsx' || p.decimal === cur.decimal));
  els.preset.value = match ? match[0] : 'custom';
  resetUI();
}));
[els.modeXlsx, els.modeCsv].forEach((el) => el.addEventListener('change', () => { updateModeUI(); resetUI(); }));

// Girdi seçenekleri değişince yeniden incele
[els.inEncoding, els.inDelim].forEach((el) => el.addEventListener('change', async () => {
  if (!state.file || state.kind !== 'csv' || state.busy) return;
  state.busy = true;
  try { await analyzeCsv(); } catch (e) { fail(friendly(e)); } finally { state.busy = false; }
}));
els.inHeader.addEventListener('change', () => {
  if (!state.file) return;
  if (state.kind === 'csv') {
    const sample = state.previewRows;
    state.colTypes = guessTypes(els.inHeader.checked ? sample.slice(1) : sample, state.colCount);
  }
  resetUI();
  try { if (state.kind === 'csv') renderPreview(); else analyzeXlsx(); } catch (e) { fail(friendly(e)); }
});
els.inSheet.addEventListener('change', () => { state.sheetIndex = Number(els.inSheet.value); try { analyzeXlsx(); } catch (e) { fail(friendly(e)); } });

/* ---------- Dönüştür ---------- */
els.convert.addEventListener('click', async () => {
  if (!state.file || state.busy) return;
  state.busy = true;
  els.convert.disabled = true;
  resetUI();
  const t0 = performance.now();
  try {
    const hasHeader = els.inHeader.checked;
    const toCsv = els.modeCsv.checked;
    const base = baseName(state.file.name);
    let bytes, name, info;
    const total = state.rowCount;
    const pct = (i) => Math.min(99, Math.round(i / Math.max(1, total) * 100));
    if (toCsv) {
      const delim = els.outDelim.value === 'tab' ? '\t' : els.outDelim.value;
      const encoding = els.outEncoding.value;
      const decimal = els.outDecimal.value;
      const rows = state.kind === 'csv'
        ? csvRows(state.file, currentCsvOpts(), (p) => setProgress(els.progress, p * 100, `Dönüştürülüyor… ${Math.round(p * 100)}%`))
        : arrayRows(state.sheets[state.sheetIndex].rows);
      setProgress(els.progress, 1, 'Dönüştürülüyor…');
      const r = await writeCsv({ rows, delim, encoding, decimal, onProgress: (i) => state.kind === 'xlsx' && setProgress(els.progress, pct(i), `Dönüştürülüyor… ${pct(i)}%`) });
      bytes = r.bytes;
      const suffix = state.kind === 'xlsx' && state.sheets.length > 1 ? `-${safeFile(state.sheets[state.sheetIndex].name)}` : '';
      name = `${base}${suffix}.csv`;
      info = `${r.rowCount.toLocaleString('tr-TR')} satır · ${DELIM_LABEL[delim]} · ${ENC_LABEL[encoding]} · ${formatBytes(bytes.length)}`;
    } else {
      const colTypes = state.colTypes.map((t, c) => (state.colOverride[c] && state.colOverride[c] !== 'auto') ? state.colOverride[c] : t);
      const rows = csvRows(state.file, currentCsvOpts(), (p) => setProgress(els.progress, p * 100, `Dönüştürülüyor… ${Math.round(p * 100)}%`));
      setProgress(els.progress, 1, 'Dönüştürülüyor…');
      const r = await writeXlsx({ rows, hasHeader, colTypes, sheetName: safeSheetName(base), onProgress: () => {} });
      bytes = r.bytes;
      name = `${base}.xlsx`;
      const numCols = colTypes.filter((t) => t === 'number').length;
      info = `${r.rowCount.toLocaleString('tr-TR')} satır · ${r.colCount} sütun${numCols ? ` · ${numCols} sayı sütunu` : ''} · ${formatBytes(bytes.length)}`;
    }
    setProgress(els.progress, 100, 'Tamamlandı');
    const mime = toCsv ? 'text/csv;charset=utf-8' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    state.out = { blob: new Blob([bytes], { type: mime }), name };
    const secs = ((performance.now() - t0) / 1000).toFixed(1);
    els.resultInfo.textContent = `${name} · ${info} · ${secs} sn`;
    els.result.classList.add('is-active');
    els.download.focus();
    setTimeout(() => setProgress(els.progress, null), 600);
  } catch (e) {
    console.error(e);
    fail(friendly(e));
  } finally {
    state.busy = false;
    els.convert.disabled = false;
  }
});
function safeFile(s) { return s.replace(/[\\/:*?"<>|]+/g, '-').trim() || 'sayfa'; }
els.download.addEventListener('click', () => { if (state.out) downloadBlob(state.out.blob, state.out.name); });
