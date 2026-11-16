export default {
  slug: "poe-nedir-switch-guc-butcesi-nasil-hesaplanir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "PoE Nedir? Switch Güç Bütçesi ve Kamera Başına Watt Nasıl Hesaplanır?",
  pageTitle: "PoE Nedir? PoE Switch Güç Bütçesi Nasıl Hesaplanır?",
  description: "PoE, ağ kablosundan elektrik taşır. 802.3af/at/bt farkı, port başına watt, switch güç bütçesi hesabı, 100 metre sınırı, pasif PoE riski ve kamera örneği.",
  keywords: ["poe nedir", "poe switch", "poe güç bütçesi", "802.3af at bt", "poe kamera kaç watt", "poe kablo mesafesi", "poe injector", "pasif poe aktif poe farkı"],
  lead: "PoE (Power over Ethernet), IP kamera, kablosuz erişim noktası ve IP telefon gibi cihazlara <strong>veriyi ve elektriği aynı ağ kablosundan</strong> ileten teknolojidir. Bir PoE switch'in kaç cihazı besleyebileceği, cihazların toplam watt değerine en az %20 pay eklenip switch'in toplam PoE bütçesiyle karşılaştırılarak bulunur. Örneğin 8 kamera, 1 hareketli kamera ve 2 erişim noktası toplam 101 W çekiyorsa paylı ihtiyaç 121 W eder; 120 W bütçeli switch yetmez. Bu sayfada standartları, hesap adımlarını ve kablo sınırlarını anlatıyoruz.",
  kisaCevap: [
    "802.3af (PoE): port başına 15,4 W verilir, cihaza 12,95 W ulaşır.",
    "802.3at (PoE+): port başına 30 W, cihaza 25,5 W; 802.3bt Tip 3: 60 W / 51 W; Tip 4: 90 W / 71,3 W.",
    "Güç bütçesi = cihazların en yüksek tüketimlerinin toplamı × (1 + yedek pay); pay genellikle %20–30 alınır.",
    "Switch'in hem toplam bütçesi hem port başına sınırı yeterli olmalıdır; ikisinden biri yetmezse cihaz kapanır.",
    "Ethernet kablosuyla PoE mesafesi standart olarak en fazla 100 metredir.",
    "Pasif PoE el sıkışma yapmaz; uyumsuz cihaza sabit voltaj vererek zarar verebilir."
  ],
  figure: {
    alt: "PoE switch güç bütçesi hesabı: 8 kamera 6,5 watt, 1 hareketli kamera 25 watt ve 2 erişim noktası 12 watt toplamı 101 watt; yüzde 20 payla 121 watt; 120 watt bütçe yetersiz, 150 watt yeterli.",
    caption: "Örnek kurulumda cihazların toplamı 101 W, %20 payla gereken bütçe 121,2 W'tır. 120 W'lık switch sınırda kalıp yetersizdir; 150 W'lık switch yaklaşık 29 W boşluk bırakır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">PoE güç bütçesi örneği</text>
  <rect x="20" y="56" width="220" height="70" rx="8" class="sf sb"/>
  <text x="130" y="84" class="b mid">8 × IP kamera</text>
  <text x="130" y="110" class="mid">8 × 6,5 W = 52 W</text>
  <rect x="250" y="56" width="220" height="70" rx="8" class="sf sb"/>
  <text x="360" y="84" class="b mid">1 × hareketli kamera</text>
  <text x="360" y="110" class="mid">25 W (PoE+)</text>
  <rect x="480" y="56" width="220" height="70" rx="8" class="sf sb"/>
  <text x="590" y="84" class="b mid">2 × erişim noktası</text>
  <text x="590" y="110" class="mid">2 × 12 W = 24 W</text>
  <text x="360" y="160" class="b mid">Toplam 101 W × 1,20 pay = 121,2 W gerekli</text>
  <line x1="60" y1="190" x2="60" y2="340" class="st" fill="none"/>
  <rect x="60" y="200" width="485" height="34" rx="4" class="p"/>
  <text x="70" y="223" class="b sf">Gerekli: 121,2 W</text>
  <rect x="60" y="248" width="480" height="34" rx="4" class="dgs"/>
  <text x="70" y="271" class="b">120 W switch</text>
  <text x="550" y="271" class="b dg">Yetersiz (−1,2 W)</text>
  <rect x="60" y="296" width="600" height="34" rx="4" class="oks"/>
  <text x="70" y="319" class="b">150 W switch</text>
  <text x="670" y="319" class="b ok end">+28,8 W</text>
  <text x="360" y="372" class="sm mid t2">Hareketli kamera için o portun PoE+ (30 W) desteklemesi de şarttır.</text>
</svg>`
  },
  sections: [
    {
      h: "PoE (Power over Ethernet) nedir?",
      p: [
        "PoE, standart bir ağ kablosunun içindeki tellerden veriyle birlikte doğru akım taşınmasını sağlayan bir yöntemdir. Gücü veren tarafa PSE (güç kaynağı ekipmanı; çoğu zaman switch ya da injector), gücü alan tarafa PD (güç alan cihaz; kamera, erişim noktası, telefon) denir. Böylece tavandaki bir kamera ya da duvardaki bir erişim noktası için ayrıca priz çekmek gerekmez.",
        "Standart PoE'de güç vermeden önce bir el sıkışma yapılır: switch, kabloya bağlanan cihazın PoE uyumlu olup olmadığını ve hangi güç sınıfında olduğunu düşük bir gerilimle kontrol eder. Uyumlu değilse güç vermez. Bu sayede PoE switch'e PoE desteği olmayan bir bilgisayar bağlamak güvenlidir."
      ]
    },
    {
      h: "802.3af, 802.3at ve 802.3bt standartları arasındaki fark nedir?",
      p: [
        "Standartlar arasındaki temel fark, port başına verilebilecek güçtür. Switch tarafında verilen güç ile cihaza ulaşan güç arasındaki fark kablodaki kayıptır; standart, 100 metrelik kabloda bile cihaza belirtilen değerin ulaşmasını hedefler."
      ],
      table: {
        head: ["Standart", "Yaygın adı", "Port çıkışı (PSE)", "Cihaza ulaşan (PD)", "Kullanılan çift"],
        rows: [
          ["IEEE 802.3af", "PoE", "15,4 W", "12,95 W", "2 çift"],
          ["IEEE 802.3at", "PoE+", "30 W", "25,5 W", "2 çift"],
          ["IEEE 802.3bt Tip 3", "PoE++ / 4PPoE", "60 W", "51 W", "4 çift"],
          ["IEEE 802.3bt Tip 4", "PoE++ / 4PPoE", "90 W", "71,3 W", "4 çift"]
        ],
        caption: "Yeni standartlar eskileriyle geriye uyumludur: PoE+ switch, 802.3af cihazı besleyebilir."
      },
      after: [
        "Sabit bir IP kamera genellikle 802.3af sınırında kalır; kızılötesi ışıklar açıldığında tüketimi artar. Isıtıcılı dış mekân kameraları, hareketli (PTZ) kameralar ve yeni nesil erişim noktaları çoğu zaman PoE+ ister. Cihazın etiketinde ya da teknik belgesinde yazan \"en yüksek tüketim\" değeri, hesapta kullanılması gereken değerdir."
      ]
    },
    {
      h: "Güç bütçesi nasıl hesaplanır? Formül ve pay",
      p: [
        "PoE switch'lerin iki sınırı vardır: her portun verebileceği en yüksek güç ve tüm portların toplamda verebileceği güç (PoE bütçesi). 24 portlu bir switch'in her portu PoE+ olabilir ama toplam bütçesi 190 W ise 24 portun hepsine 30 W veremez. Hesap bu yüzden iki aşamalıdır."
      ],
      formula: "Toplam güç = Σ (cihaz adedi × cihazın en yüksek tüketimi)\nGereken bütçe = toplam güç × (1 + pay)   · pay genellikle 0,20–0,30\nKoşul 1: gereken bütçe ≤ switch PoE bütçesi\nKoşul 2: her cihazın gücü ≤ bağlandığı portun sınırı",
      ol: [
        "Her cihaz türünün en yüksek tüketimini teknik belgeden yazın: kamera 6,5 W, hareketli kamera 25 W, erişim noktası 12 W.",
        "Adetle çarpıp toplayın: 8 × 6,5 + 1 × 25 + 2 × 12 = 52 + 25 + 24 = 101 W.",
        "%20 pay ekleyin: 101 × 1,20 = 121,2 W.",
        "Switch'in bütçesiyle karşılaştırın: 120 W yetersiz, 150 W yeterli (28,8 W boşluk).",
        "Port kontrolü: 25 W'lık hareketli kamera, PoE+ (30 W) destekleyen bir porta bağlanmalı."
      ],
      after: [
        "Bu hesabı cihaz gruplarını girerek [[arac:poe-guc-butcesi-hesapla|PoE Güç Bütçesi Hesaplama]] aracıyla yapabilirsiniz; araç kalan gücü ve gereken PoE standardını da gösterir."
      ]
    },
    {
      h: "Güç bütçesinde pay neden bırakılır?",
      p: [
        "Cihazların tüketimi sabit değildir. Bir kamera gündüz 4 W çekerken gece kızılötesi aydınlatma açıldığında 6–7 W'a çıkabilir; dış mekânda kışın ısıtıcı devreye girerse tüketim iki katına yaklaşır. Hareketli kameralar motor çalışırken anlık olarak daha fazla güç çeker. Bütçe tam sınırda hesaplanırsa en kötü anda bazı cihazlar yeniden başlar ya da switch düşük öncelikli portlardaki gücü keser.",
        "Pay ayrıca ileride eklenecek cihazlar içindir. Bugün 8 kameralık bir sistem kuran işyeri, bir yıl sonra iki kamera daha eklemek istediğinde switch değiştirmek zorunda kalmamalıdır. Switch'in sürekli tam yükte çalışması ısınmayı artırır; dolapta havalandırması zayıf bir switch için bu ayrıca önemlidir."
      ]
    },
    {
      h: "PoE kablosu en fazla kaç metre olabilir?",
      p: [
        "Ethernet standardı bakır kabloda bir bağlantı için en fazla 100 metre tanımlar; PoE de bu sınırla çalışır. 100 metre, switch portundan cihaza kadar olan toplam uzunluktur ve ara bağlantı kablolarını da içerir. Daha uzak noktalar için PoE uzatıcı, ara bir PoE switch ya da fiber hat ve uçta ayrı güç kaynağı kullanılır.",
        "Kablo kalitesi mesafe kadar önemlidir. Kablodaki direnç güç kaybına dönüşür; ince ya da bakır kaplı alüminyum (CCA) kablolarda kayıp ve ısınma artar, uzun hatlarda cihaz yeterli gerilimi alamayabilir. PoE için en az Cat5e, yüksek güçlü 802.3bt uygulamalarında Cat6 ve üzeri, saf bakır iletkenli kablo tercih edilir. Kablo kesitinin genel mantığı [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısında anlatılıyor."
      ]
    },
    {
      h: "PoE injector ne zaman kullanılır? Pasif ve aktif PoE farkı",
      p: [
        "PoE injector, PoE desteği olmayan bir switch ile PoE cihazı arasına takılan küçük bir güç adaptörüdür: bir ucu switch'ten veriyi alır, prizden aldığı gücü ekler ve diğer ucundan cihaza verir. Tek bir kamera ya da erişim noktası eklemek için tüm switch'i değiştirmek yerine kullanılır. Tersi işi yapan PoE splitter ise PoE'li kablodan gücü ayırıp PoE desteği olmayan bir cihaza ayrı fiş olarak verir."
      ],
      table: {
        head: ["Özellik", "Aktif (standart) PoE", "Pasif PoE"],
        rows: [
          ["El sıkışma", "Var; uyumsuz cihaza güç verilmez", "Yok; kablo takılınca güç verilir"],
          ["Gerilim", "Standartta tanımlı (yaklaşık 44–57 V)", "Üreticiye göre sabit (ör. 24 V ya da 48 V)"],
          ["Uyumluluk", "Farklı üreticiler arasında çalışır", "Yalnızca aynı gerilimli cihazlarla"],
          ["Risk", "Düşük", "Yanlış cihaza takılırsa ağ kartı zarar görebilir"]
        ]
      },
      after: [
        "Pasif PoE kullanan bir cihazınız varsa ona ayrılmış portu ve kabloyu etiketleyin. Aynı porta bir bilgisayar ya da yazıcı takılırsa kalıcı arıza oluşabilir."
      ]
    },
    {
      h: "IP kameraların bant genişliği switch seçimini nasıl etkiler?",
      p: [
        "PoE switch seçerken güç kadar veri trafiği de hesaplanmalıdır. Bir IP kamera çözünürlüğüne, kare hızına ve sıkıştırma türüne göre birkaç Mbps veri üretir. Kayıt cihazına giden toplam trafik, bütün kameraların toplamıdır ve switch'in kayıt cihazına bağlanan portundan geçer."
      ],
      formula: "Toplam trafik = kamera sayısı × kamera başına bit hızı\nÖrnek: 8 × 4 Mbps = 32 Mbps (kayıt cihazına giden)",
      after: [
        "Bu örnekte 100 megabitlik bir bağlantı teknik olarak yeterlidir, ama canlı izleme ve kayıt aynı anda yapıldığında trafik artar. Bu yüzden kayıt cihazına giden port ve switch'in ana bağlantısı için gigabit tercih edilir. Kamera başına bit hızını tahmin etmek için [[arac:ip-kamera-bant-genisligi-hesapla|IP Kamera Bant Genişliği Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kayıt cihazı depolama ihtiyacı nasıl hesaplanır?",
      p: [
        "Depolama, bit hızı ile süreden bulunur: 4 Mbps'lik bir kamera saniyede 0,5 MB, günde 4 × 86.400 ÷ 8 = 43.200 MB, yani yaklaşık 43,2 GB veri üretir. 8 kamera günde yaklaşık 346 GB, 30 günde yaklaşık 10,4 TB eder. Hareket algılamalı kayıt bu değeri sahneye göre belirgin biçimde düşürebilir.",
        "Kaç günlük kayıt tutulacağı ve disk seçimi için [[arac:guvenlik-kamerasi-depolama-hesapla|Güvenlik Kamerası Depolama Hesaplama]] aracı ile [[bilgi:guvenlik-kamerasi-kac-gun-kayit-yapar|güvenlik kamerası kaç gün kayıt yapar]] yazısı ayrıntılı yol gösterir. Watt, amper ve volt arasındaki dönüşümlere ihtiyaç duyarsanız [[arac:amper-watt-cevir|Amper Watt çevirici]] kullanılabilir."
      ]
    },
    {
      h: "PoE kurulumunda sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca port sayısına bakmak:</strong> 16 PoE portlu switch'in bütçesi 16 cihazı tam güçte beslemeye yetmeyebilir.",
        "<strong>Etiketteki tipik değeri kullanmak:</strong> Hesapta en yüksek tüketim (kızılötesi, ısıtıcı, motor açık) değeri kullanılmalıdır.",
        "<strong>100 metreyi aşmak:</strong> Bağlantı kopmaları ve gece yeniden başlayan kameralar çoğu zaman uzun hattan kaynaklanır.",
        "<strong>Düşük kaliteli kablo:</strong> CCA ve ince kablolarda kayıp ve ısınma artar.",
        "<strong>Pasif ve aktif PoE'yi karıştırmak:</strong> Pasif PoE adaptörü standart cihaza ya da bilgisayara zarar verebilir.",
        "<strong>Kesintisiz güç kaynağını unutmak:</strong> Switch elektrik kesintisinde kapanırsa tüm kameralar da kapanır; UPS hesabı switch'in PoE yükünü de içermelidir."
      ]
    }
  ],
  faq: [
    ["PoE (Power over Ethernet) nedir?", "PoE, ağ kablosu üzerinden veriyle birlikte elektrik taşıyan bir teknolojidir. IP kamera, erişim noktası ve IP telefon gibi cihazlar ayrı bir priz ya da adaptöre gerek kalmadan switch'ten beslenir."],
    ["802.3af, 802.3at ve 802.3bt standartları arasındaki fark nedir?", "Fark port başına verilen güçtedir: 802.3af 15,4 W, 802.3at 30 W, 802.3bt Tip 3 60 W ve Tip 4 90 W verir. Cihaza ulaşan güç sırasıyla 12,95; 25,5; 51 ve 71,3 W'tır."],
    ["Bir PoE switch kaç kamerayı besleyebilir?", "Switch'in toplam PoE bütçesini kamera başına en yüksek tüketime ve pay katsayısına bölerek bulunur. 120 W bütçeli switch, 6,5 W'lık kameralardan %20 payla yaklaşık 15 tanesini besleyebilir; port sayısı da yeterli olmalıdır."],
    ["Güç bütçesi hesaplanırken pay neden bırakılır?", "Kameraların tüketimi gece kızılötesi, kışın ısıtıcı ve hareket sırasında artar. Pay bırakılmazsa en yüksek yük anında cihazlar yeniden başlayabilir; ayrıca ileride eklenecek cihazlar için yer kalmaz."],
    ["PoE kablosu en fazla kaç metre olabilir?", "Ethernet standardına göre switch ile cihaz arasındaki bakır kablo en fazla 100 metre olabilir. Daha uzun mesafede PoE uzatıcı, ara switch ya da fiber hat ile ayrı güç kaynağı kullanılır."],
    ["IP kameraların bant genişliği switch seçimini nasıl etkiler?", "Kayıt cihazına giden trafik tüm kameraların bit hızlarının toplamıdır. 8 kamera 4'er Mbps ile 32 Mbps üretir; canlı izleme ve kaydın birlikte yapıldığı sistemlerde ana bağlantının gigabit olması önerilir."],
    ["PoE injector ne zaman kullanılır?", "PoE desteği olmayan bir switch'e tek tük PoE cihazı eklemek gerektiğinde kullanılır. Injector prizden aldığı gücü veriyle birleştirip kablo üzerinden cihaza iletir; switch'i değiştirmeye gerek kalmaz."],
    ["Pasif PoE ile aktif PoE farkı nedir?", "Aktif PoE güç vermeden önce cihazın uyumlu olup olmadığını kontrol eder; pasif PoE ise kontrol yapmadan sabit gerilim verir. Pasif PoE'nin yanlış cihaza bağlanması ağ kartına zarar verebilir."],
    ["Kayıt cihazı depolama ihtiyacı nasıl hesaplanır?", "Kamera bit hızı, saniye sayısı ve kamera adediyle çarpılıp 8'e bölünerek bayt bulunur. 4 Mbps'lik 8 kamera günde yaklaşık 346 GB, 30 günde yaklaşık 10,4 TB depolama gerektirir."]
  ],
  tools: ["poe-guc-butcesi-hesapla", "ip-kamera-bant-genisligi-hesapla", "guvenlik-kamerasi-depolama-hesapla", "amper-watt-cevir"],
  related: ["guvenlik-kamerasi-kac-gun-kayit-yapar", "watt-amper-volt-iliskisi", "ip-adresi-ve-alt-ag-maskesi-nedir"],
  sources: [
    ["IEEE – 802.3 Ethernet Çalışma Grubu", "https://www.ieee802.org/3/"]
  ]
};
