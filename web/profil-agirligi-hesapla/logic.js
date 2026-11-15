// Kutu Profil Ağırlığı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.en, 'Profil eni');
    const b = h.pos(v.boy, 'Profil yüksekliği');
    const t = h.pos(v.et, 'Et kalınlığı');
    const L = h.pos(v.uzunluk, 'Profil boyu');
    const n = h.posint(v.adet, 'Adet');
    if (2 * t >= Math.min(a, b)) h.err('Et kalınlığı, profilin kısa kenarının yarısından küçük olmalı; aksi halde kesit içi boş kalmaz.');
    const ro = v.malzeme === '7930' ? 7930 : v.malzeme === '2700' ? 2700 : 7850;
    const kesit = a * b - (a - 2 * t) * (b - 2 * t);
    const birim = kesit * ro / 1e6;
    const boyKg = birim * L;
    const toplam = boyKg * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Birim ağırlık', h.fmt(birim, 3) + ' kg/m'],
      ['Bir boyun ağırlığı', h.fmt(boyKg, 2) + ' kg'],
      ['Toplam uzunluk', h.fmt(L * n, 2) + ' m'],
      ['Kesit alanı', h.fmt(kesit, 2) + ' mm²'],
      ['Dış yüzey alanı', h.fmt(2 * (a + b) / 1000 * L * n, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Kesit keskin köşeli kabul edilmiştir. Gerçek profillerde köşeler yuvarlak olduğundan tablo ağırlıkları bir miktar daha düşük olabilir.' };
  }
