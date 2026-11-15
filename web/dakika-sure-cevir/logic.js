// Dakikayı Gün Saat Dakikaya Çevirme — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const x = h.nonneg(v.dakika, 'Süre (dakika)');
    if (x > 1e12) h.err('Süre çok büyük; en fazla 1.000.000.000.000 dakika yazın.');
    const gun = Math.floor(x / 1440 + 1e-9);
    const kalan = Math.max(0, x - gun * 1440);
    const saat = Math.floor(kalan / 60 + 1e-9);
    const dk = Math.max(0, kalan - saat * 60);
    const topSaat = Math.floor(x / 60 + 1e-9);
    const topDk = Math.max(0, x - topSaat * 60);
    const dkTam = Math.floor(topDk + 1e-9);
    const sn = Math.round((topDk - dkTam) * 60);
    const iki = (n) => String(n).padStart(2, '0');
    let ss = topSaat, dd = dkTam, sx = sn;
    if (sx === 60) { sx = 0; dd += 1; }
    if (dd === 60) { dd = 0; ss += 1; }
    return {
      rows: [
        ['Gün, saat, dakika', `${h.fmt(gun, 0)} gün ${saat} saat ${h.fmt(dk, 2)} dakika`],
        ['Saat ve dakika', `${h.fmt(topSaat, 0)} saat ${h.fmt(topDk, 2)} dakika`],
        ['Saat biçimi (SS:DD:SN)', `${iki(ss)}:${iki(dd)}:${iki(sx)}`],
        ['Ondalık saat', h.fmt(x / 60, 4) + ' saat'],
        ['Ondalık gün', h.fmt(x / 1440, 4) + ' gün'],
        ['Hafta', h.fmt(x / 10080, 4) + ' hafta'],
        ['Saniye', h.fmt(x * 60, 2) + ' saniye'],
      ],
      note: '1 saat = 60 dakika, 1 gün = 24 saat = 1.440 dakika, 1 hafta = 10.080 dakika kabul edilir.',
    };
  }
