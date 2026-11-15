export default {
  slug: "ups-aku-kac-saat-gider",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "UPS ve Akü Kaç Saat Gider? Çalışma Süresi, Ah ve Wh Hesabı",
  pageTitle: "UPS Kaç Saat Gider? Akü Çalışma Süresi, Ah ve Wh Hesabı",
  description: "UPS süresi = akü Ah × V × adet × kullanılabilir oran × verim ÷ yük (W). 2 × 12 V 7 Ah aküyle 40 W modem ve kamera yaklaşık 2,8 saat. 100 Ah akü, VA-W farkı.",
  keywords: ["ups kaç saat gider", "akü kaç saat dayanır", "ups çalışma süresi hesaplama", "100 ah akü kaç watt", "mah wh çevirme", "modem için ups", "va watt farkı", "kombi için ups"],
  lead: "UPS'in ya da akünün kaç saat gideceği, <strong>aküdeki enerjinin (Ah × V = Wh) kullanılabilir kısmının, invertör verimi düşüldükten sonra bağlı yükün gücüne bölünmesiyle</strong> bulunur. Örneğin iki adet 12 V 7 Ah akülü bir UPS 168 Wh enerji taşır; %80'i kullanılabilir ve verim %85 kabul edilirse 40 W'lık modem ve kamera sistemini yaklaşık 2 saat 50 dakika besler. Bu sayfada Ah, Wh, VA ve watt kavramlarını, 100 Ah akü hesabını, gerçek sürenin neden daha kısa çıktığını ve akü ömrünü uzatma yollarını bulacaksınız.",
  kisaCevap: [
    "Akü enerjisi (Wh) = kapasite (Ah) × gerilim (V) × akü sayısı.",
    "Çalışma süresi (saat) = akü enerjisi × kullanılabilir oran × invertör verimi ÷ yük (W).",
    "12 V 100 Ah akü 1.200 Wh enerji taşır; kurşun-asitte ömür için genellikle yarısı kullanılır, 100 W yükü yaklaşık 5–5,5 saat besler.",
    "VA görünür güçtür; UPS'in verebileceği gerçek güç W = VA × güç faktörüdür, 1.000 VA bir UPS çoğu zaman 600–900 W verir.",
    "mAh tek başına yetmez; Wh = mAh × V ÷ 1.000 ile gerilim de hesaba katılmalıdır.",
    "Yüksek akımda çekilen kapasite azalır, akü yaşlandıkça ve sıcaklık arttıkça süre kısalır; hesap bir üst sınır tahminidir."
  ],
  figure: {
    alt: "Akü enerjisinin yüke ulaşana kadar azalması: 2 × 12 V 7 Ah akü 168 Wh, kullanılabilir yüzde 80 ile 134 Wh, invertör verimi yüzde 85 ile 114 Wh; 40 watt yükte yaklaşık 2,86 saat yani 2 saat 51 dakika.",
    caption: "Etikette yazan enerjinin tamamı yüke ulaşmaz: akünün tamamen boşaltılmaması ve invertörün dönüşüm kaybı süreyi kısaltır. Örnekteki değerler küçük ofis ve ev tipi UPS'ler için tipiktir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aküdeki enerji yüke ne kadar ulaşır?</text>
  <text x="30" y="76" class="b">Akü</text><text x="30" y="96" class="sm mu">2 × 12 V × 7 Ah</text>
  <rect x="190" y="58" width="480" height="44" rx="6" class="ps"/>
  <text x="430" y="86" class="b mid">168 Wh</text>
  <text x="30" y="146" class="b">Kullanılabilir</text><text x="30" y="166" class="sm mu">%80 boşaltma</text>
  <rect x="190" y="128" width="384" height="44" rx="6" class="ps"/>
  <rect x="574" y="128" width="96" height="44" rx="6" class="sf sb dash"/>
  <text x="382" y="156" class="b mid">134,4 Wh</text>
  <text x="622" y="156" class="sm mid mu">yedek</text>
  <text x="30" y="216" class="b">Yüke ulaşan</text><text x="30" y="236" class="sm mu">%85 invertör verimi</text>
  <rect x="190" y="198" width="326" height="44" rx="6" class="p"/>
  <rect x="516" y="198" width="58" height="44" rx="6" class="dgs"/>
  <text x="353" y="226" class="b mid sf">114,2 Wh</text>
  <text x="545" y="226" class="sm mid">ısı</text>
  <rect x="30" y="270" width="660" height="110" rx="10" class="sf sb"/>
  <text x="50" y="300" class="b">Yük: modem 12 W + ONT 8 W + 2 kamera 8 W + kayıt cihazı 12 W = 40 W</text>
  <text x="50" y="330" class="sm">Süre = 114,2 Wh ÷ 40 W = 2,86 saat</text>
  <text x="50" y="362" class="lg b ok">≈ 2 saat 51 dakika</text>
  <text x="680" y="362" class="sm end mu">gerçek süre genellikle daha kısadır</text>
</svg>`
  },
  sections: [
    {
      h: "UPS nedir, neden süre hesabı gerekir?",
      p: [
        "UPS (kesintisiz güç kaynağı), şebeke elektriği kesildiğinde içindeki aküden aldığı doğru akımı, invertör aracılığıyla 230 V alternatif akıma çevirerek bağlı cihazları beslemeye devam eden cihazdır. Ev ve küçük ofislerde modem, fiber terminali (ONT), güvenlik kamerası kayıt cihazı, kombi ve bilgisayar için kullanılır.",
        "UPS'in ne kadar dayanacağı, içindeki akünün enerjisine ve bağladığınız yükün gücüne bağlıdır. Aynı UPS yalnızca modemi beslerken saatlerce, masaüstü bilgisayar ve monitörü beslerken birkaç dakika gidebilir. Bu yüzden UPS seçerken \"kaç VA\" sorusundan önce \"kaç watt yükü, kaç dakika\" sorusunu cevaplamak gerekir."
      ]
    },
    {
      h: "Akü kapasitesi watt-saate nasıl çevrilir?",
      p: [
        "Akülerin üzerinde kapasite amper-saat (Ah) olarak yazar. Ah tek başına enerji değildir; aynı 7 Ah değeri 12 V'luk bir aküde ve 3,7 V'luk bir lityum hücrede çok farklı enerji demektir. Enerjiyi karşılaştırmak için gerilimle çarpıp watt-saate (Wh) çevirmek gerekir."
      ],
      formula: "Enerji (Wh) = kapasite (Ah) × gerilim (V)\nmAh'den Wh: Wh = mAh × V ÷ 1.000\nAkü grubu: Wh = Ah × V × akü sayısı",
      table: {
        head: ["Akü / pil", "Kapasite", "Gerilim", "Enerji"],
        rows: [
          ["Küçük UPS aküsü", "7 Ah", "12 V", "84 Wh"],
          ["İki aküli UPS grubu", "2 × 9 Ah", "12 V", "216 Wh"],
          ["Otomobil aküsü (örnek)", "60 Ah", "12 V", "720 Wh"],
          ["Jel/AGM derin deşarj akü", "100 Ah", "12 V", "1.200 Wh"],
          ["Powerbank", "10.000 mAh", "3,7 V (hücre)", "37 Wh"],
          ["Dizüstü bataryası (örnek)", "4.000 mAh", "11,4 V", "45,6 Wh"]
        ],
        caption: "Powerbank kapasitesi genellikle 3,7 V'luk hücre gerilimiyle verilir; USB çıkışında dönüşüm kaybı nedeniyle kullanılabilir enerji daha azdır."
      },
      after: [
        "Bu nedenle \"mAh değeri neden tek başına yeterli değil\" sorusunun cevabı gerilimdir: 20.000 mAh'lik bir powerbank (yaklaşık 74 Wh) ile 7 Ah'lik bir UPS aküsü (84 Wh) aslında benzer enerji taşır. Dönüşümleri [[arac:mah-wh-cevir|mAh Wh Çevirici]] ile yapabilirsiniz; powerbank özelinde hesap için [[bilgi:powerbank-kac-kez-sarj-eder|powerbank kaç kez şarj eder]] yazısına bakın."
      ]
    },
    {
      h: "UPS çalışma süresi formülü ve çözümlü örnek",
      formula: "Süre (saat) = Ah × V × akü sayısı × kullanılabilir oran × invertör verimi ÷ yük (W)\nDakika = saat × 60",
      p: [
        "Formüldeki iki katsayı gerçekçilik için gereklidir. <strong>Kullanılabilir oran</strong> (deşarj derinliği), akünün ne kadarının boşaltılacağını gösterir; UPS'ler aküyü korumak için belli bir gerilimde kapanır, ayrıca tam boşaltma kurşun-asit akünün ömrünü kısaltır. <strong>İnvertör verimi</strong>, doğru akımın alternatif akıma çevrilirken ısıya giden kısmını hesaba katar; küçük UPS'lerde %80–90 civarındadır."
      ],
      ol: [
        "<strong>Yükü toplayın:</strong> Modem 12 W, fiber terminali 8 W, iki IP kamera 8 W, kayıt cihazı 12 W: toplam 40 W.",
        "<strong>Akü enerjisi:</strong> UPS'te 2 adet 12 V 7 Ah akü var: 7 × 12 × 2 = 168 Wh.",
        "<strong>Kullanılabilir enerji:</strong> %80 kabul edilirse 168 × 0,80 = 134,4 Wh.",
        "<strong>Yüke ulaşan enerji:</strong> %85 verimle 134,4 × 0,85 = 114,2 Wh.",
        "<strong>Süre:</strong> 114,2 ÷ 40 = 2,86 saat, yani yaklaşık 2 saat 51 dakika."
      ],
      after: [
        "Aynı UPS'e 250 W çeken bir masaüstü bilgisayar ve monitör bağlandığında hesap 114,2 ÷ 250 = 0,46 saat, yani yaklaşık 27 dakika verir. Ancak yüksek akımda akünün verebildiği kapasite düştüğü için gerçekte bu süre belirgin biçimde kısalır; bilgisayar UPS'lerinin amacı da zaten saatlerce çalışmak değil, işleri kaydedip güvenle kapatacak zamanı sağlamaktır. Kendi değerlerinizle [[arac:ups-calisma-suresi-hesapla|UPS Çalışma Süresi Hesaplama]] aracını kullanabilirsiniz; araç UPS'in güç sınırını ve yük oranını da gösterir."
      ]
    },
    {
      h: "100 Ah akü kaç saat dayanır, kaç watt verir?",
      p: [
        "12 V 100 Ah bir akü teorik olarak 1.200 Wh enerji taşır. Bu, \"1.200 W'lık cihazı 1 saat çalıştırır\" demek değildir; kullanılabilir oran, verim ve akım etkisi hesaba katılmalıdır. Kurşun-asit (jel, AGM) akülerde uzun ömür için genellikle %50 deşarj derinliği önerilir; lityum demir fosfat (LiFePO4) akülerde %80–90 kullanılabilir."
      ],
      table: {
        head: ["Yük", "Kurşun-asit, %50 DoD, %90 verim", "LiFePO4, %90 DoD, %90 verim"],
        rows: [
          ["Modem ve kamera (40 W)", "13,5 saat", "24,3 saat"],
          ["Kombi (120 W)", "4,5 saat", "8,1 saat"],
          ["Buzdolabı ortalaması (150 W)", "3,6 saat", "6,5 saat"],
          ["Televizyon ve uydu alıcısı (200 W)", "2,7 saat", "4,9 saat"],
          ["Masaüstü bilgisayar (300 W)", "1,8 saat", "3,2 saat"]
        ],
        caption: "Hesap: 1.200 Wh × DoD × 0,90 ÷ yük. Değerler örnektir; yüksek yüklerde kurşun-asit akünün verdiği kapasite düşeceği için gerçek süre daha kısadır."
      },
      after: [
        "Akünün belirli bir yükü kaç saat besleyeceğini deşarj derinliği ve invertör verimiyle birlikte [[arac:aku-kullanim-suresi-hesapla|Akü Kullanım Süresi Hesaplama]] aracında hesaplayabilirsiniz."
      ]
    },
    {
      h: "VA ile watt arasındaki fark nedir?",
      p: [
        "UPS'lerin gücü çoğunlukla VA (volt-amper) ile belirtilir. VA görünür güçtür; cihazın gerçekte tükettiği güç ise watt (W) ile ölçülür ve aradaki oran güç faktörüdür. UPS'in çıkış güç faktörü teknik föyde yazar; eski ve ekonomik modellerde 0,6 civarında, güncel modellerde 0,8–1 arasında olabilir."
      ],
      formula: "Gerçek güç (W) = görünür güç (VA) × güç faktörü\nÖrnek: 1.000 VA × 0,6 = 600 W · 1.000 VA × 0,9 = 900 W",
      after: [
        "UPS seçerken bağlı yükün toplam wattı, UPS'in watt sınırının yaklaşık %70–80'ini aşmamalıdır; böylece açılıştaki ani akımlar ve ileride eklenecek cihazlar için pay kalır. VA'nın akü süresiyle doğrudan ilgisi yoktur: büyük VA değeri yalnızca UPS'in aynı anda verebileceği gücü gösterir, süreyi ise akü enerjisi belirler. kVA ile kW dönüşümü için [[arac:kva-kw-cevir|kVA kW Çevirici]] ve [[bilgi:kva-kw-farki-jenerator-secimi|kVA ile kW farkı]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Modem, kamera ve kombi için hangi UPS yeterli?",
      table: {
        head: ["Kullanım", "Tipik yük", "Dikkat edilecek nokta"],
        rows: [
          ["Modem + fiber terminali", "10–25 W", "Küçük güçlü UPS ya da 12 V DC mini UPS yeterli olabilir"],
          ["Güvenlik kamera sistemi", "20–80 W", "Kayıt cihazı ve PoE anahtarı yükünü de toplayın"],
          ["Kombi", "80–150 W", "Kombi üreticileri genellikle tam sinüs çıkışlı UPS ister; topraklama şart"],
          ["Masaüstü bilgisayar + monitör", "150–400 W", "Amaç güvenli kapanma; 5–15 dakika genellikle yeterli"],
          ["Küçük sunucu / NAS", "40–150 W", "Otomatik kapanma için UPS ile iletişim (USB) faydalı"]
        ],
        caption: "Yük değerleri örnektir; cihazınızın etiketindeki ya da ölçülen tüketimi esas alın."
      },
      p: [
        "Düşük yüklerde UPS'in kendi tüketimi de önemlidir. Bir UPS, akü modunda invertörü çalıştırmak için birkaç watttan 10–20 watta kadar kendi enerjisini harcayabilir. 15 W'lık bir modemde bu ek tüketim süreyi belirgin biçimde kısaltır. Yalnızca modem ve fiber terminali gibi 12 V ile çalışan cihazlar için doğru akım çıkışlı mini UPS'ler, invertör kaybı olmadığından daha uzun süre sağlayabilir."
      ],
      note: "Kombiyi UPS'e bağlamak, kombinin elektrik bağlantısında değişiklik gerektirebilir. Bu bağlantıyı ve topraklama kontrolünü yetkili elektrikçiye ya da kombinin yetkili servisine yaptırın; aksi hâlde hem güvenlik hem garanti sorunu doğabilir."
    },
    {
      h: "Gerçek süre neden hesaplanandan kısa çıkar?",
      ul: [
        "<strong>Deşarj hızı (Peukert etkisi):</strong> Kurşun-asit akülerin kapasitesi genellikle 20 saatlik yavaş deşarjla ölçülür. Akü 10–20 dakikada boşaltılacak kadar yüksek akım çekildiğinde kullanılabilir kapasite etiket değerinin belirgin biçimde altına, kimi zaman yarısına kadar düşer.",
        "<strong>Akü yaşı:</strong> UPS aküleri tipik olarak 3–5 yılda kapasitesinin önemli kısmını kaybeder; eski bir akü yeni hâlinin yarısı kadar süre verebilir.",
        "<strong>Sıcaklık:</strong> Soğukta anlık kapasite düşer; sıcakta ise kapasite kısa vadede iyi görünse de akü hızla yaşlanır.",
        "<strong>UPS'in kendi tüketimi ve kapanma gerilimi:</strong> Düşük yüklerde iç tüketim, yüksek yüklerde erken kapanma süreyi kısaltır.",
        "<strong>Yükün değişkenliği:</strong> Kombi, buzdolabı ve kompresörlü cihazlar devreye girip çıkarken anlık olarak çok daha fazla güç çeker."
      ],
      after: [
        "Bu yüzden hesapladığınız süreye en az %20–30 pay bırakın ve kritik sistemlerde UPS'i fişten çekerek gerçek bir kesinti testi yapın. Testten önce bağlı cihazlarda kaydedilmemiş iş olmadığından emin olun."
      ]
    },
    {
      h: "Akü ömrü nasıl uzatılır? Güvenlik notları",
      ul: [
        "<strong>Serin tutun:</strong> Kurşun-asit akülerin ideal çalışma sıcaklığı 20–25 °C civarıdır; bu değerin üzerinde her 8–10 °C artış ömrü kabaca yarıya indirebilir. UPS'i kalorifer, güneş alan pencere ya da kapalı dolap içine koymayın.",
        "<strong>Derin deşarjdan kaçının:</strong> Uzun kesintilerden sonra UPS'in aküyü tam şarj etmesine izin verin; aküyü uzun süre boş bırakmak kalıcı kapasite kaybına yol açar.",
        "<strong>Düzenli test:</strong> Yılda birkaç kez kontrollü kesinti testiyle süreyi ölçün; süre belirgin kısaldıysa aküleri değiştirme zamanı gelmiştir.",
        "<strong>Akü gruplarını birlikte değiştirin:</strong> Seri bağlı akülerden yalnızca birini yenilemek, yeni aküyü de kısa sürede yıpratır.",
        "<strong>Doğru akü:</strong> UPS'in teknik föyünde belirtilen tip ve kapasitede akü kullanın."
      ],
      note: "Aküler kısa devre olduğunda çok yüksek akım verir ve yangına yol açabilir; kurşun-asit aküler şarj sırasında hidrojen gazı çıkarabilir. Akü değişimi, harici akü kabini ve invertör bağlantılarını üretici talimatına uygun biçimde, gerekiyorsa yetkili servis ya da elektrikçiye yaptırın. Kullanılmış aküleri çöpe atmayın; satış noktalarına ya da lisanslı toplama noktalarına teslim edin."
    }
  ],
  faq: [
    ["UPS kaç saat gider?", "Akünün Ah değerini gerilim ve akü sayısıyla çarpıp kullanılabilir oran ve invertör verimiyle düzeltin, sonucu yükün wattına bölün. 2 × 12 V 7 Ah aküyle 40 W yük yaklaşık 2,8 saat, 250 W yük ise yarım saatin altında gider."],
    ["100 Ah akü kaç saat dayanır?", "12 V 100 Ah akü 1.200 Wh taşır. Kurşun-asitte yüzde 50 kullanım ve yüzde 90 verimle yaklaşık 540 Wh yüke ulaşır; bu 100 W'lık yükü yaklaşık 5,4 saat, 40 W'lık yükü yaklaşık 13,5 saat besler."],
    ["Akü kapasitesi watt-saate nasıl çevrilir?", "Amper-saat değerini akünün gerilimiyle çarpın: 12 V 7 Ah akü 84 Wh, 12 V 100 Ah akü 1.200 Wh eder. mAh verilmişse önce 1.000'e bölüp Ah'ye çevirin ya da Wh = mAh × V ÷ 1.000 formülünü kullanın."],
    ["Modem ve kamera için hangi UPS yeterli?", "Modem ve fiber terminali genellikle 10–25 W, birkaç kamera ve kayıt cihazıyla toplam 40–80 W çeker. Küçük güçlü bir UPS çoğu durumda yeterlidir; süreyi akü enerjisi belirlediği için Wh değerine ve UPS'in kendi tüketimine bakın."],
    ["VA ile watt arasındaki fark nedir?", "VA görünür güçtür; gerçek güç watt, VA ile güç faktörünün çarpımıdır. 1.000 VA'lık UPS güç faktörü 0,6 ise 600 W, 0,9 ise 900 W verebilir. Bağlı yük UPS'in watt sınırını aşmamalıdır."],
    ["İnverter verimi süreyi nasıl etkiler?", "İnvertör aküdeki doğru akımı alternatif akıma çevirirken enerjinin bir kısmını ısıya dönüştürür. Yüzde 85 verimde aküden çekilen her 100 Wh'nin yalnızca 85 Wh'si cihazlara ulaşır, bu da süreyi aynı oranda kısaltır."],
    ["Akü ömrü nasıl uzatılır?", "Aküyü serin bir yerde tutun, tamamen boşaltmaktan kaçının, kesintiden sonra tam şarj olmasını bekleyin ve düzenli test yapın. Seri bağlı aküleri birlikte değiştirin ve üreticinin önerdiği tipte akü kullanın."],
    ["mAh değeri neden tek başına yeterli değil?", "mAh yalnızca yük miktarını gösterir, enerjiyi göstermez. Aynı mAh değeri 3,7 V'luk hücrede ve 12 V'luk aküde çok farklı enerjiye karşılık gelir; karşılaştırma için gerilimle çarpıp watt-saate çevirmek gerekir."],
    ["Kombiyi UPS'e bağlamak güvenli mi?", "Uygun güçte, tam sinüs çıkışlı bir UPS ve doğru topraklama ile mümkündür. Ancak bağlantı kombinin elektrik tesisatında değişiklik gerektirebileceği için işi yetkili elektrikçiye ya da kombinin yetkili servisine yaptırmanız gerekir."]
  ],
  tools: ["ups-calisma-suresi-hesapla", "aku-kullanim-suresi-hesapla", "mah-wh-cevir", "kva-kw-cevir"],
  related: ["powerbank-kac-kez-sarj-eder", "kva-kw-farki-jenerator-secimi", "watt-amper-volt-iliskisi", "gunes-paneli-kac-watt-gerekir"],
  uyari: "elektrik tesisatı ve akü bağlantıları için uygulama talimatı değildir; bağlantı ve kurulumları yetkili elektrikçiye ya da yetkili servise yaptırın"
};
