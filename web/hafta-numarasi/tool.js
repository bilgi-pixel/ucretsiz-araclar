// Haftanın Kaçıncı Haftası — tamamı tarayıcıda çalışır; tarihler sunucuya gitmez.
// Tüm hesap "takvim gün numarası" (UTC gece yarısı / 86400000) üzerinden yapılır; saat dilimi kayması olmaz.
import { showError } from '../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
/** .ba-result bloğunu göster/gizle (ba.css is-active sınıfı gerektirir). */
const showResult = (on) => { $('result').hidden = !on; $('result').classList.toggle('is-active', on); };
const nf = new Intl.NumberFormat('tr-TR');

export const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const MONTHS_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
// Pazartesi başlangıçlı (ISO) sıra
const WEEKDAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const WD_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];

/* ---------- Takvim yardımcıları ---------- */
export const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
export const dayNum = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
export const fromDay = (n) => { const t = new Date(n * 86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };
/** Pazartesi = 0 … Pazar = 6 (1 Ocak 1970 Perşembe). */
export const weekdayIdx = (n) => (((n + 3) % 7) + 7) % 7;
const fmt = (n) => { const g = fromDay(n); return `${g.d} ${MONTHS[g.m - 1]} ${g.y}`; };
const fmtFull = (n) => `${fmt(n)} ${WEEKDAYS[weekdayIdx(n)]}`;

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null. */
export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (y < 1583 || m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** ISO 8601 hafta: haftanın Perşembesi hangi yıldaysa hafta o yıla aittir. */
export function isoWeek(n) {
  const thu = n - weekdayIdx(n) + 3;
  const y = fromDay(thu).y;
  return { year: y, week: Math.floor((thu - dayNum(y, 1, 1)) / 7) + 1 };
}
/** Yılın ISO hafta sayısı (52 ya da 53): 28 Aralık her zaman son haftadadır. */
export const weeksInYear = (y) => isoWeek(dayNum(y, 12, 28)).week;
/** ISO yılı, hafta numarası → o haftanın Pazartesi gün numarası (4 Ocak her zaman 1. haftadadır). */
export function weekMonday(y, w) {
  const jan4 = dayNum(y, 1, 4);
  return jan4 - weekdayIdx(jan4) + (w - 1) * 7;
}

/** Bir tarih için tüm bilgiler. */
export function describe(p) {
  const n = dayNum(p.y, p.m, p.d);
  const iw = isoWeek(n);
  const total = isLeap(p.y) ? 366 : 365;
  const doy = n - dayNum(p.y, 1, 1) + 1;
  const mon = n - weekdayIdx(n);
  return {
    n, doy, total, left: total - doy, percent: Math.round((doy / total) * 1000) / 10,
    isoYear: iw.year, week: iw.week, weeksInIsoYear: weeksInYear(iw.year),
    quarter: Math.ceil(p.m / 3), weekday: WEEKDAYS[weekdayIdx(n)], monday: mon, sunday: mon + 6,
    dateText: fmtFull(n),
  };
}
const QUARTER_TEXT = ['Ocak-Mart', 'Nisan-Haziran', 'Temmuz-Eylül', 'Ekim-Aralık'];

/* ---------- Seçilen tarih sonucu ---------- */
let lastText = '';

function renderToday() {
  const t = describe(todayLocal());
  $('today').textContent = `Bugün ${t.dateText}. ISO 8601'e göre ${t.isoYear} yılının ${t.week}. haftasındayız; yılın ${nf.format(t.doy)}. günü, ${nf.format(t.left)} gün kalmış.`;
}

function calc() {
  showError($('error'), '');
  showResult(false);
  const p = parseISO($('d').value);
  if (!p) { showError($('error'), 'Tarih geçerli görünmüyor. Gün, ay ve yılı eksiksiz seçin (1583 sonrası bir tarih); 30 Şubat gibi var olmayan tarihler kabul edilmez.'); return; }
  const r = describe(p);
  const set = (id, v) => { $(id).textContent = v; };
  set('r-big', `${r.isoYear} yılının ${r.week}. haftası`);
  set('r-week', `${r.week}. hafta (ISO ${r.isoYear}-W${String(r.week).padStart(2, '0')})`);
  set('r-weekday', r.weekday);
  set('r-doy', `${nf.format(r.doy)}. gün (yıl ${nf.format(r.total)} gün)`);
  set('r-left', `${nf.format(r.left)} gün`);
  set('r-pct', `%${String(r.percent).replace('.', ',')}`);
  set('r-quarter', `${r.quarter}. çeyrek (${QUARTER_TEXT[r.quarter - 1]})`);
  set('r-range', `${fmt(r.monday)} – ${fmt(r.sunday)}`);
  set('r-wcount', `${r.isoYear} yılında ${r.weeksInIsoYear} hafta var`);
  const note = r.isoYear !== p.y ? `Not: ${p.y} yılına ait bu tarih, ISO kuralına göre ${r.isoYear} yılının haftasında sayılır.` : '';
  set('r-note', note);
  $('r-note').hidden = !note;
  lastText = `${r.dateText}: ISO hafta ${r.isoYear}-W${String(r.week).padStart(2, '0')} (${r.week}. hafta), yılın ${r.doy}. günü, ${r.left} gün kaldı, ${r.quarter}. çeyrek. Hafta: ${fmt(r.monday)} – ${fmt(r.sunday)}.`;
  showResult(true);
}

/* ---------- Hafta numarasından tarih aralığı ---------- */
function findWeek() {
  const err = $('w-error');
  showError(err, '');
  $('w-result').hidden = true;
  const y = Number($('w-year').value), w = Number($('w-week').value);
  if (!Number.isInteger(y) || y < 1583 || y > 9998) { showError(err, 'Yıl geçersiz. 1583 ile 9998 arasında bir yıl yazın (örneğin 2026).'); return; }
  const max = weeksInYear(y);
  if (!Number.isInteger(w) || w < 1 || w > max) { showError(err, `${y} yılında ${max} hafta var. 1 ile ${max} arasında bir hafta numarası yazın.`); return; }
  const mon = weekMonday(y, w);
  $('w-out').textContent = `${y} yılı ${w}. hafta: ${fmt(mon)} Pazartesi – ${fmt(mon + 6)} Pazar`;
  const ul = $('w-days');
  ul.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const li = document.createElement('li');
    li.textContent = fmtFull(mon + i);
    ul.append(li);
  }
  $('w-result').hidden = false;
}

/* ---------- Yıl takvimi ---------- */
function renderCalendar() {
  const err = $('c-error');
  showError(err, '');
  const y = Number($('c-year').value);
  if (!Number.isInteger(y) || y < 1583 || y > 9998) { showError(err, 'Yıl geçersiz. 1583 ile 9998 arasında bir yıl yazın (örneğin 2026).'); $('c-wrap').hidden = true; return; }
  $('c-wrap').hidden = false;
  const total = weeksInYear(y);
  $('c-title').textContent = `${y} Yılı Hafta Takvimi (ISO 8601, ${total} hafta)`;
  const jan1 = dayNum(y, 1, 1), dec31 = dayNum(y, 12, 31);
  const start = jan1 - weekdayIdx(jan1);
  const tl = todayLocal(), today = dayNum(tl.y, tl.m, tl.d);
  const body = $('c-body');
  body.innerHTML = '';
  for (let mon = start; mon <= dec31; mon += 7) {
    const iw = isoWeek(mon);
    const tr = document.createElement('tr');
    if (today >= mon && today <= mon + 6) tr.className = 'wk-now';
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = iw.year === y ? String(iw.week) : `${iw.week} (${iw.year})`;
    tr.append(th);
    for (let i = 0; i < 7; i++) {
      const n = mon + i, g = fromDay(n);
      const td = document.createElement('td');
      td.textContent = g.d === 1 || i === 0 && n === mon && g.m !== fromDay(mon - 1).m ? `${g.d} ${MONTHS_SHORT[g.m - 1]}` : String(g.d);
      if (g.y !== y) td.className = 'wk-out';
      else if (n === today) td.className = 'wk-today';
      tr.append(td);
    }
    body.append(tr);
  }
}

/* ---------- Başlatma ---------- */
function ymd(p) { return `${p.y}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`; }

function init() {
  const t = todayLocal();
  $('d').value = ymd(t);
  $('w-year').value = String(t.y);
  $('c-year').value = String(t.y);
  const hd = document.createElement('tr');
  hd.innerHTML = '<th scope="col">Hafta</th>' + WD_SHORT.map((s) => `<th scope="col">${s}</th>`).join('');
  $('c-head').append(hd);
  renderToday();
  calc();
  renderCalendar();

  $('form').addEventListener('submit', (e) => { e.preventDefault(); calc(); });
  $('today-btn').addEventListener('click', () => { $('d').value = ymd(todayLocal()); calc(); });
  $('copy').addEventListener('click', async () => {
    const st = $('copy-status');
    try { await navigator.clipboard.writeText(lastText); st.textContent = 'Kopyalandı.'; }
    catch { st.textContent = 'Kopyalanamadı; metni elle seçip kopyalayın.'; }
  });
  $('w-form').addEventListener('submit', (e) => { e.preventDefault(); findWeek(); });
  $('c-form').addEventListener('submit', (e) => { e.preventDefault(); renderCalendar(); });
  $('c-print').addEventListener('click', () => {
    document.body.classList.add('print-cal');
    const done = () => { document.body.classList.remove('print-cal'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  });
  setInterval(renderToday, 60000);
}
init();
document.documentElement.dataset.ready = "1"; // testler için: betik hazır
