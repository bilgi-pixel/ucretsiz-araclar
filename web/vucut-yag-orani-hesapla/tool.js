// Vücut Yağ Oranı Hesaplama — tamamı tarayıcıda çalışır; ölçüleriniz sunucuya gitmez.
// İki yöntem: ABD Donanması çevre ölçüleri formülü (cm) ve BKİ'ye dayalı Deurenberg formülü.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1, minimumFractionDigits: 1 });

/** "85,5" ve "85.5" biçimlerini sayıya çevirir; boş/geçersizse NaN. */
export function num(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '').replace(',', '.');
  return t === '' ? NaN : Number(t);
}

/** ACE (American Council on Exercise) aralıkları: [üst sınır, etiket]. */
const BANDS = {
  male: [[6, 'Temel yağ (çok düşük)'], [14, 'Atletik'], [18, 'Fit'], [25, 'Ortalama'], [Infinity, 'Yüksek (obezite aralığı)']],
  female: [[14, 'Temel yağ (çok düşük)'], [21, 'Atletik'], [25, 'Fit'], [32, 'Ortalama'], [Infinity, 'Yüksek (obezite aralığı)']],
};
export function category(sex, pct) {
  return BANDS[sex].find(([max]) => pct < max)[1];
}

/** ABD Donanması formülü; ölçüler santimetre. */
export function navyBodyFat({ sex, height, neck, waist, hip }) {
  if (sex === 'male') {
    if (waist <= neck) throw new Error('Bel çevresi boyun çevresinden büyük olmalı. Bel ölçüsünü göbek deliği hizasından, nefes verirken yeniden alın.');
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  }
  if (waist + hip <= neck) throw new Error('Bel ve kalça toplamı boyun çevresinden büyük olmalı. Ölçüleri yeniden kontrol edin.');
  return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
}

/** Deurenberg: yağ % = 1,20 × BKİ + 0,23 × yaş − 10,8 × cinsiyet (erkek 1, kadın 0) − 5,4 */
export function bmiBodyFat({ sex, age, height, weight }) {
  const bmi = weight / Math.pow(height / 100, 2);
  return { bmi, pct: 1.2 * bmi + 0.23 * age - 10.8 * (sex === 'male' ? 1 : 0) - 5.4 };
}

/** Form girdilerini doğrular ve sonucu döndürür; hata varsa Türkçe, çözüm öneren Error fırlatır. */
export function compute(v) {
  const need = (val, name, min, max, unit) => {
    if (!Number.isFinite(val)) throw new Error(`${name} alanını sayı olarak girin (örn. ${unit === 'kg' ? '72,5' : '175'}).`);
    if (val < min || val > max) throw new Error(`${name} ${min}–${max} ${unit} aralığında olmalı. Birimi (cm/kg) kontrol edin.`);
    return val;
  };
  const age = need(v.age, 'Yaş', 15, 90, 'yıl');
  const height = need(v.height, 'Boy', 120, 230, 'cm');
  const weight = need(v.weight, 'Kilo', 30, 300, 'kg');
  const neck = need(v.neck, 'Boyun çevresi', 20, 70, 'cm');
  const waist = need(v.waist, 'Bel çevresi', 40, 200, 'cm');
  let hip = 0;
  if (v.sex === 'female') hip = need(v.hip, 'Kalça çevresi', 50, 200, 'cm');
  const navy = navyBodyFat({ sex: v.sex, height, neck, waist, hip });
  if (!Number.isFinite(navy) || navy < 2 || navy > 60) throw new Error('Ölçülerle makul bir yağ oranı bulunamadı. Boyun, bel ve kalça çevresini mezura ile yeniden ölçüp girin.');
  const b = bmiBodyFat({ sex: v.sex, age, height, weight });
  return {
    sex: v.sex, weight, navy, bmi: b.bmi, bmiPct: Math.max(2, b.pct),
    fatKg: weight * navy / 100, leanKg: weight * (1 - navy / 100),
    cat: category(v.sex, navy), catBmi: category(v.sex, Math.max(2, b.pct)),
  };
}

function read() {
  return {
    sex: document.querySelector('input[name="sex"]:checked').value,
    age: num($('age').value), height: num($('height').value), weight: num($('weight').value),
    neck: num($('neck').value), waist: num($('waist').value), hip: num($('hip').value),
  };
}

let last = null;
function render(r) {
  $('r-navy').textContent = `% ${nf.format(r.navy)}`;
  $('r-cat').textContent = r.cat;
  $('r-fat').textContent = `${nf.format(r.fatKg)} kg`;
  $('r-lean').textContent = `${nf.format(r.leanKg)} kg`;
  $('r-bmi').textContent = nf.format(r.bmi);
  $('r-bmipct').textContent = `% ${nf.format(r.bmiPct)} (${r.catBmi})`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function run() {
  showError($('error'), '');
  try { last = compute(read()); render(last); }
  catch (e) {
    last = null; $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function syncSex() {
  const female = document.querySelector('input[name="sex"]:checked').value === 'female';
  $('hip-wrap').hidden = !female;
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="sex"]').forEach((r) => r.addEventListener('change', syncSex));
$('clear').addEventListener('click', () => {
  ['age', 'height', 'weight', 'neck', 'waist', 'hip'].forEach((id) => { $(id).value = ''; });
  $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('age').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const t = `Vücut yağ oranı (ABD Donanması yöntemi): % ${nf.format(last.navy)} – ${last.cat}. Yağ kütlesi ${nf.format(last.fatKg)} kg, yağsız kütle ${nf.format(last.leanKg)} kg. Tahmindir, tıbbi tavsiye değildir.`;
  try { await navigator.clipboard.writeText(t); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
syncSex();
