export default {
  slug: "daire-dilimi-ve-yay-uzunlugu",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Daire Dilimi Alanı ve Yay Uzunluğu Nasıl Hesaplanır? Formül ve Örnekler",
  pageTitle: "Daire Dilimi Alanı ve Yay Uzunluğu Formülü, Çözümlü Örnek",
  description: "Daire dilimi alanı πr² × α/360, yay uzunluğu 2πr × α/360 ile bulunur. Çevre, kiriş, radyanla hesap, pizza dilimi ve 7. sınıf düzeyinde çözümlü örnekler.",
  keywords: ["daire dilimi alanı", "yay uzunluğu formülü", "dairenin çevresi", "kiriş uzunluğu", "merkez açı", "daire dilimi 7. sınıf", "pi sayısı", "radyan yay uzunluğu", "pizza dilimi alanı"],
  lead: "Daire diliminin alanı, dairenin alanının merkez açıya düşen payıdır: <strong>A = πr² × α ÷ 360</strong>. Yay uzunluğu da aynı mantıkla çevreden pay alınarak bulunur: <strong>ℓ = 2πr × α ÷ 360</strong>. Örneğin yarıçapı 10 cm, merkez açısı 72° olan dilimin alanı 20π ≈ 62,83 cm², yay uzunluğu 4π ≈ 12,57 cm'dir. Bu sayfada çevre ve alan formüllerini, merkez açı ile yay arasındaki orantıyı, radyanla hesabı, kiriş uzunluğunu, π değerinin neden 3,14 alındığını ve pizza dilimi gibi günlük örnekleri bulacaksınız.",
  kisaCevap: [
    "Dairenin çevresi Ç = 2πr, alanı A = πr² formülüyle bulunur.",
    "Daire dilimi alanı = πr² × (α ÷ 360°); yay uzunluğu = 2πr × (α ÷ 360°).",
    "Merkez açı, yay uzunluğu ve dilim alanı doğru orantılıdır: açı iki katına çıkarsa yay ve alan da iki katına çıkar.",
    "Açı radyan cinsindeyse yay uzunluğu ℓ = r × θ, dilim alanı A = ½ × r² × θ olur.",
    "Kiriş uzunluğu k = 2r × sin(α ÷ 2) formülüyle hesaplanır; 10 cm yarıçap ve 72° için yaklaşık 11,76 cm'dir.",
    "Dilimin çevresi yay uzunluğuna iki yarıçap eklenerek bulunur: 12,57 + 20 = 32,57 cm."
  ],
  figure: {
    alt: "Yarıçapı 10 santimetre olan daire üzerinde 72 derecelik dilim: dilim alanı 62,83 santimetrekare, yay uzunluğu 12,57 santimetre, kiriş 11,76 santimetre olarak işaretli. Sağda formül kartı.",
    caption: "72°, tam açının (360°) beşte biridir. Bu yüzden dilim alanı dairenin alanının, yay uzunluğu da çevrenin tam beşte biri kadardır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="32" class="lg b mid">r = 10 cm, α = 72°</text>
  <circle cx="200" cy="220" r="150" class="sf sb"/>
  <path d="M200,220 L350,220 A150,150 0 0,0 246.35,77.34 Z" class="ps"/>
  <path d="M350,220 A150,150 0 0,0 246.35,77.34" class="sp sw" fill="none"/>
  <line x1="350" y1="220" x2="246.35" y2="77.34" class="sa dash" fill="none"/>
  <line x1="200" y1="220" x2="350" y2="220" class="st" fill="none"/>
  <line x1="200" y1="220" x2="246.35" y2="77.34" class="st" fill="none"/>
  <circle cx="200" cy="220" r="4" class="p"/>
  <path d="M240,220 A40,40 0 0,0 212.4,182" class="st" fill="none"/>
  <text x="240" y="200" class="b">72°</text>
  <text x="275" y="240" class="sm mid">r = 10</text>
  <text x="352" y="128" class="b p">yay 12,57 cm</text>
  <text x="300" y="165" class="sm mid">kiriş 11,76</text>
  <text x="200" y="320" class="sm mid t2">Dairenin geri kalanı: 288°</text>
  <rect x="420" y="70" width="280" height="300" rx="10" class="sf sb"/>
  <rect x="420" y="70" width="8" height="300" class="p"/>
  <text x="444" y="100" class="b">Pay: 72 ÷ 360 = 1/5</text>
  <text x="444" y="134" class="sm">Daire alanı: π × 10² = 314,16 cm²</text>
  <text x="444" y="158" class="b p">Dilim alanı = 62,83 cm²</text>
  <text x="444" y="196" class="sm">Çevre: 2 × π × 10 = 62,83 cm</text>
  <text x="444" y="220" class="b p">Yay uzunluğu = 12,57 cm</text>
  <text x="444" y="258" class="sm">Kiriş: 2 × 10 × sin 36°</text>
  <text x="444" y="282" class="b">= 11,76 cm</text>
  <text x="444" y="320" class="sm">Dilim çevresi: 12,57 + 10 + 10</text>
  <text x="444" y="344" class="b">= 32,57 cm</text>
</svg>`
  },
  sections: [
    {
      h: "Daire, çember, dilim ve yay: temel kavramlar",
      p: [
        "<strong>Çember</strong>, bir merkez noktaya eşit uzaklıktaki noktaların oluşturduğu kapalı eğridir; yalnızca çizgidir. <strong>Daire</strong> ise çember ile içindeki bölgenin tamamıdır. Bu yüzden \"çemberin uzunluğu\" ve \"dairenin alanı\" ifadeleri kullanılır; günlük dilde çember uzunluğuna dairenin çevresi de denir.",
        "Merkezden çembere çizilen doğru parçası <strong>yarıçaptır (r)</strong>. İki yarıçapın arasında kalan açıya <strong>merkez açı (α)</strong> denir. Merkez açının kolları arasında kalan çember parçası <strong>yay</strong>, iki yarıçap ile yayın sınırladığı bölge <strong>daire dilimi</strong>dir. Yayın iki ucunu birleştiren doğru parçası ise <strong>kiriştir</strong>.",
        "Ortaokulda 7. sınıfta çember ve daire ünitesinde çevre, alan, dilim ve yay hesapları işlenir; lisede bu konular radyan ve trigonometriyle genişler. Formüllerin hepsi aynı orantı fikrine dayanır."
      ]
    },
    {
      h: "Dairenin çevresi ve alanı nasıl bulunur?",
      p: [
        "Her dairede çevrenin çapa oranı aynı sabittir; bu sabite <strong>π (pi)</strong> denir. Çap 2r olduğundan çevre Ç = 2πr olur. Alan ise yarıçapın karesiyle büyür: A = πr². Yarıçapı iki katına çıkarmak çevreyi iki, alanı dört katına çıkarır."
      ],
      formula: "Çevre: Ç = 2 × π × r = π × çap\nAlan:  A = π × r²",
      ul: [
        "r = 7 cm için çevre 2 × π × 7 ≈ 43,98 cm, alan π × 49 ≈ 153,94 cm²'dir. π yerine 22/7 alınırsa çevre tam 44 cm çıkar.",
        "r = 10 cm için çevre ≈ 62,83 cm, alan ≈ 314,16 cm²'dir.",
        "Bir tekerleğin bir turda aldığı yol çevresine eşittir; 10 turda alınan yol çevrenin 10 katıdır."
      ],
      after: [
        "Çevreyi yarıçap, çap ya da alandan bulmak için [[arac:daire-cevresi-hesapla|Daire Çevresi Hesaplama]] aracını kullanabilirsiniz. Diğer düzlem şekillerinin formülleri [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] sayfasında toplu olarak yer alır."
      ]
    },
    {
      h: "Merkez açı ile yay arasında nasıl bir ilişki vardır?",
      p: [
        "Tam daire 360°'lik merkez açıya karşılık gelir. Bir dilimin merkez açısı α ise, o dilim dairenin α ÷ 360'ı kadardır. Yay uzunluğu çevrenin, dilim alanı da dairenin alanının bu kadarlık payıdır. Bu nedenle merkez açı, yay uzunluğu ve dilim alanı birbiriyle <strong>doğru orantılıdır</strong>.",
        "Bu orantı, soruları denklem kurmadan çözmeyi sağlar: 90°'lik dilim dairenin dörtte biri, 120°'lik dilim üçte biri, 60°'lik dilim altıda biridir. Orantı kurma yöntemini [[bilgi:oran-oranti-nasil-cozulur|oran-orantı]] makalesinde ayrıntılı bulabilirsiniz."
      ],
      formula: "Yay uzunluğu:   ℓ = 2πr × α ÷ 360\nDilim alanı:    A = πr² × α ÷ 360\nKısa yol:       A = ℓ × r ÷ 2",
      table: {
        head: ["Merkez açı", "Dairedeki payı", "r = 6 cm için yay", "r = 6 cm için dilim alanı"],
        rows: [
          ["30°", "1/12", "π ≈ 3,14 cm", "3π ≈ 9,42 cm²"],
          ["60°", "1/6", "2π ≈ 6,28 cm", "6π ≈ 18,85 cm²"],
          ["90°", "1/4", "3π ≈ 9,42 cm", "9π ≈ 28,27 cm²"],
          ["120°", "1/3", "4π ≈ 12,57 cm", "12π ≈ 37,70 cm²"],
          ["180°", "1/2", "6π ≈ 18,85 cm", "18π ≈ 56,55 cm²"]
        ],
        caption: "Açı iki katına çıktığında yay ve alan da iki katına çıkar. Sonuçları π cinsinden bırakmak sınavlarda sıkça istenir."
      }
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Dilim alanı:</strong> r = 10 cm, α = 72°. Pay = 72 ÷ 360 = 1/5. Alan = π × 100 ÷ 5 = 20π ≈ 62,83 cm².",
        "<strong>Yay uzunluğu:</strong> Aynı dilim için yay = 2 × π × 10 ÷ 5 = 4π ≈ 12,57 cm. Kısa yolla sağlama: A = ℓ × r ÷ 2 = 4π × 10 ÷ 2 = 20π.",
        "<strong>Dilimin çevresi:</strong> Yay + iki yarıçap = 12,57 + 10 + 10 = 32,57 cm.",
        "<strong>Açıyı bulma:</strong> r = 10 cm ve yay 4π cm ise 4π = 2π × 10 × α ÷ 360 eşitliğinden α = 72° bulunur.",
        "<strong>π = 3 alınan soru:</strong> Bazı ortaokul sorularında π = 3 verilir. Aynı dilim için alan 3 × 100 ÷ 5 = 60 cm², yay 2 × 3 × 10 ÷ 5 = 12 cm olur. Soruda hangi değer verildiyse onu kullanın."
      ],
      after: [
        "Yarıçap ve açıyı yazarak alan, yay, dilim çevresi, kiriş ve daire parçası alanını tek seferde görmek için [[arac:daire-dilimi-hesapla|Daire Dilimi Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Radyan cinsinden yay uzunluğu nasıl bulunur?",
      p: [
        "Radyan, açıyı yay uzunluğu ile yarıçap oranı olarak ölçer. Yarıçap uzunluğunda bir yayı gören merkez açı 1 radyandır. Tam daire 2π radyan, yani 360°'dir; buradan 1 radyan ≈ 57,3° ve 180° = π radyan bağıntıları çıkar.",
        "Açı radyan olarak verildiğinde 360'a bölme adımı ortadan kalkar ve formüller sadeleşir. Lise matematiği ve fizikte açısal hız gibi konularda bu yüzden hep radyan kullanılır."
      ],
      formula: "ℓ = r × θ\nA = ½ × r² × θ\nDerece → radyan: θ = α × π ÷ 180",
      ul: [
        "r = 5 cm, θ = 1,2 rad: yay = 5 × 1,2 = 6 cm; alan = ½ × 25 × 1,2 = 15 cm². Bu açı yaklaşık 68,75°'dir.",
        "72° = 72 × π ÷ 180 = 0,4π ≈ 1,2566 rad. r = 10 için yay = 10 × 0,4π = 4π cm; derece formülüyle aynı sonuç çıkar."
      ],
      after: [
        "Derece-radyan dönüşümünü [[arac:yay-uzunlugu-hesapla|Yay Uzunluğu Hesaplama]] aracında iki birimle de deneyebilirsiniz."
      ]
    },
    {
      h: "Kiriş uzunluğu nasıl hesaplanır?",
      p: [
        "Kiriş, yayın iki ucunu birleştiren düz çizgidir ve her zaman yaydan kısadır. Merkezden kirişe dik çizildiğinde kiriş ikiye bölünür ve iki eş dik üçgen oluşur. Bu üçgenin hipotenüsü yarıçap, merkezdeki açısı α ÷ 2'dir; buradan sinüs bağıntısıyla kiriş bulunur."
      ],
      formula: "k = 2 × r × sin(α ÷ 2)\nMerkeze uzaklık d biliniyorsa: k = 2 × √(r² − d²)",
      ul: [
        "r = 10 cm, α = 72°: k = 2 × 10 × sin 36° = 20 × 0,5878 ≈ 11,76 cm. Aynı dilimin yayı 12,57 cm'dir; fark yayın eğriliğinden gelir.",
        "r = 6 cm, α = 120°: k = 12 × sin 60° ≈ 10,39 cm.",
        "Kirişin merkeze uzaklığı 6 cm, yarıçap 10 cm ise k = 2 × √(100 − 36) = 2 × 8 = 16 cm; bu hesap [[bilgi:pisagor-teoremi-nedir|Pisagor teoremine]] dayanır."
      ],
      after: [
        "Dilimden üçgeni çıkardığınızda kalan bölgeye <strong>daire parçası</strong> denir: alanı = dilim alanı − ½ × r² × sin α. 10 cm ve 72° için 62,83 − 47,55 ≈ 15,28 cm²'dir. Merkez açı, merkeze uzaklık ya da ok yüksekliğiyle hesap için [[arac:kiris-uzunlugu-hesapla|Kiriş Uzunluğu Hesaplama]] aracına bakın; sinüs değerleri için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] işinize yarar."
      ]
    },
    {
      h: "Pi neden 3,14 alınır?",
      p: [
        "π irrasyonel bir sayıdır: ondalık basamakları sonsuza kadar tekrarsız devam eder (3,14159265…). Hiçbir kesir onu tam olarak ifade edemez. Okul hesaplarında 3,14 kullanılması, sonucu yüzde birin altında bir hatayla bulmaya yetmesindendir; 22/7 ≈ 3,1429 ise elle kesir hesabını kolaylaştırır.",
        "Mühendislik ve bilgisayar hesaplarında π çok daha fazla basamakla kullanılır, ama günlük ölçümler için bu fark önemsizdir. Örneğin yarıçapı 10 cm olan dairenin alanı 3,14 ile 314 cm², gerçek π ile 314,16 cm² çıkar. Sınavlarda ise soruda hangi değer verilmişse (3, 3,14 ya da π cinsinden) o kullanılmalıdır."
      ]
    },
    {
      h: "Pizza diliminin alanı nasıl hesaplanır?",
      p: [
        "Pizza, pasta ya da tart eşit dilimlere bölündüğünde her dilim bir daire dilimidir. Çap 30 cm ise yarıçap 15 cm'dir ve bütün pizzanın alanı π × 225 ≈ 706,86 cm²'dir. 8 eşit dilimin her birinin merkez açısı 45°, alanı 706,86 ÷ 8 ≈ 88,36 cm²'dir.",
        "Bu hesap boyut karşılaştırmasında da işe yarar. Çapı 24 cm olan iki küçük pizza toplam 2 × π × 144 ≈ 904,8 cm² eder; çapı 34 cm olan tek bir büyük pizza ise π × 289 ≈ 907,9 cm²'dir. Çap yalnızca %42 büyük olduğu halde alan iki katına çıkar, çünkü alan yarıçapın karesiyle büyür."
      ],
      ul: [
        "Bahçede 90°'lik çeyrek daire biçimli çiçek tarhı (r = 2 m): alan π × 4 ÷ 4 ≈ 3,14 m², kenar çiti için yay uzunluğu 2π × 2 ÷ 4 ≈ 3,14 m.",
        "Saat yelkovanının ucu 15 dakikada 90° döner; yelkovan 12 cm ise uç 2π × 12 ÷ 4 ≈ 18,85 cm yol alır.",
        "Fan ya da silecek süpürme alanı da dilim alanıdır; iç ve dış yarıçap farkıyla halka dilimi olarak hesaplanır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çap ile yarıçapı karıştırmak:</strong> Soruda çap verilmişse önce ikiye bölün; aksi halde alan dört kat büyük çıkar.",
        "<strong>Dilim çevresine yarıçapları eklememek:</strong> Dilimin çevresi yalnızca yay değildir; iki yarıçap da sınırın parçasıdır.",
        "<strong>Radyan ile dereceyi karıştırmak:</strong> ℓ = r × θ formülüne derece yazmak sonucu yaklaşık 57 kat büyütür.",
        "<strong>Kiriş ile yayı eşit saymak:</strong> Küçük açılarda birbirine yakındırlar, ama 180°'de kiriş çap (2r), yay ise πr olur.",
        "<strong>Birimleri karıştırmak:</strong> Uzunluk cm, alan cm² ile yazılır; sonuçta birimi belirtmemek sınavlarda puan kaybettirir."
      ]
    }
  ],
  faq: [
    ["Daire diliminin alanı nasıl hesaplanır?", "Daire dilimi alanı A = πr² × α ÷ 360 formülüyle hesaplanır. Yarıçapı 10 cm, merkez açısı 72° olan dilim dairenin beşte biridir ve alanı 20π ≈ 62,83 cm² olur."],
    ["Yay uzunluğu formülü nedir?", "Yay uzunluğu ℓ = 2πr × α ÷ 360 formülüyle bulunur; açı radyan cinsindeyse ℓ = r × θ olur. 10 cm yarıçap ve 72° için yay 4π ≈ 12,57 cm'dir."],
    ["Dairenin çevresi nasıl bulunur?", "Dairenin çevresi Ç = 2πr ya da π × çap formülüyle bulunur. Yarıçapı 7 cm olan dairenin çevresi yaklaşık 43,98 cm'dir; π yerine 22/7 alınırsa sonuç tam 44 cm çıkar."],
    ["Merkez açı ile yay arasında nasıl bir ilişki vardır?", "Merkez açı ile yay uzunluğu doğru orantılıdır. Açı tam açının (360°) ne kadarıysa yay da çevrenin o kadarıdır; 90°'lik açının gördüğü yay çevrenin dörtte biridir."],
    ["Kiriş uzunluğu nasıl hesaplanır?", "Kiriş uzunluğu k = 2r × sin(α ÷ 2) formülüyle hesaplanır. Merkeze uzaklık biliniyorsa k = 2√(r² − d²) kullanılır; 10 cm yarıçap ve 72° için kiriş yaklaşık 11,76 cm'dir."],
    ["Radyan cinsinden yay uzunluğu nasıl bulunur?", "Açı radyan cinsindeyse yay uzunluğu doğrudan yarıçap ile açının çarpımıdır: ℓ = r × θ. Yarıçap 5 cm ve açı 1,2 radyan ise yay 6 cm, dilim alanı ½ × 25 × 1,2 = 15 cm² olur."],
    ["Pi neden 3,14 alınır?", "π irrasyonel bir sayıdır ve tam değeri yazılamaz; 3,14 okul hesaplarında yüzde birden küçük hata verdiği için yeterlidir. Sınavlarda ise soruda verilen değer (3, 3,14 ya da π) kullanılmalıdır."],
    ["Pizza diliminin alanı nasıl hesaplanır?", "Önce bütün pizzanın alanı πr² ile bulunur, sonra dilim sayısına bölünür. 30 cm çaplı pizza yaklaşık 706,86 cm²'dir; 8 eşit dilimin her biri yaklaşık 88,36 cm² eder."],
    ["Daire diliminin çevresi nasıl bulunur?", "Daire diliminin çevresi, yay uzunluğuna iki yarıçap eklenerek bulunur. Yarıçapı 10 cm ve açısı 72° olan dilimde çevre 12,57 + 10 + 10 = 32,57 cm olur."]
  ],
  tools: ["daire-dilimi-hesapla", "yay-uzunlugu-hesapla", "daire-cevresi-hesapla", "kiris-uzunlugu-hesapla"],
  related: ["alan-ve-hacim-formulleri", "trigonometri-sin-cos-tan-tablosu", "pisagor-teoremi-nedir"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
