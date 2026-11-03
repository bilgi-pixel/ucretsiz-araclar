// Resim Kırp — Canvas ile serbest/oranlı/daire kırpma, 90° döndürme, toplu uygulama (fflate ile ZIP).
// Dosyalar hiçbir zaman sunucuya gitmez; her şey tarayıcıda çalışır.
import { createDropzone, setProgress, downloadBlob, formatBytes, showError, baseName, tick } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const list = $('files');
const BIG_FILE = 50 * 1024 * 1024;
const MAX_SIDE = 16384; // canvas için güvenli üst sınır
const MIN_BOX = 4; // sürüklerken en küçük kenar (piksel)
const MIME = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

let items = []; // { id, file, w, h, broken, outBlob, outName }
let seq = 0;
let active = null; // düzenleyicide gösterilen kayıt
let img = null; // aktif kaydın bitmap'i
let rot = 0; // 0/90/180/270 (tüm resimlere uygulanır)
let box = { x: 0, y: 0, w: 1, h: 1 }; // döndürülmüş resim üzerinde piksel cinsinden kutu
let ratio = 0; // 0 = serbest, aksi halde w/h
let fflate = null;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
async function getFflate() {
  if (!fflate) fflate = await import(new URL('../vendor/fflate@0.8.3/fflate.browser.mjs', import.meta.url).href);
  return fflate;
}

createDropzone({ el: $('drop'), accept: 'image/jpeg,image/png,image/webp,image/gif,image/bmp', multiple: true, onFiles: addFiles });

/** Dosyayı EXIF yönüne uyarak çözer; bitmap veya img döndürür. */
async function loadBitmap(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const im = new Image();
    const url = URL.createObjectURL(file);
    im.onload = () => { URL.revokeObjectURL(url); resolve(im); };
    im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Unable to decode image')); };
    im.src = url;
  });
}
const dimsOf = (b) => ({ w: b.naturalWidth || b.width, h: b.naturalHeight || b.height });
/** Döndürme sonrası ölçü (90/270'te en-boy yer değiştirir). */
const rotDims = (it) => (rot % 180 ? { w: it.h, h: it.w } : { w: it.w, h: it.h });

/* ---------- Dosya listesi ---------- */
async function addFiles(files) {
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const ok = files.filter((f) => /^image\/(jpeg|png|webp|gif|bmp)$/.test(f.type) || /\.(jpe?g|png|webp|gif|bmp)$/i.test(f.name));
  if (ok.length !== files.length) {
    showError($('error'), 'Yalnızca JPG, PNG, WebP, GIF ve BMP resimleri kırpılabilir; diğer dosyalar atlandı. PDF sayfasını kırpmak için "PDF Kırp" aracını kullanın.');
  }
  if (ok.some((f) => f.size > BIG_FILE)) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir ya da bellek yetmeyebilir; sorun yaşarsanız dosyaları tek tek deneyin.');
  }
  const bad = [];
  for (const file of ok) {
    const it = { id: String(++seq), file, w: 0, h: 0, broken: false, outBlob: null, outName: '' };
    const li = document.createElement('li');
    li.dataset.id = it.id;
    li.innerHTML = `<span class="name"></span><span class="meta"></span>
      <button class="ba-icon-btn" type="button" data-act="edit" aria-label="Bu resmi düzenleyicide göster">✎</button>
      <button class="ba-icon-btn" type="button" data-act="download" aria-label="Bu dosyayı indir" hidden>⤓</button>
      <button class="ba-icon-btn" type="button" data-act="remove" aria-label="Kaldır">✕</button>`;
    li.querySelector('.name').textContent = file.name;
    try {
      const b = await loadBitmap(file);
      const d = dimsOf(b);
      if (!d.w || !d.h) throw new Error('Unable to decode image');
      it.w = d.w; it.h = d.h;
      b.close && b.close();
      li.querySelector('.meta').textContent = `${d.w}×${d.h} · ${formatBytes(file.size)}`;
    } catch {
      it.broken = true;
      bad.push(file.name);
      li.querySelector('.meta').textContent = 'açılamadı';
    }
    items.push(it);
    list.appendChild(li);
  }
  if (bad.length) {
    showError($('error'), `${bad.slice(0, 3).join(', ')} açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. Dosyayı bir resim görüntüleyicide açabildiğinizi kontrol edin; gerekirse JPG veya PNG olarak yeniden kaydedip tekrar deneyin.`);
  }
  if (!active) {
    const first = items.find((x) => !x.broken);
    if (first) await selectItem(first);
  }
  refresh();
}

