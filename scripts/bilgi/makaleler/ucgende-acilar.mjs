export default {
  slug: "ucgende-acilar",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Üçgende Açılar: İç ve Dış Açılar Toplamı, Kurallar ve Örnek Sorular",
  pageTitle: "Üçgende Açılar: İç Açılar 180°, Dış Açılar 360° ve Örnekler",
  description: "Üçgenin iç açıları toplamı 180°, dış açıları toplamı 360°'dir. Dış açı kuralı, ikizkenar ve eşkenar üçgen, açı-kenar ilişkisi ve çözümlü örnek sorular.",
  keywords: ["üçgende açılar", "üçgenin iç açıları toplamı", "üçgenin dış açıları toplamı", "üçgende açı bulma", "ikizkenar üçgende açılar", "eşkenar üçgen açıları", "dik üçgende açılar", "dış açı kuralı"],
  lead: "Her üçgenin <strong>iç açılarının toplamı 180°</strong>, her köşeden birer tane alınan <strong>dış açılarının toplamı 360°</strong>'dir. Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir. Bu üç kural, üçgende bilinmeyen açıyı bulmanın temelidir: iki açısı 50° ve 70° olan üçgenin üçüncü açısı 180° − 120° = 60°'dir. Bu yazıda kuralların nedenini, ikizkenar, eşkenar ve dik üçgendeki açıları, açı ile kenar arasındaki ilişkiyi ve ortaokul ile TYT düzeyinde çözümlü örnek soruları bulacaksınız.",
  kisaCevap: [
    "İç açılar toplamı: A + B + C = 180°.",
    "Dış açılar toplamı (her köşeden bir tane): 360°.",
    "Dış açı kuralı: bir dış açı, komşu olmayan iki iç açının toplamına eşittir.",
    "İkizkenar üçgende taban açıları eşittir: taban açısı = (180° − tepe açısı) ÷ 2.",
    "Eşkenar üçgenin her açısı 60°'dir; dik üçgende iki dar açının toplamı 90°'dir.",
    "Büyük açının karşısında büyük kenar, küçük açının karşısında küçük kenar bulunur."
  ],
  figure: {
    alt: "Açıları 50, 70 ve 60 derece olan ABC üçgeni; B köşesindeki dış açı 110 derece olup komşu olmayan iç açılar 50 ve 60 derecenin toplamına eşittir.",
    caption: "ABC üçgeninde iç açılar 50° + 70° + 60° = 180°'dir. AB kenarı B'den uzatıldığında oluşan dış açı 180° − 70° = 110° olur ve bu değer, B'ye komşu olmayan A ve C açılarının toplamına (50° + 60°) eşittir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Üçgende iç ve dış açılar</text>
  <polygon points="100,340 380,340 295.3,107.3" class="ps sp sw"/>
  <line x1="380" y1="340" x2="520" y2="340" class="sp sw dash" fill="none"/>
  <path d="M140 340 A40 40 0 0 0 125.7 309.4" class="sp sw" fill="none"/>
  <path d="M340 340 A40 40 0 0 1 366.3 302.4" class="sp sw" fill="none"/>
  <path d="M272.8 134.1 A35 35 0 0 0 307.3 140.2" class="sp sw" fill="none"/>
  <path d="M440 340 A60 60 0 0 0 359.5 283.6" class="sdg sw" fill="none"/>
  <g class="b">
    <text x="84" y="360">A</text><text x="376" y="362">B</text><text x="290" y="96">C</text>
  </g>
  <g class="sm b">
    <text x="148" y="330">50°</text><text x="330" y="326">70°</text><text x="282" y="164">60°</text>
    <text x="440" y="300" class="dg">110°</text>
  </g>
  <rect x="540" y="60" width="160" height="300" rx="10" class="sf sb"/>
  <text x="620" y="88" class="b mid">Kurallar</text>
  <text x="556" y="122" class="sm b">İç açılar</text>
  <text x="556" y="142" class="sm">50 + 70 + 60 = 180°</text>
  <text x="556" y="182" class="sm b dg">Dış açı (B'de)</text>
  <text x="556" y="202" class="sm">180 − 70 = 110°</text>
  <text x="556" y="222" class="sm">= 50 + 60 (A + C)</text>
  <text x="556" y="262" class="sm b">Dış açılar toplamı</text>
  <text x="556" y="282" class="sm">130 + 110 + 120</text>
  <text x="556" y="302" class="sm">= 360°</text>
  <text x="556" y="340" class="sm t2">Her köşeden bir dış açı</text>
</svg>`
  },
  sections: [
    {
      h: "Üçgenin iç açıları toplamı neden 180 derecedir?",
      p: [
        "Bir üçgenin üç iç açısı ne kadar farklı olursa olsun toplamları her zaman 180°'dir. Bu kural Öklid geometrisinin temel sonuçlarından biridir ve paralel doğruların özelliğiyle kolayca gösterilebilir.",
        "ABC üçgeninin C köşesinden, AB kenarına paralel bir doğru çizdiğinizi düşünün. Bu doğru C noktasında üç açı oluşturur: solda A açısına eşit bir açı, ortada C açısının kendisi, sağda B açısına eşit bir açı. A ve B ile eşit olan açılar, paralel iki doğruyu kesen AC ve BC doğrularının oluşturduğu <strong>iç ters açılardır</strong>. Doğru üzerindeki bu üç açı yan yana bir doğru açı oluşturduğu için toplamları 180°'dir; dolayısıyla A + B + C = 180°.",
        "Kâğıttan bir üçgen kesip üç köşesini koparıp köşeleri yan yana getirdiğinizde de düz bir çizgi elde edersiniz. Bu basit deney, kuralı ortaokulda görselleştirmenin en kolay yoludur."
      ],
      formula: "A + B + C = 180°\nBilinmeyen açı = 180° − (bilinen iki açının toplamı)"
    },
    {
      h: "Dış açı nedir? Dış açılar toplamı neden 360°?",
      p: [
        "Bir kenarın köşeden dışarı doğru uzatılmasıyla, uzantı ile komşu kenar arasında oluşan açıya <strong>dış açı</strong> denir. Bir köşedeki iç açı ile dış açı yan yana bir doğru oluşturduğu için toplamları 180°'dir: dış açı = 180° − iç açı.",
        "Her köşeden birer dış açı alınırsa üç dış açının toplamı 3 × 180° − (iç açılar toplamı) = 540° − 180° = <strong>360°</strong> olur. Bunu, üçgenin çevresinde yürüyen birinin her köşede döndüğü açıların toplamı olarak da düşünebilirsiniz: başladığı yöne geri dönene kadar tam bir tur, yani 360° döner. Bu kural yalnızca üçgen için değil, tüm dışbükey çokgenler için geçerlidir."
      ],
      table: {
        head: ["Köşe", "İç açı", "Dış açı (180° − iç açı)"],
        rows: [
          ["A", "50°", "130°"],
          ["B", "70°", "110°"],
          ["C", "60°", "120°"],
          ["Toplam", "180°", "360°"]
        ]
      }
    },
    {
      h: "Dış açı kuralı: komşu olmayan iki iç açının toplamı",
      p: [
        "Bir üçgende herhangi bir dış açı, kendisine komşu olmayan (yani başka köşelerdeki) iki iç açının toplamına eşittir. Şekildeki B köşesinin dış açısı 110°'dir ve bu değer A ile C açılarının toplamına (50° + 60°) eşittir.",
        "Kuralın nedeni basittir. B köşesinde dış açı = 180° − B'dir. Üçgende A + C = 180° − B olduğu için iki ifade aynı sayıya eşittir. Bu kural sınavlarda çok işe yarar; çünkü üçüncü açıyı hesaplamadan doğrudan dış açıyı bulmanızı sağlar."
      ],
      formula: "B köşesindeki dış açı = A + C\nÖrnek: A = 50°, C = 60° → dış açı = 110°"
    },
    {
      h: "İkizkenar, eşkenar ve dik üçgende açılar",
      p: [
        "Kenarlarına göre üçgenlerin açı özellikleri farklıdır. <strong>İkizkenar üçgende</strong> eşit iki kenarın karşısındaki açılar, yani taban açıları eşittir. Tepe açısı biliniyorsa taban açıları (180° − tepe açısı) ÷ 2 ile bulunur. Tepe açısı 40° olan ikizkenar üçgenin taban açıları (180 − 40) ÷ 2 = 70°'dir. Taban açısı biliniyorsa tepe açısı 180° − 2 × taban açısıdır.",
        "<strong>Eşkenar üçgende</strong> üç kenar ve üç açı eşittir; her açı 180° ÷ 3 = 60°'dir. <strong>Dik üçgende</strong> bir açı 90° olduğu için diğer iki açının toplamı 90°'dir; bu iki açıya dar açılar denir ve birbirini 90°'ye tamamlarlar. İkizkenar dik üçgende dar açıların her biri 45°'dir. Dik üçgende kenar ve açı ilişkileri için [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] ve [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometrik oranlar]] yazılarına bakabilirsiniz."
      ],
      table: {
        head: ["Üçgen türü", "Açı özelliği", "Örnek"],
        rows: [
          ["Eşkenar", "Üç açı da 60°", "60° – 60° – 60°"],
          ["İkizkenar", "Taban açıları eşit", "40° – 70° – 70°"],
          ["İkizkenar dik", "90° ve iki tane 45°", "90° – 45° – 45°"],
          ["Çeşitkenar", "Üç açı da farklı", "50° – 60° – 70°"],
          ["30-60-90 üçgeni", "Kenarlar 1 : √3 : 2 oranında", "30° – 60° – 90°"]
        ]
      }
    },
    {
      h: "Açılarına göre üçgen çeşitleri",
      ul: [
        "<strong>Dar açılı üçgen:</strong> Üç açısı da 90°'den küçüktür. Örnek: 50°, 60°, 70°. Eşkenar üçgen de dar açılıdır.",
        "<strong>Dik üçgen:</strong> Bir açısı tam 90°'dir. 90°'nin karşısındaki en uzun kenara hipotenüs denir.",
        "<strong>Geniş açılı üçgen:</strong> Bir açısı 90°'den büyüktür. Örnek: 120°, 35°, 25°. Bir üçgende en fazla bir geniş açı olabilir, çünkü iki geniş açının toplamı zaten 180°'yi aşar.",
        "Bir üçgende en az iki açı dar açıdır. Aynı nedenle bir üçgende iki dik açı da bulunamaz."
      ],
      after: [
        "Bir üçgenin türünü bulmak için en büyük açısına bakmanız yeterlidir: en büyük açı 90°'den küçükse dar açılı, eşitse dik, büyükse geniş açılıdır. [[arac:ucgen-acisi-hesapla|Üçgen Açısı Hesaplama]] aracı, iki açıyı girdiğinizde üçüncüyü, üçgenin türünü ve dış açıları birlikte gösterir."
      ]
    },
    {
      h: "En büyük açının karşısında en uzun kenar mı vardır?",
      p: [
        "Evet. Bir üçgende açılar ile karşılarındaki kenarlar aynı sırayla büyür: <strong>en büyük açının karşısında en uzun kenar, en küçük açının karşısında en kısa kenar</strong> bulunur. Eşit açıların karşısındaki kenarlar da eşittir; ikizkenar ve eşkenar üçgenlerin özellikleri buradan gelir.",
        "Şekildeki üçgende açılar A = 50°, C = 60°, B = 70°'dir. Bu yüzden kenarlar BC < AB < AC sırasındadır: A'nın karşısındaki BC en kısa, B'nin karşısındaki AC en uzun kenardır. Bu ilişki, açıları bilinip kenarları bilinmeyen sorularda sıralama yapmayı sağlar. Kenarların tam oranını bulmak için ise [[arac:sinus-teoremi-hesapla|Sinüs Teoremi Hesaplama]] aracındaki a ÷ sin A = b ÷ sin B = c ÷ sin C bağıntısı kullanılır."
      ]
    },
    {
      h: "Çözümlü örnek sorular",
      ol: [
        "<strong>Üçüncü açı:</strong> Bir üçgenin iki açısı 48° ve 77°'dir. Üçüncü açı 180 − (48 + 77) = 180 − 125 = <strong>55°</strong>.",
        "<strong>Oranlı açılar:</strong> Açıları 2, 3 ve 4 ile orantılı bir üçgende açılar 2k, 3k, 4k olsun. 9k = 180 → k = 20. Açılar <strong>40°, 60°, 80°</strong>.",
        "<strong>İkizkenar üçgen:</strong> Taban açılarından biri 65° olan ikizkenar üçgenin tepe açısı 180 − 2 × 65 = <strong>50°</strong>.",
        "<strong>Dış açı:</strong> Bir üçgenin iki iç açısı 35° ve 45°'dir. Üçüncü köşedeki dış açı, komşu olmayan iç açıların toplamı olan 35 + 45 = <strong>80°</strong>'dir. Kontrol: üçüncü iç açı 100°, dış açısı 180 − 100 = 80°.",
        "<strong>Bilinmeyenli açılar:</strong> Açıları x + 10°, 2x ve 3x − 40° olan üçgende 6x − 30 = 180 → 6x = 210 → x = 35. Açılar <strong>45°, 70°, 65°</strong>; toplam 180° olduğu kontrol edilir.",
        "<strong>Dik üçgen:</strong> Bir dar açısı 28° olan dik üçgenin diğer dar açısı 90 − 28 = <strong>62°</strong>."
      ]
    },
    {
      h: "Karmaşık şekillerde açı bulma yöntemi",
      p: [
        "Sınav sorularında üçgen çoğu zaman tek başına verilmez; paralel doğrular, uzatılmış kenarlar ya da iç içe üçgenlerle birlikte gelir. Bu tür sorularda aşağıdaki sıra işinizi kolaylaştırır."
      ],
      ol: [
        "Şekildeki tüm bilinen açıları üzerine yazın; bir doğru üzerindeki komşu açıların toplamının 180° olduğunu kullanarak hemen bulunabilenleri tamamlayın.",
        "Ters açıları (kesişen iki doğrunun karşılıklı açıları) eşitleyin.",
        "Paralel doğru varsa yöndeş, iç ters ve dış ters açıların eşitliğini kullanın.",
        "Her üçgende iç açılar toplamı 180° denklemini kurun; bir köşenin dış açısı soruluyorsa doğrudan dış açı kuralını kullanın.",
        "Bilinmeyen sayısı kadar denklem elde edince çözün ve bulduğunuz açıları her üçgende toplayarak kontrol edin."
      ],
      after: [
        "Örneğin bir ABC üçgeninde A açısının açıortayı BC kenarını D noktasında kesiyor, B = 70° ve C = 50° verilmiş olsun. A = 180 − 120 = 60° olduğundan açıortay A'yı 30°'lik iki açıya böler. ABD üçgeninde ADB açısı 180 − (70 + 30) = 80°, ADC açısı ise 180 − 80 = 100°'dir. Aynı sonucu ADC üçgeninde 180 − (50 + 30) = 100° ile de doğrulayabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Dış açıyı iç açıyla karıştırmak:</strong> Dış açı, kenarın uzantısı ile komşu kenar arasındaki açıdır; iç açının 180°'ye tümleyenidir.",
        "<strong>Her köşede iki dış açıyı toplamak:</strong> 360° kuralı her köşeden yalnızca bir dış açı alındığında geçerlidir.",
        "<strong>İkizkenarda yanlış açıyı eşit saymak:</strong> Eşit olan açılar, eşit kenarların karşısındaki taban açılarıdır.",
        "<strong>Oranlı sorularda k'yi açı sanmak:</strong> k bulunduktan sonra her oranla çarpılmalıdır.",
        "<strong>Sonucu kontrol etmemek:</strong> Bulduğunuz üç açıyı toplayıp 180° ettiğini doğrulamak hataların çoğunu yakalar."
      ],
      after: [
        "Üçgenden çokgenlere geçtiğinizde iç açılar toplamı (n − 2) × 180° formülüyle bulunur; dörtgende 360°, beşgende 540°'dir. Bu hesap için [[arac:cokgen-ic-aci-hesapla|Çokgen İç Açı Hesaplama]] aracını, dik üçgenin kenar ve açılarını birlikte bulmak için [[arac:dik-ucgen-hesapla|Dik Üçgen Hesaplama]] aracını kullanabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Üçgenin iç açıları toplamı kaç derecedir?", "Her üçgenin iç açılarının toplamı 180 derecedir. Bu nedenle iki açısı bilinen bir üçgenin üçüncü açısı, 180 dereceden bilinen iki açının toplamı çıkarılarak kolayca bulunur."],
    ["Dış açılar toplamı neden 360 derecedir?", "Her köşedeki dış açı 180 eksi iç açıdır. Üç köşe için toplam 540 eksi 180, yani 360 derece eder. Üçgenin çevresinde dolaşan biri başladığı yöne dönene kadar tam bir tur atmış olur."],
    ["Bir dış açı neden komşu olmayan iki iç açının toplamına eşittir?", "Bir köşedeki dış açı 180 eksi o köşenin iç açısıdır. Diğer iki iç açının toplamı da iç açılar 180 olduğu için aynı değere eşittir; bu yüzden ikisi her zaman eşit çıkar."],
    ["İkizkenar üçgende taban açıları nasıl bulunur?", "Taban açıları birbirine eşittir ve 180 dereceden tepe açısı çıkarılıp ikiye bölünerek bulunur. Tepe açısı 40 derece olan ikizkenar üçgenin taban açılarının her biri 70 derecedir."],
    ["Eşkenar üçgenin açıları kaç derece?", "Eşkenar üçgenin üç kenarı ve üç açısı eşittir. İç açılar toplamı 180 derece olduğu için her açı 180 bölü 3, yani 60 derecedir; eşkenar üçgen her zaman dar açılı bir üçgendir."],
    ["Açılarına göre üçgen çeşitleri nelerdir?", "Üç açısı da 90 dereceden küçük olan dar açılı, bir açısı tam 90 derece olan dik ve bir açısı 90 dereceden büyük olan geniş açılı üçgen olmak üzere üç çeşit vardır."],
    ["En büyük açının karşısında en uzun kenar mı vardır?", "Evet. Bir üçgende en büyük açının karşısında en uzun kenar, en küçük açının karşısında en kısa kenar bulunur. Eşit açıların karşısındaki kenarlar da birbirine eşittir."],
    ["Üçgende bilinmeyen açı nasıl bulunur?", "Bilinen açılar toplanıp 180 dereceden çıkarılır. Açılar x gibi bilinmeyenlerle verilmişse üç ifade toplanıp 180'e eşitlenir, denklem çözülür ve bulunan değer her ifadeye yerleştirilir."]
  ],
  tools: ["ucgen-acisi-hesapla", "cokgen-ic-aci-hesapla", "dik-ucgen-hesapla", "sinus-teoremi-hesapla"],
  related: ["pisagor-teoremi-nedir", "trigonometri-sin-cos-tan-tablosu", "alan-ve-hacim-formulleri"],
  sources: [
    ["Millî Eğitim Bakanlığı – Ortaöğretim matematik öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
