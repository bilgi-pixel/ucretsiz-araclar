// VKİ Hesaplama — tamamı tarayıcıda çalışır; boy, kilo ve diğer değerler sunucuya gitmez.
// Bilgilendirme amaçlıdır: tanı, tedavi, ilaç ya da diyet önerisi üretmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Ondalık sayıyı virgül ya da nokta ile kabul eder; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** WHO yetişkin sınıflandırması. */
export const BMI_CLASSES = [
  { max: 16, label: 'Ağır zayıf', cls: 'under', range: '16,0 altı' },
  { max: 17, label: 'Orta derecede zayıf', cls: 'under', range: '16,0 – 16,9' },
  { max: 18.5, label: 'Hafif zayıf', cls: 'under', range: '17,0 – 18,4' },
  { max: 25, label: 'Normal kilolu', cls: 'normal', range: '18,5 – 24,9' },
  { max: 30, label: 'Fazla kilolu', cls: 'over', range: '25,0 – 29,9' },
  { max: 35, label: 'Obez (1. derece)', cls: 'obese', range: '30,0 – 34,9' },
  { max: 40, label: 'Obez (2. derece)', cls: 'obese', range: '35,0 – 39,9' },
  { max: Infinity, label: 'Obez (3. derece)', cls: 'obese', range: '40,0 ve üzeri' },
];
export const classify = (bmi) => BMI_CLASSES.find((c) => bmi < c.max);

const ACTIVITY = { 1.2: 'Hareketsiz', 1.375: 'Hafif aktif', 1.55: 'Orta aktif', 1.725: 'Çok aktif', 1.9: 'Aşırı aktif' };

/** Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır. */
export function computeBmi(v) {
  const h = parseNum(v.height), w = parseNum(v.weight), age = parseNum(v.age);
  if (!(h > 0)) throw new Error('Boy eksik ya da geçersiz. Santimetre cinsinden, örneğin 175 yazın.');
  if (h < 100 || h > 250) throw new Error('Boy 100–250 cm arasında olmalıdır. Metre yerine santimetre yazdığınızdan emin olun (1,75 m yerine 175).');
  if (!(w > 0)) throw new Error('Kilo eksik ya da geçersiz. Kilogram cinsinden, örneğin 70 yazın.');
  if (w < 20 || w > 400) throw new Error('Kilo 20–400 kg arasında olmalıdır. Değeri kontrol edip yeniden girin.');
  if (!(age > 0) || age !== Math.floor(age)) throw new Error('Yaş eksik ya da geçersiz. Tam sayı olarak yazın (örn. 35).');
  if (age < 18) throw new Error('Bu araç yalnızca 18 yaş ve üzeri yetişkinler içindir. Çocuk ve ergenlerde VKİ, yaş ve cinsiyete göre persentil eğrileriyle değerlendirilir; bunun için çocuğunuzun hekimine başvurun.');
  if (age > 120) throw new Error('Yaş 120 değerini geçemez. Değeri kontrol edip yeniden girin.');
  if (v.sex !== 'k' && v.sex !== 'e') throw new Error('Cinsiyeti seçin. Günlük enerji tahmini cinsiyete göre değişen bir formül kullanır.');
  const waistRaw = String(v.waist ?? '').trim();
  let waist = null;
  if (waistRaw !== '') {
    waist = parseNum(waistRaw);
    if (!(waist >= 40 && waist <= 250)) throw new Error('Bel çevresi 40–250 cm arasında olmalıdır. Boş bırakabilir ya da santimetre cinsinden yeniden girebilirsiniz.');
  }
  const m = h / 100;
  const bmi = w / (m * m);
  const cls = classify(bmi);
  const idealMin = 18.5 * m * m, idealMax = 24.9 * m * m;
  // Mifflin-St Jeor: bazal metabolizma hızı (kcal/gün)
  const bmr = 10 * w + 6.25 * h - 5 * age + (v.sex === 'e' ? 5 : -161);
  const factor = Number(v.activity);
  const tdee = bmr * factor;
  let whtr = null, waistInfo = null;
  if (waist) {
    whtr = waist / h;
    const limits = v.sex === 'e' ? [94, 102] : [80, 88];
    waistInfo = waist >= limits[1] ? 'Bel çevreniz WHO\'nun belirttiği yüksek risk eşiğinin üzerinde' : waist >= limits[0] ? 'Bel çevreniz WHO\'nun belirttiği artmış risk eşiğinin üzerinde' : 'Bel çevreniz WHO eşiklerinin altında';
  }
  return { h, w, age, sex: v.sex, bmi, cls, idealMin, idealMax, bmr, tdee, factor, waist, whtr, waistInfo, diffMin: w < idealMin ? idealMin - w : 0, diffMax: w > idealMax ? w - idealMax : 0 };
}

