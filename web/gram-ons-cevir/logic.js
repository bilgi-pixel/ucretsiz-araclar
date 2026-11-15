// Gram Ons Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const OZ = 28.349523125;
    const TROY = 31.1034768;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = v.yon === 'oz' ? x * OZ : x;
    const oz = v.yon === 'oz' ? x : x / OZ;
    const ana = v.yon === 'oz'
      ? [['Gram', h.fmt(g, 4) + ' g'], ['Ons', h.fmt(oz, 4) + ' oz']]
      : [['Ons', h.fmt(oz, 4) + ' oz'], ['Gram', h.fmt(g, 4) + ' g']];
    return {
      rows: [
        ...ana,
        ['Pound', h.fmt(oz / 16, 4) + ' lb'],
        ['Kilogram', h.fmt(g / 1000, 6) + ' kg'],
        ['Troy ons (değerli maden)', h.fmt(g / TROY, 4) + ' ozt'],
      ],
      note: '1 oz = 28,349523125 g (avoirdupois, tam tanım); 16 oz = 1 lb. Altın ve gümüşte kullanılan troy ons 31,1034768 gramdır.',
    };
  }
