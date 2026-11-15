// Collatz Dizisi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n0 = h.posint(v.sayi, 'Başlangıç sayısı');
    if (n0 > 1e12) h.err('Başlangıç sayısı en fazla 1.000.000.000.000 (bir trilyon) olabilir; daha küçük bir sayı yazın.');
    let n = n0, tepe = n0, cift = 0, tek = 0;
    const dizi = [n0];
    while (n !== 1) {
      if (n % 2 === 0) { n = n / 2; cift++; }
      else {
        if (n > (Number.MAX_SAFE_INTEGER - 1) / 3) h.err('Dizi bu sayı için tam hesaplanamayacak kadar büyük değerlere çıkıyor; daha küçük bir başlangıç sayısı deneyin.');
        n = 3 * n + 1; tek++;
      }
      if (n > tepe) tepe = n;
      dizi.push(n);
      if (dizi.length > 100000) h.err('Dizi 100.000 terimi aştı; daha küçük bir başlangıç sayısı deneyin.');
    }
    const adim = cift + tek;
    return {
      rows: [
        ['Adım sayısı', h.fmt(adim, 0)],
        ['En yüksek değer', h.fmt(tepe, 0)],
        ['Terim sayısı', h.fmt(dizi.length, 0)],
        ['Çift adım (n ÷ 2)', h.fmt(cift, 0)],
        ['Tek adım (3n + 1)', h.fmt(tek, 0)],
        ['Tepe değerin başlangıca oranı', h.fmt(tepe / n0, 2) + ' kat'],
      ],
      text: dizi.join(' → '),
      note: adim === 0 ? 'Başlangıç sayısı zaten 1 olduğu için hiç adım atılmadı.' : 'Dizi 1\'e ulaştığında durdurulur; devam ettirilirse 4 → 2 → 1 döngüsü sonsuza kadar tekrar eder.',
    };
  }
