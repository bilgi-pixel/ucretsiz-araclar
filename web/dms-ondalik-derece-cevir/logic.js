// Derece Dakika Saniye – Ondalık Derece Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    let deger;
    if (v.yon === 'ondalik') {
      deger = h.num(v.ondalik, 'Ondalık derece');
    } else {
      const d = h.nonneg(v.derece, 'Derece');
      const m = h.opt(v.dakika, 0, 'Dakika');
      const s = h.opt(v.saniye, 0, 'Saniye');
      if (m < 0 || m >= 60) h.err('"Dakika" 0 ile 60 arasında olmalı (60 dahil değil). 60 dakikayı 1 derece olarak yazın.');
      if (s < 0 || s >= 60) h.err('"Saniye" 0 ile 60 arasında olmalı (60 dahil değil). 60 saniyeyi 1 dakika olarak yazın.');
      deger = d + m / 60 + s / 3600;
      if (v.isaret === 'eksi') deger = -deger;
    }
    const ss = Math.round(Math.abs(deger) * 360000);
    const d = Math.floor(ss / 360000);
    const m = Math.floor((ss % 360000) / 6000);
    const s = (ss % 6000) / 100;
    const eksi = deger < 0 && ss > 0 ? '-' : '';
    const dmsSatir = ['Derece dakika saniye', `${eksi}${d}° ${m}′ ${h.fmt(s, 2)}″`];
    const ddSatir = ['Ondalık derece', h.fmt(deger, 6) + '°'];
    const rows = v.yon === 'ondalik' ? [dmsSatir, ddSatir] : [ddSatir, dmsSatir];
    rows.push(['Derece ve ondalık dakika', `${eksi}${d}° ${h.fmt((ss % 360000) / 6000, 4)}′`]);
    rows.push(['Radyan', h.fmt(deger * Math.PI / 180, 6) + ' rad']);
    return { rows, note: '1° = 60′ = 3600″. Ondalık derece altı basamağa, saniye yüzde bire yuvarlanır. Eksi işaret güney enlemini ya da batı boylamını gösterir.' };
  }
