export default {
  slug: "pisagor-teoremi-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Pisagor Teoremi Nedir? Formül, Örnekler ve Özel Dik Üçgenler",
  pageTitle: "Pisagor Teoremi: a² + b² = c² Formülü, Örnekler ve Üçlüler",
  description: "Pisagor teoremi, dik üçgende dik kenarların kareleri toplamının hipotenüsün karesine eşit olduğunu söyler: a² + b² = c². Örnekler, 3-4-5 ve günlük kullanım.",
  keywords: ["pisagor teoremi", "pisagor formülü", "hipotenüs nasıl bulunur", "3 4 5 üçgeni", "özel dik üçgenler", "30 60 90 üçgeni", "pisagor üçlüleri", "dik açı kontrolü"],
  lead: "Pisagor teoremi, bir <strong>dik üçgende</strong> dik kenarların karelerinin toplamının, dik açının karşısındaki en uzun kenarın (hipotenüs) karesine eşit olduğunu söyler: <strong>a² + b² = c²</strong>. Dik kenarları 3 ve 4 cm olan bir üçgenin hipotenüsü √(9 + 16) = 5 cm'dir. Teorem yalnızca dik üçgenlerde geçerlidir ve tersinden okunduğunda bir açının dik olup olmadığını da gösterir. Bu sayfada formülün kullanımını, çözümlü örnekleri, özel dik üçgenleri, Pisagor üçlülerini ve inşaattan televizyon ekranına günlük uygulamaları bulacaksınız.",
  kisaCevap: [
    "Formül: a² + b² = c²; a ve b dik kenarlar, c hipotenüstür.",
    "Hipotenüs: c = √(a² + b²); dik kenar: a = √(c² − b²).",
    "Hipotenüs her zaman dik açının karşısındaki ve üçgenin en uzun kenarıdır.",
    "3-4-5, 5-12-13, 8-15-17 ve 7-24-25 tam sayılı Pisagor üçlüleridir; katları da üçlüdür.",
    "30-60-90 üçgeninde kenarlar 1 : √3 : 2, 45-45-90 üçgeninde 1 : 1 : √2 oranındadır.",
    "Ustaların 3-4-5 (ya da 60-80-100 cm) kuralı, bir köşenin tam 90 derece olup olmadığını kontrol eder."
  ],
  figure: {
    alt: "Kenarları 3, 4 ve 5 birim olan dik üçgen ve her kenarın üzerine çizilmiş kareler: 3 birimlik kenardaki kare 9, 4 birimlik kenardaki kare 16, hipotenüsteki kare 25 birim kare; 9 + 16 = 25.",
    caption: "Teoremin görsel anlamı: dik kenarların üzerine kurulan iki karenin alanları toplamı, hipotenüs üzerine kurulan karenin alanına eşittir. 3-4-5 üçgeninde 9 + 16 = 25.",
    svg: `<svg viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">a² + b² = c²</text>
  <polygon points="200,300 360,300 200,180" class="sf sb"/>
  <polygon points="200,300 360,300 200,180" class="sp sw" fill="none"/>
  <rect x="200" y="284" width="16" height="16" class="st" fill="none"/>
  <rect x="200" y="300" width="160" height="160" class="ps"/>
  <text x="280" y="380" class="xl mid p">16</text>
  <text x="280" y="406" class="sm mid t2">b² = 4²</text>
  <rect x="80" y="180" width="120" height="120" class="oks"/>
  <text x="140" y="246" class="xl mid ok">9</text>
  <text x="140" y="270" class="sm mid t2">a² = 3²</text>
  <polygon points="200,180 360,300 480,140 320,20" class="p"/>
  <text x="340" y="164" class="xl mid sf">25</text>
  <text x="340" y="190" class="sm mid sf">c² = 5²</text>
  <text x="208" y="266" class="b">a = 3</text>
  <text x="292" y="292" class="b mid">b = 4</text>
  <rect x="510" y="200" width="190" height="180" rx="10" class="sf sb"/>
  <text x="530" y="230" class="b">Hesap</text>
  <text x="530" y="260" class="t2">3² + 4² = c²</text>
  <text x="530" y="288" class="t2">9 + 16 = 25</text>
  <text x="530" y="316" class="t2">c = √25</text>
  <text x="530" y="356" class="xl p">c = 5</text>
</svg>`
  },
  sections: [
    {
      h: "Pisagor teoremi nedir?",
      p: [
        "Pisagor teoremi, dik üçgenin kenarları arasındaki ilişkiyi tanımlayan geometrinin en bilinen kuralıdır. Adını, MÖ 6. yüzyılda yaşamış Yunan matematikçi Pisagor'dan alır; ancak bu ilişkinin Babil ve Hint matematiğinde daha önce de bilindiğine dair kanıtlar vardır.",
        "Bir dik üçgende 90 derecelik açıyı oluşturan iki kenara <strong>dik kenar</strong> (a ve b), dik açının karşısındaki kenara ise <strong>hipotenüs</strong> (c) denir. Teorem, dik kenarların uzunluklarının kareleri toplamının hipotenüsün uzunluğunun karesine eşit olduğunu söyler. Hipotenüs her zaman üçgenin en uzun kenarıdır.",
        "Teoremin geometrik anlamı yukarıdaki görselde görülebilir: her kenarın üzerine bir kare çizildiğinde, küçük iki karenin alanları toplamı büyük karenin alanına tam olarak eşittir."
      ],
      formula: "a² + b² = c²\nc = √(a² + b²)   (hipotenüs)\na = √(c² − b²)   (dik kenar)"
    },
    {
      h: "Teorem neden doğru? Basit bir ispat",
      p: [
        "Pisagor teoreminin yüzlerce farklı ispatı vardır; en kolay anlaşılanı alan karşılaştırmasıdır. Kenarı a + b olan büyük bir kare çizin ve içine, dik kenarları a ve b olan dört eş dik üçgeni köşelere gelecek şekilde yerleştirin. Üçgenlerin hipotenüsleri ortada kenarı c olan eğik bir kare oluşturur.",
        "Büyük karenin alanı iki yoldan hesaplanabilir. Doğrudan hesapta alan (a + b)² = a² + 2ab + b²'dir. Parçaların toplamı olarak ise dört üçgenin alanı 4 × (a × b ÷ 2) = 2ab, ortadaki karenin alanı c²'dir; toplam 2ab + c² eder.",
        "İki ifade aynı alanı anlattığı için a² + 2ab + b² = 2ab + c² yazılır. Her iki taraftan 2ab çıkarıldığında a² + b² = c² sonucuna ulaşılır. Bu ispat, teoremin ölçüm hatasından bağımsız, her dik üçgen için kesin biçimde geçerli olduğunu gösterir."
      ]
    },
    {
      h: "Hipotenüs ve dik kenar nasıl bulunur? Çözümlü örnekler",
      ol: [
        "<strong>Hipotenüsü bulma:</strong> Dik kenarları 6 cm ve 8 cm olan üçgende c² = 6² + 8² = 36 + 64 = 100, c = √100 = 10 cm.",
        "<strong>Dik kenarı bulma:</strong> Hipotenüsü 13 cm, bir dik kenarı 5 cm olan üçgende b² = 13² − 5² = 169 − 25 = 144, b = 12 cm.",
        "<strong>Tam sayı çıkmayan sonuç:</strong> Dik kenarları 2 ve 3 cm olan üçgende c² = 4 + 9 = 13, c = √13 ≈ 3,61 cm. Sonuç köklü bırakılabilir ya da yaklaşık değer verilebilir.",
        "<strong>Kare köşegeni:</strong> Kenarı 10 cm olan bir karenin köşegeni, iki dik kenarı 10 cm olan dik üçgenin hipotenüsüdür: √(100 + 100) = √200 = 10√2 ≈ 14,14 cm.",
        "<strong>Dikdörtgen köşegeni:</strong> 4 m × 3 m'lik bir odanın köşeden köşeye uzunluğu √(16 + 9) = 5 m'dir."
      ],
      after: [
        "Bilinen iki kenarı girerek eksik kenarı, alanı, çevreyi ve açıları tek ekranda görmek için [[arac:pisagor-teoremi-hesapla|Pisagor Teoremi Hesaplama]] aracını kullanabilirsiniz. Kök almak ve köklü sonucu sadeleştirmek için [[arac:karekok-hesapla|Karekök Hesaplama]] aracı da işinize yarar."
      ]
    },
    {
      h: "Pisagor üçlüleri nelerdir?",
      p: [
        "Kenar uzunluklarının üçü de tam sayı olan dik üçgenlere <strong>Pisagor üçlüsü</strong> denir. En bilineni 3-4-5'tir. Bir Pisagor üçlüsünün tüm kenarları aynı sayıyla çarpıldığında yine Pisagor üçlüsü elde edilir: 6-8-10, 9-12-15, 30-40-50 gibi. Sınavlarda bu üçlüleri ve katlarını tanımak işlemi çok hızlandırır."
      ],
      table: {
        head: ["Temel üçlü", "Kontrol", "Bazı katları"],
        rows: [
          ["3 – 4 – 5", "9 + 16 = 25", "6-8-10, 9-12-15, 12-16-20"],
          ["5 – 12 – 13", "25 + 144 = 169", "10-24-26, 15-36-39"],
          ["8 – 15 – 17", "64 + 225 = 289", "16-30-34"],
          ["7 – 24 – 25", "49 + 576 = 625", "14-48-50"],
          ["20 – 21 – 29", "400 + 441 = 841", "40-42-58"],
          ["9 – 40 – 41", "81 + 1600 = 1681", "18-80-82"]
        ],
        caption: "Yeni üçlüler üretmek için m > n olan iki tam sayı seçip (m² − n², 2mn, m² + n²) formülünü kullanabilirsiniz; m = 2, n = 1 için 3-4-5 elde edilir."
      }
    },
    {
      h: "Özel dik üçgenler: 30-60-90 ve 45-45-90",
      p: [
        "Açıları belli olan bazı dik üçgenlerde kenarlar arasında sabit oranlar vardır. Bu oranlar Pisagor teoreminden türetilir ve trigonometri hesaplamalarında sık kullanılır."
      ],
      table: {
        head: ["Üçgen", "Kenar oranı", "Örnek", "Nereden gelir?"],
        rows: [
          ["30-60-90", "1 : √3 : 2", "Kısa kenar 5 → uzun dik kenar 5√3 ≈ 8,66 → hipotenüs 10", "Eşkenar üçgenin yüksekliğiyle ikiye bölünmesi"],
          ["45-45-90 (ikizkenar dik)", "1 : 1 : √2", "Dik kenarlar 7 → hipotenüs 7√2 ≈ 9,90", "Karenin köşegeniyle ikiye bölünmesi"]
        ]
      },
      after: [
        "30-60-90 üçgeninde 30 derecenin karşısındaki kenar hipotenüsün yarısıdır. Bu bilgi, eğimli bir rampanın yüksekliğini ya da eşkenar üçgenin yüksekliğini bulmak için pratik bir kısayoldur: kenarı a olan eşkenar üçgenin yüksekliği a√3 ÷ 2'dir. Açı ve kenarları birlikte hesaplamak için [[arac:dik-ucgen-hesapla|Dik Üçgen Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Teoremin tersi: Bir açı dik mi?",
      p: [
        "Pisagor teoreminin tersi de doğrudur: bir üçgende en uzun kenarın karesi diğer iki kenarın kareleri toplamına eşitse, en uzun kenarın karşısındaki açı 90 derecedir. Bu, ölçüm yaparak bir köşenin dik olup olmadığını anlamanın en güvenilir yoludur."
      ],
      table: {
        head: ["Karşılaştırma (c en uzun kenar)", "Üçgen türü", "Örnek"],
        rows: [
          ["c² = a² + b²", "Dik üçgen", "5, 12, 13 → 169 = 169"],
          ["c² < a² + b²", "Dar açılı üçgen", "5, 6, 7 → 49 < 61"],
          ["c² > a² + b²", "Geniş açılı üçgen", "4, 5, 8 → 64 > 41"]
        ]
      }
    },
    {
      h: "Pisagor teoremi günlük hayatta nerede kullanılır?",
      ul: [
        "<strong>İnşaatta dik açı (3-4-5 kuralı):</strong> Ustalar bir köşenin dik olup olmadığını kontrol etmek için bir kenardan 60 cm, diğer kenardan 80 cm işaretler ve iki işaret arasını ölçer. Mesafe tam 100 cm ise köşe 90 derecedir. Büyük alanlarda 3 m, 4 m ve 5 m kullanılır.",
        "<strong>Televizyon ve ekran boyutu:</strong> Ekranlar köşegen uzunluğuyla satılır. 55 inç, 16:9 oranlı bir televizyonun köşegen oranı √(16² + 9²) ≈ 18,36'dır; genişliği 55 × 16 ÷ 18,36 ≈ 47,9 inç (yaklaşık 122 cm), yüksekliği 55 × 9 ÷ 18,36 ≈ 27 inç (yaklaşık 68 cm) eder.",
        "<strong>Merdiven güvenliği:</strong> 5 m'lik bir merdivenin ayağı duvardan 1,4 m uzağa konursa duvara dayandığı yükseklik √(25 − 1,96) = √23,04 = 4,8 m olur.",
        "<strong>Haritada kuş uçuşu mesafe:</strong> Kuzeye 6 km, doğuya 8 km gidilen bir noktanın başlangıca kuş uçuşu uzaklığı √(36 + 64) = 10 km'dir.",
        "<strong>Çatı ve rampa:</strong> Yatayda 4 m, düşeyde 1,5 m yükselen bir çatı kirişinin uzunluğu √(16 + 2,25) = √18,25 ≈ 4,27 m'dir.",
        "<strong>Koordinat düzleminde uzaklık:</strong> İki nokta arasındaki uzaklık formülü d = √((x₂ − x₁)² + (y₂ − y₁)²) doğrudan Pisagor teoremidir."
      ]
    },
    {
      h: "Dik üçgende alan ve yükseklik",
      p: [
        "Dik üçgende dik kenarlardan biri taban, diğeri yükseklik olarak alınabildiği için alan formülü çok basittir: alan = a × b ÷ 2. 3-4-5 üçgeninin alanı 3 × 4 ÷ 2 = 6 cm²'dir.",
        "Hipotenüse ait yükseklik ise alanın iki farklı yazılışından bulunur: a × b ÷ 2 = c × h ÷ 2 olduğundan h = a × b ÷ c'dir. 3-4-5 üçgeninde h = 12 ÷ 5 = 2,4 cm olur. Kenar uzunluklarıyla alan hesaplamanın farklı yollarını [[arac:ucgen-alani-hesapla|Üçgen Alanı Hesaplama]] aracında görebilirsiniz."
      ],
      formula: "Alan = a × b ÷ 2\nHipotenüse ait yükseklik: h = a × b ÷ c"
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Dik olmayan üçgende kullanmak:</strong> Teorem yalnızca dik üçgenlerde geçerlidir. Diğer üçgenlerde kosinüs teoremi gerekir.",
        "<strong>Hipotenüsü yanlış belirlemek:</strong> c her zaman dik açının karşısındaki ve en uzun kenardır. Dik kenarı bulurken büyük sayıdan küçüğü çıkarın: a² = c² − b².",
        "<strong>Kareleri değil kenarları toplamak:</strong> 3 + 4 = 7 hipotenüs değildir; önce kareler toplanır, sonra karekök alınır.",
        "<strong>Karekökü unutmak:</strong> 9 + 16 = 25 sonucu hipotenüsün karesidir; hipotenüs 5'tir.",
        "<strong>Sonucu kontrol etmemek:</strong> Bulduğunuz hipotenüs dik kenarların her ikisinden de uzun olmalıdır. Hipotenüs dik kenarlardan kısa çıktıysa işlemde çıkarma ile toplamayı karıştırmışsınızdır.",
        "<strong>Yaklaşık değeri erken yuvarlamak:</strong> √13 gibi köklü bir sonucu ara adımda 3,6'ya yuvarlayıp sonraki işlemlerde kullanmak hatayı büyütür. Köklü ifadeyi en sona kadar koruyun ya da en az iki ondalık basamakla çalışın.",
        "<strong>Birimleri karıştırmak:</strong> Bir kenar cm, diğeri m ise önce aynı birime çevirin.",
        "<strong>Karekökü dağıtmak:</strong> √(a² + b²) ifadesi a + b'ye eşit değildir."
      ]
    }
  ],
  faq: [
    ["Pisagor teoremi nedir?", "Pisagor teoremi, bir dik üçgende dik kenarların karelerinin toplamının hipotenüsün karesine eşit olduğunu söyleyen kuraldır ve a² + b² = c² şeklinde yazılır. Yalnızca dik üçgenlerde geçerlidir."],
    ["Hipotenüs nasıl bulunur?", "Dik kenarların her biri kendisiyle çarpılıp kareleri toplanır, ardından toplamın karekökü alınır. Örneğin dik kenarları 6 ve 8 olan üçgende 36 + 64 = 100 ve hipotenüs √100 = 10 olur."],
    ["Pisagor formülü nasıl uygulanır?", "Önce dik açının yeri ve hipotenüs belirlenir. Hipotenüs isteniyorsa dik kenarların kareleri toplanıp karekök alınır; dik kenar isteniyorsa hipotenüsün karesinden bilinen dik kenarın karesi çıkarılıp karekök alınır."],
    ["3-4-5 üçgeni neden özeldir?", "3-4-5, kenarlarının üçü de tam sayı olan en küçük dik üçgendir ve 9 + 16 = 25 eşitliğini sağlar. Bu yüzden inşaatta ve marangozlukta bir köşenin dik olup olmadığını kontrol etmek için yaygın olarak kullanılır."],
    ["30-60-90 üçgeninde kenar oranları nedir?", "30-60-90 üçgeninde kenarlar 1 : √3 : 2 oranındadır. 30 derecenin karşısındaki kısa kenar hipotenüsün yarısı, 60 derecenin karşısındaki kenar ise kısa kenarın √3 katıdır."],
    ["Pisagor teoremi günlük hayatta nerede kullanılır?", "İnşaatta dik açı kontrolünde, ekran köşegeninden genişlik hesaplamada, merdivenin duvara dayandığı yüksekliği bulmada, çatı kirişi ve rampa uzunluğunda ve harita üzerinde kuş uçuşu mesafe hesaplamada kullanılır."],
    ["Pisagor üçlüleri nelerdir?", "Kenarlarının üçü de tam sayı olan dik üçgenlere Pisagor üçlüsü denir. 3-4-5, 5-12-13, 8-15-17, 7-24-25 ve 20-21-29 en bilinenleridir; bunların tam sayı katları da Pisagor üçlüsüdür."],
    ["Dik açı inşaatta nasıl kontrol edilir?", "Köşeden bir kenar boyunca 60 cm, diğer kenar boyunca 80 cm ölçülüp işaretlenir ve iki işaret arasındaki mesafe ölçülür. Mesafe tam 100 cm ise köşe 90 derecedir; daha uzun ya da kısa ise köşe dik değildir."],
    ["Teorem dik olmayan üçgenlerde kullanılabilir mi?", "Hayır. Dik olmayan üçgenlerde kenarlar arasındaki ilişki kosinüs teoremiyle hesaplanır. Ancak Pisagor ifadesi, en uzun kenarın karesini diğerlerinin kareleri toplamıyla karşılaştırarak üçgenin dar ya da geniş açılı olduğunu anlamak için kullanılabilir."]
  ],
  tools: ["pisagor-teoremi-hesapla", "dik-ucgen-hesapla", "ucgen-alani-hesapla", "karekok-hesapla"],
  related: ["alan-ve-hacim-formulleri", "ebob-ekok-nasil-bulunur"]
};
