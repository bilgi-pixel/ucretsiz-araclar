export default {
  slug: "kva-kw-farki-jenerator-secimi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "kVA ile kW Farkı Nedir? Jeneratör Kaç kVA Olmalı, Güç Faktörü",
  pageTitle: "kVA kW Farkı: Güç Faktörü ve Jeneratör Kaç kVA Olmalı?",
  description: "kW = kVA × güç faktörü (cos φ). Jeneratörler cos φ 0,8 ile etiketlenir: 10 kVA jeneratör 8 kW aktif güç verir. Ev için jeneratör hesabı, kalkış akımı ve UPS VA farkı.",
  keywords: ["kva kw farkı", "kva kw çevirme", "jeneratör kaç kva olmalı", "güç faktörü nedir", "ev için jeneratör hesaplama", "cos phi nedir", "ups va watt farkı", "kalkış akımı"],
  lead: "kVA (kilovolt-amper) bir cihazın ya da kaynağın <strong>toplam görünür gücünü</strong>, kW (kilovat) ise bunun <strong>işe dönüşen aktif kısmını</strong> gösterir; ikisi arasındaki köprü güç faktörüdür: kW = kVA × cos φ. Jeneratörler genellikle 0,8 güç faktörüyle etiketlendiği için 10 kVA'lık bir jeneratör en fazla 8 kW aktif güç verir. Bu sayfada güç üçgenini, kVA-kW çevirmeyi, motorlu cihazların kalkış akımını hesaba katarak ev ve işyeri için jeneratör seçimini, monofaze-trifaze farkını ve UPS etiketindeki VA değerini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "kW = kVA × cos φ; kVA = kW ÷ cos φ. Güç faktörü 1'e ne kadar yakınsa iki değer o kadar birbirine yaklaşır.",
    "Reaktif güç: kVAR = √(kVA² − kW²); 10 kVA ve 8 kW için 6 kVAR'dır.",
    "Jeneratör ve trafo etiketleri genellikle cos φ = 0,8 kabulüyle verilir: 5 kVA ≈ 4 kW, 20 kVA ≈ 16 kW.",
    "Motorlu cihazlar (buzdolabı, pompa, klima) kalkışta çalışma gücünün birkaç katını çeker; jeneratör bu tepeyi karşılamalıdır.",
    "Trifaze güç: P = √3 × hat gerilimi × akım × cos φ; 400 V, 20 A ve 0,85 için yaklaşık 11,8 kW.",
    "UPS etiketindeki VA değeri görünür güçtür; bağlanabilecek yük için etiketteki watt değerine bakılır."
  ],
  figure: {
    alt: "Güç üçgeni: yatay kenar aktif güç 8 kW, dikey kenar reaktif güç 6 kVAR, hipotenüs görünür güç 10 kVA; aradaki açı φ ve cos φ = 0,8. Sağda ev jeneratörü örneği: sürekli yük 1.550 W, kalkış tepesi 3.050 W, gereken en az 3,8 kVA.",
    caption: "Görünür güç (kVA) üçgenin hipotenüsüdür; aktif güç (kW) bunun cos φ katıdır. Sağdaki örnekte jeneratörü belirleyen, cihazların toplam gücü değil su pompasının kalkış anındaki tepe yüktür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Güç üçgeni ve jeneratör seçimi</text>
  <polygon points="40,330 320,330 320,120" class="ps"/>
  <line x1="40" y1="330" x2="320" y2="330" class="sp sw" fill="none"/>
  <line x1="320" y1="330" x2="320" y2="120" class="sa sw" fill="none"/>
  <line x1="40" y1="330" x2="320" y2="120" class="st sw" fill="none"/>
  <text x="180" y="356" class="b mid p">Aktif güç P = 8 kW</text>
  <text x="330" y="230" class="b">Reaktif</text><text x="330" y="250" class="b">Q = 6 kVAR</text>
  <text x="150" y="208" class="b mid">Görünür güç</text><text x="150" y="228" class="b mid">S = 10 kVA</text>
  <path d="M 100 330 A 60 60 0 0 0 88 294" class="st" fill="none"/>
  <text x="112" y="318" class="b">φ</text>
  <text x="40" y="390" class="sm">cos φ = P ÷ S = 8 ÷ 10 = 0,8</text>
  <line x1="420" y1="56" x2="420" y2="400" class="sb dash" fill="none"/>
  <text x="440" y="70" class="b">Ev jeneratörü örneği</text>
  <text x="440" y="100" class="sm">Toplam çalışma gücü</text>
  <rect x="440" y="108" width="114" height="26" rx="4" class="oks"/><text x="562" y="126" class="sm b">1.550 W</text>
  <text x="440" y="160" class="sm">Pompa kalkarken tepe (×3)</text>
  <rect x="440" y="168" width="226" height="26" rx="4" class="dgs"/><text x="560" y="186" class="sm b mid">3.050 W</text>
  <text x="440" y="220" class="sm">Sürekli yük + %20 pay</text>
  <rect x="440" y="228" width="137" height="26" rx="4" class="sf sb"/><text x="585" y="246" class="sm b">1.860 W</text>
  <rect x="440" y="282" width="260" height="98" rx="10" class="p"/>
  <text x="570" y="312" class="b mid sf">Belirleyici: 3.050 W</text>
  <text x="570" y="338" class="mid sf">3.050 ÷ 0,8 = 3,8 kVA</text>
  <text x="570" y="362" class="sm mid sf">bir üst standart güce yuvarlanır</text>
</svg>`
  },
  sections: [
    {
      h: "kVA ile kW arasındaki fark nedir?",
      p: [
        "Doğru akımda güç basittir: gerilim ile akımın çarpımı (W = V × A) doğrudan harcanan gücü verir. Alternatif akımda ise gerilim ve akım her an yön değiştirir ve bazı yüklerde ikisi aynı anda tepe yapmaz. Motor, trafo, floresan balast ve bazı elektronik güç kaynakları akımı gerilimin biraz gerisinden çeker. Bu kayma yüzünden hatta dolaşan akımın tamamı işe dönüşmez.",
        "<strong>Görünür güç (S, kVA)</strong> gerilim ile akımın doğrudan çarpımıdır ve kabloların, sigortaların, jeneratör sargılarının taşımak zorunda olduğu toplam yükü gösterir. <strong>Aktif güç (P, kW)</strong> bunun ısıya, harekete ya da ışığa dönüşen kısmıdır; elektrik sayacının ölçtüğü ve faturada gördüğünüz kWh bu güçten gelir. Aradaki fark <strong>reaktif güç (Q, kVAR)</strong> olarak adlandırılır; motorun manyetik alanını kurmak için kaynak ile yük arasında gidip gelir ama net iş yapmaz.",
        "Bu yüzden bir jeneratörün ya da trafonun kapasitesi kVA ile verilir: sargılarını ısıtan, toplam akımdır. Cihazların ne kadar iş yaptığı ve enerji tükettiği ise kW ile ifade edilir."
      ]
    },
    {
      h: "Güç faktörü (cos φ) nedir?",
      p: [
        "Güç faktörü, aktif gücün görünür güce oranıdır ve 0 ile 1 arasında bir sayıdır. Gerilim ile akım arasındaki faz açısına φ (fi) denir; sinüs biçimli akımda güç faktörü bu açının kosinüsüne eşittir, adı da buradan gelir. Isıtıcı, su ısıtıcısı ve akkor ampul gibi saf dirençli yüklerde akım gerilimle aynı anda tepe yapar ve cos φ = 1'dir; kVA ile kW birbirine eşit olur."
      ],
      table: {
        head: ["Yük türü", "Tipik güç faktörü (yaklaşık)", "Not"],
        rows: [
          ["Elektrikli ısıtıcı, kettle, ütü", "1,0", "Saf dirençli yük"],
          ["Tam yükte asenkron motor", "0,8–0,9", "Yük azaldıkça düşer"],
          ["Düşük yükte çalışan motor", "0,3–0,6", "Boşta çalışan motor en kötüsüdür"],
          ["Kompansasyonsuz floresan armatür", "0,5 civarı", "Eski tip balastlarda"],
          ["Güç faktörü düzeltmeli bilgisayar kaynağı", "0,9 ve üzeri", "Etiketinde PFC yazan modeller"]
        ],
        caption: "Değerler yük ve üreticiye göre değişen yaklaşık aralıklardır; kesin değer cihaz etiketinde ya da kataloğunda yazar."
      },
      after: [
        "Düşük güç faktörü, aynı işi yapmak için hattan daha fazla akım çekmek demektir; kablolar ısınır, kayıplar artar. Bu yüzden sanayi tesislerinde kondansatörlerle kompanzasyon yapılır ve belirli güçteki abonelerde reaktif enerji tüketimi mevzuattaki oranları aşarsa ayrıca bedel uygulanır. Hedef güç faktörü için gereken kondansatör gücünü [[arac:guc-faktoru-hesapla|Güç Faktörü Hesaplama aracı]] verir."
      ]
    },
    {
      h: "kVA kW'a nasıl çevrilir? Formüller ve örnekler",
      formula: "kW = kVA × cos φ\nkVA = kW ÷ cos φ\nkVAR = √(kVA² − kW²)\nTek faz: S (VA) = V × I   ·   Üç faz: S (VA) = √3 × V(hat) × I",
      table: {
        head: ["Etiket (kVA)", "cos φ = 0,8 ile kW", "cos φ = 1 ile kW", "Reaktif güç (0,8'de)"],
        rows: [
          ["3,5 kVA", "2,8 kW", "3,5 kW", "2,1 kVAR"],
          ["5 kVA", "4 kW", "5 kW", "3 kVAR"],
          ["10 kVA", "8 kW", "10 kW", "6 kVAR"],
          ["20 kVA", "16 kW", "20 kW", "12 kVAR"],
          ["100 kVA", "80 kW", "100 kW", "60 kVAR"]
        ]
      },
      after: [
        "Ters yönde, 12 kW'lık bir yükü cos φ 0,85 ile besleyecekseniz gereken görünür güç 12 ÷ 0,85 = 14,1 kVA olur. Güç faktörünü bilmiyorsanız ve yükte motor varsa 0,8 kabul etmek temkinli bir başlangıçtır. Hızlı dönüşüm için [[arac:kva-kw-cevir|kVA kW Çevirici]] reaktif gücü ve faz açısını da gösterir."
      ]
    },
    {
      h: "Motorlu cihazların kalkış akımı neden önemlidir?",
      p: [
        "Bir elektrik motoru dururken sargılarının direnci çok düşüktür ve dönmeye başlayana kadar karşı gerilim oluşmaz. Bu yüzden motorlar ilk anda, çalışma akımlarının birkaç katı akım çeker. Doğrudan yol verilen küçük asenkron motorlarda kalkış akımı çalışma akımının 5–7 katına çıkabilir; bu akım kısa sürse de jeneratörün geriliminin çökmesine, motorun kalkamamasına ya da jeneratörün korumaya geçmesine yol açar.",
        "Evde buzdolabı ve derin dondurucu kompresörü, hidrofor ve dalgıç pompa, klima, çamaşır makinesi motoru ve matkap, taşlama gibi el aletleri kalkış akımı yüksek cihazlardır. Jeneratör hesabında bu cihazların hepsinin aynı anda kalkmayacağı varsayılır; en büyük motorlu cihazın kalkış anı, diğerlerinin çalışma gücüyle birlikte hesaplanır. İnverter teknolojili klimalar ve yumuşak yolvericili pompalar kalkışta çok daha az akım çeker."
      ]
    },
    {
      h: "Ev için kaç kVA jeneratör gerekir? Çözümlü hesap",
      p: [
        "Elektrik kesintisinde buzdolabı, kombi, aydınlatma, televizyon-modem ve hidrofor pompasını çalıştırmak isteyen bir ev için hesap yapalım. Cihaz güçleri etiketlerden alınan örnek değerlerdir."
      ],
      ol: [
        "Cihazların çalışma güçlerini toplayın: buzdolabı 150 W, kombi 150 W, aydınlatma 300 W, televizyon ve modem 200 W, hidrofor pompası 750 W → toplam 1.550 W.",
        "En büyük motorlu cihazı belirleyin: 750 W'lık pompa. Kalkış katsayısını 3 kabul edin; kalkışta pompa 2.250 W çeker.",
        "Kalkış anındaki tepe yükü bulun: 1.550 + 750 × (3 − 1) = 3.050 W.",
        "Sürekli yüke yedek pay ekleyin: 1.550 × 1,20 = 1.860 W. İkisinden büyük olan, yani 3.050 W belirleyicidir.",
        "Güç faktörüne bölün: 3.050 ÷ 0,8 = 3,81 kVA. Jeneratör en az bu değerde olmalı ve piyasadaki bir üst standart güce yuvarlanmalıdır."
      ],
      after: [
        "Kendi cihaz listenizle aynı hesabı [[arac:jenerator-gucu-hesapla|Jeneratör Gücü Hesaplama aracı]] yapar; kalkış katsayısını, güç faktörünü ve yedek payı değiştirebilirsiniz. Klima ya da elektrikli ısıtıcı eklemek istediğinizde ihtiyacın hızla büyüdüğünü göreceksiniz; 2.000 W'lık bir elektrikli ısıtıcı tek başına sürekli yükü iki katından fazlasına çıkarır."
      ],
      note: "Jeneratörü evin elektrik tesisatına bağlamak, şebeke ile jeneratörün aynı anda devreye girmesini önleyen bir aktarma (komütasyon) düzeni gerektirir. Bu bağlantı yetkili bir elektrikçi tarafından yapılmalıdır; aksi hâlde şebeke hattında çalışan görevliler için de hayati tehlike oluşur."
    },
    {
      h: "Jeneratör yüzde kaç yükte çalıştırılmalı?",
      p: [
        "Jeneratörün etiket gücü genellikle sürekli çalışabileceği en yüksek gücü ya da kısa süreli bekleme gücünü gösterir; hangisi olduğunu kataloğundan kontrol edin. Uzun süreli çalışmada yükün etiket gücünün yaklaşık %70–80'i civarında tutulması, motorun aşırı ısınmasını ve gerilim dalgalanmalarını önler ve ani bir kalkış için yer bırakır.",
        "Tersine, dizel jeneratörlerin çok düşük yükte (kabaca %30'un altında) uzun süre çalıştırılması da önerilmez; yanma verimsizleşir, egzozda yakıt ve is birikebilir. Bu yüzden \"büyük olsun, zararı olmaz\" yaklaşımı da doğru değildir: ihtiyacın birkaç katı büyüklükte bir jeneratör hem pahalıdır hem de çoğu zaman verimsiz bölgede çalışır."
      ]
    },
    {
      h: "Monofaze ve trifaze jeneratör farkı nedir?",
      p: [
        "Konutlarda elektrik genellikle tek faz (monofaze), 230 V olarak gelir ve ev tipi jeneratörlerin çoğu da monofazedir. Trifaze (üç fazlı) sistemlerde fazlar arası gerilim 400 V'tur; atölye, şantiye, apartman ortak alanları ve sanayi tesislerinde kullanılır. Üç fazlı motorlar, aynı güçteki tek fazlı motorlara göre daha düzgün çalışır ve daha düşük akım çeker."
      ],
      formula: "Trifaze aktif güç: P = √3 × U(hat) × I × cos φ\nÖrnek: 1,732 × 400 V × 20 A × 0,85 ≈ 11.778 W ≈ 11,8 kW\nAynı akımla görünür güç: 1,732 × 400 × 20 ≈ 13,9 kVA",
      after: [
        "Trifaze bir jeneratörden tek fazlı cihazlar beslenecekse yükler üç faza mümkün olduğunca eşit dağıtılmalıdır. Her fazın taşıyabileceği güç toplamın yaklaşık üçte biridir; 15 kVA'lık trifaze jeneratörün tek bir fazına 10 kVA'lık tek fazlı yük bağlamak o fazı aşırı yükler. Hat akımından güç ya da güçten hat akımı hesaplamak için [[arac:uc-faz-guc-hesapla|Üç Faz Güç Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "UPS etiketindeki VA ne demek?",
      p: [
        "Kesintisiz güç kaynakları (UPS) da kapasitelerini VA ile, ayrıca çoğu zaman watt ile verir. Örneğin \"1000 VA / 600 W\" yazan bir UPS, görünür güç olarak 1.000 VA'ya kadar yükü taşıyabilir ama bağlanan cihazların toplam aktif gücü 600 W'ı geçmemelidir. Bu modelde güç faktörü 0,6 kabul edilmiştir; daha yeni modellerde bu oran 0,8–0,9'a çıkar.",
        "UPS seçerken bağlayacağınız bilgisayar, monitör ve modemin watt değerlerini toplayıp sonucun UPS'in watt değerinin yaklaşık %70–80'ini aşmamasına dikkat edin. UPS'in kesintide ne kadar dayanacağı ise ayrı bir konudur ve akü kapasitesine (Ah) bağlıdır; yüksek VA değeri uzun süre dayanacağı anlamına gelmez. Benzer bir enerji hesabı için [[bilgi:powerbank-kac-kez-sarj-eder|powerbank kaç kez şarj eder]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "kVA-kW hesabında sık yapılan hatalar",
      ul: [
        "<strong>kVA'yı kW sanmak:</strong> 10 kVA jeneratörü 10 kW'lık yükle çalıştırmaya kalkmak, cos φ 0,8'de onu %25 aşırı yüklemek demektir.",
        "<strong>Kalkış akımını hesaba katmamak:</strong> Toplam gücü yeten bir jeneratör, pompa ya da kompresör kalkarken durabilir.",
        "<strong>Bütün cihazların aynı anda kalkacağını varsaymak:</strong> Bu, gereğinden çok büyük ve verimsiz çalışan bir jeneratöre yol açar; en büyük motorun kalkışı esas alınır.",
        "<strong>Trifaze jeneratörde tek faza yüklenmek:</strong> Fazlar dengesiz kalırsa toplam güç yetse bile tek faz aşırı yüklenir.",
        "<strong>UPS'te yalnızca VA'ya bakmak:</strong> Asıl sınır watt değeridir; etiketteki iki değeri birlikte okuyun."
      ],
      after: [
        "Direnç, akım ve gerilim gibi temel elektrik büyüklüklerinin birbirine nasıl bağlandığını tazelemek isterseniz [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısındaki Ohm kanunu bölümüne göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["kVA ile kW arasındaki fark nedir?", "kVA hattan çekilen toplam görünür gücü, kW ise bunun işe dönüşen aktif kısmını gösterir. İkisi arasındaki oran güç faktörüdür; dirençli yüklerde eşittir, motorlu yüklerde kW değeri kVA'dan düşüktür."],
    ["kVA kW'a nasıl çevrilir?", "kVA değeri güç faktörüyle (cos φ) çarpılır: kW = kVA × cos φ. Jeneratörlerde genellikle 0,8 kabul edilir; bu durumda 10 kVA 8 kW, 5 kVA ise 4 kW aktif güç eder."],
    ["Ev için kaç kVA jeneratör gerekir?", "Cihazların çalışma güçlerini toplayın, en büyük motorlu cihazın kalkış fazlasını ekleyin ve sonucu 0,8'e bölün. Buzdolabı, kombi, aydınlatma, televizyon ve 750 W pompalı bir ev için en az yaklaşık 3,8 kVA çıkar."],
    ["Güç faktörü (cos φ) nedir?", "Güç faktörü aktif gücün görünür güce oranıdır ve 0 ile 1 arasında değer alır. Gerilim ile akım arasındaki faz açısının kosinüsüdür; ısıtıcılarda 1'e eşit, motorlarda genellikle 0,8–0,9 civarındadır."],
    ["Motorlu cihazların kalkış akımı neden önemlidir?", "Motorlar dururken düşük dirençli oldukları için ilk anda çalışma akımlarının birkaç katını çeker. Jeneratör bu tepeyi karşılayamazsa gerilim çöker, motor kalkamaz ya da jeneratör korumaya geçer; bu yüzden hesapta ayrıca dikkate alınır."],
    ["Jeneratör yüzde kaç yükte çalıştırılmalı?", "Uzun süreli çalışmada yükün etiket gücünün yaklaşık yüzde 70–80'i civarında tutulması önerilir. Dizel jeneratörlerin çok düşük yükte uzun süre çalıştırılması da verimsiz yanma ve birikinti nedeniyle uygun değildir."],
    ["Monofaze ve trifaze jeneratör farkı nedir?", "Monofaze jeneratör 230 V tek faz verir ve evler için yaygındır. Trifaze jeneratör fazlar arası 400 V verir, üç fazlı motorlar için gerekir; tek fazlı yükler bağlanacaksa üç faza dengeli dağıtılmalıdır."],
    ["UPS etiketindeki VA ne demek?", "VA, UPS'in taşıyabileceği görünür güçtür. Bağlanan cihazların toplam aktif gücü ise etiketteki watt değerini aşmamalıdır; 1000 VA / 600 W yazan bir UPS en fazla 600 W yük taşır."]
  ],
  tools: ["kva-kw-cevir", "jenerator-gucu-hesapla", "guc-faktoru-hesapla", "uc-faz-guc-hesapla"],
  related: ["direnc-renk-kodlari-nasil-okunur", "elektrik-faturasi-nasil-hesaplanir"],
  sources: [
    ["Enerji Piyasası Düzenleme Kurumu (EPDK)", "https://www.epdk.gov.tr/"],
    ["IEC – Uluslararası Elektroteknik Komisyonu", "https://www.iec.ch/"]
  ]
};
