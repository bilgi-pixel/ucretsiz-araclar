export default {
  slug: "guvenlik-kamerasi-kac-gun-kayit-yapar",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Güvenlik Kamerası Kaç Gün Kayıt Yapar? Disk Kapasitesi ve Bant Genişliği",
  pageTitle: "Güvenlik Kamerası Kaç Gün Kayıt Yapar? Disk ve Bit Hızı Hesabı",
  description: "Kayıt süresi = disk kapasitesi ÷ (kamera sayısı × bit hızı × 10,8 GB). 1 TB disk 4 kamerada kaç gün tutar, H.265 farkı, hareket algılama ve PoE güç hesabı.",
  keywords: ["güvenlik kamerası kaç gün kayıt yapar", "1 tb kaç gün kayıt", "nvr disk hesaplama", "ip kamera bant genişliği", "kamera kayıt süresi", "h.265 h.264 farkı", "poe switch kaç watt", "kamera kaydı kaç gün saklanır"],
  lead: "Güvenlik kamerasının kaç gün kayıt tutacağı, <strong>disk kapasitesinin günlük kayıt miktarına bölünmesiyle</strong> bulunur; 1 Mbps bit hızıyla 24 saat kayıt yapan bir kamera günde 10,8 GB yer kaplar. Örneğin H.265 sıkıştırmalı, 2 Mbps'lik 4 kamera günde yaklaşık 86 GB üretir ve 1 TB disk bu sistemde yaklaşık <strong>11–12 gün</strong> kayıt tutar. Kayıt süresini belirleyen asıl etken çözünürlük değil bit hızıdır. Bu rehberde formülü, örnek tabloları, H.264 ile H.265 farkını, hareket algılamalı kaydın etkisini, ağ ve PoE ihtiyacını adım adım bulacaksınız.",
  kisaCevap: [
    "1 Mbps sürekli kayıt saatte 0,45 GB, günde 10,8 GB yer tutar (1 GB = 1.000 MB).",
    "Kayıt günü = disk kapasitesi (GB) ÷ (kamera sayısı × bit hızı Mbps × 10,8).",
    "4 kamera × 2 Mbps ile 1 TB disk yaklaşık 11,6 gün, 4 TB disk yaklaşık 46 gün kayıt tutar.",
    "H.265 aynı görüntü kalitesinde H.264'e göre bit hızını kabaca yarıya indirir, kayıt süresini yaklaşık iki katına çıkarır.",
    "Hareket algılamalı kayıt, sahnenin hareketliliğine göre disk kullanımını belirgin biçimde azaltır; sabit bir oran yoktur.",
    "Kanunda tüm işyerleri için tek bir saklama günü yoktur; kayıtlar KVKK'ya göre amaçla sınırlı ve ölçülü süre saklanmalıdır."
  ],
  figure: {
    alt: "Kamera kayıt süresi hesap akışı: kamera sayısı çarpı bit hızı çarpı 10,8 eşittir günlük GB; disk kapasitesi bölü günlük GB eşittir kayıt günü. Altında 4 kamera 2 Mbps örneği ile 1, 2, 4 ve 8 TB disklerin gün karşılıkları çubuk olarak.",
    caption: "Üst satır hesabın mantığını, alt grafik 4 kameralı ve kamera başına 2 Mbps'lik bir sistemde disk büyüdükçe kayıt süresinin doğrusal arttığını gösterir. Günlük 86,4 GB üreten sistemde 4 TB disk yaklaşık 46 gün tutar.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kayıt süresi nasıl hesaplanır?</text>
  <g class="mid">
    <rect x="20" y="52" width="120" height="58" rx="8" class="sf sb"/>
    <text x="80" y="78" class="b">4 kamera</text><text x="80" y="98" class="sm mu">adet</text>
    <text x="156" y="88" class="lg b">×</text>
    <rect x="172" y="52" width="120" height="58" rx="8" class="sf sb"/>
    <text x="232" y="78" class="b">2 Mbps</text><text x="232" y="98" class="sm mu">H.265 1080p</text>
    <text x="308" y="88" class="lg b">×</text>
    <rect x="324" y="52" width="120" height="58" rx="8" class="ps"/>
    <text x="384" y="78" class="b">10,8</text><text x="384" y="98" class="sm">GB/gün/Mbps</text>
    <text x="460" y="88" class="lg b">=</text>
    <rect x="476" y="52" width="224" height="58" rx="8" class="p"/>
    <text x="588" y="80" class="lg b sf">86,4 GB/gün</text><text x="588" y="100" class="sm sf">günlük kayıt</text>
  </g>
  <text x="20" y="146" class="b">Disk ÷ 86,4 GB = kayıt günü</text>
  <g class="sm">
    <text x="20" y="186" class="b">1 TB</text>
    <rect x="80" y="170" width="60" height="24" rx="4" class="ps"/>
    <text x="150" y="187">11,6 gün</text>
    <text x="20" y="236" class="b">2 TB</text>
    <rect x="80" y="220" width="120" height="24" rx="4" class="ps"/>
    <text x="210" y="237">23,1 gün</text>
    <text x="20" y="286" class="b">4 TB</text>
    <rect x="80" y="270" width="240" height="24" rx="4" class="p"/>
    <text x="330" y="287" class="b">46,3 gün</text>
    <text x="20" y="336" class="b">8 TB</text>
    <rect x="80" y="320" width="480" height="24" rx="4" class="p"/>
    <text x="570" y="337" class="b">92,6 gün</text>
  </g>
  <rect x="20" y="364" width="680" height="52" rx="8" class="sf sb"/>
  <text x="36" y="386" class="b">Neden 10,8? 1 Mbps × 86.400 sn ÷ 8 = 10.800 MB</text>
  <text x="36" y="406" class="sm t2">Hesap sürekli kayıt içindir; ses, dosya sistemi ve pay için %10–20 ekleyin.</text>
</svg>`
  },
  sections: [
    {
      h: "Güvenlik kamerası kayıt süresi neye bağlıdır?",
      p: [
        "Kayıt cihazı (NVR ya da DVR) diske sürekli yazar ve disk dolunca en eski kaydın üzerine yazmaya başlar. Dolayısıyla \"kaç gün kayıt yapar\" sorusunun cevabı, diskin günde ne kadar dolduğuna bağlıdır. Günlük doluluğu ise dört şey belirler: kamera sayısı, kameraların <strong>bit hızı</strong>, günde kaç saat kayıt yapıldığı ve kaydın sürekli mi hareketle mi tetiklendiği.",
        "Bit hızı (bitrate), kameranın bir saniyelik görüntü için ürettiği veri miktarıdır ve Mbps (saniyede megabit) ya da kbps ile ifade edilir. Çözünürlük, kare hızı (fps), sıkıştırma yöntemi (codec), görüntü kalitesi ayarı ve sahnedeki hareket bit hızını birlikte belirler. Bu nedenle aynı çözünürlükteki iki kamera, ayarlarına ve baktıkları sahneye göre birbirinden çok farklı disk tüketebilir.",
        "En doğru hesap, kameranın ayar menüsündeki bit hızı değeriyle yapılır. Sabit bit hızı (CBR) seçilmişse değer neredeyse hiç değişmez; değişken bit hızında (VBR) ayardaki değer üst sınırdır ve gerçek ortalama genellikle daha düşüktür."
      ]
    },
    {
      h: "Kayıt süresi formülü",
      p: [
        "Bit hızını günlük gigabayta çevirmek için saniyedeki megabiti günün saniye sayısıyla çarpıp 8'e bölmeniz gerekir. 1 Mbps × 86.400 saniye = 86.400 megabit; bunun 8'e bölümü 10.800 MB, yani <strong>10,8 GB</strong>'tır. Bu sabit sayıyı ezberlemek bütün hesabı kolaylaştırır."
      ],
      formula: "Günlük kayıt (GB) = kamera sayısı × bit hızı (Mbps) × 0,45 × kayıt saati\n24 saat kayıtta: günlük GB = kamera sayısı × Mbps × 10,8\nKayıt günü = disk kapasitesi (GB) ÷ günlük kayıt (GB)\nGereken disk (GB) = günlük kayıt × istenen gün × 1,15 (pay)",
      after: [
        "Formüldeki 1,15 çarpanı, ses kaydı, dosya sistemi yapıları ve tahmin hatası için bırakılan yaklaşık %15'lik paydır. Disk kapasiteleri üretici tarafından ondalık sistemle (1 TB = 1.000 GB) verildiği için hesapta da 1.000 kullanılır. Bit ve bayt dönüşümleri size karışık geliyorsa [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısına göz atın."
      ]
    },
    {
      h: "1 TB disk kaç günlük kayıt tutar?",
      p: [
        "Aşağıdaki tablo 24 saat sürekli kayıt varsayımıyla 1 TB diskin kaç gün dolacağını gösterir. Bit hızları kamera ayarına göre değişen <strong>örnek değerlerdir</strong>; kendi sisteminizde kameranın menüsündeki değeri kullanın."
      ],
      table: {
        head: ["Kamera başına bit hızı (örnek)", "Tipik karşılığı", "1 kamera", "4 kamera", "8 kamera"],
        rows: [
          ["1 Mbps", "1080p H.265, sakin sahne", "92,6 gün", "23,1 gün", "11,6 gün"],
          ["2 Mbps", "1080p H.265 / 4 MP H.265", "46,3 gün", "11,6 gün", "5,8 gün"],
          ["4 Mbps", "1080p H.264 / 4 MP H.265 yüksek kalite", "23,1 gün", "5,8 gün", "2,9 gün"],
          ["6 Mbps", "4 MP H.264 / 4K H.265", "15,4 gün", "3,9 gün", "1,9 gün"],
          ["8 Mbps", "4K H.265 yüksek kalite", "11,6 gün", "2,9 gün", "1,4 gün"]
        ],
        caption: "Hesap: 1.000 GB ÷ (kamera × Mbps × 10,8). 2 TB disk için değerleri 2 ile, 4 TB için 4 ile çarpın."
      },
      after: [
        "Tablo, \"1 TB yeter mi\" sorusunun neden tek bir cevabı olmadığını gösteriyor: aynı disk tek bir sakin kamerada üç ay, sekiz yüksek kaliteli kamerada bir buçuk gün kayıt tutabilir."
      ]
    },
    {
      h: "Çözümlü örnek: 8 kameralı bir işyeri için disk seçimi",
      p: [
        "Bir mağaza sahibi 8 adet 1080p kamerayı H.265 sıkıştırmayla, kamera başına 2 Mbps bit hızında, 24 saat kayıtla çalıştırmak ve en az 30 günlük kaydı saklamak istiyor. Hesabı adım adım yapalım."
      ],
      ol: [
        "Toplam bit hızı: 8 × 2 = 16 Mbps.",
        "Günlük kayıt: 16 × 10,8 = 172,8 GB/gün.",
        "30 günlük ihtiyaç: 172,8 × 30 = 5.184 GB, yani yaklaşık 5,2 TB.",
        "%15 pay ekleyin: 5.184 × 1,15 ≈ 5.962 GB, yaklaşık 6 TB.",
        "Piyasadaki disk boyutlarına yuvarlayın: 6 TB tek disk sınırda kalır; 8 TB disk yaklaşık 46 günlük kayıt sağlar ve ileride kamera eklemeye pay bırakır."
      ],
      after: [
        "Kayıt cihazında iki disk yuvası varsa kapasiteyi iki diske bölmek ya da aynalamak mümkündür. Disk arızasında kaydın kaybolmaması önemliyse [[bilgi:raid-0-1-5-10-farki|RAID seviyeleri]] yazısındaki RAID 1 ve RAID 5 seçeneklerini değerlendirin. Bu hesabı kendi değerlerinizle [[arac:guvenlik-kamerasi-depolama-hesapla|Güvenlik Kamerası Kayıt Depolama Hesaplama]] aracında yapabilirsiniz."
      ]
    },
    {
      h: "Çözünürlük, FPS ve H.264 ile H.265 farkı",
      p: [
        "<strong>Çözünürlük</strong> arttıkça kare başına piksel sayısı artar: 1080p yaklaşık 2,1 milyon, 4 MP yaklaşık 3,7 milyon, 4K yaklaşık 8,3 milyon piksel içerir. Ancak bit hızı piksel sayısıyla birebir orantılı artmaz; sıkıştırma yüksek çözünürlükte daha verimli çalışır.",
        "<strong>Kare hızı</strong> (fps) saniyede kaydedilen görüntü sayısıdır. Güvenlik kayıtlarında 25–30 fps akıcı görüntü verir, ancak çoğu durumda 12–15 fps olayları tespit etmek için yeterlidir ve bit hızını belirgin biçimde düşürür. Kasa önü ya da plaka okuma gibi hızlı hareketlerin net görülmesi gereken kameralarda kare hızını düşürmemek gerekir.",
        "<strong>Codec</strong>, görüntüyü sıkıştırma yöntemidir. H.264 uzun yıllardır standarttır; daha yeni olan H.265 (HEVC) aynı görüntü kalitesini yaklaşık yarı bit hızıyla sağlayabilir. Bu, aynı diskte yaklaşık iki kat kayıt süresi demektir. Bazı üreticilerin ek akıllı sıkıştırma modları, sabit sahnelerde bit hızını daha da düşürür. H.265'in dezavantajı, eski kayıt cihazları ve bazı tarayıcıların bu biçimi oynatamamasıdır."
      ]
    },
    {
      h: "Hareket algılamalı kayıt ne kadar yer kazandırır?",
      p: [
        "Hareket algılamada kamera yalnızca görüntüde değişiklik olduğunda (ve genellikle olaydan birkaç saniye önce ve sonra) kayıt yapar. Gece kapalı olan bir ofis, kimsenin geçmediği bir depo koridoru ya da otopark girişinde disk kullanımı büyük ölçüde düşer. Gün boyu kalabalık bir mağaza kasasında ise kazanç sınırlıdır.",
        "Kazancı tahmin etmek için kameranın günde kaç saat hareket gördüğünü düşünün. Örneğin günde yaklaşık 6 saat hareket olan bir kamerada kayıt saati 24 yerine 6 alınabilir ve disk kullanımı dörtte bire iner. Ağaç dalı, gölge, yağmur ya da far ışığı gibi yanlış tetiklemeler bu kazancı azaltır; algılama bölgesini ve hassasiyeti ayarlamak önemlidir.",
        "Kritik noktalarda yalnızca harekete güvenmek risklidir: algılama kaçırırsa kayıt yoktur. Yaygın çözüm, önemli kameraları sürekli, diğerlerini hareketle kaydetmek ya da sürekli kaydı düşük bit hızlı alt akımda, olay anını ana akımda tutmaktır."
      ]
    },
    {
      h: "IP kamera ne kadar internet tüketir? Bant genişliği",
      p: [
        "Kamera ile kayıt cihazı aynı yerel ağdaysa kayıt internet kotanızı tüketmez; veri binadaki switch üzerinden akar. İnternet yalnızca kayıtları uzaktan, telefon ya da bilgisayardan izlediğinizde kullanılır. Bu durumda belirleyici olan, işyerinizdeki bağlantının <strong>yükleme</strong> (upload) hızıdır, çünkü görüntü binadan dışarı gönderilir.",
        "Uzaktan izlemede uygulamalar genellikle 0,3–1 Mbps arası düşük çözünürlüklü <strong>alt akımı</strong> (substream) kullanır. 4 kamerayı aynı anda alt akımla izlemek yaklaşık 2–4 Mbps yükleme hızı ister. Ana akımı (tam çözünürlük) uzaktan izlemek ya da kaydı buluta göndermek ise kamera başına birkaç Mbps gerektirir ve aylık kotası olan hatlarda dikkatle planlanmalıdır.",
        "Yerel ağda ise switch portlarının ve kayıt cihazının toplam bit hızını kaldırması gerekir. 16 kameralı 4 Mbps'lik bir sistem 64 Mbps üretir; 100 Mbps'lik bir uplink bu yükte sınıra yaklaşır, gigabit bağlantı rahat eder. Hesap için [[arac:ip-kamera-bant-genisligi-hesapla|IP Kamera Bant Genişliği Hesaplama]] aracını kullanabilirsiniz; genel internet hızı ihtiyacı için [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı]] yazısı yol gösterir."
      ]
    },
    {
      h: "PoE switch kaç watt olmalı?",
      p: [
        "PoE (Power over Ethernet), kameraya hem veriyi hem elektriği aynı ağ kablosuyla taşır. Switch'in toplam bir <strong>PoE güç bütçesi</strong> vardır; bağlı cihazların toplam tüketimi bu bütçeyi aşmamalıdır. Kameranın etiketinde yazan en yüksek tüketim, gece kızılötesi aydınlatma açıkken ortaya çıkar."
      ],
      table: {
        head: ["PoE standardı", "Port başına switch çıkışı", "Cihaza ulaşan güç", "Tipik kullanım"],
        rows: [
          ["IEEE 802.3af (PoE)", "15,4 W", "12,95 W", "Sabit odaklı standart kameralar"],
          ["IEEE 802.3at (PoE+)", "30 W", "25,5 W", "Isıtıcılı dış mekân ve motorlu odaklı kameralar"],
          ["IEEE 802.3bt Tip 3", "60 W", "51 W", "Döner (PTZ) kameralar"],
          ["IEEE 802.3bt Tip 4", "90 W", "71,3 W", "Yüksek güçlü PTZ ve özel cihazlar"]
        ]
      },
      after: [
        "Örnek: Her biri en fazla 7 W çeken 8 kamera 56 W eder. %20–30 pay ile en az 70–75 W PoE bütçeli bir switch seçilmelidir. Kabloda kayıp olduğu için 100 metreye yakın hatlarda pay daha önemlidir. Toplamı [[arac:poe-guc-butcesi-hesapla|PoE Güç Bütçesi Hesaplama]] aracıyla kontrol edebilirsiniz."
      ]
    },
    {
      h: "Kayıtlar yasal olarak kaç gün saklanmalı?",
      p: [
        "Türkiye'de tüm işyerleri ve konutlar için geçerli, kanunla belirlenmiş tek bir \"en az şu kadar gün\" saklama süresi yoktur. Kamera kayıtları kişisel veri sayıldığı için <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu</strong> kapsamındadır. Kanunun genel ilkesine göre veriler, işlendikleri amaç için gerekli olan süre kadar saklanmalı, süre dolunca silinmeli ya da yok edilmelidir.",
        "Pratikte işletmeler güvenlik amacına uygun bir süre belirler, bu süreyi kişisel veri saklama ve imha politikasına yazar ve kamera alanlarına aydınlatma metni asar. Bazı sektörler (ör. özel güvenlik hizmeti alan tesisler, bankacılık, belirli kamu alanları) kendi mevzuatlarında özel kurallara tabi olabilir. Kendi durumunuz için güncel mevzuatı ve Kişisel Verileri Koruma Kurumu'nun rehberlerini kontrol edin; gerekirse hukuki destek alın.",
        "Bir olay yaşandığında ilgili kaydı hemen ayrı bir ortama kopyalamak, döngüsel kaydın üzerine yazmasını önler. Disk süresini planlarken bu ihtiyacı da hesaba katın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çözünürlüğe göre tahmin yapmak:</strong> Asıl belirleyici bit hızıdır; kamera menüsündeki değeri kullanın.",
        "<strong>Gece görüntüsünü unutmak:</strong> Gece kızılötesi görüntüde parazit arttığı için değişken bit hızlı kameralar gece daha fazla veri üretebilir.",
        "<strong>Masaüstü diski NVR'a takmak:</strong> 7/24 yazma yükü için tasarlanmış gözetim diskleri daha uzun ömürlüdür.",
        "<strong>Diskin dolduğunu fark etmemek:</strong> Döngüsel kayıt kapalıysa disk dolunca kayıt durur; ayarı kontrol edin.",
        "<strong>PoE bütçesini port sayısıyla karıştırmak:</strong> 8 portlu bir switch'in tüm portlarına aynı anda tam güç veremeyebileceğini unutmayın."
      ]
    }
  ],
  faq: [
    ["Güvenlik kamerası kaç gün kayıt yapar?", "Kayıt süresi disk kapasitesinin günlük kayıt miktarına bölümüdür. Günlük kayıt, kamera sayısı ile bit hızının ve 10,8 sayısının çarpımıyla bulunur; örneğin 2 Mbps'lik 4 kamera günde 86,4 GB üretir ve 1 TB disk yaklaşık 11–12 gün tutar."],
    ["1 TB disk kaç günlük kayıt tutar?", "Tek bir 2 Mbps kamerada yaklaşık 46 gün, dört kamerada yaklaşık 11,6 gün, sekiz kamerada yaklaşık 5,8 gün tutar. Bit hızı iki katına çıkarsa süre yarıya iner; kesin hesap için kameranın ayar menüsündeki bit hızını kullanın."],
    ["Çözünürlük ve FPS kayıt süresini nasıl etkiler?", "Çözünürlük ve kare hızı arttıkça kamera saniyede daha fazla veri üretir ve kayıt süresi kısalır. Kare hızını 25'ten 12–15'e düşürmek çoğu güvenlik uygulamasında yeterli görüntü verir ve disk kullanımını belirgin biçimde azaltır."],
    ["H.264 ile H.265 arasındaki fark nedir?", "H.265 daha yeni bir sıkıştırma yöntemidir ve aynı görüntü kalitesini H.264'e göre kabaca yarı bit hızıyla sağlar. Bu, aynı diskte yaklaşık iki kat kayıt süresi demektir; ancak eski cihazlar ve bazı tarayıcılar H.265'i oynatamayabilir."],
    ["IP kamera ne kadar internet tüketir?", "Kayıt yerel ağda yapılıyorsa internet kotası kullanılmaz. Uzaktan izlemede uygulamalar genellikle kamera başına 0,3–1 Mbps'lik alt akımı kullanır; belirleyici olan işyerindeki bağlantının yükleme hızıdır."],
    ["PoE switch kaç watt olmalı?", "Kameraların etiketindeki en yüksek tüketimlerin toplamına yüzde 20–30 pay eklenmelidir. Örneğin her biri 7 W çeken 8 kamera için en az 70–75 W PoE bütçeli bir switch uygun olur; PTZ kameralar PoE+ ya da daha yüksek standart ister."],
    ["Hareket algılamalı kayıt ne kadar yer kazandırır?", "Kazanç sahnenin ne kadar hareketli olduğuna bağlıdır. Günde yalnızca birkaç saat hareket gören bir kamerada disk kullanımı birkaç kat azalabilir, kalabalık bir alanda ise fark küçüktür. Yanlış tetiklemeler kazancı düşürür."],
    ["Kayıtlar yasal olarak kaç gün saklanmalı?", "Tüm işyerleri için kanunla belirlenmiş tek bir gün sayısı yoktur. Kayıtlar kişisel veri olduğu için KVKK kapsamında amaçla sınırlı ve ölçülü süre saklanmalı, süre saklama ve imha politikasında belirtilmelidir; sektörel mevzuatı ayrıca kontrol edin."],
    ["Kamera kayıt cihazına kaç TB disk takmalıyım?", "Günlük kayıt miktarını istediğiniz gün sayısıyla çarpıp yüzde 15 pay ekleyin ve sonucu bir üst disk boyutuna yuvarlayın. 2 Mbps'lik 8 kamera ve 30 günlük kayıt için yaklaşık 6 TB gerekir; 8 TB disk ileride kamera eklemeye pay bırakır."]
  ],
  tools: ["guvenlik-kamerasi-depolama-hesapla", "ip-kamera-bant-genisligi-hesapla", "poe-guc-butcesi-hesapla", "gb-tb-cevir"],
  related: ["raid-0-1-5-10-farki", "gb-kac-mb-veri-birimleri", "internet-hizi-kac-mbps-olmali"],
  sources: [
    ["Kişisel Verileri Koruma Kurumu – Mevzuat ve rehberler", "https://www.kvkk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 6698 sayılı Kişisel Verilerin Korunması Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
