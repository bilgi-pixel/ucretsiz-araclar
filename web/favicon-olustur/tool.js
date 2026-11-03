// Favicon Oluşturucu — saf Canvas ile tüm boyutlar, elle yazılmış ICO (ICONDIR + PNG gömülü girdiler),
// zip için fflate (MIT). Dosya hiçbir zaman sunucuya gitmez; her şey tarayıcıda üretilir.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MASTER = 512;            // tüm çıktılar bu ana tuvalden kademeli küçültülür
const ICO_SIZES = [16, 32, 48];
const INPUT_EXT = /\.(png|jpe?g|svg|webp)$/i;

let source = null;             // { kind: 'image'|'text', canvas, name, svgText, w, h }
let fflate = null;
let fontPromise = null;
let renderTimer = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

/** Harf logosu için DejaVu Sans Bold (vendor, çevrimdışı) — Türkçe karakterler tam. */
function loadFont() {
  if (!fontPromise) {
    const url = new URL('../vendor/fonts/dejavu-sans@2.37/DejaVuSans-Bold.ttf', import.meta.url).href;
    const face = new FontFace('DejaVu Sans Favicon', `url("${url}")`, { weight: '700' });
    fontPromise = face.load().then((f) => { document.fonts.add(f); return f; });
  }
  return fontPromise;
}

/* ---------- Mod seçimi ---------- */
function mode() { return document.querySelector('input[name="mode"]:checked').value; }
document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => {
  const m = mode();
  $('panel-image').hidden = m !== 'image';
  $('panel-text').hidden = m !== 'text';
  showError($('error'), null);
  if (m === 'text') scheduleTextRender();
  else { source = source && source.kind === 'image' ? source : null; refresh(); }
}));

/* ---------- Resimden ---------- */
createDropzone({
  el: $('drop'),
  accept: 'image/png,image/jpeg,image/svg+xml,image/webp,.png,.jpg,.jpeg,.svg,.webp',
  multiple: false,
  onFiles: ([file]) => addImage(file),
});

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
    img.src = url;
  });
}

async function addImage(file) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const isSvg = /^image\/svg/i.test(file.type) || /\.svg$/i.test(file.name);
  if (!(/^image\/(png|jpe?g|svg\+xml|webp)$/i.test(file.type) || INPUT_EXT.test(file.name))) {
    showError($('error'), `"${file.name}" bir resim değil; bu araç PNG, JPG, SVG ve WebP açar. Logonuz PDF içindeyse önce "PDF'den Resme" aracıyla PNG'ye çevirin ya da sağdaki "Harf logosu" seçeneğiyle sıfırdan simge üretin.`);
    return;
  }
  if (file.size > BIG_FILE) {
    showError($('error'), 'Dosya 50 MB üzerinde; favicon için 512×512 piksellik bir PNG yeterlidir. İşlem yavaş olabilir, bekleyin ya da önce "Resim Küçült" aracıyla küçültün.');
  }
  try {
    const img = await loadImage(file);
    let w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) { w = h = MASTER; } // ölçüsüz SVG
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = MASTER;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    // Kare olmayan resmi oranı bozmadan ortaya sığdır; kenarlar şeffaf kalır.
    const s = Math.min(MASTER / w, MASTER / h);
    const dw = Math.round(w * s), dh = Math.round(h * s);
    ctx.drawImage(img, (MASTER - dw) / 2, (MASTER - dh) / 2, dw, dh);
    source = { kind: 'image', canvas, name: baseName(file.name), svgText: isSvg ? await file.text() : null, w, h };
    const notes = [`${file.name} · ${w}×${h} · ${formatBytes(file.size)}`];
    if (!isSvg && Math.min(w, h) < 180) notes.push('Resim 180 pikselden küçük; büyük simgeler (Apple Touch, Android) bulanık görünebilir. Mümkünse en az 512×512 piksel ya da SVG kullanın.');
    if (w !== h) notes.push('Resim kare değil; ortaya yerleştirildi, kalan alan şeffaf bırakıldı.');
    $('image-info').textContent = notes.join(' ');
    $('image-info').hidden = false;
    refresh();
  } catch (err) {
    console.error(err);
    source = null;
    showError($('error'), 'Resim açılamadı; dosya bozuk olabilir ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edip yeniden seçin.');
    refresh();
  }
}

