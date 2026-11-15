// Projeksiyon Mesafesi ve Ekran Boyutu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.pos(v.deger, v.mod === 'ekran' ? 'Köşegen' : 'Mesafe');
    const tr = h.pos(v.oran, 'Atış oranı');
    if (tr > 20) h.err('Atış oranı 20\'den büyük olamaz; cihazın teknik özelliklerindeki değeri kontrol edin.');
    const [a, b] = String(v.bicim || '16:9').split(':').map(Number);
    const kosegenOran = Math.sqrt(a * a + b * b);
    let genislik, mesafe;
    if (v.mod === 'ekran') {
      genislik = x * 0.0254 * a / kosegenOran;
      mesafe = genislik * tr;
    } else {
      mesafe = x;
      genislik = mesafe / tr;
    }
    const yukseklik = genislik * b / a;
    const kosegenM = Math.sqrt(genislik * genislik + yukseklik * yukseklik);
    const inc = kosegenM / 0.0254;
    let tip;
    if (tr < 0.4) tip = 'Ultra kısa mesafe';
    else if (tr < 1) tip = 'Kısa mesafe';
    else if (tr <= 2) tip = 'Standart mesafe';
    else tip = 'Uzun mesafe';
    const boyutlar = [
      ['Görüntü genişliği', h.fmt(genislik * 100, 1) + ' cm'],
      ['Görüntü yüksekliği', h.fmt(yukseklik * 100, 1) + ' cm'],
      ['Görüntü alanı', h.fmt(genislik * yukseklik, 2) + ' m²'],
      ['Cihaz sınıfı', tip],
    ];
    const rows = v.mod === 'ekran'
      ? [['Gereken mesafe', h.fmt(mesafe, 2) + ' m'], ['Ekran köşegeni', h.fmt(inc, 1) + ' inç'], ...boyutlar]
      : [['Ekran köşegeni', h.fmt(inc, 1) + ' inç'], ['Mesafe', h.fmt(mesafe, 2) + ' m'], ...boyutlar];
    return {
      rows,
      note: 'Mesafe, objektifin ön yüzünden perdeye ölçülür. Zoom\'lu cihazlarda atış oranı bir aralıktır; iki ucu ayrı ayrı deneyin.',
    };
  }
