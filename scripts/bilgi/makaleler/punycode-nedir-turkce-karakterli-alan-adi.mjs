export default {
  slug: "punycode-nedir-turkce-karakterli-alan-adi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Punycode Nedir? Türkçe Karakterli Alan Adı (xn--) Nasıl Çalışır?",
  pageTitle: "Punycode Nedir? Türkçe Karakterli Alan Adı ve xn-- Anlamı",
  description: "Punycode, ş, ç, ğ gibi karakterler içeren alan adlarını DNS'in anladığı xn-- ile başlayan ASCII biçimine çeviren kodlamadır. Örnekler, e-posta ve güvenlik notları.",
  keywords: ["punycode nedir", "türkçe karakterli alan adı", "xn-- ne demek", "idn alan adı", "şçğüöı domain", "türkçe domain alınır mı", "punycode çevirme", "homograf saldırısı"],
  lead: "Punycode, Türkçe karakterler gibi ASCII dışı harfler içeren alan adlarını internetin adres sistemi DNS'in anlayabileceği, yalnızca İngiliz harfleri, rakam ve tireden oluşan bir biçime çeviren kodlamadır. Çevrilen ad \"xn--\" önekiyle başlar: \"bilişim.com\" adresi DNS'te \"xn--biliim-zjb.com\" olarak tutulur. Tarayıcı adresi size Türkçe gösterir, arka planda ise Punycode biçimini kullanır. Bu yazıda kodlamanın mantığını, Türkçe karakterli alan adının SEO, e-posta ve güvenlik açısından ne anlama geldiğini örneklerle anlatıyoruz.",
  kisaCevap: [
    "Punycode, Unicode karakterli alan adı etiketlerini yalnızca a–z, 0–9 ve tire içeren ASCII metne çeviren kodlamadır (RFC 3492).",
    "\"xn--\" öneki, bir alan adı parçasının Punycode ile kodlandığını gösterir.",
    "Örnekler: bilişim.com → xn--biliim-zjb.com, çiçek.com.tr → xn--iek-1lab.com.tr, şeker.com → xn--eker-45a.com.",
    "Kodlama yalnızca alan adının noktalarla ayrılan her parçasına ayrı uygulanır; uzantı ve ASCII parçalar değişmez.",
    "URL kodlama (yüzde kodlama) adresin yol ve sorgu kısmı içindir; Punycode yalnızca alan adı içindir.",
    "Benzer görünen yabancı harflerle sahte site kurmaya homograf saldırısı denir; tarayıcılar bu durumda xn-- biçimini gösterir."
  ],
  figure: {
    alt: "bilişim.com alan adının Punycode'a dönüşümü: ASCII harfler biliim olarak öne alınır, tire eklenir, ş harfinin konumu zjb olarak kodlanır, xn-- öneki eklenir; uzantı .com değişmez.",
    caption: "Punycode, etiketteki ASCII harfleri olduğu gibi öne yazar, ASCII dışı harflerin ne olduğunu ve nereye ekleneceğini tirenin arkasındaki kısa bir koda sıkıştırır. Uzantı ayrı bir etiket olduğu için değişmez.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">bilişim.com → xn--biliim-zjb.com</text>
  <rect x="60" y="56" width="380" height="64" rx="10" class="sf sb"/>
  <text x="250" y="98" class="mid xl">bili<tspan class="p">ş</tspan>im</text>
  <rect x="470" y="56" width="190" height="64" rx="10" class="oks"/>
  <text x="565" y="98" class="mid xl">.com</text>
  <text x="565" y="140" class="mid sm ok b">değişmez</text>
  <line x1="250" y1="122" x2="250" y2="166" class="sp sw" fill="none"/>
  <polygon points="242,160 258,160 250,174" class="p"/>
  <rect x="30" y="182" width="200" height="72" rx="10" class="ps"/>
  <text x="130" y="210" class="mid b">1. ASCII harfler</text>
  <text x="130" y="238" class="mid lg">biliim</text>
  <rect x="250" y="182" width="200" height="72" rx="10" class="ps"/>
  <text x="350" y="210" class="mid b">2. Ayraç</text>
  <text x="350" y="238" class="mid lg">-</text>
  <rect x="470" y="182" width="220" height="72" rx="10" class="ps"/>
  <text x="580" y="210" class="mid b">3. ş ve konumu</text>
  <text x="580" y="238" class="mid lg">zjb</text>
  <rect x="30" y="276" width="660" height="56" rx="10" class="p"/>
  <text x="360" y="312" class="mid xl sf">xn--biliim-zjb.com</text>
  <text x="30" y="362" class="sm t2">Başa eklenen xn-- öneki DNS'e "bu parça Punycode ile kodlandı" bilgisini verir.</text>
  <text x="30" y="384" class="sm t2">Tarayıcı adres çubuğunda yine "bilişim.com" gösterir.</text>
</svg>`
  },
  sections: [
    {
      h: "Punycode nedir, neden gerekir?",
      p: [
        "İnternetteki alan adlarını IP adreslerine çeviren DNS (alan adı sistemi), 1980'lerde tasarlandığında yalnızca İngiliz alfabesindeki harfleri, rakamları ve tireyi kabul edecek şekilde kuruldu. Oysa dünyada milyarlarca insan Türkçe, Arapça, Çince ya da Rusça gibi farklı harflerle yazıyor. Bütün internet altyapısını değiştirmek yerine bir köprü bulundu: ASCII dışı harfler içeren alan adları, DNS'e gönderilmeden önce ASCII biçimine çevriliyor.",
        "Bu çeviriyi yapan kodlamanın adı <strong>Punycode</strong>'dur ve RFC 3492 standardında tanımlanır. Türkçe karakterli alan adlarının uluslararası adı ise <strong>IDN</strong>'dir (Internationalized Domain Name, uluslararasılaştırılmış alan adı). IDN kuralları hangi karakterlerin kullanılabileceğini, Punycode ise bu karakterlerin nasıl ASCII'ye dönüştürüleceğini belirler."
      ]
    },
    {
      h: "\"xn--\" ile başlayan adresler ne anlama gelir?",
      p: [
        "Bir alan adı parçasının başındaki <code>xn--</code> öneki, o parçanın Punycode ile kodlandığını gösteren işarettir. DNS sunucusu, web sunucusu ve SSL sertifikası bu biçimi görür. Tarayıcı ise adresi kullanıcıya genellikle orijinal Türkçe hâliyle gösterir.",
        "Kodlama, alan adının noktalarla ayrılan her parçasına (etiketine) ayrı ayrı uygulanır. \"çiçek.com.tr\" adresinde yalnızca \"çiçek\" parçası kodlanır, \".com.tr\" olduğu gibi kalır. Bu yüzden xn-- öneki adresin ortasında da görünebilir: örneğin bir alt alan adı Türkçe karakterliyse \"xn--...\" yalnızca o kısımda yer alır."
      ],
      table: {
        head: ["Türkçe yazım", "Punycode (DNS'teki biçim)", "Not"],
        rows: [
          ["bilişim.com", "xn--biliim-zjb.com", "Tek ASCII dışı harf: ş"],
          ["çiçek.com.tr", "xn--iek-1lab.com.tr", "İki ç harfi; uzantı değişmez"],
          ["şeker.com", "xn--eker-45a.com", "Baştaki ş kodlanır"],
          ["güzelyazı.net", "xn--gzelyaz-n2a79b.net", "ü ve ı birlikte kodlanır"],
          ["ığdır.tr", "xn--dr-wna5ec.tr", "Üç ASCII dışı harf: ı, ğ, ı"],
          ["örnek.tr", "xn--rnek-4qa.tr", "ö kodlanır"]
        ],
        caption: "Dönüşümler IDNA standardına göre hesaplanmıştır. Büyük harfler alan adında önce küçük harfe çevrilir."
      }
    },
    {
      h: "Kodlama nasıl çalışır?",
      p: [
        "Punycode'un mantığı şaşırtıcı derecede ekonomiktir. Önce etiketteki ASCII harfler sırası bozulmadan öne yazılır: \"bilişim\" için bu \"biliim\" olur. Eğer etikette ASCII harf varsa ardından bir tire konur. Son olarak ASCII dışı her harfin ne olduğu (Unicode kod noktası) ve kelimenin içinde hangi konuma ekleneceği tek bir sayı dizisine çevrilir ve bu sayılar a–z ile 0–9 karakterleriyle yazılır. \"bilişim\" örneğinde bu kısım \"zjb\" olur.",
        "Çözme işlemi tam tersidir: tireden önceki kısım ASCII harfleri verir, tireden sonraki kod çözülerek hangi harfin nereye ekleneceği bulunur. Bu yöntem iki yönlü ve kayıpsızdır; aynı Türkçe ad her zaman aynı Punycode'u üretir. Hesabı elle yapmak pratik değildir; [[arac:punycode-cevir|Punycode Çevirici]] her iki yönde de anında dönüşüm yapar."
      ],
      ul: [
        "Her etiket xn-- dahil en fazla 63 karakter olabilir; Türkçe harfler kodlanınca etiket uzar.",
        "Alan adında büyük-küçük harf ayrımı yoktur; \"BİLİŞİM\" önce küçük harfe çevrilir.",
        "Türkçede büyük İ ile küçük ı dönüşümü alan adlarında Türkçe yazım kurallarıyla değil, Unicode kurallarıyla yapılır; tescil ederken küçük harfle yazmak en güvenlisidir."
      ]
    },
    {
      h: "Alan adlarında Türkçe karakter kullanılabilir mi?",
      p: [
        "Teknik olarak evet. Birçok genel uzantı (.com, .net gibi) Türkçe karakterli alan adlarını kabul eder. Ancak hangi karakterlerin kabul edildiği uzantıyı yöneten kuruluşun kurallarına bağlıdır; her uzantı her dili desteklemez. .tr uzantılı alan adları Türkiye'de BTK bünyesindeki TRABİS sistemi üzerinden tahsis edilir; Türkçe karakterli .tr adları için güncel kuralları TRABİS'ten ya da yetkili kayıt kuruluşundan kontrol edin.",
        "Tescil sırasında kayıt kuruluşu sizden ya Türkçe yazımı ya da doğrudan Punycode biçimini ister. Panelde \"xn--\" ile başlayan bir kayıt görmeniz normaldir; bu sizin Türkçe adınızın DNS'teki karşılığıdır."
      ]
    },
    {
      h: "Türkçe ve Latin karakterli iki alan adı birlikte alınmalı mı?",
      p: [
        "Çoğu işletme için cevap evettir. Kullanıcıların önemli bir kısmı Türkçe klavyesi olmayan cihazlardan, alışkanlıkla ya da hızlı yazdığı için Türkçe karakterleri İngilizce karşılıklarıyla yazar: \"bilişim\" yerine \"bilisim\". Yalnızca Türkçe karakterli adı alırsanız bu ziyaretçileri kaybedebilir, adınızı başkasının almasına da kapı açarsınız.",
        "Pratik çözüm, iki adı da tescil edip birini birincil yapmak ve diğerini kalıcı yönlendirmeyle (301) birincil adrese bağlamaktır. Birincil ad olarak genellikle Latin karakterli sürüm seçilir; çünkü e-posta adresleri, sosyal medya profilleri ve basılı malzemelerde daha az sorun çıkarır. Türkçe karakterleri İngilizce karşılıklarına çevirmek için [[arac:turkce-karakter-donustur|Türkçe Karakter Dönüştürücü]] kullanabilirsiniz."
      ]
    },
    {
      h: "Türkçe karakterli alan adı SEO'yu etkiler mi?",
      p: [
        "Arama motorları Türkçe karakterli alan adlarını Latin karakterli adlar gibi tarar ve dizine ekler; alan adının kendisi tek başına sıralamada belirleyici bir etken değildir. Asıl farkı kullanıcı davranışı yaratır: arama sonuçlarında ya da paylaşılan bağlantılarda adres bazen xn-- biçiminde görünür ve bu kullanıcıya güvensiz gelebilir.",
        "SEO açısından önemli olan, tek bir birincil adres belirleyip diğer sürümleri kalıcı olarak ona yönlendirmek ve sayfalarda kanonik etiketi bu birincil adrese göre ayarlamaktır. Aynı içeriğin iki farklı alan adında ayrı ayrı yayınlanması kopya içerik sorununa yol açabilir."
      ]
    },
    {
      h: "E-posta adreslerinde Türkçe karakter sorun çıkarır mı?",
      p: [
        "E-posta adresinin iki parçası vardır: @ işaretinden önceki kullanıcı adı ve sonraki alan adı. Alan adı kısmı Punycode ile çevrilebildiği için \"ad@bilişim.com\" gibi bir adres pek çok e-posta sisteminde \"ad@xn--biliim-zjb.com\" olarak çalışır. Ancak eski sistemler, form doğrulayıcılar ve bazı kurumsal yazılımlar Türkçe karakterli alan adını kabul etmeyebilir.",
        "Kullanıcı adı kısmında Türkçe karakter (\"ayşe@...\") kullanmak ise ayrı bir standart desteği gerektirir ve birçok sistemde hâlâ sorun çıkarır. Bu nedenle kurumsal e-posta için hem kullanıcı adında hem alan adında Latin karakterli sürümü kullanmak en güvenli yoldur."
      ]
    },
    {
      h: "Tarayıcı neden bazen xn-- biçimini gösterir?",
      p: [
        "Tarayıcılar Türkçe karakterli adresi çoğunlukla Türkçe gösterir. Ancak adres farklı alfabelerden harfleri karıştırıyorsa, bir harf başka bir alfabedeki harfe çok benziyorsa ya da uzantının kuralları o karakteri kapsamıyorsa, kullanıcıyı korumak için adresi xn-- biçiminde gösterir. Adresi kopyalayıp bir mesaja yapıştırdığınızda da bazı uygulamalar Punycode biçimini görüntüleyebilir.",
        "Bu bir hata değil, güvenlik önlemidir. Kendi sitenizin adresi beklenmedik biçimde xn-- olarak görünüyorsa, adın yalnızca Türkçe harfler ve Latin harflerden oluştuğundan, başka bir alfabeden benzer görünümlü bir harf içermediğinden emin olun."
      ]
    },
    {
      h: "Homograf saldırısı: benzer görünen karakterlerle sahte site",
      p: [
        "Bazı alfabelerde Latin harflerine görsel olarak neredeyse aynı harfler vardır. Örneğin Kiril alfabesindeki \"а\", \"е\", \"о\" ve \"р\" harfleri Latin a, e, o ve p ile aynı görünür. Dolandırıcılar bu harflerle tanınmış bir sitenin adını taklit eden alan adları alabilir; adres çubuğunda aynı görünen iki ad aslında tamamen farklı sitelere gider. Buna <strong>homograf saldırısı</strong> denir.",
        "Korunmak için bankacılık ve e-Devlet gibi önemli sitelere arama sonuçlarından ya da mesajlardaki bağlantılardan değil, adresi kendiniz yazarak veya yer imlerinizden girin. Şüpheli bir bağlantının gerçek biçimini görmek için alan adını Punycode çeviricisine yapıştırın: xn-- ile başlayan beklenmedik bir sonuç, adın içinde ASCII dışı bir harf olduğunu gösterir."
      ]
    },
    {
      h: "URL kodlama ile Punycode arasındaki fark",
      p: [
        "İkisi de ASCII dışı karakterleri internetin anlayacağı biçime çevirir ama adresin farklı parçalarında kullanılır. Punycode yalnızca alan adı (ana makine) kısmına uygulanır. Adresin yol ve sorgu kısmındaki Türkçe karakterler ise <strong>yüzde kodlama</strong> (URL kodlama) ile çevrilir: \"çiçek\" kelimesi bir yolda <code>%C3%A7i%C3%A7ek</code> olur."
      ],
      table: {
        head: ["Özellik", "Punycode", "URL (yüzde) kodlama"],
        rows: [
          ["Uygulandığı yer", "Alan adı etiketi", "Yol, sorgu, parça"],
          ["Örnek girdi", "çiçek.com.tr", "/urunler/çiçek"],
          ["Örnek çıktı", "xn--iek-1lab.com.tr", "/urunler/%C3%A7i%C3%A7ek"],
          ["Tanınma işareti", "xn-- öneki", "% ve iki onaltılık basamak"],
          ["Standart", "RFC 3492, IDNA", "RFC 3986"]
        ]
      },
      after: [
        "Yüzde kodlamanın ayrıntıları için [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama ve %20 nedir]] yazısına, karakterlerin bayt düzeyinde nasıl temsil edildiğine dair arka plan için [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısına bakabilirsiniz. Adresin yol kısmını kodlamak için [[arac:url-kodla|URL Kodla / Çöz]] aracı kullanılabilir."
      ]
    },
    {
      h: "Punycode çeviricisi nerede işe yarar?",
      ul: [
        "<strong>DNS kaydı:</strong> bazı DNS panelleri Türkçe adı kabul etmez; kaydı xn-- biçimiyle girmeniz gerekir.",
        "<strong>SSL sertifikası:</strong> sertifika talebinde alan adının Punycode karşılığı kullanılır.",
        "<strong>Sunucu yapılandırması:</strong> web sunucusu ve e-posta sunucusu ayarlarında ad genellikle ASCII biçiminde yazılır.",
        "<strong>Şüpheli bağlantı kontrolü:</strong> bir adresin gerçekten göründüğü gibi olup olmadığını anlamak için.",
        "<strong>Ters çeviri:</strong> günlüklerde ya da raporlarda gördüğünüz xn-- adresinin hangi Türkçe ada karşılık geldiğini bulmak için."
      ]
    }
  ],
  faq: [
    ["Punycode nedir?", "Punycode, Türkçe gibi ASCII dışı harfler içeren alan adlarını DNS'in anlayabileceği, yalnızca a–z, rakam ve tireden oluşan biçime çeviren kodlamadır. Çevrilen parça xn-- önekiyle başlar ve işlem iki yönlü, kayıpsızdır."],
    ["Alan adlarında Türkçe karakter kullanılabilir mi?", "Evet, birçok genel uzantı Türkçe karakterli alan adlarını kabul eder; ancak desteklenen karakterler uzantının kurallarına bağlıdır. .tr uzantıları için güncel kuralları TRABİS'ten ya da yetkili kayıt kuruluşundan kontrol etmeniz gerekir."],
    ["'xn--' ile başlayan adresler ne anlama gelir?", "xn-- öneki, alan adının o parçasının Punycode ile kodlandığını gösterir. Örneğin xn--biliim-zjb.com, bilişim.com adresinin DNS'teki karşılığıdır; tarayıcı genellikle adresi size Türkçe hâliyle gösterir."],
    ["Türkçe karakterli alan adı SEO'yu etkiler mi?", "Arama motorları Türkçe karakterli adları da tarar ve dizine ekler; alan adı tek başına sıralamayı belirlemez. Önemli olan tek bir birincil adres seçip diğer yazımları kalıcı yönlendirmeyle ona bağlamak ve kopya içerikten kaçınmaktır."],
    ["E-posta adreslerinde Türkçe karakter sorun çıkarır mı?", "Alan adı kısmı Punycode ile çalışabilir ama eski sistemler ve form doğrulayıcılar kabul etmeyebilir. Kullanıcı adı kısmındaki Türkçe karakter ise birçok sistemde sorun çıkarır; kurumsal e-posta için Latin karakterli adres daha güvenlidir."],
    ["Tarayıcı neden bazen xn-- biçimini gösterir?", "Adres farklı alfabelerden harfleri karıştırıyorsa, bir harf başka alfabedeki bir harfe çok benziyorsa ya da uzantı kuralları o karakteri kapsamıyorsa tarayıcı kullanıcıyı korumak için Punycode biçimini gösterir. Bu bir güvenlik önlemidir."],
    ["Benzer görünen karakterlerle sahte site (homograf) saldırısı nedir?", "Başka alfabelerdeki Latin harflerine benzeyen harflerle tanınmış bir sitenin adını taklit etmektir. Adres aynı görünür ama farklı siteye gider. Önemli sitelere adresi kendiniz yazarak girin, şüpheli adresi Punycode'a çevirip kontrol edin."],
    ["Türkçe ve Latin karakterli iki alan adı birlikte alınmalı mı?", "Çoğu işletme için evet. Kullanıcılar sıklıkla Türkçe karakterleri İngilizce karşılıklarıyla yazar. İki adı da tescil edip birini birincil yapmak ve diğerini 301 yönlendirmesiyle ona bağlamak ziyaretçi kaybını ve taklit riskini azaltır."],
    ["URL kodlama ile Punycode arasındaki fark nedir?", "Punycode yalnızca alan adı kısmına uygulanır ve xn-- önekiyle tanınır. URL kodlama ise adresin yol ve sorgu kısmındaki karakterleri yüzde işareti ve onaltılık sayılarla yazar; örneğin ç harfi %C3%A7 olur."]
  ],
  tools: ["punycode-cevir", "url-kodla", "turkce-karakter-donustur", "url-ayristir"],
  related: ["url-kodlama-yuzde-20-nedir", "ascii-unicode-utf8-farki", "turkce-karakter-sorunu-nasil-duzeltilir"],
  sources: [
    ["IETF – RFC 3492 Punycode", "https://www.rfc-editor.org/rfc/rfc3492"],
    ["TRABİS – .tr Alan Adları", "https://www.trabis.gov.tr/"]
  ]
};
