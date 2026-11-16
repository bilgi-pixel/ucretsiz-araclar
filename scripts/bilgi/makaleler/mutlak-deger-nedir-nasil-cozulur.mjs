export default {
  slug: "mutlak-deger-nedir-nasil-cozulur",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Mutlak Değer Nedir? Mutlak Değerli Denklem ve Eşitsizlikler Nasıl Çözülür",
  pageTitle: "Mutlak Değer Nedir? Denklem ve Eşitsizlik Çözümü Örnekli",
  description: "Mutlak değer, bir sayının sayı doğrusunda sıfıra uzaklığıdır ve negatif olmaz: |−7| = 7. |x − 3| = 5, |x| < 4 ve iç içe mutlak değer çözümleri adım adım.",
  keywords: ["mutlak değer nedir", "mutlak değer soruları", "mutlak değerli denklemler", "mutlak değer eşitsizlik", "|x| nedir", "iki sayı arasındaki uzaklık", "mutlak değer özellikleri", "iç içe mutlak değer"],
  lead: "Bir sayının mutlak değeri, o sayının sayı doğrusunda sıfıra olan uzaklığıdır ve |x| biçiminde yazılır. Uzaklık negatif olamayacağı için mutlak değer her zaman sıfır ya da pozitiftir: |−7| = 7, |7| = 7, |0| = 0. Mutlak değerli denklemler bu uzaklık fikriyle çözülür; örneğin |x − 3| = 5, \"x'in 3'e uzaklığı 5'tir\" demektir ve çözümleri 8 ile −2'dir. Bu sayfada tanımı, temel özellikleri, denklem ve eşitsizlik çözümlerini, iç içe mutlak değeri ve sık yapılan hataları çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Tanım: x ≥ 0 ise |x| = x; x < 0 ise |x| = −x. Sonuç hiçbir zaman negatif olmaz.",
    "İki sayı arasındaki uzaklık |a − b| ile bulunur: −3 ile 5 arasındaki uzaklık |−3 − 5| = 8'dir.",
    "|x − a| = k (k > 0) denkleminin iki çözümü vardır: x = a + k ve x = a − k.",
    "|x| < k eşitsizliği −k < x < k aralığını, |x| > k eşitsizliği x < −k ya da x > k bölgesini verir.",
    "|a · b| = |a| · |b| ve |a + b| ≤ |a| + |b| (üçgen eşitsizliği) temel özelliklerdir.",
    "Mutlak değer negatif bir sayıya eşit olamaz: |x| = −2 denkleminin çözümü yoktur."
  ],
  figure: {
    alt: "Sayı doğrusunda mutlak değer: 3 noktasından 5 birim sola −2'ye, 5 birim sağa 8'e uzanan oklar, yani |x − 3| = 5'in iki çözümü. Altta |x| < 4 eşitsizliğinin −4 ile 4 arasındaki açık aralığı.",
    caption: "Mutlak değer bir uzaklıktır. Üstteki doğruda 3'e uzaklığı 5 olan iki nokta (−2 ve 8), alttaki doğruda sıfıra uzaklığı 4'ten küçük olan sayılar (−4 ile 4 arası, uçlar hariç) gösterilmiştir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="m1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">|x − 3| = 5: 3'e uzaklığı 5 olan sayılar</text>
  <line x1="40" y1="130" x2="680" y2="130" class="st sw" fill="none"/>
  <g class="sm mid t2">
    <line x1="80" y1="122" x2="80" y2="138" class="st" fill="none"/><text x="80" y="158">−3</text>
    <line x1="120" y1="122" x2="120" y2="138" class="st" fill="none"/><text x="120" y="158" class="b ok">−2</text>
    <line x1="200" y1="122" x2="200" y2="138" class="st" fill="none"/><text x="200" y="158">0</text>
    <line x1="320" y1="122" x2="320" y2="138" class="st" fill="none"/><text x="320" y="158" class="b p">3</text>
    <line x1="520" y1="122" x2="520" y2="138" class="st" fill="none"/><text x="520" y="158" class="b ok">8</text>
    <line x1="600" y1="122" x2="600" y2="138" class="st" fill="none"/><text x="600" y="158">10</text>
  </g>
  <circle cx="320" cy="130" r="7" class="p"/>
  <circle cx="120" cy="130" r="7" class="ok"/>
  <circle cx="520" cy="130" r="7" class="ok"/>
  <path d="M320 112 Q220 60 126 110" class="sp sw" fill="none" marker-end="url(#m1)"/>
  <path d="M320 112 Q420 60 514 110" class="sp sw" fill="none" marker-end="url(#m1)"/>
  <text x="220" y="72" class="sm b mid">5 birim</text>
  <text x="420" y="72" class="sm b mid">5 birim</text>
  <text x="360" y="196" class="sm mid">x − 3 = 5 → x = 8 · x − 3 = −5 → x = −2</text>
  <text x="360" y="244" class="lg b mid">|x| < 4 → −4 < x < 4</text>
  <line x1="40" y1="300" x2="680" y2="300" class="st sw" fill="none"/>
  <rect x="200" y="292" width="320" height="16" class="ps"/>
  <circle cx="200" cy="300" r="7" class="sf sp sw"/>
  <circle cx="520" cy="300" r="7" class="sf sp sw"/>
  <line x1="360" y1="292" x2="360" y2="308" class="st" fill="none"/>
  <g class="sm mid t2"><text x="200" y="330">−4</text><text x="360" y="330">0</text><text x="520" y="330">4</text></g>
  <text x="360" y="362" class="sm mid mu">İçi boş daire: uç değer dahil değil</text>
</svg>`
  },
  sections: [
    {
      h: "Mutlak değer nedir, sayı doğrusunda ne anlama gelir?",
      p: [
        "Mutlak değer, bir sayının işaretine bakmadan yalnızca büyüklüğünü ifade eder. Geometrik olarak, sayı doğrusunda o sayıyı gösteren noktanın sıfıra olan uzaklığıdır. 5 ile −5 sıfırın iki farklı tarafındadır ama sıfıra uzaklıkları aynıdır; bu yüzden |5| = |−5| = 5.",
        "Cebirsel tanım iki durumdan oluşur: sayı sıfır ya da pozitifse mutlak değeri kendisidir, negatifse mutlak değeri sayının ters işaretlisidir. \"−x\" ifadesi ilk bakışta negatif bir sayı gibi görünse de x negatif olduğunda −x pozitiftir; örneğin x = −7 için −x = 7 olur."
      ],
      formula: "|x| = x,   x ≥ 0 ise\n|x| = −x,  x < 0 ise\nÖrnekler: |−7| = 7 · |2,5| = 2,5 · |0| = 0 · |−3/4| = 3/4"
    },
    {
      h: "|−7| kaçtır, mutlak değer neden negatif olmaz?",
      p: [
        "|−7| = 7'dir, çünkü −7 sayı doğrusunda sıfırın 7 birim solundadır. Uzaklık bir yön bilgisi taşımaz; ister sağa ister sola gidin, kat ettiğiniz yol pozitif bir büyüklüktür. Mutlak değerin negatif çıkamamasının nedeni budur.",
        "Bu kural denklem çözerken önemli bir kontrol aracıdır. Bir mutlak değer ifadesinin negatif bir sayıya eşit olduğu denklemin çözümü yoktur: |x + 1| = −3 denkleminde hiçbir x değeri sağlanamaz. Ayrıca mutlak değerin önündeki eksi işareti içeriye girmez: −|−7| = −7'dir, çünkü önce mutlak değer hesaplanır (7), sonra önündeki eksi uygulanır."
      ]
    },
    {
      h: "Mutlak değerin temel özellikleri",
      table: {
        head: ["Özellik", "Formül", "Sayısal örnek"],
        rows: [
          ["Negatif olmama", "|a| ≥ 0", "|−4| = 4 ≥ 0"],
          ["Simetri", "|−a| = |a|", "|−6| = |6| = 6"],
          ["Çarpım", "|a · b| = |a| · |b|", "|−3 · 4| = 12 = 3 · 4"],
          ["Bölüm", "|a ÷ b| = |a| ÷ |b| (b ≠ 0)", "|−8 ÷ 2| = 4"],
          ["Kare", "|a|² = a²", "|−5|² = 25 = (−5)²"],
          ["Üçgen eşitsizliği", "|a + b| ≤ |a| + |b|", "|3 + (−5)| = 2 ≤ 8"],
          ["Uzaklık", "|a − b| = |b − a|", "|2 − 9| = |9 − 2| = 7"]
        ],
        caption: "Toplamada eşitlik yalnızca a ile b aynı işaretliyse (ya da biri sıfırsa) sağlanır: |a + b| = |a| + |b|."
      },
      after: [
        "Üçgen eşitsizliği öğrencilerin sık karıştırdığı bir özelliktir: mutlak değer toplamaya dağılmaz. |3 + (−5)| = 2 iken |3| + |−5| = 8'dir. Bu farkı sayılarla denemek için [[arac:mutlak-deger-hesapla|Mutlak Değer Hesaplama]] aracına iki sayı yazdığınızda |a − b|, |a + b| ve |a| + |b| değerlerini yan yana görebilirsiniz."
      ]
    },
    {
      h: "İki sayı arasındaki uzaklık mutlak değerle nasıl bulunur?",
      p: [
        "Sayı doğrusunda a ve b noktaları arasındaki uzaklık |a − b|'dir. Hangi sayıdan hangisini çıkardığınız önemli değildir, çünkü sonuç mutlak değerle pozitife çevrilir. Bu tanım, mutlak değerli denklemleri \"uzaklık cümlesi\" olarak okumanın temelidir."
      ],
      ul: [
        "−3 ile 5 arasındaki uzaklık: |−3 − 5| = |−8| = 8.",
        "Termometre sabah −6 °C, öğlen 4 °C gösterdiyse sıcaklık farkı |4 − (−6)| = 10 °C'dir.",
        "|x − 2| ifadesi \"x'in 2'ye uzaklığı\", |x + 4| ifadesi ise |x − (−4)| olduğu için \"x'in −4'e uzaklığı\" diye okunur."
      ],
      after: [
        "Yüzde farkı gibi günlük hesaplarda da mutlak değer kullanılır; iki değer arasındaki farkın yönü değil büyüklüğü önemliyse fark mutlak değer içine alınır. Bunun bir örneğini [[arac:yuzde-fark-hesapla|Yüzde Fark Hesaplama]] aracında görebilirsiniz."
      ]
    },
    {
      h: "|x − 3| = 5 denklemi nasıl çözülür?",
      p: [
        "Mutlak değerli bir denklemde ilk iş, mutlak değeri bir tarafta yalnız bırakmaktır. Sonra sağ tarafın işaretine bakılır: negatifse çözüm yoktur, sıfırsa tek çözüm, pozitifse iki çözüm vardır. İki çözümlü durumda mutlak değerin içi sağ tarafa ve sağ tarafın negatifine ayrı ayrı eşitlenir."
      ],
      ol: [
        "Denklem zaten yalnızdır: |x − 3| = 5. Sağ taraf pozitif, iki çözüm beklenir.",
        "Birinci durum: x − 3 = 5 → x = 8.",
        "İkinci durum: x − 3 = −5 → x = −2.",
        "Kontrol: |8 − 3| = 5 ve |−2 − 3| = |−5| = 5. Çözüm kümesi {−2, 8}."
      ],
      after: [
        "Biraz daha karmaşık bir örnek: 2|x + 1| − 4 = 6. Önce mutlak değeri yalnız bırakın: 2|x + 1| = 10 → |x + 1| = 5. Sonra iki durum: x + 1 = 5 → x = 4; x + 1 = −5 → x = −6. Mutlak değerin içinde birinci dereceden olmayan ifadeler varsa, iki durumda ortaya çıkan denklemleri ayrı ayrı çözmek için [[arac:denklem-cozucu|Denklem Çözücü]] aracından yararlanabilirsiniz."
      ]
    },
    {
      h: "|x| < 4 eşitsizliğinin çözüm aralığı nedir?",
      p: [
        "Eşitsizliklerde de uzaklık fikri işe yarar. |x| < 4, \"x'in sıfıra uzaklığı 4'ten küçüktür\" demektir; yani x, −4 ile 4 arasındadır ve uçlar dahil değildir. |x| > 4 ise \"sıfıra uzaklık 4'ten büyüktür\" anlamına gelir ve iki ayrı bölge verir."
      ],
      table: {
        head: ["Eşitsizlik", "Çözüm", "Aralık gösterimi"],
        rows: [
          ["|x| < 4", "−4 < x < 4", "(−4, 4)"],
          ["|x| ≤ 4", "−4 ≤ x ≤ 4", "[−4, 4]"],
          ["|x| > 4", "x < −4 ya da x > 4", "(−∞, −4) ∪ (4, ∞)"],
          ["|x − 1| < 3", "−3 < x − 1 < 3 → −2 < x < 4", "(−2, 4)"],
          ["|2x − 1| ≥ 3", "2x − 1 ≥ 3 ya da 2x − 1 ≤ −3 → x ≥ 2 ya da x ≤ −1", "(−∞, −1] ∪ [2, ∞)"]
        ]
      },
      after: [
        "Bir tamsayı sorusunda \"|x − 1| < 3 eşitsizliğini sağlayan kaç tamsayı vardır?\" denirse aralık −2 < x < 4 olur ve tamsayılar −1, 0, 1, 2, 3'tür; cevap 5'tir. Uç değerlerin dahil olup olmadığına, yani < ile ≤ farkına dikkat etmek bu tür soruların en kritik noktasıdır."
      ]
    },
    {
      h: "Sağ tarafta değişken varsa: |x − 1| = 2x + 4",
      p: [
        "Sağ taraf da x içeriyorsa önce bir koşul yazılır: mutlak değer negatif olamayacağı için 2x + 4 ≥ 0, yani x ≥ −2 olmalıdır. Sonra iki durum çözülür ve koşulu sağlamayan kökler elenir."
      ],
      ol: [
        "Birinci durum: x − 1 = 2x + 4 → x = −5. Koşul x ≥ −2 sağlanmaz; kök elenir.",
        "İkinci durum: x − 1 = −(2x + 4) → 3x = −3 → x = −1. Koşul sağlanır.",
        "Kontrol: |−1 − 1| = 2 ve 2 · (−1) + 4 = 2. Çözüm kümesi {−1}."
      ]
    },
    {
      h: "İç içe mutlak değer nasıl açılır?",
      p: [
        "İç içe mutlak değerde dıştaki mutlak değerden başlanır ve her katmanda aynı iki durum kuralı uygulanır. Her adımda çıkan değerin negatif olup olmadığı kontrol edilir; negatif olan dallar elenir."
      ],
      ol: [
        "Denklem: ||x − 2| − 3| = 1.",
        "Dış katman: |x − 2| − 3 = 1 ya da |x − 2| − 3 = −1.",
        "Birinci dal: |x − 2| = 4 → x = 6 ya da x = −2.",
        "İkinci dal: |x − 2| = 2 → x = 4 ya da x = 0.",
        "Çözüm kümesi: {−2, 0, 4, 6}. Her değeri yerine koyarak kontrol edin: örneğin x = 0 için ||0 − 2| − 3| = |2 − 3| = 1."
      ],
      after: [
        "Bir dalda mutlak değer negatif bir sayıya eşit çıkarsa o dal çözüm vermez. Örneğin ||x| − 5| = 2 denkleminde |x| = 7 ve |x| = 3 dalları geçerlidir ve dört çözüm vardır; ama ||x| + 5| = 2 denkleminde |x| = −3 ve |x| = −7 çıkar, çözüm yoktur."
      ]
    },
    {
      h: "Mutlak değer hangi sınıfta ve sınavda çıkar? Sık yapılan hatalar",
      p: [
        "Mutlak değer, ortaokulda tam sayılar konusunda sayı doğrusu üzerinden tanıtılır; lise 9. sınıf matematik programında ise denklem ve eşitsizlikler kapsamında ayrıntılı işlenir. TYT Temel Matematik testinde hem doğrudan hem de diğer konuların içinde (eşitsizlik, fonksiyon, problem) karşınıza çıkabilir. Sınav yapısı için [[bilgi:tyt-ayt-ydt-kac-soru-kac-dakika|TYT ve AYT kaç soru]] yazısına bakabilirsiniz."
      ],
      ul: [
        "<strong>Tek çözüm yazmak:</strong> |x − 3| = 5 denkleminde yalnızca x = 8'i bulup −2'yi unutmak en yaygın hatadır.",
        "<strong>Eksiyi içeri sokmak:</strong> −|x| ifadesi |−x| ile aynı değildir.",
        "<strong>Toplamaya dağıtmak:</strong> |a + b| = |a| + |b| her zaman doğru değildir.",
        "<strong>Negatif sağ tarafı gözden kaçırmak:</strong> |x| = −2 gibi denklemlerin çözümü yoktur.",
        "<strong>Eşitsizlikte yön karıştırmak:</strong> |x| < k tek aralık, |x| > k iki ayrı bölge verir.",
        "<strong>Kontrolü atlamak:</strong> Özellikle iç içe ve değişkenli sağ taraflı denklemlerde bulunan her kök yerine konarak doğrulanmalıdır."
      ]
    }
  ],
  faq: [
    ["Mutlak değer nedir, sayı doğrusunda ne anlama gelir?", "Mutlak değer, bir sayının sayı doğrusunda sıfıra olan uzaklığıdır ve |x| ile gösterilir. Uzaklık yön taşımadığı için sonuç her zaman sıfır ya da pozitiftir; 5 ile −5'in mutlak değeri aynıdır."],
    ["|−7| kaçtır, mutlak değer neden negatif olmaz?", "|−7| = 7'dir, çünkü −7 sıfırın 7 birim solundadır ve uzaklık pozitif bir büyüklüktür. Bu nedenle mutlak değer hiçbir zaman negatif olmaz ve |x| = −2 gibi denklemlerin çözümü yoktur."],
    ["|x − 3| = 5 denklemi nasıl çözülür?", "Mutlak değerin içi hem 5'e hem −5'e eşitlenir. x − 3 = 5 denkleminden x = 8, x − 3 = −5 denkleminden x = −2 bulunur. Çözüm kümesi {−2, 8}'dir; ikisi de 3'e 5 birim uzaklıktadır."],
    ["|x| < 4 eşitsizliğinin çözüm aralığı nedir?", "|x| < 4, sıfıra uzaklığı 4'ten küçük sayıları ifade eder ve çözüm −4 < x < 4 aralığıdır. Uçlar dahil değildir; eşitsizlik ≤ olsaydı −4 ve 4 de çözüme katılırdı."],
    ["Mutlak değerin temel özellikleri nelerdir?", "Mutlak değer negatif olmaz, |−a| = |a|'dır, çarpıma ve bölüme dağılır, karesi sayının karesine eşittir. Toplamaya ise dağılmaz: üçgen eşitsizliğine göre |a + b|, |a| + |b|'den büyük olamaz."],
    ["İki sayı arasındaki uzaklık mutlak değerle nasıl bulunur?", "a ve b arasındaki uzaklık |a − b| ile bulunur ve çıkarma sırası sonucu değiştirmez. Örneğin −3 ile 5 arasındaki uzaklık |−3 − 5| = 8, sabah −6 °C ile öğlen 4 °C arasındaki fark 10 °C'dir."],
    ["İç içe mutlak değer nasıl açılır?", "Dıştaki mutlak değerden başlanır ve her katmanda iç ifade pozitif ve negatif değere ayrı ayrı eşitlenir. Negatif bir sayıya eşit çıkan dallar elenir. ||x − 2| − 3| = 1 denkleminin çözümleri −2, 0, 4 ve 6'dır."],
    ["Mutlak değer hangi sınıfta ve sınavda çıkar?", "Mutlak değer ortaokulda tam sayılarla tanıtılır, lise 9. sınıfta denklem ve eşitsizliklerle ayrıntılı işlenir. TYT Temel Matematik testinde doğrudan ya da eşitsizlik ve problem sorularının içinde sıkça yer alır."],
    ["|x − 1| < 3 eşitsizliğini kaç tamsayı sağlar?", "Eşitsizlik −3 < x − 1 < 3 biçiminde açılır ve −2 < x < 4 aralığı bulunur. Bu aralıktaki tamsayılar −1, 0, 1, 2 ve 3'tür; uçlar dahil olmadığı için eşitsizliği 5 tamsayı sağlar."]
  ],
  tools: ["mutlak-deger-hesapla", "denklem-cozucu", "yuzde-fark-hesapla"],
  related: ["iki-bilinmeyenli-denklem-nasil-cozulur", "diskriminant-ikinci-derece-denklem", "oran-oranti-nasil-cozulur"],
  sources: [
    ["MEB – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
