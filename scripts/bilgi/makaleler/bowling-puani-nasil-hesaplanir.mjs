export default {
  slug: "bowling-puani-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Bowling Puanı Nasıl Hesaplanır? Strike, Spare ve 300 Puanlık Mükemmel Oyun",
  pageTitle: "Bowling Puanı Nasıl Hesaplanır? Strike ve Spare Bonusu",
  description: "Bowling puanı 10 frame üzerinden hesaplanır; strike sonraki iki atışı, spare sonraki bir atışı bonus olarak ekler. Çözümlü 172 puanlık örnek, 10. frame ve 300 kuralı.",
  keywords: ["bowling puanı nasıl hesaplanır", "bowling strike bonusu", "bowling spare nedir", "bowling skor tablosu", "bowling 10. frame", "bowling 300 puan", "bowling puan hesaplama", "ardışık strike puanı"],
  lead: "Bowling puanı, 10 frame (çerçeve) boyunca devrilen lobutların toplanmasıyla hesaplanır; ancak tüm lobutları ilk atışta devirmek (<strong>strike</strong>) o frame'e sonraki iki atışın, iki atışta devirmek (<strong>spare</strong>) ise sonraki bir atışın puanını bonus olarak ekler. Bu yüzden bir frame'in puanı çoğu zaman sonraki atışlar yapılmadan yazılamaz. Her frame'de en fazla 30 puan alınabildiği için mükemmel oyun 10 × 30 = 300 puandır ve bunun için art arda 12 strike gerekir. Bu sayfada skor tablosunun okunuşunu, 10. frame kuralını ve frame frame çözülmüş bir oyun örneğini bulacaksınız.",
  kisaCevap: [
    "Bir oyun 10 frame'dir; her frame'de 10 lobuta en fazla iki atış yapılır.",
    "Açık frame (tüm lobutlar devrilmezse): frame puanı iki atışta devrilen lobut sayısıdır.",
    "Spare (/): iki atışta 10 lobut; frame puanı 10 + sonraki ilk atış.",
    "Strike (X): ilk atışta 10 lobut; frame puanı 10 + sonraki iki atış.",
    "10. frame'de strike ya da spare yapan oyuncu, bonusu tamamlamak için ek atış hakkı kazanır; bu frame'de en fazla 3 atış yapılır.",
    "Her frame en fazla 30 puan verir; 12 ardışık strike ile 300 puanlık mükemmel oyun oluşur."
  ],
  figure: {
    alt: "On frame'lik bir bowling skor tablosu: X, 7/, 9-, X, X, 81, 6/, X, 72 ve X9/ atışları ile her frame'in altındaki birikimli puanlar 20, 39, 48, 76, 95, 104, 124, 143, 152 ve 172.",
    caption: "Örnek oyunun skor tablosu. Üst satırda atışlar (X strike, / spare, - ıskalama), alt satırda birikimli toplam vardır. 4. frame'deki strike, 5. frame'deki strike ve 6. frame'in ilk atışı (8) ile 10 + 10 + 8 = 28 puan getirir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Örnek oyun: 172 puan</text>
  <g class="mid">
    <text x="49" y="62" class="sm mu">1</text><text x="117" y="62" class="sm mu">2</text><text x="185" y="62" class="sm mu">3</text><text x="253" y="62" class="sm mu">4</text><text x="321" y="62" class="sm mu">5</text>
    <text x="389" y="62" class="sm mu">6</text><text x="457" y="62" class="sm mu">7</text><text x="525" y="62" class="sm mu">8</text><text x="593" y="62" class="sm mu">9</text><text x="666" y="62" class="sm mu">10</text>
    <rect x="16" y="70" width="66" height="96" class="ps sb"/><text x="49" y="100" class="lg b p">X</text><text x="49" y="150" class="lg b">20</text>
    <rect x="84" y="70" width="66" height="96" class="sf sb"/><text x="117" y="100" class="lg b">7 /</text><text x="117" y="150" class="lg b">39</text>
    <rect x="152" y="70" width="66" height="96" class="sf sb"/><text x="185" y="100" class="lg b">9 -</text><text x="185" y="150" class="lg b">48</text>
    <rect x="220" y="70" width="66" height="96" class="ps sb"/><text x="253" y="100" class="lg b p">X</text><text x="253" y="150" class="lg b">76</text>
    <rect x="288" y="70" width="66" height="96" class="ps sb"/><text x="321" y="100" class="lg b p">X</text><text x="321" y="150" class="lg b">95</text>
    <rect x="356" y="70" width="66" height="96" class="sf sb"/><text x="389" y="100" class="lg b">8 1</text><text x="389" y="150" class="lg b">104</text>
    <rect x="424" y="70" width="66" height="96" class="sf sb"/><text x="457" y="100" class="lg b">6 /</text><text x="457" y="150" class="lg b">124</text>
    <rect x="492" y="70" width="66" height="96" class="ps sb"/><text x="525" y="100" class="lg b p">X</text><text x="525" y="150" class="lg b">143</text>
    <rect x="560" y="70" width="66" height="96" class="sf sb"/><text x="593" y="100" class="lg b">7 2</text><text x="593" y="150" class="lg b">152</text>
    <rect x="628" y="70" width="76" height="96" class="oks sb"/><text x="666" y="100" class="lg b">X 9 /</text><text x="666" y="150" class="lg b">172</text>
  </g>
  <line x1="16" y1="116" x2="704" y2="116" class="sb" fill="none"/>
  <rect x="16" y="190" width="340" height="96" rx="10" class="sf sb"/>
  <text x="32" y="216" class="b">Strike (4. frame)</text>
  <text x="32" y="242" class="sm">10 + sonraki iki atış (X ve 8)</text>
  <text x="32" y="266" class="sm">10 + 10 + 8 = <tspan class="b p">28</tspan> → 48 + 28 = 76</text>
  <rect x="364" y="190" width="340" height="96" rx="10" class="sf sb"/>
  <text x="380" y="216" class="b">Spare (7. frame)</text>
  <text x="380" y="242" class="sm">10 + sonraki ilk atış (X)</text>
  <text x="380" y="266" class="sm">10 + 10 = <tspan class="b p">20</tspan> → 104 + 20 = 124</text>
  <rect x="16" y="302" width="688" height="82" rx="10" class="ps"/>
  <text x="32" y="328" class="b">10. frame: X 9 / = 10 + 9 + 1 = 20</text>
  <text x="32" y="352" class="sm">Strike yapıldığı için iki ek atış hakkı doğdu; ek atışlar yalnızca bonusu tamamlar.</text>
  <text x="32" y="372" class="sm">Mükemmel oyun: 12 ardışık strike → her frame 30 → 300 puan.</text>
</svg>`
  },
  sections: [
    {
      h: "Bowling puanlamasının temel kuralları",
      p: [
        "Onlu bowlingde bir oyun 10 frame'den oluşur. Her frame'de oyuncu, üçgen biçiminde dizilmiş 10 lobutu devirmek için en fazla iki atış yapar. İlk atışta tüm lobutlar devrilirse frame orada biter. Devrilen her lobut bir puandır; ama asıl farkı strike ve spare bonusları yaratır.",
        "Bonus sistemi, iyi atışları ödüllendirmek için tasarlanmıştır: tüm lobutları devirmek yalnızca 10 puan değil, sonraki atışlarınızın da o frame'e eklenmesi demektir. Bu nedenle art arda strike yapmak puanı hızla katlar ve bir frame'de alınabilecek en yüksek puan 30'a çıkar.",
        "Skor tablosunda kullanılan işaretler standarttır: <strong>X</strong> strike, <strong>/</strong> spare, <strong>-</strong> ıskalama (o atışta lobut devrilmedi), <strong>F</strong> faul (çizgi aşıldı, atış 0 sayılır). Rakamlar ise o atışta devrilen lobut sayısını gösterir."
      ]
    },
    {
      h: "Strike ve spare bonusları nasıl eklenir?",
      table: {
        head: ["Frame türü", "İşaret", "Frame puanı", "Örnek"],
        rows: [
          ["Açık frame", "8 1", "İki atışta devrilen lobut", "8 + 1 = 9"],
          ["Spare", "7 /", "10 + sonraki ilk atış", "7 / ardından 9 → 10 + 9 = 19"],
          ["Strike", "X", "10 + sonraki iki atış", "X ardından 8 1 → 10 + 8 + 1 = 19"],
          ["Strike ardından strike", "X X", "10 + 10 + sonraki atış", "X X 8 → 10 + 10 + 8 = 28"],
          ["Üç ardışık strike", "X X X", "10 + 10 + 10", "30 (en yüksek frame puanı)"]
        ]
      },
      formula: "Açık frame = a + b\nSpare = 10 + sonraki 1 atış\nStrike = 10 + sonraki 2 atış",
      after: [
        "Bonus için atışlar sayılır, frame'ler değil. Strike'tan sonraki iki atış, sonraki frame'in iki atışı olabileceği gibi, sonraki frame de strike ise o strike ve ondan sonraki frame'in ilk atışı olur. Bu küçük ayrıntı, ardışık strike'larda puanın neden bu kadar hızlı arttığını açıklar."
      ]
    },
    {
      h: "Çözümlü örnek: frame frame 172 puan",
      p: [
        "Atışlar şöyle olsun: <strong>X | 7 / | 9 - | X | X | 8 1 | 6 / | X | 7 2 | X 9 /</strong>. Her frame'in puanını ve birikimli toplamı adım adım hesaplayalım."
      ],
      table: {
        head: ["Frame", "Atışlar", "Hesap", "Frame puanı", "Toplam"],
        rows: [
          ["1", "X", "10 + 7 + 3 (sonraki iki atış)", "20", "20"],
          ["2", "7 /", "10 + 9 (sonraki ilk atış)", "19", "39"],
          ["3", "9 -", "9 + 0", "9", "48"],
          ["4", "X", "10 + 10 + 8", "28", "76"],
          ["5", "X", "10 + 8 + 1", "19", "95"],
          ["6", "8 1", "8 + 1", "9", "104"],
          ["7", "6 /", "10 + 10 (sonraki atış strike)", "20", "124"],
          ["8", "X", "10 + 7 + 2", "19", "143"],
          ["9", "7 2", "7 + 2", "9", "152"],
          ["10", "X 9 /", "10 + 9 + 1", "20", "172"]
        ],
        caption: "Toplam 172 puan. 1. frame'in puanı ancak 2. frame'in iki atışı yapıldıktan sonra yazılabilir."
      },
      after: [
        "Bu örnekte 5 strike ve 3 spare (10. frame dahil) vardır. Bonusları çıkarıp yalnızca devrilen lobutları toplasaydık 10 frame'de çok daha düşük bir sayı bulurduk; aradaki fark bonusların gücünü gösterir. Kendi oyununuzu hesaplamak için atışlarınızı [[arac:bowling-puani-hesapla|Bowling Puanı Hesaplama aracına]] X, / ve rakamlarla yazmanız yeterlidir; araç her frame'in toplamını ayrı ayrı gösterir."
      ]
    },
    {
      h: "10. frame'de neden ekstra atış hakkı vardır?",
      p: [
        "İlk dokuz frame'de strike ve spare bonusu, sonraki frame'lerin atışlarından gelir. 10. frame'den sonra ise başka frame yoktur. Bu frame'de strike ya da spare yapan oyuncunun bonusu yarım kalmasın diye ek atış hakkı tanınır. Ek atışlar yeni bir frame değildir; yalnızca 10. frame'in bonusunu tamamlar."
      ],
      ul: [
        "<strong>10. frame'de açık frame:</strong> İki atış yapılır, oyun biter. Örnek: 7 2 → 9 puan.",
        "<strong>10. frame'de spare:</strong> Bir ek atış yapılır. Örnek: 6 / 8 → 10 + 8 = 18 puan.",
        "<strong>10. frame'de strike:</strong> İki ek atış yapılır. Örnek: X 9 / → 10 + 9 + 1 = 20; X X X → 30 puan."
      ],
      after: [
        "Bu nedenle 10. frame'de en fazla üç atış yapılır. Strike sonrasındaki ek atışlarda lobutlar yeniden dizilir; ilk ek atışta strike yapılmazsa ikinci ek atış kalan lobutlara yapılır ve ikisinin toplamı 10'u geçemez."
      ]
    },
    {
      h: "En yüksek bowling puanı neden 300'dür?",
      p: [
        "Bir frame'in alabileceği en yüksek puan, strike'ın kendi 10 puanı ile sonraki iki atışın da strike olmasıyla gelen 20 bonus puanın toplamıdır: 30. On frame'in her birinden 30 alındığında toplam 10 × 30 = <strong>300</strong> olur.",
        "Bunun için kaç strike gerektiğini sayalım: ilk 9 frame'de 9 strike, 10. frame'de bir strike ve bu strike'ın bonusu için iki ek atışta iki strike daha. Toplam <strong>12 ardışık strike</strong>. Tek bir atışta bile 9 lobut devrilse mükemmel oyun bozulur; son atışta 9 lobut devrilirse puan 299 olur."
      ],
      table: {
        head: ["Senaryo", "Puan"],
        rows: [
          ["12 ardışık strike", "300"],
          ["11 strike, son atış 9 lobut", "299"],
          ["Her frame'de 9 / ve son ek atış 9 (tümü spare)", "190"],
          ["Her frame'de 9 - (hiç bonus yok)", "90"],
          ["Her frame'de 4 4", "80"]
        ],
        caption: "Tümü spare olan bir oyunda her frame 10 + 9 = 19 puan verir; 10 × 19 = 190."
      }
    },
    {
      h: "Ardışık strike'lar puanı nasıl katlar?",
      p: [
        "Art arda yapılan strike'lar, her birinin bonusunu bir sonrakine bağlar. İki ardışık strike'tan ilki 10 + 10 + (üçüncü atış) puan alır; üç ardışık strike'ın ilki ise tam 30 puan alır. Bowling dilinde iki ardışık strike'a \"double\", üç ardışık strike'a \"turkey\" denir.",
        "Bunu sayılarla görelim. Bir oyuncu 1., 2. ve 3. frame'lerde strike, 4. frame'de 8 1 yapsın. 1. frame: 10 + 10 + 10 = 30. 2. frame: 10 + 10 + 8 = 28. 3. frame: 10 + 8 + 1 = 19. 4. frame: 9. Dört frame sonunda toplam 86'dır. Aynı oyuncu bu dört frame'de hiç strike yapmayıp her seferinde 9 lobut devirseydi toplam 36 olurdu."
      ]
    },
    {
      h: "Bowling skor tablosu nasıl okunur?",
      p: [
        "Elektronik skor ekranları ve kâğıt tablolar aynı düzeni kullanır. Her frame bir kutudur; kutunun üst kısmında atış işaretleri, alt kısmında o frame'e kadar olan birikimli toplam yazılır. Strike ve spare yapılan frame'lerin toplamı, bonus atışları yapılana kadar boş bırakılır."
      ],
      ol: [
        "Üst satırdaki işaretleri okuyun: X strike, / spare, - ıskalama, F faul, rakam devrilen lobut sayısı.",
        "Alt satırdaki sayı, o frame dahil tüm frame'lerin toplamıdır; frame puanını bulmak için bir öncekinden çıkarın.",
        "Boş toplam kutusu, o frame'in bonusunun henüz tamamlanmadığını gösterir.",
        "10. kutuda üç atış yeri vardır; ek atışlar yalnızca strike ya da spare yapıldıysa kullanılır."
      ]
    },
    {
      h: "Ortalama bir amatör kaç puan yapar? Grup oyunlarında puan tutma",
      p: [
        "Kesin bir ortalama vermek zordur; puan, deneyime, top ağırlığına ve pist yağlama koşullarına göre çok değişir. Genel bir gözlem olarak ara sıra oynayan kişiler çoğunlukla 80 ile 150 arasında puan yapar, düzenli oynayan amatörler 150–180 aralığına çıkabilir. Lig ve turnuvalarda oyuncular arasındaki farkı dengelemek için \"handikap\" adı verilen ek puan sistemleri kullanılır.",
        "Arkadaş grubuyla oynarken her oyunu ayrı tutup sonunda toplam ve ortalama almak en adil yöntemdir. Birden çok oyun ve oyuncunun toplamını, ortalamasını ve sıralamasını görmek için [[arac:oyun-puan-tablosu|Oyun Puan Tablosu Hesaplama aracını]] kullanabilirsiniz. Takımları rastgele kurmak isterseniz [[bilgi:rastgele-takim-nasil-olusturulur|rastgele takım oluşturma]] yazısı, ortalama hesabının farklı türleri için [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Sık yapılan hesap hataları",
      ul: [
        "<strong>Strike bonusunu sonraki frame olarak saymak:</strong> Bonus, sonraki iki frame değil, sonraki iki <em>atıştır</em>.",
        "<strong>Spare'e iki atış bonus eklemek:</strong> Spare yalnızca sonraki ilk atışı ekler.",
        "<strong>10. frame'deki ek atışları ayrı frame saymak:</strong> Ek atışlar yalnızca 10. frame'in bonusudur, kendi bonusları yoktur.",
        "<strong>Faul atışını unutmak:</strong> Faul yapılan atış 0 sayılır ama atış hakkı kullanılmış olur.",
        "<strong>Frame toplamını erken yazmak:</strong> Strike ve spare frame'lerinin toplamı bonus atışlar yapılmadan kesinleşmez."
      ]
    }
  ],
  faq: [
    ["Bowling puanı nasıl hesaplanır?", "On frame boyunca devrilen lobutlar toplanır; strike yapılan frame'e sonraki iki atış, spare yapılan frame'e sonraki bir atış bonus olarak eklenir. Her frame'in puanı birikimli toplam olarak skor tablosuna yazılır."],
    ["Strike ve spare bonusları nasıl eklenir?", "Strike, ilk atışta 10 lobutu devirmektir ve frame puanı 10 artı sonraki iki atıştır. Spare, iki atışta 10 lobutu devirmektir ve frame puanı 10 artı sonraki ilk atıştır."],
    ["10. frame'de neden ekstra atış hakkı vardır?", "Son frame'den sonra bonus atışlarını sağlayacak başka frame olmadığı için strike yapan oyuncuya iki, spare yapan oyuncuya bir ek atış verilir. Bu atışlar yalnızca 10. frame'in bonusunu tamamlar."],
    ["En yüksek bowling puanı neden 300'dür?", "Bir frame en fazla 30 puan alabilir: strike'ın 10 puanı ve sonraki iki strike'tan gelen 20 bonus. On frame'in her birinden 30 alındığında toplam 300 olur; bunun için 12 ardışık strike gerekir."],
    ["Ortalama bir amatör kaç puan yapar?", "Kesin bir değer yoktur, ama ara sıra oynayanlar çoğunlukla 80 ile 150 arasında puan yapar. Düzenli oynayan amatörler 150–180 aralığına çıkabilir; pist koşulları ve top seçimi sonucu belirgin biçimde etkiler."],
    ["Ardışık strike'lar puanı nasıl katlar?", "Her strike'ın bonusu sonraki atışlardan gelir; art arda strike yapıldığında bonuslar da strike olur. Üç ardışık strike'ın ilki 30 puan alır ve toplam, aynı frame'lerde 9 lobut devirmeye göre iki katından fazla olabilir."],
    ["Bowling skor tablosu nasıl okunur?", "Her kutunun üstünde atış işaretleri (X, /, -, rakam), altında o frame dahil birikimli toplam yazılır. Strike ve spare frame'lerinin toplamı bonus atışlar yapılana kadar boş kalır."],
    ["Grup oyunlarında puan nasıl tutulur?", "Her oyuncunun her oyunu ayrı hesaplanır, sonra toplam ve ortalama karşılaştırılır. Oyun Puan Tablosu aracı oyuncuların tur puanlarından toplamı, ortalamayı ve sıralamayı tek ekranda gösterir."],
    ["Bowlingde faul olursa ne olur?", "Atış sırasında faul çizgisi aşılırsa o atışta devrilen lobutlar sayılmaz ve atış 0 olarak yazılır, skor tablosunda F ile gösterilir. Atış hakkı kullanılmış sayılır."]
  ],
  tools: ["bowling-puani-hesapla", "oyun-puan-tablosu"],
  related: ["rastgele-takim-nasil-olusturulur", "ortalama-medyan-mod-nedir", "gol-averaji-nasil-hesaplanir-lig-fiksturu"],
  sources: [
    ["World Bowling – Uluslararası bowling federasyonu", "https://www.worldbowling.org/"]
  ]
};
