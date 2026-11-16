export default {
  slug: "smd-direnc-kodu-nasil-okunur-103-472",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "SMD Direnç Kodu Nasıl Okunur? 103, 472, 4R7 ve EIA-96 Kodları",
  pageTitle: "SMD Direnç Kodu Nasıl Okunur? 103, 472, 4R7, EIA-96",
  description: "SMD direnç kodu nasıl okunur? 103 kaç ohm, 472 ne demek, 4R7 ve R47 okuma, 4 haneli kodlar, EIA-96 (01C) tablosu, 000 köprü direnci ve kılıf boyutları örneklerle.",
  keywords: ["smd direnç kodu", "103 direnç kaç ohm", "472 smd direnç", "4r7 ne demek", "eia-96 kodu", "smd direnç okuma", "01c direnç", "0603 0805 kılıf"],
  lead: "Üç haneli SMD direnç kodunda ilk iki rakam değeri, üçüncü rakam ise eklenecek sıfır sayısını gösterir; 103 = 10 × 10³ = 10.000 Ω = 10 kΩ, 472 = 47 × 10² = 4.700 Ω = 4,7 kΩ eder. Dört haneli kodlarda ilk üç rakam değer, sonuncusu çarpandır; R harfi ise ondalık virgülün yerini tutar (4R7 = 4,7 Ω). Hassas dirençlerde kullanılan EIA-96 sisteminde iki rakam bir tablo sırasını, harf çarpanı gösterir. Bu yazıda tüm kod türlerini çözümlü örneklerle, kılıf boyutlarıyla ve sık hatalarla anlatıyoruz.",
  kisaCevap: [
    "3 haneli kod: AB C → AB × 10<sup>C</sup> ohm; 103 = 10 kΩ, 472 = 4,7 kΩ, 221 = 220 Ω.",
    "4 haneli kod: ABC D → ABC × 10<sup>D</sup> ohm; 1002 = 10 kΩ, 4701 = 4,7 kΩ; genellikle %1 toleranslı dirençlerde kullanılır.",
    "R harfi ondalık virgüldür: 4R7 = 4,7 Ω, R47 = 0,47 Ω, 0R1 = 0,1 Ω.",
    "EIA-96'da iki rakam 1–96 arası tablo sırası, harf çarpandır: 01C = 100 × 100 = 10 kΩ.",
    "0, 00 ya da 000 yazan direnç sıfır ohm köprüdür; devrede tel gibi bağlantı kurar.",
    "Kılıf kodu inç cinsinden boyuttur: 0603 = 0,06 × 0,03 inç ≈ 1,6 × 0,8 mm."
  ],
  figure: {
    alt: "SMD direnç kod çözme kartı: 103 kodunda 1 ve 0 değer, 3 çarpan, sonuç 10 kΩ; 4R7 kodunda R ondalık virgül; 01C kodunda EIA-96 tablosundan 100 ve C çarpanı 100, sonuç 10 kΩ.",
    caption: "Üç kod türünün çözümü. Üç ve dört haneli kodlarda son rakam sıfır sayısıdır; R harfi ondalık işaretidir; EIA-96'da rakamlar tablo sırasını, harf çarpanı gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">SMD direnç kodları nasıl çözülür?</text>
  <g>
    <rect x="30" y="56" width="200" height="90" rx="10" class="t"/>
    <text x="130" y="116" class="xl mid sf">103</text>
    <text x="250" y="80" class="sm b">3 haneli kod</text>
    <text x="250" y="104" class="sm"><tspan class="p b">10</tspan> = değer · <tspan class="p b">3</tspan> = 3 sıfır ekle</text>
    <text x="250" y="128" class="sm">10 × 10³ = 10.000 Ω = <tspan class="b">10 kΩ</tspan></text>
    <rect x="560" y="70" width="140" height="56" rx="8" class="oks"/><text x="630" y="104" class="b mid lg">10 kΩ</text>
  </g>
  <g>
    <rect x="30" y="170" width="200" height="90" rx="10" class="t"/>
    <text x="130" y="230" class="xl mid sf">4R7</text>
    <text x="250" y="194" class="sm b">R ile ondalık kod</text>
    <text x="250" y="218" class="sm"><tspan class="p b">R</tspan> = ondalık virgül</text>
    <text x="250" y="242" class="sm">4R7 = 4,7 Ω · R47 = 0,47 Ω</text>
    <rect x="560" y="184" width="140" height="56" rx="8" class="oks"/><text x="630" y="218" class="b mid lg">4,7 Ω</text>
  </g>
  <g>
    <rect x="30" y="284" width="200" height="90" rx="10" class="t"/>
    <text x="130" y="344" class="xl mid sf">01C</text>
    <text x="250" y="308" class="sm b">EIA-96 (%1 hassas)</text>
    <text x="250" y="332" class="sm"><tspan class="p b">01</tspan> → tabloda 100 · <tspan class="p b">C</tspan> → ×100</text>
    <text x="250" y="356" class="sm">100 × 100 = 10.000 Ω</text>
    <rect x="560" y="298" width="140" height="56" rx="8" class="oks"/><text x="630" y="332" class="b mid lg">10 kΩ</text>
  </g>
  <text x="360" y="404" class="sm mid t2">Aynı 10 kΩ üç farklı biçimde yazılabilir: 103 (%5), 1002 (%1), 01C (%1)</text>
</svg>`
  },
  sections: [
    {
      h: "SMD direnç nedir, neden renk kodu yerine rakam kullanılır?",
      p: [
        "SMD (yüzey montaj) dirençler, bacakları olmayan ve doğrudan devre kartının yüzeyine lehimlenen küçük dikdörtgen parçalardır. Telefonlardan bilgisayar anakartlarına, yazıcı kartlarından LED sürücülere kadar neredeyse her modern elektronik cihazda yüzlerce SMD direnç bulunur.",
        "Bacaklı dirençlerdeki renk bantları bu boyutta okunamayacağı için SMD dirençlerin üzerine değer rakam ve harflerle basılır. Çok küçük kılıflarda (0402 ve altı) ise hiç kod basılmaz; değeri öğrenmenin tek yolu devre şemasına bakmak ya da ölçmektir. Bacaklı dirençlerdeki renk sistemi için [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Üç haneli kod nasıl okunur? 103, 472, 221",
      p: [
        "En yaygın sistem üç rakamdan oluşur ve genellikle %5 toleranslı standart dirençlerde kullanılır. İlk iki rakam direncin anlamlı kısmıdır; üçüncü rakam bu sayının sonuna kaç sıfır ekleneceğini, yani 10'un kaçıncı kuvvetiyle çarpılacağını gösterir. Sonuç her zaman ohm cinsindendir."
      ],
      formula: "Değer (Ω) = ilk iki rakam × 10^(üçüncü rakam)\n103 → 10 × 10³ = 10.000 Ω = 10 kΩ\n472 → 47 × 10² = 4.700 Ω = 4,7 kΩ",
      table: {
        head: ["Kod", "Hesap", "Değer"],
        rows: [
          ["100", "10 × 10⁰", "10 Ω"],
          ["101", "10 × 10¹", "100 Ω"],
          ["221", "22 × 10¹", "220 Ω"],
          ["331", "33 × 10¹", "330 Ω"],
          ["102", "10 × 10²", "1 kΩ"],
          ["472", "47 × 10²", "4,7 kΩ"],
          ["103", "10 × 10³", "10 kΩ"],
          ["473", "47 × 10³", "47 kΩ"],
          ["104", "10 × 10⁴", "100 kΩ"],
          ["105", "10 × 10⁵", "1 MΩ"]
        ],
        caption: "Son rakamı 0 olan kodlar sıfır eklemez: 100 kodu 10 Ω demektir, 100 Ω değil."
      },
      after: [
        "En sık yapılan hata, \"100\" kodunu 100 ohm sanmaktır. Kural tutarlıdır: 10 ve sonuna sıfır tane sıfır, yani 10 Ω. Aynı mantık [[bilgi:kondansator-kodu-nasil-okunur-104|kondansatör kodlarında]] da geçerlidir; orada sonuç pikofarad cinsindendir."
      ]
    },
    {
      h: "Dört haneli kodlar hangi dirençlerde kullanılır?",
      p: [
        "%1 ve daha hassas toleranslı dirençlerde değerin üç anlamlı rakamla yazılması gerekir, çünkü E96 serisinde 10,2 kΩ, 49,9 Ω gibi ara değerler bulunur. Bu dirençlerde dört haneli kod kullanılır: ilk üç rakam değer, dördüncü rakam çarpandır."
      ],
      table: {
        head: ["Kod", "Hesap", "Değer"],
        rows: [
          ["1000", "100 × 10⁰", "100 Ω"],
          ["4701", "470 × 10¹", "4,7 kΩ"],
          ["1002", "100 × 10²", "10 kΩ"],
          ["1022", "102 × 10²", "10,2 kΩ"],
          ["4992", "499 × 10²", "49,9 kΩ"],
          ["1003", "100 × 10³", "100 kΩ"]
        ]
      },
      after: [
        "Kodun üç ya da dört haneli olması tek başına toleransı kesin göstermez; ama dört haneli kod gören tamirci, parçanın büyük olasılıkla hassas bir devrede (ölçüm, geri besleme, referans) kullanıldığını düşünmeli ve yerine aynı toleransta direnç takmalıdır."
      ]
    },
    {
      h: "R harfi ne anlama gelir? 4R7, R47, 0R1",
      p: [
        "10 ohm'un altındaki değerleri üç rakamla yazmak mümkün olmadığı için R harfi kullanılır. R, ondalık virgülün yerini tutar. 4R7 = 4,7 Ω, 1R0 = 1 Ω, R47 = 0,47 Ω, R010 = 0,01 Ω (10 mΩ) demektir. Bu tür küçük dirençler genellikle akım ölçümü (şönt) ve koruma devrelerinde bulunur.",
        "Devre şemalarında ve parça listelerinde aynı mantık K ve M harfleriyle de kullanılır: 4K7 = 4,7 kΩ, 2M2 = 2,2 MΩ. Bu yazım ondalık virgülün baskıda kaybolmasını önler. SMD dirençlerin üzerinde K ve M harfi nadiren görülür, ama şemalarda çok yaygındır. Değerleri ohm, kiloohm ve megaohm arasında çevirmek için [[arac:ohm-kiloohm-cevir|Ohm Kiloohm Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "EIA-96 kodlama sistemi nasıl çalışır?",
      p: [
        "Çok küçük %1'lik dirençlerde dört rakam sığmaz; bunun için EIA-96 sistemi geliştirilmiştir. Kod iki rakam ve bir harften oluşur. İki rakam, E96 değer serisindeki 96 değerden hangisinin kullanıldığını gösteren sıra numarasıdır (01–96). Harf ise çarpandır.",
        "Örneğin 01C: 01 numaralı değer 100, C çarpanı 100'dür; sonuç 100 × 100 = 10.000 Ω = 10 kΩ. 68X: 68 numaralı değer 499, X çarpanı 0,1'dir; sonuç 49,9 Ω. 30A: 30 numaralı değer 200, A çarpanı 1'dir; sonuç 200 Ω."
      ],
      table: {
        head: ["Harf", "Çarpan", "Harf", "Çarpan"],
        rows: [
          ["Z", "0,001", "B veya H", "10"],
          ["Y veya R", "0,01", "C", "100"],
          ["X veya S", "0,1", "D", "1.000"],
          ["A", "1", "E", "10.000"],
          ["—", "—", "F", "100.000"]
        ],
        caption: "EIA-96 çarpan harfleri. R harfinin ondalık anlamıyla karışmaması için kodun biçimine (iki rakam + tek harf) bakın."
      },
      after: [
        "Sıra numarasından değeri bulmak için 96 satırlık tabloyu ezberlemek gerekmez. [[arac:smd-direnc-kodu-coz|SMD Direnç Kodu Çözücü]] üç haneli, dört haneli, R'li ve EIA-96 kodlarının hepsini tanır ve değeri ohm, kΩ ve MΩ olarak verir."
      ]
    },
    {
      h: "000 veya 0 yazan direnç ne işe yarar?",
      p: [
        "Üzerinde 0, 00 ya da 000 yazan parça sıfır ohm direnç ya da \"köprü\" (jumper) olarak adlandırılır. Gerçekte birkaç miliohm direnci olan bir iletkendir ve kart üzerinde iki noktayı birbirine bağlar. Tasarımcılar bunu tek katmanlı kartta yolları birbirinin üzerinden geçirmek, üretimde bir seçeneği açıp kapatmak ya da test noktası oluşturmak için kullanır.",
        "Sıfır ohm direncin de bir akım sınırı vardır; kılıf boyutuna göre genellikle 1–2 amper civarındadır. Arızalı bir kartta yanmış bir sıfır ohm direnç, arkasındaki devrede kısa devre olduğuna işaret edebilir. Köprüyü tel ile değiştirmeden önce nedenini bulmak gerekir; aksi hâlde sigorta görevi gören parça ortadan kalkmış olur."
      ]
    },
    {
      h: "SMD kılıf boyutları (0603, 0805) ne demektir?",
      p: [
        "SMD dirençlerin boyutu dört haneli bir kodla anılır. Yaygın kullanımda bu kod inç cinsinden boyutu gösterir: ilk iki hane uzunluğu, son iki hane genişliği yüzde bir inç olarak verir. 0805 = 0,08 × 0,05 inç ≈ 2,0 × 1,25 mm. Bazı üreticiler metrik kod kullanır; metrik 1608, inç 0603'e karşılık gelir. Karışıklığı önlemek için parça listesinde hangi sistemin kullanıldığına bakın."
      ],
      table: {
        head: ["İnç kodu", "Metrik kodu", "Boyut (mm)", "Tipik güç"],
        rows: [
          ["0201", "0603", "0,6 × 0,3", "1/20 W"],
          ["0402", "1005", "1,0 × 0,5", "1/16 W"],
          ["0603", "1608", "1,6 × 0,8", "1/10 W"],
          ["0805", "2012", "2,0 × 1,25", "1/8 W"],
          ["1206", "3216", "3,2 × 1,6", "1/4 W"],
          ["2512", "6332", "6,4 × 3,2", "1 W"]
        ],
        caption: "Güç değerleri tipiktir; üretici veri sayfası ve ortam sıcaklığı esas alınır."
      },
      after: [
        "Kılıf boyutu direncin dayanabileceği gücü belirler. Bir direnç üzerinde harcanan gücü P = I² × R ya da P = V² ÷ R ile hesaplayıp kılıfın gücünün yarısını geçmeyecek şekilde seçmek iyi bir pratiktir. Formüllerin ayrıntısı [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] yazısındadır."
      ]
    },
    {
      h: "Renk kodlu dirençlerle SMD kodları arasındaki fark",
      p: [
        "Renk kodlu bacaklı dirençlerde değer renk bantlarıyla, SMD dirençlerde rakam ve harflerle yazılır; ama hesap mantığı aynıdır. Dört bantlı bir dirençte ilk iki bant anlamlı rakamlar, üçüncü bant çarpan, dördüncü bant toleranstır. Kahverengi-siyah-turuncu bantlı bir direnç (1, 0, ×1.000) 10 kΩ'dur ve SMD karşılığı 103'tür.",
        "En önemli fark toleransın gösterimidir. Renk kodunda tolerans ayrı bir bantla açıkça yazılır; SMD kodunda tolerans genellikle kodun türünden tahmin edilir. Hassas ölçüm gereken onarımlarda parçanın veri sayfasına bakmak ya da direnci devreden söküp ölçmek en güvenilir yoldur. Renk bantlarını çözmek için [[arac:direnc-renk-kodu-hesapla|Direnç Renk Kodu aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Ölçüm ve onarımda sık yapılan hatalar",
      ul: [
        "<strong>Devre üzerinde ölçmek:</strong> Kart üzerindeki direnç paralel bağlı diğer parçalar yüzünden olduğundan düşük ölçülür. Kesin değer için bir ucu sökün.",
        "<strong>100'ü 100 Ω sanmak:</strong> 100 kodu 10 Ω'dur; 100 Ω'un kodu 101'dir.",
        "<strong>Kodu ters okumak:</strong> Küçük parçalarda 601 ile 109 gibi kodlar ters çevrildiğinde karışabilir; kart üzerindeki yazı yönüne bakın.",
        "<strong>EIA-96'yı üç haneli sanmak:</strong> 01C ile 103 aynı değeri verir ama 68X'i \"68 × X\" diye okumak yanlış sonuç verir; harf varsa tablo sistemi kullanılır.",
        "<strong>Gücü göz ardı etmek:</strong> Aynı değerde ama küçük kılıflı direnç takmak aşırı ısınmaya yol açabilir.",
        "<strong>Toleransı düşürmek:</strong> %1'lik dirençlerin yerine %5'lik takmak ölçüm ve gerilim referansı devrelerinde sapma yaratır."
      ],
      after: [
        "Birden fazla direnci seri ya da paralel bağlayarak elinizde olmayan bir değeri elde etmek isterseniz [[bilgi:seri-ve-paralel-direnc-hesaplama|seri ve paralel direnç hesaplama]] yazısındaki formülleri kullanabilirsiniz."
      ]
    }
  ],
  faq: [
    ["SMD dirençlerde üç haneli kod nasıl okunur?", "İlk iki rakam değerin anlamlı kısmı, üçüncü rakam eklenecek sıfır sayısıdır. Örneğin 221 kodu 22 ve sonuna bir sıfır, yani 220 Ω demektir. Sonuç her zaman ohm cinsindendir."],
    ["103 kodu kaç ohm'dur?", "103 kodu 10 × 10³ = 10.000 ohm, yani 10 kiloohm'dur. Aynı değer dört haneli sistemde 1002, EIA-96 sisteminde 01C olarak yazılır; bacaklı dirençte kahverengi, siyah, turuncu bantlara karşılık gelir."],
    ["Dört haneli kodlar hangi hassasiyetteki dirençlerde kullanılır?", "Dört haneli kodlar genellikle yüzde 1 ve daha hassas toleranslı dirençlerde kullanılır. İlk üç rakam değer, dördüncü rakam çarpandır; 4992 kodu 499 × 10² = 49,9 kΩ eder."],
    ["R harfi (4R7) ne anlama gelir?", "R harfi ondalık virgülün yerini tutar. 4R7 kodu 4,7 Ω, R47 kodu 0,47 Ω, 0R1 kodu 0,1 Ω demektir. Bu yazım 10 ohm'un altındaki değerler için kullanılır."],
    ["EIA-96 kodlama sistemi nasıl çalışır?", "Kod iki rakam ve bir harften oluşur. Rakamlar E96 serisindeki 96 değerden birinin sıra numarasıdır, harf ise çarpandır. 01C kodunda 01 numaralı değer 100, C çarpanı 100 olduğu için sonuç 10 kΩ'dur."],
    ["000 veya 0 yazan direnç ne işe yarar?", "Bu parçalar sıfır ohm köprü dirençlerdir ve kart üzerinde iki noktayı tel gibi bağlar. Yolları birbirinin üzerinden geçirmek ya da üretimde seçenek ayarlamak için kullanılır; belirli bir akım sınırları vardır."],
    ["SMD kılıf boyutları (0603, 0805) ne demektir?", "Kılıf kodu genellikle inç cinsinden boyutu verir: 0603 yaklaşık 1,6 × 0,8 mm, 0805 yaklaşık 2,0 × 1,25 mm'dir. Kılıf büyüdükçe direncin dayanabildiği güç de artar."],
    ["Ohm, kiloohm ve megaohm nasıl çevrilir?", "1 kiloohm 1.000 ohm, 1 megaohm 1.000.000 ohm'dur. 4.700 Ω = 4,7 kΩ ve 2.200.000 Ω = 2,2 MΩ olarak yazılır; şemalarda bu değerler 4K7 ve 2M2 biçiminde de gösterilir."],
    ["Renk kodlu dirençlerle SMD kodları arasındaki fark nedir?", "İkisinde de hesap mantığı aynıdır: anlamlı rakamlar ve çarpan. Fark, renk kodunda toleransın ayrı bir bantla açıkça yazılması, SMD kodunda ise toleransın çoğu zaman kod türünden tahmin edilmesidir."]
  ],
  tools: ["smd-direnc-kodu-coz", "direnc-renk-kodu-hesapla", "ohm-kiloohm-cevir", "ohm-kanunu-hesapla"],
  related: ["direnc-renk-kodlari-nasil-okunur", "kondansator-kodu-nasil-okunur-104"],
  uyari: "elektrikli cihazlarda onarım yapmadan önce cihazın enerjisini kesin ve kondansatörlerin boşaldığından emin olun; şebeke gerilimli devrelerde çalışmayı yetkili kişilere bırakın"
};
