// Vade Farkı Hesaplama — tamamı tarayıcıda çalışır; girdiğiniz tutarlar hiçbir yere gönderilmez.
// Dört mod: vadeli fiyat, taksit planı, ters hesap (oran bulma) ve çek/senet iskontosu.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;
const pct = (n) => `%${fmtPct.format(n)}`;

// parametreler.json yüklenemezse yerleşik değerler kullanılır.
const DEFAULT_PARAMS = { guncelleme: '2026-11-04', ay_gun_sayisi: 30, ornek_aylik_oran: 3, ornek_yillik_oran: 40 };
let params = DEFAULT_PARAMS;

/* Türkçe sayı ayrıştırma: 1.250,50 / 1250,5 / 1250.5 */
export function parseAmount(raw, label = 'Değer') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$|%/gi, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 10.000,00). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir değer girin.`);
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
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 10.000,00`);
  return n;
}

/* Vade süresini, oranın dönemine (aylık/yıllık) göre dönem sayısına çevirir. */
export function periodCount({ rateUnit, term, termUnit, basis, monthDays = 30 }) {
  if (rateUnit === 'aylik') return termUnit === 'ay' ? term : term / monthDays;
  return termUnit === 'ay' ? term / 12 : term / basis;
}

/* Saf hesap fonksiyonları (matematik; tavsiye değildir). */
export const growth = (i, n, method) => (method === 'bilesik' ? Math.pow(1 + i, n) : 1 + i * n);
export const annuityPayment = (principal, i, n) => (i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n)));
export const discountPV = (nominal, annualRate, days, basis) => nominal / (1 + (annualRate * days) / basis);

function need(value, label, hint) {
  if (value === null) throw new Error(`${label} boş. ${hint}`);
  return value;
}

function checkRate(rate, label) {
  if (rate > 1000) throw new Error(`${label} çok yüksek görünüyor (en fazla %1.000). Virgül ve noktayı kontrol edin; %3 için 3 yazın.`);
}

/* ---------- Çıktı ---------- */
const rowsEl = $('r-rows');
const tableEl = $('r-table');
let lastText = '';

function render(rows, note, table) {
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
  tableEl.textContent = '';
  if (table) {
    const t = document.createElement('table');
    const cap = document.createElement('caption'); cap.textContent = table.caption; cap.className = 'vf-caption';
    const thead = document.createElement('thead'); const hr = document.createElement('tr');
    for (const h of table.head) { const th = document.createElement('th'); th.scope = 'col'; th.textContent = h; hr.append(th); }
    thead.append(hr);
    const tbody = document.createElement('tbody');
    for (const r of table.rows) {
      const tr = document.createElement('tr');
      for (const cell of r) { const td = document.createElement('td'); td.textContent = cell; tr.append(td); }
      tbody.append(tr);
    }
    t.append(cap, thead, tbody);
    tableEl.append(t);
  }
  lastText = lines.join('\n');
  $('result').classList.add('is-active');
}

