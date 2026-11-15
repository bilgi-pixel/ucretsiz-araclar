// Mükemmel Sayı Kontrolü — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.sayi, 'Sayı');
    if (n > 1e12) h.err('Sayı en fazla 1.000.000.000.000 olabilir; daha küçük bir sayı yazın.');
    const kucuk = [], buyuk = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        kucuk.push(i);
        const j = n / i;
        if (j !== i) buyuk.push(j);
      }
    }
    const has = kucuk.concat(buyuk.reverse()).filter((x) => x !== n);
    const toplam = has.reduce((a, x) => a + x, 0);
    const fark = toplam - n;
    const sonuc = fark === 0 ? 'Mükemmel sayı' : fark < 0 ? 'Mükemmel sayı değil (eksik sayı)' : 'Mükemmel sayı değil (zengin sayı)';
    const goster = has.slice(0, 40).join(', ') + (has.length > 40 ? ', …' : '');
    return {
      rows: [
        ['Sonuç', sonuc],
        ['Has bölenlerin toplamı', h.fmt(toplam, 0)],
        ['Fark (toplam − sayı)', (fark > 0 ? '+' : '') + h.fmt(fark, 0)],
        ['Has bölen adedi', String(has.length)],
        ['Has bölenler', has.length ? goster : 'Yok'],
      ],
      note: 'Has bölenler, sayının kendisi dışındaki pozitif bölenleridir. Toplam sayıya eşitse mükemmel, küçükse eksik, büyükse zengin sayıdır.',
    };
  }
