// Kombinasyon, Permütasyon ve Faktöriyel Hesaplama — BigInt ile tam sonuç; tamamı tarayıcıda çalışır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const MAX = 1000;

/* ---------- Sayı biçimi ---------- */
/** BigInt'i Türkçe binlik noktalarıyla yazar: 13.983.816 */
export function fmtBig(b) {
  return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
/** Büyük sayılar için bilimsel gösterim: 4,0239 × 10^2567 */
function sci(b) {
  const s = b.toString();
  return `${s[0]},${s.slice(1, 5).padEnd(4, '0')} × 10^${s.length - 1}`;
}
/** Küçük olasılığı okunur yazar (Number). */
function fmtSmall(p) {
  if (p === 0) return '0';
  if (p >= 1e-4) return p.toLocaleString('tr-TR', { maximumSignificantDigits: 4 });
  const [m, e] = p.toExponential(3).split('e');
  return `${m.replace('.', ',')} × 10^${Number(e)}`;
}
/** İki BigInt'in oranını Number'a çevirir (çok büyük bölenlerde ölçekleyerek). */
function ratio(num, den) {
  const extra = Math.max(0, den.toString().length - 300);
  const sh = 10n ** BigInt(extra);
  return Number(num / sh) / Number(den / sh);
}

/* ---------- Matematik (BigInt) ---------- */
const factCache = [1n];
export function factorial(n) {
  for (let i = factCache.length; i <= n; i++) factCache[i] = factCache[i - 1] * BigInt(i);
  return factCache[n];
}
/** n × (n−1) × … (k terim) */
function fallingProduct(n, k) {
  let p = 1n;
  for (let i = 0; i < k; i++) p *= BigInt(n - i);
  return p;
}
export function nCr(n, r) {
  const k = Math.min(r, n - r);
  return fallingProduct(n, k) / factorial(k);
}
export function nPr(n, r) { return fallingProduct(n, r); }

/** Terimleri kısaltarak çarpım ifadesi üretir: 49 × 48 × … × 44 */
function termsText(from, count, max = 7) {
  const arr = Array.from({ length: count }, (_, i) => from - i);
  if (arr.length <= max) return arr.join(' × ');
  return `${arr.slice(0, max - 2).join(' × ')} × … × ${arr[arr.length - 2]} × ${arr[arr.length - 1]}`;
}

/* ---------- Girdi okuma ---------- */
/** Tam sayı okur (boşsa null); Türkçe, çözüm öneren hata verir. */
function readInt(id, label) {
  const raw = $(id).value.trim().replace(/\s/g, '');
  if (!raw) return null;
  if (/^-/.test(raw)) throw new Error(`${label} negatif olamaz. 0 ya da pozitif bir tam sayı yazın.`);
  if (/[^0-9.,]/.test(raw)) throw new Error(`${label} yalnızca rakam içermeli (örn. 49). Harf ve sembolleri silip tekrar deneyin.`);
  let s = raw;
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  if (!/^\d+$/.test(s)) throw new Error(`${label} tam sayı olmalı; ondalık sayı kabul edilmez. Virgülden sonrasını silin.`);
  const n = Number(s);
  if (n > MAX) throw new Error(`${label} en fazla ${MAX.toLocaleString('tr-TR')} olabilir. Daha büyük sayılar tarayıcıyı yavaşlatır; değeri küçültüp tekrar deneyin.`);
  return n;
}

/** Tekrarlı permütasyon girdisi: kelime (harfler sayılır) ya da "4,4,2,1" gibi tekrar sayıları. */
function readGroups() {
  const raw = $('f-text').value.trim();
  if (!raw) return null;
  if (/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(raw)) {
    const counts = new Map();
    for (const ch of raw.toLocaleUpperCase('tr')) {
      if (/\s/.test(ch)) continue;
      counts.set(ch, (counts.get(ch) || 0) + 1);
    }
    return { groups: [...counts.values()], labels: [...counts.entries()].map(([k, v]) => `${k}×${v}`), word: true };
  }
  const parts = raw.split(/[\s,;]+/).filter(Boolean);
  const groups = parts.map((p) => {
    if (!/^\d+$/.test(p)) throw new Error(`"${p}" tekrar sayısı olarak okunamadı. Tam sayıları virgülle ayırın (örn. 4,4,2,1) ya da bir kelime yazın.`);
    return Number(p);
  });
  if (groups.some((g) => g < 1)) throw new Error('Her tekrar sayısı en az 1 olmalı. Sıfır olan grupları listeden çıkarın.');
  return { groups, labels: groups.map((g, i) => `n${i + 1}=${g}`), word: false };
}

/* ---------- Modlar ---------- */
const MODES = {
  comb: { name: 'Kombinasyon C(n, r)', fields: ['n', 'r'], nLabel: 'Eleman sayısı (n)', rLabel: 'Seçilecek eleman sayısı (r)' },
  perm: { name: 'Permütasyon P(n, r)', fields: ['n', 'r'], nLabel: 'Eleman sayısı (n)', rLabel: 'Dizilecek eleman sayısı (r)' },
  permrep: { name: 'Tekrarlı permütasyon (n^r)', fields: ['n', 'r'], nLabel: 'Seçenek sayısı (n)', rLabel: 'Konum sayısı (r)' },
  permsame: { name: 'Aynı elemanlı permütasyon', fields: ['text'] },
  combrep: { name: 'Tekrarlı kombinasyon', fields: ['n', 'r'], nLabel: 'Tür sayısı (n)', rLabel: 'Seçilecek adet (r)' },
  fact: { name: 'Faktöriyel n!', fields: ['n'], nLabel: 'Sayı (n)' },
  prob: { name: 'Olasılık: N sayıdan r seç', fields: ['n', 'r', 'k'], nLabel: 'Havuzdaki sayı adedi (N)', rLabel: 'Çekilen / seçilen adet (r)', kLabel: 'Tutturulması istenen adet (k) — boşsa r' },
};


/** Her mod için { main, mainLabel, rows, steps, big } döndürür; girdi eksikse null. */
function calc(mode) {
  const M = MODES[mode];
  const n = M.fields.includes('n') ? readInt('f-n', 'n') : null;
  const r = M.fields.includes('r') ? readInt('f-r', 'r') : null;

  if (mode === 'fact') {
    if (n === null) return null;
    const v = factorial(n);
    const zeros = (() => { let z = 0; for (let d = 5; d <= n; d *= 5) z += Math.floor(n / d); return z; })();
    const terms = n <= 1 ? '1' : n <= 8 ? Array.from({ length: n }, (_, i) => n - i).join(' × ') : `${n} × ${n - 1} × ${n - 2} × … × 2 × 1`;
    return { label: `${n}!`, value: v, rows: [['Basamak sayısı', String(v.toString().length)], ['Sondaki sıfır sayısı', String(zeros)]], steps: [`${n}! = ${terms}`, n <= 1 ? '0! ve 1! tanım gereği 1\'dir.' : `Sonuç = ${v.toString().length > 40 ? `${sci(v)} (tam değer yukarıda)` : fmtBig(v)}`] };
  }
  if (mode === 'comb' || mode === 'perm') {
    if (n === null || r === null) return null;
    if (r > n) throw new Error(`r (${r}), n (${n}) değerinden büyük olamaz; ${n} elemandan en fazla ${n} tanesi seçilir ya da dizilir. r değerini küçültün ya da tekrarlı seçenekleri deneyin.`);
    if (mode === 'perm') {
      const v = nPr(n, r);
      return { label: `P(${n}, ${r})`, value: v, rows: [['Formül', 'n! / (n − r)!']], steps: [`P(n, r) = n! / (n − r)! = ${n}! / ${n - r}!`, r === 0 ? 'r = 0 olduğundan çarpım boştur ve sonuç 1\'dir.' : `Sadeleştirince ilk r terimin çarpımı kalır: ${termsText(n, r)}`, `Sonuç = ${fmtBig(v)}`] };
    }
    const k = Math.min(r, n - r);
    const num = fallingProduct(n, k);
    const v = num / factorial(k);
    const steps = [`C(n, r) = n! / (r! × (n − r)!) = ${n}! / (${r}! × ${n - r}!)`];
    if (k !== r) steps.push(`C(n, r) = C(n, n − r) olduğundan daha az terimle hesaplanır: C(${n}, ${k})`);
    steps.push(k === 0 ? 'Seçilecek eleman yok; tek bir boş seçim vardır, sonuç 1\'dir.' : `Pay: ${termsText(n, k)} = ${fmtBig(num)}  ·  Payda: ${k}! = ${fmtBig(factorial(k))}`);
    steps.push(`Sonuç = ${fmtBig(num)} / ${fmtBig(factorial(k))} = ${fmtBig(v)}`);
    return { label: `C(${n}, ${r})`, value: v, rows: [['Permütasyon P(n, r)', fmtBig(nPr(n, r))], ['Simetri', `C(${n}, ${n - r}) de aynı değerdir`]], steps, pascal: [n, r] };
  }
  if (mode === 'permrep') {
    if (n === null || r === null) return null;
    const v = BigInt(n) ** BigInt(r);
    return { label: `${n}^${r}`, value: v, rows: [['Mantık', 'Her konumda n seçenek var']], steps: [`Her konum için ${n} seçenek vardır ve ${r} konum bulunur.`, `Sonuç = ${n}^${r} = ${r <= 6 && r > 0 ? Array(r).fill(n).join(' × ') : `${n} × … × ${n} (${r} kez)`} = ${fmtBig(v)}`] };
  }
  if (mode === 'combrep') {
    if (n === null || r === null) return null;
    if (n === 0 && r > 0) throw new Error('Tür sayısı (n) en az 1 olmalı. Seçilecek türleri belirtin.');
    const top = n + r - 1;
    if (top > MAX * 2) throw new Error('n + r − 1 değeri çok büyük. n ve r değerlerini küçültüp tekrar deneyin.');
    const v = n === 0 ? 1n : nCr(top, r);
    return { label: `Tekrarlı C(${n}, ${r})`, value: v, rows: [['Formül', 'C(n + r − 1, r)']], steps: [`Tekrarlı kombinasyon = C(n + r − 1, r) = C(${top}, ${r})`, `Sonuç = ${fmtBig(v)}`] };
  }
  if (mode === 'permsame') {
    const g = readGroups();
    if (!g) return null;
    const total = g.groups.reduce((a, b) => a + b, 0);
    if (total > MAX) throw new Error(`Toplam eleman sayısı en fazla ${MAX} olabilir. Listeyi kısaltıp tekrar deneyin.`);
    let den = 1n;
    for (const c of g.groups) den *= factorial(c);
    const v = factorial(total) / den;
    return { label: `${total}! / (${g.groups.map((c) => `${c}!`).join(' × ')})`, value: v, rows: [['Toplam eleman (n)', String(total)], [g.word ? 'Harf grupları' : 'Gruplar', g.labels.join(', ')]], steps: [`n = ${total}; tekrar sayıları: ${g.groups.join(', ')}`, `Sonuç = n! / (n₁! × n₂! × …) = ${total}! / (${g.groups.map((c) => `${c}!`).join(' × ')})`, `Payda = ${fmtBig(den)}  ·  Sonuç = ${fmtBig(v)}`] };
  }
  if (mode === 'prob') {
    if (n === null || r === null) return null;
    if (r > n) throw new Error(`Çekilen adet (${r}), havuzdaki sayıdan (${n}) büyük olamaz. r değerini küçültün.`);
    if (r === 0) throw new Error('Çekilen adet en az 1 olmalı.');
    let k = readInt('f-k', 'k');
    if (k === null) k = r;
    if (k > r) throw new Error(`Tutturulması istenen adet (${k}), seçilen adetten (${r}) büyük olamaz.`);
    // Aşırı geometrik olasılık: seçtiğiniz r sayıdan tam k tanesi çekilenler arasında.
    const total = nCr(n, r);
    const fav = nCr(r, k) * nCr(n - r, r - k);
    if (fav === 0n) throw new Error(`Bu değerlerle ${k} tutturmak mümkün değil (havuz çok küçük). N, r ya da k değerini değiştirin.`);
    const p = ratio(fav, total);
    const oneIn = (total + fav / 2n) / fav;
    return {
      label: `Olasılık = ${fav === 1n ? '1' : fmtBig(fav)} / ${fmtBig(total)}`,
      text: fav === 1n ? `1 / ${fmtBig(total)}` : `${fmtBig(fav)} / ${fmtBig(total)}`,
      rows: [['Yüzde', `%${fmtSmall(p * 100)}`], ['Yaklaşık', `her ${fmtBig(oneIn)} denemede 1`], ['Tüm olası seçimler', `C(${n}, ${r}) = ${fmtBig(total)}`]],
      steps: [`Tüm olası çekilişler = C(${n}, ${r}) = ${fmtBig(total)}`, `Uygun durumlar = C(${r}, ${k}) × C(${n - r}, ${r - k}) = ${fmtBig(nCr(r, k))} × ${fmtBig(nCr(n - r, r - k))} = ${fmtBig(fav)}`, `Olasılık = uygun / tüm = ${fmtBig(fav)} / ${fmtBig(total)} = %${fmtSmall(p * 100)}`],
    };
  }
  return null;
}

/* ---------- Pascal üçgeni ---------- */
function renderPascal(highlight) {
  const wrap = $('pascal');
  wrap.textContent = '';
  let row = [1n];
  for (let i = 0; i < 15; i++) {
    const line = document.createElement('div');
    line.className = 'kp-prow';
    const lab = document.createElement('span');
    lab.className = 'kp-plabel';
    lab.textContent = `n=${i}`;
    line.append(lab);
    row.forEach((v, j) => {
      const c = document.createElement('span');
      c.className = 'kp-pcell';
      if (highlight && highlight[0] === i && highlight[1] === j) c.classList.add('is-hit');
      c.textContent = fmtBig(v);
      line.append(c);
    });
    wrap.append(line);
    row = [1n, ...row.slice(1).map((v, j) => row[j] + v), 1n];
  }
}

/* ---------- Görünüm ---------- */
let currentText = '';

function applyMode() {
  const mode = $('mode').value;
  const M = MODES[mode];
  $('w-n').hidden = !M.fields.includes('n');
  $('w-r').hidden = !M.fields.includes('r');
  $('w-k').hidden = !M.fields.includes('k');
  $('w-text').hidden = !M.fields.includes('text');
  if (M.nLabel) $('l-n').textContent = M.nLabel;
  if (M.rLabel) $('l-r').textContent = M.rLabel;
  if (M.kLabel) $('l-k').textContent = M.kLabel;
  update();
}

function update() {
  showError($('error'), '');
  const box = $('result');
  const mode = $('mode').value;
  let out;
  try { out = calc(mode); } catch (e) { box.classList.remove('is-active'); showError($('error'), e.message); currentText = ''; return; }
  if (!out) { box.classList.remove('is-active'); currentText = ''; return; }
  box.classList.add('is-active');
  $('r-title').textContent = out.label;
  const main = out.text ?? fmtBig(out.value);
  $('r-main').textContent = main;
  const rows = $('r-rows');
  rows.textContent = '';
  const extra = [...(out.rows || [])];
  if (out.value !== undefined) {
    const digits = out.value.toString().length;
    if (digits > 15) extra.unshift(['Bilimsel gösterim', `≈ ${sci(out.value)}`], ['Basamak sayısı', String(digits)]);
  }
  for (const [l, v] of extra) {
    const row = document.createElement('div');
    row.className = 'kp-row';
    const dt = document.createElement('dt'); dt.textContent = l;
    const dd = document.createElement('dd'); dd.textContent = v;
    row.append(dt, dd);
    rows.append(row);
  }
  const steps = $('steps'); steps.textContent = '';
  for (const t of out.steps) { const li = document.createElement('li'); li.textContent = t; steps.append(li); }
  renderPascal(out.pascal && out.pascal[0] <= 14 ? out.pascal : null);
  currentText = `${out.label} = ${main}\n${out.steps.join('\n')}`;
}

function setup() {
  $('mode').addEventListener('change', applyMode);
  ['f-n', 'f-r', 'f-k', 'f-text'].forEach((id) => $(id).addEventListener('input', update));
  $('copy').addEventListener('click', async () => {
    if (!currentText) return;
    try { await navigator.clipboard.writeText(currentText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
  $('lotto').addEventListener('click', () => {
    $('mode').value = 'prob'; $('f-n').value = '49'; $('f-r').value = '6'; $('f-k').value = '';
    applyMode();
  });
  renderPascal(null);
  applyMode();
}

setup();
