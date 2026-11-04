// Kesir Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz sayılar sunucuya gitmez.
// Tüm hesap BigInt ile yapılır: büyük paydalarda taşma ve yuvarlama hatası olmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX_DIGITS = 18;      // tek bir sayıda en fazla basamak
const MAX_LIST = 12;        // karşılaştırma/payda eşitlemede en fazla kesir
const DEC_LIMIT = 60;       // ondalık açılımda hesaplanan en fazla basamak
const OPS = { add: '+', sub: '−', mul: '×', div: '÷' };

/* ---------- BigInt yardımcıları ---------- */
const babs = (a) => (a < 0n ? -a : a);
export function gcd(a, b) { a = babs(a); b = babs(b); while (b) { [a, b] = [b, a % b]; } return a; }
export function lcm(a, b) { return a === 0n || b === 0n ? 0n : babs((a / gcd(a, b)) * b); }
const cmp = (x, y) => { const v = x.n * y.d - y.n * x.d; return v < 0n ? -1 : v > 0n ? 1 : 0; };
/** Öklid algoritması satırları: "12 = 1 × 8 + 4" … ve EBOB. */
function euclid(a, b) {
  let x = a >= b ? a : b, y = a >= b ? b : a;
  const lines = [];
  while (y !== 0n) { const q = x / y, r = x % y; lines.push(`${x} = ${q} × ${y} + ${r}`); x = y; y = r; }
  return { lines, g: x };
}

/* ---------- Biçimleme ---------- */
const fmt = (f) => (f.d === 1n && !f.force ? `${f.n}` : `${f.n}/${f.d}`);
/** Bileşik kesri tam sayılı kesre çevirir: 3/2 → "1 1/2". */
export function fmtMixed(f) {
  if (f.d === 1n) return `${f.n}`;
  const a = babs(f.n);
  if (a < f.d) return fmt(f);
  const w = a / f.d, r = a % f.d, s = f.n < 0n ? '-' : '';
  return r === 0n ? `${s}${w}` : `${s}${w} ${r}/${f.d}`;
}

/** Kesrin ondalık açılımı: bitiyorsa "0,75", dönüyorsa "0,8(3)", çok uzunsa "0,0103…". */
export function decimalOf(f) {
  const neg = f.n < 0n;
  let n = babs(f.n);
  const ip = n / f.d;
  let rem = n % f.d;
  const digits = [], seen = new Map();
  while (rem !== 0n && digits.length < DEC_LIMIT && !seen.has(rem)) {
    seen.set(rem, digits.length);
    rem *= 10n;
    digits.push(rem / f.d);
    rem %= f.d;
  }
  const sign = neg ? '-' : '';
  if (rem === 0n) return { text: `${sign}${ip}${digits.length ? ',' + digits.join('') : ''}`, exact: true, repeating: false };
  if (seen.has(rem)) {
    const at = seen.get(rem);
    return { text: `${sign}${ip},${digits.slice(0, at).join('')}(${digits.slice(at).join('')})`, exact: false, repeating: true };
  }
  return { text: `${sign}${ip},${digits.slice(0, 20).join('')}…`, exact: false, repeating: false };
}

/** k ondalık basamağa yarım yukarı yuvarlanmış metin ("0,3333"). */
function roundedText(f, k) {
  const neg = f.n < 0n;
  const scale = 10n ** BigInt(k);
  const q = (babs(f.n) * scale * 2n + f.d) / (2n * f.d);
  const s = q.toString().padStart(k + 1, '0');
  return `${neg && q !== 0n ? '-' : ''}${s.slice(0, -k)},${s.slice(-k)}`;
}

/** Yüzde metni: 3/4 → "%75"; 1/3 → "%33,(3)". */
export function percentOf(f) {
  const p = decimalOf({ n: f.n * 100n, d: f.d });
  return p.text.startsWith('-') ? `-%${p.text.slice(1)}` : `%${p.text}`;
}

/* ---------- Giriş çözümleme ---------- */
const VULGAR = { '½': ' 1/2', '¼': ' 1/4', '¾': ' 3/4', '⅓': ' 1/3', '⅔': ' 2/3', '⅕': ' 1/5', '⅖': ' 2/5', '⅗': ' 3/5', '⅘': ' 4/5', '⅙': ' 1/6', '⅚': ' 5/6', '⅛': ' 1/8', '⅜': ' 3/8', '⅝': ' 5/8', '⅞': ' 7/8' };

