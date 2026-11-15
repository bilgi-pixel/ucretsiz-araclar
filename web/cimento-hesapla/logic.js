// Çimento Torbası Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hacim = h.pos(v.hacim, 'Karışım hacmi');
    const dozaj = h.pos(v.dozaj, 'Dozaj');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = Number(v.torba) || 50;
    if (fire > 100) h.err('"Fire payı" %100\'den büyük olamaz.');
    if (dozaj > 1000) h.err('Dozaj 1.000 kg/m³\'ten büyük olamaz; yapı işlerinde genellikle 150–500 kg/m³ arası değerler kullanılır.');
    const net = hacim * dozaj;
    const kg = net * (1 + fire / 100);
    const adet = Math.ceil(kg / torba - 1e-9);
    return {
      rows: [
        ['Gereken torba sayısı', h.fmt(adet, 0) + ' torba (' + torba + ' kg\'lık)'],
        ['Toplam çimento', h.fmt(kg, 1) + ' kg'],
        ['Toplam çimento (ton)', h.fmt(kg / 1000, 3) + ' ton'],
        ['Firesiz çimento', h.fmt(net, 1) + ' kg'],
        ['1 m³ karışım için torba', h.fmt(dozaj / torba, 2) + ' torba'],
        ['Satın alınan miktar', h.fmt(adet * torba, 0) + ' kg'],
      ],
      note: 'Torba sayısı yukarı yuvarlanır. Dozaj, yerine yerleşmiş 1 m³ karışımdaki çimento miktarıdır; kum, çakıl ve su ayrıca hesaplanır.',
    };
  }
