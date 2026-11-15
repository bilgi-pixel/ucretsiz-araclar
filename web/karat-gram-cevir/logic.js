// Karat Gram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const ct = v.yon === 'g' ? x * 5 : x;
    const g = v.yon === 'g' ? x : x / 5;
    const ana = v.yon === 'g'
      ? [['Karat', h.fmt(ct, 4) + ' ct'], ['Gram', h.fmt(g, 6) + ' g']]
      : [['Gram', h.fmt(g, 6) + ' g'], ['Karat', h.fmt(ct, 4) + ' ct']];
    return {
      rows: [
        ...ana,
        ['Miligram', h.fmt(ct * 200, 3) + ' mg'],
        ['Puan', h.fmt(ct * 100, 2) + ' puan'],
      ],
      note: '1 metrik karat = 0,2 g = 200 mg = 100 puan. Bu birim taş ağırlığıdır; altının saflığını gösteren ayar (karat) ile ilgisi yoktur.',
    };
  }
