export default {
  slug: "uctan-uca-sifreleme-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Uçtan Uca Şifreleme Nedir? Mesajlar Nasıl Şifrelenir, Kim Okuyabilir",
  pageTitle: "Uçtan Uca Şifreleme Nedir? Kim Okuyabilir, Neyi Korur",
  description: "Uçtan uca şifrelemede mesajı yalnızca gönderen ve alıcının cihazı çözebilir; sunucu şifreli veriyi taşır. Simetrik-asimetrik fark, meta veri, yedek ve parola gücü.",
  keywords: ["uçtan uca şifreleme", "end to end encryption", "şifreli mesaj gönderme", "simetrik asimetrik şifreleme", "hash ile şifreleme farkı", "meta veri nedir", "güçlü parola", "açık anahtar şifreleme"],
  lead: "Uçtan uca şifreleme (E2EE), bir mesajın <strong>yalnızca gönderenin ve alıcının cihazında çözülebildiği</strong>, aradaki sunucuların ve ağların ise yalnızca okunamaz şifreli veriyi taşıdığı yöntemdir. Anahtarlar cihazlarda üretilir ve cihazdan çıkmaz; bu yüzden hizmeti veren şirket bile mesaj içeriğini göremez. Bu sayfada iletim şifrelemesiyle farkını, simetrik ve asimetrik şifrelemenin nasıl birlikte çalıştığını, hash'in şifreleme olmadığını, meta verilerin neden korunmadığını, yedeklerin durumunu ve parolanın güvenliğe etkisini savunma bakışıyla bulacaksınız.",
  kisaCevap: [
    "Uçtan uca şifrelemede çözme anahtarı yalnızca uç cihazlarda bulunur; sunucu mesajı iletir ama okuyamaz.",
    "İletim (aktarım) şifrelemesi yalnızca cihaz ile sunucu arasını korur; sunucu mesajı çözüp okuyabilir.",
    "Simetrik şifrelemede tek anahtar vardır; asimetrik şifrelemede açık anahtarla kilitlenen veri yalnızca gizli anahtarla açılır.",
    "Hash tek yönlüdür, geri çözülemez; şifreleme ise anahtarla geri çözülmek üzere tasarlanır.",
    "Kimin kiminle, ne zaman ve ne sıklıkla konuştuğu gibi meta veriler genellikle uçtan uca şifrelenmez.",
    "Uçtan uca şifreleme, cihazınız ele geçirilirse ya da yedekler şifresiz tutulursa koruma sağlamaz."
  ],
  figure: {
    alt: "Uçtan uca şifreleme ile iletim şifrelemesinin karşılaştırması: üstte mesaj gönderenin cihazında şifrelenip sunucudan şifreli geçiyor ve yalnızca alıcıda çözülüyor; altta sunucu mesajı çözüp yeniden şifreliyor, yani içeriği görebiliyor.",
    caption: "Fark, mesajın sunucuda açık hâle gelip gelmediğindedir. Uçtan uca şifrelemede sunucu yalnızca kilitli kutuyu taşır; iletim şifrelemesinde kutu sunucuda açılır ve yeniden kilitlenir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Mesaj sunucuda okunabiliyor mu?</text>
  <text x="20" y="66" class="b ok">Uçtan uca şifreleme</text>
  <rect x="20" y="78" width="170" height="80" rx="8" class="oks"/><text x="105" y="108" class="b mid">Gönderen</text><text x="105" y="132" class="sm mid">anahtar burada</text><text x="105" y="148" class="sm mid">şifreler</text>
  <rect x="275" y="78" width="170" height="80" rx="8" class="sf sb"/><text x="360" y="108" class="b mid">Sunucu</text><text x="360" y="132" class="sm mid">8f3a…c91e</text><text x="360" y="148" class="sm mid ok b">okuyamaz</text>
  <rect x="530" y="78" width="170" height="80" rx="8" class="oks"/><text x="615" y="108" class="b mid">Alıcı</text><text x="615" y="132" class="sm mid">anahtar burada</text><text x="615" y="148" class="sm mid">çözer</text>
  <line x1="192" y1="118" x2="262" y2="118" class="sok sw" fill="none"/><polygon points="262,110 274,118 262,126" class="ok"/>
  <line x1="447" y1="118" x2="517" y2="118" class="sok sw" fill="none"/><polygon points="517,110 529,118 517,126" class="ok"/>
  <text x="20" y="204" class="b dg">Yalnızca iletim şifrelemesi</text>
  <rect x="20" y="216" width="170" height="80" rx="8" class="sf sb"/><text x="105" y="246" class="b mid">Gönderen</text><text x="105" y="270" class="sm mid">bağlantıyı şifreler</text>
  <rect x="275" y="216" width="170" height="80" rx="8" class="dgs"/><text x="360" y="246" class="b mid">Sunucu</text><text x="360" y="270" class="sm mid">"Toplantı 15.00'te"</text><text x="360" y="286" class="sm mid dg b">açık görür</text>
  <rect x="530" y="216" width="170" height="80" rx="8" class="sf sb"/><text x="615" y="246" class="b mid">Alıcı</text><text x="615" y="270" class="sm mid">bağlantıyı çözer</text>
  <line x1="192" y1="256" x2="262" y2="256" class="sp sw" fill="none"/><polygon points="262,248 274,256 262,264" class="p"/>
  <line x1="447" y1="256" x2="517" y2="256" class="sp sw" fill="none"/><polygon points="517,248 529,256 517,264" class="p"/>
  <rect x="20" y="320" width="680" height="84" rx="8" class="ps"/>
  <text x="36" y="346" class="b">Her iki durumda da genellikle şifrelenmeyen meta veriler</text>
  <text x="36" y="372" class="sm">kim · kime · ne zaman · ne sıklıkla · hangi IP adresinden · mesajın yaklaşık boyutu</text>
  <text x="36" y="392" class="sm mu">İçerik gizli kalsa bile iletişim örüntüsü görülebilir.</text>
</svg>`
  },
  sections: [
    {
      h: "Uçtan uca şifreleme nedir?",
      p: [
        "Bir mesajlaşma ya da e-posta hizmetinde mesajınız telefonunuzdan çıkar, bir ya da birkaç sunucudan geçer ve alıcının cihazına ulaşır. <strong>Uçtan uca şifreleme</strong>, mesajın bu yolculuğun başında, yani sizin cihazınızda şifrelenmesi ve yalnızca sonunda, alıcının cihazında çözülmesi anlamına gelir. Aradaki hiçbir nokta mesajın açık hâlini görmez.",
        "Bu mümkün olur çünkü çözme anahtarı yalnızca uç cihazlarda üretilir ve saklanır. Hizmet sağlayıcının sunucusu şifreli veriyi bir posta kutusu gibi teslim alır ve iletir. Sunucu ele geçirilse, bir çalışan kötü niyetli davransa ya da veri yolda kopyalansa bile elde edilen şey anlamsız bir karakter dizisidir.",
        "Uçtan uca şifreleme bir ürün özelliği değil, bir mimari tercihtir. Bir hizmetin bu korumayı gerçekten sağlayıp sağlamadığı; anahtarların nerede üretildiğine, sunucunun anahtarlara erişimi olup olmadığına ve yedeklerin nasıl saklandığına bağlıdır."
      ]
    },
    {
      h: "Uçtan uca şifrelemede sunucu mesajı okuyabilir mi?",
      p: [
        "Doğru uygulanmış bir uçtan uca şifrelemede hayır. Sunucu yalnızca şifreli veriyi, hangi hesaptan hangi hesaba gittiğini ve teslim bilgisini görür. İçeriği çözmek için gereken gizli anahtar sunucuda bulunmaz.",
        "Bunu iletim şifrelemesiyle karıştırmamak gerekir. Bir web sitesine güvenli bağlantıyla (adres çubuğundaki kilit simgesi, HTTPS) bağlandığınızda veri yolda şifrelenir ama sunucuya ulaştığında çözülür. Sunucu içeriği okur, işler ve saklar. E-posta, bulut depolama ve sosyal medya hizmetlerinin çoğu bu modelle çalışır. Bu, yoldaki dinlemeye karşı korur ama hizmet sağlayıcıya karşı korumaz."
      ],
      table: {
        head: ["Özellik", "İletim şifrelemesi", "Uçtan uca şifreleme"],
        rows: [
          ["Şifrelendiği yer", "Cihaz ile sunucu arasında", "Gönderenin cihazında"],
          ["Çözüldüğü yer", "Sunucuda", "Yalnızca alıcının cihazında"],
          ["Sunucu içeriği görür mü?", "Evet", "Hayır"],
          ["Yoldaki dinlemeye karşı", "Korur", "Korur"],
          ["Sunucu ihlaline karşı", "Korumaz", "İçeriği korur"],
          ["Sunucuda arama, filtreleme", "Mümkün", "Mümkün değil ya da sınırlı"]
        ]
      },
      after: [
        "Güvenli bağlantıların hangi portları kullandığını merak ediyorsanız [[bilgi:port-numaralari-80-443-22|port numaraları rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Simetrik ve asimetrik şifreleme arasındaki fark",
      p: [
        "<strong>Simetrik şifrelemede</strong> şifrelemek ve çözmek için aynı anahtar kullanılır. Bir kasanın tek bir anahtarı olduğunu düşünün: anahtarı kimde varsa kasayı hem kilitler hem açar. Bu yöntem çok hızlıdır ve büyük verileri şifrelemek için idealdir. Sorunu, anahtarın karşı tarafa güvenle nasıl ulaştırılacağıdır.",
        "<strong>Asimetrik (açık anahtarlı) şifrelemede</strong> her kişinin birbirine matematiksel olarak bağlı iki anahtarı vardır. <em>Açık anahtar</em> herkesle paylaşılır ve yalnızca kilitlemeye yarar; <em>gizli anahtar</em> kişinin cihazından hiç çıkmaz ve kilidi açabilen tek anahtardır. Herkese açık bir posta kutusu gibidir: herkes içine mektup atabilir ama yalnızca anahtar sahibi açabilir."
      ],
      table: {
        head: ["Özellik", "Simetrik", "Asimetrik"],
        rows: [
          ["Anahtar sayısı", "Tek, ortak anahtar", "Açık ve gizli anahtar çifti"],
          ["Hız", "Çok hızlı", "Görece yavaş"],
          ["Ana sorun", "Anahtarı güvenle paylaşmak", "Açık anahtarın gerçekten karşı tarafa ait olduğunu doğrulamak"],
          ["Tipik kullanım", "Mesaj ve dosya içeriği", "Anahtar değişimi, dijital imza"]
        ]
      },
      after: [
        "Modern uçtan uca sistemler ikisini birlikte kullanır: asimetrik yöntemle iki cihaz, kimsenin araya girmeden öğrenemeyeceği ortak bir oturum anahtarı üzerinde anlaşır; mesajların kendisi ise bu anahtarla simetrik olarak şifrelenir. Birçok sistem anahtarları düzenli olarak yeniler; böylece bugünkü bir anahtar ele geçirilse bile geçmiş mesajlar çözülemez (ileri gizlilik).",
        "Klasik şifreleme yöntemlerinin mantığını görmek isterseniz [[bilgi:sezar-sifreleme-nedir|Sezar şifrelemesi rehberi]] ve [[arac:sifreli-mesaj|Şifreli Mesaj aracı]] iyi bir başlangıçtır. Ancak bu araçtaki Sezar, Vigenère ve Atbash gibi yöntemler eğitim ve eğlence içindir; birkaç saniyede kırılabilirler ve gerçek gizli bilgiyi korumak için kullanılmamalıdır."
      ]
    },
    {
      h: "Hash ile şifreleme aynı şey midir?",
      p: [
        "Hayır. Şifreleme <strong>geri döndürülebilir</strong> bir işlemdir: doğru anahtara sahip olan, şifreli veriden orijinal metni geri elde eder. Hash (özet) ise <strong>tek yönlüdür</strong>: herhangi bir uzunluktaki veriden sabit uzunlukta bir parmak izi üretir ve bu parmak izinden orijinal veri geri hesaplanamaz.",
        "Bu yüzden ikisi farklı işlere yarar. Şifreleme gizlilik sağlar; hash ise bütünlük kontrolü sağlar. Bir dosyanın değişip değişmediğini anlamak, parolaları veritabanında açık hâlde tutmadan doğrulamak ya da bir mesajın yolda bozulmadığını göstermek için hash kullanılır. [[arac:metin-sha256-hesapla|Metin SHA-256 Hesaplama aracıyla]] tek bir harf değiştiğinde özetin tamamen değiştiğini kendiniz görebilirsiniz. Ayrıntılar için [[bilgi:hash-nedir-sha256-md5|hash ve SHA-256 rehberine]] bakın.",
        "Benzer bir karışıklık Base64 için de yaşanır. Base64 bir şifreleme değil, kodlamadır; anahtarı yoktur ve herkes tarafından anında geri çevrilebilir. Konuyu [[bilgi:base64-nedir-ne-ise-yarar|Base64 rehberi]] açıklar."
      ]
    },
    {
      h: "Meta veriler de şifrelenir mi?",
      p: [
        "Genellikle hayır. Uçtan uca şifreleme mesajın <em>içeriğini</em> korur; ancak mesajın teslim edilebilmesi için sunucunun bazı bilgileri bilmesi gerekir: gönderen hesap, alıcı hesap, gönderim zamanı, mesajın yaklaşık boyutu ve bağlantının geldiği IP adresi. Bunlara <strong>meta veri</strong> denir.",
        "Meta veriler tek başına içerik kadar şey anlatabilir. Birinin her gece aynı saatte belirli bir kişiyle yazıştığı, bir hastanenin numarasını aradığı ya da bir grup sohbetine katıldığı içerik bilinmeden de görülebilir. Bazı sistemler meta veriyi azaltmak için ek teknikler kullanır, ancak bunu tamamen ortadan kaldırmak zordur. Gizlilik değerlendirmesi yaparken bir hizmetin hangi meta verileri ne kadar süre sakladığını da sormak gerekir."
      ]
    },
    {
      h: "Yedekler uçtan uca şifreli mi?",
      p: [
        "Bu, en sık gözden kaçan zayıf noktadır. Mesajlar yolda uçtan uca şifreli olabilir; ancak cihazınız sohbet geçmişini buluta yedekliyorsa, o yedeğin nasıl korunduğu ayrı bir sorudur. Yedek, hizmet sağlayıcının çözebileceği bir anahtarla şifrelenmişse, uçtan uca korumanın sağladığı güvence yedek üzerinden aşılabilir.",
        "Birçok sistem yedekler için ayrıca \"uçtan uca şifreli yedek\" seçeneği sunar; bu seçenekte yedek sizin belirlediğiniz bir parola ya da kurtarma anahtarıyla şifrelenir. Bu seçeneği açarsanız parolanızı kaybetmenin, yedeği de kalıcı olarak kaybetmek anlamına geldiğini unutmayın; kurtarma anahtarını güvenli bir yerde, çevrim dışı saklayın.",
        "Konuştuğunuz kişinin yedekleri de önemlidir: siz yedeğinizi şifreleseniz bile karşı tarafın şifresiz yedeği aynı sohbeti içerebilir."
      ]
    },
    {
      h: "Parolanın gücü şifrelemenin güvenliğini nasıl etkiler?",
      p: [
        "Şifreleme algoritmaları güçlü olsa da anahtar bir paroladan türetiliyorsa zincirin en zayıf halkası parola olur. Saldırgan algoritmayı kırmaya uğraşmaz; olası parolaları tek tek dener. Parola ne kadar tahmin edilemezse bu deneme o kadar uzun sürer. Tahmin edilemezliği ölçmenin yolu <strong>entropi</strong>dir ve bit cinsinden ifade edilir."
      ],
      formula: "Entropi (bit) = uzunluk × log₂(karakter havuzu)\n12 rastgele karakter, 94 sembollü havuz: 12 × log₂ 94 ≈ 78,7 bit\n4 rastgele kelime, 7.776 kelimelik liste: 4 × log₂ 7.776 ≈ 51,7 bit\n6 rastgele kelime: 6 × log₂ 7.776 ≈ 77,5 bit",
      after: [
        "Bu hesap yalnızca parola gerçekten rastgele seçildiğinde geçerlidir. \"Ankara2026!\" gibi bir parola uzun görünse de yaygın kalıplardan oluştuğu için gerçek entropisi çok düşüktür. Parolanızın tahmini gücünü [[arac:sifre-guc-test|Şifre Güç Testi aracıyla]] ölçebilir, rastgele karakterli ya da kelime tabanlı parolayı [[arac:sifre-uret|Şifre Üretici]] ile oluşturabilirsiniz; iki araç da parolayı tarayıcınızdan dışarı göndermez."
      ]
    },
    {
      h: "Şifreli bir mesaj parola ile nasıl güvenle paylaşılır?",
      ol: [
        "Mesajı ya da dosyayı güvenilir, açık standartlara dayanan bir şifreleme yöntemiyle şifreleyin; eğitim amaçlı klasik şifreleri gerçek gizli bilgi için kullanmayın.",
        "Uzun ve rastgele bir parola seçin; en az 12–16 karakter ya da 5–6 rastgele kelime.",
        "Şifreli içeriği ve parolayı <strong>farklı kanallardan</strong> gönderin; örneğin dosyayı e-postayla, parolayı telefonla sözlü olarak.",
        "Parolayı aynı mesajın altına yazmayın; bu, kilidi anahtarıyla birlikte göndermek demektir.",
        "Alıcının dosyayı açtığını teyit ettikten sonra paylaşılan parolayı başka hiçbir yerde kullanmayın.",
        "Uçtan uca şifreli bir sohbette karşı tarafın güvenlik kodunu (anahtar parmak izini) yüz yüze ya da güvenilir bir kanaldan bir kez karşılaştırın; bu, araya birinin girmediğini doğrular."
      ]
    },
    {
      h: "Uçtan uca şifrelemenin korumadığı durumlar",
      ul: [
        "<strong>Ele geçirilmiş cihaz:</strong> Telefonunuzda zararlı yazılım varsa, mesajlar ekranda çözüldükten sonra okunabilir. Güncellemeleri yapın, uygulamaları yalnızca resmî mağazalardan yükleyin.",
        "<strong>Kilitsiz ekran:</strong> Cihazına fiziksel erişimi olan biri sohbetleri doğrudan açabilir. Ekran kilidi ve biyometrik koruma kullanın.",
        "<strong>Ekran görüntüsü ve iletme:</strong> Alıcı mesajı başkasına iletebilir; şifreleme alıcının davranışını sınırlamaz.",
        "<strong>Sahte kişi:</strong> Bir dolandırıcı kendini tanıdığınız biri gibi tanıtıyorsa, kurduğunuz şifreli kanal doğrudan ona açılır. Para ya da kod isteyen mesajları başka bir kanaldan doğrulayın.",
        "<strong>Şifresiz yedek:</strong> Yukarıda anlatıldığı gibi bulut yedeği ayrı bir risk noktasıdır.",
        "<strong>Doğrulama kodlarını paylaşmak:</strong> Hesabınıza gelen tek kullanımlık kodu kimseyle paylaşmayın; hesap ele geçirilirse yeni mesajlar saldırgana gider."
      ]
    }
  ],
  faq: [
    ["Uçtan uca şifreleme nedir?", "Uçtan uca şifreleme, mesajın gönderenin cihazında şifrelenip yalnızca alıcının cihazında çözüldüğü yöntemdir. Çözme anahtarı yalnızca uç cihazlarda bulunduğu için aradaki sunucular ve ağlar yalnızca okunamaz şifreli veriyi taşır."],
    ["Uçtan uca şifrelemede sunucu mesajı okuyabilir mi?", "Doğru uygulanmış bir sistemde okuyamaz; sunucu yalnızca şifreli veriyi ve teslim için gereken bilgileri görür. Yalnızca iletim şifrelemesi kullanan hizmetlerde ise veri sunucuya ulaştığında çözülür ve hizmet sağlayıcı içeriği görebilir."],
    ["Simetrik ve asimetrik şifreleme arasındaki fark nedir?", "Simetrik şifrelemede tek bir ortak anahtar hem şifreler hem çözer ve çok hızlıdır. Asimetrik şifrelemede açık anahtar yalnızca kilitler, gizli anahtar yalnızca açar; modern sistemler anahtar değişimi için asimetrik, mesaj içeriği için simetrik yöntemi birlikte kullanır."],
    ["Hash ile şifreleme aynı şey midir?", "Hayır. Şifreleme doğru anahtarla geri çözülmek üzere tasarlanmıştır ve gizlilik sağlar. Hash ise tek yönlüdür, özetten orijinal veri geri hesaplanamaz; dosya bütünlüğünü kontrol etmek ve parolaları güvenle saklamak için kullanılır."],
    ["Şifreli bir mesaj parola ile nasıl paylaşılır?", "İçeriği güçlü bir yöntemle şifreleyin ve uzun, rastgele bir parola kullanın. Şifreli içeriği ve parolayı farklı kanallardan gönderin; örneğin dosyayı e-postayla, parolayı telefonda sözlü olarak iletin ve parolayı başka yerde tekrar kullanmayın."],
    ["Meta veriler de şifrelenir mi?", "Genellikle hayır. Kimin kime, ne zaman ve ne sıklıkla mesaj gönderdiği, IP adresi ve mesaj boyutu gibi bilgiler teslimat için sunucuda görünür kalır. İçerik gizli olsa bile bu bilgiler iletişim örüntüsü hakkında çok şey anlatabilir."],
    ["Parolanın gücü şifrelemenin güvenliğini nasıl etkiler?", "Anahtar bir paroladan türetiliyorsa saldırgan algoritmayı değil parolayı tahmin etmeye çalışır. Rastgele seçilmiş 12 karakterlik bir parola yaklaşık 78 bit entropi taşır; kalıplara dayanan parolalar ise uzun görünse de çok daha hızlı tahmin edilir."],
    ["Yedekler uçtan uca şifreli mi?", "Her zaman değil. Sohbet geçmişinin bulut yedeği, hizmet sağlayıcının çözebileceği bir anahtarla saklanıyorsa uçtan uca koruma yedek üzerinden aşılabilir. Varsa uçtan uca şifreli yedek seçeneğini açın ve kurtarma anahtarını çevrim dışı saklayın."],
    ["Uçtan uca şifreleme beni her şeye karşı korur mu?", "Hayır. Cihazınız zararlı yazılımla ele geçirilirse, ekran kilidi yoksa, karşı taraf mesajı iletirse ya da kendini tanıdığınız biri gibi tanıtan bir dolandırıcıyla yazışıyorsanız şifreleme bu riskleri ortadan kaldırmaz; cihaz güvenliği ve doğrulama da gerekir."]
  ],
  tools: ["sifreli-mesaj", "sifre-guc-test", "metin-sha256-hesapla", "sifre-uret"],
  related: ["hash-nedir-sha256-md5", "sezar-sifreleme-nedir", "base64-nedir-ne-ise-yarar"]
};
