export default {
  slug: "koni-ve-piramit-hacmi-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Koni ve Piramit Hacmi Nasıl Hesaplanır? Formüller ve Çözümlü Örnek",
  pageTitle: "Koni ve Piramit Hacmi Formülü: Yüzey Alanı ve Çözümlü Örnek",
  description: "Koni hacmi V = (1/3)·π·r²·h, piramit hacmi V = (1/3)·taban alanı·h. Neden 1/3 olduğu, ana doğru, yüzey alanı, kesik koni ve dondurma külahı örnekleri.",
  keywords: ["koni hacmi formülü", "piramit hacmi formülü", "koni yüzey alanı", "kesik koni hacmi", "kare piramit hacmi", "koni ana doğrusu", "neden üçte bir", "piramit yüzey alanı"],
  lead: "Koninin hacmi <strong>V = (1/3) · π · r² · h</strong>, piramidin hacmi <strong>V = (1/3) · taban alanı · h</strong> formülüyle hesaplanır; yani her iki cisim de aynı taban ve yükseklikteki silindirin ya da prizmanın tam <strong>üçte biri</strong> kadar hacim kaplar. Yarıçapı 3 cm, yüksekliği 4 cm olan koninin hacmi 12π ≈ 37,70 cm³'tür. Bu sayfada 1/3 çarpanının nereden geldiğini, ana doğruyu (yanal yükseklik), yüzey alanı formüllerini, kesik koniyi ve dondurma külahının kaç ml aldığını adım adım çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Koni hacmi: V = (1/3)·π·r²·h; r taban yarıçapı, h dik yüksekliktir.",
    "Piramit hacmi: V = (1/3)·A·h; A taban alanıdır (kare tabanda a², dikdörtgende a·b).",
    "1/3 çarpanı, aynı taban ve yükseklikteki silindir ya da prizmanın üç eşit koniye ya da piramide bölünebilmesinden gelir.",
    "Koninin ana doğrusu l = √(r² + h²); r = 3, h = 4 için l = 5'tir.",
    "Koninin yanal alanı π·r·l, toplam yüzey alanı π·r·(r + l)'dir.",
    "Kesik koninin hacmi V = (π·h/3)·(R² + R·r + r²) formülüyle bulunur."
  ],
  figure: {
    alt: "Yan yana silindir, koni ve kare piramit: silindir hacmi π·r²·h, koni ve piramit hacmi bunun üçte biri; koninin yarıçapı 3 cm, yüksekliği 4 cm, ana doğrusu 5 cm ve hacmi yaklaşık 37,70 cm³.",
    caption: "Yarıçapı 3 cm ve yüksekliği 4 cm olan koni, aynı ölçüdeki silindirin (36π ≈ 113,10 cm³) üçte biri kadar, yani 12π ≈ 37,70 cm³ hacim kaplar. Taban kenarı 6 cm, yüksekliği 4 cm olan kare piramit de 144 cm³'lük prizmanın üçte biridir: 48 cm³.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı taban, aynı yükseklik: koni = silindirin 1/3'ü</text>
  <ellipse cx="120" cy="90" rx="70" ry="18" class="sf sb"/>
  <path d="M50 90 L50 250 A70 18 0 0 0 190 250 L190 90" class="sf sb" fill="none"/>
  <ellipse cx="120" cy="250" rx="70" ry="18" class="ps sb"/>
  <text x="120" y="292" class="b mid">Silindir</text>
  <text x="120" y="314" class="sm mid">π · 3² · 4 = 36π</text>
  <text x="120" y="334" class="sm mid t2">≈ 113,10 cm³</text>
  <text x="225" y="180" class="xl mid p">÷3</text>
  <path d="M260 250 L330 90 L400 250" class="sp sw" fill="none"/>
  <ellipse cx="330" cy="250" rx="70" ry="18" class="ps sb"/>
  <line x1="330" y1="90" x2="330" y2="250" class="sa dash" fill="none"/>
  <line x1="330" y1="250" x2="400" y2="250" class="sa sw" fill="none"/>
  <text x="336" y="176" class="sm">h = 4</text>
  <text x="365" y="268" class="sm mid">r = 3</text>
  <text x="378" y="160" class="sm b p">l = 5</text>
  <text x="330" y="292" class="b mid">Koni</text>
  <text x="330" y="314" class="sm mid">(1/3) · π · 9 · 4 = 12π</text>
  <text x="330" y="334" class="sm mid ok b">≈ 37,70 cm³</text>
  <polygon points="470,240 590,240 640,210 520,210" class="ps sb"/>
  <line x1="470" y1="240" x2="555" y2="90" class="st sw" fill="none"/>
  <line x1="590" y1="240" x2="555" y2="90" class="st sw" fill="none"/>
  <line x1="640" y1="210" x2="555" y2="90" class="st sw" fill="none"/>
  <line x1="520" y1="210" x2="555" y2="90" class="st dash" fill="none"/>
  <line x1="555" y1="90" x2="555" y2="225" class="sa dash" fill="none"/>
  <text x="562" y="170" class="sm">h = 4</text>
  <text x="530" y="258" class="sm mid">a = 6</text>
  <text x="555" y="292" class="b mid">Kare piramit</text>
  <text x="555" y="314" class="sm mid">(1/3) · 6² · 4 = 48</text>
  <text x="555" y="334" class="sm mid ok b">48 cm³</text>
  <rect x="20" y="356" width="680" height="50" rx="8" class="sf sb"/>
  <rect x="20" y="356" width="8" height="50" class="p"/>
  <text x="40" y="378" class="b">Ana doğru: l² = r² + h²</text>
  <text x="40" y="398" class="sm t2">3² + 4² = 25 → l = 5 cm · yanal alan π·r·l = 15π ≈ 47,12 cm²</text>
</svg>`
  },
  sections: [
    {
      h: "Koni ve piramit nedir? Temel kavramlar",
      p: [
        "<strong>Koni</strong>, daire biçimli bir tabanın her noktasının tabanın dışındaki tek bir noktaya (tepe noktasına) birleştirilmesiyle oluşan cisimdir. Tepe noktası tabanın merkezinin tam üstündeyse buna <strong>dik koni</strong> denir; okulda ve günlük hayatta karşılaştığımız koniler genellikle diktir. Trafik dubası, dondurma külahı ve huni koni biçimine örnektir.",
        "<strong>Piramit</strong> ise tabanı bir çokgen olan ve yan yüzleri tepe noktasında birleşen üçgenlerden oluşan cisimdir. Tabanın biçimine göre adlandırılır: üçgen piramit, kare piramit, altıgen piramit. Tabanı düzgün çokgen olan ve tepe noktası taban merkezinin üstünde bulunan piramide düzgün piramit denir.",
        "İki cisimde de üç ölçü önemlidir: taban ölçüsü (konide yarıçap r, piramitte kenar a), tepe noktasından tabana inen dik <strong>yükseklik (h)</strong> ve yan yüz boyunca ölçülen <strong>yanal yükseklik</strong>. Konide yanal yüksekliğe <strong>ana doğru (l)</strong>, piramitte yan yüz üçgeninin yüksekliğine <strong>apotem</strong> denir. Hacim için dik yükseklik, yüzey alanı için yanal yükseklik kullanılır; bu ikisini karıştırmak en sık yapılan hatadır."
      ]
    },
    {
      h: "Koninin hacmi nasıl hesaplanır?",
      p: [
        "Koninin hacmi, taban alanı ile yüksekliğin çarpımının üçte biridir. Taban bir daire olduğu için taban alanı π·r²'dir. Silindirin hacmi π·r²·h olduğundan koni, aynı taban ve yükseklikteki silindirin tam üçte biri kadar hacme sahiptir."
      ],
      formula: "V_koni = (1/3) · π · r² · h\nÇap verilirse önce yarıçapı bulun: r = d / 2",
      ol: [
        "<strong>Soru:</strong> Taban yarıçapı 3 cm, yüksekliği 4 cm olan koninin hacmi kaçtır?",
        "Taban alanını bulun: π × 3² = 9π cm².",
        "Yükseklikle çarpın: 9π × 4 = 36π cm³ (bu, aynı ölçüdeki silindirin hacmidir).",
        "Üçe bölün: 36π / 3 = 12π cm³.",
        "π ≈ 3,14159 alırsanız: 12 × 3,14159 ≈ <strong>37,70 cm³</strong>. Sınavlarda sonuç genellikle π'li bırakılır ya da π = 3 alınması istenir; bu durumda 36 cm³ bulunur."
      ],
      after: [
        "İkinci örnek: yarıçapı 6 cm, yüksekliği 8 cm olan koninin hacmi (1/3) × π × 36 × 8 = 96π ≈ 301,59 cm³'tür. Yarıçap iki katına çıktığında hacmin dört katına çıktığına dikkat edin; çünkü yarıçap formülde karesiyle yer alır. Hızlı hesap için [[arac:koni-hacmi-hesapla|Koni Hacmi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Piramidin hacim formülü nedir?",
      p: [
        "Piramidin hacmi de taban alanı ile yüksekliğin çarpımının üçte biridir. Bu formül tabanın biçiminden bağımsızdır; değişen tek şey taban alanının nasıl hesaplandığıdır. Çokgen alanlarını tazelemek için [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısına bakabilirsiniz."
      ],
      formula: "V_piramit = (1/3) · A_taban · h\nKare taban: A = a² · Dikdörtgen taban: A = a · b\nÜçgen taban: A = (taban × yükseklik) / 2",
      table: {
        head: ["Piramit", "Ölçüler", "Taban alanı", "Hacim"],
        rows: [
          ["Kare piramit", "a = 6 cm, h = 4 cm", "36 cm²", "(1/3) × 36 × 4 = 48 cm³"],
          ["Dikdörtgen piramit", "8 × 6 cm, h = 12 cm", "48 cm²", "(1/3) × 48 × 12 = 192 cm³"],
          ["Üçgen piramit", "taban üçgeni 6 × 4 cm, h = 9 cm", "12 cm²", "(1/3) × 12 × 9 = 36 cm³"],
          ["Kare piramit", "a = 10 m, h = 6 m", "100 m²", "(1/3) × 100 × 6 = 200 m³"]
        ],
        caption: "Üçgen piramit satırındaki 6 × 4, taban üçgeninin bir kenarı ile o kenara ait yüksekliğidir."
      },
      after: [
        "Farklı taban türleriyle denemek için [[arac:piramit-hacmi-hesapla|Piramit Hacmi Hesaplama]] aracını kullanabilirsiniz; araç taban alanını ve hacmi birlikte gösterir."
      ]
    },
    {
      h: "Koni ve piramit hacminde neden 1/3 vardır?",
      p: [
        "En kolay görülen kanıt bir küpten gelir. Bir küpün bir köşesini seçip bu köşeyi karşı tarafta kalan üç yüzün her birine birleştirirseniz küp, tepe noktası ortak olan <strong>üç eş kare piramide</strong> bölünür. Her piramidin tabanı küpün bir yüzü, yüksekliği küpün kenarıdır. Üçü bir arada küpü tam doldurduğuna göre her biri küpün hacminin üçte biridir: (1/3)·a²·a.",
        "Bu sonuç bütün piramit ve konilere <strong>Cavalieri ilkesi</strong> ile genellenir: iki cismin aynı yükseklikteki her yatay kesitinin alanı eşitse hacimleri de eşittir. Bir koninin yatay kesitleri tepeye doğru doğrusal küçülen dairelerdir; aynı taban alanına ve yüksekliğe sahip bir piramidin kesitleri de aynı oranda küçülür. Bu yüzden iki cismin hacmi eşittir ve ikisi de taban alanı × yükseklik / 3 formülüne uyar.",
        "Evde yapılabilecek bir deney de aynı sonucu verir: aynı taban çapında ve aynı yükseklikte bir koni kap ile silindir kap hazırlayın. Koniyi suyla doldurup silindire boşaltırsanız silindirin dolması için tam üç kez boşaltmanız gerekir. İntegral hesabında ise kesit alanları toplanarak (1/3) çarpanı r²·x² ifadesinin integralinden doğrudan elde edilir."
      ]
    },
    {
      h: "Ana doğru (yanal yükseklik) nasıl hesaplanır?",
      p: [
        "Dik konide yükseklik, taban yarıçapı ve ana doğru bir dik üçgen oluşturur: dik kenarlar h ve r, hipotenüs l'dir. Bu yüzden ana doğru [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] ile bulunur. Piramitte ise yan yüz üçgeninin yüksekliği (apotem), piramidin yüksekliği ile taban merkezinden kenarın ortasına olan uzaklıktan hesaplanır."
      ],
      formula: "Koni: l = √(r² + h²)\nKare piramit: apotem = √(h² + (a/2)²)",
      ol: [
        "<strong>Koni:</strong> r = 3 cm, h = 4 cm → l = √(9 + 16) = √25 = 5 cm.",
        "<strong>Kare piramit:</strong> a = 6 cm, h = 4 cm → taban merkezinden kenar ortasına uzaklık 3 cm, apotem = √(16 + 9) = 5 cm.",
        "<strong>Ters soru:</strong> Ana doğrusu 13 cm, yarıçapı 5 cm olan koninin yüksekliği h = √(169 − 25) = √144 = 12 cm'dir; hacmi (1/3) × π × 25 × 12 = 100π ≈ 314,16 cm³ olur."
      ]
    },
    {
      h: "Koninin ve piramidin yüzey alanı nasıl bulunur?",
      p: [
        "Koninin yan yüzeyi açıldığında bir daire dilimi elde edilir. Bu dilimin yarıçapı ana doğru l, yay uzunluğu taban çevresi 2πr'dir; alanı π·r·l olur. Toplam yüzey alanı yanal alana taban dairesinin alanı eklenerek bulunur.",
        "Piramitte yanal alan, yan yüz üçgenlerinin alanları toplamıdır. Kare tabanlı düzgün piramitte dört eş üçgen vardır ve her birinin alanı a × apotem / 2'dir."
      ],
      formula: "Koni yanal alan = π · r · l\nKoni toplam alan = π · r · (r + l)\nKare piramit yanal alan = 4 · (a · apotem / 2) = 2 · a · apotem\nKare piramit toplam alan = a² + 2 · a · apotem",
      table: {
        head: ["Cisim", "Ölçüler", "Yanal alan", "Toplam yüzey alanı"],
        rows: [
          ["Koni", "r = 3, h = 4, l = 5 cm", "15π ≈ 47,12 cm²", "24π ≈ 75,40 cm²"],
          ["Koni", "r = 6, h = 8, l = 10 cm", "60π ≈ 188,50 cm²", "96π ≈ 301,59 cm²"],
          ["Kare piramit", "a = 6, h = 4, apotem = 5 cm", "60 cm²", "96 cm²"]
        ]
      },
      after: [
        "Açık kaplarda (külah, huni) taban yoktur; bu durumda yalnızca yanal alan hesaplanır. Yüzey alanlarını görmek için [[arac:koni-yuzey-alani-hesapla|Koni Yüzey Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kesik koninin hacmi nasıl bulunur?",
      p: [
        "Bir koninin tepe kısmı tabana paralel bir düzlemle kesilip atıldığında geriye <strong>kesik koni</strong> kalır. Kova, saksı, abajur ve bazı bardaklar kesik koni biçimindedir. İki farklı yarıçapı vardır: büyük taban yarıçapı R ve küçük taban yarıçapı r. Hacmi, büyük koninin hacminden kesilen küçük koninin hacmi çıkarılarak türetilen formülle bulunur."
      ],
      formula: "V_kesik koni = (π · h / 3) · (R² + R · r + r²)\nÖrnek: R = 5 cm, r = 2 cm, h = 6 cm\nV = (π · 6 / 3) · (25 + 10 + 4) = 2π · 39 = 78π ≈ 245,04 cm³",
      after: [
        "Aynı mantık kesik piramit için de geçerlidir: V = (h / 3)·(A₁ + √(A₁·A₂) + A₂); burada A₁ ve A₂ alt ve üst taban alanlarıdır. Bir saksının kaç litre toprak alacağını bulmak için iç ölçüleri cm olarak girip sonucu 1.000'e bölmeniz yeterlidir; 245 cm³ yaklaşık 0,25 litredir. Hesabı [[arac:kesik-koni-hacmi-hesapla|Kesik Koni Hacmi Hesaplama]] aracıyla yapabilirsiniz."
      ]
    },
    {
      h: "Dondurma külahı kaç ml alır? Günlük hayattan örnekler",
      p: [
        "1 cm³ tam olarak 1 ml'dir. Bu yüzden santimetre ile hesapladığınız koni hacmi doğrudan mililitre olarak okunabilir."
      ],
      ol: [
        "<strong>Külah:</strong> Ağız çapı 5 cm (r = 2,5 cm), derinliği 10 cm olan bir külahın iç hacmi (1/3) × π × 6,25 × 10 ≈ 65,45 cm³, yani yaklaşık <strong>65 ml</strong>'dir. Üstüne konan top dondurma bu hesaba dahil değildir; yarım küre biçimindeki tepe ayrıca hesaplanır.",
        "<strong>Külah kâğıdı:</strong> Aynı külahın ana doğrusu √(6,25 + 100) ≈ 10,31 cm, yanal alanı π × 2,5 × 10,31 ≈ 80,96 cm²'dir; yapıştırma payı için biraz fazla kâğıt gerekir.",
        "<strong>Kum ya da mıcır yığını:</strong> Taban çapı 4 m (r = 2 m), yüksekliği 1,5 m olan koni biçimli yığının hacmi (1/3) × π × 4 × 1,5 ≈ 6,28 m³'tür.",
        "<strong>Piramit çatı:</strong> 10 × 10 m tabanlı, 6 m yüksekliğindeki piramit çatı altında kalan hacim (1/3) × 100 × 6 = 200 m³'tür; havalandırma ve ısıtma hesabında bu değer kullanılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ana doğruyu yükseklik yerine kullanmak:</strong> Hacimde dik yükseklik h, yüzey alanında ana doğru l kullanılır.",
        "<strong>Çapı yarıçap sanmak:</strong> Çap verilen sorularda önce ikiye bölün; aksi hâlde hacim dört kat büyük çıkar.",
        "<strong>1/3'ü unutmak:</strong> Silindir ve prizma formülüyle hesaplanan sonuç üç kat büyüktür.",
        "<strong>Birimleri karıştırmak:</strong> cm ile m aynı formülde kullanılmaz; 1 m³ = 1.000.000 cm³ = 1.000 litredir.",
        "<strong>Kesik konide yarıçapların ortalamasını almak:</strong> (R + r)/2 ile silindir hesaplamak yaklaşık ve hatalı bir sonuç verir; doğru formülü kullanın."
      ]
    }
  ],
  faq: [
    ["Koninin hacmi nasıl hesaplanır?", "Koninin hacmi V = (1/3)·π·r²·h formülüyle bulunur. Yarıçapı 3 cm ve yüksekliği 4 cm olan koninin hacmi (1/3) × π × 9 × 4 = 12π, yani yaklaşık 37,70 santimetreküptür."],
    ["Piramidin hacim formülü nedir?", "Piramidin hacmi taban alanı ile yüksekliğin çarpımının üçte biridir: V = (1/3)·A·h. Taban kenarı 6 cm, yüksekliği 4 cm olan kare piramidin hacmi (1/3) × 36 × 4 = 48 santimetreküp bulunur."],
    ["Koni ve piramit hacminde neden 1/3 vardır?", "Bir küp, tepe noktası ortak üç eş piramide bölünebilir; her biri küpün üçte biridir. Cavalieri ilkesine göre aynı taban ve yükseklikteki bütün koni ve piramitler bu oranı korur, bu yüzden formülde 1/3 bulunur."],
    ["Koninin yüzey alanı nasıl bulunur?", "Yanal alan π·r·l, toplam yüzey alanı ise taban dairesi eklenerek π·r·(r + l) formülüyle hesaplanır. Yarıçapı 3 cm ve ana doğrusu 5 cm olan koninin toplam alanı 24π, yaklaşık 75,40 santimetrekaredir."],
    ["Ana doğru (yanal yükseklik) nasıl hesaplanır?", "Dik konide yarıçap, yükseklik ve ana doğru dik üçgen oluşturduğundan Pisagor teoremi kullanılır: l = √(r² + h²). Yarıçapı 3 cm, yüksekliği 4 cm olan konide ana doğru 5 cm çıkar."],
    ["Kesik koninin hacmi nasıl bulunur?", "Kesik koninin hacmi V = (π·h/3)·(R² + R·r + r²) formülüyle bulunur. Büyük yarıçapı 5 cm, küçük yarıçapı 2 cm ve yüksekliği 6 cm olan kesik koninin hacmi 78π, yaklaşık 245,04 santimetreküptür."],
    ["Kare tabanlı piramidin yüzey alanı nedir?", "Toplam yüzey alanı taban alanı a² ile dört yan üçgenin alanı toplamıdır: a² + 2·a·apotem. Taban kenarı 6 cm, apotemi 5 cm olan piramitte 36 + 60 = 96 santimetrekare bulunur."],
    ["Dondurma külahı kaç ml alır?", "Ağız çapı 5 cm ve derinliği 10 cm olan bir külahın iç hacmi (1/3) × π × 2,5² × 10 ile yaklaşık 65 ml'dir. Bir santimetreküp bir mililitreye eşit olduğu için sonuç doğrudan mililitre okunur."],
    ["Koninin hacmi aynı yükseklikteki silindirin kaçta kaçıdır?", "Taban yarıçapı ve yüksekliği aynı olan koninin hacmi, silindirin tam üçte biridir. Yarıçapı 3 cm, yüksekliği 4 cm olan silindir yaklaşık 113,10 santimetreküp, aynı ölçüdeki koni ise 37,70 santimetreküptür."]
  ],
  tools: ["koni-hacmi-hesapla", "piramit-hacmi-hesapla", "koni-yuzey-alani-hesapla", "kesik-koni-hacmi-hesapla"],
  related: ["alan-ve-hacim-formulleri", "pisagor-teoremi-nedir", "cokgenin-ic-acilari-toplami"],
  sources: [
    ["MEB – Matematik öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
