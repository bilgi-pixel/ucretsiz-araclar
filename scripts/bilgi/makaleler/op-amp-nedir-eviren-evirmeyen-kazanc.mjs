export default {
  slug: "op-amp-nedir-eviren-evirmeyen-kazanc",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Op-Amp Nedir? Eviren ve Evirmeyen Yükselteçte Kazanç Nasıl Hesaplanır",
  pageTitle: "Op-Amp Nedir? Eviren ve Evirmeyen Yükselteç Kazancı",
  description: "İşlemsel yükselteç (op-amp) nedir? Eviren kazanç −Rf/R1, evirmeyen 1 + Rf/Rg formülü, gerilim izleyici, desibel dönüşümü, besleme sınırı ve çözümlü direnç seçimi.",
  keywords: ["op amp nedir", "opamp kazanç hesaplama", "eviren yükselteç", "evirmeyen yükselteç", "gerilim izleyici", "opamp formülleri", "işlemsel yükselteç", "opamp desibel"],
  lead: "Op-amp (işlemsel yükselteç), iki girişi arasındaki gerilim farkını çok yüksek bir kazançla yükselten entegre bir devre elemanıdır; dışarıdan bağlanan iki dirençle istenen kazanca ayarlanır. Eviren yükselteçte kazanç <strong>Av = −Rf / R1</strong>, evirmeyen yükselteçte <strong>Av = 1 + Rf / Rg</strong> formülüyle bulunur. Örneğin 10 kΩ ve 47 kΩ dirençli eviren devre girişi 4,7 kat büyütüp ters çevirir. Bu sayfada formüllerin nereden geldiğini, gerilim izleyiciyi, desibel dönüşümünü, beslemenin çıkışı nasıl sınırladığını ve direnç seçimini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Op-amp, iki girişi (+ ve −) arasındaki farkı yükselten, geri beslemeyle kontrol edilen bir yükselteçtir.",
    "Eviren yükselteç: Av = −Rf / R1; çıkış girişe göre 180° ters fazdadır. R1 = 10 kΩ, Rf = 47 kΩ ise Av = −4,7.",
    "Evirmeyen yükselteç: Av = 1 + Rf / Rg; kazanç hiçbir zaman 1'in altına inmez. Rf = 22 kΩ, Rg = 10 kΩ ise Av = 3,2.",
    "Gerilim izleyici (buffer) evirmeyen devrenin Rf = 0 hâlidir: Av = 1, giriş direnci çok yüksek, çıkış direnci çok düşüktür.",
    "Kazanç desibele 20 × log<sub>10</sub>(|Av|) ile çevrilir: 10 kat = 20 dB, 100 kat = 40 dB.",
    "Çıkış besleme geriliminin dışına çıkamaz; hesaplanan çıkış beslemeyi aşarsa sinyal kırpılır (doyma)."
  ],
  figure: {
    alt: "Eviren ve evirmeyen op-amp devre şemaları yan yana; dirençlerin bağlantısı, kazanç formülleri ve 0,5 V girişle eviren devrede −2,35 V, 1,5 V girişle evirmeyen devrede 4,8 V çıkış örneği.",
    caption: "Eviren devrede giriş R1 üzerinden eksi girişe gelir ve çıkış ters döner. Evirmeyen devrede giriş doğrudan artı girişe bağlanır; Rg ile Rf yalnızca geri beslemeyi oluşturur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="30" class="b mid">Eviren yükselteç</text>
  <text x="540" y="30" class="b mid">Evirmeyen yükselteç</text>
  <line x1="360" y1="44" x2="360" y2="300" class="sb dash" fill="none"/>
  <polygon points="150,90 150,190 240,140" class="sf sb"/>
  <text x="162" y="118" class="lg b">−</text><text x="162" y="172" class="lg b">+</text>
  <line x1="40" y1="114" x2="70" y2="114" class="st sw" fill="none"/>
  <rect x="70" y="104" width="50" height="20" rx="3" class="ps"/><text x="95" y="98" class="sm mid b">R1</text>
  <line x1="120" y1="114" x2="150" y2="114" class="st sw" fill="none"/>
  <line x1="135" y1="114" x2="135" y2="70" class="st sw" fill="none"/>
  <line x1="135" y1="70" x2="170" y2="70" class="st sw" fill="none"/>
  <rect x="170" y="60" width="50" height="20" rx="3" class="ps"/><text x="195" y="54" class="sm mid b">Rf</text>
  <line x1="220" y1="70" x2="270" y2="70" class="st sw" fill="none"/><line x1="270" y1="70" x2="270" y2="140" class="st sw" fill="none"/>
  <line x1="240" y1="140" x2="320" y2="140" class="st sw" fill="none"/>
  <line x1="150" y1="166" x2="120" y2="166" class="st sw" fill="none"/><line x1="120" y1="166" x2="120" y2="200" class="st sw" fill="none"/>
  <line x1="106" y1="200" x2="134" y2="200" class="st sw" fill="none"/><text x="120" y="222" class="sm mid mu">toprak</text>
  <text x="40" y="104" class="sm">Vin</text><text x="300" y="132" class="sm">Vout</text>
  <polygon points="510,90 510,190 600,140" class="sf sb"/>
  <text x="522" y="118" class="lg b">−</text><text x="522" y="172" class="lg b">+</text>
  <line x1="400" y1="166" x2="510" y2="166" class="st sw" fill="none"/><text x="400" y="156" class="sm">Vin</text>
  <line x1="510" y1="114" x2="470" y2="114" class="st sw" fill="none"/>
  <line x1="470" y1="114" x2="470" y2="70" class="st sw" fill="none"/>
  <line x1="470" y1="70" x2="530" y2="70" class="st sw" fill="none"/>
  <rect x="530" y="60" width="50" height="20" rx="3" class="ps"/><text x="555" y="54" class="sm mid b">Rf</text>
  <line x1="580" y1="70" x2="630" y2="70" class="st sw" fill="none"/><line x1="630" y1="70" x2="630" y2="140" class="st sw" fill="none"/>
  <line x1="600" y1="140" x2="690" y2="140" class="st sw" fill="none"/><text x="652" y="132" class="sm">Vout</text>
  <line x1="470" y1="114" x2="470" y2="200" class="st sw" fill="none"/>
  <rect x="460" y="200" width="20" height="44" rx="3" class="ps"/><text x="492" y="228" class="sm b">Rg</text>
  <line x1="470" y1="244" x2="470" y2="262" class="st sw" fill="none"/><line x1="456" y1="262" x2="484" y2="262" class="st sw" fill="none"/>
  <rect x="20" y="300" width="330" height="104" rx="8" class="sf sb"/>
  <text x="185" y="326" class="b mid p">Av = −Rf / R1</text>
  <text x="185" y="350" class="sm mid">R1 = 10 kΩ, Rf = 47 kΩ → Av = −4,7</text>
  <text x="185" y="372" class="sm mid">Vin = 0,5 V → Vout = −2,35 V</text>
  <text x="185" y="394" class="sm mid t2">|Av| = 13,44 dB · faz 180°</text>
  <rect x="370" y="300" width="330" height="104" rx="8" class="sf sb"/>
  <text x="535" y="326" class="b mid ok">Av = 1 + Rf / Rg</text>
  <text x="535" y="350" class="sm mid">Rg = 10 kΩ, Rf = 22 kΩ → Av = 3,2</text>
  <text x="535" y="372" class="sm mid">Vin = 1,5 V → Vout = 4,8 V</text>
  <text x="535" y="394" class="sm mid t2">10,10 dB · faz 0°</text>
</svg>`
  },
  sections: [
    {
      h: "İşlemsel yükselteç (op-amp) nedir?",
      p: [
        "İşlemsel yükselteç, adını analog bilgisayarlarda toplama, çıkarma, türev ve integral gibi matematik işlemlerini yapmak için kullanılmasından alır. Bugün tek bir küçük entegre devre içinde onlarca transistörden oluşur ve sensör sinyali yükseltme, filtreleme, karşılaştırma, ses devreleri ve ölçü aletlerinde temel yapı taşıdır.",
        "Op-amp'ın iki girişi vardır: <strong>eviren giriş (−)</strong> ve <strong>evirmeyen giriş (+)</strong>. Bir de çıkışı ve besleme uçları bulunur. Çıkış, iki giriş arasındaki gerilim farkının açık çevrim kazancı denen çok büyük bir sayıyla çarpımıdır. Bu kazanç tipik olarak yüz binler mertebesindedir; bu yüzden geri besleme olmadan op-amp küçük bir farkta bile çıkışı beslemeye dayar.",
        "Kontrollü bir yükseltme için çıkıştan eksi girişe direnç üzerinden <strong>negatif geri besleme</strong> verilir. Bu durumda devrenin kazancını op-amp'ın kendisi değil, dışarıdaki dirençlerin oranı belirler. İşte bu yüzden aynı op-amp ile 2 katlık da 100 katlık da yükselteç yapılabilir."
      ]
    },
    {
      h: "İdeal op-amp'ın iki altın kuralı",
      p: [
        "Formülleri türetmek için ideal op-amp varsayılır ve negatif geri beslemeli devrelerde iki kural kullanılır. Gerçek op-amp'lar bu kurallara düşük frekanslarda çok yaklaşır."
      ],
      ol: [
        "<strong>Girişlerden akım akmaz:</strong> Giriş direnci sonsuz kabul edilir; + ve − girişlerine giren akım sıfırdır.",
        "<strong>Girişler arasındaki gerilim farkı sıfırdır:</strong> Geri besleme, çıkışı eksi girişin gerilimi artı girişe eşit olacak şekilde ayarlar. Buna sanal kısa devre denir."
      ],
      after: [
        "Bu iki kuralla birlikte [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] (V = I × R) devredeki her akımı ve gerilimi bulmaya yeter. Aşağıdaki türetmeler yalnızca bu üç bilgiyi kullanır."
      ]
    },
    {
      h: "Eviren yükselteçte kazanç formülü nedir?",
      p: [
        "Eviren yükselteçte giriş sinyali R1 direnci üzerinden eksi girişe uygulanır, artı giriş toprağa bağlanır, Rf direnci ise çıkıştan eksi girişe geri besleme sağlar. Sanal kısa devre kuralına göre eksi giriş de 0 V'tadır; buna <strong>sanal toprak</strong> denir."
      ],
      formula: "R1'den geçen akım: I = Vin / R1\nGirişe akım girmediği için aynı akım Rf'den geçer: I = (0 − Vout) / Rf\nEşitlenir: Vin / R1 = −Vout / Rf  →  Av = Vout / Vin = −Rf / R1",
      ol: [
        "Örnek: R1 = 10 kΩ, Rf = 47 kΩ seçilsin. Oran Rf / R1 = 47 / 10 = 4,7.",
        "Kazanç Av = −4,7 olur. Eksi işareti çıkışın girişe göre ters (180° faz farklı) olduğunu gösterir.",
        "Girişe 0,5 V uygulanırsa Vout = −4,7 × 0,5 = −2,35 V olur.",
        "Desibel karşılığı 20 × log<sub>10</sub>(4,7) = 13,44 dB'dir.",
        "Devrenin giriş direnci yaklaşık R1, yani 10 kΩ'dur. Sinyal kaynağı bu yükü sürebilmelidir."
      ],
      after: [
        "Eviren devrenin avantajı, kazancın 1'den küçük de seçilebilmesidir: Rf = 5 kΩ, R1 = 10 kΩ ile Av = −0,5 olur ve sinyal yarıya iner. Dezavantajı ise giriş direncinin R1 ile sınırlı olmasıdır."
      ]
    },
    {
      h: "Evirmeyen yükselteçte kazanç neden 1 + Rf/Rg'dir?",
      p: [
        "Evirmeyen yükselteçte giriş sinyali doğrudan artı girişe uygulanır. Çıkıştan eksi girişe Rf, eksi girişten toprağa Rg bağlanır. Rf ile Rg bir gerilim bölücü oluşturur ve çıkış geriliminin bir bölümünü eksi girişe geri verir."
      ],
      formula: "Bölücüden eksi girişe gelen gerilim: V− = Vout × Rg / (Rg + Rf)\nSanal kısa devre: V− = V+ = Vin\nVin = Vout × Rg / (Rg + Rf)  →  Av = (Rg + Rf) / Rg = 1 + Rf / Rg",
      ol: [
        "Örnek: Rg = 10 kΩ, Rf = 22 kΩ. Oran Rf / Rg = 2,2.",
        "Kazanç Av = 1 + 2,2 = 3,2 olur ve işaret pozitiftir; çıkış girişle aynı fazdadır.",
        "Girişe 1,5 V uygulanırsa Vout = 3,2 × 1,5 = 4,8 V.",
        "Desibel karşılığı 20 × log<sub>10</sub>(3,2) = 10,10 dB."
      ],
      after: [
        "Formüldeki \"1 +\" teriminin anlamı şudur: Rf ne kadar küçük olursa olsun çıkış en az giriş kadardır. Evirmeyen yükselteçle sinyal küçültülemez. Buna karşılık giriş sinyali doğrudan op-amp girişine bağlandığı için devrenin giriş direnci çok yüksektir ve kaynağı neredeyse hiç yüklemez."
      ]
    },
    {
      h: "Gerilim izleyici (buffer) ne işe yarar?",
      p: [
        "Evirmeyen yükselteçte Rf yerine düz kablo konur ve Rg kaldırılırsa kazanç Av = 1 + 0 = 1 olur. Bu devreye <strong>gerilim izleyici</strong> ya da tampon (buffer) denir. Çıkış, girişle birebir aynıdır; peki neden kullanılır?",
        "Cevap empedans dönüşümüdür. Gerilim izleyicinin giriş direnci çok yüksek, çıkış direnci çok düşüktür. Yüksek iç dirençli bir sensör ya da bir gerilim bölücü doğrudan bir yüke bağlandığında gerilimi düşer; araya bir buffer konursa kaynak yüklenmez ve yük gereken akımı op-amp'tan çeker. Örneğin 100 kΩ'luk bir potansiyometrenin orta ucu 1 kΩ'luk bir yüke doğrudan bağlanırsa ayar gerilimi belirgin biçimde düşer; arada buffer varsa ayarlanan gerilim korunur. Empedans kavramı için [[bilgi:empedans-ve-reaktans-nedir|empedans ve reaktans yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Kazanç desibele nasıl çevrilir?",
      p: [
        "Gerilim kazancı desibele <strong>20 × log<sub>10</sub>(|Av|)</strong> formülüyle çevrilir. Güç kazancında çarpan 10'dur, gerilimde 20'dir; çünkü güç gerilimin karesiyle orantılıdır. Eksi işaret (faz) desibel değerine girmez, mutlak değer alınır."
      ],
      table: {
        head: ["Gerilim kazancı |Av|", "Desibel", "Yorum"],
        rows: [
          ["0,5", "−6,02 dB", "Sinyal yarıya iner (yalnızca eviren devrede)"],
          ["1", "0 dB", "Gerilim izleyici, değişim yok"],
          ["2", "6,02 dB", "Gerilim iki katına çıkar"],
          ["3,2", "10,10 dB", "Evirmeyen örnek devre"],
          ["4,7", "13,44 dB", "Eviren örnek devre"],
          ["10", "20 dB", "On kat"],
          ["100", "40 dB", "Yüz kat"],
          ["1.000", "60 dB", "Bin kat; tek kademede bant genişliği sorun olabilir"]
        ]
      },
      after: [
        "Desibelin en pratik yanı, art arda bağlı kademelerin kazançlarının toplanabilmesidir: 20 dB'lik iki kademe toplam 40 dB, yani 100 kat eder. Desibel ölçeğinin mantığı [[bilgi:desibel-nedir-kac-db-zararli|desibel nedir yazısında]] anlatılır."
      ]
    },
    {
      h: "Besleme gerilimi çıkışı nasıl sınırlar? Doyma ve bant genişliği",
      p: [
        "Op-amp çıkışı, besleme gerilimlerinin dışına çıkamaz. ±12 V ile beslenen bir op-amp'ın çıkışı en fazla +12 V ile −12 V arasında olabilir; birçok op-amp'ta gerçek sınır beslemenin 1–2 V içindedir. Uçlara kadar çıkabilenlere \"rail-to-rail\" çıkışlı op-amp denir.",
        "Örnek: Evirmeyen devrede Av = 3,2 iken girişe 4 V uygulanırsa hesaplanan çıkış 3,2 × 4 = 12,8 V'tur. Besleme ±12 V ise bu değer sınırı aşar ve çıkış yaklaşık 12 V'ta kırpılır. Sinüs sinyalinin tepeleri düzleşir; ses devrelerinde bu bozulma duyulur. Çözüm, kazancı ya da giriş genliğini düşürmek veya beslemeyi artırmaktır.",
        "Bir diğer sınır frekanstır. Op-amp'ların kazanç-bant genişliği çarpımı (GBW) yaklaşık sabittir: GBW değeri 1 MHz olan bir op-amp 10 kat kazançta yaklaşık 100 kHz'e, 100 kat kazançta yaklaşık 10 kHz'e kadar bu kazancı koruyabilir. Yüksek kazanç gerekiyorsa tek kademe yerine iki kademe kullanmak daha geniş bant sağlar."
      ],
      note: "[[arac:opamp-kazanc-hesapla|Op-Amp Kazancı Hesaplama]] aracına besleme gerilimini de yazarsanız hesaplanan çıkış beslemeyi aştığında doyma uyarısı verir."
    },
    {
      h: "Direnç değerleri nasıl seçilir? Arduino için çözümlü örnek",
      p: [
        "Kazanç yalnızca orana bağlı olduğu için 1 kΩ / 4,7 kΩ ile 100 kΩ / 470 kΩ aynı kazancı verir. Ancak pratikte direnç değerleri genellikle 1 kΩ ile 1 MΩ arasında seçilir. Çok küçük dirençler op-amp çıkışından gereksiz akım çeker; çok büyük dirençler gürültüyü artırır ve op-amp'ın küçük giriş akımlarıyla hata oluşturur. 10 kΩ civarı çoğu uygulama için iyi bir başlangıçtır."
      ],
      ol: [
        "Sorun: Bir sensör 0–0,5 V arası çıkış veriyor; 5 V referanslı 10 bit ADC'de bu aralık yalnızca 0,5 / 5 × 1.023 ≈ 102 basamak kullanır, çözünürlük düşüktür.",
        "Hedef kazanç: 0,5 V'u 5 V'a yaklaştırmak için Av ≈ 10 gerekir. Evirmeyen devre seçilir, çünkü sensörü yüklememek ve fazı korumak isteriz.",
        "Rg = 10 kΩ alınırsa Rf = (Av − 1) × Rg = 90 kΩ gerekir. Standart serilerde 90 kΩ yoktur; 91 kΩ seçilirse Av = 10,1 ve 0,5 V girişte çıkış 5,05 V olur, ADC sınırını aşar.",
        "Güvenli pay için Rf = 82 kΩ seçilir: Av = 1 + 82 / 10 = 9,2. En büyük çıkış 0,5 × 9,2 = 4,6 V olur.",
        "Sonuç: 4,6 V, ADC'de yaklaşık 4,6 / 5 × 1.023 ≈ 941 basamağa karşılık gelir. Çözünürlük yaklaşık 9 kat artmıştır. Op-amp 5 V tek beslemeyle çalışacaksa rail-to-rail tip seçilmelidir."
      ],
      after: [
        "Dirençlerin renk bantlarından değerini okumak için [[arac:direnc-renk-kodu-hesapla|Direnç Renk Kodu Hesaplama]] aracını, standart değer olmayan bir direnci iki direnci seri bağlayarak elde etmek için [[arac:seri-direnc-hesapla|Seri Direnç Hesaplama]] aracını kullanabilirsiniz. ADC ve PWM ilişkisi [[bilgi:pwm-nedir-arduino-adc|PWM ve ADC yazısında]] anlatılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Evirmeyen formülde 1'i unutmak:</strong> Rf = Rg ile kazanç 1 değil 2'dir.",
        "<strong>Eviren devrede işareti atlamak:</strong> Tek beslemeli (0–5 V) devrede eviren yükselteç pozitif girişi negatif çıkışa çevirmeye çalışır ve çıkış 0 V'ta kalır; tek beslemede ofset ya da evirmeyen devre gerekir.",
        "<strong>Besleme sınırını hesaba katmamak:</strong> Hesaplanan çıkış beslemeyi aşarsa sonuç kırpılır.",
        "<strong>Geri beslemeyi artı girişe bağlamak:</strong> Pozitif geri besleme yükselteç değil, karşılaştırıcı ya da osilatör davranışı üretir.",
        "<strong>Besleme dekuplaj kondansatörünü atlamak:</strong> Besleme uçlarına yakın konan 100 nF'lık kondansatör olmadan op-amp salınım yapabilir."
      ]
    }
  ],
  faq: [
    ["İşlemsel yükselteç (op-amp) nedir?", "Op-amp, iki girişi arasındaki gerilim farkını çok yüksek açık çevrim kazancıyla yükselten entegre devre elemanıdır. Çıkıştan eksi girişe negatif geri besleme verildiğinde kazancı dış dirençlerin oranı belirler ve kontrollü bir yükselteç elde edilir."],
    ["Eviren yükselteçte kazanç formülü nedir?", "Eviren yükselteçte kazanç Av = −Rf / R1 formülüyle bulunur. Eksi işaret çıkışın ters fazda olduğunu gösterir. R1 = 10 kΩ ve Rf = 47 kΩ ile kazanç −4,7 olur; 0,5 V giriş −2,35 V çıkış verir."],
    ["Evirmeyen yükselteçte kazanç neden 1 + Rf/Rg'dir?", "Rf ile Rg çıkış gerilimini bölerek eksi girişe verir ve geri besleme bu gerilimi girişe eşitler. Vin = Vout × Rg / (Rg + Rf) eşitliğinden Av = 1 + Rf / Rg çıkar; bu yüzden kazanç hiçbir zaman 1'in altına inmez."],
    ["Gerilim izleyici (buffer) ne işe yarar?", "Gerilim izleyici kazancı 1 olan evirmeyen yükselteçtir. Girişi çok yüksek, çıkışı çok düşük dirençli olduğu için yüksek iç dirençli bir kaynağı yüklemeden düşük dirençli bir yükü sürmeye, yani empedans dönüştürmeye yarar."],
    ["Kazanç desibele nasıl çevrilir?", "Gerilim kazancının mutlak değeri alınıp 20 × log10(|Av|) hesaplanır. 10 kat 20 dB, 100 kat 40 dB, 3,2 kat 10,10 dB eder. Art arda bağlı kademelerin desibel değerleri toplanarak toplam kazanç bulunur."],
    ["Besleme gerilimi çıkışı nasıl sınırlar?", "Op-amp çıkışı besleme gerilimlerinin dışına çıkamaz; birçok modelde sınır beslemenin 1–2 V içindedir. Hesaplanan çıkış bu sınırı aşarsa sinyal kırpılır ve doyma oluşur. Kazancı ya da giriş genliğini düşürmek gerekir."],
    ["Direnç değerleri nasıl seçilir?", "Kazanç direnç oranına bağlı olduğundan önce oran belirlenir, sonra değerler genellikle 1 kΩ ile 1 MΩ arasında seçilir. 10 kΩ civarı iyi bir başlangıçtır; standart seride olmayan değerde ADC sınırını aşmamak için bir alt değere inmek güvenlidir."],
    ["Op-amp Arduino projelerinde nerede kullanılır?", "Düşük gerilimli sensör çıkışlarını ADC aralığına yükseltmek, yüksek iç dirençli kaynakları tamponlamak, sinyal filtrelemek ve karşılaştırıcı devreler kurmak için kullanılır. 5 V tek beslemeli kartlarda rail-to-rail op-amp tercih edilmelidir."],
    ["Op-amp devresinde kazanç neden hesaplanandan düşük çıkıyor?", "En sık nedenler yüksek frekansta kazanç-bant genişliği sınırına takılmak, çıkışın besleme sınırında kırpılması, direnç toleransları ve kaynağın iç direncidir. Eviren devrede kaynak direnci R1'e eklendiği için kazancı düşürür."]
  ],
  tools: ["opamp-kazanc-hesapla", "direnc-renk-kodu-hesapla", "seri-direnc-hesapla", "ohm-kanunu-hesapla"],
  related: ["ohm-kanunu-nedir", "direnc-renk-kodlari-nasil-okunur", "pwm-nedir-arduino-adc"],
  uyari: "örnekler düşük gerilimli eğitim devreleri içindir; şebeke gerilimine bağlı devrelerde çalışmayın, yetkin bir elektrik-elektronik uzmanına danışın"
};
