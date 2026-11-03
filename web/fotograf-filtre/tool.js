// Fotoğraf Filtreleri — karakalem, siyah-beyaz, sepya, vintage, poster, çizgi film, pixel art, negatif, kontur, ısı haritası.
// Tüm filtreler piksel verisi üzerinde çalışır (ctx.filter yok; her tarayıcıda aynı sonuç). Önizleme küçültülmüş kopyada,
// kayıt tam çözünürlükte ve satır şeritleri hâlinde yapılır; şeritler arasında ilerleme çubuğu güncellenir. Dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;
const PREVIEW_MAX = 900;       // önizleme uzun kenarı (piksel)
const CHUNK_PIXELS = 1_500_000; // her turda işlenen yaklaşık piksel sayısı
const CANCEL = Symbol('cancel');

/** Filtre tanımları: def = varsayılan yoğunluk (0–100), label = kaydırıcının o filtredeki anlamı. */
const FILTERS = {
  karakalem: { def: 50, label: 'Çizgi koyuluğu' },
  siyahbeyaz: { def: 100, label: 'Karışım' },
  sepya: { def: 70, label: 'Eskitme miktarı' },
  vintage: { def: 80, label: 'Solma miktarı' },
  poster: { def: 60, label: 'Renk azaltma' },
  cizgifilm: { def: 50, label: 'Çizgi yoğunluğu' },
  pixel: { def: 40, label: 'Piksel boyutu' },
  negatif: { def: 100, label: 'Karışım' },
  kontur: { def: 50, label: 'Çizgi koyuluğu' },
  isi: { def: 100, label: 'Karışım' },
};

let file = null;
let bitmap = null;
let srcW = 0, srcH = 0;
let previewOrig = null;     // küçültülmüş özgün ImageData
let previewOut = null;      // küçültülmüş filtrelenmiş ImageData
let outBlob = null, outName = '';
let token = 0;              // eski önizleme işlerini iptal etmek için
let timer = 0;

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
  const scale = Math.min(1, PREVIEW_MAX / Math.max(srcW, srcH));
  const pw = Math.max(1, Math.round(srcW * scale)), ph = Math.max(1, Math.round(srcH * scale));
  const c = $('view');
  c.width = pw; c.height = ph;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.clearRect(0, 0, pw, ph);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, pw, ph);
  previewOrig = ctx.getImageData(0, 0, pw, ph);
  previewOut = null;
  $('file-info').textContent = `${f.name} · ${srcW}×${srcH} · ${formatBytes(f.size)}${scale < 1 ? ` · önizleme ${pw}×${ph} (kayıtta tam çözünürlük)` : ''}`;
  $('editor').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  schedulePreview();
}

/* ---------- Ortak yardımcılar ---------- */
/** İlerleme/iptal denetleyicisi: rep(0–1) ilerlemeyi bildirir ve nefes alır; iptal edildiyse CANCEL fırlatır. */
function makeCtl(report, isCancelled) {
  const ctl = {
    async rep(frac) { if (report) report(frac); await tick(); if (isCancelled && isCancelled()) throw CANCEL; },
    sub(a, b) { return { rep: (f) => ctl.rep(a + (b - a) * f), sub: (c, d) => ctl.sub(a + (b - a) * c, a + (b - a) * d) }; },
  };
  return ctl;
}

/** Satırları şeritler hâlinde işler; her şeritten sonra ilerleme bildirir. */
async function eachRows(h, w, ctl, fn) {
  const step = Math.max(8, Math.floor(CHUNK_PIXELS / w));
  for (let y = 0; y < h; y += step) {
    fn(y, Math.min(h, y + step));
    await ctl.rep(Math.min(1, (y + step) / h));
  }
}

function toGray(d, w, h) {
  const g = new Uint8ClampedArray(w * h);
  for (let i = 0, j = 0; j < g.length; i += 4, j++) g[j] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  return g;
}

