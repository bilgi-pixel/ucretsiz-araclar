export default {
  slug: "yagmur-suyu-toplama-hesabi",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Yağmur Suyu Toplama: Çatıdan Kaç Litre Su Toplanır, Depo Kaç Ton Olmalı",
  pageTitle: "Yağmur Suyu Toplama Hesabı: Çatıdan Kaç Litre, Depo Kaç Ton",
  description: "1 mm yağış metrekareye 1 litre sudur. Toplanan su = çatı izdüşüm alanı × yağış × akış katsayısı. 120 m² çatıdan yılda yaklaşık 52 ton su ve depo boyutlama örneği.",
  keywords: ["yağmur suyu toplama", "çatıdan kaç litre yağmur suyu", "yağmur suyu deposu kaç ton", "1 mm yağış kaç litre", "akış katsayısı nedir", "yağmur suyu hasadı", "yağmur suyu bahçe sulama", "çatı alanı hesaplama"],
  lead: "<strong>1 mm yağış, metrekareye 1 litre su demektir</strong>; bu yüzden bir çatıdan toplanabilecek su, çatının yatay izdüşüm alanı × yağış (mm) × akış katsayısı formülüyle bulunur. 120 m² izdüşümlü kiremit çatı (katsayı 0,80) ve %90 filtre verimiyle her 1 mm yağışta yaklaşık 86 litre, yıllık 600 mm yağışta yaklaşık 52 m³ (52 ton) su toplanır. Depo büyüklüğü ise yıllık toplamdan değil, yağışların aylara dağılımından ve sizin günlük ihtiyacınızdan belirlenir; bu örnekteki bir ev için 3–5 tonluk depo çoğu zaman makul bir başlangıçtır. Bu yazıda hesabı, katsayıları, depo boyutlamayı ve kullanım alanlarını anlatıyoruz.",
  kisaCevap: [
    "1 mm yağış = 1 litre/m²; 1 m³ = 1.000 litre ≈ 1 ton su.",
    "Toplanan su (L) = çatı izdüşüm alanı (m²) × yağış (mm) × akış katsayısı × sistem verimi.",
    "Akış katsayısı örnekleri: metal çatı 0,90, kiremit 0,80, beton teras 0,70, çakıllı düz çatı 0,60, yeşil çatı 0,40.",
    "Hesapta çatının eğik yüzey alanı değil, yere düşen yatay izdüşüm alanı kullanılır.",
    "Depo; yağışlı ve kurak ayların dengesi, günlük ihtiyaç ve tek bir yağışta gelen su miktarı birlikte düşünülerek seçilir.",
    "Toplanan su arıtılmadan içme suyu olarak kullanılmaz; bahçe sulama, tuvalet rezervuarı ve temizlik için uygundur."
  ],
  figure: {
    alt: "Eğik çatılı bir evin yağmur suyunu oluk ve filtreden geçirip depoya yönlendirmesi; 120 metrekare izdüşüm, kiremit katsayısı 0,80, yüzde 90 verim, her milimetrede 86 litre ve yılda 600 milimetrede yaklaşık 52 ton.",
    caption: "Hesapta çatının yere düşen gölgesi (izdüşüm alanı) kullanılır. İlk yıkama düzeneği her yağışın ilk kirli suyunu ayırır, filtre yaprak ve tozu tutar. Sayılar örnektir: yıllık yağış ve çatı türü sonucu doğrudan değiştirir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Çatıdan depoya yağmur suyu</text>
  <g class="sa">
    <line x1="80" y1="50" x2="70" y2="74" class="sa" fill="none"/><line x1="130" y1="50" x2="120" y2="74" class="sa" fill="none"/>
    <line x1="180" y1="50" x2="170" y2="74" class="sa" fill="none"/><line x1="230" y1="50" x2="220" y2="74" class="sa" fill="none"/>
    <line x1="280" y1="50" x2="270" y2="74" class="sa" fill="none"/><line x1="330" y1="50" x2="320" y2="74" class="sa" fill="none"/>
  </g>
  <polygon points="40,170 200,86 360,170" class="p"/>
  <rect x="70" y="170" width="260" height="140" class="sf sb"/>
  <rect x="170" y="230" width="60" height="80" class="ps"/>
  <line x1="40" y1="330" x2="360" y2="330" class="sp sw" fill="none"/>
  <text x="200" y="352" class="sm mid b p">İzdüşüm: 120 m² (ör. 12 m × 10 m)</text>
  <line x1="360" y1="172" x2="400" y2="172" class="st sw" fill="none"/>
  <line x1="400" y1="172" x2="400" y2="250" class="st sw" fill="none"/>
  <rect x="384" y="200" width="32" height="30" rx="4" class="y"/>
  <text x="422" y="220" class="sm">Filtre, ilk yıkama</text>
  <line x1="400" y1="250" x2="450" y2="250" class="st sw" fill="none"/>
  <rect x="450" y="230" width="110" height="100" rx="12" class="oks"/>
  <text x="505" y="276" class="b mid">Depo</text>
  <text x="505" y="298" class="sm mid">3–5 ton</text>
  <rect x="580" y="60" width="130" height="280" rx="10" class="sf sb"/>
  <text x="645" y="86" class="b mid">Hesap</text>
  <text x="594" y="114" class="sm">120 m² × 0,80</text>
  <text x="594" y="134" class="sm">× 0,90 verim</text>
  <text x="594" y="164" class="b">1 mm → 86,4 L</text>
  <text x="594" y="196" class="sm">Yıllık 600 mm</text>
  <text x="594" y="220" class="b p">51.840 L</text>
  <text x="594" y="244" class="b p">≈ 52 m³</text>
  <text x="594" y="278" class="sm">20 mm'lik bir</text>
  <text x="594" y="298" class="sm">yağışta</text>
  <text x="594" y="322" class="b">1.728 L</text>
  <text x="40" y="396" class="sm t2">1 mm yağış = 1 L/m² · 1 m³ = 1.000 L ≈ 1 ton</text>
</svg>`
  },
  sections: [
    {
      h: "1 mm yağış metrekareye kaç litre su demektir?",
      p: [
        "Meteoroloji istasyonlarının bildirdiği yağış miktarı, yere düşen suyun akmadan, sızmadan ve buharlaşmadan kalsaydı oluşturacağı su yüksekliğidir. 1 mm yükseklikte ve 1 m² taban alanında bir su tabakasının hacmi 0,001 m × 1 m² = 0,001 m³, yani <strong>1 litredir</strong>. Bu yüzden \"metrekareye 15 kilogram yağış düştü\" ifadesi ile \"15 mm yağış\" aynı anlamı taşır: her metrekareye 15 litre su.",
        "Bu basit eşitlik yağmur suyu hasadının temelidir. 100 m²'lik bir çatıya 10 mm yağış düştüğünde teorik olarak 1.000 litre, yani yaklaşık 1 ton su gelir. Gerçekte bu suyun bir kısmı çatıda buharlaşır, sıçrar ya da oluklardan taşar; bu kayıplar akış katsayısı ve sistem verimiyle hesaba katılır."
      ]
    },
    {
      h: "Çatıdan ne kadar yağmur suyu toplanabilir? Formül",
      formula: "Her 1 mm yağışta toplanan (L) = izdüşüm alanı (m²) × akış katsayısı × sistem verimi\nYıllık toplanan (L) = izdüşüm alanı × yıllık yağış (mm) × akış katsayısı × sistem verimi\nm³ = litre ÷ 1.000",
      ol: [
        "Çatının yatay izdüşüm alanı 12 m × 10 m = <strong>120 m²</strong> olsun.",
        "Çatı kiremit; akış katsayısı <strong>0,80</strong>. Filtre ve ilk yıkama kayıpları için sistem verimi <strong>%90</strong>.",
        "Her 1 mm yağışta: 120 × 0,80 × 0,90 = <strong>86,4 litre</strong>.",
        "Bölgenin uzun yıllar ortalama yağışı 600 mm ise yıllık: 86,4 × 600 = <strong>51.840 litre ≈ 51,8 m³</strong>.",
        "Aylık ortalama 51.840 ÷ 12 ≈ 4.320 litre, günlük ortalama ≈ 142 litre. Ancak bu bir ortalamadır; yağış aylara eşit dağılmaz."
      ],
      after: [
        "Bu hesabı [[arac:yagmur-suyu-hasadi-hesapla|Yağmur Suyu Hasadı Hesaplama]] aracıyla yapabilirsiniz. Çatı izdüşüm alanını, yıllık yağışı, çatı türünü ve sistem verimini girdiğinizde araç yıllık, aylık, günlük ve her 1 mm yağışta toplanan suyu verir; günlük ihtiyacınızı yazarsanız ihtiyacın yüzde kaçının karşılanacağını da gösterir."
      ]
    },
    {
      h: "Akış katsayısı nedir?",
      p: [
        "Akış katsayısı, bir yüzeye düşen yağmurun ne kadarının akıp toplama noktasına ulaştığını gösteren 0 ile 1 arasındaki bir orandır. Pürüzsüz ve geçirimsiz yüzeyler suyun büyük kısmını iletir; gözenekli, pürüzlü ya da bitkili yüzeyler suyu tutar, emer veya buharlaşmasına izin verir."
      ],
      table: {
        head: ["Çatı / yüzey türü", "Akış katsayısı (yaklaşık)", "120 m²'de her 1 mm yağışta (verim %90)"],
        rows: [
          ["Metal, sac ya da cam çatı", "0,90", "97,2 L"],
          ["Kiremit çatı", "0,80", "86,4 L"],
          ["Beton teras", "0,70", "75,6 L"],
          ["Çakıl kaplı düz çatı", "0,60", "64,8 L"],
          ["Yeşil (bitkili) çatı", "0,40", "43,2 L"]
        ],
        caption: "Katsayılar literatürde verilen aralıkların temsilî değerleridir; çatının eğimi, temizliği ve yağış şiddetine göre değişir."
      },
      after: [
        "Kısa ve hafif yağışlarda ilk suyun önemli bir kısmı çatıyı ıslatmaya ve buharlaşmaya gider; bu yüzden 1–2 mm'lik çiselemelerde toplanan su hesaplanandan azdır. Sağanaklarda ise oluk kapasitesi yetersizse su taşar. Sistem verimi bu kayıpları ve ilk yıkama ile atılan suyu temsil eder."
      ]
    },
    {
      h: "Çatı alanı nasıl hesaplanır?",
      p: [
        "Yağmur dikey düştüğü için çatının ne kadar su topladığını belirleyen, eğik yüzeyin alanı değil, <strong>çatının yere düşen gölgesinin (yatay izdüşümünün) alanıdır</strong>. Saçak taşmaları dahil olmak üzere çatının dış kenarlarının oluşturduğu dikdörtgenin eni ve boyu çarpılır."
      ],
      ul: [
        "<strong>Beşik (iki yöne eğimli) çatı:</strong> İzdüşüm = saçak dahil uzunluk × saçak dahil genişlik. 12 m × 10 m = 120 m². Eğik yüzey alanı daha büyüktür ama hesaba girmez.",
        "<strong>Kırma çatı:</strong> Dört yöne eğimli olsa da izdüşüm yine dış dikdörtgenin alanıdır.",
        "<strong>Düz teras:</strong> Parapet duvarlarının iç kenarları arasındaki alan.",
        "<strong>Tek oluğa bağlı alan:</strong> Suyu yalnızca bir yöndeki oluktan topluyorsanız, yalnızca o oluğa akan çatı yüzeylerinin izdüşümünü alın. Beşik çatının yalnızca bir yüzü bağlıysa alan yarıya iner."
      ],
      after: [
        "Kiremit, membran ya da çatı kaplaması siparişi için gereken eğik yüzey alanını ve eğimi [[arac:cati-alani-hesapla|Çatı Alanı ve Eğimi Hesaplama]] aracıyla bulabilirsiniz; yağmur suyu hesabında ise bu aracın değil, izdüşüm alanının kullanılması gerektiğini unutmayın."
      ]
    },
    {
      h: "Yağmur suyu deposu kaç ton olmalı?",
      p: [
        "Depo boyutu, toplanabilecek yıllık sudan çok daha küçüktür; çünkü depo, yağışlı dönemlerde dolup kurak dönemlerde boşalan bir tampondur. Yıllık 52 m³ toplayan bir çatı için 52 tonluk depo hem pahalı hem gereksizdir: depo çoğu zaman yarı boş kalır. Doğru büyüklük için üç bakış açısını birlikte değerlendirin."
      ],
      ol: [
        "<strong>Tek bir yağışı yakalamak:</strong> Bölgenizde sık görülen bir sağanak (örneğin 20 mm) çatınızdan 120 × 0,80 × 0,90 × 20 ≈ 1.728 litre su getirir. Deponun en azından böyle bir yağışı taşırmadan alması istenir.",
        "<strong>Kullanım ihtiyacı:</strong> Bahçe sulama için örnek olarak günde 250 litre kullanıyor ve yağışsız 15 günü karşılamak istiyorsanız 250 × 15 = 3.750 litre depolama gerekir.",
        "<strong>Gelen suyla denge:</strong> İhtiyacınız gelen sudan fazlaysa büyük depo dolmaz. Örnekteki çatı ortalama günde 142 litre su toplar; günde 250 litre tüketimi yıl boyu karşılayamaz, yağışlı aylarda biriktirdiğini kurak aylarda kısmen kullanır.",
        "<strong>Pratik sonuç:</strong> Bu örnek ev için 3–5 tonluk bir depo, tek yağışları yakalamak ve birkaç haftalık sulamayı karşılamak için makul bir başlangıçtır. Daha kesin boyutlama için aylık yağış verisiyle ay ay su dengesi kurulur."
      ],
      after: [
        "Deponun boyutlarından litre kapasitesini (ya da istediğiniz kapasite için boyutları) hesaplamak için [[arac:su-deposu-hacmi-hesapla|Su Deposu Hacmi Hesaplama]] aracını kullanabilirsiniz. Litre, metreküp ve ton dönüşümleri için [[arac:litre-metrekup-cevir|Litre Metreküp Çevirici]] ile [[bilgi:su-deposu-kac-litre-havuz-kac-ton|su deposu kaç litre]] yazısı işinize yarar."
      ]
    },
    {
      h: "Türkiye'de yağış miktarı ve yerel kurallar",
      p: [
        "Türkiye'de yıllık yağış bölgeden bölgeye büyük farklılık gösterir. Uzun yıllar ülke ortalaması 500–600 mm civarındadır; İç Anadolu'nun bazı kesimlerinde yıllık yağış 300–350 mm'ye kadar düşerken Doğu Karadeniz kıyısında 2.000 mm'yi aşar. Aynı 120 m²'lik çatı bu nedenle bir ilde yılda 25 ton, başka bir ilde 170 tondan fazla su toplayabilir. Kendi ilçenizin uzun yıllar ortalamasını ve aylık dağılımını Meteoroloji Genel Müdürlüğü'nün istatistiklerinden öğrenebilirsiniz.",
        "Ocak 2021'de Planlı Alanlar İmar Yönetmeliği'nde yapılan değişiklikle, 2.000 m²'den büyük parsellerde yapılacak binalarda yağmur suyu toplama sistemi kurulması zorunlu hâle getirilmiştir. Bazı belediyeler kendi imar yönetmeliklerinde ek düzenlemeler yapmıştır. Yeni bir yapı ya da büyük bir tadilat planlıyorsanız belediyenizin imar müdürlüğünden güncel şartları öğrenin."
      ]
    },
    {
      h: "Yağmur suyu bahçe sulamada kullanılabilir mi?",
      p: [
        "Evet. Yağmur suyu kireç ve klor içermediği için bitkiler tarafından iyi karşılanır ve bahçe sulamanın en yaygın kullanım alanıdır. Bunun dışında tuvalet rezervuarı, araç yıkama, dış mekân temizliği ve uygun filtreleme ile çamaşır makinesinde kullanılabilir. Bu kullanımlar için şebeke suyundan ayrı bir tesisat hattı gerekir; iki sistemin birbirine karışmaması için geri akış önleyici kullanılmalıdır.",
        "Çatıdan toplanan su; kuş dışkısı, toz, yaprak ve çatı malzemesinden gelen kirleticiler içerebilir. Bu nedenle <strong>arıtılmadan ve analiz edilmeden içme ya da yemek suyu olarak kullanılmaz</strong>. Deponun ışık almayan, kapalı ve sivrisinek girişine karşı korunmuş olması, düzenli temizlenmesi gerekir."
      ],
      ul: [
        "<strong>İlk yıkama düzeneği:</strong> Her yağışın ilk 1–2 mm'si çatıdaki kiri taşır; bu suyu ayıran basit bir düzenek su kalitesini belirgin biçimde artırır.",
        "<strong>Süzgeç ve filtre:</strong> Oluk ağzında yaprak süzgeci, depo girişinde ince filtre kullanın.",
        "<strong>Taşma hattı:</strong> Depo dolduğunda fazla su yağmur suyu hattına ya da bahçeye kontrollü yönlendirilmelidir.",
        "<strong>Pompa:</strong> Yeraltı depolarında ve basınçlı kullanımda dalgıç ya da hidrofor pompa gerekir."
      ]
    },
    {
      h: "Yağmur suyu sistemi kendini ne kadar sürede öder?",
      p: [
        "Geri ödeme süresi, sistemin maliyetinin, her yıl şebekeden almaktan kurtulduğunuz suyun bedeline bölünmesiyle hesaplanır. Önemli olan toplanan değil, <strong>gerçekten kullanılan</strong> su miktarıdır."
      ],
      formula: "Yıllık tasarruf (TL) = yılda kullanılan yağmur suyu (m³) × şebeke suyu birim fiyatı (TL/m³)\nGeri ödeme süresi (yıl) = sistem maliyeti ÷ yıllık tasarruf",
      ol: [
        "Örnek tutarlarla: Depo, filtre, pompa ve tesisat toplamı 40.000 TL olsun.",
        "Yılda gerçekten kullanılan su 40 m³, şebeke suyunun atık su bedeli dahil birim fiyatı örnek olarak 50 TL/m³ olsun.",
        "Yıllık tasarruf 40 × 50 = 2.000 TL; geri ödeme süresi 40.000 ÷ 2.000 = 20 yıl.",
        "Kullanım 80 m³'e çıkarsa (örneğin tuvalet rezervuarları da bağlanırsa) süre 10 yıla iner."
      ],
      after: [
        "Kendi su tarifenizdeki birim fiyatla hesap yapmak için [[arac:su-tuketimi-hesapla|Su Tüketimi ve Maliyeti Hesaplama]] aracını kullanabilirsiniz. Su tarifeleri belediyeye ve kademeye göre değiştiği için faturanızdaki güncel birim fiyatı esas alın. Sistemin değeri yalnızca para tasarrufuyla ölçülmez: su kesintilerinde yedek kaynak olması ve yağmur suyu kanalına giden yükü azaltması da önemli faydalardır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Eğik çatı alanını kullanmak:</strong> Eğik yüzey alanıyla yapılan hesap, toplanacak suyu olduğundan yüksek gösterir.",
        "<strong>Yıllık toplamla depo seçmek:</strong> Yıllık 50 ton suyu biriktirmek için 50 tonluk depo gerekmez; yağış yıl içine dağılır.",
        "<strong>Akış katsayısını 1 almak:</strong> Hiçbir çatı suyun tamamını iletmez; özellikle düz ve çakıllı çatılarda kayıp büyüktür.",
        "<strong>Taşma hattını unutmak:</strong> Dolan depodan taşan su temel ve bodruma zarar verebilir.",
        "<strong>Açık depo:</strong> Işık alan ve açık depolarda yosun ve sivrisinek üremesi kaçınılmazdır."
      ]
    }
  ],
  faq: [
    ["Çatıdan ne kadar yağmur suyu toplanabilir?", "Çatının yatay izdüşüm alanı, yağış miktarı, akış katsayısı ve sistem verimi çarpılarak bulunur. 120 m² kiremit çatı, yüzde 90 verimle her 1 mm yağışta yaklaşık 86 litre, yıllık 600 mm yağışta yaklaşık 52 ton su toplar."],
    ["1 mm yağış metrekareye kaç litre su demektir?", "1 mm yağış, her metrekareye 1 litre su düşmesi demektir. Bu yüzden meteoroloji raporlarında geçen metrekareye 15 kilogram yağış ifadesi ile 15 mm yağış aynı miktarı anlatır."],
    ["Yağmur suyu deposu kaç ton olmalı?", "Depo; sık görülen bir sağanağı taşırmadan alabilecek ve kurak dönemde birkaç haftalık ihtiyacı karşılayacak büyüklükte seçilir. 120 m² çatılı bir evde bahçe sulama için 3 ile 5 tonluk depo çoğu zaman makul bir başlangıçtır."],
    ["Yağmur suyu bahçe sulamada kullanılabilir mi?", "Evet, kireç ve klor içermediği için bahçe sulamaya çok uygundur. Ayrıca tuvalet rezervuarı, araç yıkama ve dış temizlikte kullanılabilir; ancak arıtılmadan içme suyu olarak kullanılmamalıdır."],
    ["Çatı alanı nasıl hesaplanır?", "Yağmur suyu hesabında çatının eğik yüzeyi değil, yere düşen yatay izdüşümü kullanılır. Saçak dahil uzunluk ile genişlik çarpılır; 12 metreye 10 metrelik bir beşik çatının izdüşüm alanı 120 metrekaredir."],
    ["Akış katsayısı nedir?", "Akış katsayısı, yüzeye düşen yağmurun ne kadarının akıp toplama noktasına ulaştığını gösteren orandır. Metal çatıda yaklaşık 0,90, kiremitte 0,80, beton terasta 0,70, yeşil çatıda 0,40 civarında alınır."],
    ["Yağmur suyu sistemi kendini ne kadar sürede öder?", "Sistem maliyeti, yılda gerçekten kullanılan yağmur suyu miktarı ile şebeke suyu birim fiyatının çarpımına bölünür. Örnek olarak 40.000 TL'lik sistem yılda 40 m³ kullanımla ve 50 TL/m³ fiyatla 20 yılda kendini öder."],
    ["Litre metreküpe nasıl çevrilir?", "1 metreküp 1.000 litredir; litre değeri 1.000'e bölünerek metreküp bulunur. Su için 1 metreküp yaklaşık 1 ton kabul edildiğinden 5.000 litrelik depo halk arasında 5 tonluk depo olarak anılır."],
    ["Yağmur suyu toplama zorunlu mu?", "Planlı Alanlar İmar Yönetmeliği'nde 2021'de yapılan değişiklikle 2.000 metrekareden büyük parsellerdeki yapılarda yağmur suyu toplama sistemi zorunlu hâle getirilmiştir. Belediyelerin ek kuralları olabileceğinden imar müdürlüğüne danışılmalıdır."]
  ],
  tools: ["yagmur-suyu-hasadi-hesapla", "su-deposu-hacmi-hesapla", "cati-alani-hesapla", "litre-metrekup-cevir", "su-tuketimi-hesapla"],
  related: ["su-deposu-kac-litre-havuz-kac-ton", "dekara-kac-fidan-dikilir", "alan-ve-hacim-formulleri"],
  sources: [
    ["Meteoroloji Genel Müdürlüğü – İllere ait mevsim normalleri", "https://www.mgm.gov.tr/"],
    ["Resmî Gazete – Planlı Alanlar İmar Yönetmeliği değişikliği (Ocak 2021)", "https://www.resmigazete.gov.tr/"],
    ["Çevre, Şehircilik ve İklim Değişikliği Bakanlığı", "https://www.csb.gov.tr/"]
  ]
};
