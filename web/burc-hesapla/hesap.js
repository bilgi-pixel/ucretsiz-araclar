// Burç hesaplama mantığı (saf JS, DOM yok). Tamamı eğlence amaçlıdır; bilimsel değildir.
export const SIGNS = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak', 'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'];
export const ELEMENTS = ['Ateş', 'Toprak', 'Hava', 'Su', 'Ateş', 'Toprak', 'Hava', 'Su', 'Ateş', 'Toprak', 'Hava', 'Su']; // SIGNS sırasıyla

// Ay -> [geçiş günü, geçiş öncesi burç, geçiş sonrası burç] (geleneksel tarih aralıkları)
const CUTS = {
  1: [20, 'Oğlak', 'Kova'], 2: [19, 'Kova', 'Balık'], 3: [21, 'Balık', 'Koç'], 4: [20, 'Koç', 'Boğa'],
  5: [21, 'Boğa', 'İkizler'], 6: [21, 'İkizler', 'Yengeç'], 7: [23, 'Yengeç', 'Aslan'], 8: [23, 'Aslan', 'Başak'],
  9: [23, 'Başak', 'Terazi'], 10: [23, 'Terazi', 'Akrep'], 11: [22, 'Akrep', 'Yay'], 12: [22, 'Yay', 'Oğlak'],
};

/** Güneş burcu; geçiş gününe yakınsa borderline=true ve diğer olası burç döner. */
export function sunSign(m, d) {
  const [cut, before, after] = CUTS[m];
  const sign = d < cut ? before : after;
  const borderline = d === cut - 1 || d === cut;
  return { sign, borderline, other: sign === before ? after : before };
}

/* ---------- Astronomi ---------- */
const rad = (x) => (x * Math.PI) / 180;
const deg = (x) => (x * 180) / Math.PI;
const mod = (x, n) => ((x % n) + n) % n;

/** UTC tarih/saatten Jülyen gün. */
export function julianDay(y, m, d, hour) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + hour / 24 + B - 1524.5;
}

/**
 * Yükselen burç (ascendant) ekliptik boylamı, derece cinsinden.
 * utcMs: doğum anı (UTC ms), lat: enlem, lon: boylam (doğu pozitif).
 */
export function ascendantLongitude(utcMs, lat, lon) {
  const t = new Date(utcMs);
  const jd = julianDay(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours() + t.getUTCMinutes() / 60 + t.getUTCSeconds() / 3600);
  const T = (jd - 2451545.0) / 36525;
  const gmst = mod(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T, 360);
  const ramc = rad(mod(gmst + lon, 360)); // yerel yıldız zamanı
  const eps = rad(23.4392911 - 0.0130042 * T); // ekliptiğin eğikliği
  const phi = rad(lat);
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)));
  return mod(deg(asc), 360);
}

const lastSunday = (y, monthIdx) => { const e = new Date(Date.UTC(y, monthIdx + 1, 0)); return e.getUTCDate() - e.getUTCDay(); };
/** Türkiye için yaklaşık UTC farkı: 2016-09-07 sonrası +3 sürekli; öncesinde +2, yaz saatinde +3. */
export function turkeyOffset(y, m, d) {
  const n = y * 10000 + m * 100 + d;
  if (n >= 20160907) return 3;
  const start = y * 10000 + 300 + lastSunday(y, 2), end = y * 10000 + 1000 + lastSunday(y, 9);
  return n >= start && n < end ? 3 : 2;
}

/** Yükselen burç: {index, sign, degree, nearEdge}. */
export function ascendantSign(y, m, d, hh, mm, offsetHours, lat, lon) {
  const utcMs = Date.UTC(y, m - 1, d, hh, mm) - offsetHours * 3600000;
  const lng = ascendantLongitude(utcMs, lat, lon);
  const index = Math.floor(lng / 30), degree = lng - index * 30;
  return { index, sign: SIGNS[index], degree, nearEdge: degree < 2 || degree > 28, longitude: lng };
}

