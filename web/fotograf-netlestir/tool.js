// Fotoğraf Netleştirme ve Büyütme: tamamen tarayıcıda, Canvas + kendi yazdığımız matematik.
// Boru hattı: gürültü azaltma → Lanczos büyütme → otomatik kontrast → unsharp mask.
// Yapay zeka yok; yalnızca klasik görüntü işleme. Büyük işler şeritler (satır grupları) hâlinde
// yapılır ve her şeritte tarayıcıya nefes aldırılır, böylece sayfa donmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_INPUT_MP = 100;      // giriş megapiksel sınırı
const MAX_OUTPUT_MP = 64;      // çıkış megapiksel sınırı (bellek koruması)
const MAX_SIDE = 16384;        // tarayıcı canvas kenar sınırı
const BIG_FILE = 50 * 1024 * 1024;
const PREVIEW_TARGET = 640;    // önizleme kesitinin çıktıdaki hedef genişliği (px)

/* ------------------------- yardımcılar ------------------------- */

let lastPace = 0;
/** Gerekirse tarayıcıya nefes aldırır; iptal edilmişse özel hata fırlatır. */
async function pace(aborted) {
  const now = performance.now();
  if (now - lastPace > 25) {
    await tick();
    lastPace = performance.now();
    if (aborted && aborted()) throw new Error('iptal');
  }
}

/* ------------------------- gürültü azaltma ------------------------- */

/** 3x3 medyan filtresi (her renk kanalı ayrı). */
async function medianDenoise(src, w, h, report, aborted) {
  const dst = new Uint8ClampedArray(src.length);
  const win = new Uint8Array(9);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - 1) * w, y1 = y * w, y2 = Math.min(h - 1, y + 1) * w;
    for (let x = 0; x < w; x++) {
      const xl = Math.max(0, x - 1), xr = Math.min(w - 1, x + 1);
      const i0 = (y0 + xl) * 4, i1 = (y0 + x) * 4, i2 = (y0 + xr) * 4;
      const j0 = (y1 + xl) * 4, j1 = (y1 + x) * 4, j2 = (y1 + xr) * 4;
      const k0 = (y2 + xl) * 4, k1 = (y2 + x) * 4, k2 = (y2 + xr) * 4;
      for (let c = 0; c < 3; c++) {
        win[0] = src[i0 + c]; win[1] = src[i1 + c]; win[2] = src[i2 + c];
        win[3] = src[j0 + c]; win[4] = src[j1 + c]; win[5] = src[j2 + c];
        win[6] = src[k0 + c]; win[7] = src[k1 + c]; win[8] = src[k2 + c];
        // 9 elemanlı ekleme sıralaması
        for (let a = 1; a < 9; a++) {
          const v = win[a];
          let b = a - 1;
          while (b >= 0 && win[b] > v) { win[b + 1] = win[b]; b--; }
          win[b + 1] = v;
        }
        dst[j1 + c] = win[4];
      }
      dst[j1 + 3] = src[j1 + 3];
    }
    if ((y & 7) === 0) { report(y / h); await pace(aborted); }
  }
  return dst;
}

/** 5x5 çift yönlü (bilateral) filtre: kenarları koruyarak düz alanlardaki gürültüyü yumuşatır. */
async function bilateralDenoise(src, w, h, sigmaR, report, aborted) {
  const dst = new Uint8ClampedArray(src.length);
  const spatial = new Float32Array(25);
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
    spatial[(dy + 2) * 5 + dx + 2] = Math.exp(-(dx * dx + dy * dy) / (2 * 1.5 * 1.5));
  }
  const range = new Float32Array(256);
  for (let d = 0; d < 256; d++) range[d] = Math.exp(-(d * d) / (2 * sigmaR * sigmaR));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ci = (y * w + x) * 4;
      const r0 = src[ci], g0 = src[ci + 1], b0 = src[ci + 2];
      let sr = 0, sg = 0, sb = 0, sw = 0;
      for (let dy = -2; dy <= 2; dy++) {
        const yy = Math.min(h - 1, Math.max(0, y + dy));
        for (let dx = -2; dx <= 2; dx++) {
          const xx = Math.min(w - 1, Math.max(0, x + dx));
          const ni = (yy * w + xx) * 4;
          const r = src[ni], g = src[ni + 1], b = src[ni + 2];
          const d = ((Math.abs(r - r0) + Math.abs(g - g0) + Math.abs(b - b0)) / 3) | 0;
          const wt = spatial[(dy + 2) * 5 + dx + 2] * range[d];
          sr += r * wt; sg += g * wt; sb += b * wt; sw += wt;
        }
      }
      dst[ci] = sr / sw; dst[ci + 1] = sg / sw; dst[ci + 2] = sb / sw; dst[ci + 3] = src[ci + 3];
    }
    if ((y & 7) === 0) { report(y / h); await pace(aborted); }
  }
  return dst;
}

