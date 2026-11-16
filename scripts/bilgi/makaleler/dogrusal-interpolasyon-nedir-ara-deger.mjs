export default {
  slug: "dogrusal-interpolasyon-nedir-ara-deger",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Doğrusal İnterpolasyon Nedir? Tablodan Ara Değer Bulma Formülü ve Örnek",
  pageTitle: "Doğrusal İnterpolasyon Nedir? Ara Değer Formülü ve Örnek",
  description: "Doğrusal interpolasyon, bilinen iki nokta arasındaki değeri doğru varsayımıyla bulur: y = y₁ + (x − x₁)(y₂ − y₁)/(x₂ − x₁). Örnek, hata payı ve ekstrapolasyon.",
  keywords: ["interpolasyon nedir", "doğrusal interpolasyon", "enterpolasyon formülü", "ara değer bulma", "tablodan değer okuma", "ekstrapolasyon nedir", "bilineer interpolasyon", "buhar tablosu interpolasyon"],
  lead: "Doğrusal interpolasyon (enterpolasyon), bir tabloda değeri bilinen iki nokta arasında kalan bir ara değeri, iki noktayı birleştiren <strong>düz bir doğru üzerinde</strong> varsayarak bulma yöntemidir. Formülü y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁)'dir: x, aralığın hangi oranındaysa y de aynı oranda ilerler. Örneğin x = 10 için y = 50, x = 20 için y = 80 ise x = 14 için y = 62 bulunur. Bu sayfada formülün eğimle ilişkisini, mühendislik tablolarında kullanımını, yöntemin ne zaman hata yaptığını, ekstrapolasyon farkını ve iki yönlü (bilineer) interpolasyonu çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Formül: y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁).",
    "Oran biçimi: t = (x − x₁) ÷ (x₂ − x₁), y = y₁ + t × (y₂ − y₁); t, 0 ile 1 arasındadır.",
    "(y₂ − y₁) ÷ (x₂ − x₁) ifadesi iki noktadan geçen doğrunun eğimidir.",
    "İnterpolasyon bilinen aralığın içinde, ekstrapolasyon dışında tahmindir; ekstrapolasyon çok daha risklidir.",
    "Gerçek ilişki eğri ise doğrusal interpolasyon hata yapar; hata, tablo aralığı daraldıkça azalır.",
    "İki değişkenli tablolarda bilineer interpolasyon, önce bir yönde sonra diğer yönde iki kez doğrusal interpolasyon yapar."
  ],
  figure: {
    alt: "İki bilinen nokta (10, 50) ve (20, 80) arasında çizilmiş doğru; x = 14 noktasında doğru üzerinde y = 62 okunuyor. Sağda aralık dışında x = 25 için ekstrapolasyonla 95 değeri kesikli çizgiyle gösteriliyor.",
    caption: "Bilinen iki nokta düz bir doğruyla birleştirilir. x = 14, aralığın %40'ındadır; bu yüzden y de 50'den 80'e giden yolun %40'ını, yani 12 birim alır ve 62 olur. Kesikli bölüm aralık dışındaki ekstrapolasyondur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">İki nokta arasında ara değer</text>
  <line x1="80" y1="360" x2="640" y2="360" class="st" fill="none"/>
  <line x1="80" y1="360" x2="80" y2="50" class="st" fill="none"/>
  <text x="652" y="364" class="sm">x</text><text x="72" y="46" class="sm end">y</text>
  <g class="sm mid mu"><text x="200" y="382">10</text><text x="296" y="382">14</text><text x="440" y="382">20</text><text x="560" y="382">25</text></g>
  <g class="sm end mu"><text x="72" y="294">50</text><text x="72" y="246">62</text><text x="72" y="174">80</text><text x="72" y="114">95</text></g>
  <line x1="200" y1="290" x2="440" y2="170" class="sp sw" fill="none"/>
  <line x1="440" y1="170" x2="560" y2="110" class="sp sw dash" fill="none"/>
  <circle cx="200" cy="290" r="7" class="p"/><circle cx="440" cy="170" r="7" class="p"/>
  <text x="200" y="316" class="sm mid b">(10, 50)</text><text x="440" y="200" class="sm mid b">(20, 80)</text>
  <line x1="296" y1="360" x2="296" y2="242" class="sok dash" fill="none"/>
  <line x1="80" y1="242" x2="296" y2="242" class="sok dash" fill="none"/>
  <circle cx="296" cy="242" r="8" class="ok"/>
  <text x="310" y="236" class="b ok">x = 14 → y = 62</text>
  <circle cx="560" cy="110" r="6" class="dg"/>
  <text x="560" y="96" class="sm mid dg b">ekstrapolasyon: 95</text>
  <rect x="440" y="250" width="260" height="96" rx="10" class="sf sb"/>
  <text x="456" y="274" class="b">Hesap</text>
  <text x="456" y="298" class="sm">t = (14 − 10) ÷ (20 − 10) = 0,4</text>
  <text x="456" y="320" class="sm">y = 50 + 0,4 × (80 − 50) = 62</text>
  <text x="456" y="340" class="sm mu">eğim = 30 ÷ 10 = 3</text>
</svg>`
  },
  sections: [
    {
      h: "Doğrusal interpolasyon nedir?",
      p: [
        "Mühendislik, fen ve istatistikte birçok değer tablolar hâlinde verilir: farklı sıcaklıklardaki buhar basıncı, farklı yaşlardaki büyüme ölçüleri, farklı sürelerdeki faiz katsayıları gibi. Tablolar ise yalnızca belirli noktaları içerir; aradığınız değer çoğu zaman iki satırın arasındadır. Bu ara değeri tahmin etmeye <strong>interpolasyon</strong> denir.",
        "Doğrusal interpolasyon bu tahminin en basit yoludur: iki komşu tablo noktası arasındaki ilişkinin düz bir doğru gibi davrandığı varsayılır. Aradığınız x değeri iki bilinen x'in tam ortasındaysa y de iki bilinen y'nin ortasında alınır; aralığın dörtte birindeyse y de dörtte bir ilerler. Türkçe kaynaklarda \"enterpolasyon\" yazımı da yaygındır; ikisi aynı şeydir.",
        "Yöntemin gücü sadeliğindedir. Hesap makinesiyle saniyeler içinde yapılır, tablo aralıkları yeterince sıksa çoğu uygulamada yeterli doğrulukta sonuç verir."
      ]
    },
    {
      h: "İki nokta arasındaki ara değer nasıl hesaplanır? Formül",
      p: [
        "Bilinen iki nokta (x₁, y₁) ve (x₂, y₂), değerini aradığınız nokta x olsun. Önce x'in aralıkta ne kadar ilerlediğini gösteren oranı (t) bulun, sonra y aralığında aynı oranda ilerleyin."
      ],
      formula: "t = (x − x₁) ÷ (x₂ − x₁)\ny = y₁ + t × (y₂ − y₁)\nTek satırda: y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁)",
      ol: [
        "Bilinen noktalar: x₁ = 10, y₁ = 50 ve x₂ = 20, y₂ = 80. Aranan: x = 14.",
        "Oran: t = (14 − 10) ÷ (20 − 10) = 4 ÷ 10 = 0,4.",
        "y aralığı: y₂ − y₁ = 80 − 50 = 30.",
        "Sonuç: y = 50 + 0,4 × 30 = 50 + 12 = <strong>62</strong>."
      ],
      after: [
        "Kontrol için iki uç değeri formüle koyabilirsiniz: x = 10 için t = 0 ve y = 50; x = 20 için t = 1 ve y = 80 çıkar. Formül bilinen noktaları her zaman tam olarak verir. Hesabı elle yapmak yerine [[arac:dogrusal-interpolasyon-hesapla|Doğrusal İnterpolasyon Hesaplama aracına]] iki noktayı ve aradığınız x değerini girebilirsiniz."
      ]
    },
    {
      h: "Eğim ile interpolasyon arasındaki ilişki",
      p: [
        "Formüldeki (y₂ − y₁) ÷ (x₂ − x₁) ifadesi, iki noktadan geçen doğrunun <strong>eğimidir</strong> (m). Doğrusal interpolasyon aslında bu doğrunun denklemini yazıp istenen x'i yerine koymaktır: y = y₁ + m × (x − x₁). Örnekte eğim 30 ÷ 10 = 3'tür; yani x her 1 birim arttığında y 3 birim artar. x, 10'dan 14'e 4 birim ilerlediği için y de 4 × 3 = 12 birim artar.",
        "Bu bakış açısı, interpolasyonun doğru denklemiyle aynı matematik olduğunu gösterir. Doğru denklemini y = mx + n biçiminde görmek isterseniz [[arac:dogru-denklemi-bul|İki Noktadan Doğru Denklemi Bulma]], yalnızca eğim için [[arac:egim-hesapla|İki Noktadan Eğim Hesaplama]] aracını kullanabilirsiniz. Kavramın ayrıntısı [[bilgi:dogrunun-egimi-nasil-bulunur|doğrunun eğimi nasıl bulunur]] yazısında."
      ]
    },
    {
      h: "Mühendislik tablolarında interpolasyon: buhar basıncı örneği",
      p: [
        "Termodinamik derslerinde buhar tabloları en sık interpolasyon yapılan kaynaklardır. Suyun doyma buhar basıncı standart tablolarda 20 °C için yaklaşık 2,339 kPa, 30 °C için yaklaşık 4,246 kPa'dır. 26 °C için değer arayalım."
      ],
      ol: [
        "t = (26 − 20) ÷ (30 − 20) = 0,6.",
        "Basınç farkı: 4,246 − 2,339 = 1,907 kPa.",
        "Sonuç: p ≈ 2,339 + 0,6 × 1,907 ≈ 3,483 kPa."
      ],
      after: [
        "Tablolar çoğu zaman 5 °C ya da daha sık aralıklarla verilir; aralık daraldıkça sonuç gerçeğe yaklaşır. Aynı yöntem malzeme özellik tablolarında, istatistik dağılım tablolarında ([[bilgi:z-skoru-nedir-nasil-hesaplanir|z skoru tabloları]] gibi) ve yükseklikle değişen atmosfer değerlerinde de kullanılır."
      ]
    },
    {
      h: "İnterpolasyon ne zaman hatalı sonuç verir?",
      p: [
        "Doğrusal interpolasyon, iki nokta arasındaki gerçek ilişki eğri olduğunda hata yapar. Buhar basıncı sıcaklıkla üstel biçimde artar; eğri yukarı doğru kıvrıktır ve iki noktayı birleştiren doğru, eğrinin üstünde kalır. Bu yüzden doğrusal sonuç gerçek değerden biraz büyük çıkar."
      ],
      table: {
        head: ["Sıcaklık", "Tablodaki değer", "Doğrusal interpolasyon (20–30 °C)", "Fark"],
        rows: [
          ["20 °C", "2,339 kPa", "2,339 kPa", "0"],
          ["25 °C", "≈ 3,169 kPa", "≈ 3,293 kPa", "≈ %3,9 fazla"],
          ["30 °C", "4,246 kPa", "4,246 kPa", "0"]
        ],
        caption: "25 °C için tablodaki değer doğrudan okunabildiğinde, 10 derecelik aralıkla yapılan doğrusal tahminin yaklaşık %4 hata yaptığı görülür."
      },
      ul: [
        "<strong>Eğrilik büyükse:</strong> Üstel, logaritmik ya da karesel ilişkilerde aralık geniş tutulmamalıdır.",
        "<strong>Aralıkta bir kırılma varsa:</strong> Faz değişimi, vergi dilimi geçişi ya da tarife eşiği gibi sıçramalar doğrusal varsayımı geçersiz kılar.",
        "<strong>Veri gürültülüyse:</strong> Ölçüm hataları içeren iki noktayı birleştirmek hatayı ara değere taşır; çok noktalı regresyon daha uygundur.",
        "<strong>Aralık dışına çıkılırsa:</strong> Bu artık interpolasyon değil, ekstrapolasyondur."
      ],
      after: [
        "Eğri ilişkilerde daha doğru sonuç için üç ya da daha fazla nokta kullanan polinom interpolasyon, logaritmik ölçekte doğrusal interpolasyon (üstel ilişkiler için) ya da tablonun daha sık aralıklı bir sürümü tercih edilir."
      ]
    },
    {
      h: "Enterpolasyon ile ekstrapolasyon farkı nedir?",
      p: [
        "İnterpolasyon, bilinen iki noktanın <strong>arasındaki</strong> değeri tahmin eder. Ekstrapolasyon ise bilinen aralığın <strong>dışındaki</strong> bir değeri, aynı eğilimin devam edeceği varsayımıyla tahmin eder. Formül aynıdır; t değeri 0'dan küçük ya da 1'den büyük çıkar."
      ],
      table: {
        head: ["Özellik", "İnterpolasyon", "Ekstrapolasyon"],
        rows: [
          ["Aranan x'in yeri", "x₁ ile x₂ arasında", "Aralığın dışında"],
          ["t değeri", "0 ≤ t ≤ 1", "t < 0 ya da t > 1"],
          ["Örnek (10→50, 20→80)", "x = 14 → 62", "x = 25 → 95, x = 4 → 32"],
          ["Güvenilirlik", "Görece yüksek", "Belirsiz, aralıktan uzaklaştıkça hızla düşer"],
          ["Tipik kullanım", "Tablo okuma", "Kısa vadeli eğilim tahmini"]
        ]
      },
      after: [
        "Ekstrapolasyonun riski, verinin aralık dışında nasıl davrandığını bilmemenizdir. Bir bitkinin iki haftada 10 cm'den 20 cm'ye uzaması, bir yıl sonra 270 cm olacağı anlamına gelmez. Finansal tahminlerde, nüfus projeksiyonlarında ve büyüme eğrilerinde ekstrapolasyon yaparken sonucu kesin bir değer değil, varsayıma dayalı bir senaryo olarak sunmak gerekir."
      ]
    },
    {
      h: "Çift yönlü (bilineer) interpolasyon nedir?",
      p: [
        "Bazı tablolarda değer iki değişkene bağlıdır: örneğin hem sıcaklık hem basınç satır ve sütunlarda yer alır. Aradığınız nokta hem satırlar hem sütunlar arasındaysa <strong>bilineer interpolasyon</strong> yapılır: önce bir yönde iki ayrı doğrusal interpolasyon, sonra çıkan iki sonuç arasında diğer yönde bir doğrusal interpolasyon daha."
      ],
      ol: [
        "Dört köşe değeri: (x₁, y₁) = 10, (x₂, y₁) = 20, (x₁, y₂) = 30, (x₂, y₂) = 40. Aranan nokta x yönünde aralığın %25'inde, y yönünde %60'ında.",
        "Alt kenarda x yönünde: 10 + 0,25 × (20 − 10) = 12,5.",
        "Üst kenarda x yönünde: 30 + 0,25 × (40 − 30) = 32,5.",
        "İki sonuç arasında y yönünde: 12,5 + 0,6 × (32,5 − 12,5) = <strong>24,5</strong>."
      ],
      after: [
        "Hangi yönde önce başladığınız sonucu değiştirmez. Bilineer interpolasyon dijital görüntülerin büyütülmesinde, harita yükseklik modellerinde ve iki girişli mühendislik tablolarında yaygın olarak kullanılır."
      ]
    },
    {
      h: "Elektronik tablo programında interpolasyon nasıl yapılır?",
      p: [
        "Elektronik tablo programlarında iki noktalı doğrusal interpolasyon için doğrudan formülü yazmak en şeffaf yoldur. x₁, y₁, x₂, y₂ ve x değerleri sırasıyla A2, B2, A3, B3 ve D2 hücrelerindeyse şu formül sonucu verir: <code>=B2+(D2-A2)*(B3-B2)/(A3-A2)</code>.",
        "Programların doğrusal tahmin fonksiyonları (İngilizce sürümde FORECAST ya da FORECAST.LINEAR, Türkçe sürümde TAHMİN ya da TAHMİN.DOĞRUSAL) da yalnızca iki nokta verildiğinde aynı sonucu üretir. Ancak daha fazla nokta verirseniz bu fonksiyonlar tüm noktalara en uygun doğruyu (regresyon) kullanır ve sonuç, komşu iki nokta arasındaki interpolasyondan farklı olur. Uzun bir tablodan otomatik okuma yapacaksanız önce aranan x'in hangi iki satır arasında kaldığını bulan bir arama formülü, ardından yukarıdaki iki noktalı formül kullanılmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>x ve y'yi karıştırmak:</strong> Oran x farklarından hesaplanır ve y farkına uygulanır; tersini yapmak yanlış sonuç verir.",
        "<strong>Komşu olmayan satırları kullanmak:</strong> Aranan değerin hemen altındaki ve üstündeki satırları seçin.",
        "<strong>Birimleri karıştırmak:</strong> Tablonun birimi (kPa, bar, °C, K) ile sorudaki birim aynı olmalıdır.",
        "<strong>Ekstrapolasyonu interpolasyon gibi güvenilir saymak:</strong> Aralık dışındaki sonuçları ihtiyatla kullanın.",
        "<strong>Ara sonucu erken yuvarlamak:</strong> t oranını en az dört ondalıkla taşıyın, yuvarlamayı en sonda yapın."
      ]
    }
  ],
  faq: [
    ["Doğrusal interpolasyon nedir?", "Bir tabloda değeri bilinen iki nokta arasında kalan bir ara değeri, iki noktayı birleştiren düz bir doğru üzerinde varsayarak bulma yöntemidir. x aralıkta ne kadar ilerlemişse y de aynı oranda ilerler."],
    ["İki nokta arasındaki ara değer nasıl hesaplanır?", "y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁) formülü kullanılır. Örneğin 10 için 50, 20 için 80 biliniyorsa 14 için oran 0,4 olur ve y = 50 + 0,4 × 30 = 62 bulunur."],
    ["Enterpolasyon ile ekstrapolasyon farkı nedir?", "İnterpolasyon bilinen iki noktanın arasındaki değeri, ekstrapolasyon ise bilinen aralığın dışındaki değeri tahmin eder. Formül aynıdır ama ekstrapolasyonda eğilimin devam edeceği varsayıldığı için hata riski çok daha yüksektir."],
    ["Mühendislik tablolarında interpolasyon nasıl yapılır?", "Aranan değerin hemen altındaki ve üstündeki iki satır seçilir, oran hesaplanır ve değer farkına uygulanır. Örneğin suyun buhar basıncı 20 °C'de 2,339 kPa, 30 °C'de 4,246 kPa ise 26 °C için yaklaşık 3,483 kPa bulunur."],
    ["İnterpolasyon ne zaman hatalı sonuç verir?", "Gerçek ilişki eğri olduğunda, aralıkta bir sıçrama bulunduğunda ya da veri gürültülü olduğunda hata yapar. Buhar basıncında 10 derecelik aralıkla yapılan doğrusal tahmin 25 °C'de yaklaşık yüzde 4 fazla çıkar."],
    ["Eğim ile interpolasyon arasındaki ilişki nedir?", "Formüldeki (y₂ − y₁) ÷ (x₂ − x₁) ifadesi iki noktadan geçen doğrunun eğimidir. Doğrusal interpolasyon, bu doğrunun denklemine aranan x değerini koymakla aynı işlemdir."],
    ["Excel'de interpolasyon nasıl yapılır?", "Elektronik tablo programında iki noktalı formülü doğrudan yazabilirsiniz: =B2+(D2-A2)*(B3-B2)/(A3-A2). Doğrusal tahmin fonksiyonları iki noktayla aynı sonucu verir, ama daha fazla noktada regresyon doğrusu kullanır."],
    ["Çift yönlü (bilineer) interpolasyon nedir?", "İki değişkenli tablolarda önce bir yönde iki ayrı doğrusal interpolasyon, sonra çıkan iki sonuç arasında diğer yönde bir doğrusal interpolasyon yapılmasıdır. Görüntü büyütme ve harita yükseklik modellerinde yaygındır."],
    ["Doğrusal interpolasyon sonucu ne kadar güvenilirdir?", "Tablo aralığı dar ve ilişki aralık içinde neredeyse doğrusal olduğunda çok güvenilirdir. Aralık genişledikçe ve ilişki eğrildikçe hata artar; hassas işlerde daha sık aralıklı tablo ya da eğri uydurma yöntemleri kullanılır."]
  ],
  tools: ["dogrusal-interpolasyon-hesapla", "dogru-denklemi-bul", "egim-hesapla"],
  related: ["dogrunun-egimi-nasil-bulunur", "oran-oranti-nasil-cozulur", "z-skoru-nedir-nasil-hesaplanir"],
  sources: [
    ["MEB – Ortaöğretim Matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
