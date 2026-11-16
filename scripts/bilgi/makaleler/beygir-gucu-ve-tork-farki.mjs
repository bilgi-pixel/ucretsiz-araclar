export default {
  slug: "beygir-gucu-ve-tork-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Beygir Gücü ve Tork Farkı Nedir? HP, kW ve Nm Değerleri Nasıl Okunur",
  pageTitle: "Beygir Gücü ve Tork Farkı: HP, kW ve Nm Nasıl Okunur",
  description: "Tork motorun döndürme kuvvetidir (Nm), beygir gücü bu kuvvetin ne hızla iş yaptığıdır. P = T × n ÷ 9549 formülü, kW–PS çevirisi, lb-ft ve dizel tork farkı örneklerle.",
  keywords: ["beygir ve tork farkı", "tork nedir", "1 hp kaç kw", "nm ne demek", "yüksek tork ne işe yarar", "beygir gücü hesaplama", "ps hp farkı", "kw beygir çevirme"],
  lead: "Tork, motorun krank milini <strong>döndürme kuvvetidir</strong> ve newton metre (Nm) ile ölçülür; beygir gücü ise bu kuvvetin <strong>ne kadar hızlı iş yaptığını</strong> gösterir ve torkun devirle çarpılmasıyla bulunur: güç (kW) = tork (Nm) × devir (d/dk) ÷ 9.549. Kısacası tork aracın ne kadar güçlü \"ittiğini\", beygir ise bu itişi yüksek hızlarda ne kadar sürdürebildiğini anlatır. Bu sayfada iki kavramın farkını, ruhsattaki kW değerinin beygire çevrilmesini, PS ile HP ayrımını ve dizel motorların neden yüksek torklu olduğunu örneklerle bulacaksınız.",
  kisaCevap: [
    "Tork, bir mili döndürmeye çalışan kuvvetin kol uzunluğuyla çarpımıdır; birimi Nm'dir (1 metrelik kola 1 newtonluk kuvvet).",
    "Güç, torkun açısal hızla çarpımıdır: P (kW) = T (Nm) × n (d/dk) ÷ 9.549,3.",
    "1 metrik beygir (PS, BG) = 735,5 W; 1 mekanik beygir (hp) = 745,7 W; bu yüzden 1 kW = 1,36 PS = 1,34 hp eder.",
    "Ruhsattaki kW değerini 1,36 ile çarparak PS bulunur: 81 kW ≈ 110 PS.",
    "1 lb-ft = 1,356 Nm, 1 Nm = 0,738 lb-ft; 1 kgf·m = 9,807 Nm.",
    "Dizel motorlar uzun strok, yüksek sıkıştırma ve turbo sayesinde düşük devirde yüksek tork üretir ama daha düşük devirde biter."
  ],
  figure: {
    alt: "Bir motorun devir–tork ve devir–güç eğrileri: tork 1.750 ile 4.000 d/dk arasında 250 Nm'de düz seyrediyor, sonra 6.000 d/dk'da 200 Nm'ye iniyor; güç eğrisi devirle yükselerek 4.000 d/dk'da 104,7 kW'ye ve 6.000 d/dk'da 125,7 kW'ye ulaşıyor.",
    caption: "Örnek motor eğrisi. Tork düz kalırken güç devirle doğru orantılı artar; tork düşmeye başladıktan sonra bile güç bir süre yükselmeye devam eder. 4.000 d/dk noktasındaki hesap metindeki çözümlü örnekle aynıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Tork düz, güç devirle artar</text>
  <line x1="80" y1="340" x2="640" y2="340" class="st" fill="none"/>
  <line x1="80" y1="80" x2="80" y2="340" class="sp" fill="none"/>
  <line x1="640" y1="80" x2="640" y2="340" class="sok" fill="none"/>
  <g class="sb dash"><line x1="80" y1="253.3" x2="640" y2="253.3" fill="none"/><line x1="80" y1="166.7" x2="640" y2="166.7" fill="none"/><line x1="80" y1="80" x2="640" y2="80" fill="none"/></g>
  <g class="sm end p"><text x="72" y="344">0</text><text x="72" y="257">100</text><text x="72" y="171">200</text><text x="72" y="84">300</text></g>
  <g class="sm ok"><text x="648" y="344">0</text><text x="648" y="257">50</text><text x="648" y="171">100</text><text x="648" y="84">150</text></g>
  <g class="sm mid t2"><text x="80" y="360">1.000</text><text x="192" y="360">2.000</text><text x="304" y="360">3.000</text><text x="416" y="360">4.000</text><text x="528" y="360">5.000</text><text x="640" y="360">6.000</text></g>
  <text x="360" y="384" class="sm mid">Motor devri (d/dk)</text>
  <text x="20" y="64" class="sm b p">Tork (Nm)</text>
  <text x="700" y="64" class="sm b ok end">Güç (kW)</text>
  <polyline points="80,201.3 164,123.3 416,123.3 528,145 640,166.7" class="sp sw" fill="none"/>
  <polyline points="80,310.9 164,260.6 192,249.2 304,203.9 416,158.5 528,135.8 640,122.2" class="sok sw" fill="none"/>
  <circle cx="416" cy="123.3" r="6" class="p"/>
  <circle cx="416" cy="158.5" r="6" class="ok"/>
  <rect x="190" y="88" width="196" height="28" rx="6" class="ps"/>
  <text x="288" y="107" class="sm mid b">250 Nm sabit tork bandı</text>
  <rect x="420" y="190" width="214" height="64" rx="8" class="sf sb"/>
  <text x="432" y="212" class="sm b">4.000 d/dk'da</text>
  <text x="432" y="230" class="sm">250 × 4.000 ÷ 9.549 = 104,7 kW</text>
  <text x="432" y="248" class="sm">104,7 kW × 1,36 ≈ 142 PS</text>
  <text x="360" y="410" class="sm mid mu">Örnek değerlerle çizilmiştir; her motorun eğrisi farklıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Tork nedir?",
      p: [
        "Tork, bir cismi bir eksen etrafında döndürmeye çalışan etkidir. Somun sıkarken anahtarın ucuna uyguladığınız kuvvet ile anahtarın uzunluğunun çarpımı torktur: 0,5 metrelik bir anahtarın ucuna 100 newton (yaklaşık 10 kilogramlık ağırlık) uygularsanız 50 Nm tork üretirsiniz. Aynı kuvveti daha uzun anahtarla uygularsanız tork artar; uzun kollu anahtarın sıkışmış cıvatayı kolay açmasının nedeni budur.",
        "Motorda da durum aynıdır. Yanma, pistonu aşağı iter; biyel kolu bu doğrusal kuvveti krank milinde döndürme etkisine çevirir. Motorun ürettiği tork, aracın ne kadar güçlü hızlanacağını, yokuşu ne kadar rahat çıkacağını ve yük çekerken ne kadar zorlanacağını belirleyen temel değerdir. Katalogdaki \"250 Nm / 1.750–4.000 d/dk\" ifadesi, motorun bu devir aralığında krank milinde 250 Nm tork verdiğini söyler.",
        "Eski kaynaklarda ve bazı servis kitaplarında tork kgf·m (kilogram-kuvvet metre) ile verilir; 1 kgf·m = 9,807 Nm'dir. ABD kaynaklı belgelerde ise lb-ft (pound-feet) kullanılır; 1 lb-ft = 1,356 Nm eder."
      ]
    },
    {
      h: "Beygir gücü nedir?",
      p: [
        "Güç, birim zamanda yapılan iştir. Fiziksel birimi watt'tır (W); motorlarda kilowatt (kW) ya da beygir gücü kullanılır. Bir motorun güçlü olması için yalnızca büyük kuvvet üretmesi yetmez, bu kuvveti hızlı tekrarlaması gerekir. 250 Nm tork üreten bir motor bunu dakikada 2.000 devirde yapıyorsa 52 kW, 4.000 devirde yapıyorsa 105 kW güç verir.",
        "Beygir gücü, buhar makinesi döneminde makineleri atların çalışma kapasitesiyle karşılaştırmak için türetilmiş tarihî bir birimdir. Bugün iki farklı tanımı yaygındır ve bu, karışıklığın ana kaynağıdır."
      ],
      table: {
        head: ["Birim", "Kısaltma", "Watt karşılığı", "Nerede kullanılır"],
        rows: [
          ["Metrik beygir", "PS, BG, CV", "735,49875 W", "Türkiye ve Avrupa araç katalogları"],
          ["Mekanik beygir", "hp", "745,69987 W", "ABD ve İngiltere; bazı sanayi motorları"],
          ["Kilowatt", "kW", "1.000 W", "Ruhsat, tip onay belgesi, resmî kayıtlar"]
        ],
        caption: "Ülkemizde \"HP\" diye yazılan değerlerin çoğu aslında metrik beygirdir (PS). Aradaki fark yaklaşık %1,4'tür: 150 PS = 147,9 hp."
      }
    },
    {
      h: "Güç, tork ve devir arasındaki formül",
      p: [
        "Güç, tork ile açısal hızın çarpımıdır. Açısal hızı radyan/saniye yerine motorlarda kullanılan dakikadaki devir (d/dk) ile yazmak için 2π ÷ 60 katsayısı devreye girer. Sonuçta pratik formül şöyledir:"
      ],
      formula: "P (kW) = T (Nm) × n (d/dk) ÷ 9.549,3\nT (Nm) = P (kW) × 9.549,3 ÷ n (d/dk)\nP (PS) = T (Nm) × n (d/dk) ÷ 7.023,5\nP (hp) = T (lb-ft) × n (d/dk) ÷ 5.252",
      ol: [
        "<strong>Örnek 1 – güç bulma:</strong> Motor 4.000 d/dk'da 250 Nm veriyor. P = 250 × 4.000 ÷ 9.549,3 = 104,7 kW. Beygire çevirmek için 104,7 × 1,3596 = 142,4 PS.",
        "<strong>Örnek 2 – tork bulma:</strong> Katalog 110 kW gücün 5.500 d/dk'da elde edildiğini yazıyor. O devirdeki tork T = 110 × 9.549,3 ÷ 5.500 = 191,0 Nm'dir. Bu, motorun en yüksek torku değil, en yüksek güç noktasındaki torkudur.",
        "<strong>Örnek 3 – elektrik motoru:</strong> 1.450 d/dk'da 7,5 kW veren bir sanayi motorunun mil torku 7,5 × 9.549,3 ÷ 1.450 = 49,4 Nm'dir."
      ],
      after: [
        "Bu hesapları [[arac:motor-guc-tork-hesapla|Motor Güç Tork Devir Hesaplama]] aracıyla yapabilirsiniz: üç değerden ikisini girdiğinizde üçüncüsünü, beygir karşılığını ve kgf·m cinsinden torku birlikte verir. Formülün 9.549,3 sabiti, 60.000 ÷ 2π işleminden gelir; kW ile çalıştığınız sürece hep aynıdır."
      ]
    },
    {
      h: "Beygir gücü ile tork arasındaki fark: hangisi önemli?",
      p: [
        "İkisi aynı madalyonun iki yüzüdür ve biri olmadan diğeri anlam taşımaz. <strong>Tork</strong>, aracın o anda tekerleğe ne kadar itiş aktarabileceğini belirler; düşük devirdeki yüksek tork, trafikte gaza bastığınızda hemen tepki veren, vites küçültmeden yokuş çıkabilen bir araç demektir. <strong>Güç</strong> ise bu itişi yüksek devirlerde ne kadar sürdürebildiğinizi gösterir; son hızı, otoyolda sollama performansını ve uzun hızlanmaları güç belirler.",
        "Vites kutusu bu ikisinin arasında köprü kurar. Birinci viteste motor torku dişli oranıyla çarpılarak tekerleğe katlanmış hâlde iletilir. Örneğin 250 Nm motor torku, 3,8 birinci vites oranı ve 4,0 diferansiyel oranıyla, yaklaşık %90 aktarma verimi kabul edilirse tekerleklerde 250 × 3,8 × 4,0 × 0,9 = 3.420 Nm'lik toplam tork oluşturur. Yani yüksek güçlü bir motor, uygun vitesle düşük torklu görünse bile tekerlekte büyük itiş üretebilir."
      ],
      table: {
        head: ["Kullanım", "Belirleyici değer", "Neden"],
        rows: [
          ["Şehir içi, kalk-dur trafik", "Düşük devirdeki tork", "Vites değiştirmeden çabuk tepki"],
          ["Römork, karavan, yüklü yokuş", "Tork ve tork bandının genişliği", "Düşük hızda sürekli itiş"],
          ["Otoyol sollama", "Orta-yüksek devirdeki güç", "Yüksek hızda ivmeyi sürdürme"],
          ["Son hız", "En yüksek güç", "Hava direncini yenmek için gereken güç hızın küpüyle artar"],
          ["Yakıt ekonomisi", "Geniş ve alçak tork bandı", "Motor düşük devirde verimli çalışır"]
        ]
      }
    },
    {
      h: "Ruhsattaki kW değeri beygire nasıl çevrilir?",
      p: [
        "Araç tescil belgesinde (ruhsatta) motor gücü uluslararası birim olan kilowatt ile yazılır. Bunu satış ilanlarında kullanılan beygir değerine çevirmek için kW değerini 1,35962 ile çarparsınız. Mekanik beygir (hp) isteniyorsa çarpan 1,34102'dir."
      ],
      table: {
        head: ["Ruhsattaki güç", "Metrik beygir (PS)", "Mekanik beygir (hp)"],
        rows: [
          ["55 kW", "74,8 PS", "73,8 hp"],
          ["66 kW", "89,7 PS", "88,5 hp"],
          ["81 kW", "110,1 PS", "108,6 hp"],
          ["96 kW", "130,5 PS", "128,7 hp"],
          ["110 kW", "149,6 PS", "147,5 hp"],
          ["150 kW", "203,9 PS", "201,2 hp"]
        ],
        caption: "Üreticiler beygir değerini genellikle yuvarlayarak yazar: 81 kW'lik motor katalogda \"110 BG\" olarak geçer."
      },
      after: [
        "Tek tek hesaplamak yerine [[arac:beygir-kw-cevir|Beygir Gücü Kilovat Çevirici]] ile iki yönde de çeviri yapabilir, PS ile hp ayrımını yan yana görebilirsiniz. Pompa, jeneratör ya da el aleti gibi watt ile etiketlenmiş cihazlar için [[arac:watt-beygir-cevir|Watt Beygir Gücü Çevirici]] daha pratiktir. Güç, akım ve gerilim ilişkisini elektrik tarafından merak ediyorsanız [[bilgi:watt-amper-volt-iliskisi|watt, amper, volt ilişkisi]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Nm ile lb-ft nasıl çevrilir?",
      p: [
        "Yurt dışı kaynaklı katalog, servis kılavuzu ve tork anahtarlarında lb-ft (pound-feet, bazen ft-lb) birimine sık rastlanır. Çeviri sabit bir çarpanla yapılır: 1 lb-ft = 1,35582 Nm, ters yönde 1 Nm = 0,73756 lb-ft'tir. Küçük bağlantı elemanlarında lb-in (pound-inç) de kullanılır; 1 lb-in = 0,113 Nm'dir."
      ],
      ul: [
        "300 lb-ft × 1,35582 = 406,7 Nm.",
        "250 Nm × 0,73756 = 184,4 lb-ft.",
        "Jant bijonu için 110 Nm sıkma değeri = 81,1 lb-ft = 11,2 kgf·m.",
        "Buji için 25 Nm = 18,4 lb-ft = 221 lb-in."
      ],
      after: [
        "Cıvata sıkma değerlerinde birim karışıklığı ciddi sonuçlar doğurur: Nm yerine lb-ft değerini kullanmak yaklaşık %36 fazla sıkma demektir ve diş sıyırabilir ya da parçayı çatlatabilir. Çeviri için [[arac:nm-lbft-cevir|Newton Metre lb-ft Tork Çevirici]] N·m, lb-ft, kgf·m ve lb-in arasında tek adımda dönüşüm yapar. Her zaman aracın ya da parçanın kendi servis değerini esas alın."
      ]
    },
    {
      h: "Dizel araçlarda tork neden yüksektir?",
      p: [
        "Aynı hacimdeki dizel ve benzinli motorları karşılaştırdığınızda dizelin torku genellikle belirgin biçimde yüksek, en yüksek devri ve gücü ise daha düşüktür. Bunun birkaç teknik nedeni vardır. Dizel motorlar daha yüksek sıkıştırma oranıyla (yaklaşık 15:1–20:1, benzinlide 10:1–13:1) çalışır; yanma basıncı yüksektir. Strokları genellikle uzundur, bu da krank kolunu uzatıp aynı basınçtan daha fazla tork elde ettirir. Günümüz dizellerinin neredeyse tamamı turbo beslemelidir ve turbo düşük devirden itibaren silindire bol hava basar.",
        "Buna karşılık ağır hareketli parçalar ve yavaş yanma, dizel motorun yüksek devirlere çıkmasını sınırlar. Formülü hatırlayın: güç = tork × devir. 1,6 litrelik örnek bir dizel 1.750 d/dk'da 300 Nm verip 4.000 d/dk'da 85 kW'de kalabilirken, aynı hacimde atmosferik bir benzinli 4.500 d/dk'da 160 Nm verip 6.000 d/dk'da 90 kW'ye ulaşabilir. Kâğıt üzerinde güçleri yakın olsa da sürüş hissi tamamen farklıdır; dizel ara hızlanmalarda daha kolay, benzinli ise devir çevirdikçe daha canlıdır. Bu değerler karşılaştırma için verilmiş örnek rakamlardır."
      ]
    },
    {
      h: "Araç karşılaştırırken sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca en yüksek değere bakmak:</strong> 300 Nm'nin dar bir devir aralığında mı yoksa 1.500–4.500 d/dk gibi geniş bir bantta mı verildiği, günlük kullanımda tepe değerden daha önemlidir.",
        "<strong>PS ile hp'yi karıştırmak:</strong> Farklı ülke kataloglarını karşılaştırırken %1,4'lük farkı hesaba katın ya da her iki değeri de kW'ye çevirin.",
        "<strong>Ağırlığı unutmak:</strong> 1.600 kg'lık araçta 150 PS ile 1.200 kg'lık araçta 110 PS benzer güç/ağırlık oranı verir (yaklaşık 10,7 ve 10,9 kg/PS).",
        "<strong>Motor ile tekerlek gücünü eşitlemek:</strong> Katalog değerleri motor milinde ölçülür; dinamometrede tekerlekte ölçülen güç, aktarma kayıpları nedeniyle %10–20 daha düşük çıkar.",
        "<strong>Motor hacmini güçle aynı saymak:</strong> Turbo sayesinde küçük hacimli motorlar büyük atmosferik motorlardan daha fazla tork üretebilir; bu ilişkiyi [[bilgi:motor-hacmi-cc-nedir-nasil-hesaplanir|motor hacmi yazısında]] bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Tork nedir?", "Tork, bir mili ya da cismi eksen etrafında döndürmeye çalışan etkidir ve kuvvetin kol uzunluğuyla çarpımıyla bulunur. Birimi newton metredir (Nm). Motorlarda tork, aracın hızlanma ve yük çekme kabiliyetini belirleyen temel değerdir."],
    ["Beygir gücü ile tork arasındaki fark nedir?", "Tork motorun döndürme kuvvetini, beygir gücü ise bu kuvvetin ne kadar hızlı iş yaptığını gösterir. Güç, torkun devirle çarpılmasıyla bulunur. Tork düşük hızdaki itişi, güç ise yüksek hızlarda performansı ve son hızı belirler."],
    ["1 beygir kaç kW eder?", "1 metrik beygir (PS) 0,7355 kW, 1 mekanik beygir (hp) 0,7457 kW eder. Ters yönde 1 kW, 1,36 PS ya da 1,34 hp'dir. Türkiye'deki araç kataloglarında kullanılan beygir genellikle metrik beygirdir."],
    ["Ruhsattaki kW değeri nasıl beygire çevrilir?", "Ruhsatta yazan kW değerini 1,36 ile çarparak metrik beygir (PS) bulunur. Örneğin 81 kW, 110,1 PS eder. Mekanik beygir istiyorsanız 1,341 ile çarpmanız gerekir; 81 kW bu durumda 108,6 hp olur."],
    ["Nm ile lb-ft nasıl çevrilir?", "1 lb-ft 1,35582 Nm'ye eşittir; lb-ft değerini 1,356 ile çarparak Nm bulunur. Ters yönde Nm değerini 0,7376 ile çarpmanız gerekir. Örneğin 250 Nm yaklaşık 184,4 lb-ft eder."],
    ["Dizel araçlarda tork neden yüksektir?", "Dizel motorlar yüksek sıkıştırma oranıyla çalışır, genellikle uzun stroklu ve turbo beslemelidir. Bu özellikler düşük devirde yüksek yanma basıncı ve büyük döndürme kuvveti sağlar. Buna karşılık en yüksek devirleri daha düşük kaldığı için güçleri sınırlı kalabilir."],
    ["Güç, tork ve devir arasındaki formül nedir?", "Güç (kW) = tork (Nm) × devir (d/dk) ÷ 9.549,3 formülüyle bulunur. Metrik beygir için bölen 7.023,5, lb-ft ve hp kullanılıyorsa 5.252'dir. Bu formülle üç değerden ikisi bilindiğinde üçüncüsü hesaplanabilir."],
    ["PS ile HP aynı şey mi?", "Aynı değildir ama birbirine çok yakındır. PS (metrik beygir) 735,5 watt, hp (mekanik beygir) 745,7 watt'tır; aradaki fark yaklaşık yüzde 1,4'tür. Türkiye'de HP diye yazılan değerler çoğunlukla aslında PS'dir."],
    ["Yüksek tork ne işe yarar?", "Yüksek tork, özellikle düşük devirlerde aracın gaz pedalına hızlı tepki vermesini, yüklüyken ya da yokuşta vites küçültmeden ilerlemesini ve römork çekebilmesini sağlar. Tork bandı genişse motor düşük devirde rahat çalışır ve yakıt ekonomisi de iyileşebilir."]
  ],
  tools: ["motor-guc-tork-hesapla", "beygir-kw-cevir", "nm-lbft-cevir", "watt-beygir-cevir"],
  related: ["watt-amper-volt-iliskisi", "kinetik-ve-potansiyel-enerji", "100-km-de-kac-litre-yakit-hesaplama"],
  sources: [
    ["BIPM – SI birimleri: watt ve newton metre", "https://www.bipm.org/en/measurement-units"],
    ["NIST – Birim dönüşüm katsayıları (SP 811)", "https://www.nist.gov/pml/special-publication-811"]
  ]
};
