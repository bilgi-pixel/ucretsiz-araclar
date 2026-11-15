export default {
  slug: "alan-ve-hacim-formulleri",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Alan ve Hacim Formülleri: Kare, Daire, Üçgen, Silindir ve Küre",
  pageTitle: "Alan ve Hacim Formülleri: Daire, Üçgen, Silindir, Küre, Koni",
  description: "Dairenin alanı πr², üçgenin alanı taban × yükseklik ÷ 2, silindirin hacmi πr²h, kürenin hacmi 4/3πr³. Formül tabloları, çözümlü örnekler ve m³–litre dönüşümü.",
  keywords: ["alan formülleri", "hacim formülleri", "daire alanı formülü", "silindir hacmi", "küre hacmi formülü", "üçgen alanı", "yamuk alanı", "m3 kaç litre"],
  lead: "Alan, bir yüzeyin kapladığı yeri (birim kare), hacim ise bir cismin kapladığı boşluğu (birim küp) ölçer. En sık kullanılan formüller şunlardır: dairenin alanı <strong>πr²</strong>, üçgenin alanı <strong>taban × yükseklik ÷ 2</strong>, silindirin hacmi <strong>πr²h</strong>, kürenin hacmi <strong>4/3 πr³</strong>. Hacim hesaplarında 1 m³ = 1.000 litre eşitliği, depo ve havuz gibi günlük problemleri çözmeyi kolaylaştırır. Bu sayfada düzlem şekillerin alan ve çevre formüllerini, cisimlerin hacim ve yüzey alanı formüllerini, birim dönüşümlerini ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Kare: a²; dikdörtgen: a × b; üçgen: taban × yükseklik ÷ 2; yamuk: (a + c) ÷ 2 × h.",
    "Daire: alan πr², çevre 2πr; π ≈ 3,14159.",
    "Prizma ve silindir: hacim = taban alanı × yükseklik; silindir için V = πr²h.",
    "Koni ve piramit: hacim = taban alanı × yükseklik ÷ 3; koni için V = πr²h ÷ 3.",
    "Küre: hacim 4/3 πr³, yüzey alanı 4πr².",
    "1 m³ = 1.000 litre, 1 dm³ = 1 litre, 1 cm³ = 1 ml."
  ],
  figure: {
    alt: "Düzlem şekiller ve cisimlerin formül kartları: kare a², üçgen a·h÷2, daire πr², yamuk (a+c)÷2·h; küp a³, silindir πr²h, koni πr²h÷3, küre 4/3πr³.",
    caption: "Üst sıra yüzey ölçüsü (alan, birim²), alt sıra boşluk ölçüsü (hacim, birim³). Koninin hacmi aynı taban ve yükseklikteki silindirin tam üçte biridir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Alan (birim²)</text>
  <g class="mid">
    <rect x="20" y="42" width="160" height="160" rx="10" class="sf sb"/>
    <rect x="60" y="62" width="80" height="80" class="ps"/><text x="100" y="158" class="sm">a</text>
    <text x="100" y="188" class="lg b p">a²</text>
    <rect x="193" y="42" width="160" height="160" rx="10" class="sf sb"/>
    <polygon points="223,142 323,142 293,62" class="ps"/><line x1="293" y1="62" x2="293" y2="142" class="st dash" fill="none"/>
    <text x="273" y="158" class="sm">taban a</text><text x="303" y="108" class="sm">h</text>
    <text x="273" y="188" class="lg b p">a · h ÷ 2</text>
    <rect x="366" y="42" width="160" height="160" rx="10" class="sf sb"/>
    <circle cx="446" cy="102" r="42" class="ps"/><line x1="446" y1="102" x2="488" y2="102" class="sp" fill="none"/>
    <text x="467" y="96" class="sm">r</text>
    <text x="446" y="188" class="lg b p">π r²</text>
    <rect x="539" y="42" width="161" height="160" rx="10" class="sf sb"/>
    <polygon points="569,142 669,142 644,72 594,72" class="ps"/>
    <text x="619" y="66" class="sm">c</text><text x="619" y="158" class="sm">a</text>
    <text x="619" y="188" class="lg b p">(a+c) ÷ 2 · h</text>
  </g>
  <text x="360" y="240" class="lg b mid">Hacim (birim³)</text>
  <g class="mid">
    <rect x="20" y="254" width="160" height="170" rx="10" class="sf sb"/>
    <polygon points="70,290 120,290 140,275 90,275" class="oks"/><rect x="70" y="290" width="50" height="50" class="oks"/>
    <polygon points="120,290 140,275 140,325 120,340" class="ok"/>
    <text x="100" y="364" class="sm">kenar a</text><text x="100" y="404" class="lg b ok">a³</text>
    <rect x="193" y="254" width="160" height="170" rx="10" class="sf sb"/>
    <rect x="243" y="282" width="60" height="56" class="oks"/>
    <ellipse cx="273" cy="338" rx="30" ry="10" class="oks"/><ellipse cx="273" cy="282" rx="30" ry="10" class="ok"/>
    <text x="273" y="370" class="sm">r, h</text><text x="273" y="404" class="lg b ok">π r² h</text>
    <rect x="366" y="254" width="160" height="170" rx="10" class="sf sb"/>
    <polygon points="416,338 476,338 446,272" class="oks"/><ellipse cx="446" cy="338" rx="30" ry="10" class="ok"/>
    <text x="446" y="370" class="sm">r, h</text><text x="446" y="404" class="lg b ok">π r² h ÷ 3</text>
    <rect x="539" y="254" width="161" height="170" rx="10" class="sf sb"/>
    <circle cx="619" cy="310" r="34" class="oks"/><ellipse cx="619" cy="310" rx="34" ry="10" class="sok" fill="none"/>
    <text x="619" y="370" class="sm">yarıçap r</text><text x="619" y="404" class="lg b ok">4/3 π r³</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Alan, çevre ve hacim arasındaki fark",
      p: [
        "<strong>Çevre</strong>, bir şeklin sınırının toplam uzunluğudur ve metre, santimetre gibi uzunluk birimleriyle ölçülür. Bir bahçenin etrafına çekilecek çitin uzunluğu çevre sorusudur. <strong>Alan</strong>, şeklin kapladığı yüzeyin büyüklüğüdür ve birim kare (m², cm²) ile ölçülür; bahçeye serilecek çimin miktarı alan sorusudur.",
        "<strong>Hacim</strong> ise üç boyutlu bir cismin kapladığı boşluktur ve birim küp (m³, cm³) ya da litre ile ölçülür. Bir su deposunun ne kadar su alacağı hacim sorusudur. Aynı cismin dış yüzeyini kaplamak için gereken boya ya da kaplama miktarı ise <strong>yüzey alanı</strong> sorusudur.",
        "Birimlerin üssü size hangi büyüklükle çalıştığınızı hatırlatır: uzunluk için üs yok (m), alan için kare (m²), hacim için küp (m³). Formülün sonucu yanlış birimle çıkıyorsa bir yerde hata vardır."
      ]
    },
    {
      h: "Düzlem şekillerin alan ve çevre formülleri",
      table: {
        head: ["Şekil", "Alan", "Çevre", "Simgeler"],
        rows: [
          ["Kare", "a²", "4a", "a: kenar"],
          ["Dikdörtgen", "a × b", "2(a + b)", "a, b: kenarlar"],
          ["Üçgen", "a × h ÷ 2", "a + b + c", "a: taban, h: o tabana ait yükseklik"],
          ["Dik üçgen", "a × b ÷ 2", "a + b + c", "a, b: dik kenarlar"],
          ["Eşkenar üçgen", "a² √3 ÷ 4", "3a", "a: kenar"],
          ["Paralelkenar", "a × h", "2(a + b)", "h: a kenarına ait yükseklik"],
          ["Eşkenar dörtgen", "e × f ÷ 2", "4a", "e, f: köşegenler"],
          ["Yamuk", "(a + c) ÷ 2 × h", "a + b + c + d", "a, c: paralel kenarlar"],
          ["Daire", "π r²", "2 π r", "r: yarıçap"],
          ["Daire dilimi", "π r² × α ÷ 360", "2r + 2πr × α ÷ 360", "α: merkez açı (derece)"]
        ],
        caption: "π (pi) sayısı yaklaşık 3,14159'dur; okul problemlerinde çoğu zaman 3 ya da 3,14 alınması istenir."
      },
      after: [
        "Şekli seçip ölçüleri girerek alanı, çevreyi ve adım adım çözümü görmek için [[arac:alan-cevre-hesapla|Alan ve Çevre Hesaplama]] aracını kullanabilirsiniz; yalnızca daire için yarıçap, çap ya da çevreden alan bulan [[arac:daire-alani-hesapla|Daire Alanı Hesaplama]] aracı da vardır."
      ]
    },
    {
      h: "Alan hesabında çözümlü örnekler",
      ol: [
        "<strong>Daire:</strong> Yarıçapı 5 cm olan dairenin alanı π × 5² = 25π ≈ 78,54 cm², çevresi 2 × π × 5 = 10π ≈ 31,42 cm'dir. Çap verilmişse önce ikiye bölüp yarıçapı bulmayı unutmayın.",
        "<strong>Üçgen:</strong> Tabanı 10 cm, yüksekliği 6 cm olan üçgenin alanı 10 × 6 ÷ 2 = 30 cm²'dir. Yükseklik, tabana dik inen uzunluktur; kenar uzunluğu değildir.",
        "<strong>Yamuk:</strong> Paralel kenarları 8 m ve 4 m, yüksekliği 5 m olan yamuk bir arsanın alanı (8 + 4) ÷ 2 × 5 = 30 m²'dir.",
        "<strong>Bileşik şekil:</strong> L şeklindeki bir odayı iki dikdörtgene ayırın: 5 × 4 = 20 m² ve 3 × 2 = 6 m²; toplam 26 m². Karmaşık şekillerde ayırma yöntemi en güvenli yoldur.",
        "<strong>Pizza karşılaştırması:</strong> 30 cm çaplı bir pizzanın alanı π × 15² ≈ 707 cm², 40 cm çaplı pizzanın alanı π × 20² ≈ 1.257 cm²'dir. Çap yalnızca %33 artmışken alan %78 artar, çünkü alan yarıçapın karesiyle büyür."
      ]
    },
    {
      h: "Cisimlerin hacim ve yüzey alanı formülleri",
      p: [
        "Hacim formüllerinin çoğu tek bir mantığa dayanır: tabanı yukarı doğru eşit kesitle uzayan cisimlerde (prizma, silindir) hacim = taban alanı × yükseklik; tepede bir noktada birleşen cisimlerde (piramit, koni) hacim = taban alanı × yükseklik ÷ 3."
      ],
      table: {
        head: ["Cisim", "Hacim", "Yüzey alanı", "Simgeler"],
        rows: [
          ["Küp", "a³", "6a²", "a: kenar"],
          ["Dikdörtgenler prizması", "a × b × c", "2(ab + ac + bc)", "a, b, c: ayrıtlar"],
          ["Silindir", "π r² h", "2πr² + 2πrh", "r: taban yarıçapı, h: yükseklik"],
          ["Koni", "π r² h ÷ 3", "πr² + πr × l", "l: ana doğru, l = √(r² + h²)"],
          ["Kare piramit", "a² × h ÷ 3", "a² + 2a × eğik yükseklik", "a: taban kenarı"],
          ["Küre", "4/3 π r³", "4 π r²", "r: yarıçap"],
          ["Yarım küre", "2/3 π r³", "3 π r² (taban dahil)", "r: yarıçap"]
        ]
      },
      after: [
        "Silindir ve küre hesaplarını litre karşılığıyla birlikte görmek için [[arac:silindir-hacmi-hesapla|Silindir Hacmi Hesaplama]] ve [[arac:kure-hacmi-hesapla|Küre Hacmi Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Hacim hesabında çözümlü örnekler",
      ol: [
        "<strong>Silindir su deposu:</strong> Çapı 1 m, yüksekliği 1,5 m olan bir deponun yarıçapı 0,5 m'dir. V = π × 0,5² × 1,5 = π × 0,375 ≈ 1,178 m³. 1 m³ = 1.000 litre olduğundan depo yaklaşık 1.178 litre su alır.",
        "<strong>Havuz:</strong> 8 m × 4 m tabanlı ve 1,5 m derinliğindeki dikdörtgen bir havuzun hacmi 8 × 4 × 1,5 = 48 m³, yani 48.000 litredir.",
        "<strong>Koni:</strong> Taban yarıçapı 3 cm, yüksekliği 4 cm olan bir koninin hacmi π × 9 × 4 ÷ 3 = 12π ≈ 37,70 cm³'tür. Ana doğrusu √(9 + 16) = 5 cm olduğundan yüzey alanı π × 9 + π × 3 × 5 = 24π ≈ 75,40 cm²'dir.",
        "<strong>Küre:</strong> Yarıçapı 10 cm olan bir topun hacmi 4/3 × π × 1.000 ≈ 4.188,79 cm³, yani yaklaşık 4,19 litredir. Yüzey alanı 4 × π × 100 ≈ 1.256,64 cm²'dir.",
        "<strong>Beton miktarı:</strong> 10 m uzunluğunda, 0,3 m genişliğinde ve 0,5 m derinliğinde bir temel kanalı için 10 × 0,3 × 0,5 = 1,5 m³ beton gerekir."
      ]
    },
    {
      h: "Birim dönüşümleri: m², m³ ve litre",
      p: [
        "Alan ve hacim birimlerinde dönüşüm katsayısı uzunluk birimindeki katsayının karesi ya da küpüdür. 1 m = 100 cm iken 1 m² = 10.000 cm², 1 m³ = 1.000.000 cm³'tür. Bu nokta gözden kaçtığında sonuç 100 ya da 10.000 kat hatalı çıkar."
      ],
      table: {
        head: ["Büyüklük", "Dönüşüm"],
        rows: [
          ["Uzunluk", "1 m = 10 dm = 100 cm = 1.000 mm"],
          ["Alan", "1 m² = 100 dm² = 10.000 cm²"],
          ["Alan (arazi)", "1 dönüm = 1.000 m² · 1 hektar = 10.000 m²"],
          ["Hacim", "1 m³ = 1.000 dm³ = 1.000.000 cm³"],
          ["Hacim – sıvı", "1 m³ = 1.000 litre · 1 dm³ = 1 litre · 1 cm³ = 1 ml"]
        ]
      },
      after: [
        "Litre ile metreküp arasında hızlı çevirme için [[arac:litre-metrekup-cevir|Litre Metreküp Çevirici]] aracını kullanabilirsiniz; su faturası, depo ve havuz hesaplarında işinize yarar."
      ]
    },
    {
      h: "Formüller nereden geliyor? Kısa sezgiler",
      ul: [
        "<strong>Üçgen neden yarım?</strong> Aynı taban ve yükseklikteki iki eş üçgen yan yana getirildiğinde bir paralelkenar oluşur; paralelkenarın alanı a × h olduğundan tek üçgen bunun yarısıdır.",
        "<strong>Dairenin alanı neden πr²?</strong> Daireyi çok ince dilimlere ayırıp dilimleri sırayla ters düz dizdiğinizde, kenarları r ve yarım çevre (πr) olan bir dikdörtgene yaklaşır; alanı r × πr = πr²'dir.",
        "<strong>Koni neden silindirin üçte biri?</strong> Aynı taban ve yükseklikteki bir koniyi suyla doldurup silindire boşaltırsanız silindiri tam üç seferde doldurursunuz. Bu ilişki piramit ile prizma arasında da geçerlidir.",
        "<strong>Küre neden 4/3 πr³?</strong> Bir küre, kendisini tam içine alan silindirin hacminin üçte ikisidir. Silindirin hacmi πr² × 2r = 2πr³ olduğundan kürenin hacmi 2/3 × 2πr³ = 4/3 πr³ eder."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çap ile yarıçapı karıştırmak:</strong> Formüllerdeki r yarıçaptır. Çapı doğrudan kullanmak daire alanını 4 kat, küre hacmini 8 kat büyük çıkarır.",
        "<strong>Eğik kenarı yükseklik sanmak:</strong> Üçgen, paralelkenar ve yamukta yükseklik tabana diktir; eğik kenar uzunluğu yükseklik değildir.",
        "<strong>Koni ve piramitte ÷ 3'ü unutmak:</strong> Tepede birleşen cisimlerde hacim, prizmadaki karşılığının üçte biridir.",
        "<strong>Birimleri eşitlemeden çarpmak:</strong> Bir ölçü cm, diğeri m ise önce aynı birime çevirin; aksi hâlde sonuç anlamsız olur.",
        "<strong>Alan dönüşümünde 100 ile çarpmak:</strong> 1 m² = 100 cm² değil, 10.000 cm²'dir.",
        "<strong>Alan ile çevreyi karıştırmak:</strong> Çit uzunluğu çevre, zemine serilecek malzeme alan sorusudur. Fayans ve boya ihtiyacı için [[bilgi:kac-litre-boya-kac-m2-fayans|boya ve fayans hesaplama rehberi]] pratik örnekler sunar."
      ]
    }
  ],
  faq: [
    ["Dairenin alanı nasıl hesaplanır?", "Dairenin alanı yarıçapın karesinin π ile çarpılmasıyla bulunur: A = πr². Yarıçapı 5 cm olan dairenin alanı yaklaşık 78,54 cm²'dir; çap verilmişse önce ikiye bölünerek yarıçap bulunmalıdır."],
    ["Üçgenin alanı formülü nedir?", "Üçgenin alanı taban uzunluğu ile o tabana ait yüksekliğin çarpımının yarısıdır: A = a × h ÷ 2. Yükseklik bilinmiyorsa üç kenarla Heron formülü ya da iki kenar ve aradaki açıyla sinüs formülü kullanılabilir."],
    ["Silindirin hacmi nasıl bulunur?", "Silindirin hacmi taban dairesinin alanı ile yüksekliğin çarpımıdır: V = πr²h. Çapı 1 m, yüksekliği 1,5 m olan bir depo yaklaşık 1,178 m³, yani 1.178 litre su alır."],
    ["Kürenin hacmi formülü nedir?", "Kürenin hacmi V = 4/3 × π × r³ formülüyle hesaplanır. Yarıçapı 10 cm olan bir kürenin hacmi yaklaşık 4.188,79 cm³'tür ve bu da yaklaşık 4,19 litreye karşılık gelir."],
    ["Koni hacmi nasıl hesaplanır?", "Koninin hacmi taban alanı ile yüksekliğin çarpımının üçte biridir: V = πr²h ÷ 3. Aynı taban ve yükseklikteki silindirin hacminin tam üçte birine eşittir."],
    ["Yamuk alanı nasıl bulunur?", "Yamuğun paralel iki kenarı toplanıp ikiye bölünür ve yükseklikle çarpılır: A = (a + c) ÷ 2 × h. Paralel kenarları 8 ve 4 m, yüksekliği 5 m olan yamuğun alanı 30 m²'dir."],
    ["Alan ile çevre farkı nedir?", "Çevre bir şeklin sınırının uzunluğudur ve metre gibi uzunluk birimiyle ölçülür. Alan ise şeklin kapladığı yüzeydir ve metrekare gibi kare birimlerle ölçülür; çit uzunluğu çevre, halı miktarı alan sorusudur."],
    ["m³ kaç litre eder?", "1 metreküp 1.000 litreye eşittir. Ayrıca 1 desimetreküp 1 litre, 1 santimetreküp ise 1 mililitre eder; bu eşitlikler depo, havuz ve su faturası hesaplarında kullanılır."],
    ["Dikdörtgen prizmanın hacmi nasıl hesaplanır?", "Dikdörtgen prizmanın hacmi üç ayrıtının çarpımıdır: V = a × b × c. 8 m × 4 m tabanlı, 1,5 m derinliğindeki bir havuzun hacmi 48 m³, yani 48.000 litredir."]
  ],
  tools: ["alan-cevre-hesapla", "daire-alani-hesapla", "silindir-hacmi-hesapla", "kure-hacmi-hesapla", "litre-metrekup-cevir"],
  related: ["pisagor-teoremi-nedir", "kac-litre-boya-kac-m2-fayans"]
};
