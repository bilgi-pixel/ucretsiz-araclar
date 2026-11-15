// Verim Hesaplama (Fizik) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let gir, cik, eta;
    if (v.mod === 'cikis') {
      gir = h.pos(v.giris, 'Giriş');
      eta = h.nonneg(v.verim, 'Verim');
      if (eta > 100) h.err('Verim yüzde 100\'den büyük olamaz; hiçbir makine harcadığından fazla enerji veremez.');
      cik = (gir * eta) / 100;
    } else if (v.mod === 'giris') {
      cik = h.nonneg(v.cikis, 'Çıkış');
      eta = h.pos(v.verim, 'Verim');
      if (eta > 100) h.err('Verim yüzde 100\'den büyük olamaz; hiçbir makine harcadığından fazla enerji veremez.');
      gir = (cik * 100) / eta;
    } else {
      gir = h.pos(v.giris, 'Giriş');
      cik = h.nonneg(v.cikis, 'Çıkış');
      if (cik > gir) h.err('Çıkış girişten büyük olamaz. Değerlerin yerini ve birimlerini kontrol edin; yararlı çıkış her zaman harcanan girişten küçük ya da ona eşittir.');
      eta = (cik / gir) * 100;
    }
    const kayip = gir - cik;
    const V = ['Verim', '%' + h.fmt(eta, 2)];
    const G = ['Giriş (harcanan)', h.fmt(gir, 4)];
    const C = ['Çıkış (yararlı)', h.fmt(cik, 4)];
    const ilk = v.mod === 'cikis' ? [C, G, V] : v.mod === 'giris' ? [G, C, V] : [V, G, C];
    return {
      rows: [
        ...ilk,
        ['Kayıp', h.fmt(kayip, 4)],
        ['Kayıp oranı', '%' + h.fmt(100 - eta, 2)],
        ['Verim (ondalık)', h.fmt(eta / 100, 4)],
      ],
      note: 'Giriş, çıkış ve kayıp değerleri girdiğiniz birimdedir. Kayıp çoğunlukla ısı, ses ve sürtünme olarak ortama yayılan enerjidir.',
    };
  }
