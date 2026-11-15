// Piksel EM Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Değer');
    const ust = h.pos(v.ust, 'Referans yazı boyutu');
    const px = v.yon === 'em' ? x * ust : x;
    const em = px / ust;
    const css = (n, birim) => String(Number(n.toFixed(4))) + birim;
    const a = ['EM', h.fmt(em, 4) + ' em'];
    const b = ['Piksel', h.fmt(px, 4) + ' px'];
    return {
      rows: [
        v.yon === 'em' ? b : a,
        v.yon === 'em' ? a : b,
        ['Yüzde karşılığı', '%' + h.fmt(em * 100, 2)],
        ['CSS değeri', v.yon === 'em' ? css(px, 'px') : css(em, 'em')],
      ],
      note: 'Referans yazı boyutu ' + h.fmt(ust, 4) + ' px alındı: bu bağlamda 1 em = ' + h.fmt(ust, 4) + ' px.',
    };
  }
