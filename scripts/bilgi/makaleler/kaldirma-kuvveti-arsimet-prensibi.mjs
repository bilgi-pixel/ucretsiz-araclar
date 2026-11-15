export default {
  slug: "kaldirma-kuvveti-arsimet-prensibi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Kaldırma Kuvveti Nedir? Arşimet Prensibi, Formül ve Yüzme-Batma Koşulları",
  pageTitle: "Kaldırma Kuvveti ve Arşimet Prensibi: Formül ve Örnekler",
  description: "Kaldırma kuvveti, cismin taşırdığı sıvının ağırlığına eşittir: Fk = V_batan · d_sıvı · g. Yüzme, askıda kalma, batma koşulları, gemiler ve çözümlü örnekler.",
  keywords: ["kaldırma kuvveti nedir", "arşimet prensibi", "kaldırma kuvveti formülü", "cisimler neden yüzer", "yüzme batma askıda kalma", "gemiler neden batmaz", "tuzlu suda yüzmek", "kaldırma kuvveti hesaplama"],
  lead: "Kaldırma kuvveti, <strong>bir sıvıya kısmen ya da tamamen batan cisme sıvının yukarı doğru uyguladığı kuvvettir ve büyüklüğü cismin yerini değiştirdiği sıvının ağırlığına eşittir</strong>; buna Arşimet prensibi denir. Formülü Fk = V_batan · d_sıvı · g'dir. Örneğin suya tamamen batan 2 litrelik bir taşa yaklaşık 20 N kaldırma kuvveti etki eder (g = 10 m/s²). Cismin yoğunluğu sıvınınkinden küçükse yüzer, eşitse askıda kalır, büyükse batar. Bu yazıda formülü, yüzme-batma koşullarını, gemilerin neden batmadığını ve çözümlü örnekleri anlatıyoruz.",
  kisaCevap: [
    "Arşimet prensibi: kaldırma kuvveti, cismin batan kısmının yerini değiştirdiği sıvının ağırlığına eşittir.",
    "Formül: Fk = V_batan · d_sıvı · g (V: m³, d: kg/m³, g ≈ 10 m/s², Fk: N).",
    "Yüzme: d_cisim < d_sıvı; askıda kalma: d_cisim = d_sıvı; batma: d_cisim > d_sıvı.",
    "Yüzen cisimde kaldırma kuvveti cismin ağırlığına eşittir; batan kısmın oranı d_cisim ÷ d_sıvı'dır.",
    "Tamamen batmış cisimde kaldırma kuvveti derinliğe bağlı değildir.",
    "Sıvıdaki görünür ağırlık = gerçek ağırlık − kaldırma kuvveti."
  ],
  figure: {
    alt: "Üç kapta aynı hacimli üç cisim: yoğunluğu sudan küçük olan yüzer, eşit olan askıda kalır, büyük olan batar. Her cisimde yukarı kaldırma kuvveti ve aşağı ağırlık okları gösterilmiş.",
    caption: "Yüzen cisimde kaldırma kuvveti ağırlığa eşittir ve cismin yalnızca bir kısmı batar. Askıdaki cisimde kuvvetler yine eşittir ama cisim tamamen batmıştır. Batan cisimde ağırlık, alabileceği en büyük kaldırma kuvvetinden büyüktür; cisim tabana kadar iner.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="p"/></marker>
  <marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="dg"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Yüzme, askıda kalma ve batma</text>
  <g>
    <rect x="40" y="120" width="190" height="200" class="ps"/>
    <path d="M40 60V320H230V60" class="st sw" fill="none"/>
    <rect x="100" y="96" width="70" height="60" rx="4" class="sf sb"/>
    <line x1="135" y1="96" x2="135" y2="58" class="sp sw" fill="none" marker-end="url(#ak)"/>
    <line x1="135" y1="156" x2="135" y2="196" class="sdg sw" fill="none" marker-end="url(#ag)"/>
    <text x="146" y="72" class="sm b p">Fk</text><text x="146" y="194" class="sm b dg">G</text>
    <text x="135" y="346" class="b mid">Yüzer</text>
    <text x="135" y="366" class="sm mid">d_cisim &lt; d_sıvı</text>
    <text x="135" y="386" class="sm mid t2">Fk = G, bir kısmı batık</text>
  </g>
  <g>
    <rect x="265" y="120" width="190" height="200" class="ps"/>
    <path d="M265 60V320H455V60" class="st sw" fill="none"/>
    <rect x="325" y="180" width="70" height="60" rx="4" class="sf sb"/>
    <line x1="360" y1="180" x2="360" y2="136" class="sp sw" fill="none" marker-end="url(#ak)"/>
    <line x1="360" y1="240" x2="360" y2="284" class="sdg sw" fill="none" marker-end="url(#ag)"/>
    <text x="371" y="150" class="sm b p">Fk</text><text x="371" y="280" class="sm b dg">G</text>
    <text x="360" y="346" class="b mid">Askıda kalır</text>
    <text x="360" y="366" class="sm mid">d_cisim = d_sıvı</text>
    <text x="360" y="386" class="sm mid t2">Fk = G, tamamen batık</text>
  </g>
  <g>
    <rect x="490" y="120" width="190" height="200" class="ps"/>
    <path d="M490 60V320H680V60" class="st sw" fill="none"/>
    <rect x="550" y="258" width="70" height="60" rx="4" class="p"/>
    <line x1="585" y1="258" x2="585" y2="226" class="sp sw" fill="none" marker-end="url(#ak)"/>
    <text x="596" y="238" class="sm b p">Fk</text>
    <text x="635" y="300" class="sm b dg">G &gt; Fk</text>
    <text x="585" y="346" class="b mid">Batar</text>
    <text x="585" y="366" class="sm mid">d_cisim &gt; d_sıvı</text>
    <text x="585" y="386" class="sm mid t2">tabana kadar iner</text>
  </g>
  <text x="360" y="410" class="sm mid">Fk = V_batan × d_sıvı × g</text>
</svg>`
  },
  sections: [
    {
      h: "Kaldırma kuvveti nedir?",
      p: [
        "Bir sıvının içine batırılan her cisim, sıvı tarafından yukarı doğru itilir. Bu itmeye <strong>kaldırma kuvveti</strong> denir. Suyun içinde bir taşı kaldırmanın havada kaldırmaktan kolay olması, havuzda vücudumuzun hafiflemiş hissetmesi ve bir topun suya bastırıldığında yukarı fırlaması bu kuvvetin sonucudur.",
        "Kaldırma kuvvetinin kaynağı sıvı basıncıdır. Sıvı basıncı derinlikle arttığı için cismin alt yüzeyine etki eden basınç, üst yüzeyine etki edenden büyüktür. Bu basınç farkı, cismi yukarı iten net bir kuvvet oluşturur. Basıncın derinlikle nasıl değiştiğini [[bilgi:basinc-nedir-nasil-hesaplanir|basınç]] yazısında bulabilirsiniz.",
        "Kaldırma kuvveti yalnızca sıvılarda değil gazlarda da vardır. Sıcak hava balonları ve helyum balonları havanın kaldırma kuvvetiyle yükselir. Ancak havanın yoğunluğu çok küçük olduğu için günlük hayattaki cisimlerde bu etki genellikle ihmal edilir."
      ]
    },
    {
      h: "Arşimet prensibi nedir?",
      p: [
        "Antik Yunan bilgini Arşimet'e atfedilen prensip şöyle ifade edilir: <strong>Bir sıvıya kısmen ya da tamamen daldırılan cisme, yerini değiştirdiği sıvının ağırlığı kadar bir kaldırma kuvveti etki eder.</strong> Cisim sıvıya girdiğinde kendi batan hacmi kadar sıvıyı yerinden eder ve sıvı, bu \"eksik kalan\" kısmın ağırlığı kadar cismi yukarı iter.",
        "Rivayete göre Arşimet, kralın tacının saf altından yapılıp yapılmadığını anlamak için tacın taşırdığı su hacmini ölçmeyi küvette yıkanırken düşünmüştür. Taçla aynı kütledeki saf altının taşıracağı su daha az olmalıydı; çünkü altının yoğunluğu gümüş gibi metallerden büyüktür. Bu yöntem bugün de düzensiz şekilli cisimlerin hacmini ve yoğunluğunu ölçmek için kullanılır."
      ]
    },
    {
      h: "Kaldırma kuvveti nasıl hesaplanır?",
      formula: "Fk = V_batan × d_sıvı × g\nV_batan: cismin sıvı içindeki hacmi (m³)\nd_sıvı: sıvının yoğunluğu (kg/m³) · g: yer çekimi ivmesi (≈ 10 m/s²)\nSıvıdaki görünür ağırlık = G − Fk",
      p: [
        "Formülde cismin kendi yoğunluğu ya da kütlesi yoktur: kaldırma kuvveti yalnızca batan hacme ve sıvının yoğunluğuna bağlıdır. Aynı hacimdeki demir ve alüminyum küpler suya tamamen batırıldığında ikisine de aynı kaldırma kuvveti etki eder; farkları, ağırlıklarının farklı olmasıdır.",
        "Birimlere dikkat edin: 1 litre = 1 dm³ = 0,001 m³, 1 cm³ = 0,000001 m³ ve suyun yoğunluğu 1 g/cm³ = 1.000 kg/m³'tür. Hesapları SI birimleriyle yaparsanız kaldırma kuvveti newton cinsinden çıkar. [[arac:kaldirma-kuvveti-hesapla|Kaldırma Kuvveti Hesaplama]] aracı su, deniz suyu, cıva ya da kendi girdiğiniz yoğunlukla hesap yapar ve cismin yüzüp yüzmeyeceğini gösterir."
      ]
    },
    {
      h: "Çözümlü örnekler",
      ol: [
        "<strong>Tamamen batan taş:</strong> Hacmi 2 dm³ (0,002 m³), kütlesi 5 kg olan bir taş suya bırakılıyor. Fk = 0,002 × 1.000 × 10 = 20 N. Ağırlık G = 5 × 10 = 50 N. Görünür ağırlık 50 − 20 = <strong>30 N</strong>; taş batar çünkü 50 N > 20 N.",
        "<strong>Dinamometreyle yoğunluk bulma:</strong> Bir cisim havada 12 N, suya tamamen batırıldığında 8 N gösteriyor. Fk = 12 − 8 = 4 N. Batan hacim V = 4 ÷ (1.000 × 10) = 0,0004 m³ = 400 cm³. Kütle 12 ÷ 10 = 1,2 kg = 1.200 g. Yoğunluk 1.200 ÷ 400 = <strong>3 g/cm³</strong>.",
        "<strong>Yüzen tahta blok:</strong> Yoğunluğu 0,6 g/cm³ olan tahta suda yüzer ve hacminin 0,6 ÷ 1 = <strong>%60</strong>'ı suyun altında kalır. Aynı blok yoğunluğu 0,8 g/cm³ olan zeytinyağında hacminin 0,6 ÷ 0,8 = %75'i batık olarak yüzer.",
        "<strong>Yüzen cismin kaldırma kuvveti:</strong> 3 kg'lık bir top suda yüzüyor. Yüzen cisimde Fk = G olduğu için kaldırma kuvveti 30 N'dur. Batan hacim 30 ÷ (1.000 × 10) = 0,003 m³ = 3 litredir."
      ],
      after: [
        "İkinci örnekteki yöntem, şekli düzensiz cisimlerin yoğunluğunu ölçmenin en pratik yoludur. Yoğunluk kavramını ve maddelerin yoğunluk tablosunu [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk]] yazısında, hesabı [[arac:yogunluk-hesapla|Yoğunluk Hesaplama]] aracında bulabilirsiniz."
      ]
    },
    {
      h: "Cisimler neden yüzer, askıda kalır veya batar?",
      p: [
        "Bir cisim sıvıya bırakıldığında iki kuvvet karşı karşıya gelir: aşağı doğru ağırlık ve yukarı doğru kaldırma kuvveti. Cisim tamamen battığında alabileceği en büyük kaldırma kuvveti V_cisim × d_sıvı × g'dir. Ağırlık ise V_cisim × d_cisim × g'dir. İki ifade karşılaştırıldığında hacim ve g sadeleşir; geriye yalnızca yoğunluklar kalır."
      ],
      table: {
        head: ["Durum", "Yoğunluk koşulu", "Kuvvetler", "Batan hacim"],
        rows: [
          ["Yüzme", "d_cisim < d_sıvı", "Fk = G (denge)", "Hacmin d_cisim ÷ d_sıvı kadarı"],
          ["Askıda kalma", "d_cisim = d_sıvı", "Fk = G (denge)", "Tamamı, sıvının herhangi bir yerinde"],
          ["Batma", "d_cisim > d_sıvı", "G > Fk", "Tamamı, cisim tabana iner"]
        ]
      },
      after: [
        "Buz bu kuralın en bilinen örneğidir. Buzun yoğunluğu yaklaşık 0,92 g/cm³ olduğu için tatlı suda hacminin yaklaşık %92'si su altında kalır; buzdağlarının büyük kısmının görünmemesinin nedeni budur. Denizaltılar ise tanklarına su alıp boşaltarak ortalama yoğunluklarını değiştirir; tanklar dolunca batar, boşalınca yüzeye çıkar, ayarlandığında askıda kalır."
      ]
    },
    {
      h: "Demir gemi neden batmaz?",
      p: [
        "Çeliğin yoğunluğu yaklaşık 7,8 g/cm³'tür ve bir çelik bilye suda hemen batar. Gemi ise çelikten yapılmış olsa da içi büyük ölçüde havayla dolu bir kabuktur. Yüzme koşulunda belirleyici olan, malzemenin değil <strong>geminin ortalama yoğunluğudur</strong>: toplam kütlesinin, su çizgisinin altında kalabilecek toplam hacmine oranı. Bu oran suyun yoğunluğundan küçük olduğu sürece gemi yüzer.",
        "Gemi yüklendikçe ağırlığı artar, daha fazla suyu yerinden etmesi gerekir ve su çizgisi yükselir. Gemilerin gövdesindeki yükleme çizgileri, güvenli olarak ne kadar batabileceklerini gösterir. Gövde delinip içine su dolarsa ortalama yoğunluk artar ve gemi batar. Aynı hamur topak halindeyken batar ama ince bir kayık şekline getirildiğinde yüzer; bu basit deney ilkeyi sınıfta göstermek için sık kullanılır.",
        "Can yelekleri ve simitler de aynı ilkeyle çalışır: çok hafif ve büyük hacimli bir malzeme, kişinin vücuduna eklenince toplam hacmi kütlesinden çok daha fazla artırır. Böylece kişinin ve yeleğin ortalama yoğunluğu suyun altına düşer ve baş su üstünde kalır."
      ]
    },
    {
      h: "Tuzlu suda neden daha kolay yüzülür?",
      p: [
        "Tuz suda çözündüğünde suyun kütlesi artar ama hacmi neredeyse aynı kalır; bu yüzden yoğunluk yükselir. Deniz suyunun yoğunluğu ortalama 1,025 g/cm³ civarındadır, çok tuzlu göllerde bu değer 1,2 g/cm³'ün üzerine çıkabilir. Kaldırma kuvveti sıvının yoğunluğuyla orantılı olduğu için aynı insan denizde, havuzdakinden daha az batarak yüzer.",
        "Aynı nedenle bir gemi tatlı sudan tuzlu suya geçtiğinde biraz yükselir, tuzlu sudan nehre girdiğinde biraz daha batar. Evde de denenebilir: tatlı suda batan taze bir yumurta, suya yeterince tuz eklendiğinde önce askıda kalır, sonra yüzer."
      ]
    },
    {
      h: "Kaldırma kuvveti derinliğe bağlı mı?",
      p: [
        "Tamamen batmış bir cisim için hayır. Cisim daha derine indiğinde alt ve üst yüzeylerine etki eden basınçların ikisi de artar ama aradaki fark değişmez; çünkü fark yalnızca cismin yüksekliğine ve sıvının yoğunluğuna bağlıdır. Bu yüzden suyun 1 m ya da 10 m derinliğinde duran aynı taşa aynı kaldırma kuvveti etki eder.",
        "Kısmen batmış bir cisimde ise durum farklıdır: cisim daha fazla bastırılırsa batan hacmi arttığı için kaldırma kuvveti de artar. Su yüzeyindeki bir topu bastırdıkça zorlanmanızın nedeni budur; top tamamen battıktan sonra ise daha derine itmek için gereken kuvvet artmaz. Çok derin sularda suyun çok az sıkışması gibi etkiler okul problemlerinde ihmal edilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Cismin yoğunluğunu formüle koymak:</strong> Kaldırma kuvveti sıvının yoğunluğuyla hesaplanır, cismin değil.",
        "<strong>Toplam hacmi kullanmak:</strong> Yüzen cisimde yalnızca batan hacim formüle girer.",
        "<strong>Birimleri karıştırmak:</strong> cm³ ile kg/m³ birlikte kullanılırsa sonuç milyon kat hatalı çıkar.",
        "<strong>Ağır cisme daha büyük kaldırma kuvveti sanmak:</strong> Eşit hacimli batmış cisimlere eşit kaldırma kuvveti etki eder.",
        "<strong>Yüzen cisimde Fk'yi ağırlıktan farklı bulmak:</strong> Dengede yüzen cisimde kaldırma kuvveti her zaman ağırlığa eşittir."
      ],
      after: [
        "Cismin hacmini bulmakta zorlanırsanız [[arac:hacim-hesapla|Hacim Hesaplama]] aracı küp, silindir ve küre gibi şekillerin hacmini m³ ve litre olarak verir."
      ]
    }
  ],
  faq: [
    ["Kaldırma kuvveti nedir?", "Kaldırma kuvveti, sıvıya ya da gaza batan bir cisme akışkanın yukarı yönde uyguladığı kuvvettir. Sıvı basıncının derinlikle artmasından doğar ve büyüklüğü cismin yerini değiştirdiği akışkanın ağırlığına eşittir."],
    ["Arşimet prensibi nedir?", "Arşimet prensibine göre bir sıvıya kısmen ya da tamamen daldırılan cisme, yerini değiştirdiği sıvının ağırlığı kadar yukarı yönlü kaldırma kuvveti etki eder. Prensip yüzme, batma ve yoğunluk ölçümünün temelidir."],
    ["Kaldırma kuvveti nasıl hesaplanır?", "Batan hacim, sıvının yoğunluğu ve yer çekimi ivmesi çarpılır: Fk = V × d × g. Suya tamamen batan 2 litrelik bir cisme 0,002 × 1.000 × 10 = 20 newton kaldırma kuvveti etki eder."],
    ["Cisimler neden yüzer veya batar?", "Cismin yoğunluğu sıvının yoğunluğundan küçükse cisim yüzer, büyükse batar. Yoğunluklar eşitse cisim sıvının içinde askıda kalır. Belirleyici olan cismin ortalama yoğunluğudur, ağırlığı ya da büyüklüğü değildir."],
    ["Demir gemi neden batmaz?", "Gemi çelikten yapılsa da içi büyük ölçüde hava dolu bir kabuktur ve ortalama yoğunluğu suyun yoğunluğundan küçüktür. Bu nedenle ağırlığına eşit miktarda suyu yerinden ettiğinde dengeye gelir ve yüzer."],
    ["Askıda kalma koşulu nedir?", "Bir cismin sıvı içinde askıda kalması için yoğunluğunun sıvının yoğunluğuna eşit olması gerekir. Bu durumda cisim tamamen batıktır ve kaldırma kuvveti ağırlığına eşit olduğu için sıvının herhangi bir yerinde dengede durur."],
    ["Tuzlu suda neden daha kolay yüzülür?", "Tuz çözündüğünde suyun yoğunluğu artar; deniz suyu yaklaşık 1,025 g/cm³'tür. Kaldırma kuvveti sıvının yoğunluğuyla orantılı olduğu için aynı vücut tuzlu suda daha az batarak, daha kolay yüzer."],
    ["Sıvıdaki görünür ağırlık nasıl bulunur?", "Cismin havadaki ağırlığından ona etki eden kaldırma kuvveti çıkarılır. Havada 50 newton gelen ve suda 20 newton kaldırma kuvveti alan bir taş, suyun içinde 30 newton ağırlığındaymış gibi hissedilir."],
    ["Sıcak hava balonu neden yükselir?", "Balonun içindeki ısıtılmış havanın yoğunluğu dışarıdaki soğuk havadan küçüktür. Balonun yerini değiştirdiği havanın ağırlığı, balonun, sepetin ve içindeki sıcak havanın toplam ağırlığını aştığında balon yükselir."],
    ["Kaldırma kuvveti derinliğe bağlı mı?", "Tamamen batmış bir cisim için derinliğe bağlı değildir, çünkü alt ve üst yüzeyler arasındaki basınç farkı derinlikle değişmez. Kısmen batmış cisimde ise batan hacim arttıkça kaldırma kuvveti de artar."]
  ],
  tools: ["kaldirma-kuvveti-hesapla", "yogunluk-hesapla", "hacim-hesapla"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "basinc-nedir-nasil-hesaplanir", "kutle-ve-agirlik-farki"],
  sources: [
    ["Millî Eğitim Bakanlığı – Fen bilimleri ve fizik öğretim programları", "https://www.meb.gov.tr/"]
  ]
};
