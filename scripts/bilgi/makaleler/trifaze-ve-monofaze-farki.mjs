export default {
  slug: "trifaze-ve-monofaze-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Trifaze ve Monofaze Farkı Nedir? Üç Fazlı Güç ve Akım Hesabı",
  pageTitle: "Trifaze ve Monofaze Farkı: Üç Fazlı Güç ve Akım Hesabı",
  description: "Monofaze tek faz ve nötrle 230 V, trifaze üç fazla 400 V verir. Üç fazlı güç formülü P = √3·U·I·cos φ, kW–amper çevirisi, cos φ ve trifaze abonelik ne zaman gerekir.",
  keywords: ["trifaze nedir", "monofaze trifaze farkı", "üç faz güç hesaplama", "380v kaç amper", "trifaze elektrik aboneliği", "cos fi nedir", "kw amper çevirme", "220v 380v farkı"],
  lead: "Monofaze sistem <strong>bir faz ve bir nötr</strong> iletkenle 230 V gerilim sağlar; trifaze sistem ise birbirine göre 120° kaydırılmış <strong>üç faz</strong> kullanır ve fazlar arasında 400 V verir. Halk arasında 220 V ve 380 V diye anılan değerler bunlardır. Aynı akımla trifaze sistem yaklaşık üç kat güç taşır: 32 A'lık bir hat monofazede yaklaşık 7,4 kW, trifazede yaklaşık 22 kW güç verir. Aşağıda güç ve akım formüllerini, cos φ'nin anlamını, çözümlü motor örneğini ve evde trifazenin ne zaman gerektiğini anlatıyoruz.",
  kisaCevap: [
    "Monofaze: faz–nötr arası 230 V; trifaze: fazlar arası 400 V, her faz ile nötr arası yine 230 V.",
    "Monofaze aktif güç P = U × I × cos φ; trifaze aktif güç P = √3 × U × I × cos φ (U fazlar arası gerilim).",
    "√3 ≈ 1,732 olduğu için 400 V'ta trifaze akım ≈ P ÷ (692,8 × cos φ); 10 kW, cos φ 0,85 için yaklaşık 17 A.",
    "Güç faktörü (cos φ), çekilen görünür gücün ne kadarının işe dönüştüğünü gösterir; 1'e yakın olması istenir.",
    "Evlerin çoğu monofazeyle yeter; atölye makinesi, büyük ısı pompası ve hızlı ev şarjı gibi yüklerde trifaze gerekebilir.",
    "Abonelik türü ve bağlantı gücü dağıtım şirketinin onayıyla belirlenir; tesisat işleri yetkili elektrikçiye yaptırılmalıdır."
  ],
  figure: {
    alt: "Üç fazın 120 derece aralıklı sinüs eğrileri ve yanında monofaze ile trifaze bağlantı şeması; altta aynı 32 amperlik akımla monofazede 7,4 kW, trifazede 22 kW güç karşılaştırması.",
    caption: "Trifazede üç sinüs dalgası birbirinden üçte bir periyot geride gelir; bu yüzden toplam güç hiç sıfıra düşmez ve motorlar düzgün döner. Alttaki çubuklar, aynı hat akımıyla trifazenin yaklaşık üç kat güç taşıdığını gösterir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Monofaze ve trifaze</text>
  <rect x="30" y="50" width="400" height="180" rx="10" class="sf sb"/>
  <line x1="50" y1="140" x2="410" y2="140" class="sb" fill="none"/>
  <path d="M50 140 C80 60,110 60,140 140 S200 220,230 140 S290 60,320 140 S380 220,410 140" class="sp sw" fill="none"/>
  <path d="M110 140 C140 60,170 60,200 140 S260 220,290 140 S350 60,380 140" class="sok sw" fill="none"/>
  <path d="M50 190 C60 210,70 214,80 210 M80 210 C110 170,140 70,170 140 S230 220,260 140 S320 60,350 140 S400 210,410 200" class="sa sw" fill="none"/>
  <text x="60" y="74" class="sm b p">L1</text><text x="150" y="74" class="sm b ok">L2</text><text x="200" y="214" class="sm b">L3</text>
  <text x="230" y="250" class="sm mid mu">Fazlar arasında 120° fark</text>
  <g class="sm">
    <rect x="450" y="50" width="240" height="84" rx="8" class="ps"/>
    <text x="466" y="74" class="b">Monofaze</text>
    <text x="466" y="96">Faz + nötr + toprak</text>
    <text x="466" y="118">L–N: 230 V</text>
    <rect x="450" y="146" width="240" height="84" rx="8" class="oks"/>
    <text x="466" y="170" class="b">Trifaze</text>
    <text x="466" y="192">3 faz + nötr + toprak</text>
    <text x="466" y="214">L–L: 400 V · L–N: 230 V</text>
  </g>
  <text x="30" y="290" class="b">Aynı 32 A hat akımıyla taşınan güç (cos φ = 1)</text>
  <text x="30" y="326" class="sm b">Monofaze</text>
  <rect x="130" y="310" width="170" height="26" rx="4" class="ps"/>
  <text x="308" y="328" class="b">230 × 32 ≈ 7,4 kW</text>
  <text x="30" y="370" class="sm b">Trifaze</text>
  <rect x="130" y="354" width="506" height="26" rx="4" class="p"/>
  <text x="140" y="372" class="b sf">1,732 × 400 × 32 ≈ 22,2 kW</text>
  <text x="360" y="408" class="sm mid mu">Gerçek hatlarda kesit, sigorta ve bağlantı gücü sınırı ayrıca kontrol edilir.</text>
</svg>`
  },
  sections: [
    {
      h: "Monofaze ve trifaze nedir?",
      p: [
        "Elektrik şebekesinde üretilen alternatif akım, saniyede 50 kez yön değiştiren sinüs biçimli bir gerilimdir. <strong>Monofaze</strong> (tek fazlı) bağlantıda eve bu fazlardan yalnızca biri ve dönüş yolu olarak nötr iletkeni gelir. Türkiye'de faz ile nötr arasındaki nominal gerilim 230 V'tur; eski alışkanlıkla 220 V da denir. Evlerdeki prizlerin, aydınlatmanın ve beyaz eşyanın neredeyse tamamı bu gerilimle çalışır.",
        "<strong>Trifaze</strong> (üç fazlı) bağlantıda ise üç ayrı faz iletkeni gelir. Bu üç gerilim aynı frekanstadır ama birbirine göre periyodun üçte biri yani 120° kaydırılmıştır. Herhangi iki faz arasındaki gerilim 230 × √3 ≈ 400 V eder; halk arasındaki 380 V ifadesi eski nominal değerden kalmadır. Trifaze tesisatta da her faz ile nötr arasında 230 V vardır, bu yüzden aynı binada hem 230 V'luk prizler hem de 400 V'luk makineler beslenebilir.",
        "Üç fazın kaydırılmış olması önemli bir avantaj sağlar: bir faz sıfırdan geçerken diğerleri güç vermeye devam ettiği için toplam güç hiç sıfıra düşmez. Bu, elektrik motorlarının titreşimsiz ve verimli dönmesini, büyük güçlerin daha ince kablolarla taşınmasını sağlar. Elektrik santralleri, iletim hatları ve sanayi bu yüzden trifaze çalışır."
      ]
    },
    {
      h: "Trifaze ve monofaze arasındaki farklar",
      table: {
        head: ["Özellik", "Monofaze", "Trifaze"],
        rows: [
          ["İletkenler", "Faz, nötr, koruma (toprak)", "3 faz, nötr, koruma (toprak)"],
          ["Gerilim", "230 V (faz–nötr)", "400 V (faz–faz), 230 V (faz–nötr)"],
          ["Aktif güç formülü", "P = U × I × cos φ", "P = √3 × U × I × cos φ"],
          ["32 A ile güç (cos φ = 1)", "≈ 7,4 kW", "≈ 22,2 kW"],
          ["Tipik kullanım", "Konut, küçük ofis, dükkân", "Atölye, sanayi, büyük binalar, asansör"],
          ["Motorlar", "Kalkış kondansatörü ya da yardımcı sargı gerekir", "Kendiliğinden döner alan oluşturur, daha verimli"],
          ["Tesisat maliyeti", "Daha düşük", "Daha fazla iletken ve pano elemanı"],
          ["Yük dengesi", "Söz konusu değil", "Yükler üç faza dengeli dağıtılmalı"]
        ],
        caption: "Değerler Türkiye'deki nominal 230/400 V şebekeye göredir."
      },
      after: [
        "Trifaze tesisatta tek fazlı cihazların üç faza mümkün olduğunca eşit dağıtılması gerekir. Bir fazda fırın, ısıtıcı ve çamaşır makinesi toplanırken diğer fazlar boş kalırsa o fazın sigortası atar, nötr iletkeni gereksiz akım taşır. Pano düzenlemesini yetkili elektrikçi yapmalıdır."
      ]
    },
    {
      h: "Üç fazlı güç nasıl hesaplanır?",
      p: [
        "Alternatif akımda üç tür güç vardır. <strong>Aktif güç (P, kW)</strong> gerçekten işe, ısıya ya da harekete dönüşen güçtür ve sayaçta faturalanan budur. <strong>Görünür güç (S, kVA)</strong> gerilim ile akımın çarpımıdır; kablo, sigorta, trafo ve jeneratör bu değere göre boyutlandırılır. <strong>Reaktif güç (Q, kVAr)</strong> ise motor ve trafo gibi sargılı cihazların manyetik alanı kurmak için şebekeyle gidip gelen, işe dönüşmeyen kısımdır."
      ],
      formula: "Trifaze: S = √3 × U × I · P = √3 × U × I × cos φ · Q = √3 × U × I × sin φ\nMonofaze: S = U × I · P = U × I × cos φ\nAkım (trifaze): I = P ÷ (√3 × U × cos φ) · Akım (monofaze): I = P ÷ (U × cos φ)",
      after: [
        "Trifaze formüldeki U, fazlar arası gerilimdir (400 V) ve I, her bir faz iletkeninden geçen hat akımıdır. Formüldeki √3 çarpanı, üç fazın kaydırılmış olmasından gelir; üç ayrı monofaze devrenin toplamı gibi düşünürseniz 3 × 230 × I = √3 × 400 × I sonucuna ulaşırsınız. Bu hesapları gerilim, akım ve cos φ girerek [[arac:uc-faz-guc-hesapla|üç faz güç hesaplama]] aracında yapabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: 10 kW trifaze motor kaç amper çeker?",
      p: [
        "Motor etiketlerindeki kW değeri genellikle <strong>milden alınan mekanik güçtür</strong>. Şebekeden çekilen elektrik gücü, motor verimi (η) nedeniyle bundan biraz fazladır. Bu yüzden akım hesabında hem güç faktörünü hem verimi hesaba katmak gerekir."
      ],
      ol: [
        "Verilenler: mil gücü 10 kW, gerilim 400 V, cos φ = 0,85, verim η = 0,90.",
        "Çekilen elektrik gücü: 10 ÷ 0,90 ≈ 11,1 kW.",
        "Görünür güç: 11,1 ÷ 0,85 ≈ 13,1 kVA.",
        "Hat akımı: I = 11.100 ÷ (1,732 × 400 × 0,85) ≈ 18,9 A.",
        "Verimi ihmal etseydiniz I = 10.000 ÷ (1,732 × 400 × 0,85) ≈ 17,0 A bulurdunuz; etiketteki nominal akım genellikle bu iki değer arasında ya da biraz üstündedir."
      ],
      after: [
        "Motor kalkış anında nominal akımın birkaç katını kısa süreliğine çekebilir. Sigorta ve şalter seçiminde bu kalkış akımı, kablo kesitinde ise sürekli akım ve hat uzunluğu belirleyicidir. Kablo seçiminin mantığını [[bilgi:kablo-kesiti-nasil-secilir|kablo kesiti nasıl seçilir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "kW değeri ampere nasıl çevrilir?",
      p: [
        "Ampere çevirmek için gücün yanında üç bilgiye ihtiyaç vardır: monofaze mi trifaze mi olduğu, gerilim ve güç faktörü. Isıtıcı, su ısıtıcısı ve fırın gibi rezistanslı cihazlarda cos φ 1 kabul edilebilir; motorlu ve elektronik güç kaynaklı cihazlarda ise 0,8–0,95 arasındadır."
      ],
      table: {
        head: ["Güç", "Monofaze 230 V (cos φ = 1)", "Trifaze 400 V (cos φ = 1)", "Trifaze 400 V (cos φ = 0,85)"],
        rows: [
          ["2 kW", "8,7 A", "2,9 A", "3,4 A"],
          ["3,5 kW", "15,2 A", "5,1 A", "5,9 A"],
          ["5 kW", "21,7 A", "7,2 A", "8,5 A"],
          ["7,4 kW", "32,2 A", "10,7 A", "12,6 A"],
          ["11 kW", "47,8 A", "15,9 A", "18,7 A"],
          ["22 kW", "95,7 A", "31,8 A", "37,4 A"]
        ],
        caption: "Değerler yuvarlanmıştır. Trifaze sütunlardaki akım her bir faz iletkeninden geçen akımdır."
      },
      after: [
        "Tablodan görüldüğü gibi 11 kW'lık bir yük monofazede yaklaşık 48 A çekerken trifazede faz başına 16 A civarında kalır. Farklı güç, gerilim ve cos φ değerleri için [[arac:kw-amper-cevir|kW amper çevirici]] kullanılabilir. Watt, volt ve amper arasındaki temel ilişki için [[bilgi:watt-amper-volt-iliskisi|watt, amper, volt ilişkisi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Güç faktörü (cos φ) nedir?",
      p: [
        "Sargılı cihazlarda akım, gerilimle aynı anda tepe yapmaz; bir açı kadar geride kalır. Bu açıya φ (fi), açının kosinüsüne de <strong>güç faktörü</strong> denir. cos φ = 1 olduğunda çekilen akımın tamamı işe dönüşür; cos φ = 0,7 olduğunda ise aynı işi yapmak için %43 daha fazla akım çekilir (1 ÷ 0,7 ≈ 1,43).",
        "Düşük güç faktörü, kabloların ve trafoların gereksiz yere yüklenmesi demektir. Bu nedenle belirli güç üzerindeki işletmelerde reaktif enerji tüketimi sayaçla izlenir ve yönetmelikte belirlenen sınırlar aşılırsa ayrıca bedel uygulanabilir. İşletmeler bunu önlemek için kondansatör grupları ile <strong>kompanzasyon</strong> yapar. Konutlarda reaktif enerji genellikle ayrıca faturalanmaz.",
        "Mevcut aktif ve reaktif güçten cos φ değerini, hedef güç faktörüne ulaşmak için gereken kondansatör gücünü [[arac:guc-faktoru-hesapla|güç faktörü hesaplama]] aracıyla bulabilirsiniz. Jeneratör ve kesintisiz güç kaynağı seçerken kVA ile kW arasındaki fark da aynı katsayıdan gelir; ayrıntılar [[bilgi:kva-kw-farki-jenerator-secimi|kVA ve kW farkı]] yazısında."
      ]
    },
    {
      h: "Evde trifaze elektrik gerekir mi? Abonelik ne zaman gerekir?",
      p: [
        "Standart bir dairede ya da müstakil evde aydınlatma, beyaz eşya, klima, ocak ve fırın monofaze bağlantıyla rahatça çalışır. Trifaze ihtiyacı genellikle şu durumlarda ortaya çıkar: büyük güçlü ısı pompası ya da elektrikli kazan, trifaze motorlu atölye makineleri (torna, kompresör, hızar), 11 kW ve üzeri ev tipi elektrikli araç şarj ünitesi, büyük çatı güneş enerjisi sistemleri ve aynı anda çok sayıda yüksek güçlü cihazın çalıştığı işyerleri.",
        "Abonelik türü ve <strong>bağlantı gücü</strong>, dağıtım şirketinin onayladığı proje ve sözleşmeyle belirlenir. Monofazeden trifazeye geçiş; yeni sayaç, pano değişikliği, bazen bina girişindeki kabloların yenilenmesi ve bağlantı bedeli gerektirebilir. Hangi gücün üzerinde trifaze zorunlu olduğu ve başvuru şartları için bölgenizdeki elektrik dağıtım şirketine başvurmanız gerekir; mevzuat ve uygulamalar zaman içinde güncellenebilir.",
        "Trifaze tesisatta 400 V'luk gerilim, 230 V'a göre daha tehlikelidir. Pano, sayaç ve hat bağlantılarına yalnızca yetkili elektrik tesisatçısı müdahale etmelidir. Elektrikli araç için ev şarj ünitesi düşünüyorsanız maliyet ve süre karşılaştırması [[bilgi:elektrikli-arac-sarj-maliyeti-ne-kadar|elektrikli araç şarj maliyeti]] yazısında yer alıyor."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Trifaze akımı üçe bölerek bulmak:</strong> 11 kW ÷ 230 V = 47,8 A bulup üçe bölmek (15,9 A) cos φ = 1'de doğru sonucu verir ama yöntem yanlıştır; güç faktörü ve dengesiz yük devreye girince hata büyür. √3'lü formülü kullanın.",
        "<strong>Faz–nötr gerilimini formülde kullanmak:</strong> Trifaze formülde U = 400 V'tur. 230 V yazarsanız akımı √3 kat büyük bulursunuz.",
        "<strong>Motor etiket gücünü elektrik gücü sanmak:</strong> Etiket genellikle mil gücüdür; çekilen elektrik gücü verim kadar fazladır.",
        "<strong>cos φ'yi yok saymak:</strong> Motorlu yüklerde cos φ = 1 kabulü akımı %15–25 düşük gösterir ve küçük sigorta ya da ince kablo seçilmesine yol açar.",
        "<strong>Yükleri tek faza toplamak:</strong> Trifaze evde bütün büyük cihazları aynı faza bağlamak o fazın sigortasını attırır ve nötrü yükler."
      ]
    }
  ],
  faq: [
    ["Trifaze ve monofaze arasındaki fark nedir?", "Monofaze sistem bir faz ve nötr iletkenle 230 V sağlar ve konutlarda yaygındır. Trifaze sistem 120 derece kaydırılmış üç faz kullanır, fazlar arasında 400 V verir ve aynı akımla yaklaşık üç kat güç taşır; sanayi ve büyük yükler için kullanılır."],
    ["Evde trifaze elektrik gerekir mi?", "Standart konutlarda monofaze bağlantı genellikle yeterlidir. Büyük ısı pompası, elektrikli kazan, trifaze atölye makineleri, 11 kW ve üzeri araç şarj ünitesi gibi yüksek güçlü yükler varsa trifaze gerekebilir; karar dağıtım şirketinin onayıyla verilir."],
    ["Üç fazlı güç nasıl hesaplanır?", "Trifaze aktif güç P = √3 × U × I × cos φ formülüyle bulunur; burada U fazlar arası gerilim (400 V), I hat akımı, cos φ güç faktörüdür. Görünür güç için cos φ çarpanı çıkarılır, reaktif güç için ise sin φ kullanılır."],
    ["10 kW trifaze motor kaç amper çeker?", "400 V'ta, cos φ 0,85 ve yüzde 90 verimle 10 kW mil gücündeki motor faz başına yaklaşık 18,9 A çeker. Verim ihmal edilirse yaklaşık 17 A bulunur. Kalkış anında bu değerin birkaç katı kısa süreli akım çekilebilir."],
    ["Güç faktörü (cos φ) nedir?", "Güç faktörü, çekilen görünür gücün ne kadarının işe dönüştüğünü gösteren 0 ile 1 arasındaki katsayıdır. Akım ile gerilim arasındaki faz açısının kosinüsüdür; düşük olduğunda aynı iş için daha fazla akım çekilir ve kablolar gereksiz yüklenir."],
    ["220V ve 380V arasındaki fark nedir?", "220 V halk arasında faz ile nötr arasındaki, 380 V ise iki faz arasındaki gerilimi anlatır. Türkiye'de güncel nominal değerler 230 V ve 400 V'tur. İki değer arasındaki oran √3 yani yaklaşık 1,732'dir."],
    ["Trifaze abonelik ne zaman gerekir?", "Yüksek güçlü makineler, büyük ısıtma sistemleri, hızlı araç şarjı ya da toplam bağlantı gücünün monofaze sınırını aşması durumunda trifaze abonelik gerekebilir. Sınırlar ve başvuru şartları için bölgenizdeki elektrik dağıtım şirketine danışmanız gerekir."],
    ["kW değeri ampere nasıl çevrilir?", "Monofazede I = P ÷ (U × cos φ), trifazede I = P ÷ (√3 × U × cos φ) formülü kullanılır. Örneğin 5 kW'lık rezistanslı yük monofaze 230 V'ta yaklaşık 21,7 A, trifaze 400 V'ta faz başına yaklaşık 7,2 A çeker."],
    ["Trifaze hatta monofaze cihaz çalışır mı?", "Evet. Trifaze tesisatta her faz ile nötr arasında 230 V bulunduğu için normal cihazlar bu fazlardan birine bağlanarak çalışır. Önemli olan yüklerin üç faza dengeli dağıtılmasıdır; bunu yetkili elektrikçi pano düzenlemesiyle sağlar."]
  ],
  tools: ["uc-faz-guc-hesapla", "kw-amper-cevir", "guc-faktoru-hesapla"],
  related: ["watt-amper-volt-iliskisi", "kva-kw-farki-jenerator-secimi", "kablo-kesiti-nasil-secilir", "elektrikli-arac-sarj-maliyeti-ne-kadar", "ohm-kanunu-nedir"],
  uyari: "elektrik tesisatına yönelik her türlü işlem yetkili elektrik tesisatçısı tarafından yapılmalıdır",
  sources: [
    ["EPDK – Elektrik Piyasası Bağlantı ve Sistem Kullanım Yönetmeliği", "https://www.epdk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – Elektrik İç Tesisleri Yönetmeliği", "https://www.mevzuat.gov.tr/"]
  ]
};
