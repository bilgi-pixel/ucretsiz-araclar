// Duvar Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const adet = (s, ad) => {
      const n = h.opt(s, 0, ad);
      if (n < 0 || !Number.isInteger(n)) h.err(`"${ad}" sıfır ya da pozitif bir tam sayı olmalı.`);
      return n;
    };
    const kapiN = adet(v.kapiAdet, 'Kapı sayısı');
    const penN = adet(v.pencereAdet, 'Pencere sayısı');
    const kapiAlan = kapiN > 0 ? kapiN * h.pos(v.kapiEn, 'Kapı eni') * h.pos(v.kapiBoy, 'Kapı yüksekliği') : 0;
    const penAlan = penN > 0 ? penN * h.pos(v.pencereEn, 'Pencere eni') * h.pos(v.pencereBoy, 'Pencere yüksekliği') : 0;
    const cevre = 2 * (en + boy);
    const brut = cevre * yuk;
    const bosluk = kapiAlan + penAlan;
    if (bosluk >= brut - 1e-9) h.err('Kapı ve pencere boşlukları duvar alanından büyük çıktı; ölçüleri metre olarak kontrol edin.');
    return {
      rows: [
        ['Net duvar alanı', h.fmt(brut - bosluk, 2) + ' m²'],
        ['Brüt duvar alanı', h.fmt(brut, 2) + ' m²'],
        ['Kapı ve pencere boşluğu', h.fmt(bosluk, 2) + ' m²'],
        ['Oda çevresi', h.fmt(cevre, 2) + ' m'],
        ['Tavan (zemin) alanı', h.fmt(en * boy, 2) + ' m²'],
      ],
      note: 'Dikdörtgen planlı oda kabul edilmiştir. Malzeme siparişinde net alana fire payı eklemeyi unutmayın.',
    };
  }
