// Fotoğrafı hedef KB boyutuna küçültür: JPG kalitesi üzerinde ikili arama, gerekirse piksel ölçüsünü kademeli küçültme.
// Dosyalar hiçbir zaman sunucuya gitmez; tüm kod çözme ve kodlama tarayıcıda yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MIN_Q = 0.4;        // bunun altına inmeden önce ölçü küçültülür
const MAX_Q = 0.95;
const MIN_SIDE = 80;      // ölçü küçültmede en kısa kenar alt sınırı (piksel)
const INPUT_EXT = /\.(jpe?g|jfif|png|webp|gif|bmp|avif)$/i;
const HEIC_EXT = /\.(heic|heif|hif)$/i;

let items = [];
let seq = 0;
let fflate = null;

async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

createDropzone({ el: $('drop'), accept: 'image/*,.jpg,.jpeg,.png,.webp', multiple: true, onFiles: addFiles });

/* ---------- Hedef seçimi ---------- */
const quick = Array.from(document.querySelectorAll('.kb-quick button'));
function setTarget(kb) {
  $('opt-kb').value = String(kb);
  quick.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.kb) === kb)));
}
quick.forEach((b) => b.addEventListener('click', () => setTarget(Number(b.dataset.kb))));
$('opt-kb').addEventListener('input', () => setTarget(Number($('opt-kb').value)));

