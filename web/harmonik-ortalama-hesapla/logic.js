// Harmonik Ortalama Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    if (a.some((x) => !(x > 0))) h.err('Harmonik ortalama yalnızca sıfırdan büyük sayılar için hesaplanır. Sıfır ve negatif değerleri listeden çıkarın.');
    const tersToplam = a.reduce((s, x) => s + 1 / x, 0);
    const ho = n / tersToplam;
    const go = Math.exp(a.reduce((s, x) => s + Math.log(x), 0) / n);
    const ao = a.reduce((s, x) => s + x, 0) / n;
    return {
      rows: [
        ['Harmonik ortalama', h.fmt(ho, 4)],
        ['Geometrik ortalama', h.fmt(go, 4)],
        ['Aritmetik ortalama', h.fmt(ao, 4)],
        ['Terslerin toplamı (Σ 1/x)', h.sig(tersToplam, 6)],
        ['Veri sayısı', String(n)],
      ],
      note: 'Pozitif sayılarda sıralama her zaman aynıdır: harmonik ortalama ≤ geometrik ortalama ≤ aritmetik ortalama.',
    };
  }
