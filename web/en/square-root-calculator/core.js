// Square root, nth root and exponent math: pure logic (no DOM).

/** Parses US-style numbers: "1,234.5" -> 1234.5 ; "2.5" -> 2.5 ; "1,000" -> 1000. */
export function parseNumber(text, label = 'Number') {
  let s = String(text ?? '').trim().replace(/\s/g, '');
  if (s === '') throw new Error(`${label} is empty. Type a number (for example 72 or 2.5).`);
  s = s.replace(/,/g, '');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) throw new Error(`${label} is not a valid number. Use digits and a decimal point only (for example 72 or 2.5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} is too large. Try a smaller number.`);
  return v;
}

function factorize(n) {
  const out = [];
  let m = n;
  const take = (p) => { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) out.push([p, e]); };
  take(2); take(3);
  for (let p = 5; p * p <= m; p += 6) { take(p); take(p + 2); }
  if (m > 1) out.push([m, 1]);
  return out;
}

/** nth root for x >= 0; exact roots come back without rounding error. */
export function rootOf(x, n) {
  if (x === 0) return 0;
  const r = Math.pow(x, 1 / n);
  const k = Math.round(r);
  if (Math.abs(r - k) < 1e-9 && Math.pow(k, n) === x) return k;
  return r;
}

/** Simplifies the root of an integer: x^(1/n) = outside * inside^(1/n). */
export function simplifyRoot(x, n) {
  if (!Number.isInteger(x) || x < 1 || x > 1e12) return null;
  let outside = 1, inside = 1;
  for (const [p, e] of factorize(x)) {
    outside *= Math.pow(p, Math.floor(e / n));
    inside *= Math.pow(p, e % n);
  }
  return { outside, inside };
}

/** Nearest lower and upper perfect nth powers (x >= 0). */
export function neighbourPowers(x, n) {
  const r = Math.floor(rootOf(x, n) + 1e-9);
  const lo = Math.pow(r, n);
  const hi = Math.pow(r + 1, n);
  return { r, lo, hi, perfect: lo === x || Math.pow(Math.round(rootOf(x, n)), n) === x };
}

const SYMBOL = { 2: '√', 3: '∛', 4: '∜' };
export function radicalText(x, n, s) {
  const sym = SYMBOL[n] ?? `root${n} `;
  if (!s) return null;
  if (s.inside === 1) return String(s.outside);
  if (s.outside === 1) return `${sym}${s.inside}`;
  return `${s.outside}${sym}${s.inside}`;
}

/** Root calculation. n is an integer >= 2. Negative radicands work only for odd n. */
export function computeRoot(x, n) {
  if (!Number.isInteger(n) || n < 2 || n > 100) throw new Error('The root degree must be a whole number from 2 to 100 (2 = square root, 3 = cube root).');
  if (x < 0) {
    if (n % 2 === 0) {
      const mag = rootOf(-x, n);
      throw new Error(`An even root of a negative number is not a real number. In complex numbers it is about ${mag.toLocaleString('en-US', { maximumFractionDigits: 6 })}i (where i² = −1). Enter a positive number for a real result.`);
    }
    const r = computeRoot(-x, n);
    return { ...r, value: -r.value, negative: true, simple: r.simple ? '−' + r.simple : null };
  }
  const value = rootOf(x, n);
  const simple = radicalText(x, n, simplifyRoot(x, n));
  const nb = neighbourPowers(x, n);
  return { x, n, value, simple, perfect: Number.isInteger(value) && Math.pow(value, n) === x, lower: nb.lo, upper: nb.hi, lowerRoot: nb.r, negative: false };
}

/** Power calculation x^e. Integer base with a small non-negative integer exponent gives an exact BigInt result. */
export function computePower(x, e) {
  if (!Number.isFinite(e)) throw new Error('The exponent is not valid. Type a number (for example 3, -2 or 0.5).');
  if (x === 0 && e < 0) throw new Error('Zero raised to a negative power is undefined (division by zero). Change the base or the exponent.');
  if (Number.isInteger(x) && Number.isInteger(e) && e >= 0 && e <= 2000 && Math.abs(x) <= 1e9) {
    const big = BigInt(x) ** BigInt(e);
    const digits = big.toString().replace('-', '').length;
    if (digits <= 400) return { exact: big, value: Number(big), digits };
  }
  const value = Math.pow(x, e);
  if (Number.isNaN(value)) throw new Error('This is undefined for real numbers (a negative base with a fractional exponent). Use a positive base or a whole-number exponent.');
  if (!Number.isFinite(value)) throw new Error('The result is too large to display. Try a smaller base or exponent.');
  return { exact: null, value, digits: null };
}

/** Number formatting (en-US). */
export function fmt(v) {
  if (Object.is(v, -0)) v = 0;
  const a = Math.abs(v);
  if (a !== 0 && (a >= 1e15 || a < 1e-9)) { const [mant, ex] = v.toExponential(8).split('e'); const m = mant.includes('.') ? mant.replace(/0+$/, '').replace(/[.]$/, '') : mant; return m + ' × 10^' + ex.replace('+', '').replace('-', '−'); }
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(v);
}
