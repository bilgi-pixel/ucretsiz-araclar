export default {
  slug: "kredi-erken-kapama-nasil-hesaplanir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Kredi Erken Kapama Nasıl Hesaplanır? Faiz İndirimi ve Erken Ödeme Ücreti",
  pageTitle: "Kredi Erken Kapama Hesaplama: Faiz İndirimi ve Tazminat",
  description: "Erken kapama tutarı = kalan anapara + işlemiş faiz ve vergisi + varsa tazminat. Konut kredisinde %1–%2 sınırı, ara ödeme mi vade kısaltma mı, örneklerle.",
  keywords: ["kredi erken kapama hesaplama", "kredi erken kapatma faiz indirimi", "erken ödeme ücreti", "kredi kapama tutarı", "ara ödeme yapmak mantıklı mı", "konut kredisi erken kapama cezası", "erken ödeme tazminatı", "kredi kapama yazısı"],
  lead: "Krediyi erken kapattığınızda kalan taksitlerin toplamını değil, <strong>kalan anaparayı, son taksitten kapama gününe kadar işlemiş faizi ve bu faizin vergisini</strong> ödersiniz; sözleşmede varsa buna erken ödeme tazminatı eklenir. Henüz işlememiş aylara ait faiz ve vergiler silinir. İhtiyaç ve taşıt gibi tüketici kredilerinde erken ödeme tazminatı öngörülmez; sabit faizli konut kredilerinde ise tazminat, kalan vade 36 ayı aşmıyorsa erken ödenen tutarın %1'ini, aşıyorsa %2'sini geçemez. Bu yazıda formülü, çözümlü örnekleri ve ara ödeme seçeneklerini karşılaştırıyoruz.",
  kisaCevap: [
    "Erken kapama tutarı = kalan anapara + işlemiş faiz + işlemiş faizin KKDF ve BSMV'si + (varsa) erken ödeme tazminatı.",
    "İşlemiş faiz = kalan anapara × aylık faiz oranı × son taksitten bu yana geçen gün ÷ 30.",
    "Banka, erken ödenen tutara göre faiz ve diğer maliyet unsurlarında indirim yapmak zorundadır.",
    "Tüketici (ihtiyaç, taşıt) kredilerinde erken ödeme tazminatı öngörülmez.",
    "Sabit faizli konut kredisinde tazminat üst sınırı: kalan vade 36 ay ve altıysa %1, 36 aydan fazlaysa %2; değişken faizde tazminat alınamaz.",
    "Ara ödemede vadeyi kısaltmak, taksiti düşürmekten daha fazla faiz tasarrufu sağlar."
  ],
  figure: {
    alt: "Örnek ihtiyaç kredisi: kalan 18 taksitin toplamı 297.234 TL, bugün kapatma tutarı 203.640 TL; erken kapamayla 93.594 TL faiz ve vergiden kurtulunuyor.",
    caption: "Kalan anaparası 200.000 TL, aylık faizi %3,5 olan ve 18 taksiti kalan bir ihtiyaç kredisi son taksitten 12 gün sonra kapatılıyor (KKDF ve BSMV toplamı örnek olarak %30). Kapama tutarı kalan anapara, 12 günlük faiz ve vergisinden oluşur.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Taksitlere devam mı, bugün kapatmak mı?</text>
  <text x="40" y="76" class="b">Taksitlere devam: 18 × 16.513 TL</text>
  <rect x="40" y="88" width="300" height="50" class="sf sb"/>
  <rect x="340" y="88" width="141.7" height="50" class="dgs"/>
  <text x="190" y="119" class="mid b">Anapara 200.000</text>
  <text x="410" y="113" class="sm mid b">Faiz ve vergi</text><text x="410" y="129" class="sm mid b">97.234</text>
  <text x="500" y="119" class="b">= 297.234 TL</text>
  <text x="40" y="190" class="b">Bugün kapatma (son taksitten 12 gün sonra)</text>
  <rect x="40" y="202" width="300" height="50" class="sf sb"/>
  <rect x="340" y="202" width="5.5" height="50" class="p"/>
  <text x="190" y="233" class="mid b">Anapara 200.000</text>
  <text x="356" y="222" class="sm">İşlemiş faiz 2.800</text><text x="356" y="240" class="sm">+ vergi 840</text>
  <text x="500" y="233" class="b">= 203.640 TL</text>
  <line x1="345.5" y1="262" x2="481.7" y2="262" class="sok sw" fill="none"/>
  <text x="413" y="282" class="sm mid ok b">silinen faiz</text>
  <rect x="40" y="300" width="640" height="84" rx="10" class="oks"/>
  <text x="360" y="332" class="b mid">Erken kapamayla ödemekten kurtulunan: 93.594 TL</text>
  <text x="360" y="356" class="sm mid">İşlemiş faiz = 200.000 × %3,5 × 12 ÷ 30 = 2.800 TL · vergi %30 = 840 TL</text>
  <text x="360" y="374" class="sm mid t2">Tüketici kredisinde erken ödeme tazminatı yoktur.</text>
</svg>`
  },
  sections: [
    {
      h: "Kredi erken kapatılınca faiz ne kadar düşer?",
      p: [
        "Eşit taksitli bir kredide her taksit iki parçadan oluşur: o ayın faizi ve anaparadan ödenen kısım. İlk taksitlerde faiz payı büyük, son taksitlerde küçüktür. Krediyi erken kapattığınızda, henüz gelmemiş ayların faizi hiç işlemediği için silinir; yalnızca bugüne kadar kalan anaparayı ve son taksitten bu yana geçen günlerin faizini ödersiniz.",
        "Tüketicinin bu hakkı 6502 sayılı Tüketicinin Korunması Hakkında Kanun ile güvence altındadır. Kanuna göre tüketici, vadesi gelmemiş bir ya da birkaç taksidi veya borcun tamamını erken ödeyebilir; kredi veren de erken ödenen tutara göre <strong>faiz ve diğer maliyet unsurlarında indirim yapmak zorundadır</strong>. Bu indirim sözleşmeyle kaldırılamaz.",
        "Faiz düşüşünün büyüklüğü, kredinin ne kadarının kaldığına bağlıdır. Vadesinin başındaki bir krediyi kapatmak yüksek tasarruf sağlar; son birkaç taksiti kalmış bir krediyi kapatmanın getirisi ise küçüktür, çünkü son taksitlerin çoğu zaten anaparadır."
      ]
    },
    {
      h: "Erken kapama tutarı nasıl hesaplanır?",
      formula: "İşlemiş faiz = kalan anapara × aylık faiz oranı × geçen gün ÷ 30\nVergi ve fon = işlemiş faiz × (KKDF oranı + BSMV oranı)\nErken kapama tutarı = kalan anapara + işlemiş faiz + vergi ve fon + varsa tazminat",
      p: [
        "<strong>Kalan anapara</strong>, ödeme planınızda son ödediğiniz taksidin satırındaki \"kalan anapara\" sütunudur; bankanızın mobil uygulaması ya da internet şubesi de güncel tutarı gösterir. <strong>Geçen gün</strong>, son taksit tarihinden kapama tarihine kadar geçen gün sayısıdır. Taksit gününde kapatırsanız işlemiş faiz sıfırdır.",
        "İhtiyaç ve taşıt kredilerinde faiz üzerinden Kaynak Kullanımını Destekleme Fonu (KKDF) ve Banka ve Sigorta Muameleleri Vergisi (BSMV) alınır. Oranlar zaman içinde değişebildiği için ödeme planınızda yazan değerleri kullanın. Konut kredileri bu iki kesintiden muaf olduğu için konut kredisinde bu kalem sıfırdır."
      ],
      after: [
        "Bu adımları [[arac:kredi-erken-kapama-hesapla|Kredi Erken Kapama Hesaplama]] aracı otomatik yapar: kalan anapara, faiz oranı, kalan taksit sayısı ve geçen günü girdiğinizde kapama tutarını ve kurtulacağınız faizi gösterir."
      ]
    },
    {
      h: "Çözümlü örnek: ihtiyaç kredisini kapatmak",
      p: [
        "Kalan anaparası 200.000 TL, aylık akdi faizi %3,5 olan ve 18 taksiti kalmış bir ihtiyaç kredisi düşünelim. KKDF ve BSMV toplamı örnek olarak %30 kabul edilmiştir; bu durumda vergili aylık maliyet %3,5 × 1,30 = %4,55 olur ve kalan taksit tutarı 16.512,98 TL çıkar."
      ],
      ol: [
        "Taksitlere devam edilirse ödenecek: 16.512,98 × 18 = 297.233,62 TL.",
        "Kredi, son taksitten 12 gün sonra kapatılıyor. İşlemiş faiz: 200.000 × 0,035 × 12 ÷ 30 = 2.800 TL.",
        "Bu faizin vergi ve fonu: 2.800 × 0,30 = 840 TL.",
        "Tüketici kredisinde tazminat yoktur. Kapama tutarı: 200.000 + 2.800 + 840 = 203.640 TL.",
        "Kurtulunan faiz ve vergi: 297.233,62 − 203.640 = 93.593,62 TL."
      ],
      after: [
        "Aynı krediyi bir sonraki taksit gününü bekleyip kapatsaydınız, o taksidi (16.512,98 TL) ödeyip ardından kalan anaparayı kapatırdınız; arada geçen her gün için faiz işlemeye devam ettiği için beklemek avantaj sağlamaz. Parayı hazır ettiğiniz gün kapatmak her zaman daha az faiz ödetir."
      ]
    },
    {
      h: "Erken ödeme ücreti (tazminat) yüzde kaç?",
      p: [
        "Erken ödeme tazminatı, bankanın sabit faizle borç verdiği paranın erken dönmesinden doğan kaybını karşılamak için talep edebildiği tutardır. Mevzuat bu tazminatı kredi türüne göre farklı düzenler."
      ],
      table: {
        head: ["Kredi türü", "Faiz tipi", "Erken ödeme tazminatı"],
        rows: [
          ["İhtiyaç (genel amaçlı) tüketici kredisi", "Sabit", "Öngörülmez; yalnızca faiz indirimi yapılır"],
          ["Taşıt kredisi (tüketici)", "Sabit", "Öngörülmez; yalnızca faiz indirimi yapılır"],
          ["Konut kredisi, kalan vade 36 ay ve altı", "Sabit", "En fazla erken ödenen tutarın %1'i"],
          ["Konut kredisi, kalan vade 36 aydan fazla", "Sabit", "En fazla erken ödenen tutarın %2'si"],
          ["Konut kredisi", "Değişken", "Tazminat istenemez"],
          ["Ticari ve kurumsal krediler", "Sözleşmeye göre", "Sözleşme belirler; tüketici mevzuatı uygulanmaz"]
        ],
        caption: "Konut kredisinde tazminatın istenebilmesi için sözleşmede öngörülmüş olması gerekir ve tazminat, yapılan faiz indirimi tutarını aşamaz."
      },
      after: [
        "Örneğin kalan anaparası 1.000.000 TL, kalan vadesi 60 ay olan sabit faizli bir konut kredisini tamamen kapatırsanız, sözleşmede yazıyorsa banka en fazla 1.000.000 × %2 = 20.000 TL tazminat isteyebilir. Kalan vade 30 ay olsaydı üst sınır %1, yani 10.000 TL olurdu. Bu sınırların üzerinde bir kesinti talep edilirse Tüketici Hakem Heyeti'ne başvurabilirsiniz."
      ]
    },
    {
      h: "Ara ödeme mi, vade kısaltma mı daha avantajlı?",
      p: [
        "Kredinin tamamını kapatacak paranız yoksa ara ödeme yapabilirsiniz. Ara ödemeden sonra banka genellikle iki seçenek sunar: aynı vadede devam edip <strong>taksiti düşürmek</strong> ya da aynı taksitle devam edip <strong>vadeyi kısaltmak</strong>. Aşağıdaki karşılaştırma, kalan anaparası 1.000.000 TL, aylık faizi %2,8 ve kalan vadesi 60 ay olan bir konut kredisine 200.000 TL ara ödeme yapılması örneğidir."
      ],
      table: {
        head: ["Seçenek", "Aylık taksit", "Kalan vade", "Kalan toplam ödeme", "Ara ödemeye göre faiz tasarrufu"],
        rows: [
          ["Ara ödeme yok", "34.598,97 TL", "60 ay", "2.075.938,35 TL", "–"],
          ["Taksiti düşür", "27.679,18 TL", "60 ay", "1.660.750,68 TL", "215.187,67 TL"],
          ["Vadeyi kısalt", "34.598,97 TL", "38 ay (son taksit küçük)", "1.306.200,21 TL", "569.738,14 TL"]
        ],
        caption: "Tasarruf = ara ödeme yapılmasa ödenecek toplam − ara ödeme − yeni toplam. Sabit faizli kredide sözleşmede varsa tazminat (bu örnekte en fazla 4.000 TL) ayrıca düşünülmelidir."
      },
      after: [
        "Vadeyi kısaltmak, aynı ara ödemeyle yaklaşık 2,6 kat daha fazla faiz tasarrufu sağlar; çünkü kalan anapara daha hızlı erir ve faiz daha kısa süre işler. Taksiti düşürmek ise aylık bütçenizi rahatlatır. Bütçeniz yüksek taksiti kaldırabiliyorsa vade kısaltma, nakit akışınız sıkışıksa taksit düşürme mantıklıdır. Farklı aylık ödeme tutarlarıyla borcun kaç ayda biteceğini görmek için [[arac:borc-odeme-plani-hesapla|Borç Ödeme Planı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Erken kapatmak her zaman mantıklı mı?",
      p: [
        "Krediyi erken kapatmak, kredinin faizinden kurtulmanızı sağlar; ancak elinizdeki parayı başka bir yerde değerlendirme fırsatından da vazgeçmiş olursunuz. Basit kural şudur: kredinin vergiler dahil maliyeti, aynı parayla güvenli biçimde elde edebileceğiniz net getiriden yüksekse kapatmak kazançlıdır.",
        "Örneğin vergili aylık maliyeti %4,55 olan bir krediyi, net aylık getirisi daha düşük bir mevduatla karşılaştırırsanız kapatmanın avantajlı olduğu açıktır. Düşük sabit faizle alınmış eski bir konut kredisinde ise durum tersine dönebilir. Ayrıca acil durumlar için birkaç aylık giderinizi karşılayacak bir yedek bırakmadan tüm birikimi krediye yatırmak sizi yeniden borçlanmaya itebilir. Getiri karşılaştırması için [[bilgi:pesin-mi-taksit-mi-hesaplama|peşin mi taksit mi]] yazısındaki bugünkü değer mantığı da kullanılabilir."
      ]
    },
    {
      h: "Kredi kapama yazısı, sigorta ve KKDF iadesi",
      ul: [
        "<strong>Kapama yazısı:</strong> Borç kapandıktan sonra bankadan \"borcu yoktur\" ya da kredi kapama yazısı talep edebilirsiniz; çoğu banka bunu şubeden, internet şubesinden ya da çağrı merkezinden ücretsiz verir. Konut kredisinde ipoteğin kaldırılması (ipotek fekki) için banka tapu müdürlüğüne yazı gönderir.",
        "<strong>Kredi bağlantılı sigorta:</strong> Kredi borcu vadeden önce ödendiğinde, krediyle bağlantılı hayat sigortası gibi poliçeler sona erer. Peşin ödenmiş primin kalan süreye düşen kısmının iadesi için bankanıza ya da sigorta şirketine başvurun; iade tutarı poliçe koşullarına göre hesaplanır.",
        "<strong>KKDF ve BSMV:</strong> Bu kesintiler faiz üzerinden alındığı için, silinen faizin KKDF ve BSMV'si de kendiliğinden düşer. Önceki aylarda ödenen faize ait kesintiler ise iade edilmez; çünkü o faiz gerçekten işlemiştir.",
        "<strong>Dosya masrafı:</strong> Kredi kullandırımında alınan tahsis ücreti, erken kapamada genellikle iade edilmez; sözleşmenizi kontrol edin."
      ]
    },
    {
      h: "Erken kapama tutarını araçla adım adım bulun",
      ol: [
        "Ödeme planınızdan ya da internet şubenizden kalan anaparayı, aylık akdi faiz oranını ve kalan taksit sayısını not edin.",
        "Son taksit tarihinizden kapatmayı planladığınız güne kadar geçen gün sayısını [[arac:tarih-farki|Tarih Farkı Hesaplama]] aracıyla bulun.",
        "[[arac:kredi-erken-kapama-hesapla|Kredi Erken Kapama Hesaplama]] aracına bu değerleri, ödeme planınızdaki KKDF ve BSMV toplamını ve sözleşmede varsa tazminat oranını girin.",
        "Araç kapama tutarını ve taksitlere devam etseydiniz ödeyeceğiniz toplamla aradaki farkı gösterir. Sonucu bankanın vereceği kapama tutarıyla karşılaştırın; kuruş farkları yuvarlamadan kaynaklanır."
      ],
      after: [
        "Bankanın verdiği tutar araçtakinden belirgin biçimde yüksekse, kalemlerin dökümünü yazılı olarak isteyin. Döküm, hangi kalemin nereden geldiğini ve tazminat uygulanıp uygulanmadığını açıkça gösterir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kalan taksitleri toplamak:</strong> Kapama tutarı kalan taksitlerin toplamı değildir; gelecek ayların faizi silinir.",
        "<strong>Taksit gününü beklemek:</strong> Beklenen her gün faiz işler; kapatmak için taksit gününü beklemek kazanç sağlamaz.",
        "<strong>İhtiyaç kredisinde tazminat ödemek:</strong> Tüketici kredisinde erken ödeme tazminatı öngörülmez; böyle bir kesinti varsa sorgulayın.",
        "<strong>Konutta sınırı aşan tazminat:</strong> Sabit faizde tazminat %1 ya da %2'yi geçemez; değişken faizde hiç istenemez.",
        "<strong>Ara ödemede seçimi bankaya bırakmak:</strong> Vade kısaltma ile taksit düşürme arasındaki fark yüz binlerce lirayı bulabilir; tercihinizi yazılı olarak bildirin."
      ],
      after: [
        "Yeni bir kredi düşünüyorsanız toplam maliyeti [[arac:kredi-hesapla|Kredi Hesaplama]] ve [[arac:konut-kredisi-hesapla|Konut Kredisi Hesaplama]] araçlarıyla, faiz hesabının mantığını [[rehber:kredi-faizi-nasil-hesaplanir|kredi faizi rehberiyle]] inceleyebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Kredi erken kapatılınca faiz ne kadar düşer?", "Henüz işlememiş ayların faizinin tamamı ve bu faize ait vergiler silinir. Yalnızca kalan anaparayı ve son taksitten kapama gününe kadar işlemiş faizi ödersiniz; tasarruf, kalan vade uzadıkça artar."],
    ["Erken kapama tutarı nasıl hesaplanır?", "Kalan anaparaya, kalan anapara çarpı aylık faiz çarpı geçen gün bölü otuz formülüyle bulunan işlemiş faiz, bu faizin KKDF ve BSMV'si ve sözleşmede varsa erken ödeme tazminatı eklenir."],
    ["Erken ödeme ücreti yüzde kaç?", "Tüketici kredilerinde erken ödeme tazminatı öngörülmez. Sabit faizli konut kredilerinde sözleşmede yazıyorsa kalan vade 36 ay ve altıysa erken ödenen tutarın yüzde biri, 36 aydan fazlaysa yüzde ikisi üst sınırdır."],
    ["Konut kredisinde erken kapama cezası var mı?", "Sabit faizli konut kredisinde sözleşmede öngörülmüşse yüzde bir ya da yüzde iki sınırında erken ödeme tazminatı istenebilir. Değişken faizli konut kredilerinde ise erken ödeme tazminatı talep edilemez."],
    ["Ara ödeme mi yoksa vade kısaltma mı daha avantajlı?", "Aynı ara ödemede vadeyi kısaltmak, taksiti düşürmekten belirgin biçimde daha fazla faiz tasarrufu sağlar. Taksit düşürmek ise aylık bütçeyi rahatlatır; seçim nakit akışınıza göre yapılmalıdır."],
    ["Kredi kapama yazısı nasıl alınır?", "Borç kapandıktan sonra şubeden, internet şubesinden ya da çağrı merkezinden borcu yoktur yazısı talep edebilirsiniz. Konut kredisinde ipoteğin kaldırılması için banka ayrıca tapu müdürlüğüne yazı gönderir."],
    ["Kredi kapatınca sigorta primi iade edilir mi?", "Kredi vadeden önce kapandığında krediyle bağlantılı sigorta sona erer. Peşin ödenmiş primin kalan süreye düşen kısmı poliçe koşullarına göre iade edilebilir; bunun için banka ya da sigorta şirketine başvurmanız gerekir."],
    ["İhtiyaç kredisi erken kapatılınca KKDF iade edilir mi?", "KKDF ve BSMV faiz üzerinden alındığı için silinen gelecek ay faizlerinin kesintileri de düşer. Daha önce işlemiş ve ödenmiş faizlere ait KKDF ve BSMV ise iade edilmez."]
  ],
  tools: ["kredi-erken-kapama-hesapla", "kredi-hesapla", "borc-odeme-plani-hesapla", "konut-kredisi-hesapla"],
  related: ["pesin-mi-taksit-mi-hesaplama", "bilesik-faiz-nedir", "72-kurali-nedir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 6502 sayılı Tüketicinin Korunması Hakkında Kanun", "https://www.mevzuat.gov.tr/"],
    ["Bankacılık Düzenleme ve Denetleme Kurumu", "https://www.bddk.org.tr/"],
    ["Ticaret Bakanlığı – Tüketici hakları", "https://ticaret.gov.tr/"]
  ],
  uyari: "finansal danışmanlık değildir; kesin kapama tutarı için bankanızın yazılı hesabını esas alın"
};
