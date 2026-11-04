// Date Difference Calculator (EN) — runs entirely in the browser; dates never leave the device.
// Calculation uses calendar day numbers (no clock times, no time zones), so there is no UTC drift.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US');

/* ---------- Calendar helpers ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);
/** Day of week: 0 = Sunday … 6 = Saturday (1970-01-01 was a Thursday). */
const dow = (n) => (((n + 4) % 7) + 7) % 7;
const isoFromNumber = (n) => new Date(n * 86400000).toISOString().slice(0, 10);
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

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
const dateEN = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Year/month/day difference for a <= b; month-end anniversaries clamp to the last day of the month. */
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

/** n-th (1-based) given weekday (0 = Sunday) of a month; n = -1 means the last one. */
function nthWeekday(y, m, wd, n) {
  if (n > 0) {
    const first = dow(dayNumber(y, m, 1));
    return 1 + ((wd - first + 7) % 7) + (n - 1) * 7;
  }
  const last = daysInMonth(y, m);
  const lastDow = dow(dayNumber(y, m, last));
  return last - ((lastDow - wd + 7) % 7);
}

/** US federal holidays (observed dates) for a year as a Set of "YYYY-MM-DD" strings. */
export function usFederalHolidays(y) {
  const fixed = [[1, 1], [6, 19], [7, 4], [11, 11], [12, 25]];
  const out = new Set();
  for (const [m, d] of fixed) {
    const w = dow(dayNumber(y, m, d));
    // Saturday holidays are observed on Friday, Sunday holidays on Monday.
    const n = dayNumber(y, m, d) + (w === 6 ? -1 : w === 0 ? 1 : 0);
    out.add(isoFromNumber(n));
  }
  out.add(iso(y, 1, nthWeekday(y, 1, 1, 3)));   // Martin Luther King Jr. Day
  out.add(iso(y, 2, nthWeekday(y, 2, 1, 3)));   // Presidents' Day
  out.add(iso(y, 5, nthWeekday(y, 5, 1, -1)));  // Memorial Day
  out.add(iso(y, 9, nthWeekday(y, 9, 1, 1)));   // Labor Day
  out.add(iso(y, 10, nthWeekday(y, 10, 1, 2))); // Columbus / Indigenous Peoples' Day
  out.add(iso(y, 11, nthWeekday(y, 11, 4, 4))); // Thanksgiving
  return out;
}

/**
 * Counts days in [from, to) (to included when inclusive).
 * holidays: Set of "YYYY-MM-DD"; only those that fall on weekdays are deducted.
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

/** Computes the difference; throws an English, solution-oriented Error on bad input. */
export function computeDiff({ d1, d2, mode, inclusive, businessDays, useHolidays }) {
  let a, b;
  if (mode === 'until') {
    a = todayLocal();
    b = parseISO(d2);
    if (!b) throw new Error('The target date is missing or invalid. Pick the month, day and year in full (for example 12/31/2026).');
  } else {
    a = parseISO(d1); b = parseISO(d2);
    if (!a) throw new Error('The start date is missing or invalid. Pick the month, day and year in full (for example 01/01/2026); days that do not exist, such as April 31, are not accepted.');
    if (!b) throw new Error('The end date is missing or invalid. Pick the month, day and year in full (for example 12/31/2026).');
  }
  for (const t of [a, b]) {
    if (t.y < 1900 || t.y > 2100) throw new Error('Dates must fall between the years 1900 and 2100. Check the year and try again.');
  }
  let an = dayNumber(a.y, a.m, a.d), bn = dayNumber(b.y, b.m, b.d);
  let swapped = false;
  if (an > bn) { [a, b] = [b, a]; [an, bn] = [bn, an]; swapped = true; }
  const days = bn - an + (inclusive ? 1 : 0);
  const ymd = diffYMD(a, b);
  const out = {
    a, b, swapped, mode, inclusive, days, ymd,
    weeks: Math.floor(days / 7), restDays: days % 7, hours: days * 24,
    past: mode === 'until' && swapped, today: mode === 'until' && an === bn,
    bd: null,
  };
  if (businessDays) {
    let hol = null;
    if (useHolidays) {
      hol = new Set();
      // Observed dates can spill into the neighboring year (Jan 1 on a Saturday is observed Dec 31).
      for (let y = a.y - 1; y <= b.y + 1; y++) usFederalHolidays(y).forEach((h) => hol.add(h));
    }
    out.bd = countDays(an, bn, inclusive, hol);
  }
  return out;
}

/* ---------- UI ---------- */
function modeValue() { return document.querySelector('input[name="mode"]:checked').value; }

function syncMode() {
  const until = modeValue() === 'until';
  $('wrap-d1').hidden = until;
  $('d2-label').textContent = until ? 'Target date' : 'End date';
  $('wrap-hol').hidden = !$('f-wd').checked;
}

function render(r) {
  const dayText = `${nf.format(r.days)} day${r.days === 1 ? '' : 's'}`;
  let main;
  if (r.mode === 'until') {
    main = r.today ? 'The target date is today.' : r.past ? `The target date was ${dayText} ago.` : `${dayText} left until the target date.`;
  } else main = `The difference is ${dayText}.`;
  $('r-main').textContent = main;
  $('r-days').textContent = dayText;
  $('r-weeks').textContent = `${nf.format(r.weeks)} week${r.weeks === 1 ? '' : 's'}${r.restDays ? ` ${r.restDays} day${r.restDays === 1 ? '' : 's'}` : ''}`;
  const p = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  $('r-ymd').textContent = `${p(r.ymd.years, 'year')}, ${p(r.ymd.months, 'month')}, ${p(r.ymd.days, 'day')}`;
  $('r-hours').textContent = `${nf.format(r.hours)} hours`;
  const show = !!r.bd;
  for (const id of ['row-bd', 'row-we']) $(id).hidden = !show;
  $('row-hl').hidden = !(show && $('f-hol').checked);
  if (show) {
    $('r-bd').textContent = `${nf.format(r.bd.businessDays)} business day${r.bd.businessDays === 1 ? '' : 's'}`;
    $('r-we').textContent = `${nf.format(r.bd.weekend)} day${r.bd.weekend === 1 ? '' : 's'}`;
    $('r-hl').textContent = `${nf.format(r.bd.holidayDeducted)} day${r.bd.holidayDeducted === 1 ? '' : 's'}`;
  }
  const notes = [`Range: ${dateEN(r.a)} – ${dateEN(r.b)}${r.mode === 'until' ? ' (start: today)' : ''}. ${r.inclusive ? 'Both the start day and the end day are counted.' : 'The start day is not counted; the end day is.'}`];
  if (r.swapped && r.mode !== 'until') notes.push('The start date was after the end date, so the two dates were swapped.');
  if (r.bd && $('f-hol').checked) notes.push('US federal holidays are used, with weekend holidays observed on the nearest weekday. Company, state and bank-specific days off are not deducted.');
  $('r-note').textContent = notes.join(' ');
  $('result').hidden = false; $('result').classList.add('is-active');
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeDiff({
      d1: $('d1').value, d2: $('d2').value, mode: modeValue(), inclusive: $('f-incl').checked,
      businessDays: $('f-wd').checked, useHolidays: $('f-hol').checked,
    });
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

function summaryText(r) {
  const t = [`${$('r-main').textContent} (${$('r-ymd').textContent})`];
  if (r.bd) t.push(`Business days: ${r.bd.businessDays}`);
  return t.join(' ');
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
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy; select the result and copy it manually.'; }
});

syncMode();
