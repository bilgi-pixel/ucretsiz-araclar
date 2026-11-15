export default {
  slug: "url-kodlama-yuzde-20-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "URL Kodlama Nedir? %20, %C3%BC Ne Demek ve Türkçe Karakterli Linkler",
  pageTitle: "URL Kodlama Nedir? %20 Ne Demek, Türkçe Karakterli Linkler",
  description: "Linkteki %20 boşluk, %C3%BC ise ü harfidir. URL kodlama (percent encoding) nedir, Türkçe karakterler neden bozuk görünür, punycode ve query string nasıl okunur?",
  keywords: ["url kodlama nedir", "%20 ne demek", "url encode", "url decode", "türkçe karakterli url", "punycode nedir", "query string nedir", "percent encoding"],
  lead: "URL kodlama (percent encoding), web adresinde doğrudan yazılamayan karakterleri <strong>yüzde işareti ve iki onaltılık rakamla</strong> yazma yöntemidir; linkte gördüğünüz <strong>%20 bir boşluğu</strong>, %C3%BC ise ü harfini temsil eder. Türkçe harfler UTF-8'de iki bayt tuttuğu için her biri iki yüzde dizisine dönüşür ve kopyaladığınız linkler bu yüzden uzun, okunmaz görünür. Bu rehberde kodlamanın kurallarını, Türkçe harflerin karşılıklarını, alan adlarındaki punycode'u, soru işaretinden sonraki sorgu dizesini ve kodlanmış bir linki nasıl çözeceğinizi bulacaksınız.",
  kisaCevap: [
    "URL kodlamada her bayt % ve iki onaltılık rakamla yazılır: boşluk %20, & işareti %26, / işareti %2F olur.",
    "Kodlanmadan yazılabilen karakterler yalnızca A–Z, a–z, 0–9 ve - . _ ~ işaretleridir (RFC 3986).",
    "Türkçe harfler UTF-8'de 2 bayttır: ç %C3%A7, ğ %C4%9F, ı %C4%B1, İ %C4%B0, ö %C3%B6, ş %C5%9F, ü %C3%BC.",
    "Form verisinde boşluk %20 yerine + olarak da yazılabilir; bu yalnızca sorgu dizesinde geçerlidir.",
    "Alan adlarında yüzde kodlama değil punycode kullanılır: çiçek.com, xn--iek-1lab.com olarak çözülür.",
    "SEO açısından sayfa adresinde Türkçe karaktersiz, küçük harfli ve tireli kısa adresler en sorunsuz seçenektir."
  ],
  figure: {
    alt: "Bir web adresinin parçaları: şema, ana makine, yol, sorgu dizesi ve parça; altında Türkçe 'şehir haritası' ifadesinin yüzde kodlu karşılığı ve ş harfinin UTF-8 baytlarına ayrılması.",
    caption: "Üstte bir adresin parçaları, altta kodlamanın mantığı görülüyor. ş harfi UTF-8'de C5 ve 9F baytlarından oluşur; her bayt % ile yazıldığı için tek harf %C5%9F olur. Boşluk tek bayttır (20) ve %20 olarak yazılır.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir adresin parçaları ve yüzde kodlama</text>
  <g class="mid">
    <rect x="20" y="52" width="90" height="44" rx="6" class="p"/><text x="65" y="80" class="b sf">https</text>
    <rect x="114" y="52" width="170" height="44" rx="6" class="ps"/><text x="199" y="80" class="b">ornek.com.tr</text>
    <rect x="288" y="52" width="110" height="44" rx="6" class="sf sb"/><text x="343" y="80" class="b">/ara</text>
    <rect x="402" y="52" width="208" height="44" rx="6" class="oks"/><text x="506" y="80" class="b">?q=...&amp;s=2</text>
    <rect x="614" y="52" width="86" height="44" rx="6" class="sf sb"/><text x="657" y="80" class="b">#harita</text>
    <text x="65" y="116" class="sm">şema</text><text x="199" y="116" class="sm">ana makine</text>
    <text x="343" y="116" class="sm">yol</text><text x="506" y="116" class="sm">sorgu dizesi</text>
    <text x="657" y="116" class="sm">parça</text>
  </g>
  <line x1="20" y1="138" x2="700" y2="138" class="sb dash" fill="none"/>
  <text x="20" y="168" class="b">Yazılan: şehir haritası</text>
  <rect x="20" y="182" width="680" height="44" rx="6" class="sf sb"/>
  <text x="360" y="210" class="mid b p">%C5%9Fehir%20haritas%C4%B1</text>
  <g class="mid">
    <rect x="60" y="256" width="120" height="70" rx="8" class="ps"/>
    <text x="120" y="290" class="xl">ş</text><text x="120" y="314" class="sm">1 harf</text>
    <rect x="240" y="256" width="100" height="70" rx="8" class="sf sb"/>
    <text x="290" y="290" class="lg b">C5</text><text x="290" y="314" class="sm">1. bayt</text>
    <rect x="350" y="256" width="100" height="70" rx="8" class="sf sb"/>
    <text x="400" y="290" class="lg b">9F</text><text x="400" y="314" class="sm">2. bayt</text>
    <rect x="510" y="256" width="170" height="70" rx="8" class="p"/>
    <text x="595" y="296" class="lg b sf">%C5%9F</text>
  </g>
  <line x1="182" y1="291" x2="234" y2="291" class="sp" fill="none"/><polygon points="234,285 246,291 234,297" class="p"/>
  <line x1="452" y1="291" x2="504" y2="291" class="sp" fill="none"/><polygon points="504,285 516,291 504,297" class="p"/>
  <rect x="20" y="350" width="680" height="62" rx="8" class="sf sb"/>
  <text x="40" y="374" class="b">Boşluk = %20 · & = %26 · / = %2F · ? = %3F · % = %25</text>
  <text x="40" y="398" class="sm t2">Serbest karakterler: A–Z a–z 0–9 - . _ ~ (kodlanmaz)</text>
</svg>`
  },
  sections: [
    {
      h: "URL kodlama (percent encoding) nedir?",
      p: [
        "Web adresleri, 1990'larda belirlenen kurallar gereği yalnızca sınırlı bir ASCII karakter kümesiyle yazılabilir. Bu kümede Türkçe harfler, boşluk ve birçok özel işaret yoktur; bazı işaretler ise (/, ?, &, =, #) adresin yapısını belirleyen <strong>ayırıcı</strong> görevindedir. Bu karakterleri adrese veri olarak koymanız gerektiğinde URL kodlama devreye girer.",
        "Kural basittir: karakter önce UTF-8 baytlarına çevrilir, ardından her bayt <strong>% işareti ve iki onaltılık rakamla</strong> yazılır. Boşluğun bayt değeri onaltılık 20 olduğu için %20, ampersand (&) 26 olduğu için %26 olur. Yöntemin teknik adı \"percent encoding\" (yüzde kodlama) olup <strong>RFC 3986</strong> standardında tanımlanmıştır."
      ],
      table: {
        head: ["Karakter", "Kodlu hâli", "Neden kodlanır?"],
        rows: [
          ["Boşluk", "%20 (formda +)", "Adreste boşluk olamaz"],
          ["&", "%26", "Sorgu parametrelerini ayırır"],
          ["=", "%3D", "Parametre adını değerden ayırır"],
          ["?", "%3F", "Sorgu dizesini başlatır"],
          ["#", "%23", "Sayfa içi parçayı başlatır"],
          ["/", "%2F", "Yol klasörlerini ayırır"],
          ["+", "%2B", "Formda boşluk anlamına gelebilir"],
          ["%", "%25", "Kodlamanın kendi işaretidir"]
        ],
        caption: "Ayırıcı karakterler yalnızca veri olarak kullanıldığında kodlanır; adresin yapısında görev yaptıklarında olduğu gibi yazılır."
      }
    },
    {
      h: "Linkteki %20 ne anlama gelir?",
      p: [
        "%20, adresin o noktasında bir <strong>boşluk</strong> olduğunu gösterir. Örneğin sunucuda \"yillik rapor.pdf\" adlı bir dosya varsa adresi \"yillik%20rapor.pdf\" olarak görünür. Tarayıcılar adres çubuğunda çoğu zaman bu diziyi boşluk olarak gösterir; ancak linki kopyalayıp bir mesaja yapıştırdığınızda kodlu hâli ortaya çıkar.",
        "Sorgu dizesinde, yani soru işaretinden sonraki bölümde boşluk bazen <strong>+</strong> olarak da görülür. Bu, HTML formlarının kullandığı eski bir kuraldır ve yalnızca sorgu bölümünde geçerlidir. Dosya yolunda + işareti gerçekten artı anlamına gelir. Arama kutusuna \"kira artışı\" yazdığınızda adreste q=kira+art%C4%B1%C5%9F%C4%B1 görmeniz bu yüzdendir."
      ]
    },
    {
      h: "Türkçe karakterler URL'de neden bozuk görünür?",
      p: [
        "Türkçe'ye özgü harfler ASCII'de bulunmaz. Günümüzde web'in standart karakter kodlaması olan <strong>UTF-8</strong>'de bu harflerin her biri <strong>2 bayt</strong> tutar. Kodlamada her bayt ayrı bir %XX dizisi olduğu için tek bir Türkçe harf 6 karakterlik bir diziye dönüşür. \"çiçek\" kelimesi bu yüzden %C3%A7i%C3%A7ek olarak yazılır."
      ],
      table: {
        head: ["Harf", "UTF-8 baytları", "URL kodu", "Büyük harf", "URL kodu"],
        rows: [
          ["ç", "C3 A7", "%C3%A7", "Ç", "%C3%87"],
          ["ğ", "C4 9F", "%C4%9F", "Ğ", "%C4%9E"],
          ["ı", "C4 B1", "%C4%B1", "I", "I (ASCII)"],
          ["i", "69", "i (ASCII)", "İ", "%C4%B0"],
          ["ö", "C3 B6", "%C3%B6", "Ö", "%C3%96"],
          ["ş", "C5 9F", "%C5%9F", "Ş", "%C5%9E"],
          ["ü", "C3 BC", "%C3%BC", "Ü", "%C3%9C"]
        ],
        caption: "Noktasız ı ile noktalı büyük İ Türkçe'ye özgüdür ve kodlanır; noktalı küçük i ile noktasız büyük I ise ASCII'dir."
      },
      after: [
        "Eski sistemlerde bazen %FC (ü), %FE (ş) gibi tek baytlık diziler görürsünüz. Bunlar UTF-8 değil, eski Türkçe kod sayfalarıyla (ISO-8859-9 ya da Windows-1254) yapılmış kodlamadır. UTF-8 bekleyen bir çözücü bu dizileri anlamsız karakterlere çevirir. Bu tür karakter karışıklıklarının genel çözümü [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısında anlatılıyor."
      ]
    },
    {
      h: "URL nasıl parçalarına ayrılır?",
      p: [
        "Bir web adresi soldan sağa belirli parçalardan oluşur. Hangi karakterin nerede kodlanması gerektiği parçaya göre değiştiği için bu yapıyı bilmek önemlidir."
      ],
      ul: [
        "<strong>Şema:</strong> Bağlantı türü; https ya da http. İki nokta ve iki eğik çizgiyle biter.",
        "<strong>Ana makine (host):</strong> Alan adı ya da IP adresi; ör. ornek.com.tr. Türkçe karakterli alan adları burada punycode ile yazılır.",
        "<strong>Port:</strong> İsteğe bağlıdır ve iki noktadan sonra gelir. https için varsayılan 443, http için 80'dir; varsayılan kullanıldığında yazılmaz.",
        "<strong>Yol (path):</strong> Sunucudaki sayfa ya da dosyanın konumu; eğik çizgilerle klasörlere ayrılır.",
        "<strong>Sorgu dizesi (query string):</strong> Soru işaretinden sonra gelen ad=değer çiftleri; çiftler & ile ayrılır.",
        "<strong>Parça (fragment):</strong> # işaretinden sonraki bölüm; sayfa içindeki bir başlığa atlar ve sunucuya hiç gönderilmez."
      ],
      after: [
        "Uzun bir reklam ya da e-posta linkini [[arac:url-ayristir|URL Ayrıştırma]] aracına yapıştırırsanız bu parçaları ayrı ayrı ve kodlaması çözülmüş hâlde görebilirsiniz. IP adreslerinin yapısı için [[bilgi:ip-adresi-ve-alt-ag-maskesi-nedir|IP adresi ve alt ağ maskesi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Query string (soru işaretinden sonrası) nedir?",
      p: [
        "Sorgu dizesi, sayfaya ek bilgi taşıyan bölümdür. Bir arama sayfasında aradığınız kelime, bir ürün listesinde seçtiğiniz renk ya da sıralama, bir reklam linkinde kampanyanın kaynağı burada taşınır. Örneğin \"?q=ayakkab%C4%B1&renk=siyah&sayfa=2\" dizesi üç parametre içerir: q (arama kelimesi \"ayakkabı\"), renk ve sayfa.",
        "Pazarlamada sık görülen <strong>UTM parametreleri</strong> (utm_source, utm_medium, utm_campaign) da sorgu dizesinin parçasıdır ve ziyaretin hangi kampanyadan geldiğini analiz araçlarına bildirir. Bu parametreler sayfanın içeriğini değiştirmez; paylaşmadan önce silmek linki kısaltır ve sizi kampanyayla ilişkilendiren izi kaldırır.",
        "Parametre değeri & ya da = gibi ayırıcı karakterler içeriyorsa mutlaka kodlanmalıdır. \"Ar&Ge\" kelimesini kodlamadan yazarsanız sistem bunu \"Ar\" ve \"Ge\" diye iki ayrı parametre sanar; doğru yazım Ar%26Ge'dir."
      ]
    },
    {
      h: "Punycode nedir, Türkçe alan adı nasıl yazılır?",
      p: [
        "Alan adı sistemi (DNS) tarihsel olarak yalnızca İngiliz harfleri, rakamlar ve tireyi tanır. Türkçe ya da başka dillerdeki karakterleri içeren <strong>uluslararasılaştırılmış alan adları</strong>, DNS'e gönderilmeden önce <strong>punycode</strong> adlı bir yöntemle ASCII'ye çevrilir. Çevrilen etiket xn-- önekiyle başlar.",
        "Örneğin çiçek.com alan adı xn--iek-1lab.com, bilişim.com.tr ise xn--biliim-zjb.com.tr olarak çözülür. Önce harflerin ASCII olanları sırayla yazılır (iek, biliim), tireden sonraki kısım ise Türkçe harflerin hangi konumlara hangi karakterle ekleneceğini sayısal olarak kodlar. Tarayıcı adres çubuğunda çoğunlukla Türkçe hâli gösterir; e-posta ya da sunucu ayarlarında ise xn-- biçimi gerekir."
      ],
      after: [
        "Punycode yalnızca alan adı için kullanılır; adresin yol ve sorgu bölümlerindeki Türkçe harfler yüzde kodlamayla yazılır. Görünüşü birbirine çok benzeyen harflerle sahte alan adları üretilebildiği için tanımadığınız bir linkte xn-- gördüğünüzde adresi dikkatle kontrol edin. Çeviri için [[arac:punycode-cevir|Punycode (Türkçe Alan Adı) Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "SEO için URL'de Türkçe karakter kullanılmalı mı?",
      p: [
        "Arama motorları Türkçe karakterli adresleri okuyabilir ve dizine ekleyebilir; teknik olarak yasak ya da cezalı değildir. Ancak bu adresler kopyalandığında uzun yüzde dizilerine dönüşür, e-postada ve mesajlaşma uygulamalarında kırılabilir, bazı eski sistemler ve raporlama araçları yanlış gösterebilir.",
        "Bu yüzden yaygın uygulama, sayfa adresinde (slug) Türkçe harfleri en yakın İngilizce karşılığa çevirmektir: ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u. Kelimeler tireyle ayrılır, tümü küçük harf yazılır ve \"ve, ile, için\" gibi dolgu kelimeler çoğunlukla atılır. \"Kira Artışı Nasıl Hesaplanır?\" başlığı için kira-artisi-nasil-hesaplanir gibi bir adres hem okunur hem de güvenle paylaşılır. Bu dönüşümü [[arac:url-metni-olustur|URL Metni (Slug) Oluşturma]] aracı otomatik yapar."
      ]
    },
    {
      h: "URL kodlanmış metin nasıl çözülür?",
      ol: [
        "Kodlu linki ya da metni [[arac:url-kodla|URL Kodla / Çöz]] aracına yapıştırın ve çözme işlemini seçin; %C3%BC gibi diziler anında harfe döner.",
        "Yalnızca sorgu parametrelerini incelemek istiyorsanız soru işaretinden sonraki bölümü [[arac:sorgu-dizesi-coz|Sorgu Dizesi (Query String) Çözme]] aracına yapıştırın; parametreler tablo ya da JSON olarak listelenir.",
        "Çıktıda anlamsız karakterler varsa metin eski bir Türkçe kod sayfasıyla kodlanmış olabilir; karakter seti seçeneğini değiştirerek deneyin.",
        "Adreste %25 dizileri görüyorsanız metin iki kez kodlanmıştır; çözme işlemini bir kez daha uygulayın.",
        "Kendi linkinizi oluştururken yalnızca parametre değerlerini kodlayın; ? ve & gibi yapı karakterlerini olduğu gibi bırakın."
      ],
      after: [
        "Araçların tümü tarayıcıda çalışır; yapıştırdığınız linkler bir sunucuya gönderilmez. Bu, içinde oturum belirteci ya da kişisel bilgi taşıyan linkleri incelerken önemlidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çift kodlama:</strong> Zaten kodlanmış bir metni yeniden kodlamak % işaretini %25'e çevirir; %20, %2520 olur ve link bozulur.",
        "<strong>Tüm adresi kodlamak:</strong> Şema ve ayırıcılar da kodlanırsa adres çalışmaz; yalnızca veri kısmı kodlanmalıdır.",
        "<strong>+ işaretini unutmak:</strong> Telefon numarası ya da formül gibi + içeren bir değer sorgu dizesinde kodlanmazsa boşluğa dönüşür.",
        "<strong>Büyük-küçük harf takıntısı:</strong> %c3%bc ile %C3%BC aynıdır; standart büyük harfi önerir ama çözücüler ikisini de kabul eder.",
        "<strong>Base64 ile karıştırmak:</strong> URL kodlama yalnızca sorunlu karakterleri değiştirir; verinin tamamını yeniden yazan yöntem Base64'tür. Fark için [[bilgi:base64-nedir-ne-ise-yarar|Base64 nedir]] yazısına bakın."
      ]
    }
  ],
  faq: [
    ["URL kodlama (percent encoding) nedir?", "URL kodlama, web adresinde doğrudan yazılamayan karakterlerin UTF-8 baytlarına çevrilip her baytın yüzde işareti ve iki onaltılık rakamla yazılmasıdır. RFC 3986 standardında tanımlanır; boşluk %20, ampersand %26 olarak yazılır."],
    ["Linkteki %20 ne anlama gelir?", "%20, adresin o noktasında bir boşluk karakteri olduğunu gösterir; boşluğun onaltılık bayt değeri 20'dir. Sorgu dizesinde boşluk bazen artı işaretiyle de gösterilir, ancak dosya yolunda artı gerçek artı anlamına gelir."],
    ["Türkçe karakterler URL'de neden bozuk görünür?", "Türkçe harfler UTF-8'de iki bayt tuttuğu ve her bayt ayrı bir yüzde dizisiyle yazıldığı için tek harf altı karaktere dönüşür. Örneğin ü harfi %C3%BC, ş harfi %C5%9F olarak görünür; tarayıcı bunları adres çubuğunda çoğunlukla doğru gösterir."],
    ["Punycode nedir, Türkçe alan adı nasıl yazılır?", "Punycode, Türkçe gibi ASCII dışı karakter içeren alan adlarını DNS'in anlayacağı xn-- önekli biçime çeviren yöntemdir. Örneğin çiçek.com alan adı xn--iek-1lab.com olarak çözülür; yalnızca alan adı kısmında kullanılır."],
    ["Query string (soru işaretinden sonrası) nedir?", "Query string, adresteki soru işaretinden sonra gelen ve ampersand ile ayrılan ad=değer çiftleridir. Arama kelimesi, filtre, sayfa numarası ya da kampanya kaynağı gibi bilgileri sayfaya taşır."],
    ["URL nasıl parçalarına ayrılır?", "Bir adres soldan sağa şema, ana makine, isteğe bağlı port, yol, soru işaretiyle başlayan sorgu dizesi ve diyez işaretiyle başlayan parçadan oluşur. URL Ayrıştırma aracı bu parçaları ayrı ayrı gösterir."],
    ["URL kodlanmış metin nasıl çözülür?", "Metni URL Kodla / Çöz aracına yapıştırıp çözme seçeneğini kullanmanız yeterlidir. Yüzde dizileri harflere döner; çıktıda hâlâ %25 görüyorsanız metin iki kez kodlanmıştır ve işlemi bir kez daha uygulamanız gerekir."],
    ["SEO için URL'de Türkçe karakter kullanılmalı mı?", "Arama motorları Türkçe karakterli adresleri anlayabilir, ancak kopyalandığında uzun yüzde dizilerine dönüşür ve bazı sistemlerde kırılabilir. Bu yüzden ç, ğ, ı, ö, ş, ü harflerini İngilizce karşılığına çeviren küçük harfli, tireli adresler daha pratiktir."],
    ["URL'de boşluk yerine artı mı yoksa %20 mi kullanılır?", "Adresin yol bölümünde boşluk her zaman %20 olarak yazılmalıdır. Sorgu dizesinde form standardı gereği artı işareti de boşluk anlamına gelir; emin değilseniz %20 kullanmak her iki bölümde de doğru sonuç verir."]
  ],
  tools: ["url-kodla", "sorgu-dizesi-coz", "url-ayristir", "punycode-cevir", "url-metni-olustur"],
  related: ["base64-nedir-ne-ise-yarar", "turkce-karakter-sorunu-nasil-duzeltilir", "open-graph-meta-etiketi-nedir"],
  sources: [
    ["IETF – RFC 3986: URI Genel Sözdizimi", "https://www.rfc-editor.org/rfc/rfc3986"],
    ["IETF – RFC 3492: Punycode", "https://www.rfc-editor.org/rfc/rfc3492"]
  ]
};
