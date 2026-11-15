// Oda Hacmi ve Havalandırma Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const ach = h.pos(v.degisim, 'Saatlik hava değişim sayısı');
    const alan = en * boy;
    const hacim = alan * yuk;
    const debi = hacim * ach;
    return {
      rows: [
        ['Oda hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Gereken hava debisi', h.fmt(debi, 1) + ' m³/h'],
        ['Debi (litre/saniye)', h.fmt(debi / 3.6, 2) + ' L/s'],
        ['Debi (CFM)', h.fmt(debi * 0.5885778, 1) + ' CFM'],
        ['Taban alanı', h.fmt(alan, 2) + ' m²'],
        ['Hacim (litre)', h.fmt(hacim * 1000, 0) + ' L'],
        ['Bir hava değişimi süresi', h.fmt(60 / ach, 1) + ' dakika'],
      ],
      note: 'Debi = oda hacmi × saatlik hava değişim sayısı. Kanal, menfez ve filtre dirençleri hesaba katılmaz; fan seçerken bu kayıplar için pay bırakın.',
    };
  }
