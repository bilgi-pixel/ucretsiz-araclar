// Unix timestamp <-> date conversion: pure logic (no DOM).
export const MAX_MS = 8.64e15; // JavaScript Date limit (about +/-275,760 years)
export const ET_ZONE = 'America/New_York';

/** Turns text into a number; only digits (optionally negative, optionally with decimals) are accepted. */
export function parseStamp(text) {
  const s = String(text ?? '').trim().replace(/[\s_,]/g, '');
  if (s === '') throw new Error('The timestamp is empty. Type something like 1700000000 (seconds) or 1700000000000 (milliseconds).');
  if (!/^-?\d+(\.\d+)?$/.test(s)) throw new Error('A timestamp must contain digits only (for example 1700000000). Remove letters, spaces and date formatting.');
  return Number(s);
}

/** Unit: 'auto' | 's' | 'ms'. With auto, |n| >= 1e11 is treated as milliseconds. */
export function toMs(n, unit = 'auto') {
  const u = unit === 'auto' ? (Math.abs(n) >= 1e11 ? 'ms' : 's') : unit;
  const ms = u === 'ms' ? Math.trunc(n) : Math.round(n * 1000);
  if (Math.abs(ms) > MAX_MS) throw new Error('This timestamp is outside the supported range. Check the unit (seconds or milliseconds) or enter a smaller value.');
  return { ms, unit: u };
}

/** "MM/DD/YYYY HH:MM:SS" (24-hour) and the weekday in the given time zone. */
export function formatIn(ms, timeZone) {
  const d = new Date(ms);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', weekday: 'long',
  }).formatToParts(d).map((p) => [p.type, p.value]));
  return { text: `${parts.month}/${parts.day}/${parts.year} ${parts.hour}:${parts.minute}:${parts.second}`, weekday: parts.weekday };
}

/** ISO 8601 (UTC). */
export function isoUtc(ms) { return new Date(ms).toISOString(); }

/** UTC offset of a time zone at a given instant (ms). */
function zoneOffset(ms, timeZone) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ms / 1000) * 1000;
}

/** "YYYY-MM-DDTHH:MM[:SS]" (datetime-local) -> ms. zone: 'et' | 'utc' | 'local'. */
export function fromLocalInput(value, zone = 'et') {
  const m = /^(\d{4,6})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value || '').trim());
  if (!m) throw new Error('The date and time are missing or invalid. Pick the month, day, year, hour and minute in full.');
  const [y, mo, d, h, mi, s] = [+m[1], +m[2], +m[3], +m[4], +m[5], +(m[6] || 0)];
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || h > 23 || mi > 59 || s > 59) throw new Error('The date or time is not valid. Pick the values again with the calendar and time picker.');
  const asUtc = Date.UTC(y, mo - 1, d, h, mi, s);
  if (new Date(asUtc).getUTCDate() !== d) throw new Error('That day does not exist in the selected month (for example April 31). Correct the date.');
  let ms;
  if (zone === 'utc') ms = asUtc;
  else if (zone === 'local') ms = new Date(y, mo - 1, d, h, mi, s).getTime();
  else { ms = asUtc - zoneOffset(asUtc, ET_ZONE); ms = asUtc - zoneOffset(ms, ET_ZONE); }
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) throw new Error('The date is outside the supported range. Pick a date closer to today.');
  return ms;
}

/** Relative text such as "3 years ago". */
export function relative(ms, now = Date.now()) {
  const diff = ms - now;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const a = Math.abs(diff) / 1000;
  const steps = [['year', 31557600], ['month', 2629800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
  for (const [u, sec] of steps) if (a >= sec || u === 'second') return rtf.format(Math.round(diff / 1000 / sec), u);
}
