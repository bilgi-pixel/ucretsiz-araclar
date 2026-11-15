export default {
  slug: "celsius-fahrenheit-cevirme",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Celsius Fahrenheit Nasıl Çevrilir? Formül, Tablo ve Kelvin Dönüşümü",
  pageTitle: "Fahrenheit Celsius Çevirme: Formül, Fırın Tablosu ve Kelvin",
  description: "°C = (°F − 32) × 5/9, °F = °C × 9/5 + 32. 100 °F = 37,8 °C, 350 °F fırın = 177 °C. Fırın, ateş ve hava sıcaklığı tablosu, Kelvin dönüşümü ve akılda tutma yolu.",
  keywords: ["fahrenheit celsius çevirme", "fahrenheit nedir", "100 fahrenheit kaç derece", "celsius fahrenheit formülü", "kelvin celsius çevirme", "fırın derecesi fahrenheit", "350 f kaç derece", "vücut ısısı fahrenheit"],
  lead: "Fahrenheit dereceyi Celsius'a çevirmek için <strong>önce 32 çıkarır, sonra 5/9 ile çarparsınız: °C = (°F − 32) × 5/9</strong>. Ters yönde Celsius değeri 9/5 (yani 1,8) ile çarpılıp 32 eklenir. Böylece 100 °F yaklaşık 37,8 °C, yabancı tariflerde sık geçen 350 °F fırın sıcaklığı ise yaklaşık 177 °C eder. Bu sayfada iki ölçeğin nereden geldiğini, fırın, vücut ısısı ve hava durumu için hazır tabloları, Kelvin dönüşümünü ve akılda hesap yapmanın pratik yollarını bulacaksınız.",
  kisaCevap: [
    "°C = (°F − 32) × 5/9; °F = °C × 1,8 + 32.",
    "Suyun donma noktası 0 °C = 32 °F, deniz seviyesinde kaynama noktası 100 °C = 212 °F'tır.",
    "100 °F = 37,8 °C; 98,6 °F = 37 °C (normal vücut ısısı olarak bilinen değer).",
    "350 °F fırın = 176,7 °C; Türk fırınlarında 175–180 °C olarak ayarlanır.",
    "Kelvin: K = °C + 273,15; mutlak sıfır 0 K = −273,15 °C = −459,67 °F.",
    "−40 derecede iki ölçek eşitlenir: −40 °C = −40 °F."
  ],
  figure: {
    alt: "Yan yana Celsius ve Fahrenheit termometre ölçekleri: −40 eşit nokta, 0 °C = 32 °F donma, 37 °C = 98,6 °F vücut ısısı, 100 °C = 212 °F kaynama, 177 °C = 350 °F fırın.",
    caption: "İki ölçek arasında 32 derecelik bir kayma ve 1,8 katlık bir aralık farkı vardır. Celsius'ta donma ile kaynama arası 100, Fahrenheit'ta 180 derecedir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Celsius ve Fahrenheit karşılaştırması</text>
  <text x="250" y="62" class="b mid">°C</text><text x="470" y="62" class="b mid">°F</text>
  <rect x="236" y="72" width="28" height="330" rx="14" class="sf sb"/>
  <rect x="456" y="72" width="28" height="330" rx="14" class="sf sb"/>
  <rect x="242" y="250" width="16" height="148" rx="8" class="dg"/>
  <rect x="462" y="250" width="16" height="148" rx="8" class="dg"/>
  <g>
    <line x1="264" y1="388" x2="456" y2="388" class="sb dash" fill="none"/>
    <text x="226" y="393" class="end b">−40</text><text x="494" y="393" class="b">−40</text><text x="360" y="382" class="sm mid t2">iki ölçek eşit</text>
    <line x1="264" y1="315" x2="456" y2="315" class="sb dash" fill="none"/>
    <text x="226" y="320" class="end b">0</text><text x="494" y="320" class="b">32</text><text x="360" y="309" class="sm mid t2">su donar</text>
    <line x1="264" y1="250" x2="456" y2="250" class="sp" fill="none"/>
    <text x="226" y="255" class="end b p">37</text><text x="494" y="255" class="b p">98,6</text><text x="360" y="244" class="sm mid p">vücut ısısı</text>
    <line x1="264" y1="157" x2="456" y2="157" class="sb dash" fill="none"/>
    <text x="226" y="162" class="end b">100</text><text x="494" y="162" class="b">212</text><text x="360" y="151" class="sm mid t2">su kaynar</text>
    <line x1="264" y1="94" x2="456" y2="94" class="sb dash" fill="none"/>
    <text x="226" y="99" class="end b">177</text><text x="494" y="99" class="b">350</text><text x="360" y="88" class="sm mid t2">orta ısı fırın</text>
  </g>
  <rect x="540" y="120" width="170" height="150" rx="10" class="sf sb"/>
  <text x="625" y="146" class="b mid">Formüller</text>
  <text x="625" y="176" class="sm mid">°F = °C × 1,8 + 32</text>
  <text x="625" y="202" class="sm mid">°C = (°F − 32) ÷ 1,8</text>
  <text x="625" y="228" class="sm mid">K = °C + 273,15</text>
  <text x="625" y="254" class="sm mid t2">Ölçek oranlı değildir</text>
  <rect x="10" y="120" width="170" height="150" rx="10" class="ps"/>
  <text x="95" y="146" class="b mid">Örnek</text>
  <text x="95" y="176" class="sm mid">350 °F − 32 = 318</text>
  <text x="95" y="202" class="sm mid">318 × 5 ÷ 9</text>
  <text x="95" y="228" class="b mid p">= 176,7 °C</text>
  <text x="95" y="254" class="sm mid t2">fırını 175–180'e kurun</text>
</svg>`
  },
  sections: [
    {
      h: "Celsius ve Fahrenheit nedir, neden iki ölçek var?",
      p: [
        "<strong>Celsius (santigrat)</strong> ölçeği, 18. yüzyılda İsveçli gökbilimci Anders Celsius'un önerdiği sistemden gelir. Bugünkü tanımıyla suyun deniz seviyesinde donma noktası 0 °C, kaynama noktası yaklaşık 100 °C'dir ve arası 100 eşit parçaya bölünür. Türkiye dahil dünyanın büyük bölümü günlük hayatta ve bilimde bu ölçeği kullanır.",
        "<strong>Fahrenheit</strong> ölçeği ise Alman-Hollandalı fizikçi Daniel Gabriel Fahrenheit'in 1720'lerde geliştirdiği sistemdir. Bu ölçekte suyun donma noktası 32 °F, kaynama noktası 212 °F'tır; arası 180 eşit parçaya bölünür. Fahrenheit'ın sıfır noktası tuzlu buz karışımının sıcaklığına dayanıyordu; bu yüzden ölçek, Celsius'a göre hem kaymış hem de daha ince taneli bir aralıkla kurulmuştur.",
        "Bugün Fahrenheit'ı günlük hayatta resmî ölçek olarak kullanan yerler azdır: başta ABD olmak üzere Bahamalar, Belize, Cayman Adaları ve Palau gibi birkaç ülke ve bölge. Ancak ABD kaynaklı tarifler, hava durumu siteleri, fırın ve termometre ekranları nedeniyle Türkiye'deki kullanıcılar da bu dönüşüme sık ihtiyaç duyar."
      ]
    },
    {
      h: "Celsius-Fahrenheit formülü ve nereden geldiği",
      p: [
        "İki ölçek arasındaki ilişki doğrusaldır ama oranlı değildir; yani yalnızca bir sayıyla çarparak çevrilemez. Donma ile kaynama arasında Celsius'ta 100, Fahrenheit'ta 180 derece vardır. Bu yüzden 1 °C'lik değişim 180 ÷ 100 = 1,8 °F'lık değişime eşittir. Ayrıca Fahrenheit ölçeği 32 derece kaymış başlar."
      ],
      formula: "°F = °C × 9/5 + 32   (9/5 = 1,8)\n°C = (°F − 32) × 5/9\nÖrnek: 25 °C → 25 × 1,8 + 32 = 77 °F\nÖrnek: 100 °F → (100 − 32) × 5 ÷ 9 = 37,8 °C",
      after: [
        "Fahrenheit'tan Celsius'a çevirirken işlem sırası önemlidir: önce 32 çıkarılır, sonra çarpılır. Celsius'tan Fahrenheit'a giderken ise önce çarpılır, sonra 32 eklenir. Sırayı karıştırmak, en yaygın hesap hatasıdır. Herhangi bir değeri anında çevirmek için [[arac:celsius-fahrenheit-cevir|Celsius Fahrenheit Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "100 °F kaç °C eder? Çözümlü örnekler",
      ol: [
        "<strong>100 °F:</strong> 100 − 32 = 68; 68 × 5 = 340; 340 ÷ 9 = 37,78 °C. Hava durumunda 100 °F görmek, çok sıcak bir yaz günü anlamına gelir.",
        "<strong>350 °F (fırın):</strong> 350 − 32 = 318; 318 × 5 ÷ 9 = 176,7 °C. Tarif \"350 °F'ta 25 dakika pişirin\" diyorsa fırını 175–180 °C'ye ayarlayın.",
        "<strong>0 °F:</strong> (0 − 32) × 5 ÷ 9 = −17,8 °C. Derin dondurucuların hedef sıcaklığı olarak bilinen −18 °C bu değere çok yakındır.",
        "<strong>20 °C (oda sıcaklığı):</strong> 20 × 1,8 + 32 = 68 °F.",
        "<strong>−40 °C:</strong> −40 × 1,8 + 32 = −40 °F. İki ölçeğin aynı sayıyı gösterdiği tek nokta budur."
      ]
    },
    {
      h: "Fırın sıcaklıkları: Fahrenheit-Celsius tablosu",
      p: [
        "Yabancı tariflerdeki fırın derecelerini çevirirken sonucu 5 ya da 10 dereceye yuvarlamak pratiktir; ev fırınlarının termostatları zaten birkaç derecelik sapmayla çalışır. Aşağıdaki tabloda hesaplanan değer ve fırında kullanılabilecek yuvarlanmış ayar birlikte verilmiştir."
      ],
      table: {
        head: ["Tarifteki °F", "Hesaplanan °C", "Fırın ayarı (°C)", "Genel kullanım"],
        rows: [
          ["250 °F", "121,1", "120", "Kurutma, beze"],
          ["300 °F", "148,9", "150", "Yavaş pişirme, cheesecake"],
          ["325 °F", "162,8", "160–165", "Kek, kurabiye (yumuşak)"],
          ["350 °F", "176,7", "175–180", "Kek, kurabiye, börek"],
          ["375 °F", "190,6", "190", "Tart, poğaça, sebze"],
          ["400 °F", "204,4", "200–205", "Kızartma etkisi, patates"],
          ["425 °F", "218,3", "220", "Pizza, kızarık yüzey"],
          ["450 °F", "232,2", "230", "Ekmek, yüksek ısı"],
          ["500 °F", "260,0", "250 (ev fırını sınırı)", "Pizza taşı, çok yüksek ısı"]
        ]
      },
      after: [
        "Tarifler genellikle fansız (alt-üst ısıtmalı) fırın için yazılır. Fanlı (turbo) fırın kullanıyorsanız sıcak hava daha etkili dolaştığı için birçok üretici sıcaklığı yaklaşık 10–20 °C düşürmeyi önerir; kendi fırınınızın kullanım kılavuzunu esas alın. İngiliz tariflerinde geçen \"gas mark\" ölçeğinde 4, yaklaşık 350 °F ve 180 °C'ye karşılık gelir."
      ]
    },
    {
      h: "Vücut ısısı ve hava sıcaklığı tablosu",
      p: [
        "Yabancı menşeli dijital termometreler ve ABD kaynaklı sağlık metinleri vücut ısısını Fahrenheit olarak verebilir. Normal vücut ısısı olarak bilinen 98,6 °F, tam olarak 37 °C'dir. Vücut ısısı gün içinde ve ölçüm yerine (koltuk altı, ağız, kulak) göre birkaç onda bir derece değişir."
      ],
      table: {
        head: ["°F", "°C", "Bağlam"],
        rows: [
          ["32", "0", "Su donar"],
          ["50", "10", "Serin bahar günü"],
          ["68", "20", "Oda sıcaklığı"],
          ["77", "25", "Ilık yaz günü"],
          ["86", "30", "Sıcak yaz günü"],
          ["95", "35", "Çok sıcak hava"],
          ["98,6", "37", "Normal vücut ısısı olarak bilinen değer"],
          ["100,4", "38", "Birçok kaynakta ateş eşiği olarak anılır"],
          ["104", "40", "Yüksek ateş; hekime başvurulmalı"],
          ["212", "100", "Su kaynar (deniz seviyesi)"]
        ]
      },
      after: [
        "Ateş değerlendirmesi yaşa, ölçüm yerine ve genel duruma bağlıdır. Özellikle bebeklerde, yüksek ya da uzun süren ateşte veya bilinç bulanıklığı, nefes darlığı, ense sertliği gibi belirtiler eşlik ediyorsa sayıya bakmaksızın hekime başvurun."
      ]
    },
    {
      h: "Kelvin ile Celsius arasındaki fark nedir?",
      p: [
        "Kelvin, Uluslararası Birimler Sistemi'nin (SI) resmî sıcaklık birimidir ve sıfır noktası <strong>mutlak sıfırdır</strong>: maddenin ulaşabileceği en düşük sıcaklık. Kelvin'de bir derecelik aralık Celsius'la aynıdır; yalnızca sıfır noktası kaydırılmıştır. Bu yüzden dönüşüm basit bir toplamadır. Kelvin değerleri derece işaretiyle değil, yalnızca \"K\" ile yazılır: 300 K denir, \"300 °K\" denmez."
      ],
      formula: "K = °C + 273,15\n°C = K − 273,15\nK = (°F + 459,67) × 5/9\nMutlak sıfır: 0 K = −273,15 °C = −459,67 °F",
      after: [
        "Kelvin özellikle fizik ve kimya hesaplarında, örneğin gaz yasalarında kullanılır; çünkü bu formüllerde sıcaklığın oranlı olması, yani 0'ın gerçekten \"hiç ısı yok\" anlamına gelmesi gerekir. Günlük hayatta Kelvin'le en çok LED ampullerin renk sıcaklığında karşılaşırsınız: 2.700 K sıcak, 6.500 K soğuk beyaz ışıktır. Bu kullanım fiziksel bir sıcaklık değil, ışığın rengini tanımlayan bir ölçüdür; ayrıntı için [[bilgi:oda-icin-kac-lumen-gerekir|lümen ve renk sıcaklığı]] yazısına bakabilirsiniz. Dönüşümler için [[arac:celsius-kelvin-cevir|Celsius Kelvin Çevirici]] ve [[arac:fahrenheit-kelvin-cevir|Fahrenheit Kelvin Çevirici]] hazırdır."
      ]
    },
    {
      h: "Akılda tutmanın kolay yolu nedir?",
      p: [
        "Hesap makinesi olmadan yaklaşık değer bulmak için yaygın bir kestirme vardır: Fahrenheit değerinden 30 çıkarıp ikiye bölmek. 68 °F için (68 − 30) ÷ 2 = 19 °C bulunur; gerçek değer 20 °C'dir. Ters yönde Celsius değerini ikiyle çarpıp 30 eklemek yeter: 25 °C için 25 × 2 + 30 = 80 °F, gerçek değer 77 °F'tır.",
        "Bu kestirme hava durumu gibi 0–35 °C aralığında birkaç derecelik hatayla iş görür, ama sıcaklık yükseldikçe hata büyür. 350 °F için kestirme 160 °C verir; gerçek değer 177 °C olduğu için fırında 17 derecelik bir fark, kekin pişmemesine yol açabilir. Fırın ve sağlık değerlerinde her zaman tam formülü kullanın."
      ],
      table: {
        head: ["°F", "Gerçek °C", "Kestirme (°F − 30) ÷ 2", "Hata"],
        rows: [
          ["50", "10,0", "10", "0"],
          ["77", "25,0", "23,5", "−1,5"],
          ["95", "35,0", "32,5", "−2,5"],
          ["350", "176,7", "160", "−16,7"],
          ["450", "232,2", "210", "−22,2"]
        ]
      },
      after: [
        "Bir başka yararlı yol, birkaç sabit noktayı ezberlemektir: 0 °C = 32 °F, 10 °C = 50 °F, 20 °C = 68 °F, 30 °C = 86 °F, 37 °C = 98,6 °F. Her 10 °C'lik artış 18 °F'lık artış demektir; bu noktalardan ileri geri sayarak çoğu değeri tahmin edebilirsiniz. Ölçü birimlerindeki benzer bir karışıklık için [[bilgi:1-pound-kac-kg|pound ve kilogram dönüşümü]] yazısına da göz atabilirsiniz."
      ]
    },
    {
      h: "Cihaz ekranında °F görünüyorsa ne yapmalı?",
      p: [
        "Yurt dışından alınan dijital termometreler, hava istasyonları, klima kumandaları, otomobil göstergeleri ve akıllı telefon hava durumu uygulamaları bazen varsayılan olarak Fahrenheit gösterir. Çoğu cihazda birim bir düğme ya da ayar menüsüyle değiştirilebilir; dijital ateş ölçerlerde bu genellikle cihaz kapalıyken bir düğmeye uzun basarak yapılır. Doğru adımı cihazın kullanım kılavuzunda bulabilirsiniz.",
        "Birimi değiştirmeden önce ekrandaki değerin hangi birimde olduğundan emin olun. Ekranda 72 yazan bir oda termometresi 72 °F, yani yaklaşık 22 °C gösteriyordur; 72 °C bir oda için olanaksızdır. Ateş ölçerde 99,5 görüyorsanız birim Fahrenheit'tır ve değer yaklaşık 37,5 °C'ye karşılık gelir. Bu tür mantık kontrolleri, yanlış birimle yapılan yorumların önüne geçer."
      ]
    },
    {
      h: "Sıcaklık çevirirken sık yapılan hatalar",
      ul: [
        "<strong>İşlem sırasını karıştırmak:</strong> °F'tan °C'ye giderken önce 32 çıkarılır, sonra 5/9 ile çarpılır; tersi yapılırsa sonuç tamamen yanlış çıkar.",
        "<strong>Sıcaklık farkına 32 eklemek:</strong> \"Sıcaklık 10 °C arttı\" ifadesi 18 °F'lık artıştır, 50 °F değil; farklarda yalnızca 1,8 ile çarpılır.",
        "<strong>Kelvin'e derece işareti koymak:</strong> Doğru yazım 300 K'dir.",
        "<strong>Kestirme formülü fırında kullanmak:</strong> Yüksek sıcaklıklarda 15–20 derecelik hata pişirmeyi bozar.",
        "<strong>Fanlı fırın farkını unutmak:</strong> Tarif fansız fırına göre yazıldıysa fanlı fırında sıcaklık genellikle biraz düşürülür."
      ]
    }
  ],
  faq: [
    ["Fahrenheit Celsius'a nasıl çevrilir?", "Fahrenheit değerinden önce 32 çıkarılır, sonra sonuç 5 ile çarpılıp 9'a bölünür. Örneğin 212 °F için 212 − 32 = 180, 180 × 5 ÷ 9 = 100 °C bulunur."],
    ["100 °F kaç °C eder?", "100 °F yaklaşık 37,8 °C eder. Hesap şöyledir: 100 − 32 = 68, 68 × 5 ÷ 9 = 37,78. Hava durumunda bu değer çok sıcak bir yaz gününe karşılık gelir."],
    ["350 °F fırın kaç derece?", "350 °F yaklaşık 176,7 °C'dir. Türk fırınlarında bu sıcaklık için termostat 175 ile 180 °C arasına ayarlanır; fanlı fırınlarda üretici önerisine göre biraz daha düşük seçilebilir."],
    ["Celsius-Fahrenheit formülü nedir?", "Celsius'tan Fahrenheit'a: °F = °C × 1,8 + 32. Fahrenheit'tan Celsius'a: °C = (°F − 32) × 5/9. İki ölçek arasında hem 32 derecelik bir kayma hem de 1,8 katlık aralık farkı vardır."],
    ["Kelvin ile Celsius arasındaki fark nedir?", "İkisinde de bir derecelik aralık aynıdır, yalnızca sıfır noktaları farklıdır. Kelvin mutlak sıfırdan başlar; dönüşüm K = °C + 273,15 formülüyle yapılır ve Kelvin derece işaretiyle yazılmaz."],
    ["Hangi ülkeler Fahrenheit kullanır?", "Fahrenheit'ı günlük hayatta resmî ölçek olarak kullanan başlıca ülke ABD'dir; Bahamalar, Belize, Cayman Adaları ve Palau gibi birkaç küçük ülke ve bölge de kullanır. Dünyanın geri kalanı Celsius kullanır."],
    ["Vücut ısısı Fahrenheit olarak kaç?", "Normal vücut ısısı olarak bilinen 37 °C, 98,6 °F'a eşittir. 38 °C yaklaşık 100,4 °F, 40 °C ise 104 °F eder; yüksek ateşte ve eşlik eden ciddi belirtilerde hekime başvurulmalıdır."],
    ["Akılda tutmanın kolay yolu nedir?", "Yaklaşık değer için Fahrenheit'tan 30 çıkarıp ikiye bölebilir, Celsius'u ikiyle çarpıp 30 ekleyebilirsiniz. Bu kestirme hava sıcaklığında iş görür ama fırın sıcaklıklarında 15–20 derece yanılttığı için orada tam formül kullanılmalıdır."]
  ],
  tools: ["celsius-fahrenheit-cevir", "celsius-kelvin-cevir", "fahrenheit-kelvin-cevir"],
  related: ["1-pound-kac-kg", "1-su-bardagi-kac-gram"],
  sources: [
    ["BIPM – SI Broşürü (kelvin tanımı)", "https://www.bipm.org/en/publications/si-brochure"],
    ["TÜBİTAK Ulusal Metroloji Enstitüsü", "https://www.ume.tubitak.gov.tr/"]
  ]
};
