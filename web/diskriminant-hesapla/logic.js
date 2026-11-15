// Diskriminant ve Kök Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.num(v.a, 'a katsayısı');
    const b = h.num(v.b, 'b katsayısı');
    const c = h.num(v.c, 'c katsayısı');
    if (a === 0) h.err('a katsayısı sıfır olamaz; a = 0 olduğunda denklem ikinci dereceden değil, bx + c = 0 biçiminde birinci dereceden olur.');
    let d = b * b - 4 * a * c;
    const olcek = Math.max(b * b, Math.abs(4 * a * c));
    if (Math.abs(d) <= 1e-12 * olcek) d = 0;
    const s = (x) => h.fmt(x, 6);
    let durum, x1, x2;
    if (d > 0) {
      const kok = Math.sqrt(d);
      const q = -0.5 * (b + (b >= 0 ? 1 : -1) * kok);
      const r1 = q / a;
      const r2 = c / q;
      durum = 'Δ > 0: iki farklı gerçek kök';
      x1 = s(Math.min(r1, r2));
      x2 = s(Math.max(r1, r2));
    } else if (d === 0) {
      durum = 'Δ = 0: çakışık (çift katlı) tek gerçek kök';
      x1 = x2 = s(-b / (2 * a));
    } else {
      const re = s(-b / (2 * a));
      const im = s(Math.sqrt(-d) / (2 * Math.abs(a)));
      const imS = (im === '1' ? '' : im) + 'i';
      durum = 'Δ < 0: gerçek kök yok, iki eşlenik karmaşık kök';
      x1 = re === '0' ? '-' + imS : `${re} - ${imS}`;
      x2 = re === '0' ? imS : `${re} + ${imS}`;
    }
    return {
      rows: [
        ['Diskriminant (Δ)', s(d)],
        ['Kök durumu', durum],
        ['x₁', x1],
        ['x₂', x2],
        ['Kökler toplamı', s(-b / a)],
        ['Kökler çarpımı', s(c / a)],
        ['Tepe noktası', `(${s(-b / (2 * a))}; ${s(-d / (4 * a))})`],
      ],
      note: 'Δ = b² − 4ac. Sonuçlar en fazla altı ondalık basamağa yuvarlanır; karmaşık köklerde i, karesi −1 olan sanal birimdir.',
    };
  }
