// Biyometrik Fotoğraf Oluşturucu — saf Canvas, baskı sayfası için pdf-lib.
// Fotoğraf hiçbir zaman sunucuya gitmez; tüm kırpma ve sıkıştırma tarayıcıda yapılır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, getPdfLib, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const BIG_FILE = 50 * 1024 * 1024;
const DPI = 300;
const MM_PER_INCH = 25.4;
const mmToPx = (mm) => Math.round((mm / MM_PER_INCH) * DPI);

// Ön ayarlar: mm ölçüleri ve 300 dpi'daki piksel karşılıkları.
// Kılavuzlar oran olarak verilir (0–1, üstten): baş tepesi aralığı, göz hizası, çene.
const PRESETS = {
  tr: { label: 'Türkiye biyometrik 50×60 mm', wMm: 50, hMm: 60, w: 591, h: 709, guides: { headTop: [0.08, 0.14], eyes: [0.42, 0.52], chin: 0.84 }, file: 'biyometrik-50x60' },
  vesikalik: { label: 'Vesikalık 45×60 mm', wMm: 45, hMm: 60, w: 531, h: 709, guides: { headTop: [0.08, 0.14], eyes: [0.42, 0.52], chin: 0.84 }, file: 'vesikalik-45x60' },
  us: { label: 'ABD vize 2×2 inç (600×600)', wMm: 50.8, hMm: 50.8, w: 600, h: 600, guides: { headTop: [0.10, 0.18], eyes: [0.44, 0.56], chin: 0.82 }, file: 'abd-vize-2x2' },
  schengen: { label: 'Schengen vize 35×45 mm', wMm: 35, hMm: 45, w: 413, h: 531, guides: { headTop: [0.08, 0.14], eyes: [0.42, 0.52], chin: 0.84 }, file: 'schengen-35x45' },
};

const PAPERS = {
  '10x15': { label: '10×15 cm', wMm: 100, hMm: 150 },
  a4: { label: 'A4', wMm: 210, hMm: 297 },
};

const state = {
  img: null,          // ImageBitmap | HTMLImageElement
  natW: 0, natH: 0,   // kaynak ölçüleri
  file: null,
  crop: { x: 0, y: 0, w: 0, h: 0 }, // kaynak piksel cinsinden kırpma alanı
  scale: 1,           // ekran piksel / kaynak piksel
  out: null,          // { blob, url, w, h, quality }
};

const editor = $('editor');
const ectx = editor.getContext('2d');

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp', multiple: false, onFiles: ([f]) => openFile(f) });

/* ---------- Dosya açma ---------- */
async function loadImage(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Unable to decode image')); };
    img.src = url;
  });
}

async function openFile(file) {
  showError($('error'), null);
  resetOutput();
  const isImage = /^image\/(jpeg|png|webp)$/.test(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name);
  if (!isImage) {
    showError($('error'), 'Seçtiğiniz dosya bir fotoğraf değil. Lütfen JPG, PNG veya WebP biçiminde bir fotoğraf seçin; PDF içindeki fotoğrafı önce "PDF\'den Resme" aracıyla çıkarabilirsiniz.');
    return;
  }
  if (file.size > BIG_FILE) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız fotoğrafı önce "Resim Küçült" aracıyla küçültün.');
  }
  setProgress($('progress'), 30, 'Fotoğraf açılıyor…');
  await tick();
  let img;
  try {
    img = await loadImage(file);
  } catch {
    setProgress($('progress'), null);
    showError($('error'), 'Fotoğraf açılamadı; dosya bozuk olabilir ya da biçimi desteklenmiyor. Telefonda çekilen HEIC fotoğrafları önce JPG\'ye çevirip tekrar deneyin.');
    return;
  }
  const w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
  if (!w || !h) {
    setProgress($('progress'), null);
    showError($('error'), 'Fotoğraf okunamadı. Dosyanın gerçekten bir resim olduğunu kontrol edip yeniden seçin.');
    return;
  }
  if (state.img && state.img.close) state.img.close();
  state.img = img; state.natW = w; state.natH = h; state.file = file;
  setProgress($('progress'), null);
  $('file-info').textContent = `${file.name} · ${w}×${h} px · ${formatBytes(file.size)}`;
  $('workspace').hidden = false;
  if (w < 400 || h < 480) {
    showError($('error'), `Fotoğraf küçük (${w}×${h} px). Çıktı ${currentPreset().w}×${currentPreset().h} px olacağı için görüntü bulanık çıkabilir; mümkünse daha yüksek çözünürlüklü bir fotoğraf kullanın.`);
  }
  fitEditor();
  initCrop();
  draw();
  editor.focus({ preventScroll: true });
}