/* ---------- Çin burcu ---------- */
export const ANIMALS = ['Fare', 'Öküz', 'Kaplan', 'Tavşan', 'Ejderha', 'Yılan', 'At', 'Koyun', 'Maymun', 'Horoz', 'Köpek', 'Domuz'];
export const CN_ELEMENTS = ['Ağaç', 'Ateş', 'Toprak', 'Metal', 'Su'];

/** Çin yeni yılının yaklaşık tarihi (ortalama yeniay; ±1 gün sapabilir). */
export function chineseNewYear(y) {
  const base = 2451550.26, syn = 29.530588861; // 2000-01-06 yeniayı, sinodik ay
  const k0 = Math.floor((julianDay(y, 1, 10, 0) - base) / syn), k1 = Math.floor((julianDay(y, 3, 1, 0) - base) / syn) + 1;
  for (let k = k0; k <= k1; k++) {
    const jd = base + k * syn + 8 / 24; // Çin saati (UTC+8)
    const t = new Date((jd - 2440587.5) * 86400000);
    const key = (t.getUTCMonth() + 1) * 100 + t.getUTCDate();
    if (t.getUTCFullYear() === y && key >= 121 && key <= 220) return { y, m: t.getUTCMonth() + 1, d: t.getUTCDate() };
  }
  return { y, m: 2, d: 1 };
}

/** Çin burcu: yıl Çin yeni yılına göre belirlenir. Ocak/Şubat doğumlarında tarih sapması için belirsizlik bayrağı döner. */
export function chineseSign(y, m, d) {
  let cy = y, uncertain = false, newYear = null;
  if (m <= 2 || (m === 3 && d <= 1)) {
    newYear = chineseNewYear(y);
    const dn = (a) => Date.UTC(a.y, a.m - 1, a.d) / 86400000;
    const diff = dn({ y, m, d }) - dn(newYear);
    if (diff < 0) cy = y - 1;
    // Yaklaşık yeniay hesabı en fazla bir gün sapabilir; pencerenin ucundaki yıllarda (21-23 Ocak) tüm Ocak/Şubat doğumları belirsiz sayılır.
    uncertain = Math.abs(diff) <= 1 || (newYear.m === 1 && newYear.d <= 23);
  }
  const a = mod(cy - 4, 12), e = mod(cy - 4, 10);
  return { year: cy, animal: ANIMALS[a], element: CN_ELEMENTS[Math.floor(e / 2)], uncertain, newYear };
}

/* ---------- Uyum (eğlence) ---------- */
/** Element temelli basit uyum: aynı element, tamamlayıcı (ateş-hava, toprak-su) ya da farklı tempo. */
export function compat(i, j) {
  const a = ELEMENTS[i], b = ELEMENTS[j];
  if (i === j) return { level: 'Ayna', text: 'Aynı burç: birbirinizi çok iyi anlarsınız, aynı huyları da büyütürsünüz.' };
  if (a === b) return { level: 'Çok uyumlu', text: `Aynı element (${a}): benzer bir enerji ve ortak tempo.` };
  const pair = [a, b].sort().join('+');
  if (pair === 'Ateş+Hava' || pair === 'Su+Toprak') return { level: 'Uyumlu', text: `${a} ve ${b} birbirini besler; farklılıklar tamamlayıcı olabilir.` };
  return { level: 'Farklı tempo', text: `${a} ve ${b} ritimleri ayrışır; anlayış ve sabırla keyifli bir denge kurulur.` };
}

