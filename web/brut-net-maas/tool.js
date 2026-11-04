// Brüt-Net Maaş Hesaplama — tamamı tarayıcıda çalışır; hiçbir veri sunucuya gitmez.
import { showError } from '../assets/js/ba.js';
import { calcYear, netToBrut, round2, primTavani, tesvikPuani } from './calc.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => `${fmt.format(round2(n))} ₺`;
// Oranlar Türkçe biçimde: 21.75 -> "21,75".
const pct = (n) => String(n).replace('.', ',');
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// parametreler.json yüklenemezse kullanılacak yerleşik değerler (parametreler.json ile aynı tutulur).
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-05', yil: 2026, asgari_ucret_brut: 33030, asgari_ucret_net: 28075.5, sgk_isci_orani: 14, issizlik_isci_orani: 1,
  sgk_isveren_orani: 21.75, sgk_isveren_tesvik_puanlari: { diger: 2, imalat: 5 }, issizlik_isveren_orani: 2, damga_vergisi_orani: 0.759,
  sgk_taban_tutari: 33030, sgk_tavan_katsayisi: 9, sgk_tavan_tutari: 297270, asgari_ucret_destegi_gunluk: 42.33,
  kaynak: '5510 sayılı Kanun md. 81, 82, geçici md. 108 ve 112; 4447 sayılı Kanun md. 49; SGK Genelgesi 2026/2 ve 2026/8; 193 sayılı Gelir Vergisi Kanunu md. 103; 488 sayılı Damga Vergisi Kanunu.',
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
  return { asgariIstisna: $('f-exempt').checked, tesvik: $('f-tesvik').value, destek: $('f-destek').checked };
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
    const { rows, totals, tavan, tavanAsildi, isveren } = calcYear(brut, params, opts);
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
    ['r-isv-sgk-wrap', 'r-isv-iss-wrap', 'r-employer-wrap'].forEach((id) => { $(id).hidden = !showEmployer; });
    $('r-destek-wrap').hidden = !(showEmployer && opts.destek);
    $('l-isv-sgk').textContent = `SGK işveren payı (%${pct(isveren.sgkOran)}${isveren.puan ? `, ${isveren.puan} puan teşvikli` : ''})`;
    $('l-isv-iss').textContent = `İşsizlik sigortası işveren payı (%${pct(params.issizlik_isveren_orani)})`;
    setRow('r-isv-sgk', money(isveren.sgk));
    setRow('r-isv-iss', money(isveren.issizlik));
    setRow('r-destek', `− ${money(isveren.destek)}`);
    setRow('r-employer', money(first.isverenMaliyet));
    $('th-employer').hidden = !showEmployer;
    const notes = [];
    if (mode === 'net') notes.push(`Ocak ayında ${money(amount)} net alabilmek için gereken brüt maaş: ${money(brut)}. Sonraki aylarda vergi dilimi yükseldikçe aynı brütten ele geçen net azalabilir; tabloya bakın.`);
    if (tavanAsildi) notes.push(`Brüt maaşınız SGK prim tavanını (${money(tavan)}) aştığı için SGK ve işsizlik primleri tavan üzerinden hesaplandı; tavanın üstündeki kısımdan prim kesilmez.`);
    else if (brut < params.sgk_taban_tutari) notes.push(`Brüt maaş, prime esas kazanç alt sınırı olan ${money(params.sgk_taban_tutari)} tutarının altında. Tam ay çalışan biri için prim bu tutardan az hesaplanamaz; araç tutarı kısmi süreli çalışma gibi hesaplar, bordronuzu esas alın.`);
    $('mode-note').textContent = notes.join(' ');
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
  $('p-tavan').textContent = `${money(primTavani(params))} (asgari ücretin ${pct(params.sgk_tavan_katsayisi)} katı)`;
  $('p-source').textContent = params.kaynak;
  // Teşvik seçeneklerinin etiketleri parametrelerdeki oranlardan üretilir.
  const rateText = (t) => `%${pct(round2(params.sgk_isveren_orani - tesvikPuani(params, t)))}`;
  $('o-tesvik-yok').textContent = `Teşvik yok (${rateText('yok')})`;
  $('o-tesvik-diger').textContent = `İmalat dışı: ${tesvikPuani(params, 'diger')} puan (${rateText('diger')})`;
  $('o-tesvik-imalat').textContent = `İmalat: ${tesvikPuani(params, 'imalat')} puan (${rateText('imalat')})`;
  const destekGunluk = params.asgari_ucret_destegi_gunluk || 0;
  $('l-destek').textContent = `Asgari ücret desteğini düş (günlük ${money(destekGunluk)}, 30 günde ${money(destekGunluk * 30)})`;
  $('f-amount').placeholder = `örn. ${fmt.format(params.asgari_ucret_brut).replace(',00', '')}`;
  document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', () => {
    $('amount-label').textContent = el.value === 'brut' && el.checked ? 'Aylık brüt maaş (₺)' : 'Aylık net maaş (₺, Ocak ayı)';
    render();
  }));
  $('f-employer').addEventListener('change', () => { $('f-employer-opts').hidden = !$('f-employer').checked; render(); });
  ['f-amount', 'f-exempt', 'f-destek'].forEach((id) => $(id).addEventListener('input', render));
  $('f-tesvik').addEventListener('change', render);
  $('f-form').addEventListener('submit', (e) => { e.preventDefault(); render(); });
  render();
}

init();
