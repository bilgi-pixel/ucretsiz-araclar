// Medyan (Ortanca) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar').slice().sort((x, y) => x - y);
    const n = a.length;
    const orta = Math.floor(n / 2);
    const medyan = n % 2 === 1 ? a[orta] : (a[orta - 1] + a[orta]) / 2;
    const toplam = a.reduce((s, x) => s + x, 0);
    const konum = n % 2 === 1 ? `${orta + 1}. değer` : `${orta}. ve ${orta + 1}. değerlerin ortalaması`;
    const gosterilecek = n > 200 ? a.slice(0, 200) : a;
    return {
      rows: [
        ['Medyan', h.fmt(medyan, 6)],
        ['Medyanın konumu', konum],
        ['Veri sayısı', String(n)],
        ['Aritmetik ortalama', h.fmt(toplam / n, 6)],
        ['En küçük değer', h.fmt(a[0], 6)],
        ['En büyük değer', h.fmt(a[n - 1], 6)],
        ['Sıralı veri', gosterilecek.map((x) => h.fmt(x, 6)).join('; ') + (n > 200 ? '; …' : '')],
      ],
      note: n % 2 === 1
        ? 'Veri sayısı tek olduğu için medyan, sıralı dizinin tam ortasındaki değerdir.'
        : 'Veri sayısı çift olduğu için medyan, sıralı dizinin ortasındaki iki değerin aritmetik ortalamasıdır.',
    };
  }