/* ------------------------- Lanczos büyütme ------------------------- */

const lanczos3 = (x) => {
  if (x === 0) return 1;
  if (x <= -3 || x >= 3) return 0;
  const px = Math.PI * x;
  return (3 * Math.sin(px) * Math.sin(px / 3)) / (px * px);
};

/** Her çıkış koordinatı için 6 kaynak indeksi ve normalize ağırlık hesaplar. */
function lanczosTable(srcLen, dstLen, scale) {
  const idx = new Int32Array(dstLen * 6);
  const wt = new Float32Array(dstLen * 6);
  for (let o = 0; o < dstLen; o++) {
    const center = (o + 0.5) / scale - 0.5;
    const base = Math.floor(center) - 2;
    let sum = 0;
    for (let k = 0; k < 6; k++) {
      const wv = lanczos3(center - (base + k));
      wt[o * 6 + k] = wv;
      sum += wv;
      idx[o * 6 + k] = Math.min(srcLen - 1, Math.max(0, base + k));
    }
    for (let k = 0; k < 6; k++) wt[o * 6 + k] /= sum;
  }
  return { idx, wt };
}

/** Ayrılabilir Lanczos-3 ile tam sayı katı büyütme (önce yatay, sonra dikey). */
async function lanczosUpscale(src, w, h, scale, report, aborted) {
  const W = w * scale, H = h * scale;
  const tx = lanczosTable(w, W, scale);
  const ty = lanczosTable(h, H, scale);
  const tmp = new Uint8ClampedArray(W * h * 4);
  for (let y = 0; y < h; y++) {
    const so = y * w * 4, to = y * W * 4;
    for (let X = 0; X < W; X++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let k = 0; k < 6; k++) {
        const wv = tx.wt[X * 6 + k];
        const si = so + tx.idx[X * 6 + k] * 4;
        r += src[si] * wv; g += src[si + 1] * wv; b += src[si + 2] * wv; a += src[si + 3] * wv;
      }
      const ti = to + X * 4;
      tmp[ti] = r; tmp[ti + 1] = g; tmp[ti + 2] = b; tmp[ti + 3] = a;
    }
    if ((y & 7) === 0) { report(0.5 * (y / h)); await pace(aborted); }
  }
  const out = new Uint8ClampedArray(W * H * 4);
  const acc = new Float32Array(W * 4);
  const rowLen = W * 4;
  for (let Y = 0; Y < H; Y++) {
    acc.fill(0);
    for (let k = 0; k < 6; k++) {
      const wv = ty.wt[Y * 6 + k];
      const off = ty.idx[Y * 6 + k] * rowLen;
      for (let i = 0; i < rowLen; i++) acc[i] += tmp[off + i] * wv;
    }
    out.set(acc, Y * rowLen); // Uint8ClampedArray yuvarlar ve sınırlar
    if ((Y & 7) === 0) { report(0.5 + 0.5 * (Y / H)); await pace(aborted); }
  }
  return out;
}

/* ------------------------- otomatik kontrast ------------------------- */

