// Online İmza Oluşturucu — saf Canvas; yazı tipleri yerel (OFL). Hiçbir veri sunucuya gitmez.
// Çıktı bir GÖRSEL imzadır, e-imza (nitelikli elektronik sertifika) değildir.
import { downloadBlob, showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

const pad = 12; // kırpma sonrası kenar boşluğu (px)
let mode = 'draw';
let strokes = []; // { color, width, pts: [{x, y}] }
let current = null;

/* =============== Çizerek =============== */
const pad2d = $('pad');
const pctx = pad2d.getContext('2d');

function drawStroke(c, s) {
  c.save();
  c.strokeStyle = s.color;
  c.fillStyle = s.color;
  c.lineWidth = s.width;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  const p = s.pts;
  if (p.length === 1) {
    c.beginPath();
    c.arc(p[0].x, p[0].y, s.width / 2, 0, Math.PI * 2);
    c.fill();
  } else {
    c.beginPath();
    c.moveTo(p[0].x, p[0].y);
    // Orta noktalar üzerinden ikinci derece eğri: köşeleri yumuşatır
    for (let i = 1; i < p.length - 1; i++) {
      const mx = (p[i].x + p[i + 1].x) / 2;
      const my = (p[i].y + p[i + 1].y) / 2;
      c.quadraticCurveTo(p[i].x, p[i].y, mx, my);
    }
    c.lineTo(p[p.length - 1].x, p[p.length - 1].y);
    c.stroke();
  }
  c.restore();
}

function redrawPad() {
  pctx.clearRect(0, 0, pad2d.width, pad2d.height);
  for (const s of strokes) drawStroke(pctx, s);
  if (current) drawStroke(pctx, current);
  $('pad-empty').hidden = strokes.length > 0 || !!current;
  $('undo').disabled = strokes.length === 0;
  $('clear').disabled = strokes.length === 0;
}

function padPoint(e) {
  const r = pad2d.getBoundingClientRect();
  return { x: (e.clientX - r.left) * pad2d.width / r.width, y: (e.clientY - r.top) * pad2d.height / r.height };
}

pad2d.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  e.preventDefault();
  pad2d.setPointerCapture(e.pointerId);
  const p = padPoint(e);
  const scale = pad2d.width / pad2d.getBoundingClientRect().width;
  current = { color: $('pen-color').value, width: Number($('pen-width').value) * scale, pts: [p], pid: e.pointerId, last: p };
  showError($('error'), null);
  redrawPad();
});
pad2d.addEventListener('pointermove', (e) => {
  if (!current || e.pointerId !== current.pid) return;
  const raw = padPoint(e);
  // Yumuşatma: önceki noktaya doğru kısmi yaklaşma (düşük geçiren filtre)
  const k = 1 - Number($('pen-smooth').value) / 100 * 0.85;
  const sp = { x: current.last.x + (raw.x - current.last.x) * k, y: current.last.y + (raw.y - current.last.y) * k };
  if (Math.hypot(sp.x - current.last.x, sp.y - current.last.y) < 0.8) return;
  current.pts.push(sp);
  current.last = sp;
  redrawPad();
});
function endStroke(e) {
  if (!current || e.pointerId !== current.pid) return;
  const s = current;
  current = null;
  delete s.pid; delete s.last;
  strokes.push(s);
  redrawPad();
}
pad2d.addEventListener('pointerup', endStroke);
pad2d.addEventListener('pointercancel', endStroke);

$('undo').addEventListener('click', () => { strokes.pop(); redrawPad(); });
$('clear').addEventListener('click', () => { strokes = []; redrawPad(); });
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && mode === 'draw' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    e.preventDefault();
    strokes.pop();
    redrawPad();
  }
});
$('pen-width').addEventListener('input', () => { $('pen-width-out').textContent = `${$('pen-width').value} px`; });
$('pen-smooth').addEventListener('input', () => { $('pen-smooth-out').textContent = `%${$('pen-smooth').value}`; });
document.querySelectorAll('[data-ink]').forEach((b) => b.addEventListener('click', () => {
  $('pen-color').value = b.dataset.ink;
  $('type-color').value = b.dataset.ink;
  renderTyped();
}));

/* =============== Yazarak =============== */
const FONTS = {
  'dancing-script': { family: 'Dancing Script', label: 'Dancing Script' },
  'great-vibes': { family: 'Great Vibes', label: 'Great Vibes' },
  caveat: { family: 'Caveat', label: 'Caveat' },
  pacifico: { family: 'Pacifico', label: 'Pacifico' },
};
const typed = $('type-canvas');
let typedReady = false;

function currentFont() {
  const r = document.querySelector('input[name="font"]:checked');
  return FONTS[r ? r.value : 'dancing-script'];
}

