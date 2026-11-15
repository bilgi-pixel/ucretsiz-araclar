// Metrekare Birim Fiyatı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const fiyat = h.pos(v.fiyat, 'Toplam fiyat');
    const brut = h.pos(v.brutAlan, 'Brüt alan');
    const bosMu = (s) => String(s ?? '').trim() === '';
    const birim = fiyat / brut;
    const rows = [['Brüt m² fiyatı', h.para(birim, 'TL/m²')]];
    if (!bosMu(v.netAlan)) {
      const net = h.pos(v.netAlan, 'Net alan');
      if (net > brut + 1e-9) h.err('"Net alan" brüt alandan büyük olamaz; iki değeri kontrol edin.');
      rows.push(['Net m² fiyatı', h.para(fiyat / net, 'TL/m²')]);
      rows.push(['Net / brüt alan oranı', '%' + h.fmt(net / brut * 100, 2)]);
    }
    if (!bosMu(v.ortalama)) {
      const ort = h.pos(v.ortalama, 'Bölge ortalama m² fiyatı');
      const fark = (birim - ort) / ort * 100;
      const yon = Math.abs(fark) < 0.005 ? 'ortalamayla aynı' : fark > 0 ? 'ortalamadan pahalı' : 'ortalamadan ucuz';
      rows.push(['Bölge ortalamasına göre', `%${h.fmt(Math.abs(fark), 2)} ${yon}`.replace(/^%0 /, '')]);
      rows.push(['Ortalama fiyatla bu alanın değeri', h.para(ort * brut)]);
    }
    return { rows, note: 'Birim fiyat, toplam fiyatın alana bölümüdür. İlanlar çoğunlukla brüt alan üzerinden karşılaştırılır.' };
  }
