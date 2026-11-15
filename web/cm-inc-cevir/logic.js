// Santimetre İnç Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const cm = v.yon === 'inc' ? x * 2.54 : x;
    const inc = cm / 2.54;
    const ft = Math.floor(inc / 12 + 1e-9);
    const kalan = inc - ft * 12;
    return {
      rows: [
        v.yon === 'inc' ? ['Santimetre', h.fmt(cm, 4) + ' cm'] : ['İnç', h.fmt(inc, 4) + ' inç'],
        v.yon === 'inc' ? ['İnç', h.fmt(inc, 4) + ' inç'] : ['Santimetre', h.fmt(cm, 4) + ' cm'],
        ['Milimetre', h.fmt(cm * 10, 3) + ' mm'],
        ['Feet ve inç', `${ft} ft ${h.fmt(kalan, 2)} inç`],
      ],
      note: '1 inç = 2,54 cm (tam tanım). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  }
