// Karekök, n. dereceden kök ve üs (kuvvet) hesabı — saf mantık (DOM yok).

/** Türkçe yazımlı sayıyı çözer: "1.234,5" -> 1234.5 ; "2,5" -> 2.5 ; "2.5" -> 2.5 ; "1.000" -> 1000. */
export function parseNumber(text, label = 'Sayı') {
  let s = String(text ?? '').trim().replace(/\s/g, '');
  if (s === '') throw new Error(`${label} alanı boş. Bir sayı yazın (örneğin 72 ya da 2,5).`);
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^[-+]?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) throw new Error(`${label} geçersiz. Yalnızca rakam ve ondalık için virgül kullanın (örneğin 72 ya da 2,5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} çok büyük. Daha küçük bir sayı deneyin.`);
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

/** x ≥ 0 için n. kök; tam kökler yuvarlama hatası olmadan döner. */
export function rootOf(x, n) {
  if (x === 0) return 0;
  const r = Math.pow(x, 1 / n);
  const k = Math.round(r);
  if (Math.abs(r - k) < 1e-9 && Math.pow(k, n) === x) return k;
  return r;
}

/** Tam sayı x için kökü sadeleştirir: x^(1/n) = outside · (inside)^(1/n). */
export function simplifyRoot(x, n) {
  if (!Number.isInteger(x) || x < 1 || x > 1e12) return null;
  let outside = 1, inside = 1;
  for (const [p, e] of factorize(x)) {
    outside *= Math.pow(p, Math.floor(e / n));
    inside *= Math.pow(p, e % n);
  }
  return { outside, inside };
}

/** En yakın alt/üst tam n. kuvvetler (x ≥ 0). */
export function neighbourPowers(x, n) {
  const r = Math.floor(rootOf(x, n) + 1e-9);
  const lo = Math.pow(r, n);
  const hi = Math.pow(r + 1, n);
  return { r, lo, hi, perfect: lo === x || Math.pow(Math.round(rootOf(x, n)), n) === x };
}

const SYMBOL = { 2: '√', 3: '∛', 4: '∜' };
export function radicalText(x, n, s) {
  const sym = SYMBOL[n] ?? `${n}.dereceden kök `;
  if (!s) return null;
  if (s.inside === 1) return String(s.outside);
  if (s.outside === 1) return `${sym}${s.inside}`;
  return `${s.outside}${sym}${s.inside}`;
}

/** Kök hesabı. n tam sayı ≥ 2. Negatif tabanda tek derece geçerli; çift derece hata (karmaşık not). */
export function computeRoot(x, n) {
  if (!Number.isInteger(n) || n < 2 || n > 100) throw new Error('Kök derecesi 2 ile 100 arasında bir tam sayı olmalı (2 = karekök, 3 = küpkök).');
  if (x < 0) {
    if (n % 2 === 0) {
      const mag = rootOf(-x, n);
      throw new Error(`Negatif bir sayının çift dereceden kökü gerçek sayılarda tanımsızdır. Karmaşık sayılarda yaklaşık ${mag.toLocaleString('tr-TR', { maximumFractionDigits: 6 })}i bulunur (i² = −1). Pozitif bir sayı girin.`);
    }
    const r = computeRoot(-x, n);
    return { ...r, value: -r.value, negative: true, simple: r.simple ? '−' + r.simple : null };
  }
  const value = rootOf(x, n);
  const simple = radicalText(x, n, simplifyRoot(x, n));
  const nb = neighbourPowers(x, n);
  return { x, n, value, simple, perfect: Number.isInteger(value) && Math.pow(value, n) === x, lower: nb.lo, upper: nb.hi, lowerRoot: nb.r, negative: false };
}

/** Üs hesabı: x^e. Tam sayı taban ve küçük pozitif tam sayı üs ise BigInt ile kesin sonuç döner. */
export function computePower(x, e) {
  if (!Number.isFinite(e)) throw new Error('Üs geçersiz. Bir sayı yazın (örneğin 3, −2 ya da 0,5).');
  if (x === 0 && e < 0) throw new Error('0 sayısının negatif kuvveti tanımsızdır (sıfıra bölme). Tabanı ya da üssü değiştirin.');
  if (Number.isInteger(x) && Number.isInteger(e) && e >= 0 && e <= 2000 && Math.abs(x) <= 1e9) {
    const big = BigInt(x) ** BigInt(e);
    const digits = big.toString().replace('-', '').length;
    if (digits <= 400) return { exact: big, value: Number(big), digits };
  }
  const value = Math.pow(x, e);
  if (Number.isNaN(value)) throw new Error('Bu işlem gerçek sayılarda tanımsız (negatif tabanın kesirli kuvveti). Tabanı pozitif yapın ya da tam sayı üs girin.');
  if (!Number.isFinite(value)) throw new Error('Sonuç çok büyük; gösterilemiyor. Daha küçük bir taban ya da üs deneyin.');
  return { exact: null, value, digits: null };
}

/** Sayı biçimlendirme (tr-TR). */
export function fmt(v) {
  if (Object.is(v, -0)) v = 0;
  const a = Math.abs(v);
  if (a !== 0 && (a >= 1e15 || a < 1e-9)) { const [mant, ex] = v.toExponential(8).split('e'); const m = mant.includes('.') ? mant.replace(/0+$/, '').replace(/[.]$/, '') : mant; return m.replace('.', ',') + ' × 10^' + ex.replace('+', '').replace('-', '−'); }
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 10 }).format(v);
}
