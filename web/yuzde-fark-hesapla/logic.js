// Yüzde Fark Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.birinci, 'Birinci değer');
    const b = h.pos(v.ikinci, 'İkinci değer');
    const fark = Math.abs(a - b);
    const ort = (a + b) / 2;
    const yf = (fark / ort) * 100;
    const gore = (temel, diger) => {
      const o = ((diger - temel) / temel) * 100;
      if (Math.abs(o) < 5e-7) return 'Eşit';
      return `%${h.fmt(Math.abs(o), 2)} ${o > 0 ? 'fazla' : 'az'}`;
    };
    return {
      rows: [
        ['Yüzde fark', '%' + h.fmt(yf, 2)],
        ['Mutlak fark', h.fmt(fark, 4)],
        ['İki değerin ortalaması', h.fmt(ort, 4)],
        ['Birinciye göre ikinci', gore(a, b)],
        ['İkinciye göre birinci', gore(b, a)],
      ],
      note: 'Formül: |birinci − ikinci| ÷ ((birinci + ikinci) ÷ 2) × 100. Sonuç iki değerin sırasından bağımsızdır ve en fazla %200 olabilir.',
    };
  }
