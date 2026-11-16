// UPS (Kesintisiz Güç Kaynağı) Çalışma Süresi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const ah = h.pos(v.akuAh, 'Akü kapasitesi');
    const V = h.pos(v.akuV, 'Akü gerilimi');
    const adet = h.posint(v.akuAdet, 'Akü sayısı');
    const yuk = h.pos(v.yuk, 'Bağlı yük');
    const verim = h.pos(v.verim, 'Evirici verimi');
    const kul = h.pos(v.kullanim, 'Kullanılabilir kapasite');
    if (verim > 100) h.err('"Evirici verimi" yüzde 100\'den büyük olamaz.');
    if (kul > 100) h.err('"Kullanılabilir kapasite" yüzde 100\'den büyük olamaz.');
    const rows = [];
    let oran = null;
    if (String(v.upsVa ?? '').trim() !== '') {
      const va = h.pos(v.upsVa, 'UPS gücü');
      const pf = h.pos(v.upsPf, 'UPS çıkış güç faktörü');
      if (pf > 1) h.err('"UPS çıkış güç faktörü" 1\'den büyük olamaz; 0,6 – 1 arasında bir değer yazın.');
      const maxW = va * pf;
      if (yuk > maxW + 1e-9) h.err(`Bağlı yük (${h.fmt(yuk, 0)} W), UPS'in verebileceği gücü (${h.fmt(maxW, 0)} W) aşıyor. Yükü azaltın ya da daha güçlü bir UPS seçin.`);
      oran = [maxW, yuk / maxW * 100];
    }
    const toplam = ah * V * adet;
    const net = toplam * verim / 100 * kul / 100;
    const dk = net / yuk * 60;
    const tam = Math.round(dk);
    const sure = tam < 1 ? '1 dakikadan az' : tam < 60 ? `${tam} dakika` : `${Math.floor(tam / 60)} saat ${tam % 60} dakika`;
    rows.push(['Çalışma süresi', sure]);
    rows.push(['Süre (dakika)', h.fmt(dk, 1) + ' dk']);
    rows.push(['Akü grubunun enerjisi', h.fmt(toplam, 1) + ' Wh']);
    rows.push(['Yüke ulaşan enerji', h.fmt(net, 2) + ' Wh']);
    rows.push(['Aküden çekilen akım', h.fmt(yuk / (verim / 100) / (V * adet), 2) + ' A']);
    if (oran) {
      rows.push(['UPS\'in verebileceği güç', h.fmt(oran[0], 0) + ' W']);
      rows.push(['UPS yük oranı', '%' + h.fmt(oran[1], 1)]);
    }
    return { rows, note: 'Sonuç yaklaşık bir tahmindir. Akü yaşı, sıcaklık ve boşalma hızı süreyi belirgin biçimde değiştirir; kritik sistemlerde üreticinin süre tablolarını ve gerçek testi esas alın. Aküden çekilen akım, aküler seri bağlıymış gibi toplam grup gerilimi üzerinden hesaplanır.' };
  }
