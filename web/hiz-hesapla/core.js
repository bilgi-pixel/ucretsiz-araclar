// Hız, yol, süre — saf mantık (DOM yok). Tüm hesap SI birimlerinde (metre, saniye) yapılır.

export const SPEED_UNITS = { 'km/sa': 1000 / 3600, 'm/sn': 1, 'mil/sa': 1609.344 / 3600, knot: 1852 / 3600 };
export const DIST_UNITS = { km: 1000, m: 1, mil: 1609.344, 'deniz mili': 1852 };

/** Türkçe yazımlı sayıyı çözer. Boşsa null döner. */
export function parseOptional(text, label) {
  let s = String(text ?? '').trim().replace(/\s/g, '');
  if (s === '') return null;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(s)) throw new Error(`${label} geçersiz. Yalnızca rakam ve ondalık için virgül kullanın (örneğin 90 ya da 2,5).`);
  const v = Number(s);
  if (!Number.isFinite(v)) throw new Error(`${label} çok büyük. Daha küçük bir değer deneyin.`);
  if (v < 0) throw new Error(`${label} negatif olamaz. Pozitif bir değer yazın.`);
  return v;
}

export function fmt(v, max = 4) {
  const r = Number(v.toFixed(max));
  return r.toLocaleString('tr-TR', { maximumFractionDigits: max });
}

/** Saniyeyi "2 sa 30 dk 0 sn" biçiminde yazar. */
export function fmtDuration(totalSeconds) {
  let s = Math.round(totalSeconds * 1000) / 1000;
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  const sec = Math.round(s * 100) / 100;
  const parts = [];
  if (d) parts.push(`${d} gün`);
  parts.push(`${h} sa`, `${m} dk`, `${sec.toLocaleString('tr-TR')} sn`);
  return parts.join(' ');
}

/** Dakika/km cinsinden tempoyu "5 dk 00 sn" yazar. */
export function fmtPace(secPerKm) {
  let m = Math.floor(secPerKm / 60);
  let s = Math.round(secPerKm - m * 60);
  if (s === 60) { m += 1; s = 0; }
  return `${m} dk ${String(s).padStart(2, '0')} sn / km`;
}

/**
 * mode: 'hiz' | 'yol' | 'sure'. speed {v,unit} · dist {v,unit} · seconds (toplam).
 * Eksik değer hesaplanır; sonuç SI birimlerinde döner.
 */
export function solve(mode, { speed, dist, seconds }) {
  let mps, meters, secs;
  if (mode === 'hiz') {
    if (dist == null || seconds == null) throw new Error('Hızı bulmak için yol ve süre girin.');
    if (seconds <= 0) throw new Error('Süre sıfırdan büyük olmalı. Saat, dakika ya da saniye alanına bir değer yazın.');
    meters = dist.v * DIST_UNITS[dist.unit]; secs = seconds; mps = meters / secs;
  } else if (mode === 'yol') {
    if (speed == null || seconds == null) throw new Error('Yolu bulmak için hız ve süre girin.');
    mps = speed.v * SPEED_UNITS[speed.unit]; secs = seconds; meters = mps * secs;
  } else {
    if (speed == null || dist == null) throw new Error('Süreyi bulmak için hız ve yol girin.');
    mps = speed.v * SPEED_UNITS[speed.unit];
    if (mps <= 0) throw new Error('Hız sıfırdan büyük olmalı. Hareketsiz bir cisim yolu tamamlayamaz; hız değerini artırın.');
    meters = dist.v * DIST_UNITS[dist.unit]; secs = meters / mps;
  }
  const kmh = mps * 3.6;
  return { mps, meters, secs, kmh, mph: (mps * 3600) / 1609.344, knot: (mps * 3600) / 1852, paceSecPerKm: kmh > 0 ? 3600 / kmh : null };
}
