// BMI Calculator (EN) — runs entirely in the browser; height, weight and other values never leave the device.
// Informational only: it does not diagnose, treat or recommend medication or diets.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf1 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const KG_PER_LB = 0.45359237;

/** Accepts a dot or a comma as the decimal mark; returns NaN when invalid. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** WHO adult classification. */
export const BMI_CLASSES = [
  { max: 16, label: 'Severe thinness', cls: 'under', range: 'Below 16.0' },
  { max: 17, label: 'Moderate thinness', cls: 'under', range: '16.0 – 16.9' },
  { max: 18.5, label: 'Mild thinness', cls: 'under', range: '17.0 – 18.4' },
  { max: 25, label: 'Normal weight', cls: 'normal', range: '18.5 – 24.9' },
  { max: 30, label: 'Overweight (pre-obese)', cls: 'over', range: '25.0 – 29.9' },
  { max: 35, label: 'Obesity class I', cls: 'obese', range: '30.0 – 34.9' },
  { max: 40, label: 'Obesity class II', cls: 'obese', range: '35.0 – 39.9' },
  { max: Infinity, label: 'Obesity class III', cls: 'obese', range: '40.0 and above' },
];
export const classify = (bmi) => BMI_CLASSES.find((c) => bmi < c.max);

const ACTIVITY = { 1.2: 'sedentary', 1.375: 'lightly active', 1.55: 'moderately active', 1.725: 'very active', 1.9: 'extremely active' };

/** Computes everything from metric values (cm, kg); throws an English, solution-oriented Error. */
export function computeBmi(v) {
  const h = parseNum(v.height), w = parseNum(v.weight), age = parseNum(v.age);
  if (!(h > 0)) throw new Error('Height is missing or invalid. Enter your height, for example 5 ft 9 in or 175 cm.');
  if (h < 100 || h > 250) throw new Error('Height must be between about 3 ft 3 in and 8 ft 2 in (100–250 cm). Check that you did not mix up feet and inches or centimeters and meters.');
  if (!(w > 0)) throw new Error('Weight is missing or invalid. Enter your weight, for example 160 lb or 70 kg.');
  if (w < 20 || w > 400) throw new Error('Weight must be between 44 and 882 lb (20–400 kg). Check the value and try again.');
  if (!(age > 0) || age !== Math.floor(age)) throw new Error('Age is missing or invalid. Enter a whole number such as 35.');
  if (age < 18) throw new Error("This tool is for adults aged 18 and over only. In children and teens BMI is read against age- and sex-specific percentile charts, so please ask your child's doctor.");
  if (age > 120) throw new Error('Age cannot be above 120. Check the value and try again.');
  if (v.sex !== 'f' && v.sex !== 'm') throw new Error('Select an option for sex. The daily energy estimate uses a formula that differs between the two.');
  const waistRaw = String(v.waist ?? '').trim();
  let waist = null;
  if (waistRaw !== '') {
    waist = parseNum(waistRaw);
    if (!(waist >= 40 && waist <= 250)) throw new Error('Waist must be between about 16 and 98 in (40–250 cm). Leave it empty or re-enter the measurement.');
  }
  const m = h / 100;
  const bmi = w / (m * m);
  const cls = classify(bmi);
  const idealMin = 18.5 * m * m, idealMax = 24.9 * m * m;
  // Mifflin-St Jeor: basal metabolic rate (kcal/day)
  const bmr = 10 * w + 6.25 * h - 5 * age + (v.sex === 'm' ? 5 : -161);
  const factor = Number(v.activity);
  const tdee = bmr * factor;
  let whtr = null, waistInfo = null;
  if (waist) {
    whtr = waist / h;
    const limits = v.sex === 'm' ? [94, 102] : [80, 88];
    waistInfo = waist >= limits[1] ? 'Your waist is above the WHO high-risk threshold' : waist >= limits[0] ? 'Your waist is above the WHO increased-risk threshold' : 'Your waist is below the WHO thresholds';
  }
  return { h, w, age, sex: v.sex, bmi, cls, idealMin, idealMax, bmr, tdee, factor, waist, whtr, waistInfo, diffMin: w < idealMin ? idealMin - w : 0, diffMax: w > idealMax ? w - idealMax : 0 };
}

/* ---------- Canvas gauge ---------- */
const COLORS = { under: '#2b6cb0', normal: '#2f855a', over: '#b7791f', obese: '#b83232' };
const SEGMENTS = [[10, 18.5, COLORS.under], [18.5, 25, COLORS.normal], [25, 30, COLORS.over], [30, 45, COLORS.obese]];
export function drawGauge(canvas, bmi) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H - 24, R = Math.min(W / 2 - 24, H - 44), lw = 26;
  const ang = (val) => Math.PI + ((Math.min(45, Math.max(10, val)) - 10) / 35) * Math.PI;
  ctx.lineCap = 'butt';
  SEGMENTS.forEach(([a, b, col]) => {
    ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.arc(cx, cy, R - lw / 2, ang(a), ang(b)); ctx.stroke();
  });
  const a = ang(bmi);
  ctx.strokeStyle = '#1f1f1f'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8)); ctx.stroke();
  ctx.fillStyle = '#1f1f1f'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#444'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
  [[10, '10'], [18.5, '18.5'], [25, '25'], [30, '30'], [45, '45']].forEach(([val, t]) => {
    const aa = ang(val); ctx.fillText(t, cx + Math.cos(aa) * (R + 14), cy + Math.sin(aa) * (R + 14) + 4);
  });
}

