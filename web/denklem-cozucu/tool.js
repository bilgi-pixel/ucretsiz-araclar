// Denklem Çözücü — 1. derece, 2. derece ve iki bilinmeyenli sistem; tamamı tarayıcıda çalışır, hiçbir değer sunucuya gitmez.
// Hesaplar BigInt tabanlı tam kesirlerle yapılır; ondalık yuvarlama hatası olmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

/* ---------- Tam kesirli sayı (BigInt) ---------- */
const babs = (n) => (n < 0n ? -n : n);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) { [a, b] = [b, a % b]; } return a; };
const blcm = (a, b) => (a / bgcd(a, b)) * b;

export class Frac {
  constructor(n, d = 1n) {
    if (d === 0n) throw new Error('Paydada sıfır olamaz.');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  add(o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Frac(this.n * o.n, this.d * o.d); }
  div(o) { return new Frac(this.n * o.d, this.d * o.n); }
  neg() { return new Frac(-this.n, this.d); }
  sign() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  isZero() { return this.n === 0n; }
  isInt() { return this.d === 1n; }
  eq(o) { return this.n === o.n && this.d === o.d; }
  toNumber() { return Number(this.n) / Number(this.d); }
}
const F = (n) => new Frac(BigInt(n));

/* ---------- Girdi ayrıştırma (Türkçe ondalık, eksi, a/b kesri) ---------- */
const MAX_DIGITS = 15;

function parseDecimal(t, label) {
  let s = t;
  const hasC = s.includes(','); const hasD = s.includes('.');
  if (hasC && hasD) {
    const lc = s.lastIndexOf(','); const ld = s.lastIndexOf('.');
    s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (hasC) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (hasD && /^[1-9]\d{0,2}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, ''); // 1.250 → binlik ayırıcı (0.125 gibi değerler ondalık sayılır)
  }
  s = s.replace(/\.$/, '');
  if (!/^\d+(\.\d+)?$/.test(s)) throw new Error(`${label} geçerli bir sayı değil. Rakam, virgül (ondalık), eksi işareti ve a/b kesri kullanabilirsiniz (örn. -2,5 ya da 3/4); harf ve sembolleri silin.`);
  const [ip, fp = ''] = s.split('.');
  if ((ip + fp).replace(/^0+/, '').length > MAX_DIGITS) throw new Error(`${label} çok uzun; en fazla ${MAX_DIGITS} basamaklı sayılar desteklenir. Daha kısa bir değer yazın.`);
  return new Frac(BigInt(ip + fp), 10n ** BigInt(fp.length));
}

/** "-2,5", "1.250,5", "3/4", "−7" → Frac. Boş ya da yarım (sadece "-") ise null. */
export function parseFrac(raw, label) {
  const s = String(raw ?? '').trim().replace(/\s/g, '').replace(/[\u2212\u2013\u2014]/g, '-');
  if (!s || /^[+-]?[.,]?$/.test(s)) return null;
  if (!/^[+-]?[0-9.,]+(\/[0-9.,]+)?$/.test(s)) throw new Error(`${label} geçerli bir sayı değil. Rakam, virgül (ondalık), eksi işareti ve a/b kesri kullanabilirsiniz (örn. -2,5 ya da 3/4); harf ve sembolleri silin.`);
  const neg = s[0] === '-'; const body = s.replace(/^[+-]/, '');
  const parts = body.split('/');
  if (parts.length > 2) throw new Error(`${label} içinde birden fazla kesir çizgisi var. Tek bir a/b kesri yazın (örn. 3/4).`);
  let v = parseDecimal(parts[0], label);
  if (parts.length === 2) {
    const den = parseDecimal(parts[1], label);
    if (den.isZero()) throw new Error(`${label} içindeki kesrin paydası sıfır olamaz. Paydayı sıfırdan farklı bir sayı yapın.`);
    v = v.div(den);
  }
  return neg ? v.neg() : v;
}

/* ---------- Biçimlendirme ---------- */
function decimalsNeeded(d) {
  let a = 0; let b = 0;
  while (d % 2n === 0n) { d /= 2n; a++; }
  while (d % 5n === 0n) { d /= 5n; b++; }
  return d === 1n ? Math.max(a, b) : -1;
}
/** Kesri k basamaklı Türkçe ondalık yazar (yarıdan yukarı yuvarlar); -0 çıkmaz. */
export function fmtDec(f, k = 6) {
  const neg = f.n < 0n; const n = babs(f.n); const scale = 10n ** BigInt(k);
  const q = (n * scale * 2n + f.d) / (2n * f.d);
  const ip = q / scale;
  const fp = (q % scale).toString().padStart(k, '0').replace(/0+$/, '');
  return (neg && q !== 0n ? '-' : '') + (fp ? `${ip},${fp}` : `${ip}`);
}
/** Satır içi gösterim: tam sayı, sonlu ondalık ya da n/d. */
export function fmtInline(f, paren = false) {
  if (f.isInt()) return f.n.toString();
  const k = decimalsNeeded(f.d);
  if (k >= 0 && k <= 8) return fmtDec(f, k);
  return paren ? `(${f.n}/${f.d})` : `${f.n}/${f.d}`;
}
const S = (f) => fmtInline(f);
/** Çarpımlarda kullanım: negatif ve kesirli değerleri parantezler. */
const P = (f) => {
  const k = f.isInt() ? 0 : decimalsNeeded(f.d);
  const plain = f.isInt() || (k >= 0 && k <= 8);
  return f.sign() < 0 || !plain ? `(${S(f)})` : S(f);
};
/** Sonuç değeri: 3 ; 7/2 = 3,5 ; 1/3 ≈ 0,333333 */
export function fmtVal(f) {
  if (f.isInt()) return f.n.toString();
  const k = decimalsNeeded(f.d);
  if (k >= 0 && k <= 8) return `${f.n}/${f.d} = ${fmtDec(f, k)}`;
  return `${f.n}/${f.d} ≈ ${fmtDec(f, 6)}`;
}
/** Yaklaşık (Number) değer: en çok 6 ondalık, Türkçe virgül, -0 yok. */
function fmtNum(x, k = 6) {
  if (!Number.isFinite(x)) return '—';
  let s = x.toFixed(k).replace(/\.?0+$/, '');
  if (s === '-0' || s === '') s = '0';
  return s.replace('.', ',');
}

/** "a / b = sonuç" satırı; sonuç zaten yazılı kesirle aynıysa yalnızca ondalığını ekler. */
function quot(num, den) {
  const q = num.div(den);
  const head = `${S(num)} / ${P(den)}`;
  if (q.isInt()) return `${head} = ${q.n}`;
  const same = num.isInt() && den.isInt() && q.n === num.n && q.d === den.n;
  if (!same) return `${head} = ${fmtVal(q)}`;
  const k = decimalsNeeded(q.d);
  return k >= 0 && k <= 8 ? `${head} = ${fmtDec(q, k)}` : `${head} ≈ ${fmtDec(q, 6)}`;
}

/** Terim listesinden "x² - 5x + 6" gibi bir ifade üretir. */
function poly(terms) {
  let s = '';
  for (const [c, v] of terms) {
    if (c.isZero()) continue;
    const abs = c.sign() < 0 ? c.neg() : c;
    const body = v === '' ? S(abs) : (abs.eq(F(1)) ? v : `${fmtInline(abs, true)}${v}`);
    if (!s) s = (c.sign() < 0 ? '-' : '') + body;
    else s += (c.sign() < 0 ? ' - ' : ' + ') + body;
  }
  return s || '0';
}

/* ---------- 1. derece: ax + b = c ---------- */
export function solveLinear(a, b, c) {
  const steps = []; const rows = [];
  steps.push(`Denklem: ${poly([[a, 'x'], [b, '']])} = ${S(c)}  (a = ${S(a)}, b = ${S(b)}, c = ${S(c)})`);
  if (a.isZero()) {
    if (b.eq(c)) {
      steps.push(`a = 0 olduğundan x kaybolur ve geriye ${S(b)} = ${S(c)} kalır; bu eşitlik her x için doğrudur.`);
      rows.push({ k: 'sol', label: 'Çözüm', value: 'Sonsuz çözüm (her gerçek sayı)' });
    } else {
      steps.push(`a = 0 olduğundan x kaybolur ve geriye ${S(b)} = ${S(c)} kalır; bu eşitlik hiçbir x için doğru değildir (çelişki).`);
      rows.push({ k: 'sol', label: 'Çözüm', value: 'Çözüm yok (boş küme)' });
    }
    return { title: '1. derece denklem', rows, steps, graph: null, graphLabel: '' };
  }
  const cb = c.sub(b);
  const x = cb.div(a);
  steps.push(`Sabiti karşı tarafa geçirin: ${poly([[a, 'x']])} = c - b = ${S(c)} - ${P(b)} = ${S(cb)}`);
  steps.push(`Her iki tarafı a ile bölün: x = (c - b) / a = ${quot(cb, a)}`);
  const lhs = a.mul(x).add(b);
  steps.push(`Doğrulama: ${P(a)} · ${P(x)} + ${P(b)} = ${S(lhs)} = ${S(c)} ✓`);
  rows.push({ k: 'x', label: 'x', value: fmtVal(x), strong: true });
  const xs = x.toNumber(); const an = a.toNumber(); const off = b.sub(c).toNumber();
  const xr = fitRange([0, xs], 2);
  const f = (t) => an * t + off;
  const yr = fitRange([0, f(xr[0]), f(xr[1])], 1);
  return {
    title: '1. derece denklem', rows, steps,
    graph: { xr, yr, curves: [{ fn: f, dash: false }], points: [{ x: xs, y: 0, label: `x = ${fmtNum(xs, 4)}` }] },
    graphLabel: `y = ${poly([[a, 'x'], [b.sub(c), '']])} doğrusunun grafiği; x eksenini x = ${fmtNum(xs, 4)} noktasında keser.`,
  };
}

/* ---------- 2. derece: ax² + bx + c = 0 ---------- */
/** n = s²·r (r kareden arınmış) ayrışımı; çok büyükse sadeleştirmeden döner. */
function sqrtParts(n) {
  n = babs(n);
  if (n <= 1000000000000000n) {
    let m = Number(n); let s = 1;
    for (let p = 2; p * p <= m; p++) { while (m % (p * p) === 0) { m /= p * p; s *= p; } }
    return { s: BigInt(s), r: BigInt(m) };
  }
  return { s: 1n, r: n };
}
function radicalText(P0, sg, Q, r, den, im) {
  const rad = `${Q === 1n ? '' : Q}√${r}${im ? '·i' : ''}`;
  const sym = sg === 0 ? '±' : sg < 0 ? '-' : '+'; // sg = 0 → ± (genel formül)
  const inner = P0 === 0n ? (sg > 0 ? rad : `${sym}${rad}`) : `${P0} ${sym} ${rad}`;
  return den === 1n ? inner : `(${inner})/${den}`;
}
function complexText(p, q, sg) {
  const qs = q.eq(F(1)) ? '' : fmtInline(q, true);
  const sym = sg === 0 ? '±' : sg < 0 ? '-' : '+'; // sg = 0 → ±
  if (p.isZero()) return `${sg > 0 ? '' : sym}${qs}i`;
  return `${S(p)} ${sym} ${qs}i`;
}

export function solveQuadratic(a, b, c) {
  if (a.isZero()) throw new Error('a katsayısı sıfır olamaz; sıfır olursa denklem 2. derece olmaz. Birinci derece denklem için üstteki "1. derece" seçeneğini kullanın.');
  const steps = []; const rows = [];
  const b2 = b.mul(b); const fac = F(4).mul(a).mul(c); const disc = b2.sub(fac);
  steps.push(`Denklem: ${poly([[a, 'x²'], [b, 'x'], [c, '']])} = 0  (a = ${S(a)}, b = ${S(b)}, c = ${S(c)})`);
  steps.push(`Diskriminant: Δ = b² - 4ac = ${P(b)}² - 4 · ${P(a)} · ${P(c)} = ${S(b2)} - ${P(fac)} = ${fmtVal(disc)}`);

  // Kökler tam sayı katsayılı denklemle hesaplanır (denklemi paydaların EKOK'uyla çarpmak kökleri değiştirmez).
  const m = [a.d, b.d, c.d].reduce(blcm, 1n);
  const A = a.n * (m / a.d); const B = b.n * (m / b.d); const C = c.n * (m / c.d);
  const D2 = B * B - 4n * A * C; const twoA = 2n * A;
  if (m > 1n) steps.push(`Katsayılar kesirli ya da ondalıklı olduğundan denklemi ${m} ile çarpıp tam sayı katsayılı yazıyoruz (kökler değişmez): ${poly([[new Frac(A), 'x²'], [new Frac(B), 'x'], [new Frac(C), '']])} = 0 ve Δ' = ${D2}.`);

  const sgn = D2 > 0n ? 1 : D2 < 0n ? -1 : 0;
  let type; const roots = []; // { text, approx?, frac?, re, im }
  if (sgn === 0) {
    type = 'Çakışık (çift katlı) gerçek kök';
    const x = new Frac(-B, twoA);
    steps.push('Δ = 0 olduğundan iki kök birbirine eşittir (çift katlı tek kök).');
    steps.push(`x₁ = x₂ = -b / (2a) = ${quot(new Frac(-B), new Frac(twoA))}`);
    roots.push({ frac: x, re: x.toNumber(), im: 0 });
  } else if (sgn > 0) {
    type = 'İki farklı gerçek kök';
    steps.push('Δ > 0 olduğundan denklemin iki farklı gerçek kökü vardır.');
    const info = sqrtParts(D2);
    if (info.r === 1n) {
      steps.push(`√Δ = √${D2} = ${info.s}`);
      const list = [-1n, 1n].map((sg) => ({ frac: new Frac(-B + sg * info.s, twoA), expr: `(${-B} ${sg < 0n ? '-' : '+'} ${info.s}) / ${twoA}` }));
      list.sort((p, q) => (p.frac.sub(q.frac).sign()));
      list.forEach((r, i) => {
        steps.push(`x${i ? '₂' : '₁'} = ${r.expr} = ${fmtVal(r.frac)}`);
        roots.push({ frac: r.frac, re: r.frac.toNumber(), im: 0 });
      });
    } else {
      const sq = info.s > 1n ? `${info.s}√${info.r}` : `√${info.r}`;
      steps.push(`√Δ = √${D2}${info.s > 1n ? ` = ${sq}` : ''} (tam kare değil, kökler irrasyonel)`);
      const g = bgcd(bgcd(babs(B), info.s), babs(twoA));
      let P0 = -B / g; const Q = info.s / g; let den = twoA / g;
      if (den < 0n) { P0 = -P0; den = -den; }
      steps.push(`x = (-b ± √Δ) / (2a) = (${-B} ± ${sq}) / ${twoA} = ${radicalText(P0, 0, Q, info.r, den, false)}`);
      const rt = Math.sqrt(Number(info.r));
      [-1, 1].forEach((sg) => {
        const v = (Number(P0) + sg * Number(Q) * rt) / Number(den);
        roots.push({ text: radicalText(P0, sg, Q, info.r, den, false), approx: fmtNum(v), re: v, im: 0 });
      });
      steps.push(`x₁ ≈ ${roots[0].approx}, x₂ ≈ ${roots[1].approx}`);
    }
  } else {
    type = 'Karmaşık (sanal) kökler — gerçek kök yok';
    steps.push('Δ < 0 olduğundan gerçek kök yoktur; kökler birbirinin eşleniği iki karmaşık sayıdır (i² = -1).');
    const info = sqrtParts(D2);
    if (info.r === 1n) {
      steps.push(`√Δ = √(${D2}) = ${info.s}i`);
      const p = new Frac(-B, twoA); const q = new Frac(info.s, babs(twoA));
      steps.push(`x = (-b ± √Δ) / (2a) = (${-B} ± ${info.s}i) / ${twoA} = ${complexText(p, q, 0)}`);
      roots.push({ text: complexText(p, q, 1), re: p.toNumber(), im: q.toNumber() }, { text: complexText(p, q, -1), re: p.toNumber(), im: -q.toNumber() });
    } else {
      const sq = info.s > 1n ? `${info.s}√${info.r}` : `√${info.r}`;
      steps.push(`√Δ = √(${D2}) = ${sq}·i`);
      const g = bgcd(bgcd(babs(B), info.s), babs(twoA));
      let P0 = -B / g; const Q = info.s / g; let den = twoA / g;
      if (den < 0n) { P0 = -P0; den = -den; }
      const re = Number(P0) / Number(den); const im = (Number(Q) * Math.sqrt(Number(info.r))) / Number(den);
      steps.push(`x = (-b ± √Δ) / (2a) = (${-B} ± ${sq}·i) / ${twoA}`);
      [1, -1].forEach((sg) => roots.push({
        text: radicalText(P0, sg, Q, info.r, den, true),
        approx: re === 0 ? `${sg < 0 ? '-' : ''}${fmtNum(im)}i` : `${fmtNum(re)} ${sg < 0 ? '-' : '+'} ${fmtNum(im)}i`,
        re, im: sg * im,
      }));
      steps.push(`x₁ ≈ ${roots[0].approx}, x₂ ≈ ${roots[1].approx}`);
    }
  }

  // Köklerin toplamı / çarpımı (Vieta) ve tepe noktası
  const sum = b.neg().div(a); const prod = c.div(a);
  steps.push(`Köklerin toplamı: x₁ + x₂ = -b / a = ${quot(b.neg(), a)}`);
  steps.push(`Köklerin çarpımı: x₁ · x₂ = c / a = ${quot(c, a)}`);
  const xt = b.neg().div(F(2).mul(a)); const kt = disc.neg().div(F(4).mul(a));
  steps.push(`Tepe noktası: r = -b / (2a) = ${quot(b.neg(), F(2).mul(a))}`);
  steps.push(`k = f(r) = -Δ / (4a) = ${quot(disc.neg(), F(4).mul(a))} → T(${S(xt)}; ${S(kt)}). Simetri ekseni x = ${S(xt)}; a ${a.sign() > 0 ? '> 0 olduğundan kollar yukarı, k en küçük değerdir' : '< 0 olduğundan kollar aşağı, k en büyük değerdir'}.`);
  if (roots.every((r) => r.frac)) {
    roots.slice(0, sgn === 0 ? 1 : 2).forEach((r, i) => {
      const fx = a.mul(r.frac).mul(r.frac).add(b.mul(r.frac)).add(c);
      steps.push(`Doğrulama: f(${S(r.frac)}) = ${P(a)} · ${P(r.frac)}² + ${P(b)} · ${P(r.frac)} + ${P(c)} = ${S(fx)}${fx.isZero() ? ' ✓' : ''}`);
    });
  }

  rows.push({ k: 'delta', label: 'Diskriminant (Δ)', value: fmtVal(disc), strong: true });
  rows.push({ k: 'type', label: 'Kök türü', value: type });
  const rootVal = (r) => (r.frac ? fmtVal(r.frac) : r.approx ? `${r.text} ≈ ${r.approx}` : r.text);
  if (sgn === 0) rows.push({ k: 'x1', label: 'x₁ = x₂', value: rootVal(roots[0]) });
  else { rows.push({ k: 'x1', label: 'x₁', value: rootVal(roots[0]) }, { k: 'x2', label: 'x₂', value: rootVal(roots[1]) }); }
  rows.push({ k: 'sum', label: 'Köklerin toplamı (-b/a)', value: fmtVal(sum) }, { k: 'prod', label: 'Köklerin çarpımı (c/a)', value: fmtVal(prod) });
  rows.push({ k: 'vertex', label: 'Tepe noktası T(r; k)', value: `(${S(xt)}; ${S(kt)})` });
  rows.push({ k: 'yint', label: 'y eksenini kestiği nokta', value: `(0; ${S(c)})` });

  // Grafik penceresi
  const an = a.toNumber(); const bn = b.toNumber(); const cn = c.toNumber();
  const xtn = xt.toNumber(); const ktn = kt.toNumber();
  const spread = Math.sqrt(Math.abs(disc.toNumber())) / (2 * Math.abs(an));
  const W = Math.max(2, 1.8 * spread);
  const f = (t) => an * t * t + bn * t + cn;
  const xr = [xtn - W, xtn + W];
  const yr = fitRange([0, ktn, f(xr[0]), f(xr[1])], 1);
  const points = [{ x: xtn, y: ktn, label: `T(${fmtNum(xtn, 3)}; ${fmtNum(ktn, 3)})`, vertex: true }];
  if (sgn >= 0) roots.slice(0, sgn === 0 ? 1 : 2).forEach((r, i) => points.push({ x: r.re, y: 0, label: `x${sgn === 0 ? '' : i ? '₂' : '₁'}=${fmtNum(r.re, 3)}` }));
  return {
    title: '2. derece denklem', rows, steps,
    graph: { xr, yr, curves: [{ fn: f, dash: false }], points },
    graphLabel: `y = ${poly([[a, 'x²'], [b, 'x'], [c, '']])} parabolü: kollar ${a.sign() > 0 ? 'yukarı' : 'aşağı'}, tepe noktası (${fmtNum(xtn, 3)}; ${fmtNum(ktn, 3)}), ${sgn < 0 ? 'x eksenini kesmez' : sgn === 0 ? 'x eksenine tepe noktasında değer' : 'x eksenini iki noktada keser'}.`,
  };
}

/* ---------- İki bilinmeyenli iki denklem ---------- */
function fitRange(vals, minPad) {
  const lo = Math.min(...vals); const hi = Math.max(...vals);
  const pad = Math.max((hi - lo) * 0.35, minPad);
  return [lo - pad, hi + pad];
}
const eqStr = (a, b, c) => `${poly([[a, 'x'], [b, 'y']])} = ${S(c)}`;

export function solveSystem(a1, b1, c1, a2, b2, c2, method = 'cramer') {
  const steps = []; const rows = [];
  steps.push(`Sistem:  (1) ${eqStr(a1, b1, c1)}   (2) ${eqStr(a2, b2, c2)}`);
  const D = a1.mul(b2).sub(a2.mul(b1));
  const Dx = c1.mul(b2).sub(c2.mul(b1));
  const Dy = a1.mul(c2).sub(a2.mul(c1));
  const inconsistent = (a, b, c) => a.isZero() && b.isZero() && !c.isZero();
  let kind;
  if (!D.isZero()) kind = 'unique';
  else if (inconsistent(a1, b1, c1) || inconsistent(a2, b2, c2) || !(Dx.isZero() && Dy.isZero())) kind = 'none';
  else kind = 'infinite';

  let x = null; let y = null;
  if (kind === 'unique') { x = Dx.div(D); y = Dy.div(D); }

  const cramerLines = () => {
    steps.push(`Katsayılar determinantı: D = a₁b₂ - a₂b₁ = ${P(a1)} · ${P(b2)} - ${P(a2)} · ${P(b1)} = ${S(D)}`);
    steps.push(`Dx = c₁b₂ - c₂b₁ = ${P(c1)} · ${P(b2)} - ${P(c2)} · ${P(b1)} = ${S(Dx)}`);
    steps.push(`Dy = a₁c₂ - a₂c₁ = ${P(a1)} · ${P(c2)} - ${P(a2)} · ${P(c1)} = ${S(Dy)}`);
  };
  const verify = () => {
    const v1 = a1.mul(x).add(b1.mul(y)); const v2 = a2.mul(x).add(b2.mul(y));
    steps.push(`Doğrulama: (1) ${P(a1)} · ${P(x)} + ${P(b1)} · ${P(y)} = ${S(v1)} = ${S(c1)} ✓   (2) ${P(a2)} · ${P(x)} + ${P(b2)} · ${P(y)} = ${S(v2)} = ${S(c2)} ✓`);
  };

  if (method === 'yoketme') {
    if (!b1.isZero() && !b2.isZero()) {
      steps.push(`y'yi yok etmek için (1) denklemini b₂ = ${S(b2)} ile, (2) denklemini b₁ = ${S(b1)} ile çarpın; y'nin katsayıları eşitlenir:`);
      steps.push(`(1) · ${P(b2)}:  ${eqStr(a1.mul(b2), b1.mul(b2), c1.mul(b2))}`);
      steps.push(`(2) · ${P(b1)}:  ${eqStr(a2.mul(b1), b1.mul(b2), c2.mul(b1))}`);
      steps.push(`Taraf tarafa çıkarın (1) - (2):  ${D.isZero() ? '0' : poly([[D, 'x']])} = ${S(Dx)}`);
      if (kind === 'unique') {
        steps.push(`x = ${quot(Dx, D)}`);
        steps.push(`x'i (1) denkleminde yerine yazın: ${P(a1)} · ${P(x)} + ${poly([[b1, 'y']])} = ${S(c1)}  →  ${poly([[b1, 'y']])} = ${S(c1)} - ${P(a1.mul(x))} = ${S(c1.sub(a1.mul(x)))}  →  y = ${fmtVal(y)}`);
        verify();
      } else if (kind === 'infinite') steps.push('0 = 0 her x için doğrudur: iki denklem aynı doğruyu verir, sonsuz çözüm vardır.');
      else steps.push(`0 = ${S(Dx)} bir çelişkidir: doğrular paralel olduğundan çözüm yoktur.`);
    } else if (!a1.isZero() && !a2.isZero()) {
      steps.push(`y'nin katsayılarından biri sıfır olduğundan bu kez x'i yok edin: (1) denklemini a₂ = ${S(a2)} ile, (2) denklemini a₁ = ${S(a1)} ile çarpın:`);
      steps.push(`(1) · ${P(a2)}:  ${eqStr(a1.mul(a2), b1.mul(a2), c1.mul(a2))}`);
      steps.push(`(2) · ${P(a1)}:  ${eqStr(a1.mul(a2), b2.mul(a1), c2.mul(a1))}`);
      const dy = b1.mul(a2).sub(b2.mul(a1)); const rhs = c1.mul(a2).sub(c2.mul(a1));
      steps.push(`Taraf tarafa çıkarın (1) - (2):  ${dy.isZero() ? '0' : poly([[dy, 'y']])} = ${S(rhs)}`);
      if (kind === 'unique') {
        steps.push(`y = ${quot(rhs, dy)}`);
        steps.push(`y'yi (1) denkleminde yerine yazın: ${poly([[a1, 'x']])} + ${P(b1)} · ${P(y)} = ${S(c1)}  →  ${poly([[a1, 'x']])} = ${S(c1)} - ${P(b1.mul(y))} = ${S(c1.sub(b1.mul(y)))}  →  x = ${fmtVal(x)}`);
        verify();
      } else if (kind === 'infinite') steps.push('0 = 0 her y için doğrudur: iki denklem aynı doğruyu verir, sonsuz çözüm vardır.');
      else steps.push(`0 = ${S(rhs)} bir çelişkidir: doğrular paralel olduğundan çözüm yoktur.`);
    } else {
      steps.push('Katsayılardan bazıları sıfır olduğundan klasik yok etme yöntemi uygulanamaz; denklemler doğrudan Cramer formülüyle çözüldü.');
      cramerLines();
      if (kind === 'unique') { steps.push(`x = Dx / D = ${quot(Dx, D)},  y = Dy / D = ${quot(Dy, D)}`); verify(); }
    }
  } else {
    cramerLines();
    if (kind === 'unique') {
      steps.push(`x = Dx / D = ${quot(Dx, D)}`);
      steps.push(`y = Dy / D = ${quot(Dy, D)}`);
      verify();
    } else if (kind === 'infinite') steps.push('D = Dx = Dy = 0 ve çelişen denklem yok: iki denklem aynı doğruyu verir, sonsuz çözüm vardır.');
    else steps.push('D = 0 iken Dx ya da Dy sıfırdan farklıysa (ya da bir denklem 0 = sabit biçimindeyse) doğrular paralel olur: çözüm yoktur.');
  }

  if (kind === 'unique') {
    rows.push({ k: 'x', label: 'x', value: fmtVal(x), strong: true }, { k: 'y', label: 'y', value: fmtVal(y), strong: true });
    if (method !== 'yoketme') rows.push({ k: 'D', label: 'D', value: S(D) }, { k: 'Dx', label: 'Dx', value: S(Dx) }, { k: 'Dy', label: 'Dy', value: S(Dy) });
  } else if (kind === 'infinite') rows.push({ k: 'sol', label: 'Çözüm', value: 'Sonsuz çözüm (doğrular çakışık)', strong: true });
  else rows.push({ k: 'sol', label: 'Çözüm', value: 'Çözüm yok (doğrular paralel)', strong: true });

  // Grafik: iki doğru ve kesişim noktası
  const num = (f) => f.toNumber();
  const xn = kind === 'unique' ? num(x) : 0; const yn = kind === 'unique' ? num(y) : 0;
  const xr = kind === 'unique' ? fitRange([0, xn], 2) : [-6, 6];
  const yr = kind === 'unique' ? fitRange([0, yn], 2) : [-6, 6];
  const curves = []; const vlines = [];
  [[a1, b1, c1, false], [a2, b2, c2, true]].forEach(([a, b, c, dash]) => {
    if (!b.isZero()) { const an = num(a); const bn = num(b); const cn = num(c); curves.push({ fn: (t) => (cn - an * t) / bn, dash }); }
    else if (!a.isZero()) vlines.push({ x: num(c.div(a)), dash });
  });
  return {
    title: 'İki bilinmeyenli sistem', rows, steps,
    graph: { xr, yr, curves, vlines, points: kind === 'unique' ? [{ x: xn, y: yn, label: `(${fmtNum(xn, 3)}; ${fmtNum(yn, 3)})`, vertex: true }] : [], legend: 'Düz çizgi: 1. denklem · Kesikli çizgi: 2. denklem' },
    graphLabel: `İki doğrunun grafiği (1. denklem düz, 2. denklem kesikli çizgi). ${kind === 'unique' ? `Doğrular (${fmtNum(xn, 3)}; ${fmtNum(yn, 3)}) noktasında kesişir.` : kind === 'infinite' ? 'Doğrular çakışıktır.' : 'Doğrular paraleldir, kesişmez.'}`,
  };
}

/* ---------- Grafik çizimi (canvas) ---------- */
function niceStep(range) {
  const raw = range / 6; const p = 10 ** Math.floor(Math.log10(raw)); const f = raw / p;
  return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
}
const tick = (v) => Number(v.toFixed(6)).toLocaleString('tr-TR', { maximumFractionDigits: 6 });

export function drawGraph(canvas, g) {
  const cs = getComputedStyle(document.documentElement);
  const col = (name, fb) => cs.getPropertyValue(name).trim() || fb;
  const cssW = canvas.clientWidth || 320; const H = 260; const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const padL = 40; const padR = 14; const padT = 14; const padB = 24;
  const w = cssW - padL - padR; const h = H - padT - padB;
  const [x0, x1] = g.xr; const [y0, y1] = g.yr;
  const X = (x) => padL + ((x - x0) / (x1 - x0)) * w;
  const Y = (y) => padT + h - ((y - y0) / (y1 - y0)) * h;
  ctx.fillStyle = col('--ba-surface', '#fff'); ctx.fillRect(0, 0, cssW, H);
  ctx.font = '11px "IBM Plex Mono", monospace';
  // ızgara ve eksen değerleri
  const sx = niceStep(x1 - x0); const sy = niceStep(y1 - y0);
  ctx.lineWidth = 1; ctx.strokeStyle = col('--ba-border', '#ddd'); ctx.fillStyle = col('--ba-text-muted', '#666');
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for (let v = Math.ceil(x0 / sx) * sx; v <= x1 + 1e-9; v += sx) {
    ctx.beginPath(); ctx.moveTo(X(v), padT); ctx.lineTo(X(v), padT + h); ctx.stroke();
    ctx.fillText(tick(v), X(v), padT + h + 5);
  }
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for (let v = Math.ceil(y0 / sy) * sy; v <= y1 + 1e-9; v += sy) {
    ctx.beginPath(); ctx.moveTo(padL, Y(v)); ctx.lineTo(padL + w, Y(v)); ctx.stroke();
    ctx.fillText(tick(v), padL - 5, Y(v));
  }
  // eksenler
  ctx.strokeStyle = col('--ba-text-2', '#444'); ctx.lineWidth = 1.5;
  if (y0 <= 0 && y1 >= 0) { ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(padL + w, Y(0)); ctx.stroke(); }
  if (x0 <= 0 && x1 >= 0) { ctx.beginPath(); ctx.moveTo(X(0), padT); ctx.lineTo(X(0), padT + h); ctx.stroke(); }
  // eğriler (kırpılmış)
  ctx.save(); ctx.beginPath(); ctx.rect(padL, padT, w, h); ctx.clip();
  const prim = col('--ba-primary', '#7b2331'); const acc = col('--ba-text', '#111');
  (g.curves || []).forEach((cv, ci) => {
    ctx.strokeStyle = ci === 0 ? prim : acc; ctx.lineWidth = 2.2; ctx.setLineDash(cv.dash ? [7, 5] : []);
    ctx.beginPath();
    const N = 240;
    for (let i = 0; i <= N; i++) {
      const xv = x0 + ((x1 - x0) * i) / N; const yv = cv.fn(xv);
      if (i === 0) ctx.moveTo(X(xv), Y(yv)); else ctx.lineTo(X(xv), Y(yv));
    }
    ctx.stroke();
  });
  (g.vlines || []).forEach((vl, i) => {
    ctx.strokeStyle = vl.dash ? acc : prim; ctx.lineWidth = 2.2; ctx.setLineDash(vl.dash ? [7, 5] : []);
    ctx.beginPath(); ctx.moveTo(X(vl.x), padT); ctx.lineTo(X(vl.x), padT + h); ctx.stroke();
  });
  ctx.restore(); ctx.setLineDash([]);
  // noktalar ve etiketler
  ctx.textBaseline = 'bottom';
  (g.points || []).forEach((p) => {
    if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) return;
    ctx.fillStyle = p.vertex ? acc : prim;
    ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = col('--ba-text', '#111');
    const left = X(p.x) > padL + w * 0.65;
    ctx.textAlign = left ? 'right' : 'left';
    ctx.fillText(p.label, X(p.x) + (left ? -8 : 8), Y(p.y) - 6);
  });
}

