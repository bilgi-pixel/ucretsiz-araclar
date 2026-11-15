// İskonto Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const mod = v.mod || 'tutar';
    let liste, oran, net;
    if (mod === 'oran') {
      liste = h.pos(v.liste, 'Liste fiyatı');
      net = h.nonneg(v.net, 'İskontolu net fiyat');
      if (net > liste) h.err('İskontolu net fiyat liste fiyatından büyük olamaz; iki tutarı kontrol edin.');
      oran = ((liste - net) / liste) * 100;
    } else if (mod === 'liste') {
      net = h.pos(v.net, 'İskontolu net fiyat');
      oran = h.nonneg(v.oran, 'İskonto oranı');
      if (oran >= 100) h.err('Liste fiyatını bulmak için iskonto oranı %100\'den küçük olmalı.');
      liste = net / (1 - oran / 100);
    } else {
      liste = h.pos(v.liste, 'Liste fiyatı');
      oran = h.nonneg(v.oran, 'İskonto oranı');
      if (oran > 100) h.err('İskonto oranı %100\'den büyük olamaz.');
      net = liste * (1 - oran / 100);
    }
    const kdv = h.opt(v.kdv, 0, 'KDV oranı');
    if (kdv < 0 || kdv > 100) h.err('KDV oranı 0 ile 100 arasında olmalı.');
    const isk = liste - net;
    const sNet = ['İskontolu net fiyat', h.para(net)];
    const sOran = ['İskonto oranı', '%' + h.fmt(oran, 2)];
    const sListe = ['Liste fiyatı', h.para(liste)];
    const sIsk = ['İskonto tutarı', h.para(isk)];
    const rows = mod === 'oran' ? [sOran, sIsk, sListe, sNet] : mod === 'liste' ? [sListe, sIsk, sOran, sNet] : [sNet, sIsk, sOran, sListe];
    if (kdv > 0) {
      const kdvTutar = net * kdv / 100;
      rows.push(['KDV tutarı', h.para(kdvTutar)]);
      rows.push(['KDV dahil ödenecek', h.para(net + kdvTutar)]);
    }
    return {
      rows,
      note: kdv > 0 ? 'KDV, iskonto düşüldükten sonra kalan net fiyat üzerinden hesaplanmıştır; liste ve net fiyat KDV hariç kabul edilir.' : 'Tutarlar yazdığınız esasla (KDV dahil ya da hariç) aynen kullanılır.',
    };
  }
