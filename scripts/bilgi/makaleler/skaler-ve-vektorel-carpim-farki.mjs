export default {
  slug: "skaler-ve-vektorel-carpim-farki",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Skaler Çarpım ve Vektörel Çarpım Farkı: Formüller, Açı ve Alan Hesabı",
  pageTitle: "Skaler ve Vektörel Çarpım Farkı: Formül, Açı, Alan Hesabı",
  description: "Skaler çarpım iki vektörden bir sayı, vektörel çarpım ikisine dik yeni bir vektör üretir. Formüller, açı bulma, paralelkenar alanı, sağ el kuralı ve iş-tork örnekleri.",
  keywords: ["skaler çarpım", "vektörel çarpım", "nokta çarpım formülü", "çapraz çarpım", "iki vektör arasındaki açı", "vektörel çarpım alan", "sağ el kuralı", "iç çarpım dış çarpım farkı"],
  lead: "Skaler (nokta) çarpım iki vektörden tek bir sayı üretir ve a · b = |a| |b| cos θ ile hesaplanır; vektörel (çapraz) çarpım ise yalnızca üç boyutta tanımlıdır, iki vektöre de dik yeni bir vektör verir ve büyüklüğü |a| |b| sin θ'dır. Skaler çarpım iki vektörün ne kadar aynı yöne baktığını, vektörel çarpım ise birlikte oluşturdukları paralelkenarın alanını ölçer. Bu sayfada iki çarpımın formüllerini, a = (2, 1, 3) ve b = (1, −2, 2) vektörleriyle çözümlü örnekleri, sağ el kuralını ve fizikteki iş ile tork uygulamalarını bulacaksınız.",
  kisaCevap: [
    "Skaler çarpım: a · b = a₁b₁ + a₂b₂ + a₃b₃ = |a| |b| cos θ; sonuç bir sayıdır.",
    "Vektörel çarpım: a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁); sonuç a ve b'ye dik bir vektördür.",
    "İki vektör arasındaki açı: cos θ = (a · b) ÷ (|a| |b|).",
    "Dik vektörlerin skaler çarpımı 0, paralel vektörlerin vektörel çarpımı sıfır vektördür.",
    "|a × b| = |a| |b| sin θ, a ve b'nin oluşturduğu paralelkenarın alanına eşittir; üçgen alanı bunun yarısıdır.",
    "Skaler çarpım değişmelidir (a · b = b · a); vektörel çarpım ters değişmelidir (a × b = −(b × a))."
  ],
  figure: {
    alt: "İki çarpımın karşılaştırması: solda a ve b vektörü arasındaki açı ve b üzerindeki izdüşüm, skaler çarpım 6; sağda a ve b'nin oluşturduğu paralelkenar ve ona dik a × b vektörü (8, −1, −5), alan yaklaşık 9,49.",
    caption: "a = (2, 1, 3) ve b = (1, −2, 2) için skaler çarpım 6 bir sayıdır ve açıyı verir (yaklaşık 57,7°). Vektörel çarpım (8, −1, −5) her iki vektöre de dik bir vektördür ve uzunluğu paralelkenarın alanına (√90 ≈ 9,49) eşittir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="v1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="p"/></marker>
  <marker id="v2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="ok"/></marker></defs>
  <text x="180" y="30" class="lg b mid">Skaler çarpım: bir sayı</text>
  <text x="540" y="30" class="lg b mid">Vektörel çarpım: bir vektör</text>
  <line x1="360" y1="44" x2="360" y2="390" class="sb dash" fill="none"/>
  <line x1="50" y1="260" x2="300" y2="260" class="sp sw" fill="none" marker-end="url(#v1)"/>
  <line x1="50" y1="260" x2="180" y2="100" class="sok sw" fill="none" marker-end="url(#v2)"/>
  <line x1="180" y1="100" x2="180" y2="260" class="st dash" fill="none"/>
  <path d="M100 260 A50 50 0 0 0 82 222" class="st" fill="none"/>
  <text x="110" y="240" class="sm b">θ ≈ 57,7°</text>
  <text x="300" y="282" class="b mid p">b</text>
  <text x="160" y="94" class="b ok">a</text>
  <text x="115" y="280" class="sm mid t2">izdüşüm</text>
  <rect x="40" y="306" width="290" height="76" rx="8" class="ps"/>
  <text x="185" y="332" class="sm mid">a · b = 2·1 + 1·(−2) + 3·2</text>
  <text x="185" y="362" class="b lg mid">= 6</text>
  <polygon points="420,280 600,280 660,200 480,200" class="oks"/>
  <line x1="420" y1="280" x2="600" y2="280" class="sp sw" fill="none" marker-end="url(#v1)"/>
  <line x1="420" y1="280" x2="480" y2="200" class="sok sw" fill="none" marker-end="url(#v2)"/>
  <line x1="420" y1="280" x2="420" y2="80" class="sp sw" fill="none" marker-end="url(#v1)"/>
  <text x="432" y="92" class="b p">a × b</text>
  <text x="540" y="250" class="sm b mid">Alan = |a × b|</text>
  <text x="606" y="298" class="b p">b</text>
  <text x="462" y="196" class="b ok">a</text>
  <rect x="390" y="306" width="300" height="76" rx="8" class="p"/>
  <text x="540" y="332" class="sm mid sf">a × b = (8, −1, −5)</text>
  <text x="540" y="362" class="b mid sf">|a × b| = √90 ≈ 9,49</text>
</svg>`
  },
  sections: [
    {
      h: "Vektör çarpımlarına kısa giriş",
      p: [
        "Vektörler yalnızca büyüklüğü değil yönü de olan niceliklerdir: kuvvet, hız, yer değiştirme gibi. İki sayıyı çarpmanın tek bir anlamı varken iki vektörü \"çarpmanın\" birden fazla anlamlı yolu vardır. Lise analitik geometrisinde, üniversite fiziğinde ve lineer cebirde en çok kullanılan iki işlem <strong>skaler çarpım</strong> ve <strong>vektörel çarpım</strong>dır.",
        "Aralarındaki temel fark sonucun türüdür. Skaler çarpımın sonucu bir sayıdır (skaler); vektörel çarpımın sonucu yeni bir vektördür. Skaler çarpım her boyutta tanımlıdır, vektörel çarpım ise üç boyutlu uzayın özel bir işlemidir. Bu yazıda vektörleri bileşenleriyle, örneğin a = (a₁, a₂, a₃) biçiminde yazıyoruz."
      ],
      table: {
        head: ["Özellik", "Skaler (nokta) çarpım", "Vektörel (çapraz) çarpım"],
        rows: [
          ["Gösterim", "a · b", "a × b"],
          ["Sonuç", "Sayı", "Vektör"],
          ["Geometrik formül", "|a| |b| cos θ", "Büyüklük |a| |b| sin θ, yön sağ el kuralıyla"],
          ["Tanımlı olduğu boyut", "Her boyut", "Üç boyut"],
          ["Değişme özelliği", "a · b = b · a", "a × b = −(b × a)"],
          ["Sıfır olduğu durum", "Vektörler dik", "Vektörler paralel"],
          ["Tipik kullanım", "Açı, izdüşüm, iş", "Alan, normal vektör, tork"]
        ]
      }
    },
    {
      h: "Skaler (nokta) çarpım nedir, nasıl hesaplanır?",
      p: [
        "Skaler çarpım, karşılık gelen bileşenlerin çarpılıp toplanmasıyla hesaplanır. Geometrik olarak, bir vektörün diğeri üzerindeki izdüşüm uzunluğunun diğer vektörün uzunluğuyla çarpımıdır. Sonuç pozitifse vektörler arasındaki açı dar, sıfırsa dik, negatifse geniştir."
      ],
      formula: "a · b = a₁b₁ + a₂b₂ + a₃b₃\na · b = |a| |b| cos θ\n|a| = √(a₁² + a₂² + a₃²)",
      ol: [
        "a = (2, 1, 3) ve b = (1, −2, 2) olsun.",
        "Bileşenleri çarpıp toplayın: 2·1 + 1·(−2) + 3·2 = 2 − 2 + 6 = 6.",
        "Uzunlukları bulun: |a| = √(4 + 1 + 9) = √14 ≈ 3,742; |b| = √(1 + 4 + 4) = √9 = 3.",
        "Sonuç 6 pozitif olduğu için aradaki açı dar açıdır."
      ],
      after: [
        "İki boyutlu vektörlerde formül üçüncü terim olmadan aynıdır: (3, 4) · (2, −1) = 6 − 4 = 2. Bileşenleri girerek sonucu kontrol etmek için [[arac:skaler-carpim-hesapla|Skaler Çarpım Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "İki vektör arasındaki açı skaler çarpımla nasıl bulunur?",
      p: [
        "Skaler çarpımın iki formülü birbirine eşitlenince açının kosinüsü yalnız kalır. Bu, iki vektör arasındaki açıyı koordinatlardan bulmanın en pratik yoludur."
      ],
      formula: "cos θ = (a · b) ÷ (|a| |b|)\nÖrnek: cos θ = 6 ÷ (√14 × 3) = 6 ÷ 11,225 ≈ 0,5345\nθ = arccos(0,5345) ≈ 57,7°",
      after: [
        "Hesap makinesinde arccos (cos⁻¹) tuşu kullanılır; derece ya da radyan modunun doğru seçildiğinden emin olun. Kosinüs değerlerini hatırlamak için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] yazısındaki özel açılara bakabilirsiniz: cos 60° = 0,5 olduğu için 0,5345'e karşılık gelen açının 60°'nin biraz altında olması beklenir."
      ]
    },
    {
      h: "Dik vektörlerin skaler çarpımı neden sıfırdır?",
      p: [
        "Formüldeki cos θ terimi bunun cevabıdır: vektörler dik olduğunda θ = 90° ve cos 90° = 0 olur; bu nedenle uzunluklar ne olursa olsun çarpım sıfırdır. Geometrik olarak da bir vektörün kendisine dik bir doğrultudaki izdüşümü sıfır uzunluktadır.",
        "Bu özellik diklik testi olarak çok kullanılır. (1, 2) ve (2, −1) vektörlerinin çarpımı 1·2 + 2·(−1) = 0 olduğundan dik oldukları hemen anlaşılır. Analitik geometride iki doğrunun dik olup olmadığını doğrultu vektörlerinin skaler çarpımıyla kontrol etmek, eğimleri karşılaştırmaktan çoğu zaman daha kolaydır. Eğim yaklaşımı için [[bilgi:dogrunun-egimi-nasil-bulunur|doğrunun eğimi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Vektörel (çapraz) çarpım nedir?",
      p: [
        "Vektörel çarpım, üç boyutlu iki vektörden, ikisine de dik olan üçüncü bir vektör üretir. Hesap için genellikle birinci satırı i, j, k birim vektörlerinden oluşan 3 × 3'lük bir determinant kullanılır. Bileşen formülü bu determinantın açılımıdır."
      ],
      formula: "a × b = (a₂b₃ − a₃b₂,  a₃b₁ − a₁b₃,  a₁b₂ − a₂b₁)\n|a × b| = |a| |b| sin θ",
      ol: [
        "a = (2, 1, 3), b = (1, −2, 2).",
        "Birinci bileşen: a₂b₃ − a₃b₂ = 1·2 − 3·(−2) = 2 + 6 = 8.",
        "İkinci bileşen: a₃b₁ − a₁b₃ = 3·1 − 2·2 = 3 − 4 = −1.",
        "Üçüncü bileşen: a₁b₂ − a₂b₁ = 2·(−2) − 1·1 = −4 − 1 = −5.",
        "Sonuç: a × b = (8, −1, −5). Kontrol: (8, −1, −5) · (2, 1, 3) = 16 − 1 − 15 = 0 ve (8, −1, −5) · (1, −2, 2) = 8 + 2 − 10 = 0; vektör ikisine de diktir."
      ],
      after: [
        "Hesabı adım adım görmek için [[arac:vektorel-carpim-hesapla|Vektörel Çarpım Hesaplama]] aracını, determinant yöntemini denemek için [[arac:matris-hesapla|Matris Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Vektörel çarpımın büyüklüğü neden paralelkenarın alanıdır?",
      p: [
        "Kenarları a ve b olan bir paralelkenarın alanı taban × yüksekliktir. Taban |b|, yükseklik ise a'nın b'ye dik bileşeni olan |a| sin θ'dır. Bu yüzden alan |a| |b| sin θ, yani tam olarak |a × b| olur. Aynı iki vektörün oluşturduğu üçgenin alanı bunun yarısıdır."
      ],
      table: {
        head: ["Büyüklük", "Hesap", "Sonuç"],
        rows: [
          ["|a × b|", "√(8² + (−1)² + (−5)²) = √90", "≈ 9,487"],
          ["|a| |b| sin θ", "11,225 × sin 57,7° = 11,225 × 0,8452", "≈ 9,487"],
          ["Paralelkenar alanı", "|a × b|", "≈ 9,49 birim²"],
          ["Üçgen alanı", "|a × b| ÷ 2", "≈ 4,74 birim²"]
        ],
        caption: "İki yoldan bulunan değerin aynı çıkması hesabın doğruluğunu teyit eder."
      },
      after: [
        "Paralel vektörlerde θ = 0° ya da 180° olduğu için sin θ = 0'dır; vektörel çarpım sıfır vektördür ve paralelkenar \"düzleşerek\" alanı sıfır olur. Alan formüllerinin genel hâlleri için [[bilgi:dortgenlerde-alan-yamuk-paralelkenar|dörtgenlerde alan]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sağ el kuralı nasıl uygulanır?",
      p: [
        "Vektörel çarpımın büyüklüğü formülden bulunur, yönü ise sağ el kuralıyla belirlenir. Sağ elinizin dört parmağını birinci vektör a yönünde uzatın, sonra parmaklarınızı küçük açı üzerinden ikinci vektör b'ye doğru bükün. Başparmağınızın gösterdiği yön a × b'nin yönüdür.",
        "Sıra değişirse yön tersine döner: b × a = −(a × b). Standart koordinat sisteminde i × j = k, j × k = i, k × i = j'dir; ters sırada ise eksi işareti gelir, örneğin j × i = −k."
      ]
    },
    {
      h: "Fizikte iş ve tork hangi çarpımla hesaplanır?",
      ul: [
        "<strong>İş (skaler çarpım):</strong> W = F · d. Kuvvetin yalnızca yer değiştirme doğrultusundaki bileşeni iş yapar. F = (3, 4) N ve d = (5, 0) m ise W = 3·5 + 4·0 = 15 J. Kuvvet yer değiştirmeye dikse iş sıfırdır.",
        "<strong>Tork (vektörel çarpım):</strong> τ = r × F. Dönme ekseninden 0,5 m uzaktaki bir noktaya, kola dik 20 N'luk kuvvet uygulanırsa r = (0,5; 0; 0) m, F = (0; 20; 0) N için τ = (0; 0; 10) N·m bulunur. Torkun yönü dönme eksenini gösterir.",
        "<strong>Güç ve akı:</strong> Güç P = F · v, manyetik akı Φ = B · A skaler çarpımla; manyetik kuvvet F = q (v × B) vektörel çarpımla hesaplanır."
      ],
      after: [
        "Kuvvet, iş ve enerji arasındaki bağ için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısına göz atabilirsiniz. Vektörlerin toplamı, farkı ve uzunluğu gibi temel işlemler için [[arac:vektor-hesapla|Vektör Hesaplama]] aracı da elinizin altında."
      ]
    },
    {
      h: "2B vektörlerde vektörel çarpım nasıl yorumlanır?",
      p: [
        "Düzlemdeki vektörler için gerçek bir vektörel çarpım tanımlı değildir; ancak vektörler z bileşeni 0 olan üç boyutlu vektörler gibi düşünülürse sonuç yalnızca z bileşeni olan bir vektör olur. Bu z bileşeni a₁b₂ − a₂b₁ sayısıdır ve pratikte \"2B çapraz çarpım\" diye anılır.",
        "Bu sayının mutlak değeri paralelkenarın alanını, işareti ise yönü verir: pozitifse b, a'ya göre saat yönünün tersinde, negatifse saat yönündedir. Örneğin a = (3, 1) ve b = (1, 2) için 3·2 − 1·1 = 5 bulunur; paralelkenarın alanı 5 birim²'dir ve b, a'nın saat yönünün tersine döndürülmüş tarafındadır. Bilgisayar grafiklerinde ve çokgen alanı hesabında bu küçük formül çok sık kullanılır."
      ]
    }
  ],
  faq: [
    ["Skaler (nokta) çarpım nedir, nasıl hesaplanır?", "Skaler çarpım, iki vektörün karşılık gelen bileşenlerinin çarpılıp toplanmasıyla bulunan bir sayıdır. a = (2, 1, 3) ve b = (1, −2, 2) için 2 − 2 + 6 = 6'dır; aynı değer |a| |b| cos θ ile de hesaplanabilir."],
    ["Vektörel (çapraz) çarpım nedir?", "Vektörel çarpım, üç boyutlu iki vektörden ikisine de dik yeni bir vektör üreten işlemdir. Büyüklüğü |a| |b| sin θ, yönü sağ el kuralıyla bulunur. a = (2, 1, 3) ve b = (1, −2, 2) için sonuç (8, −1, −5)'tir."],
    ["İki vektör arasındaki açı skaler çarpımla nasıl bulunur?", "Skaler çarpım vektörlerin uzunluklarının çarpımına bölünerek açının kosinüsü bulunur: cos θ = (a · b) ÷ (|a| |b|). Örnekte 6 ÷ (√14 × 3) ≈ 0,5345 çıkar ve arccos ile açı yaklaşık 57,7° bulunur."],
    ["Dik vektörlerin skaler çarpımı neden sıfırdır?", "Skaler çarpım |a| |b| cos θ'ya eşittir ve dik vektörlerde θ = 90° olduğu için cos 90° = 0'dır. Bu nedenle uzunluklar ne olursa olsun çarpım sıfırdır; bu özellik iki vektörün dikliğini test etmek için kullanılır."],
    ["Vektörel çarpımın büyüklüğü neden paralelkenarın alanıdır?", "Paralelkenarın alanı taban çarpı yüksekliktir. Taban |b|, yükseklik a'nın b'ye dik bileşeni olan |a| sin θ olduğundan alan |a| |b| sin θ olur; bu da vektörel çarpımın büyüklüğüne eşittir."],
    ["Sağ el kuralı nasıl uygulanır?", "Sağ elin dört parmağı birinci vektör yönünde tutulur ve küçük açı üzerinden ikinci vektöre doğru bükülür. Başparmağın gösterdiği yön vektörel çarpımın yönüdür; vektörlerin sırası değişirse yön tersine döner."],
    ["Fizikte iş ve tork hangi çarpımla hesaplanır?", "İş, kuvvet ile yer değiştirmenin skaler çarpımıdır ve bir sayıdır. Tork ise konum vektörü ile kuvvetin vektörel çarpımıdır ve dönme eksenini gösteren bir vektördür; ikisinin birimi N·m olsa da anlamları farklıdır."],
    ["2B vektörlerde vektörel çarpım nasıl yorumlanır?", "Düzlemsel vektörler z bileşeni sıfır kabul edilerek çarpılır ve sonuç yalnızca a₁b₂ − a₂b₁ değerinden oluşur. Bu sayının mutlak değeri paralelkenar alanını, işareti ise ikinci vektörün birinciye göre dönüş yönünü gösterir."],
    ["Skaler çarpım ile vektörel çarpım arasındaki temel fark nedir?", "Skaler çarpım bir sayı verir, her boyutta tanımlıdır ve vektörlerin aynı yöne ne kadar baktığını ölçer. Vektörel çarpım yeni bir vektör verir, yalnızca üç boyutta tanımlıdır ve iki vektörün oluşturduğu alanı ve dik yönü ölçer."]
  ],
  tools: ["skaler-carpim-hesapla", "vektorel-carpim-hesapla", "vektor-hesapla", "matris-hesapla"],
  related: ["trigonometri-sin-cos-tan-tablosu", "dogrunun-egimi-nasil-bulunur", "kinetik-ve-potansiyel-enerji"],
  sources: [
    ["MEB – Ortaöğretim matematik ve fizik dersi öğretim programları", "https://www.meb.gov.tr/"]
  ]
};
