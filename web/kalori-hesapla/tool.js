// Günlük Kalori İhtiyacı Hesaplama — tamamı tarayıcıda çalışır; girilen değerler sunucuya gitmez.
// Bilgilendirme amaçlıdır: tanı, tedavi, ilaç, takviye ya da kişisel diyet önerisi üretmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Aracın "uzmana danışın" uyarısı verdiği günlük enerji eşiği (kcal). */
export const MIN_KCAL = 1200;
/** Yaklaşık 1 kg vücut yağı için kullanılan kaba enerji değeri (kcal); yalnızca teorik gösterim içindir. */
const KCAL_PER_KG = 7700;

/** Ondalık sayıyı virgül ya da nokta ile kabul eder; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** Bazal metabolizma formülleri (kcal/gün); sex: 'e' erkek, 'k' kadın. */
export const FORMULAS = {
  mifflin: {
    label: 'Mifflin-St Jeor',
    bmr: (sex, w, h, age) => 10 * w + 6.25 * h - 5 * age + (sex === 'e' ? 5 : -161),
  },
  harris: {
    label: 'Harris-Benedict (revize 1984)',
    bmr: (sex, w, h, age) => (sex === 'e'
      ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * age
      : 447.593 + 9.247 * w + 3.098 * h - 4.330 * age),
  },
};

export const ACTIVITY = {
  1.2: 'Hareketsiz',
  1.375: 'Hafif aktif',
  1.55: 'Orta aktif',
  1.725: 'Çok aktif',
  1.9: 'Aşırı aktif',
};

/** Bakım kalorisine göre fark satırları; sıra tabloda gösterilen sıradır. */
export const TARGETS = [
  { delta: -500, label: 'Kilo verme', hint: '−500 kcal' },
  { delta: -250, label: 'Hafif kilo verme', hint: '−250 kcal' },
  { delta: 0, label: 'Bakım (kilonuzu koruma)', hint: 'fark yok' },
  { delta: 250, label: 'Hafif kilo alma', hint: '+250 kcal' },
  { delta: 500, label: 'Kilo alma', hint: '+500 kcal' },
];

/** Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır. */
export function computeCalories(v) {
  const h = parseNum(v.height), w = parseNum(v.weight), age = parseNum(v.age);
  if (!(h > 0)) throw new Error('Boy eksik ya da geçersiz. Santimetre cinsinden, örneğin 175 yazın.');
  if (h < 100 || h > 250) throw new Error('Boy 100–250 cm arasında olmalıdır. Metre yerine santimetre yazdığınızdan emin olun (1,75 m yerine 175).');
  if (!(w > 0)) throw new Error('Kilo eksik ya da geçersiz. Kilogram cinsinden, örneğin 70 yazın.');
  if (w < 20 || w > 400) throw new Error('Kilo 20–400 kg arasında olmalıdır. Değeri kontrol edip yeniden girin.');
  if (!(age > 0) || age !== Math.floor(age)) throw new Error('Yaş eksik ya da geçersiz. Tam sayı olarak yazın (örn. 35).');
  if (age < 18) throw new Error('Bu araç yalnızca 18 yaş ve üzeri yetişkinler içindir. Çocuk ve ergenlerin enerji ihtiyacı büyümeye göre değişir; bunun için çocuğunuzun hekimine ya da diyetisyene başvurun.');
  if (age > 120) throw new Error('Yaş 120 değerini geçemez. Değeri kontrol edip yeniden girin.');
  if (v.sex !== 'k' && v.sex !== 'e') throw new Error('Cinsiyeti seçin. Bazal metabolizma formülleri cinsiyete göre farklı sabitler kullanır.');
  const factor = Number(v.activity);
  if (!Object.prototype.hasOwnProperty.call(ACTIVITY, factor)) throw new Error('Aktivite düzeyini listeden seçin.');
  const formulaKey = v.formula === 'harris' ? 'harris' : 'mifflin';
  const otherKey = formulaKey === 'harris' ? 'mifflin' : 'harris';

  // Makro yüzdeleri: üçü de 0–100 arasında olmalı ve toplamı 100 etmeli
  const pct = { protein: parseNum(v.protein), carb: parseNum(v.carb), fat: parseNum(v.fat) };
  for (const key of Object.keys(pct)) {
    if (!(pct[key] >= 0 && pct[key] <= 100)) throw new Error('Protein, karbonhidrat ve yağ yüzdeleri 0–100 arasında birer sayı olmalıdır. Varsayılan dağılım için 30 / 40 / 30 yazabilirsiniz.');
  }
  const sum = pct.protein + pct.carb + pct.fat;
  if (Math.abs(sum - 100) > 0.01) throw new Error(`Makro yüzdelerinin toplamı 100 olmalıdır (şu an ${nf1.format(sum).replace(',0', '')}). Örneğin 30 / 40 / 30 yazın ya da yüzdeleri toplam 100 olacak biçimde düzeltin.`);

  const bmr = FORMULAS[formulaKey].bmr(v.sex, w, h, age);
  const otherBmr = FORMULAS[otherKey].bmr(v.sex, w, h, age);
  const tdee = bmr * factor;
  const targets = TARGETS.map((t) => {
    const kcal = tdee + t.delta;
    return { ...t, kcal, low: kcal < MIN_KCAL, weekly: (t.delta * 7) / KCAL_PER_KG };
  });
  const macroDelta = Number(v.macroTarget ?? 0);
  const macroRow = targets.find((t) => t.delta === macroDelta) || targets.find((t) => t.delta === 0);
  const macro = {
    target: macroRow,
    pct,
    kcal: macroRow.kcal,
    // Protein ve karbonhidrat gram başına 4 kcal, yağ 9 kcal
    grams: {
      protein: (macroRow.kcal * pct.protein) / 100 / 4,
      carb: (macroRow.kcal * pct.carb) / 100 / 4,
      fat: (macroRow.kcal * pct.fat) / 100 / 9,
    },
  };
  return {
    h, w, age, sex: v.sex, factor, formulaKey, formulaLabel: FORMULAS[formulaKey].label,
    otherLabel: FORMULAS[otherKey].label, bmr, otherBmr, tdee, targets, macro,
    anyLow: targets.some((t) => t.low),
  };
}

