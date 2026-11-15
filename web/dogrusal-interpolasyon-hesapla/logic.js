// Doğrusal İnterpolasyon Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const x = h.num(v.x, 'Aranan x');
    if (x1 === x2) h.err('x₁ ile x₂ aynı olamaz; interpolasyon için x değerleri farklı iki nokta gerekir.');
    const egim = (y2 - y1) / (x2 - x1);
    const t = (x - x1) / (x2 - x1);
    const y = y1 + (x - x1) * egim;
    const icinde = t >= 0 && t <= 1;
    return {
      rows: [
        ['y değeri', h.fmt(y, 6)],
        ['Hesap türü', icinde ? 'İnterpolasyon (aralık içinde)' : 'Ekstrapolasyon (aralık dışında)'],
        ['Eğim (x bir birim artınca y değişimi)', h.fmt(egim, 6)],
        ['Aralıktaki konum', '%' + h.fmt(t * 100, 2)],
      ],
      note: icinde
        ? 'y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁). İki nokta arasında değişimin doğrusal olduğu varsayılır.'
        : 'Aranan x, bilinen iki noktanın dışında kalıyor. Ekstrapolasyon, eğilimin aralık dışında da aynı sürdüğünü varsayar; sonucu temkinli kullanın.',
    };
  }
