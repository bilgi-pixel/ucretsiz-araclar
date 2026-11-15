// Palet Yükleme Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.paletBoy, 'Palet boyu');
    const W = h.pos(v.paletEn, 'Palet eni');
    const a = h.pos(v.koliBoy, 'Koli boyu');
    const b = h.pos(v.koliEn, 'Koli eni');
    const y = h.pos(v.koliYuk, 'Koli yüksekliği');
    const Y = h.pos(v.yukYuk, 'İzin verilen yük yüksekliği');
    const kg = h.opt(v.koliKg, null, 'Koli ağırlığı');
    const maxKg = h.opt(v.azamiKg, null, 'Azami palet yükü');
    if (kg !== null && !(kg > 0)) h.err('"Koli ağırlığı" sıfırdan büyük olmalı ya da boş bırakılmalı.');
    if (maxKg !== null && !(maxKg > 0)) h.err('"Azami palet yükü" sıfırdan büyük olmalı ya da boş bırakılmalı.');
    if (maxKg !== null && kg === null) h.err('Ağırlık sınırını uygulamak için "Koli ağırlığı" alanını da doldurun.');
    const fl = (x) => Math.floor(x + 1e-9);
    // P×Q tabana p×q koliyi iki bloklu dizilimle yerleştir: k sıra düz + kalan şeritte çevrilmiş.
    const blok = (P, Q, p, q) => {
      let en = { n: 0, duz: 0, cevrik: 0 };
      const kMax = fl(P / p);
      for (let k = 0; k <= kMax; k++) {
        const duz = k * fl(Q / q);
        const kalan = P - k * p;
        const cevrik = fl(kalan / q) * fl(Q / p);
        if (duz + cevrik > en.n) en = { n: duz + cevrik, duz, cevrik };
      }
      return en;
    };
    // "Düz" = koli boyu palet boyuna paralel. 2. ve 3. adayda blokların anlamı terstir, yer değiştir.
    const ters = (c) => ({ n: c.n, duz: c.cevrik, cevrik: c.duz });
    const adaylar = [blok(L, W, a, b), ters(blok(L, W, b, a)), ters(blok(W, L, a, b)), blok(W, L, b, a)];
    let en = adaylar[0];
    for (const c of adaylar) if (c.n > en.n) en = c;
    if (en.n < 1) h.err('Koli tabanı palete sığmıyor. Koli ölçülerini ya da palet ölçüsünü kontrol edin.');
    const kat = fl(Y / y);
    if (kat < 1) h.err('Koli yüksekliği izin verilen yük yüksekliğinden büyük; yükseklik sınırını artırın.');
    let toplam = en.n * kat;
    let sinir = 'Yükseklik';
    if (maxKg !== null) {
      const agirlikAdet = fl(maxKg / kg);
      if (agirlikAdet < 1) h.err('Tek bir koli bile azami palet yükünü aşıyor; ağırlık değerlerini kontrol edin.');
      if (agirlikAdet < toplam) { toplam = agirlikAdet; sinir = 'Ağırlık'; }
    }
    const doluKat = Math.ceil(toplam / en.n - 1e-9);
    const dizilim = en.duz > 0 && en.cevrik > 0 ? `Karma: ${en.duz} düz + ${en.cevrik} çevrilmiş` : 'Tek yönlü (hepsi aynı yönde)';
    const rows = [
      ['Paletteki toplam koli', h.fmt(toplam, 0) + ' adet'],
      ['Kat başına koli', h.fmt(en.n, 0) + ' adet'],
      ['Kat sayısı', h.fmt(doluKat, 0) + ' kat'],
      ['Yük yüksekliği', h.fmt(doluKat * y, 1) + ' cm'],
      ['Taban alanı kullanımı', '%' + h.fmt((en.n * a * b) / (L * W) * 100, 1)],
      ['Kat dizilimi', dizilim],
      ['Belirleyici sınır', sinir],
    ];
    if (kg !== null) rows.push(['Toplam koli ağırlığı', h.fmt(toplam * kg, 1) + ' kg']);
    rows.push(['Toplam koli hacmi', h.fmt(toplam * a * b * y / 1e6, 3) + ' m³']);
    return {
      rows,
      note: 'Koliler dik konumda (yüksekliği sabit) ve palet dışına taşmadan dizilir. Palet tahtasının kendi yüksekliği ve ağırlığı hesaba dahil değildir.',
    };
  }