/* ---------- Burç özellikleri (özgün, kısa, eğlence amaçlı) ---------- */
export const TRAITS = {
  'Koç': 'Girişken, hızlı karar veren ve yeni başlangıçları seven bir enerji. Sabırsızlık ve doğrudanlık öne çıkar; rekabetçi ortamlarda parlar.',
  'Boğa': 'Sakin, güvenilir ve konfora düşkün. Bir kez karar verdiğinde ısrarcıdır; güzel yemek, müzik ve düzenli bir yaşam keyif verir.',
  'İkizler': 'Meraklı, konuşkan ve çok yönlü. Bilgiyi ve yeni insanları sever; ilgi alanları hızla değişebilir, esprili bir iletişimi vardır.',
  'Yengeç': 'Duygusal, koruyucu ve sezgisi güçlü. Aile ve yuva önemlidir; güvende hissettiğinde cömert, kırıldığında içine kapanır.',
  'Aslan': 'Cömert, özgüvenli ve sıcak kanlı. Sahnede olmayı, takdir edilmeyi ve sevdiklerini şımartmayı sever; gururu hassas bir noktasıdır.',
  'Başak': 'Titiz, analitik ve yardımsever. Ayrıntıları fark eder, düzen kurar; kendine yönelik eleştirisi sert olabilir.',
  'Terazi': 'Uyumlu, nazik ve adalet duygusu yüksek. Estetiği ve dengeyi sever; karar verirken seçenekleri uzun uzun tartabilir.',
  'Akrep': 'Yoğun, kararlı ve gizemli. Derin bağlar kurar, sadakati önemser; merakı ve odaklanma gücü etkileyicidir.',
  'Yay': 'İyimser, özgür ruhlu ve maceraperest. Seyahati, felsefi sohbetleri ve açık sözlülüğü sever; rutin ve sınırlamalardan hoşlanmaz.',
  'Oğlak': 'Disiplinli, sorumluluk sahibi ve hedef odaklı. Adım adım ilerler, sabırla başarır; bazen kendini fazla ciddiye alır.',
  'Kova': 'Bağımsız, yenilikçi ve ilkeli. Farklı düşünmekten çekinmez, topluma faydalı fikirlere ilgi duyar; duygularını mesafeli ifade edebilir.',
  'Balık': 'Hayalperest, empatik ve yaratıcı. Müzik, sanat ve sezgiyle arası iyidir; sınır koymakta ve gerçekçi planda zorlanabilir.',
};

