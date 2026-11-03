// CSV ↔ JSON ↔ Markdown/HTML/SQL dönüştürücü — saf JS, kütüphane yok. Veri tarayıcıdan çıkmaz.
import { createDropzone, showError, setProgress, formatBytes, downloadBlob, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const WARN_SIZE = 5 * 1024 * 1024;   // bu boyutun üstünde yavaşlama uyarısı
const BIG_FILE = 50 * 1024 * 1024;   // bu boyutun üstünde güçlü uyarı
const PREVIEW_ROWS = 50;

const input = $('input');
const output = $('output');

// Durum: ayrıştırılmış tablo ve sütun seçimi
let table = null;            // { headers: string[], rows: any[][], source: 'csv'|'json', delim }
let cols = [];               // [{ idx, on }] görüntüleme/çıktı sırası
let fileBase = 'veri';
let lastExt = 'json';

/* ---------- CSV ayrıştırma ---------- */
/** Tırnak, çift tırnak kaçışı ve satır içi satır sonlarını destekleyen ayrıştırıcı. */
function parseCsv(text, delim) {
  const rows = [];
  let row = [], cell = '', inQ = false, i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i += 2; continue; }
        inQ = false; i++; continue;
      }
      cell += c; i++; continue;
    }
    if (c === '"' && cell === '') { inQ = true; i++; continue; }
    if (c === delim) { row.push(cell); cell = ''; i++; continue; }
    if (c === '\r' || c === '\n') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = ''; rows.push(row); row = []; i++; continue;
    }
    cell += c; i++;
  }
  if (inQ) throw new Error('Tırnak kapatılmamış. Bir hücrenin açılış tırnağının kapanışı eksik; çift tırnak (") sayısını kontrol edin ya da hücre içindeki tırnağı iki kez yazın ("").');
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  // tamamen boş satırları at
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ''));
}

/** Ayracı otomatik bulur: tutarlı sütun sayısı veren ve en çok sütun üreten aday seçilir. */
function detectDelimiter(text) {
  const sample = text.slice(0, 20000).split(/\r\n|\n|\r/).slice(0, 12).join('\n');
  let best = ',', bestScore = -1;
  for (const d of [',', ';', '\t']) {
    let rows;
    try { rows = parseCsv(sample, d); } catch { continue; }
    if (!rows.length) continue;
    const w = rows[0].length;
    if (w < 2) continue;
    const consistent = rows.filter((r) => r.length === w).length;
    const score = consistent * 100 + w;
    if (score > bestScore) { bestScore = score; best = d; }
  }
  return best;
}

/* ---------- JSON → tablo ---------- */
/** İç içe nesneleri "a.b" anahtarlarına düzleştirir; diziler JSON metni olarak kalır. */
function flatten(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) out[key] = JSON.stringify(v);
    else if (v && typeof v === 'object') {
      if (Object.keys(v).length) flatten(v, key, out); else out[key] = '';
    } else out[key] = v === null || v === undefined ? '' : v;
  }
  return out;
}

function jsonToTable(data, hasHeader) {
  if (data && typeof data === 'object' && !Array.isArray(data)) data = [data];
  if (!Array.isArray(data)) throw new Error('JSON bir dizi ([ … ]) ya da nesne ({ … }) olmalı. Tek bir sayı veya metin tablo oluşturmaz.');
  if (!data.length) throw new Error('JSON dizisi boş. En az bir kayıt içeren bir dizi yapıştırın.');
  if (data.every((r) => Array.isArray(r))) {
    const w = Math.max(...data.map((r) => r.length));
    const cellOf = (v) => (v === null || v === undefined ? '' : (typeof v === 'object' ? JSON.stringify(v) : v));
    const grid = data.map((r) => Array.from({ length: w }, (_, i) => cellOf(r[i])));
    if (hasHeader) return { headers: grid[0].map((h, i) => String(h) || `Sütun${i + 1}`), rows: grid.slice(1), source: 'json' };
    return { headers: grid[0].map((_, i) => `Sütun${i + 1}`), rows: grid, source: 'json' };
  }
  const flats = data.map((r) => (r && typeof r === 'object' && !Array.isArray(r) ? flatten(r, '', {}) : { değer: r }));
  const headers = [];
  const seen = new Set();
  for (const f of flats) for (const k of Object.keys(f)) if (!seen.has(k)) { seen.add(k); headers.push(k); }
  return { headers, rows: flats.map((f) => headers.map((h) => (h in f ? f[h] : ''))), source: 'json' };
}

