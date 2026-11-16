export default {
  slug: "iki-adimli-dogrulama-nedir-2fa",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "İki Adımlı Doğrulama (2FA) Nedir? Doğrulama Uygulaması ve Yedek Kodlar",
  pageTitle: "İki Adımlı Doğrulama (2FA) Nedir? TOTP, SMS ve Yedek Kodlar",
  description: "2FA, girişte şifreye ek olarak ikinci bir kanıt ister: SMS kodu, doğrulama uygulaması ya da güvenlik anahtarı. TOTP'nin çalışması, yedek kodlar ve telefon kaybı.",
  keywords: ["iki adımlı doğrulama nedir", "2fa nedir", "doğrulama uygulaması", "totp nedir", "sms doğrulama güvenli mi", "yedek kodlar", "hesap güvenliği", "güvenlik anahtarı nedir"],
  lead: "İki adımlı doğrulama (2FA), bir hesaba girerken şifreye ek olarak ikinci bir kanıt istenmesidir: telefonunuza gelen SMS kodu, doğrulama uygulamasında 30 saniyede bir değişen kod ya da fiziksel bir güvenlik anahtarı. Şifreniz çalınsa bile saldırgan bu ikinci adımı geçemediği için hesap ele geçirme riski büyük ölçüde azalır. Bu sayfada yöntemlerin farkını, TOTP kodlarının nasıl üretildiğini, kurulumdaki QR kodun ne içerdiğini, yedek kodları ve telefon kaybolduğunda ne yapacağınızı anlatıyoruz.",
  kisaCevap: [
    "2FA iki farklı türden kanıt ister: bildiğiniz bir şey (şifre) ve sahip olduğunuz bir şey (telefon, anahtar).",
    "Doğrulama uygulamaları TOTP kullanır: paylaşılan gizli anahtar ve geçerli zaman diliminden 30 saniyede bir yeni 6 haneli kod üretilir.",
    "SMS kodu hiç yoktan iyidir, ama SIM kart değiştirme dolandırıcılığına ve oltalamaya karşı uygulama ya da anahtardan zayıftır.",
    "Kurulumda taranan QR kod gizli anahtarı içerir; ekran görüntüsünü kimseyle paylaşmayın.",
    "Yedek kodları çevrim dışı ve güvenli bir yerde saklayın; telefon kaybolduğunda hesaba dönüşün anahtarı onlardır."
  ],
  figure: {
    alt: "TOTP kodunun üretimi: telefonda ve sunucuda aynı gizli anahtar ve aynı 30 saniyelik zaman dilimi birleşir, iki taraf da aynı 6 haneli kodu bulur. Altta yöntemlerin güvenlik sıralaması: SMS, uygulama, güvenlik anahtarı.",
    caption: "Doğrulama uygulaması internete bağlanmadan kod üretir; çünkü telefon ve sunucu aynı gizli anahtarı ve aynı saati bilir. Alt kısım, yöntemlerin oltalamaya dayanıklılığını karşılaştırır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Doğrulama kodu nasıl üretilir? (TOTP)</text>
  <rect x="20" y="52" width="200" height="56" rx="8" class="p"/>
  <text x="120" y="76" class="b mid sf">Gizli anahtar</text>
  <text x="120" y="96" class="sm mid sf">kurulumda QR ile paylaşılır</text>
  <rect x="20" y="124" width="200" height="56" rx="8" class="ps"/>
  <text x="120" y="148" class="b mid">Zaman dilimi</text>
  <text x="120" y="168" class="sm mid">saat ÷ 30 saniye</text>
  <line x1="220" y1="80" x2="286" y2="112" class="st" fill="none" marker-end="url(#ok)"/>
  <line x1="220" y1="152" x2="286" y2="124" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="290" y="88" width="150" height="56" rx="8" class="sf sb"/>
  <text x="365" y="112" class="b mid">Özet fonksiyonu</text>
  <text x="365" y="132" class="sm mid t2">HMAC → 6 hane</text>
  <line x1="440" y1="116" x2="486" y2="116" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="490" y="72" width="210" height="88" rx="10" class="oks"/>
  <text x="595" y="110" class="xl mid">482 913</text>
  <text x="595" y="140" class="sm mid">30 saniye geçerli</text>
  <text x="360" y="204" class="sm mid t2">Telefon ve sunucu aynı hesabı ayrı ayrı yapar; kodlar eşleşirse giriş onaylanır.</text>
  <text x="20" y="246" class="b">Oltalamaya dayanıklılık</text>
  <rect x="20" y="262" width="680" height="18" rx="9" class="sf sb"/>
  <rect x="20" y="262" width="220" height="18" rx="9" class="dgs"/>
  <rect x="240" y="262" width="230" height="18" class="ps"/>
  <rect x="470" y="262" width="230" height="18" rx="9" class="oks"/>
  <rect x="20" y="294" width="210" height="104" rx="8" class="sf sb"/>
  <text x="125" y="320" class="b mid">SMS kodu</text>
  <text x="125" y="344" class="sm mid">Kolay ama SIM değiştirme</text>
  <text x="125" y="362" class="sm mid">ve sahte sayfaya açık</text>
  <text x="125" y="386" class="sm mid dg b">temel koruma</text>
  <rect x="255" y="294" width="210" height="104" rx="8" class="sf sb"/>
  <text x="360" y="320" class="b mid">Doğrulama uygulaması</text>
  <text x="360" y="344" class="sm mid">Çevrim dışı çalışır,</text>
  <text x="360" y="362" class="sm mid">SIM'e bağlı değildir</text>
  <text x="360" y="386" class="sm mid p b">iyi koruma</text>
  <rect x="490" y="294" width="210" height="104" rx="8" class="sf sb"/>
  <text x="595" y="320" class="b mid">Güvenlik anahtarı</text>
  <text x="595" y="344" class="sm mid">Sitenin adresini doğrular,</text>
  <text x="595" y="362" class="sm mid">sahte sayfada çalışmaz</text>
  <text x="595" y="386" class="sm mid ok b">güçlü koruma</text>
</svg>`
  },
  sections: [
    {
      h: "İki adımlı doğrulama nedir?",
      p: [
        "Bir hesaba girerken kim olduğunuzu kanıtlamanın üç temel yolu vardır: <strong>bildiğiniz</strong> bir şey (şifre, PIN), <strong>sahip olduğunuz</strong> bir şey (telefon, güvenlik anahtarı) ve <strong>kendiniz olan</strong> bir şey (parmak izi, yüz). İki adımlı doğrulama, bu türlerden ikisinin birlikte istenmesidir. Çoğu sistemde birinci adım şifre, ikinci adım ise telefonunuza ya da anahtarınıza bağlı bir koddur.",
        "Yöntemin gücü, iki farklı türden kanıtı aynı anda ele geçirmenin çok daha zor olmasından gelir. Şifreniz bir veri sızıntısında ortaya çıksa, tahmin edilse ya da sahte bir sayfaya yazılsa bile, saldırgan telefonunuz ya da anahtarınız olmadan giriş yapamaz. Bu yüzden 2FA, e-posta, bankacılık, sosyal medya ve iş hesapları için bugün en etkili temel güvenlik önlemlerinden biri kabul edilir.",
        "Türkçede \"iki adımlı doğrulama\", \"iki faktörlü kimlik doğrulama\" ve \"çok faktörlü doğrulama\" terimleri birbirinin yerine kullanılır. Teknik olarak çok faktörlü doğrulama ikiden fazla adımı da kapsar, ama günlük kullanımda hepsi aynı fikri anlatır."
      ]
    },
    {
      h: "2FA yöntemleri: SMS, doğrulama uygulaması, onay bildirimi ve güvenlik anahtarı",
      table: {
        head: ["Yöntem", "Nasıl çalışır", "Güçlü yanı", "Zayıf yanı"],
        rows: [
          ["SMS kodu", "Telefon numarasına tek kullanımlık kod gönderilir", "Kurulumu kolay, her telefonda çalışır", "SIM değiştirme dolandırıcılığı ve sahte sayfaya kod yazdırma"],
          ["E-posta kodu", "E-posta adresine kod gönderilir", "Ek cihaz gerekmez", "E-posta hesabı ele geçirilirse işe yaramaz"],
          ["Doğrulama uygulaması (TOTP)", "Telefon 30 saniyede bir kod üretir", "Çevrim dışı çalışır, numaraya bağlı değil", "Telefon kaybında yedek gerekir; sahte sayfaya kod yazılabilir"],
          ["Onay bildirimi", "Telefona \"giriş sizseniz onaylayın\" bildirimi gelir", "Kod yazmadan hızlı onay", "Art arda gelen bildirimlere dikkatsiz onay verme riski"],
          ["Güvenlik anahtarı / geçiş anahtarı", "Cihaz, sitenin adresini doğrulayarak kriptografik imza üretir", "Oltalamaya dayanıklı", "Anahtar kaybına karşı ikinci anahtar gerekir"]
        ]
      },
      after: [
        "Hangisini seçeceğiniz, hesabın önemine ve sunulan seçeneklere bağlıdır. Genel bir sıralama yapmak gerekirse: hiç 2FA olmamasındansa SMS, SMS'tense doğrulama uygulaması, doğrulama uygulamasındansa güvenlik anahtarı ya da geçiş anahtarı daha güçlüdür. Birçok hizmet aynı hesapta birden fazla yöntemi birlikte tanımlamanıza izin verir; bu da kayıp durumunda yedek yol sağlar."
      ]
    },
    {
      h: "SMS kodu ile doğrulama uygulaması arasındaki fark nedir?",
      p: [
        "SMS kodu, hizmet tarafından üretilip mobil şebeke üzerinden size gönderilir. Bu yüzden güvenliği telefon numaranızın güvenliğine bağlıdır. Bir dolandırıcı kimliğinize bürünerek numaranızı yeni bir SIM karta taşıtmayı başarırsa kodlar artık ona gider. Ayrıca SMS kodları, sahte bir giriş sayfasına sizin elinizle yazdırılarak da ele geçirilebilir.",
        "Doğrulama uygulaması ise kodu telefonunuzun içinde, hiçbir mesaj almadan üretir. Kurulum sırasında hizmetle telefonunuz arasında bir gizli anahtar paylaşılır; sonrasında kod üretmek için internet ya da şebeke bağlantısı gerekmez. Numara taşıma saldırısı bu yöntemi etkilemez. Ancak doğrulama uygulamasının kodu da sahte bir sayfaya yazılabilir; bu yüzden kodu girmeden önce adres çubuğundaki alan adını kontrol etmek her yöntemde önemlidir. Sahte bağlantıları tanımanın yollarını [[bilgi:oltalama-sahte-link-nasil-anlasilir|oltalama bağlantısı nasıl anlaşılır]] yazısında bulabilirsiniz."
      ],
      note: "Bankanızdan ya da bir kurumdan aradığını söyleyen biri size gelen doğrulama kodunu istiyorsa bu bir dolandırıcılık girişimidir. Gerçek kurumlar bu kodu telefonda, mesajda ya da e-postada sormaz."
    },
    {
      h: "TOTP kodları neden 30 saniyede değişir?",
      p: [
        "Doğrulama uygulamalarının çoğu TOTP (zamana dayalı tek kullanımlık parola) adlı açık bir standart kullanır. Mantık şöyledir: telefonunuz ve hizmetin sunucusu kurulumda aynı gizli anahtarı öğrenir. Her ikisi de geçerli zamanı 30 saniyelik dilimlere böler ve o dilimin sıra numarasını gizli anahtarla birlikte bir özet fonksiyonundan geçirir. Sonuç kısaltılarak 6 haneli bir sayıya dönüştürülür.",
        "İki taraf aynı anahtarı ve aynı saati kullandığı için aynı kodu bulur; siz kodu yazdığınızda sunucu kendi hesapladığıyla karşılaştırır. 30 saniyelik süre bir dengedir: kodu okuyup yazmanıza yetecek kadar uzun, ele geçirilen bir kodun işe yaramaması için yeterince kısadır. Telefonun saati birkaç dakika kaymışsa kodlar tutmayabilir; bu yüzden telefon saatinin otomatik ayarda olması önerilir."
      ],
      formula: "Zaman dilimi = Unix zamanı ÷ 30 (tam kısım)\nKod = özet(gizli anahtar, zaman dilimi) → son 6 hane\nÖrnek: 08:00:00 ile 08:00:29 arasında aynı kod, 08:00:30'da yeni kod",
      after: [
        "Kullanılan özet fonksiyonunun mantığını [[bilgi:hash-nedir-sha256-md5|hash (özet) nedir]] yazısında, Unix zamanının ne olduğunu ise [[bilgi:unix-zaman-damgasi-nedir|Unix zaman damgası]] yazısında anlatıyoruz."
      ]
    },
    {
      h: "2FA kurulurken taranan QR kod ne içerir?",
      p: [
        "Bir hesapta doğrulama uygulamasını etkinleştirdiğinizde ekranda bir QR kod belirir. Bu kod, uygulamanın okuyacağı bir metni içerir: hizmetin adı, hesap adınız, kod uzunluğu, süre ve en önemlisi <strong>gizli anahtar</strong>. Metin genellikle <code>otpauth://totp/</code> ile başlar ve gizli anahtar \"secret\" parametresinde Base32 biçiminde yazılıdır.",
        "Bu QR kodun ekran görüntüsü, hesabınızın ikinci anahtarının kopyası demektir. Kodu tarayan herkes sizinle aynı doğrulama kodlarını üretebilir. Bu yüzden kurulum ekranını kimseyle paylaşmayın, ekran görüntüsünü bulut klasörlerinde ya da sohbet uygulamalarında saklamayın. Kurulum ekranındaki QR kodun içeriğini kendi bilgisayarınızda görmek isterseniz [[arac:qr-kod-oku|QR Kod Oku]] aracı görüntüyü tarayıcıda çözer ve hiçbir yere göndermez."
      ]
    },
    {
      h: "Yedek kodlar nasıl saklanmalı?",
      p: [
        "2FA'yı açtığınızda hizmetlerin çoğu size 8–10 adet tek kullanımlık <strong>yedek kod</strong> verir. Bu kodlar, telefonunuz ya da anahtarınız yanınızda değilken hesaba girmenin yoludur. Her biri bir kez kullanılır ve kullanıldıktan sonra geçersiz olur."
      ],
      ul: [
        "<strong>Çevrim dışı saklayın:</strong> kodları yazdırıp ya da elle yazıp evde güvenli bir yerde tutun. Telefonunuzun içinde saklamak, telefon kaybolduğunda işe yaramaz.",
        "<strong>Parola yöneticisi kullanıyorsanız:</strong> kodları ilgili hesabın kaydına not olarak ekleyebilirsiniz; parola yöneticisinin kendi ana parolası ve 2FA'sı güçlü olmalıdır.",
        "<strong>Etiketleyin:</strong> hangi kodun hangi hesaba ait olduğunu ve oluşturulma tarihini yazın.",
        "<strong>Kullandıkça yenileyin:</strong> son birkaç kod kaldığında hesap ayarlarından yeni bir yedek kod seti oluşturun; eski set otomatik geçersiz olur.",
        "<strong>Paylaşmayın:</strong> yedek kodlar şifre kadar değerlidir; kimseyle, destek hattı dahil, paylaşılmamalıdır."
      ]
    },
    {
      h: "Telefon kaybolursa hesaba nasıl girilir?",
      ol: [
        "<strong>Yedek kodlardan birini kullanın.</strong> Giriş ekranında \"başka bir yöntem dene\" seçeneğini bulun ve kayıtlı yedek kodlardan birini girin.",
        "<strong>İkinci yöntemi deneyin.</strong> Hesaba önceden ikinci bir telefon, güvenlik anahtarı ya da yedek e-posta tanımladıysanız onunla giriş yapın.",
        "<strong>Girişten sonra eski cihazı kaldırın.</strong> Güvenlik ayarlarında kayıp telefonun oturumlarını kapatın ve doğrulama uygulamasını yeni telefona yeniden kurun.",
        "<strong>Hattınızı koruyun.</strong> SMS doğrulaması kullanıyorsanız operatörünüzden hattınızı geçici olarak kapattırın ve aynı numarayla yeni SIM kart alın.",
        "<strong>Hesap kurtarma sürecine başvurun.</strong> Hiçbir yedek yönteminiz yoksa hizmetin resmî kurtarma formunu kullanın; bu süreç kimlik doğrulaması gerektirir ve günler sürebilir."
      ],
      after: [
        "Bu adımların sorunsuz işlemesi, 2FA'yı açarken birden fazla yöntem tanımlamanıza ve yedek kodları saklamanıza bağlıdır. Yeni telefona geçerken doğrulama uygulamanızın hesapları aktarma özelliği varsa eski telefonu sıfırlamadan önce aktarımı tamamlayın. Telefonunuzdaki fotoğraf ve belgeleri korumak için düzenli yedek almanın yollarını [[bilgi:yedekleme-3-2-1-kurali-nedir|3-2-1 yedekleme kuralı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Donanım güvenlik anahtarı ve geçiş anahtarı nedir?",
      p: [
        "Donanım güvenlik anahtarı, USB'ye takılan ya da telefona yaklaştırılan küçük bir cihazdır. Girişte anahtara dokunduğunuzda cihaz, yalnızca kayıtlı olduğu sitenin gerçek adresine özel bir kriptografik imza üretir. Sahte bir sitede bu imza üretilmez; dolayısıyla kullanıcı fark etmese bile oltalama girişimi başarısız olur. Bu özellik, anahtarları en güçlü 2FA yöntemi yapar.",
        "Geçiş anahtarı (passkey) aynı teknolojinin telefon ya da bilgisayara yerleşik halidir. Şifre yerine cihazınızın kilidini (PIN, parmak izi, yüz) kullanarak giriş yaparsınız; gizli anahtar cihazdan çıkmaz. Hem anahtarlar hem geçiş anahtarları için en az iki tane tanımlamak, birinin kaybolması durumunda hesabın kilitlenmesini önler."
      ]
    },
    {
      h: "2FA güçlü şifrenin yerine geçer mi?",
      p: [
        "Hayır, ikisi birbirini tamamlar. 2FA şifreniz ele geçirildiğinde devreye giren bir emniyet kemeridir; ama zayıf ya da başka sitelerde de kullandığınız bir şifre, saldırganın birinci kapıdan kolayca geçmesine izin verir. Bu durumda tek engel ikinci adım kalır ve oltalama ya da SIM değiştirme gibi yöntemlerle o engel de aşılabilir.",
        "En iyi uygulama, her hesap için uzun ve benzersiz bir şifre ile 2FA'yı birlikte kullanmaktır. Rastgele şifre ya da kelimelerden oluşan uzun bir parola üretmek için [[arac:sifre-uret|Şifre Üretici]], mevcut şifrenizin dayanıklılığını görmek için [[arac:sifre-guc-test|Şifre Gücü Testi]] tarayıcıda çalışır; yazdığınız şifre hiçbir sunucuya gönderilmez."
      ],
      ul: [
        "Önce e-posta hesabınızda 2FA'yı açın; diğer hesapların şifre sıfırlama bağlantıları oraya gider.",
        "Ardından bankacılık, iş hesapları, bulut depolama ve sosyal medya hesaplarını sırayla koruyun.",
        "Kullanmadığınız eski hesapları kapatın; korumasız kalan bir hesap tüm zincirin zayıf halkası olabilir."
      ]
    }
  ],
  faq: [
    ["İki adımlı doğrulama nedir?", "İki adımlı doğrulama, hesaba girerken şifreye ek olarak telefon kodu, doğrulama uygulaması ya da güvenlik anahtarı gibi ikinci bir kanıt istenmesidir. Şifre çalınsa bile ikinci adım olmadan giriş yapılamaz."],
    ["SMS kodu ile doğrulama uygulaması arasındaki fark nedir?", "SMS kodu şebeke üzerinden gönderilir ve numaranızın başka bir SIM karta taşınmasıyla ele geçirilebilir. Doğrulama uygulaması kodu telefonun içinde, bağlantı olmadan üretir ve numara taşıma saldırısından etkilenmez."],
    ["TOTP kodları neden 30 saniyede değişir?", "Telefon ve sunucu aynı gizli anahtarla, geçerli zamanın 30 saniyelik dilim numarasından kod üretir. Bu süre kodu yazmaya yetecek kadar uzun, ele geçirilen bir kodun kısa sürede işe yaramaz hale gelmesi için yeterince kısadır."],
    ["2FA kurulurken taranan QR kod ne içerir?", "QR kod hizmet adını, hesap adını ve en önemlisi gizli anahtarı içerir. Bu görüntüyü tarayan herkes aynı kodları üretebileceği için kurulum ekranının görüntüsünü kimseyle paylaşmamak ve saklamamak gerekir."],
    ["Telefon kaybolursa hesaba nasıl girilir?", "Önce kayıtlı yedek kodlardan biri ya da önceden tanımladığınız ikinci yöntem kullanılır. Giriş yaptıktan sonra kayıp telefonun oturumları kapatılır ve doğrulama yeni cihaza kurulur; hiçbir yedek yoksa resmî kurtarma süreci gerekir."],
    ["Yedek kodlar nasıl saklanmalı?", "Yedek kodları yazdırıp çevrim dışı ve güvenli bir yerde saklayın, hangi hesaba ait olduklarını not edin. Telefonun içinde tutmak kayıp durumunda işe yaramaz; kodlar azaldığında yeni set oluşturun."],
    ["Donanım güvenlik anahtarı nedir?", "USB'ye takılan ya da telefona yaklaştırılan küçük bir cihazdır ve yalnızca kayıtlı sitenin gerçek adresi için imza üretir. Sahte sayfada çalışmadığı için oltalamaya karşı en dayanıklı 2FA yöntemidir."],
    ["2FA güçlü şifrenin yerine geçer mi?", "Geçmez. 2FA şifre ele geçirildiğinde devreye giren ek bir katmandır; zayıf ya da tekrar kullanılan şifre saldırgana birinci kapıyı açar. Her hesapta benzersiz uzun şifre ile 2FA birlikte kullanılmalıdır."],
    ["Biri telefonda doğrulama kodumu isterse ne yapmalıyım?", "Kodu kesinlikle paylaşmayın ve görüşmeyi sonlandırın. Bankalar ve kurumlar doğrulama kodunu telefonda, mesajda ya da e-postada istemez; kurumu kendiniz bilinen resmî numarasından arayarak durumu bildirin."]
  ],
  tools: ["sifre-uret", "sifre-guc-test", "qr-kod-oku"],
  related: ["oltalama-sahte-link-nasil-anlasilir", "hash-nedir-sha256-md5", "yedekleme-3-2-1-kurali-nedir", "https-ve-ssl-sertifikasi-nedir"]
};