/** "0,75", "1.5", "1.000,5" → {n,d} (d = 10 üssü); okunamazsa null. */
function parseDec(str) {
  let s = str.trim();
  if (!/^[\d.,]+$/.test(s)) return null;
  const dots = (s.match(/\./g) || []).length, commas = (s.match(/,/g) || []).length;
  let sep = null;
  if (dots && commas) {
    // İkisi birden varsa sonuncusu ondalık, diğeri binlik ayırıcıdır.
    sep = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ',';
    const thousands = sep === '.' ? ',' : '.';
    if (s.split(sep).length > 2) return null;
    s = s.split(thousands).join('');
  } else if (dots + commas > 1) {
    // Aynı ayırıcıdan birden fazlaysa binlik ayırıcı kabul edilir ("1.000.000").
    s = s.replace(/[.,]/g, '');
  } else if (dots + commas === 1) sep = dots ? '.' : ',';
  const [ip, fp = ''] = sep ? s.split(sep) : [s, ''];
  if (!/^\d*$/.test(ip) || !/^\d*$/.test(fp) || (ip + fp) === '') return null;
  if ((ip + fp).length > MAX_DIGITS) return { tooLong: true };
  return { n: BigInt(ip + fp), d: 10n ** BigInt(fp.length), hasSep: !!sep && fp.length > 0 };
}

/**
 * Metni kesre çevirir. Dönen nesne: { n, d, kind, raw, ... }.
 * kind: integer | fraction | mixed | decimal | percent. Hatada Türkçe, çözüm öneren Error.
 */
export function parseFraction(text, label = 'Kesir') {
  const raw = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!raw) throw new Error(`${label} boş. 3/4, 1 1/2 ya da 0,75 gibi bir değer yazın.`);
  if (raw.length > 60) throw new Error(`${label} çok uzun. En fazla ${MAX_DIGITS} basamaklı, kısa bir sayı yazın.`);
  const bad = () => new Error(`${label} okunamadı: “${raw}”. Kesri 3/4, tam sayılı kesri 1 1/2, ondalık sayıyı 0,75 biçiminde yazın.`);
  const longErr = () => new Error(`${label} için sayı çok uzun. Her sayıda en fazla ${MAX_DIGITS} basamak kullanın.`);
  let s = raw.replace(/[−–]/g, '-').replace(/[½¼¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (c) => VULGAR[c]).replace(/\s+/g, ' ').trim();
  let neg = false;
  const sm = /^([+-])\s*(.*)$/.exec(s);
  if (sm) { neg = sm[1] === '-'; s = sm[2]; }
  let percent = false;
  if (s.startsWith('%')) { percent = true; s = s.slice(1).trim(); }
  else if (s.endsWith('%')) { percent = true; s = s.slice(0, -1).trim(); }
  if (!s) throw bad();
  const sign = neg ? -1n : 1n;

  // Tam sayılı kesir: "1 1/2"
  const mm = /^(\d+) (\d+) ?\/ ?(\d+)$/.exec(s);
  if (!percent && mm) {
    if (mm[1].length > MAX_DIGITS || mm[2].length > MAX_DIGITS || mm[3].length > MAX_DIGITS) throw longErr();
    const w = BigInt(mm[1]), nn = BigInt(mm[2]), dd = BigInt(mm[3]);
    if (dd === 0n) throw new Error(`${label}: payda sıfır olamaz. Paydayı 0'dan farklı bir sayıyla değiştirin (örn. 1 1/2).`);
    return { n: sign * (w * dd + nn), d: dd, kind: 'mixed', raw, whole: w, num: nn, den: dd };
  }
  // Kesir: "3/4" (pay ve payda ondalık da olabilir: "1,5/2")
  if (!percent && s.includes('/')) {
    const parts = s.split('/');
    if (parts.length !== 2) throw bad();
    const a = parseDec(parts[0]), b = parseDec(parts[1]);
    if (!a || !b) throw bad();
    if (a.tooLong || b.tooLong) throw longErr();
    if (b.n === 0n) throw new Error(`${label}: payda sıfır olamaz. Paydayı 0'dan farklı bir sayıyla değiştirin (örn. 3/4).`);
    return { n: sign * a.n * b.d, d: a.d * b.n, kind: 'fraction', raw };
  }
  // Ondalık, tam sayı ya da yüzde
  const x = parseDec(s);
  if (!x) throw bad();
  if (x.tooLong) throw longErr();
  if (percent) return { n: sign * x.n, d: x.d * 100n, kind: 'percent', raw };
  return { n: sign * x.n, d: x.d, kind: x.hasSep ? 'decimal' : 'integer', raw };
}

