// Hoparlör Kablosu Kesiti Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const L = h.pos(v.uzunluk, 'Kablo uzunluğu');
    const Z = Number(v.empedans) || 8;
    const p = h.pos(v.pay, 'İzin verilen kablo direnci');
    if (p > 50) h.err('İzin verilen oran %50\'den büyük olamaz; genellikle %5 kullanılır.');
    const rho = 0.0172;
    const minKesit = rho * 2 * L / (Z * p / 100);
    const standart = [0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16];
    const secilen = standart.find((s) => s >= minKesit - 1e-9);
    if (!secilen) h.err('Bu uzunluk için 16 mm²\'den kalın kablo gerekiyor. Amfiyi hoparlöre yaklaştırın ya da izin verilen oranı yükseltin.');
    const R = rho * 2 * L / secilen;
    const oran = R / Z * 100;
    const db = 20 * Math.log10((Z + R) / Z);
    return {
      rows: [
        ['Önerilen kablo kesiti', '2 × ' + h.fmt(secilen, 2) + ' mm²'],
        ['Hesaplanan en küçük kesit', h.fmt(minKesit, 2) + ' mm²'],
        ['Kablo direnci (gidiş-dönüş)', h.fmt(R, 3) + ' Ω'],
        ['Direncin empedansa oranı', '%' + h.fmt(oran, 2)],
        ['Seviye kaybı', h.fmt(db, 2) + ' dB'],
        ['Toplam iletken uzunluğu', h.fmt(2 * L, 1) + ' m'],
      ],
      note: 'Bakır iletken ve 20 °C için 0,0172 Ω·mm²/m özdirenç kullanılır. Bakır kaplı alüminyum (CCA) kablolarda bir üst kesiti seçin.',
    };
  }
