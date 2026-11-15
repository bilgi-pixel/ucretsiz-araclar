export default {
  slug: "elektrik-faturasi-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Elektrik Faturası Nasıl Hesaplanır? Cihazlar Ne Kadar Elektrik Harcar",
  pageTitle: "Elektrik Faturası Hesaplama: kWh, Cihaz Tüketimi ve Limit",
  description: "Elektrik faturası tüketilen kWh ile birim fiyatın çarpımıdır. Watt-kWh farkı, cihazların aylık tüketimi, yıllık limit, fatura kalemleri ve çözümlü örnekler.",
  keywords: ["elektrik faturası hesaplama", "1 kwh kaç tl", "cihaz elektrik tüketimi", "buzdolabı ne kadar elektrik yakar", "elektrik kademe sınırı", "kwh nedir", "elektrik tasarrufu", "klima saatte kaç kwh"],
  lead: "Elektrik faturası, dönem içinde tükettiğiniz <strong>kilovatsaat (kWh)</strong> miktarının faturanızdaki birim fiyatla çarpılmasıyla hesaplanır; vergiler bu tutarın üzerine eklenir. Bir cihazın tüketimini bulmak için gücünü (watt) çalışma saatiyle çarpıp 1.000'e bölmeniz yeterlidir. Bu sayfada watt ile kWh farkını, evdeki cihazların aylık tüketimini, fatura kalemlerini, mesken abonelerindeki yıllık tüketim limitini ve adım adım çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Cihaz tüketimi: kWh = güç (W) × kullanım süresi (saat) ÷ 1.000.",
    "Fatura tutarı yaklaşık olarak toplam kWh × vergiler dahil birim fiyat (TL/kWh) ile bulunur.",
    "1 kWh, 1.000 watt gücündeki bir cihazın 1 saat boyunca harcadığı enerjidir.",
    "Evde en çok elektriği ısıtan ve soğutan cihazlar harcar: elektrikli ısıtıcı, termosifon, klima, fırın ve kurutma makinesi.",
    "2026 yılında mesken aboneleri için yıllık tüketim limiti 4.000 kWh'tir; aşılırsa daha yüksek son kaynak tarifesi uygulanabilir.",
    "Bir LED ampul, aynı ışığı veren eski akkor ampule göre yaklaşık %80–85 daha az elektrik harcar."
  ],
  figure: {
    alt: "Bir evin aylık elektrik tüketiminin cihazlara göre dağılımını gösteren yatay çubuk grafik: klima 216 kWh, buzdolabı 30 kWh, çamaşır makinesi 12 kWh, televizyon 15 kWh, LED aydınlatma 11 kWh; toplam ve örnek fatura hesabı.",
    caption: "Örnek ev için aylık tüketim. Yaz aylarında günde 6 saat çalışan klima tek başına diğer cihazların toplamından fazla harcar. Tutarlar örnek birim fiyat (3,00 TL/kWh) ile hesaplanmıştır; kendi faturanızdaki fiyatı kullanın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir ayda hangi cihaz kaç kWh harcar?</text>
  <text x="360" y="52" class="sm mid mu">kWh = watt × saat ÷ 1.000 · örnek ev, yaz ayı</text>
  <g class="sm">
    <text x="170" y="92" class="end b">Klima (1.200 W)</text>
    <rect x="182" y="76" width="432" height="24" rx="4" class="p"/>
    <text x="624" y="93" class="b">216 kWh</text>
    <text x="170" y="134" class="end b">Buzdolabı</text>
    <rect x="182" y="118" width="60" height="24" rx="4" class="ps"/>
    <text x="252" y="135" class="b">30 kWh</text>
    <text x="170" y="176" class="end b">Televizyon (100 W)</text>
    <rect x="182" y="160" width="30" height="24" rx="4" class="ps"/>
    <text x="222" y="177" class="b">15 kWh</text>
    <text x="170" y="218" class="end b">Çamaşır (12 yıkama)</text>
    <rect x="182" y="202" width="24" height="24" rx="4" class="ps"/>
    <text x="216" y="219" class="b">12 kWh</text>
    <text x="170" y="260" class="end b">LED aydınlatma</text>
    <rect x="182" y="244" width="22" height="24" rx="4" class="oks"/>
    <text x="214" y="261" class="b">11 kWh</text>
  </g>
  <line x1="182" y1="66" x2="182" y2="280" class="st" fill="none"/>
  <rect x="20" y="296" width="680" height="108" rx="10" class="sf sb"/>
  <rect x="20" y="296" width="8" height="108" class="p"/>
  <text x="44" y="324" class="b">Örnek fatura hesabı</text>
  <text x="44" y="350" class="sm t2">Toplam: 216 + 30 + 15 + 12 + 11 = 284 kWh</text>
  <text x="44" y="372" class="sm t2">284 kWh × 3,00 TL (örnek birim fiyat) = 852 TL</text>
  <text x="44" y="394" class="sm p b">Klimanın payı: 216 × 3,00 = 648 TL (faturanın %76'sı)</text>
</svg>`
  },
  sections: [
    {
      h: "Watt ve kWh farkı nedir?",
      p: [
        "<strong>Watt (W)</strong> bir cihazın gücünü, yani belirli bir anda ne kadar hızlı enerji çektiğini gösterir. Cihazın etiketinde ya da arka yüzündeki plakada yazan değer budur: 9 W LED ampul, 2.000 W su ısıtıcısı, 1.200 W klima gibi. Watt tek başına faturayı belirlemez; cihazın ne kadar süre çalıştığı da hesaba girmelidir.",
        "<strong>Kilovatsaat (kWh)</strong> ise harcanan enerji miktarıdır ve faturanızda ödediğiniz birim budur. 1 kWh, 1.000 watt gücündeki bir cihazın 1 saat çalışmasıyla harcanan enerjiye eşittir. Aynı enerjiyi 100 W'lık bir televizyon 10 saatte, 2.000 W'lık bir ütü ise yarım saatte harcar.",
        "Kısaca watt hızı, kWh ise gidilen yolu anlatır. Bir otomobilin hızı ile kat ettiği kilometre arasındaki fark gibi düşünebilirsiniz. Birimleri birbirine çevirmeniz gerekirse [[arac:kw-watt-cevir|kW Watt Çevirici]] işinizi kolaylaştırır."
      ]
    },
    {
      h: "Cihaz tüketimi ve fatura formülü",
      p: [
        "Bir cihazın aylık tüketimini bulmak için önce günlük kullanım süresini tahmin edin, sonra gücüyle çarpın. Sürekli çalışmayan cihazlarda (buzdolabı, klima, kombi pompası) etiket değeri en yüksek güçtür; gerçek ortalama tüketim bunun altında kalır. Bu tür cihazlar için enerji etiketindeki yıllık kWh değeri daha güvenilirdir."
      ],
      formula: "Günlük kWh = güç (W) × günlük kullanım (saat) ÷ 1.000\nAylık kWh = günlük kWh × gün sayısı\nCihazın aylık maliyeti = aylık kWh × birim fiyat (TL/kWh)",
      ul: [
        "<strong>Birim fiyatı nereden bulursunuz?</strong> Son faturanızdaki toplam tutarı (vergiler dahil) toplam kWh'e bölün. Bu, kendi aboneliğinize özel \"gerçek\" birim fiyattır ve hesaplarınızda en doğru sonucu verir.",
        "<strong>Gün sayısı:</strong> Faturalar okuma tarihleri arasındaki gün sayısına göre düzenlenir; 28 ile 33 gün arasında değişebilir. Aylık karşılaştırma yaparken günlük ortalamaya bakmak daha adil sonuç verir."
      ]
    },
    {
      h: "Çözümlü örnekler: klima, buzdolabı, su ısıtıcı",
      p: [
        "Aşağıdaki örneklerde birim fiyat olarak <strong>3,00 TL/kWh</strong> kullanılmıştır. Bu bir <em>örnek tutardır</em>; tarifeler dönem dönem değiştiği için hesaplamayı kendi faturanızdaki birim fiyatla tekrarlayın."
      ],
      ol: [
        "<strong>Klima:</strong> 1.200 W gücündeki bir klima yazın günde ortalama 6 saat çalışsın. Günlük tüketim 1.200 × 6 ÷ 1.000 = 7,2 kWh, aylık tüketim 7,2 × 30 = 216 kWh olur. Maliyet 216 × 3,00 = 648 TL'dir. İnverter klimalar ayarlanan sıcaklığa ulaşınca gücü düşürdüğü için gerçek değer bunun altında kalabilir.",
        "<strong>Buzdolabı:</strong> Enerji etiketinde yıllık 365 kWh yazan bir buzdolabı günde ortalama 1 kWh, ayda yaklaşık 30 kWh harcar. Aylık maliyeti 30 × 3,00 = 90 TL'dir. Buzdolabı sürekli prizde olduğu için etiketteki yıllık değer, watt üzerinden yapılan hesaptan daha gerçekçidir.",
        "<strong>Su ısıtıcı (kettle):</strong> 2.000 W'lık bir ısıtıcı her kullanımda 4 dakika çalışsın ve günde 5 kez kullanılsın. Günlük süre 20 dakika = 0,333 saattir. 2.000 × 0,333 ÷ 1.000 = 0,67 kWh/gün, ayda yaklaşık 20 kWh ve 60 TL eder.",
        "<strong>Bekleme modu:</strong> 3 W bekleme gücü çeken bir televizyon kutusu yılda 3 × 24 × 365 ÷ 1.000 = 26,3 kWh harcar. Tek başına küçük görünse de evde bekleme modunda duran 8–10 cihaz yıllık faturaya birkaç yüz TL ekleyebilir."
      ]
    },
    {
      h: "Hangi ev aleti ne kadar elektrik harcar?",
      p: [
        "Aşağıdaki tablo yaygın ev aletleri için tipik güç ve kullanım değerlerini gösterir. Değerler modele, enerji sınıfına ve kullanım alışkanlığına göre değişir; cihazınızın etiketine bakarak kendi hesabınızı yapın."
      ],
      table: {
        head: ["Cihaz", "Tipik güç", "Örnek kullanım", "Aylık tüketim (yaklaşık)"],
        rows: [
          ["Elektrikli ısıtıcı (radyatör)", "2.000 W", "Günde 4 saat", "240 kWh"],
          ["Termosifon", "2.000–3.000 W", "Günde 1,5 saat ısıtma", "90–135 kWh"],
          ["Klima (12.000 BTU)", "1.000–1.300 W", "Günde 6 saat", "180–235 kWh"],
          ["Elektrikli fırın", "2.000–2.500 W", "Haftada 4 kez, 1 saat", "35–45 kWh"],
          ["Çamaşır kurutma", "2.000–2.500 W", "Haftada 3 kez", "25–35 kWh"],
          ["Buzdolabı (A sınıfı)", "100–150 W", "Sürekli, kompresör aralıklı", "20–35 kWh"],
          ["Bulaşık makinesi", "1.800 W", "Haftada 5 program", "18–22 kWh"],
          ["Çamaşır makinesi (40 °C)", "2.000 W", "Haftada 3 yıkama", "10–13 kWh"],
          ["Televizyon (LED, 50 inç)", "80–120 W", "Günde 5 saat", "12–18 kWh"],
          ["Dizüstü bilgisayar", "45–65 W", "Günde 6 saat", "8–12 kWh"],
          ["LED ampul (9 W)", "9 W", "8 ampul, günde 5 saat", "11 kWh"]
        ],
        caption: "Isıtma ve soğutma yapan cihazlar listenin başındadır; elektronik cihazlar ve aydınlatma ise faturanın küçük bir bölümünü oluşturur."
      },
      after: [
        "Kendi cihazlarınızı tek tek girip toplam tüketimi görmek için [[arac:elektrik-tuketim-hesapla|Elektrik Tüketim Hesaplama]] aracını, tek bir cihazın günlük-aylık-yıllık maliyetine odaklanmak için [[arac:cihaz-elektrik-maliyeti-hesapla|Cihaz Elektrik Maliyeti Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Elektrik faturasındaki kalemler",
      p: [
        "Faturanızın alt kısmında toplam tutarın nasıl oluştuğu kalem kalem yazar. Kalemlerin adları dağıtım bölgesine ve tarife türüne göre küçük farklılık gösterse de mantık aynıdır: önce enerjinin ve şebekenin bedeli hesaplanır, sonra vergiler eklenir."
      ],
      ul: [
        "<strong>Enerji bedeli (aktif enerji):</strong> Tükettiğiniz kWh ile enerji birim fiyatının çarpımıdır. Faturanın en büyük kalemidir.",
        "<strong>Dağıtım bedeli:</strong> Elektriğin evinize kadar taşınmasını sağlayan şebekenin kullanım ücretidir; o da kWh başına hesaplanır. Kayıp-kaçak gibi şebeke maliyetleri bu kalemin içindedir.",
        "<strong>Elektrik tüketim vergisi:</strong> Belediyeler adına alınan vergidir ve meskenlerde enerji bedeli üzerinden %5 olarak uygulanır.",
        "<strong>KDV:</strong> Tüm kalemlerin toplamı üzerinden hesaplanır. Abone grubuna göre uygulanan oran faturanızda ayrıca gösterilir.",
        "<strong>Gecikme bedeli ve mahsuplar:</strong> Önceki dönemden kalan borç, gecikme zammı ya da düzeltme tutarları varsa ayrı satırda yer alır."
      ],
      after: [
        "Pratik hesaplarda bu kalemleri tek tek uğraşmak yerine, faturadaki ödenecek tutarı toplam kWh'e bölerek bulduğunuz \"her şey dahil\" birim fiyatı kullanmak yeterince doğru sonuç verir."
      ]
    },
    {
      h: "Yıllık tüketim limiti ve kademe sınırı ne anlama gelir?",
      p: [
        "Mesken (konut) abonelerinde uygulanan düşük tarife, belirli bir yıllık tüketime kadar geçerlidir. Enerji Piyasası Düzenleme Kurumu (EPDK) bu sınırı her yıl belirler. 31 Ekim 2025 tarihli Resmî Gazete'de yayımlanan kurul kararıyla 2026 yılı için mesken abonelerinin yıllık tüketim limiti <strong>4.000 kWh</strong> olarak belirlenmiştir; bu, ayda ortalama yaklaşık 333 kWh demektir.",
        "Yıllık tüketimi bu limiti aşan aboneler, tedarikçilerinden ikili anlaşmayla elektrik almadıkları sürece <strong>son kaynak tedarik tarifesi</strong> kapsamına girebilir. Bu tarifede birim fiyat piyasa koşullarına göre belirlenir ve genellikle düşük tarifeden belirgin biçimde yüksektir. Limit ve uygulama esasları yıldan yıla değişebildiği için güncel değeri EPDK duyurularından ya da faturanızdaki bilgilendirme notundan takip edin.",
        "Kendi yıllık tüketiminizi görmek için son 12 faturanızdaki kWh değerlerini toplayın. Elektrikli ısıtma, ısı pompası ya da elektrikli araç şarjı kullanan evler bu sınıra en hızlı yaklaşan gruptur."
      ]
    },
    {
      h: "Elektrik tasarrufu: en çok fark yaratan adımlar",
      p: [
        "Tasarrufta önce tablonun başındaki cihazlara odaklanmak gerekir. Bir LED ampulü kapatmak ile klimayı 1 derece yükseltmek arasında onlarca kat fark vardır."
      ],
      ul: [
        "<strong>Klima:</strong> Soğutmada 24–26 °C aralığı hem konforlu hem verimlidir. Filtreleri düzenli temizlemek ve güneş alan pencereleri gün içinde kapalı tutmak çalışma süresini kısaltır.",
        "<strong>Termosifon:</strong> Sürekli açık bırakmak yerine kullanım saatinden önce açmak ve termostatı 50–55 °C civarında tutmak bekleme kayıplarını azaltır.",
        "<strong>Çamaşır ve bulaşık:</strong> Makineyi tam doldurup düşük sıcaklık ya da eko programını seçmek enerjinin büyük kısmını harcayan su ısıtma ihtiyacını azaltır.",
        "<strong>Aydınlatma:</strong> 60 W akkor ampul yerine 8–9 W LED kullanmak aynı ışık için %85 civarında daha az elektrik harcar. Kaç ayda kendini ödeyeceğini [[arac:led-tasarruf-hesapla|LED Tasarruf Hesaplama]] aracıyla görebilirsiniz.",
        "<strong>Bekleme modu:</strong> Televizyon, uydu alıcısı, oyun konsolu ve hoparlörleri anahtarlı uzatma kablosuna bağlayıp geceleri kapatmak yılda onlarca kWh tasarruf sağlar.",
        "<strong>Buzdolabı:</strong> Arkasında hava boşluğu bırakmak, kapağı uzun süre açık tutmamak ve sıcak yemeği soğumadan koymamak kompresörün çalışma süresini düşürür."
      ]
    },
    {
      h: "Sık yapılan hesaplama hataları",
      ul: [
        "<strong>Watt ile kWh'i karıştırmak:</strong> \"Klimam 1.200 watt, demek ki 1.200 TL\" gibi bir sonuç yanlıştır. Güç, süreyle çarpılıp 1.000'e bölünmeden faturaya dönüşmez.",
        "<strong>Etiketteki en yüksek gücü sürekli saymak:</strong> Buzdolabı, klima ve fırın termostatla çalışır; etiket gücünü 24 saatle çarpmak gerçeğin birkaç katı sonuç verir.",
        "<strong>Vergisiz fiyatla hesaplamak:</strong> Tarife tablolarındaki birim fiyat çoğu zaman vergiler hariçtir. Bütçe yaparken vergiler dahil birim fiyatı kullanın.",
        "<strong>Okuma dönemini görmezden gelmek:</strong> 33 günlük bir faturayı 28 günlük önceki faturayla doğrudan karşılaştırmak, tüketiminiz artmış gibi gösterebilir.",
        "<strong>Bekleme tüketimini sıfır saymak:</strong> Tek tek küçük olan bekleme güçleri yıl boyunca birikerek kayda değer bir tutara ulaşır."
      ]
    },
    {
      h: "Araçla adım adım fatura tahmini",
      ol: [
        "Son faturanızdan vergiler dahil birim fiyatı bulun: ödenecek tutar ÷ toplam kWh.",
        "[[arac:elektrik-tuketim-hesapla|Elektrik Tüketim Hesaplama]] aracını açın ve evdeki cihazları güç (W) ve günlük kullanım saatiyle ekleyin.",
        "Buzdolabı gibi sürekli çalışan cihazlar için enerji etiketindeki yıllık kWh değerini 365'e bölerek günlük değeri girin.",
        "Birim fiyat alanına ilk adımda bulduğunuz değeri yazın; araç günlük, aylık ve yıllık tüketimi ve tutarı gösterir.",
        "Sonucu gerçek faturanızla karşılaştırın. Büyük bir fark varsa kullanım sürelerini gözden geçirin; çoğu zaman ısıtma ya da sıcak su cihazlarının süresi eksik tahmin edilmiştir."
      ],
      p: [
        "Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz cihaz listesi ve tutarlar hiçbir sunucuya gönderilmez."
      ]
    }
  ],
  faq: [
    ["Elektrik faturası nasıl hesaplanır?", "Dönem içinde tüketilen kWh miktarı, enerji ve dağıtım birim fiyatlarıyla çarpılır; bu tutara elektrik tüketim vergisi ve KDV eklenir. Pratikte faturadaki toplam tutarı kWh'e bölüp bulduğunuz birim fiyatla tahmin yapabilirsiniz."],
    ["1 kWh kaç TL?", "1 kWh'in fiyatı abone grubuna, tarife türüne ve döneme göre değişir ve EPDK kararlarıyla güncellenir. Kendi fiyatınızı bulmak için son faturanızdaki ödenecek tutarı toplam tüketilen kWh miktarına bölmeniz yeterlidir."],
    ["Elektrikte kademe sınırı nedir?", "Mesken aboneleri için düşük tarifenin geçerli olduğu yıllık tüketim sınırıdır. 2026 yılı için 4.000 kWh olarak belirlenmiştir. Bu sınırı aşan aboneler daha yüksek fiyatlı son kaynak tarifesine geçebilir, bu yüzden yıllık toplamınızı takip etmek önemlidir."],
    ["Hangi ev aleti en çok elektrik harcar?", "Isı üreten ya da ortamı soğutan cihazlar en çok elektriği harcar. Elektrikli ısıtıcı, termosifon, klima, elektrikli fırın ve kurutma makinesi genellikle listenin başındadır; televizyon, bilgisayar ve LED aydınlatma görece azdır."],
    ["Klima saatte kaç kWh harcar?", "12.000 BTU'luk tipik bir ev kliması tam güçte saatte yaklaşık 1,0 ile 1,3 kWh harcar. İnverter modeller hedef sıcaklığa ulaştıktan sonra gücü düşürdüğü için gün boyu ortalama tüketim bunun altında kalabilir."],
    ["Watt ve kWh farkı nedir?", "Watt bir cihazın anlık gücünü, kWh ise belirli bir sürede harcanan toplam enerjiyi ifade eder. 1.000 watt gücündeki bir cihaz bir saat çalıştığında 1 kWh enerji harcar ve faturada ödediğiniz birim kWh'tir."],
    ["Elektrik faturasındaki kalemler nelerdir?", "Temel kalemler enerji bedeli, dağıtım bedeli, elektrik tüketim vergisi ve KDV'dir. Varsa geçmiş dönem borcu, gecikme zammı veya düzeltme tutarları ayrı satırlarda gösterilir ve toplam ödenecek tutara eklenir."],
    ["LED ampul ne kadar tasarruf sağlar?", "60 W'lık bir akkor ampulün yerine aynı ışığı veren 8–9 W'lık LED kullanıldığında tüketim yaklaşık %85 azalır. Günde 5 saat yanan bir ampulde bu fark yılda yaklaşık 93 kWh eder."],
    ["Bekleme modundaki cihazlar elektrik harcar mı?", "Evet. Bekleme modundaki televizyon, modem, uydu alıcısı ve şarj adaptörleri birkaç watt çeker. Tek bir cihaz için az görünse de evdeki tüm cihazların yıllık toplamı onlarca hatta yüzlerce kWh'e ulaşabilir."]
  ],
  tools: ["elektrik-tuketim-hesapla", "cihaz-elektrik-maliyeti-hesapla", "led-tasarruf-hesapla", "kw-watt-cevir"],
  related: ["dogalgaz-faturasi-ve-kombi-kapasitesi", "powerbank-kac-kez-sarj-eder"],
  sources: [
    ["EPDK – Enerji Piyasası Düzenleme Kurumu", "https://www.epdk.gov.tr/"],
    ["Resmî Gazete – EPDK kurul kararları", "https://www.resmigazete.gov.tr/"]
  ]
};
