// Santimetre Piksel Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const cm = v.yon === 'px' ? x * 2.54 / dpi : x;
    const px = cm * dpi / 2.54;
    const a = ['Piksel', h.fmt(px, 2) + ' px'];
    const b = ['Santimetre', h.fmt(cm, 4) + ' cm'];
    return {
      rows: [
        v.yon === 'px' ? b : a,
        v.yon === 'px' ? a : b,
        ['Tam piksel (yuvarlanmış)', h.fmt(Math.round(px - 1e-9), 0) + ' px'],
        ['İnç', h.fmt(cm / 2.54, 4) + ' inç'],
        ['1 cm karşılığı', h.fmt(dpi / 2.54, 4) + ' px'],
      ],
      note: 'Piksel = cm × DPI ÷ 2,54. Görüntü dosyalarında piksel sayısı tam sayı olmak zorundadır.',
    };
  }
