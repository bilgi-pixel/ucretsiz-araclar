// Hedef Nabız Hesaplama (maksimum kalp atış hızı, nabız bölgeleri, Karvonen) — tamamı tarayıcıda çalışır;
// girilen değerler sunucuya gitmez. Bilgilendirme amaçlıdır: tanı, tedavi, ilaç, doz ya da kişisel egzersiz
// programı önerisi üretmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });

/** Geçerli yaş aralığı: formüller yetişkinler için geliştirilmiştir. */
export const AGE_MIN = 18;
export const AGE_MAX = 100;
/** Geçerli dinlenme nabzı aralığı (atım/dk). */
export const REST_MIN = 30;
export const REST_MAX = 120;

/** Maksimum kalp atış hızı formülleri (atım/dk). */
export const FORMULAS = {
  classic: { label: 'Klasik (220 − yaş)', max: (age) => 220 - age },
  tanaka: { label: 'Tanaka (208 − 0,7 × yaş)', max: (age) => 208 - 0.7 * age },
};

/** Beş nabız bölgesi: maksimum nabzın yüzde aralığı. */
export const ZONES = [
  { n: 1, name: 'Isınma', hint: 'çok hafif efor', lo: 50, hi: 60 },
  { n: 2, name: 'Yağ yakımı', hint: 'hafif efor', lo: 60, hi: 70 },
  { n: 3, name: 'Aerobik', hint: 'orta efor', lo: 70, hi: 80 },
  { n: 4, name: 'Anaerobik', hint: 'ağır efor', lo: 80, hi: 90 },
  { n: 5, name: 'Maksimum', hint: 'çok ağır efor', lo: 90, hi: 100 },
];

/** Ondalık sayıyı virgül ya da nokta ile kabul eder; geçersizse NaN. */
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '' || !/^\d+(\.\d+)?$/.test(t)) return NaN;
  return Number(t);
}

/** Yaşa göre maksimum nabız; en yakın tam sayıya yuvarlanır (kayan nokta gürültüsü temizlenir). */
export function maxHeartRate(formulaKey, age) {
  return Math.round(Number(FORMULAS[formulaKey].max(age).toFixed(6)));
}

/** Karvonen: hedef nabız = dinlenme + (maksimum − dinlenme) × yüzde. */
export function karvonen(rest, max, pct) {
  return Math.round(Number((rest + ((max - rest) * pct) / 100).toFixed(6)));
}

/** Maksimum nabzın yüzdesi olarak hedef nabız. */
export function percentOfMax(max, pct) {
  return Math.round(Number(((max * pct) / 100).toFixed(6)));
}

/** Tüm sonucu hesaplar; hata durumunda Türkçe, çözüm öneren Error fırlatır. */
export function computeHeartRate(v) {
  const age = parseNum(v.age);
  if (!(age > 0) || age !== Math.floor(age)) throw new Error('Yaş eksik ya da geçersiz. Tam sayı olarak yazın (örn. 40).');
  if (age < AGE_MIN) throw new Error(`Bu araç ${AGE_MIN} yaş ve üzeri yetişkinler içindir. Çocuk ve ergenlerde bu formüller güvenilir değildir; antrenörünüze ya da çocuk hekiminize danışın.`);
  if (age > AGE_MAX) throw new Error(`Yaş ${AGE_MAX} değerini geçemez. Değeri kontrol edip yeniden girin.`);
  const formulaKey = v.formula === 'tanaka' ? 'tanaka' : 'classic';
  const otherKey = formulaKey === 'tanaka' ? 'classic' : 'tanaka';
  const max = maxHeartRate(formulaKey, age);
  const otherMax = maxHeartRate(otherKey, age);

  // Dinlenme nabzı isteğe bağlıdır; girilirse Karvonen yöntemi de hesaplanır
  let rest = null;
  if (String(v.rest ?? '').trim() !== '') {
    rest = parseNum(v.rest);
    if (!(rest >= REST_MIN && rest <= REST_MAX)) throw new Error(`Dinlenme nabzı ${REST_MIN}–${REST_MAX} atım/dk arasında olmalıdır. Sabah uyanır uyanmaz, yataktan kalkmadan ölçtüğünüz değeri yazın (örn. 62); bilmiyorsanız alanı boş bırakın.`);
    if (!Number.isInteger(rest)) rest = Math.round(rest);
    if (rest >= max) throw new Error(`Dinlenme nabzı maksimum nabızdan (${max}) küçük olmalıdır. Değeri kontrol edip yeniden girin ya da alanı boş bırakın.`);
  }

  // Tek bir yoğunluk yüzdesi için hedef nabız (isteğe bağlı)
  let intensity = null;
  if (String(v.intensity ?? '').trim() !== '') {
    const pct = parseNum(v.intensity);
    if (!(pct >= 30 && pct <= 100)) throw new Error('Yoğunluk yüzdesi 30–100 arasında olmalıdır (örn. 70). Yüzde işareti yazmayın; boş bırakırsanız yalnızca bölgeler gösterilir.');
    intensity = { pct, simple: percentOfMax(max, pct), karvonen: rest === null ? null : karvonen(rest, max, pct) };
  }

  const zones = ZONES.map((z) => ({
    ...z,
    simpleLo: percentOfMax(max, z.lo),
    simpleHi: percentOfMax(max, z.hi),
    karvLo: rest === null ? null : karvonen(rest, max, z.lo),
    karvHi: rest === null ? null : karvonen(rest, max, z.hi),
  }));

  return {
    age, formulaKey, formulaLabel: FORMULAS[formulaKey].label,
    otherLabel: FORMULAS[otherKey].label, max, otherMax,
    rest, reserve: rest === null ? null : max - rest,
    zones, intensity,
  };
}

