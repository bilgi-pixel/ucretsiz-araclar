export default {
  slug: "trigonometri-sin-cos-tan-tablosu",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Sinüs, Kosinüs, Tanjant Nedir? Trigonometri Tablosu ve Özel Açılar",
  pageTitle: "Trigonometri Tablosu: Sin, Cos, Tan Değerleri ve Özel Açılar",
  description: "Sin 30 = 1/2, cos 60 = 1/2, tan 45 = 1. Sinüs, kosinüs ve tanjantın dik üçgende tanımı, özel açılar tablosu, birim çember, derece-radyan ve ezber yöntemi.",
  keywords: ["trigonometri tablosu", "sin cos tan tablosu", "sin 30 kaç", "özel açılar", "trigonometrik oranlar", "dik üçgende trigonometri", "birim çember", "derece radyan çevirme"],
  lead: "Bir dik üçgende bir dar açının <strong>sinüsü karşı kenarın hipotenüse, kosinüsü komşu kenarın hipotenüse, tanjantı karşı kenarın komşu kenara oranıdır</strong>. Bu oranlar üçgenin büyüklüğüne değil yalnızca açıya bağlıdır. Özel açıların değerleri ezberlenir: sin 30° = 1/2, cos 30° = √3/2, sin 45° = cos 45° = √2/2, tan 45° = 1, sin 60° = √3/2, cos 60° = 1/2. Bu yazıda tanımları, tam trigonometri tablosunu, birim çemberi, tan = sin ÷ cos ilişkisini, derece-radyan çevirmeyi, tabloyu kolay ezberleme yöntemini ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "sin α = karşı ÷ hipotenüs, cos α = komşu ÷ hipotenüs, tan α = karşı ÷ komşu, cot α = komşu ÷ karşı.",
    "sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2, sin 90° = 1, sin 0° = 0.",
    "cos 0° = 1, cos 30° = √3/2, cos 45° = √2/2, cos 60° = 1/2, cos 90° = 0.",
    "tan 30° = √3/3, tan 45° = 1, tan 60° = √3; tan 90° tanımsızdır.",
    "tan α = sin α ÷ cos α ve her açı için sin²α + cos²α = 1.",
    "Radyan = derece × π ÷ 180; 180° = π radyan, 90° = π/2 radyan."
  ],
  figure: {
    alt: "Birim çember üzerinde 30, 45 ve 60 derecelik noktalar; 30 derecede kosinüs yatay 0,866, sinüs dikey 0,5 uzunluğunda. Yanda özel açıların sinüs ve kosinüs değerleri.",
    caption: "Birim çemberde (yarıçap 1) bir açının bitim noktasının yatay koordinatı kosinüsü, dikey koordinatı sinüsü verir. 30°'lik noktada cos 30° ≈ 0,866 ve sin 30° = 0,5'tir. Açı büyüdükçe sinüs artar, kosinüs azalır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Birim çember ve özel açılar</text>
  <line x1="30" y1="240" x2="380" y2="240" class="st" fill="none"/>
  <line x1="200" y1="410" x2="200" y2="60" class="st" fill="none"/>
  <path d="M350 240A150 150 0 0 0 200 90" class="sb sw" fill="none"/>
  <path d="M200 90A150 150 0 0 0 50 240" class="sb dash" fill="none"/>
  <line x1="200" y1="240" x2="329.9" y2="165" class="sp sw" fill="none"/>
  <line x1="200" y1="240" x2="306.1" y2="133.9" class="sa" fill="none"/>
  <line x1="200" y1="240" x2="275" y2="110.1" class="sa" fill="none"/>
  <line x1="200" y1="240" x2="329.9" y2="240" class="sok sw" fill="none"/>
  <line x1="329.9" y1="240" x2="329.9" y2="165" class="sdg sw" fill="none"/>
  <circle cx="329.9" cy="165" r="6" class="p"/>
  <circle cx="306.1" cy="133.9" r="5" class="a"/>
  <circle cx="275" cy="110.1" r="5" class="a"/>
  <path d="M240 240A40 40 0 0 0 234.6 220" class="sp" fill="none"/>
  <text x="246" y="232" class="sm b p">30°</text>
  <text x="340" y="160" class="sm b">30°</text><text x="314" y="126" class="sm">45°</text><text x="280" y="102" class="sm">60°</text>
  <text x="265" y="262" class="sm mid b ok">cos 30° ≈ 0,866</text>
  <text x="340" y="206" class="sm b dg">sin 30° = 0,5</text>
  <text x="352" y="258" class="sm">1</text><text x="206" y="84" class="sm">1</text>
  <text x="120" y="390" class="sm mid t2">Yarıçap = 1 birim</text>
  <rect x="420" y="60" width="280" height="300" rx="10" class="sf sb"/>
  <text x="470" y="92" class="b mid">Açı</text><text x="560" y="92" class="b mid">sin</text><text x="650" y="92" class="b mid">cos</text>
  <line x1="430" y1="102" x2="690" y2="102" class="sb" fill="none"/>
  <g class="mid">
    <text x="470" y="132">0°</text><text x="560" y="132">0</text><text x="650" y="132">1</text>
    <text x="470" y="172">30°</text><text x="560" y="172" class="p b">1/2</text><text x="650" y="172">√3/2</text>
    <text x="470" y="212">45°</text><text x="560" y="212">√2/2</text><text x="650" y="212">√2/2</text>
    <text x="470" y="252">60°</text><text x="560" y="252">√3/2</text><text x="650" y="252" class="p b">1/2</text>
    <text x="470" y="292">90°</text><text x="560" y="292">1</text><text x="650" y="292">0</text>
  </g>
  <text x="560" y="336" class="sm mid t2">sin: √0/2, √1/2, √2/2, √3/2, √4/2</text>
</svg>`
  },
  sections: [
    {
      h: "Sinüs, kosinüs ve tanjant nedir?",
      p: [
        "Trigonometri, üçgenlerin açıları ile kenarları arasındaki ilişkileri inceler. Temel tanımlar dik üçgende yapılır. 90°'lik açının karşısındaki en uzun kenara <strong>hipotenüs</strong> denir. İncelediğimiz dar açı α'nın karşısındaki kenar <strong>karşı dik kenar</strong>, açının bir kolunu oluşturan diğer dik kenar ise <strong>komşu dik kenardır</strong>."
      ],
      formula: "sin α = karşı dik kenar ÷ hipotenüs\ncos α = komşu dik kenar ÷ hipotenüs\ntan α = karşı dik kenar ÷ komşu dik kenar\ncot α = komşu dik kenar ÷ karşı dik kenar = 1 ÷ tan α",
      after: [
        "Benzer üçgenlerde kenarlar aynı oranda büyüyüp küçüldüğü için bu oranlar üçgenin büyüklüğünden bağımsızdır; yalnızca açıya bağlıdır. 30°'lik açısı olan bütün dik üçgenlerde karşı kenar hipotenüsün yarısıdır, bu yüzden sin 30° her zaman 1/2'dir.",
        "Kenar uzunlukları arasındaki ilişkiyi Pisagor teoremi verir: komşu² + karşı² = hipotenüs². Bu yüzden trigonometri soruları çoğu zaman [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] ile birlikte çözülür. Hipotenüs her zaman en uzun kenar olduğu için dar açıların sinüs ve kosinüsü 0 ile 1 arasındadır."
      ]
    },
    {
      h: "Özel açıların trigonometrik değerleri (tablo)",
      p: [
        "0°, 30°, 45°, 60° ve 90° özel açılardır ve değerleri köklü tam ifadelerle bilinir. Sınavlarda hesap makinesi kullanılmadığı için bu tablo ezberlenir; ondalık karşılıkları ise sonuçları yorumlamak için işe yarar."
      ],
      table: {
        head: ["Açı", "Radyan", "sin", "cos", "tan", "cot"],
        rows: [
          ["0°", "0", "0", "1", "0", "tanımsız"],
          ["30°", "π/6", "1/2 = 0,5", "√3/2 ≈ 0,866", "√3/3 ≈ 0,577", "√3 ≈ 1,732"],
          ["45°", "π/4", "√2/2 ≈ 0,707", "√2/2 ≈ 0,707", "1", "1"],
          ["60°", "π/3", "√3/2 ≈ 0,866", "1/2 = 0,5", "√3 ≈ 1,732", "√3/3 ≈ 0,577"],
          ["90°", "π/2", "1", "0", "tanımsız", "0"]
        ]
      },
      after: [
        "Tablodaki bir simetri dikkat çeker: sin 30° = cos 60°, sin 60° = cos 30°. Genel kural, birbirini 90°'ye tamamlayan açılarda <strong>sin α = cos (90° − α)</strong> ve tan α = cot (90° − α) olmasıdır. Kosinüs adındaki \"ko\" öneki de bu \"tümler açının sinüsü\" anlamından gelir."
      ]
    },
    {
      h: "Sin 30 kaçtır, neden 1/2'dir?",
      p: [
        "sin 30° = 1/2'dir. Bunun nedeni eşkenar üçgende kolayca görülür. Kenarı 2 birim olan bir eşkenar üçgende tüm açılar 60°'dir. Tepeden tabana yükseklik indirildiğinde üçgen iki eş dik üçgene bölünür. Her birinde hipotenüs 2, taban 1 ve tepedeki açı 30°'dir.",
        "30°'lik açının karşısındaki kenar 1, hipotenüs 2 olduğu için sin 30° = 1/2'dir. Yükseklik Pisagor ile √(2² − 1²) = √3 bulunur. Buradan cos 30° = √3/2, tan 30° = 1/√3 = √3/3 ve aynı üçgende 60°'lik açı için sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3 elde edilir. 45° değerleri ise dik kenarları 1 olan ikizkenar dik üçgenden gelir: hipotenüs √2, sin 45° = cos 45° = 1/√2 = √2/2."
      ]
    },
    {
      h: "Tanjant neden sinüs bölü kosinüstür?",
      p: [
        "Tanımları yan yana yazdığınızda ilişki kendiliğinden ortaya çıkar. sin α = karşı ÷ hipotenüs ve cos α = komşu ÷ hipotenüs ise, sin α ÷ cos α = (karşı ÷ hipotenüs) ÷ (komşu ÷ hipotenüs) = karşı ÷ komşu = tan α olur. Hipotenüs sadeleşir."
      ],
      formula: "tan α = sin α ÷ cos α\ncot α = cos α ÷ sin α\nsin²α + cos²α = 1",
      after: [
        "İkinci temel özdeşlik sin²α + cos²α = 1'dir ve Pisagor teoreminin hipotenüse bölünmüş halidir. Biri bilinen oranlardan diğerini bulmak için kullanılır. Örneğin bir dar açı için sin α = 3/5 verilmişse cos²α = 1 − 9/25 = 16/25, cos α = 4/5 ve tan α = 3/4 bulunur. cos 90° = 0 olduğu için tan 90° hesaplanırken sıfıra bölme gerekir; bu yüzden tan 90° tanımsızdır."
      ]
    },
    {
      h: "Birim çember nedir?",
      p: [
        "Birim çember, merkezi koordinat sisteminin başlangıç noktasında ve yarıçapı 1 birim olan çemberdir. Pozitif x ekseninden saat yönünün tersine α açısı kadar dönen bir yarıçapın çember üzerindeki bitim noktasının koordinatları <strong>(cos α, sin α)</strong>'dır. Yarıçap 1 olduğu için hipotenüs 1'e eşittir ve oranlar doğrudan koordinatlara dönüşür.",
        "Birim çember, trigonometrik oranları 90°'den büyük açılara ve negatif açılara genişletir. Örneğin 120°'lik açının bitim noktası ikinci bölgededir; x koordinatı eksi olduğu için cos 120° = −1/2, sin 120° = √3/2'dir. Bölgelere göre işaretler şöyledir: I. bölgede hepsi pozitif, II. bölgede yalnızca sinüs, III. bölgede yalnızca tanjant ve kotanjant, IV. bölgede yalnızca kosinüs pozitiftir."
      ],
      table: {
        head: ["Açı", "Bölge", "sin", "cos", "tan"],
        rows: [
          ["120°", "II", "√3/2", "−1/2", "−√3"],
          ["135°", "II", "√2/2", "−√2/2", "−1"],
          ["150°", "II", "1/2", "−√3/2", "−√3/3"],
          ["180°", "Eksen", "0", "−1", "0"],
          ["270°", "Eksen", "−1", "0", "tanımsız"]
        ]
      }
    },
    {
      h: "Derece ve radyan farkı nedir?",
      p: [
        "Açılar iki birimle ölçülür. <strong>Derece</strong>, tam turu 360 eşit parçaya böler. <strong>Radyan</strong> ise yarıçap uzunluğundaki yayı gören merkez açıdır; tam tur 2π radyandır. İki birim arasındaki köprü 180° = π radyan eşitliğidir."
      ],
      formula: "Radyan = derece × π ÷ 180\nDerece = radyan × 180 ÷ π\n1 radyan ≈ 57,3°",
      after: [
        "Örneğin 45° = 45 × π ÷ 180 = π/4 radyan, 2π/3 radyan = 2 × 180 ÷ 3 = 120°'dir. Hesap makinelerinde DEG ve RAD modları vardır; sin 30 işlemi DEG modunda 0,5, RAD modunda ise yaklaşık −0,988 verir. Yanlış modda hesap yapmak en yaygın hatalardan biridir. Çevirmeyi [[arac:derece-radyan-cevir|Derece Radyan Çevirici]] ile yapabilirsiniz."
      ]
    },
    {
      h: "Dik üçgende trigonometrik oranlarla çözümlü örnekler",
      ol: [
        "<strong>Oranları bulma:</strong> Dik kenarları 3 ve 4 olan dik üçgende hipotenüs 5'tir. 3 birimlik kenarın karşısındaki α açısı için sin α = 3/5 = 0,6; cos α = 4/5 = 0,8; tan α = 3/4 = 0,75.",
        "<strong>Kenar bulma:</strong> Hipotenüsü 10 cm ve bir dar açısı 30° olan dik üçgende bu açının karşısındaki kenar 10 × sin 30° = 10 × 1/2 = <strong>5 cm</strong>, komşu kenar 10 × cos 30° = 5√3 ≈ <strong>8,66 cm</strong>'dir.",
        "<strong>Merdiven problemi:</strong> 6 m'lik bir merdiven duvara yerle 60°'lik açı yapacak şekilde dayanıyor. Merdivenin duvara değdiği yükseklik 6 × sin 60° = 3√3 ≈ <strong>5,20 m</strong>, alt ucun duvara uzaklığı 6 × cos 60° = <strong>3 m</strong>'dir.",
        "<strong>Yükseklik ölçme:</strong> Bir ağacın dibinden 20 m uzaktan tepesine bakış açısı 45° ise ağacın yüksekliği 20 × tan 45° = <strong>20 m</strong>'dir (göz yüksekliği ihmal edilirse).",
        "<strong>Eğim:</strong> Bir rampanın eğim açısı α ise yüzde eğim = tan α × 100'dür. tan 10° ≈ 0,176 olduğu için 10°'lik rampa yaklaşık %17,6 eğimlidir."
      ],
      after: [
        "Özel olmayan açılar için hesap makinesi gerekir. [[arac:sinus-hesapla|Sinüs Hesaplama]], [[arac:kosinus-hesapla|Kosinüs Hesaplama]] ve [[arac:tanjant-hesapla|Tanjant Hesaplama]] araçları derece, radyan ya da grad girişini kabul eder ve özel açılarda köklü tam değeri de gösterir. Üçgenin açılarıyla ilgili temel kurallar için [[bilgi:ucgende-acilar|üçgende açılar]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Trigonometri tablosu nasıl ezberlenir?",
      ol: [
        "Sinüs satırını 0°, 30°, 45°, 60°, 90° sırasıyla <strong>√0/2, √1/2, √2/2, √3/2, √4/2</strong> diye yazın. Sadeleştirince 0, 1/2, √2/2, √3/2, 1 elde edilir.",
        "Kosinüs satırı, sinüs satırının tersten okunmuş halidir: 1, √3/2, √2/2, 1/2, 0.",
        "Tanjantı her sütunda sinüsü kosinüse bölerek bulun: 0, √3/3, 1, √3, tanımsız.",
        "Kotanjant, tanjantın tersidir ve tanjant satırının tersten okunmuşudur.",
        "Kontrol için her sütunda sin² + cos² = 1 olduğunu doğrulayın: 30° için 1/4 + 3/4 = 1."
      ],
      after: [
        "Ezberi kalıcı hale getirmenin en iyi yolu değerleri türetebilmektir: kenarı 2 olan eşkenar üçgeni ikiye bölüp 30° ve 60° değerlerini, dik kenarları 1 olan ikizkenar dik üçgenden 45° değerlerini birkaç saniyede yeniden bulabilirsiniz. Sınavda emin olamadığınız bir değeri bu iki küçük çizimle kontrol etmek, yanlış ezberden kaynaklanan hataları önler. Ayrıca açı büyüdükçe sinüsün arttığını, kosinüsün azaldığını hatırlamak, 1/2 ile √3/2'yi yanlış yere yazma hatasını hemen yakalar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Karşı ve komşu kenarı karıştırmak:</strong> Kenarlar incelediğiniz açıya göre adlandırılır; diğer dar açıya geçince yer değiştirir.",
        "<strong>Hesap makinesini yanlış modda kullanmak:</strong> Derece ile verilen açılar DEG modunda hesaplanmalıdır.",
        "<strong>sin 2α'yı 2 sin α sanmak:</strong> sin 60° = √3/2 iken 2 sin 30° = 1'dir; ikisi eşit değildir.",
        "<strong>tan 90°'ye değer vermek:</strong> cos 90° = 0 olduğundan tan 90° tanımsızdır.",
        "<strong>Bölge işaretlerini unutmak:</strong> 90°'den büyük açılarda kosinüs ve tanjant eksi olabilir; birim çemberdeki bölgeye bakın."
      ]
    }
  ],
  faq: [
    ["Sinüs, kosinüs ve tanjant nedir?", "Dik üçgende bir dar açının sinüsü karşı kenarın hipotenüse, kosinüsü komşu kenarın hipotenüse, tanjantı karşı kenarın komşu kenara oranıdır. Bu oranlar üçgenin büyüklüğüne değil yalnızca açıya bağlıdır."],
    ["Sin 30 kaçtır?", "Sin 30° tam olarak 1/2, yani 0,5'tir. Kenarı 2 birim olan bir eşkenar üçgen ortadan ikiye bölündüğünde 30°'lik açının karşısındaki kenar 1, hipotenüs 2 olduğu için oran 1/2 çıkar."],
    ["Özel açıların trigonometrik değerleri nelerdir?", "Sinüs değerleri 0°, 30°, 45°, 60° ve 90° için sırasıyla 0, 1/2, √2/2, √3/2 ve 1'dir. Kosinüs bu sıranın tersidir. Tanjant 0, √3/3, 1, √3 olup 90° için tanımsızdır."],
    ["Dik üçgende trigonometrik oranlar nasıl bulunur?", "Önce incelenen açıya göre karşı kenar, komşu kenar ve hipotenüs belirlenir. Eksik kenar Pisagor teoremiyle bulunur, sonra tanımlardaki oranlar yazılır. Kenarları 3, 4 ve 5 olan üçgende sinüs 3/5 olur."],
    ["Tanjant neden sinüs bölü kosinüstür?", "Sinüs karşı bölü hipotenüs, kosinüs komşu bölü hipotenüs olduğu için sinüs kosinüse bölündüğünde hipotenüsler sadeleşir ve geriye karşı bölü komşu, yani tanjantın tanımı kalır."],
    ["Birim çember nedir?", "Merkezi başlangıç noktasında ve yarıçapı 1 olan çemberdir. Bir açının çember üzerindeki bitim noktasının koordinatları kosinüs ve sinüs değerlerini verir; böylece trigonometrik oranlar 90°'den büyük açılara genişletilir."],
    ["Derece ve radyan farkı nedir?", "Derece tam turu 360 parçaya böler; radyan ise yarıçap uzunluğundaki yayı gören merkez açıdır ve tam tur 2π radyandır. 180 derece π radyana eşittir, dereceyi radyana çevirmek için π/180 ile çarpılır."],
    ["Trigonometri tablosu nasıl ezberlenir?", "Sinüs değerleri 0°'den 90°'ye kadar √0/2, √1/2, √2/2, √3/2 ve √4/2 olarak yazılır; kosinüs aynı sıranın tersidir. Tanjant her sütunda sinüsün kosinüse bölünmesiyle bulunur."]
  ],
  tools: ["sinus-hesapla", "kosinus-hesapla", "tanjant-hesapla", "derece-radyan-cevir"],
  related: ["pisagor-teoremi-nedir", "ucgende-acilar", "alan-ve-hacim-formulleri"],
  sources: [
    ["Millî Eğitim Bakanlığı – Ortaöğretim matematik öğretim programı", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kılavuzları", "https://www.osym.gov.tr/"]
  ]
};
