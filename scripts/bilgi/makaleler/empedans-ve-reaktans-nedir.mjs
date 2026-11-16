export default {
  slug: "empedans-ve-reaktans-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Empedans ve Reaktans Nedir? Bobin, Kondansatör ve LC Rezonans Frekansı",
  pageTitle: "Empedans ve Reaktans Nedir? Xc, XL ve LC Rezonans Hesabı",
  description: "Empedans, AC devrede direnç ve reaktansın toplam karşı koymasıdır: Z = √(R² + X²). Kapasitif ve endüktif reaktans, LC rezonans ve hoparlör ohm değeri.",
  keywords: ["empedans nedir", "reaktans nedir", "kapasitif reaktans", "endüktif reaktans", "lc rezonans frekansı", "bobin endüktansı", "empedans hesaplama", "empedans birimi", "hoparlör 4 ohm 8 ohm"],
  lead: "Empedans, alternatif akım devresinin akıma gösterdiği toplam karşı koymadır; direnç (R) ile reaktansın (X) bileşimidir ve <strong>Z = √(R² + X²)</strong> formülüyle ohm cinsinden bulunur. Reaktans ise bobin ve kondansatörün frekansa bağlı karşı koymasıdır: bobinde <strong>X<sub>L</sub> = 2πfL</strong> frekansla artar, kondansatörde <strong>X<sub>C</sub> = 1 ÷ (2πfC)</strong> frekansla azalır. İkisi eşitlendiğinde devre rezonansa girer. Bu sayfada formülleri, çözümlü RLC örneğini, bobin endüktansını ve hoparlörlerdeki 4 ve 8 ohm değerinin anlamını bulacaksınız.",
  kisaCevap: [
    "Empedansın birimi ohm'dur (Ω) ve Z harfiyle gösterilir; doğru akımda yalnızca direnç, alternatif akımda direnç ile reaktans birlikte etkilidir.",
    "Endüktif reaktans X<sub>L</sub> = 2πfL'dir: 100 mH bobin 50 Hz'de 31,4 Ω, 1 kHz'de 628,3 Ω gösterir.",
    "Kapasitif reaktans X<sub>C</sub> = 1 ÷ (2πfC)'dir: 10 µF kondansatör 50 Hz'de 318,3 Ω, 1 kHz'de 15,9 Ω gösterir.",
    "Seri RLC devresinde Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²) ve faz açısı φ = arctan((X<sub>L</sub> − X<sub>C</sub>) ÷ R)'dir.",
    "LC rezonans frekansı f<sub>0</sub> = 1 ÷ (2π√(LC)) ile bulunur; bu frekansta X<sub>L</sub> = X<sub>C</sub> olur.",
    "Hoparlördeki 4 Ω ya da 8 Ω, belirli bir frekanstaki nominal empedanstır; gerçek empedans frekansa göre değişir."
  ],
  figure: {
    alt: "Solda empedans üçgeni: yatay kenar direnç 100 ohm, dikey kenar net reaktans eksi 286,9 ohm, hipotenüs empedans 303,8 ohm. Sağda frekansa göre artan endüktif ve azalan kapasitif reaktans eğrileri, 159 hertzde kesişiyor.",
    caption: "Örnek devre: R = 100 Ω, L = 100 mH, C = 10 µF. 50 Hz'de kapasitif reaktans baskındır ve empedans 303,8 Ω'dur. İki reaktans 159 Hz'de eşitlenir; bu rezonans frekansıdır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="170" y="32" class="lg b mid">Empedans üçgeni (50 Hz)</text>
  <polygon points="50,90 230,90 50,320" class="ps"/>
  <line x1="50" y1="90" x2="230" y2="90" class="sp sw" fill="none"/>
  <line x1="50" y1="90" x2="50" y2="320" class="sdg sw" fill="none"/>
  <line x1="230" y1="90" x2="50" y2="320" class="st sw" fill="none"/>
  <text x="140" y="78" class="b mid p">R = 100 Ω</text>
  <text x="60" y="210" class="b dg">X = −286,9 Ω</text>
  <text x="60" y="230" class="sm t2">(31,4 − 318,3)</text>
  <text x="158" y="230" class="b">Z = 303,8 Ω</text>
  <text x="120" y="350" class="sm mid t2">φ = −70,8° · güç faktörü 0,33</text>
  <text x="120" y="372" class="sm mid t2">Eksi işaret: kapasitif davranış</text>
  <line x1="330" y1="40" x2="330" y2="360" class="sb dash" fill="none"/>
  <text x="530" y="32" class="lg b mid">Reaktans – frekans</text>
  <line x1="380" y1="320" x2="700" y2="320" class="st" fill="none"/>
  <line x1="380" y1="320" x2="380" y2="60" class="st" fill="none"/>
  <text x="372" y="66" class="sm end mu">Ω</text>
  <line x1="380" y1="310" x2="700" y2="90" class="sp sw" fill="none"/>
  <text x="640" y="112" class="b p end">X<tspan class="sm">L</tspan> = 2πfL</text>
  <path d="M392,70 Q440,250 540,255 T700,302" class="sa sw" fill="none"/>
  <text x="560" y="290" class="b">X<tspan class="sm">C</tspan> = 1 ÷ 2πfC</text>
  <circle cx="525" cy="211" r="7" class="ok"/>
  <line x1="525" y1="211" x2="525" y2="320" class="sok dash" fill="none"/>
  <text x="525" y="342" class="b mid ok">f₀ = 159 Hz</text>
  <text x="700" y="342" class="sm end mu">frekans →</text>
  <text x="430" y="372" class="sm t2">Solda kapasitif, sağda endüktif bölge</text>
</svg>`
  },
  sections: [
    {
      h: "Empedans nedir? Direnç ile reaktans arasındaki fark",
      p: [
        "Doğru akım (DC) devresinde akımı sınırlayan tek şey dirençtir ve Ohm yasası V = I × R ile çalışırsınız. Alternatif akımda (AC) ise bobin ve kondansatör de akıma karşı koyar; bu karşı koyma frekansa göre değişir ve adına <strong>reaktans</strong> denir. Direnç ile reaktansın birlikte oluşturduğu toplam karşı koymaya <strong>empedans</strong> denir.",
        "Direnç ile reaktans arasındaki temel fark enerjinin ne olduğudur. Direnç elektrik enerjisini ısıya çevirir ve harcar. Reaktans ise enerjiyi harcamaz; bobin manyetik alanda, kondansatör elektrik alanında bir yarım periyot boyunca enerji depolar ve sonra kaynağa geri verir. Bu yüzden reaktans akım ile gerilim arasında zaman kayması (faz farkı) yaratır.",
        "Empedansın birimi de ohm'dur. AC devrelerde Ohm yasası V = I × Z biçiminde yazılır. Empedansı bilinen bir devrede akımı bulmak için gerilimi Z'ye bölersiniz; temel bağıntıyı [[bilgi:ohm-kanunu-nedir|Ohm kanunu]] sayfasında hatırlayabilirsiniz."
      ]
    },
    {
      h: "Kapasitif reaktans nasıl hesaplanır?",
      p: [
        "Kondansatör, düşük frekansta neredeyse açık devre gibi davranır; doğru akımı hiç geçirmez. Frekans yükseldikçe plakalar daha sık dolup boşalır ve akım kolaylaşır. Bu yüzden kapasitif reaktans frekansla ters orantılıdır: frekans iki katına çıkarsa X<sub>C</sub> yarıya iner."
      ],
      formula: "X꜀ = 1 ÷ (2π × f × C)\nf: hertz (Hz) · C: farad (F) · X꜀: ohm (Ω)",
      ul: [
        "10 µF, 50 Hz: X<sub>C</sub> = 1 ÷ (2π × 50 × 0,00001) = 318,3 Ω.",
        "10 µF, 1.000 Hz: X<sub>C</sub> = 1 ÷ (2π × 1.000 × 0,00001) = 15,9 Ω; frekans 20 kat artınca reaktans 20 kat azaldı.",
        "Kapasite büyüdükçe reaktans küçülür; bu yüzden ses devrelerinde bası geçirmek için büyük, tizi geçirmek için küçük kondansatör kullanılır."
      ],
      after: [
        "Frekans ve kapasite girerek X<sub>C</sub> ile X<sub>L</sub> değerlerini birlikte görmek için [[arac:kapasitif-reaktans-hesapla|Kapasitif Reaktans Hesaplama]] aracını kullanabilirsiniz. Kondansatörün DC'deki şarj davranışı ise [[bilgi:rc-zaman-sabiti-kondansator-sarj-suresi|RC zaman sabiti]] makalesinde anlatılır."
      ]
    },
    {
      h: "Endüktif reaktans frekansla nasıl değişir?",
      p: [
        "Bobin, içinden geçen akımın değişmesine karşı koyar; akım ne kadar hızlı değişirse karşı koyma o kadar büyük olur. Doğru akımda bobin yalnızca telinin direnci kadar direnç gösterir, frekans yükseldikçe reaktansı doğrusal olarak artar. Frekans iki katına çıkarsa X<sub>L</sub> da iki katına çıkar."
      ],
      formula: "X_L = 2π × f × L\nL: henry (H) · 1 mH = 0,001 H · 1 µH = 0,000001 H",
      table: {
        head: ["Eleman", "50 Hz", "1 kHz", "10 kHz"],
        rows: [
          ["100 mH bobin (X<sub>L</sub>)", "31,4 Ω", "628,3 Ω", "6.283 Ω"],
          ["10 µF kondansatör (X<sub>C</sub>)", "318,3 Ω", "15,9 Ω", "1,59 Ω"],
          ["100 Ω direnç (R)", "100 Ω", "100 Ω", "100 Ω"]
        ],
        caption: "Direnç frekanstan bağımsızdır; bobinin reaktansı frekansla artar, kondansatörünki azalır."
      },
      after: [
        "Bu zıt davranış filtrelerin temelidir. Hoparlör kutularındaki ayırıcı (crossover) devrelerde bobin tiz sinyalleri bas hoparlörden uzak tutar, kondansatör ise bas sinyalleri tiz hoparlöre göndermez."
      ]
    },
    {
      h: "Seri RLC devresinde empedans: çözümlü örnek",
      p: [
        "Bobin ve kondansatörün reaktansları zıt yönlüdür; seri bağlandıklarında birbirinden çıkarılır. Net reaktans direnç ile dik açılı bir üçgen oluşturur, bu yüzden empedans basit toplamla değil Pisagor bağıntısıyla bulunur. Dik üçgen mantığını [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] sayfasında görebilirsiniz."
      ],
      formula: "X = X_L − X꜀\nZ = √(R² + X²)\nφ = arctan(X ÷ R) · güç faktörü = cos φ = R ÷ Z\nI = V ÷ Z",
      ol: [
        "Değerler: R = 100 Ω, L = 100 mH, C = 10 µF, f = 50 Hz, kaynak 12 V.",
        "X<sub>L</sub> = 2π × 50 × 0,1 = 31,42 Ω.",
        "X<sub>C</sub> = 1 ÷ (2π × 50 × 0,00001) = 318,31 Ω.",
        "Net reaktans X = 31,42 − 318,31 = −286,89 Ω. Eksi işaret devrenin kapasitif davrandığını gösterir.",
        "Z = √(100² + 286,89²) = √(10.000 + 82.308) = 303,8 Ω.",
        "Faz açısı φ = arctan(−286,89 ÷ 100) = −70,8°; güç faktörü 100 ÷ 303,8 = 0,33.",
        "Akım I = 12 ÷ 303,8 = 0,0395 A, yani yaklaşık 39,5 mA."
      ],
      after: [
        "Aynı devrede frekansı değiştirdiğinizde empedans da değişir. [[arac:empedans-hesapla|Empedans Hesaplama]] aracı seri RL, RC ve RLC devreleri için reaktansları, faz açısını, güç faktörünü ve akımı birlikte gösterir."
      ]
    },
    {
      h: "LC devresinin rezonans frekansı nasıl bulunur?",
      p: [
        "Bobin ve kondansatörün reaktansları, belirli bir frekansta birbirine eşit olur. Bu noktada seri devrede net reaktans sıfırlanır, empedans yalnızca dirence eşit kalır ve akım en yüksek değerine çıkar. Paralel LC devresinde ise tersine empedans çok büyür. Bu frekansa <strong>rezonans frekansı</strong> denir."
      ],
      formula: "X_L = X꜀  ⇒  2πfL = 1 ÷ (2πfC)\nf₀ = 1 ÷ (2π × √(L × C))",
      ul: [
        "L = 100 mH, C = 10 µF: f<sub>0</sub> = 1 ÷ (2π × √(0,1 × 0,00001)) = 1 ÷ (2π × 0,001) ≈ 159,2 Hz. Yukarıdaki örnek devre 50 Hz'de bu frekansın altında kaldığı için kapasitif davranmıştır.",
        "L = 100 µH, C = 100 nF: f<sub>0</sub> = 1 ÷ (2π × √(10<sup>−11</sup>)) ≈ 50,3 kHz.",
        "Kapasiteyi dört katına çıkarmak rezonans frekansını yarıya indirir; çünkü frekans kapasitenin karekökü ile ters orantılıdır."
      ],
      after: [
        "Radyo alıcılarında istasyon seçmek, kablosuz şarj cihazlarında enerji aktarmak ve osilatörlerde frekans üretmek hep bu ilkeye dayanır. İstediğiniz frekans için gereken L ya da C değerini [[arac:lc-rezonans-frekansi-hesapla|LC Rezonans Frekansı Hesaplama]] aracıyla bulabilirsiniz. Frekansla dalga boyu arasındaki ilişki için [[bilgi:dalga-boyu-ve-frekans-iliskisi|dalga boyu ve frekans]] makalesine göz atabilirsiniz."
      ]
    },
    {
      h: "Bobinin endüktansı neye bağlıdır?",
      p: [
        "Endüktans; sarım sayısına, bobinin kesit alanına, uzunluğuna ve nüve malzemesine bağlıdır. Sarım sayısı en güçlü etkendir, çünkü endüktans sarım sayısının karesiyle orantılıdır: sarımı iki katına çıkarmak endüktansı dört katına çıkarır. Demir ya da ferrit nüve, hava nüveye göre endüktansı yüzlerce kat artırabilir."
      ],
      formula: "Uzun solenoid: L = µ₀ × N² × A ÷ ℓ\nµ₀ = 4π × 10⁻⁷ H/m · A = π × r² · ℓ: bobin uzunluğu",
      ul: [
        "Örnek: N = 100 sarım, çap 2 cm, uzunluk 5 cm, hava nüve. A = π × 0,01² = 0,000314 m².",
        "L = 4π × 10<sup>−7</sup> × 100² × 0,000314 ÷ 0,05 ≈ 79 µH (uzun solenoid formülü).",
        "Kısa bobinlerde uç etkileri nedeniyle gerçek değer daha düşüktür; Wheeler yaklaşımı aynı bobin için yaklaşık 67 µH verir."
      ],
      after: [
        "Sarım sayısı, çap ve uzunluğu girerek iki formülü yan yana görmek için [[arac:bobin-enduktans-hesapla|Bobin Endüktans Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Hoparlörlerdeki 4 ve 8 ohm ne demek?",
      p: [
        "Hoparlör etiketindeki 4 Ω ya da 8 Ω, <strong>nominal empedanstır</strong>. Hoparlör bobini bir telden sarıldığı için hem direnci hem endüktansı vardır; ayrıca konin hareketi mekanik bir rezonans yaratır. Sonuçta empedans frekansa göre dalgalanır: bas rezonansında nominal değerin birkaç katına çıkabilir, tizlerde bobin endüktansı yüzünden yükselir.",
        "Ölçü aletiyle bir hoparlörün uçlarını ölçtüğünüzde gördüğünüz değer DC direncidir ve nominal empedansın altında kalır; 8 Ω bir hoparlörde 6–7 Ω görmek normaldir. Bu ayrım, empedans ile direncin aynı şey olmadığını gösteren en somut günlük örnektir."
      ],
      ul: [
        "<strong>Amfi uyumu:</strong> Amfinin desteklediği en düşük empedansın altına inmeyin. 8 Ω için tasarlanmış bir çıkışa 4 Ω bağlamak çıkış katını ısıtabilir.",
        "<strong>Paralel bağlama:</strong> İki adet 8 Ω hoparlör paralel bağlanırsa toplam yaklaşık 4 Ω olur; seri bağlanırsa 16 Ω olur.",
        "<strong>Güç:</strong> Aynı gerilimde düşük empedanslı hoparlör daha fazla akım çeker ve daha fazla güç alır; P = V² ÷ Z bağıntısıyla tahmin edilebilir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>R ile X'i doğrudan toplamak:</strong> 100 Ω direnç ve 100 Ω reaktans 200 Ω değil, √(100² + 100²) ≈ 141,4 Ω empedans verir.",
        "<strong>Birimleri çevirmemek:</strong> mH, µF ve kHz değerlerini temel birime (H, F, Hz) çevirmeden formüle koymak sonucu binlerce kat saptırır.",
        "<strong>2π'yi unutmak:</strong> Açısal frekans ω = 2πf'dir. Formülde f yerine ω kullanıldığında 2π çarpanı ayrıca yazılmaz; ikisini karıştırmak 6,28 kat hata yaratır.",
        "<strong>DC ölçümü empedans sanmak:</strong> Multimetrenin ohm kademesi yalnızca DC direncini ölçer; AC empedans için frekans belirten LCR ölçer gerekir.",
        "<strong>Gerçek elemanları ideal saymak:</strong> Bobinin tel direnci, kondansatörün iç direnci (ESR) yüksek frekansta sonucu belirgin biçimde değiştirebilir."
      ]
    }
  ],
  faq: [
    ["Empedans nedir?", "Empedans, alternatif akım devresinin akıma gösterdiği toplam karşı koymadır. Direnç ile bobin ve kondansatörün reaktansını birlikte içerir, Z harfiyle gösterilir ve Z = √(R² + X²) formülüyle hesaplanır."],
    ["Reaktans ile direnç arasındaki fark nedir?", "Direnç enerjiyi ısıya çevirerek harcar ve frekanstan bağımsızdır. Reaktans ise enerjiyi depolayıp geri verir, frekansa bağlıdır ve akım ile gerilim arasında faz farkı oluşturur."],
    ["Kapasitif reaktans nasıl hesaplanır?", "Kapasitif reaktans X<sub>C</sub> = 1 ÷ (2πfC) formülüyle hesaplanır. 10 µF kondansatör 50 Hz'de 318,3 Ω, 1 kHz'de 15,9 Ω reaktans gösterir; frekans arttıkça değer düşer."],
    ["Endüktif reaktans frekansla nasıl değişir?", "Endüktif reaktans X<sub>L</sub> = 2πfL olduğundan frekansla doğru orantılı artar. 100 mH bobin 50 Hz'de 31,4 Ω, 1 kHz'de 628,3 Ω gösterir; frekans iki katına çıkınca reaktans da iki katına çıkar."],
    ["Bobinin endüktansı neye bağlıdır?", "Endüktans sarım sayısının karesine, bobinin kesit alanına, uzunluğuna ve nüve malzemesine bağlıdır. Sarım iki katına çıkarsa endüktans dört katına çıkar; ferrit ya da demir nüve değeri büyük ölçüde artırır."],
    ["LC devresinin rezonans frekansı nasıl bulunur?", "Rezonans frekansı f<sub>0</sub> = 1 ÷ (2π√(LC)) ile bulunur. 100 mH bobin ve 10 µF kondansatör için yaklaşık 159 Hz çıkar; bu frekansta iki reaktans birbirine eşittir ve seri devrede birbirini yok eder."],
    ["Hoparlörlerdeki 4 ve 8 ohm ne demek?", "Bu değerler hoparlörün nominal empedansıdır, yani belirli bir frekans bölgesindeki tipik empedansıdır. Gerçek empedans frekansla değişir; ölçü aletiyle ölçülen DC direnci ise genellikle nominal değerin biraz altındadır."],
    ["Empedans birimi nedir?", "Empedansın birimi ohm'dur ve Ω simgesiyle gösterilir. Direnç ve reaktans da ohm ile ölçüldüğü için üçü aynı birimde toplanabilir, ancak toplama vektörel olarak Pisagor bağıntısıyla yapılır."],
    ["Faz açısı eksi çıkarsa ne anlama gelir?", "Seri devrede faz açısının eksi çıkması kapasitif reaktansın endüktif reaktanstan büyük olduğunu, akımın gerilimden önde gittiğini gösterir. Artı faz açısı ise endüktif davranış ve akımın gerilimden geride olması demektir."]
  ],
  tools: ["empedans-hesapla", "kapasitif-reaktans-hesapla", "lc-rezonans-frekansi-hesapla", "bobin-enduktans-hesapla"],
  related: ["rc-zaman-sabiti-kondansator-sarj-suresi", "ohm-kanunu-nedir", "dalga-boyu-ve-frekans-iliskisi"],
  sources: [
    ["MEB – Mesleki ve Teknik Eğitim, Elektrik-Elektronik Teknolojisi modülleri", "https://megep.meb.gov.tr/"],
    ["BIPM – SI temel birimleri ve µ₀ değeri", "https://www.bipm.org/en/measurement-units"]
  ],
  uyari: "şebeke gerilimiyle çalışan devrelerde ölçüm ve değişiklik yapmadan önce yetkili bir elektrik-elektronik teknisyenine danışın"
};
