// Fibonacci mantığı — BigInt ile tam doğru sonuç; DOM yok.
export const MAX_N = 5000;

/** F(n): iteratif, BigInt. F(0)=0, F(1)=1. */
export function fib(n) {
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

/** F(0)..F(count-1) listesi. */
export function fibList(count) {
  const out = [];
  let a = 0n, b = 1n;
  for (let i = 0; i < count; i++) { out.push(a); [a, b] = [b, a + b]; }
  return out;
}

/** Tam sayı karekökü (Newton, BigInt). */
function isqrt(n) {
  if (n < 2n) return n;
  let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
  for (;;) { const y = (x + n / x) >> 1n; if (y >= x) return x; x = y; }
}
const isSquare = (n) => { if (n < 0n) return false; const r = isqrt(n); return r * r === n; };

/** n Fibonacci sayısı mı? (5n²+4 veya 5n²-4 tam kare) ; sırasını da verir. */
export function isFibonacci(n) {
  const ok = isSquare(5n * n * n + 4n) || isSquare(5n * n * n - 4n);
  if (!ok) return { is: false };
  let a = 0n, b = 1n, i = 0;
  while (a < n) { [a, b] = [b, a + b]; i++; }
  return { is: true, index: i };
}

/** Büyük BigInt'i okunur biçimde binlik ayraçla yazar (tr-TR: nokta). */
export function groupDigits(big) {
  return big.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
