// Resimde Bilgi Gizleme — saf Canvas. Dosya hiçbir zaman sunucuya gitmez.
import { createDropzone, downloadBlob, showError, baseName, formatBytes } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_PIXELS = 40_000_000;
const MAX_SIDE = 16384;
const BIG_FILE = 50 * 1024 * 1024;
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

let source = null; // { bmp, w, h, name }
let committed = null; // bölgeler işlenmiş tuval (dışa aktarılan budur)
let regions = []; // { id, type, x, y, w, h, x2, y2, amount, block, color, stroke, text, size }
let seq = 0;
let tool = 'blur';
let draft = null; // sürüklenen taslak
let selectedId = null;

const canvas = $('canvas');
const ctx = canvas.getContext('2d');

const TYPE_LABEL = { blur: 'Bulanık', pixel: 'Mozaik', black: 'Karartma', box: 'Kutu', arrow: 'Ok', text: 'Metin' };

createDropzone({ el: $('drop'), accept: 'image/png,image/jpeg,image/webp', multiple: false, onFiles: (f) => loadFile(f[0]) });

/* ---------- Resim yükleme ---------- */
async function decode(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* aşağıya düş */ }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unable to decode image'));
    img.src = URL.createObjectURL(file);
  });
}

async function loadFile(file, fallbackName) {
  showError($('error'), null);
  if (!file) return;
  if (file.size > BIG_FILE) {
    showError($('error'), '50 MB üzeri bir dosya seçtiniz. İşlem tarayıcıda yapıldığı için yavaş olabilir; sorun yaşarsanız önce "Resim Küçült" aracını deneyin.');
  }
  let bmp;
  try {
    bmp = await decode(file);
  } catch {
    showError($('error'), `${file.name || 'Dosya'} açılamadı: dosya bozuk ya da uzantısı içeriğiyle uyuşmuyor. JPG, PNG veya WebP bir resim seçin; ekran görüntüsü için Ctrl+V ile yapıştırmayı deneyin.`);
    return;
  }
  const w = bmp.width || bmp.naturalWidth;
  const h = bmp.height || bmp.naturalHeight;
  if (!w || !h) { showError($('error'), 'Resim açılamadı: boyutu okunamadı. Dosyayı bir görüntüleyicide açıp yeniden kaydedin.'); return; }
  if (w > MAX_SIDE || h > MAX_SIDE || w * h > MAX_PIXELS) {
    showError($('error'), `Resim çok büyük (${w}×${h}). Tarayıcı belleği yetmeyebilir; önce "Resim Küçült" aracıyla küçültüp tekrar deneyin.`);
    return;
  }
  const name = file.name && file.name !== 'image.png' ? baseName(file.name) : (fallbackName || 'ekran-goruntusu');
  source = { bmp, w, h, name, size: file.size };
  regions = [];
  draft = null;
  selectedId = null;
  canvas.width = w;
  canvas.height = h;
  committed = document.createElement('canvas');
  committed.width = w;
  committed.height = h;
  // Resme göre varsayılan kalınlık / boyutlar
  const m = Math.max(w, h);
  $('opt-stroke').value = String(Math.min(40, Math.max(2, Math.round(m / 250))));
  $('opt-size').value = String(Math.min(200, Math.max(10, Math.round(m / 40))));
  $('opt-block').value = String(Math.min(200, Math.max(4, Math.round(m / 90))));
  syncOut();
  rebuild();
  $('editor').hidden = false;
  $('canvas-info').textContent = `${name} · ${w}×${h} piksel${file.size ? ' · ' + formatBytes(file.size) : ''}`;
  renderList();
}

