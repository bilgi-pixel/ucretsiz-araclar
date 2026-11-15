// Metreküp Feetküp Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const FT3 = 0.028316846592; // 0,3048³
    const x = h.nonneg(v.deger, 'Değer');
    const m3 = v.yon === 'fm' ? x * FT3 : x;
    const ft3 = m3 / FT3;
    const ftSatir = ['Feetküp', h.fmt(ft3, 4) + ' ft³'];
    const mSatir = ['Metreküp', h.fmt(m3, 4) + ' m³'];
    return {
      rows: [
        v.yon === 'fm' ? mSatir : ftSatir,
        v.yon === 'fm' ? ftSatir : mSatir,
        ['Litre', h.fmt(m3 * 1000, 3) + ' L'],
        ['İnç küp', h.fmt(ft3 * 1728, 1) + ' in³'],
      ],
      note: '1 feet = 0,3048 m (tam) olduğundan 1 ft³ = 0,028316846592 m³ ve 1 m³ ≈ 35,3147 ft³. Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
