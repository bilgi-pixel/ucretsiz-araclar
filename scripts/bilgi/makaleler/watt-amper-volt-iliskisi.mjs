export default {
  slug: "watt-amper-volt-iliskisi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Watt, Amper ve Volt İlişkisi: Kaç Watt Kaç Amper Çeker? Hesaplama",
  pageTitle: "Watt Amper Volt İlişkisi: Kaç Watt Kaç Amper Çeker?",
  description: "Güç (W) = gerilim (V) × akım (A). 230 V'ta 2000 W cihaz yaklaşık 8,7 A çeker, 16 A sigorta yaklaşık 3.680 W taşır. Üç faz, uzatma kablosu ve 5V 2A örnekleri.",
  keywords: ["kaç watt kaç amper", "watt amper çevirme", "1 amper kaç watt", "2000 watt kaç amper", "16 amper sigorta kaç watt taşır", "watt volt amper formülü", "üç faz amper hesabı", "5v 2a ne demek"],
  lead: "Watt, amper ve volt arasındaki temel ilişki <strong>güç (W) = gerilim (V) × akım (A)</strong> formülüdür. Türkiye'de ev prizlerinin gerilimi 230 V olduğu için 2.000 W'lık bir ısıtıcı yaklaşık 2.000 ÷ 230 = 8,7 amper çeker; 16 amperlik bir sigorta ise en fazla yaklaşık 16 × 230 = 3.680 W yükü taşıyabilir. Bu sayfada üç birimin ne anlama geldiğini, tek faz ve üç fazda amper hesabını, sigortanın neden attığını, uzatma kablosu ve prizlerin sınırlarını, şarj aletlerindeki 5V 2A ifadesini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "P = V × I: güç (watt) gerilim (volt) ile akımın (amper) çarpımıdır; I = P ÷ V ve V = P ÷ I olarak da yazılır.",
    "230 V'ta 1 amper 230 watt'tır; 1 kW yaklaşık 4,35 amper çeker.",
    "2.000 W cihaz 230 V'ta yaklaşık 8,7 A, 3.000 W cihaz yaklaşık 13 A çeker.",
    "16 A sigorta 230 V'ta yaklaşık 3.680 W, 10 A sigorta yaklaşık 2.300 W yük taşır.",
    "Üç fazda: P = √3 × 400 V × I × cos φ; 10 kW'lık dengeli bir yük, cos φ = 1 iken faz başına yaklaşık 14,4 A çeker.",
    "Şarj aletindeki 5V 2A, 5 × 2 = 10 watt güç verebileceğini gösterir."
  ],
  figure: {
    alt: "Güç, gerilim ve akım formül üçgeni ile 16 amperlik bir hattın 3.680 watt sınırına karşı ısıtıcı ve su ısıtıcısı yüklerinin karşılaştırılması; toplam 4.200 watt sınırı aşıyor.",
    caption: "Formül üçgeninde bulmak istediğiniz değeri kapattığınızda kalan iki değerin işlemi görünür: P = V × I, I = P ÷ V, V = P ÷ I. Sağda, aynı 16 A hatta çalışan 2.000 W ısıtıcı ile 2.200 W su ısıtıcısının toplamı hattın taşıyabileceği gücü aştığı için sigorta atar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="170" y="30" class="b mid">Formül üçgeni</text>
  <polygon points="170,56 40,286 300,286" class="ps"/>
  <polygon points="170,56 40,286 300,286" class="sp sw" fill="none"/>
  <line x1="92" y1="194" x2="248" y2="194" class="sp sw" fill="none"/>
  <line x1="170" y1="194" x2="170" y2="286" class="sp sw" fill="none"/>
  <text x="170" y="160" class="xl mid p">P</text><text x="170" y="182" class="sm mid">watt</text>
  <text x="120" y="250" class="xl mid">V</text><text x="120" y="272" class="sm mid">volt</text>
  <text x="220" y="250" class="xl mid">I</text><text x="220" y="272" class="sm mid">amper</text>
  <text x="170" y="318" class="sm mid b">P = V × I · I = P ÷ V · V = P ÷ I</text>
  <text x="170" y="342" class="sm mid t2">Örnek: 2.000 W ÷ 230 V = 8,7 A</text>
  <text x="520" y="30" class="b mid">16 A hat, 230 V</text>
  <rect x="360" y="56" width="320" height="44" rx="8" class="sf sb"/>
  <text x="376" y="84" class="b">Hat sınırı: 16 × 230 = 3.680 W</text>
  <line x1="360" y1="150" x2="680" y2="150" class="st" fill="none"/>
  <rect x="360" y="120" width="152" height="60" class="ps"/>
  <text x="436" y="146" class="sm mid b">Isıtıcı</text><text x="436" y="166" class="sm mid">2.000 W · 8,7 A</text>
  <rect x="512" y="120" width="168" height="60" class="dgs"/>
  <text x="596" y="146" class="sm mid b">Su ısıtıcısı</text><text x="596" y="166" class="sm mid">2.200 W · 9,6 A</text>
  <line x1="640" y1="112" x2="640" y2="190" class="sdg sw dash" fill="none"/>
  <text x="640" y="206" class="sm mid dg b">3.680 W sınırı</text>
  <rect x="360" y="230" width="320" height="120" rx="10" class="dgs"/>
  <text x="380" y="258" class="b">Toplam: 4.200 W ≈ 18,3 A</text>
  <text x="380" y="284" class="sm">18,3 A, 16 A sınırını aşar → sigorta atar</text>
  <text x="380" y="310" class="sm">Çözüm: cihazları farklı hatlara dağıtın</text>
  <text x="380" y="334" class="sm">ya da aynı anda çalıştırmayın</text>
</svg>`
  },
  sections: [
    {
      h: "Volt, amper ve watt ne anlama gelir?",
      p: [
        "Elektriği bir su tesisatına benzetmek kavramları anlamayı kolaylaştırır. <strong>Volt (V)</strong>, elektriği iten basınçtır, yani gerilimdir. <strong>Amper (A)</strong>, borudan saniyede geçen su miktarı gibi, iletkenden geçen akımın büyüklüğüdür. <strong>Watt (W)</strong> ise bu akışın yaptığı iştir: bir ısıtıcının ne kadar ısı, bir motorun ne kadar mekanik iş ürettiğini gösteren güçtür.",
        "Aynı gücü yüksek gerilim ve düşük akımla ya da düşük gerilim ve yüksek akımla elde edebilirsiniz. Bir arabanın 12 V aküsünden 120 W çeken bir cihaz 10 A akım çekerken, aynı 120 W'lık cihaz 230 V şebekede yalnızca yaklaşık 0,52 A çeker. Kabloların ısınması ve sigortanın atması akıma bağlı olduğu için kablo ve sigorta seçiminde belirleyici olan amperdir.",
        "Bu üç büyüklüğe dördüncü olarak <strong>direnç (ohm, Ω)</strong> eklenir. Ohm yasasına göre V = I × R'dir. Buradan güç için iki formül daha türetilir: P = I² × R ve P = V² ÷ R. Örneğin 230 V'ta 2.000 W üreten bir ısıtıcı telinin direnci 230² ÷ 2.000 ≈ 26,5 Ω'dur."
      ]
    },
    {
      h: "Formüller: watt, amper ve volt nasıl birbirine çevrilir?",
      formula: "Doğru akım ve rezistif yükler: P = V × I\nTek faz alternatif akım: P = V × I × cos φ\nÜç faz alternatif akım: P = √3 × V(hat) × I × cos φ\nAkım: I = P ÷ (V × cos φ) · Gerilim: V = P ÷ I",
      p: [
        "Isıtıcı, su ısıtıcısı, fırın, ütü, akkor lamba gibi yalnızca ısı üreten cihazlarda akım ile gerilim aynı fazdadır ve <strong>güç faktörü (cos φ)</strong> 1 kabul edilir. Motorlu cihazlarda, kompresörlerde, bazı LED sürücülerinde ve elektronik güç kaynaklarında akım ile gerilim arasında faz farkı oluşur; cos φ 1'den küçük olur ve aynı watt için daha fazla akım çekilir.",
        "Güç faktörünü bilmiyorsanız cihazın etiketinde yazan amper değeri en güvenilir bilgidir. Bazı etiketlerde watt yerine VA (volt-amper) yazar; VA görünür güçtür ve doğrudan amper hesabına uygundur: VA ÷ 230 = amper. Görünür güç ile aktif güç arasındaki fark [[bilgi:kva-kw-farki-jenerator-secimi|kVA ve kW farkı]] yazımızda ayrıntılı anlatılır."
      ]
    },
    {
      h: "Kaç watt kaç amper çeker? 230 V tablosu",
      p: [
        "Aşağıdaki tablo, 230 V tek faz şebekede ve cos φ = 1 kabulüyle cihaz gücüne göre çekilen akımı gösterir. Motorlu cihazlarda gerçek akım biraz daha yüksek olabilir."
      ],
      table: {
        head: ["Cihaz gücü", "Çektiği akım (230 V)", "Örnek cihaz"],
        rows: [
          ["100 W", "0,43 A", "Dizüstü bilgisayar adaptörü"],
          ["500 W", "2,17 A", "Mikser, küçük buzdolabının çalışma anı"],
          ["1.000 W", "4,35 A", "Mikrodalga fırın"],
          ["1.500 W", "6,52 A", "Saç kurutma makinesi"],
          ["2.000 W", "8,70 A", "Elektrikli ısıtıcı, ütü"],
          ["2.200 W", "9,57 A", "Su ısıtıcısı (kettle)"],
          ["2.500 W", "10,87 A", "Çamaşır makinesinin ısıtma aşaması"],
          ["3.000 W", "13,04 A", "Elektrikli şofben, büyük fırın"],
          ["3.500 W", "15,22 A", "Ankastre ocak (tek hat)"]
        ],
        caption: "Örnek cihaz güçleri yaklaşık değerlerdir; kendi cihazınızın etiketindeki değeri kullanın."
      },
      after: [
        "Kendi değerlerinizle hesap yapmak için [[arac:amper-watt-cevir|amper watt çevirici]] doğru akım, tek faz ve üç faz seçenekleriyle iki yönde dönüşüm yapar. Kilowatt cinsinden çalışıyorsanız [[arac:kw-amper-cevir|kW amper çevirici]] daha pratiktir."
      ]
    },
    {
      h: "16 amper sigorta kaç watt taşır? Sigorta neden atar?",
      p: [
        "Evlerdeki otomatik sigortalar (minyatür devre kesiciler) belirli bir akımın üzerinde hattı keser. Kesme akımı sigortanın üzerinde yazar: B16 ya da C16 gibi ifadelerdeki 16, sigortanın anma akımının 16 A olduğunu gösterir. 230 V'ta taşıyabileceği yaklaşık güç anma akımı ile gerilimin çarpımıdır."
      ],
      table: {
        head: ["Sigorta", "Tek faz 230 V yaklaşık güç", "Üç faz 400 V yaklaşık güç (cos φ = 1)"],
        rows: [
          ["6 A", "1.380 W", "4,16 kW"],
          ["10 A", "2.300 W", "6,93 kW"],
          ["16 A", "3.680 W", "11,09 kW"],
          ["20 A", "4.600 W", "13,86 kW"],
          ["25 A", "5.750 W", "17,32 kW"],
          ["32 A", "7.360 W", "22,17 kW"],
          ["40 A", "9.200 W", "27,71 kW"]
        ]
      },
      after: [
        "Sigorta, aynı hatta bağlı cihazların toplam akımı anma değerini aştığında atar. Örnekte 2.000 W ısıtıcı (8,7 A) ve 2.200 W su ısıtıcısı (9,6 A) aynı hatta çalıştığında toplam 18,3 A'e ulaşılır ve 16 A sigorta kısa süre içinde hattı keser. Sigortanın atması bir arıza değil, kablonun aşırı ısınmasını önleyen bir korumadır.",
        "Sigortanın değerini büyütmek asla çözüm değildir. Sigorta, hattaki kablonun kesitine göre seçilir; daha büyük sigorta takıldığında kablo aşırı akımda ısınırken sigorta atmaz ve yangın riski doğar. Konutlarda prizlerin genellikle 2,5 mm² kabloyla ve 16 A sigortayla, aydınlatmanın 1,5 mm² kabloyla ve 10 A sigortayla korunması yaygın bir uygulamadır; ancak kendi tesisatınızın durumunu yetkili bir elektrikçiye kontrol ettirin."
      ]
    },
    {
      h: "Prizden ve uzatma kablosundan en fazla kaç watt çekilebilir?",
      p: [
        "Ev tipi topraklı prizlerin büyük çoğunluğu 16 A için üretilir; üzerinde 16 A 250 V gibi bir ibare bulunur. Bu, prizden teorik olarak yaklaşık 3.680 W çekilebileceği anlamına gelir. Ancak prizin bağlı olduğu hattın sigortası ve aynı hattaki diğer prizlerde çalışan cihazlar da hesaba katılmalıdır.",
        "Uzatma kabloları ve çoklu prizlerin taşıyabileceği güç etiketlerinde yazar; 10 A (2.300 W) ya da 16 A (3.500–3.680 W) yaygın değerlerdir. İnce kablolu ucuz uzatmalar daha düşük değerlere sahip olabilir. Makaralı uzatma kablolarında kablo makarada sarılıyken yüksek güç çekilirse ısı dağılamaz; makara üzerindeki sarılı ve açılmış kullanım güçlerine dikkat edin, yüksek güçte kabloyu tamamen açın."
      ],
      ul: [
        "Isıtıcı, klima, fırın ve şofben gibi yüksek güçlü cihazları mümkünse doğrudan duvar prizine takın.",
        "Uzatmaya bağlı cihazların watt değerlerini toplayın; toplam, uzatmanın etiket değerini aşmasın.",
        "Uzatma kablolarını birbirine eklemeyin, halı altından geçirmeyin.",
        "Fiş ya da priz ısınıyor, kararıyor ya da kokuyorsa kullanımı bırakın ve bir elektrikçiye gösterin."
      ]
    },
    {
      h: "Üç fazda amper nasıl hesaplanır?",
      p: [
        "Sanayi tipi makineler, büyük ısı pompaları, bazı elektrikli araç şarj cihazları ve büyük binaların ana panoları üç fazlı beslenir. Türkiye'de üç faz sistemde fazlar arası gerilim 400 V, faz ile nötr arası gerilim 230 V'tur. Dengeli bir üç faz yükte güç formülüne √3 (yaklaşık 1,732) çarpanı girer."
      ],
      ol: [
        "Yükün gücünü ve güç faktörünü belirleyin: 10 kW, cos φ = 0,85 (bir motor için örnek değer).",
        "Formülü akıma göre düzenleyin: I = P ÷ (√3 × V × cos φ).",
        "Değerleri yerleştirin: 10.000 ÷ (1,732 × 400 × 0,85) = 10.000 ÷ 588,9 ≈ 17,0 A.",
        "Aynı yük cos φ = 1 olan rezistif bir ısıtıcı olsaydı: 10.000 ÷ (1,732 × 400) ≈ 14,4 A."
      ],
      after: [
        "Bu hesaplar faz başına akımı verir. Üç faz hesaplarını ve aktif, görünür ve reaktif güç dağılımını [[arac:uc-faz-guc-hesapla|üç faz güç hesaplama aracı]]yla yapabilirsiniz. Gerilim ve akımı bildiğiniz bir devrenin gücünü bulmak için de [[arac:elektrik-gucu-hesapla|elektrik gücü hesaplama aracı]] uygundur."
      ]
    },
    {
      h: "Şarj aletindeki 5V 2A ne demek?",
      p: [
        "Telefon ve tablet şarj aletlerinin üzerinde çıkış değeri volt ve amper olarak yazar. 5V 2A, şarj aletinin 5 voltta en fazla 2 amper, yani 5 × 2 = 10 watt verebileceğini gösterir. Hızlı şarj destekleyen adaptörlerde 9V 2A (18 W), 9V 3A (27 W) ya da 20V 3,25A (65 W) gibi birden çok çıkış profili listelenir; cihaz ve adaptör anlaşarak uygun gerilimi seçer.",
        "Adaptörün üzerinde bir de giriş değeri yazar: \"100–240V 50/60Hz 0,5A\" gibi. Bu, adaptörün dünyanın farklı şebekelerinde çalışabildiğini ve prizden en fazla çekeceği akımı gösterir. Giriş ve çıkış akımları farklıdır, çünkü gerilim farklıdır: 10 W'lık bir çıkış 230 V'ta yalnızca birkaç onda bir amper çeker.",
        "Powerbank ve aküler için kapasite mAh ya da Wh olarak verilir; Wh = mAh × V ÷ 1.000 formülüyle enerji bulunur. Bu konuyu [[bilgi:powerbank-kac-kez-sarj-eder|powerbank kaç kez şarj eder]] yazımız çözümlü örneklerle anlatır."
      ]
    },
    {
      h: "Watt'tan elektrik tüketimine: kWh",
      p: [
        "Watt anlık gücü, kilowattsaat (kWh) ise belirli bir sürede harcanan enerjiyi gösterir. Faturanızdaki tutar kWh üzerinden hesaplanır. Bir cihazın tüketimi, gücünün kilowatt cinsinden değeri ile çalıştığı saatin çarpımıdır."
      ],
      formula: "Enerji (kWh) = güç (W) × süre (saat) ÷ 1.000\nÖrnek: 2.000 W ısıtıcı × 3 saat = 6 kWh",
      after: [
        "Termostatlı cihazlar (ısıtıcı, buzdolabı, klima) sürekli tam güçte çalışmadığı için gerçek tüketim genellikle bu hesaptan düşüktür. Cihazlarınızın günlük ve aylık tüketimini [[arac:elektrik-tuketim-hesapla|elektrik tüketim hesaplama aracı]]yla bulabilir, faturaya etkisini [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası nasıl hesaplanır]] yazımızla değerlendirebilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>220 V ile hesaplamak:</strong> Türkiye'de nominal şebeke gerilimi 230 V'tur. 220 V ile hesap yapmak akımı yaklaşık %4,5 fazla gösterir; büyük bir hata değildir ama tutarlılık için 230 V kullanın.",
        "<strong>Motorlu cihazlarda cos φ'yi unutmak:</strong> Klima ve kompresörlerde gerçek akım, watt ÷ 230'dan yüksek çıkar; etiketteki amper değerine bakın.",
        "<strong>Kalkış akımını göz ardı etmek:</strong> Motorlar ilk çalıştıkları anda çalışma akımının birkaç katını çekebilir; aynı anda çalışmaya başlayan cihazlar sigortayı attırabilir.",
        "<strong>Sigortayı büyütmek:</strong> Sık atan sigortayı daha büyüğüyle değiştirmek kabloyu korumasız bırakır.",
        "<strong>W ile Wh'yi karıştırmak:</strong> Watt anlık güç, watt-saat enerjidir; akü ve powerbank kapasitesi Wh ile, cihaz gücü W ile ifade edilir."
      ]
    }
  ],
  faq: [
    ["Watt, amper ve volt arasındaki ilişki nedir?", "Güç, gerilim ile akımın çarpımıdır: watt = volt × amper. Bu formülden amper = watt ÷ volt ve volt = watt ÷ amper türetilir. Motorlu cihazlarda güç faktörü de hesaba katılır."],
    ["2000 watt cihaz kaç amper çeker?", "230 V şebekede 2.000 W'lık rezistif bir cihaz 2.000 ÷ 230 ≈ 8,7 amper çeker. Motorlu cihazlarda güç faktörü nedeniyle akım biraz daha yüksek olabilir; kesin değer cihaz etiketinde yazar."],
    ["16 amper sigorta kaç watt taşır?", "230 V tek faz hatta 16 amperlik sigorta yaklaşık 16 × 230 = 3.680 watt yük taşır. Aynı hatta çalışan tüm cihazların toplamı bu değeri aşarsa sigorta hattı keser."],
    ["1 kW kaç amperdir?", "Tek faz 230 V'ta 1 kW yaklaşık 4,35 amperdir. Üç faz 400 V'ta dengeli ve güç faktörü 1 olan bir yükte 1 kW, faz başına yaklaşık 1,44 amper akım çeker."],
    ["Prizden en fazla kaç watt çekilebilir?", "Ev tipi prizlerin çoğu 16 A için üretilir ve teorik olarak yaklaşık 3.680 W taşır. Ancak sınırı prizin bağlı olduğu hattın sigortası belirler ve aynı hattaki diğer prizlerde çalışan cihazlar da toplama girer."],
    ["Üç fazda amper nasıl hesaplanır?", "Üç faz dengeli yükte akım, gücün √3 × 400 V × cos φ değerine bölünmesiyle bulunur. Örneğin cos φ = 0,85 olan 10 kW'lık bir motor faz başına yaklaşık 17 amper çeker."],
    ["Uzatma kablosuna kaç watt bağlanabilir?", "Uzatma kablosunun taşıyabileceği güç etiketinde yazar; 10 A için yaklaşık 2.300 W, 16 A için 3.500 W civarı yaygındır. Makaralı kablolarda yüksek güç çekerken kabloyu tamamen açmak gerekir."],
    ["Şarj aletindeki 5V 2A ne demek?", "Şarj aletinin 5 volt gerilimde en fazla 2 amper akım, yani 10 watt güç verebileceği anlamına gelir. Hızlı şarj adaptörleri 9 V ya da daha yüksek gerilimlerde daha fazla güç sunan ek profiller listeler."],
    ["Volt ile amper arasındaki fark nedir?", "Volt elektriği iten basıncı, yani gerilimi; amper ise iletkenden geçen akımın miktarını gösterir. Kabloların ısınmasını ve sigortanın atmasını akım belirlediği için kablo ve sigorta seçimi ampere göre yapılır."]
  ],
  tools: ["amper-watt-cevir", "elektrik-gucu-hesapla", "kw-amper-cevir", "uc-faz-guc-hesapla", "elektrik-tuketim-hesapla"],
  related: ["kva-kw-farki-jenerator-secimi", "elektrik-faturasi-nasil-hesaplanir", "powerbank-kac-kez-sarj-eder"],
  sources: [
    ["IEC – IEC 60038 Standart gerilimler", "https://www.iec.ch/"],
    ["Enerji Piyasası Düzenleme Kurumu (EPDK)", "https://www.epdk.gov.tr/"]
  ]
};
