export default {
  slug: "doldurulabilir-pdf-form-nedir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Doldurulabilir PDF Form Nedir? PDF Form Doldurma, Kaydetme ve Düzleştirme",
  pageTitle: "Doldurulabilir PDF Form Nedir? Doldurma, Kaydetme, Düzleştirme",
  description: "Doldurulabilir PDF form, içine yazı yazılabilen alanlar taşıyan PDF'tir. Formu doldurma, boş görünme sorunu, düzleştirme (flatten) ve imza ekleme adımları.",
  keywords: ["pdf form doldurma", "doldurulabilir pdf", "pdf form alanları", "pdf form kaydetme", "pdf düzleştirme", "flatten pdf nedir", "dilekçe pdf doldurma", "pdf onay kutusu", "telefonda pdf doldurma"],
  lead: "Doldurulabilir PDF form, sayfasında metin kutusu, onay kutusu, seçenek düğmesi ya da açılır liste gibi <strong>etkileşimli alanlar</strong> bulunan PDF dosyasıdır; bu alanlara yazdığınız bilgiler dosyanın içine kaydedilir. Formu doldurup kaydettikten sonra bazı programlarda yazdıklarınızın boş görünmesi, alanların görünüm bilgisinin eksik oluşturulmasından kaynaklanır. Kurumlara gönderilecek formu düzleştirmek (flatten), alanları sayfanın sabit parçası hâline getirir ve bu sorunu da ortadan kaldırır. Bu sayfada form türlerini, doldurma ve kaydetme adımlarını, alanı olmayan PDF'e yazı eklemeyi ve imza konusunu bulacaksınız.",
  kisaCevap: [
    "Doldurulabilir PDF formda alanlar sayfanın üstünde ayrı nesneler olarak durur; değerleri dosyanın form bölümünde saklanır.",
    "En yaygın form teknolojisi AcroForm'dur; eski bir Adobe biçimi olan XFA formlar birçok görüntüleyicide hiç açılmaz ya da boş görünür.",
    "Doldurulan form başka programda boş görünüyorsa alanların görünüm (appearance) verisi oluşturulmamıştır; düzleştirme bu sorunu çözer.",
    "Düzleştirme (flatten), alanları ve içlerindeki yazıyı sayfanın normal içeriğine çevirir; artık değiştirilemez ama her yerde aynı görünür.",
    "Form alanı olmayan bir PDF'e yazı eklemek için metni sayfanın üstüne ek bir katman olarak yerleştirmeniz gerekir.",
    "Sayfaya eklenen imza resmi görsel bir imzadır; 5070 sayılı Kanun'daki güvenli elektronik imzanın yerini tutmaz."
  ],
  figure: {
    alt: "Doldurulabilir PDF formun üç aşaması: boş form alanları, doldurulmuş ama hâlâ düzenlenebilir alanlar ve düzleştirilmiş, sabit sayfa. Her aşamada dosyada neyin saklandığı yazıyor.",
    caption: "Soldan sağa: boş form, doldurulmuş form ve düzleştirilmiş form. Ortadaki aşamada değerler ayrı alan verisi olarak durur; sağdaki aşamada yazı sayfanın kalıcı içeriğine dönüşür ve hangi programda açılırsa açılsın aynı görünür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir PDF formun üç hâli</text>
  <g>
    <rect x="20" y="52" width="210" height="250" rx="10" class="sf sb"/>
    <text x="125" y="78" class="b mid">1. Boş form</text>
    <text x="38" y="108" class="sm t2">Ad Soyad</text>
    <rect x="38" y="114" width="174" height="28" rx="4" class="ps"/>
    <text x="38" y="164" class="sm t2">Başvuru türü</text>
    <rect x="38" y="172" width="16" height="16" rx="3" class="sf sb"/><text x="62" y="185" class="sm">Yeni</text>
    <rect x="120" y="172" width="16" height="16" rx="3" class="sf sb"/><text x="144" y="185" class="sm">Yenileme</text>
    <text x="38" y="214" class="sm t2">İl</text>
    <rect x="38" y="220" width="174" height="28" rx="4" class="ps"/><text x="198" y="239" class="sm end mu">▾</text>
    <text x="125" y="284" class="sm mid mu">Alanlar etkileşimli</text>
  </g>
  <g>
    <rect x="255" y="52" width="210" height="250" rx="10" class="sf sb"/>
    <text x="360" y="78" class="b mid">2. Doldurulmuş</text>
    <text x="273" y="108" class="sm t2">Ad Soyad</text>
    <rect x="273" y="114" width="174" height="28" rx="4" class="ps"/><text x="282" y="133" class="sm b">Ayşe Yılmaz</text>
    <text x="273" y="164" class="sm t2">Başvuru türü</text>
    <rect x="273" y="172" width="16" height="16" rx="3" class="p"/><text x="281" y="185" class="sm mid sf b">✓</text><text x="297" y="185" class="sm">Yeni</text>
    <rect x="355" y="172" width="16" height="16" rx="3" class="sf sb"/><text x="379" y="185" class="sm">Yenileme</text>
    <text x="273" y="214" class="sm t2">İl</text>
    <rect x="273" y="220" width="174" height="28" rx="4" class="ps"/><text x="282" y="239" class="sm b">Ankara</text>
    <text x="360" y="284" class="sm mid p b">Değerler hâlâ değiştirilebilir</text>
  </g>
  <g>
    <rect x="490" y="52" width="210" height="250" rx="10" class="sf sb"/>
    <text x="595" y="78" class="b mid">3. Düzleştirilmiş</text>
    <text x="508" y="108" class="sm t2">Ad Soyad</text>
    <line x1="508" y1="142" x2="682" y2="142" class="sb" fill="none"/><text x="510" y="134" class="sm b">Ayşe Yılmaz</text>
    <text x="508" y="164" class="sm t2">Başvuru türü</text>
    <text x="508" y="185" class="sm b">✓ Yeni</text><text x="590" y="185" class="sm">☐ Yenileme</text>
    <text x="508" y="214" class="sm t2">İl</text>
    <line x1="508" y1="248" x2="682" y2="248" class="sb" fill="none"/><text x="510" y="240" class="sm b">Ankara</text>
    <text x="595" y="284" class="sm mid ok b">Sayfanın sabit içeriği</text>
  </g>
  <line x1="232" y1="176" x2="252" y2="176" class="sp sw" fill="none"/>
  <line x1="467" y1="176" x2="487" y2="176" class="sp sw" fill="none"/>
  <rect x="20" y="320" width="680" height="84" rx="10" class="ps"/>
  <text x="38" y="346" class="b">Dosyada ne saklanıyor?</text>
  <text x="38" y="370" class="sm">2. aşama: alan adı + değer + (varsa) görünüm verisi. Görünüm yoksa bazı programlar alanı boş gösterir.</text>
  <text x="38" y="392" class="sm">3. aşama: değerler çizilmiş metindir; form verisi silinir, her görüntüleyicide aynı görünür.</text>
</svg>`
  },
  sections: [
    {
      h: "Doldurulabilir PDF form nedir, normal PDF'ten farkı ne?",
      p: [
        "Sıradan bir PDF sayfası yazdırılmış bir kâğıt gibidir: üzerindeki çizgiler, kutular ve yazılar sabittir. Bir dilekçe ya da başvuru formunu sıradan PDF olarak indirdiyseniz kutuların içine tıkladığınızda hiçbir şey olmaz; doldurmak için yazdırıp elle yazmanız ya da üstüne yazı eklemeniz gerekir.",
        "Doldurulabilir PDF formda ise kutular gerçek <strong>form alanlarıdır</strong>. Her alanın bir adı, türü ve değeri vardır. Bir metin kutusuna tıklayıp yazabilir, onay kutusunu işaretleyebilir, açılır listeden il seçebilirsiniz. Yazdıklarınız sayfanın çizgilerine karışmaz; dosyanın içinde ayrı bir form bölümünde saklanır ve sonradan değiştirilebilir.",
        "Kurumlar bu formları sever, çünkü doldurulan değerler makine tarafından okunabilir ve alan biçimleri (tarih, sayı, zorunlu alan) önceden tanımlanabilir. Kullanıcı açısından avantajı ise yazının düzgün ve okunaklı olması, el yazısı hatalarının ortadan kalkmasıdır."
      ]
    },
    {
      h: "PDF form alanı türleri",
      p: [
        "PDF standardı birkaç temel alan türü tanımlar. Formu doldururken hangi alanla karşılaştığınızı bilmek, beklenmeyen davranışları anlamanızı kolaylaştırır."
      ],
      table: {
        head: ["Alan türü", "Ne işe yarar?", "Dikkat edilecek nokta"],
        rows: [
          ["Metin kutusu", "Ad, adres, açıklama gibi serbest yazı", "Karakter sınırı ya da biçim (tarih, sayı) tanımlı olabilir"],
          ["Çok satırlı metin", "Uzun açıklama, gerekçe", "Taşan metin küçülür ya da kesilir; önizlemeyi kontrol edin"],
          ["Onay kutusu", "Evet/hayır, kabul ediyorum", "Aynı adlı kutular birlikte işaretlenebilir"],
          ["Seçenek düğmesi", "Gruptan yalnızca birini seçme", "Bir seçim yapıldıktan sonra genellikle boş bırakılamaz"],
          ["Açılır liste", "İl, bölüm, ünvan seçimi", "Listede olmayan değer yazılamayabilir"],
          ["İmza alanı", "Dijital imza için ayrılmış yer", "Resim yapıştırmak dijital imza oluşturmaz"]
        ]
      },
      after: [
        "Teknik olarak iki form ailesi vardır. <strong>AcroForm</strong>, PDF standardının parçasıdır ve neredeyse tüm görüntüleyicilerde çalışır. <strong>XFA</strong> ise bir dönem bazı kurumların kullandığı, XML tabanlı ve yalnızca belirli masaüstü programlarında açılan eski bir biçimdir. XFA bir form tarayıcıda açıldığında genellikle \"bu belgeyi görüntülemek için daha yeni bir program gerekir\" türünden tek bir sayfa görünür. Böyle bir dosyayı ancak destekleyen bir masaüstü programla doldurabilir ya da kurumdan AcroForm sürümünü isteyebilirsiniz."
      ]
    },
    {
      h: "PDF formu bilgisayarda nasıl doldurulur?",
      p: [
        "Formun gerçekten doldurulabilir olup olmadığını anlamanın en hızlı yolu, kutulardan birine tıklamaktır. İmleç yanıp sönüyorsa ya da kutu renkleniyorsa alan vardır. Hiçbir tepki yoksa dosya düz PDF'tir; bir sonraki bölümdeki yöntemi kullanmanız gerekir."
      ],
      ol: [
        "Formu açın. [[arac:pdf-form-doldur|PDF Form Doldur aracı]], dosyadaki tüm metin, onay kutusu, seçenek ve liste alanlarını sırayla gösterir; dosyanız tarayıcınızdan çıkmaz.",
        "Alanları sırayla doldurun. Tarih alanlarında formun istediği biçime (gün.ay.yıl gibi) uyun; büyük harf isteniyorsa Türkçe İ ve I harflerine dikkat edin.",
        "Onay kutularını ve seçenekleri işaretleyin. Aynı soruya ait seçeneklerden yalnızca birinin seçili olduğunu kontrol edin.",
        "Gönderim amacına göre kaydedin: sonradan düzeltme yapacaksanız alanları açık bırakın; kuruma gönderecekseniz alanları kilitleyerek ya da düzleştirerek indirin.",
        "İndirdiğiniz dosyayı başka bir görüntüleyicide, örneğin [[arac:pdf-ac|PDF Aç aracında]] açarak yazdıklarınızın göründüğünü doğrulayın."
      ],
      after: [
        "Son adım çoğu zaman atlanır ama en önemlisidir. Kendi bilgisayarınızda düzgün görünen bir form, karşı tarafın kullandığı programda boş görünebilir. Bunun nedenini ve çözümünü aşağıda anlatıyoruz."
      ]
    },
    {
      h: "Doldurduğum PDF neden boş görünüyor?",
      p: [
        "PDF'te bir form alanının iki ayrı bilgisi vardır: <strong>değer</strong> (\"Ayşe Yılmaz\") ve bu değerin sayfada nasıl çizileceğini anlatan <strong>görünüm verisi</strong> (yazı tipi, boyut, konum). Bazı programlar formu kaydederken yalnızca değeri yazar ve görünümü, dosyayı açacak programın üretmesini bekler. Görünümü kendisi üretmeyen bir görüntüleyici ise alanı boş gösterir.",
        "Aynı sorun farklı biçimlerde ortaya çıkabilir: telefonda dolu görünen form bilgisayarda boş açılır, ekranda dolu görünen form yazdırıldığında boş çıkar ya da karşı taraf \"formu boş göndermişsiniz\" der. Türkçe karakterlerde ise görünüm yazı tipi bu harfleri içermediği için ş, ğ, ı gibi harfler kaybolabilir ya da soru işaretine dönüşebilir."
      ],
      ul: [
        "<strong>Çözüm 1 – Düzleştirin:</strong> Doldurulmuş formu düzleştirdiğinizde değerler sayfaya çizilir; artık görünüm verisine ihtiyaç kalmaz.",
        "<strong>Çözüm 2 – Türkçe karakter destekli araçla doldurun:</strong> Görünümü Türkçe harfleri içeren bir yazı tipiyle üreten araç, harf kaybını önler.",
        "<strong>Çözüm 3 – Yazdırarak PDF alın:</strong> Son çare olarak formu PDF yazıcısına yazdırmak da düzleştirme etkisi yaratır; ancak metin seçilebilirliği ve kalite düşebilir."
      ]
    },
    {
      h: "PDF düzleştirme (flatten) ne demek, kurumlar neden ister?",
      p: [
        "Düzleştirme, form alanlarını ve yorum notlarını dosyanın etkileşimli katmanından çıkarıp sayfanın kalıcı içeriğine dönüştürmektir. İşlem bittiğinde alanlara tıklanamaz, değerler değiştirilemez; sayfa, doldurulmuş hâliyle yazdırılmış bir kâğıt gibi davranır. [[arac:pdf-duzlestir|PDF Düzleştir aracı]] bunu iki yolla yapar: alanları metin olarak sayfaya çizer ya da istenirse her sayfayı görüntüye çevirerek tamamen değiştirilemez bir kopya üretir."
      ],
      table: {
        head: ["Özellik", "Doldurulmuş form", "Düzleştirilmiş form"],
        rows: [
          ["Değer değiştirilebilir mi?", "Evet", "Hayır (alanlar kalkar)"],
          ["Her programda aynı görünür mü?", "Her zaman değil", "Evet"],
          ["Yazdırma güvenilirliği", "Programa bağlı", "Yüksek"],
          ["Makineyle alan okuma", "Mümkün", "Mümkün değil (metin olarak kalır)"],
          ["Dosya boyutu", "Genellikle küçük", "Metin modunda benzer, görüntü modunda büyür"]
        ]
      },
      after: [
        "Kurumların düzleştirilmiş PDF istemesinin üç nedeni vardır: belgenin her bilgisayarda aynı görünmesi, gönderildikten sonra kimse tarafından fark edilmeden değiştirilememesi ve arşivleme sistemlerinin form alanlarını tutarsız işlemesi. Uzun süreli arşiv için ayrıca PDF/A biçimi istenebilir; ayrıntısı [[bilgi:pdf-a-nedir-arsiv-pdf-farki|PDF/A nedir yazısında]] anlatılıyor.",
        "Düzleştirmeden önce mutlaka düzenlenebilir bir kopya saklayın. Düzleştirilmiş dosyada bir yazım hatası fark ederseniz düzeltmek için formu baştan doldurmanız gerekir."
      ]
    },
    {
      h: "Form alanı olmayan PDF'e nasıl yazı yazılır?",
      p: [
        "Birçok kurum formlarını hâlâ taranmış ya da düz PDF olarak yayımlar. Böyle bir dosyada tıklanacak alan yoktur, ama sayfanın üstüne yeni bir metin katmanı eklemek mümkündür. Bu yöntemde yazıyı kendiniz konumlandırırsınız; kutuların hizasına dikkat etmek gerekir.",
        "Pratik yol şudur: metni ekleyeceğiniz sayfayı görüntüleyin, yazacağınız noktayı belirleyin, yazı boyutunu kutunun yüksekliğine göre seçin (çoğu formda 10–11 punto yeterlidir) ve ekledikten sonra yakınlaştırarak taşma olup olmadığını kontrol edin. Taranmış formlarda sayfa hafif eğik olabilir; uzun satırlarda yazının çizgiden kaymaması için satırları kısa tutun.",
        "Taranmış bir formu sık dolduruyorsanız, bir kez doldurulabilir form hâline getirmek uzun vadede zaman kazandırır. Ancak resmî bir kurumun formunu değiştirip yeniden dağıtmayın; yalnızca kendi kullanımınız için doldurun."
      ]
    },
    {
      h: "Doldurulan PDF'e imza eklemek: görsel imza ile e-imza farkı",
      p: [
        "Formu doldurduktan sonra imza alanına el imzanızın görüntüsünü yerleştirmek mümkündür. [[arac:pdf-imzala|PDF İmzala aracı]] imzanızı çizmenize, resmini yüklemenize ya da adınızı yazmanıza ve sayfada istediğiniz yere koymanıza izin verir. Adım adım anlatım için [[rehber:pdf-imzalama-nasil-yapilir|PDF imzalama rehberine]] bakabilirsiniz.",
        "Bu yöntemle oluşan şey <strong>görsel imzadır</strong>: kâğıda atılmış imzanın taranmış hâline benzer. 5070 sayılı Elektronik İmza Kanunu'ndaki güvenli elektronik imza ise elektronik sertifika ile oluşturulur ve belgenin imzadan sonra değiştirilip değiştirilmediğini matematiksel olarak doğrular. Bir kurum e-imza ya da mobil imza istiyorsa resim eklemek bu şartı karşılamaz.",
        "Doğru sıra şudur: önce formu doldurun, sonra görsel imzayı ekleyin, en son düzleştirin. Önce düzleştirip sonra imza eklerseniz imza ayrı bir katman olarak kalır ve bazı sistemlerde kayabilir."
      ]
    },
    {
      h: "Telefonda PDF form doldurmak",
      p: [
        "Güncel mobil tarayıcılar ve dosya uygulamaları AcroForm alanlarını genellikle tanır; kutuya dokunduğunuzda klavye açılır. Sorunlar daha çok küçük ekranda yanlış alana dokunma, otomatik büyük harf ve otomatik düzeltme özelliklerinin isimleri değiştirmesi ve kaydedilen dosyanın nereye gittiğinin bulunamaması şeklinde yaşanır.",
        "Telefonda doldurduğunuz formu göndermeden önce mutlaka yeniden açıp kontrol edin. En güvenli yol, formu doldurduktan sonra düzleştirerek kaydetmektir; böylece karşı taraf hangi cihazı kullanırsa kullansın aynı sayfayı görür. Bilişim Ajans araçları mobil tarayıcıda da çalışır ve dosyayı hiçbir sunucuya göndermez."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Formu tarayıcıda doldurup yalnızca \"kaydet\" demek:</strong> Bazı görüntüleyiciler değişiklikleri kaydetmez ya da orijinal dosyanın üstüne yazmaz. Kaydettiğiniz dosyayı yeniden açarak doğrulayın.",
        "<strong>Düzleştirilmiş kopyanın tek kopya olması:</strong> Düzeltme gerekirse baştan başlamak zorunda kalırsınız; düzenlenebilir sürümü saklayın.",
        "<strong>Türkçe karakterleri kontrol etmemek:</strong> İsim ve adres alanlarında ş, ğ, ı, İ harflerinin doğru göründüğünden emin olun.",
        "<strong>Uzun metni küçük kutuya sığdırmaya çalışmak:</strong> Yazı otomatik küçülüp okunmaz hâle gelebilir; gerekirse \"ekte açıklanmıştır\" yazıp ek sayfa kullanın.",
        "<strong>Görsel imzayı e-imza sanmak:</strong> Kurum e-imza istiyorsa resim eklemek yeterli değildir.",
        "<strong>Şifreli PDF'i zorlamak:</strong> Düzenleme izni kapatılmış bir formda alanlar kilitli olabilir; formu yayımlayan kurumdan düzenlenebilir sürümü isteyin."
      ]
    }
  ],
  faq: [
    ["Doldurulabilir PDF form nedir?", "İçinde metin kutusu, onay kutusu, seçenek düğmesi ve açılır liste gibi etkileşimli alanlar bulunan PDF dosyasıdır. Alanlara yazılan değerler dosyanın içinde saklanır ve sonradan değiştirilebilir."],
    ["PDF formu bilgisayarda nasıl doldurulur?", "Dosyayı form alanlarını destekleyen bir görüntüleyicide ya da PDF Form Doldur aracında açın, alanları sırayla doldurun, kaydedin ve dosyayı farklı bir programda yeniden açarak yazdıklarınızın göründüğünü kontrol edin."],
    ["Doldurduğum PDF neden boş görünüyor?", "Kaydeden program alan değerini yazmış ama sayfada nasıl çizileceğini anlatan görünüm verisini oluşturmamış olabilir. Görünümü kendisi üretmeyen görüntüleyiciler alanı boş gösterir; formu düzleştirmek bu sorunu kalıcı olarak çözer."],
    ["PDF'i düzleştirmek (flatten) ne demek?", "Düzleştirme, form alanlarını ve içlerindeki değerleri sayfanın sabit içeriğine dönüştürmektir. Sonrasında alanlara tıklanamaz ve değerler değiştirilemez, ama belge her programda ve yazdırıldığında aynı görünür."],
    ["Form alanı olmayan PDF'e nasıl yazı yazılır?", "Sayfanın üstüne ayrı bir metin katmanı eklemeniz gerekir. Yazıyı kutuların hizasına göre konumlandırın, 10–11 punto civarı bir boyut seçin ve yakınlaştırarak taşma olmadığını kontrol edin."],
    ["Doldurulan PDF'e imza nasıl eklenir?", "Formu doldurduktan sonra imzanızı çizerek, resmini yükleyerek ya da adınızı yazarak imza alanına yerleştirebilirsiniz. Bu görsel imzadır; kurum e-imza ya da mobil imza istiyorsa yerine geçmez."],
    ["Telefonda PDF form doldurulabilir mi?", "Evet, güncel mobil tarayıcıların çoğu AcroForm alanlarını tanır. Otomatik düzeltmenin isimleri değiştirmemesine dikkat edin ve formu göndermeden önce düzleştirerek her cihazda aynı görünmesini sağlayın."],
    ["Kurumlar neden düzleştirilmiş PDF ister?", "Düzleştirilmiş belge her bilgisayarda aynı görünür, gönderildikten sonra kolayca değiştirilemez ve arşiv sistemlerinde sorun çıkarmaz. Form alanları ise farklı programlarda boş ya da bozuk görünebilir."],
    ["XFA form nedir, neden açılmıyor?", "XFA, bazı kurumların bir dönem kullandığı XML tabanlı eski bir form biçimidir ve yalnızca belirli masaüstü programlarında çalışır. Tarayıcılarda genellikle uyarı sayfası görünür; kurumdan standart PDF formu isteyebilirsiniz."]
  ],
  tools: ["pdf-form-doldur", "pdf-duzlestir", "pdf-imzala", "pdf-ac"],
  related: ["pdf-a-nedir-arsiv-pdf-farki", "pdf-sayfa-silme-ve-dondurme"],
  sources: [
    ["ISO – ISO 32000 PDF standardı", "https://www.iso.org/"],
    ["Mevzuat Bilgi Sistemi – 5070 sayılı Elektronik İmza Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
