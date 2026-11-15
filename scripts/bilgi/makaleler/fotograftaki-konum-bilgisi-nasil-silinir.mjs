export default {
  slug: "fotograftaki-konum-bilgisi-nasil-silinir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Fotoğraftaki Konum Bilgisi Nasıl Silinir? EXIF Verisi Nedir, Ne İşe Yarar",
  pageTitle: "Fotoğraftaki Konum Bilgisi Nasıl Silinir? EXIF Verisi Nedir",
  description: "Telefon fotoğrafları EXIF içinde GPS konumu, çekim tarihi ve cihaz bilgisi saklar. EXIF nedir, konum nasıl görülür ve silinir, WhatsApp ve sosyal medya ne yapar?",
  keywords: ["exif nedir", "fotoğraftan konum bilgisi silme", "exif verisi temizleme", "fotoğraf meta verisi", "iphone fotoğraf konumu kapatma", "fotoğraf çekim tarihi görme", "whatsapp fotoğraf konum", "android kamera konum kapatma"],
  lead: "Fotoğraftaki konum bilgisi, dosyanın içindeki <strong>EXIF meta verisinden GPS alanlarının silinmesiyle</strong> kaldırılır; bunu bir EXIF temizleme aracıyla, işletim sisteminin dosya özellikleriyle ya da paylaşım sırasında konum seçeneğini kapatarak yapabilirsiniz. Telefonla çekilen fotoğraflar, kamera konum izni açıksa çekildiği yerin koordinatlarını birkaç metre hassasiyetle saklar. Bu sayfada EXIF'in ne olduğunu, hangi bilgileri içerdiğini, WhatsApp ve sosyal medyanın bu bilgiyi nasıl ele aldığını ve konumu kalıcı olarak nasıl kapatacağınızı bulacaksınız.",
  kisaCevap: [
    "EXIF, fotoğraf dosyasının içine yazılan meta veridir: kamera modeli, çekim tarihi ve saati, pozlama ayarları ve izin verildiyse GPS koordinatları.",
    "Konum, enlem ve boylam olarak saklanır; telefon fotoğraflarında hassasiyet çoğu zaman birkaç metredir, yani ev adresini gösterebilir.",
    "EXIF temizleme, pikselleri değiştirmeden yalnızca meta veriyi siler; fotoğrafın kalitesi düşmez.",
    "Büyük sosyal ağlar ve normal fotoğraf gönderimi genellikle EXIF'i kaldırır; dosya ya da belge olarak gönderimde ve e-postada veri çoğu zaman olduğu gibi kalır.",
    "Kalıcı çözüm, telefonun kamera uygulamasında konum kaydını kapatmaktır.",
    "PDF ve Word dosyalarında da yazar adı, kurum, oluşturma tarihi ve kullanılan program gibi meta veriler bulunur."
  ],
  figure: {
    alt: "Fotoğraf dosyasının yapısı: piksel verisi ve EXIF bloğu. EXIF içinde cihaz modeli, çekim tarihi, pozlama, yön ve GPS koordinatları var. Temizlendikten sonra yalnızca piksel verisi kalıyor, görüntü aynı.",
    caption: "EXIF, görüntünün kendisinden ayrı bir bölümde tutulur. Temizleme aracı bu bölümü atar, pikselleri yeniden sıkıştırmaz; bu yüzden fotoğrafın görünümü ve kalitesi değişmez.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir fotoğraf dosyasının içinde neler var?</text>
  <rect x="30" y="56" width="330" height="320" rx="12" class="sf sb"/>
  <text x="195" y="82" class="b mid">IMG_2041.jpg (önce)</text>
  <rect x="50" y="96" width="290" height="160" rx="6" class="ps"/>
  <text x="195" y="114" class="sm b mid">EXIF meta verisi</text>
  <g class="sm">
    <text x="64" y="138">Cihaz: telefon kamerası</text>
    <text x="64" y="160">Tarih: 14.06.2026 18:42:07</text>
    <text x="64" y="182">ISO 100 · f/1,8 · 1/250 sn</text>
    <text x="64" y="204">Yön: dikey (90°)</text>
  </g>
  <rect x="58" y="214" width="274" height="34" rx="4" class="dgs"/>
  <text x="68" y="236" class="sm b dg">GPS: 41,01367 K · 28,97836 D</text>
  <rect x="50" y="268" width="290" height="92" rx="6" class="oks"/>
  <text x="195" y="310" class="b mid">Piksel verisi (görüntü)</text>
  <text x="195" y="334" class="sm mid">4.032 × 3.024 piksel</text>
  <line x1="370" y1="216" x2="420" y2="216" class="sp sw" fill="none"/>
  <polygon points="420,206 438,216 420,226" class="p"/>
  <text x="404" y="196" class="sm b mid p">temizle</text>
  <rect x="446" y="56" width="250" height="320" rx="12" class="sf sb"/>
  <text x="571" y="82" class="b mid">IMG_2041.jpg (sonra)</text>
  <rect x="466" y="96" width="210" height="160" rx="6" class="sf sb dash"/>
  <text x="571" y="168" class="sm mid mu">meta veri yok</text>
  <text x="571" y="190" class="sm mid mu">konum, tarih, cihaz silindi</text>
  <rect x="466" y="268" width="210" height="92" rx="6" class="oks"/>
  <text x="571" y="310" class="b mid">Piksel verisi</text>
  <text x="571" y="334" class="sm mid">aynı · kalite kaybı yok</text>
</svg>`
  },
  sections: [
    {
      h: "EXIF verisi nedir?",
      p: [
        "EXIF (Exchangeable Image File Format, değiştirilebilir görüntü dosyası biçimi), dijital kameraların ve telefonların çektikleri fotoğrafın içine yazdığı teknik bilgilerin standart biçimidir. Bu bilgilere <strong>meta veri</strong>, yani \"veri hakkında veri\" denir. Fotoğrafı açtığınızda görmezsiniz; ama dosyanın başındaki ayrı bir bölümde durur ve fotoğraf uygulamaları, galeri programları ya da herhangi bir EXIF okuyucu tarafından kolayca görüntülenebilir.",
        "EXIF başlangıçta fotoğrafçıların hangi ayarlarla çekim yaptıklarını kaydetmesi için geliştirildi ve bugün de bu amaçla çok kullanışlıdır: galerinin fotoğrafları tarihe göre sıralaması, \"anılar\" özelliklerinin konuma göre albüm oluşturması ve fotoğrafın doğru yönde (dikey ya da yatay) gösterilmesi EXIF sayesinde olur. Sorun, aynı bilginin fotoğraf başkasıyla paylaşıldığında da dosyayla birlikte gitmesidir.",
        "EXIF en çok JPEG dosyalarında bulunur; HEIC, TIFF ve birçok RAW biçimi de benzer meta veri taşır. PNG ve WebP dosyalarında da meta veri bulunabilir, ancak telefon kameraları genellikle JPEG ya da HEIC üretir."
      ]
    },
    {
      h: "Fotoğrafta konum bilgisi saklanır mı? EXIF'te hangi bilgiler var?",
      p: [
        "Evet. Telefonunuzun kamera uygulamasına konum izni verdiyseniz her fotoğrafa çekildiği yerin enlem ve boylamı, çoğu zaman rakımı da yazılır. Konum GPS, kablosuz ağ ve baz istasyonu bilgisiyle belirlendiği için hassasiyet açık havada genellikle birkaç metredir. Bu da evinizin, çocuğunuzun okulunun ya da iş yerinizin tam adresini ortaya çıkarabilecek düzeydedir."
      ],
      table: {
        head: ["EXIF alanı", "Örnek değer", "Gizlilik açısından önemi"],
        rows: [
          ["GPS enlem / boylam", "41° 0′ 49,2″ K / 28° 58′ 42,1″ D", "Yüksek: çekildiği yerin adresi bulunabilir"],
          ["GPS rakım ve yön", "38 m, kuzeydoğu", "Orta: bina katı ya da bakış yönü tahmin edilebilir"],
          ["Çekim tarihi ve saati", "14.06.2026 18:42:07", "Orta: günlük rutininiz hakkında ipucu verir"],
          ["Cihaz markası ve modeli", "Telefon modeli", "Düşük-orta: kullandığınız cihazı gösterir"],
          ["Pozlama, ISO, odak uzaklığı", "1/250 sn, ISO 100, 4,3 mm", "Düşük: teknik bilgidir"],
          ["Yazılım ve küçük önizleme", "Düzenleme programı, küçük resim", "Düşük-orta: kırpılmış fotoğrafın eski hâli önizlemede kalabilir"]
        ],
        caption: "Bazı kameralar seri numarası, sahip adı ve telif bilgisi gibi alanlar da yazabilir."
      },
      after: [
        "Koordinatlar EXIF içinde derece, dakika ve saniye olarak saklanır. Haritada kullanılan ondalık dereceye çevirmek basittir: 41° 0′ 49,2″ = 41 + 0 ÷ 60 + 49,2 ÷ 3.600 = 41,01367°. Enlemde ondalık derecenin dördüncü basamağı yaklaşık 11 metreye karşılık gelir; beşinci basamak ise yaklaşık 1 metredir. Dosyanızda beş basamaklı koordinat görüyorsanız konum bina düzeyinde demektir."
      ]
    },
    {
      h: "Sosyal medya ve WhatsApp EXIF verisini siler mi?",
      p: [
        "Bu, platforma ve gönderme biçimine göre değişir. Büyük sosyal ağlar herkese açık gösterdikleri fotoğraflardan EXIF verisini genellikle kaldırır; ancak bu, platformun yükleme anında bu bilgiyi kendi sistemlerinde işlemediği anlamına gelmez. Mesajlaşma uygulamaları ise fotoğrafı \"fotoğraf\" olarak gönderdiğinizde genellikle yeniden sıkıştırır ve meta verinin büyük kısmını atar; \"dosya\" ya da \"belge\" olarak gönderdiğinizde orijinal dosyayı olduğu gibi iletir."
      ],
      table: {
        head: ["Paylaşım yolu", "EXIF genellikle ne olur?", "Öneri"],
        rows: [
          ["Sosyal ağda herkese açık gönderi", "Görüntülenen dosyadan büyük ölçüde kaldırılır", "Yine de paylaşımdan önce temizleyin"],
          ["Mesajlaşma uygulamasında normal fotoğraf", "Çoğunlukla kaldırılır, fotoğraf sıkıştırılır", "Uygulama sürümüne göre değişebilir"],
          ["Mesajlaşma uygulamasında belge/dosya", "Orijinal dosya, EXIF dahil gider", "Göndermeden önce mutlaka temizleyin"],
          ["E-posta eki", "Değişmeden gider", "Ekleri temizleyerek gönderin"],
          ["Bulut paylaşım bağlantısı", "Orijinal dosya paylaşılır", "Paylaşım için temizlenmiş kopya oluşturun"],
          ["İlan ve forum siteleri", "Siteye göre değişir", "Temizlemeden yüklemeyin"]
        ],
        caption: "Platformların davranışı güncellemelerle değişebilir; emin olmak için paylaştığınız dosyanın bir kopyasını indirip EXIF'ini kontrol edin."
      },
      after: [
        "En güvenli yaklaşım, platformun ne yapacağına güvenmek yerine fotoğrafı göndermeden önce kendiniz temizlemektir. Özellikle ikinci el ilanlarında evinizin içinden çekilmiş ürün fotoğrafları, konumu açık bırakıldığında adresinizi ele verebilir."
      ]
    },
    {
      h: "Fotoğraftaki konum bilgisi nasıl silinir?",
      p: [
        "Konumu silmenin birkaç yolu vardır. Tek seferlik paylaşımlar için bir EXIF temizleme aracı en hızlı ve kapsamlı yöntemdir; işletim sistemlerinin dosya özellikleri ve telefonların paylaşım menüleri de kısmi çözüm sunar."
      ],
      ol: [
        "[[arac:exif-temizle|EXIF Temizleme aracını]] açın ve fotoğrafı (birden fazla da olabilir) sürükleyip bırakın. Dosya bilgisayarınızdan çıkmaz, işlem tarayıcıda yapılır.",
        "Araç önce fotoğrafın içindeki konum, tarih ve cihaz bilgilerini gösterir; hangi bilgilerin paylaşılmak üzere olduğunu burada görürsünüz.",
        "Temizle düğmesine basın; meta veri silinir, piksel verisi yeniden sıkıştırılmadan korunur.",
        "Temizlenmiş kopyayı indirin ve paylaşımlarda bu kopyayı kullanın. Orijinali kendi arşivinizde tutabilirsiniz.",
        "Dosya boyutunu da küçültmeniz gerekiyorsa [[arac:resim-kucult|Resim Küçültme aracı]] ile istediğiniz KB'a indirin; yeniden kaydedilen görüntüde EXIF çoğu zaman zaten taşınmaz, ama sonucu yine kontrol edin."
      ],
      after: [
        "Windows'ta dosyaya sağ tıklayıp <em>Özellikler → Ayrıntılar → Özellikleri ve kişisel bilgileri kaldır</em> yolunu izleyerek meta veriyi silinmiş bir kopya oluşturabilirsiniz. iPhone'da fotoğrafı paylaşırken üst kısımdaki <em>Seçenekler</em> menüsünden konum anahtarını kapatarak yalnızca o paylaşım için konumu çıkarabilirsiniz. Android'de ise bazı galeri uygulamalarında paylaşım sırasında konumu kaldırma seçeneği bulunur; menü adları üreticiye göre değişir."
      ]
    },
    {
      h: "Telefonda kamera konum kaydı nasıl kapatılır?",
      p: [
        "Her fotoğrafı tek tek temizlemek yerine, kameranın konum kaydetmesini baştan kapatabilirsiniz. Bu durumda yeni çekilen fotoğraflara GPS bilgisi yazılmaz; ancak daha önce çekilmiş fotoğraflardaki konum silinmez."
      ],
      ul: [
        "<strong>iPhone:</strong> Ayarlar → Gizlilik ve Güvenlik → Konum Servisleri → Kamera → <em>Asla</em>. Tam konum yerine yaklaşık konuma izin vermek de bir ara seçenektir.",
        "<strong>Android:</strong> Kamera uygulamasını açın, ayarlar (dişli) simgesine dokunun ve <em>Konum etiketleri</em>, <em>Konum bilgisini kaydet</em> ya da benzer adlı seçeneği kapatın. Alternatif olarak Ayarlar → Uygulamalar → Kamera → İzinler → Konum yolundan izni kaldırabilirsiniz.",
        "<strong>Fotoğraf makinesi:</strong> GPS modülü ya da telefonla eşleşme yoluyla konum ekleyen makinelerde bu özellik menüden kapatılır."
      ],
      after: [
        "Konum kaydını tamamen kapatmak istemiyorsanız, yani kendi arşivinizde fotoğrafların nerede çekildiğini görmek hoşunuza gidiyorsa, kaydı açık bırakıp yalnızca paylaşacağınız kopyaları temizlemek de makul bir yoldur."
      ]
    },
    {
      h: "Fotoğrafın çekim tarihi nasıl öğrenilir?",
      p: [
        "Çekim tarihi EXIF'teki <em>DateTimeOriginal</em> alanında saklanır ve çoğu zaman saniye düzeyindedir. Dosya sisteminin gösterdiği \"oluşturma\" ya da \"değiştirilme\" tarihi ise dosyanın bilgisayara kopyalandığı ya da düzenlendiği ana göre değişebilir; bu yüzden asıl çekim anını gösteren EXIF tarihidir.",
        "Telefon galerisinde fotoğrafı açıp bilgi (i) simgesine dokunarak, bilgisayarda dosya özelliklerinin Ayrıntılar sekmesinden ya da EXIF Temizleme aracının ilk ekranından tarihi görebilirsiniz. EXIF tarihleri kolayca değiştirilebilen bilgiler olduğu için tek başına bir fotoğrafın ne zaman çekildiğinin kesin kanıtı sayılmaz."
      ]
    },
    {
      h: "PDF ve Word dosyalarında da meta veri var mı?",
      p: [
        "Evet. Belgeler de fotoğraflar gibi içlerinde görünmeyen bilgiler taşır ve bu bilgiler bazen fotoğraftaki konum kadar hassastır."
      ],
      ul: [
        "<strong>PDF:</strong> Başlık, yazar, konu, anahtar kelimeler, oluşturan program, dönüştüren yazılım, oluşturma ve değiştirme tarihleri. Bu bilgiler hem belge bilgisi sözlüğünde hem de XMP adlı ayrı bir meta veri bölümünde tutulabilir.",
        "<strong>Word:</strong> Yazar ve son kaydeden kişinin adı, kurum adı, düzeltme sayısı, toplam düzenleme süresi; ayrıca açık kalmış izlenen değişiklikler ve yorumlar.",
        "<strong>Excel:</strong> Yazar bilgisi, gizlenmiş sayfa ve sütunlar, eski veri kaynaklarına bağlantılar."
      ],
      after: [
        "Kişisel adınızın ya da kurum bilgisinin geçtiği bir CV'yi, teklif dosyasını veya resmî yazıyı paylaşmadan önce PDF meta verisini [[arac:pdf-meta-temizle|PDF Meta Veri Temizleme aracıyla]] görüp silebilirsiniz. Word'de aynı iş için <em>Dosya → Bilgi → Sorunları denetle → Belgeyi İncele</em> yolu kullanılır. Belge gizliliğiyle ilgili daha geniş bir anlatım [[rehber:pdf-sifreleme-ve-gizlilik|PDF şifreleme ve gizlilik rehberinde]] yer alır."
      ]
    },
    {
      h: "Sık yapılan hatalar ve dikkat edilecekler",
      ul: [
        "<strong>Ekran görüntüsünü çözüm sanmak:</strong> Ekran görüntüsü EXIF'teki konumu taşımaz ama görüntüdeki tabela, plaka, pencere manzarası gibi ayrıntılar yine konum ele verebilir.",
        "<strong>Yalnızca GPS'i silip önizlemeyi unutmak:</strong> Bazı düzenleyiciler kırpılmış fotoğrafın eski hâlini küçük önizleme olarak EXIF içinde bırakabilir; tüm meta veriyi temizlemek daha güvenlidir.",
        "<strong>Kamera iznini kapatıp eski fotoğrafları unutmak:</strong> İzin yalnızca yeni çekimleri etkiler; arşivdeki fotoğraflar konumu taşımaya devam eder.",
        "<strong>Videoları atlamak:</strong> Telefon videoları da konum ve tarih meta verisi içerebilir.",
        "<strong>Temizlenmiş dosyayı kontrol etmemek:</strong> Paylaştığınız kopyayı aracın ilk ekranında yeniden açarak konum alanının boş olduğunu doğrulayın."
      ]
    }
  ],
  faq: [
    ["EXIF verisi nedir?", "EXIF, kamera ve telefonların fotoğraf dosyasının içine yazdığı meta veridir. Cihaz modeli, çekim tarihi ve saati, pozlama ayarları, fotoğrafın yönü ve konum izni verildiyse GPS koordinatları bu bölümde saklanır."],
    ["Fotoğrafta konum bilgisi saklanır mı?", "Kamera uygulamasının konum izni açıksa evet. Fotoğrafa çekildiği yerin enlem ve boylamı, çoğu zaman rakımı da yazılır; telefonlarda hassasiyet genellikle birkaç metredir ve ev adresini gösterebilir."],
    ["Fotoğraftaki konum bilgisi nasıl silinir?", "En kolay yol fotoğrafı bir EXIF temizleme aracına yükleyip meta veriyi silmektir; Bilişim Ajans aracı bunu tarayıcıda, kalite kaybı olmadan yapar. Windows'ta dosya özelliklerinden, iPhone'da paylaşım seçeneklerinden de konum kaldırılabilir."],
    ["Sosyal medya EXIF verisini siler mi?", "Büyük sosyal ağlar herkese açık gösterdikleri fotoğraflardan EXIF verisini genellikle kaldırır. Ancak platformlar yükleme sırasında bu bilgiyi kendi sistemlerinde işleyebilir; bu yüzden paylaşımdan önce temizlemek daha güvenlidir."],
    ["WhatsApp'tan gönderilen fotoğrafta konum kalır mı?", "Normal fotoğraf olarak gönderildiğinde görüntü sıkıştırılır ve meta verinin büyük kısmı genellikle kaldırılır. Belge ya da dosya olarak gönderildiğinde ise orijinal dosya EXIF bilgileriyle birlikte iletilir."],
    ["Telefonda kamera konum kaydı nasıl kapatılır?", "iPhone'da Ayarlar, Gizlilik ve Güvenlik, Konum Servisleri, Kamera yolundan Asla seçilir. Android'de kamera uygulamasının ayarlarındaki konum etiketi seçeneği kapatılır ya da uygulama izinlerinden konum izni kaldırılır."],
    ["Fotoğrafın çekim tarihi nasıl öğrenilir?", "Çekim tarihi EXIF'teki orijinal tarih alanında saklanır. Galeride fotoğrafın bilgi ekranından, bilgisayarda dosya özelliklerinin Ayrıntılar sekmesinden ya da bir EXIF görüntüleyiciden saniyesine kadar görülebilir."],
    ["PDF ve Word dosyalarında da meta veri var mı?", "Evet. PDF'lerde yazar, başlık, oluşturan program ve tarihler; Word dosyalarında yazar, son kaydeden kişi, kurum ve düzenleme süresi gibi bilgiler bulunur. Paylaşmadan önce bunları kontrol edip silmek iyi bir alışkanlıktır."],
    ["EXIF temizlemek fotoğrafın kalitesini düşürür mü?", "Hayır, doğru yapılan EXIF temizliği yalnızca meta veri bölümünü siler ve piksel verisini yeniden sıkıştırmaz. Fotoğrafın çözünürlüğü, renkleri ve netliği aynı kalır; dosya boyutu birkaç KB azalabilir."]
  ],
  tools: ["exif-temizle", "pdf-meta-temizle", "resim-kucult"],
  related: ["dpi-ve-cozunurluk-nedir", "jpg-png-svg-farki", "fotografa-yazi-nasil-eklenir"],
  sources: [
    ["KVKK – Kişisel Verileri Koruma Kurumu", "https://www.kvkk.gov.tr/"],
    ["CIPA – Exif standardı", "https://www.cipa.jp/e/index.html"]
  ]
};
