// Parmak (Boru Çapı) Santimetre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ham = String(v.olcu ?? '').trim().replace(/["″”“]/g, '').replace(/(parmak|inç|inc|cm)\.?$/i, '').trim();
    if (ham === '') h.err('"Ölçü" alanını doldurun (örn. 1/2 ya da 2,54).');
    let x;
    let m = /^(\d+)[\s-]+(\d+)\s*\/\s*(\d+)$/.exec(ham);
    if (m) {
      if (+m[3] === 0) h.err('Kesrin paydası sıfır olamaz.');
      x = +m[1] + +m[2] / +m[3];
    } else if ((m = /^(\d+)\s*\/\s*(\d+)$/.exec(ham))) {
      if (+m[2] === 0) h.err('Kesrin paydası sıfır olamaz.');
      x = +m[1] / +m[2];
    } else {
      x = h.nonneg(ham, 'Ölçü');
    }
    const inc = v.yon === 'cm' ? x / 2.54 : x;
    const cm = inc * 2.54;
    // En yakın 1/16 inç kesri
    const ebob = (a, b) => (b ? ebob(b, a % b) : a);
    const n16 = Math.round(inc * 16);
    const tam = Math.floor(n16 / 16);
    const kalan = n16 % 16;
    const g = kalan ? ebob(kalan, 16) : 1;
    const kesir = kalan ? (tam ? tam + ' ' : '') + kalan / g + '/' + 16 / g : String(tam);
    // Standart dişli çelik boru ölçüleri: [inç, DN, dış çap mm]
    const tablo = [[0.125, 6, 10.2], [0.25, 8, 13.5], [0.375, 10, 17.2], [0.5, 15, 21.3], [0.75, 20, 26.9], [1, 25, 33.7], [1.25, 32, 42.4], [1.5, 40, 48.3], [2, 50, 60.3], [2.5, 65, 76.1], [3, 80, 88.9], [4, 100, 114.3]];
    const std = tablo.find((t) => Math.abs(t[0] - inc) < 0.004);
    const rows = v.yon === 'cm'
      ? [['Parmak (inç)', h.fmt(inc, 4) + ' inç'], ['En yakın 1/16 kesir', kesir + ' inç'], ['Milimetre', h.fmt(cm * 10, 2) + ' mm']]
      : [['Santimetre', h.fmt(cm, 4) + ' cm'], ['Milimetre', h.fmt(cm * 10, 2) + ' mm'], ['Ondalık inç', h.fmt(inc, 4) + ' inç']];
    if (std) {
      rows.push(['Anma çapı', 'DN ' + std[1]]);
      rows.push(['Çelik boru dış çapı (yaklaşık)', h.fmt(std[2], 1) + ' mm']);
    }
    return {
      rows,
      note: std
        ? 'Santimetre değeri yalnızca birim çevirisidir (1 parmak = 2,54 cm). Bu anma ölçüsündeki dişli çelik borunun gerçek dış çapı ayrı satırda verilmiştir; plastik borularda ölçü farklıdır.'
        : '1 parmak = 1 inç = 2,54 cm. Boru alırken anma ölçüsünün gerçek dış çapla aynı olmadığını unutmayın.',
    };
  }
