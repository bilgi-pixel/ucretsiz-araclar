// İki Noktadan Doğru Denklemi Bulma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) h.err('İki nokta aynı; tek noktadan sonsuz sayıda doğru geçer. Denklem için farklı iki nokta girin.');
    const s = (q) => h.fmt(q, 6);
    // Terim listesinden "2x - y + 1" gibi ifade kurar.
    const ifade = (terimler) => {
      let metin = '';
      for (const [kat, harf] of terimler) {
        const m = s(Math.abs(kat));
        if (m === '0') continue;
        const govde = (m === '1' && harf ? '' : m) + harf;
        if (metin === '') metin = (kat < 0 ? '-' : '') + govde;
        else metin += (kat < 0 ? ' - ' : ' + ') + govde;
      }
      return metin === '' ? '0' : metin;
    };
    // Genel biçim katsayıları: mümkünse en küçük tam sayılar.
    let A = dy, B = -dx, C = x2 * y1 - x1 * y2;
    let k = 1, tam = false;
    for (let i = 0; i <= 6 && !tam; i++) {
      const t = [x1, y1, x2, y2].map((q) => q * k);
      if (t.every((q) => Math.abs(q - Math.round(q)) < 1e-9 && Math.abs(q) < 1e7)) {
        const [X1, Y1, X2, Y2] = t.map(Math.round);
        A = k * (Y2 - Y1); B = -k * (X2 - X1); C = X2 * Y1 - X1 * Y2;
        tam = true;
      } else k *= 10;
    }
    if (tam) {
      const ebob = (p, q) => { p = Math.abs(p); q = Math.abs(q); while (q) { [p, q] = [q, p % q]; } return p; };
      const g = ebob(ebob(A, B), C) || 1;
      A /= g; B /= g; C /= g;
    }
    if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
    const genel = ifade([[A, 'x'], [B, 'y'], [C, '']]) + ' = 0';
    if (dx === 0) {
      return {
        rows: [
          ['Doğru denklemi', 'x = ' + s(x1)],
          ['Genel biçim', genel],
          ['Eğim (m)', 'Tanımsız (düşey doğru)'],
          ['y eksenini kestiği nokta', x1 === 0 ? 'Doğru y ekseninin kendisidir' : 'Kesmez (y eksenine paralel)'],
          ['x eksenini kestiği nokta', `(${s(x1)}; 0)`],
        ],
        note: 'İki noktanın x değerleri eşit olduğundan doğru düşeydir; y = mx + n biçiminde yazılamaz.',
      };
    }
    const m = dy / dx;
    const n = (x2 * y1 - x1 * y2) / dx;
    return {
      rows: [
        ['Doğru denklemi', 'y = ' + ifade([[m, 'x'], [n, '']])],
        ['Genel biçim', genel],
        ['Eğim (m)', s(m)],
        ['y eksenini kestiği nokta', `(0; ${s(n)})`],
        ['x eksenini kestiği nokta', dy === 0 ? (y1 === 0 ? 'Doğru x ekseninin kendisidir' : 'Kesmez (x eksenine paralel)') : `(${s(x1 - y1 * dx / dy)}; 0)`],
      ],
      note: 'm = (y₂ − y₁) ÷ (x₂ − x₁), n = y₁ − m·x₁. Katsayılar en fazla altı ondalık basamağa yuvarlanır.',
    };
  }
