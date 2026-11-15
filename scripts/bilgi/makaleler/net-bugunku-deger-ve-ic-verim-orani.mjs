export default {
  slug: "net-bugunku-deger-ve-ic-verim-orani",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Net Bugünkü Değer ve İç Verim Oranı Nedir? NBD ve İVO Hesaplama",
  pageTitle: "Net Bugünkü Değer (NBD) ve İç Verim Oranı (İVO) Hesaplama",
  description: "NBD, gelecekteki nakit akışlarının bugüne indirgenmiş toplamından yatırımın çıkarılmasıdır; İVO, NBD'yi sıfır yapan orandır. Formül, örnek, Excel ve karar kuralı.",
  keywords: ["net bugünkü değer nedir", "nbd hesaplama", "iç verim oranı nedir", "irr hesaplama", "npv formülü", "yatırım değerlendirme yöntemleri", "iskonto oranı nasıl seçilir", "excel npv irr"],
  lead: "Net bugünkü değer (NBD, NPV), bir yatırımın gelecekte sağlayacağı nakit akışlarının <strong>seçilen iskonto oranıyla bugüne indirgenip toplanması ve ilk yatırım tutarının çıkarılmasıyla</strong> bulunur; sonuç pozitifse yatırım, beklenen getirinin üzerinde değer yaratır. İç verim oranı (İVO, IRR) ise NBD'yi tam sıfır yapan iskonto oranıdır ve yatırımın kendi getiri oranını gösterir. Bu sayfada iki yöntemin formüllerini, adım adım çözümlü bir örneği, iskonto oranının nasıl seçileceğini, geri ödeme süresini, Excel'de hesaplamayı ve iki yöntem farklı sonuç verdiğinde hangisine bakılacağını bulacaksınız.",
  kisaCevap: [
    "NBD = Σ [nakit akışı<sub>t</sub> ÷ (1 + r)<sup>t</sup>] − ilk yatırım; r iskonto oranı, t yıl sayısıdır.",
    "NBD > 0 ise yatırım, iskonto oranı kadar getiriyi karşılayıp üzerine değer katar; NBD < 0 ise beklenen getiriyi sağlamaz.",
    "İç verim oranı, NBD'yi sıfır yapan orandır; genellikle deneme-yanılma ya da hesap aracıyla bulunur.",
    "Örnek: 100.000 TL yatırım ve 4 yıl boyunca 30, 35, 40, 45 bin TL akışla %15 iskontoda NBD ≈ 4.582 TL, İVO ≈ %17,1'dir.",
    "İskonto oranı, paranın alternatif getirisi ile yatırımın riskini yansıtır; yüksek enflasyon dönemlerinde nominal ve reel oranlar karıştırılmamalıdır.",
    "İki yöntem farklı proje öneriyorsa karar için genellikle NBD esas alınır."
  ],
  figure: {
    alt: "Örnek yatırımın net bugünkü değerinin iskonto oranına göre değişimini gösteren eğri: yüzde 0'da 50.000 TL, yüzde 15'te 4.582 TL, yüzde 17,1'de sıfır (iç verim oranı) ve daha yüksek oranlarda negatif.",
    caption: "Eğri, aynı nakit akışlarının farklı iskonto oranlarıyla bugünkü değerini gösterir. Oran yükseldikçe NBD düşer; eğrinin sıfır çizgisini kestiği nokta iç verim oranıdır. %15 gibi İVO'nun altındaki her oran pozitif NBD verir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">NBD profili: iskonto oranı arttıkça NBD düşer</text>
  <line x1="60" y1="60" x2="60" y2="370" class="st" fill="none"/>
  <line x1="60" y1="270" x2="680" y2="270" class="st sw" fill="none"/>
  <g class="sm end">
    <text x="54" y="74">50.000</text><text x="54" y="174">25.000</text><text x="54" y="274">0</text><text x="54" y="374">−25.000</text>
  </g>
  <line x1="60" y1="170" x2="680" y2="170" class="sb dash" fill="none"/>
  <line x1="60" y1="370" x2="680" y2="370" class="sb dash" fill="none"/>
  <g class="sm mid">
    <text x="60" y="292">%0</text><text x="160" y="292">%5</text><text x="260" y="292">%10</text><text x="360" y="292">%15</text>
    <text x="460" y="292">%20</text><text x="560" y="292">%25</text><text x="660" y="292">%30</text>
  </g>
  <polyline points="60,70 110,108 160,142 210,174 260,202 310,228 360,252 410,273 460,293 510,312 560,329 610,344 660,359" class="sp sw" fill="none"/>
  <circle cx="360" cy="252" r="7" class="ok"/>
  <text x="360" y="232" class="sm b mid ok">%15 → NBD 4.582 TL</text>
  <circle cx="402" cy="270" r="7" class="dg"/>
  <text x="430" y="252" class="sm b dg">İVO ≈ %17,1 (NBD = 0)</text>
  <rect x="420" y="70" width="270" height="130" rx="10" class="sf sb"/>
  <text x="436" y="96" class="b">Nakit akışları (TL)</text>
  <text x="436" y="120" class="sm">0. yıl: −100.000</text>
  <text x="436" y="142" class="sm">1. yıl: 30.000 · 2. yıl: 35.000</text>
  <text x="436" y="164" class="sm">3. yıl: 40.000 · 4. yıl: 45.000</text>
  <text x="436" y="188" class="sm t2">İskontosuz toplam: +50.000</text>
  <text x="360" y="404" class="sm mid">İskonto oranı (yıllık)</text>
</svg>`
  },
  sections: [
    {
      h: "Paranın zaman değeri: neden indirgeme yapılır?",
      p: [
        "Bugün elinizdeki 100.000 TL, beş yıl sonra alacağınız 100.000 TL'den daha değerlidir. Çünkü bugünkü parayı faize yatırarak, başka bir işe yatırarak ya da borç kapatarak kullanabilirsiniz; ayrıca enflasyon ve belirsizlik gelecekteki paranın değerini azaltır. Bu ilkeye <strong>paranın zaman değeri</strong> denir.",
        "Yatırım kararlarında farklı yıllarda gelen nakit akışlarını karşılaştırabilmek için hepsini aynı zamana, bugüne taşımak gerekir. Bu işleme <strong>indirgeme</strong> (iskonto) denir ve bileşik faizin tersidir. Gelecekteki bir tutarı bugüne çevirmek için (1 + r)<sup>t</sup> ile bölersiniz. Bileşik faizin mantığını [[bilgi:bilesik-faiz-nedir|bileşik faiz nedir]] yazımız, tek bir tutarın bugünkü değerini hesaplamayı [[arac:bugunku-deger-hesapla|bugünkü değer hesaplama aracı]] gösterir."
      ],
      formula: "Bugünkü değer (BD) = gelecekteki tutar ÷ (1 + r)^t\nÖrnek: 2 yıl sonra alınacak 35.000 TL, %15 iskontoyla 35.000 ÷ 1,15² ≈ 26.465 TL eder."
    },
    {
      h: "Net bugünkü değer nedir, nasıl hesaplanır?",
      p: [
        "Net bugünkü değer, bir yatırımın tüm nakit girişlerinin bugünkü değerleri toplamından ilk yatırım tutarının (ve varsa diğer çıkışların bugünkü değerinin) çıkarılmasıdır. Seçtiğiniz iskonto oranı, yatırımdan beklediğiniz asgari getiridir; NBD bu getiriyi sağladıktan sonra yatırımın size ne kadar ek değer bıraktığını TL olarak söyler."
      ],
      formula: "NBD = −I₀ + NA₁ ÷ (1 + r)¹ + NA₂ ÷ (1 + r)² + … + NAₙ ÷ (1 + r)ⁿ\nI₀: ilk yatırım · NAₜ: t. yılın net nakit akışı · r: iskonto oranı",
      table: {
        head: ["NBD sonucu", "Anlamı", "Karar"],
        rows: [
          ["NBD > 0", "Yatırım, iskonto oranı kadar getiriyi sağlayıp üzerine değer katar", "Kabul edilebilir"],
          ["NBD = 0", "Yatırım tam olarak beklenen getiriyi sağlar", "Kayıtsız"],
          ["NBD < 0", "Yatırım beklenen getirinin altında kalır", "Reddedilir ya da yeniden değerlendirilir"]
        ]
      }
    },
    {
      h: "Adım adım çözümlü örnek",
      p: [
        "Bir işletme 100.000 TL'lik bir makine almayı düşünüyor. Makinenin dört yıl boyunca yıl sonlarında sırasıyla 30.000, 35.000, 40.000 ve 45.000 TL net nakit girişi sağlaması bekleniyor. İşletmenin bu tür yatırımlardan beklediği getiri, örnek olarak yıllık %15 olsun."
      ],
      table: {
        head: ["Yıl", "Nakit akışı (TL)", "İndirgeme çarpanı (1,15^t)", "Bugünkü değer (TL)", "Kümülatif BD (TL)"],
        rows: [
          ["0", "−100.000", "1,0000", "−100.000", "−100.000"],
          ["1", "30.000", "1,1500", "26.087", "−73.913"],
          ["2", "35.000", "1,3225", "26.465", "−47.448"],
          ["3", "40.000", "1,5209", "26.301", "−21.147"],
          ["4", "45.000", "1,7490", "25.729", "4.582"]
        ],
        caption: "Son satırdaki kümülatif değer net bugünkü değerdir: yaklaşık 4.582 TL."
      },
      after: [
        "NBD pozitif olduğu için yatırım, %15 beklenen getiriyi karşılayıp bugünkü para cinsinden yaklaşık 4.582 TL ek değer yaratır. İndirgeme yapılmasaydı toplam kazanç 50.000 TL görünecekti; aradaki fark paranın zaman değeridir.",
        "Kârlılık endeksi de bu tablodan çıkar: girişlerin bugünkü değeri toplamı 104.582 TL, ilk yatırım 100.000 TL olduğundan endeks 104.582 ÷ 100.000 ≈ 1,05'tir. Endeksin 1'in üzerinde olması pozitif NBD ile aynı anlamı taşır. Bu hesabı kendi rakamlarınızla [[arac:net-bugunku-deger-hesapla|net bugünkü değer hesaplama aracı]]nda yapabilirsiniz."
      ]
    },
    {
      h: "İç verim oranı (İVO, IRR) nedir?",
      p: [
        "İç verim oranı, bir yatırımın NBD'sini sıfıra eşitleyen iskonto oranıdır. Başka bir deyişle, yatırımın nakit akışlarının kendi içinde ürettiği yıllık getiri oranıdır. İVO, işletmenin beklediği getiriden (iskonto oranından) yüksekse yatırım kabul edilebilir; düşükse yatırım beklentiyi karşılamaz."
      ],
      formula: "0 = −I₀ + Σ NAₜ ÷ (1 + İVO)^t\nKarar: İVO > beklenen getiri → kabul · İVO < beklenen getiri → ret",
      after: [
        "Bu denklem genellikle doğrudan çözülemez; oran deneme yanılmayla daraltılarak bulunur. Örnekte %15'te NBD +4.582, %20'de −5.845 TL çıkar. Sıfır noktası bu ikisinin arasındadır; denemeleri sürdürdüğünüzde İVO'nun yaklaşık %17,1 olduğunu görürsünüz. Doğrusal ara değer tahmini de yakın bir sonuç verir: 15 + 5 × 4.582 ÷ (4.582 + 5.845) ≈ %17,2.",
        "[[arac:ic-verim-orani-hesapla|İç verim oranı hesaplama aracı]] bu aramayı otomatik yapar; dönem aylıksa yıllık bileşik karşılığını da gösterir ve nakit akışları birden fazla kez işaret değiştiriyorsa birden çok İVO olabileceği konusunda uyarır."
      ]
    },
    {
      h: "İskonto oranı nasıl seçilir?",
      p: [
        "İskonto oranı, NBD hesabının en kritik ve en tartışmalı girdisidir. Oran ne kadar yüksek seçilirse gelecekteki nakit akışları o kadar küçülür ve aynı proje daha az cazip görünür. Oran genellikle şu bileşenler düşünülerek belirlenir:"
      ],
      ul: [
        "<strong>Alternatif getiri:</strong> Aynı parayı benzer riskli başka bir yere yatırsaydınız elde edeceğiniz getiri. Risksiz bir alternatif olarak devlet tahvili ya da mevduat faizi başlangıç noktası olabilir.",
        "<strong>Sermaye maliyeti:</strong> Yatırım kredi ile finanse ediliyorsa kredi faizi, öz kaynakla finanse ediliyorsa ortakların beklediği getiri; ikisinin ağırlıklı ortalaması sık kullanılır.",
        "<strong>Risk primi:</strong> Belirsizliği yüksek, yeni bir pazara giren ya da teknolojik riski olan projeler için orana ek pay eklenir.",
        "<strong>Enflasyon:</strong> Nakit akışlarını gelecekteki fiyatlarla (nominal) tahmin ediyorsanız nominal oran, bugünkü fiyatlarla (reel) tahmin ediyorsanız reel oran kullanın. İkisini karıştırmak, özellikle yüksek enflasyon dönemlerinde sonucu tamamen bozar."
      ],
      after: [
        "Tek bir orana güvenmek yerine birkaç farklı oranla hesap yapıp NBD'nin nasıl değiştiğine bakmak (duyarlılık analizi) daha sağlıklıdır. Enflasyonun paranın değerine etkisini [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]] yazımız anlatır."
      ]
    },
    {
      h: "Geri ödeme süresi yöntemi nedir?",
      p: [
        "Geri ödeme süresi, yatırımın ilk tutarının nakit girişleriyle kaç yılda geri kazanıldığını gösterir. Hesaplaması kolay ve sezgisel olduğu için KOBİ'lerde sık kullanılır; ancak geri ödemeden sonraki nakit akışlarını hiç dikkate almaz."
      ],
      ol: [
        "<strong>Basit geri ödeme:</strong> Kümülatif nakit akışları 30.000, 65.000 ve 105.000 TL'dir. 100.000 TL'ye 2. yıldan sonra 35.000 TL kalır; 3. yılın 40.000 TL'lik akışının 35.000 ÷ 40.000 = 0,875'i gerekir. Süre yaklaşık 2,9 yıl, yani 2 yıl 10,5 aydır.",
        "<strong>İskontolu geri ödeme:</strong> Tablodaki bugünkü değerlerle 3. yıl sonunda 21.147 TL eksik kalır; 4. yılın 25.729 TL'lik bugünkü değerinin 21.147 ÷ 25.729 ≈ 0,82'si gerekir. Süre yaklaşık 3,8 yıldır."
      ],
      after: [
        "İskontolu geri ödeme süresi, paranın zaman değerini hesaba kattığı için her zaman basit geri ödeme süresinden uzundur. İki yöntemi birlikte [[arac:geri-odeme-suresi-hesapla|geri ödeme süresi hesaplama aracı]]yla görebilirsiniz."
      ]
    },
    {
      h: "Excel'de NPV ve IRR nasıl hesaplanır?",
      p: [
        "Elektronik tablolarda NBD için NPV (Türkçe sürümde NBD), İVO için IRR (Türkçe sürümde İÇ_VERİM_ORANI) işlevleri bulunur. Nakit akışlarını alt alta yazdığınızı varsayalım: B1 hücresinde −100.000, B2–B5 hücrelerinde 30.000, 35.000, 40.000 ve 45.000."
      ],
      ul: [
        "<strong>NBD:</strong> =NPV(0,15; B2:B5) + B1. NPV işlevi ilk değeri birinci dönemin sonunda kabul eder; bu yüzden bugün yapılan ilk yatırım işlevin dışında, ayrıca eklenir.",
        "<strong>İVO:</strong> =IRR(B1:B5). Bu işlevde ilk yatırım aralığın içinde yer alır, çünkü işlev NBD'yi sıfır yapan oranı arar.",
        "<strong>Düzensiz tarihler:</strong> Nakit akışları eşit aralıklı değilse tarihleri de dikkate alan XNPV ve XIRR işlevleri kullanılır.",
        "<strong>Ondalık ayırıcı:</strong> Türkçe bölge ayarlarında işlev bağımsız değişkenleri noktalı virgülle, ondalıklar virgülle yazılır."
      ],
      after: [
        "En sık yapılan hata, ilk yatırımı NPV işlevinin aralığına dahil etmektir. Bu durumda tüm akışlar bir dönem fazla indirgenir ve NBD olduğundan düşük çıkar."
      ]
    },
    {
      h: "NBD ile İVO farklı sonuç verirse hangisine bakılır?",
      p: [
        "Tek bir projeyi kabul ya da ret için iki yöntem genellikle aynı sonucu verir. Ancak birbirini dışlayan iki proje arasında seçim yaparken çelişebilirler. Örnek olarak 100.000 TL'lik iki projeyi düşünelim: A projesi dört yılda 60.000, 40.000, 20.000 ve 10.000 TL; B projesi ise ilk üç yıl hiçbir şey, dördüncü yıl 170.000 TL getiriyor."
      ],
      table: {
        head: ["Proje", "İVO", "NBD (%5 iskonto)", "NBD (%15 iskonto)"],
        rows: [
          ["A (erken nakit)", "≈ %15,9", "≈ 18.928 TL", "≈ 1.288 TL"],
          ["B (geç nakit)", "≈ %14,2", "≈ 39.859 TL", "≈ −2.802 TL"]
        ]
      },
      after: [
        "İVO'ya bakıldığında A daha cazip görünür. Ancak beklenen getiri %5 ise B'nin NBD'si iki kattan fazladır; yani işletmeye bugünkü para cinsinden daha çok değer katar. Beklenen getiri %15 olduğunda ise B negatife düşer ve A öne geçer. Bu çelişkinin nedeni, İVO'nun ara nakit akışlarının yine İVO oranında yeniden yatırılabileceğini varsaymasıdır; NBD ise iskonto oranında yeniden yatırım varsayar ve bu genellikle daha gerçekçidir.",
        "Bu nedenle finans literatüründe birbirini dışlayan projeler arasında seçimde NBD esas alınır, İVO ise getiriyi oran olarak anlatmak ve kontrol amacıyla kullanılır. Nakit akışları birden fazla kez işaret değiştiren projelerde (örneğin ortada büyük bir yenileme yatırımı olan) birden çok İVO çıkabileceği için NBD'ye güvenmek daha da önemlidir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Nominal akışları reel oranla indirgemek:</strong> Enflasyonlu akışlar enflasyonsuz oranla indirgenirse NBD olduğundan çok yüksek çıkar.",
        "<strong>Excel NPV işlevine ilk yatırımı dahil etmek:</strong> Tüm akışlar bir yıl fazla indirgenir.",
        "<strong>Batık maliyetleri hesaba katmak:</strong> Karar öncesinde zaten harcanmış ve geri alınamayacak tutarlar nakit akışına eklenmez.",
        "<strong>Vergi ve işletme sermayesini unutmak:</strong> Nakit akışları vergi sonrası olmalı; stok ve alacak artışı gibi işletme sermayesi ihtiyaçları da düşülmelidir.",
        "<strong>Tek senaryoya güvenmek:</strong> İyimser, temel ve kötümser senaryolarla hesap yapmak riski görünür kılar."
      ]
    }
  ],
  faq: [
    ["Net bugünkü değer nedir?", "Net bugünkü değer, bir yatırımın gelecekteki nakit akışlarının seçilen iskonto oranıyla bugüne indirgenmiş toplamından ilk yatırım tutarının çıkarılmasıyla bulunan değerdir. Yatırımın beklenen getiriyi sağladıktan sonra ne kadar ek değer yarattığını gösterir."],
    ["NBD nasıl hesaplanır?", "Her yılın nakit akışını (1 + iskonto oranı) üzeri yıl sayısına bölerek bugünkü değerini bulursunuz. Bu değerleri toplayıp ilk yatırımı çıkardığınızda NBD elde edilir; elektronik tablolarda NPV işleviyle de hesaplanabilir."],
    ["İç verim oranı (IRR) nedir?", "İç verim oranı, bir yatırımın net bugünkü değerini sıfır yapan iskonto oranıdır ve yatırımın kendi yıllık getiri oranını gösterir. İşletmenin beklediği getiriden yüksekse yatırım genellikle kabul edilebilir bulunur."],
    ["NBD pozitifse ne anlama gelir?", "Pozitif NBD, yatırımın iskonto oranı olarak belirlediğiniz asgari getiriyi sağladığını ve bunun üzerine bugünkü para cinsinden ek değer yarattığını gösterir. Negatif NBD ise beklenen getirinin karşılanmadığı anlamına gelir."],
    ["İskonto oranı nasıl seçilir?", "İskonto oranı; paranın alternatif getirisi, yatırımın finansman maliyeti ve projenin riskine göre belirlenir. Nakit akışları enflasyonlu fiyatlarla tahmin edildiyse nominal, bugünkü fiyatlarla tahmin edildiyse reel oran kullanılmalıdır."],
    ["Geri ödeme süresi yöntemi nedir?", "Geri ödeme süresi, ilk yatırımın nakit girişleriyle kaç yılda geri kazanıldığını gösterir. Basit yöntem paranın zaman değerini dikkate almaz; iskontolu yöntem ise indirgenmiş akışları kullandığı için daha uzun bir süre verir."],
    ["Excel'de NPV ve IRR nasıl hesaplanır?", "NBD için NPV işlevine oran ve birinci yıldan itibaren akışlar verilir, ilk yatırım işlevin dışında eklenir. İVO için IRR işlevine ilk yatırım dahil tüm akışlar verilir. Türkçe sürümde işlev adları NBD ve İÇ_VERİM_ORANI'dır."],
    ["NBD ile İVO farklı sonuç verirse hangisine bakılır?", "Birbirini dışlayan projeler arasında seçim yaparken genellikle NBD esas alınır, çünkü işletmeye kazandırılan değeri TL olarak gösterir ve daha gerçekçi bir yeniden yatırım varsayımına dayanır. İVO kontrol amaçlı kullanılır."],
    ["Kârlılık endeksi nedir?", "Kârlılık endeksi, nakit girişlerinin bugünkü değerleri toplamının ilk yatırıma bölünmesiyle bulunur. Endeksin 1'in üzerinde olması pozitif NBD ile aynı anlamı taşır ve sınırlı bütçeyi projeler arasında paylaştırırken kullanışlıdır."]
  ],
  tools: ["net-bugunku-deger-hesapla", "ic-verim-orani-hesapla", "bugunku-deger-hesapla", "geri-odeme-suresi-hesapla"],
  related: ["bilesik-faiz-nedir", "enflasyona-gore-paranin-degeri", "amortisman-nasil-hesaplanir"],
  sources: [
    ["T.C. Merkez Bankası – Faiz ve enflasyon istatistikleri", "https://www.tcmb.gov.tr/"],
    ["KOSGEB", "https://www.kosgeb.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir; önemli kararlar için mali müşavirinize ya da bir finans uzmanına danışın"
};