/* ---------- Harf logosu ---------- */
['txt', 'txt-bg', 'txt-fg', 'txt-radius'].forEach((id) => $(id).addEventListener('input', scheduleTextRender));
$('txt-radius').addEventListener('input', () => { $('txt-radius-out').textContent = `%${$('txt-radius').value}`; });

function scheduleTextRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderText, 120);
}

async function renderText() {
  const text = $('txt').value.trim().slice(0, 2);
  showError($('error'), null);
  $('result').classList.remove('is-active');
  if (!text) { source = null; refresh(); return; }
  try { await loadFont(); } catch { /* font yüklenemezse sistem fontuyla devam */ }
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = MASTER;
  const ctx = canvas.getContext('2d');
  const r = (Number($('txt-radius').value) / 100) * (MASTER / 2);
  ctx.fillStyle = $('txt-bg').value;
  roundRect(ctx, 0, 0, MASTER, MASTER, r);
  ctx.fill();
  // Metni genişliğe sığdır: tek harf %60, iki harf %52 yükseklikle başla, taşarsa küçült.
  let size = text.length === 1 ? MASTER * 0.62 : MASTER * 0.5;
  ctx.fillStyle = $('txt-fg').value;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let m;
  for (;;) {
    ctx.font = `700 ${size}px "DejaVu Sans Favicon", "DejaVu Sans", Arial, sans-serif`;
    m = ctx.measureText(text);
    if (m.width <= MASTER * 0.8 || size < 40) break;
    size *= 0.94;
  }
  const asc = m.actualBoundingBoxAscent || size * 0.72, desc = m.actualBoundingBoxDescent || 0;
  ctx.fillText(text, MASTER / 2, MASTER / 2 + (asc - desc) / 2);
  source = { kind: 'text', canvas, name: text.toLowerCase().replace(/[^a-z0-9çğıöşü]/gi, '') || 'favicon', svgText: null, w: MASTER, h: MASTER };
  refresh();
}

function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- Ölçekleme ve türevler ---------- */
/** Kademeli yarıya indirerek küçültür (tek adımda 512→16 bulanık/kırık olur). */
function resample(src, size) {
  let cur = src, w = cur.width;
  while (w / 2 >= size) {
    const c = document.createElement('canvas');
    c.width = c.height = w / 2;
    const x = c.getContext('2d');
    x.imageSmoothingQuality = 'high';
    x.drawImage(cur, 0, 0, w / 2, w / 2);
    cur = c; w /= 2;
  }
  const out = document.createElement('canvas');
  out.width = out.height = size;
  const ctx = out.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(cur, 0, 0, size, size);
  return out;
}

/** Arka plan doldurulmuş kopya (Apple Touch şeffaflığı siyaha çevirir). */
function flatten(src, bg) {
  const c = document.createElement('canvas');
  c.width = c.height = src.width;
  const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height);
  x.drawImage(src, 0, 0);
  return c;
}

/** Maskable: simge %80 güvenli alana küçültülür, kalan alan arka plan rengiyle dolar. */
function maskable(src, bg) {
  const c = document.createElement('canvas');
  c.width = c.height = src.width;
  const x = c.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height);
  const inner = Math.round(c.width * 0.8), off = Math.round((c.width - inner) / 2);
  x.imageSmoothingQuality = 'high';
  x.drawImage(src, off, off, inner, inner);
  return c;
}

function toPngBytes(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (b) => (b ? resolve(new Uint8Array(await b.arrayBuffer())) : reject(new Error('encode'))), 'image/png');
  });
}

