// Punto Piksel (pt – px) Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük (DPI)');
    const pt = v.yon === 'px' ? x * 72 / dpi : x;
    const px = pt * dpi / 72;
    const a = ['Piksel', h.fmt(px, 4) + ' px'];
    const b = ['Punto', h.fmt(pt, 4) + ' pt'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Milimetre', h.fmt(pt * 25.4 / 72, 4) + ' mm'],
        ['İnç', h.fmt(pt / 72, 4) + ' inç'],
      ],
      note: '1 punto = 1/72 inç kabul edilir. ' + h.fmt(dpi, 2) + ' DPI için 1 pt = ' + h.fmt(dpi / 72, 4) + ' px.',
    };
  }
