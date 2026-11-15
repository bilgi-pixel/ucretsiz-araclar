// Santilitre Mililitre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const ml = v.yon === 'mc' ? x : x * 10;
    const mlSatir = ['Mililitre', h.fmt(ml, 4) + ' mL'];
    const clSatir = ['Santilitre', h.fmt(ml / 10, 5) + ' cL'];
    return {
      rows: [
        v.yon === 'mc' ? clSatir : mlSatir,
        v.yon === 'mc' ? mlSatir : clSatir,
        ['Desilitre', h.fmt(ml / 100, 6) + ' dL'],
        ['Litre', h.fmt(ml / 1000, 6) + ' L'],
      ],
      note: '1 cL = 10 mL = 0,1 dL = 0,01 L. Çeviri onluk sisteme dayandığı için tamdır.',
    };
  }
