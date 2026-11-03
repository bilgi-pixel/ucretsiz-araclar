// Belge Tarayıcı — telefonla çekilmiş belge fotoğrafını taranmış PDF/JPG'ye çevirir.
// Perspektif düzeltme (kendi homografi + ters eşleme kodu), döndürme, tarama filtresi
// (renkli / gri / adaptif eşikli siyah-beyaz), parlaklık-kontrast ve kenar kırpma tamamen
// Canvas ile tarayıcıda yapılır. PDF için pdf-lib, JPG paketi için fflate. Dosya hiçbir
// zaman sunucuya gitmez; otomatik kenar bulma YOKTUR, köşeleri kullanıcı sürükler.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, makeSortable, moveItem, getPdfLib, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;   // 50 MB üstünde uyarı
const MB = 1024 * 1024;
const MAX_SRC = 3000;                // kaynak bitmap en uzun kenarı (bellek için)
const MAX_OUT_PIXELS = 2_000_000;    // çıktı yaklaşık 2 MP
const STAGE_MAX = 1000;              // editör tuvalinin en uzun kenarı
const A4 = [595.28, 841.89];
// e-Devlet hedefi için (ölçek, JPG kalitesi) merdiveni; yukarıdan aşağıya küçülür.
const LADDER = [[1, 0.8], [1, 0.65], [0.85, 0.55], [0.7, 0.5], [0.6, 0.4], [0.5, 0.3]];
const DEFAULTS = { rotation: 0, filter: 'bw', brightness: 0, contrast: 1, crop: 0 };

let pages = [];          // { id, name, size, bitmap, w, h, corners, rotation, filter, brightness, contrast, crop, thumb, stage, cache }
let current = null;      // düzenlenen sayfa
let nextId = 1;
let busy = false;
let resultBlob = null;
let resultName = '';
let fflate = null;

/* ---------- Giriş ---------- */
createDropzone({ el: $('drop'), accept: 'image/*', multiple: true, onFiles: addFiles });