function updateSamples() {
  const text = $('type-name').value.trim() || 'Ad Soyad';
  document.querySelectorAll('.im-font-sample').forEach((el) => { el.textContent = text; });
}

async function renderTyped() {
  typedReady = false;
  typed.removeAttribute('data-ready');
  const text = $('type-name').value.trim();
  const font = currentFont();
  const size = Number($('type-size').value);
  const spec = `${size}px "${font.family}"`;
  try { await document.fonts.load(spec, text || 'Ağ'); } catch { /* yedek yazı tipine düşer */ }
  const c = typed.getContext('2d');
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = spec;
  const w = Math.ceil(probe.measureText(text || ' ').width) + size;
  typed.width = Math.max(w, 120);
  typed.height = Math.ceil(size * 2);
  c.clearRect(0, 0, typed.width, typed.height);
  c.font = spec;
  c.fillStyle = $('type-color').value;
  c.textBaseline = 'alphabetic';
  c.fillText(text, size / 2, size * 1.3);
  typedReady = !!text;
  if (text) typed.setAttribute('data-ready', '1');
  $('type-empty').hidden = !!text;
  typed.hidden = !text;
}
['type-name', 'type-size', 'type-color'].forEach((id) => $(id).addEventListener('input', () => {
  $('type-size-out').textContent = `${$('type-size').value} px`;
  updateSamples();
  renderTyped();
}));
document.querySelectorAll('input[name="font"]').forEach((r) => r.addEventListener('change', renderTyped));

/* =============== Sekmeler =============== */
function setMode(m) {
  mode = m;
  $('mode-draw').setAttribute('aria-pressed', String(m === 'draw'));
  $('mode-type').setAttribute('aria-pressed', String(m === 'type'));
  $('panel-draw').hidden = m !== 'draw';
  $('panel-type').hidden = m !== 'type';
  showError($('error'), null);
  if (m === 'type') { updateSamples(); renderTyped(); }
}
$('mode-draw').addEventListener('click', () => setMode('draw'));
$('mode-type').addEventListener('click', () => setMode('type'));

/* =============== Dışa aktarma =============== */
/** Tuvalin saydam olmayan sınırlarını bulup içeriği kırpılmış yeni tuval olarak döndürür. */
function cropCanvas(src) {
  const { width: w, height: h } = src;
  const data = src.getContext('2d').getImageData(0, 0, w, h).data;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  const cw = maxX - minX + 1 + pad * 2;
  const ch = maxY - minY + 1 + pad * 2;
  const out = document.createElement('canvas');
  out.width = cw; out.height = ch;
  out.getContext('2d').drawImage(src, minX, minY, cw - pad * 2, ch - pad * 2, pad, pad, cw - pad * 2, ch - pad * 2);
  return out;
}

async function buildOutput() {
  if (mode === 'draw') {
    if (!strokes.length) {
      showError($('error'), 'Henüz imza çizmediniz. Kutunun içinde fareyle ya da parmağınızla imzanızı çizin; ya da "Yazarak" sekmesinden adınızı yazın.');
      return null;
    }
    return cropCanvas(pad2d);
  }
  if (!$('type-name').value.trim()) {
    showError($('error'), 'Ad soyad alanı boş. İmzada görünmesini istediğiniz adı yazın, ardından bir yazı tipi seçin.');
    $('type-name').focus();
    return null;
  }
  await renderTyped();
  const out = cropCanvas(typed);
  if (!out) showError($('error'), 'Yazı çizilemedi. Farklı bir yazı tipi seçmeyi ya da yazıyı büyütmeyi deneyin.');
  return out;
}

const toBlob = (c) => new Promise((res) => c.toBlob(res, 'image/png'));

$('download').addEventListener('click', async () => {
  showError($('error'), null);
  const out = await buildOutput();
  if (!out) return;
  const blob = await toBlob(out);
  downloadBlob(blob, 'imza.png');
  $('result').classList.add('is-active');
  $('result-info').textContent = `imza.png indirildi (${out.width}×${out.height} px, şeffaf zemin). Bu bir görsel imzadır; PDF'e eklemek için PDF İmzala aracını kullanın.`;
});

$('copy').addEventListener('click', async () => {
  showError($('error'), null);
  const out = await buildOutput();
  if (!out) return;
  try {
    const blob = await toBlob(out);
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    $('result').classList.add('is-active');
    $('result-info').textContent = 'İmza panoya kopyalandı (şeffaf PNG). Belgeye Ctrl+V ile yapıştırabilirsiniz.';
  } catch {
    showError($('error'), 'Panoya kopyalanamadı: tarayıcınız izin vermiyor olabilir. "PNG indir" düğmesini kullanın.');
  }
});

$('pen-width-out').textContent = `${$('pen-width').value} px`;
$('pen-smooth-out').textContent = `%${$('pen-smooth').value}`;
$('type-size-out').textContent = `${$('type-size').value} px`;
redrawPad();
