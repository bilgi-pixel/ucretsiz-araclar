// WebP → JPG dönüştürücü. Canvas ile kodlar; toplu indirme için fflate (MIT).
// Dosyalar hiçbir zaman sunucuya gitmez; tüm kod çözme ve kodlama tarayıcıda yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const INPUT_EXT = /\.(webp|png|gif|bmp|avif|jpe?g|jfif)$/i;
const HEIC_EXT = /\.(heic|heif|hif)$/i;

let items = []; // { id, file, url, outBlob, outName }
let seq = 0;
let fflate = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

createDropzone({
  el: $('drop'),
  accept: 'image/webp,.webp,image/*',
  multiple: true,
  onFiles: addFiles,
});

function extLabel(name, type) {
  const m = name.match(/\.([a-z0-9]+)$/i);
  if (m) return m[1].toUpperCase().replace('JPEG', 'JPG');
  return (type.split('/')[1] || 'resim').toUpperCase();
}

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const heic = files.filter((f) => HEIC_EXT.test(f.name) || /^image\/hei[cf]$/i.test(f.type));
  const ok = files.filter((f) => !heic.includes(f) && (/^image\//i.test(f.type) || INPUT_EXT.test(f.name)));
  const other = files.length - ok.length - heic.length;
  const msgs = [];
  if (heic.length) msgs.push(`${heic.length} HEIC dosyası atlandı: tarayıcılar bu Apple biçimini açamıyor. iPhone’da Ayarlar > Kamera > Formatlar > “En Uyumlu” seçerseniz fotoğraflar JPG çekilir.`);
  if (other > 0) msgs.push(`${other} dosya resim değil ve atlandı. Bu sayfa WebP (ayrıca PNG, GIF, BMP, AVIF) resimleri açar; lütfen resim dosyası seçin.`);
  if (ok.some((f) => f.size > BIG_FILE)) msgs.push('50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız dosyaları tek tek deneyin.');
  if (msgs.length) showError($('error'), msgs.join(' '));
  for (const file of ok) {
    const id = String(++seq);
    const url = URL.createObjectURL(file);
    items.push({ id, file, url, outBlob: null, outUrl: null, outName: null });
    const li = document.createElement('li');
    li.dataset.id = id;
    li.innerHTML = `<img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="download" aria-label="Bu dosyayı indir" hidden>⤓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${extLabel(file.name, file.type)} · ${formatBytes(file.size)}`;
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

$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `${Math.round($('opt-quality').value * 100)}%`; });
$('opt-bg').addEventListener('input', () => { $('opt-bg-code').textContent = $('opt-bg').value; });

/** Dosyayı çözer (EXIF yönü uygulanır); açılamazsa hata fırlatır. */
async function loadImage(file) {
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      if (bmp.width && bmp.height) return { src: bmp, w: bmp.width, h: bmp.height };
      bmp.close && bmp.close();
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

function toBlob(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', quality);
  });
}

async function convertOne(file, quality, bg) {
  const { src, w, h } = await loadImage(file);
  if (!w || !h) throw new Error('Unable to decode image');
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); // JPG saydamlık taşımaz
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, 0, 0, w, h);
  src.close && src.close();
  const blob = await toBlob(canvas, quality);
  canvas.width = canvas.height = 1;
  return { blob, w, h };
}

$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const quality = Number($('opt-quality').value) || 0.9;
  const bg = $('opt-bg').value || '#ffffff';
  const failed = [];
  let totalIn = 0, totalOut = 0, done = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const { blob, w, h } = await convertOne(it.file, quality, bg);
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        it.outBlob = blob;
        it.outUrl = URL.createObjectURL(blob);
        it.outName = `${baseName(it.file.name)}.jpg`;
        totalIn += it.file.size; totalOut += blob.size; done++;
        if (li) {
          li.querySelector('.thumb').src = it.outUrl;
          li.querySelector('.meta').textContent = `${extLabel(it.file.name, it.file.type)} ${formatBytes(it.file.size)} → JPG ${formatBytes(blob.size)} · ${w}×${h}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push(it.file.name);
        it.outBlob = null;
        if (li) li.querySelector('.meta').textContent = 'dönüştürülemedi';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} dosya · ${formatBytes(totalIn)} → ${formatBytes(totalOut)} · JPG, kalite %${Math.round(quality * 100)}`;
      $('download-zip').hidden = done < 2;
      $('result').hidden = false;
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      showError($('error'), `${failed.length} dosya dönüştürülemedi (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). Dosyanın bozuk olmadığını ve gerçekten bir WebP/resim olduğunu kontrol edin; uzantısı yanlış ya da yarım inmiş dosyalar açılamaz. Dosyayı kaynağından yeniden indirip deneyin.`);
    }
  } finally {
    btn.disabled = false;
  }
});

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
    const first = baseName(ready[0].file.name).replace(/[\\/:*?"<>|]+/g, '-') || 'resimler';
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), `${first}-jpg.zip`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Zip oluşturulamadı; tarayıcı belleği yetmemiş olabilir. “Tek tek indir” düğmesini kullanın ya da daha az dosyayla deneyin.');
  } finally {
    btn.disabled = false;
  }
});
