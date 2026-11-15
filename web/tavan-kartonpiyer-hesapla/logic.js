// Kartonpiyer Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const ek = h.nonneg(v.ek, 'Ek uzunluk');
    const kose = h.int(v.kose, 'Köşe sayısı');
    if (kose < 0) h.err('Köşe sayısı negatif olamaz.');
    const parca = h.pos(v.parca, 'Parça boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const cevre = 2 * (en + boy);
    const net = cevre + ek;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / parca - 1e-9);
    const alinan = adet * parca;
    const rows = [
      ['Gerekli kartonpiyer', h.fmt(toplam, 2) + ' m'],
      ['Alınacak adet', `${h.fmt(adet, 0)} parça (${h.fmt(parca, 2)} m)`],
      ['Satın alınan toplam', h.fmt(alinan, 2) + ' m'],
      ['Tavan çevresi', h.fmt(cevre, 2) + ' m'],
      ['Net döşenecek uzunluk', h.fmt(net, 2) + ' m'],
      ['Gönye kesimli köşe', h.fmt(kose, 0) + ' adet'],
      ['Tavan alanı', h.fmt(en * boy, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const fiyat = h.nonneg(v.fiyat, 'Metre fiyatı');
      rows.push(['Tahmini malzeme tutarı', h.para(alinan * fiyat)]);
    }
    return {
      rows,
      note: 'Tutar, satın alınan tam parçaların toplam metresi üzerinden hesaplanır; yapıştırıcı, macun, boya ve işçilik dahil değildir.',
    };
  }
