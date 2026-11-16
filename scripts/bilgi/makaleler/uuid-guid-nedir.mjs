export default {
  slug: "uuid-guid-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "UUID (GUID) Nedir? UUID v4 Nasıl Üretilir, Çakışma İhtimali Ne Kadar",
  pageTitle: "UUID (GUID) Nedir? v4 ve v7 Farkı, Çakışma İhtimali",
  description: "UUID, 128 bitlik ve 36 karakterlik evrensel benzersiz kimliktir. GUID ile farkı, 8-4-4-4-12 yapısı, v4 ve v7 sürümleri, çakışma olasılığı ve veritabanında kullanımı.",
  keywords: ["uuid nedir", "guid nedir", "uuid v4", "uuid v7", "uuid oluşturma", "uuid çakışır mı", "uuid kaç karakter", "uuid ile id farkı"],
  lead: "UUID (Universally Unique Identifier, evrensel benzersiz kimlik), merkezî bir kayıt yetkilisine sormadan her bilgisayarın kendi başına üretebildiği <strong>128 bitlik bir kimlik numarasıdır</strong>; 32 onaltılık rakam ve 4 tireyle 36 karakter olarak yazılır. GUID, aynı şeyin Windows dünyasındaki adıdır. En yaygın sürüm olan UUID v4'te 122 bit rastgeledir; iki tanesinin çakışması pratikte imkânsıza yakındır. Bu sayfada UUID'nin yapısını, sürümlerini, çakışma hesabını ve veritabanında ne zaman tercih edilmesi gerektiğini bulacaksınız.",
  kisaCevap: [
    "UUID 128 bittir; 8-4-4-4-12 düzeninde 32 onaltılık rakam ve 4 tire ile toplam 36 karakter yazılır.",
    "GUID ile UUID aynı biçimdir; GUID adı Windows ve bazı yazılım ortamlarında kullanılır.",
    "Sürüm, üçüncü grubun ilk rakamındadır: ...-4xxx-... v4 (rastgele), ...-7xxx-... v7 (zaman sıralı) demektir.",
    "UUID v4'te 122 bit rastgeledir; 2<sup>122</sup> ≈ 5,3 × 10<sup>36</sup> farklı değer olabilir.",
    "Yüzde 50 çakışma olasılığı için yaklaşık 2,7 × 10<sup>18</sup> adet v4 UUID üretmek gerekir.",
    "Güncel standart RFC 9562'dir (2024); eski RFC 4122'nin yerini almış ve v6, v7, v8 sürümlerini eklemiştir."
  ],
  figure: {
    alt: "Bir UUID'nin 8-4-4-4-12 karakterlik beş gruba ayrılmış şeması; üçüncü grubun ilk rakamı sürümü (4), dördüncü grubun ilk rakamı varyantı gösteriyor. Altta v4 ile v7'nin bit dağılımı karşılaştırılıyor.",
    caption: "UUID'nin 128 bitinin 6'sı sabittir: 4 bit sürüm, 2 bit varyant. v4'te kalan 122 bitin tamamı rastgeledir; v7'de ilk 48 bit milisaniye cinsinden zaman damgası olduğu için kimlikler üretim sırasına göre dizilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">UUID'nin yapısı: 8-4-4-4-12</text>
  <g class="mid">
    <rect x="20" y="52" width="196" height="50" rx="6" class="sf sb"/><text x="118" y="84" class="lg b">3f2b8c1e</text>
    <rect x="226" y="52" width="104" height="50" rx="6" class="sf sb"/><text x="278" y="84" class="lg b">9a4d</text>
    <rect x="340" y="52" width="104" height="50" rx="6" class="ps"/><text x="392" y="84" class="lg b"><tspan class="p">4</tspan>c7b</text>
    <rect x="454" y="52" width="104" height="50" rx="6" class="oks"/><text x="506" y="84" class="lg b"><tspan class="ok">b</tspan>2e1</text>
    <rect x="568" y="52" width="132" height="50" rx="6" class="sf sb"/><text x="634" y="84" class="b">5d6f7a8b9c0d</text>
  </g>
  <g class="sm mid t2">
    <text x="118" y="122">8 karakter</text><text x="278" y="122">4</text><text x="392" y="122">4</text><text x="506" y="122">4</text><text x="634" y="122">12 karakter</text>
  </g>
  <text x="392" y="150" class="sm mid p b">sürüm = 4</text>
  <text x="506" y="150" class="sm mid ok b">varyant: 8, 9, a, b</text>
  <text x="360" y="182" class="mid">32 onaltılık rakam × 4 bit = 128 bit · 4 tireyle 36 karakter</text>
  <line x1="20" y1="200" x2="700" y2="200" class="sb dash" fill="none"/>
  <text x="20" y="232" class="b">v4: rastgele</text>
  <rect x="20" y="244" width="680" height="40" rx="6" class="ps"/>
  <rect x="340" y="244" width="22" height="40" class="p"/><rect x="454" y="244" width="12" height="40" class="ok"/>
  <text x="180" y="270" class="sm mid">rastgele bitler</text><text x="580" y="270" class="sm mid">rastgele bitler</text>
  <text x="700" y="304" class="sm end mu">122 bit rastgele + 4 bit sürüm + 2 bit varyant</text>
  <text x="20" y="336" class="b">v7: zaman + rastgele</text>
  <rect x="20" y="348" width="680" height="40" rx="6" class="ps"/>
  <rect x="20" y="348" width="306" height="40" rx="6" class="a"/>
  <rect x="340" y="348" width="22" height="40" class="p"/><rect x="454" y="348" width="12" height="40" class="ok"/>
  <text x="173" y="374" class="sm mid b">48 bit Unix zamanı (ms)</text><text x="580" y="374" class="sm mid">74 bit rastgele</text>
  <text x="700" y="408" class="sm end mu">Ardışık üretilen v7 kimlikleri alfabetik olarak da sıralıdır</text>
</svg>`
  },
  sections: [
    {
      h: "UUID nedir, neden ihtiyaç duyulur?",
      p: [
        "Bir kaydı tanımlamanın en bilinen yolu sıra numarasıdır: 1, 2, 3… Ancak sıra numarası tek bir merkezin sayıyı tutmasını gerektirir. Aynı anda çalışan on sunucu, çevrimdışı kayıt alan bir mobil uygulama ya da birleştirilecek iki ayrı veritabanı varsa \"sıradaki numara kaç?\" sorusu sorun olur; iki taraf aynı numarayı verebilir.",
        "UUID bu sorunu ortadan kaldırmak için tasarlanmıştır. Her cihaz, kimseye sormadan kendi kimliğini üretir ve üretilen değerin dünyadaki başka bir kimlikle çakışmayacağı olasılık hesabıyla güvence altındadır. Sipariş numaraları, dosya adları, oturum kimlikleri, mesaj kuyruğundaki iletiler, veritabanı birincil anahtarları ve cihaz kimlikleri UUID'nin tipik kullanım alanlarıdır.",
        "Standart, ilk olarak 2005'te RFC 4122 olarak yayımlandı. Mayıs 2024'te yayımlanan <strong>RFC 9562</strong> bu belgenin yerini aldı; eski sürümleri korurken zaman sıralı yeni sürümler (v6 ve v7) ile serbest biçimli v8'i ekledi."
      ]
    },
    {
      h: "GUID ile UUID aynı şey mi?",
      p: [
        "Evet, pratikte aynıdır. GUID (Globally Unique Identifier) adı Windows, kayıt defteri, COM bileşenleri ve .NET ortamında kullanılır; biçim ve uzunluk UUID ile birebir aynıdır. Kayıt defterinde ya da bir hata iletisinde gördüğünüz <code>{3F2B8C1E-9A4D-4C7B-B2E1-5D6F7A8B9C0D}</code> gibi süslü parantezli, büyük harfli değer bir UUID'dir.",
        "Görünüşteki farklar yalnızca yazım tercihidir. Standart küçük harfle yazmayı önerir ama okurken büyük ve küçük harf eşit kabul edilir. Bazı sistemler tireleri kaldırır (32 karakter), bazıları süslü parantez ekler (38 karakter). Bu biçimler birbirine dönüştürülebilir; içerdikleri 128 bitlik değer değişmez."
      ],
      table: {
        head: ["Biçim", "Örnek", "Uzunluk"],
        rows: [
          ["Standart", "<code>3f2b8c1e-9a4d-4c7b-b2e1-5d6f7a8b9c0d</code>", "36 karakter"],
          ["Tiresiz", "<code>3f2b8c1e9a4d4c7bb2e15d6f7a8b9c0d</code>", "32 karakter"],
          ["Süslü parantezli (GUID)", "<code>{3F2B8C1E-9A4D-4C7B-B2E1-5D6F7A8B9C0D}</code>", "38 karakter"],
          ["URN", "<code>urn:uuid:3f2b8c1e-9a4d-...</code>", "45 karakter"],
          ["İkili (veritabanı)", "16 bayt", "16 bayt"]
        ],
        caption: "Metin olarak saklanan UUID 36 bayt yer kaplar; ikili sütunda 16 bayta iner. Büyük tablolarda bu fark dizin boyutunu belirgin biçimde etkiler."
      }
    },
    {
      h: "UUID sürümleri: v1, v4, v7 ve diğerleri",
      p: [
        "Bir UUID'nin hangi yöntemle üretildiğini anlamak için üçüncü grubun ilk rakamına bakmanız yeterlidir. Dördüncü grubun ilk rakamı ise varyantı gösterir; standart UUID'lerde bu rakam 8, 9, a ya da b'dir. Sürümler birbirinin yerine geçen nesiller değil, farklı ihtiyaçlar için tanımlanmış yöntemlerdir."
      ],
      table: {
        head: ["Sürüm", "Nasıl üretilir", "Tipik kullanım"],
        rows: [
          ["v1", "Zaman damgası + cihazın ağ (MAC) adresi", "Eski sistemler; cihaz adresini açığa çıkarabilir"],
          ["v3", "Ad alanı + ad, MD5 özeti", "Aynı addan hep aynı UUID'yi üretmek"],
          ["v4", "122 bit rastgele sayı", "Genel amaçlı kimlik; en yaygın sürüm"],
          ["v5", "Ad alanı + ad, SHA-1 özeti", "v3'ün önerilen yerine geçeni"],
          ["v6", "v1'in sıralanabilir düzene sokulmuş hâli", "v1 kullanan sistemlerin geçişi"],
          ["v7", "48 bit Unix zamanı (ms) + rastgele bitler", "Veritabanı birincil anahtarı, olay kayıtları"],
          ["v8", "Üreticiye özel düzen", "Deneysel ya da kuruma özgü kimlikler"]
        ],
        caption: "Ayrıca tüm bitleri sıfır olan \"nil\" UUID (00000000-0000-0000-0000-000000000000) ve RFC 9562 ile tanımlanan, tüm bitleri bir olan \"max\" UUID (ffffffff-ffff-ffff-ffff-ffffffffffff) özel değerlerdir."
      }
    },
    {
      h: "UUID v4 ile v7 arasındaki fark nedir?",
      p: [
        "<strong>v4</strong> tamamen rastgeledir. 128 bitin 6'sı sürüm ve varyant için ayrılır, kalan 122 bit güvenli bir rastgele sayı üretecinden gelir. Değer hiçbir bilgi taşımaz: ne zaman, nerede ya da hangi cihazda üretildiği anlaşılmaz. Bu, gizlilik açısından avantajdır.",
        "<strong>v7</strong> ise ilk 48 bitine Unix zamanını (1 Ocak 1970'ten bu yana geçen milisaniye) yazar, kalan 74 biti rastgele doldurur. Sonuç olarak sonradan üretilen kimlik, öncekinden alfabetik olarak da büyüktür. Örneğin <code>01a1de6f-5280-7c3a-9f31-6c2e8b1a0f47</code> değerinin ilk 12 onaltılık rakamı (<code>01a1de6f5280</code>) 15 Kasım 2026 saat 09.00'u (UTC) gösterir.",
        "Bu sıralanabilirlik veritabanları için önemlidir. Rastgele v4 anahtarlar dizinin her yerine dağılarak yazma performansını düşürür ve dizini parçalar; v7 anahtarlar ise hep sona eklendiği için sıra numarasına yakın bir verim sağlar. Buna karşılık v7, kaydın oluşturulma zamanını açığa vurur. Zamanın bilinmesinin sakıncalı olduğu durumlarda (örneğin bir müşteri kimliğinin herkese açık bağlantıda görünmesi) v4 daha uygundur."
      ]
    },
    {
      h: "İki UUID'nin çakışma ihtimali ne kadar?",
      p: [
        "Çakışma olasılığı \"doğum günü problemi\" ile hesaplanır: 23 kişilik bir sınıfta iki kişinin aynı gün doğmuş olma ihtimalinin yüzde 50'yi geçmesi gibi, kimlik sayısı arttıkça herhangi iki tanesinin eşleşme ihtimali hızla büyür. Ancak UUID v4'te olası değer sayısı N = 2<sup>122</sup> olduğu için bu büyüme astronomik sayılara kadar önemsiz kalır."
      ],
      formula: "Çakışma olasılığı p ≈ 1 − e^(−n² ÷ 2N)\nN = 2^122 ≈ 5,32 × 10^36 (v4 için olası değer sayısı)\np = %50 için n ≈ √(2N × ln 2) ≈ 2,71 × 10^18 UUID",
      table: {
        head: ["Üretilen UUID v4 sayısı", "En az bir çakışma olasılığı"],
        rows: [
          ["1 milyar (10<sup>9</sup>)", "yaklaşık 10<sup>−19</sup>, pratikte sıfır"],
          ["1 trilyon (10<sup>12</sup>)", "yaklaşık 9,4 × 10<sup>−14</sup>"],
          ["1 katrilyon (10<sup>15</sup>)", "yaklaşık 9,4 × 10<sup>−8</sup> (on milyonda bir)"],
          ["2,71 × 10<sup>18</sup>", "yaklaşık %50"]
        ],
        caption: "Örnek: Saniyede 1 milyar UUID üretseniz yüzde 50 çakışma olasılığına ulaşmanız yaklaşık 86 yıl sürer."
      },
      after: [
        "Bu hesap, rastgele sayıların gerçekten rastgele olmasına dayanır. Gerçek hayatta görülen çakışmaların neredeyse tamamı matematikten değil hatalı yazılımdan kaynaklanır: aynı başlangıç değeriyle çalışan zayıf bir rastgele sayı üreteci, kopyalanan sanal makineler ya da test için elle yazılmış sabit bir UUID gibi. Bu yüzden UUID'yi her zaman işletim sisteminin ya da tarayıcının kriptografik üretecini kullanan bir araçla üretin. Veritabanında yine de benzersizlik kısıtı (unique) tanımlamak, olası bir yazılım hatasını sessiz veri bozulması yerine anlaşılır bir hataya dönüştürür."
      ]
    },
    {
      h: "UUID kaç karakterdir, nasıl doğrulanır?",
      p: [
        "Standart metin gösteriminde UUID tam <strong>36 karakterdir</strong>: 32 onaltılık rakam (0–9 ve a–f) ve 8., 13., 18. ve 23. karakterlerden sonra gelen dört tire. Her onaltılık rakam 4 bit taşıdığı için 32 × 4 = 128 bit eder; ikili olarak saklandığında 16 bayt yer kaplar.",
        "Bir değerin geçerli UUID olup olmadığını anlamak için şu kontrolleri yapın: uzunluk 36 mı, tireler doğru yerde mi, karakterlerin hepsi onaltılık mı, üçüncü grubun ilk rakamı 1–8 arasında bir sürüm mü ve dördüncü grubun ilk rakamı 8, 9, a, b'den biri mi? Bu kuralları geçen bir değer biçim olarak geçerlidir; ancak gerçekten benzersiz üretilip üretilmediğini biçim söyleyemez."
      ]
    },
    {
      h: "Veritabanında UUID mi, otomatik artan ID mi?",
      p: [
        "İkisinin de yeri vardır. Karar verirken sisteminizin nasıl büyüyeceğini ve kimliklerin dışarıya görünüp görünmeyeceğini düşünün."
      ],
      table: {
        head: ["Ölçüt", "Otomatik artan ID", "UUID v4", "UUID v7"],
        rows: [
          ["Boyut", "4–8 bayt", "16 bayt", "16 bayt"],
          ["Merkezî sayaç gerekir mi?", "Evet", "Hayır", "Hayır"],
          ["Tahmin edilebilir mi?", "Evet (1, 2, 3…)", "Hayır", "Zamanı tahmin edilebilir"],
          ["Dizin performansı", "Çok iyi", "Büyük tablolarda zayıf", "İyi"],
          ["Sistem birleştirme", "Çakışma riski", "Sorunsuz", "Sorunsuz"],
          ["Okunabilirlik", "Kolay (\"sipariş 1042\")", "Zor", "Zor"]
        ]
      },
      after: [
        "Tek sunuculu, küçük bir uygulamada otomatik artan sayı yeterli ve verimlidir. Kimlik bir bağlantıda görünecekse (örneğin bir fatura görüntüleme adresi) sıralı sayı başkalarının kayıtlarını tahmin etmeyi kolaylaştırır; UUID bu tahmini engeller ama tek başına bir güvenlik önlemi değildir, yetki kontrolünün yerini tutmaz. Dağıtık sistemlerde ve çevrimdışı çalışan uygulamalarda v7, sıralanabilirlik avantajıyla birlikte en dengeli seçenektir."
      ]
    },
    {
      h: "UUID ile hash arasındaki fark nedir?",
      p: [
        "UUID ve hash (özet) ikisi de onaltılık rakamlardan oluşan uzun dizgiler olarak görünür ama amaçları farklıdır. Hash, bir verinin parmak izidir: aynı girdi her zaman aynı çıktıyı verir ve verinin değişip değişmediğini anlamaya yarar. UUID v4 ise girdiden bağımsızdır; her üretimde yeni bir değer çıkar.",
        "Kesişim noktası v3 ve v5 sürümleridir. Bunlar bir ad alanı ile bir adı (örneğin bir alan adını) MD5 ya da SHA-1 ile özetleyip sonucu UUID biçimine sokar; böylece aynı ad her seferinde aynı UUID'yi verir. Bir dosyanın bütünlüğünü doğrulamak istiyorsanız UUID değil hash kullanmalısınız; bu konunun ayrıntısı [[bilgi:hash-nedir-sha256-md5|SHA-256 ve MD5 rehberinde]] anlatılıyor. Metnin SHA-256 özetini görmek için [[arac:metin-sha256-hesapla|Metin SHA-256 Özeti Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "UUID nasıl üretilir? Adım adım",
      ol: [
        "[[arac:uuid-uret|UUID Oluşturucu]] sayfasını açın ve sürümü seçin: genel kullanım için v4, veritabanı anahtarı için v7.",
        "Kaç adet gerektiğini yazın; test verisi için toplu üretim (1.000 adede kadar) yapabilirsiniz.",
        "Hedef sistemin beklediği biçimi seçin: küçük harf standart, büyük harf ve süslü parantez GUID biçimi, tiresiz 32 karakter.",
        "Elinizdeki bir değerin geçerliliğini sınamak için doğrulama alanına yapıştırın; sürüm ve varyant bilgisini görün.",
        "Üretilen değerleri kopyalayın; araç tarayıcının kriptografik rastgele sayı üretecini kullanır, değerler bir sunucuya gönderilmez."
      ],
      after: [
        "UUID bir parola değildir; tahmin edilmesi zor olsa da gizli tutulmak üzere tasarlanmamıştır ve kayıtlarda, adres çubuğunda görünür. Gizli bir anahtar ya da güçlü parola gerekiyorsa [[arac:sifre-uret|Güçlü Şifre Üretici]] daha uygundur. Onaltılık rakamların ikili karşılığını merak ediyorsanız [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısı her rakamın neden 4 bit taşıdığını gösterir."
      ]
    }
  ],
  faq: [
    ["UUID nedir?", "UUID, evrensel benzersiz kimlik anlamına gelen 128 bitlik bir tanımlayıcıdır. Merkezî bir sayaca ihtiyaç duymadan her cihazda üretilebilir ve 8-4-4-4-12 düzeninde 36 karakterlik onaltılık bir dizgi olarak yazılır."],
    ["GUID ile UUID aynı şey mi?", "Evet. GUID, aynı 128 bitlik biçimin Windows ve .NET ortamındaki adıdır. Genellikle büyük harfle ve süslü parantez içinde gösterilir ama içerdiği değer standart bir UUID ile birebir aynıdır."],
    ["UUID v4 ve v7 arasındaki fark nedir?", "v4'te sürüm ve varyant dışındaki 122 bitin tamamı rastgeledir ve değer hiçbir bilgi taşımaz. v7'nin ilk 48 biti milisaniye cinsinden zaman damgasıdır; bu nedenle v7 kimlikleri üretim sırasına göre sıralanır ve veritabanı dizinlerinde daha verimlidir."],
    ["İki UUID'nin çakışma ihtimali ne kadardır?", "UUID v4 için yüzde 50 çakışma olasılığına ulaşmak yaklaşık 2,7 × 10^18 kimlik üretmeyi gerektirir. Bir trilyon UUID üretildiğinde bile olasılık yaklaşık 10^−13 düzeyindedir. Gerçek çakışmalar genellikle hatalı rastgele sayı üretecinden kaynaklanır."],
    ["UUID kaç karakterdir?", "Standart gösterimde UUID 36 karakterdir: 32 onaltılık rakam ve 4 tire. Tiresiz yazıldığında 32, süslü parantezli GUID biçiminde 38 karakter olur. İkili olarak saklandığında 16 bayt yer kaplar."],
    ["Veritabanında UUID mi otomatik artan ID mi kullanılmalı?", "Tek sunuculu küçük sistemlerde otomatik artan ID daha küçük ve hızlıdır. Birden çok sunucu, çevrimdışı kayıt ya da veritabanı birleştirme söz konusuysa UUID gerekir; bu durumda dizin performansı için v7 tercih edilir."],
    ["UUID nasıl üretilir?", "Programlama dillerinin standart kütüphaneleri ve tarayıcılar UUID üretebilir. Kod yazmadan üretmek için bir UUID oluşturucu aracında sürümü (v4 ya da v7), adedi ve biçimi seçip değerleri kopyalamanız yeterlidir."],
    ["UUID ile hash arasındaki fark nedir?", "Hash, aynı veriden her zaman aynı sonucu üreten bir parmak izidir ve bütünlük kontrolüne yarar. UUID v4 ise girdiden bağımsız, her seferinde yeni üretilen bir kimliktir. Yalnızca v3 ve v5 sürümleri bir adın özetinden UUID üretir."],
    ["UUID'nin sürümü nasıl anlaşılır?", "Üçüncü grubun ilk rakamı sürümü gösterir. Örneğin 9a4d-4c7b biçiminde üçüncü grup 4 ile başlıyorsa UUID v4, 7 ile başlıyorsa v7'dir. Dördüncü grubun ilk rakamı standart UUID'lerde 8, 9, a ya da b olur."]
  ],
  tools: ["uuid-uret", "sifre-uret", "metin-sha256-hesapla"],
  related: ["hash-nedir-sha256-md5", "ikilik-sayi-sistemi-nasil-cevrilir", "base64-nedir-ne-ise-yarar"],
  sources: [
    ["IETF – RFC 9562: Universally Unique IDentifiers (UUIDs)", "https://www.rfc-editor.org/rfc/rfc9562"],
    ["IETF – RFC 4122 (önceki UUID standardı)", "https://www.rfc-editor.org/rfc/rfc4122"]
  ]
};