function refresh() {
  const usable = items.some((x) => !x.broken);
  $('editor').hidden = !usable;
  $('options').hidden = !usable;
  $('actions').hidden = !usable;
  $('batch-note').hidden = items.filter((x) => !x.broken).length < 2;
  if (!items.some((it) => it.outBlob)) $('result').classList.remove('is-active');
}

list.addEventListener('click', async (e) => {
  const btn = e.target.closest('button[data-act]');
  if (!btn) return;
  const li = btn.closest('li');
  const it = items.find((x) => x.id === li.dataset.id);
  if (!it) return;
  if (btn.dataset.act === 'remove') {
    items = items.filter((x) => x !== it);
    li.remove();
    if (active === it) {
      const old = active;
      active = null;
      const next = items.find((x) => !x.broken);
      if (next) { await selectItem(next, fracOfOld(old)); } else { img && img.close && img.close(); img = null; }
    }
    refresh();
  } else if (btn.dataset.act === 'download' && it.outBlob) {
    downloadBlob(it.outBlob, it.outName);
  } else if (btn.dataset.act === 'edit' && !it.broken) {
    await selectItem(it);
  }
});
const fracOfOld = (old) => fracOf(box, rotDims(old));

/** Aktif resmi değiştirir; kutu oransal olarak yeni resme uyarlanır. */
async function selectItem(it, forcedFrac) {
  const frac = forcedFrac || (active && img ? fracOf(box, rotDims(active)) : null);
  try {
    const b = await loadBitmap(it.file);
    img && img.close && img.close();
    img = b;
  } catch {
    showError($('error'), `"${it.file.name}" açılamadı; dosyanın bozuk olmadığını kontrol edin.`);
    return;
  }
  active = it;
  list.querySelectorAll('li').forEach((li) => li.classList.toggle('is-active', li.dataset.id === it.id));
  const d = rotDims(it);
  box = frac ? boxFromFrac(frac, d) : defaultBox(d);
  drawView();
  syncBox();
}

function defaultBox(d) {
  const w = Math.max(1, Math.round(d.w * 0.8)), h = Math.max(1, Math.round(d.h * 0.8));
  const b = { x: Math.round((d.w - w) / 2), y: Math.round((d.h - h) / 2), w, h };
  return ratio ? fitRatio(b, d) : b;
}
function fracOf(b, d) { return { x: b.x / d.w, y: b.y / d.h, w: b.w / d.w, h: b.h / d.h }; }
function boxFromFrac(f, d) {
  const w = clamp(Math.round(f.w * d.w), 1, d.w), h = clamp(Math.round(f.h * d.h), 1, d.h);
  return { x: clamp(Math.round(f.x * d.w), 0, d.w - w), y: clamp(Math.round(f.y * d.h), 0, d.h - h), w, h };
}

/* ---------- Önizleme çizimi ---------- */
/** Resmi döndürerek (tam sayı matrisle, bulanıklık olmadan) ctx'e çizer; dw×dh döndürülmüş hedef ölçüdür. */
function drawRotated(ctx, source, dw, dh) {
  const rad = (rot * Math.PI) / 180;
  const c = Math.round(Math.cos(rad)), s = Math.round(Math.sin(rad));
  ctx.save();
  ctx.translate(dw / 2, dh / 2);
  ctx.transform(c, s, -s, c, 0, 0);
  const w = rot % 180 ? dh : dw, h = rot % 180 ? dw : dh;
  ctx.drawImage(source, -w / 2, -h / 2, w, h);
  ctx.restore();
}
function drawView() {
  if (!img || !active) return;
  const d = rotDims(active);
  const scale = Math.min(1, 1000 / Math.max(d.w, d.h));
  const v = $('view');
  v.width = Math.max(1, Math.round(d.w * scale));
  v.height = Math.max(1, Math.round(d.h * scale));
  const ctx = v.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  drawRotated(ctx, img, v.width, v.height);
}

