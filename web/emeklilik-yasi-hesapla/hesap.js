// Emeklilik yaşı ve şartları hesabı — saf mantık (DOM yok); tarayıcıda ve Node'da çalışır.
// Bilgilendirme amaçlıdır; SGK hizmet dökümü esastır.

/** Varsayılan parametreler; parametreler.json yüklenemezse bunlar kullanılır. */
export const DEFAULTS = {
  guncelleme: '2026-11-04',
  kaynak: 'EYT: 5510 sayılı Kanun geçici md. 95 (7438 s. K., 1.3.2023) ve atıf yaptığı hükümler (mevzuat.gov.tr): 4/a için 506 s. K. geçici md. 81 (B) (kadın 20, erkek 25 yıl sigortalılık; prim günü 23.5.2002 tarihindeki sigortalılık süresine göre 5.000 ile 5.975 arası), 4/b için 1479 s. K. geçici md. 10 (kadın 20 tam yıl = 7.200 gün, erkek 25 tam yıl = 9.000 gün prim ödemi), 4/c için 5434 s. K. geçici md. 205 (kadın 20, erkek 25 fiili hizmet yılı). 8/9/1999-30/4/2008 arası girişler: 5510 geçici md. 9; sonrası: md. 28. Aylık/yaş sınırı hesabı değil, şart tarihi tahminidir.',
  yaklasik: false,
  eytSon: '1999-09-08',
  ref506: '2002-05-23', // 506 s. K. geçici md. 81 (B) bendinin esas aldığı tarih
  araSon: '2008-04-30',
  yilGunu: 360,
  temelYas: { kadin: 58, erkek: 60 },
  kademe: [
    { yil: 2036, kadin: 59, erkek: 61 },
    { yil: 2038, kadin: 60, erkek: 62 },
    { yil: 2040, kadin: 61, erkek: 63 },
    { yil: 2042, kadin: 62, erkek: 64 },
    { yil: 2044, kadin: 63, erkek: 65 },
    { yil: 2046, kadin: 64, erkek: 65 },
    { yil: 2048, kadin: 65, erkek: 65 },
  ],
  statuler: {
    a: { ad: '4/a (SSK, işçi)', eyt: { yil: { kadin: 20, erkek: 25 }, gun: { tablo: { kadin: [{ yil: 17, ay: 0, gun: 0, prim: 5000 }, { yil: 16, ay: 0, gun: 0, prim: 5075 }, { yil: 15, ay: 0, gun: 0, prim: 5150 }, { yil: 14, ay: 0, gun: 0, prim: 5225 }, { yil: 13, ay: 0, gun: 0, prim: 5300 }, { yil: 12, ay: 0, gun: 0, prim: 5375 }, { yil: 11, ay: 0, gun: 0, prim: 5450 }, { yil: 10, ay: 0, gun: 0, prim: 5525 }, { yil: 9, ay: 0, gun: 0, prim: 5600 }, { yil: 8, ay: 0, gun: 0, prim: 5675 }, { yil: 7, ay: 0, gun: 0, prim: 5750 }, { yil: 6, ay: 0, gun: 0, prim: 5825 }, { yil: 5, ay: 0, gun: 0, prim: 5900 }, { yil: 4, ay: 0, gun: 0, prim: 5975 }, { yil: 3, ay: 0, gun: 0, prim: 5975 }, { yil: 2, ay: 8, gun: 15, prim: 5975 }], erkek: [{ yil: 21, ay: 6, gun: 0, prim: 5000 }, { yil: 20, ay: 0, gun: 0, prim: 5075 }, { yil: 18, ay: 6, gun: 0, prim: 5150 }, { yil: 17, ay: 0, gun: 0, prim: 5225 }, { yil: 15, ay: 6, gun: 0, prim: 5300 }, { yil: 14, ay: 0, gun: 0, prim: 5375 }, { yil: 12, ay: 6, gun: 0, prim: 5450 }, { yil: 11, ay: 0, gun: 0, prim: 5525 }, { yil: 9, ay: 6, gun: 0, prim: 5600 }, { yil: 8, ay: 0, gun: 0, prim: 5675 }, { yil: 6, ay: 6, gun: 0, prim: 5750 }, { yil: 5, ay: 0, gun: 0, prim: 5825 }, { yil: 3, ay: 6, gun: 0, prim: 5900 }, { yil: 2, ay: 8, gun: 15, prim: 5975 }] } } }, ara: { gun: 7000, alt: { yil: 25, gun: 4500 } }, yeni: { gun: 7200 } },
    b: { ad: '4/b (Bağ-Kur, esnaf ve serbest çalışan)', eyt: { yil: { kadin: 20, erkek: 25 }, gun: { kadin: 7200, erkek: 9000 } }, ara: { gun: 9000 }, yeni: { gun: 9000 } },
    c: { ad: '4/c (memur)', eyt: { yil: { kadin: 20, erkek: 25 }, gun: null }, ara: { gun: 9000 }, yeni: { gun: 9000 } },
  },
};

