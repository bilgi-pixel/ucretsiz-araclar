export default {
  slug: "iki-nokta-arasi-uzaklik-formulu-orta-nokta",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "İki Nokta Arası Uzaklık Formülü ve Orta Nokta: Analitik Geometri",
  pageTitle: "İki Nokta Arası Uzaklık Formülü ve Orta Nokta Hesabı",
  description: "İki nokta arası uzaklık d = √((x₂−x₁)² + (y₂−y₁)²), orta nokta ((x₁+x₂)/2, (y₁+y₂)/2) ile bulunur. Pisagor ispatı, uzayda uzaklık, bölen nokta ve çözümlü sorular.",
  keywords: ["iki nokta arası uzaklık", "uzaklık formülü", "orta nokta formülü", "analitik geometri", "koordinat düzleminde uzaklık", "uzayda iki nokta arası uzaklık", "noktanın doğruya uzaklığı", "bölen nokta"],
  lead: "Koordinat düzleminde A(x₁, y₁) ve B(x₂, y₂) noktaları arasındaki uzaklık d = √((x₂ − x₁)² + (y₂ − y₁)²) formülüyle, orta nokta ise koordinatların ortalaması alınarak ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2) biçiminde bulunur. Örneğin A(2, −1) ile B(8, 7) arasındaki uzaklık 10 birim, orta nokta (5, 3)'tür. Formül doğrudan Pisagor teoreminden gelir ve üç boyuta z farkı eklenerek genişletilir. Bu yazıda ispatı, orta nokta ve bölen nokta hesabını, noktanın doğruya uzaklığını ve sınav tipi soruları çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Düzlemde uzaklık: |AB| = √((x₂ − x₁)² + (y₂ − y₁)²).",
    "Orta nokta: M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2).",
    "Uzayda uzaklık: |AB| = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²).",
    "AB'yi A'dan itibaren m:n oranında içten bölen nokta: P = ((n·x₁ + m·x₂) ÷ (m + n), (n·y₁ + m·y₂) ÷ (m + n)).",
    "P(x₀, y₀) noktasının ax + by + c = 0 doğrusuna uzaklığı: |a·x₀ + b·y₀ + c| ÷ √(a² + b²).",
    "Enlem ve boylamla verilen iki yer arasındaki uzaklık düzlem formülüyle değil, küre üzerindeki büyük daire formülüyle hesaplanır."
  ],
  figure: {
    alt: "Koordinat düzleminde A(2, −1) ve B(8, 7) noktaları; yatay fark 6, düşey fark 8 olan dik üçgen ve hipotenüs AB = 10. Orta nokta M(5, 3) işaretli.",
    caption: "Uzaklık formülü, iki nokta arasındaki yatay ve düşey farkların oluşturduğu dik üçgenin hipotenüsüdür: √(6² + 8²) = 10. Orta nokta koordinatların ortalamasıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">A(2, −1) ile B(8, 7) arası uzaklık</text>
  <g class="sb">
    <line x1="60" y1="340" x2="460" y2="340" fill="none" class="sb"/>
    <line x1="100" y1="60" x2="100" y2="380" fill="none" class="sb"/>
  </g>
  <text x="466" y="344" class="sm mu">x</text>
  <text x="104" y="58" class="sm mu">y</text>
  <g class="sm mu mid">
    <text x="140" y="356">1</text><text x="220" y="356">3</text><text x="300" y="356">5</text><text x="380" y="356">7</text>
  </g>
  <line x1="180" y1="380" x2="420" y2="380" class="sok sw" fill="none"/>
  <line x1="420" y1="380" x2="420" y2="60" class="sok sw" fill="none"/>
  <line x1="180" y1="380" x2="420" y2="60" class="sp sw" fill="none"/>
  <rect x="404" y="364" width="16" height="16" class="sb" fill="none"/>
  <circle cx="180" cy="380" r="7" class="p"/>
  <circle cx="420" cy="60" r="7" class="p"/>
  <circle cx="300" cy="220" r="7" class="a"/>
  <text x="168" y="404" class="b end">A(2, −1)</text>
  <text x="432" y="62" class="b">B(8, 7)</text>
  <text x="286" y="214" class="b end">M(5, 3)</text>
  <text x="300" y="402" class="mid b ok">Δx = 6</text>
  <text x="430" y="226" class="b ok">Δy = 8</text>
  <text x="270" y="180" class="b p">d = 10</text>
  <rect x="490" y="70" width="210" height="300" rx="12" class="sf sb"/>
  <text x="595" y="100" class="mid b">Çözüm</text>
  <text x="506" y="136" class="sm">Δx = 8 − 2 = 6</text>
  <text x="506" y="162" class="sm">Δy = 7 − (−1) = 8</text>
  <text x="506" y="194" class="sm">d = √(6² + 8²)</text>
  <text x="506" y="218" class="sm">d = √(36 + 64) = √100</text>
  <text x="506" y="248" class="b p">d = 10</text>
  <text x="506" y="290" class="sm">M = ((2 + 8)/2, (−1 + 7)/2)</text>
  <text x="506" y="322" class="b">M = (5, 3)</text>
</svg>`
  },
  sections: [
    {
      h: "İki nokta arası uzaklık formülü nedir?",
      p: [
        "Analitik geometride noktalar koordinatlarıyla, yani bir sayı çiftiyle ifade edilir. A(x₁, y₁) ve B(x₂, y₂) gibi iki noktanın arasındaki uzaklık, yatay ve düşey farkların kareleri toplamının kareköküdür. Uzaklık her zaman sıfır ya da pozitif bir sayıdır ve |AB| ile gösterilir."
      ],
      formula: "|AB| = √((x₂ − x₁)² + (y₂ − y₁)²)\nÖrnek: A(2, −1), B(8, 7)\n|AB| = √((8 − 2)² + (7 − (−1))²) = √(36 + 64) = √100 = 10",
      after: [
        "Farkların karesi alındığı için hangi noktayı birinci, hangisini ikinci aldığınız sonucu değiştirmez: (2 − 8)² de 36'dır. Ancak negatif koordinatlarda işaret hatası çok sık yapılır; 7 − (−1) = 8'dir, 6 değil. Hesabı doğrulamak için [[arac:iki-nokta-arasi-uzaklik|İki Nokta Arası Uzaklık Hesaplama]] aracı farkları ve uzaklığın karesini adım adım gösterir."
      ]
    },
    {
      h: "Formül Pisagor teoreminden nasıl çıkar?",
      p: [
        "A ve B noktalarından eksenlere paralel çizgiler çizdiğinizde, köşesi C(x₂, y₁) olan bir dik üçgen oluşur. Bu üçgenin yatay dik kenarı |x₂ − x₁|, düşey dik kenarı |y₂ − y₁| uzunluğundadır. AB ise hipotenüstür. Pisagor teoremine göre hipotenüsün karesi dik kenarların kareleri toplamına eşittir; karekök alındığında uzaklık formülü elde edilir.",
        "Yukarıdaki örnekte dik kenarlar 6 ve 8'dir; bu, 3–4–5 üçgeninin iki katıdır ve hipotenüs 10 çıkar. Sınavlarda sık görülen 3–4–5, 5–12–13 ve 8–15–17 üçlülerini tanımak, karekök almadan sonuca ulaşmanızı sağlar. Teoremin ayrıntısı [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi nedir]] yazısında, hesabı ise [[arac:pisagor-teoremi-hesapla|Pisagor Teoremi Hesaplama]] aracında bulabilirsiniz."
      ],
      formula: "|AB|² = |AC|² + |CB|²\n|AB|² = (x₂ − x₁)² + (y₂ − y₁)²"
    },
    {
      h: "Orta nokta koordinatları nasıl bulunur?",
      p: [
        "Bir doğru parçasının orta noktası, iki uç noktaya eşit uzaklıktaki noktadır. Koordinatları, uç noktaların koordinatlarının aritmetik ortalamasıdır: x'lerin ortalaması orta noktanın x'ini, y'lerin ortalaması y'sini verir."
      ],
      formula: "M = ((x₁ + x₂) ÷ 2, (y₁ + y₂) ÷ 2)\nÖrnek: A(2, −1), B(8, 7) → M = (10 ÷ 2, 6 ÷ 2) = (5, 3)\nTersine: bir uç ve orta nokta biliniyorsa diğer uç = (2·xₘ − x₁, 2·yₘ − y₁)",
      ol: [
        "Bir uç ve orta nokta verilmiş olsun: A(−2, 3), M(1, 5).",
        "Diğer ucun x'i: 2 × 1 − (−2) = 4.",
        "Diğer ucun y'si: 2 × 5 − 3 = 7.",
        "B(4, 7) bulunur. Kontrol: ((−2 + 4) ÷ 2, (3 + 7) ÷ 2) = (1, 5)."
      ],
      after: [
        "Her iki yönde hesabı [[arac:orta-nokta-hesapla|Orta Nokta Hesaplama]] aracıyla yapabilirsiniz; araç doğru parçasının uzunluğunu da gösterir. Orta noktanın koordinat ortalaması olması, aritmetik ortalama kavramının geometrideki karşılığıdır."
      ]
    },
    {
      h: "Üç boyutlu uzayda uzaklık nasıl hesaplanır?",
      p: [
        "Uzayda her nokta üç koordinatla, (x, y, z) biçiminde verilir. Uzaklık formülüne yalnızca z farkının karesi eklenir. Bunun nedeni de yine Pisagor'dur: önce taban düzlemindeki köşegen bulunur, sonra bu köşegen ile düşey fark yeni bir dik üçgenin dik kenarları olur."
      ],
      formula: "|PQ| = √((x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²)\nÖrnek: P(1, 2, 3), Q(4, 6, 15)\n|PQ| = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13",
      after: [
        "Bu örnekte taban köşegeni √(9 + 16) = 5, ardından √(5² + 12²) = 13 bulunur; iki tanıdık Pisagor üçlüsü art arda kullanılmıştır. Uzayda orta nokta da aynı mantıkla üç koordinatın ortalamasıdır: ((1 + 4) ÷ 2, (2 + 6) ÷ 2, (3 + 15) ÷ 2) = (2,5; 4; 9)."
      ]
    },
    {
      h: "Bir doğru parçasını belirli oranda bölen nokta",
      p: [
        "Orta nokta, doğru parçasını 1:1 oranında bölen özel bir noktadır. Genel olarak AB doğru parçasını A'dan itibaren m:n oranında (|AP| : |PB| = m : n) içten bölen P noktasının koordinatları, uç noktaların ağırlıklı ortalamasıdır. Dikkat edilecek nokta, A'nın koordinatının n ile, B'nin koordinatının m ile çarpılmasıdır: P, oranı büyük olan tarafa değil, diğer uca daha yakın durur."
      ],
      formula: "P = ((n·x₁ + m·x₂) ÷ (m + n), (n·y₁ + m·y₂) ÷ (m + n))\nÖrnek: A(2, −1), B(8, 7), |AP| : |PB| = 1 : 2\nP = ((2·2 + 1·8) ÷ 3, (2·(−1) + 1·7) ÷ 3) = (4, 5/3)",
      after: [
        "Kontrol: |AP| = √(2² + (8/3)²) = 10/3 ve |PB| = √(4² + (16/3)²) = 20/3; oran gerçekten 1:2'dir ve toplam 10 eder. Aynı formül m = n = 1 alındığında orta nokta formülüne dönüşür."
      ]
    },
    {
      h: "Noktanın doğruya uzaklığı nasıl hesaplanır?",
      p: [
        "Bir noktanın bir doğruya uzaklığı, noktadan doğruya indirilen dikmenin uzunluğudur; yani doğru üzerindeki en yakın noktaya olan uzaklıktır. Doğru ax + by + c = 0 genel biçiminde yazıldığında doğrudan bir formül vardır."
      ],
      formula: "d = |a·x₀ + b·y₀ + c| ÷ √(a² + b²)\nÖrnek: P(4, 1) ve 3x − 4y + 5 = 0\nd = |3·4 − 4·1 + 5| ÷ √(9 + 16) = |13| ÷ 5 = 2,6",
      after: [
        "Doğru y = mx + n biçiminde verildiyse önce mx − y + n = 0 biçimine getirin. İki noktası bilinen bir doğrunun denklemini bulmak için [[arac:dogru-denklemi-bul|Doğru Denklemi Bulma]] aracını kullanabilirsiniz; eğimin anlamı [[bilgi:dogrunun-egimi-nasil-bulunur|doğrunun eğimi]] yazısında anlatılıyor. Paralel iki doğru arasındaki uzaklık da aynı mantıkla, doğrulardan birinin üzerindeki herhangi bir noktanın diğer doğruya uzaklığı olarak bulunur."
      ]
    },
    {
      h: "Üç noktanın aynı doğru üzerinde olup olmadığı nasıl anlaşılır?",
      p: [
        "A, B ve C noktaları aynı doğru üzerindeyse (doğrusal ise) AB ve AC'nin eğimleri eşittir. Bölme yapmadan kontrol etmenin pratik yolu aşağıdaki çapraz çarpım ifadesidir; sonuç sıfırsa noktalar doğrusaldır. Aynı ifadenin mutlak değerinin yarısı, bu üç noktanın oluşturduğu üçgenin alanını verir."
      ],
      formula: "D = (x₂ − x₁)(y₃ − y₁) − (y₂ − y₁)(x₃ − x₁)\nD = 0 ise doğrusal; değilse üçgen alanı = |D| ÷ 2",
      ul: [
        "A(1, 1), B(3, 5), C(5, 9): D = 2·8 − 4·4 = 0 → doğrusal.",
        "A(1, 1), B(3, 5), C(5, 10): D = 2·9 − 4·4 = 2 → doğrusal değil, üçgen alanı 1 birimkare.",
        "Uzaklıklarla kontrol: noktalar doğrusalsa uzaklıklardan biri diğer ikisinin toplamına eşittir."
      ]
    },
    {
      h: "Bu formüller TYT–AYT'de nasıl sorulur?",
      p: [
        "Uzaklık ve orta nokta formülleri sınavlarda çoğu zaman tek başına değil, bir bilinmeyen bulma ya da geometrik şekil sorusunun içinde gelir. En sık karşılaşılan soru tipleri ve çözüm yaklaşımları şunlardır:"
      ],
      table: {
        head: ["Soru tipi", "Örnek", "Çözüm yaklaşımı"],
        rows: [
          ["Bilinmeyen koordinat", "A(1, k), B(4, 5), |AB| = 5 ise k?", "3² + (5 − k)² = 25 → 5 − k = ±4 → k = 1 ya da 9"],
          ["Eşit uzaklıktaki nokta", "x ekseni üzerinde A ve B'ye eşit uzak nokta", "P(x, 0) al, |PA|² = |PB|² yaz, karekökten kurtul"],
          ["Paralelkenar köşesi", "ABCD paralelkenarında üç köşe verilmiş", "Köşegenlerin orta noktaları aynıdır"],
          ["Üçgen türü", "Kenar uzunluklarına göre ikizkenar mı dik mi?", "Üç uzaklığı bul, Pisagor bağıntısını kontrol et"],
          ["Ağırlık merkezi", "Üçgenin köşeleri verilmiş", "Koordinatların ortalaması: ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)"]
        ]
      },
      after: [
        "Bilinmeyen koordinat sorularında iki çözüm çıkması normaldir; çünkü bir noktaya belirli uzaklıktaki noktalar bir çember oluşturur ve verilen doğru bu çemberi iki noktada kesebilir. Kareköklü denklemlerde her iki tarafın karesini alarak işleme başlamak hesabı kısaltır."
      ]
    },
    {
      h: "Harita koordinatlarında neden farklı bir formül kullanılır?",
      p: [
        "Düzlem uzaklık formülü yalnızca düz bir yüzeyde ve aynı birimle ölçülen eksenlerde geçerlidir. Enlem ve boylam ise küre üzerindeki açılardır; bir derece boylamın kilometre karşılığı ekvatordan kutuplara doğru küçülür. Bu yüzden iki şehrin enlem ve boylamını düzlem formülüne koyup 111 ile çarpmak hatalı sonuç verir.",
        "Örneğin Ankara ile İstanbul'un koordinat farklarına düzlem formülü uygulanıp derece başına 111 km alınırsa yaklaşık 447 km bulunur. Küre üzerindeki büyük daire (haversine) formülüyle hesaplanan kuş uçuşu mesafe ise yaklaşık 349 km'dir. Şehirler arası mesafe için [[arac:uzaklik-hesapla|Şehirler Arası Mesafe Hesaplama]] aracı küresel hesap yapar. Küçük bir harita ya da plan üzerinde ise ölçekli düzlem hesabı yeterlidir; ayrıntısı [[bilgi:harita-olcegi-nasil-hesaplanir|harita ölçeği]] yazısında."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Negatif sayılarda işaret hatası:</strong> 7 − (−1) = 8'dir; parantez kullanmak hatayı önler.",
        "<strong>Karekökü toplamlara dağıtmak:</strong> √(36 + 64) ≠ √36 + √64; önce topla, sonra kök al.",
        "<strong>Bölen nokta formülünde ağırlıkları ters koymak:</strong> A'nın koordinatı n ile, B'ninki m ile çarpılır.",
        "<strong>Doğru denklemini genel biçime getirmeden formül uygulamak:</strong> noktanın doğruya uzaklığında ax + by + c = 0 biçimi şarttır.",
        "<strong>Enlem-boylama düzlem formülü uygulamak:</strong> küre üzerindeki uzaklık için büyük daire formülü gerekir."
      ]
    }
  ],
  faq: [
    ["İki nokta arası uzaklık formülü nedir?", "A(x₁, y₁) ile B(x₂, y₂) arasındaki uzaklık, x ve y farklarının kareleri toplamının kareköküdür: √((x₂ − x₁)² + (y₂ − y₁)²). A(2, −1) ile B(8, 7) arasındaki uzaklık √(36 + 64) = 10 birimdir."],
    ["Formül Pisagor teoreminden nasıl çıkar?", "İki noktadan eksenlere paralel çizgiler çizilince dik kenarları yatay ve düşey farklar olan bir dik üçgen oluşur. İki nokta arasındaki doğru parçası bu üçgenin hipotenüsüdür ve Pisagor teoremi uzaklık formülünü doğrudan verir."],
    ["Orta nokta koordinatları nasıl bulunur?", "Uç noktaların x koordinatlarının ortalaması orta noktanın x'ini, y koordinatlarının ortalaması y'sini verir. A(2, −1) ve B(8, 7) için orta nokta (5, 3)'tür; bir uç ve orta nokta biliniyorsa diğer uç 2M − A ile bulunur."],
    ["Üç boyutlu uzayda uzaklık nasıl hesaplanır?", "Düzlem formülüne z farkının karesi eklenir: √(Δx² + Δy² + Δz²). P(1, 2, 3) ile Q(4, 6, 15) arasındaki uzaklık √(9 + 16 + 144) = √169 = 13 birimdir."],
    ["Bir doğru parçasını belirli oranda bölen nokta nasıl bulunur?", "A'dan itibaren m:n oranında bölen nokta, A'nın koordinatları n ile, B'ninkiler m ile çarpılıp toplamın m + n'ye bölünmesiyle bulunur. A(2, −1), B(8, 7) ve 1:2 oranı için nokta (4, 5/3) olur."],
    ["Noktanın doğruya uzaklığı nasıl hesaplanır?", "Doğru ax + by + c = 0 biçiminde yazılır ve |a·x₀ + b·y₀ + c| ÷ √(a² + b²) formülü uygulanır. P(4, 1) noktasının 3x − 4y + 5 = 0 doğrusuna uzaklığı 13 ÷ 5 = 2,6 birimdir."],
    ["Üç noktanın aynı doğru üzerinde olup olmadığı nasıl anlaşılır?", "(x₂ − x₁)(y₃ − y₁) − (y₂ − y₁)(x₃ − x₁) ifadesi hesaplanır; sonuç sıfırsa noktalar doğrusaldır. Sıfır değilse ifadenin mutlak değerinin yarısı üç noktanın oluşturduğu üçgenin alanını verir."],
    ["Bu formüller TYT–AYT'de nasıl sorulur?", "Genellikle bilinmeyen bir koordinatı bulma, iki noktaya eşit uzaklıktaki noktayı belirleme, paralelkenarın eksik köşesini bulma ve üçgenin türünü kenar uzunluklarından belirleme gibi soruların içinde kullanılır."],
    ["Harita koordinatlarında neden farklı bir formül kullanılır?", "Enlem ve boylam küre üzerindeki açılardır ve bir derece boylamın uzunluğu enleme göre değişir. Bu yüzden düzlem formülü hatalı sonuç verir; Ankara–İstanbul için düzlem yaklaşımı yaklaşık 447 km, doğru büyük daire hesabı yaklaşık 349 km bulur."]
  ],
  tools: ["iki-nokta-arasi-uzaklik", "orta-nokta-hesapla", "pisagor-teoremi-hesapla", "dogru-denklemi-bul", "uzaklik-hesapla"],
  related: ["pisagor-teoremi-nedir", "dogrunun-egimi-nasil-bulunur", "harita-olcegi-nasil-hesaplanir", "ucgende-acilar"]
};
