// Ay Gün Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const tablo = { otuz: 30, ortalama: 365.2425 / 12, otuzbir: 31, yirmisekiz: 28, yirmidokuz: 29 };
    const g = tablo[v.ayTipi] || 30;
    const gun = v.yon === 'gun' ? x : x * g;
    const ay = gun / g;
    const tam = Math.floor(ay + 1e-9);
    const kalan = Math.max(0, gun - tam * g);
    const rows = v.yon === 'gun'
      ? [['Ay', h.fmt(ay, 4) + ' ay'], ['Ay ve gün', `${h.fmt(tam, 0)} ay ${h.fmt(kalan, 2)} gün`], ['Gün', h.fmt(gun, 4) + ' gün']]
      : [['Gün', h.fmt(gun, 4) + ' gün'], ['Ay', h.fmt(ay, 4) + ' ay']];
    rows.push(['Hafta', h.fmt(gun / 7, 2) + ' hafta']);
    rows.push(['Saat', h.fmt(gun * 24, 2) + ' saat']);
    rows.push(['Yıl (12 ay = 1 yıl)', h.fmt(ay / 12, 4) + ' yıl']);
    return { rows, note: `Hesapta 1 ay = ${h.fmt(g, 6)} gün alındı. Takvimde belirli bir tarihe ay eklemek farklı bir işlemdir; sonuç ayların gerçek uzunluğuna göre değişir.` };
  }
