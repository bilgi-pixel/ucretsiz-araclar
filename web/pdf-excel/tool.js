// PDF'den Excel'e (beta) — tamamı tarayıcıda. Dosya hiçbir zaman sunucuya gitmez.
// Yöntem: pdf.js metin öğelerinin koordinatları → satır kümeleme (y toleransı) → sütun kanalları (x boşlukları).
// Yalnızca metin katmanı olan, çizgisiz/çizgili basit tablolar için; taranmış PDF'te OCR gerekir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfJs, loadScript, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;
const MANY_PAGES = 100;
const PREVIEW_ROWS = 40;

const state = {
  file: null, pdf: null, numPages: 0,
  pages: [],            // seçili sayfa numaraları
  data: new Map(),      // sayfa no → { items, width, height }
  bounds: [],           // sütun sınırları (pt, sayfa sol kenarına göre)
  maxW: 600,            // seçili sayfaların en geniş değeri
  tables: [],           // [{ page, rows }]
  prevPage: 1, scale: 1,
  busy: false, gen: 0,
};

createDropzone({ el: $('drop'), accept: '.pdf,application/pdf', multiple: false, onFiles: (f) => openFile(f[0]) });

function resetUi() {
  showError($('error'), null); showError($('warning'), null);
  $('result').classList.remove('is-active');
  setProgress($('progress'), null);
}
function hideAll() {
  $('options').hidden = true; $('workspace').hidden = true; $('actions').hidden = true;
}

async function openFile(file) {
  resetUi(); hideAll();
  state.pdf = null; state.data = new Map(); state.bounds = []; state.tables = [];
  if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') {
    showError($('error'), `"${file.name}" bir PDF dosyası değil. Lütfen .pdf uzantılı bir dosya seçin; Excel dosyasını PDF'e çevirmek için "Excel'i PDF'e Çevir" aracını kullanın.`);
    return;
  }
  if (file.size > BIG_FILE) showError($('warning'), `Dosya ${formatBytes(file.size)}; 50 MB üzerindeki PDF'ler tarayıcıyı yavaşlatabilir. Yalnızca tablo bulunan sayfa aralığını seçmeniz önerilir.`);
  setProgress($('progress'), 10, 'PDF açılıyor…');
  await tick();
  try {
    const pdfjs = await getPdfJs();
    state.pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const s = `${err && err.name} ${err && err.message}`;
    showError($('error'), /PasswordException|password|encrypted/i.test(s)
      ? 'Dosya şifreli görünüyor; önce "PDF Şifre Kaldır" aracıyla şifreyi kaldırın, sonra tekrar deneyin.'
      : /Invalid PDF|InvalidPDF|Missing PDF|header|XRef|corrupt|Unexpected/i.test(s)
        ? `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı başka bir programda açabildiğinizi kontrol edin; açılıyorsa "Farklı Kaydet" ile PDF olarak yeniden kaydedip tekrar seçin.`
        : 'PDF açılamadı. Dosyayı yeniden indirip tekrar deneyin ya da başka bir programdan yeniden kaydedin.');
    return;
  }
  state.file = file;
  state.numPages = state.pdf.numPages;
  $('file-info').textContent = `${file.name} · ${formatBytes(file.size)} · ${state.numPages} sayfa`;
  $('opt-pages').value = state.numPages > MANY_PAGES ? `1-${MANY_PAGES}` : '';
  $('opt-pages').placeholder = `Boş = tümü (1-${state.numPages})`;
  if (state.numPages > MANY_PAGES) showError($('warning'), `PDF ${state.numPages} sayfa; ilk ${MANY_PAGES} sayfa seçildi. Tablonuz başka sayfalardaysa sayfa aralığını (ör. 120-140) değiştirin.`);
  $('options').hidden = false;
  await analyze(true);
}

/** Sayfa aralığını okur; geçersizse hata verir. */
function readPages() {
  const expr = $('opt-pages').value.trim();
  if (!expr) return Array.from({ length: state.numPages }, (_, i) => i + 1);
  const list = parsePageRanges(expr, state.numPages);
  if (!list.length) throw new Error(`Sayfa aralığında geçerli sayfa yok. PDF ${state.numPages} sayfalı; örnek: 1-3, 5`);
  return list;
}