/** Kutu bulanıklığı (ayrılabilir, kayan toplam; çok geçişli) — tek kanal. Yarıçaptan bağımsız O(n). */
async function boxBlur(src, w, h, r, passes, ctl) {
  let a = src;
  const total = passes * 2;
  for (let p = 0; p < passes; p++) {
    const tmp = new Uint8ClampedArray(w * h);
    // yatay geçiş
    await eachRows(h, w, ctl.sub(2 * p / total, (2 * p + 1) / total), (y0, y1) => {
      const win = 2 * r + 1;
      for (let y = y0; y < y1; y++) {
        const row = y * w;
        let sum = 0;
        for (let k = -r; k <= r; k++) sum += a[row + Math.min(w - 1, Math.max(0, k))];
        for (let x = 0; x < w; x++) {
          tmp[row + x] = sum / win;
          sum += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
        }
      }
    });
    // dikey geçiş: sütun toplamları satır satır kaydırılır
    const out = new Uint8ClampedArray(w * h);
    const sums = new Float64Array(w);
    const win = 2 * r + 1;
    for (let k = -r; k <= r; k++) { const yy = Math.min(h - 1, Math.max(0, k)) * w; for (let x = 0; x < w; x++) sums[x] += tmp[yy + x]; }
    let yDone = 0;
    const step = Math.max(8, Math.floor(CHUNK_PIXELS / w));
    const sub = ctl.sub((2 * p + 1) / total, (2 * p + 2) / total);
    for (let y = 0; y < h; y++) {
      const row = y * w, add = Math.min(h - 1, y + r + 1) * w, rem = Math.max(0, y - r) * w;
      for (let x = 0; x < w; x++) { out[row + x] = sums[x] / win; sums[x] += tmp[add + x] - tmp[rem + x]; }
      if (++yDone % step === 0) await sub.rep(y / h);
    }
    a = out;
  }
  return a;
}

/** Sobel kenar gücü |gx|+|gy| (0–1020), Uint16 dizisi. */
async function sobel(gray, w, h, ctl) {
  const mag = new Uint16Array(w * h);
  await eachRows(h, w, ctl, (y0, y1) => {
    for (let y = y0; y < y1; y++) {
      const ym = Math.max(0, y - 1) * w, y0w = y * w, yp = Math.min(h - 1, y + 1) * w;
      for (let x = 0; x < w; x++) {
        const xm = Math.max(0, x - 1), xp = Math.min(w - 1, x + 1);
        const tl = gray[ym + xm], t = gray[ym + x], tr = gray[ym + xp];
        const l = gray[y0w + xm], rr = gray[y0w + xp];
        const bl = gray[yp + xm], b = gray[yp + x], br = gray[yp + xp];
        const gx = (tr + 2 * rr + br) - (tl + 2 * l + bl);
        const gy = (bl + 2 * b + br) - (tl + 2 * t + tr);
        mag[y0w + x] = Math.abs(gx) + Math.abs(gy);
      }
    }
  });
  return mag;
}

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

/** Özgün ile sonucu a (0–1) oranında karıştırır; alfa kanalı özgün kalır. */
function blendInto(orig, res, a) {
  if (a >= 1) return res;
  for (let i = 0; i < res.length; i += 4) {
    res[i] = orig[i] + (res[i] - orig[i]) * a;
    res[i + 1] = orig[i + 1] + (res[i + 1] - orig[i + 1]) * a;
    res[i + 2] = orig[i + 2] + (res[i + 2] - orig[i + 2]) * a;
  }
  return res;
}

function vignetteFactor(x, y, cx, cy, maxD, v) {
  const t = Math.max(0, (Math.hypot(x - cx, y - cy) / maxD - 0.35) / 0.65);
  return 1 - v * t * t;
}

