// Yoğunluk Çevirici (g/cm³ – kg/m³) — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, 'Yoğunluk değeri');
    const LB = 16.018463373960138; // 1 lb/ft³ kaç kg/m³
    const kat = { gcm3: 1000, kgm3: 1, kgl: 1000, gml: 1000, gl: 1, lbft3: LB };
    const k = kat[v.birim];
    if (!k) h.err('Geçerli bir birim seçin.');
    const kgm3 = x * k;
    const suya = Math.abs(kgm3 - 1000) < 1e-6 ? 'suyla aynı yoğunlukta' : kgm3 < 1000 ? 'sudan az yoğun' : 'sudan yoğun';
    const a = ['kg/m³', h.sig(kgm3, 6) + ' kg/m³'];
    const b = ['g/cm³', h.sig(kgm3 / 1000, 6) + ' g/cm³'];
    return {
      rows: [
        v.birim === 'kgm3' || v.birim === 'gl' ? b : a,
        v.birim === 'kgm3' || v.birim === 'gl' ? a : b,
        ['kg/L (g/mL)', h.sig(kgm3 / 1000, 6) + ' kg/L'],
        ['g/L', h.sig(kgm3, 6) + ' g/L'],
        ['lb/ft³', h.sig(kgm3 / LB, 6) + ' lb/ft³'],
        ['Bağıl yoğunluk (su = 1)', h.sig(kgm3 / 1000, 6)],
        ['Suya göre', suya],
      ],
      note: 'Bağıl yoğunlukta suyun yoğunluğu 1.000 kg/m³ alınmıştır. Sonuçlar altı anlamlı basamakla gösterilir.',
    };
  }
