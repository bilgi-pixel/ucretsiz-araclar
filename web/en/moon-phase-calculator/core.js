// Moon phase: pure logic (no DOM). Jean Meeus, "Astronomical Algorithms" 2nd ed., chapter 49
// (times of the principal phases). Planetary correction terms (about 30 s at most) are omitted; accuracy is a few minutes.

const RAD = Math.PI / 180;
const SYNODIC = 29.530588861; // mean synodic month (days)
const DELTA_T = 69; // TD - UT difference (s), approximate for the 2020s
const JD_UNIX_EPOCH = 2440587.5;

/** phase: 0 new moon, 1 first quarter, 2 full moon, 3 last quarter. k is an integer (lunation number). */
export function phaseJDE(k, phase) {
  const kk = k + phase * 0.25;
  const T = kk / 1236.85;
  let jde = 2451550.09766 + SYNODIC * kk + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = (2.5534 + 29.1053567 * kk - 0.0000014 * T * T - 0.00000011 * T ** 3) * RAD;
  const Mp = (201.5643 + 385.81693528 * kk + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4) * RAD;
  const F = (160.7108 + 390.67050284 * kk - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4) * RAD;
  const O = (124.7746 - 1.56375588 * kk + 0.0020672 * T * T + 0.00000215 * T ** 3) * RAD;
  const s = Math.sin;
  let c;
  if (phase === 0) {
    c = -0.4072 * s(Mp) + 0.17241 * E * s(M) + 0.01608 * s(2 * Mp) + 0.01039 * s(2 * F) + 0.00739 * E * s(Mp - M)
      - 0.00514 * E * s(Mp + M) + 0.00208 * E * E * s(2 * M) - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F)
      + 0.00056 * E * s(2 * Mp + M) - 0.00042 * s(3 * Mp) + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F)
      - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(O) - 0.00007 * s(Mp + 2 * M) + 0.00004 * s(2 * Mp - 2 * F)
      + 0.00004 * s(3 * M) + 0.00003 * s(Mp + M - 2 * F) + 0.00003 * s(2 * Mp + 2 * F) - 0.00003 * s(Mp + M + 2 * F)
      + 0.00003 * s(Mp - M + 2 * F) - 0.00002 * s(Mp - M - 2 * F) - 0.00002 * s(3 * Mp + M) + 0.00002 * s(4 * Mp);
  } else if (phase === 2) {
    c = -0.40614 * s(Mp) + 0.17302 * E * s(M) + 0.01614 * s(2 * Mp) + 0.01043 * s(2 * F) + 0.00734 * E * s(Mp - M)
      - 0.00515 * E * s(Mp + M) + 0.00209 * E * E * s(2 * M) - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F)
      + 0.00056 * E * s(2 * Mp + M) - 0.00042 * s(3 * Mp) + 0.00042 * E * s(M + 2 * F) + 0.00038 * E * s(M - 2 * F)
      - 0.00024 * E * s(2 * Mp - M) - 0.00017 * s(O) - 0.00007 * s(Mp + 2 * M) + 0.00004 * s(2 * Mp - 2 * F)
      + 0.00004 * s(3 * M) + 0.00003 * s(Mp + M - 2 * F) + 0.00003 * s(2 * Mp + 2 * F) - 0.00003 * s(Mp + M + 2 * F)
      + 0.00003 * s(Mp - M + 2 * F) - 0.00002 * s(Mp - M - 2 * F) - 0.00002 * s(3 * Mp + M) + 0.00002 * s(4 * Mp);
  } else {
    c = -0.62801 * s(Mp) + 0.17172 * E * s(M) - 0.01183 * E * s(Mp + M) + 0.00862 * s(2 * Mp) + 0.00804 * s(2 * F)
      + 0.00454 * E * s(Mp - M) + 0.00204 * E * E * s(2 * M) - 0.0018 * s(Mp - 2 * F) - 0.0007 * s(Mp + 2 * F)
      - 0.0004 * s(3 * Mp) - 0.00034 * E * s(2 * Mp - M) + 0.00032 * E * s(M + 2 * F) + 0.00032 * E * s(M - 2 * F)
      - 0.00028 * E * E * s(Mp + 2 * M) + 0.00027 * E * s(2 * Mp + M) - 0.00017 * s(O) - 0.00005 * s(Mp - M - 2 * F)
      + 0.00004 * s(2 * Mp + 2 * F) - 0.00004 * s(Mp + M + 2 * F) + 0.00004 * s(Mp - 2 * M) + 0.00003 * s(Mp + M - 2 * F)
      + 0.00003 * s(3 * M) + 0.00002 * s(2 * Mp - 2 * F) + 0.00002 * s(Mp - M + 2 * F) - 0.00002 * s(3 * Mp + M);
    const W = 0.00306 - 0.00038 * E * Math.cos(M) + 0.00026 * Math.cos(Mp) - 0.00002 * Math.cos(Mp - M)
      + 0.00002 * Math.cos(Mp + M) + 0.00002 * Math.cos(2 * F);
    c += phase === 1 ? W : -W;
  }
  return jde + c;
}

