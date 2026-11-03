// Resize Image (EN) — saf Canvas; zip için fflate (MIT). Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384; // tarayıcı canvas üst sınırına yakın güvenli değer
const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

// Sosyal medya ve resmî kullanım ön ayarları (genişlik × yükseklik, piksel).
const PRESETS = {
  'ig-kare': { w: 1080, h: 1080, fit: 'cover' },
  'ig-dikey': { w: 1080, h: 1350, fit: 'cover' },
  'ig-hikaye': { w: 1080, h: 1920, fit: 'cover' },
  'yt-kapak': { w: 1280, h: 720, fit: 'cover' },
  'fb-kapak': { w: 820, h: 312, fit: 'cover' },
  'li-kapak': { w: 1584, h: 396, fit: 'cover' },
  'x-baslik': { w: 1500, h: 500, fit: 'cover' },
  'web-800': { w: 800, h: 0, fit: 'contain' },
  'hd': { w: 1920, h: 1080, fit: 'contain' },
  'passport': { w: 600, h: 600, fit: 'cover' },
};

let items = []; // { id, file, url, img, srcW, srcH, outBlob, outUrl, outName, outW, outH }
let seq = 0;
let fflate = null;
async function getFflate() {
  if (!fflate) fflate = await import(new URL('../../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp,image/gif,image/bmp', multiple: true, onFiles: addFiles });

/* ---------- Dosya listesi ---------- */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp|gif|bmp)$/.test(f.type) || /\.(jpe?g|png|webp|gif|bmp)$/i.test(f.name));
  if (ok.length !== files.length) {
    const pdf = files.some((f) => /\.pdf$/i.test(f.name) || f.type === 'application/pdf');
    showError($('error'), `Only JPG, PNG, WebP, GIF and BMP images can be resized here, so the other files were skipped.${pdf ? ' To turn PDF pages into pictures, use a PDF to image tool first.' : ''} For HEIC photos, set your phone camera to "Most Compatible" and save them as JPG.`);
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    showError($('error'), 'You selected a file over 50 MB. Because everything runs in your browser it may be slow or run out of memory; if that happens, try the files one at a time.');
  }
  for (const file of ok) {
    const id = String(++seq);
    const url = URL.createObjectURL(file);
    const it = { id, file, url, img: null, srcW: 0, srcH: 0, outBlob: null, outUrl: null, outName: null };
    items.push(it);
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="download" aria-label="Download this file" hidden>⤓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Remove">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = formatBytes(file.size);
    list.appendChild(li);
    // Ölçüleri okuyup listeye yaz (önizleme ve büyütme uyarısı için gerekli).
    try {
      const dims = await readDims(file);
      it.srcW = dims.w; it.srcH = dims.h;
      li.querySelector('.meta').textContent = `${dims.w}×${dims.h} · ${formatBytes(file.size)}`;
    } catch {
      li.querySelector('.meta').textContent = 'unreadable';
      it.broken = true;
    }
  }
  const broken = items.filter((x) => x.broken);
  if (broken.length) {
    showError($('error'), `${broken.map((x) => x.file.name).slice(0, 3).join(', ')} could not be opened: the file is corrupted or its extension does not match its content. Check that you can open it in an image viewer, then save it again and retry.`);
  }
  refresh();
  updatePreview();
}

function readDims(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { resolve({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(img.src); };
    img.onerror = () => { reject(new Error('Unable to decode image')); URL.revokeObjectURL(img.src); };
    img.src = URL.createObjectURL(file);
  });
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  const it = items.find((x) => x.id === li.dataset.id);
  if (!it) return;
  if (btn.dataset.act === 'remove') {
    URL.revokeObjectURL(it.url);
    if (it.outUrl) URL.revokeObjectURL(it.outUrl);
    items = items.filter((x) => x !== it);
    li.remove();
    refresh();
    updatePreview();
  } else if (btn.dataset.act === 'download' && it.outBlob) {
    downloadBlob(it.outBlob, it.outName);
  }
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-wrap').hidden = !has;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
}

