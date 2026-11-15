// Dik Üçgen Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const R = Math.PI / 180;
    const m = ['kk', 'kh', 'ka', 'ha'].includes(v.bilinen) ? v.bilinen : 'kk';
    let a, b, c, A;
    if (m === 'kk') {
      a = h.pos(v.deger1, 'a dik kenarı'); b = h.pos(v.deger2, 'b dik kenarı');
      c = Math.hypot(a, b); A = Math.atan2(a, b) / R;
    } else if (m === 'kh') {
      a = h.pos(v.deger1, 'a dik kenarı'); c = h.pos(v.deger2, 'Hipotenüs');
      if (a >= c) h.err('Hipotenüs dik kenardan uzun olmalıdır; dik üçgenin en uzun kenarı hipotenüstür. Değerlerin sırasını kontrol edin.');
      b = Math.sqrt(c * c - a * a); A = Math.atan2(a, b) / R;
    } else {
      const x = h.pos(v.deger1, m === 'ka' ? 'a dik kenarı' : 'Hipotenüs');
      A = h.pos(v.deger2, 'A açısı');
      if (A >= 90) h.err('A açısı 0° ile 90° arasında olmalıdır; dik üçgende dik açı dışındaki iki açı dardır.');
      if (m === 'ka') { a = x; c = a / Math.sin(A * R); b = a / Math.tan(A * R); }
      else { c = x; a = c * Math.sin(A * R); b = c * Math.cos(A * R); }
    }
    const u = (x) => h.fmt(x, 4) + ' birim', d = (x) => h.fmt(x, 4) + '°';
    return {
      rows: [
        ['Hipotenüs (c)', u(c)],
        ['Dik kenar (a)', u(a)],
        ['Dik kenar (b)', u(b)],
        ['A açısı', d(A)],
        ['B açısı', d(90 - A)],
        ['Alan', h.fmt(a * b / 2, 4) + ' birim²'],
        ['Çevre', u(a + b + c)],
        ['Hipotenüse ait yükseklik', u(a * b / c)],
      ],
      note: 'A açısı a kenarının, B açısı b kenarının karşısındadır; C açısı 90°\'dir. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  }
