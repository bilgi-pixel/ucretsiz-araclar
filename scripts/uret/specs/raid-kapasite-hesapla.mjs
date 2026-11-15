export default {
  slug: 'raid-kapasite-hesapla',
  title: 'RAID Kapasitesi Hesaplama',
  h1Tail: 'RAID 0, 1, 5, 6 ve 10',
  pageTitle: 'RAID Kapasitesi Hesaplama – RAID 0, 1, 5, 6, 10 Kullanılabilir Alan',
  description: 'Disk sayısı, disk kapasitesi ve RAID seviyesini seçin; kullanılabilir alanı, yedekliğe ayrılan kapasiteyi, kaç disk arızasına dayandığını ve TiB karşılığını görün.',
  card: 'RAID 0, 1, 5, 6 ve 10 için kullanılabilir kapasiteyi, yedekliğe giden alanı ve hata toleransını hesaplayın.',
  category: 'gunluk',
  keywords: ['raid kapasite hesaplama', 'raid 5 kapasite', 'raid hesaplama', 'raid 10 kaç disk', 'nas disk kapasitesi', 'raid 6 kullanılabilir alan', 'raid 1 kapasite'],
  lead: 'Bir NAS cihazı, sunucu ya da kayıt cihazı için disk alırken asıl soru "toplam kaç terabayt kullanabileceğim?" sorusudur. Disk sayısını, tek diskin kapasitesini ve RAID seviyesini seçin; araç <strong>kullanılabilir alanı</strong>, yedekliğe ayrılan kısmı ve dizinin kaç disk arızasına dayanabildiğini göstersin.',
  button: 'Hesapla',
  inputs: [
    { id: 'adet', label: 'Disk sayısı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'kapasite', label: 'Tek diskin kapasitesi (TB)', type: 'number', placeholder: 'Örn. 4', hint: 'Diskler farklıysa en küçüğünün kapasitesini yazın' },
    { id: 'seviye', label: 'RAID seviyesi', type: 'select', options: [['5', 'RAID 5'], ['0', 'RAID 0'], ['1', 'RAID 1'], ['6', 'RAID 6'], ['10', 'RAID 10']] },
  ],
  compute(v, h) {
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
  },
  cases: [
    { in: { adet: '4', kapasite: '4', seviye: '5' }, out: { 'Kullanılabilir kapasite': '12 TB', 'İşletim sisteminde görünen': '10,91 TiB', 'Ham (toplam) kapasite': '16 TB', 'Yedekliğe ayrılan': '4 TB', 'Kapasite verimi': '%75', 'Dayanabildiği disk arızası': '1 disk' } },
    { in: { adet: '2', kapasite: '8', seviye: '1' }, out: { 'Kullanılabilir kapasite': '8 TB', 'İşletim sisteminde görünen': '7,28 TiB', 'Yedekliğe ayrılan': '8 TB', 'Kapasite verimi': '%50', 'Dayanabildiği disk arızası': '1 disk' } },
    { in: { adet: '6', kapasite: '10', seviye: '6' }, out: { 'Kullanılabilir kapasite': '40 TB', 'İşletim sisteminde görünen': '36,38 TiB', 'Ham (toplam) kapasite': '60 TB', 'Kapasite verimi': '%66,7', 'Dayanabildiği disk arızası': '2 disk' } },
    { in: { adet: '4', kapasite: '2', seviye: '10' }, out: { 'Kullanılabilir kapasite': '4 TB', 'Yedekliğe ayrılan': '4 TB', 'Kapasite verimi': '%50', 'Dayanabildiği disk arızası': 'En az 1, en çok 2 disk (her ayna çiftinden birer disk)' } },
    { in: { adet: '3', kapasite: '1', seviye: '0' }, out: { 'Kullanılabilir kapasite': '3 TB', 'İşletim sisteminde görünen': '2,73 TiB', 'Yedekliğe ayrılan': '0 TB', 'Kapasite verimi': '%100' } },
    { in: { adet: '8', kapasite: '16', seviye: '5' }, out: { 'Kullanılabilir kapasite': '112 TB', 'Ham (toplam) kapasite': '128 TB', 'Kapasite verimi': '%87,5' } },
    { in: { adet: '3', kapasite: '4', seviye: '1' }, out: { 'Kullanılabilir kapasite': '4 TB', 'Dayanabildiği disk arızası': '2 disk' } },
    { in: { adet: '2', kapasite: '4', seviye: '5' }, error: true },
    { in: { adet: '5', kapasite: '4', seviye: '10' }, error: true },
    { in: { adet: '3,5', kapasite: '4', seviye: '5' }, error: true },
  ],
  howto: [
    'Diziye takacağınız disk sayısını yazın.',
    'Tek bir diskin kapasitesini terabayt olarak girin. Farklı boyutlarda diskleriniz varsa en küçüğünün kapasitesini yazın.',
    'Kurmayı düşündüğünüz RAID seviyesini listeden seçin.',
    '"Hesapla" düğmesine basın; kullanılabilir kapasiteyi, işletim sisteminde görünecek değeri ve hata toleransını inceleyin.',
    'Farklı seviyeleri sırayla seçerek kapasite ile güvenlik arasındaki dengeyi karşılaştırın.',
  ],
  sections: [
    { h: 'RAID nedir?', p: [
      'RAID, birden fazla diski tek bir depolama birimi gibi çalıştıran bir düzendir. Amaca göre üç şeyden biri ya da birkaçı hedeflenir: daha fazla kapasite, daha yüksek hız ve bir disk bozulduğunda verinin erişilebilir kalması. Hangi hedefin ne ölçüde karşılanacağını RAID seviyesi belirler. Seviye numaraları bir "iyilik sırası" değildir; her biri farklı bir yerleşim yöntemini ifade eder.',
      'Yedeklilik sağlayan seviyelerde disklerin bir kısmının kapasitesi veri yerine kopyaya ya da eşlik (parity) bilgisine ayrılır. Bu yüzden satın aldığınız toplam kapasite ile kullanabileceğiniz kapasite aynı değildir; bu araç aradaki farkı gösterir.',
    ] },
    { h: 'Seviyelere göre kapasite formülleri', p: [
      'Aşağıda <em>n</em> disk sayısını, <em>C</em> tek diskin kapasitesini gösterir:',
    ], ul: [
      '<strong>RAID 0 (şeritleme):</strong> kapasite = n × C. En az 2 disk. Yedeklilik yoktur; tek bir diskin arızası tüm diziyi kaybettirir.',
      '<strong>RAID 1 (aynalama):</strong> kapasite = C. En az 2 disk. Her disk aynı veriyi taşır; n − 1 disk arızasına dayanır.',
      '<strong>RAID 5 (tek eşlik):</strong> kapasite = (n − 1) × C. En az 3 disk. Bir disk arızasına dayanır.',
      '<strong>RAID 6 (çift eşlik):</strong> kapasite = (n − 2) × C. En az 4 disk. Aynı anda iki disk arızasına dayanır.',
      '<strong>RAID 10 (aynalı şeritleme):</strong> kapasite = (n ÷ 2) × C. En az 4 disk ve çift sayı. Her ayna çiftinden bir disk bozulabilir; aynı çiftin iki diski birden bozulursa veri kaybolur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: Dört yuvalı bir NAS cihazına 4 TB\'lık dört disk takıp RAID 5 kurarsanız kullanılabilir kapasite (4 − 1) × 4 = 12 TB olur. Ham kapasite 16 TB\'dır; 4 TB eşlik bilgisine gider ve kapasite verimi yüzde 75\'tir. İşletim sistemi bu alanı yaklaşık 10,91 TiB olarak gösterir.',
      'Örnek 2: 10 TB\'lık altı diskle RAID 6 kurulduğunda (6 − 2) × 10 = 40 TB kullanılabilir alan elde edilir; iki diskin kapasitesi yedekliğe ayrılır, verim yüzde 66,7\'dir ve dizi aynı anda iki disk arızasını kaldırır.',
      'Örnek 3: 8 TB\'lık iki diskle RAID 1 kurulursa kullanılabilir alan 8 TB\'dır; ikinci disk birincinin birebir kopyasıdır. 2 TB\'lık dört diskle RAID 10 ise 4 TB verir.',
    ] },
    { h: 'TB ile TiB farkı: disk neden eksik görünür?', p: [
      'Disk üreticileri kapasiteyi onluk sistemle verir: 1 TB = 1.000.000.000.000 bayt. Birçok işletim sistemi ise 1.024\'ün katlarıyla hesap yapar ve 2<sup>40</sup> baytlık birimi kullanır; bunun doğru adı tebibayttır (TiB), ancak ekranda çoğu zaman yine "TB" yazar. İki birim arasındaki oran yaklaşık 0,909\'dur. Dolayısıyla 4 TB\'lık bir disk yaklaşık 3,64 TiB, 12 TB\'lık bir dizi yaklaşık 10,91 TiB görünür. Arada kaybolan bir şey yoktur; yalnızca birim farklıdır.',
      'Buna ek olarak dosya sistemi kendi yapıları için bir miktar alan ayırır, NAS işletim sistemleri sistem bölümü ve takas alanı oluşturur. Bu yüzden gerçekte kullanabileceğiniz boş alan araçta görünen değerden bir miktar daha az olur.',
    ] },
    { h: 'Hangi seviye ne zaman tercih edilir?', p: [
      'RAID 0, verinin kaybı sorun olmayan geçici çalışma alanlarında (örneğin yeniden üretilebilir ön bellek ya da kurgu sırasında geçici dosyalar) hız ve kapasite için kullanılır. RAID 1, iki diskli küçük ofis ve ev cihazlarında basit ve anlaşılır bir koruma sağlar. RAID 5, üç ile beş-altı disk arasındaki dizilerde kapasite ile koruma arasında yaygın bir dengedir. Disk sayısı ve disk boyutu büyüdükçe yeniden oluşturma (rebuild) süresi uzar ve bu sırada ikinci bir diskin bozulma olasılığı önem kazanır; bu durumda RAID 6 daha güvenli bir seçimdir. RAID 10, veritabanı gibi yoğun yazma yapan işlerde hız ve hızlı toparlanma için tercih edilir, bedeli kapasitenin yarısıdır.',
      'Güvenlik kamerası kayıt cihazlarında ve ofis dosya sunucularında seçim yapılırken diskin kendisi kadar, bozulan diskin ne kadar sürede değiştirilebileceği de düşünülmelidir.',
    ] },
    { h: 'RAID yedekleme değildir', p: [
      'RAID yalnızca disk arızasına karşı sürekliliği sağlar. Yanlışlıkla silinen dosya, fidye yazılımı, yazılım hatası, hırsızlık, yangın, su baskını ya da denetleyici kartının bozulması gibi durumlarda dizideki tüm diskler aynı anda etkilenir. Önemli veriler için RAID\'den bağımsız, ayrı bir cihazda ve tercihen farklı bir konumda tutulan düzenli yedek şarttır. Ayrıca aynı partiden alınmış diskler benzer zamanlarda yıpranabildiği için disk sağlık uyarılarını izlemek ve arızalı diski bekletmeden değiştirmek gerekir.',
      'Bu araç standart RAID seviyelerinin kuramsal kapasitesini hesaplar. Üreticilere özgü karma düzenler, farklı boyutlu disklerin esnek kullanımı, sıcak yedek (hot spare) diskler ve dosya sistemi tabanlı havuzlar için sonuç farklı olabilir; sıcak yedek kullanacaksanız o diski disk sayısına katmayın.',
    ] },
  ],
  faq: [
    ['4 adet 4 TB disk RAID 5 ile kaç TB eder?', 'Kullanılabilir kapasite (4 − 1) × 4 = 12 TB\'dır. İşletim sistemi bunu yaklaşık 10,91 TiB olarak gösterir; dosya sistemi payı düşüldüğünde biraz daha az boş alan kalır.'],
    ['RAID 5 için en az kaç disk gerekir?', 'En az 3 disk gerekir. İki diskiniz varsa yedeklilik için RAID 1 kullanabilirsiniz; RAID 6 ve RAID 10 için ise en az 4 disk gerekir.'],
    ['Farklı kapasitede diskler kullanırsam ne olur?', 'Standart RAID seviyelerinde her diskten en küçük diskin kapasitesi kadar alan kullanılır; büyük disklerin fazlası boşta kalır. Bu yüzden araca en küçük diskin kapasitesini yazmalısınız.'],
    ['RAID 5 mi RAID 6 mı daha güvenli?', 'RAID 6 aynı anda iki disk arızasına dayandığı için daha güvenlidir; karşılığında bir disk kapasitesi daha yedekliğe gider. Büyük kapasiteli ve çok diskli dizilerde yeniden oluşturma uzun sürdüğünden RAID 6 daha sık önerilir.'],
    ['RAID 10 ile RAID 01 aynı mı?', 'Kapasiteleri aynıdır ama yapıları farklıdır. RAID 10\'da önce diskler çiftler hâlinde aynalanır, sonra bu çiftler şeritlenir; bu düzen birden fazla disk arızasına karşı daha dayanıklıdır ve günümüzde yaygın olan odur.'],
    ['RAID 1\'e üçüncü disk eklemek kapasiteyi artırır mı?', 'Hayır. RAID 1\'de tüm diskler aynı verinin kopyasıdır; üçüncü disk yalnızca ek bir kopya sağlar ve dizinin dayanabildiği arıza sayısını ikiye çıkarır. Kapasite tek disk kadardır.'],
    ['SSD ile RAID kurulabilir mi?', 'Evet, kapasite hesabı diskin türünden bağımsızdır; aynı formüller SSD için de geçerlidir. Yalnızca SSD kapasiteleri çoğunlukla GB olarak verildiğinden değeri TB\'a çevirip yazın: 500 GB için 0,5.'],
    ['Girdiğim bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; disk sayısı ve kapasite bilgisi sunucuya iletilmez.'],
  ],
  related: ['guvenlik-kamerasi-depolama-hesapla', 'bant-genisligi-hesapla', 'ip-alt-ag-hesapla', 'ups-calisma-suresi-hesapla', 'poe-guc-butcesi-hesapla'],
};
