// Ay evresi — saf mantık (DOM yok). Jean Meeus, "Astronomical Algorithms" 2. baskı, Bölüm 49
// (ana evrelerin zamanı). Gezegen düzeltme terimleri (en çok ~30 sn) atlanmıştır; doğruluk birkaç dakikadır.

const RAD = Math.PI / 180;
const SYNODIC = 29.530588861; // ortalama sinodik ay (gün)
const DELTA_T = 69; // TD - UT farkı (sn), 2020'ler için yaklaşık
const JD_UNIX_EPOCH = 2440587.5;
export const TR_OFFSET_MS = 3 * 3600 * 1000; // Türkiye saati: UTC+3 (sabit)

/** phase: 0 yeni ay, 1 ilk dördün, 2 dolunay, 3 son dördün. k tam sayı (lunasyon numarası). */
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

/** Verilen UTC anına göre, o andan önceki son yeni ayın lunasyon numarası. */
function lunationBefore(ms) {
  let k = Math.floor(((ms / 86400000 + JD_UNIX_EPOCH) - 2451550.09766) / SYNODIC);
  while (jdeToUnixMs(phaseJDE(k + 1, 0)) <= ms) k++;
  while (jdeToUnixMs(phaseJDE(k, 0)) > ms) k--;
  return k;
}

export const PHASE_NAMES = ['Yeni Ay', 'İlk Dördün', 'Dolunay', 'Son Dördün'];

/** ms (UTC) anı için evre bilgisi. */
export function moonInfo(ms) {
  const k = lunationBefore(ms);
  const prevNew = jdeToUnixMs(phaseJDE(k, 0));
  const nextNew = jdeToUnixMs(phaseJDE(k + 1, 0));
  // Evre açısı: ana evre anları (0°, 90°, 180°, 270°) arasında doğrusal ara değer; ana evrelerde tam doğrudur.
  const events = [];
  for (let kk = k; kk <= k + 1; kk++) for (let ph = 0; ph < 4; ph++) events.push({ a: ph * 0.25 + (kk - k), t: jdeToUnixMs(phaseJDE(kk, ph)) });
  let ev = 0;
  while (ev + 1 < events.length && events[ev + 1].t <= ms) ev++;
  const frac = Math.min(1, events[ev].a + ((ms - events[ev].t) / (events[ev + 1].t - events[ev].t)) * 0.25); // 0..1 (0 yeni ay, 0.5 dolunay)
  const illumination = (1 - Math.cos(2 * Math.PI * frac)) / 2;
  const ageDays = (ms - prevNew) / 86400000;
  const waxing = frac < 0.5;
  const seg = Math.floor(((frac + 1 / 16) % 1) * 8); // 0..7, her biri ana evre çevresinde 1/8
  const names = ['Yeni Ay', 'Büyüyen Hilal', 'İlk Dördün', 'Büyüyen Şişkin Ay', 'Dolunay', 'Küçülen Şişkin Ay', 'Son Dördün', 'Küçülen Hilal'];
  const icons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  // Sonraki ana evreler (yeni ay, ilk dördün, dolunay, son dördün) — ms'den sonraki ilk dördü.
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

/** "2026-03-03" + "12:00" (Türkiye saati) -> UTC ms. */
export function parseTrDateTime(dateStr, timeStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr ?? '').trim());
  if (!m) throw new Error('Tarih geçersiz. Gün, ay ve yıl seçin (örneğin 03.03.2026).');
  const [hh, mm] = /^(\d{1,2}):(\d{2})$/.test(timeStr ?? '') ? timeStr.split(':').map(Number) : [12, 0];
  const y = Number(m[1]);
  if (y < 1900 || y > 2100) throw new Error('Yıl 1900 ile 2100 arasında olmalı. Bu aralık dışında doğruluk düşer; daha yakın bir tarih seçin.');
  const ms = Date.UTC(y, Number(m[2]) - 1, Number(m[3]), hh, mm) - TR_OFFSET_MS;
  const check = new Date(ms + TR_OFFSET_MS);
  if (check.getUTCMonth() !== Number(m[2]) - 1) throw new Error('Böyle bir tarih yok. Ayın gün sayısını kontrol edin (örneğin Şubat 30 olamaz).');
  return ms;
}

const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

/** UTC ms -> "3 Mart 2026 Salı, 14:38" (Türkiye saati). */
export function fmtTr(ms) {
  const d = new Date(ms + TR_OFFSET_MS);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} ${DAYS[d.getUTCDay()]}, ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}
