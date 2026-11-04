// Mevduat Faizi Hesaplama (net getiri, stopaj) — tamamı tarayıcıda çalışır; tutarlar sunucuya gitmez.
// Yalnızca matematiksel hesaptır; yatırım tavsiyesi değildir, banka teklifi esastır.
import { showError } from '../assets/js/ba.js';
import { DEFAULTS, computeDeposit, stopajFor } from './hesap.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const pct = (n) => `%${new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n)}`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "100.000,50", "100000", "3,5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

let params = DEFAULTS;
let last = null;

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url), { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar */ }
  const [y, m, d] = params.guncelleme.split('-');
  $('params-info').textContent = `Parametreler ${d}.${m}.${y} tarihinde güncellendi. Kaynak: ${params.kaynak}`;
  syncTaxHint();
}

function readDays() {
  const v = parseNum($('f-term').value);
  if (!(v > 0)) throw new Error('Vade geçersiz. Sıfırdan büyük bir sayı yazın ve gün ya da ay birimini seçin (örnek: 32 gün).');
  const days = $('f-unit').value === 'ay' ? Math.round(v * params.ayGunu) : v;
  return days;
}

function syncTaxHint() {
  const manual = $('f-taxmode').value === 'manuel';
  $('g-tax').hidden = !manual;
  const v = parseNum($('f-term').value);
  const days = $('f-unit').value === 'ay' ? Math.round(v * params.ayGunu) : v;
  $('tax-hint').textContent = Number.isInteger(days) && days >= 1
    ? `Bu vade için otomatik stopaj: ${pct(stopajFor(days, params).yuzde)} (${stopajFor(days, params).ad}).`
    : 'Vadeyi girince uygulanacak stopaj dilimi burada görünür.';
}

function render(r) {
  $('r-head').textContent = `Vade sonu net tutar: ${fmt(r.total)}`;
  $('r-gross').textContent = fmt(r.gross);
  $('r-taxrate').textContent = `${pct(r.tax)}${r.auto ? ' (vadeye göre otomatik)' : ' (elle girildi)'}`;
  $('r-taxamt').textContent = fmt(r.taxAmt);
  $('r-net').textContent = fmt(r.net);
  $('r-total').textContent = fmt(r.total);
  $('r-monthly').textContent = fmt(r.monthlyNet);
  $('r-daily').textContent = fmt(r.dailyNet);
  $('r-netrate').textContent = pct(r.netRate);
  $('result').hidden = false;
  $('result').classList.add('is-active');
  last = r;
}

function summaryText(r) {
  return `Mevduat: ${fmt(r.amount)}, ${r.days} gün, yıllık brüt %${r.rate}. Brüt faiz ${fmt(r.gross)}, stopaj ${pct(r.tax)} (${fmt(r.taxAmt)}), net getiri ${fmt(r.net)}, vade sonu ${fmt(r.total)}. Matematiksel hesaptır; banka teklifi esastır.`;
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  $('copy-status').textContent = '';
  try {
    const amount = parseNum($('f-amount').value);
    if (!(amount > 0)) throw new Error('Tutar geçersiz. Sıfırdan büyük bir tutarı rakamla yazın (örnek: 100.000).');
    const days = readDays();
    const rate = parseNum($('f-rate').value);
    let taxPct = null;
    if ($('f-taxmode').value === 'manuel') {
      taxPct = parseNum($('f-tax').value);
      if (Number.isNaN(taxPct)) throw new Error('Stopaj oranı geçersiz. 0 ile 100 arasında bir yüzde yazın ya da otomatik seçeneğini kullanın.');
    }
    render(computeDeposit({ amount, days, rate: Number.isNaN(rate) ? -1 : rate, taxPct }, params));
  } catch (err) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
});
$('clear').addEventListener('click', () => {
  $('form').reset();
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); $('copy-status').textContent = ''; last = null; syncTaxHint(); $('f-amount').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  try { await navigator.clipboard.writeText(summaryText(last)); $('copy-status').textContent = 'Özet panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
});
for (const id of ['f-term', 'f-unit', 'f-taxmode']) { $(id).addEventListener('input', syncTaxHint); $(id).addEventListener('change', syncTaxHint); }
syncTaxHint();
loadParams();
