// Metre Feet Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const m = v.yon === 'ft' ? x * 0.3048 : x;
    const ft = v.yon === 'ft' ? x : x / 0.3048;
    const inc = ft * 12;
    let tamFt = Math.floor(ft + 1e-9);
    let kalan = Math.round((inc - tamFt * 12) * 100) / 100;
    if (kalan >= 12) { tamFt += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    return {
      rows: [
        v.yon === 'ft' ? ['Metre', h.fmt(m, 4) + ' m'] : ['Feet', h.fmt(ft, 4) + ' ft'],
        v.yon === 'ft' ? ['Feet', h.fmt(ft, 4) + ' ft'] : ['Metre', h.fmt(m, 4) + ' m'],
        ['Feet ve inç', `${h.fmt(tamFt, 0)} ft ${h.fmt(kalan, 2)} inç`],
        ['İnç', h.fmt(inc, 3) + ' inç'],
        ['Yarda', h.fmt(ft / 3, 4) + ' yd'],
        ['Santimetre', h.fmt(m * 100, 2) + ' cm'],
      ],
      note: '1 feet = 0,3048 m (tam tanım), 1 feet = 12 inç, 1 yarda = 3 feet. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