/** Bir sayfanın metin öğelerini koordinatlarıyla okur (önbellekli). */
async function loadPage(n) {
  if (state.data.has(n)) return state.data.get(n);
  const page = await state.pdf.getPage(n);
  const [x0, y0, x1, y1] = page.view;
  const tc = await page.getTextContent();
  const items = [];
  for (const it of tc.items) {
    if (!it.str || !it.str.trim()) continue;
    const t = it.transform;
    const h = Math.abs(it.height) || Math.hypot(t[2], t[3]) || 10;
    items.push({ str: it.str, x: t[4] - x0, y: t[5] - y0, w: Math.abs(it.width) || it.str.length * h * 0.5, h });
  }
  const d = { items, width: x1 - x0, height: y1 - y0 };
  state.data.set(n, d);
  return d;
}

function median(a) {
  if (!a.length) return 10;
  const s = a.slice().sort((p, q) => p - q);
  return s[Math.floor(s.length / 2)];
}

/** Metin öğelerini y'ye göre satırlara, her satırı x'e göre parçalara (segment) ayırır. */
function groupLines(items, rowTol, gapMin) {
  const sorted = items.slice().sort((a, b) => b.y - a.y || a.x - b.x);
  const lines = [];
  for (const it of sorted) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - it.y) <= rowTol) {
      last.items.push(it);
      last.y = (last.y * (last.items.length - 1) + it.y) / last.items.length;
    } else lines.push({ y: it.y, items: [it] });
  }
  for (const ln of lines) {
    ln.items.sort((a, b) => a.x - b.x);
    ln.segs = [];
    for (const it of ln.items) {
      const s = ln.segs[ln.segs.length - 1];
      if (s && it.x - (s.x1) < gapMin) { s.parts.push(it); s.x1 = Math.max(s.x1, it.x + it.w); }
      else ln.segs.push({ x0: it.x, x1: it.x + it.w, parts: [it] });
    }
  }
  return lines;
}

/** Sütun kanallarını bulur: tablo benzeri satırların hiçbirinin (ya da çok azının) kaplamadığı dikey boşluklar. */
function detectBounds(allLines, gapMin) {
  const tableLines = allLines.filter((l) => l.segs.length >= 2);
  if (!tableLines.length) return { bounds: [], tableLines: 0 };
  const W = Math.ceil(state.maxW) + 2;
  const cov = new Int32Array(W + 1);
  let minX = W, maxX = 0;
  for (const l of tableLines) {
    for (const s of l.segs) {
      const a = Math.max(0, Math.floor(s.x0)), b = Math.min(W, Math.ceil(s.x1));
      for (let i = a; i <= b; i++) cov[i]++;
      minX = Math.min(minX, a); maxX = Math.max(maxX, b);
    }
  }
  const tolerate = Math.floor(tableLines.length * 0.03); // %3'e kadar sapan satıra izin
  const minLen = Math.max(3, Math.round(gapMin * 0.5));
  const bounds = [];
  let runStart = -1;
  for (let i = minX; i <= maxX + 1; i++) {
    const empty = i <= maxX && cov[i] <= tolerate;
    if (empty && runStart < 0) runStart = i;
    if (!empty && runStart >= 0) {
      if (i - runStart >= minLen && runStart > minX) bounds.push(Math.round((runStart + i - 1) / 2));
      runStart = -1;
    }
  }
  return { bounds, tableLines: tableLines.length };
}

/** Sayı metnini seçilen biçime göre sayıya çevirir; olmuyorsa null. */
function parseNumber(text, mode) {
  if (mode === 'text') return null;
  const t = text.trim();
  if (t.length > 16 || /^[-+]?0\d/.test(t)) return null; // uzun kod ve başı sıfırlı numaralar metin kalır
  const re = mode === 'en' ? /^[-+]?(\d{1,3}(,\d{3})+|\d+)(\.\d+)?$/ : /^[-+]?(\d{1,3}(\.\d{3})+|\d+)(,\d+)?$/;
  if (!re.test(t)) return null;
  const n = Number(mode === 'en' ? t.replace(/,/g, '') : t.replace(/\./g, '').replace(',', '.'));
  if (!Number.isFinite(n)) return null;
  const intPart = t.replace(/^[-+]/, '').split(mode === 'en' ? '.' : ',')[0];
  return { n, thousands: intPart.includes(mode === 'en' ? ',' : '.'), decimals: (t.split(mode === 'en' ? '.' : ',')[1] || '').length };
}

