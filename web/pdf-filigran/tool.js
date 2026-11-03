// PDF'e Filigran Ekle — metin (pdf-lib + fontkit + DejaVu Sans, Türkçe karakter) ya da PNG/JPG logo.
// Tüm işlem tarayıcıda; dosyalar ve yazı tipi aynı origin'deki vendor/ klasöründen gelir, ağa veri çıkmaz.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, loadScript, parsePageRanges, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const VENDOR = new URL('../vendor/', import.meta.url).href;
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4;
const DEG = Math.PI / 180;

let items = []; // { id, file, pages, bytes }
let results = []; // { name, blob, pages, drawn }
let logo = null; // { file, bytes, kind: 'png'|'jpg', img: HTMLImageElement, width, height }
let fontCache = null;
let preview = null; // { canvas, scale, vw, vh }

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: true, onFiles: addFiles });
createDropzone({ el: $('logo-drop'), accept: 'image/png,image/jpeg,.png,.jpg,.jpeg', multiple: false, onFiles: ([f]) => setLogo(f) });

async function getFontkit() {
  await loadScript(`${VENDOR}pdf-lib-fontkit@1.1.1/fontkit.umd.min.js`);
  return window.fontkit;
}

async function loadFonts() {
  if (fontCache) return fontCache;
  const base = `${VENDOR}fonts/dejavu-sans@2.37/`;
  const get = (f) => fetch(`${base}${f}`).then((r) => { if (!r.ok) throw new Error('FONT'); return r.arrayBuffer(); });
  const [regular, bold] = await Promise.all([get('DejaVuSans.ttf'), get('DejaVuSans-Bold.ttf')]);
  fontCache = { regular, bold };
  return fontCache;
}

/** PDF'leri doğrular (şifreli/bozuk), sayfa sayısını okur ve listeye ekler. */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const PDFLib = await getPdfLib();
  for (const file of files) {
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      showError($('error'), `"${file.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resme filigran eklemek için önce Resimden PDF'e aracını kullanabilirsiniz.`);
      continue;
    }
    let bytes, pages;
    try {
      bytes = await file.arrayBuffer();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
      pages = doc.getPageCount();
      if (!pages) throw new Error('no pages');
    } catch (err) {
      showError($('error'), /encrypted/i.test(String(err))
        ? `"${file.name}" şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.`
        : `"${file.name}" bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin.`);
      continue;
    }
    if (file.size >= BIG_FILE) {
      $('warning').textContent = `"${file.name}" ${formatBytes(file.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
      $('warning').classList.add('is-active');
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    items.push({ id, file, pages, bytes });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${pages} sayfa · ${formatBytes(file.size)}`;
    $('files').appendChild(li);
  }
  refresh();
  if (items.length && !preview) await buildPreview();
}

$('files').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (!btn) return;
  const li = btn.closest('li');
  items = items.filter((it) => it.id !== li.dataset.id);
  li.remove();
  if (!items.length) preview = null;
  refresh();
  if (items.length) buildPreview(); else drawPreview();
});

/** Logo dosyasını okur; PNG/JPG dışını reddeder. */
async function setLogo(file) {
  showError($('error'), null);
  const isPng = file.type === 'image/png' || /\.png$/i.test(file.name);
  const isJpg = file.type === 'image/jpeg' || /\.jpe?g$/i.test(file.name);
  if (!isPng && !isJpg) {
    showError($('error'), `"${file.name}" desteklenmiyor. Logo için PNG (şeffaf arka plan önerilir) ya da JPG seçin; SVG veya WebP'yi önce PNG'ye çevirin.`);
    return;
  }
  try {
    const bytes = await file.arrayBuffer();
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      const url = URL.createObjectURL(new Blob([bytes], { type: isPng ? 'image/png' : 'image/jpeg' }));
      el.onload = () => { URL.revokeObjectURL(url); resolve(el); };
      el.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode')); };
      el.src = url;
    });
    logo = { file, bytes, kind: isPng ? 'png' : 'jpg', img, width: img.naturalWidth, height: img.naturalHeight };
    $('logo-name').textContent = `${file.name} · ${logo.width}×${logo.height}`;
    $('logo-remove').hidden = false;
  } catch {
    logo = null;
    showError($('error'), `"${file.name}" okunamadı; görsel bozuk olabilir. Dosyayı bir resim görüntüleyicide açıp PNG olarak yeniden kaydedin.`);
  }
  drawPreview();
}
$('logo-remove').addEventListener('click', () => { logo = null; $('logo-name').textContent = ''; $('logo-remove').hidden = true; drawPreview(); });

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-box').hidden = !has;
  $('run').disabled = !has;
  syncType();
}

