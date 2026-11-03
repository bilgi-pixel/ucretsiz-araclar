// Harç Hesaplama — tamamı tarayıcıda çalışır; girdiler sunucuya gitmez.
// Tutarlar parametreler.json'dan okunur; mali/hukuki tavsiye değildir.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmt = (n) => `${money.format(n)} TL`;
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

// parametreler.json yüklenemezse kullanılacak asgari varsayılan.
let params = {
  guncelleme: '2026-11-04',
  kategoriler: [{ id: 'pasaport', ad: 'Pasaport', etiket: 'Geçerlilik süresi', secenekler: [{ id: '1yil', ad: '1 yıllık', harc: 2500, degerli_kagit: 1500, yaklasik: true }] }],
  sinirlar: { kisi_max: 100 },
};

/** Kişi sayısı metnini tam sayıya çevirir; geçersizse NaN. */
export function parseQty(s) {
  const t = String(s ?? '').trim();
  return /^\d{1,4}$/.test(t) ? Number(t) : NaN;
}

/** Harç + değerli kağıt toplamı ve kişi sayısıyla çarpım. */
export function calcFee(opt, qty) {
  const person = round2(opt.harc + opt.degerli_kagit);
  return { person, total: round2(person * qty) };
}

const el = { error: $('error'), result: $('result'), cat: $('cat'), opt: $('opt') };
let lastText = '';

function currentCat() { return params.kategoriler.find((k) => k.id === el.cat.value) || params.kategoriler[0]; }
function currentOpt() { const c = currentCat(); return c.secenekler.find((o) => o.id === el.opt.value) || c.secenekler[0]; }

function fillOptions() {
  const c = currentCat();
  $('opt-label').textContent = c.etiket;
  el.opt.innerHTML = '';
  for (const o of c.secenekler) el.opt.append(new Option(o.ad, o.id));
  showApprox();
}

function showApprox() {
  const o = currentOpt();
  $('approx').textContent = o.yaklasik ? 'Bu tutar yaklaşıktır; e-Devlet ya da vergi dairesinden teyit edin.' : '';
}

function calculate(ev) {
  ev?.preventDefault();
  showError(el.error, '');
  const qty = parseQty($('qty').value);
  const max = params.sinirlar?.kisi_max ?? 100;
  if (!Number.isInteger(qty) || qty < 1 || qty > max) {
    el.result.hidden = true;
    showError(el.error, `Geçerli bir sayı girin: kişi sayısı 1 ile ${max} arasında bir tam sayı olmalı. Alanı temizleyip örneğin 1 yazın.`);
    return;
  }
  const c = currentCat(); const o = currentOpt();
  const r = calcFee(o, qty);
  $('r-name').textContent = `${c.ad} – ${o.ad}`;
  $('r-harc').textContent = fmt(o.harc);
  $('r-dk').textContent = fmt(o.degerli_kagit);
  $('r-person').textContent = fmt(r.person);
  $('r-total').textContent = fmt(r.total);
  const rate = params.yeniden_degerleme?.oran_yuzde;
  const notes = [];
  if (o.yaklasik) notes.push('Bu tutar yaklaşıktır; e-Devlet ya da vergi dairesinden teyit edin.');
  if (rate) notes.push(`Harç tutarları her yıl yeniden değerleme oranında (2026 için yaklaşık %${String(rate).replace('.', ',')}) artar.`);
  $('r-note').textContent = notes.join(' ');
  el.result.hidden = false;
  lastText = `${c.ad} – ${o.ad} x ${qty}: harç ${fmt(o.harc)} + değerli kağıt ${fmt(o.degerli_kagit)} = kişi başı ${fmt(r.person)}; genel toplam ${fmt(r.total)} (yaklaşık, teyit edin)`;
}

async function copyResult() {
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Sonuç panoya kopyalandı.'; }
  catch { $('copy-status').textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
}

async function init() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (res.ok) params = await res.json();
  } catch { /* varsayılanlar kullanılır */ }
  for (const k of params.kategoriler) el.cat.append(new Option(k.ad, k.id));
  fillOptions();
  $('params-info').textContent = `Parametreler ${params.guncelleme} tarihinde güncellendi. Kaynak: ${params.kaynak || 'Harçlar Kanunu tarifesi'}`;
  el.cat.addEventListener('change', () => { fillOptions(); el.result.hidden = true; });
  el.opt.addEventListener('change', () => { showApprox(); el.result.hidden = true; });
  $('form').addEventListener('submit', calculate);
  $('copy').addEventListener('click', copyResult);
}
init();
