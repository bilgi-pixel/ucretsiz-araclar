// Piksel REM Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const kok = h.pos(v.kok, 'Kök yazı boyutu');
    const px = v.yon === 'rem' ? x * kok : x;
    const rem = px / kok;
    const css = (n, birim) => String(Number(n.toFixed(4))) + birim;
    const a = ['REM', h.fmt(rem, 4) + ' rem'];
    const b = ['Piksel', h.fmt(px, 4) + ' px'];
    return {
      rows: [
        v.yon === 'rem' ? b : a,
        v.yon === 'rem' ? a : b,
        ['CSS değeri', v.yon === 'rem' ? css(px, 'px') : css(rem, 'rem')],
        ['Kök boyuta oranı', '%' + h.fmt(rem * 100, 2)],
      ],
      note: 'Kök yazı boyutu ' + h.fmt(kok, 4) + ' px kabul edildi: 1 rem = ' + h.fmt(kok, 4) + ' px.',
    };
  }
