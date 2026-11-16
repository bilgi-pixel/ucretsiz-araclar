export default {
  slug: "z-skoru-nedir-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Z Skoru Nedir, Nasıl Hesaplanır? Standart Puan, T Skoru ve Yüzdelik Dilim",
  pageTitle: "Z Skoru Nedir, Nasıl Hesaplanır? T Skoru ve Yüzdelik Dilim",
  description: "Z skoru = (x − ortalama) ÷ standart sapma. Negatif z ne demek, z tablosu nasıl okunur, z'den yüzdelik dilim ve T skoru nasıl bulunur; çözümlü sınav örnekleri.",
  keywords: ["z skoru nedir", "z skoru hesaplama", "z skoru formülü", "standart puan nedir", "t skoru nedir", "z tablosu nasıl okunur", "yüzdelik dilim hesaplama", "negatif z skoru"],
  lead: "Z skoru, bir değerin ortalamadan kaç standart sapma uzakta olduğunu gösterir ve <strong>z = (x − μ) ÷ σ</strong> formülüyle hesaplanır; x değer, μ ortalama, σ standart sapmadır. Ortalaması 60, standart sapması 12 olan bir sınavda 78 alan öğrencinin z skoru (78 − 60) ÷ 12 = 1,5'tir ve normal dağılımda bu, öğrencilerin yaklaşık %93'ünden yüksek puan demektir. Bu sayfada z skorunun anlamını, z tablosunu okumayı, T skoruna ve yüzdelik dilime çevirmeyi ve sınavlardaki standart puan mantığını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Formül: z = (x − μ) ÷ σ; sonuç birimsizdir ve standart sapma cinsinden uzaklığı verir.",
    "z = 0 ortalamaya eşit, pozitif z ortalamanın üstünde, negatif z ortalamanın altında demektir.",
    "Normal dağılımda değerlerin %68'i z = −1 ile +1, %95'i −2 ile +2, %99,7'si −3 ile +3 arasındadır.",
    "Z skorundan yüzdelik dilim z tablosuyla bulunur: z = 1 → %84,13, z = 1,5 → %93,32, z = 2 → %97,72.",
    "T skoru = 50 + 10 · z; z = 1,5 olan değerin T skoru 65'tir.",
    "Ters formül: x = μ + z · σ; istenen yüzdelik dilimin karşılığı olan puan bu şekilde bulunur."
  ],
  figure: {
    alt: "Normal dağılım eğrisi: yatay eksende z skoru eksi 3'ten artı 3'e ve karşılık gelen puanlar 36'dan 84'e. Z = 1,5 noktasının solu taranmış ve yüzde 93,32 olarak işaretlenmiş; sağ kuyruk yüzde 6,68.",
    caption: "Ortalaması 60, standart sapması 12 olan bir sınavda 78 puan z = 1,5'e karşılık gelir. Eğrinin altında bu noktanın solunda kalan alan (%93,32), puanı 78'den düşük olanların oranıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Z skoru ve yüzdelik dilim</text>
  <text x="360" y="54" class="sm mid t2">Örnek: ortalama 60, standart sapma 12, puan 78 → z = 1,5</text>
  <polygon points="60,300 60,297.8 70,297.0 80,296.0 90,294.8 100,293.2 110,291.2 120,288.8 130,285.8 140,282.2 150,277.9 160,272.9 170,267.1 180,260.4 190,252.9 200,244.4 210,235.1 220,224.9 230,214.1 240,202.6 250,190.8 260,178.7 270,166.6 280,154.8 290,143.5 300,132.9 310,123.5 320,115.4 330,108.8 340,104.0 350,101.0 360,100.0 370,101.0 380,104.0 390,108.8 400,115.4 410,123.5 420,132.9 430,143.5 440,154.8 450,166.6 460,178.7 470,190.8 480,202.6 490,214.1 500,224.9 510,235.1 510,300" class="ps"/>
<polyline points="60,297.8 70,297.0 80,296.0 90,294.8 100,293.2 110,291.2 120,288.8 130,285.8 140,282.2 150,277.9 160,272.9 170,267.1 180,260.4 190,252.9 200,244.4 210,235.1 220,224.9 230,214.1 240,202.6 250,190.8 260,178.7 270,166.6 280,154.8 290,143.5 300,132.9 310,123.5 320,115.4 330,108.8 340,104.0 350,101.0 360,100.0 370,101.0 380,104.0 390,108.8 400,115.4 410,123.5 420,132.9 430,143.5 440,154.8 450,166.6 460,178.7 470,190.8 480,202.6 490,214.1 500,224.9 510,235.1 520,244.4 530,252.9 540,260.4 550,267.1 560,272.9 570,277.9 580,282.2 590,285.8 600,288.8 610,291.2 620,293.2 630,294.8 640,296.0 650,297.0 660,297.8" class="sp sw" fill="none"/>

  <line x1="510" y1="300" x2="510" y2="235" class="sdg sw" fill="none"/>
  <circle cx="510" cy="235" r="6" class="dg"/>
  <line x1="40" y1="300" x2="680" y2="300" class="st" fill="none"/>
  <g class="sm mid">
    <line x1="160" y1="300" x2="160" y2="308" class="st" fill="none"/><text x="160" y="324">−2</text>
    <line x1="260" y1="300" x2="260" y2="308" class="st" fill="none"/><text x="260" y="324">−1</text>
    <line x1="360" y1="300" x2="360" y2="308" class="st" fill="none"/><text x="360" y="324">0</text>
    <line x1="460" y1="300" x2="460" y2="308" class="st" fill="none"/><text x="460" y="324">1</text>
    <line x1="560" y1="300" x2="560" y2="308" class="st" fill="none"/><text x="560" y="324">2</text>
    <text x="60" y="324">−3</text><text x="660" y="324">3</text>
    <text x="160" y="342" class="mu">36</text><text x="260" y="342" class="mu">48</text><text x="360" y="342" class="mu">60</text><text x="460" y="342" class="mu">72</text><text x="560" y="342" class="mu">84</text>
  </g>
  <text x="30" y="324" class="sm end b">z</text><text x="30" y="342" class="sm end b">puan</text>
  <text x="330" y="230" class="b mid p">%93,32</text>
  <text x="330" y="250" class="sm mid">puanı 78'in altında</text>
  <text x="600" y="230" class="b mid dg">%6,68</text>
  <text x="600" y="250" class="sm mid">üstünde</text>
  <rect x="20" y="362" width="680" height="46" rx="8" class="sf sb"/>
  <text x="360" y="382" class="sm mid b">68–95–99,7 kuralı</text>
  <text x="360" y="400" class="sm mid">Değerlerin %68'i ±1, %95'i ±2, %99,7'si ±3 standart sapma içindedir.</text>
</svg>`
  },
  sections: [
    {
      h: "Z skoru nedir, ne işe yarar?",
      p: [
        "Bir sınavdan 78 aldığınızı düşünün. Bu iyi bir puan mı? Cevap, diğer öğrencilerin nasıl bir sonuç aldığına bağlıdır. Ortalama 50 ise çok iyi, ortalama 85 ise zayıf bir puandır. Z skoru tam olarak bu soruyu cevaplar: değeri, grubun ortalamasına ve yayılımına göre konumlandırır.",
        "Z skoru aynı zamanda <strong>standart puan</strong> olarak da adlandırılır. En büyük faydası, farklı ölçeklerdeki değerleri karşılaştırılabilir hâle getirmesidir. Matematik sınavındaki 70 ile Türkçe sınavındaki 80'i doğrudan karşılaştıramazsınız; ama ikisini de z skoruna çevirdiğinizde hangisinde grubuna göre daha başarılı olduğunuz ortaya çıkar.",
        "Z skoru istatistikte aykırı değer tespitinde, kalite kontrolde, tıpta büyüme ve kemik yoğunluğu değerlendirmesinde, finansta risk ölçümünde ve sınav puanlarının standartlaştırılmasında kullanılır."
      ]
    },
    {
      h: "Z skoru formülü",
      formula: "z = (x − μ) ÷ σ\nx: incelenen değer · μ: ortalama · σ: standart sapma\nTers formül: x = μ + z · σ\nÖrneklemle çalışıyorsanız: z = (x − x̄) ÷ s",
      p: [
        "Formülün iki adımı vardır. Önce değerden ortalamayı çıkararak farkı bulursunuz; bu fark değerin ortalamanın ne kadar üstünde ya da altında olduğunu gösterir. Sonra bu farkı standart sapmaya bölerek \"kaç standart sapma\" sorusunun cevabını elde edersiniz.",
        "Standart sapma bilinmiyorsa önce onu hesaplamanız gerekir. Ham verilerden ortalamayı ve standart sapmayı bulmak için [[arac:standart-sapma-hesapla|Standart Sapma Hesaplama]] aracını, kavramın ayrıntılı anlatımı için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma nasıl hesaplanır]] yazısını kullanabilirsiniz. Ortalama kavramı için [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod]] yazısı da yararlıdır."
      ]
    },
    {
      h: "Adım adım çözümlü örnekler",
      ol: [
        "<strong>Ortalaması 60, standart sapması 12 olan sınavda 78 puan:</strong> z = (78 − 60) ÷ 12 = 18 ÷ 12 = <strong>1,5</strong>. Öğrenci ortalamanın 1,5 standart sapma üstündedir.",
        "<strong>Aynı sınavda 48 puan:</strong> z = (48 − 60) ÷ 12 = −12 ÷ 12 = <strong>−1</strong>. Öğrenci ortalamanın 1 standart sapma altındadır.",
        "<strong>Aynı sınavda 60 puan:</strong> z = (60 − 60) ÷ 12 = <strong>0</strong>. Puan tam ortalamadadır.",
        "<strong>İki sınavı karşılaştırma:</strong> Matematikte 70 (ortalama 55, standart sapma 10) → z = 1,5. Türkçede 80 (ortalama 72, standart sapma 4) → z = 2. Türkçe puanı ham olarak daha yüksek olduğu kadar grubuna göre de daha başarılıdır: z = 2 > z = 1,5.",
        "<strong>Ters soru:</strong> Ortalaması 60, standart sapması 12 olan sınavda en iyi %10'a girmek için kaç puan gerekir? Yüzde 90'a karşılık gelen z yaklaşık 1,28'dir. x = 60 + 1,28 × 12 ≈ <strong>75,4</strong> puan."
      ],
      after: [
        "Değer, ortalama ve standart sapmayı yazarak z skorunu, yüzdelik dilimi ve T skorunu tek seferde görmek için [[arac:z-skoru-hesapla|Z Skoru Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Negatif z skoru ne anlama gelir?",
      p: [
        "Negatif z skoru, değerin ortalamanın altında olduğunu gösterir; bir hata ya da \"kötü\" anlamı taşımaz. z = −1 değerin ortalamadan bir standart sapma düşük, z = −2,5 ise iki buçuk standart sapma düşük olduğunu anlatır. Negatif işaret yalnızca yönü, sayının büyüklüğü ise uzaklığı gösterir.",
        "Bazı ölçümlerde düşük değer iyidir: koşu süresi, hata sayısı, kan basıncı gibi. Bu durumlarda negatif z skoru olumlu bir sonuçtur. Örneğin bir koşu grubunda 5 km süresinin z skoru −1,2 olan sporcu ortalamadan belirgin şekilde hızlıdır. Z skorunu yorumlarken ölçülen şeyin yönünü her zaman göz önünde tutun."
      ]
    },
    {
      h: "Z tablosu nasıl okunur? Z'den yüzdelik dilime",
      p: [
        "Veriler normal dağılıma (çan eğrisine) uyuyorsa z skoru doğrudan bir yüzdelik dilime çevrilebilir. Standart normal dağılım tablosu (z tablosu), her z değeri için eğrinin altında o değerin solunda kalan alanı, yani değerden düşük olanların oranını verir."
      ],
      table: {
        head: ["z skoru", "Soldaki alan (yüzdelik dilim)", "Sağdaki alan", "Yorum"],
        rows: [
          ["−2,0", "%2,28", "%97,72", "Çok düşük"],
          ["−1,5", "%6,68", "%93,32", "Düşük"],
          ["−1,0", "%15,87", "%84,13", "Ortalamanın altında"],
          ["−0,5", "%30,85", "%69,15", "Ortalamaya yakın, altında"],
          ["0", "%50,00", "%50,00", "Tam ortalama"],
          ["0,5", "%69,15", "%30,85", "Ortalamaya yakın, üstünde"],
          ["1,0", "%84,13", "%15,87", "Ortalamanın üstünde"],
          ["1,5", "%93,32", "%6,68", "Yüksek"],
          ["1,96", "%97,50", "%2,50", "Güven aralıklarında kullanılan sınır"],
          ["2,0", "%97,72", "%2,28", "Çok yüksek"],
          ["3,0", "%99,87", "%0,13", "Son derece yüksek"]
        ],
        caption: "Basılı z tablolarında satırlar z'nin ilk ondalığını (örneğin 1,5), sütunlar ikinci ondalığını (örneğin 0,06) gösterir; z = 1,56 değeri 1,5 satırı ile 0,06 sütununun kesiştiği hücrededir."
      },
      after: [
        "Tablodaki simetri dikkat çekicidir: z = −1'in soldaki alanı ile z = +1'in sağdaki alanı aynıdır (%15,87). Bu yüzden birçok tablo yalnızca pozitif z değerlerini verir; negatif değerler için 1'den çıkarma yapılır. Ham verilerin yüzdelik dilimini normal dağılım varsayımı olmadan bulmak isterseniz [[arac:yuzdelik-dilim-hesapla|Yüzdelik Dilim (Persentil) Hesaplama]] aracı doğrudan veriler üzerinden çalışır."
      ]
    },
    {
      h: "T skoru ile z skoru farkı nedir?",
      p: [
        "Z skorlarının negatif ve ondalıklı olması, özellikle öğrencilere ve velilere sonuç açıklarken anlaşılmayı zorlaştırır. Bu yüzden z skoru çoğu zaman daha kullanışlı bir ölçeğe dönüştürülür. En yaygın dönüşüm <strong>T skorudur</strong>: ortalaması 50, standart sapması 10 olan bir ölçek."
      ],
      formula: "T = 50 + 10 · z\nz = 1,5 → T = 65 · z = −1 → T = 40 · z = 0 → T = 50",
      after: [
        "T skoru pratikte her zaman pozitiftir (z = −5'te bile 0'dır) ve tam sayılarla ifade edilebilir. Aynı mantıkla başka ölçekler de kurulabilir: zekâ testlerinde ortalama 100, standart sapma 15 kullanılır. Hepsi aynı z skorunun farklı birimlerle yazılmasıdır. Ham puanı doğrudan T skoruna çevirmek için [[arac:t-skoru-hesapla|T Skoru (Standart Puan) Hesaplama]] aracını kullanabilirsiniz.",
        "Önemli bir not: istatistikte \"t testi\" ve \"t dağılımı\" kavramları da vardır; bunlar küçük örneklemlerde kullanılan farklı bir dağılımdır ve buradaki T skoruyla aynı şey değildir. Kemik yoğunluğu raporlarındaki T skoru ise genç yetişkin ortalamasına göre hesaplanan bir z skorudur; bu tıbbi değerlendirmeyi hekiminizle yorumlamalısınız."
      ]
    },
    {
      h: "Sınavlarda standart puan nasıl hesaplanır?",
      p: [
        "Merkezî sınavlarda testlerin zorluk düzeyleri farklı olduğu için ham netler doğrudan toplanmaz. Ölçme kurumları ham puanları önce standart puana çevirir. ÖSYM, birçok sınavda her testin ham puanlarını ortalaması 50, standart sapması 10 olan standart puanlara dönüştürdüğünü kılavuzlarında açıklar; bu dönüşüm yukarıdaki T skoru mantığıyla aynıdır. Ardından standart puanlar puan türüne göre ağırlıklandırılır ve ölçekleme yapılır.",
        "Bu yöntemin sonucu şudur: zor bir testte alınan 20 net, kolay bir testte alınan 30 netten daha değerli olabilir, çünkü önemli olan netin grup ortalamasına göre konumudur. Ayrıntılı ağırlıklar ve puan türleri her yıl sınav kılavuzunda yayımlanır. Sınava özgü hesaplar için [[rehber:tyt-ayt-puan-nasil-hesaplanir|TYT ve AYT puan hesaplama rehberi]] yol gösterir."
      ]
    },
    {
      h: "Standart sapma z skorunu nasıl etkiler?",
      p: [
        "Aynı ham fark, standart sapmaya göre çok farklı z skorları üretir. Ortalaması 60 olan iki sınavda 78 aldığınızı düşünün. Birinci sınavda standart sapma 12 ise z = 1,5'tir ve sınıfın yaklaşık %93'ünü geride bırakırsınız. İkinci sınavda standart sapma 6 ise z = 3'tür; artık sınıfın %99,87'sinden yüksek puan almışsınızdır.",
        "Standart sapma küçükse herkes ortalamaya yakın puan almıştır ve küçük farklar büyük z skorlarına dönüşür. Standart sapma büyükse puanlar dağınıktır ve ortalamadan epey uzaklaşmak gerekir. Bu yüzden z skoru hesaplanırken hem ortalama hem standart sapma aynı gruptan ve aynı sınavdan alınmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Standart sapma yerine varyans kullanmak:</strong> Paydaya varyans (σ²) değil, standart sapma (σ) yazılır.",
        "<strong>Her dağılımı normal saymak:</strong> Z'den yüzdelik dilime çeviri yalnızca normal dağılıma yakın verilerde güvenilirdir; çarpık dağılımlarda yanıltıcı olabilir.",
        "<strong>İşareti atlamak:</strong> z = −1,5 ile z = 1,5 tamamen farklı konumlardır.",
        "<strong>Farklı grupların ortalamasını karıştırmak:</strong> Bir öğrencinin z skoru kendi sınıfının değil, başka bir grubun ortalamasıyla hesaplanırsa yorum anlamsızlaşır.",
        "<strong>Z tablosunda yanlış alanı okumak:</strong> Bazı tablolar ortalamadan z'ye kadarki alanı (0 ile z arası) verir; sol kuyruğu veren tabloyla karıştırmayın."
      ]
    }
  ],
  faq: [
    ["Z skoru nedir?", "Z skoru, bir değerin ortalamadan kaç standart sapma uzakta olduğunu gösteren standart puandır. Farklı ölçeklerdeki değerleri karşılaştırmayı sağlar; z = 0 ortalamayı, pozitif değerler ortalamanın üstünü, negatif değerler altını gösterir."],
    ["Z skoru nasıl hesaplanır?", "Değerden ortalama çıkarılır ve sonuç standart sapmaya bölünür: z = (x − μ) ÷ σ. Ortalaması 60, standart sapması 12 olan sınavda 78 puan için z = 18 ÷ 12 = 1,5 bulunur."],
    ["Negatif z skoru ne anlama gelir?", "Değerin ortalamanın altında olduğunu gösterir. z = −1 ortalamadan bir standart sapma düşük demektir. Koşu süresi ya da hata sayısı gibi düşük değerin iyi olduğu ölçümlerde negatif z skoru olumlu bir sonuçtur."],
    ["Z skorundan yüzdelik dilim nasıl bulunur?", "Veriler normal dağılıma uyuyorsa z tablosundan z değerinin solundaki alan okunur. z = 1 için %84,13, z = 1,5 için %93,32, z = 2 için %97,72 bulunur; bu oran değerden düşük olanların payıdır."],
    ["T skoru ile z skoru farkı nedir?", "T skoru, z skorunun ortalaması 50, standart sapması 10 olan ölçeğe çevrilmiş hâlidir: T = 50 + 10 · z. Negatif ve ondalıklı sayılardan kaçınarak sonucu daha anlaşılır kılar; bilgi içeriği z skoruyla aynıdır."],
    ["Sınavlarda standart puan nasıl hesaplanır?", "Her testin ham puanı, o testi alan adayların ortalaması ve standart sapmasıyla z skoruna, ardından ortalaması 50, standart sapması 10 olan standart puana çevrilir. Standart puanlar puan türüne göre ağırlıklandırılır."],
    ["Z tablosu nasıl okunur?", "Satırlarda z'nin tam kısmı ve ilk ondalığı, sütunlarda ikinci ondalığı bulunur. İkisinin kesiştiği hücre, standart normal eğri altında o z değerinin solundaki alanı verir. Tablonun hangi alanı gösterdiğini başlığından kontrol edin."],
    ["Standart sapma z skorunu nasıl etkiler?", "Standart sapma paydada olduğu için küçüldükçe z skoru büyür. Aynı 18 puanlık fark, standart sapma 12 iken z = 1,5, standart sapma 6 iken z = 3 eder. Puanlar sıkışık olduğunda küçük farklar daha anlamlı hâle gelir."],
    ["Z skoru kaç olursa aykırı değer sayılır?", "Yaygın bir pratik kural, mutlak değeri 3'ün üzerindeki z skorlarını olası aykırı değer olarak incelemektir; bazı alanlarda 2,5 ya da 2 eşiği kullanılır. Bu bir kesin kural değil, verinin kontrol edilmesi gerektiğine dair bir işarettir."]
  ],
  tools: ["z-skoru-hesapla", "t-skoru-hesapla", "standart-sapma-hesapla", "yuzdelik-dilim-hesapla"],
  related: ["standart-sapma-nasil-hesaplanir", "ortalama-medyan-mod-nedir", "olasilik-nasil-hesaplanir"],
  sources: [
    ["ÖSYM – Sınav kılavuzları ve puan hesaplama", "https://www.osym.gov.tr/"],
    ["Türkiye İstatistik Kurumu", "https://www.tuik.gov.tr/"]
  ]
};
