// Boy Çevirici (Feet İnç – Santimetre) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let toplamInc;
    if (v.yon === 'cm') {
      const cmGirdi = h.pos(v.cm, 'Santimetre');
      if (cmGirdi > 300) h.err('"Santimetre" alanına 300 ya da daha küçük bir boy yazın; metre girdiyseniz santimetreye çevirin (1,80 m = 180 cm).');
      toplamInc = cmGirdi / 2.54;
    } else {
      const ft = h.int(v.feet, 'Feet');
      if (ft < 0) h.err('"Feet" negatif olamaz.');
      if (ft > 9) h.err('"Feet" alanına 0 ile 9 arasında bir değer yazın; boy için daha büyük bir sayı beklenmez.');
      const inc = h.opt(v.inc, 0, 'İnç');
      if (inc < 0) h.err('"İnç" negatif olamaz.');
      if (inc >= 12) h.err('"İnç" 12\'den küçük olmalı; 12 inç 1 feet eder, feet değerini bir artırın.');
      toplamInc = ft * 12 + inc;
      if (!(toplamInc > 0)) h.err('Feet ve inç alanlarından en az birine sıfırdan büyük bir değer yazın.');
    }
    const cm = toplamInc * 2.54;
    let tamFt = Math.floor(toplamInc / 12 + 1e-9);
    let kalan = Math.round((toplamInc - tamFt * 12) * 100) / 100;
    if (kalan >= 12) { tamFt += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    const yuvInc = Math.round(toplamInc - 1e-9);
    const yFt = Math.floor(yuvInc / 12);
    const yIn = yuvInc - yFt * 12;
    const cmSatiri = ['Santimetre', h.fmt(cm, 2) + ' cm'];
    const ftSatiri = ['Feet ve inç', `${tamFt} ft ${h.fmt(kalan, 2)} inç`];
    return {
      rows: [
        v.yon === 'cm' ? ftSatiri : cmSatiri,
        v.yon === 'cm' ? cmSatiri : ftSatiri,
        ['Tam inçe yuvarlanmış', `${yFt}′${yIn}″ (${h.fmt(yuvInc * 2.54, 2)} cm)`],
        ['Metre', h.fmt(cm / 100, 4) + ' m'],
        ['Toplam inç', h.fmt(toplamInc, 2) + ' inç'],
        ['Ondalık feet', h.fmt(toplamInc / 12, 4) + ' ft'],
      ],
      note: '1 feet = 12 inç = 30,48 cm; 1 inç = 2,54 cm. "Tam inçe yuvarlanmış" satırı, formlarda kullanılan 5′11″ biçimindeki yazımdır.',
    };
  }
