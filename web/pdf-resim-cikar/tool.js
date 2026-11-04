// PDF'ten Resim Çıkar — PDF içine gömülü resimleri pdf.js ile bulur; tamamı tarayıcıda çalışır, dosya sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG = 50 * 1024 * 1024; // 50 MB üstü için uyarı
let file = null;
let pdf = null;
let pdfjs = null;
let results = []; // { blob, name, w, h, page }
const thumbUrls = [];

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => openFile(f) });

async function openFile(f) {
  reset();
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) { showError($('error'), 'Lütfen bir PDF dosyası seçin. Resim dosyalarını bu araçla açamazsınız.'); return; }
  $('warn').hidden = f.size <= BIG;
  file = f;
  try {
    pdfjs = await getPdfJs();
    pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
  } catch (err) {
    file = null; pdf = null;
    showError($('error'), /PasswordException|password/i.test(String(err && (err.name + err.message))) ? 'Dosya şifreli görünüyor; önce şifreyi kaldırın (PDF Şifre Kaldır aracı) ve yeniden deneyin.' : friendlyError(err));
    return;
  }
  $('files').innerHTML = '<li><span class="name"></span><span class="meta"></span></li>';
  $('files').querySelector('.name').textContent = f.name;
  $('files').querySelector('.meta').textContent = `${pdf.numPages} sayfa · ${formatBytes(f.size)}`;
  $('options').hidden = false;
  $('actions').hidden = false;
}

