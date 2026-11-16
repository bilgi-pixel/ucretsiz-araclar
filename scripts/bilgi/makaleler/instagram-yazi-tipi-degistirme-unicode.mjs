export default {
  slug: "instagram-yazi-tipi-degistirme-unicode",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Instagram'da Farklı Yazı Tipi Nasıl Yapılır? Süslü Unicode Yazı Stilleri",
  pageTitle: "Instagram Yazı Tipi Değiştirme: Süslü Unicode Yazı Stilleri",
  description: "Instagram'daki süslü yazılar font değil, Unicode'daki matematik harfleridir. Nasıl yapılır, Türkçe harfler neden bozulur, ekran okuyucu ve arama sorunları.",
  keywords: ["instagram yazı tipi değiştirme", "havalı yazı", "süslü yazı", "instagram biyo yazı stili", "unicode yazı", "kalın yazı instagram", "italik yazı whatsapp", "ekran okuyucu süslü yazı"],
  lead: "Instagram'da farklı yazı tipi kullanmanın yolu, metni bir <strong>süslü yazı üreticisinde</strong> Unicode'daki kalın, italik, el yazısı gibi özel harf karakterlerine çevirip biyografiye, isme ya da açıklamaya yapıştırmaktır. Uygulama gerçek anlamda font değiştirmeye izin vermez; gördüğünüz şey aslında matematik formülleri için tanımlanmış ayrı karakterlerdir. Bu yüzden Türkçe ç, ğ, ı, ş harfleri çoğu stilde dönüşmez, ekran okuyucular metni okuyamayabilir ve arama sonuçlarında bulunmanız zorlaşabilir. Bu sayfada yöntemi, sınırlarını ve erişilebilir kullanım kurallarını bulacaksınız.",
  kisaCevap: [
    "Süslü yazılar font değil, Unicode'daki \"Matematiksel Alfanümerik Semboller\" bloğundaki ayrı karakterlerdir (U+1D400–U+1D7FF).",
    "Normal A harfinin kodu U+0041, kalın 𝐀 harfinin kodu U+1D400'dür; uygulama bunları iki farklı karakter olarak görür.",
    "Bu blokta yalnızca İngiliz alfabesinin 26 harfi ve rakamlar bulunur; ç, ğ, ı, ö, ş, ü çoğu stilde normal kalır.",
    "Ekran okuyucular süslü harfleri atlayabilir ya da tek tek \"matematiksel kalın büyük H\" diye okuyabilir; önemli bilgiyi düz yazın.",
    "WhatsApp'ta kalın için *metin*, italik için _metin_, üstü çizili için ~metin~ yazılır; bu gerçek biçimlendirmedir, Unicode hilesi değildir."
  ],
  figure: {
    alt: "Aynı A harfinin Unicode'daki farklı karakterleri: normal A U+0041, kalın U+1D400, italik U+1D434, el yazısı U+1D49C. Altında ekran okuyucunun süslü bir kelimeyi harf harf okuması.",
    caption: "Her süslü stil ayrı bir kod noktasıdır. Gözünüz aynı harfi görür, ama yazılım bunları farklı karakter sayar; ekran okuyucu ve arama bu yüzden zorlanır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Bir harf, dört ayrı Unicode karakteri</text>
  <rect x="20" y="56" width="160" height="96" rx="10" class="p"/>
  <text x="100" y="92" class="b lg mid sf">Normal A</text>
  <text x="100" y="122" class="mid sf">U+0041</text>
  <text x="100" y="142" class="sm mid sf">her yerde aranır</text>
  <rect x="196" y="56" width="160" height="96" rx="10" class="sf sb"/>
  <text x="276" y="92" class="b lg mid">Kalın</text>
  <text x="276" y="122" class="mid p b">U+1D400</text>
  <text x="276" y="142" class="sm mid mu">matematik bloğu</text>
  <rect x="372" y="56" width="160" height="96" rx="10" class="sf sb"/>
  <text x="452" y="92" class="b lg mid">İtalik</text>
  <text x="452" y="122" class="mid p b">U+1D434</text>
  <text x="452" y="142" class="sm mid mu">matematik bloğu</text>
  <rect x="548" y="56" width="152" height="96" rx="10" class="sf sb"/>
  <text x="624" y="92" class="b lg mid">El yazısı</text>
  <text x="624" y="122" class="mid p b">U+1D49C</text>
  <text x="624" y="142" class="sm mid mu">matematik bloğu</text>
  <text x="20" y="190" class="b">Türkçe harflerin karşılığı yok</text>
  <rect x="20" y="202" width="330" height="44" rx="8" class="dgs"/>
  <text x="185" y="230" class="mid">ç ğ ı ö ş ü → normal kalır, karışık görünür</text>
  <text x="370" y="190" class="b">Ekran okuyucu ne duyurur?</text>
  <rect x="370" y="202" width="330" height="44" rx="8" class="dgs"/>
  <text x="535" y="230" class="sm mid">\"matematiksel kalın büyük S, ... küçük e ...\"</text>
  <line x1="20" y1="270" x2="700" y2="270" class="sb dash" fill="none"/>
  <text x="20" y="300" class="b">Güvenli kullanım</text>
  <rect x="20" y="314" width="215" height="66" rx="8" class="oks"/>
  <text x="128" y="342" class="mid b">Adınızı düz yazın</text>
  <text x="128" y="364" class="sm mid">aramada bulunursunuz</text>
  <rect x="252" y="314" width="215" height="66" rx="8" class="oks"/>
  <text x="360" y="342" class="mid b">Süsü tek kelimede</text>
  <text x="360" y="364" class="sm mid">tüm cümlede değil</text>
  <rect x="484" y="314" width="216" height="66" rx="8" class="oks"/>
  <text x="592" y="342" class="mid b">Bilgi düz metinde</text>
  <text x="592" y="364" class="sm mid">telefon, adres, fiyat</text>
</svg>`
  },
  sections: [
    {
      h: "Instagram'da farklı yazı tipi nasıl kullanılır?",
      p: [
        "Instagram biyografi, ad ve gönderi açıklaması alanlarında yazı tipi seçmenize izin vermez; uygulama her metni kendi yazı tipiyle gösterir. Profillerde gördüğünüz kalın, el yazısı ya da daire içindeki harfler, kullanıcının bir üreticide hazırlayıp kopyaladığı özel karakterlerdir. Yöntem üç adımdan oluşur ve herhangi bir uygulama kurmanız gerekmez.",
        "Önce [[arac:yazi-stili|Süslü Yazı ve Unicode Yazı Stilleri]] aracına metninizi yazın; araç aynı metni kalın, italik, el yazısı, fraktur, çift çizgili, daire içinde ve üstü çizili gibi onlarca stilde gösterir. Beğendiğiniz satırı kopyalayın, Instagram'da profili düzenle ekranında ilgili alana yapıştırın ve kaydetmeden önce önizlemeye bakın. Bazı stiller bazı telefonlarda kutu ya da soru işareti olarak görünebilir; paylaşmadan önce farklı bir cihazda kontrol etmek iyi fikirdir."
      ]
    },
    {
      h: "Süslü yazılar aslında font mu, Unicode karakter mi?",
      p: [
        "Bunlar font değil, karakterdir. Unicode standardı dünyadaki tüm yazı sistemlerine birer numara (kod noktası) verir. Matematikçiler formüllerde kalın, italik ya da el yazısı harfleri farklı anlamlarda kullandığı için Unicode bu harflere ayrı numaralar ayırmıştır. Bu bölüm \"Matematiksel Alfanümerik Semboller\" adını taşır ve U+1D400 ile U+1D7FF arasındadır.",
        "Sonuç olarak normal A (U+0041) ile kalın 𝐀 (U+1D400) yazılım için tamamen farklı iki karakterdir; tıpkı A ile Б'nin farklı olması gibi. Süslü yazı üreticileri yalnızca bir harf tablosu kullanarak her harfi karşılığıyla değiştirir. Daire içindeki harfler (Ⓐ, U+24B6), tam genişlikte harfler (Ａ, U+FF21) ve küçük büyük harfler (ᴀ, fonetik bloğu) da benzer şekilde farklı bloklardan alınır. Unicode ile ASCII ve UTF-8 ilişkisini merak ediyorsanız [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] makalesine bakabilirsiniz."
      ],
      table: {
        head: ["Stil", "A harfinin kodu", "Nereden gelir", "Türkçe harf desteği"],
        rows: [
          ["Kalın (serif)", "U+1D400", "Matematik bloğu", "Yok"],
          ["İtalik", "U+1D434", "Matematik bloğu", "Yalnızca noktasız ı (U+1D6A4)"],
          ["El yazısı (script)", "U+1D49C", "Matematik bloğu, bazı harfler başka bloktan", "Yok"],
          ["Fraktur (gotik)", "U+1D504", "Matematik bloğu", "Yok"],
          ["Çift çizgili", "U+1D538", "Matematik bloğu", "Yok"],
          ["Daire içinde", "U+24B6", "Çevrili alfanümerikler", "Yok"],
          ["Üstü çizili", "harf + U+0336", "Birleşen işaret", "Var, her harfe uygulanır"]
        ],
        caption: "Üstü çizili ve altı çizili stiller harfi değiştirmez, her harfin arkasına birleşen bir çizgi işareti ekler; bu yüzden Türkçe harflerle de çalışır."
      }
    },
    {
      h: "Biyografide kalın ve italik yazı nasıl yapılır?",
      ol: [
        "Kalın ya da italik görünmesini istediğiniz kısmı ayrı yazın; tüm biyografiyi değil, yalnızca başlık niteliğindeki birkaç kelimeyi seçin.",
        "Bu kelimeleri süslü yazı aracında \"kalın\" veya \"italik\" satırından kopyalayın.",
        "Profili düzenle ekranında biyografinin geri kalanını normal yazın ve kopyaladığınız kısmı uygun yere yapıştırın.",
        "Karakter sınırını kontrol edin: süslü harfler bellekte iki birim yer kapladığı için bazı uygulamalar sınırı daha çabuk doldurabilir; [[bilgi:sosyal-medya-karakter-sinirlari|sosyal medya karakter sınırları]] makalesindeki değerleri göz önünde tutun.",
        "Kaydettikten sonra profilinize başka bir cihazdan bakın; kutu ya da boşluk görünen harf varsa o stili değiştirin."
      ],
      after: [
        "Kalın ve italik dışında daha \"oyuncu\" bir görünüm istiyorsanız harfleri bir büyük bir küçük yazmayı deneyebilirsiniz. Bu yazım gerçek harflerle yapıldığı için arama ve ekran okuyucularda daha az sorun çıkarır."
      ]
    },
    {
      h: "Süslü yazı ekran okuyucularda neden sorun çıkarır?",
      p: [
        "Görme engelli kullanıcılar telefonda ekran okuyucu yazılımlarla gezinir; bu yazılımlar metni sese çevirir. Bir ekran okuyucu normal \"Selam\" kelimesini tek kelime olarak okur. Aynı kelime matematik kalın harflerle yazıldığında ise yazılım ya hiçbir şey okumaz, ya da her harfi tek tek \"matematiksel kalın büyük S, matematiksel kalın küçük e...\" diye okur. Beş harflik bir kelime yarım dakikalık anlamsız bir anonsa dönüşebilir.",
        "Bu durum yalnızca görme engelli kişileri değil, sesli asistanla mesaj dinleyenleri, disleksi gibi okuma güçlüğü olan ve metni sesli okutanları da etkiler. Kurumsal hesaplarda, okul ve belediye duyurularında ya da müşteri bilgilendirmesinde süslü yazı kullanmak, bilgiyi bazı kişiler için tamamen erişilemez hâle getirir. Emoji yoğun metinlerde de benzer bir sorun yaşanır; ekran okuyucu her emojinin adını okur. Emojilerin nasıl okunduğunu [[bilgi:emoji-anlamlari-ne-demek|emoji anlamları]] sayfasında bulabilirsiniz."
      ],
      ul: [
        "Adınızı, kullanıcı adınızı, telefon, adres, fiyat ve tarih gibi bilgileri her zaman normal harfle yazın.",
        "Süslü stili yalnızca bir iki dekoratif kelimeyle sınırlayın; tam cümleyi süslü yazmayın.",
        "Kurumsal hesaplarda süslü yazı yerine satır başı, kısa cümle ve uygun emoji gibi düzen araçlarını tercih edin.",
        "Gönderi açıklamasında süslü bir başlık kullandıysanız aynı bilgiyi hemen altında düz metinle tekrar edin."
      ]
    },
    {
      h: "Türkçe karakterler süslü yazıda neden bozulur?",
      p: [
        "Matematik bloğu yalnızca İngiliz alfabesinin 26 harfi, rakamlar ve Yunan harfleri için tanımlanmıştır. Türkçedeki ç, ğ, ı, İ, ö, ş, ü harflerinin kalın ya da el yazısı karşılığı yoktur. Üretici bu harflere geldiğinde onları olduğu gibi bırakır. Sonuçta \"Güneş\" kelimesinde G, n, e harfleri kalın, ü ve ş ise normal görünür ve kelime yamalı bir hâl alır.",
        "Bazı üreticiler ü yerine u, ş yerine s koyarak tutarlı görünüm elde etmeye çalışır; bu ise kelimenin anlamını değiştirebilir. Daha iyi çözüm, Türkçe harf içeren kelimeleri birleşen işaretlerle yapılan stillerde (üstü çizili, altı çizili) ya da düz yazmaktır. Türkçe harflerin genel olarak neden bozulduğunu [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] makalesi ayrıntılı anlatır."
      ]
    },
    {
      h: "WhatsApp'ta kalın, italik ve üstü çizili yazı nasıl yapılır?",
      p: [
        "WhatsApp, Instagram'dan farklı olarak gerçek metin biçimlendirmesini destekler. Kelimenin başına ve sonuna özel bir işaret koyduğunuzda karakterler değişmez, yalnızca görünüm değişir. Bu yöntem ekran okuyucularla sorunsuz çalışır, Türkçe harfleri bozmaz ve mesaj aramada bulunur."
      ],
      table: {
        head: ["Biçim", "Yazılışı", "Görünüm"],
        rows: [
          ["Kalın", "*Toplantı yarın*", "<strong>Toplantı yarın</strong>"],
          ["İtalik", "_önemli not_", "<em>önemli not</em>"],
          ["Üstü çizili", "~eski fiyat~", "eski fiyat (üstü çizili)"],
          ["Eş aralıklı", "üç ters tırnak + metin + üç ters tırnak", "<code>kod gibi metin</code>"]
        ],
        caption: "İşaretler kelimeye bitişik yazılmalıdır; araya boşluk girerse biçim uygulanmaz. Telefonda metni seçip açılan menüden de biçim seçebilirsiniz."
      },
      after: [
        "Aynı işaretler bazı masaüstü mesajlaşma ve e-posta programlarında da çalışır, ancak her uygulama aynı kuralı kullanmaz. Biçim desteklenmeyen bir yerde yıldız ve alt çizgi işaretleri olduğu gibi görünür; bu yine de okunabilir kalır."
      ]
    },
    {
      h: "Alternatif büyük–küçük harf yazısı nasıl oluşturulur?",
      p: [
        "\"mErHaBa\" ya da \"MeRhAbA\" şeklindeki yazım, mizahi ya da alaycı bir ton vermek için kullanılır. Bu yazımda karakterler değişmez, yalnızca harflerin büyük ya da küçük olması değişir; bu yüzden matematik harflerinin sorunlarının çoğunu taşımaz. Yine de uzun cümlelerde okunması zordur ve ekran okuyucular bazen her büyük harfte vurgu yapar.",
        "Elle yazmak zahmetli olduğu için [[arac:alternatif-buyuk-kucuk|Alternatif Büyük Küçük Harf]] aracını kullanabilirsiniz. Araç Türkçe İ/ı ve I/i dönüşümüne uyar, boşlukları sayıp saymama ve her kelimede baştan başlama seçenekleri sunar. Yıldız, ok ya da kalp gibi ayrı bir sembol eklemek isterseniz [[arac:ozel-karakter-kopyala|Özel Karakter Kopyala]] aracı Unicode kodlarıyla birlikte hazır bir tablo verir."
      ]
    },
    {
      h: "Süslü yazı aramada bulunur mu?",
      p: [
        "Çoğu zaman bulunmaz ya da güvenilir biçimde bulunmaz. Bir kişi \"Ayşe Tasarım\" diye arama yaptığında uygulama normal harfleri arar; matematik kalın harflerle yazılmış bir ad bu aramayla eşleşmeyebilir. Unicode, bu harfleri normal harflere eşleyen bir \"uyumluluk normalleştirmesi\" tanımlar, ancak bir uygulamanın aramada bunu uygulayıp uygulamadığı ürüne göre değişir ve zamanla da değişebilir.",
        "Bu yüzden işletme ve kişisel markalar için güvenli kural şudur: ad alanını ve kullanıcı adını sade yazın, süslü stili yalnızca biyografide dekoratif bir satırda kullanın. Hashtag'lerde süslü harf kullanmayın; süslü harfli bir etiket, aynı kelimenin normal yazılmış etiketiyle aynı sayfaya düşmeyebilir."
      ]
    },
    {
      h: "Süslü yazı kullanırken sık yapılan hatalar",
      ul: [
        "<strong>Tüm biyografiyi süslü yazmak:</strong> Okunması zorlaşır, ekran okuyucu kullanıcılar için metin anlamsızlaşır.",
        "<strong>İletişim bilgilerini süslemek:</strong> Süslü rakamlarla yazılmış telefon numarası kopyalanıp aranamayabilir.",
        "<strong>Türkçe harfleri gözden kaçırmak:</strong> Yamalı görünen kelimeler profesyonel olmayan bir izlenim bırakır.",
        "<strong>Tek cihazda kontrol etmek:</strong> Eski telefonlarda bazı stiller kutu olarak görünür.",
        "<strong>Süslü harfle şifre ya da kod paylaşmak:</strong> Karşı taraf kopyaladığında farklı karakterler alır ve kod çalışmaz."
      ]
    }
  ],
  faq: [
    ["Instagram'da farklı yazı tipi nasıl kullanılır?", "Instagram font seçimine izin vermez. Metninizi bir süslü yazı üreticisinde kalın, italik ya da el yazısı stile çevirip kopyalarsınız, ardından biyografi, ad ya da açıklama alanına yapıştırırsınız."],
    ["Süslü yazılar aslında font mu, Unicode karakter mi?", "Unicode karakterdir. Kalın, italik ve el yazısı harfler matematik formülleri için tanımlanmış ayrı kod noktalarıdır; normal A ile kalın A yazılım açısından iki farklı karakterdir."],
    ["Biyografide kalın ve italik yazı nasıl yapılır?", "Yalnızca vurgulamak istediğiniz birkaç kelimeyi süslü yazı aracının kalın ya da italik satırından kopyalayın, biyografinin geri kalanını normal yazıp bu kelimeleri yerine yapıştırın ve başka bir cihazda kontrol edin."],
    ["Süslü yazı ekran okuyucularda neden sorun çıkarır?", "Ekran okuyucular matematik harflerini ya hiç okumaz ya da her birini tek tek \"matematiksel kalın büyük harf\" diye okur. Bu, görme engelli kullanıcıların metni anlamasını neredeyse imkânsız hâle getirir."],
    ["Türkçe karakterler süslü yazıda neden bozulur?", "Unicode'un matematik harf bloğunda yalnızca İngiliz alfabesinin 26 harfi vardır. Ç, ğ, ı, ö, ş ve ü harflerinin karşılığı olmadığı için bu harfler normal kalır ve kelime karışık görünür."],
    ["WhatsApp'ta kalın, italik ve üstü çizili yazı nasıl yapılır?", "Kalın için kelimeyi yıldızlar arasına, italik için alt çizgiler arasına, üstü çizili için dalga işaretleri arasına bitişik yazın. Bu gerçek biçimlendirmedir ve karakterleri değiştirmez."],
    ["Alternatif büyük–küçük harf yazısı nasıl oluşturulur?", "Harfleri sırayla bir büyük bir küçük yazarak oluşturulur. Alternatif Büyük Küçük Harf aracı bunu otomatik yapar, Türkçe İ ve ı harflerine uyar, boşlukları sayma seçeneği sunar."],
    ["Süslü yazı aramada bulunur mu?", "Güvenilir biçimde bulunmaz. Arama normal harflerle yapıldığı için süslü yazılmış ad ve etiketler eşleşmeyebilir. Adınızı ve hashtag'lerinizi her zaman normal harflerle yazmanız önerilir."],
    ["Süslü yazı aracı yazdığım metni kaydediyor mu?", "Hayır. Süslü Yazı aracı tamamen tarayıcınızda çalışır; yazdığınız metin sunucuya gönderilmez, kayıt ya da üyelik gerekmez ve sayfayı kapattığınızda metin tarayıcı belleğinden silinir."]
  ],
  tools: ["yazi-stili", "alternatif-buyuk-kucuk", "ozel-karakter-kopyala"],
  related: ["ascii-unicode-utf8-farki", "sosyal-medya-karakter-sinirlari", "emoji-anlamlari-ne-demek"],
  sources: [
    ["Unicode Consortium – Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF)", "https://www.unicode.org/charts/PDF/U1D400.pdf"],
    ["W3C – Web İçeriği Erişilebilirlik Yönergeleri (WCAG)", "https://www.w3.org/WAI/standards-guidelines/wcag/"]
  ]
};
