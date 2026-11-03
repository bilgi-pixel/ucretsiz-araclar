import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, makeSortable, moveItem, getPdfLib, tick } from '../../assets/js/ba.js';

/** İngilizce hata mesajları (ba.js'teki ortak mesajlar Türkçe). */
function friendlyError(err) {
  const m = String((err && err.message) || err);
  if (/encrypted|password/i.test(m)) return 'This PDF looks password-protected. Remove the password first, then try again.';
  if (/Failed to parse|Invalid PDF|No PDF header|Unexpected|corrupt|XRef|Expected/i.test(m)) return 'This file is damaged or is not a valid file of this type. Check that you can open it, then select it again.';
  if (/Unsupported|not supported|Unable to decode|decode/i.test(m)) return 'This file format is not supported. Please choose a JPG, PNG or WebP image.';
  if (/memory|allocation/i.test(m)) return 'The file is too large for your browser memory. Try smaller parts.';
  return 'Something went wrong. Reload the page and try again.';
}

const $ = (id) => document.getElementById(id);
const list = $('files');
let items = []; // { file, url }
let resultBlob = null;
let resultName = 'document.pdf';

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp', multiple: true, onFiles: addFiles });
makeSortable(list, syncOrder);

function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name));
  if (ok.length !== files.length) showError($('error'), 'Only JPG, PNG and WebP images can be added; the others were skipped.');
  for (const file of ok) {
    const url = URL.createObjectURL(file);
    items.push({ file, url });
    const li = document.createElement('li');
    li.dataset.url = url;
    li.innerHTML = `<span class="ba-handle" aria-hidden="true">⠿</span><img class="thumb" alt="" src="${url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="up" aria-label="Move up">↑</button>
      <button class="ba-icon-btn" type="button" data-act="down" aria-label="Move down">↓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Remove">✕</button>`;
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
  if (btn.dataset.act === 'remove') { li.remove(); }
  else moveItem(li, btn.dataset.act === 'up' ? -1 : 1);
  syncOrder();
});

function syncOrder() {
  const order = Array.from(list.children).map((li) => li.dataset.url);
  items = order.map((u) => items.find((it) => it.url === u)).filter(Boolean);
  refresh();
}

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  // 50 MB üstü toplam boyutta uyarı
  const total = items.reduce((n, it) => n + it.file.size, 0);
  $('warning').textContent = `These images add up to ${formatBytes(total)}. Over 50 MB the conversion can be slow and a phone browser may run out of memory; use a computer or convert in smaller batches.`;
  $('warning').classList.toggle('is-active', total >= 50 * 1024 * 1024);
}

$('clear').addEventListener('click', () => {
  items.forEach((it) => URL.revokeObjectURL(it.url));
  items = []; list.innerHTML = ''; resultBlob = null;
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

async function loadImage(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file); } catch { /* aşağıdaki yola düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unable to decode image'));
    img.src = URL.createObjectURL(file);
  });
}

/** Resmi canvas üzerinden JPG/PNG byte dizisine çevirir; EXIF yönü tarayıcı tarafından uygulanır. */
async function encode(file, quality) {
  const isPng = file.type === 'image/png' || /\.png$/i.test(file.name);
  const img = await loadImage(file);
  const w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
  if (!w || !h) throw new Error('Unable to decode image');
  // Orijinal JPG'yi yeniden kodlamadan eklemek kaliteyi korur; yalnızca JPG ve "Yüksek" seçiliyse.
  if (!isPng && (file.type === 'image/jpeg') && quality >= 0.9) {
    return { bytes: new Uint8Array(await file.arrayBuffer()), type: 'jpg', w, h };
  }
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!isPng) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
  ctx.drawImage(img, 0, 0);
  img.close && img.close();
  const blob = await new Promise((r) => canvas.toBlob(r, isPng ? 'image/png' : 'image/jpeg', quality));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), type: isPng ? 'png' : 'jpg', w, h };
}

$('convert').addEventListener('click', async () => {
  if (!items.length) return;
  const btn = $('convert');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const size = $('opt-size').value;
  const margin = Number($('opt-margin').value);
  const quality = Number($('opt-quality').value);
  try {
    const PDFLib = await getPdfLib();
    const doc = await PDFLib.PDFDocument.create();
    doc.setProducer('Bilişim Ajans Free Tools');
    doc.setCreator('araclar.bilisimajans.com');
    const A4 = [595.28, 841.89];
    for (let i = 0; i < items.length; i++) {
      setProgress($('progress'), (i / items.length) * 100, `${i + 1}/${items.length}: ${items[i].file.name}`);
      await tick();
      const { bytes, type, w, h } = await encode(items[i].file, quality);
      const image = type === 'png' ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
      let pw, ph;
      if (size === 'fit') { pw = w + margin * 2; ph = h + margin * 2; }
      else if (size === 'a4l') { [ph, pw] = A4; }
      else { [pw, ph] = A4; }
      const page = doc.addPage([pw, ph]);
      const maxW = pw - margin * 2, maxH = ph - margin * 2;
      const scale = Math.min(maxW / w, maxH / h);
      const dw = w * scale, dh = h * scale;
      page.drawImage(image, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh });
    }
    setProgress($('progress'), 100, 'Writing PDF…');
    await tick();
    const pdfBytes = await doc.save();
    resultBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    resultName = `${baseName(items[0].file.name)}.pdf`;
    $('result-info').textContent = `${items.length} ${items.length === 1 ? 'page' : 'pages'} · ${formatBytes(resultBlob.size)} · ${resultName}`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (resultBlob) downloadBlob(resultBlob, resultName); });
