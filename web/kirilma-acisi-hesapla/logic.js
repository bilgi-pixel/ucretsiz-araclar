// Kırılma Açısı (Snell Yasası) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n1 = h.num(v.n1, 'n₁');
    const n2 = h.num(v.n2, 'n₂');
    if (n1 < 1 || n2 < 1) h.err('Kırılma indisi 1\'den küçük olamaz (boşluk için 1\'dir).');
    const a = h.num(v.aci, 'Gelme açısı');
    if (a < 0 || a >= 90) h.err('Gelme açısı 0 (dahil) ile 90 (hariç) derece arasında olmalı; açı yüzeyle değil normalle ölçülür.');
    const D = 180 / Math.PI;
    const s = n1 * Math.sin(a / D) / n2;
    const kritik = n1 > n2 ? Math.asin(n2 / n1) * D : null;
    const kritikMetin = kritik === null ? 'Yok (tam yansıma yalnızca n₁ > n₂ iken olur)' : h.fmt(kritik, 4) + '°';
    const hiz = (n) => h.fmt(299792.458 / n, 0) + ' km/s';
    if (s > 1 + 1e-12) {
      return {
        rows: [
          ['Kırılma açısı', 'Kırılma yok (tam yansıma)'],
          ['Yansıma açısı', h.fmt(a, 4) + '°'],
          ['Kritik açı', kritikMetin],
          ['Durum', 'Gelme açısı kritik açıdan büyük; ışık ikinci ortama geçmez'],
        ],
        note: 'Tam yansımada ışığın tamamı geldiği ortama, gelme açısına eşit açıyla geri döner.',
      };
    }
    const b = Math.asin(Math.min(1, s)) * D;
    let durum;
    if (Math.abs(n1 - n2) < 1e-12 || a === 0) durum = 'Işık doğrultu değiştirmez';
    else if (n2 > n1) durum = 'Işık normale yaklaşır';
    else durum = 'Işık normalden uzaklaşır';
    return {
      rows: [
        ['Kırılma açısı', h.fmt(b, 4) + '°'],
        ['Sapma açısı', h.fmt(Math.abs(a - b), 4) + '°'],
        ['Kritik açı', kritikMetin],
        ['Durum', durum],
        ['Birinci ortamda ışık hızı', hiz(n1)],
        ['İkinci ortamda ışık hızı', hiz(n2)],
      ],
      note: 'Açılar yüzeyin normaline göre ölçülür. Kırılma indisi ışığın rengine (dalga boyuna) göre az da olsa değişir.',
    };
  }
