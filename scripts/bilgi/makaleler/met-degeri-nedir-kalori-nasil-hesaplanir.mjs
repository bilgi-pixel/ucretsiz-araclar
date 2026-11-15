export default {
  slug: "met-degeri-nedir-kalori-nasil-hesaplanir",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "MET Değeri Nedir? Yürüyüş, Bisiklet ve Yüzmede Yakılan Kalori Hesabı",
  pageTitle: "MET Değeri Nedir? MET ile Yakılan Kalori Nasıl Hesaplanır",
  description: "MET, bir aktivitenin dinlenmeye göre kaç kat enerji harcattığını gösterir. Kalori = MET × kilo × saat. Yürüyüş, bisiklet, yüzme, koşu ve ip atlama MET tablosu.",
  keywords: ["met değeri nedir", "met ile kalori hesaplama", "yürüyüş met değeri", "egzersiz met tablosu", "1 saat yüzme kaç kalori", "bisiklet kaç kalori yakar", "ip atlama kaç met", "met dakika nedir"],
  lead: "MET (metabolik eşdeğer), <strong>bir aktivitenin, sessizce otururken harcanan enerjinin kaç katını gerektirdiğini gösteren birimdir</strong>. 1 MET, kilogram başına saatte yaklaşık 1 kilokaloriye karşılık gelir; bu yüzden yakılan kalori basitçe MET × vücut ağırlığı (kg) × süre (saat) formülüyle bulunur. 70 kg'lık biri tempolu yürüyüşte (yaklaşık 3,5 MET) bir saatte yaklaşık 245 kcal harcar. Bu yazıda MET mantığını, yürüyüş, koşu, bisiklet, yüzme ve ip atlama için yaklaşık MET değerlerini, kilonun etkisini, net kalori farkını ve akıllı saat tahminlerinin sınırlarını örneklerle anlatıyoruz.",
  kisaCevap: [
    "1 MET ≈ dinlenme hâlindeki enerji harcaması ≈ 1 kcal/kg/saat (≈ 3,5 ml oksijen/kg/dk).",
    "Yakılan kalori = MET × kilo (kg) × süre (saat); dakika için MET × kilo × dakika ÷ 60.",
    "Yaklaşık değerler: tempolu yürüyüş 3,5–5, koşu (10 km/s) yaklaşık 10, orta tempolu bisiklet 6,8, serbest stil yüzme 5,8–9,8, ip atlama 8,8–12,3 MET.",
    "Aynı aktivitede kilo arttıkça yakılan kalori doğru orantılı artar: 90 kg'lık kişi, 60 kg'lık kişiden 1,5 kat fazla harcar.",
    "Net kalori, dinlenmede zaten harcanacak 1 MET'i düşer: (MET − 1) × kilo × saat.",
    "Dünya Sağlık Örgütü 3–6 MET arasını orta, 6 MET ve üzerini yüksek şiddetli aktivite olarak sınıflar."
  ],
  figure: {
    alt: "Yaygın aktivitelerin yaklaşık MET değerlerini gösteren yatay çubuk grafik: uyku 0,95, oturma 1,3, yavaş yürüyüş 2,8, tempolu yürüyüş 3,5, bisiklet 6,8, yüzme 5,8, koşu 9,8, ip atlama 11,8; 3 ve 6 MET sınırları işaretli.",
    caption: "Değerler, Fiziksel Aktivite Kitapçığı (Compendium) temel alınarak yuvarlatılmış yaklaşık değerlerdir. Kesikli çizgiler Dünya Sağlık Örgütü'nün orta (3 MET) ve yüksek (6 MET) şiddet sınırlarıdır. Sağdaki sayı, 70 kg'lık biri için saatlik yaklaşık harcamadır.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aktivitelerin yaklaşık MET değerleri</text>
  <g class="sm">
    <text x="20" y="72">Uyku</text><rect x="180" y="58" width="38" height="20" rx="3" class="sf sb"/><text x="226" y="73">0,95 · 67 kcal/sa</text>
    <text x="20" y="108">Oturma, ekran</text><rect x="180" y="94" width="52" height="20" rx="3" class="sf sb"/><text x="240" y="109">1,3 · 91</text>
    <text x="20" y="144">Yavaş yürüyüş 3 km/s</text><rect x="180" y="130" width="112" height="20" rx="3" class="ps"/><text x="300" y="145">2,8 · 196</text>
    <text x="20" y="180">Tempolu yürüyüş 5 km/s</text><rect x="180" y="166" width="140" height="20" rx="3" class="ps"/><text x="328" y="181">3,5 · 245</text>
    <text x="20" y="216">Yüzme serbest, orta</text><rect x="180" y="202" width="232" height="20" rx="3" class="oks"/><text x="420" y="217">5,8 · 406</text>
    <text x="20" y="252">Bisiklet 16–19 km/s</text><rect x="180" y="238" width="272" height="20" rx="3" class="oks"/><text x="460" y="253">6,8 · 476</text>
    <text x="20" y="288">Koşu 9,7 km/s</text><rect x="180" y="274" width="392" height="20" rx="3" class="p"/><text x="580" y="289">9,8 · 686</text>
    <text x="20" y="324">İp atlama, orta</text><rect x="180" y="310" width="472" height="20" rx="3" class="p"/><text x="660" y="325">11,8</text>
  </g>
  <line x1="300" y1="50" x2="300" y2="340" class="sa dash" fill="none"/>
  <line x1="420" y1="50" x2="420" y2="340" class="sdg dash" fill="none"/>
  <text x="300" y="356" class="sm mid b">3 MET</text><text x="420" y="356" class="sm mid b dg">6 MET</text>
  <rect x="20" y="372" width="680" height="54" rx="8" class="sf sb"/>
  <rect x="20" y="372" width="8" height="54" class="p"/>
  <text x="40" y="396" class="b">Kalori = MET × kilo × saat</text>
  <text x="40" y="416" class="sm t2">70 kg, 1 saat tempolu yürüyüş: 3,5 × 70 × 1 = 245 kcal (net 175 kcal)</text>
</svg>`
  },
  sections: [
    {
      h: "MET değeri nedir?",
      p: [
        "MET, İngilizce \"metabolic equivalent of task\" ifadesinin kısaltmasıdır ve Türkçede <strong>metabolik eşdeğer</strong> olarak geçer. Bir kişinin sessizce otururken harcadığı enerji 1 MET kabul edilir. Bu değer yaklaşık olarak dakikada kilogram başına 3,5 mililitre oksijen tüketimine ve saatte kilogram başına 1 kilokaloriye denk gelir.",
        "Bir aktivitenin MET değeri, o aktivite sırasında dinlenmeye göre kaç kat fazla enerji harcandığını gösterir. 4 MET'lik bir aktivite, oturmaya göre dört kat enerji gerektirir. Bu basit ölçek sayesinde farklı spor türleri tek bir birimle karşılaştırılabilir ve kalori hesabı kişinin ağırlığına göre kolayca uyarlanabilir.",
        "Aktivitelerin MET değerleri, araştırmacıların yüzlerce aktivite için ölçtüğü ve derlediği <strong>Fiziksel Aktivite Kitapçığı (Compendium of Physical Activities)</strong> gibi kaynaklardan gelir. Değerler ortalama yetişkinler için hazırlanmış yaklaşık değerlerdir; aynı aktivitede kişinin tekniği, kondisyonu, eğim ve rüzgâr gibi koşullar gerçek harcamayı değiştirir."
      ]
    },
    {
      h: "MET ile yakılan kalori nasıl hesaplanır?",
      formula: "Yakılan kalori (kcal) = MET × vücut ağırlığı (kg) × süre (saat)\nDakika ile: kcal = MET × kg × dakika ÷ 60\nAlternatif: kcal/dk = MET × 3,5 × kg ÷ 200\nNet kalori = (MET − 1) × kg × saat",
      ol: [
        "<strong>Tempolu yürüyüş:</strong> 70 kg, 60 dakika, 3,5 MET → 3,5 × 70 × 1 = <strong>245 kcal</strong>.",
        "<strong>Bisiklet:</strong> 75 kg, 45 dakika, 16–19 km/s (6,8 MET) → 6,8 × 75 × 0,75 = <strong>382,5 kcal</strong>.",
        "<strong>Koşu:</strong> 60 kg, 30 dakika, 9,7 km/s (9,8 MET) → 9,8 × 60 × 0,5 = <strong>294 kcal</strong>.",
        "<strong>İp atlama:</strong> 70 kg, 15 dakika, orta tempo (11,8 MET) → 11,8 × 70 × 0,25 = <strong>206,5 kcal</strong>.",
        "<strong>Alternatif formülle kontrol:</strong> Yürüyüş örneğinde 3,5 × 3,5 × 70 ÷ 200 = 4,29 kcal/dk; 60 dakikada ≈ 257 kcal. İki formül arasındaki küçük fark, 1 MET'in oksijen ve kalori karşılığının yuvarlanmasından gelir."
      ],
      after: [
        "Kendi değerlerinizle hesap yapmak için [[arac:met-kalori-hesapla|MET Değeriyle Kalori Hesaplama]] aracını kullanabilirsiniz. Araç toplam ve net kaloriyi, dakika ve saat başına harcamayı, yoğunluk sınıfını ve MET-dakika değerini birlikte gösterir."
      ]
    },
    {
      h: "Yürüyüşün MET değeri kaçtır?",
      p: [
        "Yürüyüşün MET değeri hıza ve eğime göre belirgin biçimde değişir. Düz zeminde hız arttıkça değer yükselir; yokuş yukarı yürümek aynı hızda değeri bir buçuk ile iki katına çıkarabilir."
      ],
      table: {
        head: ["Yürüyüş", "Yaklaşık MET", "70 kg, 1 saat", "Şiddet"],
        rows: [
          ["Yavaş, 3,2 km/s", "2,8", "196 kcal", "Hafif"],
          ["Normal, 4,8 km/s", "3,5", "245 kcal", "Orta"],
          ["Tempolu, 5,6 km/s", "4,3", "301 kcal", "Orta"],
          ["Çok tempolu, 6,4 km/s", "5,0", "350 kcal", "Orta"],
          ["Yokuş yukarı, orta tempo", "6,0 civarı", "420 kcal", "Yüksek"],
          ["Merdiven çıkma", "8,8 civarı", "616 kcal", "Yüksek"]
        ],
        caption: "Değerler yaklaşıktır ve yetişkin ortalamasına göredir."
      },
      after: [
        "Adım sayınızdan ya da mesafenizden hareketle yürüyüş kalorisini bulmak için [[arac:yuruyus-kalori-hesapla|Yürüyüşte Yakılan Kalori Hesaplama]] aracını kullanabilirsiniz. Günlük adım hedefleriyle ilgili ayrıntılar [[bilgi:gunde-kac-adim-atmali|günde kaç adım atmalı]] yazısındadır."
      ]
    },
    {
      h: "1 saat bisiklet kaç kalori yakar?",
      table: {
        head: ["Bisiklet", "Yaklaşık MET", "60 kg", "75 kg", "90 kg"],
        rows: [
          ["Gezinti, 16 km/s altı", "4,0", "240", "300", "360"],
          ["Orta tempo, 16–19 km/s", "6,8", "408", "510", "612"],
          ["Tempolu, 19–22 km/s", "8,0", "480", "600", "720"],
          ["Hızlı, 22–25 km/s", "10,0", "600", "750", "900"],
          ["Sabit bisiklet, orta", "6,8 civarı", "408", "510", "612"]
        ],
        caption: "Tablodaki sayılar 1 saatlik toplam kcal'dir. Rüzgâr, eğim ve bisiklet türü gerçek harcamayı değiştirir."
      },
      after: [
        "Örneğin 75 kg'lık biri orta tempoda bir saat pedal çevirerek yaklaşık 510 kcal harcar. Mesafeyi ve ortalama hızı girerek hesap yapmak için [[arac:bisiklet-kalori-hesapla|Bisiklette Yakılan Kalori Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Yüzme mi koşu mu daha çok kalori yakar?",
      p: [
        "Cevap, yüzme stiline ve iki aktivitenin temposuna bağlıdır. Orta tempoda serbest stil yüzme yaklaşık 5,8 MET, 9,7 km/s hızla koşu yaklaşık 9,8 MET'tir; bu tempolarda koşu daha çok enerji harcatır. Hızlı ve kesintisiz serbest stil yüzme ise 9,8 MET civarına çıkar ve koşuyla eşitlenir."
      ],
      table: {
        head: ["Aktivite (70 kg, 30 dakika)", "Yaklaşık MET", "Yakılan kalori"],
        rows: [
          ["Yüzme, sırtüstü", "4,8", "168 kcal"],
          ["Yüzme, kurbağalama", "5,3", "186 kcal"],
          ["Yüzme, serbest orta", "5,8", "203 kcal"],
          ["Yüzme, serbest hızlı", "9,8", "343 kcal"],
          ["Koşu, 8 km/s", "8,3", "291 kcal"],
          ["Koşu, 9,7 km/s", "9,8", "343 kcal"],
          ["Koşu, 12 km/s", "11,8 civarı", "413 kcal"]
        ]
      },
      after: [
        "Yüzmenin eklemlere bindirdiği yük düşüktür; fazla kilolu kişiler ve eklem sorunu olanlar için uzun süre sürdürülebilir olması, saat başına daha az kalori yakmasını telafi edebilir. Süre ve stile göre hesap için [[arac:yuzme-kalori-hesapla|Yüzmede Yakılan Kalori Hesaplama]], tempo bazlı koşu hesapları için [[bilgi:kosu-temposu-nasil-hesaplanir|koşu temposu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "İp atlama kaç MET'tir?",
      p: [
        "İp atlama yüksek şiddetli bir aktivitedir. Fiziksel Aktivite Kitapçığı'na göre yavaş tempoda yaklaşık 8,8, orta tempoda yaklaşık 11,8, hızlı tempoda yaklaşık 12,3 MET olarak verilir. Bu, kısa sürede yüksek harcama demektir: 70 kg'lık biri orta tempoda 10 dakika ip atlayarak yaklaşık 138 kcal harcar.",
        "Pratikte çok az kişi ip atlamayı ara vermeden uzun süre sürdürebilir. Setler arasındaki dinlenmeler ortalama MET değerini düşürür; bu yüzden toplam süreyi değil, gerçekten atlanan süreyi hesaba katmak daha doğru sonuç verir. Atlama sayısı ve süreyle hesap yapmak için [[arac:ip-atlama-kalori-hesapla|İp Atlamada Yakılan Kalori Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kilo yakılan kaloriyi nasıl etkiler?",
      p: [
        "MET formülünde vücut ağırlığı doğrudan çarpan olarak yer aldığı için, aynı aktivitede yakılan kalori kiloyla doğru orantılıdır. Ağır bir vücudu hareket ettirmek daha fazla enerji gerektirir. 60 kg'lık ve 90 kg'lık iki kişi aynı hızda bir saat yürüdüğünde (3,5 MET) ilki 210, ikincisi 315 kcal harcar.",
        "Bu durum kilo verme sürecinde önemli bir sonuç doğurur: kilo azaldıkça aynı egzersizle yakılan kalori de azalır. Başlangıçta 90 kg'ken 315 kcal harcatan yürüyüş, 75 kg'a inildiğinde yaklaşık 262 kcal harcatır. Egzersiz planını zamanla süre ya da şiddet artırarak güncellemek bu nedenle faydalıdır. Günlük toplam enerji ihtiyacınızı [[arac:kalori-hesapla|Günlük Kalori İhtiyacı Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "MET-dakika ve haftalık hareket hedefi",
      p: [
        "MET-dakika, bir aktivitenin MET değeri ile süresinin (dakika) çarpımıdır ve haftalık toplam fiziksel aktiviteyi tek bir sayıyla ifade eder. 30 dakika 4 MET'lik yürüyüş 120 MET-dakikadır. Kişinin ağırlığından bağımsız olduğu için farklı kişileri ve aktiviteleri karşılaştırmada kullanışlıdır.",
        "Dünya Sağlık Örgütü yetişkinler için haftada en az 150–300 dakika orta şiddetli ya da 75–150 dakika yüksek şiddetli aerobik aktivite veya bunların eşdeğer bir birleşimini önerir. Orta şiddet 3–6 MET, yüksek şiddet 6 MET ve üzeridir. Bu öneri kabaca haftada 500–1.000 MET-dakikaya karşılık gelir: 150 dakika × 4 MET = 600 MET-dakika."
      ]
    },
    {
      h: "Akıllı saatin kalori hesabı ne kadar doğru?",
      p: [
        "Akıllı saatler ve bileklikler kalori harcamasını kalp atış hızı, hareket sensörleri, yaş, kilo ve cinsiyet bilgisinden tahmin eder. Adım sayısı ve nabız ölçümü genellikle makul doğrulukta olsa da enerji harcaması tahmininde bağımsız çalışmalar belirgin hatalar bildirmiştir; sapma cihaz ve aktivite türüne göre değişir ve özellikle bisiklet, ağırlık antrenmanı ve yüzme gibi bilek hareketinin enerjiyle doğrudan ilişkili olmadığı aktivitelerde büyüyebilir.",
        "MET hesabı da bir tahmindir; kişinin kondisyonu, tekniği ve metabolizması ortalamadan farklı olabilir. Her iki yöntemi de mutlak değer yerine eğilimi izlemek için kullanın: aynı cihaz ve aynı yöntemle haftadan haftaya yaptığınız karşılaştırmalar, tek bir günün kesin kalori sayısından daha anlamlıdır. Egzersizle yakılan kaloriyi yemekle \"geri kazanmak\" amacıyla kullanırken temkinli olun; tahminler gerçek harcamayı olduğundan yüksek gösterebilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Toplamı net sanmak:</strong> 245 kcal'lik yürüyüşün yaklaşık 70 kcal'ini oturarak da harcayacaktınız; egzersizin ek katkısı net değerdir.",
        "<strong>Dinlenmeleri saymak:</strong> 60 dakikalık salon antrenmanının yarısı setler arası dinlenmeyse ortalama MET düşer.",
        "<strong>Yanlış tempoyu seçmek:</strong> Kendi temponuzu olduğundan yüksek seçmek harcamayı %30–50 abartabilir.",
        "<strong>Süreyi saat yerine dakika girmek:</strong> Formülde süre saat cinsindendir; 30 dakika 0,5 olarak yazılır.",
        "<strong>Tek bir değeri herkese uygulamak:</strong> Tablolar yetişkin ortalamasıdır; çocuklar, yaşlılar ve kronik hastalığı olanlarda gerçek harcama farklı olabilir."
      ]
    }
  ],
  faq: [
    ["MET değeri nedir?", "MET, metabolik eşdeğer demektir ve bir aktivitenin sessizce otururken harcanan enerjinin kaç katını gerektirdiğini gösterir. 1 MET yaklaşık olarak kilogram başına saatte 1 kilokaloriye karşılık gelir."],
    ["MET ile yakılan kalori nasıl hesaplanır?", "Aktivitenin MET değeri, vücut ağırlığı ve saat cinsinden süre çarpılır. 70 kg'lık bir kişi 3,5 MET'lik yürüyüşü bir saat yaparsa 3,5 × 70 × 1 = 245 kilokalori harcar."],
    ["Yürüyüşün MET değeri kaçtır?", "Yürüyüşün MET değeri hıza bağlıdır: saatte yaklaşık 3,2 km'lik yavaş yürüyüş 2,8, 4,8 km'lik normal yürüyüş 3,5, 6,4 km'lik çok tempolu yürüyüş 5 MET civarındadır. Yokuş yukarı değer daha yüksektir."],
    ["1 saat bisiklet kaç kalori yakar?", "Tempoya ve kiloya göre değişir. Saatte 16 ile 19 km arasındaki orta tempoda yaklaşık 6,8 MET kabul edilir; 75 kg'lık biri bir saatte yaklaşık 510 kcal, 60 kg'lık biri yaklaşık 408 kcal harcar."],
    ["Yüzme mi koşu mu daha çok kalori yakar?", "Orta tempoda serbest stil yüzme yaklaşık 5,8 MET, saatte 9,7 km'lik koşu yaklaşık 9,8 MET'tir; bu tempolarda koşu daha çok kalori yakar. Hızlı ve kesintisiz serbest stil yüzme ise koşuyla benzer düzeye çıkar."],
    ["İp atlama kaç MET'tir?", "İp atlama yüksek şiddetli bir aktivitedir; yavaş tempoda yaklaşık 8,8, orta tempoda yaklaşık 11,8, hızlı tempoda yaklaşık 12,3 MET olarak verilir. 70 kg'lık biri orta tempoda 10 dakikada yaklaşık 138 kcal harcar."],
    ["Kilo yakılan kaloriyi nasıl etkiler?", "Formülde kilo doğrudan çarpan olduğu için yakılan kalori kiloyla doğru orantılıdır. Aynı yürüyüşte 90 kg'lık kişi 60 kg'lık kişiden bir buçuk kat fazla enerji harcar; kilo verdikçe aynı egzersizin harcaması azalır."],
    ["Akıllı saatin kalori hesabı ne kadar doğru?", "Akıllı saatler kaloriyi nabız ve hareketten tahmin eder ve bağımsız çalışmalarda belirgin sapmalar bildirilmiştir. Sonuçları kesin değer yerine aynı cihazla zaman içindeki eğilimi izlemek için kullanmak daha doğrudur."],
    ["Net kalori ile toplam kalori farkı nedir?", "Toplam kalori aktivite boyunca harcanan enerjinin tamamıdır. Net kalori ise dinlenmede zaten harcanacak olan 1 MET'i düşer: 3,5 MET'lik bir saatlik yürüyüşte 70 kg'lık biri için toplam 245, net 175 kcal'dir."]
  ],
  tools: ["met-kalori-hesapla", "yuruyus-kalori-hesapla", "bisiklet-kalori-hesapla", "yuzme-kalori-hesapla", "ip-atlama-kalori-hesapla", "kalori-hesapla"],
  related: ["gunde-kac-adim-atmali", "kosu-temposu-nasil-hesaplanir", "normal-nabiz-kac-olmali", "makro-hesaplama-nasil-yapilir"],
  uyari: "genel bilgidir, tıbbi tavsiye değildir; kronik hastalığınız varsa egzersiz programına başlamadan önce hekiminize danışın",
  sources: [
    ["Dünya Sağlık Örgütü – Fiziksel aktivite", "https://www.who.int/news-room/fact-sheets/detail/physical-activity"],
    ["T.C. Sağlık Bakanlığı – Halk Sağlığı Genel Müdürlüğü", "https://hsgm.saglik.gov.tr/"]
  ]
};
