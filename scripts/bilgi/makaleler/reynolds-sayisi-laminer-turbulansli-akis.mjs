export default {
  slug: "reynolds-sayisi-laminer-turbulansli-akis",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Reynolds Sayısı Nedir? Laminer ve Türbülanslı Akış Nasıl Ayırt Edilir",
  pageTitle: "Reynolds Sayısı Nedir? Laminer ve Türbülanslı Akış Formülü",
  description: "Reynolds sayısı Re = ρVD/μ = VD/ν formülüyle bulunur. Boruda 2300 altı laminer, 4000 üstü türbülanslı. Viskozite farkı, debiden hız ve çözümlü örnekler.",
  keywords: ["reynolds sayısı", "laminer akış", "türbülanslı akış", "reynolds sayısı formülü", "kinematik viskozite", "boruda akış rejimi", "2300 reynolds", "boyutsuz sayı"],
  lead: "Reynolds sayısı, bir akışkandaki eylemsizlik kuvvetlerinin viskoz (sürtünme) kuvvetlere oranını gösteren boyutsuz bir sayıdır ve <strong>Re = ρ·V·D / μ = V·D / ν</strong> formülüyle hesaplanır. Dairesel borularda Re yaklaşık 2.300'ün altındaysa akış laminer (düzenli katmanlar hâlinde), 4.000'in üstündeyse türbülanslı (girdaplı), arada ise geçiş bölgesindedir. 20 mm iç çaplı bir borudan saniyede 0,5 litre 20 °C su geçtiğinde Re yaklaşık 31.700'dür ve akış türbülanslıdır. Bu sayfada formülü, viskozite türlerini ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Reynolds sayısı: Re = ρ·V·D / μ; ρ yoğunluk (kg/m³), V ortalama hız (m/s), D boru iç çapı (m), μ dinamik viskozite (Pa·s).",
    "Kinematik viskoziteyle kısa yazım: Re = V·D / ν; ν = μ / ρ (m²/s). 20 °C su için ν ≈ 1,004 × 10⁻⁶ m²/s.",
    "Dairesel boruda: Re < 2.300 laminer, 2.300–4.000 geçiş, Re > 4.000 türbülanslı (pratik eşikler).",
    "Debiden hız: V = Q / A = 4Q / (π·D²); 0,5 L/s debi 20 mm boruda 1,59 m/s eder.",
    "Örnek: 1,59 m/s × 0,02 m ÷ 1,004 × 10⁻⁶ m²/s ≈ 31.700 → türbülanslı.",
    "Re boyutsuzdur: birimler birbirini götürür, bu yüzden farklı ölçekteki akışları karşılaştırmaya yarar."
  ],
  figure: {
    alt: "Reynolds sayısı ekseninde laminer (2300 altı), geçiş (2300–4000) ve türbülanslı (4000 üstü) bölgeler; borudaki düz akış çizgileri ile girdaplı akış çizgilerinin karşılaştırması ve 31.700 örnek değeri.",
    caption: "Aynı borudaki akış, hız arttıkça ya da viskozite azaldıkça laminerden türbülanslıya geçer. Örnekteki su akışı (Re ≈ 31.700) türbülanslı bölgenin içindedir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Reynolds sayısına göre akış rejimi</text>
  <rect x="40" y="56" width="640" height="96" rx="10" class="sf sb"/>
  <text x="56" y="80" class="b ok">Laminer</text>
  <line x1="56" y1="96" x2="330" y2="96" class="sok sw" fill="none"/>
  <line x1="56" y1="112" x2="330" y2="112" class="sok sw" fill="none"/>
  <line x1="56" y1="128" x2="330" y2="128" class="sok sw" fill="none"/>
  <text x="390" y="80" class="b dg">Türbülanslı</text>
  <path d="M390,100 C420,84 440,120 470,100 S520,82 550,104 S610,124 660,96" class="sdg sw" fill="none"/>
  <path d="M390,124 C415,140 445,108 475,126 S530,144 560,120 S620,104 660,130" class="sdg sw" fill="none"/>
  <circle cx="505" cy="112" r="9" class="sdg" fill="none"/><circle cx="600" cy="112" r="7" class="sdg" fill="none"/>
  <rect x="40" y="186" width="230" height="40" class="oks"/>
  <rect x="270" y="186" width="130" height="40" class="ps"/>
  <rect x="400" y="186" width="280" height="40" class="dgs"/>
  <text x="155" y="211" class="b mid">Re &lt; 2.300</text>
  <text x="335" y="211" class="b mid">2.300–4.000</text>
  <text x="540" y="211" class="b mid">Re &gt; 4.000</text>
  <text x="155" y="246" class="sm mid">düzenli katmanlar</text>
  <text x="335" y="246" class="sm mid">kararsız geçiş</text>
  <text x="540" y="246" class="sm mid">girdaplı, karışan akış</text>
  <polygon points="640,180 650,166 630,166" class="p"/>
  <text x="640" y="160" class="sm mid b p">31.700</text>
  <rect x="40" y="272" width="640" height="112" rx="10" class="sf sb"/>
  <rect x="40" y="272" width="8" height="112" class="p"/>
  <text x="64" y="298" class="b">Örnek: 20 mm boru, 0,5 L/s su (20 °C)</text>
  <text x="64" y="322" class="sm">V = 4Q / (πD²) = 4 × 0,0005 ÷ (π × 0,02²) = 1,59 m/s</text>
  <text x="64" y="344" class="sm">Re = V·D / ν = 1,59 × 0,02 ÷ 1,004 × 10⁻⁶ ≈ 31.700 → türbülanslı</text>
  <text x="64" y="366" class="sm t2">Laminer kalmak için hız 0,115 m/s'nin, debi 2,2 L/dk'nın altında olmalı.</text>
</svg>`
  },
  sections: [
    {
      h: "Reynolds sayısı nedir?",
      p: [
        "Reynolds sayısı, 19. yüzyılda borularda akışı deneylerle inceleyen mühendis Osborne Reynolds'un adını taşır. Reynolds, cam bir borudan akan suya ince bir boya çizgisi bırakmış; düşük hızlarda çizginin düz kaldığını, hız arttıkça önce dalgalanıp sonra tüm boruya dağıldığını gözlemlemiştir. Bu geçişin hız, boru çapı ve akışkanın özelliklerinin belirli bir birleşimine bağlı olduğunu göstermiştir.",
        "Sayı, akışkanın iki eğilimini karşılaştırır. <strong>Eylemsizlik kuvvetleri</strong> akışkanın hareketini sürdürme, düzensizlikleri büyütme eğilimidir. <strong>Viskoz kuvvetler</strong> ise akışkanın iç sürtünmesidir ve düzensizlikleri sönümler. Viskoz kuvvetler baskınsa (düşük Re) akış düzenli katmanlar hâlinde ilerler; eylemsizlik baskınsa (yüksek Re) küçük bozulmalar büyür ve akış girdaplı hâle gelir.",
        "Reynolds sayısı boru akışının yanı sıra uçak kanadı, gemi gövdesi, rüzgârda bir bina, kandaki küçük bir parçacık ya da bir yüzücünün çevresindeki akış için de kullanılır; yalnızca \"karakteristik uzunluk\" olarak alınan ölçü değişir."
      ]
    },
    {
      h: "Reynolds sayısı formülü nasıl uygulanır?",
      formula: "Re = ρ · V · D / μ = V · D / ν\nρ: akışkan yoğunluğu (kg/m³)\nV: ortalama akış hızı (m/s)\nD: karakteristik uzunluk; dairesel boruda iç çap (m)\nμ: dinamik viskozite (Pa·s = kg/(m·s))\nν = μ / ρ: kinematik viskozite (m²/s)",
      p: [
        "Formülün iki yazımı aynı sonucu verir; hangisini kullanacağınız elinizdeki veriye bağlıdır. Tablolarda çoğu zaman sıvılar için dinamik viskozite μ, bazı mühendislik kaynaklarında ise doğrudan kinematik viskozite ν verilir. Hesaba başlamadan önce tüm değerleri SI birimlerine çevirmek hataların çoğunu önler: milimetre metreye, santipuaz (cP) Pa·s'ye (1 cP = 0,001 Pa·s), santistokes (cSt) m²/s'ye (1 cSt = 10⁻⁶ m²/s) çevrilmelidir.",
        "Dairesel olmayan kesitlerde (kare kanal, havalandırma kanalı) D yerine <strong>hidrolik çap</strong> kullanılır: D<sub>h</sub> = 4 × kesit alanı ÷ ıslak çevre. Tam dolu dairesel boruda bu değer iç çapa eşittir."
      ]
    },
    {
      h: "Debi ve boru çapından akış hızı nasıl bulunur?",
      p: [
        "Uygulamada hız çoğu zaman doğrudan bilinmez; elinizde pompanın debisi (m³/saat ya da litre/dakika) ve borunun iç çapı vardır. Ortalama hız, debinin boru kesit alanına bölünmesiyle bulunur."
      ],
      formula: "A = π · D² / 4\nV = Q / A = 4 · Q / (π · D²)",
      ol: [
        "Debi: 0,5 L/s = 0,0005 m³/s (bu, 30 L/dk ya da 1,8 m³/saat eder).",
        "Boru iç çapı: 20 mm = 0,02 m. Kesit alanı A = π × 0,02² ÷ 4 = 3,1416 × 10⁻⁴ m².",
        "Hız: V = 0,0005 ÷ 3,1416 × 10⁻⁴ ≈ 1,592 m/s.",
        "Su 20 °C, ν = 1,004 × 10⁻⁶ m²/s: Re = 1,592 × 0,02 ÷ 1,004 × 10⁻⁶ ≈ <strong>31.700</strong>.",
        "Aynı sonucu yoğunluk ve dinamik viskoziteyle bulmak için: Re = 998,2 × 1,592 × 0,02 ÷ 1,002 × 10⁻³ ≈ 31.700. Akış türbülanslıdır."
      ],
      after: [
        "Debi birimleri arasında geçiş için [[arac:m3-saat-litre-dakika-cevir|Debi Çevirici]] aracını, Reynolds sayısını ve akış rejimini doğrudan bulmak için [[arac:reynolds-sayisi-hesapla|Reynolds Sayısı Hesaplama]] aracını kullanabilirsiniz. Araç ayrıca aynı boruda laminer akışın korunabileceği en yüksek hızı da gösterir."
      ]
    },
    {
      h: "Laminer ve türbülanslı akış farkı nedir?",
      table: {
        head: ["Özellik", "Laminer akış", "Türbülanslı akış"],
        rows: [
          ["Görünüm", "Paralel, düzenli katmanlar", "Girdaplı, düzensiz, karışan"],
          ["Hız profili", "Parabolik; merkezde ortalamanın 2 katı", "Daha düz; duvara yakın keskin düşüş"],
          ["Karışma", "Yalnızca moleküler difüzyonla, yavaş", "Hızlı ve etkin"],
          ["Isı transferi", "Düşük", "Yüksek"],
          ["Basınç kaybı", "Hızla doğru orantılı", "Hızın yaklaşık karesiyle artar"],
          ["Sürtünme faktörü (boru)", "f = 64 / Re", "Re'ye ve pürüzlülüğe bağlı (Moody diyagramı)"],
          ["Günlük örnek", "Bal ya da koyu yağın yavaşça akması", "Musluktan açık akan su, baca dumanı"]
        ]
      },
      after: [
        "Laminer akışta basınç kaybı Hagen-Poiseuille bağıntısıyla tam olarak hesaplanabilir; türbülanslı akışta ise deneysel bağıntılar ve pürüzlülük değerleri gerekir. Isı değiştiricilerde türbülans istenir, çünkü ısı aktarımını artırır; ince kanallı sağlık ve laboratuvar cihazlarında ise öngörülebilir olduğu için laminer akış tercih edilir."
      ]
    },
    {
      h: "Boruda geçiş Reynolds sayısı neden yaklaşık 2.300'dür?",
      p: [
        "2.300 değeri bir doğa sabiti değil, deneylerle belirlenmiş pratik bir eşiktir. Çok pürüzsüz, titreşimsiz ve girişi dikkatle düzenlenmiş borularda laminer akış Re = 10.000'in üzerinde bile korunabilmiştir. Gerçek tesislerde ise boru girişindeki bozulmalar, dirsekler, vanalar ve pompa titreşimi akışı daha erken türbülansa iter.",
        "Bu yüzden mühendislikte güvenli tarafta kalmak için genellikle şu sınıflama kullanılır: Re < 2.300 kesin laminer, Re > 4.000 kesin türbülanslı, aradaki bölge ise akışın zaman zaman türbülans patlamaları gösterdiği kararsız geçiş bölgesidir. Bazı kaynaklar alt sınırı 2.000, üst sınırı 4.000 ya da 10.000 olarak verir; hangi sınırın kullanıldığını raporda belirtmek iyi bir uygulamadır.",
        "Eşik geometriye de bağlıdır. Düz bir levha üzerindeki akışta geçiş, levha boyunca alınan uzunlukla hesaplanan Re ≈ 5 × 10⁵ civarında başlar; bu değer boru akışındaki 2.300 ile doğrudan karşılaştırılamaz."
      ]
    },
    {
      h: "Dinamik ve kinematik viskozite farkı nedir?",
      p: [
        "<strong>Dinamik viskozite (μ)</strong>, akışkanın kaymaya karşı gösterdiği iç dirençtir; birimi Pa·s'dir. Kalın bir sıvıyı karıştırırken hissettiğiniz direnç budur. <strong>Kinematik viskozite (ν)</strong> ise dinamik viskozitenin yoğunluğa bölümüdür ve birimi m²/s'dir. Akışkanın hareketine ne kadar \"ağırlığıyla\" eşlik ettiğini de hesaba katar.",
        "İki değer arasındaki fark gazlarda belirgindir. Havanın dinamik viskozitesi sudan yaklaşık 55 kat küçüktür, ama yoğunluğu da yaklaşık 830 kat küçük olduğu için kinematik viskozitesi (yaklaşık 1,5 × 10⁻⁵ m²/s) sudan yaklaşık 15 kat büyüktür. Yoğunluk kavramı için [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk yazısına]] bakabilirsiniz."
      ],
      table: {
        head: ["Akışkan (yaklaşık)", "Sıcaklık", "Kinematik viskozite ν (m²/s)", "20 mm boruda 1,59 m/s'de Re"],
        rows: [
          ["Su", "0 °C", "1,787 × 10⁻⁶", "yaklaşık 17.800"],
          ["Su", "20 °C", "1,004 × 10⁻⁶", "yaklaşık 31.700"],
          ["Su", "50 °C", "0,553 × 10⁻⁶", "yaklaşık 57.600"],
          ["Hava", "20 °C", "yaklaşık 1,5 × 10⁻⁵", "yaklaşık 2.100"],
          ["Koyu bir yağ (örnek)", "20 °C", "yaklaşık 1 × 10⁻⁴", "yaklaşık 320"]
        ],
        caption: "Sıvılarda viskozite sıcaklık arttıkça düşer, gazlarda artar. Yağ değeri yağın türüne göre çok değişir; kendi akışkanınızın teknik föyündeki değeri kullanın."
      },
      after: [
        "Tablo, sıcaklığın akış rejimini ne kadar etkilediğini gösterir: aynı borudaki aynı hızlı su, 0 °C'tan 50 °C'a ısındığında Reynolds sayısı üç kattan fazla artar. Sıcak su hatlarının soğuk su hatlarından daha kolay türbülansa geçmesinin nedeni budur."
      ]
    },
    {
      h: "Reynolds sayısı günlük hayatta nerede karşımıza çıkar?",
      ul: [
        "<strong>Tesisat ve pompa seçimi:</strong> Basınç kaybı ve pompa basma yüksekliği, akış rejimine göre farklı formüllerle hesaplanır.",
        "<strong>Havalandırma kanalları:</strong> 20 cm çaplı bir kanalda 3 m/s hızla akan hava için Re = 3 × 0,2 ÷ 1,5 × 10⁻⁵ = 40.000'dir; kanal akışları neredeyse her zaman türbülanslıdır.",
        "<strong>Bal ve şurup:</strong> Çok yüksek viskoziteleri nedeniyle dökülürken Re çok küçüktür ve akış pürüzsüz bir şerit hâlinde kalır.",
        "<strong>Spor ve araçlar:</strong> Topun, bisikletçinin ya da aracın etrafındaki akışın Re değeri, sürüklemenin nasıl değiştiğini belirler; bazı toplardaki yüzey desenleri geçişi bilerek erken başlatır.",
        "<strong>Ölçekli model deneyleri:</strong> Rüzgâr tünelinde küçük bir model, gerçeğiyle aynı Reynolds sayısında test edildiğinde benzer akış davranışı gösterir."
      ],
      after: [
        "Akış hızını yol ve süreden hesaplamak için [[arac:hiz-hesapla|Hız, Yol ve Süre Hesaplama]] aracı da işinizi görebilir. Akışkanlardaki kuvvetlerle ilgili temel kavramlar [[bilgi:basinc-nedir-nasil-hesaplanir|basınç yazısında]] ve [[bilgi:kaldirma-kuvveti-arsimet-prensibi|kaldırma kuvveti yazısında]] anlatılır."
      ]
    },
    {
      h: "Boyutsuz sayı ne demektir?",
      p: [
        "Boyutsuz sayı, birimleri birbirini tamamen götüren bir orandır. Reynolds formülünde birimleri yazarsanız (kg/m³) × (m/s) × (m) ÷ (kg/(m·s)) = 1 bulunur; sonuçta metre, saniye ya da kilogram kalmaz. Bu sayede sonuç, hangi birim sistemini kullandığınızdan bağımsızdır: değerleri doğru dönüştürdüğünüz sürece Re aynı çıkar.",
        "Boyutsuz sayıların gücü, farklı ölçekteki sistemleri karşılaştırabilmesidir. 2 cm'lik bir su borusu ile 2 metrelik bir petrol boru hattı, Reynolds sayıları eşitse benzer akış rejimine sahiptir. Akışkanlar mekaniğinde Froude, Mach ve Prandtl gibi başka boyutsuz sayılar da kullanılır. Birim önekleri ve 10'un kuvvetleriyle yazım için [[bilgi:si-onekleri-mili-mikro-kilo-mega|SI önekleri yazısına]] bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Reynolds sayısı nedir?", "Reynolds sayısı, akışkandaki eylemsizlik kuvvetlerinin viskoz kuvvetlere oranını gösteren boyutsuz bir sayıdır. Değeri düşükse akış düzenli katmanlar hâlinde laminer, yüksekse girdaplı ve türbülanslıdır; boru, kanal ve dış akışların sınıflandırılmasında kullanılır."],
    ["Reynolds sayısı formülü nasıl uygulanır?", "Re = ρ·V·D / μ ya da Re = V·D / ν formülü kullanılır. Yoğunluk kg/m³, hız m/s, çap m, dinamik viskozite Pa·s, kinematik viskozite m²/s olarak SI birimlerine çevrilip yerine konur; sonuç birimsiz bir sayıdır."],
    ["Laminer ve türbülanslı akış farkı nedir?", "Laminer akışta akışkan paralel katmanlar hâlinde, karışmadan ilerler ve basınç kaybı hızla doğru orantılıdır. Türbülanslı akışta girdaplar oluşur, karışma ve ısı aktarımı artar, basınç kaybı hızın yaklaşık karesiyle büyür."],
    ["Boruda geçiş Reynolds sayısı neden yaklaşık 2300'dür?", "Bu değer deneylerle belirlenmiş pratik bir eşiktir. Gerçek borulardaki giriş bozulmaları, dirsekler ve titreşimler akışı 2.300 civarında kararsızlaştırır. Çok düzgün laboratuvar borularında laminer akış daha yüksek değerlerde de korunabilir."],
    ["Dinamik ve kinematik viskozite farkı nedir?", "Dinamik viskozite akışkanın kaymaya karşı iç direncidir ve Pa·s ile ölçülür. Kinematik viskozite bunun yoğunluğa bölümüdür ve m²/s ile ölçülür. 20 °C su için dinamik viskozite 1,002 × 10⁻³ Pa·s, kinematik viskozite 1,004 × 10⁻⁶ m²/s'dir."],
    ["Debi ve boru çapından akış hızı nasıl bulunur?", "Hız, debinin boru kesit alanına bölünmesiyle bulunur: V = 4Q / (π·D²). 0,5 L/s yani 0,0005 m³/s debi, 20 mm iç çaplı boruda 0,0005 ÷ 3,1416 × 10⁻⁴ ≈ 1,59 m/s hız verir."],
    ["Reynolds sayısı günlük hayatta nerede karşımıza çıkar?", "Tesisat ve pompa hesaplarında, havalandırma kanallarında, araç ve top aerodinamiğinde, balın akışında ve rüzgâr tüneli model deneylerinde karşımıza çıkar. Musluktan yavaş akan suyun düz, hızlı akanın dağınık görünmesi de bu geçişin örneğidir."],
    ["Boyutsuz sayı ne demektir?", "Boyutsuz sayı, birimleri birbirini götüren bir orandır; Reynolds formülünde kilogram, metre ve saniye sadeleşir. Sonuç birim sisteminden bağımsız olduğu için farklı ölçekteki ve farklı akışkanlı sistemleri doğrudan karşılaştırmaya yarar."],
    ["Su ısınınca Reynolds sayısı neden artar?", "Suyun viskozitesi sıcaklık arttıkça düşer; 20 °C'ta 1,004 × 10⁻⁶ m²/s olan kinematik viskozite 50 °C'ta yaklaşık 0,553 × 10⁻⁶ m²/s'ye iner. Payda küçüldüğü için aynı hız ve çapta Reynolds sayısı yaklaşık 1,8 kat artar."]
  ],
  tools: ["reynolds-sayisi-hesapla", "m3-saat-litre-dakika-cevir", "hiz-hesapla"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "basinc-nedir-nasil-hesaplanir"],
  sources: [
    ["NIST – Termofiziksel özellikler veri tabanı", "https://webbook.nist.gov/chemistry/fluid/"]
  ]
};