/* ---------- Modlar ---------- */
function modePrice() {
  const pesin = need(parseAmount($('f-pesin').value, 'Peşin fiyat'), 'Peşin fiyat', 'Peşin tutarı yazın (örn. 10.000).');
  const rate = need(parseAmount($('f-oran').value, 'Vade farkı oranı'), 'Vade farkı oranı', 'Oranı yüzde olarak yazın (örn. 3).');
  const term = need(parseAmount($('f-vade').value, 'Vade'), 'Vade', 'Vade süresini yazın (örn. 3 ay).');
  checkRate(rate, 'Vade farkı oranı');
  if (pesin <= 0) throw new Error('Peşin fiyat sıfırdan büyük olmalı.');
  if (term <= 0) throw new Error('Vade sıfırdan büyük olmalı. Ay ya da gün sayısı girin.');
  const rateUnit = $('f-oran-unit').value;
  const termUnit = $('f-vade-unit').value;
  const basis = Number($('f-basis').value);
  const method = $('f-yontem').value;
  const i = rate / 100;
  const n = periodCount({ rateUnit, term, termUnit, basis });
  const price = round2(pesin * growth(i, n, method));
  const diff = round2(price - pesin);
  const rows = [
    { id: 'pesin', label: 'Peşin fiyat', value: money(pesin) },
    { id: 'fark', label: `Vade farkı (${method === 'bilesik' ? 'bileşik' : 'basit'})`, value: money(diff) },
    { id: 'vadeli', label: 'Vadeli fiyat', value: money(price), strong: true },
    { id: 'toplam-oran', label: 'Toplam vade farkı oranı', value: pct((price / pesin - 1) * 100) },
  ];
  // Tablo: 1-12. aylık vadeler (aynı oran ve yöntemle).
  const tRows = [];
  for (let m = 1; m <= 12; m += 1) {
    const nm = periodCount({ rateUnit, term: m, termUnit: 'ay', basis });
    const p = round2(pesin * growth(i, nm, method));
    tRows.push([`${m} ay`, money(p - pesin), money(p)]);
  }
  const unitTxt = rateUnit === 'aylik' ? 'aylık' : 'yıllık';
  const note = method === 'bilesik'
    ? `Vadeli fiyat = peşin × (1 + ${unitTxt} oran)^dönem sayısı. Dönem sayısı: ${fmtPct.format(n)}.`
    : `Vadeli fiyat = peşin × (1 + ${unitTxt} oran × dönem sayısı). Dönem sayısı: ${fmtPct.format(n)}.`;
  render(rows, note, { caption: 'Aynı oranla 1-12 ay vade karşılaştırması', head: ['Vade', 'Vade farkı', 'Vadeli fiyat'], rows: tRows });
}

function modeInstallment() {
  const pesin = need(parseAmount($('f-pesin').value, 'Peşin fiyat'), 'Peşin fiyat', 'Peşin tutarı yazın (örn. 10.000).');
  const rate = need(parseAmount($('f-oran').value, 'Aylık vade farkı oranı'), 'Aylık vade farkı oranı', 'Aylık oranı yüzde olarak yazın (örn. 3).');
  const nRaw = need(parseAmount($('f-taksit').value, 'Taksit sayısı'), 'Taksit sayısı', 'Taksit sayısını yazın (örn. 6).');
  checkRate(rate, 'Aylık oran');
  if (pesin <= 0) throw new Error('Peşin fiyat sıfırdan büyük olmalı.');
  if (!Number.isInteger(nRaw) || nRaw < 1 || nRaw > 360) throw new Error('Taksit sayısı 1 ile 360 arasında tam sayı olmalı (örn. 6).');
  const n = nRaw;
  const i = rate / 100;
  const method = $('f-yontem-t').value;
  let total; let installment; let note;
  if (method === 'anuite') {
    installment = round2(annuityPayment(pesin, i, n));
    total = round2(installment * n);
    note = 'Eşit taksit (anüite): her ay kalan borç üzerinden faiz işler; taksit = peşin × i ÷ (1 − (1 + i)^−n).';
  } else {
    total = round2(pesin * growth(i, n, method));
    installment = round2(total / n);
    note = method === 'bilesik'
      ? 'Toplam = peşin × (1 + i)^n; taksit = toplam ÷ taksit sayısı. Tüm tutar n. ayda ödenseydi oluşacak vadeli fiyat esas alınır.'
      : 'Toplam = peşin × (1 + i × n); taksit = toplam ÷ taksit sayısı. Tüm tutar n. ayda ödenseydi oluşacak vadeli fiyat esas alınır.';
  }
  const rows = [
    { id: 'pesin', label: 'Peşin fiyat', value: money(pesin) },
    { id: 'fark', label: 'Toplam vade farkı', value: money(total - pesin) },
    { id: 'toplam', label: 'Toplam ödeme', value: money(total) },
    { id: 'taksit', label: `Aylık taksit (${n} taksit)`, value: money(installment), strong: true },
  ];
  const tRows = [];
  let remaining = total;
  const shown = Math.min(n, 60);
  for (let k = 1; k <= shown; k += 1) {
    remaining = k === n ? 0 : round2(remaining - installment);
    tRows.push([`${k}`, money(k === n ? total - installment * (n - 1) : installment), money(Math.max(remaining, 0))]);
  }
  render(rows, note + (n > 60 ? ' Tabloda ilk 60 taksit gösterilir.' : ' Son taksit kuruş farkını dengeler.'), { caption: 'Taksit planı', head: ['Taksit', 'Tutar', 'Kalan borç'], rows: tRows });
}

