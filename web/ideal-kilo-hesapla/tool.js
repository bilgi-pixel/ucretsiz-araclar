// İdeal Kilo Hesaplama — tamamı tarayıcıda çalışır; boy, kilo ve yaş sunucuya gitmez.
// Bilgilendirme amaçlıdır: tanı, tedavi, ilaç, takviye ya da kişisel diyet önerisi üretmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nfNum = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

/** Ondalık sayıyı virgül ya da nokta ile kabul eder; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** 5 fit = 60 inç = 152,4 cm: dört formülün de başlangıç noktası. */
export const BASE_INCH = 60;
export const BASE_CM = 152.4;
/** Formüllerin güvenilir sayıldığı yetişkin boy aralığı (cm). */
export const MIN_HEIGHT = 140;
export const MAX_HEIGHT = 230;

/**
 * Dört klasik formül: kilo (kg) = base + perInch × (boy[inç] − 60).
 * Hamwi'nin özgün kuralı pound/inç cinsindendir (erkek 106 lb + 6 lb, kadın 100 lb + 5 lb);
 * burada yaygın kg karşılığı (48,0 + 2,7 ve 45,5 + 2,2) kullanılır. Sayfa metni aynı sabitleri yazar.
 */
export const FORMULAS = [
  { key: 'devine', label: 'Devine (1974)', base: { e: 50, k: 45.5 }, perInch: { e: 2.3, k: 2.3 } },
  { key: 'robinson', label: 'Robinson (1983)', base: { e: 52, k: 49 }, perInch: { e: 1.9, k: 1.7 } },
  { key: 'miller', label: 'Miller (1983)', base: { e: 56.2, k: 53.1 }, perInch: { e: 1.41, k: 1.36 } },
  { key: 'hamwi', label: 'Hamwi (1964)', base: { e: 48, k: 45.5 }, perInch: { e: 2.7, k: 2.2 } },
];

/** Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır. */
export function computeIdeal(v) {
  const h = parseNum(v.height);
  if (!(h > 0)) throw new Error('Boy eksik ya da geçersiz. Santimetre cinsinden, örneğin 175 yazın.');
  if (h < MIN_HEIGHT || h > MAX_HEIGHT) throw new Error(`Boy ${MIN_HEIGHT}–${MAX_HEIGHT} cm arasında olmalıdır. Bu formüller yetişkin boyları için geliştirilmiştir; metre yerine santimetre yazdığınızdan emin olun (1,75 m yerine 175).`);
  if (v.sex !== 'k' && v.sex !== 'e') throw new Error('Cinsiyeti seçin. Dört formül de kadın ve erkek için farklı sabitler kullanır.');
  const ageRaw = String(v.age ?? '').trim();
  if (ageRaw !== '') {
    const age = parseNum(ageRaw);
    if (!(age > 0) || age !== Math.floor(age)) throw new Error('Yaş geçersiz. Boş bırakabilir ya da tam sayı olarak yazabilirsiniz (örn. 35).');
    if (age < 18) throw new Error('Bu araç yalnızca 18 yaş ve üzeri yetişkinler içindir. Çocuk ve ergenlerde kilo, yaş ve cinsiyete göre persentil eğrileriyle değerlendirilir; bunun için çocuğunuzun hekimine başvurun.');
    if (age > 120) throw new Error('Yaş 120 değerini geçemez. Değeri kontrol edip yeniden girin ya da boş bırakın.');
  }
  const weightRaw = String(v.weight ?? '').trim();
  let w = null;
  if (weightRaw !== '') {
    w = parseNum(weightRaw);
    if (!(w >= 20 && w <= 400)) throw new Error('Kilo 20–400 kg arasında olmalıdır. Boş bırakabilir ya da kilogram cinsinden yeniden girebilirsiniz.');
  }
  const inchOver = h / 2.54 - BASE_INCH;
  const rows = FORMULAS.map((f) => ({
    key: f.key,
    label: f.label,
    base: f.base[v.sex],
    perInch: f.perInch[v.sex],
    kg: f.base[v.sex] + f.perInch[v.sex] * inchOver,
  }));
  const avg = rows.reduce((s, r) => s + r.kg, 0) / rows.length;
  const min = Math.min(...rows.map((r) => r.kg));
  const max = Math.max(...rows.map((r) => r.kg));
  const m = h / 100;
  const bmiMin = 18.5 * m * m, bmiMax = 24.9 * m * m;
  const out = { h, sex: v.sex, inchOver, rows, avg, min, max, bmiMin, bmiMax, shortHeight: h < BASE_CM, w: null };
  if (w !== null) {
    const bmi = w / (m * m);
    out.w = w;
    out.bmi = bmi;
    out.diffAvg = w - avg;
    out.position = w < bmiMin ? 'below' : w > bmiMax ? 'above' : 'within';
    out.diffRange = w < bmiMin ? bmiMin - w : w > bmiMax ? w - bmiMax : 0;
  }
  return out;
}

