// Gelir Vergisi Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcTax, monthlyCumulative, rentBase, round2 } from './calc.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => `${fmt.format(round2(n))} ₺`;
const short = (n) => fmt.format(n).replace(',00', '');
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// parametreler.json yüklenemezse kullanılacak yerleşik değerler.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04', yil: 2026, gotur_gider_orani: 15, kira_istisna_tutari: 47000,
  kaynak: 'Gelir Vergisi Kanunu madde 103 tarifesi; ücret dışı 3. dilim ve kira istisnası yaklaşık değerdir.',
  dilimler_ucret: [
    { ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 },
    { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 },
  ],
  dilimler_ucret_disi: [
    { ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1000000, oran: 27 },
    { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 },
  ],
};
let params = DEFAULT_PARAMS;

/** Türkçe girdileri (300.000 / 300000,50 / 300000.5) sayıya çevirir. */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,]/.test(s)) {
    if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir tutar girin (örn. 300.000).`);
    throw new Error(`${label} yalnızca rakam içermeli (örn. 300.000,00). Harf ve sembolleri silip tekrar deneyin.`);
  }
  const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    if ((s.match(/\./g) || []).length > 1 || /^\d{1,3}\.\d{3}$/.test(s)) s = s.replace(/\./g, '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 300.000,00`);
  return n;
}

const kind = () => document.querySelector('input[name="kind"]:checked').value;

function syncForm() {
  const k = kind();
  $('amount-label').textContent = k === 'kira' ? 'Yıllık brüt kira geliri (₺)' : k === 'ucret' ? 'Yıllık gelir vergisi matrahı (₺)' : 'Yıllık vergiye tabi kazanç / matrah (₺)';
  $('rent-opts').hidden = k !== 'kira';
  $('exempt-amount-wrap').hidden = !$('f-exempt').checked;
  $('expense-wrap').hidden = $('f-flat').checked;
}

function addRow(tbody, cells) {
  const tr = document.createElement('tr');
  cells.forEach((c, i) => {
    const td = document.createElement(i === 0 ? 'th' : 'td');
    if (i === 0) td.scope = 'row';
    td.textContent = c;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
  return tr;
}

function render() {
  const err = $('error');
  const result = $('result');
  showError(err, '');
  try {
    const k = kind();
    const amount = parseAmount($('f-amount').value, 'Gelir tutarı');
    if (amount === null) { result.classList.remove('is-active'); return; }
    if (amount <= 0) throw new Error('Gelir sıfırdan büyük olmalı. Örnek: 300.000');
    if (amount > 10000000000) throw new Error('Tutar çok büyük görünüyor. Yıllık tutarı yazdığınızdan emin olun (örn. 300.000).');

    let base = amount;
    let note = '';
    if (k === 'kira') {
      let exempt = 0;
      if ($('f-exempt').checked) {
        const v = parseAmount($('f-exempt-amount').value, 'İstisna tutarı');
        exempt = v === null ? params.kira_istisna_tutari : v;
      }
      const flat = $('f-flat').checked;
      let expense = 0;
      if (!flat) {
        const v = parseAmount($('f-expense').value, 'Gider tutarı');
        expense = v === null ? 0 : v;
        if (expense > amount) throw new Error('Gider tutarı kira gelirinden büyük olamaz. Giderleri belgelerinize göre kontrol edin.');
      }
      const r = rentBase({ hasilat: amount, istisna: exempt, goturu: flat, gider: expense, goturuOran: params.gotur_gider_orani });
      base = r.matrah;
      note = `Brüt kira ${money(amount)}; istisna ${money(r.istisnaKullanilan)}, gider ${money(r.gider)} düşüldükten sonra vergiye esas matrah ${money(base)}.`;
      if (base === 0) note += ' Kira geliriniz istisna tutarını aşmadığı için vergi doğmaz.';
    }

    const brackets = k === 'ucret' ? params.dilimler_ucret : params.dilimler_ucret_disi;
    const res = calcTax(base, brackets);
    result.classList.add('is-active');
    $('r-matrah').textContent = money(res.matrah);
    $('r-vergi').textContent = money(res.vergi);
    $('r-efektif').textContent = `%${fmt.format(res.efektif)}`;
    $('r-marjinal').textContent = res.marjinal ? `%${res.marjinal}` : '—';
    $('r-kalan').textContent = money(amount - res.vergi);
    $('r-kalan-label').textContent = k === 'kira' ? 'Vergi sonrası kalan (brüt kiradan)' : 'Vergi sonrası kalan';
    $('calc-note').textContent = note;

    const tb = $('tbl-bracket').querySelector('tbody');
    tb.textContent = '';
    res.dilimler.forEach((d) => {
      const range = d.ust === null ? `${short(d.alt)} ₺ üzeri` : `${short(d.alt)} – ${short(d.ust)} ₺`;
      const tr = addRow(tb, [range, `%${d.oran}`, money(d.matrah), money(d.vergi)]);
      if (d.matrah === 0) tr.classList.add('is-empty');
    });

    // Aylık kümülatif gösterim yalnızca ücret için anlamlı.
    $('month-wrap').hidden = k !== 'ucret';
    if (k === 'ucret') {
      const mb = $('tbl-month').querySelector('tbody');
      mb.textContent = '';
      monthlyCumulative(base, brackets).forEach((r) => addRow(mb, [MONTHS[r.ay - 1], money(r.matrah), money(r.kumulatif), money(r.vergi), money(r.kumulatifVergi)]));
    }
  } catch (e) {
    result.classList.remove('is-active');
    showError(err, e.message);
  }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı: yerleşik değerler */ }
  $('p-updated').textContent = new Date(params.guncelleme + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  $('p-source').textContent = params.kaynak;
  $('f-exempt-amount').placeholder = `örn. ${short(params.kira_istisna_tutari)}`;
  $('flat-label').textContent = `Götürü gider (%${params.gotur_gider_orani}) uygula`;
  document.querySelectorAll('input[name="kind"]').forEach((el) => el.addEventListener('change', () => { syncForm(); render(); }));
  ['f-exempt', 'f-flat'].forEach((id) => $(id).addEventListener('change', () => { syncForm(); render(); }));
  ['f-amount', 'f-exempt-amount', 'f-expense'].forEach((id) => $(id).addEventListener('input', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  syncForm();
  render();
}

init();