function modeReverse() {
  const pesin = need(parseAmount($('f-pesin').value, 'Peşin fiyat'), 'Peşin fiyat', 'Peşin tutarı yazın (örn. 10.000).');
  const vadeli = need(parseAmount($('f-vadeli').value, 'Vadeli fiyat'), 'Vadeli fiyat', 'Vadeli (toplam) tutarı yazın (örn. 10.900).');
  const term = need(parseAmount($('f-vade').value, 'Vade'), 'Vade', 'Vade süresini yazın (örn. 3 ay).');
  if (pesin <= 0 || vadeli <= 0) throw new Error('Peşin ve vadeli fiyat sıfırdan büyük olmalı.');
  if (term <= 0) throw new Error('Vade sıfırdan büyük olmalı. Ay ya da gün sayısı girin.');
  if (vadeli < pesin) throw new Error('Vadeli fiyat peşin fiyattan küçük olamaz. İki tutarı doğru alanlara yazdığınızdan emin olun.');
  const termUnit = $('f-vade-unit').value;
  const basis = Number($('f-basis').value);
  const method = $('f-yontem').value;
  const ratio = vadeli / pesin;
  const nM = periodCount({ rateUnit: 'aylik', term, termUnit, basis });
  const nY = periodCount({ rateUnit: 'yillik', term, termUnit, basis });
  const monthly = method === 'bilesik' ? (Math.pow(ratio, 1 / nM) - 1) * 100 : ((ratio - 1) / nM) * 100;
  const yearly = method === 'bilesik' ? (Math.pow(ratio, 1 / nY) - 1) * 100 : ((ratio - 1) / nY) * 100;
  const rows = [
    { id: 'fark', label: 'Vade farkı tutarı', value: money(vadeli - pesin) },
    { id: 'toplam-oran', label: 'Toplam vade farkı oranı', value: pct((ratio - 1) * 100) },
    { id: 'aylik', label: `Aylık oran (${method === 'bilesik' ? 'bileşik' : 'basit'})`, value: pct(monthly), strong: true },
    { id: 'yillik', label: `Yıllık oran (${method === 'bilesik' ? 'bileşik' : 'basit'}, ${basis} gün)`, value: pct(yearly) },
  ];
  const note = method === 'bilesik'
    ? 'Oran = (vadeli ÷ peşin)^(1 ÷ dönem sayısı) − 1. Aylık oranda 30 gün = 1 ay kabul edilir.'
    : 'Oran = (vadeli ÷ peşin − 1) ÷ dönem sayısı. Aylık oranda 30 gün = 1 ay kabul edilir.';
  render(rows, note, null);
}

