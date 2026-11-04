// Emlak Komisyonu Hesaplama — tamamı tarayıcıda çalışır; girilen tutarlar sunucuya gitmez.
// Yalnızca yüzde ve KDV aritmetiğidir; mali/hukuki tavsiye değildir. Sözleşmede yazılı oran esastır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);

// parametreler.json yüklenemezse (çevrimdışı vb.) kullanılacak varsayılanlar.
let params = {
  guncelleme: '2026-11-04',
  kdv_yuzde: 20,
  satis: { alici_yuzde: 2, satici_yuzde: 2, alici_azami_yuzde: 2, satici_azami_yuzde: 2, toplam_azami_yuzde: 4 },
  kira: { kiraci_yuzde: 50, kiraya_veren_yuzde: 50, toplam_azami_yuzde: 100 },
  sinirlar: { bedel_max: 100000000000, satis_yuzde_max: 20, kira_yuzde_max: 100 },
  tablo: { baslangic: 1000000, bitis: 20000000, adim: 1000000 },
};

const nf = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const whole = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Türkçe ya da düz sayı metnini sayıya çevirir: "5.000.000", "1500000,50", "2,5". Geçersizse NaN. */
export function parseNum(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (!t || !/^[0-9.,]+$/.test(t)) return NaN;
  if (t.includes(',')) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
  return /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/**
 * İki tarafın komisyon payını hesaplar.
 * inclusive=false: oran KDV hariçtir, KDV üstüne eklenir. inclusive=true: oran KDV dahildir, KDV ayrıştırılır.
 * Her taraf ayrı fatura aldığı için yuvarlama taraf bazında yapılır.
 */
export function calcCommission({ base, buyerPct, sellerPct, vat, inclusive }) {
  const party = (pct) => {
    const given = round2(base * pct / 100);
    const net = inclusive ? round2(given / (1 + vat / 100)) : given;
    const gross = inclusive ? given : round2(given * (1 + vat / 100));
    return { net, gross, vat: round2(gross - net) };
  };
  const b = party(buyerPct);
  const s = party(sellerPct);
  return { buyer: b, seller: s, gross: round2(b.gross + s.gross), net: round2(b.net + s.net), vat: round2(b.vat + s.vat) };
}

const modeValue = () => document.querySelector('input[name="mode"]:checked').value;
const isInclusive = () => document.querySelector('input[name="vatmode"]:checked').value === 'in';

/** Girilen oranın KDV hariç karşılığı (azami sınırlarla karşılaştırmak için). */
const netPct = (pct, vat, inclusive) => (inclusive ? pct / (1 + vat / 100) : pct);

/* ---------- Mod (satış / kira) ---------- */
function setRateDefaults() {
  const kira = modeValue() === 'kira';
  $('buyer-rate').value = nf.format(kira ? params.kira.kiraci_yuzde : params.satis.alici_yuzde);
  $('seller-rate').value = nf.format(kira ? params.kira.kiraya_veren_yuzde : params.satis.satici_yuzde);
  $('vat').value = nf.format(params.kdv_yuzde);
}

function applyMode() {
  const kira = modeValue() === 'kira';
  $('price-label').textContent = kira ? 'Aylık kira bedeli (TL)' : 'Satış bedeli (TL)';
  $('price').placeholder = kira ? 'Örn. 20.000' : 'Örn. 5.000.000';
  $('price-hint').textContent = kira
    ? 'Sözleşmedeki bir aylık kira bedelini yazın.'
    : 'Sözleşmedeki ya da tapuda beyan edilecek satış bedelini yazın.';
  $('buyer-label').textContent = kira ? 'Kiracı payı (aylık kiranın yüzdesi)' : 'Alıcıdan alınacak oran (%)';
  $('seller-label').textContent = kira ? 'Kiraya veren payı (aylık kiranın yüzdesi)' : 'Satıcıdan alınacak oran (%)';
  $('rate-hint').textContent = kira
    ? 'Yönetmelikteki azami bedel bir aylık kiradır: iki payın toplamı en fazla 100 olmalıdır.'
    : 'Yönetmelikteki azami oran: alıcıdan %2, satıcıdan %2 (KDV hariç). Sözleşmenizdeki oranı yazın.';
  $('t-buyer').textContent = kira ? 'Kiracı payı (KDV dahil)' : 'Alıcı payı (KDV dahil)';
  $('t-seller').textContent = kira ? 'Kiraya veren payı (KDV dahil)' : 'Satıcı payı (KDV dahil)';
}

function onModeChange() {
  applyMode();
  setRateDefaults();
  $('price').value = '';
  hideResult();
  showError($('error'), '');
  renderTable();
}

/* ---------- Hızlı tablo ---------- */
function renderTable() {
  const p = params.satis;
  const lim = params.sinirlar;
  let buyerPct = p.alici_yuzde, sellerPct = p.satici_yuzde, vat = params.kdv_yuzde;
  // Satış modunda tablo, formdaki geçerli oranları izler; kirada varsayılan satış oranları kullanılır.
  if (modeValue() === 'satis') {
    const b = parseNum($('buyer-rate').value), s = parseNum($('seller-rate').value);
    if (b >= 0 && b <= lim.satis_yuzde_max) buyerPct = b;
    if (s >= 0 && s <= lim.satis_yuzde_max) sellerPct = s;
  }
  const v = parseNum($('vat').value);
  if (v >= 0 && v <= 100) vat = v;
  const inclusive = isInclusive();
  const t = params.tablo;
  const frag = document.createDocumentFragment();
  for (let price = t.baslangic; price <= t.bitis; price += t.adim) {
    const r = calcCommission({ base: price, buyerPct, sellerPct, vat, inclusive });
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = whole.format(price);
    tr.appendChild(th);
    for (const val of [r.buyer.gross, r.seller.gross, r.gross]) {
      const td = document.createElement('td');
      td.textContent = whole.format(val);
      tr.appendChild(td);
    }
    frag.appendChild(tr);
  }
  $('quick-body').replaceChildren(frag);
  $('table-caption').textContent = `Alıcı %${nf.format(buyerPct)}, satıcı %${nf.format(sellerPct)}, KDV %${nf.format(vat)} (${inclusive ? 'oran KDV dahil' : 'KDV üstüne eklenir'}) varsayımıyla; tutarlar KDV dahil, yuvarlanmıştır.`;
}

/* ---------- Hesap ---------- */
let lastText = '';

/** Alanı doğrular: 0..max arası sayı. */
function num(id, label, max, hint) {
  const v = parseNum($(id).value);
  if (!(v >= 0) || v > max) throw new Error(`${label} geçersiz. ${hint}`);
  return v;
}

function calculate() {
  const kira = modeValue() === 'kira';
  const lim = params.sinirlar;
  const base = parseNum($('price').value);
  if (!(base > 0)) {
    throw new Error(kira
      ? 'Aylık kira bedeli eksik ya da geçersiz. Örneğin 20.000 yazın; yalnızca rakam, nokta ve virgül kullanın.'
      : 'Satış bedeli eksik ya da geçersiz. Örneğin 5.000.000 yazın; yalnızca rakam, nokta ve virgül kullanın.');
  }
  if (base > lim.bedel_max) throw new Error('Tutar çok büyük. 100 milyar TL altında bir değer girin.');
  const max = kira ? lim.kira_yuzde_max : lim.satis_yuzde_max;
  const buyerPct = num('buyer-rate', kira ? 'Kiracı payı' : 'Alıcı oranı', max, `0 ile ${max} arasında, yüzde olarak girin (örneğin ${kira ? 50 : 2}).`);
  const sellerPct = num('seller-rate', kira ? 'Kiraya veren payı' : 'Satıcı oranı', max, `0 ile ${max} arasında, yüzde olarak girin (örneğin ${kira ? 50 : 2}).`);
  const vat = num('vat', 'KDV oranı', 100, 'Yüzde olarak girin (örneğin 20).');
  const inclusive = isInclusive();

  const r = calcCommission({ base, buyerPct, sellerPct, vat, inclusive });
  $('r-buyer').textContent = fmt(r.buyer.gross);
  $('r-seller').textContent = fmt(r.seller.gross);
  $('r-total').textContent = fmt(r.gross);
  $('r-vat').textContent = fmt(r.vat);
  $('r-net').textContent = fmt(r.net);
  $('r-eff').textContent = `%${nf.format(round2(r.net / base * 100))} / %${nf.format(round2(r.gross / base * 100))}`;
  $('t-eff').textContent = kira ? 'Aylık kiraya oranı (KDV hariç / dahil)' : 'Satış bedeline oranı (KDV hariç / dahil)';

  // Azami sınır uyarıları engellemez; sözleşmedeki oran esastır.
  const warns = [];
  const nb = netPct(buyerPct, vat, inclusive), ns = netPct(sellerPct, vat, inclusive);
  const eps = 1e-6;
  if (kira) {
    const total = nb + ns;
    if (total > params.kira.toplam_azami_yuzde + eps) {
      warns.push(`Kiracı ve kiraya veren paylarının toplamı (KDV hariç) aylık kiranın yüzde ${nf.format(round2(total))} düzeyinde; yönetmelikteki azami bir aylık kira bedelidir (yüzde ${params.kira.toplam_azami_yuzde}).`);
    }
  } else {
    const s = params.satis;
    let single = false;
    if (nb > s.alici_azami_yuzde + eps) { warns.push(`Alıcıdan istenen oran (KDV hariç %${nf.format(round2(nb))}) yönetmelikteki azami %${s.alici_azami_yuzde} sınırının üzerinde.`); single = true; }
    if (ns > s.satici_azami_yuzde + eps) { warns.push(`Satıcıdan istenen oran (KDV hariç %${nf.format(round2(ns))}) yönetmelikteki azami %${s.satici_azami_yuzde} sınırının üzerinde.`); single = true; }
    if (!single && nb + ns > s.toplam_azami_yuzde + eps) warns.push(`Toplam oran (KDV hariç %${nf.format(round2(nb + ns))}) yönetmelikteki azami %${s.toplam_azami_yuzde} sınırının üzerinde.`);
  }
  const warn = $('warning');
  if (warns.length) {
    warn.textContent = `${warns.join(' ')} Sözleşmede yazılı oran esastır; fazla bedel talep edildiğini düşünüyorsanız ilgili ticaret il müdürlüğüne danışabilirsiniz.`;
    warn.hidden = false;
  } else {
    warn.textContent = '';
    warn.hidden = true;
  }

  $('r-note').textContent = 'Hizmet bedeli genellikle işlem tamamlanınca (satışta tapu devri, kirada sözleşme imzası) ödenir. Sözleşmede yazılı oran esastır; yönetmelik değişebilir (2026 itibarıyla gösterilen sınırlar). Bilgilendirme amaçlıdır, mali ve hukuki tavsiye değildir.';
  lastText = `Emlak komisyonu (${kira ? 'aylık kira' : 'satış bedeli'} ${fmt(base)}, KDV %${nf.format(vat)}): ${kira ? 'kiracı' : 'alıcı'} ${fmt(r.buyer.gross)}, ${kira ? 'kiraya veren' : 'satıcı'} ${fmt(r.seller.gross)}, toplam ${fmt(r.gross)} (KDV tutarı ${fmt(r.vat)}).`;
  $('result').hidden = false;
  $('result').classList.add('is-active');
}

function hideResult() {
  $('result').hidden = true;
  $('result').classList.remove('is-active');
  $('warning').hidden = true;
  $('warning').textContent = '';
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* çevrimdışı önbellek yoksa yerleşik değerlerle devam */ }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(params.guncelleme || '');
  $('rates-updated').textContent = m ? `${m[3]}.${m[2]}.${m[1]}` : String(params.guncelleme);
  setRateDefaults();
  renderTable();
}

$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  showError($('error'), '');
  try { calculate(); } catch (err) {
    hideResult();
    showError($('error'), err.message);
  }
});
document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', onModeChange));
document.querySelectorAll('input[name="vatmode"]').forEach((el) => el.addEventListener('change', renderTable));
for (const id of ['buyer-rate', 'seller-rate', 'vat']) $(id).addEventListener('input', renderTable);

$('clear').addEventListener('click', () => {
  $('price').value = '';
  setRateDefaults();
  showError($('error'), '');
  hideResult();
  $('copy-status').textContent = '';
  renderTable();
  $('price').focus();
});
$('copy').addEventListener('click', async () => {
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(lastText); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

// Parametreler yüklenmeden de alanlar dolu olsun; sonra dosyadan güncellenir.
applyMode();
setRateDefaults();
renderTable();
loadParams();
