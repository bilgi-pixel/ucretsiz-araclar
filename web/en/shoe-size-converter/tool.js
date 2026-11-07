// Shoe Size Converter: runs entirely in your browser; your numbers are never sent anywhere.
// Note: there is no single official conversion standard between brands; results are approximate.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** Allowance added to foot length (cm), Paris point logic: EU = (cm + allowance) x 1.5. */
export const ALLOWANCE_CM = 1.5;

/** System offsets relative to the EU size. Approximate values for adult sizes. */
export const OFFSET = { uk: 34, usm: 33, usw: 31.5 };

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const half = (x) => Math.round(x * 2) / 2;

/** "42.5" -> number; NaN when invalid. */
export function parseNum(s) {
  const t = String(s ?? '').trim();
  return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Finds the EU size from the source system. */
export function toEU(system, v) {
  if (system === 'eu') return v;
  if (system === 'cm') return half((v + ALLOWANCE_CM) * 1.5);
  return v + OFFSET[system];
}

/** Produces the equivalent in every system; throws an English error that suggests a fix for bad input. */
export function convert(system, raw) {
  const v = parseNum(raw);
  if (Number.isNaN(v)) throw new Error('Enter a valid number (for example 9 or 9.5). Do not use letters or unit suffixes.');
  if (system === 'cm' && (v < 9 || v > 36)) throw new Error('Foot length must be between 9 and 36 cm. Measure from the heel to the tip of the longest toe in centimeters and try again.');
  const eu = half(toEU(system, v));
  if (eu < 16 || eu > 56) throw new Error('That size is outside the usual shoe range (EU 16 to 56). Check the sizing system you selected and the number you entered.');
  const cm = eu / 1.5 - ALLOWANCE_CM;
  return { eu, uk: eu - OFFSET.uk, usm: eu - OFFSET.usm, usw: eu - OFFSET.usw, cm, inch: cm / 2.54, fromCm: system === 'cm' ? v : null };
}

/* ---------- Interface ---------- */
const show = (id, v, suffix = '') => { $(id).textContent = v === null ? '—' : `${nf.format(v)}${suffix}`; };

function render(r) {
  show('r-eu', r.eu);
  show('r-uk', r.uk >= 1 ? r.uk : null);
  show('r-usm', r.usm >= 1 ? r.usm : null);
  show('r-usw', r.usw >= 1 ? r.usw : null);
  show('r-cm', r.cm, ' cm');
  show('r-in', r.inch, ' in');
  $('r-big').textContent = `EU ${nf.format(r.eu)} ≈ UK ${r.uk >= 1 ? nf.format(r.uk) : '—'} ≈ US men's ${r.usm >= 1 ? nf.format(r.usm) : '—'} ≈ US women's ${r.usw >= 1 ? nf.format(r.usw) : '—'}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = convert($('system').value, $('value').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  const hints = { eu: 'European (Paris point) size, for example 42', uk: 'UK size, for example 8', usm: "US men's size, for example 9", usw: "US women's size, for example 10.5", cm: 'Foot length in centimeters, for example 26.5' };
  const syncHint = () => { $('value-hint').textContent = hints[$('system').value]; };
  const runIfValue = () => { if ($('value').value.trim()) run(); };
  $('system').addEventListener('change', () => { syncHint(); runIfValue(); });
  syncHint();
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('value').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('value').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `EU ${nf.format(last.eu)} / UK ${nf.format(last.uk)} / US men's ${nf.format(last.usm)} / US women's ${nf.format(last.usw)} / foot length about ${nf.format(last.cm)} cm (approximate values).`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Result copied to the clipboard.'; }
    catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
  });
}
