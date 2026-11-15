// Çim Tohumu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Ekilecek alan');
    const g = h.pos(v.siklik, 'Ekim sıklığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const paket = h.pos(v.paket, 'Paket ağırlığı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    const net = alan * g / 1000;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / paket - 1e-9);
    return {
      rows: [
        ['Gereken tohum (fire dahil)', h.fmt(toplam, 3) + ' kg'],
        ['Firesiz miktar', h.fmt(net, 3) + ' kg'],
        ['Alınacak paket', h.fmt(adet, 0) + ' paket (' + h.fmt(paket, 2) + ' kg\'lık)'],
        ['Satın alınan toplam', h.fmt(adet * paket, 2) + ' kg'],
        ['Artan tohum', h.fmt(adet * paket - toplam, 3) + ' kg'],
      ],
      note: 'Ekim sıklığı tohum karışımına göre değişir; paketteki üretici önerisini esas alın. Ekimi iki çapraz geçişte, miktarı ikiye bölerek yapmak daha dengeli sonuç verir.',
    };
  }
