export default {
  slug: "altin-oran-nedir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Altın Oran Nedir? 1,618 Sayısı, Fibonacci Dizisi ve Tasarımda Kullanımı",
  pageTitle: "Altın Oran Nedir? 1,618 Sayısı, Formülü ve Fibonacci",
  description: "Altın oran φ ≈ 1,618'dir: bütün büyük parçaya, büyük parça küçüğe aynı oranda. Formülü, hesaplanışı, Fibonacci ilişkisi, altın dikdörtgen, doğa ve tasarım örnekleri.",
  keywords: ["altın oran nedir", "altın oran kaç", "altın oran formülü", "altın oran hesaplama", "fibonacci dizisi", "altın dikdörtgen", "doğada altın oran", "altın oran tasarım", "fi sayısı"],
  lead: "Altın oran, bir bütünün iki parçaya bölündüğünde <strong>bütünün büyük parçaya oranının, büyük parçanın küçük parçaya oranına eşit</strong> olduğu orandır ve değeri <strong>φ = (1 + √5) ÷ 2 ≈ 1,618</strong>'dir. Yunan harfi fi (φ) ile gösterilir. Bir doğru parçasını altın orana göre böldüğünüzde büyük parça bütünün yaklaşık %61,8'i, küçük parça %38,2'si olur. Bu sayfada formülün nereden geldiğini, Fibonacci dizisiyle ilişkisini, altın dikdörtgeni, tasarımda kullanımını ve altın oranla ilgili yaygın efsanelerin ne kadar doğru olduğunu anlatıyoruz.",
  kisaCevap: [
    "Altın oran φ = (1 + √5) ÷ 2 = 1,6180339887… irrasyonel bir sayıdır.",
    "Tanım: (a + b) ÷ a = a ÷ b = φ; a büyük, b küçük parçadır.",
    "Bir uzunluğu altın orana bölmek için büyük parça = uzunluk ÷ 1,618; küçük parça = uzunluk − büyük parça.",
    "φ'nin özel özellikleri: φ² = φ + 1 ≈ 2,618 ve 1 ÷ φ = φ − 1 ≈ 0,618.",
    "Ardışık Fibonacci sayılarının oranı (13 ÷ 8, 21 ÷ 13, 34 ÷ 21 …) giderek φ'ye yaklaşır.",
    "Altın dikdörtgenin kenarları 1 : 1,618 oranındadır; içinden kare çıkarıldığında kalan da altın dikdörtgendir."
  ],
  figure: {
    alt: "Altın dikdörtgen içinde 233, 144, 89, 55 ve 34 birimlik kareler ve bu kareleri birleştiren altın sarmal. Yanda φ formülü ve 100 cm'lik çubuğun 61,8 cm ile 38,2 cm'ye bölünmesi gösteriliyor.",
    caption: "377 × 233 birimlik dikdörtgen yaklaşık bir altın dikdörtgendir (377 ÷ 233 ≈ 1,618). Kareler Fibonacci sayılarıyla küçülür, her karedeki çeyrek çember birleşerek altın sarmalı oluşturur. Sağda 100 cm'lik bir uzunluğun altın orana bölünmesi.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="34" class="lg b mid">Altın dikdörtgen ve altın sarmal</text>
  <rect x="20" y="60" width="233" height="233" class="ps"/>
  <rect x="253" y="60" width="144" height="144" class="sf"/>
  <rect x="308" y="204" width="89" height="89" class="oks"/>
  <rect x="253" y="238" width="55" height="55" class="ps"/>
  <rect x="253" y="204" width="34" height="34" class="sf"/>
  <g class="sb" fill="none">
    <rect x="20" y="60" width="377" height="233"/>
    <line x1="253" y1="60" x2="253" y2="293"/>
    <line x1="253" y1="204" x2="397" y2="204"/>
    <line x1="308" y1="204" x2="308" y2="293"/>
    <line x1="253" y1="238" x2="308" y2="238"/>
    <line x1="287" y1="204" x2="287" y2="238"/>
  </g>
  <path d="M20,293 A233,233 0 0 1 253,60 A144,144 0 0 1 397,204 A89,89 0 0 1 308,293 A55,55 0 0 1 253,238 A34,34 0 0 1 287,204" class="sp sw" fill="none"/>
  <g class="b mid">
    <text x="120" y="200" class="lg">233</text><text x="340" y="150">144</text><text x="360" y="256">89</text><text x="281" y="272" class="sm">55</text>
  </g>
  <text x="208" y="318" class="sm mid t2">377 ÷ 233 = 1,618 · 233 ÷ 144 = 1,618</text>
  <rect x="420" y="60" width="280" height="110" rx="8" class="p"/>
  <text x="560" y="92" class="b mid sf">Altın oran (fi)</text>
  <text x="560" y="126" class="xl mid sf">φ = (1 + √5) ÷ 2</text>
  <text x="560" y="156" class="mid sf">≈ 1,6180339887</text>
  <text x="420" y="204" class="b">100 cm'yi altın orana bölmek</text>
  <rect x="420" y="216" width="173" height="34" class="p"/>
  <rect x="593" y="216" width="107" height="34" class="oks"/>
  <text x="506" y="238" class="b mid sf">a = 61,8 cm</text>
  <text x="646" y="238" class="b mid">b = 38,2</text>
  <text x="420" y="276" class="sm t2">100 ÷ 61,8 = 1,618 ve 61,8 ÷ 38,2 = 1,618</text>
  <rect x="20" y="340" width="680" height="64" rx="8" class="sf sb"/>
  <text x="40" y="364" class="b">Fibonacci oranları φ'ye yaklaşır</text>
  <text x="40" y="390" class="sm">8÷5 = 1,600 · 13÷8 = 1,625 · 21÷13 = 1,615 · 34÷21 = 1,619 · 55÷34 = 1,618 · 89÷55 = 1,618</text>
</svg>`
  },
  sections: [
    {
      h: "Altın oran nedir? Tanım",
      p: [
        "Bir doğru parçasını iki parçaya ayırdığınızı düşünün. Büyük parçaya a, küçük parçaya b diyelim. Eğer bütünün (a + b) büyük parçaya oranı, büyük parçanın küçük parçaya oranına eşitse, bu bölme <strong>altın oranda</strong> yapılmış demektir. Bu eşitliği sağlayan tek oran yaklaşık 1,618'dir.",
        "Altın oran tarih boyunca \"altın kesit\", \"ilahi oran\" ve \"orta ve uç oran\" gibi adlarla anıldı. Antik Yunan matematikçisi Öklid, Elemanlar adlı eserinde bir doğru parçasını \"orta ve uç oranda\" bölmeyi tanımlamıştır. Oranın φ (fi) harfiyle gösterilmesi ise 20. yüzyılda yaygınlaşmıştır.",
        "φ, π gibi irrasyonel bir sayıdır: ondalık basamakları sonsuza kadar tekrar etmeden sürer ve iki tam sayının oranı olarak tam yazılamaz. Günlük hesaplarda 1,618 yaklaşık değeri yeterlidir."
      ]
    },
    {
      h: "Altın oran formülü nereden gelir?",
      p: [
        "Tanımı denkleme çevirelim. a ÷ b = φ ise a = φ · b olur. (a + b) ÷ a = φ eşitliğinde a yerine φ · b yazarsak (φ · b + b) ÷ (φ · b) = φ, yani (φ + 1) ÷ φ = φ elde ederiz. İki tarafı φ ile çarpınca ikinci dereceden bir denklem çıkar."
      ],
      formula: "φ² = φ + 1   →   φ² − φ − 1 = 0\nφ = (1 ± √5) ÷ 2   →   pozitif kök: φ = (1 + √5) ÷ 2 ≈ 1,6180\nÖzellikler: φ² ≈ 2,618 · 1 ÷ φ ≈ 0,618 · φ − 1 = 1 ÷ φ",
      after: [
        "Bu denklem altın oranın en şaşırtıcı özelliğini gösterir: φ'nin karesi kendisinin 1 fazlası, tersi ise kendisinin 1 eksiğidir. 1,618 × 1,618 ≈ 2,618 ve 1 ÷ 1,618 ≈ 0,618 hesaplarıyla bunu kolayca doğrulayabilirsiniz. Karekök hesabını hatırlamak için [[bilgi:karekok-nasil-alinir|karekök nasıl alınır]] yazısına bakabilirsiniz; √5 ≈ 2,2360679'dur."
      ]
    },
    {
      h: "Altın oran nasıl hesaplanır? Çözümlü örnekler",
      p: [
        "Pratikte üç tür soruyla karşılaşırsınız: bir bütünü altın orana bölmek, büyük parçadan küçüğü bulmak ya da küçük parçadan büyüğü bulmak. Hepsinde 1,618 ile çarpmak ya da bölmek yeterlidir."
      ],
      ol: [
        "<strong>100 cm'lik bir çubuğu altın orana bölün.</strong> Büyük parça = 100 ÷ 1,618 ≈ 61,80 cm; küçük parça = 100 − 61,80 = 38,20 cm. Kontrol: 100 ÷ 61,80 ≈ 1,618 ve 61,80 ÷ 38,20 ≈ 1,618.",
        "<strong>Büyük parçası 50 cm olan altın bölmede küçük parça ve bütün nedir?</strong> Küçük parça = 50 ÷ 1,618 ≈ 30,90 cm; bütün = 50 + 30,90 = 80,90 cm (ya da 50 × 1,618 ≈ 80,90 cm).",
        "<strong>Genişliği 1.000 piksel olan bir afiş altın dikdörtgen olsun; yüksekliği kaç olmalı?</strong> 1.000 ÷ 1,618 ≈ 618 piksel.",
        "<strong>960 pikselik bir web sayfası düzenini içerik ve kenar çubuğu olarak bölün.</strong> İçerik alanı 960 ÷ 1,618 ≈ 593 piksel, kenar çubuğu 960 − 593 = 367 piksel."
      ],
      after: [
        "Bu hesapları dört ondalıkla görmek için [[arac:altin-oran-hesapla|Altın Oran Hesaplama]] aracına bilinen değeri yazıp bunun bütün mü, büyük parça mı yoksa küçük parça mı olduğunu seçmeniz yeterlidir. Oran kavramının genel mantığı için [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Fibonacci dizisi ile altın oran ilişkisi",
      p: [
        "Fibonacci dizisi, her terimin kendinden önceki iki terimin toplamı olduğu dizidir: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 … Dizi adını 13. yüzyılda Avrupa'ya Hint-Arap rakamlarını tanıtan İtalyan matematikçi Leonardo Fibonacci'den alır.",
        "Dizinin ardışık iki terimini birbirine böldüğünüzde sonuçlar giderek altın orana yaklaşır. Bu yaklaşma bir rastlantı değildir; Fibonacci dizisinin kuralı (F<sub>n</sub> = F<sub>n−1</sub> + F<sub>n−2</sub>) altın oranın denklemi olan φ² = φ + 1 ile aynı yapıdadır."
      ],
      table: {
        head: ["Ardışık terimler", "Oran", "φ'den fark"],
        rows: [
          ["3 ÷ 2", "1,50000", "−0,11803"],
          ["5 ÷ 3", "1,66667", "+0,04863"],
          ["8 ÷ 5", "1,60000", "−0,01803"],
          ["13 ÷ 8", "1,62500", "+0,00697"],
          ["21 ÷ 13", "1,61538", "−0,00265"],
          ["34 ÷ 21", "1,61905", "+0,00101"],
          ["55 ÷ 34", "1,61765", "−0,00039"],
          ["89 ÷ 55", "1,61818", "+0,00015"],
          ["144 ÷ 89", "1,61798", "−0,00006"]
        ],
        caption: "Oranlar bir φ'nin üstünde, bir altında kalarak ona yaklaşır; her adımda fark yaklaşık 2,6 kat küçülür."
      },
      after: [
        "Diziyi istediğiniz terime kadar üretmek ve ardışık oranları görmek için [[arac:fibonacci-hesapla|Fibonacci Hesaplama]] aracını kullanabilirsiniz. Tersi de geçerlidir: Binet formülü olarak bilinen F<sub>n</sub> = (φ<sup>n</sup> − (1 − φ)<sup>n</sup>) ÷ √5 ifadesiyle herhangi bir Fibonacci sayısı doğrudan altın orandan hesaplanabilir."
      ]
    },
    {
      h: "Altın dikdörtgen ve altın sarmal",
      p: [
        "Kenarları altın oranda olan dikdörtgene <strong>altın dikdörtgen</strong> denir. Örneğin 16,18 cm × 10 cm ya da 377 × 233 birimlik dikdörtgenler altın dikdörtgendir. Bu dikdörtgenin dikkat çeken özelliği şudur: kısa kenarı uzunluğunda bir kare kesip çıkardığınızda kalan parça yine bir altın dikdörtgendir. Bu işlemi sonsuza kadar tekrarlayabilirsiniz.",
        "Kesilen karelerin her birine köşeden köşeye çeyrek çember çizildiğinde birbirine bağlanan eğri <strong>altın sarmal</strong> olarak bilinir. Gerçek altın sarmal, her çeyrek turda φ kat büyüyen logaritmik bir sarmaldır; karelerle çizilen Fibonacci sarmalı ise ona çok yakın bir yaklaşımdır.",
        "Altın oran geometrinin başka yerlerinde de karşınıza çıkar. Düzgün bir beşgende köşegen uzunluğunun kenar uzunluğuna oranı tam olarak φ'dir; beş köşeli yıldız (pentagram) bu nedenle altın oranlarla doludur. Beşgenin iç açıları için [[bilgi:cokgenin-ic-acilari-toplami|çokgenin iç açıları toplamı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Doğada altın oran örnekleri",
      p: [
        "Doğada altın oranın en sağlam örnekleri bitkilerin yaprak ve tohum dizilişlerinde (fillotaksi) görülür. Ayçiçeği tablasındaki tohumlar iki yönde sarmallar oluşturur ve bu sarmalların sayısı çoğunlukla ardışık iki Fibonacci sayısıdır: 34 ve 55 ya da 55 ve 89 gibi. Çam kozalaklarında ve ananasın kabuğunda da 5, 8 ve 13 gibi Fibonacci sayıları sıkça görülür.",
        "Bunun nedeni büyüme mekanizmasıdır. Birçok bitki yeni yaprağı ya da tohumu bir öncekine göre yaklaşık <strong>137,5°</strong> döndürerek oluşturur. Bu açıya altın açı denir ve 360° ÷ φ² ≈ 137,5° olarak hesaplanır. Altın açı, tohumların birbirine en az engel olacak biçimde yerleşmesini ve alanın verimli kullanılmasını sağlar.",
        "Bu örnekler bile her bitkide ve her zaman geçerli değildir; doğada Fibonacci olmayan sarmal sayıları da gözlenir. Altın oran doğada sık görülen ama evrensel olmayan bir düzendir."
      ]
    },
    {
      h: "Logo ve tasarımda altın oran nasıl kullanılır?",
      ul: [
        "<strong>Sayfa ve kart oranları:</strong> Genişliği 1,618'e bölerek yüksekliği bulun. 1.000 piksel genişlik için 618 piksel yükseklik bir altın dikdörtgen verir. Mevcut bir görselin oranını görmek için [[arac:en-boy-orani-hesapla|En Boy Oranı Hesaplama]] aracı işinizi görür.",
        "<strong>Düzen ızgarası:</strong> Bir sayfayı %61,8 içerik ve %38,2 kenar çubuğu olarak bölmek dengeli bir görünüm sağlar.",
        "<strong>Tipografi ölçeği:</strong> Gövde metni 16 piksel ise ara başlık 16 × 1,618 ≈ 26 piksel, ana başlık 26 × 1,618 ≈ 42 piksel olarak seçilebilir.",
        "<strong>Logo çizimi:</strong> Bazı tasarımcılar logodaki daire ve eğrileri çapları Fibonacci sayılarıyla orantılı çemberlerden türetir; bu, şekillere tutarlı bir ritim verir.",
        "<strong>Boşluk ve kenar payları:</strong> İç boşluk 10 piksel ise dış boşluk 16 piksel gibi oranlar göze tutarlı gelir."
      ],
      after: [
        "Altın oran tasarımda bir başlangıç noktasıdır, zorunlu bir kural değildir. Kullanıcı ihtiyacı, okunabilirlik ve ekran boyutu çoğu zaman oranlardan daha belirleyicidir. 16:9 ekran oranının (1,78) ve A4 kâğıt oranının (√2 ≈ 1,414) altın orandan farklı olduğunu da unutmayın; A4'ün oranı için [[bilgi:a4-kagit-boyutu-kac-cm|A4 kâğıt boyutu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Altın oran hakkındaki yaygın efsaneler doğru mu?",
      p: [
        "Altın oran popüler kültürde gerçekte olduğundan çok daha fazla yere atfedilir. Ölçüm yaparken hangi noktaların seçildiği değiştirilerek neredeyse her şekilde 1,6'ya yakın bir oran bulunabilir; bu da birçok iddiayı bilimsel olarak zayıflatır."
      ],
      table: {
        head: ["İddia", "Değerlendirme"],
        rows: [
          ["Parthenon altın orana göre tasarlandı", "Tarihî bir kanıt yoktur; ölçümlerin seçimine göre farklı oranlar bulunur"],
          ["Mona Lisa altın dikdörtgenlerle çizildi", "Sanatçının bunu amaçladığına dair belge yoktur"],
          ["Deniz kabuğu (nautilus) altın sarmaldır", "Logaritmik sarmaldır ama büyüme oranı genellikle φ'den farklıdır"],
          ["İnsan vücudu altın orana göre şekillenir", "Bireysel farklar büyüktür; ortalamalar φ'ye ancak kabaca yaklaşır"],
          ["Altın orandaki yüzler en güzel bulunur", "Güzellik algısı kültürel ve kişiseldir; tek bir oranla açıklanamaz"],
          ["Ayçiçeği tohumları Fibonacci sarmalları oluşturur", "Büyük ölçüde doğrudur; ancak her bitkide geçerli değildir"]
        ]
      },
      after: [
        "Bu, altın oranın ilginç olmadığı anlamına gelmez. Matematiksel özellikleri, Fibonacci dizisiyle bağı, beşgen ve pentagramdaki varlığı ve bitki büyümesindeki rolü kanıtlanmış ve son derece etkileyicidir. Yalnızca her estetik güzelliği altın orana bağlayan iddialara eleştirel yaklaşmak gerekir."
      ]
    }
  ],
  faq: [
    ["Altın oran nedir?", "Altın oran, bir bütünün büyük parçaya oranının büyük parçanın küçük parçaya oranına eşit olduğu orandır. Değeri yaklaşık 1,618'dir ve Yunan harfi fi ile gösterilir. Matematik, sanat ve tasarımda sıkça anılır."],
    ["Altın oran sayısal olarak kaçtır?", "Altın oran φ = (1 + √5) ÷ 2 = 1,6180339887… değerindedir. İrrasyonel bir sayı olduğu için ondalık basamakları sonsuza kadar tekrarsız sürer. Günlük hesaplarda 1,618, tersi için ise 0,618 kullanılır."],
    ["Altın oran nasıl hesaplanır?", "Bir uzunluğu altın orana bölmek için uzunluğu 1,618'e bölün; çıkan sonuç büyük parçadır, kalan küçük parçadır. 100 cm için büyük parça 61,80 cm, küçük parça 38,20 cm bulunur ve iki oran da 1,618 eder."],
    ["Fibonacci dizisi ile altın oran ilişkisi nedir?", "Fibonacci dizisinde her terim önceki iki terimin toplamıdır. Ardışık iki terimin oranı, örneğin 89 ÷ 55 = 1,6182, dizide ilerledikçe altın orana giderek daha çok yaklaşır. İkisi aynı matematiksel yapıyı paylaşır."],
    ["Doğada altın oran örnekleri nelerdir?", "En sağlam örnekler ayçiçeği tohumlarının, çam kozalaklarının ve ananas kabuğunun sarmal sayılarıdır; bunlar çoğu zaman ardışık Fibonacci sayılarıdır. Birçok bitki yaprağını yaklaşık 137,5°'lik altın açıyla dizer. Bu düzen her bitkide görülmez."],
    ["Logo ve tasarımda altın oran nasıl kullanılır?", "Sayfa ve görsel oranlarını 1 : 1,618 seçmek, düzeni %61,8 ile %38,2 olarak bölmek, yazı boyutlarını 1,618 katsayısıyla büyütmek ve logo eğrilerini Fibonacci çaplı çemberlerden türetmek en yaygın uygulamalardır."],
    ["Altın dikdörtgen nedir?", "Kenarları 1 : 1,618 oranında olan dikdörtgendir. İçinden kısa kenarı uzunluğunda bir kare çıkarıldığında kalan parça yine altın dikdörtgendir. Karelere çizilen çeyrek çemberler birleşerek altın sarmalı oluşturur."],
    ["Altın oran hakkındaki yaygın efsaneler doğru mu?", "Çoğu abartılıdır. Parthenon, Mona Lisa ve insan vücudunun altın orana göre tasarlandığına dair sağlam bir kanıt yoktur ve deniz kabuğu sarmalının oranı genellikle φ'den farklıdır. Bitkilerdeki Fibonacci düzeni ise büyük ölçüde doğrudur."],
    ["Altın oranın tersi neden 0,618'dir?", "Altın oran φ² = φ + 1 denklemini sağlar. Bu denklemin iki tarafı φ'ye bölündüğünde φ = 1 + 1 ÷ φ, yani 1 ÷ φ = φ − 1 elde edilir. Bu yüzden 1 ÷ 1,618 tam olarak 0,618 olur."]
  ],
  tools: ["altin-oran-hesapla", "fibonacci-hesapla", "en-boy-orani-hesapla"],
  related: ["oran-oranti-nasil-cozulur", "karekok-nasil-alinir", "cokgenin-ic-acilari-toplami", "a4-kagit-boyutu-kac-cm"],
  sources: [
    ["Millî Eğitim Bakanlığı – Matematik öğretim programı", "https://www.meb.gov.tr/"],
    ["TÜBİTAK Bilim Genç", "https://bilimgenc.tubitak.gov.tr/"]
  ]
};
