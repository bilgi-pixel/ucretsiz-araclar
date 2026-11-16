export default {
  slug: "yuzey-alani-silindir-kure-kup",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Silindir, Küre ve Küpün Yüzey Alanı Nasıl Hesaplanır? Formüller ve Örnekler",
  pageTitle: "Yüzey Alanı Formülleri: Silindir, Küre, Küp ve Prizma",
  description: "Silindir yüzey alanı 2πr(r + h), küre 4πr², küp 6a², dikdörtgenler prizması 2(ab + ac + bc). Açınım, konserve kutusu örneği ve hacim farkı.",
  keywords: ["silindir yüzey alanı", "küre yüzey alanı", "küpün yüzey alanı", "prizma yüzey alanı", "açınım nedir", "yüzey alanı formülleri", "dikdörtgenler prizması hacmi", "yanal alan"],
  lead: "Bir cismin yüzey alanı, dış yüzeyini kaplayan tüm yüzlerin alanları toplamıdır. Silindirde toplam yüzey alanı <strong>2πr² + 2πrh = 2πr(r + h)</strong>, kürede <strong>4πr²</strong>, küpte <strong>6a²</strong>, dikdörtgenler prizmasında <strong>2(ab + ac + bc)</strong> formülüyle bulunur. Yarıçapı 4 cm, yüksekliği 10 cm olan bir silindirin yüzey alanı yaklaşık 351,86 cm²'dir. Bu sayfada açınım mantığıyla formüllerin nereden geldiğini, çözümlü örnekleri, konserve kutusu için gereken sac hesabını ve hacimle farkını anlatıyoruz.",
  kisaCevap: [
    "Silindir: yanal alan 2πrh, iki taban 2πr², toplam 2πr(r + h).",
    "Küre: yüzey alanı 4πr², hacim (4/3)πr³; r = 5 cm için alan ≈ 314,16 cm².",
    "Küp: yüzey alanı 6a², hacim a³; a = 3 cm için 54 cm² ve 27 cm³.",
    "Dikdörtgenler prizması: yüzey alanı 2(ab + ac + bc), hacim a × b × c.",
    "Kenar uzunlukları 2 katına çıkarsa yüzey alanı 4, hacim 8 katına çıkar.",
    "Yüzey alanı birim karedir (cm², m²); hacim birim küptür (cm³, m³, litre)."
  ],
  figure: {
    alt: "Silindirin açınımı: iki daire taban ve genişliği 2πr, yüksekliği h olan dikdörtgen yan yüzey; r = 4 cm, h = 10 cm için 100,53 + 251,33 = 351,86 cm². Yanında küre ve küp formülleri.",
    caption: "Silindir açıldığında iki daire ve bir dikdörtgen çıkar. Dikdörtgenin uzun kenarı, tabanın çevresi olan 2πr'dir; tüm parçaların alanı toplanınca yüzey alanı bulunur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Silindirin açınımı (r = 4 cm, h = 10 cm)</text>
  <circle cx="230" cy="92" r="40" class="ps"/><line x1="230" y1="92" x2="270" y2="92" class="sp" fill="none"/>
  <text x="250" y="86" class="sm mid">r</text>
  <rect x="60" y="138" width="340" height="120" class="oks"/>
  <text x="230" y="192" class="b mid">yan yüzey</text>
  <text x="230" y="216" class="sm mid">2πr × h = 251,33 cm²</text>
  <text x="230" y="276" class="sm mid">genişlik 2πr = 25,13 cm</text>
  <text x="418" y="202" class="sm">h = 10</text>
  <circle cx="230" cy="306" r="40" class="ps"/>
  <text x="230" y="311" class="sm mid">πr²</text>
  <rect x="60" y="360" width="340" height="44" rx="8" class="p"/>
  <text x="230" y="388" class="b mid sf">Toplam 2πr² + 2πrh = 351,86 cm²</text>
  <rect x="480" y="58" width="210" height="104" rx="10" class="sf sb"/>
  <circle cx="530" cy="110" r="30" class="ps"/>
  <text x="630" y="96" class="b mid">Küre</text>
  <text x="630" y="120" class="mid">4πr²</text>
  <text x="630" y="144" class="sm mid">r=5 → 314,16 cm²</text>
  <rect x="480" y="176" width="210" height="104" rx="10" class="sf sb"/>
  <rect x="504" y="200" width="54" height="54" class="ps"/>
  <text x="630" y="214" class="b mid">Küp</text>
  <text x="630" y="238" class="mid">6a²</text>
  <text x="630" y="262" class="sm mid">a=3 → 54 cm²</text>
  <rect x="480" y="294" width="210" height="110" rx="10" class="sf sb"/>
  <text x="585" y="320" class="b mid">Ölçek kuralı</text>
  <text x="585" y="346" class="mid">kenar × 2</text>
  <text x="585" y="370" class="sm mid">alan × 4 · hacim × 8</text>
  <text x="585" y="392" class="sm mid t2">(k kat → k² ve k³)</text>
</svg>`
  },
  sections: [
    {
      h: "Yüzey alanı nedir, açınım ne işe yarar?",
      p: [
        "Yüzey alanı, üç boyutlu bir cismin dışını tamamen kaplamak için gereken düzlem malzemenin alanıdır. Bir kutuyu ambalaj kâğıdıyla sarmak, bir silindir depoyu boyamak ya da bir topu deri parçalarla kaplamak için bilmeniz gereken değer budur. Birimi her zaman kare birimdir: cm², m², mm².",
        "<strong>Açınım</strong>, cismi kenarlarından kesip düz bir zemine yayınca ortaya çıkan iki boyutlu şekildir. Küpün açınımı altı eş kare, dikdörtgenler prizmasının açınımı üç çift dikdörtgen, silindirin açınımı iki daire ve bir dikdörtgendir. Açınım sayesinde yüzey alanı, tanıdık düzlem şekillerin alanlarının toplamına dönüşür. Ortaokulda bu yüzden formül ezberlemek yerine açınım çizmek önerilir.",
        "Kürenin ise kesilip düzleme kusursuz biçimde açılabilen bir açınımı yoktur; haritaların dünyayı neden hep biraz bozarak gösterdiği de buradan gelir. Kürenin formülü bu yüzden açınımla değil, başka yollarla (Arşimet'in silindir karşılaştırması ya da integral) elde edilir."
      ]
    },
    {
      h: "Silindirin yüzey alanı nasıl hesaplanır?",
      p: [
        "Silindir iki eş daire taban ve bunları birleştiren kavisli bir yan yüzeyden oluşur. Yan yüzeyi dikey bir çizgi boyunca kesip açarsanız bir dikdörtgen elde edersiniz. Bu dikdörtgenin yüksekliği silindirin yüksekliği h, genişliği ise taban dairesinin çevresi 2πr'dir."
      ],
      formula: "Taban alanı = πr² (iki taban: 2πr²)\nYanal alan = 2πr × h\nToplam yüzey alanı = 2πr² + 2πrh = 2πr(r + h)\nÜstü açık silindir (bardak, kova) = πr² + 2πrh",
      ol: [
        "Yarıçapı 4 cm, yüksekliği 10 cm olan kapalı bir silindir alalım.",
        "İki taban: 2 × π × 4² = 32π ≈ 100,53 cm².",
        "Yanal alan: 2 × π × 4 × 10 = 80π ≈ 251,33 cm².",
        "Toplam: 112π ≈ <strong>351,86 cm²</strong>. Kısa yoldan 2π × 4 × (4 + 10) = 112π ile aynı sonuç çıkar."
      ],
      after: [
        "Soruda çap verilmişse önce ikiye bölmeyi unutmayın; çapı yarıçap yerine kullanmak taban alanını dört kat büyük bulur. Kapalı, üstü açık ya da yalnızca yan yüzey seçenekleri için [[arac:silindir-yuzey-alani-hesapla|Silindir Yüzey Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kürenin yüzey alanı formülü nedir?",
      p: [
        "Kürenin yüzey alanı <strong>4πr²</strong>'dir; yani aynı yarıçaplı dairenin alanının tam dört katı. Arşimet bunu, küreyi tam saran silindirin yan yüzeyiyle karşılaştırarak bulmuştur: yarıçapı r, yüksekliği 2r olan silindirin yanal alanı 2πr × 2r = 4πr² eder ve kürenin yüzeyine eşittir."
      ],
      formula: "Küre yüzey alanı = 4πr²\nKüre hacmi = (4/3)πr³\nYarım kürenin kavisli yüzeyi = 2πr² (düz tabanla toplam 3πr²)",
      after: [
        "Örnek: Yarıçapı 5 cm olan bir top için yüzey alanı 4 × π × 25 = 100π ≈ <strong>314,16 cm²</strong>, hacmi (4/3) × π × 125 ≈ 523,60 cm³'tür. Kapalı yarım küre biçimli bir kubbe için taban dairesi de eklenince 3 × π × 25 ≈ 235,62 cm² bulunur.",
        "Çevreden yola çıkmak da mümkündür: büyük daire çevresi C ise r = C ÷ 2π'dir. [[arac:kure-yuzey-alani-hesapla|Küre Yüzey Alanı Hesaplama]] aracı yarıçap, çap ya da çevreyle çalışır ve hacmi de birlikte verir."
      ]
    },
    {
      h: "Küp ve dikdörtgenler prizmasının yüzey alanı",
      p: [
        "Küpün altı yüzü de kenar uzunluğu a olan eş karelerdir; yüzey alanı 6a², hacmi a³'tür. Kenarı 3 cm olan bir küpün yüzey alanı 6 × 9 = 54 cm², hacmi 27 cm³'tür. Küpün tüm kenarları eşit olduğundan yanal alan (dört yan yüz) 4a² = 36 cm²'dir.",
        "Dikdörtgenler prizmasında karşılıklı yüzler eştir ve üç farklı dikdörtgen çifti vardır. En a, boy b, yükseklik c ise yüzey alanı 2(ab + ac + bc) olur. 5 cm × 4 cm × 3 cm boyutlarında bir kutu için 2 × (20 + 15 + 12) = 94 cm² ambalaj gerekir; hacmi 5 × 4 × 3 = 60 cm³'tür."
      ],
      table: {
        head: ["Cisim", "Yüzey alanı", "Hacim", "Örnek"],
        rows: [
          ["Küp (kenar a)", "6a²", "a³", "a = 3 → 54 cm², 27 cm³"],
          ["Dikdörtgenler prizması (a, b, c)", "2(ab + ac + bc)", "abc", "5×4×3 → 94 cm², 60 cm³"],
          ["Silindir (r, h)", "2πr(r + h)", "πr²h", "r=4, h=10 → 351,86 cm², 502,65 cm³"],
          ["Küre (r)", "4πr²", "(4/3)πr³", "r = 5 → 314,16 cm², 523,60 cm³"],
          ["Koni (r, ana doğru l)", "πr² + πrl", "(1/3)πr²h", "Koni ve piramit ayrı yazıda"]
        ],
        caption: "π yerine 3 ya da 3,14 alınmasını isteyen sınav sorularında sonucu sorunun istediği yaklaşımla hesaplayın."
      },
      after: [
        "Küp için köşegen ve litre karşılığıyla birlikte hesap yapmak isterseniz [[arac:kup-hacmi-hesapla|Küp Hacmi Hesaplama]], kutu ve oda gibi dikdörtgenler prizmaları için [[arac:prizma-hacmi-hesapla|Prizma Hacmi Hesaplama]] aracı yüzey alanını da gösterir. Koni ve piramit için [[bilgi:koni-ve-piramit-hacmi-nasil-hesaplanir|koni ve piramit yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Konserve kutusu için ne kadar sac gerekir?",
      p: [
        "Günlük hayattan bir örnek: çapı 7,4 cm, yüksekliği 11 cm olan bir konserve kutusu üreteceğiz. Kapak ve taban dahil kaç cm² sac gerekir? Yarıçap 3,7 cm'dir."
      ],
      ol: [
        "İki taban: 2 × π × 3,7² ≈ 86,02 cm².",
        "Yan yüzey: 2 × π × 3,7 × 11 ≈ 255,73 cm².",
        "Toplam: ≈ <strong>341,74 cm²</strong>. Bu, yaklaşık 18,5 cm × 18,5 cm'lik bir kare saca denk gelir.",
        "Gerçek üretimde katlama payı, birleşim dikişi ve kesim firesi eklenir; daireler kare sactan kesildiği için köşelerde artık kalır. Malzeme planlarken hesaplanan değerin üzerine pay bırakılır.",
        "Kutunun hacmi π × 3,7² × 11 ≈ 473,09 cm³, yani yaklaşık 473 ml'dir."
      ],
      after: [
        "Aynı hacmi en az sacla elde etmek isteyen bir üretici için matematik ilginç bir cevap verir: kapalı silindirde yüzey alanı, yükseklik çapa eşit olduğunda (h = 2r) en küçüktür. Pratikte kutular istiflenme, tutuş ve etiket alanı gibi nedenlerle bu orandan saparak tasarlanır."
      ]
    },
    {
      h: "Yüzey alanı ile hacim arasındaki fark ve ölçek kuralı",
      p: [
        "Yüzey alanı cismin <strong>dışını</strong>, hacim ise <strong>içini</strong> ölçer. Boya, kaplama, ambalaj ve ısı kaybı yüzey alanıyla; su, beton, toprak ve depolama kapasitesi hacimle ilgilidir. İkisinin birimleri farklıdır ve birbirine doğrudan çevrilemez.",
        "Bir cismin tüm uzunlukları k katına çıkarsa yüzey alanı k², hacmi k³ katına çıkar. Kenarı 3 cm olan küpün kenarını 6 cm yaparsanız yüzey alanı 54'ten 216 cm²'ye (4 kat), hacmi 27'den 216 cm³'e (8 kat) yükselir. Bu yüzden büyük cisimlerde hacmin yüzeye oranı artar: büyük hayvanlar ısıyı daha yavaş kaybeder, büyük buz kalıpları daha geç erir, toz hâlindeki maddeler ise geniş yüzeyleri sayesinde daha hızlı tepkimeye girer."
      ],
      table: {
        head: ["Kenar (küp)", "Yüzey alanı", "Hacim", "Yüzey ÷ hacim"],
        rows: [
          ["1 cm", "6 cm²", "1 cm³", "6"],
          ["2 cm", "24 cm²", "8 cm³", "3"],
          ["3 cm", "54 cm²", "27 cm³", "2"],
          ["6 cm", "216 cm²", "216 cm³", "1"],
          ["10 cm", "600 cm²", "1.000 cm³", "0,6"]
        ]
      },
      after: [
        "Hacim formüllerinin tamamını bir arada görmek isterseniz [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri yazısı]] düzlem ve uzay şekillerini tek sayfada toplar. Dairenin alanı ve çevresi gibi temel bilgiler için [[bilgi:daire-dilimi-ve-yay-uzunlugu|daire dilimi yazısına]] göz atabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Çapı yarıçap sanmak:</strong> Formüllerde r yarıçaptır; çap verilmişse ikiye bölün.",
        "<strong>Tabanları unutmak:</strong> Soruda \"kapalı\" mı \"üstü açık\" mı olduğu belirtilir; bardak ve kova tek tabanlıdır.",
        "<strong>Birimleri karıştırmak:</strong> Bir ölçü metre, diğeri santimetre ise önce aynı birime çevirin. 1 m² = 10.000 cm²'dir, 100 değil.",
        "<strong>Yüzey alanı ile hacmi karıştırmak:</strong> Boyanacak alan cm² ya da m², içine konacak su cm³ ya da litredir.",
        "<strong>π yaklaşımını değiştirmek:</strong> Soruda π = 3 alınması isteniyorsa 3,14 kullanmak cevap şıkkını kaçırmanıza neden olabilir."
      ]
    },
    {
      h: "Araçlarla yüzey alanı hesaplama",
      ol: [
        "Cismin türünü belirleyin: silindir, küre, küp ya da dikdörtgenler prizması.",
        "Ölçülerinizi aynı birimde girin; çap ya da çevre biliyorsanız ilgili seçeneği kullanın.",
        "Araç toplam yüzey alanını, gerekiyorsa yanal alanı ve hacmi gösterir; m² karşılığını da verir.",
        "Boya ya da kaplama planlıyorsanız sonuca fire payı ekleyin; ürün etiketindeki m² başına sarfiyatla çarpın."
      ],
      after: [
        "Örneğin çapı 2 m, yüksekliği 3 m olan üstü açık silindir bir su deposunun dış yüzeyini boyayacaksanız yan yüzey 2π × 1 × 3 ≈ 18,85 m², taban π × 1² ≈ 3,14 m² eder; toplam yaklaşık 22 m²'lik alan için boyanın kutu üzerindeki sarfiyat değerine bakarak miktarı bulursunuz.",
        "Tüm hesaplar tarayıcınızda yapılır; girdiğiniz ölçüler hiçbir yere gönderilmez."
      ]
    }
  ],
  faq: [
    ["Silindirin yüzey alanı nasıl hesaplanır?", "Silindirin yüzey alanı iki taban dairesi ile yan yüzeyin toplamıdır: 2πr² + 2πrh, kısaca 2πr(r + h). Yarıçap 4 cm ve yükseklik 10 cm için sonuç 112π, yani yaklaşık 351,86 cm² olur."],
    ["Kürenin yüzey alanı formülü nedir?", "Kürenin yüzey alanı 4πr² formülüyle bulunur, yani aynı yarıçaplı dairenin alanının dört katıdır. Yarıçapı 5 cm olan bir topun yüzey alanı 100π, yaklaşık 314,16 cm²'dir."],
    ["Küpün yüzey alanı ve hacmi nasıl bulunur?", "Küpün altı eş kare yüzü olduğu için yüzey alanı 6a², hacmi a³'tür. Kenarı 3 cm olan küpün yüzey alanı 54 cm², hacmi 27 cm³ olur."],
    ["Dikdörtgenler prizmasının yüzey alanı nedir?", "Dikdörtgenler prizmasının yüzey alanı 2(ab + ac + bc) formülüyle bulunur; a, b ve c en, boy ve yüksekliktir. 5, 4 ve 3 cm'lik bir kutu için 94 cm² eder, hacmi 60 cm³'tür."],
    ["Açınım nedir, yüzey alanını nasıl gösterir?", "Açınım, cismin kenarlarından kesilip düzleme yayılmış hâlidir. Silindirin açınımı iki daire ve bir dikdörtgendir; bu parçaların alanları toplanınca cismin yüzey alanı elde edilir."],
    ["Konserve kutusu için ne kadar sac gerekir?", "Kapalı silindir formülü kullanılır. Çapı 7,4 cm ve yüksekliği 11 cm olan kutu için yaklaşık 341,74 cm² sac gerekir; gerçek üretimde katlama payı ve kesim firesi bu değerin üzerine eklenir."],
    ["Yüzey alanı ile hacim arasındaki fark nedir?", "Yüzey alanı cismin dış yüzeyini kare birimle, hacim ise içini kaplayan boşluğu küp birimle ölçer. Boya ve ambalaj yüzey alanına, su ve depolama kapasitesi hacme bağlıdır."],
    ["Kenar iki katına çıkarsa yüzey alanı kaç kat artar?", "Tüm uzunluklar iki katına çıkarsa yüzey alanı dört katına, hacim sekiz katına çıkar. Genel kural, uzunluk k katına çıkınca alanın k kare, hacmin k küp katına çıkmasıdır."],
    ["Üstü açık silindirin yüzey alanı nasıl hesaplanır?", "Üstü açık silindirde yalnızca bir taban vardır, bu yüzden yüzey alanı πr² + 2πrh olur. Bardak, kova ve saksı gibi kaplarda boya ya da kaplama hesabında bu formül kullanılır."]
  ],
  tools: ["silindir-yuzey-alani-hesapla", "kure-yuzey-alani-hesapla", "kup-hacmi-hesapla", "prizma-hacmi-hesapla"],
  related: ["alan-ve-hacim-formulleri", "koni-ve-piramit-hacmi-nasil-hesaplanir", "daire-dilimi-ve-yay-uzunlugu"],
  sources: [
    ["MEB – Matematik Dersi Öğretim Programı (Ortaokul ve Lise)", "https://mufredat.meb.gov.tr/"]
  ]
};
