export default {
  slug: "damla-sulama-ne-kadar-su-verilir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Damla Sulamada Ne Kadar Su Verilir? Dekara Su İhtiyacı ve Sulama Süresi",
  pageTitle: "Damla Sulamada Ne Kadar Su Verilir? Dekara Su ve Süre Hesabı",
  description: "1 mm su 1 dekarda 1 m³ (1 ton) eder. Bitki su ihtiyacı, randıman, damlatıcı debisi ve pompa kapasitesiyle damla sulamada dekara su miktarı ve süre hesabı örneklerle.",
  keywords: ["damla sulama ne kadar su", "dekara kaç ton su", "sulama süresi hesaplama", "damlatıcı debisi", "bitki su ihtiyacı", "sulama suyu ihtiyacı", "su deposu kaç ton olmalı", "m3 saat litre dakika"],
  lead: "Damla sulamada verilecek su miktarı, bitkinin günlük su tüketiminin (mm) sulama randımanına bölünmesiyle bulunur ve <strong>1 mm su, 1 dekarda 1 m³ yani 1 ton</strong> eder. Örneğin günde 6,3 mm su tüketen bir bitki için %90 randımanla dekara günde yaklaşık 7 ton su verilir. Sulama süresi ise bu hacmin dekardaki damlatıcıların toplam debisine bölünmesiyle hesaplanır. Bu sayfada bitki su ihtiyacını, damlatıcı debisini, pompa ve depo kapasitesini örnek değerlerle adım adım bulacaksınız.",
  kisaCevap: [
    "Temel dönüşüm: 1 mm su derinliği × 1 dekar (1.000 m²) = 1 m³ = 1.000 litre = yaklaşık 1 ton.",
    "Bitki su tüketimi = referans buharlaşma-terleme (ETo) × bitki katsayısı (Kc); değerler iklime, aya ve bitkinin gelişme dönemine göre değişir.",
    "Verilecek brüt su = net ihtiyaç ÷ sulama randımanı; damla sulamada randıman genellikle %85–95 kabul edilir.",
    "Sulama süresi (saat) = verilecek su (litre) ÷ (damlatıcı sayısı × damlatıcı debisi, L/saat).",
    "Pompa debisi bir seferde sulanacak alanın toplam damlatıcı debisini karşılamıyorsa arazi bölgelere ayrılır.",
    "Değerler örnektir; ürününüz ve bölgeniz için il ya da ilçe tarım müdürlüğünün önerilerine başvurun."
  ],
  figure: {
    alt: "Damla sulama hesap akışı: ETo 6 milimetre çarpı Kc 1,05 eşittir günlük 6,3 milimetre bitki tüketimi; yüzde 90 randımanla 7 milimetre yani dekara 7 metreküp; dekarda 3.000 damlatıcı saatte 2 litreyle 6 metreküp verir, sulama süresi 70 dakika.",
    caption: "Örnek bir yaz gününde dekara verilecek suyun ve sulama süresinin hesabı. Damlatıcılar 33 cm aralıkla, sıralar 1 m arayla döşenmiştir. Tüm değerler örnektir; gerçek ihtiyaç bitki, toprak ve iklime göre değişir.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir dekar için günlük sulama hesabı (örnek)</text>
  <rect x="20" y="50" width="200" height="86" rx="10" class="sf sb"/>
  <text x="120" y="76" class="sm mid mu">Bitki tüketimi</text>
  <text x="120" y="104" class="b mid">6 mm × 1,05</text>
  <text x="120" y="126" class="sm mid t2">ETo × Kc = 6,3 mm/gün</text>
  <rect x="260" y="50" width="200" height="86" rx="10" class="ps"/>
  <text x="360" y="76" class="sm mid">Randıman %90</text>
  <text x="360" y="104" class="b mid">6,3 ÷ 0,90 = 7 mm</text>
  <text x="360" y="126" class="sm mid t2">brüt su derinliği</text>
  <rect x="500" y="50" width="200" height="86" rx="10" class="p"/>
  <text x="600" y="76" class="sm mid sf">Dekara su</text>
  <text x="600" y="108" class="xl mid sf">7 m³</text>
  <text x="600" y="128" class="sm mid sf">= 7.000 litre ≈ 7 ton</text>
  <g class="sp sw" fill="none"><line x1="222" y1="93" x2="256" y2="93"/><line x1="462" y1="93" x2="496" y2="93"/></g>
  <text x="20" y="170" class="b">Lateral boru ve damlatıcılar</text>
  <g class="sp sw" fill="none"><line x1="20" y1="196" x2="420" y2="196"/><line x1="20" y1="236" x2="420" y2="236"/><line x1="20" y1="276" x2="420" y2="276"/></g>
  <g class="ok">
    <circle cx="40" cy="196" r="5"/><circle cx="90" cy="196" r="5"/><circle cx="140" cy="196" r="5"/><circle cx="190" cy="196" r="5"/><circle cx="240" cy="196" r="5"/><circle cx="290" cy="196" r="5"/><circle cx="340" cy="196" r="5"/><circle cx="390" cy="196" r="5"/>
    <circle cx="40" cy="236" r="5"/><circle cx="90" cy="236" r="5"/><circle cx="140" cy="236" r="5"/><circle cx="190" cy="236" r="5"/><circle cx="240" cy="236" r="5"/><circle cx="290" cy="236" r="5"/><circle cx="340" cy="236" r="5"/><circle cx="390" cy="236" r="5"/>
    <circle cx="40" cy="276" r="5"/><circle cx="90" cy="276" r="5"/><circle cx="140" cy="276" r="5"/><circle cx="190" cy="276" r="5"/><circle cx="240" cy="276" r="5"/><circle cx="290" cy="276" r="5"/><circle cx="340" cy="276" r="5"/><circle cx="390" cy="276" r="5"/>
  </g>
  <text x="65" y="300" class="sm mid">33 cm</text>
  <text x="430" y="220" class="sm">sıra arası 1 m</text>
  <rect x="470" y="160" width="230" height="140" rx="10" class="sf sb"/>
  <text x="486" y="186" class="sm">1 m² başına: 1 ÷ (0,33 × 1) ≈ 3 damlatıcı</text>
  <text x="486" y="210" class="sm">1 dekar: 3.000 damlatıcı</text>
  <text x="486" y="234" class="sm">Debi: 3.000 × 2 L/sa = 6 m³/sa</text>
  <text x="486" y="262" class="b">Süre: 7 ÷ 6 = 1,17 saat</text>
  <text x="486" y="286" class="b p">≈ 70 dakika</text>
  <rect x="20" y="320" width="680" height="92" rx="10" class="oks"/>
  <text x="36" y="346" class="b">5 dekar arazi, pompa 10 m³/saat</text>
  <text x="36" y="370" class="sm">Günlük ihtiyaç 5 × 7 = 35 m³ · Tüm arazinin damlatıcı debisi 30 m³/sa, pompa 10 m³/sa</text>
  <text x="36" y="394" class="sm b">Arazi 3 bölgeye ayrılır; her bölge yaklaşık 70 dk, toplam yaklaşık 3,5 saat</text>
</svg>`
  },
  sections: [
    {
      h: "Damla sulama nedir, neden su tasarrufu sağlar?",
      p: [
        "Damla sulama, suyun boru hatları ve bu hatlar üzerindeki damlatıcılar aracılığıyla doğrudan bitkinin kök bölgesine, düşük debiyle ve sık aralıklarla verildiği bir sulama yöntemidir. Su toprağın tüm yüzeyine yayılmadığı için buharlaşma, yüzey akışı ve derine sızma kayıpları azalır. Bu nedenle verilen suyun bitkiye ulaşan oranı, yani sulama randımanı, yüzey sulama yöntemlerine göre belirgin biçimde yüksektir.",
        "Damla sulama yalnızca suyu değil, enerjiyi ve gübreyi de daha verimli kullanmayı sağlar. Gübre suyla birlikte verilebilir, sıra aralarında yabancı ot daha az gelişir ve toprak yüzeyi kuru kaldığı için bazı yaprak hastalıklarının riski azalabilir. Ancak sistemin doğru tasarlanması, filtrelerin bakımı ve suyun doğru miktarda verilmesi gerekir; fazla ya da az sulama damla sulamada da verim kaybına yol açar."
      ]
    },
    {
      h: "Temel dönüşüm: 1 mm su dekara kaç ton eder?",
      p: [
        "Sulama hesaplarında su miktarı genellikle milimetre (mm) cinsinden, yani araziye yayılmış su tabakasının kalınlığı olarak ifade edilir. Bu, yağış ölçümüyle aynı birimdir. 1 dekar 1.000 m²'dir. 1.000 m²'lik bir alana 1 mm (0,001 m) kalınlığında su yayıldığında hacim 1.000 × 0,001 = 1 m³ olur. 1 m³ su 1.000 litredir ve yaklaşık 1 ton ağırlığındadır."
      ],
      formula: "1 mm × 1 dekar = 1 m³ = 1.000 litre ≈ 1 ton\nToplam su (m³) = alan (dekar) × su derinliği (mm)\n1 dönüm = 1 dekar = 1.000 m² · 1 hektar = 10 dekar",
      after: [
        "Bu dönüşüm hesapları büyük ölçüde kolaylaştırır: dekara 7 mm su vermek istiyorsanız 7 ton, 20 dekara 7 mm su vermek istiyorsanız 140 ton suya ihtiyacınız vardır. Arazi ölçülerinin dekar ve dönüm karşılıkları için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Bitki su ihtiyacı nasıl bulunur?",
      p: [
        "Bitkinin günlük su tüketimi, toprak yüzeyinden buharlaşma ile bitkinin yapraklarından terlemenin toplamıdır ve <strong>buharlaşma-terleme</strong> (evapotranspirasyon) olarak adlandırılır. Hesap iki aşamada yapılır: önce iklim verilerinden, iyi sulanmış kısa bir çim yüzeyi için tanımlanan <strong>referans buharlaşma-terleme (ETo)</strong> bulunur; sonra bu değer bitkiye ve gelişme dönemine özgü <strong>bitki katsayısı (Kc)</strong> ile çarpılır."
      ],
      formula: "Bitki su tüketimi (ETc, mm/gün) = ETo (mm/gün) × Kc",
      table: {
        head: ["Gelişme dönemi", "Kc (örnek aralık)", "Açıklama"],
        rows: [
          ["Başlangıç (fide, çıkış)", "0,4–0,6", "Yaprak alanı küçük, toprak yüzeyi açık"],
          ["Gelişme", "0,7–0,9", "Bitki hızla büyür, Kc artar"],
          ["Orta dönem (tam gelişme)", "1,0–1,2", "En yüksek su tüketimi"],
          ["Geç dönem (olgunlaşma)", "0,6–0,9", "Ürüne göre azalır"]
        ],
        caption: "Değerler birçok tarla ve sebze bitkisi için genel aralıklardır; kesin Kc değerleri bitkiye, çeşide ve bölgeye göre araştırma kuruluşlarınca belirlenir."
      },
      after: [
        "ETo, sıcaklık, nem, rüzgâr ve güneşlenmeye bağlıdır; Türkiye'nin iç ve güney bölgelerinde yaz aylarında günlük değerler belirgin biçimde yükselir, ilkbahar ve sonbaharda düşer. Bölgenize ait değerler için meteoroloji kurumunun tarımsal meteoroloji verileri ile Tarım ve Orman Bakanlığı'na bağlı araştırma enstitülerinin yayınları kullanılabilir. Örneğimizde yaz ortasında ETo = 6 mm/gün ve tam gelişme dönemindeki bir sebze için Kc = 1,05 alınmıştır: 6 × 1,05 = 6,3 mm/gün."
      ]
    },
    {
      h: "Damla sulamada dekara ne kadar su verilir? Çözümlü örnek",
      p: [
        "Bitkinin tükettiği su net ihtiyaçtır. Sistem ne kadar iyi olursa olsun suyun bir kısmı kaybolur; bu kaybı karşılamak için net ihtiyaç sulama randımanına bölünür. Damla sulamada randıman genellikle %85–95 aralığında kabul edilir."
      ],
      ol: [
        "Net ihtiyaç: ETc = 6 × 1,05 = 6,3 mm/gün.",
        "Randıman %90: brüt su = 6,3 ÷ 0,90 = 7 mm/gün.",
        "Dekara su: 7 mm × 1 dekar = 7 m³ = 7.000 litre ≈ 7 ton/gün.",
        "Sulama iki günde bir yapılacaksa her sulamada dekara 14 m³ verilir; aralık, toprağın su tutma kapasitesi ve bitkinin kök derinliğiyle belirlenir.",
        "Arazi 5 dekarsa günlük toplam ihtiyaç 5 × 7 = 35 m³'tür."
      ],
      after: [
        "Damla sulamada yalnızca bitki sıralarının çevresi ıslatıldığı için, özellikle genç meyve bahçelerinde, bazı hesaplarda bitkinin örttüğü alan oranına göre bir azaltma katsayısı da kullanılır. Bu ayrıntılar bitkiye özgü olduğu için tarım danışmanınızla birlikte belirlenmelidir. Alan, net su ve randımanı girerek toplam suyu ve pompa debisine göre süreyi bulmak için [[arac:sulama-suyu-hesapla|Sulama Suyu Hesaplama aracı]] kullanılabilir."
      ]
    },
    {
      h: "Damlatıcı debisi (litre/saat) neyi belirler? Sulama süresi hesabı",
      p: [
        "Damlatıcı debisi, bir damlatıcının saatte verdiği su miktarıdır; tarımsal sistemlerde 1–4 L/saat arası değerler yaygındır. Debi, damlatıcı aralığı ve sıra aralığı birlikte, sistemin birim alana saatte kaç milimetre su verdiğini belirler. Bu değer, sulama süresini doğrudan hesaplamayı sağlar."
      ],
      formula: "Damlatıcı sayısı / m² = 1 ÷ (damlatıcı aralığı × sıra aralığı)\nUygulama hızı (mm/saat) = damlatıcı sayısı / m² × debi (L/saat)\nSulama süresi (saat) = brüt su (mm) ÷ uygulama hızı (mm/saat)",
      ol: [
        "Damlatıcılar 33 cm aralıklı, sıralar 1 m arayla: 1 ÷ (0,33 × 1) ≈ 3 damlatıcı/m², dekarda yaklaşık 3.000 damlatıcı.",
        "Damlatıcı debisi 2 L/saat: uygulama hızı 3 × 2 = 6 L/m²/saat, yani 6 mm/saat.",
        "Dekarın toplam debisi: 3.000 × 2 = 6.000 L/saat = 6 m³/saat.",
        "Verilecek su 7 mm: süre 7 ÷ 6 ≈ 1,17 saat, yani yaklaşık 70 dakika."
      ],
      after: [
        "Damlatıcı debisi yüksek seçilirse süre kısalır ama toprağa birim zamanda giren su artar; ağır killi topraklarda bu, suyun yüzeyde göllenmesine yol açabilir. Hafif kumlu topraklarda ise uzun ve tek seferlik sulama suyun kök bölgesinin altına kaçmasına neden olabilir; bu topraklarda daha kısa ve sık sulama tercih edilir."
      ]
    },
    {
      h: "Kuyu pompası debisi yeterli mi nasıl anlaşılır?",
      p: [
        "Pompanın bir seferde besleyebileceği damlatıcı sayısı sınırlıdır. Bir seferde sulanmak istenen alanın toplam damlatıcı debisi pompa debisinden büyükse, sistemde basınç düşer ve hattın sonundaki damlatıcılar yeterli su veremez. Bu durumda arazi vanalarla bölgelere ayrılır ve bölgeler sırayla sulanır."
      ],
      ol: [
        "Örnekteki 5 dekarlık arazinin tamamı aynı anda açılırsa toplam debi 5 × 6 = 30 m³/saat olur.",
        "Kuyu pompasının sağladığı debi 10 m³/saat ise arazi 30 ÷ 10 = 3 bölgeye ayrılmalıdır.",
        "Her bölge yaklaşık 1,67 dekar ve 10 m³/saat ihtiyaç duyar; her bölge yaklaşık 70 dakika sulanır.",
        "Üç bölgenin toplam süresi yaklaşık 3,5 saattir ve günlük 35 m³ ihtiyaç bu sürede karşılanır."
      ],
      after: [
        "Pompanın kâğıt üzerindeki debisi, basma yüksekliğine ve boru kayıplarına bağlı olarak değişir; gerçek debiyi bir depoyu doldurma süresinden ölçmek pratik bir yoldur. Örneğin 1 m³'lük bir kap 6 dakikada doluyorsa debi 10 m³/saattir. Boru çapı ve akış hızından debi bulmak için [[arac:debi-hesapla|Debi Hesaplama aracı]], m³/saat ile litre/dakika arasında çeviri için [[arac:m3-saat-litre-dakika-cevir|m³/saat litre/dakika çevirici]] kullanılabilir: 10 m³/saat yaklaşık 166,7 L/dakikadır."
      ]
    },
    {
      h: "Salma sulamaya göre damla sulama ne kadar su tasarrufu sağlar?",
      p: [
        "Tasarruf, iki yöntemin randımanları karşılaştırılarak hesaplanabilir. Bitkinin ihtiyacı yöntemden bağımsız olarak aynıdır; değişen, bu ihtiyacı karşılamak için kaynaktan çekilmesi gereken su miktarıdır. Yüzey (salma, karık) sulamada randıman genellikle damla sulamadan çok daha düşük kabul edilir."
      ],
      table: {
        head: ["Yöntem", "Örnek randıman", "6,3 mm net için brüt su", "Dekara günlük su"],
        rows: [
          ["Damla sulama", "%90", "7,0 mm", "7,0 m³"],
          ["Yağmurlama", "%75", "8,4 mm", "8,4 m³"],
          ["Karık sulama", "%60", "10,5 mm", "10,5 m³"],
          ["Salma sulama", "%50", "12,6 mm", "12,6 m³"]
        ],
        caption: "Randımanlar planlama için örnek değerlerdir; gerçek randıman arazinin eğimine, toprağa ve işletmeye göre değişir."
      },
      after: [
        "Bu örnekte damla sulama, salma sulamaya göre aynı bitki ihtiyacını (12,6 − 7,0) ÷ 12,6 ≈ %44 daha az suyla karşılar. Tasarruf, suyun pahalı ya da kısıtlı olduğu yerlerde ve pompa enerjisi maliyetinde doğrudan hissedilir."
      ]
    },
    {
      h: "Sulama deposu kaç ton olmalı?",
      p: [
        "Depo büyüklüğü, deponun hangi amaçla kullanılacağına bağlıdır. Kuyunun ya da şebekenin debisi gün içinde düşükse, depo gece boyunca doldurulup gündüz sulamada kullanılır. Bu durumda depo en az bir sulama gününün ihtiyacını karşılamalıdır. Örnekteki 5 dekarlık arazi için bu en az 35 m³ yani yaklaşık 35 ton demektir."
      ],
      ul: [
        "<strong>Günlük ihtiyaç:</strong> alan (dekar) × brüt su (mm) = m³.",
        "<strong>Sulama aralığı:</strong> İki günde bir sulama yapılıyorsa depo iki günlük ihtiyacı alacak kadar büyük olmalıdır.",
        "<strong>Dolum süresi:</strong> Depo hacmi ÷ kaynak debisi; 35 m³ depo 5 m³/saatlik bir kaynakla 7 saatte dolar.",
        "<strong>Güvenlik payı:</strong> En sıcak dönemdeki en yüksek ihtiyaca göre %10–20 pay bırakmak sürprizleri azaltır."
      ],
      after: [
        "Depo ölçülerinden kaç ton su aldığını ve kaç gün yeteceğini [[arac:su-deposu-hacmi-hesapla|Su Deposu Hacmi Hesaplama aracı]] hesaplar. Depo hacmiyle ilgili ayrıntılı örnekler için [[bilgi:su-deposu-kac-litre-havuz-kac-ton|su deposu kaç litre]] yazısına, yağmur suyunu sulamada kullanmak için [[bilgi:yagmur-suyu-toplama-hesabi|yağmur suyu toplama hesabı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Bütün yıl aynı miktarı vermek:</strong> Su ihtiyacı aydan aya ve bitkinin gelişme dönemine göre birkaç kat değişebilir.",
        "<strong>Randımanı unutmak:</strong> Net ihtiyaç kadar su vermek, kayıplar nedeniyle bitkiyi susuz bırakabilir.",
        "<strong>Pompa kapasitesini aşmak:</strong> Tüm vanaları birlikte açmak basıncı düşürür, hat sonundaki bitkiler su alamaz.",
        "<strong>Filtre bakımını ihmal etmek:</strong> Tıkanan damlatıcılar debiyi düşürür; hesaplanan süre yetmez hâle gelir.",
        "<strong>Yağışı hesaba katmamak:</strong> Etkili yağış miktarı, o dönemdeki sulama ihtiyacından düşülebilir.",
        "<strong>Toprağa bakmamak:</strong> Hesap bir başlangıçtır; kök bölgesindeki nemi el ya da nem ölçerle kontrol etmek en doğru geri bildirimi verir."
      ],
      note: "Bu sayfadaki değerler örnek ve planlama amaçlıdır. Ürününüze, toprağınıza ve bölgenize uygun sulama programı için il ya da ilçe tarım ve orman müdürlüğüne, ilgili araştırma enstitülerine ya da tarım danışmanınıza başvurun."
    }
  ],
  faq: [
    ["Damla sulamada dekara ne kadar su verilir?", "Bitkinin günlük tüketimi milimetre olarak bulunur ve randımana bölünür; 1 mm su dekarda 1 m³ eder. Örneğin yaz ortasında günde 6,3 mm tüketen bir sebze için %90 randımanla dekara günde yaklaşık 7 ton su verilir. Değer bitki ve iklime göre değişir."],
    ["Sulama süresi nasıl hesaplanır?", "Önce damlatıcı sayısı ve debisinden sistemin saatte kaç milimetre su verdiği bulunur, sonra verilecek su bu değere bölünür. Metrekarede 3 damlatıcı ve 2 L/saat debiyle uygulama hızı 6 mm/saattir; 7 mm su yaklaşık 70 dakikada verilir."],
    ["Damlatıcı debisi (litre/saat) neyi belirler?", "Debi, bir damlatıcının saatte verdiği su miktarıdır ve damlatıcı aralığıyla birlikte sistemin uygulama hızını belirler. Yüksek debi süreyi kısaltır ama ağır topraklarda göllenmeye yol açabilir. Tarımsal sistemlerde 1–4 L/saat değerleri yaygındır."],
    ["Bitki su ihtiyacı nasıl bulunur?", "Referans buharlaşma-terleme değeri (ETo) bitki katsayısı (Kc) ile çarpılır. ETo iklim verilerinden, Kc bitkinin türüne ve gelişme dönemine göre belirlenir. Örneğin ETo 6 mm ve Kc 1,05 ise günlük tüketim 6,3 mm olur."],
    ["Salma sulamaya göre damla sulama ne kadar su tasarrufu sağlar?", "Tasarruf randıman farkından hesaplanır. Örnek olarak damla sulamada %90, salma sulamada %50 randıman kabul edilirse aynı bitki ihtiyacı için damla sulama yaklaşık %44 daha az su kullanır. Gerçek fark arazi ve işletmeye göre değişir."],
    ["Kuyu pompası debisi yeterli mi nasıl anlaşılır?", "Bir seferde sulanacak alanın toplam damlatıcı debisi pompa debisiyle karşılaştırılır. Örneğin 5 dekarın toplam ihtiyacı 30 m³/saat, pompa 10 m³/saat ise arazi üç bölgeye ayrılıp sırayla sulanmalıdır. Pompanın gerçek debisi depo doldurma süresinden ölçülebilir."],
    ["Sulama deposu kaç ton olmalı?", "Depo en az bir sulama döngüsünün ihtiyacını karşılamalıdır. 5 dekar ve günde 7 mm su için günlük ihtiyaç 35 m³ yani yaklaşık 35 tondur. İki günde bir sulama yapılıyorsa ya da kaynak debisi düşükse depo daha büyük seçilmelidir."],
    ["m³/saat litre/dakikaya nasıl çevrilir?", "1 m³ 1.000 litre, 1 saat 60 dakika olduğu için m³/saat değeri 1.000 ile çarpılıp 60'a bölünür. 10 m³/saat yaklaşık 166,7 litre/dakika, 6 m³/saat ise 100 litre/dakika eder."],
    ["Damla sulamada her gün mü sulamak gerekir?", "Sulama aralığı toprağın su tutma kapasitesine, kök derinliğine ve havaya bağlıdır. Kumlu topraklarda daha sık ve kısa, killi topraklarda daha seyrek ve uzun sulama yapılır. Günlük ihtiyaç aynı kalır; aralık uzadıkça her sulamada verilecek miktar artar."]
  ],
  tools: ["sulama-suyu-hesapla", "debi-hesapla", "m3-saat-litre-dakika-cevir", "su-deposu-hacmi-hesapla"],
  related: ["yagmur-suyu-toplama-hesabi", "su-deposu-kac-litre-havuz-kac-ton", "1-donum-kac-metrekare", "dekara-kac-fidan-dikilir"],
  sources: [
    ["T.C. Tarım ve Orman Bakanlığı", "https://www.tarimorman.gov.tr/"],
    ["Meteoroloji Genel Müdürlüğü – Tarımsal meteoroloji", "https://www.mgm.gov.tr/"]
  ],
  uyari: "değerler örnek ve planlama amaçlıdır; ürününüz için tarım müdürlüğünün önerilerini esas alın"
};
