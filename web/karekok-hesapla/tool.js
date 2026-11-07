// Karekök ve Üs Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz sayılar sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { parseNumber, computeRoot, computePower, fmt } from './core.js';

const $ = (id) => document.getElementById(id);
const mode = () => document.querySelector('input[name="mode"]:checked').value;
const nf = new Intl.NumberFormat('tr-TR');
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' };
const sup = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');
let last = '';

function setRow(id, text) {
  const row = $(id).closest('.kdv-row');
  row.hidden = text == null;
  if (text != null) $(id).textContent = text;
}

function syncLabels() {
  const root = mode() === 'kok';
  $('n-label').textContent = root ? 'Kök derecesi (2 = karekök, 3 = küpkök)' : 'Üs (kuvvet)';
  $('n-hint').textContent = root ? '2 ile 100 arasında tam sayı. Karekök için 2, küpkök için 3 yazın.' : 'Pozitif, negatif ya da ondalık olabilir (örneğin 3, −2, 0,5).';
  $('calc').textContent = root ? 'Kökü hesapla' : 'Kuvveti hesapla';
}

function render(o) {
  $('r-big').textContent = o.big;
  setRow('r-value', o.value);
  setRow('r-simple', o.simple ?? null);
  setRow('r-perfect', o.perfect ?? null);
  setRow('r-lower', o.lower ?? null);
  setRow('r-upper', o.upper ?? null);
  setRow('r-digits', o.digits ?? null);
  last = `${o.big}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try {
    const x = parseNumber($('x').value, 'Sayı');
    const n = parseNumber($('n').value, mode() === 'kok' ? 'Kök derecesi' : 'Üs');
    if (mode() === 'kok') {
      const r = computeRoot(x, n);
      const sym = n === 2 ? '√' : n === 3 ? '∛' : `${n}.dereceden kök `;
      const o = { big: `${sym}${fmt(x)} = ${fmt(r.value)}`, value: fmt(r.value) };
      if (!r.negative && r.simple && r.simple !== fmt(r.value)) o.simple = `${r.simple}  (sadeleştirilmiş kök biçimi)`;
      if (Number.isInteger(x) && !r.negative) {
        const nameN = n === 2 ? 'tam kare' : n === 3 ? 'tam küp' : `tam ${n}. kuvvet`;
        o.perfect = r.perfect ? `Evet, ${nf.format(x)} bir ${nameN} sayıdır` : `Hayır, ${nf.format(x)} bir ${nameN} sayı değildir`;
        if (!r.perfect) {
          o.lower = `${nf.format(r.lowerRoot)}${sup(n)} = ${nf.format(r.lower)} (en yakın küçük ${nameN})`;
          o.upper = `${nf.format(r.lowerRoot + 1)}${sup(n)} = ${nf.format(r.upper)} (en yakın büyük ${nameN})`;
        }
      }
      render(o);
    } else {
      const r = computePower(x, n);
      const value = r.exact !== null ? nf.format(r.exact) : fmt(r.value);
      const o = { big: `${fmt(x)}${Number.isInteger(n) && n >= 0 && n < 10 ? sup(n) : ' ^ ' + fmt(n)} = ${value}`, value };
      if (r.digits !== null) o.digits = `${nf.format(r.digits)} basamaklı kesin sonuç`;
      render(o);
    }
  } catch (e) {
    last = ''; $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), e.message);
  }
}

document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener('change', syncLabels));
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => { $('x').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = ''; showError($('error'), ''); $('x').focus(); });
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(last); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncLabels();