function reset() {
  items = []; results = []; preview = null;
  $('files').innerHTML = '';
  $('downloads').innerHTML = '';
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active'); $('warning').textContent = '';
  showError($('error'), null);
  refresh();
  drawPreview();
}
$('clear').addEventListener('click', reset);

/** Metin / logo sekmesine göre alanları gösterir. */
function syncType() {
  const isText = $('opt-type').value === 'text';
  $('text-fields').hidden = !isText;
  $('image-fields').hidden = isText;
}
$('opt-type').addEventListener('change', () => { syncType(); drawPreview(); });

// Hazır metinler
document.querySelectorAll('[data-preset]').forEach((b) => b.addEventListener('click', () => { $('opt-text').value = b.dataset.preset; drawPreview(); }));

function getOptions() {
  return {
    type: $('opt-type').value, // text | image
    text: ($('opt-text').value || '').trim(),
    angle: Math.max(-90, Math.min(90, Number($('opt-angle').value) || 0)),
    opacity: Math.max(0.05, Math.min(1, Number($('opt-opacity').value) / 100 || 0.3)),
    size: Math.max(8, Math.min(300, Number($('opt-size').value) || 60)),
    color: $('opt-color').value || '#808080',
    bold: $('opt-bold').checked,
    layout: $('opt-layout').value, // center | tile | corner-br | corner-tl | corner-tr | corner-bl
    scale: Math.max(5, Math.min(100, Number($('opt-scale').value) || 40)) / 100,
    range: $('opt-range').value.trim(),
  };
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  const v = m ? parseInt(m[1], 16) : 0x808080;
  return { r: ((v >> 16) & 255) / 255, g: ((v >> 8) & 255) / 255, b: (v & 255) / 255 };
}

/** Görsel (döndürülmüş sayfa) koordinatını PDF koordinatına çevirir. */
function toPdf(rotation, W, H, vx, vy) {
  switch (((rotation % 360) + 360) % 360) {
    case 90: return { x: W - vy, y: vx };
    case 180: return { x: W - vx, y: H - vy };
    case 270: return { x: vy, y: H - vx };
    default: return { x: vx, y: vy };
  }
}

/**
 * Filigran yerleşimlerini görsel alanda hesaplar. Her yerleşim: { cx, cy } merkez noktası.
 * w/h: çizilecek nesnenin (metin ya da logo) döndürülmemiş boyutu.
 */
function placements(o, vw, vh, w, h) {
  const m = 10 * MM;
  const a = Math.abs(o.angle) * DEG;
  // döndürülmüş kutunun kapladığı alan
  const bw = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
  const bh = Math.abs(w * Math.sin(a)) + Math.abs(h * Math.cos(a));
  if (o.layout === 'tile') {
    const out = [];
    const stepX = Math.max(bw * 1.4, 60), stepY = Math.max(bh * 1.6, 60);
    let row = 0;
    for (let y = stepY / 2; y < vh + stepY / 2; y += stepY, row++) {
      for (let x = (row % 2 ? stepX : stepX / 2); x < vw + stepX / 2; x += stepX) out.push({ cx: x, cy: y });
    }
    return out;
  }
  if (o.layout.startsWith('corner-')) {
    const c = o.layout.slice(7);
    const cx = c.endsWith('l') ? m + bw / 2 : vw - m - bw / 2;
    const cy = c.startsWith('t') ? vh - m - bh / 2 : m + bh / 2;
    return [{ cx, cy }];
  }
  return [{ cx: vw / 2, cy: vh / 2 }];
}

