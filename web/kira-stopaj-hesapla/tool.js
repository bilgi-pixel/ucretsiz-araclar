// Kira Stopajı Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz tutarlar hiçbir yere gönderilmez.
// Brüt → net ve net → brüt; KDV'li kira; aylık / yıllık toplamlar.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;

// parametreler.json yüklenemezse (çevrimdışı vb.) yerleşik değerler kullanılır.
const DEFAULT_PARAMS = { guncelleme: '2026-11-04', stopaj_orani: 20, kdv_orani: 20 };
let params = DEFAULT_PARAMS;

/* Türkçe sayı ayrıştırma: 1.250,50 / 1250,5 / 1250.5 */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 20.000,00). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir tutar girin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) {
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma >= 0) {
    s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 20.000,00`);
  return n;
}

/* Saf hesap: dışarıdan test edilebilir. */
export function calculate({ mode, amount, period, rate, kdv, kdvRate }) {
  const r = rate / 100;
  const gross = mode === 'net' ? round2(amount / (1 - r)) : amount;
  const withholding = round2(gross * r);
  const net = round2(gross - withholding);
  const vat = kdv ? round2(gross * (kdvRate / 100)) : 0;
  const mult = period === 'yillik' ? 1 / 12 : 12; // girilen dönemin diğer döneme çevrimi
  return {
    gross, withholding, net, vat,
    tenantPays: round2(net + vat),   // kiraya verene ödenen: net kira + KDV
    tenantCost: round2(gross + vat), // kiracının toplam maliyeti: brüt kira + KDV
    other: { gross: round2(gross * mult), withholding: round2(withholding * mult), net: round2(net * mult) },
  };
}

const rowsEl = $('r-rows');
let lastText = '';

function render(rows, note) {
  rowsEl.textContent = '';
  const lines = [];
  for (const row of rows) {
    const div = document.createElement('div');
    div.className = 'kdv-row' + (row.strong ? ' is-strong' : '');
    const dt = document.createElement('dt'); dt.textContent = row.label;
    const dd = document.createElement('dd'); dd.id = `r-${row.id}`; dd.textContent = row.value;
    div.append(dt, dd);
    rowsEl.append(div);
    lines.push(`${row.label}: ${row.value}`);
  }
  $('r-note').textContent = note;
  lastText = lines.join('\n');
  $('result').classList.add('is-active');
}

function update() {
  showError($('error'), '');
  $('copy-status').textContent = '';
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const period = document.querySelector('input[name="period"]:checked').value;
  $('amount-label').textContent = mode === 'net' ? 'Net kira tutarı (₺)' : 'Brüt kira tutarı (₺)';
  $('kdv-wrap').hidden = !$('f-kdv').checked;
  try {
    const amount = parseAmount($('f-amount').value, 'Kira tutarı');
    const rate = parseAmount($('f-rate').value, 'Stopaj oranı');
    const kdv = $('f-kdv').checked;
    const kdvRate = kdv ? parseAmount($('f-kdv-rate').value, 'KDV oranı') : 0;
    if (rate === null) throw new Error("Stopaj oranını girin (iş yeri kirasında genel oran %20).");
    if (rate < 0 || rate >= 100) throw new Error("Stopaj oranı 0 ile 100 arasında olmalı. Genel oran 20'dir.");
    if (kdv && (kdvRate === null || kdvRate > 100)) throw new Error("KDV oranı 0-100 arasında olmalı. İş yeri kirasında genel oran 20'dir.");
    if (amount === null) { $('result').classList.remove('is-active'); return; }
    if (amount === 0) throw new Error('Kira tutarı sıfırdan büyük olmalı. Aylık ya da yıllık tutarı yazın.');
    if (amount > 1e12) throw new Error('Tutar çok büyük görünüyor. Rakamları ve ondalık ayırıcıyı (virgül) kontrol edin.');
    const c = calculate({ mode, amount, period, rate, kdv, kdvRate });
    const per = period === 'yillik' ? 'Yıllık' : 'Aylık';
    const oth = period === 'yillik' ? 'Aylık (ortalama)' : 'Yıllık (12 ay)';
    const rows = [
      { id: 'brut', label: `${per} brüt kira`, value: money(c.gross) },
      { id: 'stopaj', label: `${per} stopaj (%${rate.toLocaleString('tr-TR')})`, value: money(c.withholding) },
      { id: 'net', label: `${per} net kira`, value: money(c.net), strong: true },
    ];
    if (kdv) {
      rows.push({ id: 'kdv', label: `KDV (%${kdvRate.toLocaleString('tr-TR')}, brüt kira üzerinden)`, value: money(c.vat) });
      rows.push({ id: 'odeme', label: 'Kiraya verene ödenecek (net kira + KDV)', value: money(c.tenantPays) });
      rows.push({ id: 'maliyet', label: 'Kiracının toplam maliyeti (brüt kira + KDV)', value: money(c.tenantCost) });
    }
    rows.push({ id: 'diger-brut', label: `${oth} brüt kira`, value: money(c.other.gross) });
    rows.push({ id: 'diger-stopaj', label: `${oth} stopaj`, value: money(c.other.withholding) });
    rows.push({ id: 'diger-net', label: `${oth} net kira`, value: money(c.other.net) });
    const note = mode === 'net'
      ? `Brüt kira = net kira ÷ (1 − ${rate / 100}) işlemiyle bulundu. Stopaj, KDV hariç brüt kira üzerinden hesaplanır.`
      : 'Net kira = brüt kira − stopaj. Stopaj KDV hariç brüt kira üzerinden hesaplanır; KDV ayrıca eklenir.';
    render(rows, note);
  } catch (err) {
    $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* yerleşik değerlerle devam */ }
  $('f-rate').value = String(params.stopaj_orani ?? 20);
  $('f-kdv-rate').value = String(params.kdv_orani ?? 20);
  $('params-updated').textContent = params.guncelleme ?? '—';
  const form = $('form-stopaj');
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  update();
}
init();
