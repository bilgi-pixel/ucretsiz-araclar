// Zirai İlaçlama Karışımı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const alan = h.pos(v.alan, 'İlaçlanacak alan');
    const su = h.pos(v.su, 'Dekara atılan su');
    const doz = h.pos(v.doz, 'Etiket dozu');
    const depo = h.pos(v.depo, 'Depo hacmi');
    const yuz = v.tur === 'yuz';
    const toplamSu = alan * su;
    const toplamIlac = yuz ? toplamSu / 100 * doz : alan * doz;
    const depoIlac = toplamIlac / toplamSu * depo;
    const depoAlan = depo / su;
    const dolum = Math.ceil(toplamSu / depo - 1e-9);
    const tam = Math.floor(toplamSu / depo + 1e-9);
    const sonSu = toplamSu - tam * depo;
    const rows = [
      ['Bir depoya konacak ilaç', h.fmt(depoIlac, 2) + ' ml (g)'],
      ['Toplam ilaç', h.fmt(toplamIlac, 2) + ' ml (g)'],
      ['Toplam su', h.fmt(toplamSu, 2) + ' litre'],
      ['Depo dolum sayısı', h.fmt(dolum, 0) + ' dolum'],
      ['Bir deponun ilaçladığı alan', h.fmt(depoAlan, 2) + ' dekar'],
      ['Karışım oranı', h.fmt(toplamIlac / toplamSu * 100, 2) + ' ml (g) / 100 litre su'],
      ['Dekara düşen ilaç', h.fmt(toplamIlac / alan, 2) + ' ml (g) / dekar'],
    ];
    if (sonSu > 1e-6) {
      rows.push(['Son (yarım) depo', `${h.fmt(sonSu, 2)} litre su + ${h.fmt(sonSu / toplamSu * toplamIlac, 2)} ml (g) ilaç`]);
    }
    return {
      rows,
      note: 'Sıvı ilaçlarda sonuç mililitre, toz ve granül ilaçlarda gramdır. Her zaman ürün etiketindeki doza, bekleme süresine ve güvenlik talimatlarına uyun.',
    };
  }
