// İvme Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const carpan = v.birim === 'kmh' ? 1 / 3.6 : 1;
    const v0 = h.nonneg(v.ilkHiz, 'İlk hız (v₀)') * carpan;
    const v1 = h.nonneg(v.sonHiz, 'Son hız (v)') * carpan;
    let a, ek;
    if (v.yontem === 'yol') {
      const s = h.pos(v.yol, 'Alınan yol (metre)');
      if (v0 + v1 === 0) h.err('İlk ve son hızın ikisi de sıfırsa cisim yol alamaz; en az bir hızı sıfırdan büyük yazın.');
      a = (v1 * v1 - v0 * v0) / (2 * s);
      ek = ['Geçen süre', h.fmt((2 * s) / (v0 + v1), 2) + ' s'];
    } else {
      const t = h.pos(v.sure, 'Süre (saniye)');
      a = (v1 - v0) / t;
      ek = ['Alınan yol', h.fmt(((v0 + v1) / 2) * t, 2) + ' m'];
    }
    const durum = a > 1e-12 ? 'Hızlanma' : a < -1e-12 ? 'Yavaşlama' : 'Sabit hız';
    return {
      rows: [
        ['İvme', h.fmt(a, 4) + ' m/s²'],
        ['İvme (g)', h.fmt(a / 9.80665, 3) + ' g'],
        ['Hareket türü', durum],
        ['Hız değişimi', h.fmt(v1 - v0, 4) + ' m/s'],
        ek,
      ],
      note: 'Sonuç, ivmenin sabit olduğu varsayımıyla bulunan ortalama ivmedir. Negatif değer yavaşlamayı gösterir. 1 g = 9,80665 m/s² alınmıştır.',
    };
  }
