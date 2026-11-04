// EBOB, EKOK, asal çarpanlar, asal sayı testi ve bölenler — tamamı tarayıcıda çalışır; hiçbir sayı sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

export const MAX_DIGITS = 40;
export const MAX_COUNT = 10;
const TOTAL_BUDGET_MS = 2000; // çarpanlara ayırma için toplam süre sınırı
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
/** 12 → "¹²" (üs gösterimi) */
export const sup = (e) => String(e).replace(/\d/g, (d) => SUP[d]);
/** Başlık satırları için: 7+ basamakta binlik noktası (tr-TR), aksi halde düz sayı. */
export const fmtBig = (n) => (String(n).length >= 7 ? n.toLocaleString('tr-TR') : String(n));

/* ---------- Girdi ayrıştırma ---------- */
/** "48, 18; 30" → [48n, 18n, 30n]. Boşsa []. Hatalıysa Türkçe, çözüm öneren Error fırlatır. */
export function parseNumbers(raw) {
  const text = String(raw ?? '').trim();
  if (!text) return [];
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  if (parts.length > MAX_COUNT) throw new Error(`En fazla ${MAX_COUNT} sayı girebilirsiniz; ${parts.length} sayı yazdınız. Listeyi kısaltıp tekrar deneyin.`);
  return parts.map((p) => {
    const shown = p.length > 24 ? `${p.slice(0, 24)}…` : p;
    let s = p;
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, ''); // 1.250 gibi binlik ayırıcı
    if (/^-\d+$/.test(s)) throw new Error(`"${shown}" negatif bir sayı. EBOB ve EKOK pozitif tam sayılarla çalışır; eksi işaretini silin (örn. 48, 18).`);
    if (/^\d+\.\d+$/.test(s)) throw new Error(`"${shown}" tam sayı değil. EBOB, EKOK ve asal çarpanlar yalnızca tam sayılarda tanımlıdır; ondalık kısmı silip sayıyı tam sayı yazın.`);
    if (!/^\d+$/.test(s)) throw new Error(`"${shown}" geçerli bir sayı değil. Yalnızca rakam yazın ve sayıları virgülle ayırın (örn. 48, 18, 30).`);
    const digits = s.replace(/^0+/, '');
    if (digits === '') throw new Error('0 ile EBOB/EKOK anlamlı değil. 1 veya daha büyük tam sayılar yazın (örn. 48, 18).');
    if (digits.length > MAX_DIGITS) throw new Error(`"${shown}" çok uzun; en fazla ${MAX_DIGITS} basamaklı sayılar desteklenir. Daha kısa bir sayı yazın.`);
    return BigInt(digits);
  });
}

/* ---------- Temel matematik (BigInt) ---------- */
export function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
export const lcm = (a, b) => (a / gcd(a, b)) * b;

/** Öklid algoritması satırları: büyükten küçüğe, kalan 0 olana dek. */
export function euclid(a, b) {
  let x = a >= b ? a : b; let y = a >= b ? b : a;
  const rows = [];
  while (y !== 0n) { const q = x / y; const r = x % y; rows.push({ x, y, q, r }); x = y; y = r; }
  return { rows, gcd: x };
}

/** Tam sayı karekökü (taban). */
export function isqrt(n) {
  if (n < 2n) return n;
  let x = BigInt(Math.max(1, Math.floor(Math.sqrt(Number(n)))));
  x = (x + n / x) >> 1n; // bir Newton adımı sonrası x >= taban(√n) olur
  for (;;) { const y = (x + n / x) >> 1n; if (y >= x) break; x = y; }
  while (x * x > n) x -= 1n;
  while ((x + 1n) * (x + 1n) <= n) x += 1n;
  return x;
}

function modpow(b, e, m) {
  let r = 1n; b %= m;
  while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n; }
  return r;
}

const MR_BASES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n];
/** Bu sınırın altında Miller–Rabin (ilk 13 asal taban) kesindir. */
export const MR_EXACT_LIMIT = 3317044064679887385961981n;

