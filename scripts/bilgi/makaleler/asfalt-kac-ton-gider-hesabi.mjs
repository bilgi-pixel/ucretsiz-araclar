export default {
  slug: "asfalt-kac-ton-gider-hesabi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Asfalt Kaç Ton Gider? Metrekare ve Kalınlığa Göre Asfalt Miktarı Hesabı",
  pageTitle: "Asfalt Kaç Ton Gider? m² ve Kalınlığa Göre Asfalt Hesabı",
  description: "Asfalt tonajı alan × sıkıştırılmış kalınlık × yoğunlukla bulunur; 1 m²'ye 5 cm asfalt yaklaşık 120 kg'dır. Fire payı, kamyon sayısı, binder ve aşınma tabakası örneği.",
  keywords: ["asfalt hesabı", "asfalt kaç ton", "1 m2 asfalt kaç kg", "asfalt yoğunluğu", "5 cm asfalt kaç ton", "asfalt kamyonu kaç ton", "otopark asfaltı", "binder aşınma tabakası"],
  lead: "Gereken asfalt miktarı, alanın (m²) sıkıştırılmış kalınlıkla (m) ve asfaltın yoğunluğuyla (ton/m³) çarpılmasıyla bulunur. Sıcak karışım asfaltın sıkıştırılmış yoğunluğu genellikle 2,3–2,45 ton/m³ arasında alınır; 2,4 kabulüyle 1 m² alana 5 cm asfalt yaklaşık 120 kg, 1.000 m²'lik bir otoparka 5 cm asfalt 120 ton eder. Siparişte yüzde birkaçlık fire payı eklenir ve toplam, kamyon kapasitesine bölünerek sefer sayısı bulunur. Aşağıda formülü, çözümlü örnekleri, tabaka kalınlıklarını ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Asfalt (ton) = alan (m²) × sıkıştırılmış kalınlık (m) × yoğunluk (t/m³).",
    "Sıcak asfaltın sıkıştırılmış yoğunluğu genellikle 2,3–2,45 t/m³ alınır; hesaplarda 2,4 yaygındır.",
    "1 m² × 5 cm = 0,05 m³; 0,05 × 2,4 = 0,12 ton, yani yaklaşık 120 kg.",
    "Her 1 cm kalınlık, metrekare başına yaklaşık 24 kg asfalt demektir.",
    "Siparişe genellikle %3–5 fire payı eklenir; kamyon sayısı yukarı yuvarlanır.",
    "Yollarda alt kat binder, üst kat aşınma tabakası olarak iki ayrı kalınlıkta serilir ve ayrı hesaplanır."
  ],
  figure: {
    alt: "Asfalt tonaj hesabı şeması: 40 metre çarpı 25 metre otopark, 1.000 metrekare, 5 santimetre sıkıştırılmış kalınlık, 50 metreküp, 2,4 ton bölü metreküp yoğunlukla 120 ton; yüzde 5 fire ile 126 ton, 25 tonluk kamyonla 6 sefer.",
    caption: "Hesap üç çarpma ve bir yuvarlamadan oluşur. Örnekteki yoğunluk, fire payı ve kamyon kapasitesi yaygın kabullerdir; asfalt plentinin verdiği değerle güncelleyin.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1.000 m² otoparka 5 cm asfalt</text>
  <polygon points="60,150 300,150 360,100 120,100" class="ps"/>
  <polygon points="60,150 300,150 300,166 60,166" class="p"/>
  <polygon points="300,150 360,100 360,116 300,166" class="p"/>
  <text x="180" y="186" class="sm mid b">40 m</text>
  <text x="352" y="146" class="sm b">25 m</text>
  <text x="208" y="132" class="sm mid b">1.000 m²</text>
  <text x="60" y="210" class="sm t2">Sıkıştırılmış kalınlık: 5 cm = 0,05 m</text>
  <rect x="400" y="56" width="290" height="44" rx="8" class="sf sb"/>
  <text x="545" y="84" class="mid">1.000 × 0,05 = <tspan class="b">50 m³</tspan></text>
  <rect x="400" y="110" width="290" height="44" rx="8" class="sf sb"/>
  <text x="545" y="138" class="mid">50 × 2,4 t/m³ = <tspan class="b">120 ton</tspan></text>
  <rect x="400" y="164" width="290" height="44" rx="8" class="ps"/>
  <text x="545" y="192" class="mid">+ %5 fire = <tspan class="b">126 ton</tspan></text>
  <rect x="400" y="218" width="290" height="44" rx="8" class="p"/>
  <text x="545" y="246" class="mid sf">126 ÷ 25 t = 5,04 → <tspan class="b">6 sefer</tspan></text>
  <rect x="30" y="290" width="660" height="94" rx="8" class="sf sb"/>
  <rect x="30" y="290" width="8" height="94" class="a"/>
  <text x="54" y="316" class="b">Pratik kural: her 1 cm ≈ 24 kg/m²</text>
  <text x="54" y="342" class="sm t2">4 cm ≈ 96 kg · 5 cm ≈ 120 kg · 6 cm ≈ 144 kg · 8 cm ≈ 192 kg (2,4 t/m³)</text>
  <text x="54" y="366" class="sm t2">Kalınlık daima sıkıştırılmış (silindir sonrası) değerle yazılır.</text>
</svg>`
  },
  sections: [
    {
      h: "Asfalt miktarı nasıl hesaplanır?",
      p: [
        "Asfalt kütleyle satılır ve sipariş edilir; plentten çıkan sıcak karışım kamyonlarla tonla gelir. Oysa sahadaki ihtiyacınızı alan ve kalınlık olarak, yani hacimle bilirsiniz. Hesap, hacmi yoğunlukla çarparak kütleye çevirmekten ibarettir.",
        "Kritik nokta kalınlığın <strong>sıkıştırılmış</strong> değer olmasıdır. Projede ya da teklifte \"5 cm asfalt\" yazıyorsa bu, silindirle sıkıştırıldıktan sonraki kalınlıktır. Sıkıştırılmış kalınlıkla sıkıştırılmış yoğunluğu birlikte kullandığınızda sonuç doğrudan sipariş edilecek tonajı verir."
      ],
      formula: "Hacim (m³) = alan (m²) × sıkıştırılmış kalınlık (m)\nAsfalt (ton) = hacim × yoğunluk (t/m³)\nSipariş (ton) = asfalt × (1 + fire oranı)",
      after: [
        "Alanı hesaplarken düzensiz şekilleri dikdörtgen ve üçgenlere bölün, sonra toplayın. Yoğunluk kavramının genel anlatımı için [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "1 m² alana 5 cm asfalt kaç kg gider?",
      p: [
        "1 m²'lik bir alanda 5 cm kalınlık 0,05 m³ hacim demektir. 2,4 t/m³ yoğunlukla bu 0,12 ton, yani 120 kg eder. Bu orantı sayesinde pratik bir kural elde edilir: her 1 cm kalınlık, metrekare başına yaklaşık 24 kg asfalttır."
      ],
      table: {
        head: ["Sıkıştırılmış kalınlık", "1 m² için (2,4 t/m³)", "100 m² için", "1.000 m² için"],
        rows: [
          ["3 cm", "72 kg", "7,2 ton", "72 ton"],
          ["4 cm", "96 kg", "9,6 ton", "96 ton"],
          ["5 cm", "120 kg", "12 ton", "120 ton"],
          ["6 cm", "144 kg", "14,4 ton", "144 ton"],
          ["8 cm", "192 kg", "19,2 ton", "192 ton"],
          ["10 cm", "240 kg", "24 ton", "240 ton"]
        ],
        caption: "Değerlere fire payı dahil değildir. Yoğunluk karışım tipine göre değişir; plent değeri esas alınmalıdır."
      }
    },
    {
      h: "Sıcak asfaltın yoğunluğu kaç ton/m³ alınır?",
      p: [
        "Bitümlü sıcak karışımın yoğunluğu agrega cinsine, bitüm oranına ve sıkıştırma derecesine göre değişir. Sıkıştırılmış hâlde değer genellikle <strong>2,3–2,45 t/m³</strong> aralığındadır; ön hesaplarda 2,4 t/m³ yaygın bir kabuldür. Bazalt gibi ağır agregalarla üretilen karışımlar bu aralığın üst ucuna, kireçtaşı agregalı karışımlar ise alt ve orta kısmına yakındır.",
        "Kesin değer, karışımı üreten plentin laboratuvar raporunda ya da teklifte yer alır. Büyük işlerde bu değer üzerinden hesap yapmak, birkaç tonluk fazla ya da eksik siparişin önüne geçer. 2,3 ile 2,45 arasındaki fark 1.000 m²'de 5 cm için 7,5 tona karşılık gelir."
      ]
    },
    {
      h: "Sıkıştırma payı hesaba nasıl katılır?",
      p: [
        "Asfalt serici makineden çıkan gevşek karışım, silindirle sıkıştırıldığında kalınlığı azalır. Bu yüzden 5 cm sıkıştırılmış kalınlık hedefleniyorsa serim yaklaşık %20–25 daha kalın yapılır; örneğin 6–6,5 cm civarında serilir. Ancak bu, sipariş tonajını değiştirmez: sıkıştırma kütleyi azaltmaz, yalnızca hacmi küçültür.",
        "Sık yapılan hata, gevşek serim kalınlığını sıkıştırılmış yoğunlukla çarpmaktır; bu, gereğinden %20–25 fazla asfalt siparişine yol açar. Doğru yöntem iki seçenekten birini tutarlı kullanmaktır: ya sıkıştırılmış kalınlık × sıkıştırılmış yoğunluk ya da gevşek kalınlık × gevşek yoğunluk. Pratikte ilki çok daha yaygındır."
      ]
    },
    {
      h: "Çözümlü örnek: otopark ve kamyon sayısı",
      ol: [
        "Otopark ölçüsü 40 m × 25 m: alan 1.000 m².",
        "Sıkıştırılmış kalınlık 5 cm = 0,05 m; hacim 1.000 × 0,05 = 50 m³.",
        "Yoğunluk 2,4 t/m³: asfalt 50 × 2,4 = 120 ton.",
        "Fire payı %5: 120 × 1,05 = 126 ton sipariş.",
        "Kamyon kapasitesi 25 ton: 126 ÷ 25 = 5,04 → 6 sefer gerekir; son kamyon yalnızca 1 ton taşıyacağı için fire payını %4'e indirip 5 seferle işi bitirmenin mümkün olup olmadığını plentle konuşmak mantıklı olabilir."
      ],
      after: [
        "Bu hesabı ölçülerinizle yapmak için [[arac:asfalt-hesapla|Asfalt Hesaplama]] aracına uzunluk, genişlik, sıkıştırılmış kalınlık, yoğunluk, fire payı ve kamyon kapasitesini girmeniz yeterlidir. Düzensiz alanlarda hacmi parça parça bulmak için [[arac:hacim-hesapla|Hacim Hesaplama]] aracı da işinizi kolaylaştırır."
      ]
    },
    {
      h: "Sahada ölçü alırken nelere dikkat edilir?",
      p: [
        "Tonaj hesabının doğruluğu, ölçünün doğruluğuna bağlıdır. Teklif almadan önce alanı birkaç parçaya bölerek ölçmek ve kalınlığı birden fazla noktada kontrol etmek, fazla ya da eksik siparişin en etkili önlemidir."
      ],
      ol: [
        "Alanı dikdörtgen, üçgen ve yamuk gibi basit parçalara bölün ve her parçanın kenarlarını şerit metreyle ölçün.",
        "Bina, ağaç havuzu, rögar gibi asfaltlanmayacak alanları toplamdan düşün.",
        "Mevcut zeminin kotunu birkaç noktada kontrol edin; çukur bölgeler ortalama kalınlığı artırır.",
        "Eğimli rampalarda yatay izdüşüm yerine eğik yüzey uzunluğunu kullanın.",
        "Ölçüleri bir krokiye yazın ve plent ya da yükleniciyle aynı kroki üzerinden konuşun."
      ],
      after: [
        "Yama ve küçük onarım işlerinde soğuk asfalt torbalarla da satılır. Bu ürünlerde ambalaj üzerinde \"bir torba şu kalınlıkta yaklaşık şu kadar alanı kaplar\" bilgisi yer alır; hesabı yine alan × kalınlık mantığıyla, üreticinin verdiği kaplama değerine göre yapın."
      ]
    },
    {
      h: "Binder ve aşınma tabakası farkı nedir?",
      p: [
        "Karayolu kaplamalarında sıcak asfalt genellikle iki katmanda serilir. Alttaki <strong>binder</strong> (bitümlü bağlayıcı tabaka) daha iri agregalıdır, yükü taşır ve yüzeyi düzeltir. Üstteki <strong>aşınma tabakası</strong> daha ince agregalıdır; trafiğin aşındırıcı etkisine, suya ve kaymaya karşı dayanıklıdır. Tabakaların altında ise kırmataş ya da plent-miks temel tabakası bulunur ve asfalt hesabına dahil değildir.",
        "Her tabaka ayrı kalınlık ve bazen ayrı yoğunlukla hesaplanır, sonra toplanır. Site içi yol ve otoparklarda sık görülen bir düzen, birkaç santimetre binder ve üzerinde 4–5 cm aşınma tabakasıdır; kesin kalınlıklar zemin, trafik yükü ve projeye göre mühendis tarafından belirlenir."
      ],
      table: {
        head: ["Tabaka", "Örnek kalınlık", "1.000 m² için hacim", "Tonaj (2,4 t/m³)"],
        rows: [
          ["Binder", "6 cm", "60 m³", "144 ton"],
          ["Aşınma", "4 cm", "40 m³", "96 ton"],
          ["Toplam", "10 cm", "100 m³", "240 ton"]
        ],
        caption: "Kalınlıklar örnektir. Fire payı ve kamyon planlaması tabaka başına ayrı yapılır, çünkü iki tabaka genellikle farklı günlerde serilir."
      }
    },
    {
      h: "Asfalt ile beton zemin ve parke taşı nasıl karşılaştırılır?",
      p: [
        "Asfalt, beton ve kilit parke taşı (parke) farklı ihtiyaçlara hizmet eder. Asfalt hızlı serilir ve kısa sürede trafiğe açılır, esnektir; ancak bakım ister ve sıcakta yumuşayabilir. Beton daha rijit ve uzun ömürlüdür, ama derz detayları ve kür süresi gerektirir. Kilit parke taşı küçük alanlarda kolay uygulanır, sökülüp yeniden döşenebilir ve yağmur suyunun bir kısmını derzlerden geçirebilir.",
        "Maliyet karşılaştırması yaparken birim fiyatları aynı birime çevirmek gerekir: asfalt tonla, beton metreküple, parke taşı metrekareyle satılır. Önce her seçenek için gereken miktarı bulun, sonra güncel tekliflerle çarpın. Beton için [[bilgi:1-m3-beton-icin-kac-torba-cimento|1 m³ beton]] yazısı ve [[arac:beton-hesapla|Beton Hesaplama]] aracı, parke için [[bilgi:kilit-tasi-metrekare-hesabi|kilit taşı metrekare hesabı]] yazısı ve [[arac:kilit-tasi-hesapla|Kilit Taşı Hesaplama]] aracı yardımcı olur."
      ],
      ul: [
        "<strong>Bahçe yolu ve bina girişi:</strong> Küçük alanlarda asfalt için plent ve makine maliyeti ağır gelebilir; parke taşı çoğu zaman daha pratiktir.",
        "<strong>Otopark ve site içi yol:</strong> Geniş alanlarda asfalt hızlı uygulama avantajı sağlar.",
        "<strong>Ağır araç alanları:</strong> Proje mühendisinin hesabına göre beton ya da kalın asfalt tercih edilir."
      ]
    },
    {
      h: "Asfalt hesabında sık yapılan hatalar",
      ul: [
        "<strong>Santimetreyi metreye çevirmemek:</strong> 5 cm'yi 5 olarak çarpmak sonucu 100 kat büyütür; 0,05 m kullanın.",
        "<strong>Gevşek kalınlıkla hesap yapmak:</strong> Serim kalınlığı sıkıştırılmış yoğunlukla çarpılırsa fazla sipariş verilir.",
        "<strong>Kenar ve eğimleri unutmak:</strong> Rampalar, rögar çevreleri ve bordür kenarlarında kalınlık artabilir; küçük bir ek pay bırakın.",
        "<strong>Alt temeli asfaltla karıştırmak:</strong> Kırmataş ya da plent-miks temel ayrı hesaplanır. Kazı ve dolgu hacmi için [[bilgi:hafriyat-hesabi-nasil-yapilir|hafriyat hesabı]] yazısına bakın.",
        "<strong>Kamyon sayısını aşağı yuvarlamak:</strong> 5,04 sefer 5 değil 6 sefer demektir; ya da fire payı plentle yeniden konuşulur."
      ],
      note: "Sıcak asfalt yüksek sıcaklıkta serilir ve yanık riski taşır; uygulama yetkili ekip ve uygun ekipmanla yapılmalı, çalışma alanı trafiğe ve yayalara kapatılmalıdır."
    }
  ],
  faq: [
    ["Asfalt miktarı nasıl hesaplanır?", "Alan metrekare olarak sıkıştırılmış kalınlıkla (metre) çarpılarak hacim bulunur, hacim de yoğunlukla çarpılarak tona çevrilir. 1.000 m² alana 5 cm asfalt için 1.000 × 0,05 × 2,4 = 120 ton bulunur; siparişe fire payı eklenir."],
    ["1 m² alana 5 cm asfalt kaç kg gider?", "1 m² × 0,05 m = 0,05 m³ hacim eder; 2,4 t/m³ yoğunlukla bu yaklaşık 0,12 ton, yani 120 kg'dır. Her 1 cm kalınlık metrekare başına yaklaşık 24 kg asfalta karşılık gelir."],
    ["Sıcak asfaltın yoğunluğu kaç ton/m³ alınır?", "Sıkıştırılmış sıcak karışım asfaltın yoğunluğu genellikle 2,3 ile 2,45 t/m³ arasındadır ve ön hesaplarda 2,4 t/m³ yaygın olarak kullanılır. Kesin değer, karışımı üreten plentin laboratuvar raporundan alınmalıdır."],
    ["Sıkıştırma payı hesaba nasıl katılır?", "Gevşek asfalt sıkıştırılmış kalınlığın yaklaşık yüzde 20–25 fazlası kadar kalın serilir, ama bu sipariş tonajını değiştirmez. Tonaj, sıkıştırılmış kalınlık ile sıkıştırılmış yoğunluk çarpılarak hesaplanmalıdır."],
    ["Kaç kamyon asfalt gerekir?", "Fire payı eklenmiş toplam tonaj kamyon kapasitesine bölünür ve sonuç yukarı yuvarlanır. 126 tonluk sipariş 25 tonluk kamyonlarla 5,04 sefere, yani 6 sefere karşılık gelir; kapasiteyi plentten teyit edin."],
    ["Binder ve aşınma tabakası farkı nedir?", "Binder, iri agregalı ve yükü taşıyan alt asfalt tabakasıdır; aşınma tabakası ise ince agregalı, trafiğe, suya ve kaymaya dayanıklı üst tabakadır. İki tabaka ayrı kalınlıklarda serilir ve tonajları ayrı hesaplanır."],
    ["Asfalt ile beton zemin maliyeti nasıl karşılaştırılır?", "Önce her seçenek için gereken miktar kendi birimiyle bulunur: asfalt ton, beton metreküp, parke taşı metrekare. Sonra güncel birim fiyatlarla çarpılır; uygulama, bakım ve ömür farkları da karşılaştırmaya katılmalıdır."],
    ["Bahçe yolu için asfalt mı parke taşı mı?", "Küçük alanlarda asfalt için plent, serici ve silindir gibi makine maliyetleri ağır gelebilir; bu yüzden bahçe yolu ve giriş gibi alanlarda kilit parke taşı çoğu zaman daha pratiktir. Geniş otoparklarda ise asfalt hızlı uygulama avantajı sağlar."],
    ["5 cm asfalt 100 metrekareye kaç ton gider?", "100 m² × 0,05 m = 5 m³ hacim eder; 2,4 t/m³ yoğunlukla bu 12 tondur. Yüzde 5 fire payıyla sipariş 12,6 ton olur; küçük işlerde plentin asgari sipariş miktarını da sormak gerekir."],
    ["Asfalt hesabında fire payı ne kadar alınmalı?", "Düzgün geometrili geniş alanlarda yüzde 3–5 fire payı yaygın bir kabuldür. Çok parçalı, kenarı bol ya da zemini düzensiz alanlarda bu oran biraz artırılabilir; kesin oranı uygulamayı yapacak ekip ve plentle birlikte belirlemek en sağlıklısıdır."]
  ],
  tools: ["asfalt-hesapla", "hacim-hesapla", "beton-hesapla", "kilit-tasi-hesapla"],
  related: ["hafriyat-hesabi-nasil-yapilir", "1-m3-beton-icin-kac-torba-cimento", "kilit-tasi-metrekare-hesabi", "yogunluk-nedir-nasil-hesaplanir"],
  sources: [
    ["Karayolları Genel Müdürlüğü – Teknik şartnameler", "https://www.kgm.gov.tr/"]
  ]
};
