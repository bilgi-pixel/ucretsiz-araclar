export default {
  slug: "gb-kac-mb-veri-birimleri",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "1 GB Kaç MB? Bit, Bayt, KB, MB, GB ve TB Veri Birimleri",
  pageTitle: "1 GB Kaç MB? Veri Birimleri: Bit, Bayt, KB, MB, GB, TB",
  description: "1 GB kaç MB, 1 TB kaç GB, 1 bayt kaç bit? 1000 ile 1024 farkı, 1 TB diskin neden 931 GB göründüğü, Mbps ile MB/s farkı ve örnek hesaplar.",
  keywords: ["1 gb kaç mb", "1 tb kaç gb", "1 mb kaç kb", "1 bayt kaç bit", "veri birimleri", "gb mb kb sıralaması", "1 tb disk neden 931 gb", "gib ile gb farkı", "mbps mb/s farkı"],
  lead: "1 GB, ondalık (SI) sisteme göre <strong>1.000 MB</strong>, ikili sisteme göre <strong>1.024 MiB</strong> eder; ikisi de doğrudur ama farklı şeyleri ölçer. Disk ve telefon üreticileri 1.000 tabanını, Windows ise dosya boyutlarını gösterirken 1.024 tabanını kullanır. Bu yüzden kutusunda 1 TB yazan disk bilgisayarda yaklaşık 931 GB görünür. Bu sayfada bit ve bayttan terabayta kadar tüm birimleri, iki sistemin farkını, internet hızındaki Mbps ile MB/s karışıklığını ve günlük hayattan çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "1 bayt = 8 bit; bilgisayardaki en küçük adreslenebilir birim bayttır.",
    "Ondalık sistemde her basamak 1.000 katıdır: 1 KB = 1.000 B, 1 MB = 1.000 KB, 1 GB = 1.000 MB, 1 TB = 1.000 GB.",
    "İkili sistemde her basamak 1.024 katıdır ve adları KiB, MiB, GiB, TiB'dir: 1 GiB = 1.024 MiB = 1.073.741.824 bayt.",
    "1 TB disk = 1.000.000.000.000 bayt; bu da yaklaşık 931,3 GiB eder, Windows bunu \"931 GB\" diye gösterir.",
    "İnternet hızı bit ile (Mbps), dosya boyutu bayt ile (MB) ölçülür: 100 Mbps hat saniyede en fazla 12,5 MB indirir."
  ],
  figure: {
    alt: "Veri birimleri merdiveni: bit, bayt, KB, MB, GB ve TB; ondalık sistemde her basamak 1000, ikili sistemde 1024 kat. Alt kısımda 1 TB diskin Windows'ta 931 GB görünmesi.",
    caption: "Birimler soldan sağa büyür. Üst sıra üreticilerin kullandığı ondalık (×1.000), alt sıra işletim sistemlerinin kullandığı ikili (×1.024) sistemdir. Aradaki fark büyüdükçe artar: TB düzeyinde yaklaşık %9'a ulaşır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Veri birimleri merdiveni</text>
  <g>
    <rect x="20" y="58" width="96" height="60" rx="8" class="ps"/>
    <text x="68" y="86" class="b lg mid">bit</text><text x="68" y="106" class="sm mid mu">0 ya da 1</text>
    <rect x="136" y="58" width="96" height="60" rx="8" class="p"/>
    <text x="184" y="86" class="b lg mid sf">bayt</text><text x="184" y="106" class="sm mid sf">8 bit</text>
    <rect x="252" y="58" width="96" height="60" rx="8" class="sf sb"/><text x="300" y="94" class="b lg mid">KB</text>
    <rect x="368" y="58" width="96" height="60" rx="8" class="sf sb"/><text x="416" y="94" class="b lg mid">MB</text>
    <rect x="484" y="58" width="96" height="60" rx="8" class="sf sb"/><text x="532" y="94" class="b lg mid">GB</text>
    <rect x="600" y="58" width="100" height="60" rx="8" class="sf sb"/><text x="650" y="94" class="b lg mid">TB</text>
  </g>
  <g class="sm mid">
    <text x="126" y="140" class="p b">×8</text>
    <text x="242" y="140" class="p b">×1.000</text><text x="358" y="140" class="p b">×1.000</text>
    <text x="474" y="140" class="p b">×1.000</text><text x="590" y="140" class="p b">×1.000</text>
  </g>
  <text x="20" y="176" class="b">Ondalık (SI): disk, telefon, internet paketi</text>
  <text x="20" y="200" class="sm t2">1 GB = 1.000.000.000 bayt · 1 TB = 1.000.000.000.000 bayt</text>
  <line x1="20" y1="218" x2="700" y2="218" class="sb dash" fill="none"/>
  <text x="20" y="246" class="b">İkili (IEC): Windows dosya boyutları, RAM</text>
  <g class="sm mid">
    <rect x="252" y="258" width="96" height="36" rx="6" class="oks"/><text x="300" y="281" class="b">KiB</text>
    <rect x="368" y="258" width="96" height="36" rx="6" class="oks"/><text x="416" y="281" class="b">MiB</text>
    <rect x="484" y="258" width="96" height="36" rx="6" class="oks"/><text x="532" y="281" class="b">GiB</text>
    <rect x="600" y="258" width="100" height="36" rx="6" class="oks"/><text x="650" y="281" class="b">TiB</text>
    <text x="358" y="312" class="ok b">×1.024</text><text x="474" y="312" class="ok b">×1.024</text><text x="590" y="312" class="ok b">×1.024</text>
  </g>
  <rect x="20" y="330" width="680" height="54" rx="8" class="sf sb"/>
  <rect x="20" y="330" width="8" height="54" class="p"/>
  <text x="44" y="352" class="b">Örnek: kutuda "1 TB" yazan disk</text>
  <text x="44" y="373" class="sm t2">1.000.000.000.000 ÷ 1.073.741.824 = 931,32 → Windows'ta "931 GB" görünür, eksik alan yoktur.</text>
</svg>`
  },
  sections: [
    {
      h: "Bit ve bayt nedir?",
      p: [
        "<strong>Bit</strong> (binary digit, ikili basamak) bilgisayarın tuttuğu en küçük bilgidir ve yalnızca iki değer alır: 0 ya da 1. Bir anahtarın açık ya da kapalı olması, bir soruya evet ya da hayır cevabı tek bitle ifade edilebilir. Tek bir bit tek başına pek bir şey anlatmaz; anlamlı bilgi bitlerin yan yana dizilmesiyle oluşur.",
        "<strong>Bayt</strong> (byte) 8 bitin bir araya gelmesidir ve 2<sup>8</sup> = 256 farklı değer alabilir. Bu, İngiliz alfabesindeki bir harfi, bir rakamı ya da noktalama işaretini saklamaya yeter; bu yüzden bayt yıllardır \"bir karakterlik yer\" olarak düşünülür. Dosya boyutları, disk kapasiteleri ve bellek miktarları her zaman bayt ve katlarıyla ifade edilir.",
        "Kısaltmalarda büyük-küçük harf fark yaratır: <strong>B</strong> (büyük harf) bayt, <strong>b</strong> (küçük harf) bit demektir. \"100 Mb\" ile \"100 MB\" arasında tam 8 kat fark vardır. Bu küçük ayrıntı, internet hızı ile dosya boyutunu karşılaştırırken yapılan hataların en büyük kaynağıdır."
      ]
    },
    {
      h: "KB, MB, GB, TB sıralaması ve değerleri",
      p: [
        "Bayttan sonraki birimler, Uluslararası Birimler Sistemi'nin (SI) bildiğimiz önekleriyle adlandırılır: kilo bin, mega milyon, giga milyar, tera trilyon demektir. Ondalık sistemde her basamak bir öncekinin tam 1.000 katıdır. Küçükten büyüğe sıralama şöyledir: bit, bayt, kilobayt (KB), megabayt (MB), gigabayt (GB), terabayt (TB), petabayt (PB), eksabayt (EB)."
      ],
      table: {
        head: ["Birim", "Kısaltma", "Ondalık değer (bayt)", "Bir alt birim cinsinden"],
        rows: [
          ["Bayt", "B", "1", "8 bit"],
          ["Kilobayt", "KB", "1.000", "1.000 B"],
          ["Megabayt", "MB", "1.000.000", "1.000 KB"],
          ["Gigabayt", "GB", "1.000.000.000", "1.000 MB"],
          ["Terabayt", "TB", "1.000.000.000.000", "1.000 GB"],
          ["Petabayt", "PB", "10<sup>15</sup>", "1.000 TB"],
          ["Eksabayt", "EB", "10<sup>18</sup>", "1.000 PB"]
        ]
      },
      after: [
        "Günlük kullanımda karşılaşacağınız birimler genellikle KB ile TB arasındadır. Bir metin belgesi birkaç KB, bir telefon fotoğrafı birkaç MB, bir film birkaç GB, bir harici disk ise genellikle 1 ile 5 TB arasındadır. Petabayt ve üstü veri merkezlerinin ve bulut servislerinin ölçeğidir."
      ]
    },
    {
      h: "1000 mi 1024 mü? İki sistemin farkı",
      p: [
        "Bilgisayarlar ikili sistemle çalıştığı için bellek ve adresler doğal olarak 2'nin kuvvetleriyle büyür. 2<sup>10</sup> = 1.024 sayısı 1.000'e çok yakın olduğu için uzun yıllar \"1 KB = 1.024 bayt\" kabul edildi. Sorun, aynı kısaltmanın hem 1.000 hem 1.024 anlamında kullanılmasıydı.",
        "Bu karışıklığı çözmek için Uluslararası Elektroteknik Komisyonu (IEC) ikili katlara ayrı adlar verdi: <strong>kibibayt (KiB)</strong>, <strong>mebibayt (MiB)</strong>, <strong>gibibayt (GiB)</strong>, <strong>tebibayt (TiB)</strong>. Bu standarda göre KB, MB, GB her zaman 1.000 tabanlıdır; 1.024 tabanlı değerler için \"bi\" hecesi eklenir."
      ],
      table: {
        head: ["Ondalık birim", "Bayt", "İkili birim", "Bayt", "Fark"],
        rows: [
          ["1 KB", "1.000", "1 KiB", "1.024", "%2,4"],
          ["1 MB", "1.000.000", "1 MiB", "1.048.576", "%4,9"],
          ["1 GB", "1.000.000.000", "1 GiB", "1.073.741.824", "%7,4"],
          ["1 TB", "1.000.000.000.000", "1 TiB", "1.099.511.627.776", "%10,0"]
        ],
        caption: "Fark sütunu, ikili birimin ondalık birimden yüzde kaç büyük olduğunu gösterir; birim büyüdükçe fark artar."
      },
      after: [
        "Pratikte disk, USB bellek, hafıza kartı ve telefon üreticileri ondalık sistemi kullanır. Windows dosya ve disk boyutlarını 1.024 tabanıyla hesaplar ama ekranda yine \"KB, MB, GB\" yazar. macOS ve birçok Linux dağıtımının dosya yöneticisi ise ondalık sistemi kullanır; aynı dosya bu yüzden iki bilgisayarda farklı boyutta görünebilir. RAM ise neredeyse her zaman ikili katlarla üretilir: \"16 GB\" bellek aslında 16 GiB'tır."
      ]
    },
    {
      h: "1 TB disk neden 931 GB görünüyor? Çözümlü örnekler",
      p: [
        "Yeni aldığınız diskin kapasitesi eksik görünüyorsa büyük olasılıkla bir şey eksik değildir; yalnızca birimler farklıdır. Hesap basittir: üreticinin bayt cinsinden kapasitesini 1.024<sup>3</sup> = 1.073.741.824'e bölerseniz Windows'un göstereceği \"GB\" değerini bulursunuz."
      ],
      formula: "Windows'ta görünen GB = üretici GB × 1.000.000.000 ÷ 1.073.741.824\nKısaca: görünen GB ≈ üretici GB × 0,9313",
      table: {
        head: ["Kutudaki kapasite", "Bayt", "Windows'ta görünen (yaklaşık)"],
        rows: [
          ["64 GB", "64.000.000.000", "59,6 GB"],
          ["128 GB", "128.000.000.000", "119,2 GB"],
          ["256 GB", "256.000.000.000", "238,4 GB"],
          ["500 GB", "500.000.000.000", "465,7 GB"],
          ["1 TB", "1.000.000.000.000", "931,3 GB"],
          ["2 TB", "2.000.000.000.000", "1,82 TB"]
        ]
      },
      after: [
        "Örnek: 500 GB'lık bir disk için 500.000.000.000 ÷ 1.073.741.824 = 465,66 sonucunu bulursunuz. Windows bu diski yaklaşık 465 GB olarak gösterir. Aradaki 34 GB'lık fark bir hata ya da gizli dosya değildir; aynı miktarın farklı birimle yazılmasıdır.",
        "Telefon ve bilgisayarlarda bundan ayrı olarak işletim sistemi, kurtarma bölümü ve önceden yüklü uygulamalar da yer kaplar. 128 GB'lık bir telefonda kullanılabilir alanın 100 GB'ın altında görünmesi bu iki etkinin toplamıdır."
      ]
    },
    {
      h: "Mbps ile MB/s farkı: internet hızı ve indirme süresi",
      p: [
        "İnternet servis sağlayıcıları hızı saniyede megabit (<strong>Mbps</strong>), tarayıcılar ve indirme programları ise genellikle saniyede megabayt (<strong>MB/s</strong>) olarak gösterir. 1 bayt 8 bit olduğu için Mbps değerini 8'e bölmeniz gerekir. 100 Mbps'lik bir hat teorik olarak saniyede en fazla 12,5 MB veri indirir; 50 Mbps için bu değer 6,25 MB/s, 1.000 Mbps (1 Gbps) için 125 MB/s'dir."
      ],
      formula: "MB/s = Mbps ÷ 8\nİndirme süresi (sn) = dosya boyutu (MB) × 8 ÷ hız (Mbps)",
      ol: [
        "Dosya boyutunu MB cinsine çevirin: 4 GB'lık bir oyun güncellemesi 4.000 MB'tır.",
        "Bit cinsine geçmek için 8 ile çarpın: 4.000 × 8 = 32.000 megabit.",
        "Hat hızına bölün: 32.000 ÷ 100 Mbps = 320 saniye, yani yaklaşık 5 dakika 20 saniye.",
        "Gerçek hayatta Wi-Fi, sunucu hızı ve hat yoğunluğu nedeniyle süre genellikle bunun biraz üzerindedir; %10–30 pay bırakın."
      ],
      after: [
        "Bu hesabı elle yapmak yerine [[arac:indirme-suresi-hesapla|İndirme Süresi Hesaplama]] aracını, hız birimini çevirmek için [[arac:mbps-mbs-cevir|Mbps MB/sn Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "1 GB'a ne sığar? Günlük hayattan karşılaştırmalar",
      p: [
        "Bir dosyanın ne kadar yer kaplayacağı türüne, çözünürlüğüne ve sıkıştırma ayarına bağlıdır. Aşağıdaki tablo ortalama değerlerle yaklaşık bir fikir verir; kendi cihazınızdaki dosyaların gerçek boyutuna bakarak hesabı kişiselleştirebilirsiniz."
      ],
      table: {
        head: ["İçerik", "Ortalama boyut (örnek)", "1 GB'a yaklaşık kaç adet"],
        rows: [
          ["Düz metin sayfası", "2 KB", "500.000 sayfa"],
          ["Telefon fotoğrafı (JPEG)", "3 MB", "330 fotoğraf"],
          ["MP3 şarkı (320 kbps, 4 dk)", "9,6 MB", "100 şarkı"],
          ["Taranmış belge PDF'i (10 sayfa)", "2 MB", "500 belge"],
          ["1080p video (8 Mbps)", "60 MB/dakika", "yaklaşık 16 dakika"],
          ["4K video (40 Mbps)", "300 MB/dakika", "yaklaşık 3 dakika"]
        ],
        caption: "Video boyutu bit hızından hesaplanır: 8 Mbps × 60 sn = 480 megabit = 60 MB. Değerler örnektir; cihaz ve uygulamaya göre değişir."
      },
      after: [
        "Mobil veri paketinizin kaç dakikalık video izlemeye yeteceğini merak ediyorsanız aynı mantığı kullanın: izlediğiniz kalitenin bit hızını 8'e bölüp 60 ile çarparak dakika başına MB değerini bulun, paket miktarınızı bu sayıya bölün. Video kaydının karta kaç dakika sığacağı için [[arac:video-boyutu-hesapla|Video Boyutu Hesaplama]] aracı işinizi görür."
      ]
    },
    {
      h: "Hangi durumda hangi sistemi kullanmalısınız?",
      p: [
        "Kural basittir: hesabı kimin rakamıyla karşılaştıracaksanız onun sistemini kullanın. Disk, USB bellek ya da hafıza kartı satın alırken ve mobil veri paketinizi hesaplarken ondalık sistem (×1.000) geçerlidir. Windows'taki bir dosyanın boyutunu, bir başvuru sistemindeki \"en fazla 2 MB\" sınırını ya da RAM miktarını düşünürken ikili sistem (×1.024) daha gerçekçi sonuç verir.",
        "Emin olmadığınız durumlarda küçük bir güvenlik payı bırakmak en pratik yoldur. Örneğin bir sistem 500 KB sınırı koyuyorsa dosyanızı 480 KB civarına indirmek, sınırın hangi sistemle denetlendiğinden bağımsız olarak kabul edilmesini sağlar. Yedekleme planlarken de diskin kutudaki değerinin yaklaşık %93'ünü gerçekten kullanabileceğinizi varsayın."
      ]
    },
    {
      h: "Birim çevirirken sık yapılan hatalar",
      ul: [
        "<strong>Bit ile baytı karıştırmak:</strong> \"100 Mb\" internet hızı, \"100 MB\" dosya boyutudur; aralarında 8 kat fark vardır.",
        "<strong>Her yerde 1.024 kullanmak:</strong> Disk kutusu, internet paketi ve üretici tabloları 1.000 tabanlıdır. 1.024 ile hesaplarsanız beklediğinizden küçük sonuç bulursunuz.",
        "<strong>Kaybolan alan sanmak:</strong> 1 TB diskin 931 GB görünmesi arıza değildir; birim farkıdır.",
        "<strong>Türkçe karakteri 1 bayt saymak:</strong> UTF-8 kodlamada İngiliz alfabesindeki harfler 1 bayt, ç, ğ, ı, İ, ö, ş, ü gibi harfler 2 bayt yer kaplar. Bir SMS ya da veritabanı alanı sınırı hesaplanırken bu fark önemlidir.",
        "<strong>Yuvarlamayı erken yapmak:</strong> Çok adımlı hesaplarda ara sonuçları yuvarlamak, büyük sayılarda birkaç GB'lık sapma yaratabilir. Yuvarlamayı en sona bırakın."
      ]
    },
    {
      h: "Ücretsiz araçlarla birim çevirme",
      p: [
        "Bilişim Ajans'ın çeviricileri tarayıcınızda çalışır; girdiğiniz değerler hiçbir sunucuya gönderilmez ve kayıt gerekmez. Hangi yönde çevireceğinize göre şu araçlardan birini seçebilirsiniz:"
      ],
      ul: [
        "[[arac:bit-bayt-cevir|Bit Bayt Çevirici]]: bit, bayt ve katları arasında çift yönlü dönüşüm.",
        "[[arac:kb-mb-cevir|KB MB çevirici]] ve [[arac:mb-gb-cevir|MB GB çevirici]]: fotoğraf ve belge boyutları için.",
        "[[arac:gb-tb-cevir|GB TB çevirici]]: disk ve yedekleme planlaması için.",
        "[[arac:gib-gb-cevir|GiB GB çevirici]]: Windows'ta görünen değerle kutudaki değeri karşılaştırmak için."
      ],
      after: [
        "Fotoğrafınızı e-Devlet ya da bir başvuru sistemi için belirli bir KB sınırına indirmeniz gerekiyorsa [[rehber:resim-kucultme-kb|resim küçültme rehberi]] adım adım yol gösterir."
      ]
    }
  ],
  faq: [
    ["1 GB kaç MB eder?", "Ondalık sisteme göre 1 GB tam 1.000 MB eder; disk, telefon ve internet paketlerinde bu değer kullanılır. İkili sistemde 1 GiB 1.024 MiB'tır ve Windows dosya boyutlarını bu sistemle hesaplar."],
    ["1 TB kaç GB eder?", "1 TB, ondalık sistemde 1.000 GB'tır. Aynı disk Windows'ta yaklaşık 931 GB görünür, çünkü Windows 1.024 tabanlı birimle hesaplar; kapasitede gerçek bir eksilme yoktur."],
    ["1 MB kaç KB eder?", "Ondalık sistemde 1 MB 1.000 KB'tır. 1.024 tabanlı hesapta 1 MiB 1.024 KiB eder. Başvuru sistemlerinde yazan KB sınırları genellikle ondalık değil ikili hesaba göre denetlenebilir, bu yüzden sınırın biraz altında kalmak güvenlidir."],
    ["1 bayt kaç bit eder?", "1 bayt 8 bittir. Bu kural iki sistemde de aynıdır; 1.000 ile 1.024 farkı yalnızca kilo ve üstü katlarda ortaya çıkar."],
    ["GB ile GiB arasındaki fark nedir?", "GB (gigabayt) 1.000.000.000 bayt, GiB (gibibayt) 1.073.741.824 bayttır. GiB yaklaşık %7,4 daha büyüktür. Üreticiler GB, Windows ve RAM üreticileri fiilen GiB kullanır ama çoğu zaman yine GB yazar."],
    ["100 Mbps internet saniyede kaç MB indirir?", "100 Mbps teorik olarak saniyede 12,5 MB eder, çünkü megabiti megabayta çevirmek için 8'e bölmek gerekir. Kablosuz bağlantı ve sunucu hızı nedeniyle pratikte 9–11 MB/s görmek normaldir."],
    ["KB, MB, GB, TB sıralaması nasıldır?", "Küçükten büyüğe sıralama bit, bayt, kilobayt (KB), megabayt (MB), gigabayt (GB), terabayt (TB), petabayt (PB) ve eksabayt (EB) şeklindedir. Her basamak bir öncekinin 1.000 katıdır."],
    ["128 GB telefonda neden daha az boş alan görünüyor?", "Birinci neden birim farkıdır: 128 GB yaklaşık 119 GiB eder. İkinci neden işletim sisteminin ve sistem uygulamalarının kapladığı alandır. İkisinin toplamı kullanılabilir alanı belirgin biçimde düşürür."],
    ["Çevirme araçlarına girdiğim değerler bir yere kaydediliyor mu?", "Hayır. Bilişim Ajans çeviricileri tamamen tarayıcınızda çalışır; girdiğiniz sayılar sunucuya gönderilmez, çerez ya da hesapla saklanmaz ve sayfayı kapattığınızda silinir."]
  ],
  tools: ["bit-bayt-cevir", "mb-gb-cevir", "gb-tb-cevir", "gib-gb-cevir", "mbps-mbs-cevir", "indirme-suresi-hesapla"],
  sources: [
    ["IEC – İkili önekler (kibi, mebi, gibi) standardı", "https://www.iec.ch/"],
    ["BIPM – SI önekleri (kilo, mega, giga, tera)", "https://www.bipm.org/en/measurement-units/si-prefixes"]
  ]
};