/* ---------- Şehir tablosu: [ad, enlem, boylam] ---------- */
export const CITIES_TR = [
  ['Adana', 37.00, 35.32], ['Adıyaman', 37.76, 38.28], ['Afyonkarahisar', 38.75, 30.54], ['Ağrı', 39.72, 43.05], ['Aksaray', 38.37, 34.04],
  ['Amasya', 40.65, 35.83], ['Ankara', 39.93, 32.86], ['Antalya', 36.89, 30.71], ['Ardahan', 41.11, 42.70], ['Artvin', 41.18, 41.82],
  ['Aydın', 37.85, 27.84], ['Balıkesir', 39.65, 27.89], ['Bartın', 41.64, 32.34], ['Batman', 37.88, 41.13], ['Bayburt', 40.26, 40.22],
  ['Bilecik', 40.14, 29.98], ['Bingöl', 38.88, 40.50], ['Bitlis', 38.40, 42.11], ['Bolu', 40.73, 31.61], ['Burdur', 37.72, 30.29],
  ['Bursa', 40.19, 29.06], ['Çanakkale', 40.15, 26.41], ['Çankırı', 40.60, 33.62], ['Çorum', 40.55, 34.95], ['Denizli', 37.78, 29.09],
  ['Diyarbakır', 37.91, 40.24], ['Düzce', 40.84, 31.16], ['Edirne', 41.68, 26.56], ['Elazığ', 38.67, 39.22], ['Erzincan', 39.75, 39.49],
  ['Erzurum', 39.90, 41.27], ['Eskişehir', 39.78, 30.52], ['Gaziantep', 37.07, 37.38], ['Giresun', 40.91, 38.39], ['Gümüşhane', 40.46, 39.48],
  ['Hakkâri', 37.58, 43.74], ['Hatay', 36.40, 36.35], ['Iğdır', 39.92, 44.05], ['Isparta', 37.76, 30.55], ['İstanbul', 41.01, 28.98],
  ['İzmir', 38.42, 27.14], ['Kahramanmaraş', 37.58, 36.94], ['Karabük', 41.20, 32.62], ['Karaman', 37.18, 33.22], ['Kars', 40.60, 43.10],
  ['Kastamonu', 41.38, 33.78], ['Kayseri', 38.73, 35.49], ['Kilis', 36.72, 37.12], ['Kırıkkale', 39.85, 33.52], ['Kırklareli', 41.74, 27.23],
  ['Kırşehir', 39.15, 34.16], ['Kocaeli', 40.77, 29.92], ['Konya', 37.87, 32.48], ['Kütahya', 39.42, 29.98], ['Malatya', 38.35, 38.31],
  ['Manisa', 38.61, 27.43], ['Mardin', 37.31, 40.74], ['Mersin', 36.80, 34.64], ['Muğla', 37.22, 28.36], ['Muş', 38.74, 41.49],
  ['Nevşehir', 38.63, 34.71], ['Niğde', 37.97, 34.68], ['Ordu', 40.98, 37.88], ['Osmaniye', 37.07, 36.25], ['Rize', 41.02, 40.52],
  ['Sakarya', 40.74, 30.40], ['Samsun', 41.29, 36.33], ['Siirt', 37.93, 41.94], ['Sinop', 42.03, 35.15], ['Sivas', 39.75, 37.02],
  ['Şanlıurfa', 37.16, 38.79], ['Şırnak', 37.52, 42.46], ['Tekirdağ', 41.00, 27.51], ['Tokat', 40.31, 36.55], ['Trabzon', 41.00, 39.72],
  ['Tunceli', 39.11, 39.55], ['Uşak', 38.68, 29.41], ['Van', 38.49, 43.38], ['Yalova', 40.65, 29.27], ['Yozgat', 39.82, 34.81],
  ['Zonguldak', 41.46, 31.80],
];
// Yurt dışı: ad, enlem, boylam, standart UTC farkı (yaz saati dahil değildir)
export const CITIES_WORLD = [
  ['Berlin (Almanya)', 52.52, 13.41, 1], ['Londra (Birleşik Krallık)', 51.51, -0.13, 0], ['Paris (Fransa)', 48.86, 2.35, 1],
  ['Amsterdam (Hollanda)', 52.37, 4.90, 1], ['Brüksel (Belçika)', 50.85, 4.35, 1], ['Viyana (Avusturya)', 48.21, 16.37, 1],
  ['Roma (İtalya)', 41.90, 12.50, 1], ['Madrid (İspanya)', 40.42, -3.70, 1], ['Atina (Yunanistan)', 37.98, 23.73, 2],
  ['Sofya (Bulgaristan)', 42.70, 23.32, 2], ['Saraybosna (Bosna Hersek)', 43.86, 18.41, 1], ['Üsküp (Kuzey Makedonya)', 41.99, 21.43, 1],
  ['Lefkoşa (KKTC)', 35.19, 33.38, 2], ['Bakü (Azerbaycan)', 40.41, 49.87, 4], ['Moskova (Rusya)', 55.76, 37.62, 3],
  ['Tahran (İran)', 35.69, 51.39, 3.5], ['Bağdat (Irak)', 33.31, 44.37, 3], ['Şam (Suriye)', 33.51, 36.29, 3],
  ['Kahire (Mısır)', 30.04, 31.24, 2], ['Riyad (Suudi Arabistan)', 24.71, 46.68, 3], ['Dubai (BAE)', 25.20, 55.27, 4],
  ['New York (ABD)', 40.71, -74.01, -5], ['Los Angeles (ABD)', 34.05, -118.24, -8], ['Toronto (Kanada)', 43.65, -79.38, -5],
  ['Pekin (Çin)', 39.90, 116.41, 8], ['Tokyo (Japonya)', 35.68, 139.69, 9], ['Sidney (Avustralya)', -33.87, 151.21, 10],
];
