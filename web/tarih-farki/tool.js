// İki Tarih Arası Gün Hesaplama — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Hesap "takvim gün numarası" üzerinden yapılır (saat/saat dilimi kullanılmaz), UTC kayması olmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('tr-TR');

/* ---------- Takvim yardımcıları ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
/** Haftanın günü: 0 = Pazar … 6 = Cumartesi (1970-01-01 Perşembe). */
const dow = (n) => (((n + 4) % 7) + 7) % 7;
const isoFromNumber = (n) => new Date(n * 86400000).toISOString().slice(0, 10);

export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}
const dateTR = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** a <= b için yıl/ay/gün; ay sonlarında yıldönümü ayın son gününe sabitlenir. */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => {
    const total = a.m - 1 + n;
    const y = a.y + Math.floor(total / 12), m = ((total % 12) + 12) % 12 + 1;
    return { y, m, d: Math.min(a.d, daysInMonth(y, m)) };
  };
  let an = anniv(months);
  if (dayNumber(an.y, an.m, an.d) > dayNumber(b.y, b.m, b.d)) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, days: dayNumber(b.y, b.m, b.d) - dayNumber(an.y, an.m, an.d) };
}

/**
 * [from, to) aralığındaki (inclusive ise to dahil) günleri sayar.
 * holidays: "YYYY-MM-DD" kümesi; yalnızca hafta içine denk gelenler düşülür.
 */
export function countDays(fromN, toN, inclusive, holidays) {
  const end = inclusive ? toN : toN - 1;
  let weekdays = 0, weekend = 0, holidayDeducted = 0;
  for (let n = fromN; n <= end; n++) {
    const w = dow(n);
    if (w === 0 || w === 6) { weekend++; continue; }
    if (holidays && holidays.has(isoFromNumber(n))) { holidayDeducted++; continue; }
    weekdays++;
  }
  return { businessDays: weekdays, weekend, holidayDeducted };
}

/** Başlangıç/bitişi hesaplar; hatada Türkçe, çözüm öneren Error fırlatır. */
export function computeDiff({ d1, d2, mode, inclusive, businessDays, useHolidays, holidays, holidayYear }) {
  let a, b;
  if (mode === 'kalan') {
    a = todayLocal();
    b = parseISO(d2);
    if (!b) throw new Error('Hedef tarih eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 31.12.2026).');
  } else {
    a = parseISO(d1); b = parseISO(d2);
    if (!a) throw new Error('Başlangıç tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 01.01.2026); 31 Nisan gibi var olmayan günler kabul edilmez.');
    if (!b) throw new Error('Bitiş tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 31.12.2026).');
  }
  for (const t of [a, b]) {
    if (t.y < 1900 || t.y > 2100) throw new Error('Tarihler 1900 ile 2100 yılları arasında olmalıdır. Yılı kontrol edip tekrar seçin.');
  }
  let an = dayNumber(a.y, a.m, a.d), bn = dayNumber(b.y, b.m, b.d);
  let swapped = false;
  if (an > bn) { [a, b] = [b, a]; [an, bn] = [bn, an]; swapped = true; }
  const days = bn - an + (inclusive ? 1 : 0);
  const ymd = diffYMD(a, b);
  const out = {
    a, b, swapped, mode, inclusive, days, ymd,
    weeks: Math.floor(days / 7), restDays: days % 7, hours: days * 24,
    past: mode === 'kalan' && swapped, today: mode === 'kalan' && an === bn,
    bd: null, holidayWarning: false,
  };
  if (businessDays) {
    const useH = useHolidays && holidays;
    const years = new Set();
    for (let y = a.y; y <= b.y; y++) years.add(y);
    out.holidayWarning = !!useH && (years.size > 1 || !years.has(holidayYear));
    out.bd = countDays(an, bn, inclusive, useH ? holidays : null);
  }
  return out;
}

/* ---------- Arayüz ---------- */
let params = { guncelleme: '2026-11-03', yil: 2026, resmi_tatiller: [] };
let holidaySet = new Set();

