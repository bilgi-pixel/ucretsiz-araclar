// Korelasyon Katsayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.xler, 'X değerleri');
    const y = h.nums(v.yler, 'Y değerleri');
    if (x.length !== y.length) h.err(`X değerlerinin sayısı (${x.length}) ile Y değerlerinin sayısı (${y.length}) eşit olmalı. Her X değerinin bir Y eşi bulunmalı.`);
    const n = x.length;
    if (n < 2) h.err('Korelasyon için en az iki veri çifti gerekir; anlamlı bir sonuç için çok daha fazlasını girin.');
    const ox = x.reduce((s, a) => s + a, 0) / n;
    const oy = y.reduce((s, a) => s + a, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - ox, dy = y[i] - oy;
      sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
    }
    const olcek = Math.max(1, ...x.map(Math.abs), ...y.map(Math.abs));
    const esik = 1e-18 * olcek * olcek;
    if (sxx <= esik) h.err('X değerlerinin hepsi aynı; değişmeyen bir değişkenle korelasyon hesaplanamaz.');
    if (syy <= esik) h.err('Y değerlerinin hepsi aynı; değişmeyen bir değişkenle korelasyon hesaplanamaz.');
    let r = sxy / Math.sqrt(sxx * syy);
    if (1 - Math.abs(r) < 1e-12) r = r > 0 ? 1 : -1;
    if (Math.abs(r) < 1e-12) r = 0;
    const m = Math.abs(r);
    const yon = r > 0 ? 'pozitif' : 'negatif';
    let yorum;
    if (m === 1) yorum = `Tam ${yon} doğrusal ilişki`;
    else if (m < 0.1) yorum = 'Doğrusal ilişki yok denecek kadar zayıf';
    else if (m < 0.2) yorum = `Çok zayıf ${yon} ilişki`;
    else if (m < 0.4) yorum = `Zayıf ${yon} ilişki`;
    else if (m < 0.6) yorum = `Orta düzeyde ${yon} ilişki`;
    else if (m < 0.8) yorum = `Güçlü ${yon} ilişki`;
    else yorum = `Çok güçlü ${yon} ilişki`;
    return {
      rows: [
        ['Korelasyon katsayısı (r)', h.fmt(r, 4)],
        ['Yorum', yorum],
        ['Belirlilik katsayısı (r²)', h.fmt(r * r, 4)],
        ['Kovaryans (örneklem)', h.fmt(sxy / (n - 1), 4)],
        ['X ortalaması', h.fmt(ox, 4)],
        ['Y ortalaması', h.fmt(oy, 4)],
        ['Çift sayısı (n)', String(n)],
      ],
      note: n < 5
        ? 'Çok az veri çiftiyle bulunan korelasyon tesadüfen yüksek çıkabilir; sonucu temkinli yorumlayın. Korelasyon nedensellik göstermez.'
        : 'Korelasyon yalnızca doğrusal ilişkinin yönünü ve gücünü ölçer; nedensellik göstermez.',
    };
  }
