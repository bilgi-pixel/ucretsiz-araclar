export default {
  slug: "basit-makineler-kaldirac-makara",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Basit Makineler Nedir? Kaldıraç, Makara, Eğik Düzlem ve Kuvvet Kazancı",
  pageTitle: "Basit Makineler: Kaldıraç, Makara, Eğik Düzlem, Kuvvet Kazancı",
  description: "Basit makineler kuvvetin yönünü ya da büyüklüğünü değiştirir. Kaldıraç, sabit ve hareketli makara, eğik düzlem, çıkrık formülleri, kuvvet kazancı ve verim örnekleri.",
  keywords: ["basit makineler", "kaldıraç nedir", "kuvvet kazancı nasıl hesaplanır", "eğik düzlem", "makara çeşitleri", "basit makine örnekleri", "sabit ve hareketli makara", "verim nasıl hesaplanır"],
  lead: "Basit makineler, <strong>bir işi daha az kuvvetle ya da daha uygun yönde kuvvet uygulayarak yapmamızı sağlayan</strong> kaldıraç, makara, eğik düzlem, çıkrık, vida, kasnak ve dişli çark gibi düzeneklerdir. Kuvvet kazancı, yükün uygulanan kuvvete bölünmesiyle bulunur. Kuvvet kolu 1,5 m, yük kolu 0,5 m olan bir kaldıraçla 600 N'luk yük 200 N kuvvetle kaldırılır; kuvvet kazancı 3'tür. Ancak hiçbir basit makine işten kazanç sağlamaz: kuvvetten kazanılan, yoldan kaybedilir. Bu yazıda 8. sınıf LGS düzeyinde formülleri ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Kuvvet kazancı = yük ÷ uygulanan kuvvet; 1'den büyükse kuvvetten kazanç vardır.",
    "Kaldıraç denge şartı: kuvvet × kuvvet kolu = yük × yük kolu (F · a = G · b).",
    "Sabit makara kuvvetin yönünü değiştirir, kuvvet kazancı 1'dir; hareketli makarada F = G ÷ 2'dir (makara ağırlığı ihmal edilirse).",
    "Eğik düzlemde F · L = G · h; rampa uzadıkça gereken kuvvet azalır.",
    "Basit makineler işten kazanç sağlamaz: kuvvetten kazanılan oranda yoldan kaybedilir.",
    "Verim (%) = yararlı iş ÷ harcanan iş × 100; sürtünme nedeniyle gerçek makinelerde %100'den küçüktür."
  ],
  figure: {
    alt: "Kaldıraç örneği: destek noktasının bir yanında 0,5 metre uzaklıkta 600 N yük, diğer yanında 1,5 metre uzaklıkta 200 N kuvvet; kuvvet kazancı 3. Altında eğik düzlem: 1.000 N yük 4 metre rampa ile 1 metre yükseğe 250 N kuvvetle çıkarılıyor, kuvvet kazancı 4.",
    caption: "Üstte destek ortada kaldıraç, altta eğik düzlem. İkisinde de kuvvetten kazanılır ama kuvvetin uygulandığı yol uzar; yapılan iş (sürtünmesiz) değişmez.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Kaldıraç: F · a = G · b</text>
  <line x1="80" y1="130" x2="640" y2="130" class="st sw" fill="none"/>
  <polygon points="220,132 200,172 240,172" class="p"/>
  <rect x="70" y="84" width="60" height="44" rx="4" class="ps"/>
  <text x="100" y="112" class="b mid">600 N</text>
  <line x1="630" y1="70" x2="630" y2="124" class="sdg sw" fill="none"/>
  <polygon points="630,128 622,112 638,112" class="dg"/>
  <text x="630" y="62" class="b mid dg">F = 200 N</text>
  <line x1="100" y1="190" x2="220" y2="190" class="sp" fill="none"/>
  <text x="160" y="210" class="sm mid">b = 0,5 m (yük kolu)</text>
  <line x1="220" y1="190" x2="630" y2="190" class="sa" fill="none"/>
  <text x="425" y="210" class="sm mid">a = 1,5 m (kuvvet kolu)</text>
  <rect x="440" y="74" width="150" height="40" rx="8" class="oks"/>
  <text x="515" y="99" class="b mid">Kazanç = 3</text>
  <text x="360" y="252" class="b mid">Eğik düzlem: F · L = G · h</text>
  <polygon points="120,400 520,400 520,300" class="ps"/>
  <line x1="120" y1="400" x2="520" y2="300" class="sp sw" fill="none"/>
  <rect x="300" y="322" width="44" height="34" rx="4" class="p"/>
  <text x="322" y="344" class="sm mid sf b">G</text>
  <text x="300" y="312" class="sm end">L = 4 m</text>
  <text x="530" y="356" class="sm">h = 1 m</text>
  <text x="322" y="424" class="sm mid t2">G = 1.000 N</text>
  <rect x="560" y="290" width="140" height="96" rx="10" class="sf sb"/>
  <text x="630" y="316" class="sm mid t2">Gereken kuvvet</text>
  <text x="630" y="344" class="b lg mid">250 N</text>
  <text x="630" y="370" class="sm mid">kazanç 4</text>
</svg>`
  },
  sections: [
    {
      h: "Basit makineler nedir, ne işe yarar?",
      p: [
        "Basit makineler, az sayıda parçadan oluşan ve bir kuvvetin büyüklüğünü, yönünü ya da uygulandığı noktayı değiştirerek işimizi kolaylaştıran araçlardır. Bir kapağı tornavidayla açmak, kuyudan çıkrıkla su çekmek, bayrağı direğe makarayla çekmek ya da ağır bir yükü rampadan yukarı itmek basit makine kullanmaktır.",
        "Basit makinelerin sağlayabileceği yararlar üç başlıkta toplanır: <strong>kuvvetten kazanç</strong> (daha az kuvvetle aynı yükü taşımak), <strong>yön değiştirme</strong> (aşağı çekerek yukarı kaldırmak) ve <strong>yoldan ya da hızdan kazanç</strong> (küçük bir hareketi büyütmek, örneğin bisiklet pedalı). Bir makine bunlardan birini ya da birkaçını sağlayabilir.",
        "Konu Türkiye'de 8. sınıf fen bilimleri dersinin \"Basit Makineler\" ünitesinde işlenir ve LGS'de soru çıkan konular arasındadır. Burada kullanılan formüllerde sürtünme ve makara ağırlıkları aksi belirtilmedikçe ihmal edilir."
      ]
    },
    {
      h: "Kuvvet kazancı ve iş ilkesi",
      formula: "Kuvvet kazancı = Yük (G) ÷ Uygulanan kuvvet (F)\nİş = Kuvvet × Yol;   sürtünmesiz makinede: F × (kuvvetin yolu) = G × (yükün yolu)",
      p: [
        "Kuvvet kazancı 1'den büyükse makine kuvvetten kazanç sağlar, 1'e eşitse yalnızca yön değiştirir, 1'den küçükse kuvvetten kaybettirip yoldan ya da hızdan kazandırır.",
        "Basit makinelerle ilgili en önemli kural <strong>işten kazanç olmamasıdır</strong>. Bir yükü 200 N yerine 100 N ile kaldırıyorsanız, kuvveti iki kat daha uzun bir yol boyunca uygulamanız gerekir. Fizikte iş kuvvet ile yolun çarpımı olduğundan yapılan iş aynı kalır; sürtünme varsa daha da artar. \"Kuvvetten kazanç, yoldan kayıp\" ifadesi bu ilkeyi özetler."
      ]
    },
    {
      h: "Kaldıraç nasıl çalışır?",
      p: [
        "Kaldıraç, bir destek noktası etrafında dönebilen sert bir çubuktur. Kuvvetin destek noktasına uzaklığına <strong>kuvvet kolu (a)</strong>, yükün destek noktasına uzaklığına <strong>yük kolu (b)</strong> denir. Kaldıraç dengedeyken kuvvetin döndürme etkisi yükünkine eşittir."
      ],
      formula: "F · a = G · b\nKuvvet kazancı = G ÷ F = a ÷ b",
      ol: [
        "Bir çubukla 600 N'luk taş kaldırılacak. Taş destekten 0,5 m, kuvvet destekten 1,5 m uzakta uygulanıyor.",
        "F × 1,5 = 600 × 0,5 → F = 300 ÷ 1,5 = 200 N.",
        "Kuvvet kazancı = 600 ÷ 200 = 3 (ya da 1,5 ÷ 0,5 = 3).",
        "Kuvvet kolu yük kolundan uzun olduğu sürece kuvvetten kazanç vardır; ancak eliniz taşın 3 katı kadar yol alır."
      ],
      table: {
        head: ["Kaldıraç türü", "Ortadaki", "Kuvvet kazancı", "Örnekler"],
        rows: [
          ["Destek ortada", "Destek noktası", "Kollara göre 1'den büyük, eşit ya da küçük", "Tahterevalli, makas, pense, eşit kollu terazi"],
          ["Yük ortada", "Yük", "Her zaman 1'den büyük", "El arabası, ceviz kıracağı, gazoz açacağı"],
          ["Kuvvet ortada", "Uygulanan kuvvet", "Her zaman 1'den küçük", "Cımbız, maşa, olta, insan ön kolu"]
        ]
      },
      after: [
        "Kuvvet ortada olan kaldıraçlar kuvvetten kaybettirir ama yoldan ve hızdan kazandırır; olta ucunun hızlı ve geniş bir yay çizmesi bu yüzdendir. Kol uzunluklarından gereken kuvveti ya da kaldırılabilecek yükü bulmak için [[arac:kaldirac-hesapla|Kaldıraç Hesaplama]] aracını kullanabilirsiniz. Döndürme etkisi (tork) hakkında daha fazlası için [[arac:tork-hesapla|Tork Hesaplama]] aracına göz atabilirsiniz."
      ]
    },
    {
      h: "Sabit ve hareketli makara farkı",
      p: [
        "Makara, çevresinde ip geçen ve bir eksen etrafında dönen tekerlektir. <strong>Sabit makara</strong> tavana ya da bir direğe bağlıdır, yükle birlikte hareket etmez. Kuvvetten kazanç sağlamaz (F = G), yalnızca kuvvetin yönünü değiştirir: bayrağı yukarı çıkarmak için ipi aşağı çekeriz.",
        "<strong>Hareketli makara</strong> yüke bağlıdır ve yükle birlikte yükselir. Yük iki ip parçası tarafından taşındığı için her ipe yükün yarısı düşer: F = G ÷ 2 (makara ağırlığı ihmal edilirse). Ancak yükü 1 m yükseltmek için ipi 2 m çekmeniz gerekir.",
        "Sabit ve hareketli makaraların birleşimine <strong>palanga</strong> denir. Palangada kuvvet, yükü taşıyan ip sayısına bölünür: F = G ÷ n. Hareketli makara ağırlığı da hesaba katılırsa F = (G + makara ağırlığı) ÷ n olur."
      ],
      ul: [
        "<strong>Sabit makara:</strong> 400 N yük için 400 N kuvvet; ip 1 m çekilince yük 1 m yükselir.",
        "<strong>Hareketli makara:</strong> 400 N yük için 200 N kuvvet; ip 2 m çekilince yük 1 m yükselir.",
        "<strong>4 ipli palanga:</strong> 400 N yük için 100 N kuvvet; ip 4 m çekilince yük 1 m yükselir.",
        "<strong>Hareketli makara ağırlığı 20 N ise:</strong> F = (400 + 20) ÷ 2 = 210 N."
      ]
    },
    {
      h: "Eğik düzlem işten kazanç sağlar mı?",
      p: [
        "Eğik düzlem, bir yükü dikey yerine eğimli bir yüzey boyunca yükseltmeyi sağlayan basit makinedir. Rampa, merdiven, dağ yollarındaki virajlar ve vidanın dişleri eğik düzlem örnekleridir. Sürtünme ihmal edildiğinde yükü h yüksekliğine çıkarmak için yapılan iş, doğrudan kaldırmakla aynıdır; yalnızca kuvvet daha uzun bir yola yayılır."
      ],
      formula: "F · L = G · h\nKuvvet kazancı = G ÷ F = L ÷ h",
      after: [
        "Örnek: 1.000 N ağırlığındaki bir koli, 4 m uzunluğundaki rampa ile 1 m yüksekliğe çıkarılacak. F × 4 = 1.000 × 1 → F = 250 N; kuvvet kazancı 4'tür. Rampa 2 m olsaydı 500 N gerekirdi. Eğik düzlem işten kazanç sağlamaz: iki durumda da yapılan iş 1.000 J'dür (250 × 4 = 1.000 × 1). Sürtünmeli yüzeylerde ivme, normal kuvvet ve sürtünme kuvvetini hesaplamak için [[arac:egik-duzlem-hesapla|Eğik Düzlem Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çıkrık, vida, kasnak ve dişli çark",
      ul: [
        "<strong>Çıkrık (dolap beygiri):</strong> Büyük bir kol ya da tekerlek ile ona bağlı küçük bir silindirden oluşur. F · R = G · r. Kuyudan 200 N'luk kova çeken çıkrıkta silindir yarıçapı 10 cm, kol uzunluğu 40 cm ise F = 200 × 10 ÷ 40 = 50 N'dur. Kapı kolu, tornavida, direksiyon ve musluk başı çıkrık örnekleridir.",
        "<strong>Vida:</strong> Bir silindirin etrafına sarılmış eğik düzlemdir. Vida bir tam tur döndüğünde, iki diş arasındaki uzaklık (vida adımı) kadar ilerler. Adım ne kadar küçükse kuvvet kazancı o kadar büyüktür; kriko ve mengene bu ilkeyle çalışır.",
        "<strong>Kasnak:</strong> Kayış ya da zincirle birbirine bağlanan tekerleklerdir. Büyük kasnak az, küçük kasnak çok tur atar. Bisikletin zincir ve dişli sistemi tipik bir örnektir.",
        "<strong>Dişli çark:</strong> Birbirine geçen dişli tekerleklerdir; dişli sayıları ile tur sayıları ters orantılıdır. Birbirine değen iki dişli zıt yönde döner. Dişli sayısı ile tur sayısı ilişkisi [[bilgi:oran-oranti-nasil-cozulur|ters orantı]] konusunun güzel bir uygulamasıdır.",
        "<strong>Kama:</strong> İki eğik düzlemin birleşimidir; balta, bıçak ve keski kama örnekleridir."
      ]
    },
    {
      h: "Verim nasıl hesaplanır?",
      p: [
        "Gerçek makinelerde sürtünme, ip ve makara ağırlıkları nedeniyle harcanan işin bir kısmı ısıya ve gereksiz harekete dönüşür. Bu yüzden makineden alınan yararlı iş, makineye verilen işten her zaman küçüktür. Verim, harcanan işin ne kadarının işe yaradığını yüzde olarak gösterir."
      ],
      formula: "Verim (%) = Yararlı iş ÷ Harcanan iş × 100\nYararlı iş = G × h;   Harcanan iş = F × (kuvvetin yolu)",
      after: [
        "Örnek: Yukarıdaki rampada sürtünme nedeniyle 250 N yerine 300 N kuvvet gerekmiş olsun. Yararlı iş = 1.000 × 1 = 1.000 J, harcanan iş = 300 × 4 = 1.200 J. Verim = 1.000 ÷ 1.200 × 100 ≈ %83,3'tür. Kalan 200 J sürtünmeyle ısıya dönüşmüştür. Giriş ve çıkış enerjisinden ya da gücünden verimi bulmak için [[arac:verim-hesapla|Verim Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Günlük hayatta basit makine örnekleri ve sık yapılan hatalar",
      p: [
        "Evde ve okulda farkında olmadan pek çok basit makine kullanırız: makas ve pense (destek ortada kaldıraç), el arabası ve fındık kıracağı (yük ortada kaldıraç), cımbız ve zımba (kuvvet ortada kaldıraç), kapı kolu ve anahtar (çıkrık), bayrak direği (sabit makara), vinç (palanga), engelli rampası (eğik düzlem), kavanoz kapağı (vida) ve bisiklet (kasnak ile dişli). Vücudumuz da kaldıraçlarla doludur: dirsek ve önkol kuvvet ortada bir kaldıraç gibi çalışır."
      ],
      ul: [
        "<strong>İşten kazanç var sanmak:</strong> Hiçbir basit makine işten kazandırmaz; sürtünmeyle iş kaybı bile olur.",
        "<strong>Kol uzunluğunu yanlış ölçmek:</strong> Kollar destek noktasından kuvvetin ve yükün uygulandığı noktaya kadar ölçülür.",
        "<strong>Sabit makaradan kuvvet kazancı beklemek:</strong> Sabit makara yalnızca yön değiştirir.",
        "<strong>Palangada ip sayısını yanlış saymak:</strong> Yalnızca hareketli makarayı ve yükü taşıyan ipler sayılır; elinizle çektiğiniz ip aşağı yönlüyse sayılmaz.",
        "<strong>Eğik düzlemde L ile h'yi karıştırmak:</strong> L rampanın eğik uzunluğu, h ise dikey yüksekliktir."
      ]
    }
  ],
  faq: [
    ["Basit makineler nelerdir?", "Basit makineler kaldıraç, makara, eğik düzlem, çıkrık, vida, kama, kasnak ve dişli çarktır. Bunlar kuvvetin büyüklüğünü, yönünü ya da uygulandığı noktayı değiştirerek işimizi kolaylaştırır. Karmaşık makineler bu basit makinelerin bir araya gelmesiyle oluşur."],
    ["Kaldıraç nasıl çalışır?", "Kaldıraç, bir destek noktası etrafında dönebilen bir çubuktur. Dengede kuvvet ile kuvvet kolunun çarpımı, yük ile yük kolunun çarpımına eşittir. Kuvvet kolu yük kolundan uzunsa daha az kuvvetle daha ağır bir yük kaldırılır."],
    ["Kuvvet kazancı nasıl hesaplanır?", "Kuvvet kazancı, yükün uygulanan kuvvete bölünmesiyle hesaplanır. 600 N'luk yükü 200 N kuvvetle kaldıran bir kaldıracın kuvvet kazancı 3'tür. Kaldıraçta bu oran kuvvet kolunun yük koluna, eğik düzlemde rampa uzunluğunun yüksekliğe oranına eşittir."],
    ["Eğik düzlem işten kazanç sağlar mı?", "Hayır. Eğik düzlem kuvvetten kazanç sağlar ama kuvvet daha uzun bir yol boyunca uygulandığı için yapılan iş aynı kalır. 1.000 N'luk yük 4 m'lik rampayla 1 m yükseğe 250 N ile çıkarılır; iki durumda da iş 1.000 J'dür."],
    ["Sabit ve hareketli makara farkı nedir?", "Sabit makara bir yere bağlıdır ve yalnızca kuvvetin yönünü değiştirir, kuvvet kazancı 1'dir. Hareketli makara yükle birlikte hareket eder ve yük iki iple taşındığı için gereken kuvvet yarıya iner, ancak ip yükün iki katı kadar çekilir."],
    ["Günlük hayatta basit makine örnekleri nelerdir?", "Makas, pense ve tahterevalli kaldıraçtır; el arabası ve fındık kıracağı yük ortada kaldıraçtır; cımbız kuvvet ortada kaldıraçtır. Kapı kolu ve tornavida çıkrık, bayrak direği sabit makara, rampa eğik düzlem, bisiklet ise kasnak ve dişli örneğidir."],
    ["Çıkrık ve vida neden basit makinedir?", "Çıkrık, büyük bir kol ile küçük bir silindirin birlikte dönmesiyle küçük kuvveti büyütür; bir tür sürekli dönen kaldıraçtır. Vida ise silindir etrafına sarılmış bir eğik düzlemdir. İkisi de az sayıda parçadan oluşur ve kuvvetten kazanç sağlar."],
    ["Verim nasıl hesaplanır?", "Verim, yararlı işin harcanan işe bölünüp 100 ile çarpılmasıyla bulunur. 1.000 J yararlı iş için 1.200 J harcanmışsa verim yaklaşık yüzde 83,3'tür. Sürtünme ve makara ağırlıkları nedeniyle gerçek makinelerde verim her zaman yüzde 100'den küçüktür."],
    ["Basit makineler işten kazanç sağlar mı?", "Hayır, hiçbir basit makine işten kazanç sağlamaz. Kuvvetten kazanıldığı oranda yoldan kaybedilir; sürtünme varsa yapılan iş daha da artar. Basit makinelerin yararı, işi daha küçük kuvvetle, daha uygun yönde ya da daha hızlı yapabilmemizdir."]
  ],
  tools: ["kaldirac-hesapla", "egik-duzlem-hesapla", "tork-hesapla", "verim-hesapla"],
  related: ["kutle-ve-agirlik-farki", "basinc-nedir-nasil-hesaplanir", "oran-oranti-nasil-cozulur"],
  sources: [
    ["MEB – Fen Bilimleri Dersi Öğretim Programı (8. sınıf Basit Makineler)", "https://www.meb.gov.tr/"],
    ["MEB Ölçme, Değerlendirme ve Sınav Hizmetleri – LGS örnek sorular", "https://odsgm.meb.gov.tr/"]
  ]
};
