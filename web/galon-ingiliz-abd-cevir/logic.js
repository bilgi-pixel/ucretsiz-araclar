// ABD Galonu İngiliz Galonu Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Hacim (galon)');
    const ABD_L = 3.785411784;
    const ING_L = 4.54609;
    const litre = v.yon === 'ing' ? x * ING_L : x * ABD_L;
    const abd = v.yon === 'ing' ? litre / ABD_L : x;
    const ing = v.yon === 'ing' ? x : litre / ING_L;
    const satirAbd = ['ABD galonu', h.fmt(abd, 6) + ' US gal'];
    const satirIng = ['İngiliz galonu', h.fmt(ing, 6) + ' UK gal'];
    return {
      rows: [
        v.yon === 'ing' ? satirAbd : satirIng,
        v.yon === 'ing' ? satirIng : satirAbd,
        ['Litre', h.fmt(litre, 6) + ' L'],
      ],
      note: '1 US gal = 3,785411784 L (231 inç küp); 1 UK gal = 4,54609 L (tam tanımlar). 1 UK gal ≈ 1,20095 US gal. Buradaki ABD galonu sıvı galonudur.',
    };
  }
