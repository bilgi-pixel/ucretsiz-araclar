// Varil Litre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const VARIL = 158.987294928; // 42 × 3,785411784
    const GALON = 3.785411784;
    const x = h.nonneg(v.deger, 'Değer');
    const litre = v.yon === 'lv' ? x : x * VARIL;
    const varilSatir = ['Varil', h.fmt(litre / VARIL, 4) + ' varil'];
    const litreSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    return {
      rows: [
        v.yon === 'lv' ? varilSatir : litreSatir,
        v.yon === 'lv' ? litreSatir : varilSatir,
        ['ABD galonu', h.fmt(litre / GALON, 4) + ' gal'],
        ['Metreküp', h.fmt(litre / 1000, 6) + ' m³'],
      ],
      note: 'Petrol varili (bbl) = 42 ABD sıvı galonu = 158,987294928 L. Sanayide kullanılan 200–216 litrelik çelik variller farklı bir ölçüdür.',
    };
  }
