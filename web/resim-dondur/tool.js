// Resim Döndür ve Çevir — saf Canvas; 90° katları, serbest açı, aynalama, EXIF yönüne göre otomatik düzeltme.
// Toplu indirme için fflate (MIT). Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;          // tarayıcı canvas sınırlarına karşı güvenli üst kenar
const MAX_PIXELS = 100_000_000;  // ~100 megapiksel
const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const INPUT_EXT = /\.(jpe?g|jfif|png|webp|gif|bmp|avif)$/i;
const HEIC_EXT = /\.(heic|heif|hif)$/i;

let items = []; // { id, file, url, outBlob, outName }
let seq = 0;
let fflate = null;
let quarter = 0;     // 90° adım sayısı (0–3), saat yönünde
let flipH = false;
let flipV = false;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

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
  opt.textContent = 'WebP (bu tarayıcı WebP yazamıyor)';
}

/* ---------- Dosya ekleme ---------- */
createDropzone({
  el: $('drop'),
  accept: 'image/*,.jpg,.jpeg,.jfif,.png,.webp,.gif,.bmp,.avif',
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
  if (heic.length) msgs.push(`${heic.length} HEIC/HEIF dosyası atlandı: tarayıcılar bu Apple biçimini açamıyor. iPhone'da Ayarlar > Kamera > Formatlar > "En Uyumlu" seçerseniz telefon doğrudan JPG çeker.`);
  if (other > 0) msgs.push(`${other} dosya resim değil ve atlandı. JPG, PNG, WebP, GIF, BMP ve AVIF seçin.`);
  if (ok.some((f) => f.size > BIG_FILE)) msgs.push('50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız dosyaları tek tek deneyin.');
  if (msgs.length) showError($('error'), msgs.join(' '));
  for (const file of ok) {
    const id = String(++seq);
    const url = URL.createObjectURL(file);
    items.push({ id, file, url, outBlob: null, outName: null });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="download" aria-label="Bu dosyayı indir" hidden>⤓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
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
    items = items.filter((x) => x !== it);
    li.remove();
    refresh();
  } else if (btn.dataset.act === 'download' && it.outBlob) downloadBlob(it.outBlob, it.outName);
});

$('clear').addEventListener('click', () => {
  items.forEach((it) => URL.revokeObjectURL(it.url));
  items = []; list.innerHTML = '';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

/* ---------- Seçenekler ---------- */
function readOpts() {
  return {
    quarter,
    flipH,
    flipV,
    angle: Number($('opt-angle').value) || 0,
    mode: $('opt-mode').value,           // 'expand' | 'crop'
    auto: $('opt-auto').checked,
    format: $('opt-format').value,        // 'same' | jpg | png | webp
    quality: Number($('opt-quality').value) || 0.92,
    bg: $('opt-bg').value || '#ffffff',
    transparent: $('opt-transparent').checked,
  };
}

function refreshButtons() {
  $('state-rot').textContent = `${quarter * 90}°`;
  $('btn-fliph').setAttribute('aria-pressed', String(flipH));
  $('btn-flipv').setAttribute('aria-pressed', String(flipV));
  $('angle-out').textContent = `${Number($('opt-angle').value).toFixed(1).replace('.0', '')}°`;
  $('field-mode').hidden = Number($('opt-angle').value) === 0;
  const jpgOut = $('opt-format').value === 'jpg';
  $('opt-transparent').disabled = jpgOut;
  $('field-quality').hidden = $('opt-format').value === 'png';
}

$('btn-left').addEventListener('click', () => { quarter = (quarter + 3) % 4; changed(); });
$('btn-right').addEventListener('click', () => { quarter = (quarter + 1) % 4; changed(); });
$('btn-180').addEventListener('click', () => { quarter = (quarter + 2) % 4; changed(); });
$('btn-fliph').addEventListener('click', () => { flipH = !flipH; changed(); });
$('btn-flipv').addEventListener('click', () => { flipV = !flipV; changed(); });
$('btn-reset').addEventListener('click', () => {
  quarter = 0; flipH = false; flipV = false; $('opt-angle').value = '0'; changed();
});
['opt-angle', 'opt-mode', 'opt-bg', 'opt-transparent', 'opt-format', 'opt-quality'].forEach((id) => $(id).addEventListener('input', changed));
$('opt-auto').addEventListener('change', () => { previewKey = ''; changed(); });
$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `${Math.round($('opt-quality').value * 100)}%`; });
$('opt-bg').addEventListener('input', () => { $('opt-bg-code').textContent = $('opt-bg').value; });

