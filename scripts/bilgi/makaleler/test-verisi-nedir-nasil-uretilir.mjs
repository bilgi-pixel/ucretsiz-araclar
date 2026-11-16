export default {
  slug: "test-verisi-nedir-nasil-uretilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Test Verisi Nedir, Nasıl Üretilir? Rastgele Tarih, UUID ve Örnek Metin",
  pageTitle: "Test Verisi Nedir, Nasıl Üretilir? KVKK Uyumlu Örnek Veri",
  description: "Test verisi, yazılımı denemek için üretilen ve gerçek kişiye ait olmayan örnek veridir. Rastgele tarih, UUID, seed, CSV ve KVKK açısından dikkat edilecekler.",
  keywords: ["test verisi nedir", "sahte veri üretme", "dummy data", "rastgele tarih üretme", "uuid üretme", "lorem ipsum", "kvkk test verisi", "seed nedir rastgele"],
  lead: "Test verisi, bir yazılımı, formu ya da raporu denemek için üretilen, <strong>gerçek bir kişiye ait olmayan örnek veridir</strong>: rastgele tarihler, benzersiz kimlikler (UUID), örnek metinler ve uydurma ama gerçekçi tutarlar. Gerçek müşteri kayıtlarını testte kullanmak hem güvenlik riski taşır hem de 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun amaçla sınırlılık ilkesiyle bağdaşmaz. Bu sayfada iyi bir test veri setinin özelliklerini, rastgele tarih ve sayı üretmeyi, seed ile tekrar üretilebilirliği, CSV hazırlamayı ve kimlik, IBAN gibi alanlarda neden \"geçerli görünen\" sahte değerlerden kaçınmanız gerektiğini bulacaksınız.",
  kisaCevap: [
    "Test verisi, yazılımı denemek için üretilen ve gerçek kişilere ait olmayan örnek veridir.",
    "Gerçek müşteri verisini test ortamına kopyalamak KVKK'nın amaçla sınırlılık ve ölçülülük ilkeleriyle bağdaşmaz; anonimleştirilmiş ya da sentetik veri kullanın.",
    "Rastgele tarih, başlangıç zamanına (bitiş − başlangıç) aralığında rastgele bir süre eklenerek üretilir.",
    "UUID v4 122 rastgele bit içerir; bir milyar kayıtta bile çakışma olasılığı yaklaşık 10<sup>-19</sup> düzeyindedir.",
    "Aynı test verisini tekrar üretmek için seed (tohum) değeri verilebilen bir rastgele sayı üreteci kullanılır."
  ],
  figure: {
    alt: "Test verisi hazırlama akışı: alanları tanımla, her alan için üretici seç (tarih aralığı, UUID, örnek metin, sayı), seed ile üret, CSV olarak dışa aktar. Kenarda gerçek kişi verisi kullanılmaz uyarısı.",
    caption: "İyi bir test veri seti, gerçek veriye benzer dağılımda ama hiçbir gerçek kişiye bağlanamayan değerlerden oluşur. Seed kullanmak aynı seti istediğiniz zaman yeniden üretmenizi sağlar.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Test verisi hazırlama akışı</text>
  <rect x="20" y="56" width="150" height="70" rx="8" class="p"/>
  <text x="95" y="86" class="mid b sf">1. Alanlar</text><text x="95" y="108" class="sm mid sf">id, tarih, tutar…</text>
  <rect x="200" y="56" width="150" height="70" rx="8" class="sf sb"/>
  <text x="275" y="86" class="mid b">2. Üretici seç</text><text x="275" y="108" class="sm mid mu">her alana bir kural</text>
  <rect x="380" y="56" width="150" height="70" rx="8" class="sf sb"/>
  <text x="455" y="86" class="mid b">3. Seed ile üret</text><text x="455" y="108" class="sm mid mu">seed = 42</text>
  <rect x="560" y="56" width="140" height="70" rx="8" class="oks"/>
  <text x="630" y="86" class="mid b">4. CSV</text><text x="630" y="108" class="sm mid">dışa aktar</text>
  <line x1="170" y1="91" x2="196" y2="91" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="350" y1="91" x2="376" y2="91" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="530" y1="91" x2="556" y2="91" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="20" y="148" width="680" height="150" rx="8" class="sf sb"/>
  <text x="40" y="174" class="b">Örnek satırlar (CSV)</text>
  <text x="40" y="200" class="sm p b">id,musteri,kayit_tarihi,tutar</text>
  <text x="40" y="224" class="sm">1f0c…-7a2e,Test Kullanıcı 001,2026-03-14,1.250,00</text>
  <text x="40" y="248" class="sm">9b41…-c03d,Test Kullanıcı 002,2026-07-02,89,90</text>
  <text x="40" y="272" class="sm">e7d2…-15fa,Test Kullanıcı 003,2026-11-28,4.400,00</text>
  <rect x="20" y="316" width="330" height="84" rx="8" class="oks"/>
  <text x="185" y="344" class="mid b">Kullanın</text>
  <text x="185" y="366" class="sm mid">UUID, tarih aralığı, örnek metin</text>
  <text x="185" y="386" class="sm mid">example.com e-posta adresleri</text>
  <rect x="370" y="316" width="330" height="84" rx="8" class="dgs"/>
  <text x="535" y="344" class="mid b dg">Kullanmayın</text>
  <text x="535" y="366" class="sm mid">gerçek müşteri kayıtları</text>
  <text x="535" y="386" class="sm mid">geçerli görünen kimlik ya da IBAN</text>
</svg>`
  },
  sections: [
    {
      h: "Test verisi nedir, neden kullanılır?",
      p: [
        "Bir yazılım geliştirildiğinde ya da bir form, rapor veya tablo hazırlandığında, gerçek kullanıcılar gelmeden önce sistemin nasıl davrandığını görmek gerekir. Liste sayfası 10.000 kayıtta yavaşlıyor mu, tarih sıralaması doğru mu, uzun bir müşteri adı tabloyu taşırıyor mu? Bu soruları yanıtlamak için kullanılan uydurma kayıtlara <strong>test verisi</strong> (İngilizce kaynaklarda dummy data, mock data ya da sentetik veri) denir.",
        "İyi test verisi üç özellik taşır: gerçek veriye benzer dağılıma sahiptir, sınır durumlarını içerir ve hiçbir gerçek kişiye bağlanamaz. Yalnızca \"aaa\", \"bbb\" gibi kayıtlarla yapılan testler, Türkçe karakter sorunlarını, çok uzun metinleri ya da artık yıldaki 29 Şubat tarihini yakalayamaz. Gerçek veriler ise kişisel bilgi taşıdığı için test ortamına uygun değildir."
      ]
    },
    {
      h: "Gerçek müşteri verisi testte kullanılabilir mi?",
      p: [
        "Genel kural olarak hayır. 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 4. maddesi, kişisel verilerin belirli, açık ve meşru amaçlar için işlenmesini ve işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmasını şart koşar. Müşterinin sipariş vermek için paylaştığı ad, telefon ve adresin bir yazılım denemesinde kullanılması bu amacın dışına çıkar. Test ortamları canlı sistem kadar sıkı korunmadığı için veri sızıntısı riski de artar.",
        "Gerçek veriye benzerlik gerekiyorsa iki güvenli yol vardır: veriyi geri döndürülemeyecek şekilde <strong>anonimleştirmek</strong> ya da sıfırdan <strong>sentetik veri</strong> üretmek. Yalnızca adı silmek ya da \"Ay** Yıl***\" gibi maskelemek her zaman yeterli değildir; doğum tarihi, ilçe ve meslek birlikte bir kişiyi tanımlanabilir kılabilir. Kişisel Verileri Koruma Kurumu'nun silme, yok etme ve anonim hâle getirme rehberi bu konuda yol gösterir. Kurumunuzdaki uygulama için veri sorumlusu ya da hukuk biriminizle görüşün."
      ]
    },
    {
      h: "Hangi alan için hangi üretici? Test verisi tablosu",
      table: {
        head: ["Alan", "Önerilen üretim yolu", "Dikkat edilecek nokta"],
        rows: [
          ["Kayıt kimliği", "UUID v4 ya da v7", "Sıralı tamsayı yerine tahmin edilemez kimlik"],
          ["Tarih", "İki tarih arasında rastgele", "29 Şubat, ay sonu, yıl dönümü sınırlarını ekleyin"],
          ["Tutar", "Aralıkta rastgele ondalık sayı", "Sıfır, negatif ve çok büyük değer de deneyin"],
          ["Ad soyad", "\"Test Kullanıcı 001\" gibi açıkça uydurma adlar", "Türkçe harfli ve çok uzun adlar ekleyin"],
          ["E-posta", "kullanici001@example.com", "example.com, example.org test için ayrılmış alan adlarıdır"],
          ["Açıklama metni", "Örnek metin üreticisi", "Boş, tek kelime ve çok uzun metin durumları"],
          ["Kimlik no, IBAN, kart no", "Biçimi bozuk yer tutucu (ör. TEST-KIMLIK-001)", "Geçerli görünen değer üretmeyin"]
        ]
      },
      after: [
        "E-posta alanlarında rastgele uydurulmuş alan adları yerine standartlarca test için ayrılmış <code>example.com</code> gibi adresleri kullanmak, testin yanlışlıkla gerçek bir kişiye e-posta göndermesini önler. Telefon numaraları için de gerçek bir aboneye ait olabilecek rastgele numaralar yerine sistemin dışarı mesaj göndermediği bir test modunda çalışın."
      ]
    },
    {
      h: "Rastgele tarih aralığı nasıl üretilir?",
      p: [
        "Bilgisayarlar tarihleri, belirli bir başlangıç anından bu yana geçen milisaniye ya da saniye olarak tutar. Bu yüzden iki tarih arasında rastgele bir tarih üretmek basit bir hesaba dönüşür: aradaki süreyi bulup 0 ile 1 arasında rastgele bir sayıyla çarparsınız ve başlangıca eklersiniz. Zaman damgası kavramını [[bilgi:unix-zaman-damgasi-nedir|Unix zaman damgası]] makalesi ayrıntılı anlatır."
      ],
      formula: "Rastgele tarih = başlangıç + r × (bitiş − başlangıç),  0 ≤ r < 1\nÖrnek: 1 Ocak 2026 – 31 Aralık 2026 arası = 364 gün fark\nr = 0,5 → 1 Ocak + 182 gün = 2 Temmuz 2026",
      after: [
        "Gün düzeyinde tarih istiyorsanız sonucu güne yuvarlayın; saat bilgisi de istiyorsanız saat dilimine dikkat edin, aksi hâlde gece yarısına yakın kayıtlar bir gün kayabilir. Yalnızca hafta içi tarihler gerekiyorsa üretilen tarih cumartesi ya da pazara denk geldiğinde yeniden üretin. Bu işlemleri elle yapmak yerine [[arac:rastgele-tarih-uret|Rastgele Tarih Üretici]] adet, biçim, hafta içi filtresi ve sıralama seçenekleriyle hazır liste verir."
      ]
    },
    {
      h: "UUID test kayıtlarında neden tercih edilir?",
      p: [
        "UUID (evrensel benzersiz kimlik), 36 karakterlik ve onaltılık rakamlarla yazılan 128 bitlik bir numaradır. Sürüm 4 UUID'lerin 122 biti rastgeledir; bu yüzden farklı bilgisayarlarda, birbirinden habersiz üretilen kimliklerin çakışması pratikte imkânsızdır. Test verilerinde UUID kullanmak, farklı ortamlardan gelen kayıtları birleştirirken \"aynı numara iki kez\" sorununu ortadan kaldırır.",
        "Çakışma olasılığı yaklaşık n² ÷ (2 × 2<sup>122</sup>) formülüyle hesaplanır. Bir milyar (10<sup>9</sup>) UUID için bu değer yaklaşık 9,4 × 10<sup>-20</sup>'dir. Sürüm 7 UUID'ler ise ilk bitlerinde zaman bilgisi taşır; kayıtlar oluşturulma sırasına göre sıralanır ve veritabanı dizinlerinde daha verimli çalışır. [[arac:uuid-uret|UUID Üretici]] her iki sürümü tek tek ya da 1.000 adede kadar toplu üretir. Sürüm farkları için [[bilgi:uuid-guid-nedir|UUID ve GUID nedir]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Örnek metin ne zaman kullanılır?",
      p: [
        "Tasarımda en çok kullanılan örnek metin, Latince bir metinden türetilmiş anlamsız bir yer tutucu yazıdır. Tasarımcılar sayfa düzenini içerik hazır olmadan görmek için kullanır; okuyucunun dikkati metnin anlamına değil düzene odaklanır. Test verisinde ise açıklama, yorum ya da not alanlarını doldurmak için uygundur.",
        "Türkçe arayüzler için yalnızca Latince yer tutucu metinle test yapmak yetersizdir, çünkü bu metin ç, ğ, ı, İ, ö, ş, ü harflerini içermez. Arayüzde Türkçe karakter sorunu, satır kırılması ya da büyük–küçük harf dönüşümü hatası varsa ancak Türkçe örnek metinle görünür. [[arac:lorem-ipsum|Örnek Metin Üretici]] hem Latince hem Türkçe örnek metin üretir ve paragraf, cümle ya da kelime sayısını seçmenize izin verir."
      ]
    },
    {
      h: "Rastgele sayılar tekrar üretilebilir mi? Seed nedir?",
      p: [
        "Bilgisayardaki rastgele sayı üreteçlerinin çoğu aslında \"sözde rastgeledir\": bir başlangıç değerinden (seed, tohum) başlayıp matematiksel bir formülle sayı dizisi üretir. Aynı seed ile başlatılan üreteç her seferinde aynı diziyi verir. Bu özellik testte çok değerlidir: bir hata bulduğunuzda aynı seed ile aynı veriyi yeniden oluşturur, hatayı tekrar görür ve düzelttiğinizi kanıtlarsınız.",
        "Seed değerini test senaryosunun yanına not etmek iyi bir alışkanlıktır (ör. \"seed = 42 ile 500 kayıt\"). Güvenlik amaçlı işlerde ise durum tersidir: şifre, kod ya da çekiliş için tahmin edilemez sayılar gerekir; bunun için tarayıcının kriptografik olarak güvenli üreteci kullanılır. [[arac:rastgele-sayi|Rastgele Sayı Üretici]] bu güvenli üreteci kullanır; tekrar üretilebilir test verisi gerekiyorsa seed alan bir kod kütüphanesi tercih edin."
      ]
    },
    {
      h: "Test verisinde geçerli ama sahte kimlik numarası kullanmak neden risklidir?",
      p: [
        "TC kimlik numarası, IBAN ve kredi kartı numarası gibi alanların kontrol basamağı algoritmaları vardır. Bu algoritmalarla \"geçerli görünen\" rastgele numaralar üretmek teknik olarak mümkündür, ama üretilen numara gerçek bir kişiye ya da hesaba ait olabilir. Bu numaralar test ortamından sızarsa ya da yanlışlıkla canlı sisteme geçerse gerçek bir kişinin bilgisi gibi kullanılabilir; sahte belge ve dolandırıcılık amaçlı kullanımlar da bu yüzden ciddi hukuki sonuçlar doğurur.",
        "Bilişim Ajans araçlarında bu nedenle kimlik numarası, IBAN ya da kart numarası üreten bir araç bulunmaz; yalnızca var olan bir numaranın biçimini kontrol eden doğrulama mantığı anlatılır. Test verisinde bu alanlar için \"TEST-KIMLIK-001\" gibi açıkça uydurma ve doğrulamadan geçmeyen yer tutucular kullanın. Doğrulama kodunuzu test etmeniz gerekiyorsa, kurumunuzun yetkili test ortamının ya da ödeme hizmet sağlayıcınızın resmî olarak yayımladığı test değerlerine başvurun."
      ]
    },
    {
      h: "Test verisi CSV olarak nasıl hazırlanır?",
      ol: [
        "Alanları ve sıralarını belirleyin: <code>id,musteri,kayit_tarihi,tutar,aciklama</code>.",
        "Her alan için üreticiyi seçin: id için UUID, tarih için tarih aralığı, tutar için sayı aralığı, açıklama için örnek metin.",
        "Her üreticiden aynı sayıda değer üretin (ör. 500) ve sütunlara yapıştırın; bir hesap tablosu programı bu iş için pratiktir.",
        "Sınır durumlarını elle ekleyin: boş açıklama, 0 TL tutar, 29.02.2028 tarihi, 120 karakterlik bir müşteri adı.",
        "Dosyayı UTF-8 kodlamasıyla CSV olarak kaydedin; Türkçe karakterlerin bozulmaması için bu önemlidir.",
        "Ayırıcıyı kontrol edin: Türkçe bölge ayarlarında ondalık virgül kullanıldığı için CSV'de noktalı virgül ayırıcı daha güvenlidir."
      ],
      after: [
        "CSV dosyalarının açılışındaki karakter ve ayırıcı sorunlarını [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV dosyası nedir]] makalesi çözüm yollarıyla anlatır."
      ]
    }
  ],
  faq: [
    ["Test verisi nedir, neden kullanılır?", "Test verisi, yazılımı, formu ya da raporu denemek için üretilen ve gerçek kişilere ait olmayan örnek veridir. Sistemin büyük kayıt sayısında, sınır durumlarında ve Türkçe karakterlerle nasıl davrandığını görmek için kullanılır."],
    ["Gerçek müşteri verisi testte kullanılabilir mi?", "Genel kural olarak kullanılmamalıdır. KVKK'nın 4. maddesi verilerin belirli amaçlarla sınırlı ve ölçülü işlenmesini ister; testte anonimleştirilmiş ya da sıfırdan üretilmiş sentetik veri kullanmak gerekir."],
    ["Rastgele tarih aralığı nasıl üretilir?", "Başlangıç ve bitiş tarihleri arasındaki süre bulunur, 0 ile 1 arasında rastgele bir sayıyla çarpılır ve başlangıca eklenir. Rastgele Tarih Üretici bunu adet, biçim ve hafta içi filtresiyle otomatik yapar."],
    ["UUID test kayıtlarında neden tercih edilir?", "UUID'ler 128 bitlik benzersiz kimliklerdir ve sürüm 4'te 122 bit rastgeledir. Farklı ortamlarda üretilen kayıtlar çakışmaz; bir milyar kayıtta bile çakışma olasılığı yaklaşık 10 üzeri eksi 19 düzeyindedir."],
    ["Örnek metin ne zaman kullanılır?", "Sayfa düzenini içerik hazır olmadan görmek ve açıklama, yorum gibi metin alanlarını doldurmak için kullanılır. Türkçe arayüzlerde karakter sorunlarını yakalamak için Türkçe örnek metinle de test yapın."],
    ["Rastgele sayılar tekrar üretilebilir mi (seed)?", "Evet. Sözde rastgele üreteçler aynı seed değeriyle başlatıldığında aynı sayı dizisini verir. Bu, bir hatayı aynı veriyle tekrar oluşturmayı sağlar; güvenlik amaçlı işlerde ise seed'siz güvenli üreteç kullanılır."],
    ["Test verisinde geçerli ama sahte kimlik numarası kullanmak neden risklidir?", "Algoritmayla üretilen geçerli görünen numara gerçek bir kişiye ya da hesaba ait olabilir ve sızarsa kötüye kullanılabilir. Bu alanlarda doğrulamadan geçmeyen, açıkça uydurma yer tutucular kullanın."],
    ["Test verisi CSV olarak nasıl hazırlanır?", "Alanları belirleyin, her alan için uygun üreticiyle aynı sayıda değer üretin, sınır durumlarını elle ekleyin ve dosyayı UTF-8 kodlamasıyla, Türkçe ayarlar için noktalı virgül ayırıcıyla CSV olarak kaydedin."],
    ["Bu üreticiler verilerimi bir yere gönderiyor mu?", "Hayır. Rastgele tarih, UUID, örnek metin ve rastgele sayı üreticileri tamamen tarayıcınızda çalışır; üretilen değerler hiçbir sunucuya gönderilmez ve kayıt gerekmez."]
  ],
  tools: ["rastgele-tarih-uret", "uuid-uret", "lorem-ipsum", "rastgele-sayi"],
  related: ["uuid-guid-nedir", "lorem-ipsum-nedir-ne-ise-yarar", "csv-dosyasi-nedir-excelde-nasil-acilir", "unix-zaman-damgasi-nedir"],
  sources: [
    ["Kişisel Verileri Koruma Kurumu – Silme, yok etme veya anonim hâle getirme rehberi", "https://www.kvkk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 6698 sayılı Kişisel Verilerin Korunması Kanunu", "https://www.mevzuat.gov.tr/"],
    ["IETF – RFC 9562, UUID sürümleri", "https://www.rfc-editor.org/rfc/rfc9562"]
  ]
};
