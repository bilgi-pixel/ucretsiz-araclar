// Sayı yuvarlama — ondalık sayı metni BigInt ile işlenir, kayan nokta hatası olmaz. DOM yok.

/** "12,345" / "-0.5" / "1e3" desteklemez (bilinçli): {neg, n:BigInt, s:ondalık basamak} ya da null. */
export function parseDecimal(str) {
  const t = String(str).trim().replace(/\s/g, '').replace(',', '.');
  const m = /^([-+]?)(\d*)\.?(\d*)$/.exec(t);
  if (!m || (m[2] === '' && m[3] === '')) return null;
  return { neg: m[1] === '-', n: BigInt((m[2] || '0') + m[3]), s: m[3].length };
}

const MODES = ['yarim-yukari', 'tavan', 'taban', 'kes', 'bankaci'];
export { MODES };

/** Pozitif bölme + yuvarlama: |n|/d için tam sayı bölüm; neg işaretli değerin yönünü belirler. */
function roundDiv(n, d, neg, mode) {
  const q = n / d, r = n % d;
  if (r === 0n) return q;
  const twice = r * 2n;
  switch (mode) {
    case 'yarim-yukari': return twice >= d ? q + 1n : q; // 0,5 sıfırdan uzağa
    case 'tavan': return neg ? q : q + 1n; // +∞ yönü
    case 'taban': return neg ? q + 1n : q; // -∞ yönü
    case 'kes': return q;
    case 'bankaci': return twice > d ? q + 1n : twice < d ? q : (q % 2n === 0n ? q : q + 1n);
    default: throw new Error('Bilinmeyen yuvarlama yöntemi.');
  }
}

/** Metni verilen ölçekle ondalık yazar (tr-TR virgülü), gereksiz sondaki sıfırları atar. */
function fmtScaled(neg, n, s) {
  let str = n.toString().padStart(s + 1, '0');
  let out = s > 0 ? str.slice(0, -s) + ',' + str.slice(-s) : str;
  if (s > 0) out = out.replace(/,?0+$/, '');
  return (neg && n !== 0n ? '-' : '') + out;
}

/**
 * Yuvarlar. step verilirse en yakın katına; yoksa digits (negatif = onlar, yüzler…) basamağına.
 * Dönüş: biçimli metin.
 */
export function roundValue(valueStr, mode, opts = {}) {
  const v = parseDecimal(valueStr);
  if (!v) throw new Error('Sayı geçersiz. Yalnızca rakam ve ondalık için virgül ya da nokta kullanın (örn. 12,345).');
  let K, sK;
  if (opts.step != null && String(opts.step).trim() !== '') {
    const st = parseDecimal(opts.step);
    if (!st || st.n === 0n) throw new Error('Yuvarlama katı sıfırdan büyük bir sayı olmalı (örn. 0,05 ya da 5).');
    K = st.n; sK = st.s;
  } else {
    const d = Number(opts.digits ?? 0);
    if (!Number.isInteger(d) || d < -12 || d > 12) throw new Error('Basamak sayısı -12 ile 12 arasında bir tam sayı olmalı.');
    if (d >= 0) { K = 1n; sK = d; } else { K = 10n ** BigInt(-d); sK = 0; }
  }
  const S = Math.max(v.s, sK);
  const N = v.n * 10n ** BigInt(S - v.s);
  const Kk = K * 10n ** BigInt(S - sK);
  const q = roundDiv(N, Kk, v.neg, mode);
  return fmtScaled(v.neg, q * Kk, S);
}
