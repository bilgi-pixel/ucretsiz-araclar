// Duvar Kâğıdı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const cevre = h.pos(v.cevre, 'Kaplanacak duvar uzunluğu');
    const yuk = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const dus = h.nonneg(v.dusulen, 'Düşülecek kapı ve pencere genişliği');
    const ruloEn = h.pos(v.ruloEn, 'Rulo eni');
    const ruloBoy = h.pos(v.ruloBoy, 'Rulo boyu');
    const desen = h.nonneg(v.desen, 'Desen tekrarı');
    if (dus >= cevre) h.err('Düşülecek genişlik, kaplanacak duvar uzunluğundan küçük olmalı.');
    const net = cevre - dus;
    const serit = Math.ceil(net / (ruloEn / 100) - 1e-9);
    const seritBoy = yuk + 0.1 + desen / 100;
    const cikan = Math.floor(ruloBoy / seritBoy + 1e-9);
    if (cikan < 1) h.err('Bir şeridin boyu rulo boyundan uzun çıkıyor. Duvar yüksekliğini metre, desen tekrarını santimetre olarak yazdığınızı kontrol edin.');
    const rulo = Math.ceil(serit / cikan);
    return {
      rows: [
        ['Rulo sayısı', h.fmt(rulo, 0) + ' rulo'],
        ['Şerit sayısı', h.fmt(serit, 0) + ' şerit'],
        ['Şerit boyu (paylar dahil)', h.fmt(seritBoy, 2) + ' m'],
        ['Bir rulodan çıkan şerit', h.fmt(cikan, 0) + ' şerit'],
        ['Yedek kalan şerit', h.fmt(rulo * cikan - serit, 0) + ' şerit'],
        ['Kaplanacak duvar alanı', h.fmt(net * yuk, 2) + ' m²'],
      ],
      note: 'Her şeride alt ve üst kesim için toplam 10 cm, desenli kâğıtlarda ayrıca bir desen tekrarı kadar pay eklenir.',
    };
  }
