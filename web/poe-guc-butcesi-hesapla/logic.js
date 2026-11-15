// PoE Güç Bütçesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const butce = h.pos(v.butce, 'Switch toplam PoE bütçesi');
    const pay = h.nonneg(v.pay, 'Yedek pay');
    const bos = (s) => String(s ?? '').trim() === '';
    let toplam = 0, port = 0, enBuyuk = 0;
    for (const i of [1, 2, 3]) {
      const a = v['adet' + i], g = v['guc' + i];
      if (i > 1 && bos(a) && bos(g)) continue;
      const adet = i === 1 ? h.posint(a, '1. cihaz grubu adedi') : h.int(a, `${i}. cihaz grubu adedi`);
      if (adet < 0) h.err(`${i}. cihaz grubu adedi negatif olamaz.`);
      if (adet === 0) continue;
      const guc = h.pos(g, `${i}. cihaz grubu gücü`);
      toplam += adet * guc;
      port += adet;
      if (guc > enBuyuk) enBuyuk = guc;
    }
    const gereken = toplam * (1 + pay / 100);
    const kalan = butce - gereken;
    const yeterli = kalan >= -1e-9;
    let standart;
    if (enBuyuk <= 12.95) standart = 'IEEE 802.3af (PoE) – port başına 15,4 W';
    else if (enBuyuk <= 25.5) standart = 'IEEE 802.3at (PoE+) – port başına 30 W';
    else if (enBuyuk <= 51) standart = 'IEEE 802.3bt Tip 3 (PoE++) – port başına 60 W';
    else if (enBuyuk <= 71.3) standart = 'IEEE 802.3bt Tip 4 (PoE++) – port başına 90 W';
    else standart = 'Standart PoE sınırının üzerinde (cihazda 71,3 W\'tan fazla)';
    return {
      rows: [
        ['Gereken PoE bütçesi (paylı)', h.fmt(gereken, 2) + ' W'],
        ['Durum', yeterli ? 'Yeterli' : 'Yetersiz'],
        ['Kalan güç', h.fmt(kalan, 2) + ' W'],
        ['Bütçe kullanım oranı', '%' + h.fmt(gereken / butce * 100, 1)],
        ['Cihazların toplam gücü', h.fmt(toplam, 2) + ' W'],
        ['Gereken PoE portu', h.fmt(port, 0) + ' port'],
        ['En güçlü cihaz için asgari standart', standart],
      ],
      note: 'Toplam bütçenin yanında her portun verebildiği en yüksek güç de cihaz için yeterli olmalıdır. Değerler planlama amaçlıdır; cihazların teknik belgelerindeki en yüksek güç tüketimini esas alın.',
    };
  }