function reset() {
  file = null; pdf = null; results = [];
  for (const u of thumbUrls.splice(0)) URL.revokeObjectURL(u);
  $('files').innerHTML = ''; $('gallery').innerHTML = ''; $('downloads').innerHTML = '';
  $('options').hidden = true; $('actions').hidden = true; $('warn').hidden = true;
  $('result').hidden = true; $('result').classList.remove('is-active');
  setProgress($('progress'), null);
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

/** Sayfa nesnelerinden (page.objs / commonObjs) adı verilen resim verisini bekleyerek alır. */
function getObj(page, name) {
  const store = name.startsWith('g_') ? page.commonObjs : page.objs;
  return new Promise((resolve) => {
    let done = false;
    const t = setTimeout(() => { if (!done) { done = true; resolve(null); } }, 8000);
    try { store.get(name, (o) => { if (!done) { done = true; clearTimeout(t); resolve(o); } }); }
    catch { if (!done) { done = true; clearTimeout(t); resolve(null); } }
  });
}

/** pdf.js resim nesnesini (bitmap ya da ham piksel) canvas'a çizer. */
function objToCanvas(o, format) {
  const w = o.width, h = o.height;
  if (!w || !h) return null;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (format === 'jpg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
  if (o.bitmap) { ctx.drawImage(o.bitmap, 0, 0); return canvas; }
  if (!o.data) return null;
  const rgba = new Uint8ClampedArray(w * h * 4);
  const src = o.data;
  const kind = o.kind || (src.length === w * h * 4 ? 3 : src.length === w * h * 3 ? 2 : 1);
  if (kind === 3) rgba.set(src.subarray ? src.subarray(0, rgba.length) : src);
  else if (kind === 2) { for (let i = 0, j = 0; i < w * h; i++, j += 3) { rgba[i * 4] = src[j]; rgba[i * 4 + 1] = src[j + 1]; rgba[i * 4 + 2] = src[j + 2]; rgba[i * 4 + 3] = 255; } }
  else {
    // 1 bit/piksel gri (satır başına bayt hizalı)
    const rowBytes = (w + 7) >> 3;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const v = (src[y * rowBytes + (x >> 3)] >> (7 - (x & 7))) & 1 ? 255 : 0;
      const k = (y * w + x) * 4; rgba[k] = rgba[k + 1] = rgba[k + 2] = v; rgba[k + 3] = 255;
    }
  }
  ctx.putImageData(new ImageData(rgba, w, h), 0, 0);
  if (format === 'jpg') { // şeffaflığı beyaz zemine oturt
    const flat = document.createElement('canvas'); flat.width = w; flat.height = h;
    const c2 = flat.getContext('2d'); c2.fillStyle = '#fff'; c2.fillRect(0, 0, w, h); c2.drawImage(canvas, 0, 0);
    return flat;
  }
  return canvas;
}

$('run').addEventListener('click', async () => {
  if (!pdf) return;
  const btn = $('run');
  btn.disabled = true;
  results = []; $('gallery').innerHTML = ''; $('downloads').innerHTML = '';
  for (const u of thumbUrls.splice(0)) URL.revokeObjectURL(u);
  $('result').classList.remove('is-active');
  showError($('error'), null);
  const format = $('opt-format').value; // png | jpg
  const minSize = Number($('opt-min').value);
  const base = baseName(file.name);
  const OPS = pdfjs.OPS;
  let skipped = 0;
  try {
    for (let p = 1; p <= pdf.numPages; p++) {
      setProgress($('progress'), ((p - 1) / pdf.numPages) * 100, `Sayfa ${p}/${pdf.numPages} taranıyor`);
      await tick();
      const page = await pdf.getPage(p);
      const ops = await page.getOperatorList();
      const seen = new Set();
      let idx = 0;
      for (let i = 0; i < ops.fnArray.length; i++) {
        const fn = ops.fnArray[i];
        if (fn !== OPS.paintImageXObject && fn !== OPS.paintInlineImageXObject && fn !== OPS.paintJpegXObject) continue;
        let obj = null;
        if (fn === OPS.paintInlineImageXObject) obj = ops.argsArray[i][0];
        else {
          const name = ops.argsArray[i][0];
          if (typeof name !== 'string' || seen.has(name)) continue;
          seen.add(name);
          obj = await getObj(page, name);
        }
        if (!obj) continue;
        if (Math.min(obj.width || 0, obj.height || 0) < minSize) { skipped++; continue; }
        const canvas = objToCanvas(obj, format);
        if (!canvas) continue;
        const blob = await new Promise((r) => canvas.toBlob(r, format === 'png' ? 'image/png' : 'image/jpeg', 0.92));
        idx++;
        if (blob) results.push({ blob, name: `${base}-sayfa-${p}-resim-${idx}.${format}`, w: canvas.width, h: canvas.height, page: p });
        canvas.width = canvas.height = 0;
      }
      page.cleanup();
    }
    setProgress($('progress'), null);
    if (!results.length) {
      showError($('error'), skipped
        ? `Seçtiğiniz en küçük boyut (${minSize} piksel) altında kalan ${skipped} resim atlandı. "Küçük resimleri de al" seçeneğini deneyin.`
        : 'Bu PDF\'te gömülü resim bulunamadı. Sayfalar metin ya da vektör çizim olabilir; sayfaların görüntüsünü almak için PDF\'den Resme aracını kullanın.');
      return;
    }
    renderResults(skipped);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

function renderResults(skipped) {
  const total = results.reduce((s, r) => s + r.blob.size, 0);
  $('result-info').textContent = `${results.length} resim bulundu · toplam ${formatBytes(total)}${skipped ? ` · ${skipped} küçük resim atlandı` : ''}`;
  const gal = $('gallery');
  results.forEach((r, i) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const url = URL.createObjectURL(r.blob); thumbUrls.push(url);
    img.src = url; img.alt = `Sayfa ${r.page} resmi, ${r.w}x${r.h} piksel`; img.loading = 'lazy';
    const cap = document.createElement('span'); cap.textContent = `Sayfa ${r.page} · ${r.w}×${r.h} · ${formatBytes(r.blob.size)}`;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ba-btn'; b.textContent = 'İndir'; b.dataset.download = String(i);
    b.setAttribute('aria-label', `${r.name} dosyasını indir`);
    b.addEventListener('click', () => downloadBlob(r.blob, r.name));
    li.append(img, cap, b);
    gal.append(li);
  });
  const box = $('downloads');
  if (results.length > 1) {
    const z = document.createElement('button');
    z.type = 'button'; z.id = 'zip-btn'; z.className = 'ba-btn ba-btn-success ba-btn-lg'; z.textContent = 'Hepsini ZIP olarak indir';
    z.addEventListener('click', async () => {
      z.disabled = true;
      try {
        const fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
        const files = {};
        for (const r of results) files[r.name] = new Uint8Array(await r.blob.arrayBuffer());
        const zipped = fflate.zipSync(files, { level: 0 }); // resimler zaten sıkışık
        downloadBlob(new Blob([zipped], { type: 'application/zip' }), `${baseName(file.name)}-resimler.zip`);
      } catch (err) { showError($('error'), friendlyError(err)); }
      finally { z.disabled = false; }
    });
    box.append(z);
  } else {
    const one = document.createElement('button');
    one.type = 'button'; one.id = 'single-btn'; one.className = 'ba-btn ba-btn-success ba-btn-lg'; one.textContent = 'Resmi indir';
    one.addEventListener('click', () => downloadBlob(results[0].blob, results[0].name));
    box.append(one);
  }
  $('result').hidden = false;
  $('result').classList.add('is-active');
}
