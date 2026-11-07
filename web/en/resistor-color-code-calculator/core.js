// Resistor color code (IEC 60062): pure logic (no DOM).

export const COLORS = {
  black: { hex: '#111111', digit: 0, mult: 1 },
  brown: { hex: '#7b4a1e', digit: 1, mult: 10, tol: 1, ppm: 100 },
  red: { hex: '#d32f2f', digit: 2, mult: 100, tol: 2, ppm: 50 },
  orange: { hex: '#f57c00', digit: 3, mult: 1e3, ppm: 15 },
  yellow: { hex: '#fbc02d', digit: 4, mult: 1e4, ppm: 25 },
  green: { hex: '#2e7d32', digit: 5, mult: 1e5, tol: 0.5 },
  blue: { hex: '#1565c0', digit: 6, mult: 1e6, tol: 0.25, ppm: 10 },
  violet: { hex: '#7b1fa2', digit: 7, mult: 1e7, tol: 0.1, ppm: 5 },
  grey: { hex: '#757575', digit: 8, mult: 1e8, tol: 0.05 },
  white: { hex: '#f5f5f5', digit: 9, mult: 1e9 },
  gold: { hex: '#c9a227', mult: 0.1, tol: 5 },
  silver: { hex: '#b0b0b0', mult: 0.01, tol: 10 },
};
export const DIGIT_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].digit !== undefined);
export const MULT_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].mult !== undefined);
export const TOL_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].tol !== undefined);
export const PPM_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].ppm !== undefined);

/** Writes an ohm value in US style: 4700 -> "4.7 kΩ". */
export function fmtOhm(v) {
  const units = [[1e9, 'GΩ'], [1e6, 'MΩ'], [1e3, 'kΩ'], [1, 'Ω']];
  for (const [f, u] of units) {
    if (v >= f * 0.9999999 || u === 'Ω') {
      const n = Number((v / f).toPrecision(6));
      return `${n.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${u}`;
    }
  }
}

/** Decodes a value from a list of color names (4, 5 or 6 bands). */
export function decode(bands) {
  const n = bands.length;
  if (![4, 5, 6].includes(n)) throw new Error('The number of bands must be 4, 5 or 6.');
  const nd = n === 4 ? 2 : 3;
  let value = 0;
  for (let i = 0; i < nd; i++) {
    const c = COLORS[bands[i]];
    if (!c || c.digit === undefined) throw new Error(`Band ${i + 1} cannot be gold or silver; choose a color from black to white (digits 0 to 9).`);
    value = value * 10 + c.digit;
  }
  const m = COLORS[bands[nd]];
  if (!m || m.mult === undefined) throw new Error('The multiplier band is not valid.');
  const ohm = Math.round(value * m.mult * 1e6) / 1e6;
  const tol = COLORS[bands[nd + 1]]?.tol;
  if (tol === undefined) throw new Error('For the tolerance band choose brown, red, green, blue, violet, grey, gold or silver.');
  const ppm = n === 6 ? COLORS[bands[5]]?.ppm : null;
  if (n === 6 && ppm === undefined) throw new Error('For the temperature coefficient band choose brown, red, orange, yellow, blue or violet.');
  return { ohm, tol, ppm, min: ohm * (1 - tol / 100), max: ohm * (1 + tol / 100) };
}

/** Converts "4.7k", "4k7", "220", "1M", "2.2M", "470R" to ohms. */
export function parseOhm(text) {
  const s = String(text ?? '').trim().replace(/[\s,]/g, '').replace(/Ω|ohms?/gi, '');
  if (s === '') throw new Error('The resistance value is empty. Type something like 4.7k, 220 or 1M.');
  const mult = { r: 1, k: 1e3, m: 1e6, g: 1e9 };
  let m = /^(\d+)([rkmg])(\d+)$/i.exec(s); // 4k7 notation
  if (m) return Number(`${m[1]}.${m[3]}`) * mult[m[2].toLowerCase()];
  m = /^(\d*\.?\d+|\d+\.)([rkmg]?)$/i.exec(s);
  if (!m) throw new Error('The resistance value could not be understood. Try 4.7k, 4k7, 220 or 1M.');
  const v = Number(m[1]);
  if (!Number.isFinite(v) || v <= 0) throw new Error('The resistance must be a number greater than zero. Type something like 4.7k or 220.');
  return v * (mult[m[2].toLowerCase()] ?? 1);
}

/** Converts an ohm value to color bands. bandCount is 4 or 5; tolColor is the tolerance color. */
export function encode(ohm, bandCount, tolColor) {
  const nd = bandCount === 4 ? 2 : 3;
  if (ohm < 10 ** (nd - 1) * 0.01) throw new Error(`This value cannot be shown with ${bandCount} bands; it is too small. Enter a larger value.`);
  for (let e = -2; e <= 9; e++) {
    const sig = Math.round(ohm / 10 ** e);
    if (sig >= 10 ** (nd - 1) && sig < 10 ** nd && Math.abs(sig * 10 ** e - ohm) <= ohm * 1e-9) {
      const multName = MULT_COLORS.find((k) => Math.abs(COLORS[k].mult - 10 ** e) < 1e-12);
      if (!multName) continue;
      const digits = String(sig).split('').map((d) => DIGIT_COLORS.find((k) => COLORS[k].digit === Number(d)));
      return [...digits, multName, tolColor];
    }
  }
  throw new Error(nd === 2
    ? 'This value cannot be shown exactly with 4 bands (only 2 significant digits are available). Try the 5-band option, or enter a value from the E12 or E24 series.'
    : 'This value cannot be shown exactly with 5 bands (at most 3 significant digits are available). Write the value with 3 significant digits (for example 4.75k).');
}
