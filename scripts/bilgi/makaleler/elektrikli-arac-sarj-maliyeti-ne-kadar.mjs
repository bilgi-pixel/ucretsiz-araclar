export default {
  slug: "elektrikli-arac-sarj-maliyeti-ne-kadar",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Elektrikli Araç Şarj Maliyeti Ne Kadar? 100 Km Maliyeti ve Şarj Süresi",
  pageTitle: "Elektrikli Araç Şarj Maliyeti: 100 Km Kaç TL, Şarj Kaç Saat?",
  description: "Şarj maliyeti = çekilen kWh × birim fiyat. Evde ve istasyonda şarj farkı, 100 km tüketimi, AC–DC şarj süresi, kışın menzil kaybı ve benzinliyle km başı karşılaştırma.",
  keywords: ["elektrikli araç şarj maliyeti", "elektrikli araba 100 km maliyeti", "evde şarj maliyeti", "hızlı şarj ücreti", "elektrikli araç menzili", "şarj süresi hesaplama", "ac dc şarj farkı", "batarya kwh nedir"],
  lead: "Elektrikli aracın şarj maliyeti, <strong>bataryaya giren enerji (kWh) ile kayıpların toplamının kWh birim fiyatıyla çarpımıdır</strong>. Örneğin 60 kWh bataryayı %20'den %80'e doldurmak 36 kWh enerji ister; evde örnek 3 TL/kWh tarifeyle yaklaşık 120 TL, örnek 12 TL/kWh hızlı şarj istasyonunda yaklaşık 455 TL tutar. 100 km'de 15–20 kWh harcayan bir aracın 100 km maliyeti de bu yüzden şarj yerine göre birkaç kat değişir. Aşağıda hesabın formülünü, şarj süresini, kış etkisini ve benzinli araçla karşılaştırmayı örnek tutarlarla anlatıyoruz.",
  kisaCevap: [
    "Şarj maliyeti = (bataryaya giren kWh ÷ şarj verimi) × kWh birim fiyatı.",
    "Binek elektrikli araçlar karma kullanımda genellikle 100 km'de 14–20 kWh enerji harcar.",
    "100 km maliyeti = 100 km tüketimi (kWh) × birim fiyat; 17 kWh ve örnek 3 TL/kWh ile yaklaşık 56 TL.",
    "Şarj süresi ≈ eklenecek enerji ÷ şarj gücü; 40 kWh, 11 kW AC ile yaklaşık 3,5–4 saat sürer.",
    "DC hızlı şarj %80'e kadar hızlıdır; sonrasında batarya korunsun diye güç belirgin biçimde düşer.",
    "Soğuk havada ısıtma ve batarya kimyası nedeniyle menzil %10–30 düşebilir. Tutarlar örnektir; güncel tarifeyi dağıtım şirketinizden ve istasyon işletmecisinden öğrenin."
  ],
  figure: {
    alt: "60 kWh bataryanın yüzde 20'den yüzde 80'e şarjı için üç senaryonun örnek maliyet çubukları: evde 3 TL/kWh ile 120 TL, AC istasyonda 8 TL/kWh ile 320 TL, DC hızlı şarjda 12 TL/kWh ile 455 TL; altta 100 km başına örnek maliyetler.",
    caption: "Aynı 36 kWh'lik şarj, nerede yapıldığına göre çok farklı tutar. Birim fiyatlar örnek tutardır; ev şarjında %10, DC şarjda %5 kayıp varsayılmıştır. Kendi tarifenizle hesaplamak için şarj maliyeti aracını kullanın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">60 kWh batarya, %20 → %80 (36 kWh)</text>
  <rect x="40" y="50" width="200" height="40" rx="8" class="sf sb"/>
  <rect x="40" y="50" width="40" height="40" rx="8" class="dgs"/>
  <rect x="80" y="50" width="120" height="40" class="oks"/>
  <rect x="240" y="60" width="10" height="20" rx="2" class="sf sb"/>
  <text x="60" y="76" class="sm mid">%20</text><text x="140" y="76" class="sm mid b">+36 kWh</text><text x="220" y="76" class="sm mid">%20</text>
  <text x="270" y="76" class="sm">Eklenen menzil ≈ 36 ÷ 17 × 100 ≈ 212 km</text>
  <text x="40" y="128" class="b">Örnek şarj maliyeti</text>
  <g>
    <text x="40" y="164" class="sm b">Evde (3 TL/kWh)</text>
    <rect x="200" y="148" width="98" height="26" rx="4" class="ok"/><text x="306" y="166" class="b">≈ 120 TL</text>
    <text x="40" y="206" class="sm b">AC istasyon (8 TL/kWh)</text>
    <rect x="200" y="190" width="262" height="26" rx="4" class="a"/><text x="470" y="208" class="b">≈ 320 TL</text>
    <text x="40" y="248" class="sm b">DC hızlı (12 TL/kWh)</text>
    <rect x="200" y="232" width="372" height="26" rx="4" class="p"/><text x="580" y="250" class="b">≈ 455 TL</text>
  </g>
  <line x1="40" y1="282" x2="680" y2="282" class="sb dash" fill="none"/>
  <text x="40" y="310" class="b">100 km başına (17 kWh/100 km)</text>
  <g class="mid">
    <rect x="40" y="324" width="150" height="70" rx="8" class="oks"/>
    <text x="115" y="350" class="sm">Ev</text><text x="115" y="376" class="lg b">≈ 57 TL</text>
    <rect x="206" y="324" width="150" height="70" rx="8" class="sf sb"/>
    <text x="281" y="350" class="sm">AC istasyon</text><text x="281" y="376" class="lg b">≈ 151 TL</text>
    <rect x="372" y="324" width="150" height="70" rx="8" class="ps"/>
    <text x="447" y="350" class="sm">DC hızlı</text><text x="447" y="376" class="lg b">≈ 215 TL</text>
    <rect x="538" y="324" width="142" height="70" rx="8" class="dgs"/>
    <text x="609" y="350" class="sm">Benzinli 7 L</text><text x="609" y="376" class="lg b">≈ 350 TL</text>
  </g>
  <text x="360" y="412" class="sm mid mu">Tüm fiyatlar örnek tutardır (benzin 50 TL/L varsayıldı).</text>
</svg>`
  },
  sections: [
    {
      h: "Batarya kapasitesi (kWh) ne anlama gelir?",
      p: [
        "Elektrikli aracın \"depo hacmi\" bataryasının enerji kapasitesidir ve <strong>kilovatsaat (kWh)</strong> ile ölçülür. 1 kWh, 1.000 vatlık bir cihazın bir saat boyunca çalışmasına yetecek enerjidir; elektrik faturanızdaki birimle aynıdır. Binek elektrikli araçlarda batarya kapasiteleri çoğunlukla 40 ile 100 kWh arasındadır.",
        "Üretici kataloglarında bazen iki kapasite görürsünüz: <strong>brüt</strong> ve <strong>net (kullanılabilir)</strong>. Batarya ömrünü korumak için yönetim sistemi en alttaki ve en üstteki birkaç yüzdeyi kullanıma kapatır. Maliyet ve menzil hesabında her zaman kullanılabilir kapasiteyi esas almalısınız; fark genellikle %5–10 civarındadır.",
        "Batarya kapasitesi tek başına menzili belirlemez. Aracın 100 km'de ne kadar enerji harcadığı (tüketim) en az kapasite kadar önemlidir. 60 kWh bataryalı ve 15 kWh/100 km tüketen bir araç yaklaşık 400 km giderken, aynı bataryayla 20 kWh/100 km tüketen bir araç 300 km'de kalır."
      ]
    },
    {
      h: "Şarj maliyeti nasıl hesaplanır? Formül",
      p: [
        "Şarj maliyetini doğru hesaplamanın püf noktası, prizden çekilen enerjinin bataryaya giren enerjiden biraz fazla olmasıdır. Şarj cihazında, kablolarda ve bataryanın ısıtılıp soğutulmasında enerji kaybolur. Evde AC şarjda bu kayıp genellikle %8–15, DC hızlı şarjda (sayaç cihazın çıkışında ölçtüğü için) kullanıcı açısından daha düşüktür."
      ],
      formula: "Bataryaya giren enerji (kWh) = kapasite × (hedef % − başlangıç %)\nÇekilen enerji (kWh) = bataryaya giren enerji ÷ şarj verimi\nŞarj maliyeti (TL) = çekilen enerji × kWh birim fiyatı\n100 km maliyeti (TL) = 100 km tüketimi ÷ verim × birim fiyat",
      ol: [
        "Bataryanızın kullanılabilir kapasitesini bulun: örnek 60 kWh.",
        "Doldurulacak aralığı belirleyin: %20'den %80'e, yani %60. 60 × 0,60 = 36 kWh bataryaya girecek.",
        "Kaybı ekleyin: evde %90 verimle 36 ÷ 0,90 = 40 kWh prizden çekilir.",
        "Birim fiyatla çarpın: örnek 3 TL/kWh ev tarifesiyle 40 × 3 = 120 TL.",
        "Aynı şarjı örnek 12 TL/kWh DC istasyonda yaparsanız %95 verimle 36 ÷ 0,95 = 37,9 kWh × 12 ≈ 455 TL ödersiniz."
      ],
      after: [
        "Bu hesabı kendi batarya ve tarife değerlerinizle [[arac:elektrikli-arac-sarj-maliyeti-hesapla|Elektrikli Araç Şarj Maliyeti Hesaplama]] aracında yapabilirsiniz; araç kazanılan menzili ve 100 km maliyetini de gösterir. Ev elektriğinin birim fiyatının vergi ve fonlarla nasıl oluştuğunu [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Evde ve istasyonda şarj maliyeti farkı",
      p: [
        "Maliyeti en çok belirleyen şey nerede şarj ettiğinizdir. Evdeki şarj, mesken tarifesindeki birim fiyatla ödenir; çok zamanlı (gece) tarifeye geçtiyseniz gece saatlerinde birim fiyat daha da düşebilir. Halka açık istasyonlar ise cihaz yatırımı, şebeke bağlantı bedeli ve işletme giderlerini fiyata yansıttığı için kWh başına daha pahalıdır; DC hızlı şarj genellikle en pahalı seçenektir.",
        "Türkiye'de istasyon fiyatları işletmeciye, cihazın gücüne ve bazı işletmecilerde üyelik paketine göre değişir. Ayrıca bazı istasyonlar şarj bittikten sonra aracı bekleten kullanıcılardan dakika bazlı ek ücret alabilir. Kesin tutar için kullandığınız işletmecinin güncel fiyat listesine bakın; aşağıdaki tablodaki değerler yalnızca hesap mantığını göstermek için seçilmiş örnek tutarlardır."
      ],
      table: {
        head: ["Şarj yeri", "Örnek birim fiyat", "Varsayılan verim", "36 kWh için örnek tutar", "100 km (17 kWh) örnek tutar"],
        rows: [
          ["Ev, tek zamanlı tarife", "3 TL/kWh", "%90", "≈ 120 TL", "≈ 57 TL"],
          ["Ev, gece tarifesi", "2 TL/kWh", "%90", "≈ 80 TL", "≈ 38 TL"],
          ["AC halka açık istasyon", "8 TL/kWh", "%90", "≈ 320 TL", "≈ 151 TL"],
          ["DC hızlı şarj", "12 TL/kWh", "%95", "≈ 455 TL", "≈ 215 TL"]
        ],
        caption: "Tüm birim fiyatlar örnek tutardır; gerçek tarifeler dönemsel olarak değişir. Güncel mesken tarifesi için dağıtım şirketinizin ve EPDK'nın duyurularına bakın."
      }
    },
    {
      h: "Elektrikli araç 100 km'de kaç kWh harcar?",
      p: [
        "Binek elektrikli otomobiller ılıman havada ve karma kullanımda genellikle 100 km'de 14–20 kWh enerji harcar. Küçük ve hafif şehir araçları alt sınıra, büyük SUV'lar ve yüksek performanslı modeller üst sınıra yakındır. Benzinli araçların aksine elektrikli araçlar <strong>şehir içinde daha verimlidir</strong>: düşük hızda hava direnci azdır ve frenlemede enerji geri kazanılır.",
        "Otoyolda ise tüketim belirgin artar, çünkü hava direnci hızın karesiyle büyür. 90 km/s'den 130 km/s'ye çıkmak tüketimi %30–40 artırabilir. Yük, yokuş, lastik basıncı, tavan bagajı ve klima kullanımı da tüketimi etkiler. Kendi tüketiminizi en doğru, aracın yol bilgisayarındaki uzun dönem ortalamasından öğrenirsiniz."
      ],
      formula: "Menzil (km) = kullanılabilir kapasite × şarj yüzdesi ÷ tüketim (kWh/100 km) × 100\nÖrnek: 60 kWh × %80 ÷ 17 × 100 ≈ 282 km",
      after: [
        "Şarj yüzdesine ve kış ya da otoyol payına göre menzil tahmini için [[arac:elektrikli-arac-menzil-hesapla|elektrikli araç menzil hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "AC ve DC şarj farkı, şarj süresi nasıl hesaplanır?",
      p: [
        "Batarya doğru akımla (DC) şarj olur. <strong>AC şarjda</strong> şebekeden gelen alternatif akım, aracın içindeki dahili şarj cihazında doğru akıma çevrilir; bu yüzden şarj hızı bu cihazın gücüyle sınırlıdır. Ev tipi duvar ünitelerinde monofaze bağlantıda tipik güç 7,4 kW (32 A × 230 V), trifaze bağlantıda 11 ya da 22 kW'tır. Normal bir prizden şarj ise yaklaşık 2–2,3 kW ile yapılır ve çok yavaştır.",
        "<strong>DC şarjda</strong> çevirme işi istasyondaki büyük cihazda yapılır ve enerji doğrudan bataryaya verilir. 50 kW'tan 300 kW'a kadar güçler mümkündür; ancak aracın kabul edebileceği en yüksek güç ve batarya sıcaklığı gerçek hızı belirler. Batarya %80'e yaklaştıkça şarj gücü korunmak için kademeli olarak düşer; %80'den %100'e çıkmak, %20'den %80'e çıkmak kadar sürebilir.",
        "Monofaze ve trifaze bağlantının farkı ev şarj ünitesi seçimini doğrudan etkiler; ayrıntıları [[bilgi:trifaze-ve-monofaze-farki|trifaze ve monofaze farkı]] yazısında bulabilirsiniz."
      ],
      formula: "Şarj süresi (saat) ≈ çekilecek enerji (kWh) ÷ şarj gücü (kW)\nÖrnek: 40 kWh ÷ 7,4 kW ≈ 5,4 saat · 40 kWh ÷ 11 kW ≈ 3,6 saat",
      table: {
        head: ["Şarj türü", "Tipik güç", "36 kWh eklemek için yaklaşık süre"],
        rows: [
          ["Normal priz", "2,3 kW", "17–18 saat"],
          ["Ev tipi ünite, monofaze", "7,4 kW", "5–6 saat"],
          ["Ev tipi ünite, trifaze", "11 kW", "3,5–4 saat"],
          ["AC istasyon", "22 kW", "2–2,5 saat (araç 22 kW kabul ediyorsa)"],
          ["DC hızlı şarj", "50–150 kW", "20–50 dakika (%20–80 aralığında)"]
        ],
        caption: "Süreler kayıplar dâhil yaklaşık değerlerdir; aracın dahili şarj cihazı 11 kW ise 22 kW'lık istasyonda da 11 kW ile şarj olur."
      },
      after: [
        "Kapasite, akım ve başlangıç-hedef doluluğuna göre süre hesabı için [[arac:sarj-suresi-hesapla|şarj süresi hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Kışın menzil neden düşer?",
      p: [
        "Lityum iyon bataryalar soğukta kimyasal olarak daha yavaş çalışır: iç direnç artar, kullanılabilir enerji azalır ve şarj kabul hızı düşer. Buna ek olarak benzinli araçlarda motorun atık ısısıyla bedavaya gelen kabin ısıtması, elektrikli araçta doğrudan bataryadan karşılanır. Kısa yolculuklarda, kabini ve bataryayı her seferinde yeniden ısıtmak gerektiği için kayıp daha da büyür.",
        "Sonuç olarak dondurucu soğuklarda menzil, ılıman havadaki değerin %10–30 altına inebilir. Isı pompası olan araçlar ısıtmayı daha verimli yapar ve kaybı azaltır. Pratik önlemler şunlardır: aracı prizdeyken önceden ısıtmak, koltuk ve direksiyon ısıtmasını tercih etmek, mümkünse aracı kapalı garajda tutmak ve uzun yolda DC şarjdan önce batarya ön ısıtmasını açmak."
      ]
    },
    {
      h: "Elektrikli araç benzinliye göre km başına ne kadar ucuz?",
      p: [
        "Karşılaştırmayı aynı birimle yapmanız gerekir: 100 km başına TL. Benzinli araç için 100 km'de tükettiği litreyi litre fiyatıyla, elektrikli araç için 100 km'de tükettiği kWh'i (kayıp dâhil) kWh fiyatıyla çarparsınız. Aşağıdaki örnekte benzinli araç 100 km'de 7 litre tüketiyor ve benzinin litresi örnek olarak 50 TL alınıyor: 100 km yakıt maliyeti 350 TL eder."
      ],
      ul: [
        "<strong>Evde şarj:</strong> 17 kWh ÷ 0,90 × 3 TL ≈ 57 TL. Benzinlinin yaklaşık altıda biri.",
        "<strong>AC istasyon:</strong> 17 ÷ 0,90 × 8 TL ≈ 151 TL. Benzinlinin yarısından az.",
        "<strong>Yalnızca DC hızlı şarj:</strong> 17 ÷ 0,95 × 12 TL ≈ 215 TL. Fark azalır ama hâlâ ucuzdur.",
        "<strong>Karma kullanım:</strong> Şarjın %80'ini evde, %20'sini DC istasyonda yapan bir kullanıcı için ortalama yaklaşık 0,8 × 57 + 0,2 × 215 ≈ 89 TL/100 km olur."
      ],
      after: [
        "Bu karşılaştırma yalnızca enerji maliyetidir. Gerçek kilometre maliyetinde sigorta, kasko, vergi, bakım, lastik ve değer kaybı da vardır; elektrikli araçlarda bakım kalemleri genellikle daha azdır ama satın alma bedeli ve sigorta farklı olabilir. Tüm giderleri birlikte görmek için [[arac:kilometre-maliyeti-hesapla|kilometre maliyeti hesaplama]] aracına, yakıtlı araçlarda tüketim hesabı için [[bilgi:100-km-de-kac-litre-yakit-hesaplama|100 km'de kaç litre yakıt]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Şarj maliyetini düşürmek için ipuçları ve sık yapılan hatalar",
      ul: [
        "<strong>Kaybı hesaba katmamak:</strong> Bataryaya giren 36 kWh'i doğrudan fiyatla çarpmak maliyeti %10 civarında düşük gösterir.",
        "<strong>Brüt kapasiteyle hesaplamak:</strong> Katalogdaki büyük sayı değil, kullanılabilir kapasite esas alınmalıdır.",
        "<strong>Gece tarifesini değerlendirmemek:</strong> Çok zamanlı tarifeye geçip zamanlayıcıyla gece şarj etmek ev maliyetini belirgin düşürebilir; tarifeye geçmenin size uygun olup olmadığını tüm evin tüketimiyle birlikte değerlendirin.",
        "<strong>Her gün %100'e doldurmak:</strong> Günlük kullanımda %80 sınırı hem DC'de zaman kazandırır hem de birçok batarya türünün ömrünü korur. Üreticinin önerisine uyun.",
        "<strong>Otoyolda yüksek hız:</strong> 130 km/s yerine 110 km/s ile gitmek tüketimi belirgin düşürür ve daha az DC şarj durağı gerektirir.",
        "<strong>Uygun olmayan priz ve uzatma kablosu kullanmak:</strong> Uzun süre yüksek akım çeken şarj, eski ya da ince kablolu tesisatta ısınmaya yol açabilir. Ev şarj ünitesini yetkili elektrikçiye kurdurun."
      ]
    }
  ],
  faq: [
    ["Elektrikli araç şarj etmek kaç TL tutar?", "Tutar, bataryaya girecek enerjiye, şarj kayıplarına ve kWh birim fiyatına bağlıdır. 60 kWh bataryayı yüzde 20'den yüzde 80'e doldurmak 36 kWh ister; örnek 3 TL/kWh ev tarifesiyle yaklaşık 120 TL, örnek 12 TL/kWh hızlı şarjla yaklaşık 455 TL tutar."],
    ["Evde ve istasyonda şarj maliyeti farkı nedir?", "Evde mesken tarifesiyle ödeme yaptığınız için kWh başına maliyet en düşüktür. Halka açık AC istasyonlar daha pahalı, DC hızlı şarj istasyonları genellikle en pahalıdır. Aynı şarj, istasyona göre ev maliyetinin iki ila dört katına çıkabilir."],
    ["Elektrikli araç 100 km'de kaç kWh harcar?", "Binek elektrikli araçlar ılıman havada karma kullanımda genellikle 100 km'de 14 ile 20 kWh arasında enerji harcar. Şehir içinde frenleme enerjisi geri kazanıldığı için tüketim düşer, otoyolda yüksek hızda ve soğuk havada belirgin biçimde artar."],
    ["Şarj süresi nasıl hesaplanır?", "Yaklaşık şarj süresi, eklenecek enerjinin şarj gücüne bölünmesiyle bulunur. Örneğin 40 kWh enerji 7,4 kW'lık ev ünitesiyle yaklaşık 5,4 saatte, 11 kW ile yaklaşık 3,6 saatte çekilir. DC şarjda yüzde 80'den sonra güç düştüğü için süre uzar."],
    ["Kışın menzil neden düşer?", "Soğukta batarya kimyası yavaşlar, iç direnç artar ve kabin ile bataryanın ısıtılması için ek enerji harcanır. Bu etkilerle dondurucu havalarda menzil yüzde 10 ila 30 düşebilir; ısı pompası, ön ısıtma ve koltuk ısıtması kaybı azaltır."],
    ["AC ve DC şarj farkı nedir?", "AC şarjda alternatif akım aracın içindeki dahili şarj cihazında doğru akıma çevrilir ve hız bu cihazın gücüyle sınırlıdır. DC şarjda çevirme istasyonda yapılır, enerji doğrudan bataryaya verilir; bu yüzden çok daha hızlıdır ama genellikle daha pahalıdır."],
    ["Elektrikli araç benzinliye göre km başına ne kadar ucuz?", "100 km'de 7 litre yakan ve benzinin örnek 50 TL olduğu bir araçta yakıt maliyeti 350 TL'dir. 17 kWh tüketen elektrikli araç evde örnek 3 TL/kWh ile yaklaşık 57 TL, yalnızca hızlı şarjla yaklaşık 215 TL harcar; oran tarifeye göre değişir."],
    ["Batarya kapasitesi (kWh) ne anlama gelir?", "Batarya kapasitesi, aracın depolayabildiği toplam elektrik enerjisidir ve kilovatsaat ile ölçülür. Maliyet ve menzil hesabında brüt değil kullanılabilir kapasite esas alınır; aracın 100 km tüketimiyle birlikte menzili belirler."],
    ["Elektrik tarifeleri değişince hesap nasıl güncellenir?", "Formül aynı kalır; yalnızca kWh birim fiyatını yeni tarifeyle değiştirmeniz yeterlidir. Mesken tarifesinin güncel değerini fatura üzerindeki birim fiyattan ya da dağıtım şirketinizin duyurularından, istasyon fiyatlarını işletmecinin uygulamasından öğrenebilirsiniz."]
  ],
  tools: ["elektrikli-arac-sarj-maliyeti-hesapla", "elektrikli-arac-menzil-hesapla", "sarj-suresi-hesapla", "kilometre-maliyeti-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "trifaze-ve-monofaze-farki", "100-km-de-kac-litre-yakit-hesaplama", "araba-yillik-masrafi-ne-kadar", "watt-amper-volt-iliskisi"],
  uyari: "tutarlar örnek tutardır; güncel elektrik tarifesi ve istasyon fiyatları için dağıtım şirketinize ve şarj işletmecisine başvurun",
  sources: [
    ["EPDK – Enerji Piyasası Düzenleme Kurumu (tarifeler ve şarj hizmetleri)", "https://www.epdk.gov.tr/"],
    ["Uluslararası Enerji Ajansı – Global EV Outlook", "https://www.iea.org/"]
  ]
};
