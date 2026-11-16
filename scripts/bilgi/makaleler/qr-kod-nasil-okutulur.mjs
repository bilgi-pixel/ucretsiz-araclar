export default {
  slug: "qr-kod-nasil-okutulur",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "QR Kod Nasıl Okutulur? Telefonda, Bilgisayarda ve Ekran Görüntüsünden",
  pageTitle: "QR Kod Nasıl Okutulur? Telefon, Bilgisayar ve Ekran Görüntüsü",
  description: "QR kod telefon kamerasıyla, bilgisayarda ve ekran görüntüsünden nasıl okutulur? Okumama nedenleri, Wi-Fi QR şifresi, sahte QR kodları anlama ve güvenlik notları.",
  keywords: ["qr kod nasıl okutulur", "qr kod okuma", "bilgisayarda qr kod okuma", "ekran görüntüsünden qr okuma", "qr kod okumuyor", "wifi qr kodu okutma", "qr kod güvenli mi", "sahte qr kod"],
  lead: "QR kodu okutmak için telefonunuzun kamera uygulamasını açıp kodu kadraja almanız yeterlidir; ekranda beliren bağlantıya ya da bildirime dokunduğunuzda içerik açılır. Bilgisayarda ya da telefonunuzdaki bir ekran görüntüsünde duran QR kod için kamera gerekmez: görseli bir QR okuyucuya verip içeriği çözebilirsiniz. Bu sayfada üç yöntemi adım adım, kodun neden okunmadığını, Wi-Fi QR kodundan şifrenin nasıl görüldüğünü ve en önemlisi sahte QR kodlara karşı açmadan önce nelere bakmanız gerektiğini bulacaksınız.",
  kisaCevap: [
    "Telefonda: kamera uygulamasını açın, kodu 15–30 cm uzaktan kadraja alın, çıkan bağlantının adresini kontrol edip dokunun.",
    "Bilgisayarda: QR kodun ekran görüntüsünü alın ya da resmini kaydedin, QR Kod Okuyucu aracına yapıştırın veya seçin.",
    "Ekran görüntüsündeki QR kod da aynı şekilde, görsel dosyası okuyucuya verilerek çözülür; kamera gerekmez.",
    "QR kodlar hata düzeltme sayesinde yüzde 7 ile 30 arası hasarı tolere eder; ama üç köşedeki büyük kareler kapanırsa okunamaz.",
    "Okutmadan önce adres önizlemesine bakın: alan adı yazım hatası, kısaltılmış bağlantı ya da ödeme ve şifre isteyen sayfa uyarı işaretidir.",
    "Wi-Fi QR kodu ağ adını, şifreleme türünü ve şifreyi düz metin olarak taşır; okuyucu şifreyi gösterebilir."
  ],
  figure: {
    alt: "QR kodun yapısı: üç köşedeki konum kareleri, sessiz bölge ve veri alanı; yanında okumadan önce yapılacak üç adımlı güvenlik kontrolü.",
    caption: "Okuyucu kodu üç köşedeki büyük karelerden tanır ve çevresindeki boş kenara (sessiz bölge) ihtiyaç duyar. Açmadan önce adresi kontrol etmek, sahte QR'a karşı en etkili önlemdir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">QR kod nasıl okunur, açmadan önce ne kontrol edilir?</text>
  <rect x="30" y="60" width="270" height="270" rx="6" class="sf sb"/>
  <rect x="60" y="90" width="210" height="210" class="ps"/>
  <rect x="64" y="94" width="56" height="56" class="p"/><rect x="74" y="104" width="36" height="36" class="sf"/><rect x="82" y="112" width="20" height="20" class="p"/>
  <rect x="210" y="94" width="56" height="56" class="p"/><rect x="220" y="104" width="36" height="36" class="sf"/><rect x="228" y="112" width="20" height="20" class="p"/>
  <rect x="64" y="240" width="56" height="56" class="p"/><rect x="74" y="250" width="36" height="36" class="sf"/><rect x="82" y="258" width="20" height="20" class="p"/>
  <rect x="140" y="170" width="14" height="14" class="p"/><rect x="168" y="184" width="14" height="14" class="p"/><rect x="196" y="170" width="14" height="14" class="p"/>
  <rect x="154" y="212" width="14" height="14" class="p"/><rect x="210" y="226" width="14" height="14" class="p"/><rect x="182" y="254" width="14" height="14" class="p"/>
  <rect x="140" y="110" width="14" height="14" class="p"/><rect x="168" y="130" width="14" height="14" class="p"/><rect x="238" y="198" width="14" height="14" class="p"/>
  <text x="165" y="352" class="sm mid b">Konum kareleri (3 köşe) kapanmamalı</text>
  <text x="165" y="372" class="sm mid t2">Kenardaki boşluk = sessiz bölge (4 modül)</text>
  <line x1="300" y1="120" x2="340" y2="120" class="sp sw" fill="none"/>
  <rect x="345" y="64" width="350" height="76" rx="8" class="sf sb"/>
  <text x="365" y="92" class="b">1. Önizlemeyi okuyun</text>
  <text x="365" y="116" class="sm t2">Kamera adresi gösterir; hemen dokunmayın.</text>
  <rect x="345" y="156" width="350" height="76" rx="8" class="sf sb"/>
  <text x="365" y="184" class="b">2. Alan adını kontrol edin</text>
  <text x="365" y="208" class="sm t2">Harf hatası, kısaltılmış bağlantı, tuhaf uzantı?</text>
  <rect x="345" y="248" width="350" height="76" rx="8" class="dgs"/>
  <text x="365" y="276" class="b">3. Şifre, kart, ödeme isteniyorsa durun</text>
  <text x="365" y="300" class="sm">Resmî uygulamaya ya da siteye kendiniz gidin.</text>
  <rect x="345" y="340" width="350" height="42" rx="8" class="oks"/>
  <text x="520" y="366" class="sm mid b">Hata düzeltme: L %7 · M %15 · Q %25 · H %30</text>
</svg>`
  },
  sections: [
    {
      h: "QR kod nedir, nasıl çalışır?",
      p: [
        "QR (Quick Response, hızlı yanıt) kod, verinin siyah ve beyaz karelerden oluşan iki boyutlu bir desene kodlandığı bir barkod türüdür. Ürün paketlerindeki [[bilgi:barkod-numarasi-nedir-869-ean13|çizgili barkod]] yalnızca yatayda birkaç düzine rakam taşırken QR kod hem yatayda hem dikeyde bilgi taşıdığı için bir web adresini, Wi-Fi bilgisini, kartviziti ya da birkaç yüz karakterlik metni saklayabilir.",
        "Okuyucu kodu üç köşedeki büyük karelerden (konum desenleri) tanır; bunlar kodun yönünü ve boyutunu belirler. Kodun çevresindeki boş kenar, yani <strong>sessiz bölge</strong>, en az 4 modül genişliğinde olmalıdır. Kodun içindeki küçük kareler ise veriyi ve hata düzeltme bilgisini taşır.",
        "QR kodun kendisi bir program değildir; yalnızca metin taşır. Bu metin bir web adresi ise telefon onu tarayıcıda açmayı önerir, bir Wi-Fi tanımı ise ağa bağlanmayı, bir kartvizitse rehbere eklemeyi önerir. Tehlike, QR kodun kendisinde değil, götürdüğü adreste olabilir."
      ]
    },
    {
      h: "Telefon kamerasıyla QR kod nasıl okutulur?",
      p: [
        "Güncel akıllı telefonların çoğunda ayrı bir uygulama gerekmez; QR okuma kamera uygulamasına yerleşiktir. Bazı cihazlarda bu özellik kamera ayarlarından açılması gereken bir seçenek olabilir."
      ],
      ol: [
        "Kamera uygulamasını açın ve arka kamerayı QR koda doğrultun.",
        "Kodu ekranın ortasına, 15–30 cm uzaklıktan alın; kodun tamamı ve çevresindeki boşluk kadrajda görünsün.",
        "Kamera kodu tanıyınca ekranın altında ya da üstünde bir bağlantı veya bildirim belirir. Bu önizlemede yazan adresi okuyun.",
        "Adres beklediğiniz kurumun alan adıysa dokunun. Wi-Fi koduysa \"ağa katıl\", kartvizitse \"kişi ekle\" seçeneği çıkar.",
        "Kamera tanımıyorsa ışığı artırın, telefonu biraz uzaklaştırın ya da hızlı ayarlardaki QR tarayıcı kısayolunu deneyin."
      ],
      after: [
        "Yerleşik tarayıcı yoksa ya da kodu bir galeri fotoğrafından okumak istiyorsanız aşağıdaki görselden okuma yöntemine geçin."
      ]
    },
    {
      h: "Bilgisayarda ve ekran görüntüsünden QR kod nasıl okunur?",
      p: [
        "Bir e-postada, PDF'te ya da web sayfasında gördüğünüz QR kodu okumak için telefonu ekrana tutmanız şart değildir. Kodun görselini bir QR okuyucuya vermek hem daha hızlıdır hem de adresi büyük ekranda rahatça incelemenizi sağlar.",
        "Bilişim Ajans'ın [[arac:qr-kod-oku|QR Kod Okuyucu]] aracı üç yolu destekler: resim dosyası seçmek, panodaki ekran görüntüsünü yapıştırmak ya da bilgisayarın kamerasını açmak. Çözümleme tamamen tarayıcınızda yapılır; görsel hiçbir sunucuya yüklenmez."
      ],
      ol: [
        "QR kodun ekran görüntüsünü alın. Windows'ta Win + Shift + S, macOS'ta Cmd + Shift + 4 ile yalnızca kod bölgesini seçebilirsiniz.",
        "QR Kod Okuyucu sayfasını açın ve Ctrl + V (macOS'ta Cmd + V) ile görüntüyü yapıştırın ya da kayıtlı resmi seçin.",
        "Araç kod türünü (bağlantı, Wi-Fi, kartvizit, metin) ve içeriğini gösterir.",
        "Bağlantıysa adresi okuyun; açmak istiyorsanız kendiniz kopyalayıp tarayıcıya yapıştırın.",
        "Telefondaki bir ekran görüntüsünü okumak için görseli aynı aracı telefon tarayıcısında açarak seçin."
      ],
      after: [
        "Ekran görüntüsü alma kısayollarının tamamı ve görseli kırpma yöntemleri için [[rehber:ekran-goruntusu-alma-ve-duzenleme|ekran görüntüsü rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "QR kod neden okunmaz? Sorun ve çözüm tablosu",
      p: [
        "Okunmayan QR kodların büyük kısmı ışık, mesafe ya da baskı kalitesinden kaynaklanır. Kod gerçekten hasarlıysa da hata düzeltme payı yetiyorsa yine okunabilir."
      ],
      table: {
        head: ["Belirti", "Olası neden", "Çözüm"],
        rows: [
          ["Kamera hiç tepki vermiyor", "QR tarama özelliği kapalı ya da kod çok küçük", "Kamera ayarında QR taramayı açın, yaklaşın"],
          ["Odaklanmıyor", "Fazla yakınlık ya da kirli lens", "Lensi silin, 20–30 cm geri çekilin"],
          ["Parlıyor, yansıma var", "Parlak menü, cam ya da ekran", "Açıyı değiştirin, flaşı kapatın"],
          ["Ekrandaki kod okunmuyor", "Moiré deseni, düşük parlaklık", "Ekran parlaklığını artırın ya da görselden okuyun"],
          ["Ters renkli (beyaz üstüne siyah değil)", "Tasarım için renkler ters çevrilmiş", "Görsel okuyucuyu deneyin; bazı kameralar ters kodu tanımaz"],
          ["Kenar kesilmiş", "Sessiz bölge yok ya da kod kırpılmış", "Kodun tamamını, çevre boşluğuyla birlikte kadraja alın"],
          ["Kısmen yırtık ya da lekeli", "Hasar, hata düzeltme payını aşıyor", "Başka bir kopyayı arayın, işletmeden adresi isteyin"]
        ]
      },
      after: [
        "QR kodlarda dört hata düzeltme düzeyi vardır: L yaklaşık yüzde 7, M yüzde 15, Q yüzde 25, H yüzde 30 oranında veri kaybını telafi edebilir. Logolu QR kodlar genellikle H düzeyinde üretilir; logo bu payın bir kısmını kullanır. Ancak üç köşedeki konum desenlerinden biri kapanırsa okuyucu kodu hiç bulamaz."
      ]
    },
    {
      h: "Wi-Fi QR kodu okutunca şifre nasıl görülür?",
      p: [
        "Wi-Fi QR kodu, ağ bilgisini standart bir metin biçiminde taşır: <code>WIFI:T:WPA;S:AgAdi;P:Sifre;;</code>. Burada <code>T</code> şifreleme türünü, <code>S</code> ağ adını (SSID), <code>P</code> şifreyi gösterir; gizli ağlarda ayrıca <code>H:true</code> bulunur. Telefon bu kodu okuduğunda çoğu zaman şifreyi göstermeden doğrudan ağa bağlanmayı önerir.",
        "Şifreyi görmeniz gerekiyorsa, örneğin aynı ağı bir dizüstü bilgisayara elle girecekseniz, kodun görselini QR Kod Okuyucu'ya verin. Araç ağ adını ve şifreleme türünü gösterir, şifreyi ise gizli tutup isteğinizle açar. Kendi ağınız için misafir kodu üretmek isterseniz [[arac:qr-wifi|Wi-Fi QR kodu]] aracını kullanabilirsiniz; ayrıntılar [[rehber:wifi-qr-kodu-nasil-yapilir|Wi-Fi QR rehberinde]]."
      ],
      note: "Wi-Fi QR kodu şifreyi açık metin olarak taşır. Ev ağınızın ana şifresini herkese açık yerlere asmak yerine misafirler için ayrı bir misafir ağı açıp onun kodunu paylaşın."
    },
    {
      h: "Sahte QR kodlar nasıl anlaşılır? Güvenlik kontrol listesi",
      p: [
        "Kötü niyetli kişiler park ödeme makinelerine, restoran masalarına, afişlere ya da kargo bildirimlerine kendi QR kodlarını yapıştırabilir. Bu kodlar genellikle gerçeğine çok benzeyen bir sahte sayfaya götürür ve kart bilgisi, şifre ya da tek kullanımlık doğrulama kodu ister. Bu yönteme dolandırıcılık literatüründe \"quishing\" denir.",
        "QR kod tek başına cihazınıza zarar vermez; zararı, açtığınız sayfada yaptığınız işlem doğurur. Bu nedenle en etkili savunma, bağlantıyı açmadan önceki birkaç saniyelik kontroldür."
      ],
      ul: [
        "<strong>Önizlemeyi okuyun:</strong> Kameranın gösterdiği adreste alan adına bakın. Kurumun bilinen adının harf değiştirilmiş, tire eklenmiş ya da farklı uzantılı bir benzeri uyarı işaretidir.",
        "<strong>Kısaltılmış bağlantılara temkinli yaklaşın:</strong> Asıl adresi gizleyen kısa bağlantılar, özellikle ödeme ya da giriş sayfasına gidiyorsa, şüphe nedenidir.",
        "<strong>Etiketin üzerine yapıştırılmış kod:</strong> Kamusal alanda bir QR'ın üstünde ikinci bir etiket ya da kabarıklık varsa okutmayın.",
        "<strong>Şifre, kart bilgisi ya da doğrulama kodu isteniyorsa durun:</strong> Bankanızın, kargo firmanızın ya da kurumun uygulamasını kendiniz açın, işlemi oradan yapın.",
        "<strong>Uygulama indirme isteği:</strong> QR ile gelen bir sayfa sizi resmî uygulama mağazası dışından dosya indirmeye yönlendiriyorsa indirmeyin.",
        "<strong>Beklemediğiniz bir mesajdaki QR:</strong> E-postayla ya da mesajla gelen \"hesabınız askıya alındı, okutun\" türü QR'lar yaygın bir oltalama yöntemidir."
      ],
      after: [
        "Okutmadan adresi görmenin en güvenli yolu, kodun görselini QR Kod Okuyucu'ya vermektir: araç bağlantıyı açmaz, yalnızca metnini gösterir. Adresteki %20 gibi kodlanmış karakterleri çözmek için [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "QR kodun içeriğine göre telefonun önerdiği işlemler",
      table: {
        head: ["QR içeriği", "Metin nasıl başlar", "Telefon ne önerir"],
        rows: [
          ["Web adresi", "https ön ekiyle", "Tarayıcıda açmayı"],
          ["Wi-Fi ağı", "WIFI:", "Ağa bağlanmayı"],
          ["Kartvizit", "BEGIN:VCARD", "Kişiyi rehbere eklemeyi"],
          ["E-posta", "mailto:", "Yeni e-posta taslağı açmayı"],
          ["SMS", "SMSTO: ya da sms:", "Hazır mesaj taslağını"],
          ["Telefon", "tel:", "Numarayı aramayı"],
          ["Konum", "geo:", "Harita uygulamasını açmayı"],
          ["Düz metin", "Herhangi bir metin", "Metni göstermeyi ya da kopyalamayı"]
        ]
      },
      after: [
        "Kartvizit QR'ı okuduğunuzda rehbere eklenen alanların nasıl yapılandığını [[bilgi:vcard-vcf-dosyasi-nedir-rehbere-kisi-aktarma|vCard yazısında]] bulabilirsiniz. Kendi QR kodunuzu oluşturmak isterseniz [[arac:qr-kod|QR Kod Oluşturucu]] aracı bu türlerin hepsini destekler."
      ]
    }
  ],
  faq: [
    ["Telefon kamerasıyla QR kod nasıl okutulur?", "Kamera uygulamasını açıp kodu 15–30 cm uzaktan kadraja alın. Ekranda beliren bağlantı önizlemesindeki adresi kontrol edin ve doğruysa dokunun. Tanımıyorsa kamera ayarlarında QR tarama seçeneğini açın."],
    ["Bilgisayarda QR kod nasıl okunur?", "QR kodun ekran görüntüsünü alın ya da resmini kaydedin, ardından QR Kod Okuyucu aracına yapıştırın veya dosyayı seçin. Araç içeriği tarayıcınızda çözer; görsel bir sunucuya gönderilmez ve bağlantı otomatik açılmaz."],
    ["Ekran görüntüsündeki QR kod nasıl açılır?", "Ekran görüntüsünü QR Kod Okuyucu gibi görselden okuyabilen bir araca verin. Kodun tamamı ve çevresindeki boşluk görüntüde olmalıdır; kesik ya da çok küçük kırpılmış görüntüler okunmayabilir."],
    ["QR kod neden okunmaz?", "En sık nedenler yetersiz ışık, yansıma, fazla yakın tutma, kirli lens, kesilmiş kenar ve ters çevrilmiş renklerdir. Kod hasarlıysa hata düzeltme payı yetmediğinde de okunmaz; özellikle köşedeki büyük kareler kapanmamalıdır."],
    ["Wi-Fi QR kodu okutunca şifre nasıl görülür?", "Telefon genellikle şifreyi göstermeden ağa bağlanır. Şifreyi görmek için kodun görselini QR Kod Okuyucu'ya verin; araç ağ adını, şifreleme türünü ve isteğinize bağlı olarak şifreyi gösterir."],
    ["Sahte QR kodlar nasıl anlaşılır?", "Önizlemedeki alan adında harf hatası, kısaltılmış bağlantı, kamusal alanda üstüne yapıştırılmış etiket ve kart ya da şifre isteyen sayfa başlıca uyarı işaretleridir. Şüphede kalırsanız kurumun resmî uygulamasını kendiniz açın."],
    ["Okutmadan önce QR kodun adresi görülebilir mi?", "Evet. Telefon kamerası bağlantıyı açmadan önce önizleme gösterir; ayrıca kodun görselini QR Kod Okuyucu'ya verirseniz adres yalnızca metin olarak görünür ve hiçbir sayfa açılmaz."],
    ["Bozuk veya kısmen kapalı QR kod okunabilir mi?", "Hata düzeltme düzeyine göre yüzde 7 ile 30 arasındaki hasar telafi edilebilir. Ancak konum kareleri ya da sessiz bölge bozulmuşsa okuyucu kodu bulamaz; bu durumda temiz bir kopya bulmak gerekir."],
    ["QR kod okutmak telefonuma virüs bulaştırır mı?", "QR kod yalnızca metin taşır ve okutmak tek başına cihaza zarar vermez. Risk, açılan sayfada bilgi girmek ya da resmî mağaza dışından dosya indirmekle ortaya çıkar; bu yüzden adresi açmadan önce kontrol edin."],
    ["Restoran menüsündeki QR kod açılmıyorsa ne yapmalıyım?", "Önce ışığı ve mesafeyi değiştirip tekrar deneyin; masa kartı parlıyorsa açıyı değiştirin. Yine açılmazsa kodun ekran görüntüsünü alıp görselden okuyun ya da işletmeden menü adresini isteyin. Ödeme gerektiren bir sayfa açılırsa işlemi kasada yapmayı tercih edebilirsiniz."]
  ],
  tools: ["qr-kod-oku", "qr-kod", "qr-wifi"],
  related: ["url-kodlama-yuzde-20-nedir", "vcard-vcf-dosyasi-nedir-rehbere-kisi-aktarma"],
  sources: [
    ["ISO – QR kod sembolojisi standardı (ISO/IEC 18004)", "https://www.iso.org/"],
    ["USOM – Ulusal Siber Olaylara Müdahale Merkezi", "https://www.usom.gov.tr/"]
  ]
};
