// Ons Pound Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const OZ_G = 28.349523125;
    const oz = v.yon === 'lb' ? x * 16 : x;
    const lb = oz / 16;
    const tamLb = Math.floor(lb + 1e-9);
    let kalanOz = oz - tamLb * 16;
    if (kalanOz < 0) kalanOz = 0;
    const g = oz * OZ_G;
    const satirLb = ['Pound', h.fmt(lb, 5) + ' lb'];
    const satirOz = ['Ons', h.fmt(oz, 4) + ' oz'];
    return {
      rows: [
        v.yon === 'lb' ? satirOz : satirLb,
        v.yon === 'lb' ? satirLb : satirOz,
        ['Pound ve ons', `${h.fmt(tamLb, 0)} lb ${h.fmt(kalanOz, 2)} oz`],
        ['Gram', h.fmt(g, 3) + ' g'],
        ['Kilogram', h.fmt(g / 1000, 4) + ' kg'],
      ],
      note: '1 lb = 16 oz = 453,59237 g; 1 oz = 28,349523125 g (avoirdupois, tam tanım). Değerli madenlerde kullanılan troy ons farklı bir birimdir.',
    };
  }
