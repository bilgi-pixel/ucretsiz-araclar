// Seyreltme Oranı (Temizlik Karışımı) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const a = h.pos(v.urunPay, 'Ürün payı');
    const n = h.pos(v.suPay, 'İkinci sayı');
    const q = h.pos(v.miktar, 'Miktar');
    let suPay = n;
    if (v.yorum === 'toplam') {
      if (!(n > a)) h.err('"Toplam karışım" yorumunda ikinci sayı ürün payından büyük olmalı (örn. 1 ve 10).');
      suPay = n - a;
    }
    const top = a + suPay;
    let urun, su;
    if (v.bilinen === 'urun') { urun = q; su = q * suPay / a; }
    else if (v.bilinen === 'su') { su = q; urun = q * a / suPay; }
    else { urun = q * a / top; su = q * suPay / top; }
    const ml = (x) => h.fmt(x * 1000, 1) + ' ml';
    return {
      rows: [
        ['Ürün (konsantre)', ml(urun)],
        ['Su', ml(su)],
        ['Toplam karışım', ml(urun + su)],
        ['Karışımdaki ürün oranı', '%' + h.fmt(a / top * 100, 2)],
        ['1 litre suya ürün', ml(a / suPay)],
        ['Seyreltme katsayısı', h.fmt(top / a, 2) + ' kat'],
      ],
      note: 'Hacimlerin toplanabildiği varsayılır. Her zaman ürün etiketindeki oran ve güvenlik uyarıları esas alınmalıdır.',
    };
  }