async function addFiles(files) {
  showError($('error'), null);
  const bad = [];
  for (const f of files) {
    const isPdf = f.type === 'application/pdf' || /\.pdf$/i.test(f.name);
    if (isPdf) {
      showError($('error'), `"${f.name}" bir PDF; bu araç belgenin fotoğrafını (JPG, PNG, WebP) alır. Elinizdeki taranmış PDF'i küçültmek için PDF Küçült, sayfalarını düzenlemek için PDF Sayfa Düzenle aracını kullanın.`);
      continue;
    }
    if (/heic|heif/i.test(f.type + ' ' + f.name)) {
      showError($('error'), 'HEIC/HEIF fotoğraflar tarayıcıda açılamıyor. iPhone\'da Ayarlar > Kamera > Formatlar > "En Uyumlu" seçin ya da fotoğrafı JPEG olarak paylaşıp yeniden seçin.');
      continue;
    }
    if (!(/^image\//.test(f.type) || /\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(f.name))) { bad.push(f.name); continue; }
    if (f.size >= BIG_FILE) {
      $('warning').textContent = `"${f.name}" ${formatBytes(f.size)}; 50 MB üstü fotoğraflarda açma işlemi uzun sürebilir ve telefonda bellek yetmeyebilir. Fotoğrafı önce Resim Küçült aracıyla küçültmeniz önerilir.`;
      $('warning').classList.add('is-active');
    }
    try {
      setProgress($('progress'), 30, `${f.name} açılıyor…`);
      await tick();
      const bmp = await loadBitmap(f);
      const page = { id: nextId++, name: f.name, size: f.size, bitmap: bmp.el, w: bmp.width, h: bmp.height, ...DEFAULTS, cache: null };
      page.corners = fullCorners(page);
      page.stage = makeStageCanvas(page);
      page.thumb = makeThumb(page.stage);
      pages.push(page);
    } catch (err) {
      console.error(err);
      bad.push(f.name);
    }
  }
  setProgress($('progress'), null);
  if (bad.length) showError($('error'), `${bad.join(', ')} açılamadı. Dosya bozuk ya da tarayıcının desteklemediği bir biçimde olabilir; fotoğrafı JPG veya PNG olarak kaydedip yeniden seçin.`);
  renderList();
  if (pages.length && (!current || !pages.includes(current))) selectPage(pages[pages.length - 1]);
  else if (current) refreshEditorTitle();
  syncVisibility();
}

/** EXIF yönünü uygulayarak bitmap açar; çok büyük fotoğrafı MAX_SRC'ye küçültür. */
async function loadBitmap(file) {
  if (window.createImageBitmap) {
    try {
      let bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      const m = Math.max(bmp.width, bmp.height);
      if (m > MAX_SRC) {
        const s = MAX_SRC / m;
        const small = await createImageBitmap(bmp, { resizeWidth: Math.round(bmp.width * s), resizeHeight: Math.round(bmp.height * s), resizeQuality: 'high' });
        bmp.close && bmp.close();
        bmp = small;
      }
      return { el: bmp, width: bmp.width, height: bmp.height };
    } catch { /* aşağıdaki yedeğe düş */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('decode'));
      i.src = url;
    });
    const m = Math.max(img.naturalWidth, img.naturalHeight);
    if (m > MAX_SRC) {
      const s = MAX_SRC / m;
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.naturalWidth * s); cv.height = Math.round(img.naturalHeight * s);
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      return { el: cv, width: cv.width, height: cv.height };
    }
    return { el: img, width: img.naturalWidth, height: img.naturalHeight };
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

const fullCorners = (p) => [[0, 0], [p.w, 0], [p.w, p.h], [0, p.h]];

/** Editörde gösterilecek küçültülmüş kopya (her sürüklemede yeniden çizilir). */
function makeStageCanvas(p) {
  const s = Math.min(1, STAGE_MAX / Math.max(p.w, p.h));
  const cv = document.createElement('canvas');
  cv.width = Math.max(1, Math.round(p.w * s)); cv.height = Math.max(1, Math.round(p.h * s));
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.drawImage(p.bitmap, 0, 0, cv.width, cv.height);
  return cv;
}

function makeThumb(src) {
  const s = Math.min(1, 88 / Math.max(src.width, src.height));
  const cv = document.createElement('canvas');
  cv.width = Math.max(1, Math.round(src.width * s)); cv.height = Math.max(1, Math.round(src.height * s));
  cv.getContext('2d').drawImage(src, 0, 0, cv.width, cv.height);
  return cv.toDataURL('image/jpeg', 0.7);
}

/* ---------- Sayfa listesi ---------- */
function renderList() {
  const ul = $('pages');
  ul.innerHTML = '';
  pages.forEach((p, i) => {
    const li = document.createElement('li');
    li.dataset.id = String(p.id);
    if (p === current) li.classList.add('is-current');
    li.innerHTML = `<span class="ba-handle" title="Sürükleyerek sırala" aria-hidden="true">≡</span><img class="thumb" alt=""><span class="name"></span><span class="meta"></span>`
      + `<button class="ba-icon-btn" data-act="up" type="button" aria-label="Yukarı taşı" ${i === 0 ? 'disabled' : ''}>▲</button>`
      + `<button class="ba-icon-btn" data-act="down" type="button" aria-label="Aşağı taşı" ${i === pages.length - 1 ? 'disabled' : ''}>▼</button>`
      + `<button class="ba-icon-btn" data-act="edit" type="button" aria-label="Düzenle">Düzenle</button>`
      + `<button class="ba-icon-btn" data-act="del" type="button" aria-label="Kaldır">✕</button>`;
    li.querySelector('.thumb').src = p.thumb;
    li.querySelector('.name').textContent = `${i + 1}. ${p.name}`;
    li.querySelector('.meta').textContent = `${p.w}×${p.h}`;
    ul.appendChild(li);
  });
}

$('pages').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  const li = e.target.closest('li');
  if (!li) return;
  const p = pages.find((x) => String(x.id) === li.dataset.id);
  if (!p) return;
  if (!btn) { selectPage(p); return; }
  const act = btn.dataset.act;
  if (act === 'edit') selectPage(p);
  else if (act === 'del') {
    pages = pages.filter((x) => x !== p);
    p.bitmap && p.bitmap.close && p.bitmap.close();
    if (current === p) current = null;
    renderList();
    if (!current && pages.length) selectPage(pages[0]);
    syncVisibility();
  } else {
    moveItem(li, act === 'up' ? -1 : 1);
    syncOrderFromDom();
  }
});
makeSortable($('pages'), syncOrderFromDom);

function syncOrderFromDom() {
  const order = Array.from($('pages').children).map((li) => li.dataset.id);
  pages.sort((a, b) => order.indexOf(String(a.id)) - order.indexOf(String(b.id)));
  renderList();
  refreshEditorTitle();
}

