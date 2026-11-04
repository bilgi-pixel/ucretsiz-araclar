// Evcil Hayvan Yaşı Hesaplama — köpek ve kedi yaşını insan yaşına çevirir.
// Tamamı tarayıcıda çalışır; girdiğiniz bilgi sunucuya gitmez. Tahminî bilgi verir, veteriner hekim tavsiyesi yerine geçmez.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 });
const fmt = (n) => nf.format(n);

/* ---------- Veri ---------- */

// Köpek boyut sınıfları: 2. yıldan sonra yıllık insan yaşı artışı (AVMA tarzı yaygın tablo).
const DOG_RATE = { small: 4, medium: 5, large: 6, giant: 7 };
const SIZE_LABEL = {
  small: 'Küçük ırk (yaklaşık 9 kg altı)',
  medium: 'Orta ırk (yaklaşık 9–23 kg)',
  large: 'Büyük ırk (yaklaşık 23–41 kg)',
  giant: 'Dev ırk (yaklaşık 41 kg üzeri)',
};
const CAT_RATE = 4;
// Yaşlı (senior) evresinin başladığı yaklaşık yaş: küçük ırklar geç, dev ırklar erken yaşlanır.
const DOG_SENIOR = { small: 10, medium: 9, large: 7, giant: 6 };
const CAT_SENIOR = 11;
const MAX_YEARS = 30;

const CARE = {
  dog: {
    yavru: 'Aşı ve parazit takvimi için veteriner hekiminizle düzenli kontrol planlayın. Sosyalleşme ve temel eğitim bu dönemde en kolay oturur; yavru mamasıyla beslenin ve büyüme çağında aşırı koşturmadan kaçının.',
    genç: 'Enerji yüksektir: günlük yürüyüş ve oyun ihtiyacını karşılayın, davranış eğitimini sürdürün. Kısırlaştırma, hatırlatma aşıları ve parazit koruması için doğru zamanlamayı veteriner hekimle konuşun.',
    yetişkin: 'Yılda bir genel muayene, diş sağlığı kontrolü, ideal kiloyu koruma ve düzenli hareket temel önceliktir. Aşı ve parazit programını aksatmayın.',
    yaşlı: 'Genel muayene ve kan tahlili sıklığını veteriner hekiminize sorun (çoğu zaman yılda iki kez önerilir). Eklem sertliği, kilo değişimi, su tüketiminde artış, diş ve işitme sorunlarına dikkat edin. Yumuşak yatak, kaymayan zemin ve kısa, sık yürüyüşler konforu artırır.',
  },
  cat: {
    yavru: 'Aşı, iç-dış parazit ve ilk kontrol takvimi için veteriner hekime başvurun. Yavru mamasıyla besleyin; güvenli bir oyun alanı ve tırmalama tahtası sunun.',
    genç: 'Kısırlaştırma, hatırlatma aşıları ve mikroçip konusunu veteriner hekimle planlayın. Oyunla enerji harcamasını sağlayın; balkon ve pencere güvenliğini kontrol edin.',
    yetişkin: 'Yıllık kontrol, diş sağlığı, kilo takibi ve temiz su erişimi önemlidir. Kapalı alanda yaşayan kedilerde oyun ve hareket, kilo kontrolüne yardımcı olur.',
    yaşlı: 'Su içme, iştah, kilo, tüy bakımı ve tuvalet alışkanlıklarındaki değişiklikler erken uyarı olabilir; kontrol sıklığını veteriner hekiminize sorun. Kolay ulaşılan bir tuvalet ve yumuşak bir yatak sağlayın.',
  },
};

/* ---------- Hesap (saf fonksiyonlar) ---------- */

/** Tablo yöntemi: 1. yıl 15, 2. yıl +9 (=24), sonrası türe/boyuta göre yıllık sabit artış. Aradaki yaşlar doğrusal. */
export function humanAgeTable(species, size, years) {
  const rate = species === 'cat' ? CAT_RATE : DOG_RATE[size];
  if (years <= 1) return 15 * years;
  if (years <= 2) return 15 + 9 * (years - 1);
  return 24 + rate * (years - 2);
}

/** UCSD epigenetik formülü (köpek): 16 × ln(yaş) + 31. Çok genç köpekte anlamsız sonuç verdiği için 3 aydan küçükte null. */
export function humanAgeUcsd(years) {
  if (!(years >= 0.25)) return null;
  return 16 * Math.log(years) + 31;
}

/** Yaşam evresi: yavru / genç / yetişkin / yaşlı. */
export function lifeStage(species, size, years) {
  if (species === 'cat') {
    if (years < 1) return 'yavru';
    if (years < 3) return 'genç';
    return years < CAT_SENIOR ? 'yetişkin' : 'yaşlı';
  }
  const puppyEnd = size === 'large' || size === 'giant' ? 1.5 : 1;
  if (years < puppyEnd) return 'yavru';
  if (years < 3) return 'genç';
  return years < DOG_SENIOR[size] ? 'yetişkin' : 'yaşlı';
}

