// Metre Santimetre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const cm = v.yon === 'cm' ? x : x * 100;
    const m = v.yon === 'cm' ? x / 100 : x;
    let tam = Math.floor(m + 1e-9);
    let kalan = Math.round((cm - tam * 100) * 10000) / 10000;
    if (kalan >= 100) { tam += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    return {
      rows: [
        v.yon === 'cm' ? ['Metre', h.fmt(m, 6) + ' m'] : ['Santimetre', h.fmt(cm, 4) + ' cm'],
        v.yon === 'cm' ? ['Santimetre', h.fmt(cm, 4) + ' cm'] : ['Metre', h.fmt(m, 6) + ' m'],
        ['Metre ve santimetre', `${h.fmt(tam, 0)} m ${h.fmt(kalan, 4)} cm`],
        ['Milimetre', h.fmt(cm * 10, 3) + ' mm'],
        ['Desimetre', h.fmt(cm / 10, 5) + ' dm'],
        ['Kilometre', h.sig(m / 1000, 8) + ' km'],
      ],
      note: '1 m = 100 cm = 10 dm = 1.000 mm. "Metre ve santimetre" satırı, tam metre ile kalan santimetreyi ayrı yazar.',
    };
  }
