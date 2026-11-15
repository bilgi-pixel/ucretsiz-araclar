// Arşın Metre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kat = { carsi: 0.68, mimar: 0.757738, endaze: 0.65, metre: 1 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const m = x * k;
    const tum = [
      ['metre', 'Metre', h.fmt(m, 4) + ' m'],
      ['carsi', 'Çarşı arşını', h.fmt(m / kat.carsi, 4) + ' arşın'],
      ['mimar', 'Mimar arşını', h.fmt(m / kat.mimar, 4) + ' arşın'],
      ['endaze', 'Endaze', h.fmt(m / kat.endaze, 4) + ' endaze'],
    ];
    // Ana sonuç: arşın girildiyse metre, metre girildiyse çarşı arşını
    const rows = tum.filter((t) => t[0] !== v.birim).map((t) => [t[1], t[2]]);
    rows.splice(1, 0, ['Santimetre', h.fmt(m * 100, 2) + ' cm']);
    return {
      rows,
      note: 'Çarşı arşını 0,68 m, mimar arşını 0,757738 m, endaze 0,65 m kabul edilmiştir. Tarihî ölçüler döneme ve bölgeye göre küçük farklar gösterebilir.',
    };
  }
