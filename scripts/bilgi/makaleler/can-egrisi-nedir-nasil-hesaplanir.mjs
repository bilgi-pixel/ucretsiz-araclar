export default {
  slug: "can-egrisi-nedir-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Çan Eğrisi Nedir? Üniversitede Bağıl Not Nasıl Hesaplanır",
  pageTitle: "Çan Eğrisi Nedir, Nasıl Hesaplanır? Bağıl Not ve T Skoru",
  description: "Çan eğrisi, notunuzun sınıf ortalaması ve standart sapmaya göre değerlendirildiği bağıl sistemdir. Z ve T skoru formülü, harf notu mantığı ve çözümlü örnekler.",
  keywords: ["çan eğrisi nedir", "çan eğrisi hesaplama", "bağıl değerlendirme", "t skoru nedir", "çan eğrisi harf notu", "sınıf ortalaması etkisi", "mutlak değerlendirme farkı", "standart sapma not"],
  lead: "Çan eğrisi, öğrencinin harf notunun ham puanına değil, puanının <strong>sınıf ortalamasına ve standart sapmaya göre konumuna</strong> bakılarak belirlendiği bağıl değerlendirme yöntemidir. Önce Z skoru = (notunuz − sınıf ortalaması) / standart sapma, ardından T skoru = 50 + 10·Z hesaplanır ve harf notu bu T skoruna göre verilir. Ortalaması 55, standart sapması 12 olan bir sınıfta 70 alan öğrencinin T skoru 62,5'tir. Bu sayfada formülleri, sınıf ortalamasının notunuzu nasıl etkilediğini, bağıl ve mutlak değerlendirme farkını ve sık sorulan durumları örneklerle anlatıyoruz.",
  kisaCevap: [
    "Çan eğrisi, notların çoğunun ortalama etrafında toplandığı normal dağılımın grafiğidir; bağıl not sistemi bu dağılımı esas alır.",
    "Z skoru = (ham not − sınıf ortalaması) / standart sapma; ortalamadan kaç sapma uzakta olduğunuzu gösterir.",
    "T skoru = 50 + 10 × Z; ortalaması 50, standart sapması 10 olan ortak bir ölçeğe dönüştürür.",
    "Aynı ham not, ortalaması düşük sınıfta yüksek, ortalaması yüksek sınıfta düşük T skoru verir.",
    "Harf notu sınırları, sınıf mevcudu eşiği ve FF için mutlak alt sınır üniversiteden üniversiteye değişir; kendi yönetmeliğinize bakın.",
    "Normal dağılımda notların yaklaşık %68'i ortalamanın ±1, %95'i ±2 standart sapması içinde kalır."
  ],
  figure: {
    alt: "Normal dağılım eğrisi: ortada sınıf ortalaması 55 ve T skoru 50, sağda ±1 ve ±2 standart sapma çizgileri; 70 alan öğrencinin konumu Z = 1,25 ve T = 62,5 olarak işaretli, geride bırakılan oran yaklaşık yüzde 89.",
    caption: "Ortalaması 55, standart sapması 12 olan bir sınıfta 70 puan, ortalamanın 1,25 sapma üstündedir: T skoru 62,5 olur ve notlar normal dağılıyorsa sınıfın yaklaşık %89,4'ü bu puanın altında kalır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Çan eğrisinde yeriniz: ortalama 55, sapma 12</text>
  <polygon points="60,300 60,297.8 85,295.4 110,291.2 135,284.1 160,272.9 185,256.7 210,235.1 235,208.4 260,178.7 285,149.0 310,123.5 335,106.2 360,100.0 385,106.2 410,123.5 435,149.0 460,178.7 485,208.4 485,300" class="ps"/>
  <polyline points="60,297.8 85,295.4 110,291.2 135,284.1 160,272.9 185,256.7 210,235.1 235,208.4 260,178.7 285,149.0 310,123.5 335,106.2 360,100.0 385,106.2 410,123.5 435,149.0 460,178.7 485,208.4 510,235.1 535,256.7 560,272.9 585,284.1 610,291.2 635,295.4 660,297.8" class="sp sw" fill="none"/>
  <line x1="40" y1="300" x2="680" y2="300" class="st" fill="none"/>
  <line x1="360" y1="90" x2="360" y2="300" class="st dash" fill="none"/>
  <line x1="260" y1="170" x2="260" y2="300" class="sb dash" fill="none"/><line x1="460" y1="170" x2="460" y2="300" class="sb dash" fill="none"/>
  <line x1="160" y1="262" x2="160" y2="300" class="sb dash" fill="none"/><line x1="560" y1="262" x2="560" y2="300" class="sb dash" fill="none"/>
  <line x1="485" y1="80" x2="485" y2="300" class="sa sw" fill="none"/>
  <circle cx="485" cy="208.4" r="7" class="a"/>
  <rect x="495" y="70" width="200" height="74" rx="8" class="sf sb"/>
  <text x="507" y="92" class="b">Notunuz: 70</text>
  <text x="507" y="113" class="sm">Z = (70 − 55) / 12 = 1,25</text>
  <text x="507" y="133" class="sm">T = 50 + 10 × 1,25 = 62,5</text>
  <text x="300" y="250" class="b mid p">%89,4 altında</text>
  <g class="sm mid">
    <text x="160" y="320">31</text><text x="260" y="320">43</text><text x="360" y="320" class="b">55</text><text x="460" y="320">67</text><text x="560" y="320">79</text>
    <text x="160" y="338" class="mu">T 30</text><text x="260" y="338" class="mu">T 40</text><text x="360" y="338" class="b">T 50</text><text x="460" y="338" class="mu">T 60</text><text x="560" y="338" class="mu">T 70</text>
  </g>
  <text x="40" y="320" class="sm mu">ham not</text>
  <rect x="160" y="356" width="400" height="22" rx="4" class="oks"/>
  <rect x="260" y="356" width="200" height="22" rx="4" class="ok"/>
  <text x="360" y="372" class="sm mid sf b">±1 sapma: yaklaşık %68</text>
  <text x="360" y="402" class="sm mid">±2 sapma (31 ile 79 arası): yaklaşık %95</text>
</svg>`
  },
  sections: [
    {
      h: "Çan eğrisi nedir?",
      p: [
        "Çan eğrisi, istatistikte <strong>normal dağılım</strong> olarak bilinen dağılımın grafiğidir. Boy uzunluğu, ölçüm hataları ya da kalabalık bir sınıfta sınav puanları gibi pek çok büyüklük bu biçimde dağılır: değerlerin çoğu ortalama civarında toplanır, ortalamadan uzaklaştıkça değer sayısı simetrik biçimde azalır. Grafik bir çanı andırdığı için bu adı alır.",
        "Üniversitelerde \"çan eğrisi\" ifadesi, bu dağılıma dayanan <strong>bağıl değerlendirme</strong> sistemi için kullanılır. Bu sistemde 70 puanın tek başına bir anlamı yoktur; aynı sınavı alan sınıfın genel başarısına göre 70 puan AA da olabilir, CC de. Amaç, sınavın zor ya da kolay olmasından kaynaklanan farkları dengelemek ve öğrencileri birbirine göre sıralamaktır.",
        "Çan eğrisinin iki temel parametresi vardır: dağılımın merkezini gösteren <strong>ortalama</strong> ve puanların ortalama etrafında ne kadar yayıldığını gösteren <strong>standart sapma</strong>. İkisinin nasıl hesaplandığını [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma]] ve [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan, mod]] yazılarında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Z skoru ve T skoru nasıl bulunur?",
      p: [
        "Bağıl değerlendirmede ilk adım, ham notunuzu standart bir ölçeğe çevirmektir. <strong>Z skoru</strong>, notunuzun ortalamadan kaç standart sapma uzakta olduğunu gösterir: 0 tam ortalama, +1 bir sapma üstü, −1 bir sapma altı demektir. Z skoru negatif ve ondalıklı olabildiği için not sistemlerinde genellikle ortalaması 50, standart sapması 10 olan <strong>T skoru</strong> kullanılır."
      ],
      formula: "Z = (ham not − sınıf ortalaması) / standart sapma\nT = 50 + 10 × Z\nÖrnek: not 70, ortalama 55, sapma 12 → Z = 15 / 12 = 1,25 → T = 62,5",
      ol: [
        "Sınıfın aritmetik ortalamasını bulun (ör. 55).",
        "Sınıfın standart sapmasını bulun (ör. 12). Bu değeri genellikle öğretim üyesi ya da öğrenci bilgi sistemi ilan eder.",
        "Notunuzdan ortalamayı çıkarın: 70 − 55 = 15.",
        "Farkı standart sapmaya bölün: 15 / 12 = 1,25. Bu sizin Z skorunuzdur.",
        "T skoruna çevirin: 50 + 10 × 1,25 = 62,5.",
        "T skorunu kurumunuzun harf notu tablosunda yerine koyun; sınırlar her üniversitede farklıdır."
      ],
      after: [
        "Z ve T skorlarını tek tek hesaplamak yerine [[arac:can-egrisi-hesapla|Çan Eğrisi Hesaplama]] aracına notunuzu, ortalamayı ve standart sapmayı girebilirsiniz. Yalnızca T skoru gerekiyorsa [[arac:t-skoru-hesapla|T Skoru Hesaplama]] aracı da aynı işi görür. Z skorunun istatistikteki diğer kullanımları için [[bilgi:z-skoru-nedir-nasil-hesaplanir|Z skoru]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sınıf ortalaması notumu nasıl etkiler?",
      p: [
        "Bağıl sistemin en çok merak edilen sonucu, aynı ham notun farklı sınıflarda farklı harf notuna dönüşebilmesidir. Aşağıdaki iki örnekte öğrenci iki dersten de 70 almıştır."
      ],
      table: {
        head: ["", "Ders A", "Ders B"],
        rows: [
          ["Ham not", "70", "70"],
          ["Sınıf ortalaması", "55", "75"],
          ["Standart sapma", "12", "8"],
          ["Z skoru", "(70 − 55) / 12 = 1,25", "(70 − 75) / 8 = −0,625"],
          ["T skoru", "62,5", "43,75"],
          ["Geride bırakılan oran (yaklaşık)", "%89,4", "%26,6"],
          ["Yorum", "Sınıfın üst diliminde", "Sınıfın alt yarısında"]
        ],
        caption: "Geride bırakılan oran, notların normal dağıldığı varsayımıyla Z skorundan hesaplanmıştır; gerçek sınıflarda biraz farklı olabilir."
      },
      after: [
        "Standart sapmanın etkisi de önemlidir. Puanları birbirine çok yakın bir sınıfta (sapma küçük) ortalamanın birkaç puan üstüne çıkmak T skorunu belirgin biçimde artırır. Puanların çok dağınık olduğu bir sınıfta (sapma büyük) ise aynı fark daha az etki yapar. Kısacası notunuzu belirleyen üç şey vardır: kendi puanınız, sınıfın ortalaması ve sınıfın ne kadar dağınık olduğu. Sınıf ortalamasını ham notlardan hesaplamak için [[arac:sinif-ortalamasi-hesapla|Sınıf Ortalaması Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Standart sapma neden önemlidir?",
      p: [
        "Standart sapma, puanların ortalamadan ortalama olarak ne kadar uzaklaştığını gösterir. Örneğin 10 öğrencinin notları 30, 40, 45, 50, 55, 60, 65, 70, 75 ve 80 olsun. Ortalama 57'dir. Her notun ortalamadan farkının karesi alınıp toplanır, öğrenci sayısına bölünür ve karekökü alınırsa yaklaşık 15,2 bulunur. (Bazı hesaplarda n yerine n − 1'e bölünür ve sonuç 16,0 çıkar; büyük sınıflarda fark küçüktür.)",
        "Normal dağılımın bilinen bir özelliği, standart sapmayla birlikte yüzdeleri de belirlemesidir: notların yaklaşık %68'i ortalamanın ±1 sapması, %95'i ±2 sapması, %99,7'si ±3 sapması içinde kalır. Bu yüzden T skoru 70'in üzerinde olan, yani ortalamanın 2 sapma üstündeki öğrenciler sınıfın yaklaşık en iyi %2,3'lük dilimini oluşturur.",
        "Standart sapma sıfıra yakınsa, yani herkes neredeyse aynı notu almışsa bağıl değerlendirme anlamlı sonuç vermez; bu yüzden pek çok yönetmelik bu durum için ayrı hükümler içerir. Hesabı kendiniz yapmak için [[arac:standart-sapma-hesapla|Standart Sapma Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Harf notu çan eğrisinde nasıl belirlenir?",
      p: [
        "T skoru hesaplandıktan sonra harf notu, üniversitenin belirlediği bir tabloyla verilir. Türkiye'de tek bir ulusal tablo yoktur; her üniversite kendi ön lisans ve lisans eğitim-öğretim yönetmeliğinde ve senato kararlarında sınırları belirler. Pek çok kurumda tablo, sınıf ortalamasının düzeyine göre de değişir: ortalaması çok yüksek bir sınıfta bir harf için gereken T skoru, ortalaması düşük bir sınıftakinden farklı olabilir.",
        "Aşağıdaki tablo yalnızca mantığı göstermek için hazırlanmış, yarım standart sapmalık dilimlere dayanan <strong>örnek bir ölçektir</strong>; herhangi bir üniversitenin resmî tablosu değildir. Sitedeki çan eğrisi aracı da örnek harf notunu bu ölçekle gösterir."
      ],
      table: {
        head: ["Örnek harf", "Z skoru aralığı", "T skoru aralığı", "Normal dağılımda yaklaşık oran"],
        rows: [
          ["AA", "1,5 ve üzeri", "65 ve üzeri", "%6,7"],
          ["BA", "1,0 – 1,5", "60 – 65", "%9,2"],
          ["BB", "0,5 – 1,0", "55 – 60", "%15,0"],
          ["CB", "0 – 0,5", "50 – 55", "%19,1"],
          ["CC", "−0,5 – 0", "45 – 50", "%19,1"],
          ["DC", "−1,0 – −0,5", "40 – 45", "%15,0"],
          ["DD", "−1,5 – −1,0", "35 – 40", "%9,2"],
          ["FF", "−1,5'in altı", "35'in altı", "%6,7"]
        ],
        caption: "Örnek ölçektir. Kendi harf notu sınırlarınız için üniversitenizin yönetmeliğine ve ilan edilen ders değerlendirme sonuçlarına bakın."
      },
      after: [
        "Bu örnekte 62,5 T skoru BA'ya karşılık gelir, 43,75 T skoru ise DC'ye. Gerçek uygulamada sınırlar farklı olabilir; ayrıca bazı kurumlar AB, BC, CD gibi ara harfler de kullanır."
      ]
    },
    {
      h: "Bağıl ve mutlak değerlendirme farkı nedir?",
      p: [
        "<strong>Mutlak değerlendirmede</strong> harf notu, ham notun önceden ilan edilmiş sabit aralıklara düşmesiyle belirlenir: örneğin 90–100 AA, 85–89 BA gibi. Sınıfın geri kalanının ne aldığı sizi etkilemez. Lise not sistemi ve birçok sertifika programı böyle çalışır.",
        "<strong>Bağıl değerlendirmede</strong> ise sınırlar sınav sonuçları açıklandıktan sonra, sınıfın dağılımına göre oluşur. Zor bir sınavda herkesin düşük puan alması, kimsenin haksız biçimde kalmasına yol açmaz; kolay bir sınavda da herkesin AA alması önlenir."
      ],
      table: {
        head: ["Özellik", "Mutlak değerlendirme", "Bağıl (çan eğrisi)"],
        rows: [
          ["Harf notunu belirleyen", "Yalnızca kendi puanınız", "Puanınızın sınıftaki konumu"],
          ["Sınırlar ne zaman belli olur?", "Önceden ilan edilir", "Sınav sonrası, sınıf verisiyle"],
          ["Zor sınavın etkisi", "Herkesin notu düşer", "Dağılım dengelenir"],
          ["Sınıf mevcudu", "Önemli değil", "Genellikle belirli bir sayının üzerinde uygulanır"],
          ["Öğrenciler arası etki", "Yok", "Diğerlerinin başarısı sizin konumunuzu etkiler"]
        ]
      }
    },
    {
      h: "Hangi sınıf mevcudunda uygulanır, FF sınırı nasıl belirlenir?",
      p: [
        "Bağıl değerlendirme istatistiğe dayandığı için çok küçük sınıflarda güvenilir sonuç vermez; beş öğrencilik bir sınıfta ortalama ve sapma tek bir öğrencinin notuyla büyük ölçüde değişir. Bu yüzden yönetmeliklerin çoğu bağıl sistemi yalnızca öğrenci sayısı belirli bir eşiğin üzerindeyse uygular, eşiğin altında mutlak tabloya geçer. Bu eşik kurumdan kuruma farklıdır; 10, 20 ya da 30 gibi değerler görülebilir.",
        "FF sınırında da genellikle iki koşul birlikte aranır. Birincisi <strong>mutlak alt sınırdır</strong>: dönem sonu sınavından ya da ham başarı notundan belirli bir puanın altında kalan öğrenci, sınıfın dağılımı ne olursa olsun FF alır ve bu öğrenciler çoğu zaman ortalama hesabına da katılmaz. İkincisi bağıl tablodaki en alt T skoru sınırıdır. Bazı kurumlar devamsızlıktan kalanları (DZ gibi kodlarla) da ayrıca hesap dışında tutar.",
        "Bu ayrıntılar her üniversitenin yönetmeliğinde ve senato esaslarında yazılıdır. Kendi durumunuzu kesin öğrenmek için öğrenci işleri sayfasındaki güncel yönetmeliğe ve dersin değerlendirme ilanına bakmanız gerekir."
      ]
    },
    {
      h: "AÖF'te çan eğrisi var mı?",
      p: [
        "Anadolu Üniversitesi Açıköğretim Sistemi'nin yayımladığı sınav ve değerlendirme kılavuzunda genel dersler için hem bağıl hem mutlak tablo yer alır: kılavuza göre başarı notu ara sınavın %30'u ile dönem sonu sınavının %70'inden oluşur, genel derslerde alt sınır 35'tir ve bir dersi alan öğrenci sayısı 30 ve üzerindeyse yüzdelik dilimlere dayalı bağıl tablo, 30'un altındaysa sabit aralıklı mutlak tablo uygulanır. Laboratuvar ve uygulama dersleri için ayrı sabit tablolar vardır.",
        "Bu kurallar dönemden döneme güncellenebilir ve diğer üniversitelerin açık ve uzaktan öğretim programları farklı esaslar kullanabilir. Kesin bilgi için kayıtlı olduğunuz programın o döneme ait resmî kılavuzunu esas alın."
      ]
    },
    {
      h: "Çan eğrisi hakkında sık yapılan yanlışlar",
      ul: [
        "<strong>\"50 alan herkes geçer\" sanmak:</strong> Bağıl sistemde 50 puan, ortalaması 70 olan bir sınıfta alt dilimde kalabilir.",
        "<strong>\"Çan eğrisi notu her zaman yükseltir\" sanmak:</strong> Ortalaması yüksek sınıfta bağıl sistem notunuzu düşürebilir.",
        "<strong>Standart sapmayı yok saymak:</strong> Yalnızca ortalamaya bakmak eksiktir; aynı ortalamada sapma küçükse küçük farklar büyük etki yapar.",
        "<strong>Başka üniversitenin tablosunu kullanmak:</strong> Harf sınırları kuruma ve bazen fakülteye göre değişir.",
        "<strong>Mutlak alt sınırı unutmak:</strong> Dönem sonu sınavında alt sınırın altında kalan öğrenci bağıl hesaba girmeden FF alabilir.",
        "<strong>Küçük sınıflarda çan eğrisi beklemek:</strong> Mevcut eşiğin altındaki derslerde çoğu zaman mutlak tablo uygulanır."
      ],
      after: [
        "Vize ve final ağırlıklarıyla ham başarı notunuzu nasıl hesaplayacağınızı ve not ortalamasının 4'lük sistemden 100'lük sisteme nasıl çevrildiğini merak ediyorsanız [[bilgi:gano-4luk-sistemden-100luk-sisteme|GANO dönüşümü]] yazısına bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Çan eğrisi nedir?", "Çan eğrisi, değerlerin çoğunun ortalama etrafında toplandığı normal dağılımın grafiğidir. Üniversitelerde harf notunun ham puana değil, puanın sınıf ortalaması ve standart sapmaya göre konumuna bakılarak verildiği bağıl değerlendirme sistemi için kullanılır."],
    ["Üniversitede çan eğrisi nasıl hesaplanır?", "Önce ham not, sınıf ortalaması ve standart sapma kullanılarak Z skoru bulunur. Ardından T = 50 + 10 × Z formülüyle T skoru hesaplanır ve harf notu, üniversitenin yönetmeliğindeki T skoru tablosuna göre belirlenir."],
    ["T skoru nasıl bulunur?", "T skoru, Z skorunun 10 ile çarpılıp 50 eklenmesiyle bulunur. Ortalaması 55 ve standart sapması 12 olan sınıfta 70 alan öğrencinin Z skoru 1,25, T skoru ise 62,5 olur."],
    ["Sınıf ortalaması notumu nasıl etkiler?", "Bağıl sistemde sınıf ortalaması yükseldikçe aynı ham notun T skoru düşer. 70 puan, ortalaması 55 olan sınıfta 62,5 T skoru verirken ortalaması 75 ve sapması 8 olan sınıfta 43,75 T skoruna karşılık gelir."],
    ["Bağıl ve mutlak değerlendirme farkı nedir?", "Mutlak değerlendirmede harf notu önceden ilan edilmiş sabit puan aralıklarına göre verilir ve başkalarının notu etkili olmaz. Bağıl değerlendirmede sınırlar sınav sonrası sınıfın ortalaması ve dağılımına göre oluşur."],
    ["Çan eğrisi hangi sınıf mevcudunda uygulanır?", "Bu eşik üniversiteden üniversiteye değişir; yönetmeliklerde 10, 20 ya da 30 gibi farklı sayılar görülebilir. Öğrenci sayısı eşiğin altında kalan derslerde genellikle mutlak değerlendirme tablosu kullanılır, bu yüzden kendi yönetmeliğinize bakın."],
    ["Standart sapma neden önemlidir?", "Standart sapma, notların ortalama etrafında ne kadar dağıldığını gösterir. Sapma küçükse ortalamadan birkaç puan uzaklaşmak T skorunu çok değiştirir; sapma büyükse aynı fark daha az etki yapar ve harf notu daha az değişir."],
    ["Çan eğrisinde FF sınırı nasıl belirlenir?", "Çoğu kurumda iki koşul vardır: dönem sonu sınavı ya da ham başarı notu için mutlak bir alt sınır ve bağıl tablodaki en düşük T skoru sınırı. Alt sınırın altında kalanlar dağılımdan bağımsız olarak FF alabilir; değerler kuruma göre değişir."],
    ["AÖF'te çan eğrisi var mı?", "Anadolu Üniversitesi Açıköğretim kılavuzuna göre genel derslerde öğrenci sayısı 30 ve üzerindeyse yüzdelik dilime dayalı bağıl tablo, altındaysa mutlak tablo uygulanır ve alt sınır 35'tir. Kurallar güncellenebileceği için dönemin resmî kılavuzunu esas alın."]
  ],
  tools: ["can-egrisi-hesapla", "t-skoru-hesapla", "sinif-ortalamasi-hesapla", "standart-sapma-hesapla"],
  related: ["standart-sapma-nasil-hesaplanir", "z-skoru-nedir-nasil-hesaplanir", "ortalama-medyan-mod-nedir", "gano-4luk-sistemden-100luk-sisteme"],
  uyari: "harf notu sınırları kuruma göre değişir; kesin sonuç için üniversitenizin yönetmeliğini ve öğrenci işlerini esas alın",
  sources: [
    ["YÖK – Yükseköğretim Kurulu", "https://www.yok.gov.tr/"],
    ["Anadolu Üniversitesi Açıköğretim Sistemi", "https://www.anadolu.edu.tr/"]
  ]
};
