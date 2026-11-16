export default {
  slug: "dekara-ne-kadar-gubre-atilir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Dekara Ne Kadar Gübre Atılır? Buğday, Mısır ve Bahçe İçin Gübre Hesabı",
  pageTitle: "Dekara Ne Kadar Gübre Atılır? Saf Besinden Gübre Hesabı",
  description: "Dekara atılacak gübre = önerilen saf besin ÷ gübredeki besin oranı. Toprak analizinin önemi, üre, DAP ve 20.20.0 hesabı, buğday örneği, dönüm–dekar–hektar farkı.",
  keywords: ["dekara ne kadar gübre atılır", "dekara kaç kg üre", "buğdaya kaç kilo gübre", "gübre hesaplama", "dap gübre dekara", "saf azot hesabı", "toprak analizi", "20.20.0 gübre"],
  lead: "Dekara atılacak gübre miktarı, <strong>toprak analizine göre önerilen saf besin miktarının gübredeki besin oranına bölünmesiyle</strong> bulunur: dekara 9,65 kg saf azot gerekiyorsa %46 azotlu üreden 9,65 ÷ 0,46 ≈ 21 kg atılır. Önerilen saf besin miktarı ise ürüne, toprağın yapısına, önceki ürüne, sulama durumuna ve hedef verime göre değişir; bu yüzden tek bir \"doğru\" sayı yoktur ve en sağlıklı başlangıç noktası toprak analizidir. Bu sayfada hesabın mantığını, gübre türlerini ve buğday için örnek bir planı adım adım gösteriyoruz.",
  kisaCevap: [
    "Gübre (kg/da) = önerilen saf besin (kg/da) ÷ (gübredeki besin yüzdesi ÷ 100).",
    "Üre %46 N, amonyum nitrat %33 N, DAP %18 N ve %46 P<sub>2</sub>O<sub>5</sub>, 20.20.0 ise %20 N ve %20 P<sub>2</sub>O<sub>5</sub> içerir.",
    "Kompoze gübrelerdeki üç sayı sırasıyla azot (N), fosfor (P<sub>2</sub>O<sub>5</sub>) ve potasyum (K<sub>2</sub>O) yüzdesidir.",
    "Önerilen saf besin miktarı toprak analizi, ürün türü ve hedef verime göre ziraat mühendisince belirlenmelidir.",
    "1 dekar = 1.000 m² = 0,1 hektar; resmî ölçüde dönüm de 1.000 m² kabul edilir.",
    "Fazla gübre verimi artırmaz; maliyeti yükseltir, toprağa ve yeraltı sularına zarar verebilir."
  ],
  figure: {
    alt: "Gübre hesabı akışı: toprak analizi sonucu saf besin önerisi, gübredeki besin oranı ve dekar başına gübre. Buğday örneğinde 6 kg fosfor için dekara 13 kg DAP, kalan 9,65 kg azot için dekara 21 kg üre; 20 dekar için 6 torba DAP ve 9 torba üre.",
    caption: "Rakamlar hesap mantığını göstermek için seçilmiş örnek değerlerdir. Kendi tarlanız için saf besin önerisini mutlaka toprak analizi sonucuna göre bir ziraat mühendisinden alın.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">Saf besinden gübre torbasına</text>
  <g>
    <rect x="20" y="56" width="160" height="100" rx="10" class="p"/>
    <text x="100" y="86" class="b mid sf">1. Toprak analizi</text>
    <text x="100" y="112" class="sm mid sf">ürün + hedef verim</text>
    <text x="100" y="134" class="sm mid sf">→ saf besin önerisi</text>
    <rect x="200" y="56" width="160" height="100" rx="10" class="sf sb"/>
    <text x="280" y="86" class="b mid">2. Örnek öneri</text>
    <text x="280" y="112" class="sm mid">N: 12 kg/da</text>
    <text x="280" y="134" class="sm mid">P₂O₅: 6 kg/da</text>
    <rect x="380" y="56" width="160" height="100" rx="10" class="sf sb"/>
    <text x="460" y="86" class="b mid">3. Gübreye çevir</text>
    <text x="460" y="112" class="sm mid">saf besin ÷ oran</text>
    <text x="460" y="134" class="sm mid">6 ÷ 0,46 = 13 kg DAP</text>
    <rect x="560" y="56" width="140" height="100" rx="10" class="oks"/>
    <text x="630" y="86" class="b mid">4. Toplam</text>
    <text x="630" y="112" class="sm mid">× dekar sayısı</text>
    <text x="630" y="134" class="sm mid">÷ torba ağırlığı</text>
  </g>
  <polygon points="184,106 194,99 194,113" class="t2"/>
  <polygon points="364,106 374,99 374,113" class="t2"/>
  <polygon points="544,106 554,99 554,113" class="t2"/>
  <text x="20" y="196" class="b">Buğday örneği (20 dekar, örnek değerler)</text>
  <g class="sm">
    <rect x="20" y="210" width="330" height="110" rx="8" class="ps"/>
    <text x="36" y="236" class="b">Ekimle: DAP (18-46-0)</text>
    <text x="36" y="260">6 ÷ 0,46 = 13,04 kg/da</text>
    <text x="36" y="282">sağladığı azot: 13,04 × 0,18 = 2,35 kg</text>
    <text x="36" y="306" class="b">20 da → 261 kg → 6 torba (50 kg)</text>
    <rect x="370" y="210" width="330" height="110" rx="8" class="oks"/>
    <text x="386" y="236" class="b">İlkbaharda: üre (%46 N)</text>
    <text x="386" y="260">kalan azot: 12 − 2,35 = 9,65 kg</text>
    <text x="386" y="282">9,65 ÷ 0,46 = 20,98 kg/da</text>
    <text x="386" y="306" class="b">20 da → 420 kg → 9 torba (50 kg)</text>
  </g>
  <rect x="20" y="340" width="680" height="62" rx="8" class="sf sb"/>
  <rect x="20" y="340" width="8" height="62" class="dg"/>
  <text x="42" y="364" class="b">Kompoze gübre etiketi: 20.20.0 = %20 N · %20 P₂O₅ · %0 K₂O</text>
  <text x="42" y="388" class="sm t2">50 kg'lık torbada 10 kg saf azot, 10 kg saf fosfor vardır.</text>
</svg>`
  },
  sections: [
    {
      h: "Neden tek bir \"doğru gübre miktarı\" yoktur?",
      p: [
        "\"Dekara kaç kilo gübre atılır?\" sorusunun cevabı tarladan tarlaya değişir. Bitkinin ihtiyacı ürün türüne ve hedeflenen verime, toprağın sağlayabildiği besin ise toprağın yapısına, organik madde içeriğine, pH değerine, bir önceki ürüne ve önceki yıllarda yapılan gübrelemeye bağlıdır. Sulu ve kuru tarımda da ihtiyaç farklıdır.",
        "Bu yüzden gübre miktarını komşudan duyduğunuz sayıya ya da geçen yılın alışkanlığına göre belirlemek çoğu zaman ya gereğinden fazla ya da eksik gübre atmak anlamına gelir. Fazla gübre verimi artırmaz; maliyeti yükseltir, bitkide yatma ve hastalık riskini artırabilir, fazla azot nitrat olarak yeraltı sularına karışabilir. Eksik gübre ise verimi düşürür.",
        "Sağlıklı gübrelemenin başlangıç noktası <strong>toprak analizidir</strong>. Analiz sonucunu yorumlayıp ürününüz için dekar başına saf besin önerisini veren ise ziraat mühendisidir. Bu sayfadaki hesaplar, size verilen öneriyi torba ve kilograma doğru çevirmenize yardımcı olur."
      ]
    },
    {
      h: "Toprak analizi nasıl yaptırılır?",
      ol: [
        "Numuneyi ekimden ya da gübrelemeden önce, mümkünse hasattan sonra alın; gübre atıldıktan hemen sonra alınan numune yanıltıcı olur.",
        "Tarlayı zikzak çizerek 15–20 farklı noktadan, tarla bitkileri için genellikle 0–30 cm derinlikten toprak alın. Meyve bahçelerinde daha derin katmanlardan ayrıca numune istenebilir.",
        "Noktalardan alınan toprakları temiz bir kovada karıştırın ve yaklaşık 1 kg'lık karışık numuneyi temiz bir torbaya koyun. Gübre torbası kullanmayın.",
        "Torbanın üzerine tarla adını, ürünü, sulu ya da kuru olduğunu ve tarihi yazın.",
        "Numuneyi il ya da ilçe tarım ve orman müdürlüğünün yönlendirdiği, ziraat odası, üniversite veya akredite bir toprak laboratuvarına teslim edin.",
        "Analiz raporunu ziraat mühendisine yorumlatın; rapor tek başına \"kaç torba\" sorusunu cevaplamaz, öneriye dönüştürülmesi gerekir."
      ],
      after: [
        "Analiz raporunda genellikle toprak bünyesi, pH, kireç, tuzluluk, organik madde, alınabilir fosfor ve potasyum değerleri bulunur. Toprağın asitlik ve bazlık kavramı için [[bilgi:ph-nedir-nasil-hesaplanir|pH nedir]] yazısına bakabilirsiniz. Toprak analizine yönelik destek ve uygulamalar dönemsel olarak değişebildiği için bulunduğunuz ilin tarım ve orman müdürlüğüne danışın."
      ]
    },
    {
      h: "Saf besin ile gübre miktarı arasındaki fark",
      p: [
        "Gübre önerileri her zaman <strong>saf besin</strong> olarak verilir: dekara 12 kg azot (N), 6 kg fosfor (P<sub>2</sub>O<sub>5</sub>) gibi. Oysa torbadaki gübrenin yalnızca bir kısmı bu besindir. Örneğin 50 kg'lık bir üre torbasında 23 kg saf azot bulunur, çünkü üre %46 azot içerir. Bu yüzden saf besin önerisini gübre miktarına çevirmek gerekir."
      ],
      formula: "Gübre miktarı (kg/da) = saf besin önerisi (kg/da) ÷ (besin yüzdesi ÷ 100)\nToplam gübre (kg) = gübre miktarı (kg/da) × alan (da)\nTorba sayısı = toplam gübre ÷ torba ağırlığı  → yukarı yuvarla\nGübrenin sağladığı yan besin = gübre miktarı × diğer besin yüzdesi ÷ 100",
      table: {
        head: ["Gübre", "Azot (N)", "Fosfor (P₂O₅)", "Potasyum (K₂O)", "50 kg torbadaki saf besin"],
        rows: [
          ["Üre", "%46", "–", "–", "23 kg N"],
          ["Amonyum nitrat (%33)", "%33", "–", "–", "16,5 kg N"],
          ["Kalsiyum amonyum nitrat", "%26", "–", "–", "13 kg N"],
          ["Amonyum sülfat", "%21", "–", "–", "10,5 kg N (ayrıca kükürt)"],
          ["DAP (18-46-0)", "%18", "%46", "–", "9 kg N + 23 kg P₂O₅"],
          ["20.20.0", "%20", "%20", "–", "10 kg N + 10 kg P₂O₅"],
          ["15.15.15", "%15", "%15", "%15", "7,5 kg N + 7,5 kg P₂O₅ + 7,5 kg K₂O"],
          ["Potasyum sülfat", "–", "–", "%50", "25 kg K₂O (ayrıca kükürt)"]
        ],
        caption: "Besin yüzdeleri tipik değerlerdir; kesin içerik için her zaman torba etiketindeki garanti edilen değeri kullanın."
      }
    },
    {
      h: "Buğdaya dekara kaç kg üre atılır? Örnek plan",
      p: [
        "Bir çiftçi 20 dekarlık sulu buğday tarlası için toprak analizi yaptırmış ve ziraat mühendisi dekara <strong>12 kg saf azot</strong> ile <strong>6 kg saf fosfor</strong> önermiş olsun. Bu değerler örnektir; kendi tarlanız için mutlaka kendi analizinizi esas alın."
      ],
      ol: [
        "Fosforun tamamı genellikle ekimle verilir. DAP'ın fosfor oranı %46: 6 ÷ 0,46 = <strong>13,04 kg DAP/da</strong>.",
        "DAP aynı zamanda azot da sağlar: 13,04 × 0,18 = 2,35 kg N/da.",
        "Kalan azot: 12 − 2,35 = 9,65 kg N/da. Bu azot ilkbaharda kardeşlenme ve sapa kalkma dönemlerine bölünerek verilebilir.",
        "Üre ile verilecekse: 9,65 ÷ 0,46 = <strong>20,98 kg üre/da</strong>; amonyum nitrat (%33) ile verilecekse 9,65 ÷ 0,33 = 29,25 kg/da.",
        "20 dekar için toplam: DAP 13,04 × 20 = 260,9 kg → 50 kg'lık <strong>6 torba</strong>; üre 20,98 × 20 = 419,7 kg → <strong>9 torba</strong>."
      ],
      after: [
        "Bu hesabı alan, saf besin önerisi, gübredeki besin oranı ve torba ağırlığını yazarak [[arac:gubre-miktari-hesapla|Gübre Miktarı Hesaplama]] aracında yapabilirsiniz. Hesap adımlarını her besin için ayrı ayrı uygulayın ve kompoze gübrelerin sağladığı yan besini bir sonraki gübreden düşmeyi unutmayın."
      ]
    },
    {
      h: "DAP ile 20.20.0 gübre farkı nedir?",
      p: [
        "İkisi de ekimle sık kullanılan, azot ve fosfor içeren kompoze gübrelerdir; fark oranlardadır. DAP (diamonyum fosfat) %18 azot ve %46 fosfor içerir; fosfor ağırlıklıdır ve aynı miktar fosforu daha az gübreyle verir. 20.20.0 ise azot ve fosforu eşit oranda (%20) içerir.",
        "Örneğimizdeki 6 kg fosfor için 13,04 kg DAP ya da 6 ÷ 0,20 = 30 kg 20.20.0 gerekir. DAP 2,35 kg, 20.20.0 ise 6 kg azot sağlar. Hangisinin daha uygun olduğu toprağın fosfor durumuna, ekimde ne kadar azot verilmek istendiğine ve iki gübrenin kilogram fiyatına göre değişir. Karşılaştırmayı saf besin başına maliyet üzerinden yapmak en doğrusudur: torba fiyatını torbadaki saf besin kilogramına bölün."
      ]
    },
    {
      h: "Mısır ve bahçe ağaçlarında gübreleme",
      p: [
        "Mısır gibi yüksek verimli ve uzun süre yeşil kalan ürünlerde azot ihtiyacı genellikle buğdaydan yüksektir ve azotun ekimle ve büyüme dönemlerinde bölünerek verilmesi yaygındır. Sulama yöntemi, hedef verim ve ön bitki ihtiyacı belirgin biçimde değiştirdiği için mısır için tek bir dekar miktarı vermek doğru değildir; bölgenizdeki tarım müdürlüğünün ve araştırma enstitülerinin tavsiyeleri ile toprak analizi birlikte değerlendirilmelidir.",
        "Meyve bahçelerinde ve bağlarda gübreleme dekar yerine çoğunlukla <strong>ağaç başına</strong> planlanır ve ağacın yaşı, taç genişliği, ürün yükü ve önceki yılın gelişimi dikkate alınır. Toprak analizinin yanında yaprak analizi de besin eksikliğini ortaya koymada önemli bir araçtır. Organik gübreler ve çiftlik gübresi toprağın yapısını iyileştirir ama besin içerikleri değişken olduğu için miktarlarını da analizle birlikte planlamak gerekir. Ev bahçesindeki birkaç ağaç için bile ürün etiketindeki talimat ve bir ziraat mühendisinin görüşü en güvenli yoldur."
      ]
    },
    {
      h: "1 dönüm kaç metrekare? Dekar, dönüm ve hektar",
      p: [
        "Gübre önerileri genellikle dekar başına verilir. <strong>1 dekar = 1.000 m²</strong>'dir. Resmî ölçü olarak dönüm de 1.000 m² kabul edilir; ancak bazı yörelerde geleneksel olarak farklı büyüklükte \"eski dönüm\" ölçüleri kullanılabildiği için tapu ve resmî kayıtlarda metrekare değerini esas almak gerekir. <strong>1 hektar = 10 dekar = 10.000 m²</strong>'dir."
      ],
      table: {
        head: ["Birim", "Metrekare", "Dekar karşılığı"],
        rows: [
          ["1 dekar", "1.000 m²", "1 da"],
          ["1 dönüm (resmî)", "1.000 m²", "1 da"],
          ["1 hektar", "10.000 m²", "10 da"],
          ["1 km²", "1.000.000 m²", "1.000 da"]
        ]
      },
      after: [
        "Tarlanızın alanını metrekare olarak biliyorsanız 1.000'e bölerek dekara çevirin: 7.500 m² = 7,5 dekar. Dönüşümler için [[arac:donum-metrekare-cevir|Dönüm Metrekare Çevirici]] ve [[arac:hektar-donum-cevir|Hektar Dönüm Çevirici]] araçlarını, birimlerin ayrıntısı için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazısını kullanabilirsiniz. Hasattan sonra dekar başına verimi hesaplamak, bir sonraki yılın gübre planında hedef verimi belirlemenize yardım eder; bunun için [[arac:dekar-verim-hesapla|Dekar Verim Hesaplama]] aracı vardır."
      ]
    },
    {
      h: "Toprak analizi olmadan gübre miktarı nasıl belirlenir?",
      p: [
        "En doğru cevap: mümkünse analizsiz gübreleme yapmamaktır. Analiz yaptırılamıyorsa, bölgenizdeki il ya da ilçe tarım ve orman müdürlüğünün ürün bazlı genel tavsiyeleri ve ziraat mühendisinin tarlanızı görerek yapacağı değerlendirme ikinci en iyi seçenektir. Bu tavsiyeler bölgenin toprak yapısı ve iklimine göre hazırlanır ve rastgele bir miktardan çok daha güvenilirdir.",
        "Analizsiz gübrelemede en sık yapılan hata, her yıl aynı kompoze gübreyi aynı miktarda atmaktır. Fosfor ve potasyum topraktan kolay yıkanmadığı için birkaç yıl içinde toprakta birikebilir, azot ise yağış ve sulamayla kaybolabilir. Bu yüzden belirli aralıklarla, örneğin birkaç yılda bir toprak analizi yaptırmak uzun vadede gübre masrafını düşürür."
      ]
    },
    {
      h: "Gübre hesabında sık yapılan hatalar",
      ul: [
        "<strong>Saf besini gübre miktarı sanmak:</strong> \"Dekara 12 kg azot\" önerisi 12 kg üre değil, yaklaşık 26 kg üre demektir.",
        "<strong>Kompoze gübrenin yan besinini düşmemek:</strong> DAP'ın verdiği azotu üre hesabından çıkarmazsanız fazla azot atarsınız.",
        "<strong>Torba etiketine bakmamak:</strong> Aynı adla satılan gübrelerin besin oranları farklı olabilir.",
        "<strong>Dönümü yanlış çevirmek:</strong> Yöresel dönüm ölçüsü yerine metrekareyi esas alın.",
        "<strong>Tek seferde tüm azotu vermek:</strong> Azot genellikle bölünerek verilir; tek seferde yüksek miktar kayba ve yatmaya yol açabilir.",
        "<strong>Gübreyi güvenlik önlemi almadan taşımak ve depolamak:</strong> Gübreleri kuru, serin, çocuk ve hayvanların ulaşamayacağı yerde, gıdadan ayrı saklayın; özellikle amonyum nitrat içeren gübrelerin depolama kurallarına uyun."
      ],
      after: [
        "Gübrelemenin yanında yapılan zirai ilaçlamada da dozun etiketten okunup doğru çevrilmesi önemlidir; bunun için [[bilgi:zirai-ilac-karisim-orani|zirai ilaç karışım oranı]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Dekara ne kadar gübre atılır?", "Toprak analizine göre önerilen saf besin miktarı, gübredeki besin yüzdesine bölünerek bulunur. Dekara 9,65 kg saf azot önerilmişse %46 azotlu üreden yaklaşık 21 kg atılır. Önerinin kendisi ürüne, toprağa ve hedef verime göre ziraat mühendisince belirlenmelidir."],
    ["Buğdaya dekara kaç kg üre atılır?", "Tarlanın toprak analizine ve hedef verime bağlıdır. Örneğin dekara 12 kg azot önerilen ve ekimle 13 kg DAP atılan bir tarlada kalan 9,65 kg azot için yaklaşık 21 kg üre gerekir. Kendi tarlanız için mutlaka kendi analizinizi esas alın."],
    ["Saf azot miktarı gübre torbasına nasıl çevrilir?", "Saf azot gübrenin azot yüzdesine bölünür, alanla çarpılır ve torba ağırlığına bölünür. 20 dekara dekar başına 9,65 kg azot için 9,65 ÷ 0,46 × 20 = 420 kg üre, yani 50 kg'lık 9 torba gerekir."],
    ["DAP ve 20.20.0 gübre farkı nedir?", "DAP %18 azot ve %46 fosfor, 20.20.0 ise eşit oranda %20 azot ve %20 fosfor içerir. Aynı 6 kg fosfor için 13 kg DAP ya da 30 kg 20.20.0 gerekir. Seçim toprağın ihtiyacına ve saf besin başına maliyete göre yapılmalıdır."],
    ["Toprak analizi olmadan gübre miktarı nasıl belirlenir?", "Mümkünse analizsiz gübreleme yapılmamalıdır. Analiz yaptırılamıyorsa il ya da ilçe tarım ve orman müdürlüğünün bölgesel tavsiyeleri ve tarlayı gören bir ziraat mühendisinin görüşü esas alınmalıdır."],
    ["Bahçe ağaçlarına ne kadar gübre verilir?", "Meyve ağaçlarında gübre genellikle ağaç başına, ağacın yaşına, taç genişliğine ve ürün yüküne göre planlanır. Toprak analizi yanında yaprak analizi de önemlidir. Ürün etiketindeki talimat ve ziraat mühendisinin görüşü en güvenli yoldur."],
    ["1 dönüm kaç metrekare, dekar ile farkı var mı?", "Resmî ölçüde 1 dönüm 1.000 m²'dir ve 1 dekara eşittir. Bazı yörelerde farklı büyüklükte geleneksel dönüm ölçüleri kullanılabildiği için tapu ve resmî kayıtlarda metrekare değerini esas almak gerekir."],
    ["Hektar dönüme nasıl çevrilir?", "1 hektar 10.000 m²'dir ve 10 dekara ya da 10 resmî dönüme eşittir. Hektar değerini 10 ile çarparak dekara çevirebilirsiniz: 2,5 hektar 25 dekar eder."],
    ["Fazla gübre atmanın zararı var mı?", "Evet. Fazla gübre verimi artırmaz, maliyeti yükseltir; fazla azot bitkide yatmaya ve hastalık riskine yol açabilir, nitrat olarak yeraltı sularına karışabilir. Fosfor ve potasyum ise toprakta birikebilir. Analize dayalı gübreleme bu riskleri azaltır."]
  ],
  tools: ["gubre-miktari-hesapla", "donum-metrekare-cevir", "hektar-donum-cevir", "dekar-verim-hesapla"],
  related: ["1-donum-kac-metrekare", "zirai-ilac-karisim-orani", "ph-nedir-nasil-hesaplanir"],
  sources: [
    ["T.C. Tarım ve Orman Bakanlığı", "https://www.tarimorman.gov.tr/"],
    ["Tarımsal Araştırmalar ve Politikalar Genel Müdürlüğü (TAGEM)", "https://arastirma.tarimorman.gov.tr/"],
    ["Türkiye Ziraat Odaları Birliği", "https://www.tzob.org.tr/"]
  ],
  uyari: "örnek değerler içerir; gübre miktarını toprak analizine göre bir ziraat mühendisiyle belirleyin"
};
