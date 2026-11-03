// Convert Image (EN) — saf Canvas ile JPG / PNG / WebP çıktısı; toplu indirme için fflate (MIT).
// Dosyalar hiçbir zaman sunucuya gitmez; tüm kod çözme ve kodlama tarayıcıda yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
// Tarayıcının açabildiği girişler; HEIC ayrıca yakalanıp dürüst bir mesajla reddedilir.
const INPUT_EXT = /\.(jpe?g|jfif|png|webp|gif|bmp|avif|svg|ico|tiff?)$/i;
const HEIC_EXT = /\.(heic|heif|hif)$/i;
const SVG_DEFAULT_SIZE = 1024; // ölçüsü olmayan SVG için varsayılan kenar

let items = []; // { id, file, url, outBlob, outUrl, outName }
let seq = 0;
let fflate = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/* ---------- Kodlayıcı desteği: tarayıcı WebP yazabiliyor mu? ---------- */
function canEncode(mime) {
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 2;
    return c.toDataURL(mime).startsWith(`data:${mime}`);
  } catch { return false; }
}
const WEBP_OK = canEncode('image/webp');
if (!WEBP_OK) {
  const opt = $('opt-format').querySelector('option[value="webp"]');
  opt.disabled = true;
  opt.textContent = 'WebP (this browser cannot write WebP)';
  $('webp-warn').hidden = false;
}

/* ---------- Dosya ekleme ---------- */
createDropzone({
  el: $('drop'),
  accept: 'image/*,.jpg,.jpeg,.jfif,.png,.webp,.gif,.bmp,.avif,.svg,.ico,.tif,.tiff',
  multiple: true,
  onFiles: addFiles,
});

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const heic = files.filter((f) => HEIC_EXT.test(f.name) || /^image\/hei[cf]$/i.test(f.type));
  const ok = files.filter((f) => !heic.includes(f) && (/^image\//i.test(f.type) || INPUT_EXT.test(f.name)));
  const other = files.length - ok.length - heic.length;
  const msgs = [];
  if (heic.length) {
    msgs.push(`${heic.length} HEIC/HEIF ${heic.length === 1 ? 'file was' : 'files were'} skipped: browsers cannot open this Apple format. On an iPhone, go to Settings > Camera > Formats > "Most Compatible" and the phone will shoot JPG directly; existing photos are also converted to JPG when you share them from the Files or Photos app with the "Most Compatible" option.`);
  }
  if (other > 0) {
    msgs.push(`${other} ${other === 1 ? 'file is' : 'files are'} not an image and ${other === 1 ? 'was' : 'were'} skipped. This tool opens JPG, PNG, WebP, GIF, BMP, AVIF, SVG and ICO; to turn PDF pages into images use a PDF to image tool.`);
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    msgs.push('You selected a file over 50 MB. Because everything runs in your browser it may be slow or run out of memory; if that happens, try the files one at a time.');
  }
  if (msgs.length) showError($('error'), msgs.join(' '));
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
    li.querySelector('.meta').textContent = `${extLabel(file.name, file.type)} · ${formatBytes(file.size)}`;
    list.appendChild(li);
  }
  refresh();
}

/** Liste satırında gösterilecek kısa biçim adı: "PNG", "SVG"… */
function extLabel(name, type) {
  const m = name.match(/\.([a-z0-9]+)$/i);
  if (m) return m[1].toUpperCase().replace('JPEG', 'JPG');
  return (type.split('/')[1] || 'image').toUpperCase();
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
  updateOptionVisibility();
}

$('clear').addEventListener('click', () => {
  items.forEach((it) => { URL.revokeObjectURL(it.url); if (it.outUrl) URL.revokeObjectURL(it.outUrl); });
  items = []; list.innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

/* ---------- Seçenekler ---------- */
const qualityOut = $('opt-quality-out');
$('opt-quality').addEventListener('input', () => { qualityOut.textContent = `${Math.round($('opt-quality').value * 100)}%`; });
$('opt-bg').addEventListener('input', () => { $('opt-bg-code').textContent = $('opt-bg').value; });
$('opt-format').addEventListener('change', updateOptionVisibility);

/** Kalite yalnızca JPG/WebP'de, arka plan rengi yalnızca JPG'de anlamlı. */
function updateOptionVisibility() {
  const f = $('opt-format').value;
  $('field-quality').hidden = f === 'png';
  $('field-bg').hidden = f !== 'jpg';
}
updateOptionVisibility();

/* ---------- Kod çözme ---------- */
/** SVG'yi Image ile açar; ölçüsü yoksa varsayılan kenar verir. */
function loadViaImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { w = w || SVG_DEFAULT_SIZE; h = h || SVG_DEFAULT_SIZE; }
      resolve({ src: img, w, h });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Unable to decode image')); };
    img.src = url;
  });
}

