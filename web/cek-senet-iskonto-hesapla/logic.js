// Çek Senet İskonto (Kırdırma) Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const tutar = h.pos(v.tutar, 'Çek / senet tutarı');
    const oran = h.pos(v.oran, 'Yıllık iskonto oranı');
    const gun = h.pos(v.gun, 'Vadeye kalan gün');
    const masraf = h.opt(v.masraf, 0, 'Komisyon ve masraflar');
    if (masraf < 0) h.err('"Komisyon ve masraflar" negatif olamaz.');
    if (gun > 3650) h.err('"Vadeye kalan gün" en fazla 3650 olabilir.');
    const baz = v.yilGun === '365' ? 365 : 360;
    const rt = oran / 100 * gun / baz;
    const iskonto = v.yontem === 'ic' ? tutar - tutar / (1 + rt) : tutar * rt;
    const net = tutar - iskonto - masraf;
    if (net <= 0) h.err('Bu oran ve vadeyle kesintiler çek tutarını aşıyor. Oranı, gün sayısını ya da masrafı kontrol edin; uzun vadelerde iç iskonto yöntemini deneyin.');
    const kesinti = iskonto + masraf;
    return {
      rows: [
        ['Ele geçecek net tutar', h.para(net)],
        ['İskonto tutarı', h.para(iskonto)],
        ['Komisyon ve masraflar', h.para(masraf)],
        ['Toplam kesinti', `${h.para(kesinti)} (%${h.fmt(kesinti / tutar * 100, 2)})`],
        ['Efektif yıllık maliyet (basit)', '%' + h.fmt(kesinti / net * baz / gun * 100, 2)],
      ],
      note: 'Efektif maliyet, toplam kesintinin ele geçen paraya oranının yıllığa çevrilmiş hâlidir (basit faiz). Kuruluşların uyguladığı oran, vergi ve masraflar değişkendir.',
    };
  }
