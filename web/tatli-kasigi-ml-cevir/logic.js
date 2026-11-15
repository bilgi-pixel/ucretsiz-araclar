// Tatlı Kaşığı Mililitre Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const CAY_ML = 2.5, YEMEK_ML = 15, BARDAK_ML = 200;
    const x = h.nonneg(v.miktar, 'Miktar');
    const tatliMl = h.pos(v.tatliMl, 'Tatlı kaşığı hacmi');
    if (tatliMl > 30) h.err('"Tatlı kaşığı hacmi" 30 ml\'den büyük olamaz; tipik değerler 5 ile 10 ml arasındadır.');
    const carpan = { tatli: tatliMl, cay: CAY_ML, yemek: YEMEK_ML, ml: 1 };
    const ml = x * (carpan[v.birim] || tatliMl);
    const mlSatir = ['Mililitre', h.fmt(ml, 2) + ' ml'];
    const tatliSatir = ['Tatlı kaşığı', h.fmt(ml / tatliMl, 2) + ' tatlı kaşığı'];
    return {
      rows: [
        v.birim === 'ml' ? tatliSatir : mlSatir,
        v.birim === 'ml' ? mlSatir : tatliSatir,
        ['Çay kaşığı', h.fmt(ml / CAY_ML, 2) + ' çay kaşığı'],
        ['Yemek kaşığı', h.fmt(ml / YEMEK_ML, 2) + ' yemek kaşığı'],
        ['Su bardağı', h.fmt(ml / BARDAK_ML, 3) + ' su bardağı'],
      ],
      note: `Kabul edilen hacimler: tatlı kaşığı ${h.fmt(tatliMl, 2)} ml, çay kaşığı 2,5 ml, yemek kaşığı 15 ml, su bardağı 200 ml. Ölçüler silme (düz) dolu kaşık içindir.`,
    };
  }
