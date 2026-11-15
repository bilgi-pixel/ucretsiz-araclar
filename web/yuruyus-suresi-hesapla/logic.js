// Yürüyüş Süresi ve Mesafe Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hiz = h.pos(v.hiz, 'Yürüyüş hızı');
    if (hiz > 12) h.err('"Yürüyüş hızı" en fazla 12 km/sa olabilir; bunun üzeri koşu temposudur.');
    let km, dk;
    if (v.mod === 'mesafe') {
      dk = h.pos(v.dakika, 'Süre');
      km = hiz * dk / 60;
    } else {
      km = h.pos(v.km, 'Mesafe');
      dk = km / hiz * 60;
    }
    const toplamDk = Math.round(dk);
    let sure;
    if (toplamDk < 1) sure = '1 dakikadan az';
    else if (toplamDk < 60) sure = `${toplamDk} dk`;
    else sure = `${h.fmt(Math.floor(toplamDk / 60), 0)} saat ${toplamDk % 60} dk`;
    const snKm = Math.round(3600 / hiz);
    const tempo = `${Math.floor(snKm / 60)}:${String(snKm % 60).padStart(2, '0')} dk/km`;
    const mesafeSatir = ['Mesafe', `${h.fmt(km, 2)} km`];
    const sureSatir = ['Yürüyüş süresi', sure];
    const rows = v.mod === 'mesafe' ? [mesafeSatir, sureSatir] : [sureSatir, mesafeSatir];
    rows.push(['Tempo', tempo]);
    rows.push(['Hız', `${h.fmt(hiz, 2)} km/sa (${h.fmt(hiz * 1000 / 60, 1)} m/dk)`]);
    if (String(v.adimBoyu || '').trim() !== '') {
      const adim = h.pos(v.adimBoyu, 'Adım boyu');
      if (adim < 20 || adim > 150) h.err('"Adım boyu" 20 ile 150 cm arasında olmalı.');
      rows.push(['Tahmini adım sayısı', `${h.fmt(Math.round(km * 100000 / adim), 0)} adım`]);
    }
    return {
      rows,
      note: 'Hesap düz zeminde, sabit hızla ve duraksamadan yürüdüğünüzü varsayar. Yokuş, trafik ışıkları, kalabalık ve mola süreleri gerçek süreyi uzatır.',
    };
  }
