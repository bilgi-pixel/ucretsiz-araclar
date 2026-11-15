// Milisaniye Saniye Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const sn = v.yon === 'sn' ? x : x / 1000;
    const ms = v.yon === 'sn' ? x * 1000 : x;
    const dk = Math.floor(sn / 60 + 1e-9);
    const kalan = Math.max(0, sn - dk * 60);
    const rows = v.yon === 'sn'
      ? [['Milisaniye', h.fmt(ms, 3) + ' ms'], ['Saniye', h.fmt(sn, 6) + ' sn']]
      : [['Saniye', h.fmt(sn, 6) + ' sn'], ['Milisaniye', h.fmt(ms, 3) + ' ms']];
    rows.push(['Mikrosaniye', h.fmt(ms * 1000, 0) + ' µs']);
    rows.push(['Dakika', h.fmt(sn / 60, 6) + ' dk']);
    rows.push(['Dakika ve saniye', `${h.fmt(dk, 0)} dk ${h.fmt(kalan, 3)} sn`]);
    if (sn > 0) rows.push(['Frekans karşılığı', h.sig(1 / sn, 6) + ' Hz']);
    return { rows, note: 'Frekans karşılığı, bu süre bir tekrarın periyodu kabul edilirse saniyede kaç tekrar olacağını gösterir (f = 1 ÷ süre).' };
  }
