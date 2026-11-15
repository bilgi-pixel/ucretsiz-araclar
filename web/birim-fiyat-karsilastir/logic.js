// Birim Fiyat Karşılaştırma — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const BIRIM = {
      g: ['kutle', 0.001], kg: ['kutle', 1],
      ml: ['hacim', 0.001], l: ['hacim', 1],
      cm: ['uzunluk', 0.01], m: ['uzunluk', 1],
      adet: ['adet', 1],
    };
    const TABAN = { kutle: 'kg', hacim: 'L', uzunluk: 'm', adet: 'adet' };
    const fA = h.pos(v.fiyatA, 'A ürünü fiyatı');
    const mA = h.pos(v.miktarA, 'A ürünü miktarı');
    const fB = h.pos(v.fiyatB, 'B ürünü fiyatı');
    const mB = h.pos(v.miktarB, 'B ürünü miktarı');
    const bA = BIRIM[v.birimA] || BIRIM.g;
    const bB = BIRIM[v.birimB] || BIRIM.g;
    if (bA[0] !== bB[0]) h.err('İki ürünün birimi aynı türden olmalı: gram ile kilogram, mililitre ile litre, santimetre ile metre ya da adet ile adet karşılaştırılabilir.');
    const taban = TABAN[bA[0]];
    const tA = mA * bA[1];
    const tB = mB * bB[1];
    const pA = fA / tA;
    const pB = fB / tB;
    const esit = Math.abs(pA - pB) <= 1e-9 * Math.max(pA, pB);
    const ucuz = Math.min(pA, pB);
    const pahali = Math.max(pA, pB);
    const fark = esit ? 0 : pahali - ucuz;
    const yuzde = esit ? 0 : (fark / pahali) * 100;
    const kazanan = esit ? 'İkisi eşit' : (pA < pB ? 'A ürünü' : 'B ürünü');
    const buyuk = Math.max(tA, tB);
    return {
      rows: [
        ['Hesaplı olan', kazanan],
        ['A birim fiyatı', h.fix(pA, 2) + ' TL/' + taban],
        ['B birim fiyatı', h.fix(pB, 2) + ' TL/' + taban],
        ['Birim fiyat farkı', h.fix(fark, 2) + ' TL/' + taban],
        ['Yüzde fark', '%' + h.fmt(yuzde, 2)],
        [h.fmt(buyuk, 3) + ' ' + taban + ' alımda tasarruf', h.para(fark * buyuk)],
      ],
      note: esit
        ? 'İki ürünün birim fiyatı aynı; seçimi ihtiyacınız olan miktara, son kullanma tarihine ve kaliteye göre yapın.'
        : 'Yüzde fark, pahalı ürünün birim fiyatına göre hesaplanır. Karşılaştırma yalnızca fiyatı ölçer; kalite ve içerik farkını ayrıca değerlendirin.',
    };
  }
