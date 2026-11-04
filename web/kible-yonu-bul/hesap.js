// Kıble yönü hesap çekirdeği — saf fonksiyonlar, ağ yok, DOM yok.
// Kıble açısı: büyük daire başlangıç açısı; mesafe: Haversine (R = 6371 km);
// manyetik sapma: NOAA/NCEI World Magnetic Model 2025 (WMM2025, kamu malı);
// güneş konumu: NOAA güneş hesaplayıcısının (Meeus tabanlı) algoritması.

export const KAABA = { lat: 21.422487, lon: 39.826206 };
export const EARTH_R_KM = 6371;

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/** Açıyı [0, 360) aralığına getirir. */
export function norm360(a) {
  const r = a % 360;
  return r < 0 ? r + 360 : r;
}

/** İki açı arasındaki işaretli en kısa fark (b − a), (−180, 180] aralığında. */
export function angleDiff(a, b) {
  let d = norm360(b - a);
  if (d > 180) d -= 360;
  return d;
}

/** Enlem/boylam geçerli mi? */
export function validLatLon(lat, lon) {
  return Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/** Gerçek (coğrafi) kuzeyden saat yönünde büyük daire başlangıç açısı (derece). */
export function initialBearing(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * RAD, p2 = lat2 * RAD, dl = (lon2 - lon1) * RAD;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return norm360(Math.atan2(y, x) * DEG);
}

/** Haversine büyük daire mesafesi (km). */
export function haversineKm(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * RAD, p2 = lat2 * RAD;
  const dp = (lat2 - lat1) * RAD, dl = (lon2 - lon1) * RAD;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * EARTH_R_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** Konumdan Kâbe'ye kıble açısı (gerçek kuzey) ve mesafe. */
export function qibla(lat, lon, kaaba = KAABA) {
  return { bearing: initialBearing(lat, lon, kaaba.lat, kaaba.lon), km: haversineKm(lat, lon, kaaba.lat, kaaba.lon) };
}

/** Tarihi ondalık yıla çevirir (WMM zaman girdisi). */
export function decimalYear(date) {
  const y = date.getUTCFullYear();
  const start = Date.UTC(y, 0, 1), end = Date.UTC(y + 1, 0, 1);
  return y + (date.getTime() - start) / (end - start);
}

// ---------------------------------------------------------------------------
// WMM2025 katsayıları: n, m, g, h, ġ, ḣ (nT, nT/yıl). Kaynak: NOAA/NCEI WMM.COF
// (başlık "2025.0 WMM-2025 11/13/2024"), ABD kamu malı.
const WMM_EPOCH = 2025.0;
const WMM_VALID_TO = 2030.0;
const COF = [
[1,0,-29351.8,0,12,0],[1,1,-1410.8,4545.4,9.7,-21.5],[2,0,-2556.6,0,-11.6,0],[2,1,2951.1,-3133.6,-5.2,-27.7],[2,2,1649.3,-815.1,-8,-12.1],[3,0,1361,0,-1.3,0],[3,1,-2404.1,-56.6,-4.2,4],[3,2,1243.8,237.5,0.4,-0.3],[3,3,453.6,-549.5,-15.6,-4.1],[4,0,895,0,-1.6,0],[4,1,799.5,278.6,-2.4,-1.1],[4,2,55.7,-133.9,-6,4.1],[4,3,-281.1,212,5.6,1.6],[4,4,12.1,-375.6,-7,-4.4],[5,0,-233.2,0,0.6,0],[5,1,368.9,45.4,1.4,-0.5],[5,2,187.2,220.2,0,2.2],[5,3,-138.7,-122.9,0.6,0.4],[5,4,-142,43,2.2,1.7],[5,5,20.9,106.1,0.9,1.9],[6,0,64.4,0,-0.2,0],[6,1,63.8,-18.4,-0.4,0.3],[6,2,76.9,16.8,0.9,-1.6],[6,3,-115.7,48.8,1.2,-0.4],[6,4,-40.9,-59.8,-0.9,0.9],[6,5,14.9,10.9,0.3,0.7],[6,6,-60.7,72.7,0.9,0.9],[7,0,79.5,0,0,0],[7,1,-77,-48.9,-0.1,0.6],[7,2,-8.8,-14.4,-0.1,0.5],[7,3,59.3,-1,0.5,-0.8],[7,4,15.8,23.4,-0.1,0],[7,5,2.5,-7.4,-0.8,-1],[7,6,-11.1,-25.1,-0.8,0.6],[7,7,14.2,-2.3,0.8,-0.2],[8,0,23.2,0,-0.1,0],[8,1,10.8,7.1,0.2,-0.2],[8,2,-17.5,-12.6,0,0.5],[8,3,2,11.4,0.5,-0.4],[8,4,-21.7,-9.7,-0.1,0.4],[8,5,16.9,12.7,0.3,-0.5],[8,6,15,0.7,0.2,-0.6],[8,7,-16.8,-5.2,0,0.3],[8,8,0.9,3.9,0.2,0.2],[9,0,4.6,0,0,0],[9,1,7.8,-24.8,-0.1,-0.3],[9,2,3,12.2,0.1,0.3],[9,3,-0.2,8.3,0.3,-0.3],[9,4,-2.5,-3.3,-0.3,0.3],[9,5,-13.1,-5.2,0,0.2],[9,6,2.4,7.2,0.3,-0.1],[9,7,8.6,-0.6,-0.1,-0.2],[9,8,-8.7,0.8,0.1,0.4],[9,9,-12.9,10,-0.1,0.1],[10,0,-1.3,0,0.1,0],[10,1,-6.4,3.3,0,0],[10,2,0.2,0,0.1,0],[10,3,2,2.4,0.1,-0.2],[10,4,-1,5.3,0,0.1],[10,5,-0.6,-9.1,-0.3,-0.1],[10,6,-0.9,0.4,0,0.1],[10,7,1.5,-4.2,-0.1,0],[10,8,0.9,-3.8,-0.1,-0.1],[10,9,-2.7,0.9,0,0.2],[10,10,-3.9,-9.1,0,0],[11,0,2.9,0,0,0],[11,1,-1.5,0,0,0],[11,2,-2.5,2.9,0,0.1],[11,3,2.4,-0.6,0,0],[11,4,-0.6,0.2,0,0.1],[11,5,-0.1,0.5,-0.1,0],[11,6,-0.6,-0.3,0,0],[11,7,-0.1,-1.2,0,0.1],[11,8,1.1,-1.7,-0.1,0],[11,9,-1,-2.9,-0.1,0],[11,10,-0.2,-1.8,-0.1,0],[11,11,2.6,-2.3,-0.1,0],[12,0,-2,0,0,0],[12,1,-0.2,-1.3,0,0],[12,2,0.3,0.7,0,0],[12,3,1.2,1,0,-0.1],[12,4,-1.3,-1.4,0,0.1],[12,5,0.6,0,0,0],[12,6,0.6,0.6,0.1,0],[12,7,0.5,-0.1,0,0],[12,8,-0.1,0.8,0,0],[12,9,-0.4,0.1,0,0],[12,10,-0.2,-1,-0.1,0],[12,11,-1.3,0.1,0,0],[12,12,-0.7,0.2,-0.1,-0.1]
];
const NMAX = 12;

// Schmidt yarı-normalleştirme çarpanları (bir kez hesaplanır).
const SCHMIDT = (() => {
  const s = [];
  for (let n = 0; n <= NMAX; n++) s.push(new Array(NMAX + 1).fill(0));
  s[0][0] = 1;
  for (let n = 1; n <= NMAX; n++) {
    s[n][0] = s[n - 1][0] * (2 * n - 1) / n;
    for (let m = 1; m <= n; m++) s[n][m] = s[n][m - 1] * Math.sqrt((n - m + 1) * (m === 1 ? 2 : 1) / (n + m));
  }
  return s;
})();

/**
 * WMM2025 ile manyetik alan bileşenleri ve sapma (deklinasyon).
 * lat/lon jeodezik derece, altKm WGS84 elipsoidi üstü yükseklik, year ondalık yıl.
 * Dönen dec: doğuya pozitif derece (manyetik kuzey gerçek kuzeyin doğusundaysa +).
 */
export function wmm(lat, lon, year, altKm = 0) {
  const a = 6378.137, f = 1 / 298.257223563, e2 = f * (2 - f), re = 6371.2;
  const phi = lat * RAD, lam = lon * RAD;
  const sp = Math.sin(phi), cp = Math.cos(phi);
  const rc = a / Math.sqrt(1 - e2 * sp * sp);
  const p = (rc + altKm) * cp, z = (rc * (1 - e2) + altKm) * sp;
  const r = Math.hypot(p, z);
  const phiC = Math.asin(z / r); // jeosentrik enlem
  const ct = Math.sin(phiC), st = Math.cos(phiC); // θ = kutup uzaklığı
  const dt = year - WMM_EPOCH;
  // Gauss normalleştirilmiş Legendre fonksiyonları ve θ'ya göre türevleri
  const P = [], dP = [];
  for (let n = 0; n <= NMAX; n++) { P.push(new Array(NMAX + 1).fill(0)); dP.push(new Array(NMAX + 1).fill(0)); }
  P[0][0] = 1;
  for (let n = 1; n <= NMAX; n++) {
    for (let m = 0; m <= n; m++) {
      if (n === m) {
        P[n][m] = st * P[n - 1][m - 1];
        dP[n][m] = st * dP[n - 1][m - 1] + ct * P[n - 1][m - 1];
      } else if (n === 1 && m === 0) {
        P[n][m] = ct * P[n - 1][m];
        dP[n][m] = ct * dP[n - 1][m] - st * P[n - 1][m];
      } else {
        const k = n > 1 ? ((n - 1) ** 2 - m * m) / ((2 * n - 1) * (2 * n - 3)) : 0;
        const p2 = m <= n - 2 ? P[n - 2][m] : 0, d2 = m <= n - 2 ? dP[n - 2][m] : 0;
        P[n][m] = ct * P[n - 1][m] - k * p2;
        dP[n][m] = ct * dP[n - 1][m] - st * P[n - 1][m] - k * d2;
      }
    }
  }
  let Xp = 0, Yp = 0, Zp = 0;
  const ar = re / r;
  for (const [n, m, g0, h0, gd, hd] of COF) {
    const g = (g0 + dt * gd) * SCHMIDT[n][m], h = (h0 + dt * hd) * SCHMIDT[n][m];
    const cm = Math.cos(m * lam), sm = Math.sin(m * lam);
    const arn = ar ** (n + 2);
    const t1 = g * cm + h * sm, t2 = g * sm - h * cm;
    // dP, θ'ya (kutup uzaklığı) göre türevdir: X' = −B_θ = +Σ …·dP/dθ ; Z' (aşağı) = −B_r
    Xp += arn * t1 * dP[n][m];
    Yp += arn * m * t2 * P[n][m];
    Zp -= (n + 1) * arn * t1 * P[n][m];
  }
  Yp = st > 1e-10 ? Yp / st : 0;
  const psi = phiC - phi;
  const X = Xp * Math.cos(psi) - Zp * Math.sin(psi);
  const Y = Yp;
  const Z = Xp * Math.sin(psi) + Zp * Math.cos(psi);
  const H = Math.hypot(X, Y);
  return { X, Y, Z, H, dec: Math.atan2(Y, X) * DEG, inc: Math.atan2(Z, H) * DEG, valid: year >= WMM_EPOCH && year < WMM_VALID_TO };
}

/** Kısa yol: yalnız manyetik sapma (derece, doğu +). */
export function magneticDeclination(lat, lon, date = new Date()) {
  return wmm(lat, lon, decimalYear(date)).dec;
}

/** Gerçek kuzeye göre açıyı pusula (manyetik kuzey) açısına çevirir. */
export function trueToMagnetic(trueDeg, dec) {
  return norm360(trueDeg - dec);
}

// ---------------------------------------------------------------------------
// Güneş konumu (NOAA güneş hesaplayıcısı denklemleri)

function julianDay(ms) { return ms / 86400000 + 2440587.5; }

/** Güneşin dik açıklığı (δ, derece) ve zaman denklemi (dakika). */
export function sunCoords(ms) {
  const T = (julianDay(ms) - 2451545) / 36525;
  const L0 = norm360(280.46646 + T * (36000.76983 + T * 0.0003032));
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * RAD) * 0.000289;
  const omega = 125.04 - 1934.136 * T;
  const lambda = L0 + C - 0.00569 - 0.00478 * Math.sin(omega * RAD);
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(omega * RAD);
  const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD)) * DEG;
  const y = Math.tan(eps * RAD / 2) ** 2;
  const eot = 4 * DEG * (y * Math.sin(2 * L0 * RAD) - 2 * e * Math.sin(M * RAD) + 4 * e * y * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD)
    - 0.5 * y * y * Math.sin(4 * L0 * RAD) - 1.25 * e * e * Math.sin(2 * M * RAD));
  return { decl, eot };
}