function syncVisibility() {
  const has = pages.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('editor').hidden = !has || !current;
  if (!has) { $('result').classList.remove('is-active'); resultBlob = null; }
}

/* ---------- Editör: köşe tutamaçları ---------- */
const stage = $('stage');
const stageCanvas = $('stage-canvas');
const handles = Array.from(stage.querySelectorAll('.sc-handle'));

function selectPage(p) {
  current = p;
  renderList();
  $('editor').hidden = false;
  refreshEditorTitle();
  $('opt-filter').value = p.filter;
  $('opt-brightness').value = String(p.brightness);
  $('opt-contrast').value = String(p.contrast);
  $('opt-crop').value = String(p.crop);
  syncRangeOutputs();
  layoutStage();
  drawStage();
  schedulePreview();
}

function refreshEditorTitle() {
  if (!current) return;
  const i = pages.indexOf(current);
  $('editor-title').textContent = `Sayfa ${i + 1} / ${pages.length} · ${current.name}`;
  $('nav-prev').disabled = i <= 0;
  $('nav-next').disabled = i >= pages.length - 1;
}

/** Tuvali kutuya sığdırır (en az 160 px; 1×1 gibi küçük resimler de tutulabilsin). */
function layoutStage() {
  if (!current) return;
  const wrap = $('stage-wrap');
  const maxW = Math.max(160, wrap.clientWidth || 320);
  const maxH = Math.max(160, Math.round(window.innerHeight * 0.6));
  const s = Math.min(maxW / current.w, maxH / current.h);
  const dw = Math.max(160, Math.round(current.w * s)), dh = Math.max(160, Math.round(current.h * s));
  stageCanvas.style.width = `${dw}px`; stageCanvas.style.height = `${dh}px`;
  stage.style.width = `${dw}px`; stage.style.height = `${dh}px`;
}
window.addEventListener('resize', () => { layoutStage(); positionHandles(); });

function drawStage() {
  if (!current) return;
  const p = current;
  const src = p.stage;
  stageCanvas.width = src.width; stageCanvas.height = src.height;
  const ctx = stageCanvas.getContext('2d');
  ctx.drawImage(src, 0, 0);
  const k = src.width / p.w;
  // Seçim dışını karart, dörtgeni çiz
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.beginPath();
  ctx.rect(0, 0, src.width, src.height);
  ctx.moveTo(p.corners[0][0] * k, p.corners[0][1] * k);
  for (let i = 3; i >= 1; i--) ctx.lineTo(p.corners[i][0] * k, p.corners[i][1] * k);
  ctx.closePath();
  ctx.fill('evenodd');
  ctx.restore();
  ctx.strokeStyle = '#7b2331';
  ctx.lineWidth = Math.max(2, src.width / 300);
  ctx.beginPath();
  p.corners.forEach(([x, y], i) => (i ? ctx.lineTo(x * k, y * k) : ctx.moveTo(x * k, y * k)));
  ctx.closePath();
  ctx.stroke();
  stage.dataset.corners = JSON.stringify(p.corners.map(([x, y]) => [Math.round(x), Math.round(y)]));
  positionHandles();
}

function positionHandles() {
  if (!current) return;
  handles.forEach((h, i) => {
    const [x, y] = current.corners[i];
    h.style.left = `${(x / current.w) * 100}%`;
    h.style.top = `${(y / current.h) * 100}%`;
  });
}

function setCorner(i, x, y) {
  const p = current;
  p.corners[i] = [Math.max(0, Math.min(p.w, x)), Math.max(0, Math.min(p.h, y))];
  p.cache = null;
  drawStage();
}

let drag = null;
handles.forEach((h) => {
  const i = Number(h.dataset.i);
  h.addEventListener('pointerdown', (e) => {
    if (!current) return;
    drag = { i, id: e.pointerId };
    h.setPointerCapture(e.pointerId);
    h.classList.add('is-active');
    e.preventDefault();
  });
  h.addEventListener('pointermove', (e) => {
    if (!drag || drag.i !== i) return;
    const r = stageCanvas.getBoundingClientRect();
    setCorner(i, ((e.clientX - r.left) / r.width) * current.w, ((e.clientY - r.top) / r.height) * current.h);
  });
  const end = () => { if (drag && drag.i === i) { drag = null; h.classList.remove('is-active'); schedulePreview(); } };
  h.addEventListener('pointerup', end);
  h.addEventListener('pointercancel', end);
  // Klavye: ok tuşları %1, Shift ile %5 taşır.
  h.addEventListener('keydown', (e) => {
    if (!current) return;
    const step = e.shiftKey ? 0.05 : 0.01;
    const [x, y] = current.corners[i];
    const dx = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
    const dy = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
    if (!dx && !dy) return;
    e.preventDefault();
    setCorner(i, x + dx * step * current.w, y + dy * step * current.h);
    schedulePreview();
  });
});

