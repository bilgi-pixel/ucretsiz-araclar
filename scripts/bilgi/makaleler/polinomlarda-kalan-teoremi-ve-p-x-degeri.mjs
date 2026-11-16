export default {
  slug: "polinomlarda-kalan-teoremi-ve-p-x-degeri",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Polinomlarda Kalan Teoremi: P(x) Değeri ve Horner Yöntemi Nasıl Uygulanır",
  pageTitle: "Kalan Teoremi ve Horner Yöntemi: P(x) Değeri Nasıl Bulunur?",
  description: "Kalan teoremi: P(x)'in x − a ile bölümünden kalan P(a)'dır. Polinom derecesi, P(1) katsayılar toplamı, P(0) sabit terim, Horner tablosu ve çözümlü örnekler.",
  keywords: ["kalan teoremi", "polinom değeri bulma", "horner yöntemi", "polinom bölmesi kalan", "p(x) hesaplama", "polinomun derecesi", "katsayılar toplamı p(1)", "sabit terim p(0)"],
  lead: "Kalan teoremine göre bir P(x) polinomunun <strong>x − a ile bölümünden kalan, P(a) değerine eşittir</strong>; yani bölme yapmadan, x yerine a yazarak kalanı bulursunuz. Örneğin P(x) = 2x³ − 3x² + 4x − 5 polinomunun x − 2 ile bölümünden kalan P(2) = 7'dir. Horner yöntemi bu değeri az işlemle hesaplar ve aynı anda bölüm polinomunu da verir. Bu yazıda polinom ve derece kavramını, P(1) ile P(0)'ın anlamını, Horner tablosunu, kök denemesiyle çarpanlara ayırmayı ve 10-11. sınıf düzeyinde çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Kalan teoremi: P(x) ÷ (x − a) işleminde kalan P(a)'dır; kalan sıfırsa x − a bir çarpandır.",
    "Bölen ax − b ise kalan P(b ÷ a)'dır: 2x − 1 ile bölümde x = 1/2 yazılır.",
    "P(1) tüm katsayıların toplamını, P(0) sabit terimi, P(−1) çift dereceli terimlerin katsayıları toplamından tek dereceliler toplamının farkını verir.",
    "Derece, sıfırdan farklı katsayılı en büyük üstür: 2x³ − 3x² + 4x − 5 üçüncü derecedendir.",
    "Horner yönteminde katsayılar sırayla yazılır; her adımda önceki sonuç a ile çarpılıp sonraki katsayıya eklenir; son sayı kalandır.",
    "Örnek: 2x³ − 3x² + 4x − 5 için x = 2 Horner satırı 2, 1, 6, 7'dir; bölüm 2x² + x + 6, kalan 7."
  ],
  figure: {
    alt: "Horner tablosu: P(x) = 2x³ − 3x² + 4x − 5 katsayıları 2, −3, 4, −5; x = 2 için ara çarpımlar 4, 2, 12; alt satır 2, 1, 6, 7. Bölüm 2x² + x + 6, kalan 7.",
    caption: "Horner tablosunda ilk katsayı aşağı indirilir; her sonuç 2 ile çarpılıp sağdaki katsayının altına yazılır ve toplanır. Son kutu kalanı, öncekiler bölüm polinomunun katsayılarını verir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="hk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="a"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Horner yöntemi: P(2) = ?</text>
  <text x="360" y="54" class="mid">P(x) = 2x³ − 3x² + 4x − 5</text>
  <rect x="40" y="78" width="70" height="200" rx="8" class="ps"/>
  <text x="75" y="118" class="lg b mid p">a = 2</text>
  <g class="mid">
    <text x="190" y="118" class="lg b">2</text>
    <text x="320" y="118" class="lg b">−3</text>
    <text x="450" y="118" class="lg b">4</text>
    <text x="580" y="118" class="lg b">−5</text>
    <text x="320" y="178" class="lg">+4</text>
    <text x="450" y="178" class="lg">+2</text>
    <text x="580" y="178" class="lg">+12</text>
  </g>
  <line x1="130" y1="200" x2="660" y2="200" class="st sw" fill="none"/>
  <g class="mid">
    <rect x="160" y="214" width="60" height="44" rx="6" class="sf sb"/><text x="190" y="243" class="lg b">2</text>
    <rect x="290" y="214" width="60" height="44" rx="6" class="sf sb"/><text x="320" y="243" class="lg b">1</text>
    <rect x="420" y="214" width="60" height="44" rx="6" class="sf sb"/><text x="450" y="243" class="lg b">6</text>
    <rect x="550" y="214" width="60" height="44" rx="6" class="p"/><text x="580" y="243" class="lg b sf">7</text>
  </g>
  <line x1="215" y1="222" x2="300" y2="168" class="sa" fill="none" marker-end="url(#hk)"/>
  <line x1="345" y1="222" x2="430" y2="168" class="sa" fill="none" marker-end="url(#hk)"/>
  <line x1="475" y1="222" x2="560" y2="168" class="sa" fill="none" marker-end="url(#hk)"/>
  <text x="258" y="186" class="sm mid t2">×2</text><text x="388" y="186" class="sm mid t2">×2</text><text x="518" y="186" class="sm mid t2">×2</text>
  <rect x="40" y="296" width="430" height="84" rx="10" class="sf sb"/>
  <text x="60" y="324" class="b">Bölüm: 2x² + x + 6</text>
  <text x="60" y="352" class="sm t2">Kontrol: (x − 2)(2x² + x + 6) + 7 = P(x)</text>
  <rect x="490" y="296" width="190" height="84" rx="10" class="ps"/>
  <text x="585" y="328" class="b mid">Kalan = P(2)</text>
  <text x="585" y="362" class="xl mid p">7</text>
</svg>`
  },
  sections: [
    {
      h: "Polinom nedir, derecesi nasıl bulunur?",
      p: [
        "Polinom, değişkenin yalnızca doğal sayı (0, 1, 2, 3…) üslerini içeren ve bu terimlerin katsayılarla çarpılıp toplandığı ifadedir. Genel biçimi P(x) = a<sub>n</sub>x<sup>n</sup> + a<sub>n−1</sub>x<sup>n−1</sup> + … + a<sub>1</sub>x + a<sub>0</sub> şeklindedir. Burada a<sub>n</sub>, a<sub>n−1</sub>, … katsayılar, a<sub>0</sub> ise sabit terimdir.",
        "Bir ifadenin polinom olması için değişkenin üssü negatif ya da kesirli olmamalı, değişken paydada ya da kök içinde bulunmamalıdır. Örneğin 3x² − x + 7 bir polinomdur; 2/x + 1 ya da √x + 3 polinom değildir. Polinomun <strong>derecesi</strong>, katsayısı sıfırdan farklı olan en büyük üstür ve der[P(x)] biçiminde gösterilir. En büyük dereceli terimin katsayısına <strong>baş katsayı</strong> denir.",
        "Örnek: P(x) = 2x³ − 3x² + 4x − 5 polinomunun derecesi 3, baş katsayısı 2, sabit terimi −5'tir. Sabit polinomun (örneğin P(x) = 7) derecesi 0'dır; sıfır polinomunun derecesi tanımsız kabul edilir."
      ]
    },
    {
      h: "P(a) değeri nasıl hesaplanır?",
      p: [
        "P(a), polinomda x gördüğünüz her yere a yazıp işlemi yapmak demektir. Örneğin P(x) = 2x³ − 3x² + 4x − 5 için P(2) = 2·8 − 3·4 + 4·2 − 5 = 16 − 12 + 8 − 5 = 7 olur. Negatif sayılarda parantez kullanmak hataları önler: P(−1) = 2·(−1)³ − 3·(−1)² + 4·(−1) − 5 = −2 − 3 − 4 − 5 = −14.",
        "Derece büyüdükçe doğrudan yerine koyma uzar ve üs hesaplarında hata yapma ihtimali artar. Bu yüzden özellikle büyük sayılarda ya da yüksek derecelerde Horner yöntemi tercih edilir. Katsayılarını yazdığınız bir polinomun değerini adım adım görmek için [[arac:polinom-deger-hesapla|Polinom Değeri Hesaplama]] aracı Horner yöntemiyle P(x), türev değeri ve dereceyi birlikte gösterir."
      ]
    },
    {
      h: "Kalan teoremi nedir?",
      p: [
        "Bölme algoritmasına göre her P(x) polinomu, bir bölen polinomla şöyle yazılabilir: P(x) = B(x) · Q(x) + K(x). Burada B(x) bölen, Q(x) bölüm, K(x) kalandır ve kalanın derecesi bölenin derecesinden küçüktür. Bölen x − a gibi birinci dereceden olduğunda kalan sabit bir sayıdır.",
        "Bu eşitlikte x yerine a yazılırsa bölen sıfır olur: P(a) = (a − a) · Q(a) + K = K. Demek ki kalan, polinomun a noktasındaki değerinden başka bir şey değildir. Teoremin en önemli sonucu <strong>çarpan teoremi</strong>dir: P(a) = 0 ise kalan sıfırdır ve x − a, P(x)'in bir çarpanıdır; a da polinomun bir köküdür."
      ],
      formula: "P(x) = (x − a) · Q(x) + K  →  K = P(a)\nBölen ax − b ise: kalan = P(b ÷ a)\nP(a) = 0  ⇔  (x − a), P(x)'in çarpanıdır",
      table: {
        head: ["Bölen", "Sıfır yapan x", "Kalan", "P(x) = 2x³ − 3x² + 4x − 5 için"],
        rows: [
          ["x − 2", "x = 2", "P(2)", "7"],
          ["x + 1", "x = −1", "P(−1)", "−14"],
          ["x − 1", "x = 1", "P(1)", "−2"],
          ["x", "x = 0", "P(0)", "−5"],
          ["2x − 1", "x = 1/2", "P(1/2)", "−3,5"]
        ]
      }
    },
    {
      h: "Horner yöntemi adım adım nasıl uygulanır?",
      p: [
        "Horner yöntemi, polinomu iç içe çarpımlar biçiminde yazarak değer hesaplamayı ve x − a ile bölmeyi aynı anda yapan pratik bir tablodur. P(x) = 2x³ − 3x² + 4x − 5 polinomu iç içe yazıldığında ((2x − 3)x + 4)x − 5 olur; tablo bu işlemi sırayla yapar."
      ],
      ol: [
        "Katsayıları en yüksek dereceden sabit terime doğru sırayla yazın: 2, −3, 4, −5. Eksik derece varsa yerine 0 koyun (x³ + 1 için 1, 0, 0, 1).",
        "Sol tarafa a değerini yazın: a = 2.",
        "İlk katsayıyı olduğu gibi aşağı indirin: 2.",
        "İndirilen sayıyı a ile çarpın ve bir sonraki katsayının altına yazın: 2 × 2 = 4; −3 + 4 = 1.",
        "Aynı işlemi tekrarlayın: 1 × 2 = 2; 4 + 2 = 6. Sonra 6 × 2 = 12; −5 + 12 = 7.",
        "Alt satırdaki son sayı kalan ve P(a) değeridir: 7. Önceki sayılar (2, 1, 6) bölüm polinomunun katsayılarıdır: Q(x) = 2x² + x + 6."
      ],
      after: [
        "Sonucu kontrol etmek için çarpımı geri açın: (x − 2)(2x² + x + 6) + 7 = 2x³ + x² + 6x − 4x² − 2x − 12 + 7 = 2x³ − 3x² + 4x − 5. Eksik derece koymayı unutmak Horner'da en sık yapılan hatadır; sıfır katsayıyı atlarsanız tüm satır kayar."
      ]
    },
    {
      h: "Katsayılar toplamı neden P(1)'e, sabit terim neden P(0)'a eşittir?",
      p: [
        "x = 1 yazıldığında her x<sup>k</sup> terimi 1 olur ve geriye yalnızca katsayılar kalır. Bu yüzden P(1), tüm katsayıların toplamıdır. Örnekte P(1) = 2 − 3 + 4 − 5 = −2'dir. Aynı mantıkla x = 0 yazıldığında x içeren tüm terimler sıfırlanır ve yalnızca sabit terim kalır: P(0) = −5.",
        "x = −1 yazıldığında ise çift dereceli terimler pozitif, tek dereceli terimler negatif işaret alır. Böylece P(−1), çift dereceli terimlerin katsayıları toplamından tek dereceli terimlerin katsayıları toplamının çıkarılmasıyla elde edilir. Bu iki değeri kullanarak sınavlarda sık sorulan \"çift dereceli terimlerin katsayıları toplamı\" sorusu çözülür."
      ],
      formula: "Katsayılar toplamı = P(1)\nSabit terim = P(0)\nÇift dereceli katsayılar toplamı = (P(1) + P(−1)) ÷ 2\nTek dereceli katsayılar toplamı = (P(1) − P(−1)) ÷ 2",
      after: [
        "Örnek: P(1) = −2 ve P(−1) = −14 ise çift dereceli katsayılar toplamı (−2 − 14) ÷ 2 = −8'dir. Gerçekten de çift dereceli terimler −3x² ve −5'tir; −3 + (−5) = −8. Tek dereceliler toplamı (−2 + 14) ÷ 2 = 6'dır: 2 + 4 = 6."
      ]
    },
    {
      h: "Kalan teoremiyle çözülen tipik sınav soruları",
      ol: [
        "<strong>Bilinmeyen katsayı bulma:</strong> P(x) = x³ + ax² − 4x + 3 polinomunun x − 1 ile bölümünden kalan 5 ise a kaçtır? Kalan P(1) = 1 + a − 4 + 3 = a olur; a = 5'tir.",
        "<strong>Birinci dereceden olmayan bölen:</strong> P(x) = 2x³ − 3x² + 4x − 5 polinomunun 2x − 1 ile bölümünden kalan P(1/2) = 0,25 − 0,75 + 2 − 5 = −3,5'tir.",
        "<strong>Çarpan kontrolü:</strong> x − 3, Q(x) = x³ − 6x² + 11x − 6 polinomunun çarpanı mıdır? Q(3) = 27 − 54 + 33 − 6 = 0 olduğu için evet.",
        "<strong>Bileşik ifade:</strong> P(x + 1) polinomunun x − 2 ile bölümünden kalan P(3)'tür, çünkü x = 2 yazıldığında içerideki ifade 3 olur."
      ],
      after: [
        "Bu tür sorularda ilk adım her zaman böleni sıfır yapan değeri bulmaktır. Bilinmeyen katsayılı sorularda oluşan denklemi çözmek için [[arac:denklem-cozucu|Denklem Çözücü]] aracı birinci ve ikinci dereceden denklemleri adım adım gösterir. İki bilinmeyenli katsayı sorularında [[bilgi:iki-bilinmeyenli-denklem-nasil-cozulur|iki bilinmeyenli denklem]] yöntemleri kullanılır."
      ]
    },
    {
      h: "Çarpanlara ayırmada kök denemesi nasıl yapılır?",
      p: [
        "Tam sayı katsayılı bir polinomun rasyonel kökleri, sabit terimin bölenlerinin baş katsayının bölenlerine bölünmesiyle elde edilen sayılar arasından çıkar. Baş katsayı 1 ise kök adayları doğrudan sabit terimin bölenleridir. Bu adayları tek tek polinomda yerine koyarak P(a) = 0 yapanlar bulunur; her bulunan kök için Horner ile bölünerek polinomun derecesi düşürülür.",
        "Örnek: Q(x) = x³ − 6x² + 11x − 6 için sabit terim −6'nın bölenleri ±1, ±2, ±3, ±6'dır. Q(1) = 1 − 6 + 11 − 6 = 0, demek ki x − 1 bir çarpandır. Horner ile bölünce x² − 5x + 6 kalır; bu da (x − 2)(x − 3) biçiminde çarpanlarına ayrılır. Sonuç: Q(x) = (x − 1)(x − 2)(x − 3).",
        "Sabit terimin bölenlerini hızlıca listelemek için [[arac:asal-carpan-hesapla|Asal Çarpan Hesaplama]] aracı bir sayının tüm bölenlerini verir. İkinci dereceden kalan çarpan doğrudan çarpanlarına ayrılamıyorsa kökleri diskriminantla bulabilirsiniz; yöntem [[bilgi:diskriminant-ikinci-derece-denklem|diskriminant ve ikinci derece denklem]] yazısında anlatılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Eksik dereceyi atlamak:</strong> Horner tablosunda x² terimi yoksa yerine 0 yazılmalıdır.",
        "<strong>İşareti karıştırmak:</strong> x + 3 ile bölümde a = −3'tür; x − (−3) olarak düşünün.",
        "<strong>ax − b bölenini x − b sanmak:</strong> 2x − 1 ile bölümde x = 1/2 yazılır, x = 1 değil.",
        "<strong>Bölüm ile kalanı karıştırmak:</strong> Horner'ın son kutusu kalandır; önceki kutular bölümün katsayılarıdır ve bir derece düşüktür.",
        "<strong>Negatif sayıların üssünü yanlış almak:</strong> (−1)² = 1, (−1)³ = −1; parantezsiz −1² yazmak hata kaynağıdır."
      ],
      after: [
        "Kendinizi sınamak için şu soruyu deneyin: P(x) = x⁴ − 2x² + x + 1 polinomunun x + 2 ile bölümünden kalan kaçtır? Katsayıları 1, 0, −2, 1, 1 olarak yazıp a = −2 ile Horner uygulayın: 1, −2, 2, −3, 7. Kalan 7'dir; doğrudan yerine koyma da 16 − 8 − 2 + 1 = 7 sonucunu verir."
      ]
    }
  ],
  faq: [
    ["Polinom nedir, derecesi nasıl bulunur?", "Polinom, değişkenin yalnızca doğal sayı üslerini içeren ve katsayılı terimlerin toplamından oluşan ifadedir. Derecesi, katsayısı sıfırdan farklı olan en büyük üstür; 2x³ − 3x² + 4x − 5 polinomunun derecesi üçtür."],
    ["P(2) gibi bir polinom değeri nasıl hesaplanır?", "Polinomda x görülen her yere 2 yazılıp işlem yapılır. 2x³ − 3x² + 4x − 5 için 16 − 12 + 8 − 5 = 7 bulunur. Yüksek derecelerde Horner yöntemi daha az işlemle aynı sonuca ulaştırır."],
    ["Kalan teoremi nedir?", "Kalan teoremine göre P(x) polinomunun x − a ile bölümünden kalan P(a) değerine eşittir. Böylece bölme yapmadan kalan bulunur. Kalan sıfır çıkarsa x − a polinomun bir çarpanı, a da bir köküdür."],
    ["Polinomun x − a ile bölümünden kalan nasıl bulunur?", "Böleni sıfır yapan x değeri, yani a bulunur ve polinomda yerine yazılır. Bölen ax − b biçimindeyse x yerine b bölü a yazılır. Örneğin 2x − 1 ile bölümde kalan P(1/2) olur."],
    ["Horner yöntemi nasıl uygulanır?", "Katsayılar sırayla yazılır, eksik dereceler için sıfır konur. İlk katsayı aşağı indirilir, her sonuç a ile çarpılıp sonraki katsayıya eklenir. Alt satırdaki son sayı kalanı, öncekiler bölüm polinomunun katsayılarını verir."],
    ["Katsayılar toplamı neden P(1)'e eşittir?", "x yerine 1 yazıldığında her x üssü terimi 1 olur ve geriye yalnızca katsayılar kalır. Bu yüzden P(1) tüm katsayıların toplamını verir. 2x³ − 3x² + 4x − 5 için P(1) = −2'dir."],
    ["Sabit terim neden P(0)'dır?", "x yerine sıfır yazıldığında x içeren bütün terimler sıfırlanır ve yalnızca sabit terim kalır. Bu nedenle P(0) her zaman polinomun sabit terimine eşittir; örnekteki polinom için P(0) = −5'tir."],
    ["Çarpanlara ayırmada kök denemesi nasıl yapılır?", "Sabit terimin bölenleri baş katsayının bölenlerine bölünerek rasyonel kök adayları listelenir. Adaylar polinomda yerine konur; sıfır verenler köktür. Her kök için Horner ile bölünüp derece düşürülür ve kalan polinom çarpanlarına ayrılır."]
  ],
  tools: ["polinom-deger-hesapla", "denklem-cozucu", "asal-carpan-hesapla"],
  related: ["diskriminant-ikinci-derece-denklem", "iki-bilinmeyenli-denklem-nasil-cozulur"],
  sources: [
    ["Milli Eğitim Bakanlığı – Ortaöğretim matematik öğretim programı", "https://mufredat.meb.gov.tr/"],
    ["MEB Eğitim Bilişim Ağı (EBA)", "https://www.eba.gov.tr/"]
  ]
};
