// Çan Eğrisi Notu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const puan = h.num(v.puan, 'Notunuz');
    const ort = h.num(v.ortalama, 'Sınıf ortalaması');
    const ss = h.pos(v.sapma, 'Standart sapma');
    const z = (puan - ort) / ss;
    // Standart normal birikimli dağılım: seri açılımı (|z| ≤ 8 için çift duyarlıkta)
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
    const olcek = [[1.5, 'AA'], [1, 'BA'], [0.5, 'BB'], [0, 'CB'], [-0.5, 'CC'], [-1, 'DC'], [-1.5, 'DD']];
    let harf = 'FF';
    for (const [alt, ad] of olcek) { if (z >= alt - 1e-9) { harf = ad; break; } }
    const yuzde = phi(z) * 100;
    const konum = Math.abs(z) < 1e-9 ? 'Tam ortalamada'
      : `Ortalamanın ${h.fmt(Math.abs(z), 2)} standart sapma ${z > 0 ? 'üstünde' : 'altında'}`;
    return {
      rows: [
        ['Örnek harf notu', harf],
        ['Z skoru', h.fmt(z, 2)],
        ['T skoru', h.fmt(50 + 10 * z, 2)],
        ['Geride bırakılan öğrenci oranı', `%${h.fmt(yuzde, 2)}`],
        ['Konum', konum],
      ],
      note: 'Harf notu, yarım standart sapmalık dilimlere dayanan örnek bir ölçeğe göredir; kurumunuzun ölçeği ve alt sınırları farklı olabilir. Yüzde, notların normal dağıldığı varsayımıyla bulunur.',
    };
  }
