export default {
  slug: "basit-sarkac-periyodu-formulu",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Basit Sarkaç Periyodu Nasıl Hesaplanır? Formül ve Basit Harmonik Hareket",
  pageTitle: "Basit Sarkaç Periyodu Formülü: T = 2π√(L/g) ve Örnekler",
  description: "Basit sarkacın periyodu T = 2π√(L/g) ile bulunur; kütleye bağlı değildir. 1 m sarkaç ≈ 2,01 s. Yay sarkacı, g ölçme deneyi, Ay'daki sarkaç ve saat sarkacı.",
  keywords: ["sarkaç periyodu formülü", "basit sarkaç", "basit harmonik hareket", "yay sarkacı periyodu", "sarkaç uzunluğu", "yerçekimi ivmesi ölçme", "saat sarkacı", "sarkaç kütleye bağlı mı", "ay'da sarkaç"],
  lead: "Basit sarkacın periyodu, ip uzunluğu (L) ve yerçekimi ivmesine (g) bağlıdır: <strong>T = 2π × √(L ÷ g)</strong>. Kütle ve küçük açılarda salınım genliği periyodu etkilemez. Dünya'da 1 metrelik bir sarkacın periyodu yaklaşık <strong>2,01 saniyedir</strong>; ipi dört katına çıkarmak periyodu iki katına çıkarır. Bu sayfada formülün nereden geldiğini, basit harmonik hareketi, yay sarkacını, sarkaçla g'nin nasıl ölçüldüğünü, Ay'daki sarkacın neden yavaş salındığını ve duvar saatlerindeki kullanımı çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Basit sarkaç periyodu T = 2π√(L ÷ g) formülüyle bulunur; L metre, g m/s², T saniyedir.",
    "Periyot kütleye bağlı değildir; ağır ve hafif top aynı ipte aynı sürede salınır.",
    "Periyot uzunluğun kareköküyle artar: L iki katına çıkarsa T √2 ≈ 1,41 katına, dört katına çıkarsa iki katına çıkar.",
    "Formül küçük açılar için geçerlidir; 15°'de hata yaklaşık %0,4, 30°'de yaklaşık %1,7'dir.",
    "Yay sarkacının periyodu T = 2π√(m ÷ k)'dir; burada kütle etkilidir, yerçekimi değildir.",
    "Ay'da g ≈ 1,62 m/s² olduğu için 1 m'lik sarkacın periyodu yaklaşık 4,94 saniyeye çıkar."
  ],
  figure: {
    alt: "Solda 1 metrelik ipe bağlı sarkaç, iki uç konumu ve denge noktası; periyot 2,01 saniye. Sağda ip uzunluğuna göre periyot çubukları: 0,25 metre 1,00 saniye, 1 metre 2,01 saniye, 2 metre 2,84 saniye, 4 metre 4,01 saniye.",
    caption: "Periyot uzunluğun kareköküyle büyür: ipi dört katına çıkarmak (0,25 m'den 1 m'ye ya da 1 m'den 4 m'ye) periyodu iki katına çıkarır. Değerler g = 9,81 m/s² ile hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="170" y="30" class="lg b mid">L = 1 m sarkaç</text>
  <line x1="90" y1="56" x2="250" y2="56" class="st sw" fill="none"/>
  <line x1="170" y1="56" x2="170" y2="316" class="sb dash" fill="none"/>
  <line x1="170" y1="56" x2="102" y2="307" class="sb" fill="none"/>
  <line x1="170" y1="56" x2="238" y2="307" class="st sw" fill="none"/>
  <circle cx="102" cy="307" r="13" class="ps"/>
  <circle cx="238" cy="307" r="15" class="p"/>
  <circle cx="170" cy="316" r="5" class="mu"/>
  <path d="M170,116 A60,60 0 0,0 185.5,114" class="st" fill="none"/>
  <text x="190" y="128" class="sm">θ</text>
  <text x="212" y="190" class="b">L = 1 m</text>
  <path d="M110,345 Q170,372 230,345" class="sa sw" fill="none"/>
  <text x="170" y="390" class="sm mid t2">gidiş + dönüş = 1 periyot</text>
  <text x="40" y="250" class="sm b p">T ≈ 2,01 s</text>
  <line x1="350" y1="40" x2="350" y2="370" class="sb dash" fill="none"/>
  <text x="530" y="30" class="lg b mid">Uzunluk ve periyot</text>
  <g class="sm">
    <text x="440" y="86" class="end">0,25 m</text>
    <rect x="450" y="70" width="60" height="26" rx="4" class="ps"/><text x="518" y="89" class="b">1,00 s</text>
    <text x="440" y="146" class="end">1 m</text>
    <rect x="450" y="130" width="120" height="26" rx="4" class="p"/><text x="578" y="149" class="b">2,01 s</text>
    <text x="440" y="206" class="end">2 m</text>
    <rect x="450" y="190" width="170" height="26" rx="4" class="ps"/><text x="628" y="209" class="b">2,84 s</text>
    <text x="440" y="266" class="end">4 m</text>
    <rect x="450" y="250" width="240" height="26" rx="4" class="p"/><text x="682" y="244" class="b end">4,01 s</text>
  </g>
  <rect x="380" y="300" width="320" height="64" rx="8" class="sf sb"/>
  <text x="396" y="326" class="b">T = 2π × √(L ÷ g)</text>
  <text x="396" y="350" class="sm t2">Kütle formülde yok · Ay'da 1 m → 4,94 s</text>
</svg>`
  },
  sections: [
    {
      h: "Basit sarkaç nedir?",
      p: [
        "Basit sarkaç, kütlesi ihmal edilebilen ve uzamayan bir ipin ucuna asılmış küçük ve ağır bir cisimden oluşan ideal bir düzenektir. Cisim denge konumundan biraz yana çekilip bırakıldığında yerçekimi onu geri çeker; cisim dengeyi geçip öbür yana çıkar ve gidip gelme hareketi başlar.",
        "Bir tam gidiş-dönüş süresine <strong>periyot (T)</strong>, saniyedeki salınım sayısına <strong>frekans (f = 1 ÷ T)</strong> denir. Cismin denge konumundan en uzak noktaya olan uzaklığına <strong>genlik</strong> denir. Periyot, sarkacın en önemli özelliğidir ve şaşırtıcı biçimde yalnızca iki büyüklüğe bağlıdır: ip uzunluğu ve yerçekimi ivmesi.",
        "Konu 11. sınıf fizik programında basit harmonik hareket ünitesinde işlenir ve okul laboratuvarlarının en sık yapılan deneylerinden biridir."
      ]
    },
    {
      h: "Basit sarkacın periyodu nasıl hesaplanır?",
      p: [
        "Sarkaç yana çekildiğinde ağırlığın ipe dik bileşeni (m × g × sin θ) cismi dengeye doğru çeker. Küçük açılarda sin θ yaklaşık θ'ya eşittir ve geri çağırıcı kuvvet uzaklıkla orantılı olur. Bu, basit harmonik hareketin koşuludur ve çözümü aşağıdaki periyot formülünü verir."
      ],
      formula: "T = 2π × √(L ÷ g)\nf = 1 ÷ T · ω = 2π ÷ T = √(g ÷ L)\nUzunluk: L = g × T² ÷ (4π²) · İvme: g = 4π² × L ÷ T²",
      ol: [
        "<strong>1 m'lik sarkaç:</strong> T = 2π × √(1 ÷ 9,81) = 2π × 0,3193 ≈ 2,006 s. Frekansı yaklaşık 0,50 Hz'dir.",
        "<strong>25 cm'lik sarkaç:</strong> T = 2π × √(0,25 ÷ 9,81) ≈ 1,003 s. Uzunluk dörtte bire indi, periyot yarıya indi.",
        "<strong>Periyodu 2 s olan sarkaç:</strong> L = 9,81 × 4 ÷ (4π²) ≈ 0,994 m. Her yarım salınımı 1 saniye süren bu sarkaca \"saniye sarkacı\" denir.",
        "<strong>4 m'lik sarkaç:</strong> T ≈ 4,01 s; 1 m'lik sarkacın tam iki katı."
      ],
      after: [
        "İp uzunluğu ve g'den periyodu, periyottan uzunluğu ya da g'yi bulmak için [[arac:sarkac-periyodu-hesapla|Sarkaç Periyodu Hesaplama]] aracını kullanabilirsiniz; frekans ve açısal frekans da gösterilir."
      ]
    },
    {
      h: "Sarkaç periyodu kütleye bağlı mı? Uzunluk iki katına çıkarsa ne olur?",
      p: [
        "Hayır, basit sarkacın periyodu kütleye bağlı değildir. Ağır bir cisme daha büyük yerçekimi kuvveti etki eder, ama onu hızlandırmak için de daha fazla kuvvet gerekir. İki etki birbirini tam olarak dengeler; formülde kütle sadeleşir. Bu, serbest düşmede ağır ve hafif cisimlerin (hava direnci yoksa) aynı anda yere düşmesiyle aynı nedenden kaynaklanır; bkz. [[bilgi:serbest-dusme-formulu|serbest düşme formülü]].",
        "Uzunluk ise periyodu karekökle etkiler. Uzunluk iki katına çıkarsa periyot √2 ≈ 1,41 katına çıkar: 1 m'de 2,01 s olan periyot 2 m'de 2,84 s olur. Periyodu iki katına çıkarmak için uzunluğu dört katına çıkarmak gerekir."
      ],
      table: {
        head: ["Değişiklik", "Periyoda etkisi", "Örnek (1 m, 2,01 s'den)"],
        rows: [
          ["Kütleyi iki katına çıkarmak", "Değişmez", "2,01 s"],
          ["Uzunluğu iki katına çıkarmak", "√2 ≈ 1,41 katı", "2,84 s"],
          ["Uzunluğu dört katına çıkarmak", "2 katı", "4,01 s"],
          ["Genliği 5°'den 10°'ye çıkarmak", "Yaklaşık değişmez (%0,2)", "2,01 s"],
          ["g'yi altıda birine indirmek (Ay)", "√6 ≈ 2,45 katı", "4,94 s"]
        ],
        caption: "Küçük açı kabulüyle hesaplanmıştır; büyük açılarda periyot biraz uzar."
      }
    },
    {
      h: "Basit harmonik hareket nedir? Küçük açı kabulü",
      p: [
        "Basit harmonik hareket (BHH), geri çağırıcı kuvvetin denge konumundan uzaklıkla doğru orantılı ve ters yönlü olduğu salınım hareketidir: F = −k × x. Bu hareketin konumu zamana göre sinüs eğrisi çizer, periyodu genlikten bağımsızdır ve hız denge konumunda en büyük, uç noktalarda sıfırdır. İvme ise tersine uç noktalarda en büyük, denge konumunda sıfırdır.",
        "Sarkaç tam olarak BHH yapmaz, çünkü geri çağırıcı kuvvet açının kendisiyle değil sinüsüyle orantılıdır. Küçük açılarda bu fark ihmal edilebilir. Açı büyüdükçe gerçek periyot formülün verdiğinden uzun olur."
      ],
      table: {
        head: ["Başlangıç açısı", "Periyottaki artış (yaklaşık)"],
        rows: [
          ["5°", "%0,05"],
          ["10°", "%0,19"],
          ["15°", "%0,43"],
          ["30°", "%1,74"],
          ["60°", "%7,3"]
        ],
        caption: "Değerler tam periyot serisinden hesaplanmıştır. Okul deneylerinde 10–15°'nin altında kalmak yeterlidir."
      },
      after: [
        "Salınım boyunca enerji kinetik ve potansiyel biçimler arasında gidip gelir: uç noktada tamamen potansiyel, denge noktasında tamamen kinetiktir. Bu dönüşüm için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] makalesine göz atabilirsiniz."
      ]
    },
    {
      h: "Yay sarkacının periyodu nasıl bulunur?",
      p: [
        "Yaya asılmış bir kütle de basit harmonik hareket yapar. Burada geri çağırıcı kuvveti yay sağlar (Hooke yasası, F = k × x) ve periyot kütle ile yay sabitine bağlıdır. Basit sarkaçtan farklı olarak kütle etkilidir, yerçekimi ise periyodu değiştirmez; yalnızca denge konumunu aşağı kaydırır."
      ],
      formula: "T = 2π × √(m ÷ k)\nm: kütle (kg) · k: yay sabiti (N/m)",
      ul: [
        "m = 0,5 kg, k = 50 N/m: T = 2π × √(0,01) = 2π × 0,1 ≈ 0,628 s.",
        "Kütle dört katına (2 kg) çıkarılırsa T = 2π × √(0,04) ≈ 1,257 s; periyot iki katına çıkar.",
        "Aynı yay sarkacı Ay'da da 0,628 s periyotla salınır, çünkü formülde g yoktur."
      ],
      after: [
        "Yay sabitini kuvvet ve uzamadan bulmak, kütle girildiğinde salınım periyodunu görmek için [[arac:yay-sabiti-hesapla|Yay Sabiti Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sarkaçla yerçekimi ivmesi nasıl ölçülür? Deney adımları",
      p: [
        "Periyot formülü ters çevrildiğinde g = 4π² × L ÷ T² olur. Uzunluğu ve periyodu dikkatle ölçerseniz yerçekimi ivmesini birkaç binde bir hassasiyetle bulabilirsiniz. Bu deney, yüzyıllar boyunca farklı enlemlerde g'nin küçük farklarını ölçmek için kullanılmıştır."
      ],
      ol: [
        "Küçük ve ağır bir cismi (metal bilye) ince ve uzamayan bir ipe bağlayın. Uzunluğu asma noktasından cismin <strong>ağırlık merkezine</strong> kadar ölçün; örnek: L = 0,80 m.",
        "Cismi 10°'den az bir açıyla yana çekip bırakın; itmeyin.",
        "Tek salınım yerine 20 tam salınımın süresini ölçün; örnek: 35,9 s. Bu, kronometreyi başlatma ve durdurmadaki tepki hatasını 20'ye böler.",
        "Periyodu bulun: T = 35,9 ÷ 20 = 1,795 s.",
        "g'yi hesaplayın: g = 4π² × 0,80 ÷ 1,795² ≈ 9,80 m/s².",
        "Ölçümü farklı uzunluklarla tekrarlayın. T² değerlerini L'ye karşı çizdiğinizde bir doğru elde edersiniz; eğimi 4π² ÷ g'dir."
      ],
      after: [
        "En büyük hata kaynakları uzunluğun ipin ucuna kadar ölçülmesi, büyük açı ve az sayıda salınım saymaktır. Ölçüm sonuçlarının ortalamasını ve yayılımını değerlendirmek için [[bilgi:standart-sapma-nasil-hesaplanir|standart sapma]] makalesinden yararlanabilirsiniz."
      ]
    },
    {
      h: "Ay'da sarkaç daha mı yavaş salınır?",
      p: [
        "Evet. Ay'da yerçekimi ivmesi yaklaşık 1,62 m/s², yani Dünya'nınkinin yaklaşık altıda biridir. Periyot g'nin kareköküyle ters orantılı olduğu için aynı sarkaç Ay'da yaklaşık √6 ≈ 2,45 kat yavaş salınır. 1 metrelik sarkaç Dünya'da 2,01 s, Ay'da 2π × √(1 ÷ 1,62) ≈ 4,94 s'de bir tam salınım yapar.",
        "Mars'ta g ≈ 3,71 m/s² ile aynı sarkacın periyodu yaklaşık 3,26 s, Jüpiter'in bulut tepesi seviyesinde g ≈ 24,79 m/s² ile yaklaşık 1,26 s olurdu. Bu yüzden sarkaçlı bir saat başka bir gök cisminde yanlış zaman gösterir; yay sarkacıyla çalışan bir düzenek ise aynı süreyi korur.",
        "Farklı gezegenlerde ağırlığınızın nasıl değiştiğini görmek için [[arac:gezegen-agirligi-hesapla|Gezegen Ağırlığı Hesaplama]] aracı her gök cismi için g değerini kullanır; kütle ile ağırlığın farkı için [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Duvar saatlerinde sarkaç neden kullanılır?",
      p: [
        "Sarkacın periyodu genlikten neredeyse bağımsız olduğu için, salınım sönümlense bile her gidiş-dönüş yaklaşık aynı sürede tamamlanır. Bu düzenlilik, sarkacı mekanik saatler için ideal bir zaman ölçer yapar. Saatin mekanizması her salınımda sarkaca küçük bir itme vererek enerji kaybını karşılar ve dişlileri bir adım ilerletir.",
        "Saati ayarlamak için sarkacın altındaki ağırlık (mercimek) aşağı ya da yukarı kaydırılır. Ağırlığı aşağı indirmek etkin uzunluğu artırır, periyodu uzatır ve saati yavaşlatır; yukarı kaldırmak saati hızlandırır. Sıcaklık değişince metal çubuk uzayıp kısaldığı için hassas saatlerde ısıl genleşmeyi dengeleyen özel çubuklar kullanılmıştır.",
        "Saniye sarkacının uzunluğu yaklaşık 99,4 cm'dir; büyük boy duvar ve salon saatlerinin bu kadar uzun olmasının nedeni budur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yarım salınımı periyot saymak:</strong> Periyot bir uçtan öbür uca değil, gidip aynı noktaya geri dönme süresidir.",
        "<strong>Uzunluğu yanlış ölçmek:</strong> L asma noktasından cismin ağırlık merkezine kadardır; ipin uzunluğu tek başına yetmez.",
        "<strong>Santimetreyle hesaplamak:</strong> g = 9,81 m/s² kullanılıyorsa L metre olmalıdır; 80 cm = 0,80 m.",
        "<strong>Kütleyi formüle sokmak:</strong> Basit sarkaçta kütle yoktur; yay sarkacında ise vardır. İki formülü karıştırmayın.",
        "<strong>Büyük açıyla deney yapmak:</strong> 30°'de periyot yaklaşık %1,7 uzun çıkar ve g küçük bulunur."
      ]
    }
  ],
  faq: [
    ["Basit sarkacın periyodu nasıl hesaplanır?", "Basit sarkacın periyodu T = 2π × √(L ÷ g) formülüyle hesaplanır. Dünya'da g = 9,81 m/s² alınırsa 1 metrelik sarkacın periyodu yaklaşık 2,01 saniye, 25 santimetrelik sarkacınki yaklaşık 1,00 saniye çıkar."],
    ["Sarkaç periyodu kütleye bağlı mı?", "Hayır. Ağır cisme daha büyük yerçekimi kuvveti etki eder ama onu hızlandırmak için de daha fazla kuvvet gerekir; iki etki dengelendiği için kütle formülde sadeleşir ve aynı ipteki ağır ve hafif top aynı periyotla salınır."],
    ["Sarkaç uzunluğu iki katına çıkarsa periyot ne olur?", "Periyot uzunluğun kareköküyle orantılı olduğundan √2 ≈ 1,41 katına çıkar. 1 metrede 2,01 saniye olan periyot 2 metrede yaklaşık 2,84 saniye olur; periyodu iki katına çıkarmak için uzunluk dört katına çıkarılmalıdır."],
    ["Yay sarkacının periyodu nasıl bulunur?", "Yay sarkacının periyodu T = 2π × √(m ÷ k) formülüyle bulunur. 0,5 kg kütle ve 50 N/m yay sabitiyle periyot yaklaşık 0,628 saniyedir; burada kütle etkilidir, yerçekimi ivmesi ise periyodu değiştirmez."],
    ["Basit harmonik hareket nedir?", "Basit harmonik hareket, geri çağırıcı kuvvetin denge konumundan uzaklıkla doğru orantılı ve ters yönlü olduğu salınımdır. Periyodu genlikten bağımsızdır; yay sarkacı tam olarak, basit sarkaç ise yalnızca küçük açılarda bu harekete uyar."],
    ["Sarkaçla yerçekimi ivmesi nasıl ölçülür?", "İp uzunluğu ölçülür, 20 gibi çok sayıda salınımın süresi kronometreyle alınıp periyot bulunur ve g = 4π² × L ÷ T² formülü uygulanır. 0,80 m uzunluk ve 1,795 s periyotla g ≈ 9,80 m/s² bulunur."],
    ["Ay'da sarkaç daha mı yavaş salınır?", "Evet. Ay'da yerçekimi ivmesi yaklaşık 1,62 m/s² olduğundan periyot yaklaşık 2,45 kat uzar. Dünya'da 2,01 saniyede salınan 1 metrelik sarkaç Ay'da yaklaşık 4,94 saniyede bir tam salınım yapar."],
    ["Duvar saatlerinde sarkaç neden kullanılır?", "Sarkacın periyodu genlik azalsa bile neredeyse değişmediği için düzenli bir zaman ölçer görevi görür. Saat mekanizması her salınımda küçük bir itmeyle enerji kaybını karşılar; ağırlığı aşağı ya da yukarı kaydırmak saati yavaşlatır ya da hızlandırır."],
    ["Saniye sarkacı nedir?", "Saniye sarkacı, her yarım salınımı tam 1 saniye, yani periyodu 2 saniye olan sarkaçtır. Dünya'da g = 9,81 m/s² için uzunluğu yaklaşık 99,4 cm'dir; eski salon saatlerinin uzun gövdesi bundandır."]
  ],
  tools: ["sarkac-periyodu-hesapla", "yay-sabiti-hesapla", "gezegen-agirligi-hesapla"],
  related: ["merkezcil-kuvvet-ve-acisal-hiz", "serbest-dusme-formulu", "kinetik-ve-potansiyel-enerji"],
  sources: [
    ["MEB – Ortaöğretim Fizik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"],
    ["NASA – Gezegen bilgi sayfaları (yüzey çekim ivmeleri)", "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"]
  ]
};
