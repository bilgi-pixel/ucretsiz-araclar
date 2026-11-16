export default {
  slug: "aritmetik-geometrik-harmonik-ortalama-farki",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Aritmetik, Geometrik ve Harmonik Ortalama Farkı Nedir? Örneklerle",
  pageTitle: "Aritmetik, Geometrik ve Harmonik Ortalama Farkı ve Formülleri",
  description: "Aritmetik ortalama toplar, geometrik ortalama çarpar, harmonik ortalama tersleri alır. Formüller, ortalama hız ve büyüme örnekleri, AO ≥ GO ≥ HO kuralı.",
  keywords: ["geometrik ortalama nedir", "harmonik ortalama nedir", "aritmetik ortalama formülü", "ağırlıklı ortalama", "ortalama hız nasıl hesaplanır", "geometrik ortalama büyüme", "ortalamalar arası eşitsizlik"],
  lead: "Aritmetik ortalama sayıları toplayıp adede böler; geometrik ortalama sayıları çarpıp adet dereceden kök alır; harmonik ortalama ise sayıların terslerinin ortalamasının tersidir. 2 ve 8 için sırasıyla 5, 4 ve 3,2 bulunur. Hangisinin kullanılacağı verinin türüne bağlıdır: toplanan büyüklüklerde aritmetik, art arda çarpılan oranlarda (büyüme, faiz) geometrik, aynı yolda farklı hızlar gibi \"birim başına\" oranlarda harmonik ortalama doğru sonucu verir. Pozitif sayılarda her zaman AO ≥ GO ≥ HO'dur.",
  kisaCevap: [
    "Aritmetik ortalama (AO) = (x₁ + x₂ + … + xₙ) ÷ n.",
    "Geometrik ortalama (GO) = ⁿ√(x₁ × x₂ × … × xₙ); yalnızca pozitif sayılar için tanımlıdır.",
    "Harmonik ortalama (HO) = n ÷ (1/x₁ + 1/x₂ + … + 1/xₙ).",
    "Pozitif sayılarda AO ≥ GO ≥ HO; eşitlik yalnızca tüm sayılar aynıysa olur.",
    "Gidişi 60, dönüşü 90 km/sa olan eşit mesafeli yolculukta ortalama hız harmonik ortalamadır: 72 km/sa.",
    "Yıllık %10, %50 ve -%20 değişimin ortalama büyümesi geometrik ortalamayla yaklaşık %9,70'tir, aritmetik ortalamanın verdiği %13,33 değil."
  ],
  figure: {
    alt: "Üç ortalamanın sayı doğrusu üzerinde karşılaştırması: 4, 9 ve 12 sayıları için harmonik ortalama 6,75, geometrik ortalama 7,56, aritmetik ortalama 8,33; altta formüller.",
    caption: "Aynı üç sayının üç ortalaması. Sayılar birbirinden uzaklaştıkça aradaki fark büyür; sayılar eşit olsaydı üç ortalama da aynı noktaya düşerdi.",
    svg: `<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Veri: 4, 9, 12 → HO ≤ GO ≤ AO</text>
  <line x1="60" y1="120" x2="660" y2="120" class="st sw" fill="none"/>
  <g class="sm mid">
    <line x1="60" y1="112" x2="60" y2="128" class="st" fill="none"/><text x="60" y="148">4</text>
    <line x1="435" y1="112" x2="435" y2="128" class="st" fill="none"/><text x="435" y="148">9</text>
    <line x1="660" y1="112" x2="660" y2="128" class="st" fill="none"/><text x="660" y="148">12</text>
  </g>
  <circle cx="60" cy="120" r="7" class="t2"/><circle cx="435" cy="120" r="7" class="t2"/><circle cx="660" cy="120" r="7" class="t2"/>
  <circle cx="266" cy="120" r="9" class="dg"/><text x="266" y="88" class="b mid dg">HO 6,75</text>
  <circle cx="327" cy="120" r="9" class="ok"/><text x="327" y="66" class="b mid ok">GO 7,56</text>
  <circle cx="385" cy="120" r="9" class="p"/><text x="400" y="88" class="b mid p">AO 8,33</text>
  <rect x="30" y="176" width="210" height="130" rx="10" class="ps"/>
  <text x="135" y="204" class="b mid">Aritmetik</text>
  <text x="135" y="232" class="mid">(4 + 9 + 12) ÷ 3</text>
  <text x="135" y="258" class="b mid lg">8,33</text>
  <text x="135" y="286" class="sm mid">toplanan değerler</text>
  <rect x="255" y="176" width="210" height="130" rx="10" class="oks"/>
  <text x="360" y="204" class="b mid">Geometrik</text>
  <text x="360" y="232" class="mid">∛(4 × 9 × 12) = ∛432</text>
  <text x="360" y="258" class="b mid lg">7,56</text>
  <text x="360" y="286" class="sm mid">çarpılan oranlar, büyüme</text>
  <rect x="480" y="176" width="210" height="130" rx="10" class="dgs"/>
  <text x="585" y="204" class="b mid">Harmonik</text>
  <text x="585" y="232" class="mid">3 ÷ (1/4 + 1/9 + 1/12)</text>
  <text x="585" y="258" class="b mid lg">6,75</text>
  <text x="585" y="286" class="sm mid">hız, birim başına oran</text>
  <rect x="30" y="322" width="660" height="50" rx="8" class="sf sb"/>
  <text x="360" y="352" class="mid">Gidiş 60, dönüş 90 km/sa (eşit yol) → ortalama hız HO = 72 km/sa, 75 değil</text>
</svg>`
  },
  sections: [
    {
      h: "Ortalama nedir, neden birden fazla türü var?",
      p: [
        "Ortalama, bir veri kümesini tek bir temsilci sayıyla özetlemenin yoludur. Ancak \"temsil etmek\" verinin doğasına göre farklı anlamlar taşır. Bir sınıfın not ortalamasında notları toplamak anlamlıdır. Bir yatırımın yıllık getirisinde ise yıllar art arda çarpılır; toplamak yanlış sonuç verir. Hızlar ortalanırken de her hızda geçen süre farklı olduğu için basit toplama yanıltır.",
        "Bu yüzden matematikte üç klasik ortalama vardır ve hepsine birlikte <strong>Pisagor ortalamaları</strong> denir. Doğru ortalama, \"bu sayıların hepsini aynı tek bir değerle değiştirsem hangi büyüklük korunmalı?\" sorusunun cevabıdır. Aritmetik ortalama toplamı, geometrik ortalama çarpımı, harmonik ortalama terslerin toplamını korur.",
        "Merkezî eğilim ölçülerinin diğer üyeleri olan medyan ve modu [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod yazısında]] bulabilirsiniz. Bu sayfa yalnızca ortalama türlerine odaklanır."
      ]
    },
    {
      h: "Üç ortalamanın formülleri",
      formula: "AO = (x₁ + x₂ + … + xₙ) ÷ n\nGO = (x₁ × x₂ × … × xₙ)^(1/n)\nHO = n ÷ (1/x₁ + 1/x₂ + … + 1/xₙ)\nİki sayı için: GO² = AO × HO",
      p: [
        "İki sayıda formüller daha da sadeleşir: AO = (a + b) ÷ 2, GO = √(a × b), HO = 2ab ÷ (a + b). Bu üç ifade arasında güzel bir ilişki vardır: geometrik ortalamanın karesi, aritmetik ve harmonik ortalamanın çarpımına eşittir. 2 ve 8 için AO = 5, HO = 3,2 ve 5 × 3,2 = 16 = 4²; yani GO = 4."
      ],
      table: {
        head: ["Veri", "Aritmetik", "Geometrik", "Harmonik"],
        rows: [
          ["2 ve 8", "5", "4", "3,2"],
          ["60 ve 90", "75", "73,48", "72"],
          ["4, 9, 12", "8,33", "7,56", "6,75"],
          ["5, 5, 5", "5", "5", "5"]
        ],
        caption: "Tüm sayılar eşitse üç ortalama da aynı çıkar. Sayılar birbirinden uzaklaştıkça fark büyür."
      }
    },
    {
      h: "Geometrik ortalama nasıl hesaplanır? Büyüme örneği",
      p: [
        "Geometrik ortalama, art arda <strong>çarpılarak</strong> birleşen değerler içindir: yıllık büyüme oranları, enflasyon, faiz, nüfus artışı, bakteri çoğalması. Yüzde değişimler önce büyüme çarpanına çevrilir (%10 artış → 1,10; %20 azalış → 0,80), çarpanların geometrik ortalaması alınır ve sonuçtan 1 çıkarılır."
      ],
      ol: [
        "Bir yatırım üç yılda sırasıyla %10, %50 ve -%20 değişmiş olsun. Çarpanlar 1,10, 1,50 ve 0,80'dir.",
        "Çarpım: 1,10 × 1,50 × 0,80 = 1,32. Yani 1.000 TL üç yılın sonunda 1.320 TL olmuştur.",
        "Küp kök: ∛1,32 ≈ 1,0970. Ortalama yıllık büyüme yaklaşık <strong>%9,70</strong>'tir.",
        "Kontrol: 1.000 × 1,097<sup>3</sup> ≈ 1.320 TL. Geometrik ortalama aynı sonucu verir.",
        "Aritmetik ortalama (10 + 50 - 20) ÷ 3 = %13,33 verir; bununla hesaplarsak 1.000 × 1,1333<sup>3</sup> ≈ 1.456 TL bulunur ve gerçekte olmayan 136 TL'lik kazanç uydurulmuş olur."
      ],
      after: [
        "Bu nedenle finansta \"yıllık bileşik büyüme oranı\" geometrik ortalamayla hesaplanır; ayrıntısı için [[bilgi:cagr-yillik-bilesik-buyume-orani|CAGR yazısına]] bakabilirsiniz. Kendi verinizle denemek için [[arac:geometrik-ortalama-hesapla|Geometrik Ortalama Hesaplama]] aracı yüzde değişimleri doğrudan kabul eder."
      ]
    },
    {
      h: "Harmonik ortalama ne zaman kullanılır? Gidiş-dönüş hızı",
      p: [
        "Harmonik ortalama, değerler bir <strong>oran</strong> olduğunda ve oranın paydasındaki büyüklük (yol, iş miktarı, tutar) her durumda eşit olduğunda kullanılır. En bilinen örnek ortalama hızdır. Ankara'dan 180 km uzaklıktaki bir şehre 60 km/sa ile gidip 90 km/sa ile döndüğünüzü düşünün. Sezgi 75 km/sa der, ama bu yanlıştır."
      ],
      ol: [
        "Gidiş süresi: 180 ÷ 60 = 3 saat. Dönüş süresi: 180 ÷ 90 = 2 saat.",
        "Toplam yol 360 km, toplam süre 5 saattir.",
        "Ortalama hız = 360 ÷ 5 = <strong>72 km/sa</strong>.",
        "Harmonik ortalama formülüyle: 2 × 60 × 90 ÷ (60 + 90) = 10.800 ÷ 150 = 72 km/sa. Mesafe ne olursa olsun sonuç aynıdır."
      ],
      after: [
        "Aritmetik ortalama neden yanılır? Çünkü yavaş giderken yolda daha uzun süre kalırsınız; düşük hız toplam süreye daha fazla ağırlık koyar. Harmonik ortalama bu ağırlığı kendiliğinden hesaba katar. Ancak <strong>eşit süre</strong> boyunca farklı hızlarla gidilseydi, örneğin 1 saat 60, 1 saat 90 km/sa, doğru cevap aritmetik ortalama olan 75 km/sa olurdu. Hız, yol ve zaman ilişkisini [[bilgi:hiz-yol-zaman-formulu|hız-yol-zaman yazısında]] ayrıntılı bulabilirsiniz.",
        "Harmonik ortalamanın diğer kullanım alanları: aynı tutarla farklı fiyatlardan yapılan alımlarda ortalama birim fiyat, paralel bağlı dirençler, makine öğrenmesinde F1 skoru ve fiyat/kazanç oranlarının ortalaması. Hesap için [[arac:harmonik-ortalama-hesapla|Harmonik Ortalama Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Ağırlıklı ortalama nasıl bulunur?",
      p: [
        "Değerlerin önemi eşit değilse ağırlıklı ortalama kullanılır. Her değer kendi ağırlığıyla çarpılır, çarpımlar toplanır ve ağırlıkların toplamına bölünür. Okuldaki dönem notu, üniversitedeki kredili not ortalaması ve farklı fiyatlardan alınan ürünlerin ortalama maliyeti tipik örneklerdir."
      ],
      formula: "Ağırlıklı AO = (w₁x₁ + w₂x₂ + … + wₙxₙ) ÷ (w₁ + w₂ + … + wₙ)\nÖrnek: notlar 70, 85, 90; haftalık ders saatleri 4, 3, 2\n(70×4 + 85×3 + 90×2) ÷ 9 = 715 ÷ 9 ≈ 79,44",
      after: [
        "Ağırlıksız ortalama (70 + 85 + 90) ÷ 3 = 81,67 çıkardı. Fark, düşük notun en fazla saatli derse ait olmasından kaynaklanır. Ağırlıklı ortalamanın geometrik ve harmonik sürümleri de vardır; harmonik ortalamanın kendisi aslında \"pay\" büyüklükleri eşit olan ağırlıklı bir ortalamadır. Hızlı hesap için [[arac:agirlikli-ortalama-hesapla|Ağırlıklı Ortalama Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Hangi ortalama her zaman en büyüktür? AO ≥ GO ≥ HO",
      p: [
        "Pozitif sayılardan oluşan her veri kümesinde aritmetik ortalama geometrik ortalamadan, geometrik ortalama da harmonik ortalamadan büyük ya da ona eşittir. Eşitlik yalnızca tüm sayılar birbirine eşit olduğunda gerçekleşir. Bu, matematik olimpiyatlarında ve lise problemlerinde sık kullanılan <strong>ortalamalar eşitsizliğidir</strong>.",
        "İki sayı için kanıt kısadır: (√a − √b)² ≥ 0 ifadesini açarsanız a + b ≥ 2√(ab) elde edersiniz; bu da AO ≥ GO demektir. Bu eşitsizlik, çevresi sabit dikdörtgenler arasında alanı en büyük olanın kare olduğunu da gösterir: kenarlar a ve b ise çevre sabitken ab çarpımı, a = b olduğunda en büyük değerine ulaşır."
      ],
      ul: [
        "Veride bir sıfır varsa geometrik ortalama 0 olur ve harmonik ortalama tanımsızdır (sıfıra bölme).",
        "Negatif sayılarla geometrik ve harmonik ortalama genellikle anlamsızdır; büyüme oranlarında negatif yüzdeler bu yüzden önce çarpana çevrilir.",
        "Aykırı büyük bir değer aritmetik ortalamayı en çok, harmonik ortalamayı en az etkiler; küçük değerler ise harmonik ortalamayı aşağı çeker."
      ]
    },
    {
      h: "Hangi durumda hangi ortalama? Karşılaştırma tablosu",
      table: {
        head: ["Durum", "Doğru ortalama", "Neden"],
        rows: [
          ["Sınav notları, boy, sıcaklık", "Aritmetik", "Değerler toplanabilir büyüklüklerdir"],
          ["Ders saati ya da kredili not", "Ağırlıklı aritmetik", "Her değerin önemi farklıdır"],
          ["Yıllık getiri, enflasyon, nüfus artışı", "Geometrik", "Oranlar art arda çarpılır"],
          ["En-boy oranı, ölçek faktörleri", "Geometrik", "Çarpımsal karşılaştırma"],
          ["Eşit mesafede farklı hızlar", "Harmonik", "Süre hıza göre değişir"],
          ["Eşit tutarla farklı fiyattan alım", "Harmonik", "Alınan adet fiyata göre değişir"],
          ["Eşit sürede farklı hızlar", "Aritmetik", "Süreler eşit, mesafeler toplanır"]
        ]
      }
    },
    {
      h: "Sınavlarda ortalama soruları nasıl gelir?",
      p: [
        "TYT ve LGS'de ortalama soruları genellikle toplam üzerinden kurulur. \"5 sayının ortalaması 12, bir sayı çıkarılınca ortalama 11 oluyor\" gibi bir soruda önce toplamları bulun: 5 × 12 = 60 ve 4 × 11 = 44. Çıkarılan sayı 60 − 44 = 16'dır. Ortalamayı değil toplamı izlemek bu tür soruların anahtarıdır.",
        "AYT'de ise ortalamalar eşitsizliği sıkça kullanılır. \"Pozitif x ve y için x + y = 10 ise xy en çok kaçtır?\" sorusunda AO ≥ GO kuralından 5 ≥ √(xy) yazılır ve xy ≤ 25 bulunur; en büyük değer x = y = 5 iken elde edilir. Aynı mantıkla \"x + 1/x ifadesinin en küçük değeri\" pozitif x için 2'dir, çünkü iki terimin geometrik ortalaması 1'dir."
      ]
    },
    {
      h: "Ortalama hesaplarında sık yapılan hatalar",
      ul: [
        "<strong>Yüzdelerin aritmetik ortalamasını almak:</strong> %50 artış ve %50 azalışın ortalaması %0 değildir; 1,5 × 0,5 = 0,75, yani gerçekte %25 kayıp vardır.",
        "<strong>Hızların düz ortalamasını almak:</strong> Eşit mesafede harmonik, eşit sürede aritmetik ortalama gerekir; hangisinin eşit olduğunu önce belirleyin.",
        "<strong>Ağırlıkları unutmak:</strong> Farklı sınıf mevcutlarının ortalamalarını birleştirirken her sınıfın öğrenci sayısını ağırlık olarak kullanın.",
        "<strong>Sıfır ve negatif değerlerle geometrik ortalama:</strong> Bu durumlarda yöntem tanımsız ya da anlamsızdır; veriyi çarpana çevirin.",
        "<strong>Aykırı değeri görmemek:</strong> Gelir gibi çarpık verilerde aritmetik ortalama yanıltıcı olabilir; medyanla birlikte değerlendirin."
      ],
      after: [
        "Tüm ortalama türlerini aynı anda görmek isterseniz [[arac:ortalama-hesapla|Ortalama Hesaplama]] aracına sayılarınızı yapıştırın; aritmetik, ağırlıklı, geometrik ve harmonik ortalamayla birlikte medyanı da tek ekranda verir. Verinin ortalama etrafında ne kadar dağıldığını ölçmek için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma yazısı]] sonraki doğal adımdır."
      ]
    }
  ],
  faq: [
    ["Aritmetik, geometrik ve harmonik ortalama arasındaki fark nedir?", "Aritmetik ortalama sayıları toplayıp adede böler, geometrik ortalama sayıları çarpıp adet dereceden kök alır, harmonik ortalama terslerin ortalamasının tersidir. 2 ve 8 için sırasıyla 5, 4 ve 3,2 sonucu çıkar."],
    ["Geometrik ortalama nasıl hesaplanır?", "Tüm sayılar çarpılır ve sayı adedi kadar dereceden kök alınır. 4, 9 ve 12 için çarpım 432'dir, küp kökü yaklaşık 7,56'dır. Yüzde değişimlerde önce her değeri 1,10 gibi bir çarpana çevirmek gerekir."],
    ["Harmonik ortalama ne zaman kullanılır?", "Değerler oran olduğunda ve oranın paydasındaki büyüklük eşit olduğunda kullanılır. Eşit mesafelerde farklı hızların ortalaması, eşit tutarla farklı fiyatlardan yapılan alımların ortalama fiyatı ve paralel dirençler tipik örneklerdir."],
    ["Gidiş-dönüş ortalama hızı neden aritmetik ortalama değildir?", "Yavaş giderken yolda daha uzun süre kalınır ve bu süre ortalamaya daha çok ağırlık verir. Gidiş 60 ve dönüş 90 km/sa ise 180 km'lik yolda 5 saatte 360 km gidilir; ortalama 72 km/sa olur, 75 değil."],
    ["Ağırlıklı ortalama nasıl bulunur?", "Her değer kendi ağırlığıyla çarpılır, çarpımlar toplanır ve ağırlıkların toplamına bölünür. 70, 85 ve 90 notları 4, 3 ve 2 saatlik derslere aitse ortalama 715 bölü 9, yani yaklaşık 79,44 olur."],
    ["Yıllık ortalama büyüme için hangi ortalama kullanılır?", "Yıllık büyüme oranları art arda çarpıldığı için geometrik ortalama kullanılır. Yüzde 10, yüzde 50 ve eksi yüzde 20 değişimlerin ortalaması geometrik olarak yaklaşık yüzde 9,70'tir; aritmetik ortalamanın verdiği yüzde 13,33 yanıltıcıdır."],
    ["Hangi ortalama her zaman en büyüktür?", "Pozitif sayılarda aritmetik ortalama en büyük, harmonik ortalama en küçüktür; geometrik ortalama ikisinin arasında kalır. Tüm sayılar eşitse üçü de aynı değeri verir."],
    ["Ortalama hesaplarında sık yapılan hatalar nelerdir?", "En sık hatalar yüzdelerin düz ortalamasını almak, eşit mesafeli hızlarda aritmetik ortalama kullanmak, ağırlıkları unutmak ve sıfır ya da negatif değerlerle geometrik ortalama hesaplamaya çalışmaktır."],
    ["İki sayının geometrik ortalaması ile diğer ortalamalar arasında nasıl bir ilişki vardır?", "İki pozitif sayı için geometrik ortalamanın karesi, aritmetik ve harmonik ortalamanın çarpımına eşittir. 2 ve 8 örneğinde 5 çarpı 3,2 eşittir 16 eder ve bunun karekökü olan 4 geometrik ortalamadır."]
  ],
  tools: ["geometrik-ortalama-hesapla", "harmonik-ortalama-hesapla", "ortalama-hesapla", "agirlikli-ortalama-hesapla"],
  related: ["ortalama-medyan-mod-nedir", "cagr-yillik-bilesik-buyume-orani", "hiz-yol-zaman-formulu", "standart-sapma-nasil-hesaplanir"],
  sources: [
    ["MEB – Ortaöğretim Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
