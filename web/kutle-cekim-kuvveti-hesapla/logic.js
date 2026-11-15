// Kütle Çekim Kuvveti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G = 6.6743e-11; // N·m²/kg²
    const m1 = h.pos(v.m1, 'Birinci kütle');
    const m2 = h.pos(v.m2, 'İkinci kütle');
    const r = h.pos(v.r, 'Merkezler arası uzaklık') * (v.rBirim === 'km' ? 1000 : 1);
    const F = G * m1 * m2 / (r * r);
    if (!Number.isFinite(F)) h.err('Sonuç hesaplanamayacak kadar büyük; değerleri kontrol edin.');
    return {
      rows: [
        ['Kütle çekim kuvveti', h.sig(F, 6) + ' N'],
        ['m₁ kütlesinin m₂ konumundaki çekim ivmesi', h.sig(G * m1 / (r * r), 6) + ' m/s²'],
        ['m₂ kütlesinin m₁ konumundaki çekim ivmesi', h.sig(G * m2 / (r * r), 6) + ' m/s²'],
        ['Uzaklık', h.sig(r, 6) + ' m'],
      ],
      note: 'G = 6,6743 × 10⁻¹¹ N·m²/kg² alınmıştır. Kuvvet iki cisme de eşit büyüklükte ve zıt yönde etki eder. Uzaklık, kütle merkezleri arasında ölçülür.',
    };
  }
