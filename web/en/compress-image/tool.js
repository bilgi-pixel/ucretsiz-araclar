// Compress Image (EN) — saf Canvas, kütüphane yok. Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

// Hazır ayarlar: hedef KB + en fazla piksel ölçüsü.
const PRESETS = {
  email: { format: 'jpg', targetKb: 200, maxW: 1600, maxH: 1600, quality: 0.85 },
  upload: { format: 'jpg', targetKb: 500, maxW: 2000, maxH: 2000, quality: 0.85 },
  profile: { format: 'jpg', targetKb: 100, maxW: 800, maxH: 800, quality: 0.9 },
};

let items = []; // { id, file, url, outBlob, outUrl, outName, outW, outH }
let seq = 0;

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp', multiple: true, onFiles: addFiles });

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name));
  if (ok.length !== files.length) {
    showError($('error'), 'Only JPG, PNG and WebP images can be compressed here, so the other files were skipped. For PDFs use a PDF compressor; for HEIC photos, convert them to JPG first.');
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    showError($('error'), 'You selected a file over 50 MB. Because everything runs in your browser it may be slow or run out of memory; if that happens, try the files one at a time.');
  }
  for (const file of ok) {
    const id = String(++seq);
    const url = URL.createObjectURL(file);
    items.push({ id, file, url, outBlob: null, outUrl: null, outName: null });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="download" aria-label="Download this file" hidden>⤓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Remove">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = formatBytes(file.size);
    list.appendChild(li);
  }
  refresh();
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
  } else if (btn.dataset.act === 'download' && it.outBlob) {
    downloadBlob(it.outBlob, it.outName);
  }
});

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
}

$('clear').addEventListener('click', () => {
  items.forEach((it) => { URL.revokeObjectURL(it.url); if (it.outUrl) URL.revokeObjectURL(it.outUrl); });
  items = []; list.innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

// Kalite kaydırıcısının yanındaki yüzdeyi güncelle.
const qualityOut = $('opt-quality-out');
$('opt-quality').addEventListener('input', () => { qualityOut.textContent = `${Math.round($('opt-quality').value * 100)}%`; });

// Hazır ayar seçilince alanları doldur.
$('opt-preset').addEventListener('change', () => {
  const p = PRESETS[$('opt-preset').value];
  if (!p) return;
  $('opt-format').value = p.format;
  $('opt-target').value = String(p.targetKb);
  $('opt-width').value = String(p.maxW);
  $('opt-height').value = String(p.maxH);
  $('opt-quality').value = String(p.quality);
  qualityOut.textContent = `${Math.round(p.quality * 100)}%`;
});
// Kullanıcı bir alanı elle değiştirirse hazır ayar "Özel" olur.
['opt-format', 'opt-target', 'opt-width', 'opt-height', 'opt-quality'].forEach((id) => {
  $(id).addEventListener('input', () => { $('opt-preset').value = 'custom'; });
});

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

function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

/** Resmi verilen ölçeğe çizip kodlar. */
async function render(img, srcW, srcH, w, h, format, quality) {
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (format === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); } // JPG'de saydamlık beyaz olur
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, srcW, srcH, 0, 0, w, h);
  const blob = await toBlob(canvas, MIME[format], format === 'png' ? undefined : quality);
  if (blob.type !== MIME[format]) throw new Error(`format ${format} unsupported`);
  return blob;
}

/**
 * Tek dosyayı işler. Hedef boyut varsa önce kaliteyi (0.3'e kadar) düşürür,
 * yetmezse ölçüyü %15 küçültüp yeniden dener.
 */
async function processOne(file, opts, onStep) {
  const img = await loadImage(file);
  const srcW = img.width || img.naturalWidth, srcH = img.height || img.naturalHeight;
  if (!srcW || !srcH) throw new Error('Unable to decode image');
  let scale = Math.min(1, opts.maxW ? opts.maxW / srcW : 1, opts.maxH ? opts.maxH / srcH : 1);
  const targetBytes = opts.targetKb ? opts.targetKb * 1024 : 0;
  let blob = null, w = 0, h = 0;
  for (let round = 0; round < 12; round++) {
    w = Math.max(1, Math.round(srcW * scale));
    h = Math.max(1, Math.round(srcH * scale));
    if (opts.format === 'png' || !targetBytes) {
      blob = await render(img, srcW, srcH, w, h, opts.format, opts.quality);
      if (!targetBytes || blob.size <= targetBytes) break;
    } else {
      // Kalitede ikili arama: hedefi sağlayan en yüksek kalite.
      let lo = 0.3, hi = opts.quality, best = null;
      blob = await render(img, srcW, srcH, w, h, opts.format, hi);
      if (blob.size <= targetBytes) break;
      for (let i = 0; i < 6; i++) {
        const mid = (lo + hi) / 2;
        const b = await render(img, srcW, srcH, w, h, opts.format, mid);
        if (b.size <= targetBytes) { best = b; lo = mid; } else { hi = mid; }
        onStep && onStep();
        await tick();
      }
      if (best) { blob = best; break; }
    }
    scale *= 0.85; // Kalite yetmedi; ölçüyü küçült
    onStep && onStep();
    await tick();
  }
  img.close && img.close();
  return { blob, w, h };
}

$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const opts = {
    format: $('opt-format').value,
    maxW: Number($('opt-width').value) || 0,
    maxH: Number($('opt-height').value) || 0,
    quality: Number($('opt-quality').value) || 0.85,
    targetKb: Number($('opt-target').value) || 0,
  };
  const failed = [];
  let totalIn = 0, totalOut = 0, done = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const { blob, w, h } = await processOne(it.file, opts, () => setProgress($('progress'), ((i + 0.5) / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name} – compressing to target size…`));
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        it.outBlob = blob;
        it.outUrl = URL.createObjectURL(blob);
        it.outName = `${baseName(it.file.name)}.${opts.format}`;
        it.outW = w; it.outH = h;
        totalIn += it.file.size; totalOut += blob.size; done++;
        if (li) {
          li.querySelector('.thumb').src = it.outUrl;
          const over = opts.targetKb && blob.size > opts.targetKb * 1024 ? ' · could not reach target' : '';
          li.querySelector('.meta').textContent = `${formatBytes(it.file.size)} → ${formatBytes(blob.size)} · ${w}×${h}${over}`;
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
      const pct = totalIn ? Math.round((1 - totalOut / totalIn) * 100) : 0;
      $('result-info').textContent = `${done} ${done === 1 ? 'file' : 'files'} · ${formatBytes(totalIn)} → ${formatBytes(totalOut)} (${pct}% smaller) · ${opts.format.toUpperCase()}`;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      const webp = opts.format === 'webp' ? ' Your browser may not support writing WebP; choose JPG or PNG instead.' : '';
      showError($('error'), `${failed.length} ${failed.length === 1 ? 'file' : 'files'} could not be processed (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). Check that the file is really an image and is not corrupted.${webp}`);
    }
  } finally {
    btn.disabled = false;
  }
});

$('download-all').addEventListener('click', async () => {
  // Sıralı indirme: tarayıcının çoklu indirme izni istemesine fırsat vermek için kısa aralık.
  for (const it of items) {
    if (!it.outBlob) continue;
    downloadBlob(it.outBlob, it.outName);
    await new Promise((r) => setTimeout(r, 300));
  }
});
