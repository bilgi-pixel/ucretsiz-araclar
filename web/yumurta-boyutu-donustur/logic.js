// Yumurta Boyu Dönüşümü Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const G = { S: 48, M: 58, L: 68, XL: 78 };
    const n = h.pos(v.adet, 'Yumurta sayısı');
    if (n > 1000) h.err('Yumurta sayısı en fazla 1000 olabilir.');
    const k = G[v.kaynak];
    const t = G[v.hedef];
    if (!k || !t) h.err('Yumurta boyunu listeden seçin.');
    const toplam = n * k;
    const gereken = toplam / t;
    const tam = Math.max(1, Math.round(gereken));
    const fark = tam * t - toplam;
    const farkMetin = Math.abs(fark) < 0.5 ? 'Fark yok' : h.fmt(Math.abs(fark), 0) + (fark > 0 ? ' g fazla' : ' g eksik');
    return {
      rows: [
        ['Gereken yumurta', h.fmt(gereken, 2) + ' adet ' + v.hedef + ' boy'],
        ['En yakın tam adet', h.fmt(tam, 0) + ' adet'],
        ['Tarifin istediği toplam ağırlık', h.fmt(toplam, 0) + ' g (kabuklu)'],
        ['Tam adetle fark', farkMetin],
        ['Kullanılan ortalama ağırlıklar', `${v.kaynak} = ${k} g, ${v.hedef} = ${t} g`],
      ],
      note: 'Ortalama kabuklu ağırlıklar: S 48 g, M 58 g, L 68 g, XL 78 g. Gerçek yumurtalar sınıf aralığı içinde değişir; hassas tariflerde yumurtayı çırpıp tartın.',
    };
  }
