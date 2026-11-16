export default {
  slug: "gerilim-bolucu-devre-nasil-hesaplanir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Gerilim Bölücü Devre Nasıl Hesaplanır? Formül, Direnç Seçimi ve Örnek",
  pageTitle: "Gerilim Bölücü Hesaplama: Formül, Direnç Seçimi, Örnek",
  description: "Gerilim bölücüde çıkış Vout = Vin × R2 ÷ (R1 + R2) ile bulunur. 5 V'u 3,3 V'a indirme, yük etkisi, harcanan güç ve pil voltajı ölçme örnekleri.",
  keywords: ["gerilim bölücü", "gerilim bölücü formülü", "voltaj bölücü", "5v'u 3.3v'a düşürme", "direnç ile voltaj düşürme", "arduino gerilim bölücü", "pil voltajı ölçme", "yük etkisi"],
  lead: "Gerilim bölücü, seri bağlı iki direnç arasındaki noktadan giriş geriliminin belirli bir oranını alan devredir; çıkış gerilimi Vout = Vin × R2 ÷ (R1 + R2) formülüyle hesaplanır. Örneğin 5 V girişte R1 = 1 kΩ ve R2 = 2 kΩ seçilirse çıkış 3,33 V olur. Devre sensör okumak ve gerilim ölçmek için idealdir, ama çıkışa akım çeken bir yük bağlandığında gerilim düşer; bu yüzden güç kaynağı yerine kullanılmamalıdır. Bu yazıda formülü, direnç seçimini, yük etkisini ve güç hesabını çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Çıkış gerilimi: Vout = Vin × R2 ÷ (R1 + R2); R1 girişe, R2 toprağa bağlı dirençtir.",
    "Bölme oranı yalnızca dirençlerin oranına bağlıdır: R2 = 2 × R1 seçilirse çıkış girişin üçte ikisi olur.",
    "Dirençlerden geçen akım I = Vin ÷ (R1 + R2), her direncin harcadığı güç P = I² × R'dir.",
    "Çıkışa yük bağlanınca yük R2'ye paralel olur ve çıkış gerilimi düşer; yük direnci R2'nin en az 10 katı olmalıdır.",
    "Gerilim bölücü motor, LED şeridi ya da mikrodenetleyici beslemek için güç kaynağı olarak kullanılmaz; bunun için regülatör gerekir.",
    "12,6 V'luk bir pili 5 V'luk bir analog girişle ölçmek için R1 = 20 kΩ, R2 = 10 kΩ seçilirse giriş 4,2 V olur."
  ],
  figure: {
    alt: "Gerilim bölücü devre şeması: 5 V kaynak, üstte R1 = 10 kΩ, altta R2 = 20 kΩ, ortadaki çıkış 3,33 V. Sağda yük bağlanınca çıkışın 20 kΩ yükte 2,5 V'a, 1 MΩ yükte 3,31 V'a düştüğünü gösteren karşılaştırma.",
    caption: "Yüksüz durumda çıkış yalnızca direnç oranına bağlıdır. Yük, R2'ye paralel bağlandığı için eşdeğer alt direnci küçültür ve çıkışı düşürür; yük direnci büyüdükçe etki azalır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Gerilim bölücü ve yük etkisi</text>
  <line x1="80" y1="70" x2="200" y2="70" class="st sw" fill="none"/>
  <line x1="200" y1="70" x2="200" y2="100" class="st sw" fill="none"/>
  <rect x="180" y="100" width="40" height="80" rx="4" class="ps"/>
  <text x="200" y="146" class="mid b sm">R1</text>
  <text x="236" y="136" class="b">10 kΩ</text>
  <line x1="200" y1="180" x2="200" y2="230" class="st sw" fill="none"/>
  <circle cx="200" cy="205" r="5" class="p"/>
  <line x1="200" y1="205" x2="300" y2="205" class="sp sw" fill="none"/>
  <text x="306" y="200" class="b p">Vout</text>
  <text x="306" y="222" class="b p lg">3,33 V</text>
  <rect x="180" y="230" width="40" height="80" rx="4" class="ps"/>
  <text x="200" y="276" class="mid b sm">R2</text>
  <text x="236" y="266" class="b">20 kΩ</text>
  <line x1="200" y1="310" x2="200" y2="340" class="st sw" fill="none"/>
  <line x1="80" y1="340" x2="200" y2="340" class="st sw" fill="none"/>
  <line x1="80" y1="70" x2="80" y2="170" class="st sw" fill="none"/>
  <line x1="80" y1="240" x2="80" y2="340" class="st sw" fill="none"/>
  <circle cx="80" cy="205" r="34" class="sf sb"/>
  <text x="80" y="200" class="mid b">Vin</text>
  <text x="80" y="220" class="mid b">5 V</text>
  <line x1="170" y1="352" x2="230" y2="352" class="st sw" fill="none"/>
  <line x1="182" y1="362" x2="218" y2="362" class="st sw" fill="none"/>
  <text x="200" y="386" class="mid sm mu">toprak</text>
  <rect x="420" y="60" width="280" height="96" rx="10" class="p"/>
  <text x="560" y="90" class="mid sf b">Vout = Vin × R2 ÷ (R1 + R2)</text>
  <text x="560" y="118" class="mid sf">5 × 20 ÷ (10 + 20)</text>
  <text x="560" y="142" class="mid sf b">= 3,33 V</text>
  <text x="420" y="190" class="b">Çıkışa bağlanan yük</text>
  <text x="420" y="224" class="sm">Yük yok</text>
  <rect x="520" y="210" width="167" height="20" rx="3" class="ok"/>
  <text x="680" y="225" class="end sm b sf">3,33 V</text>
  <text x="420" y="260" class="sm">1 MΩ yük</text>
  <rect x="520" y="246" width="165" height="20" rx="3" class="ok"/>
  <text x="678" y="261" class="end sm b sf">3,31 V</text>
  <text x="420" y="296" class="sm">20 kΩ yük</text>
  <rect x="520" y="282" width="125" height="20" rx="3" class="dg"/>
  <text x="638" y="297" class="end sm b sf">2,50 V</text>
  <text x="420" y="336" class="sm t2">20 kΩ yük, R2 ile paralel: 10 kΩ</text>
  <text x="420" y="358" class="sm t2">5 × 10 ÷ (10 + 10) = 2,50 V</text>
</svg>`
  },
  sections: [
    {
      h: "Gerilim bölücü nedir?",
      p: [
        "Gerilim bölücü, bir gerilim kaynağına seri bağlanmış iki dirençten oluşan en temel elektronik devrelerden biridir. Kaynağın gerilimi iki direncin üzerinde, dirençlerin büyüklüğüyle orantılı olarak paylaşılır. İki direncin birleştiği noktadan toprağa göre ölçülen gerilim, giriş geriliminin belirli bir kesridir ve bu noktaya çıkış denir.",
        "Devre çok basit olduğu için her yerde karşınıza çıkar: potansiyometrelerin orta ucu bir gerilim bölücüdür; ışığa duyarlı direnç ya da termistör gibi sensörler sabit bir dirençle bölücü kurularak okunur; bir mikrodenetleyicinin ölçebileceğinden yüksek gerilimler bölücüyle güvenli aralığa indirilir; işlemsel yükselteçlerde referans gerilimi üretilir."
      ]
    },
    {
      h: "Formül: Vout = Vin × R2 ÷ (R1 + R2)",
      p: [
        "Seri devrede iki direnç üzerinden aynı akım geçer. Bu akım Ohm kanununa göre I = Vin ÷ (R1 + R2)'dir. R2 üzerindeki gerilim ise bu akımın R2 ile çarpımıdır. İki adımı birleştirince gerilim bölücü formülü elde edilir."
      ],
      formula: "I = Vin ÷ (R1 + R2)\nVout = I × R2 = Vin × R2 ÷ (R1 + R2)\nBölme oranı k = R2 ÷ (R1 + R2)\nR2 bilinmiyorsa: R2 = R1 × Vout ÷ (Vin − Vout)",
      after: [
        "Formüldeki dirençlerin sırası önemlidir: R1 girişle çıkış arasında, R2 çıkışla toprak arasındadır. Yerleri değiştirilirse çıkış, R1 üzerindeki gerilim yani Vin − Vout olur. Formülün dayandığı Ohm kanununu hatırlamak isterseniz [[bilgi:ohm-kanunu-nedir|Ohm kanunu nedir]] yazısına, seri dirençlerin toplanmasına dair ayrıntılar için [[bilgi:seri-ve-paralel-direnc-hesaplama|seri ve paralel direnç hesaplama]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek 1: 12 V'tan bölme oranı, akım ve güç",
      p: [
        "12 V'luk bir kaynağa R1 = 10 kΩ ve R2 = 4,7 kΩ bağlanmış olsun. Çıkış gerilimini, devreden geçen akımı ve her direncin harcadığı gücü bulalım."
      ],
      ol: [
        "Toplam direnç: 10 + 4,7 = 14,7 kΩ.",
        "Akım: 12 V ÷ 14.700 Ω = 0,000816 A ≈ 0,816 mA.",
        "Çıkış: 12 × 4,7 ÷ 14,7 = 3,837 V ≈ 3,84 V.",
        "R1 üzerindeki gerilim: 12 − 3,84 = 8,16 V.",
        "R1'in gücü: (0,000816)² × 10.000 ≈ 0,00666 W = 6,66 mW.",
        "R2'nin gücü: (0,000816)² × 4.700 ≈ 0,00313 W = 3,13 mW."
      ],
      after: [
        "Her iki direnç de miliwatt düzeyinde güç harcadığı için standart 1/4 W'lık dirençler fazlasıyla yeterlidir. Bu hesabı [[arac:gerilim-bolucu-hesapla|Gerilim Bölücü Hesaplama]] aracına giriş gerilimi ve iki direnci yazarak anında doğrulayabilirsiniz."
      ]
    },
    {
      h: "5 V'u 3,3 V'a düşürmek için hangi dirençler seçilir?",
      p: [
        "3,3 V ile çalışan bir modülün giriş pinine 5 V'luk bir sinyal bağlanacaksa, sinyal hattında gerilim bölücü kullanılabilir. Hedef oran 3,3 ÷ 5 = 0,66'dır. Bu oran R2 = 2 × R1 seçildiğinde 2 ÷ 3 = 0,667'ye çok yakın çıkar."
      ],
      table: {
        head: ["R1", "R2", "Çıkış (5 V girişte)", "Akım", "Not"],
        rows: [
          ["1 kΩ", "2 kΩ", "3,33 V", "1,67 mA", "Hızlı sinyaller için uygun, akım biraz yüksek"],
          ["1,8 kΩ", "3,3 kΩ", "3,24 V", "0,98 mA", "Yaygın E12 değerleri"],
          ["10 kΩ", "20 kΩ", "3,33 V", "0,167 mA", "Düşük tüketim, yavaş sinyaller için"],
          ["4,7 kΩ", "10 kΩ", "3,40 V", "0,34 mA", "Hedefin biraz üzerinde"]
        ],
        caption: "Çıkış değerleri yük bağlı değilken hesaplanmıştır. Direnç toleransı (%1 ya da %5) gerçek değeri birkaç onda bir volt değiştirebilir."
      },
      after: [
        "Bu çözüm yalnızca tek yönlü ve düşük hızlı sinyaller (örneğin bir seri haberleşme hattının alıcı ucu) için uygundur. Modülü beslemek, yani 3,3 V güç sağlamak için gerilim bölücü kullanılmaz; bunun için bir gerilim regülatörü gerekir. Çift yönlü ya da hızlı veri hatlarında ise seviye dönüştürücü devreler tercih edilir."
      ]
    },
    {
      h: "Yük bağlanınca çıkış gerilimi neden değişir?",
      p: [
        "Gerilim bölücü formülü, çıkıştan hiç akım çekilmediğini varsayar. Çıkışa bir yük (ölçü aleti, mikrodenetleyici girişi, sensör) bağlandığında bu yük R2'ye paralel bağlanmış olur. Paralel bağlantının eşdeğer direnci her zaman küçük olandan da küçüktür; bu yüzden alt kolun direnci azalır ve çıkış gerilimi düşer."
      ],
      formula: "R2' = R2 × RL ÷ (R2 + RL)\nVout(yüklü) = Vin × R2' ÷ (R1 + R2')\nÖrnek: R1 = 10 kΩ, R2 = 20 kΩ, RL = 20 kΩ → R2' = 10 kΩ → Vout = 5 × 10 ÷ 20 = 2,50 V",
      after: [
        "Aynı devreye 1 MΩ'luk bir yük bağlanınca R2' = 19,61 kΩ olur ve çıkış 3,31 V'a iner; fark yalnızca 0,02 V'tur. Pratik kural, yük direncinin R2'nin en az 10 katı, tercihen 100 katı olmasıdır. Bölücünün çıkışı, kaynak direnci R1 ∥ R2 olan bir kaynak gibi davranır: 10 kΩ ve 20 kΩ için bu değer 6,67 kΩ'dur. Yük bu iç dirence göre ne kadar büyükse çıkış o kadar az etkilenir."
      ]
    },
    {
      h: "Gerilim bölücü güç kaynağı olarak kullanılabilir mi?",
      p: [
        "Hayır, akım çeken yükler için güç kaynağı olarak kullanılmamalıdır. Yük akımı değiştikçe çıkış gerilimi de değişir; motor, röle, LED şeridi ya da bir devre kartı gibi akımı sürekli değişen yükler kararsız çalışır. Ayrıca yükü taşıyacak kadar akım geçirmek için dirençleri küçük seçmek gerekir ve bu durumda dirençler boşa büyük güç harcar, ısınır.",
        "Bir devreyi daha düşük gerilimle beslemek gerekiyorsa doğrusal regülatör ya da anahtarlamalı dönüştürücü kullanılır. LED'in akımını sınırlamak ise ayrı bir konudur; tek bir seri dirençle yapılır ve [[bilgi:led-direnci-nasil-hesaplanir|LED direnci nasıl hesaplanır]] yazısında anlatılır."
      ]
    },
    {
      h: "Çözümlü örnek 2: pil voltajını mikrodenetleyiciyle ölçmek",
      p: [
        "Üç hücreli bir lityum iyon pil paketi tam doluyken 12,6 V verir. Mikrodenetleyicinin analog girişi en fazla 5 V ölçebiliyor. Gerilimi güvenli aralığa indirmek için R1 = 20 kΩ ve R2 = 10 kΩ seçelim."
      ],
      ol: [
        "Bölme oranı: 10 ÷ (20 + 10) = 1/3.",
        "En yüksek giriş: 12,6 × 1/3 = 4,2 V; 5 V sınırının altında kalır.",
        "Bölücüden sürekli geçen akım: 12,6 ÷ 30.000 = 0,42 mA, yani 420 µA.",
        "Ölçülen değeri gerçek pil gerilimine çevirmek için 3 ile çarpın: analog giriş 3,70 V okuyorsa pil 11,1 V'tur.",
        "Pilin sürekli boşalmasını azaltmak için dirençler 10 kat büyütülebilir (200 kΩ / 100 kΩ), ama bu durumda girişe paralel küçük bir kondansatör eklemek okumayı kararlı kılar."
      ],
      after: [
        "Ölçüm doğruluğu direnç toleransına bağlıdır. %1 toleranslı dirençler kullanmak ve sonucu bir multimetreyle bir kez kalibre etmek önerilir. Pil paketlerinin seri bağlanmasıyla ilgili bilgiler için [[bilgi:pil-seri-paralel-baglama-18650|pil seri paralel bağlama]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Direnç değerleri büyük mü küçük mü seçilmeli?",
      p: [
        "Oranı belirleyen iki direncin büyüklüğü değil birbirine oranıdır; aynı oranı 1 kΩ / 2 kΩ ile de, 100 kΩ / 200 kΩ ile de elde edebilirsiniz. Seçim iki zıt ihtiyacın dengesidir."
      ],
      table: {
        head: ["Seçim", "Avantaj", "Dezavantaj"],
        rows: [
          ["Küçük dirençler (1–10 kΩ)", "Yük etkisi az, gürültüye dayanıklı, hızlı sinyaller", "Daha fazla akım ve güç harcar, pili boşaltır"],
          ["Büyük dirençler (100 kΩ–1 MΩ)", "Çok düşük akım, pil dostu", "Yükten ve gürültüden kolay etkilenir, ölçüm girişinin iç direnciyle hata yapar"]
        ]
      },
      after: [
        "Pratikte mikrodenetleyici analog girişleri için toplamı 10–100 kΩ arasında kalan dirençler iyi bir başlangıç noktasıdır. Pil ile çalışan ve sürekli açık kalan ölçüm devrelerinde daha büyük değerler, kısa süreli ve hızlı sinyallerde daha küçük değerler tercih edilir."
      ]
    },
    {
      h: "Dirençlerde harcanan güç nasıl hesaplanır?",
      p: [
        "Her direncin harcadığı güç P = I² × R ya da P = V² ÷ R ile bulunur. Direncin gövdesinde yazan güç değeri (örneğin 1/4 W) bunun en az iki katı olmalıdır ki direnç ısınmadan çalışsın. Düşük gerilimli sinyal devrelerinde güç genellikle miliwatt düzeyindedir; ancak 230 V gibi yüksek gerilimlerde ya da küçük dirençlerde hesap mutlaka yapılmalıdır."
      ],
      ul: [
        "12 V, 1 kΩ + 1 kΩ: I = 6 mA, her direnç 36 mW harcar; 1/4 W yeterli.",
        "24 V, 100 Ω + 100 Ω: I = 120 mA, her direnç 1,44 W harcar; en az 3 W'lık direnç gerekir ve böyle bir tasarım verimsizdir.",
        "Şebeke gerilimiyle çalışan devrelerde gerilim bölücü tasarımı ve deneyi yalnızca bu işte yetkin kişilerce, uygun yalıtım ve korumayla yapılmalıdır."
      ]
    },
    {
      h: "Standart direnç değerleri ve renk kodları",
      p: [
        "Dirençler her değerde üretilmez; E12 ve E24 gibi standart serilerden seçilir. E12 serisi her onluk için 1,0 – 1,2 – 1,5 – 1,8 – 2,2 – 2,7 – 3,3 – 3,9 – 4,7 – 5,6 – 6,8 – 8,2 değerlerini içerir. Hesapladığınız değer seride yoksa en yakın değeri seçip çıkışı yeniden hesaplayın ya da iki direnci seri bağlayarak hedefe yaklaşın.",
        "Direncin değeri gövdesindeki renk bantlarıyla okunur. 10 kΩ'luk 4 bantlı bir direnç kahverengi–siyah–turuncu–altın, 4,7 kΩ'luk bir direnç sarı–mor–kırmızı–altın renklerini taşır. Renk okumayı [[arac:direnc-renk-kodu-hesapla|Direnç Renk Kodu Hesaplama]] aracı ve [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısıyla kolayca yapabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>R1 ile R2'yi karıştırmak:</strong> formülde paydaki direnç toprağa bağlı olandır; yer değişirse sonuç Vin − Vout olur.",
        "<strong>Yükü hesaba katmamak:</strong> çıkışa bağlanan cihazın giriş direnci bölücüyü bozabilir.",
        "<strong>Bölücüyle devre beslemeye çalışmak:</strong> akım çeken yüklerde gerilim düşer; regülatör kullanın.",
        "<strong>Güç değerini kontrol etmemek:</strong> küçük dirençler ve yüksek gerilimde dirençler aşırı ısınabilir.",
        "<strong>Toleransı unutmak:</strong> %5'lik dirençlerle hesaplanan 3,33 V gerçekte 3,2–3,45 V arasında çıkabilir."
      ]
    }
  ],
  faq: [
    ["Gerilim bölücü nedir?", "Gerilim bölücü, seri bağlı iki direncin birleşim noktasından giriş geriliminin belirli bir oranını alan devredir. Sensör okuma, gerilim ölçme ve referans gerilimi üretme gibi akım çekmeyen ya da çok az akım çeken işlerde kullanılır."],
    ["Vout = Vin × R2/(R1+R2) formülü nasıl uygulanır?", "Giriş gerilimini toprağa bağlı direnç R2 ile çarpıp iki direncin toplamına bölersiniz. 12 V girişte R1 = 10 kΩ ve R2 = 4,7 kΩ için çıkış 12 × 4,7 ÷ 14,7 = 3,84 V olur."],
    ["5 V'u 3,3 V'a düşürmek için hangi dirençler seçilir?", "R2'yi R1'in iki katı seçmek çıkışı 3,33 V yapar; örneğin 1 kΩ ve 2 kΩ ya da 10 kΩ ve 20 kΩ. Yaygın değerlerle 1,8 kΩ ve 3,3 kΩ 3,24 V verir. Bu yöntem yalnızca sinyal hattı içindir, besleme için değildir."],
    ["Yük bağlanınca çıkış gerilimi neden değişir?", "Yük R2'ye paralel bağlanır ve alt kolun eşdeğer direncini küçültür. 10 kΩ / 20 kΩ bölücüye 20 kΩ yük bağlanırsa çıkış 3,33 V'tan 2,5 V'a düşer. Yük direnci R2'nin en az 10 katı olmalıdır."],
    ["Gerilim bölücü güç kaynağı olarak kullanılabilir mi?", "Hayır. Yük akımı değiştikçe çıkış gerilimi değişir ve yeterli akım için küçük dirençler seçmek büyük güç kaybına yol açar. Devre beslemek için doğrusal regülatör ya da anahtarlamalı dönüştürücü kullanılmalıdır."],
    ["Arduino ile pil voltajı ölçmek için nasıl kullanılır?", "Pil gerilimini analog girişin sınırının altına indirecek oranda iki direnç seçin. 12,6 V'luk paket için 20 kΩ ve 10 kΩ girişe en fazla 4,2 V verir; okunan değeri 3 ile çarparak pil gerilimini bulursunuz."],
    ["Direnç değerleri büyük mü küçük mü seçilmeli?", "Oranı belirleyen direnç oranıdır. Küçük dirençler yük ve gürültüden az etkilenir ama fazla akım harcar; büyük dirençler pil dostudur ama yükten kolay etkilenir. Analog girişler için toplam 10–100 kΩ iyi bir başlangıçtır."],
    ["Dirençlerde harcanan güç nasıl hesaplanır?", "Önce akımı I = Vin ÷ (R1 + R2) ile bulun, sonra her direnç için P = I² × R hesaplayın. Seçtiğiniz direncin güç değeri hesaplanan gücün en az iki katı olmalıdır."],
    ["Standart direnç değerleri ve renk kodları nasıl okunur?", "Dirençler E12 ve E24 gibi standart serilerden üretilir; hesapladığınız değere en yakın seri değeri seçip sonucu yeniden hesaplayın. Değer gövdedeki renk bantlarından okunur: 10 kΩ kahverengi–siyah–turuncu, 4,7 kΩ sarı–mor–kırmızıdır."]
  ],
  tools: ["gerilim-bolucu-hesapla", "seri-direnc-hesapla", "paralel-direnc-hesapla", "ohm-kanunu-hesapla", "direnc-renk-kodu-hesapla"],
  related: ["ohm-kanunu-nedir", "seri-ve-paralel-direnc-hesaplama", "direnc-renk-kodlari-nasil-okunur", "led-direnci-nasil-hesaplanir"],
  uyari: "şebeke gerilimi ve yüksek akımlı devrelerde çalışmayı yetkin bir elektrikçiye bırakın; bu yazı düşük gerilimli devreler için genel bilgi verir"
};