/** Miller–Rabin asallık testi. */
export function isProbablePrime(n) {
  if (n < 2n) return false;
  for (const p of MR_BASES) { if (n === p) return true; if (n % p === 0n) return false; }
  let d = n - 1n; let s = 0;
  while ((d & 1n) === 0n) { d >>= 1n; s++; }
  outer: for (const a of MR_BASES) {
    let x = modpow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    for (let i = 1; i < s; i++) { x = (x * x) % n; if (x === n - 1n) continue outer; }
    return false;
  }
  return true;
}

/** Pollard–Brent ile bileşik n için bir çarpan bulur; süre dolarsa null. */
function rho(n, deadline) {
  if (n % 2n === 0n) return 2n;
  const sq = isqrt(n);
  if (sq * sq === n) return sq;
  for (let c = 1n; c < 40n; c++) {
    let y = 2n; let r = 1; let q = 1n; let g = 1n; let x = 0n; let ys = 0n;
    const m = 64;
    do {
      x = y;
      for (let i = 0; i < r; i++) {
        y = (y * y + c) % n;
        if ((i & 2047) === 2047 && Date.now() > deadline) return null;
      }
      let k = 0;
      do {
        ys = y;
        const lim = Math.min(m, r - k);
        for (let i = 0; i < lim; i++) { y = (y * y + c) % n; q = (q * (x > y ? x - y : y - x)) % n; }
        g = gcd(q, n); k += m;
        if (Date.now() > deadline) return null;
      } while (k < r && g === 1n);
      r *= 2;
    } while (g === 1n);
    if (g === n) {
      do { ys = (ys * ys + c) % n; g = gcd(x > ys ? x - ys : ys - x, n); } while (g === 1n);
    }
    if (g !== n) return g;
  }
  return null;
}

/** 0..limit için asal işaretleri (Eratosthenes kalburu). */
export function sieve(limit) {
  const is = new Uint8Array(limit + 1).fill(1); is[0] = 0; if (limit >= 1) is[1] = 0;
  for (let i = 2; i * i <= limit; i++) if (is[i]) for (let j = i * i; j <= limit; j += i) is[j] = 0;
  return is;
}
const SIEVE = sieve(1000);
const SMALL_PRIMES = []; for (let i = 2; i <= 1000; i++) if (SIEVE[i]) SMALL_PRIMES.push(BigInt(i));

/**
 * n'yi asal çarpanlarına ayırır.
 * Döner: { factors: [[p, e], …] (artan), complete, rest: [ayrıştırılamayan bileşik çarpanlar] }
 */
