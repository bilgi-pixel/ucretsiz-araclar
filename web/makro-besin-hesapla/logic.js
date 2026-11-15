// Makro Besin Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kal = h.pos(v.kalori, 'Günlük kalori');
    if (kal < 500 || kal > 10000) h.err('Günlük kalori 500 ile 10.000 kcal arasında olmalı.');
    const pk = h.nonneg(v.karb, 'Karbonhidrat yüzdesi');
    const pp = h.nonneg(v.protein, 'Protein yüzdesi');
    const py = h.nonneg(v.yag, 'Yağ yüzdesi');
    const toplam = pk + pp + py;
    if (Math.abs(toplam - 100) > 0.01) h.err(`Yüzdelerin toplamı 100 olmalı; şu an ${h.fmt(toplam, 2)}. Değerleri düzeltin.`);
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 10) h.err('Öğün sayısı en fazla 10 olabilir.');
    const kk = kal * pk / 100, kp = kal * pp / 100, ky = kal * py / 100;
    const gk = kk / 4, gp = kp / 4, gy = ky / 9;
    const satir = (g, k) => `${h.fmt(g, 1)} g (${h.fmt(k, 0)} kcal)`;
    const rows = [
      ['Karbonhidrat', satir(gk, kk)],
      ['Protein', satir(gp, kp)],
      ['Yağ', satir(gy, ky)],
      ['Öğün başına', `${h.fmt(gk / ogun, 1)} g karbonhidrat, ${h.fmt(gp / ogun, 1)} g protein, ${h.fmt(gy / ogun, 1)} g yağ`],
    ];
    if (String(v.kilo ?? '').trim() !== '') {
      const kilo = h.pos(v.kilo, 'Kilo');
      if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı.');
      rows.push(['Kilogram başına protein', h.fmt(gp / kilo, 2) + ' g/kg']);
      rows.push(['Kilogram başına karbonhidrat', h.fmt(gk / kilo, 2) + ' g/kg']);
    }
    return {
      rows,
      note: 'Karbonhidrat ve protein 4 kcal/g, yağ 9 kcal/g kabul edildi. Alkol ve lif ayrıca hesaba katılmadı.',
    };
  }
