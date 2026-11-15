// Asfalt Miktarı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.boy, 'Uzunluk');
    const b = h.pos(v.en, 'Genişlik');
    const k = h.pos(v.kalinlik, 'Sıkıştırılmış kalınlık');
    const ro = h.pos(v.yogunluk, 'Asfalt yoğunluğu');
    const f = h.nonneg(v.fire, 'Fire payı');
    const kap = h.pos(v.kamyon, 'Kamyon kapasitesi');
    if (k > 50) h.err('Kalınlık santimetre olarak yazılmalı; 50 cm üzeri asfalt tabakası olağan değildir, ölçüyü kontrol edin.');
    if (ro < 1000 || ro > 3000) h.err('Asfalt yoğunluğu 1000–3000 kg/m³ arasında olmalı; sıkıştırılmış sıcak karışım için 2400 civarı bir değer yazın.');
    const alan = a * b;
    const hacim = alan * k / 100;
    const net = hacim * ro / 1000;
    const ton = net * (1 + f / 100);
    return {
      rows: [
        ['Gerekli asfalt', h.fmt(ton, 2) + ' ton'],
        ['Firesiz miktar', h.fmt(net, 2) + ' ton'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
        ['Sıkıştırılmış hacim', h.fmt(hacim, 2) + ' m³'],
        ['Metrekareye düşen asfalt', h.fmt(k / 100 * ro, 1) + ' kg/m²'],
        ['Kamyon sayısı', Math.ceil(ton / kap - 1e-9) + ' sefer'],
      ],
      note: 'Yoğunluk karışım tipine ve agregaya göre değişir; kesin değer için plentin karışım raporunu esas alın.',
    };
  }
