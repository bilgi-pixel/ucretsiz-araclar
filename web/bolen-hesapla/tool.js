// Bir Sayının Bölenleri — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (n) => String(n).split('').map((c) => SUP[c]).join('');

export const MAX_N = 1e12;

/** "360", "1 000", "1.000" -> tam sayı; geçersizse NaN. Nokta/boşluk binlik ayracı sayılır. */
export function parseInt10(s) {
  const t = String(s ?? '').trim().replace(/[\s.]/g, '');
  return /^\d+$/.test(t) ? Number(t) : NaN;
}

/** n'in tüm pozitif bölenleri (artan sırada); deneme bölmesi √n'e kadar. */
export function divisors(n) {
  const small = [], large = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i !== n / i) large.push(n / i);
    }
  }
  return small.concat(large.reverse());
}

/** Asal çarpanlar: [[asal, üs], ...]. */
export function factorize(n) {
  const out = [];
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    if (m % p === 0) {
      let e = 0;
      while (m % p === 0) { m /= p; e++; }
      out.push([p, e]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

/** Tüm sonucu üretir; geçersiz girdide Türkçe, çözüm öneren Error fırlatır. */
export function compute(raw) {
  const n = parseInt10(raw);
  if (Number.isNaN(n)) throw new Error('Pozitif bir tam sayı yazın (örn. 360). Harf, ondalık ya da eksi işareti kullanmayın.');
  if (n < 1) throw new Error('Sayı en az 1 olmalıdır. Sıfırın sonsuz sayıda böleni vardır; 1 ya da daha büyük bir tam sayı girin.');
  if (n > MAX_N) throw new Error('Sayı çok büyük; en fazla 1.000.000.000.000 (10^12) girilebilir. Daha küçük bir sayı deneyin.');
  const list = divisors(n);
  const sum = list.reduce((a, b) => a + b, 0);
  const proper = sum - n;
  const factors = factorize(n);
  let kind;
  if (n === 1) kind = 'Ne asal ne bileşik (1 özel bir sayıdır)';
  else if (list.length === 2) kind = 'Asal sayı';
  else kind = 'Bileşik sayı';
  let perfect = proper === n ? 'Mükemmel sayı (öz bölenleri toplamı kendisine eşit)'
    : proper > n ? 'Bol sayı (öz bölenleri toplamı kendisinden büyük)' : 'Eksik sayı (öz bölenleri toplamı kendisinden küçük)';
  return {
    n, list, count: list.length, sum, proper, kind, perfect, factors,
    factorText: n === 1 ? '1' : factors.map(([p, e]) => (e > 1 ? `${nf.format(p)}${sup(e)}` : nf.format(p))).join(' × '),
    isSquare: list.length % 2 === 1,
  };
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('r-big').textContent = `${nf.format(r.n)} sayısının ${nf.format(r.count)} böleni var`;
  $('r-count').textContent = nf.format(r.count);
  $('r-sum').textContent = nf.format(r.sum);
  $('r-proper').textContent = nf.format(r.proper);
  $('r-kind').textContent = r.kind;
  $('r-perfect').textContent = r.perfect;
  $('r-factors').textContent = r.factorText;
  $('r-list').textContent = r.list.map((d) => nf.format(d)).join(', ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = compute($('n').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('n').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('n').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    const text = `${nf.format(last.n)} sayısının bölenleri (${last.count} adet): ${last.list.map((d) => nf.format(d)).join(', ')}. Bölenler toplamı: ${nf.format(last.sum)}. Asal çarpanlar: ${last.factorText}.`;
    try { await navigator.clipboard.writeText(text); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
