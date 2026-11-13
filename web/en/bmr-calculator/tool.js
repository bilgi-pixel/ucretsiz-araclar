// BMR calculator: runs entirely in your browser; nothing you enter is sent anywhere.
import { showError } from '../../assets/js/ba.js';
import { energy, check, ACTIVITY, LB, IN } from '../../bazal-metabolizma-hesapla/logic.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const num = (s) => { const t = String(s).trim(); return /^\d+(\.\d+)?$/.test(t) ? Number(t) : NaN; };

const sel = $('k');
ACTIVITY.forEach((a, i) => { const o = document.createElement('option'); o.value = String(a.k); o.textContent = a.en; if (i === 0) o.selected = true; sel.appendChild(o); });

const setUnits = () => {
  const imp = $('units').value === 'imp';
  $('l-w').textContent = imp ? 'Weight (lb)' : 'Weight (kg)';
  $('l-h').textContent = imp ? 'Height (inches)' : 'Height (cm)';
  $('w').placeholder = imp ? 'e.g. 165' : 'e.g. 75';
  $('h').placeholder = imp ? 'e.g. 69' : 'e.g. 175';
};
$('units').addEventListener('change', setUnits);
setUnits();

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  const imp = $('units').value === 'imp';
  const sex = document.querySelector('input[name="sex"]:checked')?.value || 'e';
  let kg = num($('w').value), cm = num($('h').value);
  const age = num($('age').value);
  if (imp) { kg *= LB; cm *= IN; }
  const bad = check(kg, cm, age);
  const fail = (msg) => { $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), msg); };
  if (bad === 'kg') return fail(imp ? 'Enter a weight between 45 and 770 lb.' : 'Enter a weight between 20 and 350 kg.');
  if (bad === 'cm') return fail(imp ? 'Enter a height between 40 and 98 inches (5 ft 9 in = 69).' : 'Enter a height between 100 and 250 cm.');
  if (bad === 'age') return fail('Enter an age between 15 and 100. These formulas are not meant for children.');
  const r = energy(sex, kg, cm, age, Number(sel.value));
  $('r-bmr').textContent = nf.format(r.bmr) + ' kcal';
  $('r-hb').textContent = nf.format(r.hb) + ' kcal';
  $('r-tdee').textContent = nf.format(r.tdee) + ' kcal';
  $('r-lose').textContent = nf.format(Math.max(r.lose, r.bmr)) + ' kcal';
  $('r-gain').textContent = nf.format(r.gain) + ' kcal';
  $('result').hidden = false;
  $('result').classList.add('is-active');
});
