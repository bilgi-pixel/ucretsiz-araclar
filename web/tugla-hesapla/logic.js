// Tuğla Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const u = h.pos(v.uzunluk, 'Duvar uzunluğu');
    const y = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const bos = h.opt(v.bosluk, 0, 'Kapı ve pencere boşlukları');
    if (bos < 0) h.err('Boşluk alanı negatif olamaz.');
    const boy = h.pos(v.boy, 'Tuğla boyu');
    const en = h.pos(v.en, 'Tuğla yüksekliği');
    const derz = h.opt(v.derz, 10, 'Derz kalınlığı');
    if (derz < 0 || derz > 50) h.err('Derz kalınlığı 0 ile 50 mm arasında olmalı.');
    const fire = h.opt(v.fire, 5, 'Fire payı');
    if (fire < 0 || fire > 50) h.err('Fire payı %0 ile %50 arasında olmalı.');
    const brut = u * y;
    const net = brut - bos;
    if (!(net > 1e-9)) h.err('Boşluk alanı duvar alanından küçük olmalı; ölçüleri kontrol edin.');
    const modulM2 = ((boy + derz / 10) / 100) * ((en + derz / 10) / 100);
    const m2Adet = 1 / modulM2;
    const ham = net * m2Adet;
    const adet = Math.ceil(ham - 1e-9);
    const fireli = Math.ceil(ham * (1 + fire / 100) - 1e-9);
    return {
      rows: [
        ['Alınması gereken tuğla (fireli)', h.fmt(fireli, 0) + ' adet'],
        ['Net tuğla adedi (firesiz)', h.fmt(adet, 0) + ' adet'],
        ['Metrekare başına tuğla', h.fmt(m2Adet, 2) + ' adet/m²'],
        ['Net duvar alanı', h.fmt(net, 2) + ' m²'],
        ['Brüt duvar alanı', h.fmt(brut, 2) + ' m²'],
      ],
      note: 'Hesap, tuğlanın duvar yüzeyinde görünen ölçülerine derz kalınlığı eklenerek yapılır ve tek sıra (tek tuğla kalınlığında) duvar içindir. Çift sıra duvarlarda sonucu ikiyle çarpın.',
    };
  }