/* ---------- Adım adım çözüm ----------
 * Adım = metin parçaları dizisi. Parça: string | {n,d,force?} (üst üste kesir) | {mixed:{n,d}} (tam sayılı kesir). */
const fr = (n, d, force) => ({ n, d, force: !!force });

/** Girdi çevirme adımı: tam sayılı/ondalık/yüzde → bileşik kesir. */
function inputSteps(steps, p, title) {
  const f = { n: p.n, d: p.d };
  if (p.kind === 'mixed') steps.push([`${title}: `, p.raw, ' tam sayılı kesrini bileşik kesre çeviririz: ', `${p.whole} × ${p.den} + ${p.num} = ${p.whole * p.den + p.num}`, ' → ', fr(babs(f.n), f.d, true), p.n < 0n ? ' (işaret negatif)' : '']);
  else if (p.kind === 'decimal') steps.push([`${title}: `, p.raw, ' ondalık sayısını kesre çeviririz; virgülden sonraki basamak sayısı kadar sıfırlı payda yazarız: ', fr(f.n, f.d, true)]);
  else if (p.kind === 'percent') steps.push([`${title}: `, p.raw, ' yüzdesi, 100 paydalı kesirdir: ', fr(f.n, f.d, true)]);
  else if (p.kind === 'integer') steps.push([`${title}: `, p.raw, ' tam sayısını payda 1 olan kesir olarak yazarız: ', fr(f.n, 1n, true)]);
}

/** Sadeleştirme adımlarını ekler ve sadeleşmiş kesri döndürür. */
function simplifySteps(steps, f) {
  if (f.n === 0n) { steps.push(['Pay 0 olduğundan sonuç 0\'dır.']); return { n: 0n, d: 1n }; }
  if (f.d === 1n) return f;
  const { lines, g } = euclid(babs(f.n), f.d);
  const shown = lines.length > 8 ? [...lines.slice(0, 8), '…'] : lines;
  steps.push(['Sadeleştirme için pay ile paydanın EBOB\'unu Öklid algoritmasıyla buluruz: ', shown.join('; '), ` → EBOB(${babs(f.n)}, ${f.d}) = ${g}.`]);
  if (g === 1n) { steps.push([fr(f.n, f.d), ' kesrinde EBOB 1 olduğundan pay ve payda aralarında asaldır; kesir en sade biçimindedir.']); return f; }
  const r = { n: f.n / g, d: f.d / g };
  steps.push(['Pay ve paydayı ', String(g), ' ile böleriz: ', fr(f.n, f.d), ' = ', fr(r.n, r.d)]);
  return r;
}

function mixedStep(steps, f) {
  if (f.d === 1n || babs(f.n) < f.d) return;
  const a = babs(f.n);
  steps.push(['Bileşik kesri tam sayılı kesre çeviririz: ', `${a} ÷ ${f.d} = ${a / f.d} kalan ${a % f.d}`, ' → ', { mixed: f }]);
}

/** Payda eşitleme adımları (EBOB/EKOK). items: [{n,d,label}] ; ortak paydayı ve genişletilmiş kesirleri döndürür. */
function equalizeSteps(steps, items) {
  let L = items[0].d, G = items[0].d;
  for (const it of items.slice(1)) { L = lcm(L, it.d); G = gcd(G, it.d); }
  const dens = items.map((i) => i.d);
  if (dens.every((d) => d === dens[0])) {
    steps.push([`Paydalar zaten eşit (${dens[0]}); ortak payda ${dens[0]} alınır.`]);
    return { L, G, eq: items.map((i) => ({ ...i, en: i.n, k: 1n })) };
  }
  if (items.length === 2) {
    const [x, y] = dens;
    steps.push([`Paydaları eşitlemek için EBOB ve EKOK bulunur: EBOB(${x}, ${y}) = ${gcd(x, y)}; EKOK(${x}, ${y}) = (${x} × ${y}) ÷ ${gcd(x, y)} = ${L}. Ortak payda ${L} olur.`]);
  } else {
    steps.push([`Paydaların EKOK'u ikişer ikişer bulunur: EKOK(${dens.join(', ')}) = ${L}; EBOB(${dens.join(', ')}) = ${G}. Ortak payda ${L} olur.`]);
  }
  const eq = items.map((i) => ({ ...i, k: L / i.d, en: i.n * (L / i.d) }));
  for (const e of eq) {
    const lab = e.label && e.label !== `${e.n}/${e.d}` ? `${e.label}: ` : '';
    steps.push([lab, fr(e.n, e.d, true), ` kesrini ${e.k} ile genişletiriz (pay ve paydayı ${e.k} ile çarparız): `, fr(e.en, L)]);
  }
  return { L, G, eq };
}

