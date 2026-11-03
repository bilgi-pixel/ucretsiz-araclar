// PDF İmzala — pdf.js ile sayfa önizlemesi, pdf-lib ile imza görselini sayfaya gömme.
// İmza kaynağı: (1) canvas'a çizim, (2) PNG/JPG imza resmi, (3) yazılı ad (DejaVu Sans, Türkçe karakter güvenli).
// Üç kaynak da şeffaf PNG'ye dönüşür; kullanıcı önizleme üzerinde sürükleyip boyutlandırır.
// DİKKAT: Bu görsel imzadır; 5070 sayılı kanun anlamında nitelikli elektronik imza (e-imza) DEĞİLDİR.
// Hiçbir veri ağa gitmez; kütüphaneler ve yazı tipi aynı origin'deki vendor/ klasöründen yüklenir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;
const DEFAULT_SIG_WIDTH_PT = 160; // ilk yerleşimde imza genişliği (PDF puntosu)
const MIN_SIG_WIDTH_PT = 30;

let file = null;
let pdf = null;             // pdf.js belgesi
let pdfBytes = null;        // pdf-lib için ham baytlar
let pageNo = 1;             // 1 tabanlı
let pageSize = { w: 595, h: 842 }; // puan cinsinden
let scale = 1;              // CSS piksel / PDF puntosu
let renderTask = null;
let sig = null;             // { dataUrl, w, h, source } — şeffaf PNG ve piksel ölçüleri
let placement = null;       // { x, yTop, w, h } — PDF puntosu, sayfanın sol-üstünden
let resultBlob = null;
let resultName = 'imzali.pdf';
let fontReady = null;

