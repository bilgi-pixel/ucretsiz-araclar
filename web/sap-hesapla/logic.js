// Şap Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Zemin alanı');
    const kal = h.pos(v.kalinlik, 'Şap kalınlığı');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Çimento torbası');
    const n = v.oran === '3' ? 3 : v.oran === '5' ? 5 : 4;
    if (kal > 30) h.err('Şap kalınlığı santimetre olarak yazılmalı; 30 cm üzeri şap için değeri kontrol edin.');
    if (fire > 100) h.err('"Fire payı" en fazla 100 olabilir.');
    const hacim = alan * kal / 100 * (1 + fire / 100);
    const kuru = hacim * 1.33;
    const cimKg = kuru / (1 + n) * 1440;
    const adet = Math.ceil(cimKg / torba - 1e-9);
    const kumM3 = kuru * n / (1 + n);
    const kumTon = kumM3 * 1.6;
    return {
      rows: [
        ['Şap hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Çimento', h.fmt(cimKg, 2) + ' kg'],
        ['Çimento torbası', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
        ['Kum', h.fmt(kumM3, 2) + ' m³'],
        ['Kum (yaklaşık ağırlık)', h.fmt(kumTon, 2) + ' ton'],
        ['m² başına çimento', h.fmt(cimKg / alan, 2) + ' kg/m²'],
      ],
      note: 'Varsayımlar: kuru malzeme hacmi = yaş hacim × 1,33; çimento 1.440 kg/m³, kum 1.600 kg/m³ yığın yoğunluğu. Sonuç yaklaşık keşif içindir.',
    };
  }
