// Yoğunluk Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const kg = v.birim === 'kgm';
    const bM = kg ? 'kg' : 'g', bV = kg ? 'm³' : 'cm³';
    let m, hac, d;
    if (v.bul === 'm') {
      d = h.pos(v.yogunluk, 'Yoğunluk');
      hac = h.pos(v.hacimDeger, 'Hacim');
      m = d * hac;
    } else if (v.bul === 'hacim') {
      m = h.pos(v.kutle, 'Kütle');
      d = h.pos(v.yogunluk, 'Yoğunluk');
      hac = m / d;
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hac = h.pos(v.hacimDeger, 'Hacim');
      d = m / hac;
    }
    const dG = kg ? d / 1000 : d;
    const gSatir = ['Yoğunluk (g/cm³)', h.sig(dG, 6) + ' g/cm³'];
    const kSatir = ['Yoğunluk (kg/m³)', h.sig(dG * 1000, 6) + ' kg/m³'];
    const dSatirlar = kg ? [kSatir, gSatir] : [gSatir, kSatir];
    const mSatir = ['Kütle', h.sig(m, 6) + ' ' + bM];
    const vSatir = ['Hacim', h.sig(hac, 6) + ' ' + bV];
    const bas = v.bul === 'm' ? [mSatir, ...dSatirlar, vSatir] : v.bul === 'hacim' ? [vSatir, ...dSatirlar, mSatir] : [...dSatirlar, mSatir, vSatir];
    const fark = dG - 1;
    const su = Math.abs(fark) < 1e-9 ? 'Suyla aynı yoğunlukta; suda askıda kalır'
      : fark < 0 ? 'Sudan az yoğun; suda yüzer' : 'Sudan yoğun; suda batar';
    return {
      rows: [...bas, ['Suya göre durum', su]],
      note: 'Karşılaştırmada saf suyun yoğunluğu 1 g/cm³ (1000 kg/m³) alınmıştır. 1 g/cm³ = 1000 kg/m³.',
    };
  }
