// Kilit Taşı (Parke Taşı) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.boy, 'Alanın boyu');
    const b = h.pos(v.en, 'Alanın eni');
    const tb = h.pos(v.tasBoy, 'Taş boyu');
    const te = h.pos(v.tasEn, 'Taş eni');
    const f = h.nonneg(v.fire, 'Fire payı');
    const k = h.nonneg(v.kum, 'Yatak kumu kalınlığı');
    if (tb > 100 || te > 100) h.err('Taş ölçüleri santimetre olarak yazılmalı ve 100 cm\'yi geçmemeli.');
    const alan = a * b;
    const m2Adet = 10000 / (tb * te);
    const net = Math.ceil(alan * m2Adet - 1e-9);
    const siparis = Math.ceil(alan * m2Adet * (1 + f / 100) - 1e-9);
    const rows = [
      ['Gerekli taş (fire dahil)', h.fmt(siparis, 0) + ' adet'],
      ['Firesiz taş adedi', h.fmt(net, 0) + ' adet'],
      ['Alan', h.fmt(alan, 2) + ' m²'],
      ['Metrekareye düşen taş', h.fmt(m2Adet, 1) + ' adet/m²'],
      ['Yatak kumu', h.fmt(alan * k / 100, 2) + ' m³'],
    ];
    if (String(v.bordur ?? '').trim() !== '') {
      const L = h.pos(v.bordur, 'Bordür döşenecek uzunluk');
      const bb = h.pos(v.bordurBoy, 'Bordür taşı boyu');
      rows.push(['Bordür taşı', h.fmt(Math.ceil(L * 100 / bb - 1e-9), 0) + ' adet']);
    }
    return {
      rows,
      note: 'Adet, taşın dikdörtgen kabul edilen kaplama ölçüsüne göre hesaplanır. Dişli (kilitli) formlarda üreticinin verdiği m² adedini esas alın.',
    };
  }
