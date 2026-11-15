// Litre Galon Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ABD = 3.785411784;
    const ING = 4.54609;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const litre = v.yon === 'gl' ? x * (ing ? ING : ABD) : x;
    const abdSatir = ['ABD galonu', h.fmt(litre / ABD, 4) + ' gal'];
    const ingSatir = ['İngiliz galonu', h.fmt(litre / ING, 4) + ' gal'];
    const litreSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const rows = v.yon === 'gl'
      ? [litreSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir]
      : [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, litreSatir];
    rows.push(['Metreküp', h.fmt(litre / 1000, 6) + ' m³']);
    return {
      rows,
      note: '1 ABD sıvı galonu = 3,785411784 L, 1 İngiliz galonu = 4,54609 L (tam tanımlar). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
