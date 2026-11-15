// Müşteri Edinme Maliyeti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const reklam = h.nonneg(v.reklam, 'Reklam harcaması');
    const diger = h.opt(v.diger, 0, 'Diğer satış ve pazarlama giderleri');
    if (diger < 0) h.err('"Diğer satış ve pazarlama giderleri" negatif olamaz.');
    const musteri = h.posint(v.musteri, 'Kazanılan yeni müşteri sayısı');
    const toplam = reklam + diger;
    if (!(toplam > 0)) h.err('Toplam harcama sıfır olamaz; reklam ya da diğer gider alanına bir tutar yazın.');
    const cac = toplam / musteri;
    const rows = [
      ['Müşteri edinme maliyeti (CAC)', h.para(cac)],
      ['Toplam satış ve pazarlama harcaması', h.para(toplam)],
      ['Yalnızca reklamla müşteri başı maliyet', h.para(reklam / musteri)],
      ['Reklamın toplam harcamadaki payı', '%' + h.fmt((reklam / toplam) * 100, 2)],
      ['1.000 TL harcamayla kazanılan müşteri', h.fmt(1000 / cac, 2)],
    ];
    let note = 'CAC = (reklam harcaması + diğer satış ve pazarlama giderleri) ÷ kazanılan yeni müşteri sayısı. Harcama ve müşteri sayısı aynı döneme ait olmalıdır.';
    if (String(v.ltv ?? '').trim() !== '') {
      const ltv = h.pos(v.ltv, 'Müşteri yaşam boyu değeri');
      const oran = ltv / cac;
      rows.push(['LTV:CAC oranı', h.fmt(oran, 2) + ' : 1']);
      rows.push(['Müşteri başına net değer', h.para(ltv - cac)]);
      if (oran < 1) note = 'LTV:CAC oranı 1\'in altında: müşteri kazanmak için harcanan tutar, müşterinin yaşam boyu değerini aşıyor.';
    }
    if (String(v.aylikKar ?? '').trim() !== '') {
      const ak = h.pos(v.aylikKar, 'Müşteri başına aylık brüt kâr');
      rows.push(['CAC geri dönüş süresi', h.fmt(cac / ak, 1) + ' ay']);
    }
    return { rows, note };
  }
