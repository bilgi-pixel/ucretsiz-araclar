// Gün Saat Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const saat = v.yon === 'gun' ? x * 24 : x;
    const gun = saat / 24;
    const s = Math.round(saat * 1000) / 1000;
    const tamGun = Math.floor(s / 24);
    const kalan = s - tamGun * 24;
    const rGun = ['Gün', h.fmt(gun, 6) + ' gün'];
    const rSaat = ['Saat', h.fmt(saat, 4) + ' saat'];
    return {
      rows: [
        ...(v.yon === 'gun' ? [rSaat, rGun] : [rGun, rSaat]),
        ['Gün ve saat', `${h.fmt(tamGun, 0)} gün ${h.fmt(kalan, 3)} saat`],
        ['Dakika', h.fmt(saat * 60, 2) + ' dakika'],
        ['Saniye', h.fmt(saat * 3600, 0) + ' saniye'],
        ['Hafta', h.fmt(gun / 7, 6) + ' hafta'],
      ],
      note: '1 gün = 24 saat = 1.440 dakika = 86.400 saniye kabul edilmiştir (takvim günü).',
    };
  }