/* ---------- Takvim yardımcıları (gün numarası üzerinden; saat dilimi kayması yok) ---------- */
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
export const daysInMonth = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
export const dayNumber = (d) => Math.round(Date.UTC(d.y, d.m - 1, d.d) / 86400000);
export const fromDayNumber = (n) => { const t = new Date(n * 86400000); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() }; };
export const addDays = (d, n) => fromDayNumber(dayNumber(d) + n);
export const addYears = (d, n) => ({ y: d.y + n, m: d.m, d: Math.min(d.d, daysInMonth(d.y + n, d.m)) });
export const maxDate = (...ds) => ds.reduce((a, b) => (dayNumber(b) > dayNumber(a) ? b : a));
export const minDate = (...ds) => ds.reduce((a, b) => (dayNumber(b) < dayNumber(a) ? b : a));
export const cmp = (a, b) => dayNumber(a) - dayNumber(b);

/** "YYYY-MM-DD" → {y,m,d}; geçersizse null. */
export function parseISO(s) {
  const mt = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!mt) return null;
  const y = +mt[1], m = +mt[2], d = +mt[3];
  if (m < 1 || m > 12 || d < 1 || d > daysInMonth(y, m)) return null;
  return { y, m, d };
}
export function todayLocal() { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() }; }

/** a → b yıl/ay/gün (a <= b). */
export function diffYMD(a, b) {
  let months = (b.y - a.y) * 12 + (b.m - a.m);
  const anniv = (n) => { const t = a.m - 1 + n; const y = a.y + Math.floor(t / 12), m = ((t % 12) + 12) % 12 + 1; return { y, m, d: Math.min(a.d, daysInMonth(y, m)) }; };
  let an = anniv(months);
  if (cmp(an, b) > 0) { months--; an = anniv(months); }
  return { years: Math.floor(months / 12), months: months % 12, days: dayNumber(b) - dayNumber(an) };
}

/** Prim şartının tamamlandığı yılın yaş haddi (md. 28/2-b kademesi). */
export function ageForYear(year, gender, P = DEFAULTS) {
  let age = P.temelYas[gender];
  for (const k of P.kademe) if (year >= k.yil) age = k[gender];
  return age;
}

/** EYT prim günü şartı: sayı, {kadin, erkek} ya da 506 geçici 81 (B) tablosu ({tablo}); şartsızsa null. */
export function eytPrimNeed(gun, gender, entry, P = DEFAULTS) {
  if (gun === null || gun === undefined) return null;
  if (typeof gun === 'number') return gun;
  if (gun.tablo) {
    // 23.5.2002 tarihindeki sigortalılık süresi (alt sınır dahil) hangi basamağa düşüyorsa onun gün şartı geçerlidir.
    const ref = parseISO(P.ref506);
    const d = cmp(entry, ref) < 0 ? diffYMD(entry, ref) : { years: 0, months: 0, days: 0 };
    const key = (d.years * 12 + d.months) * 31 + d.days;
    for (const r of gun.tablo[gender]) if (key >= (r.yil * 12 + r.ay) * 31 + r.gun) return r.prim;
    return gun.tablo[gender].at(-1).prim; // 2 yıl 8 ay 15 günden az görünürse en yüksek basamak
  }
  return gun[gender];
}

/** Hangi gruba girdiğini söyler: 'eyt' | 'ara' | 'yeni'. */
export function groupOf(entry, P = DEFAULTS) {
  if (cmp(entry, parseISO(P.eytSon)) <= 0) return 'eyt';
  if (cmp(entry, parseISO(P.araSon)) <= 0) return 'ara';
  return 'yeni';
}

/**
 * Şart tarihlerini hesaplar. Hata durumunda Türkçe, çözüm öneren Error fırlatır.
 * input: { status:'a'|'b'|'c', gender:'kadin'|'erkek', birth, entry, primDays|null, today } (tarihler {y,m,d})
 */
