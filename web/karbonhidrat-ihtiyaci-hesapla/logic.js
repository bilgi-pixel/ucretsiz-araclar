// Günlük Karbonhidrat İhtiyacı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kal = h.pos(v.kalori, 'Günlük kalori');
    if (kal < 500 || kal > 10000) h.err('Günlük kalori 500 ile 10.000 kcal arasında olmalı.');
    const alt = h.pos(v.altYuzde, 'Alt sınır yüzdesi');
    const ust = h.pos(v.ustYuzde, 'Üst sınır yüzdesi');
    if (ust > 100) h.err('Üst sınır yüzdesi 100\'den büyük olamaz.');
    if (alt > ust) h.err('Alt sınır yüzdesi üst sınırdan büyük olamaz; iki değerin yerini değiştirin.');
    const kAlt = kal * alt / 100, kUst = kal * ust / 100;
    const gAlt = kAlt / 4, gUst = kUst / 4;
    const tek = Math.abs(alt - ust) < 1e-9;
    const aralik = (x, y, d, birim) => (tek || Math.abs(x - y) < 1e-9 ? `${h.fmt(x, d)}${birim}` : `${h.fmt(x, d)} – ${h.fmt(y, d)}${birim}`);
    const rows = [
      ['Günlük karbonhidrat', aralik(gAlt, gUst, 0, ' g')],
      ['Karbonhidrattan gelen kalori', aralik(kAlt, kUst, 0, ' kcal')],
      ['Aralığın ortası', h.fmt((gAlt + gUst) / 2, 0) + ' g'],
    ];
    const kiloVar = String(v.kilo ?? '').trim() !== '';
    const tablo = { hafif: [3, 5], orta: [5, 7], yogun: [6, 10], cokyogun: [8, 12] };
    const sp = tablo[v.spor];
    if (sp && !kiloVar) h.err('Antrenman düzeyine göre hedef için kilonuzu da yazın ya da düzeyi "Belirtmek istemiyorum" olarak bırakın.');
    if (kiloVar) {
      const kilo = h.pos(v.kilo, 'Kilo');
      if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı.');
      rows.push(['Kilogram başına', aralik(gAlt / kilo, gUst / kilo, 2, ' g/kg')]);
      if (sp) rows.push(['Antrenman düzeyine göre hedef', `${h.fmt(kilo * sp[0], 0)} – ${h.fmt(kilo * sp[1], 0)} g (${sp[0]}–${sp[1]} g/kg)`]);
    }
    return {
      rows,
      note: gAlt < 130 - 1e-9
        ? 'Alt sınır günde 130 gramın altında. Bu değer, beslenme başvuru kaynaklarında yetişkinler için anılan en az karbonhidrat miktarıdır; düşük karbonhidratlı beslenmeyi bir uzmanla planlayın.'
        : 'Karbonhidrat 4 kcal/g kabul edildi. Sonuç bilgilendirme amaçlıdır; diyabetiniz varsa miktarı hekiminiz ve diyetisyeniniz belirler.',
    };
  }
