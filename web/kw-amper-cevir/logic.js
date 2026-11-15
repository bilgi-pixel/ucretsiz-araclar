// kW Amper Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const dc = v.sistem === 'dc';
    const uc = v.sistem === 'uc';
    let V;
    if (String(v.gerilim ?? '').trim() === '') {
      if (dc) h.err('Doğru akım için "Gerilim" alanını doldurun (örn. 12, 24 ya da 48).');
      V = uc ? 400 : 230;
    } else V = h.pos(v.gerilim, 'Gerilim');
    const pf = dc ? 1 : h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,85).');
    const k = uc ? Math.sqrt(3) : 1;
    let I, kw;
    if (v.yon === 'akw') { I = x; kw = k * V * I * pf / 1000; } else { kw = x; I = kw * 1000 / (k * V * pf); }
    const kva = k * V * I / 1000;
    const rows = v.yon === 'akw'
      ? [['Aktif güç', h.fmt(kw, 2) + ' kW'], ['Akım', h.fmt(I, 2) + ' A']]
      : [['Akım', h.fmt(I, 2) + ' A'], ['Aktif güç', h.fmt(kw, 2) + ' kW']];
    if (!dc) rows.push(['Görünür güç', h.fmt(kva, 2) + ' kVA']);
    rows.push(['Hesapta kullanılan gerilim', h.fmt(V, 2) + ' V']);
    return { rows, note: (uc ? 'Üç faz: I = P ÷ (√3 × V × cos φ); V fazlar arası gerilimdir.' : dc ? 'Doğru akım: I = P ÷ V.' : 'Tek faz: I = P ÷ (V × cos φ).') + ' Sonuç bilgilendirme amaçlıdır; sigorta ve kablo seçimi için yetkili elektrikçiye danışın.' };
  }