/* ---------- Kutu: durum ve arayüz ---------- */
function syncBox(skip) {
  if (!active) return;
  const d = rotDims(active);
  const el = $('box');
  el.style.left = `${(box.x / d.w) * 100}%`;
  el.style.top = `${(box.y / d.h) * 100}%`;
  el.style.width = `${(box.w / d.w) * 100}%`;
  el.style.height = `${(box.h / d.h) * 100}%`;
  el.setAttribute('aria-label', `Kırpma kutusu: ${box.w}×${box.h} piksel, konum ${box.x}, ${box.y}. Ok tuşları taşır, Shift ile ok tuşları boyutu değiştirir.`);
  el.classList.toggle('is-circle', $('opt-circle').checked);
  for (const k of ['x', 'y', 'w', 'h']) {
    const inp = $(`in-${k}`);
    if (k !== skip) inp.value = String(box[k]);
    inp.max = String(k === 'x' ? d.w - 1 : k === 'y' ? d.h - 1 : k === 'w' ? d.w : d.h);
  }
  $('box-info').textContent = `Kırpma alanı: ${box.w}×${box.h} piksel · kaynak: ${d.w}×${d.h}`;
  $('result').classList.remove('is-active');
}
function setBox(b, skip) {
  const d = rotDims(active);
  const w = clamp(Math.round(b.w), 1, d.w), h = clamp(Math.round(b.h), 1, d.h);
  box = { x: clamp(Math.round(b.x), 0, d.w - w), y: clamp(Math.round(b.y), 0, d.h - h), w, h };
  syncBox(skip);
}

/** Kutuyu oran kilidine uydurur (merkez korunur, resim içinde kalır). */
function fitRatio(b, d) {
  if (!ratio) return b;
  let w = b.w, h = w / ratio;
  if (h > b.h) { h = b.h; w = h * ratio; }
  if (w > d.w) { w = d.w; h = w / ratio; }
  if (h > d.h) { h = d.h; w = h * ratio; }
  w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h));
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  return { x: clamp(Math.round(cx - w / 2), 0, d.w - w), y: clamp(Math.round(cy - h / 2), 0, d.h - h), w, h };
}

function parseRatio(v) {
  if (v === 'free') return 0;
  const [a, b] = v.split(':').map(Number);
  return a > 0 && b > 0 ? a / b : 0;
}
$('opt-ratio').addEventListener('change', () => {
  ratio = parseRatio($('opt-ratio').value);
  if ($('opt-circle').checked && ratio !== 1) { $('opt-circle').checked = false; syncFormat(); }
  if (active) setBox(fitRatio(box, rotDims(active)));
});

// Daire kırpma: oran 1:1'e kilitlenir, çıktı şeffaf PNG olur.
$('opt-circle').addEventListener('change', () => {
  if ($('opt-circle').checked) {
    $('opt-ratio').value = '1:1';
    ratio = 1;
    if (active) setBox(fitRatio(box, rotDims(active)));
  }
  syncFormat();
  if (active) syncBox();
});

function syncFormat() {
  const circle = $('opt-circle').checked;
  if (circle) $('opt-format').value = 'png';
  $('opt-format').disabled = circle;
  const f = $('opt-format').value;
  $('field-quality').hidden = f === 'png';
  $('field-bg').hidden = f !== 'jpeg';
  $('circle-note').hidden = !circle;
}
$('opt-format').addEventListener('change', syncFormat);
$('opt-quality').addEventListener('input', () => { $('opt-quality-out').textContent = `${Math.round($('opt-quality').value * 100)}%`; });

