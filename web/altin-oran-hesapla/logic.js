// Altın Oran Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Bilinen değer');
    const fi = (1 + Math.sqrt(5)) / 2;
    let a, b;
    if (v.tur === 'buyuk') { a = x; b = x / fi; }
    else if (v.tur === 'kucuk') { b = x; a = x * fi; }
    else { a = x / fi; b = x - a; }
    const rA = ['Büyük parça (a)', h.fmt(a, 4)];
    const rB = ['Küçük parça (b)', h.fmt(b, 4)];
    const rT = ['Toplam (a + b)', h.fmt(a + b, 4)];
    const sira = v.tur === 'buyuk' ? [rB, rT, rA] : v.tur === 'kucuk' ? [rA, rT, rB] : [rA, rB, rT];
    return {
      rows: [
        ...sira,
        ['Oran (a ÷ b)', h.fmt(fi, 6)],
        ['Parçaların payı', '%61,8 büyük, %38,2 küçük'],
      ],
      note: 'Altın oranda (a + b) ÷ a = a ÷ b = φ ≈ 1,618034 eşitliği sağlanır. Sonuçlar dört ondalık basamağa yuvarlanır.',
    };
  }
