// PDF Kırp — pdf.js önizleme + sürüklenebilir kırpma kutusu, pdf-lib setCropBox.
// MediaBox değiştirilmez ve içerik silinmez: yalnızca görünüm kutusu (CropBox) daraltılır.
// Tüm işlem tarayıcıda yapılır; dosya hiçbir sunucuya gönderilmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, friendlyError, baseName, getPdfLib, getPdfJs, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const MM = 72 / 25.4; // 1 mm = 2.8346 pt
const MIN_SIZE = 20; // kırpma alanının en küçük kenarı (pt)
const SIDES = ['top', 'right', 'bottom', 'left'];

let file = null;
let bytes = null;
let pageCount = 0;
let current = 1; // düzenleyicide gösterilen sayfa (1 tabanlı)
let pdfDoc = null; // pdf.js belgesi
let view = { w: 0, h: 0, scale: 1 }; // görsel sayfa ölçüsü (pt) ve canvas px/pt oranı
let margins = { top: 0, right: 0, bottom: 0, left: 0 }; // görsel sayfanın kenarlarından içeri boşluk (pt)
let result = null;
let renderToken = 0;

createDropzone({ el: $('drop'), accept: 'application/pdf,.pdf', multiple: false, onFiles: ([f]) => loadFile(f) });