/** Çözümleme: seçili sayfaları okur, sütun sınırlarını bulur, tabloyu üretir. */
async function analyze(autoBounds) {
  if (!state.pdf) return;
  const gen = ++state.gen;
  resetUiKeepWarning();
  let pages;
  try { pages = readPages(); } catch (e) { showError($('error'), String(e.message)); return; }
  state.pages = pages;
  setProgress($('progress'), 15, 'Sayfalardaki metin okunuyor…');
  await tick();
  let total = 0;
  try {
    for (let i = 0; i < pages.length; i++) {
      if (gen !== state.gen) return;
      const d = await loadPage(pages[i]);
      total += d.items.length;
      if (i % 5 === 0) { setProgress($('progress'), 15 + (i / pages.length) * 70, `Sayfa ${pages[i]} okunuyor…`); await tick(); }
    }
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'PDF sayfaları okunurken hata oluştu. Dosya bozuk olabilir; başka bir sayfa aralığı deneyin ya da dosyayı yeniden kaydedip tekrar seçin.');
    return;
  }
  setProgress($('progress'), null);
  if (!total) {
    hideWork();
    showError($('error'), 'Seçilen sayfalarda seçilebilir metin yok; bu PDF büyük olasılıkla taranmış bir görüntü. Tablo çıkarmak için önce OCR gerekir: "PDF\'den Resme" ile sayfaları resme çevirip "Resimden Yazıya" aracıyla metne dönüştürün, sonra çıkan metni Excel\'e yapıştırın.');
    return;
  }
  state.maxW = Math.max(...pages.map((p) => state.data.get(p).width));
  // Otomatik toleranslar (kullanıcı alanları boşsa ya da ilk açılışta doldurulur).
  const heights = pages.flatMap((p) => state.data.get(p).items.map((i) => i.h));
  const mh = median(heights);
  if (autoBounds || !$('opt-rowtol').value) $('opt-rowtol').value = String(Math.max(1.5, Math.min(6, Math.round(mh * 0.4 * 2) / 2)));
  if (autoBounds || !$('opt-gap').value) $('opt-gap').value = String(Math.max(4, Math.round(mh * 0.7)));
  await recompute(autoBounds);
}

function resetUiKeepWarning() {
  showError($('error'), null);
  $('result').classList.remove('is-active');
}
function hideWork() { $('workspace').hidden = true; $('actions').hidden = true; }

const numVal = (id, def) => { const v = Number($(id).value); return Number.isFinite(v) && v > 0 ? v : def; };

/** Satırları ve (istenirse) sütun sınırlarını yeniden hesaplar, önizlemeyi günceller. */
async function recompute(autoBounds) {
  const rowTol = numVal('opt-rowtol', 3), gapMin = numVal('opt-gap', 7);
  state.lines = new Map();
  const all = [];
  for (const p of state.pages) {
    const lines = groupLines(state.data.get(p).items, rowTol, gapMin);
    state.lines.set(p, lines);
    all.push(...lines);
  }
  if (autoBounds) {
    const { bounds, tableLines } = detectBounds(all, gapMin);
    state.bounds = bounds;
    state.tableLines = tableLines;
  }
  $('workspace').hidden = false; $('actions').hidden = false;
  fillPrevSelect();
  await renderPageImage();
  buildTables();
  if (!state.tableLines) {
    showError($('warning'), 'Tablo benzeri (yan yana birden çok sütunlu) satır bulunamadı. Metin tek sütun olarak aktarılır; sütunları kendiniz eklemek için sayfa önizlemesinde "Ayraç ekle" düğmesini kullanın ya da "Sütun boşluğu" değerini küçültün.');
  } else if ($('warning').textContent.startsWith('Tablo benzeri')) showError($('warning'), null);
}

