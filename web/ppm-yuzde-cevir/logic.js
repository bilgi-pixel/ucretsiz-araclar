// PPM Yüzde Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const payda = { ppm: 1e6, yuzde: 100, ppb: 1e9, binde: 1000, oran: 1 }[v.birim];
    if (!payda) h.err('Geçerli bir birim seçin.');
    const oran = x / payda;
    if (oran > 1 + 1e-12) h.err('Girilen değer bütünün tamamını (%100 = 1.000.000 ppm) aşıyor. Değeri ve birimi kontrol edin.');
    const ppm = oran * 1e6;
    const a = ['Yüzde', '%' + h.sig(oran * 100, 6)];
    const b = ['PPM', h.sig(ppm, 6) + ' ppm'];
    return {
      rows: [
        v.birim === 'ppm' ? a : b,
        v.birim === 'ppm' ? b : a,
        ['PPB', h.sig(oran * 1e9, 6) + ' ppb'],
        ['Binde (promil)', '‰' + h.sig(oran * 1000, 6)],
        ['Ondalık oran', h.sig(oran, 6)],
        ['Kütlece karşılığı', h.sig(ppm, 6) + ' mg/kg'],
      ],
      note: '1 % = 10.000 ppm = 10.000.000 ppb. Sonuçlar altı anlamlı basamakla gösterilir.',
    };
  }
