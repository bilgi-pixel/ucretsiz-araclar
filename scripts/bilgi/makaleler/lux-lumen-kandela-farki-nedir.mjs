export default {
  slug: "lux-lumen-kandela-farki-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Lüks, Lümen ve Kandela Farkı Nedir? Işık Şiddeti Mesafeyle Nasıl Azalır?",
  pageTitle: "Lüks, Lümen ve Kandela Farkı: Ters Kare Yasası ve Örnekler",
  description: "Lümen toplam ışık akısını, kandela bir yöndeki ışık şiddetini, lüks yüzeye düşen aydınlığı ölçer. Lümenden lükse geçiş, ters kare yasası, önerilen lüks değerleri.",
  keywords: ["lux lümen farkı", "kandela nedir", "lüks nedir", "ters kare yasası", "çalışma masası kaç lux", "aydınlık düzeyi", "fener kaç lümen", "lümen lüks çevirme"],
  lead: "Lümen bir lambanın her yöne yaydığı toplam ışık miktarını, kandela belirli bir yöne giden ışığın şiddetini, lüks ise bir yüzeyin metrekaresine düşen ışığı ölçer; 1 lüks = 1 lümen/m², nokta kaynakta lüks = kandela ÷ mesafe² bağıntısıyla bulunur. Bu yüzden aynı lamba 2 metrede 250 lüks veriyorsa 4 metrede yalnızca 62,5 lüks verir. Bu yazıda üç birimin farkını, lümenden lükse ve kandelaya geçişi, ters kare yasasını ve masa, mutfak, koridor için yaygın aydınlık düzeylerini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Lümen (lm): kaynağın yaydığı toplam ışık akısı; ampul kutusunda yazan değerdir.",
    "Kandela (cd): belirli bir yöndeki ışık şiddeti; 1 cd = 1 lm/sr (steradyan).",
    "Lüks (lx): yüzeye düşen aydınlık düzeyi; 1 lx = 1 lm/m².",
    "Ters kare yasası: E = I ÷ d²; mesafe iki katına çıkınca aydınlık dörtte birine iner.",
    "Her yöne eşit yayan 1.000 lm'lik kaynak 1.000 ÷ 4π ≈ 79,6 cd şiddete sahiptir.",
    "Okuma ve masa başı çalışma için yaygın öneri yaklaşık 500 lüks, koridor için 100 lüks civarıdır.",
    "Watt tüketilen elektriği gösterir; parlaklık için lümene bakılır."
  ],
  figure: {
    alt: "Ters kare yasası diyagramı: 1.000 kandelalık kaynaktan 1 metrede 1 metrekarelik alana 1.000 lüks, 2 metrede 4 metrekareye 250 lüks, 4 metrede 16 metrekareye 62,5 lüks düşer.",
    caption: "Aynı ışık konisi mesafe arttıkça daha geniş bir alana yayılır. Alan mesafenin karesiyle büyüdüğü için aydınlık düzeyi (lüks) mesafenin karesiyle azalır; kaynağın kandela değeri değişmez.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Ters kare yasası: E = I ÷ d²</text>
  <circle cx="60" cy="190" r="16" class="a"/>
  <text x="60" y="236" class="sm mid b">1.000 cd</text>
  <polyline points="72,182 640,60" class="sb dash" fill="none"/>
  <polyline points="72,198 640,320" class="sb dash" fill="none"/>
  <rect x="190" y="160" width="14" height="60" class="ps"/>
  <rect x="330" y="130" width="14" height="120" class="oks"/>
  <rect x="610" y="70" width="14" height="240" class="p"/>
  <g class="sm mid">
    <text x="197" y="150" class="b">1 m</text>
    <text x="337" y="120" class="b">2 m</text>
    <text x="617" y="60" class="b">4 m</text>
  </g>
  <g class="sm">
    <text x="214" y="196">1 m² · 1.000 lx</text>
    <text x="354" y="196">4 m² · 250 lx</text>
    <text x="500" y="196" class="end b p">16 m² · 62,5 lx</text>
  </g>
  <rect x="20" y="300" width="220" height="86" rx="8" class="sf sb"/>
  <text x="36" y="324" class="b">Lümen (lm)</text>
  <text x="36" y="348" class="sm">Toplam ışık akısı</text>
  <text x="36" y="370" class="sm t2">ampul kutusu</text>
  <rect x="250" y="300" width="220" height="86" rx="8" class="sf sb"/>
  <text x="266" y="324" class="b">Kandela (cd)</text>
  <text x="266" y="348" class="sm">Bir yöndeki şiddet</text>
  <text x="266" y="370" class="sm t2">fener, spot, far</text>
  <rect x="480" y="300" width="220" height="86" rx="8" class="ps"/>
  <text x="496" y="324" class="b">Lüks (lx)</text>
  <text x="496" y="348" class="sm">Yüzeye düşen ışık</text>
  <text x="496" y="370" class="sm t2">masa, tezgâh, zemin</text>
</svg>`
  },
  sections: [
    {
      h: "Lümen, lüks ve kandela neyi ölçer?",
      p: [
        "Işıkla ilgili birimler, aynı ışığın farklı yönlerini ölçer. Bunu bir bahçe hortumuyla düşünmek kolaylaştırır: <strong>lümen</strong> hortumdan çıkan toplam su miktarı, <strong>kandela</strong> suyun belirli bir yöne ne kadar güçlü fışkırdığı, <strong>lüks</strong> ise yere konmuş bir kovaya metrekare başına ne kadar su düştüğüdür. Aynı miktarda su (lümen) dar bir püskürtme ucuyla tek noktaya yönlendirilirse o yöndeki şiddet (kandela) ve o noktadaki ıslaklık (lüks) artar.",
        "Lümen, kaynağın her yöne yaydığı toplam ışık akısıdır ve ampul ile LED panel kutularında yazan değerdir. Kandela, ışığın tek bir yöndeki yoğunluğunu gösterir; el fenerleri, spot lambalar ve araç farları için anlamlıdır. Lüks ise aydınlatılan yüzeyin ne kadar aydınlık olduğunu anlatır ve iç mekân aydınlatma tasarımında hedeflenen değerdir. Uluslararası Birimler Sistemi'nde (SI) temel birim kandeladır; lümen ve lüks ondan türetilir."
      ],
      table: {
        head: ["Birim", "Sembol", "Ölçtüğü büyüklük", "Tanım"],
        rows: [
          ["Kandela", "cd", "Işık şiddeti", "SI temel birimi"],
          ["Lümen", "lm", "Işık akısı", "1 lm = 1 cd × 1 sr"],
          ["Lüks", "lx", "Aydınlık düzeyi", "1 lx = 1 lm ÷ 1 m²"],
          ["Foot-candle", "fc", "Aydınlık düzeyi", "1 fc ≈ 10,764 lx"]
        ]
      }
    },
    {
      h: "Lümenden lükse nasıl geçilir?",
      p: [
        "Lüks, lümenin aydınlatılan alana bölünmesiyle bulunur. 800 lümenlik bir lambanın ışığı 4 metrekarelik bir alana tamamen ve eşit dağılsaydı aydınlık düzeyi 800 ÷ 4 = 200 lüks olurdu. Gerçekte ışığın bir kısmı duvarlara, tavana ve aydınlatılmak istenmeyen alanlara gider, bir kısmı armatürde kaybolur. Bu nedenle tasarımda bir \"kullanım katsayısı\" ile hesaplanır."
      ],
      formula: "E (lx) = Φ (lm) ÷ A (m²)\nGerçekçi hesap: E ≈ Φ × kullanım katsayısı ÷ A (katsayı odaya göre yaklaşık 0,4–0,7)\nÖrnek: 800 lm, 4 m², ideal → 200 lx; katsayı 0,6 → 120 lx",
      after: [
        "Ters yönde, bir alan için gereken lümeni bulmak da aynı formülle yapılır: 12 m²'lik bir çalışma odasında masa düzleminde 500 lüks hedefleniyorsa ideal durumda 6.000 lm, 0,6 kullanım katsayısıyla yaklaşık 10.000 lm gerekir. Oda tipine göre lamba sayısını bulmak için [[arac:aydinlatma-lumen-hesapla|Aydınlatma Lümen Hesaplama aracını]] kullanabilir, ayrıntılı oda örnekleri için [[bilgi:oda-icin-kac-lumen-gerekir|oda için kaç lümen gerekir]] yazısına bakabilirsiniz. Birim dönüşümü için [[arac:lux-lumen-cevir|Lüks Lümen Çevirici]] işinizi görür."
      ]
    },
    {
      h: "Işık şiddeti mesafenin karesiyle neden azalır?",
      p: [
        "Bir nokta kaynaktan çıkan ışık, kaynaktan uzaklaştıkça genişleyen bir koni ya da küre yüzeyi üzerine dağılır. Kürenin yüzey alanı yarıçapın karesiyle büyür (4πr²). Aynı ışık akısı dört kat büyük bir alana yayıldığında metrekare başına düşen ışık dörtte birine iner. Buna <strong>ters kare yasası</strong> denir ve ses, ısı ve radyasyon gibi noktasal kaynaklardan yayılan her şey için geçerlidir."
      ],
      formula: "E = I ÷ d²   (I: kandela, d: metre, E: lüks)\nE₂ = E₁ × (d₁ ÷ d₂)²",
      ol: [
        "1.000 cd şiddetindeki bir spotun tam karşısında 2 m uzaklıktaki yüzey: E = 1.000 ÷ 2² = 250 lx.",
        "Aynı spot 4 m'de: E = 1.000 ÷ 16 = 62,5 lx; mesafe iki kat, aydınlık dörtte bir.",
        "1 m'de ise E = 1.000 ÷ 1 = 1.000 lx olur.",
        "Bir sahnede 3 m'den 300 lx ölçülüyorsa 1,5 m'ye yaklaşıldığında E = 300 × (3 ÷ 1,5)² = 1.200 lx olur."
      ],
      after: [
        "Ters kare yasası nokta kaynak için kesin, geniş kaynaklar (uzun floresan, büyük LED panel) için kaynağın boyutunun birkaç katı uzaklıktan sonra yaklaşık olarak geçerlidir. Yakın mesafede geniş panel, yasanın öngördüğünden daha yavaş azalan bir aydınlık verir. Farklı mesafelerdeki değeri [[arac:isik-siddeti-mesafe-hesapla|Işık Şiddeti Mesafe aracıyla]] hesaplayabilirsiniz."
      ]
    },
    {
      h: "Lümenden kandelaya geçiş: ışın açısının etkisi",
      p: [
        "Kandela ile lümen arasındaki bağ katı açıdır (steradyan, sr). Her yöne eşit ışık yayan bir kaynak tam küreyi, yani 4π ≈ 12,57 sr'yi aydınlatır. 1.000 lümenlik böyle bir kaynağın şiddeti 1.000 ÷ 4π ≈ 79,6 cd'dir. Aynı 1.000 lümen dar bir koniye toplanırsa kandela değeri katlanarak artar.",
        "Koni biçimli bir ışın için katı açı Ω = 2π × (1 − cos(θ ÷ 2)) formülüyle bulunur; θ ışın açısıdır. 30°'lik bir spot için Ω ≈ 0,214 sr'dir. 400 lümenin tamamı bu koniye düştüğünü varsayarsak ortalama şiddet 400 ÷ 0,214 ≈ 1.868 cd olur. Bu spot 3 metre uzaktaki bir tabloyu yaklaşık 1.868 ÷ 9 ≈ 208 lüks ile aydınlatır."
      ],
      table: {
        head: ["Işın açısı", "Katı açı (sr)", "400 lm ile ortalama şiddet", "3 m'de aydınlık"],
        rows: [
          ["15°", "0,054", "≈ 7.440 cd", "≈ 827 lx"],
          ["30°", "0,214", "≈ 1.868 cd", "≈ 208 lx"],
          ["60°", "0,842", "≈ 475 cd", "≈ 53 lx"],
          ["120°", "3,142", "≈ 127 cd", "≈ 14 lx"]
        ],
        caption: "Işığın koninin içinde eşit dağıldığı varsayılmıştır; gerçek armatürlerde merkez daha parlak, kenarlar daha sönüktür."
      }
    },
    {
      h: "Fener ve projektörlerde kandela neden önemlidir?",
      p: [
        "El feneri seçerken yalnızca lümene bakmak yanıltıcı olabilir. Yüksek lümenli ama geniş açılı bir fener yakın çevreyi iyi aydınlatır ama uzağı göstermez. Daha az lümenli ama dar odaklı bir fener ise çok daha uzağa ulaşır. Uzağa ulaşma yeteneğini kandela belirler.",
        "Fener standartlarında ışın mesafesi, aydınlığın 0,25 lükse (dolunay ışığına yakın) düştüğü mesafe olarak tanımlanır. Ters kare yasasından d = √(I ÷ 0,25) = 2√I bulunur. 10.000 cd'lik bir fenerin ışın mesafesi 2 × √10.000 = 200 metredir. Aynı mantık projeksiyon ve sahne ışıklarında da kullanılır; projektörde perde aydınlığı için [[bilgi:projeksiyon-perde-mesafesi-nasil-hesaplanir|projeksiyon perde mesafesi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çalışma masası, mutfak ve koridor için kaç lüks önerilir?",
      p: [
        "İç mekân aydınlatmasında hedeflenen değerler, iş yerleri için TS EN 12464-1 gibi standartlarda yer alır; konutlar için bağlayıcı bir değer yoktur ama aynı aralıklar yaygın olarak öneri kabul edilir. Değerler, görevin yapıldığı düzlemde (masa üstü, tezgâh) ölçülen ortalama aydınlıktır."
      ],
      table: {
        head: ["Alan / iş", "Yaygın önerilen aydınlık (lx)"],
        rows: [
          ["Koridor, merdiven, depo", "100–150"],
          ["Oturma odası genel aydınlatma", "100–300"],
          ["Mutfak tezgâhı, yemek hazırlama", "300–500"],
          ["Ofis, okuma, yazma, bilgisayar", "500"],
          ["Teknik çizim, ince el işi", "750–1.000"],
          ["Banyo aynası önü", "300–500"]
        ],
        caption: "Yaşlılar ve görme güçlüğü olanlar için daha yüksek değerler gerekebilir; göz sağlığıyla ilgili sorunlarda göz hekimine danışın."
      },
      after: [
        "Yüksek lüks tek başına iyi aydınlatma demek değildir. Kamaşma, gölge, renk sunumu ve ışığın titrememesi de görsel konforu belirler. Ekranlı çalışmada ekrana doğrudan yansıyan ışıktan kaçının."
      ]
    },
    {
      h: "Watt değeri ışık miktarını gösterir mi?",
      p: [
        "Hayır. Watt, lambanın çektiği elektrik gücünü gösterir; ışık miktarını değil. Akkor ampuller döneminde watt ile parlaklık arasında yaklaşık sabit bir ilişki vardı, bu yüzden \"60 watt'lık ampul\" bir parlaklık ölçüsü gibi kullanılırdı. LED'ler aynı ışığı çok daha az elektrikle ürettiği için bu ilişki ortadan kalktı.",
        "Karşılaştırma için <strong>ışık verimi</strong> (lm/W) kullanılır. Akkor ampul yaklaşık 10–15 lm/W, LED ampuller genellikle 80–150 lm/W verimle çalışır. Eski 60 W'lık akkor ampulün yaklaşık 800 lümenlik ışığı, 7–10 W'lık bir LED ile elde edilir. Elektrik tüketimi ile güç arasındaki ilişki için [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Renk sıcaklığı (Kelvin) ile parlaklık farkı nedir?",
      p: [
        "Kelvin (K) cinsinden verilen renk sıcaklığı, ışığın rengini anlatır; ne kadar parlak olduğunu değil. 2.700–3.000 K sıcak (sarımsı), 4.000 K nötr beyaz, 5.000–6.500 K soğuk (mavimsi) beyaz olarak algılanır. Aynı 800 lümenlik iki ampulden soğuk beyaz olanı insanlara daha parlak gelebilir ama ölçülen lüks aynıdır.",
        "Renk sunum indeksi (CRI ya da Ra) ise ışığın nesnelerin renklerini ne kadar doğal gösterdiğini anlatır; 80 ve üzeri ev ve ofis için, 90 ve üzeri renk ayrımı önemli işler için tercih edilir. Kelvin, lümen ve CRI birlikte değerlendirildiğinde doğru lamba seçilir."
      ]
    },
    {
      h: "Işık ölçer (lüksmetre) uygulamaları güvenilir mi?",
      p: [
        "Telefonlardaki ortam ışığı sensörü, ekran parlaklığını ayarlamak için tasarlanmıştır; ölçüm cihazı değildir. Lüksmetre uygulamaları bu sensörü kullanır ve kalibre edilmiş bir cihaza göre belirgin sapma gösterebilir. Sensörün yeri, cam kaplama ve telefonun açısı sonucu etkiler.",
        "Yine de uygulamalar göreceli karşılaştırma için işe yarar: aynı telefonla, aynı açıyla iki noktayı ölçüp hangisinin daha aydınlık olduğunu görebilirsiniz. Kesin değer gereken iş yeri denetimleri ve aydınlatma projelerinde kalibre edilmiş bir lüksmetre kullanılmalıdır. Ölçümü telefon yatay tutularak, sensör ışığa bakacak şekilde, çalışma düzleminde yapın."
      ]
    }
  ],
  faq: [
    ["Lümen, lüks ve kandela neyi ölçer?", "Lümen kaynağın yaydığı toplam ışık akısını, kandela belirli bir yöndeki ışık şiddetini, lüks ise bir yüzeyin metrekaresine düşen ışığı ölçer. Ampul kutusunda lümen, fenerde kandela, masa üstünde lüks anlamlıdır."],
    ["Lümenden lükse nasıl geçilir?", "Lüks, lümenin aydınlatılan alana bölünmesiyle bulunur: 1 lüks = 1 lümen/m². 800 lümen 4 metrekareye eşit dağılırsa 200 lüks olur; gerçekte duvar ve armatür kayıpları nedeniyle değer daha düşüktür."],
    ["Işık şiddeti mesafenin karesiyle neden azalır?", "Işık kaynaktan uzaklaştıkça genişleyen bir alana yayılır ve bu alan mesafenin karesiyle büyür. Bu nedenle mesafe iki katına çıktığında aydınlık düzeyi dörtte birine iner; buna ters kare yasası denir."],
    ["Çalışma masası, mutfak ve koridor için kaç lüks önerilir?", "Yaygın öneriler okuma ve masa başı çalışma için yaklaşık 500 lüks, mutfak tezgâhı için 300–500 lüks, koridor ve merdivenler için 100–150 lüks civarındadır. Değerler çalışma düzleminde ölçülür."],
    ["Fener ve projektörlerde kandela neden önemlidir?", "Kandela ışığın tek yöndeki şiddetini gösterdiği için fenerin ne kadar uzağı aydınlatacağını belirler. Işın mesafesi yaklaşık 2 × √kandela formülüyle bulunur; 10.000 cd'lik fener yaklaşık 200 metreye ulaşır."],
    ["Watt değeri ışık miktarını gösterir mi?", "Göstermez. Watt lambanın çektiği elektriği gösterir; ışık miktarı lümenle ölçülür. LED'ler akkor ampullere göre aynı ışığı yaklaşık sekizde bir güçle ürettiği için parlaklığı lümene bakarak karşılaştırın."],
    ["Işık ölçer (lüksmetre) uygulamaları güvenilir mi?", "Telefon sensörleri ölçüm için kalibre edilmediğinden mutlak değerde sapma gösterebilir. Aynı telefonla göreceli karşılaştırma için kullanışlıdır; iş yeri denetimi ve aydınlatma projelerinde kalibre edilmiş cihaz gerekir."],
    ["Renk sıcaklığı (Kelvin) ile parlaklık farkı nedir?", "Kelvin ışığın rengini anlatır: düşük değerler sıcak sarı, yüksek değerler soğuk mavimsi beyazdır. Parlaklık ise lümen ve lüksle ölçülür; aynı lümendeki iki lamba farklı renk sıcaklığına sahip olabilir."],
    ["Oda için gereken toplam lümen nasıl bulunur?", "Hedef lüks değerini oda alanıyla çarpıp kullanım katsayısına bölün. Örneğin 12 metrekarelik çalışma odasında 500 lüks için 6.000 lümen ideal değerdir; 0,6 katsayıyla yaklaşık 10.000 lümen gerekir."]
  ],
  tools: ["lux-lumen-cevir", "isik-siddeti-mesafe-hesapla", "aydinlatma-lumen-hesapla"],
  related: ["oda-icin-kac-lumen-gerekir", "watt-amper-volt-iliskisi"],
  sources: [
    ["BIPM – SI temel birimleri: kandela", "https://www.bipm.org/en/measurement-units/si-base-units"],
    ["Türk Standardları Enstitüsü", "https://www.tse.org.tr/"]
  ]
};
