// Baskı İçin Piksel Boyutu Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const en = h.pos(v.en, 'Baskı eni');
    const boy = h.pos(v.boy, 'Baskı boyu');
    const dpi = h.pos(v.dpi, 'Çözünürlük');
    const kat = v.birim === 'inc' ? 1 : v.birim === 'mm' ? 1 / 25.4 : 1 / 2.54;
    const enInc = en * kat, boyInc = boy * kat;
    const pxEn = Math.max(1, Math.round(enInc * dpi - 1e-9));
    const pxBoy = Math.max(1, Math.round(boyInc * dpi - 1e-9));
    if (pxEn > 1e6 || pxBoy > 1e6) h.err('Sonuç bir milyon pikseli aşıyor; ölçü birimini ve DPI değerini kontrol edin.');
    const toplam = pxEn * pxBoy;
    const kisa = Math.min(en, boy), uzun = Math.max(en, boy);
    return {
      rows: [
        ['Gereken piksel boyutu', h.fmt(pxEn, 0) + ' × ' + h.fmt(pxBoy, 0) + ' px'],
        ['Megapiksel', h.fmt(toplam / 1e6, 2) + ' MP'],
        ['Toplam piksel', h.fmt(toplam, 0) + ' piksel'],
        ['Baskı ölçüsü (cm)', h.fmt(enInc * 2.54, 2) + ' × ' + h.fmt(boyInc * 2.54, 2) + ' cm'],
        ['Baskı ölçüsü (inç)', h.fmt(enInc, 2) + ' × ' + h.fmt(boyInc, 2) + ' inç'],
        ['En-boy oranı', '1 : ' + h.fmt(uzun / kisa, 3)],
        ['Sıkıştırılmamış boyut (RGB, 8 bit)', h.fmt(toplam * 3 / 1e6, 1) + ' MB'],
      ],
      note: 'Piksel = ölçü (inç) × DPI; 1 inç = 2,54 cm. Değerler en yakın tam piksele yuvarlanır. JPEG gibi sıkıştırılmış dosyalar çok daha küçük olur.',
    };
  }