/** Parlaklık histogramının %0,5 – %99,5 aralığını 0–255'e gerer (üç kanalda aynı eşleme). */
async function autoContrast(data, w, h, report, aborted) {
  const hist = new Uint32Array(256);
  for (let y = 0; y < h; y++) {
    let i = y * w * 4;
    for (let x = 0; x < w; x++, i += 4) {
      hist[(data[i] * 77 + data[i + 1] * 150 + data[i + 2] * 29) >> 8]++;
    }
    if ((y & 15) === 0) { report(0.4 * (y / h)); await pace(aborted); }
  }
  const total = w * h;
  let acc = 0, lo = 0, hi = 255;
  for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= total * 0.005) { lo = v; break; } }
  acc = 0;
  for (let v = 255; v >= 0; v--) { acc += hist[v]; if (acc >= total * 0.005) { hi = v; break; } }
  if (hi - lo < 16 || (lo <= 1 && hi >= 254)) return; // zaten geniş aralıkta ya da düz görüntü
  const lut = new Uint8ClampedArray(256);
  for (let v = 0; v < 256; v++) lut[v] = ((v - lo) * 255) / (hi - lo);
  for (let y = 0; y < h; y++) {
    let i = y * w * 4;
    for (let x = 0; x < w; x++, i += 4) {
      data[i] = lut[data[i]]; data[i + 1] = lut[data[i + 1]]; data[i + 2] = lut[data[i + 2]];
    }
    if ((y & 15) === 0) { report(0.4 + 0.6 * (y / h)); await pace(aborted); }
  }
}

/* ------------------------- unsharp mask ------------------------- */

/**
 * Unsharp mask: sonuç = orijinal + miktar × (orijinal − bulanık), fark eşikten küçükse dokunulmaz.
 * Gauss bulanıklığı ayrılabilir: yatay geçiş geçici belleğe, dikey geçiş doğrudan sonuca yazılır.
 */
async function unsharp(data, w, h, amount, radius, threshold, report, aborted) {
  const sigma = radius;
  const r = Math.max(1, Math.ceil(sigma * 3));
  const kernel = new Float32Array(2 * r + 1);
  let ksum = 0;
  for (let k = -r; k <= r; k++) { const v = Math.exp(-(k * k) / (2 * sigma * sigma)); kernel[k + r] = v; ksum += v; }
  for (let k = 0; k < kernel.length; k++) kernel[k] /= ksum;

  const tmp = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    const ro = y * w * 4;
    for (let x = 0; x < w; x++) {
      let sr = 0, sg = 0, sb = 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k < 0 ? 0 : x + k >= w ? w - 1 : x + k;
        const wv = kernel[k + r], si = ro + xx * 4;
        sr += data[si] * wv; sg += data[si + 1] * wv; sb += data[si + 2] * wv;
      }
      const ti = ro + x * 4;
      tmp[ti] = sr; tmp[ti + 1] = sg; tmp[ti + 2] = sb;
    }
    if ((y & 7) === 0) { report(0.5 * (y / h)); await pace(aborted); }
  }
  const rowLen = w * 4;
  const acc = new Float32Array(rowLen);
  for (let y = 0; y < h; y++) {
    acc.fill(0);
    for (let k = -r; k <= r; k++) {
      const yy = y + k < 0 ? 0 : y + k >= h ? h - 1 : y + k;
      const wv = kernel[k + r], off = yy * rowLen;
      for (let i = 0; i < rowLen; i++) acc[i] += tmp[off + i] * wv;
    }
    const ro = y * rowLen;
    for (let i = 0; i < rowLen; i += 4) {
      for (let c = 0; c < 3; c++) {
        const orig = data[ro + i + c];
        const diff = orig - acc[i + c];
        if (diff > threshold || diff < -threshold) data[ro + i + c] = orig + amount * diff;
      }
    }
    if ((y & 7) === 0) { report(0.5 + 0.5 * (y / h)); await pace(aborted); }
  }
}

/* ------------------------- boru hattı ------------------------- */