/* ---------- Kırpma geometrisi ---------- */
function currentPreset() { return PRESETS[$('preset').value] || PRESETS.tr; }
function ratio() { const p = currentPreset(); return p.h / p.w; }

function fitEditor() {
  const wrap = $('editor-wrap');
  const maxW = Math.max(200, wrap.clientWidth || 520);
  const maxH = 520;
  const s = Math.min(maxW / state.natW, maxH / state.natH);
  state.scale = s;
  const dw = Math.max(1, Math.round(state.natW * s)), dh = Math.max(1, Math.round(state.natH * s));
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  editor.width = Math.round(dw * dpr); editor.height = Math.round(dh * dpr);
  editor.style.width = `${dw}px`; editor.style.height = `${dh}px`;
  ectx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/** Orana uyan, ortalanmış en büyük kırpma alanı. */
function initCrop() {
  const r = ratio();
  let w = state.natW, h = w * r;
  if (h > state.natH) { h = state.natH; w = h / r; }
  // Portre fotoğrafta baş üstte olduğu için biraz yukarıda başlat.
  w *= 0.9; h *= 0.9;
  state.crop = { x: (state.natW - w) / 2, y: Math.max(0, (state.natH - h) * 0.35), w, h };
  clampCrop();
}

function clampCrop() {
  const c = state.crop, r = ratio();
  const minW = Math.max(1, Math.min(state.natW, state.natH / r) * 0.1);
  c.w = Math.max(minW, Math.min(c.w, state.natW, state.natH / r));
  c.h = c.w * r;
  c.x = Math.max(0, Math.min(c.x, state.natW - c.w));
  c.y = Math.max(0, Math.min(c.y, state.natH - c.h));
}

/* ---------- Çizim ---------- */
function draw() {
  if (!state.img) return;
  const s = state.scale, c = state.crop;
  const dw = state.natW * s, dh = state.natH * s;
  ectx.clearRect(0, 0, dw, dh);
  ectx.filter = filterString();
  ectx.drawImage(state.img, 0, 0, dw, dh);
  ectx.filter = 'none';
  // Kırpma alanı dışını karart
  const cx = c.x * s, cy = c.y * s, cw = c.w * s, ch = c.h * s;
  ectx.fillStyle = 'rgba(0,0,0,.55)';
  ectx.fillRect(0, 0, dw, cy);
  ectx.fillRect(0, cy + ch, dw, dh - cy - ch);
  ectx.fillRect(0, cy, cx, ch);
  ectx.fillRect(cx + cw, cy, dw - cx - cw, ch);
  // Çerçeve
  ectx.strokeStyle = '#fff'; ectx.lineWidth = 2;
  ectx.strokeRect(cx + 1, cy + 1, cw - 2, ch - 2);
  // Kılavuzlar
  if ($('opt-guides').checked) {
    const g = currentPreset().guides;
    ectx.save();
    ectx.setLineDash([6, 4]);
    ectx.lineWidth = 1.5;
    // Baş tepesi aralığı (yeşil bant)
    ectx.fillStyle = 'rgba(111,207,151,.25)';
    ectx.fillRect(cx, cy + ch * g.headTop[0], cw, ch * (g.headTop[1] - g.headTop[0]));
    ectx.strokeStyle = '#6fcf97';
    line(cx, cy + ch * g.headTop[0], cx + cw, cy + ch * g.headTop[0]);
    line(cx, cy + ch * g.headTop[1], cx + cw, cy + ch * g.headTop[1]);
    // Göz hizası aralığı (sarı bant)
    ectx.fillStyle = 'rgba(255,224,0,.18)';
    ectx.fillRect(cx, cy + ch * g.eyes[0], cw, ch * (g.eyes[1] - g.eyes[0]));
    ectx.strokeStyle = '#ffe000';
    line(cx, cy + ch * g.eyes[0], cx + cw, cy + ch * g.eyes[0]);
    line(cx, cy + ch * g.eyes[1], cx + cw, cy + ch * g.eyes[1]);
    // Çene çizgisi
    ectx.strokeStyle = '#6fcf97';
    line(cx, cy + ch * g.chin, cx + cw, cy + ch * g.chin);
    // Dikey orta eksen
    ectx.strokeStyle = 'rgba(255,255,255,.7)';
    line(cx + cw / 2, cy, cx + cw / 2, cy + ch);
    ectx.restore();
    // Etiketler (çerçeve yeterince genişse)
    if (cw > 140) {
      ectx.font = '600 11px system-ui, sans-serif';
      ectx.fillStyle = '#fff';
      ectx.shadowColor = 'rgba(0,0,0,.8)'; ectx.shadowBlur = 3;
      ectx.fillText('baş tepesi', cx + 6, cy + ch * g.headTop[0] - 4);
      ectx.fillText('göz hizası', cx + 6, cy + ch * g.eyes[0] - 4);
      ectx.fillText('çene', cx + 6, cy + ch * g.chin - 4);
      ectx.shadowBlur = 0;
    }
  }
  // Boyutlandırma tutamacı (sağ alt)
  ectx.fillStyle = '#fff';
  ectx.fillRect(cx + cw - 14, cy + ch - 14, 12, 12);
  ectx.strokeStyle = '#7b2331'; ectx.lineWidth = 2;
  ectx.strokeRect(cx + cw - 14, cy + ch - 14, 12, 12);
  $('crop-info').textContent = `Kırpma: ${Math.round(c.w)}×${Math.round(c.h)} px → çıktı ${currentPreset().w}×${currentPreset().h} px`;
}
function line(x1, y1, x2, y2) { ectx.beginPath(); ectx.moveTo(x1, y1); ectx.lineTo(x2, y2); ectx.stroke(); }

function filterString() {
  const b = Number($('opt-brightness').value), c = Number($('opt-contrast').value);
  if (b === 100 && c === 100) return 'none';
  return `brightness(${b}%) contrast(${c}%)`;
}

/* ---------- Fare / dokunma ile taşıma ve boyutlandırma ---------- */
let drag = null; // { mode: 'move'|'resize', sx, sy, crop0 }
function toImage(e) {
  const r = editor.getBoundingClientRect();
  return { x: (e.clientX - r.left) / state.scale, y: (e.clientY - r.top) / state.scale };
}
editor.addEventListener('pointerdown', (e) => {
  if (!state.img) return;
  const p = toImage(e), c = state.crop;
  const handle = 16 / state.scale;
  const inside = p.x >= c.x && p.x <= c.x + c.w && p.y >= c.y && p.y <= c.y + c.h;
  const onHandle = p.x >= c.x + c.w - handle && p.y >= c.y + c.h - handle && inside;
  if (!inside) return;
  drag = { mode: onHandle ? 'resize' : 'move', sx: p.x, sy: p.y, crop0: { ...c } };
  editor.setPointerCapture(e.pointerId);
  editor.style.cursor = onHandle ? 'nwse-resize' : 'grabbing';
  e.preventDefault();
});
editor.addEventListener('pointermove', (e) => {
  if (!state.img) return;
  const p = toImage(e), c = state.crop;
  if (!drag) {
    const handle = 16 / state.scale;
    const inside = p.x >= c.x && p.x <= c.x + c.w && p.y >= c.y && p.y <= c.y + c.h;
    editor.style.cursor = inside ? (p.x >= c.x + c.w - handle && p.y >= c.y + c.h - handle ? 'nwse-resize' : 'grab') : 'default';
    return;
  }
  const dx = p.x - drag.sx, dy = p.y - drag.sy;
  if (drag.mode === 'move') {
    c.x = drag.crop0.x + dx; c.y = drag.crop0.y + dy;
  } else {
    // Oran kilitli: genişlik, iki eksendeki büyük olana göre değişir.
    const r = ratio();
    c.w = Math.max(drag.crop0.w + dx, (drag.crop0.h + dy) / r);
    c.h = c.w * r;
  }
  clampCrop();
  draw();
});
const endDrag = () => { if (drag) { drag = null; editor.style.cursor = 'grab'; } };
editor.addEventListener('pointerup', endDrag);
editor.addEventListener('pointercancel', endDrag);

// Klavye: ok tuşları taşır (Shift ile 10 kat), + / - boyutlandırır.
editor.addEventListener('keydown', (e) => {
  if (!state.img) return;
  const step = (e.shiftKey ? 10 : 1) * Math.max(1, state.natW / 200);
  const c = state.crop;
  let handled = true;
  switch (e.key) {
    case 'ArrowLeft': c.x -= step; break;
    case 'ArrowRight': c.x += step; break;
    case 'ArrowUp': c.y -= step; break;
    case 'ArrowDown': c.y += step; break;
    case '+': case '=': c.w += step * 2; break;
    case '-': case '_': c.w -= step * 2; break;
    default: handled = false;
  }
  if (!handled) return;
  e.preventDefault();
  clampCrop(); draw();
});

$('zoom-in').addEventListener('click', () => { state.crop.w *= 0.9; clampCrop(); draw(); });
$('zoom-out').addEventListener('click', () => { state.crop.w *= 1.1; clampCrop(); draw(); });
$('center').addEventListener('click', () => { initCrop(); draw(); });

$('preset').addEventListener('change', () => { if (state.img) { clampCrop(); draw(); } resetOutput(); });
$('opt-guides').addEventListener('change', draw);
['opt-brightness', 'opt-contrast'].forEach((id) => $(id).addEventListener('input', () => {
  $(`${id}-out`).textContent = `${$(id).value}%`;
  draw(); resetOutput();
}));
$('reset-adjust').addEventListener('click', () => {
  $('opt-brightness').value = '100'; $('opt-contrast').value = '100';
  $('opt-brightness-out').textContent = '100%'; $('opt-contrast-out').textContent = '100%';
  draw(); resetOutput();
});
window.addEventListener('resize', () => { if (state.img) { fitEditor(); draw(); } });

/* ---------- Üretim ---------- */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality);
  });
}

