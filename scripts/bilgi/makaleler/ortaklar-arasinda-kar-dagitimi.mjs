export default {
  slug: "ortaklar-arasinda-kar-dagitimi",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Ortaklar Arasında Kâr Nasıl Dağıtılır? Hisse Oranı, Emek Payı ve Örnek",
  pageTitle: "Ortaklar Arasında Kâr Dağıtımı: Hisse Oranı, Emek Payı, Örnek",
  description: "Adi ortaklıkta sözleşme yoksa kâr ve zarar eşit paylaşılır (TBK md. 623); şirketlerde kâr sermaye payına göre dağıtılır. Emek payı, maaş, vergi ve çözümlü örnekler.",
  keywords: ["ortaklar arası kâr dağıtımı", "ortaklık payı hesaplama", "kâr payı nasıl hesaplanır", "emek ortaklığı", "sermaye ve emek payı", "adi ortaklık kâr paylaşımı", "ortaklık sözleşmesi kâr maddesi", "limited şirket kâr payı"],
  lead: "Ortaklar arasında kâr, <strong>öncelikle ortaklık sözleşmesinde yazılan orana göre dağıtılır</strong>. Sözleşmede hüküm yoksa Türk Borçlar Kanunu'nun 623. maddesine göre adi ortaklıkta her ortak, getirdiği payın değerine bakılmaksızın kâr ve zarara <strong>eşit</strong> katılır. Limited ve anonim şirketlerde ise kâr payı kural olarak sermaye payı oranında hesaplanır; dağıtımdan önce vergiler ve yasal yedekler ayrılır. Bu sayfada hisse oranıyla hesaplamayı, emek veren ortağın payının belirlenmesini, maaş alan ortak durumunu, zarar paylaşımını ve sözleşmede kâr maddesinin nasıl yazılacağını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Önce sözleşme: ortakların yazılı olarak kararlaştırdığı kâr oranı uygulanır.",
    "Adi ortaklıkta sözleşme yoksa kâr ve zarar, katılma paylarının değerine bakılmaksızın eşit paylaşılır (TBK md. 623/1).",
    "Sözleşmede yalnızca kâr ya da yalnızca zarar oranı yazılmışsa, aynı oran diğeri için de geçerli sayılır (TBK md. 623/2).",
    "Zarara katılmama anlaşması yalnızca katılma payı olarak emeğini koyan ortak için geçerlidir (TBK md. 623/3).",
    "Hisse oranıyla hesap: ortağın payı = dağıtılacak kâr × ortağın sermaye payı ÷ toplam sermaye.",
    "Şirketlerde dağıtımdan önce kurumlar vergisi ve yasal yedek ayrılır; ortağa ödenen kâr payından stopaj kesilir."
  ],
  figure: {
    alt: "900.000 TL kârın iki yöntemle dağıtımı: yalnızca hisse oranıyla A ortağına 540.000, B ortağına 360.000 TL; önce yüzde 20 emek payı ayrılınca A'ya 432.000, B'ye 468.000 TL.",
    caption: "Örnek: A ortağı 600.000 TL, B ortağı 400.000 TL sermaye koymuş, işi B yürütüyor; yıllık dağıtılacak kâr 900.000 TL. Emek payının önceden ayrılması, işi yürüten ortağın toplam payını belirgin biçimde değiştirir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">900.000 TL kâr nasıl bölünür?</text>
  <text x="20" y="70" class="b">1. Yalnızca hisse oranı (%60 / %40)</text>
  <rect x="20" y="84" width="408" height="40" rx="6" class="p"/>
  <text x="224" y="110" class="b mid sf">A: 540.000 TL</text>
  <rect x="428" y="84" width="272" height="40" rx="6" class="ps"/>
  <text x="564" y="110" class="b mid">B: 360.000 TL</text>
  <text x="20" y="170" class="b">2. Önce %20 emek payı B'ye, kalan hisse oranıyla</text>
  <rect x="20" y="184" width="136" height="40" rx="6" class="ok"/>
  <text x="88" y="210" class="sm mid b sf">emek 180.000</text>
  <rect x="156" y="184" width="326" height="40" rx="6" class="p"/>
  <text x="319" y="210" class="b mid sf">A: 432.000 TL</text>
  <rect x="482" y="184" width="218" height="40" rx="6" class="ps"/>
  <text x="591" y="210" class="b mid">B hisse: 288.000</text>
  <text x="20" y="252" class="sm t2">B'nin toplamı: 180.000 + 288.000 = 468.000 TL</text>
  <rect x="20" y="276" width="330" height="108" rx="8" class="sf sb"/>
  <text x="36" y="302" class="b">Sözleşme yoksa (adi ortaklık)</text>
  <text x="36" y="328" class="sm">TBK md. 623: eşit pay</text>
  <text x="36" y="352" class="sm">A: 450.000 TL · B: 450.000 TL</text>
  <text x="36" y="374" class="sm mu">sermaye farkı dikkate alınmaz</text>
  <rect x="370" y="276" width="330" height="108" rx="8" class="oks"/>
  <text x="386" y="302" class="b">Formül</text>
  <text x="386" y="328" class="sm">pay = kâr × ortak sermayesi</text>
  <text x="386" y="350" class="sm">÷ toplam sermaye</text>
  <text x="386" y="374" class="sm">900.000 × 600 ÷ 1.000 = 540.000</text>
</svg>`
  },
  sections: [
    {
      h: "Ortaklar arasında kâr nasıl dağıtılır? Genel kural",
      p: [
        "Kâr dağıtımında ilk bakılacak yer ortakların kendi aralarındaki anlaşmadır. Ortaklık sözleşmesinde ya da şirket ana sözleşmesinde kârın nasıl paylaşılacağı yazılıysa o oran uygulanır. Bu oran sermaye payına göre olabileceği gibi, emek, müşteri getirme, sorumluluk üstlenme gibi katkılar da dikkate alınarak farklı belirlenebilir.",
        "Sözleşme yoksa ya da konuya ilişkin hüküm içermiyorsa ortaklığın türüne göre kanunun kuralı devreye girer. Türk Borçlar Kanunu'nda düzenlenen <strong>adi ortaklıkta</strong> varsayılan kural eşit paylaşımdır. Türk Ticaret Kanunu'na tabi <strong>limited ve anonim şirketlerde</strong> ise kâr payı kural olarak ortağın sermaye payına oranla hesaplanır ve dağıtım genel kurul kararıyla yapılır.",
        "Hangi yapıda olursa olsun, dağıtılacak tutar ciro değil, giderler ve vergiler düşüldükten sonra kalan kârdır. Ciro ile kâr arasındaki farkı [[bilgi:ciro-nedir-kar-farki-calisan-basi-ciro|ciro nedir]] yazısında, kâr marjı hesabını [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Adi ortaklıkta kâr paylaşımı: TBK md. 623",
      p: [
        "Adi ortaklık, iki ya da daha fazla kişinin emeklerini ve mallarını ortak bir amaca ulaşmak için birleştirdiği, tüzel kişiliği olmayan ortaklıktır. Küçük işletmelerde, iki arkadaşın birlikte açtığı dükkânlarda ve proje bazlı işbirliklerinde sık görülür. Kâr ve zarara katılma, Türk Borçlar Kanunu'nun 623. maddesinde düzenlenmiştir."
      ],
      table: {
        head: ["Fıkra", "Kuralın özü", "Pratik anlamı"],
        rows: [
          ["623/1", "Aksine sözleşme yoksa ortaklar, katılma paylarının değeri ve niteliğine bakılmaksızın kâr ve zarara eşit katılır", "Biri 900.000, diğeri 100.000 TL koysa bile sözleşme yoksa kâr yarı yarıya bölünür"],
          ["623/2", "Sözleşmede yalnızca kâr ya da yalnızca zarar payı belirlenmişse, bu belirleme diğeri için de geçerlidir", "Kâr %70–%30 yazıldıysa zarar da %70–%30 paylaşılır"],
          ["623/3", "Zarara katılmama anlaşması yalnızca katılma payı olarak emeğini koyan ortak için geçerlidir", "Sermaye koyan ortağın zarardan muaf tutulması geçerli olmaz"]
        ],
        caption: "Madde metninin özetidir; somut durumunuz için kanunun güncel metnine ve bir avukata başvurun."
      },
      after: [
        "Bu kural, sermayesi çok farklı olan ortakların yazılı sözleşme yapmadan iş kurmasının ne kadar riskli olduğunu gösterir. Daha fazla sermaye koyan ortak, kârın da daha büyük kısmını almayı beklerken kanunun varsayılan kuralı eşit paylaşımdır. Bu yüzden ortaklığın başında kâr oranını yazıya dökmek en önemli adımdır."
      ]
    },
    {
      h: "Hisse oranına göre kâr payı nasıl hesaplanır?",
      p: [
        "Ortaklar kârı sermaye paylarına göre bölmeyi kararlaştırdıysa hesap basit bir orantıdır. Her ortağın sermaye payı toplam sermayeye bölünerek yüzdesi bulunur; dağıtılacak kâr bu yüzdeyle çarpılır."
      ],
      formula: "Ortağın oranı = ortağın sermayesi ÷ toplam sermaye\nOrtağın kâr payı = dağıtılacak kâr × ortağın oranı",
      ol: [
        "A ortağı 600.000 TL, B ortağı 400.000 TL sermaye koymuş; toplam sermaye 1.000.000 TL.",
        "Oranlar: A için 600.000 ÷ 1.000.000 = %60, B için %40.",
        "Yıl sonunda giderler düşüldükten sonra dağıtılacak kâr 900.000 TL.",
        "A'nın payı: 900.000 × 0,60 = 540.000 TL; B'nin payı: 900.000 × 0,40 = 360.000 TL.",
        "Kontrol: 540.000 + 360.000 = 900.000 TL."
      ],
      after: [
        "Üç ya da daha fazla ortaklı yapılarda aynı orantı her ortak için ayrı ayrı uygulanır. Yüzde ve orantı hesaplarını hızlıca yapmak için [[arac:yuzde-hesapla|Yüzde Hesaplama]] ve [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Emek veren ortağın payı nasıl belirlenir?",
      p: [
        "Ortaklardan biri sermaye, diğeri emek koyuyorsa ya da ikisi de sermaye koyup yalnızca biri işi fiilen yürütüyorsa, kârı yalnızca sermaye oranına göre bölmek işi yürüten ortak için adaletsiz olabilir. Bu durumda yaygın olarak üç yöntem kullanılır."
      ],
      ul: [
        "<strong>Önce emek payı, sonra hisse oranı:</strong> Kârın belirli bir yüzdesi (örneğin %20) önce işi yürüten ortağa emek payı olarak ayrılır, kalan tutar sermaye oranına göre bölünür.",
        "<strong>Emeğe sermaye değeri biçmek:</strong> Ortağın emeğine sözleşmede parasal bir değer verilir ve bu değer sermaye payı gibi orana katılır. Örneğin 400.000 TL değer biçilen emek, 600.000 TL nakit sermayeyle birlikte %40–%60 oran oluşturur.",
        "<strong>Sabit ödeme artı kâr payı:</strong> İşi yürüten ortağa her ay sabit bir ödeme yapılır ve bu ödeme gider gibi düşüldükten sonra kalan kâr oranlara göre bölünür."
      ],
      after: [
        "<strong>Çözümlü örnek (önce emek payı):</strong> Önceki örnekte işi B yürütüyor ve sözleşmede kârın %20'sinin önce emek payı olarak B'ye ayrılacağı yazıyor olsun. Emek payı: 900.000 × 0,20 = 180.000 TL. Kalan kâr: 900.000 − 180.000 = 720.000 TL. Hisse oranıyla bölüşüm: A için 720.000 × 0,60 = 432.000 TL, B için 720.000 × 0,40 = 288.000 TL. B'nin toplamı 180.000 + 288.000 = 468.000 TL olur. Aynı kâr yalnızca hisse oranıyla bölünseydi B 360.000 TL alacaktı.",
        "Emeğin değerini belirlerken o işin piyasada bir çalışana ödenecek karşılığı iyi bir referanstır. Saatlik ya da aylık emek değerini hesaplamak için serbest çalışan saatlik ücretini belirleme yöntemi uyarlanabilir."
      ]
    },
    {
      h: "Ortaklardan biri maaş alırsa kâr nasıl hesaplanır?",
      p: [
        "İşi yürüten ortağa düzenli bir ödeme yapılıyorsa, bu ödemenin kârdan önce mi sonra mı düşüleceği açıkça kararlaştırılmalıdır. Genel yaklaşım, ortağa yapılan sabit aylık ödemenin işletmenin gideri gibi düşülmesi ve kalan kârın oranlara göre bölünmesidir. Böylece işi yürüten ortak hem emeğinin karşılığını hem de sermaye payına düşen kârı alır.",
        "Örneğin B'ye yılda 12 × 30.000 = 360.000 TL ödeme yapıldıysa ve bu ödeme düşülmeden önceki kâr 1.260.000 TL ise, dağıtılacak kâr 1.260.000 − 360.000 = 900.000 TL olur ve oranlara göre bölünür. Ödemenin vergi ve sosyal güvenlik açısından nasıl değerlendirileceği ortaklığın türüne göre değişir: şahıs ortaklıklarında ortağın kendine ödediği tutar çoğu zaman gider yazılamaz ve kâr payının bir parçası sayılabilir; şirketlerde ise ortak, bordrolu çalışan olarak ücret alabilir. Bu ayrımı mutlaka mali müşavirinizle netleştirin."
      ]
    },
    {
      h: "Zarar da hisse oranında mı paylaşılır?",
      p: [
        "Adi ortaklıkta, sözleşmede yalnızca kâr oranı yazıldıysa TBK md. 623/2 gereği aynı oran zarar için de geçerli sayılır. Kâr %60–%40 bölünüyorsa 200.000 TL'lik bir zarar da 120.000 TL ve 80.000 TL olarak paylaşılır. Bir ortağın hiç zarara katılmaması ise ancak o ortak yalnızca emeğini koymuşsa geçerli biçimde kararlaştırılabilir.",
        "Adi ortaklıkta ortaklar, ortaklık borçlarından üçüncü kişilere karşı kural olarak müteselsilen (birlikte ve tamamından) sorumlu olabilir; zarar paylaşımı oranı yalnızca ortakların kendi aralarındaki ilişkiyi belirler. Limited şirkette ise ortak, şirket borçlarından kural olarak koyduğu sermaye ile sınırlı sorumludur, ancak kamu borçları gibi bazı borçlarda özel sorumluluk hükümleri vardır. Zarar riskinin büyük olduğu işlerde ortaklık türünü seçmeden önce hukuki danışmanlık alın."
      ]
    },
    {
      h: "Dağıtılmadan önce hangi giderler ve vergiler düşülür?",
      p: [
        "Dağıtılacak kâr, işletmenin bütün giderleri ve vergileri düşüldükten sonra kalan tutardır. Şahıs işletmesi ve adi ortaklıklarda kazanç ortaklara payları oranında dağıtılmış sayılır ve her ortak kendi payı üzerinden gelir vergisi beyan eder. Limited ve anonim şirketlerde ise önce şirket kazancı üzerinden kurumlar vergisi ödenir, ardından kanuni yedek akçe ayrılır ve kalan tutar ortaklara dağıtılır."
      ],
      table: {
        head: ["Adım (limited şirket örneği)", "Hesap", "Tutar"],
        rows: [
          ["Vergi öncesi kâr", "—", "1.000.000 TL"],
          ["Kurumlar vergisi (%25)", "1.000.000 × 0,25", "− 250.000 TL"],
          ["Vergi sonrası kâr", "1.000.000 − 250.000", "750.000 TL"],
          ["Genel kanuni yedek akçe (%5)", "750.000 × 0,05", "− 37.500 TL"],
          ["Dağıtılabilir kâr", "750.000 − 37.500", "712.500 TL"],
          ["Kâr payı stopajı (%15)", "712.500 × 0,15", "− 106.875 TL"],
          ["Ortaklara net ödenen", "712.500 − 106.875", "605.625 TL"]
        ],
        caption: "Örnek hesaptır. %25 kurumlar vergisi genel orandır; yedek akçe ödenmiş sermayenin %20'sine ulaşınca ayrılmaz. Güncel oranları ve istisnaları mali müşavirinizle kontrol edin."
      },
      after: [
        "Bu örnekte %60–%40 ortaklı bir şirkette brüt kâr payı A için 427.500 TL, B için 285.000 TL; stopaj sonrası net tutarlar ise 363.375 TL ve 242.250 TL olur. Gerçek kişi ortakların aldıkları kâr payını gelir vergisi beyannamesinde değerlendirip değerlendirmeyeceği, tutara ve diğer gelirlerine bağlıdır. Stopajın genel mantığı için [[bilgi:stopaj-nedir-hangi-gelirlerden-kesilir|stopaj nedir]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Adi ortaklıkta kâr paylaşımı nasıl belgelenir?",
      ul: [
        "<strong>Yazılı ortaklık sözleşmesi:</strong> Ortakların kimlik bilgileri, getirdikleri paylar (para, mal, emek), kâr ve zarar oranları, yönetim yetkisi, ortaktan ayrılma ve fesih koşulları.",
        "<strong>Dönem sonu hesap özeti:</strong> Gelirler, giderler, dağıtılacak kâr ve her ortağın payı; tüm ortakların imzasıyla.",
        "<strong>Ödeme kanıtı:</strong> Kâr paylarının banka havalesiyle ödenmesi, nakit ödemeye göre çok daha güçlü bir kanıttır.",
        "<strong>Vergi kaydı:</strong> Adi ortaklık vergi dairesine bildirilmişse, ortakların payları beyannamelerde bu oranlara göre gösterilir.",
        "<strong>Ortak giderlerin takibi:</strong> Ortakların cebinden yaptığı harcamalar ayrı bir listede tutulup dönem sonunda mahsuplaşılmalıdır."
      ],
      after: [
        "Ortakların kişisel olarak yaptığı ortak harcamaları paylaştırmak için [[arac:ortak-gider-paylasimi|Ortak Gider Paylaşımı Hesaplama]] aracı kimin kime ne kadar ödemesi gerektiğini listeler; mantığı [[bilgi:ortak-gider-nasil-paylasilir|ortak gider nasıl paylaşılır]] yazısında anlatılır."
      ]
    },
    {
      h: "Ortaklık sözleşmesinde kâr maddesi nasıl yazılır?",
      p: [
        "Kâr maddesi kısa ama hiçbir yoruma yer bırakmayacak açıklıkta olmalıdır. Aşağıdaki örnekler yalnızca yön göstermek içindir; ortaklığınızın türüne ve ihtiyacına göre bir avukat ya da mali müşavirle birlikte uyarlayın."
      ],
      ol: [
        "\"Dağıtılacak kâr, ortaklığın bir hesap dönemindeki tüm gelirlerinden tüm giderleri ve yasal yükümlülükler düşüldükten sonra kalan tutardır.\"",
        "\"Dağıtılacak kârın %20'si öncelikle ortaklığın günlük yönetimini yürüten B'ye emek payı olarak ayrılır; kalan tutar A'ya %60, B'ye %40 oranında dağıtılır.\"",
        "\"Zarar, ortaklar arasında %60 A, %40 B oranında paylaşılır.\"",
        "\"Kâr payları her hesap dönemi sonunu izleyen 60 gün içinde ortakların banka hesaplarına ödenir.\"",
        "\"Ortaklar, yazılı ortak karar olmadan dönem içinde kâr payı avansı çekemez.\""
      ],
      after: [
        "Sözleşme taslağını oluşturmak için [[arac:sozlesme-olustur|Sözleşme Örneği Oluşturucu]] aracındaki şablonlardan başlayabilir, ortaklık için gerekli maddeleri ekleyerek düzenleyebilirsiniz."
      ]
    }
  ],
  faq: [
    ["Ortaklar arasında kâr nasıl dağıtılır?", "Öncelikle ortaklık sözleşmesindeki oran uygulanır. Sözleşme yoksa adi ortaklıkta TBK md. 623 gereği kâr eşit bölünür; limited ve anonim şirketlerde ise kâr payı kural olarak sermaye payı oranında dağıtılır."],
    ["Hisse oranına göre kâr payı nasıl hesaplanır?", "Ortağın sermayesi toplam sermayeye bölünerek oranı bulunur ve dağıtılacak kâr bu oranla çarpılır. 900.000 TL kârda yüzde altmış paylı ortak 540.000 TL, yüzde kırk paylı ortak 360.000 TL alır."],
    ["Emek veren ortağın payı nasıl belirlenir?", "Kârın bir bölümü önce emek payı olarak ayrılabilir, emeğe parasal değer biçilip sermayeye eklenebilir ya da işi yürüten ortağa sabit ödeme yapılıp kalan kâr oranlara göre bölünebilir. Yöntem sözleşmede açıkça yazılmalıdır."],
    ["Zarar da hisse oranında mı paylaşılır?", "Adi ortaklıkta sözleşmede yalnızca kâr oranı belirlenmişse aynı oran zarar için de geçerli sayılır. Zarara hiç katılmama anlaşması ise yalnızca katılma payı olarak emeğini koyan ortak için geçerlidir."],
    ["Ortaklardan biri maaş alırsa kâr nasıl hesaplanır?", "Genel yaklaşımda işi yürüten ortağa yapılan sabit ödeme önce düşülür, kalan kâr oranlara göre bölünür. Ödemenin vergi ve sosyal güvenlik açısından nasıl sayılacağı ortaklık türüne göre değiştiği için mali müşavire danışılmalıdır."],
    ["Dağıtılmadan önce hangi giderler ve vergiler düşülür?", "Tüm işletme giderleri düşülür. Şirketlerde ayrıca kurumlar vergisi ödenir ve kanuni yedek akçe ayrılır; ortaklara ödenen kâr payından stopaj kesilir. Şahıs ortaklıklarında her ortak kendi payı için gelir vergisi beyan eder."],
    ["Adi ortaklıkta kâr paylaşımı nasıl belgelenir?", "Yazılı ortaklık sözleşmesi, ortakların imzaladığı dönem sonu hesap özeti, banka üzerinden yapılan ödemeler ve vergi beyannamelerindeki pay gösterimi kâr paylaşımının temel belgeleridir."],
    ["Ortaklık sözleşmesinde kâr maddesi nasıl yazılır?", "Dağıtılacak kârın tanımı, varsa emek payı, kâr ve zarar oranları, ödeme zamanı ve avans kuralları açık cümlelerle yazılmalıdır. Taslağı ortaklığın türüne göre bir avukat ya da mali müşavirle birlikte uyarlayın."],
    ["Sözleşme yoksa farklı sermaye koyan ortaklar kârı nasıl böler?", "Adi ortaklıkta yazılı bir anlaşma yoksa kanunun varsayılan kuralı uygulanır ve kâr, sermaye farkına bakılmaksızın eşit bölünür. Bu sonucu istemeyen ortakların oranı baştan sözleşmeyle belirlemesi gerekir."]
  ],
  tools: ["yuzde-hesapla", "oran-oranti-hesapla", "ortak-gider-paylasimi", "sozlesme-olustur"],
  related: ["ortak-gider-nasil-paylasilir", "stopaj-nedir-hangi-gelirlerden-kesilir", "kar-marji-nasil-hesaplanir", "sahis-sirketi-acmanin-maliyeti-vergi-bagkur"],
  sources: [
    ["Mevzuat – 6098 sayılı Türk Borçlar Kanunu", "https://www.mevzuat.gov.tr/"],
    ["Gelir İdaresi Başkanlığı", "https://www.gib.gov.tr/"],
    ["T.C. Ticaret Bakanlığı", "https://ticaret.gov.tr/"]
  ],
  uyari: "genel bilgi içindir, hukuki ya da mali danışmanlık değildir; ortaklık sözleşmesi ve vergi uygulaması için avukatınıza ve mali müşavirinize danışın"
};