/** ImageData benzeri {data,width,height} alır, ayarlara göre işler, aynı biçimde döndürür. */
async function runPipeline(img, o, report, aborted) {
  let { data, width: w, height: h } = img;
  const stages = [];
  if (o.denoise !== 'none') stages.push('denoise');
  if (o.scale > 1) stages.push('scale');
  if (o.contrast) stages.push('contrast');
  if (o.amount > 0) stages.push('sharpen');
  const n = Math.max(1, stages.length);
  const rep = (i) => (f) => report((i + f) / n);
  let i = 0;
  for (const s of stages) {
    const r = rep(i++);
    if (s === 'denoise') {
      data = o.denoise === 'median' ? await medianDenoise(data, w, h, r, aborted)
        : await bilateralDenoise(data, w, h, o.denoise === 'bilateral-strong' ? 40 : 20, r, aborted);
    } else if (s === 'scale') {
      data = await lanczosUpscale(data, w, h, o.scale, r, aborted);
      w *= o.scale; h *= o.scale;
    } else if (s === 'contrast') {
      if (data === img.data) data = new Uint8ClampedArray(data); // girişi bozmadan kopyala
      await autoContrast(data, w, h, r, aborted);
    } else if (s === 'sharpen') {
      if (data === img.data) data = new Uint8ClampedArray(data); // girişi bozmadan kopyala
      await unsharp(data, w, h, o.amount, o.radius, o.threshold, r, aborted);
    }
  }
  if (data === img.data) data = new Uint8ClampedArray(data);
  report(1);
  return { data, width: w, height: h };
}

/* ------------------------- arayüz ------------------------- */

const state = { bitmap: null, srcCanvas: null, name: '', blob: null, previewId: 0, timer: 0, busy: false };

function readOptions() {
  return {
    scale: Number($('opt-scale').value),
    amount: Number($('opt-amount').value) / 100,
    radius: Number($('opt-radius').value),
    threshold: Number($('opt-threshold').value),
    denoise: $('opt-denoise').value,
    contrast: $('opt-contrast').checked,
    format: $('opt-format').value,
    quality: Math.min(100, Math.max(50, Number($('opt-quality').value) || 92)) / 100,
  };
}

function updateLabels() {
  $('out-amount').textContent = `%${$('opt-amount').value}`;
  $('out-radius').textContent = `${Number($('opt-radius').value).toFixed(1)} px`;
  $('out-threshold').textContent = $('opt-threshold').value;
  $('field-quality').hidden = $('opt-format').value !== 'jpg';
  if (state.bitmap) {
    const o = readOptions();
    const W = state.bitmap.width * o.scale, H = state.bitmap.height * o.scale;
    $('size-info').textContent = `Çıktı boyutu: ${W} × ${H} px (${(W * H / 1e6).toFixed(1)} megapiksel)`;
  }
}

function setCompare(pos) {
  $('cmp').style.setProperty('--pos', `${pos}%`);
  $('cmp-range').value = String(pos);
}

/** Önizleme: görüntünün seçilen yerinden, gerçek piksellerle küçük bir kesit işlenir. */
async function renderPreview() {
  if (!state.bitmap) return;
  const id = ++state.previewId;
  const aborted = () => id !== state.previewId;
  const o = readOptions();
  const bw = state.bitmap.width, bh = state.bitmap.height;
  const cw = Math.min(bw, Math.max(48, Math.round(PREVIEW_TARGET / o.scale)));
  const ch = Math.min(bh, Math.max(48, Math.round((PREVIEW_TARGET * 0.66) / o.scale)));
  const cx = Math.round((bw - cw) * Number($('pos-x').value) / 100);
  const cy = Math.round((bh - ch) * Number($('pos-y').value) / 100);
  const afterC = $('c-after'), beforeC = $('c-before');
  afterC.removeAttribute('data-ready');
  $('preview-status').textContent = 'Önizleme hazırlanıyor…';
  try {
    const crop = state.srcCanvas.getContext('2d').getImageData(cx, cy, cw, ch);
    const res = await runPipeline(crop, o, () => {}, aborted);
    if (aborted()) return;
    const W = res.width, H = res.height;
    beforeC.width = afterC.width = W;
    beforeC.height = afterC.height = H;
    // Önce: aynı kesit tarayıcının kendi yumuşak büyütmesiyle (adil karşılaştırma için)
    const bctx = beforeC.getContext('2d');
    bctx.imageSmoothingEnabled = true;
    bctx.imageSmoothingQuality = 'high';
    bctx.drawImage(state.srcCanvas, cx, cy, cw, ch, 0, 0, W, H);
    afterC.getContext('2d').putImageData(new ImageData(res.data, W, H), 0, 0);
    afterC.dataset.ready = '1';
    afterC.dataset.w = String(W);
    afterC.dataset.h = String(H);
    $('preview-status').textContent = `Önizleme: ${cw} × ${ch} px'lik kesit${o.scale > 1 ? `, ${o.scale}× büyütülmüş` : ''} (gerçek piksellerle). Kaydırıcıyı sürükleyerek önce/sonra karşılaştırın.`;
  } catch (e) {
    if (String(e && e.message) !== 'iptal') {
      $('preview-status').textContent = 'Önizleme oluşturulamadı; yine de kaydetmeyi deneyebilirsiniz.';
    }
  }
}

