// Amortisman Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const maliyet = h.pos(v.maliyet, 'Maliyet bedeli');
    const omur = h.posint(v.omur, 'Faydalı ömür');
    if (omur > 100) h.err('"Faydalı ömür" en fazla 100 yıl olabilir.');
    const azalan = v.yontem === 'azalan';
    const normalOran = 1 / omur;
    const oran = azalan ? Math.min(2 * normalOran, 0.5) : normalOran;
    const yillar = [];
    let kalan = maliyet;
    let birikmis = 0;
    for (let y = 1; y <= omur; y++) {
      let a;
      if (y === omur) a = kalan;
      else if (azalan) a = kalan * oran;
      else a = maliyet * normalOran;
      birikmis += a;
      kalan -= a;
      if (Math.abs(kalan) < 1e-7) kalan = 0;
      yillar.push([y, a, birikmis, kalan]);
    }
    const ilk = yillar[0][1];
    const son = yillar[omur - 1][1];
    const text = yillar.map(([y, a, b, k]) => `${y}. yıl: amortisman ${h.para(a)} | birikmiş ${h.para(b)} | net defter değeri ${h.para(k)}`).join('\n');
    const gosterOran = azalan && omur === 1 ? 1 : oran;
    return {
      rows: [
        ['İlk yıl amortismanı', h.para(ilk)],
        ['Amortisman oranı', '%' + h.fmt(gosterOran * 100, 2)],
        ['İlk yıl aylık karşılığı', h.para(ilk / 12)],
        ['Son yıl amortismanı', h.para(son)],
        ['Toplam amortisman', h.para(birikmis)],
        ['Yöntem', azalan ? 'Azalan bakiyeler' : 'Normal amortisman'],
      ],
      text,
      note: azalan
        ? 'Azalan bakiyelerde oran, normal oranın iki katıdır ve %50 ile sınırlanır; son yıl kalan değerin tamamı gider yazılır. Kıst amortisman uygulanmamıştır.'
        : 'Normal amortismanda her yıl maliyet bedelinin eşit bir payı gider yazılır. Kıst amortisman uygulanmamıştır.',
    };
  }
