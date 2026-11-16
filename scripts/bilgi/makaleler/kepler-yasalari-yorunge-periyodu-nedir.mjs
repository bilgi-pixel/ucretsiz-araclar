export default {
  slug: "kepler-yasalari-yorunge-periyodu-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Kepler Yasaları Nedir? Yörünge Periyodu ve Gezegenlerin Bir Yılı",
  pageTitle: "Kepler Yasaları ve Yörünge Periyodu: T² = a³ ile Hesap",
  description: "Kepler'in üç yasası: yörüngeler elipstir, eşit zamanda eşit alan taranır, T² ∝ a³. Mars'ta bir yıl 687 gün, Jüpiter'de 11,9 yıl; uydu periyodu örnekleri.",
  keywords: ["kepler yasaları", "kepler'in üçüncü yasası", "yörünge periyodu", "gezegenlerde bir yıl", "mars'ta bir yıl kaç gün", "eliptik yörünge", "astronomik birim", "uydu yörünge periyodu"],
  lead: "Kepler'in üç yasası gezegenlerin Güneş etrafındaki hareketini tanımlar: yörüngeler, Güneş'in bir odakta bulunduğu elipslerdir; gezegeni Güneş'e bağlayan çizgi eşit sürelerde eşit alanlar tarar; yörünge periyodunun karesi, yörüngenin büyük yarı ekseninin küpüyle orantılıdır. Üçüncü yasa sayesinde yıl cinsinden periyot T = a<sup>1,5</sup> ile hesaplanır (a astronomik birimle): Mars için a = 1,524 AB olduğundan bir Mars yılı yaklaşık 1,88 Dünya yılı, yani 687 gündür. Bu yazıda üç yasayı, Newton'un açıklamasını ve uydu periyodu hesaplarını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "1. yasa: her gezegen, Güneş'in odaklardan birinde bulunduğu elips biçimli bir yörüngede dolanır.",
    "2. yasa: Güneş ile gezegeni birleştiren doğru eşit sürelerde eşit alanlar tarar; gezegen Güneş'e yakınken daha hızlıdır.",
    "3. yasa: T² ∝ a³; Güneş etrafında T (yıl) = a (AB)<sup>1,5</sup>.",
    "1 astronomik birim (AB) tanım gereği 149.597.870,7 km'dir.",
    "Newton'a göre T = 2π √(a³ ÷ GM); 400 km yükseklikteki bir uydu Dünya'yı yaklaşık 92,4 dakikada dolanır.",
    "Yerdurağan uydular 35.786 km yükseklikte, yaklaşık 23 saat 56 dakikalık periyotla dolanır."
  ],
  figure: {
    alt: "Eliptik yörünge: Güneş bir odakta, gezegen Güneş'e yakın noktada (günberi) daha hızlı, uzak noktada (günöte) daha yavaş; eşit sürede taranan iki alan aynı büyüklükte. Yanda Merkür'den Jüpiter'e a ve T değerleri tablosu.",
    caption: "İkinci yasa: günberide geniş ama kısa, günötede dar ama uzun iki üçgen dilim aynı sürede taranır ve alanları eşittir. Tablo üçüncü yasanın T = a<sup>1,5</sup> ilişkisini gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kepler'in yasaları bir bakışta</text>
  <ellipse cx="220" cy="210" rx="180" ry="120" class="sp sw" fill="none"/>
  <polygon points="320,210 400,210 392,262" class="ps"/>
  <polygon points="320,210 44,196 46,226" class="ps"/>
  <circle cx="320" cy="210" r="16" class="a"/>
  <text x="320" y="250" class="mid sm b">Güneş</text>
  <circle cx="120" cy="210" r="4" class="mu"/>
  <text x="120" y="232" class="mid sm mu">boş odak</text>
  <circle cx="400" cy="210" r="8" class="p"/>
  <text x="404" y="190" class="sm b">günberi: hızlı</text>
  <circle cx="40" cy="210" r="8" class="p"/>
  <text x="40" y="184" class="sm b">günöte: yavaş</text>
  <text x="220" y="356" class="mid sm t2">Gölgeli iki dilim eşit sürede taranır, alanları eşittir.</text>
  <rect x="470" y="60" width="230" height="290" rx="12" class="sf sb"/>
  <text x="585" y="88" class="mid b">T = a<tspan class="sm">^1,5</tspan></text>
  <text x="486" y="118" class="sm b">Gezegen</text><text x="610" y="118" class="sm b end">a (AB)</text><text x="690" y="118" class="sm b end">T</text>
  <line x1="484" y1="126" x2="688" y2="126" class="sp" fill="none"/>
  <g class="sm">
    <text x="486" y="152">Merkür</text><text x="610" y="152" class="end">0,387</text><text x="690" y="152" class="end">88 gün</text>
    <text x="486" y="182">Venüs</text><text x="610" y="182" class="end">0,723</text><text x="690" y="182" class="end">225 gün</text>
    <text x="486" y="212">Dünya</text><text x="610" y="212" class="end">1,000</text><text x="690" y="212" class="end">365 gün</text>
    <text x="486" y="242" class="b p">Mars</text><text x="610" y="242" class="end b p">1,524</text><text x="690" y="242" class="end b p">687 gün</text>
    <text x="486" y="272">Jüpiter</text><text x="610" y="272" class="end">5,204</text><text x="690" y="272" class="end">11,9 yıl</text>
    <text x="486" y="302">Satürn</text><text x="610" y="302" class="end">9,583</text><text x="690" y="302" class="end">29,7 yıl</text>
  </g>
  <text x="585" y="334" class="mid sm t2">Mars: 1,524^1,5 = 1,881 yıl</text>
</svg>`
  },
  sections: [
    {
      h: "Kepler yasaları nereden çıktı?",
      p: [
        "Alman gökbilimci Johannes Kepler, 17. yüzyılın başında Danimarkalı gözlemci Tycho Brahe'nin yıllarca topladığı çok hassas Mars gözlemlerini inceledi. Dairesel yörünge varsayımıyla bu verileri açıklayamadı; yörüngenin elips olduğunu kabul edince gözlemler tutarlı hâle geldi. İlk iki yasasını 1609'da, üçüncüsünü 1619'da yayımladı.",
        "Kepler yasaları gözleme dayanan, yani \"nasıl\" sorusuna cevap veren yasalardır. \"Neden\" sorusunun cevabını yaklaşık yetmiş yıl sonra Isaac Newton kütle çekim yasasıyla verdi. Bugün aynı yasalar yalnızca gezegenlere değil, kuyruklu yıldızlara, Dünya etrafındaki yapay uydulara ve başka yıldızların çevresindeki gezegenlere de uygulanır."
      ]
    },
    {
      h: "Birinci yasa: yörüngeler neden elipstir?",
      p: [
        "Birinci yasaya göre her gezegen, Güneş'in odaklardan birinde bulunduğu bir <strong>elips</strong> üzerinde dolanır. Elipsin iki odağı vardır; Güneş bunlardan birinde durur, öteki odakta hiçbir şey yoktur. Yörüngenin Güneş'e en yakın noktasına <strong>günberi</strong>, en uzak noktasına <strong>günöte</strong> denir.",
        "Elipsin ne kadar basık olduğunu <strong>dış merkezlik</strong> (e) gösterir: e = 0 tam çember, e yaklaştıkça 1'e daha basık elips demektir. Dünya'nın yörüngesinin dış merkezliği yaklaşık 0,017'dir; bu yüzden yörünge çembere çok yakındır. Dünya günberide Güneş'e yaklaşık 147,1 milyon km, günötede 152,1 milyon km uzaklıktadır. Mars'ın dış merkezliği yaklaşık 0,093, Merkür'ünki 0,206'dır; kuyruklu yıldızların yörüngeleri ise çok daha basıktır. Elipsin geometrisi için [[bilgi:elips-nedir-alani-ve-cevresi|elips nedir]] yazısına bakabilirsiniz."
      ],
      formula: "Büyük yarı eksen a = (günberi uzaklığı + günöte uzaklığı) ÷ 2\nDünya: (147,1 + 152,1) ÷ 2 = 149,6 milyon km ≈ 1 AB\nDış merkezlik e = (günöte − günberi) ÷ (günöte + günberi) = 5,0 ÷ 299,2 ≈ 0,017"
    },
    {
      h: "İkinci yasa: eşit zamanda eşit alan",
      p: [
        "İkinci yasaya göre Güneş ile gezegeni birleştiren hayalî doğru, eşit zaman aralıklarında eşit alanlar tarar. Gezegen Güneş'e yakınken bu doğru kısadır; aynı alanı taramak için gezegenin yörünge üzerinde daha uzun yol alması, yani daha hızlı gitmesi gerekir. Güneş'ten uzaktayken doğru uzundur ve gezegen yavaşlar.",
        "Bunun günlük hayatta da bir sonucu vardır. Dünya ocak başında günberide, temmuz başında günötede olduğu için Kuzey Yarımküre'de kış yarıyılı yaz yarıyılından birkaç gün kısadır. Dünya'nın yörünge hızı günberide saniyede yaklaşık 30,3 km, günötede 29,3 km'dir; ortalama değer yaklaşık 29,8 km/s'dir. Mevsimleri ise uzaklık değil, Dünya'nın eksen eğikliği belirler; ayrıntısı [[bilgi:gundonumu-ve-ekinoks-en-uzun-gun-ne-zaman|gündönümü ve ekinoks]] yazısında."
      ]
    },
    {
      h: "Üçüncü yasa: T² ∝ a³ nasıl kullanılır?",
      p: [
        "Üçüncü yasa, aynı merkezi cismin etrafında dolanan bütün cisimler için periyodun karesinin büyük yarı eksenin küpüne oranının sabit olduğunu söyler. Güneş Sistemi'nde periyodu Dünya yılı, uzaklığı astronomik birim cinsinden yazarsak bu sabit 1 olur ve formül çok sadeleşir."
      ],
      formula: "T² ∝ a³  →  T₁² ÷ a₁³ = T₂² ÷ a₂³\nGüneş etrafında (T yıl, a AB): T² = a³  →  T = a^1,5\nTersine: a = T^(2/3)",
      ol: [
        "Mars'ın büyük yarı ekseni a = 1,524 AB.",
        "a³ = 1,524³ ≈ 3,540.",
        "T = √3,540 ≈ 1,881 yıl.",
        "Güne çevirin: 1,881 × 365,25 ≈ 687 gün.",
        "Ters örnek: Halley kuyruklu yıldızının periyodu yaklaşık 75 yıl ise a = 75^(2/3) ≈ 17,8 AB."
      ],
      after: [
        "Bu örnekte kök ve kuvvet işlemlerini hesap makinesiyle kolayca yapabilirsiniz. Önemli olan birimlerin tutarlılığıdır: formülün T = a<sup>1,5</sup> biçimi yalnızca Güneş etrafındaki yörüngeler ve yıl–AB birimleri için geçerlidir. Dünya etrafındaki uydular için Newton'un genel formülü kullanılır."
      ]
    },
    {
      h: "Mars, Jüpiter ve diğer gezegenlerde bir yıl kaç gün?",
      p: [
        "Bir gezegenin \"yılı\", Güneş etrafında bir tam turunu tamamlama süresidir (yıldız periyodu). Aşağıdaki tablo üçüncü yasayla, büyük yarı eksen değerlerinden hesaplanmış periyotları gösterir; gözlenen değerlerle uyum çok yüksektir."
      ],
      table: {
        head: ["Gezegen", "Büyük yarı eksen (AB)", "Uzaklık (milyon km)", "Periyot (Dünya yılı)", "Periyot (gün)"],
        rows: [
          ["Merkür", "0,387", "57,9", "0,241", "88,0"],
          ["Venüs", "0,723", "108,2", "0,615", "224,7"],
          ["Dünya", "1,000", "149,6", "1,000", "365,25"],
          ["Mars", "1,524", "227,9", "1,881", "687,0"],
          ["Jüpiter", "5,204", "778,6", "11,87", "4.337"],
          ["Satürn", "9,583", "1.433,5", "29,66", "10.835"],
          ["Uranüs", "19,19", "2.871", "84,07", "30.708"],
          ["Neptün", "30,07", "4.498", "164,9", "60.227"]
        ],
        caption: "Periyotlar T = a^1,5 ile hesaplanmıştır; gezegenlerin kendi kütlesi ihmal edildiği için en ağır gezegenlerde gözlenen değerden çok küçük farklar olabilir."
      },
      after: [
        "Neptün, 1846'da keşfedildiğinden bu yana Güneş etrafındaki ilk tam turunu ancak 2011 civarında tamamladı. Bir gezegenin günü ise kendi ekseni etrafındaki dönüş süresidir ve yılıyla karıştırılmamalıdır."
      ]
    },
    {
      h: "Astronomik birim nedir, kaç km'dir?",
      p: [
        "Astronomik birim (AB, İngilizce AU), başlangıçta Dünya ile Güneş arasındaki ortalama uzaklık olarak düşünülen bir uzunluk birimidir. Uluslararası Astronomi Birliği 2012'de birimi sabit bir değerle tanımladı: <strong>1 AB = 149.597.870.700 metre</strong>, yani 149.597.870,7 km. Işık bu mesafeyi yaklaşık 499 saniyede, yani 8 dakika 19 saniyede alır.",
        "Güneş Sistemi ölçeğinde kilometre çok büyük sayılar üretir; AB bu sayıları okunur kılar ve üçüncü yasayı T = a<sup>1,5</sup> gibi sade bir hâle getirir. Daha uzak mesafelerde ışık yılı ve parsek kullanılır; ayrıntılar [[bilgi:isik-yili-nedir-kac-km|ışık yılı nedir]] yazısında. AB ile km arasında çeviri için [[arac:astronomik-birim-km-cevir|Astronomik Birim km Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Newton'un kütle çekim yasası Kepler yasalarını nasıl açıklar?",
      p: [
        "Newton, iki cisim arasındaki çekim kuvvetinin kütlelerin çarpımıyla doğru, aralarındaki uzaklığın karesiyle ters orantılı olduğunu gösterdi: F = G m₁ m₂ ÷ r². Bu kuvvet yasası matematiksel olarak çözüldüğünde, bağlı yörüngelerin elips olduğu (birinci yasa), açısal momentumun korunması nedeniyle eşit sürelerde eşit alan tarandığı (ikinci yasa) ve periyodun büyük yarı eksene bağlı olduğu (üçüncü yasa) ortaya çıkar."
      ],
      formula: "T = 2π × √(a³ ÷ (G × (M + m)))\nm ≪ M ise: T ≈ 2π × √(a³ ÷ GM)\nG = 6,674 × 10⁻¹¹ N·m²/kg²; Dünya için GM = 398.600 km³/s²",
      after: [
        "Bu formül Kepler'in sabitinin nereden geldiğini de açıklar: oran merkezi cismin kütlesine bağlıdır. Aynı uzaklıkta Güneş etrafında dolanan bir cisim, Dünya etrafında dolanan bir cisimden çok daha kısa sürede tur atar, çünkü Güneş'in kütlesi çok büyüktür. Çekim kuvvetini sayılarla hesaplamak için [[arac:kutle-cekim-kuvveti-hesapla|Kütle Çekim Kuvveti Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Uyduların yörünge periyodu nasıl hesaplanır?",
      p: [
        "Dünya etrafındaki bir uydunun periyodunu bulmak için yörünge yarıçapı r = Dünya yarıçapı + yükseklik alınır ve Newton'un formülü uygulanır. Dünya'nın ortalama yarıçapı yaklaşık 6.371 km'dir. Dairesel yörüngede yörünge hızı v = √(GM ÷ r) ile hesaplanır."
      ],
      table: {
        head: ["Yörünge", "Yükseklik", "Yarıçap r", "Periyot", "Yörünge hızı"],
        rows: [
          ["Alçak yörünge (uzay istasyonu benzeri)", "400 km", "6.771 km", "92,4 dakika", "7,67 km/s"],
          ["Alçak yörünge (iletişim uydusu)", "550 km", "6.921 km", "95,5 dakika", "7,59 km/s"],
          ["Orta yörünge (konum belirleme)", "20.200 km", "26.571 km", "11,97 saat", "3,87 km/s"],
          ["Yerdurağan yörünge", "35.786 km", "42.157 km", "23,93 saat", "3,07 km/s"]
        ],
        caption: "Değerler dairesel yörünge ve GM = 398.600,44 km³/s² ile hesaplanmıştır."
      },
      after: [
        "Yerdurağan yörüngenin periyodu güneş günü olan 24 saat değil, Dünya'nın yıldızlara göre dönüş süresi olan yaklaşık 23 saat 56 dakikadır; bu yüzden uydu yerden bakıldığında gökyüzünde sabit durur. Kendi değerlerinizle hesap için [[arac:yorunge-periyodu-hesapla|Yörünge Periyodu Hesaplama]] aracında merkez cismi ve yüksekliği seçmeniz yeterlidir."
      ]
    },
    {
      h: "Kaçış hızı ile yörünge hızı arasındaki fark",
      p: [
        "Yörünge hızı, bir cismin belirli bir uzaklıkta dairesel yörüngede kalması için gereken hızdır. Kaçış hızı ise cismin hiçbir ek itme olmadan merkezi cismin çekiminden tamamen kurtulması için gereken en düşük hızdır. Aynı uzaklıkta kaçış hızı, dairesel yörünge hızının tam √2 ≈ 1,414 katıdır."
      ],
      formula: "Dairesel yörünge hızı v = √(GM ÷ r)\nKaçış hızı v_k = √(2GM ÷ r) = √2 × v\n400 km'de: v = 7,67 km/s, v_k = 10,85 km/s",
      after: [
        "Yörünge hızıyla kaçış hızı arasındaki hızlarda cisim kapalı ama giderek daha basık elipsler çizer; kaçış hızına ulaşınca yörünge açılır. Ayrıntılar ve gök cisimlerine göre değerler [[bilgi:kacis-hizi-nedir|kaçış hızı nedir]] yazısında, hesap ise [[arac:kacis-hizi-hesapla|Kaçış Hızı Hesaplama]] aracında."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>T = a^1,5 formülünü her yerde kullanmak:</strong> bu biçim yalnızca Güneş etrafında, yıl ve AB birimleriyle geçerlidir.",
        "<strong>Yüksekliği yarıçap sanmak:</strong> uydu hesaplarında r = Dünya yarıçapı + yükseklik alınmalıdır.",
        "<strong>Mevsimleri uzaklığa bağlamak:</strong> Dünya ocakta Güneş'e en yakındır; mevsimleri eksen eğikliği belirler.",
        "<strong>Elipsin merkezine Güneş'i koymak:</strong> Güneş merkezde değil, odaklardan birindedir.",
        "<strong>Birimleri karıştırmak:</strong> G ile çalışırken metre, kilogram ve saniye; GM ile çalışırken km³/s² ile tutarlı kalın."
      ]
    }
  ],
  faq: [
    ["Kepler'in üç yasası nedir?", "Birinci yasaya göre yörüngeler, Güneş'in bir odakta olduğu elipslerdir. İkinci yasaya göre Güneş ile gezegeni birleştiren doğru eşit sürelerde eşit alan tarar. Üçüncü yasaya göre periyodun karesi büyük yarı eksenin küpüyle orantılıdır."],
    ["Gezegen yörüngeleri neden elipstir?", "Kütle çekim kuvveti uzaklığın karesiyle ters orantılı olduğu için bu kuvvet altında bağlı yörüngeler matematiksel olarak elips çıkar. Çember, dış merkezliği sıfır olan özel bir elipstir; Dünya'nın yörüngesi çembere çok yakındır."],
    ["Eşit zamanda eşit alan yasası ne anlatır?", "Gezegenin Güneş'e yakınken daha hızlı, uzakken daha yavaş hareket ettiğini anlatır. Güneş ile gezegeni birleştiren doğru eşit sürelerde eşit alanlar taradığından, kısa olduğu günberide daha uzun yol alınması gerekir."],
    ["Üçüncü yasa (T² ∝ a³) nasıl kullanılır?", "Güneş etrafındaki yörüngelerde periyot yıl, uzaklık astronomik birim cinsinden yazılırsa T = a üzeri 1,5 olur. Örneğin a = 1,524 AB olan Mars için T yaklaşık 1,881 yıldır. Dünya etrafındaki uydular için Newton'un genel formülü kullanılır."],
    ["Mars ve Jüpiter'de bir yıl kaç Dünya günüdür?", "Mars'ta bir yıl yaklaşık 687 Dünya günü, yani 1,88 Dünya yılıdır. Jüpiter'in Güneş etrafındaki bir turu yaklaşık 11,9 Dünya yılı, yani 4.330 günü aşkın sürer."],
    ["Astronomik birim nedir, kaç km'dir?", "Astronomik birim, başlangıçta Dünya–Güneş ortalama uzaklığı olarak düşünülen ve 2012'den beri sabit değerle tanımlanan uzunluk birimidir. 1 AB tam olarak 149.597.870,7 km'dir ve ışık bu yolu yaklaşık 8 dakika 19 saniyede alır."],
    ["Newton'un kütle çekim yasası Kepler yasalarını nasıl açıklar?", "Newton'un uzaklığın karesiyle ters orantılı çekim kuvveti matematiksel olarak çözüldüğünde eliptik yörüngeler, eşit alan kuralı ve periyot ile uzaklık arasındaki ilişki doğrudan ortaya çıkar. Formül, sabitin merkezi cismin kütlesine bağlı olduğunu da gösterir."],
    ["Uyduların yörünge periyodu nasıl hesaplanır?", "Yörünge yarıçapı, Dünya yarıçapı ile yüksekliğin toplamı alınır ve T = 2π √(r³ ÷ GM) formülü uygulanır. 400 km yükseklikteki bir uydu için periyot yaklaşık 92,4 dakika, yerdurağan yörüngede yaklaşık 23 saat 56 dakikadır."],
    ["Kaçış hızı ile yörünge hızı arasındaki fark nedir?", "Yörünge hızı cismin dairesel yörüngede kalması için, kaçış hızı ise çekimden tamamen kurtulması için gereken hızdır. Aynı uzaklıkta kaçış hızı yörünge hızının √2 katıdır; 400 km'de 7,67 km/s'ye karşılık 10,85 km/s."]
  ],
  tools: ["yorunge-periyodu-hesapla", "kutle-cekim-kuvveti-hesapla", "astronomik-birim-km-cevir", "kacis-hizi-hesapla"],
  related: ["kacis-hizi-nedir", "isik-yili-nedir-kac-km", "elips-nedir-alani-ve-cevresi", "merkezcil-kuvvet-ve-acisal-hiz"],
  sources: [
    ["IAU – Astronomik birimin yeniden tanımı (2012, B2 kararı)", "https://www.iau.org/"],
    ["NASA – Gezegen bilgi sayfaları", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"]
  ]
};