function schedulePreview() {
  updateLabels();
  clearTimeout(state.timer);
  $('result').classList.remove('is-active');
  state.timer = setTimeout(renderPreview, 220);
}

async function loadFile(file) {
  const err = $('error'), warn = $('warning');
  showError(err, ''); showError(warn, '');
  $('result').classList.remove('is-active');
  if (!/^image\//.test(file.type) && !/\.(png|jpe?g|webp|bmp|gif|avif)$/i.test(file.name)) {
    showError(err, 'Bu dosya bir resim değil. JPG, PNG veya WebP biçiminde bir fotoğraf seçin.');
    return;
  }
  if (file.size > BIG_FILE) {
    warn.textContent = `Dosya büyük (${formatBytes(file.size)}). İşlem uzun sürebilir; telefonda bellek yetmezse daha küçük bir kopya deneyin.`;
    warn.classList.add('is-active');
  }
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    showError(err, 'Resim açılamadı. Dosya bozuk olabilir ya da biçimi desteklenmiyor; fotoğrafı JPG veya PNG olarak yeniden kaydedip tekrar deneyin.');
    return;
  }
  if ((bitmap.width * bitmap.height) / 1e6 > MAX_INPUT_MP) {
    showError(err, `Fotoğraf çok büyük (${(bitmap.width * bitmap.height / 1e6).toFixed(0)} megapiksel). Tarayıcı belleği için ${MAX_INPUT_MP} megapikselden küçük bir kopya kullanın.`);
    return;
  }
  if (bitmap.width < 16 || bitmap.height < 16) {
    showError(err, 'Fotoğraf çok küçük (en az 16 × 16 piksel gerekir). Daha büyük bir görsel seçin.');
    return;
  }
  const c = document.createElement('canvas');
  c.width = bitmap.width; c.height = bitmap.height;
  c.getContext('2d', { willReadFrequently: true }).drawImage(bitmap, 0, 0);
  state.bitmap = bitmap; state.srcCanvas = c; state.name = file.name;
  $('file-info').textContent = `${file.name} · ${bitmap.width} × ${bitmap.height} px · ${formatBytes(file.size)}`;
  $('workspace').hidden = false;
  updateLabels();
  renderPreview();
}

