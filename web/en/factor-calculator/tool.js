// Factor Calculator: runs entirely in your browser; your numbers are never sent anywhere.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US');
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');

export const MAX_N = 1e12;

/** "360", "1 000", "1,000" -> integer; NaN when invalid. Commas and spaces are thousands separators. */
export function parseInt10(s) {
  const t = String(s ?? '').trim().replace(/[\s,]/g, '');
  return /^\d+$/.test(t) ? Number(t) : NaN;
}

/** All positive factors of n in ascending order; trial division up to sqrt(n). */
export function divisors(n) {
  const small = [], large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i !== n / i) large.push(n / i);
    }
  }
  return small.concat(large.reverse());
}

/** Prime factorization: [[prime, exponent], ...]. */
export function factorize(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    if (m % p === 0) {
      let e = 0;
      while (m % p === 0) { m /= p; e++; }
      out.push([p, e]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

/** Builds the full result; throws an English error that suggests a fix for bad input. */
export function compute(raw) {
  const n = parseInt10(raw);
  if (Number.isNaN(n)) throw new Error('Enter a positive whole number (for example 360). Do not use letters, decimals or a minus sign.');
  if (n < 1) throw new Error('The number must be at least 1. Zero has infinitely many factors; enter 1 or a larger whole number.');
  if (n > MAX_N) throw new Error('That number is too large; the maximum is 1,000,000,000,000 (10^12). Try a smaller number.');
  const list = divisors(n);
  const sum = list.reduce((a, b) => a + b, 0);
  const proper = sum - n;
  const factors = factorize(n);
  let kind;
  if (n === 1) kind = 'Neither prime nor composite (1 is a special case)';
  else if (list.length === 2) kind = 'Prime number';
  else kind = 'Composite number';
  const perfect = proper === n ? 'Perfect number (proper factors add up to the number)'
    : proper > n ? 'Abundant number (proper factors add up to more than the number)' : 'Deficient number (proper factors add up to less than the number)';
  return {
    n, list, count: list.length, sum, proper, kind, perfect, factors,
    factorText: n === 1 ? '1' : factors.map(([p, e]) => (e > 1 ? `${nf.format(p)}${sup(e)}` : nf.format(p))).join(' × '),
    isSquare: list.length % 2 === 1,
  };
}

/* ---------- Interface ---------- */
function render(r) {
  $('r-big').textContent = `${nf.format(r.n)} has ${nf.format(r.count)} factors`;
  $('r-count').textContent = nf.format(r.count);
  $('r-sum').textContent = nf.format(r.sum);
  $('r-proper').textContent = nf.format(r.proper);
  $('r-kind').textContent = r.kind;
  $('r-perfect').textContent = r.perfect;
  $('r-factors').textContent = r.factorText;
  $('r-list').textContent = r.list.map((d) => nf.format(d)).join(', ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('n').value);
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
    $('n').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('n').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `Factors of ${nf.format(last.n)} (${last.count}): ${last.list.map((d) => nf.format(d)).join(', ')}. Sum of factors: ${nf.format(last.sum)}. Prime factorization: ${last.factorText}.`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Result copied to the clipboard.'; }
    catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
  });
}