$('corners-reset').addEventListener('click', () => {
  if (!current) return;
  current.corners = fullCorners(current);
  current.cache = null;
  drawStage();
  schedulePreview();
});
$('rotate-left').addEventListener('click', () => rotate(-90));
$('rotate-right').addEventListener('click', () => rotate(90));
function rotate(deg) {
  if (!current) return;
  current.rotation = ((current.rotation + deg) % 360 + 360) % 360;
  current.cache = null;
  schedulePreview();
}
$('nav-prev').addEventListener('click', () => { const i = pages.indexOf(current); if (i > 0) selectPage(pages[i - 1]); });
$('nav-next').addEventListener('click', () => { const i = pages.indexOf(current); if (i < pages.length - 1) selectPage(pages[i + 1]); });

function syncRangeOutputs() {
  $('out-brightness').textContent = String($('opt-brightness').value);
  $('out-contrast').textContent = Number($('opt-contrast').value).toFixed(1);
}
['opt-filter', 'opt-brightness', 'opt-contrast', 'opt-crop'].forEach((id) => {
  $(id).addEventListener('input', () => {
    syncRangeOutputs();
    if (!current) return;
    current.filter = $('opt-filter').value;
    current.brightness = Number($('opt-brightness').value);
    current.contrast = Number($('opt-contrast').value);
    current.crop = Number($('opt-crop').value);
    current.cache = null;
    schedulePreview();
  });
});
$('apply-all').addEventListener('click', () => {
  if (!current) return;
  for (const p of pages) {
    if (p === current) continue;
    Object.assign(p, { filter: current.filter, brightness: current.brightness, contrast: current.contrast, crop: current.crop, rotation: current.rotation, cache: null });
  }
  $('apply-status').textContent = `Ayarlar ${pages.length} sayfaya uygulandı.`;
  setTimeout(() => { $('apply-status').textContent = ''; }, 3000);
});

/* ---------- Önizleme ---------- */
let previewTimer = null;
let previewSeq = 0;
function schedulePreview() {
  $('preview-wrap').dataset.state = 'busy';
  clearTimeout(previewTimer);
  previewTimer = setTimeout(renderPreview, 120);
}
async function renderPreview() {
  if (!current) return;
  const seq = ++previewSeq;
  const p = current;
  $('preview-wrap').dataset.state = 'busy';
  try {
    const cv = await processPage(p, 700);
    if (seq !== previewSeq || current !== p) return;
    const out = $('preview');
    out.width = cv.width; out.height = cv.height;
    out.getContext('2d').drawImage(cv, 0, 0);
    $('preview-wrap').dataset.state = 'ready';
  } catch (err) {
    console.error(err);
    $('preview-wrap').dataset.state = 'error';
  }
}

/* ---------- Görüntü işleme ---------- */
/** Birim kareyi (0,0)-(1,1) dörtgene götüren projektif dönüşüm (Heckbert). */
function squareToQuad(q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
    return { a: x1 - x0, b: x2 - x1, c: x0, d: y1 - y0, e: y2 - y1, f: y0, g: 0, h: 0 };
  }
  const det = dx1 * dy2 - dx2 * dy1;
  if (Math.abs(det) < 1e-12) return null;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const h = (dx1 * dy3 - dx3 * dy1) / det;
  return { a: x1 - x0 + g * x1, b: x3 - x0 + h * x3, c: x0, d: y1 - y0 + g * y1, e: y3 - y0 + h * y3, f: y0, g, h };
}

const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);

