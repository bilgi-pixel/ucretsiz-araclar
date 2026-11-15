// Gram Miligram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Miktar');
    const mg = v.birim === 'mg' ? x : x * 1000;
    const g = v.birim === 'mg' ? x / 1000 : x;
    const ana = v.birim === 'mg'
      ? [['Gram', h.fmt(g, 9) + ' g'], ['Miligram', h.fmt(mg, 6) + ' mg']]
      : [['Miligram', h.fmt(mg, 6) + ' mg'], ['Gram', h.fmt(g, 9) + ' g']];
    return {
      rows: [
        ...ana,
        ['Mikrogram', h.fmt(mg * 1000, 3) + ' mcg'],
        ['Kilogram', h.fmt(g / 1000, 12) + ' kg'],
      ],
      note: '1 g = 1.000 mg = 1.000.000 mcg. Mikrogram, µg ya da mcg olarak yazılır.',
    };
  }
