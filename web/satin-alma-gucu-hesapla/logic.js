// Satın Alma Gücü Kaybı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Tutar');
    const e = h.nonneg(v.enflasyon, 'Yıllık enflasyon oranı');
    const yil = h.pos(v.yil, 'Süre');
    if (e > 100000) h.err('"Yıllık enflasyon oranı" çok yüksek; yüzde olarak yazdığınızdan emin olun (örn. 25).');
    if (yil > 100) h.err('"Süre" en fazla 100 yıl olabilir.');
    const carpan = Math.pow(1 + e / 100, yil);
    const reel = tutar / carpan;
    const kayip = tutar - reel;
    return {
      rows: [
        ['Süre sonunda bugünkü fiyatlarla değeri', h.para(reel)],
        ['Satın alma gücü kaybı', `${h.para(kayip)} (%${h.fmt(kayip / tutar * 100, 2)})`],
        ['Aynı gücü korumak için gereken tutar', h.para(tutar * carpan)],
        ['Toplam fiyat artışı', '%' + h.fmt((carpan - 1) * 100, 2)],
      ],
      note: 'Enflasyonun her yıl aynı oranda ve bileşik olarak gerçekleştiği varsayılır. Paranın bu sürede getiri sağlamadığı kabul edilir.',
    };
  }
