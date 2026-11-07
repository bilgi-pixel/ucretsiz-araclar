// Volume Calculator: runs entirely in your browser; your numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Length units -> meters. */
const UNITS = { mm: 0.001, cm: 0.01, m: 1, in: 0.0254, ft: 0.3048 };
const US_GALLON_M3 = 0.003785411784;

/** Shape definitions: field labels, volume and surface area formulas. */
export const SHAPES = {
  cube: { name: 'Cube', fields: ['Side length (a)'], vol: (a) => a ** 3, area: (a) => 6 * a * a },
  box: { name: 'Rectangular box', fields: ['Width (a)', 'Length (b)', 'Height (h)'], vol: (a, b, h) => a * b * h, area: (a, b, h) => 2 * (a * b + a * h + b * h) },
  cylinder: { name: 'Cylinder', fields: ['Radius (r)', 'Height (h)'], vol: (r, h) => Math.PI * r * r * h, area: (r, h) => 2 * Math.PI * r * (r + h) },
  cone: { name: 'Cone', fields: ['Radius (r)', 'Height (h)'], vol: (r, h) => Math.PI * r * r * h / 3, area: (r, h) => Math.PI * r * (r + Math.hypot(r, h)) },
  sphere: { name: 'Sphere', fields: ['Radius (r)'], vol: (r) => 4 / 3 * Math.PI * r ** 3, area: (r) => 4 * Math.PI * r * r },
  pyramid: { name: 'Square pyramid', fields: ['Base side (a)', 'Height (h)'], vol: (a, h) => a * a * h / 3, area: (a, h) => a * a + 2 * a * Math.sqrt(a * a / 4 + h * h) },
};

/** "12.5" -> number; NaN when invalid. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '');
  return /^\d*\.?\d+$|^\d+\.$/.test(t) ? Number(t) : NaN;
}

/** Readable number (scientific notation when huge or tiny). */
export function fmt(x) {
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e12 || a < 1e-6) return x.toExponential(4);
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(x);
}

/** Computes the result; throws an English error that suggests a fix. */
export function compute(shapeKey, values, unit) {
  const s = SHAPES[shapeKey];
  if (!s) throw new Error('No shape selected. Choose a shape from the list.');
  const nums = values.slice(0, s.fields.length).map(parseNum);
  for (let i = 0; i < nums.length; i++) {
    if (Number.isNaN(nums[i])) throw new Error(`Enter a valid number in "${s.fields[i]}" (for example 12.5). Letters, commas and negative values are not accepted.`);
    if (nums[i] <= 0) throw new Error(`"${s.fields[i]}" must be greater than zero. Check the measurement and try again.`);
  }
  const f = UNITS[unit] ?? 1;
  const vol = s.vol(...nums), area = s.area(...nums);
  if (!Number.isFinite(vol)) throw new Error('The values are too large to calculate. Try a smaller unit or smaller numbers.');
  const m3 = vol * f ** 3;
  return { name: s.name, unit, vol, area, m3, liter: m3 * 1000, cm3: m3 * 1e6, gallons: m3 / US_GALLON_M3 };
}

/* ---------- Interface ---------- */
function syncFields() {
  const s = SHAPES[$('shape').value];
  for (let i = 0; i < 3; i++) {
    const wrap = $('f' + i + '-wrap');
    wrap.hidden = i >= s.fields.length;
    if (i < s.fields.length) $('f' + i + '-label').textContent = s.fields[i];
  }
}

function render(r) {
  $('r-big').textContent = `${r.name}: ${fmt(r.vol)} ${r.unit}³`;
  $('r-vol').textContent = `${fmt(r.vol)} ${r.unit}³`;
  $('r-m3').textContent = `${fmt(r.m3)} m³`;
  $('r-l').textContent = `${fmt(r.liter)} L`;
  $('r-gal').textContent = `${fmt(r.gallons)} US gal`;
  $('r-cm3').textContent = `${fmt(r.cm3)} cm³`;
  $('r-area').textContent = `${fmt(r.area)} ${r.unit}²`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('shape').value, [$('f0').value, $('f1').value, $('f2').value], $('unit').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('shape').addEventListener('change', () => { syncFields(); $('result').hidden = true; $('result').classList.remove('is-active'); });
  syncFields();
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    ['f0', 'f1', 'f2'].forEach((id) => { $(id).value = ''; });
    $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('f0').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `${last.name}: volume ${fmt(last.vol)} ${last.unit}³ (${fmt(last.liter)} L, ${fmt(last.gallons)} US gal, ${fmt(last.m3)} m³); surface area ${fmt(last.area)} ${last.unit}².`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Result copied to the clipboard.'; }
    catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
  });
}