$('clear').addEventListener('click', () => {
  items.forEach((it) => { URL.revokeObjectURL(it.url); if (it.outUrl) URL.revokeObjectURL(it.outUrl); });
  items = []; list.innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

/* ---------- Seçenekler ---------- */
const modeRadios = Array.from(document.querySelectorAll('input[name="mode"]'));
function getMode() { return (modeRadios.find((r) => r.checked) || modeRadios[0]).value; }
function syncModePanels() {
  const m = getMode();
  $('panel-px').hidden = m !== 'px';
  $('panel-percent').hidden = m !== 'percent';
  $('panel-preset').hidden = m !== 'preset';
}
modeRadios.forEach((r) => r.addEventListener('change', () => { syncModePanels(); updatePreview(); }));

const qualityOut = $('opt-quality-out');
$('opt-quality').addEventListener('input', () => { qualityOut.textContent = `${Math.round($('opt-quality').value * 100)}%`; });
const percentOut = $('opt-percent-out');
$('opt-percent').addEventListener('input', () => { percentOut.textContent = `${$('opt-percent').value}%`; });
$('opt-percent-num').addEventListener('input', () => {
  const v = Math.max(1, Math.min(400, Number($('opt-percent-num').value) || 100));
  $('opt-percent').value = String(v); percentOut.textContent = `${v}%`;
});
$('opt-percent').addEventListener('input', () => { $('opt-percent-num').value = $('opt-percent').value; });

// Oran kilidi: bir alan değişince diğerini ilk resmin oranına göre doldur.
let editing = false;
function lockPair(changed) {
  if (!$('opt-lock').checked || editing) return;
  const first = items.find((it) => it.srcW && it.srcH);
  if (!first) return;
  const { w: sw, h: sh } = rotatedSrc(first);
  editing = true;
  if (changed === 'w') {
    const w = Number($('opt-width').value);
    $('opt-height').value = w > 0 ? String(Math.max(1, Math.round((w * sh) / sw))) : '';
  } else {
    const h = Number($('opt-height').value);
    $('opt-width').value = h > 0 ? String(Math.max(1, Math.round((h * sw) / sh))) : '';
  }
  editing = false;
}
$('opt-width').addEventListener('input', () => { lockPair('w'); updatePreview(); });
$('opt-height').addEventListener('input', () => { lockPair('h'); updatePreview(); });
$('opt-lock').addEventListener('change', () => { lockPair('w'); updatePreview(); });

$('opt-preset').addEventListener('change', () => {
  const p = PRESETS[$('opt-preset').value];
  if (p) $('opt-fit').value = p.fit;
  updatePreview();
});
['opt-fit', 'opt-rotate', 'opt-flip', 'opt-format', 'opt-percent', 'opt-percent-num', 'opt-quality', 'opt-bg'].forEach((id) => {
  $(id).addEventListener('input', updatePreview);
  $(id).addEventListener('change', updatePreview);
});
$('opt-format').addEventListener('change', () => {
  const f = $('opt-format').value;
  $('quality-field').hidden = f === 'png';
  $('bg-field').hidden = !(f === 'jpeg');
});

/** Döndürme sonrası kaynak ölçüsü (90/270'te en-boy yer değiştirir). */
function rotatedSrc(it) {
  const rot = Number($('opt-rotate').value) || 0;
  return rot % 180 ? { w: it.srcH, h: it.srcW } : { w: it.srcW, h: it.srcH };
}

/** Seçeneklerden hedef kutuyu okur: { w, h, fit } (0 = serbest). */
function readTarget() {
  const mode = getMode();
  if (mode === 'percent') return { pct: Number($('opt-percent').value) || 100 };
  if (mode === 'preset') {
    const p = PRESETS[$('opt-preset').value] || PRESETS['web-800'];
    return { w: p.w, h: p.h, fit: $('opt-fit').value };
  }
  return { w: Number($('opt-width').value) || 0, h: Number($('opt-height').value) || 0, fit: $('opt-fit').value };
}

/**
 * Tek resim için çıktı ölçüsünü ve kırpma dikdörtgenini hesaplar.
 * Dönüş: { outW, outH, sx, sy, sw, sh, upscale } — sx..sh döndürülmüş kaynak üzerinde kırpma alanı.
 */
function plan(it, target) {
  const { w: sw0, h: sh0 } = rotatedSrc(it);
  let outW, outH, sx = 0, sy = 0, sw = sw0, sh = sh0;
  if (target.pct) {
    outW = Math.round((sw0 * target.pct) / 100);
    outH = Math.round((sh0 * target.pct) / 100);
  } else if (target.w && target.h) {
    if (target.fit === 'stretch') { outW = target.w; outH = target.h; }
    else if (target.fit === 'cover') {
      outW = target.w; outH = target.h;
      const s = Math.max(target.w / sw0, target.h / sh0);
      sw = Math.round(target.w / s); sh = Math.round(target.h / s);
      sx = Math.round((sw0 - sw) / 2); sy = Math.round((sh0 - sh) / 2);
    } else { // contain
      const s = Math.min(target.w / sw0, target.h / sh0);
      outW = Math.round(sw0 * s); outH = Math.round(sh0 * s);
    }
  } else if (target.w) { outW = target.w; outH = Math.round((target.w * sh0) / sw0); }
  else if (target.h) { outH = target.h; outW = Math.round((target.h * sw0) / sh0); }
  else { outW = sw0; outH = sh0; }
  outW = Math.max(1, Math.min(MAX_SIDE, outW)); outH = Math.max(1, Math.min(MAX_SIDE, outH));
  const upscale = outW > sw || outH > sh;
  return { outW, outH, sx, sy, sw, sh, upscale };
}

function outFormat(it) {
  const f = $('opt-format').value;
  if (f !== 'orig') return f;
  if (it.file.type === 'image/png') return 'png';
  if (it.file.type === 'image/webp') return 'webp';
  if (it.file.type === 'image/jpeg') return 'jpeg';
  return 'png'; // GIF/BMP gibi biçimler kayıpsız PNG'ye yazılır
}

/* ---------- Önizleme ---------- */
let previewTimer = null;
function updatePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(renderPreview, 120);
}
async function renderPreview() {
  const first = items.find((it) => it.srcW && it.srcH);
  const warn = $('warn-upscale');
  if (!first) { warn.hidden = true; $('preview-info').textContent = ''; return; }
  const target = readTarget();
  const p = plan(first, target);
  const anyUp = items.some((it) => it.srcW && plan(it, target).upscale);
  warn.hidden = !anyUp;
  const fmt = outFormat(first);
  $('preview-info').textContent = `Before: ${first.srcW}×${first.srcH} · ${formatBytes(first.file.size)}  →  After: ${p.outW}×${p.outH} · ${fmt.toUpperCase()}${items.length > 1 ? ` (first file; ${items.length} files will be processed)` : ''}`;
  try {
    const img = await loadImage(first.file);
    const canvas = $('preview-canvas');
    const scale = Math.min(1, 480 / p.outW, 360 / p.outH);
    canvas.width = Math.max(1, Math.round(p.outW * scale));
    canvas.height = Math.max(1, Math.round(p.outH * scale));
    draw(img, first, p, canvas, fmt);
    canvas.hidden = false;
    img.close && img.close();
  } catch { /* önizleme başarısızsa sessiz geç; asıl işlemde hata verilir */ }
}

/* ---------- Çizim ---------- */
async function loadImage(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unable to decode image'));
    img.src = URL.createObjectURL(file);
  });
}

