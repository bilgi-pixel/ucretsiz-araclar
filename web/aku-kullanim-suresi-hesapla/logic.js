// Akü Kullanım Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ah = h.pos(v.kapasite, 'Akü kapasitesi');
    const V = h.pos(v.gerilim, 'Akü gerilimi');
    const yuk = h.pos(v.yuk, 'Yük');
    const dod = h.pos(v.dod, 'Deşarj derinliği');
    const verim = h.pos(v.verim, 'Verim');
    if (dod > 100) h.err('"Deşarj derinliği" yüzde 100\'den büyük olamaz.');
    if (verim > 100) h.err('"Verim" yüzde 100\'den büyük olamaz.');
    const W = v.birim === 'a' ? yuk * V : yuk;
    const kullanilabilir = ah * V * dod / 100;
    const yukeGiden = kullanilabilir * verim / 100;
    const saat = yukeGiden / W;
    const dk = Math.round(saat * 60);
    const akim = W / (verim / 100) / V;
    return {
      rows: [
        ['Çalışma süresi', `${Math.floor(dk / 60)} saat ${dk % 60} dakika`],
        ['Süre (ondalık)', h.fmt(saat, 2) + ' saat'],
        ['Akünün toplam enerjisi', h.fmt(ah * V, 1) + ' Wh'],
        ['Kullanılabilir enerji', h.fmt(kullanilabilir, 1) + ' Wh'],
        ['Yüke ulaşan enerji', h.fmt(yukeGiden, 1) + ' Wh'],
        ['Aküden çekilen akım', h.fmt(akim, 2) + ' A'],
        ['Deşarj hızı', h.fmt(akim / ah, 3) + ' C'],
      ],
      note: 'Hesap, akünün etiket kapasitesini verdiğini varsayar. Yüksek akımda, soğukta ve eskimiş akülerde gerçek süre daha kısadır; sonuç yaklaşık değerdir.',
    };
  }
