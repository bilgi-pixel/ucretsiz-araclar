// Kilogram Pound (Libre) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kg = v.yon === 'lb' ? x * LB : x;
    const lb = v.yon === 'lb' ? x : x / LB;
    let tam = Math.floor(lb + 1e-9);
    let oz = Math.round((lb - tam) * 16 * 100) / 100;
    if (oz < 0) oz = 0;
    if (oz >= 16) { tam += 1; oz = 0; }
    const ana = v.yon === 'lb'
      ? [['Kilogram', h.fmt(kg, 4) + ' kg'], ['Pound', h.fmt(lb, 4) + ' lb']]
      : [['Pound', h.fmt(lb, 4) + ' lb'], ['Kilogram', h.fmt(kg, 4) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Pound ve ons', `${h.fmt(tam, 0)} lb ${h.fmt(oz, 2)} oz`],
        ['Gram', h.fmt(kg * 1000, 3) + ' g'],
      ],
      note: '1 lb = 0,45359237 kg (tam tanım), 1 lb = 16 oz. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
