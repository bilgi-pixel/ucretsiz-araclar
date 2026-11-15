// RAID Kapasitesi Hesaplama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
    const n = h.posint(v.adet, 'Disk sayısı');
    const c = h.pos(v.kapasite, 'Tek diskin kapasitesi');
    const s = String(v.seviye || '5');
    let veri, tolerans, aciklama;
    if (s === '0') {
      if (n < 2) h.err('RAID 0 için en az 2 disk gerekir.');
      veri = n; tolerans = 'Yok (tek disk arızasında tüm veri kaybolur)'; aciklama = 'Şeritleme; yedeklilik yok, en yüksek kapasite.';
    } else if (s === '1') {
      if (n < 2) h.err('RAID 1 için en az 2 disk gerekir.');
      veri = 1; tolerans = `${n - 1} disk`; aciklama = 'Aynalama; tüm diskler birbirinin kopyasıdır.';
    } else if (s === '5') {
      if (n < 3) h.err('RAID 5 için en az 3 disk gerekir; 2 diskle RAID 1 seçebilirsiniz.');
      veri = n - 1; tolerans = '1 disk'; aciklama = 'Dağıtık tek eşlik; bir disk kapasitesi yedekliğe gider.';
    } else if (s === '6') {
      if (n < 4) h.err('RAID 6 için en az 4 disk gerekir.');
      veri = n - 2; tolerans = '2 disk'; aciklama = 'Dağıtık çift eşlik; iki disk kapasitesi yedekliğe gider.';
    } else if (s === '10') {
      if (n < 4) h.err('RAID 10 için en az 4 disk gerekir.');
      if (n % 2 !== 0) h.err('RAID 10 çift sayıda disk ister; disk sayısını 4, 6, 8 gibi bir değer yapın.');
      veri = n / 2; tolerans = `En az 1, en çok ${n / 2} disk (her ayna çiftinden birer disk)`; aciklama = 'Aynalanmış çiftlerin şeritlenmesi; kapasitenin yarısı kullanılır.';
    } else {
      h.err('Geçerli bir RAID seviyesi seçin.');
    }
    const kullan = veri * c;
    const ham = n * c;
    const tib = kullan * 1e12 / Math.pow(2, 40);
    return {
      rows: [
        ['Kullanılabilir kapasite', h.fmt(kullan, 2) + ' TB'],
        ['İşletim sisteminde görünen', h.fmt(tib, 2) + ' TiB'],
        ['Ham (toplam) kapasite', h.fmt(ham, 2) + ' TB'],
        ['Yedekliğe ayrılan', h.fmt(ham - kullan, 2) + ' TB'],
        ['Kapasite verimi', '%' + h.fmt(kullan / ham * 100, 1)],
        ['Dayanabildiği disk arızası', tolerans],
        ['Yapı', aciklama],
      ],
      note: 'Disk üreticileri 1 TB = 1.000.000.000.000 bayt kabul eder; işletim sistemleri çoğunlukla 1.024 tabanlı birimle (TiB) gösterdiği için değer daha küçük görünür. Dosya sistemi ve sistem bölümü payı ayrıca düşer. RAID yedekleme değildir.',
    };
  }
