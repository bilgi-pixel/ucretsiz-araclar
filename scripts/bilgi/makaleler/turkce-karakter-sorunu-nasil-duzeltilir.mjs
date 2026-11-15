export default {
  slug: "turkce-karakter-sorunu-nasil-duzeltilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Türkçe Karakter Sorunu Nasıl Düzeltilir? Bozuk ı, ş, ğ ve İ Harfleri",
  pageTitle: "Türkçe Karakter Sorunu: Bozuk ş, ğ, ı, ü Nasıl Düzeltilir?",
  description: "Ã¼, ÅŸ, Ä± gibi bozuk harfler, UTF-8 metnin başka bir kodlamayla açılmasından olur. CSV, e-posta, altyazı ve web için kodlama seçimi, İ/ı sorunu ve çözüm adımları.",
  keywords: ["türkçe karakter sorunu", "bozuk türkçe karakter düzeltme", "ı ş ğ yerine soru işareti", "utf-8 türkçe karakter", "türkçe karakterleri ingilizceye çevirme", "büyük i küçük ı sorunu", "csv türkçe karakter", "windows-1254"],
  lead: "Türkçe karakterlerin \"Ã¼\", \"ÅŸ\", \"Ä±\" ya da soru işareti olarak görünmesinin nedeni, <strong>metnin kaydedildiği karakter kodlaması ile açıldığı kodlamanın farklı olmasıdır</strong>; harfler kaybolmamıştır, yalnızca yanlış tabloya göre okunmaktadır. Çoğu durumda dosyayı ya da sayfayı UTF-8 kodlamasıyla yeniden açmak sorunu çözer. Bu sayfada hangi bozuk görüntünün hangi hatadan geldiğini, CSV, e-posta, altyazı ve web sayfalarında kalıcı çözümü, büyük İ ve küçük ı dönüşüm hatasını ve Türkçe karakterleri İngilizce karşılıklarına çevirmenin doğru yolunu bulacaksınız.",
  kisaCevap: [
    "Bilgisayar her harfi bir sayı (bayt) olarak saklar; hangi sayının hangi harf olduğunu karakter kodlaması belirler.",
    "UTF-8 bütün dilleri kapsayan güncel standarttır; Türkçe harfler UTF-8'de 2 bayt yer kaplar.",
    "\"Ã¼\", \"ÅŸ\", \"Ä±\" gibi çift karakterler, UTF-8 metnin Batı Avrupa (Windows-1252) kodlamasıyla açıldığını gösterir.",
    "\"þ\", \"ý\", \"ð\", \"Ý\" görünüyorsa Türkçe (Windows-1254) metin Batı Avrupa kodlamasıyla okunmuştur.",
    "Excel'de CSV açarken bozulma oluyorsa dosyayı BOM'lu UTF-8 kaydedin ya da veri içe aktarmada kodlamayı UTF-8 seçin.",
    "Büyük-küçük harf çevirmede Türkçe kurallar ayrıca seçilmezse \"i\" büyüyünce \"I\", \"I\" küçülünce \"i\" olur."
  ],
  figure: {
    alt: "ü harfinin UTF-8'de C3 ve BC baytlarıyla saklandığını, bu iki baytın Windows-1252 tablosuyla okununca Ã ve ¼ karakterlerine dönüştüğünü gösteren şema ve bozuk görüntü tablosu.",
    caption: "Harf kaybolmaz: aynı iki bayt farklı bir tabloya göre okunduğunda iki ayrı karaktere dönüşür. Doğru kodlamayla yeniden açıldığında metin kendiliğinden düzelir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">"ü" harfi nasıl "Ã¼" oluyor?</text>
  <rect x="30" y="56" width="120" height="80" rx="10" class="oks"/>
  <text x="90" y="106" class="xl mid">ü</text>
  <text x="90" y="156" class="sm mid t2">yazılan harf</text>
  <line x1="150" y1="96" x2="200" y2="96" class="st sw" fill="none"/><polygon points="200,88 214,96 200,104" class="t2"/>
  <rect x="220" y="56" width="90" height="80" rx="10" class="sf sb"/><text x="265" y="104" class="lg b mid">C3</text>
  <rect x="320" y="56" width="90" height="80" rx="10" class="sf sb"/><text x="365" y="104" class="lg b mid">BC</text>
  <text x="315" y="156" class="sm mid t2">UTF-8 ile kaydedilen 2 bayt</text>
  <line x1="410" y1="96" x2="460" y2="96" class="st sw" fill="none"/><polygon points="460,88 474,96 460,104" class="t2"/>
  <rect x="480" y="56" width="90" height="80" rx="10" class="dgs"/><text x="525" y="106" class="xl mid dg">Ã</text>
  <rect x="580" y="56" width="90" height="80" rx="10" class="dgs"/><text x="625" y="106" class="xl mid dg">¼</text>
  <text x="575" y="156" class="sm mid t2">Windows-1252 ile okununca</text>
  <g>
    <rect x="30" y="184" width="660" height="34" rx="6" class="p"/>
    <text x="130" y="206" class="b mid sf">Doğru</text><text x="330" y="206" class="b mid sf">UTF-8 → 1252 okunursa</text><text x="560" y="206" class="b mid sf">1254 → 1252 okunursa</text>
    <rect x="30" y="222" width="660" height="30" rx="4" class="sf sb"/>
    <text x="130" y="242" class="mid">ş  Ş</text><text x="330" y="242" class="mid dg">ÅŸ  Åž</text><text x="560" y="242" class="mid dg">þ  Þ</text>
    <rect x="30" y="256" width="660" height="30" rx="4" class="sf sb"/>
    <text x="130" y="276" class="mid">ı  İ</text><text x="330" y="276" class="mid dg">Ä±  Ä°</text><text x="560" y="276" class="mid dg">ý  Ý</text>
    <rect x="30" y="290" width="660" height="30" rx="4" class="sf sb"/>
    <text x="130" y="310" class="mid">ğ  Ğ</text><text x="330" y="310" class="mid dg">ÄŸ  Äž</text><text x="560" y="310" class="mid dg">ð  Ð</text>
    <rect x="30" y="324" width="660" height="30" rx="4" class="sf sb"/>
    <text x="130" y="344" class="mid">ç  ö  ü</text><text x="330" y="344" class="mid dg">Ã§  Ã¶  Ã¼</text><text x="560" y="344" class="mid">ç  ö  ü</text>
  </g>
  <text x="360" y="386" class="sm mid t2">Çift karakterler UTF-8 sorununu, tek tuhaf harf (þ, ý, ð) Windows-1254 sorununu gösterir.</text>
  <text x="360" y="406" class="sm mid t2">Çözüm: dosyayı doğru kodlamayla yeniden açmak, sonra UTF-8 olarak kaydetmek.</text>
</svg>`
  },
  sections: [
    {
      h: "Türkçe karakterler neden bozuk görünür?",
      p: [
        "Bilgisayar metni harf olarak değil, sayı olarak saklar. \"A\" harfi 65, \"a\" harfi 97 sayısıyla tutulur. Hangi sayının hangi harfe karşılık geldiğini belirleyen tabloya <strong>karakter kodlaması</strong> denir. İngiliz alfabesindeki harfler için bütün tablolar aynı sayıları kullanır; sorun, ç, ğ, ı, İ, ö, ş, ü gibi özel harflerde başlar.",
        "Geçmişte her dil grubu kendi tablosunu kullandı. Batı Avrupa dilleri için Windows-1252 (ve ISO-8859-1), Türkçe için Windows-1254 (ve ISO-8859-9) tabloları yaygınlaştı. Bu tablolarda aynı sayı farklı harfleri gösterir: 254 numaralı karakter Türkçe tabloda \"ş\", Batı Avrupa tablosunda \"þ\"dir. Türkçe bir dosya Batı Avrupa tablosuyla açıldığında \"İstanbul\" yazısı \"Ýstanbul\", \"şeker\" ise \"þeker\" görünür.",
        "Bugün bu karmaşayı çözen standart <strong>UTF-8</strong>'dir. UTF-8 dünyadaki bütün yazı sistemlerini tek tabloda toplar. Ancak eski programlar, bazı Excel sürümleri, televizyonlar ve kurumsal sistemler hâlâ eski tabloları varsayılan olarak kullanabilir. Bozuk karakter, dosyanın bir tabloyla yazılıp başka bir tabloyla okunmasının sonucudur."
      ]
    },
    {
      h: "UTF-8 nedir, Türkçe harfler neden 2 bayt tutar?",
      p: [
        "UTF-8 değişken uzunluklu bir kodlamadır. İngiliz alfabesindeki harfler, rakamlar ve noktalama işaretleri eski ASCII tablosuyla birebir aynı, 1 bayt olarak yazılır. Türkçe harfler 2 bayt, Çince ya da Japonca karakterler 3 bayt, emojiler 4 bayt yer kaplar. Bu tasarım sayesinde İngilizce metinler eski sistemlerle uyumlu kalır, diğer diller de aynı dosyada sorunsuz yer alır.",
        "Bozulmanın mekanizması tam olarak buradan gelir. \"ü\" harfi UTF-8'de C3 ve BC (onluk 195 ve 188) baytlarıyla saklanır. Dosyayı açan program UTF-8 yerine Windows-1252 tablosunu kullanırsa her baytı ayrı bir harf sanır: C3 \"Ã\", BC \"¼\" olur ve ekranda \"Ã¼\" görünür. Bu yüzden UTF-8 kaynaklı bozulmada her Türkçe harfin yerine iki tuhaf karakter gelir."
      ],
      note: "Veritabanı ve SMS gibi karakter sınırı olan yerlerde Türkçe harflerin 2 bayt tutması önemlidir: 160 baytlık bir alan Türkçe harf yoğun bir metinde 160 karakterden azını alır. Ayrıntı için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısına bakabilirsiniz."
    },
    {
      h: "Bozuk görüntüden hatanın kaynağını tanımak",
      p: [
        "Ekranda gördüğünüz bozuk karakterler, hatanın hangi yönde yapıldığını büyük ölçüde ele verir. Bu teşhis doğru çözümü seçmek için önemlidir."
      ],
      table: {
        head: ["Ekranda görünen", "Doğrusu", "Ne oldu?", "Çözüm"],
        rows: [
          ["Ã¼, Ã§, Ã¶, ÅŸ, Ä±, ÄŸ, Ä°", "ü, ç, ö, ş, ı, ğ, İ", "UTF-8 metin Windows-1252 ile okundu", "Dosyayı UTF-8 olarak yeniden açın"],
          ["þ, ý, ð, Þ, Ý, Ð", "ş, ı, ğ, Ş, İ, Ğ", "Windows-1254 metin Batı Avrupa tablosuyla okundu", "Kodlamayı Türkçe (1254) seçin, sonra UTF-8 kaydedin"],
          ["� ya da kutu karakteri", "Herhangi bir Türkçe harf", "Windows-1254 metin UTF-8 sanılarak okundu", "Dosyayı Türkçe (1254) olarak açın"],
          ["? (soru işareti)", "Herhangi bir Türkçe harf", "Harf, desteklemeyen bir kodlamayla kaydedilirken kayboldu", "Özgün kaynaktan yeniden alın; bilgi kalıcı olarak silinmiştir"],
          ["Ã„Â± gibi dörtlü karakterler", "ı", "Bozuk metin bir kez daha yanlış kaydedildi", "Düzeltmeyi iki kez uygulamak gerekebilir"]
        ]
      },
      after: [
        "Soru işareti durumu diğerlerinden farklıdır. Ötekilerde baytlar dosyada doğru durur ve yalnızca yanlış okunur; doğru kodlamayla açınca metin geri gelir. Soru işaretinde ise kaydeden program harfi tabloda bulamadığı için yerine gerçekten \"?\" yazmıştır. Bu durumda metni özgün kaynaktan yeniden almak dışında bir çözüm yoktur."
      ]
    },
    {
      h: "CSV dosyasında Türkçe karakter neden bozulur, nasıl düzeltilir?",
      p: [
        "En sık karşılaşılan durum budur: bir web sitesinden, muhasebe programından ya da pazaryeri panelinden indirilen CSV dosyası Excel'de çift tıklayarak açıldığında Türkçe harfler bozulur. Nedeni, dosyanın UTF-8 kaydedilmiş olması ama Excel'in CSV'yi açarken bilgisayarın bölgesel varsayılan tablosunu (Türkçe Windows'ta 1254) kullanmasıdır.",
        "Excel'e dosyanın UTF-8 olduğunu anlatmanın en pratik yolu, dosyanın başına <strong>BOM</strong> (bayt sırası işareti) adı verilen görünmez bir işaret eklemektir. BOM'lu UTF-8 dosyayı Excel doğru açar. Dosyayı oluşturan siz değilseniz şu yöntemlerden birini kullanabilirsiniz:"
      ],
      ol: [
        "Excel'de boş bir çalışma kitabı açın; Veri sekmesinden \"Metinden/CSV'den\" seçeneğiyle dosyayı içe aktarın.",
        "Açılan önizlemede \"Dosya kaynağı\" ya da kodlama listesinden \"65001: Unicode (UTF-8)\" seçin; harflerin düzeldiğini önizlemede görün.",
        "Ayraç olarak dosyadaki işareti (virgül, noktalı virgül ya da sekme) seçin ve yükleyin.",
        "Alternatif olarak dosyayı [[arac:csv-excel|CSV Excel Dönüştürücü]]ye sürükleyin; araç kodlamayı ve ayracı kendisi algılar, Türkçe harfleri koruyarak .xlsx dosyası üretir.",
        "Kendi oluşturduğunuz CSV'leri başkalarına gönderecekseniz \"CSV UTF-8\" biçiminde kaydedin."
      ],
      after: [
        "Türkçe bölge ayarlı Excel'de ondalık ayırıcı virgül olduğu için CSV ayracı olarak noktalı virgül kullanılır. Virgülle ayrılmış bir dosya tek sütunda toplanıyorsa sorun kodlama değil ayraçtır; içe aktarmada ayraç seçimini değiştirmek yeterlidir."
      ]
    },
    {
      h: "Büyük İ ve küçük ı sorunu neden olur?",
      p: [
        "Türkçe, noktalı ve noktasız i'yi ayrı harf olarak kullanan az sayıdaki dilden biridir: i'nin büyüğü İ, ı'nın büyüğü I'dır. İngilizce başta olmak üzere çoğu dilde ise yalnızca i ve I vardır. Programlar büyük-küçük harf dönüşümünü varsayılan olarak İngilizce kurallarla yaptığında \"istanbul\" büyütülünce \"ISTANBUL\", \"IŞIK\" küçültülünce \"işik\" olur.",
        "Daha ince bir sorun da vardır: İngilizce kurallarla \"İ\" küçültüldüğünde bazı programlar düz \"i\" yerine \"i\" artı görünmez bir nokta işareti üretir. Ekranda aynı görünen iki kelime, arama ve sıralamada farklı kabul edilir; \"İzmir\" araması \"izmir\"i bulamayabilir.",
        "Çözüm, dönüşümü Türkçe dil ayarıyla yapmaktır. Programlama dillerinde bunun için Türkçe yerel ayarı (tr-TR) belirtilir; ofis programlarında belge dilinin Türkçe seçilmesi gerekir. Metni elle düzeltmek yerine [[arac:buyuk-kucuk-harf-donustur|Büyük Küçük Harf Dönüştürücü]], İ/ı ve I/i kurallarını Türkçeye göre uygular."
      ]
    },
    {
      h: "Türkçe karakterleri İngilizce karşılığına çevirme",
      p: [
        "Bazı durumlarda Türkçe karakterden tamamen kaçınmak gerekir: eski bir bankacılık ya da kargo sistemi yalnızca İngiliz alfabesini kabul ediyorsa, dosya adı farklı işletim sistemlerinde paylaşılacaksa ya da e-posta adresi oluşturuluyorsa. Bu işleme harf çevirisi (transliterasyon) denir ve eşleme sabittir:"
      ],
      table: {
        head: ["Türkçe", "ç", "ğ", "ı", "İ", "ö", "ş", "ü"],
        rows: [
          ["Karşılığı", "c", "g", "i", "I", "o", "s", "u"],
          ["Büyük harf", "Ç → C", "Ğ → G", "I → I", "İ → I", "Ö → O", "Ş → S", "Ü → U"]
        ]
      },
      after: [
        "Bu dönüşüm geri alınamaz: \"sık\" ile \"sik\" ya da \"aşı\" ile \"asi\" gibi kelimeler aynı yazılır ve anlam karışabilir. Bu yüzden yalnızca zorunlu durumlarda ve metnin aslını saklayarak kullanın. Uzun metinleri tek tek düzeltmek yerine [[arac:turkce-karakter-donustur|Türkçe Karakter Dönüştürücü]] tüm harfleri tek seferde çevirir."
      ]
    },
    {
      h: "URL'de, e-postada ve altyazıda Türkçe karakter",
      p: [
        "<strong>Web adreslerinde</strong> alan adı kısmında Türkçe karakter teknik olarak mümkündür, ancak arka planda farklı bir kodlamaya çevrilir ve paylaşırken uzun, okunaksız bir hâl alabilir. Sayfa yolunda (alan adından sonraki kısımda) Türkçe harfler yüzde işaretli kodlara dönüşür: \"ş\" harfi \"%C5%9F\" olarak görünür. Bu yüzden blog ve ürün sayfası adreslerinde küçük harfli, Türkçe karaktersiz ve tireli bir yazım tercih edilir. Başlığınızı bu biçime [[arac:url-metni-olustur|URL Metni Oluşturucu]] ile dönüştürebilirsiniz.",
        "<strong>E-postada</strong> bozulma genellikle eski bir e-posta istemcisinin ya da toplu gönderim yazılımının kodlamayı bildirmemesinden kaynaklanır. Gönderen tarafta e-posta programının metin kodlaması ayarı UTF-8 seçilmelidir. Alıcı tarafta bozuk görünen bir e-postayı, birçok istemcide \"Görünüm\" ya da \"Kodlama\" menüsünden UTF-8 seçerek okuyabilirsiniz.",
        "<strong>Altyazı dosyalarında</strong> (.srt) aynı sorun televizyon ve medya oynatıcılarda görülür. İnternetten indirilen altyazılar çoğunlukla UTF-8, eski arşiv altyazılar ise Windows-1254 kodludur. Oynatıcının altyazı ayarlarından kodlamayı \"Türkçe\" ya da \"UTF-8\" seçmek ya da dosyayı bir metin düzenleyicide doğru kodlamayla açıp istenen biçimde yeniden kaydetmek sorunu çözer."
      ]
    },
    {
      h: "Web sitesinde ve kendi dosyalarınızda kalıcı çözüm",
      ul: [
        "<strong>Her zaman UTF-8 kaydedin:</strong> Metin düzenleyicilerde \"Farklı kaydet\" penceresinde kodlama seçeneği vardır; UTF-8'i varsayılan yapın.",
        "<strong>Web sayfasında kodlamayı bildirin:</strong> Sayfanın başlık bölümünde <code>meta charset=\"utf-8\"</code> bildirimi bulunmalı, sunucu da aynı kodlamayı göndermelidir.",
        "<strong>Veritabanını tam UTF-8 kurun:</strong> Bazı veritabanlarında eski \"utf8\" seçeneği 4 baytlık karakterleri desteklemez; tam destek için genişletilmiş UTF-8 seçeneği (ör. utf8mb4) kullanılır.",
        "<strong>Dosyayı düzeltmeden üzerine kaydetmeyin:</strong> Bozuk görünen metni o hâliyle kaydetmek, tek katmanlı bozulmayı çift katmanlıya çevirir.",
        "<strong>Eski sistemle veri alışverişinde kodlamayı sorun:</strong> Karşı taraf hâlâ Windows-1254 bekliyorsa dosyayı o kodlamayla dışa aktarmak, sonradan düzeltmekten kolaydır."
      ]
    }
  ],
  faq: [
    ["Türkçe karakterler neden bozuk görünür?", "Metin bir karakter kodlamasıyla kaydedilip başka bir kodlamayla açıldığında aynı baytlar farklı harflere karşılık gelir. Harfler kaybolmamıştır; dosyayı doğru kodlamayla, çoğunlukla UTF-8 ile yeniden açmak metni düzeltir."],
    ["Ã¼ gibi karakterler nasıl düzeltilir?", "Ã¼, ÅŸ, Ä± gibi ikili karakterler UTF-8 metnin Batı Avrupa kodlamasıyla açıldığını gösterir. Dosyayı programın içe aktarma ya da kodlama menüsünden UTF-8 seçerek yeniden açın, ardından UTF-8 olarak kaydedin."],
    ["UTF-8 nedir?", "UTF-8, dünyadaki bütün yazı sistemlerini tek tabloda toplayan güncel karakter kodlama standardıdır. İngilizce harfleri 1 bayt, Türkçe harfleri 2 bayt, emojileri 4 bayt ile saklar ve web sayfalarının büyük çoğunluğunda kullanılır."],
    ["Türkçe karakterler İngilizce karşılığına nasıl çevrilir?", "ç c'ye, ğ g'ye, ı i'ye, İ I'ya, ö o'ya, ş s'ye, ü u'ya çevrilir. Dönüşüm geri alınamadığı ve bazı kelimelerin anlamını karıştırabildiği için yalnızca zorunlu durumlarda ve metnin aslını saklayarak yapılmalıdır."],
    ["Büyük İ ve küçük ı sorunu neden olur?", "Programlar büyük-küçük harf dönüşümünü varsayılan olarak İngilizce kurallarla yapar ve i'yi I'ya, I'yı i'ye çevirir. Türkçe dil ayarı seçildiğinde i'nin büyüğü İ, I'nın küçüğü ı olarak doğru dönüştürülür."],
    ["CSV'de Türkçe karakter neden bozulur?", "Excel CSV dosyasını çift tıklayınca bilgisayarın bölgesel varsayılan kodlamasıyla açar; dosya UTF-8 ise harfler bozulur. Veri sekmesinden içe aktarıp kodlamayı UTF-8 seçmek ya da dosyayı BOM'lu UTF-8 kaydetmek sorunu çözer."],
    ["URL'de Türkçe karakter kullanılır mı?", "Kullanılabilir, ancak adres yolundaki Türkçe harfler yüzde işaretli kodlara dönüşür ve paylaşımda okunaksız görünür. Bu yüzden sayfa adreslerinde küçük harfli, Türkçe karaktersiz ve kelimeleri tireyle ayıran bir yazım tercih edilir."],
    ["E-postada Türkçe karakter sorunu nasıl çözülür?", "Gönderen tarafta e-posta programının metin kodlaması UTF-8 olarak ayarlanmalıdır. Alıcı tarafta bozuk görünen e-posta, istemcinin görünüm ya da kodlama menüsünden UTF-8 seçilerek çoğu zaman düzgün okunabilir."]
  ],
  tools: ["turkce-karakter-donustur", "buyuk-kucuk-harf-donustur", "url-metni-olustur", "csv-excel"],
  related: ["gb-kac-mb-veri-birimleri", "ikilik-sayi-sistemi-nasil-cevrilir"],
  sources: [
    ["Unicode Consortium – Unicode Standardı", "https://home.unicode.org/"],
    ["W3C – Karakter kodlamaları (Character encodings for beginners)", "https://www.w3.org/International/questions/qa-what-is-encoding"]
  ]
};