export function factorize(n, budgetMs = TOTAL_BUDGET_MS) {
  const deadline = Date.now() + budgetMs;
  const map = new Map();
  const add = (p, e = 1) => map.set(p, (map.get(p) || 0) + e);
  let rest = n;
  for (const p of SMALL_PRIMES) {
    if (p * p > rest) break;
    while (rest % p === 0n) { add(p); rest /= p; }
  }
  const unresolved = [];
  const stack = rest > 1n ? [rest] : [];
  while (stack.length) {
    const m = stack.pop();
    if (m === 1n) continue;
    if (isProbablePrime(m)) { add(m); continue; }
    const f = rho(m, deadline);
    if (f === null) { unresolved.push(m); continue; }
    stack.push(f, m / f);
  }
  const factors = [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return { factors, complete: unresolved.length === 0, rest: unresolved.sort((a, b) => (a < b ? -1 : 1)) };
}

/** [[2n,3],[3n,2],[5n,1]] → "2³·3²·5" */
export function factorString(factors, sep = '·') {
  if (!factors.length) return '1';
  return factors.map(([p, e]) => `${p}${e > 1 ? sup(e) : ''}`).join(sep);
}

/** Bölen sayısı, bölenler toplamı ve (az ise) bölen listesi. */
export function divisorInfo(factors) {
  let count = 1n; let sum = 1n;
  for (const [p, e] of factors) {
    count *= BigInt(e + 1);
    sum *= (p ** BigInt(e + 1) - 1n) / (p - 1n);
  }
  let list = null;
  if (count <= 1000n) {
    list = [1n];
    for (const [p, e] of factors) {
      const next = [];
      for (const d of list) { let pk = 1n; for (let i = 0; i <= e; i++) { next.push(d * pk); pk *= p; } }
      list = next;
    }
    list.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }
  return { count, sum, list };
}

/** Tek sayı için tam çözümleme (çarpanlar, asal durumu, bölenler). */
function analyzeOne(n, budgetMs) {
  const f = factorize(n, budgetMs);
  let kind;
  if (n === 1n) kind = 'one';
  else if (f.complete && f.factors.length === 1 && f.factors[0][1] === 1) kind = 'prime';
  else kind = 'composite';
  const div = f.complete ? divisorInfo(f.factors) : null;
  return { n, ...f, kind, div, exact: n < MR_EXACT_LIMIT };
}

/** Ana çözümleme: BigInt dizisi → tüm sonuçlar. */
export function analyze(nums, budgetMs = TOTAL_BUDGET_MS) {
  const start = Date.now();
  const items = nums.map((n, i) => analyzeOne(n, Math.max(300, (start + budgetMs - Date.now()) / (nums.length - i))));
  const out = { nums, items, multi: nums.length >= 2 };
  if (!out.multi) return out;

  // EBOB: ikişer ikişer zincirleme Öklid
  let g = nums[0]; const chain = [];
  for (let i = 1; i < nums.length; i++) { const e = euclid(g, nums[i]); chain.push({ a: g, b: nums[i], rows: e.rows, result: e.gcd }); g = e.gcd; }
  out.gcd = g; out.euclidChain = chain;

  // EKOK: EKOK(a,b) = a·b / EBOB(a,b), zincirleme
  let l = nums[0]; const lcmSteps = [];
  for (let i = 1; i < nums.length; i++) {
    const d = gcd(l, nums[i]); const next = (l / d) * nums[i];
    lcmSteps.push({ a: l, b: nums[i], d, prod: l * nums[i], result: next }); l = next;
  }
  out.lcm = l; out.lcmSteps = lcmSteps;
  out.coprime = g === 1n;

  // Üs tablosu ve ortak bölme (yalnızca tüm sayılar tam ayrıştıysa)
  if (items.every((it) => it.complete)) {
    const primes = [...new Set(items.flatMap((it) => it.factors.map(([p]) => p)))].sort((a, b) => (a < b ? -1 : 1));
    out.expTable = primes.map((p) => {
      const exps = items.map((it) => (it.factors.find(([q]) => q === p) || [0n, 0])[1]);
      return { p, exps, min: Math.min(...exps), max: Math.max(...exps) };
    });
    // Ortak bölme tablosu: sayılardan en az biri asala bölünüyorsa satır eklenir
    const ladder = []; let cur = [...nums]; let tooLong = false;
    outer: for (const p of primes) {
      while (cur.some((x) => x % p === 0n)) {
        if (ladder.length >= 30) { tooLong = true; break outer; }
        ladder.push({ values: cur, p });
        cur = cur.map((x) => (x % p === 0n ? x / p : x));
      }
    }
    if (!tooLong && ladder.length) { ladder.push({ values: cur, p: null }); out.ladder = ladder; }
  }
  out.multiples = [1n, 2n, 3n, 4n, 5n].map((k) => l * k);
  out.common = factorize(g, 600);
  out.commonDiv = out.common.complete ? divisorInfo(out.common.factors) : null;
  return out;
}

function primeLabel(it) {
  if (it.kind === 'one') return '1 ne asal ne de bileşik sayıdır.';
  if (it.kind === 'prime') return `${it.n} asal sayıdır.`;
  const first = it.factors[0];
  return `${it.n} asal değildir (bileşik)${first ? `; en küçük asal böleni ${first[0]}` : ''}.`;
}

/** Panoya kopyalanacak düz metin. */
export function toText(r) {
  const L = [];
  L.push(`Sayılar: ${r.nums.join(', ')}`);
  if (r.multi) {
    L.push(`EBOB = ${r.gcd}`, `EKOK = ${r.lcm}`, r.coprime ? 'Sayılar aralarında asaldır (EBOB = 1).' : 'Sayılar aralarında asal değildir.');
    L.push('', 'EBOB (Öklid algoritması):');
    r.euclidChain.forEach((c) => {
      L.push(`EBOB(${c.a}, ${c.b}):`);
      c.rows.forEach((x) => L.push(`  ${x.x} = ${x.q} × ${x.y} + ${x.r}`));
      L.push(`  → ${c.result}`);
    });
    L.push('', 'EKOK:');
    r.lcmSteps.forEach((s) => L.push(`  EKOK(${s.a}, ${s.b}) = ${s.a} × ${s.b} / EBOB(${s.a}, ${s.b}) = ${s.prod} / ${s.d} = ${s.result}`));
  }
  L.push('', 'Asal çarpanlara ayırma:');
  r.items.forEach((it) => L.push(`  ${it.n} = ${it.complete ? factorString(it.factors) : `${factorString(it.factors)}·[ayrıştırılamadı: ${it.rest.join(' × ')}]`}`));
  L.push('', 'Asal sayı testi:');
  r.items.forEach((it) => L.push(`  ${it.n}: ${primeLabel(it)}`));
  L.push('', 'Bölenler:');
  r.items.forEach((it) => L.push(`  ${it.n}: ${it.div ? `${it.div.count} bölen${it.div.list ? ` (${it.div.list.join(', ')})` : ''}, toplamı ${it.div.sum}` : 'hesaplanamadı'}`));
  return L.join('\n');
}

/* ---------- Arayüz ---------- */
function h(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) { if (k === 'class') e.className = v; else if (k === 'text') e.textContent = v; else e.setAttribute(k, v); }
  for (const kid of kids.flat()) if (kid != null) e.append(kid);
  return e;
}

