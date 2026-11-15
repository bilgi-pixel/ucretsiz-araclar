// Mantolama Malzemesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const brut = h.pos(v.brut, 'Toplam cephe alanı');
    const bosluk = h.nonneg(v.bosluk, 'Pencere ve kapı boşlukları');
    const la = h.pos(v.levha, 'Bir levhanın alanı');
    const f = h.nonneg(v.fire, 'Levha ve file fire payı');
    const ys = h.nonneg(v.yapistirici, 'Yapıştırıcı sarfiyatı');
    const ss = h.nonneg(v.siva, 'Sıva sarfiyatı');
    const dm = h.nonneg(v.dubel, 'Dübel');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    if (bosluk >= brut) h.err('Pencere ve kapı boşlukları toplam cephe alanından küçük olmalı.');
    const net = brut - bosluk;
    const fireli = net * (1 + f / 100);
    const yk = net * ys, sk = net * ss;
    const yukari = (x) => Math.ceil(x - 1e-9);
    return {
      rows: [
        ['Yalıtım levhası', h.fmt(yukari(fireli / la), 0) + ' adet'],
        ['Net yalıtım alanı', h.fmt(net, 2) + ' m²'],
        ['Fireli levha alanı', h.fmt(fireli, 2) + ' m²'],
        ['Yapıştırıcı', h.fmt(yk, 1) + ' kg (' + yukari(yk / torba) + ' torba)'],
        ['Sıva', h.fmt(sk, 1) + ' kg (' + yukari(sk / torba) + ' torba)'],
        ['Dübel', h.fmt(yukari(net * dm), 0) + ' adet'],
        ['Donatı filesi', h.fmt(fireli * 1.1, 1) + ' m²'],
      ],
      note: 'File miktarına fire payının yanında yüzde 10 bindirme payı eklenmiştir. Sarfiyatlar ürüne ve yüzey düzgünlüğüne göre değişir; ürün etiketini esas alın.',
    };
  }
