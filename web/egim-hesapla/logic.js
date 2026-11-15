// İki Noktadan Eğim Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) h.err('İki nokta aynı; tek noktadan sonsuz doğru geçtiği için eğim belirlenemez. Farklı iki nokta girin.');
    const degisim = [['Δy (dikey değişim)', h.fmt(dy, 6)], ['Δx (yatay değişim)', h.fmt(dx, 6)]];
    if (dx === 0) {
      return {
        rows: [
          ['Eğim (m)', 'Tanımsız (düşey doğru)'],
          ['Eğim açısı', '90°'],
          ['Yüzde eğim', '—'],
          ...degisim,
          ['Doğrunun yönü', 'Düşey (y eksenine paralel)'],
        ],
        note: 'İki noktanın x değerleri eşit olduğunda Δx = 0 olur ve sıfıra bölme yapılamaz; düşey doğrunun eğimi tanımsızdır.',
      };
    }
    const m = dy / dx;
    const aci = Math.atan(m) * 180 / Math.PI;
    return {
      rows: [
        ['Eğim (m)', h.fmt(m, 6)],
        ['Eğim açısı', h.fmt(aci, 4) + '°'],
        ['Yüzde eğim', '%' + h.fmt(m * 100, 4)],
        ...degisim,
        ['Doğrunun yönü', m > 0 ? 'Artan (sağa doğru yükselir)' : m < 0 ? 'Azalan (sağa doğru alçalır)' : 'Yatay (x eksenine paralel)'],
      ],
      note: 'm = (y₂ − y₁) ÷ (x₂ − x₁). Eğim açısı, doğrunun x ekseninin pozitif yönüyle yaptığı açıdır (−90° ile 90° arasında).',
    };
  }
