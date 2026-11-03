// İşveren Maliyeti Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcYear, employerCost, round2 } from './calc.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => `${fmt.format(round2(n))} ₺`;
const short = (n) => fmt.format(n).replace(',00', '');
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// parametreler.json yüklenemezse kullanılacak yerleşik değerler.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04', yil: 2026, asgari_ucret_brut: 33030, asgari_ucret_destegi: 1270.38, sgk_isci_orani: 14, issizlik_isci_orani: 1,
  sgk_isveren_orani: 20.5, sgk_isveren_indirim_puan: 5, issizlik_isveren_orani: 2, damga_vergisi_orani: 0.759, sgk_tavan_katsayisi: 7.5,
  kaynak: 'Asgari ücret duyurusu, 5510 sayılı Kanun; asgari ücret desteği tutarı yaklaşık değerdir.',
  gelir_vergisi_dilimleri: [
    { ust_sinir: 190000, oran: 15 }, { ust_sinir: 400000, oran: 20 }, { ust_sinir: 1500000, oran: 27 },
    { ust_sinir: 5300000, oran: 35 }, { ust_sinir: null, oran: 40 },
  ],
};
let params = DEFAULT_PARAMS;

/** Türkçe girdileri (33.030,50 / 33030,5 / 33030.5) sayıya çevirir. */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,]/.test(s)) {
    if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Pozitif bir tutar girin (örn. 50.000).`);
    throw new Error(`${label} yalnızca rakam içermeli (örn. 50.000,00). Harf ve sembolleri silip tekrar deneyin.`);
  }
  const lastComma = s.lastIndexOf(','), lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    if ((s.match(/\./g) || []).length > 1 || /^\d{1,3}\.\d{3}$/.test(s)) s = s.replace(/\./g, '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 50.000,00`);
  return n;
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
}

function render() {
  const err = $('error');
  const result = $('result');
  showError(err, '');
  $('support-wrap').hidden = !$('f-support').checked;
  try {
    const brut = parseAmount($('f-amount').value, 'Brüt ücret');
    if (brut === null) { result.classList.remove('is-active'); return; }
    if (brut <= 0) throw new Error('Brüt ücret sıfırdan büyük olmalı. Örnek: 50.000');
    if (brut > 100000000) throw new Error('Tutar çok büyük görünüyor. Aylık brüt ücreti yazdığınızdan emin olun (örn. 50.000).');
    let supportAmount = params.asgari_ucret_destegi;
    if ($('f-support').checked) {
      const v = parseAmount($('f-support-amount').value, 'Destek tutarı');
      if (v !== null) supportAmount = v;
    }
    const opts = { isverenIndirim: $('f-discount').checked, destek: $('f-support').checked, destekTutari: supportAmount };
    const c = employerCost(brut, params, opts);
    const { rows, totals } = calcYear(brut, params, { asgariIstisna: true });
    const net = rows[0].net;
    const workerCut = brut - net;
    const employerLoad = c.toplam - brut;

    result.classList.add('is-active');
    $('r-brut').textContent = money(brut);
    $('r-sgk-label').textContent = `SGK işveren payı (%${fmt.format(c.sgkRate)})`;
    $('r-sgk').textContent = money(c.sgk);
    $('r-issizlik').textContent = money(c.issizlik);
    $('r-destek-wrap').hidden = !opts.destek;
    $('r-destek').textContent = `− ${money(c.destek)}`;
    $('r-toplam').textContent = money(c.toplam);
    $('r-net').textContent = money(net);
    $('r-oran').textContent = `${fmt.format(c.toplam / net)} ₺`;
    $('r-yillik').textContent = money(c.toplam * 12);

    // Karşılaştırma çubuğu: toplam maliyetin ne kadarı çalışana, devlete ve kurumlara gidiyor.
    const pct = (v) => Math.max(0, (v / c.toplam) * 100);
    $('bar-net').style.width = `${pct(net)}%`;
    $('bar-worker').style.width = `${pct(workerCut)}%`;
    $('bar-employer').style.width = `${pct(employerLoad)}%`;
    $('bar').setAttribute('aria-label', `Toplam maliyetin yüzde ${fmt.format(pct(net))} kadarı çalışanın eline geçer.`);
    $('lg-net').textContent = `${money(net)} (%${fmt.format(pct(net))})`;
    $('lg-worker').textContent = `${money(workerCut)} (%${fmt.format(pct(workerCut))})`;
    $('lg-employer').textContent = `${money(employerLoad)} (%${fmt.format(pct(employerLoad))})`;

    const tb = $('tbl').querySelector('tbody');
    tb.textContent = '';
    rows.forEach((r) => addRow(tb, [MONTHS[r.ay - 1], money(brut), money(c.sgk), money(c.issizlik), money(c.destek), money(c.toplam), money(r.net)]));
    const tf = $('tbl').querySelector('tfoot');
    tf.textContent = '';
    addRow(tf, ['Yıllık toplam', money(brut * 12), money(c.sgk * 12), money(c.issizlik * 12), money(c.destek * 12), money(c.toplam * 12), money(totals.net)]);
    tf.querySelectorAll('td, th').forEach((x) => { x.style.fontWeight = '700'; });
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
  $('f-amount').placeholder = `örn. ${short(params.asgari_ucret_brut)}`;
  $('f-support-amount').placeholder = `örn. ${fmt.format(params.asgari_ucret_destegi)}`;
  ['f-amount', 'f-support-amount'].forEach((id) => $(id).addEventListener('input', render));
  ['f-discount', 'f-support'].forEach((id) => $(id).addEventListener('change', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