/** Satırlardan hücre tablosunu üretir. */
function buildTables() {
  const bounds = state.bounds.slice().sort((a, b) => a - b);
  const ncols = bounds.length + 1;
  const colOf = (x) => { let c = 0; while (c < bounds.length && x >= bounds[c]) c++; return c; };
  state.tables = state.pages.map((p) => {
    const rows = [];
    for (const ln of state.lines.get(p)) {
      const cells = new Array(ncols).fill('');
      if (ln.segs.length <= 1) {
        const s = ln.segs[0];
        cells[colOf(s.x0)] = joinParts(s.parts);
      } else {
        const buckets = Array.from({ length: ncols }, () => []);
        for (const it of ln.items) buckets[colOf(it.x + it.w / 2)].push(it);
        buckets.forEach((b, c) => { cells[c] = joinParts(b); });
      }
      rows.push(cells);
    }
    return { page: p, rows };
  });
  renderTablePreview();
}

function joinParts(parts) {
  let out = '';
  parts.forEach((it, i) => {
    if (i > 0) {
      const prev = parts[i - 1];
      const gap = it.x - (prev.x + prev.w);
      out += gap > it.h * 0.12 ? ' ' : '';
    }
    out += it.str;
  });
  return out.replace(/\s+/g, ' ').trim();
}

function renderTablePreview() {
  const table = $('preview-table');
  table.textContent = '';
  const all = state.tables.flatMap((t) => t.rows);
  const ncols = state.bounds.length + 1;
  const head = table.createTHead().insertRow();
  const c0 = document.createElement('th'); c0.scope = 'col'; c0.textContent = '#'; head.appendChild(c0);
  for (let c = 0; c < ncols; c++) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = `S${c + 1}`; head.appendChild(th); }
  const tb = table.createTBody();
  all.slice(0, PREVIEW_ROWS).forEach((row, i) => {
    const tr = tb.insertRow();
    const n = document.createElement('th'); n.scope = 'row'; n.textContent = String(i + 1); tr.appendChild(n);
    row.forEach((t) => { tr.insertCell().textContent = t; });
  });
  $('preview-note').textContent = `${ncols} sütun · ${all.length.toLocaleString('tr-TR')} satır (${state.pages.length} sayfa). İlk ${Math.min(PREVIEW_ROWS, all.length)} satır gösteriliyor.`;
}

/* ===================== Sayfa önizlemesi ve sürüklenebilir sütun ayraçları ===================== */

function fillPrevSelect() {
  const sel = $('opt-prev');
  const cur = state.pages.includes(state.prevPage) ? state.prevPage : state.pages[0];
  sel.textContent = '';
  for (const p of state.pages) { const o = document.createElement('option'); o.value = String(p); o.textContent = `Sayfa ${p}`; sel.appendChild(o); }
  sel.value = String(cur); state.prevPage = cur;
}