// Sayısal giriş: x, y, genişlik, yükseklik.
for (const k of ['x', 'y', 'w', 'h']) {
  $(`in-${k}`).addEventListener('input', () => {
    if (!active || $(`in-${k}`).value === '') return;
    const v = Math.round(Number($(`in-${k}`).value));
    if (!Number.isFinite(v)) return;
    const d = rotDims(active);
    const b = { ...box };
    if (k === 'w') {
      b.w = clamp(v, 1, d.w);
      if (ratio) { b.h = Math.max(1, Math.round(b.w / ratio)); if (b.h > d.h) { b.h = d.h; b.w = Math.round(b.h * ratio); } }
    } else if (k === 'h') {
      b.h = clamp(v, 1, d.h);
      if (ratio) { b.w = Math.max(1, Math.round(b.h * ratio)); if (b.w > d.w) { b.w = d.w; b.h = Math.round(b.w / ratio); } }
    } else b[k] = v;
    setBox(b, k);
  });
  $(`in-${k}`).addEventListener('change', () => syncBox());
}

/* ---------- Kutu: fare/dokunma sürükleme ---------- */
let drag = null;
const boxEl = $('box');
boxEl.addEventListener('pointerdown', (e) => {
  if (!active) return;
  const h = e.target.closest('[data-h]');
  drag = { mode: h ? h.dataset.h : 'move', sx: e.clientX, sy: e.clientY, b: { ...box } };
  boxEl.setPointerCapture(e.pointerId);
  boxEl.focus();
  e.preventDefault();
});
boxEl.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const d = rotDims(active);
  const rect = $('view').getBoundingClientRect();
  const k = d.w / rect.width;
  const dx = (e.clientX - drag.sx) * k, dy = (e.clientY - drag.sy) * k;
  if (drag.mode === 'move') {
    setBox({ ...drag.b, x: clamp(drag.b.x + dx, 0, d.w - drag.b.w), y: clamp(drag.b.y + dy, 0, d.h - drag.b.h) });
  } else setBox(resizeBox(drag.mode, drag.b, dx, dy, d));
});
const endDrag = () => { drag = null; };
boxEl.addEventListener('pointerup', endDrag);
boxEl.addEventListener('pointercancel', endDrag);

/** Tutamaca göre yeniden boyutlandırır; oran kilidi varsa karşı köşe/kenar sabit kalır. */
function resizeBox(mode, sb, dx, dy, d) {
  const hasW = mode.includes('w'), hasE = mode.includes('e'), hasN = mode.includes('n'), hasS = mode.includes('s');
  if (!ratio) {
    let L = sb.x, T = sb.y, R = sb.x + sb.w, B = sb.y + sb.h;
    if (hasW) L = clamp(sb.x + dx, 0, R - MIN_BOX);
    if (hasE) R = clamp(R + dx, L + MIN_BOX, d.w);
    if (hasN) T = clamp(sb.y + dy, 0, B - MIN_BOX);
    if (hasS) B = clamp(B + dy, T + MIN_BOX, d.h);
    return { x: L, y: T, w: R - L, h: B - T };
  }
  let x, y, w, h;
  if (mode.length === 2) { // köşe
    const dirx = hasW ? -1 : 1, diry = hasN ? -1 : 1;
    const ax = hasW ? sb.x + sb.w : sb.x, ay = hasN ? sb.y + sb.h : sb.y;
    const px = (hasW ? sb.x : sb.x + sb.w) + dx, py = (hasN ? sb.y : sb.y + sb.h) + dy;
    w = Math.max(MIN_BOX, (px - ax) * dirx); h = Math.max(MIN_BOX, (py - ay) * diry);
    w = Math.max(w, h * ratio); h = w / ratio;
    const maxW = dirx > 0 ? d.w - ax : ax, maxH = diry > 0 ? d.h - ay : ay;
    if (w > maxW) { w = maxW; h = w / ratio; }
    if (h > maxH) { h = maxH; w = h * ratio; }
    x = dirx > 0 ? ax : ax - w; y = diry > 0 ? ay : ay - h;
  } else if (hasE || hasW) { // yan kenar: yükseklik merkezden uyar
    w = Math.max(MIN_BOX, hasE ? sb.w + dx : sb.w - dx); h = w / ratio;
    const cy = sb.y + sb.h / 2;
    const maxH = 2 * Math.min(cy, d.h - cy), maxW = hasE ? d.w - sb.x : sb.x + sb.w;
    if (h > maxH) { h = maxH; w = h * ratio; }
    if (w > maxW) { w = maxW; h = w / ratio; }
    x = hasE ? sb.x : sb.x + sb.w - w; y = cy - h / 2;
  } else { // alt/üst kenar: genişlik merkezden uyar
    h = Math.max(MIN_BOX, hasS ? sb.h + dy : sb.h - dy); w = h * ratio;
    const cx = sb.x + sb.w / 2;
    const maxW = 2 * Math.min(cx, d.w - cx), maxH = hasS ? d.h - sb.y : sb.y + sb.h;
    if (w > maxW) { w = maxW; h = w / ratio; }
    if (h > maxH) { h = maxH; w = h * ratio; }
    y = hasS ? sb.y : sb.y + sb.h - h; x = cx - w / 2;
  }
  return { x, y, w, h };
}

