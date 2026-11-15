// Kalıp Alanı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const adet = h.posint(v.adet, 'Adet');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const a = h.pos(v.olcuA, 'Ölçü A');
    let tek;
    let aciklama;
    if (v.eleman === 'kolon' || v.eleman === 'temel') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      const y = h.pos(v.yukseklik, 'Yükseklik');
      tek = 2 * (a + b) * y;
      aciklama = v.eleman === 'kolon' ? 'Kolon: 2 × (A + B) × yükseklik' : 'Temel yan yüzleri: 2 × (A + B) × yükseklik';
    } else if (v.eleman === 'kiris') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      const y = h.pos(v.yukseklik, 'Uzunluk');
      tek = (a + 2 * b) * y;
      aciklama = 'Kiriş: (A + 2 × B) × uzunluk';
    } else if (v.eleman === 'doseme') {
      const b = h.pos(v.olcuB, 'Ölçü B');
      tek = a * b;
      aciklama = 'Döşeme: A × B';
    } else if (v.eleman === 'perde') {
      const y = h.pos(v.yukseklik, 'Yükseklik');
      tek = 2 * a * y;
      aciklama = 'Perde: 2 × uzunluk × yükseklik';
    } else {
      h.err('Elemanı listeden seçin.');
    }
    const net = tek * adet;
    const toplam = net * (1 + fire / 100);
    const LEVHA = 1.25 * 2.5; // m²
    const levha = Math.ceil(toplam / LEVHA - 1e-9);
    return {
      rows: [
        ['Kalıp alanı', h.fmt(toplam, 2) + ' m²'],
        ['Net kalıp alanı', h.fmt(net, 2) + ' m²'],
        ['Tek eleman', h.fmt(tek, 2) + ' m²'],
        ['Yaklaşık plywood', `${h.fmt(levha, 0)} levha (125 × 250 cm)`],
        ['Kullanılan formül', aciklama],
      ],
      note: 'Levha sayısı yalnızca toplam alanın 3,125 m² levha alanına bölünmesiyle bulunur; kesim planı, kuşak, dikme ve iskele malzemesi dahil değildir.',
    };
  }
