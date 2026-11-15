// Milimetre Punto Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const pt = v.yon === 'pt' ? x : x * 72 / 25.4;
    const mm = pt * 25.4 / 72;
    const a = ['Punto', h.fmt(pt, 4) + ' pt'];
    const b = ['Milimetre', h.fmt(mm, 4) + ' mm'];
    return {
      rows: [
        v.yon === 'pt' ? b : a,
        v.yon === 'pt' ? a : b,
        ['Pika', h.fmt(pt / 12, 4) + ' pika'],
        ['İnç', h.fmt(pt / 72, 4) + ' inç'],
      ],
      note: '1 punto = 1/72 inç = 0,3528 mm (yaklaşık); 1 mm = 2,8346 punto (yaklaşık).',
    };
  }
