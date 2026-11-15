export default {
  slug: "serbest-meslek-makbuzu-nasil-hesaplanir",
  kategori: "vergi",
  tarih: "2026-11-15",
  title: "Serbest Meslek Makbuzu Nasıl Hesaplanır? Brüt, Stopaj, KDV ve Net Tutar",
  pageTitle: "Serbest Meslek Makbuzu Hesaplama: Brüt, Stopaj, KDV, Net",
  description: "Serbest meslek makbuzu nasıl hesaplanır? %20 stopaj, %20 KDV, brütten nete ve netten brüte SMM formülleri, şahsa kesilen makbuz ve e-SMM kuralları örnekle.",
  keywords: ["serbest meslek makbuzu hesaplama", "smm hesaplama", "serbest meslek stopaj oranı", "brütten nete smm", "netten brüte serbest meslek makbuzu", "e-smm nasıl kesilir", "smm kdv tevkifatı", "şahsa smm stopaj"],
  lead: "Serbest meslek makbuzunda (SMM) hesap <strong>brüt ücretten başlar: brütün %20'si gelir vergisi stopajı olarak düşülür, %20 KDV eklenir</strong> ve müşterinin size ödeyeceği tutar bulunur. KDV oranı %20 olan bir hizmette stopaj ile KDV birbirini dengelediği için tahsil edilen tutar brüte eşittir: 10.000 TL brütlük makbuzda 2.000 TL stopaj kesilir, 2.000 TL KDV eklenir ve 10.000 TL tahsil edilir. Müşteri şahıssa stopaj kesilmez. Bu rehberde formülleri, netten brüte hesabı, KDV tevkifatını ve e-SMM düzenlemeyi örneklerle anlatıyoruz.",
  kisaCevap: [
    "Stopaj = brüt ücret × %20; müşteri işyeri, şirket, kamu kurumu ya da başka bir serbest meslek erbabıysa keser.",
    "KDV = brüt ücret × KDV oranı; çoğu serbest meslek hizmetinde oran %20'dir.",
    "Tahsil edilecek tutar = brüt − stopaj + KDV; %20 KDV'li hizmette bu tutar brüte eşittir.",
    "Netten brüte: brüt = istenen net ÷ 0,80 (stopaj %20 ise).",
    "Nihai tüketici (şahıs) müşteriye kesilen makbuzda stopaj yoktur; tahsil edilen tutar brüt + KDV'dir.",
    "Kesilen stopaj, serbest meslek erbabının yıllık gelir vergisinden ve geçici vergisinden mahsup edilir; kayıp değildir."
  ],
  figure: {
    alt: "10.000 TL brüt serbest meslek makbuzu: yüzde 20 stopaj 2.000 TL düşülür, yüzde 20 KDV 2.000 TL eklenir, tahsil edilen 10.000 TL; şahsa kesilende stopaj yok, tahsil 12.000 TL.",
    caption: "Aynı 10.000 TL brüt ücretin iki senaryosu. İşyerine kesilen makbuzda stopajı müşteri vergi dairesine öder; şahsa kesilen makbuzda stopaj yoktur.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Serbest meslek makbuzu: 10.000 TL brüt</text>
  <rect x="20" y="50" width="330" height="300" rx="10" class="sf sb"/>
  <rect x="20" y="50" width="330" height="44" rx="10" class="p"/>
  <text x="185" y="78" class="b mid sf">Müşteri şirket / işyeri</text>
  <text x="40" y="128">Brüt ücret</text><text x="330" y="128" class="b end">10.000,00</text>
  <text x="40" y="164" class="dg">− Stopaj %20</text><text x="330" y="164" class="b dg end">2.000,00</text>
  <text x="40" y="200">= Net ücret</text><text x="330" y="200" class="b end">8.000,00</text>
  <text x="40" y="236" class="ok">+ KDV %20</text><text x="330" y="236" class="b ok end">2.000,00</text>
  <line x1="40" y1="254" x2="330" y2="254" class="sb" fill="none"/>
  <rect x="34" y="268" width="302" height="44" rx="8" class="oks"/>
  <text x="48" y="296" class="b">Tahsil edilen</text><text x="322" y="296" class="b lg end">10.000,00</text>
  <text x="185" y="336" class="sm mid mu">Stopajı müşteri muhtasarla öder</text>
  <rect x="370" y="50" width="330" height="300" rx="10" class="sf sb"/>
  <rect x="370" y="50" width="330" height="44" rx="10" class="ps"/>
  <text x="535" y="78" class="b mid">Müşteri şahıs (nihai tüketici)</text>
  <text x="390" y="128">Brüt ücret</text><text x="680" y="128" class="b end">10.000,00</text>
  <text x="390" y="164" class="mu">Stopaj yok</text><text x="680" y="164" class="b mu end">0,00</text>
  <text x="390" y="200">= Net ücret</text><text x="680" y="200" class="b end">10.000,00</text>
  <text x="390" y="236" class="ok">+ KDV %20</text><text x="680" y="236" class="b ok end">2.000,00</text>
  <line x1="390" y1="254" x2="680" y2="254" class="sb" fill="none"/>
  <rect x="384" y="268" width="302" height="44" rx="8" class="oks"/>
  <text x="398" y="296" class="b">Tahsil edilen</text><text x="672" y="296" class="b lg end">12.000,00</text>
  <text x="535" y="336" class="sm mid mu">KDV'yi siz beyan edip ödersiniz</text>
  <text x="360" y="384" class="sm mid t2">Tahsil = Brüt − Stopaj + KDV</text>
</svg>`
  },
  sections: [
    {
      h: "Serbest meslek makbuzu nedir, kimler keser?",
      p: [
        "Serbest meslek makbuzu, avukat, mali müşavir, hekim, mimar, mühendis, danışman, tercüman, yazılımcı, grafik tasarımcı gibi işveren bağımlılığı olmadan kendi nam ve hesabına mesleki faaliyet yürütenlerin yaptıkları tahsilat karşılığında düzenledikleri belgedir. Dayanağı Vergi Usul Kanunu'nun 236. maddesidir: serbest meslek erbabı mesleki faaliyetine ilişkin her türlü tahsilat için makbuz düzenlemek ve bir nüshasını müşteriye vermek zorundadır.",
        "Makbuz, faturadan farklı olarak <strong>tahsilat anında</strong> düzenlenir. Yani işi Mart'ta bitirip ücreti Nisan'da aldıysanız makbuzu Nisan'da kesersiniz. Bu, serbest meslek kazancının tahsil esasına göre vergilendirilmesinin sonucudur.",
        "Makbuzda üç ana tutar bulunur: brüt ücret, kesilen gelir vergisi stopajı ve hesaplanan KDV. Bu üçünden müşterinin size ödeyeceği net tutar türetilir."
      ]
    },
    {
      h: "SMM hesaplama formülleri",
      p: [
        "Gelir Vergisi Kanunu'nun 94. maddesi, serbest meslek ödemelerinde tevkifat (stopaj) oranını brüt ücretin <strong>%20'si</strong> olarak belirler. KDV oranı ise hizmetin türüne göre değişir; avukatlık, danışmanlık, mühendislik, yazılım ve tasarım gibi hizmetlerin büyük çoğunluğunda genel oran olan %20 uygulanır."
      ],
      formula: "Stopaj = Brüt × 0,20\nNet ücret (KDV hariç) = Brüt − Stopaj = Brüt × 0,80\nKDV = Brüt × KDV oranı\nTahsil edilecek = Brüt − Stopaj + KDV",
      after: [
        "KDV her zaman <strong>brüt ücret</strong> üzerinden hesaplanır, stopaj düşülmüş tutar üzerinden değil. Stopaj ise KDV hariç brüt ücretten hesaplanır; KDV'ye stopaj uygulanmaz. Bu iki kural karıştırıldığında makbuz tutarları birkaç yüz lira sapar. Oranları ayrı ayrı kontrol etmek için [[arac:kdv-hesapla|KDV Hesaplama]] ve [[arac:yuzde-hesapla|Yüzde Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Brütten nete çözümlü örnek",
      p: [
        "Bir mali müşavir, bir şirkete aylık danışmanlık hizmeti veriyor ve sözleşmedeki ücret 25.000 TL brüt. Şirket tevkifat yapmakla yükümlü olduğu için stopaj keser."
      ],
      ol: [
        "Stopaj: 25.000 × 0,20 = 5.000 TL.",
        "Net ücret: 25.000 − 5.000 = 20.000 TL.",
        "KDV: 25.000 × 0,20 = 5.000 TL.",
        "Tahsil edilecek: 25.000 − 5.000 + 5.000 = 25.000 TL.",
        "Şirket 5.000 TL stopajı ertesi ayın 26'sına kadar muhtasar ve prim hizmet beyannamesiyle vergi dairesine öder; mali müşavir 5.000 TL KDV'yi kendi KDV beyannamesinde beyan eder."
      ],
      after: [
        "Müşavirin hesabına giren 25.000 TL'nin 5.000 TL'si devlete ödenecek KDV'dir; kendisine kalan net ücret 20.000 TL'dir. Kesilen 5.000 TL stopaj ise yıl sonunda verdiği gelir vergisi beyannamesinde hesaplanan vergiden düşülür."
      ]
    },
    {
      h: "Netten brüte SMM nasıl hesaplanır?",
      p: [
        "Çoğu zaman pazarlık \"elime net şu kadar geçsin\" diye yapılır. Bu durumda brüt ücreti bulmak için istenen net tutar stopaj sonrası oranına bölünür. Stopaj %20 ise bölen 0,80'dir."
      ],
      formula: "Brüt = İstenen net ÷ (1 − 0,20) = İstenen net ÷ 0,80\nKDV dahil tahsil edilecek = Brüt × (1 − 0,20 + KDV oranı)",
      table: {
        head: ["İstenen net (KDV hariç)", "Brüt ücret", "Stopaj %20", "KDV %20", "Tahsil edilecek"],
        rows: [
          ["8.000,00", "10.000,00", "2.000,00", "2.000,00", "10.000,00"],
          ["10.000,00", "12.500,00", "2.500,00", "2.500,00", "12.500,00"],
          ["20.000,00", "25.000,00", "5.000,00", "5.000,00", "25.000,00"],
          ["40.000,00", "50.000,00", "10.000,00", "10.000,00", "50.000,00"]
        ],
        caption: "Stopajlı ve %20 KDV'li makbuzlarda tahsil edilen tutar brüte eşittir. KDV oranı farklıysa son sütun değişir."
      },
      after: [
        "Örneğin elinize KDV hariç 10.000 TL geçmesini istiyorsanız makbuzu 10.000 ÷ 0,80 = 12.500 TL brüt olarak düzenlemelisiniz. Müşteri şahıssa stopaj olmadığı için brüt doğrudan istenen nettir; yalnızca üzerine KDV eklenir."
      ]
    },
    {
      h: "Şahsa kesilen makbuz ve stopajı kim öder?",
      p: [
        "Stopaj, ödemeyi yapan tarafın yükümlülüğüdür. Kamu idareleri, şirketler, bilanço ya da işletme esasına göre defter tutan tacirler, serbest meslek erbabı ve bazı çiftçiler yaptıkları serbest meslek ödemelerinden %20 kesip muhtasar beyannameyle vergi dairesine yatırır. Makbuzu düzenleyen kişi bu tutarı tahsil etmez.",
        "Müşteri bir şahıs, yani nihai tüketiciyse (örneğin boşanma davası için avukat tutan bir vatandaş ya da muayeneye gelen hasta) tevkifat yapma yükümlülüğü yoktur. Bu durumda makbuzda stopaj satırı sıfır olur, brüt ücret ve KDV tahsil edilir.",
        "Stopajın asıl yükünü yine de serbest meslek erbabı taşır, çünkü bu tutar onun gelir vergisine mahsuben ödenmiş bir avanstır. Yıl sonunda yıllık beyannamede serbest meslek kazancının vergisi ücret dışı gelir tarifesine göre hesaplanır, yıl içinde kesilen stopajlar ve ödenen geçici vergiler bu vergiden düşülür. Vergi dilim hesabı için [[arac:gelir-vergisi-hesapla|Gelir Vergisi Hesaplama]] aracını ve [[bilgi:gelir-vergisi-dilimleri-2026|gelir vergisi dilimleri]] yazımızı inceleyebilirsiniz."
      ]
    },
    {
      h: "SMM'de KDV tevkifatı var mı?",
      p: [
        "Genel kuralda serbest meslek makbuzunda KDV tevkifatı yoktur; KDV'nin tamamı makbuzu düzenleyen kişi tarafından beyan edilir. Ancak KDV Genel Uygulama Tebliği, kamu kurumları ve büyük ölçekli şirketler gibi <strong>belirlenmiş alıcılara</strong> verilen bazı hizmetlerde (örneğin danışmanlık, etüt-proje, denetim gibi hizmet türlerinde) KDV'nin bir kısmının alıcı tarafından sorumlu sıfatıyla beyan edilmesini öngörür.",
        "Tevkifat uygulanıyorsa makbuzda hesaplanan KDV'nin tebliğde belirtilen oranı (örneğin onda dokuzu) alıcı tarafından ödenir, size yalnızca kalan kısım ödenir. Hangi hizmette hangi oranın uygulanacağı tebliğde tek tek sayılmıştır ve değişebilir; makbuz düzenlemeden önce müşterinin belirlenmiş alıcı olup olmadığını ve hizmetinizin listede yer alıp almadığını Gelir İdaresi Başkanlığı'ndan kontrol edin."
      ]
    },
    {
      h: "Avukat, hekim ve yazılımcı için özel durumlar",
      ul: [
        "<strong>Avukatlar:</strong> Avukatlık ücreti %20 stopaja ve genel oranda KDV'ye tabidir. Müvekkil şahıs olduğunda stopaj kesilmez. Karşı taraftan tahsil edilen vekâlet ücretinde de makbuz düzenlenir.",
        "<strong>Hekimler:</strong> Muayenehane hekimleri hastaya makbuz keser; hasta şahıs olduğu için stopaj yoktur. Sağlık hizmetlerinde KDV oranı hizmetin türüne göre genel orandan farklı olabilir; güncel oranı GİB'in KDV oran listesinden kontrol edin.",
        "<strong>Yazılımcı ve tasarımcılar:</strong> Yurt içindeki şirketlere verilen hizmette %20 stopaj ve %20 KDV uygulanır. Yurt dışındaki müşteriye verilen ve yurt dışında yararlanılan hizmetler şartları sağlıyorsa hizmet ihracatı sayılabilir; bu durumda KDV ve stopaj kuralları farklıdır, bir mali müşavire danışın.",
        "<strong>Birden çok müşteri:</strong> Aynı ay içinde hem şirketlere hem şahıslara hizmet veriyorsanız her makbuzu müşterinin durumuna göre ayrı düzenleyin; stopajlı ve stopajsız makbuzlar yıl sonunda aynı beyannamede toplanır, yalnızca stopajlı olanlardaki kesintiler mahsup edilir."
      ]
    },
    {
      h: "E-SMM nasıl düzenlenir?",
      ol: [
        "Serbest meslek erbabı, Vergi Usul Kanunu Genel Tebliği (Sıra No: 509) kapsamında makbuzlarını elektronik ortamda, yani e-SMM olarak düzenlemek zorundadır.",
        "E-SMM, Gelir İdaresi Başkanlığı'nın ücretsiz portalından ya da GİB'den izinli özel entegratör yazılımlarından kesilebilir.",
        "Makbuzda müşterinin adı veya unvanı, vergi ya da TC kimlik numarası, hizmetin açıklaması, brüt ücret, stopaj, KDV oranı ve tutarı, tahsil edilen tutar yer alır.",
        "Müşteri tevkifat yükümlüsüyse stopaj alanını doldurun; şahıssa boş bırakın.",
        "Makbuz, tahsilatın yapıldığı gün düzenlenir ve müşteriye elektronik ortamda iletilir; kâğıt çıktı istenirse e-SMM'nin baskısı verilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>KDV'yi net üzerinden hesaplamak:</strong> KDV brüt ücret üzerinden hesaplanır.",
        "<strong>Şahsa stopajlı makbuz kesmek:</strong> Nihai tüketici tevkifat yapamaz; stopaj satırı boş kalmalıdır.",
        "<strong>Makbuzu iş bitince kesmek:</strong> SMM tahsilat anında düzenlenir.",
        "<strong>Stopajı gelir kaybı sanmak:</strong> Kesilen stopaj yıllık beyannamede vergiden mahsup edilir; fazla kesilen kısım iade ya da mahsup konusu olabilir.",
        "<strong>Netten brüte hesabı 1,20 ile yapmak:</strong> Brüt bulmak için istenen net 0,80'e bölünür; 1,20 ile çarpmak eksik sonuç verir (10.000 × 1,20 = 12.000, doğrusu 12.500)."
      ]
    }
  ],
  faq: [
    ["Serbest meslek makbuzu nasıl hesaplanır?", "Brüt ücretten %20 stopaj düşülür, brüt ücret üzerinden KDV eklenir; tahsil edilecek tutar brüt eksi stopaj artı KDV'dir. 10.000 TL brütte 2.000 TL stopaj, 2.000 TL KDV hesaplanır ve şirket müşteriden 10.000 TL tahsil edilir."],
    ["SMM'de stopaj oranı yüzde kaç?", "Gelir Vergisi Kanunu'nun 94. maddesine göre serbest meslek ödemelerinde stopaj oranı brüt ücretin yüzde 20'sidir. Bu tutarı ödemeyi yapan şirket, kamu kurumu veya tacir keser ve muhtasar beyannameyle vergi dairesine öder."],
    ["Netten brüte SMM nasıl hesaplanır?", "Stopaj yüzde 20 olduğunda brüt ücret, elinize geçmesini istediğiniz KDV hariç net tutarın 0,80'e bölünmesiyle bulunur. Örneğin 10.000 TL net için brüt 12.500 TL olur; üzerine 2.500 TL KDV eklenir, 2.500 TL stopaj kesilir."],
    ["SMM'de KDV tevkifatı var mı?", "Genel kuralda yoktur. Ancak kamu kurumları ve büyük şirketler gibi belirlenmiş alıcılara verilen danışmanlık, etüt-proje, denetim gibi bazı hizmetlerde KDV'nin bir kısmını alıcı öder. Hizmetinizin kapsamda olup olmadığını GİB tebliğinden kontrol edin."],
    ["Şahsa kesilen SMM'de stopaj olur mu?", "Hayır. Nihai tüketici olan şahısların tevkifat yapma yükümlülüğü yoktur. Şahsa kesilen makbuzda stopaj satırı sıfırdır; brüt ücret ve üzerine eklenen KDV birlikte tahsil edilir, KDV'yi serbest meslek erbabı beyan eder."],
    ["E-SMM nasıl düzenlenir?", "E-SMM, Gelir İdaresi Başkanlığı'nın ücretsiz portalından ya da izinli özel entegratör yazılımlarından tahsilat günü düzenlenir. Müşteri bilgileri, hizmet açıklaması, brüt ücret, stopaj, KDV ve tahsil edilen tutar yazılır ve makbuz müşteriye elektronik olarak iletilir."],
    ["SMM'deki stopajı kim öder?", "Stopajı ödemeyi yapan müşteri keser ve ertesi ayın 26'sına kadar muhtasar beyannameyle vergi dairesine yatırır. Ekonomik yükü ise makbuzu düzenleyen taşır; ancak bu tutar yıllık gelir vergisinden mahsup edildiği için peşin ödenmiş vergi niteliğindedir."],
    ["Avukat ve doktor SMM'si nasıl hesaplanır?", "Aynı formül kullanılır: brüt ücret, varsa yüzde 20 stopaj ve hizmetin KDV oranı. Müvekkil ya da hasta şahıs olduğunda stopaj kesilmez. Sağlık hizmetlerinde KDV oranı farklı olabileceği için güncel oranı GİB'den kontrol etmek gerekir."],
    ["SMM ile fatura arasındaki fark nedir?", "Serbest meslek erbabı mesleki tahsilatları için fatura değil serbest meslek makbuzu düzenler ve bunu tahsilat anında yapar. Fatura ise ticari kazanç sahiplerinin mal ve hizmet teslimlerinde kullandığı belgedir ve teslim ya da hizmet tarihinden itibaren belirli sürede düzenlenir."]
  ],
  tools: ["kdv-hesapla", "yuzde-hesapla", "gelir-vergisi-hesapla", "kira-stopaj-hesapla"],
  related: ["gelir-vergisi-dilimleri-2026", "kira-geliri-vergisi-nasil-hesaplanir"],
  sources: [
    ["Gelir İdaresi Başkanlığı – Serbest meslek kazancı ve e-SMM", "https://www.gib.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 193 sayılı Gelir Vergisi Kanunu md. 94", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "vergi tavsiyesi değildir, kendi durumunuz için mali müşavirinize danışın"
};
