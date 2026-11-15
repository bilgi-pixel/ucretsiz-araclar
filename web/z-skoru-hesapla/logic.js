// Z Skoru Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.num(v.deger, 'Değer (x)');
    const ort = h.num(v.ortalama, 'Ortalama (μ)');
    const ss = h.num(v.sapma, 'Standart sapma (σ)');
    if (!(ss > 0)) h.err('Standart sapma sıfırdan büyük olmalı. Sıfır standart sapma bütün değerlerin eşit olduğu anlamına gelir ve z skoru tanımsız kalır.');
    const z = (x - ort) / ss;
    // Standart normal birikimli dağılım: seri açılımı (|z| ≤ 8 için), ötesinde 0 ya da 1.
    const phi = (t) => {
      if (t > 8) return 1;
      if (t < -8) return 0;
      let terim = t, toplam = t;
      for (let k = 1; k < 400; k++) {
        terim = (terim * t * t) / (2 * k + 1);
        toplam += terim;
        if (Math.abs(terim) < 1e-17) break;
      }
      const p = 0.5 + (Math.exp(-0.5 * t * t) / Math.sqrt(2 * Math.PI)) * toplam;
      return Math.min(1, Math.max(0, p));
    };
    const p = phi(z);
    const mutlak = Math.abs(z);
    let yorum;
    if (mutlak < 5e-7) yorum = 'Ortalamaya eşit';
    else yorum = `Ortalamanın ${h.fmt(mutlak, 2)} standart sapma ${z > 0 ? 'üstünde' : 'altında'}`;
    return {
      rows: [
        ['Z skoru', h.fmt(z, 4)],
        ['Yorum', yorum],
        ['Ortalamadan fark (x − μ)', h.fmt(x - ort, 4)],
        ['Yüzdelik dilim (normal dağılım)', '% ' + h.fmt(p * 100, 2)],
        ['Daha yüksek değerlerin oranı', '% ' + h.fmt((1 - p) * 100, 2)],
        ['T skoru (50 + 10z)', h.fmt(50 + 10 * z, 2)],
      ],
      note: 'Yüzdelik dilim, verinin normal (çan eğrisi) dağıldığı varsayımıyla hesaplanır; çarpık dağılımlarda yaklaşık bile olmayabilir.',
    };
  }