/** Çarpan ağacı: n = p × kalan, en küçük asaldan başlayarak iç içe liste. */
function buildTree(n, factors) {
  const seq = []; factors.forEach(([p, e]) => { for (let i = 0; i < e; i++) seq.push(p); });
  const root = h('ul', { class: 'eb-tree', 'aria-label': `${n} sayısının çarpan ağacı` });
  let cur = root; let rest = n;
  seq.forEach((p, i) => {
    const li = h('li');
    if (i === seq.length - 1) { li.append(h('span', { class: 'eb-leaf', text: String(p) })); cur.append(li); return; }
    li.append(h('span', { class: 'eb-node', text: String(rest) }), ' = ', h('span', { class: 'eb-leaf', text: String(p) }), ` × ${rest / p}`);
    const sub = h('ul');
    li.append(sub); cur.append(li); cur = sub; rest /= p;
  });
  return root;
}

function buildTable(headers, rows, caption) {
  const t = h('table', { class: 'eb-table' });
  if (caption) t.append(h('caption', { class: 'visually-hidden', text: caption }));
  t.append(h('thead', {}, h('tr', {}, headers.map((x) => h('th', { scope: 'col', text: x })))));
  t.append(h('tbody', {}, rows.map((r) => h('tr', {}, r.map((c) => h('td', { text: String(c) }))))));
  return h('div', { class: 'eb-scroll' }, t);
}

