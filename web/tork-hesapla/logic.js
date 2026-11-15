// Tork Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const aci = h.num(v.aci, 'Açı');
    if (aci < 0 || aci > 180) h.err('Açı 0 ile 180 derece arasında olmalı.');
    const s = Math.sin(aci * Math.PI / 180);
    let F, r, T;
    if (v.bul === 'kuvvet' || v.bul === 'kol') {
      if (s < 1e-12) h.err('Açı 0° ya da 180° iken kuvvet tork üretmez; bu açıyla kuvvet ya da kol hesaplanamaz.');
      T = h.nonneg(v.tork, 'Tork');
      if (v.bul === 'kuvvet') { r = h.pos(v.kol, 'Kol uzunluğu'); F = T / (r * s); }
      else { F = h.pos(v.kuvvet, 'Kuvvet'); r = T / (F * s); }
    } else {
      F = h.nonneg(v.kuvvet, 'Kuvvet');
      r = h.nonneg(v.kol, 'Kol uzunluğu');
      T = F * r * s;
    }
    const torkSatir = ['Tork', h.fmt(T, 4) + ' N·m'];
    const kuvvetSatir = ['Kuvvet', h.fmt(F, 4) + ' N'];
    const kolSatir = ['Kol uzunluğu', h.fmt(r, 4) + ' m'];
    const ilk = v.bul === 'kuvvet' ? [kuvvetSatir, kolSatir, torkSatir] : v.bul === 'kol' ? [kolSatir, kuvvetSatir, torkSatir] : [torkSatir, kuvvetSatir, kolSatir];
    return {
      rows: [
        ...ilk,
        ['Dik kuvvet bileşeni', h.fmt(F * s, 4) + ' N'],
        ['Tork (kgf·m)', h.fmt(T / 9.80665, 4) + ' kgf·m'],
        ['Tork (lbf·ft)', h.fmt(T / 1.3558179483314, 4) + ' lbf·ft'],
      ],
      note: 'τ = F · r · sin θ. 1 kgf·m = 9,80665 N·m; 1 lbf·ft ≈ 1,35582 N·m.',
    };
  }