/** Verilen an (ms, UTC) ve konum için güneşin azimutu (kuzeyden saat yönü) ve yüksekliği (derece). */
export function sunPosition(ms, lat, lon) {
  const { decl, eot } = sunCoords(ms);
  const d = new Date(ms);
  const utcMin = d.getUTCHours() * 60 + d.getUTCMinutes() + d.getUTCSeconds() / 60 + d.getUTCMilliseconds() / 60000;
  const tst = utcMin + eot + 4 * lon;
  const H = (tst / 4 - 180) * RAD;
  const phi = lat * RAD, del = decl * RAD;
  const cosZ = Math.sin(phi) * Math.sin(del) + Math.cos(phi) * Math.cos(del) * Math.cos(H);
  const elev = 90 - Math.acos(Math.max(-1, Math.min(1, cosZ))) * DEG;
  const az = norm360(Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(del) * Math.cos(phi)) * DEG + 180);
  return { azimuth: az, elevation: elev, decl, eot };
}

/**
 * "Kıble saati": güneşin kıble yönünde (azimut = kıble açısı) olduğu an(lar).
 * dayStartMs: yerel günün başlangıcı (UTC ms). Güneş ufkun üstünde olmalı.
 */
export function qiblaSunTimes(dayStartMs, lat, lon, bearing) {
  const out = [];
  const step = 60000;
  let prev = null;
  for (let t = dayStartMs; t <= dayStartMs + 86400000; t += step) {
    const s = sunPosition(t, lat, lon);
    const cur = { t, d: angleDiff(bearing, s.azimuth), el: s.elevation };
    if (prev && prev.el > 0 && cur.el > 0 && Math.sign(prev.d) !== Math.sign(cur.d) && Math.abs(prev.d - cur.d) < 90) {
      let lo = prev.t, hi = cur.t, dlo = prev.d;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const dm = angleDiff(bearing, sunPosition(mid, lat, lon).azimuth);
        if (Math.sign(dm) === Math.sign(dlo)) { lo = mid; dlo = dm; } else hi = mid;
      }
      const tt = (lo + hi) / 2;
      out.push({ ms: tt, elevation: sunPosition(tt, lat, lon).elevation });
    }
    prev = cur;
  }
  return out;
}