/* ---------- Arayüz ---------- */
function render(r) {
  $('formulas').innerHTML = r.rows.map((x) => `<div class="kdv-row" data-key="${x.key}"><dt>${x.label}<span class="kal-sub">${nfNum.format(x.base)} + ${nfNum.format(x.perInch)} × (boy[inç] − 60)</span></dt><dd>${nf1.format(x.kg)} kg</dd></div>`).join('');
  $('r-avg').textContent = `${nf1.format(r.avg)} kg`;
  $('r-spread').textContent = `${nf1.format(r.min)} – ${nf1.format(r.max)} kg`;
  $('r-range').textContent = `${nf1.format(r.bmiMin)} – ${nf1.format(r.bmiMax)} kg`;
  $('r-inch').textContent = `${nf2.format(r.h / 2.54)} inç (60 inçin ${r.inchOver >= 0 ? 'üzeri' : 'altı'}: ${nf2.format(Math.abs(r.inchOver))})`;
  $('r-short').hidden = !r.shortHeight;
  const hasW = r.w !== null;
  // Kilo girilmediyse başlık ve satırların tamamı gizlenir (boş başlık kalmaz)
  $('r-cmp').hidden = !hasW;
  if (hasW) {
    $('r-cur').textContent = `${nf1.format(r.w)} kg · VKİ ${nf1.format(r.bmi)}`;
    const d = r.diffAvg;
    $('r-diffavg').textContent = Math.abs(d) < 0.05 ? 'ortalamayla aynı' : `${d > 0 ? '+' : '−'}${nf1.format(Math.abs(d))} kg (${d > 0 ? 'ortalamanın üzerinde' : 'ortalamanın altında'})`;
    $('r-diffrange').textContent = r.position === 'within'
      ? 'aralığın içinde'
      : r.position === 'below' ? `alt sınırın ${nf1.format(r.diffRange)} kg altında` : `üst sınırın ${nf1.format(r.diffRange)} kg üzerinde`;
  }
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => `İdeal kilo (boy ${nf1.format(r.h).replace(',0', '')} cm, ${r.sex === 'e' ? 'erkek' : 'kadın'}): ${r.rows.map((x) => `${x.label.replace(/ \(\d+\)/, '')} ${nf1.format(x.kg)} kg`).join(', ')}; ortalama ${nf1.format(r.avg)} kg. VKİ 18,5–24,9 aralığına denk gelen kilo: ${nf1.format(r.bmiMin)}–${nf1.format(r.bmiMax)} kg.${r.w !== null ? ` Mevcut kilo ${nf1.format(r.w)} kg.` : ''} Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;

let last = null;
function run() {
  showError($('error'), '');
  try {
    const sex = (document.querySelector('input[name="sex"]:checked') || {}).value;
    last = computeIdeal({ height: $('height').value, sex, weight: $('weight').value, age: $('age').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

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
