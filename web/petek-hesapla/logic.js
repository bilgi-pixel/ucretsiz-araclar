// Petek (Radyatör) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const guc = h.pos(v.guc, 'Peteğin metre başına gücü');
    const kat = Number(v.yalitim) || 50;
    if (yuk > 10) h.err('Tavan yüksekliği 10 metreden büyük olamaz; değeri metre cinsinden yazın (örn. 2,7).');
    const alan = en * boy;
    const hacim = alan * yuk;
    const watt = hacim * kat;
    const metre = watt / guc;
    const yuvarlak = Math.ceil(metre * 10 - 1e-9) / 10;
    return {
      rows: [
        ['Gereken petek uzunluğu', h.fmt(yuvarlak, 1) + ' m'],
        ['Isı ihtiyacı', h.fmt(watt, 0) + ' W'],
        ['Isı ihtiyacı (kcal/h)', h.fmt(watt * 0.859845, 0) + ' kcal/h'],
        ['Oda hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Taban alanı', h.fmt(alan, 2) + ' m²'],
        ['Hesaplanan uzunluk (yuvarlamadan)', h.fmt(metre, 2) + ' m'],
      ],
      note: 'Petek uzunluğu 10 cm\'lik adıma yukarı yuvarlanır. Katsayılar pratik keşif değerleridir; kesin ısı kaybı hesabı yerine geçmez.',
    };
  }