async function runFull() {
  if (!state.bitmap || state.busy) return;
  const err = $('error');
  showError(err, '');
  const o = readOptions();
  const W = state.bitmap.width * o.scale, H = state.bitmap.height * o.scale;
  if (W > MAX_SIDE || H > MAX_SIDE || (W * H) / 1e6 > MAX_OUTPUT_MP) {
    showError(err, `Çıktı çok büyük olurdu (${W} × ${H} px). Büyütme oranını düşürün ya da daha küçük bir fotoğraf kullanın; üst sınır ${MAX_OUTPUT_MP} megapiksel.`);
    return;
  }
  state.busy = true;
  $('run').disabled = true;
  const progress = $('progress');
  setProgress(progress, 0, 'Fotoğraf okunuyor…');
  state.previewId++; // varsa önizleme işini iptal et
  try {
    await tick();
    const full = state.srcCanvas.getContext('2d').getImageData(0, 0, state.bitmap.width, state.bitmap.height);
    const res = await runPipeline(full, o, (f) => setProgress(progress, f * 92, `İşleniyor… %${Math.round(f * 100)}`), null);
    setProgress(progress, 95, 'Dosya hazırlanıyor…');
    await tick();
    const out = document.createElement('canvas');
    out.width = res.width; out.height = res.height;
    const ctx = out.getContext('2d');
    if (o.format === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, out.width, out.height); } // JPG şeffaflık taşımaz
    const tmp = document.createElement('canvas');
    tmp.width = res.width; tmp.height = res.height;
    tmp.getContext('2d').putImageData(new ImageData(res.data, res.width, res.height), 0, 0);
    ctx.drawImage(tmp, 0, 0);
    tmp.width = tmp.height = 0;
    const mime = o.format === 'jpg' ? 'image/jpeg' : 'image/png';
    const blob = await new Promise((resolve) => out.toBlob(resolve, mime, o.quality));
    out.width = out.height = 0;
    if (!blob) throw new Error('memory');
    state.blob = blob;
    const ext = o.format === 'jpg' ? 'jpg' : 'png';
    state.outName = `${baseName(state.name)}-netlesmis.${ext}`;
    $('result-info').textContent = `${res.width} × ${res.height} px · ${formatBytes(blob.size)} · ${state.outName}`;
    $('result').classList.add('is-active');
    $('result').dataset.w = String(res.width);
    $('result').dataset.h = String(res.height);
    setProgress(progress, 100, 'Tamamlandı');
    setTimeout(() => setProgress(progress, null), 800);
  } catch (e) {
    setProgress(progress, null);
    showError(err, /memory|alloc|Array buffer/i.test(String(e && e.message))
      ? 'Tarayıcı belleği yetmedi. Büyütme oranını düşürün ya da daha küçük bir fotoğraf deneyin.'
      : 'İşlem sırasında bir sorun oluştu. Sayfayı yenileyip daha düşük büyütme oranıyla tekrar deneyin.');
  } finally {
    state.busy = false;
    $('run').disabled = false;
    renderPreview();
  }
}

function init() {
  createDropzone({ el: $('drop'), accept: 'image/*', multiple: false, onFiles: (f) => loadFile(f[0]) });
  ['opt-scale', 'opt-amount', 'opt-radius', 'opt-threshold', 'opt-denoise', 'opt-contrast', 'pos-x', 'pos-y'].forEach((id) => $(id).addEventListener('input', schedulePreview));
  ['opt-scale', 'opt-denoise', 'opt-contrast'].forEach((id) => $(id).addEventListener('change', schedulePreview));
  $('opt-format').addEventListener('change', updateLabels);
  $('opt-quality').addEventListener('input', updateLabels);
  $('run').addEventListener('click', runFull);
  $('download').addEventListener('click', () => { if (state.blob) downloadBlob(state.blob, state.outName); });

  // Önce/sonra kaydırıcısı: aralık girdisi (klavye) + sürükleme (fare/dokunma)
  $('cmp-range').addEventListener('input', (e) => setCompare(Number(e.target.value)));
  const cmp = $('cmp');
  const fromPointer = (e) => {
    const rect = cmp.getBoundingClientRect();
    setCompare(Math.round(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))));
  };
  let dragging = false;
  cmp.addEventListener('pointerdown', (e) => { dragging = true; cmp.setPointerCapture(e.pointerId); fromPointer(e); });
  cmp.addEventListener('pointermove', (e) => { if (dragging) fromPointer(e); });
  cmp.addEventListener('pointerup', () => { dragging = false; });
  cmp.addEventListener('pointercancel', () => { dragging = false; });
  setCompare(50);
  updateLabels();
}

init();
