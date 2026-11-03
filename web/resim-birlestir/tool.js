// Resimleri Birleştir (kolaj) — saf Canvas. Dosyalar hiçbir zaman sunucuya gitmez.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, makeSortable, moveItem, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384;
const MAX_PIXELS = 268_000_000;
const WARN_PIXELS = 40_000_000; // bu değerin üstünde bellek uyarısı
const THUMB_MAX = 800;
const PREVIEW_MAX_W = 720;
const PREVIEW_MAX_H = 520;
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

let items = []; // { id, file, w, h, url, thumb }
let seq = 0;
let outBlob = null;

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp', multiple: true, onFiles: addFiles });

/* ---------- Yükleme yardımcıları ---------- */
async function loadBitmap(file, opts = {}) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image', ...opts }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unable to decode image'));
    img.src = URL.createObjectURL(file);
  });
}
const dimsOf = (b) => ({ w: b.width || b.naturalWidth, h: b.height || b.naturalHeight });

/* ---------- Dosya listesi ---------- */
async function addFiles(files) {
  showError($('error'), null);
  invalidate();
  const ok = files.filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type) || /\.(jpe?g|png|webp)$/i.test(f.name));
  if (ok.length !== files.length) {
    const pdf = files.some((f) => /\.pdf$/i.test(f.name) || f.type === 'application/pdf');
    showError($('error'), `Yalnızca JPG, PNG ve WebP resimleri birleştirilebilir; diğer dosyalar atlandı.${pdf ? ' PDF sayfalarını resme çevirmek için önce "PDF\'den Resme" aracını kullanın.' : ''} HEIC fotoğrafları için önce "Resim Formatı Dönüştür" aracından geçirin.`);
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. Birleştirme tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; önce "Resim Küçült" aracını deneyin.');
  }
  const brokenNames = [];
  for (const file of ok) {
    const it = { id: String(++seq), file, w: 0, h: 0, url: '', thumb: null };
    try {
      const full = await loadBitmap(file);
      const d = dimsOf(full);
      full.close && full.close();
      if (!d.w || !d.h) throw new Error('Unable to decode image');
      it.w = d.w; it.h = d.h;
      // Önizleme için küçültülmüş kopya (bellek tasarrufu).
      const big = Math.max(d.w, d.h) > THUMB_MAX;
      it.thumb = await loadBitmap(file, big ? (d.w >= d.h ? { resizeWidth: THUMB_MAX, resizeQuality: 'high' } : { resizeHeight: THUMB_MAX, resizeQuality: 'high' }) : {});
    } catch {
      brokenNames.push(file.name);
      continue;
    }
    it.url = URL.createObjectURL(file);
    items.push(it);
    const li = document.createElement('li');
    li.dataset.id = it.id;
    li.innerHTML = `<span class="ba-handle" aria-hidden="true">⠿</span><img class="thumb" alt="" src="${it.url}"><span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="up" aria-label="Yukarı taşı">↑</button>
      <button class="ba-icon-btn" type="button" data-act="down" aria-label="Aşağı taşı">↓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    li.querySelector('.meta').textContent = `${it.w}×${it.h} · ${formatBytes(file.size)}`;
    list.appendChild(li);
  }
  if (brokenNames.length) {
    showError($('error'), `${brokenNames.slice(0, 3).join(', ')} açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edip yeniden kaydedin.`);
  }
  refresh();
}

makeSortable(list, () => schedulePreview());
list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  const act = btn.dataset.act;
  if (act === 'remove') {
    const it = items.find((x) => x.id === li.dataset.id);
    if (it) { URL.revokeObjectURL(it.url); it.thumb && it.thumb.close && it.thumb.close(); }
    items = items.filter((x) => x !== it);
    li.remove();
    invalidate();
    refresh();
  } else {
    moveItem(li, act === 'up' ? -1 : 1);
    invalidate();
    schedulePreview();
  }
});

/** DOM sırasına göre öğe listesi. */
function ordered() {
  return Array.from(list.children).map((li) => items.find((x) => x.id === li.dataset.id)).filter(Boolean);
}

function invalidate() {
  outBlob = null;
  $('result').classList.remove('is-active');
}

function refresh() {
  const has = items.length > 0;
  $('options').hidden = !has;
  $('actions').hidden = !has;
  $('preview-wrap').hidden = !has;
  syncLabels();
  schedulePreview();
}

$('clear').addEventListener('click', () => {
  items.forEach((it) => { URL.revokeObjectURL(it.url); it.thumb && it.thumb.close && it.thumb.close(); });
  items = []; list.innerHTML = '';
  showError($('error'), null);
  invalidate();
  refresh();
});

/* ---------- Seçenekler ---------- */
const bind = (id, outId, fmt) => $(id).addEventListener('input', () => { $(outId).textContent = fmt($(id).value); });
bind('opt-gap', 'opt-gap-out', (v) => v);
bind('opt-pad', 'opt-pad-out', (v) => v);
bind('opt-bg', 'opt-bg-code', (v) => v);
bind('opt-quality', 'opt-quality-out', (v) => `%${Math.round(v * 100)}`);
['opt-layout', 'opt-cols', 'opt-gap', 'opt-pad', 'opt-bg', 'opt-transparent', 'opt-equal', 'opt-align', 'opt-scale', 'opt-format'].forEach((id) => {
  $(id).addEventListener('input', () => { invalidate(); schedulePreview(); });
  $(id).addEventListener('change', () => { syncLabels(); invalidate(); schedulePreview(); });
});
function syncLabels() {
  const l = $('opt-layout').value;
  $('field-cols').hidden = l !== 'grid';
  $('eq-text').textContent = l === 'h' ? 'Yükseklikleri eşitle' : l === 'v' ? 'Genişlikleri eşitle' : 'Hücre genişliklerini eşitle';
  $('field-quality').hidden = $('opt-format').value === 'png';
}

function readOptions() {
  return {
    layout: $('opt-layout').value,
    cols: Math.max(1, Math.min(12, Math.round(Number($('opt-cols').value) || 2))),
    gap: Number($('opt-gap').value) || 0,
    pad: Number($('opt-pad').value) || 0,
    equal: $('opt-equal').checked,
    align: Number($('opt-align').value),
    scale: Number($('opt-scale').value) || 1,
    fmt: $('opt-format').value,
    bg: $('opt-bg').value || '#ffffff',
    transparent: $('opt-transparent').checked,
  };
}

/* ---------- Yerleşim hesabı (saf fonksiyon) ---------- */
/** dims: [{w,h}] → { W, H, rects: [{x,y,w,h}] } (özgün çözünürlükte, tam sayı). */
function computeLayout(dims, o) {
  const n = dims.length;
  const rects = new Array(n);
  const { gap, pad, align } = o;
  if (o.layout === 'h') {
    const th = Math.min(...dims.map((d) => d.h));
    const sized = dims.map((d) => (o.equal ? { w: Math.round((d.w * th) / d.h), h: th } : { w: d.w, h: d.h }));
    const rowH = Math.max(...sized.map((d) => d.h));
    let x = pad;
    sized.forEach((d, i) => { rects[i] = { x, y: pad + Math.round(align * (rowH - d.h)), w: d.w, h: d.h }; x += d.w + gap; });
    return { W: x - gap + pad, H: rowH + 2 * pad, rects };
  }
  if (o.layout === 'v') {
    const tw = Math.min(...dims.map((d) => d.w));
    const sized = dims.map((d) => (o.equal ? { w: tw, h: Math.round((d.h * tw) / d.w) } : { w: d.w, h: d.h }));
    const colW = Math.max(...sized.map((d) => d.w));
    let y = pad;
    sized.forEach((d, i) => { rects[i] = { x: pad + Math.round(align * (colW - d.w)), y, w: d.w, h: d.h }; y += d.h + gap; });
    return { W: colW + 2 * pad, H: y - gap + pad, rects };
  }
  // Izgara
  const cols = Math.min(o.cols, n);
  const rows = Math.ceil(n / cols);
  const cellW = Math.min(...dims.map((d) => d.w));
  const sized = dims.map((d) => (o.equal ? { w: cellW, h: Math.round((d.h * cellW) / d.w) } : { w: d.w, h: d.h }));
  const colW = new Array(cols).fill(0), rowH = new Array(rows).fill(0);
  sized.forEach((d, i) => { const c = i % cols, r = Math.floor(i / cols); colW[c] = Math.max(colW[c], d.w); rowH[r] = Math.max(rowH[r], d.h); });
  const colX = [], rowY = [];
  let ax = pad; colW.forEach((w, c) => { colX[c] = ax; ax += w + gap; });
  let ay = pad; rowH.forEach((h, r) => { rowY[r] = ay; ay += h + gap; });
  sized.forEach((d, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    rects[i] = { x: colX[c] + Math.round(align * (colW[c] - d.w)), y: rowY[r] + Math.round(align * (rowH[r] - d.h)), w: d.w, h: d.h };
  });
  return { W: ax - gap + pad, H: ay - gap + pad, rects };
}

/** Çıktı ölçeği: kullanıcı ölçeği + tarayıcı sınırları (kenar ve toplam piksel). */
function outputScale(W, H, userScale) {
  let s = userScale;
  const caps = [MAX_SIDE / W, MAX_SIDE / H, Math.sqrt(MAX_PIXELS / (W * H))];
  const cap = Math.min(...caps);
  const capped = s > cap;
  if (capped) s = cap * 0.999;
  return { s, capped };
}

/* ---------- Çizim ---------- */
function paintBackground(ctx, w, h, o) {
  if (o.transparent && o.fmt !== 'jpg') { ctx.clearRect(0, 0, w, h); return; }
  ctx.fillStyle = o.fmt === 'jpg' && o.transparent ? '#ffffff' : o.bg;
  ctx.fillRect(0, 0, w, h);
}

/* ---------- Önizleme ---------- */
let previewTimer = null;
function schedulePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(renderPreview, 100);
}
function renderPreview() {
  const arr = ordered();
  const info = $('preview-info');
  const warn = $('warn-memory');
  $('merge').disabled = false;
  if (arr.length < 2) {
    warn.hidden = true;
    info.textContent = arr.length ? 'Birleştirmek için en az bir resim daha ekleyin.' : '';
    const c = $('preview-canvas'); c.width = 1; c.height = 1;
    return;
  }
  const o = readOptions();
  const lay = computeLayout(arr.map((a) => ({ w: a.w, h: a.h })), o);
  const { s, capped } = outputScale(lay.W, lay.H, o.scale);
  const outW = Math.max(1, Math.round(lay.W * s)), outH = Math.max(1, Math.round(lay.H * s));
  const ps = Math.min(1, PREVIEW_MAX_W / lay.W, PREVIEW_MAX_H / lay.H);
  const canvas = $('preview-canvas');
  canvas.width = Math.max(1, Math.round(lay.W * ps));
  canvas.height = Math.max(1, Math.round(lay.H * ps));
  const ctx = canvas.getContext('2d');
  paintBackground(ctx, canvas.width, canvas.height, { ...o, fmt: 'png' });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  arr.forEach((a, i) => { const r = lay.rects[i]; ctx.drawImage(a.thumb, r.x * ps, r.y * ps, r.w * ps, r.h * ps); });
  const mp = (outW * outH) / 1e6;
  info.textContent = `Çıktı: ${outW}×${outH} px (${mp.toFixed(1)} MP) · ${arr.length} resim`;
  const msgs = [];
  if (capped) msgs.push(`Kolaj tarayıcı sınırlarını aştığı için çıktı otomatik olarak ${outW}×${outH} pikseline küçültülecek.`);
  if (outW * outH > WARN_PIXELS) msgs.push('Bellek uyarısı: bu kolaj çok büyük (40 milyon pikselden fazla). Tarayıcı yavaşlayabilir veya bellek yetmeyebilir; çıktı ölçeğini %50\'ye düşürün ya da resimleri önce "Resim Küçült" ile küçültün.');
  warn.textContent = msgs.join(' ');
  warn.hidden = msgs.length === 0;
}

/* ---------- Birleştir ---------- */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality));
}

$('merge').addEventListener('click', async () => {
  const arr = ordered();
  showError($('error'), null);
  invalidate();
  if (arr.length < 2) {
    showError($('error'), 'Birleştirmek için en az iki resim seçin. Yukarıdaki kutuya bir resim daha ekleyin.');
    return;
  }
  const btn = $('merge');
  btn.disabled = true;
  const o = readOptions();
  const lay = computeLayout(arr.map((a) => ({ w: a.w, h: a.h })), o);
  const { s } = outputScale(lay.W, lay.H, o.scale);
  const outW = Math.max(1, Math.round(lay.W * s)), outH = Math.max(1, Math.round(lay.H * s));
  try {
    const canvas = document.createElement('canvas');
    canvas.width = outW; canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx || canvas.width !== outW) throw new Error('memory: canvas');
    paintBackground(ctx, outW, outH, o);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    for (let i = 0; i < arr.length; i++) {
      setProgress($('progress'), (i / arr.length) * 100, `${i + 1}/${arr.length}: ${arr[i].file.name}`);
      await tick();
      const bmp = await loadBitmap(arr[i].file); // her resim tek tek açılır, çizilir, bırakılır
      const r = lay.rects[i];
      ctx.drawImage(bmp, r.x * s, r.y * s, r.w * s, r.h * s);
      bmp.close && bmp.close();
    }
    setProgress($('progress'), 95, 'Dosya hazırlanıyor…');
    await tick();
    const blob = await toBlob(canvas, MIME[o.fmt], o.fmt === 'png' ? undefined : Number($('opt-quality').value) || 0.92);
    if (blob.type !== MIME[o.fmt]) throw new Error(`format ${o.fmt} unsupported`);
    outBlob = blob;
    $('result-info').textContent = `${arr.length} resim birleştirildi · ${outW}×${outH} px · ${formatBytes(blob.size)}`;
    $('result').classList.add('is-active');
  } catch (err) {
    console.error(err);
    const webp = o.fmt === 'webp' ? ' Tarayıcınız WebP yazmayı desteklemiyor olabilir; PNG veya JPG seçin.' : '';
    showError($('error'), `Kolaj oluşturulamadı: dosya çok büyük ya da bozuk olabilir. Çıktı ölçeğini %50 veya %25 yapın, resimleri önce "Resim Küçült" ile küçültün ya da daha az resim seçin.${webp}`);
  } finally {
    setProgress($('progress'), null);
    btn.disabled = false;
  }
});

$('download').addEventListener('click', () => {
  if (!outBlob) return;
  const ext = $('opt-format').value;
  downloadBlob(outBlob, `kolaj.${ext}`);
});

syncLabels();
