// Sıva Malzemesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'Sıvanacak alan');
    const kal = h.pos(v.kalinlik, 'Sıva kalınlığı');
    if (kal > 100) h.err('Sıva kalınlığı milimetre olarak yazılmalı ve en fazla 100 mm olabilir (2 cm için 20 yazın).');
    const sarf = h.pos(v.sarfiyat, 'Sarfiyat');
    if (sarf > 5) h.err('Sarfiyat değeri 1 mm kalınlık için kg/m² olmalı; genellikle 0,8 ile 2 arasındadır.');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 50) h.err('Fire payı %0 ile %50 arasında olmalı.');
    const carpan = 1 + fire / 100;
    const kgNet = alan * kal * sarf;
    const kg = kgNet * carpan;
    const hacim = alan * kal / 1000 * carpan;
    const adet = Math.ceil(kg / torba - 1e-9);
    return {
      rows: [
        ['Gerekli torba sayısı', h.fmt(adet, 0) + ' torba (' + h.fmt(torba, 2) + ' kg\'lık)'],
        ['Toplam kuru sıva (fireli)', h.fmt(kg, 1) + ' kg'],
        ['Firesiz sıva miktarı', h.fmt(kgNet, 1) + ' kg'],
        ['Metrekare sarfiyatı', h.fmt(kal * sarf, 2) + ' kg/m²'],
        ['Sıva hacmi (fireli)', h.fmt(hacim, 3) + ' m³'],
      ],
      note: 'Sonuç, girdiğiniz sarfiyat değerine dayanır; bu değer üründen ürüne değişir. Yüzey bozuksa ortalama kalınlık artacağı için gerçek tüketim hesaplanandan yüksek çıkabilir.',
    };
  }
