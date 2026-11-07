// Concrete Calculator (EN) — runs entirely in the browser; no measurements are sent anywhere.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = (max, min = 0) => new Intl.NumberFormat('en-US', { minimumFractionDigits: min, maximumFractionDigits: max });
const nf0 = nf(0), nf2 = nf(2, 2), nf3 = nf(3, 3), nfx = nf(3);
const FT3_PER_YD3 = 27;
const FT3_PER_M3 = 35.3146667;
// Bag yields in cubic feet (typical pre-mixed bags; check the label of the product you buy)
const BAGS = { 80: 0.6, 60: 0.45, 40: 0.3 };

/** Parses a US-style number: "12", "12.5", "1,250.75". Returns NaN when invalid. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '').replace(/^\$/, '');
  if (!t || t === '.' || !/^(\d{1,3}(,\d{3})+|\d*)(\.\d*)?$/.test(t)) return NaN;
  return Number(t.replace(/,/g, ''));
}

/** Pure calculation: volume in cubic feet and waste percentage → all results. */
export function calcConcrete(netFt3, wastePct, pricePerYd3) {
  const totalFt3 = netFt3 * (1 + wastePct / 100);
  const yd3 = totalFt3 / FT3_PER_YD3;
  const bags = {};
  for (const [lb, yieldFt3] of Object.entries(BAGS)) bags[lb] = Math.ceil(Math.round((totalFt3 / yieldFt3) * 1e6) / 1e6 - 1e-9);
  return {
    netFt3, totalFt3, yd3,
    netYd3: netFt3 / FT3_PER_YD3,
    m3: totalFt3 / FT3_PER_M3,
    bags,
    // Ready-mix plants usually sell in quarter-yard steps
    orderYd3: Math.ceil(Math.round(yd3 * 4 * 1e6) / 1e6 - 1e-9) / 4,
    cost: pricePerYd3 == null ? null : yd3 * pricePerYd3,
  };
}

const FIELDS = {
  rect: [
    ['f-len', 'Length', 'len'],
    ['f-wid', 'Width', 'len'],
    ['f-thk', 'Thickness', 'thin'],
  ],
  round: [
    ['f-dia', 'Diameter', 'thin'],
    ['f-hgt', 'Depth or height', 'len'],
  ],
};
let lastText = null;

function unit() { return $('f-unit').value === 'metric' ? 'metric' : 'imperial'; }

function fieldError(msg, id) { const e = new Error(msg); e.fieldId = id; return e; }

/** Reads one positive number field and converts it to feet. */
function readFeet(id, name, kind, warns) {
  const raw = $(id).value;
  const m = unit() === 'metric';
  const ex = $(id).placeholder.replace('e.g. ', '');
  if (!String(raw).trim()) throw fieldError(`${name} is empty. Enter a number, for example ${ex}.`, id);
  const v = parseNum(raw);
  if (Number.isNaN(v)) throw fieldError(`${name} could not be read. Use digits and a dot for decimals, for example ${ex} or 2.5.`, id);
  if (v <= 0) throw fieldError(`${name} must be greater than zero. Check the measurement and try again.`, id);
  let ft;
  if (kind === 'len') ft = m ? v * 3.280839895 : v;
  else ft = m ? v / 30.48 : v / 12;
  if (kind === 'len' && ft > 500) warns.push(`${name} is over 500 feet, which is unusually large. Check that the unit selector matches your numbers.`);
  if (kind === 'thin' && ft > 10) warns.push(`${name} is over 10 feet. Thickness and diameter are entered in ${m ? 'centimeters' : 'inches'}, so check you did not type feet.`);
  if (kind === 'thin' && id === 'f-thk' && ft < 2 / 12) warns.push(`${name} is under 2 inches. Slabs poured thinner than about 2 inches (5 cm) crack easily; most patios and walkways use 4 inches (10 cm).`);
  return ft;
}

function readVolume() {
  const shape = $('f-shape').value === 'round' ? 'round' : 'rect';
  const warns = [];
  const v = FIELDS[shape].map(([id, name, kind]) => readFeet(id, name, kind, warns));
  const qRaw = $('f-qty').value.trim();
  const qty = qRaw === '' ? 1 : parseNum(qRaw);
  if (Number.isNaN(qty) || qty < 1 || !Number.isInteger(qty)) throw fieldError('Number of pieces must be a whole number of 1 or more, for example 1 or 4.', 'f-qty');
  const ft3 = (shape === 'rect' ? v[0] * v[1] * v[2] : Math.PI * (v[0] / 2) ** 2 * v[1]) * qty;
  if (!Number.isFinite(ft3)) throw fieldError('The result is too large to calculate. Check the measurements and the unit selector.', FIELDS[shape][0][0]);
  const label = shape === 'rect' ? 'Slab, wall or footing' : 'Round column or tube';
  return { shape, ft3, qty, warns, label };
}

