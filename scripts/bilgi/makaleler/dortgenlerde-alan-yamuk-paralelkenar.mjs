export default {
  slug: "dortgenlerde-alan-yamuk-paralelkenar",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Yamuk, Paralelkenar ve Eşkenar Dörtgen Alanı Nasıl Hesaplanır?",
  pageTitle: "Yamuk, Paralelkenar, Eşkenar Dörtgen Alanı: Formül ve Örnek",
  description: "Yamuk alanı (a + b) × h ÷ 2, paralelkenar alanı taban × yükseklik, eşkenar dörtgen alanı e × f ÷ 2. Deltoid, çevre, yükseklik bulma ve arsa örneği.",
  keywords: ["yamuk alanı formülü", "paralelkenar alanı", "eşkenar dörtgen alanı", "dörtgenlerde alan", "köşegenlerle alan", "yamuk çevresi", "deltoid alanı", "yamukta yükseklik", "dörtgenler 8. sınıf"],
  lead: "Yamuğun alanı, iki paralel tabanın toplamının yükseklikle çarpımının yarısıdır: <strong>A = (a + b) × h ÷ 2</strong>. Paralelkenarın alanı <strong>taban × yükseklik</strong>, eşkenar dörtgenin alanı ise köşegenlerin çarpımının yarısıdır: <strong>A = e × f ÷ 2</strong>. Örneğin tabanları 14 ve 8 cm, yüksekliği 4 cm olan yamuğun alanı 44 cm²'dir. Bu sayfada her dörtgenin formülünü nereden geldiğiyle birlikte, yamukta yüksekliğin nasıl bulunduğunu, çevre hesabını, deltoidi ve yamuk biçimli arsa örneğini çözümlü olarak bulacaksınız.",
  kisaCevap: [
    "Yamuk: A = (alt taban + üst taban) × yükseklik ÷ 2; orta taban (a + b) ÷ 2 ile yüksekliğin çarpımı da aynı sonucu verir.",
    "Paralelkenar: A = taban × o tabana ait yükseklik ya da A = a × b × sin α.",
    "Eşkenar dörtgen: A = e × f ÷ 2 (köşegenler) ya da A = kenar × yükseklik.",
    "Deltoid: köşegenler dik kesiştiği için alanı da e × f ÷ 2'dir.",
    "Dikdörtgen ve kare, paralelkenarın açıları 90° olan özel halleridir: A = a × b ve A = a².",
    "Her dörtgenin çevresi dört kenarının toplamıdır; yükseklik çevreye girmez."
  ],
  figure: {
    alt: "Üç dörtgen yan yana: tabanları 14 ve 8 santimetre, yüksekliği 4 santimetre olan ikizkenar yamuk, alanı 44; tabanı 10, yüksekliği 6 olan paralelkenar, alanı 60; köşegenleri 12 ve 16 olan eşkenar dörtgen, alanı 96 santimetrekare.",
    caption: "Yükseklik her zaman tabana dik ölçülür, yan kenar boyunca değil. Eşkenar dörtgende köşegenler birbirini dik açıyla ortalar; 6, 8 ve 10 cm'lik dik üçgenler oluşur.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Üç dörtgen, üç formül</text>
  <polygon points="30,260 210,260 171,208 69,208" class="ps"/>
  <polygon points="30,260 210,260 171,208 69,208" class="sp sw" fill="none"/>
  <line x1="69" y1="208" x2="69" y2="260" class="sa dash" fill="none"/>
  <text x="120" y="282" class="sm mid">a = 14 cm</text>
  <text x="120" y="198" class="sm mid">b = 8 cm</text>
  <text x="76" y="240" class="sm">h = 4</text>
  <text x="196" y="236" class="sm">5</text>
  <text x="120" y="96" class="b mid">Yamuk</text>
  <text x="120" y="124" class="sm mid">(a + b) × h ÷ 2</text>
  <text x="120" y="150" class="sm mid">(14 + 8) × 4 ÷ 2</text>
  <text x="120" y="320" class="b mid p">A = 44 cm²</text>
  <text x="120" y="344" class="sm mid t2">Çevre: 14 + 8 + 5 + 5 = 32</text>
  <polygon points="250,260 400,260 450,170 300,170" class="oks"/>
  <polygon points="250,260 400,260 450,170 300,170" class="sok sw" fill="none"/>
  <line x1="300" y1="170" x2="300" y2="260" class="sa dash" fill="none"/>
  <text x="325" y="282" class="sm mid">taban = 10 cm</text>
  <text x="306" y="220" class="sm">h = 6</text>
  <text x="350" y="96" class="b mid">Paralelkenar</text>
  <text x="350" y="124" class="sm mid">taban × yükseklik</text>
  <text x="350" y="150" class="sm mid">10 × 6</text>
  <text x="350" y="320" class="b mid ok">A = 60 cm²</text>
  <polygon points="590,130 650,210 590,290 530,210" class="ps"/>
  <polygon points="590,130 650,210 590,290 530,210" class="sp sw" fill="none"/>
  <line x1="590" y1="130" x2="590" y2="290" class="st dash" fill="none"/>
  <line x1="530" y1="210" x2="650" y2="210" class="st dash" fill="none"/>
  <rect x="590" y="200" width="10" height="10" class="sf sb"/>
  <text x="600" y="180" class="sm">f = 16</text>
  <text x="540" y="228" class="sm">e = 12</text>
  <text x="630" y="160" class="sm">10</text>
  <text x="590" y="96" class="b mid">Eşkenar dörtgen</text>
  <text x="590" y="118" class="sm mid">e × f ÷ 2 = 12 × 16 ÷ 2</text>
  <text x="590" y="320" class="b mid p">A = 96 cm²</text>
  <text x="590" y="344" class="sm mid t2">Kenar 10 · çevre 40</text>
</svg>`
  },
  sections: [
    {
      h: "Dörtgen türleri ve birbirleriyle ilişkisi",
      p: [
        "Dört kenarı ve dört köşesi olan kapalı şekillere dörtgen denir; iç açılarının toplamı her zaman 360°'dir. Dörtgenler, kenarlarının paralel ya da eşit olmasına göre sınıflanır ve bu sınıflar iç içe geçer. Bu ilişkiyi bilmek, her şekil için ayrı formül ezberlemek yerine birkaç ana formülü anlamayı sağlar.",
        "<strong>Yamuk</strong> en az bir çift karşılıklı kenarı paralel olan dörtgendir. <strong>Paralelkenar</strong>da iki çift karşılıklı kenar paraleldir; bu yüzden her paralelkenar bir yamuk özelliği taşır. <strong>Eşkenar dörtgen</strong> dört kenarı eşit olan paralelkenardır. <strong>Dikdörtgen</strong> açıları 90° olan paralelkenar, <strong>kare</strong> ise hem dikdörtgen hem eşkenar dörtgen olan şekildir. <strong>Deltoid</strong> ise iki çift komşu kenarı eşit olan dörtgendir.",
        "Ortaokulda 8. sınıfa kadar kare, dikdörtgen, paralelkenar ve yamuk alanları; lisede ise köşegenlerle ve trigonometriyle alan hesapları işlenir. Bu ilişkiyi bilmek, bir şeklin hangi formülle hesaplanacağına hızla karar vermenizi sağlar."
      ]
    },
    {
      h: "Paralelkenarın alanı nasıl bulunur?",
      p: [
        "Paralelkenarın bir ucundan dik bir üçgen kesip öbür uca taşıdığınızda aynı taban ve yükseklikte bir dikdörtgen elde edersiniz. Bu yüzden alan, dikdörtgendeki gibi taban ile yüksekliğin çarpımıdır. Burada yükseklik, tabana dik olarak ölçülen uzaklıktır; eğik yan kenar değildir.",
        "İki kenar ve aralarındaki açı biliniyorsa yükseklik, yan kenarın açının sinüsüyle çarpımıdır. Bu da alanı kenarlar ve açıyla hesaplamayı sağlar."
      ],
      formula: "A = taban × yükseklik\nA = a × b × sin α\nÇevre = 2 × (a + b)",
      ul: [
        "Taban 10 cm, yükseklik 6 cm: A = 10 × 6 = 60 cm².",
        "Kenarlar 10 ve 7 cm, aradaki açı 30°: A = 10 × 7 × sin 30° = 70 × 0,5 = 35 cm²; çevre 2 × (10 + 7) = 34 cm.",
        "Aynı kenarlarla açı 90° olursa sin 90° = 1 ve alan 70 cm² olur: şekil dikdörtgendir ve alabileceği en büyük alana ulaşır."
      ],
      after: [
        "Taban ve yükseklikten ya da iki kenar ve açıdan hesap yapmak için [[arac:paralelkenar-alani-hesapla|Paralelkenar Alanı Hesaplama]] aracı köşegen uzunluklarını da gösterir. Sinüs değerleri için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosuna]] bakabilirsiniz."
      ]
    },
    {
      h: "Yamuğun alanı nasıl hesaplanır?",
      p: [
        "Aynı yamuktan bir tane daha alıp ters çevirerek yanına koyarsanız tabanı (a + b), yüksekliği h olan bir paralelkenar oluşur. Bu paralelkenarın alanı (a + b) × h'dir; yamuk bunun yarısıdır. Formül buradan gelir.",
        "Yan kenarların orta noktalarını birleştiren doğru parçasına <strong>orta taban</strong> denir ve uzunluğu tabanların ortalamasıdır. Orta taban ile yüksekliği çarpmak da yamuğun alanını verir; bu yol özellikle orta tabanın verildiği sorularda işe yarar."
      ],
      formula: "A = (a + b) × h ÷ 2\nOrta taban: m = (a + b) ÷ 2  ⇒  A = m × h\nÇevre = a + b + c + d",
      ol: [
        "Alt taban 14 cm, üst taban 8 cm, yükseklik 4 cm olsun.",
        "Tabanları toplayın: 14 + 8 = 22 cm.",
        "Yükseklikle çarpın: 22 × 4 = 88.",
        "İkiye bölün: A = 44 cm². Orta taban 11 cm'dir ve 11 × 4 = 44 ile sağlanır."
      ],
      after: [
        "Tabanları ve yüksekliği girip alanı, orta tabanı ve yan kenarlar yazılırsa çevreyi görmek için [[arac:yamuk-alani-hesapla|Yamuk Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Yamukta yükseklik nasıl bulunur?",
      p: [
        "Sorularda yükseklik çoğu zaman verilmez; tabanlar ve yan kenarlar verilir. Üst tabanın uçlarından alt tabana dikmeler indirildiğinde yanlarda dik üçgenler oluşur ve yükseklik Pisagor bağıntısıyla bulunur.",
        "<strong>İkizkenar yamukta</strong> yan kenarlar eşittir ve iki dik üçgen birbirinin aynısıdır. Tabanlar farkının yarısı, dik üçgenin yatay kenarını verir. <strong>Dik yamukta</strong> ise yan kenarlardan biri zaten yüksekliktir."
      ],
      formula: "İkizkenar yamuk: x = (a − b) ÷ 2   ve   h = √(c² − x²)",
      ul: [
        "Tabanlar 14 ve 8 cm, yan kenarlar 5 cm: x = (14 − 8) ÷ 2 = 3 cm; h = √(25 − 9) = √16 = 4 cm. Alan 44 cm², çevre 14 + 8 + 5 + 5 = 32 cm.",
        "Alan ve tabanlar biliniyorsa yükseklik ters formülle bulunur: h = 2 × A ÷ (a + b). 44 cm² ve tabanlar toplamı 22 ise h = 88 ÷ 22 = 4 cm.",
        "Dik üçgenlerde 3-4-5, 6-8-10, 5-12-13 gibi tam sayılı üçlüler sınav sorularında sıkça kullanılır; dik üçgen bağıntısını [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] sayfasında bulabilirsiniz."
      ]
    },
    {
      h: "Eşkenar dörtgen ve deltoidin alanı köşegenlerle nasıl hesaplanır?",
      p: [
        "Eşkenar dörtgenin köşegenleri birbirini dik açıyla ve tam ortadan keser. Şekil, köşegenlerin oluşturduğu dört eş dik üçgene ayrılır. Her üçgenin dik kenarları e ÷ 2 ve f ÷ 2'dir; dördünün toplam alanı e × f ÷ 2 eder. Bu, kenarları e ve f olan dikdörtgenin tam yarısıdır.",
        "Deltoidde de köşegenler birbirine diktir, ancak yalnızca biri ötekini ortalar. Formül yine aynıdır, çünkü alan hesabında yalnızca diklik önemlidir. Köşegenleri dik kesişen her dörtgenin alanı e × f ÷ 2'dir."
      ],
      formula: "A = e × f ÷ 2\nKenar: a = √((e ÷ 2)² + (f ÷ 2)²)\nA = a × h   (eşkenar dörtgen)",
      ul: [
        "Köşegenler 12 ve 16 cm: A = 12 × 16 ÷ 2 = 96 cm². Kenar √(6² + 8²) = √100 = 10 cm, çevre 40 cm, yükseklik 96 ÷ 10 = 9,6 cm.",
        "Deltoid, köşegenler 10 ve 14 cm: A = 10 × 14 ÷ 2 = 70 cm².",
        "Kare de bir eşkenar dörtgendir: köşegeni 10 cm olan karenin alanı 10 × 10 ÷ 2 = 50 cm², kenarı √50 ≈ 7,07 cm'dir."
      ],
      after: [
        "Köşegenlerden, kenar ve yükseklikten ya da kenar ve açıdan hesap yapmak için [[arac:eskenar-dortgen-alani-hesapla|Eşkenar Dörtgen Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Dikdörtgen ve kare bu formüllerin özel hali mi?",
      p: [
        "Evet. Dikdörtgen açıları 90° olan bir paralelkenardır; yükseklik kısa kenara eşit olduğu için taban × yükseklik formülü a × b'ye dönüşür. Kare, kenarları eşit bir dikdörtgendir: A = a². Ayrıca kare, köşegenleri eşit bir eşkenar dörtgendir ve e × f ÷ 2 formülü d² ÷ 2'ye dönüşür.",
        "Yamuk formülü de bu şekillere uygulanabilir. Paralelkenarda iki taban eşit olduğundan (a + a) × h ÷ 2 = a × h çıkar. Böylece tek bir yamuk formülü, bütün paralel kenarlı dörtgenleri kapsar."
      ],
      table: {
        head: ["Şekil", "Alan formülü", "Çevre formülü", "Örnek"],
        rows: [
          ["Kare", "a²", "4a", "a = 7 → 49 cm², 28 cm"],
          ["Dikdörtgen", "a × b", "2(a + b)", "8 × 5 → 40 cm², 26 cm"],
          ["Paralelkenar", "taban × h", "2(a + b)", "10 × 6 → 60 cm²"],
          ["Eşkenar dörtgen", "e × f ÷ 2", "4a", "12, 16 → 96 cm², 40 cm"],
          ["Yamuk", "(a + b) × h ÷ 2", "a + b + c + d", "14, 8, h 4 → 44 cm²"],
          ["Deltoid", "e × f ÷ 2", "2(a + b)", "10, 14 → 70 cm²"]
        ],
        caption: "Tablodaki örnekler bu sayfadaki çözümlerle aynıdır; birimler santimetre ve santimetrekaredir."
      },
      after: [
        "Bütün düzlem şekillerinin alan, çevre ve hacim hesabı için [[arac:alan-cevre-hesapla|Alan ve Çevre Hesaplama]] aracı adım adım çözüm gösterir. Üçgen, daire ve cisimlerin formülleri [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] sayfasında toplu olarak yer alır."
      ]
    },
    {
      h: "Arsa yamuk şeklindeyse alanı nasıl bulunur?",
      p: [
        "Yola cepheli arsalar sık sık yamuk biçimindedir: ön ve arka cephe paraleldir ama uzunlukları farklıdır. Ön cephe 40 m, arka cephe 25 m ve iki cephe arasındaki dik uzaklık 30 m ise alan (40 + 25) × 30 ÷ 2 = 975 m² olur.",
        "Buradaki tuzak, yan sınır uzunluğunu yükseklik yerine kullanmaktır. Yan sınırlar eğikse uzunlukları dik uzaklıktan büyüktür ve alan olduğundan fazla çıkar. Arazide dik uzaklığı ölçmek zorsa arsa iki üçgene bölünüp her biri ayrı hesaplanabilir.",
        "Tapu ve imar işlemlerinde geçerli olan alan, resmî ölçümle belirlenen değerdir; yukarıdaki hesap yalnızca tahmin ve karşılaştırma içindir. Metrekareyi dönüme çevirmek için 1 dönüm = 1.000 m² kabul edilir; 975 m² yaklaşık 0,98 dönümdür. Ayrıntı için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Dörtgenin çevresi nasıl hesaplanır? Sık yapılan hatalar",
      p: [
        "Her dörtgenin çevresi dört kenar uzunluğunun toplamıdır. Paralelkenar, dikdörtgen ve deltoidde karşılıklı ya da komşu kenarlar eşit olduğu için 2(a + b) yazılabilir; kare ve eşkenar dörtgende 4a yeterlidir. Yükseklik ve köşegenler çevreye girmez."
      ],
      ul: [
        "<strong>Yan kenarı yükseklik sanmak:</strong> Paralelkenar ve yamukta yükseklik tabana dik ölçülür; eğik kenarı kullanmak alanı büyütür.",
        "<strong>Yamukta ikiye bölmeyi unutmak:</strong> (a + b) × h işlemi iki yamuğun alanını verir.",
        "<strong>Köşegen formülünü her dörtgene uygulamak:</strong> e × f ÷ 2 yalnızca köşegenleri dik kesişen dörtgenlerde doğrudur; dikdörtgende köşegenler dik değildir.",
        "<strong>Birimleri karıştırmak:</strong> Kenarlar metre, yükseklik santimetre verilmişse önce aynı birime çevirin.",
        "<strong>Alanla çevreyi karıştırmak:</strong> Çit, süpürgelik ve kenar bandı için çevre; boya, fayans ve çim için alan gerekir."
      ]
    }
  ],
  faq: [
    ["Yamuğun alanı nasıl hesaplanır?", "Yamuğun alanı iki paralel tabanın toplamı ile yüksekliğin çarpılıp ikiye bölünmesiyle bulunur: A = (a + b) × h ÷ 2. Tabanları 14 ve 8 cm, yüksekliği 4 cm olan yamuğun alanı 44 cm²'dir."],
    ["Paralelkenarın alanı nasıl bulunur?", "Paralelkenarın alanı taban ile o tabana dik yüksekliğin çarpımıdır. İki kenar ve aradaki açı biliniyorsa A = a × b × sin α kullanılır; kenarlar 10 ve 7 cm, açı 30° ise alan 35 cm²'dir."],
    ["Eşkenar dörtgenin alanı köşegenlerle nasıl hesaplanır?", "Köşegenlerin çarpımı ikiye bölünür: A = e × f ÷ 2. Köşegenleri 12 ve 16 cm olan eşkenar dörtgenin alanı 96 cm²'dir; kenarı da yarım köşegenlerden Pisagor ile 10 cm bulunur."],
    ["Dikdörtgen ve kare bu formüllerin özel hali mi?", "Evet. Dikdörtgen açıları dik olan bir paralelkenar, kare ise kenarları eşit bir dikdörtgen ve köşegenleri eşit bir eşkenar dörtgendir. Bu yüzden genel formüller onlar için a × b ve a² biçimine dönüşür."],
    ["Yamukta yükseklik nasıl bulunur?", "İkizkenar yamukta tabanlar farkının yarısı ile yan kenar kullanılarak Pisagor bağıntısı uygulanır: h = √(c² − x²). Tabanlar 14 ve 8, yan kenar 5 cm ise yükseklik 4 cm çıkar."],
    ["Dörtgenin çevresi nasıl hesaplanır?", "Dörtgenin çevresi dört kenar uzunluğunun toplamıdır. Paralelkenar ve dikdörtgende 2 × (a + b), kare ve eşkenar dörtgende 4 × a yazılabilir; yükseklik ve köşegenler çevre hesabına girmez."],
    ["Arsa yamuk şeklindeyse alanı nasıl bulunur?", "Paralel olan ön ve arka cephe uzunlukları toplanır, aralarındaki dik uzaklıkla çarpılıp ikiye bölünür. 40 m ve 25 m cepheli, 30 m derinlikli arsa yaklaşık 975 m²'dir; resmî alan için tapu ölçümü esas alınır."],
    ["Deltoidin alanı nasıl hesaplanır?", "Deltoidin köşegenleri birbirine dik olduğu için alanı köşegenlerin çarpımının yarısıdır: A = e × f ÷ 2. Köşegenleri 10 ve 14 cm olan deltoidin alanı 70 cm²'dir."],
    ["Yamuğun orta tabanı ne işe yarar?", "Orta taban, yan kenarların orta noktalarını birleştirir ve uzunluğu tabanların ortalamasıdır. Orta taban ile yüksekliği çarpmak doğrudan yamuğun alanını verir; 11 cm orta taban ve 4 cm yükseklik 44 cm² eder."]
  ],
  tools: ["yamuk-alani-hesapla", "paralelkenar-alani-hesapla", "eskenar-dortgen-alani-hesapla", "alan-cevre-hesapla"],
  related: ["alan-ve-hacim-formulleri", "pisagor-teoremi-nedir", "daire-dilimi-ve-yay-uzunlugu"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
