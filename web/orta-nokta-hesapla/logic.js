// Orta Nokta Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ucModu = v.mod === 'uc';
    const x1 = h.num(v.x1, 'Birinci nokta x'), y1 = h.num(v.y1, 'Birinci nokta y');
    const x2 = h.num(v.x2, ucModu ? 'Orta nokta x' : 'İkinci nokta x');
    const y2 = h.num(v.y2, ucModu ? 'Orta nokta y' : 'İkinci nokta y');
    const s = (n) => h.fmt(n, 6);
    let x, y, uzunluk;
    if (ucModu) {
      x = 2 * x2 - x1;
      y = 2 * y2 - y1;
      uzunluk = 2 * Math.hypot(x2 - x1, y2 - y1);
    } else {
      x = (x1 + x2) / 2;
      y = (y1 + y2) / 2;
      uzunluk = Math.hypot(x2 - x1, y2 - y1);
    }
    return {
      rows: [
        [ucModu ? 'Diğer uç nokta (B)' : 'Orta nokta (M)', `(${s(x)}; ${s(y)})`],
        ['x koordinatı', s(x)],
        ['y koordinatı', s(y)],
        ['Doğru parçasının uzunluğu', s(uzunluk) + ' birim'],
        ['Orta noktanın uçlara uzaklığı', s(uzunluk / 2) + ' birim'],
      ],
      note: ucModu
        ? 'B = (2·Mx − Ax; 2·My − Ay). Koordinatlar noktalı virgülle ayrılarak yazılmıştır.'
        : 'M = ((x₁ + x₂) ÷ 2; (y₁ + y₂) ÷ 2). Koordinatlar noktalı virgülle ayrılarak yazılmıştır.',
    };
  }
