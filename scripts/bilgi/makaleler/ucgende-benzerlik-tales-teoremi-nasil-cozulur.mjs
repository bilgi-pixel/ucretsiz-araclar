export default {
  slug: "ucgende-benzerlik-tales-teoremi-nasil-cozulur",
  kategori: "egitim",
  tarih: "2026-11-16",
  title: "Üçgende Benzerlik ve Tales Teoremi: Kurallar, Oranlar ve Örnek Sorular",
  pageTitle: "Üçgende Benzerlik ve Tales Teoremi: Kurallar ve Çözümlü Sorular",
  description: "İki üçgen AA, KAK ya da KKK koşuluyla benzerdir. Benzerlik oranı, alanların oranı k², Tales teoremi, Öklid bağıntıları ve gölge sorularının çözümlü örnekleri.",
  keywords: ["üçgende benzerlik", "tales teoremi", "benzerlik oranı", "açı açı benzerliği", "kenar açı kenar benzerliği", "benzer üçgenlerde alan oranı", "benzerlik soruları", "temel orantı teoremi"],
  lead: "İki üçgen, karşılıklı açıları eşit ve karşılıklı kenarları orantılı olduğunda <strong>benzerdir</strong>; bunu göstermek için üç koşuldan biri yeter: <strong>açı-açı (AA)</strong>, <strong>kenar-açı-kenar (KAK)</strong> ya da <strong>kenar-kenar-kenar (KKK)</strong>. Benzer üçgenlerde kenarların oranı k ise alanların oranı k²'dir. Tales teoremi ise paralel doğruların kestiği doğru parçalarının orantılı olduğunu söyler. Bu sayfada kuralları, ispat mantığını ve LGS ile TYT tarzı çözümlü soruları adım adım veriyoruz.",
  kisaCevap: [
    "AA: İki üçgenin iki açısı eşitse üçüncü açılar da eşittir ve üçgenler benzerdir.",
    "KAK: İki kenar orantılı ve aradaki açı eşitse üçgenler benzerdir; KKK: üç kenar aynı oranla orantılıysa benzerdir.",
    "Benzerlik oranı k ise çevrelerin oranı k, alanların oranı k², benzer cisimlerde hacimlerin oranı k³'tür.",
    "Temel orantı teoremi: ABC üçgeninde DE ∥ BC ise AD ÷ DB = AE ÷ EC ve AD ÷ AB = DE ÷ BC olur.",
    "Tales teoremi: Paralel doğrular iki kesen doğru üzerinde orantılı doğru parçaları ayırır.",
    "Dik üçgende hipotenüse çizilen yükseklik için Öklid bağıntısı: h² = p × k (iki parça çarpımı)."
  ],
  figure: {
    alt: "Solda ABC üçgeni ve BC'ye paralel DE doğru parçası: AD 4, DB 6, AE 5, EC 7,5, DE 6, BC 15. Sağda gölge sorusu: 1,8 metrelik kişi 2,4 metre, ağaç 12 metre gölge; ağaç 9 metre.",
    caption: "Sol: DE ∥ BC olduğundan ADE ile ABC benzerdir ve benzerlik oranı 4 ÷ 10 = 2 ÷ 5'tir. Sağ: Güneş ışınları paralel geldiği için kişi ve ağacın oluşturduğu üçgenler benzerdir. Sayılar metindeki çözümlü örneklerle aynıdır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="30" class="lg b mid">Temel orantı (DE ∥ BC)</text>
  <polygon points="180,60 60,340 340,340" class="ps"/>
  <polygon points="180,60 60,340 340,340" class="sp sw" fill="none"/>
  <line x1="132" y1="172" x2="244" y2="172" class="sa sw" fill="none"/>
  <circle cx="180" cy="60" r="4" class="p"/><circle cx="132" cy="172" r="4" class="p"/><circle cx="244" cy="172" r="4" class="p"/>
  <text x="180" y="50" class="b mid">A</text>
  <text x="48" y="360" class="b">B</text><text x="342" y="360" class="b">C</text>
  <text x="118" y="176" class="b end">D</text><text x="256" y="176" class="b">E</text>
  <g class="sm b">
    <text x="140" y="120" class="end">AD = 4</text>
    <text x="88" y="262" class="end">DB = 6</text>
    <text x="220" y="120">AE = 5</text>
    <text x="300" y="262">EC = 7,5</text>
    <text x="188" y="164" class="mid p">DE = 6</text>
    <text x="200" y="384" class="mid">BC = 15</text>
  </g>
  <line x1="390" y1="20" x2="390" y2="390" class="sb dash" fill="none"/>
  <text x="560" y="30" class="lg b mid">Gölge ile yükseklik</text>
  <line x1="410" y1="340" x2="700" y2="340" class="st" fill="none"/>
  <line x1="440" y1="340" x2="440" y2="292" class="sp sw" fill="none"/>
  <line x1="440" y1="292" x2="504" y2="340" class="st dash" fill="none"/>
  <text x="432" y="312" class="sm end">1,8 m</text>
  <text x="472" y="360" class="sm mid">2,4 m</text>
  <line x1="520" y1="340" x2="520" y2="100" class="sok sw" fill="none"/>
  <circle cx="520" cy="100" r="22" class="oks"/>
  <line x1="520" y1="100" x2="690" y2="340" class="st dash" fill="none"/>
  <text x="512" y="230" class="sm end b ok">h = ?</text>
  <text x="605" y="360" class="sm mid">12 m gölge</text>
  <text x="560" y="384" class="sm mid b">h = 1,8 × 12 ÷ 2,4 = 9 m</text>
</svg>`
  },
  sections: [
    {
      h: "Benzerlik nedir? Eşlik ile farkı",
      p: [
        "İki şekil, biri diğerinin büyütülmüş ya da küçültülmüş kopyası olduğunda <strong>benzerdir</strong>. Üçgenlerde bu, karşılıklı açıların eşit, karşılıklı kenarların ise aynı oranla orantılı olması demektir. ABC üçgeni DEF üçgenine benzerse bu durum ABC ∼ DEF biçiminde yazılır ve harflerin sırası hangi köşenin hangisine karşılık geldiğini gösterir: A ile D, B ile E, C ile F eşleşir.",
        "<strong>Eşlik</strong> ise benzerliğin özel bir hâlidir: kenarlar yalnızca orantılı değil, birebir eşittir; yani benzerlik oranı 1'dir. Eş üçgenlerin şekli de boyutu da aynıdır, benzer üçgenlerin yalnızca şekli aynıdır. Bu yüzden her eş üçgen çifti benzerdir, ama her benzer üçgen çifti eş değildir."
      ]
    },
    {
      h: "İki üçgen hangi durumlarda benzerdir? AA, KAK, KKK",
      table: {
        head: ["Kural", "Koşul", "Ne zaman kullanılır?"],
        rows: [
          ["Açı-Açı (AA)", "İki açı karşılıklı eşit", "Paralel doğrular, ortak açı, dik açılar varsa"],
          ["Kenar-Açı-Kenar (KAK)", "İki kenar orantılı ve aralarındaki açı eşit", "Ortak bir açının iki kolundaki uzunluklar biliniyorsa"],
          ["Kenar-Kenar-Kenar (KKK)", "Üç kenar aynı oranla orantılı", "Tüm kenar uzunlukları verilmişse"]
        ],
        caption: "AA kuralında üçüncü açının eşitliği iç açılar toplamının 180° olmasından kendiliğinden gelir."
      },
      after: [
        "Sorularda en sık karşılaşılan durum AA'dır. Paralel doğruların oluşturduğu yöndeş ve iç ters açılar, iki üçgenin ortak açısı ya da iki dik açı genellikle iki eşit açıyı hazır verir. Açı ilişkilerini hatırlamak için [[bilgi:ucgende-acilar|üçgende açılar]] yazımıza bakabilirsiniz.",
        "KAK kuralında açının orantılı kenarların <strong>arasında</strong> olması şarttır. İki kenar orantılı ama eşit açı bu kenarların arasında değilse benzerlik kesinleşmez. KKK'de ise üç oranın birbirine eşit olduğunu tek tek kontrol etmek gerekir: 4, 6, 8 ve 6, 9, 12 kenarlı üçgenlerde her oran 2 ÷ 3 olduğu için üçgenler benzerdir."
      ]
    },
    {
      h: "Benzerlik oranı nasıl bulunur? Çözümlü örnek",
      p: [
        "Benzerlik oranı k, karşılıklı kenarlardan herhangi birinin oranıdır. Hangi kenarın hangisine karşılık geldiğini doğru eşleştirmek, sorunun en kritik adımıdır: eşit açıların karşısındaki kenarlar birbirine karşılık gelir."
      ],
      ol: [
        "ABC ∼ DEF veriliyor; AB = 6, DE = 9, BC = 8.",
        "Benzerlik oranı k = AB ÷ DE = 6 ÷ 9 = 2 ÷ 3'tür.",
        "BC'ye karşılık gelen kenar EF'dir: BC ÷ EF = 2 ÷ 3 → 8 ÷ EF = 2 ÷ 3 → EF = 12.",
        "ABC'nin çevresi 24 ise DEF'nin çevresi 24 × 3 ÷ 2 = 36 olur; çevreler de aynı oranla büyür."
      ],
      after: [
        "Oran-orantı adımlarını kontrol etmek için [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] aracını, içler-dışlar çarpımı yöntemini hatırlamak için [[bilgi:oran-oranti-nasil-cozulur|oran orantı]] yazımızı kullanabilirsiniz."
      ]
    },
    {
      h: "Benzer üçgenlerde alanların oranı neden k²'dir?",
      p: [
        "Bir üçgenin alanı taban × yükseklik ÷ 2'dir. İki benzer üçgende hem taban hem de o tabana ait yükseklik aynı k oranıyla büyür. Alan bu iki uzunluğun çarpımı olduğu için alanlar k × k = <strong>k²</strong> oranıyla büyür. Aynı mantıkla benzer cisimlerde hacim üç uzunluğun çarpımı olduğundan hacimlerin oranı <strong>k³</strong>'tür."
      ],
      formula: "Kenar oranı = k\nÇevre oranı = k\nAlan oranı = k²\nHacim oranı (benzer cisimler) = k³",
      ol: [
        "Yukarıdaki örnekte ABC ∼ DEF ve k = 2 ÷ 3'tü.",
        "Alanların oranı (2 ÷ 3)² = 4 ÷ 9 olur.",
        "ABC'nin alanı 20 birimkare ise DEF'nin alanı 20 × 9 ÷ 4 = 45 birimkaredir.",
        "Dikkat: kenarlar 1,5 kat büyürken alan 2,25 kat büyümüştür; alanı da 1,5 katına çıkarmak sık yapılan bir hatadır."
      ],
      after: [
        "Üçgen alanını farklı yöntemlerle hesaplamak için [[arac:ucgen-alani-hesapla|Üçgen Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Temel orantı ve Tales teoremi: paralel doğrularla kullanım",
      p: [
        "Bir üçgende bir kenara paralel çizilen doğru, diğer iki kenarı orantılı parçalara ayırır. Bu, <strong>temel orantı teoremi</strong> olarak bilinir ve Türkiye'de çoğu zaman Tales teoremiyle birlikte anılır. ABC üçgeninde D noktası AB, E noktası AC üzerinde ve DE ∥ BC ise ADE üçgeni ABC'ye benzerdir (AA: A ortak açı, yöndeş açılar eşit)."
      ],
      formula: "AD ÷ DB = AE ÷ EC\nAD ÷ AB = AE ÷ AC = DE ÷ BC",
      ol: [
        "AD = 4, DB = 6, AE = 5 veriliyor; EC isteniyor.",
        "AD ÷ DB = AE ÷ EC → 4 ÷ 6 = 5 ÷ EC → 4 × EC = 30 → EC = 7,5.",
        "BC = 15 ise DE'yi bulmak için büyük üçgenle oran kurulur: AD ÷ AB = 4 ÷ 10 = 2 ÷ 5.",
        "DE ÷ BC = 2 ÷ 5 → DE = 15 × 2 ÷ 5 = 6.",
        "Uyarı: DE ÷ BC oranında DB değil AB kullanılır; çünkü DE küçük üçgenin, BC büyük üçgenin kenarıdır."
      ],
      after: [
        "Genel <strong>Tales teoremi</strong> ise üçgen olmadan da çalışır: üç ya da daha fazla paralel doğru iki kesen doğruyu kestiğinde, kesenler üzerinde oluşan parçalar orantılıdır. Örneğin paralel doğrular birinci kesen üzerinde 3 ve 5 birimlik parçalar ayırıyorsa, ikinci kesen üzerinde 4,5 birimlik parçanın yanındaki parça 4,5 × 5 ÷ 3 = 7,5 birimdir."
      ]
    },
    {
      h: "Kelebek benzerliği: kesişen doğrularda oran",
      p: [
        "AB ve CD paralel iki doğru parçası, AC ve BD de bunların uçlarını çapraz birleştiren ve E noktasında kesişen doğru parçaları olsun. Oluşan ABE ve CDE üçgenleri ters dönmüş biçimde benzerdir: E'deki ters açılar eşittir, paralellik nedeniyle iç ters açılar da eşittir (AA). Bu şekle görünüşünden dolayı kelebek benzerliği denir."
      ],
      ol: [
        "AB = 6, CD = 9 ve AE = 4 verilsin; EC isteniyor.",
        "Benzerlik oranı AB ÷ CD = 6 ÷ 9 = 2 ÷ 3'tür.",
        "AE'nin karşılığı CE'dir: AE ÷ CE = 2 ÷ 3 → 4 ÷ CE = 2 ÷ 3 → CE = 6.",
        "Alanlar da (2 ÷ 3)² = 4 ÷ 9 oranındadır; ABE'nin alanı 8 ise CDE'nin alanı 18 olur."
      ]
    },
    {
      h: "Gölge ve yükseklik soruları benzerlikle nasıl çözülür?",
      p: [
        "Güneş ışınları Dünya'ya pratikte paralel ulaşır. Aynı anda ölçülen bir direk ile onun gölgesi, bir ağaç ile onun gölgesiyle benzer dik üçgenler oluşturur: ikisinde de dik açı ve ışının yere yaptığı açı ortaktır (AA). Bu yüzden yükseklik ÷ gölge oranı aynı anda her nesne için aynıdır."
      ],
      formula: "Kişinin boyu ÷ kişinin gölgesi = ağacın boyu ÷ ağacın gölgesi",
      ol: [
        "Boyu 1,8 m olan bir kişinin gölgesi 2,4 m, aynı anda bir ağacın gölgesi 12 m ölçülüyor.",
        "1,8 ÷ 2,4 = h ÷ 12 orantısı kurulur.",
        "h = 1,8 × 12 ÷ 2,4 = 21,6 ÷ 2,4 = 9 m bulunur.",
        "Benzer biçimde ayna soruları da çözülür: ışığın gelme ve yansıma açıları eşit olduğu için aynaya bakan kişi ile yüksek bir nesnenin oluşturduğu üçgenler benzerdir."
      ]
    },
    {
      h: "Öklid bağıntıları benzerlikten nasıl çıkar?",
      p: [
        "Bir dik üçgende dik köşeden hipotenüse indirilen yükseklik, büyük üçgeni iki küçük dik üçgene böler. Bu üç üçgenin hepsi birbirine benzerdir (her birinde bir dik açı ve bir ortak açı vardır). Benzerlik oranlarından şu bağıntılar çıkar:"
      ],
      formula: "A açısı 90°, AH ⊥ BC, BH = p, HC = k\nAH² = p × k\nAB² = p × BC\nAC² = k × BC",
      ol: [
        "BH = 4 ve HC = 9 verilsin; BC = 13 olur.",
        "AH² = 4 × 9 = 36 → AH = 6.",
        "AB² = 4 × 13 = 52 → AB = 2√13 ≈ 7,21; AC² = 9 × 13 = 117 → AC = 3√13 ≈ 10,82.",
        "Kontrol: AB² + AC² = 52 + 117 = 169 = 13² olduğundan Pisagor bağıntısı da sağlanır."
      ],
      after: [
        "Dik üçgen hesaplarını [[arac:dik-ucgen-hesapla|Dik Üçgen Hesaplama]] ve [[arac:pisagor-teoremi-hesapla|Pisagor Teoremi Hesaplama]] araçlarıyla kontrol edebilir, teoremin ayrıntısını [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] yazımızda okuyabilirsiniz."
      ]
    },
    {
      h: "LGS ve TYT'de benzerlik soruları nasıl gelir? Sık yapılan hatalar",
      p: [
        "LGS'de benzerlik genellikle günlük hayat bağlamında sorulur: gölge, harita ölçeği, fotoğraf büyütme, merdiven ve rampa. TYT ve AYT'de ise iç içe üçgenler, paralel doğrular, kelebek benzerliği (iki paralel doğru arasında çapraz kesişen doğruların oluşturduğu ters üçgenler) ve alan oranları öne çıkar. Ölçek soruları da aslında benzerliktir; [[bilgi:harita-olcegi-nasil-hesaplanir|harita ölçeği]] yazımız bu bağlantıyı gösterir."
      ],
      ul: [
        "<strong>Yanlış eşleştirme:</strong> Kenarları eşit açıların karşısına göre eşleştirin; şekildeki görünüşe güvenmeyin.",
        "<strong>Parça ile bütünü karıştırmak:</strong> DE ÷ BC oranında AD ÷ AB kullanılır, AD ÷ DB değil.",
        "<strong>Alanı k ile büyütmek:</strong> Alanlar k², hacimler k³ oranında değişir.",
        "<strong>KAK'de açının yerini kontrol etmemek:</strong> Eşit açı orantılı iki kenarın arasında olmalıdır.",
        "<strong>Birimi unutmak:</strong> Gölge sorularında tüm uzunlukları aynı birime çevirin."
      ]
    }
  ],
  faq: [
    ["İki üçgen hangi durumlarda benzerdir?", "İki açısı eşit olan, iki kenarı orantılı ve aradaki açısı eşit olan ya da üç kenarı aynı oranla orantılı olan üçgenler benzerdir. Bu koşullar sırasıyla AA, KAK ve KKK benzerlik kuralları olarak bilinir."],
    ["Açı-açı, kenar-açı-kenar ve kenar-kenar-kenar benzerliği nedir?", "AA'da iki açının eşitliği yeter. KAK'de iki kenar orantılı ve bu kenarların arasındaki açı eşit olmalıdır. KKK'de üç kenarın oranlarının hepsi birbirine eşit olmalıdır."],
    ["Benzerlik oranı nasıl bulunur?", "Eşit açıların karşısındaki kenarlar eşleştirilir ve herhangi bir karşılıklı kenar çiftinin oranı alınır. Örneğin AB 6 ve karşılığı DE 9 ise benzerlik oranı 2 bölü 3'tür."],
    ["Benzer üçgenlerde alanların oranı neden benzerlik oranının karesidir?", "Alan taban ile yüksekliğin çarpımına bağlıdır ve iki uzunluk da k oranında büyür. Bu yüzden alan k çarpı k, yani k kare oranında değişir; oran 2 bölü 3 ise alanlar 4 bölü 9 oranındadır."],
    ["Tales teoremi nedir, paralel doğrularla nasıl kullanılır?", "Paralel doğrular iki kesen doğru üzerinde orantılı parçalar ayırır. Üçgende bir kenara paralel çizilen doğru diğer iki kenarı orantılı böler; AD bölü DB, AE bölü EC'ye eşit olur."],
    ["Öklid bağıntıları benzerlikten nasıl çıkar?", "Dik üçgende hipotenüse indirilen yükseklik birbirine benzer üç dik üçgen oluşturur. Bu benzerliklerden yüksekliğin karesinin iki parçanın çarpımına eşit olduğu ve dik kenarların karesinin parça çarpı hipotenüse eşit olduğu bağıntıları çıkar."],
    ["Gölge ve yükseklik soruları benzerlikle nasıl çözülür?", "Güneş ışınları paralel geldiği için aynı anda ölçülen nesnelerin yükseklik bölü gölge oranı eşittir. 1,8 metrelik kişinin gölgesi 2,4 metre, ağacın gölgesi 12 metreyse ağaç 9 metredir."],
    ["Eşlik ile benzerlik arasındaki fark nedir?", "Eş üçgenlerde kenarlar birebir eşittir, benzerlik oranı 1'dir. Benzer üçgenlerde ise şekil aynıdır ama boyut farklı olabilir; her eş üçgen çifti benzerdir, her benzer çift eş değildir."],
    ["LGS ve TYT'de benzerlik soruları nasıl gelir?", "LGS'de gölge, ölçek ve fotoğraf büyütme gibi günlük hayat bağlamları öne çıkar. TYT ve AYT'de iç içe üçgenler, paralel doğrular, kelebek benzerliği ve alan oranları sık sorulur."]
  ],
  tools: ["oran-oranti-hesapla", "ucgen-alani-hesapla", "dik-ucgen-hesapla", "pisagor-teoremi-hesapla"],
  related: ["ucgende-acilar", "pisagor-teoremi-nedir", "oran-oranti-nasil-cozulur", "harita-olcegi-nasil-hesaplanir"],
  sources: [
    ["MEB – Matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