/** JDE (dinamik zaman) -> Unix ms (UTC). */
export function jdeToUnixMs(jde) {
  return (jde - JD_UNIX_EPOCH) * 86400000 - DELTA_T * 1000;
}

/** Lunation number of the last new moon before the given UTC instant. */
function lunationBefore(ms) {
  let k = Math.floor(((ms / 86400000 + JD_UNIX_EPOCH) - 2451550.09766) / SYNODIC);
  while (jdeToUnixMs(phaseJDE(k + 1, 0)) <= ms) k++;
  while (jdeToUnixMs(phaseJDE(k, 0)) > ms) k--;
  return k;
}

export const PHASE_NAMES = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];

/** Phase information for the instant ms (UTC). */
export function moonInfo(ms) {
  const k = lunationBefore(ms);
  const prevNew = jdeToUnixMs(phaseJDE(k, 0));
  const nextNew = jdeToUnixMs(phaseJDE(k + 1, 0));
  // Phase angle: linear interpolation between principal phases (0, 90, 180, 270 degrees); exact at the principal phases.
  const events = [];
  for (let kk = k; kk <= k + 1; kk++) for (let ph = 0; ph < 4; ph++) events.push({ a: ph * 0.25 + (kk - k), t: jdeToUnixMs(phaseJDE(kk, ph)) });
  let ev = 0;
  while (ev + 1 < events.length && events[ev + 1].t <= ms) ev++;
  const frac = Math.min(1, events[ev].a + ((ms - events[ev].t) / (events[ev + 1].t - events[ev].t)) * 0.25); // 0..1 (0 new moon, 0.5 full moon)
  const illumination = (1 - Math.cos(2 * Math.PI * frac)) / 2;
  const ageDays = (ms - prevNew) / 86400000;
  const waxing = frac < 0.5;
  const seg = Math.floor(((frac + 1 / 16) % 1) * 8); // 0..7, each covering 1/8 around a principal phase
  const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const icons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  // The next principal phases after ms.
  const upcoming = [];
  for (let kk = k; kk <= k + 2; kk++) {
    for (let ph = 0; ph < 4; ph++) {
      const t = jdeToUnixMs(phaseJDE(kk, ph));
      if (t > ms) upcoming.push({ phase: ph, name: PHASE_NAMES[ph], ms: t });
    }
  }
  upcoming.sort((a, b) => a.ms - b.ms);
  const nextOf = (ph) => upcoming.find((u) => u.phase === ph);
  return { name: names[seg], icon: icons[seg], seg, frac, illumination, ageDays, waxing, prevNew, nextNew, upcoming: upcoming.slice(0, 4), nextOf };
}

/** Offset (ms) of an IANA time zone from UTC at the given UTC instant. */
function zoneOffsetMs(utcMs, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).formatToParts(new Date(utcMs));
  const g = (t) => Number(parts.find((p) => p.type === t).value);
  return Date.UTC(g('year'), g('month') - 1, g('day'), g('hour'), g('minute'), g('second')) - Math.floor(utcMs / 1000) * 1000;
}

/** "2026-03-03" + "12:00" in the given time zone -> UTC ms. */
export function parseZonedDateTime(dateStr, timeStr, timeZone) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr ?? '').trim());
  if (!m) throw new Error('The date is not valid. Pick a month, day and year (for example 03/03/2026).');
  const [hh, mm] = /^(\d{1,2}):(\d{2})$/.test(timeStr ?? '') ? timeStr.split(':').map(Number) : [12, 0];
  const y = Number(m[1]);
  if (y < 1900 || y > 2100) throw new Error('The year must be between 1900 and 2100. Accuracy drops outside that range; choose a closer date.');
  const wall = Date.UTC(y, Number(m[2]) - 1, Number(m[3]), hh, mm);
  const check = new Date(wall);
  if (check.getUTCMonth() !== Number(m[2]) - 1) throw new Error('That date does not exist. Check the number of days in the month (for example February never has 30).');
  // Two passes handle daylight saving transitions.
  let utc = wall - zoneOffsetMs(wall, timeZone);
  utc = wall - zoneOffsetMs(utc, timeZone);
  return utc;
}

/** UTC ms -> "Tue, Mar 3, 2026, 6:38 AM EST" in the given time zone. */
export function fmtZoned(ms, timeZone) {
  return new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(new Date(ms));
}
