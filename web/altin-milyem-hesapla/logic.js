// Altın Milyem Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const g = h.pos(v.gram, 'Ağırlık');
    const m = h.pos(v.milyem, 'Milyem');
    if (m > 1000) h.err('"Milyem" en fazla 1000 olabilir; 1000 milyem saf altını ifade eder. Değeri 0,916 biçiminde değil 916 olarak yazın.');
    const bos = (s) => String(s ?? '').trim() === '';
    const isc = bos(v.iscilik) ? null : h.nonneg(v.iscilik, 'İşçilik milyemi');
    const fiyat = bos(v.fiyat) ? null : h.pos(v.fiyat, 'Gram has altın fiyatı');
    const has = g * m / 1000;
    const rows = [
      ['Has altın karşılığı', h.fmt(has, 3) + ' g'],
      ['Ayar karşılığı', h.fmt(m * 24 / 1000, 2) + ' ayar'],
      ['Saflık', '%' + h.fmt(m / 10, 2)],
      ['Diğer metal miktarı', h.fmt(g - has, 3) + ' g'],
    ];
    let toplamHas = has;
    if (isc !== null) {
      toplamHas = g * (m + isc) / 1000;
      rows.push(['İşçilik dahil milyem', h.fmt(m + isc, 2).replace(/\./g, '')]);
      rows.push(['İşçiliğin has karşılığı', h.fmt(toplamHas - has, 3) + ' g']);
      rows.push(['İşçilik dahil has karşılığı', h.fmt(toplamHas, 3) + ' g']);
    }
    if (fiyat !== null) {
      rows.push(['Has altın değeri', h.para(has * fiyat)]);
      if (isc !== null) rows.push(['İşçilik dahil tutar', h.para(toplamHas * fiyat)]);
    }
    return { rows, note: 'Has karşılığı = gram × milyem ÷ 1000. Tutarlar yazdığınız has fiyatına göredir; alış-satış farkı, vergi ve kâr payı dahil değildir.' };
  }
