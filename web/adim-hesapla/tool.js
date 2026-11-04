// Adım Sayısı Hesaplama (adımdan km ve kalori) — tamamı tarayıcıda çalışır; girilen değerler sunucuya gitmez.
// Bilgilendirme amaçlıdır: tanı, tedavi, ilaç, takviye ya da kişisel diyet/egzersiz önerisi üretmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

/** Popüler günlük adım hedefi (bilimsel bir eşik değildir; yalnızca "kalan" hesabı için). */
export const GOAL_STEPS = 10000;

/** Boydan adım uzunluğu tahmini katsayıları: adım uzunluğu = boy × katsayı. */
export const STRIDE_COEF = { e: 0.415, k: 0.413 };

/** Yürüyüş temposu: MET değeri (Compendium of Physical Activities'ten yaklaşık) ve ortalama hız (km/sa). */
export const PACES = {
  slow: { label: 'Yavaş yürüyüş', met: 2.8, kmh: 3.2 },
  normal: { label: 'Normal yürüyüş', met: 3.5, kmh: 5 },
  fast: { label: 'Hızlı yürüyüş', met: 4.3, kmh: 5.6 },
};

/** Dönem toplamları: günlük değer, haftada 7 ve ayda 30 gün aynı miktar yürünürse. */
export const PERIODS = [
  { key: 'day', label: 'Günlük', days: 1 },
  { key: 'week', label: 'Haftalık (7 gün)', days: 7 },
  { key: 'month', label: 'Aylık (30 gün)', days: 30 },
];

/** Ondalık sayıyı virgül ya da nokta ile kabul eder; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** Adım sayısı: "8500" ya da binlik noktalı "8.500" kabul edilir; tam sayı değilse NaN. */
export function parseSteps(s) {
  const t = String(s ?? '').trim().replace(/\s/g, '');
  if (/^\d{1,3}(\.\d{3})+$/.test(t)) return Number(t.replace(/\./g, ''));
  const n = parseNum(t);
  return Number.isInteger(n) ? n : NaN;
}

const round1 = (n) => Math.round(n * 10) / 10;

/** Dakikayı "1 sa 27 dk" biçimine çevirir. */
export function formatDuration(min) {
  const m = Math.max(0, Math.round(min));
  const h = Math.floor(m / 60), r = m % 60;
  if (h === 0) return `${r} dk`;
  return r === 0 ? `${h} sa` : `${h} sa ${r} dk`;
}

/**
 * Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır.
 * Adım uzunluğu 0,1 cm'ye, süre dakikaya yuvarlanır; kalori yuvarlanmış süreden hesaplanır,
 * böylece ekrandaki değerler elle doğrulanabilir.
 */
export function computeSteps(v) {
  const mode = v.mode === 'distance' ? 'distance' : 'steps';

  // 1) Ana girdi: adım sayısı ya da mesafe
  let steps = NaN, distanceKm = NaN;
  if (mode === 'steps') {
    steps = parseSteps(v.steps);
    if (!(steps > 0)) throw new Error('Adım sayısı eksik ya da geçersiz. Tam sayı olarak yazın (örn. 8500 ya da 8.500).');
    if (steps > 200000) throw new Error('Adım sayısı 200.000\'i geçemez. Bir günde bu kadar adım atılması olası değil; değeri kontrol edip yeniden girin.');
  } else {
    distanceKm = parseNum(v.distance);
    if (!(distanceKm > 0)) throw new Error('Mesafe eksik ya da geçersiz. Kilometre olarak yazın (örn. 5 ya da 2,5).');
    if (distanceKm < 0.01 || distanceKm > 200) throw new Error('Mesafe 0,01–200 km arasında olmalıdır. Metre değil kilometre yazdığınızdan emin olun (500 m yerine 0,5).');
  }

  // 2) Adım uzunluğu: ölçülmüşse onu kullan, yoksa boy ve cinsiyetten tahmin et
  let strideCm, strideSource, strideNote, h = NaN;
  const measured = String(v.stride ?? '').trim() !== '';
  if (measured) {
    const s = parseNum(v.stride);
    if (!(s >= 30 && s <= 150)) throw new Error('Ölçülen adım uzunluğu 30–150 cm arasında olmalıdır. Santimetre olarak yazın (örn. 72) ya da alanı boş bırakıp boyunuzdan tahmin ettirin.');
    strideCm = round1(s);
    strideSource = 'measured';
    strideNote = 'ölçülen değer';
  } else {
    h = parseNum(v.height);
    if (!(h > 0)) throw new Error('Boy eksik ya da geçersiz. Santimetre cinsinden, örneğin 175 yazın; ya da ölçtüğünüz adım uzunluğunu girin.');
    if (h < 100 || h > 250) throw new Error('Boy 100–250 cm arasında olmalıdır. Metre yerine santimetre yazdığınızdan emin olun (1,75 m yerine 175).');
    if (v.sex !== 'k' && v.sex !== 'e') throw new Error('Cinsiyeti seçin. Adım uzunluğu tahmini cinsiyete göre farklı katsayı kullanır; ya da ölçtüğünüz adım uzunluğunu girin.');
    strideCm = round1(h * STRIDE_COEF[v.sex]);
    strideSource = 'estimated';
    strideNote = `boy × ${String(STRIDE_COEF[v.sex]).replace('.', ',')}`;
  }

  // 3) Kilo ve tempo
  const w = parseNum(v.weight);
  if (!(w > 0)) throw new Error('Kilo eksik ya da geçersiz. Kilogram cinsinden, örneğin 70 yazın.');
  if (w < 20 || w > 400) throw new Error('Kilo 20–400 kg arasında olmalıdır. Değeri kontrol edip yeniden girin.');
  const pace = PACES[v.pace];
  if (!pace) throw new Error('Yürüyüş temposunu listeden seçin.');

  // 4) Hesap
  if (mode === 'steps') distanceKm = (steps * strideCm) / 100000;
  else steps = Math.round((distanceKm * 100000) / strideCm);
  const minutes = Math.round((distanceKm / pace.kmh) * 60);
  const kcal = (pace.met * w * minutes) / 60; // kcal = MET × kg × saat

  // 10.000 adım hedefine kalan
  const remSteps = Math.max(0, GOAL_STEPS - steps);
  const remKm = (remSteps * strideCm) / 100000;
  const remMinutes = Math.round((remKm / pace.kmh) * 60);
  const remKcal = (pace.met * w * remMinutes) / 60;

  const periods = PERIODS.map((p) => ({
    ...p,
    steps: steps * p.days,
    km: distanceKm * p.days,
    minutes: minutes * p.days,
    kcal: kcal * p.days,
  }));

  return {
    mode, steps, distanceKm, strideCm, strideSource, strideNote, h, w, sex: v.sex, paceKey: v.pace, pace,
    minutes, hours: minutes / 60, kcal,
    goal: { steps: GOAL_STEPS, reached: steps >= GOAL_STEPS, remSteps, remKm, remMinutes, remKcal, over: Math.max(0, steps - GOAL_STEPS) },
    periods,
  };
}

