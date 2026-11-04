// Günlük su ihtiyacı hesaplayıcı — tamamı tarayıcıda çalışır; girdiğiniz değerler sunucuya gitmez.
// Bilgilendirme amaçlıdır; tıbbi tavsiye değildir. Böbrek/kalp hastalığı olanlar hekimlerine danışmalıdır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
const nfL = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

export const CUP_ML = 200;       // 1 su bardağı
export const BOTTLE_ML = 500;    // 1 pet şişe
export const EXERCISE_ML_PER_HOUR = 350;
export const HOT_CLIMATE_RATIO = 0.10;
export const PREGNANT_ML = 300;
export const NURSING_ML = 700;

/** Yaşa göre kilo başına mililitre: <30 → 40, 30–55 → 35, >55 → 30. */
export function mlPerKg(age) {
  if (age < 30) return 40;
  if (age <= 55) return 35;
  return 30;
}

/** Gün içi 8 dilim: [saat aralığı, açıklama, pay]. Paylar toplamı 1. */
export const PLAN_SLOTS = [
  ['07:00–09:00', 'Uyanınca ve kahvaltıda', 0.15],
  ['09:00–11:00', 'Sabah arası', 0.125],
  ['11:00–13:00', 'Öğleye doğru', 0.125],
  ['13:00–15:00', 'Öğle yemeği', 0.125],
  ['15:00–17:00', 'Öğleden sonra', 0.125],
  ['17:00–19:00', 'Akşamüstü, egzersiz saati', 0.125],
  ['19:00–21:00', 'Akşam yemeği', 0.125],
  ['21:00–23:00', 'Yatmadan önce (az miktar)', 0.10],
];

/** Toplam miktarı 10 ml birimlerine yuvarlayarak dilimlere böler (en büyük kalan yöntemi); toplamı korur. */
export function splitPlan(totalMl) {
  const units = Math.round(totalMl / 10);
  const exact = PLAN_SLOTS.map(([, , w]) => units * w);
  const floors = exact.map(Math.floor);
  let left = units - floors.reduce((a, b) => a + b, 0);
  const order = exact.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (let k = 0; left > 0 && k < order.length; k++, left--) floors[order[k][1]]++;
  return floors.map((u) => u * 10);
}

const parseNum = (v) => {
  const s = String(v ?? '').trim().replace(',', '.');
  return /^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
};

/**
 * Günlük su ihtiyacını hesaplar. Hata durumunda Türkçe, çözüm öneren Error fırlatır.
 * Sıra: temel (kg × ml/kg) + egzersiz → sıcak iklimde bu toplamın %10'u eklenir → hamilelik/emzirme sabit eklenir.
 */
