export default {
  slug: "su-deposu-kac-litre-havuz-kac-ton",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Su Deposu Kaç Litre, Havuz Kaç Ton Su Alır? Hacim ve Litre Hesabı",
  pageTitle: "Su Deposu Kaç Litre, Havuz Kaç Ton? Hacim Hesaplama",
  description: "Depo ve havuz hacmi taban alanı × su yüksekliğiyle bulunur; 1 m³ = 1.000 litre ≈ 1 ton sudur. Dikdörtgen, silindir ve yatay tank formülleri, örnek hesaplar.",
  keywords: ["su deposu hacmi hesaplama", "havuz kaç ton su alır", "m3 kaç litre", "silindir depo kaç litre", "1 ton su kaç litre", "depo doluluk hesaplama", "yatay tank litre hesabı", "kaç tonluk su deposu"],
  lead: "Bir su deposunun ya da havuzun kaç litre aldığını bulmak için <strong>taban alanını su yüksekliğiyle çarpıp metreküp cinsinden hacmi bulur, sonucu 1.000 ile çarparsınız</strong>; çünkü 1 m³ 1.000 litredir ve bu kadar su yaklaşık 1 ton gelir. 2 × 1 × 1,5 m'lik bir depo 3.000 litre, yani 3 ton su alır; 8 × 4 m'lik, ortalama 1,4 m derinliğindeki bir havuz yaklaşık 45 ton su ister. Bu sayfada dikdörtgen, dik ve yatay silindir depoların formüllerini, yarı dolu tankın litresini ve evinize uygun depo büyüklüğünü bulacaksınız.",
  kisaCevap: [
    "1 m³ = 1.000 litre; 1 litre = 1 dm³ = 1.000 cm³.",
    "1 ton su yaklaşık 1.000 litredir; su yoğunluğu oda sıcaklığında 1 kg/L'ye çok yakındır.",
    "Dikdörtgen depo ya da havuz: hacim = uzunluk × genişlik × su yüksekliği (metre cinsinden).",
    "Dik silindir depo: hacim = π × yarıçap² × yükseklik; çapı 1,2 m, yüksekliği 1,8 m olan depo yaklaşık 2.036 litredir.",
    "Yatay silindir tankta doluluk doğrusal değildir: yüksekliğin %30'u dolu tank, hacmin yalnızca yaklaşık %25'ini taşır.",
    "Eğimli tabanlı havuzda sığ ve derin uç derinliklerinin ortalaması kullanılır."
  ],
  figure: {
    alt: "Üç depo tipi için hacim formülleri ve örnekler: dikdörtgen depo 2×1×1,5 m = 3.000 L; dik silindir çap 1,2 m yükseklik 1,8 m ≈ 2.036 L; yatay silindir çap 1 m boy 2 m, 30 cm su seviyesinde ≈ 396 L.",
    caption: "Ölçüler metre cinsinden girilir, sonuç metreküp çıkar ve 1.000 ile çarpılarak litreye çevrilir. Yatay tankta su seviyesi ile litre arasındaki ilişki doğrusal değildir; dairenin kesit alanı hesaplanmalıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Depo tipine göre hacim formülü</text>
  <g>
    <rect x="20" y="50" width="220" height="330" rx="10" class="sf sb"/>
    <polygon points="60,120 160,120 200,95 100,95" class="ps"/>
    <rect x="60" y="120" width="100" height="90" class="ps"/>
    <polygon points="160,120 200,95 200,185 160,210" class="ps"/>
    <polygon points="60,150 160,150 200,125 200,185 160,210 60,210" class="oks"/>
    <text x="130" y="245" class="b mid">Dikdörtgen</text>
    <text x="130" y="272" class="mid">U × G × Y</text>
    <text x="130" y="306" class="sm mid t2">2 × 1 × 1,5 = 3 m³</text>
    <text x="130" y="336" class="b mid p">3.000 L ≈ 3 ton</text>
  </g>
  <g>
    <rect x="250" y="50" width="220" height="330" rx="10" class="sf sb"/>
    <rect x="310" y="96" width="100" height="114" class="ps"/>
    <rect x="310" y="130" width="100" height="80" class="oks"/>
    <ellipse cx="360" cy="96" rx="50" ry="12" class="ps sb"/>
    <ellipse cx="360" cy="210" rx="50" ry="12" class="oks"/>
    <text x="360" y="245" class="b mid">Dik silindir</text>
    <text x="360" y="272" class="mid">π × r² × Y</text>
    <text x="360" y="306" class="sm mid t2">π × 0,6² × 1,8 ≈ 2,036 m³</text>
    <text x="360" y="336" class="b mid p">≈ 2.036 L</text>
  </g>
  <g>
    <rect x="480" y="50" width="220" height="330" rx="10" class="sf sb"/>
    <circle cx="590" cy="150" r="56" class="ps"/>
    <path d="M 539 173 A 56 56 0 0 0 641 173 Z" class="oks"/>
    <line x1="520" y1="173" x2="660" y2="173" class="sp dash" fill="none"/>
    <text x="664" y="190" class="sm end p">h = 0,3 m</text>
    <text x="590" y="245" class="b mid">Yatay silindir</text>
    <text x="590" y="272" class="mid">kesit alanı × boy</text>
    <text x="590" y="306" class="sm mid t2">çap 1 m, boy 2 m, su 30 cm</text>
    <text x="590" y="336" class="b mid p">≈ 396 L (%25)</text>
  </g>
  <text x="360" y="404" class="sm mid t2">1 m³ = 1.000 litre ≈ 1 ton su · ölçüleri her zaman metreyle girin</text>
</svg>`
  },
  sections: [
    {
      h: "1 m³ kaç litredir, 1 ton su kaç litre eder?",
      p: [
        "Litre, bir kenarı 10 cm olan küpün hacmidir (1 dm³). Bir kenarı 1 m olan küpün içine her kenar boyunca 10 tane, toplamda 10 × 10 × 10 = 1.000 tane böyle küp sığar. Bu yüzden <strong>1 m³ = 1.000 litre</strong>dir. Tersine 1 litre 0,001 m³, 1.000 cm³ ve 1.000 mililitredir.",
        "Su, oda sıcaklığında litre başına yaklaşık 0,998 kg gelir; 4 °C'de bu değer 1 kg'a en çok yaklaşır. Günlük hesaplarda aradaki binde ikilik fark önemsizdir, bu nedenle <strong>1.000 litre su ≈ 1 ton</strong> kabul edilir. Depo satıcılarının \"1 tonluk\", \"5 tonluk\" diye söz ettiği depolar da 1.000 ve 5.000 litrelik depolardır. Mazot ya da süt gibi farklı yoğunluktaki sıvılarda bu eşitlik geçerli değildir; kilogram hesabı için yoğunluğu ayrıca kullanmak gerekir.",
        "Litre ile metreküp arasında hızlı dönüşüm yapmak için [[arac:litre-metrekup-cevir|Litre Metreküp Çevirici]]yi kullanabilirsiniz; su faturasındaki metreküp tüketimini litreye çevirirken de aynı eşitlik geçerlidir."
      ]
    },
    {
      h: "Dikdörtgen su deposu kaç litre alır?",
      p: [
        "Prizma şeklindeki betonarme ya da plastik depolarda hacim, iç ölçüler üzerinden hesaplanır. Dış ölçüyle hesap yapmak duvar kalınlığı kadar fazla sonuç verir; betonarme depolarda bu fark yüzlerce litreyi bulabilir."
      ],
      formula: "Hacim (m³) = iç uzunluk × iç genişlik × su yüksekliği\nLitre = hacim (m³) × 1.000\nÖrnek: 2 m × 1 m × 1,5 m = 3 m³ = 3.000 litre ≈ 3 ton",
      after: [
        "Su yüksekliği olarak deponun toplam yüksekliğini değil, şamandıranın suyu kestiği seviyeyi kullanmak daha gerçekçi sonuç verir. Çoğu depo tam ağzına kadar dolmaz; taşma borusu ve şamandıra nedeniyle üstte 10–20 cm boşluk kalır. 1,5 m yüksekliğindeki depoda su 1,35 m'de kesiliyorsa kullanılabilir hacim 2 × 1 × 1,35 = 2,7 m³, yani 2.700 litredir."
      ]
    },
    {
      h: "Silindir depo hacmi nasıl hesaplanır?",
      p: [
        "Dik duran silindir (yuvarlak) depolarda taban bir dairedir. Dairenin alanı π × r² formülüyle bulunur; r yarıçaptır ve çapın yarısına eşittir. Bu alan su yüksekliğiyle çarpılınca hacim çıkar."
      ],
      formula: "Hacim (m³) = π × r² × su yüksekliği   (π ≈ 3,1416, r = çap ÷ 2)\nÖrnek: çap 1,2 m → r = 0,6 m\nπ × 0,6 × 0,6 × 1,8 = 2,036 m³ ≈ 2.036 litre",
      after: [
        "Çapı mezura ile doğrudan ölçmek zorsa deponun çevresini ölçüp π'ye bölebilirsiniz: çevresi 3,77 m olan depo için çap 3,77 ÷ 3,1416 = 1,2 m bulunur. Ölçüleri girip hem litreyi hem tonu, mevcut su seviyesine göre kalan miktarı ve kaç gün yeteceğini görmek için [[arac:su-deposu-hacmi-hesapla|Su Deposu Hacmi Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "Yarı dolu yatay tankın litresi nasıl bulunur?",
      p: [
        "Yatay yatırılmış silindir tanklar (mazot tankları, römork su tankları, bazı yer altı depoları) en çok yanlış hesaplanan tiptir. Dik depoda su yüksekliğinin yarısı hacmin yarısı demektir; yatay tankta ise kesit bir daire olduğu için tabanda ve tavanda daha az, ortada daha çok hacim vardır. Çubukla ölçülen seviye ile litre arasındaki ilişki bu yüzden doğrusal değildir.",
        "Doğru hesap için suyun kapladığı daire parçasının (dairesel kesit) alanı bulunup tank boyuyla çarpılır:"
      ],
      formula: "Kesit alanı = r² × arccos((r − h) ÷ r) − (r − h) × √(2rh − h²)\nHacim = kesit alanı × tank boyu   (h = su yüksekliği, açı radyan cinsinden)\nÖrnek: çap 1 m (r = 0,5), boy 2 m, h = 0,3 m\nKesit = 0,25 × 1,1593 − 0,2 × 0,4583 = 0,1982 m² → 0,1982 × 2 = 0,396 m³ ≈ 396 L",
      table: {
        head: ["Su yüksekliği / çap", "Doluluk (hacim)", "1 m çaplı, 2 m boylu tankta"],
        rows: [
          ["%10", "%5,2", "≈ 82 L"],
          ["%20", "%14,2", "≈ 224 L"],
          ["%30", "%25,2", "≈ 396 L"],
          ["%50", "%50,0", "≈ 785 L"],
          ["%70", "%74,8", "≈ 1.174 L"],
          ["%90", "%94,8", "≈ 1.489 L"],
          ["%100", "%100", "≈ 1.571 L"]
        ],
        caption: "Tablo uçları düz kapaklı tank içindir; bombeli kapaklı tanklarda kapak hacmi ayrıca eklenir."
      },
      after: [
        "Bu hesabı her ölçümde elle yapmak zahmetlidir. [[arac:tank-doluluk-hesapla|Tank Doluluk Hesaplama aracı]], çubukla ölçtüğünüz sıvı yüksekliğinden kalan litreyi ve doluluk yüzdesini doğrudan verir."
      ]
    },
    {
      h: "Havuz kaç ton su alır?",
      p: [
        "Havuz hacmi de taban alanı × su derinliği formülüyle bulunur. Fark, havuzların çoğunda tabanın eğimli olmasıdır. Sığ uçtan derin uca düzgün inen bir tabanda ortalama derinlik, iki ucun aritmetik ortalamasıdır. Derinlik olarak duvar yüksekliğini değil, suyun gerçek derinliğini (genellikle kenardan 10–15 cm aşağıdaki su çizgisini) kullanın."
      ],
      table: {
        head: ["Havuz tipi", "Formül", "Örnek ölçü", "Hacim"],
        rows: [
          ["Dikdörtgen, eğimli taban", "U × G × (sığ + derin) ÷ 2", "8 × 4 m, 1,0–1,8 m", "44,8 m³ ≈ 45 ton"],
          ["Yuvarlak (şişme/çelik)", "π × çap² ÷ 4 × derinlik", "Ø 4,5 m, 1,2 m", "≈ 19,1 m³"],
          ["Oval", "π × uzunluk × genişlik ÷ 4 × derinlik", "6 × 3,5 m, 1,2 m", "≈ 19,8 m³"],
          ["Çocuk havuzu", "π × çap² ÷ 4 × derinlik", "Ø 2,4 m, 0,5 m", "≈ 2,26 m³"]
        ]
      },
      after: [
        "Dolum süresi, hacmin bağlantının debisine bölünmesiyle bulunur. Bahçe hortumu dakikada örneğin 20 litre veriyorsa 44.800 litrelik havuz 44.800 ÷ 20 = 2.240 dakika, yani yaklaşık 37 saat sürer. Debiyi öğrenmek için 10 litrelik bir kovanın kaç saniyede dolduğunu ölçmeniz yeterlidir. Farklı şekillerde havuzlar için [[arac:havuz-hacmi-hesapla|Havuz Hacmi Hesaplama aracı]] yüzey alanını ve dolum süresini de verir."
      ]
    },
    {
      h: "Havuz için ne kadar klor gerekir?",
      p: [
        "Klor ihtiyacı doğrudan havuzdaki su miktarına bağlıdır, bu yüzden önce hacmi doğru bulmak gerekir. Hesabın mantığı basittir: hedeflenen konsantrasyon (mg/L) × su hacmi (m³) = gereken aktif klor (gram). Çünkü 1 mg/L, metreküp başına 1 gram demektir."
      ],
      formula: "Aktif klor (g) = hedef artış (mg/L) × hacim (m³)\nÜrün miktarı (g) = aktif klor ÷ ürünün aktif madde oranı\nÖrnek: 44,8 m³ havuzda 1 mg/L artış → 44,8 g aktif klor\n%90 aktif klorlu ürünle: 44,8 ÷ 0,90 ≈ 50 g",
      after: [
        "Hedef serbest klor değeri havuzun türüne, kullanım yoğunluğuna ve suyun sıcaklığına göre değişir; birçok kaynak ev havuzları için düşük tek haneli mg/L aralığını önerir. Kendi havuzunuz için ürün etiketindeki talimatı ve test kitinin ölçümünü esas alın. Klor ürünleri asla birbiriyle ya da asitli ürünlerle karıştırılmamalı, çocukların erişemeyeceği yerde saklanmalıdır."
      ]
    },
    {
      h: "Evim için kaç tonluk depo gerekir?",
      p: [
        "Depo büyüklüğü, hane halkının günlük su tüketimi ile kesintide kaç gün idare etmek istediğinizin çarpımıdır. Günlük tüketim; duş alışkanlıkları, bahçe sulaması ve çamaşır-bulaşık makinelerine göre büyük ölçüde değişir. En doğrusu, su faturanızdaki aylık metreküp tüketimini 30'a ve kişi sayısına bölerek kendi kişi başı değerinizi bulmaktır."
      ],
      ol: [
        "Faturadaki aylık tüketimi bulun: örneğin 18 m³ = 18.000 litre.",
        "Günlüğe çevirin: 18.000 ÷ 30 = 600 litre/gün (dört kişilik hane için kişi başı 150 litre).",
        "İdare etmek istediğiniz gün sayısını belirleyin: kesintiler genellikle 1–2 gün sürüyorsa 2 gün.",
        "Gereken su: 600 × 2 = 1.200 litre.",
        "Şamandıra boşluğu ve dipteki tortu için yaklaşık %10–20 pay ekleyin: 1.200 × 1,2 ≈ 1.440 litre → 1,5 tonluk depo."
      ],
      after: [
        "Kesinti dönemlerinde tasarruflu kullanımla günlük tüketim belirgin biçimde düşer; ancak deponun gereğinden büyük olması da suyun uzun süre beklemesine yol açar. İçme ve kullanma suyu depolarının düzenli aralıklarla temizlenmesi ve kapağının kapalı tutulması gerekir."
      ]
    },
    {
      h: "Hacim hesabında sık yapılan hatalar",
      ul: [
        "<strong>Santimetreyle hesaplayıp sonucu litre sanmak:</strong> 200 × 100 × 150 cm = 3.000.000 cm³ eder; bu 3.000 litredir, 3 milyon litre değil. Ölçüleri metreye çevirerek başlamak hatayı önler.",
        "<strong>Yarıçap yerine çapı kullanmak:</strong> π × çap² formülü dört kat büyük sonuç verir; ya yarıçapın karesini ya da çap² ÷ 4'ü kullanın.",
        "<strong>Yatay tankı dik tank gibi hesaplamak:</strong> Seviyenin üçte biri hacmin üçte biri değildir; kesit formülü gerekir.",
        "<strong>Dış ölçü kullanmak:</strong> Betonarme ve kalın cidarlı depolarda duvar kalınlığı düşülmezse hacim olduğundan büyük çıkar.",
        "<strong>Havuzda duvar yüksekliğini derinlik saymak:</strong> Su çizgisi duvarın üst kenarından aşağıdadır; hacim birkaç ton fazla hesaplanabilir."
      ],
      after: [
        "Daha karmaşık geometrik şekillerin (koni, küre, kesik koni) hacim formülleri için [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısına başvurabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Su deposu kaç litre su alır?", "Deponun iç uzunluk, genişlik ve su yüksekliği metre cinsinden çarpılır, sonuç 1.000 ile çarpılarak litreye çevrilir. Örneğin 2 × 1 × 1,5 m'lik dikdörtgen depo 3.000 litre, yani yaklaşık 3 ton su alır."],
    ["1 m³ kaç litredir?", "1 metreküp tam 1.000 litredir. Bunun nedeni litrenin, kenarı 10 cm olan küpün hacmi olması ve 1 m³'lük küpün içine bu küplerden 1.000 tane sığmasıdır."],
    ["1 ton su kaç litre eder?", "1 ton su yaklaşık 1.000 litredir, çünkü suyun yoğunluğu litre başına yaklaşık 1 kilogramdır. Mazot, yağ ya da süt gibi farklı yoğunluktaki sıvılarda bu eşitlik geçerli değildir."],
    ["Silindir depo hacmi nasıl hesaplanır?", "Dik silindir depoda hacim π × yarıçap² × yükseklik formülüyle bulunur. Çapı 1,2 m, su yüksekliği 1,8 m olan depo için 3,1416 × 0,36 × 1,8 = 2,036 m³, yani yaklaşık 2.036 litre çıkar."],
    ["Havuz kaç ton su alır?", "Havuz uzunluğu, genişliği ve ortalama su derinliği çarpılarak metreküp bulunur; her metreküp yaklaşık 1 tondur. 8 × 4 m ölçülü, 1 m ile 1,8 m arasında derinleşen havuz yaklaşık 44,8 ton su alır."],
    ["Yarı dolu deponun litresi nasıl bulunur?", "Dik depoda su yüksekliği taban alanıyla çarpılır. Yatay silindir tankta ise suyun kapladığı daire parçasının alanı hesaplanıp tank boyuyla çarpılır; yüksekliğin yüzde 30'u, hacmin yaklaşık yüzde 25'ine denk gelir."],
    ["Evim için kaç tonluk depo gerekir?", "Faturanızdaki aylık metreküp tüketimini 30'a bölüp günlük tüketimi bulun, idare etmek istediğiniz gün sayısıyla çarpın ve yüzde 10–20 pay ekleyin. Günde 600 litre kullanan bir hane için iki günlük depo yaklaşık 1,5 tondur."],
    ["Havuz için ne kadar klor gerekir?", "Gereken aktif klor, hedeflenen mg/L artışı ile havuz hacminin metreküp cinsinden çarpımı kadar gramdır. 44,8 m³ havuzda 1 mg/L artış için 44,8 g aktif klor, yüzde 90 aktif ürünle yaklaşık 50 g gerekir."]
  ],
  tools: ["su-deposu-hacmi-hesapla", "havuz-hacmi-hesapla", "tank-doluluk-hesapla", "litre-metrekup-cevir"],
  related: ["alan-ve-hacim-formulleri"]
};
