// Litre Mililitre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const ml = v.yon === 'ml' ? x : x * 1000;
    const mlSatir = ['Mililitre', h.fmt(ml, 3) + ' mL'];
    const lSatir = ['Litre', h.fmt(ml / 1000, 6) + ' L'];
    return {
      rows: [
        v.yon === 'ml' ? lSatir : mlSatir,
        v.yon === 'ml' ? mlSatir : lSatir,
        ['Santilitre', h.fmt(ml / 10, 4) + ' cL'],
        ['Desilitre', h.fmt(ml / 100, 5) + ' dL'],
        ['Su bardağı (200 mL)', h.fmt(ml / 200, 2) + ' bardak'],
      ],
      note: '1 L = 10 dL = 100 cL = 1000 mL. Su bardağı satırı, mutfakta yaygın kabul edilen 200 mL\'lik ölçüye göre yaklaşık bir karşılıktır.',
    };
  }
