// Yıl Gün Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const tablo = { normal: 365, artik: 366, gregoryen: 365.2425, julyen: 365.25 };
    const g = tablo[v.yilTipi] || 365;
    const gun = v.yon === 'gun' ? x : x * g;
    const yil = gun / g;
    const tam = Math.floor(yil + 1e-9);
    const kalan = Math.max(0, gun - tam * g);
    const rows = v.yon === 'gun'
      ? [['Yıl', h.fmt(yil, 4) + ' yıl'], ['Yıl ve gün', `${h.fmt(tam, 0)} yıl ${h.fmt(kalan, 2)} gün`], ['Gün', h.fmt(gun, 4) + ' gün']]
      : [['Gün', h.fmt(gun, 4) + ' gün'], ['Yıl', h.fmt(yil, 4) + ' yıl']];
    rows.push(['Hafta', h.fmt(gun / 7, 2) + ' hafta']);
    rows.push(['Saat', h.fmt(gun * 24, 2) + ' saat']);
    rows.push(['Dakika', h.fmt(gun * 1440, 0) + ' dakika']);
    return { rows, note: `Hesapta 1 yıl = ${h.fmt(g, 4)} gün alındı. Belirli iki tarih arasındaki gerçek gün sayısı, aradaki artık yıllara göre değişir.` };
  }