/** Köşelerle tanımlı dörtgeni W×H dikdörtgene ters eşlemeyle (bilinear örnekleme) açar. */
async function warpPerspective(p, maxDim, onProgress) {
  const c = p.corners;
  const qw = Math.max(1, (dist(c[0], c[1]) + dist(c[3], c[2])) / 2);
  const qh = Math.max(1, (dist(c[0], c[3]) + dist(c[1], c[2])) / 2);
  let s = Math.min(1, Math.sqrt(MAX_OUT_PIXELS / (qw * qh)));
  if (maxDim) s = Math.min(s, maxDim / Math.max(qw, qh));
  const W = Math.max(1, Math.round(qw * s)), H = Math.max(1, Math.round(qh * s));
  // Kaynağı çıktı ölçeğine indir (örnekleme kalitesi + bellek)
  const sw = Math.max(1, Math.round(p.w * s)), sh = Math.max(1, Math.round(p.h * s));
  const scv = document.createElement('canvas');
  scv.width = sw; scv.height = sh;
  const sctx = scv.getContext('2d', { willReadFrequently: true });
  sctx.fillStyle = '#fff'; sctx.fillRect(0, 0, sw, sh);
  sctx.drawImage(p.bitmap, 0, 0, sw, sh);
  const src = sctx.getImageData(0, 0, sw, sh).data;
  const k = sw / p.w;
  const q = c.map(([x, y]) => [x * k, y * k]);
  const M = squareToQuad(q) || squareToQuad([[0, 0], [sw, 0], [sw, sh], [0, sh]]);
  const out = new ImageData(W, H);
  const o = out.data;
  const { a, b, c: cc, d, e, f, g, h } = M;
  for (let y = 0; y < H; y++) {
    const v = (y + 0.5) / H;
    for (let x = 0; x < W; x++) {
      const u = (x + 0.5) / W;
      const den = g * u + h * v + 1;
      const sx = (a * u + b * v + cc) / den - 0.5;
      const sy = (d * u + e * v + f) / den - 0.5;
      let x0 = Math.floor(sx), y0 = Math.floor(sy);
      const fx = sx - x0, fy = sy - y0;
      let x1 = x0 + 1, y1 = y0 + 1;
      if (x0 < 0) x0 = 0; if (x1 < 0) x1 = 0; if (x0 > sw - 1) x0 = sw - 1; if (x1 > sw - 1) x1 = sw - 1;
      if (y0 < 0) y0 = 0; if (y1 < 0) y1 = 0; if (y0 > sh - 1) y0 = sh - 1; if (y1 > sh - 1) y1 = sh - 1;
      const i00 = (y0 * sw + x0) * 4, i10 = (y0 * sw + x1) * 4, i01 = (y1 * sw + x0) * 4, i11 = (y1 * sw + x1) * 4;
      const w00 = (1 - fx) * (1 - fy), w10 = fx * (1 - fy), w01 = (1 - fx) * fy, w11 = fx * fy;
      const oi = (y * W + x) * 4;
      o[oi] = src[i00] * w00 + src[i10] * w10 + src[i01] * w01 + src[i11] * w11;
      o[oi + 1] = src[i00 + 1] * w00 + src[i10 + 1] * w10 + src[i01 + 1] * w01 + src[i11 + 1] * w11;
      o[oi + 2] = src[i00 + 2] * w00 + src[i10 + 2] * w10 + src[i01 + 2] * w01 + src[i11 + 2] * w11;
      o[oi + 3] = 255;
    }
    if ((y & 127) === 127) { onProgress && onProgress(y / H); await tick(); }
  }
  return out;
}

/** Yüzdelik germe için LUT: histogramın %0.5–%99.5 aralığını 0–255'e açar. */
function stretchLut(hist, total) {
  let lo = 0, hi = 255, acc = 0;
  const cut = total * 0.005;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc > cut) { lo = i; break; } }
  acc = 0;
  for (let i = 255; i >= 0; i--) { acc += hist[i]; if (acc > cut) { hi = i; break; } }
  const lut = new Uint8ClampedArray(256);
  const range = hi - lo;
  for (let i = 0; i < 256; i++) lut[i] = range < 30 ? i : ((i - lo) * 255) / range;
  return lut;
}

function bcLut(brightness, contrast) {
  const lut = new Uint8ClampedArray(256);
  for (let i = 0; i < 256; i++) lut[i] = (i - 128) * contrast + 128 + brightness;
  return lut;
}

