export default {
  slug: "enerji-etiketi-nasil-okunur-a-g-sinifi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Enerji Etiketi Nasıl Okunur? A–G Sınıfı, Yıllık kWh ve Gerçek Maliyet",
  pageTitle: "Enerji Etiketi Nasıl Okunur? A–G Sınıfı, kWh ve Yıllık Maliyet",
  description: "Yeni enerji etiketinde A en verimli, G en az verimli sınıftır. Yıllık kWh'yi TL'ye çevirme, 100 yıkama değeri, QR kod, gürültü sınıfı ve geri ödeme süresi örnekleri.",
  keywords: ["enerji etiketi nasıl okunur", "enerji sınıfı a b c", "a+++ yeni etiket", "yıllık kwh tüketimi", "buzdolabı enerji sınıfı", "enerji etiketi qr kodu", "enerji sınıfı farkı ne kadar", "100 yıkama kwh"],
  lead: "Yeni nesil enerji etiketinde cihazlar <strong>A'dan (en verimli) G'ye (en az verimli)</strong> sınıflandırılır; artı işaretli A+++ gibi sınıflar kaldırılmış, ölçek yeniden düzenlenmiştir. Etiketin en işe yarar bilgisi harften çok <strong>tüketim rakamıdır</strong>: buzdolabında yıllık kWh, çamaşır ve bulaşık makinesinde 100 çevrimdeki kWh. Bu rakamı elektriğin birim fiyatıyla çarparak cihazın yıllık işletme maliyetini, iki sınıf arasındaki farkı ve verimli cihazın kendini kaç yılda amorti edeceğini hesaplayabilirsiniz. Bu sayfada etiketi bölüm bölüm okuyor ve örnek hesaplar yapıyoruz.",
  kisaCevap: [
    "Yeni ölçekte A en verimli, G en az verimli sınıftır; A+, A++, A+++ sınıfları yeni etiketlerde yoktur.",
    "Eski A+++ etiketli bir cihazın yeni ölçekte doğrudan bir karşılığı yoktur; ölçek sıkılaştırıldığı için çoğu cihaz daha alt harflere yerleşmiştir.",
    "Yıllık maliyet = yıllık kWh × elektrik birim fiyatı; 150 kWh/yıl ve örnek 3,00 TL/kWh ile 450 TL eder.",
    "Çamaşır ve bulaşık makinesinde değer 100 çevrim içindir; yıllık tüketim için kendi yıkama sayınızla oranlayın.",
    "Etiketteki QR kod, ürünün AB ürün veri tabanındaki (EPREL) teknik bilgi sayfasına götürür.",
    "Gürültü dB(A) olarak yazılır ve ayrıca A–D arası bir gürültü sınıfı verilir; 3 dB fark, ses enerjisinde yaklaşık iki kat demektir."
  ],
  figure: {
    alt: "Enerji etiketi okuma şeması: A'dan G'ye renkli sınıf okları, örnek buzdolabının B sınıfında olduğu; altta yıllık 150 kWh, toplam hacim, gürültü 35 dB ve QR kod bölümleri; yanda B ve E sınıfı buzdolabının yıllık maliyet karşılaştırması.",
    caption: "Etiketin üst kısmı sınıfı, orta kısmı tüketimi, alt kısmı cihaza özel bilgileri gösterir. Örnekte B sınıfı (150 kWh/yıl) ile E sınıfı (250 kWh/yıl) buzdolabı arasındaki fark örnek 3,00 TL/kWh fiyatla yılda 300 TL'dir. Tüketim değerleri örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Enerji etiketini okumak</text>
  <rect x="30" y="44" width="300" height="360" rx="10" class="sf sb"/>
  <g class="b">
    <rect x="50" y="60" width="120" height="30" class="ok"/><text x="62" y="81" class="sf">A</text>
    <rect x="50" y="94" width="140" height="30" class="oks"/><text x="62" y="115">B</text>
    <rect x="50" y="128" width="160" height="30" class="oks"/><text x="62" y="149">C</text>
    <rect x="50" y="162" width="180" height="30" class="y"/><text x="62" y="183">D</text>
    <rect x="50" y="196" width="200" height="30" class="ps"/><text x="62" y="217">E</text>
    <rect x="50" y="230" width="220" height="30" class="dgs"/><text x="62" y="251">F</text>
    <rect x="50" y="264" width="240" height="30" class="dg"/><text x="62" y="285" class="sf">G</text>
  </g>
  <polygon points="290,94 320,109 290,124" class="t"/>
  <text x="250" y="114" class="sm b end">bu cihaz</text>
  <line x1="50" y1="310" x2="310" y2="310" class="sb" fill="none"/>
  <text x="180" y="338" class="xl mid">150 kWh/yıl</text>
  <g class="sm mid t2">
    <text x="90" y="372">Hacim (L)</text><text x="180" y="372">35 dB · B</text><text x="270" y="372">QR kod</text>
  </g>
  <text x="180" y="394" class="sm mid t2">sınıf → tüketim → özel bilgiler</text>
  <text x="525" y="70" class="b mid">Yıllık maliyet (örnek 3,00 TL/kWh)</text>
  <rect x="380" y="90" width="90" height="180" class="ok"/>
  <rect x="580" y="90" width="90" height="300" class="dg"/>
  <text x="425" y="84" class="b mid ok">450 TL</text>
  <text x="625" y="84" class="b mid dg">750 TL</text>
  <text x="425" y="290" class="sm mid">B sınıfı</text>
  <text x="425" y="308" class="sm mid t2">150 kWh</text>
  <text x="525" y="330" class="b mid">fark</text>
  <text x="525" y="352" class="lg b mid p">300 TL/yıl</text>
  <text x="625" y="404" class="sm mid">E sınıfı · 250 kWh</text>
</svg>`
  },
  sections: [
    {
      h: "Enerji etiketi nedir, neden yenilendi?",
      p: [
        "Enerji etiketi, beyaz eşya, ekran ve lamba gibi ürünlerin enerji verimliliğini ortak bir dille gösteren zorunlu bir bilgi kartıdır. Avrupa Birliği'nde 1990'lardan beri kullanılan sistem, Türkiye'de de AB mevzuatıyla uyumlu yönetmeliklerle uygulanır. Amaç, satın alma anında farklı markaların ve modellerin tüketimini aynı ölçekte karşılaştırabilmektir.",
        "Eski sistemde teknoloji ilerledikçe A sınıfının üzerine A+, A++, A+++ sınıfları eklendi. Zamanla ürünlerin büyük çoğunluğu en üst sınıflarda toplandı ve etiket ayırt ediciliğini yitirdi. Bunun üzerine AB, sınıfları yeniden A–G ölçeğine çeken yeni bir çerçeve düzenleme yaptı. Yeni etiketler buzdolapları, bulaşık makineleri, çamaşır makineleri ve televizyonlar için Mart 2021'de, lambalar için Eylül 2021'de kullanılmaya başlandı; diğer ürün grupları kademeli olarak geçiş yapıyor.",
        "Yeni ölçek bilinçli olarak sıkı tutuldu: başlangıçta A sınıfı neredeyse boş bırakıldı ki gelecekte geliştirilecek daha verimli ürünler için yer kalsın. Bu yüzden bugün C ya da D sınıfı bir cihaz, eski etikette A+++ görünen bir cihaz kadar verimli olabilir."
      ]
    },
    {
      h: "Etiketteki A–G sınıfları ne anlama gelir?",
      p: [
        "Sınıf, cihazın aynı türdeki ürünler için tanımlanmış bir referans tüketime göre ne kadar verimli olduğunu gösterir. Hesap, cihazın büyüklüğünü ve özelliklerini de hesaba katan bir enerji verimlilik endeksiyle yapılır; bu yüzden 600 litrelik bir buzdolabı ile 250 litrelik bir buzdolabı aynı harfi alabilir ama tüketimleri farklıdır.",
        "Etiketin harf kısmı karşılaştırma için hızlı bir ipucudur; satın alma kararında ise asıl bakmanız gereken rakam, etiketin ortasındaki tüketim değeridir. İki cihazdan biri bir sınıf daha iyi olsa bile, daha büyük olduğu için yılda daha fazla elektrik tüketebilir."
      ],
      table: {
        head: ["Etiket bölümü", "Ne gösterir?", "Nasıl kullanılır?"],
        rows: [
          ["Üst kısım: QR kod ve tedarikçi bilgisi", "Marka, model kodu, ürün veri tabanı bağlantısı", "Teknik ayrıntıları resmî kaynaktan kontrol etmek"],
          ["A–G ölçeği", "Enerji verimlilik sınıfı", "Aynı tür ve boyuttaki ürünleri hızlı karşılaştırmak"],
          ["Tüketim değeri", "kWh/yıl ya da kWh/100 çevrim", "Yıllık işletme maliyetini hesaplamak"],
          ["Piktogramlar", "Hacim, kapasite, su tüketimi, süre, gürültü", "İhtiyaca uygun cihazı seçmek"],
          ["Gürültü sınıfı", "dB(A) ve A–D sınıfı", "Açık mutfak ve yatak odası yakınında önemlidir"]
        ]
      }
    },
    {
      h: "Eski A+++ etiketleri yeni ölçekte neye karşılık gelir?",
      p: [
        "Eski ve yeni ölçek arasında birebir dönüşüm tablosu yoktur, çünkü yeni ölçekte hem sınıf sınırları hem de bazı ürünlerde ölçüm yöntemleri (örneğin çamaşır makinesinde test programı) değişti. Genel eğilim, eski en üst sınıflardaki ürünlerin yeni ölçekte daha alt harflere yerleşmesi oldu; eski A+++ etiketli birçok ürün yeni etikette B ile D arasında bir sınıf aldı.",
        "Pratik sonuç şudur: elinizde eski etiketli bir cihaz ile yeni etiketli bir cihazı karşılaştırırken harflere değil, tüketim rakamlarına bakın. Mağazada iki etiket yan yana duruyorsa, yeni etiketteki \"C\" ile eski etiketteki \"A++\" arasında hangisinin daha verimli olduğunu harften çıkaramazsınız. Ürün veri tabanındaki teknik sayfalar bu karşılaştırmayı kolaylaştırır."
      ]
    },
    {
      h: "Etiketteki yıllık kWh değeri nasıl TL'ye çevrilir?",
      p: [
        "Tüketim değeri elektriğin birim fiyatıyla çarpılarak para birimine çevrilir. Birim fiyat olarak elektrik faturanızdaki kilovatsaat başına ödediğiniz toplam tutarı (vergi ve fonlar dahil) kullanmak en gerçekçi sonucu verir. Aşağıdaki hesaplarda <strong>örnek olarak 3,00 TL/kWh</strong> kullanılmıştır; kendi faturanızdaki değerle değiştirin."
      ],
      formula: "Yıllık maliyet = yıllık tüketim (kWh) × birim fiyat (TL/kWh)\nÖrnek: 150 kWh × 3,00 TL = 450 TL/yıl",
      after: [
        "Buzdolabı 7 gün 24 saat çalıştığı için etiketteki yıllık değer gerçek kullanıma oldukça yakındır; ancak kapı açma sıklığı, ortam sıcaklığı ve cihazın konumu tüketimi değiştirebilir. Faturanızdaki birim fiyatı nasıl bulacağınızı [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası makalesinde]] bulabilirsiniz. Gücü ve kullanım süresi bilinen herhangi bir cihazın maliyetini [[arac:cihaz-elektrik-maliyeti-hesapla|Cihaz Elektrik Maliyeti Hesaplama]], evdeki tüm cihazların toplamını [[arac:elektrik-tuketim-hesapla|Elektrik Tüketim Hesaplama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Çamaşır makinesi etiketinde 100 yıkama ne demek?",
      p: [
        "Yeni etiketlerde çamaşır ve bulaşık makinelerinin enerji tüketimi yıllık değil, <strong>100 çevrim (yıkama) başına kWh</strong> olarak verilir. Değer, üreticinin \"eko\" programında belirlenen standart koşullarda ölçülür (çamaşır makinesinde eko 40–60 programı). Böylece haftada iki kez yıkayan bir hane ile her gün yıkayan bir hane kendi yıllık tüketimini oranlayarak bulabilir."
      ],
      ol: [
        "Etiketteki değeri okuyun: 55 kWh/100 yıkama.",
        "Yıllık yıkama sayınızı bulun: haftada 4 yıkama × 52 hafta = 208 yıkama.",
        "Oranlayın: 55 × 208 ÷ 100 = 114,4 kWh/yıl.",
        "Birim fiyatla çarpın: 114,4 × 3,00 = yaklaşık 343 TL/yıl.",
        "Karşılaştırın: 75 kWh/100 yıkamalık bir makine aynı kullanımda 156 kWh ve yaklaşık 468 TL tüketir; fark yılda yaklaşık 125 TL'dir."
      ],
      after: [
        "Çamaşır makinesi etiketinde ayrıca kapasite (kg), eko programda yıkama başına su tüketimi (litre), programın süresi, sıkma verimliliği sınıfı (A–G) ve sıkma sırasındaki gürültü yer alır. Eko programlar uzun sürer ama daha az enerji harcar; sık kullandığınız hızlı programların tüketimi etiketteki değerden yüksek olabilir."
      ]
    },
    {
      h: "İki enerji sınıfı arasındaki fark yılda kaç TL eder?",
      p: [
        "Sınıf farkının parasal karşılığı, cihazın ne kadar çok çalıştığına bağlıdır. Sürekli çalışan buzdolabı ve derin dondurucularda fark belirgindir; yılda birkaç yüz kez çalışan cihazlarda daha küçüktür. Aşağıdaki tablo, örnek tüketim değerleri ve 3,00 TL/kWh ile hazırlanmıştır."
      ],
      table: {
        head: ["Cihaz (örnek)", "Verimli model", "Daha az verimli model", "Yıllık fark"],
        rows: [
          ["Buzdolabı", "150 kWh/yıl → 450 TL", "250 kWh/yıl → 750 TL", "300 TL"],
          ["Derin dondurucu", "170 kWh/yıl → 510 TL", "280 kWh/yıl → 840 TL", "330 TL"],
          ["Çamaşır makinesi (208 yıkama)", "55 kWh/100 → 343 TL", "75 kWh/100 → 468 TL", "125 TL"],
          ["Bulaşık makinesi (250 çevrim)", "60 kWh/100 → 450 TL", "85 kWh/100 → 638 TL", "188 TL"]
        ],
        caption: "Tüketim değerleri örnektir; kendi karşılaştırmanızda etiketlerdeki gerçek değerleri ve faturanızdaki birim fiyatı kullanın."
      }
    },
    {
      h: "Daha verimli cihaz kendini kaç yılda amorti eder?",
      p: [
        "Verimli cihaz genellikle daha pahalıdır. Aradaki fiyat farkının yıllık enerji tasarrufuyla kaç yılda geri döneceğini görmek için basit geri ödeme süresi hesabı yapılır. Bu hesap, cihazın beklenen kullanım ömrüyle karşılaştırıldığında anlamlıdır; buzdolapları genellikle 10 yıl ve üzeri kullanılır."
      ],
      formula: "Geri ödeme süresi (yıl) = fiyat farkı ÷ yıllık tasarruf\nÖrnek: 4.500 TL ÷ 300 TL/yıl = 15 yıl",
      after: [
        "Örnekte geri ödeme süresi 15 yıl çıkar; bu, cihazın ömrüne yakın olduğu için yalnızca enerji tasarrufu açısından kararın sınırda olduğunu gösterir. Fiyat farkı 2.500 TL olsaydı süre yaklaşık 8 yıla inerdi. Elektrik fiyatlarının zamanla artması da geri ödemeyi kısaltır. Farklı senaryoları [[arac:geri-odeme-suresi-hesapla|Geri Ödeme Süresi Hesaplama]] aracında deneyebilir, yöntemin mantığını [[bilgi:geri-odeme-suresi-nedir|geri ödeme süresi makalesinde]] okuyabilirsiniz."
      ]
    },
    {
      h: "QR kod ve gürültü (dB) değeri nasıl okunur?",
      p: [
        "Yeni etiketlerin sol üst köşesindeki <strong>QR kod</strong>, ürünün AB ürün veri tabanındaki (EPREL) kaydına götürür. Burada ürünün teknik bilgi formu, ölçüm koşulları ve etiketin dijital kopyası bulunur. Mağazadaki etiketle veri tabanındaki bilginin aynı olması, etiketin o modele ait olduğunu doğrulamanın kolay bir yoludur.",
        "<strong>Gürültü</strong> değeri desibel A, yani dB(A) cinsindendir ve yanında A–D arası bir gürültü sınıfı yer alır (A en sessiz). Desibel logaritmik bir ölçektir: 3 dB fark ses enerjisinde yaklaşık iki kata, 10 dB fark kulağın algısında yaklaşık iki kat yüksekliğe karşılık gelir. Açık mutfaklı evlerde 39 dB ile 45 dB arasındaki fark gündelik yaşamda belirgindir. Desibel ölçeğinin ayrıntıları için [[bilgi:desibel-nedir-kac-db-zararli|desibel makalesine]] bakabilirsiniz."
      ]
    },
    {
      h: "Etiket okurken sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca harfe bakmak:</strong> Büyük bir cihaz daha iyi sınıfta olsa bile daha fazla tüketebilir; tüketim rakamını karşılaştırın.",
        "<strong>Eski ve yeni etiketi aynı ölçek sanmak:</strong> Eski A++ ile yeni C doğrudan karşılaştırılamaz.",
        "<strong>100 çevrim değerini yıllık sanmak:</strong> Çamaşır ve bulaşık makinesinde değeri kendi kullanımınıza oranlayın.",
        "<strong>Birim fiyatı eksik almak:</strong> Faturadaki vergi ve fonlar dahil kWh maliyetini kullanın.",
        "<strong>Program farkını unutmak:</strong> Etiket eko programa göredir; hızlı ve sıcak programlar daha fazla tüketir.",
        "<strong>İhtiyaçtan büyük cihaz almak:</strong> Gereğinden büyük buzdolabı, sınıfı iyi olsa da gereksiz tüketim demektir."
      ],
      note: "Tüketim ve fiyat değerleri örnektir. Cihaz seçerken etiketteki gerçek değerleri, faturanızdaki birim fiyatı ve kendi kullanım alışkanlığınızı esas alın."
    }
  ],
  faq: [
    ["Enerji etiketindeki A–G sınıfları ne anlama gelir?", "A en verimli, G en az verimli sınıftır. Sınıf, cihazın aynı tür ürünler için tanımlanmış referans tüketime göre verimliliğini gösterir; cihazın boyutu da hesaba katıldığı için asıl karşılaştırma tüketim rakamıyla yapılmalıdır."],
    ["Eski A+++ etiketleri yeni ölçekte neye karşılık gelir?", "Birebir karşılık yoktur. Ölçek sıkılaştırıldığı ve bazı ölçüm yöntemleri değiştiği için eski A+++ etiketli ürünlerin çoğu yeni ölçekte daha alt harflere, genellikle B ile D arasına yerleşmiştir. Karşılaştırmada kWh değerine bakın."],
    ["Etiketteki yıllık kWh değeri nasıl TL'ye çevrilir?", "Yıllık kWh değeri, faturanızdaki vergiler dahil kilovatsaat birim fiyatıyla çarpılır. Örneğin 150 kWh tüketen bir buzdolabı, örnek 3,00 TL birim fiyatla yılda yaklaşık 450 TL elektrik harcar."],
    ["İki enerji sınıfı arasındaki fark yılda kaç TL eder?", "Fark cihazın tüketimine ve kullanım sıklığına bağlıdır. Örnek değerlerle 150 ve 250 kWh tüketen iki buzdolabı arasında örnek 3,00 TL birim fiyatla yılda yaklaşık 300 TL fark oluşur; çamaşır makinesinde fark genellikle daha küçüktür."],
    ["Etiketteki QR kod ne işe yarar?", "QR kod, ürünün AB ürün veri tabanı EPREL'deki kaydına götürür. Burada teknik bilgi formu, ölçüm koşulları ve etiketin dijital kopyası bulunur; mağazadaki etiketin o modele ait olduğunu doğrulamak için kullanılabilir."],
    ["Çamaşır makinesi etiketinde 100 yıkama ne demek?", "Enerji tüketimi eko programda 100 yıkama için kWh olarak verilir. Yıllık tüketimi bulmak için bu değer kendi yıllık yıkama sayınızla çarpılıp 100'e bölünür; haftada dört yıkamada yılda yaklaşık 208 yıkama yapılır."],
    ["Daha verimli cihaz kendini kaç yılda amorti eder?", "Fiyat farkı yıllık enerji tasarrufuna bölünür. 4.500 TL fiyat farkı ve yılda 300 TL tasarrufla geri ödeme süresi 15 yıldır; bu süre cihazın beklenen ömrüyle karşılaştırılarak değerlendirilmelidir."],
    ["Etiketteki gürültü (dB) değeri nasıl okunur?", "Gürültü dB(A) cinsinden yazılır ve yanında A ile D arasında bir gürültü sınıfı bulunur. Desibel logaritmik olduğu için 3 dB fark ses enerjisinde yaklaşık iki kat, 10 dB fark algılanan yükseklikte yaklaşık iki kat demektir."],
    ["Enerji sınıfı yüksek cihaz her zaman daha az mı tüketir?", "Her zaman değil. Sınıf cihazın boyutuna göre hesaplandığı için daha büyük ve daha iyi sınıftaki bir cihaz, daha küçük ama bir sınıf alttaki cihazdan daha fazla kWh tüketebilir. Kararı etiketteki tüketim rakamıyla verin."]
  ],
  tools: ["cihaz-elektrik-maliyeti-hesapla", "elektrik-tuketim-hesapla", "geri-odeme-suresi-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "geri-odeme-suresi-nedir", "watt-amper-volt-iliskisi"],
  sources: [
    ["Avrupa Komisyonu – Enerji etiketi ve ürün veri tabanı (EPREL)", "https://energy-efficient-products.ec.europa.eu/"],
    ["T.C. Enerji ve Tabii Kaynaklar Bakanlığı – Enerji verimliliği", "https://enerji.gov.tr/"]
  ]
};