/* ---------- Pano yapıştırma (Ctrl+V) ---------- */
document.addEventListener('paste', (e) => {
  const cd = e.clipboardData;
  if (!cd) return;
  let file = null;
  for (const f of Array.from(cd.files || [])) { if (/^image\//.test(f.type)) { file = f; break; } }
  if (!file && cd.items) {
    for (const it of Array.from(cd.items)) {
      if (it.kind === 'file' && /^image\//.test(it.type)) { file = it.getAsFile(); break; }
    }
  }
  if (!file) return; // metin yapıştırma normal çalışsın
  e.preventDefault();
  loadFile(file, 'yapistirilan-resim');
});

/* ---------- Piksel işleme ---------- */
function blurLine(src, dst, start, step, len, r) {
  const div = 2 * r + 1;
  for (let c = 0; c < 4; c++) {
    let acc = 0;
    for (let i = -r; i <= r; i++) acc += src[start + Math.min(len - 1, Math.max(0, i)) * step + c];
    for (let i = 0; i < len; i++) {
      dst[start + i * step + c] = Math.round(acc / div);
      acc += src[start + Math.min(len - 1, i + r + 1) * step + c] - src[start + Math.max(0, i - r) * step + c];
    }
  }
}

/** Üç geçişli kutu bulanıklığı ≈ Gauss. radius: piksel. */
function boxBlur(img, radius) {
  const { width: w, height: h } = img;
  const r = Math.max(1, Math.round(radius * 0.6));
  const a = img.data;
  const b = new Uint8ClampedArray(a.length);
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) blurLine(a, b, y * w * 4, 4, w, r);
    for (let x = 0; x < w; x++) blurLine(b, a, x * 4, w * 4, h, r);
  }
}

function mosaic(img, block) {
  const { width: w, height: h, data } = img;
  for (let by = 0; by < h; by += block) {
    for (let bx = 0; bx < w; bx += block) {
      const ex = Math.min(w, bx + block);
      const ey = Math.min(h, by + block);
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let y = by; y < ey; y++) {
        for (let x = bx; x < ex; x++) {
          const i = (y * w + x) * 4;
          r += data[i]; g += data[i + 1]; b += data[i + 2]; a += data[i + 3]; n++;
        }
      }
      r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n); a = Math.round(a / n);
      for (let y = by; y < ey; y++) {
        for (let x = bx; x < ex; x++) {
          const i = (y * w + x) * 4;
          data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = a;
        }
      }
    }
  }
}

function drawArrow(c, r) {
  const t = r.stroke;
  const ang = Math.atan2(r.y2 - r.y, r.x2 - r.x);
  const head = Math.max(10, t * 4.5);
  c.save();
  c.strokeStyle = r.color; c.fillStyle = r.color; c.lineWidth = t; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath();
  c.moveTo(r.x, r.y);
  c.lineTo(r.x2 - Math.cos(ang) * head * 0.6, r.y2 - Math.sin(ang) * head * 0.6);
  c.stroke();
  c.beginPath();
  c.moveTo(r.x2, r.y2);
  c.lineTo(r.x2 - head * Math.cos(ang - 0.45), r.y2 - head * Math.sin(ang - 0.45));
  c.lineTo(r.x2 - head * Math.cos(ang + 0.45), r.y2 - head * Math.sin(ang + 0.45));
  c.closePath();
  c.fill();
  c.restore();
}

function applyRegion(c, r) {
  if (r.type === 'blur' || r.type === 'pixel') {
    const x = Math.max(0, Math.round(r.x)), y = Math.max(0, Math.round(r.y));
    const w = Math.min(source.w - x, Math.round(r.w)), h = Math.min(source.h - y, Math.round(r.h));
    if (w < 1 || h < 1) return;
    const img = c.getImageData(x, y, w, h);
    if (r.type === 'blur') boxBlur(img, r.amount * Math.max(source.w, source.h) / 1500);
    else mosaic(img, Math.max(2, Math.round(r.block)));
    c.putImageData(img, x, y);
  } else if (r.type === 'black') {
    c.fillStyle = r.color;
    c.fillRect(Math.round(r.x), Math.round(r.y), Math.round(r.w), Math.round(r.h));
  } else if (r.type === 'box') {
    c.save(); c.strokeStyle = r.color; c.lineWidth = r.stroke; c.lineJoin = 'miter';
    c.strokeRect(r.x, r.y, r.w, r.h); c.restore();
  } else if (r.type === 'arrow') {
    drawArrow(c, r);
  } else if (r.type === 'text') {
    c.save(); c.fillStyle = r.color; c.textBaseline = 'top';
    c.font = `700 ${r.size}px "IBM Plex Sans", Arial, sans-serif`;
    c.shadowColor = 'rgba(255,255,255,.85)'; c.shadowBlur = Math.max(2, r.size / 8);
    c.fillText(r.text, r.x, r.y);
    c.restore();
  }
}

/** Kaynak resimden başlayarak tüm bölgeleri sırayla uygular. */
function rebuild() {
  const c = committed.getContext('2d', { willReadFrequently: true });
  c.clearRect(0, 0, source.w, source.h);
  c.drawImage(source.bmp, 0, 0);
  for (const r of regions) applyRegion(c, r);
  paint();
}

