// Kira Getirisi ve Amortisman Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Satın alma fiyatı');
    const kira = h.pos(v.kira, 'Aylık kira');
    const gider = h.opt(v.gider, 0, 'Yıllık giderler');
    const bos = h.opt(v.bosAy, 0, 'Yılda boş kalan süre');
    if (gider < 0) h.err('"Yıllık giderler" negatif olamaz.');
    if (bos < 0 || bos > 12) h.err('"Yılda boş kalan süre" 0 ile 12 ay arasında olmalı.');
    const brut = kira * 12;
    const net = kira * (12 - bos) - gider;
    const brutYil = fiyat / brut;
    const rows = [
      ['Brüt kira getirisi', '%' + h.fmt(brut / fiyat * 100, 2)],
      ['Amortisman süresi (brüt)', `${h.fmt(brutYil, 2)} yıl (${h.fmt(fiyat / kira, 1)} ay)`],
      ['Yıllık brüt kira', h.para(brut)],
      ['Yıllık net kira', h.para(net)],
      ['Net kira getirisi', '%' + h.fmt(net / fiyat * 100, 2)],
      ['Amortisman süresi (net)', net > 1e-9 ? `${h.fmt(fiyat / net, 2)} yıl` : 'Hesaplanamaz (net kira geliri yok)'],
    ];
    return { rows, note: 'Kira ve fiyatın sabit kaldığı varsayılır; kira artışı, değer artışı, enflasyon ve gelir vergisi hesaba katılmaz.' };
  }
