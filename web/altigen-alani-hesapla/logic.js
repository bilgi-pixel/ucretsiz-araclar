// Düzgün Altıgen Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    const k3 = Math.sqrt(3);
    let a;
    if (v.tur === 'cevre') a = x / 6;
    else if (v.tur === 'duz') a = x / k3;
    else if (v.tur === 'kose') a = x / 2;
    else if (v.tur === 'alan') a = Math.sqrt(2 * x / (3 * k3));
    else a = x;
    const alan = v.tur === 'alan' ? x : 3 * k3 / 2 * a * a;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(6 * a, 4) + ' birim'],
        ['Apotem (iç teğet çember yarıçapı)', h.fmt(a * k3 / 2, 4) + ' birim'],
        ['Çevrel çember yarıçapı', h.fmt(a, 4) + ' birim'],
        ['Köşeden köşeye (uzun köşegen)', h.fmt(2 * a, 4) + ' birim'],
        ['Karşılıklı kenarlar arası', h.fmt(a * k3, 4) + ' birim'],
      ],
      note: 'Alan = (3·√3 ÷ 2)·a² ≈ 2,5981·a². Düzgün altıgende çevrel çember yarıçapı kenar uzunluğuna eşittir.',
    };
  }
