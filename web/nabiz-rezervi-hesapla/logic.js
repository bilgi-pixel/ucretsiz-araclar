// Nabız Rezervi (Karvonen) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const dinlenik = h.pos(v.dinlenik, 'Dinlenik nabız');
    if (dinlenik < 25 || dinlenik > 120) h.err('Dinlenik nabız 25 ile 120 atım/dk arasında olmalı; dinlenme hâlindeki ölçümünüzü yazın.');
    let maks, kaynak;
    if (String(v.maks ?? '').trim() !== '') {
      maks = h.pos(v.maks, 'Maksimum nabız');
      if (maks < 90 || maks > 230) h.err('Maksimum nabız 90 ile 230 atım/dk arasında olmalı.');
      kaynak = 'girilen değer';
    } else {
      const yas = h.pos(v.yas, 'Yaş');
      if (yas < 10 || yas > 100) h.err('Yaş 10 ile 100 arasında olmalı.');
      maks = 220 - yas;
      kaynak = '220 − yaş';
    }
    if (maks <= dinlenik) h.err('Maksimum nabız dinlenik nabızdan büyük olmalı; değerleri kontrol edin.');
    const alt = h.pos(v.alt, 'Yoğunluk alt sınırı');
    const ust = h.pos(v.ust, 'Yoğunluk üst sınırı');
    if (alt > 100 || ust > 100) h.err('Yoğunluk yüzdeleri 100\'den büyük olamaz.');
    if (alt > ust) h.err('Yoğunluk alt sınırı üst sınırdan büyük olamaz.');
    const rezerv = maks - dinlenik;
    const hedef = (p) => Math.round(dinlenik + rezerv * p / 100 + 1e-9);
    const rows = [
      ['Hedef nabız aralığı', `${hedef(alt)}–${hedef(ust)} atım/dk`],
      ['Nabız rezervi', h.fmt(rezerv, 0) + ' atım/dk'],
      ['Maksimum nabız', `${h.fmt(maks, 0)} atım/dk (${kaynak})`],
      ['Dinlenik nabız', h.fmt(dinlenik, 0) + ' atım/dk'],
    ];
    const bolgeler = [
      ['Bölge 1 – Çok hafif (%50–60)', 50, 60],
      ['Bölge 2 – Hafif (%60–70)', 60, 70],
      ['Bölge 3 – Orta (%70–80)', 70, 80],
      ['Bölge 4 – Zor (%80–90)', 80, 90],
      ['Bölge 5 – Maksimum (%90–100)', 90, 100],
    ];
    for (const [ad, a, b] of bolgeler) rows.push([ad, `${hedef(a)}–${hedef(b)} atım/dk`]);
    return {
      rows,
      note: 'Hedef nabız = dinlenik nabız + nabız rezervi × yoğunluk. 220 − yaş tahmini kişiden kişiye 10–12 atım sapabilir; ölçülmüş maksimum nabzınız varsa onu kullanın.',
    };
  }