// Klavye: ok tuşları taşır (Ctrl = 10 piksel), Shift+ok boyutu değiştirir.
boxEl.addEventListener('keydown', (e) => {
  const dirs = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  const dir = dirs[e.key];
  if (!dir || !active) return;
  e.preventDefault();
  const step = e.ctrlKey || e.metaKey ? 10 : 1;
  const d = rotDims(active);
  if (e.shiftKey) {
    const b = { ...box, w: box.w + dir[0] * step, h: box.h + dir[1] * step };
    if (ratio) {
      if (dir[0]) b.h = b.w / ratio; else b.w = b.h * ratio;
    }
    b.w = clamp(Math.round(b.w), 1, d.w); b.h = clamp(Math.round(b.h), 1, d.h);
    setBox(b);
  } else setBox({ ...box, x: box.x + dir[0] * step, y: box.y + dir[1] * step });
});

// 90° döndürme: kutu da aynı yönde döner; oran kilidi tersine çevrilir.
$('rotate').addEventListener('click', () => {
  if (!active) return;
  const d = rotDims(active);
  const nb = { x: d.h - (box.y + box.h), y: box.x, w: box.h, h: box.w };
  rot = (rot + 90) % 360;
  if (ratio) {
    const [a, b] = $('opt-ratio').value.split(':');
    const inv = `${b}:${a}`;
    if ([...$('opt-ratio').options].some((o) => o.value === inv)) { $('opt-ratio').value = inv; ratio = parseRatio(inv); }
  }
  $('rot-out').textContent = `${rot}°`;
  drawView();
  setBox(nb);
});

/* ---------- Kırpma ve dışa aktarma ---------- */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), mime, quality));
}
function outFormat() { return $('opt-circle').checked ? 'png' : $('opt-format').value; }

async function cropOne(it, frac) {
  const b = await loadBitmap(it.file);
  try {
    const d = rotDims(it);
    const cb = boxFromFrac(frac, d);
    if (cb.w > MAX_SIDE || cb.h > MAX_SIDE) throw new Error('allocation too large');
    const fmt = outFormat();
    const canvas = document.createElement('canvas');
    canvas.width = cb.w; canvas.height = cb.h;
    const ctx = canvas.getContext('2d');
    if (fmt === 'jpeg') { ctx.fillStyle = $('opt-bg').value || '#ffffff'; ctx.fillRect(0, 0, cb.w, cb.h); } // JPG'de saydamlık dolgu rengi olur
    ctx.imageSmoothingQuality = 'high';
    if ($('opt-circle').checked) {
      ctx.beginPath();
      ctx.ellipse(cb.w / 2, cb.h / 2, cb.w / 2, cb.h / 2, 0, 0, Math.PI * 2);
      ctx.clip();
    }
    ctx.translate(-cb.x, -cb.y);
    drawRotated(ctx, b, d.w, d.h);
    const q = Number($('opt-quality').value) || 0.9;
    const blob = await toBlob(canvas, MIME[fmt], fmt === 'png' ? undefined : q);
    if (blob.type !== MIME[fmt]) throw new Error(`format ${fmt} unsupported`);
    return { blob, w: cb.w, h: cb.h, fmt };
  } finally { b.close && b.close(); }
}