/* ---------- Girdi → tablo ---------- */
function buildTable(text) {
  const mode = $('opt-in').value;           // auto | csv | json
  const hasHeader = $('opt-header').checked;
  const trimmed = text.replace(/^﻿/, '').trim();
  if (!trimmed) return null;
  const looksJson = /^[\[{]/.test(trimmed);
  if (mode === 'json' || (mode === 'auto' && looksJson)) {
    let data;
    try { data = JSON.parse(trimmed); } catch (e) {
      if (mode === 'json') throw new Error('JSON ayrıştırılamadı (' + e.message + '). Tırnakları, virgülleri ve parantezleri kontrol edin ya da "Girdi türü"nü CSV yapın.');
      data = undefined;
    }
    if (data !== undefined) return jsonToTable(data, hasHeader);
  }
  const clean = text.replace(/^﻿/, '');
  const dsel = $('opt-delim').value;
  const delim = dsel === 'auto' ? detectDelimiter(clean) : dsel === 'tab' ? '\t' : dsel;
  const rows = parseCsv(clean, delim);
  if (!rows.length) return null;
  const w = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => { const c = r.slice(); while (c.length < w) c.push(''); return c; });
  let headers;
  let body;
  if (hasHeader) {
    headers = grid[0].map((h, i) => h.trim() || `Sütun${i + 1}`);
    body = grid.slice(1);
  } else {
    headers = grid[0].map((_, i) => `Sütun${i + 1}`);
    body = grid;
  }
  return { headers, rows: body, source: 'csv', delim };
}

/* ---------- Değer yardımcıları ---------- */
const NUM_RE = /^-?(0|[1-9]\d{0,14})(\.\d+)?$/;
const isNumStr = (s) => typeof s === 'string' && NUM_RE.test(s.trim());

/** Çıktı için hücreyi türlü değere çevirir (sayı/true/false). Baştaki sıfırlı değerler metin kalır. */
function typed(v, infer) {
  if (typeof v !== 'string' || !infer) return v;
  const t = v.trim();
  if (isNumStr(t)) return Number(t);
  if (t === 'true') return true;
  if (t === 'false') return false;
  return v;
}
const str = (v) => (v === null || v === undefined ? '' : String(v));

function activeCols() { return cols.filter((c) => c.on); }

/* ---------- Çıktı üreticileri ---------- */
function toJson(headers, rows, infer, kind, indent) {
  let data;
  if (kind === 'json-arr') data = [headers, ...rows.map((r) => r.map((v) => typed(v, infer)))];
  else data = rows.map((r) => Object.fromEntries(headers.map((h, i) => [h, typed(r[i], infer)])));
  return JSON.stringify(data, null, indent);
}

function csvCell(v, d) {
  const s = str(v);
  return (s.includes(d) || /["\r\n]/.test(s) || /^\s|\s$/.test(s)) ? `"${s.replace(/"/g, '""')}"` : s;
}
function toCsv(headers, rows, d) {
  return [headers, ...rows].map((r) => r.map((v) => csvCell(v, d)).join(d)).join('\r\n');
}

function toMarkdown(headers, rows) {
  const esc = (v) => str(v).replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
  const head = `| ${headers.map(esc).join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  return [head, sep, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');
}

function htmlEsc(s) { return str(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function toHtml(headers, rows) {
  const th = headers.map((h) => `      <th>${htmlEsc(h)}</th>`).join('\n');
  const body = rows.map((r) => `    <tr>\n${r.map((v) => `      <td>${htmlEsc(v)}</td>`).join('\n')}\n    </tr>`).join('\n');
  return `<table>\n  <thead>\n    <tr>\n${th}\n    </tr>\n  </thead>\n  <tbody>\n${body}\n  </tbody>\n</table>`;
}

function toSql(headers, rows, name, dialect) {
  const q = dialect === 'mysql' ? '`' : '"';
  const ident = (s) => `${q}${String(s).replace(/[`"]/g, '')}${q}`;
  const tname = (name || 'tablo').trim().replace(/[^\p{L}\p{N}_]/gu, '_') || 'tablo';
  const val = (v) => {
    if (v === '' || v === null || v === undefined) return 'NULL';
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (isNumStr(v)) return v.trim();
    return `'${String(v).replace(/'/g, "''")}'`;
  };
  const colList = headers.map(ident).join(', ');
  return rows.map((r) => `INSERT INTO ${ident(tname)} (${colList}) VALUES (${r.map(val).join(', ')});`).join('\n');
}

/* ---------- Ana dönüşüm ---------- */
function currentData() {
  const act = activeCols();
  return { headers: act.map((c) => table.headers[c.idx]), rows: table.rows.map((r) => act.map((c) => r[c.idx])) };
}

function setButtons(on) { $('btn-copy').disabled = !on; $('btn-download').disabled = !on; $('btn-swap').disabled = !on; }

function render() {
  showError($('error'), '');
  const kind = $('opt-out').value;
  $('sql-opts').hidden = kind !== 'sql';
  $('csv-opts').hidden = kind !== 'csv';
  $('json-opts').hidden = !kind.startsWith('json');
  if (!table) { output.value = ''; $('stats').textContent = ''; $('preview-box').hidden = true; setButtons(false); return; }
  const { headers, rows } = currentData();
  if (!headers.length) {
    output.value = '';
    renderPreview();
    showError($('error'), 'Hiç sütun seçili değil. Önizleme tablosunda en az bir sütunun kutusunu işaretleyin.');
    setButtons(false);
    return;
  }
  const infer = $('opt-infer').checked;
  let out = '';
  if (kind === 'json-obj' || kind === 'json-arr') {
    const ind = $('opt-indent').value;
    out = toJson(headers, rows, infer, kind, ind === 'tab' ? '\t' : Number(ind));
    lastExt = 'json';
  } else if (kind === 'csv') {
    const d = $('opt-csvdelim').value === 'tab' ? '\t' : $('opt-csvdelim').value;
    out = toCsv(headers, rows, d);
    lastExt = d === '\t' ? 'tsv' : 'csv';
  } else if (kind === 'md') { out = toMarkdown(headers, rows); lastExt = 'md'; }
  else if (kind === 'html') { out = toHtml(headers, rows); lastExt = 'html'; }
  else { out = toSql(headers, rows, $('opt-table').value, $('opt-dialect').value); lastExt = 'sql'; }
  output.value = out;
  const dn = { ',': 'virgül', ';': 'noktalı virgül', '\t': 'sekme' };
  const src = table.source === 'csv' ? ` · algılanan ayraç: ${dn[table.delim]}` : ' · kaynak: JSON';
  $('stats').textContent = `${rows.length} satır · ${headers.length} sütun${src}`;
  setButtons(true);
  renderPreview();
}

/* ---------- Önizleme tablosu: sütun seç/sırala ---------- */
function renderPreview() {
  $('preview-box').hidden = false;
  const tb = $('preview');
  tb.textContent = '';
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');
  cols.forEach((c, pos) => {
    const name = table.headers[c.idx];
    const th = document.createElement('th');
    th.scope = 'col';
    const lab = document.createElement('label');
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = c.on;
    cb.setAttribute('aria-label', `${name} sütununu dahil et`);
    cb.addEventListener('change', () => { c.on = cb.checked; render(); });
    lab.append(cb, ' ', document.createTextNode(name));
    const mv = document.createElement('span');
    mv.className = 'cj-move';
    const l = document.createElement('button');
    l.type = 'button'; l.textContent = '←'; l.disabled = pos === 0;
    l.setAttribute('aria-label', `${name} sütununu sola taşı`);
    l.addEventListener('click', () => { [cols[pos - 1], cols[pos]] = [cols[pos], cols[pos - 1]]; render(); });
    const r = document.createElement('button');
    r.type = 'button'; r.textContent = '→'; r.disabled = pos === cols.length - 1;
    r.setAttribute('aria-label', `${name} sütununu sağa taşı`);
    r.addEventListener('click', () => { [cols[pos + 1], cols[pos]] = [cols[pos], cols[pos + 1]]; render(); });
    mv.append(l, r);
    th.append(lab, mv);
    if (!c.on) th.className = 'cj-off';
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  tb.appendChild(thead);
  const tbody = document.createElement('tbody');
  table.rows.slice(0, PREVIEW_ROWS).forEach((row) => {
    const tr = document.createElement('tr');
    cols.forEach((c) => {
      const td = document.createElement('td');
      td.textContent = str(row[c.idx]);
      if (!c.on) td.className = 'cj-off';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  tb.appendChild(tbody);
  $('preview-note').textContent = table.rows.length > PREVIEW_ROWS
    ? `Önizlemede ilk ${PREVIEW_ROWS} satır gösteriliyor; çıktı ${table.rows.length} satırın tamamını içerir.`
    : `${table.rows.length} satırın tamamı gösteriliyor.`;
}

/* ---------- Girdi işleme ---------- */
let timer = null;
function parseInput() {
  $('warning').classList.remove('is-active');
  try {
    table = buildTable(input.value);
    cols = table ? table.headers.map((_, idx) => ({ idx, on: true })) : [];
  } catch (e) {
    table = null;
    cols = [];
    output.value = '';
    $('stats').textContent = '';
    $('preview-box').hidden = true;
    setButtons(false);
    showError($('error'), e.message || 'Veri okunamadı. Girdiyi kontrol edin.');
    return;
  }
  render();
}
function schedule() { clearTimeout(timer); timer = setTimeout(() => { timer = null; parseInput(); }, 150); }
// Bekleyen yazma varsa önce onu işle, sonra çıktıyı yenile
function refresh() { if (timer) { clearTimeout(timer); timer = null; parseInput(); } else if (table) render(); }

async function loadFile(file) {
  showError($('error'), '');
  const warn = $('warning');
  if (file.size > BIG_FILE) { warn.textContent = `Dosya çok büyük (${formatBytes(file.size)}). Tarayıcı yavaşlayabilir ya da bellek yetmeyebilir; mümkünse dosyayı bölün.`; warn.classList.add('is-active'); }
  else if (file.size > WARN_SIZE) { warn.textContent = `Dosya ${formatBytes(file.size)}; dönüşüm birkaç saniye sürebilir.`; warn.classList.add('is-active'); }
  setProgress($('progress'), 20, 'Dosya okunuyor…');
  await tick();
  try {
    const buf = await file.arrayBuffer();
    let text = new TextDecoder('utf-8').decode(buf);
    // UTF-8 değilse (eski Excel Türkçe CSV'si) Windows-1254 ile yeniden dene
    if (text.includes('�')) { try { text = new TextDecoder('windows-1254').decode(buf); } catch { /* desteklenmiyorsa olduğu gibi kalsın */ } }
    setProgress($('progress'), 70, 'Ayrıştırılıyor…');
    await tick();
    input.value = text.replace(/^﻿/, '');
    fileBase = file.name.replace(/\.[^.]+$/, '') || 'veri';
    $('file-name').textContent = `${file.name} (${formatBytes(file.size)})`;
    if (/\.json$/i.test(file.name)) $('opt-in').value = 'json';
    else if ($('opt-in').value === 'json') $('opt-in').value = 'auto';
    parseInput();
  } catch (e) {
    showError($('error'), 'Dosya okunamadı. Dosyanın bozuk olmadığından emin olun; .csv, .tsv, .txt veya .json dosyası seçin.');
  } finally { setProgress($('progress'), null); }
}

async function copyOut() {
  try { await navigator.clipboard.writeText(output.value); }
  catch { output.select(); document.execCommand('copy'); }
  const b = $('btn-copy'); const old = b.textContent;
  b.textContent = 'Kopyalandı'; setTimeout(() => { b.textContent = old; }, 1500);
}

function download() {
  const bom = (lastExt === 'csv' || lastExt === 'tsv') && $('opt-bom').checked ? '﻿' : '';
  const types = { json: 'application/json', csv: 'text/csv', tsv: 'text/tab-separated-values', md: 'text/markdown', html: 'text/html', sql: 'application/sql' };
  downloadBlob(new Blob([bom + output.value], { type: `${types[lastExt]};charset=utf-8` }), `${fileBase}.${lastExt}`);
}

createDropzone({ el: $('drop'), accept: '.csv,.tsv,.txt,.json,text/csv,application/json', multiple: false, onFiles: (f) => loadFile(f[0]) });
input.addEventListener('input', () => { fileBase = 'veri'; $('file-name').textContent = ''; schedule(); });
['opt-in', 'opt-delim', 'opt-header'].forEach((id) => $(id).addEventListener('change', parseInput));
['opt-out', 'opt-indent', 'opt-infer', 'opt-csvdelim', 'opt-dialect'].forEach((id) => $(id).addEventListener('change', refresh));
$('opt-table').addEventListener('input', refresh);
$('btn-copy').addEventListener('click', copyOut);
$('btn-download').addEventListener('click', download);
$('btn-clear').addEventListener('click', () => { input.value = ''; $('file-name').textContent = ''; fileBase = 'veri'; parseInput(); input.focus(); });
$('btn-swap').addEventListener('click', () => {
  // Çıktıyı girdiye taşı: CSV ↔ JSON gidiş-dönüş için
  if (!output.value || !/^(json|csv)/.test($('opt-out').value)) return;
  const isJson = $('opt-out').value.startsWith('json');
  const wasCsv = $('opt-out').value === 'csv';
  input.value = output.value;
  $('opt-in').value = isJson ? 'json' : wasCsv ? 'csv' : 'auto';
  $('opt-out').value = isJson ? 'csv' : 'json-obj';
  $('opt-delim').value = 'auto';
  parseInput();
});
setButtons(false);
