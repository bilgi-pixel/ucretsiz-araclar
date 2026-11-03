// Online Resim Düzenleyici — piksel verisi üzerinde filtreler (ctx.filter kullanılmaz; Safari dahil her tarayıcıda aynı sonuç).
// Önizleme küçültülmüş kopya üzerinde, kayıt tam çözünürlükte yapılır. Dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;
const PREVIEW_MAX = 900; // önizleme uzun kenarı (piksel)
const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const SLIDERS = ['brightness', 'contrast', 'saturation', 'temperature', 'sharpen', 'vignette'];

let file = null;
let bitmap = null; // özgün bitmap (tam çözünürlük kayıt için yeniden çizilir)
let srcW = 0, srcH = 0;
let previewOrig = null; // küçültülmüş özgün ImageData
let outBlob = null, outName = '';
let showingOriginal = false;
let raf = 0;

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp,image/gif,image/bmp', multiple: false, onFiles: ([f]) => loadFile(f) });

/** Dosyayı EXIF yönüne uyarak çözer. */
async function loadBitmap(f) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(f, { imageOrientation: 'from-image' }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const im = new Image();
    const url = URL.createObjectURL(f);
    im.onload = () => { URL.revokeObjectURL(url); resolve(im); };
    im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Unable to decode image')); };
    im.src = url;
  });
}