/** Merkezi (cx, cy) olan, açıyla döndürülmüş w×h kutunun sol-alt köşesi (pdf-lib rotate bu noktayı pivot alır). */
function originFor(cx, cy, w, h, angleDeg) {
  const a = angleDeg * DEG;
  const dx = (w / 2) * Math.cos(a) - (h / 2) * Math.sin(a);
  const dy = (w / 2) * Math.sin(a) + (h / 2) * Math.cos(a);
  return { x: cx - dx, y: cy - dy };
}

// ---- Önizleme ----
async function buildPreview() {
  const first = items[0];
  if (!first) return;
  try {
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data: first.bytes.slice(0) }).promise;
    const page = await pdf.getPage(1);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(1.2, 320 / base.width);
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    preview = { canvas, scale, vw: vp.width / scale, vh: vp.height / scale };
    page.cleanup(); pdf.destroy();
  } catch (err) {
    console.warn('Önizleme oluşturulamadı', err);
    preview = null;
  }
  drawPreview();
}

function drawPreview() {
  const out = $('preview');
  if (!preview) { out.hidden = true; return; }
  out.hidden = false;
  const o = getOptions();
  const s = preview.scale;
  out.width = preview.canvas.width; out.height = preview.canvas.height;
  const ctx = out.getContext('2d');
  ctx.drawImage(preview.canvas, 0, 0);
  ctx.save();
  ctx.globalAlpha = o.opacity;
  if (o.type === 'text') {
    if (!o.text) { ctx.restore(); return; }
    ctx.font = `${o.bold ? 'bold ' : ''}${o.size * s}px "DejaVu Sans", Arial, sans-serif`;
    const w = ctx.measureText(o.text).width / s;
    const h = o.size * 0.75; // büyük harf yüksekliği yaklaşık
    ctx.fillStyle = o.color;
    ctx.textBaseline = 'alphabetic';
    for (const p of placements(o, preview.vw, preview.vh, w, h)) {
      ctx.save();
      ctx.translate(p.cx * s, (preview.vh - p.cy) * s);
      ctx.rotate(-o.angle * DEG);
      ctx.fillText(o.text, -w / 2 * s, h / 2 * s);
      ctx.restore();
    }
  } else if (logo) {
    const w = preview.vw * o.scale;
    const h = w * (logo.height / logo.width);
    for (const p of placements(o, preview.vw, preview.vh, w, h)) {
      ctx.save();
      ctx.translate(p.cx * s, (preview.vh - p.cy) * s);
      ctx.rotate(-o.angle * DEG);
      ctx.drawImage(logo.img, -w / 2 * s, -h / 2 * s, w * s, h * s);
      ctx.restore();
    }
  }
  ctx.restore();
}

['opt-text', 'opt-angle', 'opt-opacity', 'opt-size', 'opt-color', 'opt-bold', 'opt-layout', 'opt-scale'].forEach((id) => {
  $(id).addEventListener('input', drawPreview);
  $(id).addEventListener('change', drawPreview);
});
$('opt-opacity').addEventListener('input', () => { $('opacity-val').textContent = `%${$('opt-opacity').value}`; });

