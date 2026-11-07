// Direnç renk kodu (IEC 60062) — saf mantık (DOM yok).

export const COLORS = {
  siyah: { hex: '#111111', digit: 0, mult: 1 },
  kahverengi: { hex: '#7b4a1e', digit: 1, mult: 10, tol: 1, ppm: 100 },
  kırmızı: { hex: '#d32f2f', digit: 2, mult: 100, tol: 2, ppm: 50 },
  turuncu: { hex: '#f57c00', digit: 3, mult: 1e3, ppm: 15 },
  sarı: { hex: '#fbc02d', digit: 4, mult: 1e4, ppm: 25 },
  yeşil: { hex: '#2e7d32', digit: 5, mult: 1e5, tol: 0.5 },
  mavi: { hex: '#1565c0', digit: 6, mult: 1e6, tol: 0.25, ppm: 10 },
  mor: { hex: '#7b1fa2', digit: 7, mult: 1e7, tol: 0.1, ppm: 5 },
  gri: { hex: '#757575', digit: 8, mult: 1e8, tol: 0.05 },
  beyaz: { hex: '#f5f5f5', digit: 9, mult: 1e9 },
  altın: { hex: '#c9a227', mult: 0.1, tol: 5 },
  gümüş: { hex: '#b0b0b0', mult: 0.01, tol: 10 },
};
export const DIGIT_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].digit !== undefined);
export const MULT_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].mult !== undefined);
export const TOL_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].tol !== undefined);
export const PPM_COLORS = Object.keys(COLORS).filter((k) => COLORS[k].ppm !== undefined);

/** Ohm değerini Türkçe yazar: 4700 -> "4,7 kΩ". */
export function fmtOhm(v) {
  const units = [[1e9, 'GΩ'], [1e6, 'MΩ'], [1e3, 'kΩ'], [1, 'Ω']];
  for (const [f, u] of units) {
    if (v >= f * 0.9999999 || u === 'Ω') {
      const n = Number((v / f).toPrecision(6));
      return `${n.toLocaleString('tr-TR', { maximumFractionDigits: 4 })} ${u}`;
    }
  }
}

/** Renk listesinden değer çözer. bands: renk adları dizisi (4, 5 ya da 6 bant). */
export function decode(bands) {
  const n = bands.length;
  if (![4, 5, 6].includes(n)) throw new Error('Bant sayısı 4, 5 ya da 6 olmalı.');
  const nd = n === 4 ? 2 : 3;
  let value = 0;
  for (let i = 0; i < nd; i++) {
    const c = COLORS[bands[i]];
    if (!c || c.digit === undefined) throw new Error(`${i + 1}. bant için altın ya da gümüş seçilemez; siyahtan beyaza 0–9 arası bir renk seçin.`);
    value = value * 10 + c.digit;
  }
  const m = COLORS[bands[nd]];
  if (!m || m.mult === undefined) throw new Error('Çarpan bandı geçersiz.');
  const ohm = Math.round(value * m.mult * 1e6) / 1e6;
  const tol = COLORS[bands[nd + 1]]?.tol;
  if (tol === undefined) throw new Error('Tolerans bandı için kahverengi, kırmızı, yeşil, mavi, mor, gri, altın ya da gümüş seçin.');
  const ppm = n === 6 ? COLORS[bands[5]]?.ppm : null;
  if (n === 6 && ppm === undefined) throw new Error('Sıcaklık katsayısı bandı için kahverengi, kırmızı, turuncu, sarı, mavi ya da mor seçin.');
  return { ohm, tol, ppm, min: ohm * (1 - tol / 100), max: ohm * (1 + tol / 100) };
}

/** "4,7k", "4k7", "220", "1M", "2.2M", "470R" gibi yazımı ohm'a çevirir. */
export function parseOhm(text) {
  const s = String(text ?? '').trim().replace(/\s/g, '').replace(/Ω|ohm/gi, '');
  if (s === '') throw new Error('Direnç değeri boş. Örneğin 4,7k, 220 ya da 1M yazın.');
  const mult = { r: 1, k: 1e3, m: 1e6, g: 1e9 };
  let m = /^(\d+)([rkmg])(\d+)$/i.exec(s); // 4k7 biçimi
  if (m) return Number(`${m[1]}.${m[3]}`) * mult[m[2].toLowerCase()];
  m = /^([\d.,]+)([rkmg]?)$/i.exec(s);
  if (!m) throw new Error('Direnç değeri anlaşılamadı. Örneğin 4,7k, 4k7, 220 ya da 1M yazın.');
  let num = m[1];
  if (num.includes(',')) num = num.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(num)) num = num.replace(/\./g, '');
  const v = Number(num);
  if (!Number.isFinite(v) || v <= 0) throw new Error('Direnç değeri sıfırdan büyük bir sayı olmalı. Örneğin 4,7k ya da 220 yazın.');
  return v * (mult[m[2].toLowerCase()] ?? 1);
}

/** Ohm değerini renk bantlarına çevirir. bandCount 4 ya da 5; tolColor tolerans rengi. */
export function encode(ohm, bandCount, tolColor) {
  const nd = bandCount === 4 ? 2 : 3;
  if (ohm < 10 ** (nd - 1) * 0.01) throw new Error(`Bu değer ${bandCount} bantla gösterilemez; çok küçük. Daha büyük bir değer yazın.`);
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
    ? 'Bu değer 4 bantla tam gösterilemez (yalnızca 2 anlamlı rakam kullanılabilir). 5 bantlı seçeneği deneyin ya da E12/E24 serisinden bir değer yazın.'
    : 'Bu değer 5 bantla tam gösterilemez (en çok 3 anlamlı rakam kullanılabilir). Değeri 3 anlamlı rakamla yazın (örneğin 4,75k).');
}