function outline(c, r, dashed) {
  c.save();
  const lw = Math.max(2, Math.max(source.w, source.h) / 500);
  c.lineWidth = lw;
  c.setLineDash(dashed ? [lw * 4, lw * 3] : []);
  c.strokeStyle = '#fff'; c.strokeRect(r.x, r.y, r.w, r.h);
  c.setLineDash([lw * 4, lw * 3]); c.lineDashOffset = lw * 3.5;
  c.strokeStyle = '#7b2331'; c.strokeRect(r.x, r.y, r.w, r.h);
  c.restore();
}

/** Ekranda gösterilen tuval: işlenmiş katman + taslak/seçim çerçevesi (dışa aktarmaya girmez). */
function paint() {
  if (!source) return;
  ctx.drawImage(committed, 0, 0);
  const sel = regions.find((r) => r.id === selectedId);
  if (sel && sel.type !== 'arrow' && sel.type !== 'text') outline(ctx, sel, true);
  if (draft) {
    if (draft.type === 'arrow') drawArrow(ctx, draft);
    else outline(ctx, draft, false);
  }
}

/* ---------- Araç ve seçenekler ---------- */
function setTool(t) {
  tool = t;
  document.querySelectorAll('#tools button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tool === t)));
  $('field-amount').hidden = t !== 'blur';
  $('field-block').hidden = t !== 'pixel';
  $('field-color').hidden = !['black', 'box', 'arrow', 'text'].includes(t);
  $('field-stroke').hidden = !['box', 'arrow'].includes(t);
  $('field-text').hidden = t !== 'text';
  $('field-size').hidden = t !== 'text';
  const hints = {
    blur: 'Bölge çizmek için resim üzerinde sürükleyin. Düşük yoğunlukta yazı geri okunabilir; hassas bilgi için Mozaik ya da Karartma seçin.',
    pixel: 'Bölge çizmek için resim üzerinde sürükleyin. Blok büyüdükçe bilgi geri getirilemez hâle gelir.',
    black: 'Bölge çizmek için sürükleyin. Tam karartma, gizlenen bilgiyi geri getirilemez biçimde siler; en güvenli seçenektir.',
    box: 'Vurgulamak istediğiniz yeri çevreleyen bir kutu çizmek için sürükleyin.',
    arrow: 'Başlangıçtan ucun işaret ettiği noktaya doğru sürükleyin.',
    text: 'Önce metni yazın, sonra yerleştirmek istediğiniz noktaya tıklayın ya da dokunun.',
  };
  $('tool-hint').textContent = hints[t];
  if ($('opt-color').dataset.touched !== '1') $('opt-color').value = t === 'black' ? '#000000' : '#e11d48';
  syncOut();
}
$('tools').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-tool]');
  if (b) setTool(b.dataset.tool);
});
$('opt-color').addEventListener('input', () => { $('opt-color').dataset.touched = '1'; syncOut(); });

function syncOut() {
  $('opt-amount-out').textContent = `%${$('opt-amount').value}`;
  $('opt-block-out').textContent = `${$('opt-block').value} px`;
  $('opt-stroke-out').textContent = `${$('opt-stroke').value} px`;
  $('opt-size-out').textContent = `${$('opt-size').value} px`;
  $('opt-color-code').textContent = $('opt-color').value;
  $('opt-quality-out').textContent = `%${Math.round($('opt-quality').value * 100)}`;
}
['opt-amount', 'opt-block', 'opt-stroke', 'opt-size', 'opt-quality'].forEach((id) => $(id).addEventListener('input', syncOut));
$('opt-format').addEventListener('change', () => { $('field-quality').hidden = $('opt-format').value === 'png'; });

function newRegion(type, geo) {
  const base = { id: ++seq, type, color: $('opt-color').value };
  if (type === 'blur') base.amount = Number($('opt-amount').value);
  if (type === 'pixel') base.block = Number($('opt-block').value);
  if (type === 'box' || type === 'arrow') base.stroke = Number($('opt-stroke').value);
  if (type === 'black' && $('opt-color').dataset.touched !== '1') base.color = '#000000';
  return Object.assign(base, geo);
}

function addRegion(r) {
  regions.push(r);
  selectedId = r.id;
  applyRegion(committed.getContext('2d', { willReadFrequently: true }), r);
  paint();
  renderList();
}

/* ---------- Fare / dokunmatik çizim ---------- */
function toImage(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.min(source.w, Math.max(0, (e.clientX - rect.left) * source.w / rect.width)),
    y: Math.min(source.h, Math.max(0, (e.clientY - rect.top) * source.h / rect.height)),
  };
}