export function computeWater({ weight, age, sex, hours, climate, status }) {
  if (String(weight ?? '').trim() === '') throw new Error('Kilo alanı boş. Kilonuzu kg cinsinden yazın (örn. 70 ya da 72,5).');
  const kg = parseNum(weight);
  if (!(kg >= 25 && kg <= 250)) throw new Error('Kilo 25–250 kg arasında olmalıdır (örn. 70 ya da 72,5). Değeri kg cinsinden ve rakamla yazın.');
  if (String(age ?? '').trim() === '') throw new Error('Yaş alanı boş. Yaşınızı tam sayı olarak yazın (örn. 35).');
  const years = /^\d{1,3}$/.test(String(age).trim()) ? Number(String(age).trim()) : NaN;
  if (!Number.isInteger(years) || years < 1 || years > 110) throw new Error('Yaş 14–110 arasında bir tam sayı olmalıdır (örn. 35). Değeri düzeltip tekrar deneyin.');
  if (years < 14) throw new Error('Bu araç 14 yaş ve üzeri içindir. Çocuklar için günlük sıvı ihtiyacı çocuk doktoruna danışılarak belirlenir.');
  const h = Number(hours) || 0;
  if (!(h >= 0 && h <= 8)) throw new Error('Egzersiz süresi geçersiz. Listeden bir seçenek seçin.');

  const perKg = mlPerKg(years);
  const base = Math.round(kg * perKg);
  const exercise = Math.round(h * EXERCISE_ML_PER_HOUR);
  const subtotal = base + exercise;
  const climateMl = climate === 'hot' ? Math.round(subtotal * HOT_CLIMATE_RATIO) : 0;
  const st = sex === 'female' ? (status || 'none') : 'none';
  const stateMl = st === 'pregnant' ? PREGNANT_ML : st === 'nursing' ? NURSING_ML : 0;
  const total = subtotal + climateMl + stateMl;
  return {
    kg, years, perKg, base, exercise, climateMl, stateMl, status: st, total,
    liters: total / 1000, cups: total / CUP_ML, bottles: total / BOTTLE_ML,
    plan: splitPlan(total),
  };
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('r-liters').textContent = `${nfL.format(r.liters)} litre`;
  $('r-ml').textContent = `${nf.format(r.total)} ml`;
  $('r-cups').textContent = `${nf1.format(r.cups)} bardak (200 ml)`;
  $('r-bottles').textContent = `${nf1.format(r.bottles)} şişe (500 ml)`;
  $('r-base').textContent = `${nf.format(r.base)} ml (${nf.format(r.kg)} kg × ${r.perKg} ml)`;
  $('r-exercise').textContent = `+${nf.format(r.exercise)} ml`;
  $('row-exercise').hidden = r.exercise === 0;
  $('r-climate').textContent = `+${nf.format(r.climateMl)} ml`;
  $('row-climate').hidden = r.climateMl === 0;
  $('r-state').textContent = `+${nf.format(r.stateMl)} ml`;
  $('row-state').hidden = r.stateMl === 0;
  $('r-state-label').textContent = r.status === 'nursing' ? 'Emzirme ilavesi' : 'Hamilelik ilavesi';

  const body = $('plan-body');
  body.textContent = '';
  PLAN_SLOTS.forEach(([time, note], i) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th'); th.scope = 'row'; th.append(time);
    const small = document.createElement('small'); small.textContent = note; th.append(small);
    const td1 = document.createElement('td'); td1.textContent = `${nf.format(r.plan[i])} ml`;
    const td2 = document.createElement('td'); td2.textContent = `≈ ${nf1.format(r.plan[i] / CUP_ML)}`;
    tr.append(th, td1, td2);
    body.append(tr);
  });
  $('result').hidden = false; $('result').classList.add('is-active');
}

function readInputs() {
  return {
    weight: $('weight').value, age: $('age').value, sex: $('sex').value,
    hours: $('activity').value, climate: $('climate').value, status: $('status').value,
  };
}

function summaryText(r) {
  const extras = [];
  if (r.exercise) extras.push(`egzersiz +${r.exercise} ml`);
  if (r.climateMl) extras.push(`sıcak iklim +${r.climateMl} ml`);
  if (r.stateMl) extras.push(`${r.status === 'nursing' ? 'emzirme' : 'hamilelik'} +${r.stateMl} ml`);
  return `Günlük su ihtiyacı (yaklaşık): ${nf.format(r.total)} ml (${nfL.format(r.liters)} litre; ${nf1.format(r.cups)} bardak). `
    + `Temel: ${nf.format(r.base)} ml${extras.length ? '; ' + extras.join(', ') : ''}. Bilgilendirme amaçlıdır, tıbbi tavsiye değildir.`;
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeWater(readInputs());
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

// Hamilelik/emzirme seçeneği yalnızca kadın için görünür; erkeğe geçince sıfırlanır.
function syncStatus() {
  const female = $('sex').value === 'female';
  $('status-wrap').hidden = !female;
  if (!female) $('status').value = 'none';
}

$('sex').addEventListener('change', syncStatus);
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('weight').value = ''; $('age').value = ''; $('sex').value = 'male'; $('activity').value = '0'; $('climate').value = 'mild'; $('status').value = 'none';
  syncStatus();
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null;
  showError($('error'), ''); $('copy-status').textContent = ''; $('weight').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncStatus();