/** ICO yazıcı: ICONDIR (6 bayt) + her boyut için ICONDIRENTRY (16 bayt) + PNG verileri. */
function buildIco(entries) {
  const header = 6 + 16 * entries.length;
  const total = entries.reduce((n, e) => n + e.bytes.length, header);
  const buf = new Uint8Array(total);
  const dv = new DataView(buf.buffer);
  dv.setUint16(0, 0, true);               // ayrılmış
  dv.setUint16(2, 1, true);               // tür: 1 = simge
  dv.setUint16(4, entries.length, true);  // girdi sayısı
  let off = header;
  entries.forEach((e, i) => {
    const p = 6 + i * 16;
    buf[p] = e.size >= 256 ? 0 : e.size;  // genişlik (256 → 0)
    buf[p + 1] = e.size >= 256 ? 0 : e.size;
    buf[p + 2] = 0;                       // palet yok
    buf[p + 3] = 0;
    dv.setUint16(p + 4, 1, true);         // düzlem
    dv.setUint16(p + 6, 32, true);        // bit/piksel
    dv.setUint32(p + 8, e.bytes.length, true);
    dv.setUint32(p + 12, off, true);
    buf.set(e.bytes, off);
    off += e.bytes.length;
  });
  return buf;
}

/* ---------- Önizleme ---------- */
function refresh() {
  const has = !!source;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview').hidden = !has;
  if (!has) { $('result').classList.remove('is-active'); return; }
  const url32 = resample(source.canvas, 32).toDataURL('image/png');
  document.querySelectorAll('.fv-tab img').forEach((img) => { img.src = url32; });
  const home = flatten(resample(source.canvas, 180), $('apple-bg').value).toDataURL('image/png');
  $('prev-home').src = home;
  const title = ($('site-name').value || 'Siteniz').trim();
  document.querySelectorAll('.fv-tab span').forEach((s) => { s.textContent = title; });
  $('prev-home-label').textContent = title.slice(0, 12);
}
['site-name', 'apple-bg'].forEach((id) => $(id).addEventListener('input', () => { if (source) refresh(); }));
$('apple-bg').addEventListener('input', () => { $('apple-bg-code').textContent = $('apple-bg').value; });
$('theme').addEventListener('input', () => { $('theme-code').textContent = $('theme').value; });

