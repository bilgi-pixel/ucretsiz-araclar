export default {
  slug: "sql-nedir-temel-sorgular",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "SQL Nedir? SELECT, INSERT, UPDATE, DELETE ve Temel Sorgu Örnekleri",
  pageTitle: "SQL Nedir? SELECT, INSERT, UPDATE ve Temel Sorgu Örnekleri",
  description: "SQL, ilişkisel veritabanlarını sorgulamak ve yönetmek için kullanılan standart dildir. SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE örnekleri ve CSV aktarımı.",
  keywords: ["sql nedir", "sql sorgu örnekleri", "select sorgusu", "insert into örneği", "update delete sql", "where order by kullanımı", "sql öğrenme", "csv'den sql"],
  lead: "SQL (Structured Query Language, yapılandırılmış sorgu dili), ilişkisel veritabanlarındaki tablolara veri eklemek, bu verileri sorgulamak, güncellemek ve silmek için kullanılan standart dildir. En temel komutlar dört tanedir: verileri okuyan <code>SELECT</code>, yeni satır ekleyen <code>INSERT</code>, mevcut satırı değiştiren <code>UPDATE</code> ve satır silen <code>DELETE</code>. Örneğin <code>SELECT ad, fiyat FROM urunler WHERE fiyat < 500 ORDER BY fiyat;</code> sorgusu 500 TL'nin altındaki ürünleri ucuzdan pahalıya listeler. Bu sayfada örnek bir tablo üzerinden temel sorguları, sık yapılan hataları ve Excel ya da CSV verisini veritabanına aktarmayı bulacaksınız.",
  kisaCevap: [
    "SQL, ilişkisel veritabanlarıyla konuşmak için kullanılan, ANSI ve ISO tarafından standartlaştırılmış bir sorgu dilidir.",
    "SELECT veri okur, INSERT satır ekler, UPDATE satır günceller, DELETE satır siler.",
    "WHERE hangi satırların etkileneceğini, ORDER BY sonuçların sıralamasını belirler.",
    "UPDATE ve DELETE komutlarında WHERE unutulursa tablodaki tüm satırlar etkilenir.",
    "MySQL, PostgreSQL, SQLite ve SQL Server SQL dilini kullanan farklı veritabanı yönetim sistemleridir.",
    "CSV dosyası, her satır için bir INSERT komutu üretilerek veritabanına aktarılabilir."
  ],
  figure: {
    alt: "Örnek urunler tablosu ve SELECT sorgusunun işleyişi: FROM tabloyu seçer, WHERE fiyatı 500'den küçük satırları süzer, ORDER BY fiyata göre sıralar, SELECT ad ve fiyat sütunlarını döndürür; sonuçta üç satır.",
    caption: "Sorgu yazılış sırasıyla değil, mantıksal sırayla işlenir: önce FROM, sonra WHERE, ardından SELECT ve en son ORDER BY. Beş ürünlük tablodan fiyatı 500 TL'nin altındaki üç ürün ucuzdan pahalıya döner.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">SELECT sorgusu adım adım</text>
  <rect x="20" y="44" width="680" height="40" rx="8" class="p"/>
  <text x="360" y="70" class="b mid sf">SELECT ad, fiyat FROM urunler WHERE fiyat &lt; 500 ORDER BY fiyat;</text>
  <text x="20" y="112" class="b">urunler tablosu</text>
  <g class="sm">
    <rect x="20" y="122" width="330" height="30" class="ps"/>
    <text x="34" y="142" class="b">id</text><text x="74" y="142" class="b">ad</text><text x="220" y="142" class="b">fiyat</text><text x="290" y="142" class="b">stok</text>
    <rect x="20" y="152" width="330" height="30" class="oks"/><text x="34" y="172">1</text><text x="74" y="172">Defter</text><text x="220" y="172">45</text><text x="290" y="172">120</text>
    <rect x="20" y="182" width="330" height="30" class="sf sb"/><text x="34" y="202">2</text><text x="74" y="202">Yazıcı</text><text x="220" y="202">4.200</text><text x="290" y="202">8</text>
    <rect x="20" y="212" width="330" height="30" class="oks"/><text x="34" y="232">3</text><text x="74" y="232">Toner</text><text x="220" y="232">450</text><text x="290" y="232">30</text>
    <rect x="20" y="242" width="330" height="30" class="oks"/><text x="34" y="262">4</text><text x="74" y="262">Kalem</text><text x="220" y="262">20</text><text x="290" y="262">500</text>
    <rect x="20" y="272" width="330" height="30" class="sf sb"/><text x="34" y="292">5</text><text x="74" y="292">Monitör</text><text x="220" y="292">6.500</text><text x="290" y="292">5</text>
  </g>
  <g class="sm">
    <rect x="380" y="112" width="150" height="34" rx="6" class="sf sb"/><text x="455" y="134" class="mid b">1. FROM</text>
    <rect x="380" y="154" width="150" height="34" rx="6" class="sf sb"/><text x="455" y="176" class="mid b">2. WHERE</text>
    <rect x="380" y="196" width="150" height="34" rx="6" class="sf sb"/><text x="455" y="218" class="mid b">3. SELECT</text>
    <rect x="380" y="238" width="150" height="34" rx="6" class="sf sb"/><text x="455" y="260" class="mid b">4. ORDER BY</text>
    <text x="545" y="134">tabloyu al</text>
    <text x="545" y="176">fiyat 500'den küçük</text>
    <text x="545" y="218">ad, fiyat sütunları</text>
    <text x="545" y="260">fiyata göre artan</text>
  </g>
  <text x="380" y="300" class="b">Sonuç</text>
  <g class="sm">
    <rect x="380" y="310" width="320" height="28" class="p"/><text x="394" y="329" class="b sf">ad</text><text x="560" y="329" class="b sf">fiyat</text>
    <rect x="380" y="338" width="320" height="28" class="sf sb"/><text x="394" y="357">Kalem</text><text x="560" y="357">20</text>
    <rect x="380" y="366" width="320" height="28" class="sf sb"/><text x="394" y="385">Defter</text><text x="560" y="385">45</text>
    <rect x="380" y="394" width="320" height="28" class="sf sb"/><text x="394" y="413">Toner</text><text x="560" y="413">450</text>
  </g>
  <text x="20" y="330" class="sm t2">Yeşil satırlar WHERE koşulunu sağlar.</text>
</svg>`
  },
  sections: [
    {
      h: "SQL nedir, ne işe yarar?",
      p: [
        "SQL, verileri satır ve sütunlardan oluşan tablolarda saklayan <strong>ilişkisel veritabanlarıyla</strong> çalışmak için geliştirilmiş bir dildir. Bir e-ticaret sitesinin ürünleri, siparişleri ve müşterileri; bir muhasebe programının faturaları; bir okulun öğrenci notları genellikle böyle tablolarda tutulur ve SQL ile sorgulanır.",
        "SQL'in gücü, \"nasıl\" değil \"ne\" istediğinizi söylemenizdir. \"Ankara'daki müşterilerin geçen ayki toplam siparişini göster\" demek için verilerin diskte nasıl dizildiğini bilmeniz gerekmez; veritabanı sorguyu en verimli yolla kendisi çalıştırır. Bu yüzden SQL yalnızca yazılımcıların değil, veri analistlerinin, raporlama yapan muhasebecilerin ve e-ticaret yöneticilerinin de sık kullandığı bir araçtır.",
        "Dil 1970'lerde geliştirilmiş, 1980'lerden itibaren ANSI ve ISO tarafından standartlaştırılmıştır. Standart sayesinde temel komutlar farklı veritabanı sistemlerinde büyük ölçüde aynı şekilde çalışır."
      ]
    },
    {
      h: "Tablo, satır ve sütun: temel kavramlar",
      p: [
        "Bir veritabanı birden fazla tablodan oluşur. Her <strong>tablo</strong> belirli bir konuyu (ürünler, müşteriler), her <strong>sütun</strong> bir özelliği (ad, fiyat, stok), her <strong>satır</strong> ise bir kaydı (tek bir ürün) temsil eder. Her sütunun bir veri türü vardır: metin, tam sayı, ondalıklı sayı, tarih gibi. Her satırı benzersiz biçimde tanımlayan sütuna <strong>birincil anahtar</strong> denir; örnekteki <code>id</code> sütunu böyledir."
      ],
      table: {
        head: ["Kavram", "Anlamı", "Örnek"],
        rows: [
          ["Tablo", "Aynı türden kayıtların bütünü", "urunler"],
          ["Sütun", "Kayıtların bir özelliği", "fiyat"],
          ["Satır", "Tek bir kayıt", "3, Toner, 450, 30"],
          ["Birincil anahtar", "Her satırı benzersiz tanımlayan değer", "id"],
          ["Yabancı anahtar", "Başka tablodaki kayda bağlantı", "siparisler.urun_id"]
        ]
      },
      formula: "CREATE TABLE urunler (\n  id INTEGER PRIMARY KEY,\n  ad VARCHAR(100) NOT NULL,\n  fiyat DECIMAL(10,2),\n  stok INTEGER\n);"
    },
    {
      h: "SELECT sorgusu nasıl yazılır?",
      p: [
        "SELECT, tablodan veri okumak için kullanılır ve en sık yazılan SQL komutudur. En basit biçimi <code>SELECT * FROM urunler;</code> olup tablodaki tüm sütunları ve satırları getirir. Yıldız (*) yerine sütun adlarını yazmak, yalnızca ihtiyacınız olan veriyi almanızı sağlar ve büyük tablolarda sorguyu hızlandırır."
      ],
      formula: "SELECT * FROM urunler;\nSELECT ad, fiyat FROM urunler;\nSELECT ad, fiyat * 1.20 AS kdv_dahil FROM urunler;\nSELECT COUNT(*) AS urun_sayisi, AVG(fiyat) AS ortalama FROM urunler;",
      after: [
        "Üçüncü örnekte hesaplanmış bir sütun oluşturulmuş ve <code>AS</code> ile ona ad verilmiştir. Dördüncü örnekteki <code>COUNT</code>, <code>AVG</code>, <code>SUM</code>, <code>MIN</code> ve <code>MAX</code> birleştirme (toplama) fonksiyonlarıdır; satırları tek bir özet değere indirir. Bunları <code>GROUP BY</code> ile birlikte kullanarak örneğin kategori başına ürün sayısını bulabilirsiniz."
      ]
    },
    {
      h: "WHERE ve ORDER BY nasıl kullanılır?",
      p: [
        "<code>WHERE</code>, sorgunun hangi satırları dikkate alacağını belirleyen koşuldur. Karşılaştırma işleçleri (=, <, >, <=, >=, <>), mantıksal bağlaçlar (AND, OR, NOT) ve özel işleçlerle (BETWEEN, IN, LIKE, IS NULL) koşullar kurulur. <code>ORDER BY</code> ise sonucu bir ya da birden fazla sütuna göre sıralar; varsayılan artan (ASC), tersi azalan (DESC) sıralamadır."
      ],
      formula: "SELECT ad, fiyat FROM urunler WHERE fiyat < 500 ORDER BY fiyat;\nSELECT ad FROM urunler WHERE stok > 0 AND fiyat BETWEEN 100 AND 1000;\nSELECT ad FROM urunler WHERE ad LIKE 'To%';\nSELECT ad, stok FROM urunler ORDER BY stok DESC LIMIT 3;",
      ol: [
        "İlk sorgu, örnek tablodaki beş üründen fiyatı 500'ün altında olan Kalem (20), Defter (45) ve Toner'i (450) ucuzdan pahalıya döndürür.",
        "İkinci sorgu stokta olan ve fiyatı 100 ile 1.000 arasında olan ürünleri getirir: yalnızca Toner.",
        "Üçüncü sorgu adı \"To\" ile başlayanları bulur; yüzde işareti herhangi sayıda karakter anlamına gelir.",
        "Dördüncü sorgu stoğu en yüksek üç ürünü listeler; <code>LIMIT</code> bazı sistemlerde farklı yazılır (ör. TOP ya da FETCH FIRST)."
      ],
      after: [
        "Metin karşılaştırmalarında büyük-küçük harf duyarlılığı ve Türkçe karakterlerin sıralanması veritabanının karakter seti ve harmanlama (collation) ayarına bağlıdır. Türkçe veride \"İ\" ve \"ı\" harflerinin doğru sıralanması için uygun ayarın seçilmesi gerekir; karakter kodlaması konusunu [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8]] yazısında bulabilirsiniz. Metin aramalarında daha esnek desenler için [[bilgi:regex-nedir-duzenli-ifade-ornekleri|düzenli ifadeler]] de kullanılabilir."
      ]
    },
    {
      h: "INSERT, UPDATE ve DELETE ne yapar?",
      p: [
        "Bu üç komut veriyi değiştirir ve bu yüzden dikkatle kullanılmalıdır. <code>INSERT INTO</code> tabloya yeni satır ekler; sütun adlarını açıkça yazmak, tablo yapısı değişse bile komutun doğru çalışmasını sağlar. <code>UPDATE</code> mevcut satırlardaki değerleri değiştirir, <code>DELETE</code> satırları siler."
      ],
      formula: "INSERT INTO urunler (id, ad, fiyat, stok) VALUES (6, 'Kâğıt', 150, 200);\nUPDATE urunler SET fiyat = 480 WHERE id = 3;\nUPDATE urunler SET stok = stok - 1 WHERE id = 1;\nDELETE FROM urunler WHERE stok = 0;",
      after: [
        "<strong>En önemli kural:</strong> UPDATE ve DELETE komutlarında WHERE koşulunu unutmak tablodaki <em>tüm</em> satırları etkiler. <code>UPDATE urunler SET fiyat = 480;</code> komutu bütün ürünlerin fiyatını 480 yapar. Bu yüzden değiştirme komutunu çalıştırmadan önce aynı WHERE koşuluyla bir SELECT çalıştırıp hangi satırların etkileneceğini görmek, mümkünse işlemi bir transaction içinde yapmak (BEGIN … COMMIT, gerekirse ROLLBACK) ve önemli tablolarda önce yedek almak iyi bir alışkanlıktır."
      ],
      note: "Değiştirme komutlarını canlı (üretim) veritabanında doğrudan denemeyin; önce bir test kopyasında çalıştırın ve yedeğinizin güncel olduğundan emin olun."
    },
    {
      h: "MySQL ile SQL aynı şey mi?",
      p: [
        "Hayır. <strong>SQL bir dildir</strong>; MySQL, PostgreSQL, SQLite, MariaDB, Microsoft SQL Server ve Oracle Database ise bu dili kullanan <strong>veritabanı yönetim sistemleridir</strong>. Benzetmeyle söylersek SQL Türkçe ise bu sistemler Türkçe konuşan farklı kişilerdir: temel kelimeler ve dil bilgisi ortaktır, ama her birinin kendine özgü deyimleri vardır.",
        "Temel SELECT, INSERT, UPDATE ve DELETE komutları sistemlerin hepsinde büyük ölçüde aynıdır. Farklar daha çok ileri özelliklerde, veri türlerinde, tarih fonksiyonlarında ve sonuç sınırlama sözdiziminde görülür. Bir sistemde öğrendiğiniz SQL bilgisi diğerine büyük ölçüde taşınır."
      ],
      table: {
        head: ["Sistem", "Tipik kullanım", "Not"],
        rows: [
          ["SQLite", "Mobil uygulamalar, masaüstü programlar, küçük projeler", "Tek dosyada çalışır, sunucu gerektirmez"],
          ["MySQL / MariaDB", "Web siteleri, içerik yönetim sistemleri", "Paylaşımlı barındırmada yaygındır"],
          ["PostgreSQL", "Kurumsal uygulamalar, veri analizi", "Standartlara bağlılığı ve gelişmiş özellikleriyle bilinir"],
          ["SQL Server, Oracle", "Büyük kurumsal sistemler", "Ticari lisanslı sürümleri vardır"]
        ]
      }
    },
    {
      h: "Excel ya da CSV verisi veritabanına nasıl aktarılır?",
      p: [
        "Elinizdeki bir ürün listesi ya da müşteri tablosu genellikle Excel'de durur. Excel dosyasını önce CSV (virgülle ayrılmış değerler) olarak kaydedip ardından iki yoldan biriyle veritabanına aktarabilirsiniz: veritabanının kendi içe aktarma aracını kullanmak ya da her satır için bir INSERT komutu üretmek. İkinci yol küçük ve orta büyüklükteki listeler için pratiktir ve her sistemde çalışır."
      ],
      ol: [
        "Excel'de ilk satırın sütun başlıklarını içerdiğinden ve başlıkların veritabanındaki sütun adlarıyla eşleştiğinden emin olun.",
        "Dosyayı UTF-8 kodlamalı CSV olarak kaydedin; Türkçe karakterlerin bozulmaması için kodlama önemlidir.",
        "Ondalık ayırıcıyı kontrol edin: Türkçe Excel virgül kullanır, SQL ise ondalık için nokta bekler (450,50 yerine 450.50).",
        "CSV'yi bir dönüştürücüyle INSERT komutlarına çevirin; metin değerlerindeki tek tırnaklar kaçış karakteriyle iki tırnağa dönüştürülmelidir.",
        "Komutları önce test veritabanında çalıştırın, satır sayısını SELECT COUNT(*) ile kontrol edin."
      ],
      after: [
        "Bu dönüşümü [[arac:csv-sql-donustur|CSV'den SQL INSERT Oluşturma aracı]] tarayıcınızda yapar; veri hiçbir sunucuya gönderilmez. Aynı veriyi bir web uygulamasında kullanacaksanız [[arac:csv-json-donustur|CSV JSON Dönüştürücü]] ile JSON biçimine de çevirebilirsiniz; JSON'un yapısı [[bilgi:json-nedir-nasil-okunur|JSON nedir]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Karmaşık SQL sorgusu nasıl okunur hâle getirilir?",
      p: [
        "Tek satıra sıkıştırılmış uzun bir sorgu, özellikle birden fazla tablo birleştirildiğinde okunması zor bir metne dönüşür. Okunabilir SQL için yaygın kurallar şunlardır: her ana anahtar kelimeyi (SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY) yeni satıra yazmak, anahtar kelimeleri büyük harfle yazmak, sütun listesini girintilemek ve tablolara kısa ama anlamlı takma adlar vermek."
      ],
      formula: "SELECT\n  m.ad,\n  SUM(s.tutar) AS toplam\nFROM siparisler AS s\nJOIN musteriler AS m ON m.id = s.musteri_id\nWHERE s.tarih >= '2026-10-01'\nGROUP BY m.ad\nORDER BY toplam DESC;",
      after: [
        "Bu sorgu Ekim 2026'dan itibaren sipariş veren müşterileri toplam harcamalarına göre büyükten küçüğe sıralar. Tek satırlık bir sorguyu bu düzene getirmek için [[arac:sql-bicimlendir|SQL Biçimlendirici]] kullanılabilir; biçimlendirme sorgunun sonucunu değiştirmez, yalnızca okunurluğunu artırır."
      ]
    },
    {
      h: "SQL öğrenmek ne kadar sürer? Sık yapılan hatalar",
      p: [
        "Temel SELECT, WHERE, ORDER BY, INSERT, UPDATE ve DELETE komutlarını düzenli pratikle birkaç günde rahatça kullanabilirsiniz. JOIN, GROUP BY ve alt sorgular gibi konular birkaç haftalık pratik gerektirir. Dizinler (index), performans ayarı ve veritabanı tasarımı ise zamanla, gerçek projelerde derinleşen konulardır. En hızlı öğrenme yolu, küçük bir örnek veritabanı kurup kendi sorularınızı SQL ile cevaplamaya çalışmaktır."
      ],
      ul: [
        "<strong>WHERE'siz UPDATE ve DELETE:</strong> Tüm tabloyu etkiler.",
        "<strong>Metni tırnaksız yazmak:</strong> Metin değerleri tek tırnak içinde yazılır: 'Toner'.",
        "<strong>NULL'u = ile karşılaştırmak:</strong> Boş değer kontrolü <code>IS NULL</code> ile yapılır.",
        "<strong>Ondalık virgül:</strong> SQL'de ondalık ayırıcı noktadır.",
        "<strong>Kullanıcı girdisini sorguya doğrudan eklemek:</strong> Uygulamalarda parametreli sorgu kullanılmazsa SQL enjeksiyonu güvenlik açığı oluşur.",
        "<strong>Her yerde SELECT *:</strong> Gereksiz sütunlar büyük tablolarda sorguyu yavaşlatır."
      ]
    }
  ],
  faq: [
    ["SQL nedir, ne işe yarar?", "SQL, ilişkisel veritabanlarındaki tablolara veri eklemek, verileri sorgulamak, güncellemek ve silmek için kullanılan standart sorgu dilidir. E-ticaret, muhasebe ve raporlama gibi alanlarda verilerden istenen bilgiyi çekmek ve yönetmek için yaygın olarak kullanılır."],
    ["SELECT sorgusu nasıl yazılır?", "SELECT anahtar kelimesinden sonra istenen sütunlar, FROM ile tablo adı yazılır: SELECT ad, fiyat FROM urunler; Tüm sütunlar için yıldız kullanılabilir. Satırları süzmek için WHERE, sıralamak için ORDER BY eklenir ve komut noktalı virgülle bitirilir."],
    ["INSERT, UPDATE ve DELETE ne yapar?", "INSERT INTO tabloya yeni satır ekler, UPDATE mevcut satırlardaki değerleri değiştirir, DELETE ise satırları siler. UPDATE ve DELETE komutlarında WHERE koşulu unutulursa tablodaki tüm satırlar etkilenir; bu yüzden önce aynı koşulla SELECT çalıştırmak iyi bir alışkanlıktır."],
    ["WHERE ve ORDER BY nasıl kullanılır?", "WHERE hangi satırların sorguya dahil edileceğini koşullarla belirler, örneğin WHERE fiyat < 500. ORDER BY sonucu bir sütuna göre sıralar; varsayılan artan sıralamadır, azalan için DESC eklenir. İkisi birlikte kullanıldığında WHERE önce, ORDER BY sonda yazılır."],
    ["MySQL ile SQL aynı şey mi?", "Hayır. SQL bir sorgu dilidir; MySQL ise bu dili kullanan veritabanı yönetim sistemlerinden biridir. PostgreSQL, SQLite ve SQL Server da SQL kullanır. Temel komutlar hepsinde büyük ölçüde aynıdır, farklar ileri özelliklerde ve bazı sözdizimi ayrıntılarında görülür."],
    ["Excel/CSV verisi veritabanına nasıl aktarılır?", "Excel dosyası UTF-8 kodlamalı CSV olarak kaydedilir, ondalık virgüller noktaya çevrilir ve her satır için bir INSERT komutu üretilir ya da veritabanının içe aktarma aracı kullanılır. Komutlar önce test veritabanında çalıştırılıp satır sayısı kontrol edilmelidir."],
    ["Karmaşık SQL sorgusu nasıl okunur hâle getirilir?", "Her ana anahtar kelimeyi yeni satıra yazmak, anahtar kelimeleri büyük harfle yazmak, sütun listesini girintilemek ve tablolara anlamlı takma adlar vermek okunurluğu artırır. Bir SQL biçimlendirici bu düzenlemeyi otomatik yapar ve sorgunun sonucunu değiştirmez."],
    ["SQL öğrenmek ne kadar sürer?", "Temel okuma ve yazma komutları düzenli pratikle birkaç günde öğrenilebilir. JOIN, GROUP BY ve alt sorgular birkaç haftalık çalışma gerektirir; performans ve veritabanı tasarımı ise gerçek projelerde zamanla derinleşir. Küçük bir örnek veritabanıyla pratik yapmak en hızlı yoldur."],
    ["SQL enjeksiyonu nedir?", "SQL enjeksiyonu, kullanıcıdan alınan metnin doğrudan sorguya eklenmesiyle saldırganın kendi SQL kodunu çalıştırabildiği bir güvenlik açığıdır. Uygulamalarda parametreli sorgular ya da hazırlanmış ifadeler kullanmak, kullanıcı girdisini veriden ayırarak bu riski önler."]
  ],
  tools: ["sql-bicimlendir", "csv-sql-donustur", "csv-json-donustur"],
  related: ["json-nedir-nasil-okunur", "regex-nedir-duzenli-ifade-ornekleri", "ascii-unicode-utf8-farki", "uuid-guid-nedir"]
};
