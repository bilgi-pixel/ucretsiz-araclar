// İnç Piksel Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const inc = v.yon === 'px' ? x / dpi : x;
    const px = inc * dpi;
    const a = ['Piksel', h.fmt(px, 2) + ' px'];
    const b = ['İnç', h.fmt(inc, 4) + ' inç'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Tam piksel (yuvarlanmış)', h.fmt(Math.round(px - 1e-9), 0) + ' px'],
        ['Santimetre', h.fmt(inc * 2.54, 4) + ' cm'],
      ],
      note: 'Piksel = inç × DPI. ' + h.fmt(dpi, 2) + ' DPI için 1 inç = ' + h.fmt(dpi, 2) + ' piksel.',
    };
  }