/* ---------- Kod parçaları ---------- */
function headSnippet(hasSvg, hasMaskable) {
  const lines = [
    '<link rel="icon" href="/favicon.ico" sizes="48x48">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
  ];
  if (hasSvg) lines.splice(1, 0, '<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
  lines.push('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">');
  lines.push('<link rel="manifest" href="/site.webmanifest">');
  lines.push(`<meta name="theme-color" content="${$('theme').value}">`);
  if (hasMaskable) lines.push('<!-- maskable simgeler site.webmanifest içinde listelendi -->');
  return lines.join('\n');
}

function manifestJson(name, hasMaskable) {
  const icons = [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ];
  if (hasMaskable) {
    icons.push({ src: '/android-chrome-maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' });
    icons.push({ src: '/android-chrome-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' });
  }
  return JSON.stringify({
    name,
    short_name: name.length > 12 ? name.split(/\s+/)[0].slice(0, 12) : name,
    icons,
    theme_color: $('theme').value,
    background_color: $('apple-bg').value,
    display: 'standalone',
  }, null, 2);
}

/* ---------- Üret ve indir ---------- */
let lastIco = null;
$('generate').addEventListener('click', async () => {
  if (!source) return;
  const btn = $('generate');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  try {
    const name = ($('site-name').value || 'Siteniz').trim();
    const appleBg = $('apple-bg').value;
    const wantMaskable = $('opt-maskable').checked;
    const files = {};
    const enc = new TextEncoder();
    const total = 7 + (wantMaskable ? 2 : 0);
    let step = 0;
    const prog = async (label) => { setProgress($('progress'), (step++ / total) * 100, label); await tick(); };

    // ICO (16/32/48) + aynı PNG'ler ayrı dosya olarak
    const icoEntries = [];
    for (const size of ICO_SIZES) {
      await prog(`favicon-${size}x${size}.png`);
      const bytes = await toPngBytes(resample(source.canvas, size));
      icoEntries.push({ size, bytes });
      files[`favicon-${size}x${size}.png`] = bytes;
    }
    await prog('favicon.ico');
    lastIco = buildIco(icoEntries);
    files['favicon.ico'] = lastIco;

    await prog('apple-touch-icon.png');
    files['apple-touch-icon.png'] = await toPngBytes(flatten(resample(source.canvas, 180), appleBg));

    for (const size of [192, 512]) {
      await prog(`android-chrome-${size}x${size}.png`);
      files[`android-chrome-${size}x${size}.png`] = await toPngBytes(resample(source.canvas, size));
      if (wantMaskable) {
        await prog(`android-chrome-maskable-${size}x${size}.png`);
        files[`android-chrome-maskable-${size}x${size}.png`] = await toPngBytes(maskable(resample(source.canvas, size), appleBg));
      }
    }
    if (source.svgText) files['favicon.svg'] = enc.encode(source.svgText);
    const manifest = manifestJson(name, wantMaskable);
    const head = headSnippet(!!source.svgText, wantMaskable);
    files['site.webmanifest'] = enc.encode(manifest);
    files['head-kodu.html'] = enc.encode(head + '\n');
    files['OKUBENI.txt'] = enc.encode(`Bilişim Ajans Favicon Oluşturucu çıktısı\n\n1. Bu klasördeki dosyaları sitenizin kök dizinine (public_html, www vb.) kopyalayın.\n2. head-kodu.html içindeki satırları her sayfanın <head> bölümüne ekleyin.\n3. site.webmanifest içindeki "name" alanını gerekirse düzenleyin.\n\nDosyalar tarayıcınızda üretildi; hiçbir sunucuya gönderilmedi.\nhttps://araclar.bilisimajans.com/favicon-olustur/\n`);

    const ff = await getFflate();
    const entries = {};
    for (const [n, bytes] of Object.entries(files)) entries[n] = [bytes, { level: 0, mtime: new Date() }];
    const zipped = ff.zipSync(entries);
    setProgress($('progress'), null);

    $('code-head').value = head;
    $('code-manifest').value = manifest;
    const count = Object.keys(files).length;
    $('result-info').textContent = `${count} dosya üretildi · zip ${formatBytes(zipped.length)} · favicon.ico ${formatBytes(lastIco.length)} (16, 32, 48 px)`;
    $('result').classList.add('is-active');
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), `favicon-${source.name || 'site'}.zip`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Simgeler üretilemedi; tarayıcı belleği yetmemiş ya da resim çok büyük olabilir. Daha küçük bir kaynak resimle (512×512 piksel yeterli) tekrar deneyin.');
  } finally {
    btn.disabled = false;
  }
});

$('download-ico').addEventListener('click', () => {
  if (lastIco) downloadBlob(new Blob([lastIco], { type: 'image/x-icon' }), 'favicon.ico');
});

async function copyFrom(textarea, statusEl) {
  try {
    await navigator.clipboard.writeText(textarea.value);
    statusEl.textContent = 'Kopyalandı.';
  } catch {
    textarea.select();
    statusEl.textContent = 'Pano erişimi yok; metin seçildi, Ctrl+C ile kopyalayın.';
  }
  setTimeout(() => { statusEl.textContent = ''; }, 2500);
}
$('copy-head').addEventListener('click', () => copyFrom($('code-head'), $('copy-status')));
$('copy-manifest').addEventListener('click', () => copyFrom($('code-manifest'), $('copy-status')));

$('clear').addEventListener('click', () => {
  source = null; lastIco = null;
  $('txt').value = '';
  $('image-info').hidden = true;
  showError($('error'), null);
  refresh();
});