async function loadFile(f) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active');
  if (!(f.type === 'application/pdf' || /\.pdf$/i.test(f.name))) {
    showError($('error'), `"${f.name}" bir PDF değil. Yalnızca .pdf dosyaları desteklenir; resim kırpmak için Resim Boyutlandır aracını kullanın.`);
    return;
  }
  let data, count;
  try {
    data = await f.arrayBuffer();
    const PDFLib = await getPdfLib();
    const doc = await PDFLib.PDFDocument.load(data, { ignoreEncryption: false, updateMetadata: false });
    count = doc.getPageCount();
    if (!count) throw new Error('no pages');
  } catch (err) {
    showError($('error'), /encrypted/i.test(String(err))
      ? `"${f.name}" şifreli görünüyor. Önce PDF şifresini kaldırıp tekrar deneyin.`
      : `"${f.name}" bozuk ya da geçerli bir PDF değil. Dosyayı açabildiğinizi kontrol edip yeniden seçin.`);
    return;
  }
  if (f.size >= BIG_FILE) {
    $('warning').textContent = `"${f.name}" ${formatBytes(f.size)}; 50 MB üstü dosyalarda işlem uzun sürebilir ve telefonda bellek yetmeyebilir. Mümkünse bilgisayarda deneyin.`;
    $('warning').classList.add('is-active');
  }
  file = f; bytes = data; pageCount = count; current = 1; result = null;
  margins = { top: 0, right: 0, bottom: 0, left: 0 };
  $('files').innerHTML = '';
  const li = document.createElement('li');
  li.innerHTML = `<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
  li.querySelector('.name').textContent = f.name;
  li.querySelector('.meta').textContent = `${count} sayfa · ${formatBytes(f.size)}`;
  $('files').appendChild(li);
  try {
    const pdfjs = await getPdfJs();
    if (pdfDoc) pdfDoc.destroy();
    pdfDoc = await pdfjs.getDocument({ data: data.slice(0) }).promise;
  } catch (err) {
    showError($('error'), friendlyError(err));
    return;
  }
  $('editor').hidden = false;
  $('options').hidden = false;
  $('actions').hidden = false;
  await showPage();
}

$('files').addEventListener('click', (e) => {
  if (e.target.closest('button[data-act="remove"]')) reset();
});

function reset() {
  file = null; bytes = null; result = null; pageCount = 0;
  if (pdfDoc) { pdfDoc.destroy(); pdfDoc = null; }
  $('files').innerHTML = '';
  $('editor').hidden = true; $('options').hidden = true; $('actions').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').classList.remove('is-active');
  showError($('error'), null);
}
$('clear').addEventListener('click', reset);

// ---- Sayfa çizimi ----
async function showPage() {
  const token = ++renderToken;
  const page = await pdfDoc.getPage(current);
  const base = page.getViewport({ scale: 1 });
  const maxW = Math.min(640, Math.max(240, $('stage').parentElement.clientWidth - 8 || 640));
  const scale = Math.min(1.6, maxW / base.width);
  const vp = page.getViewport({ scale });
  if (token !== renderToken) return;
  const canvas = $('canvas');
  canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  page.cleanup();
  view = { w: base.width, h: base.height, scale: canvas.width / base.width };
  $('page-label').textContent = `Sayfa ${current} / ${pageCount}`;
  $('prev').disabled = current <= 1;
  $('next').disabled = current >= pageCount;
  clampMargins();
  layout();
}

$('prev').addEventListener('click', () => { if (current > 1) { current--; showPage(); } });
$('next').addEventListener('click', () => { if (current < pageCount) { current++; showPage(); } });
window.addEventListener('resize', () => { if (pdfDoc && !$('editor').hidden) layout(); });

/** Kırpma kutusunun görsel sayfanın içinde ve en az MIN_SIZE kalmasını sağlar. */
function clampMargins() {
  const m = margins;
  for (const s of SIDES) m[s] = Math.max(0, m[s]);
  if (m.left + m.right > view.w - MIN_SIZE) { const k = (view.w - MIN_SIZE) / (m.left + m.right); m.left *= k; m.right *= k; }
  if (m.top + m.bottom > view.h - MIN_SIZE) { const k = (view.h - MIN_SIZE) / (m.top + m.bottom); m.top *= k; m.bottom *= k; }
}

/** Kutuyu, kenar tutamaçlarını ve mm alanlarını güncel marjinlere göre yerleştirir. */
function layout() {
  const canvas = $('canvas');
  const cssScale = canvas.clientWidth / view.w; // CSS px / pt (canvas küçülmüş olabilir)
  const stage = $('stage');
  stage.style.width = `${canvas.clientWidth}px`;
  stage.style.height = `${canvas.clientHeight}px`;
  const box = $('crop');
  box.style.left = `${margins.left * cssScale}px`;
  box.style.top = `${margins.top * cssScale}px`;
  box.style.right = `${margins.right * cssScale}px`;
  box.style.bottom = `${margins.bottom * cssScale}px`;
  for (const s of SIDES) {
    const input = $(`mm-${s}`);
    if (document.activeElement !== input) input.value = (margins[s] / MM).toFixed(1);
  }
  const w = (view.w - margins.left - margins.right) / MM;
  const h = (view.h - margins.top - margins.bottom) / MM;
  $('crop-size').textContent = `Kırpma alanı: ${w.toFixed(1)} × ${h.toFixed(1)} mm (sayfa ${(view.w / MM).toFixed(0)} × ${(view.h / MM).toFixed(0)} mm)`;
}

// ---- Fare/dokunmatik sürükleme ----
let drag = null;
$('crop').addEventListener('pointerdown', (e) => {
  const handle = e.target.closest('[data-edge]');
  const edge = handle ? handle.dataset.edge : 'move';
  const canvas = $('canvas');
  drag = { edge, x: e.clientX, y: e.clientY, start: { ...margins }, cssScale: canvas.clientWidth / view.w };
  $('crop').setPointerCapture(e.pointerId);
  e.preventDefault();
});
$('crop').addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = (e.clientX - drag.x) / drag.cssScale;
  const dy = (e.clientY - drag.y) / drag.cssScale;
  const s = drag.start;
  const edge = drag.edge;
  const m = { ...s };
  if (edge === 'move') {
    // Kutuyu boyutunu koruyarak taşı
    const mx = Math.min(Math.max(-s.left, dx), s.right);
    const my = Math.min(Math.max(-s.top, dy), s.bottom);
    m.left = s.left + mx; m.right = s.right - mx;
    m.top = s.top + my; m.bottom = s.bottom - my;
  } else {
    const parts = edge.split('-');
    if (parts.includes('left')) m.left = Math.min(Math.max(0, s.left + dx), view.w - s.right - MIN_SIZE);
    if (parts.includes('right')) m.right = Math.min(Math.max(0, s.right - dx), view.w - s.left - MIN_SIZE);
    if (parts.includes('top')) m.top = Math.min(Math.max(0, s.top + dy), view.h - s.bottom - MIN_SIZE);
    if (parts.includes('bottom')) m.bottom = Math.min(Math.max(0, s.bottom - dy), view.h - s.top - MIN_SIZE);
  }
  margins = m;
  layout();
});
const endDrag = () => { drag = null; };
$('crop').addEventListener('pointerup', endDrag);
$('crop').addEventListener('pointercancel', endDrag);

// ---- Klavye: kenar tutamacına odaklanıp ok tuşları (1 mm; Shift ile 5 mm) ----
// Ok yönü kenarın hareket yönüdür: sol kenarda ► kutuyu daraltır, ◄ genişletir.
$('crop').addEventListener('keydown', (e) => {
  const handle = e.target.closest('[data-edge]');
  if (!handle || !handle.dataset.edge.match(/^(top|right|bottom|left)$/)) return;
  const step = (e.shiftKey ? 5 : 1) * MM;
  const edge = handle.dataset.edge;
  const dirs = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const d = dirs[e.key];
  if (!d) return;
  e.preventDefault();
  const move = edge === 'left' || edge === 'right' ? d[0] : d[1];
  if (!move) return;
  // top/left kenarında artı yön içeri girer; right/bottom kenarında artı yön dışarı çıkar.
  const inward = edge === 'top' || edge === 'left' ? move : -move;
  margins[edge] += inward * step;
  clampMargins();
  layout();
});

// ---- mm girişleri ----
for (const s of SIDES) {
  $(`mm-${s}`).addEventListener('input', () => {
    const v = Number($(`mm-${s}`).value.replace(',', '.'));
    if (!Number.isFinite(v)) return;
    margins[s] = Math.max(0, v) * MM;
    clampMargins();
    layout();
  });
  $(`mm-${s}`).addEventListener('blur', layout);
}
$('mm-reset').addEventListener('click', () => { margins = { top: 0, right: 0, bottom: 0, left: 0 }; layout(); });

// ---- Kırpma: görsel marjinleri sayfanın CropBox'ına çevirir ----
/**
 * Görsel (döndürülmüş) sayfadaki sol-üst başlangıçlı marjinleri, dönmemiş PDF koordinatlarında
 * yeni CropBox'a çevirir. Taban kutu mevcut CropBox'tır (yoksa MediaBox).
 */
function toCropBox(base, rotation, m, vw, vh) {
  const { x: bx, y: by, width: bw, height: bh } = base;
  const map = (vx, vy) => {
    switch (((rotation % 360) + 360) % 360) {
      case 90: return { x: bx + vy, y: by + vx };
      case 180: return { x: bx + bw - vx, y: by + vy };
      case 270: return { x: bx + bw - vy, y: by + bh - vx };
      default: return { x: bx + vx, y: by + bh - vy };
    }
  };
  const a = map(m.left, m.top);
  const b = map(vw - m.right, vh - m.bottom);
  const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
  return { x, y, width: Math.abs(b.x - a.x), height: Math.abs(b.y - a.y) };
}

$('run').addEventListener('click', async () => {
  if (!bytes) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  try {
    if (Object.values(margins).every((v) => v < 0.5)) throw new Error('NOCROP');
    const scope = document.querySelector('input[name="scope"]:checked').value; // all | one
    const PDFLib = await getPdfLib();
    setProgress($('progress'), 5, 'PDF okunuyor…');
    await tick();
    const doc = await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: false });
    const pages = doc.getPages();
    const targets = scope === 'one' ? [current - 1] : pages.map((_, i) => i);
    let done = 0;
    for (const idx of targets) {
      const page = pages[idx];
      const rot = page.getRotation().angle;
      const base = page.getCropBox(); // CropBox yoksa MediaBox döner
      const sideways = rot % 180 !== 0;
      const vw = sideways ? base.height : base.width;
      const vh = sideways ? base.width : base.height;
      // Aynı mm değeri her sayfaya uygulanır; sayfa küçükse marjinleri sığacak şekilde ölçekle.
      const m = { ...margins };
      if (m.left + m.right > vw - MIN_SIZE) { const k = (vw - MIN_SIZE) / (m.left + m.right); m.left *= k; m.right *= k; }
      if (m.top + m.bottom > vh - MIN_SIZE) { const k = (vh - MIN_SIZE) / (m.top + m.bottom); m.top *= k; m.bottom *= k; }
      const box = toCropBox(base, rot, m, vw, vh);
      page.setCropBox(box.x, box.y, box.width, box.height); // MediaBox'a dokunulmaz
      done++;
      if (done % 25 === 0) { setProgress($('progress'), 5 + (done / targets.length) * 90, `Sayfa ${done}/${targets.length}`); await tick(); }
    }
    doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    doc.setCreator('araclar.bilisimajans.com');
    const out = await doc.save();
    result = { name: `${baseName(file.name)}-kirpilmis.pdf`, blob: new Blob([out], { type: 'application/pdf' }), cropped: targets.length };
    setProgress($('progress'), 100, 'Hazır');
    $('result-info').textContent = `${result.cropped} sayfanın görünüm kutusu daraltıldı · ${formatBytes(result.blob.size)}. Sayfa içeriği silinmedi.`;
    $('result').classList.add('is-active');
    setProgress($('progress'), null);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    const m = String(err && err.message || err);
    showError($('error'), m === 'NOCROP'
      ? 'Kırpma alanı sayfanın tamamı. Önizlemedeki kutunun kenarlarını içeri çekin ya da milimetre kutularına bir değer yazın.'
      : friendlyError(err));
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => { if (result) downloadBlob(result.blob, result.name); });
