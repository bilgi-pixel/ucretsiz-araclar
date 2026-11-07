// Hours Calculator (EN) — weekly time card. Runs in the browser; nothing is uploaded.
import { showError } from '../../assets/js/ba.js';

const $ = (id) => document.getElementById(id);
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const dec = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
let lastText = null;

/**
 * Reads a clock time and returns minutes after midnight, or null when invalid.
 * Accepts 9, 9:30, 930, 0930, 9am, 9:30 pm, 17:15, 5.30pm and 24:00.
 */
export function parseClock(input) {
  const s = String(input ?? '').trim().toLowerCase().replace(/\s+/g, '').replace(/\./g, ':');
  const m = s.match(/^(\d{1,2})(?::?(\d{2}))?(a|p|am|pm)?$/);
  if (!m) return null;
  let h = Number(m[1]);
  const min = m[2] === undefined ? 0 : Number(m[2]);
  const mer = m[3];
  if (min > 59) return null;
  if (mer) {
    if (h < 1 || h > 12) return null;
    h = (h % 12) + (mer[0] === 'p' ? 12 : 0);
  } else if (h > 24 || (h === 24 && min > 0)) return null;
  return h * 60 + min;
}

/** Reads a break: "30", "45 min", "0:30", "1h" → minutes, or null when invalid. */
export function parseBreak(input) {
  const s = String(input ?? '').trim().toLowerCase().replace(/\s+/g, '');
  if (!s) return 0;
  let m = s.match(/^(\d+):(\d{2})$/);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  m = s.match(/^(\d+(?:\.\d+)?)(?:m|min|mins|minutes)?$/);
  if (m) return Math.round(Number(m[1]));
  m = s.match(/^(\d+(?:\.\d+)?)(?:h|hr|hrs|hour|hours)$/);
  if (m) return Math.round(Number(m[1]) * 60);
  return null;
}

/** Minutes worked between two clock values; an earlier end means the shift ends the next day. */
export function shiftMinutes(startMin, endMin, breakMin) {
  const gross = endMin >= startMin ? endMin - startMin : endMin + 1440 - startMin;
  return gross - breakMin;
}

export function fmtHM(min) {
  const sign = min < 0 ? '-' : '';
  const a = Math.abs(Math.round(min));
  return `${sign}${Math.floor(a / 60)}:${String(a % 60).padStart(2, '0')}`;
}

function parseNum(s) {
  const t = String(s ?? '').trim().replace(/^\$/, '').replace(/,/g, '');
  return t !== '' && /^\d*\.?\d+$|^\d+\.$/.test(t) ? Number(t) : NaN;
}

function fieldError(msg, id) { const e = new Error(msg); e.fieldId = id; return e; }

function buildRows() {
  const tbody = $('rows');
  DAYS.forEach((d, i) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row'; th.textContent = d;
    tr.append(th);
    [['start', 'Start', '9:00 AM'], ['end', 'End', '5:30 PM'], ['break', 'Break (min)', '30']].forEach(([k, label, ph]) => {
      const td = document.createElement('td');
      const inp = document.createElement('input');
      inp.type = 'text'; inp.id = `d${i}-${k}`; inp.autocomplete = 'off'; inp.spellcheck = false;
      inp.placeholder = ph; inp.setAttribute('aria-label', `${d} ${label.toLowerCase()}`);
      const lab = document.createElement('span'); lab.className = 'hc-lab'; lab.setAttribute('aria-hidden', 'true'); lab.textContent = label; td.append(lab);
      if (k === 'break') inp.inputMode = 'numeric';
      td.append(inp); tr.append(td);
    });
    const out = document.createElement('td');
    out.id = `d${i}-hours`; out.className = 'hc-out'; out.textContent = '–';
    tr.append(out);
    tbody.append(tr);
  });
}

