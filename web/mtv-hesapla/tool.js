// MTV Hesaplama 2026 — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Tarife tutarları parametreler.json'dan okunur; mali tavsiye değildir, GİB'den teyit edin.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int0 = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// parametreler.json yüklenemezse kullanılacak asgari varsayılan.
let params = {
  yil: 2026,
  guncelleme: '2026-11-04',
  dogrulandi: false,
  taksit: { sayi: 2, donemler: ['Ocak', 'Temmuz'] },
  elektrikli: { oran: 0.25, yaklasik: true },
  yas_gruplari: [{ id: '1-3', ad: '1-3 yaş' }, { id: '4-6', ad: '4-6 yaş' }, { id: '7-11', ad: '7-11 yaş' }, { id: '12-15', ad: '12-15 yaş' }, { id: '16+', ad: '16 yaş ve üzeri' }],
  turler: [{
    id: 'otomobil', ad: 'Otomobil', girdi: 'hacim', etiket: 'Motor silindir hacmi (cm³)', deger_dilimi: true, elektrikli: true, yaklasik: true,
    dilimler: [{ id: '1300', ad: "1300 cm³'e kadar", min: 0, max: 1300, degerler: [{ id: 'd1', ad: '1. dilim', tutar: { '1-3': 5750, '4-6': 4010, '7-11': 2238, '12-15': 1689, '16+': 593 } }] }],
  }],
  sinirlar: { hacim_max: 9999, tutar_max: 10000000 },
};

/** Tam sayı metnini sayıya çevirir; geçersizse NaN. */
export function parseCount(s, maxDigits = 4) {
  const t = String(s ?? '').trim();
  return new RegExp(`^\\d{1,${maxDigits}}$`).test(t) ? Number(t) : NaN;
}

/** "12.345,67", "12345,5" ya da "12345.50" biçimindeki tutarı sayıya çevirir; geçersizse NaN. */
export function parseMoney(s) {
  let t = String(s ?? '').trim().replace(/\s/g, '');
  if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(t)) t = t.replace(/\./g, '').replace(',', '.');
  else if (/^\d+(,\d{1,2})?$/.test(t)) t = t.replace(',', '.');
  else if (!/^\d+(\.\d{1,2})?$/.test(t)) return NaN;
  return Number(t);
}

/** Motor hacmine uyan dilimi bulur (min ve max dahil; max null ise sınırsız). */
export function findBand(tur, cc) {
  return tur.dilimler.find((d) => cc >= d.min && (d.max == null || cc <= d.max)) || null;
}

/** Bir dilimin (otomobilde seçili değer diliminin) yaş tablosunu verir. */
export function bandAmounts(band, degerId) {
  if (band.degerler) return (band.degerler.find((d) => d.id === degerId) || band.degerler[0]).tutar;
  return band.tutar;
}

/** Elektrikli araçta motor gücüne (kW) uyan tarife dilimini bulur; bulunamazsa null. */
export function findKwBand(tur, kw) {
  let prev = 0;
  for (const r of tur.elektrikli_kw) {
    if (kw > (r.min ?? prev) && (r.max == null || kw <= r.max)) return tur.dilimler.find((d) => d.id === r.dilim) || null;
    prev = r.max ?? prev;
  }
  return null;
}

/** Yıllık MTV ve iki taksit. */
export function splitInstallments(total) {
  const first = round2(total / 2);
  return { first, second: round2(total - first) };
}

const el = { error: $('error'), result: $('result'), tur: $('tur'), sinif: $('sinif'), yas: $('yas'), deger: $('deger') };
const useKw = () => !!(currentTur().elektrikli_kw && $('elektrikli').checked);
let lastText = '';

const currentTur = () => params.turler.find((t) => t.id === el.tur.value) || params.turler[0];

function setHidden(id, hide) { $(id).hidden = hide; }

/** Tür değişince ikinci girdiyi (cm³ ya da sınıf) ve otomobile özgü alanları günceller. */
function fillFields() {
  const t = currentTur();
  const byHacim = t.girdi === 'hacim';
  const kw = useKw();
  setHidden('hacim-field', !byHacim || kw);
  setHidden('kw-field', !kw);
  setHidden('sinif-field', byHacim);
  $('hacim-label').textContent = t.etiket;
  $('sinif-label').textContent = t.etiket;
  if (!byHacim) {
    el.sinif.innerHTML = '';
    for (const d of t.dilimler) el.sinif.append(new Option(d.ad, d.id));
  }
  setHidden('deger-field', !t.deger_dilimi);
  setHidden('elek-field', !t.elektrikli);
  if (!t.elektrikli) $('elektrikli').checked = false;
  $('tur-note').textContent = [t.tarife, t.not].filter(Boolean).join(' – ');
  buildTable();
  refreshDeger();
}