/**
 * Güneşin Kâbe'nin tam üstünden geçtiği (öğle anında dik açıklığı Kâbe enlemine en yakın) iki gün
 * ve o günlerde Mekke'de güneşin meridyenden geçiş saati (UTC+3).
 */
export function sunOverKaaba(year, kaaba = KAABA) {
  const res = [];
  const transit = (dayUtcMs) => {
    // Mekke'de gerçek öğle (UTC): 720 − 4·boylam − zaman denklemi (iki adım yineleme)
    let t = dayUtcMs + (720 - 4 * kaaba.lon) * 60000;
    for (let i = 0; i < 3; i++) t = dayUtcMs + (720 - 4 * kaaba.lon - sunCoords(t).eot) * 60000;
    return t;
  };
  let prev = null;
  for (let doy = 100; doy < 260; doy++) {
    const day = Date.UTC(year, 0, 1) + doy * 86400000;
    const tr = transit(day);
    const diff = sunCoords(tr).decl - kaaba.lat;
    const cur = { tr, diff };
    if (prev && Math.sign(prev.diff) !== Math.sign(cur.diff)) {
      const best = Math.abs(prev.diff) <= Math.abs(cur.diff) ? prev : cur;
      res.push({ ms: best.tr, declDiff: best.diff });
    }
    prev = cur;
  }
  return res;
}

/** UTC ms'yi sabit dakika ofsetiyle "SS:DD" biçimine getirir (yuvarlayarak). */
export function hhmm(ms, offsetMin) {
  const d = new Date(Math.round((ms + offsetMin * 60000) / 60000) * 60000);
  return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0');
}

/**
 * Cihaz yönelim olayından pusula başlığı (gerçek değil manyetik kuzeye göre, derece).
 * iOS: webkitCompassHeading (zaten saat yönü, manyetik). Diğerleri: absolute alpha → 360 − alpha.
 * screenAngle: screen.orientation.angle (0, 90, 180, 270) — ekran döndüyse düzeltilir.
 */
export function headingFromEvent(ev, screenAngle = 0) {
  let h = null;
  if (ev && typeof ev.webkitCompassHeading === 'number' && Number.isFinite(ev.webkitCompassHeading)) {
    h = ev.webkitCompassHeading; // iOS ekran yönünü kendisi hesaba katmaz
  } else if (ev && ev.absolute === true && typeof ev.alpha === 'number' && Number.isFinite(ev.alpha)) {
    h = 360 - ev.alpha;
  } else {
    return null;
  }
  return norm360(h + (Number(screenAngle) || 0));
}