/* ---------- Unit handling ---------- */
const isUS = () => $('units').value === 'us';
const fmtWeight = (kg) => (isUS() ? `${nf1.format(kg / KG_PER_LB)} lb` : `${nf1.format(kg)} kg`);

/** Reads the inputs of the selected unit system and returns metric strings. */
function readMetric() {
  if (!isUS()) return { height: $('height').value, weight: $('weight').value, waist: $('waist').value };
  const ft = $('ft').value.trim() === '' ? 0 : parseNum($('ft').value);
  const inch = $('inch').value.trim() === '' ? 0 : parseNum($('inch').value);
  const lb = parseNum($('weight').value);
  const w = String($('waist').value).trim();
  const totalIn = ft * 12 + inch;
  return {
    height: Number.isNaN(totalIn) || totalIn <= 0 ? '' : String(totalIn * 2.54),
    weight: Number.isNaN(lb) ? '' : String(lb * KG_PER_LB),
    waist: w === '' ? '' : Number.isNaN(parseNum(w)) ? 'x' : String(parseNum(w) * 2.54),
  };
}

function applyUnits() {
  const us = isUS();
  $('metric-h').hidden = us; $('us-h').hidden = !us;
  $('l-weight').textContent = us ? 'Weight (lb)' : 'Weight (kg)';
  $('l-waist').textContent = us ? 'Waist (inches, optional)' : 'Waist (cm, optional)';
  $('weight').placeholder = us ? '155' : '70';
  $('waist').placeholder = us ? 'e.g. 33' : 'e.g. 84';
}

function render(r) {
  $('r-bmi').textContent = nf1.format(r.bmi);
  $('r-class').textContent = r.cls.label;
  $('r-class').className = 'vki-badge ' + r.cls.cls;
  $('r-ideal').textContent = `${fmtWeight(r.idealMin).replace(/ (kg|lb)$/, '')} – ${fmtWeight(r.idealMax)}`;
  $('r-diff').textContent = r.diffMin ? `You are about ${fmtWeight(r.diffMin)} below the lower end of the normal range.` : r.diffMax ? `You are about ${fmtWeight(r.diffMax)} above the upper end of the normal range.` : 'Your weight is within the BMI 18.5–24.9 range.';
  $('r-bmr').textContent = `about ${nf0.format(r.bmr)} kcal/day`;
  $('r-tdee').textContent = `about ${nf0.format(r.tdee)} kcal/day`;
  $('r-tdee-label').textContent = `Estimated daily energy need (${ACTIVITY[r.factor] || 'selected activity'})`;
  $('r-waist-row').hidden = !r.waist;
  $('r-waist-note').hidden = !r.waist;
  if (r.waist) {
    $('r-whtr').textContent = nf2.format(r.whtr);
    $('r-waist-note').textContent = `${r.waistInfo}. A waist-to-height ratio of 0.50 or above is generally a reason to talk to a doctor; this is not a diagnosis.`;
  }
  drawGauge($('gauge'), r.bmi);
  $('gauge').setAttribute('aria-label', `BMI gauge: ${nf1.format(r.bmi)}, ${r.cls.label}`);
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => `BMI: ${nf1.format(r.bmi)} (${r.cls.label}). Height ${nf0.format(r.h)} cm, weight ${nf1.format(r.w)} kg. Weight range matching BMI 18.5–24.9: ${nf1.format(r.idealMin)}–${nf1.format(r.idealMax)} kg. Estimated daily energy: about ${nf0.format(r.tdee)} kcal. For information only, not medical advice; talk to your doctor.`;

let last = null;
function run() {
  showError($('error'), '');
  try {
    const sex = (document.querySelector('input[name="sex"]:checked') || {}).value;
    const m = readMetric();
    if (isUS() && m.height === '') throw new Error('Height is missing or invalid. Enter feet and inches, for example 5 ft 9 in.');
    last = computeBmi({ height: m.height, weight: m.weight, age: $('age').value, sex, waist: m.waist, activity: $('activity').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('range-body').innerHTML = BMI_CLASSES.map((c) => `<tr><td>${c.range}</td><td>${c.label}</td></tr>`).join('');
$('units').addEventListener('change', () => { applyUnits(); $('result').hidden = true; $('result').classList.remove('is-active'); showError($('error'), ''); });
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); applyUnits(); $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('units').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});
applyUnits();
