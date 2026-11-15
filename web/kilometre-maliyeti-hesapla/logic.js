// Kilometre Başına Maliyet Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const km = h.pos(v.km, 'Yıllık kilometre');
    const tuk = h.pos(v.tuketim, 'Ortalama tüketim');
    const fiyat = h.pos(v.fiyat, 'Yakıt birim fiyatı');
    const sabit = h.opt(v.sabit, 0, 'Yıllık sabit giderler');
    const bakim = h.opt(v.bakim, 0, 'Yıllık bakım ve lastik');
    const deger = h.opt(v.deger, 0, 'Yıllık değer kaybı / finansman');
    if (sabit < 0 || bakim < 0 || deger < 0) h.err('Gider tutarları negatif olamaz.');
    if (tuk > 100) h.err('"Ortalama tüketim" 100 km için litre (ya da kWh) olarak girilmeli; değer çok yüksek görünüyor.');
    const yakit = km * tuk / 100 * fiyat;
    const diger = sabit + bakim + deger;
    const toplam = yakit + diger;
    return {
      rows: [
        ['Kilometre başına maliyet', h.para(toplam / km)],
        ['Kilometre başına yakıt', h.para(yakit / km)],
        ['Kilometre başına diğer giderler', h.para(diger / km)],
        ['100 km maliyeti', h.para(toplam / km * 100)],
        ['Yıllık yakıt gideri', h.para(yakit)],
        ['Yıllık toplam maliyet', h.para(toplam)],
        ['Aylık ortalama maliyet', h.para(toplam / 12)],
        ['Yakıtın toplam içindeki payı', '% ' + h.fmt(yakit / toplam * 100, 1)],
      ],
      note: 'Sabit giderler kilometreye bölündüğü için yıllık kilometre azaldıkça kilometre başına maliyet artar. Sonuç, girdiğiniz tahminlere dayanan bilgilendirme amaçlı bir hesaptır.',
    };
  }
