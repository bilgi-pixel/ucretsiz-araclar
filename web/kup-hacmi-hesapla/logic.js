// Küp Hacmi ve Yüzey Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.kenar, 'Kenar uzunluğu');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = a * a * a;
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Toplam yüzey alanı', `${h.fmt(6 * a * a, 4)} ${b}²`],
        ['Yanal alan (4 yüz)', `${h.fmt(4 * a * a, 4)} ${b}²`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Yüzey köşegeni', `${h.fmt(a * Math.SQRT2, 4)} ${b}`],
        ['Cisim köşegeni', `${h.fmt(a * Math.sqrt(3), 4)} ${b}`],
        ['Toplam kenar uzunluğu', `${h.fmt(12 * a, 4)} ${b}`],
      ],
      note: 'Küpün 6 yüzü, 12 kenarı ve 8 köşesi vardır; bütün kenarlar eşit kabul edilir.',
    };
  }
