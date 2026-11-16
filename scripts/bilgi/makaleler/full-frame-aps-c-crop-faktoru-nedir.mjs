export default {
  slug: "full-frame-aps-c-crop-faktoru-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Full Frame ve APS-C Farkı Nedir? Crop Faktörü ve Eşdeğer Odak Uzaklığı",
  pageTitle: "Crop Faktörü Nedir? Full Frame ve APS-C Farkı, Eşdeğer Odak",
  description: "Crop faktörü, sensör köşegeninin full frame'e oranıdır. APS-C'de 1,5–1,6, Micro Four Thirds'te 2'dir: 50 mm lens APS-C'de 75–80 mm gibi görür. Örnek ve tablolar.",
  keywords: ["crop faktörü nedir", "full frame aps-c farkı", "eşdeğer odak uzaklığı", "50mm aps-c kaç mm", "sensör boyutu nedir", "telefon kamerası 24 mm ne demek", "micro four thirds crop faktörü", "crop sensör alan derinliği"],
  lead: "Crop faktörü, <strong>bir sensörün köşegeninin 36×24 mm'lik full frame (35 mm) sensörün köşegenine oranıdır ve o sensörde bir objektifin full frame'de hangi odak uzaklığı gibi görüntü verdiğini gösterir</strong>. APS-C sensörlerde crop faktörü yaklaşık 1,5 ya da 1,6'dır; bu yüzden 50 mm'lik bir objektif APS-C gövdede 75–80 mm'lik bir objektifin görüş açısını verir. Micro Four Thirds'te faktör 2'dir. Crop faktörü objektifin gerçek odak uzaklığını değiştirmez, yalnızca görüntünün kenarlarını kırpar. Bu yazıda sensör boyutlarını, eşdeğer odak ve diyafram hesabını, telefonlardaki \"24 mm\" ifadesini ve alan derinliğine etkisini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Crop faktörü = 43,27 mm (full frame köşegeni) ÷ sensör köşegeni.",
    "Eşdeğer odak uzaklığı = objektifin odak uzaklığı × crop faktörü; 50 mm × 1,5 = 75 mm.",
    "Yaklaşık faktörler: full frame 1, APS-C 1,5–1,6, Micro Four Thirds 2, 1 inç tipi 2,7, telefon ana kameraları genellikle 3,5–7.",
    "Telefonlarda yazan 24 mm, gerçek odak uzaklığı değil, full frame eşdeğeridir; gerçek değer çoğu zaman 5–7 mm civarındadır.",
    "Aynı kadraj ve aynı f değerinde küçük sensör daha geniş alan derinliği verir; eşdeğer diyafram = f değeri × crop faktörü.",
    "Büyük sensör, aynı piksel sayısında daha büyük piksel ve genellikle daha iyi düşük ışık performansı ile dinamik aralık sağlar."
  ],
  figure: {
    alt: "Gerçek oranlarıyla iç içe sensör boyutları: full frame 36×24 mm, APS-C 23,5×15,6 mm, Micro Four Thirds 17,3×13 mm, 1 inç tipi 13,2×8,8 mm ve bir telefon sensörü; yanda 50 mm objektifin eşdeğer odak uzaklıkları.",
    caption: "Dikdörtgenler gerçek boyut oranlarıyla çizilmiştir. Full frame sensörün alanı APS-C'nin yaklaşık 2,4, Micro Four Thirds'ün yaklaşık 3,8 katıdır. Sağdaki tablo aynı 50 mm objektifin farklı sensörlerde hangi full frame odak uzaklığına denk geldiğini gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sensör boyutları (gerçek oranla)</text>
  <rect x="40" y="70" width="288" height="192" class="ps sp sw"/>
  <rect x="90" y="103" width="188" height="125" class="oks sok sw"/>
  <rect x="115" y="114" width="138" height="104" class="sf sb"/>
  <rect x="131" y="131" width="106" height="70" class="y"/>
  <rect x="145" y="137" width="78" height="59" class="p"/>
  <text x="48" y="90" class="sm b">Full frame 36×24 · 1×</text>
  <text x="96" y="122" class="sm b ok">APS-C · 1,5×</text>
  <text x="48" y="286" class="sm">Micro Four Thirds 17,3×13 · 2×</text>
  <text x="48" y="306" class="sm">1 inç tipi 13,2×8,8 · 2,7×</text>
  <text x="48" y="326" class="sm">Telefon (örnek 1/1,3 inç) · ≈ 3,5×</text>
  <text x="184" y="171" class="sm mid b sf">Telefon</text>
  <rect x="380" y="70" width="320" height="230" rx="10" class="sf sb"/>
  <text x="540" y="98" class="b mid">50 mm objektif nasıl görür?</text>
  <text x="398" y="130">Full frame</text><text x="684" y="130" class="end b">50 mm · 46,8°</text>
  <text x="398" y="160">APS-C (1,5×)</text><text x="684" y="160" class="end b">75 mm · 32,2°</text>
  <text x="398" y="190">APS-C (1,6×)</text><text x="684" y="190" class="end b">80 mm</text>
  <text x="398" y="220">Micro Four Thirds (2×)</text><text x="684" y="220" class="end b">100 mm</text>
  <text x="398" y="250">1 inç tipi (2,7×)</text><text x="684" y="250" class="end b">≈ 136 mm</text>
  <text x="398" y="284" class="sm t2">Açılar köşegen görüş açısıdır</text>
  <rect x="40" y="346" width="660" height="40" rx="8" class="oks"/>
  <text x="60" y="371" class="b">Eşdeğer odak = odak uzaklığı × crop faktörü · Crop = 43,27 ÷ sensör köşegeni</text>
</svg>`
  },
  sections: [
    {
      h: "Sensör boyutu nedir?",
      p: [
        "Dijital fotoğraf makinelerinde görüntüyü kaydeden ışığa duyarlı yüzeye <strong>sensör</strong> denir. Film döneminde en yaygın format 36×24 mm'lik 35 mm filmdi; dijital makinelerde bu boyuttaki sensörlere <strong>full frame</strong> (tam kare) adı verilir. Daha küçük sensörler daha ucuz, hafif ve küçük gövde ile objektif tasarımına olanak tanır; bu yüzden giriş ve orta seviye makinelerde, aksiyon kameralarında ve telefonlarda küçük sensörler kullanılır.",
        "Sensör boyutu; görüş açısını, alan derinliğini, düşük ışıkta gürültüyü ve objektiflerin boyutunu etkiler. Aşağıdaki tablo yaygın sensör formatlarını ve full frame'e göre oranlarını özetler. Değerler yaklaşıktır; aynı format adını taşıyan sensörler üreticiye göre birkaç milimetre farklı olabilir."
      ],
      table: {
        head: ["Format", "Yaklaşık boyut (mm)", "Köşegen (mm)", "Crop faktörü", "Alan (mm²)"],
        rows: [
          ["Full frame", "36 × 24", "43,3", "1,0", "864"],
          ["APS-C (çoğu üretici)", "23,5 × 15,6", "28,2", "≈ 1,5", "≈ 367"],
          ["APS-C (bir üreticinin formatı)", "22,3 × 14,9", "26,8", "≈ 1,6", "≈ 332"],
          ["Micro Four Thirds", "17,3 × 13", "21,6", "≈ 2,0", "≈ 225"],
          ["1 inç tipi", "13,2 × 8,8", "15,9", "≈ 2,7", "≈ 116"],
          ["Telefon ana kamerası (örnek 1/1,3 inç tipi)", "≈ 9,8 × 7,4", "≈ 12,3", "≈ 3,5", "≈ 73"]
        ],
        caption: "Telefon sensörlerinde \"1/1,3 inç\" gibi adlar sensörün gerçek köşegeni değildir; eski video tüplerinden kalan bir adlandırma geleneğidir."
      }
    },
    {
      h: "Crop faktörü nedir?",
      p: [
        "Bir objektif, görüntüsünü daire biçiminde bir alana yansıtır ve sensör bu dairenin ortasından dikdörtgen bir parça alır. Sensör küçüldükçe alınan parça da küçülür: görüntünün kenarları <strong>kırpılır</strong> (crop) ve sonuç, sanki daha uzun odaklı bir objektifle çekilmiş gibi daha dar bir görüş açısına sahip olur. Crop faktörü bu kırpmanın oranını, sensör köşegenleri üzerinden tek bir sayıyla ifade eder."
      ],
      formula: "Crop faktörü = full frame köşegeni ÷ sensör köşegeni\nFull frame köşegeni = √(36² + 24²) ≈ 43,27 mm\nÖrnek APS-C: √(23,5² + 15,6²) ≈ 28,21 mm → 43,27 ÷ 28,21 ≈ 1,53",
      after: [
        "Önemli bir ayrıntı: crop faktörü objektifin <strong>gerçek odak uzaklığını değiştirmez</strong>. 50 mm'lik bir objektif hangi gövdeye takılırsa takılsın 50 mm'dir; perspektifi ve büyütmesi aynıdır. Değişen yalnızca sensörün kadraja aldığı alandır. Bu yüzden \"APS-C'de 50 mm, 75 mm olur\" yerine \"75 mm'nin görüş açısını verir\" demek daha doğrudur."
      ]
    },
    {
      h: "APS-C'de 50 mm lens kaç mm'ye denk gelir?",
      p: [
        "Eşdeğer odak uzaklığı, objektifin odak uzaklığının crop faktörüyle çarpılmasıyla bulunur. Bu değer, full frame bir gövdede aynı görüş açısını verecek objektifin odak uzaklığıdır ve objektifleri farklı sistemler arasında karşılaştırmanın ortak dilidir."
      ],
      formula: "Eşdeğer odak (mm) = objektifin odak uzaklığı × crop faktörü\nKöşegen görüş açısı = 2 × arctan(43,27 ÷ (2 × eşdeğer odak))",
      ol: [
        "50 mm objektif, crop faktörü 1,5 olan APS-C gövdede: 50 × 1,5 = <strong>75 mm</strong> eşdeğer. Köşegen görüş açısı ≈ 32,2° (full frame'de 50 mm ≈ 46,8°).",
        "Aynı objektif 1,6 faktörlü APS-C gövdede: 50 × 1,6 = <strong>80 mm</strong> eşdeğer; klasik bir portre odağına yaklaşır.",
        "Micro Four Thirds gövdede 25 mm objektif: 25 × 2 = <strong>50 mm</strong> eşdeğer, yani full frame'deki \"normal\" objektif.",
        "APS-C'de full frame 24 mm geniş açı etkisini almak için gereken objektif: 24 ÷ 1,5 = <strong>16 mm</strong>.",
        "Tele örneği: APS-C'de 200 mm objektif 300 mm eşdeğer verir; doğa ve spor fotoğrafçılığında bu \"menzil kazancı\" küçük sensörlerin avantajıdır."
      ],
      after: [
        "Hesabı [[arac:crop-faktoru-hesapla|Crop Faktörü ve Eşdeğer Odak Uzaklığı Hesaplama]] aracıyla yapabilirsiniz; sensör türünü seçip odak uzaklığını girdiğinizde eşdeğer odak, köşegen görüş açısı, objektif sınıfı ve isterseniz alan derinliği için eşdeğer diyafram gösterilir. Yatay, dikey ve köşegen görüş açılarını ayrıntılı görmek için [[arac:kamera-lens-gorus-acisi-hesapla|Kamera Lens Görüş Açısı Hesaplama]] aracı da kullanılabilir."
      ]
    },
    {
      h: "Görüş açısı odak uzaklığıyla nasıl değişir?",
      p: [
        "Odak uzaklığı kısaldıkça görüş açısı genişler, uzadıkça daralır. Aşağıdaki tablo full frame eşdeğer odak uzaklıkları için köşegen görüş açılarını ve yaygın kullanım alanlarını gösterir; APS-C ya da başka bir sensör kullanıyorsanız önce eşdeğer odak uzaklığını bulun, sonra tabloya bakın."
      ],
      table: {
        head: ["Eşdeğer odak", "Köşegen görüş açısı", "Sınıf", "Tipik kullanım"],
        rows: [
          ["14 mm", "≈ 114°", "Ultra geniş açı", "İç mekân, mimari, gece gökyüzü"],
          ["24 mm", "≈ 84°", "Geniş açı", "Manzara, telefon ana kamerası"],
          ["35 mm", "≈ 63°", "Geniş-normal", "Sokak, belgesel"],
          ["50 mm", "≈ 47°", "Normal", "Genel kullanım, göz algısına yakın"],
          ["85 mm", "≈ 29°", "Kısa tele", "Portre"],
          ["200 mm", "≈ 12°", "Tele", "Spor, doğa, uzak konular"]
        ]
      },
      after: [
        "Görüş açısı trigonometriyle hesaplanır: köşegen açı, sensör köşegeninin yarısının odak uzaklığına oranının arktanjantının iki katıdır. Bu ilişkinin mantığını [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Telefon kameralarında yazan 24 mm ne demek?",
      p: [
        "Telefon üreticileri kamera özelliklerinde genellikle \"24 mm ana kamera\", \"13 mm ultra geniş\" ya da \"77 mm tele\" gibi değerler verir. Bunlar gerçek odak uzaklıkları değil, <strong>full frame eşdeğerleridir</strong>. Telefon sensörleri çok küçük olduğu için gerçek odak uzaklıkları da birkaç milimetre düzeyindedir.",
        "Örnek: Crop faktörü yaklaşık 3,5 olan bir ana kamera sensöründe \"24 mm eşdeğer\" görüş açısı için gereken gerçek odak uzaklığı 24 ÷ 3,5 ≈ 6,9 mm'dir. Fotoğrafın EXIF bilgilerinde çoğu zaman hem gerçek odak uzaklığı (örneğin 6,9 mm) hem de 35 mm eşdeğeri (24 mm) ayrı alanlarda kaydedilir.",
        "Telefonlardaki \"2×\" ya da \"3×\" yakınlaştırma da eşdeğer odak uzaklığının oranıdır: 24 mm ana kameraya göre 3× tele, 72 mm eşdeğer demektir. Ayrı bir tele kamera yoksa bu yakınlaştırma görüntünün ortasının kırpılıp büyütülmesiyle (dijital yakınlaştırma) yapılır ve ayrıntı kaybına yol açar."
      ]
    },
    {
      h: "Crop sensör alan derinliğini etkiler mi?",
      p: [
        "Evet, dolaylı olarak. Aynı kadrajı elde etmek için küçük sensörde daha kısa odaklı bir objektif kullanırsınız ya da konudan daha uzakta durursunuz; her iki durum da alan derinliğini artırır. Bu yüzden aynı kadraj ve aynı f değerinde küçük sensör, arka planı daha az bulanıklaştırır."
      ],
      formula: "Eşdeğer diyafram (alan derinliği için) = f değeri × crop faktörü\nÖrnek: APS-C'de 33 mm f/2 ≈ full frame'de 50 mm f/3",
      ul: [
        "APS-C'de 33 mm f/2 ile çekilen bir portre, full frame'de 50 mm f/3 ile çekilmiş benzer kadraj ve benzer alan derinliği verir.",
        "Micro Four Thirds'te 25 mm f/1,4, full frame'de 50 mm f/2,8 ile benzer alan derinliği sağlar.",
        "Pozlama değişmez: f/2 her sensörde aynı enstantane ve ISO ile aynı parlaklıkta görüntü verir. Eşdeğer diyafram yalnızca alan derinliği ve toplam ışık miktarı karşılaştırması içindir.",
        "Geniş alan derinliği her zaman dezavantaj değildir: makro, manzara ve belgesel çekimlerde daha fazla alanın net olması işinizi kolaylaştırır."
      ],
      after: [
        "Belirli bir odak uzaklığı, diyafram ve çekim mesafesi için net alanın ön ve arka sınırlarını hesaplamak üzere [[arac:alan-derinligi-hesapla|Alan Derinliği (DOF) Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sensör boyutu görüntü kalitesini nasıl etkiler?",
      p: [
        "Sensör büyüdükçe toplam ışık toplayan yüzey de büyür. Full frame sensörün alanı APS-C'nin yaklaşık 2,4 katı, Micro Four Thirds'ün yaklaşık 3,8 katıdır. Aynı piksel sayısında büyük sensörün her pikseli daha büyük olur; bu da genellikle yüksek ISO'da daha az gürültü, daha geniş dinamik aralık ve daha yumuşak ton geçişleri anlamına gelir.",
        "Bununla birlikte, görüntü kalitesi yalnızca sensör boyutundan ibaret değildir. Objektifin kalitesi, görüntü işlemcisi ve fotoğrafçının ışığı kullanımı en az sensör kadar belirleyicidir. Bol ışıklı gündüz koşullarında APS-C ve full frame arasındaki fark çoğu baskı ve ekran boyutunda belirgin değildir. Telefonlar ise küçük sensörlerini çoklu kare birleştirme gibi hesaplamalı fotoğrafçılık yöntemleriyle telafi eder.",
        "Baskı ve ekran için gereken çözünürlük hesapları ayrı bir konudur; fotoğrafınızı hangi boyutta basabileceğinizi [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük]] yazısında bulabilirsiniz."
      ],
      table: {
        head: ["Konu", "Full frame", "APS-C", "Micro Four Thirds"],
        rows: [
          ["Düşük ışık ve dinamik aralık", "Genellikle en iyi", "İyi", "Orta-iyi"],
          ["Sığ alan derinliği", "En kolay", "Orta", "Daha zor"],
          ["Tele menzil (aynı objektif)", "Yok", "1,5–1,6 kat", "2 kat"],
          ["Gövde ve objektif boyutu", "Büyük, ağır", "Orta", "Küçük, hafif"],
          ["Maliyet", "Yüksek", "Orta", "Orta"]
        ]
      }
    },
    {
      h: "Micro Four Thirds crop faktörü kaçtır?",
      p: [
        "Micro Four Thirds (MFT) sensörü yaklaşık 17,3 × 13 mm boyutundadır ve köşegeni yaklaşık 21,6 mm'dir. 43,27 ÷ 21,6 ≈ <strong>2,0</strong> crop faktörü verir. Yani MFT'de 25 mm objektif 50 mm, 12 mm objektif 24 mm, 150 mm objektif 300 mm eşdeğer görüş açısı sunar.",
        "MFT sensörlerin en-boy oranı da farklıdır: full frame ve APS-C 3:2, MFT ise 4:3 oranındadır. Crop faktörü köşegen üzerinden hesaplandığı için iki format arasında yatay ve dikey görüş açıları oranı birebir aynı değildir; 3:2'lik bir fotoğrafı MFT'de çekmek isterseniz kadrajın üst ve altı kırpılır ve gerçek faktör yatay eksende biraz farklılaşır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Objektifin odak uzaklığı değişti sanmak:</strong> Crop faktörü yalnızca görüş açısını değiştirir; perspektif ve büyütme objektifin gerçek odak uzaklığına bağlıdır.",
        "<strong>Eşdeğer diyaframı pozlamaya uygulamak:</strong> Enstantane ve ISO hesabında objektif üzerindeki f değeri kullanılır.",
        "<strong>Full frame objektifi her zaman avantaj sanmak:</strong> APS-C gövdede full frame objektif çalışır ama ağır ve pahalıdır; görüş açısı yine crop faktörüyle daralır.",
        "<strong>APS-C objektifi full frame gövdeye takmak:</strong> Görüntü dairesi küçük olduğu için köşelerde kararma olur ya da gövde otomatik olarak kırpma moduna geçer.",
        "<strong>Telefon değerlerini gerçek odak sanmak:</strong> Telefon özelliklerindeki mm değerleri eşdeğerdir; EXIF'teki gerçek değer çok daha küçüktür."
      ]
    }
  ],
  faq: [
    ["Full frame ile APS-C arasındaki fark nedir?", "Full frame sensör 36×24 mm, APS-C sensör yaklaşık 23,5×15,6 mm boyutundadır. APS-C daha küçük olduğu için görüntüyü kırpar, aynı objektifle daha dar bir görüş açısı verir; full frame ise genellikle düşük ışıkta daha iyi performans ve daha sığ alan derinliği sunar."],
    ["Crop faktörü nedir?", "Crop faktörü, full frame sensörün yaklaşık 43,27 mm'lik köşegeninin başka bir sensörün köşegenine oranıdır. Bir objektifin o sensörde full frame'deki hangi odak uzaklığı gibi görüş açısı verdiğini bulmak için kullanılır."],
    ["APS-C'de 50 mm lens kaç mm'ye denk gelir?", "Crop faktörü 1,5 olan APS-C gövdede 50 mm objektif 75 mm, crop faktörü 1,6 olan gövdede 80 mm eşdeğer görüş açısı verir. Objektifin gerçek odak uzaklığı yine 50 mm'dir."],
    ["Telefon kameralarında yazan 24 mm ne demek?", "Telefonlarda yazan 24 mm, gerçek odak uzaklığı değil full frame eşdeğeridir. Sensör çok küçük olduğu için gerçek odak uzaklığı çoğu zaman 5 ile 7 mm civarındadır; crop faktörü yaklaşık 3,5 olan bir sensörde 24 mm eşdeğer için gerçek değer yaklaşık 6,9 mm'dir."],
    ["Sensör boyutu görüntü kalitesini nasıl etkiler?", "Büyük sensör daha fazla ışık toplar; aynı piksel sayısında pikseller daha büyük olur. Bu genellikle yüksek ISO'da daha az gürültü ve daha geniş dinamik aralık sağlar. Ancak objektif, işlemci ve ışık kullanımı da kaliteyi belirler."],
    ["Görüş açısı odak uzaklığıyla nasıl değişir?", "Odak uzaklığı kısaldıkça görüş açısı genişler, uzadıkça daralır. Full frame'de 24 mm yaklaşık 84 derece, 50 mm yaklaşık 47 derece, 200 mm yaklaşık 12 derece köşegen görüş açısı verir."],
    ["Crop sensör alan derinliğini etkiler mi?", "Aynı kadraj ve aynı f değerinde küçük sensör daha geniş alan derinliği verir. Eşdeğer diyafram, f değeri ile crop faktörünün çarpımıdır; APS-C'de f/2, full frame'de yaklaşık f/3 ile benzer alan derinliği sağlar."],
    ["Micro Four Thirds crop faktörü kaçtır?", "Micro Four Thirds sensörü yaklaşık 17,3×13 mm boyutundadır ve crop faktörü yaklaşık 2'dir. Bu sistemde 25 mm objektif 50 mm, 12 mm objektif 24 mm eşdeğer görüş açısı verir."],
    ["Crop faktörü objektifin odak uzaklığını değiştirir mi?", "Hayır. Objektifin odak uzaklığı fiziksel bir özelliktir ve hangi gövdeye takılırsa takılsın aynıdır. Crop faktörü yalnızca sensörün kadraja aldığı alanı, dolayısıyla görüş açısını değiştirir."]
  ],
  tools: ["crop-faktoru-hesapla", "kamera-lens-gorus-acisi-hesapla", "alan-derinligi-hesapla", "pozlama-hesapla"],
  related: ["fps-nedir-kac-fps-olmali", "dpi-ve-cozunurluk-nedir", "trigonometri-sin-cos-tan-tablosu", "1-inc-kac-cm-tv-ekran-boyutu"]
};