/* ---------- Mod hesapları ---------- */
/** Ortak sonuç satırları: sadeleşmiş kesir, tam sayılı kesir, ondalık, yüzde. */
function summaryRows(f, extraSteps) {
  const dec = decimalOf(f);
  const rows = [
    ['fraction', 'Sade kesir', fmt(f)],
    ['mixed', 'Tam sayılı kesir', f.d === 1n || babs(f.n) >= f.d ? fmtMixed(f) : `${fmt(f)} (zaten öz kesir)`],
    ['decimal', 'Ondalık', dec.text],
  ];
  if (!dec.exact) rows.push(['approx', 'Yaklaşık değer', `${roundedText(f, 4)} (4 ondalık basamak)`]);
  rows.push(['percent', 'Yüzde', percentOf(f)]);
  if (extraSteps) {
    extraSteps.push([fr(f.n, f.d), ' kesrini ondalık sayıya çevirmek için payı paydaya böleriz: ', `${babs(f.n)} ÷ ${f.d} = ${dec.text}`, dec.repeating ? ' (parantez içindeki rakamlar sonsuza dek tekrar eder)' : dec.exact ? '' : ' (açılım uzun olduğu için ilk basamaklar gösterildi)']);
    extraSteps.push(['Yüzdeye çevirmek için kesri 100 ile çarparız: ', `${dec.text} × 100 = ${percentOf(f)}`]);
  }
  return rows;
}

/** İki sayı üzerinde dört işlem. */
export function computeOperation(aText, bText, op) {
  const a = parseFraction(aText, 'Birinci kesir'), b = parseFraction(bText, 'İkinci kesir');
  if (!OPS[op]) throw new Error('İşlem seçilemedi. Toplama, çıkarma, çarpma ya da bölmeden birini seçin.');
  if (op === 'div' && b.n === 0n) throw new Error('Sıfıra bölme yapılamaz. İkinci kesri 0\'dan farklı bir değerle değiştirin.');
  const steps = [];
  inputSteps(steps, a, 'Birinci sayı');
  inputSteps(steps, b, 'İkinci sayı');
  let raw;
  if (op === 'add' || op === 'sub') {
    const sub = op === 'sub';
    const { L, eq } = equalizeSteps(steps, [{ n: a.n, d: a.d, label: 'Birinci kesir' }, { n: b.n, d: b.d, label: 'İkinci kesir' }]);
    const num = sub ? eq[0].en - eq[1].en : eq[0].en + eq[1].en;
    steps.push([`Paydalar eşit olduğundan payları ${sub ? 'çıkarırız' : 'toplarız'}: `, fr(eq[0].en, L), ` ${OPS[op]} `, fr(eq[1].en, L), ' = ', fr(num, L)]);
    raw = { n: num, d: L };
  } else if (op === 'mul') {
    raw = { n: a.n * b.n, d: a.d * b.d };
    steps.push(['Payları payla, paydaları paydayla çarparız: ', fr(a.n, a.d), ' × ', fr(b.n, b.d), ' = ', fr(raw.n, raw.d)]);
  } else {
    // Bölme: ikinci kesrin tersiyle çarp
    const inv = b.n < 0n ? { n: -b.d, d: -b.n } : { n: b.d, d: b.n };
    steps.push(['Bölmeyi, ikinci kesrin tersiyle çarpmaya çeviririz (pay ile payda yer değiştirir): ', fr(a.n, a.d), ' ÷ ', fr(b.n, b.d), ' = ', fr(a.n, a.d), ' × ', fr(inv.n, inv.d, true)]);
    raw = { n: a.n * inv.n, d: a.d * inv.d };
    steps.push(['Payları payla, paydaları paydayla çarparız: ', fr(a.n, a.d), ' × ', fr(inv.n, inv.d, true), ' = ', fr(raw.n, raw.d)]);
  }
  const res = simplifySteps(steps, raw);
  mixedStep(steps, res);
  const rows = summaryRows(res, steps);
  const side = (p) => (p.kind === 'fraction' || p.kind === 'integer' ? fr(p.n, p.d) : p.raw);
  const main = [side(a), ` ${OPS[op]} `, side(b), ' = ', fr(res.n, res.d)];
  if (res.d !== 1n && babs(res.n) > res.d) main.push(' = ', { mixed: res });
  return { main, rows, steps, result: res };
}

