export default {
  slug: "klima-kac-btu-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Klima Kaç BTU Olmalı? Metrekareye Göre BTU Hesaplama Tablosu",
  pageTitle: "Klima Kaç BTU Olmalı? Metrekareye Göre BTU Hesaplama",
  description: "Klima kapasitesi kabaca oda alanı × 300–450 BTU/m² ile bulunur; ılıman iklimde 9.000 BTU yaklaşık 26 m², 12.000 BTU 34 m², 18.000 BTU 51 m² soğutur. Tablo ve örnek.",
  keywords: ["klima btu hesaplama", "kaç btu klima almalıyım", "9000 btu kaç metrekare", "12000 btu kaç m2", "18000 btu kaç metrekare soğutur", "btu nedir", "btu kw çevirme", "klima kaç watt"],
  lead: "Bir oda için gereken klima kapasitesi kabaca <strong>oda alanı × iklim katsayısı</strong> ile bulunur; katsayı serin bölgelerde yaklaşık 300, ılıman bölgelerde 350, sıcak bölgelerde 400, çok sıcak bölgelerde 450 BTU/m² alınır. Buna göre ılıman bir şehirde <strong>9.000 BTU</strong> yaklaşık 26 m², <strong>12.000 BTU</strong> yaklaşık 34 m², <strong>18.000 BTU</strong> yaklaşık 51 m² alanı soğutur. Tavan yüksekliği, güneş alma durumu ve odadaki kişi sayısı sonucu değiştirir. Bu sayfada formülü, tabloyu, BTU-kW dönüşümünü ve elektrik tüketimini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Pratik formül: BTU/saat = alan (m²) × iklim katsayısı × (tavan yüksekliği ÷ 2,7) × güneş çarpanı + kişi eki.",
    "İklim katsayısı: serin 300, ılıman 350, sıcak 400, çok sıcak 450 BTU/m².",
    "Güneş alan odada sonuç yaklaşık %10 artırılır, gölgede kalan odada %10 azaltılır; iki kişiden sonraki her kişi için 600 BTU eklenir.",
    "1 BTU/saat ≈ 0,293 W; 12.000 BTU yaklaşık 3,52 kW soğutma gücüdür.",
    "Klimanın çektiği elektrik, soğutma gücünün verimlilik oranına (EER/SEER) bölünmesiyle tahmin edilir.",
    "Gereğinden büyük klima odayı çabuk soğutur ama sık durup kalkar, nemi iyi almaz ve konforu düşürebilir."
  ],
  figure: {
    alt: "Klima kapasitesi ve soğutabileceği alan: ılıman iklimde 9.000 BTU 26 m², 12.000 BTU 34 m², 18.000 BTU 51 m², 24.000 BTU 69 m²; örnek 30 m² güneş alan salon, 3 kişi, 12.150 BTU.",
    caption: "Çubuklar ılıman iklimde (350 BTU/m²) her kapasite sınıfının yaklaşık kaç metrekareye yettiğini gösterir. Alttaki kart, güneş alan 30 m²'lik bir salon için örnek hesaptır. Değerler yaklaşıktır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hangi klima kaç m² soğutur? (ılıman iklim)</text>
  <g class="sm">
    <text x="20" y="78" class="b">9.000 BTU</text>
    <rect x="130" y="62" width="182" height="26" rx="4" class="ps"/><text x="322" y="80" class="b">≈ 26 m²</text>
    <text x="20" y="118" class="b">12.000 BTU</text>
    <rect x="130" y="102" width="238" height="26" rx="4" class="ps"/><text x="378" y="120" class="b">≈ 34 m²</text>
    <text x="20" y="158" class="b">18.000 BTU</text>
    <rect x="130" y="142" width="357" height="26" rx="4" class="p"/><text x="497" y="160" class="b">≈ 51 m²</text>
    <text x="20" y="198" class="b">24.000 BTU</text>
    <rect x="130" y="182" width="483" height="26" rx="4" class="p"/><text x="623" y="200" class="b">≈ 69 m²</text>
  </g>
  <text x="130" y="232" class="sm t2">Sıcak iklimde (400 BTU/m²) aynı sınıflar sırasıyla ≈ 23, 30, 45 ve 60 m²'ye iner.</text>
  <rect x="20" y="250" width="680" height="150" rx="12" class="sf sb"/>
  <rect x="20" y="250" width="8" height="150" class="p"/>
  <text x="44" y="278" class="b">Örnek: 30 m² salon, ılıman, 2,7 m tavan, güneş alıyor, 3 kişi</text>
  <text x="44" y="306" class="sm">30 × 350 = 10.500 BTU (temel)</text>
  <text x="44" y="328" class="sm">× 1,10 güneş çarpanı = 11.550 BTU</text>
  <text x="44" y="350" class="sm">+ 600 (3. kişi) = <tspan class="b">12.150 BTU/saat</tspan></text>
  <text x="44" y="380" class="b p">12.000 BTU sınırda; 18.000 BTU rahat karşılar</text>
  <text x="560" y="330" class="xl mid">≈ 3,56</text>
  <text x="560" y="356" class="sm mid">kW soğutma</text>
</svg>`
  },
  sections: [
    {
      h: "BTU nedir?",
      p: [
        "BTU (British Thermal Unit), bir pound suyun sıcaklığını 1 Fahrenheit derece artırmak için gereken ısı miktarını tanımlayan eski bir enerji birimidir. Klimalarda kullanılan değer aslında <strong>BTU/saat</strong>tir, yani klimanın bir saatte ortamdan çekebildiği ısı miktarıdır. Günlük dilde \"12.000 BTU klima\" denildiğinde 12.000 BTU/saat soğutma kapasitesi kastedilir.",
        "Uluslararası birim sisteminde güç watt (W) ya da kilowatt (kW) ile ifade edilir. 1 BTU/saat yaklaşık 0,293 W'a eşittir. Bu yüzden klima etiketlerinde soğutma kapasitesi hem BTU hem kW olarak yazılabilir. Burada önemli bir ayrım vardır: etiketteki kW soğutma gücüdür, klimanın prizden çektiği elektrik değildir; elektrik tüketimi çok daha düşüktür."
      ],
      formula: "1 BTU/saat ≈ 0,29307 W\nkW = BTU/saat × 0,00029307\nBTU/saat = kW × 3.412",
      table: {
        head: ["Kapasite", "Soğutma gücü (kW)"],
        rows: [
          ["9.000 BTU/saat", "≈ 2,64 kW"],
          ["12.000 BTU/saat", "≈ 3,52 kW"],
          ["18.000 BTU/saat", "≈ 5,28 kW"],
          ["24.000 BTU/saat", "≈ 7,03 kW"]
        ]
      },
      after: [
        "Bu dönüşümü farklı değerlerle yapmak için [[arac:btu-kw-cevir|BTU Kilovat Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Klima kaç BTU olmalı? Hesaplama formülü",
      p: [
        "Kesin kapasiteyi bir uzman ısı kazancı hesabıyla belirler; bu hesap duvar ve pencere yalıtımı, cam alanı, cephe yönü, kat ve odadaki cihazlar gibi pek çok unsuru içerir. Satın alma kararı öncesinde ise metrekare katsayısına dayanan pratik yöntem iyi bir başlangıç sağlar. Sitemizdeki hesaplayıcı da bu yaklaşımı kullanır."
      ],
      formula: "BTU/saat = alan (m²) × iklim katsayısı × (tavan yüksekliği ÷ 2,7) × güneş çarpanı + kişi eki\nİklim katsayısı: serin 300 · ılıman 350 · sıcak 400 · çok sıcak 450\nGüneş çarpanı: gölge 0,90 · normal 1,00 · yoğun güneş 1,10\nKişi eki: iki kişiden sonraki her kişi için + 600 BTU/saat",
      ul: [
        "<strong>Alan:</strong> Odanın eni ile boyunu çarparak net metrekareyi bulun. L şeklindeki salonları dikdörtgenlere bölüp toplayın.",
        "<strong>İklim:</strong> Yazın gündüz sıcaklığı çoğunlukla 30 °C altında kalan yerler için serin, 30–35 °C için ılıman, 35–40 °C için sıcak, 40 °C ve üzerini sık görenler için çok sıcak seçin.",
        "<strong>Tavan yüksekliği:</strong> 2,7 m standart kabul edilir; daha yüksek tavanlar hacmi ve ihtiyacı orantılı artırır.",
        "<strong>Güneş:</strong> Güney ve batıya bakan, büyük camlı ya da çatı katındaki odalar daha fazla ısı alır.",
        "<strong>Kişi sayısı:</strong> İnsan vücudu sürekli ısı yayar; kalabalık salonlarda bu etki belirginleşir."
      ],
      after: [
        "Odanızın alanını bilmiyorsanız [[arac:metrekare-hesapla|Metrekare Hesaplama]] aracıyla bulabilir, ardından [[arac:klima-btu-hesapla|Klima BTU Hesaplama]] aracına iklim, tavan, güneş ve kişi bilgilerini girerek önerilen kapasite sınıfını görebilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnekler",
      table: {
        head: ["Oda", "Koşullar", "Hesap", "Sonuç", "Önerilen sınıf"],
        rows: [
          ["16 m² yatak odası", "Sıcak iklim, gölgede, 2 kişi", "16 × 400 × 0,90", "5.760 BTU", "9.000 BTU"],
          ["30 m² salon", "Ilıman, güneş alıyor, 3 kişi", "30 × 350 × 1,10 + 600", "12.150 BTU", "12.000 sınırda, 18.000 rahat"],
          ["40 m² salon", "Ilıman, 3,0 m tavan, 4 kişi", "40 × 350 × (3,0 ÷ 2,7) + 1.200", "16.756 BTU", "18.000 BTU"],
          ["22 m² çalışma odası", "Serin iklim, normal güneş, 2 kişi", "22 × 300", "6.600 BTU", "9.000 BTU"]
        ],
        caption: "Önerilen sınıf, hesaplanan değere en yakın üst piyasa kapasitesidir. Sonuçlar yaklaşıktır; kesin seçim için yetkili servise danışın."
      },
      p: [
        "İkinci örnek, kapasite seçiminin neden yalnızca matematik olmadığını gösterir. Hesaplanan 12.150 BTU, 12.000 BTU'luk sınıfın çok az üzerindedir. Bu salonda 12.000 BTU'luk bir klima çoğu gün yeterli olur ama en sıcak öğleden sonralarında zorlanabilir. Salon batıya bakıyor ve büyük cam yüzeyi varsa ya da yaz sıcaklıkları bölgede sık sık 35 °C'yi aşıyorsa 18.000 BTU daha rahat bir seçimdir."
      ]
    },
    {
      h: "Metrekareye göre BTU tablosu",
      p: [
        "Aşağıdaki tablo, standart tavan yüksekliği, normal güneş ve en fazla iki kişi varsayımıyla her kapasite sınıfının yaklaşık kaç metrekareye yettiğini gösterir. Değerler kapasitenin iklim katsayısına bölünmesiyle bulunmuştur."
      ],
      table: {
        head: ["Kapasite", "Serin (300)", "Ilıman (350)", "Sıcak (400)", "Çok sıcak (450)"],
        rows: [
          ["9.000 BTU", "≈ 30 m²", "≈ 26 m²", "≈ 23 m²", "≈ 20 m²"],
          ["12.000 BTU", "≈ 40 m²", "≈ 34 m²", "≈ 30 m²", "≈ 27 m²"],
          ["18.000 BTU", "≈ 60 m²", "≈ 51 m²", "≈ 45 m²", "≈ 40 m²"],
          ["24.000 BTU", "≈ 80 m²", "≈ 69 m²", "≈ 60 m²", "≈ 53 m²"]
        ],
        caption: "Güneş alan odalarda alanı yaklaşık %10 azaltarak, gölgede kalan odalarda %10 artırarak okuyun."
      }
    },
    {
      h: "Klima kaç watt elektrik harcar?",
      p: [
        "Klimanın prizden çektiği güç, soğutma kapasitesinden çok daha düşüktür; çünkü klima ısıyı üretmez, bir yerden başka bir yere taşır. Bu verimlilik, enerji etiketinde EER (anlık verim) ya da SEER (mevsimsel verim) olarak gösterilir. Örneğin EER değeri 3,2 olan bir klima, 1 kW elektrikle 3,2 kW soğutma sağlar."
      ],
      formula: "Elektrik gücü (kW) ≈ soğutma gücü (kW) ÷ EER\nÖrnek: 3,52 kW ÷ 3,2 ≈ 1,10 kW\nGünlük tüketim (en fazla) ≈ 1,10 kW × 8 saat ≈ 8,8 kWh",
      ul: [
        "Hesaplanan değer, kompresörün kesintisiz tam güçte çalıştığı en kötü durumdur. İnverter klimalar oda sıcaklığına ulaştıktan sonra gücü düşürdüğü için gerçek tüketim genellikle bunun altındadır.",
        "Aylık maliyeti bulmak için günlük kWh değerini gün sayısı ve elektrik birim fiyatıyla çarpın. Birim fiyat tarifeye ve kademeye göre değiştiği için faturanızdaki güncel değeri kullanın.",
        "Termostatı çok düşük sıcaklığa ayarlamak tüketimi artırır; dış ortamla farkı makul tutmak hem enerji hem konfor açısından faydalıdır."
      ],
      after: [
        "Klimanızın watt değerini ve kullanım süresini girerek günlük, aylık ve yıllık maliyeti görmek için [[arac:cihaz-elektrik-maliyeti-hesapla|Cihazın Elektrik Maliyeti Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Büyük klima almak zararlı mı?",
      p: [
        "\"Büyük olsun, fazlası zarar vermez\" düşüncesi klimada her zaman doğru değildir. Odaya göre çok büyük bir klima, sıcaklığı hızla düşürüp kompresörü sık sık durdurup çalıştırır. Bu kısa döngüler hem enerji verimliliğini düşürür hem de cihazın parçalarını daha fazla yorar.",
        "Daha az bilinen etki nemdir. Klima soğuturken havadaki nemi de yoğuşturarak alır; ancak bunu yapabilmesi için belirli bir süre çalışması gerekir. Sürekli kısa çalışan büyük bir klima odayı soğutur ama nemi yeterince almaz; sonuçta serin ama yapış yapış bir ortam oluşur. Küçük bir klima ise en sıcak saatlerde yetişemez ve sürekli tam güçte çalışır. Bu yüzden hesaplanan değere en yakın üst sınıfı seçmek en dengeli yaklaşımdır. İnverter teknolojisi kapasiteyi ihtiyaca göre ayarladığı için büyük seçimin olumsuz etkilerini kısmen azaltır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tüm evi tek klimayla hesaplamak:</strong> Kapalı kapılarla ayrılan odalar ayrı hesaplanmalıdır; salondaki klima yatak odasını soğutmaz.",
        "<strong>Brüt metrekareyi kullanmak:</strong> Tapu ya da ilandaki brüt alan duvarları ve ortak alanları içerir; odanın net alanını ölçün.",
        "<strong>Güneşi ve camı hesaba katmamak:</strong> Batı cepheli, büyük camlı odalarda ihtiyaç belirgin artar.",
        "<strong>Soğutma kW ile elektrik kW'ını karıştırmak:</strong> 3,52 kW soğutma, prizden 3,52 kW çekiyor demek değildir.",
        "<strong>Yalnızca BTU'ya bakıp verimi atlamak:</strong> Aynı kapasitede verimi yüksek cihaz yıllar içinde belirgin enerji tasarrufu sağlar."
      ],
      after: [
        "Kış için ısıtma tarafını da planlıyorsanız [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası ve kombi kapasitesi]] rehberi benzer bir mantıkla ısıtma yükünü anlatır. Elektrik faturasının nasıl oluştuğunu [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası rehberinde]] bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Klima kaç BTU olmalı?", "Kabaca oda alanını iklim katsayısıyla çarpın: ılıman bölgede m² başına 350, sıcak bölgede 400 BTU. Tavan yüksekliği, güneş ve kişi sayısına göre düzeltip en yakın üst kapasite sınıfını seçin."],
    ["9000 BTU klima kaç metrekareyi soğutur?", "Standart tavan ve normal güneş koşullarında ılıman iklimde yaklaşık 26 m², sıcak iklimde yaklaşık 23 m², serin iklimde yaklaşık 30 m² alanı soğutur. Güneş alan odalarda bu alan yaklaşık %10 azalır."],
    ["12000 BTU kaç m² için uygundur?", "Ilıman iklimde yaklaşık 34 m², sıcak iklimde yaklaşık 30 m², çok sıcak iklimde yaklaşık 27 m² için uygundur. Kalabalık ya da batıya bakan odalarda daha küçük alanlarda bile zorlanabilir."],
    ["18000 BTU kaç metrekareye yeter?", "Ilıman iklimde yaklaşık 51 m², sıcak iklimde yaklaşık 45 m², çok sıcak iklimde yaklaşık 40 m² alana yeter. Yüksek tavanlı ve büyük camlı salonlarda bu değerler azalır."],
    ["BTU nedir?", "BTU, İngiliz ısı birimidir; klimalarda kullanılan BTU/saat ise cihazın bir saatte ortamdan çekebildiği ısı miktarını gösterir. 1 BTU/saat yaklaşık 0,293 watt soğutma gücüne eşittir."],
    ["Güneş alan oda için BTU nasıl artırılır?", "Yoğun güneş alan, özellikle batı ya da güneye bakan ve büyük camlı odalarda hesaplanan değer yaklaşık %10 artırılır. Gölgede kalan odalarda ise yaklaşık %10 azaltmak yeterli olabilir."],
    ["BTU kW'a nasıl çevrilir?", "BTU/saat değerini 0,00029307 ile çarparak kW'a çevirebilirsiniz. 12.000 BTU yaklaşık 3,52 kW, 18.000 BTU yaklaşık 5,28 kW soğutma gücüdür; bu değerler elektrik tüketimi değildir."],
    ["Büyük klima almak zararlı mı?", "Odaya göre çok büyük klima sık durup kalkar, enerji verimi düşer ve nemi yeterince alamadığı için serin ama nemli bir ortam oluşur. Hesaplanan değere en yakın üst sınıfı seçmek en dengeli yaklaşımdır."],
    ["Klima kaç watt elektrik harcar?", "Elektrik gücü yaklaşık olarak soğutma gücünün EER değerine bölünmesiyle bulunur. EER 3,2 olan 12.000 BTU'luk bir klima tam güçte yaklaşık 1,1 kW çeker; inverter modellerde ortalama tüketim daha düşüktür."]
  ],
  tools: ["klima-btu-hesapla", "metrekare-hesapla", "btu-kw-cevir", "cihaz-elektrik-maliyeti-hesapla"],
  related: ["elektrik-faturasi-nasil-hesaplanir", "dogalgaz-faturasi-ve-kombi-kapasitesi"],
  sources: [
    ["T.C. Enerji ve Tabii Kaynaklar Bakanlığı – Enerji verimliliği", "https://enerji.gov.tr/"],
    ["BIPM – SI birimleri", "https://www.bipm.org/"]
  ]
};
