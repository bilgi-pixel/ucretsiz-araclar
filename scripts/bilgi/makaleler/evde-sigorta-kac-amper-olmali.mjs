export default {
  slug: "evde-sigorta-kac-amper-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Evde Sigorta Kaç Amper Olmalı? Hat Başına Watt, Kablo ve Kaçak Akım",
  pageTitle: "Evde Sigorta Kaç Amper Olmalı? Hat Başına Watt ve Kablo",
  description: "Konutlarda aydınlatma hatları genellikle 10 A, priz hatları 16 A sigortayla korunur; 16 A hat 230 V'ta en fazla yaklaşık 3.680 W taşır. Kablo, B-C tipi ve kaçak akım.",
  keywords: ["sigorta kaç amper olmalı", "16 amper sigorta kaç watt", "ev sigortası amper", "sigorta neden atar", "kaçak akım rölesi 30 ma", "sigorta kablo kesiti", "b ve c tipi sigorta", "çamaşır makinesi ayrı hat"],
  lead: "Konutlarda aydınlatma hatları genellikle <strong>10 A</strong> sigortayla ve 1,5 mm² kabloyla, priz hatları <strong>16 A</strong> sigortayla ve 2,5 mm² kabloyla korunur; fırın, klima, çamaşır ve bulaşık makinesi gibi yüksek güçlü cihazlar için çoğunlukla ayrı hat çekilir. 16 A'lik bir hattan 230 V'ta en fazla yaklaşık <strong>3.680 W</strong> sürekli güç çekilebilir. Sigortanın değerini kabloyu korumak belirler; sigortayı \"atıyor\" diye büyütmek yangın riskini artırır. Bu sayfada hat başına güç hesabını, kablo uyumunu, B ve C tipi farkını ve kaçak akım rölesini anlatıyoruz.",
  kisaCevap: [
    "Güç sınırı (W) = sigorta akımı (A) × 230 V: 10 A ≈ 2.300 W, 16 A ≈ 3.680 W, 20 A ≈ 4.600 W, 25 A ≈ 5.750 W.",
    "Temel kural: yük akımı ≤ sigorta anma akımı ≤ kablonun akım taşıma kapasitesi.",
    "Tipik eşleşme: 1,5 mm² kablo – 10 A, 2,5 mm² – 16 A, 4 mm² – 20/25 A; kesin seçim döşeme şekline göre yetkili elektrikçi ya da mühendis tarafından yapılır.",
    "B tipi sigorta anma akımının 3–5 katında, C tipi 5–10 katında anlık açar; konutlarda priz ve aydınlatmada genellikle B tipi kullanılır.",
    "30 mA kaçak akım rölesi, insan vücudu üzerinden toprağa akan tehlikeli akımı algılayıp devreyi keserek hayat koruma sağlar.",
    "Sigorta değiştirme, hat ekleme ve pano işleri yalnızca yetkili elektrikçi tarafından yapılmalıdır."
  ],
  figure: {
    alt: "Bir konut panosunda örnek hat düzeni: aydınlatma 10 A ve 1,5 mm² kablo en fazla 2.300 W; priz hatları 16 A ve 2,5 mm² en fazla 3.680 W; çamaşır makinesi ve klima ayrı 16 A hat; fırın 20 A ve 4 mm²; tüm hatların önünde 30 mA kaçak akım rölesi.",
    caption: "Örnek bir düzendir; gerçek değerler projeye, kablonun döşeme şekline ve hat uzunluğuna göre yetkili elektrikçi ya da elektrik mühendisi tarafından belirlenir. Watt değerleri 230 V ve güç faktörü 1 kabulüyle hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Konut panosu: örnek hat düzeni</text>
  <rect x="30" y="52" width="660" height="44" rx="8" class="p"/>
  <text x="360" y="80" class="b mid sf">Ana şalter → 30 mA kaçak akım rölesi (hayat koruma)</text>
  <g class="sm">
    <rect x="30" y="110" width="660" height="40" rx="6" class="sf sb"/>
    <text x="44" y="135" class="b">Aydınlatma</text><text x="250" y="135">B 10 A · 1,5 mm²</text><text x="676" y="135" class="end b">en fazla ~2.300 W</text>
    <rect x="30" y="158" width="660" height="40" rx="6" class="sf sb"/>
    <text x="44" y="183" class="b">Priz hattı (salon, odalar)</text><text x="250" y="183">B 16 A · 2,5 mm²</text><text x="676" y="183" class="end b">en fazla ~3.680 W</text>
    <rect x="30" y="206" width="660" height="40" rx="6" class="sf sb"/>
    <text x="44" y="231" class="b">Mutfak prizleri</text><text x="250" y="231">B 16 A · 2,5 mm²</text><text x="676" y="231" class="end b">en fazla ~3.680 W</text>
    <rect x="30" y="254" width="660" height="40" rx="6" class="ps"/>
    <text x="44" y="279" class="b">Çamaşır / bulaşık / klima</text><text x="250" y="279">her biri ayrı 16 A · 2,5 mm²</text><text x="676" y="279" class="end b">tek cihaz</text>
    <rect x="30" y="302" width="660" height="40" rx="6" class="ps"/>
    <text x="44" y="327" class="b">Fırın / ocak</text><text x="250" y="327">20–25 A · 4 mm² (projeye göre)</text><text x="676" y="327" class="end b">~4.600–5.750 W</text>
  </g>
  <rect x="30" y="352" width="660" height="38" rx="8" class="dgs"/>
  <text x="360" y="376" class="sm mid b">Sigortayı kabloya göre seçin; atan sigortayı büyütmek kabloyu korumasız bırakır.</text>
</svg>`
  },
  sections: [
    {
      h: "Sigorta ne işe yarar? Önce kabloyu korur",
      p: [
        "Evlerdeki otomatik sigortalar (minyatür devre kesiciler), bir hattan geçen akım güvenli sınırı aştığında devreyi keserek kablonun aşırı ısınmasını ve yangını önler. Sigortanın asıl korumakla görevli olduğu şey cihaz değil, <strong>kablodur</strong>: duvarın içindeki kablo ne kadar akım taşıyabiliyorsa, onu koruyan sigortanın değeri de buna göre seçilir.",
        "Bu yüzden \"sigorta kaç amper olmalı\" sorusunun cevabı, o hatta hangi kesitte kablo döşendiğine, kablonun duvarda nasıl geçtiğine ve hattın uzunluğuna bağlıdır. Elektrik İç Tesisleri Yönetmeliği ve ilgili standartlar bu seçimin çerçevesini çizer; uygulamayı ise yetkili bir elektrikçi ya da büyük tesisatlarda elektrik mühendisi yapar.",
        "Kaçak akım rölesi ise farklı bir korumadır: aşırı akıma değil, akımın bir kısmının yalıtım hatası ya da bir insan vücudu üzerinden toprağa kaçmasına tepki verir. Bir konutta iki koruma birlikte bulunmalıdır."
      ]
    },
    {
      h: "16 A sigorta en fazla kaç watt taşır?",
      p: [
        "Tek fazlı konut tesisatında gerilim 230 V'tur. Bir hattan çekilebilecek güç, sigortanın anma akımı ile gerilimin çarpımına yaklaşık eşittir. Rezistanslı cihazlarda (su ısıtıcı, fırın, ütü) güç faktörü 1'e yakın olduğu için bu hesap doğrudan kullanılabilir; motorlu ve elektronik cihazlarda gerçek akım biraz daha yüksek olabilir."
      ],
      formula: "Güç (W) ≈ akım (A) × gerilim (V) × güç faktörü\nKonut, tek faz: P ≈ I × 230\nAkım: I = P ÷ 230   (örnek: 2.000 W ÷ 230 ≈ 8,7 A)",
      table: {
        head: ["Sigorta", "230 V'ta yaklaşık sınır", "Tipik kullanım", "Tipik kablo"],
        rows: [
          ["6 A", "1.380 W", "Bazı aydınlatma hatları", "1,5 mm²"],
          ["10 A", "2.300 W", "Aydınlatma", "1,5 mm²"],
          ["16 A", "3.680 W", "Priz hatları, çamaşır, bulaşık, klima", "2,5 mm²"],
          ["20 A", "4.600 W", "Fırın, ankastre ocak (projeye göre)", "4 mm²"],
          ["25 A", "5.750 W", "Ocak, yüksek güçlü cihaz (projeye göre)", "4–6 mm²"]
        ],
        caption: "Sınırlar sürekli yük için yaklaşık değerlerdir. Kablo eşleşmeleri örnektir; kablonun döşeme şekli, ortam sıcaklığı ve hat uzunluğu seçimi değiştirir."
      },
      after: [
        "Amper ve watt arasında hızlı çevirme için [[arac:amper-watt-cevir|Amper Watt Çevirici]], kilovat cinsinden güç için [[arac:kw-amper-cevir|kW Amper Çevirici]] aracını kullanabilirsiniz. Watt, amper ve volt ilişkisinin ayrıntısı [[bilgi:watt-amper-volt-iliskisi|watt, amper, volt ilişkisi]] yazısındadır."
      ]
    },
    {
      h: "Aynı anda çalışan cihazların toplam gücü nasıl hesaplanır?",
      p: [
        "Bir priz hattına birden çok priz bağlıdır ve sigorta, o hattaki tüm prizlerden aynı anda çekilen toplam akımı görür. Mutfakta sabah aynı anda çalışan cihazlar çoğu zaman sınırı aşar."
      ],
      ol: [
        "Aynı hattaki cihazların etiket güçlerini toplayın: su ısıtıcı 2.000 W + tost makinesi 1.500 W + mikrodalga fırın 1.000 W = 4.500 W.",
        "Toplam akımı bulun: 4.500 ÷ 230 ≈ 19,6 A.",
        "Sigortayla karşılaştırın: 19,6 A, 16 A sigortanın üzerindedir; sigorta kısa sürede atar.",
        "Çözüm: cihazlardan birini başka bir hattaki prize taşıyın ya da aynı anda çalıştırmayın. Sigortayı 20 A'ye çıkarmak çözüm değildir; 2,5 mm² kablo bu yükte gereğinden fazla ısınabilir.",
        "Sürekli bu tür bir yük oluşuyorsa, yetkili elektrikçiye mutfak için ek bir priz hattı planlatın."
      ],
      after: [
        "Cihazların gerçek gücünü ve akımını görmek için [[arac:elektrik-gucu-hesapla|Elektrik Gücü Hesaplama]] aracını kullanabilirsiniz. Hangi ev aletinin ne kadar güç çektiğini [[bilgi:hangi-ev-aleti-ne-kadar-elektrik-harcar|hangi ev aleti ne kadar elektrik harcar]] yazısında listeledik."
      ]
    },
    {
      h: "Fırın, klima ve çamaşır makinesi ayrı hat ister mi?",
      p: [
        "Isıtıcı rezistanslı ve uzun süre çalışan cihazlar, tek başlarına bir priz hattının kapasitesinin büyük kısmını kullanır. Bu nedenle yeni tesisatlarda çamaşır makinesi, bulaşık makinesi, kurutma makinesi, split klima ve fırın için genellikle <strong>ayrı hat</strong> öngörülür. Ankastre ocak ve fırınlar daha yüksek güç çekebildiği için kesitleri ve sigortaları projeye göre seçilir; bazı ankastre ocaklar üç fazlı bağlantı gerektirebilir.",
        "Ayrı hat, hem sigortanın gereksiz yere atmasını hem de uzatma kablosu ve çoklu priz kullanımını önler. Eski binalarda bu cihazlar ortak bir priz hattına bağlıysa ve sigorta sık atıyorsa, çözüm sigortayı büyütmek değil, yetkili elektrikçiye yeni hat çekme ihtiyacını değerlendirtmektir."
      ],
      ul: [
        "Çamaşır makinesi, ısıtma sırasında 2.000–2.500 W çekebilir; aynı hatta ütü ya da ısıtıcı çalışırsa sınır aşılır.",
        "Banyo ve ıslak hacimlerdeki prizler, kaçak akım koruması ve uygun koruma sınıfı açısından ayrıca önemlidir.",
        "Yüksek güçlü cihazları uzatma kablosu ya da çoklu prizle çalıştırmak, ince kesitli kablonun ısınmasına yol açabilir."
      ]
    },
    {
      h: "Kablo kesiti ile sigorta değeri nasıl uyumlu seçilir?",
      p: [
        "Seçim üç adımlı bir zincirdir: önce hattın taşıyacağı yük akımı (I<sub>B</sub>) bulunur, sonra bu akımın üzerinde bir sigorta anma akımı (I<sub>n</sub>) seçilir, en son kablonun döşeme şekline göre akım taşıma kapasitesinin (I<sub>Z</sub>) sigorta değerinin üzerinde olduğu doğrulanır. Ayrıca uzun hatlarda gerilim düşümü kontrol edilir; hat uzadıkça daha kalın kablo gerekebilir."
      ],
      formula: "I_B ≤ I_n ≤ I_Z\nYük akımı ≤ sigorta anma akımı ≤ kablonun akım taşıma kapasitesi\nÖrnek: 13 A fırın ≤ 16 A sigorta ≤ 2,5 mm² kablonun kapasitesi",
      after: [
        "Kablonun duvar içinde boruda mı, ısı yalıtımlı bir duvarda mı geçtiği, aynı boruda kaç kablo olduğu ve ortam sıcaklığı akım taşıma kapasitesini değiştirir. Hesabın ayrıntısını [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısında anlattık. [[arac:kablo-kesiti-hesapla|Kablo Kesiti Hesaplama]] aracı gerilim düşümüne göre kesit verir; akım taşıma kapasitesi ve sigorta uyumunu ayrıca kontrol etmek gerekir."
      ],
      note: "Kesit ve sigorta seçimi can güvenliğini doğrudan etkiler. Bu sayfadaki değerler genel bilgi içindir; uygulamada yetkili elektrikçi ve geçerli yönetmelik esas alınır."
    },
    {
      h: "B ve C tipi sigorta farkı nedir?",
      p: [
        "Otomatik sigortalar iki mekanizmayla çalışır: uzun süreli aşırı yüke karşı ısıl (termik) koruma ve kısa devreye karşı anlık (manyetik) koruma. Sigortanın tipi, anlık korumanın hangi akımda devreye girdiğini belirler."
      ],
      table: {
        head: ["Tip", "Anlık açma akımı", "Tipik kullanım"],
        rows: [
          ["B", "Anma akımının 3–5 katı", "Konut priz ve aydınlatma hatları"],
          ["C", "Anma akımının 5–10 katı", "Kalkış akımı yüksek motorlu yükler, bazı ticari tesisler"],
          ["D", "Anma akımının 10–20 katı", "Yüksek kalkış akımlı endüstriyel yükler"]
        ],
        caption: "16 A'lik B tipi sigorta yaklaşık 48–80 A'de, C tipi yaklaşık 80–160 A'de anlık açar."
      },
      after: [
        "Konutlarda B tipi tercih edilir, çünkü kısa devrede daha düşük akımda ve daha hızlı açar. Motor kalkışında kısa süreli yüksek akım çeken bazı cihazlarda C tipi kullanılabilir; ama tip değiştirmek kararı da tesisatın kısa devre koşulları dikkate alınarak elektrikçi tarafından verilmelidir."
      ]
    },
    {
      h: "Kaçak akım rölesi (30 mA) ne işe yarar? Sigorta neden sık atar?",
      p: [
        "Kaçak akım rölesi, hattan çıkan ve hatta geri dönen akımı karşılaştırır. Arada bir fark varsa, yani akımın bir kısmı yalıtım hatası ya da bir insanın vücudu üzerinden toprağa kaçıyorsa, devreyi milisaniyeler içinde keser. <strong>30 mA</strong> hassasiyetli röleler hayat koruma amaçlıdır; insanın elektrik çarpmasından ciddi zarar görmesini önlemeye yöneliktir. 300 mA gibi daha yüksek değerler ise yangın koruma amaçlı kullanılır. Rölenin üzerindeki test düğmesine ayda bir basmak, mekanizmanın çalıştığını kontrol etmenin basit yoludur."
      ],
      ul: [
        "<strong>Aşırı yük:</strong> Aynı hatta çok sayıda cihaz çalışıyorsa sigorta birkaç saniye ya da dakika sonra atar.",
        "<strong>Kısa devre:</strong> Bir cihaz, kablo ya da priz içinde faz ile nötr temas ederse sigorta anında atar.",
        "<strong>Kaçak akım:</strong> Kaçak akım rölesi atıyorsa genellikle nemli priz, arızalı ısıtıcı rezistansı, yıpranmış kablo ya da yalıtımı bozulmuş bir cihaz vardır.",
        "<strong>Gevşek bağlantı:</strong> Pano ya da prizlerdeki gevşek klemensler ısınmaya ve tekrarlayan açmaya yol açabilir.",
        "<strong>Yaşlanmış sigorta:</strong> Eski sigortalar zamanla erken açabilir; değişimi elektrikçi yapmalıdır."
      ],
      after: [
        "Sigorta atınca önce o hattaki cihazları prizden çekin, sigortayı kaldırın ve cihazları tek tek takarak sorunlu olanı bulun. Sigorta hiçbir cihaz takılı değilken de atıyorsa ya da kaçak akım rölesi tekrar tekrar açıyorsa tesisatta arıza olabilir; sigortayı zorlamayın, panoya dokunmayın ve yetkili elektrikçi çağırın. Yanık kokusu, ısınan priz ya da kararmış kapak gördüğünüzde hattı kapatıp kullanmayı bırakın."
      ]
    },
    {
      h: "Elektrik işleri için neden yetkili elektrikçi gerekir?",
      p: [
        "Elektrik tesisatında yapılan bir hata, çoğu zaman hemen değil, aylar sonra bir ısınma, yangın ya da elektrik çarpması olarak ortaya çıkar. Sigorta değerini yükseltmek, kaçak akım rölesini devreden çıkarmak, topraklamayı atlamak ya da yetersiz kesitli kabloyla yeni priz eklemek tesisatın görünürde çalışmasına engel olmaz, ama koruma zincirini bozar.",
        "Bu nedenle pano üzerinde çalışma, yeni hat çekme, sigorta ya da röle değiştirme işlerini ehliyetli bir elektrikçiye yaptırın. Kiracıysanız tesisat değişikliği için ev sahibinden izin alın; site ve apartmanlarda ortak alan tesisatına müdahale yönetimin onayını gerektirir. Çalışmadan önce ilgili sigortanın kapatıldığından ve hattın enerjisiz olduğundan bir ölçü aletiyle emin olunması, profesyonel uygulamanın temel kuralıdır."
      ],
      ul: [
        "<strong>Hata:</strong> Sık atan sigortayı daha büyük değerliyle değiştirmek.",
        "<strong>Hata:</strong> Kaçak akım rölesini \"çok atıyor\" diye köprülemek.",
        "<strong>Hata:</strong> Yüksek güçlü cihazları çoklu prize bağlamak.",
        "<strong>Hata:</strong> Islak elle pano ya da sigortaya dokunmak."
      ]
    }
  ],
  faq: [
    ["Evlerde aydınlatma ve priz hatlarında genelde kaç amperlik sigorta kullanılır?", "Konutlarda aydınlatma hatları genellikle 10 A sigortayla ve 1,5 mm² kabloyla, priz hatları 16 A sigortayla ve 2,5 mm² kabloyla korunur. Kesin değeri kablonun kesiti ve döşeme şekli belirler; seçimi yetkili elektrikçi yapmalıdır."],
    ["16 A sigorta en fazla kaç watt taşır?", "230 V'luk tek fazlı konut tesisatında 16 A sigorta yaklaşık 16 × 230 = 3.680 W sürekli yük taşır. Bu toplam, aynı hattaki tüm prizlere bağlı cihazlar için geçerlidir; sınır aşıldığında sigorta kabloyu korumak için devreyi keser."],
    ["Fırın, klima ve çamaşır makinesi ayrı hat ister mi?", "Yeni tesisatlarda çamaşır ve bulaşık makinesi, klima ve fırın için genellikle ayrı hat öngörülür, çünkü bu cihazlar tek başlarına hattın büyük kısmını kullanır. Ankastre ocak ve fırınlarda kesit ve sigorta projeye göre seçilir."],
    ["Sigorta neden sık sık atar?", "En yaygın nedenler aşırı yük, kısa devre, nemli priz ya da arızalı cihaz gibi kaçak akım kaynakları ve gevşek bağlantılardır. Cihazları tek tek takarak sorunu arayın; hiçbir cihaz takılı değilken de atıyorsa yetkili elektrikçi çağırın."],
    ["Kablo kesiti ile sigorta değeri nasıl uyumlu seçilir?", "Yük akımı sigortanın anma akımından, sigortanın anma akımı da kablonun akım taşıma kapasitesinden küçük ya da ona eşit olmalıdır. Kablonun döşeme şekli, ortam sıcaklığı ve hat uzunluğu kapasiteyi değiştirdiği için seçim yetkili elektrikçi ya da mühendis tarafından yapılır."],
    ["Kaçak akım rölesi (30 mA) ne işe yarar?", "Hattan çıkan ve dönen akım arasındaki farkı algılar ve 30 mA civarında bir kaçak olduğunda devreyi milisaniyeler içinde keser. Bu, elektrik çarpmasında insan hayatını korumaya yönelik bir önlemdir; test düğmesine ayda bir basarak çalıştığını kontrol edin."],
    ["B ve C tipi sigorta farkı nedir?", "Fark, kısa devrede anlık açmanın hangi akımda gerçekleştiğidir. B tipi anma akımının 3 ile 5 katında, C tipi 5 ile 10 katında açar. Konutlarda priz ve aydınlatma hatlarında genellikle B tipi kullanılır."],
    ["Aynı anda çalışan cihazların toplam gücü nasıl hesaplanır?", "Aynı hattaki cihazların watt değerleri toplanır ve 230'a bölünerek akım bulunur. Su ısıtıcı, tost makinesi ve mikrodalga birlikte 4.500 W eder ve yaklaşık 19,6 A çeker; bu yük 16 A sigortayı attırır, cihazları farklı hatlara dağıtmak gerekir."],
    ["Elektrik işleri için neden yetkili elektrikçi gerekir?", "Sigorta, kablo ve röle seçimindeki hatalar zamanla ısınma, yangın ve elektrik çarpmasına yol açabilir. Pano çalışması, hat ekleme ve sigorta değiştirme gibi işler ehliyetli bir elektrikçi tarafından, hattın enerjisiz olduğu ölçülerek yapılmalıdır."],
    ["Sigortayı daha büyük amperli olanla değiştirmek sorunu çözer mi?", "Hayır. Sigorta kabloyu korumak için seçilir; daha büyük değerli sigorta takmak kablonun aşırı ısınmasına izin verir ve yangın riskini artırır. Sigorta sık atıyorsa yükü dağıtmak ya da elektrikçiye yeni hat planlatmak gerekir."]
  ],
  tools: ["amper-watt-cevir", "kw-amper-cevir", "kablo-kesiti-hesapla", "elektrik-gucu-hesapla"],
  related: ["kablo-kesiti-nasil-secilir", "watt-amper-volt-iliskisi", "hangi-ev-aleti-ne-kadar-elektrik-harcar", "elektrik-faturasi-nasil-hesaplanir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – Elektrik İç Tesisleri Yönetmeliği", "https://www.mevzuat.gov.tr/"],
    ["Enerji ve Tabii Kaynaklar Bakanlığı", "https://enerji.gov.tr/"]
  ],
  uyari: "genel bilgidir; elektrik tesisatı, pano ve sigorta işlerini yalnızca yetkili ve ehliyetli bir elektrikçiye yaptırın"
};