function readSettings() {
  const wRaw = $('f-waste').value.trim();
  const waste = wRaw === '' ? 10 : parseNum(wRaw);
  if (Number.isNaN(waste)) throw fieldError('Extra for waste could not be read. Enter a percentage such as 10.', 'f-waste');
  if (waste < 0 || waste > 50) throw fieldError('Extra for waste must be between 0% and 50%. Most jobs use 5% to 10%.', 'f-waste');
  const pRaw = $('f-price').value.trim();
  let price = null;
  if (pRaw !== '') {
    price = parseNum(pRaw);
    if (Number.isNaN(price) || price < 0) throw fieldError('Price per cubic yard could not be read. Enter an amount such as 165 or 165.50, or leave the box empty.', 'f-price');
  }
  return { waste, price };
}

function fail(err) {
  $('result').hidden = true; $('result').classList.remove('is-active'); lastText = null;
  setWarnings([]);
  showError($('error'), err.message || String(err));
  const f = err.fieldId && $(err.fieldId);
  if (f) { f.setAttribute('aria-invalid', 'true'); f.focus(); }
}

function setWarnings(list) {
  const el = $('warn');
  el.textContent = '';
  el.hidden = list.length === 0;
  if (list.length) { const s = document.createElement('strong'); s.textContent = 'Check: '; el.append(s, list.join(' ')); }
}

function run() {
  showError($('error'), '');
  document.querySelectorAll('#form [aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  $('copy-status').textContent = '';
  try {
    const vol = readVolume();
    const s = readSettings();
    const r = calcConcrete(vol.ft3, s.waste, s.price);
    $('r-head').textContent = `${nf2.format(r.yd3)} cubic yards of concrete (waste included)`;
    $('r-what').textContent = `${vol.label}${vol.qty > 1 ? `, ${nf0.format(vol.qty)} pieces` : ''}`;
    $('r-net').textContent = `${nf2.format(r.netYd3)} yd³ (${nf2.format(r.netFt3)} ft³)`;
    $('r-total').textContent = `${nf2.format(r.yd3)} yd³`;
    $('r-ft').textContent = `${nf2.format(r.totalFt3)} ft³`;
    $('r-m').textContent = `${nf3.format(r.m3)} m³`;
    $('r-order').textContent = `${nf2.format(r.orderYd3)} yd³ (rounded up to the next quarter yard)`;
    $('r-b80').textContent = nf0.format(r.bags[80]);
    $('r-b60').textContent = nf0.format(r.bags[60]);
    $('r-b40').textContent = nf0.format(r.bags[40]);
    $('r-cost').textContent = r.cost === null ? 'No price entered' : `$${nf2.format(r.cost)}`;
    setWarnings(vol.warns);
    $('result').hidden = false; $('result').classList.add('is-active');
    lastText = [
      'Concrete estimate - Bilişim Ajans Free Tools',
      `Shape: ${vol.label}${vol.qty > 1 ? ` x ${vol.qty}` : ''}`,
      `Net volume: ${nf2.format(r.netYd3)} yd3 (${nf2.format(r.netFt3)} ft3)`,
      `With ${nfx.format(s.waste)}% extra: ${nf2.format(r.yd3)} yd3 = ${nf2.format(r.totalFt3)} ft3 = ${nf3.format(r.m3)} m3`,
      `Ready-mix order: ${nf2.format(r.orderYd3)} yd3`,
      `Bags: ${r.bags[80]} x 80 lb, or ${r.bags[60]} x 60 lb, or ${r.bags[40]} x 40 lb`,
      `Estimated cost: ${r.cost === null ? 'no price entered' : '$' + nf2.format(r.cost)}`,
      'Estimates only: confirm quantities with your supplier.',
    ].join('\n');
  } catch (err) { fail(err); }
}

function syncShape() {
  const shape = $('f-shape').value;
  $('g-rect').hidden = shape !== 'rect';
  $('g-round').hidden = shape !== 'round';
}

function syncUnit() {
  const m = unit() === 'metric';
  document.querySelectorAll('#form .u-len').forEach((el) => { el.textContent = m ? 'm' : 'ft'; });
  document.querySelectorAll('#form .u-thin').forEach((el) => { el.textContent = m ? 'cm' : 'in'; });
  const ph = m ? { 'f-len': '4', 'f-wid': '3', 'f-thk': '10', 'f-dia': '30', 'f-hgt': '1.2' } : { 'f-len': '12', 'f-wid': '10', 'f-thk': '4', 'f-dia': '12', 'f-hgt': '4' };
  for (const [id, v] of Object.entries(ph)) $(id).placeholder = 'e.g. ' + v;
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('f-shape').addEventListener('change', () => { syncShape(); showError($('error'), ''); });
$('f-unit').addEventListener('change', syncUnit);
$('clear').addEventListener('click', () => {
  $('form').reset(); syncShape(); syncUnit(); setWarnings([]);
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); lastText = null; $('copy-status').textContent = '';
  $('f-shape').focus();
});
$('copy').addEventListener('click', async () => {
  if (!lastText) return;
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Estimate copied to the clipboard.'; }
  catch { $('copy-status').textContent = 'Could not copy automatically. Select the numbers and copy them by hand.'; }
});
syncShape();
syncUnit();
