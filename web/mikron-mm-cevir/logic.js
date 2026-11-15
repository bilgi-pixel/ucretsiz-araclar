// Mikron Milimetre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const um = v.yon === 'mm' ? x * 1000 : x;
    const mm = v.yon === 'mm' ? x : x / 1000;
    return {
      rows: [
        v.yon === 'mm' ? ['Mikron', h.fmt(um, 3) + ' µm'] : ['Milimetre', h.fmt(mm, 6) + ' mm'],
        v.yon === 'mm' ? ['Milimetre', h.fmt(mm, 6) + ' mm'] : ['Mikron', h.fmt(um, 3) + ' µm'],
        ['Santimetre', h.fmt(mm / 10, 7) + ' cm'],
        ['Metre', h.sig(mm / 1000, 6) + ' m'],
        ['Nanometre', h.fmt(um * 1000, 1) + ' nm'],
        ['Binde inç (thou)', h.fmt(um / 25.4, 4) + ' thou'],
      ],
      note: '1 mm = 1.000 µm, 1 µm = 1.000 nm, 1 thou (inçin binde biri) = 25,4 µm.',
    };
  }