function run() {
  showError($('error'), '');
  document.querySelectorAll('#form [aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  $('copy-status').textContent = '';
  try {
    // Overtime / pay settings first so errors point at the right box
    const limRaw = $('f-limit').value.trim();
    const limit = limRaw === '' ? 40 : parseNum(limRaw);
    if (Number.isNaN(limit) || limit < 0 || limit > 168) throw fieldError('Overtime starts after must be a number of hours between 0 and 168, for example 40.', 'f-limit');
    const mulRaw = $('f-mult').value.trim();
    const mult = mulRaw === '' ? 1.5 : parseNum(mulRaw);
    if (Number.isNaN(mult) || mult < 1 || mult > 5) throw fieldError('Overtime multiplier must be between 1 and 5, for example 1.5 for time and a half.', 'f-mult');
    const rateRaw = $('f-rate').value.trim();
    let rate = null;
    if (rateRaw !== '') {
      rate = parseNum(rateRaw);
      if (Number.isNaN(rate)) throw fieldError('Hourly rate could not be read. Enter an amount such as 18 or 18.50, or leave the box empty.', 'f-rate');
    }
    let total = 0; let used = 0; const warns = []; const lines = [];
    DAYS.forEach((d, i) => {
      const sRaw = $(`d${i}-start`).value.trim();
      const eRaw = $(`d${i}-end`).value.trim();
      const bRaw = $(`d${i}-break`).value.trim();
      const out = $(`d${i}-hours`);
      if (!sRaw && !eRaw && !bRaw) { out.textContent = '–'; return; }
      if (!sRaw || !eRaw) throw fieldError(`${d}: enter both a start time and an end time, or clear the row. Examples: 9:00 AM and 5:30 PM, or 09:00 and 17:30.`, sRaw ? `d${i}-end` : `d${i}-start`);
      const s = parseClock(sRaw);
      if (s === null) throw fieldError(`${d}: the start time "${sRaw}" could not be read. Try 9:00 AM, 9am or 09:00.`, `d${i}-start`);
      const e = parseClock(eRaw);
      if (e === null) throw fieldError(`${d}: the end time "${eRaw}" could not be read. Try 5:30 PM, 5:30pm or 17:30.`, `d${i}-end`);
      const b = parseBreak(bRaw);
      if (b === null) throw fieldError(`${d}: the break "${bRaw}" could not be read. Enter minutes such as 30, or 0:30.`, `d${i}-break`);
      const mins = shiftMinutes(s, e, b);
      if (mins < 0) throw fieldError(`${d}: the unpaid break is longer than the shift. Shorten the break or check the times.`, `d${i}-break`);
      if (mins > 16 * 60) warns.push(`${d} shows ${fmtHM(mins)} hours; check AM/PM on the times.`);
      out.textContent = fmtHM(mins);
      total += mins; used += 1;
      lines.push(`${d}: ${sRaw} - ${eRaw}${b ? `, break ${b} min` : ''} = ${fmtHM(mins)}`);
    });
    if (!used) throw fieldError('Enter at least one day with a start and an end time. Example: 9:00 AM to 5:30 PM with a 30 minute break.', 'd0-start');
    const otMin = Math.max(0, total - Math.round(limit * 60));
    const regMin = total - otMin;
    $('r-total').textContent = `${fmtHM(total)} hours`;
    $('r-dec').textContent = `${dec.format(total / 60)} hours`;
    $('r-days').textContent = String(used);
    $('r-avg').textContent = `${fmtHM(total / used)} hours`;
    $('r-reg').textContent = `${fmtHM(regMin)} hours`;
    $('r-ot').textContent = `${fmtHM(otMin)} hours`;
    let pay = null;
    if (rate !== null) pay = (regMin / 60) * rate + (otMin / 60) * rate * mult;
    $('r-pay').textContent = pay === null ? 'No hourly rate entered' : money.format(pay);
    $('warn').hidden = warns.length === 0;
    $('warn').textContent = warns.length ? `Check: ${warns.join(' ')}` : '';
    $('result').hidden = false; $('result').classList.add('is-active');
    lastText = ['Weekly hours - Bilişim Ajans Free Tools', ...lines,
      `Total: ${fmtHM(total)} (${dec.format(total / 60)} decimal hours)`,
      `Regular: ${fmtHM(regMin)}  Overtime: ${fmtHM(otMin)} (after ${limit} h)`,
      `Gross pay: ${pay === null ? 'no hourly rate entered' : money.format(pay)}`].join('\n');
  } catch (err) {
    $('result').hidden = true; $('result').classList.remove('is-active'); lastText = null;
    showError($('error'), err.message || String(err));
    const f = err.fieldId && $(err.fieldId);
    if (f) { f.setAttribute('aria-invalid', 'true'); f.focus(); }
  }
}

buildRows();
$('form').addEventListener('submit', (e) => { e.preventDefault(); run(); });
$('fill').addEventListener('click', () => {
  for (let i = 0; i < 5; i++) { $(`d${i}-start`).value = '9:00 AM'; $(`d${i}-end`).value = '5:30 PM'; $(`d${i}-break`).value = '30'; }
  $('fill-status').textContent = 'Monday to Friday filled with 9:00 AM to 5:30 PM and a 30 minute break. Edit any row you need.';
});
$('clear').addEventListener('click', () => {
  $('form').reset();
  DAYS.forEach((_, i) => { $(`d${i}-hours`).textContent = '–'; });
  $('result').hidden = true; $('result').classList.remove('is-active');
  showError($('error'), ''); $('fill-status').textContent = ''; $('copy-status').textContent = ''; lastText = null;
  $('d0-start').focus();
});
$('copy').addEventListener('click', async () => {
  if (!lastText) return;
  try { await navigator.clipboard.writeText(lastText); $('copy-status').textContent = 'Time card copied to the clipboard.'; }
  catch { $('copy-status').textContent = 'Could not copy automatically. Select the numbers and copy them by hand.'; }
});
