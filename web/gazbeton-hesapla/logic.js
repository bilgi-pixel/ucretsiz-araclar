// Gazbeton (Ytong) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.nonneg(v.bosluk, 'Kapı ve pencere boşlukları');
    const bb = h.pos(v.blokBoy, 'Blok uzunluğu');
    const by = h.pos(v.blokYuk, 'Blok yüksekliği');
    const bk = h.pos(v.kalinlik, 'Blok kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    const brut = L * H;
    if (bos >= brut) h.err('Boşluk alanı duvar alanından küçük olmalı; kapı ve pencere ölçülerini kontrol edin.');
    const net = brut - bos;
    const m2Adet = 10000 / (bb * by);
    const firesiz = net * m2Adet;
    const adet = Math.ceil(firesiz * (1 + fire / 100) - 1e-9);
    const blokHacim = bb * by * bk / 1e6;
    return {
      rows: [
        ['Gereken blok (fire dahil)', h.fmt(adet, 0) + ' adet'],
        ['Firesiz blok sayısı', h.fmt(firesiz, 1) + ' adet'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Metrekare başına blok', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Duvar hacmi', h.fmt(net * bk / 100, 3) + ' m³'],
        ['Sipariş hacmi (fire dahil)', h.fmt(adet * blokHacim, 3) + ' m³'],
      ],
      note: 'İnce derzli (yapıştırıcılı) örgü varsayılır; birkaç milimetrelik derz kalınlığı hesaba katılmaz. Lento, hatıl ve U blok gibi özel elemanlar ayrıca hesaplanmalıdır.',
    };
  }
