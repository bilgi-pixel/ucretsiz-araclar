// Doğrusal Regresyon Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nums(v.xler, 'X değerleri');
    const y = h.nums(v.yler, 'Y değerleri');
    if (x.length !== y.length) h.err(`X değerlerinin sayısı (${x.length}) ile Y değerlerinin sayısı (${y.length}) eşit olmalı. Her X değerinin bir Y eşi bulunmalı.`);
    const n = x.length;
    if (n < 2) h.err('Bir doğru belirlemek için en az iki veri noktası gerekir.');
    const ox = x.reduce((s, a) => s + a, 0) / n;
    const oy = y.reduce((s, a) => s + a, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - ox, dy = y[i] - oy;
      sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
    }
    const olcekX = Math.max(1, ...x.map(Math.abs));
    const olcekY = Math.max(1, ...y.map(Math.abs));
    if (sxx <= 1e-18 * olcekX * olcekX) h.err('X değerlerinin hepsi aynı; noktalar düşey bir çizgide olduğundan regresyon doğrusunun eğimi hesaplanamaz.');
    const b = sxy / sxx;
    const a = oy - b * ox;
    const ySabit = syy <= 1e-18 * olcekY * olcekY;
    let r = ySabit ? NaN : sxy / Math.sqrt(sxx * syy);
    if (!ySabit && 1 - Math.abs(r) < 1e-12) r = r > 0 ? 1 : -1;
    const sse = Math.max(0, syy - b * sxy);
    const bS = h.fmt(b, 4);
    const aS = h.fmt(Math.abs(a), 4);
    let denklem;
    if (bS === '0') denklem = 'y = ' + h.fmt(a, 4);
    else denklem = 'y = ' + bS + 'x' + (aS === '0' ? '' : (a > 0 ? ' + ' : ' - ') + aS);
    const rows = [
      ['Regresyon denklemi', denklem],
      ['Eğim (b)', bS],
      ['Kesişim (a)', h.fmt(a, 4)],
      ['Korelasyon katsayısı (r)', ySabit ? 'Tanımsız (Y sabit)' : h.fmt(r, 4)],
      ['Belirlilik katsayısı (R²)', ySabit ? 'Tanımsız (Y sabit)' : h.fmt(r * r, 4)],
    ];
    if (n > 2) rows.push(['Tahminin standart hatası', h.fmt(Math.sqrt(sse / (n - 2)), 4)]);
    rows.push(['Çift sayısı (n)', String(n)]);
    let note = 'Doğru, noktaların düşey uzaklıklarının kareleri toplamını en küçük yapan en küçük kareler doğrusudur.';
    if (String(v.tahminx ?? '').trim() !== '') {
      const tx = h.num(v.tahminx, 'Tahmin için x');
      rows.push(['Tahmini y', `${h.fmt(a + b * tx, 4)} (x = ${h.fmt(tx, 4)} için)`]);
      const enK = Math.min(...x), enB = Math.max(...x);
      if (tx < enK || tx > enB) note = `Dikkat: x = ${h.fmt(tx, 4)}, verinizin kapsadığı ${h.fmt(enK, 4)} – ${h.fmt(enB, 4)} aralığının dışında. Bu bir dış kestirimdir ve ilişkinin aynı biçimde sürdüğü varsayımına dayanır.`;
    }
    return { rows, note };
  }
