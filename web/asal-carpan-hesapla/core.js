// Asal sayı ve çarpan hesabı — saf mantık (DOM yok), Node ile de test edilebilir.
export const MAX_N = 999999999999999; // 10^15 - 1: Number ile güvenli ve 6k±1 bölmesi hızlı

/** Kullanıcı metnini tam sayıya çevirir; nokta/boşluk binlik ayırıcı sayılır. Hatalıysa Error fırlatır. */
export function parseInteger(text) {
  const raw = String(text ?? '').trim().replace(/[.\s_']/g, '');
  if (raw === '') throw new Error('Bir sayı girin. Örneğin 360 ya da 1.000.003 yazabilirsiniz.');
  if (/^-/.test(raw)) throw new Error('Negatif sayılar asal çarpanlarına ayrılmaz. Pozitif bir tam sayı girin.');
  if (!/^\d+$/.test(raw)) throw new Error('Yalnızca rakam girin; harf, virgül ya da küsurat kullanılamaz. Örnek: 360');
  const n = Number(raw);
  if (n > MAX_N) throw new Error('Sayı çok büyük. Bu araç 999.999.999.999.999 (15 hane) değerine kadar çalışır; daha küçük bir sayı girin.');
  return n;
}

const mulmod = (a, b, m) => (a * b) % m;
function powmod(b, e, m) {
  let r = 1n; b %= m;
  while (e > 0n) { if (e & 1n) r = mulmod(r, b, m); b = mulmod(b, b, m); e >>= 1n; }
  return r;
}

/** Miller-Rabin (ilk 12 asal taban ile 3,3×10^24'e kadar kesin sonuç verir). */
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

/** Asal çarpanlar: [[asal, üs], ...]. n >= 2. */
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
/** Bölenler toplamı σ(n) — Number taşabilir; BigInt ile hesaplanır, metin döner. */
export function divisorSum(f) {
  let t = 1n;
  for (const [p, e] of f) { let s = 0n, v = 1n; for (let i = 0; i <= e; i++) { s += v; v *= BigInt(p); } t *= s; }
  return t.toString();
}
/** Euler phi φ(n). */
export function eulerPhi(n, f) { let r = n; for (const [p] of f) r = (r / p) * (p - 1); return r; }

export function nextPrime(n) { let k = n + 1; while (!isPrime(k)) k++; return k; }
export function prevPrime(n) { if (n <= 2) return null; let k = n - 1; while (k >= 2 && !isPrime(k)) k--; return k >= 2 ? k : null; }

/** [a, b] aralığındaki asallar (Eratosthenes eleği); b <= 10^6 olmalı. */
export function primesInRange(a, b) {
  const sieve = new Uint8Array(b + 1);
  const out = [];
  for (let i = 2; i <= b; i++) {
    if (!sieve[i]) { if (i >= a) out.push(i); for (let j = i * i; j <= b; j += i) sieve[j] = 1; }
  }
  return out;
}

/** "2^3 × 3^2 × 5" biçimi (üs için ^ ve çarpı için ×). */
export function factorString(f) { return f.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(' × '); }

export function analyze(n) {
  if (n < 1) throw new Error('0 asal çarpanlarına ayrılamaz. 1 ya da daha büyük bir tam sayı girin.');
  if (n === 1) return { n, prime: false, factors: [], divisors: [1], divisorCount: 1, divisorSum: '1', phi: 1, next: 2, prev: null };
  const prime = isPrime(n);
  const factors = prime ? [[n, 1]] : factorize(n);
  const dc = divisorCount(factors);
  return {
    n, prime, factors, divisorCount: dc, divisorSum: divisorSum(factors), phi: eulerPhi(n, factors),
    divisors: dc <= 2000 ? divisorsOf(factors) : null, next: nextPrime(n), prev: prevPrime(n),
  };
}
