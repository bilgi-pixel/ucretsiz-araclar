export default {
  slug: "sku-stok-kodu-nasil-olusturulur",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "SKU Nedir? Stok Kodu Nasıl Oluşturulur, Barkoddan Farkı Nedir",
  pageTitle: "SKU Nedir? Stok Kodu Nasıl Oluşturulur, Barkod Farkı",
  description: "SKU, işletmenin her ürün ve varyantına verdiği kendi stok kodudur; barkod (EAN) ise ürünün evrensel numarasıdır. Kod yapısı, varyant kodlama ve yasak karakterler.",
  keywords: ["sku nedir", "stok kodu nasıl oluşturulur", "ürün kodu sistemi", "sku barkod farkı", "varyant kodu", "stok kartı", "e-ticaret ürün kodu", "satıcı stok kodu"],
  lead: "SKU (stock keeping unit, stok tutma birimi), bir işletmenin sattığı <strong>her ürün ve her varyant için kendi belirlediği benzersiz stok kodudur</strong>: örneğin \"TSH-PMK-BYZ-M\" kodu beyaz, pamuklu, M beden bir tişörtü anlatır. Barkod numarası (EAN-13) ise ürünün dünya genelinde tanınan ve üreticiye bağlı numarasıdır; aynı ürünü satan bütün mağazalarda aynıdır. İyi kurulmuş bir SKU sistemi stok sayımını, sipariş toplamayı ve birden fazla pazaryerinde stok eşleştirmeyi kolaylaştırır. Bu sayfada anlamlı bir stok kodu kurgulamayı, renk–beden varyantlarını, kaçınılması gereken karakterleri ve raf etiketiyle eşleştirmeyi anlatıyoruz.",
  kisaCevap: [
    "SKU, işletmenin her ürün ve varyant için kendi verdiği iç stok kodudur; başka işletmelerde aynı olmak zorunda değildir.",
    "Barkod (EAN-13) 13 haneli, yalnızca rakamdan oluşan ve ürüne üretici tarafından verilen evrensel numaradır.",
    "İyi bir SKU kısa, sabit uzunlukta bölümlerden oluşan, büyük harf ve rakamla yazılmış, tire ile ayrılmış bir koddur: KTG-MDL-RNK-BDN.",
    "Her renk–beden kombinasyonu ayrı bir SKU'dur; ortak ana kod korunur, yalnızca sondaki varyant bölümü değişir.",
    "Boşluk, Türkçe karakter, eğik çizgi ve O ile 0, I ile 1 gibi karıştırılan karakterlerden kaçının."
  ],
  figure: {
    alt: "SKU kodunun anatomisi: TSH-PMK-BYZ-M kodu dört bölümden oluşur; kategori (tişört), malzeme (pamuk), renk (beyaz), beden (M). Altında aynı ürünün barkod numarasıyla karşılaştırması: SKU işletmeye özel ve okunabilir, barkod evrensel ve yalnızca rakam.",
    caption: "SKU okunabilir bir iç koddur; depodaki çalışan kodu görünce ürünü tanır. Barkod ise makine içindir ve ürünün kendisini değil, üreticinin verdiği numarayı taşır. İkisi stok kartında yan yana durur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir stok kodunun anatomisi</text>
  <g class="mid">
    <rect x="40" y="56" width="150" height="70" rx="8" class="p"/><text x="115" y="100" class="xl sf">TSH</text>
    <text x="205" y="100" class="xl">-</text>
    <rect x="220" y="56" width="150" height="70" rx="8" class="ps"/><text x="295" y="100" class="xl">PMK</text>
    <text x="385" y="100" class="xl">-</text>
    <rect x="400" y="56" width="150" height="70" rx="8" class="ps"/><text x="475" y="100" class="xl">BYZ</text>
    <text x="565" y="100" class="xl">-</text>
    <rect x="580" y="56" width="100" height="70" rx="8" class="oks"/><text x="630" y="100" class="xl">M</text>
    <text x="115" y="148" class="sm">kategori: tişört</text>
    <text x="295" y="148" class="sm">malzeme: pamuk</text>
    <text x="475" y="148" class="sm">renk: beyaz</text>
    <text x="630" y="148" class="sm">beden</text>
  </g>
  <text x="40" y="186" class="b">Varyantlar: ana kod aynı, son bölüm değişir</text>
  <g class="sm">
    <rect x="40" y="198" width="200" height="34" rx="6" class="sf sb"/><text x="140" y="220" class="mid">TSH-PMK-BYZ-S</text>
    <rect x="260" y="198" width="200" height="34" rx="6" class="sf sb"/><text x="360" y="220" class="mid">TSH-PMK-BYZ-L</text>
    <rect x="480" y="198" width="200" height="34" rx="6" class="sf sb"/><text x="580" y="220" class="mid">TSH-PMK-SYH-M</text>
  </g>
  <rect x="40" y="258" width="310" height="140" rx="8" class="ps"/>
  <text x="195" y="286" class="mid b">SKU (stok kodu)</text>
  <text x="60" y="314" class="sm">İşletmeye özel, siz belirlersiniz</text>
  <text x="60" y="338" class="sm">Harf + rakam, okunabilir</text>
  <text x="60" y="362" class="sm">Her varyant ayrı kod</text>
  <text x="60" y="386" class="sm">Etikette Code 128 barkodla basılır</text>
  <rect x="370" y="258" width="310" height="140" rx="8" class="sf sb"/>
  <text x="525" y="286" class="mid b">Barkod (EAN-13)</text>
  <text x="390" y="314" class="sm">Üretici verir, her mağazada aynı</text>
  <text x="390" y="338" class="sm">13 hane, yalnızca rakam</text>
  <text x="390" y="362" class="sm">Son hane kontrol basamağı</text>
  <text x="390" y="386" class="sm">Kasada ve pazaryerinde tanımlayıcı</text>
</svg>`
  },
  sections: [
    {
      h: "SKU nedir?",
      p: [
        "SKU, İngilizce \"stock keeping unit\" ifadesinin kısaltmasıdır ve Türkçede stok kodu, ürün kodu ya da stok tutma birimi olarak karşılanır. İşletmenin stokta ayrı ayrı izlemek istediği her kalem için verdiği benzersiz koddur. \"Stokta ayrı izlemek\" ifadesi önemlidir: aynı tişörtün beyaz M bedeni ile siyah L bedeni müşteri gözünde aynı ürünün iki seçeneğidir, ama depoda ayrı raflarda durur ve ayrı ayrı biter. Bu yüzden her biri ayrı bir SKU'dur.",
        "SKU tamamen işletmeye özeldir. Aynı ürünü satan iki mağaza farklı stok kodları kullanabilir; önemli olan kodun sizin sisteminizde tek bir kalemi göstermesi ve hiçbir zaman başka bir kaleme verilmemesidir. Ön muhasebe programlarında ve e-ticaret altyapılarında stok kartının ana alanı genellikle bu koddur; stok takibinin temelleri için [[bilgi:on-muhasebe-nedir-cari-hesap-takibi|ön muhasebe]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "SKU ile barkod (EAN) arasındaki fark nedir?",
      table: {
        head: ["Özellik", "SKU (stok kodu)", "Barkod numarası (EAN-13)"],
        rows: [
          ["Kim verir?", "İşletmenin kendisi", "Üretici, ulusal barkod kuruluşundan aldığı ön ekle"],
          ["Kapsam", "Yalnızca sizin sisteminiz", "Dünya genelinde aynı ürün için aynı"],
          ["Biçim", "Harf, rakam ve tire; uzunluk serbest", "13 hane, yalnızca rakam, son hane kontrol basamağı"],
          ["Okunabilirlik", "Anlamlı kurgulanırsa insan okuyabilir", "İnsan için anlamsız, makine içindir"],
          ["Varyant", "Her varyant için ayrı", "Her varyant için ayrı (üretici verir)"],
          ["Kullanım", "Depo, sipariş toplama, stok sayımı", "Kasa, pazaryeri ürün eşleştirme, tedarik zinciri"]
        ]
      },
      after: [
        "Kısacası barkod \"bu ürün nedir\" sorusunu dünya ölçeğinde, SKU ise \"bu kalem bizim depomuzda nerede ve kaç tane\" sorusunu işletme ölçeğinde cevaplar. Kendi ürettiğiniz ve barkodu olmayan ürünlerde SKU tek tanımlayıcınızdır; satış kanalınız barkod istiyorsa ulusal barkod kuruluşundan firma ön eki almanız gerekir. Barkod numarasının yapısını [[bilgi:barkod-numarasi-nedir-869-ean13|barkod numarası nedir]] makalesi anlatır."
      ]
    },
    {
      h: "Anlamlı bir stok kodu nasıl kurgulanır?",
      p: [
        "Stok kodu iki şekilde kurgulanabilir: tamamen sıra numarası (\"000123\") ya da anlam taşıyan bölümlerden oluşan kod (\"TSH-PMK-BYZ-M\"). Sıra numarası basittir ve hiç tükenmez, ama çalışan kodu görünce ürünü tanıyamaz. Anlamlı kodlar depoda hata yapmayı azaltır, ancak ürün yelpazesi değiştikçe bölümlerin yetersiz kalmaması için baştan iyi tasarlanmalıdır."
      ],
      ol: [
        "<strong>Bölümleri belirleyin:</strong> Ürünlerinizi en çok neye göre ayırıyorsanız onu seçin: kategori, model ya da seri, malzeme, renk, beden, kapasite.",
        "<strong>Sıralamayı genelden özele kurun:</strong> Kategori en başta, varyant en sonda olsun. Böylece aynı ürünün varyantları alfabetik sıralamada yan yana gelir.",
        "<strong>Her bölümün uzunluğunu sabitleyin:</strong> Kategori 3 harf, model 4 hane, renk 3 harf gibi. Sabit uzunluk hem okumayı hem sıralamayı kolaylaştırır.",
        "<strong>Kısaltma listesi oluşturun:</strong> BYZ beyaz, SYH siyah, LCV lacivert gibi kısaltmaları bir tabloda tutun ve herkes aynı listeyi kullansın.",
        "<strong>Sayıları sıfırla doldurun:</strong> 7 yerine 0007 yazın; aksi hâlde \"10\" sıralamada \"7\"den önce gelir.",
        "<strong>Toplam uzunluğu sınırlayın:</strong> 8–20 karakter çoğu iş için yeterlidir; bazı satış kanalları stok kodu alanına uzunluk sınırı koyar."
      ],
      after: [
        "Örnek: bir yazıcı sarf malzemesi satıcısı \"TNR-0042-SYH\" (toner, model sıra numarası 42, siyah) ve \"DRM-0042\" (aynı modelin drum ünitesi) gibi bir yapı kurabilir. Kodları listeleyip kontrol ederken [[arac:alfabetik-sirala|Alfabetik Sıralama]] aracı Türkçe alfabeye göre sıralar, yinelenen satırları siler; yinelenen bir kod, iki ürüne aynı SKU verildiğinin işaretidir."
      ]
    },
    {
      h: "Renk ve beden varyantları nasıl kodlanır?",
      p: [
        "Varyantlı ürünlerde iki düzeyli bir yapı kullanılır: tüm varyantları kapsayan bir <strong>ana ürün kodu</strong> ve her kombinasyon için ayrı bir <strong>varyant SKU'su</strong>. Ana kod müşterinin gördüğü ürün sayfasını, varyant SKU'su ise depodaki fiziksel kalemi temsil eder."
      ],
      table: {
        head: ["Ana ürün kodu", "Renk", "Beden", "Varyant SKU"],
        rows: [
          ["TSH-PMK", "Beyaz", "S", "TSH-PMK-BYZ-S"],
          ["TSH-PMK", "Beyaz", "M", "TSH-PMK-BYZ-M"],
          ["TSH-PMK", "Siyah", "M", "TSH-PMK-SYH-M"],
          ["TSH-PMK", "Lacivert", "XL", "TSH-PMK-LCV-XL"]
        ],
        caption: "3 renk ve 4 beden 12 varyant SKU'su eder. Varyant sayısı renk sayısı × beden sayısıdır."
      },
      after: [
        "Beden bölümünde S, M, L, XL gibi harf bedenler ile 36, 38, 40 gibi sayı bedenleri karıştırmamak için her kategoride tek bir sistem seçin. Ayakkabı ve çocuk giyimi gibi sayı bedenli ürünlerde bedeni iki ya da üç haneli yazmak (036, 038) sıralamayı düzgün tutar."
      ]
    },
    {
      h: "Pazaryerleri SKU'yu nasıl kullanır?",
      p: [
        "Pazaryerleri ve e-ticaret altyapıları ürün yüklerken genellikle iki alan ister: ürünün barkodu ve satıcının kendi stok kodu. Barkod ürünün hangi katalog kaydıyla eşleşeceğini belirler; satıcı stok kodu ise siparişin sizin stok sisteminizdeki hangi kaleme düşeceğini gösterir. Birden fazla kanalda satış yapıyorsanız her kanalda aynı SKU'yu kullanmak, stok miktarını tek bir yerden güncellemeyi ve siparişleri tek listede toplamayı mümkün kılar.",
        "Kanallar arasında farklı stok kodları kullanmak, aynı ürünün bir kanalda tükenip ötekinde satışta kalması ve iptal edilen siparişler gibi sorunlara yol açar. Kanalların komisyon ve kargo yapısı farklı olsa bile stok kodu ortak tutulmalıdır. Kanal bazında fiyat ve komisyon hesabı için [[bilgi:pazaryeri-komisyonu-nasil-hesaplanir|pazaryeri komisyonu]] makalesine göz atabilirsiniz."
      ]
    },
    {
      h: "Tedarikçi kodu ile kendi stok kodumuz aynı olmalı mı?",
      p: [
        "Genellikle hayır. Tedarikçi kodu, tedarikçinin kendi sistemindeki numaradır ve sizin kod yapınıza uymaz; tedarikçi değiştirdiğinizde ya da aynı ürünü iki tedarikçiden aldığınızda kodunuz da değişmek zorunda kalır. Bunun yerine kendi SKU'nuzu kullanın ve stok kartında tedarikçi kodunu ayrı bir alanda saklayın.",
        "Tedarikçi kodunu SKU'nun önüne bir ön ekle bağlamak (ör. tedarikçinin kısaltması + tedarikçi kodu) birçok ürünü hızlı açmak için pratik görünse de uzun vadede karışıklık yaratır. Böyle bir yapı kullanıyorsanız en azından ön eki sabit tutun ve tedarikçi kodunu hiçbir zaman başka bir ürün için yeniden kullanmayın. Satın alma siparişinde tedarikçi kodunu, depoda ve satışta kendi SKU'nuzu kullanmak en temiz yöntemdir."
      ]
    },
    {
      h: "Stok kodlarında hangi karakterlerden kaçınılmalı?",
      ul: [
        "<strong>Boşluk:</strong> Hesap tablosu ve dosya aktarımlarında kodu ikiye böler; tire (-) kullanın.",
        "<strong>Türkçe karakterler:</strong> Ç, Ğ, İ, Ö, Ş, Ü bazı sistemlerde bozulur ve barkodda kodlanamayabilir; C, G, I, O, S, U kullanın.",
        "<strong>Eğik çizgi ve özel işaretler:</strong> /, \\, &, %, # gibi karakterler dosya adlarında, bağlantılarda ve aktarımlarda sorun çıkarır.",
        "<strong>Karıştırılan karakterler:</strong> O harfi ile 0 rakamı, I harfi ile 1 rakamı elle yazımda karışır; ya birini hiç kullanmayın ya da bölümleri yalnızca harf ya da yalnızca rakam olacak şekilde ayırın.",
        "<strong>Başta sıfır:</strong> \"00123\" gibi kodlar hesap tablosunda sayıya dönüşüp \"123\" olabilir; sütunu metin biçimine ayarlayın ya da kodu harfle başlatın.",
        "<strong>Küçük–büyük harf karışımı:</strong> Kodları her zaman büyük harfle yazın; bazı sistemler \"abc\" ile \"ABC\"yi farklı, bazıları aynı sayar."
      ]
    },
    {
      h: "Raf etiketi ve stok kodu nasıl eşleştirilir?",
      p: [
        "Depoda ve mağazada ürünü doğru yerde bulmak için raf etiketinde stok kodu hem yazı olarak hem de barkod olarak bulunmalıdır. EAN-13 yalnızca rakam kabul ettiği için harf içeren SKU'lar etikette genellikle <strong>Code 128</strong> barkodla basılır; bu barkod türü harf, rakam ve tireyi destekler ve el terminalleriyle okunabilir."
      ],
      ol: [
        "Stok kodu, ürün adı ve gerekiyorsa raf adresini (ör. A-03-2: koridor A, raf 3, kat 2) bir listeye yazın.",
        "[[arac:barkod-olustur|Barkod Oluşturucu]] ile her SKU için Code 128 barkod üretin; ürünün kendi EAN-13 barkodu varsa onu da ekleyebilirsiniz.",
        "[[arac:etiket-olustur|Etiket Oluşturucu]]'da A4 etiket kâğıdı ölçünüzü seçin, listenizi yapıştırın ve barkodlu etiketleri PDF olarak indirin.",
        "Etiketleri rafa, ürünün önüne ve göz hizasına yakın yapıştırın; aynı rafta birden fazla varyant varsa her birini ayrı etiketle işaretleyin.",
        "Stok sayımında el terminaliyle raf etiketini okutup sayılan miktarı girin; böylece sayım SKU bazında hatasız eşleşir."
      ],
      after: [
        "Satış noktasında tüketiciye yönelik fiyat etiketinde yer alması gereken bilgiler ayrı bir konudur; [[bilgi:raf-etiketi-ve-birim-fiyat-zorunlulugu|raf etiketi ve birim fiyat]] makalesi bunu anlatır. Dönem sonu sayımlarında SKU yapısının nasıl kolaylık sağladığını [[bilgi:yil-sonu-stok-sayimi-nasil-yapilir|yıl sonu stok sayımı]] makalesinde görebilirsiniz."
      ]
    }
  ],
  faq: [
    ["SKU nedir?", "SKU, işletmenin stokta ayrı izlediği her ürün ve varyant için kendi verdiği benzersiz stok kodudur. Aynı ürünün her renk ve beden kombinasyonu ayrı bir SKU alır ve kod yalnızca o işletmenin sisteminde geçerlidir."],
    ["SKU ile barkod (EAN) arasındaki fark nedir?", "SKU işletmenin kendi belirlediği, harf ve rakam içerebilen iç koddur. EAN-13 barkod ise üreticinin verdiği, 13 haneli ve yalnızca rakamdan oluşan, aynı ürün için her mağazada aynı olan evrensel numaradır."],
    ["Anlamlı bir stok kodu nasıl kurgulanır?", "Genelden özele sıralanmış, sabit uzunlukta bölümler kullanılır: kategori, model, renk ve beden gibi. Bölümler tire ile ayrılır, sayılar sıfırla doldurulur ve kısaltmalar ortak bir listede tutulur."],
    ["Renk ve beden varyantları nasıl kodlanır?", "Tüm varyantlar için ortak bir ana ürün kodu kullanılır ve sonuna renk ile beden bölümü eklenir. Örneğin TSH-PMK-BYZ-M beyaz M beden, TSH-PMK-SYH-L siyah L beden tişörtü gösterir."],
    ["Pazaryerleri SKU'yu nasıl kullanır?", "Pazaryerleri barkodu katalog eşleştirmesi, satıcı stok kodunu ise siparişin hangi stok kalemine düşeceğini belirlemek için kullanır. Her kanalda aynı SKU'yu kullanmak stok senkronizasyonunu kolaylaştırır."],
    ["Tedarikçi kodu ile kendi stok kodumuz aynı olmalı mı?", "Genellikle hayır. Kendi SKU yapınızı kullanıp tedarikçi kodunu stok kartında ayrı bir alanda saklamak, tedarikçi değiştiğinde ya da aynı ürün iki yerden alındığında karışıklığı önler."],
    ["Stok kodlarında hangi karakterlerden kaçınılmalı?", "Boşluk, Türkçe karakterler, eğik çizgi ve özel işaretlerden kaçının. O ile 0 ve I ile 1 gibi karıştırılan karakterleri ayırın, kodları büyük harfle yazın ve baştaki sıfırların kaybolmasına dikkat edin."],
    ["Raf etiketi ve stok kodu nasıl eşleştirilir?", "Raf etiketinde stok kodu yazı olarak ve Code 128 barkod olarak basılır, raf adresiyle birlikte listelenir. Barkod Oluşturucu ve Etiket Oluşturucu ile A4 etiket kâğıdına barkodlu etiketler hazırlanabilir."],
    ["Bir SKU başka bir ürüne yeniden verilebilir mi?", "Verilmemelidir. Satışı biten bir ürünün kodu yeni bir ürüne verilirse eski sipariş, iade ve stok kayıtları yeni ürünle karışır. Kullanımdan kalkan kodları pasif yapın ve yeni ürüne yeni kod verin."]
  ],
  tools: ["barkod-olustur", "etiket-olustur", "alfabetik-sirala"],
  related: ["barkod-numarasi-nedir-869-ean13", "raf-etiketi-ve-birim-fiyat-zorunlulugu", "yil-sonu-stok-sayimi-nasil-yapilir", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["GS1 – Küresel ürün numaralandırma (GTIN, EAN-13) standartları", "https://www.gs1.org/"]
  ]
};
