// Exponent, Root and Logarithm Calculator: runs entirely in your browser; your numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/** "-2.5", "1e3" -> number; NaN when invalid. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '');
  return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(t) ? Number(t) : NaN;
}

/** Rounds to 12 significant digits to remove floating point noise. */
export function fmt(x) {
  if (!Number.isFinite(x)) return String(x);
  if (x === 0) return '0';
  const a = Math.abs(x);
  const r = Number(x.toPrecision(12));
  if (a >= 1e15 || a < 1e-9) return r.toExponential().replace('e+', ' × 10^').replace('e-', ' × 10^-');
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(r);
}

const BAD = (msg) => ({ ok: false, text: msg });
const OK = (v) => ({ ok: true, value: v, text: fmt(v) });

/** a to the power b. */
export function power(a, b) {
  const v = Math.pow(a, b);
  if (Number.isNaN(v)) return BAD('undefined (a negative base with a fractional exponent is not a real number)');
  if (!Number.isFinite(v)) return BAD('too large (the result overflows)');
  return OK(v);
}

/** The b-th root of a. */
export function root(a, b) {
  if (b === 0) return BAD('undefined (the root index cannot be 0)');
  if (a < 0) {
    if (Number.isInteger(b) && Math.abs(b) % 2 === 1) return OK(-Math.pow(-a, 1 / b));
    return BAD('undefined (an even root of a negative number is not a real number)');
  }
  return OK(Math.pow(a, 1 / b));
}

/** Logarithm of a in base b. */
export function logBase(a, b) {
  if (a <= 0) return BAD('undefined (logarithms exist only for positive numbers)');
  if (b <= 0 || b === 1) return BAD('undefined (the base must be positive and not equal to 1)');
  const v = b === 2 ? Math.log2(a) : b === 10 ? Math.log10(a) : Math.log(a) / Math.log(b);
  return OK(v);
}

/** Produces all results; throws an English error that suggests a fix for bad input. */
export function compute(aRaw, bRaw) {
  const a = parseNum(aRaw), b = parseNum(bRaw);
  if (Number.isNaN(a)) throw new Error('Enter a valid number in "Number (a)" (for example 1024, -8 or 2.5). Do not use letters or unit suffixes.');
  if (Number.isNaN(b)) throw new Error('Enter a valid number in "Exponent / base / root index (b)" (for example 2, 10 or 0.5).');
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('That number is too large. Try a smaller value, or scientific notation such as 1e12.');
  return {
    a, b,
    pow: power(a, b),
    root: root(a, b),
    logb: logBase(a, b),
    log10: logBase(a, 10),
    log2: logBase(a, 2),
    ln: a > 0 ? OK(Math.log(a)) : BAD('undefined (logarithms exist only for positive numbers)'),
  };
}

/* ---------- Interface ---------- */
function render(r) {
  $('r-big').textContent = r.pow.ok ? `${fmt(r.a)} ^ ${fmt(r.b)} = ${r.pow.text}` : `${fmt(r.a)} ^ ${fmt(r.b)}: ${r.pow.text}`;
  $('r-pow').textContent = r.pow.text;
  $('r-root').textContent = r.root.text;
  $('r-logb').textContent = r.logb.text;
  $('r-log10').textContent = r.log10.text;
  $('r-log2').textContent = r.log2.text;
  $('r-ln').textContent = r.ln.text;
  $('l-pow').textContent = `${fmt(r.a)} to the power ${fmt(r.b)}`;
  $('l-root').textContent = `Root ${fmt(r.b)} of ${fmt(r.a)}`;
  $('l-logb').textContent = `log base ${fmt(r.b)} of ${fmt(r.a)}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('a').value, $('b').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('a').value = ''; $('b').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('a').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `a = ${fmt(last.a)}, b = ${fmt(last.b)}: a^b = ${last.pow.text}; b-th root = ${last.root.text}; log_b(a) = ${last.logb.text}; log10(a) = ${last.log10.text}; ln(a) = ${last.ln.text}.`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Result copied to the clipboard.'; }
    catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
  });
}