/* ---------- Filtreler: (ImageData, k 0–100, seçenekler, ctl) → Uint8ClampedArray ---------- */
const IMPL = {
  async karakalem(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const gray = toGray(d, w, h);
    const inv = new Uint8ClampedArray(gray.length);
    for (let i = 0; i < gray.length; i++) inv[i] = 255 - gray[i];
    const r = Math.max(1, Math.round(Math.max(w, h) * 0.008));
    const blur = await boxBlur(inv, w, h, r, 2, ctl.sub(0, 0.85));
    // Renk yakma (color dodge): sonuç = taban / (1 − karışım). Yoğunluk, gama ile çizgi koyuluğunu belirler.
    const gamma = 0.7 + (k / 100) * 1.2;
    const lut = new Uint8ClampedArray(256);
    for (let i = 0; i < 256; i++) lut[i] = 255 * Math.pow(i / 255, gamma);
    const out = new Uint8ClampedArray(d.length);
    await eachRows(h, w, ctl.sub(0.85, 1), (y0, y1) => {
      for (let j = y0 * w; j < y1 * w; j++) {
        const b = blur[j];
        const s = b >= 255 ? 255 : Math.min(255, (gray[j] * 255) / (255 - b));
        const v = lut[Math.round(s)], i = j * 4;
        out[i] = out[i + 1] = out[i + 2] = v; out[i + 3] = d[i + 3];
      }
    });
    return out;
  },

  async siyahbeyaz(src, k, o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    const thr = o.bwMode === 'esik';
    const t = (k / 100) * 255;
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let j = y0 * w; j < y1 * w; j++) {
        const i = j * 4;
        const l = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
        const v = thr ? (l >= t ? 255 : 0) : l; // eşik modunda yalnızca saf siyah ve beyaz
        out[i] = out[i + 1] = out[i + 2] = v; out[i + 3] = d[i + 3];
      }
    });
    return thr ? out : blendInto(d, out, k / 100);
  },

  async sepya(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    const a = k / 100, noiseAmp = 30 * a, vig = 0.65 * a;
    const cx = (w - 1) / 2, cy = (h - 1) / 2, maxD = Math.hypot(cx, cy) || 1;
    let seed = 123456789; // sabit tohum: aynı resim her seferinde aynı gren
    const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return ((seed >>> 0) / 4294967296) - 0.5; };
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let y = y0; y < y1; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = d[i], g = d[i + 1], b = d[i + 2];
        let nr = 0.393 * r + 0.769 * g + 0.189 * b, ng = 0.349 * r + 0.686 * g + 0.168 * b, nb = 0.272 * r + 0.534 * g + 0.131 * b;
        const n = rnd() * 2 * noiseAmp;
        const m = vignetteFactor(x, y, cx, cy, maxD, vig);
        out[i] = (nr + n) * m; out[i + 1] = (ng + n) * m; out[i + 2] = (nb + n) * m; out[i + 3] = d[i + 3];
      }
    });
    return blendInto(d, out, Math.min(1, 0.35 + a * 0.65));
  },

  async vintage(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    const cx = (w - 1) / 2, cy = (h - 1) / 2, maxD = Math.hypot(cx, cy) || 1;
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let y = y0; y < y1; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        // Solmuş siyahlar (kaldırılmış alt sınır), sıcak ışık, hafif yeşilimsi gölge ve vinyet
        const m = vignetteFactor(x, y, cx, cy, maxD, 0.3);
        out[i] = (0.82 * d[i] + 34 + 8) * m;
        out[i + 1] = (0.82 * d[i + 1] + 28 + 3) * m;
        out[i + 2] = (0.74 * d[i + 2] + 30) * m;
        out[i + 3] = d[i + 3];
      }
    });
    return blendInto(d, out, k / 100);
  },

  async poster(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    const L = Math.max(2, Math.round(10 - k * 0.08)); // k yükseldikçe daha az düzey
    const lut = new Uint8ClampedArray(256);
    for (let i = 0; i < 256; i++) lut[i] = Math.round((Math.round((i / 255) * (L - 1)) * 255) / (L - 1));
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let i = y0 * w * 4; i < y1 * w * 4; i += 4) { out[i] = lut[d[i]]; out[i + 1] = lut[d[i + 1]]; out[i + 2] = lut[d[i + 2]]; out[i + 3] = d[i + 3]; }
    });
    return out;
  },

  async cizgifilm(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const n = w * h, r = Math.max(1, Math.round(Math.max(w, h) * 0.004));
    // Renkleri kanal kanal yumuşat, sonra az sayıda düzeye indir, kenarlara koyu çizgi çiz
    const chans = [];
    for (let c = 0; c < 3; c++) {
      const ch = new Uint8ClampedArray(n);
      for (let j = 0; j < n; j++) ch[j] = d[j * 4 + c];
      chans.push(await boxBlur(ch, w, h, r, 1, ctl.sub(c * 0.2, (c + 1) * 0.2)));
    }
    const smooth = new Uint8ClampedArray(n);
    for (let j = 0; j < n; j++) smooth[j] = 0.299 * chans[0][j] + 0.587 * chans[1][j] + 0.114 * chans[2][j];
    const mag = await sobel(smooth, w, h, ctl.sub(0.6, 0.8));
    const T = 300 - k * 2.4;
    const L = 6, lut = new Uint8ClampedArray(256);
    for (let i = 0; i < 256; i++) lut[i] = Math.round((Math.round((i / 255) * (L - 1)) * 255) / (L - 1));
    const out = new Uint8ClampedArray(d.length);
    await eachRows(h, w, ctl.sub(0.8, 1), (y0, y1) => {
      for (let j = y0 * w; j < y1 * w; j++) {
        const i = j * 4, edge = mag[j] > T ? 0.12 : 1;
        out[i] = lut[chans[0][j]] * edge; out[i + 1] = lut[chans[1][j]] * edge; out[i + 2] = lut[chans[2][j]] * edge; out[i + 3] = d[i + 3];
      }
    });
    return out;
  },

  async pixel(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    const bsz = Math.max(2, Math.round(Math.max(w, h) / (130 - k))); // k yükseldikçe kocaman pikseller
    const L = 7, q = (v) => Math.round((Math.round((v / 255) * (L - 1)) * 255) / (L - 1));
    const rows = Math.ceil(h / bsz);
    const perChunk = Math.max(1, Math.floor(CHUNK_PIXELS / (w * bsz)));
    for (let br = 0; br < rows; br++) {
      const y0 = br * bsz, y1 = Math.min(h, y0 + bsz);
      for (let x0 = 0; x0 < w; x0 += bsz) {
        const x1 = Math.min(w, x0 + bsz);
        let sr = 0, sg = 0, sb = 0, sa = 0, cnt = 0;
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * w + x) * 4; sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; sa += d[i + 3]; cnt++; }
        const r = q(sr / cnt), g = q(sg / cnt), b = q(sb / cnt), a = sa / cnt;
        for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * w + x) * 4; out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a; }
      }
      if ((br + 1) % perChunk === 0) await ctl.rep((br + 1) / rows);
    }
    return out;
  },

  async negatif(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const out = new Uint8ClampedArray(d.length);
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let i = y0 * w * 4; i < y1 * w * 4; i += 4) { out[i] = 255 - d[i]; out[i + 1] = 255 - d[i + 1]; out[i + 2] = 255 - d[i + 2]; out[i + 3] = d[i + 3]; }
    });
    return blendInto(d, out, k / 100);
  },

  async kontur(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    const gray = toGray(d, w, h);
    const mag = await sobel(gray, w, h, ctl.sub(0, 0.7));
    const gain = 0.4 + (k / 100) * 1.2;
    const out = new Uint8ClampedArray(d.length);
    await eachRows(h, w, ctl.sub(0.7, 1), (y0, y1) => {
      for (let j = y0 * w; j < y1 * w; j++) { const v = 255 - clamp255(mag[j] * gain), i = j * 4; out[i] = out[i + 1] = out[i + 2] = v; out[i + 3] = d[i + 3]; }
    });
    return out;
  },

  async isi(src, k, _o, ctl) {
    const { width: w, height: h } = src, d = src.data;
    // 256 girişli renk tablosu: koyu mavi → mavi → camgöbeği → yeşil → sarı → kırmızı → koyu kırmızı
    const stops = [[0, 0, 0, 143], [0.14, 0, 0, 255], [0.36, 0, 255, 255], [0.5, 60, 255, 60], [0.64, 255, 255, 0], [0.86, 255, 0, 0], [1, 128, 0, 0]];
    const lut = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let s = 0; while (s < stops.length - 2 && t > stops[s + 1][0]) s++;
      const [t0, r0, g0, b0] = stops[s], [t1, r1, g1, b1] = stops[s + 1];
      const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
      lut[i * 3] = r0 + (r1 - r0) * f; lut[i * 3 + 1] = g0 + (g1 - g0) * f; lut[i * 3 + 2] = b0 + (b1 - b0) * f;
    }
    const out = new Uint8ClampedArray(d.length);
    await eachRows(h, w, ctl, (y0, y1) => {
      for (let i = y0 * w * 4; i < y1 * w * 4; i += 4) {
        const l = Math.round(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
        out[i] = lut[l * 3]; out[i + 1] = lut[l * 3 + 1]; out[i + 2] = lut[l * 3 + 2]; out[i + 3] = d[i + 3];
      }
    });
    return blendInto(d, out, k / 100);
  },
};

