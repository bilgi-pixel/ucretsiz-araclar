// Metrekare Santimetrekare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const m2 = v.yon === 'c' ? x / 10000 : x;
    const cm2 = v.yon === 'c' ? x : x * 10000;
    const rows = v.yon === 'c'
      ? [['Metrekare', h.fmt(m2, 8) + ' m²'], ['Santimetrekare', h.fmt(cm2, 4) + ' cm²']]
      : [['Santimetrekare', h.fmt(cm2, 4) + ' cm²'], ['Metrekare', h.fmt(m2, 8) + ' m²']];
    rows.push(['Desimetrekare', h.fmt(cm2 / 100, 6) + ' dm²']);
    rows.push(['Milimetrekare', h.fmt(cm2 * 100, 2) + ' mm²']);
    return { rows, note: '1 m² = 100 dm² = 10.000 cm² = 1.000.000 mm². Alan birimlerinde her basamak 100 kattır.' };
  }
