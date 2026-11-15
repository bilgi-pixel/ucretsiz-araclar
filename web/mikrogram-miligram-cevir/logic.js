// Mikrogram Miligram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Miktar');
    const mcg = v.birim === 'mg' ? x * 1000 : x;
    const mg = v.birim === 'mg' ? x : x / 1000;
    const ana = v.birim === 'mg'
      ? [['Mikrogram', h.fmt(mcg, 6) + ' mcg'], ['Miligram', h.fmt(mg, 9) + ' mg']]
      : [['Miligram', h.fmt(mg, 9) + ' mg'], ['Mikrogram', h.fmt(mcg, 6) + ' mcg']];
    return {
      rows: [
        ...ana,
        ['Gram', h.fmt(mg / 1000, 12) + ' g'],
        ['Nanogram', h.fmt(mcg * 1000, 3) + ' ng'],
      ],
      note: '1 mg = 1.000 mcg; 1 mcg = 1.000 ng. mcg ile µg aynı birimin iki yazımıdır. Bu araç doz önerisi vermez.',
    };
  }
