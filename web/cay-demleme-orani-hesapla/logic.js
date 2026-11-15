// Çay Demleme Oranı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.bardak, 'Bardak sayısı');
    if (n > 500) h.err('Bardak sayısı en fazla 500 olabilir.');
    const hacim = h.pos(v.hacim, 'Bardak hacmi');
    if (hacim > 1000) h.err('Bardak hacmi 1000 ml\'den büyük olamaz; değeri mililitre olarak yazın.');
    const g100 = h.pos(v.cayOran, 'Kuru çay oranı');
    if (g100 > 30) h.err('100 ml dem suyu için 30 gramdan fazla çay girilemez; yaygın değerler 4 ile 8 gram arasındadır.');
    const pay = v.dem === 'koyu' ? 1 / 2 : v.dem === 'acik' ? 1 / 4 : 1 / 3;
    const toplam = n * hacim;
    const demMl = toplam * pay;
    const cay = demMl * g100 / 100;
    return {
      rows: [
        ['Kuru çay', h.fmt(cay, 1) + ' g'],
        ['Demliğe eklenecek su', h.fmt(demMl, 0) + ' ml'],
        ['Bardakları tamamlayacak sıcak su', h.fmt(toplam - demMl, 0) + ' ml'],
        ['Toplam su', h.fmt(toplam, 0) + ' ml'],
        ['Bardak başına dem', h.fmt(hacim * pay, 1) + ' ml'],
        ['Bardak başına kuru çay', h.fmt(cay / n, 2) + ' g'],
      ],
      note: 'Çay yaprakları suyun bir kısmını emer, alt çaydanlıkta da buharlaşma olur; uzun süre ocakta kalacaksa hesaplanan sıcak suya pay ekleyin.',
    };
  }