function changed() {
  refreshButtons();
  drawPreview();
}

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-box').hidden = !has;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
  refreshButtons();
  drawPreview();
}

/* ---------- Kod çözme ve dönüşüm ---------- */
async function loadImage(file, auto) {
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: auto ? 'from-image' : 'none' });
      if (bmp.width && bmp.height) return { src: bmp, w: bmp.width, h: bmp.height };
    } catch { /* Image ile dene */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve({ src: img, w: img.naturalWidth, h: img.naturalHeight }); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Unable to decode image')); };
    img.src = url;
  });
}

/** Çıktı tuvalinin boyutunu ve kırp modundaki ölçeği hesaplar. */
function layout(w, h, o) {
  const swap = o.quarter % 2 === 1;
  const sw = swap ? h : w, sh = swap ? w : h;
  if (!o.angle) return { W: sw, H: sh, k: 1 };
  const th = Math.abs(o.angle) * Math.PI / 180;
  const c = Math.abs(Math.cos(th)), s = Math.abs(Math.sin(th));
  if (o.mode === 'crop') {
    // Boşluk kalmayacak en küçük büyütme: dönmüş görüntü tuvali tamamen örtmeli.
    const k = Math.max(c + (sh / sw) * s, c + (sw / sh) * s);
    return { W: sw, H: sh, k };
  }
  return { W: Math.max(1, Math.round(sw * c + sh * s)), H: Math.max(1, Math.round(sw * s + sh * c)), k: 1 };
}

/** Kaynağı seçeneklere göre yeni bir canvas'a çizer. */
function renderTo(src, w, h, o, forceOpaque) {
  const { W, H, k } = layout(w, h, o);
  if (W > MAX_SIDE || H > MAX_SIDE || W * H > MAX_PIXELS) throw new Error('image too large');
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const opaque = forceOpaque || o.outFormat === 'jpg' || !o.transparent;
  if (opaque) { ctx.fillStyle = o.bg; ctx.fillRect(0, 0, W, H); }
  ctx.imageSmoothingQuality = 'high';
  ctx.translate(W / 2, H / 2);
  ctx.scale(o.flipH ? -1 : 1, o.flipV ? -1 : 1);       // aynalama çıktıda görünen yöne uygulanır
  ctx.rotate(((o.quarter * 90 + o.angle) * Math.PI) / 180);
  ctx.scale(k, k);
  ctx.drawImage(src, -w / 2, -h / 2, w, h);
  return canvas;
}

function resolveFormat(file, o) {
  if (o.format !== 'same') return o.format;
  if (/jpe?g|jfif/i.test(file.type) || /\.(jpe?g|jfif)$/i.test(file.name)) return 'jpg';
  if (/webp/i.test(file.type) || /\.webp$/i.test(file.name)) return WEBP_OK ? 'webp' : 'png';
  return 'png';
}

function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

/* ---------- Önizleme (ilk dosya, küçültülmüş kaynak) ---------- */
let previewSrc = null;   // küçük canvas
let previewKey = '';
let previewBusy = false;

