// Desimetreküp Litre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    // 1 dm³ = 1 L; sayısal değer aynı kalır, yön satır sırasını belirler.
    const litre = x;
    const lSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const dSatir = ['Desimetreküp', h.fmt(litre, 4) + ' dm³'];
    return {
      rows: [
        v.yon === 'ld' ? dSatir : lSatir,
        v.yon === 'ld' ? lSatir : dSatir,
        ['Metreküp', h.fmt(litre / 1000, 7) + ' m³'],
        ['Santimetreküp', h.fmt(litre * 1000, 1) + ' cm³'],
        ['Mililitre', h.fmt(litre * 1000, 1) + ' mL'],
      ],
      note: '1 dm³ = 1 L = 1000 cm³ = 1000 mL = 0,001 m³. Litre, desimetreküpün özel adıdır; çeviri katsayısı 1\'dir.',
    };
  }