export function computeRetirement(input, P = DEFAULTS) {
  const { status, gender, birth, entry, today } = input;
  const primDays = input.primDays ?? null;
  const st = P.statuler[status];
  if (!st) throw new Error('Sigortalılık türünü seçin (4/a, 4/b veya 4/c).');
  if (!['kadin', 'erkek'].includes(gender)) throw new Error('Cinsiyeti seçin; yaş ve süre şartları cinsiyete göre değişir.');
  if (!birth) throw new Error('Doğum tarihi eksik ya da geçersiz. Gün, ay ve yılı eksiksiz seçin.');
  if (!entry) throw new Error('İlk sigorta giriş tarihi eksik ya da geçersiz. e-Devlet SGK hizmet dökümünüzdeki ilk işe giriş tarihini seçin.');
  if (birth.y < 1930) throw new Error('Doğum yılı 1930\'dan önce olamaz. Yılı kontrol edip yeniden seçin.');
  if (cmp(birth, today) >= 0) throw new Error('Doğum tarihi hesaplama tarihinden önce olmalı. Tarihi düzeltin.');
  if (cmp(entry, today) > 0) throw new Error('İlk sigorta giriş tarihi gelecekte olamaz. Hizmet dökümündeki tarihi yeniden kontrol edin.');
  if (cmp(addYears(birth, 12), entry) > 0) throw new Error('İlk sigorta giriş tarihi doğumdan en az 12 yıl sonra olmalı. Tarihleri kontrol edin.');
  if (primDays !== null && !(Number.isInteger(primDays) && primDays >= 0 && primDays <= 20000)) throw new Error('Prim gün sayısı geçersiz. 0 ile 20.000 arasında bir tam sayı yazın ya da alanı boş bırakın.');

  const group = groupOf(entry, P);
  const g = st[group];
  const notes = [];
  const bday = (a) => addYears(birth, a);

  /** Verilen prim günü şartının tamamlanma tarihi: {done, date} | null (prim günü girilmediyse). */
  const primDate = (need) => {
    if (need === null || need === undefined) return { done: true, date: today };
    if (primDays === null) return null;
    const rem = need - primDays;
    if (rem <= 0) return { done: true, date: today };
    return { done: false, date: addDays(today, Math.ceil((rem * 365) / P.yilGunu)) };
  };

  let ageReq = null, ageDate = null, sigDate = null, primNeed = group === 'eyt' ? eytPrimNeed(g.gun, gender, entry, P) : (g.gun ?? null), yearsNeed = null, pd, retire, usedAlt = false;

  if (group === 'eyt') {
    yearsNeed = g.yil[gender];
    sigDate = addYears(entry, yearsNeed);
    pd = primDate(primNeed);
    retire = pd ? maxDate(sigDate, pd.date) : sigDate;
    if (status === 'c') notes.push('4/c (memur) için hizmet yılı esas alınır; gün şartı hesaba katılmadı. Kesinlik için SGK hizmet dökümünüze bakın.');
  } else if (group === 'ara') {
    ageReq = P.temelYas[gender];
    ageDate = bday(ageReq);
    pd = primDate(g.gun);
    retire = pd ? maxDate(ageDate, pd.date) : ageDate;
    if (g.alt) {
      const pdAlt = primDate(g.alt.gun);
      const altSig = addYears(entry, g.alt.yil);
      const altDate = pdAlt ? maxDate(ageDate, altSig, pdAlt.date) : maxDate(ageDate, altSig);
      if (cmp(altDate, retire) < 0) { retire = altDate; usedAlt = true; sigDate = altSig; yearsNeed = g.alt.yil; primNeed = g.alt.gun; pd = pdAlt; }
      else notes.push(`Alternatif yol: ${g.alt.yil} yıl sigortalılık ve ${g.alt.gun.toLocaleString('tr-TR')} gün prim ile de yaş şartı dolunca aylık bağlanabilir.`);
    }
  } else {
    pd = primDate(g.gun);
    if (pd) {
      const year = pd.date.y;
      ageReq = ageForYear(year, gender, P);
      ageDate = bday(ageReq);
      retire = maxDate(ageDate, pd.date);
    } else {
      // Prim günü bilinmiyorsa: yaş kademesinin, yaş şartının dolduğu yılda geçerli olduğu varsayılır (iyimser tahmin).
      for (let a = P.temelYas[gender]; a <= 70; a++) {
        const d = bday(a);
        if (ageForYear(d.y, gender, P) <= a) { ageReq = a; ageDate = d; break; }
      }
      retire = ageDate;
    }
  }

  if (primDays === null && primNeed) notes.push('Prim gün sayınızı girmediğiniz için prim şartı tarihe katılmadı; yalnızca yaş/süre şartı hesaplandı.');
  if (group === 'yeni') notes.push('Yaş şartı, prim gün şartının tamamlandığı yıldaki kademeye göre belirlenir (5510 md. 28).');
  if (Math.abs(cmp(entry, parseISO(P.eytSon))) <= 7) notes.push('İlk giriş tarihiniz 8 Eylül 1999 sınırına çok yakın; EYT kapsamı için SGK kaydınızı mutlaka doğrulayın.');

  const done = cmp(retire, today) <= 0;
  return {
    group, status, gender, usedAlt,
    ageReq, ageDate, yearsNeed, sigDate,
    primNeed, primDate: pd ? pd.date : null, primDone: pd ? pd.done : null,
    primRemaining: primDays !== null && primNeed ? Math.max(0, primNeed - primDays) : null,
    retire, done,
    remaining: done ? null : diffYMD(today, retire),
    currentAge: diffYMD(birth, today),
    notes,
  };
}