/** Döndürme + çevirme + kırpma + ölçekleme: hepsi tek drawImage'da. */
function draw(img, it, p, canvas, fmt) {
  const ctx = canvas.getContext('2d');
  const rot = Number($('opt-rotate').value) || 0;
  const flip = $('opt-flip').checked;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  if (fmt === 'jpeg') { ctx.fillStyle = $('opt-bg').value || '#ffffff'; ctx.fillRect(0, 0, W, H); } // JPG'de saydamlık dolgu rengi olur
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.save();
  ctx.translate(W / 2, H / 2);
  if (flip) ctx.scale(-1, 1);
  ctx.rotate((rot * Math.PI) / 180);
  // Döndürülmüş uzayda hedef ölçü: 90/270'te W ve H yer değiştirir.
  const dw = rot % 180 ? H : W, dh = rot % 180 ? W : H;
  // Kırpma dikdörtgeni döndürülmüş kaynak koordinatında hesaplandı; orijinale geri çevir.
  let { sx, sy, sw, sh } = p;
  if (rot === 90) [sx, sy, sw, sh] = [sy, it.srcH - sx - sw, sh, sw];
  else if (rot === 180) [sx, sy] = [it.srcW - sx - sw, it.srcH - sy - sh];
  else if (rot === 270) [sx, sy, sw, sh] = [it.srcW - sy - sh, sx, sh, sw];
  ctx.drawImage(img, sx, sy, sw, sh, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();
}

function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

async function processOne(it, target) {
  const img = await loadImage(it.file);
  if (!it.srcW) { it.srcW = img.width || img.naturalWidth; it.srcH = img.height || img.naturalHeight; }
  if (!it.srcW || !it.srcH) throw new Error('Unable to decode image');
  const p = plan(it, target);
  const fmt = outFormat(it);
  const canvas = document.createElement('canvas');
  canvas.width = p.outW; canvas.height = p.outH;
  draw(img, it, p, canvas, fmt);
  img.close && img.close();
  const quality = Number($('opt-quality').value) || 0.9;
  const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : quality);
  if (blob.type !== MIME[fmt]) throw new Error(`format ${fmt} unsupported`);
  return { blob, w: p.outW, h: p.outH, fmt };
}

