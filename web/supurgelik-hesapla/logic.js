// Süpürgelik Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const kapi = h.int(v.kapi, 'Kapı sayısı');
    if (kapi < 0) h.err('Kapı sayısı negatif olamaz; kapı yoksa 0 yazın.');
    const kapiGen = h.nonneg(v.kapiGen, 'Kapı boşluğu genişliği');
    const ek = h.nonneg(v.ek, 'Ek uzunluk');
    const parca = h.pos(v.parca, 'Süpürgelik boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const cevre = 2 * (en + boy);
    const dusulen = kapi * kapiGen;
    const net = cevre + ek - dusulen;
    if (!(net > 0)) h.err('Kapı boşlukları oda çevresinden büyük çıkıyor. Kapı sayısını ve genişliğini (metre olarak) kontrol edin.');
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / parca - 1e-9);
    return {
      rows: [
        ['Gerekli süpürgelik', h.fmt(toplam, 2) + ' m'],
        ['Alınacak adet', `${h.fmt(adet, 0)} boy (${h.fmt(parca, 2)} m)`],
        ['Satın alınan toplam', h.fmt(adet * parca, 2) + ' m'],
        ['Oda çevresi', h.fmt(cevre, 2) + ' m'],
        ['Kapı boşlukları', h.fmt(dusulen, 2) + ' m'],
        ['Net döşenecek uzunluk', h.fmt(net, 2) + ' m'],
      ],
      note: 'Hesap dikdörtgen oda içindir. L biçimli ya da girintili odalarda fazladan dönüşleri "Ek uzunluk" alanına ekleyin.',
    };
  }