let renderToken = 0;
async function renderPageImage() {
  const token = ++renderToken;
  const page = await state.pdf.getPage(state.prevPage);
  const d = state.data.get(state.prevPage);
  const avail = Math.max(240, Math.min(760, $('stage-wrap').clientWidth - 4 || 700));
  const scale = avail / d.width;
  state.scale = scale;
  const vp = page.getViewport({ scale, rotation: 0 });
  const canvas = $('pv-canvas');
  const ratio = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.floor(vp.width * ratio); canvas.height = Math.floor(vp.height * ratio);
  canvas.style.width = `${Math.floor(vp.width)}px`; canvas.style.height = `${Math.floor(vp.height)}px`;
  $('stage').style.width = `${Math.floor(vp.width)}px`; $('stage').style.height = `${Math.floor(vp.height)}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, vp.width, vp.height);
  try { await page.render({ canvasContext: ctx, viewport: vp }).promise; } catch (e) { if (token === renderToken) console.error(e); }
  if (token === renderToken) renderHandles();
}

function renderHandles() {
  const ov = $('pv-overlay');
  ov.textContent = '';
  const W = state.data.get(state.prevPage).width;
  const sorted = state.bounds.slice().sort((a, b) => a - b);
  state.bounds = sorted;
  sorted.forEach((b, i) => {
    const h = document.createElement('div');
    h.className = 'px-handle';
    h.tabIndex = 0;
    h.setAttribute('role', 'slider');
    h.setAttribute('aria-label', `Sütun ayracı ${i + 1} / ${sorted.length}. Ok tuşlarıyla kaydırın, Delete ile silin`);
    h.setAttribute('aria-valuemin', '0'); h.setAttribute('aria-valuemax', String(Math.round(W)));
    h.setAttribute('aria-valuenow', String(Math.round(b)));
    h.dataset.index = String(i);
    h.style.left = `${b * state.scale}px`;
    ov.appendChild(h);
  });
}

function commitBounds() {
  state.bounds = state.bounds.filter((b) => Number.isFinite(b));
  state.bounds.sort((a, b) => a - b);
  renderHandles();
  buildTables();
  $('result').classList.remove('is-active');
}

(() => {
  const ov = $('pv-overlay');
  let drag = null;
  ov.addEventListener('pointerdown', (e) => {
    const h = e.target.closest('.px-handle');
    if (!h) return;
    drag = { h, i: Number(h.dataset.index) };
    h.setPointerCapture(e.pointerId);
    h.focus();
    e.preventDefault();
  });
  ov.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const rect = $('stage').getBoundingClientRect();
    const W = state.data.get(state.prevPage).width;
    let pt = (e.clientX - rect.left) / state.scale;
    const lo = drag.i > 0 ? state.bounds[drag.i - 1] + 2 : 1;
    const hi = drag.i < state.bounds.length - 1 ? state.bounds[drag.i + 1] - 2 : W - 1;
    pt = Math.max(lo, Math.min(hi, pt));
    state.bounds[drag.i] = Math.round(pt * 10) / 10;
    drag.h.style.left = `${pt * state.scale}px`;
    drag.h.setAttribute('aria-valuenow', String(Math.round(pt)));
  });
  const end = () => { if (!drag) return; const i = drag.i; drag = null; commitBounds(); focusHandle(i); };
  ov.addEventListener('pointerup', end);
  ov.addEventListener('pointercancel', end);
  ov.addEventListener('keydown', (e) => {
    const h = e.target.closest('.px-handle');
    if (!h) return;
    const i = Number(h.dataset.index);
    const step = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const W = state.data.get(state.prevPage).width;
      const lo = i > 0 ? state.bounds[i - 1] + 1 : 1, hi = i < state.bounds.length - 1 ? state.bounds[i + 1] - 1 : W - 1;
      state.bounds[i] = Math.max(lo, Math.min(hi, state.bounds[i] + (e.key === 'ArrowLeft' ? -step : step)));
      commitBounds(); focusHandle(i); e.preventDefault();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      state.bounds.splice(i, 1);
      commitBounds(); focusHandle(Math.min(i, state.bounds.length - 1)); e.preventDefault();
    }
  });
  // Çift tıklama: boş yere ayraç ekler, ayraca tıklarsa siler.
  ov.addEventListener('dblclick', (e) => {
    const h = e.target.closest('.px-handle');
    if (h) { state.bounds.splice(Number(h.dataset.index), 1); commitBounds(); return; }
    const rect = $('stage').getBoundingClientRect();
    state.bounds.push(Math.round((e.clientX - rect.left) / state.scale));
    commitBounds();
  });
})();

function focusHandle(i) {
  if (i < 0) return;
  const el = $('pv-overlay').querySelector(`.px-handle[data-index="${i}"]`);
  if (el) el.focus();
}

$('add-sep').addEventListener('click', () => {
  const W = state.data.get(state.prevPage).width;
  const edges = [0, ...state.bounds.slice().sort((a, b) => a - b), W];
  let best = 0, at = W / 2;
  for (let i = 0; i < edges.length - 1; i++) if (edges[i + 1] - edges[i] > best) { best = edges[i + 1] - edges[i]; at = (edges[i] + edges[i + 1]) / 2; }
  state.bounds.push(Math.round(at));
  commitBounds();
});
$('auto-sep').addEventListener('click', () => recompute(true));
$('opt-prev').addEventListener('change', async () => { state.prevPage = Number($('opt-prev').value); await renderPageImage(); });

let timer = null;
const debounced = (autoBounds) => { clearTimeout(timer); timer = setTimeout(() => { if (state.pdf) recompute(autoBounds); }, 350); };
$('opt-pages').addEventListener('change', () => { state.bounds = []; analyze(true); });
$('opt-gap').addEventListener('input', () => debounced(true));
$('opt-rowtol').addEventListener('input', () => debounced(false));
['opt-numfmt', 'opt-multi', 'opt-sep'].forEach((id) => $(id).addEventListener('change', () => $('result').classList.remove('is-active')));

/* ===================== Dışa aktarma ===================== */

/** Hücre matrislerini (sayı/metin) hazırlar. */
function exportData() {
  const mode = $('opt-numfmt').value;
  const conv = (rows) => rows.map((row) => row.map((t) => {
    const p = t ? parseNumber(t, mode) : null;
    return p ? { v: p.n, t: 'n', z: p.decimals ? '#,##0.' + '0'.repeat(Math.min(p.decimals, 6)) : (p.thousands ? '#,##0' : undefined), src: t } : (t || '');
  }));
  if ($('opt-multi').checked) return state.tables.map((t) => ({ name: `Sayfa ${t.page}`, rows: conv(t.rows) }));
  return [{ name: 'Tablo', rows: conv(state.tables.flatMap((t) => t.rows)) }];
}

async function makeXlsx() {
  await loadScript(`${VENDOR}xlsx@0.20.3/xlsx.full.min.js`);
  const XLSX = window.XLSX;
  const wb = XLSX.utils.book_new();
  for (const sh of exportData()) {
    const ws = {};
    const widths = [];
    sh.rows.forEach((row, r) => row.forEach((c, ci) => {
      if (c === '' ) return;
      const ref = XLSX.utils.encode_cell({ r, c: ci });
      if (typeof c === 'object') { ws[ref] = { t: 'n', v: c.v }; if (c.z) ws[ref].z = c.z; }
      else ws[ref] = { t: 's', v: c };
      const len = typeof c === 'object' ? c.src.length : c.length;
      widths[ci] = Math.min(60, Math.max(widths[ci] || 8, len + 2));
    }));
    const ncols = Math.max(1, ...sh.rows.map((r) => r.length));
    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: Math.max(0, sh.rows.length - 1), c: ncols - 1 } });
    ws['!cols'] = Array.from({ length: ncols }, (_, i) => ({ wch: widths[i] || 8 }));
    XLSX.utils.book_append_sheet(wb, ws, sh.name.slice(0, 31));
  }
  const out = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  return new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function makeCsv() {
  const sep = $('opt-sep').value === 'tab' ? '\t' : $('opt-sep').value;
  const mode = $('opt-numfmt').value;
  const esc = (s) => (/["\r\n]/.test(s) || s.includes(sep) ? `"${s.replace(/"/g, '""')}"` : s);
  const cell = (c) => (typeof c === 'object' ? (mode === 'tr' ? String(c.v).replace('.', ',') : String(c.v)) : c);
  // CSV tek tablo; çok sayfalıysa satırlar art arda gelir.
  const rows = exportData().flatMap((s) => s.rows);
  const text = rows.map((r) => r.map((c) => esc(cell(c))).join(sep)).join('\r\n');
  return new Blob(['﻿', text, '\r\n'], { type: 'text/csv;charset=utf-8' });
}