/* ---------- Dosya açma ---------- */

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir PDF değil. Lütfen bir PDF dosyası seçin; Word belgesini önce "Word'den PDF'e" aracıyla çevirin.`);
    return;
  }
  if (f.size > BIG_FILE) {
    showError($('error'), `Dosya ${formatBytes(f.size)}; 50 MB üzerindeki PDF'ler tarayıcıyı yavaşlatabilir. Önce "PDF Küçült" aracını deneyebilir ya da işlemin bitmesini bekleyebilirsiniz.`);
  }
  setProgress($('progress'), 15, 'PDF okunuyor…');
  await tick();
  try {
    pdfBytes = new Uint8Array(await f.arrayBuffer());
    const pdfjs = await getPdfJs();
    // pdf.js veriyi worker'a taşıdığı için kopya veriyoruz; orijinal pdf-lib'e kalır.
    pdf = await pdfjs.getDocument({ data: pdfBytes.slice() }).promise;
  } catch (err) {
    console.error(err);
    pdf = null; pdfBytes = null;
    setProgress($('progress'), null);
    showError($('error'), pdfError(err));
    return;
  }
  file = f;
  $('file-meta').textContent = `${f.name} · ${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
  const sel = $('page-select');
  sel.innerHTML = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const o = document.createElement('option');
    o.value = String(i); o.textContent = `Sayfa ${i} / ${pdf.numPages}`;
    sel.appendChild(o);
  }
  pageNo = 1;
  $('workspace').hidden = false;
  $('stage').hidden = false;
  fitDrawCanvas();
  setProgress($('progress'), null);
  await renderPage();
  updateApplyState();
}

function pdfError(err) {
  const m = String(err && (err.name + ' ' + err.message) || err || '');
  if (/PasswordException|password|encrypted/i.test(m)) return 'Bu PDF şifreli görünüyor; imza eklenemez. Önce PDF şifresini kaldırın (Adobe Reader: Dosya → Özellikler → Güvenlik) ve tekrar deneyin.';
  if (/InvalidPDF|Invalid PDF|No PDF header|corrupt|XRef|FormatError|Unexpected/i.test(m)) return 'Dosya bozuk ya da geçerli bir PDF değil. Dosyayı bir PDF görüntüleyicide açabildiğinizi kontrol edin; açılıyorsa "Yazdır → PDF olarak kaydet" ile yeniden oluşturup tekrar seçin.';
  return friendlyError(err);
}

/* ---------- Sayfa önizleme ---------- */

async function renderPage() {
  if (!pdf) return;
  if (renderTask) { try { renderTask.cancel(); } catch { /* yoksay */ } }
  const page = await pdf.getPage(pageNo);
  const base = page.getViewport({ scale: 1 });
  pageSize = { w: base.width, h: base.height };
  const wrap = $('stage');
  const avail = Math.max(240, Math.min(wrap.clientWidth - 2, 760));
  scale = avail / base.width;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const vp = page.getViewport({ scale: scale * dpr });
  const canvas = $('page-canvas');
  canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
  canvas.style.width = `${Math.round(base.width * scale)}px`;
  canvas.style.height = `${Math.round(base.height * scale)}px`;
  $('page-wrap').style.width = canvas.style.width;
  $('page-wrap').style.height = canvas.style.height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  renderTask = page.render({ canvasContext: ctx, viewport: vp });
  try { await renderTask.promise; } catch (err) { if (!/Rendering cancelled/i.test(String(err && err.message))) console.error(err); }
  renderTask = null;
  $('page-select').value = String(pageNo);
  $('page-prev').disabled = pageNo <= 1;
  $('page-next').disabled = pageNo >= pdf.numPages;
  if (sig && !placement) defaultPlacement();
  layoutOverlay();
}

$('page-select').addEventListener('change', (e) => { pageNo = Number(e.target.value); renderPage(); });
$('page-prev').addEventListener('click', () => { if (pageNo > 1) { pageNo--; renderPage(); } });
$('page-next').addEventListener('click', () => { if (pdf && pageNo < pdf.numPages) { pageNo++; renderPage(); } });

let resizeTimer = null;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (pdf) renderPage(); }, 150); });

/* ---------- İmza kaynağı: sekmeler ---------- */

const tabs = Array.from(document.querySelectorAll('.sig-tab'));
tabs.forEach((btn) => btn.addEventListener('click', () => selectTab(btn.dataset.tab)));
tabs.forEach((btn, i) => btn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    tabs[n].focus(); selectTab(tabs[n].dataset.tab);
  }
}));
function selectTab(name) {
  tabs.forEach((b) => { const on = b.dataset.tab === name; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; });
  document.querySelectorAll('.sig-panel').forEach((p) => { p.hidden = p.dataset.panel !== name; });
  if (name === 'draw') setTimeout(fitDrawCanvas, 0);
}

/* ---------- 1) Çizim ---------- */

const draw = $('sig-canvas');
const dctx = draw.getContext('2d');
let strokes = [];   // [{ color, width, points: [{x,y}] }] — CSS piksel koordinatları
let active = null;
let drawCssW = 0, drawCssH = 0;

function fitDrawCanvas() {
  const box = draw.parentElement;
  const w = Math.max(200, box.clientWidth);
  const h = Math.round(Math.max(140, Math.min(220, w * 0.38)));
  if (w === drawCssW && h === drawCssH) return;
  drawCssW = w; drawCssH = h;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  draw.width = Math.round(w * dpr); draw.height = Math.round(h * dpr);
  draw.style.width = `${w}px`; draw.style.height = `${h}px`;
  dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redrawStrokes();
}

function redrawStrokes() {
  dctx.clearRect(0, 0, drawCssW, drawCssH);
  // Kılavuz çizgisi: imza taban çizgisi
  dctx.save();
  dctx.strokeStyle = '#cbd1da'; dctx.setLineDash([6, 6]); dctx.lineWidth = 1;
  dctx.beginPath(); dctx.moveTo(16, drawCssH * 0.72); dctx.lineTo(drawCssW - 16, drawCssH * 0.72); dctx.stroke();
  dctx.restore();
  for (const s of strokes) strokePath(s);
}

function strokePath(s) {
  dctx.strokeStyle = s.color; dctx.lineWidth = s.width; dctx.lineCap = 'round'; dctx.lineJoin = 'round';
  dctx.beginPath();
  const p = s.points;
  if (p.length === 1) { dctx.arc(p[0].x, p[0].y, s.width / 2, 0, Math.PI * 2); dctx.fillStyle = s.color; dctx.fill(); return; }
  dctx.moveTo(p[0].x, p[0].y);
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i].x + p[i + 1].x) / 2, my = (p[i].y + p[i + 1].y) / 2;
    dctx.quadraticCurveTo(p[i].x, p[i].y, mx, my);
  }
  dctx.lineTo(p[p.length - 1].x, p[p.length - 1].y);
  dctx.stroke();
}

const pos = (e) => { const r = draw.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
draw.addEventListener('pointerdown', (e) => {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  e.preventDefault();
  draw.setPointerCapture(e.pointerId);
  active = { color: $('pen-color').value, width: Number($('pen-width').value), points: [pos(e)] };
  strokes.push(active);
  redrawStrokes();
});
draw.addEventListener('pointermove', (e) => {
  if (!active) return;
  e.preventDefault();
  const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [e];
  for (const ev of events) active.points.push(pos(ev));
  redrawStrokes();
});
const endStroke = () => { if (!active) return; active = null; commitDrawing(); };
draw.addEventListener('pointerup', endStroke);
draw.addEventListener('pointercancel', endStroke);
draw.addEventListener('lostpointercapture', endStroke);

$('pen-clear').addEventListener('click', () => { strokes = []; redrawStrokes(); setSignature(null); });
$('pen-undo').addEventListener('click', () => { strokes.pop(); redrawStrokes(); commitDrawing(); });
$('pen-color').addEventListener('input', () => { strokes.forEach((s) => { s.color = $('pen-color').value; }); redrawStrokes(); commitDrawing(); });

/** Çizimi kırpıp şeffaf PNG'ye çevirir; kılavuz çizgisi dahil edilmez. */
function commitDrawing() {
  if (!strokes.length) { setSignature(null); return; }
  const pad = 8;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const s of strokes) for (const p of s.points) {
    minX = Math.min(minX, p.x - s.width); minY = Math.min(minY, p.y - s.width);
    maxX = Math.max(maxX, p.x + s.width); maxY = Math.max(maxY, p.y + s.width);
  }
  const k = 3; // dışa aktarma çözünürlüğü (CSS piksel başına)
  const w = Math.max(1, Math.ceil(maxX - minX + pad * 2)), h = Math.max(1, Math.ceil(maxY - minY + pad * 2));
  const off = document.createElement('canvas');
  off.width = w * k; off.height = h * k;
  const c = off.getContext('2d');
  c.scale(k, k); c.translate(-minX + pad, -minY + pad);
  for (const s of strokes) {
    c.strokeStyle = s.color; c.lineWidth = s.width; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath();
    const p = s.points;
    if (p.length === 1) { c.arc(p[0].x, p[0].y, s.width / 2, 0, Math.PI * 2); c.fillStyle = s.color; c.fill(); continue; }
    c.moveTo(p[0].x, p[0].y);
    for (let i = 1; i < p.length - 1; i++) { const mx = (p[i].x + p[i + 1].x) / 2, my = (p[i].y + p[i + 1].y) / 2; c.quadraticCurveTo(p[i].x, p[i].y, mx, my); }
    c.lineTo(p[p.length - 1].x, p[p.length - 1].y);
    c.stroke();
  }
  setSignature({ dataUrl: off.toDataURL('image/png'), w: off.width, h: off.height, source: 'draw' });
}

/* ---------- 2) İmza resmi ---------- */

createDropzone({ el: $('img-drop'), accept: 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp', multiple: false, onFiles: ([f]) => loadSignatureImage(f) });
let lastImage = null;
$('img-transparent').addEventListener('change', () => { if (lastImage) processImage(lastImage); });

async function loadSignatureImage(f) {
  showError($('error'), null);
  if (!/^image\/(png|jpeg|webp)$/.test(f.type) && !/\.(png|jpe?g|webp)$/i.test(f.name)) {
    showError($('error'), `"${f.name}" desteklenen bir resim değil. İmza için PNG, JPG ya da WebP dosyası seçin.`);
    return;
  }
  try {
    const url = URL.createObjectURL(f);
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('decode')); i.src = url; });
    URL.revokeObjectURL(url);
    lastImage = img;
    $('img-name').textContent = `${f.name} · ${img.naturalWidth}×${img.naturalHeight}`;
    processImage(img);
  } catch (err) {
    console.error(err);
    showError($('error'), 'Resim açılamadı; dosya bozuk olabilir. Resmi bir görüntüleyicide açıp PNG olarak yeniden kaydedin.');
  }
}

/** Resmi en fazla 1600 px'e küçültür; istenirse beyaz/açık zemini şeffaf yapar. */
function processImage(img) {
  const max = 1600;
  const r = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * r)), h = Math.max(1, Math.round(img.naturalHeight * r));
  const off = document.createElement('canvas'); off.width = w; off.height = h;
  const c = off.getContext('2d');
  c.drawImage(img, 0, 0, w, h);
  if ($('img-transparent').checked) {
    const data = c.getImageData(0, 0, w, h);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
      if (lum > 200) d[i + 3] = 0;                      // açık zemin → şeffaf
      else if (lum > 150) d[i + 3] = Math.round(d[i + 3] * (200 - lum) / 50); // kenar yumuşatma
    }
    c.putImageData(data, 0, 0);
  }
  setSignature({ dataUrl: off.toDataURL('image/png'), w, h, source: 'image' });
}

/* ---------- 3) Yazılı imza ---------- */

async function loadFont() {
  if (fontReady) return fontReady;
  fontReady = (async () => {
    const face = new FontFace('DejaVu Sans Sig', `url(${VENDOR}fonts/dejavu-sans@2.37/DejaVuSans.ttf)`);
    await face.load();
    document.fonts.add(face);
  })().catch((err) => { console.error(err); fontReady = null; throw err; });
  return fontReady;
}

let textTimer = null;
$('sig-text').addEventListener('input', () => { clearTimeout(textTimer); textTimer = setTimeout(renderTextSignature, 120); });
$('text-style').addEventListener('change', renderTextSignature);
$('pen-color').addEventListener('input', () => { if (sig && sig.source === 'text') renderTextSignature(); });

async function renderTextSignature() {
  const text = $('sig-text').value.trim();
  if (!text) { if (sig && sig.source === 'text') setSignature(null); return; }
  try { await loadFont(); } catch { /* yazı tipi yüklenemezse sistem fontuyla devam */ }
  const style = $('text-style').value; // 'italic' | 'normal'
  const size = 96;
  const off = document.createElement('canvas');
  const c = off.getContext('2d');
  const font = `${style} ${size}px "DejaVu Sans Sig", "DejaVu Sans", "Segoe UI", Arial, sans-serif`;
  c.font = font;
  const m = c.measureText(text);
  const w = Math.ceil(m.width + size * 0.5), h = Math.ceil(size * 1.5);
  off.width = w; off.height = h;
  c.font = font; c.fillStyle = $('pen-color').value; c.textBaseline = 'middle';
  c.fillText(text, size * 0.25, h / 2);
  setSignature({ dataUrl: off.toDataURL('image/png'), w, h, source: 'text' });
}

/* ---------- Ortak: imza durumu ve yerleşim ---------- */

function setSignature(s) {
  sig = s;
  resultBlob = null; $('result').classList.remove('is-active');
  if (!sig) { placement = null; $('overlay').hidden = true; updateApplyState(); return; }
  $('overlay-img').src = sig.dataUrl;
  const ratio = sig.h / sig.w;
  if (!placement) defaultPlacement(); else placement.h = placement.w * ratio;
  $('overlay').hidden = !pdf;
  layoutOverlay();
  updateApplyState();
}

function defaultPlacement() {
  if (!sig) return;
  const w = Math.min(DEFAULT_SIG_WIDTH_PT, pageSize.w * 0.5);
  const h = w * (sig.h / sig.w);
  placement = { x: pageSize.w - w - 56, yTop: pageSize.h - h - 90, w, h };
  clampPlacement();
}

function clampPlacement() {
  if (!placement) return;
  const ratio = sig ? sig.h / sig.w : placement.h / placement.w;
  placement.w = Math.max(MIN_SIG_WIDTH_PT, Math.min(placement.w, pageSize.w));
  placement.h = placement.w * ratio;
  if (placement.h > pageSize.h) { placement.h = pageSize.h; placement.w = placement.h / ratio; }
  placement.x = Math.max(0, Math.min(placement.x, pageSize.w - placement.w));
  placement.yTop = Math.max(0, Math.min(placement.yTop, pageSize.h - placement.h));
}

function layoutOverlay() {
  const ov = $('overlay');
  if (!sig || !placement || !pdf) { ov.hidden = true; return; }
  ov.hidden = false;
  ov.style.left = `${placement.x * scale}px`;
  ov.style.top = `${placement.yTop * scale}px`;
  ov.style.width = `${placement.w * scale}px`;
  ov.style.height = `${placement.h * scale}px`;
  const d = $('overlay-date');
  d.hidden = !$('opt-date').checked;
  d.textContent = dateText();
  d.style.fontSize = `${Math.max(6, dateSizePt() * scale)}px`;
  $('size-range').value = String(Math.round(placement.w / pageSize.w * 100));
  $('pos-info').textContent = `Konum: x ${Math.round(placement.x)} pt, y ${Math.round(placement.yTop)} pt · Genişlik ${Math.round(placement.w)} pt (${(placement.w / 72 * 2.54).toFixed(1)} cm)`;
}

function dateText() { return new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
function dateSizePt() { return Math.max(7, Math.min(14, placement.w / 14)); }

$('opt-date').addEventListener('change', layoutOverlay);

// Sürükleme ve köşeden boyutlandırma (pointer events: fare + dokunma + kalem)
const ov = $('overlay');
let drag = null;
ov.addEventListener('pointerdown', (e) => {
  if (!placement) return;
  e.preventDefault();
  ov.setPointerCapture(e.pointerId);
  const isHandle = e.target.classList.contains('overlay-handle');
  drag = { mode: isHandle ? 'resize' : 'move', sx: e.clientX, sy: e.clientY, start: { ...placement } };
  ov.classList.add('is-dragging');
});
ov.addEventListener('pointermove', (e) => {
  if (!drag) return;
  e.preventDefault();
  const dx = (e.clientX - drag.sx) / scale, dy = (e.clientY - drag.sy) / scale;
  if (drag.mode === 'move') { placement.x = drag.start.x + dx; placement.yTop = drag.start.yTop + dy; }
  else { placement.w = drag.start.w + Math.max(dx, dy * (drag.start.w / drag.start.h)); placement.h = placement.w * (drag.start.h / drag.start.w); }
  clampPlacement(); layoutOverlay();
});
const endDrag = () => { if (!drag) return; drag = null; ov.classList.remove('is-dragging'); };
ov.addEventListener('pointerup', endDrag);
ov.addEventListener('pointercancel', endDrag);

// Klavye: ok tuşları taşır (Shift ile 10 pt), + / - boyutlandırır
ov.addEventListener('keydown', (e) => {
  if (!placement) return;
  const step = e.shiftKey ? 10 : 2;
  const map = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
  if (map[e.key]) { placement.x += map[e.key][0]; placement.yTop += map[e.key][1]; }
  else if (e.key === '+' || e.key === '=') placement.w *= 1.08;
  else if (e.key === '-' || e.key === '_') placement.w /= 1.08;
  else return;
  e.preventDefault();
  placement.h = placement.w * (sig.h / sig.w);
  clampPlacement(); layoutOverlay();
});

$('size-range').addEventListener('input', (e) => {
  if (!placement || !sig) return;
  placement.w = (Number(e.target.value) / 100) * pageSize.w;
  placement.h = placement.w * (sig.h / sig.w);
  clampPlacement(); layoutOverlay();
});

function updateApplyState() {
  const ready = !!(pdf && sig);
  $('apply').disabled = !ready;
  $('apply-hint').hidden = ready;
}

/* ---------- Uygula: pdf-lib ile imzayı göm ---------- */

$('apply').addEventListener('click', async () => {
  if (!pdf || !sig || !placement) return;
  const btn = $('apply');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  setProgress($('progress'), 5, 'PDF kütüphanesi yükleniyor…');
  await tick();
  try {
    const PDFLib = await getPdfLib();
    setProgress($('progress'), 20, 'Belge açılıyor…');
    await tick();
    const doc = await PDFLib.PDFDocument.load(pdfBytes, { ignoreEncryption: false, updateMetadata: false });
    const pngBytes = Uint8Array.from(atob(sig.dataUrl.split(',')[1]), (ch) => ch.charCodeAt(0));
    const image = await doc.embedPng(pngBytes);
    const font = $('opt-date').checked ? await doc.embedFont(PDFLib.StandardFonts.Helvetica) : null;
    const pages = doc.getPages();
    const targets = $('opt-all-pages').checked ? pages.map((_, i) => i) : [pageNo - 1];
    for (let k = 0; k < targets.length; k++) {
      const idx = targets[k];
      const page = pages[idx];
      const { width: pw, height: ph } = page.getSize();
      // Yerleşim mevcut önizleme sayfasına göre; farklı boyutlu sayfalarda sayfa sınırına sıkıştır.
      const w = Math.min(placement.w, pw), h = w * (sig.h / sig.w);
      const x = Math.max(0, Math.min(placement.x, pw - w));
      const yTop = Math.max(0, Math.min(placement.yTop, ph - h));
      page.drawImage(image, { x, y: ph - yTop - h, width: w, height: h });
      if (font) {
        const size = dateSizePt();
        page.drawText(dateText(), { x, y: ph - yTop - h - size - 2, size, font, color: PDFLib.rgb(0.15, 0.15, 0.15) });
      }
      if (k % 10 === 9) { setProgress($('progress'), 20 + ((k + 1) / targets.length) * 60, `Sayfa ${idx + 1} imzalanıyor…`); await tick(); }
    }
    setProgress($('progress'), 85, 'PDF yazılıyor…');
    await tick();
    const bytes = await doc.save({ useObjectStreams: false });
    resultBlob = new Blob([bytes], { type: 'application/pdf' });
    resultName = `${baseName(file.name)}-imzali.pdf`;
    $('result-info').textContent = `${targets.length === 1 ? `Sayfa ${targets[0] + 1}` : `${targets.length} sayfanın tamamı`} imzalandı · ${formatBytes(resultBlob.size)} · ${resultName}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
    $('download').focus();
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), pdfError(err));
  } finally {
    btn.disabled = !(pdf && sig);
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
$('clear').addEventListener('click', () => { reset(); $('drop').focus(); });

function reset() {
  file = null; pdf = null; pdfBytes = null; placement = null; resultBlob = null; pageNo = 1;
  $('workspace').hidden = true; $('stage').hidden = true;
  $('overlay').hidden = true;
  $('result').classList.remove('is-active');
  $('file-meta').textContent = '';
  setProgress($('progress'), null);
  showError($('error'), null);
  updateApplyState();
}

selectTab('draw');
fitDrawCanvas();
let fitTimer = null;
window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitDrawCanvas, 150); });