function renderResult(r) {
  $('single-hint').hidden = r.multi;
  ['row-ebob', 'row-ekok', 'row-coprime', 'sec-euclid', 'sec-ekok'].forEach((id) => { $(id).hidden = !r.multi; });
  if (r.multi) {
    $('ebob').textContent = fmtBig(r.gcd);
    $('ekok').textContent = fmtBig(r.lcm);
    $('coprime').textContent = r.coprime ? 'Evet (EBOB = 1)' : 'Hayır';

    const eu = $('euclid'); eu.replaceChildren();
    r.euclidChain.forEach((c) => {
      const li = h('li', {}, h('strong', { text: `EBOB(${c.a}, ${c.b})` }));
      const ul = h('ul', { class: 'eb-lines' });
      c.rows.forEach((x) => ul.append(h('li', { text: `${x.x} = ${x.q} × ${x.y} + ${x.r}` })));
      ul.append(h('li', { text: `Kalan 0 oldu; son bölen ${c.result}, yani EBOB = ${c.result}.` }));
      li.append(ul); eu.append(li);
    });

    const ek = $('ekok-steps'); ek.replaceChildren();
    r.lcmSteps.forEach((s) => ek.append(h('li', { text: `EKOK(${s.a}, ${s.b}) = ${s.a} × ${s.b} / EBOB(${s.a}, ${s.b}) = ${s.prod} / ${s.d} = ${s.result}` })));
    const ex = $('ekok-extra'); ex.replaceChildren();
    if (r.expTable && r.expTable.length) {
      const hdr = ['Asal', ...r.nums.map((n) => `${n} içinde üs`), 'En küçük üs (EBOB)', 'En büyük üs (EKOK)'];
      ex.append(h('h5', { text: 'Asal çarpanlarla yöntem' }),
        h('p', { class: 'eb-note', text: 'EBOB: ortak asallar, en küçük üsle. EKOK: tüm asallar, en büyük üsle.' }),
        buildTable(hdr, r.expTable.map((x) => [x.p, ...x.exps, x.min, x.max]), 'Asal çarpan üsleri'));
    }
    if (r.ladder) {
      const rows = r.ladder.map((x) => [...x.values, x.p === null ? '—' : x.p]);
      ex.append(h('h5', { text: 'Ortak bölme tablosu (EKOK)' }),
        h('p', { class: 'eb-note', text: `Sayılar asallara bölünür; en az biri bölünüyorsa satır yazılır. Sağ sütundaki asalların çarpımı EKOK'tur: ${r.ladder.filter((x) => x.p !== null).map((x) => x.p).join(' × ')} = ${r.lcm}.` }),
        buildTable([...r.nums.map((n, i) => `${i + 1}. sayı`), 'Bölen asal'], rows, 'Ortak bölme tablosu'));
    }
    ex.append(h('p', { class: 'eb-note', text: `EKOK'un ilk beş katı (ortak katlar): ${r.multiples.join(', ')}` }));
  }

  const fu = $('factors'); fu.replaceChildren();
  const tr = $('trees'); tr.replaceChildren();
  r.items.forEach((it) => {
    let txt;
    if (it.kind === 'one') txt = '1 = 1 (asal çarpanı yok)';
    else if (it.kind === 'prime') txt = `${it.n} = ${it.n} (asal sayı)`;
    else if (it.complete) txt = `${it.n} = ${factorString(it.factors)}`;
    else txt = `${it.n} = ${factorString(it.factors)}${it.factors.length ? '·' : ''}[ayrıştırılamayan: ${it.rest.join(' × ')}]`;
    fu.append(h('li', { text: txt }));

    if (it.kind === 'composite' && it.complete) {
      const depth = it.factors.reduce((s, [, e]) => s + e, 0);
      const box = h('div', { class: 'eb-factor-box' }, h('h5', { text: `${it.n} için ağaç ve tablo` }));
      const grid = h('div', { class: 'eb-two' });
      if (depth <= 14) grid.append(buildTree(it.n, it.factors));
      else grid.append(h('p', { class: 'eb-note', text: 'Çarpan sayısı çok fazla olduğu için ağaç yerine yalnızca tablo gösterildi.' }));
      grid.append(buildTable(['Asal çarpan', 'Üs', 'Değer'], it.factors.map(([p, e]) => [p, e, (p ** BigInt(e)).toString()]), `${it.n} asal çarpan tablosu`));
      box.append(grid); tr.append(box);
    } else if (!it.complete) {
      tr.append(h('p', { class: 'eb-note', text: `${it.n}: ${it.rest.join(' × ')} bileşik çarpanı süre sınırı (2 sn) içinde ayrıştırılamadı. Sayının çok büyük asal çarpanları var; EBOB ve EKOK yine de kesindir.` }));
    }
  });

  const ps = $('prime-status'); ps.replaceChildren();
  r.items.forEach((it) => {
    let why = '';
    if (it.kind === 'prime') {
      if (it.n <= 10n ** 12n) {
        const root = isqrt(it.n);
        const list = root < 1000n ? SMALL_PRIMES.filter((p) => p <= root) : [];
        why = list.length && list.length <= 25
          ? `√${it.n} ≈ ${Math.sqrt(Number(it.n)).toLocaleString('tr-TR', { maximumFractionDigits: 2 })}; ${list.join(', ')} asallarından hiçbiri ${it.n} sayısını tam bölmez.`
          : `√${it.n} sayısına kadar olan asalların hiçbiri sayıyı tam bölmez.`;
      } else why = it.exact ? 'Miller–Rabin testiyle kesin olarak belirlendi.' : 'Miller–Rabin testiyle (13 taban) çok yüksek olasılıkla asal bulundu.';
    } else if (it.kind === 'composite') {
      const first = it.factors[0];
      why = first ? `${it.n} = ${first[0]} × ${it.n / first[0]}` : 'Bileşik olduğu Miller–Rabin testiyle belirlendi.';
    } else why = 'Asal sayılar 1’den büyük olmalıdır; 1’in yalnızca bir böleni vardır.';
    ps.append(h('li', {}, h('strong', { class: it.kind === 'prime' ? 'eb-yes' : '', text: primeLabel(it) }), ` ${why}`));
  });

  const dv = $('divisors'); dv.replaceChildren();
  r.items.forEach((it) => {
    if (!it.div) { dv.append(h('li', { text: `${it.n}: çarpanlarına ayrılamadığı için bölenler hesaplanamadı.` })); return; }
    const li = h('li', {}, h('strong', { text: `${it.n}: ${it.div.count} bölen` }), `, bölenlerin toplamı ${it.div.sum}`);
    if (it.div.list) li.append(h('div', { class: 'eb-divs', text: it.div.list.join(', ') }));
    else li.append(h('div', { class: 'eb-note', text: 'Bölen sayısı çok fazla olduğu için liste yazılmadı; sayı ve toplam kesindir.' }));
    dv.append(li);
  });
  if (r.multi && r.commonDiv) {
    dv.append(h('li', {}, h('strong', { text: `Ortak bölenler (EBOB = ${r.gcd} sayısının bölenleri): ${r.commonDiv.count} adet` }),
      r.commonDiv.list ? h('div', { class: 'eb-divs', text: r.commonDiv.list.join(', ') }) : null));
  }
  highlightSieve(r);
}

