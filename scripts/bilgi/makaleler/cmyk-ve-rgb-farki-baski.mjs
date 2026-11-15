export default {
  slug: "cmyk-ve-rgb-farki-baski",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "CMYK ve RGB Farkı Nedir? Baskıda Renkler Neden Farklı Çıkar",
  pageTitle: "CMYK ve RGB Farkı: Baskıda Renkler Neden Farklı Çıkar?",
  description: "RGB ekranın ışıkla, CMYK baskının mürekkeple renk üretme yöntemidir. Baskıda renk kayması, RGB'den CMYK'ye çevirme, matbaaya dosya hazırlama ve DPI.",
  keywords: ["cmyk rgb farkı", "cmyk nedir", "baskıda renk farkı", "rgb'den cmyk'ye çevirme", "matbaa için dosya hazırlama", "pantone nedir", "zengin siyah nedir", "baskı için kaç dpi"],
  lead: "RGB, ekranların kırmızı, yeşil ve mavi <strong>ışığı toplayarak</strong> renk ürettiği modeldir; CMYK ise yazıcı ve matbaaların camgöbeği, macenta, sarı ve siyah <strong>mürekkebi üst üste basarak</strong> ışığı soğurduğu modeldir. Ekran ışık yaydığı, kâğıt ise yalnızca yansıttığı için ekranda görülebilen bazı canlı renkler mürekkeple basılamaz; baskıda renklerin daha mat ve koyu çıkmasının ana nedeni budur. Bu sayfada iki modelin farkını, RGB'den CMYK'ye çevirme formülünü, matbaaya dosya hazırlarken dikkat edilecekleri ve çözünürlük kuralını bulacaksınız.",
  kisaCevap: [
    "RGB toplamsal (additive) bir modeldir: üç ışık tam yandığında beyaz, hepsi sönükken siyah oluşur.",
    "CMYK çıkarımsal (subtractive) bir modeldir: mürekkep eklendikçe yansıyan ışık azalır ve renk koyulaşır.",
    "K harfi siyahı (key) gösterir; C, M ve Y'nin üst üste basılması saf siyah yerine koyu kahverengimsi bir ton verdiği için ayrı siyah kullanılır.",
    "Basit dönüşüm: K = 1 − en büyük(R', G', B'), C = (1 − R' − K) ÷ (1 − K); profesyonel işlerde renk profiliyle dönüştürülür.",
    "Matbaaya dosya genellikle CMYK, baskı boyutunda 300 DPI ve taşma payıyla gönderilir; ayrıntıyı matbaanızın şartnamesinden alın.",
    "Ofis yazıcıları CMYK mürekkep ya da toner kullanır ama sürücü RGB dosyayı kendisi dönüştürür."
  ],
  figure: {
    alt: "Solda ekranın kırmızı, yeşil ve mavi ışığı topladığı RGB modeli, sağda camgöbeği, macenta ve sarı mürekkebin üst üste bindiği CMYK modeli ve turuncu bir rengin RGB'den CMYK'ye çevrilme örneği.",
    caption: "RGB'de ışıklar üst üste geldikçe renk açılır ve merkezde beyaz oluşur. CMYK'de mürekkepler üst üste geldikçe renk koyulaşır; merkezde siyaha yakın koyu bir ton kalır, bu yüzden ayrı siyah (K) mürekkebi kullanılır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="30" class="b mid">RGB · ekran · ışık ekler</text>
  <rect x="40" y="44" width="280" height="230" rx="12" class="p"/>
  <circle cx="150" cy="130" r="58" class="sf" fill-opacity="0.18"/>
  <circle cx="210" cy="130" r="58" class="sf" fill-opacity="0.18"/>
  <circle cx="180" cy="180" r="58" class="sf" fill-opacity="0.18"/>
  <circle cx="150" cy="130" r="58" class="sb" fill="none"/>
  <circle cx="210" cy="130" r="58" class="sb" fill="none"/>
  <circle cx="180" cy="180" r="58" class="sb" fill="none"/>
  <text x="124" y="112" class="b sf mid">R</text><text x="236" y="112" class="b sf mid">G</text><text x="180" y="222" class="b sf mid">B</text>
  <text x="180" y="156" class="sm b mid sf">beyaz</text>
  <text x="180" y="296" class="sm mid">Hepsi tam açık = beyaz, hepsi kapalı = siyah</text>
  <text x="540" y="30" class="b mid">CMYK · baskı · mürekkep soğurur</text>
  <rect x="400" y="44" width="280" height="230" rx="12" class="sf sb"/>
  <circle cx="510" cy="130" r="58" class="c" fill-opacity="0.75"/>
  <circle cx="570" cy="130" r="58" class="m" fill-opacity="0.75"/>
  <circle cx="540" cy="180" r="58" class="y" fill-opacity="0.75"/>
  <text x="484" y="112" class="b mid">C</text><text x="596" y="112" class="b mid">M</text><text x="540" y="222" class="b mid">Y</text>
  <rect x="628" y="214" width="40" height="40" rx="4" class="t"/><text x="648" y="240" class="b mid sf">K</text>
  <text x="540" y="296" class="sm mid">Mürekkep arttıkça renk koyulaşır</text>
  <rect x="40" y="318" width="640" height="88" rx="10" class="sf sb"/>
  <rect x="40" y="318" width="8" height="88" class="p"/>
  <text x="64" y="344" class="b">Örnek: turuncu, RGB değeri 255 · 102 · 0 → CMYK</text>
  <text x="64" y="370" class="sm">R'=1 · G'=0,4 · B'=0 → K = 1 − 1 = 0 · C = 0 · M = (1 − 0,4) ÷ 1 = 0,6 · Y = 1</text>
  <text x="64" y="394" class="sm b p">Sonuç: C %0 · M %60 · Y %100 · K %0 (basit formül; matbaa profili sonucu değiştirebilir)</text>
</svg>`
  },
  sections: [
    {
      h: "RGB nedir? Ekranlar rengi nasıl üretir?",
      p: [
        "Telefon, bilgisayar ve televizyon ekranları her pikselde kırmızı (Red), yeşil (Green) ve mavi (Blue) ışık yayan küçük alt pikseller kullanır. Bu üç ışığın şiddeti değiştirilerek göz milyonlarca farklı renk algılar. Bu modele <strong>toplamsal</strong> (additive) renk modeli denir, çünkü ışıklar eklendikçe renk açılır: üç ışık tam şiddette yandığında beyaz görürsünüz.",
        "Dijital dosyalarda her kanal genellikle 0 ile 255 arasında bir sayıyla ifade edilir. RGB(255, 0, 0) saf kırmızı, RGB(0, 0, 0) siyah, RGB(255, 255, 255) beyazdır. Web sitelerinde kullanılan altı haneli renk kodları (#FF6600 gibi) aynı üç değerin on altılık sistemde yazılmış hâlidir; ayrıntılar [[bilgi:hex-rgb-renk-kodlari-nedir|HEX ve RGB renk kodları]] yazımızda anlatılır."
      ]
    },
    {
      h: "CMYK nedir? Baskıda renk nasıl oluşur?",
      p: [
        "Kâğıt ışık yaymaz; üzerine düşen ışığın bir kısmını yansıtır. Mürekkep ise bazı dalga boylarını soğurarak yansıyan ışığı azaltır. Baskıda kullanılan dört temel mürekkep <strong>camgöbeği</strong> (Cyan), <strong>macenta</strong> (Magenta), <strong>sarı</strong> (Yellow) ve <strong>siyah</strong>tır (Key). Bu modele <strong>çıkarımsal</strong> (subtractive) model denir: mürekkep eklendikçe yansıyan ışık azalır ve renk koyulaşır.",
        "Değerler yüzdeyle yazılır: C %0 M %60 Y %100 K %0, macentanın %60 ve sarının tam yoğunlukta basıldığı turuncu bir tondur. Matbaada her renk ayrı bir kalıpla, çok küçük noktalar (raster) hâlinde basılır; noktaların büyüklüğü yüzdeyi belirler ve göz bu noktaları uzaktan karışık bir renk olarak algılar.",
        "<strong>Siyah neden K harfiyle gösterilir?</strong> K, İngilizce \"key\" (anahtar) kelimesinden gelir; matbaacılıkta diğer renklerin hizalandığı ana kalıp genellikle siyah kalıptır. B harfinin \"blue\" (mavi) ile karışmaması da bir nedendir. Teoride C, M ve Y tam yoğunlukta üst üste basıldığında siyah oluşması gerekir; pratikte mürekkepler kusursuz olmadığı için koyu kahverengimsi bir ton çıkar, kâğıt çok fazla mürekkeple ıslanır ve kuruma zorlaşır. Ayrı siyah mürekkep hem daha net siyah hem de daha keskin yazı sağlar."
      ]
    },
    {
      h: "Baskıda renkler neden ekrandakinden farklı çıkar?",
      p: [
        "İki modelin üretebildiği renk aralığına <strong>renk gamı</strong> (gamut) denir. Ekranların RGB gamı, özellikle parlak yeşil, canlı mavi, neon turuncu ve elektrik moru gibi doygun renklerde CMYK baskının gamından geniştir. Ekranda gördüğünüz bir rengin mürekkeple birebir karşılığı yoksa dönüşümde en yakın basılabilir renk seçilir; sonuç daha mat ve donuk görünür.",
        "Bunun dışında başka etkenler de vardır: ekranınızın parlaklık ve renk ayarı, kâğıdın türü (kuşe, mat, ofset), kâğıdın beyazlığı, baskı makinesi, mürekkep ve ortam ışığı. Aynı dosya kuşe kâğıtta canlı, mat ve emici bir kâğıtta daha soluk çıkabilir. Kritik işlerde matbaalar ıslak ya da dijital prova sunar; renk beklentiniz yüksekse provayı onaylamadan baskıya geçmeyin."
      ],
      table: {
        head: ["Özellik", "RGB", "CMYK"],
        rows: [
          ["Çalışma ilkesi", "Işık ekler (toplamsal)", "Işığı soğurur (çıkarımsal)"],
          ["Temel renkler", "Kırmızı, yeşil, mavi", "Camgöbeği, macenta, sarı, siyah"],
          ["Değer aralığı", "Her kanal 0–255", "Her mürekkep %0–100"],
          ["Beyaz nasıl oluşur?", "Üç ışık tam açık", "Kâğıdın kendi rengi, mürekkep yok"],
          ["Siyah nasıl oluşur?", "Tüm ışıklar kapalı", "Siyah (K) mürekkep, gerekirse diğerleriyle"],
          ["Kullanım yeri", "Ekran, web, sosyal medya, video", "Matbaa, broşür, kartvizit, ambalaj"],
          ["Renk gamı", "Daha geniş, doygun renkler", "Daha dar, kâğıda ve mürekkebe bağlı"]
        ]
      }
    },
    {
      h: "RGB dosya CMYK'ye nasıl çevrilir? Formül ve örnek",
      p: [
        "Basit matematiksel dönüşüm, RGB değerlerini 0–1 aralığına indirip siyah miktarını en parlak kanaldan hesaplar. Bu formül bir fikir verir ve renk seçerken kullanışlıdır; ancak gerçek baskıda sonuç kâğıda ve makineye göre ayarlanmış bir <strong>renk profili</strong> ile dönüştürüldüğünde değişebilir."
      ],
      formula: "R' = R ÷ 255 · G' = G ÷ 255 · B' = B ÷ 255\nK = 1 − en büyük(R', G', B')\nC = (1 − R' − K) ÷ (1 − K)\nM = (1 − G' − K) ÷ (1 − K)\nY = (1 − B' − K) ÷ (1 − K)",
      ol: [
        "Lacivert bir ton seçelim: RGB(30, 60, 120).",
        "0–1 aralığına indirin: R' = 0,118, G' = 0,235, B' = 0,471.",
        "Siyahı bulun: en büyük değer 0,471; K = 1 − 0,471 = 0,529, yani %53.",
        "C = (1 − 0,118 − 0,529) ÷ 0,471 = 0,353 ÷ 0,471 ≈ 0,75; M = (1 − 0,235 − 0,529) ÷ 0,471 ≈ 0,50; Y = (1 − 0,471 − 0,529) ÷ 0,471 = 0.",
        "Sonuç yaklaşık C %75 M %50 Y %0 K %53'tür."
      ],
      after: [
        "Bu hesabı [[arac:cmyk-rgb-cevir|CMYK RGB çevirici]] iki yönde yapar ve toplam mürekkep oranını da gösterir. Elinizde yalnızca bir HEX kod varsa önce [[arac:hex-rgb-cevir|HEX RGB çevirici]] ile RGB değerine geçebilirsiniz.",
        "Profesyonel tasarım programlarında dönüşüm, matbaanın önerdiği bir CMYK profiliyle yapılır. Bu profiller, belirli bir kâğıt ve baskı koşulu için hangi mürekkep oranlarının en yakın rengi vereceğini tanımlar. Matbaanız belirli bir profil istiyorsa dönüşümü o profille yapın ya da dosyayı RGB gönderip dönüşümü matbaaya bırakmanın uygun olup olmadığını sorun."
      ]
    },
    {
      h: "Matbaaya hangi renk modunda ve nasıl dosya gönderilir?",
      p: [
        "Her matbaanın kendi teknik şartnamesi vardır ve son söz onundur. Yine de çoğu matbaanın istediği temel kurallar benzerdir:"
      ],
      ul: [
        "<strong>Renk modu:</strong> Dosya genellikle CMYK istenir. RGB dosya gönderirseniz matbaa kendi ayarıyla dönüştürür ve renkler beklediğinizden farklı çıkabilir.",
        "<strong>Çözünürlük:</strong> Fotoğraf ve görseller, baskı boyutunda 300 DPI olmalıdır. İnternetten indirilmiş küçük görseller büyütüldüğünde bulanık basılır.",
        "<strong>Taşma payı:</strong> Kesim sırasında oluşabilecek küçük kaymalar için zemin rengi ve kenara dayanan görseller kesim çizgisinin dışına taşırılır; 3 mm yaygın bir değerdir.",
        "<strong>Güvenli alan:</strong> Yazılar ve logolar kesim çizgisinden birkaç milimetre içeride tutulur.",
        "<strong>Siyah yazılar:</strong> Küçük siyah yazılar yalnızca K %100 olmalıdır; dört renkten oluşan siyah yazıda renkler milimetrik kaydığında yazının kenarları renkli ve bulanık görünür.",
        "<strong>Büyük siyah alanlar:</strong> Geniş siyah zeminlerde daha derin bir siyah için K'ya diğer renkler eklenir (zengin siyah); oranı matbaanıza sorun.",
        "<strong>Toplam mürekkep:</strong> Dört rengin yüzdeleri toplamının (toplam mürekkep oranı) kâğıda göre bir üst sınırı vardır; aşılırsa mürekkep kurumaz ve sayfalar birbirine yapışabilir.",
        "<strong>Dosya biçimi:</strong> Yazı tipleri gömülü ya da eğriye çevrilmiş baskı kalitesinde PDF en yaygın istenen biçimdir."
      ]
    },
    {
      h: "Baskı için kaç DPI gerekir?",
      p: [
        "DPI (inç başına nokta), bir görüntünün baskıda inç başına kaç piksel taşıdığını gösterir. Göze yakın okunan baskılar (kartvizit, broşür, katalog, fotoğraf baskısı) için 300 DPI yaygın standarttır. Uzaktan bakılan afiş ve billboardlarda daha düşük değerler yeterli olabilir."
      ],
      formula: "Gereken piksel = baskı boyutu (cm) ÷ 2,54 × DPI\nÖrnek: A4 (21 × 29,7 cm) 300 DPI → 2.480 × 3.508 piksel",
      table: {
        head: ["Baskı boyutu", "300 DPI için piksel", "150 DPI için piksel"],
        rows: [
          ["Kartvizit 8,5 × 5,5 cm", "1.004 × 650", "502 × 325"],
          ["10 × 15 cm fotoğraf", "1.181 × 1.772", "591 × 886"],
          ["A5 (14,8 × 21 cm)", "1.748 × 2.480", "874 × 1.240"],
          ["A4 (21 × 29,7 cm)", "2.480 × 3.508", "1.240 × 1.754"],
          ["A3 (29,7 × 42 cm)", "3.508 × 4.961", "1.754 × 2.480"]
        ]
      },
      after: [
        "Kendi baskı ölçünüz için gereken pikseli [[arac:baski-piksel-boyutu-hesapla|baskı piksel boyutu hesaplama]] aracıyla, elinizdeki görselin hangi boyutta kaç DPI basılacağını [[arac:dpi-hesapla|DPI hesaplama aracı]]yla bulabilirsiniz. Konunun ayrıntıları [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük]] yazımızdadır."
      ]
    },
    {
      h: "Pantone nedir? Spot renk ne zaman gerekir?",
      p: [
        "CMYK baskıda her renk dört mürekkebin karışımıyla taklit edilir. <strong>Spot renk</strong> ise önceden karıştırılmış, tek bir özel mürekkepten oluşan renktir. Pantone, bu özel renkleri numaralandıran ve dünya çapında yaygın kullanılan bir renk eşleştirme sistemidir; tasarımcı ve matbaa aynı numarayı kullandığında hangi tonun kastedildiği konusunda anlaşmazlık olmaz.",
        "Kurumsal logolar, ambalajlar ve renk tutarlılığının kritik olduğu işlerde spot renk tercih edilir, çünkü CMYK karışımıyla elde edilemeyen bazı canlı ya da metalik renkler spot mürekkeple basılabilir. Ancak her spot renk ayrı bir kalıp ve baskı geçişi gerektirdiği için maliyeti artırır. Küçük adetli dijital baskılarda spot renkler genellikle CMYK'ye dönüştürülerek basılır."
      ]
    },
    {
      h: "Ofis yazıcısı CMYK mi kullanır?",
      p: [
        "Renkli lazer ve mürekkep püskürtmeli ofis yazıcılarının büyük çoğunluğu camgöbeği, macenta, sarı ve siyah sarf malzemesi kullanır; bazı fotoğraf yazıcılarında açık camgöbeği, açık macenta gibi ek renkler de bulunur. Ancak ofis yazıcısına gönderdiğiniz belgeyi CMYK'ye çevirmeniz gerekmez: yazıcı sürücüsü RGB dosyayı kendi profiliyle otomatik dönüştürür.",
        "Ofis baskısında renk tutarlılığı matbaa kadar sıkı değildir. Kurumsal renklerinizin ofis yazıcısında farklı çıkması normaldir; önemli renkli işler için matbaa ya da kalibre edilmiş dijital baskı tercih edilir. Ofis yazıcısında renkli baskının sayfa maliyetini hesaplamak için [[bilgi:toner-kac-sayfa-basar-sayfa-maliyeti|toner kaç sayfa basar]] yazımıza bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ekrana güvenip renk onaylamak:</strong> Ekranınız kalibre değilse gördüğünüz renk dosyadaki renk bile değildir. Kritik işlerde prova isteyin.",
        "<strong>Siyah yazıyı dört renkle yapmak:</strong> Küçük puntolu yazılarda K %100 dışındaki siyahlar bulanık görünür.",
        "<strong>Web görselini baskıda kullanmak:</strong> 72 ya da 96 DPI'lık küçük görseller A4'e büyütüldüğünde pikselli basılır.",
        "<strong>Taşma payı bırakmamak:</strong> Kenara dayanan zeminlerde kesimden sonra ince beyaz şeritler oluşabilir.",
        "<strong>Neon ve çok doygun renklerde ısrar etmek:</strong> CMYK gamı dışındaki renkler matlaşır; gerekiyorsa spot renk düşünün."
      ]
    }
  ],
  faq: [
    ["CMYK ile RGB arasındaki fark nedir?", "RGB ekranların kırmızı, yeşil ve mavi ışığı toplayarak renk ürettiği modeldir. CMYK ise baskıda camgöbeği, macenta, sarı ve siyah mürekkebin ışığı soğurmasıyla renk oluşturur. Biri ışık, diğeri mürekkep tabanlıdır."],
    ["Baskıda renkler neden ekrandakinden farklı çıkar?", "Ekranın gösterebildiği renk aralığı CMYK baskınınkinden geniştir. Canlı yeşil, parlak mavi ve neon tonlar mürekkeple tam basılamaz; ayrıca kâğıt türü, ekran ayarı ve ortam ışığı da algılanan rengi değiştirir."],
    ["RGB dosya CMYK'ye nasıl çevrilir?", "Basit yöntemde RGB değerleri 0–1 aralığına indirilir, K = 1 − en büyük değer bulunur ve C, M, Y formülle hesaplanır. Profesyonel işlerde dönüşüm, matbaanın önerdiği CMYK renk profiliyle tasarım programında yapılır."],
    ["Matbaaya hangi renk modunda dosya gönderilir?", "Matbaalar genellikle CMYK modunda, baskı boyutunda 300 DPI çözünürlükte, taşma paylı ve yazı tipleri gömülü PDF ister. Kesin kurallar matbaadan matbaaya değiştiği için teknik şartnamesini mutlaka okuyun."],
    ["Pantone nedir?", "Pantone, önceden karıştırılmış özel mürekkep renklerini numaralandıran bir renk eşleştirme sistemidir. Logo ve ambalaj gibi renk tutarlılığının önemli olduğu işlerde spot renk olarak kullanılır ve ek baskı kalıbı gerektirir."],
    ["Ofis yazıcısı CMYK mi kullanır?", "Renkli ofis yazıcılarının çoğu camgöbeği, macenta, sarı ve siyah sarf malzemesi kullanır. Ancak belgeyi CMYK'ye çevirmeniz gerekmez; yazıcı sürücüsü RGB dosyayı baskıdan önce otomatik olarak dönüştürür."],
    ["Siyah neden K harfiyle gösterilir?", "K, matbaacılıkta ana hizalama kalıbını ifade eden İngilizce key kelimesinden gelir; B harfinin mavi ile karışmasını da önler. Ayrı siyah mürekkep, üç rengin karışımından daha net bir siyah ve daha keskin yazı sağlar."],
    ["Baskı için kaç DPI gerekir?", "Yakından bakılan kartvizit, broşür ve fotoğraf baskıları için baskı boyutunda 300 DPI yaygın standarttır. Uzaktan görülen afiş ve büyük pankartlarda 100–150 DPI çoğu zaman yeterli olur."],
    ["Zengin siyah nedir?", "Zengin siyah, büyük siyah alanların daha derin görünmesi için siyah mürekkebe belirli oranlarda camgöbeği, macenta ve sarı eklenmesidir. Küçük yazılarda kullanılmaz; uygun oranı matbaanızdan öğrenmeniz gerekir."]
  ],
  tools: ["cmyk-rgb-cevir", "hex-rgb-cevir", "dpi-hesapla", "baski-piksel-boyutu-hesapla"],
  related: ["hex-rgb-renk-kodlari-nedir", "dpi-ve-cozunurluk-nedir", "a4-kagit-boyutu-kac-cm"],
  sources: [
    ["ISO – Grafik teknolojisi standartları (ISO 12647 serisi)", "https://www.iso.org/"]
  ]
};
