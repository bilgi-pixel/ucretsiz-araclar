// İhbar Tazminatı ve İhbar Süresi Hesaplama — tamamı tarayıcıda çalışır; bilgiler sunucuya gitmez.
// Tahmini hesaptır, hukuki tavsiye değildir. Yıllık değişen değerler parametreler.json'dadır.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const money = (n) => `${fmt.format(round2(n))} ₺`;

// parametreler.json yüklenemezse kullanılacak varsayılanlar.
const DEFAULT_PARAMS = {
  guncelleme: '2026-11-04',
  damga_vergisi_orani: 0.00759,
  dilimler_ucret: [
    { ust_sinir: 190000, oran: 15 },
    { ust_sinir: 400000, oran: 20 },
    { ust_sinir: 1500000, oran: 27 },
    { ust_sinir: 5300000, oran: 35 },
    { ust_sinir: null, oran: 40 },
  ],
};
let params = DEFAULT_PARAMS;

/* ---------- Sayı ayrıştırma (tr-TR girdileri) ---------- */
export function parseAmount(raw, label = 'Tutar') {
  let s = String(raw ?? '').trim().replace(/\s/g, '').replace(/₺|tl$/i, '');
  if (!s) return null;
  if (/[^0-9.,+-]/.test(s)) throw new Error(`${label} yalnızca rakam içermeli (örn. 30.000 ya da 30000,50). Harf ve sembolleri kaldırıp tekrar deneyin.`);
  if (s.startsWith('-')) throw new Error(`${label} negatif olamaz. Tutarı eksi işareti olmadan girin.`);
  s = s.replace(/^\+/, '');
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma >= 0 && lastDot >= 0) s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  else if (lastComma >= 0) s = (s.match(/,/g) || []).length > 1 ? s.replace(/,/g, '') : s.replace(',', '.');
  else if (lastDot >= 0) {
    const dots = (s.match(/\./g) || []).length;
    if (dots > 1) s = s.replace(/\./g, '');
    else if (/^\d{1,3}\.\d{3}$/.test(s)) s = s.replace('.', '');
  }
  const n = Number(s);
  if (!Number.isFinite(n)) throw new Error(`${label} okunamadı. Örnek biçim: 30.000,50`);
  return n;
}

/* ---------- Takvim yardımcıları (UTC gün numarası; yaz saati kaymasını önler) ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (d) => Math.round(Date.UTC(d.y, d.m - 1, d.d) / 86400000);

export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

/** a <= b için yıl/ay/gün farkı; ay sonu taşmasında yıldönümü ayın son gününe sabitlenir. */
export function tenure(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => {
    const total = a.m - 1 + n;
    const y = a.y + Math.floor(total / 12), m = ((total % 12) + 12) % 12 + 1;
    return { y, m, d: Math.min(a.d, daysInMonth(y, m)) };
  };
  let an = anniv(months);
  if (dayNumber(an) > dayNumber(b)) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, totalMonths: months, days: dayNumber(b) - dayNumber(an) };
}

/** 4857 md. 17: 6 aydan az 2, 6 ay-1,5 yıldan az 4, 1,5-3 yıl (3 dahil) 6, 3 yıldan fazla 8 hafta. */
export function noticeWeeks(totalMonths, extraDays = 0) {
  if (totalMonths < 6) return 2;
  if (totalMonths < 18) return 4;
  if (totalMonths > 36 || (totalMonths === 36 && extraDays > 0)) return 8;
  return 6;
}

/** Kümülatif matrah tabanından başlayarak tazminata uygulanan gelir vergisi (dilim dilim). */
export function incomeTax(base, amount, brackets = params.dilimler_ucret) {
  let tax = 0;
  let from = base;
  let left = amount;
  for (const b of brackets) {
    if (left <= 0) break;
    const top = b.ust_sinir === null ? Infinity : b.ust_sinir;
    if (from >= top) continue;
    const part = Math.min(left, top - from);
    tax += (part * b.oran) / 100;
    from += part;
    left -= part;
  }
  return round2(tax);
}

export function calc({ entry, exit, gross, extras = 0, base = 0, mode = 'isveren' }) {
  const t = tenure(entry, exit);
  const weeks = noticeWeeks(t.totalMonths, t.days);
  const days = weeks * 7;
  const dressed = gross + extras;
  const daily = round2(dressed / 30);
  const pay = mode === 'kullandirildi' ? 0 : round2((dressed / 30) * days);
  let tax = 0, stamp = 0, net = pay;
  if (mode === 'isveren') {
    tax = incomeTax(base, pay);
    stamp = round2(pay * params.damga_vergisi_orani);
    net = round2(pay - tax - stamp);
  }
  return { tenure: t, weeks, days, dressed, daily, pay, tax, stamp, net };
}