/* ---------- Arayüz ---------- */
const MODES = {
  lin: {
    title: 'ax + b = c',
    fields: [['a', 'a', 'x’in katsayısı'], ['b', 'b', 'sabit terim'], ['c', 'c', 'sağ taraf']],
    template: 'ax + b = c',
  },
  quad: {
    title: 'ax² + bx + c = 0',
    fields: [['a', 'a', 'x² katsayısı'], ['b', 'b', 'x katsayısı'], ['c', 'c', 'sabit terim']],
    template: 'ax² + bx + c = 0',
  },
  sys: {
    title: 'a₁x + b₁y = c₁ ; a₂x + b₂y = c₂',
    groups: [
      { legend: '1. denklem: a₁x + b₁y = c₁', fields: [['a1', 'a₁', 'x’in katsayısı'], ['b1', 'b₁', 'y’nin katsayısı'], ['c1', 'c₁', 'sağ taraf']] },
      { legend: '2. denklem: a₂x + b₂y = c₂', fields: [['a2', 'a₂', 'x’in katsayısı'], ['b2', 'b₂', 'y’nin katsayısı'], ['c2', 'c₂', 'sağ taraf']] },
    ],
    template: 'a₁x + b₁y = c₁ ; a₂x + b₂y = c₂',
  },
};

