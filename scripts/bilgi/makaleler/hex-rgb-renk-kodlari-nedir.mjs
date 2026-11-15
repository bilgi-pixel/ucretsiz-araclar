export default {
  slug: "hex-rgb-renk-kodlari-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "HEX ve RGB Renk Kodları Nedir? Renk Kodu Bulma ve Dönüştürme",
  pageTitle: "HEX ve RGB Renk Kodu Nedir? Çevirme, HSL ve Renk Bulma",
  description: "HEX renk kodu, kırmızı, yeşil ve mavinin 0–255 arası değerlerinin onaltılık yazımıdır: #8B1E3F = rgb(139, 30, 63). Elle çevirme, HSL, resimden renk bulma ve palet.",
  keywords: ["hex renk kodu nedir", "rgb renk kodu", "hex rgb çevirme", "renk kodu bulma", "html renk kodları", "hsl nedir", "kırmızı hex kodu", "renk paleti oluşturma"],
  lead: "HEX renk kodu, ekrandaki bir rengi oluşturan <strong>kırmızı, yeşil ve mavi ışığın 0–255 arasındaki şiddetinin onaltılık sayılarla yazılmış hâlidir</strong>; RGB kodu ise aynı üç değerin onluk sayılarla yazılışıdır. Örneğin #8B1E3F kodundaki 8B, 1E ve 3F çiftleri sırasıyla 139, 30 ve 63'e karşılık gelir ve rgb(139, 30, 63) ile aynı bordo tonunu verir. Bu sayfada iki biçim arasında elle çevirmeyi, HSL sisteminin ne işe yaradığını, bir resimdeki rengin kodunu bulmayı ve uyumlu bir renk paleti oluşturmayı öğreneceksiniz.",
  kisaCevap: [
    "RGB kodu, kırmızı (R), yeşil (G) ve mavi (B) bileşenlerini 0–255 arası üç sayıyla yazar: rgb(255, 0, 0) saf kırmızıdır.",
    "HEX kodu aynı üç sayının iki haneli onaltılık karşılığıdır ve # ile başlar: #FF0000 = rgb(255, 0, 0).",
    "HEX'ten RGB'ye çevirme: her çiftte ilk hane × 16 + ikinci hane; A=10, B=11, C=12, D=13, E=14, F=15.",
    "Üç bileşenin 256'şar değeri 256 × 256 × 256 = 16.777.216 farklı renk eder.",
    "HSL rengi ton (0–360°), doygunluk (%) ve açıklık (%) ile tanımlar; aynı rengin açık-koyu tonlarını üretmek için en pratik sistemdir.",
    "Web sayfalarında HEX, RGB ve HSL yazımlarının üçü de geçerlidir; baskı işlerinde ise CMYK kullanılır."
  ],
  figure: {
    alt: "#8B1E3F HEX kodunun üç çifte ayrılması: 8B = 8×16+11 = 139 kırmızı, 1E = 1×16+14 = 30 yeşil, 3F = 3×16+15 = 63 mavi; sonuç rgb(139, 30, 63) ve HSL karşılığı hsl(342, 64%, 33%).",
    caption: "HEX kodu soldan sağa kırmızı, yeşil ve mavi olmak üzere üç çifte ayrılır. Her çiftin onluk karşılığı, ilgili ışığın 255 üzerinden şiddetidir; çubuklar bu şiddetleri gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">HEX kodunu çözmek: 8B1E3F</text>
  <rect x="210" y="48" width="300" height="56" rx="10" class="p"/>
  <text x="360" y="86" class="xl mid sf">#8B 1E 3F</text>
  <line x1="290" y1="104" x2="130" y2="146" class="st" fill="none"/>
  <line x1="360" y1="104" x2="360" y2="146" class="st" fill="none"/>
  <line x1="430" y1="104" x2="590" y2="146" class="st" fill="none"/>
  <g>
    <rect x="30" y="146" width="200" height="118" rx="10" class="sf sb"/>
    <text x="130" y="174" class="b mid">Kırmızı (R): 8B</text>
    <text x="130" y="200" class="mid">8 × 16 + 11</text>
    <text x="130" y="232" class="xl mid p">139</text>
    <rect x="260" y="146" width="200" height="118" rx="10" class="sf sb"/>
    <text x="360" y="174" class="b mid">Yeşil (G): 1E</text>
    <text x="360" y="200" class="mid">1 × 16 + 14</text>
    <text x="360" y="232" class="xl mid p">30</text>
    <rect x="490" y="146" width="200" height="118" rx="10" class="sf sb"/>
    <text x="590" y="174" class="b mid">Mavi (B): 3F</text>
    <text x="590" y="200" class="mid">3 × 16 + 15</text>
    <text x="590" y="232" class="xl mid p">63</text>
  </g>
  <g>
    <text x="30" y="298" class="sm b">Işık şiddeti (255 üzerinden)</text>
    <rect x="90" y="310" width="510" height="14" rx="3" class="sf sb"/><rect x="90" y="310" width="278" height="14" rx="3" class="dg"/><text x="80" y="322" class="sm end">R</text><text x="610" y="322" class="sm">%55</text>
    <rect x="90" y="332" width="510" height="14" rx="3" class="sf sb"/><rect x="90" y="332" width="60" height="14" rx="3" class="ok"/><text x="80" y="344" class="sm end">G</text><text x="610" y="344" class="sm">%12</text>
    <rect x="90" y="354" width="510" height="14" rx="3" class="sf sb"/><rect x="90" y="354" width="126" height="14" rx="3" class="c"/><text x="80" y="366" class="sm end">B</text><text x="610" y="366" class="sm">%25</text>
  </g>
  <text x="360" y="404" class="b mid">RGB 139, 30, 63 · HSL 342°, %64, %33</text>
</svg>`
  },
  sections: [
    {
      h: "RGB renk modeli nasıl çalışır?",
      p: [
        "Telefon, monitör ve televizyon ekranlarındaki her piksel üç küçük ışık kaynağından oluşur: kırmızı, yeşil ve mavi. Bu üç ışık farklı şiddetlerde yandığında göz onları tek bir renk olarak algılar. Işık toplandıkça renk açıldığı için bu modele <strong>toplamalı (eklemeli) renk modeli</strong> denir: üç ışık tam şiddette yanınca beyaz, hepsi sönükken siyah görülür.",
        "Dijital sistemlerde her bileşenin şiddeti 8 bitle, yani 0 ile 255 arasında bir tam sayıyla saklanır. <strong>RGB kodu</strong> bu üç sayıyı sırasıyla yazar: rgb(255, 0, 0) yalnızca kırmızı ışığın tam yandığı saf kırmızı, rgb(255, 255, 0) kırmızı ile yeşilin karışımı sarı, rgb(128, 128, 128) ise orta gridir. Üç bileşen eşit olduğunda her zaman bir gri tonu elde edilir.",
        "Her bileşen 256 farklı değer alabildiği için toplam renk sayısı 256<sup>3</sup> = 16.777.216'dır. Bu yüzden 24 bit renk derinliğine sıklıkla \"16,7 milyon renk\" denir."
      ]
    },
    {
      h: "HEX renk kodu nedir, nasıl okunur?",
      p: [
        "HEX (hexadecimal, onaltılık) kodu, RGB'deki üç sayıyı daha kısa yazmanın yoludur. Onaltılık sistemde 0–9 rakamlarından sonra A, B, C, D, E, F harfleri 10'dan 15'e kadar olan değerleri gösterir. İki onaltılık hane 16 × 16 = 256 değer taşıyabildiği için 0–255 aralığı iki haneye tam sığar: 00 = 0, FF = 255.",
        "Altı haneli bir HEX kodu soldan sağa üç çifte bölünür: ilk çift kırmızı, ikinci çift yeşil, üçüncü çift mavidir. #FF8800 kodunda kırmızı FF (255), yeşil 88 (136), mavi 00 (0) olduğu için turuncu bir ton çıkar. Harflerin büyük ya da küçük yazılması fark etmez; #ff8800 ile #FF8800 aynı renktir."
      ],
      ul: [
        "<strong>Kısa yazım (3 hane):</strong> Her çiftin iki hanesi aynıysa tek hane yazılabilir. #F80, #FF8800'ün kısa yazımıdır; #ABC ise #AABBCC demektir.",
        "<strong>Alfa kanalı (8 hane):</strong> Sona eklenen dördüncü çift saydamlığı gösterir. #8B1E3F80 kodundaki 80 (128) yaklaşık %50 opaklık demektir; FF tamamen opak, 00 tamamen saydamdır.",
        "<strong>Kısa alfa (4 hane):</strong> #F808 yazımı #FF880088 ile aynıdır."
      ]
    },
    {
      h: "HEX kodu RGB'ye ve RGB kodu HEX'e nasıl çevrilir?",
      p: [
        "Çevirme, her çifti ayrı ayrı onluk sisteme taşımaktan ibarettir. Çiftin ilk hanesi 16'lar basamağı, ikinci hanesi birler basamağıdır."
      ],
      formula: "HEX → RGB: değer = ilk hane × 16 + ikinci hane\n8B → 8 × 16 + 11 = 139   ·   1E → 1 × 16 + 14 = 30   ·   3F → 3 × 16 + 15 = 63\nRGB → HEX: değeri 16'ya böl; bölüm ilk hane, kalan ikinci hane\n200 ÷ 16 = 12 kalan 8 → C8   ·   75 ÷ 16 = 4 kalan 11 → 4B",
      ol: [
        "rgb(200, 75, 10) rengini HEX'e çevirelim. Kırmızı: 200 ÷ 16 = 12 kalan 8 → C8.",
        "Yeşil: 75 ÷ 16 = 4 kalan 11 → 4B.",
        "Mavi: 10 ÷ 16 = 0 kalan 10 → 0A. Tek haneli sonuçlarda başa sıfır eklemeyi unutmayın.",
        "Sonuç: #C84B0A. Kontrol için tersine çevirin: C8 = 12 × 16 + 8 = 200 olmalıdır."
      ],
      after: [
        "Onaltılık sistemin mantığı yalnızca renk kodlarında değil, bellek adreslerinde ve ağ donanımlarında da karşınıza çıkar; ayrıntısını [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik ve onaltılık sayı sistemleri]] yazısında bulabilirsiniz. Günlük işte elle hesap yerine [[arac:hex-rgb-cevir|HEX RGB Çevirici]] üç, altı ve sekiz haneli kodları alfa kanalıyla birlikte anında çevirir."
      ]
    },
    {
      h: "Temel renklerin HEX ve RGB kodları",
      p: [
        "Aşağıdaki tablo sık sorulan renklerin kodlarını içerir. Web tarayıcıları bu renklerin İngilizce adlarını da tanır; ancak bazı adlar beklenenden farklı tonlara karşılık gelir. Örneğin CSS'teki \"green\" saf yeşil değil, koyu yeşildir; saf yeşilin adı \"lime\"dır."
      ],
      table: {
        head: ["Renk", "HEX", "RGB", "HSL"],
        rows: [
          ["Kırmızı", "#FF0000", "255, 0, 0", "0°, 100%, 50%"],
          ["Saf yeşil (lime)", "#00FF00", "0, 255, 0", "120°, 100%, 50%"],
          ["Yeşil (green)", "#008000", "0, 128, 0", "120°, 100%, 25%"],
          ["Mavi", "#0000FF", "0, 0, 255", "240°, 100%, 50%"],
          ["Sarı", "#FFFF00", "255, 255, 0", "60°, 100%, 50%"],
          ["Turuncu (orange)", "#FFA500", "255, 165, 0", "39°, 100%, 50%"],
          ["Mor (purple)", "#800080", "128, 0, 128", "300°, 100%, 25%"],
          ["Gri", "#808080", "128, 128, 128", "0°, 0%, 50%"],
          ["Beyaz", "#FFFFFF", "255, 255, 255", "0°, 0%, 100%"],
          ["Siyah", "#000000", "0, 0, 0", "0°, 0%, 0%"]
        ]
      }
    },
    {
      h: "HSL nedir, ne işe yarar?",
      p: [
        "RGB makinenin rengi nasıl ürettiğini anlatır, ama insan için sezgisel değildir: bir bordonun biraz daha açık tonunu RGB sayılarına bakarak bulmak zordur. <strong>HSL</strong> aynı rengi insanın düşünme biçimine daha yakın üç değerle tanımlar:"
      ],
      ul: [
        "<strong>Ton (Hue):</strong> Renk çemberindeki açı, 0–360°. 0° kırmızı, 120° yeşil, 240° mavi; aradaki açılar ara renklerdir.",
        "<strong>Doygunluk (Saturation):</strong> Rengin canlılığı, %0 (gri) ile %100 (en canlı) arası.",
        "<strong>Açıklık (Lightness):</strong> %0 siyah, %50 rengin kendisi, %100 beyaz."
      ],
      after: [
        "Örnekteki #8B1E3F rengi HSL'de yaklaşık hsl(342, 64%, 33%) olarak yazılır. Bu rengin açık bir arka plan tonu için yalnızca açıklığı %90'a, koyu bir kenarlık tonu için %20'ye çekmeniz yeterlidir; ton ve doygunluk aynı kaldığı için renkler aynı aileden görünür. Tasarım sistemlerinde düğme, uyarı ve arka plan tonlarının HSL ile üretilmesinin nedeni budur. Dönüşüm formülü birkaç adım sürdüğü için [[arac:rgb-hsl-cevir|RGB HSL Çevirici]]yi kullanmak pratiktir; araç CSS'e yapıştırılacak hsl() ve rgb() yazımlarını hazır verir."
      ]
    },
    {
      h: "Bir resimdeki rengin kodu nasıl bulunur?",
      p: [
        "Bir logodaki, fotoğraftaki ya da ekran görüntüsündeki rengin kodunu bulmak için damlalık (renk seçici) kullanılır. Damlalık tıkladığınız pikselin RGB değerini okur ve HEX'e çevirir."
      ],
      ol: [
        "Resmi [[arac:resimden-renk-paleti|Resimden Renk Paleti]] aracına sürükleyin; dosya bilgisayarınızdan çıkmaz.",
        "Araç fotoğraftaki baskın 5, 8 ya da 12 rengi otomatik çıkarır; aradığınız renk aralarındaysa kodunu tek tıkla kopyalayın.",
        "Belirli bir noktanın rengi gerekiyorsa damlalık moduna geçip o noktaya tıklayın.",
        "Fotoğraflarda aynı yüzeydeki pikseller gölge ve sıkıştırma yüzünden birkaç değer farklı olabilir; birkaç noktayı deneyip ortalama tonu seçin.",
        "Bulduğunuz kodu HEX, RGB ya da HSL olarak tasarım programınıza veya CSS dosyanıza yapıştırın."
      ],
      after: [
        "Logo renklerini kesin olarak öğrenmenin en güvenilir yolu, markanın kurumsal kimlik kılavuzudur. JPEG sıkıştırması ve ekran renk profilleri yüzünden fotoğraftan alınan kod, orijinalden birkaç birim sapabilir."
      ]
    },
    {
      h: "Renk paleti nasıl oluşturulur?",
      p: [
        "Uyumlu bir palet, renk çemberi üzerindeki açılar kullanılarak kurulabilir. HSL'in ton değeri bu yüzden çok işe yarar: aşağıdaki kuralların hepsi tona belirli bir açı eklemekten ibarettir."
      ],
      table: {
        head: ["Uyum türü", "Kural (tona eklenen açı)", "Ana renk 342° ise"],
        rows: [
          ["Tamamlayıcı", "+180°", "162° (zümrüt yeşili)"],
          ["Benzer (analog)", "−30° ve +30°", "312° ve 12°"],
          ["Üçlü (triadik)", "+120° ve +240°", "102° ve 222°"],
          ["Bölünmüş tamamlayıcı", "+150° ve +210°", "132° ve 192°"],
          ["Tek renk (monokrom)", "Ton sabit, açıklık değişir", "342° ile %20, %33, %60, %90 açıklık"]
        ]
      },
      after: [
        "Paleti oluşturduktan sonra metin ve arka plan renklerinin okunabilirliğini kontrol etmek gerekir. Erişilebilirlik kuralları (WCAG) normal boyutlu metin için en az 4,5:1 kontrast oranı ister. Örnekteki bordo rengin beyaz zeminle kontrastı yaklaşık 8,9:1'dir, yani beyaz yazı bordo zemin üzerinde rahatça okunur. [[arac:renk-secici|Renk Seçici]] aracı uyum önerilerini ve kontrast oranını birlikte gösterir."
      ]
    },
    {
      h: "Web için hangi renk kodu kullanılmalı? HEX, RGB, HSL ve CMYK",
      p: [
        "Web sayfalarında üç yazım da geçerlidir ve aynı rengi verir; seçim alışkanlık ve ihtiyaca bağlıdır. HEX kısadır ve tasarım programlarından kopyalamak kolaydır. RGB ve HSL ise saydamlık (alfa) eklemek ve kod içinde tonla oynamak için daha okunaklıdır: <code>rgb(139 30 63 / 50%)</code> ya da <code>hsl(342 64% 33%)</code> gibi.",
        "Baskı işleri farklı bir dünyadır. Yazıcılar ışık değil mürekkep kullanır ve renkler camgöbeği, macenta, sarı ve siyah (CMYK) mürekkeplerin üst üste binmesiyle oluşur. Mürekkep ışığı soğurduğu için bu modele çıkarmalı model denir. Ekranda görülen bazı canlı RGB renkleri CMYK'da birebir basılamaz; bu yüzden kartvizit ya da broşür hazırlarken rengi CMYK değerleriyle tanımlamak ve deneme baskısı almak gerekir."
      ],
      note: "Ekranlar arasında da renk farkı olabilir: aynı HEX kodu farklı kalibrasyondaki iki monitörde biraz farklı görünür. Web'de standart renk uzayı sRGB'dir."
    },
    {
      h: "Renk kodlarıyla çalışırken sık yapılan hatalar",
      ul: [
        "<strong># işaretini unutmak:</strong> CSS'te HEX kodu # olmadan yazılırsa geçersiz sayılır ve renk uygulanmaz.",
        "<strong>Tek haneli sonucu sıfırsız yazmak:</strong> Mavi 10 için HEX \"A\" değil \"0A\" olmalıdır; aksi hâlde kod beş haneye düşer.",
        "<strong>O harfi ile 0 rakamını karıştırmak:</strong> HEX kodlarında yalnızca 0–9 ve A–F kullanılır; O, G gibi harfler geçersizdir.",
        "<strong>Renk adlarına güvenmek:</strong> CSS'teki renk adları her zaman beklenen tonu vermez; kesin sonuç için kod kullanın.",
        "<strong>Baskıda RGB kodu vermek:</strong> Matbaaya RGB dosya göndermek, çıktıda soluk ya da kaymış renklere yol açabilir."
      ]
    }
  ],
  faq: [
    ["HEX renk kodu nedir?", "HEX renk kodu, bir rengi oluşturan kırmızı, yeşil ve mavi ışığın 0–255 arası şiddetlerini ikişer haneli onaltılık sayılarla yazan altı haneli koddur. # işaretiyle başlar; #FF0000 saf kırmızıdır."],
    ["RGB renk kodu nasıl okunur?", "RGB kodu sırasıyla kırmızı, yeşil ve mavi bileşenlerin 0 ile 255 arasındaki değerlerini verir. rgb(139, 30, 63) kodunda kırmızı baskındır, mavi biraz eşlik eder ve sonuç koyu bordo bir tondur."],
    ["HEX kodu RGB'ye nasıl çevrilir?", "Kod üç çifte ayrılır ve her çiftte ilk hane 16 ile çarpılıp ikinci hane eklenir; A ile F arası harfler 10 ile 15 sayılır. #8B1E3F için 8B = 139, 1E = 30, 3F = 63 bulunur."],
    ["Bir resimdeki rengin kodu nasıl bulunur?", "Resmi bir damlalık ya da palet aracına yükleyip renk kodunu öğrenmek istediğiniz noktaya tıklarsınız. Araç pikselin RGB değerini okuyup HEX'e çevirir; fotoğraflarda birkaç noktayı deneyip ortalama tonu seçmek daha doğrudur."],
    ["HSL nedir, ne işe yarar?", "HSL, rengi ton açısı, doygunluk yüzdesi ve açıklık yüzdesiyle tanımlayan sistemdir. Tonu sabit tutup yalnızca açıklığı değiştirerek aynı rengin açık ve koyu tonlarını üretmeyi çok kolaylaştırır."],
    ["Kırmızının HEX kodu nedir?", "Saf kırmızının HEX kodu #FF0000, RGB karşılığı rgb(255, 0, 0) ve HSL karşılığı hsl(0, 100%, 50%) şeklindedir. Koyu kırmızı ve bordo tonlarında kırmızı değeri düşer ya da küçük miktarda mavi eklenir."],
    ["Web için hangi renk kodu kullanılır?", "Web sayfalarında HEX, RGB ve HSL yazımlarının üçü de geçerlidir ve aynı sonucu verir. HEX kısa olduğu için yaygındır; saydamlık ve ton ayarı gerektiğinde RGB ya da HSL daha okunaklıdır."],
    ["Renk paleti nasıl oluşturulur?", "Ana rengin HSL tonuna belirli açılar eklenerek uyumlu renkler bulunur: 180° tamamlayıcıyı, 30° benzer renkleri, 120° üçlü uyumu verir. Ardından metin ve zemin renkleri arasında en az 4,5:1 kontrast olduğu kontrol edilir."]
  ],
  tools: ["hex-rgb-cevir", "rgb-hsl-cevir", "renk-secici", "resimden-renk-paleti"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "dpi-ve-cozunurluk-nedir"],
  sources: [
    ["W3C – CSS Color Module Level 4", "https://www.w3.org/TR/css-color-4/"],
    ["W3C – Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.2", "https://www.w3.org/TR/WCAG22/"]
  ]
};
