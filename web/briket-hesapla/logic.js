// Briket Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const H = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.nonneg(v.bosluk, 'Kapı ve pencere boşlukları');
    const bb = h.pos(v.briketBoy, 'Briket uzunluğu');
    const by = h.pos(v.briketYuk, 'Briket yüksekliği');
    const derz = h.nonneg(v.derz, 'Derz kalınlığı') / 10;
    const fire = h.nonneg(v.fire, 'Fire payı');
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    if (derz > 5) h.err('Derz kalınlığı milimetre cinsindendir ve 50 mm\'yi geçemez; genellikle 10 mm kullanılır.');
    const brut = L * H;
    if (bos >= brut) h.err('Boşluk alanı duvar alanından küçük olmalı; kapı ve pencere ölçülerini kontrol edin.');
    const net = brut - bos;
    const m2Adet = 10000 / ((bb + derz) * (by + derz));
    const firesiz = net * m2Adet;
    const adet = Math.ceil(firesiz * (1 + fire / 100) - 1e-9);
    const sira = Math.ceil(H * 100 / (by + derz) - 1e-9);
    return {
      rows: [
        ['Gereken briket (fire dahil)', h.fmt(adet, 0) + ' adet'],
        ['Firesiz briket sayısı', h.fmt(firesiz, 1) + ' adet'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Metrekare başına briket', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Sıra sayısı', h.fmt(sira, 0) + ' sıra'],
        ['Bir sıradaki briket (tam uzunlukta)', h.fmt(L * 100 / (bb + derz), 1) + ' adet'],
      ],
      note: 'Tek sıra (briket boyuna dizili) örgü varsayılır. Harç, hatıl, kolon ve temel bu hesaba dahil değildir.',
    };
  }