/** Kırpılmış fotoğrafı hedef ölçüde çizer. */
function renderCrop(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); // PNG saydamlığı beyaza iner
  ctx.imageSmoothingQuality = 'high';
  ctx.filter = filterString();
  const c = state.crop;
  ctx.drawImage(state.img, c.x, c.y, c.w, c.h, 0, 0, w, h);
  ctx.filter = 'none';
  return canvas;
}

/**
 * Hedef KB varsa kalitede ikili arama (0.3–0.95); ölçü asla küçültülmez çünkü
 * kurumlar sabit piksel ölçüsü ister. Hedefe inilemezse en düşük kalite döner.
 */
async function encodeToTarget(canvas, targetBytes, onStep) {
  let hi = 0.95, lo = 0.3;
  let blob = await toBlob(canvas, 'image/jpeg', hi);
  if (!targetBytes || blob.size <= targetBytes) return { blob, quality: hi, reached: true };
  let best = null, bestQ = lo;
  for (let i = 0; i < 7; i++) {
    const mid = (lo + hi) / 2;
    const b = await toBlob(canvas, 'image/jpeg', mid);
    if (b.size <= targetBytes) { best = b; bestQ = mid; lo = mid; } else { hi = mid; }
    onStep && onStep(i);
    await tick();
  }
  if (best) return { blob: best, quality: bestQ, reached: true };
  const floor = await toBlob(canvas, 'image/jpeg', lo);
  return { blob: floor, quality: lo, reached: floor.size <= targetBytes };
}