/** Filtreyi yerinde uygular: color (beyaz dengesi + p/k), gray, bw (adaptif eşik). */
async function applyFilter(img, p) {
  const d = img.data, W = img.width, H = img.height, n = W * H;
  const bc = bcLut(p.brightness, p.contrast);
  if (p.filter === 'color') {
    const hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
    for (let i = 0; i < n * 4; i += 4) { hist[0][d[i]]++; hist[1][d[i + 1]]++; hist[2][d[i + 2]]++; }
    const luts = hist.map((hh) => stretchLut(hh, n));
    for (let i = 0; i < n * 4; i += 4) { d[i] = bc[luts[0][d[i]]]; d[i + 1] = bc[luts[1][d[i + 1]]]; d[i + 2] = bc[luts[2][d[i + 2]]]; }
    return;
  }
  const gray = new Uint8ClampedArray(n);
  const hist = new Uint32Array(256);
  for (let i = 0, j = 0; i < n; i++, j += 4) { const v = (d[j] * 299 + d[j + 1] * 587 + d[j + 2] * 114) / 1000; gray[i] = v; hist[gray[i]]++; }
  if (p.filter === 'gray') {
    const st = stretchLut(hist, n);
    for (let i = 0, j = 0; i < n; i++, j += 4) { const v = bc[st[gray[i]]]; d[j] = d[j + 1] = d[j + 2] = v; }
    return;
  }
  // Siyah-beyaz: parlaklık/kontrast sonrası Bradley adaptif eşiği (integral görüntü)
  for (let i = 0; i < n; i++) gray[i] = bc[gray[i]];
  await tick();
  const iw = W + 1;
  const integral = new Uint32Array(iw * (H + 1));
  for (let y = 0; y < H; y++) {
    let row = 0;
    for (let x = 0; x < W; x++) { row += gray[y * W + x]; integral[(y + 1) * iw + x + 1] = integral[y * iw + x + 1] + row; }
  }
  const win = Math.max(16, Math.round(Math.min(W, H) / 24));
  const r = win >> 1;
  const T = 0.15;
  for (let y = 0; y < H; y++) {
    const y1 = Math.max(0, y - r), y2 = Math.min(H - 1, y + r);
    for (let x = 0; x < W; x++) {
      const x1 = Math.max(0, x - r), x2 = Math.min(W - 1, x + r);
      const area = (x2 - x1 + 1) * (y2 - y1 + 1);
      const sum = integral[(y2 + 1) * iw + x2 + 1] - integral[y1 * iw + x2 + 1] - integral[(y2 + 1) * iw + x1] + integral[y1 * iw + x1];
      const v = gray[y * W + x] * area < sum * (1 - T) ? 0 : 255;
      const j = (y * W + x) * 4;
      d[j] = d[j + 1] = d[j + 2] = v;
    }
    if ((y & 255) === 255) await tick();
  }
}

/** Tam işlem hattı: perspektif → filtre → kenar kırpma → döndürme. Sonuç canvas önbelleğe alınır. */
async function processPage(p, maxDim, onProgress) {
  const key = JSON.stringify([p.corners, p.rotation, p.filter, p.brightness, p.contrast, p.crop, maxDim || 0]);
  if (p.cache && p.cache.key === key) return p.cache.canvas;
  const img = await warpPerspective(p, maxDim, onProgress);
  await applyFilter(img, p);
  let cv = document.createElement('canvas');
  cv.width = img.width; cv.height = img.height;
  cv.getContext('2d').putImageData(img, 0, 0);
  if (p.crop > 0) {
    const mx = Math.round((cv.width * p.crop) / 100), my = Math.round((cv.height * p.crop) / 100);
    const cw = Math.max(1, cv.width - 2 * mx), ch = Math.max(1, cv.height - 2 * my);
    const c2 = document.createElement('canvas');
    c2.width = cw; c2.height = ch;
    c2.getContext('2d').drawImage(cv, mx, my, cw, ch, 0, 0, cw, ch);
    cv = c2;
  }
  if (p.rotation) {
    const swap = p.rotation === 90 || p.rotation === 270;
    const c3 = document.createElement('canvas');
    c3.width = swap ? cv.height : cv.width; c3.height = swap ? cv.width : cv.height;
    const ctx = c3.getContext('2d');
    ctx.translate(c3.width / 2, c3.height / 2);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.drawImage(cv, -cv.width / 2, -cv.height / 2);
    cv = c3;
  }
  // Önbellekte yalnızca tam çözünürlüklü sonucu tut (önizleme ucuz)
  if (!maxDim || maxDim >= 1000) p.cache = { key, canvas: cv };
  return cv;
}

/* ---------- Çıktı ---------- */
const toJpeg = (cv, q) => new Promise((resolve, reject) => cv.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', q));

function scaled(cv, s) {
  if (s >= 1) return cv;
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(cv.width * s)); c.height = Math.max(1, Math.round(cv.height * s));
  c.getContext('2d').drawImage(cv, 0, 0, c.width, c.height);
  return c;
}

