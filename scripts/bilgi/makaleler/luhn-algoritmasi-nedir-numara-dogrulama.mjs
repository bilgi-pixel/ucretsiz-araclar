export default {
  slug: "luhn-algoritmasi-nedir-numara-dogrulama",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Luhn Algoritması Nedir? Numaralarda Kontrol Basamağı ve Yazım Hatası Denetimi",
  pageTitle: "Luhn Algoritması Nedir? Mod 10 Kontrolü Adım Adım",
  description: "Luhn (mod 10) algoritması, uzun numaralardaki yazım hatalarını son kontrol basamağıyla yakalayan bir denetimdir. Adım adım doğrulama, yakaladığı ve kaçırdığı hatalar.",
  keywords: ["luhn algoritması", "mod 10 kontrolü", "kontrol basamağı nedir", "sağlama basamağı", "numara doğrulama", "imei luhn", "iban kontrol hanesi", "yazım hatası denetimi"],
  lead: "Luhn algoritması (mod 10 denetimi), bir numaranın son hanesini <strong>kontrol basamağı</strong> olarak kullanıp numaranın yanlış yazılıp yazılmadığını hızlıca anlamaya yarayan basit bir sağlama yöntemidir. Numaranın sağdan ikinci, dördüncü, altıncı… haneleri ikiye katlanır, iki basamaklı sonuçların rakamları toplanır ve tüm toplam 10'a tam bölünüyorsa numara denetimden geçer. Amaç yalnızca tek hane hatalarını ve komşu hanelerin yer değiştirmesini yakalamaktır; denetimden geçen bir numaranın gerçek, geçerli ya da birine ait olduğunu göstermez. Bu sayfada doğrulama adımlarını uydurma kısa bir örnekle anlatıyoruz.",
  kisaCevap: [
    "Luhn algoritması, 1950'lerde geliştirilmiş ve ISO/IEC 7812 standardında yer alan bir sağlama (checksum) yöntemidir.",
    "Doğrulamada sağdan başlanır; sağdan 2., 4., 6. … haneler ikiye katlanır, 9'dan büyük sonuçlardan 9 çıkarılır.",
    "Tüm hanelerin toplamı 10'un katıysa numara Luhn denetiminden geçer, değilse bir yazım hatası vardır.",
    "Tek hanelik hataların tamamını ve komşu iki hanenin yer değiştirmesinin büyük kısmını yakalar; 09↔90 değişimini yakalayamaz.",
    "Luhn bir güvenlik önlemi değildir; denetimden geçmek numaranın gerçek, aktif ya da kullanıma uygun olduğunu göstermez.",
    "IBAN mod 97, TC kimlik ve vergi kimlik numaraları ise kendi özel algoritmalarıyla denetlenir; bunlar Luhn değildir."
  ],
  figure: {
    alt: "Uydurma 1826 numarasının Luhn denetimi: sağdan ikinci ve dördüncü haneler ikiye katlanıyor, haneler toplanıyor, toplam 20 bulunuyor ve 10'a tam bölündüğü için denetimden geçiyor. Altta 1836 yazım hatasının toplamı 22 verdiği gösteriliyor.",
    caption: "Örnekteki 1826 numarası öğretim için uydurulmuş dört haneli bir dizidir ve hiçbir gerçek numaraya karşılık gelmez. Doğru yazıldığında toplam 20 (10'un katı) çıkar; tek bir hane değiştiğinde toplam 22 olur ve hata yakalanır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Luhn denetimi: uydurma örnek 1826</text>
  <g class="mid">
    <text x="160" y="62" class="sm mu">sağdan sıra →</text>
    <text x="250" y="62" class="sm mu">4.</text><text x="350" y="62" class="sm mu">3.</text><text x="450" y="62" class="sm mu">2.</text><text x="550" y="62" class="sm mu">1. (kontrol)</text>
    <rect x="215" y="72" width="70" height="60" rx="8" class="ps"/><text x="250" y="111" class="xl">1</text>
    <rect x="315" y="72" width="70" height="60" rx="8" class="sf sb"/><text x="350" y="111" class="xl">8</text>
    <rect x="415" y="72" width="70" height="60" rx="8" class="ps"/><text x="450" y="111" class="xl">2</text>
    <rect x="515" y="72" width="70" height="60" rx="8" class="p"/><text x="550" y="111" class="xl sf">6</text>
    <text x="160" y="164" class="sm">işlem</text>
    <text x="250" y="164" class="sm p b">× 2</text><text x="350" y="164" class="sm mu">aynen</text><text x="450" y="164" class="sm p b">× 2</text><text x="550" y="164" class="sm mu">aynen</text>
    <rect x="215" y="178" width="70" height="50" rx="8" class="sf sb"/><text x="250" y="210" class="lg b">2</text>
    <rect x="315" y="178" width="70" height="50" rx="8" class="sf sb"/><text x="350" y="210" class="lg b">8</text>
    <rect x="415" y="178" width="70" height="50" rx="8" class="sf sb"/><text x="450" y="210" class="lg b">4</text>
    <rect x="515" y="178" width="70" height="50" rx="8" class="sf sb"/><text x="550" y="210" class="lg b">6</text>
  </g>
  <rect x="140" y="246" width="440" height="50" rx="10" class="oks"/>
  <text x="360" y="277" class="mid b">2 + 8 + 4 + 6 = 20 → 10'a tam bölünür → geçer</text>
  <rect x="20" y="316" width="330" height="88" rx="10" class="dgs"/>
  <text x="36" y="342" class="b">Yazım hatası: 1836</text>
  <text x="36" y="366" class="sm">3 × 2 = 6 → 2 + 8 + 6 + 6 = 22</text>
  <text x="36" y="388" class="sm dg b">22 ÷ 10 kalan 2 → geçmez</text>
  <rect x="370" y="316" width="330" height="88" rx="10" class="dgs"/>
  <text x="386" y="342" class="b">Yer değiştirme: 1862</text>
  <text x="386" y="366" class="sm">6 × 2 = 12 → 1+2 = 3 → 2 + 8 + 3 + 2 = 15</text>
  <text x="386" y="388" class="sm dg b">15 ÷ 10 kalan 5 → geçmez</text>
</svg>`
  },
  sections: [
    {
      h: "Luhn algoritması nedir, ne işe yarar?",
      p: [
        "Uzun numaralar elle yazılırken ya da sesli okunurken hata yapmak çok kolaydır: bir rakam yanlış basılır ya da iki komşu rakam yer değiştirir. Bu tür hataları numaranın kendisinden anlayabilmek için numaraya fazladan bir hane eklenir. Bu haneye <strong>kontrol basamağı</strong> ya da sağlama basamağı denir ve diğer hanelerden belirli bir kuralla türetilir.",
        "Luhn algoritması bu kurallardan en yaygın olanıdır. 1950'lerde bir mühendis tarafından geliştirilmiş, mekanik hesap makinelerinde bile kolayca uygulanabildiği için hızla yayılmıştır. Bugün uluslararası ISO/IEC 7812 standardında tanımlıdır ve ödeme kartı numaraları, cep telefonlarının IMEI numaraları ile bazı sadakat kartı ve kurum numaralarında kullanılır.",
        "Luhn'un görevi dardır ve bu sınırı bilmek önemlidir: algoritma yalnızca hanelerin kendi içinde tutarlı olup olmadığını söyler. Numaranın bir kuruluş tarafından verilip verilmediğini, aktif olup olmadığını ya da kime ait olduğunu bilemez. Bu yüzden Luhn bir güvenlik ya da kimlik doğrulama yöntemi değil, bir <strong>yazım hatası filtresidir</strong>."
      ]
    },
    {
      h: "Mod 10 kontrolü adım adım nasıl yapılır?",
      p: [
        "Doğrulama sağdan sola doğru yapılır. En sağdaki hane kontrol basamağıdır ve kendisi ikiye katlanmaz. Aşağıdaki adımlar herhangi bir uzunluktaki numaraya uygulanabilir:"
      ],
      ol: [
        "Numaradaki boşluk ve tireleri silin, yalnızca rakamlar kalsın.",
        "En sağdaki haneden başlayarak haneleri sıralayın. Sağdan 1., 3., 5. … haneler olduğu gibi kalır.",
        "Sağdan 2., 4., 6. … haneleri ikiye katlayın.",
        "Katlama sonucu 9'dan büyükse 9 çıkarın (bu, sonucun iki rakamını toplamakla aynı şeydir: 12 → 1 + 2 = 3).",
        "Elde ettiğiniz tüm hane değerlerini toplayın.",
        "Toplam 10'a tam bölünüyorsa (kalan 0 ise) numara Luhn denetiminden geçer; kalan varsa numarada hata vardır."
      ],
      formula: "Katlanan hane: d × 2 (sonuç > 9 ise − 9)\nKoşul: toplam mod 10 = 0",
      after: [
        "Bu adımları uzun bir numarada elle yapmak zaman alır ve kendisi de hataya açıktır. [[arac:luhn-kontrol|Luhn Algoritması Kontrolü aracı]] elinizdeki numaranın denetimden geçip geçmediğini her hanenin dönüşümüyle birlikte adım adım gösterir. Araç yalnızca denetim yapar; numara üretmez ve girdiğiniz değer tarayıcınızdan çıkmaz."
      ]
    },
    {
      h: "Çözümlü örnek: uydurma 1826 numarası",
      p: [
        "Kavramı göstermek için hiçbir gerçek numaraya karşılık gelmeyen, öğretim amaçlı uydurulmuş dört haneli <strong>1826</strong> dizisini kullanalım. Sağdan sırayla haneler 6, 2, 8 ve 1'dir."
      ],
      table: {
        head: ["Sağdan sıra", "Hane", "İşlem", "Değer"],
        rows: [
          ["1 (kontrol basamağı)", "6", "Aynen", "6"],
          ["2", "2", "2 × 2 = 4", "4"],
          ["3", "8", "Aynen", "8"],
          ["4", "1", "1 × 2 = 2", "2"],
          ["Toplam", "", "6 + 4 + 8 + 2", "20"]
        ],
        caption: "20, 10'a tam bölündüğü için uydurma örnek denetimden geçer."
      },
      after: [
        "Şimdi aynı numarayı yanlış yazdığımızı düşünelim. İkinci hane 2 yerine 3 yazılırsa (1836), sağdan 2. hane 3 × 2 = 6 olur ve toplam 6 + 6 + 8 + 2 = 22'ye çıkar. 22 sayısı 10'a bölünmez; hata yakalanmıştır.",
        "Son iki hane yer değiştirirse (1862), sağdan 1. hane 2, sağdan 2. hane 6 olur. 6 × 2 = 12 ve 12 − 9 = 3 bulunur. Toplam 2 + 3 + 8 + 2 = 15'tir; yine 10'a bölünmez ve hata yakalanır."
      ]
    },
    {
      h: "Kontrol basamağı yazım hatalarını nasıl yakalar?",
      p: [
        "Luhn'un gücü, ikiye katlama adımından gelir. Bir hane değiştiğinde, o hanenin toplama katkısı da mutlaka değişir: katlanmayan hanede fark doğrudan yansır, katlanan hanede ise 0–9 arasındaki her rakam farklı bir değere (0, 2, 4, 6, 8, 1, 3, 5, 7, 9) dönüşür. Bu yüzden <strong>tek bir hanedeki her hata</strong> toplamı değiştirir ve yakalanır.",
        "İki komşu hanenin yer değiştirmesinde biri katlanan, diğeri katlanmayan konuma geçer. Çoğu rakam çiftinde bu değişim toplamı farklılaştırır. Tek istisna 0 ile 9 çiftidir: 0 ikiye katlanınca 0, 9 ikiye katlanınca 18 − 9 = 9 olur; yani ikisi de konum değiştirdiğinde toplam aynı kalır."
      ]
    },
    {
      h: "Hangi hataları Luhn yakalayamaz?",
      table: {
        head: ["Hata türü", "Örnek (uydurma)", "Luhn yakalar mı?"],
        rows: [
          ["Tek hane yanlış", "1826 → 1836", "Evet, her zaman"],
          ["Komşu iki hane yer değiştirmiş", "1826 → 1862", "Evet (09 ↔ 90 dışında)"],
          ["09 ile 90 yer değiştirmiş", "0990 ↔ 0909", "Hayır, toplam aynı kalır"],
          ["İkiz hata (22 ↔ 55, 33 ↔ 66, 44 ↔ 77)", "2255 ↔ 5522", "Hayır"],
          ["Uzak iki hanenin yer değiştirmesi", "1. ve 3. hane", "Çoğu zaman hayır"],
          ["Birden çok hane hatası", "İki ayrı yanlış hane", "Rastlantıya bağlı"],
          ["Tamamen uydurulmuş numara", "Rastgele dizi", "Denetim anlam taşımaz"]
        ],
        caption: "Tablodaki örnekler gerçek numara değildir; yalnızca hata türlerini göstermek için seçilmiştir."
      },
      after: [
        "Bu sınırlar nedeniyle daha yüksek güvenilirlik gereken yerlerde farklı yöntemler kullanılır. Örneğin IBAN'daki iki kontrol hanesi mod 97 yöntemiyle hesaplanır ve yer değiştirme hatalarının neredeyse tamamını yakalar. Rastgele uydurulmuş on numaradan biri de tesadüfen Luhn denetiminden geçer; bu, denetimin neden \"gerçek numara\" kanıtı olamayacağını açıkça gösterir."
      ]
    },
    {
      h: "Luhn hangi numaralarda kullanılır, hangilerinde kullanılmaz?",
      p: [
        "Bir numaranın hangi denetimle korunduğunu bilmek, yanlış araçla kontrol yapıp yanlış sonuca varmayı önler. Türkiye'de sık karşılaşılan numaralar ve kullandıkları yöntemler şöyledir:"
      ],
      table: {
        head: ["Numara", "Kontrol yöntemi", "Not"],
        rows: [
          ["Ödeme kartı numarası", "Luhn (mod 10)", "ISO/IEC 7812; denetim kartın geçerliliğini göstermez"],
          ["IMEI (cep telefonu)", "Luhn (mod 10)", "15. hane kontrol basamağıdır"],
          ["IBAN", "Mod 97 (ISO 7064)", "Ülke kodundan sonraki iki hane kontrol hanesidir"],
          ["TC kimlik numarası", "Özel iki haneli kural", "Luhn değildir"],
          ["Vergi kimlik numarası (10 hane)", "Özel algoritma", "Luhn değildir"],
          ["EAN-13 barkod", "Ağırlıklı mod 10 (1 ve 3 katsayılı)", "Luhn'a benzer ama farklıdır"]
        ]
      },
      after: [
        "IBAN denetimi için [[arac:iban-dogrula|IBAN Doğrulama aracını]], ayrıntısı için [[bilgi:iban-nedir-kac-haneli|IBAN nedir yazısını]] kullanabilirsiniz. Vergi numarası için [[arac:vergi-no-dogrula|Vergi Kimlik No Algoritma Kontrolü]] mevcuttur; TC kimlik numarasının kuralı [[bilgi:tc-kimlik-numarasi-algoritmasi|TC kimlik algoritması]] yazısında, barkodların kontrol hanesi [[bilgi:barkod-numarasi-nedir-869-ean13|barkod numarası]] yazısında anlatılır. Tüm bu denetimler yalnızca biçimi kontrol eder; hiçbiri kayıt sorgulaması değildir."
      ]
    },
    {
      h: "Luhn'dan geçen numara gerçek midir? Kötüye kullanım uyarısı",
      p: [
        "Hayır. Luhn denetiminden geçmek, yalnızca hanelerin matematiksel olarak tutarlı olduğunu gösterir. Numaranın bir kuruluş tarafından verildiğini, kullanımda olduğunu, bakiye ya da yetki taşıdığını ve kime ait olduğunu göstermez. Bir kart ya da hesap numarasının gerçekten geçerli olup olmadığını yalnızca onu veren kuruluş kendi sistemlerinde doğrulayabilir.",
        "Bu yüzden Luhn denetimini bir başvuru formunda kullanıcının yazım hatasını anında göstermek, veri girişini hızlandırmak ya da bir listedeki hatalı kayıtları ayıklamak gibi <strong>meşru doğrulama</strong> amaçlarıyla kullanın. Başkasına ait kart ya da kimlik bilgilerini izinsiz kullanmak, sahte numara üretip ödeme ya da kayıt sistemlerini yanıltmaya çalışmak Türk Ceza Kanunu kapsamında suç oluşturur. Bilişim Ajans araçları bu nedenle numara üretmez, yalnızca elinizdeki numarayı denetler.",
        "Form geliştiriyorsanız Luhn denetimini yalnızca bir ön kontrol olarak düşünün: kullanıcıya \"numarayı kontrol edin\" uyarısı vermek için uygundur, ama asıl doğrulama her zaman numarayı veren kuruluşun sisteminde yapılmalıdır. Kart numaralarını kendi sunucunuzda saklamak ise ayrı ve sıkı güvenlik kurallarına tabidir."
      ]
    },
    {
      h: "Geliştiriciler için notlar",
      ul: [
        "Numarayı sayı olarak değil, <strong>metin</strong> olarak işleyin; baştaki sıfırlar ve 15 haneden uzun numaralar sayı türünde bozulabilir.",
        "Boşluk ve tireleri denetimden önce temizleyin, ama kullanıcının girdiği biçimi ekranda koruyun.",
        "Uzunluk kontrolünü ayrıca yapın; Luhn tek başına numaranın kaç haneli olması gerektiğini söylemez.",
        "Hata mesajında hangi hanenin yanlış olduğunu söylemeye çalışmayın; Luhn yalnızca bir hata olduğunu gösterir, yerini göstermez.",
        "Test için gerçek kişilere ait numaraları değil, kendi uydurduğunuz kısa dizileri ve hizmet sağlayıcınızın test belgelerindeki örnekleri kullanın."
      ],
      after: [
        "Kullanıcı deneyimi açısından en iyi uygulama, denetimi kullanıcı yazmayı bitirdiğinde yapmak ve hatayı nazik, açık bir dille göstermektir. Her tuş vuruşunda kırmızı uyarı göstermek, numarayı henüz yazmakta olan kişiyi gereksiz yere tedirgin eder."
      ]
    }
  ],
  faq: [
    ["Luhn algoritması nedir?", "Luhn, bir numaranın son hanesini kontrol basamağı olarak kullanan ve numaranın yanlış yazılıp yazılmadığını anlamaya yarayan mod 10 sağlama yöntemidir. Ödeme kartı ve IMEI gibi numaralarda yazım hatalarını yakalamak için kullanılır."],
    ["Mod 10 kontrolü adım adım nasıl yapılır?", "Sağdan başlayarak 2., 4., 6. hanelerin her biri ikiye katlanır ve 9'dan büyük sonuçlardan 9 çıkarılır. Tüm haneler toplanır; toplam 10'a tam bölünüyorsa numara denetimden geçer."],
    ["Kontrol basamağı yazım hatalarını nasıl yakalar?", "Bir hane değiştiğinde toplama katkısı da değişir ve toplam artık 10'un katı olmaz. Bu sayede tek hane hatalarının tamamı ve komşu hanelerin yer değiştirmesinin büyük çoğunluğu yakalanır."],
    ["Luhn hangi numaralarda kullanılır?", "Ödeme kartı numaraları ve cep telefonlarının IMEI numaraları Luhn ile denetlenir; bazı kurum ve sadakat kartı numaralarında da kullanılır. IBAN, TC kimlik ve vergi numaraları farklı algoritmalar kullanır."],
    ["IBAN'ın kontrol haneleri Luhn ile mi hesaplanır?", "Hayır. IBAN'daki ülke kodundan sonraki iki kontrol hanesi ISO 7064 mod 97 yöntemiyle hesaplanır. Bu yöntem Luhn'dan daha fazla hata türünü yakalar; IBAN Doğrulama aracı bu kontrolü yapar."],
    ["Vergi numarası doğrulaması nasıl çalışır?", "10 haneli vergi kimlik numarası, ilk dokuz haneden özel bir ağırlık ve mod işlemiyle hesaplanan son haneyle denetlenir. Bu Luhn değildir ve algoritmaya uyması mükellef kaydının olduğunu göstermez."],
    ["Luhn'dan geçen numara gerçek midir?", "Hayır. Denetimden geçmek yalnızca hanelerin kendi içinde tutarlı olduğunu gösterir; numaranın verilmiş, aktif ya da birine ait olduğunu kanıtlamaz. Rastgele dizilerin yaklaşık onda biri de tesadüfen geçer."],
    ["Hangi hataları Luhn yakalayamaz?", "09 ile 90'ın yer değiştirmesini, 22-55, 33-66 ve 44-77 gibi ikiz hataları ve birbirinden uzak hanelerin yer değiştirmesini çoğu zaman yakalayamaz. Birden çok hane hatası da tesadüfen gözden kaçabilir."],
    ["Luhn aracı numara üretir mi?", "Hayır. Luhn Algoritması Kontrolü aracı yalnızca elinizdeki numaranın denetimden geçip geçmediğini gösterir. Numara üretmez, girdiğiniz değeri hiçbir sunucuya göndermez ve kaydetmez."]
  ],
  tools: ["luhn-kontrol", "iban-dogrula", "vergi-no-dogrula", "barkod-olustur"],
  related: ["tc-kimlik-numarasi-algoritmasi", "iban-nedir-kac-haneli", "barkod-numarasi-nedir-869-ean13"],
  sources: [
    ["ISO – ISO/IEC 7812 kart numaralandırma standardı", "https://www.iso.org/"]
  ],
  uyari: "Luhn denetimi kimlik, kart ya da hesap doğrulaması değildir; başkasına ait numaraları izinsiz kullanmak ve sahte numarayla sistemleri yanıltmaya çalışmak suçtur"
};
