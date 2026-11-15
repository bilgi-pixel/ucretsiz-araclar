// Harç Karışımı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const hacim = h.pos(v.hacim, 'Harç hacmi');
    const c = h.pos(v.cimentoPay, 'Çimento payı');
    const k = h.pos(v.kumPay, 'Kum payı');
    const l = h.nonneg(v.kirecPay, 'Kireç payı');
    const kat = h.pos(v.katsayi, 'Kuru hacim katsayısı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const su = h.nonneg(v.suOran, 'Su / çimento oranı');
    if (kat < 1 || kat > 2) h.err('Kuru hacim katsayısı 1 ile 2 arasında olmalı (genellikle 1,25–1,35).');
    const YOGUNLUK = 1440; // gevşek dökme çimento, kg/m³
    const kuru = hacim * kat;
    const toplam = c + k + l;
    const cimM3 = kuru * c / toplam;
    const kumM3 = kuru * k / toplam;
    const kirecM3 = kuru * l / toplam;
    const cimKg = cimM3 * YOGUNLUK;
    const adet = Math.ceil(cimKg / torba - 1e-9);
    const rows = [
      ['Çimento', h.fmt(cimKg, 1) + ' kg'],
      ['Çimento torbası', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
      ['Kum', `${h.fmt(kumM3, 3)} m³ (${h.fmt(kumM3 * 1000, 0)} litre)`],
    ];
    if (l > 0) rows.push(['Kireç', `${h.fmt(kirecM3, 3)} m³ (${h.fmt(kirecM3 * 1000, 0)} litre)`]);
    rows.push(['Kuru karışım hacmi', h.fmt(kuru, 3) + ' m³']);
    rows.push(['Yaklaşık su', h.fmt(cimKg * su, 0) + ' litre']);
    return {
      rows,
      note: 'Oranlar hacimce alınır. Çimentonun gevşek yığın yoğunluğu 1.440 kg/m³ kabul edilmiştir; kumun nemi ve tane yapısı sonucu değiştirebilir.',
    };
  }
