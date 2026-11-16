export default {
  slug: "pcb-yol-genisligi-nasil-hesaplanir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "PCB Yol Genişliği Nasıl Hesaplanır? Akım, Bakır Kalınlığı ve Isınma",
  pageTitle: "PCB Yol Genişliği Hesaplama: IPC-2221 Formülü ve Örnek",
  description: "PCB yol genişliği akım, bakır kalınlığı ve izin verilen sıcaklık artışına göre IPC-2221 formülüyle bulunur. 1 oz bakır, 2 A örneği, iç ve dış katman farkı.",
  keywords: ["pcb yol genişliği hesaplama", "pcb track width", "ipc-2221 formülü", "1 oz bakır kaç mikron", "2 amper kaç mm yol", "pcb iç katman yol", "pcb sıcaklık artışı", "güç yolu tasarımı"],
  lead: "PCB yol genişliği; yoldan geçecek <strong>akıma</strong>, bakır folyonun <strong>kalınlığına</strong> ve yolun izin verilen <strong>sıcaklık artışına</strong> göre seçilir. En yaygın başlangıç hesabı IPC-2221 standardındaki I = k × ΔT<sup>0,44</sup> × A<sup>0,725</sup> bağıntısıdır; buradan gereken bakır kesiti, kesitten de bakır kalınlığına bölünerek genişlik bulunur. Örneğin 1 oz bakırlı bir dış katmanda 2 A akım ve 10 °C sıcaklık artışı için yaklaşık 0,78 mm genişlik çıkar. Bu sayfada formülü, iç ve dış katman farkını, çözümlü örnekleri ve güç yollarında alınan önlemleri bulacaksınız. Sonuçlar örnektir; tasarımınızda geçerli standardı ve üreticinizin kurallarını esas alın.",
  kisaCevap: [
    "IPC-2221 bağıntısı: I = k × ΔT^0,44 × A^0,725; I amper, ΔT °C, A mil² (1 mil = 0,0254 mm).",
    "Katsayı k dış katmanlar için 0,048, iç katmanlar için 0,024'tür; iç katman ısıyı daha zor attığı için daha geniş yol gerekir.",
    "1 oz bakır yaklaşık 35 µm (1,378 mil) kalınlığındadır; 2 oz yaklaşık 70 µm'dir.",
    "1 oz dış katman, 10 °C artış: 1 A için yaklaşık 0,30 mm, 2 A için 0,78 mm, 3 A için 1,37 mm.",
    "Aynı 2 A iç katmanda yaklaşık 2,03 mm genişlik ister; izin verilen artış 20 °C'ye çıkarsa dış katmanda 0,51 mm'ye iner.",
    "Formül bir alt sınır verir; daha yeni IPC-2152 eğrileri, gerilim düşümü ve üretici kuralları ayrıca kontrol edilmelidir."
  ],
  figure: {
    alt: "PCB yol kesitinin şeması: genişlik ve bakır kalınlığı çarpılarak kesit alanı bulunuyor. Yanında 1 oz bakır ve 10 derece artış için 1, 2, 3 ve 5 amperde gereken dış katman yol genişlikleri çubuk grafik olarak.",
    caption: "Yol kesiti bir dikdörtgendir: kesit alanı = genişlik × bakır kalınlığı. Çubuklar 1 oz bakır, dış katman ve 10 °C sıcaklık artışı için IPC-2221 bağıntısıyla hesaplanan en düşük genişlikleri gösterir; akım iki katına çıktığında genişlik iki kattan fazla artar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Yol kesiti ve gereken genişlik</text>
  <rect x="30" y="150" width="280" height="50" rx="4" class="s2 sb"/>
  <rect x="30" y="150" width="280" height="50" rx="4" class="sf sb"/>
  <text x="170" y="182" class="sm mid mu">FR-4 taban malzemesi</text>
  <rect x="100" y="126" width="140" height="24" class="p"/>
  <text x="170" y="143" class="sm mid sf b">bakır yol</text>
  <line x1="100" y1="110" x2="240" y2="110" class="sp" fill="none"/>
  <line x1="100" y1="104" x2="100" y2="116" class="sp" fill="none"/><line x1="240" y1="104" x2="240" y2="116" class="sp" fill="none"/>
  <text x="170" y="100" class="sm mid b">genişlik (w)</text>
  <line x1="252" y1="126" x2="252" y2="150" class="sp" fill="none"/>
  <text x="260" y="143" class="sm b">t</text>
  <text x="30" y="230" class="sm">1 oz ≈ 35 µm · 2 oz ≈ 70 µm</text>
  <rect x="30" y="248" width="280" height="80" rx="8" class="ps"/>
  <text x="44" y="274" class="b">IPC-2221</text>
  <text x="44" y="298" class="sm">I = k × ΔT^0,44 × A^0,725</text>
  <text x="44" y="318" class="sm">w = A ÷ t · dış k = 0,048 · iç k = 0,024</text>
  <text x="520" y="64" class="b mid">1 oz, dış katman, ΔT = 10 °C</text>
  <line x1="380" y1="330" x2="700" y2="330" class="st" fill="none"/>
  <g class="mid">
    <rect x="400" y="303" width="50" height="27" class="oks"/><text x="425" y="296" class="sm b">0,30</text><text x="425" y="350" class="sm">1 A</text>
    <rect x="475" y="260" width="50" height="70" class="oks"/><text x="500" y="253" class="sm b">0,78</text><text x="500" y="350" class="sm">2 A</text>
    <rect x="550" y="207" width="50" height="123" class="ps"/><text x="575" y="200" class="sm b">1,37</text><text x="575" y="350" class="sm">3 A</text>
    <rect x="625" y="82" width="50" height="248" class="p"/><text x="650" y="102" class="sm b sf">2,77</text><text x="650" y="350" class="sm">5 A</text>
  </g>
  <text x="540" y="380" class="sm mid mu">Gereken en düşük genişlik (mm)</text>
  <rect x="30" y="346" width="280" height="56" rx="8" class="sf sb"/>
  <text x="44" y="370" class="sm b">Aynı 2 A iç katmanda: 2,03 mm</text>
  <text x="44" y="390" class="sm">ΔT = 20 °C seçilirse dış katmanda: 0,51 mm</text>
</svg>`
  },
  sections: [
    {
      h: "PCB yol genişliği neye göre seçilir?",
      p: [
        "Baskılı devre kartındaki (PCB) bakır yollar, kablo gibi akım taşır ve kablo gibi bir direnç gösterir. Akım geçtikçe bu direnç ısı üretir. Yol çok inceyse ısınma artar; aşırı durumda bakır kabarabilir, kart malzemesi kararabilir ya da yol tamamen kopabilir. Yol genişliği seçiminin temel amacı, yolun beklenen akımda kabul edilebilir bir sıcaklıkta kalmasını sağlamaktır.",
        "Bu hesaba dört etken girer: <strong>akım</strong> (sürekli akan ortalama değer, kısa tepe değil), <strong>bakır kalınlığı</strong> (folyo ağırlığı), <strong>izin verilen sıcaklık artışı</strong> (ortam sıcaklığının üstüne kaç derece çıkılmasına razı olunduğu) ve yolun <strong>dış ya da iç katmanda</strong> olması. Bunlara ek olarak uzun yollarda gerilim düşümü, yüksek gerilimli devrelerde yollar arası açıklık ve üretim yapacak firmanın en düşük yol genişliği kuralı da hesaba katılır.",
        "Sinyal yolları çok az akım taşıdığı için genellikle üreticinin izin verdiği en ince genişlikte çizilir. Hesap asıl olarak besleme, motor, ısıtıcı, LED şeridi ve şarj devresi gibi <strong>güç yolları</strong> için önemlidir."
      ]
    },
    {
      h: "1 oz bakır kaç mikron kalınlıktadır?",
      p: [
        "PCB endüstrisinde bakır kalınlığı geleneksel olarak ağırlıkla ifade edilir: 1 ons bakırın 1 fit karelik alana yayılmasıyla oluşan kalınlık \"1 oz\" diye anılır. Bu kalınlık yaklaşık <strong>35 mikrometre</strong> (34,8 µm) ya da 1,378 mil'dir. Kalınlık ağırlıkla doğru orantılı arttığı için 2 oz yaklaşık 70 µm, 0,5 oz yaklaşık 17,5 µm'dir."
      ],
      table: {
        head: ["Bakır ağırlığı", "Kalınlık (µm)", "Kalınlık (mil)", "Tipik kullanım"],
        rows: [
          ["0,5 oz", "≈ 17,5", "0,69", "İnce sinyal katmanları, iç katmanlar"],
          ["1 oz", "≈ 35", "1,38", "Genel amaçlı kartların çoğu"],
          ["2 oz", "≈ 70", "2,76", "Güç kartları, motor sürücüler"],
          ["3 oz", "≈ 105", "4,13", "Yüksek akımlı güç elektroniği"]
        ],
        caption: "Gerçek kalınlık kaplama ve aşındırma süreci nedeniyle üreticiye göre birkaç mikron farklı olabilir."
      },
      after: [
        "Kalın bakır, aynı akımı daha dar bir yolla taşımayı sağlar ama maliyeti artırır ve ince aralıklı bileşenlerin yerleşimini zorlaştırır. Bu yüzden çoğu tasarımda 1 oz bakırla başlanır, yalnızca güç bölgeleri genişletilir."
      ]
    },
    {
      h: "IPC-2221 formülü nedir?",
      p: [
        "IPC-2221, baskılı devre tasarımı için genel kuralları içeren bir standarttır ve akım taşıma kapasitesi için deneysel verilere dayanan bir eğri uydurma bağıntısı verir. Bağıntı, yolun bakır kesit alanı ile taşıyabileceği akım arasındaki ilişkiyi kurar:"
      ],
      formula: "I = k × ΔT^0,44 × A^0,725\nA = ( I ÷ (k × ΔT^0,44) )^(1 ÷ 0,725)   [mil²]\nGenişlik (mil) = A ÷ (1,378 × oz) · Genişlik (mm) = mil × 0,0254",
      ul: [
        "<strong>I:</strong> sürekli akım, amper.",
        "<strong>ΔT:</strong> ortam sıcaklığının üstündeki izin verilen artış, °C (genellikle 10 ya da 20 °C seçilir).",
        "<strong>A:</strong> bakır kesit alanı, mil kare (genişlik × kalınlık).",
        "<strong>k:</strong> dış katman 0,048, iç katman 0,024."
      ],
      after: [
        "Bağıntı, kabaca 35 A'e kadar akım, 10–100 °C artış ve 0,5–3 oz bakır aralığında geçerli kabul edilir. Daha yeni IPC-2152 standardı, kart kalınlığı, bakır düzlemlere yakınlık ve malzeme özelliklerini de hesaba katan daha ayrıntılı eğriler sunar; çoğu durumda IPC-2221'in dış katman sonucu biraz ihtiyatlı, iç katman sonucu ise oldukça tutucu çıkar. Kritik tasarımlarda bu standarda ve termal analize başvurulur."
      ]
    },
    {
      h: "2 amper için kaç mm yol gerekir? Çözümlü örnek",
      p: [
        "1 oz bakırlı, dış katmandaki bir yol için 2 A sürekli akım ve 10 °C izin verilen sıcaklık artışıyla hesap yapalım."
      ],
      ol: [
        "ΔT^0,44 değerini bulun: 10^0,44 ≈ 2,754.",
        "Payda: k × ΔT^0,44 = 0,048 × 2,754 ≈ 0,1322.",
        "I bölü payda: 2 ÷ 0,1322 ≈ 15,13.",
        "Kesit alanı: 15,13^(1/0,725) = 15,13^1,379 ≈ 42,4 mil².",
        "Genişlik: 42,4 ÷ 1,378 ≈ 30,8 mil.",
        "Milimetreye çevirin: 30,8 × 0,0254 ≈ <strong>0,78 mm</strong>."
      ],
      after: [
        "Pratikte bu yolu 0,8 mm ya da yer varsa 1 mm çizmek mantıklıdır; hesap bir alt sınır verir. Aynı yol 50 mm uzunluktaysa 20 °C'de direnci yaklaşık 31,5 mΩ olur. 2 A akımda yol üzerinde yaklaşık 63 mV gerilim düşer ve yaklaşık 126 mW ısı açığa çıkar. Bu değerler, düşük gerilimli (örneğin 3,3 V) devrelerde gerilim düşümünün de ayrıca dikkate alınması gerektiğini gösterir. Direnç ve güç hesabının temeli için [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Akım, katman ve sıcaklık artışına göre karşılaştırma",
      table: {
        head: ["Akım", "Bakır", "Katman", "ΔT", "En düşük genişlik"],
        rows: [
          ["0,5 A", "1 oz", "Dış", "10 °C", "≈ 0,12 mm"],
          ["1 A", "1 oz", "Dış", "10 °C", "≈ 0,30 mm"],
          ["2 A", "1 oz", "Dış", "10 °C", "≈ 0,78 mm"],
          ["2 A", "1 oz", "Dış", "20 °C", "≈ 0,51 mm"],
          ["2 A", "2 oz", "Dış", "10 °C", "≈ 0,39 mm"],
          ["2 A", "1 oz", "İç", "10 °C", "≈ 2,03 mm"],
          ["3 A", "1 oz", "Dış", "10 °C", "≈ 1,37 mm"],
          ["5 A", "1 oz", "Dış", "10 °C", "≈ 2,77 mm"]
        ],
        caption: "Değerler IPC-2221 bağıntısıyla hesaplanmış örneklerdir ve alt sınırdır; tasarım standardınızı ve üretici kurallarını esas alın."
      },
      after: [
        "Tablodaki iki ilişki dikkat çekicidir. Birincisi, akım iki katına çıktığında genişlik iki kattan fazla artar (1 A için 0,30 mm, 2 A için 0,78 mm), çünkü üs 0,725'tir. İkincisi, bakır kalınlığını iki katına çıkarmak gereken genişliği tam yarıya indirir; çünkü kesit alanı aynı kalır."
      ]
    },
    {
      h: "İç ve dış katman yolları neden farklı hesaplanır?",
      p: [
        "Dış katmandaki yol, ısısını doğrudan havaya iletim ve ışınımla verebilir. İç katmandaki yol ise her iki yüzünden de cam elyaf takviyeli epoksi (FR-4) gibi ısıyı iyi iletmeyen bir malzemeyle sarılıdır. Isı daha yavaş uzaklaştığı için aynı akımda iç yol daha fazla ısınır.",
        "IPC-2221 bu farkı katsayıyı yarıya indirerek yansıtır: iç katman için k = 0,024. Sonuç olarak aynı akım ve sıcaklık artışında iç yol, dış yolun yaklaşık 2,6 katı genişlik gerektirir. Daha yeni IPC-2152 verileri bu farkın gerçekte daha küçük olabileceğini gösterse de, ayrıntılı termal analiz yapmıyorsanız IPC-2221'in tutucu değeriyle çalışmak güvenli taraftır."
      ]
    },
    {
      h: "Sıcaklık artışı hesaba nasıl katılır?",
      p: [
        "ΔT, yolun ortam sıcaklığının kaç derece üstüne çıkmasına izin verdiğinizdir; yolun mutlak sıcaklığı değildir. 40 °C'lik bir kutu içinde çalışan kartta 20 °C artış seçerseniz yol yaklaşık 60 °C'ye ulaşır. Yakındaki bileşenlerin, özellikle elektrolitik kondansatörlerin ve plastik konnektörlerin sıcaklık sınırları bu seçimi kısıtlar.",
        "Genel uygulamada hassas ya da kapalı kutudaki kartlar için 10 °C, havalandırması iyi güç kartları için 20 °C artış seçilir. Daha yüksek artış daha dar yol demektir ama kart ömrünü ve yakın bileşenlerin güvenilirliğini azaltabilir. Kısa süreli tepe akımlar (motor kalkışı gibi) için ortalama akım esas alınır; ancak çok kısa sürede çok yüksek akım geçen yollar sigorta gibi davranabileceği için ayrıca değerlendirilmelidir."
      ]
    },
    {
      h: "Yol genişliği ile kablo kesiti arasında benzerlik",
      p: [
        "Mantık aynıdır: her ikisinde de iletkenin kesit alanı direnci, direnç de ısınmayı ve gerilim düşümünü belirler. Bakırın özdirenci (yaklaşık 1,72 × 10<sup>-8</sup> Ω·m) her iki hesapta da aynıdır. Fark, soğumanın biçimindedir: kablo yalıtkan kılıf içinde yuvarlak bir iletkendir, PCB yolu ise bir yüzü kart malzemesine yapışık, çok ince ve geniş bir şerittir. Bu geometri PCB yolunun ısıyı yüzeyden daha kolay atmasını sağlar.",
        "Kablo seçiminin mantığı için [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısına, akım ve güç ilişkisi için [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazısına bakabilirsiniz. Şebeke gerilimindeki tesisat kabloları ise ayrı yönetmelik ve standartlara tabidir; PCB hesabıyla seçilmez."
      ]
    },
    {
      h: "Güç yollarında hangi tasarım önlemleri alınır?",
      ul: [
        "<strong>Yer varsa genişletin:</strong> Hesaplanan değer alt sınırdır; güç yollarını mümkün olduğunca geniş çizin.",
        "<strong>Bakır döküm (polygon) kullanın:</strong> Yüksek akımlı bölgelerde yol yerine geniş bakır alanlar ısıyı daha iyi dağıtır.",
        "<strong>Paralel yol ve katman:</strong> Aynı akımı iki katmandaki paralel yollara bölüp aralarını çok sayıda viyayla bağlamak kesiti artırır.",
        "<strong>Viyaları da hesaplayın:</strong> Tek bir küçük viya, geniş bir yolun darboğazı olabilir; güç geçişlerinde birden çok viya kullanın.",
        "<strong>Darboğazlara dikkat:</strong> Konnektör ve bileşen ayağına girerken yolun incelmesi en sıcak noktayı oluşturur.",
        "<strong>Gerilim düşümünü kontrol edin:</strong> Uzun ve düşük gerilimli besleme yollarında sıcaklık uygun olsa bile gerilim düşümü fazla olabilir.",
        "<strong>Üretici kurallarına uyun:</strong> En düşük yol genişliği, aralık ve bakır kalınlığı seçenekleri üreticiye göre değişir."
      ]
    },
    {
      h: "Hesap aracı nasıl kullanılır?",
      p: [
        "[[arac:pcb-yol-genisligi-hesapla|PCB Yol Genişliği Hesaplama aracına]] akımı, bakır kalınlığını, izin verilen sıcaklık artışını ve katmanı girin. Araç IPC-2221 bağıntısıyla en düşük genişliği mm ve mil olarak verir; yol uzunluğunu da yazarsanız yol direncini, gerilim düşümünü ve harcanan gücü hesaplar. Gerilim, akım ve direnç arasındaki dönüşümler için [[arac:ohm-kanunu-hesapla|Ohm Kanunu Hesaplama]] aracını kullanabilirsiniz.",
        "Sonuçları bir tasarım başlangıcı olarak görün. Ticari ürünlerde, güvenlik gerektiren uygulamalarda ve şebeke gerilimiyle çalışan devrelerde ilgili standartları, termal analizi ve deneyimli bir elektronik mühendisinin incelemesini esas alın."
      ]
    }
  ],
  faq: [
    ["PCB yol genişliği neye göre seçilir?", "Yoldan geçecek sürekli akıma, bakır kalınlığına, izin verilen sıcaklık artışına ve yolun dış ya da iç katmanda olmasına göre seçilir. Uzun yollarda gerilim düşümü ve üreticinin en düşük genişlik kuralı da kontrol edilir."],
    ["1 oz bakır kaç mikron kalınlıktadır?", "1 oz bakır yaklaşık 35 mikrometre, yani 1,378 mil kalınlığındadır. Kalınlık ağırlıkla orantılıdır: 2 oz yaklaşık 70 µm, 0,5 oz yaklaşık 17,5 µm'dir; gerçek değer üretim sürecine göre biraz değişebilir."],
    ["2 amper için kaç mm yol gerekir?", "IPC-2221'e göre 1 oz bakırlı dış katmanda 10 °C artış için yaklaşık 0,78 mm, 20 °C artış için yaklaşık 0,51 mm gerekir. İç katmanda aynı akım için yaklaşık 2,03 mm hesaplanır; bunlar alt sınırdır."],
    ["İç ve dış katman yolları neden farklı hesaplanır?", "Dış katman ısısını havaya verebilir, iç katman ise ısıyı iyi iletmeyen kart malzemesiyle sarılıdır. IPC-2221 bu farkı iç katman katsayısını yarıya indirerek yansıtır; iç yol yaklaşık 2,6 kat daha geniş çıkar."],
    ["Sıcaklık artışı hesaba nasıl katılır?", "ΔT, yolun ortam sıcaklığının üstüne çıkmasına izin verilen derece farkıdır. Formülde ΔT'nin 0,44 kuvveti kullanılır; izin verilen artış büyüdükçe gereken genişlik azalır ama kart ve bileşenler daha sıcak çalışır."],
    ["IPC-2221 formülü nedir?", "I = k × ΔT^0,44 × A^0,725 bağıntısıdır. I amper, ΔT santigrat derece, A mil kare cinsinden kesit alanıdır; k dış katman için 0,048, iç katman için 0,024 alınır. Genişlik, kesitin bakır kalınlığına bölünmesiyle bulunur."],
    ["Yol genişliği ile kablo kesiti arasında benzerlik var mı?", "Evet, ikisinde de kesit alanı direnci, direnç de ısınma ve gerilim düşümünü belirler ve bakırın özdirenci aynıdır. Fark soğuma biçimindedir; ince ve geniş PCB yolu ısıyı yüzeyden daha kolay atar."],
    ["Güç yollarında hangi tasarım önlemleri alınır?", "Yollar hesaplanandan geniş çizilir, bakır döküm ve paralel katmanlar kullanılır, geçişlerde birden çok viya konur ve konnektör girişlerindeki darboğazlar önlenir. Gerilim düşümü ve üretici kuralları da kontrol edilir."],
    ["IPC-2152 ile IPC-2221 farkı nedir?", "IPC-2152 daha yeni ve ayrıntılı bir standarttır; kart kalınlığı, bakır düzlemlere yakınlık ve malzeme özelliklerini de hesaba katar. IPC-2221'in basit bağıntısı özellikle iç katmanlarda daha tutucu sonuç verir."]
  ],
  tools: ["pcb-yol-genisligi-hesapla", "kablo-kesiti-hesapla", "ohm-kanunu-hesapla"],
  related: ["kablo-kesiti-nasil-secilir", "ohm-kanunu-nedir", "watt-amper-volt-iliskisi"],
  sources: [
    ["IPC – IPC-2221 ve IPC-2152 tasarım standartları", "https://www.ipc.org/"]
  ],
  uyari: "hesaplanan değerler örnek ve alt sınırdır; tasarımınızda geçerli standardı, üretici kurallarını ve uzman mühendis incelemesini esas alın, şebeke gerilimli devrelerde yetkili uzmana danışın"
};