/* ---------- Arayüz durumu ---------- */
const currentFilter = () => document.querySelector('input[name="filter"]:checked').value;
const readOpts = () => ({ bwMode: $('bw-mode').value });

function syncControls() {
  const f = currentFilter();
  $('intensity-label').firstChild.textContent = f === 'siyahbeyaz' && $('bw-mode').value === 'esik' ? 'Eşik (koyu ↔ açık) ' : `${FILTERS[f].label} `;
  $('field-bw').hidden = f !== 'siyahbeyaz';
}

function onFilterChange() {
  const f = currentFilter();
  const def = f === 'siyahbeyaz' && $('bw-mode').value === 'esik' ? 50 : FILTERS[f].def;
  $('intensity').value = String(def);
  $('o-intensity').textContent = String(def);
  $('intensity').setAttribute('aria-valuetext', String(def));
  syncControls();
  invalidate();
  schedulePreview();
}

function invalidate() { outBlob = null; $('result').classList.remove('is-active'); }

document.querySelectorAll('input[name="filter"]').forEach((r) => r.addEventListener('change', onFilterChange));
$('bw-mode').addEventListener('change', () => {
  const k = $('bw-mode').value === 'esik' ? 50 : 100;
  $('intensity').value = String(k); $('o-intensity').textContent = String(k);
  syncControls(); invalidate(); schedulePreview();
});
$('intensity').addEventListener('input', () => {
  $('o-intensity').textContent = $('intensity').value;
  $('intensity').setAttribute('aria-valuetext', $('intensity').value);
  invalidate(); schedulePreview();
});
$('split').addEventListener('input', () => { $('o-split').textContent = `%${$('split').value}`; compose(); });

