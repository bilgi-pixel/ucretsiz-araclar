// İki Bilinmeyenli Denklem Çözme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a1 = h.num(v.a1, 'a₁'), b1 = h.num(v.b1, 'b₁'), c1 = h.num(v.c1, 'c₁');
    const a2 = h.num(v.a2, 'a₂'), b2 = h.num(v.b2, 'b₂'), c2 = h.num(v.c2, 'c₂');
    if (a1 === 0 && b1 === 0) h.err('1. denklemde x ve y katsayılarının ikisi birden sıfır olamaz; en az bir bilinmeyen bulunmalı.');
    if (a2 === 0 && b2 === 0) h.err('2. denklemde x ve y katsayılarının ikisi birden sıfır olamaz; en az bir bilinmeyen bulunmalı.');
    const sifirla = (deger, ...carpimlar) => {
      const olcek = Math.max(...carpimlar.map(Math.abs));
      return Math.abs(deger) <= 1e-12 * olcek ? 0 : deger;
    };
    const d = sifirla(a1 * b2 - a2 * b1, a1 * b2, a2 * b1);
    const dx = sifirla(c1 * b2 - c2 * b1, c1 * b2, c2 * b1);
    const dy = sifirla(a1 * c2 - a2 * c1, a1 * c2, a2 * c1);
    const s = (x) => h.fmt(x, 6);
    if (d === 0) {
      const sonsuz = dx === 0 && dy === 0;
      return {
        rows: [
          ['Çözüm', sonsuz ? 'Sonsuz çözüm var (denklemler aynı doğruyu gösterir)' : 'Çözüm yok (doğrular paralel)'],
          ['Determinant (D)', '0'],
          ['Dx', s(dx)],
          ['Dy', s(dy)],
        ],
        note: sonsuz
          ? 'İki denklem birbirinin katıdır; doğru üzerindeki her (x, y) noktası sistemi sağlar.'
          : 'Sol taraflar birbirinin katı, sağ taraflar ise aynı katta değil; iki koşul aynı anda sağlanamaz.',
      };
    }
    const x = dx / d, y = dy / d;
    return {
      rows: [
        ['Çözüm', `x = ${s(x)}, y = ${s(y)}`],
        ['x', s(x)],
        ['y', s(y)],
        ['Determinant (D)', s(d)],
        ['Dx', s(dx)],
        ['Dy', s(dy)],
      ],
      note: 'Cramer kuralı: x = Dx ÷ D, y = Dy ÷ D. Sonuçlar en fazla altı ondalık basamağa yuvarlanır.',
    };
  }