/** Girilen hacme (ya da kW'a) göre otomobil değer dilimi seçeneklerini yeniler. */
function refreshDeger() {
  const t = currentTur();
  if (!t.deger_dilimi) return;
  const band = (useKw() ? findKwBand(t, parseCount($('kw').value, 4)) : findBand(t, parseCount($('hacim').value, 4))) || t.dilimler[0];
  const keep = el.deger.value;
  el.deger.innerHTML = '';
  for (const d of band.degerler) el.deger.append(new Option(d.ad, d.id));
  if ([...el.deger.options].some((o) => o.value === keep)) el.deger.value = keep;
}

/** Seçili türün tarife tablosunu yazar. */
function buildTable() {
  const t = currentTur();
  $('table-title').textContent = `${t.ad}: yıllık tarife tutarları (TL)${t.yaklasik ? ', yaklaşık' : ''}`;
  const head = $('table-head');
  head.innerHTML = '';
  const tr = document.createElement('tr');
  const th0 = document.createElement('th'); th0.scope = 'col'; th0.textContent = t.girdi === 'hacim' ? 'Motor hacmi' : t.etiket; tr.append(th0);
  for (const y of params.yas_gruplari) { const th = document.createElement('th'); th.scope = 'col'; th.className = 'num'; th.textContent = y.ad; tr.append(th); }
  head.append(tr);
  const body = $('table-body');
  body.innerHTML = '';
  for (const d of t.dilimler) {
    for (const v of d.degerler || [d]) {
      const r = document.createElement('tr');
      const c0 = document.createElement('th'); c0.scope = 'row'; c0.textContent = d.degerler ? `${d.ad} – taşıt değeri ${v.ad}` : d.ad; r.append(c0);
      for (const y of params.yas_gruplari) { const td = document.createElement('td'); td.className = 'num'; td.textContent = int0.format(v.tutar[y.id]); r.append(td); }
      body.append(r);
    }
  }
}

function fail(msg) {
  el.result.hidden = true; el.result.classList.remove('is-active');
  showError(el.error, msg);
}

