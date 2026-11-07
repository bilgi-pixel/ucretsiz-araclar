// Fibonacci hesaplayıcı arayüzü — tamamen tarayıcıda, BigInt ile tam sonuç.
import { showError } from '../assets/js/ba.js';
import { fib, fibList, isFibonacci, groupDigits, MAX_N } from './logic.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');

function parseInt0(str) {
  const t = String(str).trim();
  return /^\d+$/.test(t) ? t : null;
}
function show(id) { $(id).hidden = false; $(id).classList.add('is-active'); }
function hide(id) { $(id).hidden = true; $(id).classList.remove('is-active'); }

$('form-n').addEventListener('submit', (e) => {
  e.preventDefault(); showError($('error'), ''); hide('result-check');
  const t = parseInt0($('n').value);
  if (t === null) { hide('result-n'); showError($('error'), 'Terim sırası 0 ile ' + nf.format(MAX_N) + ' arasında bir tam sayı olmalı (örn. 50).'); return; }
  const n = Number(t);
  if (n > MAX_N) { hide('result-n'); showError($('error'), `Çok büyük bir sıra girdiniz. En fazla ${nf.format(MAX_N)} yazın; daha büyük değerlerde sonuç binlerce basamak olur.`); return; }
  const f = fib(n);
  const digits = f.toString().length;
  $('r-term').textContent = digits > 40 ? `${f.toString().slice(0, 40)}… (${nf.format(digits)} basamak)` : groupDigits(f);
  $('r-full').value = f.toString();
  $('r-digits').textContent = `${nf.format(digits)} basamak`;
  $('r-sum').textContent = digits > 40 ? 'çok uzun (kopyalama alanına bakın)' : groupDigits(fib(n + 2) - 1n);
  $('r-ratio').textContent = n < 2 ? '—' : (() => {
    const a = fib(n), b = fib(n - 1); // oran, BigInt bölmeyle 9 ondalığa kadar
    const scaled = (a * 10n ** 9n) / b;
    const s = scaled.toString().padStart(10, '0');
    return (s.slice(0, -9) + ',' + s.slice(-9));
  })();
  const count = Math.min(n + 1, 30);
  $('r-list').textContent = fibList(count).map(groupDigits).join(' · ') + (n + 1 > 30 ? ' …' : '');
  $('r-list-title').textContent = n + 1 > 30 ? 'İlk 30 terim' : `İlk ${n + 1} terim`;
  $('r-title').textContent = `F(${nf.format(n)}) =`;
  show('result-n');
});

$('form-check').addEventListener('submit', (e) => {
  e.preventDefault(); showError($('error'), ''); hide('result-n');
  const t = parseInt0($('chk').value);
  if (t === null || t.length > 300) { hide('result-check'); showError($('error'), 'Kontrol için negatif olmayan bir tam sayı yazın (en fazla 300 basamak). Ondalık ya da harf kullanmayın.'
); return; }
  const r = isFibonacci(BigInt(t));
  $('c-msg').textContent = r.is
    ? `Evet, ${groupDigits(BigInt(t))} bir Fibonacci sayısıdır: F(${r.index}).`
    : `Hayır, ${groupDigits(BigInt(t))} bir Fibonacci sayısı değildir.`;
  show('result-check');
});

$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText($('r-full').value); st.textContent = 'Terim panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sayıyı elle seçip kopyalayın.'; }
});
