export default {
  slug: "gri-tonlama-yazdirma-ile-toner-tasarrufu",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Gri Tonlamalı Yazdırmayla Toner Tasarrufu: Siyah-Beyaz PDF ve Sayfa Maliyeti",
  pageTitle: "Gri Tonlamalı Yazdırma ile Toner Tasarrufu ve Sayfa Maliyeti",
  description: "Renkli yazıcıda gri tonlama renkli toner harcamayı durdurur; eşikli siyah-beyaz, taslak modu ve 2 sayfayı 1'e basmak siyah toneri de azaltır. Örnek hesap ve ipuçları.",
  keywords: ["gri tonlama yazdırma", "toner tasarrufu", "siyah beyaz yazdırma", "pdf siyah beyaz yapma", "renkli toner tasarrufu", "taslak modu yazdırma", "toner ömrünü uzatma", "sayfa başı maliyet"],
  lead: "Evet; renkli bir lazer ya da mürekkep püskürtmeli yazıcıda belgeyi gri tonlamalı (siyah-beyaz) yazdırmak, camgöbeği, macenta ve sarı toner ya da mürekkep kullanımını büyük ölçüde durdurur ve sayfa başı maliyeti çoğu zaman birkaç kat düşürür. Siyah tonerden de tasarruf etmek için gri dolguları kaldıran eşikli siyah-beyaz dönüşüm, taslak (eko) modu ve iki sayfayı bir sayfaya basmak gibi yöntemler kullanılır. Bu sayfada her yöntemin ne zaman işe yaradığını, yüzde 5 kapsama kavramını, örnek sayfa maliyeti hesabını ve gri tonlamada okunurluğu korumanın yollarını bulacaksınız.",
  kisaCevap: [
    "Renkli yazıcıda gri tonlama renkli kartuşların kullanımını durdurur; tasarrufun büyük kısmı buradan gelir.",
    "Tek renkli (siyah) yazıcıda gri tonlama ek tasarruf sağlamaz; gri alanlar yine siyah tonerle noktalanır.",
    "Eşikli siyah-beyaz dönüşüm gri dolguları ve arka plan renklerini kaldırarak siyah toneri de azaltır.",
    "Kartuş verimleri yaklaşık %5 sayfa kapsamasına göre verilir: gerçek verim = kutudaki verim × 5 ÷ gerçek kapsama.",
    "Sayfa başı maliyet = kartuş fiyatı ÷ gerçek sayfa verimi; renkli sayfada dört kartuşun payı toplanır.",
    "Bir kâğıda iki sayfa basmak kâğıdı yarıya indirir ve küçülen içerik nedeniyle toneri de yaklaşık oranında azaltır."
  ],
  figure: {
    alt: "Renkli ve gri tonlamalı sayfa maliyeti karşılaştırması: renkli sayfada siyah 0,50 TL ve üç renk 0,72'şer TL ile toplam 2,66 TL; gri tonlamada yalnızca siyah 0,50 TL. Altta yüzde 5 ve yüzde 10 kapsamada kartuş veriminin 3.000 sayfadan 1.500 sayfaya düşmesi.",
    caption: "Örnek kartuş fiyatları ve verimleriyle hesaplanmış sayfa başı maliyet. Renkli belge gri tonlamada basıldığında renkli kartuşların payı ortadan kalkar. Alt kısım, sayfadaki toner kapsaması iki katına çıkınca verimin yarıya indiğini gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sayfa başı maliyet: renkli mi gri mi?</text>
  <text x="40" y="76" class="b">Renkli baskı</text>
  <rect x="180" y="56" width="75" height="32" class="t"/>
  <rect x="255" y="56" width="108" height="32" class="c"/>
  <rect x="363" y="56" width="108" height="32" class="m"/>
  <rect x="471" y="56" width="108" height="32" class="y"/>
  <text x="590" y="78" class="b">2,66 TL</text>
  <g class="sm mid"><text x="217" y="104">K 0,50</text><text x="309" y="104">C 0,72</text><text x="417" y="104">M 0,72</text><text x="525" y="104">Y 0,72</text></g>
  <text x="40" y="146" class="b">Gri tonlama</text>
  <rect x="180" y="126" width="75" height="32" class="t"/>
  <text x="266" y="148" class="b ok">0,50 TL · sayfa başı 2,16 TL tasarruf</text>
  <rect x="40" y="176" width="640" height="40" rx="8" class="oks"/>
  <text x="360" y="201" class="sm b mid">Ayda 500 sayfa: 500 × 2,16 = 1.080 TL renkli toner tasarrufu (örnek)</text>
  <text x="40" y="256" class="b">Kapsama arttıkça verim düşer</text>
  <rect x="40" y="270" width="300" height="40" rx="6" class="ps"/>
  <text x="190" y="295" class="sm b mid">%5 kapsama → 3.000 sayfa</text>
  <rect x="40" y="318" width="150" height="40" rx="6" class="dgs"/>
  <text x="200" y="343" class="sm b">%10 kapsama → 1.500 sayfa</text>
  <text x="380" y="295" class="sm t2">Gerçek verim = 3.000 × 5 ÷ kapsama</text>
  <text x="380" y="343" class="sm t2">Maliyet 0,50 TL'den 1,00 TL'ye çıkar</text>
  <text x="360" y="388" class="sm mid mu">Kartuş fiyatları ve verimleri örnektir</text>
</svg>`
  },
  sections: [
    {
      h: "Gri tonlamalı yazdırma toner tasarrufu sağlar mı?",
      p: [
        "Renkli bir yazıcı, ekranda gördüğünüz renkleri dört temel renkle oluşturur: camgöbeği (C), macenta (M), sarı (Y) ve siyah (K). Renkli bir belge yazdırıldığında, sayfadaki her logo, başlık, tablo zemini ve fotoğraf bu kartuşlardan pay alır. Yazıcı sürücüsünde \"gri tonlama\" ya da \"yalnızca siyah\" seçeneği işaretlendiğinde ise sayfadaki tüm renkler siyahın farklı yoğunluklarına çevrilir ve çoğu yazıcıda yalnızca siyah kartuş kullanılır.",
        "Bu nedenle tasarrufun büyük kısmı renkli kartuşlardan gelir ve renkli yazıcılarda belirgindir. Tek renkli (yalnızca siyah toner kullanan) bir lazer yazıcıda ise renkli belge zaten gri tonlarla basılır; sürücüde gri tonlamayı seçmek ek bir tasarruf yaratmaz. Bu yazıcılarda siyah toneri azaltmanın yolları eşikli siyah-beyaz, taslak modu ve sayfa düzeni değişiklikleridir.",
        "Renklerin baskıda nasıl oluştuğunu daha ayrıntılı merak ediyorsanız [[bilgi:cmyk-ve-rgb-farki-baski|CMYK ve RGB farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "PDF'i siyah-beyaza çevirmek nasıl tasarruf ettirir?",
      p: [
        "Yazıcı sürücüsündeki gri tonlama seçeneği her zaman beklendiği gibi çalışmayabilir: bazı sürücüler, bazı uygulamalar ya da paylaşılan ağ yazıcıları ayarı yok sayabilir; bazı belgelerde gri tonlar siyah yerine renklerin karışımıyla oluşturulabilir. Belgeyi yazdırmadan önce PDF olarak gri tonlamaya çevirmek, yazıcıya hiç renk bilgisi gitmemesini garanti eder.",
        "Daha fazla tasarruf için <strong>eşikli siyah-beyaz</strong> dönüşüm kullanılabilir. Bu yöntemde her nokta ya tamamen siyah ya tamamen beyaz yapılır; açık renkli zeminler, filigranlar ve gri tablo dolguları beyaza döner. Sonuç, metin ağırlıklı belgelerde siyah tonerin de belirgin biçimde azalmasıdır. Fotoğraflı belgelerde ise eşikli dönüşüm görüntüyü sert ve detaysız hâle getirebilir; bu belgelerde normal gri tonlama daha uygundur."
      ],
      ol: [
        "[[arac:pdf-gri-tonlama|PDF Gri Tonlama]] aracını açın ve PDF dosyanızı seçin; dosya tarayıcınızda işlenir, hiçbir yere yüklenmez.",
        "Belge türüne göre \"gri tonlama\" ya da \"eşikli siyah-beyaz\" seçin.",
        "Çözünürlüğü belirleyin: metin belgeleri için 150 dpi çoğu zaman yeterlidir; küçük yazılı formlarda 200 dpi seçin.",
        "Önizlemede okunurluğu kontrol edip yeni PDF'i indirin ve yazdırın."
      ],
      after: [
        "Bu araç sayfaları görüntüye çevirerek gri tonlama yaptığı için çıktı PDF'teki metin seçilemez hâle gelir; arşivlemek için orijinal dosyayı saklayın, gri kopyayı yalnızca yazdırmak için kullanın. Çözünürlük seçiminin baskı kalitesine etkisi [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük nedir]] yazısında anlatılır."
      ]
    },
    {
      h: "Toner ömrü \"yüzde 5 kapsama\" ile ne demek?",
      p: [
        "Kartuş kutusunda yazan sayfa verimi, uluslararası test standartlarına göre (siyah-beyaz lazerde ISO/IEC 19752, renkli lazerde ISO/IEC 19798) belirlenir. Bu testlerde kullanılan sayfalar, kâğıt yüzeyinin yaklaşık yüzde 5'ini kaplayan tonerle basılır; bu, kenar boşluklu, tek aralıklı, kısa bir iş mektubuna benzer bir yoğunluktur.",
        "Sizin belgeleriniz daha yoğunsa verim düşer. Tablolu raporlar, kalın başlıklar, logolar ve gri zeminler kapsamayı yüzde 10–20'ye çıkarabilir. Kapsama iki katına çıktığında verim yaklaşık yarıya iner."
      ],
      formula: "Gerçek verim ≈ kutudaki verim × 5 ÷ gerçek kapsama (%)\nÖrnek: 3.000 × 5 ÷ 10 = 1.500 sayfa",
      after: [
        "Kendi kapsamanızla kartuşun kaç gün yeteceğini ve yıllık kaç kartuş gerektiğini [[arac:toner-omru-hesapla|Toner Ömrü Hesaplama]] aracıyla bulabilirsiniz. Verim ve sayfa maliyetinin ayrıntıları için [[bilgi:toner-kac-sayfa-basar-sayfa-maliyeti|toner kaç sayfa basar]] yazısına bakın."
      ]
    },
    {
      h: "Sayfa başı maliyet nasıl hesaplanır? Renkli ve gri karşılaştırması",
      p: [
        "Sayfa başı maliyet, kartuş fiyatının gerçek sayfa verimine bölünmesiyle bulunur. Renkli bir sayfada dört kartuşun payı toplanır; gri tonlamada yalnızca siyah kartuşun payı kalır. Aşağıdaki hesap tamamen <strong>örnek fiyat ve verimlerle</strong> yapılmıştır."
      ],
      table: {
        head: ["Kartuş", "Örnek fiyat", "Örnek verim (%5)", "Sayfa başı"],
        rows: [
          ["Siyah (K)", "1.500 TL", "3.000 sayfa", "0,50 TL"],
          ["Camgöbeği (C)", "1.800 TL", "2.500 sayfa", "0,72 TL"],
          ["Macenta (M)", "1.800 TL", "2.500 sayfa", "0,72 TL"],
          ["Sarı (Y)", "1.800 TL", "2.500 sayfa", "0,72 TL"],
          ["Renkli sayfa toplamı", "—", "—", "2,66 TL"],
          ["Gri tonlamalı sayfa", "—", "—", "0,50 TL"]
        ],
        caption: "Hesaba drum (görüntüleme ünitesi), kâğıt ve bakım giderleri dahil değildir; bunlar da sayfa başı maliyete eklenmelidir."
      },
      after: [
        "Ayda 500 sayfa basan bir ofis, renkli olması gerekmeyen belgeleri gri tonlamada yazdırarak bu örnekte sayfa başına 2,16 TL, ayda yaklaşık 1.080 TL renkli toner tasarrufu sağlar. Kendi kartuş fiyatlarınızla hesaplamak için [[arac:sayfa-basi-maliyet-hesapla|Sayfa Başı Maliyet Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Taslak (eko) modu ne kadar toner kazandırır?",
      p: [
        "Birçok yazıcının sürücüsünde \"taslak\", \"eko\" ya da \"toner tasarrufu\" adlı bir mod bulunur. Bu mod, siyah alanlara daha az toner uygulayarak baskıyı biraz açık renkli yapar. Kazanılan miktar yazıcıya ve belgeye göre değişir; metin belgelerinde kayda değer olabilir, fotoğraf ve grafiklerde ise kalite kaybı daha belirgindir.",
        "Taslak modu iç yazışmalar, okuma kopyaları, düzeltme çıktıları ve arşiv dışı belgeler için uygundur. Resmî başvurular, sözleşmeler, müşteriye gidecek teklifler ve taranacak belgelerde ise okunurluk ve kurumsal görünüm için normal mod tercih edilmelidir. Tasarrufun gerçek boyutunu görmek için aynı belgeden normal ve taslak modda birkaç kopya basıp kartuş seviyesindeki değişimi izleyebilirsiniz."
      ]
    },
    {
      h: "Bir sayfaya birden fazla sayfa basmak ne kadar kazandırır?",
      p: [
        "İki ya da dört sayfayı tek bir kâğıt yüzüne küçülterek basmak (2'li ya da 4'lü düzen), kâğıt tüketimini doğrudan yarıya ya da dörtte birine indirir. İçerik küçüldüğü için kapladığı alan da küçülür; bu yüzden toner kullanımı da yaklaşık aynı oranda azalır. Çift taraflı baskıyla birleştirildiğinde 100 sayfalık bir belge 25 kâğıda basılabilir."
      ],
      table: {
        head: ["Düzen", "100 sayfalık belge için kâğıt", "Çift taraflı", "Okunurluk"],
        rows: [
          ["Tek sayfa", "100", "50", "Normal"],
          ["2 sayfa / yüz", "50", "25", "Yazı biraz küçülür, çoğu belge için uygun"],
          ["4 sayfa / yüz", "25", "13", "Küçük yazı; taslak ve ön okuma için"]
        ]
      },
      after: [
        "Sürücünüz bu düzeni desteklemiyorsa ya da düzeni dosyaya kalıcı olarak uygulamak istiyorsanız [[arac:pdf-n-up|PDF Sayfaları Tek Sayfaya Sığdır]] aracıyla belgenizi önceden 2'li ya da 4'lü düzene getirebilirsiniz."
      ]
    },
    {
      h: "Yazı tipi ve belge tasarımı toner tüketimini etkiler mi?",
      ul: [
        "<strong>İnce yazı tipleri:</strong> Harf çizgileri ince olan yazı tipleri, kalın ve geniş harfli olanlara göre daha az toner kullanır.",
        "<strong>Yazı boyutu:</strong> 12 punto yerine 11 punto kullanmak hem sayfa sayısını hem toneri azaltır; okunurluğu bozmadan küçültün.",
        "<strong>Zemin dolguları:</strong> Gri ya da renkli tablo başlıkları ve sayfa arka planları kapsamayı en çok artıran öğelerdir; yazdırma kopyalarında kaldırın.",
        "<strong>Kalın ve büyük başlıklar:</strong> Her sayfada tekrar eden büyük logo ve başlıklar yıllık tüketimde fark yaratır.",
        "<strong>Kenar boşlukları ve satır aralığı:</strong> Makul daraltmalar sayfa sayısını azaltır."
      ],
      after: [
        "Bu değişiklikler tek başına küçük görünse de yılda binlerce sayfa basan ofislerde belirgin bir fark oluşturur. Yazı boyutlarının milimetre karşılığını merak ediyorsanız punto ölçüsünün yaklaşık 0,35 mm olduğunu hatırlayın."
      ]
    },
    {
      h: "Renkli belgeyi gri tonlamada okunur tutmak için ne yapılır?",
      p: [
        "Renkler griye çevrildiğinde, parlaklıkları birbirine yakın olan renkler aynı gri tona dönüşebilir. Örneğin bir grafikte kırmızı ve yeşil çizgiler gri tonlamada neredeyse ayırt edilemez hâle gelebilir. Bunun nedeni gri dönüşümünün rengin tonuna değil, açıklık-koyuluk değerine dayanmasıdır."
      ],
      ul: [
        "Grafiklerde renk yerine ya da renge ek olarak farklı çizgi türleri (düz, kesikli, noktalı) ve işaretler kullanın.",
        "Veri etiketlerini doğrudan çizgilerin ya da çubukların üzerine yazın.",
        "Açık ve koyu renkleri dönüşümlü kullanarak gri tonlarda kontrast oluşturun.",
        "Renkli zemin üzerindeki metinleri yazdırma kopyasında beyaz zemine alın.",
        "Önemli belgelerde önce tek sayfayı gri tonlamada deneme olarak basın."
      ],
      after: [
        "Ekranda ve baskıda okunurluk için kontrast oranının nasıl değerlendirildiğini [[bilgi:renk-kontrasti-wcag-nedir|renk kontrastı nedir]] yazısında bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Gri tonlamalı yazdırma toner tasarrufu sağlar mı?", "Renkli yazıcılarda evet; gri tonlama seçildiğinde camgöbeği, macenta ve sarı kartuşların kullanımı büyük ölçüde durur ve sayfa başı maliyet belirgin biçimde düşer. Yalnızca siyah toner kullanan yazıcılarda ise ek bir tasarruf sağlamaz."],
    ["PDF'i siyah-beyaza çevirmek renkli tonerden nasıl tasarruf ettirir?", "PDF önceden gri tonlamaya çevrildiğinde yazıcıya hiç renk bilgisi gönderilmez, böylece sürücü ayarı yok sayılsa bile renkli kartuş kullanılmaz. Eşikli siyah-beyaz dönüşüm ayrıca gri zeminleri kaldırarak siyah toneri de azaltır."],
    ["Taslak (eko) modu ne kadar toner kazandırır?", "Taslak modu siyah alanlara daha az toner uygular; kazanç yazıcıya ve belgeye göre değişir ve metin belgelerinde kayda değer olabilir. Baskı biraz açık renkli olduğu için resmî ve müşteriye gidecek belgelerde normal mod tercih edilmelidir."],
    ["Sayfa başı maliyet nasıl hesaplanır?", "Kartuş fiyatı gerçek sayfa verimine bölünür. Renkli sayfada dört kartuşun sayfa başı payı toplanır, gri tonlamada yalnızca siyahın payı kalır. Örnek fiyatlarla renkli sayfa 2,66 TL, gri tonlamalı sayfa 0,50 TL çıkar."],
    ["Yazı tipi seçimi toner tüketimini etkiler mi?", "Evet. İnce çizgili yazı tipleri, kalın ve geniş harfli olanlara göre daha az toner kullanır; yazı boyutunu bir punto küçültmek de hem sayfa hem toner tasarrufu sağlar. Değişiklik yapılırken okunurluğun korunmasına dikkat edilmelidir."],
    ["Bir sayfaya birden fazla sayfa basmak ne kadar kazandırır?", "İki sayfayı bir kâğıt yüzüne basmak kâğıdı yarıya indirir; küçülen içerik daha az alan kapladığı için toner de yaklaşık oranında azalır. Çift taraflı baskıyla birleştirildiğinde 100 sayfalık belge 25 kâğıda sığar."],
    ["Toner ömrü yüzde 5 kapsama ile ne demek?", "Kutudaki sayfa verimi, kâğıt yüzeyinin yaklaşık yüzde 5'ini kaplayan test sayfalarıyla belirlenir. Belgeleriniz daha yoğunsa verim düşer: kapsama yüzde 10 olduğunda 3.000 sayfalık kartuş yaklaşık 1.500 sayfa basar."],
    ["Renkli belgeyi gri tonlamada okunur tutmak için ne yapılır?", "Parlaklığı benzer renkler aynı griye dönüşebileceği için grafiklerde farklı çizgi türleri ve doğrudan etiketler kullanılmalı, açık ve koyu renkler dönüşümlü seçilmeli, renkli zemin üzerindeki metinler beyaz zemine alınmalıdır."],
    ["Gri tonlama baskı kalitesini düşürür mü?", "Metin ağırlıklı belgelerde kalite farkı genellikle fark edilmez. Fotoğraf ve renk ayrımı önemli grafiklerde ise bilgi kaybı olabilir; bu belgelerde önce tek sayfa deneme baskısı alıp sonucu kontrol etmek en güvenli yoldur."]
  ],
  tools: ["pdf-gri-tonlama", "toner-omru-hesapla", "sayfa-basi-maliyet-hesapla", "pdf-n-up"],
  related: ["toner-kac-sayfa-basar-sayfa-maliyeti", "cmyk-ve-rgb-farki-baski", "dpi-ve-cozunurluk-nedir", "kagit-gramaji-nedir-80-gr"]
};
