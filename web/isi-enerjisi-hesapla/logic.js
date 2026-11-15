// Isı Enerjisi Hesaplama (Q = m·c·ΔT) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let m, c, t1, t2, Q;
    t1 = h.num(v.ilk, 'İlk sıcaklık');
    if (v.bul === 'kutle') {
      c = h.pos(v.ozIsi, 'Öz ısı'); t2 = h.num(v.son, 'Son sıcaklık'); Q = h.num(v.isi, 'Isı enerjisi');
      if (t2 === t1) h.err('İlk ve son sıcaklık aynı; sıcaklık değişmediği için kütle hesaplanamaz.');
      m = Q / (c * (t2 - t1));
      if (!(m > 0)) h.err('Isının işareti sıcaklık değişimiyle uyuşmuyor: ısınma için artı, soğuma için eksi ısı yazın.');
    } else if (v.bul === 'ozIsi') {
      m = h.pos(v.kutle, 'Kütle'); t2 = h.num(v.son, 'Son sıcaklık'); Q = h.num(v.isi, 'Isı enerjisi');
      if (t2 === t1) h.err('İlk ve son sıcaklık aynı; sıcaklık değişmediği için öz ısı hesaplanamaz.');
      c = Q / (m * (t2 - t1));
      if (!(c > 0)) h.err('Isının işareti sıcaklık değişimiyle uyuşmuyor: ısınma için artı, soğuma için eksi ısı yazın.');
    } else if (v.bul === 'son') {
      m = h.pos(v.kutle, 'Kütle'); c = h.pos(v.ozIsi, 'Öz ısı'); Q = h.num(v.isi, 'Isı enerjisi');
      t2 = t1 + Q / (m * c);
    } else {
      m = h.pos(v.kutle, 'Kütle'); c = h.pos(v.ozIsi, 'Öz ısı'); t2 = h.num(v.son, 'Son sıcaklık');
      Q = m * c * (t2 - t1);
    }
    if (t1 < -273.15 || t2 < -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) altında olamaz.');
    const dT = t2 - t1;
    const qS = ['Isı enerjisi', h.fmt(Q, 2) + ' J'];
    const mS = ['Kütle', h.fmt(m, 4) + ' kg'];
    const cS = ['Öz ısı', h.fmt(c, 2) + ' J/kg·°C'];
    const sS = ['Son sıcaklık', h.fmt(t2, 2) + ' °C'];
    const ilk = v.bul === 'kutle' ? [mS, qS] : v.bul === 'ozIsi' ? [cS, qS] : v.bul === 'son' ? [sS, qS] : [qS];
    let durum;
    if (Math.abs(Q) < 1e-12) durum = 'Isı alışverişi yok';
    else if (Q > 0) durum = 'Madde ısı alır (ısınma)';
    else durum = 'Madde ısı verir (soğuma)';
    return {
      rows: [
        ...ilk,
        ['Isı (kJ)', h.fmt(Q / 1000, 3) + ' kJ'],
        ['Isı (kcal)', h.fmt(Q / 4184, 2) + ' kcal'],
        ['Isı (kWh)', h.fmt(Q / 3.6e6, 4) + ' kWh'],
        ['Sıcaklık değişimi', h.fmt(dT, 2) + ' °C'],
        ['Isı sığası (m·c)', h.fmt(m * c, 2) + ' J/°C'],
        ['Durum', durum],
      ],
      note: 'Hâl değişimi olmadığı ve öz ısının sıcaklık aralığında sabit kaldığı varsayılır. 1 kcal = 4184 J, 1 kWh = 3.600.000 J.',
    };
  }
