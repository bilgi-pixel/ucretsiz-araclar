// Age Calculator (EN) — runs entirely in the browser; dates are never sent to a server.
// All math uses calendar day numbers (no clock time or time zone), so UTC shifts cannot cause off-by-one errors.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const nf = new Intl.NumberFormat('en-US');
const plural = (n, word) => `${nf.format(n)} ${word}${n === 1 ? '' : 's'}`;

/* ---------- Calendar helpers ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; // m: 1-12
/** Day number: UTC midnight / 86400000 — unaffected by time zones and daylight saving. */
const dayNumber = (y, m, d) => Math.round(Date.UTC(y, m - 1, d) / 86400000);

/** "YYYY-MM-DD" → {y,m,d}; null if invalid (including dates such as February 30). */
export function parseISO(s) {
  const mt = /^(\d{4,6})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}

/** Today's date on the device clock. */
export function todayLocal() {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

/** Years/months/days from a to b (a <= b). When the month is shorter, the anniversary is clamped to the last day of that month. */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => {
    const total = a.m - 1 + n;
    const y = a.y + Math.floor(total / 12), m = (total % 12 + 12) % 12 + 1;
    return { y, m, d: Math.min(a.d, daysInMonth(y, m)) };
  };
  let an = anniv(months);
  if (dayNumber(an.y, an.m, an.d) > dayNumber(b.y, b.m, b.d)) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, totalMonths: months, days: dayNumber(b.y, b.m, b.d) - dayNumber(an.y, an.m, an.d) };
}

/** Next birthday (today counts); February 29 is treated as February 28 in non-leap years. */
export function nextBirthday(birth, ref) {
  const at = (y) => ({ y, m: birth.m, d: Math.min(birth.d, daysInMonth(y, birth.m)) });
  let n = at(ref.y);
  if (dayNumber(n.y, n.m, n.d) < dayNumber(ref.y, ref.m, ref.d)) n = at(ref.y + 1);
  return { date: n, days: dayNumber(n.y, n.m, n.d) - dayNumber(ref.y, ref.m, ref.d) };
}

// Month -> [cut-over day, sign before the cut, sign after the cut]
const ZODIAC = {
  1: [20, 'Capricorn', 'Aquarius'], 2: [19, 'Aquarius', 'Pisces'], 3: [21, 'Pisces', 'Aries'], 4: [20, 'Aries', 'Taurus'],
  5: [21, 'Taurus', 'Gemini'], 6: [21, 'Gemini', 'Cancer'], 7: [23, 'Cancer', 'Leo'], 8: [23, 'Leo', 'Virgo'],
  9: [23, 'Virgo', 'Libra'], 10: [23, 'Libra', 'Scorpio'], 11: [22, 'Scorpio', 'Sagittarius'], 12: [22, 'Sagittarius', 'Capricorn'],
};
/** Sun sign (for fun only, traditional date ranges). */
export function zodiac(m, d) {
  const [cut, before, after] = ZODIAC[m];
  return d < cut ? before : after;
}

const weekdayName = (y, m, d) => new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
const dateEN = (t) => new Date(Date.UTC(t.y, t.m - 1, t.d)).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Computes everything; throws an Error with an English message that suggests a fix when the input is wrong. */
export function computeAge(birthStr, refStr) {
  const birth = parseISO(birthStr);
  if (!birth) throw new Error('Date of birth is missing or invalid. Select the day, month and year completely (e.g. 03/15/1990).');
  if (birth.y < 1900) throw new Error('Date of birth cannot be before the year 1900. Check the year and select the date again.');
  const ref = refStr ? parseISO(refStr) : todayLocal();
  if (!ref) throw new Error('The target date is invalid. Pick it from the calendar again, or clear the field to use today.');
  if (ref.y > 9999 || birth.y > 9999) throw new Error('The year must have four digits (e.g. 1990). Select the date again.');
  const bn = dayNumber(birth.y, birth.m, birth.d), rn = dayNumber(ref.y, ref.m, ref.d);
  if (bn > rn) throw new Error('The date of birth cannot be after the target date. Correct the date of birth or the target date.');
  const age = diffYMD(birth, ref);
  const totalDays = rn - bn;
  const next = nextBirthday(birth, ref);
  return {
    birth, ref, age, totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    next,
    weekday: weekdayName(birth.y, birth.m, birth.d),
    zodiac: zodiac(birth.m, birth.d),
    usedToday: !refStr,
  };
}

/* ---------- UI ---------- */
function render(r) {
  $('r-age').textContent = `${plural(r.age.years, 'year')}, ${plural(r.age.months, 'month')}, ${plural(r.age.days, 'day')}`;
  $('r-years').textContent = plural(r.age.years, 'year');
  $('r-months').textContent = plural(r.age.totalMonths, 'month');
  $('r-weeks').textContent = plural(r.totalWeeks, 'week');
  $('r-days').textContent = plural(r.totalDays, 'day');
  $('r-hours').textContent = plural(r.totalHours, 'hour');
  $('r-next').textContent = r.next.days === 0
    ? 'The birthday is today!'
    : `${plural(r.next.days, 'day')} to go (${dateEN(r.next.date)}, ${weekdayName(r.next.date.y, r.next.date.m, r.next.date.d)})`;
  $('r-weekday').textContent = r.weekday;
  $('r-zodiac').textContent = r.zodiac;
  const leapNote = r.birth.m === 2 && r.birth.d === 29 ? ' Because the birth date is February 29, the anniversary is counted as February 28 in non-leap years.' : '';
  $('r-note').textContent = `Calculated for: ${dateEN(r.ref)}${r.usedToday ? ' (today)' : ''}. The sun sign is for entertainment only.${leapNote}`;
  $('result').hidden = false; $('result').classList.add('is-active');
}

function summaryText(r) {
  return `Age: ${plural(r.age.years, 'year')}, ${plural(r.age.months, 'month')}, ${plural(r.age.days, 'day')} (${plural(r.totalDays, 'day')} in total). Next birthday in: ${plural(r.next.days, 'day')}. Born on a ${r.weekday}.`;
}

let last = null;
function run() {
  showError($('error'), '');
  try {
    last = computeAge($('birth').value, $('ref').value);
    render(last);
  } catch (e) {
    last = null;
    $('result').hidden = true; $('result').classList.remove('is-active');
    showError($('error'), e.message);
  }
}

$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('clear').addEventListener('click', () => {
  $('birth').value = ''; $('ref').value = ''; $('result').hidden = true; $('result').classList.remove('is-active'); last = null; showError($('error'), ''); $('birth').focus();
});
$('copy').addEventListener('click', async () => {
  if (!last) return;
  const st = $('copy-status');
  try { await navigator.clipboard.writeText(summaryText(last)); st.textContent = 'Result copied to the clipboard.'; }
  catch { st.textContent = 'Could not copy automatically; select the result and copy it by hand.'; }
});
