export default {
  slug: 'guvenlik-kamerasi-depolama-hesapla',
  title: 'Güvenlik Kamerası Kayıt Depolama Hesaplama',
  h1Tail: 'kaç TB disk gerekir?',
  pageTitle: 'Güvenlik Kamerası Depolama Hesaplama – Kaç TB Disk Gerekir?',
  description: 'Kamera sayısı, bit hızı, günlük kayıt süresi ve saklama gününe göre kayıt cihazı için gereken disk kapasitesini GB ve TB olarak hesaplayın.',
  card: 'Kamera sayısı, bit hızı ve saklama süresinden kayıt cihazı için gereken disk kapasitesini TB olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['güvenlik kamerası depolama hesaplama', 'kamera kayıt süresi hesaplama', 'nvr disk hesaplama', 'kaç tb disk gerekir', 'dvr hdd hesaplama', 'kamera hard disk hesabı', '30 gün kayıt için disk'],
  lead: 'Kayıt cihazına (NVR ya da DVR) takılacak diskin boyutu dört şeye bağlıdır: kamera sayısı, her kameranın <strong>bit hızı</strong>, günde kaç saat kayıt yapıldığı ve kayıtların kaç gün saklanacağı. Bu dört değeri yazın; araç gereken depolama alanını gigabayt ve terabayt olarak hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'kamera', label: 'Kamera sayısı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'bithizi', label: 'Kamera başına bit hızı (Mbps)', type: 'number', placeholder: 'Örn. 2', hint: 'Kamera ya da kayıt cihazı ayarlarındaki "bitrate"; 2048 kbps = 2 Mbps' },
    { id: 'saat', label: 'Günlük kayıt süresi (saat)', type: 'number', value: '24', hint: 'Sürekli kayıt için 24; hareketle kayıtta günlük ortalama' },
    { id: 'gun', label: 'Saklama süresi (gün)', type: 'number', placeholder: 'Örn. 30' },
  ],
  compute(v, h) {
    const kamera = h.posint(v.kamera, 'Kamera sayısı');
    const mbps = h.pos(v.bithizi, 'Kamera başına bit hızı');
    const saat = h.pos(v.saat, 'Günlük kayıt süresi');
    if (saat > 24) h.err('Günlük kayıt süresi 24 saatten fazla olamaz.');
    const gun = h.pos(v.gun, 'Saklama süresi');
    // Mbps → GB/saat: 1 Mbps × 3600 sn ÷ 8 = 450 MB = 0,45 GB
    const kameraGunluk = mbps * 0.45 * saat;
    const gunluk = kameraGunluk * kamera;
    const toplam = gunluk * gun;
    const tib = toplam * 1e9 / Math.pow(2, 40);
    return {
      rows: [
        ['Gereken depolama', h.fmt(toplam / 1000, 3) + ' TB'],
        ['Gigabayt karşılığı', h.fmt(toplam, 2) + ' GB'],
        ['İşletim sisteminde görünen', h.fmt(tib, 2) + ' TiB'],
        ['Günlük toplam kayıt', h.fmt(gunluk, 2) + ' GB/gün'],
        ['Kamera başına günlük kayıt', h.fmt(kameraGunluk, 2) + ' GB/gün'],
        ['Toplam bit hızı', h.fmt(mbps * kamera, 2) + ' Mbps'],
      ],
      note: '1 Mbps sürekli kayıt saatte 0,45 GB, günde 10,8 GB yer tutar (1 GB = 1.000 MB). Ses kaydı, alt akım ve dosya sistemi payı için sonuca yaklaşık %10–20 eklemek yerinde olur.',
    };
  },
  cases: [
    { in: { kamera: '4', bithizi: '2', saat: '24', gun: '30' }, out: { 'Gereken depolama': '2,592 TB', 'Gigabayt karşılığı': '2.592 GB', 'İşletim sisteminde görünen': '2,36 TiB', 'Günlük toplam kayıt': '86,4 GB/gün', 'Kamera başına günlük kayıt': '21,6 GB/gün', 'Toplam bit hızı': '8 Mbps' } },
    { in: { kamera: '8', bithizi: '4', saat: '24', gun: '30' }, out: { 'Gereken depolama': '10,368 TB', 'Gigabayt karşılığı': '10.368 GB', 'İşletim sisteminde görünen': '9,43 TiB', 'Günlük toplam kayıt': '345,6 GB/gün' } },
    { in: { kamera: '1', bithizi: '1', saat: '24', gun: '1' }, out: { 'Gigabayt karşılığı': '10,8 GB', 'Gereken depolama': '0,011 TB' } },
    { in: { kamera: '16', bithizi: '2', saat: '12', gun: '15' }, out: { 'Gereken depolama': '2,592 TB', 'Kamera başına günlük kayıt': '10,8 GB/gün', 'Toplam bit hızı': '32 Mbps' } },
    { in: { kamera: '2', bithizi: '8', saat: '24', gun: '7' }, out: { 'Gereken depolama': '1,21 TB', 'Gigabayt karşılığı': '1.209,6 GB', 'Günlük toplam kayıt': '172,8 GB/gün' } },
    { in: { kamera: '32', bithizi: '4', saat: '24', gun: '30' }, out: { 'Gereken depolama': '41,472 TB', 'İşletim sisteminde görünen': '37,72 TiB' } },
    { in: { kamera: '4', bithizi: '2', saat: '30', gun: '30' }, error: true },
    { in: { kamera: '0', bithizi: '2', saat: '24', gun: '30' }, error: true },
    { in: { kamera: '4', bithizi: 'iki', saat: '24', gun: '30' }, error: true },
  ],
  howto: [
    'Kayıt yapacak kamera sayısını yazın.',
    'Kameraların bit hızını Mbps olarak girin. Değer kamera ya da kayıt cihazının video ayarlarında "bit hızı" ya da "bitrate" adıyla yer alır; kbps yazıyorsa 1.000\'e bölün.',
    'Sürekli kayıt için günlük süreyi 24 bırakın; hareket algılamayla kayıt yapıyorsanız günde ortalama kaç saat kayıt oluştuğunu yazın.',
    'Kayıtları kaç gün geriye dönük saklamak istediğinizi girin ve "Hesapla" düğmesine basın.',
    'Çıkan değerin üzerine pay ekleyip piyasadaki bir üst disk boyutunu seçin.',
  ],
  sections: [
    { h: 'Hesaplama formülü', p: [
      'Video kaydının diskte kapladığı yer çözünürlükle değil doğrudan <strong>bit hızıyla</strong> belirlenir. Bit hızı, kameranın saniyede ürettiği veri miktarıdır. 1 Mbps, saniyede 1 megabit, yani 0,125 megabayt demektir. Bir saatte 3.600 saniye olduğundan 1 Mbps\'lik akış saatte 450 megabayt (0,45 GB), 24 saatte 10,8 GB yer tutar.',
      'Genel formül şudur: <strong>depolama (GB) = kamera sayısı × bit hızı (Mbps) × 0,45 × günlük saat × gün sayısı</strong>. Terabayta çevirmek için sonucu 1.000\'e bölersiniz. Çözünürlük, kare hızı ve sıkıştırma biçimi bu formülde doğrudan yer almaz; hepsi bit hızının içine gömülüdür.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Bir iş yerinde 4 kamera var, her biri 2 Mbps ile 24 saat kayıt yapıyor ve kayıtlar 30 gün saklanacak. Bir kamera günde 2 × 0,45 × 24 = 21,6 GB üretir. Dört kamera günde 86,4 GB, otuz günde 86,4 × 30 = 2.592 GB, yani 2,592 TB yer tutar. Pay eklendiğinde 4 TB\'lık bir disk uygun olur.',
      'Örnek 2: 8 kamera, 4 Mbps, 24 saat, 30 gün için hesap 8 × 4 × 0,45 × 24 × 30 = 10.368 GB, yani 10,368 TB\'dır. Bu boyutta tek disk yerine birden fazla disk ve yedekli bir dizi düşünmek gerekir.',
      'Örnek 3: 16 kameralı bir sitede hareketle kayıt yapılıyor ve günde ortalama 12 saatlik kayıt oluşuyor; bit hızı 2 Mbps, saklama süresi 15 gün. Sonuç 16 × 2 × 0,45 × 12 × 15 = 2.592 GB\'dır. Sürekli kayıtla aynı süre iki katı yer tutardı.',
    ] },
    { h: 'Bit hızını nereden öğrenirim?', p: [
      'En doğru değer cihazın kendi ayarlarındaki değerdir. Kamera ya da kayıt cihazının video/kodlama menüsünde ana akım için bir bit hızı yazar; bu çoğunlukla kbps cinsindendir (örneğin 2048 kbps yaklaşık 2 Mbps, 4096 kbps yaklaşık 4 Mbps eder). Ayar "sabit bit hızı" ise kamera her zaman bu değeri üretir ve hesap kesine yakın çıkar. "Değişken bit hızı" seçiliyse yazan değer üst sınırdır; sakin sahnelerde kamera daha az veri üretir ve gerçek kullanım hesaplanandan düşük kalır.',
      'Bit hızını henüz bilmiyorsanız, çözünürlük ve kare hızından yaklaşık bir değer tahmin eden IP kamera bant genişliği aracını kullanıp oradan çıkan değeri buraya yazabilirsiniz.',
    ] },
    { h: 'Depolamayı azaltan ve artıran etkenler', ul: [
      '<strong>Sıkıştırma biçimi:</strong> H.265, aynı görüntü kalitesinde H.264\'e göre kabaca yarı yarıya daha düşük bit hızıyla çalışabilir; cihazlar destekliyorsa depolama ihtiyacını belirgin biçimde düşürür.',
      '<strong>Çözünürlük ve kare hızı:</strong> Yüksek çözünürlük ve saniyede daha fazla kare, aynı kalite için daha yüksek bit hızı gerektirir. Çoğu güvenlik senaryosunda saniyede 12–15 kare yeterli akıcılığı sağlar.',
      '<strong>Hareketle kayıt:</strong> Yalnızca hareket olduğunda kayıt yapmak, gece boş kalan depo ya da ofislerde kullanımı çok azaltır; işlek bir cadde ya da mağaza girişinde ise tasarruf sınırlı kalır.',
      '<strong>Sahne içeriği:</strong> Rüzgârda sallanan ağaçlar, yağmur, kar ve gece görüşündeki kumlanma değişken bit hızında veri miktarını artırır.',
      '<strong>Ses kaydı ve alt akım:</strong> Ses ve ikinci (düşük çözünürlüklü) akım da kaydediliyorsa bir miktar ek yer gerekir.',
    ] },
    { h: 'Disk seçerken pay bırakın', p: [
      'Hesaplanan değer ham video verisidir. Diskin üzerinde yazan kapasite onluk sistemledir (1 TB = 1.000 GB); kayıt cihazları ve bilgisayarlar çoğunlukla 1.024 tabanlı gösterim kullandığı için aynı disk ekranda daha küçük görünür. Araçtaki "İşletim sisteminde görünen" satırı bu karşılığı verir. Ayrıca dosya sistemi ve cihazın kendi dizin yapıları bir miktar alan kullanır. Bu nedenlerle hesaplanan değerin üzerine yüzde 10–20 pay ekleyip bir üst disk boyutunu seçmek sağlıklıdır.',
      'Birden fazla diskle yedekli dizi kuracaksanız kullanılabilir kapasite ham kapasiteden düşük olur; bu durumda gereken disk sayısını RAID kapasitesi aracıyla hesaplayın. Güvenlik kaydı diskleri günün her saati yazma yaptığı için sürekli çalışmaya uygun, izleme sistemleri için üretilmiş disklerin tercih edilmesi önerilir.',
    ] },
    { h: 'Saklama süresi ve yasal yükümlülükler', p: [
      'Kayıtların kaç gün saklanacağı işin niteliğine göre değişir. Bazı sektörlerde ve bazı iş yeri türlerinde asgari saklama süreleri ilgili mevzuatla ya da yerel idarenin kararlarıyla belirlenmiş olabilir; öte yandan kişisel verilerin korunması kuralları kayıtların gereğinden uzun tutulmamasını ve kamerayla izleme yapıldığının duyurulmasını gerektirir. Bu araç yalnızca kapasite hesabı yapar; iş yeriniz için geçerli süreyi ve yükümlülükleri güncel mevzuattan ya da bir hukuk danışmanından teyit edin.',
      'Sonuç bir planlama tahminidir. Gerçek kullanım; kameraların ayarına, sahneye ve cihazın kayıt yöntemine göre değişir. Kurulumdan birkaç gün sonra cihazın gösterdiği günlük kullanımı kontrol edip saklama süresini doğrulamak en güvenilir yöntemdir.',
    ] },
  ],
  faq: [
    ['4 kamera 30 gün kayıt için kaç TB disk gerekir?', 'Kamera başına 2 Mbps ve 24 saat sürekli kayıtla 2,592 TB gerekir; pay ile birlikte 4 TB\'lık disk uygundur. Bit hızı 4 Mbps ise ihtiyaç 5,184 TB\'a çıkar ve 6 TB ya da 8 TB\'lık disk gerekir.'],
    ['1 TB disk kaç gün kayıt yapar?', 'Toplam bit hızına bağlıdır. 1 TB, 1.000 GB\'dır; günlük kayıt miktarına bölersiniz. Dört kamera 2 Mbps ile günde 86,4 GB üretir, dolayısıyla 1 TB yaklaşık 11,5 günlük kayıt tutar.'],
    ['Bit hızı kbps olarak yazıyor, nasıl girerim?', 'kbps değerini 1.000\'e bölerek Mbps\'ye çevirin. 2048 kbps için yaklaşık 2, 4096 kbps için yaklaşık 4, 512 kbps için 0,5 yazabilirsiniz.'],
    ['Çözünürlük neden hesapta yok?', 'Çünkü diskte kaplanan yeri doğrudan bit hızı belirler. Çözünürlük, kare hızı ve sıkıştırma biçimi bit hızını etkiler; bit hızı biliniyorsa bunlara ayrıca gerek kalmaz.'],
    ['Hareket algılamalı kayıtta nasıl hesap yaparım?', 'Günlük kayıt süresi alanına, günde ortalama kaç saatlik kayıt oluştuğunu yazın. Bilmiyorsanız önce sürekli kayıt gibi hesaplayın; bu, ihtiyacın üst sınırını verir.'],
    ['Disk dolunca ne olur?', 'Kayıt cihazlarının çoğu üzerine yazma özelliğiyle çalışır: disk dolduğunda en eski kayıtlar silinerek yenileri yazılır. Bu yüzden disk boyutu aslında kaç gün geriye gidebileceğinizi belirler.'],
    ['H.265 kullanırsam ne kadar yer kazanırım?', 'Benzer görüntü kalitesinde bit hızı kabaca yarıya inebilir; bu da depolama ihtiyacının aynı oranda azalması demektir. Kesin değer kameranın ayarlarına ve sahneye bağlıdır; araca kameranın gerçek bit hızını yazın.'],
    ['Girdiğim kamera bilgileri bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['ip-kamera-bant-genisligi-hesapla', 'raid-kapasite-hesapla', 'poe-guc-butcesi-hesapla', 'bant-genisligi-hesapla', 'kamera-lens-gorus-acisi-hesapla'],
};