if (typeof document !== 'undefined' && $('fields')) {
  let mode = 'lin'; let lastText = ''; let lastGraph = null; let timer = 0;

  const keysOf = (m) => (MODES[m].fields || MODES[m].groups.flatMap((g) => g.fields)).map((f) => f[0]);
  const labelOf = (m, key) => (MODES[m].fields || MODES[m].groups.flatMap((g) => g.fields)).find((f) => f[0] === key)[1];

  function fieldEl([key, label, hint]) {
    const wrap = document.createElement('div'); wrap.className = 'ba-field';
    const lb = document.createElement('label'); lb.htmlFor = `f-${key}`;
    lb.append(label); const sm = document.createElement('span'); sm.className = 'dc-hint'; sm.textContent = ` ${hint}`; lb.append(sm);
    const inp = document.createElement('input'); inp.id = `f-${key}`; inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
    inp.setAttribute('autocapitalize', 'off'); inp.placeholder = 'örn. -2,5';
    inp.addEventListener('input', schedule);
    wrap.append(lb, inp); return wrap;
  }

  function buildFields() {
    const box = $('fields'); box.replaceChildren();
    const def = MODES[mode];
    if (def.fields) {
      const row = document.createElement('div'); row.className = 'dc-row3';
      def.fields.forEach((f) => row.append(fieldEl(f))); box.append(row);
    } else {
      def.groups.forEach((g) => {
        const fs = document.createElement('fieldset'); fs.className = 'dc-eq';
        const lg = document.createElement('legend'); lg.textContent = g.legend; fs.append(lg);
        const row = document.createElement('div'); row.className = 'dc-row3';
        g.fields.forEach((f) => row.append(fieldEl(f))); fs.append(row); box.append(fs);
      });
    }
    $('method-wrap').hidden = mode !== 'sys';
    $('template').textContent = def.template;
    $('result').classList.remove('is-active'); lastText = ''; lastGraph = null;
    showError($('error'), '');
  }

  function readValues() {
    const vals = {};
    for (const k of keysOf(mode)) vals[k] = parseFrac($(`f-${k}`).value, `${labelOf(mode, k)} katsayısı`);
    return vals;
  }

  function preview(vals) {
    try {
      if (mode === 'lin' && vals.a && vals.b && vals.c) return `${poly([[vals.a, 'x'], [vals.b, '']])} = ${S(vals.c)}`;
      if (mode === 'quad' && vals.a && vals.b && vals.c) return `${poly([[vals.a, 'x²'], [vals.b, 'x'], [vals.c, '']])} = 0`;
      if (mode === 'sys' && Object.values(vals).every(Boolean)) return `${eqStr(vals.a1, vals.b1, vals.c1)}  ;  ${eqStr(vals.a2, vals.b2, vals.c2)}`;
    } catch { /* önizleme sessizce şablona döner */ }
    return MODES[mode].template;
  }

  function render(r) {
    const rowsEl = $('r-rows'); rowsEl.replaceChildren();
    r.rows.forEach((row) => {
      const el = document.createElement('div'); el.className = `ac-row${row.strong ? ' is-strong' : ''}`; el.dataset.k = row.k;
      const dt = document.createElement('dt'); dt.textContent = row.label;
      const dd = document.createElement('dd'); dd.textContent = row.value;
      el.append(dt, dd); rowsEl.append(el);
    });
    const ol = $('steps'); ol.replaceChildren();
    r.steps.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ol.append(li); });
    $('r-title').textContent = r.title;
    $('result').classList.add('is-active');
    const wrap = $('graph-wrap');
    if (r.graph) {
      wrap.hidden = false; lastGraph = r.graph;
      $('graph').setAttribute('aria-label', r.graphLabel); $('graph-text').textContent = r.graphLabel;
      $('graph-legend').textContent = r.graph.legend || '';
      drawGraph($('graph'), r.graph);
    } else { wrap.hidden = true; lastGraph = null; }
    lastText = `${r.title}\n${r.rows.map((x) => `${x.label} = ${x.value}`).join('\n')}\n\nAdım adım çözüm:\n${r.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  }

  function update() {
    $('copy-status').textContent = '';
    let vals;
    try { vals = readValues(); }
    catch (e) { $('result').classList.remove('is-active'); lastText = ''; lastGraph = null; showError($('error'), e.message); return; }
    $('eq-preview').textContent = preview(vals);
    if (Object.values(vals).some((v) => v === null)) { $('result').classList.remove('is-active'); lastText = ''; lastGraph = null; showError($('error'), ''); return; }
    try {
      const r = mode === 'lin' ? solveLinear(vals.a, vals.b, vals.c)
        : mode === 'quad' ? solveQuadratic(vals.a, vals.b, vals.c)
          : solveSystem(vals.a1, vals.b1, vals.c1, vals.a2, vals.b2, vals.c2, $('method').value);
      showError($('error'), '');
      render(r);
    } catch (e) { $('result').classList.remove('is-active'); lastText = ''; lastGraph = null; showError($('error'), e.message); }
  }
  function schedule() { clearTimeout(timer); timer = setTimeout(update, 200); }

  function setMode(m, vals) {
    mode = m;
    document.querySelectorAll('input[name="mode"]').forEach((r) => { r.checked = r.value === m; });
    buildFields();
    if (vals) { keysOf(m).forEach((k, i) => { $(`f-${k}`).value = vals[i]; }); }
    $('eq-preview').textContent = MODES[m].template;
    if (vals) update();
  }

  document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', () => { if (r.checked) setMode(r.value); }));
  $('method').addEventListener('change', update);
  document.querySelectorAll('[data-example]').forEach((b) => b.addEventListener('click', () => {
    setMode(b.dataset.mode, b.dataset.example.split(';').map((s) => s.trim()));
  }));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); clearTimeout(timer); update(); });
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce katsayıları girin.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  window.addEventListener('resize', () => { if (lastGraph && !$('graph-wrap').hidden) drawGraph($('graph'), lastGraph); });
  buildFields(); $('eq-preview').textContent = MODES[mode].template;
}
