// Brüt-Net Maaş Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcYear, netToBrut, round2 } from './calc.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => `${fmt.format(round2(n))} ₺`;
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// parametreler.json yüklenemezse kullanılacak yerleşik değerler.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-03', yil: 2026, asgari_ucret_brut: 33030, sgk_isci_orani: 14, issizlik_isci_orani: 1,
  sgk_isveren_orani: 20.5, sgk_isveren_indirim_puan: 5, issizlik_isveren_orani: 2, damga_vergisi_orani: 0.759, sgk_tavan_katsayisi: 7.5,
  gelir_vergisi_dilimleri: [
    { ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 },
    { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 },
  ],
};

/** Türkçe girdileri (33.030,50 / 33030,5 / 33030.5) sayıya çevirir. */
export function parseAmount(raw) {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,]/.test(s)) {
    if (s.startsWith('-')) throw new Error('Tutar negatif olamaz. Pozitif bir maaş tutarı girin (örn. 50.000).');
    throw new Error('Tutar yalnızca rakam içermeli (örn. 50.000,00). Harf ve sembolleri silip tekrar deneyin.');
  }
  const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    if ((s.match(/\./g) || []).length > 1 || /^\d{1,3}\.\d{3}$/.test(s)) s = s.replace(/\./g, '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error('Tutar okunamadı. Örnek biçim: 50.000,00');
  return n;
}

let params = DEFAULT_PARAMS;

function readOpts() {
  return { asgariIstisna: $('f-exempt').checked, isverenIndirim: $('f-discount').checked };
}

function setRow(id, value) { $(id).textContent = value; }

function render() {
  const err = $('error');
  const result = $('result');
  err.textContent = '';
  showError(err, '');
  try {
    const amount = parseAmount($('f-amount').value);
    if (amount === null) { result.classList.remove('is-active'); return; }
    if (amount <= 0) throw new Error('Maaş sıfırdan büyük olmalı. Örnek: 50.000');
    if (amount > 100000000) throw new Error('Tutar çok büyük görünüyor. Aylık maaşı yazdığınızdan emin olun (örn. 50.000).');
    const opts = readOpts();
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const brut = mode === 'brut' ? amount : netToBrut(amount, params, opts, 1);
    const { rows, totals } = calcYear(brut, params, opts);
    const first = rows[0];
    result.classList.add('is-active');
    setRow('r-brut', money(first.brut));
    setRow('r-sgk', money(first.sgk));
    setRow('r-issizlik', money(first.issizlik));
    setRow('r-matrah', money(first.matrah));
    setRow('r-gv', money(first.gelirVergisi));
    setRow('r-damga', money(first.damga));
    setRow('r-net', money(first.net));
    setRow('r-net-avg', money(totals.net / 12));
    setRow('r-net-year', money(totals.net));
    const showEmployer = $('f-employer').checked;
    $('r-employer-wrap').hidden = !showEmployer;
    setRow('r-employer', money(first.isverenMaliyet));
    $('th-employer').hidden = !showEmployer;
    $('mode-note').textContent = mode === 'net'
      ? `Ocak ayında ${money(amount)} net alabilmek için gereken brüt maaş: ${money(brut)}. Sonraki aylarda vergi dilimi yükseldikçe aynı brütten ele geçen net azalabilir; tabloya bakın.`
      : '';
    const tbody = $('tbl').querySelector('tbody');
    tbody.textContent = '';
    for (const r of rows) {
      const tr = document.createElement('tr');
      const cells = [MONTHS[r.ay - 1], money(r.brut), money(r.sgk + r.issizlik), money(r.matrah), money(r.gelirVergisi), money(r.damga), money(r.net)];
      if (showEmployer) cells.push(money(r.isverenMaliyet));
      cells.forEach((c, i) => {
        const td = document.createElement(i === 0 ? 'th' : 'td');
        if (i === 0) td.scope = 'row';
        td.textContent = c;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
    const foot = $('tbl').querySelector('tfoot');
    foot.textContent = '';
    const tr = document.createElement('tr');
    const tcells = ['Yıllık toplam', money(totals.brut), money(totals.sgk + totals.issizlik), money(totals.matrah), money(totals.gelirVergisi), money(totals.damga), money(totals.net)];
    if (showEmployer) tcells.push(money(totals.isverenMaliyet));
    tcells.forEach((c, i) => { const td = document.createElement(i === 0 ? 'th' : 'td'); td.textContent = c; tr.appendChild(td); });
    foot.appendChild(tr);
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
  $('p-asgari').textContent = money(params.asgari_ucret_brut);
  $('p-source').textContent = params.kaynak;
  $('f-amount').placeholder = `örn. ${fmt.format(params.asgari_ucret_brut).replace(',00', '')}`;
  document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', () => {
    $('amount-label').textContent = el.value === 'brut' && el.checked ? 'Aylık brüt maaş (₺)' : 'Aylık net maaş (₺, Ocak ayı)';
    render();
  }));
  $('f-employer').addEventListener('change', () => { $('f-discount-wrap').hidden = !$('f-employer').checked; render(); });
  ['f-amount', 'f-exempt', 'f-discount'].forEach((id) => $(id).addEventListener('input', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