const MODE_TEXT = {
  isveren: 'İşveren ihbar süresini kullandırmadan feshettiği için bu tutar işçiye ödenir; gelir vergisi ve damga vergisi kesilir, SGK primi kesilmez.',
  isci: 'İşçi ihbar süresine uymadan ayrıldığı için işveren bu tutarı talep edebilir; işçiye ayrıca vergi kesintisi uygulanmaz. İşverenin mahsup şekli için bordro birimine danışın.',
  kullandirildi: 'İhbar süresine uyulduğunda tazminat doğmaz; bu süre boyunca iş ve ücret devam eder.',
};

let last = null;
const setResult = (on) => { $('result').hidden = !on; $('result').classList.toggle('is-active', on); };

function render() {
  showError($('error'), '');
  const entry = parseISO($('f-entry').value);
  const exit = parseISO($('f-exit').value);
  if (!entry || !exit) throw new Error('İşe giriş ve çıkış tarihlerini takvimden eksiksiz seçin. Gün, ay ve yıl alanlarının üçü de dolu olmalı.');
  if (dayNumber(exit) < dayNumber(entry)) throw new Error('Çıkış tarihi işe giriş tarihinden önce olamaz. İki tarihi kontrol edip yeniden seçin.');
  const gross = parseAmount($('f-gross').value, 'Brüt ücret');
  if (gross === null) throw new Error('Aylık brüt ücretinizi girin (örn. 30.000). Net maaşı değil, bordrodaki brüt tutarı yazın.');
  if (gross <= 0) throw new Error('Brüt ücret sıfırdan büyük olmalı. Tutarı kontrol edip tekrar girin.');
  const extras = parseAmount($('f-extras').value, 'Yan haklar') ?? 0;
  const base = parseAmount($('f-base').value, 'Kümülatif matrah') ?? 0;
  const mode = $('f-case').value;
  const r = calc({ entry, exit, gross, extras, base, mode });

  const tn = r.tenure;
  $('r-tenure').textContent = `${tn.years} yıl ${tn.months} ay ${tn.days} gün`;
  $('r-weeks').textContent = `${r.weeks} hafta (${r.days} gün)`;
  $('r-dressed').textContent = money(r.dressed);
  $('r-daily').textContent = money(r.daily);
  $('r-gross').textContent = money(r.pay);
  $('r-tax').textContent = `− ${money(r.tax)}`;
  $('r-stamp').textContent = `− ${money(r.stamp)}`;
  $('r-net').textContent = money(r.net);
  $('r-net-label').textContent = mode === 'isci' ? 'İşçinin ödeyeceği tutar' : 'İhbar tazminatı (net)';
  const withTax = mode === 'isveren';
  $('row-tax').hidden = !withTax;
  $('row-stamp').hidden = !withTax;
  $('row-net').hidden = mode === 'kullandirildi';
  $('r-leave').textContent = mode === 'isveren'
    ? 'Günde 2 saat (süre çalışılmadığı için kullanılmaz)'
    : `Günde en az 2 saat (süre boyunca toplam ${r.days / 7 * 6 * 2} saate kadar, haftada 6 gün varsayımıyla)`;
  $('r-note').textContent = `${MODE_TEXT[mode]} Sözleşmede daha uzun ihbar süresi varsa tutar artar. Bilgilendirme amaçlıdır, hukuki tavsiye değildir; kıdem tazminatı için Kıdem Tazminatı Hesaplama aracını da kullanın.`;
  setResult(true);
  last = { mode, ...r };
}

function summaryText(l) {
  const mode = { isveren: 'işveren ihbarsız feshi', isci: 'işçinin ihbarsız ayrılması', kullandirildi: 'ihbar süresine uyuldu' }[l.mode];
  return `İhbar hesabı (${mode}): kıdem ${l.tenure.years} yıl ${l.tenure.months} ay ${l.tenure.days} gün, ihbar süresi ${l.weeks} hafta (${l.days} gün), günlük giydirilmiş ücret ${money(l.daily)}, brüt tazminat ${money(l.pay)}, net ${money(l.net)}. Tahminidir, hukuki tavsiye değildir. araclar.bilisimajans.com/ihbar-tazminati-hesapla/`;
}

function safeRender() {
  try { render(); } catch (e) { setResult(false); last = null; showError($('error'), e.message); }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); safeRender(); });
$('clear').addEventListener('click', () => {
  ['f-entry', 'f-exit', 'f-gross', 'f-extras', 'f-base'].forEach((id) => { $(id).value = ''; });
  setResult(false); last = null; showError($('error'), ''); $('copy-status').textContent = '';
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

async function loadParams() {
  try {
    const res = await fetch(new URL('./parametreler.json', import.meta.url));
    if (res.ok) params = { ...DEFAULT_PARAMS, ...(await res.json()) };
  } catch { /* çevrimdışı ya da dosya yok: varsayılanlar */ }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(params.guncelleme || '');
  $('params-updated').textContent = m
    ? new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : params.guncelleme;
}
loadParams();