async function drawPreview() {
  const box = $('preview');
  if (!items.length) { previewSrc = null; previewKey = ''; return; }
  const first = items[0];
  const key = `${first.id}|${$('opt-auto').checked}`;
  if (previewKey !== key && !previewBusy) {
    previewBusy = true;
    try {
      const { src, w, h } = await loadImage(first.file, $('opt-auto').checked);
      const f = Math.min(1, 480 / Math.max(w, h));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(w * f)); c.height = Math.max(1, Math.round(h * f));
      c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
      src.close && src.close();
      previewSrc = c; previewKey = key;
    } catch {
      previewSrc = null; previewKey = key;
      $('preview-note').textContent = 'Önizleme oluşturulamadı; dosya bozuk olabilir. Yine de dönüştürmeyi deneyebilirsiniz.';
      box.hidden = true;
    } finally { previewBusy = false; }
  }
  if (!previewSrc) return;
  const o = { ...readOpts(), outFormat: resolveFormat(first.file, readOpts()) };
  try {
    const out = renderTo(previewSrc, previewSrc.width, previewSrc.height, o, false);
    box.width = out.width; box.height = out.height;
    box.hidden = false;
    const ctx = box.getContext('2d');
    ctx.clearRect(0, 0, out.width, out.height);
    ctx.drawImage(out, 0, 0);
    $('preview-note').textContent = `Önizleme: ${first.file.name} (küçültülmüş). Dönüşüm: ${quarter * 90}°${o.angle ? ` + ${o.angle}°` : ''}${flipH ? ' · yatay ayna' : ''}${flipV ? ' · dikey ayna' : ''}.`;
  } catch { /* önizleme çizilemedi: sessiz geç */ }
}

/* ---------- Uygula ---------- */
async function processOne(file, o) {
  const { src, w, h } = await loadImage(file, o.auto);
  try {
    const fmt = resolveFormat(file, o);
    const canvas = renderTo(src, w, h, { ...o, outFormat: fmt }, false);
    const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : o.quality);
    if (blob.type !== MIME[fmt]) throw new Error(`format ${fmt} unsupported`);
    const out = { blob, w: canvas.width, h: canvas.height, fmt };
    canvas.width = canvas.height = 1;
    return out;
  } finally { src.close && src.close(); }
}

$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const o = readOpts();
  if (o.format === 'webp' && !WEBP_OK) {
    showError($('error'), 'Tarayıcınız WebP yazmayı desteklemiyor. Chrome, Edge, Firefox ya da Safari 16 ve üstü ile deneyin; şimdilik JPG veya PNG seçebilirsiniz.');
    btn.disabled = false;
    return;
  }
  const failed = [];
  let done = 0, totalIn = 0, totalOut = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const r = await processOne(it.file, o);
        it.outBlob = r.blob;
        it.outName = `${baseName(it.file.name)}-dondurulmus.${r.fmt}`;
        totalIn += it.file.size; totalOut += r.blob.size; done++;
        if (li) {
          li.querySelector('.meta').textContent = `${r.w}×${r.h} · ${formatBytes(r.blob.size)}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push({ name: it.file.name, big: /too large|memory|allocation/i.test(String(err && err.message)) });
        if (li) li.querySelector('.meta').textContent = 'işlenemedi';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} dosya döndürüldü · ${formatBytes(totalIn)} → ${formatBytes(totalOut)}`;
      $('download-zip').hidden = done < 2;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      const names = failed.slice(0, 3).map((f) => f.name).join(', ') + (failed.length > 3 ? '…' : '');
      showError($('error'), failed.some((f) => f.big)
        ? `${failed.length} dosya işlenemedi (${names}). Sonuç görüntüsü tarayıcı sınırını aşıyor olabilir; "Kırp" modunu seçin ya da önce Resim Boyutlandır ile küçültün.`
        : `${failed.length} dosya işlenemedi (${names}). Dosya bozuk olabilir ya da uzantısı yanlış olabilir (ör. .jpg adlı bir PDF). Başka bir programda açılıp açılmadığını kontrol edin.`);
    }
  } finally {
    btn.disabled = false;
  }
});

/* ---------- İndirme ---------- */
$('download-all').addEventListener('click', async () => {
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
      let name = it.outName, n = 2;
      while (used.has(name)) name = it.outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      setProgress($('progress'), (i / ready.length) * 100, `Arşive ekleniyor: ${name}`);
      await tick();
      entries[name] = [new Uint8Array(await it.outBlob.arrayBuffer()), { level: 0, mtime: new Date() }];
    }
    const zipped = ff.zipSync(entries);
    setProgress($('progress'), null);
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'dondurulmus-resimler.zip');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Zip oluşturulamadı; tarayıcı belleği yetmemiş olabilir. "Tek tek indir" düğmesini kullanın ya da daha az dosyayla deneyin.');
  } finally {
    btn.disabled = false;
  }
});

refreshButtons();
