// Image to Text (OCR, EN, beta): tesseract.js + tessdata_fast (eng/tur) yalnızca bu sitenin vendor/
// klasöründen yüklenir; PDF sayfaları pdf.js ile çizilip tanınır. Hiçbir görsel, metin ya da dil
// verisi dış bir sunucuya gitmez. Mantık web/resimden-yaziya/tool.js ile aynıdır; EN sayfada çoklu
// dosya kuyruğu, panodan yapıştırma, döndürme/kırpma/eşikleme, güven skoru ve iptal eklenmiştir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfJs, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 4000;        // tanıma için en uzun kenar (px); daha büyükler küçültülür
const MIN_WIDTH = 1200;       // küçük görseller bu genişliğe kadar (en fazla 2×) büyütülür
const PDF_SCALE = 3;          // 72 dpi × 3 ≈ 216 dpi; taranmış PDF'ler için yeterli
const PREVIEW_MAX = 640;      // önizleme tuvalinin en uzun kenarı
const LOW_CONF = 60;          // bu güvenin altındaki kelimeler vurgulanır
const HANDWRITING_CONF = 50;  // sayfa ortalaması bunun altındaysa el yazısı / kalite uyarısı

const VENDOR = new URL('../../vendor/', import.meta.url).href;
const PATHS = {
  lib: `${VENDOR}tesseract.js@7.0.0/tesseract.esm.min.js`,
  worker: `${VENDOR}tesseract.js@7.0.0/worker.min.js`,
  coreDir: `${VENDOR}tesseract.js-core@7.0.0/`,
  lang: `${VENDOR}tessdata_fast@4.1.0/`,
  docx: `${VENDOR}docx@9.15.1/docx.mjs`,
};
const LANG_NAMES = { eng: 'English', tur: 'Turkish', 'eng+tur': 'English + Turkish' };

// Telefon ya da düşük bellekli cihaz: büyük işlerde sekme yeniden yüklenebilir, uyarı gösterilir.
const LOW_MEMORY = (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4)
  || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const num = (n) => Number(n).toLocaleString('en-US');
const plural = (n, word, many = `${word}s`) => `${num(n)} ${n === 1 ? word : many}`;
const CANCELLED = new Error('cancelled');
const NO_CROP = Object.freeze({ l: 0, t: 0, r: 0, b: 0 });

let items = [];           // kuyruk: { id, file, name, kind, bitmap, pdf, numPages, width, height, rotation, crop, status, previewBase }
let selectedId = null;
let nextId = 1;
let pasteCount = 0;
let busy = false;
let gen = 0;              // iptalde artar; eski worker isteklerini geçersiz kılar
let cancelReject = null;
let worker = null;
let workerLangs = '';
let logHandler = null;    // worker logger'ı her çalıştırmada güncel ilerleme işlevine yönlenir
let pageResults = [];
let resultBase = 'extracted-text';
let opening = Promise.resolve();
let previewToken = 0;

createDropzone({
  el: $('drop'),
  accept: 'image/jpeg,image/png,image/webp,image/bmp,image/gif,application/pdf,.jpg,.jpeg,.jfif,.png,.webp,.bmp,.gif,.pdf',
  multiple: true,
  onFiles: (list) => queueFiles(list),
});

function queueFiles(list) {
  opening = opening.then(() => addFiles(list)).catch((e) => console.error(e));
  return opening;
}

/* ---------- Dosya türü ve açma ---------- */
function kindOf(f) {
  const name = f.name || '';
  if (f.type === 'application/pdf' || /\.pdf$/i.test(name)) return 'pdf';
  if (/^image\/(jpeg|pjpeg|png|webp|bmp|x-ms-bmp|gif)$/.test(f.type) || /\.(jpe?g|jfif|png|webp|bmp|gif)$/i.test(name)) return 'image';
  return null;
}

function unsupportedMessage(f) {
  const name = f.name || 'This file';
  if (/\.(heic|heif)$/i.test(name) || /heic|heif/i.test(f.type)) {
    return `"${name}" is a HEIC photo, which browsers cannot decode. Save it as JPG first (on an iPhone: Settings → Camera → Formats → Most Compatible, or share the photo as JPEG) and add it again.`;
  }
  return `"${name}" is not a supported file type. Choose a JPG, PNG, WebP, BMP or GIF image or a PDF.`;
}

function openErrorMessage(f, kind, err) {
  const name = f.name || 'This file';
  const m = String(err && `${err.name} ${err.message}`);
  if (/memory|allocation/i.test(m)) return `"${name}" is too large for the browser's memory. Close other tabs, or shrink the image or split the PDF first, then try again.`;
  if (kind === 'pdf') {
    if (/PasswordException|password|encrypted/i.test(m)) return `"${name}" is password-protected. Remove the password first with Unlock PDF, then add the unlocked file again.`;
    return `"${name}" is damaged or is not a valid PDF. Check that it opens in a PDF reader, or download it again, then add it once more.`;
  }
  return `"${name}" could not be opened: the file looks damaged or is not a real image. Open it in an image viewer, save it again as PNG or JPG and try once more.`;
}