canvas.addEventListener('pointerdown', (e) => {
  if (!source || (e.pointerType === 'mouse' && e.button !== 0)) return;
  e.preventDefault();
  const p = toImage(e);
  if (tool === 'text') {
    const text = $('opt-text').value.trim();
    if (!text) { showError($('error'), 'Önce "Metin" alanına yerleştirmek istediğiniz yazıyı girin.'); $('opt-text').focus(); return; }
    showError($('error'), null);
    addRegion(newRegion('text', { x: p.x, y: p.y, text, size: Number($('opt-size').value) }));
    return;
  }
  canvas.setPointerCapture(e.pointerId);
  draft = newRegion(tool, { x: p.x, y: p.y, w: 0, h: 0, x2: p.x, y2: p.y, sx: p.x, sy: p.y, pid: e.pointerId });
});
canvas.addEventListener('pointermove', (e) => {
  if (!draft || e.pointerId !== draft.pid) return;
  const p = toImage(e);
  draft.x = Math.min(draft.sx, p.x); draft.y = Math.min(draft.sy, p.y);
  draft.w = Math.abs(p.x - draft.sx); draft.h = Math.abs(p.y - draft.sy);
  if (draft.type === 'arrow') { draft.x = draft.sx; draft.y = draft.sy; draft.x2 = p.x; draft.y2 = p.y; }
  paint();
});
function finish(e, cancel) {
  if (!draft || e.pointerId !== draft.pid) return;
  const d = draft;
  draft = null;
  if (!cancel) {
    const ok = d.type === 'arrow' ? Math.hypot(d.x2 - d.x, d.y2 - d.y) >= 6 : d.w >= 3 && d.h >= 3;
    if (ok) {
      ['sx', 'sy', 'pid'].forEach((k) => delete d[k]);
      if (d.type !== 'arrow') ['x', 'y', 'w', 'h'].forEach((k) => { d[k] = Math.round(d[k]); });
      addRegion(d);
      return;
    }
  }
  paint();
}
canvas.addEventListener('pointerup', (e) => finish(e, false));
canvas.addEventListener('pointercancel', (e) => finish(e, true));

/* ---------- Bölge listesi ---------- */
function describe(r) {
  if (r.type === 'arrow') return `${Math.round(Math.hypot(r.x2 - r.x, r.y2 - r.y))} px uzunluk`;
  if (r.type === 'text') return `“${r.text.length > 18 ? r.text.slice(0, 18) + '…' : r.text}”`;
  const extra = r.type === 'blur' ? ` · yoğunluk %${r.amount}` : r.type === 'pixel' ? ` · blok ${r.block}px` : '';
  return `${Math.round(r.w)}×${Math.round(r.h)}${extra}`;
}

function renderList() {
  const ul = $('regions');
  ul.innerHTML = '';
  regions.forEach((r, i) => {
    const li = document.createElement('li');
    li.dataset.id = String(r.id);
    li.tabIndex = 0;
    li.setAttribute('aria-label', `${i + 1}. ${TYPE_LABEL[r.type]}: ${describe(r)}. Silmek için Delete, taşımak için ok tuşları, boyutlandırmak için Shift ile ok tuşları.`);
    li.innerHTML = '<span class="name"></span><span class="meta"></span><button class="ba-icon-btn" type="button" data-act="remove" aria-label="Bölgeyi sil">✕</button>';
    li.querySelector('.name').textContent = `${i + 1}. ${TYPE_LABEL[r.type]}`;
    li.querySelector('.meta').textContent = describe(r);
    ul.appendChild(li);
  });
  const has = regions.length > 0;
  $('regions-wrap').hidden = !has;
  $('undo').disabled = !has;
  $('clear-regions').disabled = !has;
  $('result').classList.remove('is-active');
}

function removeRegion(id) {
  regions = regions.filter((r) => r.id !== id);
  if (selectedId === id) selectedId = null;
  rebuild();
  renderList();
}

