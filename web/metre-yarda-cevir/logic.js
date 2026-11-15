// Metre Yarda Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const m = v.yon === 'm' ? x : x * 0.9144;
    const yd = v.yon === 'm' ? x / 0.9144 : x;
    return {
      rows: [
        v.yon === 'm' ? ['Yarda', h.fmt(yd, 4) + ' yd'] : ['Metre', h.fmt(m, 4) + ' m'],
        v.yon === 'm' ? ['Metre', h.fmt(m, 4) + ' m'] : ['Yarda', h.fmt(yd, 4) + ' yd'],
        ['Feet', h.fmt(yd * 3, 4) + ' ft'],
        ['İnç', h.fmt(yd * 36, 3) + ' inç'],
        ['Santimetre', h.fmt(m * 100, 2) + ' cm'],
      ],
      note: '1 yarda = 0,9144 m (tam tanım) = 3 feet = 36 inç.',
    };
  }