/** Görseli çözer; createImageBitmap reddederse <img> ile ikinci deneme (GIF'te ilk kare). */
async function decodeImage(f) {
  try {
    return await createImageBitmap(f);
  } catch (first) {
    const url = URL.createObjectURL(f);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return await createImageBitmap(img);
    } catch {
      throw first;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

async function addFiles(list) {
  const files = Array.from(list || []);
  if (!files.length) return;
  if (busy) {
    showError($('error'), 'Text is being read right now. Wait until it finishes or press Cancel, then add more files.');
    return;
  }
  showError($('error'), null);
  setStatus('');
  const problems = [];
  let firstNew = null;
  for (const f of files) {
    const kind = kindOf(f);
    if (!kind) { problems.push(unsupportedMessage(f)); continue; }
    const item = { id: nextId++, file: f, name: f.name || 'image.png', kind, rotation: 0, crop: { ...NO_CROP }, status: 'Ready', previewBase: null };
    try {
      if (kind === 'pdf') {
        const pdfjs = await getPdfJs();
        item.pdf = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
        item.numPages = item.pdf.numPages;
        const p1 = await item.pdf.getPage(1);
        const vp = p1.getViewport({ scale: 1 });
        item.width = Math.round(vp.width); item.height = Math.round(vp.height);
      } else {
        item.bitmap = await decodeImage(f);
        if (!item.bitmap.width || !item.bitmap.height) throw new Error('empty image');
        item.numPages = 1;
        item.width = item.bitmap.width; item.height = item.bitmap.height;
      }
    } catch (err) {
      console.error(err);
      if (item.pdf) { try { item.pdf.destroy(); } catch { /* yok say */ } }
      problems.push(openErrorMessage(f, kind, err));
      continue;
    }
    items.push(item);
    if (!firstNew) firstNew = item;
  }
  if (problems.length) showError($('error'), problems.join(' '));
  if (firstNew) selectedId = firstNew.id;
  else if (!items.some((it) => it.id === selectedId)) selectedId = items.length ? items[0].id : null;
  refresh();
}

/* ---------- Kuyruk arayüzü ---------- */
function itemMeta(item) {
  const parts = [];
  if (item.kind === 'pdf') parts.push(plural(item.numPages, 'page'));
  else {
    parts.push(`${num(item.width)}×${num(item.height)} px`);
    if (Math.max(item.width, item.height) > MAX_SIDE) parts.push(`scaled to ${num(MAX_SIDE)} px for OCR`);
  }
  parts.push(formatBytes(item.file.size));
  if (item.rotation) parts.push(`rotated ${item.rotation}°`);
  const c = item.crop;
  if (c.l || c.t || c.r || c.b) parts.push('cropped');
  return parts.join(' · ');
}

function renderQueue() {
  const ul = $('queue');
  ul.textContent = '';
  for (const item of items) {
    const li = document.createElement('li');
    li.dataset.id = String(item.id);
    if (item.id === selectedId) li.classList.add('is-selected');
    const pick = document.createElement('button');
    pick.type = 'button';
    pick.className = 'ocr-q-name';
    pick.textContent = item.name;
    pick.title = 'Show in preview to rotate or crop';
    pick.setAttribute('aria-pressed', String(item.id === selectedId));
    pick.disabled = busy;
    pick.addEventListener('click', () => { selectedId = item.id; renderQueue(); renderPreview(); });
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = itemMeta(item);
    const status = document.createElement('span');
    status.className = 'ocr-q-status';
    status.textContent = item.status;
    const rm = document.createElement('button');
    rm.type = 'button';
    rm.className = 'ocr-q-remove';
    rm.textContent = '×';
    rm.setAttribute('aria-label', `Remove ${item.name}`);
    rm.disabled = busy;
    rm.addEventListener('click', () => removeItem(item.id));
    li.append(pick, meta, status, rm);
    ul.append(li);
  }
  const pages = items.reduce((s, it) => s + (it.kind === 'pdf' ? it.numPages : 1), 0);
  $('queue-info').textContent = items.length ? `${plural(items.length, 'file')} · ${plural(pages, 'page')} in total` : '';
}

function setItemStatus(item, text) {
  item.status = text;
  const li = $('queue').querySelector(`li[data-id="${item.id}"] .ocr-q-status`);
  if (li) li.textContent = text;
}

function removeItem(id) {
  if (busy) return;
  const item = items.find((it) => it.id === id);
  if (!item) return;
  disposeItem(item);
  items = items.filter((it) => it.id !== id);
  if (selectedId === id) selectedId = items.length ? items[0].id : null;
  refresh();
  if (!items.length) $('drop').focus();
}

function disposeItem(item) {
  if (item.bitmap) { try { item.bitmap.close(); } catch { /* yok say */ } }
  if (item.pdf) { try { item.pdf.destroy(); } catch { /* yok say */ } }
  if (item.previewBase) item.previewBase.width = item.previewBase.height = 0;
  item.bitmap = null; item.pdf = null; item.previewBase = null;
}

function refresh() {
  const has = items.length > 0;
  $('queue-wrap').hidden = !has;
  $('editor').hidden = !has;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('field-pages').hidden = !items.some((it) => it.kind === 'pdf');
  renderQueue();
  updateWarnings();
  if (has) renderPreview();
}

function updateWarnings() {
  $('warn-size').hidden = !items.some((it) => it.file.size >= BIG_FILE);
  const pages = items.reduce((s, it) => s + (it.kind === 'pdf' ? it.numPages : 1), 0);
  const maxPixels = items.reduce((m, it) => (it.kind === 'image' ? Math.max(m, it.width * it.height) : m), 0);
  const bytes = items.reduce((s, it) => s + it.file.size, 0);
  $('warn-memory').hidden = !(LOW_MEMORY && (pages > 8 || maxPixels > 12e6 || bytes > 25 * 1024 * 1024));
}

function setStatus(text) { $('status').textContent = text; }

/* ---------- Görüntü dönüşümleri (döndür, kırp, ölçekle, temizle) ---------- */
/**
 * Kaynağı önce saat yönünde döndürür, sonra kırpar (yüzde, döndürülmüş görüntüye göre),
 * en uzun kenarı maxSide'ı aşarsa küçültür, minWidth'ten darsa en fazla 2× büyütür.
 */
function transformToCanvas(src, sw, sh, rotation, crop, maxSide, minWidth) {
  const rot = ((rotation % 360) + 360) % 360;
  const rw = rot % 180 ? sh : sw;
  const rh = rot % 180 ? sw : sh;
  const cx = (rw * crop.l) / 100;
  const cy = (rh * crop.t) / 100;
  const cw = Math.max(1, rw * (1 - (crop.l + crop.r) / 100));
  const ch = Math.max(1, rh * (1 - (crop.t + crop.b) / 100));
  const longest = Math.max(cw, ch);
  let scale = 1;
  if (longest > maxSide) scale = maxSide / longest;
  else if (minWidth && cw < minWidth) scale = Math.min(2, minWidth / cw, maxSide / longest);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(cw * scale));
  canvas.height = Math.max(1, Math.round(ch * scale));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // şeffaf PNG'ler siyah zemine düşmesin
  ctx.imageSmoothingQuality = 'high';
  ctx.setTransform(scale, 0, 0, scale, -cx * scale, -cy * scale);
  if (rot === 90) { ctx.translate(rw, 0); ctx.rotate(Math.PI / 2); }
  else if (rot === 180) { ctx.translate(rw, rh); ctx.rotate(Math.PI); }
  else if (rot === 270) { ctx.translate(0, rh); ctx.rotate(-Math.PI / 2); }
  ctx.drawImage(src, 0, 0, sw, sh);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return canvas;
}

/** Gri tonlama ya da Otsu eşiklemesiyle siyah-beyaz yapar (yerinde). */
export function applyCleanup(canvas, mode) {
  if (mode !== 'gray' && mode !== 'bw') return;
  const ctx = canvas.getContext('2d');
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data;
  const n = d.length / 4;
  const gray = new Uint8Array(n);
  const hist = new Uint32Array(256);
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const g = (d[p] * 77 + d[p + 1] * 150 + d[p + 2] * 29) >> 8;
    gray[i] = g;
    hist[g]++;
  }
  let threshold = -1;
  if (mode === 'bw') {
    // Otsu: sınıflar arası varyansı en büyük yapan eşik
    let sum = 0;
    for (let t = 0; t < 256; t++) sum += t * hist[t];
    let sumB = 0; let wB = 0; let best = 0; threshold = 127;
    for (let t = 0; t < 256; t++) {
      wB += hist[t];
      if (!wB) continue;
      const wF = n - wB;
      if (!wF) break;
      sumB += t * hist[t];
      const mB = sumB / wB;
      const mF = (sum - sumB) / wF;
      const between = wB * wF * (mB - mF) * (mB - mF);
      if (between > best) { best = between; threshold = t; }
    }
  }
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    const v = threshold < 0 ? gray[i] : (gray[i] > threshold ? 255 : 0);
    d[p] = d[p + 1] = d[p + 2] = v;
    d[p + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

async function renderPdfPage(pdf, n, maxSide = MAX_SIDE, maxScale = PDF_SCALE) {
  const page = await pdf.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const scale = Math.min(maxScale, maxSide / Math.max(base.width, base.height));
  const vp = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.ceil(vp.width));
  canvas.height = Math.max(1, Math.ceil(vp.height));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  page.cleanup();
  return canvas;
}

async function prepareJobCanvas(item, pageNo) {
  let src; let sw; let sh; let tmp = null;
  if (item.kind === 'pdf') {
    tmp = await renderPdfPage(item.pdf, pageNo);
    src = tmp; sw = tmp.width; sh = tmp.height;
  } else {
    src = item.bitmap; sw = item.bitmap.width; sh = item.bitmap.height;
  }
  const canvas = transformToCanvas(src, sw, sh, item.rotation, item.crop, MAX_SIDE, MIN_WIDTH);
  if (tmp) tmp.width = tmp.height = 0; // belleği bırak
  applyCleanup(canvas, $('opt-clean').value);
  return canvas;
}

/* ---------- Önizleme, döndürme ve kırpma ---------- */
const selected = () => items.find((it) => it.id === selectedId) || null;

async function renderPreview() {
  const item = selected();
  if (!item) return;
  const token = ++previewToken;
  try {
    if (!item.previewBase) {
      if (item.kind === 'pdf') item.previewBase = await renderPdfPage(item.pdf, 1, PREVIEW_MAX, 2);
      else item.previewBase = transformToCanvas(item.bitmap, item.width, item.height, 0, NO_CROP, PREVIEW_MAX, 0);
    }
    if (token !== previewToken || !item.previewBase) return;
    const pb = item.previewBase;
    const c = transformToCanvas(pb, pb.width, pb.height, item.rotation, NO_CROP, PREVIEW_MAX, 0);
    applyCleanup(c, $('opt-clean').value);
    const view = $('preview');
    view.width = c.width; view.height = c.height;
    view.getContext('2d').drawImage(c, 0, 0);
    c.width = c.height = 0;
    $('preview-caption').textContent = item.kind === 'pdf'
      ? `${item.name} · page 1 of ${num(item.numPages)} (rotation and crop apply to every page)`
      : item.name;
    $('rotation-label').textContent = `${item.rotation}°`;
    syncCropUi(item);
  } catch (err) {
    console.error(err);
  }
}

function syncCropUi(item) {
  const c = item.crop;
  $('crop-l').value = String(Math.round(c.l));
  $('crop-t').value = String(Math.round(c.t));
  $('crop-r').value = String(Math.round(c.r));
  $('crop-b').value = String(Math.round(c.b));
  const box = $('crop-box');
  const active = c.l || c.t || c.r || c.b;
  box.hidden = !active;
  box.style.left = `${c.l}%`; box.style.top = `${c.t}%`;
  box.style.right = `${c.r}%`; box.style.bottom = `${c.b}%`;
}

function clampCrop(c, changed) {
  const out = {};
  for (const k of ['l', 't', 'r', 'b']) out[k] = Math.max(0, Math.min(90, Number(c[k]) || 0));
  // karşılıklı kenarların toplamı en fazla %90 (en az %10 görüntü kalsın)
  if (out.l + out.r > 90) { if (changed === 'r') out.r = 90 - out.l; else out.l = 90 - out.r; }
  if (out.t + out.b > 90) { if (changed === 'b') out.b = 90 - out.t; else out.t = 90 - out.b; }
  return out;
}

$('rotate').addEventListener('click', () => {
  const item = selected();
  if (!item || busy) return;
  item.rotation = (item.rotation + 90) % 360;
  // kırpma kenarları da görüntüyle birlikte saat yönünde döner
  const c = item.crop;
  item.crop = { l: c.b, t: c.l, r: c.t, b: c.r };
  renderQueue();
  renderPreview();
});

$('crop-reset').addEventListener('click', () => {
  const item = selected();
  if (!item || busy) return;
  item.crop = { ...NO_CROP };
  syncCropUi(item);
  renderQueue();
});

for (const k of ['l', 't', 'r', 'b']) {
  $(`crop-${k}`).addEventListener('input', () => {
    const item = selected();
    if (!item || busy) return;
    const next = { ...item.crop, [k]: Number($(`crop-${k}`).value) };
    item.crop = clampCrop(next, k);
    syncCropUi(item);
    renderQueue();
  });
}

// Önizlemede sürükleyerek kırpma alanı seçme (fare, kalem, dokunma)
(() => {
  const stage = $('stage');
  let start = null;
  const pos = (e) => {
    const r = $('preview').getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)),
    };
  };
  stage.addEventListener('pointerdown', (e) => {
    if (busy || !selected() || e.button > 0) return;
    start = pos(e);
    stage.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  stage.addEventListener('pointermove', (e) => {
    if (!start) return;
    const p = pos(e);
    const item = selected();
    if (!item) return;
    const round = (v) => Math.round(v * 10) / 10;
    item.crop = clampCrop({
      l: round(Math.min(start.x, p.x)), t: round(Math.min(start.y, p.y)),
      r: round(100 - Math.max(start.x, p.x)), b: round(100 - Math.max(start.y, p.y)),
    });
    syncCropUi(item);
  });
  const end = (e) => {
    if (!start) return;
    const p = pos(e);
    const item = selected();
    // çok küçük sürükleme = tıklama → kırpmayı kaldır
    if (item && Math.abs(p.x - start.x) < 2 && Math.abs(p.y - start.y) < 2) item.crop = { ...NO_CROP };
    start = null;
    if (item) { syncCropUi(item); renderQueue(); }
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
})();

$('opt-clean').addEventListener('change', () => renderPreview());

/* ---------- Panodan yapıştırma (Ctrl+V ekran görüntüsü) ---------- */
function renamePasted(f) {
  pasteCount += 1;
  const ext = ((f.type.split('/')[1] || 'png').replace('jpeg', 'jpg').replace(/[^a-z0-9]/gi, '')) || 'png';
  const generic = !f.name || /^image(\.\w+)?$/i.test(f.name);
  return new File([f], generic ? `screenshot-${pasteCount}.${ext}` : f.name, { type: f.type || 'image/png' });
}

document.addEventListener('paste', (e) => {
  const files = Array.from((e.clipboardData && e.clipboardData.files) || []).filter((f) => /^image\//.test(f.type));
  if (!files.length) return; // düz metin yapıştırma normal çalışsın
  e.preventDefault();
  pasteFiles(files);
});

/** Panodaki görselleri kuyruğa ekler; durum satırı yalnızca açılabilen görselleri sayar. */
async function pasteFiles(files) {
  const before = items.length;
  await queueFiles(files.map(renamePasted));
  const added = items.length - before;
  if (!busy) setStatus(added ? `Pasted ${plural(added, 'image')} from the clipboard.` : '');
}

$('paste').addEventListener('click', async () => {
  if (!navigator.clipboard || !navigator.clipboard.read) {
    setStatus('This browser does not let a button read images from the clipboard. Press Ctrl+V (Cmd+V on a Mac) anywhere on this page instead.');
    return;
  }
  try {
    const clipItems = await navigator.clipboard.read();
    const files = [];
    for (const ci of clipItems) {
      const type = ci.types.find((t) => /^image\//.test(t));
      if (type) files.push(new File([await ci.getType(type)], '', { type }));
    }
    if (!files.length) {
      setStatus('There is no image on the clipboard. Take a screenshot first (Windows: Win+Shift+S, Mac: Cmd+Ctrl+Shift+4), then press Paste again.');
      return;
    }
    await pasteFiles(files);
  } catch (err) {
    console.error(err);
    setStatus('The browser blocked clipboard access. Press Ctrl+V (Cmd+V on a Mac) anywhere on this page instead.');
  }
});

/* ---------- Kütüphaneler ---------- */
let tessPromise = null;
function getTesseract() {
  // ESM derlemesi tek varsayılan dışa aktarım verir: { createWorker, ... }
  if (!tessPromise) tessPromise = import(PATHS.lib).then((m) => m.default || m).catch((e) => { tessPromise = null; throw e; });
  return tessPromise;
}
let docxPromise = null;
function getDocx() {
  if (!docxPromise) docxPromise = import(PATHS.docx).catch((e) => { docxPromise = null; throw e; });
  return docxPromise;
}

/** WebAssembly SIMD desteği var mı? (wasm-feature-detect ile aynı mini modül) */
function hasWasmSimd() {
  try {
    return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
  } catch { return false; }
}

/** Seçilen dil(ler) için worker'ı hazırlar; dil değiştiyse yeniden başlatır. */
async function getWorker(langs) {
  if (worker && workerLangs === langs) return worker;
  const { createWorker } = await getTesseract();
  if (worker) { const old = worker; worker = null; workerLangs = ''; try { await old.terminate(); } catch { /* yok say */ } }
  const myGen = gen;
  const corePath = `${PATHS.coreDir}${hasWasmSimd() ? 'tesseract-core-simd-lstm.wasm.js' : 'tesseract-core-lstm.wasm.js'}`;
  const w = await createWorker(langs, 1, {
    workerPath: PATHS.worker,
    corePath,
    langPath: PATHS.lang,
    workerBlobURL: false,   // worker doğrudan kendi origin'imizden; blob dolaylaması yok
    gzip: true,
    logger: (m) => { if (logHandler) logHandler(m); },
    errorHandler: (e) => console.error(e),
  });
  if (myGen !== gen) { try { await w.terminate(); } catch { /* yok say */ } throw CANCELLED; }
  worker = w;
  workerLangs = langs;
  return w;
}

/* ---------- Metin son işlemi ---------- */
const TR_LOWER = 'a-zçğıöşü';
/** Sık OCR kusurlarını toparlar: bitişik harfler, rakam içindeki l/I/O, satır sonu tireleri, fazla boşluk. */
export function tidyText(text, turkish = false) {
  let t = String(text || '')
    .replace(/ﬀ/g, 'ff').replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬃ/g, 'ffi').replace(/ﬄ/g, 'ffl')
    .replace(/(?<=\d)[lI](?=\d)/g, '1').replace(/(?<=\d)O(?=\d)/g, '0')
    .replace(/([a-zà-ÿçğıöşü])-\n([a-zà-ÿçğıöşü])/g, '$1$2')
    .replace(/ +([,.;:!?])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (turkish) {
    t = t.replace(/Ġ/g, 'İ').replace(/ġ/g, 'ğ')
      .replace(new RegExp(`(?<=[${TR_LOWER}])I(?=[${TR_LOWER}])`, 'g'), 'ı');
  }
  return t;
}

/** tesseract blocks → satırlar (kelime + güven); paragraflar arasına null. */
function extractLines(blocks) {
  const lines = [];
  for (const b of blocks || []) {
    for (const p of b.paragraphs || []) {
      for (const l of p.lines || []) {
        const ws = (l.words || [])
          .map((w) => ({ text: String(w.text || '').trim(), conf: Number(w.confidence) || 0 }))
          .filter((w) => w.text);
        if (ws.length) lines.push(ws);
      }
      if (lines.length && lines[lines.length - 1] !== null) lines.push(null);
    }
  }
  while (lines.length && lines[lines.length - 1] === null) lines.pop();
  return lines;
}

/* ---------- Çalıştır ---------- */
/** "1-3, 5, 8-" → sayfa numaraları; boş ya da "all" → hepsi. Geçersiz parçada RangeError(part). */
export function parseRange(expr, total) {
  const clean = String(expr || '').replace(/[–—]/g, '-').replace(/\s*-\s*/g, '-').trim();
  if (!clean || /^all$/i.test(clean)) return Array.from({ length: total }, (_, i) => i + 1);
  const out = new Set();
  for (const part of clean.split(/[,;\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d*)-(\d*)$/);
    if (m && (m[1] || m[2])) {
      const a = m[1] ? Number(m[1]) : 1;
      const b = m[2] ? Number(m[2]) : total;
      for (let i = Math.min(a, b); i <= Math.max(a, b) && i <= total; i++) if (i >= 1) out.add(i);
    } else if (/^\d+$/.test(part)) {
      const n = Number(part);
      if (n >= 1 && n <= total) out.add(n);
    } else {
      throw new RangeError(part);
    }
  }
  return Array.from(out).sort((a, b) => a - b);
}

function setBusy(on) {
  busy = on;
  $('run').disabled = on;
  $('clear').disabled = on;
  $('paste').disabled = on;
  $('rotate').disabled = on;
  $('crop-reset').disabled = on;
  for (const id of ['opt-lang', 'opt-pages', 'opt-clean', 'opt-deskew', 'opt-tidy', 'crop-l', 'crop-t', 'crop-r', 'crop-b']) $(id).disabled = on;
  $('cancel').hidden = !on;
  $('drop').setAttribute('aria-disabled', String(on));
  renderQueue();
}

$('run').addEventListener('click', run);

async function run() {
  if (busy || !items.length) return;
  showError($('error'), null);
  setStatus('');
  // İşleri sayfa sayfa hazırla
  const jobs = [];
  const skipped = [];
  for (const item of items) {
    if (item.kind === 'pdf') {
      let pages;
      try {
        pages = parseRange($('opt-pages').value, item.numPages);
      } catch (err) {
        showError($('error'), `"${err.message}" is not a valid page range. Use page numbers and ranges such as 1-3, 5 or 8- (page 8 to the end), or leave the PDF pages box empty to read every page.`);
        $('opt-pages').focus();
        return;
      }
      if (!pages.length) { skipped.push(`${item.name} (${plural(item.numPages, 'page')})`); continue; }
      for (const p of pages) jobs.push({ item, page: p, pageCount: pages.length });
    } else {
      jobs.push({ item, page: 1, pageCount: 1 });
    }
  }
  if (!jobs.length) {
    showError($('error'), `None of those page numbers exist in ${skipped.join(', ')}. Change the PDF pages box or leave it empty to read every page.`);
    return;
  }

  const langs = $('opt-lang').value;
  const deskew = $('opt-deskew').checked;
  const tidy = $('opt-tidy').checked;
  const progress = $('progress');
  const total = jobs.length;
  let loadPhase = true;
  let current = 0;
  pageResults = [];
  $('result').hidden = true;
  $('result').classList.remove('is-active');
  for (const it of items) setItemStatus(it, 'Waiting');
  setBusy(true);
  const myGen = gen;
  const cancelSignal = new Promise((_, reject) => { cancelReject = reject; });
  cancelSignal.catch(() => { /* yarışta kaybeden söz için */ });

  logHandler = (m) => {
    if (!m || typeof m.progress !== 'number' || myGen !== gen) return;
    const pct = Math.round(m.progress * 100);
    if (loadPhase) {
      const label = /core/.test(m.status) ? `Loading the OCR engine from this site (one-time, about 4 MB)… ${pct}%`
        : /traineddata/.test(m.status) ? `Loading the ${LANG_NAMES[langs] || langs} language model (stored for next time)… ${pct}%`
          : /initializ/.test(m.status) ? 'Starting the OCR engine…' : 'Preparing…';
      setProgress(progress, Math.min(15, m.progress * 15), label);
    } else if (m.status === 'recognizing text') {
      const per = 85 / total;
      const { item, page } = jobs[current];
      const where = item.kind === 'pdf' ? `${item.name}, page ${num(page)}` : item.name;
      setProgress(progress, 15 + per * current + per * m.progress, `Reading ${where} (${num(current + 1)} of ${num(total)})… ${pct}%`);
    }
  };

  try {
    setProgress(progress, 0, 'Preparing the OCR engine…');
    await tick();
    const w = await Promise.race([getWorker(langs), cancelSignal]);
    loadPhase = false;
    for (let i = 0; i < jobs.length; i++) {
      if (myGen !== gen) throw CANCELLED;
      current = i;
      const { item, page, pageCount } = jobs[i];
      setItemStatus(item, item.kind === 'pdf' ? `Reading page ${num(page)}…` : 'Reading…');
      setProgress(progress, 15 + (85 / total) * i, item.kind === 'pdf' ? `Drawing ${item.name}, page ${num(page)}…` : `Preparing ${item.name}…`);
      await tick();
      const canvas = await Promise.race([prepareJobCanvas(item, page), cancelSignal]);
      let data;
      try {
        ({ data } = await Promise.race([
          w.recognize(canvas, { rotateAuto: deskew }, { text: true, blocks: true }),
          cancelSignal,
        ]));
      } finally {
        canvas.width = canvas.height = 0; // belleği bırak
      }
      let text = String((data && data.text) || '').replace(/\r/g, '').trim();
      if (tidy) text = tidyText(text, langs.includes('tur'));
      const lines = extractLines(data && data.blocks);
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const wordConfs = lines.flatMap((l) => (l || []));
      const lowWords = wordConfs.filter((x) => x.conf < LOW_CONF).length;
      const confidence = words ? Math.round(Number(data && data.confidence) || 0) : 0;
      pageResults.push({
        item, page, pdf: item.kind === 'pdf', pageCount, text, words, confidence, lowWords, lines,
        label: item.kind === 'pdf' ? `${item.name} · page ${num(page)}` : item.name,
      });
      const done = pageResults.filter((r) => r.item === item);
      if (done.length === pageCount) {
        const withText = done.filter((r) => r.words);
        setItemStatus(item, withText.length
          ? `Done · ${Math.round(withText.reduce((s, r) => s + r.confidence, 0) / withText.length)}% confidence`
          : 'Done · no text found');
      }
    }
    showResults(false, total, skipped);
  } catch (err) {
    if (err === CANCELLED || myGen !== gen) {
      for (const it of items) if (/^(Waiting|Reading)/.test(it.status)) setItemStatus(it, 'Cancelled');
      if (pageResults.length) showResults(true, total, skipped);
      else { setProgress(progress, null); setStatus('Cancelled. Nothing was read; press Extract text to start again.'); }
    } else {
      console.error(err);
      setProgress(progress, null);
      for (const it of items) if (/^(Waiting|Reading)/.test(it.status)) setItemStatus(it, 'Stopped');
      showError($('error'), friendlyOcrError(err));
    }
  } finally {
    logHandler = null;
    cancelReject = null;
    setBusy(false);
  }
}

$('cancel').addEventListener('click', async () => {
  if (!busy) return;
  gen += 1;
  setProgress($('progress'), 100, 'Cancelling…');
  const w = worker;
  worker = null; workerLangs = '';
  if (cancelReject) cancelReject(CANCELLED);
  if (w) { try { await w.terminate(); } catch { /* yok say */ } }
  $('run').focus();
});

function friendlyOcrError(err) {
  const m = String((err && (err.message || err)) || '');
  if (/Network error|fetch|Failed to load|importScripts|Failed to fetch|dynamically imported/i.test(m)) {
    return 'The OCR engine or language file could not be loaded. They come only from this website (about 6 MB on first use); check your connection and reload the page, then try again. If you installed the page as an app, open it once while online.';
  }
  if (/WebAssembly|wasm/i.test(m)) return 'Your browser does not support WebAssembly or has it turned off. Try the latest Chrome, Edge, Firefox or Safari.';
  if (/memory|allocation|out of/i.test(m)) return 'The image is too large for the browser\'s memory. Crop it to the text, read fewer PDF pages at a time or close other tabs, then try again.';
  return 'Something went wrong while reading the text. Reload the page and try again; if it keeps happening, save the image again as PNG or JPG first.';
}

/* ---------- Sonuçlar ---------- */
function showResults(cancelled, total, skipped) {
  const progress = $('progress');
  const multi = pageResults.length > 1;
  const parts = pageResults.map((r) => (multi ? `--- ${r.label} ---\n\n${r.text || '[no text found]'}` : r.text));
  const text = parts.join('\n\n').trim();
  const words = pageResults.reduce((s, r) => s + r.words, 0);
  const withText = pageResults.filter((r) => r.words);
  const avgConf = withText.length ? Math.round(withText.reduce((s, r) => s + r.confidence, 0) / withText.length) : 0;
  const files = new Set(pageResults.map((r) => r.item.id)).size;
  const lowTotal = pageResults.reduce((s, r) => s + r.lowWords, 0);
  const single = items.length === 1 ? items[0] : null;
  resultBase = single ? (baseName(single.name) || 'extracted-text') : 'extracted-text';

  $('out').value = words ? text : '';
  let info;
  if (!words) {
    info = 'No text was found. The image may be blurry, too small, a photo without printed text, or handwriting. Try a sharper scan (300 DPI), crop to the text area, rotate it upright or switch the clean-up to Black & white.';
  } else {
    info = `${plural(pageResults.length, 'page')} from ${plural(files, 'file')} · about ${plural(words, 'word')} · average confidence ${avgConf}% · language: ${LANG_NAMES[$('opt-lang').value] || $('opt-lang').value}. Check the text and edit it below.`;
  }
  if (cancelled) info = `Stopped after ${num(pageResults.length)} of ${plural(total, 'page')}. ${info}`;
  if (skipped.length) info += ` Skipped (no matching pages): ${skipped.join(', ')}.`;
  $('result-info').textContent = info;
  $('result-title').textContent = words ? (cancelled ? 'Partial text extracted' : 'Text extracted') : 'No text found';
  $('result').classList.toggle('ocr-none', !words);
  $('warn-low').hidden = !(withText.some((r) => r.confidence < HANDWRITING_CONF));

  // Sayfa başına güven skoru
  const ul = $('page-conf');
  ul.textContent = '';
  for (const r of pageResults) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    name.className = 'ocr-conf-name';
    name.textContent = r.label;
    const val = document.createElement('span');
    val.className = 'ocr-conf-val';
    if (!r.words) { val.textContent = 'no text found'; li.classList.add('is-empty'); }
    else {
      val.textContent = `${r.confidence}% confidence · ${plural(r.words, 'word')}${r.lowWords ? ` · ${plural(r.lowWords, 'uncertain word')}` : ''}`;
      if (r.confidence < LOW_CONF) { li.classList.add('is-low'); val.textContent += ' · check this page'; }
    }
    li.append(name, val);
    ul.append(li);
  }

  // Düşük güvenli kelimeleri vurgulayan inceleme görünümü
  const marked = $('marked');
  marked.textContent = '';
  for (const r of pageResults) {
    if (multi) {
      const h = document.createElement('p');
      h.className = 'ocr-marked-h';
      h.textContent = r.label;
      marked.append(h);
    }
    const block = document.createElement('div');
    block.className = 'ocr-marked-page';
    if (!r.lines.length) block.textContent = 'No text found on this page.';
    for (const line of r.lines) {
      const ln = document.createElement('div');
      if (line === null) { ln.className = 'ocr-gap'; block.append(ln); continue; }
      line.forEach((w, i) => {
        if (i) ln.append(' ');
        if (w.conf < LOW_CONF) {
          const mk = document.createElement('mark');
          mk.textContent = w.text;
          mk.title = `Confidence ${Math.round(w.conf)}%`;
          ln.append(mk);
        } else {
          ln.append(w.text);
        }
      });
      block.append(ln);
    }
    marked.append(block);
  }
  $('low-count').textContent = num(lowTotal);
  $('review').hidden = !words;
  $('review').open = lowTotal > 0 && lowTotal <= 300;

  for (const id of ['copy', 'download-txt', 'download-docx']) $(id).disabled = !words;
  $('result').hidden = false;
  $('result').classList.add('is-active');
  setProgress(progress, null);
  if (words) $('out').focus({ preventScroll: false });
  else $('result').scrollIntoView({ block: 'nearest' });
}

/* ---------- Çıktılar ---------- */
$('copy').addEventListener('click', async () => {
  const status = $('copy-status');
  const text = $('out').value;
  if (!text) { status.textContent = 'There is no text to copy yet.'; return; }
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = 'Text copied to the clipboard.';
  } catch {
    $('out').select();
    status.textContent = 'Automatic copying was blocked; the text is selected, press Ctrl+C (Cmd+C on a Mac) to copy it.';
  }
  setTimeout(() => { status.textContent = ''; }, 5000);
});

$('download-txt').addEventListener('click', () => {
  const text = $('out').value;
  if (!text) { $('copy-status').textContent = 'There is no text to download. Extract text first or type it in the box.'; return; }
  // UTF-8 BOM: Windows Not Defteri ve Excel aksanlı/Türkçe karakterleri doğru açsın
  downloadBlob(new Blob(['﻿', text.replace(/\r?\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' }), `${resultBase}.txt`);
});

$('download-docx').addEventListener('click', async () => {
  const text = $('out').value;
  if (!text) { $('copy-status').textContent = 'There is no text to download. Extract text first or type it in the box.'; return; }
  try {
    const { Document, Packer, Paragraph, TextRun } = await getDocx();
    const children = text.split(/\n{2,}/).map((block) => {
      const runs = [];
      block.split('\n').forEach((line, i) => runs.push(new TextRun({ text: line, break: i > 0 ? 1 : undefined })));
      return new Paragraph({ spacing: { after: 160 }, children: runs });
    });
    const doc = new Document({
      creator: 'Bilişim Ajans Free Tools',
      title: resultBase,
      description: 'Created with Image to Text (OCR) at araclar.bilisimajans.com',
      sections: [{ children }],
    });
    let blob = await Packer.toBlob(doc);
    if (blob.type !== DOCX_MIME) blob = new Blob([blob], { type: DOCX_MIME });
    downloadBlob(blob, `${resultBase}.docx`);
  } catch (err) {
    console.error(err);
    showError($('error'), 'The Word file could not be created. Use "Download .txt" instead and paste the text into Word.');
  }
});

/* ---------- Temizle ---------- */
$('clear').addEventListener('click', () => {
  if (busy) return;
  for (const it of items) disposeItem(it);
  items = []; selectedId = null; pageResults = [];
  $('out').value = '';
  $('page-conf').textContent = '';
  $('marked').textContent = '';
  $('result').hidden = true;
  $('result').classList.remove('is-active');
  $('opt-pages').value = '';
  setProgress($('progress'), null);
  showError($('error'), null);
  setStatus('');
  refresh();
  $('drop').focus();
});