function resetOutput() {
  if (state.out && state.out.url) URL.revokeObjectURL(state.out.url);
  state.out = null;
  $('result').classList.remove('is-active');
  $('result').dataset.ready = '0';
}

$('make').addEventListener('click', async () => {
  if (!state.img) return;
  const btn = $('make');
  btn.disabled = true;
  showError($('error'), null);
  resetOutput();
  const p = currentPreset();
  const targetKb = Number($('target').value) || 0;
  try {
    setProgress($('progress'), 20, 'Kırpılıyor…');
    await tick();
    const canvas = renderCrop(p.w, p.h);
    setProgress($('progress'), 40, targetKb ? `${targetKb} KB hedefine sıkıştırılıyor…` : 'JPEG kodlanıyor…');
    await tick();
    const { blob, quality, reached } = await encodeToTarget(canvas, targetKb * 1024, (i) => setProgress($('progress'), 40 + i * 8, `${targetKb} KB hedefine sıkıştırılıyor…`));
    if (blob.type !== 'image/jpeg') throw new Error('format unsupported');
    const url = URL.createObjectURL(blob);
    state.out = { blob, url, w: p.w, h: p.h, quality, name: `${p.file}-${baseName(state.file.name)}.jpg` };
    $('out-preview').src = url;
    $('out-preview').width = p.w; $('out-preview').height = p.h;
    $('out-info').textContent = `${p.w}×${p.h} px (${p.wMm}×${p.hMm} mm, 300 dpi) · ${formatBytes(blob.size)} · JPEG kalite %${Math.round(quality * 100)}`;
    $('out-info').dataset.bytes = String(blob.size);
    setProgress($('progress'), null);
    $('result').classList.add('is-active');
    $('result').dataset.ready = '1';
    if (!reached) {
      showError($('error'), `${targetKb} KB hedefine inilemedi (${formatBytes(blob.size)}). Kalite en düşük seviyeye çekildi; arka planı sade, iyi aydınlatılmış ve desensiz bir fotoğrafla tekrar deneyin ya da daha yüksek KB sınırı seçin.`);
    }
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Fotoğraf oluşturulamadı. Sayfayı yenileyip fotoğrafı yeniden seçin; sorun sürerse farklı bir tarayıcı deneyin.');
  } finally {
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (state.out) downloadBlob(state.out.blob, state.out.name);
});

/* ---------- Baskı sayfası ---------- */
/**
 * Kağıda sığan ızgarayı hesaplar (mm). Önce boşluksuz sığdırır (10×15'e 2×2 adet 50×60
 * ancak böyle sığar), sonra artan alanı en fazla 3 mm'lik eşit aralıklara dağıtır.
 * Dikey ve yatay yerleşimden çoğunu seçer.
 */
function layoutSheet(paper, p, want) {
  const tryFit = (pw, ph) => ({ pw, ph, cols: Math.floor(pw / p.wMm), rows: Math.floor(ph / p.hMm) });
  const a = tryFit(paper.wMm, paper.hMm), b = tryFit(paper.hMm, paper.wMm);
  const best = a.cols * a.rows >= b.cols * b.rows ? a : b;
  const capacity = best.cols * best.rows;
  const count = want ? Math.min(want, capacity) : capacity;
  const cells = [];
  if (!capacity) return { pw: best.pw, ph: best.ph, cells, capacity, count: 0 };
  const gapX = Math.min(3, (best.pw - best.cols * p.wMm) / (best.cols + 1));
  const gapY = Math.min(3, (best.ph - best.rows * p.hMm) / (best.rows + 1));
  const gridW = best.cols * p.wMm + (best.cols - 1) * gapX;
  const gridH = best.rows * p.hMm + (best.rows - 1) * gapY;
  const ox = (best.pw - gridW) / 2, oy = (best.ph - gridH) / 2;
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / best.cols), c = i % best.cols;
    cells.push({ x: ox + c * (p.wMm + gapX), y: oy + r * (p.hMm + gapY) });
  }
  return { pw: best.pw, ph: best.ph, cells, capacity, count };
}

