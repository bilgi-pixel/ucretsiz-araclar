export default {
  slug: "serit-led-adaptor-kac-amper-olmali",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Şerit LED Adaptörü Kaç Amper Olmalı? 12V ve 24V Güç Hesabı",
  pageTitle: "Şerit LED Adaptörü Kaç Amper Olmalı? 12V ve 24V Hesabı",
  description: "Şerit LED adaptörü: toplam watt = metre × W/m, akım = watt ÷ volt, üzerine %20 pay. 5 metre şerit örneği, 12V ile 24V farkı, voltaj düşümü ve elektrik tüketimi.",
  keywords: ["şerit led adaptör hesaplama", "şerit led kaç amper", "5 metre şerit led kaç watt", "12v led trafo seçimi", "şerit led güç kaynağı", "24v şerit led", "led adaptör kaç watt olmalı", "şerit led voltaj düşümü"],
  lead: "Şerit LED adaptörünün akımı, şeridin toplam gücünün çalışma gerilimine bölünmesi ve üzerine yaklaşık <strong>%20 yedek pay</strong> eklenmesiyle bulunur: <strong>amper = (metre × metre başına watt × 1,2) ÷ volt</strong>. Metre başına 14,4 W çeken 5 metrelik 12 V şerit için toplam güç 72 W, gereken adaptör en az 86,4 W ve 7,2 A'dır; bu durumda 100 W (yaklaşık 8,3 A) bir adaptör seçilir. Aynı şeridin 24 V sürümü yarı akımla, 3,6 A ile çalışır. Bu sayfada hesap adımlarını, uzun şeritlerde ışığın neden azaldığını ve elektrik tüketimini bulacaksınız.",
  kisaCevap: [
    "Toplam güç (W) = şerit uzunluğu (m) × metre başına güç (W/m); değer şeridin etiketinde ya da kutusunda yazar.",
    "Akım (A) = güç (W) ÷ gerilim (V); 72 W'lık 12 V şerit 6 A çeker.",
    "Adaptörü hesaplanan gücün en az %20 üzerinde seçin: 72 W × 1,2 = 86,4 W → 100 W'lık adaptör.",
    "Adaptörün çıkış gerilimi şeridin gerilimiyle aynı olmalıdır; 12 V şeride 24 V adaptör bağlanmaz.",
    "24 V şerit aynı güçte yarı akım çeker ve uzun hatlarda daha az voltaj düşümü yaşar.",
    "12 V şeritlerde yaklaşık 5 metreden, 24 V şeritlerde yaklaşık 10 metreden uzun hatlar iki uçtan ya da ara noktalardan beslenir."
  ],
  figure: {
    alt: "5 metre, metre başına 14,4 watt şerit LED için adaptör hesabı: toplam 72 W, yüzde 20 payla 86,4 W; 12 V'ta 7,2 A, 24 V'ta 3,6 A; önerilen 100 W adaptör ve iki uçtan besleme şeması.",
    caption: "Hesap üç adımdır: toplam watt, yedek pay, gerilime bölme. Aynı 72 W'lık şerit 12 V'ta iki kat akım çeker; bu yüzden kablo kesiti ve voltaj düşümü 12 V'ta daha önemlidir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Şerit LED adaptör hesabı (5 m, 14,4 W/m)</text>
  <rect x="20" y="48" width="210" height="80" rx="10" class="sf sb"/>
  <text x="125" y="76" class="sm mid">1. Toplam güç</text>
  <text x="125" y="108" class="lg b mid">5 × 14,4 = 72 W</text>
  <rect x="255" y="48" width="210" height="80" rx="10" class="ps"/>
  <text x="360" y="76" class="sm mid">2. %20 yedek pay</text>
  <text x="360" y="108" class="lg b mid">72 × 1,2 = 86,4 W</text>
  <rect x="490" y="48" width="210" height="80" rx="10" class="p"/>
  <text x="595" y="76" class="sm mid sf">3. Seçilen adaptör</text>
  <text x="595" y="108" class="lg b mid sf">100 W</text>
  <rect x="20" y="146" width="330" height="90" rx="10" class="oks"/>
  <text x="185" y="174" class="b mid">12 V şerit</text>
  <text x="185" y="202" class="mid">86,4 ÷ 12 = 7,2 A (şerit: 6 A)</text>
  <text x="185" y="224" class="sm mid t2">Tek uçtan ~5 m'ye kadar</text>
  <rect x="370" y="146" width="330" height="90" rx="10" class="oks"/>
  <text x="535" y="174" class="b mid">24 V şerit</text>
  <text x="535" y="202" class="mid">86,4 ÷ 24 = 3,6 A (şerit: 3 A)</text>
  <text x="535" y="224" class="sm mid t2">Tek uçtan ~10 m'ye kadar</text>
  <text x="20" y="270" class="b">Uzun şeritte iki uçtan besleme</text>
  <rect x="20" y="286" width="110" height="56" rx="8" class="p"/>
  <text x="75" y="319" class="b mid sf">Adaptör</text>
  <line x1="130" y1="300" x2="190" y2="300" class="sp sw" fill="none"/>
  <line x1="130" y1="300" x2="130" y2="372" class="sp sw" fill="none"/>
  <line x1="130" y1="372" x2="680" y2="372" class="sp sw" fill="none"/>
  <line x1="680" y1="372" x2="680" y2="314" class="sp sw" fill="none"/>
  <rect x="190" y="304" width="490" height="20" rx="4" class="a"/>
  <g class="sf"><circle cx="215" cy="314" r="5"/><circle cx="265" cy="314" r="5"/><circle cx="315" cy="314" r="5"/><circle cx="365" cy="314" r="5"/><circle cx="415" cy="314" r="5"/><circle cx="465" cy="314" r="5"/><circle cx="515" cy="314" r="5"/><circle cx="565" cy="314" r="5"/><circle cx="615" cy="314" r="5"/><circle cx="660" cy="314" r="5"/></g>
  <text x="435" y="296" class="sm mid">Şerit (her iki ucundan beslenir)</text>
  <text x="405" y="398" class="sm mid t2">Ayrı besleme kablosu, şeridin karşı ucundaki voltaj düşümünü azaltır</text>
</svg>`
  },
  sections: [
    {
      h: "Şerit LED neden adaptörle çalışır?",
      p: [
        "Şerit LED'lerin çoğu evdeki 230 V alternatif akımla değil, <strong>düşük gerilimli doğru akımla</strong> çalışır. En yaygın gerilimler 12 V ve 24 V'tur; USB ile beslenen kısa şeritlerde 5 V da kullanılır. Adaptör (halk arasında trafo ya da güç kaynağı) şebeke gerilimini şeridin ihtiyaç duyduğu sabit doğru gerilime çevirir.",
        "Adaptör seçiminde iki değer belirleyicidir: <strong>çıkış gerilimi</strong> şeritle birebir aynı olmalı, <strong>çıkış gücü veya akımı</strong> ise şeridin çektiğinden yeterince büyük olmalıdır. Gerilim yanlışsa şerit yanmaz ya da kısa sürede bozulur; güç yetersizse adaptör ısınır, ışık titreyebilir ve cihaz ömrü kısalır."
      ]
    },
    {
      h: "Watt'tan ampere nasıl geçilir? Temel formül",
      p: [
        "Doğru akım devrelerinde güç, gerilim ile akımın çarpımıdır. Bu ilişki şerit LED hesabının temelidir ve ayrıntılı olarak [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazısında anlatılır."
      ],
      formula: "Toplam güç (W) = uzunluk (m) × metre başına güç (W/m)\nAkım (A) = güç (W) ÷ gerilim (V)\nÖnerilen adaptör gücü = toplam güç × (1 + yedek pay)\nÖnerilen adaptör akımı = önerilen güç ÷ gerilim",
      after: [
        "Metre başına güç şeridin etiketinde, kutusunda ya da makarasının üzerinde W/m olarak yazar. Bu bilgiye ulaşamıyorsanız tahmin yürütmek yerine satıcıdan öğrenin; aynı görünen şeritler arasında üç kat güç farkı olabilir. Bazı ürünlerde güç yalnızca makaranın tamamı için verilir: 5 metrelik makarada \"72 W\" yazıyorsa metre başına güç 72 ÷ 5 = 14,4 W'tır. Şeridi kısaltırsanız toplam güç de kesilen uzunlukla orantılı olarak azalır; adaptörü kullanacağınız gerçek uzunluğa göre seçin ve hesabı her zaman takılacak son ölçüyle yapın; montajdan sonra eklenecek parçaları da baştan hesaba katın. Birim çevirisi için [[arac:amper-watt-cevir|Amper Watt Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "5 metre şerit LED kaç watt çeker?",
      p: [
        "Toplam güç tamamen şeridin metre başına gücüne bağlıdır. Piyasadaki şeritler LED yoğunluğuna ve çip büyüklüğüne göre çok farklı güçlerde olabilir. Aşağıdaki tablo sık görülen bazı metre başına güç değerleri için 5 metrelik şeridin hesabını gösterir; kendi şeridinizin etiketindeki değeri kullanın."
      ],
      table: {
        head: ["Metre başına güç", "5 m toplam", "12 V akım", "%20 paylı 12 V adaptör", "%20 paylı 24 V adaptör"],
        rows: [
          ["4,8 W/m", "24 W", "2,0 A", "28,8 W / 2,4 A", "28,8 W / 1,2 A"],
          ["7,2 W/m", "36 W", "3,0 A", "43,2 W / 3,6 A", "43,2 W / 1,8 A"],
          ["9,6 W/m", "48 W", "4,0 A", "57,6 W / 4,8 A", "57,6 W / 2,4 A"],
          ["14,4 W/m", "72 W", "6,0 A", "86,4 W / 7,2 A", "86,4 W / 3,6 A"],
          ["19,2 W/m", "96 W", "8,0 A", "115,2 W / 9,6 A", "115,2 W / 4,8 A"]
        ],
        caption: "24 V sütunu aynı güçteki 24 V şerit içindir; 12 V şeride 24 V adaptör bağlanmaz."
      }
    },
    {
      h: "Çözümlü örnek: mutfak dolabı altı aydınlatma",
      ol: [
        "Mutfak dolabının altına toplam 5 metre, metre başına 14,4 W olan 12 V şerit takılacak.",
        "Toplam güç: 5 × 14,4 = 72 W. Şeridin çektiği akım: 72 ÷ 12 = 6 A.",
        "%20 yedek pay: 72 × 1,2 = 86,4 W; akım karşılığı 86,4 ÷ 12 = 7,2 A.",
        "Piyasadaki standart adaptör güçlerinden bir üstü seçilir: 100 W (12 V'ta yaklaşık 8,3 A).",
        "Şerit 5 metre olduğu için tek uçtan beslenebilir; ancak kablo mesafesi uzunsa yeterli kesitte kablo kullanılır.",
        "Şerit iki parçaya bölünmüşse (ör. 3 m + 2 m) her iki parça adaptöre paralel bağlanır; toplam güç değişmez."
      ],
      after: [
        "Bu adımları [[arac:serit-led-guc-kaynagi-hesapla|Şerit LED Güç Kaynağı Hesaplama aracı]] uzunluk, metre başına güç, gerilim ve yedek pay değerleriyle tek seferde yapar; şerit tek uçtan besleme için uzunsa uyarı da verir."
      ]
    },
    {
      h: "Adaptör seçerken neden %20 pay bırakılır?",
      p: [
        "Adaptörün etiketindeki güç, çoğu zaman en uygun koşullarda sürekli verebileceği <strong>en yüksek</strong> değerdir. Tam kapasitede çalışan bir adaptör daha fazla ısınır, verimi düşer ve ömrü kısalır. Ayrıca kapalı dolap içi, asma tavan boşluğu gibi havasız yerlerde ısınma daha da artar.",
        "%20 pay, adaptörün yaklaşık %80 yükte çalışmasını sağlar ve bu hem güvenli hem verimli bir çalışma aralığıdır. Sıcak ortamlarda ya da adaptör kapalı bir kutudaysa payı %25–30'a çıkarmak düşünülebilir. Pay bırakmanın bir faydası da ileride şeride birkaç parça eklendiğinde adaptörü değiştirmek zorunda kalmamaktır."
      ]
    },
    {
      h: "12V ve 24V şerit LED arasındaki fark nedir?",
      p: [
        "Aynı ışık gücündeki iki şeritten 24 V olanı, 12 V olanın yarısı kadar akım çeker. Akım yarıya indiğinde kablolardaki kayıp ve voltaj düşümü belirgin biçimde azalır. Bu yüzden 24 V şeritler uzun hatlarda, tavan çevresi ve merdiven gibi geniş uygulamalarda daha rahat kullanılır."
      ],
      table: {
        head: ["Özellik", "12 V şerit", "24 V şerit"],
        rows: [
          ["Aynı güçte akım", "2 kat", "1 kat"],
          ["Tek uçtan beslemede pratik uzunluk", "Yaklaşık 5 m", "Yaklaşık 10 m"],
          ["Kesme aralığı", "Genellikle daha kısa", "Genellikle daha uzun"],
          ["Kablo kesiti ihtiyacı", "Daha kalın", "Daha ince yeterli olabilir"],
          ["Uygun kullanım", "Kısa hatlar, mobilya, araç içi", "Uzun hatlar, tavan, dış cephe"]
        ],
        caption: "Uzunluk sınırları yaygın uygulama değerleridir; üreticinin önerdiği en uzun besleme mesafesine uyun."
      }
    },
    {
      h: "Uzun şeritte ışık neden sona doğru azalır?",
      p: [
        "Şeridin üzerindeki ince bakır yollar ve besleme kabloları küçük de olsa direnç gösterir. Akım bu dirençten geçerken gerilimin bir kısmı kaybolur; buna <strong>voltaj düşümü</strong> denir. Şerit uzadıkça ve akım arttıkça kayıp büyür. Sonuçta adaptöre yakın uçta 12 V olan gerilim, uzak uçta belirgin biçimde düşebilir ve LED'ler daha sönük yanar, beyaz ışık renk değiştirebilir.",
        "Çözüm, şeridi iki uçtan ya da birkaç ara noktadan ayrı kablolarla beslemek, adaptörü şeridin ortasına yakın yerleştirmek, yeterli kesitte besleme kablosu kullanmak ya da 24 V şeride geçmektir. Kablo boyunca kaybı [[arac:gerilim-dusumu-hesapla|Gerilim Düşümü Hesaplama aracı]] ile tahmin edebilir, kablo seçimi için [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Birden fazla şerit tek adaptöre bağlanabilir mi?",
      p: [
        "Evet, toplam güç adaptörün paylı kapasitesini aşmadığı sürece bağlanabilir. Şeritler adaptöre <strong>paralel</strong> bağlanmalıdır: her şeridin artı ucu adaptörün artısına, eksi ucu eksisine gider. Şeritleri uç uca çok uzun bir hat olarak eklemek yerine her birini adaptörden ayrı kabloyla beslemek voltaj düşümünü azaltır.",
        "Örneğin 3 m ve 4 m'lik, metre başına 9,6 W olan iki 12 V şerit için toplam güç 7 × 9,6 = 67,2 W, paylı ihtiyaç 80,6 W'tır; 100 W'lık bir adaptör yeterlidir. Dimmer ya da renk kumandası kullanıyorsanız onun da taşıyabileceği akım sınırına bakın; kumanda, adaptörden önce zayıf halka olabilir."
      ]
    },
    {
      h: "Şerit LED elektrik faturasını ne kadar artırır?",
      p: [
        "Şeridin tükettiği enerji, gücü ile çalıştığı sürenin çarpımıdır; buna adaptörün kendi kaybı eklenir. 72 W'lık şerit günde 5 saat yanarsa günlük 0,36 kWh, ayda yaklaşık 10,8 kWh tüketir. Adaptör verimi %85–90 civarında kabul edilirse prizden çekilen enerji ayda yaklaşık 12 kWh olur."
      ],
      formula: "Aylık tüketim (kWh) = güç (W) × günlük saat × 30 ÷ 1.000\n72 × 5 × 30 ÷ 1.000 = 10,8 kWh\nAdaptör kaybıyla ≈ 10,8 ÷ 0,9 = 12 kWh\nAylık maliyet = kWh × birim fiyat (faturanızdaki değer)",
      after: [
        "Birim fiyatı faturanızdan alarak maliyeti [[arac:cihaz-elektrik-maliyeti-hesapla|Cihaz Elektrik Maliyeti aracı]] ile hesaplayabilirsiniz. Faturanın nasıl oluştuğunu [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası]] yazısı anlatır."
      ],
      note: "Güvenlik: Adaptörün 230 V giriş tarafına ait bağlantıları ve sabit tesisat değişikliklerini yetkili bir elektrikçiye yaptırın. Adaptörü havalandırması olan bir yere koyun, üzerini örtmeyin; ıslak alanlarda yalnızca o ortama uygun koruma sınıfına sahip şerit ve adaptör kullanın."
    }
  ],
  faq: [
    ["Şerit LED için kaç amper adaptör gerekir?", "Şeridin toplam gücünü metre × metre başına watt ile bulun, yüzde 20 pay için 1,2 ile çarpın ve gerilime bölün. Metre başına 14,4 W olan 5 metrelik 12 V şerit için 86,4 ÷ 12 = 7,2 A gerekir; 100 W'lık yaklaşık 8,3 A'lık adaptör uygundur."],
    ["5 metre şerit LED kaç watt çeker?", "Metre başına güce bağlıdır: 4,8 W/m şerit 24 W, 9,6 W/m şerit 48 W, 14,4 W/m şerit 72 W çeker. Metre başına güç şeridin etiketinde ya da kutusunda yazar; aynı görünen şeritler arasında büyük fark olabilir."],
    ["12V ve 24V şerit LED arasındaki fark nedir?", "Aynı güçte 24 V şerit 12 V şeridin yarısı kadar akım çeker; bu yüzden uzun hatlarda voltaj düşümü daha azdır ve tek uçtan yaklaşık 10 metreye kadar beslenebilir. 12 V şeritler kısa hatlarda ve mobilya içinde yaygındır."],
    ["Adaptör seçerken neden yüzde 20 pay bırakılır?", "Adaptörün etiketindeki güç en yüksek sürekli değerdir; tam yükte çalışan adaptör ısınır, verimi düşer ve ömrü kısalır. Yüzde 20 pay adaptörün yaklaşık yüzde 80 yükte çalışmasını sağlar; sıcak ve kapalı ortamlarda pay artırılabilir."],
    ["Uzun şeritte ışık neden sona doğru azalır?", "Şeridin bakır yolları ve kablolar direnç gösterdiği için akım geçtikçe gerilim düşer; uzak uçta LED'ler sönük yanar ya da renk değiştirir. Şeridi iki uçtan beslemek, kalın kablo kullanmak ya da 24 V şeride geçmek sorunu azaltır."],
    ["Watt'tan ampere nasıl geçilir?", "Doğru akımda akım, gücün gerilime bölünmesiyle bulunur: amper = watt ÷ volt. 72 W'lık bir şerit 12 V'ta 6 A, 24 V'ta 3 A çeker. Ters yönde güç, akım ile gerilimin çarpımıdır."],
    ["Birden fazla şerit tek adaptöre bağlanabilir mi?", "Evet, şeritlerin toplam gücü adaptörün yüzde 20 paylı kapasitesini aşmıyorsa bağlanabilir. Şeritler paralel bağlanmalı ve mümkünse her biri adaptörden ayrı kabloyla beslenmelidir. Dimmer ya da kumandanın akım sınırını da kontrol edin."],
    ["Şerit LED elektrik faturasını ne kadar artırır?", "Tüketim, güç ile çalışma süresinin çarpımıdır. 72 W'lık şerit günde 5 saat yanarsa ayda yaklaşık 10,8 kWh, adaptör kaybıyla yaklaşık 12 kWh tüketir. Maliyet için bu değeri faturanızdaki birim fiyatla çarpın."],
    ["12 V şeride 24 V adaptör bağlanırsa ne olur?", "Bağlanmamalıdır. Şeridin tasarlandığı gerilimin iki katı uygulanırsa LED'ler aşırı akım çeker, hızla ısınır ve kalıcı olarak bozulabilir; yangın riski de doğabilir. Adaptörün çıkış gerilimi her zaman şeridin etiketindeki gerilimle aynı olmalıdır."]
  ],
  tools: ["serit-led-guc-kaynagi-hesapla", "amper-watt-cevir", "gerilim-dusumu-hesapla", "cihaz-elektrik-maliyeti-hesapla"],
  related: ["watt-amper-volt-iliskisi", "kablo-kesiti-nasil-secilir", "led-direnci-nasil-hesaplanir", "oda-icin-kac-lumen-gerekir"],
  uyari: "elektrik tesisatı ve 230 V bağlantıları için yetkili bir elektrikçiye başvurun"
};
