export default {
  slug: "standart-sapma-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Standart Sapma Nasıl Hesaplanır? Varyans Formülü ve Adım Adım Örnek",
  pageTitle: "Standart Sapma Nasıl Hesaplanır? Formül ve Çözümlü Örnek",
  description: "Standart sapma, varyansın kareköküdür: sapmaların karelerinin ortalaması alınıp kökü bulunur. n ve n-1 farkı, adım adım örnek, değişim katsayısı ve Excel formülü.",
  keywords: ["standart sapma nasıl hesaplanır", "standart sapma formülü", "varyans nedir", "standart sapma ne anlama gelir", "örneklem standart sapması", "standart sapma excel", "n-1 neden", "değişim katsayısı"],
  lead: "Standart sapma, veri değerlerinin ortalamadan ortalama olarak ne kadar uzaklaştığını gösteren yayılım ölçüsüdür ve <strong>varyansın kareköküdür</strong>. Hesaplamak için önce ortalamayı bulur, her değerin ortalamadan farkının karesini alır, bu kareleri toplayıp anakütle için n'ye, örneklem için n − 1'e bölersiniz; çıkan varyansın karekökü standart sapmadır. Örneğin 60, 70, 80, 90, 100 notlarının örneklem standart sapması 15,81'dir. Aşağıda formülü, adım adım çözümü, n − 1'in nedenini ve sonucun nasıl yorumlanacağını bulacaksınız.",
  kisaCevap: [
    "Varyans = sapmaların kareleri toplamı ÷ n (anakütle) ya da ÷ (n − 1) (örneklem).",
    "Standart sapma = √varyans; birimi verinin kendi birimiyle aynıdır.",
    "60, 70, 80, 90, 100 için ortalama 80, kareler toplamı 1.000; örneklem varyansı 250, standart sapma 15,81.",
    "Standart sapma hiçbir zaman negatif olamaz; tüm değerler eşitse 0 olur.",
    "Değişim katsayısı = standart sapma ÷ ortalama × 100; farklı ölçekteki verileri karşılaştırmaya yarar.",
    "Excel'de örneklem için STDSAPMA.S (STDEV.S), anakütle için STDSAPMA.P (STDEV.P) kullanılır."
  ],
  figure: {
    alt: "60, 70, 80, 90 ve 100 notlarının sayı doğrusu üzerinde gösterimi; ortalama 80 çizgisi, her notun ortalamadan sapması ve sapma kareleri 400, 100, 0, 100, 400; ortalamanın bir standart sapma çevresi 64,19 ile 95,81 arası.",
    caption: "Beş öğrencinin notları ve ortalamadan sapmaları. Sapmaların kareleri toplanır (1.000), n − 1 = 4'e bölünür (250) ve karekök alınır (15,81). Taralı bant ortalamanın bir standart sapma altı ve üstüdür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Standart sapma: ortalamadan ortalama uzaklık</text>
  <rect x="198" y="70" width="324" height="150" class="ps"/>
  <text x="360" y="88" class="sm mid p b">Ortalama ± 1 standart sapma: 64,19 – 95,81</text>
  <line x1="60" y1="200" x2="660" y2="200" class="st" fill="none"/>
  <g class="sm mid mu"><text x="60" y="222">50</text><text x="160" y="222">60</text><text x="260" y="222">70</text><text x="360" y="222">80</text><text x="460" y="222">90</text><text x="560" y="222">100</text><text x="660" y="222">110</text></g>
  <line x1="360" y1="100" x2="360" y2="200" class="sp sw dash" fill="none"/>
  <text x="372" y="116" class="sm b p">Ortalama 80</text>
  <circle cx="160" cy="180" r="9" class="p"/><circle cx="260" cy="180" r="9" class="p"/><circle cx="360" cy="180" r="9" class="p"/><circle cx="460" cy="180" r="9" class="p"/><circle cx="560" cy="180" r="9" class="p"/>
  <line x1="170" y1="150" x2="355" y2="150" class="sa" fill="none"/><text x="262" y="144" class="sm mid">−20</text>
  <line x1="270" y1="132" x2="355" y2="132" class="sa" fill="none"/><text x="312" y="126" class="sm mid">−10</text>
  <line x1="365" y1="132" x2="450" y2="132" class="sa" fill="none"/><text x="408" y="126" class="sm mid">+10</text>
  <line x1="365" y1="150" x2="550" y2="150" class="sa" fill="none"/><text x="458" y="144" class="sm mid">+20</text>
  <g class="mid">
    <rect x="60" y="252" width="110" height="56" rx="8" class="sf sb"/><text x="115" y="276" class="sm t2">Kareler</text><text x="115" y="298" class="b">400+100+0</text>
    <rect x="180" y="252" width="110" height="56" rx="8" class="sf sb"/><text x="235" y="276" class="sm t2">devamı</text><text x="235" y="298" class="b">+100+400</text>
    <text x="305" y="286" class="lg">=</text>
    <rect x="320" y="252" width="90" height="56" rx="8" class="ps"/><text x="365" y="276" class="sm t2">Toplam</text><text x="365" y="298" class="b">1.000</text>
    <text x="428" y="286" class="lg">÷4</text>
    <rect x="450" y="252" width="90" height="56" rx="8" class="ps"/><text x="495" y="276" class="sm t2">Varyans</text><text x="495" y="298" class="b">250</text>
    <text x="558" y="286" class="lg">√</text>
    <rect x="574" y="252" width="100" height="56" rx="8" class="p"/><text x="624" y="276" class="sm sf">Std. sapma</text><text x="624" y="298" class="b sf">15,81</text>
  </g>
  <rect x="60" y="334" width="614" height="64" rx="8" class="sf sb"/>
  <text x="367" y="360" class="mid b">Anakütle hesabı (÷5): varyans 200, standart sapma 14,14</text>
  <text x="367" y="384" class="sm mid t2">Veri bir sınıfın tamamıysa ÷n, daha büyük bir grubun örneğiyse ÷(n − 1)</text>
</svg>`
  },
  sections: [
    {
      h: "Standart sapma nedir, ne anlama gelir?",
      p: [
        "Ortalama, bir veri kümesinin merkezini gösterir ama değerlerin bu merkez etrafında ne kadar dağıldığını söylemez. İki sınıfın matematik ortalaması 80 olabilir; birinde herkes 78 ile 82 arasında not almışken diğerinde notlar 40 ile 100 arasında dağılmış olabilir. <strong>Standart sapma</strong> bu farkı tek bir sayıyla ifade eder: değerlerin ortalamadan ortalama olarak ne kadar saptığını gösterir.",
        "Standart sapma küçükse veriler ortalamaya yakın ve birbirine benzerdir; büyükse veriler geniş bir alana yayılmıştır. Birimi verinin birimiyle aynıdır: not verisinde puan, boy verisinde santimetre, fiyat verisinde lira. Bu yüzden yorumlanması varyansa göre çok daha kolaydır.",
        "Standart sapma lisede istatistik konusunda, üniversitede neredeyse her bölümün istatistik dersinde, tez ve anket analizlerinde, kalite kontrolde ve finansta risk ölçüsü olarak kullanılır. Ortalamanın yanında mutlaka raporlanması gereken temel göstergedir. Bilimsel makalelerde sonuçların \"ortalama ± standart sapma\" biçiminde, örneğin 80 ± 15,8 olarak yazılması bu yüzdendir; okuyucu böylece hem merkezi hem de yayılımı tek bakışta görür."
      ]
    },
    {
      h: "Standart sapma ve varyans formülü",
      p: [
        "Formülde x<sub>i</sub> her bir veri değerini, x̄ (ya da μ) ortalamayı, n veri sayısını, Σ ise toplamı gösterir. Anakütle ile örneklem için tek fark paydadır."
      ],
      formula: "Ortalama: x̄ = Σx<sub>i</sub> ÷ n\nAnakütle varyansı: σ² = Σ(x<sub>i</sub> − μ)² ÷ n\nÖrneklem varyansı: s² = Σ(x<sub>i</sub> − x̄)² ÷ (n − 1)\nStandart sapma: σ = √σ²   ya da   s = √s²",
      after: [
        "Sapmaların doğrudan toplamı her zaman sıfırdır, çünkü ortalamanın altındaki ve üstündeki farklar birbirini götürür. Kare almak hem bu sorunu çözer hem de ortalamadan çok uzak değerlere daha fazla ağırlık verir. Sonunda karekök alınarak birim yeniden verinin kendi birimine döndürülür."
      ]
    },
    {
      h: "Adım adım çözümlü örnek",
      p: [
        "Beş öğrencinin sınav notları 60, 70, 80, 90 ve 100 olsun. Bu öğrencileri daha büyük bir okuldan seçilmiş bir örneklem olarak düşünelim."
      ],
      table: {
        head: ["Not (x<sub>i</sub>)", "Sapma (x<sub>i</sub> − 80)", "Sapmanın karesi"],
        rows: [
          ["60", "−20", "400"],
          ["70", "−10", "100"],
          ["80", "0", "0"],
          ["90", "+10", "100"],
          ["100", "+20", "400"],
          ["<strong>Toplam: 400</strong>", "<strong>0</strong>", "<strong>1.000</strong>"]
        ]
      },
      ol: [
        "<strong>Ortalamayı bulun:</strong> (60 + 70 + 80 + 90 + 100) ÷ 5 = 400 ÷ 5 = 80.",
        "<strong>Sapmaları hesaplayın:</strong> Her nottan 80 çıkarın. Sapmaların toplamının 0 olması hesabın doğru gittiğini gösterir.",
        "<strong>Kareleri alın ve toplayın:</strong> 400 + 100 + 0 + 100 + 400 = 1.000.",
        "<strong>Varyansı bulun:</strong> Örneklem olduğu için n − 1 = 4'e bölün: 1.000 ÷ 4 = 250.",
        "<strong>Karekök alın:</strong> √250 ≈ 15,81. Örneklem standart sapması 15,81 puandır.",
        "<strong>Anakütle hesabı:</strong> Bu beş öğrenci sınıfın tamamı olsaydı 1.000 ÷ 5 = 200 varyans ve √200 ≈ 14,14 standart sapma bulunurdu."
      ],
      after: [
        "Kendi verinizle aynı adımları görmek için [[arac:standart-sapma-hesapla|Standart Sapma Hesaplama]] aracına sayıları yapıştırın ve örneklem ya da anakütle seçeneğini işaretleyin. Her değerin sapmasını ve karesini tablo hâlinde görmek isterseniz [[arac:varyans-hesapla|Varyans Hesaplama]] aracı adımları ayrıntılı gösterir. Ortalamanın kendisini ve diğer merkezî eğilim ölçülerini [[arac:ortalama-hesapla|Ortalama Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Kısa yol formülü ve frekans tablosuyla hesap",
      p: [
        "Elle ya da hesap makinesiyle çalışırken her değerin sapmasını ayrı ayrı hesaplamak yerine kareler toplamını doğrudan değerlerin karelerinden bulabilirsiniz. Bu formül cebirsel olarak aynı sonucu verir ve özellikle değerler tam sayı, ortalama ise kesirli olduğunda işi kolaylaştırır.",
        "Aynı değer birden çok kez tekrarlanıyorsa veriyi frekans tablosuna dökmek daha pratiktir. Bu durumda her değerin sapma karesi, o değerin kaç kez görüldüğüyle (frekans f<sub>i</sub>) çarpılarak toplanır; payda toplam gözlem sayısıdır."
      ],
      formula: "Kısa yol: Σ(x<sub>i</sub> − x̄)² = Σx<sub>i</sub>² − n · x̄²\nÖrnek: 60² + 70² + 80² + 90² + 100² = 33.000;  33.000 − 5 · 80² = 33.000 − 32.000 = 1.000\nFrekans tablosunda: Σ f<sub>i</sub> (x<sub>i</sub> − x̄)²  ve  n = Σ f<sub>i</sub>",
      after: [
        "Frekans örneği: bir zar 10 kez atılıp sonuçlar 2 (3 kez), 4 (4 kez) ve 6 (3 kez) gelmiş olsun. Ortalama (2·3 + 4·4 + 6·3) ÷ 10 = 40 ÷ 10 = 4'tür. Sapma kareleri 4, 0 ve 4; frekansla çarpılmış toplam 3·4 + 4·0 + 3·4 = 24 olur. Anakütle varyansı 24 ÷ 10 = 2,4, standart sapma √2,4 ≈ 1,55; örneklem varyansı 24 ÷ 9 ≈ 2,67, standart sapma yaklaşık 1,63'tür.",
        "Kısa yol formülü çok büyük ve birbirine yakın sayılarda (örneğin 1.000.001, 1.000.002 gibi) bilgisayarlarda yuvarlama hatasına açıktır; bu tür verilerde klasik sapma yöntemi daha güvenilirdir. Okul sorularında ise iki yöntem de aynı sonucu verir; sınavda hangisi daha hızlıysa onu kullanabilirsiniz."
      ]
    },
    {
      h: "Neden n − 1 ile bölünür?",
      p: [
        "Elinizdeki veri ilgilendiğiniz grubun tamamı değil de bir parçasıysa (örneğin bir okulun tamamı yerine rastgele seçilmiş 30 öğrenci), amacınız örneklemin değil anakütlenin yayılımını tahmin etmektir. Örneklem ortalaması, örneklemin kendi değerlerine anakütle ortalamasından daha yakın olur. Bu yüzden sapma kareleri olduğundan küçük çıkar ve n'ye bölmek anakütle varyansını sistematik olarak küçümser.",
        "Paydayı n − 1 yapmak bu sapmayı düzeltir; buna <strong>Bessel düzeltmesi</strong> denir. Bir başka açıklama serbestlik derecesidir: ortalama bilindiğinde n değerden yalnızca n − 1 tanesi serbestçe değişebilir, sonuncusu ortalamayı tutturacak şekilde belirlenir.",
        "Pratik kural şudur: verinin tamamına sahipseniz (sınıfın tüm notları, bir ayın tüm günlük satışları) n'ye, bir örneklemden genelleme yapıyorsanız n − 1'e bölün. Veri sayısı büyüdükçe iki sonuç arasındaki fark küçülür; 5 değerde %12 olan fark, 100 değerde %0,5'e düşer."
      ]
    },
    {
      h: "Standart sapmanın büyük ya da küçük olması ne anlama gelir?",
      p: [
        "Aynı ortalamaya sahip iki veri kümesini karşılaştırmak, standart sapmanın ne söylediğini en iyi gösteren yoldur."
      ],
      table: {
        head: ["Sınıf", "Notlar", "Ortalama", "Örneklem std. sapma", "Yorum"],
        rows: [
          ["A", "78, 79, 80, 81, 82", "80", "1,58", "Notlar birbirine çok yakın, sınıf homojen"],
          ["B", "60, 70, 80, 90, 100", "80", "15,81", "Belirgin farklılık var"],
          ["C", "40, 60, 80, 100, 120*", "80", "31,62", "Çok geniş yayılım"]
        ],
        caption: "*C satırı yalnızca hesap örneğidir; 100 üzerindeki not, yayılımın büyüdüğü durumu göstermek için kullanılmıştır."
      },
      after: [
        "Veriler yaklaşık normal (çan eğrisi) dağılıma uyuyorsa yararlı bir yorum kuralı vardır: değerlerin yaklaşık %68'i ortalamanın bir standart sapma altı ve üstü arasında, %95'i iki standart sapma, %99,7'si üç standart sapma içinde kalır. B sınıfı için bu, notların çoğunun yaklaşık 64 ile 96 arasında beklendiği anlamına gelir. Bir değerin ortalamadan kaç standart sapma uzakta olduğunu ölçen z-skoru da bu fikre dayanır."
      ]
    },
    {
      h: "Değişim katsayısı nedir?",
      p: [
        "Standart sapma verinin birimine ve büyüklüğüne bağlıdır. Ortalaması 1.000 TL olan bir fiyat serisinde 50 TL'lik standart sapma küçükken, ortalaması 100 TL olan bir seride aynı 50 TL çok büyüktür. <strong>Değişim katsayısı</strong> standart sapmayı ortalamaya bölerek bu sorunu çözer ve sonucu yüzde olarak verir."
      ],
      formula: "Değişim katsayısı (DK) = Standart sapma ÷ Ortalama × 100\nB sınıfı: 15,81 ÷ 80 × 100 ≈ %19,8\nA sınıfı: 1,58 ÷ 80 × 100 ≈ %2,0",
      after: [
        "Değişim katsayısı birimsizdir; boy ile kilonun, ya da iki farklı ürünün fiyat oynaklığının karşılaştırılmasında kullanılır. Ortalama sıfıra yakın ya da negatif değer alabilen verilerde anlamını yitirir. Hızlı hesap için [[arac:degisim-katsayisi-hesapla|Değişim Katsayısı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Excel'de standart sapma nasıl bulunur?",
      p: [
        "Excel ve benzeri tablolama programlarında standart sapma için hazır işlevler vardır. Verilerin A1:A5 hücrelerinde olduğunu varsayalım."
      ],
      table: {
        head: ["Amaç", "Türkçe Excel", "İngilizce Excel", "Örnek sonuç"],
        rows: [
          ["Örneklem standart sapması", "=STDSAPMA.S(A1:A5)", "=STDEV.S(A1:A5)", "15,81"],
          ["Anakütle standart sapması", "=STDSAPMA.P(A1:A5)", "=STDEV.P(A1:A5)", "14,14"],
          ["Örneklem varyansı", "=VAR.S(A1:A5)", "=VAR.S(A1:A5)", "250"],
          ["Anakütle varyansı", "=VAR.P(A1:A5)", "=VAR.P(A1:A5)", "200"],
          ["Ortalama", "=ORTALAMA(A1:A5)", "=AVERAGE(A1:A5)", "80"]
        ],
        caption: "Eski sürümlerdeki STDSAPMA ve STDEV işlevleri örneklem formülünü kullanır."
      },
      after: [
        "Program dil ayarına göre işlev adlarını farklı gösterebilir. Emin değilseniz işlev sihirbazında \"sapma\" ya da \"stdev\" diye aratın ve açıklamada \"örnek\" ya da \"popülasyon\" ifadesine bakın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Karekök almayı unutmak:</strong> Varyans ile standart sapma farklı şeylerdir; 250 puan² değil, 15,81 puan raporlanmalıdır.",
        "<strong>Yanlış paydayı seçmek:</strong> Anket ve deney verileri genellikle örneklemdir; n − 1 kullanılmalıdır.",
        "<strong>Sapmaları kare almadan toplamak:</strong> Toplam her zaman sıfır çıkar ve bir şey ifade etmez.",
        "<strong>Ara sonuçları erken yuvarlamak:</strong> Ortalama 80,4 gibi kesirliyse sapmaları yuvarlamadan hesaplayın.",
        "<strong>Negatif standart sapma bulmak:</strong> Kareler toplamı negatif olamayacağı için standart sapma da negatif olamaz; böyle bir sonuç hesap hatasıdır."
      ],
      after: [
        "Ortalama, medyan ve mod arasındaki farkı ve hangisinin ne zaman kullanılacağını [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan ve mod nedir]] yazısında bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Standart sapma nedir?", "Standart sapma, veri değerlerinin ortalamadan ortalama olarak ne kadar uzaklaştığını gösteren yayılım ölçüsüdür. Varyansın kareköküdür ve birimi verinin kendi birimiyle aynıdır; küçük olması verilerin ortalamaya yakın olduğunu gösterir."],
    ["Standart sapma nasıl hesaplanır?", "Önce ortalama bulunur, her değerden ortalama çıkarılıp karesi alınır ve bu kareler toplanır. Toplam anakütle için n'ye, örneklem için n eksi bire bölünerek varyans bulunur; varyansın karekökü standart sapmadır."],
    ["Varyans ile standart sapma farkı nedir?", "Varyans sapmaların karelerinin ortalamasıdır ve birimi verinin biriminin karesidir. Standart sapma varyansın kareköküdür ve verinin kendi biriminde ifade edildiği için yorumlanması daha kolaydır."],
    ["Neden n-1 ile bölünür?", "Örneklem ortalaması örneklem değerlerine anakütle ortalamasından daha yakın olduğu için n'ye bölmek anakütle varyansını olduğundan küçük gösterir. n eksi bire bölmek bu yanlılığı düzeltir; bu düzeltmeye Bessel düzeltmesi denir."],
    ["Standart sapmanın büyük olması ne anlama gelir?", "Büyük standart sapma, değerlerin ortalamadan uzağa ve geniş bir aralığa yayıldığını gösterir. Aynı ortalamaya sahip iki sınıftan standart sapması büyük olanda öğrenciler arasındaki not farkları daha belirgindir."],
    ["Excel'de standart sapma nasıl bulunur?", "Türkçe Excel'de örneklem standart sapması için STDSAPMA.S, anakütle için STDSAPMA.P işlevi kullanılır. İngilizce sürümde karşılıkları STDEV.S ve STDEV.P'dir; parantez içine veri aralığı yazılır."],
    ["Değişim katsayısı nedir?", "Değişim katsayısı, standart sapmanın ortalamaya bölünüp 100 ile çarpılmasıyla bulunan yüzdesel yayılım ölçüsüdür. Birimsiz olduğu için farklı ölçeklerdeki ya da farklı birimlerdeki verilerin yayılımını karşılaştırmaya yarar."],
    ["Standart sapma negatif olabilir mi?", "Hayır. Standart sapma, negatif olamayan kareler toplamından türetilen varyansın kareköküdür; bu yüzden en küçük değeri sıfırdır. Sıfır, tüm değerlerin birbirine eşit olduğunu gösterir."]
  ],
  tools: ["standart-sapma-hesapla", "varyans-hesapla", "ortalama-hesapla", "degisim-katsayisi-hesapla"],
  related: ["ortalama-medyan-mod-nedir", "z-skoru-nedir-nasil-hesaplanir", "ceyreklikler-ve-kutu-grafigi"],
  sources: [
    ["TÜİK – İstatistiksel kavramlar ve yöntemler", "https://www.tuik.gov.tr/"],
    ["MEB – Ortaöğretim matematik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