/* ---------- Arayüz ---------- */
const fmtKm = (km) => `${nf2.format(km)} km`;
const fmtKcal = (k) => `${nf0.format(k)} kcal`;

function render(r) {
  const isSteps = r.mode === 'steps';
  $('r-steps-l').textContent = isSteps ? 'Adım sayısı' : 'Gereken adım sayısı (tahmini)';
  $('r-steps').textContent = `${isSteps ? '' : '≈ '}${nf0.format(r.steps)} adım`;
  $('r-stride').textContent = `${nf1.format(r.strideCm).replace('.', ',')} cm (${r.strideNote})`;
  $('r-distance').textContent = fmtKm(r.distanceKm);
  $('r-pace').textContent = `${r.pace.label} · ${String(r.pace.met).replace('.', ',')} MET · ≈ ${String(r.pace.kmh).replace('.', ',')} km/sa`;
  $('r-time').textContent = `${formatDuration(r.minutes)} (${nf2.format(r.hours)} saat)`;
  $('r-kcal').textContent = fmtKcal(r.kcal);

  // 10.000 adım hedefi
  const g = r.goal;
  $('r-goal').textContent = g.reached
    ? (g.over > 0 ? `Hedefe ulaşıldı (+${nf0.format(g.over)} adım)` : 'Hedefe ulaşıldı')
    : `${nf0.format(g.remSteps)} adım kaldı (≈ ${fmtKm(g.remKm)}, ≈ ${formatDuration(g.remMinutes)}, ≈ ${fmtKcal(g.remKcal)})`;

  // Dönem tablosu (satır kartları)
  $('periods').innerHTML = r.periods.map((p) => (
    `<div class="kdv-row" data-period="${p.key}"><dt>${p.label}</dt><dd class="ad-parts"><span>${nf0.format(p.steps)} adım</span><span>${fmtKm(p.km)} · ${formatDuration(p.minutes)}</span><span>${fmtKcal(p.kcal)}</span></dd></div>`
  )).join('');

  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => (r.mode === 'steps'
  ? `${nf0.format(r.steps)} adım ≈ ${fmtKm(r.distanceKm)}, ${formatDuration(r.minutes)} (${r.pace.label.toLowerCase()}), yaklaşık ${fmtKcal(r.kcal)}.`
  : `${fmtKm(r.distanceKm)} yürümek için ≈ ${nf0.format(r.steps)} adım gerekir; ${formatDuration(r.minutes)} (${r.pace.label.toLowerCase()}), yaklaşık ${fmtKcal(r.kcal)}.`)
  + ' Adım uzunluğu ' + `${nf1.format(r.strideCm).replace('.', ',')} cm. Yaklaşık değerlerdir; bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;

/** Seçili hesap kipine göre ilgili alanı gösterir, diğerini gizler. */
function updateMode() {
  const mode = (document.querySelector('input[name="mode"]:checked') || {}).value || 'steps';
  $('f-steps').hidden = mode !== 'steps';
  $('f-distance').hidden = mode !== 'distance';
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeSteps({
      mode: (document.querySelector('input[name="mode"]:checked') || {}).value,
      steps: $('steps').value, distance: $('distance').value,
      height: $('height').value, sex: (document.querySelector('input[name="sex"]:checked') || {}).value,
      stride: $('stride').value, weight: $('weight').value, pace: $('pace').value,
    });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', updateMode));
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('form').reset(); updateMode();
    $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), '');
    $('steps').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
  updateMode();
}