async function makeSheet(kind) {
  if (!state.out) return;
  showError($('error'), null);
  const p = currentPreset();
  const paper = PAPERS[$('sheet-paper').value] || PAPERS['10x15'];
  const want = Number($('sheet-count').value) || 0;
  const lay = layoutSheet(paper, p, want);
  if (!lay.count) {
    showError($('error'), 'Seçilen fotoğraf ölçüsü bu kağıda sığmıyor. A4 kağıt seçin.');
    return;
  }
  if (want && lay.count < want) {
    showError($('error'), `${paper.label} kağıda ${p.wMm}×${p.hMm} mm fotoğraftan en fazla ${lay.capacity} adet sığar; sayfa ${lay.count} adet ile hazırlandı. Daha fazlası için A4 seçin.`);
  }
  const cut = $('sheet-cut').checked;
  try {
    setProgress($('progress'), 30, 'Baskı sayfası hazırlanıyor…');
    await tick();
    const pdfLib = kind === 'pdf' ? await getPdfLib() : null;
    const pageW = mmToPx(lay.pw), pageH = mmToPx(lay.ph);
    if (kind === 'jpg') {
      const canvas = document.createElement('canvas');
      canvas.width = pageW; canvas.height = pageH;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, pageW, pageH);
      const photo = renderCrop(p.w, p.h);
      for (const cell of lay.cells) {
        const x = mmToPx(cell.x), y = mmToPx(cell.y);
        ctx.drawImage(photo, x, y, p.w, p.h);
        if (cut) { ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1; ctx.setLineDash([6, 6]); ctx.strokeRect(x - 0.5, y - 0.5, p.w + 1, p.h + 1); ctx.setLineDash([]); }
      }
      const blob = await toBlob(canvas, 'image/jpeg', 0.92);
      setProgress($('progress'), null);
      downloadBlob(blob, `baski-${paper.label.replace(/[^\w]/g, '')}-${p.file}.jpg`);
      return;
    }
    // PDF: sayfa ölçüsü punto (1 mm = 2.8346 pt), fotoğraf gömülü JPEG.
    const PT = 72 / MM_PER_INCH;
    const doc = await pdfLib.PDFDocument.create();
    doc.setTitle('Biyometrik fotoğraf baskı sayfası');
    doc.setProducer('Bilişim Ajans Ücretsiz Araçlar');
    const page = doc.addPage([lay.pw * PT, lay.ph * PT]);
    const jpg = await doc.embedJpg(await state.out.blob.arrayBuffer());
    for (const cell of lay.cells) {
      const x = cell.x * PT, y = (lay.ph - cell.y - p.hMm) * PT;
      page.drawImage(jpg, { x, y, width: p.wMm * PT, height: p.hMm * PT });
      if (cut) page.drawRectangle({ x, y, width: p.wMm * PT, height: p.hMm * PT, borderColor: pdfLib.rgb(0.75, 0.75, 0.75), borderWidth: 0.3, borderDashArray: [2, 2] });
    }
    const bytes = await doc.save();
    setProgress($('progress'), null);
    downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `baski-${paper.label.replace(/[^\w]/g, '')}-${p.file}.pdf`);
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'Baskı sayfası oluşturulamadı. Önce "Fotoğrafı oluştur" düğmesine basıldığından emin olun ve tekrar deneyin.');
  }
}
$('sheet-pdf').addEventListener('click', () => makeSheet('pdf'));
$('sheet-jpg').addEventListener('click', () => makeSheet('jpg'));

$('clear').addEventListener('click', () => {
  if (state.img && state.img.close) state.img.close();
  state.img = null; state.file = null;
  resetOutput();
  $('workspace').hidden = true;
  showError($('error'), null);
});