/* ---------- Canlı önizleme ve öncesi/sonrası ---------- */
function schedulePreview() {
  clearTimeout(timer);
  timer = setTimeout(runPreview, 40);
}

async function runPreview() {
  if (!previewOrig) return;
  const my = ++token;
  const f = currentFilter();
  try {
    const ctl = makeCtl(null, () => my !== token);
    const res = await IMPL[f](previewOrig, Number($('intensity').value), readOpts(), ctl);
    if (my !== token) return;
    previewOut = new ImageData(res, previewOrig.width, previewOrig.height);
    compose();
  } catch (err) {
    if (err !== CANCEL) { console.error(err); showError($('error'), 'Önizleme oluşturulamadı. Başka bir filtre deneyin ya da resmi yeniden seçin.'); }
  }
}

/** Sol %split kadar özgün, kalanı filtreli göster. */
function compose() {
  if (!previewOut) return;
  const ctx = $('view').getContext('2d', { willReadFrequently: true });
  const w = previewOut.width, h = previewOut.height;
  ctx.putImageData(previewOut, 0, 0);
  const sx = Math.round((Number($('split').value) / 100) * w);
  if (sx > 0) ctx.putImageData(previewOrig, 0, 0, 0, 0, sx, h);
  $('view').dataset.rendered = String(Date.now());
}

/* ---------- Tam çözünürlükte kaydet ---------- */
const MIME = { png: 'image/png', jpeg: 'image/jpeg' };
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg' };
const toBlob = (canvas, mime, q) => new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('encode failed'))), mime, q));

function syncFormat() { $('field-quality').hidden = $('opt-format').value === 'png'; }
$('opt-format').addEventListener('change', () => { syncFormat(); invalidate(); });
$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `${Math.round($('opt-quality').value * 100)}%`; });

$('run').addEventListener('click', async () => {
  if (!bitmap) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  invalidate();
  try {
    if (srcW > MAX_SIDE || srcH > MAX_SIDE) throw new Error('allocation too large');
    const fmt = $('opt-format').value;
    const canvas = document.createElement('canvas');
    canvas.width = srcW; canvas.height = srcH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (fmt === 'jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, srcW, srcH); } // JPG'de saydam alanlar beyaz olur
    ctx.drawImage(bitmap, 0, 0);
    setProgress($('progress'), 0, 'Filtre uygulanıyor…');
    await tick();
    const data = ctx.getImageData(0, 0, srcW, srcH);
    const ctl = makeCtl((f) => setProgress($('progress'), f * 90, 'Şerit şerit işleniyor…'));
    const res = await IMPL[currentFilter()](data, Number($('intensity').value), readOpts(), ctl);
    ctx.putImageData(new ImageData(res, srcW, srcH), 0, 0);
    setProgress($('progress'), 95, 'Dosya yazılıyor…');
    await tick();
    const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : Number($('opt-quality').value) || 0.92);
    outBlob = blob;
    outName = `${baseName(file.name)}-${currentFilter()}.${EXT[MIME[fmt]]}`;
    setProgress($('progress'), null);
    $('result-info').textContent = `${srcW}×${srcH} · ${formatBytes(blob.size)} · ${fmt === 'png' ? 'PNG' : 'JPG'}`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const big = /allocation|memory/i.test(String(err && err.message)) || srcW > MAX_SIDE || srcH > MAX_SIDE;
    showError($('error'), big
      ? 'Resim tarayıcı belleği için fazla büyük. Önce Resim Küçült ile boyutunu azaltıp tekrar deneyin.'
      : 'Resim kaydedilemedi. Başka bir çıktı biçimi seçip tekrar deneyin ya da resmi küçültüp yeniden deneyin.');
  } finally { btn.disabled = false; }
});

$('download').addEventListener('click', () => { if (outBlob) downloadBlob(outBlob, outName); });

$('clear').addEventListener('click', () => {
  token++;
  bitmap && bitmap.close && bitmap.close();
  bitmap = null; file = null; previewOrig = null; previewOut = null; outBlob = null;
  $('editor').hidden = true; $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  showError($('error'), null);
});

syncFormat();
syncControls();
