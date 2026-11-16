export default {
  slug: "siva-icin-kac-torba-gerekir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Sıva İçin Kaç Torba Gerekir? Metrekareye Sıva Miktarı ve Harç Oranı",
  pageTitle: "Sıva İçin Kaç Torba Gerekir? Metrekareye Sıva Hesabı",
  description: "Sıva hesabı: alan × kalınlık (mm) × sarfiyat formülü, kaba ve alçı sıva farkı, kalınlık, kum–çimento–kireç oranı, kapı ve pencere düşme ve torba sayısı örnekleri.",
  keywords: ["sıva hesaplama", "metrekareye kaç torba sıva", "sıva kalınlığı", "kaba sıva harç oranı", "alçı sıva tüketimi", "hazır sıva sarfiyatı", "duvar alanı hesaplama", "sıva kaç günde kurur"],
  lead: "Gereken sıva miktarı <strong>sıvanacak alan (m²) × sıva kalınlığı (mm) × ürünün sarfiyatı (kg/m²/mm)</strong> formülüyle bulunur; sonucu torba ağırlığına bölüp yukarı yuvarladığınızda torba sayısını elde edersiniz. Örneğin 44,6 m²'lik net duvara 1 cm alçı sıva yapılacaksa ve ürün milimetre başına 0,9 kg/m² tüketiyorsa yaklaşık 442 kg, yani %10 fireyle 15 torba (30 kg) gerekir. Sarfiyat değeri ürünün torbasında ya da teknik föyünde yazar. Bu sayfada kaba, ince ve alçı sıva farkını, kalınlıkları, geleneksel harç oranlarını ve adım adım hesabı bulacaksınız.",
  kisaCevap: [
    "Formül: sıva (kg) = net alan (m²) × kalınlık (mm) × sarfiyat (kg/m²/mm); %5–10 fire eklenir.",
    "Torba sayısı = toplam kg ÷ torba ağırlığı, her zaman yukarı yuvarlanır.",
    "Sarfiyat ürüne göre değişir; torba üzerindeki değeri kullanın. Alçı sıvalarda genellikle kaba sıvalardan düşüktür.",
    "Uygulamada iç duvar kaba sıvası çoğunlukla 1,5–2 cm, alçı sıva yaklaşık 1 cm, saten alçı birkaç milimetredir.",
    "Geleneksel kaba sıva harcı hacimce örneğin 1 çimento : 1 kireç : 6 kum gibi oranlarla hazırlanır.",
    "Kapı ve pencere alanları düşülür; pencere kenarı (söve) yüzeyleri ise ayrıca eklenir."
  ],
  figure: {
    alt: "Sıva hesabı kartı: 4×5 metrelik, 2,7 metre yüksekliğindeki odanın brüt duvar alanı 48,6 m², kapı ve pencere düşülünce 44,61 m². 1 cm alçı sıva ve 0,9 kg sarfiyatla 401,5 kg, yüzde 10 fireyle 441,6 kg ve 15 torba.",
    caption: "Hesabın akışı: önce net alanı bulun, sonra kalınlık ve sarfiyatla kilogramı hesaplayın, fire ekleyip torba ağırlığına bölün. Sarfiyat 0,9 kg/m²/mm örnek bir değerdir; kullandığınız ürünün torbasındaki değeri yazın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Bir odaya kaç torba sıva gider?</text>
  <g>
    <rect x="20" y="56" width="160" height="150" rx="10" class="sf sb"/>
    <text x="100" y="82" class="b mid">1. Brüt alan</text>
    <text x="100" y="110" class="sm mid">2 × (4 + 5) × 2,7</text>
    <text x="100" y="150" class="xl mid">48,6 m²</text>
    <text x="100" y="186" class="sm mid t2">çevre × yükseklik</text>

    <rect x="196" y="56" width="160" height="150" rx="10" class="dgs"/>
    <text x="276" y="82" class="b mid">2. Boşlukları düş</text>
    <text x="276" y="110" class="sm mid">kapı 0,9 × 2,1 = 1,89</text>
    <text x="276" y="130" class="sm mid">pencere 1,5 × 1,4 = 2,1</text>
    <text x="276" y="170" class="xl mid">44,61 m²</text>

    <rect x="372" y="56" width="160" height="150" rx="10" class="sf sb"/>
    <text x="452" y="82" class="b mid">3. Kilogram</text>
    <text x="452" y="110" class="sm mid">44,61 × 10 mm × 0,9</text>
    <text x="452" y="150" class="xl mid">401,5 kg</text>
    <text x="452" y="186" class="sm mid t2">+%10 fire = 441,6 kg</text>

    <rect x="548" y="56" width="152" height="150" rx="10" class="p"/>
    <text x="624" y="82" class="b mid sf">4. Torba</text>
    <text x="624" y="110" class="sm mid sf">441,6 ÷ 30 kg</text>
    <text x="624" y="156" class="xl mid sf">15 torba</text>
    <text x="624" y="186" class="sm mid sf">14,7 → yukarı yuvarla</text>
  </g>
  <polygon points="183,131 193,124 193,138" class="t2"/>
  <polygon points="359,131 369,124 369,138" class="t2"/>
  <polygon points="535,131 545,124 545,138" class="t2"/>
  <text x="20" y="246" class="b">Sıva türüne göre tipik kalınlık (uygulamada)</text>
  <g class="sm">
    <rect x="20" y="262" width="400" height="30" class="ps"/><text x="430" y="282">Kaba sıva (iç): 15–20 mm</text>
    <rect x="20" y="300" width="200" height="30" class="oks"/><text x="430" y="320">Alçı sıva: yaklaşık 10 mm</text>
    <rect x="20" y="338" width="50" height="30" class="a"/><text x="430" y="358">Saten alçı / ince sıva: 1–3 mm</text>
  </g>
  <text x="20" y="400" class="sm t2">Çubuk uzunlukları kalınlıkla orantılıdır (20 mm = 400 birim). Değerler yüzeyin düzgünlüğüne göre değişir.</text>
</svg>`
  },
  sections: [
    {
      h: "Sıva nedir? Kaba sıva, ince sıva ve alçı sıva farkı",
      p: [
        "Sıva, tuğla, briket ya da beton gibi duvar yüzeylerini düzgünleştirmek, korumak ve boyaya hazırlamak için uygulanan harç tabakasıdır. Sıvanın türü, duvarın iç mi dış mı olduğuna, yüzeyin ne kadar bozuk olduğuna ve üzerine ne uygulanacağına göre seçilir.",
        "<strong>Kaba sıva</strong>, duvarın ilk ve en kalın katmanıdır. Geleneksel olarak çimento, kireç, kum ve sudan şantiyede hazırlanır; günümüzde fabrikada karıştırılmış hazır kaba sıvalar da yaygındır. Duvardaki büyük düzensizlikleri kapatır ve sağlam bir alt yüzey oluşturur. Dış cephe ve ıslak hacimlerde çimento esaslı kaba sıva tercih edilir.",
        "<strong>İnce sıva</strong>, kaba sıvanın üzerine uygulanan, daha ince taneli ve pürüzsüz yüzey veren katmandır. <strong>Alçı sıva</strong> ise çoğunlukla iç mekânda, kaba sıvanın üzerine ya da düzgün yüzeylere doğrudan uygulanan alçı esaslı sıvadır; perlitli ve makine alçıları bu gruptadır. Alçı sıvanın üzerine boya öncesi son düzeltme için saten alçı çekilir. Alçı esaslı ürünler neme karşı hassas olduğu için banyo, mutfak tezgâh arkası gibi ıslak bölgelerde üreticinin talimatı mutlaka kontrol edilmelidir."
      ]
    },
    {
      h: "Sıva hesabı formülü",
      formula: "Net alan (m²) = brüt duvar alanı − kapı ve pencere alanları\nSıva (kg) = net alan × kalınlık (mm) × sarfiyat (kg/m²/mm)\nFireli miktar = sıva × (1 + fire oranı)\nTorba sayısı = fireli miktar ÷ torba ağırlığı  → yukarı yuvarla\nHacim (m³) = net alan × kalınlık (m)",
      p: [
        "Formüldeki <strong>sarfiyat</strong>, 1 m² yüzeye 1 mm kalınlıkta sıva yapmak için gereken kuru toz miktarıdır. Bu değer ürünün yoğunluğuna ve su ile karışım oranına bağlıdır, bu yüzden ürünün torbasında ya da teknik föyünde belirtilir. Sarfiyat değeri yerine \"1 m²'ye kaç kg\" olarak verilmişse, bu genellikle belirli bir kalınlık için yazılmıştır; o kalınlığı da kontrol edin.",
        "Duvar alanını hesaplamak için odanın çevresini (2 × en + 2 × boy) duvar yüksekliğiyle çarparsınız. Tavan da sıvanacaksa en × boy alanını ayrıca ekleyin. Kapı, pencere ve geniş boşlukların alanını düşmek için [[arac:duvar-alani-hesapla|Duvar Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 4 × 5 metrelik bir oda",
      p: [
        "Tavan yüksekliği 2,7 m olan 4 × 5 metrelik bir odanın duvarlarına alçı sıva yapılacak. Odada 0,9 × 2,1 m kapı ve 1,5 × 1,4 m pencere var. Seçilen ürünün sarfiyatı torbada 0,9 kg/m²/mm yazıyor (örnek değer) ve torba 30 kg'lık."
      ],
      ol: [
        "Brüt duvar alanı: 2 × (4 + 5) × 2,7 = 18 × 2,7 = 48,6 m².",
        "Boşluklar: kapı 0,9 × 2,1 = 1,89 m², pencere 1,5 × 1,4 = 2,1 m²; toplam 3,99 m².",
        "Net alan: 48,6 − 3,99 = 44,61 m².",
        "Sıva miktarı: 44,61 × 10 mm × 0,9 = 401,49 kg.",
        "%10 fire: 401,49 × 1,10 ≈ 441,6 kg.",
        "Torba sayısı: 441,6 ÷ 30 = 14,72 → <strong>15 torba</strong>."
      ],
      after: [
        "Aynı odaya önce 15 mm hazır kaba sıva yapılsaydı ve ürünün sarfiyatı 1,4 kg/m²/mm olsaydı: 44,61 × 15 × 1,4 ≈ 936,8 kg, fireyle yaklaşık 1.030 kg, yani 25 kg'lık torbadan 42 torba gerekirdi. Alan, kalınlık, sarfiyat ve torba ağırlığını yazarak bu hesabı anında yapmak için [[arac:siva-hesapla|Sıva Malzemesi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sıva kalınlığı kaç cm olmalı?",
      p: [
        "Sıva kalınlığını duvarın düzgünlüğü belirler. Kalınlık ne kadar artarsa malzeme tüketimi o oranda artar; 2 cm yerine 3 cm sıva yapmak malzemeyi %50 artırır. Bu nedenle duvarın en çukur ve en çıkıntılı noktası önceden ölçülerek ortalama kalınlık hesaplanmalıdır. Uygulamada sık karşılaşılan kalınlıklar aşağıdadır; projenizdeki ve ürün föyündeki değerler önceliklidir."
      ],
      table: {
        head: ["Sıva türü", "Uygulamada tipik kalınlık", "Kullanım yeri"],
        rows: [
          ["Kaba sıva (iç duvar)", "15–20 mm", "Tuğla ve briket duvarlar"],
          ["Kaba sıva (dış cephe)", "20–25 mm", "Dış duvarlar, sıcaklık ve nem etkisi"],
          ["İnce sıva", "2–5 mm", "Kaba sıva üzeri son kat"],
          ["Alçı sıva (perlitli, makine)", "8–15 mm", "İç mekân duvar ve tavan"],
          ["Saten alçı", "1–3 mm", "Boya öncesi pürüzsüz yüzey"]
        ],
        caption: "Kalın uygulamalar tek seferde değil, katmanlar hâlinde yapılır; tek katta yapılabilecek en büyük kalınlık ürün föyünde belirtilir."
      },
      after: [
        "Duvar çok bozuksa önce tamir harcıyla derin çukurları doldurmak, sonra genel sıvayı yapmak hem malzemeden tasarruf sağlar hem çatlak riskini azaltır. Tavan sıvalarında kalınlık genellikle duvarlardan daha az tutulur."
      ]
    },
    {
      h: "Kaba sıvada kum–çimento–kireç oranı nedir?",
      p: [
        "Şantiyede hazırlanan geleneksel kaba sıva harcında oranlar genellikle hacimce verilir. Uygulamada sık kullanılan bir örnek <strong>1 ölçü çimento, 1 ölçü kireç, 6 ölçü kum</strong> (1 : 1 : 6) karışımıdır; dış cephe ve nemli yerlerde çimento oranı artırılabilir, iç mekânda kireç oranı yükseltilerek işlenebilirlik artırılabilir. Kesin oran proje, şartname ve kullanılan malzemenin kalitesine göre belirlenmelidir.",
        "Harç hesabında dikkat edilmesi gereken bir nokta, kuru malzemelerin su ile karıştırıldığında hacim kaybetmesidir. Bu nedenle 1 m³ ıslak harç için yaklaşık 1,25–1,35 m³ kuru malzeme gerekir. Örnek odamızda 44,61 m²'ye 2 cm kaba sıva için %10 fireyle yaklaşık 0,98 m³ harç gerekir. 1 : 1 : 6 oranı ve 1,3 kuru hacim katsayısıyla bu yaklaşık 230 kg çimento (50 kg'lık 5 torba), 0,96 m³ kum ve 0,16 m³ kireç eder."
      ],
      after: [
        "Oranlarınızı ve harç hacmini yazarak çimento torbası, kum ve kireç miktarını görmek için [[arac:harc-karisim-hesapla|Harç Karışımı Hesaplama]] aracını kullanabilirsiniz. Beton ve şap hesaplarındaki benzer mantık için [[bilgi:1-m3-beton-icin-kac-torba-cimento|1 m³ beton için kaç torba çimento]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Alçı sıva metrekareye ne kadar gider?",
      p: [
        "Alçı sıvanın metrekare tüketimi ürünün yoğunluğuna ve kalınlığa bağlıdır. Ürün föylerinde sarfiyat genellikle milimetre başına kg/m² olarak verilir ve çimento esaslı kaba sıvalara göre daha düşüktür; çünkü perlit gibi hafif dolgu maddeleri içerir. 1 cm kalınlık için metrekare tüketimi, ürünün mm başına sarfiyatının 10 katıdır.",
        "Örnek: Sarfiyatı 0,9 kg/m²/mm olan bir alçı sıva 10 mm kalınlıkta 9 kg/m² gider. 30 kg'lık bir torba bu durumda yaklaşık 3,3 m² alanı kaplar. Saten alçıda kalınlık çok düşük olduğu için bir torba çok daha geniş bir alana yeter; ancak saten alçı genellikle iki kat uygulanır, bunu hesaba katın."
      ]
    },
    {
      h: "Kapı ve pencere alanı düşülmeli mi?",
      p: [
        "Evet, kapı, pencere, vitrin ve geniş boşlukların alanı düşülmelidir; aksi hâlde özellikle çok pencereli odalarda gereğinden çok malzeme alırsınız. Ancak pencere ve kapı boşluklarının iç yüzeyleri (söve ya da glif denen kenarlar) de sıvanır. Duvar kalınlığı 20 cm ise 1,5 × 1,4 m'lik bir pencerenin dört kenarı yaklaşık 2 × (1,5 + 1,4) × 0,2 = 1,16 m² ek yüzey oluşturur.",
        "Pratik bir yaklaşım olarak küçük boşlukları (örneğin 0,5 m²'nin altındaki pencereler ya da prizler) düşmeyip fire payının içinde bırakabilir, büyük boşlukları düşüp söve yüzeylerini ekleyebilirsiniz. Köşelerde kullanılacak köşe profili ve sıva filesi gibi yardımcı malzemeleri ayrıca listeleyin."
      ]
    },
    {
      h: "Sıva kaç günde kurur?",
      p: [
        "Kuruma süresi sıvanın türüne, kalınlığına, ortam sıcaklığına, nemine ve havalandırmaya göre büyük farklılık gösterir; bu yüzden tek bir gün sayısı vermek doğru olmaz. Çimento esaslı kaba sıvalar priz alıp sertleştikten sonra da uzun süre nem vermeye devam eder ve üzerine ince sıva ya da boya uygulamadan önce genellikle haftalarca beklemek gerekir. Alçı sıvalar daha hızlı kurur, ancak boyadan önce yüzeyin tamamen kurumuş olması gerekir.",
        "Her ürünün teknik föyünde bir sonraki kat için önerilen bekleme süresi yazar ve bu süre kalınlığa göre değişir. Sıcak ve rüzgârlı havada çimento esaslı sıvanın çok hızlı kuruması çatlamaya yol açabileceği için yüzeyin bir süre nemli tutulması önerilir. Soğuk havada ise donma riskine karşı uygulama yapılmamalıdır."
      ]
    },
    {
      h: "Sıva hesabında sık yapılan hatalar",
      ul: [
        "<strong>Ortalama kalınlığı küçük tahmin etmek:</strong> Bozuk duvarlarda gerçek kalınlık hesaplanandan fazla çıkar; birkaç noktadan ölçüm yapın.",
        "<strong>Sarfiyat değerini ürüne bakmadan almak:</strong> Farklı markaların sarfiyatı belirgin biçimde farklıdır.",
        "<strong>Fire eklememek:</strong> Karışım artığı, dökülme ve kenar kayıpları için %5–10 pay bırakın.",
        "<strong>Torba sayısını aşağı yuvarlamak:</strong> 14,7 torba 15 torba demektir.",
        "<strong>Tavanı unutmak:</strong> Tavan da sıvanacaksa en × boy alanını ekleyin.",
        "<strong>Söve yüzeylerini atlamak:</strong> Çok pencereli odalarda bu yüzeyler birkaç metrekare tutabilir."
      ],
      after: [
        "Sıvadan sonra boya ve fayans ihtiyacınızı hesaplamak için [[bilgi:kac-litre-boya-kac-m2-fayans|kaç litre boya, kaç m² fayans]] yazısına, duvarın kendisi için [[bilgi:bir-duvara-kac-tugla-gider|bir duvara kaç tuğla gider]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["1 m² duvar için kaç kg sıva gerekir?", "Kalınlık ile ürünün milimetre başına sarfiyatının çarpımı kadar. Sarfiyatı 0,9 kg/m²/mm olan alçı sıva 10 mm'de 9 kg/m², sarfiyatı 1,4 olan kaba sıva 15 mm'de yaklaşık 21 kg/m² gider. Değeri ürünün torbasından kontrol edin."],
    ["Kaba sıva ve ince sıva farkı nedir?", "Kaba sıva duvarın ilk ve en kalın katmanıdır, büyük düzensizlikleri kapatır ve genellikle 1,5–2,5 cm uygulanır. İnce sıva kaba sıvanın üzerine birkaç milimetre çekilen, daha ince taneli ve pürüzsüz yüzey veren son katmandır."],
    ["Sıva kalınlığı kaç cm olmalı?", "Duvarın düzgünlüğüne ve sıva türüne bağlıdır. Uygulamada iç kaba sıva çoğunlukla 1,5–2 cm, dış cephe kaba sıvası 2–2,5 cm, alçı sıva yaklaşık 1 cm, saten alçı 1–3 mm'dir. Ürün föyündeki en büyük tek kat kalınlığına uyun."],
    ["Kaba sıvada kum–çimento–kireç oranı nedir?", "Hacimce sık kullanılan bir örnek 1 çimento, 1 kireç ve 6 kum oranıdır. Dış cephe ve nemli yerlerde çimento oranı artırılabilir. Kesin oran proje ve şartnameye göre belirlenir; kuru malzeme ıslak harçtan yaklaşık %25–35 fazla alınır."],
    ["Alçı sıva metrekareye ne kadar gider?", "Metrekare tüketimi kalınlık ile mm başına sarfiyatın çarpımıdır. Sarfiyatı 0,9 kg/m²/mm olan alçı sıva 1 cm kalınlıkta 9 kg/m² gider ve 30 kg'lık bir torba yaklaşık 3,3 m² alanı kaplar."],
    ["Kapı ve pencere alanı düşülmeli mi?", "Evet, büyük boşlukların alanı düşülmelidir. Ancak pencere ve kapı kenarlarındaki söve yüzeyleri de sıvandığı için ayrıca eklenmelidir. Küçük boşluklar pratikte fire payının içinde bırakılabilir."],
    ["Sıva kaç günde kurur?", "Kuruma süresi sıva türüne, kalınlığa, sıcaklığa, neme ve havalandırmaya bağlıdır. Çimento esaslı kaba sıvalarda boya öncesi genellikle haftalarca beklenir, alçı sıvalar daha hızlı kurur. Ürün föyündeki bekleme süresi esas alınmalıdır."],
    ["Duvar alanı nasıl hesaplanır?", "Odanın çevresi duvar yüksekliğiyle çarpılır: 4 × 5 metrelik, 2,7 m yüksekliğindeki oda için 2 × (4 + 5) × 2,7 = 48,6 m². Kapı ve pencere alanları düşülür, tavan sıvanacaksa en × boy alanı eklenir."],
    ["Sıva torbası kaç metrekareye yeter?", "Torba ağırlığını metrekare tüketimine bölerek bulunur. 25 kg'lık kaba sıva 15 mm kalınlıkta ve 1,4 sarfiyatta yaklaşık 1,2 m², 30 kg'lık alçı sıva 10 mm kalınlıkta ve 0,9 sarfiyatta yaklaşık 3,3 m² alanı kaplar."]
  ],
  tools: ["siva-hesapla", "harc-karisim-hesapla", "duvar-alani-hesapla"],
  related: ["bir-duvara-kac-tugla-gider", "1-m3-beton-icin-kac-torba-cimento", "kac-litre-boya-kac-m2-fayans", "mantolama-nedir-kac-cm-olmali"],
  sources: [
    ["Türk Standardları Enstitüsü", "https://www.tse.org.tr/"],
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı – Birim fiyat ve tarifler", "https://www.csb.gov.tr/"]
  ]
};
