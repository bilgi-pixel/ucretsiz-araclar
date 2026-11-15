// Müşteri Yaşam Boyu Değeri Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const sepet = h.pos(v.sepet, 'Ortalama sipariş tutarı');
    const siklik = h.pos(v.siklik, 'Yıllık satın alma sayısı');
    const omur = h.pos(v.omur, 'Ortalama müşteri ömrü');
    const marj = h.opt(v.marj, 100, 'Brüt kâr marjı');
    if (!(marj > 0) || marj > 100) h.err('"Brüt kâr marjı" 0\'dan büyük ve en fazla 100 olmalı.');
    const yillikCiro = sepet * siklik;
    const omurCiro = yillikCiro * omur;
    const clv = omurCiro * (marj / 100);
    const yillikKar = yillikCiro * (marj / 100);
    const rows = [
      ['Müşteri yaşam boyu değeri', h.para(clv)],
      ['Yaşam boyu ciro', h.para(omurCiro)],
      ['Müşteri başına yıllık ciro', h.para(yillikCiro)],
      ['Müşteri başına yıllık brüt kâr', h.para(yillikKar)],
      ['Yaşam boyu sipariş sayısı', h.fmt(siklik * omur, 2)],
    ];
    let note = 'CLV = ortalama sipariş tutarı × yıllık satın alma sayısı × müşteri ömrü × brüt kâr marjı. Gelecekteki gelirler bugüne indirgenmemiştir.';
    if (String(v.cac ?? '').trim() !== '') {
      const cac = h.pos(v.cac, 'Müşteri edinme maliyeti');
      const oran = clv / cac;
      rows.push(['LTV:CAC oranı', h.fmt(oran, 2) + ' : 1']);
      rows.push(['Edinme maliyeti sonrası net değer', h.para(clv - cac)]);
      rows.push(['Edinme maliyetinin geri dönüş süresi', h.fmt(cac / (yillikKar / 12), 1) + ' ay']);
      if (oran < 1) note = 'LTV:CAC oranı 1\'in altında: bir müşteriyi kazanmak, o müşterinin getirdiği brüt kârdan pahalıya geliyor.';
    }
    return { rows, note };
  }
