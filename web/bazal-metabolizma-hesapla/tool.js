// Bazal metabolizma hesaplayıcı — tamamen tarayıcıda; değerleriniz hiçbir yere gönderilmez.
import { showError } from '../assets/js/ba.js';
import { energy, check, ACTIVITY } from './logic.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const num = (s) => { const t = String(s).trim().replace(',', '.'); return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN; };

const sel = $('k');
ACTIVITY.forEach((a, i) => { const o = document.createElement('option'); o.value = String(a.k); o.textContent = a.tr; if (i === 0) o.selected = true; sel.appendChild(o); });

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  const sex = document.querySelector('input[name="sex"]:checked')?.value || 'e';
  const kg = num($('kg').value), cm = num($('cm').value), age = num($('age').value);
  const bad = check(kg, cm, age);
  const fail = (msg) => { $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), msg); };
  if (bad === 'kg') return fail('Kilonuzu 20 ile 350 kg arasında yazın (örn. 72 ya da 72,5).');
  if (bad === 'cm') return fail('Boyunuzu santimetre olarak 100 ile 250 arasında yazın (örn. 175).');
  if (bad === 'age') return fail('Yaşınızı 15 ile 100 arasında yazın. Çocuk ve ergenlerde bu formüller geçerli değildir.');
  const r = energy(sex, kg, cm, age, Number(sel.value));
  $('r-bmr').textContent = nf.format(r.bmr) + ' kcal';
  $('r-hb').textContent = nf.format(r.hb) + ' kcal';
  $('r-tdee').textContent = nf.format(r.tdee) + ' kcal';
  $('r-lose').textContent = nf.format(Math.max(r.lose, r.bmr)) + ' kcal';
  $('r-gain').textContent = nf.format(r.gain) + ' kcal';
  $('result').hidden = false;
  $('result').classList.add('is-active');
});
