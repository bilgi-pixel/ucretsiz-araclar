export default {
  slug: "diskriminant-ikinci-derece-denklem",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Diskriminant Nedir? İkinci Dereceden Denklemin Kökleri Nasıl Bulunur",
  pageTitle: "Diskriminant (Δ = b² − 4ac) Nedir? Kökler Nasıl Bulunur",
  description: "Diskriminant Δ = b² − 4ac, ax² + bx + c = 0 denkleminin kaç gerçek kökü olduğunu gösterir. Kök formülü, kökler toplamı ve çarpımı, karmaşık kökler ve örnekler.",
  keywords: ["diskriminant nedir", "delta formülü", "b2-4ac", "ikinci dereceden denklem çözümü", "kökler toplamı çarpımı", "çift katlı kök", "karmaşık kökler", "denklem çözücü"],
  lead: "Diskriminant, ax² + bx + c = 0 biçimindeki ikinci dereceden bir denklemde <strong>Δ = b² − 4ac</strong> ile hesaplanan ve denklemin kaç gerçek kökü olduğunu gösteren sayıdır. Δ pozitifse iki farklı gerçek kök, sıfırsa çakışık (çift katlı) tek kök vardır; negatifse gerçek kök yoktur, kökler karmaşık sayıdır. Kökler x = (−b ± √Δ) ÷ 2a formülüyle bulunur. Bu sayfada formülü, kökler toplamı ve çarpımını, çarpanlara ayırmayı ve dört farklı durumu adım adım çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Diskriminant (delta): Δ = b² − 4ac; a, b ve c denklemin katsayılarıdır ve a ≠ 0 olmalıdır.",
    "Δ > 0 ise iki farklı gerçek kök, Δ = 0 ise çakışık iki kök (çift katlı kök), Δ < 0 ise gerçek kök yoktur.",
    "Kök formülü: x₁,₂ = (−b ± √Δ) ÷ 2a.",
    "Kökler toplamı x₁ + x₂ = −b ÷ a, kökler çarpımı x₁ · x₂ = c ÷ a'dır; bu ilişkiler Δ'nın işaretinden bağımsızdır.",
    "Δ < 0 olduğunda kökler karmaşıktır: x = (−b ± i√(−Δ)) ÷ 2a.",
    "Parabolün tepe noktası (−b ÷ 2a, −Δ ÷ 4a) noktasıdır; Δ'nın işareti parabolün x eksenini kesip kesmediğini gösterir."
  ],
  figure: {
    alt: "Üç parabol yan yana: Δ büyüktür sıfır olduğunda parabol x eksenini iki noktada keser, Δ eşittir sıfır olduğunda tek noktada teğet olur, Δ küçüktür sıfır olduğunda x eksenini hiç kesmez. Altlarında örnek denklemler ve kökleri.",
    caption: "Diskriminantın işareti, y = ax² + bx + c parabolünün x eksenini kaç noktada kestiğini gösterir. Kesişme noktaları denklemin gerçek kökleridir; Δ < 0 olduğunda kesişme yoktur ve kökler karmaşık sayıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Δ'nın işareti = x eksenini kesme sayısı</text>
  <rect x="20" y="50" width="220" height="230" rx="10" class="sf sb"/>
  <rect x="250" y="50" width="220" height="230" rx="10" class="sf sb"/>
  <rect x="480" y="50" width="220" height="230" rx="10" class="sf sb"/>
  <g class="st" fill="none">
    <line x1="34" y1="200" x2="226" y2="200"/><line x1="264" y1="200" x2="456" y2="200"/><line x1="494" y1="200" x2="686" y2="200"/>
  </g>
  <path d="M86,133 Q130,327 174,133" class="sp sw" fill="none"/>
  <path d="M316,103 Q360,297 404,103" class="sp sw" fill="none"/>
  <path d="M546,73 Q590,267 634,73" class="sp sw" fill="none"/>
  <circle cx="105.5" cy="200" r="6" class="ok"/><circle cx="154.5" cy="200" r="6" class="ok"/>
  <circle cx="360" cy="200" r="6" class="a"/>
  <text x="130" y="76" class="lg b mid ok">Δ &gt; 0</text>
  <text x="360" y="76" class="lg b mid">Δ = 0</text>
  <text x="590" y="76" class="lg b mid dg">Δ &lt; 0</text>
  <text x="130" y="262" class="sm mid">iki farklı gerçek kök</text>
  <text x="360" y="262" class="sm mid">çakışık (çift katlı) kök</text>
  <text x="590" y="262" class="sm mid">gerçek kök yok</text>
  <rect x="20" y="296" width="220" height="110" rx="10" class="oks"/>
  <text x="130" y="322" class="b mid">x² − 5x + 6 = 0</text>
  <text x="130" y="348" class="sm mid">Δ = 25 − 24 = 1</text>
  <text x="130" y="372" class="sm mid">x = (5 ± 1) ÷ 2</text>
  <text x="130" y="396" class="b mid">x₁ = 3, x₂ = 2</text>
  <rect x="250" y="296" width="220" height="110" rx="10" class="ps"/>
  <text x="360" y="322" class="b mid">x² − 6x + 9 = 0</text>
  <text x="360" y="348" class="sm mid">Δ = 36 − 36 = 0</text>
  <text x="360" y="372" class="sm mid">x = 6 ÷ 2</text>
  <text x="360" y="396" class="b mid">x₁ = x₂ = 3</text>
  <rect x="480" y="296" width="220" height="110" rx="10" class="dgs"/>
  <text x="590" y="322" class="b mid">x² + 2x + 5 = 0</text>
  <text x="590" y="348" class="sm mid">Δ = 4 − 20 = −16</text>
  <text x="590" y="372" class="sm mid">x = (−2 ± 4i) ÷ 2</text>
  <text x="590" y="396" class="b mid">x = −1 ± 2i</text>
</svg>`
  },
  sections: [
    {
      h: "İkinci dereceden denklem ve diskriminant nedir?",
      p: [
        "a, b ve c gerçek sayılar ve a sıfırdan farklı olmak üzere <strong>ax² + bx + c = 0</strong> biçimindeki denklemlere ikinci dereceden bir bilinmeyenli denklem denir. a sıfır olsaydı x² terimi kaybolur ve denklem birinci dereceye düşerdi. Denklemi sağlayan x değerlerine <strong>kök</strong>, köklerin oluşturduğu kümeye çözüm kümesi denir.",
        "Diskriminant, Latince \"ayırt eden\" anlamına gelen bir kelimeden türemiştir ve Türkiye'de çoğunlukla <strong>delta</strong> (Δ) diye anılır. Adının da söylediği gibi kökleri bulmadan önce onların türünü ayırt eder: denklemin iki farklı gerçek kökü mü, tek bir çakışık kökü mü var, yoksa hiç gerçek kökü yok mu?"
      ],
      formula: "Δ = b² − 4ac\nx₁,₂ = (−b ± √Δ) ÷ 2a",
      after: [
        "Kök formülü, ax² + bx + c ifadesinin tam kareye tamamlanmasıyla elde edilir. Bu yüzden her ikinci dereceden denklemde çalışır; çarpanlara ayırmanın zor ya da imkânsız olduğu durumlarda bile sonuç verir."
      ]
    },
    {
      h: "Diskriminantın işaretine göre kökler",
      table: {
        head: ["Δ'nın değeri", "Kök sayısı ve türü", "Parabolün durumu", "Örnek"],
        rows: [
          ["Δ > 0", "İki farklı gerçek kök", "x eksenini iki noktada keser", "x² − 5x + 6 = 0"],
          ["Δ > 0 ve tam kare", "İki farklı rasyonel kök", "Çarpanlara ayrılabilir", "2x² + 3x − 2 = 0"],
          ["Δ = 0", "Çakışık iki kök (çift katlı)", "x eksenine teğettir", "x² − 6x + 9 = 0"],
          ["Δ < 0", "Gerçek kök yok, iki karmaşık kök", "x eksenini kesmez", "x² + 2x + 5 = 0"]
        ],
        caption: "Katsayılar tam sayı ve Δ bir tam kare ise kökler rasyonel olur; Δ pozitif ama tam kare değilse kökler köklü (irrasyonel) sayılardır."
      },
      after: [
        "Δ'nın işareti hakkında kısa bir ipucu: a ile c ters işaretliyse −4ac pozitif olur ve Δ kesinlikle pozitiftir. Bu nedenle 2x² + 3x − 2 = 0 gibi bir denklemin iki gerçek kökü olduğunu hesap yapmadan söyleyebilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek 1: iki farklı gerçek kök (Δ > 0)",
      p: [
        "x² − 5x + 6 = 0 denklemini çözelim. Katsayılar a = 1, b = −5, c = 6'dır. b negatif olduğu için karesini alırken ve −b yazarken işarete dikkat etmek gerekir."
      ],
      ol: [
        "Diskriminantı hesaplayın: Δ = (−5)² − 4 · 1 · 6 = 25 − 24 = 1.",
        "Δ > 0 olduğu için iki farklı gerçek kök vardır. √Δ = 1.",
        "Kök formülünü uygulayın: x = (−(−5) ± 1) ÷ (2 · 1) = (5 ± 1) ÷ 2.",
        "Kökler: x₁ = 6 ÷ 2 = 3 ve x₂ = 4 ÷ 2 = 2. Çözüm kümesi {2, 3}.",
        "Kontrol: 3² − 5 · 3 + 6 = 9 − 15 + 6 = 0 ve 2² − 5 · 2 + 6 = 4 − 10 + 6 = 0."
      ],
      after: [
        "Kökler toplamı 3 + 2 = 5, kökler çarpımı 3 · 2 = 6'dır. Bu değerlerin −b ÷ a = 5 ve c ÷ a = 6 ile aynı olduğuna dikkat edin; aşağıda bu ilişkiyi ayrıca ele alıyoruz."
      ]
    },
    {
      h: "Çözümlü örnek 2: başkatsayısı 1 olmayan denklem",
      p: [
        "2x² + 3x − 2 = 0 denkleminde a = 2, b = 3, c = −2'dir. Paydada 2a = 4 olacağı için kesirli kök çıkması olasıdır."
      ],
      ol: [
        "Δ = 3² − 4 · 2 · (−2) = 9 + 16 = 25.",
        "Δ = 25 bir tam kare olduğu için kökler rasyoneldir. √25 = 5.",
        "x = (−3 ± 5) ÷ 4.",
        "x₁ = 2 ÷ 4 = 1/2 ve x₂ = −8 ÷ 4 = −2.",
        "Kontrol: 2 · (1/2)² + 3 · (1/2) − 2 = 0,5 + 1,5 − 2 = 0 ve 2 · 4 − 6 − 2 = 0."
      ]
    },
    {
      h: "Çift katlı kök ne demek? (Δ = 0)",
      p: [
        "Δ = 0 olduğunda kök formülündeki ± √Δ terimi sıfır olur ve iki kök birbirine eşitlenir: x₁ = x₂ = −b ÷ 2a. Bu köke <strong>çift katlı kök</strong> ya da çakışık kök denir. Grafikte parabol x eksenini kesmez, yalnızca tek bir noktada ona teğet olur; o nokta aynı zamanda parabolün tepe noktasıdır."
      ],
      ol: [
        "x² − 6x + 9 = 0 için a = 1, b = −6, c = 9.",
        "Δ = (−6)² − 4 · 1 · 9 = 36 − 36 = 0.",
        "x₁ = x₂ = 6 ÷ 2 = 3.",
        "Aynı sonuç çarpanlara ayırmayla da görülür: x² − 6x + 9 = (x − 3)². İfade bir tam karedir."
      ],
      after: [
        "Çift katlı kökün adı buradan gelir: (x − 3) çarpanı ifadede iki kez bulunur. Sınavlarda \"denklemin çakışık iki kökü varsa m kaçtır?\" türündeki sorular, Δ = 0 eşitliği kurularak çözülür."
      ]
    },
    {
      h: "Diskriminant negatifse ne olur? Karmaşık kökler",
      p: [
        "Δ < 0 olduğunda negatif bir sayının gerçek karekökü olmadığı için denklemin gerçek sayılarda çözümü yoktur; çözüm kümesi boş kümedir. Karmaşık sayılarda ise yine iki kök vardır. Burada i, i² = −1 eşitliğini sağlayan sanal birimdir ve √(−16) = 4i olarak yazılır."
      ],
      ol: [
        "x² + 2x + 5 = 0 için a = 1, b = 2, c = 5.",
        "Δ = 2² − 4 · 1 · 5 = 4 − 20 = −16.",
        "√(−16) = 4i olduğundan x = (−2 ± 4i) ÷ 2.",
        "Kökler: x₁ = −1 + 2i ve x₂ = −1 − 2i. Bu iki kök birbirinin eşleniğidir.",
        "Kontrol: kökler toplamı −2 = −b ÷ a, kökler çarpımı (−1)² + 2² = 5 = c ÷ a."
      ],
      after: [
        "Gerçek katsayılı bir denklemin karmaşık kökleri her zaman eşlenik çiftler hâlinde gelir. Lise müfredatında Δ < 0 durumunda genellikle \"gerçek kök yoktur\" cevabı beklenir; karmaşık sayılar konusunda ise kökler yukarıdaki gibi yazılır."
      ]
    },
    {
      h: "Kökler toplamı ve çarpımı nasıl bulunur?",
      p: [
        "Kökleri tek tek bulmadan toplamlarını ve çarpımlarını doğrudan katsayılardan elde edebilirsiniz. Bu ilişkiler, kök formülündeki iki kök toplanıp çarpıldığında ortaya çıkar ve Δ'nın işaretinden bağımsız olarak, karmaşık kökler için de geçerlidir."
      ],
      formula: "x₁ + x₂ = −b ÷ a\nx₁ · x₂ = c ÷ a\n|x₁ − x₂| = √Δ ÷ |a|\nKökleri verilen denklem: x² − (x₁ + x₂)x + x₁ · x₂ = 0",
      table: {
        head: ["Denklem", "Kökler", "Toplam (−b/a)", "Çarpım (c/a)"],
        rows: [
          ["x² − 5x + 6 = 0", "3 ve 2", "5", "6"],
          ["2x² + 3x − 2 = 0", "1/2 ve −2", "−3/2", "−1"],
          ["x² − 6x + 9 = 0", "3 ve 3", "6", "9"],
          ["x² + 2x + 5 = 0", "−1 ± 2i", "−2", "5"]
        ]
      },
      after: [
        "Ters yönde de kullanılır: kökleri 4 ve −1 olan denklem x² − 3x − 4 = 0'dır, çünkü toplam 3, çarpım −4'tür. Kökler toplamı ve çarpımı soruları özellikle parametreli denklemlerde hesabı çok kısaltır."
      ]
    },
    {
      h: "Çarpanlara ayırma ile çözüm ne zaman kolaydır?",
      p: [
        "Başkatsayı 1 ve katsayılar küçük tam sayılarsa, çarpımı c'yi, toplamı −b'yi veren iki sayıyı akıldan bulmak çoğu zaman kök formülünden hızlıdır. x² − 5x + 6 = 0 için çarpımı 6, toplamı 5 olan sayılar 2 ve 3'tür; denklem (x − 2)(x − 3) = 0 biçiminde yazılır.",
        "Δ bir tam kare değilse denklem tam sayı katsayılarla çarpanlara ayrılamaz. Örneğin x² − 4x + 1 = 0 için Δ = 16 − 4 = 12 çıkar; kökler 2 ± √3'tür ve bu kökleri tahminle bulmak mümkün değildir. Bu durumda kök formülü tek pratik yoldur. Kökleri sadeleştirmek için [[bilgi:karekok-nasil-alinir|karekök nasıl alınır]] yazısındaki yöntemler, sayısal değer için [[arac:karekok-hesapla|Karekök Hesaplama aracı]] işinizi görür."
      ],
      ul: [
        "<strong>c = 0 ise:</strong> x ortak paranteze alınır: x(ax + b) = 0, kökler 0 ve −b ÷ a.",
        "<strong>b = 0 ise:</strong> x² = −c ÷ a yazılır; sağ taraf pozitifse kökler ±√(−c ÷ a).",
        "<strong>Tam kare ifade:</strong> x² ± 2kx + k² = (x ± k)², çift katlı kök verir.",
        "<strong>İki kare farkı:</strong> x² − k² = (x − k)(x + k), kökler ±k."
      ]
    },
    {
      h: "Denklem sorusu adım adım nasıl çözülür?",
      ol: [
        "Denklemi ax² + bx + c = 0 biçimine getirin; tüm terimleri bir tarafa toplayın ve sıfıra eşitleyin.",
        "a, b ve c katsayılarını işaretleriyle birlikte yazın. Eksik terim varsa katsayısı 0'dır.",
        "Çarpanlara ayırma kolay görünüyorsa önce onu deneyin; değilse Δ = b² − 4ac hesaplayın.",
        "Δ'nın işaretine göre kök sayısını belirleyin ve kök formülünü uygulayın.",
        "Bulduğunuz kökleri denklemde yerine koyarak ya da kökler toplamı ve çarpımıyla kontrol edin.",
        "Soru bir aralık ya da koşul istiyorsa (pozitif kök, tam sayı kök gibi) uygun olmayan kökleri eleyin."
      ],
      after: [
        "Çözümünüzü kontrol etmek için [[arac:diskriminant-hesapla|Diskriminant Hesaplama aracı]] Δ'yı, kökleri, kökler toplamı ve çarpımını ve tepe noktasını gösterir. Birinci derece denklemler ve iki bilinmeyenli denklem sistemleri de dahil adım adım çözüm için [[arac:denklem-cozucu|Denklem Çözücü]] kullanılabilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Negatif b'nin karesini yanlış almak:</strong> (−5)² = 25'tir; −5² yazmak −25 sonucunu verir.",
        "<strong>−b'de işareti kaçırmak:</strong> b = −5 ise −b = 5'tir.",
        "<strong>Paydayı yalnızca ilk terime uygulamak:</strong> (−b ± √Δ) ifadesinin tamamı 2a'ya bölünür.",
        "<strong>Denklemi sıfıra eşitlemeden katsayı okumak:</strong> x² = 5x − 6 denkleminde önce x² − 5x + 6 = 0 yazılmalıdır.",
        "<strong>a = 0 durumunu unutmak:</strong> Parametreli sorularda a sıfır olursa denklem birinci dereceye düşer ve diskriminant kullanılmaz.",
        "<strong>Δ < 0 için \"kök yok\" demek yerine boş bırakmak:</strong> Gerçek sayılarda çözüm kümesi boş kümedir; bunu açıkça yazın."
      ]
    }
  ],
  faq: [
    ["Diskriminant nedir?", "Diskriminant, ax² + bx + c = 0 denkleminde Δ = b² − 4ac ile hesaplanan sayıdır. Denklemin kaç gerçek kökü olduğunu gösterir: pozitifse iki farklı, sıfırsa çakışık tek, negatifse hiç gerçek kök yoktur. Türkiye'de çoğunlukla delta diye anılır."],
    ["Δ = b² − 4ac formülü nasıl kullanılır?", "Önce denklem sıfıra eşitlenip a, b ve c katsayıları işaretleriyle yazılır. Sonra b'nin karesinden 4, a ve c'nin çarpımı çıkarılır. x² − 5x + 6 = 0 için Δ = 25 − 24 = 1 bulunur ve kökler (5 ± 1) ÷ 2 ile 3 ve 2 çıkar."],
    ["Diskriminant negatifse ne olur?", "Negatif sayının gerçek karekökü olmadığı için denklemin gerçek kökü yoktur ve çözüm kümesi boş kümedir. Karmaşık sayılarda ise birbirinin eşleniği iki kök vardır; örneğin x² + 2x + 5 = 0 denkleminin kökleri −1 + 2i ve −1 − 2i'dir."],
    ["Kökler toplamı ve çarpımı nasıl bulunur?", "Kökler toplamı −b ÷ a, kökler çarpımı c ÷ a formülüyle doğrudan katsayılardan bulunur. x² − 5x + 6 = 0 için toplam 5, çarpım 6'dır. Bu ilişkiler diskriminantın işaretinden bağımsızdır ve karmaşık kökler için de geçerlidir."],
    ["Çarpanlara ayırma ile çözüm ne zaman kolaydır?", "Başkatsayı 1 ve katsayılar küçük tam sayılarsa, çarpımı c'yi ve toplamı −b'yi veren iki sayıyı bulmak hızlıdır. Diskriminant tam kare değilse tam sayılarla çarpanlara ayırma mümkün olmaz; bu durumda kök formülü kullanılır."],
    ["Çift katlı kök ne demek?", "Diskriminant sıfır olduğunda iki kök birbirine eşit çıkar ve bu köke çift katlı ya da çakışık kök denir. İfade bir tam karedir; örneğin x² − 6x + 9 = (x − 3)² ve kök 3'tür. Grafikte parabol x eksenine tek noktada teğettir."],
    ["Karmaşık kökler nasıl yazılır?", "Diskriminant negatifken √Δ yerine i√(−Δ) yazılır ve kökler (−b ± i√(−Δ)) ÷ 2a formülüyle bulunur. Δ = −16 ise √Δ = 4i olur. Gerçek katsayılı denklemlerde karmaşık kökler her zaman eşlenik çiftler hâlinde çıkar."],
    ["Denklem sorusu adım adım nasıl çözülür?", "Denklem sıfıra eşitlenir, katsayılar belirlenir, mümkünse çarpanlara ayrılır, değilse diskriminant hesaplanır ve kök formülü uygulanır. Son olarak kökler denklemde yerine konarak ya da kökler toplamı ve çarpımıyla kontrol edilir."],
    ["Parabolün tepe noktası diskriminantla nasıl ilişkilidir?", "y = ax² + bx + c parabolünün tepe noktası (−b ÷ 2a, −Δ ÷ 4a) noktasıdır. a pozitifken Δ negatifse tepe noktası x ekseninin üstünde kalır ve parabol ekseni kesmez; Δ pozitifse tepe altta kalır ve iki kesişme olur."]
  ],
  tools: ["diskriminant-hesapla", "denklem-cozucu", "karekok-hesapla"],
  related: ["karekok-nasil-alinir", "dogrunun-egimi-nasil-bulunur"],
  sources: [
    ["MEB – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
