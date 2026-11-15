export default {
  slug: "pdf-filigran-nasil-eklenir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'e Filigran Nasıl Eklenir? Belgeye Logo, Yazı ve Sayfa Numarası",
  pageTitle: "PDF'e Filigran Nasıl Eklenir? Logo, Yazı ve Sayfa Numarası",
  description: "PDF'e filigran eklemek için metin ya da logo seçin, açı, saydamlık ve yerleşimi ayarlayıp kaydedin. Kimlik fotokopisi filigranı, sayfa numarası ve düzleştirme.",
  keywords: ["pdf filigran ekleme", "pdf'e logo ekleme", "belgeye filigran", "pdf sayfa numarası ekleme", "kopyadır filigranı", "pdf watermark", "kimlik fotokopisi filigran", "word filigran"],
  lead: "PDF'e filigran eklemek için belgeyi bir filigran aracına yükleyip <strong>metni ya da logoyu seçmeniz, açıyı, saydamlığı ve yerleşimi (orta, döşeme ya da köşe) ayarlayıp yeni PDF'i kaydetmeniz</strong> yeterlidir. Kimlik fotokopisi gibi hassas belgelerde \"yalnızca … başvurusu için verilmiştir\" türünde, tarih içeren yarı saydam bir filigran belgenin başka amaçla kullanılmasını zorlaştırır. Bu sayfada filigran türlerini, doğru saydamlık ve açı seçimini, logo ve sayfa numarası eklemeyi, filigranı kalıcı hâle getirmeyi ve Word'de filigran yapmayı bulacaksınız.",
  kisaCevap: [
    "Filigran, sayfanın üzerine ya da altına yerleştirilen yarı saydam yazı veya logodur; belgenin durumunu (TASLAK, GİZLİ, KOPYA) ya da kullanım amacını gösterir.",
    "Okunabilirlik için saydamlık genellikle %15–30 aralığında, açı A4 sayfada köşeden köşeye yaklaşık 45–55 derece seçilir.",
    "Kimlik fotokopisine kime, hangi amaçla ve hangi tarihte verildiğini yazan bir filigran eklemek, belgenin kötüye kullanılmasını zorlaştırır.",
    "Logo filigranı için şeffaf arka planlı PNG kullanın; JPG logolar beyaz kutu oluşturur.",
    "Ayrı nesne olarak eklenen filigran PDF düzenleyicilerle silinebilir; düzleştirme ve şifreleme kaldırmayı zorlaştırır ama imkânsız hâle getirmez.",
    "Sayfa içeriğine işlenen filigran yazdırıldığında da görünür."
  ],
  figure: {
    alt: "A4 sayfa üzerinde çapraz, yarı saydam 'YALNIZCA KİRA BAŞVURUSU İÇİNDİR 16.11.2026' filigranı ve altta 'Sayfa 1 / 3' numarası. Sağda üç yerleşim türü: orta, döşeme ve köşe.",
    caption: "A4 sayfanın köşegeni yaklaşık 364 mm uzunluğundadır ve yatayla yaklaşık 55 derecelik açı yapar; çapraz filigran bu yüzden sayfanın en uzun boşluğunu kullanır. Sağdaki küçük sayfalar üç temel yerleşimi gösterir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">PDF filigranı: yerleşim ve okunabilirlik</text>
  <rect x="40" y="50" width="250" height="354" rx="4" class="sf sb"/>
  <g class="sb" fill="none">
    <line x1="64" y1="84" x2="200" y2="84"/><line x1="64" y1="104" x2="266" y2="104"/><line x1="64" y1="124" x2="250" y2="124"/>
    <line x1="64" y1="144" x2="266" y2="144"/><line x1="64" y1="164" x2="230" y2="164"/><line x1="64" y1="204" x2="266" y2="204"/>
    <line x1="64" y1="224" x2="240" y2="224"/><line x1="64" y1="244" x2="266" y2="244"/><line x1="64" y1="264" x2="210" y2="264"/>
    <line x1="64" y1="304" x2="266" y2="304"/><line x1="64" y1="324" x2="230" y2="324"/>
  </g>
  <line x1="40" y1="404" x2="290" y2="50" class="sa dash" fill="none"/>
  <text x="165" y="227" class="b mid p" transform="rotate(-54.7 165 227)">YALNIZCA KİRA BAŞVURUSU İÇİNDİR</text>
  <text x="165" y="251" class="sm mid p" transform="rotate(-54.7 165 251)">16.11.2026</text>
  <text x="165" y="392" class="sm mid mu">Sayfa 1 / 3</text>
  <text x="300" y="230" class="sm b">≈55°</text>
  <g class="sm mid">
    <rect x="380" y="70" width="80" height="113" rx="3" class="sf sb"/>
    <rect x="404" y="116" width="32" height="20" rx="3" class="ps"/>
    <text x="420" y="204" class="b">Orta</text><text x="420" y="222" class="mu">tek, büyük</text>
    <rect x="490" y="70" width="80" height="113" rx="3" class="sf sb"/>
    <g class="ps"><rect x="496" y="80" width="22" height="12" rx="2"/><rect x="544" y="80" width="22" height="12" rx="2"/><rect x="520" y="106" width="22" height="12" rx="2"/><rect x="496" y="132" width="22" height="12" rx="2"/><rect x="544" y="132" width="22" height="12" rx="2"/><rect x="520" y="158" width="22" height="12" rx="2"/></g>
    <text x="530" y="204" class="b">Döşeme</text><text x="530" y="222" class="mu">tüm sayfa</text>
    <rect x="600" y="70" width="80" height="113" rx="3" class="sf sb"/>
    <rect x="648" y="160" width="26" height="16" rx="2" class="p"/>
    <text x="640" y="204" class="b">Köşe</text><text x="640" y="222" class="mu">logo, damga</text>
  </g>
  <rect x="370" y="256" width="320" height="148" rx="10" class="sf sb"/>
  <text x="386" y="284" class="b">Önerilen ayarlar</text>
  <text x="386" y="312" class="sm">Saydamlık: %15–30 (metin okunur kalsın)</text>
  <text x="386" y="336" class="sm">Açı: 45–55° çapraz ya da 0° köşe</text>
  <text x="386" y="360" class="sm">Metin: amaç + kurum + tarih</text>
  <text x="386" y="384" class="sm">Kalıcılık: düzleştir, sonra şifrele</text>
</svg>`
  },
  sections: [
    {
      h: "Filigran nedir, ne işe yarar?",
      p: [
        "Filigran, belgenin içeriğini gizlemeden üzerine ya da arkasına yerleştirilen yarı saydam yazı veya görseldir. Kâğıt paralardaki ve resmî kâğıtlardaki ışığa tutunca görünen işaretlerden adını alır. Dijital belgelerde filigran üç temel amaçla kullanılır: belgenin durumunu belirtmek (TASLAK, GİZLİ, ÖRNEKTİR), sahipliğini göstermek (şirket logosu, tasarımcının adı) ve kullanım amacını sınırlamak (\"yalnızca … için verilmiştir\").",
        "Filigran bir güvenlik kilidi değil, caydırıcı ve bilgilendirici bir işarettir. Belgenin kimin için, hangi amaçla hazırlandığını herkesin görebileceği biçimde kayda geçirir. Belge izinsiz paylaşılırsa kaynağının anlaşılmasını kolaylaştırır; taslak bir sözleşmenin yanlışlıkla son hâl sanılmasını önler."
      ]
    },
    {
      h: "Kimlik fotokopisine neden filigran eklenmeli?",
      p: [
        "Kimlik kartı, ehliyet ya da pasaport fotokopisi; kiralama, iş başvurusu, abonelik ve benzeri işlemlerde sık istenir. Bu kopyalar yanlış ellere geçtiğinde başkası adına hat açma, üyelik oluşturma ya da sahte başvuru gibi kötüye kullanımlarda kullanılabilir. Kopyanın üzerine verildiği kurumu, amacı ve tarihi yazan bir filigran eklemek, belgenin başka bir işlemde kullanılmasını zorlaştırır ve dikkatli bir görevlinin şüphelenmesini sağlar.",
        "Kişisel verilerin korunması mevzuatı da veri sorumlularının yalnızca amaçla sınırlı veri işlemesini öngörür. Siz de kendi tarafınızda bu ilkeyi uygulayabilir, belgeyi verdiğiniz amaca \"etiketleyebilirsiniz\"."
      ],
      ul: [
        "<strong>Amaç ve alıcıyı yazın:</strong> \"YALNIZCA ABC EMLAK KİRA BAŞVURUSU İÇİNDİR\" gibi açık bir ifade kullanın.",
        "<strong>Tarih ekleyin:</strong> 16.11.2026 gibi bir tarih, belgenin aylar sonra başka bir işte kullanılmasını zorlaştırır.",
        "<strong>Bilgileri okunur bırakın:</strong> Filigran, kurumun görmesi gereken ad, numara ve fotoğrafı okunmaz hâle getirmemelidir; aksi hâlde başvurunuz reddedilebilir.",
        "<strong>Fotoğraf alanını da kesin:</strong> Filigranın bir kısmının fotoğrafın üzerinden geçmesi, fotoğrafın kesilip başka belgede kullanılmasını zorlaştırır."
      ],
      note: "Bazı resmî kurumlar ve bankalar belge üzerinde işaret istemeyebilir ya da kendi süreçleriyle kopya alır. Filigran eklemeden önce belgeyi isteyen kuruma kabul edip etmediğini sorabilirsiniz."
    },
    {
      h: "PDF'e filigran nasıl eklenir? Adım adım",
      ol: [
        "[[arac:pdf-filigran|PDF Filigran Ekleme aracını]] açın ve PDF dosyanızı (gerekirse birden fazla dosyayı) sürükleyip bırakın. Dosya bilgisayarınızdan çıkmaz.",
        "Hazır metinlerden birini (GİZLİ, TASLAK, KOPYA) seçin ya da kendi metninizi yazın; Türkçe karakterler sorunsuz görünür.",
        "Yerleşimi seçin: tek büyük çapraz yazı için <em>orta</em>, sayfanın tamamını kaplamak için <em>döşeme</em>, küçük bir damga ya da logo için <em>köşe</em>.",
        "Açıyı, yazı boyutunu, rengi ve saydamlığı ayarlayın; önizlemede alttaki metnin okunur kaldığından emin olun.",
        "Logo eklemek istiyorsanız şeffaf arka planlı PNG dosyasını seçin ve boyutunu ayarlayın.",
        "Kaydet düğmesine basın ve filigranlı PDF'i indirin; orijinal dosyanızı ayrıca saklayın."
      ],
      after: [
        "Kimlik fotokopiniz kâğıt üzerindeyse önce tarayıp PDF'e dönüştürmeniz gerekir; bunun için [[rehber:taranmis-belgeyi-pdf-yapma|taranmış belgeyi PDF yapma rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Şeffaf filigran nasıl ayarlanır? Saydamlık, açı ve boyut",
      p: [
        "İyi bir filigran fark edilir ama belgenin okunmasını engellemez. Bunu sağlayan üç ayar saydamlık, renk ve yerleşimdir. Aşağıdaki tablo pratikte iyi sonuç veren başlangıç değerlerini gösterir."
      ],
      table: {
        head: ["Amaç", "Yerleşim", "Saydamlık", "Açı", "Not"],
        rows: [
          ["Taslak, gizli belge", "Orta", "%15–25", "45–55°", "Büyük punto, tek satır"],
          ["Kimlik ve özel belge", "Döşeme", "%20–30", "30–45°", "Amaç ve tarih içeren metin"],
          ["Kurumsal logo", "Köşe ya da orta", "%10–20", "0°", "Şeffaf PNG kullanın"],
          ["Telif ve tasarım koruması", "Döşeme", "%15–25", "30–45°", "Görselin önemli kısmının üzerinden geçsin"]
        ],
        caption: "Değerler başlangıç önerisidir; koyu renkli ya da yoğun içerikli sayfalarda saydamlığı biraz artırmanız gerekebilir."
      },
      formula: "A4 köşegeni = √(210² + 297²) ≈ 363,7 mm\nKöşegen açısı = arctan(297 ÷ 210) ≈ 54,7°",
      after: [
        "Bu hesap, köşeden köşeye uzanan filigranın neden 45 değil yaklaşık 55 derecelik açıyla en iyi oturduğunu açıklar. Yatay A4 sayfada aynı açı yaklaşık 35 derecedir. Yazıyı çok uzun tutarsanız punto küçülmek zorunda kalır; amaç ve tarih için iki kısa satır, tek uzun satırdan daha okunaklıdır."
      ]
    },
    {
      h: "PDF'e logo ve sayfa numarası nasıl eklenir?",
      p: [
        "Logo filigranı, kurumsal tekliflerde, kataloglarda ve fiyat listelerinde belgenin kime ait olduğunu gösterir. Logo dosyanız SVG ise önce şeffaf arka planlı PNG'ye çevirin; JPG logolar arka plandaki beyaz kutuyla birlikte basıldığı için belgede leke gibi görünür. Format farkları için [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısına bakabilirsiniz.",
        "Sayfa numarası, çok sayfalı raporlarda, tezlerde ve sözleşmelerde sayfaların eksiksiz olduğunu gösterir. \"Sayfa 1 / 12\" biçimi, toplam sayfa sayısını da gösterdiği için sözleşmelerde özellikle kullanışlıdır: araya sayfa eklenmesi ya da bir sayfanın çıkarılması daha kolay fark edilir."
      ],
      ol: [
        "[[arac:pdf-sayfa-numarasi|PDF Sayfa Numarası Ekleme aracına]] dosyanızı bırakın.",
        "Konumu (alt orta, alt sağ, alt sol) ve biçimi (1, 1 / 12 ya da Sayfa 1) seçin.",
        "Kapak sayfasının numarasız kalmasını istiyorsanız ilgili seçeneği işaretleyin; gerekiyorsa başlangıç numarasını değiştirin.",
        "Yazı boyutunu ve rengini ayarlayıp yeni PDF'i indirin."
      ],
      after: [
        "Hem filigran hem sayfa numarası ekleyecekseniz önce sayfa numarasını, sonra filigranı eklemek ve en sonda düzleştirmek iyi bir sıralamadır."
      ]
    },
    {
      h: "Filigran sonradan kaldırılabilir mi?",
      p: [
        "Teknik olarak PDF'e ayrı bir nesne olarak eklenen filigran, gelişmiş PDF düzenleyicilerde seçilip silinebilir. Bu yüzden filigranı \"aşılmaz bir kilit\" olarak değil, caydırıcı bir işaret olarak görmek gerekir. Filigranın kaldırılmasını zorlaştırmak için iki ek adım atılabilir:"
      ],
      ul: [
        "<strong>Düzleştirme:</strong> [[arac:pdf-duzlestir|PDF Düzleştirme aracı]] ile sayfaları görüntüye çevirirseniz filigran ile alttaki içerik tek bir resim katmanında birleşir. Dosya biraz büyür ve metin seçilemez hâle gelir; ama filigran artık ayrı bir nesne değildir.",
        "<strong>Şifreleme ve izinler:</strong> [[arac:pdf-sifre-ekle|PDF Şifre Ekleme aracı]] ile açılış parolası ve düzenleme kısıtlaması koyabilirsiniz. Açılış parolası güçlü bir korumadır; düzenleme izinleri ise her programın uyduğu kurallar değildir.",
        "<strong>Paylaşım kaydı:</strong> Belgeyi kime, hangi tarihte gönderdiğinizi not etmek, gerektiğinde filigranlı kopyanın kaynağını kanıtlamanızı kolaylaştırır."
      ],
      after: [
        "Başkasına ait belgelerdeki filigranı izinsiz kaldırmak telif ve kişisel veri mevzuatı açısından hukuki sorun doğurabilir. Bu sayfa yalnızca kendi belgelerinizi korumanız için hazırlanmıştır."
      ]
    },
    {
      h: "Word'de filigran nasıl yapılır?",
      p: [
        "Belgeniz henüz Word aşamasındaysa filigranı orada ekleyip sonra PDF olarak kaydedebilirsiniz. Güncel Word sürümlerinde <em>Tasarım</em> sekmesindeki <em>Filigran</em> düğmesi hazır seçenekler (GİZLİ, TASLAK, ÖRNEK) sunar. <em>Özel Filigran</em> penceresinde kendi metninizi, yazı tipini, rengini, yarı saydamlığı ve çapraz ya da yatay yerleşimi seçebilir veya resim filigranı ekleyebilirsiniz. Eski sürümlerde aynı seçenek <em>Sayfa Düzeni</em> sekmesindedir.",
        "Word filigranı üst bilgi katmanına yerleştirilir ve her sayfada tekrar eder. Belgeyi <em>Farklı Kaydet → PDF</em> ile kaydettiğinizde filigran PDF'e aktarılır. Word'den PDF'e geçiş adımları için [[rehber:word-pdf-cevirme|Word PDF çevirme rehberine]] göz atabilirsiniz."
      ]
    },
    {
      h: "Filigranlı PDF yazdırılınca görünür mü? Baskı ipuçları",
      p: [
        "Sayfa içeriğine işlenen filigran, ekranda nasıl görünüyorsa yazıcıdan da öyle çıkar. Ancak çok açık renk ve yüksek saydamlık seçildiyse lazer yazıcılarda filigran neredeyse görünmeyebilir; mürekkep püskürtmeli yazıcılarda ise açık griler beklenenden koyu çıkabilir. Önemli bir belgeyi göndermeden önce tek sayfa deneme baskısı almak en güvenli yoldur.",
        "Bazı PDF programları, yalnızca ekranda görünen ya da yalnızca baskıda çıkan filigran seçenekleri sunar. Bu tür isteğe bağlı katmanlar, programın ayarına göre görünür veya gizlenebilir. Kimlik fotokopisi gibi belgelerde filigranın her koşulda görünmesi istendiği için sayfa içeriğine işlenen filigran tercih edilmelidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çok koyu filigran:</strong> Alttaki bilgiler okunmaz, belge kabul edilmez.",
        "<strong>Çok açık filigran:</strong> Fotokopide ya da baskıda kaybolur, caydırıcılığı kalmaz.",
        "<strong>Amaçsız \"KOPYADIR\" yazısı:</strong> Kime ve ne için verildiği yazmayan filigran belgeyi başka işlemlerde kullanmayı zorlaştırmaz.",
        "<strong>Orijinali silmek:</strong> Filigransız orijinali saklamazsanız başka bir kurum için yeni filigran ekleyemezsiniz.",
        "<strong>JPG logo kullanmak:</strong> Beyaz kutu oluşur; şeffaf PNG tercih edin."
      ]
    }
  ],
  faq: [
    ["PDF'e filigran nasıl eklenir?", "PDF Filigran Ekleme aracına dosyanızı bırakın, metin ya da logo seçin, açı, boyut, saydamlık ve yerleşimi ayarlayıp yeni dosyayı indirin. İşlem tarayıcıda yapılır, dosyanız hiçbir sunucuya gönderilmez."],
    ["Kimlik fotokopisine neden filigran eklenmeli?", "Kimlik kopyası kötü niyetli kişilerin eline geçerse başka işlemlerde kullanılabilir. Kime, hangi amaçla ve hangi tarihte verildiğini yazan bir filigran, belgenin başka bir başvuruda kullanılmasını zorlaştırır."],
    ["PDF'e logo nasıl yerleştirilir?", "Filigran aracında logo seçeneğini kullanarak şeffaf arka planlı bir PNG dosyası yükleyin, boyutunu ve saydamlığını ayarlayıp köşe ya da orta yerleşimi seçin. JPG logolar beyaz kutu oluşturduğu için önerilmez."],
    ["PDF'e sayfa numarası nasıl eklenir?", "PDF Sayfa Numarası Ekleme aracında konum ve biçim seçip kapak sayfasını atlama, başlangıç numarası, yazı boyutu ve renk ayarlarını yapın. Sözleşmelerde Sayfa 1 / 12 biçimi eksik sayfayı fark etmeyi kolaylaştırır."],
    ["Filigran sonradan kaldırılabilir mi?", "Ayrı nesne olarak eklenen filigran gelişmiş PDF düzenleyicilerle silinebilir. Sayfaları görüntüye çevirerek düzleştirmek ve dosyayı parolayla korumak kaldırmayı zorlaştırır, ancak filigranı tamamen aşılmaz bir güvenlik önlemine dönüştürmez."],
    ["Word'de filigran nasıl yapılır?", "Tasarım sekmesindeki Filigran düğmesinden hazır bir seçenek seçebilir ya da Özel Filigran penceresinde kendi metninizi veya resminizi ekleyebilirsiniz. Belgeyi PDF olarak kaydettiğinizde filigran da PDF'e aktarılır."],
    ["Şeffaf filigran nasıl ayarlanır?", "Saydamlığı genellikle yüzde 15 ile 30 arasında tutun ve gri ya da açık renk seçin. Önizlemede alttaki metnin rahatça okunduğunu, filigranın ise ilk bakışta fark edildiğini kontrol ederek ayarı netleştirin."],
    ["Filigranlı PDF yazdırılınca görünür mü?", "Sayfa içeriğine işlenen filigran yazdırıldığında da görünür. Çok açık renk ve yüksek saydamlık seçildiyse bazı yazıcılarda soluk çıkabileceği için önemli belgelerde önce tek sayfalık deneme baskısı almanız önerilir."],
    ["Filigran ekleyince dosya boyutu artar mı?", "Metin filigranı dosya boyutunu çok az artırır. Logo filigranı, kullanılan resmin boyutu kadar büyüme yaratır. Sayfaları görüntüye çevirerek düzleştirme ise dosyayı belirgin biçimde büyütebilir; gerekirse sonra PDF küçültme yapılabilir."]
  ],
  tools: ["pdf-filigran", "pdf-sayfa-numarasi", "pdf-duzlestir", "pdf-sifre-ekle"],
  related: ["jpg-png-svg-farki", "pdf-sayfa-silme-ve-dondurme", "fotograftaki-konum-bilgisi-nasil-silinir"],
  sources: [
    ["KVKK – Kişisel Verileri Koruma Kurumu", "https://www.kvkk.gov.tr/"],
    ["ISO – PDF standardı (ISO 32000)", "https://www.iso.org/"]
  ]
};
