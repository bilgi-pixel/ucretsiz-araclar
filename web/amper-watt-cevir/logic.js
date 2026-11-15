// Amper Watt Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const V = h.pos(v.gerilim, 'Gerilim');
    const dc = v.sistem === 'dc';
    const pf = dc ? 1 : h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,8).');
    const k = v.sistem === 'uc' ? Math.sqrt(3) : 1;
    let I, P;
    if (v.yon === 'wa') { P = x; I = P / (k * V * pf); } else { I = x; P = k * V * I * pf; }
    const S = k * V * I;
    const rows = [];
    if (v.yon === 'wa') {
      rows.push(['Akım', h.fmt(I, 2) + ' A']);
      rows.push(['Güç', h.fmt(P, 2) + ' W']);
    } else {
      rows.push(['Güç', h.fmt(P, 2) + ' W']);
      rows.push(['Akım', h.fmt(I, 2) + ' A']);
    }
    rows.push(['Kilowatt', h.fmt(P / 1000, 4) + ' kW']);
    if (!dc) rows.push(['Görünür güç', h.fmt(S, 2) + ' VA']);
    const formul = dc ? 'P = V × I' : (v.sistem === 'uc' ? 'P = √3 × V × I × cos φ (V: fazlar arası gerilim)' : 'P = V × I × cos φ');
    return { rows, note: 'Kullanılan formül: ' + formul + '. Sonuç bilgilendirme amaçlıdır; sigorta ve kablo seçimini yetkili bir elektrikçi yapmalıdır.' };
  }
