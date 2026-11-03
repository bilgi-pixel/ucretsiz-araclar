// Tapu Harcı ve Masrafları Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Mali/hukuki tavsiye değildir; yalnızca çarpma işlemidir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04',
  harc: { alici_binde: 20, satici_binde: 20 },
  doner_sermaye: { tutar: 6681, yaklasik: true },
  komisyon: { alici_yuzde: 2, satici_yuzde: 2, kdv_yuzde: 20 },
  sinirlar: { bedel_max: 100000000000, binde_max: 100, yuzde_max: 20 },
};

const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "2.000.000", "1500000,50", "2,5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Harç, döner sermaye ve komisyon toplamlarını hesaplar. */
export function calcCosts(o) {
  const buyerFee = round2(o.price * o.buyerBinde / 1000);
  const sellerFee = round2(o.price * o.sellerBinde / 1000);
  const dsbBuyer = o.dsbWho === 'buyer' ? o.dsb : o.dsbWho === 'half' ? round2(o.dsb / 2) : 0;
  const dsbSeller = round2(o.dsb - dsbBuyer);
  const withVat = (pctRate) => round2(o.price * pctRate / 100 * (1 + o.vat / 100));
  const commBuyer = o.commOn ? withVat(o.commBuyerPct) : 0;
  const commSeller = o.commOn ? withVat(o.commSellerPct) : 0;
  const buyerTotal = round2(buyerFee + dsbBuyer + commBuyer);
  const sellerTotal = round2(sellerFee + dsbSeller + commSeller);
  return { buyerFee, sellerFee, commBuyer, commSeller, buyerTotal, sellerTotal, total: round2(buyerTotal + sellerTotal) };
}

const el = {
  error: $('error'), result: $('result'), commOn: $('comm-on'), commBox: $('comm-box'),
};
let lastText = '';

function setText(id, v) { $(id).textContent = v; }
const toStr = (n) => nf.format(n);

function applyDefaults() {
  $('buyer-rate').value = toStr(params.harc.alici_binde);
  $('seller-rate').value = toStr(params.harc.satici_binde);
  $('dsb').value = toStr(params.doner_sermaye.tutar);
  $('comm-buyer').value = toStr(params.komisyon.alici_yuzde);
  $('comm-seller').value = toStr(params.komisyon.satici_yuzde);
  $('comm-vat').value = toStr(params.komisyon.kdv_yuzde);
  $('dsb-hint').textContent = params.doner_sermaye.yaklasik
    ? 'Yaklaşık değerdir; tapu müdürlüğündeki güncel tutarı yazın.'
    : 'Güncel tutar tapu müdürlüğünde değişebilir.';
  $('params-line').textContent = `Parametreler ${params.guncelleme} tarihinde güncellendi. Kaynak: 492 sayılı Harçlar Kanunu (4 sayılı tarife). Dönemsel indirimleri ilgili duyurudan doğrulayın.`;
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı önbellek yoksa varsayılanlarla devam */ }
  applyDefaults();
}

/** Alanı doğrular: 0..max arası sayı. */
function num(id, label, max, hint) {
  const v = parseNum($(id).value);
  if (!(v >= 0) || v > max) throw new Error(`${label} geçersiz. ${hint}`);
  return v;
}

function calculate() {
  const lim = params.sinirlar;
  const price = parseNum($('price').value);
  if (!(price > 0)) throw new Error('Satış bedeli eksik ya da geçersiz. Örneğin 2.000.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  if (price > lim.bedel_max) throw new Error('Satış bedeli çok büyük. 100 milyar TL altında bir tutar girin.');
  const buyerBinde = num('buyer-rate', 'Alıcı harç oranı', lim.binde_max, `0 ile ${lim.binde_max} arasında, binde olarak girin (örneğin 20).`);
  const sellerBinde = num('seller-rate', 'Satıcı harç oranı', lim.binde_max, `0 ile ${lim.binde_max} arasında, binde olarak girin (örneğin 20).`);
  const dsb = num('dsb', 'Döner sermaye ücreti', 1e7, 'Tutarı TL olarak, 0 ile 10 milyon arasında girin.');
  const commOn = el.commOn.checked;
  let commBuyerPct = 0, commSellerPct = 0, vat = 0;
  if (commOn) {
    commBuyerPct = num('comm-buyer', 'Alıcı komisyon oranı', lim.yuzde_max, `0 ile ${lim.yuzde_max} arasında, yüzde olarak girin (örneğin 2).`);
    commSellerPct = num('comm-seller', 'Satıcı komisyon oranı', lim.yuzde_max, `0 ile ${lim.yuzde_max} arasında, yüzde olarak girin (örneğin 2).`);
    vat = num('comm-vat', 'Komisyon KDV oranı', 100, 'Yüzde olarak girin (örneğin 20).');
  }
  const dsbWho = $('dsb-who').value;
  const r = calcCosts({ price, buyerBinde, sellerBinde, dsb, dsbWho, commOn, commBuyerPct, commSellerPct, vat });

  setText('r-buyer-fee', fmt(r.buyerFee));
  setText('r-seller-fee', fmt(r.sellerFee));
  setText('r-dsb', fmt(dsb));
  $('row-cb').hidden = !commOn; $('row-cs').hidden = !commOn;
  setText('r-comm-buyer', fmt(r.commBuyer));
  setText('r-comm-seller', fmt(r.commSeller));
  setText('r-buyer-total', fmt(r.buyerTotal));
  setText('r-seller-total', fmt(r.sellerTotal));
  setText('r-total', fmt(r.total));
  setText('r-note', 'Harç beyan edilen bedel üzerinden hesaplanır; gerçek bedelden düşük beyan cezaya yol açar. Konut kredisi giderleri (tahsis ücreti, ekspertiz, ipotek, DASK) dahil değildir.');
  lastText = `Tapu masrafı (satış bedeli ${fmt(price)}): alıcı harcı ${fmt(r.buyerFee)}, satıcı harcı ${fmt(r.sellerFee)}, döner sermaye ${fmt(dsb)}; alıcı toplam ${fmt(r.buyerTotal)}, satıcı toplam ${fmt(r.sellerTotal)}, genel toplam ${fmt(r.total)}.`;
  el.result.hidden = false;
  el.result.classList.add('is-active');
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError(el.error, '');
  try { calculate(); } catch (err) {
    el.result.hidden = true; el.result.classList.remove('is-active');
    showError(el.error, err.message);
  }
});

el.commOn.addEventListener('change', () => { el.commBox.hidden = !el.commOn.checked; });

$('clear').addEventListener('click', () => {
  $('form').reset();
  applyDefaults();
  el.commBox.hidden = true;
  showError(el.error, '');
  el.result.hidden = true; el.result.classList.remove('is-active');
  setText('copy-status', '');
});

$('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(lastText);
    setText('copy-status', 'Sonuç panoya kopyalandı.');
  } catch {
    setText('copy-status', 'Kopyalanamadı; sonucu elle seçip kopyalayın.');
  }
});

// Parametreler yüklenmeden de alanlar dolu olsun; sonra dosyadan güncellenir.
applyDefaults();
loadParams();
