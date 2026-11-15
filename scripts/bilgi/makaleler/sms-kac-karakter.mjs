export default {
  slug: "sms-kac-karakter",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "SMS Kaç Karakter? Türkçe Karakter, Tweet ve Meta Açıklama Sınırları",
  pageTitle: "SMS Kaç Karakter? Türkçe Karakterli SMS 160 mı 70 mi?",
  description: "Standart SMS 160 karakterdir; ş, ğ, ı, İ, ç gibi tek bir harf mesajı Unicode'a çevirip sınırı 70'e düşürür. Uzun mesaj, tweet, biyografi ve meta açıklama sınırları.",
  keywords: ["sms kaç karakter", "türkçe karakterli sms kaç karakter", "tweet kaç karakter", "karakter sayısı hesaplama", "meta description kaç karakter", "instagram biyografi kaç karakter", "uzun sms kaç mesaj", "toplu sms maliyeti"],
  lead: "Tek bir SMS, standart GSM alfabesiyle yazıldığında <strong>160 karakter</strong>, Türkçeye özgü ş, ğ, ı, İ, ç gibi bir harf ya da emoji içerdiğinde <strong>70 karakter</strong> taşır. Bu sınırı aşan mesajlar parçalara bölünür ve her parça 153 ya da 67 karakter alır. Bu yüzden 125 karakterlik Türkçe bir bilgilendirme mesajı 2 SMS sayılırken aynı metin Türkçe karaktersiz yazıldığında 1 SMS'e sığar. Bu sayfada SMS hesabının mantığını, toplu SMS maliyetini ve X, Instagram ile meta açıklama karakter sınırlarını bulacaksınız.",
  kisaCevap: [
    "GSM-7 kodlamada tek SMS 160 karakterdir; birleşik (uzun) mesajda her parça 153 karakter taşır.",
    "Mesajda GSM alfabesinde olmayan tek bir karakter bile varsa tüm mesaj UCS-2 (Unicode) ile kodlanır: tek SMS 70, her parça 67 karakter.",
    "GSM alfabesinde ö, ü, Ö, Ü ve Ç bulunur; ş, Ş, ğ, Ğ, ı, İ ve küçük ç bulunmaz.",
    "^ { } [ ] ~ | \\ ve € karakterleri GSM-7'de 2 karakter yer kaplar.",
    "Boşluklar, satır sonları ve noktalama işaretleri karakter sayısına dahildir.",
    "X'te standart gönderi 280 karakter, Instagram biyografisi 150 karakterdir; meta açıklama için sabit sınır yoktur, 150–160 karakter pratik hedeftir."
  ],
  figure: {
    alt: "SMS kapasitesi: 140 baytlık bir SMS, GSM-7 ile 160, Unicode ile 70 karakter taşır. Uzun mesajda başlık 6 bayt yer kapladığı için parça başına 153 ve 67 karaktere düşer. Örnek 125 karakterlik Türkçe mesaj 2 SMS, Türkçe karaktersiz hâli 1 SMS.",
    caption: "Bir SMS'in yükü her zaman 140 bayttır. Değişen, bir karakterin kaç bit kapladığıdır: GSM-7'de 7 bit, Unicode'da 16 bit. Uzun mesajlarda parçaları birleştirmek için eklenen başlık her parçadan pay alır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">140 baytlık bir SMS'e kaç karakter sığar?</text>
  <text x="30" y="72" class="b">GSM-7 (7 bit)</text>
  <rect x="180" y="54" width="480" height="28" rx="4" class="oks"/>
  <text x="420" y="74" class="b mid">160 karakter</text>
  <text x="30" y="116" class="b">Unicode (16 bit)</text>
  <rect x="180" y="98" width="210" height="28" rx="4" class="dgs"/>
  <rect x="390" y="98" width="270" height="28" rx="4" class="sf sb dash"/>
  <text x="285" y="118" class="b mid">70 karakter</text>
  <text x="525" y="118" class="sm mid mu">tek ş, ğ, ı, İ ya da emoji yeter</text>
  <line x1="30" y1="146" x2="690" y2="146" class="sb dash" fill="none"/>
  <text x="30" y="176" class="b">Uzun mesaj: her parçada 6 bayt başlık</text>
  <rect x="30" y="190" width="40" height="28" rx="4" class="p"/><text x="50" y="209" class="sm mid sf b">UDH</text>
  <rect x="70" y="190" width="300" height="28" rx="4" class="oks"/><text x="220" y="209" class="sm mid b">GSM-7: 153 karakter</text>
  <rect x="390" y="190" width="40" height="28" rx="4" class="p"/><text x="410" y="209" class="sm mid sf b">UDH</text>
  <rect x="430" y="190" width="160" height="28" rx="4" class="dgs"/><text x="510" y="209" class="sm mid b">Unicode: 67</text>
  <rect x="30" y="246" width="660" height="150" rx="10" class="sf sb"/>
  <text x="50" y="274" class="b">Örnek: 125 karakterlik sipariş bildirimi</text>
  <text x="50" y="302" class="sm">"Sayın müşterimiz, 12345 numaralı siparişiniz bugün kargoya..."</text>
  <rect x="50" y="316" width="150" height="30" rx="4" class="dgs"/><text x="125" y="336" class="sm mid b">1. parça: 67</text>
  <rect x="206" y="316" width="130" height="30" rx="4" class="dgs"/><text x="271" y="336" class="sm mid b">2. parça: 58</text>
  <text x="350" y="336" class="b dg">= 2 SMS</text>
  <rect x="50" y="354" width="280" height="30" rx="4" class="oks"/><text x="190" y="374" class="sm mid b">Türkçe karaktersiz: 125 / 160</text>
  <text x="350" y="374" class="b ok">= 1 SMS</text>
  <text x="680" y="374" class="sm end mu">ı, ş, İ → Unicode</text>
</svg>`
  },
  sections: [
    {
      h: "Bir SMS kaç karakterdir ve neden?",
      p: [
        "SMS (kısa mesaj servisi) teknik olarak her mesaj için en fazla <strong>140 baytlık</strong> bir veri alanı kullanır. Bu alana kaç karakter sığacağı, karakterlerin nasıl kodlandığına bağlıdır. Standart GSM alfabesi (GSM 03.38, bugün 3GPP TS 23.038) her karakteri 7 bitle ifade eder: 140 × 8 = 1.120 bit, 1.120 ÷ 7 = 160 karakter.",
        "GSM alfabesi Latin harflerini, rakamları, temel noktalama işaretlerini ve bazı Avrupa dillerindeki harfleri içerir. Bu alfabede bulunmayan bir karakter mesaja girdiğinde telefon ya da SMS sağlayıcısı mesajın tamamını <strong>UCS-2</strong> adlı Unicode kodlamasına geçirir. UCS-2'de her karakter 16 bit kaplar: 1.120 ÷ 16 = 70 karakter.",
        "Önemli nokta şudur: Unicode'a geçiş karakter bazında değil mesaj bazında olur. 150 karakterlik bir mesajın tek bir harfi \"ş\" olsa bile mesajın tamamı 70 karakterlik sınıra tabi olur ve 3 parçaya bölünür."
      ],
      formula: "GSM-7: 140 bayt × 8 ÷ 7 = 160 karakter\nUCS-2: 140 bayt × 8 ÷ 16 = 70 karakter\nUzun mesaj parçası: (140 − 6) bayt → GSM-7'de 153, UCS-2'de 67 karakter"
    },
    {
      h: "Türkçe karakter kullanınca SMS neden kısalır?",
      p: [
        "GSM alfabesi Türkçenin bütün harflerini içermez. ö, ü, Ö, Ü ve büyük Ç bu alfabededir; ancak ş, Ş, ğ, Ğ, ı, İ ve küçük ç yoktur. Bu harflerden biri mesaja girdiğinde mesaj Unicode'a geçer ve tek SMS kapasitesi 160'tan 70'e düşer. Emoji, akıllı tırnak (“ ”), uzun tire (—) ve üç nokta karakteri (…) da aynı etkiyi yaratır."
      ],
      table: {
        head: ["Karakter", "GSM-7'de var mı?", "Etkisi"],
        rows: [
          ["ö, ü, Ö, Ü", "Var", "1 karakter sayılır"],
          ["Ç (büyük)", "Var", "1 karakter sayılır"],
          ["ç (küçük)", "Yok", "Mesajı Unicode'a çevirir"],
          ["ş, Ş, ğ, Ğ, ı, İ", "Yok", "Mesajı Unicode'a çevirir"],
          ["€, [ ], { }, ~, ^, |, \\", "Genişletme tablosunda", "Her biri 2 karakter sayılır"],
          ["Emoji, “ ” tırnak, —, …", "Yok", "Mesajı Unicode'a çevirir; emoji çoğu zaman 2 birim"]
        ],
        caption: "Hesap standart kodlamalara göredir. Bazı operatör ve cihazlar Türkçe için ulusal dil kaydırma tablosunu destekler; bu durumda Türkçe harfler 7 bitte kalır ama her biri 2 birim sayılır ve başlık nedeniyle kapasite biraz azalır."
      },
      after: [
        "Bu yüzden toplu SMS gönderen işletmeler çoğu zaman metni Türkçe karaktersiz yazar: \"Sayın\" yerine \"Sayin\", \"siparişiniz\" yerine \"siparisiniz\". Okunabilirlik biraz düşer ama maliyet yarıya, hatta üçte bire inebilir. Metninizi otomatik olarak çevirmek için [[arac:turkce-karakter-donustur|Türkçe Karakter Dönüştürme aracını]] kullanabilirsiniz; karakter kodlaması sorunları için [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısı da yol gösterir."
      ]
    },
    {
      h: "Uzun mesaj kaç SMS sayılır?",
      p: [
        "160 (ya da 70) karakteri aşan mesajlar birkaç SMS'e bölünüp gönderilir ve alıcının telefonunda tek mesaj gibi birleştirilir. Birleştirme için her parçanın başına 6 baytlık bir kullanıcı veri başlığı (UDH) eklenir. Bu başlık parçanın yükünden yer aldığı için parça başına kapasite GSM-7'de 153, UCS-2'de 67 karaktere düşer."
      ],
      formula: "SMS sayısı = karakter ≤ 160 ise 1, değilse yukarı yuvarla(karakter ÷ 153)\nUnicode mesajda: karakter ≤ 70 ise 1, değilse yukarı yuvarla(karakter ÷ 67)",
      table: {
        head: ["SMS sayısı", "GSM-7 en fazla karakter", "Unicode en fazla karakter"],
        rows: [
          ["1", "160", "70"],
          ["2", "306", "134"],
          ["3", "459", "201"],
          ["4", "612", "268"],
          ["5", "765", "335"]
        ],
        caption: "Örneğin 161 karakterlik GSM-7 mesaj 2 SMS, 135 karakterlik Unicode mesaj 3 SMS sayılır."
      },
      after: [
        "Çözümlü örnek: \"Sayın müşterimiz, 12345 numaralı siparişiniz bugün kargoya verilmiştir. Kargo takip kodunuz: AB123456789. İyi günler dileriz.\" mesajı boşluklarla birlikte 125 karakterdir. İçinde ı, ş ve İ bulunduğu için Unicode'dur: 125 ÷ 67 = 1,87 → 2 SMS. Aynı metin Türkçe karaktersiz yazıldığında 125 ≤ 160 olduğu için 1 SMS'tir. Mesajınızın kaç SMS ettiğini ve hangi karakterlerin Unicode'a geçirdiğini [[arac:sms-karakter-sayaci|SMS Karakter Sayacı]] anında gösterir."
      ]
    },
    {
      h: "Toplu SMS maliyeti nasıl hesaplanır?",
      p: [
        "Toplu SMS sağlayıcıları ücreti genellikle gönderilen SMS parçası başına alır. Bu nedenle maliyet, alıcı sayısı ile mesajın kaç SMS ettiğinin çarpımına bağlıdır. Türkçe karakter kararı, büyük listelerde maliyeti doğrudan katlar."
      ],
      formula: "Toplam SMS = alıcı sayısı × mesaj başına SMS sayısı\nToplam maliyet = toplam SMS × SMS birim fiyatı",
      table: {
        head: ["Senaryo", "Mesaj başına SMS", "5.000 alıcıda toplam SMS", "Birim fiyat 0,25 TL ile (örnek)"],
        rows: [
          ["125 karakter, Türkçe karakterli", "2", "10.000", "2.500 TL"],
          ["125 karakter, Türkçe karaktersiz", "1", "5.000", "1.250 TL"],
          ["300 karakter, Türkçe karakterli", "5", "25.000", "6.250 TL"],
          ["300 karakter, Türkçe karaktersiz", "2", "10.000", "2.500 TL"]
        ],
        caption: "Birim fiyat örnek tutardır; gerçek fiyat sağlayıcıya, paket büyüklüğüne ve vergilere göre değişir. Bazı sağlayıcılar Türkçe karakterli mesajı farklı ücretlendirebilir."
      },
      after: [
        "Türkiye'de ticari amaçlı SMS gönderiminde 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili yönetmelik uyarınca alıcının önceden onay vermiş olması gerekir; onaylar İleti Yönetim Sistemi (İYS) üzerinden yönetilir. Bilgilendirme amaçlı mesajlarla tanıtım amaçlı mesajların kuralları farklıdır. Güncel yükümlülükleri Ticaret Bakanlığı ve İYS duyurularından takip edin."
      ]
    },
    {
      h: "X (Twitter) gönderisi ve Instagram biyografisi kaç karakter olabilir?",
      p: [
        "Sosyal medya platformları SMS'ten farklı olarak kodlamaya göre değil, kendi belirledikleri kurallara göre sayar. Bu kurallar zaman zaman değiştiği için aşağıdaki değerleri genel çerçeve olarak düşünün."
      ],
      table: {
        head: ["Alan", "Sınır", "Not"],
        rows: [
          ["X (Twitter) standart gönderi", "280 karakter", "Bağlantılar sabit uzunlukta sayılır; bazı karakterler ağırlıklı sayılabilir; ücretli hesaplarda sınır daha yüksektir"],
          ["Instagram biyografisi", "150 karakter", "Boşluk ve emoji dahil"],
          ["Instagram gönderi açıklaması", "2.200 karakter", "İlk satırlar akışta görünür, gerisi \"devamı\" ile açılır"],
          ["Sayfa başlığı (title)", "Yaklaşık 50–60 karakter", "Arama sonuçlarında piksel genişliğine göre kesilir"],
          ["Meta açıklama (description)", "Pratikte 150–160 karakter", "Sabit sınır yoktur; uzun metin kesilerek gösterilir"]
        ]
      },
      after: [
        "Gönderinizin sınıra sığıp sığmadığını, bağlantıları ve emojileri ağırlıklı sayarak [[arac:twitter-karakter-sayaci|Twitter Karakter Sayacı]] ile görebilirsiniz."
      ]
    },
    {
      h: "Meta açıklaması kaç karakter olmalı?",
      p: [
        "Meta açıklama (meta description), arama sonuçlarında sayfa başlığının altında görünebilen kısa özettir. Arama motorları resmî bir karakter sınırı koymaz; uzun açıklamaları ekran genişliğine göre keser ve bazen açıklama yerine sayfadan başka bir bölüm gösterir. Pratikte 150–160 karakter, masaüstünde çoğunlukla tam görünen bir uzunluktur; mobilde daha kısa kesilebilir.",
        "İyi bir meta açıklama sorunun cevabını özetler, ana anahtar kelimeyi doğal biçimde içerir ve okuru sayfaya tıklamaya yönlendirir. Önemli bilgiyi ilk 120 karaktere koymak, kesilme durumunda mesajın kaybolmasını önler."
      ]
    },
    {
      h: "Boşluklar karakter sayısına dahil mi?",
      p: [
        "Evet. SMS'te, sosyal medyada ve form alanlarında boşluk da bir karakterdir. Satır sonu (Enter) da genellikle 1 karakter sayılır. \"Boşluksuz karakter sayısı\" ise daha çok çeviri ücretlendirmesinde, akademik ödevlerde ve bazı yayın kurallarında kullanılır.",
        "Bir metnin boşluklu ve boşluksuz karakter sayısını, kelime ve satır sayısını, hatta UTF-8 bayt boyutunu [[arac:karakter-sayaci|Karakter Sayacı]] ile birlikte görebilirsiniz. Bayt boyutu, veritabanı alanı ya da dosya adı sınırı gibi teknik sınırlamalarda önemlidir: UTF-8'de İngilizce harfler 1, Türkçe harfler 2 bayt kaplar. Kelime sayısıyla sayfa sayısı arasındaki ilişki için [[bilgi:kac-kelime-kac-sayfa-eder|kaç kelime kaç sayfa eder]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "SMS'i kısa tutmak için ipuçları ve sık yapılan hatalar",
      ul: [
        "<strong>Kopyala-yapıştırdan gelen akıllı tırnaklar:</strong> Kelime işlemciden kopyalanan “ ” ve ’ işaretleri mesajı fark ettirmeden Unicode'a çevirir; düz tırnak kullanın.",
        "<strong>€ işareti:</strong> GSM-7'de 2 karakter sayılır; \"EUR\" ya da \"avro\" yazmak çoğu zaman daha kısadır.",
        "<strong>Tek bir emoji:</strong> 150 karakterlik bir duyuruya eklenen tek emoji mesajı 1 SMS'ten 3 SMS'e çıkarabilir.",
        "<strong>Uzun bağlantılar:</strong> SMS'te bağlantılar da karakter sayılır; kısa ve güvenilir bir alan adı kullanın.",
        "<strong>Gönderen bilgisini metne yazmak:</strong> Onaylı gönderici başlığı zaten görünüyorsa metinde firma adını tekrar etmek gereksiz karakter harcar.",
        "<strong>Test etmeden göndermek:</strong> Büyük listeye göndermeden önce kendi numaranıza deneme mesajı atın ve parça sayısını kontrol edin."
      ]
    }
  ],
  faq: [
    ["Bir SMS kaç karakterdir?", "Standart GSM alfabesiyle yazılmış tek bir SMS 160 karakterdir. Mesajda Türkçeye özgü ş, ğ, ı, İ, ç gibi bir harf ya da emoji varsa mesaj Unicode ile kodlanır ve tek SMS 70 karakterle sınırlanır."],
    ["Türkçe karakter kullanınca SMS neden kısalır?", "GSM alfabesi ş, ğ, ı, İ ve küçük ç harflerini içermez. Bu harflerden biri mesaja girince mesajın tamamı karakter başına 16 bit kullanan Unicode'a geçer ve 140 baytlık alana 160 yerine 70 karakter sığar."],
    ["Uzun mesaj kaç SMS sayılır?", "160 karakteri aşan GSM-7 mesajlar 153'er karakterlik, 70 karakteri aşan Unicode mesajlar 67'şer karakterlik parçalara bölünür. Örneğin 161 karakterlik standart mesaj 2 SMS, 135 karakterlik Türkçe karakterli mesaj 3 SMS sayılır."],
    ["X (Twitter) gönderisi kaç karakter olabilir?", "Standart hesaplarda bir gönderi 280 karakter olabilir. Bağlantılar uzunluklarından bağımsız sabit sayıda karakter sayılır ve bazı karakterler ağırlıklı hesaplanır; ücretli aboneliklerde daha uzun gönderilere izin verilir."],
    ["Instagram biyografisi kaç karakter?", "Instagram biyografisi en fazla 150 karakterdir ve boşluklar, satır sonları ile emojiler de bu sayıya dahildir. Gönderi açıklamaları ise 2.200 karaktere kadar uzayabilir."],
    ["Meta açıklaması kaç karakter olmalı?", "Arama motorları sabit bir sınır koymaz, açıklamayı ekran genişliğine göre keser. Pratikte 150–160 karakterlik bir açıklama masaüstünde çoğunlukla tam görünür; önemli bilgiyi ilk 120 karakterde vermek en güvenlisidir."],
    ["Boşluklar karakter sayısına dahil mi?", "Evet, SMS, sosyal medya ve form alanlarında boşluklar ve satır sonları da karakter sayılır. Boşluksuz sayım daha çok çeviri ücretlendirmesi ve bazı akademik kurallar için kullanılır."],
    ["Toplu SMS maliyeti nasıl hesaplanır?", "Alıcı sayısını mesajın kaç SMS ettiğiyle çarpıp birim fiyatla çarpın. 5.000 kişiye giden 2 SMS'lik mesaj 10.000 SMS eder; metni Türkçe karaktersiz yazarak 1 SMS'e indirmek maliyeti yarıya düşürür."],
    ["Emoji SMS'te kaç karakter sayılır?", "Emoji GSM alfabesinde bulunmadığı için mesajın tamamını Unicode'a çevirir. Çoğu emoji UTF-16'da iki kod birimiyle yazıldığından 2 karakter yer kaplar; bazı birleşik emojiler, örneğin ten rengi ya da aile emojileri, çok daha fazla yer tutabilir."],
    ["Alıcının telefonu uzun mesajı nasıl birleştirir?", "Her parçanın başındaki 6 baytlık başlık, mesajın kimlik numarasını, toplam parça sayısını ve parçanın sırasını taşır. Telefon bu bilgilerle parçaları sıraya dizer ve tek mesaj gibi gösterir; operatör ise her parçayı ayrı SMS olarak sayar."],
    ["Mesajım kaç SMS ediyor, nasıl öğrenirim?", "Metni SMS Karakter Sayacı'na yapıştırmanız yeterlidir. Araç kodlamayı, karakter sayısını, kaç SMS ettiğini ve mesajı Unicode'a çeviren karakterleri gösterir; isterseniz Türkçe karakterleri dönüştürülmüş metni de verir."]
  ],
  tools: ["sms-karakter-sayaci", "twitter-karakter-sayaci", "karakter-sayaci", "turkce-karakter-donustur"],
  related: ["turkce-karakter-sorunu-nasil-duzeltilir", "kac-kelime-kac-sayfa-eder", "gb-kac-mb-veri-birimleri"],
  sources: [
    ["3GPP – TS 23.038 Alfabeler ve dile özgü bilgiler", "https://www.3gpp.org/"],
    ["İleti Yönetim Sistemi (İYS)", "https://iys.org.tr/"],
    ["T.C. Ticaret Bakanlığı", "https://ticaret.gov.tr/"]
  ]
};