function modeValue() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const kalan = modeValue() === 'kalan';
  $('wrap-d1').hidden = kalan;
  $('d2-label').textContent = kalan ? 'Hedef tarih' : 'Bitiş tarihi';
  $('wrap-hol').hidden = !$('f-wd').checked;
}

function render(r) {
  const dayText = `${nf.format(r.days)} gün`;
  let main;
  if (r.mode === 'kalan') {
    main = r.today ? 'Hedef tarih bugün.' : r.past ? `Hedef tarihin üzerinden ${dayText} geçti.` : `Hedef tarihe ${dayText} kaldı.`;
  } else main = `${dayText} fark var.`;
  $('r-main').textContent = main;
  $('r-days').textContent = dayText;
  $('r-weeks').textContent = `${nf.format(r.weeks)} hafta${r.restDays ? ` ${r.restDays} gün` : ''}`;
  $('r-ymd').textContent = `${r.ymd.years} yıl, ${r.ymd.months} ay, ${r.ymd.days} gün`;
  $('r-hours').textContent = `${nf.format(r.hours)} saat`;
  const show = !!r.bd;
  for (const id of ['row-bd', 'row-we']) $(id).hidden = !show;
  $('row-hl').hidden = !(show && $('f-hol').checked);
  if (show) {
    $('r-bd').textContent = `${nf.format(r.bd.businessDays)} iş günü`;
    $('r-we').textContent = `${nf.format(r.bd.weekend)} gün`;
    $('r-hl').textContent = `${nf.format(r.bd.holidayDeducted)} gün`;
  }
  const notes = [`Aralık: ${dateTR(r.a)} – ${dateTR(r.b)}${r.mode === 'kalan' ? ' (başlangıç: bugün)' : ''}. ${r.inclusive ? 'Başlangıç ve bitiş günü dahil.' : 'Başlangıç günü sayılmaz, bitiş günü sayılır.'}`];
  if (r.swapped && r.mode !== 'kalan') notes.push('Başlangıç tarihi bitişten sonra olduğu için tarihler yer değiştirildi.');
  if (r.holidayWarning) notes.push(`Resmî tatil verisi yalnızca ${params.yil} yılı için vardır; aralığın diğer yıllarında yalnızca hafta sonları düşüldü.`);
  if (r.bd && $('f-hol').checked) notes.push('Arife yarım günleri ve köprü günleri düşülmez; dini bayram tarihlerini resmî kaynaktan doğrulayın.');
  $('r-note').textContent = notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeDiff({
      d1: $('d1').value, d2: $('d2').value, mode: modeValue(), inclusive: $('f-incl').checked,
      businessDays: $('f-wd').checked, useHolidays: $('f-hol').checked, holidays: holidaySet, holidayYear: params.yil,
    });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function summaryText(r) {
  const t = [`${$('r-main').textContent} (${r.ymd.years} yıl, ${r.ymd.months} ay, ${r.ymd.days} gün)`];
  if (r.bd) t.push(`İş günü: ${r.bd.businessDays}`);
  return t.join(' ');
}

async function loadParams() {
  try {
    const res = await fetch('parametreler.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('http');
    params = await res.json();
  } catch { /* çevrimdışı/önbellek sorunu: yerleşik boş liste ile devam */ }
  holidaySet = new Set((params.resmi_tatiller || []).map((h) => h.tarih));
  const d = parseISO(params.guncelleme);
  $('rates-updated').textContent = d ? dateTR(d) : params.guncelleme;
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
document.querySelectorAll('input[name="mode"]').forEach((el) => el.addEventListener('change', syncMode));
$('f-wd').addEventListener('change', syncMode);
$('swap').addEventListener('click', () => { const t = $('d1').value; $('d1').value = $('d2').value; $('d2').value = t; });
$('clear').addEventListener('click', () => {
  $('d1').value = ''; $('d2').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('d1').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Sonuç panoya kopyalandı.'; }
  catch { st.textContent = 'Kopyalanamadı; sonucu elle seçip kopyalayın.'; }
});

syncMode();
loadParams();
