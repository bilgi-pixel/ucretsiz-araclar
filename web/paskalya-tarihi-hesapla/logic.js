// Paskalya Tarihi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const y = h.int(v.yil, 'Yıl');
    if (y < 1583 || y > 4099) h.err('Yıl 1583 ile 4099 arasında olmalı; Gregoryen takvim 1582\'de yürürlüğe girmiştir.');
    const B = (x, n) => Math.floor(x / n);
    // Batı (Gregoryen) Paskalyası: Anonim Gregoryen algoritması
    const a = y % 19, b = B(y, 100), c = y % 100, d = B(b, 4), e = b % 4;
    const f = B(b + 8, 25), g = B(b - f + 1, 3);
    const hh = (19 * a + b - d - g + 15) % 30;
    const i = B(c, 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - hh - k) % 7;
    const m = B(a + 11 * hh + 22 * l, 451);
    const t = hh + l - 7 * m + 114;
    const bati = new Date(Date.UTC(y, B(t, 31) - 1, (t % 31) + 1));
    // Ortodoks Paskalyası: Jülyen hesabı, sonra Gregoryen takvime çeviri
    const jd = (19 * (y % 19) + 15) % 30;
    const je = (2 * (y % 4) + 4 * (y % 7) - jd + 34) % 7;
    const jt = jd + je + 114;
    const fark = B(y, 100) - B(y, 400) - 2;
    const ort = h.gunEkle(new Date(Date.UTC(y, B(jt, 31) - 1, (jt % 31) + 1)), fark);
    const uzun = (x) => x.getUTCDate() + ' ' + h.ayAdi(x.getUTCMonth() + 1) + ' ' + x.getUTCFullYear();
    const ara = h.gunFarki(bati, ort);
    return {
      rows: [
        ['Paskalya (Batı kiliseleri)', uzun(bati) + ' Pazar'],
        ['Ortodoks Paskalyası', uzun(ort) + ' Pazar'],
        ['İki tarih arasındaki fark', ara === 0 ? 'Aynı gün' : ara + ' gün (' + (ara / 7) + ' hafta)'],
        ['Küllü Çarşamba (Batı)', uzun(h.gunEkle(bati, -46))],
        ['Palmiye Pazarı (Batı)', uzun(h.gunEkle(bati, -7))],
        ['Kutsal Cuma (Batı)', uzun(h.gunEkle(bati, -2))],
        ['Paskalya Pazartesisi (Batı)', uzun(h.gunEkle(bati, 1))],
        ['Göğe Yükseliş (Batı)', uzun(h.gunEkle(bati, 39))],
        ['Pentekost (Batı)', uzun(h.gunEkle(bati, 49))],
        ['Ortodoks Kutsal Cuma', uzun(h.gunEkle(ort, -2))],
        ['Ortodoks Pentekost', uzun(h.gunEkle(ort, 49))],
      ],
      note: 'Tüm tarihler bugün kullandığımız Miladi (Gregoryen) takvime göre yazılmıştır. Ortodoks tarihi Jülyen takvimiyle hesaplanıp ' + fark + ' gün eklenerek çevrilmiştir.',
    };
  }
