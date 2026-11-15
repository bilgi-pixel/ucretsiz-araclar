// Küre Yüzey Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ad = v.olcu === 'd' ? 'Çap' : v.olcu === 'c' ? 'Çevre' : 'Yarıçap';
    const x = h.pos(v.deger, ad);
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const m2Kat = b === 'm' ? 1 : b === 'mm' ? 1e-6 : 1e-4;
    const r = v.olcu === 'd' ? x / 2 : v.olcu === 'c' ? x / (2 * Math.PI) : x;
    const daire = Math.PI * r * r;
    const alan = 4 * daire;
    return {
      rows: [
        ['Yüzey alanı', `${h.fmt(alan, 4)} ${b}²`],
        ['Metrekare karşılığı', `${h.fmt(alan * m2Kat, 4)} m²`],
        ['Büyük daire alanı', `${h.fmt(daire, 4)} ${b}²`],
        ['Yarım küre eğri yüzeyi', `${h.fmt(2 * daire, 4)} ${b}²`],
        ['Yarım küre toplam yüzeyi (tabanıyla)', `${h.fmt(3 * daire, 4)} ${b}²`],
        ['Yarıçap', `${h.fmt(r, 4)} ${b}`],
        ['Hacim', `${h.fmt(alan * r / 3, 4)} ${b}³`],
      ],
      note: 'Cisim tam küre kabul edilir. Kürenin yüzey alanı, merkezinden geçen büyük dairenin alanının tam dört katıdır.',
    };
  }
