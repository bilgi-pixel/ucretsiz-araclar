// Araç Yakıt Tüketimi (100 km'de Litre) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const km = h.pos(v.km, 'Gidilen mesafe');
    const litre = h.pos(v.litre, 'Harcanan yakıt');
    if (km > 1e7) h.err('Gidilen mesafe çok büyük; değeri kontrol edin.');
    const l100 = (litre / km) * 100;
    if (l100 > 200) h.err('Hesaplanan tüketim 100 km\'de 200 litreyi aşıyor; mesafe ve litre değerlerini kontrol edin.');
    const rows = [
      ['100 km\'de tüketim', h.fmt(l100, 2) + ' L/100 km'],
      ['Litre başına yol', h.fmt(km / litre, 2) + ' km/L'],
      ['Mil/galon karşılığı (ABD)', h.fmt(235.214583 / l100, 2) + ' mpg'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.pos(v.fiyat, 'Litre fiyatı');
      rows.push(['Kilometre başına yakıt maliyeti', h.para((litre * f) / km)]);
      rows.push(['100 km yakıt maliyeti', h.para(l100 * f)]);
      rows.push(['Toplam yakıt gideri', h.para(litre * f)]);
    }
    return { rows, note: 'Sonuç, girdiğiniz mesafedeki ortalama tüketimdir. Doğru ölçüm için depoyu iki alımda da aynı düzeye kadar doldurun. Maliyet yalnızca yakıtı kapsar.' };
  }