/* ---------- Arayüz ---------- */
const bpm = (n) => `${nf0.format(n)} atım/dk`;
const pctText = (n) => String(n).replace('.', ',');

function render(r) {
  $('r-formula').textContent = r.formulaLabel;
  $('r-max').textContent = bpm(r.max);
  $('r-other-l').textContent = `Karşılaştırma: ${r.otherLabel}`;
  $('r-other').textContent = bpm(r.otherMax);
  const hasRest = r.rest !== null;
  $('row-rest').hidden = !hasRest;
  $('row-reserve').hidden = !hasRest;
  if (hasRest) {
    $('r-rest').textContent = bpm(r.rest);
    $('r-reserve').textContent = bpm(r.reserve);
  }
  $('r-method').textContent = hasRest
    ? `Maksimumun yüzdesi ve Karvonen (dinlenme nabzı ${nf0.format(r.rest)})`
    : 'Maksimumun yüzdesi (Karvonen için dinlenme nabzı girin)';

  // Tek yoğunluk satırları
  const it = r.intensity;
  $('row-target-simple').hidden = !it;
  $('row-target-karv').hidden = !(it && hasRest);
  if (it) {
    $('r-target-simple-l').textContent = `Hedef nabız %${pctText(it.pct)}, maksimumun yüzdesi`;
    $('r-target-simple').textContent = bpm(it.simple);
    if (hasRest) {
      $('r-target-karv-l').textContent = `Hedef nabız %${pctText(it.pct)}, Karvonen`;
      $('r-target-karv').textContent = bpm(it.karvonen);
    }
  }

  // Bölge tablosu
  $('zones').innerHTML = r.zones.map((z) => {
    const karv = hasRest ? `<span class="nb-karv">Karvonen: <span class="nb-nw">${nf0.format(z.karvLo)}–${nf0.format(z.karvHi)}</span></span>` : '';
    return `<tr data-zone="${z.n}"><th scope="row">Bölge ${z.n} · ${z.name}<span class="nb-sub">${z.hint}</span></th><td>%${z.lo}–${z.hi}</td><td><span class="nb-simple">${nf0.format(z.simpleLo)}–${nf0.format(z.simpleHi)}</span>${karv}</td></tr>`;
  }).join('');
  $('r-zone-note').hidden = !hasRest;
  $('result').hidden = false; $('result').classList.add('is-active');
}

const summaryText = (r) => {
  const z = (n) => r.zones.find((x) => x.n === n);
  const base = `Maksimum nabız (${r.formulaLabel}): ${r.max} atım/dk. Bölge 2 (%60–70): ${z(2).simpleLo}–${z(2).simpleHi}, bölge 3 (%70–80): ${z(3).simpleLo}–${z(3).simpleHi} atım/dk.`;
  const karv = r.rest === null ? '' : ` Karvonen (dinlenme ${r.rest}): bölge 2 ${z(2).karvLo}–${z(2).karvHi}, bölge 3 ${z(3).karvLo}–${z(3).karvHi} atım/dk.`;
  return `${base}${karv} Bilgilendirme amaçlıdır, tıbbi tavsiye değildir; hekiminize danışın.`;
};

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeHeartRate({ age: $('age').value, rest: $('rest').value, formula: $('formula').value, intensity: $('intensity').value });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

if (typeof document !== 'undefined' && $('form')) {
  $('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
  $('clear').addEventListener('click', () => {
    $('form').reset(); $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('age').focus();
  });
  $('copy').addEventListener('click', async () => {
    if (!last) return;
    const st = $('copy-status');
    try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
  });
}
