export default {
  slug: "ceyreklikler-ve-kutu-grafigi",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Çeyreklikler ve Çeyrekler Açıklığı (IQR) Nasıl Bulunur? Kutu Grafiği",
  pageTitle: "Çeyreklikler ve IQR Nasıl Bulunur? Kutu Grafiği Çizimi",
  description: "Sıralı veriyi dört eşit parçaya bölen Q1, Q2 ve Q3 çeyreklikleri, IQR = Q3 − Q1 çeyrekler açıklığı, 1,5 × IQR aykırı değer kuralı ve kutu grafiği çözümlü örnekle.",
  keywords: ["çeyreklikler nasıl bulunur", "çeyrekler açıklığı", "iqr nedir", "kutu grafiği nasıl çizilir", "alt çeyrek üst çeyrek", "aykırı değer bulma", "q1 q3 hesaplama", "kutu bıyık grafiği"],
  lead: "Çeyreklikler, küçükten büyüğe sıralanmış bir veri setini dört eşit parçaya bölen üç değerdir: <strong>Q1</strong> (alt çeyrek), <strong>Q2</strong> (medyan) ve <strong>Q3</strong> (üst çeyrek). Q1, medyanın solundaki yarının; Q3 ise sağındaki yarının ortancasıdır. Çeyrekler açıklığı IQR = Q3 − Q1 ile bulunur ve verinin ortadaki %50'sinin ne kadar yayıldığını gösterir. Bu sayfada çeyreklikleri adım adım bulmayı, aykırı değerleri 1,5 × IQR kuralıyla tespit etmeyi ve kutu grafiği çizmeyi çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Q2 verinin medyanıdır; Q1 alt yarının, Q3 üst yarının medyanıdır.",
    "Çeyrekler açıklığı: IQR = Q3 − Q1; verinin ortadaki yarısının genişliğidir.",
    "Aykırı değer sınırları: alt sınır Q1 − 1,5 × IQR, üst sınır Q3 + 1,5 × IQR; bunların dışındaki değerler aykırıdır.",
    "Kutu grafiği beş sayıyla çizilir: en küçük değer, Q1, medyan, Q3 ve en büyük değer.",
    "Açıklık (ranj) en büyük ile en küçük değerin farkıdır ve uç değerlerden çok etkilenir; IQR etkilenmez.",
    "Çeyreklik hesaplamanın birden fazla yöntemi vardır; okul kitabı, hesap tablosu ve istatistik programı farklı sonuç verebilir."
  ],
  figure: {
    alt: "Sayı doğrusu üzerinde 10 veriden oluşan örneğin kutu grafiği: en küçük 4, Q1 8, medyan 12,5, Q3 18, bıyık 21'e kadar; 40 değeri üst sınır 33'ün dışında aykırı değer olarak ayrı nokta ile gösteriliyor.",
    caption: "Örnek veri: 4, 7, 8, 10, 12, 13, 15, 18, 21, 40. Kutu Q1 ile Q3 arasındadır ve IQR = 10 birim genişliğindedir. Üst sınır 18 + 15 = 33 olduğu için 40 aykırı değerdir; bıyık aykırı olmayan en büyük değer olan 21'de biter.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kutu grafiği: beş sayı ve bir aykırı değer</text>
  <text x="60" y="66" class="sm mu">Sıralı veri (n = 10)</text>
  <g>
    <circle cx="113" cy="90" r="6" class="t2"/><circle cx="153" cy="90" r="6" class="t2"/><circle cx="167" cy="90" r="6" class="t2"/>
    <circle cx="193" cy="90" r="6" class="t2"/><circle cx="220" cy="90" r="6" class="t2"/><circle cx="233" cy="90" r="6" class="t2"/>
    <circle cx="260" cy="90" r="6" class="t2"/><circle cx="300" cy="90" r="6" class="t2"/><circle cx="340" cy="90" r="6" class="t2"/>
    <circle cx="593" cy="90" r="7" class="dg"/>
  </g>
  <line x1="113" y1="190" x2="167" y2="190" class="st sw" fill="none"/>
  <line x1="300" y1="190" x2="340" y2="190" class="st sw" fill="none"/>
  <line x1="113" y1="172" x2="113" y2="208" class="st sw" fill="none"/>
  <line x1="340" y1="172" x2="340" y2="208" class="st sw" fill="none"/>
  <rect x="167" y="150" width="133" height="80" rx="4" class="ps"/>
  <line x1="227" y1="150" x2="227" y2="230" class="sp sw" fill="none"/>
  <circle cx="593" cy="190" r="8" class="dg"/>
  <line x1="500" y1="140" x2="500" y2="240" class="sdg dash" fill="none"/>
  <text x="500" y="132" class="sm mid dg">üst sınır 33</text>
  <g class="sm mid b">
    <text x="113" y="256">4</text><text x="167" y="256">Q1 = 8</text><text x="227" y="140">Q2 = 12,5</text>
    <text x="300" y="256">Q3 = 18</text><text x="340" y="140">21</text><text x="593" y="222" class="dg">40</text>
  </g>
  <line x1="60" y1="290" x2="660" y2="290" class="st" fill="none"/>
  <g class="st" fill="none">
    <line x1="60" y1="284" x2="60" y2="296"/><line x1="193" y1="284" x2="193" y2="296"/><line x1="327" y1="284" x2="327" y2="296"/>
    <line x1="460" y1="284" x2="460" y2="296"/><line x1="593" y1="284" x2="593" y2="296"/>
  </g>
  <g class="sm mid mu"><text x="60" y="312">0</text><text x="193" y="312">10</text><text x="327" y="312">20</text><text x="460" y="312">30</text><text x="593" y="312">40</text></g>
  <line x1="167" y1="330" x2="300" y2="330" class="sp sw" fill="none"/>
  <text x="233" y="350" class="sm mid b p">IQR = 18 − 8 = 10</text>
  <rect x="390" y="326" width="310" height="80" rx="10" class="sf sb"/>
  <text x="406" y="350" class="sm">Alt sınır: 8 − 1,5 × 10 = −7</text>
  <text x="406" y="372" class="sm">Üst sınır: 18 + 1,5 × 10 = 33</text>
  <text x="406" y="394" class="sm b dg">33'ten büyük olan 40 aykırıdır</text>
</svg>`
  },
  sections: [
    {
      h: "Çeyreklik nedir?",
      p: [
        "Çeyreklikler, küçükten büyüğe sıralanmış bir veri setini yaklaşık eşit sayıda gözlem içeren dört parçaya bölen üç değerdir. <strong>Birinci çeyreklik (Q1)</strong> verinin yaklaşık %25'inin altında kaldığı değerdir ve alt çeyrek olarak da anılır. <strong>İkinci çeyreklik (Q2)</strong> verinin tam ortasıdır, yani medyandır. <strong>Üçüncü çeyreklik (Q3)</strong> ise verinin yaklaşık %75'inin altında kaldığı değerdir ve üst çeyrek olarak bilinir.",
        "Ortalama ve standart sapma verinin tamamını kullanır ve uç değerlerden çok etkilenir. Çeyreklikler ise yalnızca sıralamaya dayandığı için tek bir çok büyük ya da çok küçük değer onları neredeyse hiç değiştirmez. Bu yüzden maaşlar, ev fiyatları ve sınav puanları gibi çarpık dağılımlı verileri özetlemek için çok kullanışlıdır. Medyan ve ortalama arasındaki farkı [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Alt ve üst çeyrek nasıl bulunur?",
      p: [
        "Okul kitaplarında en yaygın kullanılan yöntem \"medyanla ikiye böl, her yarının medyanını al\" yöntemidir. Veri sayısı tek olduğunda medyanın yarılara dahil edilip edilmeyeceği konusunda iki farklı uygulama vardır; aşağıdaki adımlar medyanın yarılara dahil edilmediği uygulamayı izler."
      ],
      ol: [
        "Veriyi küçükten büyüğe sıralayın ve veri sayısını (n) bulun.",
        "Medyanı (Q2) bulun: n tekse ortadaki değer, n çiftse ortadaki iki değerin ortalaması.",
        "Medyanın solunda kalan değerleri alt yarı, sağında kalanları üst yarı olarak ayırın. n tekse medyanın kendisi iki yarıya da dahil edilmez.",
        "Alt yarının medyanı Q1, üst yarının medyanı Q3'tür.",
        "IQR = Q3 − Q1 farkını hesaplayın."
      ],
      formula: "Q2 = medyan(tüm veri)\nQ1 = medyan(alt yarı) · Q3 = medyan(üst yarı)\nIQR = Q3 − Q1"
    },
    {
      h: "Çözümlü örnek 1: çift sayıda veri (n = 10)",
      p: [
        "Bir sınıftaki on öğrencinin bir hafta içinde okuduğu sayfa sayıları şöyle olsun: 12, 4, 21, 8, 40, 15, 7, 13, 18, 10. Öncelikle veriyi sıralamak gerekir."
      ],
      ol: [
        "Sıralı veri: 4, 7, 8, 10, 12, 13, 15, 18, 21, 40. Veri sayısı n = 10.",
        "Medyan: ortadaki iki değer 5. ve 6. değerlerdir, yani 12 ve 13. Q2 = (12 + 13) ÷ 2 = 12,5.",
        "Alt yarı: 4, 7, 8, 10, 12. Ortadaki değer 8 olduğu için Q1 = 8.",
        "Üst yarı: 13, 15, 18, 21, 40. Ortadaki değer 18 olduğu için Q3 = 18.",
        "Çeyrekler açıklığı: IQR = 18 − 8 = 10.",
        "Açıklık (ranj): 40 − 4 = 36."
      ],
      after: [
        "Açıklık 36 iken IQR yalnızca 10'dur. Aradaki büyük fark, verinin çoğunun dar bir aralıkta toplandığını ve tek bir öğrencinin (40 sayfa) diğerlerinden çok farklı olduğunu gösterir. Bu değerleri kendi verinizle [[arac:ceyreklik-hesapla|Çeyreklik Hesaplama aracı]] tek adımda bulur; medyan için [[arac:medyan-hesapla|Medyan Hesaplama]], ranj için [[arac:aciklik-hesapla|Açıklık Hesaplama]] araçları da kullanılabilir."
      ]
    },
    {
      h: "Çözümlü örnek 2: tek sayıda veri ve farklı yöntemler",
      p: [
        "Veri sayısı tek olduğunda medyanın yarılara dahil edilip edilmemesi sonucu değiştirir. Sıralı veri 3, 5, 7, 8, 9, 11, 13 olsun (n = 7). Medyan 4. değer olan 8'dir."
      ],
      table: {
        head: ["Yöntem", "Alt yarı", "Q1", "Üst yarı", "Q3", "IQR"],
        rows: [
          ["Medyan hariç", "3, 5, 7", "5", "9, 11, 13", "11", "6"],
          ["Medyan dahil", "3, 5, 7, 8", "6", "8, 9, 11, 13", "10", "4"],
          ["Doğrusal ara değer", "konum 1,5", "6", "konum 4,5", "10", "4"]
        ],
        caption: "Doğrusal ara değer yönteminde Q1'in konumu 0,25 × (n − 1) = 1,5'tir; 2. ve 3. değerin (5 ile 7) ortası olan 6 alınır. Hesap tablosu programlarının yaygın çeyreklik işlevi bu yöntemi kullanır."
      },
      after: [
        "Üç yöntem de istatistikte kabul görür; hiçbiri \"yanlış\" değildir. Önemli olan, bir ödevde ya da raporda hangi yöntemin kullanıldığını belirtmek ve karşılaştırmaları aynı yöntemle yapmaktır. Ders kitabınız hangi yöntemi kullanıyorsa sınavlarda o yöntemi uygulayın. Çeyreklik Hesaplama aracı bu üç yöntemi ayrı ayrı seçmenize izin verir."
      ]
    },
    {
      h: "Aykırı değer IQR ile nasıl tespit edilir?",
      p: [
        "Aykırı değer, verinin genel yapısından belirgin biçimde uzakta kalan gözlemdir. Ölçüm hatası, veri girişi hatası ya da gerçekten olağan dışı bir durum olabilir. En yaygın tespit yöntemi, John Tukey'in önerdiği <strong>1,5 × IQR kuralıdır</strong>."
      ],
      formula: "Alt sınır = Q1 − 1,5 × IQR\nÜst sınır = Q3 + 1,5 × IQR\nUç aykırı değer için 1,5 yerine 3 kullanılır",
      after: [
        "Örnek 1'de IQR = 10 olduğu için alt sınır 8 − 15 = −7, üst sınır 18 + 15 = 33'tür. Veride −7'den küçük değer yoktur; 33'ten büyük olan tek değer 40'tır. Dolayısıyla 40 sayfa okuyan öğrenci aykırı değerdir. 3 × IQR ile hesaplanan sınır 18 + 30 = 48 olduğu için 40 \"uç\" aykırı değer sayılmaz.",
        "Aykırı değeri bulmak onu silmek anlamına gelmez. Önce değerin bir hata olup olmadığını kontrol edin. Gerçek bir gözlemse ve analizin amacına uygunsa veride kalmalıdır; ancak raporda ayrıca belirtilmesi ve ortalama yerine medyan gibi dayanıklı ölçülerin tercih edilmesi iyi bir uygulamadır."
      ]
    },
    {
      h: "Kutu grafiği nasıl çizilir?",
      p: [
        "Kutu grafiği (kutu-bıyık grafiği), bir veri setini <strong>beş sayılık özet</strong> ile gösteren basit ama güçlü bir çizimdir: en küçük değer, Q1, medyan, Q3 ve en büyük değer. Aynı ölçekte yan yana çizilen kutu grafikleri, birden fazla grubun dağılımını tek bakışta karşılaştırmayı sağlar."
      ],
      ol: [
        "Veriyi kapsayan bir sayı doğrusu çizin ve eşit aralıklarla ölçeklendirin; örnekte 0'dan 40'a kadar 10'ar birim.",
        "Q1 ve Q3 arasına bir dikdörtgen (kutu) çizin. Kutunun genişliği IQR'ye eşittir.",
        "Medyanın bulunduğu yere kutunun içinden dikey bir çizgi çekin. Örnekte bu çizgi 12,5'tedir.",
        "Aykırı değer sınırlarını hesaplayın. Bıyıkları kutudan, sınırların içinde kalan en küçük ve en büyük değere kadar uzatın: alt bıyık 4'e, üst bıyık 21'e.",
        "Sınırların dışında kalan değerleri ayrı noktalarla işaretleyin; örnekte 40.",
        "Aykırı değer gösterilmeyen basit kutu grafiğinde bıyıklar doğrudan en küçük ve en büyük değere uzatılır; hangi türü çizdiğinizi belirtin."
      ],
      after: [
        "Grafiği okurken kutunun içindeki medyan çizgisinin konumuna bakın. Çizgi kutunun ortasındaysa orta yarı simetriktir. Örnekte medyan Q1'e daha yakındır ve üst bıyık daha uzundur; bu, verinin sağa çarpık olduğunu gösterir. Verinin genel yayılımını tek sayıyla ifade etmek isterseniz [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Açıklık (ranj) ile IQR farkı nedir?",
      table: {
        head: ["Ölçü", "Formül", "Örnek 1'deki değer", "Uç değere duyarlılık"],
        rows: [
          ["Açıklık (ranj)", "En büyük − en küçük", "40 − 4 = 36", "Çok yüksek"],
          ["Çeyrekler açıklığı (IQR)", "Q3 − Q1", "18 − 8 = 10", "Düşük"],
          ["Yarı çeyrek açıklığı", "IQR ÷ 2", "5", "Düşük"],
          ["Standart sapma", "Ortalamadan sapmaların karekök ortalaması", "Yaklaşık 10,2 (örneklem)", "Yüksek"]
        ]
      },
      after: [
        "Açıklık yalnızca iki uç değere bakar; tek bir aykırı değer onu katlarca büyütebilir. Örnekte 40 yerine 22 olsaydı açıklık 18'e düşerdi, ama IQR yine 10 kalırdı. Bu yüzden IQR, verinin \"tipik\" yayılımını anlatmak için daha güvenilir bir ölçüdür. Açıklık ise verinin sınırlarını bilmek gerektiğinde, örneğin bir ölçüm aletinin aralığını seçerken işe yarar."
      ]
    },
    {
      h: "Medyan çeyrekliklerle nasıl ilişkilidir? Yüzdelik dilim ile aynı mı?",
      p: [
        "Medyan, ikinci çeyrekliğin ta kendisidir ve verinin 50. yüzdelik değerine karşılık gelir. Benzer şekilde Q1 25. yüzdelik değer, Q3 ise 75. yüzdelik değerdir. Yani çeyreklikler, yüzdelik değerlerin (persentil) özel hâlleridir: veri dört yerine yüz parçaya bölündüğünde yüzdelik değerler elde edilir.",
        "Türkiye'de sınavlarda kullanılan \"yüzdelik dilim\" ifadesi ise genellikle ters yönden okunur: \"yüzdelik dilim %2\" demek, sınava girenlerin en iyi %2'si arasında olmak demektir. İstatistikteki 98. yüzdelik değer ile aynı konumu anlatır ama sayı farklı yazılır. Bu farkı bilmek, sınav sonuçlarını yorumlarken karışıklığı önler. Bir değerin veri içindeki yüzdelik sırasını ya da istediğiniz yüzdelik değeri bulmak için [[arac:yuzdelik-dilim-hesapla|Yüzdelik Dilim Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Veriyi sıralamadan hesaplamak:</strong> Çeyreklikler sıralı veri üzerinden bulunur; sırasız listenin ortasındaki değer medyan değildir.",
        "<strong>Tek sayıda veride yöntemi karıştırmak:</strong> Medyanı yarılara dahil edip etmediğinizi baştan belirleyin ve tüm hesapta aynı yöntemi kullanın.",
        "<strong>IQR'yi Q3 + Q1 sanmak:</strong> Çeyrekler açıklığı bir farktır: Q3 − Q1.",
        "<strong>Bıyığı aykırı değere kadar uzatmak:</strong> Aykırı değer gösterilen grafikte bıyık, sınırların içindeki son değerde biter.",
        "<strong>Aykırı değeri otomatik silmek:</strong> Aykırı değer önce incelenir; hata değilse veride kalır ve raporda belirtilir.",
        "<strong>Farklı yöntemlerle bulunan çeyreklikleri karşılaştırmak:</strong> Okul yöntemi ile hesap tablosu işlevi aynı veri için farklı değer verebilir."
      ]
    }
  ],
  faq: [
    ["Çeyreklik nedir?", "Çeyreklikler, sıralanmış bir veri setini dört eşit parçaya bölen üç değerdir. Q1 verinin yaklaşık %25'inin altında kaldığı alt çeyrek, Q2 medyan, Q3 ise verinin yaklaşık %75'inin altında kaldığı üst çeyrektir. Uç değerlerden az etkilenirler."],
    ["Alt ve üst çeyrek nasıl bulunur?", "Veri sıralanır ve medyan bulunur. Medyanın solundaki değerler alt yarı, sağındakiler üst yarıdır. Alt yarının medyanı Q1, üst yarının medyanı Q3'tür. Örneğin 4, 7, 8, 10, 12, 13, 15, 18, 21, 40 verisinde Q1 = 8, Q3 = 18'dir."],
    ["Çeyrekler açıklığı (IQR) nasıl hesaplanır?", "Üçüncü çeyreklikten birinci çeyreklik çıkarılır: IQR = Q3 − Q1. Q1 = 8 ve Q3 = 18 ise IQR 10'dur. Bu değer verinin ortadaki %50'sinin ne kadar geniş bir aralığa yayıldığını gösterir ve aykırı değerlerden etkilenmez."],
    ["Kutu grafiği nasıl çizilir?", "Sayı doğrusu üzerinde Q1 ile Q3 arasına bir kutu, medyana dikey bir çizgi çizilir. Bıyıklar kutudan aykırı olmayan en küçük ve en büyük değere uzatılır, sınır dışındaki değerler ayrı noktalarla gösterilir. Grafik beş sayılık özete dayanır."],
    ["Aykırı değer IQR ile nasıl tespit edilir?", "Alt sınır Q1 − 1,5 × IQR, üst sınır Q3 + 1,5 × IQR olarak hesaplanır; bu sınırların dışındaki değerler aykırı sayılır. Q1 = 8, Q3 = 18 ve IQR = 10 ise sınırlar −7 ve 33'tür; 40 değeri aykırıdır."],
    ["Açıklık (ranj) ile IQR farkı nedir?", "Açıklık en büyük ile en küçük değerin farkıdır ve tek bir uç değerle çok büyüyebilir. IQR ise yalnızca ortadaki %50'lik bölüme bakar ve uç değerlerden etkilenmez. Örnek veride açıklık 36, IQR 10'dur."],
    ["Medyan çeyrekliklerle nasıl ilişkilidir?", "Medyan ikinci çeyrekliktir ve verinin tam ortasındaki değerdir. Birinci ve üçüncü çeyreklikler, medyanın iki yanındaki yarıların medyanlarıdır. Kutu grafiğinde medyan, kutunun içindeki dikey çizgiyle gösterilir."],
    ["Yüzdelik dilim ile çeyreklik aynı şey mi?", "Çeyreklikler yüzdelik değerlerin özel hâlleridir: Q1 25., Q2 50., Q3 75. yüzdelik değerdir. Türkiye'de sınavlardaki yüzdelik dilim ise ters yönden okunur; yüzdelik dilim %2, en iyi %2 içinde olmak, yani 98. yüzdelik değer demektir."],
    ["Çeyreklik neden farklı programlarda farklı çıkıyor?", "Çeyreklik hesaplamanın birden fazla kabul görmüş yöntemi vardır: medyanı yarılara dahil etme, hariç tutma ve doğrusal ara değer bunların en yaygınlarıdır. Özellikle küçük veri setlerinde sonuçlar farklılaşır; raporlarda hangi yöntemin kullanıldığı belirtilmelidir."]
  ],
  tools: ["ceyreklik-hesapla", "medyan-hesapla", "aciklik-hesapla", "yuzdelik-dilim-hesapla"],
  related: ["ortalama-medyan-mod-nedir", "standart-sapma-nasil-hesaplanir"],
  sources: [
    ["MEB – Matematik dersi öğretim programı (veri analizi)", "https://www.meb.gov.tr/"],
    ["TÜİK – İstatistiksel terimler", "https://www.tuik.gov.tr/"]
  ]
};
