// Küre Hacmi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : v.olcu === 'c' ? 'Çevre' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const r = v.olcu === 'd' ? x / 2 : v.olcu === 'c' ? x / (2 * Math.PI) : x;
    const hacim = (4 / 3) * Math.PI * r * r * r;
    const alan = 4 * Math.PI * r * r;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
        ['Yarım küre hacmi', `${h.fmt(hacim / 2, 4)} ${b}³`],
      ],
      note: 'Cisim tam küre kabul edilir. Çevre seçeneğinde ölçünün kürenin en geniş yerinden (büyük daire) alındığı varsayılır.',
    };
  }