function modeDiscount() {
  const nominal = need(parseAmount($('f-nominal').value, 'Nominal tutar'), 'Nominal tutar', 'Çek ya da senedin üzerindeki tutarı yazın (örn. 100.000).');
  const days = need(parseAmount($('f-gun').value, 'Vadeye kalan gün'), 'Vadeye kalan gün', 'Vadeye kalan gün sayısını yazın (örn. 90).');
  const rate = need(parseAmount($('f-yillik').value, 'Yıllık iskonto oranı'), 'Yıllık iskonto oranı', 'Yıllık oranı yüzde olarak yazın (örn. 40).');
  checkRate(rate, 'Yıllık oran');
  if (nominal <= 0) throw new Error('Nominal tutar sıfırdan büyük olmalı.');
  if (days <= 0 || days > 36500) throw new Error('Vadeye kalan gün 1 ile 36.500 arasında olmalı. Tarihten gün sayısını hesaplamak için "Tarih Farkı" aracını kullanabilirsiniz.');
  const basis = Number($('f-basis').value);
  const r = rate / 100;
  const pv = round2(discountPV(nominal, r, days, basis));
  const bankPv = round2(nominal * (1 - (r * days) / basis));
  const rows = [
    { id: 'nominal', label: 'Nominal (vade tarihindeki) tutar', value: money(nominal) },
    { id: 'bugun', label: 'Bugünkü değer (kırdırma tutarı)', value: money(pv), strong: true },
    { id: 'kesinti', label: 'İskonto (kesinti) tutarı', value: money(nominal - pv) },
    { id: 'kesinti-oran', label: 'Nominale göre kesinti oranı', value: pct(((nominal - pv) / nominal) * 100) },
  ];
  if (bankPv > 0) rows.push({ id: 'bankaci', label: 'Karşılaştırma: bankacı iskontosu ile bugünkü değer', value: money(bankPv) });
  const tRows = [30, 60, 90, 120, 150, 180, 270, 360].map((d) => {
    const v = round2(discountPV(nominal, r, d, basis));
    return [`${d} gün`, money(v), money(nominal - v)];
  });
  const note = `Bugünkü değer = nominal ÷ (1 + yıllık oran × gün ÷ ${basis}). Bankacı iskontosunda kesinti nominal üzerinden alınır: nominal × (1 − oran × gün ÷ ${basis}).`;
  render(rows, note, { caption: 'Aynı nominal ve oranla farklı vadeler', head: ['Vadeye kalan', 'Bugünkü değer', 'Kesinti'], rows: tRows });
}

/* ---------- Form ---------- */
const MODES = { fiyat: modePrice, taksit: modeInstallment, ters: modeReverse, iskonto: modeDiscount };

function update() {
  showError($('error'), '');
  $('copy-status').textContent = '';
  const mode = document.querySelector('input[name="mode"]:checked').value;
  // Seçili moda ait alanları göster, diğerlerini gizle.
  document.querySelectorAll('[data-modes]').forEach((el) => {
    el.hidden = !el.dataset.modes.split(' ').includes(mode);
  });
  const unitLabel = $('f-oran-label');
  unitLabel.textContent = mode === 'taksit' ? 'Aylık vade farkı oranı (%)' : 'Vade farkı oranı (%)';
  try {
    MODES[mode]();
  } catch (err) {
    $('result').classList.remove('is-active');
    showError($('error'), err.message);
  }
}

// Alanlar boşken kullanıcıyı hata ile karşılama: sadece sonucu gizle.
function safeUpdate() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const ids = { fiyat: ['f-pesin', 'f-oran', 'f-vade'], taksit: ['f-pesin', 'f-oran', 'f-taksit'], ters: ['f-pesin', 'f-vadeli', 'f-vade'], iskonto: ['f-nominal', 'f-gun', 'f-yillik'] }[mode];
  const anyEmpty = ids.some((id) => !$(id).value.trim());
  if (anyEmpty) {
    showError($('error'), '');
    $('result').classList.remove('is-active');
    document.querySelectorAll('[data-modes]').forEach((el) => { el.hidden = !el.dataset.modes.split(' ').includes(mode); });
    $('f-oran-label').textContent = mode === 'taksit' ? 'Aylık vade farkı oranı (%)' : 'Vade farkı oranı (%)';
    return;
  }
  update();
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* yerleşik değerlerle devam */ }
  $('f-oran').placeholder = `örn. ${params.ornek_aylik_oran ?? 3}`;
  $('f-yillik').placeholder = `örn. ${params.ornek_yillik_oran ?? 40}`;
  $('params-updated').textContent = params.guncelleme ?? '—';
  const form = $('form-vade');
  form.addEventListener('input', safeUpdate);
  form.addEventListener('change', safeUpdate);
  form.addEventListener('submit', (e) => { e.preventDefault(); update(); });
  $('copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
    catch { $('copy-status').textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayabilirsiniz.'; }
  });
  safeUpdate();
}
init();
