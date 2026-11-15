// Yıllık Maaş Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const maas = h.pos(v.maas, 'Aylık maaş');
    const ay = h.opt(v.ay, 12, 'Yıl içinde çalışılan ay');
    if (!(ay > 0) || ay > 12) h.err('"Yıl içinde çalışılan ay" 0\'dan büyük ve en fazla 12 olmalı.');
    const ikr = h.opt(v.ikramiye, 0, 'Yıllık ikramiye sayısı');
    const prim = h.opt(v.prim, 0, 'Yıllık prim ve ek ödemeler');
    const yan = h.opt(v.yanHak, 0, 'Aylık yan haklar');
    if (ikr < 0 || prim < 0 || yan < 0) h.err('İkramiye, prim ve yan hak değerleri negatif olamaz.');
    const temel = maas * ay;
    const ikrTutar = maas * ikr;
    const yanYil = yan * ay;
    const toplam = temel + ikrTutar + prim + yanYil;
    return {
      rows: [
        ['Yıllık toplam gelir', h.para(toplam)],
        ['Yıllık maaş (ek ödemeler hariç)', h.para(temel)],
        ['İkramiye tutarı', h.para(ikrTutar)],
        ['Prim ve ek ödemeler', h.para(prim)],
        ['Yan haklar (yıllık)', h.para(yanYil)],
        ['Aylık ortalama (12 aya bölünmüş)', h.para(toplam / 12)],
        ['Günlük ortalama (365 gün)', h.para(toplam / 365)],
      ],
      note: 'Girdiğiniz tutarlar brütse sonuç brüt, netse nettir. Vergi ve prim kesintisi hesaplanmaz; yıl içindeki zamlar dikkate alınmaz.',
    };
  }
