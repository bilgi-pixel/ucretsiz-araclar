// DPI / PPI calculator (EN) — runs entirely in the browser; inputs never leave the device.
// Three modes: pixels → cm/inches, cm/mm/inches → pixels, screen PPI. Plus a "how large can my photo print?" quick answer.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const CM_PER_INCH = 2.54;
const MAX_PX = 1_000_000;

/* ---------- Data ---------- */
// Print sizes: [name, short side cm, long side cm]
const PAPERS = [
  ['A3', 29.7, 42],
  ['A4', 21, 29.7],
  ['A5', 14.8, 21],
  ['4 × 6 in (10 × 15 cm)', 10.16, 15.24],
  ['5 × 7 in', 12.7, 17.78],
  ['8 × 10 in', 20.32, 25.4],
  ['US Letter (8.5 × 11 in)', 21.59, 27.94],
];

// Screen examples: [name, width px, height px, diagonal in]
const DEVICES = [
  ['Monitor 21.5″ Full HD', 1920, 1080, 21.5],
  ['Monitor 24″ Full HD', 1920, 1080, 24],
  ['Monitor 27″ Full HD', 1920, 1080, 27],
  ['Monitor 27″ QHD', 2560, 1440, 27],
  ['Monitor 27″ 4K', 3840, 2160, 27],
  ['Monitor 32″ 4K', 3840, 2160, 32],
  ['Laptop 15.6″ Full HD', 1920, 1080, 15.6],
  ['Laptop 13.3″ 2560 × 1600', 2560, 1600, 13.3],
  ['TV 55″ 4K', 3840, 2160, 55],
  ['Tablet 10.9″', 2360, 1640, 10.9],
  ['Phone 6.1″', 2556, 1179, 6.1],
  ['Phone 6.7″', 2796, 1290, 6.7],
];

/* ---------- Number handling ---------- */
/** US-style number text → number. Commas are thousands separators, the dot is the decimal mark. NaN when invalid. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  let neg = false;
  if (t.startsWith('-') || t.startsWith('−')) { neg = true; t = t.slice(1); }
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) {
    if (!/^\d{1,3}(,\d{3})*(\.\d+)?$/.test(t)) return NaN;
    t = t.replace(/,/g, '');
  }
  if (!/^\d*\.?\d+$/.test(t)) return NaN;
  return neg ? -Number(t) : Number(t);
}

/** US format: dot decimal, no grouping (pixel counts stay unambiguous). */
function fmt(n, maxFrac = 2) {
  if (!Number.isFinite(n)) return '–';
  return n.toLocaleString('en-US', { maximumFractionDigits: maxFrac, useGrouping: false });
}
const px = (n) => String(Math.round(n));

class InputError extends Error {}

/** Reads a field: null when empty, throws an English error with a fix when invalid. */
function readPositive(id, label, example, { max = MAX_PX } = {}) {
  const raw = $(id).value.trim();
  if (!raw) return null;
  const v = parseNum(raw);
  if (Number.isNaN(v)) {
    throw new InputError(`${label} could not be read as a number. Type digits only and use a dot for decimals (for example ${example}); leave out letters and units.`);
  }
  if (v <= 0) throw new InputError(`${label} must be greater than zero. For example, type ${example}.`);
  if (v > max) throw new InputError(`${label} looks too large (the maximum is ${fmt(max, 0)}). Check the value; you may have picked the wrong unit.`);
  return v;
}

function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }

/* ---------- Modes ---------- */
function computeA() {
  const w = readPositive('a-w', 'Width (pixels)', '3000');
  const h = readPositive('a-h', 'Height (pixels)', '2000');
  const dpi = readPositive('a-dpi', 'DPI', '300', { max: 100000 });
  if (w == null || dpi == null) return null;
  const size = (p) => { const inch = p / dpi; return { inch, cm: inch * CM_PER_INCH, mm: inch * CM_PER_INCH * 10 }; };
  const sw = size(w);
  const line = (s) => `${fmt(s.inch)} in · ${fmt(s.cm)} cm · ${fmt(s.mm)} mm`;
  const rows = [['Width', line(sw), true]];
  let summary = `${px(w)} px at ${fmt(dpi)} DPI prints ${fmt(sw.inch)} in (${fmt(sw.cm)} cm) wide.`;
  if (h != null) {
    const sh = size(h);
    rows.push(['Height', line(sh), true]);
    rows.push(['Image size', `${fmt((w * h) / 1e6)} megapixels`, false]);
    summary = `${px(w)} × ${px(h)} px at ${fmt(dpi)} DPI prints ${fmt(sw.inch)} × ${fmt(sh.inch)} in (${fmt(sw.cm)} × ${fmt(sh.cm)} cm).`;
  }
  rows.push(['Print density', `${fmt(dpi / CM_PER_INCH)} pixels / cm`, false]);
  return { title: 'Print size', rows, summary };
}

