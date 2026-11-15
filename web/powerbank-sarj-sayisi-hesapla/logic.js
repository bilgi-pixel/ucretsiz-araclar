// Powerbank Şarj Sayısı Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const pb = h.pos(v.kapasite, 'Powerbank kapasitesi');
    const cihaz = h.pos(v.cihaz, 'Cihazın batarya kapasitesi');
    const verim = h.pos(v.verim, 'Toplam verim');
    const aralik = h.pos(v.aralik, 'Her şarjda doldurulan oran');
    if (verim > 100) h.err('"Toplam verim" yüzde 100\'den büyük olamaz; 60–70 arası bir değer deneyin.');
    if (aralik > 100) h.err('"Her şarjda doldurulan oran" yüzde 100\'den büyük olamaz.');
    const net = pb * verim / 100;
    const sarjBasina = cihaz * aralik / 100;
    const sayi = net / sarjBasina;
    return {
      rows: [
        ['Şarj sayısı', 'yaklaşık ' + h.fmt(sayi, 1) + ' kez'],
        ['Tam şarj sayısı', Math.floor(sayi + 1e-9) + ' kez'],
        ['Cihaza aktarılabilen kapasite', h.fmt(net, 0) + ' mAh'],
        ['Kayıp', h.fmt(pb - net, 0) + ' mAh'],
        ['Powerbank enerjisi (3,7 V nominal)', h.fmt(pb * 3.7 / 1000, 2) + ' Wh'],
      ],
      note: 'Powerbank kapasitesi hücre gerilimi (yaklaşık 3,7 V) üzerinden verilir. Gerçek şarj sayısı kablo kalitesine, şarj hızına, sıcaklığa ve powerbank\'in yaşına göre değişir.',
    };
  }