// ---- Asıl iş ----
$('run').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  results = [];
  const o = getOptions();
  try {
    if (o.type === 'text' && !o.text) throw new Error('NOTEXT');
    if (o.type === 'image' && !logo) throw new Error('NOLOGO');
    const PDFLib = await getPdfLib();
    const { rgb, degrees } = PDFLib;
    let fontkit = null, fontData = null;
    if (o.type === 'text') { fontkit = await getFontkit(); fontData = await loadFonts(); }
    const color = hexToRgb(o.color);

    for (let i = 0; i < items.length; i++) {
      const { file, bytes } = items[i];
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${file.name} okunuyor…`);
      await tick();
      const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
      let font = null, image = null;
      if (o.type === 'text') {
        doc.registerFontkit(fontkit);
        font = await doc.embedFont(o.bold ? fontData.bold : fontData.regular, { subset: true });
      } else {
        image = logo.kind === 'png' ? await doc.embedPng(logo.bytes) : await doc.embedJpg(logo.bytes);
      }
      const pages = doc.getPages();
      const total = pages.length;
      const allowed = new Set(o.range ? parsePageRanges(o.range, total) : pages.map((_, k) => k + 1));
      let drawn = 0;
      for (let p = 0; p < total; p++) {
        if (p % 10 === 0) { setProgress($('progress'), ((i + p / total) / items.length) * 100, `${file.name}: sayfa ${p + 1}/${total}`); await tick(); }
        if (!allowed.has(p + 1)) continue;
        const page = pages[p];
        const { width: W, height: H } = page.getSize();
        const rot = page.getRotation().angle;
        const sideways = rot % 180 !== 0;
        const vw = sideways ? H : W, vh = sideways ? W : H;
        if (o.type === 'text') {
          const w = font.widthOfTextAtSize(o.text, o.size);
          const h = font.heightAtSize(o.size, { descender: false }) * 0.75;
          for (const pl of placements(o, vw, vh, w, h)) {
            const org = originFor(pl.cx, pl.cy, w, h, o.angle);
            const pt = toPdf(rot, W, H, org.x, org.y);
            page.drawText(o.text, { x: pt.x, y: pt.y, size: o.size, font, color: rgb(color.r, color.g, color.b), opacity: o.opacity, rotate: degrees(rot + o.angle) });
          }
        } else {
          const w = vw * o.scale;
          const h = w * (image.height / image.width);
          for (const pl of placements(o, vw, vh, w, h)) {
            const org = originFor(pl.cx, pl.cy, w, h, o.angle);
            const pt = toPdf(rot, W, H, org.x, org.y);
            page.drawImage(image, { x: pt.x, y: pt.y, width: w, height: h, opacity: o.opacity, rotate: degrees(rot + o.angle) });
          }
        }
        drawn++;
      }
      if (!drawn) throw new Error('NONE');
      doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
      doc.setCreator('araclar.bilisimajans.com');
      const out = await doc.save();
      results.push({ name: `${baseName(file.name)}-filigranli.pdf`, blob: new Blob([out], { type: 'application/pdf' }), pages: total, drawn });
    }
    renderResult();
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    const msg = m === 'NOTEXT' ? 'Filigran metni boş. "GİZLİ", "TASLAK" gibi bir metin yazın ya da hazır düğmelerden birini seçin.'
      : m === 'NOLOGO' ? 'Logo seçilmedi. PNG ya da JPG bir görsel seçin veya "Metin" türüne geçin.'
      : m === 'NONE' ? 'Bu sayfa aralığında hiçbir sayfa bulunamadı. Aralığı düzeltin ya da boş bırakın.'
      : m === 'FONT' ? 'Yazı tipi yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      : /Geçersiz sayfa ifadesi/.test(m) ? `${m} Boş bırakırsanız tüm sayfalara uygulanır.`
      : /encrypted/i.test(m) ? 'Bu PDF şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.'
      : /PNG|JPEG|JPG|image/i.test(m) ? 'Logo görseli PDF\'e gömülemedi. Görseli PNG olarak yeniden kaydedip tekrar deneyin.'
      : friendlyError(err);
    showError($('error'), msg);
  } finally {
    btn.disabled = false;
  }
});

function renderResult() {
  const box = $('downloads');
  box.innerHTML = '';
  const totalDrawn = results.reduce((s, r) => s + r.drawn, 0);
  $('result-info').textContent = results.length === 1
    ? `${results[0].pages} sayfa · ${results[0].drawn} sayfaya filigran eklendi · ${formatBytes(results[0].blob.size)}`
    : `${results.length} dosya · toplam ${totalDrawn} sayfaya filigran eklendi`;
  results.forEach((r, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = results.length === 1 ? 'ba-btn ba-btn-success ba-btn-lg' : 'ba-btn ba-btn-success';
    b.dataset.download = String(i);
    b.textContent = results.length === 1 ? 'Filigranlı PDF\'i indir' : `${r.name} indir`;
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    box.appendChild(b);
  });
  if (results.length > 1) {
    const all = document.createElement('button');
    all.type = 'button'; all.className = 'ba-btn ba-btn-primary'; all.id = 'download-all';
    all.textContent = 'Tümünü indir';
    all.addEventListener('click', async () => { for (const r of results) { downloadBlob(r.blob, r.name); await new Promise((res) => setTimeout(res, 400)); } });
    box.appendChild(all);
  }
  $('result').classList.add('is-active');
}