function calculate(ev) {
  ev?.preventDefault();
  showError(el.error, '');
  const t = currentTur();
  const yas = params.yas_gruplari.find((y) => y.id === el.yas.value) || params.yas_gruplari[0];
  const tmax = params.sinirlar?.tutar_max ?? 10000000;

  // İsteğe bağlı: GİB'de görünen tutar
  const rawGib = $('gib').value.trim();
  let gib = null;
  if (rawGib !== '') {
    gib = parseMoney(rawGib);
    if (!Number.isFinite(gib) || gib <= 0 || gib > tmax) {
      fail('GİB tutarı geçersiz görünüyor. Yalnızca rakam yazın (örneğin 12500 ya da 12.500,50) ya da alanı boş bırakın.');
      return;
    }
  }

  let band = null; let base = null; let total; let elec = false; let dilim = null; let kwInfo = '';
  let approx = !!t.yaklasik;
  if (gib !== null) {
    total = round2(gib); approx = false;
  } else {
    elec = t.elektrikli && $('elektrikli').checked;
    if (elec && t.elektrikli_kw) {
      const kmax = params.sinirlar?.kw_max ?? 9999;
      const kw = parseCount($('kw').value, 4);
      if (!Number.isInteger(kw) || kw < 1 || kw > kmax) {
        fail(`Motor gücünü kW olarak 1 ile ${kmax} arasında bir tam sayı yazın (örneğin 100). Güç, ruhsatta ya da araç belgelerinde kW olarak yazar.`);
        return;
      }
      band = findKwBand(t, kw);
      if (!band) {
        fail(`${kw} kW için tarifede tutar bulunamadı. ${t.not || ''} Vergi dairenizden teyit edin.`.trim());
        return;
      }
      kwInfo = `Motor gücü ${kw} kW → "${band.ad}" satırı.`;
    } else if (t.girdi === 'hacim') {
      const max = params.sinirlar?.hacim_max ?? 9999;
      const cc = parseCount($('hacim').value, 4);
      if (!Number.isInteger(cc) || cc < 1 || cc > max) {
        fail(`Motor hacmini cm³ olarak 1 ile ${max} arasında bir tam sayı yazın (örneğin 1598). Hacim ruhsatın "Silindir hacmi" satırında yazar.`);
        return;
      }
      band = findBand(t, cc);
      if (!band) {
        fail(`${cc} cm³ için tarifede tutar bulunamadı. ${t.not || ''} Vergi dairenizden ya da GİB İnteraktif Vergi Dairesi'nden teyit edin.`.trim());
        return;
      }
    } else {
      band = t.dilimler.find((d) => d.id === el.sinif.value) || t.dilimler[0];
    }
    if (t.deger_dilimi) dilim = band.degerler.find((d) => d.id === el.deger.value) || band.degerler[0];
    base = bandAmounts(band, dilim?.id)[yas.id];
    total = round2(base * (elec ? params.elektrikli.oran : 1));
    if (elec && params.elektrikli.yaklasik) approx = true;
  }
  const ins = splitInstallments(total);
  const donemler = params.taksit?.donemler || ['Ocak', 'Temmuz'];
  $('r-name').textContent = gib !== null ? `${t.ad} (GİB tutarı)` : `${t.ad} – ${band.ad}${dilim ? ` – ${dilim.ad}` : ''} – ${yas.ad}`;
  $('r-base').textContent = base === null ? '-' : fmt(base);
  $('r-total').textContent = fmt(total);
  $('t1-label').textContent = `1. taksit (${donemler[0]})`;
  $('t2-label').textContent = `2. taksit (${donemler[1]})`;
  $('r-t1').textContent = fmt(ins.first);
  $('r-t2').textContent = fmt(ins.second);
  const notes = [];
  if (gib !== null) notes.push('Tutar, sizin girdiğiniz GİB değeridir; yalnızca taksitlere bölünmüştür.');
  if (dilim) notes.push(`Taşıt değeri dilimi: ${dilim.ad}. Dilim, aracın ilk kayıt ve tescil tarihindeki değerine göre belirlenir.`);
  if (elec) notes.push(`Elektrikli araç: tarife tutarının %${Math.round(params.elektrikli.oran * 100)}'i uygulandı. ${kwInfo}`.trim());
  if (approx) notes.push("Bu tutar yaklaşıktır; GİB İnteraktif Vergi Dairesi'nden ya da vergi dairenizden teyit edin.");
  $('r-note').textContent = notes.join(' ');
  el.result.hidden = false; el.result.classList.add('is-active');
  lastText = `${params.yil} MTV (${$('r-name').textContent}): yıllık ${fmt(total)}; ${donemler[0]} taksiti ${fmt(ins.first)}, ${donemler[1]} taksiti ${fmt(ins.second)}${approx ? ' (yaklaşık; GİB İnteraktif Vergi Dairesi\'nden teyit edin)' : ''}`;
}

function clearAll() {
  showError(el.error, '');
  $('hacim').value = ''; $('kw').value = ''; $('gib').value = ''; $('elektrikli').checked = false;
  el.result.hidden = true; el.result.classList.remove('is-active'); lastText = '';
  $('hacim').focus();
}

async function copyResult() {
  if (!lastText) return;
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar kullanılır */ }
  for (const t of params.turler) el.tur.append(new Option(t.ad, t.id));
  for (const y of params.yas_gruplari) el.yas.append(new Option(y.ad, y.id));
  $('params-info').textContent = params.dogrulandi === false
    ? `Parametre dosyası ${params.guncelleme} tarihlidir; tarife tutarları teyit bekleyen yaklaşık değerlerdir. Kesin tutarı GİB İnteraktif Vergi Dairesi'nden doğrulayın.`
    : `Parametreler ${params.guncelleme} tarihinde güncellendi. Kaynak: ${params.kaynak || 'MTV tarifesi'}`;
  $('yas-note').textContent = params.yas_notu || '';
  $('deger-note').textContent = params.deger_notu || '';
  fillFields();
  $('elektrikli').addEventListener('change', () => { fillFields(); el.result.hidden = true; el.result.classList.remove('is-active'); });
  $('hacim').addEventListener('input', refreshDeger);
  $('kw').addEventListener('input', refreshDeger);
  el.tur.addEventListener('change', () => { fillFields(); el.result.hidden = true; el.result.classList.remove('is-active'); showError(el.error, ''); });
  $('form').addEventListener('submit', calculate);
  $('clear').addEventListener('click', clearAll);
  $('copy').addEventListener('click', copyResult);
}
init();