$('run').addEventListener('click', async () => {
  const todo = items.filter((x) => !x.broken);
  if (!todo.length || !active) return;
  const btn = $('run');
  btn.disabled = true;
  showError($('error'), null);
  $('result').classList.remove('is-active');
  const frac = fracOf(box, rotDims(active));
  const failed = [];
  let done = 0, lastDims = '';
  try {
    for (let i = 0; i < todo.length; i++) {
      const it = todo[i];
      setProgress($('progress'), (i / todo.length) * 100, `${i + 1}/${todo.length}: ${it.file.name}`);
      await tick();
      const li = list.querySelector(`li[data-id="${it.id}"]`);
      try {
        const { blob, w, h, fmt } = await cropOne(it, frac);
        it.outBlob = blob;
        it.outName = `${baseName(it.file.name)}-${$('opt-circle').checked ? 'daire' : 'kirpilmis'}.${EXT[MIME[fmt]]}`;
        done++; lastDims = `${w}×${h}`;
        if (li) {
          li.querySelector('.meta').textContent = `${w}×${h} · ${formatBytes(blob.size)}`;
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
      $('result-info').textContent = done === 1 ? `Kırpıldı: ${lastDims} piksel.` : `${done} resim kırpıldı (aynı kutu oransal olarak uygulandı).`;
      $('download-all').textContent = done > 1 ? 'Tümünü indir (ZIP)' : 'İndir';
      $('result').classList.add('is-active');
    }
    if (failed.length) {
      const webp = $('opt-format').value === 'webp' ? ' Tarayıcınız WebP yazmayı desteklemiyor olabilir; JPG veya PNG seçin.' : '';
      showError($('error'), `${failed.length} resim işlenemedi (${failed.slice(0, 3).join(', ')}). Dosyanın bozuk olmadığını ve kırpma alanının resmin içinde kaldığını kontrol edin.${webp}`);
    }
  } finally { btn.disabled = false; }
});

$('download-all').addEventListener('click', async () => {
  const ready = items.filter((it) => it.outBlob);
  if (!ready.length) return;
  if (ready.length === 1) { downloadBlob(ready[0].outBlob, ready[0].outName); return; }
  const btn = $('download-all');
  btn.disabled = true;
  try {
    const { zipSync } = await getFflate();
    const entries = {};
    const used = new Set();
    for (let i = 0; i < ready.length; i++) {
      setProgress($('progress'), (i / ready.length) * 100, `ZIP hazırlanıyor: ${ready[i].outName}`);
      await tick();
      let name = ready[i].outName, n = 2;
      while (used.has(name)) name = ready[i].outName.replace(/(\.[^.]+)$/, ` (${n++})$1`);
      used.add(name);
      entries[name] = [new Uint8Array(await ready[i].outBlob.arrayBuffer()), { level: 0 }];
    }
    const zipped = zipSync(entries);
    setProgress($('progress'), null);
    downloadBlob(new Blob([zipped], { type: 'application/zip' }), 'kirpilmis-resimler.zip');
  } catch (err) {
    console.error(err);
    setProgress($('progress'), null);
    showError($('error'), 'ZIP oluşturulamadı; dosyaları listedeki ⤓ düğmesiyle tek tek indirin.');
  } finally { btn.disabled = false; }
});

$('clear').addEventListener('click', () => {
  items = []; active = null; list.innerHTML = '';
  img && img.close && img.close(); img = null;
  rot = 0; $('rot-out').textContent = '0°';
  $('result').classList.remove('is-active');
  showError($('error'), null);
  refresh();
});

syncFormat();
