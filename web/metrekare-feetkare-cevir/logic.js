// Metrekare Feetkare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = 0.09290304; // 1 ft² kaç m² (0,3048² tam)
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'ft2' ? x * K : x;
    const ft2 = v.yon === 'ft2' ? x : x / K;
    const yd2 = ft2 / 9;
    const rows = v.yon === 'ft2'
      ? [['Metrekare', h.fmt(m2, 4) + ' m²'], ['Feetkare', h.fmt(ft2, 4) + ' ft²']]
      : [['Feetkare', h.fmt(ft2, 4) + ' ft²'], ['Metrekare', h.fmt(m2, 4) + ' m²']];
    rows.push(['Yarda kare', h.fmt(yd2, 4) + ' yd²']);
    return { rows, note: '1 ft = 0,3048 m olduğundan 1 ft² = 0,09290304 m² (tam). Sonuçlar en fazla dört ondalık basamakla gösterilir.' };
  }