/* ---------- 1–1000 tablosu ---------- */
const cells = [];
function buildSieve() {
  const box = $('sieve'); if (!box) return;
  const frag = document.createDocumentFragment();
  for (let i = 1; i <= 1000; i++) {
    const c = h('span', { class: `eb-cell${SIEVE[i] ? ' is-prime' : ''}`, text: String(i) });
    cells[i] = c; frag.append(c);
  }
  box.append(frag);
  const list = $('prime-list');
  if (list) list.textContent = `1 ile 1000 arasındaki ${SMALL_PRIMES.length} asal sayı: ${SMALL_PRIMES.join(', ')}.`;
}
function highlightSieve(r) {
  const hits = new Set(); const inputs = new Set();
  if (r) {
    r.items.forEach((it) => {
      if (it.n <= 1000n) inputs.add(Number(it.n));
      it.factors.forEach(([p]) => { if (p <= 1000n) hits.add(Number(p)); });
    });
  }
  for (let i = 1; i <= 1000; i++) {
    cells[i].classList.toggle('is-hit', hits.has(i));
    cells[i].classList.toggle('is-input', inputs.has(i));
  }
  const parts = [];
  if (hits.size) parts.push(`Girdiğiniz sayıların asal çarpanları (≤ 1000): ${[...hits].sort((a, b) => a - b).join(', ')}`);
  if (inputs.size) parts.push(`Tabloda işaretli girdiler: ${[...inputs].sort((a, b) => a - b).join(', ')}`);
  $('sieve-info').textContent = parts.join(' · ');
}

if (typeof document !== 'undefined' && $('nums')) {
  let lastText = '';
  let timer = 0;
  buildSieve();

  const update = () => {
    $('copy-status').textContent = '';
    let nums;
    try { nums = parseNumbers($('nums').value); }
    catch (e) { $('result').classList.remove('is-active'); lastText = ''; showError($('error'), e.message); highlightSieve(null); return; }
    showError($('error'), '');
    if (!nums.length) { $('result').classList.remove('is-active'); lastText = ''; highlightSieve(null); return; }
    const r = analyze(nums);
    renderResult(r);
    lastText = toText(r);
    $('result').classList.add('is-active');
  };

  $('nums').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(update, 200); });
  $('form').addEventListener('submit', (e) => { e.preventDefault(); clearTimeout(timer); update(); });
  document.querySelectorAll('[data-example]').forEach((b) => b.addEventListener('click', () => {
    $('nums').value = b.dataset.example; clearTimeout(timer); update(); $('nums').focus();
  }));
  $('copy').addEventListener('click', async () => {
    if (!lastText) { $('copy-status').textContent = 'Kopyalanacak sonuç yok; önce sayıları yazın.'; return; }
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
}
