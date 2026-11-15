// Kereste Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const k = h.pos(v.kalinlik, 'Kalınlık');
    const g = h.pos(v.genislik, 'Genişlik');
    const b = h.pos(v.boy, 'Boy');
    const n = h.posint(v.adet, 'Adet');
    const fiyat = h.opt(v.fiyat, null, 'Metreküp fiyatı');
    if (fiyat !== null && fiyat < 0) h.err('"Metreküp fiyatı" negatif olamaz.');
    const tek = (k / 100) * (g / 100) * b;
    const toplam = tek * n;
    const rows = [
      ['Toplam hacim', h.fmt(toplam, 4) + ' m³'],
      ['Tek parça hacmi', h.fmt(tek, 5) + ' m³'],
      ['Toplam hacim (dm³)', h.fmt(toplam * 1000, 1) + ' dm³'],
      ['Toplam uzunluk', h.fmt(b * n, 2) + ' m (metretül)'],
      ['Geniş yüzey alanı (tek yüz)', h.fmt((g / 100) * b * n, 2) + ' m²'],
      ['1 m³ içindeki parça sayısı', h.fmt(1 / tek, 1) + ' adet'],
    ];
    if (fiyat !== null) {
      rows.push(['Toplam tutar', h.para(toplam * fiyat)]);
      rows.push(['Parça başı maliyet', h.para(tek * fiyat)]);
    }
    return { rows, note: 'Hacim = kalınlık × genişlik × boy × adet. Nominal ölçüler kullanılır; rendeleme ve kuruma payı ayrıca düşülmez.' };
  }