/** Tek sayıyı sadeleştirir (ya da yalnızca dönüştürür). */
export function computeSingle(text, mode) {
  const a = parseFraction(text, 'Kesir');
  const steps = [];
  inputSteps(steps, a, 'Girdi');
  const raw = { n: a.n, d: a.d };
  const res = simplifySteps(steps, raw);
  mixedStep(steps, res);
  const rows = summaryRows(res, mode === 'donustur' ? steps : null);
  if (mode === 'sadelestir') {
    const g = raw.n === 0n ? raw.d : gcd(raw.n, raw.d);
    rows.unshift(['gcd', 'Pay ve paydanın EBOB\'u', String(g)]);
    // Sadeleştirmede ondalık/yüzde satırları da yararlıdır; adımlar yalnızca sadeleştirmeyi anlatır.
  }
  const main = [a.kind === 'fraction' || a.kind === 'integer' ? fr(a.n, a.d) : a.raw, ' = ', fr(res.n, res.d)];
  if (res.d !== 1n && babs(res.n) > res.d) main.push(' = ', { mixed: res });
  return { main, rows, steps, result: res };
}

/** Listeyi (noktalı virgül/yeni satır ayraçlı) kesirlere çevirir. */
export function parseList(text) {
  const parts = String(text ?? '').split(/[;\n]+/).map((s) => s.trim()).filter(Boolean);
  const hint = ' Kesirleri noktalı virgül (;) ya da yeni satırla ayırın; virgül ondalık ayırıcıdır.';
  if (parts.length < 2) throw new Error(`En az iki kesir yazın (örn. 1/2; 3/4; 0,6).${hint}`);
  if (parts.length > MAX_LIST) throw new Error(`En fazla ${MAX_LIST} kesir girebilirsiniz. Listeyi kısaltıp tekrar deneyin.`);
  return parts.map((t, i) => {
    try { return parseFraction(t, `${i + 1}. kesir`); }
    catch (e) { throw new Error(e.message + hint); }
  });
}

/** Karşılaştırma ve sıralama. */
export function computeCompare(text) {
  const list = parseList(text).map((p) => ({ ...p, label: p.raw }));
  const steps = [];
  list.forEach((p, i) => inputSteps(steps, p, `${i + 1}. sayı`));
  const items = list.map((p) => ({ n: p.n, d: p.d, label: p.raw }));
  const { L, eq } = equalizeSteps(steps, items);
  steps.push([`Paydalar ${L} olduğundan yalnızca paylar karşılaştırılır: ${eq.map((e) => e.en).join(', ')}.`]);
  const asc = items.map((it, i) => ({ ...it, i })).sort((x, y) => cmp(x, y) || x.i - y.i);
  const chain = (arr, dir) => arr.map((it, k) => (k === 0 ? it.label : `${cmp(arr[k - 1], it) === 0 ? '=' : dir} ${it.label}`)).join(' ');
  const desc = [...asc].reverse().sort((x, y) => cmp(y, x) || x.i - y.i);
  const order = chain(asc, '<');
  steps.push([`Küçükten büyüğe sıralama: ${order}`]);
  const max = desc[0], min = asc[0];
  const allEqual = cmp(min, max) === 0;
  const rows = [
    ['order', 'Küçükten büyüğe', order],
    ['desc', 'Büyükten küçüğe', chain(desc, '>')],
    ['max', 'En büyük', allEqual ? 'Hepsi eşit' : max.label],
    ['min', 'En küçük', allEqual ? 'Hepsi eşit' : min.label],
  ];
  return { main: [order], rows, steps, result: null };
}

