// Hafta Gün Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const gun = v.yon === 'hafta' ? x * 7 : x;
    const hafta = gun / 7;
    const g = Math.round(gun * 1000) / 1000;
    const tamHafta = Math.floor(g / 7);
    const kalan = g - tamHafta * 7;
    const rHafta = ['Hafta', h.fmt(hafta, 6) + ' hafta'];
    const rGun = ['Gün', h.fmt(gun, 4) + ' gün'];
    return {
      rows: [
        ...(v.yon === 'hafta' ? [rGun, rHafta] : [rHafta, rGun]),
        ['Hafta ve gün', `${h.fmt(tamHafta, 0)} hafta ${h.fmt(kalan, 3)} gün`],
        ['Saat', h.fmt(gun * 24, 2) + ' saat'],
        ['Ay (ortalama 30,4375 gün)', h.fmt(gun / 30.4375, 2) + ' ay'],
      ],
      note: '1 hafta = 7 gün = 168 saat. Ay karşılığı, 365,25 günlük ortalama yılın on ikide biri üzerinden yaklaşık olarak verilir.',
    };
  }
