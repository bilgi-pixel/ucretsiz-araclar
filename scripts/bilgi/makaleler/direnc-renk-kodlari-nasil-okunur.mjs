export default {
  slug: "direnc-renk-kodlari-nasil-okunur",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Direnç Renk Kodları Nasıl Okunur? 4 ve 5 Bantlı Direnç Tablosu",
  pageTitle: "Direnç Renk Kodları Tablosu: 4 ve 5 Bantlı Direnç Okuma",
  description: "4 bantlı dirençte ilk iki bant rakam, üçüncü çarpan, dördüncü toleranstır: kahverengi-siyah-kırmızı-altın = 1 kΩ ±%5. Renk tablosu, 5 bantlı okuma ve SMD kodları.",
  keywords: ["direnç renk kodları", "direnç renk kodu okuma", "4 bantlı direnç", "5 bantlı direnç", "smd direnç kodu", "direnç değeri hesaplama", "direnç renk tablosu", "tolerans bandı"],
  lead: "Direnç renk kodu, altın ya da gümüş tolerans bandı sağda kalacak şekilde <strong>soldan sağa okunur: 4 bantlı dirençte ilk iki bant değerin rakamlarını, üçüncü bant çarpanı, dördüncü bant toleransı</strong> gösterir. Örneğin kahverengi (1), siyah (0), kırmızı (×100) ve altın (±%5) bantları 10 × 100 = 1.000 Ω, yani 1 kΩ ±%5 eder. 5 bantlı hassas dirençlerde rakam bandı üçe çıkar. Bu sayfada standart renk tablosunu, çözümlü örnekleri, okuma yönünü bulmanın yollarını, SMD direnç kodlarını ve ölçümle doğrulamayı bulacaksınız.",
  kisaCevap: [
    "Renk-rakam sırası: siyah 0, kahverengi 1, kırmızı 2, turuncu 3, sarı 4, yeşil 5, mavi 6, mor 7, gri 8, beyaz 9.",
    "4 bantlı direnç: 1. ve 2. bant rakam, 3. bant çarpan (10'un kuvveti), 4. bant tolerans.",
    "5 bantlı direnç: 1., 2. ve 3. bant rakam, 4. bant çarpan, 5. bant tolerans.",
    "Altın çarpan ×0,1 ve tolerans ±%5; gümüş çarpan ×0,01 ve tolerans ±%10; tolerans bandı yoksa ±%20.",
    "Kahverengi-siyah-kırmızı-altın = 1 kΩ ±%5; sarı-mor-turuncu-altın = 47 kΩ ±%5.",
    "SMD dirençte 3 haneli kodun son hanesi sıfır sayısıdır: 103 = 10 × 10³ = 10 kΩ; R ondalık virgülü gösterir: 4R7 = 4,7 Ω."
  ],
  figure: {
    alt: "4 bantlı direnç şeması: kahverengi 1, siyah 0, kırmızı çarpan ×100, altın tolerans ±%5; sonuç 1.000 ohm yani 1 kiloohm, kabul aralığı 950 ile 1050 ohm. Altında 10 rengin rakam karşılıkları.",
    caption: "Tolerans bandı (altın) sağda ve diğerlerinden biraz ayrık durur; okuma onun karşı tarafından başlar. Alt şerit renk-rakam sırasını gösterir: kırmızıdan mora kadar olan bölüm gökkuşağı sırasını izler.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">4 bantlı direnç nasıl okunur?</text>
  <line x1="40" y1="110" x2="170" y2="110" class="st sw" fill="none"/>
  <line x1="550" y1="110" x2="680" y2="110" class="st sw" fill="none"/>
  <rect x="170" y="70" width="380" height="80" rx="34" class="ps"/>
  <rect x="220" y="70" width="26" height="80" class="t2"/>
  <rect x="280" y="70" width="26" height="80" class="t"/>
  <rect x="340" y="70" width="26" height="80" class="dg"/>
  <rect x="470" y="70" width="26" height="80" class="a"/>
  <g class="sm mid">
    <text x="233" y="174" class="b">Kahverengi</text><text x="233" y="192">1. rakam: 1</text>
    <text x="293" y="214" class="b">Siyah</text><text x="293" y="232">2. rakam: 0</text>
    <text x="353" y="174" class="b">Kırmızı</text><text x="353" y="192">çarpan ×100</text>
    <text x="483" y="174" class="b">Altın</text><text x="483" y="192">tolerans ±%5</text>
  </g>
  <line x1="160" y1="56" x2="420" y2="56" class="sp" fill="none"/>
  <polygon points="420,50 432,56 420,62" class="p"/>
  <text x="170" y="50" class="sm p b">okuma yönü</text>
  <rect x="120" y="252" width="480" height="52" rx="10" class="p"/>
  <text x="360" y="284" class="lg b mid sf">10 × 100 = 1.000 Ω = 1 kΩ (950–1.050 Ω)</text>
  <g class="sm mid">
    <rect x="20" y="330" width="62" height="56" rx="4" class="sf sb"/><text x="51" y="352">siyah</text><text x="51" y="374" class="b">0</text>
    <rect x="88" y="330" width="62" height="56" rx="4" class="sf sb"/><text x="119" y="352">kahve</text><text x="119" y="374" class="b">1</text>
    <rect x="156" y="330" width="62" height="56" rx="4" class="dgs"/><text x="187" y="352">kırmızı</text><text x="187" y="374" class="b">2</text>
    <rect x="224" y="330" width="62" height="56" rx="4" class="dgs"/><text x="255" y="352">turuncu</text><text x="255" y="374" class="b">3</text>
    <rect x="292" y="330" width="62" height="56" rx="4" class="dgs"/><text x="323" y="352">sarı</text><text x="323" y="374" class="b">4</text>
    <rect x="360" y="330" width="62" height="56" rx="4" class="oks"/><text x="391" y="352">yeşil</text><text x="391" y="374" class="b">5</text>
    <rect x="428" y="330" width="62" height="56" rx="4" class="oks"/><text x="459" y="352">mavi</text><text x="459" y="374" class="b">6</text>
    <rect x="496" y="330" width="62" height="56" rx="4" class="oks"/><text x="527" y="352">mor</text><text x="527" y="374" class="b">7</text>
    <rect x="564" y="330" width="62" height="56" rx="4" class="sf sb"/><text x="595" y="352">gri</text><text x="595" y="374" class="b">8</text>
    <rect x="632" y="330" width="68" height="56" rx="4" class="sf sb"/><text x="666" y="352">beyaz</text><text x="666" y="374" class="b">9</text>
  </g>
  <text x="360" y="408" class="sm mid t2">Kırmızıdan mora (2–7) gökkuşağı sırası</text>
</svg>`
  },
  sections: [
    {
      h: "Direnç renk kodu neden kullanılır?",
      p: [
        "Bacaklı (delikten geçmeli) dirençlerin gövdesi birkaç milimetre çapında silindirdir. Bu küçük yüzeye okunaklı sayı basmak zordur ve devre kartına takıldıktan sonra yazı hangi yöne bakarsa baksın görünmeyebilir. Gövdeyi çepeçevre saran renkli bantlar ise her açıdan görülür, aşınmaya dayanıklıdır ve küçük boyutta da ayırt edilebilir. Bu yüzden 1920'lerden beri dirençlerin değeri renk bantlarıyla gösterilir.",
        "Renklerin anlamı uluslararası IEC 60062 standardıyla belirlenmiştir ve bütün üreticiler aynı tabloyu kullanır. Tabloyu bir kez öğrendiğinizde meslek lisesi laboratuvarındaki dirençle bir hobi kitinden çıkan direnci aynı şekilde okursunuz."
      ]
    },
    {
      h: "Direnç renk kodları tablosu",
      table: {
        head: ["Renk", "Rakam", "Çarpan", "Tolerans"],
        rows: [
          ["Siyah", "0", "×1", "—"],
          ["Kahverengi", "1", "×10", "±%1"],
          ["Kırmızı", "2", "×100", "±%2"],
          ["Turuncu", "3", "×1.000 (1 k)", "—"],
          ["Sarı", "4", "×10.000 (10 k)", "—"],
          ["Yeşil", "5", "×100.000 (100 k)", "±%0,5"],
          ["Mavi", "6", "×1.000.000 (1 M)", "±%0,25"],
          ["Mor", "7", "×10.000.000 (10 M)", "±%0,1"],
          ["Gri", "8", "×100.000.000", "±%0,05"],
          ["Beyaz", "9", "×1.000.000.000", "—"],
          ["Altın", "—", "×0,1", "±%5"],
          ["Gümüş", "—", "×0,01", "±%10"],
          ["Bant yok", "—", "—", "±%20"]
        ],
        caption: "IEC 60062 standardına göre. Çarpan bandının rengi, rakamların arkasına eklenecek sıfır sayısını gösterir: turuncu üç sıfır demektir."
      },
      after: [
        "Tabloyu ezberlemenin kolay yolu, renk sırasındaki düzeni fark etmektir. Siyah (0) ve kahverengiden (1) sonra gelen kırmızı, turuncu, sarı, yeşil, mavi ve mor (2–7), gökkuşağının renk sırasıdır. Sonda gri (8) ve beyaz (9) gelir; koyudan açığa doğru giden bir düzen olarak hatırlanabilir. Çarpan bandını \"kaç sıfır eklenecek\" diye düşünmek de hesabı hızlandırır: kırmızı iki sıfır, turuncu üç sıfır, sarı dört sıfırdır."
      ]
    },
    {
      h: "4 bantlı direnç nasıl okunur? Çözümlü örnekler",
      p: [
        "4 bantlı dirençler genel amaçlı, genellikle ±%5 toleranslı dirençlerdir. Okuma formülü şöyledir:"
      ],
      formula: "Değer = (1. bant × 10 + 2. bant) × çarpan\nKabul aralığı = değer × (1 ± tolerans)",
      ol: [
        "<strong>Kahverengi, siyah, kırmızı, altın:</strong> 1 ve 0 → 10; kırmızı çarpan ×100 → 1.000 Ω = 1 kΩ; altın ±%5 → 950–1.050 Ω.",
        "<strong>Kırmızı, kırmızı, kahverengi, altın:</strong> 22 × 10 = 220 Ω ±%5 (209–231 Ω). LED devrelerinde en sık görülen değerlerdendir.",
        "<strong>Sarı, mor, turuncu, altın:</strong> 47 × 1.000 = 47.000 Ω = 47 kΩ ±%5.",
        "<strong>Kahverengi, siyah, turuncu, altın:</strong> 10 × 1.000 = 10 kΩ ±%5; mikrodenetleyici devrelerinin vazgeçilmez çekme direncidir.",
        "<strong>Turuncu, beyaz, altın, altın:</strong> 39 × 0,1 = 3,9 Ω ±%5. Üçüncü bandın altın olması değerin 10 Ω'un altında olduğunu gösterir."
      ],
      after: [
        "Renkleri tek tek seçip sonucu aralığıyla görmek ya da tersine, istediğiniz değerin hangi renklerle yazılacağını öğrenmek için [[arac:direnc-renk-kodu-hesapla|Direnç Renk Kodu Hesaplama aracı]] 4, 5 ve 6 bantlı dirençleri destekler."
      ]
    },
    {
      h: "4 bantlı ve 5 bantlı direnç arasındaki fark",
      p: [
        "5 bantlı dirençler genellikle metal film yapıda, ±%1 ya da daha dar toleranslı hassas dirençlerdir. Daha fazla değer basamağına ihtiyaç duydukları için rakam bandı üçe çıkar; çarpan ve tolerans bantları birer sıra kayar."
      ],
      formula: "5 bantlı değer = (1. bant × 100 + 2. bant × 10 + 3. bant) × çarpan",
      table: {
        head: ["Bant dizisi", "Okuma", "Değer"],
        rows: [
          ["Kahverengi, siyah, siyah, kahverengi, kahverengi", "100 × 10, ±%1", "1 kΩ ±%1"],
          ["Turuncu, turuncu, siyah, siyah, kahverengi", "330 × 1, ±%1", "330 Ω ±%1"],
          ["Kırmızı, kırmızı, siyah, kırmızı, kahverengi", "220 × 100, ±%1", "22 kΩ ±%1"],
          ["Kahverengi, siyah, siyah, altın, kahverengi", "100 × 0,1, ±%1", "10 Ω ±%1"]
        ]
      },
      after: [
        "6 bantlı dirençlerde ilk beş bant 5 bantlıyla aynı okunur; altıncı bant sıcaklık katsayısını, yani direnç değerinin sıcaklıkla ne kadar değiştiğini (ppm/°C) gösterir. Hobi devrelerinde bu bant genellikle önemsenmez, ölçüm cihazlarında ve hassas analog devrelerde dikkate alınır."
      ]
    },
    {
      h: "Direnç hangi yönden okunur, tolerans bandı ne anlama gelir?",
      p: [
        "Direncin iki ucu birbirinin aynısı olduğu için okuma yönünü bantların düzeninden anlamak gerekir. En güvenilir ipucu tolerans bandıdır: altın ve gümüş renkler rakam olarak kullanılmadığından, bu renklerden biri bir uçtaysa o uç sağa alınır ve okuma diğer uçtan başlar. Ayrıca tolerans bandı çoğunlukla diğer bantlardan biraz daha geniş bir boşlukla ayrılır ve rakam bantları gövdenin bir ucuna daha yakın durur.",
        "Kahverengi ve kırmızı hem rakam hem tolerans olabildiği için 5 bantlı dirençlerde yön karışabilir. Böyle bir durumda iki yönden de okuyup sonuçları standart değer serisiyle karşılaştırın. Dirençler rastgele değerlerde değil, E-serisi denen standart değerlerde üretilir. ±%5'lik dirençlerde kullanılan E24 serisinin değerleri 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82 ve 91'dir (ve bunların 10'un kuvvetleriyle çarpımları). Bir yönden okuduğunuz değer bu listede yoksa doğru yön büyük olasılıkla diğeridir.",
        "<strong>Tolerans</strong>, üreticinin değer için verdiği izin verilen sapmadır. ±%5'lik 1 kΩ direnç 950 ile 1.050 Ω arasında herhangi bir değerde çıkabilir ve yine sağlam sayılır. Çoğu dijital devrede bu sapma önemsizdir; gerilim bölücü, filtre ve ölçüm devrelerinde ise ±%1'lik dirençler tercih edilir."
      ]
    },
    {
      h: "SMD direnç kodları nasıl okunur?",
      p: [
        "Yüzey montajlı (SMD) dirençlerde renk bandı yoktur; gövdenin üzerinde 3 ya da 4 karakterlik bir kod basılıdır. Çok küçük boyutlu (0402 ve altı) dirençlerde ise çoğu zaman hiçbir kod bulunmaz ve değer yalnızca ölçülerek ya da makaranın etiketinden öğrenilir."
      ],
      table: {
        head: ["Kod türü", "Kural", "Örnek", "Değer"],
        rows: [
          ["3 haneli (±%5)", "İlk iki hane rakam, son hane sıfır sayısı", "103", "10 × 10³ = 10 kΩ"],
          ["3 haneli", "Aynı kural", "471", "47 × 10 = 470 Ω"],
          ["4 haneli (±%1)", "İlk üç hane rakam, son hane sıfır sayısı", "1002", "100 × 10² = 10 kΩ"],
          ["R'li kod", "R ondalık virgülün yerini gösterir", "4R7", "4,7 Ω"],
          ["Sıfır", "Köprü (jumper) direnci", "0 ya da 000", "0 Ω"],
          ["EIA-96 (±%1)", "İki rakam tablodaki değerin sırası, harf çarpan", "01C", "100 × 100 = 10 kΩ"]
        ]
      },
      after: [
        "EIA-96 kodlamasında iki haneli sayı, E96 serisindeki değerin sıra numarasıdır (01 = 100, 30 = 200, 96 = 976 gibi); harf ise çarpanı verir: A ×1, B ×10, C ×100, D ×1.000, E ×10.000, F ×100.000, X ×0,1, Y ×0,01. Bu tabloyu ezberlemek gerekmez; [[arac:smd-direnc-kodu-coz|SMD Direnç Kodu Çözücü]] üç haneli, dört haneli, R'li ve EIA-96 kodlarını doğrudan çözer."
      ]
    },
    {
      h: "Multimetreyle direnç nasıl ölçülür?",
      p: [
        "Renkleri ayırt etmek zor olduğunda (yanmış, solmuş ya da ışık altında kahverengi-kırmızı-turuncu karışan bantlar) en güvenilir yol ölçmektir. Ölçüm aynı zamanda direncin bozulup bozulmadığını da gösterir."
      ],
      ol: [
        "Devrenin enerjisini kesin; kondansatörlerin boşaldığından emin olun. Enerjili devrede direnç ölçülmez.",
        "Mümkünse direncin bir bacağını devreden ayırın. Kart üzerindeyken paralel bağlı diğer elemanlar ölçümü düşük gösterir.",
        "Multimetreyi Ω (ohm) konumuna alın; kademeli cihazlarda beklenen değerin hemen üzerindeki kademeyi seçin.",
        "Probları direncin iki bacağına değdirin. Yüksek değerli dirençlerde parmaklarınızı iki bacağa birden değdirmeyin; vücut direnci ölçüme paralel girer.",
        "Okunan değer tolerans aralığındaysa direnç sağlamdır. Ekranda \"OL\" ya da \"1\" görünüyorsa direnç açık devre olmuş ya da kademe düşüktür."
      ]
    },
    {
      h: "Değeri bilmek yetmez: Ohm kanunu ile doğru direnci seçmek",
      p: [
        "Renk kodunu okumanın en sık nedeni, bir devre için gereken direnci bulup elinizdekilerle eşleştirmektir. Örneğin 5 V'luk bir kaynaktan 2 V düşümlü kırmızı bir LED'i 20 mA ile sürmek istiyorsanız direnç üzerinde kalan gerilim 5 − 2 = 3 V olur. Ohm kanununa göre R = V ÷ I = 3 ÷ 0,020 = 150 Ω bulunur; bu değer standart seride vardır ve renk kodu kahverengi-yeşil-kahverengi-altındır.",
        "Direncin gücü de kontrol edilmelidir: P = V × I = 3 × 0,020 = 0,06 W. Bu değer yaygın 1/4 W (0,25 W) dirençlerin sınırının oldukça altındadır. Gerilim, akım, direnç ve gücü birbirinden hesaplamak için [[arac:ohm-kanunu-hesapla|Ohm Kanunu Hesaplama aracı]]nı; elinizde tam değer yoksa birkaç direnci arka arkaya bağlayarak toplam değere ulaşmak için [[arac:seri-direnc-hesapla|Seri Direnç Hesaplama aracı]]nı kullanabilirsiniz. Seri bağlantıda toplam direnç, dirençlerin değerlerinin toplamıdır: 100 Ω + 47 Ω = 147 Ω.",
        "Devre hesaplarında karşılaşabileceğiniz güç birimleri ve kW-kVA farkı için [[bilgi:kva-kw-farki-jenerator-secimi|kVA ile kW farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Renk kodu okurken sık yapılan hatalar",
      ul: [
        "<strong>Ters yönden okumak:</strong> Altın ya da gümüş bant sağda olmalıdır; aksi hâlde anlamsız bir değer çıkar.",
        "<strong>Kahverengi, kırmızı ve turuncuyu karıştırmak:</strong> Sarı ışık altında bu üç renk birbirine benzer; gün ışığında ya da beyaz ışıkta bakın, şüphede ölçün.",
        "<strong>Çarpanı rakam gibi okumak:</strong> 4 bantlı dirençte üçüncü bant rakam değil sıfır sayısıdır; kırmızı \"2\" değil \"iki sıfır\" demektir.",
        "<strong>Altın çarpanı unutmak:</strong> Üçüncü bant altınsa değer 10'a bölünür; 10 Ω'un altındaki dirençler böyle yazılır.",
        "<strong>Devre üzerinde ölçüp yanlış değeri kabul etmek:</strong> Paralel yollar ölçümü düşürür; şüpheli dirençte bir bacağı ayırarak tekrar ölçün."
      ]
    }
  ],
  faq: [
    ["Direnç renk kodları nasıl okunur?", "Tolerans bandı sağda kalacak şekilde soldan sağa okunur. 4 bantlı dirençte ilk iki bant rakamları, üçüncü bant eklenecek sıfır sayısını, dördüncü bant toleransı verir; kahverengi-siyah-kırmızı-altın 1 kΩ ±%5 eder."],
    ["4 bantlı ve 5 bantlı direnç farkı nedir?", "4 bantlı dirençte iki, 5 bantlı dirençte üç rakam bandı vardır; ardından çarpan ve tolerans gelir. 5 bantlı dirençler genellikle ±%1 ya da daha dar toleranslı hassas metal film dirençlerdir."],
    ["Tolerans bandı ne anlama gelir?", "Tolerans, direncin gerçek değerinin yazılı değerden en fazla ne kadar sapabileceğini gösterir. Altın ±%5, gümüş ±%10, kahverengi ±%1 demektir; ±%5'lik 1 kΩ direnç 950 ile 1.050 Ω arasında olabilir."],
    ["Kahverengi-siyah-kırmızı kaç ohm?", "Kahverengi 1, siyah 0 ve kırmızı ×100 çarpanı olduğu için değer 10 × 100 = 1.000 ohm, yani 1 kiloohm'dur. Dördüncü bant altınsa tolerans ±%5 ve kabul aralığı 950–1.050 ohm olur."],
    ["SMD direnç kodları nasıl okunur?", "3 haneli kodda ilk iki hane rakam, son hane sıfır sayısıdır: 103 = 10 kΩ. 4 haneli kodda ilk üç hane rakamdır: 1002 = 10 kΩ. R ondalık virgülü gösterir: 4R7 = 4,7 Ω."],
    ["Direnç hangi yönden okunur?", "Altın ya da gümüş tolerans bandı sağa alınır ve okuma karşı uçtan başlar. Tolerans bandı genellikle diğerlerinden daha geniş bir boşlukla ayrılır; emin olamazsanız iki yönden okuyup sonucu standart değer listesiyle karşılaştırın."],
    ["Multimetreyle direnç nasıl ölçülür?", "Devrenin enerjisini kesin, mümkünse direncin bir bacağını devreden ayırın, multimetreyi ohm kademesine alıp probları iki bacağa değdirin. Okunan değer tolerans aralığındaysa direnç sağlamdır."],
    ["Renk kodlarını ezberlemenin kolay yolu nedir?", "Siyah 0 ve kahverengi 1'den sonra kırmızı, turuncu, sarı, yeşil, mavi ve mor 2'den 7'ye kadar gökkuşağı sırasını izler; sonda gri 8 ve beyaz 9 gelir. Çarpanı eklenecek sıfır sayısı olarak düşünmek hesabı hızlandırır."]
  ],
  tools: ["direnc-renk-kodu-hesapla", "smd-direnc-kodu-coz", "ohm-kanunu-hesapla", "seri-direnc-hesapla"],
  related: ["kva-kw-farki-jenerator-secimi", "ikilik-sayi-sistemi-nasil-cevrilir"],
  sources: [
    ["IEC – Uluslararası Elektroteknik Komisyonu (IEC 60062 işaretleme kodları)", "https://www.iec.ch/"],
    ["MEB Mesleki ve Teknik Eğitim – Elektrik-Elektronik Teknolojisi modülleri", "https://megep.meb.gov.tr/"]
  ]
};
