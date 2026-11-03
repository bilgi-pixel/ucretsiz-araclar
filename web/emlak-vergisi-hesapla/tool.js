// Emlak Vergisi Hesaplama — tamamı tarayıcıda çalışır; tutarlar sunucuya gitmez.
// Bilgilendirme amaçlıdır, mali tavsiye değildir. Oranlar parametreler.json'dadır (1319 sayılı Kanun).
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;

// parametreler.json yüklenemezse kullanılacak varsayılanlar (binde olarak).
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04',
  oranlar_binde: {
    konut: { normal: 1, metro: 2 },
    isyeri: { normal: 2, metro: 4 },
    arsa: { normal: 3, metro: 6 },
    arazi: { normal: 1, metro: 2 },
  },
  degerli_konut_esik: null,
};
let params = DEFAULT_PARAMS;

const TYPE_LABEL = { konut: 'Konut', isyeri: 'İş yeri / diğer bina', arsa: 'Arsa', arazi: 'Arazi' };

/** tr-TR girdileri: 1.250,50 / 1250,5 / 1250.5 → sayı; boşsa null. */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 2.000.000 ya da 2000000,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Tutarı eksi işareti olmadan girin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 2.000.000,00`);
  return n;
}

/** Yıllık vergi ve taksitleri hesaplar. rate: binde. */
export function calcTax({ type, metro, value, rates = params.oranlar_binde }) {
  const perMille = rates[type]?.[metro ? 'metro' : 'normal'];
  if (perMille === undefined) throw new Error('Taşınmaz türü tanınmadı. Listeden bir tür seçin.');
  const annual = round2((value * perMille) / 1000);
  const first = round2(annual / 2);
  const second = round2(annual - first);
  return { perMille, annual, first, second, monthly: round2(annual / 12) };
}

let last = null;
const setResult = (on) => { $('result').hidden = !on; $('result').classList.toggle('is-active', on); };

function render() {
  showError($('error'), '');
  const value = parseAmount($('f-value').value, 'Emlak vergi değeri');
  if (value === null) throw new Error('Emlak vergi değerini girin. Değeri bilmiyorsanız belediyenizin emlak vergisi servisinden öğrenin.');
  if (value <= 0) throw new Error('Emlak vergi değeri sıfırdan büyük olmalı. Tutarı kontrol edip tekrar girin.');
  if (value > 1e12) throw new Error('Girilen tutar çok büyük görünüyor. Rakamları kontrol edin.');
  const limit = parseAmount($('f-limit').value, 'Değerli konut eşiği');
  const type = $('f-type').value;
  const metro = $('f-metro').value === 'metro';
  const r = calcTax({ type, metro, value });
  $('r-rate').textContent = `Binde ${r.perMille}`;
  $('r-annual').textContent = money(r.annual);
  $('r-i1').textContent = money(r.first);
  $('r-i2').textContent = money(r.second);
  $('r-month').textContent = money(r.monthly);
  const notes = [];
  if (type === 'konut') notes.push('Tek konut istisnası (emekli, engelli, şehit yakını vb.) ayrıca başvuru ve şart gerektirir; bu hesaba dahil değildir.');
  const threshold = limit ?? params.degerli_konut_esik;
  if (type === 'konut' && threshold && value > threshold) notes.push('Girdiğiniz değer, belirtilen eşiği aşıyor: değerli konut vergisi (ayrı bir vergi) gündeme gelebilir; belediyeden ya da Gelir İdaresi\'nden teyit edin.');
  notes.push('Çevre temizlik vergisi ve peşin ödeme indirimi dahil değildir. Kesin tutar için belediyenize danışın.');
  $('r-note').textContent = notes.join(' ');
  setResult(true);
  last = { type, metro, value, ...r };
}

function summaryText(l) {
  return `Emlak vergisi (${TYPE_LABEL[l.type]}, ${l.metro ? 'büyükşehir içi' : 'büyükşehir dışı'}): vergi değeri ${money(l.value)}, oran binde ${l.perMille}, yıllık vergi ${money(l.annual)}; taksitler ${money(l.first)} (Mayıs) ve ${money(l.second)} (Kasım). Bilgilendirme amaçlıdır. araclar.bilisimajans.com/emlak-vergisi-hesapla/`;
}

function safeRender() {
  try { render(); } catch (e) { setResult(false); last = null; showError($('error'), e.message); }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); safeRender(); });
$('clear').addEventListener('click', () => {
  $('f-value').value = ''; $('f-limit').value = '';
  setResult(false); last = null; showError($('error'), ''); $('copy-status').textContent = '';
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(params.guncelleme || '');
  $('params-updated').textContent = m
    ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : params.guncelleme;
}
loadParams();