async function loadFile(f) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  if (!(/^image\/(jpeg|png|webp|gif|bmp)$/.test(f.type) || /\.(jpe?g|png|webp|gif|bmp)$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir resim dosyası değil. JPG, PNG, WebP, GIF veya BMP seçin; HEIC fotoğrafları için telefonda "en uyumlu" biçimi seçip JPG olarak kaydedin.`);
    return;
  }
  if (f.size > BIG_FILE) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız resmi önce Resim Küçült ile küçültün.');
  }
  let b;
  try {
    b = await loadBitmap(f);
    srcW = b.naturalWidth || b.width; srcH = b.naturalHeight || b.height;
    if (!srcW || !srcH) throw new Error('Unable to decode image');
  } catch {
    showError($('error'), `"${f.name}" açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edin; gerekirse JPG veya PNG olarak yeniden kaydedip tekrar deneyin.`);
    return;
  }
  bitmap && bitmap.close && bitmap.close();
  bitmap = b; file = f; outBlob = null;
  // Büyük resimde önizleme için küçültülmüş kopya hazırla.
  const scale = Math.min(1, PREVIEW_MAX / Math.max(srcW, srcH));
  const pw = Math.max(1, Math.round(srcW * scale)), ph = Math.max(1, Math.round(srcH * scale));
  const c = $('view');
  c.width = pw; c.height = ph;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.clearRect(0, 0, pw, ph);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, pw, ph);
  previewOrig = ctx.getImageData(0, 0, pw, ph);
  $('file-info').textContent = `${f.name} · ${srcW}×${srcH} · ${formatBytes(f.size)}${scale < 1 ? ` · önizleme ${pw}×${ph} (kayıtta tam çözünürlük)` : ''}`;
  $('editor').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  render();
}

/* ---------- Filtre ayarları ---------- */
function readParams() {
  const p = {};
  for (const k of SLIDERS) p[k] = Number($(`f-${k}`).value) || 0;
  p.gray = $('f-gray').checked;
  p.sepia = $('f-sepia').checked;
  p.invert = $('f-invert').checked;
  return p;
}
const isIdentity = (p) => SLIDERS.every((k) => !p[k]) && !p.gray && !p.sepia && !p.invert;

/** Keskinleştirme (3×3 unsharp): kaynaktan yeni tampona yazar; satır aralığı verilir. */
function sharpenRows(src, out, w, h, amount, y0, y1) {
  const k = amount / 50; // 0..2
  for (let y = y0; y < y1; y++) {
    const ym = Math.max(0, y - 1), yp = Math.min(h - 1, y + 1);
    for (let x = 0; x < w; x++) {
      const xm = Math.max(0, x - 1), xp = Math.min(w - 1, x + 1);
      const i = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        const blur = (src[(ym * w + xm) * 4 + c] + src[(ym * w + x) * 4 + c] + src[(ym * w + xp) * 4 + c]
          + src[(y * w + xm) * 4 + c] + src[i + c] + src[(y * w + xp) * 4 + c]
          + src[(yp * w + xm) * 4 + c] + src[(yp * w + x) * 4 + c] + src[(yp * w + xp) * 4 + c]) / 9;
        out[i + c] = src[i + c] + k * (src[i + c] - blur); // Uint8ClampedArray değeri 0–255'e kırpar
      }
      out[i + 3] = src[i + 3];
    }
  }
}

/** Renk işlemleri: parlaklık, kontrast, doygunluk, sıcaklık, gri, sepya, ters, vinyet (yerinde). */
function colorRows(d, w, h, p, y0, y1) {
  const bAdd = p.brightness * 2.55;
  const cc = p.contrast * 2.55;
  const cf = (259 * (cc + 255)) / (255 * (259 - cc));
  const sat = 1 + p.saturation / 100;
  const tAdd = p.temperature * 0.5;
  const vig = p.vignette / 100;
  const cx = (w - 1) / 2, cy = (h - 1) / 2;
  const maxD = Math.hypot(cx, cy) || 1;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      let r = d[i], g = d[i + 1], b = d[i + 2];
      if (p.brightness) { r += bAdd; g += bAdd; b += bAdd; }
      if (p.contrast) { r = cf * (r - 128) + 128; g = cf * (g - 128) + 128; b = cf * (b - 128) + 128; }
      if (p.temperature) { r += tAdd; b -= tAdd; g += tAdd * 0.1; }
      if (p.saturation) {
        r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
        const l = 0.299 * r + 0.587 * g + 0.114 * b;
        r = l + (r - l) * sat; g = l + (g - l) * sat; b = l + (b - l) * sat;
      }
      if (p.gray) {
        const l = Math.round(Math.max(0, Math.min(255, 0.299 * r + 0.587 * g + 0.114 * b)));
        r = g = b = l;
      }
      if (p.sepia) {
        r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
        const nr = 0.393 * r + 0.769 * g + 0.189 * b, ng = 0.349 * r + 0.686 * g + 0.168 * b, nb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = nr; g = ng; b = nb;
      }
      if (p.invert) { r = 255 - Math.max(0, Math.min(255, r)); g = 255 - Math.max(0, Math.min(255, g)); b = 255 - Math.max(0, Math.min(255, b)); }
      if (vig) {
        const t = Math.max(0, (Math.hypot(x - cx, y - cy) / maxD - 0.35) / 0.65);
        const m = 1 - vig * t * t;
        r *= m; g *= m; b *= m;
      }
      d[i] = r; d[i + 1] = g; d[i + 2] = b; // Uint8ClampedArray: yuvarlar ve kırpar
    }
  }
}

/** Tüm hattı bir ImageData üzerinde çalıştırır; onRows verilirse aralarda nefes alır (async). */
function processSync(srcData, p) {
  const { width: w, height: h } = srcData;
  const out = new ImageData(new Uint8ClampedArray(srcData.data), w, h);
  if (p.sharpen) {
    const tmp = new Uint8ClampedArray(srcData.data.length);
    sharpenRows(srcData.data, tmp, w, h, p.sharpen, 0, h);
    out.data.set(tmp);
  }
  colorRows(out.data, w, h, p, 0, h);
  return out;
}

/* ---------- Canlı önizleme ---------- */
function render() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    if (!previewOrig) return;
    const ctx = $('view').getContext('2d', { willReadFrequently: true });
    const p = readParams();
    ctx.putImageData(showingOriginal || isIdentity(p) ? previewOrig : processSync(previewOrig, p), 0, 0);
    $('view').dataset.rendered = String(Date.now());
  });
}
for (const k of SLIDERS) {
  $(`f-${k}`).addEventListener('input', () => {
    $(`o-${k}`).textContent = $(`f-${k}`).value;
    $(`f-${k}`).setAttribute('aria-valuetext', $(`f-${k}`).value);
    outBlob = null; $('result').classList.remove('is-active');
    render();
  });
}
for (const k of ['gray', 'sepia', 'invert']) {
  $(`f-${k}`).addEventListener('change', () => { outBlob = null; $('result').classList.remove('is-active'); render(); });
}

// Öncesi/sonrası: düğme basılı tutulurken özgün görüntü gösterilir (fare, dokunma, klavye).
const cmp = $('compare');
const holdOn = () => { showingOriginal = true; cmp.classList.add('is-held'); render(); };
const holdOff = () => { if (!showingOriginal) return; showingOriginal = false; cmp.classList.remove('is-held'); render(); };
cmp.addEventListener('pointerdown', (e) => { cmp.setPointerCapture && cmp.setPointerCapture(e.pointerId); holdOn(); });
cmp.addEventListener('pointerup', holdOff);
cmp.addEventListener('pointercancel', holdOff);
cmp.addEventListener('lostpointercapture', holdOff);
cmp.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) holdOn(); } });
cmp.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') holdOff(); });
cmp.addEventListener('blur', holdOff);

$('reset').addEventListener('click', () => {
  for (const k of SLIDERS) { $(`f-${k}`).value = '0'; $(`o-${k}`).textContent = '0'; }
  for (const k of ['gray', 'sepia', 'invert']) $(`f-${k}`).checked = false;
  outBlob = null; $('result').classList.remove('is-active');
  render();
});

function syncFormat() {
  const f = $('opt-format').value;
  $('field-quality').hidden = f === 'png';
  $('field-bg').hidden = f !== 'jpeg';
}
$('opt-format').addEventListener('change', syncFormat);
$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `${Math.round($('opt-quality').value * 100)}%`; });

/* ---------- Tam çözünürlükte kaydet ---------- */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality));
}

$('run').addEventListener('click', async () => {
  if (!bitmap) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  try {
    if (srcW > MAX_SIDE || srcH > MAX_SIDE) throw new Error('allocation too large');
    const fmt = $('opt-format').value;
    const canvas = document.createElement('canvas');
    canvas.width = srcW; canvas.height = srcH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (fmt === 'jpeg') { ctx.fillStyle = $('opt-bg').value || '#ffffff'; ctx.fillRect(0, 0, srcW, srcH); } // JPG'de saydamlık dolgu rengi olur
    ctx.drawImage(bitmap, 0, 0);
    const p = readParams();
    if (!isIdentity(p)) {
      setProgress($('progress'), 0, 'Filtreler uygulanıyor…');
      await tick();
      const data = ctx.getImageData(0, 0, srcW, srcH);
      const STRIP = Math.max(16, Math.floor(1_500_000 / srcW)); // her turda ~1,5 milyon piksel
      let work = data;
      if (p.sharpen) {
        const out = new Uint8ClampedArray(data.data.length);
        for (let y = 0; y < srcH; y += STRIP) {
          sharpenRows(data.data, out, srcW, srcH, p.sharpen, y, Math.min(srcH, y + STRIP));
          setProgress($('progress'), (y / srcH) * 50, 'Keskinleştiriliyor…');
          await tick();
        }
        work = new ImageData(out, srcW, srcH);
      }
      for (let y = 0; y < srcH; y += STRIP) {
        colorRows(work.data, srcW, srcH, p, y, Math.min(srcH, y + STRIP));
        setProgress($('progress'), 50 + (y / srcH) * 50, 'Renkler uygulanıyor…');
        await tick();
      }
      ctx.putImageData(work, 0, 0);
    }
    setProgress($('progress'), 95, 'Dosya yazılıyor…');
    await tick();
    const q = Number($('opt-quality').value) || 0.92;
    const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : q);
    if (blob.type !== MIME[fmt]) throw new Error(`format ${fmt} unsupported`);
    outBlob = blob;
    outName = `${baseName(file.name)}-duzenlendi.${EXT[MIME[fmt]]}`;
    setProgress($('progress'), null);
    $('result-info').textContent = `${srcW}×${srcH} · ${formatBytes(blob.size)} · ${fmt.toUpperCase()}`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const big = /allocation|memory/i.test(String(err && err.message)) || srcW > MAX_SIDE || srcH > MAX_SIDE;
    const webp = $('opt-format').value === 'webp' ? ' Tarayıcınız WebP yazmayı desteklemiyor olabilir; JPG veya PNG seçin.' : '';
    showError($('error'), big
      ? 'Resim tarayıcı belleği için fazla büyük. Önce Resim Küçült ile boyutunu azaltıp tekrar deneyin.'
      : `Resim kaydedilemedi. Başka bir çıktı biçimi seçip tekrar deneyin.${webp}`);
  } finally { btn.disabled = false; }
});

$('download').addEventListener('click', () => { if (outBlob) downloadBlob(outBlob, outName); });

$('clear').addEventListener('click', () => {
  bitmap && bitmap.close && bitmap.close();
  bitmap = null; file = null; previewOrig = null; outBlob = null;
  $('editor').hidden = true; $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  showError($('error'), null);
});

syncFormat();
