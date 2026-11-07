// Matris işlemleri — saf fonksiyonlar, DOM yok. Matris = satır dizisi (sayı dizileri).
const EPS = 1e-12;

/** "1,5" veya "1.5" → sayı; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s).trim().replace(',', '.');
  if (t === '' || !/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t)) return NaN;
  return Number(t);
}

export const add = (A, B) => A.map((r, i) => r.map((v, j) => v + B[i][j]));
export const sub = (A, B) => A.map((r, i) => r.map((v, j) => v - B[i][j]));
export const scale = (A, k) => A.map((r) => r.map((v) => v * k));
export const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
export function mul(A, B) {
  return A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
}

/** Determinant: kısmi pivotlu Gauss eliminasyonu. */
export function det(A) {
  const n = A.length, M = A.map((r) => r.slice());
  let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < EPS) return 0;
    if (p !== c) { [M[p], M[c]] = [M[c], M[p]]; d = -d; }
    d *= M[c][c];
    for (let r = c + 1; r < n; r++) {
      const f = M[r][c] / M[c][c];
      for (let k = c; k < n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return d;
}

/** Ters matris (Gauss-Jordan); tekil ise null. */
export function inverse(A) {
  const n = A.length;
  const M = A.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < EPS) return null;
    [M[p], M[c]] = [M[c], M[p]];
    const pv = M[c][c];
    for (let k = 0; k < 2 * n; k++) M[c][k] /= pv;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c];
      if (f !== 0) for (let k = 0; k < 2 * n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r) => r.slice(n));
}

/** Sayıyı en çok 6 ondalıkla, gereksiz sıfırsız ve tr-TR virgülüyle yazar. */
export function fmt(v) {
  const r = Math.round(v * 1e6) / 1e6;
  return (Object.is(r, -0) ? 0 : r).toString().replace('.', ',');
}