$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const target = readTarget();
  if (getMode() === 'px' && !target.w && !target.h) {
    showError($('error'), 'Enter at least one pixel value for width or height; the other is calculated to keep the aspect ratio.');
    btn.disabled = false; return;
  }
  const failed = [];
  let totalIn = 0, totalOut = 0, done = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const { blob, w, h, fmt } = await processOne(it, target);
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        it.outBlob = blob;
        it.outUrl = URL.createObjectURL(blob);
        it.outName = `${baseName(it.file.name)}-${w}x${h}.${EXT[MIME[fmt]]}`;
        it.outW = w; it.outH = h;
        totalIn += it.file.size; totalOut += blob.size; done++;
        if (li) {
          li.querySelector('.thumb').src = it.outUrl;
          li.querySelector('.meta').textContent = `${it.srcW}×${it.srcH} → ${w}×${h} · ${formatBytes(it.file.size)} → ${formatBytes(blob.size)}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push(it.file.name);
        if (li) li.querySelector('.meta').textContent = 'failed';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} ${done === 1 ? 'file' : 'files'} resized · total ${formatBytes(totalIn)} → ${formatBytes(totalOut)}`;
      $('download-all').textContent = done > 1 ? 'Download all (ZIP)' : 'Download';
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      const webp = $('opt-format').value === 'webp' ? ' Your browser may not support writing WebP; choose JPG or PNG instead.' : '';
      showError($('error'), `${failed.length} ${failed.length === 1 ? 'file' : 'files'} could not be processed (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). Check that the file is not corrupted and is really an image; for very large pictures try the percentage mode.${webp}`);
    }
  } finally {
    btn.disabled = false;
  }
});

// Tümünü indir: tek dosya doğrudan, birden çoksa fflate ile ZIP (resimler zaten sıkışık; level 0).
$('download-all').addEventListener('click', async () => {
  const ready = items.filter((it) => it.outBlob);
  if (!ready.length) return;
  if (ready.length === 1) { downloadBlob(ready[0].outBlob, ready[0].outName); return; }
  const btn = $('download-all');
  btn.disabled = true;
  try {
    const { zipSync } = await getFflate();
    const entries = {};
    const used = new Set();
    for (let i = 0; i < ready.length; i++) {
      setProgress($('progress'), (i / ready.length) * 100, `Preparing ZIP: ${ready[i].outName}`);
      await tick();
      let name = ready[i].outName, n = 2;
      while (used.has(name)) name = ready[i].outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      entries[name] = [new Uint8Array(await ready[i].outBlob.arrayBuffer()), { level: 0 }];
    }
    const zipped = zipSync(entries);
    setProgress($('progress'), null);
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'resized-images.zip');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Could not create the ZIP file; download the files one by one with the ⤓ button next to each.');
  } finally {
    btn.disabled = false;
  }
});

$('download-each').addEventListener('click', async () => {
  for (const it of items) {
    if (!it.outBlob) continue;
    downloadBlob(it.outBlob, it.outName);
    await new Promise((r) => setTimeout(r, 300));
  }
});

syncModePanels();