/** Girdiyi doğrular; hata durumunda Türkçe, çözüm öneren Error fırlatır. Yıl cinsinden ondalık yaş döndürür. */
export function parseAge(yearsRaw, monthsRaw) {
  const y = String(yearsRaw ?? '').trim();
  const m = String(monthsRaw ?? '').trim();
  if (!y && !m) throw new Error('Yaş girilmedi. Yıl ve/veya ay kutusuna bir sayı yazın (örn. 5 yıl 3 ay).');
  const whole = /^-?\d+$/;
  if ((y && !whole.test(y)) || (m && !whole.test(m))) {
    throw new Error('Yıl ve ay tam sayı olmalıdır. Örneğin 5,5 yıl yerine 5 yıl 6 ay yazın.');
  }
  const years = y ? Number(y) : 0;
  const months = m ? Number(m) : 0;
  if (years < 0 || months < 0) throw new Error('Yaş eksi olamaz. Yıl ve ay kutularına 0 ya da daha büyük bir sayı yazın.');
  if (months > 11) throw new Error('Ay değeri 0 ile 11 arasında olmalıdır. 12 ay ve üzerini yıl kutusuna ekleyin (örn. 14 ay = 1 yıl 2 ay).');
  if (years > MAX_YEARS) throw new Error(`Yıl değeri ${MAX_YEARS}'dan büyük olamaz. Bu araç 0–${MAX_YEARS} yıl arasını destekler; yaşı yeniden kontrol edin.`);
  const total = years + months / 12;
  if (total <= 0) throw new Error('Yaş sıfır olamaz. En az 1 ay girin (örn. 0 yıl 3 ay).');
  return total;
}

/** Tüm sonucu hesaplar. */
export function compute({ species, size, yearsRaw, monthsRaw }) {
  const age = parseAge(yearsRaw, monthsRaw);
  const sz = species === 'dog' ? size : null;
  if (species === 'dog' && !DOG_RATE[sz]) throw new Error('Köpek boyutu seçilmedi. Listeden küçük, orta, büyük ya da dev ırk seçin.');
  const human = humanAgeTable(species, sz, age);
  const ucsd = species === 'dog' ? humanAgeUcsd(age) : null;
  const stage = lifeStage(species, sz, age);
  return { species, size: sz, age, human, ucsd, stage, care: CARE[species][stage] };
}

/* ---------- Arayüz ---------- */

const REF_YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15];

function ageText(age) {
  const totalMonths = Math.round(age * 12);
  const y = Math.floor(totalMonths / 12), mo = totalMonths % 12;
  return `${y} yıl${mo ? ` ${mo} ay` : ''}`;
}

function renderTable(r) {
  const head = $('t-head'), body = $('t-body');
  head.textContent = ''; body.textContent = '';
  const cols = r.species === 'dog' ? ['Köpek yaşı', 'İnsan yaşı (tablo)', 'İnsan yaşı (UCSD)'] : ['Kedi yaşı', 'İnsan yaşı (tablo)'];
  cols.forEach((c) => { const th = document.createElement('th'); th.scope = 'col'; th.textContent = c; head.appendChild(th); });
  $('t-caption').textContent = r.species === 'dog' ? `Köpek yaşı tablosu — ${SIZE_LABEL[r.size]}` : 'Kedi yaşı tablosu';
  REF_YEARS.forEach((yr) => {
    const tr = document.createElement('tr');
    const cells = [`${yr} yıl`, `${fmt(humanAgeTable(r.species, r.size, yr))}`];
    if (r.species === 'dog') cells.push(fmt(humanAgeUcsd(yr)));
    cells.forEach((t) => { const td = document.createElement('td'); td.textContent = t; tr.appendChild(td); });
    body.appendChild(tr);
  });
}

function render(r) {
  const kind = r.species === 'dog' ? `Köpek — ${SIZE_LABEL[r.size]}` : 'Kedi';
  $('r-human').textContent = `${fmt(r.human)} yaş`;
  $('r-kind').textContent = kind;
  $('r-real').textContent = ageText(r.age);
  $('r-stage').textContent = r.stage;
  $('r-ucsd-row').hidden = r.species !== 'dog';
  $('r-ucsd').textContent = r.ucsd === null ? '— (3 aydan küçükte hesaplanmaz)' : `≈ ${fmt(r.ucsd)} yaş`;
  $('r-care').textContent = r.care;
  renderTable(r);
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  const kind = r.species === 'dog' ? 'Köpek' : 'Kedi';
  const ucsd = r.ucsd === null ? '' : ` UCSD formülüne göre ≈ ${fmt(r.ucsd)} yaş.`;
  return `${kind} (${ageText(r.age)}) insan yaşıyla yaklaşık ${fmt(r.human)} yaşında; yaşam evresi: ${r.stage}.${ucsd} Tahminîdir, veteriner tavsiyesi yerine geçmez.`;
}

let last = null;

function hideResult() { $('result').hidden = true; $('result').classList.remove('is-active'); }

function syncSpecies() {
  const dog = $('sp-dog').checked;
  $('size-field').hidden = !dog;
}

function run() {
  showError($('error'), '');
  try {
    last = compute({
      species: $('sp-dog').checked ? 'dog' : 'cat',
      size: $('size').value,
      yearsRaw: $('years').value,
      monthsRaw: $('months').value,
    });
    render(last);
  } catch (e) {
    last = null;
    hideResult();
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="species"]').forEach((r) => r.addEventListener('change', () => {
  syncSpecies(); hideResult(); showError($('error'), ''); last = null;
}));
$('clear').addEventListener('click', () => {
  $('years').value = ''; $('months').value = ''; $('size').value = 'medium'; $('sp-dog').checked = true;
  syncSpecies(); hideResult(); last = null; showError($('error'), ''); $('copy-status').textContent = ''; $('years').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

syncSpecies();
document.body.dataset.ready = '1';
