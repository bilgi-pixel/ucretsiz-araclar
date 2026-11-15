// Coulomb Kuvveti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const K = 8.9875517923e9;
    const B = { C: 1, mC: 1e-3, uC: 1e-6, nC: 1e-9, pC: 1e-12 };
    const U = { m: 1, cm: 0.01, mm: 0.001 };
    const q1 = h.num(v.q1, 'Birinci yük') * (B[v.q1b] || 1e-6);
    const q2 = h.num(v.q2, 'İkinci yük') * (B[v.q2b] || 1e-6);
    const r = h.pos(v.r, 'Yükler arası uzaklık') * (U[v.rb] || 0.01);
    const er = h.opt(v.er, 1, 'Bağıl dielektrik sabiti');
    if (er < 1) h.err('Bağıl dielektrik sabiti 1\'den küçük olamaz. Boşluk ve hava için 1 yazın.');
    const k = K / er;
    const F = (k * Math.abs(q1 * q2)) / (r * r);
    const carp = q1 * q2;
    const tur = carp === 0 ? 'Yok (yüklerden biri sıfır)' : carp > 0 ? 'İtme (aynı işaretli yükler)' : 'Çekme (zıt işaretli yükler)';
    return {
      rows: [
        ['Kuvvetin büyüklüğü', h.sig(F, 6) + ' N'],
        ['Etkileşim', tur],
        ['Uzaklık', h.sig(r, 6) + ' m'],
        ['Birinci yük', h.sig(q1, 6) + ' C'],
        ['İkinci yük', h.sig(q2, 6) + ' C'],
        ['Ortamdaki Coulomb sabiti', h.sig(k, 6) + ' N·m²/C²'],
      ],
      note: 'k = 8,9875517923 × 10^9 N·m²/C² (boşluk). Yükler noktasal ve durgun kabul edilmiştir. Her iki yüke de aynı büyüklükte, zıt yönlü kuvvet etki eder.',
    };
  }
