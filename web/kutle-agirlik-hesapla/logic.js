// Kütleden Ağırlık Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G0 = 9.80665, LBF = 4.4482216152605, LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Değer');
    const g = h.pos(v.g, 'Çekim ivmesi');
    const ters = v.yon === 'ak';
    const m = ters ? x / g : x;
    const W = ters ? x : x * g;
    const a = ['Ağırlık', h.fmt(W, 5) + ' N'];
    const k = ['Kütle', h.fmt(m, 5) + ' kg'];
    return {
      rows: [
        ters ? k : a,
        ters ? a : k,
        ['Ağırlık (kilogram-kuvvet)', h.fmt(W / G0, 3) + ' kgf'],
        ['Ağırlık (pound-kuvvet)', h.fmt(W / LBF, 3) + ' lbf'],
        ['Ağırlık (kilonewton)', h.fmt(W / 1000, 6) + ' kN'],
        ['Kütle (pound)', h.fmt(m / LB, 3) + ' lb'],
      ],
      note: 'G = m × g. 1 kgf = 9,80665 N ve 1 lbf ≈ 4,44822 N alınmıştır. Kilogram-kuvvet değeri, seçtiğiniz g standart değerden farklıysa kütleyle aynı sayı çıkmaz.',
    };
  }