async function doExport(kind) {
  showError($('error'), null);
  const rowCount = state.tables.reduce((a, t) => a + t.rows.length, 0);
  if (!rowCount) { showError($('error'), 'Aktarılacak satır yok. Sayfa aralığını değiştirip yeniden deneyin.'); return; }
  try {
    setProgress($('progress'), 50, kind === 'xlsx' ? 'Excel dosyası hazırlanıyor…' : 'CSV hazırlanıyor…');
    await tick();
    const blob = kind === 'xlsx' ? await makeXlsx() : makeCsv();
    const name = `${baseName(state.file.name)}.${kind}`;
    downloadBlob(blob, name);
    setProgress($('progress'), null);
    $('result-info').textContent = `${name} · ${formatBytes(blob.size)} · ${rowCount.toLocaleString('tr-TR')} satır × ${state.bounds.length + 1} sütun. Sonucu mutlaka gözden geçirin: otomatik tablo çıkarma hatasız değildir.`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Dosya oluşturulurken hata oluştu. Sayfayı yenileyip tekrar deneyin; sorun sürerse sayfa aralığını daraltın.');
  }
}
$('download-xlsx').addEventListener('click', () => doExport('xlsx'));
$('download-csv').addEventListener('click', () => doExport('csv'));

$('clear').addEventListener('click', () => {
  state.pdf = null; state.file = null; state.data = new Map(); state.bounds = []; state.tables = [];
  $('file-info').textContent = '';
  hideAll(); resetUi();
});
