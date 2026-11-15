export default {
  slug: "http-durum-kodlari-404-500-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "HTTP Durum Kodları Nedir? 404, 500, 301 ve 403 Hataları Ne Anlama Gelir",
  pageTitle: "HTTP Durum Kodları: 404, 500, 301, 403 Ne Anlama Gelir?",
  description: "HTTP durum kodu, sunucunun isteğe verdiği üç haneli cevaptır. 404 sayfa bulunamadı, 500 sunucu hatası, 301 kalıcı yönlendirme demektir. Nedenleri ve çözümleri.",
  keywords: ["404 hatası nedir", "http durum kodları", "500 internal server error", "301 yönlendirme nedir", "403 forbidden nedir", "502 bad gateway", "301 302 farkı", "404 mü 410 mu", "durum kodları seo"],
  lead: "HTTP durum kodu, bir web sunucusunun tarayıcının isteğine verdiği <strong>üç haneli cevaptır</strong> ve ilk hane cevabın türünü söyler: 2xx başarılı, 3xx yönlendirme, 4xx istemci tarafı hata, 5xx sunucu tarafı hatadır. <strong>404</strong> istenen sayfanın bulunamadığını, <strong>500</strong> sunucuda beklenmeyen bir hata oluştuğunu, <strong>301</strong> sayfanın kalıcı olarak başka adrese taşındığını, <strong>403</strong> ise erişim izninin olmadığını gösterir. Bu sayfada en sık karşılaşılan kodların anlamını, ziyaretçi ve site sahibi açısından nasıl çözüleceğini ve arama motorlarındaki etkisini bulacaksınız.",
  kisaCevap: [
    "1xx bilgi, 2xx başarı, 3xx yönlendirme, 4xx istemci hatası, 5xx sunucu hatası anlamına gelir.",
    "200 OK isteğin başarıyla karşılandığını, 404 Not Found adreste bir kaynak bulunmadığını gösterir.",
    "301 ve 308 kalıcı, 302 ve 307 geçici yönlendirmedir; taşınan sayfalar için kalıcı yönlendirme kullanılır.",
    "403 Forbidden sunucunun isteği anladığını ama erişime izin vermediğini, 401 ise kimlik doğrulama gerektiğini belirtir.",
    "500 genel sunucu hatası, 502 ara sunucunun arkadaki sunucudan geçersiz cevap aldığını, 503 hizmetin geçici olarak kullanılamadığını bildirir.",
    "Kalıcı olarak kaldırılan sayfa için 404 ya da 410 verilebilir; ikisi de sayfanın dizinden çıkarılmasına yol açar."
  ],
  figure: {
    alt: "HTTP durum kodlarının beş sınıfını gösteren şema: 1xx bilgi, 2xx başarı, 3xx yönlendirme, 4xx istemci hatası, 5xx sunucu hatası; her sınıf için en sık görülen kodlar ve sorumluluğun kimde olduğu.",
    caption: "Kodun ilk hanesi sorunun nerede aradığınızı söyler: 4xx genellikle istekte (adres, yetki, istek sayısı), 5xx ise sunucuda ya da sunucular arasındaki bağlantıdadır. 3xx bir hata değil, tarayıcıya başka bir adrese gitmesini söyleyen talimattır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Durum kodunun ilk hanesi her şeyi anlatır</text>
  <rect x="30" y="48" width="120" height="60" rx="8" class="sf sb"/><text x="90" y="76" class="lg b mid">1xx</text><text x="90" y="96" class="sm mid">Bilgi</text>
  <text x="170" y="74" class="sm">100 Continue · 101 Switching Protocols</text>
  <text x="170" y="94" class="sm t2">İstek işleniyor, devam et</text>
  <rect x="30" y="118" width="120" height="60" rx="8" class="oks"/><text x="90" y="146" class="lg b mid">2xx</text><text x="90" y="166" class="sm mid">Başarılı</text>
  <text x="170" y="144" class="sm">200 OK · 201 Created · 204 No Content</text>
  <text x="170" y="164" class="sm t2">İstek karşılandı</text>
  <rect x="30" y="188" width="120" height="60" rx="8" class="ps"/><text x="90" y="216" class="lg b mid">3xx</text><text x="90" y="236" class="sm mid">Yönlendirme</text>
  <text x="170" y="214" class="sm">301 / 308 kalıcı · 302 / 307 geçici · 304 değişmedi</text>
  <text x="170" y="234" class="sm t2">Başka adrese git ya da önbelleği kullan</text>
  <rect x="30" y="258" width="120" height="60" rx="8" class="dgs"/><text x="90" y="286" class="lg b mid">4xx</text><text x="90" y="306" class="sm mid">İstemci hatası</text>
  <text x="170" y="284" class="sm">400 · 401 · 403 · 404 · 410 · 429</text>
  <text x="170" y="304" class="sm t2">Sorun istekte: adres, yetki, istek sayısı</text>
  <rect x="30" y="328" width="120" height="60" rx="8" class="dg"/><text x="90" y="356" class="lg b mid sf">5xx</text><text x="90" y="376" class="sm mid sf">Sunucu hatası</text>
  <text x="170" y="354" class="sm">500 · 502 · 503 · 504</text>
  <text x="170" y="374" class="sm t2">Sorun sunucuda ya da sunucular arasında</text>
  <rect x="500" y="118" width="190" height="200" rx="10" class="sf sb"/>
  <text x="595" y="146" class="b mid">Kim çözer?</text>
  <text x="516" y="180" class="sm">4xx: önce adresi ve</text>
  <text x="516" y="198" class="sm">oturumu kontrol edin</text>
  <text x="516" y="236" class="sm">5xx: ziyaretçi bekler,</text>
  <text x="516" y="254" class="sm">site sahibi kayıtlara</text>
  <text x="516" y="272" class="sm">(log) bakar</text>
</svg>`
  },
  sections: [
    {
      h: "HTTP durum kodları nedir?",
      p: [
        "Bir web sayfasını açtığınızda tarayıcınız sunucuya bir istek gönderir ve sunucu her cevabın başına üç haneli bir <strong>durum kodu</strong> ekler. Kod, isteğin ne olduğunu kısaca özetler: sayfa bulundu mu, başka bir yere mi taşındı, erişim izni var mı, sunucuda bir sorun mu çıktı? Çoğu zaman bu kodu görmezsiniz, çünkü başarılı cevaplarda tarayıcı doğrudan sayfayı gösterir. Bir sorun olduğunda ise \"404 Sayfa bulunamadı\" ya da \"500 Internal Server Error\" gibi bir hata sayfasıyla karşılaşırsınız.",
        "Durum kodlarının anlamı, web'in temel protokolü olan HTTP'nin standartlarında tanımlanmıştır ve bütün sunucular ile tarayıcılar aynı dili konuşur. Bu sayede bir arama motoru botu, bir mobil uygulama ya da bir izleme aracı da sayfanın durumunu kodu okuyarak anlar.",
        "Merak ettiğiniz bir kodun adını, Türkçe karşılığını ve nasıl ele alınacağını [[arac:http-durum-kodlari|HTTP durum kodları sorgulama aracı]]na yazarak öğrenebilirsiniz."
      ]
    },
    {
      h: "En sık karşılaşılan durum kodları tablosu",
      table: {
        head: ["Kod", "Adı", "Anlamı", "Kim ilgilenmeli?"],
        rows: [
          ["200", "OK", "İstek başarılı, içerik gönderildi", "Sorun yok"],
          ["301", "Moved Permanently", "Kaynak kalıcı olarak yeni adrese taşındı", "Site sahibi (doğru hedef mi?)"],
          ["302", "Found", "Kaynak geçici olarak başka adreste", "Site sahibi"],
          ["304", "Not Modified", "Önbellekteki kopya güncel, yeniden gönderilmedi", "Sorun yok"],
          ["307 / 308", "Temporary / Permanent Redirect", "Geçici / kalıcı yönlendirme; istek yöntemi korunur", "Site sahibi"],
          ["400", "Bad Request", "İstek bozuk ya da anlaşılamadı", "Ziyaretçi ya da uygulama"],
          ["401", "Unauthorized", "Kimlik doğrulama gerekiyor", "Ziyaretçi (giriş yapmalı)"],
          ["403", "Forbidden", "İstek anlaşıldı ama erişim izni yok", "Site sahibi ya da yetkili"],
          ["404", "Not Found", "Bu adreste kaynak bulunamadı", "Ziyaretçi ya da site sahibi"],
          ["410", "Gone", "Kaynak kalıcı olarak kaldırıldı", "Bilgi amaçlı"],
          ["429", "Too Many Requests", "Kısa sürede çok fazla istek gönderildi", "Ziyaretçi ya da uygulama (beklemeli)"],
          ["500", "Internal Server Error", "Sunucuda beklenmeyen bir hata oluştu", "Site sahibi"],
          ["502", "Bad Gateway", "Ara sunucu arkadaki sunucudan geçersiz cevap aldı", "Site sahibi ya da barındırma"],
          ["503", "Service Unavailable", "Hizmet geçici olarak kullanılamıyor", "Site sahibi (bakım ya da aşırı yük)"],
          ["504", "Gateway Timeout", "Ara sunucu arkadaki sunucudan zamanında cevap alamadı", "Site sahibi ya da barındırma"]
        ]
      }
    },
    {
      h: "404 hatası ne demek, nasıl çözülür?",
      p: [
        "404 Not Found, sunucunun çalıştığını ama istediğiniz adreste bir sayfa ya da dosya bulamadığını söyler. Sunucuya ulaşmışsınızdır; sorun adrestedir. En yaygın nedenler yanlış yazılmış bir adres, silinmiş ya da adı değiştirilmiş bir sayfa ve eskimiş bir bağlantıdır."
      ],
      ul: [
        "<strong>Ziyaretçi olarak:</strong> Adres çubuğundaki adresi kontrol edin; büyük-küçük harf, eksik harf ya da sondaki fazla karakter 404'e yol açabilir. Adresin sonunu kısaltarak bir üst sayfaya çıkın ya da sitenin arama kutusunu kullanın.",
        "<strong>Site sahibi olarak:</strong> Taşınan sayfalar için eski adresten yeni adrese kalıcı (301) yönlendirme tanımlayın. Site içindeki kırık bağlantıları düzeltin. Kullanıcıyı ana sayfaya ve aramaya yönlendiren yardımcı bir 404 sayfası hazırlayın.",
        "<strong>Yumuşak 404'ten kaçının:</strong> \"Sayfa bulunamadı\" yazan ama 200 OK kodu döndüren sayfalar arama motorlarını yanıltır. Bulunamayan sayfalar gerçekten 404 ya da 410 koduyla cevap vermelidir."
      ],
      after: [
        "Bir adresin parçalarını (alan adı, yol, sorgu parametreleri) tek tek incelemek, yanlışlığı bulmayı kolaylaştırır; bunun için [[arac:url-ayristir|URL ayrıştırma aracı]]nı kullanabilirsiniz."
      ]
    },
    {
      h: "500 hatası neden olur? 502, 503 ve 504 farkı",
      p: [
        "5xx kodları sorunun sunucu tarafında olduğunu gösterir; ziyaretçinin yapabileceği şey genellikle birkaç dakika sonra yeniden denemektir. Site sahibi için ise ilk adım sunucu hata kayıtlarına (log) bakmaktır."
      ],
      ul: [
        "<strong>500 Internal Server Error:</strong> Genel bir \"bir şeyler ters gitti\" cevabıdır. Hatalı bir kod güncellemesi, eklenti ya da tema çakışması, bozuk yapılandırma dosyası, dosya izinleri ya da sunucu bellek sınırının aşılması sık nedenlerdir. Son yapılan değişikliği geri almak çoğu zaman en hızlı çözümdür.",
        "<strong>502 Bad Gateway:</strong> Önde duran bir ara sunucu (ters vekil sunucu, içerik dağıtım ağı ya da yük dengeleyici) arkadaki uygulama sunucusundan anlamsız ya da boş bir cevap almıştır. Uygulama sürecinin çökmesi ya da yeniden başlatılması tipik nedendir.",
        "<strong>503 Service Unavailable:</strong> Sunucu bakımda ya da aşırı yük altındadır. Planlı bakımlarda 503 ile birlikte yeniden deneme süresini bildiren bir başlık göndermek, hem tarayıcılara hem arama motorlarına durumun geçici olduğunu anlatır.",
        "<strong>504 Gateway Timeout:</strong> Ara sunucu, arkadaki sunucudan belirlenen süre içinde cevap alamamıştır. Uzun süren veritabanı sorguları, yavaş dış servisler ya da sunucu kaynaklarının yetersizliği neden olabilir."
      ]
    },
    {
      h: "301 ve 302 yönlendirme farkı nedir?",
      p: [
        "Yönlendirme kodları tarayıcıya \"aradığın şey başka adreste\" der ve yeni adresi bildirir. Tarayıcı bu adrese otomatik olarak gider; çoğu kullanıcı yönlendirmeyi fark etmez. Farkı yaratan, yönlendirmenin kalıcı mı geçici mi olduğudur."
      ],
      table: {
        head: ["Kod", "Tür", "İstek yöntemi", "Ne zaman kullanılır?"],
        rows: [
          ["301", "Kalıcı", "Tarayıcı POST'u GET'e çevirebilir", "Sayfa adresi kalıcı olarak değişti, alan adı taşındı"],
          ["308", "Kalıcı", "Yöntem ve gövde korunur", "Kalıcı taşıma; form ve API istekleri dahil"],
          ["302", "Geçici", "Tarayıcı POST'u GET'e çevirebilir", "Kısa süreli kampanya, geçici bakım sayfası"],
          ["307", "Geçici", "Yöntem ve gövde korunur", "Geçici yönlendirme; form ve API istekleri dahil"]
        ]
      },
      after: [
        "Arama motorları kalıcı yönlendirmeyi, eski adresin yerini yeni adresin alması gerektiği yönünde güçlü bir işaret olarak değerlendirir; geçici yönlendirmede ise eski adresi dizinde tutmaya devam edebilir. Bu yüzden site taşırken, \"http\"den \"https\"e geçerken ya da sayfa adresini kalıcı olarak değiştirirken 301 ya da 308 kullanılmalıdır.",
        "Sunucu ayarlarına erişiminiz yoksa son çare olarak sayfanın HTML'ine bir meta yenileme etiketi eklenebilir; ancak sunucu tarafı yönlendirme her zaman tercih edilir. [[arac:yonlendirme-meta-olustur|Meta yönlendirme oluşturucu]] yedek bağlantı ve kanonik satırıyla birlikte bu etiketi hazırlar."
      ]
    },
    {
      h: "403 Forbidden ve 401 hataları nasıl çözülür?",
      p: [
        "403 Forbidden, sunucunun isteğinizi anladığını ama size bu kaynağı göstermeyi reddettiğini söyler. 401 Unauthorized ise \"kim olduğunuzu bilmiyorum, önce giriş yapın\" anlamına gelir. Aradaki fark, 403'te giriş yapmanın genellikle sonucu değiştirmemesidir."
      ],
      ul: [
        "<strong>Ziyaretçi olarak:</strong> Oturumunuzun açık olduğundan emin olun, tarayıcı çerezlerini ve önbelleği temizleyip yeniden deneyin. Kurum ağından ya da yurt dışından erişimin engellendiği sitelerde bağlandığınız ağ da 403'e neden olabilir.",
        "<strong>Site sahibi olarak:</strong> Dosya ve klasör izinlerini, sunucu yapılandırmasındaki erişim kurallarını ve güvenlik duvarı ya da güvenlik eklentisinin engelleme listelerini kontrol edin. Klasörde dizin dosyası (index) yoksa ve dizin listeleme kapalıysa sunucu da 403 döndürür.",
        "<strong>Arama motorları için:</strong> Botların erişmesini istemediğiniz alanları 403 ile değil, gerektiğinde robots.txt kurallarıyla yönetin. [[arac:robots-txt-olustur|robots.txt oluşturucu]] Disallow ve Allow satırlarını hazırlamanıza yardımcı olur."
      ]
    },
    {
      h: "Durum kodları SEO'yu etkiler mi?",
      p: [
        "Evet, arama motorları sayfaların durumunu büyük ölçüde bu kodlara bakarak anlar. Doğru kod, sitenizin taranma ve dizine eklenme biçimini doğrudan etkiler."
      ],
      ul: [
        "<strong>200:</strong> Sayfa dizine eklenmeye adaydır. Yalnızca gerçek içerik sunan sayfalar 200 döndürmelidir.",
        "<strong>301 / 308:</strong> Eski adresin sinyalleri zamanla yeni adrese aktarılır. Yönlendirme zincirlerinden (A'dan B'ye, B'den C'ye) kaçının; doğrudan son adrese yönlendirin.",
        "<strong>404 / 410:</strong> Sayfa zamanla dizinden çıkarılır. Birkaç 404 sitenizi cezalandırmaz; önemli olan, değerli sayfaların yanlışlıkla 404 vermemesidir.",
        "<strong>5xx:</strong> Uzun süren sunucu hataları taramanın yavaşlamasına ve sorun sürerse sayfaların dizinden düşmesine yol açabilir. Kısa bakımlar için 503 kullanmak durumun geçici olduğunu bildirir.",
        "<strong>Yumuşak 404:</strong> Boş ya da \"bulunamadı\" içerikli sayfaların 200 döndürmesi arama motoru raporlarında hata olarak görünür."
      ]
    },
    {
      h: "Sayfa kaldırılınca 404 mü 410 mu verilmeli?",
      p: [
        "İkisi de sayfanın artık bulunmadığını söyler ve sonuçta arama motorları her ikisini de dizinden çıkarır. Fark anlamdadır: 404 \"burada bir şey bulamadım\" derken 410 Gone \"bu kaynak bilerek ve kalıcı olarak kaldırıldı\" der. Kalıcı olarak kaldırdığınızdan emin olduğunuz içerikler için 410 daha açık bir mesajdır; uygulamada fark çoğu site için küçüktür.",
        "Kaldırılan sayfanın içeriği başka bir sayfada devam ediyorsa (örneğin satıştan kalkan bir ürünün yerine yeni modeli geldiyse) 404 ya da 410 yerine ilgili sayfaya 301 yönlendirme yapmak hem ziyaretçi hem arama motoru için daha iyidir. Alakasız sayfaları toplu olarak ana sayfaya yönlendirmek ise arama motorlarınca yumuşak 404 gibi değerlendirilebilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Her şeyi ana sayfaya yönlendirmek:</strong> Kaldırılan yüzlerce sayfayı ana sayfaya göndermek kullanıcıyı şaşırtır ve yumuşak 404 sayılabilir.",
        "<strong>Kalıcı taşımada 302 kullanmak:</strong> Eski adres dizinde kalmaya devam edebilir.",
        "<strong>Hata sayfasında 200 döndürmek:</strong> Görünüşte hata, teknik olarak başarı; arama motorları bu çelişkiyi sevmez.",
        "<strong>Bakımda 500 göstermek:</strong> Planlı bakımda 503 kullanın ve süreyi belirtin.",
        "<strong>Yönlendirme zinciri ve döngüsü:</strong> A'dan B'ye, B'den A'ya giden yönlendirme tarayıcıda \"çok fazla yönlendirme\" hatasına yol açar."
      ]
    }
  ],
  faq: [
    ["404 hatası ne demek?", "404 Not Found, sunucuya ulaşıldığını ama istenen adreste bir sayfa ya da dosya bulunamadığını gösterir. Yanlış yazılmış adres, silinmiş sayfa ya da eskimiş bir bağlantı en yaygın nedenlerdir."],
    ["HTTP durum kodları nelerdir?", "HTTP durum kodları sunucunun her isteğe verdiği üç haneli cevaplardır. 1xx bilgi, 2xx başarı, 3xx yönlendirme, 4xx istemci tarafı hata ve 5xx sunucu tarafı hata sınıflarına ayrılır."],
    ["500 hatası neden olur?", "500 Internal Server Error sunucuda beklenmeyen bir hata oluştuğunu gösterir. Hatalı kod güncellemesi, eklenti çakışması, bozuk yapılandırma, dosya izinleri ya da bellek sınırı sık nedenlerdir; site sahibi hata kayıtlarına bakmalıdır."],
    ["301 ve 302 yönlendirme farkı nedir?", "301 sayfanın kalıcı olarak yeni adrese taşındığını, 302 ise geçici olarak başka adreste olduğunu bildirir. Arama motorları kalıcı yönlendirmede yeni adresi esas alır; bu yüzden kalıcı taşımalarda 301 ya da 308 kullanılmalıdır."],
    ["403 Forbidden hatası nasıl çözülür?", "Ziyaretçi olarak oturumunuzu, çerezleri ve bağlandığınız ağı kontrol edebilirsiniz. Site sahibiyseniz dosya izinlerini, sunucu erişim kurallarını, güvenlik duvarı engellerini ve klasörde dizin dosyası olup olmadığını incelemelisiniz."],
    ["502 Bad Gateway ne anlama gelir?", "502, önde duran bir ara sunucunun arkadaki uygulama sunucusundan geçersiz ya da boş cevap aldığını gösterir. Uygulama sürecinin çökmesi ya da aşırı yük tipik nedenlerdir ve sorunu site sahibi ya da barındırma firması çözer."],
    ["Durum kodları SEO'yu etkiler mi?", "Evet. Arama motorları 200 dönen sayfaları dizine ekler, kalıcı yönlendirmelerde yeni adresi esas alır, 404 ve 410 sayfaları dizinden çıkarır. Uzun süren 5xx hataları taramayı yavaşlatır ve sayfaların düşmesine yol açabilir."],
    ["Sayfa kaldırılınca 404 mü 410 mu verilmeli?", "İkisi de sayfanın dizinden çıkmasını sağlar. 410, içeriğin bilerek ve kalıcı olarak kaldırıldığını daha açık ifade eder. İçerik başka bir sayfada devam ediyorsa ilgili sayfaya 301 yönlendirme yapmak daha iyidir."],
    ["429 Too Many Requests ne demek?", "429, kısa süre içinde sunucuya çok fazla istek gönderildiğini ve sunucunun bir süre yeni istekleri reddettiğini gösterir. Genellikle bir süre bekleyip yeniden denemek yeterlidir; uygulamalar istek hızını düşürmelidir."]
  ],
  tools: ["http-durum-kodlari", "yonlendirme-meta-olustur", "robots-txt-olustur", "url-ayristir"],
  related: ["ip-adresi-ve-alt-ag-maskesi-nedir", "internet-hizi-kac-mbps-olmali"],
  sources: [
    ["IETF – RFC 9110: HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110"],
    ["IETF – RFC 6585: Ek HTTP durum kodları (429)", "https://www.rfc-editor.org/rfc/rfc6585"]
  ]
};
