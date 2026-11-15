export default {
  slug: "raid-0-1-5-10-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "RAID 0, 1, 5 ve 10 Farkı Nedir? RAID Kapasitesi ve Disk Güvenliği",
  pageTitle: "RAID 0, 1, 5, 10 Farkı: Kapasite Hesabı ve Disk Güvenliği",
  description: "RAID 0 hız, RAID 1 ayna, RAID 5 tek eşlik, RAID 10 ayna+şerit sağlar. Kaç disk gerektiği, kullanılabilir kapasite formülleri, NAS için seçim ve RAID'in yedek olmadığı.",
  keywords: ["raid nedir", "raid 0 raid 1 farkı", "raid 5 nedir", "raid 10 kapasite", "raid kapasite hesaplama", "nas raid seçimi", "raid 5 kaç disk", "raid yedekleme mi"],
  lead: "RAID, birden fazla diski tek bir birim gibi çalıştırarak <strong>hız, kapasite ya da arıza toleransı</strong> kazandıran bir depolama yöntemidir: RAID 0 diskleri birleştirip hızlandırır ama hiç koruma sağlamaz, RAID 1 bir diskin birebir kopyasını tutar, RAID 5 bir disk kapasitesini eşlik bilgisine ayırarak tek disk arızasına dayanır, RAID 10 ise ayna çiftlerini şeritleyerek hem hız hem güvenlik sunar. Dört adet 4 TB diskle RAID 0 16 TB, RAID 5 12 TB, RAID 10 ise 8 TB kullanılabilir alan verir. Bu rehberde seviyelerin farkını, formülleri, NAS seçimini ve RAID'in neden yedek yerine geçmediğini bulacaksınız.",
  kisaCevap: [
    "RAID 0 (şeritleme): en az 2 disk, kapasite n × disk, arıza toleransı yok; bir disk bozulursa tüm veri gider.",
    "RAID 1 (aynalama): en az 2 disk, kapasite tek disk kadar, en az bir disk arızasına dayanır.",
    "RAID 5 (dağıtık eşlik): en az 3 disk, kapasite (n − 1) × disk, tek disk arızasına dayanır.",
    "RAID 6 (çift eşlik): en az 4 disk, kapasite (n − 2) × disk, aynı anda iki disk arızasına dayanır.",
    "RAID 10 (ayna + şerit): en az 4 ve çift sayıda disk, kapasite n ÷ 2 × disk, her ayna çiftinden birer disk arızasına dayanır.",
    "RAID yedekleme değildir: silinen dosyayı, fidye yazılımını ve cihaz kaybını kurtarmaz."
  ],
  figure: {
    alt: "Dört adet 4 TB diskle RAID 0, RAID 1, RAID 5, RAID 6 ve RAID 10 seviyelerinde kullanılabilir kapasite ve yedekliğe ayrılan alanı gösteren yatay çubuk grafik; her satırın sağında dayanabildiği disk arızası sayısı.",
    caption: "Aynı dört disk (toplam 16 TB ham alan) farklı RAID seviyelerinde farklı kullanılabilir kapasite verir. Koyu bölüm veriye, açık bölüm yedekliğe ayrılan alandır. Kapasite arttıkça arıza toleransı azalır.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">4 × 4 TB disk: hangi RAID ne kadar alan verir?</text>
  <g class="sm">
    <text x="20" y="58" class="mu">Seviye</text>
    <text x="130" y="58" class="mu">Kullanılabilir alan (koyu) / yedeklik (açık) — 16 TB ham</text>
    <text x="700" y="58" class="mu end">Tolerans</text>
  </g>
  <text x="20" y="96" class="b">RAID 0</text>
  <rect x="130" y="76" width="440" height="30" rx="4" class="p"/>
  <text x="350" y="97" class="mid b sf">16 TB</text>
  <text x="700" y="97" class="end b dg">0 disk</text>
  <text x="20" y="156" class="b">RAID 1</text>
  <rect x="130" y="136" width="110" height="30" rx="4" class="p"/>
  <rect x="240" y="136" width="330" height="30" rx="4" class="ps"/>
  <text x="185" y="157" class="mid b sf">4 TB</text>
  <text x="405" y="157" class="mid sm">12 TB kopya</text>
  <text x="700" y="157" class="end b ok">3 disk</text>
  <text x="20" y="216" class="b">RAID 5</text>
  <rect x="130" y="196" width="330" height="30" rx="4" class="p"/>
  <rect x="460" y="196" width="110" height="30" rx="4" class="ps"/>
  <text x="295" y="217" class="mid b sf">12 TB</text>
  <text x="515" y="217" class="mid sm">eşlik</text>
  <text x="700" y="217" class="end b">1 disk</text>
  <text x="20" y="276" class="b">RAID 6</text>
  <rect x="130" y="256" width="220" height="30" rx="4" class="p"/>
  <rect x="350" y="256" width="220" height="30" rx="4" class="ps"/>
  <text x="240" y="277" class="mid b sf">8 TB</text>
  <text x="460" y="277" class="mid sm">çift eşlik</text>
  <text x="700" y="277" class="end b ok">2 disk</text>
  <text x="20" y="336" class="b">RAID 10</text>
  <rect x="130" y="316" width="220" height="30" rx="4" class="p"/>
  <rect x="350" y="316" width="220" height="30" rx="4" class="ps"/>
  <text x="240" y="337" class="mid b sf">8 TB</text>
  <text x="460" y="337" class="mid sm">ayna</text>
  <text x="700" y="337" class="end b">1–2 disk</text>
  <rect x="20" y="364" width="680" height="52" rx="8" class="sf sb"/>
  <text x="36" y="386" class="b">RAID 5: (4 − 1) × 4 TB = 12 TB</text>
  <text x="36" y="406" class="sm t2">İşletim sisteminde: 12 × 10¹² ÷ 2⁴⁰ ≈ 10,91 TiB görünür</text>
</svg>`
  },
  sections: [
    {
      h: "RAID nedir?",
      p: [
        "RAID (Redundant Array of Independent Disks, bağımsız disklerden oluşan yedekli dizi), iki ya da daha fazla fiziksel diski bir denetleyici yardımıyla tek bir mantıksal disk gibi kullanmaktır. İşletim sistemi tek bir sürücü görür; verinin hangi diske nasıl yazılacağına RAID denetleyicisi ya da yazılımı karar verir.",
        "RAID üç temel tekniğin birleşimidir. <strong>Şeritleme</strong> (striping) veriyi parçalara bölüp disklere sırayla dağıtır ve okuma-yazma hızını artırır. <strong>Aynalama</strong> (mirroring) aynı veriyi birden fazla diske birebir yazar. <strong>Eşlik</strong> (parity) ise verinin matematiksel bir özetini saklar; bir disk kaybolduğunda eksik veri bu özetten yeniden hesaplanır.",
        "RAID donanım (ayrı bir kart ya da anakart denetleyicisi) ya da yazılım (işletim sistemi veya NAS yazılımı) ile kurulabilir. Ev ve küçük ofis NAS cihazlarında yazılım RAID yaygındır ve günümüz işlemcilerinde performans farkı çoğu iş için hissedilmez."
      ]
    },
    {
      h: "RAID 0 ve RAID 1 arasındaki fark nedir?",
      p: [
        "<strong>RAID 0</strong> yalnızca şeritleme yapar. Bir dosyanın ilk parçası birinci diske, ikinci parçası ikinci diske yazılır. İki disk aynı anda çalıştığı için sıralı okuma ve yazma hızı teorik olarak disk sayısıyla artar ve kapasitenin tamamı kullanılabilir. Bedeli ağırdır: dizideki herhangi bir disk bozulduğunda her dosyanın bir parçası kaybolur ve <strong>tüm veri</strong> kullanılamaz hâle gelir. İki diskli bir RAID 0'ın arıza riski tek diskin yaklaşık iki katıdır.",
        "<strong>RAID 1</strong> aynalama yapar. İki diskin her biri verinin tam kopyasını tutar. Disklerden biri bozulursa sistem diğeriyle çalışmaya devam eder; bozuk disk değiştirildiğinde kopya yeniden oluşturulur. Kullanılabilir kapasite tek bir diskinkiyle sınırlıdır ve yazma hızı artmaz, okuma ise bazı denetleyicilerde hızlanabilir.",
        "Kısacası RAID 0 \"hız ve alan, sıfır güvenlik\", RAID 1 \"güvenlik, yarı alan\" demektir. Video kurgusunda geçici çalışma alanı gibi kaybedilse de yeniden üretilebilen veriler için RAID 0, muhasebe dosyaları ve belge arşivi gibi kaybı kabul edilemeyen veriler için RAID 1 düşünülür."
      ]
    },
    {
      h: "RAID 5, RAID 6 ve RAID 10 nasıl çalışır?",
      p: [
        "<strong>RAID 5</strong> veriyi şeritler ve her şerit için bir eşlik bloğu hesaplar; eşlik blokları tek diske değil tüm disklere dağıtılır. Eşlik, diğer blokların XOR işlemiyle bulunur. Bir disk bozulduğunda kalan blokların XOR'u eksik bloğu verir. Bu yüzden RAID 5 en az <strong>3 disk</strong> ister, bir disklik alanı eşliğe ayırır ve tek disk arızasına dayanır.",
        "<strong>RAID 6</strong> aynı mantığı iki farklı eşlikle uygular; en az 4 disk ister, iki disklik alanı yedekliğe ayırır ve aynı anda iki diskin bozulmasına dayanır. Büyük kapasiteli disklerde yeniden oluşturma (rebuild) günler sürebildiği için bu süreçte ikinci bir arızaya karşı RAID 6 daha güvenlidir.",
        "<strong>RAID 10</strong> (1+0), diskleri önce ikişerli ayna çiftlerine ayırır, sonra bu çiftleri şeritler. En az 4 ve çift sayıda disk gerekir; kapasitenin yarısı kullanılır. Eşlik hesabı olmadığı için yazma performansı yüksektir ve yeniden oluşturma yalnızca bozulan diskin eşini kopyalamak olduğundan hızlıdır. Her ayna çiftinden bir disk bozulabilir; ancak aynı çiftin iki diski birden giderse veri kaybolur."
      ]
    },
    {
      h: "RAID kapasitesi nasıl hesaplanır?",
      p: [
        "Kullanılabilir kapasite, eşit boyutlu diskler için aşağıdaki basit formüllerle bulunur. Formüllerde n disk sayısı, C tek diskin kapasitesidir."
      ],
      formula: "RAID 0  = n × C\nRAID 1  = C\nRAID 5  = (n − 1) × C\nRAID 6  = (n − 2) × C\nRAID 10 = (n ÷ 2) × C",
      table: {
        head: ["Seviye", "En az disk", "4 × 4 TB ile kapasite", "Verim", "Dayanabildiği arıza", "Yazma performansı"],
        rows: [
          ["RAID 0", "2", "16 TB", "%100", "Yok", "Çok yüksek"],
          ["RAID 1", "2", "4 TB", "%25 (4 disk ayna)", "3 disk", "Tek disk kadar"],
          ["RAID 5", "3", "12 TB", "%75", "1 disk", "Orta (eşlik hesabı)"],
          ["RAID 6", "4", "8 TB", "%50", "2 disk", "Düşük-orta"],
          ["RAID 10", "4 (çift)", "8 TB", "%50", "1 garanti, en çok 2", "Yüksek"]
        ],
        caption: "RAID 1'in verimi iki diskte %50'dir; dört diskin hepsini aynalamak verimi %25'e düşürür. Pratikte dört diskle RAID 1 yerine RAID 10 ya da RAID 6 tercih edilir."
      },
      after: [
        "Çözümlü örnek: Beş adet 8 TB diskle RAID 5 kurarsanız (5 − 1) × 8 = 32 TB kullanılabilir alan elde edersiniz; yedekliğe 8 TB gider ve kapasite verimi 32 ÷ 40 = %80 olur. Aynı disklerle RAID 6 kurarsanız (5 − 2) × 8 = 24 TB alan, %60 verim ve iki disk toleransı elde edersiniz."
      ]
    },
    {
      h: "Neden 4 TB disk 3,6 TB görünür?",
      p: [
        "Disk üreticileri kapasiteyi ondalık sistemle verir: 1 TB = 10<sup>12</sup> bayt. Windows ve birçok NAS arayüzü ise ikili sistemle (1 TiB = 2<sup>40</sup> bayt) hesaplar ama yine \"TB\" yazar. 4 × 10<sup>12</sup> ÷ 1.099.511.627.776 ≈ <strong>3,64</strong> olduğu için 4 TB'lık disk yaklaşık 3,6 TB görünür. Disk eksik değildir, yalnızca birim farklıdır.",
        "RAID dizisinde de aynı fark geçerlidir: 12 TB'lık bir RAID 5 birimi arayüzde yaklaşık 10,9 TB görünür. Bunun üzerine dosya sistemi yapıları ve NAS'ın sistem bölümü de birkaç yüz GB yer kaplar. Birimler arasındaki farkın ayrıntısı [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısında anlatılıyor; hızlı dönüşüm için [[arac:gib-gb-cevir|GiB GB çevirici]] ve [[arac:gb-tb-cevir|GB TB çevirici]] işinizi görür."
      ]
    },
    {
      h: "Farklı boyutta disklerle RAID kurulur mu?",
      p: [
        "Klasik RAID'de dizideki her disk, <strong>en küçük disk kadar</strong> kullanılır. 2 TB, 4 TB ve 4 TB'lık üç diskle RAID 5 kurarsanız her disk 2 TB sayılır ve kullanılabilir alan (3 − 1) × 2 = 4 TB olur; büyük disklerdeki 4 TB boşa gider. Bu yüzden dizi kurarken aynı kapasitede, mümkünse aynı sınıfta diskler seçmek gerekir.",
        "Bazı NAS yazılımları farklı boyutlu diskleri bölümlere ayırarak daha verimli kullanan esnek RAID türleri sunar. Bu yöntemler kullanışlıdır ama klasik seviyelerden farklı çalışır; kapasite ve tolerans değerlerini cihazınızın kendi hesaplayıcısından doğrulamanız gerekir.",
        "Arızalanan bir diski değiştirirken yeni diskin kapasitesi eskisinden küçük olmamalıdır. Aynı etiketli iki disk bile birkaç MB farklı olabildiği için çok az daha büyük bir disk seçmek güvenli tercihtir."
      ]
    },
    {
      h: "NAS cihazında hangi RAID seçilmeli?",
      table: {
        head: ["Durum", "Önerilen seviye", "Gerekçe"],
        rows: [
          ["2 diskli ev ya da ofis NAS'ı", "RAID 1", "Tek seçenek olan yedekli yapı; bir disk bozulursa çalışmaya devam eder"],
          ["3–4 diskli, kapasite öncelikli", "RAID 5", "Bir disk kaybıyla en yüksek kullanılabilir alan"],
          ["4+ diskli, büyük (8 TB üstü) diskler", "RAID 6", "Uzun yeniden oluşturma sırasında ikinci arızaya karşı koruma"],
          ["Sanal makine, veritabanı, yoğun yazma", "RAID 10", "Yüksek yazma performansı ve hızlı yeniden oluşturma"],
          ["Geçici, yeniden üretilebilir veri", "RAID 0", "Yalnızca hız; kaybı tolere edilebilecek veriler için"],
          ["Güvenlik kamerası kayıt cihazı", "RAID 5 ya da tek disk + yedek", "Sürekli yazma; kapasite ve maliyet dengesi"]
        ]
      },
      after: [
        "Kamera kayıt cihazı için toplam disk ihtiyacını önce hesaplamak, RAID seviyesini seçmeyi kolaylaştırır; bunun için [[bilgi:guvenlik-kamerasi-kac-gun-kayit-yapar|güvenlik kamerası kayıt süresi]] yazısına bakabilirsiniz. Kendi disk sayınız ve kapasitenizle tüm seviyeleri karşılaştırmak için [[arac:raid-kapasite-hesapla|RAID Kapasitesi Hesaplama]] aracını kullanın; araç kullanılabilir alanı, yedekliğe giden alanı, işletim sisteminde görünecek TiB değerini ve arıza toleransını birlikte gösterir."
      ]
    },
    {
      h: "RAID yedekleme yerine geçer mi?",
      p: [
        "Hayır. RAID'in tek görevi, bir ya da iki diskin <strong>fiziksel olarak</strong> bozulması durumunda sistemin çalışmaya devam etmesidir. Bir dosyayı yanlışlıkla silerseniz, fidye yazılımı verileri şifrelerse ya da bir yazılım hatası dosyayı bozarsa bu değişiklik anında tüm disklere yazılır. Ayna da eşlik de bozulmuş veriyi sadakatle korur.",
        "Yangın, su baskını, hırsızlık, elektrik dalgalanması ya da NAS cihazının kendisinin arızalanması da RAID'in koruma alanı dışındadır. Yaygın kabul gören <strong>3-2-1 kuralı</strong>; verinin en az 3 kopyasının, 2 farklı ortamda ve en az 1'inin başka bir konumda tutulmasını önerir. RAID'li NAS bu kopyalardan yalnızca biridir; harici disk ve uzak konumdaki ya da bulut yedeği tamamlayıcıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Aynı partiden diskler:</strong> Aynı gün üretilmiş ve aynı yükle çalışan diskler benzer zamanlarda yıpranabilir; mümkünse farklı partilerden alın.",
        "<strong>Uyarıyı görmezden gelmek:</strong> RAID 5'te bir disk bozulduğunda dizi \"bozulmuş\" (degraded) durumda çalışır ve artık hiçbir korumanız yoktur. Diski hemen değiştirin.",
        "<strong>Masaüstü disk kullanmak:</strong> 7/24 çalışan NAS'larda bu kullanım için tasarlanmış diskler titreşim ve hata kurtarma süresi açısından daha uygundur.",
        "<strong>Yeniden oluşturma sırasında yük bindirmek:</strong> Rebuild sürerken büyük kopyalama işleri hem süreyi uzatır hem de ikinci arıza riskini artırır.",
        "<strong>RAID'i yedek sanmak:</strong> En pahalı hata budur; ayrı bir yedek planı mutlaka yapın."
      ]
    }
  ],
  faq: [
    ["RAID nedir?", "RAID, birden fazla fiziksel diski tek bir mantıksal disk gibi çalıştırarak hız, kapasite ya da arıza toleransı sağlayan depolama yöntemidir. Şeritleme, aynalama ve eşlik tekniklerinin farklı birleşimleri RAID 0, 1, 5, 6 ve 10 seviyelerini oluşturur."],
    ["RAID 0 ve RAID 1 arasındaki fark nedir?", "RAID 0 veriyi disklere bölerek hız ve tam kapasite sağlar ama hiçbir koruma sunmaz; tek disk arızası tüm veriyi yok eder. RAID 1 her diske verinin tam kopyasını yazar, kapasite tek disk kadardır ama bir disk bozulduğunda veri korunur."],
    ["RAID 5 kaç disk ister?", "RAID 5 en az 3 disk ister. Kullanılabilir kapasite disk sayısının bir eksiği ile tek disk kapasitesinin çarpımıdır; örneğin 3 adet 4 TB disk 8 TB, 4 adet 4 TB disk 12 TB kullanılabilir alan verir."],
    ["RAID 10 kullanılabilir kapasitesi nasıl hesaplanır?", "RAID 10'da kapasite disk sayısının yarısı ile tek disk kapasitesinin çarpımıdır. Dört adet 4 TB diskle 8 TB, altı adet 4 TB diskle 12 TB kullanılabilir alan elde edilir; disk sayısı çift olmalıdır."],
    ["NAS cihazında hangi RAID seçilmeli?", "İki diskli NAS'ta RAID 1, üç dört diskli ve kapasite öncelikli kullanımda RAID 5, büyük disklerle dört ve üzeri yuvada RAID 6, yoğun yazma gerektiren işlerde RAID 10 yaygın tercihtir. Hangisini seçerseniz seçin ayrı bir yedek gerekir."],
    ["RAID yedekleme yerine geçer mi?", "Geçmez. RAID yalnızca disk arızasına karşı sistemi çalışır tutar; silinen dosyayı, fidye yazılımını, yangın ya da hırsızlık gibi olayları kurtarmaz. Verinin ayrı bir ortamda ve başka bir konumda yedeği bulunmalıdır."],
    ["Neden 4 TB disk 3,6 TB görünür?", "Üretici 1 TB'ı 10 üzeri 12 bayt sayar, işletim sistemi ise 2 üzeri 40 bayt olan TiB ile hesaplar ama TB yazar. 4 TB bu yüzden yaklaşık 3,64 TiB görünür; diskte eksik alan yoktur."],
    ["Farklı boyutta disklerle RAID kurulur mu?", "Kurulabilir, ancak klasik RAID'de her disk dizideki en küçük disk kadar kullanılır ve büyük disklerin fazla alanı boşa gider. Bazı NAS yazılımlarının esnek RAID türleri bu kaybı azaltır."],
    ["RAID 5 mi RAID 6 mı daha güvenli?", "RAID 6 daha güvenlidir çünkü aynı anda iki disk arızasına dayanır. Büyük kapasiteli disklerde yeniden oluşturma uzun sürdüğü için bu süreçte ikinci bir arıza riski RAID 5'i zayıflatır; bedeli bir disk daha az kullanılabilir alandır."]
  ],
  tools: ["raid-kapasite-hesapla", "gb-tb-cevir", "gib-gb-cevir"],
  related: ["gb-kac-mb-veri-birimleri", "guvenlik-kamerasi-kac-gun-kayit-yapar"],
  sources: [
    ["SNIA – Ortak RAID Disk Veri Biçimi (DDF) belirtimi", "https://www.snia.org/"]
  ]
};
