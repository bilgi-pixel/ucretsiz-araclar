// Kaç Gündür Yaşıyorum Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dogum = h.date(v.dogum, 'Doğum tarihi');
    const bugun = h.dateOrToday(v.bugun, 'Bugünün tarihi');
    if (dogum.getTime() > bugun.getTime()) h.err('Doğum tarihi bugünden ileri bir tarih olamaz. Tarihleri kontrol edin.');
    const gun = h.gunFarki(dogum, bugun);
    // Takvim yaşı: yıl, ay, gün
    let y = bugun.getUTCFullYear() - dogum.getUTCFullYear();
    let a = bugun.getUTCMonth() - dogum.getUTCMonth();
    let g = bugun.getUTCDate() - dogum.getUTCDate();
    if (g < 0) {
      a--;
      const oncekiAySon = new Date(Date.UTC(bugun.getUTCFullYear(), bugun.getUTCMonth(), 0));
      g += oncekiAySon.getUTCDate();
      if (g < 0) g = 0;
    }
    if (a < 0) { y--; a += 12; }
    const toplamAy = y * 12 + a;
    const sonraki = (Math.floor(gun / 1000) + 1) * 1000;
    const sonrakiTarih = h.gunEkle(dogum, sonraki);
    return {
      rows: [
        ['Yaşadığınız gün', `${h.fmt(gun, 0)} gün`],
        ['Hafta olarak', `${h.fmt(Math.floor(gun / 7), 0)} hafta ${gun % 7} gün`],
        ['Tamamlanan ay', `${h.fmt(toplamAy, 0)} ay`],
        ['Takvim yaşı', `${y} yıl ${a} ay ${g} gün`],
        ['Saat olarak', `${h.fmt(gun * 24, 0)} saat`],
        ['Dakika olarak', `${h.fmt(gun * 1440, 0)} dakika`],
        ['Saniye olarak', `${h.fmt(gun * 86400, 0)} saniye`],
        ['Doğduğunuz gün', `${h.fmtDate(dogum)} ${h.gunAdi(dogum)}`],
        ['Sıradaki yuvarlak sayı', `${h.fmt(sonraki, 0)} gün: ${h.fmtDate(sonrakiTarih)} ${h.gunAdi(sonrakiTarih)} (${sonraki - gun} gün sonra)`],
      ],
      note: `${h.fmtDate(bugun)} tarihine göre hesaplandı. Doğum günü sayılmaz, bugün sayılır; saat ve dakika değerleri tam günler üzerinden bulunur.`,
    };
  }
