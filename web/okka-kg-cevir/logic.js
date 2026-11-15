// Okka Kilogram Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const OKKA = 1.282945;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const kg = v.yon === 'kg' ? x : x * OKKA;
    const okka = v.yon === 'kg' ? x / OKKA : x;
    const ana = v.yon === 'kg'
      ? [['Okka', h.fmt(okka, 4) + ' okka'], ['Kilogram', h.fmt(kg, 6) + ' kg']]
      : [['Kilogram', h.fmt(kg, 6) + ' kg'], ['Okka', h.fmt(okka, 4) + ' okka']];
    return {
      rows: [
        ...ana,
        ['Dirhem', h.fmt(okka * 400, 2) + ' dirhem'],
        ['Gram', h.fmt(kg * 1000, 3) + ' g'],
      ],
      note: 'Kabul: 1 okka = 400 dirhem = 1,282945 kg (1 dirhem ≈ 3,207 g). Okkanın değeri döneme ve bölgeye göre değişmiştir; tarihî belgelerde sonucu yaklaşık kabul edin.',
    };
  }
