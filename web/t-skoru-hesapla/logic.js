// T Skoru (Standart Puan) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const puan = h.num(v.puan, 'Ham puan');
    const ort = h.num(v.ortalama, 'Ortalama');
    const ss = h.pos(v.sapma, 'Standart sapma');
    const z = (puan - ort) / ss;
    const phi = (t) => {
      if (t < -8) return 0;
      if (t > 8) return 1;
      let terim = t, toplam = t;
      for (let i = 3; i < 400; i += 2) {
        terim = (terim * t * t) / i;
        toplam += terim;
        if (Math.abs(terim) < 1e-17) break;
      }
      return 0.5 + (toplam * Math.exp(-(t * t) / 2)) / Math.sqrt(2 * Math.PI);
    };
    const yorum = Math.abs(z) < 1e-9 ? 'Ortalamaya eşit'
      : Math.abs(z) < 1 - 1e-9 ? `Ortalamanın ${z > 0 ? 'üstünde' : 'altında'}, bir standart sapmalık bandın içinde`
        : Math.abs(z) < 2 - 1e-9 ? `Ortalamanın belirgin biçimde ${z > 0 ? 'üstünde' : 'altında'}`
          : `Ortalamanın çok ${z > 0 ? 'üstünde' : 'altında'} (uç değer)`;
    return {
      rows: [
        ['T skoru', h.fmt(50 + 10 * z, 2)],
        ['Z skoru', h.fmt(z, 2)],
        ['Yüzdelik sıra', `%${h.fmt(phi(z) * 100, 2)}`],
        ['Ortalamadan fark', `${h.fmt(puan - ort, 2)} puan`],
        ['Yorum', yorum],
      ],
      note: 'T = 50 + 10 × Z. Yüzdelik sıra, puanların normal dağıldığı varsayımıyla hesaplanır.',
    };
  }
