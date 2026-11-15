// Kilogram Gram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = Math.round((v.birim === 'g' ? x : x * 1000) * 1e6) / 1e6;
    const kg = g / 1000;
    let tamKg = Math.floor(kg + 1e-9);
    let kalanG = Math.round((g - tamKg * 1000) * 1000) / 1000;
    if (kalanG < 0) kalanG = 0;
    if (kalanG >= 1000) { tamKg += 1; kalanG = 0; }
    const ana = v.birim === 'g'
      ? [['Kilogram', h.fmt(kg, 6) + ' kg'], ['Gram', h.fmt(g, 3) + ' g']]
      : [['Gram', h.fmt(g, 3) + ' g'], ['Kilogram', h.fmt(kg, 6) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Kilogram ve gram', `${h.fmt(tamKg, 0)} kg ${h.fmt(kalanG, 3)} g`],
        ['Miligram', h.fmt(g * 1000, 0) + ' mg'],
        ['Ton', h.fmt(kg / 1000, 9) + ' t'],
      ],
      note: '1 kg = 1.000 g = 1.000.000 mg; 1 ton = 1.000 kg.',
    };
  }
