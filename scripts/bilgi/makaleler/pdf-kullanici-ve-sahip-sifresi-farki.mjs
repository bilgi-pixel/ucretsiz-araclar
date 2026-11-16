export default {
  slug: "pdf-kullanici-ve-sahip-sifresi-farki",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF Kullanıcı ve Sahip Şifresi Farkı: Yazdırma ve Kopyalama Kısıtı",
  pageTitle: "PDF Kullanıcı ve Sahip Şifresi Farkı: Açma ve İzin Parolası",
  description: "Kullanıcı şifresi PDF'in açılmasını, sahip şifresi yazdırma ve kopyalama izinlerini korur. AES-256, şifreli PDF birleştirme ve parolasını bildiğiniz PDF.",
  keywords: ["pdf sahip şifresi", "pdf kullanıcı şifresi", "pdf yazdırma kısıtlaması", "pdf kopyalama engeli", "şifreli pdf nasıl açılır", "pdf izin şifresi", "pdf şifresini kaldırma", "aes-256 pdf"],
  lead: "PDF'te kullanıcı şifresi (açma parolası) belgenin açılmasını engeller ve içeriği şifreler; sahip şifresi (izin parolası) ise belge açıldıktan sonra yazdırma, kopyalama ve düzenleme gibi işlemleri kısıtlar. Bir belgede ikisi birlikte de, yalnızca biri de bulunabilir. Gerçek gizlilik açma parolasıyla sağlanır; izin kısıtları belgenin nasıl kullanılacağını düzenler. Bu sayfada iki parolanın farkını, yazdırılamayan PDF'in nedenini, AES şifreleme seviyelerini ve parolasını bildiğiniz bir PDF'ten korumanın nasıl kaldırılacağını anlatıyoruz.",
  kisaCevap: [
    "Kullanıcı (açma) şifresi: parolayı bilmeyen kişi belgeyi hiç açamaz; içerik şifrelenmiş olarak saklanır.",
    "Sahip (izin) şifresi: belge parolasız açılır ama yazdırma, kopyalama, düzenleme ve form doldurma gibi izinler kısıtlanabilir.",
    "Belge açılıyor ama yazdırılamıyorsa büyük olasılıkla yalnızca sahip şifresiyle konmuş bir izin kısıtı vardır.",
    "Güncel PDF'lerde önerilen şifreleme AES-256'dır; eski RC4 tabanlı şifreleme bugün zayıf kabul edilir.",
    "Yalnızca parolasını bildiğiniz ya da sahibinin izin verdiği belgelerde korumayı kaldırın; başkasının korumasını izinsiz aşmak hukuki sorumluluk doğurabilir."
  ],
  figure: {
    alt: "İki kapılı şema: birinci kapı kullanıcı şifresi, belgeyi açmayı korur. İkinci kapı sahip şifresi, açılmış belgede yazdırma, kopyalama, düzenleme ve form doldurma izinlerini korur.",
    caption: "Kullanıcı şifresi dış kapıdır: geçemeyen içeriği göremez. Sahip şifresi iç kapıdır: belgeyi okuyan kişinin hangi işlemleri yapabileceğini belirler.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Bir PDF'te iki ayrı parola</text>
  <rect x="20" y="70" width="130" height="150" rx="8" class="sf sb"/>
  <text x="85" y="132" class="b mid">Kişi</text>
  <text x="85" y="154" class="sm mid t2">belgeyi açmak</text>
  <text x="85" y="172" class="sm mid t2">istiyor</text>
  <line x1="150" y1="145" x2="196" y2="145" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="200" y="60" width="150" height="170" rx="8" class="p"/>
  <text x="275" y="92" class="b mid sf">1. kapı</text>
  <text x="275" y="118" class="b mid sf">Kullanıcı şifresi</text>
  <text x="275" y="142" class="sm mid sf">açma parolası</text>
  <text x="275" y="172" class="sm mid sf">Yanlışsa: belge</text>
  <text x="275" y="190" class="sm mid sf">hiç açılmaz</text>
  <text x="275" y="214" class="sm mid sf">içerik şifreli</text>
  <line x1="350" y1="145" x2="396" y2="145" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="400" y="60" width="300" height="170" rx="8" class="ps"/>
  <text x="550" y="88" class="b mid">2. kapı: Sahip şifresi (izinler)</text>
  <rect x="418" y="104" width="128" height="50" rx="6" class="sf sb"/><text x="482" y="134" class="b mid">Yazdırma</text>
  <rect x="556" y="104" width="128" height="50" rx="6" class="sf sb"/><text x="620" y="134" class="b mid">Kopyalama</text>
  <rect x="418" y="164" width="128" height="50" rx="6" class="sf sb"/><text x="482" y="194" class="b mid">Düzenleme</text>
  <rect x="556" y="164" width="128" height="50" rx="6" class="sf sb"/><text x="620" y="194" class="b mid">Form doldurma</text>
  <rect x="20" y="256" width="330" height="128" rx="8" class="sf sb"/>
  <text x="36" y="282" class="b">Yalnızca sahip şifresi varsa</text>
  <text x="36" y="308" class="sm">Belge parolasız açılır, okunur.</text>
  <text x="36" y="330" class="sm">Yazdır / kopyala düğmeleri soluk görünür.</text>
  <text x="36" y="352" class="sm">Belirti: \"yazdıramıyorum\".</text>
  <text x="36" y="374" class="sm t2">Gizlilik sağlamaz, kullanımı düzenler.</text>
  <rect x="370" y="256" width="330" height="128" rx="8" class="oks"/>
  <text x="386" y="282" class="b">Önerilen ayar</text>
  <text x="386" y="308" class="sm">Gizli belge: güçlü açma parolası</text>
  <text x="386" y="330" class="sm">Şifreleme: AES-256</text>
  <text x="386" y="352" class="sm">İki parola birbirinden farklı olsun</text>
  <text x="386" y="374" class="sm">Parolayı ayrı kanaldan iletin</text>
</svg>`
  },
  sections: [
    {
      h: "PDF'te iki parola neden var?",
      p: [
        "PDF standardı, bir belgeyi korumak için birbirinden bağımsız iki parola tanımlar. Bunun nedeni, belge sahiplerinin iki farklı ihtiyacının olmasıdır. Bazen belgenin içeriğini yalnızca belirli kişilerin görmesi gerekir: maaş bordrosu, sağlık raporu ya da teklif dosyası gibi. Bazen ise içerik herkese açık olabilir ama belgenin nasıl kullanılacağı düzenlenmek istenir: örneğin bir kılavuzun değiştirilmeden dağıtılması ya da bir formun yalnızca doldurulabilmesi.",
        "Birinci ihtiyacı <strong>kullanıcı şifresi</strong>, ikincisini <strong>sahip şifresi</strong> karşılar. İkisi aynı belgede birlikte kullanılabilir. Bu durumda kullanıcı parolasıyla belgeyi açan kişi, sahip şifresiyle belirlenmiş kısıtlara tabi olur; sahip parolasını bilen kişi ise belgeyi tüm izinlerle açar ve kısıtları değiştirebilir."
      ],
      table: {
        head: ["Özellik", "Kullanıcı (açma) şifresi", "Sahip (izin) şifresi"],
        rows: [
          ["Diğer adları", "Açma parolası, belge açma şifresi", "İzin parolası, yönetici parolası"],
          ["Ne korur?", "Belgenin açılmasını ve içeriği", "Yazdırma, kopyalama, düzenleme gibi işlemleri"],
          ["Parola bilinmezse", "Belge hiç görüntülenemez", "Belge okunur ama bazı işlemler yapılamaz"],
          ["Gizlilik sağlar mı?", "Evet, içerik şifrelenir", "Tek başına sağlamaz"],
          ["Tipik kullanım", "Bordro, rapor, kişisel veri içeren belge", "Kılavuz, katalog, form, yayın"]
        ]
      }
    },
    {
      h: "Kullanıcı şifresi nasıl çalışır?",
      p: [
        "Kullanıcı şifresi tanımlanmış bir PDF'te belgenin içeriği, parolanın türetildiği bir anahtarla şifrelenir. Okuma programı belgeyi açarken parolayı sorar, girilen paroladan anahtarı hesaplar ve içeriği çözer. Parola yanlışsa anahtar da yanlış olur ve sayfalar görüntülenemez. Bu yüzden kullanıcı şifresi, PDF'teki gerçek gizlilik katmanıdır.",
        "Bu korumanın gücü iki şeye bağlıdır: kullanılan şifreleme algoritmasına ve parolanın kendisine. Güncel bir algoritma seçilse bile \"123456\" ya da doğum tarihi gibi tahmin edilebilir bir parola korumayı zayıflatır. Hassas belgeler için uzun, rastgele bir parola seçmek ve bunu belgeyle aynı e-postada değil, telefon ya da mesaj gibi ayrı bir kanaldan iletmek en doğru yoldur. Güçlü parola üretmek için [[arac:sifre-uret|Şifre Üretici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sahip şifresi ve izin kısıtları",
      p: [
        "Sahip şifresi, belge açıldıktan sonra hangi işlemlerin yapılabileceğini belirler. PDF standardında tanımlı başlıca izinler şunlardır:"
      ],
      ul: [
        "<strong>Yazdırma:</strong> tamamen kapalı, yalnızca düşük çözünürlükte ya da tam kalitede izinli olabilir.",
        "<strong>İçerik kopyalama:</strong> metin ve görsellerin seçilip başka yere yapıştırılması.",
        "<strong>Belgeyi değiştirme:</strong> sayfa ekleme, silme, döndürme ve içerik düzenleme.",
        "<strong>Yorum ve not ekleme:</strong> belge üzerine açıklama, vurgu ve not koyma.",
        "<strong>Form doldurma ve imzalama:</strong> mevcut form alanlarını doldurma izni; belge değiştirilemese bile form doldurmaya izin verilebilir.",
        "<strong>Erişilebilirlik için içerik çıkarma:</strong> ekran okuyucuların metni okuyabilmesi."
      ],
      after: [
        "İzin kısıtları, belgeyi açan programın bu izinlere uymasıyla işler; içerik yalnızca sahip şifresiyle korunuyorsa belge herkes tarafından okunabilir durumdadır. Bu nedenle sahip şifresi bir gizlilik aracı değil, kullanım kuralıdır. İçeriği gerçekten gizli tutmanız gerekiyorsa mutlaka açma parolası da ekleyin."
      ]
    },
    {
      h: "PDF yazdırılamıyorsa sebep nedir? Metin kopyalama kısıtı nasıl uygulanır?",
      p: [
        "Bir PDF parola sormadan açılıyor ama yazdır düğmesi soluk görünüyor ya da metin seçilemiyorsa, belgede büyük olasılıkla sahip şifresiyle konmuş bir izin kısıtı vardır. Okuma programlarının çoğu bu durumu belge özelliklerinde ya da başlık çubuğunda \"güvenli\" veya \"kısıtlı\" ibaresiyle gösterir. Belge özelliklerinin güvenlik bölümünde hangi işlemlere izin verildiği tek tek listelenir.",
        "Yazdırmanın başka nedenleri de olabilir: yazıcı sürücüsü sorunu, çok büyük boyutlu sayfalar ya da taranmış belgelerde aşırı yüksek çözünürlük. Kopyalama yapılamıyorsa ve belgede izin kısıtı yoksa, belge taranmış bir görüntü olabilir; bu durum [[bilgi:pdf-word-e-cevirince-duzen-neden-bozulur|PDF'te metin neden seçilemiyor]] yazısında anlatılır."
      ],
      ol: [
        "Kendi belgenize kısıt koymak için [[arac:pdf-sifre-ekle|PDF Şifre Ekle]] aracında dosyanızı seçin.",
        "Belgenin açılması da korunacaksa açma parolası girin; yalnızca kullanım kısıtlanacaksa bu alanı boş bırakın.",
        "Sahip parolasını girin ve açma parolasından farklı bir parola seçin.",
        "Yazdırma, kopyalama ve düzenleme izinlerinden kapatmak istediklerinizi işaretleyin.",
        "Şifrelenmiş kopyayı indirin ve bir okuma programında açarak kısıtların beklendiği gibi göründüğünü kontrol edin."
      ]
    },
    {
      h: "AES-128 ve AES-256 şifreleme farkı",
      p: [
        "PDF şifrelemesi yıllar içinde güçlendi. İlk sürümlerde kullanılan RC4 tabanlı şifreleme, özellikle 40 bitlik anahtarla bugün zayıf kabul edilir. Daha sonra AES (Gelişmiş Şifreleme Standardı) eklendi: önce 128 bitlik, ardından 256 bitlik anahtar uzunluğu desteklendi. Güncel PDF standardı AES-256'yı önerilen yöntem olarak kabul eder."
      ],
      table: {
        head: ["Yöntem", "Anahtar uzunluğu", "Bugünkü durum"],
        rows: [
          ["RC4 40 bit", "40 bit", "Zayıf; kullanılmamalı"],
          ["RC4 128 bit", "128 bit", "Eski; önerilmez"],
          ["AES-128", "128 bit", "Güvenli kabul edilir, eski okuyucularla uyumlu"],
          ["AES-256", "256 bit", "Güncel öneri; çok eski programlarda açılmayabilir"]
        ]
      },
      after: [
        "Pratikte iki AES seviyesinin de iyi bir parolayla birlikte güçlü koruma sağladığını söylemek mümkündür; asıl zayıf halka çoğu zaman paroladır. AES-256'nın tek dezavantajı, çok eski PDF okuyucularının bu belgeleri açamamasıdır. Belgeyi alacak kişilerin güncel bir okuyucu kullandığından emin değilseniz AES-128 uyumluluk açısından güvenli bir orta yoldur. Şifrelemenin genel mantığını [[bilgi:uctan-uca-sifreleme-nedir|uçtan uca şifreleme]] yazısında daha geniş ele alıyoruz."
      ]
    },
    {
      h: "Şifresini bildiğim PDF'ten şifre nasıl kaldırılır?",
      p: [
        "Bir belgeyi her açışınızda parola yazmak istemiyorsanız ya da belgeyi başka bir işlemden geçirmeniz gerekiyorsa korumayı kaldırabilirsiniz. Bunun meşru yolu, parolayı bildiğiniz belgede parolayı girerek korumasız bir kopya oluşturmaktır. Özgün şifreli dosya olduğu gibi kalır; yeni kopyayı nerede saklayacağınıza dikkat edin, çünkü artık korumasızdır."
      ],
      ol: [
        "[[arac:pdf-sifre-kaldir|PDF Şifre Kaldır]] aracını açın ve şifreli dosyayı seçin.",
        "Belgenin parolasını yazın; parolanın doğru olması gerekir.",
        "\"Şifreyi kaldır\" ile korumasız kopyayı oluşturun ve indirin.",
        "Kopyayı açıp sayfaların, form alanlarının ve imzaların beklendiği gibi göründüğünü kontrol edin."
      ],
      after: [
        "Belgeyi yalnızca okumanız gerekiyorsa korumayı kaldırmanıza gerek yoktur; [[arac:pdf-ac|PDF Aç]] aracı şifreli PDF'leri parolanızla tarayıcıda görüntüler. Araçlar tarayıcıda çalıştığı için ne dosyanız ne de parolanız bir sunucuya gönderilir.",
        "Parolasını unuttuğunuz kendi belgeniz için en doğru yol, belgeyi oluşturan kişi ya da kurumdan yeni bir kopya istemektir. Bankalar ve kurumlar genellikle hesap ekstresi gibi belgeleri yeniden gönderebilir ya da parolanın nasıl oluşturulduğunu e-posta veya mesajda belirtir."
      ]
    },
    {
      h: "Banka ve kurum PDF'leri neden şifreli gelir?",
      p: [
        "Bankalar, sigorta şirketleri ve bazı kurumlar e-posta ile gönderdikleri ekstre, poliçe ve bilgilendirme belgelerini açma parolasıyla korur. E-posta kolayca yanlış kişiye iletilebilir ya da ele geçirilebilir; açma parolası, belgenin yalnızca sahibi tarafından açılmasını sağlayan ek bir katmandır. Parolanın nasıl oluşturulduğu genellikle gönderen kurum tarafından mesajda açıklanır.",
        "Kamu kurumlarının çevrim içi verdiği belgelerde ise öne çıkan koruma çoğu zaman şifre değil, belgenin değiştirilmediğini gösteren doğrulama mekanizmalarıdır: barkod, doğrulama kodu ya da elektronik imza. Bu belgelerde izin kısıtı bulunabilir; amaç içeriğin değiştirilerek sahte belge üretilmesini zorlaştırmaktır. Böyle bir belgenin geçerliliğini, üzerindeki doğrulama koduyla ilgili kurumun sisteminden kontrol etmek en güvenilir yoldur. Elektronik imzanın hukuki niteliği için [[bilgi:islak-imza-ve-e-imza-farki|ıslak imza ve e-imza farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Şifreli PDF birleştirilebilir mi?",
      p: [
        "Açma parolası olan bir PDF, parola girilmeden başka belgelerle birleştirilemez; çünkü içerik şifrelidir ve okunamaz. Parolasını bildiğiniz belgeyi önce korumasız hale getirip ardından [[arac:pdf-birlestir|PDF Birleştir]] aracıyla diğer dosyalarla birleştirebilirsiniz. Birleştirilmiş belgeyi yeniden korumak istiyorsanız son adımda yeni bir parola ekleyin.",
        "Yalnızca sahip şifresi olan bir belgede de \"belgeyi değiştirme\" izni kapalıysa birleştirme, sayfa silme ya da döndürme gibi işlemler bu kısıta takılır. Böyle bir belge size aitse kısıtı sahip parolasıyla kaldırabilir, değilse belge sahibinden düzenlenebilir bir kopya isteyebilirsiniz."
      ]
    },
    {
      h: "Şifresi bilinmeyen PDF'i açmak yasal mı?",
      p: [
        "Bir PDF'in korumasını, sahibinin izni olmadan ve parolayı bilmeden aşmaya çalışmak hukuki açıdan risklidir. Belgede kişisel veriler varsa kişisel verilerin korunmasına ilişkin kurallar, telifli bir yayınsa fikir ve sanat eserleri mevzuatı, bir sisteme izinsiz erişim söz konusuysa bilişim suçlarına ilişkin hükümler gündeme gelebilir. Belgenin size gönderilmiş olması, korumasını aşma yetkisi verdiği anlamına gelmez.",
        "Meşru yol her zaman aynıdır: parolayı belgenin sahibinden ya da gönderen kurumdan istemek. Bu sitedeki araçlar bu ilkeye göre tasarlanmıştır; parolasını bildiğiniz belgeler için çalışır ve bilinmeyen bir parolayı bulmaya yönelik hiçbir işlem yapmaz."
      ],
      note: "Bu bölüm genel bilgilendirme amaçlıdır, hukuki görüş değildir. Somut bir durumda bir hukukçuya danışın."
    }
  ],
  faq: [
    ["PDF'te kullanıcı (açma) şifresi ile sahip (izin) şifresi farkı nedir?", "Kullanıcı şifresi belgenin açılmasını engeller ve içeriği şifreler. Sahip şifresi ise belge açıldıktan sonra yazdırma, kopyalama ve düzenleme gibi işlemleri kısıtlar; tek başına içeriği gizli tutmaz."],
    ["PDF yazdırılamıyorsa sebep nedir?", "Belge parola sormadan açılıyorsa büyük olasılıkla sahip şifresiyle yazdırma izni kapatılmıştır. Belge özelliklerindeki güvenlik bölümünden izinleri görebilirsiniz; yazıcı sürücüsü ve çok büyük sayfa boyutu da yazdırmayı engelleyebilir."],
    ["Metin kopyalama kısıtı nasıl uygulanır?", "Belgeye bir sahip şifresi tanımlanır ve izinler arasında içerik kopyalama kapatılır. Kısıt, belgeyi açan okuma programının bu izne uymasıyla işler; içeriği gerçekten gizlemek için ayrıca açma parolası gerekir."],
    ["Şifresini bildiğim PDF'ten şifre nasıl kaldırılır?", "Şifre kaldırma aracına dosyayı ve bildiğiniz parolayı girerek korumasız bir kopya oluşturursunuz. Özgün şifreli dosya değişmez; yeni kopya korumasız olduğu için onu güvenli bir yerde saklamanız gerekir."],
    ["AES-128 ve AES-256 şifreleme farkı nedir?", "İkisi de AES algoritmasını kullanır; fark anahtar uzunluğundadır. AES-256 güncel öneridir, AES-128 ise eski okuyucularla daha uyumludur. İkisinde de korumanın gücü büyük ölçüde parolanın uzunluğuna ve tahmin edilemezliğine bağlıdır."],
    ["Banka ve e-Devlet PDF'leri neden şifreli gelir?", "Bankalar e-postayla gönderdikleri ekstreleri yanlış kişinin açmasını önlemek için açma parolasıyla korur. Kamu belgelerinde ise öne çıkan koruma çoğu zaman barkod, doğrulama kodu ve değişikliği zorlaştıran izin kısıtlarıdır."],
    ["Şifreli PDF birleştirilebilir mi?", "Açma parolası olan belge parola girilmeden okunamadığı için birleştirilemez. Parolasını bildiğiniz belgenin korumasını kaldırıp birleştirebilir, ardından birleşik belgeye yeniden parola ekleyebilirsiniz."],
    ["Şifresi bilinmeyen PDF'i açmak yasal mı?", "Sahibinin izni olmadan bir belgenin korumasını aşmaya çalışmak kişisel veri, telif ve bilişim mevzuatı açısından hukuki sorumluluk doğurabilir. Doğru yol parolayı belgenin sahibinden ya da gönderen kurumdan istemektir."],
    ["Parolamı unuttuğum kendi PDF'imi ne yapmalıyım?", "Belgeyi oluşturan kişi ya da kurumdan yeni bir kopya isteyin; bankalar ve kurumlar genellikle belgeyi yeniden gönderebilir. Kendi oluşturduğunuz belgelerde özgün kaynak dosyadan yeniden PDF almak en hızlı çözümdür."]
  ],
  tools: ["pdf-sifre-ekle", "pdf-sifre-kaldir", "pdf-ac", "pdf-birlestir", "sifre-uret"],
  related: ["pdf-word-e-cevirince-duzen-neden-bozulur", "uctan-uca-sifreleme-nedir", "islak-imza-ve-e-imza-farki"],
  uyari: "hukuki görüş değildir, somut durumunuz için bir hukukçuya danışın"
};