/* ---------- Dosya listesi ---------- */
function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const heic = files.filter((f) => HEIC_EXT.test(f.name) || /^image\/hei[cf]$/i.test(f.type));
  const ok = files.filter((f) => !heic.includes(f) && (/^image\//i.test(f.type) || INPUT_EXT.test(f.name)));
  const other = files.length - ok.length - heic.length;
  const msgs = [];
  if (heic.length) msgs.push(`${heic.length} HEIC dosyası atlandı: tarayıcılar bu Apple biçimini açamıyor. iPhone’da Ayarlar > Kamera > Formatlar > “En Uyumlu” seçerseniz fotoğraflar JPG çekilir.`);
  if (other > 0) msgs.push(`${other} dosya resim değil ve atlandı. Lütfen JPG, PNG veya WebP fotoğraf seçin; PDF’i küçültmek için “PDF Küçült” aracını kullanın.`);
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

/* ---------- Kod çözme ve kodlama ---------- */
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

const toJpeg = (canvas, q) => new Promise((resolve, reject) => {
  canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/jpeg', q);
});

function drawScaled(src, w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); // JPG saydamlık taşımaz
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(src, 0, 0, w, h);
  return c;
}

/**
 * Hedef bayt sınırının altındaki en yüksek kaliteli JPG'yi bulur.
 * Önce kalite üzerinde ikili arama; MIN_Q'da bile büyükse ölçüyü küçültüp tekrar dener.
 * Dönüş: { blob, w, h, quality } veya null (ölçü küçültme kapalı/yetersizse).
 */
async function fitToSize(src, w0, h0, targetBytes, allowScale, onStep) {
  let scale = 1;
  for (let round = 0; round < 14; round++) {
    const w = Math.max(1, Math.round(w0 * scale));
    const h = Math.max(1, Math.round(h0 * scale));
    if (Math.min(w, h) < MIN_SIDE && round > 0) return null;
    const canvas = drawScaled(src, w, h);
    const atMin = await toJpeg(canvas, MIN_Q);
    if (atMin.size > targetBytes) {
      canvas.width = canvas.height = 1;
      if (!allowScale) return null;
      // Boyut ~ piksel sayısıyla orantılı: kenarı kabaca karekökle küçült, biraz pay bırak.
      const ratio = Math.sqrt(targetBytes / atMin.size) * 0.95;
      scale *= Math.max(0.5, Math.min(0.92, ratio));
      onStep && onStep();
      await tick();
      continue;
    }
    // MIN_Q hedefin altında: MAX_Q'ya doğru en yüksek uygun kaliteyi ara.
    let lo = MIN_Q, hi = MAX_Q, best = { blob: atMin, quality: MIN_Q };
    const atMax = await toJpeg(canvas, MAX_Q);
    if (atMax.size <= targetBytes) {
      best = { blob: atMax, quality: MAX_Q };
    } else {
      for (let k = 0; k < 7; k++) {
        const mid = (lo + hi) / 2;
        const b = await toJpeg(canvas, mid);
        if (b.size <= targetBytes) { best = { blob: b, quality: mid }; lo = mid; } else { hi = mid; }
      }
    }
    canvas.width = canvas.height = 1;
    return { blob: best.blob, w, h, quality: best.quality };
  }
  return null;
}

/* ---------- Küçült ---------- */
$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const kb = Number($('opt-kb').value);
  if (!Number.isFinite(kb) || kb < 5) {
    showError($('error'), 'Lütfen hedef boyut için en az 5 KB olan geçerli bir sayı girin (ör. 50) ya da hızlı düğmelerden birini seçin.');
    return;
  }
  const allowScale = $('opt-scale').checked;
  const targetBytes = Math.floor(kb * 1024);
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const failed = [];
  const unreachable = [];
  let done = 0, totalOut = 0;
  try {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${it.file.name}`);
      await tick();
      try {
        const { src, w, h } = await loadImage(it.file);
        if (!w || !h) throw new Error('Unable to decode image');
        const res = await fitToSize(src, w, h, targetBytes, allowScale, () => setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ölçü küçültülüyor…`));
        src.close && src.close();
        if (!res) {
          unreachable.push(it.file.name);
          if (li) li.querySelector('.meta').textContent = `${kb} KB hedefine ulaşılamadı`;
          continue;
        }
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        it.outBlob = res.blob;
        it.outUrl = URL.createObjectURL(res.blob);
        it.outName = `${baseName(it.file.name)}-${kb}kb.jpg`;
        done++; totalOut += res.blob.size;
        if (li) {
          li.querySelector('.thumb').src = it.outUrl;
          li.querySelector('.meta').textContent = `${formatBytes(it.file.size)} → ${formatBytes(res.blob.size)} · ${w}×${h}${res.w !== w ? ` → ${res.w}×${res.h}` : ''} · kalite %${Math.round(res.quality * 100)}`;
          li.querySelector('button[data-act="download"]').hidden = false;
        }
      } catch (err) {
        console.error(err);
        failed.push(it.file.name);
        if (li) li.querySelector('.meta').textContent = 'işlenemedi';
      }
    }
    setProgress($('progress'), null);
    if (done) {
      $('result-info').textContent = `${done} fotoğraf · her biri en fazla ${kb} KB · toplam ${formatBytes(totalOut)}`;
      $('download-zip').hidden = done < 2;
      $('download-all').hidden = done < 2;
      $('result').hidden = false;
      $('result').classList.add('is-active');
    }
    const msgs = [];
    if (unreachable.length) {
      msgs.push(`${unreachable.length} fotoğraf ${kb} KB’a düşürülemedi (${unreachable.slice(0, 3).join(', ')}${unreachable.length > 3 ? '…' : ''}). ${allowScale ? 'Hedefi biraz yükseltin ya da fotoğrafı önce kırpıp gereksiz alanları çıkarın.' : '“Kalite yetmezse piksel ölçüsünü de küçült” kutusunu işaretleyin ya da hedefi yükseltin.'}`);
    }
    if (failed.length) {
      msgs.push(`${failed.length} dosya işlenemedi (${failed.slice(0, 3).join(', ')}${failed.length > 3 ? '…' : ''}). Dosya bozuk ya da resim değil olabilir; kaynağından yeniden alıp deneyin.`);
    }
    if (msgs.length) showError($('error'), msgs.join(' '));
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
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), `fotograflar-${$('opt-kb').value}kb.zip`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Zip oluşturulamadı; tarayıcı belleği yetmemiş olabilir. “Tek tek indir” düğmesini kullanın ya da daha az dosyayla deneyin.');
  } finally {
    btn.disabled = false;
  }
});
