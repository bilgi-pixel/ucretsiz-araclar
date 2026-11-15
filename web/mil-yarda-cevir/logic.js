// Mil Yarda Feet Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const FT_M = 0.3048;
    const ft = v.birim === 'yarda' ? x * 3 : v.birim === 'feet' ? x : x * 5280;
    const satirlar = {
      mil: ['Mil', h.fmt(ft / 5280, 6) + ' mil'],
      yarda: ['Yarda', h.fmt(ft / 3, 4) + ' yd'],
      feet: ['Feet', h.fmt(ft, 4) + ' ft'],
    };
    const kaynak = satirlar[v.birim] ? v.birim : 'mil';
    const sira = ['mil', 'yarda', 'feet'].filter((b) => b !== kaynak);
    const m = ft * FT_M;
    return {
      rows: [
        satirlar[sira[0]],
        satirlar[sira[1]],
        satirlar[kaynak],
        ['Kilometre', h.fmt(m / 1000, 6) + ' km'],
        ['Metre', h.fmt(m, 4) + ' m'],
      ],
      note: '1 mil = 1.760 yd = 5.280 ft = 1,609344 km; 1 yd = 3 ft = 0,9144 m; 1 ft = 0,3048 m (tam tanımlar). Buradaki mil kara milidir; deniz mili farklı bir birimdir.',
    };
  }
