export default {
  slug: "csv-dosyasi-nedir-excelde-nasil-acilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "CSV Dosyası Nedir? Elektronik Tablo Programında Türkçe Karakter ve Sütun Sorunu Olmadan Açma",
  pageTitle: "CSV Dosyası Nedir? Türkçe Karakter ve Ayraç Sorunu Çözümü",
  description: "CSV, değerleri virgül ya da noktalı virgülle ayıran düz metin tablodur. Tek sütunda açılma, bozuk Türkçe karakter, UTF-8 BOM ve ayraç seçimi sorunlarının çözümü.",
  keywords: ["csv nedir", "csv dosyası nasıl açılır", "csv türkçe karakter bozuk", "csv noktalı virgül", "csv tek sütunda açılıyor", "csv sütunlara ayırma", "csv utf-8 bom", "csv html tablo", "csv xlsx farkı"],
  lead: "CSV (Comma-Separated Values, virgülle ayrılmış değerler), her satırı bir kayıt, her ayraçla bölünmüş parçası bir sütun olan <strong>düz metin tablo dosyasıdır</strong>. Biçim çok basit olduğu için neredeyse her program CSV okuyup yazabilir; ama iki ayrıntı sorun çıkarır: hangi karakterin ayraç olduğu ve metnin hangi karakter kodlamasıyla kaydedildiği. Türkçe bölge ayarlı bir elektronik tablo programı ayraç olarak noktalı virgül bekler, virgüllü dosyayı tek sütunda açar; kodlama yanlış tahmin edilince de ş, ğ, ı gibi harfler bozulur. Bu sayfada iki sorunun nedenini ve kalıcı çözümünü anlatıyoruz.",
  kisaCevap: [
    "CSV dosyası düz metindir: satırlar kayıtları, ayraçlar (virgül, noktalı virgül ya da sekme) sütunları ayırır.",
    "Türkçe bölge ayarında ondalık işaret virgül olduğu için elektronik tablo programları ayraç olarak genellikle noktalı virgül (;) bekler.",
    "Virgüllü bir CSV Türkçe ayarlı programda tek sütunda açılıyorsa sorun ayraç uyuşmazlığıdır; içe aktarma sihirbazında ayracı seçin.",
    "Türkçe karakterlerin bozulması kodlama uyuşmazlığıdır: dosya UTF-8 ise ama program Windows-1254 sanıyorsa \"ş\" yerine anlamsız işaretler çıkar.",
    "Dosyanın başına UTF-8 BOM (EF BB BF baytları) eklemek, çoğu elektronik tablo programının UTF-8'i doğru tanımasını sağlar.",
    "CSV yalnızca değer tutar; biçim, formül, birden çok sayfa ve hücre birleştirme için XLSX gerekir."
  ],
  figure: {
    alt: "Aynı CSV satırının iki görünümü: virgüllü dosya Türkçe ayarlı programda tek sütunda açılıyor, noktalı virgüllü dosya üç sütuna doğru ayrılıyor. Altta UTF-8 ve Windows-1254 kodlama uyuşmazlığında ş harfinin bozulması.",
    caption: "Üstte ayraç sorunu: Türkçe ayarda virgül ondalık işaret olduğu için program noktalı virgül bekler. Altta kodlama sorunu: UTF-8 ile yazılmış ş harfi (iki bayt) Windows-1254 ile okunursa iki ayrı anlamsız karaktere dönüşür.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">CSV'nin iki klasik sorunu</text>
  <text x="20" y="60" class="b">1. Ayraç uyuşmazlığı</text>
  <rect x="20" y="72" width="330" height="40" rx="6" class="sf sb"/>
  <text x="32" y="97" class="sm"><tspan class="b">Dosya:</tspan> Ürün,Adet,Fiyat</text>
  <rect x="20" y="122" width="330" height="40" rx="6" class="dgs"/>
  <text x="32" y="147" class="sm">A sütunu: "Ürün,Adet,Fiyat" (tek hücre)</text>
  <text x="185" y="180" class="sm mid dg b">Virgül ayraç olarak tanınmadı</text>
  <rect x="370" y="72" width="330" height="40" rx="6" class="sf sb"/>
  <text x="382" y="97" class="sm"><tspan class="b">Dosya:</tspan> Ürün;Adet;Fiyat</text>
  <g class="sm mid">
    <rect x="370" y="122" width="108" height="40" rx="6" class="oks"/><text x="424" y="147">Ürün</text>
    <rect x="481" y="122" width="108" height="40" rx="6" class="oks"/><text x="535" y="147">Adet</text>
    <rect x="592" y="122" width="108" height="40" rx="6" class="oks"/><text x="646" y="147">Fiyat</text>
  </g>
  <text x="535" y="180" class="sm mid ok b">Üç sütuna doğru ayrıldı</text>
  <line x1="20" y1="200" x2="700" y2="200" class="sb dash" fill="none"/>
  <text x="20" y="232" class="b">2. Kodlama uyuşmazlığı: "ş" harfi</text>
  <rect x="20" y="248" width="200" height="80" rx="8" class="ps"/>
  <text x="120" y="276" class="sm mid">UTF-8 ile yazıldı</text>
  <text x="120" y="304" class="lg mid b">C5 9F</text>
  <text x="120" y="320" class="sm mid mu">(2 bayt)</text>
  <line x1="222" y1="288" x2="262" y2="288" class="sp sw" fill="none"/>
  <rect x="264" y="248" width="210" height="80" rx="8" class="dgs"/>
  <text x="369" y="276" class="sm mid">Windows-1254 sanılarak okundu</text>
  <text x="369" y="308" class="lg mid b dg">Å + Ÿ</text>
  <line x1="476" y1="288" x2="496" y2="288" class="sp sw" fill="none"/>
  <rect x="498" y="248" width="202" height="80" rx="8" class="oks"/>
  <text x="599" y="276" class="sm mid">UTF-8 olarak okundu</text>
  <text x="599" y="308" class="lg mid b ok">ş</text>
  <rect x="20" y="346" width="680" height="78" rx="10" class="sf sb"/>
  <rect x="20" y="346" width="8" height="78" class="p"/>
  <text x="44" y="372" class="b">Kalıcı çözüm</text>
  <text x="44" y="396" class="sm">Türkçe ayarlı programa vereceğiniz dosyayı noktalı virgülle ve UTF-8 BOM ile kaydedin;</text>
  <text x="44" y="414" class="sm">ya da içe aktarma sihirbazında ayracı ve kodlamayı elle seçin.</text>
</svg>`
  },
  sections: [
    {
      h: "CSV dosyası nedir, içinde ne vardır?",
      p: [
        "CSV, tablo verisini en sade hâliyle saklayan bir metin biçimidir. Not defteriyle açtığınızda gördüğünüz şey, satır satır yazılmış ve ayraçlarla bölünmüş değerlerdir. İlk satır genellikle sütun başlıklarını, sonraki satırlar kayıtları içerir. Hücre rengi, kalın yazı, formül, birden çok sayfa gibi özellikler CSV'de yoktur; yalnızca değerler vardır.",
        "Bu sadelik CSV'yi veri alışverişinin ortak dili yapar. E-ticaret panellerinden ürün listesi indirirken, banka ekstrelerini dışa aktarırken, bir rehberi ya da e-posta listesini başka bir sisteme taşırken çoğu zaman CSV ile karşılaşırsınız. Biçimin genel kuralları RFC 4180 adlı belgede tanımlanmıştır ama uygulamada her program biraz farklı davranır.",
        "Temel kurallar şöyledir: her satır bir kayıttır; değerler ayraçla bölünür; bir değerin içinde ayraç, tırnak ya da satır sonu varsa değer çift tırnak içine alınır; değerin içindeki çift tırnak iki kez yazılır. Örneğin <code>\"Kalem, mavi\";12;\"15,50\"</code> satırında ilk ve son değer tırnaklıdır çünkü içlerinde virgül geçer."
      ]
    },
    {
      h: "CSV neden tek sütunda açılır? Virgül mü noktalı virgül mü?",
      p: [
        "Adında \"virgülle ayrılmış\" geçse de CSV'de virgülün tek ayraç olduğu bir kural yoktur. İngilizce bölge ayarında ondalık işaret nokta olduğu için virgül güvenle ayraç olarak kullanılır. Türkçe bölge ayarında ise ondalık işaret virgüldür (15,50 TL). Bu çakışmayı önlemek için Türkçe ayarlı elektronik tablo programları CSV açarken varsayılan ayraç olarak <strong>noktalı virgül</strong> bekler.",
        "Sonuç tanıdıktır: yurt dışı kaynaklı ya da İngilizce ayarlı bir sistemden indirdiğiniz virgüllü CSV'yi çift tıklayarak açtığınızda tüm satır A sütununa sıkışır. Tersine, noktalı virgüllü bir dosya İngilizce ayarlı bir programda yine tek sütunda görünür. Dosya bozuk değildir; yalnızca ayraç beklentisi uyuşmamaktadır."
      ],
      table: {
        head: ["Ayraç", "Yaygın kullanım", "Avantaj", "Dikkat"],
        rows: [
          ["Virgül (,)", "İngilizce ayarlı sistemler, yazılım dışa aktarımları", "Uluslararası varsayılan", "Türkçe ondalık sayılarla çakışır"],
          ["Noktalı virgül (;)", "Türkçe ve birçok Avrupa ayarı", "Ondalık virgülle çakışmaz", "İngilizce ayarlı programda tek sütun"],
          ["Sekme (TAB)", "Kopyala-yapıştır, TSV dosyaları", "Metinde nadir geçer, en az çakışma", "Gözle görülmez, karışabilir"],
          ["Dikey çizgi (|)", "Bazı kurumsal sistemler", "Metinde çok nadir", "Her program otomatik tanımaz"]
        ]
      },
      after: [
        "Çözüm için dosyayı çift tıklamak yerine programın <strong>veri içe aktarma</strong> özelliğini kullanın. Bu sihirbaz ayracı, kodlamayı ve her sütunun türünü (metin, sayı, tarih) seçmenize izin verir. Ayrıca dosyanın en başına <code>sep=;</code> gibi bir satır eklemek, bazı programlara hangi ayracın kullanılacağını söyler; ancak bu satır her programda tanınmaz ve diğer sistemlerde ilk kayıt gibi görünebilir.",
        "Tek bir dosyanın ayracını hızla değiştirmek ya da bozuk satırları onarmak isterseniz [[arac:csv-excel|CSV ve XLSX dönüştürücü]] ayracı ve kodlamayı otomatik algılar, dosyayı istediğiniz biçimde yeniden kaydeder."
      ]
    },
    {
      h: "Türkçe karakterler CSV'de neden bozuk görünür?",
      p: [
        "Bilgisayar her harfi bir ya da birkaç bayt olarak saklar. Hangi baytın hangi harfe karşılık geldiğini <strong>karakter kodlaması</strong> belirler. Türkçe metinler için iki kodlama yaygındır: eski Windows sistemlerinin kullandığı <strong>Windows-1254</strong> (her harf bir bayt) ve bugünün evrensel standardı <strong>UTF-8</strong> (İngiliz alfabesi bir bayt, ç, ğ, ı, İ, ö, ş, ü iki bayt).",
        "CSV dosyası kendi kodlamasını içinde yazmaz; açan program tahmin eder. UTF-8 ile kaydedilmiş bir dosyayı program Windows-1254 sanarsa ş harfinin iki baytı iki ayrı anlamsız karakter olarak görünür. Tersi olduğunda, yani Windows-1254 dosya UTF-8 sanılırsa, Türkçe harflerin yerinde soru işareti ya da kutucuk çıkar. Kodlamaların ayrıntısı için [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısına bakabilirsiniz."
      ],
      table: {
        head: ["Belirti", "Olası neden", "Çözüm"],
        rows: [
          ["ş yerine Å, ı yerine Ä± gibi çift karakter", "UTF-8 dosya, Windows-1254 olarak okundu", "UTF-8 seçerek içe aktarın ya da BOM ekleyin"],
          ["Türkçe harflerin yerinde ? ya da kutucuk", "Windows-1254 dosya, UTF-8 olarak okundu", "Kodlamayı Windows-1254 (Türkçe) seçin"],
          ["Yalnızca ğ, ş, ı, İ bozuk; ç, ö, ü doğru", "Batı Avrupa kodlamasıyla okundu", "Türkçe kodlama ya da UTF-8 seçin"],
          ["Dosya baştan beri ? içeriyor", "Kaydedilirken karakterler kaybolmuş", "Kaynağından yeniden dışa aktarın"]
        ]
      },
      after: [
        "Son satır önemlidir: dosyayı not defterinde açtığınızda bile soru işareti görüyorsanız harfler kaydetme sırasında kaybolmuştur ve hiçbir kodlama seçimi geri getirmez. Bu durumda veriyi kaynak sistemden yeniden indirmeniz gerekir. Genel karakter sorunları için [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısı da yol gösterir."
      ]
    },
    {
      h: "UTF-8 ve UTF-8 BOM farkı nedir?",
      p: [
        "BOM (Byte Order Mark, bayt sırası işareti), dosyanın en başına eklenen ve görünmeyen üç bayttır: EF BB BF. UTF-8 için bayt sırası kavramı aslında gereksizdir; ama bu üç bayt, dosyayı açan programa \"ben UTF-8'im\" diye işaret verir. Elektronik tablo programlarının çoğu BOM'lu dosyayı doğrudan UTF-8 olarak okur ve Türkçe harfler doğru görünür.",
        "BOM'un bir bedeli de vardır. Bazı yazılımlar, betikler ve içe aktarma sistemleri bu üç baytı ilk sütun adının parçası sanar; ilk başlık \"Ürün\" yerine görünmez bir karakterle başlar ve eşleşme bozulur. Bu yüzden kural basittir: dosyayı bir insan elektronik tablo programında açacaksa BOM'lu UTF-8, bir yazılıma ya da pazaryeri paneline yüklenecekse panelin istediği biçim (çoğunlukla BOM'suz UTF-8) kullanılır."
      ]
    },
    {
      h: "Başı sıfırlı numaralar, uzun sayılar ve tarihler",
      p: [
        "Elektronik tablo programları CSV'deki değerlerin türünü tahmin etmeye çalışır ve bu tahmin bazen veriyi bozar. En sık karşılaşılan üç durum şunlardır:"
      ],
      ul: [
        "<strong>Başı sıfırlı değerler:</strong> Posta kodu, ürün kodu ya da 0 ile başlayan telefon numaraları sayı sanılır ve baştaki sıfır silinir (05xx yerine 5xx).",
        "<strong>Uzun sayılar:</strong> 13 haneli barkodlar ya da 16 haneden uzun numaralar bilimsel gösterime (8,69E+12) çevrilir, 15 haneden sonrası sıfıra yuvarlanabilir.",
        "<strong>Tarihler:</strong> 03.04.2026 bazı ayarlarda 3 Nisan, bazılarında 4 Mart olarak yorumlanır; 1-2 gibi değerler tarihe dönüşebilir.",
        "<strong>Ondalık sayılar:</strong> \"15.50\" Türkçe ayarda metin ya da tarih sanılabilir; \"15,50\" İngilizce ayarda iki ayrı sütuna bölünebilir."
      ],
      after: [
        "Bunların ortak çözümü, içe aktarırken ilgili sütunun türünü <strong>metin</strong> olarak seçmektir. Dosyayı çift tıklayarak açıp sonra kaydetmek ise en riskli yoldur: program bozduğu değerleri dosyaya kalıcı olarak yazar. Barkod numaralarının yapısını merak ediyorsanız [[bilgi:barkod-numarasi-nedir-869-ean13|barkod numarası yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "CSV'den belirli bir sütun nasıl ayıklanır?",
      p: [
        "Bazen bir CSV'nin tamamına değil, yalnızca bir sütununa ihtiyaç duyarsınız: müşteri listesinden e-posta adresleri, ürün listesinden barkodlar gibi. Elektronik tablo programında açıp sütunu kopyalamak mümkündür ama ayraç ve kodlama sorunları burada da karşınıza çıkar.",
        "Daha hızlı yol, metni [[arac:sutun-ayikla|Metinden Sütun Ayıklama aracına]] yapıştırmaktır. Ayracı seçer, istediğiniz sütun numaralarını yazarsınız ve araç yalnızca o sütunları alt alta listeler. Verileriniz tarayıcınızda işlenir; hiçbir sunucuya gönderilmez. Tekrarlanan satırları temizlemek için ayrıca [[bilgi:tekrar-eden-satirlari-silme-liste-duzenleme|tekrar eden satırları silme]] yazısındaki yöntemler işinize yarar."
      ]
    },
    {
      h: "CSV nasıl HTML tabloya çevrilir?",
      p: [
        "CSV verisini bir web sayfasında, blog yazısında ya da e-postada tablo olarak göstermek istiyorsanız HTML tablo koduna çevirmeniz gerekir. Elle yapıldığında her hücre için ayrı etiket yazmak gerekir ve hata yapmak kolaydır.",
        "[[arac:csv-html-tablo|CSV'den HTML Tablo Oluşturma aracı]], ilk satırı başlık hücresi olarak kurar, kalan satırları gövdeye yerleştirir ve kopyalanmaya hazır kod verir. Hizalama, kenarlık, zebra satır ve hücre birleştirme gibi görsel ayarlar istiyorsanız [[arac:html-tablo-olustur|HTML Tablo Oluşturucu]] aynı veriden HTML, Markdown ve WordPress blok tablosu üretir."
      ]
    },
    {
      h: "CSV ile XLSX arasındaki fark",
      table: {
        head: ["Özellik", "CSV", "XLSX"],
        rows: [
          ["Dosya yapısı", "Düz metin", "Sıkıştırılmış XML paketi"],
          ["Not defteriyle okunur mu?", "Evet", "Hayır"],
          ["Biçim, renk, yazı tipi", "Yok", "Var"],
          ["Formül", "Yok (yalnızca sonuç değer)", "Var"],
          ["Birden çok sayfa", "Hayır, tek tablo", "Evet"],
          ["Kodlama ve ayraç sorunu", "Olabilir", "Yok"],
          ["Sistemler arası aktarım", "Çok yaygın", "Daha az yaygın"],
          ["Büyük veri", "Hafif ve hızlı", "Daha ağır"]
        ]
      },
      after: [
        "Kısacası CSV taşıma kabıdır, XLSX çalışma dosyasıdır. Bir sistemden veri alıp başka bir sisteme verecekseniz CSV; üzerinde hesap yapacak, biçimlendirecek ya da birine rapor olarak gönderecekseniz XLSX daha uygundur. İki biçim arasında dönüşüm için aynı dönüştürücüyü kullanabilirsiniz; başı sıfırlı numaralar ve Türkçe karakterler korunur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>CSV'yi çift tıklayıp açtıktan sonra üzerine kaydetmek:</strong> Program bozduğu sayı ve tarihleri dosyaya kalıcı yazar; önce kopya alın.",
        "<strong>Ayracı tahmin etmeden içe aktarmak:</strong> Not defterinde ilk satıra bakın; virgül mü, noktalı virgül mü kullanılmış görün.",
        "<strong>Her dosyaya BOM eklemek:</strong> Yazılımlara yüklenecek dosyalarda BOM ilk sütun adını bozabilir.",
        "<strong>Ondalık işaret ile ayracı aynı seçmek:</strong> Türkçe ondalıklı sayılar varsa ayraç virgül olamaz, değerler tırnaksız ise sütunlar kayar.",
        "<strong>Başlık satırını unutmak:</strong> Pazaryeri ve rehber içe aktarmaları genellikle belirli sütun adları bekler."
      ]
    }
  ],
  faq: [
    ["CSV dosyası nedir?", "CSV, tablo verisini düz metin olarak saklayan bir biçimdir. Her satır bir kaydı, ayraçla bölünmüş her parça bir sütunu temsil eder. Biçim, formül ve birden çok sayfa içermez; yalnızca değerleri taşır."],
    ["CSV neden elektronik tablo programında tek sütunda açılır?", "Dosyadaki ayraç programın beklediği ayraçtan farklıdır. Türkçe ayarlı programlar noktalı virgül bekler, virgüllü dosyayı tek sütuna koyar. İçe aktarma sihirbazında ayracı elle seçerek sorunu çözebilirsiniz."],
    ["Türkçe karakterler CSV'de neden bozuk görünür?", "Dosyanın kodlaması ile programın tahmin ettiği kodlama farklıdır. UTF-8 dosya Windows-1254 sanılırsa ş, ğ, ı harfleri anlamsız çift karakterlere dönüşür; içe aktarırken UTF-8 seçin ya da dosyaya BOM ekleyin."],
    ["Virgül mü noktalı virgül mü ayraç kullanılmalı?", "Dosyayı Türkçe ayarlı bir elektronik tablo programında açacaksanız noktalı virgül daha güvenlidir, çünkü ondalık virgülle çakışmaz. Bir yazılıma ya da yurt dışı sisteme yükleyecekseniz o sistemin istediği ayracı kullanın."],
    ["UTF-8 ve UTF-8 BOM farkı nedir?", "İkisi aynı kodlamadır; BOM'lu sürümün başında görünmeyen üç bayt (EF BB BF) vardır. Bu işaret elektronik tablo programlarının UTF-8'i tanımasını kolaylaştırır ama bazı yazılımlarda ilk sütun adını bozabilir."],
    ["CSV'den belirli bir sütun nasıl ayıklanır?", "Metni Sütun Ayıklama aracına yapıştırın, ayracı seçin ve istediğiniz sütun numaralarını yazın. Araç yalnızca o sütunları liste olarak verir; veriniz tarayıcınızdan çıkmaz."],
    ["CSV nasıl HTML tabloya çevrilir?", "CSV'den HTML Tablo Oluşturma aracına veriyi yapıştırın; ilk satır başlık, kalan satırlar gövde olarak kurulur ve kopyalanabilir kod üretilir. Görsel ayarlar için HTML Tablo Oluşturucu'yu kullanabilirsiniz."],
    ["CSV ile XLSX arasındaki fark nedir?", "CSV düz metindir ve yalnızca değer taşır; XLSX biçim, formül, birden çok sayfa ve hücre birleştirme destekleyen bir çalışma dosyasıdır. CSV veri aktarımı için, XLSX hesap ve raporlama için daha uygundur."],
    ["CSV'de başındaki sıfır neden siliniyor?", "Elektronik tablo programı başı sıfırlı kodu sayı sanar ve baştaki sıfırı atar. İçe aktarırken o sütunun türünü metin olarak seçerseniz değer olduğu gibi korunur."]
  ],
  tools: ["csv-excel", "csv-html-tablo", "sutun-ayikla", "html-tablo-olustur"],
  related: ["ascii-unicode-utf8-farki", "turkce-karakter-sorunu-nasil-duzeltilir", "json-nedir-nasil-okunur"],
  sources: [
    ["IETF – RFC 4180 CSV biçimi", "https://www.rfc-editor.org/rfc/rfc4180"],
    ["Unicode Consortium – UTF-8 ve BOM SSS", "https://www.unicode.org/faq/utf_bom.html"]
  ]
};
