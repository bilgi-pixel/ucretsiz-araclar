// Elektrik Alan Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = 8.9875517923e9;
    const B = { C: 1, mC: 1e-3, uC: 1e-6, nC: 1e-9, pC: 1e-12 };
    const carpan = B[v.yukBirim] || 1e-6;
    let E, yon;
    const ek = [];
    if (v.yontem === 'kuvvet') {
      const F = h.nonneg(v.kuvvet, 'Kuvvet');
      const q = h.num(v.yuk, 'Yük') * carpan;
      if (q === 0) h.err('Yük sıfır olamaz; E = F/q bağıntısında sıfıra bölünemez.');
      E = F / Math.abs(q);
      yon = q > 0 ? 'Pozitif yüke etkiyen kuvvetle aynı yönde' : 'Negatif yüke etkiyen kuvvete zıt yönde';
      ek.push(['Yük', h.sig(q, 6) + ' C']);
    } else if (v.yontem === 'levha') {
      const V = h.nonneg(v.gerilim, 'Gerilim');
      const d = h.pos(v.mesafe, 'Levha aralığı');
      E = V / d;
      yon = 'Pozitif levhadan negatif levhaya doğru';
      ek.push(['Levha aralığı', h.sig(d * 1000, 6) + ' mm']);
    } else {
      const q = h.num(v.yuk, 'Yük') * carpan;
      const r = h.pos(v.mesafe, 'Uzaklık');
      E = (K * Math.abs(q)) / (r * r);
      yon = q === 0 ? 'Alan yok (yük sıfır)' : q > 0 ? 'Yükten dışarı doğru (pozitif yük)' : 'Yüke doğru (negatif yük)';
      ek.push(['Bu noktadaki elektrik potansiyeli', h.sig((K * q) / r, 6) + ' V']);
      ek.push(['Yük', h.sig(q, 6) + ' C']);
    }
    return {
      rows: [
        ['Elektrik alan şiddeti', h.sig(E, 6) + ' N/C'],
        ['Eşdeğer gösterim', h.sig(E, 6) + ' V/m'],
        ['Kilovolt bölü metre', h.sig(E / 1000, 6) + ' kV/m'],
        ['Yön', yon],
        ...ek,
      ],
      note: 'N/C ve V/m aynı birimdir. Noktasal yük hesabında k = 8,9875517923 × 10^9 N·m²/C² ve ortam olarak boşluk (hava) alınmıştır.',
    };
  }