function computeB() {
  const w = readPositive('b-w', 'Width', '8.5', { max: 100000 });
  const h = readPositive('b-h', 'Height', '11', { max: 100000 });
  const dpi = readPositive('b-dpi', 'DPI', '300', { max: 100000 });
  if (w == null || dpi == null) return null;
  const unit = $('b-unit').value;
  const unitLabel = { cm: 'cm', mm: 'mm', in: 'in' }[unit];
  const toInch = (v) => (unit === 'cm' ? v / CM_PER_INCH : unit === 'mm' ? v / (CM_PER_INCH * 10) : v);
  const pxW = toInch(w) * dpi;
  const exact = (p) => (Math.abs(p - Math.round(p)) < 1e-9 ? '' : ` (exact value ${fmt(p)})`);
  const rows = [['Width needed', `${px(pxW)} pixels${exact(pxW)}`, true]];
  let summary = `${fmt(w)} ${unitLabel} at ${fmt(dpi)} DPI needs ${px(pxW)} pixels.`;
  if (h != null) {
    const pxH = toInch(h) * dpi;
    rows.push(['Height needed', `${px(pxH)} pixels${exact(pxH)}`, true]);
    rows.push(['Total', `${fmt((Math.round(pxW) * Math.round(pxH)) / 1e6)} megapixels`, false]);
    summary = `${fmt(w)} × ${fmt(h)} ${unitLabel} at ${fmt(dpi)} DPI needs ${px(pxW)} × ${px(pxH)} pixels.`;
  }
  rows.push(['Print density', `${fmt(dpi / CM_PER_INCH)} pixels / cm`, false]);
  return { title: 'Pixels needed', rows, summary };
}

/** Rough sharpness class (depends on viewing distance). */
function densityClass(ppi) {
  if (ppi < 100) return 'Low (pixels visible up close)';
  if (ppi < 160) return 'Medium';
  if (ppi < 220) return 'High';
  return 'Very high (retina class)';
}

function computeC() {
  const w = readPositive('c-w', 'Width (pixels)', '1920');
  const h = readPositive('c-h', 'Height (pixels)', '1080');
  const d = readPositive('c-d', 'Diagonal (inches)', '27', { max: 1000 });
  if (w == null || h == null || d == null) return null;
  const ppi = Math.hypot(w, h) / d;
  const wIn = w / ppi;
  const hIn = h / ppi;
  const g = gcd(Math.round(w), Math.round(h));
  const rows = [
    ['Screen density', `${fmt(ppi)} PPI`, true],
    ['Pixel size', `${fmt(CM_PER_INCH * 10 / ppi, 4)} mm`, false],
    ['Pixel density', `${fmt(ppi / CM_PER_INCH)} pixels / cm`, false],
    ['Screen dimensions', `${fmt(wIn)} × ${fmt(hIn)} in (${fmt(wIn * CM_PER_INCH)} × ${fmt(hIn * CM_PER_INCH)} cm)`, false],
    ['Resolution', `${fmt((w * h) / 1e6)} megapixels · ${Math.round(w / g)}:${Math.round(h / g)}`, false],
    ['Sharpness (rough)', densityClass(ppi), false],
  ];
  return { title: 'Screen PPI result', rows, summary: `${px(w)} × ${px(h)} pixels on a ${fmt(d)} in diagonal: ${fmt(ppi)} PPI.` };
}

const MODES = { a: computeA, b: computeB, c: computeC };

/* ---------- Interface ---------- */
const el = {
  error: $('error'), result: $('result'), title: $('r-title'), rows: $('r-rows'), line: $('r-line'), status: $('copy-status'),
};

function currentMode() { return document.querySelector('input[name="mode"]:checked').value; }

/** Draws result rows (dl). */
function fillRows(dl, rows) {
  dl.replaceChildren(...rows.map(([k, v, strong]) => {
    const div = document.createElement('div');
    div.className = `dpi-row${strong ? ' is-strong' : ''}`;
    const dt = document.createElement('dt'); dt.textContent = k;
    const dd = document.createElement('dd'); dd.textContent = v;
    div.append(dt, dd);
    return div;
  }));
}

function render() {
  showError(el.error, '');
  el.status.textContent = '';
  try {
    const res = MODES[currentMode()]();
    if (!res) { el.result.hidden = true; el.line.textContent = ''; return; }
    el.title.textContent = res.title;
    fillRows(el.rows, res.rows);
    el.line.textContent = res.summary;
    el.result.hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    el.result.hidden = true; el.line.textContent = '';
    showError(el.error, err.message);
  }
}

function showMode() {
  const m = currentMode();
  for (const id of ['a', 'b', 'c']) $(`panel-${id}`).hidden = id !== m;
  $('devices-wrap').hidden = m !== 'c'; // the example-screen table only shows in PPI mode
  render();
}

