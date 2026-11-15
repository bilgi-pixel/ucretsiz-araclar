// Hidrostatik Basınç Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tablo = { su: 1000, deniz: 1025, civa: 13600 };
    const rho = v.sivi === 'ozel' ? h.pos(v.yogunluk, 'Özel sıvı yoğunluğu') : (tablo[v.sivi] || 1000);
    const d = h.nonneg(v.derinlik, 'Derinlik');
    const g = h.pos(v.g, 'Yer çekimi ivmesi');
    const p0 = h.nonneg(h.opt(v.yuzey, 0, 'Sıvı yüzeyindeki basınç'), 'Sıvı yüzeyindeki basınç') * 1000;
    const p = rho * g * d;
    const rows = [
      ['Hidrostatik basınç', h.fmt(p / 1000, 3) + ' kPa'],
      ['Pascal olarak', h.fmt(p, 2) + ' Pa'],
      ['Bar olarak', h.fmt(p / 1e5, 5) + ' bar'],
      ['Atmosfer olarak', h.fmt(p / 101325, 4) + ' atm'],
      ['Mutlak basınç', h.fmt((p + p0) / 1000, 3) + ' kPa'],
      ['Sıvı yoğunluğu', h.fmt(rho, 3) + ' kg/m³'],
    ];
    if (String(v.alan ?? '').trim() !== '') {
      const A = h.pos(v.alan, 'Yüzey alanı');
      rows.push(['Yüzeye etkiyen sıvı kuvveti', h.fmt(p * A, 2) + ' N']);
    }
    return { rows, note: 'Hidrostatik basınç yalnızca sıvı sütunundan kaynaklanan (gösterge) basınçtır. Mutlak basınç = yüzey basıncı + hidrostatik basınç.' };
  }
