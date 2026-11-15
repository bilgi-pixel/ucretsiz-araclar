export default {
  slug: "internet-hizi-kac-mbps-olmali",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "İnternet Hızı Kaç Mbps Olmalı? Mbps ile MB/s Farkı ve İndirme Süresi",
  pageTitle: "İnternet Hızı Kaç Mbps Olmalı? Ev, 4K Yayın, Oyun ve Ping",
  description: "Ev için gereken internet hızı aynı anda yapılan işlerin toplamıdır: 4K yayın 15–25 Mbps, görüntülü görüşme 2–4 Mbps. Kişi sayısı, ping, fiber-VDSL ve hız testi.",
  keywords: ["internet hızı kaç mbps olmalı", "ev için kaç mbps yeterli", "4k yayın için kaç mbps", "oyun için internet hızı", "ping nedir", "fiber vdsl farkı", "100 mbps kaç mb/s", "upload hızı neden düşük"],
  lead: "Evinize gereken internet hızı, <strong>aynı anda</strong> yapılan işlerin ihtiyaçlarının toplamıdır: tek bir 4K yayın 15–25 Mbps, HD yayın 5–8 Mbps, görüntülü görüşme 2–4 Mbps ister. Bu yüzden 1–2 kişilik bir evde 25–50 Mbps genellikle yeterliyken, birden fazla 4K yayın, oyun ve büyük indirmelerin aynı anda yapıldığı kalabalık bir evde 100 Mbps ve üzeri rahatlık sağlar. Bu sayfada kişi sayısına göre hız seçimini, oyunda ping'in önemini, fiber ile VDSL farkını ve doğru hız testi yöntemini anlatıyoruz.",
  kisaCevap: [
    "Gereken hız ≈ aynı anda yapılan etkinliklerin toplam Mbps ihtiyacı × 1,25 (güvenlik payı).",
    "4K yayın için 15–25 Mbps, Full HD için 5–8 Mbps, HD görüntülü görüşme için 2–4 Mbps yeterlidir.",
    "Online oyunda hızdan çok gecikme (ping) önemlidir; 50 ms altı iyi, 20 ms altı çok iyidir.",
    "100 Mbps hat saniyede en fazla 12,5 MB indirir, çünkü 1 bayt 8 bittir.",
    "Fiber altyapı yüksek hız ve düşük gecikme sunar; VDSL'de hız santrale olan mesafeyle düşer.",
    "Doğru hız testi Wi-Fi yerine kabloyla, diğer cihazlar boştayken ve birkaç kez yapılır."
  ],
  figure: {
    alt: "Farklı internet kullanımlarının Mbps ihtiyacını gösteren yatay çubuk grafik: web ve mesajlaşma 1–2, görüntülü görüşme 3, Full HD yayın 8, 4K yayın 25, oyun indirme 50 Mbps; altta 4 kişilik bir ev için toplam ihtiyaç hesabı.",
    caption: "Her çubuk tek bir etkinliğin yaklaşık ihtiyacıdır. Evin toplam ihtiyacı, akşam saatlerinde aynı anda yapılan etkinliklerin toplanması ve yüzde 25 pay eklenmesiyle bulunur.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hangi iş kaç Mbps ister?</text>
  <g class="sm">
    <text x="190" y="72" class="end b">Web, mesaj, müzik</text>
    <rect x="200" y="58" width="12" height="20" rx="3" class="oks"/><text x="220" y="73">1–2 Mbps</text>
    <text x="190" y="106" class="end b">Görüntülü görüşme</text>
    <rect x="200" y="92" width="24" height="20" rx="3" class="oks"/><text x="232" y="107">2–4 Mbps</text>
    <text x="190" y="140" class="end b">Full HD yayın</text>
    <rect x="200" y="126" width="64" height="20" rx="3" class="ps"/><text x="272" y="141">5–8 Mbps</text>
    <text x="190" y="174" class="end b">Online oyun (oynarken)</text>
    <rect x="200" y="160" width="40" height="20" rx="3" class="ps"/><text x="248" y="175">3–5 Mbps · ping önemli</text>
    <text x="190" y="208" class="end b">4K yayın</text>
    <rect x="200" y="194" width="200" height="20" rx="3" class="p"/><text x="408" y="209">15–25 Mbps</text>
    <text x="190" y="242" class="end b">Oyun / dosya indirme</text>
    <rect x="200" y="228" width="400" height="20" rx="3" class="p"/><text x="608" y="243">ne kadar çok o kadar hızlı</text>
  </g>
  <rect x="20" y="272" width="680" height="140" rx="10" class="sf sb"/>
  <rect x="20" y="272" width="8" height="140" class="p"/>
  <text x="44" y="300" class="b">Örnek: 4 kişilik ev, akşam 21.00</text>
  <text x="44" y="326" class="sm t2">Salonda 4K yayın 25 + odada Full HD 8 + görüntülü görüşme 4</text>
  <text x="44" y="348" class="sm t2">+ oyun 5 + iki telefonda sosyal medya 2 × 3 = 48 Mbps</text>
  <text x="44" y="374" class="sm t2">Güvenlik payı: 48 × 1,25 = 60 Mbps</text>
  <text x="44" y="400" class="b p">Öneri: en az 75–100 Mbps paket</text>
</svg>`
  },
  sections: [
    {
      h: "Mbps nedir, hız neden \"aynı anda\" hesaplanır?",
      p: [
        "İnternet hızı saniyede aktarılan megabit sayısıyla, yani <strong>Mbps</strong> ile ölçülür. Paketinizin hızı, hattınızdan aynı anda geçebilecek toplam veri miktarının üst sınırıdır; bir boru çapı gibi düşünebilirsiniz. Evdeki tüm cihazlar bu boruyu paylaşır.",
        "Bu yüzden doğru soru \"en hızlı paket hangisi\" değil, \"en yoğun saatte evde aynı anda neler yapılıyor\" sorusudur. Gün içinde tek kişinin web gezdiği bir evde 10 Mbps bile yeterli gelebilir; ama akşam saatlerinde iki televizyonda yayın açıkken birinin görüntülü görüştüğü ve bir başkasının oyun güncellemesi indirdiği anda ihtiyaç hızla artar.",
        "Mbps ile dosya boyutlarında gördüğünüz MB arasında 8 kat fark vardır; bu birim karışıklığını ayrıntılı olarak [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri rehberinde]] anlattık. Bu sayfada ihtiyaç tarafına odaklanıyoruz."
      ]
    },
    {
      h: "Hangi etkinlik kaç Mbps ister?",
      p: [
        "Aşağıdaki değerler tek bir cihazdaki tek bir etkinlik için yaklaşık ihtiyaçlardır. Yayın platformları görüntü kalitesini hattın hızına göre otomatik ayarlar; hız yetmediğinde görüntü önce bulanıklaşır, sonra donmaya başlar."
      ],
      table: {
        head: ["Etkinlik", "Yaklaşık indirme ihtiyacı", "Yükleme (upload) ihtiyacı", "Kritik nokta"],
        rows: [
          ["Web, e-posta, mesajlaşma", "1–2 Mbps", "Düşük", "Gecikme"],
          ["Müzik dinleme", "0,3–1 Mbps", "Yok denecek kadar az", "—"],
          ["Sesli arama", "0,1–0,5 Mbps", "0,1–0,5 Mbps", "Gecikme ve kesinti"],
          ["HD görüntülü görüşme", "2–4 Mbps", "2–4 Mbps", "Upload hızı"],
          ["Full HD (1080p) yayın", "5–8 Mbps", "Düşük", "Süreklilik"],
          ["4K yayın", "15–25 Mbps", "Düşük", "Süreklilik"],
          ["Online oyun oynamak", "3–5 Mbps", "1–3 Mbps", "Ping ve jitter"],
          ["Canlı yayın yapmak (1080p)", "Düşük", "6–10 Mbps", "Upload hızı"],
          ["Oyun ve büyük dosya indirme", "Mümkün olan en yüksek", "—", "Toplam süre"]
        ],
        caption: "Değerler tipik aralıklardır; uygulamanın sıkıştırma yöntemine ve seçilen kaliteye göre değişir."
      }
    },
    {
      h: "Ev için kaç Mbps yeterli? Kişi sayısına göre seçim",
      p: [
        "Hesap yöntemi basittir: en yoğun saatte aynı anda yapılan etkinlikleri listeleyin, ihtiyaçlarını toplayın ve sonucu 1,25 ile çarpın. Bu pay, Wi-Fi kayıplarını, arka planda çalışan güncellemeleri ve servis sağlayıcının yoğun saatlerdeki dalgalanmasını karşılar."
      ],
      formula: "Gereken hız (Mbps) = Σ (aynı anda yapılan etkinliklerin ihtiyacı) × 1,25",
      table: {
        head: ["Hane profili", "Tipik eşzamanlı kullanım", "Önerilen paket"],
        rows: [
          ["1 kişi, web ve HD yayın", "1 yayın + telefon", "16–25 Mbps"],
          ["2 kişi, evden çalışma", "2 görüntülü görüşme + yayın", "35–50 Mbps"],
          ["3–4 kişi, aile", "4K yayın + HD yayın + görüşme + telefonlar", "75–100 Mbps"],
          ["5 kişi ve üzeri, oyuncu var", "Birden fazla 4K + oyun + büyük indirmeler", "100–200 Mbps"],
          ["Evden içerik üreten / sık büyük dosya yükleyen", "Canlı yayın, bulut yedekleme", "Yüksek upload'lı fiber paket"]
        ]
      },
      after: [
        "Örnek: Dört kişilik bir evde akşam saatinde salonda 4K yayın (25 Mbps), çocuk odasında Full HD yayın (8 Mbps), çalışma odasında görüntülü görüşme (4 Mbps), bir konsolda online oyun (5 Mbps) ve iki telefonda sosyal medya (2 × 3 Mbps) aynı anda kullanılsın. Toplam 48 Mbps'tir; %25 payla 60 Mbps eder. Bu ev için 75–100 Mbps bir paket rahat bir seçim olur. Kişi sayısı ve eşzamanlılık oranına göre aynı hesabı [[arac:bant-genisligi-hesapla|Bant Genişliği Hesaplama]] aracıyla yapabilirsiniz."
      ]
    },
    {
      h: "Online oyun için hız mı ping mi önemli?",
      p: [
        "Oyun sırasında aktarılan veri sanıldığından azdır; çoğu online oyun oynarken 3–5 Mbps'i geçmez. Oyuncunun hissettiği gecikmeyi belirleyen şey <strong>ping</strong>'dir: cihazınızdan sunucuya giden bir paketin geri dönme süresi, milisaniye (ms) cinsinden. 100 Mbps'lik bir hatta 80 ms ping, 25 Mbps'lik bir hatta 15 ms ping'den çok daha kötü oyun deneyimi verir.",
        "Ping'in yanında iki ölçü daha önemlidir. <strong>Jitter</strong>, ping değerinin ne kadar dalgalandığını gösterir; düşük ama sürekli değişen ping de takılma yaratır. <strong>Paket kaybı</strong> ise yola çıkıp hedefe ulaşamayan veridir; %1'in üzerindeki kayıp oyunda karakterin ışınlanması gibi belirtilerle kendini gösterir."
      ],
      table: {
        head: ["Ping", "Değerlendirme", "Oyunda etkisi"],
        rows: [
          ["0–20 ms", "Çok iyi", "Rekabetçi oyunlar için ideal"],
          ["20–50 ms", "İyi", "Çoğu oyunda fark edilmez"],
          ["50–100 ms", "Orta", "Hızlı oyunlarda gecikme hissedilir"],
          ["100 ms üzeri", "Zayıf", "Belirgin gecikme ve takılma"]
        ]
      },
      ul: [
        "Ping'i düşürmenin en etkili yolu kablolu (Ethernet) bağlantıdır; Wi-Fi ping'e birkaç milisaniye ve dalgalanma ekler.",
        "Oyun sırasında evde başka bir cihazın büyük dosya indirmesi ping'i yükseltebilir. Modeminizde varsa servis kalitesi (QoS) ayarıyla oyun konsoluna öncelik verebilirsiniz.",
        "Sunucunun bulunduğu bölge belirleyicidir; yurt dışındaki bir sunucuya bağlanırken fiziksel mesafe nedeniyle ping kaçınılmaz olarak artar."
      ]
    },
    {
      h: "Fiber, VDSL ve diğer altyapılar arasındaki fark",
      p: [
        "Ev internetinde paket hızı kadar evinize gelen altyapı da belirleyicidir. Aynı \"100 Mbps\" etiketli paket iki farklı altyapıda çok farklı sonuç verebilir."
      ],
      table: {
        head: ["Altyapı", "Taşıyıcı", "Hıza etki eden", "Tipik özellik"],
        rows: [
          ["Fiber (FTTH)", "Eve kadar fiber optik kablo", "Mesafeden neredeyse etkilenmez", "Yüksek hız, düşük ping, daha yüksek upload"],
          ["VDSL", "Son bölümde bakır telefon hattı", "Santrale ya da dağıtım kabinine uzaklık", "Kısa mesafede iyi, mesafe arttıkça hız düşer"],
          ["ADSL", "Bakır telefon hattı", "Mesafe ve hat kalitesi", "Düşük hız, düşük upload"],
          ["Mobil (4.5G / 5G) ve sabit kablosuz", "Baz istasyonu", "Sinyal gücü, baz istasyonu yoğunluğu", "Kurulumu kolay, dalgalı performans"]
        ]
      },
      after: [
        "VDSL'de hattınızın taşıyabileceği gerçek hız, modem arayüzündeki \"senkron hızı\" değerinde görünür. Paketiniz 100 Mbps olduğu hâlde senkron hızınız 40 Mbps ise sorun paket değil, hat mesafesi ya da hat kalitesidir; daha yüksek paket almak hızı artırmaz. Altyapı sorgulamasını adresinize göre servis sağlayıcınızın ya da e-Devlet'in altyapı sorgulama hizmetinden yapabilirsiniz."
      ]
    },
    {
      h: "Upload neden düşük, Wi-Fi neden paket hızını vermiyor?",
      p: [
        "Ev internet paketlerinin çoğu <strong>asimetriktir</strong>: indirme (download) hızı, yükleme (upload) hızından çok daha yüksektir. Bunun nedeni ev kullanıcılarının büyük çoğunlukla veri indirmesidir. Ancak görüntülü görüşme, bulut yedekleme ve canlı yayın upload hızına dayanır; evden çalışanlar için paket seçerken upload değerine de bakmak gerekir.",
        "Wi-Fi ile yapılan ölçümlerin paket hızından düşük çıkması da normaldir. 2,4 GHz bant duvarları daha iyi geçer ama daha yavaştır ve komşu ağlarla çakışmaya açıktır. 5 GHz bant daha hızlıdır ama menzili kısadır. Modemle cihaz arasındaki duvar sayısı, cihazın Wi-Fi standardı ve aynı anda bağlı cihaz sayısı ölçülen hızı doğrudan düşürür."
      ],
      ul: [
        "Modemi evin ortasına, yerden yüksek ve kapalı dolap dışına yerleştirin.",
        "Hız isteyen cihazları 5 GHz ağa, uzak odalardaki akıllı cihazları 2,4 GHz ağa bağlayın.",
        "Geniş evlerde tek güçlü modem yerine birbirine bağlı erişim noktaları (mesh) daha dengeli kapsama sağlar."
      ]
    },
    {
      h: "İndirme süresi nasıl hesaplanır?",
      p: [
        "Bir dosyanın kaç dakikada ineceğini bulmak için dosya boyutunu megabite çevirip hattın hızına bölmeniz yeterlidir. 1 GB yaklaşık 1.000 MB, 1 MB ise 8 megabittir."
      ],
      formula: "İndirme süresi (saniye) = dosya boyutu (MB) × 8 ÷ hız (Mbps)\nÖrnek: 10 GB = 10.000 MB → 10.000 × 8 ÷ 100 = 800 sn ≈ 13 dk 20 sn",
      table: {
        head: ["Dosya", "25 Mbps", "50 Mbps", "100 Mbps", "1.000 Mbps"],
        rows: [
          ["1 GB", "5 dk 20 sn", "2 dk 40 sn", "1 dk 20 sn", "8 sn"],
          ["10 GB", "53 dk 20 sn", "26 dk 40 sn", "13 dk 20 sn", "1 dk 20 sn"],
          ["50 GB oyun", "4 sa 27 dk", "2 sa 13 dk", "1 sa 7 dk", "6 dk 40 sn"]
        ],
        caption: "Teorik en iyi sürelerdir; sunucu hızı ve Wi-Fi nedeniyle gerçek süre genellikle %10–30 daha uzundur."
      },
      after: [
        "Kendi dosya boyutunuz ve hızınızla hesaplamak için [[arac:indirme-suresi-hesapla|İndirme Süresi Hesaplama]], hız birimini çevirmek için [[arac:mbps-mbs-cevir|Mbps MB/sn Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Doğru hız testi nasıl yapılır?",
      ol: [
        "Test edeceğiniz bilgisayarı modeme Ethernet kablosuyla bağlayın; Wi-Fi ölçümü hattın değil kablosuz bağlantının performansını gösterir.",
        "Evdeki diğer cihazlarda yayın, indirme ve bulut eşitlemesini durdurun.",
        "Testi günün farklı saatlerinde, örneğin sabah ve akşam 21.00 civarında en az üçer kez tekrarlayın.",
        "Sonuçta üç değeri not edin: indirme (download), yükleme (upload) ve ping. Yalnızca indirme hızına bakmak eksik bir resim verir.",
        "Kabloyla ölçülen hız paketinizin belirgin biçimde altındaysa ve VDSL kullanıyorsanız modem arayüzündeki senkron hızını kontrol edin; sorun devam ederse ölçüm kayıtlarınızla servis sağlayıcınıza başvurun."
      ]
    },
    {
      h: "Paket seçerken sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca indirme hızına bakmak:</strong> Evden çalışan ve görüntülü görüşme yapanlar için upload hızı en az indirme kadar önemlidir.",
        "<strong>Oyun için en hızlı paketi almak:</strong> Ping yüksekse hız artışı oyun deneyimini düzeltmez; önce kablolu bağlantı ve altyapıya bakın.",
        "<strong>VDSL'de gereksiz yüksek paket:</strong> Hat mesafesi senkron hızını sınırlıyorsa daha pahalı paket aynı hızı verir.",
        "<strong>Wi-Fi testiyle servis sağlayıcıyı suçlamak:</strong> Uzak odadan telefonla yapılan test modem yerleşimi sorununu gösterir, hat sorununu değil.",
        "<strong>Gelecekteki ihtiyacı unutmak:</strong> Yeni bir 4K televizyon, ev güvenlik kamerası ya da evden çalışma düzeni ihtiyacı kısa sürede artırabilir."
      ]
    }
  ],
  faq: [
    ["Ev için kaç Mbps internet yeterli?", "Bir ya da iki kişilik evlerde 25–50 Mbps genellikle yeterlidir. Üç dört kişilik ve aynı anda birden fazla yayın izlenen evlerde 75–100 Mbps, çok kullanıcılı ve oyun oynanan evlerde 100 Mbps ve üzeri daha rahat bir deneyim sunar."],
    ["Mbps ile MB/s arasındaki fark nedir?", "Mbps saniyede megabit, MB/s ise saniyede megabayt demektir. Bir bayt 8 bit olduğu için Mbps değerini 8'e bölerek MB/s'yi bulursunuz; örneğin 100 Mbps hat saniyede en fazla 12,5 MB indirir."],
    ["100 Mbps saniyede kaç MB indirir?", "100 Mbps teorik olarak saniyede 12,5 MB indirir. Sunucu hızı, Wi-Fi ve hat yoğunluğu nedeniyle indirme programlarında genellikle saniyede 9 ile 11 MB arasında değerler görmek normaldir."],
    ["4K yayın için kaç Mbps gerekir?", "4K yayın platformları kesintisiz bir yayın için genellikle 15–25 Mbps arası sabit bir hız önerir. Aynı anda başka cihazlar da internet kullanıyorsa toplam paket hızının bunun belirgin biçimde üzerinde olması gerekir."],
    ["Online oyun için kaç Mbps ve ping gerekir?", "Oyunu oynarken 3–5 Mbps hız çoğu zaman yeterlidir; asıl belirleyici ping değeridir. 50 milisaniyenin altı iyi, 20 milisaniyenin altı rekabetçi oyunlar için çok iyi kabul edilir ve kablolu bağlantı ping'i düşürür."],
    ["10 GB dosya kaç dakikada iner?", "10 GB yaklaşık 80.000 megabittir. 100 Mbps hatta bu dosya teorik olarak 800 saniyede, yani yaklaşık 13 dakika 20 saniyede iner; 50 Mbps hatta süre iki katına, yaklaşık 27 dakikaya çıkar."],
    ["Upload hızı neden düşüktür?", "Ev internet paketlerinin çoğu asimetrik tasarlanır, çünkü ev kullanıcıları veri yüklemekten çok indirir. Bakır hatlı VDSL ve ADSL'de bu fark daha belirgindir; fiber altyapılarda upload hızı genellikle daha yüksektir."],
    ["Wi-Fi neden paket hızından düşük ölçülür?", "Kablosuz bağlantıda duvarlar, mesafe, komşu ağlarla çakışma ve cihazın Wi-Fi standardı hızı düşürür. Hattın gerçek hızını görmek için testi modeme kabloyla bağlı bir bilgisayardan yapmak gerekir."],
    ["Fiber ile VDSL arasındaki fark nedir?", "Fiberde veri eve kadar ışıkla taşınır ve hız mesafeden neredeyse etkilenmez. VDSL'de son bölüm bakır telefon hattıdır; santrale ya da kabine olan mesafe arttıkça ulaşılabilen hız düşer ve ping biraz yükselir."]
  ],
  tools: ["bant-genisligi-hesapla", "indirme-suresi-hesapla", "mbps-mbs-cevir", "bit-bayt-cevir"],
  related: ["gb-kac-mb-veri-birimleri"],
  sources: [
    ["BTK – Bilgi Teknolojileri ve İletişim Kurumu", "https://www.btk.gov.tr/"]
  ]
};
