export default {
  slug: "user-agent-nedir-tarayici-bilgisi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "User-Agent Nedir? Tarayıcı, Cihaz ve İşletim Sistemi Bilgisi Nasıl Okunur",
  pageTitle: "User-Agent Nedir? Tarayıcı ve Cihaz Bilgisi Nasıl Okunur",
  description: "User-Agent, tarayıcının her istekte sunucuya gönderdiği kimlik metnidir: tarayıcı, sürüm, işletim sistemi ve cihaz türü. Okuma, Client Hints ve MIME türü.",
  keywords: ["user agent nedir", "user agent öğrenme", "tarayıcı bilgisi", "user agent string", "http başlıkları", "content-type nedir", "mime türü", "client hints nedir"],
  lead: "User-Agent, tarayıcınızın ya da bir programın <strong>her web isteğiyle birlikte sunucuya gönderdiği kimlik metnidir</strong>; içinde tarayıcı adı ve sürümü, işletim sistemi, işleme motoru ve cihazın mobil olup olmadığı bilgisi bulunur. Siteler bu metne bakarak mobil sayfa gösterir, eski tarayıcılara uyarı verir ya da istatistik tutar. Bu sayfada User-Agent dizesinin parça parça nasıl okunduğunu, neden her tarayıcıda \"Mozilla/5.0\" yazdığını, kendi bilginizi nasıl öğreneceğinizi, Client Hints'in getirdiği değişikliği, Content-Type (MIME türü) başlığını ve botların nasıl tanındığını bulacaksınız.",
  kisaCevap: [
    "User-Agent bir HTTP istek başlığıdır; tarayıcı her sayfa, resim ve dosya isteğinde bu başlığı gönderir.",
    "Dize genellikle \"Mozilla/5.0 (platform) motor (uyumluluk) tarayıcı/sürüm\" kalıbındadır.",
    "\"Mozilla/5.0\" ifadesi tarihsel uyumluluk için tutulur; bugün hiçbir anlam taşımaz ama silinirse bazı siteler bozulur.",
    "Yeni tarayıcılar User-Agent'taki ayrıntıyı azaltıyor; ayrıntılı bilgi Client Hints (Sec-CH-UA) başlıklarıyla, gerektiğinde isteniyor.",
    "User-Agent'ı değiştirmek gizlilik sağlamaz; nadir bir değer sizi kalabalıktan daha da ayırt edilebilir yapabilir.",
    "Content-Type başlığı gönderilen içeriğin türünü (ör. text/html, application/json, image/png) MIME türüyle bildirir."
  ],
  figure: {
    alt: "Örnek bir User-Agent dizesinin parçalara ayrılmış hâli: Mozilla/5.0 uyumluluk belirteci, parantez içinde işletim sistemi ve mimari, işleme motoru, uyumluluk notu, tarayıcı adı ve sürümü.",
    caption: "Bir masaüstü tarayıcının User-Agent dizesi beş parçadan oluşur. En güvenilir bilgiler parantez içindeki platform ve sondaki tarayıcı sürümüdür; baştaki belirteçler tarihsel uyumluluk içindir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">User-Agent dizesi parça parça</text>
  <rect x="20" y="50" width="680" height="44" rx="6" class="sf sb"/>
  <text x="360" y="77" class="sm mid"><tspan class="p b">Mozilla/5.0</tspan> (<tspan class="ok b">Windows NT 10.0; Win64; x64</tspan>) <tspan class="b">AppleWebKit/537.36</tspan> (KHTML, like Gecko) <tspan class="p b">Tarayıcı/131.0</tspan></text>
  <g class="sm">
    <rect x="20" y="118" width="160" height="96" rx="8" class="ps"/>
    <text x="100" y="142" class="b mid">1. Belirteç</text>
    <text x="100" y="166" class="mid">Mozilla/5.0</text>
    <text x="100" y="190" class="mid mu">tarihsel, anlamsız</text>
    <rect x="193" y="118" width="160" height="96" rx="8" class="oks"/>
    <text x="273" y="142" class="b mid">2. Platform</text>
    <text x="273" y="166" class="mid">işletim sistemi</text>
    <text x="273" y="190" class="mid">ve işlemci mimarisi</text>
    <rect x="366" y="118" width="160" height="96" rx="8" class="sf sb"/>
    <text x="446" y="142" class="b mid">3. Motor</text>
    <text x="446" y="166" class="mid">sayfayı çizen</text>
    <text x="446" y="190" class="mid">işleme motoru</text>
    <rect x="540" y="118" width="160" height="96" rx="8" class="ps"/>
    <text x="620" y="142" class="b mid">4. Tarayıcı</text>
    <text x="620" y="166" class="mid">ad ve ana sürüm</text>
    <text x="620" y="190" class="mid mu">(alt sürüm 0.0.0)</text>
  </g>
  <text x="20" y="252" class="b">Siteler bu bilgiyle ne yapar?</text>
  <g class="sm">
    <rect x="20" y="266" width="220" height="60" rx="8" class="sf sb"/><text x="130" y="292" class="mid b">Mobil mi?</text><text x="130" y="312" class="mid">uygun düzeni seçer</text>
    <rect x="250" y="266" width="220" height="60" rx="8" class="sf sb"/><text x="360" y="292" class="mid b">Eski sürüm mü?</text><text x="360" y="312" class="mid">uyarı ya da yedek kod</text>
    <rect x="480" y="266" width="220" height="60" rx="8" class="sf sb"/><text x="590" y="292" class="mid b">Bot mu?</text><text x="590" y="312" class="mid">istatistikten ayırır</text>
  </g>
  <rect x="20" y="346" width="680" height="54" rx="8" class="dgs"/>
  <text x="36" y="368" class="b dg">Unutmayın</text>
  <text x="36" y="389" class="sm">User-Agent kullanıcı tarafından değiştirilebilir; güvenlik kararı için tek başına kanıt değildir.</text>
</svg>`
  },
  sections: [
    {
      h: "User-Agent nedir, ne işe yarar?",
      p: [
        "Bir web sayfasını açtığınızda tarayıcınız sunucuya bir HTTP isteği gönderir. Bu istekte hangi adresin istendiği bilgisinin yanında, <strong>başlık</strong> adı verilen ek satırlar da bulunur. User-Agent bu başlıklardan biridir ve \"isteği gönderen yazılım kim?\" sorusuna cevap verir.",
        "Sunucular ve sayfadaki kodlar bu bilgiyi birçok amaçla kullanır: telefondan gelen ziyaretçiye mobil düzeni göstermek, belirli bir sürümdeki bilinen bir hatayı atlatmak, desteklenmeyen tarayıcıya uyarı göstermek, istatistiklerde hangi cihazların kullanıldığını saymak ya da arama motoru botlarını insan ziyaretçilerden ayırmak.",
        "User-Agent yalnızca tarayıcılara özgü değildir. Komut satırı indirme programları, mobil uygulamalar, akıllı televizyonlar, oyun konsolları ve arama motoru tarayıcıları da kendi User-Agent değerlerini gönderir. Değer boşsa ya da çok sıra dışıysa birçok güvenlik duvarı isteği şüpheli sayar."
      ]
    },
    {
      h: "User-Agent dizesi nasıl okunur?",
      p: [
        "Dize ilk bakışta karmaşık görünür, çünkü yıllar içinde her tarayıcı uyumluluk kaygısıyla öncekinin belirteçlerini de eklemiştir. Ama sabit bir mantığı vardır: önce genel belirteç, ardından parantez içinde platform, sonra motor bilgileri ve en sonda gerçek tarayıcı adı ve sürümü gelir."
      ],
      table: {
        head: ["Parça", "Örnek değer", "Anlamı"],
        rows: [
          ["Genel belirteç", "Mozilla/5.0", "Tarihsel uyumluluk; tüm modern tarayıcılarda aynı"],
          ["Platform", "Windows NT 10.0; Win64; x64", "64 bit masaüstü işletim sistemi"],
          ["Platform (telefon)", "Linux; Android 10; K", "Mobil işletim sistemi; model bilgisi gizlenmiş"],
          ["Motor", "AppleWebKit/537.36 (KHTML, like Gecko)", "Sayfayı çizen işleme motoru ve uyumluluk notu"],
          ["Tarayıcı", "Ad/131.0.0.0", "Ana sürüm 131; alt sürümler sıfırlanmış"],
          ["Mobil işareti", "Mobile", "Varsa cihaz telefon olarak değerlendirilir"]
        ],
        caption: "Değerler örnektir. Yeni tarayıcılar alt sürüm ve cihaz modeli gibi ayrıntıları sabit değerlerle değiştiriyor."
      },
      after: [
        "Dizeyi elle çözmek yerine [[arac:user-agent-coz|User-Agent Çözümleyici]] aracına yapıştırabilirsiniz; araç tarayıcı adı ve sürümü, işletim sistemi, cihaz türü, işleme motoru ve bot olup olmadığını ayrı satırlarda gösterir."
      ]
    },
    {
      h: "Neden her tarayıcıda \"Mozilla/5.0\" yazıyor?",
      p: [
        "1990'ların ortasında web siteleri, gelişmiş özellikleri (örneğin çerçeveler) yalnızca User-Agent'ı \"Mozilla\" ile başlayan tarayıcılara gönderiyordu; çünkü o dönemde bu özellikleri destekleyen tarayıcı oydu. Rakip tarayıcılar da aynı özellikleri desteklemeye başlayınca, sitelerin onları dışlamaması için kendi dizelerinin başına \"Mozilla\" yazdılar.",
        "Bu durum zincirleme devam etti: yeni çıkan her tarayıcı, mevcut sitelerin kendisini doğru tanıması için öncekilerin belirteçlerini de ekledi. Bugün neredeyse her tarayıcının dizesinde başka tarayıcıların adları geçer. \"Mozilla/5.0\" artık hiçbir bilgi taşımaz ama kaldırılırsa eski kodlarla yazılmış bazı siteler bozulabilir; bu yüzden tutulmaya devam eder.",
        "Bu tarihçenin pratik sonucu şudur: User-Agent içinde bir adın geçmesi, tarayıcının o olduğu anlamına gelmez. Doğru tanıma için dizenin sonundaki ve parantez içindeki belirteçlere bakılır; çözümleyici araçlar da bu sırayla çalışır."
      ]
    },
    {
      h: "Kendi User-Agent bilginizi nasıl öğrenirsiniz?",
      ol: [
        "[[arac:ekran-cozunurlugu|Ekran Çözünürlüğü aracını]] açın; tarayıcı, işletim sistemi ve ekran bilgileriniz hiçbir veri gönderilmeden aynı sayfada görünür.",
        "Tam dizeyi görmek için tarayıcının geliştirici araçlarını (genellikle F12) açın, Konsol sekmesine <code>navigator.userAgent</code> yazıp Enter'a basın.",
        "Ağ sekmesinde herhangi bir isteği seçerek \"İstek başlıkları\" bölümündeki User-Agent satırını da görebilirsiniz.",
        "Dizeyi kopyalayıp User-Agent çözümleyiciye yapıştırarak parçaların anlamını okuyun."
      ],
      after: [
        "Destek ekibine bir sorun bildirirken User-Agent bilgisini eklemek, sorunun belirli bir tarayıcı sürümüne özgü olup olmadığını hızla anlamalarını sağlar. Ekran çözünürlüğü ve piksel oranı da çoğu görsel hatada önemli ipucudur; bu kavramlar için [[bilgi:4k-kac-piksel-cozunurluk-turleri|çözünürlük türleri rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Siteler cihaz türünü nasıl anlar?",
      p: [
        "Cihaz türünü belirlemenin üç yaygın yolu vardır. Birincisi User-Agent'taki \"Mobile\" ve platform belirteçleridir; sunucu tarafında hızlı karar vermek için kullanılır. İkincisi Client Hints'teki <code>Sec-CH-UA-Mobile</code> başlığıdır; değeri \"?1\" ise cihaz mobildir. Üçüncüsü ve modern sitelerde en önemlisi, sayfanın kendisinin ekran genişliğine göre düzenini değiştirmesidir (duyarlı tasarım).",
        "Duyarlı tasarımda site cihazın ne olduğunu bilmek zorunda değildir; ekranın kaç piksel genişliğinde olduğuna bakar. 360 piksellik bir telefon ile pencereyi daraltılmış bir masaüstü tarayıcı aynı düzeni görür. Bu yaklaşım User-Agent'a bağımlılığı azalttığı için önerilen yöntemdir; User-Agent ise yalnızca gerçekten gerekli durumlarda yardımcı ipucu olarak kullanılır."
      ]
    },
    {
      h: "Client Hints User-Agent'ın yerini alıyor mu?",
      p: [
        "User-Agent dizesi her istekte, istenmese bile çok sayıda ayrıntı gönderir. Bu ayrıntılar bir araya getirildiğinde kullanıcıyı ayırt etmeye yarayan bir \"parmak izi\"nin parçası olabilir. Bu nedenle bazı tarayıcılar dizeyi sadeleştirmeye başladı: alt sürüm numaraları sıfırlandı, işletim sistemi sürümü ve telefon modeli sabit değerlerle değiştirildi.",
        "Ayrıntıya gerçekten ihtiyaç duyan siteler için <strong>User-Agent Client Hints</strong> adlı yeni bir yöntem geliştirildi. Tarayıcı varsayılan olarak yalnızca birkaç temel bilgiyi gönderir; site daha fazlasını isterse yanıtında bunu talep eder ve tarayıcı sonraki isteklerde ek başlıkları ekler."
      ],
      table: {
        head: ["Başlık", "Taşıdığı bilgi", "Varsayılan olarak gönderilir mi?"],
        rows: [
          ["Sec-CH-UA", "Tarayıcı markası ve ana sürüm listesi", "Evet"],
          ["Sec-CH-UA-Mobile", "Mobil cihaz mı (?1 / ?0)", "Evet"],
          ["Sec-CH-UA-Platform", "İşletim sistemi adı", "Evet"],
          ["Sec-CH-UA-Platform-Version", "İşletim sistemi sürümü", "Hayır, site ister"],
          ["Sec-CH-UA-Model", "Cihaz modeli", "Hayır, site ister"],
          ["Sec-CH-UA-Full-Version-List", "Tam sürüm numaraları", "Hayır, site ister"]
        ]
      },
      after: [
        "Client Hints yalnızca güvenli (HTTPS) bağlantılarda çalışır ve tüm tarayıcılar tarafından desteklenmez. Bu yüzden User-Agent başlığı ortadan kalkmayacak; ama içindeki ayrıntının giderek azalması beklenmelidir."
      ]
    },
    {
      h: "User-Agent değiştirmek gizlilik sağlar mı?",
      p: [
        "Geliştirici araçları ve bazı eklentiler User-Agent'ı değiştirmenize izin verir. Bu, bir sitenin mobil görünümünü masaüstünde test etmek için kullanışlıdır. Ancak gizlilik aracı olarak beklenen etkiyi yapmaz.",
        "Siteler ziyaretçiyi yalnızca User-Agent ile değil; ekran çözünürlüğü, saat dilimi, dil ayarı, yazı tipleri ve donanım özellikleri gibi birçok ipucunu birleştirerek tanıyabilir. User-Agent'ı nadir bir değerle değiştirmek, diğer ipuçlarıyla çelişen ve sizi kalabalıktan daha da ayıran bir iz oluşturabilir. Gizlilik için tarayıcının izleme korumalarını açmak, çerezleri düzenli temizlemek ve eklentileri azaltmak çok daha etkilidir."
      ]
    },
    {
      h: "Content-Type (MIME türü) başlığı ne anlatır?",
      p: [
        "User-Agent \"kim istiyor?\" sorusunu cevaplarken, <strong>Content-Type</strong> başlığı \"gönderilen şey ne?\" sorusunu cevaplar. Sunucu bir yanıt gönderdiğinde içeriğin türünü MIME türü adı verilen standart bir etiketle bildirir; tarayıcı dosyayı nasıl işleyeceğine buna göre karar verir. Biçim \"tür/alt tür\" şeklindedir ve isteğe bağlı olarak karakter kodlaması eklenir."
      ],
      table: {
        head: ["MIME türü", "İçerik", "Yaygın uzantı"],
        rows: [
          ["text/html; charset=utf-8", "Web sayfası", ".html"],
          ["application/json", "JSON veri", ".json"],
          ["application/pdf", "PDF belgesi", ".pdf"],
          ["image/png, image/jpeg, image/webp", "Resim", ".png, .jpg, .webp"],
          ["text/csv", "Virgülle ayrılmış tablo", ".csv"],
          ["application/octet-stream", "Türü bilinmeyen ikili dosya", "çeşitli"]
        ]
      },
      after: [
        "Yanlış MIME türü tuhaf sorunlara yol açar: PDF'in tarayıcıda açılmak yerine indirilmesi, Türkçe karakterlerin bozuk görünmesi ya da bir betiğin güvenlik nedeniyle çalıştırılmaması gibi. Bir uzantının doğru MIME türünü [[arac:mime-turu-bul|MIME Türü Bulucu]] ile öğrenebilirsiniz. Sunucunun hangi durum kodunu döndürdüğünü anlamak için [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları rehberi]], JSON yanıtlarını okumak için [[bilgi:json-nedir-nasil-okunur|JSON rehberi]] yardımcı olur."
      ]
    },
    {
      h: "Botlar User-Agent ile nasıl tespit edilir?",
      p: [
        "Arama motorlarının tarayıcıları, sosyal medya bağlantı önizleyicileri ve izleme servisleri User-Agent'larında kendilerini açıkça tanıtır; dizede genellikle \"bot\", \"crawler\", \"spider\" ya da \"preview\" gibi sözcükler ve bir bilgi adresi bulunur. İstatistik araçları bu kalıplara bakarak bot trafiğini insan ziyaretçilerden ayırır.",
        "Ancak kötü niyetli otomatik programlar kendilerini sıradan bir tarayıcı gibi tanıtabilir. Bu nedenle User-Agent tek başına güvenlik kararı için yeterli değildir. Büyük arama motorları, botlarının gerçekten kendilerine ait olup olmadığını doğrulamak için IP adresinin ters DNS kaydını kontrol etmeyi önerir. Sitenizin hangi bölümlerinin taranacağını ise [[bilgi:robots-txt-nedir-nasil-yazilir|robots.txt dosyasıyla]] belirleyebilirsiniz; dürüst botlar bu kurallara uyar, kötü niyetliler uymaz."
      ]
    }
  ],
  faq: [
    ["User-Agent nedir, ne işe yarar?", "User-Agent, tarayıcının ya da bir programın her web isteğiyle sunucuya gönderdiği kimlik metnidir. Siteler bu bilgiyle mobil düzen seçer, eski sürümlere uyarı gösterir, istatistik tutar ve arama motoru botlarını insan ziyaretçilerden ayırır."],
    ["Kendi User-Agent bilgim nasıl öğrenilir?", "Tarayıcının geliştirici araçlarını açıp Konsol sekmesine navigator.userAgent yazabilir ya da tarayıcı ve ekran bilgilerinizi gösteren bir araç sayfasını kullanabilirsiniz. Çıkan dizeyi çözümleyici araca yapıştırarak parçaların anlamını okuyabilirsiniz."],
    ["User-Agent dizesindeki 'Mozilla/5.0' neden her tarayıcıda var?", "Eskiden siteler gelişmiş özellikleri yalnızca bu belirteçle başlayan tarayıcılara gönderiyordu. Diğer tarayıcılar dışlanmamak için aynı belirteci eklediler; bugün anlam taşımasa da eski siteler bozulmasın diye tutulmaya devam ediyor."],
    ["Siteler cihaz türünü nasıl anlar?", "User-Agent'taki Mobile ve platform belirteçlerine, Client Hints'teki Sec-CH-UA-Mobile başlığına ve en önemlisi ekran genişliğine bakarlar. Modern siteler duyarlı tasarımla ekran genişliğine göre düzen değiştirdiği için cihaz türünü bilmek zorunda kalmaz."],
    ["User-Agent değiştirmek gizlilik sağlar mı?", "Çoğu zaman sağlamaz. Siteler ekran çözünürlüğü, saat dilimi, dil ve yazı tipleri gibi birçok ipucunu birleştirir; nadir bir User-Agent değeri sizi kalabalıktan daha da ayırt edilebilir yapabilir. İzleme korumaları ve çerez temizliği daha etkilidir."],
    ["Content-Type (MIME türü) başlığı ne anlatır?", "Content-Type, sunucunun gönderdiği içeriğin türünü text/html, application/json ya da image/png gibi standart bir etiketle bildirir. Tarayıcı dosyayı göstermeye, indirmeye ya da çalıştırmaya bu etikete ve varsa karakter kodlamasına bakarak karar verir."],
    ["Client Hints User-Agent'ın yerini alıyor mu?", "Tamamen değil. Client Hints, ayrıntılı bilgiyi yalnızca site istediğinde gönderen yeni bir yöntemdir ve User-Agent'taki ayrıntının azalmasını sağlar. User-Agent başlığı uyumluluk için gönderilmeye devam eder ama içeriği giderek sadeleşir."],
    ["Botlar User-Agent ile nasıl tespit edilir?", "Dürüst botlar dizelerinde bot, crawler ya da spider gibi sözcüklerle kendilerini tanıtır. Kötü niyetli programlar ise kendini tarayıcı gibi gösterebildiği için kesin doğrulama IP adresinin ters DNS kaydı gibi ek kontrollerle yapılır."],
    ["User-Agent bilgisi kişisel veri sayılır mı?", "Tek başına genellikle bir kişiyi doğrudan tanımlamaz, ancak IP adresi ve diğer tarayıcı özellikleriyle birleştirildiğinde kullanıcıyı ayırt etmeye yardımcı olabilir. Bu nedenle sunucu kayıtlarında saklanırken diğer kişisel verilerle aynı özen gösterilmelidir."]
  ],
  tools: ["user-agent-coz", "mime-turu-bul", "ekran-cozunurlugu", "url-ayristir"],
  related: ["http-durum-kodlari-404-500-nedir", "robots-txt-nedir-nasil-yazilir", "json-nedir-nasil-okunur"]
};
