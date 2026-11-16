export default {
  slug: "sgk-hizmet-dokumu-nasil-okunur-eksik-gun-kodlari",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "SGK Hizmet Dökümü Nasıl Okunur? Eksik Gün Kodları ve Kontrol Listesi",
  pageTitle: "SGK Hizmet Dökümü Nasıl Okunur? Sütunlar ve Eksik Gün Kodları",
  description: "SGK hizmet dökümündeki dönem, prim günü, kazanç ve eksik gün sütunları ne demek? 01, 03, 06, 07, 13 kodları, 30 günden az prim ve hizmet tespit davası.",
  keywords: ["sgk hizmet dökümü nasıl okunur", "eksik gün kodları", "hizmet dökümü eksik gün", "e-devlet hizmet dökümü", "prim günü kontrolü", "hizmet dökümü 01 kodu", "eksik gün nedeni", "prime esas kazanç", "hizmet tespit davası"],
  lead: "SGK hizmet dökümü, her satırda bir ayı gösteren bir sigortalılık özetidir; okurken her ay için <strong>prim gün sayısı + eksik gün sayısının 30 etmesine</strong>, eksik gün varsa nedeninin doğru kodla yazılmasına ve kazanç tutarının gerçek brüt ücretinizle uyuşmasına bakarsınız. Belgeyi e-Devlet'te \"SGK Tescil ve Hizmet Dökümü\" hizmetinden barkodlu olarak alabilirsiniz. Bu yazıda sütunları tek tek açıklıyor, en sık görülen eksik gün kodlarının anlamını veriyor ve eksik bildirim fark ettiğinizde atmanız gereken adımları sıralıyoruz.",
  kisaCevap: [
    "Hizmet dökümü e-Devlet'te SGK Tescil ve Hizmet Dökümü hizmetinden barkodlu PDF olarak alınır; resmî işlemlerde geçerlidir.",
    "Tam çalışılan ayda prim günü 30'dur; 30'dan az gün varsa aynı satırda eksik gün sayısı ve nedeni yazmalıdır.",
    "En sık kodlar: 01 istirahat (rapor), 03 disiplin cezası, 06 kısmi süreli çalışma, 07 puantaj kayıtları, 13 diğer, 15 devamsızlık, 21 diğer ücretsiz izin.",
    "Kazanç sütunu prime esas kazançtır; tavanı aşan kısım ve bazı istisna ödemeler bildirilmediği için brüt maaştan farklı görünebilir.",
    "Eksik ya da hiç bildirilmemiş çalışma için önce SGK'ya başvurulur; hizmet tespit davası hizmetin geçtiği yılın sonundan itibaren 5 yıl içinde açılır.",
    "Emeklilik hesabında prim günleri toplanır: SGK usulünde ay 30, yıl 360 gün sayılır."
  ],
  figure: {
    alt: "Hizmet dökümünden örnek üç satır: Ocak 30 gün tam, Şubat 26 gün ve 4 gün 01 rapor kodu, Mart 18 gün ve 12 gün 06 kısmi süreli kodu; her satırda prim günü ile eksik günün toplamı 30.",
    caption: "Her satırda prim günü ile eksik gün toplamı 30 olmalıdır. Şubat'taki 4 günlük rapor 01, Mart'taki kısmi süreli çalışma 06 koduyla açıklanmıştır. Toplam: 30 + 26 + 18 = 74 prim günü.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hizmet dökümünde bir satır nasıl okunur?</text>
  <rect x="20" y="52" width="680" height="40" rx="6" class="p"/>
  <g class="sm b sf">
    <text x="40" y="77">Dönem</text>
    <text x="150" y="77">Belge türü</text>
    <text x="270" y="77">Prim günü</text>
    <text x="380" y="77">Kazanç (PEK)</text>
    <text x="510" y="77">Eksik gün</text>
    <text x="610" y="77">Neden</text>
  </g>
  <rect x="20" y="96" width="680" height="40" rx="6" class="sf sb"/>
  <g class="sm">
    <text x="40" y="121">2026/01</text><text x="150" y="121">01</text><text x="270" y="121" class="b">30</text>
    <text x="380" y="121">40.000,00</text><text x="510" y="121">0</text><text x="610" y="121">—</text>
  </g>
  <rect x="20" y="140" width="680" height="40" rx="6" class="ps"/>
  <g class="sm">
    <text x="40" y="165">2026/02</text><text x="150" y="165">01</text><text x="270" y="165" class="b">26</text>
    <text x="380" y="165">34.666,67</text><text x="510" y="165" class="b">4</text><text x="610" y="165" class="b">01 rapor</text>
  </g>
  <rect x="20" y="184" width="680" height="40" rx="6" class="sf sb"/>
  <g class="sm">
    <text x="40" y="209">2026/03</text><text x="150" y="209">01</text><text x="270" y="209" class="b">18</text>
    <text x="380" y="209">24.000,00</text><text x="510" y="209" class="b">12</text><text x="610" y="209" class="b">06 kısmi</text>
  </g>
  <rect x="20" y="244" width="330" height="140" rx="10" class="oks"/>
  <text x="36" y="270" class="b">Kontrol 1: gün toplamı</text>
  <text x="36" y="296" class="sm">Prim günü + eksik gün = 30</text>
  <text x="36" y="318" class="sm">26 + 4 = 30 · 18 + 12 = 30 (doğru)</text>
  <text x="36" y="350" class="b">Kontrol 2: neden kodu</text>
  <text x="36" y="372" class="sm">Eksik gün varsa kod boş kalamaz</text>
  <rect x="370" y="244" width="330" height="140" rx="10" class="sf sb"/>
  <text x="386" y="270" class="b">Kontrol 3: kazanç</text>
  <text x="386" y="296" class="sm">Örnek brüt 40.000 TL</text>
  <text x="386" y="318" class="sm">26 gün: 40.000 ÷ 30 × 26 = 34.666,67</text>
  <text x="386" y="350" class="b">Dönem toplamı</text>
  <text x="386" y="372" class="sm">30 + 26 + 18 = 74 prim günü</text>
</svg>`
  },
  sections: [
    {
      h: "Hizmet dökümü nedir, e-Devlet'ten nasıl alınır?",
      p: [
        "Hizmet dökümü, işverenlerinizin SGK'ya ay ay verdiği muhtasar ve prim hizmet beyannamelerinin özetidir. Hangi işyerinde, hangi ayda, kaç gün ve hangi kazanç üzerinden sigortalı gösterildiğinizi bu belgeden görürsünüz. Emeklilik hesabı, işsizlik ödeneği başvurusu, kıdem tazminatı uyuşmazlığı ve kredi başvuruları gibi pek çok işlemde temel belgedir.",
        "Belgeyi almak için e-Devlet'e giriş yapın, arama kutusuna \"SGK Tescil ve Hizmet Dökümü\" yazın ve hizmeti açın. Ekranda tüm dökümü, yıl bazında özeti ya da barkodlu belgeyi seçebilirsiniz. Barkodlu PDF, başka bir kuruma verildiğinde doğrulanabilir ve resmî belge yerine geçer. 4A (işçi), 4B (Bağ-Kur) ve 4C (memur) hizmetleri ayrı bölümlerde gösterilebilir."
      ]
    },
    {
      h: "Hizmet dökümündeki sütunlar ne anlama gelir?",
      p: [
        "Sütun adları ekranın ya da belgenin türüne göre küçük farklar gösterebilir, ama her satırda bulunan temel bilgiler aynıdır. Aşağıdaki tablo, 4A hizmet dökümünde en sık karşılaşacağınız alanları açıklar."
      ],
      table: {
        head: ["Sütun", "Ne gösterir?", "Neye dikkat edilmeli?"],
        rows: [
          ["Dönem (yıl/ay)", "Bildirimin ait olduğu ay", "Çalıştığınız her ay listede olmalı; boş ay sigortasız çalışma işareti olabilir"],
          ["İşyeri sicil numarası", "Bildirimi yapan işyeri", "Taşeron ya da şube değişikliklerinde farklı sicil görünebilir"],
          ["Belge türü", "Bildirimin türü; 01 tüm sigorta kollarına tabi çalışmadır", "Emekli çalışanlarda sosyal güvenlik destek primi belge türü görülür"],
          ["Kanun numarası", "Yararlanılan teşvik ya da indirim", "Teşvik sizin haklarınızı azaltmaz; işverenin prim indirimidir"],
          ["Prim gün sayısı", "O ay için bildirilen gün (en fazla 30)", "Tam ayda 30 olmalıdır"],
          ["Kazanç (prime esas kazanç)", "Prim hesaplanan brüt tutar", "Gerçek brüt ücretinizle karşılaştırın"],
          ["Eksik gün sayısı ve nedeni", "30'dan eksik günlerin açıklaması", "Kodun gerçek durumla uyuşup uyuşmadığına bakın"],
          ["Giriş ve çıkış tarihi", "İşe başlama ve ayrılma günleri", "Çıkış koduyla birlikte işsizlik ödeneğini etkiler"]
        ]
      },
      after: [
        "Prim günlerinin toplanması ve 30/360 kuralı [[bilgi:sgk-prim-gunu-nasil-hesaplanir|SGK prim günü nasıl hesaplanır]] makalesinde ayrıntılı anlatılır. Bu yazı ise satırların doğru olup olmadığını denetlemeye odaklanır."
      ]
    },
    {
      h: "Eksik gün kodları neyi ifade eder?",
      p: [
        "Bir ayda 30 günden az bildirim yapılırsa işveren nedenini bir kodla belirtmek zorundadır. Kodlar SGK'nın e-Bildirge sisteminde tanımlıdır ve zaman zaman güncellenir; dökümünüzde listede olmayan bir kod görürseniz SGK'dan teyit edin."
      ],
      table: {
        head: ["Kod", "Anlamı", "Tipik durum"],
        rows: [
          ["01", "İstirahat (rapor)", "Hastalık ya da iş kazası raporu; geçici iş göremezlik ödeneği SGK'dan alınır"],
          ["03", "Disiplin cezası", "Ücret kesme cezası nedeniyle bildirilmeyen gün"],
          ["04 / 05", "Gözaltı / tutukluluk", "Çalışmanın mümkün olmadığı adli süreç"],
          ["06", "Kısmi süreli çalışma", "Part-time sözleşme; ayda 30'dan az gün normaldir"],
          ["07", "Puantaj kayıtları", "Kısmi süreli veya çağrı üzerine çalışmada gerçek çalışılan güne göre bildirim"],
          ["12", "Birden fazla neden", "Aynı ayda rapor ve ücretsiz izin gibi iki neden"],
          ["13", "Diğer", "Başka koda uymayan durumlar; sık görülüyorsa gerekçesini sorun"],
          ["15", "Devamsızlık", "İşçinin mazeretsiz işe gelmediği günler"],
          ["16", "Fesih tarihinde çalışılmaması", "Ayrılış ayında ayrılıştan sonraki günler"],
          ["18", "Kısa çalışma ödeneği", "İŞKUR'un kısa çalışma ödeneği ödediği dönem"],
          ["19 / 20 / 21", "Ücretsiz doğum izni / ücretsiz yol izni / diğer ücretsiz izin", "İşçinin talebiyle kullanılan ücretsiz izin"],
          ["23", "Yarım çalışma ödeneği", "Doğum sonrası yarım çalışma döneminde"]
        ],
        caption: "Eksik gün kodlarının yaygın kullanılanları. Ayrılış ayında 16, ayın bir bölümünde işe girişte ise genellikle eksik gün bildirilmez; ay kısmi sayılır."
      },
      after: [
        "Ücretsiz izinlerin sigortalılığa etkisi için [[bilgi:ucretsiz-izin-nedir-sgk-primi-yatar-mi|ücretsiz izin ve SGK primi]] yazısına bakabilirsiniz. Tam zamanlı çalıştığınız hâlde her ay 06 ya da 07 kodu görüyorsanız bu, gerçeğe aykırı eksik bildirim işareti olabilir."
      ]
    },
    {
      h: "Kazanç tutarı neden brüt maaştan farklı görünür?",
      p: [
        "Kazanç sütunu prime esas kazancı (PEK) gösterir. Bu tutar çoğu zaman brüt ücrete eşittir ama dört durumda farklılaşır. Birincisi, ay içinde eksik gün varsa kazanç orantılı düşer: brüt 40.000 TL'lik bir ücrette 26 günlük bildirim 40.000 ÷ 30 × 26 = 34.666,67 TL olur.",
        "İkincisi, prim ve ikramiye gibi ek ödemeler ödendiği ayın kazancına eklenir; o ay kazanç brüt maaştan yüksek görünebilir. Üçüncüsü, prime esas kazancın bir üst sınırı (tavan) vardır; tavanı aşan kısım bildirilmez. Dördüncüsü, belirli sınırlar içindeki yemek, çocuk ve aile yardımı gibi bazı ödemeler prime esas kazanca dahil edilmez.",
        "Kazanç tutarı asgari ücretin altında görünüyorsa ve tam ay çalıştıysanız, ücretinizin bir kısmının elden ödenip bildirilmemiş olması ihtimali vardır. Bu durum emekli aylığınızı, işsizlik ödeneğinizi ve rapor parası tutarlarınızı doğrudan düşürür; brüt ücretinizi [[arac:brut-net-maas|Brüt Net Maaş Hesaplama]] aracıyla karşılaştırabilirsiniz."
      ]
    },
    {
      h: "Kontrol listesi: hizmet dökümünüzü adım adım denetleyin",
      ol: [
        "Barkodlu dökümü indirin ve çalıştığınız tüm işyerlerini, giriş-çıkış tarihleriyle birlikte bir kâğıda yazın.",
        "Her ayın listede olup olmadığına bakın; boş ay, o dönemde bildirim yapılmadığını gösterir.",
        "Her satırda prim günü ile eksik günün toplamının 30 ettiğini kontrol edin.",
        "Eksik gün kodlarının gerçek durumla uyuştuğuna bakın: rapor almadıysanız 01, ücretsiz izin istemediyseniz 21 olmamalıdır.",
        "Kazanç sütununu bordrolarınızla karşılaştırın; tam ayda kazanç bordrodaki brütten düşükse not edin.",
        "Toplam prim gününüzü [[arac:sgk-gun-hesapla|SGK Gün Hesaplama]] aracıyla çalışma dönemlerinizden ayrıca hesaplayıp dökümdeki toplamla karşılaştırın.",
        "İki tarih arasındaki gün ya da ay sayısını hızlıca görmek için [[arac:tarih-farki|Tarih Farkı Hesapla]] ve [[arac:ay-farki-hesapla|Ay Farkı Hesapla]] araçlarını kullanın."
      ]
    },
    {
      h: "Ayda 30 günden az prim yatırılmışsa ne yapılmalı?",
      p: [
        "Önce nedeni doğru mu, ona bakın. Rapor, ücretsiz izin ya da kısmi süreli sözleşme gibi gerçek bir neden varsa eksik gün yasaldır ve düzeltilecek bir şey yoktur. Tam zamanlı çalıştığınız hâlde eksik gün gösterilmişse önce işverenden düzeltme istemek en hızlı yoldur; işveren geriye dönük ek bildirge vererek eksik günleri tamamlayabilir.",
        "İşveren düzeltmezse SGK il ya da sosyal güvenlik merkezine yazılı başvuru yapabilir, şikâyetinizi ALO 170 hattı ya da CİMER üzerinden iletebilirsiniz. SGK denetim elemanları işyerinde inceleme yaparak eksik bildirimi tespit edebilir. Bu sırada bordro, banka dökümü, giriş kartı kayıtları ve iş yazışmaları gibi çalışmayı kanıtlayan belgeleri saklayın.",
        "Kendi isteğinizle eksik kalan günleri, örneğin ücretsiz izin dönemini, isteğe bağlı sigorta ya da borçlanma yollarıyla tamamlamak mümkündür; şartlar ve tutarlar her yıl değiştiği için SGK'dan güncel bilgi alın."
      ]
    },
    {
      h: "Hizmet tespit davası ne zaman açılır?",
      p: [
        "İşveren çalışmanızı hiç bildirmemiş ya da eksik bildirmişse ve idari yoldan sonuç alamazsanız iş mahkemesinde hizmet tespit davası açabilirsiniz. 5510 sayılı Kanun'a göre bu dava, hizmetin geçtiği yılın sonundan başlayarak <strong>5 yıl</strong> içinde açılmalıdır. Örneğin 2026 yılında bildirilmeyen bir çalışma için dava en geç 31 Aralık 2031'e kadar açılabilir.",
        "Hizmet tespit davaları, işçi alacağı davalarının aksine zorunlu arabuluculuk şartına bağlı değildir; doğrudan dava açılabilir. Dava SGK'ya da ihbar edilir ve mahkeme kayıt, tanık ve belgeleri birlikte değerlendirir. Ücret ve tazminat alacakları için ise önce arabuluculuk gerekir; ayrıntılar [[bilgi:isci-alacaklari-zamanasimi-ve-zorunlu-arabuluculuk|zamanaşımı ve arabuluculuk]] yazısında."
      ]
    },
    {
      h: "Toplam prim günü emeklilik hesabında nasıl kullanılır?",
      p: [
        "Emeklilik için gereken prim günü, sigortalılık başlangıcınıza ve statünüze göre değişir; çoğu durumda 7.200 gün hedefi konuşulur, ama ilk işe giriş tarihine göre 5.000 ile 9.000 gün arasında farklı eşikler vardır. Hizmet dökümünün en altındaki toplam gün, tüm statülerdeki günlerin toplamıdır; borçlanma günleri de ödeme yapıldıktan sonra bu toplama eklenir.",
        "Prim günü ile hizmet süresi aynı şey değildir: hizmet süresi işe giriş ile çıkış arasındaki takvim süresidir, prim günü ise fiilen bildirilen gündür. Kısmi süreli çalışmada iki yıllık hizmet süresi yalnızca birkaç yüz prim gününe karşılık gelebilir. Yaş ve gün şartlarınızı birlikte görmek için Emeklilik Yaşı Hesapla aracını kullanabilirsiniz; ikramiye hesabı için [[bilgi:emekli-ikramiyesi-nasil-hesaplanir|emekli ikramiyesi]] yazısı yol gösterir."
      ]
    }
  ],
  faq: [
    ["SGK hizmet dökümü e-Devlet'ten nasıl alınır?", "e-Devlet'e giriş yapıp arama kutusuna SGK Tescil ve Hizmet Dökümü yazın, hizmeti açın ve barkodlu belge seçeneğini kullanın. Barkodlu PDF diğer kurumlarca doğrulanabilir ve resmî belge olarak kabul edilir."],
    ["Hizmet dökümündeki sütunlar ne anlama gelir?", "Dönem bildirimin ait olduğu ayı, prim gün sayısı o ay bildirilen günü, kazanç prime esas brüt tutarı, eksik gün ve nedeni ise 30 günden eksik günlerin açıklamasını gösterir. İşyeri sicil numarası bildirimi yapan işyerini belirtir."],
    ["Eksik gün kodları (01, 03, 06, 13 vb.) neyi ifade eder?", "01 istirahat yani rapor, 03 disiplin cezası, 06 kısmi süreli çalışma, 07 puantaj kayıtları, 13 diğer nedenler, 15 devamsızlık ve 21 diğer ücretsiz izin anlamına gelir. Kod gerçek durumla uyuşmuyorsa işverenden düzeltme istenmelidir."],
    ["Ayda 30 günden az prim yatırılmışsa ne yapılmalı?", "Önce eksik gün nedeninin gerçek olup olmadığına bakın. Haksız bir eksik bildirim varsa işverenden düzeltme isteyin; sonuç alamazsanız SGK'ya yazılı başvuru yapın, ALO 170 ya da CİMER'e şikâyette bulunun ve çalışmayı kanıtlayan belgeleri saklayın."],
    ["Prim günü ile hizmet süresi arasındaki fark nedir?", "Hizmet süresi işe giriş ve çıkış arasındaki takvim süresidir; prim günü ise SGK'ya fiilen bildirilen gün sayısıdır. Kısmi süreli çalışma, rapor ve ücretsiz izin nedeniyle prim günü hizmet süresinden az olabilir."],
    ["Eksik bildirilen günler için nereye başvurulur?", "İlk muhatap işverendir ve geriye dönük ek bildirge verebilir. İşveren düzeltmezse bağlı olduğunuz SGK il müdürlüğüne ya da sosyal güvenlik merkezine yazılı başvuru yapılır; denetim sonucunda eksik bildirim tespit edilebilir."],
    ["Hizmet tespit davası ne zaman açılır?", "Çalışma hiç ya da eksik bildirilmişse ve idari yoldan sonuç alınamamışsa açılır. Dava, hizmetin geçtiği yılın sonundan itibaren 5 yıl içinde iş mahkemesinde açılmalıdır ve zorunlu arabuluculuk şartına bağlı değildir."],
    ["Toplam prim günü emeklilik hesabında nasıl kullanılır?", "Dökümdeki toplam gün, emeklilik için gereken prim günü şartıyla karşılaştırılır. Gereken gün sayısı ilk işe giriş tarihine göre değişir; SGK usulünde ay 30, yıl 360 gün sayılır ve borçlanma günleri ödeme sonrası eklenir."],
    ["Hizmet dökümünde kazanç tutarı neden brüt maaştan farklı görünebilir?", "Eksik günlerde kazanç orantılı düşer, prim ve ikramiye ödendiği ayın kazancını artırır, tavanı aşan kısım bildirilmez ve belirli sınırlardaki yemek, aile ve çocuk yardımları prime esas kazanca girmez. Tam ayda asgari ücretin altında bir tutar ise eksik bildirim işareti olabilir."]
  ],
  tools: ["sgk-gun-hesapla", "emeklilik-yasi-hesapla", "tarih-farki", "ay-farki-hesapla", "brut-net-maas"],
  related: ["sgk-prim-gunu-nasil-hesaplanir", "ucretsiz-izin-nedir-sgk-primi-yatar-mi", "emekli-ikramiyesi-nasil-hesaplanir", "isci-alacaklari-zamanasimi-ve-zorunlu-arabuluculuk"],
  sources: [
    ["Sosyal Güvenlik Kurumu", "https://www.sgk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 5510 sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu", "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5510.pdf"],
    ["e-Devlet Kapısı", "https://www.turkiye.gov.tr/"]
  ],
  uyari: "genel bilgi niteliğindedir; kişisel sigortalılık durumunuz için SGK'ya ya da bir sosyal güvenlik uzmanına danışın"
};