async function buildPdf(scale, quality, label) {
  const PDFLib = await getPdfLib();
  const doc = await PDFLib.PDFDocument.create();
  doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
  doc.setCreator('araclar.bilisimajans.com');
  const sizeMode = $('opt-size').value;
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    setProgress($('progress'), (i / pages.length) * 100, `${label}Sayfa ${i + 1}/${pages.length} işleniyor…`);
    await tick();
    const full = await processPage(p, 0, (f) => setProgress($('progress'), ((i + f * 0.8) / pages.length) * 100, `${label}Sayfa ${i + 1}/${pages.length}: perspektif düzeltiliyor…`));
    const cv = scaled(full, scale);
    const blob = await toJpeg(cv, quality);
    const img = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const landscape = cv.width > cv.height;
    let pw, ph;
    if (sizeMode === 'a4') { pw = landscape ? A4[1] : A4[0]; ph = landscape ? A4[0] : A4[1]; }
    else { pw = landscape ? A4[1] : A4[0]; ph = (pw * cv.height) / cv.width; }
    const page = doc.addPage([pw, ph]);
    const fit = Math.min(pw / cv.width, ph / cv.height);
    const dw = cv.width * fit, dh = cv.height * fit;
    page.drawImage(img, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh });
  }
  setProgress($('progress'), 100, 'PDF yazılıyor…');
  await tick();
  return doc.save({ useObjectStreams: true });
}

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

async function buildJpgs(quality) {
  const base = pages.length === 1 ? baseName(pages[0].name) : 'tarama';
  const blobs = [];
  for (let i = 0; i < pages.length; i++) {
    setProgress($('progress'), (i / pages.length) * 100, `Sayfa ${i + 1}/${pages.length} işleniyor…`);
    await tick();
    const cv = await processPage(pages[i], 0);
    blobs.push(await toJpeg(cv, quality));
  }
  if (blobs.length === 1) return { blob: blobs[0], name: `${base}-tarama.jpg` };
  const { zipSync } = await getFflate();
  const entries = {};
  for (let i = 0; i < blobs.length; i++) entries[`${base}-${String(i + 1).padStart(2, '0')}.jpg`] = [new Uint8Array(await blobs[i].arrayBuffer()), { level: 0 }];
  return { blob: new Blob([zipSync(entries)], { type: 'application/zip' }), name: `${base}-tarama.zip` };
}

$('opt-output').addEventListener('change', () => {
  const pdf = $('opt-output').value === 'pdf';
  $('field-size').hidden = !pdf;
  $('field-target').hidden = !pdf;
  $('run').textContent = pdf ? 'PDF oluştur' : 'JPG olarak indir';
});

$('run').addEventListener('click', async () => {
  if (!pages.length || busy) return;
  busy = true;
  const btn = $('run');
  btn.disabled = true;
  resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  try {
    const quality = Number($('opt-quality').value);
    let note = '';
    if ($('opt-output').value === 'pdf') {
      let bytes;
      if ($('opt-target').checked) {
        let best = null;
        for (let i = 0; i < LADDER.length; i++) {
          const [s, q] = LADDER[i];
          bytes = await buildPdf(s, Math.min(q, quality), `Deneme ${i + 1}/${LADDER.length} · `);
          if (!best || bytes.length < best.length) best = bytes;
          if (bytes.length <= 2 * MB) { note = i === 0 ? '' : `2 MB hedefi için çözünürlük %${Math.round(s * 100)}, JPG kalitesi %${Math.round(Math.min(q, quality) * 100)} kullanıldı.`; break; }
        }
        bytes = best;
        if (bytes.length > 2 * MB) note = `En düşük ayarda bile 2 MB sınırına inilemedi (${formatBytes(bytes.length)}). Sayfaları ayrı PDF'ler olarak dışa aktarmayı ya da siyah-beyaz filtreyi deneyin.`;
      } else {
        bytes = await buildPdf(1, quality, '');
      }
      resultBlob = new Blob([bytes], { type: 'application/pdf' });
      resultName = `${pages.length === 1 ? baseName(pages[0].name) : 'tarama'}-tarama.pdf`;
      $('result-info').textContent = `${pages.length} sayfa · ${formatBytes(resultBlob.size)} · ${resultName}`;
      $('download').textContent = 'PDF\'i indir';
    } else {
      const out = await buildJpgs(quality);
      resultBlob = out.blob; resultName = out.name;
      $('result-info').textContent = `${pages.length} sayfa · ${formatBytes(resultBlob.size)} · ${resultName}`;
      $('download').textContent = pages.length > 1 ? 'ZIP\'i indir' : 'JPG\'yi indir';
    }
    $('result-note').textContent = note;
    $('result-note').hidden = !note;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), /memory|allocation/i.test(String(err && err.message)) ? 'Tarayıcı belleği yetmedi. Daha az sayfayla deneyin ya da fotoğrafları önce Resim Küçült aracıyla küçültün.' : 'Tarama oluşturulurken beklenmeyen bir hata oluştu. Sayfayı yenileyip fotoğrafları yeniden seçin; sorun sürerse fotoğrafı JPG olarak kaydedip deneyin.');
  } finally {
    busy = false;
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });

