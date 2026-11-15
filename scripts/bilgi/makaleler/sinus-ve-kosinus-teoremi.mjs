export default {
  slug: "sinus-ve-kosinus-teoremi",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Sinüs ve Kosinüs Teoremi Nedir? Formüller ve Üçgen Soru Çözümleri",
  pageTitle: "Sinüs ve Kosinüs Teoremi: Formüller ve Çözümlü Üçgen Soruları",
  description: "Sinüs teoremi a/sinA = b/sinB = c/sinC = 2R; kosinüs teoremi a² = b² + c² − 2bc·cosA. Hangisinin ne zaman kullanılacağı, alan formülü ve çözümlü örnekler.",
  keywords: ["sinüs teoremi", "kosinüs teoremi", "sinüs teoremi formülü", "kosinüs teoremi ne zaman kullanılır", "üçgen alanı sinüs", "dik olmayan üçgen kenar bulma", "çevrel çember yarıçapı sinüs teoremi", "ayt trigonometri"],
  lead: "Sinüs teoremi, <strong>bir üçgende her kenarın karşısındaki açının sinüsüne oranının sabit ve çevrel çemberin çapına eşit olduğunu</strong> söyler: a ÷ sinA = b ÷ sinB = c ÷ sinC = 2R. Kosinüs teoremi ise iki kenarı ve aradaki açısı bilinen üçgende üçüncü kenarı verir: a² = b² + c² − 2bc · cosA. Dik olmayan üçgenlerde kenar ve açı bulmanın iki temel aracıdır; 11. sınıf matematik ve AYT trigonometri konularında yer alır. Bu yazıda hangi durumda hangi teoremin seçileceğini, sinüsle alan formülünü, iki çözümlü belirsiz durumu ve adım adım çözülmüş örnekleri bulacaksınız.",
  kisaCevap: [
    "Sinüs teoremi: a ÷ sinA = b ÷ sinB = c ÷ sinC = 2R (R: çevrel çemberin yarıçapı).",
    "Kosinüs teoremi: a² = b² + c² − 2bc · cosA; diğer kenarlar için harfler döndürülür.",
    "İki açı ve bir kenar ya da iki kenar ve birinin karşısındaki açı biliniyorsa sinüs teoremi kullanılır.",
    "İki kenar ve aradaki açı ya da üç kenar biliniyorsa kosinüs teoremi kullanılır.",
    "Kosinüs teoremi Pisagor teoreminin genellemesidir: A = 90° iken cosA = 0 ve a² = b² + c² olur.",
    "Üçgen alanı = ½ · b · c · sinA; iki kenar ve aradaki açı yeterlidir."
  ],
  figure: {
    alt: "Köşeleri A, B, C ve karşı kenarları a, b, c olan bir üçgen; yanında sinüs teoremi, kosinüs teoremi ve alan formülü ile b=5, c=8, A=60° örneğinde a=7 sonucu.",
    caption: "Kenarlar karşılarındaki açının küçük harfiyle adlandırılır: a kenarı A açısının karşısındadır. Örnekte iki kenar ve aradaki 60°'lik açı bilindiği için kosinüs teoremi seçilir ve üçüncü kenar 7 bulunur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Sinüs ve kosinüs teoremi</text>
  <polygon points="60,330 340,330 148,178" class="ps sp sw"/>
  <path d="M86 330 A26 26 0 0 0 73 307" class="sp sw" fill="none"/>
  <text x="44" y="352" class="lg b">A</text>
  <text x="346" y="352" class="lg b">B</text>
  <text x="140" y="164" class="lg b">C</text>
  <text x="96" y="318" class="sm b p">60°</text>
  <text x="200" y="356" class="mid b">c = 8</text>
  <text x="92" y="250" class="b end">b = 5</text>
  <text x="258" y="244" class="b">a = ?</text>
  <rect x="390" y="60" width="310" height="96" rx="10" class="sf sb"/>
  <rect x="390" y="60" width="8" height="96" class="p"/>
  <text x="412" y="86" class="b p">Sinüs teoremi</text>
  <text x="412" y="114">a/sinA = b/sinB = c/sinC</text>
  <text x="412" y="140">= 2R (çevrel çemberin çapı)</text>
  <rect x="390" y="170" width="310" height="96" rx="10" class="sf sb"/>
  <rect x="390" y="170" width="8" height="96" class="ok"/>
  <text x="412" y="196" class="b ok">Kosinüs teoremi</text>
  <text x="412" y="224">a² = b² + c² − 2·b·c·cosA</text>
  <text x="412" y="250" class="sm t2">A = 90° ise cosA = 0 → Pisagor</text>
  <rect x="390" y="280" width="310" height="120" rx="10" class="oks"/>
  <text x="412" y="306" class="b">Örnek: b = 5, c = 8, A = 60°</text>
  <text x="412" y="332">a² = 25 + 64 − 2·5·8·0,5 = 49</text>
  <text x="412" y="358" class="b">a = 7</text>
  <text x="412" y="384" class="sm">Alan = ½·5·8·sin60° ≈ 17,32</text>
</svg>`
  },
  sections: [
    {
      h: "Gösterim: kenarlar ve karşı açılar",
      p: [
        "Bir ABC üçgeninde köşeler ve o köşelerdeki iç açılar büyük harfle (A, B, C), kenarlar ise karşısındaki açının küçük harfiyle (a, b, c) gösterilir. Yani a kenarı A açısının karşısındaki BC kenarıdır, b kenarı B açısının karşısındaki AC kenarıdır. İki teoremin de doğru uygulanması bu eşleşmeye bağlıdır; soruyu çözmeden önce üçgenin şeklini çizip kenar-açı eşlemesini işaretlemek hataları büyük ölçüde önler.",
        "Dik üçgenlerde sinüs, kosinüs ve tanjant oranları doğrudan kenarlardan bulunur. Dik açısı olmayan üçgenlerde ise bu oranlar tek başına yetmez; sinüs ve kosinüs teoremleri devreye girer. Trigonometrik oranların temel değerlerini (30°, 45°, 60° gibi) [[bilgi:trigonometri-sin-cos-tan-tablosu|sin, cos, tan tablosu]] yazısında, dik üçgen bağıntılarını [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Sinüs teoremi nedir?",
      formula: "a ÷ sinA = b ÷ sinB = c ÷ sinC = 2R\nKenar bulma: b = a × sinB ÷ sinA\nAçı bulma: sinB = b × sinA ÷ a",
      p: [
        "Sinüs teoremine göre bir üçgende her kenarın uzunluğu, karşısındaki açının sinüsüyle orantılıdır. Büyük açının karşısında büyük kenar, küçük açının karşısında küçük kenar bulunur. Oranın değeri, üçgenin üç köşesinden geçen <strong>çevrel çemberin çapına (2R)</strong> eşittir.",
        "Sinüs teoremi şu iki durumda kullanılır: <strong>iki açı ve bir kenar</strong> bilindiğinde (üçüncü açı 180°'den çıkarılarak bulunur, sonra diğer kenarlar hesaplanır) ve <strong>iki kenar ile bunlardan birinin karşısındaki açı</strong> bilindiğinde. İkinci durum, aşağıda anlatılacağı gibi bazen iki farklı üçgen verebilir."
      ]
    },
    {
      h: "Sinüs teoremi çözümlü örnekler",
      ol: [
        "<strong>İki açı, bir kenar:</strong> A = 45°, B = 60°, a = 10 birim. Önce C = 180° − 45° − 60° = 75°. b = 10 × sin60° ÷ sin45° = 10 × (√3/2) ÷ (√2/2) = 5√6 ≈ <strong>12,25</strong>. c = 10 × sin75° ÷ sin45° = 5(√3 + 1) ≈ <strong>13,66</strong>. En büyük kenar en büyük açının (75°) karşısındadır.",
        "<strong>Çevrel çember yarıçapı:</strong> Aynı üçgende 2R = a ÷ sinA = 10 ÷ (√2/2) = 10√2, yani R = 5√2 ≈ <strong>7,07</strong> birim.",
        "<strong>Doğrudan yarıçap sorusu:</strong> Bir üçgende a = 6 ve A = 30° ise 2R = 6 ÷ 0,5 = 12, R = <strong>6</strong>. Bu tür sorularda diğer kenar ve açılara ihtiyaç yoktur.",
        "<strong>Açı bulma:</strong> a = 8, b = 8√3, A = 30° ise sinB = 8√3 × 0,5 ÷ 8 = √3/2. B = 60° ya da B = 120° olabilir; ikisi de A ile toplandığında 180°'den küçük olduğu için iki üçgen de geçerlidir. Bu, aşağıdaki belirsiz duruma bir örnektir."
      ],
      after: [
        "Sonuçları [[arac:sinus-teoremi-hesapla|Sinüs Teoremi Hesaplama]] aracıyla kontrol edebilirsiniz. İki açı bir kenar ya da iki kenar bir açı girdiğinizde araç bilinmeyen kenar ve açıları bulur, belirsiz durumdaki iki çözümü de ayrı ayrı gösterir."
      ]
    },
    {
      h: "Belirsiz durum: iki kenar ve karşı açı",
      p: [
        "İki kenar ve bunlardan birinin karşısındaki açı (kenar-kenar-açı) verildiğinde sinüs teoremi bir açının sinüsünü verir. Sinüs değeri 0 ile 1 arasındaysa bu değere karşılık gelen bir dar açı (x) ve bir geniş açı (180° − x) vardır. Geniş açı, verilen açıyla toplandığında 180°'yi aşmıyorsa iki farklı üçgen kurulabilir; aşıyorsa tek üçgen vardır. Sinüs değeri 1'den büyük çıkarsa böyle bir üçgen yoktur."
      ],
      ol: [
        "a = 6, b = 8, A = 30° verilsin. sinB = 8 × sin30° ÷ 6 = 4 ÷ 6 ≈ 0,6667.",
        "B₁ ≈ 41,81° ya da B₂ ≈ 138,19°. 30° + 138,19° = 168,19° < 180° olduğu için iki çözüm de geçerlidir.",
        "Birinci üçgen: C₁ = 180° − 30° − 41,81° = 108,19°; c₁ = 6 × sin108,19° ÷ sin30° ≈ <strong>11,40</strong>.",
        "İkinci üçgen: C₂ = 180° − 30° − 138,19° = 11,81°; c₂ = 6 × sin11,81° ÷ sin30° ≈ <strong>2,46</strong>.",
        "Aynı a = 6, A = 30° ile b = 15 verilseydi sinB = 15 × 0,5 ÷ 6 = 1,25 > 1 olurdu; böyle bir üçgen çizilemez."
      ],
      after: [
        "Sınav sorularında şekil verildiyse açının dar mı geniş mi olduğu şekilden anlaşılır. Şekil yoksa iki çözümü de kontrol etmek gerekir. Pratik bir kural: verilen açının karşısındaki kenar (a), diğer verilen kenardan (b) büyük ya da ona eşitse yalnızca tek üçgen vardır."
      ]
    },
    {
      h: "Kosinüs teoremi nedir?",
      formula: "a² = b² + c² − 2 · b · c · cosA\nb² = a² + c² − 2 · a · c · cosB\nc² = a² + b² − 2 · a · b · cosC\nAçı bulma: cosA = (b² + c² − a²) ÷ (2 · b · c)",
      p: [
        "Kosinüs teoremi bir kenarın karesini, diğer iki kenar ve bunların arasındaki açı cinsinden verir. Formülü hatırlamanın yolu şudur: aradığınız kenarın karşısındaki açıyı kullanırsınız ve formüldeki iki kenar o açıyı oluşturan kenarlardır.",
        "Kosinüs teoremi iki durumda kullanılır: <strong>iki kenar ve aradaki açı</strong> bilindiğinde üçüncü kenarı bulmak için ve <strong>üç kenar</strong> bilindiğinde açıları bulmak için. Bu iki durumda üçgen tektir; belirsizlik yoktur, çünkü 0° ile 180° arasında her kosinüs değerine tek bir açı karşılık gelir."
      ]
    },
    {
      h: "Kosinüs teoremi çözümlü örnekler",
      ol: [
        "<strong>İki kenar ve aradaki açı:</strong> b = 5, c = 8, A = 60°. a² = 25 + 64 − 2 × 5 × 8 × 0,5 = 89 − 40 = 49, a = <strong>7</strong>.",
        "<strong>Geniş açılı üçgen:</strong> b = 3, c = 5, A = 120°. cos120° = −0,5 olduğu için çıkarma toplamaya döner: a² = 9 + 25 − 2 × 3 × 5 × (−0,5) = 34 + 15 = 49, a = <strong>7</strong>. Geniş açının karşısındaki kenar en uzun kenardır.",
        "<strong>Üç kenardan açı:</strong> a = 7, b = 5, c = 8. cosA = (25 + 64 − 49) ÷ (2 × 5 × 8) = 40 ÷ 80 = 0,5, A = <strong>60°</strong>. cosB = (49 + 64 − 25) ÷ (2 × 7 × 8) = 88 ÷ 112 ≈ 0,7857, B ≈ <strong>38,21°</strong>. C = 180° − 60° − 38,21° ≈ <strong>81,79°</strong>.",
        "<strong>Kontrol:</strong> cosC = (49 + 25 − 64) ÷ (2 × 7 × 5) = 10 ÷ 70 ≈ 0,1429, C ≈ 81,79°. Üç açının toplamı 180° ediyor.",
        "<strong>Üçgenin türünü belirleme:</strong> En uzun kenarın karesi diğer ikisinin kareleri toplamından küçükse üçgen dar açılı, eşitse dik, büyükse geniş açılıdır. 7, 5, 8 üçgeninde 8² = 64 < 49 + 25 = 74 olduğu için üçgen dar açılıdır."
      ],
      after: [
        "Bu hesapları [[arac:kosinus-teoremi-hesapla|Kosinüs Teoremi Hesaplama]] aracıyla yapabilirsiniz; iki kenar ve aradaki açıdan üçüncü kenarı ya da üç kenardan açıları, çevre ve alanla birlikte verir."
      ]
    },
    {
      h: "Hangi durumda hangi teorem kullanılır?",
      table: {
        head: ["Bilinenler", "Kısaltma", "Kullanılacak teorem", "Çözüm sayısı"],
        rows: [
          ["İki açı ve bir kenar", "AAK / AKA", "Sinüs teoremi", "Tek"],
          ["İki kenar ve birinin karşı açısı", "KKA", "Sinüs teoremi", "0, 1 ya da 2"],
          ["İki kenar ve aradaki açı", "KAK", "Kosinüs teoremi", "Tek"],
          ["Üç kenar", "KKK", "Kosinüs teoremi", "Tek (üçgen eşitsizliği sağlanıyorsa)"],
          ["Üç açı", "AAA", "Kenar bulunamaz; yalnızca oranlar", "Sonsuz (benzer üçgenler)"]
        ]
      },
      after: [
        "Çoğu soruda iki teorem art arda kullanılır. Örneğin üç kenar verildiğinde ilk açı kosinüs teoremiyle bulunur; ikinci açıyı sinüs teoremiyle bulmak daha kısa olabilir. Ancak sinüs teoremi geniş açılarda dar açıyı verebileceği için, ikinci adımda da kosinüs teoremini kullanmak ya da en büyük açıyı önce bulmak daha güvenlidir.",
        "Üç açının bilinmesi kenar uzunluklarını belirlemez; aynı açılara sahip sonsuz sayıda benzer üçgen vardır. Açılarla ilgili temel kuralları [[bilgi:ucgende-acilar|üçgende açılar]] yazısında tekrar edebilirsiniz."
      ]
    },
    {
      h: "Kosinüs teoremi Pisagor'un genellemesi mi?",
      p: [
        "Evet. Kosinüs teoreminde A açısı 90° alınırsa cos90° = 0 olur ve formül a² = b² + c² hâline gelir; bu, Pisagor teoremidir. Yani Pisagor teoremi, kosinüs teoreminin dik üçgen için özel bir durumudur.",
        "Formüldeki −2bc · cosA terimi, açının 90°'den ne kadar saptığını hesaba katar. A dar açıysa cosA pozitiftir ve a², b² + c²'den küçük olur. A geniş açıysa cosA negatiftir ve a², b² + c²'den büyük olur. Bu gözlem, üç kenarı verilen bir üçgenin dar, dik ya da geniş açılı olduğunu hiç açı hesaplamadan anlamanızı sağlar."
      ]
    },
    {
      h: "Üçgen alanı sinüs ile nasıl bulunur?",
      formula: "Alan = ½ · b · c · sinA = ½ · a · c · sinB = ½ · a · b · sinC\nAlan = a · b · c ÷ (4R)",
      p: [
        "İki kenarı ve aradaki açısı bilinen bir üçgenin alanı, bu iki kenarın çarpımının yarısının aradaki açının sinüsüyle çarpımıdır. Formül, taban × yükseklik ÷ 2 formülünden gelir: c tabanına inen yükseklik b · sinA'dır."
      ],
      ol: [
        "b = 5, c = 8, A = 60°: Alan = ½ × 5 × 8 × sin60° = 20 × (√3/2) = 10√3 ≈ <strong>17,32</strong> birimkare. Üç kenar (7, 5, 8) üzerinden Heron formülüyle de aynı sonuç çıkar: s = 10, √(10 × 3 × 5 × 2) = √300 = 10√3.",
        "b = 3, c = 5, A = 120°: Alan = ½ × 3 × 5 × sin120° = 7,5 × (√3/2) ≈ <strong>6,50</strong>. sin120° = sin60° olduğu için geniş açıda da formül aynen çalışır.",
        "<strong>Arazi örneği:</strong> Üçgen bir tarlanın iki kenarı 40 m ve 55 m, aradaki açı 70° ölçülmüş. Alan = ½ × 40 × 55 × sin70° ≈ 1.100 × 0,9397 ≈ <strong>1.033,7 m²</strong>. Üçüncü kenar kosinüs teoremiyle √(1.600 + 3.025 − 4.400 × cos70°) ≈ <strong>55,86 m</strong> bulunur."
      ],
      after: [
        "Alanı farklı verilerle (taban-yükseklik, üç kenar ya da iki kenar ve açı) hesaplamak için [[arac:ucgen-alani-hesapla|Üçgen Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kenar-açı eşleşmesini karıştırmak:</strong> Sinüs teoreminde her kenar kendi karşısındaki açıyla eşleşir; komşu açıyı kullanmak yanlış sonuç verir.",
        "<strong>Hesap makinesini radyanda bırakmak:</strong> Açılar derece cinsindense hesap makinesi DEG modunda olmalıdır; sin60 radyanda −0,30 verir.",
        "<strong>Geniş açının kosinüsünün işaretini unutmak:</strong> cos120° = −0,5'tir; eksi işareti formüldeki çıkarmayı toplamaya çevirir.",
        "<strong>Belirsiz durumu atlamak:</strong> Kenar-kenar-açı verildiğinde ikinci olası üçgeni kontrol etmemek, sınavda yarım puan kaybettirir.",
        "<strong>Karekökü almayı unutmak:</strong> Kosinüs teoremi kenarın karesini verir; son adımda karekök alınmalıdır. Karekök hesabı için [[bilgi:karekok-nasil-alinir|karekök nasıl alınır]] yazısına bakabilirsiniz.",
        "<strong>Ara sonuçları erken yuvarlamak:</strong> Çok adımlı sorularda ara değerleri en az dört ondalık basamakla taşıyın."
      ]
    }
  ],
  faq: [
    ["Sinüs teoremi nedir?", "Sinüs teoremi, bir üçgende her kenarın karşısındaki açının sinüsüne oranının sabit olduğunu söyler: a bölü sinA eşittir b bölü sinB eşittir c bölü sinC. Bu ortak oran, üçgenin çevrel çemberinin çapına, yani 2R'ye eşittir."],
    ["Kosinüs teoremi nedir?", "Kosinüs teoremi, bir kenarın karesinin diğer iki kenarın kareleri toplamından, bu iki kenarın çarpımının iki katı ile aradaki açının kosinüsünün çarpımı çıkarılarak bulunduğunu söyler: a² = b² + c² − 2bc·cosA."],
    ["Hangi durumda sinüs, hangisinde kosinüs teoremi kullanılır?", "İki açı ve bir kenar ya da iki kenar ve birinin karşısındaki açı biliniyorsa sinüs teoremi kullanılır. İki kenar ve aradaki açı ya da üç kenar biliniyorsa kosinüs teoremi kullanılır."],
    ["Kosinüs teoremi Pisagor'un genellemesi mi?", "Evet. Kosinüs teoreminde açı 90 derece alındığında kosinüs sıfır olur ve formül a² = b² + c² şeklindeki Pisagor teoremine dönüşür. Pisagor teoremi, kosinüs teoreminin dik üçgendeki özel hâlidir."],
    ["Üçgen alanı sinüs ile nasıl bulunur?", "İki kenarı ve aradaki açısı bilinen üçgenin alanı, iki kenarın çarpımının yarısının bu açının sinüsüyle çarpımıdır. Kenarları 5 ve 8, aradaki açısı 60 derece olan üçgenin alanı yaklaşık 17,32 birimkaredir."],
    ["İki kenar ve aradaki açı bilinirse üçüncü kenar nasıl bulunur?", "Kosinüs teoremi kullanılır. Kenarlar 5 ve 8, aradaki açı 60 derece ise üçüncü kenarın karesi 25 + 64 − 2·5·8·0,5 = 49 olur ve üçüncü kenar 7 bulunur."],
    ["Üç kenarı bilinen üçgenin açısı nasıl hesaplanır?", "Kosinüs teoreminin açı biçimi kullanılır: cosA = (b² + c² − a²) ÷ (2bc). Kenarları 7, 5 ve 8 olan üçgende 7'nin karşısındaki açının kosinüsü 0,5 çıkar ve açı 60 derecedir."],
    ["Çevrel çember yarıçapı sinüs teoremiyle nasıl bulunur?", "Herhangi bir kenar karşısındaki açının sinüsüne bölünür ve sonuç ikiye bölünür: R = a ÷ (2·sinA). Örneğin a = 6 ve A = 30 derece ise R = 6 ÷ (2·0,5) = 6 birimdir."],
    ["Sinüs teoremi neden bazen iki sonuç verir?", "İki kenar ve birinin karşısındaki açı verildiğinde teorem bir açının sinüsünü bulur. Aynı sinüs değerine bir dar ve bir geniş açı karşılık geldiğinden, geniş açı üçgen koşulunu sağlıyorsa iki farklı üçgen oluşur."]
  ],
  tools: ["sinus-teoremi-hesapla", "kosinus-teoremi-hesapla", "ucgen-alani-hesapla", "ters-trigonometri-hesapla"],
  related: ["trigonometri-sin-cos-tan-tablosu", "pisagor-teoremi-nedir", "ucgende-acilar", "alan-ve-hacim-formulleri"],
  sources: [
    ["Millî Eğitim Bakanlığı – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kılavuzu ve konu kapsamı", "https://www.osym.gov.tr/"]
  ]
};
