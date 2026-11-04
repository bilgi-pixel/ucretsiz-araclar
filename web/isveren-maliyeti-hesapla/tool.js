// İşveren Maliyeti Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcYear, employerCost, discountPoints, round2 } from './calc.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => `${fmt.format(round2(n))} ₺`;
const short = (n) => fmt.format(n).replace(',00', '');
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// parametreler.json yüklenemezse kullanılacak yerleşik değerler (parametreler.json ile aynı tutulur).
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-05', yil: 2026, yaklasik: false, asgari_ucret_brut: 33030, prim_alt_sinir_aylik: 33030, prim_ust_sinir_aylik: 297270,
  sgk_tavan_katsayisi: 9, sgk_isci_orani: 14, issizlik_isci_orani: 1, sgk_isveren_orani: 21.75, issizlik_isveren_orani: 2,
  sgk_isveren_indirimleri: [
    { id: 'diger', ad: 'İmalat dışı özel sektör', etiket: 'İmalat dışı', puan: 2 },
    { id: 'imalat', ad: 'İmalat sektörü', etiket: 'İmalat', puan: 5, bitis: '2026-12-31' },
  ],
  asgari_ucret_destegi_gunluk: 42.33, asgari_ucret_destegi: 1269.9, damga_vergisi_orani: 0.759,
  kaynak: '5510 sayılı Kanun md. 81, 82, geçici md. 108 ve 112 (7566 ve 7573 sayılı Kanunlar); 4447 sayılı Kanun md. 49; SGK Genelgesi 2026/2 ve 2026/8.',
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
  $('sector-wrap').hidden = !$('f-discount').checked;
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
    const indirimPuan = $('f-discount').checked ? discountPoints(params, $('f-sector').value) : 0;
    const opts = { indirimPuan, destek: $('f-support').checked, destekTutari: supportAmount };
    const c = employerCost(brut, params, opts);
    const { rows, totals } = calcYear(brut, params, { asgariIstisna: true });
    const net = rows[0].net;
    const workerCut = brut - net;
    const employerLoad = c.toplam - brut;

    result.classList.add('is-active');
    $('r-brut').textContent = money(brut);
    $('r-sgk-label').textContent = `SGK işveren payı (%${fmt.format(c.sgkRate)}${c.indirimPuan ? `, ${c.indirimPuan} puan teşvikli` : ''})`;
    $('r-sgk').textContent = money(c.sgk);
    $('r-issizlik').textContent = money(c.issizlik);
    $('r-destek-wrap').hidden = !opts.destek;
    $('r-destek').textContent = `− ${money(c.destek)}`;
    $('r-toplam').textContent = money(c.toplam);
    $('r-net').textContent = money(net);
    $('r-oran').textContent = `${fmt.format(c.toplam / net)} ₺`;
    $('r-yillik').textContent = money(c.toplam * 12);
    // Prime esas kazanç sınırları: tavanı aşan kısım için prim alınmaz; alt sınırın altı tam ayda mümkün değildir.
    const floor = params.prim_alt_sinir_aylik || params.asgari_ucret_brut;
    $('r-cap-note').hidden = !(brut > c.capBase);
    $('r-cap-note').textContent = `Brüt ücret prime esas kazanç üst sınırını (${money(c.capBase)}) aşıyor; SGK ve işsizlik primleri bu tavan üzerinden hesaplandı.`;
    $('r-floor-note').hidden = !(brut < floor);
    $('r-floor-note').textContent = `Brüt ücret prime esas kazanç alt sınırının (${money(floor)}) altında. Tam ay (30 gün) çalışan için prime esas kazanç bu tutardan az bildirilemez; kısmi süreli çalışmada alt sınır gün sayısıyla orantılıdır. Hesap girdiğiniz tutar üzerinden yapıldı.`;

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
  $('p-asgari').textContent = money(params.prim_alt_sinir_aylik || params.asgari_ucret_brut);
  $('p-tavan').textContent = `${money(params.asgari_ucret_brut * params.sgk_tavan_katsayisi)} (${fmt.format(params.sgk_tavan_katsayisi).replace(',00', '')} kat)`;
  $('p-oran').textContent = `%${fmt.format(params.sgk_isveren_orani)}`;
  document.querySelectorAll('.p-destek-gun').forEach((el) => { el.textContent = money(params.asgari_ucret_destegi_gunluk); });
  // verified=false olan değer varsa görünür "yaklaşık" notu.
  const approx = Array.isArray(params.yaklasik) ? params.yaklasik.length > 0 : Boolean(params.yaklasik);
  $('p-approx').hidden = !approx;
  // Teşvik seçenekleri parametre dosyasından: "İmalat dışı: 2 puan (%19,75)" (360px'de kesilmesin diye kısa etiket).
  const sel = $('f-sector');
  const prev = sel.value;
  sel.textContent = '';
  for (const d of params.sgk_isveren_indirimleri || []) {
    const o = document.createElement('option');
    o.value = d.id;
    o.textContent = `${d.etiket || d.ad}: ${d.puan} puan (%${fmt.format(params.sgk_isveren_orani - d.puan)})`;
    sel.appendChild(o);
  }
  if ([...sel.options].some((o) => o.value === prev)) sel.value = prev;
  $('p-source').textContent = params.kaynak;
  $('f-amount').placeholder = `örn. ${short(params.asgari_ucret_brut)}`;
  $('f-support-amount').placeholder = `örn. ${fmt.format(params.asgari_ucret_destegi)}`;
  $('p-destek-ay').textContent = money(params.asgari_ucret_destegi);
  ['f-amount', 'f-support-amount'].forEach((id) => $(id).addEventListener('input', render));
  ['f-discount', 'f-sector', 'f-support'].forEach((id) => $(id).addEventListener('change', render));
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
