// Video Zaman Kodu (Timecode) Kare Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const HIZ = {
      '25': [25, 25, 0, '25 fps'],
      '24': [24, 24, 0, '24 fps'],
      '23.976': [24, 24000 / 1001, 0, '23,976 fps'],
      '30': [30, 30, 0, '30 fps'],
      '29.97ndf': [30, 30000 / 1001, 0, '29,97 fps (non-drop)'],
      '29.97df': [30, 30000 / 1001, 2, '29,97 fps (drop-frame)'],
      '50': [50, 50, 0, '50 fps'],
      '60': [60, 60, 0, '60 fps'],
      '59.94ndf': [60, 60000 / 1001, 0, '59,94 fps (non-drop)'],
      '59.94df': [60, 60000 / 1001, 4, '59,94 fps (drop-frame)'],
    };
    const hiz = HIZ[v.fps];
    if (!hiz) h.err('Listeden geçerli bir kare hızı seçin.');
    const [nom, gercek, dus, ad] = hiz;
    const iki = (n) => String(n).padStart(2, '0');
    const ham = String(v.deger ?? '').trim();
    if (ham === '') h.err('"Zaman kodu ya da kare sayısı" alanını doldurun.');
    let kare;
    if (v.yon === 'kare') {
      kare = h.int(ham, 'Kare sayısı');
      if (kare < 0) h.err('"Kare sayısı" negatif olamaz.');
    } else {
      const p = ham.split(/[:;.,]/).map((x) => x.trim());
      if (p.length !== 4 || !p.every((x) => /^\d{1,3}$/.test(x))) h.err('Zaman kodunu SS:DD:SN:KK biçiminde dört parça olarak yazın (örn. 01:00:00:00).');
      const [sa, dk, sn, kk] = p.map(Number);
      if (dk > 59) h.err('Zaman kodunda dakika 59\'dan büyük olamaz.');
      if (sn > 59) h.err('Zaman kodunda saniye 59\'dan büyük olamaz.');
      if (kk >= nom) h.err(`Bu kare hızında kare alanı 0 ile ${nom - 1} arasında olmalı.`);
      if (dus && sn === 0 && dk % 10 !== 0 && kk < dus) h.err(`Drop-frame sayımında bu zaman kodu yoktur: 10'a bölünmeyen dakikaların başında ilk ${dus} kare numarası atlanır.`);
      const toplamDk = sa * 60 + dk;
      kare = (toplamDk * 60 + sn) * nom + kk - dus * (toplamDk - Math.floor(toplamDk / 10));
    }
    if (kare > 100 * 3600 * nom) h.err('Değer çok büyük; 100 saatten kısa bir süre girin.');
    // kare → zaman kodu
    let n = kare;
    if (dus) {
      const onDk = nom * 600 - dus * 9;
      const birDk = nom * 60 - dus;
      const d = Math.floor(n / onDk), m = n % onDk;
      n += dus * 9 * d + (m > dus ? dus * Math.floor((m - dus) / birDk) : 0);
    }
    const kk = n % nom;
    const tsn = Math.floor(n / nom);
    const tc = `${iki(Math.floor(tsn / 3600))}:${iki(Math.floor(tsn / 60) % 60)}:${iki(tsn % 60)}${dus ? ';' : ':'}${iki(kk)}`;
    // gerçek süre
    const ms = Math.round(kare / gercek * 1000);
    const sure = `${Math.floor(ms / 3600000)}:${iki(Math.floor(ms / 60000) % 60)}:${iki(Math.floor(ms / 1000) % 60)},${String(ms % 1000).padStart(3, '0')}`;
    const kareSatir = ['Kare sayısı', `${h.fmt(kare, 0)} kare`];
    const tcSatir = ['Zaman kodu', tc];
    return {
      rows: [
        ...(v.yon === 'kare' ? [tcSatir, kareSatir] : [kareSatir, tcSatir]),
        ['Gerçek süre', sure],
        ['Kare hızı', ad],
      ],
      note: 'Kare sayısı, 00:00:00:00 zaman kodundan itibaren geçen kare adedidir (ilk kare 0 numaradır). Gerçek süre saat:dakika:saniye,milisaniye biçimindedir.',
    };
  }
