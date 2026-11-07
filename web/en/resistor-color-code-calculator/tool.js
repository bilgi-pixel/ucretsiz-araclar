// Resistor Color Code Calculator: runs entirely in your browser; your values are never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { COLORS, DIGIT_COLORS, MULT_COLORS, TOL_COLORS, PPM_COLORS, fmtOhm, decode, parseOhm, encode } from './core.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
const bandCount = () => Number(document.querySelector('input[name="n"]:checked').value);
const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 });
let last = '';

const DEFAULTS = {
  4: ['yellow', 'violet', 'red', 'gold'],
  5: ['yellow', 'violet', 'black', 'brown', 'brown'],
  6: ['yellow', 'violet', 'black', 'brown', 'brown', 'brown'],
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function roles(n) {
  const digits = n === 4 ? ['1st digit', '2nd digit'] : ['1st digit', '2nd digit', '3rd digit'];
  const r = [...digits.map((l) => ({ label: l, kind: 'digit' })), { label: 'Multiplier', kind: 'mult' }, { label: 'Tolerance', kind: 'tol' }];
  if (n === 6) r.push({ label: 'Temperature coefficient', kind: 'ppm' });
  return r;
}

function optionLabel(kind, name) {
  const c = COLORS[name];
  if (kind === 'digit') return `${cap(name)} (${c.digit})`;
  if (kind === 'mult') return `${cap(name)} (×${nf.format(c.mult)})`;
  if (kind === 'tol') return `${cap(name)} (±${nf.format(c.tol)}%)`;
  return `${cap(name)} (${c.ppm} ppm/°C)`;
}

/** Rebuilds the band selectors for the selected band count. */
function buildSelects() {
  const n = bandCount();
  const box = $('bands');
  box.textContent = '';
  roles(n).forEach((r, i) => {
    const list = { digit: DIGIT_COLORS, mult: MULT_COLORS, tol: TOL_COLORS, ppm: PPM_COLORS }[r.kind];
    const wrap = document.createElement('div');
    wrap.className = 'ba-field';
    const label = document.createElement('label');
    label.htmlFor = `b${i}`; label.textContent = `Band ${i + 1} – ${r.label}`;
    const sel = document.createElement('select');
    sel.id = `b${i}`;
    for (const name of list) {
      const o = document.createElement('option');
      o.value = name; o.textContent = optionLabel(r.kind, name);
      sel.append(o);
    }
    sel.value = DEFAULTS[n][i];
    wrap.append(label, sel);
    box.append(wrap);
  });
}

function syncMode() {
  const m = mode();
  $('p-renk').hidden = m !== 'color';
  $('p-deger').hidden = m !== 'value';
  $('calc').textContent = m === 'color' ? 'Find the value' : 'Find the colors';
}

function drawResistor(bands) {
  const n = bands.length;
  const xs = n === 4 ? [58, 82, 106, 150] : n === 5 ? [54, 74, 94, 114, 154] : [50, 68, 86, 104, 140, 164];
  const rects = bands.map((c, i) => `<rect x="${xs[i]}" y="14" width="10" height="42" fill="${COLORS[c].hex}" stroke="rgba(0,0,0,.35)" stroke-width=".6"/>`).join('');
  $('r-svg').innerHTML = `<line x1="4" y1="35" x2="216" y2="35" stroke="#888" stroke-width="3"/>`
    + `<rect x="36" y="14" width="148" height="42" rx="14" fill="#e4cf9f" stroke="#a88f55"/>${rects}`;
}

function showBands(bands) {
  const n = bands.length;
  const rl = n === 4 ? ['1st digit', '2nd digit', 'Multiplier', 'Tolerance'] : n === 5 ? ['1st digit', '2nd digit', '3rd digit', 'Multiplier', 'Tolerance'] : ['1st digit', '2nd digit', '3rd digit', 'Multiplier', 'Tolerance', 'Temperature coefficient'];
  const ol = $('r-bands');
  ol.textContent = '';
  bands.forEach((c, i) => {
    const li = document.createElement('li');
    const sw = document.createElement('span');
    sw.className = 'rc-sw'; sw.style.background = COLORS[c].hex; sw.setAttribute('aria-hidden', 'true');
    li.append(sw, document.createTextNode(`${i + 1}. ${cap(c)} – ${rl[i]}`));
    ol.append(li);
  });
  drawResistor(bands);
}

function render(bands, d) {
  const val = fmtOhm(d.ohm);
  $('r-big').textContent = `${val} ±${nf.format(d.tol)}%`;
  $('r-value').textContent = `${val} (${nf.format(d.ohm)} Ω)`;
  $('r-tol').textContent = `±${nf.format(d.tol)}%`;
  $('r-range').textContent = `${fmtOhm(d.min)} – ${fmtOhm(d.max)}`;
  const ppmRow = $('r-ppm').closest('.kdv-row');
  ppmRow.hidden = d.ppm == null;
  if (d.ppm != null) $('r-ppm').textContent = `${d.ppm} ppm/°C`;
  showBands(bands);
  last = `${val} ±${nf.format(d.tol)}% · bands: ${bands.join(', ')}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try {
    if (mode() === 'color') {
      const bands = roles(bandCount()).map((_, i) => $(`b${i}`).value);
      render(bands, decode(bands));
    } else {
      const ohm = parseOhm($('val').value);
      const n = Number(document.querySelector('input[name="n2"]:checked').value);
      const bands = encode(ohm, n, $('tol').value);
      render(bands, decode(bands));
    }
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

for (const name of ['brown', 'red', 'green', 'blue', 'violet', 'grey', 'gold', 'silver']) {
  const o = document.createElement('option');
  o.value = name; o.textContent = optionLabel('tol', name);
  $('tol').append(o);
}
$('tol').value = 'gold';

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncMode));
document.querySelectorAll('input[name="n"]').forEach((r) => r.addEventListener('change', buildSelects));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
buildSelects();
syncMode();
