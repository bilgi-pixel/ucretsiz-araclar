// Açıklık (Ranj) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler');
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    let enK = x[0], enB = x[0], top = 0;
    for (const a of x) { if (a < enK) enK = a; if (a > enB) enB = a; top += a; }
    const aciklik = enB - enK;
    return {
      rows: [
        ['Açıklık (ranj)', h.fmt(aciklik, 6)],
        ['En büyük değer', h.fmt(enB, 6)],
        ['En küçük değer', h.fmt(enK, 6)],
        ['Orta açıklık', h.fmt((enB + enK) / 2, 6)],
        ['Aritmetik ortalama', h.fmt(top / n, 4)],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note: n === 1 ? 'Tek veri girildiği için en büyük ve en küçük değer aynıdır; açıklık 0 çıkar.' : 'Açıklık = en büyük değer − en küçük değer. Orta açıklık, bu iki uç değerin ortalamasıdır.',
    };
  }
