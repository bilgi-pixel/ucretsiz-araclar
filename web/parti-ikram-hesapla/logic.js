// Parti İkram ve İçecek Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kisi = h.posint(v.kisi, 'Davetli sayısı');
    if (kisi > 5000) h.err('En fazla 5.000 davetli için hesap yapılır.');
    const sure = h.pos(v.sure === '' ? '3' : v.sure, 'Parti süresi');
    if (sure > 12) h.err('Parti süresi en fazla 12 saat olabilir.');
    const bardak = h.pos(v.bardak === '' ? '200' : v.bardak, 'Bardak hacmi');
    const saatlik = v.tur === 'yemek' ? 6 : 4;
    const kisiParca = Math.ceil(saatlik * sure - 1e-9);
    const kisiIcecek = Math.ceil((sure <= 1 ? 2 : 1 + sure) - 1e-9);
    const toplamIcecek = kisi * kisiIcecek;
    const litre = toplamIcecek * bardak / 1000;
    return {
      rows: [
        ['Toplam ikram', h.fmt(kisi * kisiParca, 0) + ' parça'],
        ['Kişi başı ikram', kisiParca + ' parça'],
        ['Toplam içecek', h.fmt(toplamIcecek, 0) + ' bardak'],
        ['Kişi başı içecek', kisiIcecek + ' bardak'],
        ['İçecek hacmi', h.fmt(litre, 1) + ' litre'],
        ['Pasta', h.fmt(kisi, 0) + ' dilim'],
        ['Peçete', h.fmt(kisi * 3, 0) + ' adet'],
      ],
      note: 'Planlama kuralları: hafif ikramda kişi başı saatte 4, yemek yerine geçen ikramda saatte 6 parça; içecekte ilk saat 2 bardak, sonraki her saat 1 bardak; kişi başı 1 dilim pasta ve 3 peçete. Sonuçlar yukarı yuvarlanır.',
    };
  }
