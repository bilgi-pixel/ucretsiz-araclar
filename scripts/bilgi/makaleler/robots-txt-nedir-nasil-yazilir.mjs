export default {
  slug: "robots-txt-nedir-nasil-yazilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Robots.txt Nedir, Nasıl Yazılır? Disallow, Allow ve Sitemap Örnekleri",
  pageTitle: "Robots.txt Nedir, Nasıl Yazılır? Disallow, Allow Örnekleri",
  description: "Robots.txt, kök dizinde duran ve tarayıcılara hangi yolları taramayacaklarını söyleyen dosyadır. RFC 9309 kuralları, Disallow, Allow, Sitemap ve noindex farkı.",
  keywords: ["robots.txt nedir", "robots.txt nasıl yazılır", "disallow ne demek", "robots.txt örneği", "allow disallow kullanımı", "noindex robots farkı", "sitemap robots.txt", "robots.txt test"],
  lead: "Robots.txt, bir sitenin kök dizininde (<code>/robots.txt</code>) bulunan ve arama motoru gibi otomatik tarayıcılara hangi adresleri taramamalarını söyleyen düz metin dosyasıdır. Kuralları 2022'de RFC 9309 ile standartlaşan Robots Hariç Tutma Protokolü'ne göre yazılır: <code>User-agent</code> satırı hangi tarayıcıya seslenildiğini, <code>Disallow</code> ve <code>Allow</code> satırları hangi yolların taranıp taranamayacağını belirtir. Robots.txt bir güvenlik önlemi değildir ve bir sayfayı tek başına arama sonuçlarından çıkarmaz. Bu sayfada sözdizimini, eşleşme kurallarını, örnek dosyaları ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Robots.txt yalnızca sitenin kökünde, /robots.txt adresinde geçerlidir ve her alt alan adı ile protokol için ayrı dosya gerekir.",
    "Dosya gruplardan oluşur: bir ya da birkaç User-agent satırı ve ardından gelen Allow ve Disallow kuralları.",
    "Bir adrese birden fazla kural uyuyorsa en uzun (en özel) eşleşme kazanır; eşitlikte Allow tercih edilir.",
    "Yıldız (*) herhangi bir karakter dizisi, dolar ($) adresin sonu anlamına gelir; yollar büyük-küçük harfe duyarlıdır.",
    "Disallow taramayı engeller, dizine eklemeyi kesin olarak engellemez; sayfayı dizinden çıkarmak için noindex kullanılır ve sayfanın taranmasına izin verilir.",
    "Sitemap satırı tam adresle yazılır ve gruplardan bağımsızdır; Crawl-delay standardın parçası değildir."
  ],
  figure: {
    alt: "Bir tarayıcının robots.txt okuma akışı: dosya istenir; 2xx yanıtta kurallar okunur, 4xx yanıtta tüm site taranabilir sayılır, 5xx ya da erişilemezse tüm site taranamaz sayılır. Ardından kendi adına uyan grup seçilir ve en uzun eşleşen kural uygulanır; örnekte /urunler/indirim/ayakkabi adresi Allow ile taranabilir.",
    caption: "RFC 9309'a göre tarayıcının izlediği adımlar. Durum kodunun anlamı önemlidir: dosya yoksa (404) her şey taranabilir, sunucu hatasında (5xx) ise tarayıcı tüm siteyi taranamaz kabul eder.",
    svg: `<svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="rb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Tarayıcı robots.txt'yi nasıl uygular?</text>
  <rect x="240" y="44" width="240" height="44" rx="8" class="p"/>
  <text x="360" y="72" class="mid b sf">1 · GET /robots.txt</text>
  <g class="st" fill="none">
    <line x1="300" y1="88" x2="120" y2="122" marker-end="url(#rb)"/>
    <line x1="360" y1="88" x2="360" y2="122" marker-end="url(#rb)"/>
    <line x1="420" y1="88" x2="600" y2="122" marker-end="url(#rb)"/>
  </g>
  <rect x="20" y="126" width="200" height="70" rx="8" class="dgs"/>
  <text x="120" y="152" class="mid b">4xx (ör. 404)</text>
  <text x="120" y="176" class="sm mid">Kısıt yok: her yol taranabilir</text>
  <rect x="260" y="126" width="200" height="70" rx="8" class="oks"/>
  <text x="360" y="152" class="mid b">2xx</text>
  <text x="360" y="176" class="sm mid">Kurallar okunur</text>
  <rect x="500" y="126" width="200" height="70" rx="8" class="dgs"/>
  <text x="600" y="152" class="mid b">5xx / erişilemez</text>
  <text x="600" y="176" class="sm mid">Tüm site taranamaz sayılır</text>
  <line x1="360" y1="196" x2="360" y2="220" class="st" fill="none" marker-end="url(#rb)"/>
  <rect x="200" y="224" width="320" height="44" rx="8" class="sf sb"/>
  <text x="360" y="251" class="mid b">2 · Kendi adına uyan grubu seç (yoksa *)</text>
  <line x1="360" y1="268" x2="360" y2="290" class="st" fill="none" marker-end="url(#rb)"/>
  <rect x="200" y="294" width="320" height="44" rx="8" class="sf sb"/>
  <text x="360" y="321" class="mid b">3 · En uzun eşleşen kuralı uygula</text>
  <rect x="20" y="356" width="680" height="82" rx="10" class="ps"/>
  <text x="36" y="380" class="sm"><tspan class="b">Disallow:</tspan> /urunler/   (9 karakter)</text>
  <text x="36" y="402" class="sm"><tspan class="b">Allow:</tspan> /urunler/indirim/   (17 karakter)</text>
  <text x="380" y="380" class="sm b">Adres: /urunler/indirim/ayakkabi</text>
  <text x="380" y="402" class="sm ok b">İkisi de uyar → uzun olan Allow kazanır</text>
  <text x="36" y="426" class="sm t2">/urunler/ayakkabi adresine yalnızca Disallow uyar → taranmaz</text>
</svg>`
  },
  sections: [
    {
      h: "Robots.txt nedir, ne işe yarar?",
      p: [
        "Robots.txt, site sahiplerinin otomatik tarayıcılara (botlara, örümceklere) sitenin hangi bölümlerine girmemelerini istediklerini bildirdiği bir metin dosyasıdır. İlk olarak 1994'te önerilen bu yöntem yıllarca fiilî bir gelenek olarak kullanıldı; 2022'de IETF tarafından <strong>RFC 9309</strong> numarasıyla \"Robots Exclusion Protocol\" adıyla standart hâline getirildi.",
        "Robots.txt'nin tipik kullanımları şunlardır: yönetim paneli, sepet, kullanıcı hesabı ve site içi arama sonuçları gibi arama motorunda görünmesinin anlamı olmayan sayfaların taranmasını önlemek; filtre ve sıralama parametreleriyle üretilen sonsuz sayıda benzer adresin tarama bütçesini tüketmesini engellemek; belirli tarayıcıları tamamen dışarıda tutmak ve site haritasının yerini bildirmek.",
        "Standart açıkça belirtir ki robots.txt bir <strong>erişim yetkilendirme</strong> yöntemi değildir. Kurallara uymak tarayıcının iyi niyetine bağlıdır; kötü niyetli botlar dosyayı yok sayabilir, hatta \"gizli\" yolları bulmak için okuyabilir. Gerçekten korunması gereken içerik şifre, oturum ya da sunucu tarafı erişim kısıtlamasıyla korunmalıdır."
      ]
    },
    {
      h: "Robots.txt dosyası nereye konur?",
      p: [
        "Dosya, sitenin kök dizininde ve tam olarak <code>/robots.txt</code> yolunda bulunmalıdır; adı küçük harflerle yazılır. Bir alt klasöre konan robots.txt dosyası tarayıcılar tarafından okunmaz. Kurallar yalnızca dosyanın sunulduğu protokol, alan adı ve bağlantı noktası için geçerlidir: ornek.com, www.ornek.com, magaza.ornek.com ve aynı adresin http sürümü ayrı ayrı değerlendirilir ve her biri kendi robots.txt dosyasına ihtiyaç duyar."
      ],
      ul: [
        "<strong>Biçim:</strong> UTF-8 kodlu düz metin; sunucu dosyayı text/plain türüyle göndermelidir.",
        "<strong>Boyut:</strong> Standart, tarayıcıların en az 500 KiB'lık dosyayı işlemesini ister; bu sınırı aşan kısım yok sayılabilir.",
        "<strong>Önbellek:</strong> Tarayıcılar dosyayı genellikle 24 saate kadar önbellekte tutar; değişiklikler hemen etkili olmayabilir.",
        "<strong>Yönlendirme:</strong> Tarayıcılar robots.txt için en az beş ardışık yönlendirmeyi izlemelidir.",
        "<strong>Durum kodları:</strong> 404 gibi bir 4xx yanıtı \"kısıt yok\", 5xx sunucu hatası ya da erişilememe \"tamamen yasak\" olarak yorumlanır."
      ],
      after: [
        "Son madde sık gözden kaçar: sunucunuz robots.txt isteğine uzun süre 500 hatası döndürürse arama motorları sitenizi taramayı durdurabilir. Standart, dosyaya 30 günden uzun süre erişilemezse tarayıcının önbellekteki son kopyayı kullanabileceğini ya da dosyayı yok sayabileceğini belirtir."
      ]
    },
    {
      h: "Sözdizimi: User-agent, Disallow, Allow",
      p: [
        "Robots.txt satırlardan oluşur; her satır \"alan: değer\" biçimindedir. Alan adları büyük-küçük harfe duyarlı değildir, ancak değerlerdeki yollar duyarlıdır. Kare işaretinden (#) sonrası açıklama olarak yok sayılır. Satırlar <strong>gruplar</strong> hâlinde düzenlenir: bir grup bir ya da birkaç User-agent satırıyla başlar ve ardından gelen Allow ve Disallow kurallarını içerir."
      ],
      formula: "# Tüm tarayıcılar için\nUser-agent: *\nDisallow: /yonetim/\nDisallow: /sepet\nAllow: /yonetim/yardim/\n\n# Yalnızca belirli bir tarayıcı için\nUser-agent: OrnekBot\nDisallow: /",
      table: {
        head: ["Kural", "Anlamı", "Örnek"],
        rows: [
          ["User-agent", "Grubun hangi tarayıcıya ait olduğu; * hepsi demektir", "User-agent: *"],
          ["Disallow", "Bu yolla başlayan adresler taranmasın", "Disallow: /yonetim/"],
          ["Allow", "Bu yolla başlayan adresler taranabilir", "Allow: /yonetim/yardim/"],
          ["Disallow: (boş)", "Hiçbir kısıt yok", "Disallow:"],
          ["Disallow: /", "Sitenin tamamı taranmasın", "Disallow: /"],
          ["Sitemap", "Site haritasının tam adresi", "Sitemap: tam adres/sitemap.xml"]
        ]
      },
      after: [
        "Tarayıcı, kendi ürün adına (user-agent belirtecine) uyan grubu arar; eşleşme büyük-küçük harfe duyarsızdır. Aynı tarayıcı için birden fazla grup varsa bunlar birleştirilir. Kendi adına uyan grup yoksa yıldızlı (*) grubu uygular; o da yoksa hiçbir kısıt yoktur. Önemli bir ayrıntı: tarayıcı kendi adına bir grup bulursa yıldızlı grubu <strong>hiç okumaz</strong>. Bu yüzden genel kuralları belirli bir bota da uygulamak istiyorsanız onun grubuna yeniden yazmanız gerekir."
      ]
    },
    {
      h: "Disallow ve Allow komutları nasıl eşleşir?",
      p: [
        "Bir kural, değeri adresin yolunun başıyla eşleşiyorsa o adrese uyar. Bir adrese birden fazla kural uyduğunda RFC 9309'a göre <strong>en uzun eşleşme</strong>, yani en çok karakterle eşleşen kural kazanır. Bir Allow ve bir Disallow kuralı eşit uzunlukta eşleşiyorsa Allow tercih edilmelidir. Kuralların dosyadaki sırası sonucu etkilemez."
      ],
      table: {
        head: ["Kurallar", "Adres", "Sonuç", "Neden"],
        rows: [
          ["Disallow: /urunler/", "/urunler/ayakkabi", "Taranmaz", "Yalnızca Disallow uyar"],
          ["Disallow: /urunler/ · Allow: /urunler/indirim/", "/urunler/indirim/ayakkabi", "Taranır", "Allow daha uzun"],
          ["Disallow: /sepet", "/sepetim", "Taranmaz", "Önek eşleşmesi: /sepet ile başlar"],
          ["Disallow: /sepet$", "/sepetim", "Taranır", "$ adresin sonunu zorunlu kılar"],
          ["Disallow: /Yonetim/", "/yonetim/giris", "Taranır", "Yollar harfe duyarlı"],
          ["Disallow: /*.pdf$", "/katalog/2026.pdf", "Taranmaz", "* her diziyle, $ sonla eşleşir"],
          ["Disallow: /*?", "/arama?q=ayakkabi", "Taranmaz", "Soru işareti içeren tüm adresler"]
        ]
      },
      after: [
        "Üçüncü satır en sık yapılan hatayı gösterir: kurallar önek olarak eşleşir. \"Disallow: /sepet\" yazdığınızda yalnızca /sepet değil, /sepetim, /sepet-kampanyasi gibi bu harflerle başlayan tüm adresler de engellenir. Yalnızca bir klasörü engellemek istiyorsanız sonuna eğik çizgi koyun: Disallow: /sepet/. Tek bir adresi engellemek istiyorsanız $ kullanın."
      ]
    },
    {
      h: "Örnek robots.txt dosyaları",
      p: [
        "Aşağıdaki örnekler, sık karşılaşılan durumlar için başlangıç noktasıdır. Kendi sitenizin klasör yapısına göre uyarlamanız gerekir. Site haritası satırında, standart dışı bir uzantı olmakla birlikte tarayıcıların yaygın olarak tanıdığı biçimde, protokol ve alan adını içeren tam adres yazılmalıdır."
      ],
      formula: "# 1) Her şeye izin ver\nUser-agent: *\nDisallow:\n\n# 2) Yönetim, sepet ve site içi aramayı kapat\nUser-agent: *\nDisallow: /yonetim/\nDisallow: /sepet/\nDisallow: /hesabim/\nDisallow: /arama\nDisallow: /*?siralama=\nAllow: /yonetim/genel/\n\n# 3) Belirli bir tarayıcıyı tamamen engelle\nUser-agent: OrnekBot\nDisallow: /\n\n# Site haritası (tam adresle yazılır)\nSitemap: [sitenizin tam adresi]/sitemap.xml",
      after: [
        "Bu örneklerde OrnekBot temsilî bir addır; engellemek istediğiniz tarayıcının yayımladığı gerçek user-agent belirtecini kullanmanız gerekir. Hazırlık aşamasındaki bir sitenin tamamını kapatmak için \"Disallow: /\" kullanılabilir; ancak site yayına alındığında bu satırın kaldırılması unutulmamalıdır. Kendi kurallarınızı adım adım oluşturmak ve yolların biçimini denetlemek için [[arac:robots-txt-olustur|Robots.txt Oluşturucu]] kullanılabilir."
      ]
    },
    {
      h: "Robots.txt ile sayfa dizinden çıkarılır mı? Noindex farkı",
      p: [
        "Hayır, tek başına çıkarılmaz. Disallow yalnızca <strong>taramayı</strong> engeller. Engellenen bir sayfaya başka sitelerden bağlantı verilmişse arama motoru sayfanın içeriğini okumadan yalnızca adresini dizine ekleyebilir; bu durumda sonuçlarda açıklamasız bir bağlantı görünebilir. Bir sayfanın arama sonuçlarında görünmemesini istiyorsanız doğru araç <strong>noindex</strong> yönergesidir.",
        "Noindex, sayfanın HTML başlığına eklenen robots meta etiketiyle ya da sunucunun gönderdiği X-Robots-Tag başlığıyla verilir. Burada kritik bir ayrıntı vardır: tarayıcının noindex yönergesini görebilmesi için sayfayı tarayabilmesi gerekir. Aynı sayfayı hem robots.txt ile engeller hem de noindex eklerseniz, tarayıcı sayfayı okuyamadığı için noindex'i hiç göremez. Robots.txt içine yazılan \"Noindex:\" satırı ise standartta yoktur ve büyük arama motorlarınca desteklenmez."
      ],
      table: {
        head: ["Amaç", "Doğru yöntem", "Not"],
        rows: [
          ["Taranmasın, sunucu yükü azalsın", "robots.txt Disallow", "Adres yine dizinde görünebilir"],
          ["Arama sonuçlarında görünmesin", "noindex meta etiketi ya da X-Robots-Tag", "Sayfanın taranmasına izin verilmeli"],
          ["Kimse erişemesin", "Şifre ya da sunucu erişim kısıtı", "robots.txt güvenlik sağlamaz"],
          ["Yinelenen sayfalar tek adreste toplansın", "canonical etiketi", "Taramayı engellemek gerekmez"]
        ]
      },
      after: [
        "Robots meta etiketini ve diğer başlık etiketlerini hazırlamak için [[arac:meta-etiket-olustur|Meta Etiket Oluşturucu]], paylaşım önizlemesinde kullanılan etiketlerin ayrıntısı için [[bilgi:open-graph-meta-etiketi-nedir|Open Graph meta etiketi]] yazısı yardımcı olur. Taşınan sayfalarda robots.txt ile engellemek yerine yönlendirme kullanılmalıdır; istemci tarafı yönlendirme kodu için [[arac:yonlendirme-meta-olustur|Yönlendirme Meta Etiketi Oluşturucu]], sunucu yanıt kodlarının anlamı için [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sitemap satırı robots.txt'ye nasıl eklenir?",
      p: [
        "Sitemap satırı, site haritanızın yerini tarayıcılara bildirir. Herhangi bir User-agent grubuna bağlı değildir; dosyanın herhangi bir yerine yazılabilir ve tüm tarayıcılar için geçerlidir. Değer, göreli yol değil, protokol ve alan adını içeren tam adres olmalıdır. Birden fazla site haritanız ya da bir site haritası dizininiz varsa her biri için ayrı bir Sitemap satırı yazabilirsiniz.",
        "Sitemap satırı, site haritasını arama motorlarının web yöneticisi araçlarına göndermenin yerine geçmez ama onu tamamlar: yeni bir tarayıcı sitenizi ilk kez ziyaret ettiğinde haritanızı bu satırdan bulabilir. Site haritasında yalnızca taranmasına izin verdiğiniz, dizine eklenmesini istediğiniz kanonik adresleri listelemeye dikkat edin; robots.txt ile engellenen bir adresi site haritasına koymak çelişkili bir sinyal verir."
      ]
    },
    {
      h: "Yapay zekâ botları robots.txt ile engellenebilir mi?",
      p: [
        "Robots.txt, yalnızca arama motorları için değil, kurallara uyan tüm otomatik tarayıcılar için geçerlidir. Yapay zekâ modellerini eğitmek ya da yanıt üretmek için içerik toplayan şirketlerin önemli bir kısmı tarayıcılarının user-agent adlarını yayımlar ve robots.txt kurallarına uyacağını açıklar. Bu tarayıcıları engellemek için ilgili ad ile ayrı bir grup yazmak yeterlidir: User-agent satırına botun adı, altına Disallow: / yazılır.",
        "Burada üç noktaya dikkat etmek gerekir. Birincisi, bazı şirketler arama dizini ile yapay zekâ eğitimi için ayrı belirteçler kullanır; arama tarayıcısını engellemek sitenizi arama sonuçlarından da düşürebilir. İkincisi, belirteç adları zamanla değişebilir ve yenileri eklenir; listeyi şirketlerin kendi belgelerinden düzenli olarak kontrol etmek gerekir. Üçüncüsü, robots.txt yalnızca kurallara uyan botları durdurur; uymayanlara karşı sunucu tarafında erişim sınırlaması gerekir."
      ]
    },
    {
      h: "Robots.txt hatası nasıl test edilir? Sık yapılan hatalar",
      ol: [
        "Tarayıcınızın adres çubuğuna alan adınızı ve ardından /robots.txt yazarak dosyanın açıldığını ve içeriğin doğru olduğunu görün.",
        "Sunucunun 200 durum kodu ve text/plain içerik türü döndürdüğünü geliştirici araçlarının ağ sekmesinden kontrol edin.",
        "Önemli sayfalarınızın adreslerini tek tek alıp yukarıdaki en uzun eşleşme kuralına göre hangi kuralın uyduğunu kontrol edin.",
        "Arama motorlarının web yöneticisi araçlarındaki robots.txt raporunu ve adres denetleme aracını kullanarak dosyanın nasıl okunduğunu görün.",
        "Değişiklikten sonra önbellek nedeniyle etkinin bir güne kadar gecikebileceğini hesaba katın."
      ],
      ul: [
        "<strong>Yayına alınan sitede \"Disallow: /\" unutmak:</strong> Tüm site taramaya kapanır; en sık ve en pahalı hatadır.",
        "<strong>CSS ve JavaScript dosyalarını engellemek:</strong> Arama motorları sayfanın nasıl görüntülendiğini anlayamaz.",
        "<strong>Gizli klasörleri listelemek:</strong> Dosya herkese açıktır; hassas yolları ilan etmiş olursunuz.",
        "<strong>Sondaki eğik çizgiyi atlamak:</strong> \"Disallow: /blog\" /blogger gibi adresleri de engeller.",
        "<strong>Harf duyarlılığını unutmak:</strong> /Urunler/ ile /urunler/ farklı yollardır.",
        "<strong>Crawl-delay'e güvenmek:</strong> Standartta yoktur; bazı tarayıcılar destekler, bazıları yok sayar."
      ]
    }
  ],
  faq: [
    ["Robots.txt nedir, ne işe yarar?", "Robots.txt, sitenin kök dizininde bulunan ve otomatik tarayıcılara hangi adresleri taramamaları gerektiğini bildiren düz metin dosyasıdır. Kuralları RFC 9309 ile standartlaşmıştır. Tarama bütçesini yönetmek ve gereksiz sayfaları taramadan çıkarmak için kullanılır, güvenlik sağlamaz."],
    ["Robots.txt dosyası nereye konur?", "Dosya sitenin kökünde, tam olarak /robots.txt yolunda bulunmalıdır. Alt klasördeki robots.txt okunmaz. Her alt alan adı, protokol ve bağlantı noktası ayrı değerlendirilir; www ve www olmayan sürüm ya da mağaza alt alan adı için ayrı dosya gerekir."],
    ["Disallow ve Allow komutları nasıl kullanılır?", "Disallow belirtilen yolla başlayan adreslerin taranmamasını, Allow taranabilmesini söyler. Bir adrese birden fazla kural uyuyorsa en uzun eşleşen kural kazanır, eşitlikte Allow tercih edilir. Yıldız herhangi bir diziyle, dolar işareti adresin sonuyla eşleşir."],
    ["Robots.txt ile sayfa dizinden çıkarılır mı?", "Tek başına çıkarılmaz. Disallow yalnızca taramayı engeller; engellenen sayfanın adresi başka yerlerden bağlantı aldığı için dizinde görünmeye devam edebilir. Sayfanın arama sonuçlarından çıkması için noindex kullanılmalı ve sayfanın taranmasına izin verilmelidir."],
    ["Noindex ile robots.txt arasındaki fark nedir?", "Robots.txt taramayı, noindex ise dizine eklemeyi kontrol eder. Noindex sayfadaki robots meta etiketiyle ya da X-Robots-Tag başlığıyla verilir ve tarayıcının sayfayı okuyabilmesini gerektirir. Aynı sayfayı robots.txt ile engellerseniz noindex yönergesi hiç görülmez."],
    ["Sitemap satırı robots.txt'ye nasıl eklenir?", "Dosyanın herhangi bir yerine Sitemap: ile başlayan ve site haritasının protokol ile alan adını içeren tam adresini veren bir satır yazılır. Bu satır User-agent gruplarından bağımsızdır. Birden fazla site haritası için birden fazla Sitemap satırı kullanılabilir."],
    ["Yapay zekâ botları robots.txt ile engellenebilir mi?", "Kurallara uyan yapay zekâ tarayıcıları engellenebilir; bunun için botun yayımlanmış user-agent adıyla ayrı bir grup yazılıp altına Disallow: / eklenir. Belirteçler değişebildiği için şirketlerin belgeleri düzenli kontrol edilmeli, kurallara uymayan botlar için sunucu tarafı önlem alınmalıdır."],
    ["Robots.txt hatası nasıl test edilir?", "Önce alan adınızdan sonra /robots.txt yazarak dosyanın açıldığını ve 200 kodu döndürdüğünü kontrol edin. Önemli adresleri en uzun eşleşme kuralına göre tek tek deneyin. Arama motorlarının web yöneticisi araçlarındaki robots.txt raporu dosyanın nasıl okunduğunu gösterir."],
    ["Robots.txt dosyası yoksa ne olur?", "Sunucu robots.txt isteğine 404 gibi bir 4xx yanıtı döndürürse tarayıcılar hiçbir kısıt olmadığını varsayar ve tüm siteyi tarayabilir. Buna karşılık 5xx sunucu hatası ya da erişilememe durumunda standart, tarayıcının tüm siteyi taranamaz kabul etmesini öngörür."]
  ],
  tools: ["robots-txt-olustur", "meta-etiket-olustur", "yonlendirme-meta-olustur"],
  related: ["open-graph-meta-etiketi-nedir", "http-durum-kodlari-404-500-nedir", "url-kodlama-yuzde-20-nedir"],
  sources: [
    ["IETF – RFC 9309 Robots Exclusion Protocol", "https://www.rfc-editor.org/rfc/rfc9309"]
  ]
};
