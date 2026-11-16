export default {
  slug: "https-ve-ssl-sertifikasi-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "HTTPS ve SSL Sertifikası Nedir? Kilit Simgesi Siteyi Güvenli Yapar mı",
  pageTitle: "HTTPS ve SSL Sertifikası Nedir? HTTP HTTPS Farkı ve Kilit",
  description: "HTTPS, tarayıcı ile site arasındaki trafiği TLS ile şifreler; sertifika sitenin kimliğini doğrular. Kilit simgesinin anlamı, güvenli değil uyarısı ve 443 portu.",
  keywords: ["https nedir", "ssl sertifikası nedir", "http https farkı", "güvenli değil uyarısı", "kilit simgesi ne demek", "tls nedir", "ssl sertifikası süresi", "https portu"],
  lead: "HTTPS, web sitesi ile tarayıcınız arasındaki iletişimin TLS protokolüyle şifrelendiği HTTP sürümüdür; SSL sertifikası ise bu şifreli bağlantıda karşı tarafın gerçekten o alan adına sahip olduğunu doğrulayan dijital belgedir. Adres çubuğundaki kilit simgesi bağlantının şifreli olduğunu gösterir, ama sitenin dürüst ya da güvenilir olduğunu garanti etmez. Bu sayfada HTTP ile HTTPS farkını, SSL ve TLS ilişkisini, \"bağlantınız gizli değil\" uyarısının nedenlerini, sertifika sürelerini ve HTTPS'e geçişin site sahipleri için anlamını anlatıyoruz.",
  kisaCevap: [
    "HTTP veriyi açık metin olarak taşır; HTTPS aynı veriyi TLS ile şifreleyerek taşır.",
    "SSL, TLS'nin eski adıdır; bugün kullanılan protokol TLS 1.2 ve TLS 1.3'tür, ama sertifikalara hâlâ \"SSL sertifikası\" denir.",
    "Kilit simgesi yalnızca bağlantının şifreli ve sertifikanın o alan adı için geçerli olduğunu gösterir; sahte siteler de kilit taşıyabilir.",
    "HTTP varsayılan olarak 80, HTTPS 443 numaralı portu kullanır.",
    "Herkese açık sitelerde sertifikanın en uzun geçerlilik süresi 15 Mart 2026'dan itibaren 200 gündür ve kademeli olarak kısalmaktadır."
  ],
  figure: {
    alt: "Üstte HTTP bağlantısı: tarayıcıdan siteye giden şifre ve kart bilgisi yoldaki herkes tarafından okunabilir. Altta HTTPS bağlantısı: aynı veri kilitli bir tünelden geçer, araya giren yalnızca anlamsız karakterler görür. Sağda sertifikanın doğruladığı üç bilgi.",
    caption: "HTTPS'te veri tarayıcıdan çıkmadan şifrelenir ve yalnızca sitenin sunucusunda çözülür. Sertifika, şifreli tünelin karşı ucunda gerçekten o alan adının bulunduğunu doğrular.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">HTTP ile HTTPS arasındaki fark</text>
  <text x="20" y="64" class="b dg">HTTP · port 80 · şifresiz</text>
  <rect x="20" y="76" width="110" height="60" rx="8" class="sf sb"/>
  <text x="75" y="111" class="b mid">Tarayıcı</text>
  <rect x="380" y="76" width="110" height="60" rx="8" class="sf sb"/>
  <text x="435" y="111" class="b mid">Site</text>
  <line x1="130" y1="106" x2="380" y2="106" class="sdg sw" fill="none"/>
  <rect x="170" y="86" width="170" height="40" rx="6" class="dgs"/>
  <text x="255" y="111" class="sm mid b">sifre=Elma2026</text>
  <circle cx="255" cy="160" r="14" class="dgs"/>
  <text x="255" y="165" class="sm mid b">?</text>
  <text x="255" y="192" class="sm mid dg">Aradaki herkes okuyabilir</text>
  <text x="20" y="232" class="b ok">HTTPS · port 443 · TLS ile şifreli</text>
  <rect x="20" y="244" width="110" height="60" rx="8" class="sf sb"/>
  <text x="75" y="279" class="b mid">Tarayıcı</text>
  <rect x="380" y="244" width="110" height="60" rx="8" class="sf sb"/>
  <text x="435" y="279" class="b mid">Site</text>
  <rect x="130" y="256" width="250" height="36" rx="18" class="oks"/>
  <text x="255" y="279" class="sm mid b">x9#Qf2!mZ7@kL0...</text>
  <circle cx="255" cy="328" r="14" class="oks"/>
  <text x="255" y="333" class="sm mid b">?</text>
  <text x="255" y="362" class="sm mid ok">Araya giren anlamsız veri görür</text>
  <rect x="520" y="60" width="180" height="320" rx="10" class="ps"/>
  <text x="610" y="88" class="b mid p">Sertifika neyi</text>
  <text x="610" y="108" class="b mid p">doğrular?</text>
  <rect x="534" y="124" width="152" height="60" rx="6" class="sf sb"/>
  <text x="610" y="150" class="sm mid b">Alan adı</text>
  <text x="610" y="170" class="sm mid">bu siteye ait mi</text>
  <rect x="534" y="194" width="152" height="60" rx="6" class="sf sb"/>
  <text x="610" y="220" class="sm mid b">Geçerlilik</text>
  <text x="610" y="240" class="sm mid">süresi dolmamış mı</text>
  <rect x="534" y="264" width="152" height="60" rx="6" class="sf sb"/>
  <text x="610" y="290" class="sm mid b">İmzalayan</text>
  <text x="610" y="310" class="sm mid">güvenilen kuruluş mu</text>
  <text x="610" y="352" class="sm mid dg b">Dürüstlüğü doğrulamaz!</text>
</svg>`
  },
  sections: [
    {
      h: "HTTPS nedir?",
      p: [
        "HTTP (Köprü Metni Aktarım Protokolü), tarayıcınızın bir web sitesinden sayfa istemek ve form verisi göndermek için kullandığı dildir. Sondaki \"S\" harfi \"secure\" (güvenli) kelimesinden gelir ve aynı iletişimin şifreli bir katmanın içinden yapıldığını gösterir. HTTPS'te tarayıcınız ile sitenin sunucusu önce bir el sıkışma yapar, ortak bir oturum anahtarı belirler ve sonraki bütün trafiği bu anahtarla şifreler.",
        "Şifrelemenin sağladığı koruma üç başlıkta özetlenebilir. <strong>Gizlilik:</strong> aynı Wi-Fi ağındaki biri, internet sağlayıcısı ya da yoldaki herhangi bir cihaz, sayfa içeriğini ve gönderdiğiniz şifreyi okuyamaz. <strong>Bütünlük:</strong> veri yolda değiştirilirse bu fark edilir; araya reklam ya da zararlı kod eklenemez. <strong>Kimlik doğrulama:</strong> sertifika sayesinde bağlandığınız sunucunun gerçekten adres çubuğundaki alan adına ait olduğu kontrol edilir.",
        "Bugün web trafiğinin çok büyük bölümü HTTPS üzerinden taşınır ve tarayıcılar HTTP sayfalarını, özellikle form içerdiklerinde, \"güvenli değil\" diye işaretler."
      ]
    },
    {
      h: "HTTP ile HTTPS arasındaki fark nedir?",
      table: {
        head: ["Özellik", "HTTP", "HTTPS"],
        rows: [
          ["Adres başlangıcı", "http ile başlar", "https ile başlar"],
          ["Varsayılan port", "80", "443"],
          ["Veri iletimi", "Açık metin", "TLS ile şifreli"],
          ["Sunucu kimliği", "Doğrulanmaz", "Sertifikayla doğrulanır"],
          ["Yolda değiştirme", "Fark edilmez", "Fark edilir, bağlantı kesilir"],
          ["Tarayıcı göstergesi", "\"Güvenli değil\" uyarısı", "Kilit ya da ayar simgesi"],
          ["Yeni web özellikleri", "Çoğu kullanılamaz", "Konum, kamera, bildirim gibi özellikler kullanılabilir"]
        ]
      },
      after: [
        "Adresin parçalarını, örneğin şema, alan adı, port ve sorgu parametrelerini ayrı ayrı görmek isterseniz [[arac:url-ayristir|URL Ayrıştırıcı]] aracı herhangi bir web adresini bileşenlerine böler. Port numaralarının ne işe yaradığını [[bilgi:port-numaralari-80-443-22|80, 443 ve 22 portları]] yazısında ayrıntılı anlatıyoruz; bir portun hangi hizmete ait olduğunu [[arac:port-numarasi-bul|Port Numarası Bul]] aracıyla öğrenebilirsiniz."
      ]
    },
    {
      h: "SSL ve TLS aynı şey mi?",
      p: [
        "Teknik olarak hayır, pratikte çoğu zaman aynı anlamda kullanılır. SSL (Güvenli Yuva Katmanı), 1990'larda geliştirilen ilk şifreleme protokolüdür. Güvenlik açıkları nedeniyle yerini TLS'ye (Aktarım Katmanı Güvenliği) bıraktı; SSL'in bütün sürümleri bugün kullanımdan kaldırılmıştır. Güncel sistemler TLS 1.2 ve 2018'de yayımlanan TLS 1.3'ü kullanır. TLS 1.3, el sıkışmayı hızlandırır ve eski, zayıf şifreleme yöntemlerini tamamen dışarıda bırakır.",
        "Buna rağmen sektörde \"SSL sertifikası\" ifadesi yerleşmiştir. Bir barındırma firmasından ya da sertifika sağlayıcısından \"SSL sertifikası\" aldığınızda aslında TLS bağlantılarında kullanılan bir sertifika alırsınız. Sertifikanın kendisi protokolden bağımsızdır; değişen, bağlantının hangi protokol sürümüyle kurulduğudur.",
        "Sertifikalar doğrulama düzeyine göre de ayrılır. <strong>Alan adı doğrulamalı</strong> sertifikada yalnızca başvuranın alan adını kontrol ettiği kanıtlanır; en yaygın ve çoğu zaman ücretsiz olan türdür. <strong>Kurum doğrulamalı</strong> ve <strong>genişletilmiş doğrulamalı</strong> sertifikalarda başvuran şirketin kayıtları da incelenir ve sertifika ayrıntılarında kurum adı yer alır. Şifreleme gücü üç türde de aynıdır; fark, sertifikanın kime verildiğine dair ne kadar bilgi taşıdığıdır."
      ]
    },
    {
      h: "Tarayıcıdaki kilit simgesi sitenin güvenilir olduğunu gösterir mi?",
      p: [
        "Göstermez ve bu, çevrim içi güvenlikte en sık yanlış anlaşılan konulardan biridir. Kilit simgesi yalnızca iki şeyi söyler: bağlantı şifrelidir ve sunucunun sunduğu sertifika adres çubuğundaki alan adı için geçerlidir. Sitenin kim tarafından işletildiğini, dürüst olup olmadığını ya da ürünlerin gerçekten gönderilip gönderilmeyeceğini söylemez.",
        "Sertifika almak artık kolay ve çoğu zaman ücretsiz olduğu için dolandırıcılık amaçlı sahte siteler de rahatlıkla HTTPS kullanır. Bir banka sitesini taklit eden sahte bir sayfa, bankanın adına çok benzeyen bir alan adı için kendi sertifikasını alabilir ve kilit simgesini gösterebilir. Bu yüzden kilit simgesine değil, alan adının kendisine bakmak gerekir."
      ],
      ul: [
        "Alan adını harf harf okuyun: tek harf değişikliği, fazladan tire ya da farklı uzantı sahte site işareti olabilir.",
        "Bankacılık ve devlet hizmetlerine e-posta ya da mesajdaki bağlantıdan değil, adresi kendiniz yazarak ya da yer imlerinizden girin.",
        "Çok ucuz fiyat, aciliyet hissi ve yalnızca havale ile ödeme isteği, kilit simgesi olsa bile uyarı işaretidir."
      ],
      after: [
        "Sahte bağlantıları ayırt etmenin daha fazla yolunu [[bilgi:oltalama-sahte-link-nasil-anlasilir|oltalama bağlantısı nasıl anlaşılır]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "\"Bağlantınız gizli değil\" uyarısı neden çıkar?",
      p: [
        "Bu uyarı, tarayıcının sitenin sertifikasını doğrulayamadığını gösterir. Uyarının nedeni her zaman bir saldırı değildir, ama nedeni anlaşılmadan devam etmek doğru değildir. Özellikle şifre ya da ödeme bilgisi gireceğiniz bir sayfada bu uyarıyı görürseniz işlemi durdurun."
      ],
      table: {
        head: ["Neden", "Açıklama", "Ne yapılabilir"],
        rows: [
          ["Sertifikanın süresi dolmuş", "Site sahibi sertifikayı yenilememiş", "Site sahibine bildirin; hassas veri girmeyin"],
          ["Alan adı uyuşmuyor", "Sertifika başka bir adres için verilmiş", "Adresi kontrol edin; yazım hatası ya da sahte site olabilir"],
          ["Güvenilmeyen imzalayan", "Sertifikayı tanınmayan bir kuruluş imzalamış", "Kurumsal ağ dışında devam etmeyin"],
          ["Cihaz saati yanlış", "Saat yanlışsa geçerli sertifika da geçersiz görünür", "Cihazın saat ve tarihini otomatik ayara alın"],
          ["Ortak Wi-Fi giriş sayfası", "Otel, kafe ağları giriş sayfasına yönlendirir", "Önce ağın giriş sayfasını tamamlayın"],
          ["Araya giren yazılım ya da saldırı", "Bağlantı başka bir cihaz tarafından dinleniyor olabilir", "Ağı değiştirin, mobil veriyle deneyin"]
        ]
      },
      after: [
        "Site sahibiyseniz bu uyarıyı ziyaretçilerinize hiç göstermemek için sertifikanın otomatik yenilendiğinden ve hem alan adınızın kendisini hem de \"www\" ile başlayan biçimini kapsadığından emin olun."
      ]
    },
    {
      h: "SSL sertifikası ne kadar süre geçerlidir?",
      p: [
        "Herkese açık web siteleri için verilen sertifikaların süresi, tarayıcı üreticileri ve sertifika kuruluşlarının ortak kararlarıyla yıllar içinde kısaltıldı. Bir zamanlar beş yıla kadar sertifika alınabiliyorken süre önce iki yıla, sonra 398 güne indi. Kabul edilen takvime göre en uzun süre 15 Mart 2026'dan itibaren 200 gün, 15 Mart 2027'den itibaren 100 gün, 15 Mart 2029'dan itibaren ise 47 gün olacaktır."
      ],
      table: {
        head: ["Verildiği tarih", "En uzun geçerlilik süresi"],
        rows: [
          ["15 Mart 2026 öncesi", "398 gün"],
          ["15 Mart 2026 – 14 Mart 2027", "200 gün"],
          ["15 Mart 2027 – 14 Mart 2029", "100 gün"],
          ["15 Mart 2029 ve sonrası", "47 gün"]
        ],
        caption: "Herkese açık TLS sertifikaları için kabul edilmiş kademeli takvim. Kurum içi özel sertifikalar bu kurala tabi değildir."
      },
      after: [
        "Kısa süre güvenlik açısından avantajlıdır: ele geçirilmiş ya da hatalı bir sertifika daha kısa süre kullanılabilir. Ancak elle yenileme artık pratik değildir. Site sahiplerinin sertifikayı otomatik yenileyen bir sistem kullanması, yenilemenin başarısız olduğu durumda uyarı alacak bir izleme kurması gerekir."
      ]
    },
    {
      h: "HTTPS hangi portu kullanır? Site HTTPS'e geçince ne değişir?",
      p: [
        "HTTPS varsayılan olarak 443 numaralı TCP portunu kullanır; HTTP ise 80 numaralı portu. Adres çubuğunda port yazmadığınızda tarayıcı bu varsayılanları kullanır. Bir site HTTPS'e geçtiğinde genellikle 80 numaralı porttan gelen istekleri kalıcı yönlendirmeyle (301) 443'e aktarır; böylece eski bağlantılar ve yer imleri çalışmaya devam eder. Yönlendirme kodlarının anlamını [[arac:http-durum-kodlari|HTTP Durum Kodları]] aracında ve [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları]] yazısında bulabilirsiniz."
      ],
      ol: [
        "Sertifikayı alın ve sunucuya kurun; alan adının hem yalın hem \"www\" biçimini kapsadığını kontrol edin.",
        "Tüm HTTP adreslerini 301 kalıcı yönlendirmeyle HTTPS karşılığına yönlendirin.",
        "Sayfalardaki görsel, betik ve stil dosyalarının da HTTPS ile yüklendiğini kontrol edin; aksi halde \"karışık içerik\" uyarısı çıkar.",
        "Site haritasını, kanonik etiketleri ve iç bağlantıları HTTPS adresleriyle güncelleyin.",
        "Arama motoru yönetim panellerine HTTPS adresini ekleyin ve yönlendirmelerin hatasız çalıştığını izleyin."
      ],
      after: [
        "Arama motorları HTTPS'i uzun süredir hafif bir sıralama sinyali olarak kullanır. Etkisi tek başına sıralamayı belirleyecek kadar büyük değildir, ama tarayıcıların HTTP sayfalarını \"güvenli değil\" diye işaretlemesi ziyaretçi güvenini ve dönüşüm oranını doğrudan etkiler. Doğru yapılmış bir geçişte, yönlendirmeler sayesinde mevcut sıralamalar korunur."
      ]
    },
    {
      h: "Kullanıcı olarak HTTPS'ten en iyi nasıl yararlanırsınız?",
      ul: [
        "Şifre, kart bilgisi ya da kimlik bilgisi girmeden önce adres çubuğunda \"https\" ve doğru alan adını görün.",
        "Tarayıcınızın \"yalnızca HTTPS\" modunu açabilirsiniz; bu mod HTTP sayfalarına girmeden önce uyarı verir.",
        "Sertifika uyarılarını \"yine de devam et\" diyerek geçmeyin; özellikle ortak Wi-Fi ağlarında.",
        "HTTPS yalnızca bağlantıyı korur; sitenin sizin verinizi nasıl sakladığını ve kimlerle paylaştığını korumaz. Hassas verileri yalnızca güvendiğiniz kurumlara verin.",
        "Hesaplarınızda [[bilgi:iki-adimli-dogrulama-nedir-2fa|iki adımlı doğrulama]] açın; şifreniz sahte bir HTTPS sayfasına yazılsa bile ek koruma sağlar."
      ]
    }
  ],
  faq: [
    ["HTTPS nedir?", "HTTPS, tarayıcı ile web sitesi arasındaki trafiğin TLS protokolüyle şifrelendiği HTTP sürümüdür. Yoldaki kişilerin veriyi okumasını ve değiştirmesini engeller, sertifika sayesinde bağlanılan sunucunun o alan adına ait olduğunu doğrular."],
    ["HTTP ile HTTPS arasındaki fark nedir?", "HTTP veriyi açık metin olarak taşır ve 80 numaralı portu kullanır. HTTPS aynı veriyi şifreleyerek 443 numaralı porttan taşır, sunucunun kimliğini sertifikayla doğrular ve tarayıcıda güvenli değil uyarısı göstermez."],
    ["SSL ve TLS aynı şey mi?", "SSL, TLS'nin eski ve artık kullanılmayan öncülüdür. Bugünkü bağlantılar TLS 1.2 ya da TLS 1.3 ile kurulur; ancak sertifikalara alışkanlık olarak hâlâ SSL sertifikası denir."],
    ["Tarayıcıdaki kilit simgesi sitenin güvenilir olduğunu gösterir mi?", "Hayır. Kilit yalnızca bağlantının şifreli olduğunu ve sertifikanın o alan adı için geçerli olduğunu gösterir. Sahte siteler de kolayca sertifika alabildiği için alan adını harf harf kontrol etmek gerekir."],
    ["Bağlantınız gizli değil uyarısı neden çıkar?", "Tarayıcı sertifikayı doğrulayamadığında çıkar: süresi dolmuş, başka alan adına verilmiş ya da güvenilmeyen bir kuruluşça imzalanmış olabilir. Cihaz saatinin yanlış olması ve ortak Wi-Fi giriş sayfaları da bu uyarıya yol açabilir."],
    ["SSL sertifikası ne kadar süre geçerlidir?", "Herkese açık siteler için 15 Mart 2026'dan itibaren verilen sertifikalar en fazla 200 gün geçerlidir. Bu süre 2027'de 100 güne, 2029'da 47 güne inecek; bu nedenle otomatik yenileme şarttır."],
    ["HTTPS hangi portu kullanır?", "HTTPS varsayılan olarak 443 numaralı TCP portunu kullanır. HTTP'nin varsayılan portu 80'dir; HTTPS'e geçen siteler 80'den gelen istekleri kalıcı yönlendirmeyle 443'e aktarır."],
    ["Site HTTPS'e geçince SEO etkilenir mi?", "HTTPS arama motorlarında hafif bir olumlu sinyaldir ve ziyaretçi güvenini artırır. Geçiş sırasında 301 yönlendirmeleri, kanonik etiketler ve site haritası doğru güncellenirse mevcut sıralamalar korunur."],
    ["HTTPS kullanan sitede verilerim tamamen güvende mi?", "HTTPS yalnızca iletim sırasındaki veriyi korur. Site sahibinin veriyi nasıl sakladığı, kimlerle paylaştığı ya da sitenin dürüst olup olmadığı ayrı konulardır; hassas verileri yalnızca güvendiğiniz kurumlara verin."]
  ],
  tools: ["url-ayristir", "port-numarasi-bul", "http-durum-kodlari"],
  related: ["port-numaralari-80-443-22", "http-durum-kodlari-404-500-nedir", "oltalama-sahte-link-nasil-anlasilir", "iki-adimli-dogrulama-nedir-2fa"],
  sources: [
    ["CA/Browser Forum – Baseline Requirements", "https://cabforum.org/"],
    ["IETF – TLS 1.3 (RFC 8446)", "https://www.rfc-editor.org/rfc/rfc8446"]
  ]
};
