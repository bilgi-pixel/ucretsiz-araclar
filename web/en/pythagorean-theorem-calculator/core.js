// Pythagorean theorem: pure logic (no DOM). a² + b² = c² (c is the hypotenuse).

/** Parses a US/UK-style number: "1,234.5" -> 1234.5. Returns null when empty. */
export function parseOptional(text, label) {
  const s = String(text ?? '').trim().replace(/[\s,]/g, '');
  if (s === '') return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) throw new Error(`${label} is not a valid number. Use digits and a period for decimals (for example 3 or 4.5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} is too large. Try a smaller value.`);
  if (v <= 0) throw new Error(`${label} must be greater than zero. Side lengths cannot be negative or zero.`);
  return v;
}

/** Formats a number in US style (up to 10 decimals, trailing zeros dropped). */
export function fmt(v, max = 10) {
  const r = Number(v.toFixed(max));
  return r.toLocaleString('en-US', { maximumFractionDigits: max });
}

const gcd = (x, y) => (y ? gcd(y, x % y) : x);

/** Exactly one of a, b, c must be null; returns the missing side and derived values. */
export function solveTriangle(a, b, c) {
  const empty = [a, b, c].filter((v) => v === null).length;
  if (empty === 0) throw new Error('All three sides are filled in. Leave the side you want to find empty.');
  if (empty > 1) throw new Error('Enter at least two side lengths. Exactly one of the three fields must stay empty.');
  let missing;
  if (c === null) { c = Math.hypot(a, b); missing = 'c'; }
  else {
    const known = a === null ? b : a;
    if (c <= known) throw new Error('The hypotenuse (c) must be longer than either leg. Check your values: c is the longest side, opposite the right angle.');
    const other = Math.sqrt(c * c - known * known);
    if (a === null) { a = other; missing = 'a'; } else { b = other; missing = 'b'; }
  }
  const area = (a * b) / 2;
  const perimeter = a + b + c;
  const angleA = (Math.atan2(a, b) * 180) / Math.PI; // angle opposite side a
  const angleB = 90 - angleA;
  const height = (a * b) / c; // altitude onto the hypotenuse
  const ints = [a, b, c].map((v) => Math.round(v * 1e6) / 1e6);
  let triple = null;
  if (ints.every((v) => Number.isInteger(v)) && ints[0] ** 2 + ints[1] ** 2 === ints[2] ** 2) {
    const g = gcd(gcd(ints[0], ints[1]), ints[2]);
    triple = { values: ints, primitive: g === 1, base: ints.map((v) => v / g) };
  }
  return { a, b, c, missing, area, perimeter, angleA, angleB, height, triple };
}