/* ---------- Arayüz ---------- */
const sign = (n) => (n > 0 ? '+' : n < 0 ? '−' : '');

function render(r) {
  $('r-formula').textContent = r.formulaLabel;
  $('r-bmr').textContent = `${nf0.format(r.bmr)} kcal/gün`;
  $('r-other-l').textContent = `Karşılaştırma: ${r.otherLabel} bazal değeri`;
  $('r-other').textContent = `${nf0.format(r.otherBmr)} kcal/gün`;
  $('r-factor').textContent = `×${String(r.factor).replace('.', ',')} (${ACTIVITY[r.factor]})`;
  $('r-tdee').textContent = `${nf0.format(r.tdee)} kcal/gün`;
  // Hedef satırları
  $('targets').innerHTML = r.targets.map((t) => {
    const weekly = t.delta === 0 ? '' : ` · teorik ≈ ${sign(t.delta)}${nf2.format(Math.abs(t.weekly))} kg/hafta`;
    const low = t.low ? '<span class="kal-low">1.200 kcal altında</span>' : '';
    return `<div class="kdv-row${t.low ? ' is-low' : ''}${t.delta === 0 ? ' is-strong' : ''}" data-delta="${t.delta}"><dt>${t.label}<span class="kal-sub">${t.hint}${weekly}</span></dt><dd>${nf0.format(t.kcal)} kcal ${low}</dd></div>`;
  }).join('');
  $('r-low').hidden = !r.anyLow;
  // Makro tablosu
  const m = r.macro;
  $('r-macro-t').textContent = `${m.target.label} (${nf0.format(m.kcal)} kcal/gün) hedefi için`;
  const line = (g, p, per) => `${nf0.format(g)} g (%${nf1.format(p).replace(',0', '')} · ${nf0.format(g * per)} kcal)`;
  $('r-prot').textContent = line(m.grams.protein, m.pct.protein, 4);
  $('r-carb').textContent = line(m.grams.carb, m.pct.carb, 4);
  $('r-fat').textContent = line(m.grams.fat, m.pct.fat, 9);
  $('r-macro-low').hidden = !m.target.low;
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => `Günlük kalori tahmini (${r.formulaLabel}): bazal metabolizma yaklaşık ${nf0.format(r.bmr)} kcal, bakım kalorisi yaklaşık ${nf0.format(r.tdee)} kcal (${ACTIVITY[r.factor]}). Makro (${r.macro.target.label}): protein ${nf0.format(r.macro.grams.protein)} g, karbonhidrat ${nf0.format(r.macro.grams.carb)} g, yağ ${nf0.format(r.macro.grams.fat)} g. Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;

let last = null;
function run() {
  showError($('error'), '');
  try {
    const sex = (document.querySelector('input[name="sex"]:checked') || {}).value;
    last = computeCalories({
      height: $('height').value, weight: $('weight').value, age: $('age').value, sex,
      activity: $('activity').value, formula: $('formula').value,
      protein: $('m-protein').value, carb: $('m-carb').value, fat: $('m-fat').value, macroTarget: $('m-target').value,
    });
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