/** Payda eşitleme (EBOB/EKOK). */
export function computeEqualize(text) {
  const list = parseList(text);
  const steps = [];
  list.forEach((p, i) => inputSteps(steps, p, `${i + 1}. sayı`));
  const items = list.map((p) => ({ n: p.n, d: p.d, label: p.raw }));
  const { L, G, eq } = equalizeSteps(steps, items);
  const rows = [
    ['lcm', 'Ortak payda (paydaların EKOK\'u)', String(L)],
    ['gcd', 'Paydaların EBOB\'u', String(G)],
    ...eq.map((e, i) => [`eq-${i}`, e.label, `${e.en}/${L}`]),
  ];
  const main = [`Ortak payda: ${L}`];
  return { main, rows, steps, result: null };
}

/* ---------- Arayüz ---------- */
const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;
let last = null;

function tokensToText(tokens) {
  return tokens.map((t) => (typeof t === 'string' ? t : t.mixed ? fmtMixed(t.mixed) : fmt(t))).join('');
}

function fracEl(f) {
  const wrap = document.createElement('span');
  wrap.className = 'frac';
  const neg = f.n < 0n;
  const num = document.createElement('span'); num.className = 'num'; num.textContent = String(babs(f.n));
  const slash = document.createElement('span'); slash.className = 'visually-hidden'; slash.textContent = '/';
  const den = document.createElement('span'); den.className = 'den'; den.textContent = String(f.d);
  wrap.append(num, slash, den);
  if (!neg) return wrap;
  const out = document.createElement('span');
  out.append('-', wrap);
  return out;
}

function tokenNodes(tokens) {
  const frag = document.createDocumentFragment();
  for (const t of tokens) {
    if (typeof t === 'string') frag.append(t);
    else if (t.mixed) {
      const m = t.mixed, a = babs(m.n);
      const holder = document.createElement('span'); holder.className = 'mixed';
      holder.append(`${m.n < 0n ? '-' : ''}${a / m.d} `, fracEl({ n: a % m.d, d: m.d }));
      frag.append(holder);
    } else if (t.d === 1n && !t.force) frag.append(String(t.n));
    else frag.append(fracEl(t));
  }
  return frag;
}

function render(r) {
  const main = $('r-main');
  main.textContent = '';
  main.append(tokenNodes(r.main));
  const dl = $('r-rows');
  dl.textContent = '';
  for (const [key, label, text] of r.rows) {
    const row = document.createElement('div'); row.className = 'kdv-row';
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.id = `r-${key}`; dd.textContent = text;
    row.append(dt, dd); dl.append(row);
  }
  const ol = $('r-steps');
  ol.textContent = '';
  for (const s of r.steps) { const li = document.createElement('li'); li.append(tokenNodes(s)); ol.append(li); }
  $('steps-wrap').hidden = r.steps.length === 0;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  return `${tokensToText(r.main)}\n${r.rows.map(([, l, t]) => `${l}: ${t}`).join('\n')}`;
}

function syncMode() {
  const m = val('mode');
  const single = m === 'sadelestir' || m === 'donustur';
  const list = m === 'karsilastir' || m === 'payda';
  $('wrap-a').hidden = list;
  $('wrap-op').hidden = m !== 'islem';
  $('wrap-b').hidden = m !== 'islem';
  $('wrap-list').hidden = !list;
  $('a-label').textContent = m === 'islem' ? 'Birinci kesir' : single ? 'Kesir ya da sayı' : 'Kesir';
  $('calc').textContent = { islem: 'Hesapla', sadelestir: 'Sadeleştir', donustur: 'Dönüştür', karsilastir: 'Karşılaştır ve sırala', payda: 'Paydaları eşitle' }[m];
}

function run() {
  showError($('error'), '');
  try {
    const m = val('mode');
    if (m === 'islem') last = computeOperation($('a').value, $('b').value, $('op').value);
    else if (m === 'sadelestir' || m === 'donustur') last = computeSingle($('a').value, m);
    else if (m === 'karsilastir') last = computeCompare($('list').value);
    else last = computeEqualize($('list').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', () => {
  syncMode();
  $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), ''); last = null;
}));
document.querySelectorAll('[data-ex]').forEach((b) => b.addEventListener('click', () => {
  const [a, op, bb] = b.dataset.ex.split('|');
  $('m-islem').checked = true; syncMode();
  $('a').value = a; $('op').value = op; $('b').value = bb;
  run();
}));
$('clear').addEventListener('click', () => {
  $('a').value = ''; $('b').value = ''; $('list').value = '';
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
  ($('wrap-a').hidden ? $('list') : $('a')).focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

syncMode();
