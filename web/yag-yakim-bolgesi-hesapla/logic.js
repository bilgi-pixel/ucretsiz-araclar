// Yağ Yakım Nabız Bölgesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const yas = h.pos(v.yas, 'Yaş');
    if (yas < 10 || yas > 100) h.err('Yaş 10 ile 100 arasında olmalı.');
    const maks = v.yontem === 'tanaka' ? 208 - 0.7 * yas : 220 - yas;
    const yuzde = (p) => Math.round(maks * p / 100 + 1e-9);
    const rows = [
      ['Yağ yakım nabız aralığı', `${yuzde(60)}–${yuzde(70)} atım/dk`],
      ['Tahmini maksimum nabız', h.fmt(maks, 0) + ' atım/dk'],
      ['Isınma bölgesi (%50–60)', `${yuzde(50)}–${yuzde(60)} atım/dk`],
      ['Kardiyo bölgesi (%70–80)', `${yuzde(70)}–${yuzde(80)} atım/dk`],
      ['Yüksek yoğunluk (%80–90)', `${yuzde(80)}–${yuzde(90)} atım/dk`],
    ];
    if (String(v.dinlenik ?? '').trim() !== '') {
      const d = h.pos(v.dinlenik, 'Dinlenik nabız');
      if (d < 25 || d > 120) h.err('Dinlenik nabız 25 ile 120 atım/dk arasında olmalı.');
      if (d >= maks) h.err('Dinlenik nabız tahmini maksimum nabızdan küçük olmalı; değerleri kontrol edin.');
      const rezerv = maks - d;
      const k = (p) => Math.round(d + rezerv * p / 100 + 1e-9);
      rows.push(['Nabız rezervine göre aralık (%50–65)', `${k(50)}–${k(65)} atım/dk`]);
      rows.push(['Nabız rezervi', h.fmt(rezerv, 0) + ' atım/dk']);
    }
    return {
      rows,
      note: 'Yağ yakım bölgesi, maksimum nabzın %60–70\'i olarak alınmıştır. Bu bölgede yağın enerjideki payı yüksektir, ancak toplam kalori harcaması daha yüksek yoğunluklardan düşüktür. Maksimum nabız tahmini kişiden kişiye 10–12 atım sapabilir.',
    };
  }
