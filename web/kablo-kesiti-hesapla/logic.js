// Kablo Kesiti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sistem = ['tek', 'uc', 'dc'].includes(v.sistem) ? v.sistem : 'tek';
    const u = h.pos(v.gerilim, 'Gerilim');
    const i = h.pos(v.akim, 'Akım');
    const l = h.pos(v.uzunluk, 'Hat uzunluğu');
    const yuzde = h.pos(v.dusum, 'İzin verilen gerilim düşümü');
    if (yuzde >= 100) h.err('"İzin verilen gerilim düşümü" %100\'den küçük olmalı; tipik değerler %1 ile %5 arasındadır.');
    let cosfi = 1;
    if (sistem !== 'dc') {
      cosfi = h.pos(v.cosfi, 'Güç faktörü');
      if (cosfi > 1) h.err('"Güç faktörü" 0 ile 1 arasında olmalı (örn. 0,85).');
    }
    const iletkenlik = v.malzeme === 'al' ? 35 : 56;
    const katsayi = sistem === 'uc' ? Math.sqrt(3) : 2;
    const izinli = (u * yuzde) / 100;
    const pay = katsayi * l * i * cosfi;
    const kesit = pay / (iletkenlik * izinli);
    const standartlar = sistem === 'dc'
      ? [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240]
      : [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
    const secilen = standartlar.find((s) => s >= kesit * (1 - 1e-9));
    if (!secilen) h.err(`Hesaplanan kesit ${h.fmt(kesit, 1)} mm² olup 240 mm²'den büyük. Hattı paralel kablolarla kurmayı, gerilimi yükseltmeyi ya da mesafeyi kısaltmayı değerlendirin.`);
    const gercek = pay / (iletkenlik * secilen);
    return {
      rows: [
        ['Önerilen standart kesit', h.fmt(secilen, 2) + ' mm²'],
        ['Hesaplanan en küçük kesit', h.fmt(kesit, 3) + ' mm²'],
        ['İzin verilen gerilim düşümü', h.fmt(izinli, 3) + ' V'],
        ['Seçilen kesitte gerilim düşümü', `${h.fmt(gercek, 3)} V (%${h.fmt((gercek / u) * 100, 2)})`],
        ['Hat sonundaki gerilim', h.fmt(u - gercek, 2) + ' V'],
        ['Akım yoğunluğu', h.fmt(i / secilen, 2) + ' A/mm²'],
      ],
      note: 'Bu sonuç yalnızca gerilim düşümü ölçütüne göredir. Seçilen kesitin akım taşıma kapasitesi (döşeme şekli, ortam sıcaklığı, kablo tipi) ve koruma elemanıyla uyumu ayrıca kontrol edilmelidir; iki ölçütten büyük olan kesit kullanılır.',
    };
  }