$('regions').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-act="remove"]');
  if (btn) removeRegion(Number(btn.closest('li').dataset.id));
});
$('regions').addEventListener('focusin', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  selectedId = Number(li.dataset.id);
  paint();
});
$('regions').addEventListener('mouseover', (e) => {
  const li = e.target.closest('li');
  if (li && Number(li.dataset.id) !== selectedId) { selectedId = Number(li.dataset.id); paint(); }
});
$('regions').addEventListener('keydown', (e) => {
  const li = e.target.closest('li');
  if (!li || e.target.tagName === 'BUTTON') return;
  const id = Number(li.dataset.id);
  const r = regions.find((x) => x.id === id);
  if (!r) return;
  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    removeRegion(id);
    const first = $('regions').querySelector('li');
    if (first) first.focus();
    return;
  }
  const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
  if (!dir) return;
  e.preventDefault();
  const step = Math.max(1, Math.round(Math.max(source.w, source.h) / 100));
  if (e.shiftKey && r.type !== 'text') {
    if (r.type === 'arrow') { r.x2 += dir[0] * step; r.y2 += dir[1] * step; } else {
      r.w = Math.max(3, Math.min(source.w - r.x, r.w + dir[0] * step));
      r.h = Math.max(3, Math.min(source.h - r.y, r.h + dir[1] * step));
    }
  } else {
    r.x += dir[0] * step; r.y += dir[1] * step;
    if (r.type === 'arrow') { r.x2 += dir[0] * step; r.y2 += dir[1] * step; }
    else if (r.type !== 'text') {
      r.x = Math.max(0, Math.min(source.w - r.w, r.x)); r.y = Math.max(0, Math.min(source.h - r.h, r.y));
    }
  }
  rebuild();
  li.querySelector('.meta').textContent = describe(r);
});

$('undo').addEventListener('click', () => {
  if (!regions.length) return;
  regions.pop();
  selectedId = null;
  rebuild();
  renderList();
});
$('clear-regions').addEventListener('click', () => {
  regions = [];
  selectedId = null;
  rebuild();
  renderList();
});
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && source && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    e.preventDefault();
    $('undo').click();
  }
});

// Klavye ile kullanım: seçili araçla resmin ortasına bölge ekler, sonra liste üzerinden taşınır.
$('add-center').addEventListener('click', () => {
  if (!source) return;
  const w = Math.round(source.w * 0.4), h = Math.round(source.h * 0.15);
  const x = Math.round((source.w - w) / 2), y = Math.round((source.h - h) / 2);
  if (tool === 'arrow') addRegion(newRegion('arrow', { x, y, x2: x + w, y2: y + h }));
  else if (tool === 'text') {
    const text = $('opt-text').value.trim();
    if (!text) { showError($('error'), 'Önce "Metin" alanına yerleştirmek istediğiniz yazıyı girin.'); $('opt-text').focus(); return; }
    addRegion(newRegion('text', { x, y, text, size: Number($('opt-size').value) }));
  } else addRegion(newRegion(tool, { x, y, w, h }));
  const li = $('regions').lastElementChild;
  if (li) li.focus();
});

/* ---------- Dışa aktarma ---------- */
function exportCanvas(fmt) {
  const out = document.createElement('canvas');
  out.width = source.w; out.height = source.h;
  const c = out.getContext('2d');
  if (fmt === 'jpg') { c.fillStyle = '#ffffff'; c.fillRect(0, 0, out.width, out.height); }
  c.drawImage(committed, 0, 0);
  return out;
}
function toBlob(fmt) {
  const q = Number($('opt-quality').value);
  return new Promise((res) => exportCanvas(fmt).toBlob(res, MIME[fmt], fmt === 'png' ? undefined : q));
}

$('download').addEventListener('click', async () => {
  if (!source) return;
  showError($('error'), null);
  const fmt = $('opt-format').value;
  const blob = await toBlob(fmt);
  if (!blob) { showError($('error'), 'Resim dışa aktarılamadı. Biçimi PNG yapıp ya da resmi küçültüp tekrar deneyin.'); return; }
  const name = `${source.name}-gizli.${fmt}`;
  downloadBlob(blob, name);
  $('result').classList.add('is-active');
  $('result-info').textContent = `${name} indirildi (${formatBytes(blob.size)}). ${regions.length} işlem uygulandı. Dosya bilgisayarınızdan çıkmadı; konum, cihaz gibi EXIF bilgileri de çıktıya taşınmaz.`;
});

$('copy').addEventListener('click', async () => {
  if (!source) return;
  showError($('error'), null);
  try {
    const blob = await toBlob('png');
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    $('result').classList.add('is-active');
    $('result-info').textContent = 'Resim panoya kopyalandı; sohbet ya da belgeye Ctrl+V ile yapıştırabilirsiniz.';
  } catch {
    showError($('error'), 'Panoya kopyalanamadı: tarayıcınız izin vermiyor olabilir. "İndir" düğmesini kullanın.');
  }
});

$('reset').addEventListener('click', () => {
  source = null; regions = []; committed = null; draft = null;
  $('editor').hidden = true;
  $('result').classList.remove('is-active');
  showError($('error'), null);
});

syncOut();
setTool('blur');
