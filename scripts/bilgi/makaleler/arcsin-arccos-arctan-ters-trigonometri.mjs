export default {
  slug: "arcsin-arccos-arctan-ters-trigonometri",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Arcsin, Arccos ve Arctan Nedir? Ters Trigonometrik Fonksiyonlarla Açı",
  pageTitle: "Arcsin, Arccos, Arctan Nedir? Ters Trigonometri ile Açı Bulma",
  description: "Arcsin, arccos ve arctan bir orandan açıyı verir: arcsin(0,5) = 30°, arctan(1) = 45°. Değer aralıkları, dik üçgende açı, eğimden açı ve derece-radyan farkı örneklerle.",
  keywords: ["arcsin nedir", "arccos nedir", "arctan nedir", "ters trigonometri", "sin⁻¹ hesaplama", "orandan açı bulma", "eğimden açı", "arctan 1 kaç derece"],
  lead: "Arcsin, arccos ve arctan, sinüs, kosinüs ve tanjantın <strong>ters fonksiyonlarıdır</strong>: bir trigonometrik orandan açıyı verirler. Sinüsü 0,5 olan açı arcsin(0,5) = <strong>30°</strong>, kosinüsü 0,5 olan açı arccos(0,5) = <strong>60°</strong>, tanjantı 1 olan açı arctan(1) = <strong>45°</strong>'dir. Hesap makinelerinde sin⁻¹, cos⁻¹, tan⁻¹ tuşlarıyla bulunurlar; ancak sin⁻¹, 1/sin anlamına gelmez. Bu sayfada değer aralıklarını, dik üçgende kenarlardan açı bulmayı, eğim yüzdesinden açıya geçişi ve derece-radyan tuzağını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "arcsin(x), sinüsü x olan açıdır; x yalnızca −1 ile 1 arasında olabilir ve sonuç −90° ile 90° arasındadır.",
    "arccos(x), kosinüsü x olan açıdır; x yine −1 ile 1 arasındadır ve sonuç 0° ile 180° arasındadır.",
    "arctan(x), tanjantı x olan açıdır; x her gerçel sayı olabilir ve sonuç −90° ile 90° arasındadır (uçlar hariç).",
    "sin⁻¹(x) ters fonksiyon gösterimidir, 1/sin(x) değildir; 1/sin(x) kosekanttır.",
    "Dik üçgende açı = arctan(karşı ÷ komşu); 3-4-5 üçgeninde küçük açı arctan(0,75) ≈ 36,87°'dir.",
    "Eğim açısı = arctan(yüzde eğim ÷ 100): %8 eğim ≈ 4,57°, %100 eğim = 45°."
  ],
  figure: {
    alt: "3-4-5 dik üçgeni: karşı kenar 3, komşu kenar 4, hipotenüs 5; açı arctan(3/4), arcsin(3/5) ve arccos(4/5) ile aynı şekilde 36,87 derece bulunuyor. Sağda arcsin, arccos ve arctan değer aralıkları.",
    caption: "Aynı açı üç ters fonksiyonla da bulunabilir: hangi iki kenarı biliyorsanız ona uygun olanı seçin. Üç sonuç da 36,87° çıkar; tutarlılık hesabın doğru olduğunu gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Kenarlardan açıya: 3-4-5 üçgeni</text>
  <polygon points="60,320 340,320 340,110" class="ps sp"/>
  <rect x="322" y="302" width="18" height="18" class="sf sb"/>
  <text x="200" y="346" class="b mid">komşu = 4</text>
  <text x="352" y="220" class="b">karşı = 3</text>
  <text x="180" y="200" class="b mid p">hipotenüs = 5</text>
  <path d="M 120 320 A 60 60 0 0 0 108 284" class="sa" fill="none"/>
  <text x="128" y="306" class="b">θ</text>
  <g class="sm">
    <rect x="30" y="356" width="370" height="34" rx="6" class="sf sb"/>
    <text x="215" y="378" class="mid b">θ = arctan(3/4) = arcsin(3/5) = arccos(4/5) ≈ 36,87°</text>
  </g>
  <rect x="430" y="56" width="270" height="96" rx="8" class="p"/>
  <text x="565" y="82" class="b mid sf">arcsin(x)</text>
  <text x="565" y="106" class="sm mid sf">girdi: −1 ≤ x ≤ 1</text>
  <text x="565" y="128" class="sm mid sf">sonuç: −90° … 90°</text>
  <rect x="430" y="164" width="270" height="96" rx="8" class="ps"/>
  <text x="565" y="190" class="b mid">arccos(x)</text>
  <text x="565" y="214" class="sm mid">girdi: −1 ≤ x ≤ 1</text>
  <text x="565" y="236" class="sm mid">sonuç: 0° … 180°</text>
  <rect x="430" y="272" width="270" height="96" rx="8" class="oks"/>
  <text x="565" y="298" class="b mid">arctan(x)</text>
  <text x="565" y="322" class="sm mid">girdi: her gerçel sayı</text>
  <text x="565" y="344" class="sm mid">sonuç: −90° … 90° (uçlar hariç)</text>
</svg>`
  },
  sections: [
    {
      h: "Ters trigonometrik fonksiyon ne işe yarar?",
      p: [
        "Sinüs, kosinüs ve tanjant bir açıdan oran üretir: sin 30° = 0,5. Pratikte ise çoğu zaman bunun tersiyle karşılaşırız: kenar uzunluklarını, bir eğimi ya da bir oranı biliriz ve açıyı ararız. Arcsin, arccos ve arctan tam bu işi yapar: verilen orana karşılık gelen açıyı bulur.",
        "Bir rampanın kaç derece eğimli olduğu, bir merdivenin duvarla yaptığı açı, bir çatı makasının açısı, bir kuvvetin bileşenlerinden yönü, karmaşık bir sayının argümanı ya da bir GPS hesabındaki yön açısı ters trigonometriyle bulunur. Kısaca, \"oran biliniyor, açı aranıyor\" olan her durumda bu fonksiyonlar kullanılır."
      ],
      table: {
        head: ["Fonksiyon", "Okunuşu / diğer gösterim", "Sorduğu soru", "Örnek"],
        rows: [
          ["arcsin(x)", "ark sinüs, sin⁻¹(x)", "Sinüsü x olan açı kaç?", "arcsin(0,5) = 30°"],
          ["arccos(x)", "ark kosinüs, cos⁻¹(x)", "Kosinüsü x olan açı kaç?", "arccos(0,5) = 60°"],
          ["arctan(x)", "ark tanjant, tan⁻¹(x)", "Tanjantı x olan açı kaç?", "arctan(1) = 45°"]
        ]
      }
    },
    {
      h: "sin⁻¹ ile 1/sin aynı şey midir?",
      p: [
        "Hayır, bu en sık yapılan karışıklıktır. Hesap makinelerindeki <strong>sin⁻¹</strong> gösterimi, sinüs fonksiyonunun <strong>tersini</strong> yani arcsin'i ifade eder. Buradaki −1 bir üs değil, \"ters fonksiyon\" işaretidir. Sinüsün çarpmaya göre tersi olan 1/sin(x) ise ayrı bir fonksiyondur ve <strong>kosekant</strong> (csc) olarak adlandırılır.",
        "Fark sayılarla açıkça görülür: sin⁻¹(0,5) = 30°, ama 1/sin(0,5 radyan) ≈ 2,086. Aynı şekilde cos⁻¹ ile sekant (1/cos), tan⁻¹ ile kotanjant (1/tan) karıştırılmamalıdır. Karışıklığı önlemek için yazılı çözümlerde arcsin, arccos, arctan gösterimini tercih etmek daha güvenlidir."
      ]
    },
    {
      h: "Arcsin neden yalnızca −90° ile 90° arasında değer verir?",
      p: [
        "Sinüs fonksiyonu periyodiktir: sin 30° = sin 150° = sin 390° = 0,5. Yani aynı orana sonsuz sayıda açı karşılık gelir. Bir fonksiyonun tersi tek bir sonuç vermelidir; bu yüzden matematikçiler her ters fonksiyon için sinüsün her değeri yalnızca bir kez aldığı bir aralık seçmiştir. Bu aralığa <strong>esas değer aralığı</strong> denir.",
        "Arcsin için seçilen aralık −90° ile 90° arasıdır (radyan olarak −π/2 ile π/2); sinüs bu aralıkta −1'den 1'e kesintisiz artar. Arccos için aralık 0° ile 180°'dir; kosinüs bu aralıkta 1'den −1'e azalır. Arctan için yine −90° ile 90° seçilmiştir, ama tanjant bu uçlarda tanımsız olduğu için uçlar dahil değildir."
      ],
      table: {
        head: ["x", "arcsin(x)", "arccos(x)", "arctan(x)"],
        rows: [
          ["−1", "−90°", "180°", "−45°"],
          ["−0,5", "−30°", "120°", "≈ −26,57°"],
          ["0", "0°", "90°", "0°"],
          ["0,5", "30°", "60°", "≈ 26,57°"],
          ["√2/2 ≈ 0,7071", "45°", "45°", "≈ 35,26°"],
          ["√3/2 ≈ 0,8660", "60°", "30°", "≈ 40,89°"],
          ["1", "90°", "0°", "45°"],
          ["√3 ≈ 1,732", "tanımsız", "tanımsız", "60°"]
        ],
        caption: "arcsin ve arccos yalnızca −1 ile 1 arasındaki sayılar için tanımlıdır; arctan her gerçel sayıyı kabul eder."
      },
      after: [
        "Esas değer aralığı dışındaki çözümler de gerekebilir. sin x = 0,5 denkleminin 0° ile 360° arasında iki çözümü vardır: arcsin'in verdiği 30° ve 180° − 30° = 150°. tan x = 1 için çözümler 45° ve 45° + 180° = 225°'dir. Açıyı 0°–360° aralığındaki tüm çözümleriyle görmek için [[arac:ters-trigonometri-hesapla|Ters Trigonometri Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Dik üçgende kenarlardan açı nasıl bulunur?",
      p: [
        "Dik üçgende bir dar açının sinüsü karşı kenar ÷ hipotenüs, kosinüsü komşu kenar ÷ hipotenüs, tanjantı karşı kenar ÷ komşu kenardır. Hangi iki kenarı biliyorsanız ona uygun ters fonksiyonu seçersiniz."
      ],
      formula: "θ = arcsin(karşı ÷ hipotenüs)\nθ = arccos(komşu ÷ hipotenüs)\nθ = arctan(karşı ÷ komşu)",
      ol: [
        "3-4-5 üçgeninde 4 birimlik kenara komşu açıyı arayın. Karşı kenar 3, komşu kenar 4, hipotenüs 5.",
        "Tanjantla: arctan(3 ÷ 4) = arctan(0,75) ≈ 36,87°.",
        "Sinüsle kontrol: arcsin(3 ÷ 5) = arcsin(0,6) ≈ 36,87°.",
        "Kosinüsle kontrol: arccos(4 ÷ 5) = arccos(0,8) ≈ 36,87°.",
        "Diğer dar açı 90° − 36,87° = 53,13°'dir; iç açılar toplamı 180° eder."
      ],
      after: [
        "Günlük bir örnek: 5 m uzunluğundaki bir merdiven, alt ucu duvardan 1,5 m uzakta olacak şekilde dayanmışsa yerle yaptığı açı arccos(1,5 ÷ 5) = arccos(0,3) ≈ 72,54°'dir. Üçgenin tüm açı ve kenarlarını bulmak gerekiyorsa [[bilgi:sinus-ve-kosinus-teoremi|sinüs ve kosinüs teoremi makalesine]], temel oranların tablosuna ise [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu makalesine]] bakabilirsiniz."
      ]
    },
    {
      h: "Eğim yüzdesinden eğim açısı nasıl hesaplanır?",
      p: [
        "Yüzde eğim, yükseklik farkının yatay mesafeye oranının 100 katıdır; bu oran aslında eğim açısının tanjantıdır. Bu yüzden yüzde eğimden açıya geçmek için oranı 100'e bölüp arctan alınır. Ters yönde ise açının tanjantı alınıp 100 ile çarpılır."
      ],
      formula: "Eğim açısı = arctan(yüzde eğim ÷ 100)\nYüzde eğim = tan(açı) × 100",
      table: {
        head: ["Yüzde eğim", "Oran (1:n)", "Açı"],
        rows: [
          ["%5", "1:20", "≈ 2,86°"],
          ["%8", "1:12,5", "≈ 4,57°"],
          ["%10", "1:10", "≈ 5,71°"],
          ["%12", "≈ 1:8,3", "≈ 6,84°"],
          ["%50", "1:2", "≈ 26,57°"],
          ["%100", "1:1", "45°"]
        ]
      },
      after: [
        "Tablo, yüzde eğim ile açının doğrusal ilişkili olmadığını gösterir: %100 eğim 90° değil 45°'tir, çünkü yatayda 1 metrede 1 metre yükselmek demektir. Yol tabelalarındaki %12 eğim bu yüzden yalnızca yaklaşık 7°'dir. Kendi değerinizi çevirmek için [[arac:egim-yuzdesi-hesapla|Eğim Yüzdesi Hesaplama]] aracını kullanabilir, rampalarda kullanılan sınırları [[bilgi:engelli-rampasi-egimi-kac-olmali|engelli rampası eğimi makalesinde]] inceleyebilirsiniz."
      ]
    },
    {
      h: "Hesap makinesi derece mi radyan mı modunda olmalı?",
      p: [
        "Ters trigonometrik fonksiyonlar bir açı döndürdüğü için sonuç, hesap makinesinin açı moduna göre gösterilir. <strong>DEG</strong> modunda arcsin(0,5) = 30, <strong>RAD</strong> modunda 0,5236 (yani π/6) sonucu çıkar. İkisi de doğrudur, yalnızca birimleri farklıdır. Sınav sorusunda derece isteniyorsa makinenin DEG modunda olduğundan emin olun.",
        "Programlama dillerinde ve elektronik tablolarda ters trigonometrik fonksiyonlar neredeyse her zaman <strong>radyan</strong> döndürür. Sonucu dereceye çevirmek için 180/π ile çarpmak gerekir: 0,5236 × 57,2958 ≈ 30°. Radyandan dereceye ya da tersine çevirirken π ≈ 3,14159 değerini kullanın."
      ],
      formula: "Derece = radyan × 180 ÷ π\nRadyan = derece × π ÷ 180"
    },
    {
      h: "arctan(1) neden 45°'dir?",
      p: [
        "Tanjant, dik üçgende karşı kenarın komşu kenara oranıdır. Oranın 1 olması, iki dik kenarın eşit uzunlukta olduğu anlamına gelir. İki dik kenarı eşit olan dik üçgen ikizkenardır ve dar açıları birbirine eşittir. İç açılar toplamı 180° olduğuna göre her biri (180° − 90°) ÷ 2 = 45°'dir. Dolayısıyla tan 45° = 1 ve arctan(1) = 45°'dir.",
        "Aynı mantık birim çemberde de görülür: 45°'lik açıda çember üzerindeki noktanın x ve y koordinatları eşittir (≈ 0,7071), yani y/x = 1'dir. Radyan cinsinden arctan(1) = π/4 ≈ 0,7854'tür."
      ]
    },
    {
      h: "Ters trigonometri hangi sınavlarda çıkar?",
      p: [
        "Ters trigonometrik fonksiyonlar lise müfredatında 12. sınıf trigonometri ünitesinde yer alır ve AYT matematikte özellikle tanım ve değer aralıkları, arcsin(sin x) gibi bileşke ifadeler ve basit denklemler şeklinde sorulur. Üniversitede matematik, fizik ve mühendislik derslerinde türev ve integral konularıyla birlikte daha sık kullanılır: arctan'ın türevi 1/(1 + x²), arcsin'in türevi 1/√(1 − x²)'dir.",
        "Sınavda sık sorulan kalıplar şunlardır: arcsin(sin 150°) = 30° (çünkü sonuç −90°–90° aralığında olmalıdır), arccos(−0,5) = 120°, sin(arccos 0,6) = 0,8 (3-4-5 üçgeninden). Bu soruların hepsi esas değer aralığını bilmeye dayanır."
      ]
    },
    {
      h: "Bileşke ifadeler: arcsin(sin x) ve sin(arccos x)",
      p: [
        "Sınavlarda ters fonksiyon ile kendisinin iç içe yazıldığı ifadeler sık sorulur. Kural basittir ama bir tuzak içerir: sin(arcsin x) her zaman x'tir (x, −1 ile 1 arasında olmak koşuluyla), çünkü önce açı bulunur, sonra o açının sinüsü alınır. Tersi ise her zaman doğru değildir: arcsin(sin x) yalnızca x esas değer aralığındaysa x'e eşittir.",
        "Örneğin arcsin(sin 150°) sorusunda önce sin 150° = 0,5 bulunur, sonra arcsin(0,5) = 30° elde edilir; cevap 150° değil 30°'dir. Benzer şekilde arccos(cos 300°) = arccos(0,5) = 60°'dir, çünkü arccos'un sonucu 0° ile 180° arasında olmak zorundadır.",
        "Farklı fonksiyonların bileşkesinde dik üçgen çizmek en hızlı yoldur. sin(arccos 0,6) sorusunda kosinüsü 0,6 olan açıyı düşünün: komşu kenar 3, hipotenüs 5 alınırsa karşı kenar 4 olur ve sinüs 4 ÷ 5 = 0,8'dir. tan(arcsin 0,6) için sinüsü 0,6 olan açıyı düşünün: karşı kenar 3, hipotenüs 5, komşu kenar 4'tür ve sonuç 0,75 çıkar. Bu yöntem, hesap makinesi kullanılamayan sınavlarda kesin sonuç verir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>sin⁻¹'i 1/sin sanmak:</strong> Ters fonksiyon ile çarpmaya göre ters farklıdır.",
        "<strong>Tanım dışı değer girmek:</strong> arcsin(1,2) ya da arccos(−3) tanımsızdır; hesap makinesi hata verir.",
        "<strong>Mod hatası:</strong> DEG ve RAD modu karıştırıldığında 30 yerine 0,5236 görülür.",
        "<strong>İkinci çözümü unutmak:</strong> sin x = 0,5'in 0°–360° aralığında 150° de çözümüdür.",
        "<strong>Yüzde eğimi açı sanmak:</strong> %8 eğim 8° değil, yaklaşık 4,57°'dir."
      ]
    }
  ],
  faq: [
    ["Arcsin, arccos ve arctan ne işe yarar?", "Bu fonksiyonlar bir trigonometrik orandan açıyı bulur. Sinüsü, kosinüsü ya da tanjantı bilinen bir açının kaç derece olduğunu verirler; dik üçgende kenarlardan açı bulmak ve eğimden açıya geçmek için kullanılırlar."],
    ["sin⁻¹ ile 1/sin aynı şey midir?", "Hayır. sin⁻¹ ters fonksiyon gösterimidir ve arcsin anlamına gelir; sin⁻¹(0,5) = 30 derecedir. 1/sin ise kosekant adlı ayrı bir fonksiyondur ve tamamen farklı sonuç verir."],
    ["Arcsin fonksiyonunun değer aralığı neden −90° ile 90° arasıdır?", "Sinüs periyodik olduğu için aynı orana sonsuz açı karşılık gelir. Tek bir sonuç elde etmek için sinüsün her değeri bir kez aldığı −90° ile 90° aralığı esas aralık olarak seçilmiştir."],
    ["Dik üçgende kenarlardan açı nasıl bulunur?", "Bilinen iki kenara göre uygun ters fonksiyon seçilir: karşı ve komşu kenar biliniyorsa arctan, karşı kenar ve hipotenüs biliniyorsa arcsin kullanılır. 3-4-5 üçgeninde küçük açı arctan(0,75) yaklaşık 36,87 derecedir."],
    ["Eğim yüzdesinden eğim açısı nasıl hesaplanır?", "Yüzde eğim 100'e bölünür ve arctan alınır. Yüzde 8 eğim için arctan(0,08) yaklaşık 4,57 derece, yüzde 100 eğim için arctan(1) tam 45 derece bulunur."],
    ["Hesap makinesi derece mi radyan mı modunda olmalı?", "Sonucu derece olarak istiyorsanız makine DEG modunda olmalıdır. RAD modunda arcsin(0,5) için 0,5236 görürsünüz; bu da doğrudur, yalnızca radyan cinsindendir ve 180/π ile çarpılarak dereceye çevrilir."],
    ["arctan(1) neden 45°'dir?", "Tanjantın 1 olması iki dik kenarın eşit olduğu anlamına gelir. İkizkenar dik üçgende iki dar açı eşittir ve toplamları 90 derece olduğu için her biri 45 derecedir; bu yüzden arctan(1) = 45°."],
    ["Ters trigonometri hangi sınavlarda çıkar?", "Lise 12. sınıf müfredatında ve AYT matematikte tanım, değer aralığı ve bileşke ifadeler şeklinde sorulur. Üniversitede matematik, fizik ve mühendislik derslerinde türev ve integral konularıyla birlikte sık kullanılır."],
    ["arccos(−0,5) kaç derecedir?", "arccos fonksiyonunun sonucu 0 ile 180 derece arasındadır. Kosinüsü −0,5 olan bu aralıktaki açı 120 derecedir; bu yüzden arccos(−0,5) = 120°, radyan olarak 2π/3'tür."]
  ],
  tools: ["ters-trigonometri-hesapla", "sinus-hesapla", "kosinus-hesapla", "egim-yuzdesi-hesapla"],
  related: ["trigonometri-sin-cos-tan-tablosu", "sinus-ve-kosinus-teoremi", "dogrunun-egimi-nasil-bulunur"]
};
