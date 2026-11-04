// Aspect ratio calculator (EN) — runs entirely in the browser; inputs never leave the device.
// Sections: find the ratio (GCD), new size keeping the ratio, live preview, crop calculation, preset size table.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX = 1_000_000;

/* ---------- Data ---------- */
// Known ratios: [a, b, display name, use]
const STANDARD = [
  [16, 9, '16:9', 'Full HD, 4K, YouTube, TV'],
  [9, 16, '9:16', 'Stories, Reels, TikTok, Shorts'],
  [4, 3, '4:3', 'older TVs, slides, tablets'],
  [3, 4, '3:4', 'portrait photos, tablets'],
  [1, 1, '1:1', 'square posts, profile pictures'],
  [21, 9, '21:9', 'ultrawide monitors, cinema'],
  [3, 2, '3:2', '35 mm photos, DSLR'],
  [2, 3, '2:3', 'portrait photos, Pinterest'],
  [4, 5, '4:5', 'Instagram portrait post'],
  [5, 4, '5:4', 'older monitors, 8×10 prints'],
  [16, 10, '16:10', 'laptop screens'],
  [2, 1, '2:1', 'wide banners'],
  [191, 100, '1.91:1', 'link preview image'],
];

// Common widths/heights (computed for the active ratio)
const COMMON_SIDES = [3840, 2560, 1920, 1440, 1280, 1080, 720, 640];

/* ---------- Number handling ---------- */
/** US-style number text → number. Commas are thousands separators ("1,920"), a dot is the decimal point ("29.7"). NaN if invalid. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  let neg = false;
  if (t.startsWith('-') || t.startsWith('−')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) {
    if (!/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) return NaN; // commas only as proper thousands separators
    t = t.replace(/,/g, '');
  }
  if (!/^\d*\.?\d+$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

/** Number of decimal places in the typed text (used to scale to integers for the GCD). */
function decimalsOf(raw) {
  const t = String(raw).trim().replace(/\s/g, '');
  const i = t.indexOf('.');
  return i < 0 ? 0 : t.length - i - 1;
}

/** US format: dot decimal, no thousands separator. */
function fmt(n, maxFrac = 2) {
  if (!Number.isFinite(n)) return '–';
  return n.toLocaleString('en-US', { maximumFractionDigits: maxFrac, useGrouping: false });
}

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

/** (w, h) → simplified integer pair; decimal inputs are first scaled by 10^k. */
export function simplify(w, h, decimals = 0) {
  const k = 10 ** Math.min(4, decimals);
  const a = Math.round(w * k);
  const b = Math.round(h * k);
  const g = gcd(a, b) || 1;
  return [a / g, b / g];
}

class InputError extends Error {}

/** Reads a field: null if empty, throws an English error if invalid. */
function readDim(id, label, example) {
  const raw = $(id).value.trim();
  if (!raw) return null;
  const value = parseNum(raw);
  if (Number.isNaN(value)) {
    throw new InputError(`${label} could not be read as a number. Type digits only, with a dot for decimals (for example ${example}); do not add letters or units.`);
  }
  if (value <= 0) throw new InputError(`${label} must be greater than zero. For example, enter ${example}.`);
  if (value > MAX) throw new InputError(`${label} looks too large (maximum ${MAX}). Please check the value.`);
  return { value, decimals: decimalsOf(raw) };
}

/** Nearest known ratio; diff is the relative ratio difference. */
function nearestStandard(ratio) {
  let best = null;
  for (const [a, b, label, use] of STANDARD) {
    const diff = Math.abs(ratio - a / b) / (a / b);
    if (!best || diff < best.diff) best = { label, use, diff };
  }
  return best;
}

/* ---------- UI ---------- */
function fillRows(dl, rows) {
  dl.replaceChildren(...rows.map(([k, v, strong]) => {
    const div = document.createElement('div');
    div.className = `eb-row${strong ? ' is-strong' : ''}`;
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    div.append(dt, dd);
    return div;
  }));
}