/* ---------- Canvas yay göstergesi ---------- */
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
  // ibre
  const a = ang(bmi);
  ctx.strokeStyle = '#1f1f1f'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8)); ctx.stroke();
  ctx.fillStyle = '#1f1f1f'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#444'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
  [[10, '10'], [18.5, '18,5'], [25, '25'], [30, '30'], [45, '45']].forEach(([val, t]) => {
    const aa = ang(val); ctx.fillText(t, cx + Math.cos(aa) * (R + 14), cy + Math.sin(aa) * (R + 14) + 4);
  });
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('r-bmi').textContent = nf1.format(r.bmi);
  $('r-class').textContent = r.cls.label;
  $('r-class').className = 'vki-badge ' + r.cls.cls;
  $('r-ideal').textContent = `${nf1.format(r.idealMin)} – ${nf1.format(r.idealMax)} kg`;
  $('r-diff').textContent = r.diffMin ? `Normal aralığın alt sınırına yaklaşık ${nf1.format(r.diffMin)} kg var.` : r.diffMax ? `Normal aralığın üst sınırını yaklaşık ${nf1.format(r.diffMax)} kg aşıyorsunuz.` : 'Kilonuz VKİ 18,5–24,9 aralığının içinde.';
  $('r-bmr').textContent = `yaklaşık ${nf0.format(r.bmr)} kcal/gün`;
  $('r-tdee').textContent = `yaklaşık ${nf0.format(r.tdee)} kcal/gün`;
  $('r-tdee-label').textContent = `Günlük enerji ihtiyacı tahmini (${ACTIVITY[r.factor] || 'seçili aktivite'})`;
  $('r-waist-row').hidden = !r.waist;
  $('r-waist-note').hidden = !r.waist;
  if (r.waist) {
    $('r-whtr').textContent = nf2.format(r.whtr);
    $('r-waist-note').textContent = `${r.waistInfo}. Bel/boy oranı 0,50 ve üzerindeyse genel olarak bir hekime danışılması önerilir; bu bir tanı değildir.`;
  }
  drawGauge($('gauge'), r.bmi);
  $('gauge').setAttribute('aria-label', `VKİ göstergesi: ${nf1.format(r.bmi)}, ${r.cls.label}`);
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => `VKİ: ${nf1.format(r.bmi)} (${r.cls.label}). Boy ${nf0.format(r.h)} cm, kilo ${nf1.format(r.w)} kg. VKİ 18,5–24,9 aralığına denk gelen kilo: ${nf1.format(r.idealMin)}–${nf1.format(r.idealMax)} kg. Günlük enerji tahmini: yaklaşık ${nf0.format(r.tdee)} kcal. Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;

let last = null;
function run() {
  showError($('error'), '');
  try {
    const sex = (document.querySelector('input[name="sex"]:checked') || {}).value;
    last = computeBmi({ height: $('height').value, weight: $('weight').value, age: $('age').value, sex, waist: $('waist').value, activity: $('activity').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

// Aralık tablosunu doldur
$('range-body').innerHTML = BMI_CLASSES.map((c) => `<tr><td>${c.range}</td><td>${c.label}</td></tr>`).join('');
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('form').reset(); $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('height').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});
