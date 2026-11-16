export default {
  slug: "oltalama-sahte-link-nasil-anlasilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Sahte Link Nasıl Anlaşılır? Oltalama (Phishing) SMS ve E-posta İşaretleri",
  pageTitle: "Sahte Link Nasıl Anlaşılır? Oltalama SMS ve E-posta İşaretleri",
  description: "Oltalama nedir, sahte link nasıl anlaşılır? Alan adını sağdan okuma, punycode tuzağı, kargo ve banka SMS'leri, QR oltalaması, tıkladıysanız yapılacaklar ve USOM ihbarı.",
  keywords: ["sahte link nasıl anlaşılır", "oltalama nedir", "phishing nedir", "dolandırıcı sms", "kargo sms dolandırıcılık", "link güvenli mi", "sahte site nasıl anlaşılır", "usom ihbar"],
  lead: "Bir bağlantının sahte olup olmadığını anlamanın en güvenilir yolu, <strong>adresin alan adı kısmını sağdan sola okuyup kurumun bilinen resmî adresiyle harf harf karşılaştırmaktır</strong>; asıl belirleyici, \".com.tr\" ya da \".com\" uzantısından hemen önce gelen addır. Oltalama (phishing), sizi tanıdık bir kurum adıyla kandırarak şifre, kart bilgisi ya da doğrulama kodu girdirmeye çalışan dolandırıcılık yöntemidir. Bu sayfada sahte SMS ve e-postaların işaretlerini, alan adındaki küçük farkları, Türkçe karakterli sahte adresleri, QR kodla oltalamayı, tıkladıysanız yapmanız gerekenleri ve ihbar kanallarını bulacaksınız.",
  kisaCevap: [
    "Oltalama, banka, kargo şirketi ya da kamu kurumu gibi davranıp kişisel bilgilerinizi ele geçirmeye çalışan bir aldatma yöntemidir.",
    "Alan adını sağdan okuyun: ornekbanka.com.tr.guvenlik-giris.com adresinin asıl sahibi \"guvenlik-giris.com\"dur.",
    "Aciliyet (\"hesabınız 24 saat içinde kapanacak\"), küçük bir ödeme isteği ve kısaltılmış bağlantı en yaygın üç işarettir.",
    "Türkçe ya da yabancı harfli taklit adresler tarayıcıda xn-- ile başlayan punycode biçiminde görünebilir.",
    "Bankalar ve kamu kurumları SMS ya da e-postayla şifre, kart güvenlik kodu ya da tek kullanımlık kod istemez.",
    "Oltalama girişimini USOM'un ihbar sayfasına bildirebilir, zarar gördüyseniz bankanızı arayıp savcılığa ya da kolluğa başvurabilirsiniz."
  ],
  figure: {
    alt: "Bir web adresinin parçalara ayrılması: şema, alt alan adları, asıl alan adı ve yol; asıl alan adının uzantıdan hemen önceki bölüm olduğu, sahte örnekte bunun guvenlik-giris.com olduğu gösteriliyor.",
    caption: "Adresi sağdan okuyun. Uzantıdan (.com, .com.tr) hemen önceki ad, sitenin gerçek sahibidir; solda kalan her şey o sahibin istediği gibi yazabildiği alt alan adıdır. Yolda geçen kurum adı da bir şey kanıtlamaz.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Adresi sağdan sola okuyun</text>
  <text x="20" y="68" class="b ok">Gerçek adres örneği</text>
  <rect x="20" y="78" width="680" height="44" rx="8" class="sf sb"/>
  <text x="36" y="106" class="mu">https</text>
  <text x="104" y="106" class="mu">giris.</text>
  <text x="152" y="106" class="b ok">ornekbanka.com.tr</text>
  <text x="300" y="106" class="mu">/bireysel</text>
  <text x="152" y="142" class="sm ok">asıl alan adı: kurumun kendisi</text>
  <text x="20" y="184" class="b dg">Sahte adres örneği</text>
  <rect x="20" y="194" width="680" height="44" rx="8" class="dgs"/>
  <text x="36" y="222" class="mu">https</text>
  <text x="104" y="222" class="mu">ornekbanka.com.tr.</text>
  <text x="258" y="222" class="b dg">guvenlik-giris.com</text>
  <text x="410" y="222" class="mu">/ornekbanka/onay</text>
  <text x="104" y="258" class="sm">alt alan adı: herkes yazabilir</text>
  <text x="410" y="258" class="sm">yol: kurum adı kanıt değildir</text>
  <text x="258" y="278" class="sm dg b">asıl sahip burası</text>
  <rect x="20" y="300" width="330" height="104" rx="8" class="sf sb"/>
  <text x="36" y="326" class="b">Taklit harf tuzağı</text>
  <text x="36" y="350" class="sm">ekranda: örnekbanka.com</text>
  <text x="36" y="372" class="sm">gerçekte: xn--rnekbanka-z7a.com</text>
  <text x="36" y="394" class="sm mu">farklı bir alan adıdır</text>
  <rect x="370" y="300" width="330" height="104" rx="8" class="ps"/>
  <text x="386" y="326" class="b">Üç soru sorun</text>
  <text x="386" y="350" class="sm">1. Bu mesajı bekliyor muydum?</text>
  <text x="386" y="372" class="sm">2. Alan adı resmî adresle aynı mı?</text>
  <text x="386" y="394" class="sm">3. Benden şifre ya da kod mu istiyor?</text>
</svg>`
  },
  sections: [
    {
      h: "Oltalama (phishing) nedir?",
      p: [
        "Oltalama, dolandırıcıların güvendiğiniz bir kurumun ya da kişinin kılığına girerek sizi sahte bir sayfaya yönlendirdiği ve orada bilgilerinizi kendi elinizle vermenizi sağladığı aldatma yöntemidir. İngilizcedeki adı \"phishing\", balık tutma anlamındaki kelimeden türetilmiştir: yem atılır, birinin takılması beklenir.",
        "Saldırı genellikle bir mesajla başlar: SMS, e-posta, anlık mesajlaşma uygulaması, sosyal medya mesajı ya da sahte bir reklam. Mesajda bir bağlantı vardır ve bağlantı, bankanın, kargo şirketinin, bir kamu kurumunun ya da bir alışveriş sitesinin giriş sayfasına çok benzeyen bir sayfaya açılır. Siz şifrenizi, kart bilginizi ya da telefonunuza gelen doğrulama kodunu yazdığınız anda bilgiler dolandırıcıya geçer.",
        "Oltalama teknik bir açıktan çok insan psikolojisini hedefler. Merak, korku, aciliyet ve fırsat duygusu en çok kullanılan kaldıraçlardır. Bu nedenle en iyi savunma, mesajın içeriğine değil kaynağına ve bağlantının gerçek adresine bakma alışkanlığıdır."
      ]
    },
    {
      h: "Bir bağlantının sahte olduğu nasıl anlaşılır?",
      p: [
        "Bir web adresi parçalardan oluşur: şema (https), alt alan adları, asıl alan adı, uzantı ve yol. Sitenin kime ait olduğunu belirleyen tek parça, uzantıdan hemen önce gelen asıl alan adıdır. Dolandırıcılar kurum adını adresin sol tarafına (alt alan adı olarak) ya da sağ tarafına (yol olarak) yerleştirerek gözü yanıltır."
      ],
      ol: [
        "Adresteki ilk tek eğik çizgiyi (/) bulun; ondan sonrası yoldur ve sitenin sahibini göstermez.",
        "Eğik çizgiden önceki kısmı sağdan sola okuyun: önce uzantı (.com.tr), sonra asıl alan adı.",
        "Bu adı kurumun bildiğiniz resmî adresiyle harf harf karşılaştırın; tek harf farkı bile başka bir sitedir.",
        "Kısaltılmış bağlantılarda gerçek adresi göremezsiniz; böyle bir bağlantıya kişisel bilgi girmeyin.",
        "Adresi parçalarına ayırarak görmek için [[arac:url-ayristir|URL Ayrıştırma]] aracına yapıştırabilirsiniz; araç bağlantıyı açmaz, yalnızca metin olarak çözümler."
      ],
      table: {
        head: ["Adres", "Asıl alan adı", "Değerlendirme"],
        rows: [
          ["giris.ornekbanka.com.tr/bireysel", "ornekbanka.com.tr", "Kurumun kendi adresi"],
          ["ornekbanka.com.tr.guvenlik-giris.com", "guvenlik-giris.com", "Sahte: kurum adı alt alan adında"],
          ["guncelle-hesap.net/ornekbanka", "guncelle-hesap.net", "Sahte: kurum adı yolda"],
          ["ornekbanka-tr.com", "ornekbanka-tr.com", "Şüpheli: tire ile türetilmiş benzer ad"],
          ["0rnekbanka.com.tr", "0rnekbanka.com.tr", "Sahte: o harfi yerine sıfır"]
        ],
        caption: "Örneklerdeki adresler temsilîdir; gerçek bir kurumu göstermez."
      },
      after: [
        "Adres çubuğundaki kilit simgesi ve https, yalnızca bağlantının şifreli olduğunu gösterir; sitenin güvenilir olduğunu göstermez. Dolandırıcılar da kendi sahte siteleri için kolayca güvenlik sertifikası alabilir."
      ]
    },
    {
      h: "Alan adındaki küçük farklar nasıl fark edilir?",
      p: [
        "Göz, tanıdık bir kelimeyi bütün olarak okur ve küçük farkları kaçırır. Dolandırıcılar bunu bilerek benzer görünen harfleri kullanır: o yerine 0, l yerine 1 ya da büyük I, m yerine rn (r ve n yan yana), w yerine vv. Ek kelimelerle türetilmiş adlar da yaygındır: kurum adına \"-destek\", \"-guvenlik\", \"-online\", \"-tr\" gibi ekler getirmek.",
        "Bu farkları yakalamanın en pratik yolu, önemli sitelere hiçbir zaman mesajdaki bağlantıdan girmemektir. Bankanızın ya da kullandığınız hizmetin adresini tarayıcıya kendiniz yazın, yer imlerine kaydedin ya da kurumun resmî mobil uygulamasını kullanın. Böylece sahte bir bağlantının sizi yanıltma şansı kalmaz."
      ]
    },
    {
      h: "Türkçe karakterli sahte alan adları (punycode) nedir?",
      p: [
        "İnternet alan adı sistemi aslında yalnızca İngiliz alfabesindeki harfleri, rakamları ve tireyi tanır. ç, ğ, ö, ş, ü gibi harfleri ya da başka alfabelerin harflerini içeren adlar, arka planda <strong>punycode</strong> denen bir kodlamayla \"xn--\" ile başlayan bir biçime çevrilir. Örneğin \"çiçek.com\" adresi sistemde \"xn--iek-1lab.com\" olarak tutulur.",
        "Bu özellik meşrudur, ama taklit için de kullanılabilir. \"ornekbanka.com\" ile \"örnekbanka.com\" ekranda çok benzer görünür; oysa ikincisi \"xn--rnekbanka-z7a.com\" adında tamamen farklı bir alan adıdır. Daha sinsi bir yöntem, Latin \"a\" harfinin yerine görünüşte aynı olan Kiril \"а\" harfini kullanmaktır. Göz farkı göremez, ama tarayıcı ve sistem bunu \"xn--ornekbank-8yh.com\" gibi bambaşka bir ad olarak görür.",
        "Modern tarayıcılar karışık alfabeli şüpheli adları çoğu zaman xn-- biçiminde gösterir. Bir adresin gerçek hâlini görmek için [[arac:punycode-cevir|Punycode Çevirici]] aracına yapıştırabilirsiniz. Bildiğiniz bir kurumun adresi xn-- biçimine dönüşüyorsa ve kurumun adında Türkçe karakter yoksa o adres sahtedir."
      ]
    },
    {
      h: "Kargo ve banka SMS'lerindeki linkler neden risklidir?",
      p: [
        "SMS, oltalamanın en etkili kanallarından biridir: ekran küçüktür, adres kısmen görünür ve mesaj gönderen adı kolayca taklit edilebilir. Bir kargo şirketinden ya da bankadan geldiği izlenimi veren mesaj, gerçek mesajlarla aynı sohbet dizisinde bile görünebilir. Bu yüzden \"gönderen adı doğru\" demek mesajın gerçek olduğunu kanıtlamaz.",
        "Kargo oltalamasında tipik senaryo \"adres bilginiz eksik, gönderiniz bekletiliyor, küçük bir ücret ödeyin\" mesajıdır. Ödeme sayfasına girilen kart bilgisi ve ardından gelen doğrulama kodu, çok daha büyük tutarlı işlemler için kullanılır. Banka oltalamasında ise \"hesabınız askıya alındı\", \"şüpheli işlem tespit edildi\", \"puanlarınızın süresi doluyor\" gibi korku ya da fırsat mesajları öne çıkar."
      ],
      ul: [
        "<strong>Beklemediğiniz kargo mesajı:</strong> Siparişiniz yoksa ya da takip numarası tanıdık değilse bağlantıyı açmayın; kargo durumunu satıcının sitesinden ya da kargo şirketinin uygulamasından kendiniz sorgulayın.",
        "<strong>Küçük tutarlı ödeme isteği:</strong> Gümrük, adres düzeltme ya da yeniden gönderim için birkaç liralık ödeme istenmesi klasik bir yemdir.",
        "<strong>Doğrulama kodu istenmesi:</strong> Telefonunuza gelen tek kullanımlık kodu hiçbir sayfaya ya da kişiye vermeyin; bu kod bir işlemi onaylamak içindir.",
        "<strong>Aciliyet:</strong> \"Son 2 saat\", \"hemen işlem yapmazsanız\" gibi ifadeler düşünmenizi engellemek için kullanılır."
      ]
    },
    {
      h: "QR kodla oltalama (quishing) nedir?",
      p: [
        "QR kod oltalaması, sahte bağlantının bir karekoda gizlenmesidir. Otopark makinelerine, restoran masalarına, elektrikli araç şarj noktalarına ya da afişlere yapıştırılan sahte QR etiketleri, okutan kişiyi ödeme ya da giriş sayfası taklidine götürür. Aynı yöntem e-postalarda da kullanılır: e-posta güvenlik filtreleri bağlantıları kontrol eder ama resim içindeki karekodu her zaman çözemez.",
        "Korunmak için QR kodu okuttuktan sonra açılan adresi, sayfaya geçmeden önce kontrol edin. Telefonunuzun kamerası adresi önizlemede gösteriyorsa alan adını okuyun. [[arac:qr-kod-oku|QR Kod Okuyucu]] aracı karekodun içeriğini, bağlantıyı açmadan metin olarak gösterir. Fiziksel bir karekodun üstünde başka bir etiket yapıştırılmış gibi duruyorsa okutmayın. Karekodların nasıl çalıştığını [[bilgi:qr-kod-nasil-okutulur|QR kod nasıl okutulur]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Linke tıkladıysam ne yapmalıyım?",
      p: [
        "Yalnızca bağlantıyı açmak çoğu durumda tek başına zarar vermez; asıl risk, açılan sayfaya bilgi girmek ya da bir dosya indirip çalıştırmaktır. Paniğe kapılmadan, ne yaptığınıza göre aşağıdaki adımları uygulayın."
      ],
      ol: [
        "<strong>Hiçbir bilgi girmediyseniz:</strong> Sayfayı kapatın, tarayıcı geçmişini ve indirilen dosyaları kontrol edin, bilmediğiniz bir dosyayı açmayın.",
        "<strong>Şifre girdiyseniz:</strong> Hemen kurumun resmî sitesinden ya da uygulamasından o şifreyi değiştirin. Aynı şifreyi başka yerlerde kullanıyorsanız oraları da değiştirin ve iki adımlı doğrulamayı açın.",
        "<strong>Kart bilgisi ya da doğrulama kodu girdiyseniz:</strong> Vakit kaybetmeden bankanızın müşteri hizmetlerini kartın arkasındaki numaradan arayıp kartı kullanıma kapattırın ve işlemlere itiraz edin.",
        "<strong>Bir dosya indirip açtıysanız:</strong> Cihazı internetten ayırın, güvenlik taramasından geçirin; iş cihazıysa kurumunuzun bilgi işlem birimine haber verin.",
        "<strong>Para kaybettiyseniz:</strong> Mesaj, ekran görüntüsü ve dekontları saklayın; Cumhuriyet başsavcılığına ya da kolluğa (polis, jandarma) başvurun."
      ],
      after: [
        "Güçlü ve her hizmette farklı şifre kullanmak, bir sızıntının diğer hesaplarınıza yayılmasını önler; ayrıntılar [[rehber:sifre-guvenligi-ve-guclu-sifre|şifre güvenliği rehberinde]] yer alır."
      ]
    },
    {
      h: "Oltalama girişimi nereye bildirilir?",
      p: [
        "Türkiye'de siber olaylara karşı ulusal koordinasyonu Ulusal Siber Olaylara Müdahale Merkezi (USOM) yürütür. USOM'un internet sitesindeki ihbar bölümünden şüpheli bağlantıları ve oltalama sayfalarını bildirebilirsiniz; doğrulanan zararlı adresler ulusal listelere eklenerek erişimin engellenmesine katkı sağlanır. Bilgi Teknolojileri ve İletişim Kurumu (BTK) da elektronik haberleşme alanında tüketici başvurularını ve sahte mesajlarla ilgili bilgilendirmeleri yürütür.",
        "Bunlara ek olarak taklit edilen kurumu da bilgilendirin: bankalar ve kargo şirketleri kendi adlarına açılan sahte sayfaları kapattırmak için ihbar kanalları işletir. Para kaybı ya da hesap ele geçirme gibi bir zarar varsa ihbarın yanında mutlaka savcılığa ya da kolluğa şikâyette bulunun; bu, olası para iadesi süreçleri için de gereklidir."
      ],
      ul: [
        "Şüpheli SMS'i silmeden önce ekran görüntüsünü alın; gönderen numara ya da adı ve bağlantının tam metnini saklayın.",
        "E-postalarda göndereni engellemeden önce e-postayı \"oltalama\" ya da \"istenmeyen\" olarak işaretleyin.",
        "Yakınlarınızı, özellikle yaşlı aile bireylerini, aynı mesajın onlara da gelebileceği konusunda uyarın."
      ]
    },
    {
      h: "Kendinizi korumak için alışkanlıklar",
      ul: [
        "Bankaya, e-Devlet'e ve alışveriş hesaplarına hep yer iminden ya da resmî uygulamadan girin; mesajdaki bağlantıyı kullanmayın.",
        "Her önemli hesapta iki adımlı doğrulamayı açın; şifre çalınsa bile ikinci adım çoğu saldırıyı durdurur.",
        "Tek kullanımlık kodu yalnızca kendi başlattığınız işlem için, yalnızca kurumun kendi ekranına girin.",
        "Telefon ve tarayıcı güncellemelerini ertelemeyin; güncellemeler bilinen açıkları kapatır.",
        "\"Çok iyi görünen\" fırsatlara ve beklenmedik ödül mesajlarına şüpheyle yaklaşın; acele ettiren mesaj en tehlikelisidir.",
        "Bağlantıların gizli karakterler ya da kodlanmış kısımlar içerebildiğini unutmayın; %20 gibi kodların ne anlama geldiğini [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama]] yazısı açıklar."
      ]
    }
  ],
  faq: [
    ["Oltalama (phishing) nedir?", "Oltalama, dolandırıcıların banka, kargo şirketi ya da kamu kurumu gibi davranarak sizi sahte bir sayfaya yönlendirdiği ve şifre, kart bilgisi veya doğrulama kodu girmenizi sağladığı aldatma yöntemidir."],
    ["Bir bağlantının sahte olduğu nasıl anlaşılır?", "Adresteki ilk eğik çizgiden önceki kısmı sağdan sola okuyun; uzantıdan hemen önceki ad sitenin gerçek sahibidir. Bu adı kurumun bilinen resmî adresiyle harf harf karşılaştırın, kısaltılmış bağlantılara bilgi girmeyin."],
    ["Alan adındaki küçük farklar nasıl fark edilir?", "Dolandırıcılar o yerine sıfır, l yerine bir ya da m yerine r ve n gibi benzer karakterler ve -destek, -guvenlik gibi ekler kullanır. En güvenli yol önemli sitelere mesajdaki bağlantıdan değil, yer iminden girmektir."],
    ["Türkçe karakterli sahte alan adları (punycode) nedir?", "Türkçe ya da başka alfabe harfleri içeren alan adları arka planda xn-- ile başlayan punycode biçimine çevrilir. Görünüşte aynı harfler farklı bir alan adı oluşturabilir; çevirici araçla gerçek biçimi kontrol edebilirsiniz."],
    ["Kargo ve banka SMS'lerindeki linkler neden risklidir?", "SMS'te gönderen adı taklit edilebilir ve küçük ekranda adres tam görünmez. Küçük bir ücret ödetme ya da hesap askıya alındı mesajlarıyla kart bilgisi ve doğrulama kodu ele geçirilip büyük işlemler yapılır."],
    ["QR kodla oltalama (quishing) nedir?", "Sahte bağlantının bir karekoda gizlenmesidir. Otopark, masa ya da afişlere yapıştırılan sahte karekodlar ödeme sayfası taklidine götürebilir; okuttuktan sonra açılan adresi sayfaya geçmeden kontrol edin."],
    ["Linke tıkladıysam ne yapmalıyım?", "Bilgi girmediyseniz sayfayı kapatıp indirilen dosyaları kontrol edin. Şifre girdiyseniz hemen değiştirin, kart bilgisi ya da kod verdiyseniz bankanızı arayıp kartı kapattırın, zarar varsa savcılığa başvurun."],
    ["Oltalama girişimi nereye bildirilir?", "Şüpheli bağlantıları USOM'un internet sitesindeki ihbar bölümüne bildirebilir, taklit edilen kurumu da haberdar edebilirsiniz. Para kaybı ya da hesap ele geçirme varsa Cumhuriyet başsavcılığına veya kolluğa şikâyette bulunun."],
    ["Banka SMS ile şifre ya da kod ister mi?", "Hayır. Bankalar ve kamu kurumları SMS, e-posta ya da telefonla şifrenizi, kart güvenlik kodunuzu veya tek kullanımlık doğrulama kodunuzu istemez. Bunu isteyen her mesaj ve arama şüphelidir."]
  ],
  tools: ["url-ayristir", "punycode-cevir", "qr-kod-oku"],
  related: ["qr-kod-nasil-okutulur", "url-kodlama-yuzde-20-nedir", "uctan-uca-sifreleme-nedir", "http-durum-kodlari-404-500-nedir"],
  sources: [
    ["USOM – Ulusal Siber Olaylara Müdahale Merkezi", "https://www.usom.gov.tr/"],
    ["BTK – Bilgi Teknolojileri ve İletişim Kurumu", "https://www.btk.gov.tr/"]
  ],
  uyari: "genel bilgilendirme amaçlıdır; para kaybı ya da hesap ele geçirme durumunda bankanıza ve yetkili mercilere başvurun"
};
