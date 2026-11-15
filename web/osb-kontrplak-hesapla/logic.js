// OSB ve Kontrplak Levha Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Yüzey eni');
    const boy = h.pos(v.boy, 'Yüzey boyu');
    let le, lb;
    if (v.levha === 'ozel') {
      le = h.pos(v.ozelEn, 'Özel levha eni');
      lb = h.pos(v.ozelBoy, 'Özel levha boyu');
    } else {
      const p = String(v.levha || '1220x2440').split('x');
      le = Number(p[0]); lb = Number(p[1]);
    }
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const levhaAlan = le * lb / 1e6;
    const alan = en * boy;
    const fireli = alan * (1 + fire / 100);
    const adet = Math.max(1, Math.ceil(fireli / levhaAlan - 1e-9));
    const rows = [
      ['Gerekli levha sayısı', h.fmt(adet, 0) + ' adet'],
      ['Kaplanacak alan', h.fmt(alan, 2) + ' m²'],
      ['Fire dahil gereken alan', h.fmt(fireli, 2) + ' m²'],
      ['Bir levhanın alanı', h.fmt(levhaAlan, 4) + ' m²'],
      ['Alınacak toplam levha alanı', h.fmt(adet * levhaAlan, 2) + ' m²'],
    ];
    if (String(v.kalinlik ?? '').trim() !== '') {
      const k = h.pos(v.kalinlik, 'Levha kalınlığı');
      rows.push(['Toplam hacim', h.fmt(adet * levhaAlan * k / 1000, 3) + ' m³']);
    }
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Levha fiyatı');
      rows.push(['Toplam tutar', h.para(adet * f)]);
    }
    return {
      rows,
      note: 'Hesap alan üzerinden yapılır. Yüzey ölçüleri levha ölçüsünün katı değilse kesim planına göre bir iki levha fazlası gerekebilir.',
    };
  }
