// Akre (Acre) Metrekare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const AKRE = 4046.8564224; // 43.560 ft² × 0,09290304 m² (tam)
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'm' ? x : x * AKRE;
    const akre = v.yon === 'm' ? x / AKRE : x;
    const rows = v.yon === 'm'
      ? [['Akre', h.fmt(akre, 4) + ' akre'], ['Metrekare', h.fmt(m2, 4) + ' m²']]
      : [['Metrekare', h.fmt(m2, 4) + ' m²'], ['Akre', h.fmt(akre, 4) + ' akre']];
    rows.push(['Dönüm', h.fmt(m2 / 1000, 4) + ' dönüm']);
    rows.push(['Hektar', h.fmt(m2 / 10000, 4) + ' ha']);
    rows.push(['Feetkare', h.fmt(akre * 43560, 2) + ' ft²']);
    return { rows, note: '1 akre = 43.560 ft² = 4.046,8564224 m². Dönüm, 1.000 m² olan metrik dönüm olarak alınmıştır.' };
  }
