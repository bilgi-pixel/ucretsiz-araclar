// Square Root Calculator: runs entirely in your browser; numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { parseNumber, computeRoot, computePower, fmt } from './core.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
const nf = new Intl.NumberFormat('en-US');
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');
let last = '';

function setRow(id, text) {
  const row = $(id).closest('.kdv-row');
  row.hidden = text == null;
  if (text != null) $(id).textContent = text;
}

function syncLabels() {
  const root = mode() === 'root';
  $('n-label').textContent = root ? 'Root degree (2 = square root, 3 = cube root)' : 'Exponent (power)';
  $('n-hint').textContent = root ? 'A whole number from 2 to 100. Use 2 for a square root and 3 for a cube root.' : 'Can be positive, negative or a decimal (for example 3, -2, 0.5).';
  $('calc').textContent = root ? 'Calculate root' : 'Calculate power';
}

function render(o) {
  $('r-big').textContent = o.big;
  setRow('r-value', o.value);
  setRow('r-simple', o.simple ?? null);
  setRow('r-perfect', o.perfect ?? null);
  setRow('r-lower', o.lower ?? null);
  setRow('r-upper', o.upper ?? null);
  setRow('r-digits', o.digits ?? null);
  last = `${o.big}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function ordinal(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${({ 1: 'st', 2: 'nd', 3: 'rd' })[n % 10] || 'th'}`;
}

function run() {
  showError($('error'), '');
  try {
    const x = parseNumber($('x').value, 'Number');
    const n = parseNumber($('n').value, mode() === 'root' ? 'Root degree' : 'Exponent');
    if (mode() === 'root') {
      const r = computeRoot(x, n);
      const sym = n === 2 ? '√' : n === 3 ? '∛' : `${ordinal(n)} root of `;
      const o = { big: `${sym}${fmt(x)} = ${fmt(r.value)}`, value: fmt(r.value) };
      if (!r.negative && r.simple && r.simple !== fmt(r.value)) o.simple = `${r.simple}  (simplified radical form)`;
      if (Number.isInteger(x) && !r.negative) {
        const nameN = n === 2 ? 'perfect square' : n === 3 ? 'perfect cube' : `perfect ${ordinal(n)} power`;
        o.perfect = r.perfect ? `Yes, ${nf.format(x)} is a ${nameN}` : `No, ${nf.format(x)} is not a ${nameN}`;
        if (!r.perfect) {
          o.lower = `${nf.format(r.lowerRoot)}${sup(n)} = ${nf.format(r.lower)} (nearest smaller ${nameN})`;
          o.upper = `${nf.format(r.lowerRoot + 1)}${sup(n)} = ${nf.format(r.upper)} (nearest larger ${nameN})`;
        }
      }
      render(o);
    } else {
      const r = computePower(x, n);
      const value = r.exact !== null ? nf.format(r.exact) : fmt(r.value);
      const o = { big: `${fmt(x)}${Number.isInteger(n) && n >= 0 && n < 10 ? sup(n) : ' ^ ' + fmt(n)} = ${value}`, value };
      if (r.digits !== null) o.digits = `${nf.format(r.digits)}-digit exact result`;
      render(o);
    }
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncLabels));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => { $('x').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = ''; showError($('error'), ''); $('x').focus(); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
syncLabels();
