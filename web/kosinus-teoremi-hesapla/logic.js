// Kosinüs Teoremi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.kenarA, 'a kenarı'), b = h.pos(v.kenarB, 'b kenarı');
    const R = Math.PI / 180;
    const acos = (x) => Math.acos(Math.max(-1, Math.min(1, x))) / R;
    const d = (x) => h.fmt(x, 4) + '°';
    const u = (x) => h.fmt(x, 4) + ' birim';
    if (v.mod === 'aci') {
      const c = h.pos(v.kenarC, 'c kenarı');
      const enb = Math.max(a, b, c), top = a + b + c;
      if (enb >= (top - enb) * (1 - 1e-12)) h.err('Bu uzunluklarla üçgen oluşmaz: en uzun kenar, diğer iki kenarın toplamından kısa olmalıdır (üçgen eşitsizliği).');
      const A = acos((b * b + c * c - a * a) / (2 * b * c));
      const B = acos((a * a + c * c - b * b) / (2 * a * c));
      const C = 180 - A - B;
      const s = top / 2, alan = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
      const mx = Math.max(A, B, C);
      return {
        rows: [
          ['A açısı', d(A)], ['B açısı', d(B)], ['C açısı', d(C)],
          ['Açılarına göre', Math.abs(mx - 90) < 1e-7 ? 'Dik üçgen' : mx > 90 ? 'Geniş açılı üçgen' : 'Dar açılı üçgen'],
          ['Çevre', u(top)], ['Alan', h.fmt(alan, 4) + ' birim²'],
        ],
        note: 'A açısı a kenarının, B açısı b kenarının, C açısı c kenarının karşısındadır. Alan Heron formülüyle hesaplanır.',
      };
    }
    const C = h.pos(v.aciC, 'C açısı');
    if (C >= 180) h.err('C açısı 0° ile 180° arasında olmalıdır; bir üçgenin iç açısı 180° ya da daha büyük olamaz.');
    const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(C * R)));
    const A = acos((b * b + c * c - a * a) / (2 * b * c));
    const B = 180 - A - C;
    return {
      rows: [
        ['c kenarı', u(c)], ['A açısı', d(A)], ['B açısı', d(B)], ['C açısı', d(C)],
        ['Çevre', u(a + b + c)], ['Alan', h.fmt(0.5 * a * b * Math.sin(C * R), 4) + ' birim²'],
      ],
      note: 'c² = a² + b² − 2ab·cos C. Alan ½·a·b·sin C formülüyle hesaplanır. Kenarları hangi birimle yazdıysanız sonuç da o birimdedir.',
    };
  }