/** Copies to the clipboard; falls back to a hidden field if permission is missing. */
async function copyText(text, statusEl) {
  if (!text) { statusEl.textContent = 'There is no result to copy. Enter the values first.'; return; }
  try {
    await navigator.clipboard.writeText(text);
    statusEl.textContent = 'Result copied.';
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    statusEl.textContent = ok ? 'Result copied.' : 'Could not copy; select the result and copy it manually.';
  }
}

/* --- SVG preview --- */
const NS = 'http://www.w3.org/2000/svg';
const VB_W = 320;
const VB_H = 200;

function svgNode(name, attrs, text) {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  if (text != null) n.textContent = text;
  return n;
}

/** Fits the ratio (w/h) into a 300×170 box. */
function fit(ratio, boxW = 300, boxH = 170) {
  let w = boxW;
  let h = boxW / ratio;
  if (h > boxH) { h = boxH; w = boxH * ratio; }
  return { w: Math.max(w, 3), h: Math.max(h, 3) };
}

function drawRatio(svg, ratio, label) {
  svg.replaceChildren();
  if (!ratio) return;
  const { w, h } = fit(ratio);
  const x = (VB_W - w) / 2;
  const y = (VB_H - h) / 2;
  svg.append(svgNode('rect', { class: 'eb-outer', x, y, width: w, height: h, rx: 2 }));
  if (w >= 56 && h >= 24) svg.append(svgNode('text', { class: 'eb-text', x: VB_W / 2, y: VB_H / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, label));
}

function drawCrop(svg, sw, sh, cw, ch, label) {
  svg.replaceChildren();
  const { w, h } = fit(sw / sh);
  const x = (VB_W - w) / 2;
  const y = (VB_H - h) / 2;
  svg.append(svgNode('rect', { class: 'eb-outer', x, y, width: w, height: h, rx: 2 }));
  const k = w / sw;
  const iw = Math.max(cw * k, 3);
  const ih = Math.max(ch * k, 3);
  svg.append(svgNode('rect', { class: 'eb-crop', x: x + (w - iw) / 2, y: y + (h - ih) / 2, width: iw, height: ih }));
  if (iw >= 56 && ih >= 24) svg.append(svgNode('text', { class: 'eb-text', x: VB_W / 2, y: VB_H / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central' }, label));
}

/* --- Section 1: find the ratio --- */
const active = { w: null, h: null, label: '', from: null }; // active ratio: used by the new size and the preview
let lastEdited = 'w';
const chips = Array.from(document.querySelectorAll('#chips button'));

function setActive(next) {
  Object.assign(active, next || { w: null, h: null, label: '', from: null });
  chips.forEach((b) => b.setAttribute('aria-pressed', String(active.from === 'preset' && active.label === `${b.dataset.a}:${b.dataset.b}`)));
  renderNew();
}

function orientation(ratio) {
  if (ratio > 1.0005) return 'Landscape (wide)';
  if (ratio < 0.9995) return 'Portrait (tall)';
  return 'Square';
}

function renderRatio() {
  showError($('r-error'), '');
  $('r-copy-status').textContent = '';
  try {
    const w = readDim('r-w', 'Width', '1920');
    const h = readDim('r-h', 'Height', '1080');
    if (!w || !h) {
      $('r-result').hidden = true; $('r-line').textContent = '';
      if (active.from === 'dimensions') setActive(null);
      return;
    }
    const [a, b] = simplify(w.value, h.value, Math.max(w.decimals, h.decimals));
    const ratio = w.value / h.value;
    const known = nearestStandard(ratio);
    const rows = [
      ['Decimal ratio (width ÷ height)', fmt(ratio, 2), false],
      ['Inverse (height ÷ width)', fmt(1 / ratio, 2), false],
      ['Orientation', orientation(ratio), false],
    ];
    if (known.diff <= 0.0001) rows.push(['Known ratio', `${known.label} — ${known.use}`, false]);
    else if (known.diff <= 0.03) rows.push(['Known ratio', `Approximately ${known.label} (${fmt(known.diff * 100, 2)}% difference) — ${known.use}`, false]);
    $('r-big').textContent = `${a}:${b}`;
    fillRows($('r-rows'), rows);
    $('r-line').textContent = `${fmt(w.value, 4)} × ${fmt(h.value, 4)} → ${a}:${b} (${fmt(ratio, 2)})`;
    $('r-result').hidden = false;
    setActive({ w: w.value, h: h.value, label: `${a}:${b}`, from: 'dimensions' });
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    $('r-result').hidden = true; $('r-line').textContent = '';
    showError($('r-error'), err.message);
  }
}

/* --- Section 2: new size keeping the ratio --- */
function renderNew() {
  showError($('n-error'), '');
  const ratio = active.w ? active.w / active.h : null;
  drawRatio($('preview'), ratio, active.label);
  $('preview').setAttribute('aria-label', ratio ? `Preview of a rectangle with a ${active.label} ratio` : 'No preview');
  $('preview-cap').textContent = ratio ? `Preview: ${active.label} ratio, ${orientation(ratio).toLowerCase()}.` : 'Set a ratio to see a preview.';
  $('active-label').textContent = ratio
    ? `Ratio in use: ${active.label}${active.from === 'preset' ? ' (preset)' : ' (from the dimensions you entered above)'}`
    : 'Set a ratio first: enter a width and height above or pick one of the preset ratios.';
  renderSizes(ratio);
  if (!ratio) { $('n-line').textContent = ''; return; }
  try {
    const fromW = lastEdited === 'w';
    const src = readDim(fromW ? 'n-w' : 'n-h', fromW ? 'New width' : 'New height', fromW ? '1280' : '720');
    const dst = $(fromW ? 'n-h' : 'n-w');
    if (!src) { dst.value = ''; $('n-line').textContent = ''; return; }
    const out = fromW ? (src.value * active.h) / active.w : (src.value * active.w) / active.h;
    dst.value = fmt(out, 2);
    const w = fromW ? src.value : out;
    const h = fromW ? out : src.value;
    let line = `${fmt(w)} × ${fmt(h)} (${active.label})`;
    if (Math.abs(w - Math.round(w)) > 1e-9 || Math.abs(h - Math.round(h)) > 1e-9) {
      line += ` · rounded for pixels: ${Math.round(w)} × ${Math.round(h)}`;
    }
    $('n-line').textContent = line;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    ($(lastEdited === 'w' ? 'n-h' : 'n-w')).value = '';
    $('n-line').textContent = '';
    showError($('n-error'), err.message);
  }
}

/** List of common sizes for the active ratio. */
function renderSizes(ratio) {
  const list = $('size-list');
  if (!ratio) { list.replaceChildren(); return; }
  const portrait = ratio < 1;
  const items = COMMON_SIDES.map((side) => {
    const other = portrait ? side * ratio : side / ratio;
    const w = portrait ? other : side;
    const h = portrait ? side : other;
    const exact = Math.abs(other - Math.round(other)) < 1e-9;
    const li = document.createElement('li');
    li.textContent = exact ? `${Math.round(w)} × ${Math.round(h)}` : `≈ ${Math.round(w)} × ${Math.round(h)}`;
    return li;
  });
  list.replaceChildren(...items);
}

/* --- Section 3: crop calculation --- */
function readTarget() {
  const v = $('k-preset').value;
  if (v === 'custom') {
    const a = readDim('k-ra', 'Target ratio width', '4');
    const b = readDim('k-rb', 'Target ratio height', '5');
    if (!a || !b) return null;
    return { a: a.value, b: b.value, label: `${fmt(a.value, 4)}:${fmt(b.value, 4)}` };
  }
  const [a, b] = v.split(':').map(Number);
  return { a, b, label: v };
}

function renderCrop() {
  showError($('k-error'), '');
  $('k-copy-status').textContent = '';
  $('k-custom').hidden = $('k-preset').value !== 'custom';
  try {
    const w = readDim('k-w', 'Image width', '4000');
    const h = readDim('k-h', 'Image height', '3000');
    const t = readTarget();
    if (!w || !h || !t) { $('k-result').hidden = true; $('k-line').textContent = ''; $('crop-svg').replaceChildren(); return; }
    const sw = w.value;
    const sh = h.value;
    const sameRatio = Math.abs(sw * t.b - sh * t.a) / (sh * t.a) < 1e-4;
    if (sameRatio) {
      fillRows($('k-rows'), [['Status', `The image is already ${t.label}; no cropping needed.`, true]]);
      $('k-line').textContent = `The ${fmt(sw)} × ${fmt(sh)} image is already ${t.label}.`;
      drawCrop($('crop-svg'), sw, sh, sw, sh, t.label);
    } else {
      const wider = sw * t.b > sh * t.a; // is the source wider than the target?
      // A small margin (1e-6) stops decimal rounding noise from leaving the integer one short.
      const cw = wider ? Math.floor((sh * t.a) / t.b + 1e-6) : sw;
      const ch = wider ? sh : Math.floor((sw * t.b) / t.a + 1e-6);
      const lost = wider ? sw - cw : sh - ch;
      const lostPct = (lost / (wider ? sw : sh)) * 100;
      const x = Math.floor((sw - cw) / 2);
      const y = Math.floor((sh - ch) / 2);
      const canvasW = wider ? sw : Math.ceil((sh * t.a) / t.b - 1e-6);
      const canvasH = wider ? Math.ceil((sw * t.b) / t.a - 1e-6) : sh;
      const pad = wider ? canvasH - sh : canvasW - sw;
      const side = wider ? 'top and bottom' : 'left and right';
      fillRows($('k-rows'), [
        ['Size after cropping', `${fmt(cw, 0)} × ${fmt(ch, 0)} pixels`, true],
        ['Target ratio', t.label, false],
        ['Amount cropped', `${fmt(lost, 0)} pixels from the ${wider ? 'width' : 'height'} (${fmt(lostPct, 1)}%); ${fmt(lost / 2, 1)} pixels from each edge with a centered crop`, false],
        ['Centered crop origin', `x = ${x}, y = ${y} pixels`, false],
        ['Fit without cropping', `${fmt(canvasW, 0)} × ${fmt(canvasH, 0)} pixel canvas (${fmt(pad, 0)} pixels of padding in total on the ${side})`, false],
      ]);
      $('k-line').textContent = `Cropping the ${fmt(sw)} × ${fmt(sh)} image to ${t.label} leaves ${fmt(cw, 0)} × ${fmt(ch, 0)} pixels.`;
      drawCrop($('crop-svg'), sw, sh, cw, ch, t.label);
    }
    $('k-result').hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    $('k-result').hidden = true; $('k-line').textContent = '';
    showError($('k-error'), err.message);
  }
}

/* --- Events --- */
['r-w', 'r-h'].forEach((id) => $(id).addEventListener('input', renderRatio));
chips.forEach((b) => b.addEventListener('click', () => {
  setActive({ w: Number(b.dataset.a), h: Number(b.dataset.b), label: `${b.dataset.a}:${b.dataset.b}`, from: 'preset' });
}));
$('n-w').addEventListener('input', () => { lastEdited = 'w'; renderNew(); });
$('n-h').addEventListener('input', () => { lastEdited = 'h'; renderNew(); });
['k-w', 'k-h', 'k-ra', 'k-rb'].forEach((id) => $(id).addEventListener('input', renderCrop));
$('k-preset').addEventListener('change', renderCrop);
$('r-copy').addEventListener('click', () => copyText($('r-line').textContent, $('r-copy-status')));
$('k-copy').addEventListener('click', () => copyText($('k-line').textContent, $('k-copy-status')));

// "Calculate" buttons in the preset size table: send the size to the ratio finder.
document.querySelectorAll('button[data-w]').forEach((b) => b.addEventListener('click', () => {
  $('r-w').value = b.dataset.w;
  $('r-h').value = b.dataset.h;
  renderRatio();
  $('r-w').focus({ preventScroll: true });
  $('r-w').scrollIntoView({ block: 'center', behavior: 'smooth' });
}));

renderRatio();
renderCrop();
