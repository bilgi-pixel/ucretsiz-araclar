// Prime and factor math: pure logic (no DOM).
export const MAX_N = 999999999999999; // 10^15 - 1: safe for Number and fast for 6k±1 trial division

/** Parses user text to an integer; commas, spaces and underscores count as thousands separators. */
export function parseInteger(text) {
  const raw = String(text ?? '').trim().replace(/[,\s_']/g, '');
  if (raw === '') throw new Error('Enter a number first. For example, type 360 or 1,000,003.');
  if (/^-/.test(raw)) throw new Error('Negative numbers are not factored into primes. Enter a positive whole number.');
  if (!/^\d+$/.test(raw)) throw new Error('Use digits only; letters, decimals and fractions are not allowed. Example: 360');
  const n = Number(raw);
  if (n > MAX_N) throw new Error('That number is too large. This tool works up to 999,999,999,999,999 (15 digits); enter a smaller number.');
  return n;
}

const mulmod = (a, b, m) => (a * b) % m;
function powmod(b, e, m) {
  let r = 1n; b %= m;
  while (e > 0n) { if (e & 1n) r = mulmod(r, b, m); b = mulmod(b, b, m); e >>= 1n; }
  return r;
}

/** Miller-Rabin test (the first 12 prime bases are exact below 3.3x10^24). */
export function isPrime(n) {
  if (n < 2) return false;
  const small = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  for (const p of small) { if (n === p) return true; if (n % p === 0) return false; }
  const N = BigInt(n);
  let d = N - 1n, s = 0;
  while ((d & 1n) === 0n) { d >>= 1n; s++; }
  for (const a of small) {
    let x = powmod(BigInt(a), d, N);
    if (x === 1n || x === N - 1n) continue;
    let comp = true;
    for (let i = 1; i < s; i++) { x = mulmod(x, x, N); if (x === N - 1n) { comp = false; break; } }
    if (comp) return false;
  }
  return true;
}

/** Prime factors as [[prime, exponent], ...]. n >= 2. */
export function factorize(n) {
  const out = [];
  let m = n;
  const take = (p) => { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) out.push([p, e]); };
  take(2); take(3);
  for (let p = 5; p * p <= m; p += 6) { take(p); take(p + 2); }
  if (m > 1) out.push([m, 1]);
  return out;
}

export function divisorsOf(factors) {
  let list = [1];
  for (const [p, e] of factors) {
    const next = [];
    for (const d of list) { let v = d; for (let i = 0; i <= e; i++) { next.push(v); v *= p; } }
    list = next;
  }
  return list.sort((a, b) => a - b);
}

export const divisorCount = (f) => f.reduce((c, [, e]) => c * (e + 1), 1);
/** Sum of divisors, computed with BigInt and returned as text. */
export function divisorSum(f) {
  let t = 1n;
  for (const [p, e] of f) { let s = 0n, v = 1n; for (let i = 0; i <= e; i++) { s += v; v *= BigInt(p); } t *= s; }
  return t.toString();
}
/** Euler phi φ(n). */
export function eulerPhi(n, f) { let r = n; for (const [p] of f) r = (r / p) * (p - 1); return r; }

export function nextPrime(n) { let k = n + 1; while (!isPrime(k)) k++; return k; }
export function prevPrime(n) { if (n <= 2) return null; let k = n - 1; while (k >= 2 && !isPrime(k)) k--; return k >= 2 ? k : null; }

/** Primes in [a, b] using a sieve of Eratosthenes; b must be <= 10^6. */
export function primesInRange(a, b) {
  const sieve = new Uint8Array(b + 1);
  const out = [];
  for (let i = 2; i <= b; i++) {
    if (!sieve[i]) { if (i >= a) out.push(i); for (let j = i * i; j <= b; j += i) sieve[j] = 1; }
  }
  return out;
}

/** Formats factors like "2^3 × 3^2 × 5". */
export function factorString(f) { return f.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(' × '); }

export function analyze(n) {
  if (n < 1) throw new Error('0 cannot be factored into primes. Enter a whole number that is 1 or larger.');
  if (n === 1) return { n, prime: false, factors: [], divisors: [1], divisorCount: 1, divisorSum: '1', phi: 1, next: 2, prev: null };
  const prime = isPrime(n);
  const factors = prime ? [[n, 1]] : factorize(n);
  const dc = divisorCount(factors);
  return {
    n, prime, factors, divisorCount: dc, divisorSum: divisorSum(factors), phi: eulerPhi(n, factors),
    divisors: dc <= 2000 ? divisorsOf(factors) : null, next: nextPrime(n), prev: prevPrime(n),
  };
}