$('clear').addEventListener('click', () => {
  for (const p of pages) p.bitmap && p.bitmap.close && p.bitmap.close();
  pages = []; current = null; resultBlob = null;
  renderList();
  stage.dataset.corners = '';
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  syncVisibility();
});

/* ---------- Kamera (izole; yalnızca düğmeyle başlar, Playwright'ta test edilmez) ---------- */
let stream = null;
let shotCount = 0;
const video = $('cam-video');

async function startCamera() {
  showError($('error'), null);
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showError($('error'), 'Tarayıcınız kamera erişimini desteklemiyor ya da sayfa güvenli (https) bağlantıyla açılmadı. Bunun yerine telefonla çektiğiniz fotoğrafı "Fotoğraf seç" ile ekleyin.');
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 2560 }, height: { ideal: 1920 } }, audio: false });
  } catch (err) {
    showError($('error'), cameraError(err));
    return;
  }
  video.srcObject = stream;
  try { await video.play(); } catch { /* bazı tarayıcılar play'i reddeder; akış yine de çizilir */ }
  $('cam-panel').hidden = false;
  $('cam-start').hidden = true;
  $('cam-status').textContent = 'Belgeyi çerçeveye alın, gölge düşürmeyin ve "Çek"e basın. Görüntü yalnızca bu sekmede işlenir, kaydedilmez.';
}

function stopCamera() {
  if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
  video.srcObject = null;
  $('cam-panel').hidden = true;
  $('cam-start').hidden = false;
}

function cameraError(err) {
  const n = (err && err.name) || '';
  if (n === 'NotAllowedError' || n === 'PermissionDeniedError' || n === 'SecurityError') {
    return 'Kamera izni verilmedi. Adres çubuğundaki kilit/kamera simgesinden bu site için kameraya izin verip "Kamerayla çek"e yeniden basın. Kamera görüntüsü yalnızca tarayıcınızda işlenir, hiçbir yere gönderilmez. İsterseniz fotoğrafı telefonun kamerasıyla çekip "Fotoğraf seç" ile de ekleyebilirsiniz.';
  }
  if (n === 'NotFoundError' || n === 'DevicesNotFoundError' || n === 'OverconstrainedError') {
    return 'Bu cihazda kullanılabilir bir kamera bulunamadı. Belgeyi telefonla çekip fotoğrafı buraya aktarın.';
  }
  if (n === 'NotReadableError' || n === 'TrackStartError') {
    return 'Kamera başka bir uygulama tarafından kullanılıyor (Zoom, Teams, başka bir sekme). O uygulamayı kapatıp tekrar deneyin.';
  }
  return 'Kamera açılamadı. Sayfayı yenileyip tekrar deneyin ya da fotoğrafı dosya olarak seçin.';
}

$('cam-start').addEventListener('click', startCamera);
$('cam-stop').addEventListener('click', stopCamera);
$('cam-shot').addEventListener('click', async () => {
  if (!stream || !video.videoWidth) return;
  const cv = document.createElement('canvas');
  cv.width = video.videoWidth; cv.height = video.videoHeight;
  cv.getContext('2d').drawImage(video, 0, 0);
  const blob = await toJpeg(cv, 0.92);
  shotCount++;
  await addFiles([new File([blob], `kamera-${shotCount}.jpg`, { type: 'image/jpeg' })]);
  $('cam-status').textContent = `${shotCount}. fotoğraf eklendi. Bir sonraki sayfa için tekrar "Çek"e basın ya da kamerayı kapatın.`;
});
window.addEventListener('pagehide', stopCamera);

syncVisibility();
