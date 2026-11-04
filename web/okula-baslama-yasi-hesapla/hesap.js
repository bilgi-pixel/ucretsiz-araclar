// Okula başlama yaşı hesabı — saf mantık (DOM yok). MEB bilgilendirme tablosuna göre, ay bazlı.

/** Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'MEB 2026-2027 eğitim öğretim yılı "Okula Kayıt - Başlama Yaşı Bilgilendirme Tablosu" (il/ilçe milli eğitim müdürlükleri ve okul sitelerinde 8 Temmuz 2026 tarihli yayın); 30 Eylül itibarıyla ay hesabı. 2027-2028 için MEB yeni duyuru yapana kadar aynı eşikler varsayılmıştır.',
  yaklasik: true,
  egitimYillari: [
    { ad: '2026-2027', ref: '2026-09-30', kesin: true },
    { ad: '2027-2028', ref: '2027-09-30', kesin: false },
  ],
  // ay >= enAz olan ilk eşik uygulanır (büyükten küçüğe)
  esikler: [
    { enAz: 72, kod: 'zorunlu', baslik: 'İlkokul 1. sınıf: zorunlu', metin: 'İlkokula kayıt zorunludur. Erteleme yalnızca Rehberlik ve Araştırma Merkezi (RAM) kararıyla yapılabilir.' },
    { enAz: 69, kod: 'ertelenebilir', baslik: 'İlkokul 1. sınıf: kayıt çıkar, veli ertelettirebilir', metin: 'Çocuk normalde ilkokul kaydına çıkar; veli yazılı dilekçeyle kaydı 1 yıl erteleyip çocuğu anaokuluna yönlendirebilir.' },
    { enAz: 66, kod: 'istege', baslik: 'İlkokul zorunlu değil: veli dilekçesiyle 1. sınıf, aksi halde anaokulu', metin: 'Öncelikle anaokuluna yönlendirilir; velinin yazılı talebi (dilekçe) olursa 1. sınıfa başlatılabilir.' },
    { enAz: 60, kod: 'anaokulu5', baslik: 'Anaokulu / anasınıfı: 5 yaş grubu', metin: 'Doğrudan anaokulu 5 yaş grubuna kayıt hakkı vardır. İlkokula kaydedilemez.' },
    { enAz: 48, kod: 'anaokulu4', baslik: 'Anaokulu: 4 yaş grubu (kontenjana bağlı)', metin: 'Öncelikli yaş grupları yerleştikten sonra boş kontenjan kalırsa 4 yaş grubuna kaydedilebilir.' },
    { enAz: 36, kod: 'anaokulu3', baslik: 'Anaokulu: 3 yaş grubu (okulun imkanına bağlı)', metin: 'Okulun fiziki imkanı ve kontenjanına göre 3 yaş grubuna kabul edilebilir.' },
    { enAz: 0, kod: 'kucuk', baslik: 'Devlet anaokuluna kayıt yok (35 ay ve altı)', metin: 'Bu yaşta MEB\'e bağlı resmî anaokullarına kayıt yapılamaz.' },
  ],
};

const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayNumber = (d) => Math.round(Date.UTC(d.y, d.m - 1, d.d) / 86400000);

export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() }; }

/** Başlangıçtan bitişe tam yıl/ay/gün (a <= b). */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => { const t = a.m - 1 + n; const y = a.y + Math.floor(t / 12), m = ((t % 12) + 12) % 12 + 1; return { y, m, d: Math.min(a.d, daysInMonth(y, m)) }; };
  let an = anniv(months);
  if (dayNumber(an) > dayNumber(b)) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, totalMonths: months, days: dayNumber(b) - dayNumber(an) };
}

/** MEB'in kullandığı ay hesabı: doğum ayı ile referans ayı arasındaki ay farkı (gün dikkate alınmaz). */
export function mebMonths(birth, ref) {
  return (ref.y - birth.y) * 12 + (ref.m - birth.m);
}

/** Tek eğitim yılı için durum. */
export function statusFor(birth, year, P = DEFAULTS) {
  const ref = parseISO(year.ref);
  if (dayNumber(birth) > dayNumber(ref)) {
    return { year, ref, months: null, exact: null, kod: 'dogmamis', baslik: 'Bu eğitim yılında kayıt yaşına gelmiyor', metin: 'Doğum tarihi bu kayıt dönemi referansından (30 Eylül) sonra. Sonraki yılları inceleyin.' };
  }
  const months = mebMonths(birth, ref);
  const rule = P.esikler.find((r) => months >= r.enAz) || P.esikler[P.esikler.length - 1];
  return { year, ref, months, exact: diffYMD(birth, ref), kod: rule.kod, baslik: rule.baslik, metin: rule.metin };
}

/** Tüm yıllar için sonuç; ilk "ilkokul" olabilecek yılı da işaretler. */
export function computeSchoolAge(birth, today, P = DEFAULTS) {
  if (!birth) throw new Error('Doğum tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin (örn. 15.03.2021).');
  if (birth.y < 2000) throw new Error('Doğum yılı 2000\'den önce olamaz; bu araç anaokulu ve ilkokul kaydı içindir. Yılı kontrol edin.');
  if (birth.y > today.y + 3) throw new Error('Doğum tarihi çok ileri bir tarih. Çocuğun doğum tarihini yeniden seçin.');
  const rows = P.egitimYillari.map((y) => statusFor(birth, y, P));
  const first = rows.find((r) => ['zorunlu', 'ertelenebilir', 'istege'].includes(r.kod));
  const now = dayNumber(birth) <= dayNumber(today) ? diffYMD(birth, today) : null;
  return { rows, firstSchool: first || null, nowAge: now };
}