/** Copies to the clipboard; falls back to a hidden textarea when permission is missing. */
async function copyText(text, statusEl) {
  if (!text) { statusEl.textContent = 'There is no result to copy yet. Enter some values first.'; return; }
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
    statusEl.textContent = ok ? 'Result copied.' : 'Could not copy automatically; select the result and copy it by hand.';
  }
}

/* Quick DPI buttons (72 / 96 / 150 / 300) */
document.querySelectorAll('.dpi-chips').forEach((group) => {
  const input = $(group.dataset.target);
  const sync = () => {
    const v = parseNum(input.value);
    group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.dpi) === v)));
  };
  group.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    input.value = b.dataset.dpi;
    sync(); render();
  });
  input.addEventListener('input', sync);
  sync();
});

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', showMode));
['a-w', 'a-h', 'a-dpi', 'b-w', 'b-h', 'b-dpi', 'c-w', 'c-h', 'c-d'].forEach((id) => $(id).addEventListener('input', render));
$('b-unit').addEventListener('change', render);
$('copy').addEventListener('click', () => copyText(el.line.textContent, el.status));

/* Example screens table */
const tbody = $('devices');
for (const [name, w, h, d] of DEVICES) {
  const tr = document.createElement('tr');
  const cells = [name, `${w} × ${h}`, `${fmt(d)}″`, fmt(Math.hypot(w, h) / d)];
  for (const text of cells) { const td = document.createElement('td'); td.textContent = text; tr.appendChild(td); }
  const td = document.createElement('td');
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'ba-btn dpi-small'; b.textContent = 'Apply';
  b.setAttribute('aria-label', `Apply the values for ${name} to the form`);
  b.addEventListener('click', () => {
    $('c-w').value = String(w); $('c-h').value = String(h); $('c-d').value = fmt(d);
    render();
    $('c-d').focus();
  });
  td.appendChild(b); tr.appendChild(td);
  tbody.appendChild(tr);
}

/* ---------- Quick answer: my photo is X pixels, how large can it print? ---------- */
const qEl = { error: $('q-error'), box: $('q-result'), rows: $('q-rows'), papers: $('q-papers'), line: $('q-line'), status: $('q-status') };

function qualityLabel(dpi) {
  if (dpi >= 300) return 'excellent';
  if (dpi >= 200) return 'good';
  if (dpi >= 150) return 'acceptable';
  return 'low, may look pixelated';
}

/** Effective DPI when the photo fills the paper by cropping (short and long sides are matched). */
function coverDpi(pw, ph, shortCm, longCm) {
  const [ps, pl] = pw <= ph ? [pw, ph] : [ph, pw];
  return Math.min(ps / (shortCm / CM_PER_INCH), pl / (longCm / CM_PER_INCH));
}

function renderQuick() {
  showError(qEl.error, '');
  qEl.status.textContent = '';
  try {
    const w = readPositive('q-w', 'Photo width (pixels)', '3000');
    const h = readPositive('q-h', 'Photo height (pixels)', '2000');
    if (w == null) { qEl.box.hidden = true; qEl.line.textContent = ''; return; }
    const dims = (dpi) => {
      const iw = w / dpi;
      return h == null ? `${fmt(iw)} in (${fmt(iw * CM_PER_INCH)} cm)` : `${fmt(iw)} × ${fmt(h / dpi)} in (${fmt(iw * CM_PER_INCH)} × ${fmt((h / dpi) * CM_PER_INCH)} cm)`;
    };
    const rows = [
      ['300 DPI (sharpest print)', dims(300), true],
      ['200 DPI (good)', dims(200), false],
      ['150 DPI (viewed from a distance, acceptable)', dims(150), false],
    ];
    fillRows(qEl.rows, rows);
    if (h != null) {
      fillRows(qEl.papers, PAPERS.map(([name, s, l]) => {
        const dpi = coverDpi(w, h, s, l);
        return [name, `${Math.floor(dpi)} DPI · ${qualityLabel(dpi)}`, false];
      }));
      qEl.papers.parentElement.hidden = false;
    } else {
      qEl.papers.parentElement.hidden = true;
    }
    const size = h == null ? `${px(w)} px` : `${px(w)} × ${px(h)} px`;
    qEl.line.textContent = `A ${size} photo prints ${dims(300)} at 300 DPI and ${dims(150)} at 150 DPI.`;
    qEl.box.hidden = false;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    qEl.box.hidden = true; qEl.line.textContent = '';
    showError(qEl.error, err.message);
  }
}
['q-w', 'q-h'].forEach((id) => $(id).addEventListener('input', renderQuick));
$('q-copy').addEventListener('click', () => copyText(qEl.line.textContent, qEl.status));

showMode();
renderQuick();
