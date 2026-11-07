// Speed, distance, time: pure logic (no DOM). All math is done in SI units (meters, seconds).

export const SPEED_UNITS = { mph: 1609.344 / 3600, 'km/h': 1000 / 3600, 'm/s': 1, knots: 1852 / 3600, 'ft/s': 0.3048 };
export const DIST_UNITS = { miles: 1609.344, km: 1000, m: 1, ft: 0.3048, 'nautical miles': 1852 };

/** Parses a US/UK-style number ("1,250.5"). Returns null when empty. */
export function parseOptional(text, label) {
  const s = String(text ?? '').trim().replace(/[\s,]/g, '');
  if (s === '') return null;
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) throw new Error(`${label} is not a valid number. Use digits and a period for decimals (for example 60 or 2.5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} is too large. Try a smaller value.`);
  if (v < 0) throw new Error(`${label} cannot be negative. Enter a positive value.`);
  return v;
}

export function fmt(v, max = 4) {
  const r = Number(v.toFixed(max));
  return r.toLocaleString('en-US', { maximumFractionDigits: max });
}

/** Writes seconds as "2 h 30 min 0 s". */
export function fmtDuration(totalSeconds) {
  let s = Math.round(totalSeconds * 1000) / 1000;
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  const sec = Math.round(s * 100) / 100;
  const parts = [];
  if (d) parts.push(`${d} d`);
  parts.push(`${h} h`, `${m} min`, `${sec.toLocaleString('en-US')} s`);
  return parts.join(' ');
}

/** Writes a pace given in seconds per unit as "8 min 00 s". */
export function fmtPace(secPerUnit, unit) {
  let m = Math.floor(secPerUnit / 60);
  let s = Math.round(secPerUnit - m * 60);
  if (s === 60) { m += 1; s = 0; }
  return `${m} min ${String(s).padStart(2, '0')} s / ${unit}`;
}

/**
 * mode: 'speed' | 'distance' | 'time'. speed {v,unit} · dist {v,unit} · seconds (total).
 * The missing value is calculated; the result comes back in SI units.
 */
export function solve(mode, { speed, dist, seconds }) {
  let mps, meters, secs;
  if (mode === 'speed') {
    if (dist == null || seconds == null) throw new Error('To find speed, enter both distance and time.');
    if (seconds <= 0) throw new Error('Time must be greater than zero. Enter a value in the hours, minutes or seconds box.');
    meters = dist.v * DIST_UNITS[dist.unit]; secs = seconds; mps = meters / secs;
  } else if (mode === 'distance') {
    if (speed == null || seconds == null) throw new Error('To find distance, enter both speed and time.');
    mps = speed.v * SPEED_UNITS[speed.unit]; secs = seconds; meters = mps * secs;
  } else {
    if (speed == null || dist == null) throw new Error('To find time, enter both speed and distance.');
    mps = speed.v * SPEED_UNITS[speed.unit];
    if (mps <= 0) throw new Error('Speed must be greater than zero. Something standing still never covers the distance; increase the speed value.');
    meters = dist.v * DIST_UNITS[dist.unit]; secs = meters / mps;
  }
  const kmh = mps * 3.6;
  const mph = (mps * 3600) / 1609.344;
  return { mps, meters, secs, kmh, mph, knot: (mps * 3600) / 1852, paceSecPerKm: kmh > 0 ? 3600 / kmh : null, paceSecPerMile: mph > 0 ? 3600 / mph : null };
}