async function loadImage(file) {
  const isSvg = /^image\/svg/i.test(file.type) || /\.svg$/i.test(file.name);
  if (!isSvg && 'createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      if (bmp.width && bmp.height) return { src: bmp, w: bmp.width, h: bmp.height };
      bmp.close && bmp.close();
    } catch { /* Image ile dene */ }
  }
  return loadViaImage(file);
}

function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

/** Tek dosyayı seçilen biçime kodlar. */
async function convertOne(file, opts) {
  const { src, w, h } = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  // JPG saydamlık taşımaz: önce seçilen arka plan rengini doldur.
  if (opts.format === 'jpg') { ctx.fillStyle = opts.bg; ctx.fillRect(0, 0, w, h); }
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, 0, 0, w, h);
  src.close && src.close();
  const blob = await toBlob(canvas, MIME[opts.format], opts.format === 'png' ? undefined : opts.quality);
  if (blob.type !== MIME[opts.format]) throw new Error(`format ${opts.format} unsupported`);
  canvas.width = canvas.height = 1; // belleği hemen bırak
  return { blob, w, h };
}

/* ---------- Dönüştür ---------- */
$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const opts = {
    format: $('opt-format').value,
    quality: Number($('opt-quality').value) || 0.9,
    bg: $('opt-bg').value || '#ffffff',
  };
  if (opts.format === 'webp' && !WEBP_OK) {
    showError($('error'), 'Your browser cannot write WebP. Try Chrome, Edge, Firefox or Safari 16 and newer; for now you can choose JPG or PNG.');
    btn.disabled = false;
    return;
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
        const { blob, w, h } = await convertOne(it.file, opts);
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        it.outBlob = blob;
        it.outUrl = URL.createObjectURL(blob);
        it.outName = `${baseName(it.file.name)}.${opts.format}`;
        totalIn += it.file.size; totalOut += blob.size; done++;
        if (li) {
          li.querySelector('.thumb').src = it.outUrl;
          li.querySelector('.meta').textContent = `${extLabel(it.file.name, it.file.type)} ${formatBytes(it.file.size)} → ${opts.format.toUpperCase()} ${formatBytes(blob.size)} · ${w}×${h}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push(it.file.name);
        if (li) li.querySelector('.meta').textContent = 'conversion failed';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      const diff = totalIn ? Math.round((1 - totalOut / totalIn) * 100) : 0;
      const sizeNote = diff >= 0 ? `${diff}% smaller` : `${-diff}% larger`;
      $('result-info').textContent = `${done} ${done === 1 ? 'file' : 'files'} · ${formatBytes(totalIn)} → ${formatBytes(totalOut)} (${sizeNote}) · ${opts.format.toUpperCase()}`;
      $('download-zip').hidden = done < 2;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      showError($('error'), `${failed.length} ${failed.length === 1 ? 'file' : 'files'} could not be converted (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). Check that the file is not corrupted and is really an image; if the extension is wrong (for example a PDF named .jpg) the browser cannot open it.`);
    }
  } finally {
    btn.disabled = false;
  }
});

/* ---------- İndirme ---------- */
$('download-all').addEventListener('click', async () => {
  // Sıralı indirme: tarayıcının çoklu indirme izni istemesine fırsat vermek için kısa aralık.
  for (const it of items) {
    if (!it.outBlob) continue;
    downloadBlob(it.outBlob, it.outName);
    await new Promise((r) => setTimeout(r, 300));
  }
});

$('download-zip').addEventListener('click', async () => {
  const ready = items.filter((it) => it.outBlob);
  if (!ready.length) return;
  const btn = $('download-zip');
  btn.disabled = true;
  try {
    const ff = await getFflate();
    const entries = {};
    const used = new Set();
    for (let i = 0; i < ready.length; i++) {
      const it = ready[i];
      // Aynı ad iki kez olursa "(2)" ekle.
      let name = it.outName, n = 2;
      while (used.has(name)) name = it.outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      setProgress($('progress'), (i / ready.length) * 100, `Adding to archive: ${name}`);
      await tick();
      // Resimler zaten sıkıştırılmış: seviye 0 (sadece paketle) hem hızlı hem küçük.
      entries[name] = [new Uint8Array(await it.outBlob.arrayBuffer()), { level: 0, mtime: new Date() }];
    }
    const zipped = ff.zipSync(entries);
    setProgress($('progress'), null);
    const first = baseName(ready[0].file.name).replace(/[\\/:*?"<>|]+/g, '-') || 'images';
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), `${first}-${$('opt-format').value}.zip`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Could not create the zip file; the browser may have run out of memory. Use the "Download one by one" button or try with fewer files.');
  } finally {
    btn.disabled = false;
  }
});
