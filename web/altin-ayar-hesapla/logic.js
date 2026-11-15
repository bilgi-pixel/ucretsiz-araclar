// Altın Ayar ve Saflık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ayar = h.pos(v.ayar, 'Ayar');
    if (ayar > 24) h.err('"Ayar" en fazla 24 olabilir; 24 ayar saf altını ifade eder.');
    const bos = (s) => String(s ?? '').trim() === '';
    const gram = bos(v.gram) ? null : h.pos(v.gram, 'Ürün ağırlığı');
    const fiyat = bos(v.fiyat) ? null : h.pos(v.fiyat, 'Gram has altın fiyatı');
    const oran = ayar / 24;
    const rows = [
      ['Saflık', '%' + h.fmt(oran * 100, 2)],
      ['Milyem karşılığı', h.fmt(oran * 1000, 1).replace(/\./g, '')],
      ['Alaşımdaki diğer metaller', '%' + h.fmt((1 - oran) * 100, 2)],
    ];
    if (gram !== null) {
      rows.push(['Saf altın miktarı', h.fmt(gram * oran, 3) + ' g']);
      rows.push(['Diğer metal miktarı', h.fmt(gram * (1 - oran), 3) + ' g']);
    }
    if (fiyat !== null) {
      rows.push([h.fmt(ayar, 2) + ' ayar gram değeri', h.para(fiyat * oran)]);
      if (gram !== null) rows.push(['İçerdiği has altının değeri', h.para(gram * oran * fiyat)]);
    }
    return { rows, note: 'Saflık = ayar ÷ 24. Değer yalnızca içerilen has altının karşılığıdır; işçilik, kâr payı ve alış-satış farkı dahil değildir.' };
  }
