export default {
  slug: "guven-araligi-hata-payi-ve-orneklem",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Güven Aralığı ve Hata Payı Nedir? Ankette Kaç Kişiye Sorulmalı",
  pageTitle: "Güven Aralığı ve Hata Payı Nedir? Örneklem Hesabı",
  description: "Güven aralığı = tahmin ± hata payı; %95 düzeyde z = 1,96. Ankette ±3 hata payı için yaklaşık 1.067, ±5 için 384 kişi gerekir. Formüller, t-z farkı ve sonlu evren.",
  keywords: ["güven aralığı nedir", "hata payı nedir", "örneklem büyüklüğü", "anket kaç kişi", "%95 güven aralığı", "tez örneklem hesaplama", "z ve t değeri", "384 örneklem"],
  lead: "Güven aralığı, bir örneklemden elde edilen tahminin etrafına <strong>hata payı</strong> eklenerek kurulan ve gerçek evren değerinin büyük olasılıkla içinde bulunduğu aralıktır: tahmin ± z × standart hata. %95 güven düzeyinde z = 1,96 alınır. Örneğin 1.000 kişilik bir ankette %40 çıkan bir oranın hata payı yaklaşık ±3 puandır; gerçek oranın %37 ile %43 arasında olduğu %95 güvenle söylenir. Bu sayfada ortalama ve oran için güven aralığını, %95'in doğru yorumunu, örneklem büyüklüğü formülünü, tezlerdeki 384 sayısının kaynağını, t ve z farkını ve sonlu evren düzeltmesini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Ortalama için güven aralığı: x̄ ± z × s / √n (küçük örneklemde z yerine t kullanılır).",
    "Oran için hata payı: z × √(p × (1 − p) / n); p = 0,5 en büyük hata payını verir.",
    "Güven düzeyleri için z değerleri: %90 → 1,645; %95 → 1,96; %99 → 2,576.",
    "Örneklem büyüklüğü (oran): n = z² × p × (1 − p) / e²; %95 ve ±%5 için 384,16 → 385 kişi.",
    "Hata payını yarıya indirmek için örneklemi 4 katına çıkarmak gerekir.",
    "Evren küçükse sonlu evren düzeltmesi uygulanır: n' = n / (1 + (n − 1) / N)."
  ],
  figure: {
    alt: "Örneklem büyüklüğüne göre hata payı eğrisi: 100 kişide yaklaşık yüzde 9,8, 384 kişide yüzde 5, 600 kişide yüzde 4, 1.067 kişide yüzde 3, 2.401 kişide yüzde 2. Altta yüzde 40 sonucun 1.000 kişilik ankette 37 ile 43 arasında güven aralığı.",
    caption: "Hata payı örneklem büyüklüğünün karekökü ile azalır: 384 kişiden 1.067 kişiye çıkmak hata payını ±5'ten ±3 puana indirir, ama ±2 puan için 2.401 kişi gerekir. Değerler %95 güven düzeyi ve p = 0,5 içindir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Örneklem büyüdükçe hata payı küçülür</text>
  <line x1="80" y1="270" x2="680" y2="270" class="st" fill="none"/>
  <line x1="80" y1="270" x2="80" y2="50" class="st" fill="none"/>
  <g class="sm end t2"><text x="72" y="274">%0</text><text x="72" y="214">%3</text><text x="72" y="174">%5</text><text x="72" y="74">%10</text></g>
  <g class="sm mid t2"><text x="80" y="290">0</text><text x="230" y="290">600</text><text x="380" y="290">1.200</text><text x="530" y="290">1.800</text><text x="680" y="290">2.400</text></g>
  <polyline points="105,74 130,131 155,153 176,170 230,190 280,198 347,210 380,213 480,222 680,230" class="sp sw" fill="none"/>
  <circle cx="105" cy="74" r="5" class="p"/><text x="114" y="70" class="sm b">100 kişi: ±%9,8</text>
  <circle cx="176" cy="170" r="5" class="p"/><text x="186" y="160" class="sm b">384: ±%5</text>
  <circle cx="347" cy="210" r="5" class="p"/><text x="347" y="200" class="sm b mid">1.067: ±%3</text>
  <circle cx="680" cy="230" r="5" class="p"/><text x="672" y="250" class="sm b end">2.401: ±%2</text>
  <rect x="20" y="310" width="680" height="96" rx="8" class="sf sb"/>
  <text x="36" y="334" class="b">Örnek: 1.000 kişilik ankette %40 · %95 güven</text>
  <text x="36" y="356" class="sm">Hata payı = 1,96 × √(0,40 × 0,60 ÷ 1.000) ≈ 0,030 → ±3,0 puan</text>
  <line x1="200" y1="384" x2="560" y2="384" class="sp sw" fill="none"/>
  <line x1="200" y1="374" x2="200" y2="394" class="sp sw" fill="none"/><line x1="560" y1="374" x2="560" y2="394" class="sp sw" fill="none"/>
  <circle cx="380" cy="384" r="7" class="a"/>
  <text x="200" y="402" class="sm mid b">%37,0</text><text x="380" y="402" class="sm mid b">%40</text><text x="560" y="402" class="sm mid b">%43,0</text>
</svg>`
  },
  sections: [
    {
      h: "Güven aralığı nedir, nasıl yorumlanır?",
      p: [
        "Bir ülkedeki tüm seçmenlere, bir fabrikadaki tüm ürünlere ya da bir okuldaki tüm öğrencilere tek tek ulaşmak çoğu zaman mümkün değildir. Bunun yerine bir <strong>örneklem</strong> seçilir ve sonuçlar evrene genellenir. Ancak her örneklem biraz farklı sonuç verir; tek bir sayıyla yetinmek bu belirsizliği gizler.",
        "<strong>Güven aralığı</strong>, bu belirsizliği açıkça gösterir: \"ortalama 72\" yerine \"ortalama 68,7 ile 75,3 arasında\" der. Aralığın genişliği tahmininizin ne kadar kesin olduğunu, güven düzeyi ise bu aralık kurma yönteminin ne sıklıkla doğru sonuç verdiğini anlatır.",
        "Güven aralığı yalnızca rastgele örnekleme hatasını hesaba katar. Soruların yönlendirici olması, yalnızca belirli bir kesime ulaşılması ya da katılımcıların gerçeği söylememesi gibi sistematik hatalar aralığa yansımaz. Bu yüzden iyi bir güven aralığı, iyi tasarlanmış bir örneklemle anlam kazanır."
      ]
    },
    {
      h: "%95 güven düzeyi ne anlama gelir?",
      p: [
        "En sık yapılan yorum hatası, \"gerçek değerin bu aralıkta olma olasılığı %95'tir\" demektir. Klasik istatistikte gerçek değer sabittir; ya aralığın içindedir ya da değildir. Doğru yorum şudur: aynı yöntemle çok sayıda örneklem alıp her birinden aralık kursaydınız, bu aralıkların yaklaşık %95'i gerçek değeri kapsardı.",
        "Pratikte \"%95 güvenle gerçek oran %37 ile %43 arasındadır\" ifadesi kabul gören bir kısaltmadır. Güven düzeyini yükseltmek aralığı genişletir: %99 güven isterseniz daha temkinli, daha geniş bir aralık kurarsınız. Düzeyi düşürmek aralığı daraltır ama yanılma olasılığınızı artırır."
      ],
      table: {
        head: ["Güven düzeyi", "z değeri", "Yanılma payı (α)", "Aralık genişliği (%95'e göre)"],
        rows: [
          ["%80", "1,282", "%20", "%65"],
          ["%90", "1,645", "%10", "%84"],
          ["%95", "1,960", "%5", "%100"],
          ["%99", "2,576", "%1", "%131"],
          ["%99,9", "3,291", "%0,1", "%168"]
        ],
        caption: "z değerleri standart normal dağılımın iki yönlü kritik değerleridir. z kavramı için z-skoru rehberine bakabilirsiniz."
      },
      after: [
        "z değerinin ne anlama geldiğini ve normal dağılım üzerinde nasıl okunduğunu [[bilgi:z-skoru-nedir-nasil-hesaplanir|z-skoru nedir]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Ortalama için güven aralığı: çözümlü örnek",
      formula: "Standart hata: SH = s / √n\nGüven aralığı: x̄ ± z × SH   (n küçükse z yerine t(n−1))",
      ol: [
        "Bir sınıfta rastgele seçilen 36 öğrencinin sınav ortalaması x̄ = 72, standart sapması s = 10 bulunmuş olsun.",
        "Standart hata: 10 ÷ √36 = 10 ÷ 6 ≈ 1,667.",
        "%95 güven için z = 1,96: hata payı = 1,96 × 1,667 ≈ 3,27.",
        "Güven aralığı: 72 ± 3,27 → [68,73 ; 75,27].",
        "Daha doğru olan t dağılımıyla (serbestlik derecesi 35, t ≈ 2,030): hata payı ≈ 3,38 ve aralık [68,62 ; 75,38] olur."
      ],
      after: [
        "Standart sapmanın nasıl hesaplandığını [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma rehberinde]] ve [[arac:standart-sapma-hesapla|Standart Sapma Hesaplama aracında]] bulabilirsiniz. Ortalama, standart sapma ve örneklem büyüklüğünü [[arac:guven-araligi-hesapla|Güven Aralığı Hesaplama aracına]] girerek t ya da z dağılımıyla aralığı doğrudan hesaplayabilirsiniz."
      ]
    },
    {
      h: "z ve t dağılımı ne zaman kullanılır?",
      p: [
        "z dağılımı (standart normal dağılım), evrenin standart sapmasının bilindiği ya da örneklemin büyük olduğu durumlarda kullanılır. Gerçek hayatta evrenin standart sapması nadiren bilinir; onun yerine örneklemden hesaplanan s kullanılır. Bu ek belirsizliği hesaba katmak için <strong>t dağılımı</strong> kullanılır.",
        "t dağılımı normal dağılıma benzer ama kuyrukları daha kalındır; bu yüzden aynı güven düzeyinde kritik değer daha büyüktür ve aralık biraz daha geniş çıkar. Örneklem büyüdükçe t dağılımı z dağılımına yaklaşır."
      ],
      table: {
        head: ["Serbestlik derecesi (n − 1)", "t (%95, iki yönlü)", "z'ye göre fark"],
        rows: [
          ["5", "2,571", "%31 daha geniş"],
          ["10", "2,228", "%14 daha geniş"],
          ["30", "2,042", "%4 daha geniş"],
          ["35", "2,030", "%3,6 daha geniş"],
          ["100", "1,984", "%1,2 daha geniş"],
          ["Sonsuz", "1,960", "z ile aynı"]
        ]
      },
      after: [
        "Oranlar için (anketlerde \"evet\" diyenlerin yüzdesi gibi) yeterince büyük örneklemlerde z kullanılır. Kural olarak n × p ve n × (1 − p) değerlerinin her ikisinin de en az 10 olması beklenir."
      ]
    },
    {
      h: "Anket sonuçlarındaki ±3 hata payı nedir?",
      p: [
        "Anket haberlerinde \"hata payı ±3\" ifadesi, oranlar için %95 güven düzeyinde hesaplanan hata payının yaklaşık 3 yüzde puanı olduğunu anlatır. Formülü şudur:"
      ],
      formula: "Hata payı (e) = z × √(p × (1 − p) / n)\nÖrnek: p = 0,40, n = 1.000, z = 1,96\ne = 1,96 × √(0,24 / 1.000) = 1,96 × 0,01549 ≈ 0,0304 → ±3,0 puan",
      after: [
        "Bu örnekte %40 çıkan bir sonucun gerçek değeri %95 güvenle %37,0 ile %43,0 arasındadır. Haberlerde verilen hata payı genellikle en kötü durum olan p = 0,5 için hesaplanır; bu değerle 1.067 kişilik bir anket tam ±3,0 puan hata payı verir.",
        "Önemli bir uyarı: iki aday arasındaki fark, her birinin hata payından daha belirsizdir. %40'a karşı %37 sonucunda aralıklar çakıştığı için \"önde\" demek istatistiksel olarak güvenli değildir. Ayrıca alt gruplara (yaş, bölge) bakıldığında örneklem küçüldüğü için hata payı büyür. Hata payını kendi verinizle [[arac:hata-payi-hesapla|Hata Payı Hesaplama aracında]] hesaplayabilirsiniz."
      ]
    },
    {
      h: "Örneklem büyüklüğü nasıl hesaplanır? Tezde 384 neden sık görülür?",
      p: [
        "Örneklem büyüklüğü formülü, hata payı formülünün n için çözülmüş hâlidir. Oranı önceden bilmiyorsanız en temkinli tahmin olan p = 0,5 kullanılır; bu, gereken örneklemi en büyük yapan değerdir."
      ],
      formula: "n = z² × p × (1 − p) / e²\n%95 güven, ±%5 hata payı, p = 0,5:\nn = 1,96² × 0,25 / 0,05² = 3,8416 × 0,25 / 0,0025 = 384,16 → 385 kişi",
      table: {
        head: ["Güven düzeyi", "Hata payı", "Gereken örneklem (büyük evren, p = 0,5)"],
        rows: [
          ["%90", "±%5", "271"],
          ["%95", "±%5", "385 (sıklıkla 384 yazılır)"],
          ["%95", "±%3", "1.068"],
          ["%95", "±%2,5", "1.537"],
          ["%99", "±%5", "664"]
        ],
        caption: "Sonuçlar yukarı yuvarlanmıştır; 384 değeri 384,16'nın aşağı yuvarlanmış hâli olarak kaynaklarda yaygındır."
      },
      after: [
        "Tezlerde 384 sayısının bu kadar sık görülmesinin nedeni budur: %95 güven, ±%5 hata payı ve en temkinli oran varsayımı birleşince yaklaşık 384 kişi çıkar ve bu sayı evren büyüklüğü ne olursa olsun (yeterince büyükse) değişmez. 80 milyonluk bir ülke ile 100.000 kişilik bir şehir için gereken örneklem neredeyse aynıdır. Kendi parametrelerinizle hesap için [[arac:orneklem-buyuklugu-hesapla|Örneklem Büyüklüğü Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Hata payını yarıya indirmek için örneklem kaç kat artmalı?",
      p: [
        "Hata payı, örneklem büyüklüğünün karekökü ile ters orantılıdır: e ∝ 1 / √n. Bu yüzden hata payını yarıya indirmek için √n'in iki katına, yani n'in <strong>dört katına</strong> çıkması gerekir. ±%5'lik bir anketi ±%2,5'e indirmek için 385 kişiden yaklaşık 1.537 kişiye çıkmak gerekir.",
        "Bu ilişki, anket bütçesinin neden belli bir noktadan sonra verimsizleştiğini açıklar. 100 kişiden 400 kişiye çıkmak hata payını yaklaşık ±%9,8'den ±%4,9'a indirir; 1.000 kişiden 4.000 kişiye çıkmak ise yalnızca ±%3,1'den ±%1,5'e indirir. Çoğu araştırmada örneklemi büyütmek yerine örneklemin evreni iyi temsil etmesini sağlamak daha büyük kazanç getirir."
      ]
    },
    {
      h: "Küçük evrende örneklem nasıl düzeltilir?",
      p: [
        "Yukarıdaki formül evrenin çok büyük olduğunu varsayar. Evren küçükse (bir şirketin 500 çalışanı, bir ilçedeki 2.000 işletme gibi) her katılımcı evrenin daha büyük bir bölümünü temsil eder ve daha az kişiyle aynı kesinliğe ulaşılır. Bunun için <strong>sonlu evren düzeltmesi</strong> kullanılır."
      ],
      formula: "n' = n / (1 + (n − 1) / N)\nN = 2.000 için: n' = 384,16 / (1 + 383,16 / 2.000) ≈ 322,4 → 323 kişi\nN = 500 için: n' = 384,16 / (1 + 383,16 / 500) ≈ 217,5 → 218 kişi",
      after: [
        "Evren örneklemin yaklaşık 20 katından büyükse düzeltmenin etkisi küçüktür. Düzeltme yalnızca örnekleme hatasını azaltır; geri dönüş oranı düşükse (örneğin davet edilenlerin yalnızca %30'u yanıt veriyorsa) hedef sayıya ulaşmak için davet edilecek kişi sayısını buna göre artırmanız gerekir: 323 ÷ 0,30 ≈ 1.077 davet."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>%95'i olasılık gibi yorumlamak:</strong> Doğru yorum, yöntemin uzun vadede %95 oranında gerçek değeri kapsamasıdır.",
        "<strong>Hata payının tüm hataları kapsadığını sanmak:</strong> Yönlendirici soru, temsil etmeyen örneklem ve yanıt vermeme hataları hesaba girmez.",
        "<strong>Alt grupları aynı hata payıyla okumak:</strong> 1.000 kişilik ankette 150 kişilik bir alt grubun hata payı yaklaşık ±%8'dir.",
        "<strong>Küçük örneklemde z kullanmak:</strong> 30'un altındaki örneklemlerde t dağılımı daha doğru sonuç verir.",
        "<strong>Örneklemi aşağı yuvarlamak:</strong> 384,16 sonucu güvenli tarafta kalmak için 385'e yuvarlanmalıdır.",
        "<strong>Çakışan aralıklarda kesin sonuç çıkarmak:</strong> İki oranın aralıkları çakışıyorsa farkın gerçek olduğu söylenemeyebilir. Olasılığın temelleri için [[bilgi:olasilik-nasil-hesaplanir|olasılık rehberine]] bakabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Güven aralığı nedir, nasıl yorumlanır?", "Güven aralığı, örneklemden elde edilen tahminin etrafına hata payı eklenerek kurulan ve gerçek evren değerinin büyük olasılıkla içinde bulunduğu aralıktır. Aralığın dar olması tahminin kesin, geniş olması belirsiz olduğunu gösterir."],
    ["%95 güven düzeyi ne anlama gelir?", "Aynı yöntemle çok sayıda örneklem alınıp her birinden aralık kurulsaydı, bu aralıkların yaklaşık yüzde 95'inin gerçek değeri kapsayacağı anlamına gelir. %95 düzeyinde iki yönlü z kritik değeri 1,96'dır."],
    ["Anket sonuçlarındaki ±3 hata payı nedir?", "Oranlar için yüzde 95 güven düzeyinde hesaplanan hata payının yaklaşık 3 yüzde puanı olduğunu gösterir. 1.000 kişilik bir ankette yüzde 40 çıkan bir sonuç, gerçekte yüzde 37 ile 43 arasında olabilir."],
    ["Örneklem büyüklüğü nasıl hesaplanır?", "n = z² × p × (1 − p) / e² formülü kullanılır; z güven düzeyine ait kritik değer, p beklenen oran, e ise istenen hata payıdır. Oran bilinmiyorsa p = 0,5 alınır; %95 güven ve ±%5 hata payı için sonuç yaklaşık 385 kişidir."],
    ["Tezde 384 kişilik örneklem neden sık görülür?", "Yüzde 95 güven düzeyi, yüzde 5 hata payı ve en temkinli oran varsayımı olan 0,5 birlikte kullanıldığında formül 384,16 sonucunu verir. Bu değer büyük evrenlerde evren büyüklüğünden bağımsızdır; güvenli tarafta kalmak için 385'e yuvarlanması önerilir."],
    ["z ve t dağılımı ne zaman kullanılır?", "Evrenin standart sapması bilinmiyor ve örneklemden hesaplanıyorsa ortalamanın güven aralığında t dağılımı kullanılır; özellikle küçük örneklemlerde önemlidir. Örneklem büyüdükçe t değeri z'ye yaklaşır ve büyük örneklemlerde ya da oranlarda z kullanılabilir."],
    ["Hata payını yarıya indirmek için örneklem kaç kat artmalı?", "Hata payı örneklem büyüklüğünün kareköküyle ters orantılı olduğu için örneklemin dört katına çıkması gerekir. Örneğin ±%5 hata payı için 385 kişi yeterliyken ±%2,5 için yaklaşık 1.537 kişi gerekir."],
    ["Küçük evrende örneklem nasıl düzeltilir?", "Sonlu evren düzeltmesi n' = n / (1 + (n − 1) / N) formülüyle uygulanır. 2.000 kişilik bir evrende yüzde 95 güven ve ±%5 hata payı için gereken örneklem 385 yerine yaklaşık 323 kişiye düşer."],
    ["Güven aralığı ile hata payı arasındaki fark nedir?", "Hata payı, tahminin iki yanına eklenen uzaklıktır; güven aralığı ise tahmin eksi hata payı ile tahmin artı hata payı arasındaki aralığın kendisidir. Yüzde 40 ve ±3 puan için hata payı 3, güven aralığı 37 ile 43 arasıdır."]
  ],
  tools: ["guven-araligi-hesapla", "hata-payi-hesapla", "orneklem-buyuklugu-hesapla", "standart-sapma-hesapla"],
  related: ["standart-sapma-nasil-hesaplanir", "z-skoru-nedir-nasil-hesaplanir", "olasilik-nasil-hesaplanir"]
};
