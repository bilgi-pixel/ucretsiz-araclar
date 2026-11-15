export default {
  slug: "bilesik-faiz-nedir",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Bileşik Faiz Nedir, Nasıl Hesaplanır? Basit Faizle Farkı ve Örnekler",
  pageTitle: "Bileşik Faiz Nedir? Formül, 72 Kuralı ve Örnek Hesaplar",
  description: "Bileşik faiz, faizin anaparaya eklenip sonraki dönemde onun da faiz kazanmasıdır: A = P × (1 + r/n)^(n·t). Basit faizle farkı, 72 kuralı, efektif faiz ve örnekler.",
  keywords: ["bileşik faiz hesaplama", "bileşik faiz formülü", "basit faiz bileşik faiz farkı", "72 kuralı", "faizin faizi", "paranın ikiye katlanma süresi", "efektif faiz", "düzenli birikim bileşik faiz"],
  lead: "Bileşik faiz, her dönem kazanılan faizin anaparaya eklendiği ve bir sonraki dönemde bu büyümüş tutarın tamamının faiz kazandığı hesaplama yöntemidir; halk arasında \"faizin faizi\" denir. Formülü <strong>A = P × (1 + r/n)<sup>n·t</sup></strong>'dir: P anapara, r yıllık nominal oran, n yıl içindeki bileşik dönem sayısı, t yıl sayısıdır. Basit faizde faiz yalnızca ilk anaparaya işler; bu yüzden süre uzadıkça iki yöntem arasındaki fark katlanarak büyür. Bu sayfada formülü, 72 kuralını, efektif faizi ve düzenli birikimi örnek oranlarla açıklıyoruz.",
  kisaCevap: [
    "Bileşik faiz formülü: A = P × (1 + r/n)^(n·t); faiz tutarı = A − P.",
    "Basit faiz formülü: A = P × (1 + r × t); faiz her dönem yalnızca ilk anaparaya işler.",
    "100.000 TL, yıllık %40 ile 5 yılda basit faizde 300.000 TL, yıllık bileşik faizde 537.824 TL olur.",
    "72 kuralı: paranın ikiye katlanma süresi ≈ 72 ÷ yıllık yüzde oran; düşük oranlarda iyi, yüksek oranlarda kaba tahmindir.",
    "Efektif yıllık faiz = (1 + r/n)^n − 1; yıllık nominal %40 aylık bileşikle efektif %48,21 eder.",
    "Düzenli birikimin gelecekteki değeri = aylık tutar × ((1 + i)^n − 1) ÷ i formülüyle bulunur."
  ],
  figure: {
    alt: "Basit ve bileşik faiz karşılaştırması: 100.000 TL yıllık yüzde 40 ile; 1. yıl ikisi de 140.000 TL, 3. yıl basit 220.000 bileşik 274.400, 5. yıl basit 300.000 bileşik 537.824 TL.",
    caption: "Aynı anapara ve aynı oran, farklı yöntem. Basit faizde her yıl sabit 40.000 TL eklenir; bileşik faizde eklenen tutar her yıl büyür. 5. yılın sonunda aradaki fark 237.824 TL'dir. Oran örnektir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">100.000 TL, yıllık %40 (örnek oran)</text>
  <line x1="60" y1="340" x2="700" y2="340" class="sb" fill="none"/>
  <g class="sm mid">
    <rect x="80" y="296" width="44" height="44" class="ps"/><rect x="128" y="296" width="44" height="44" class="p"/>
    <rect x="205" y="284" width="44" height="56" class="ps"/><rect x="253" y="278" width="44" height="62" class="p"/>
    <rect x="330" y="272" width="44" height="68" class="ps"/><rect x="378" y="255" width="44" height="85" class="p"/>
    <rect x="455" y="260" width="44" height="80" class="ps"/><rect x="503" y="221" width="44" height="119" class="p"/>
    <rect x="580" y="248" width="44" height="92" class="ps"/><rect x="628" y="174" width="44" height="166" class="p"/>
    <text x="126" y="360">1. yıl</text><text x="251" y="360">2. yıl</text><text x="376" y="360">3. yıl</text><text x="501" y="360">4. yıl</text><text x="626" y="360">5. yıl</text>
    <text x="602" y="240" class="b">300.000</text><text x="650" y="166" class="b p">537.824</text>
    <text x="352" y="264" class="b">220.000</text><text x="400" y="247" class="b p">274.400</text>
    <text x="126" y="288" class="b">140.000</text>
  </g>
  <rect x="60" y="70" width="14" height="14" class="ps"/><text x="82" y="82" class="sm">Basit faiz: P × (1 + r × t)</text>
  <rect x="60" y="94" width="14" height="14" class="p"/><text x="82" y="106" class="sm">Bileşik faiz: P × (1 + r)ᵗ</text>
  <rect x="380" y="62" width="320" height="90" rx="10" class="sf sb"/>
  <text x="396" y="88" class="b">5 yıl sonunda fark</text>
  <text x="396" y="114">537.824 − 300.000 = <tspan class="b ok">237.824 TL</tspan></text>
  <text x="396" y="138" class="sm t2">Bu tutarın tamamı \"faizin faizi\"dir</text>
  <rect x="20" y="378" width="680" height="32" rx="6" class="sf sb"/>
  <text x="360" y="399" class="sm mid">Aylık bileşik olsaydı 5 yıl sonunda yaklaşık 715.198 TL olurdu</text>
</svg>`
  },
  sections: [
    {
      h: "Bileşik faiz nedir?",
      p: [
        "Bir miktar parayı faizle değerlendirdiğinizde, dönem sonunda kazandığınız faizi çekmeyip anaparaya eklerseniz, bir sonraki dönem faiz artık daha büyük bir tutar üzerinden hesaplanır. Bu döngü her dönem tekrarlandığında paranız doğrusal değil, üstel olarak büyür. Bu yönteme <strong>bileşik faiz</strong>, eklenen faizin kazandığı ek faize de <strong>faizin faizi</strong> denir.",
        "Bileşik faiz yalnızca bankacılıkla ilgili bir kavram değildir. Kredi kartı borcunun büyümesi, enflasyonun yıllar içinde fiyatları katlaması, nüfus artışı ve bir yatırım fonunun uzun vadeli getirisi aynı matematikle çalışır. Bu yüzden lise matematiğinde üstel fonksiyonların en bilinen uygulaması olarak öğretilir.",
        "Hesaplarda sık geçen birkaç terimi baştan netleştirelim. <strong>Anapara</strong> başlangıçta yatırdığınız ya da borç aldığınız tutardır. <strong>Dönem</strong>, faizin bir kez hesaplanıp anaparaya eklendiği süredir; bir ay, üç ay ya da bir yıl olabilir. <strong>Vade</strong> ise yatırımın ya da borcun toplam süresidir. Bileşik faizde vade boyunca kaç dönem geçtiği, sonucu belirleyen en önemli sayıdır."
      ]
    },
    {
      h: "Bileşik faiz formülü ve terimleri",
      formula: "A = P × (1 + r/n)^(n × t)\nFaiz = A − P\nP: anapara · r: yıllık nominal oran (ondalık) · n: yılda bileşik dönem sayısı · t: yıl",
      p: [
        "Formüldeki <strong>n</strong>, faizin yılda kaç kez anaparaya eklendiğini gösterir: yıllık bileşikte 1, üç aylıkta 4, aylıkta 12, günlükte 365'tir. Oran yüzde değil ondalık olarak yazılır; %40 için r = 0,40 kullanılır. Dönem sayısı arttıkça aynı nominal oran daha yüksek bir sonuç üretir, çünkü faiz daha sık anaparaya katılır."
      ],
      ol: [
        "Anaparayı yazın: P = 100.000 TL.",
        "Yıllık oranı ondalığa çevirin: %40 → r = 0,40.",
        "Bileşik sıklığını seçin: yıllık için n = 1.",
        "Süreyi yazın: t = 5 yıl. Üs n × t = 5 olur.",
        "Hesaplayın: 100.000 × 1,40<sup>5</sup> = 100.000 × 5,37824 = 537.824 TL. Kazanılan faiz 437.824 TL'dir."
      ],
      after: [
        "Aynı hesabı farklı süre ve sıklıklarla denemek için [[arac:bilesik-faiz-hesapla|Bileşik Faiz Hesaplama]] aracı yıl yıl tabloyu, ek yatırım seçeneğini ve efektif oranı birlikte gösterir."
      ]
    },
    {
      h: "Basit faiz ile bileşik faiz arasındaki fark",
      p: [
        "Basit faizde faiz her dönem yalnızca ilk anapara üzerinden hesaplanır ve kazanılan faiz anaparaya eklenmez. Bu yüzden her yıl aynı tutarda faiz kazanırsınız ve paranız doğrusal büyür. Bileşik faizde ise her yılın faizi bir öncekinden büyüktür."
      ],
      table: {
        head: ["Yıl", "Basit faiz (yıl sonu)", "Bileşik faiz (yıl sonu)", "Fark"],
        rows: [
          ["1", "140.000 TL", "140.000 TL", "0 TL"],
          ["2", "180.000 TL", "196.000 TL", "16.000 TL"],
          ["3", "220.000 TL", "274.400 TL", "54.400 TL"],
          ["4", "260.000 TL", "384.160 TL", "124.160 TL"],
          ["5", "300.000 TL", "537.824 TL", "237.824 TL"]
        ],
        caption: "100.000 TL anapara, yıllık %40 örnek oranla. Bileşik sütununda yıllık bileşik kabul edilmiştir."
      },
      after: [
        "İlk yıl iki yöntem aynı sonucu verir; fark ikinci yıldan itibaren açılır ve süre uzadıkça hızla büyür. Kısa vadeli, tek dönemlik mevduatlarda basit faiz hesabı yeterlidir; vadesi her ay yenilenen ve faizi anaparaya eklenen birikimlerde ise bileşik hesap gerçeği yansıtır. Basit ve bileşik sonucu yan yana görmek için [[arac:faiz-hesapla|Faiz Hesaplama]] aracını kullanabilirsiniz. Mevduat hesabının stopaj dahil ayrıntıları [[rehber:mevduat-faizi-nasil-hesaplanir|mevduat faizi rehberinde]] yer alır."
      ]
    },
    {
      h: "72 kuralı: param kaç yılda ikiye katlanır?",
      p: [
        "72 kuralı, bileşik faizle paranın yaklaşık kaç yılda iki katına çıkacağını kafadan hesaplamaya yarayan pratik bir yöntemdir: 72'yi yıllık yüzde orana bölersiniz. Yıllık %12 getiriyle para yaklaşık 72 ÷ 12 = 6 yılda ikiye katlanır.",
        "Kural, düşük ve orta oranlarda (%4–%15) şaşırtıcı derecede isabetlidir. Ancak yüksek oranlarda sapma artar; Türkiye'deki gibi %40 ve üzeri oranlarda kesin formülü kullanmak gerekir. Kesin ikiye katlanma süresi, ln 2'nin ln(1 + r)'ye bölünmesiyle bulunur."
      ],
      formula: "72 kuralı: süre ≈ 72 ÷ yıllık yüzde oran\nKesin süre = ln 2 ÷ ln(1 + r) ≈ 0,6931 ÷ ln(1 + r)",
      table: {
        head: ["Yıllık oran", "72 kuralı", "Kesin süre", "Sapma"],
        rows: [
          ["%6", "12,0 yıl", "11,9 yıl", "küçük"],
          ["%12", "6,0 yıl", "6,1 yıl", "küçük"],
          ["%24", "3,0 yıl", "3,2 yıl", "orta"],
          ["%40", "1,8 yıl", "2,1 yıl", "belirgin"],
          ["%50", "1,4 yıl", "1,7 yıl", "belirgin"]
        ]
      },
      after: [
        "Kuralın tersi de işe yarar: paranızı 4 yılda ikiye katlamak istiyorsanız yaklaşık 72 ÷ 4 = %18 yıllık getiriye ihtiyacınız vardır. Kesin karşılaştırma için [[arac:72-kurali-hesapla|72 Kuralı Hesaplama]] aracı her iki sonucu da gösterir."
      ]
    },
    {
      h: "Aylık bileşik faiz ve efektif faiz",
      p: [
        "Bankalar ve kredi ürünleri çoğunlukla yıllık nominal oran ilan eder, ama faiz aylık ya da günlük işler. Bu durumda gerçekte kazandığınız ya da ödediğiniz yıllık oran, ilan edilen orandan yüksektir. Bu gerçek orana <strong>efektif yıllık faiz</strong> denir."
      ],
      formula: "Efektif yıllık faiz = (1 + r/n)^n − 1\nYıllık nominal %40, aylık bileşik: (1 + 0,40/12)¹² − 1 = %48,21\nAylık orandan yıllığa: (1 + aylık oran)¹² − 1",
      table: {
        head: ["Bileşik sıklığı (nominal %40)", "Dönem oranı", "Efektif yıllık oran"],
        rows: [
          ["Yıllık (n = 1)", "%40,00", "%40,00"],
          ["Üç aylık (n = 4)", "%10,00", "%46,41"],
          ["Aylık (n = 12)", "%3,33", "%48,21"],
          ["Sürekli (limit)", "–", "%49,18"]
        ]
      },
      after: [
        "Kredi karşılaştırmalarında aylık faiz oranı ilan edilir; aylık %3'lük bir kredinin efektif yıllık maliyeti %36 değil, 1,03<sup>12</sup> − 1 = %42,58'dir. Nominalden efektife hızlı çeviri için [[arac:efektif-faiz-hesapla|Efektif Faiz Oranı Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Düzenli birikimde bileşik faiz",
      p: [
        "Tek seferlik bir anapara yerine her ay düzenli bir tutar biriktiriyorsanız, her taksit yatırıldığı aydan itibaren bileşik faiz kazanmaya başlar. Bu durumda toplam birikim, \"gelecek değer\" formülüyle hesaplanır."
      ],
      formula: "Gelecek değer = aylık tutar × ((1 + i)^n − 1) ÷ i\ni: aylık oran · n: ay sayısı\nÖrnek: 5.000 × ((1,03)²⁴ − 1) ÷ 0,03 ≈ 172.132 TL",
      ol: [
        "Aylık 5.000 TL biriktirdiğinizi ve birikiminizin örnek olarak aylık %3 getiri sağladığını varsayın.",
        "24 ay sonunda yatırdığınız toplam tutar 5.000 × 24 = 120.000 TL'dir.",
        "Formüle göre birikiminiz yaklaşık 172.132 TL olur; aradaki 52.132 TL bileşik getiridir.",
        "Aynı tutarı faizsiz biriktirseydiniz 120.000 TL'de kalırdınız; enflasyon varsa alım gücünüz bunun da altında olurdu."
      ],
      after: [
        "Hedef tutara ulaşmak için aylık ne kadar ayırmanız gerektiğini görmek için [[arac:birikim-hesapla|Birikim Hesaplama]] aracını kullanabilirsiniz. Getirinin enflasyonu geçip geçmediğini değerlendirmek için [[bilgi:enflasyona-gore-paranin-degeri|reel getiri rehberine]] göz atın."
      ]
    },
    {
      h: "Bileşik faizi büyüten üç unsur: süre, oran ve sıklık",
      p: [
        "Bileşik faizin sonucunu üç şey belirler ve bunların etkisi eşit değildir. En güçlü etken <strong>süredir</strong>, çünkü süre formülde üs olarak yer alır. Aynı oranla 10 yıl beklemek, 5 yıl beklemenin iki katı değil, çok daha fazlası getirir. Bu yüzden birikime erken başlamak, daha yüksek oran aramaktan çoğu zaman daha etkilidir.",
        "İkinci etken <strong>orandır</strong>. Oran arttıkça büyüme hızlanır ama burada nominal oran değil, enflasyon ve kesintilerden sonra kalan oran önemlidir. Üçüncü etken <strong>bileşik sıklığıdır</strong>; aylık işleyen faiz yıllık işleyene göre biraz daha fazla getirir, ancak bu fark süre ve oranın etkisi yanında küçüktür.",
        "Bileşik faiz borç tarafında da aynı güçle çalışır. Örnek olarak aylık %4 faiz işleyen ve hiç ödenmeyen 10.000 TL'lik bir borç 6 ayda yaklaşık 12.653 TL'ye, 12 ayda yaklaşık 16.010 TL'ye ulaşır. Asgari ödemeyle uzayan kart borçlarında faizin faize dönüşmesi bu yüzden pahalıdır; ayrıntılar için [[rehber:kredi-karti-asgari-odeme-nasil-hesaplanir|kredi kartı asgari ödeme rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Oranı yüzde olarak formüle koymak:</strong> %40 için 40 değil 0,40 yazılmalıdır.",
        "<strong>Aylık oranı 12 ile çarpıp yıllık sanmak:</strong> Bu nominal oranı verir; efektif oran her zaman daha yüksektir.",
        "<strong>Vergi ve kesintileri unutmak:</strong> Mevduatta stopaj gibi kesintiler net getiriyi düşürür; formüle net oranı koyun.",
        "<strong>72 kuralını yüksek oranlarda kesin sanmak:</strong> %40'ta kural 1,8 yıl derken gerçek süre 2,1 yıldır.",
        "<strong>Bileşik faizin borçta da çalıştığını unutmak:</strong> Ödenmeyen kart borcuna işleyen faiz de bir sonraki ay faiz doğurur."
      ]
    }
  ],
  faq: [
    ["Bileşik faiz nedir?", "Bileşik faiz, her dönem kazanılan faizin anaparaya eklendiği ve sonraki dönemde bu büyümüş tutarın tamamının faiz kazandığı yöntemdir. Bu yüzden para doğrusal değil üstel büyür; buna halk arasında faizin faizi denir."],
    ["Bileşik faiz formülü nasıl uygulanır?", "A = P × (1 + r/n)^(n·t) formülünde anaparayı, ondalık yıllık oranı, yıllık bileşik dönem sayısını ve yılı yerine koyun. 100.000 TL, %40, yıllık bileşik ve 5 yıl için sonuç 537.824 TL'dir."],
    ["Basit faiz ile bileşik faiz arasındaki fark nedir?", "Basit faizde faiz yalnızca ilk anaparaya işler ve her yıl aynı tutarda faiz kazanılır. Bileşik faizde faiz anaparaya eklenir, bu yüzden her yılın faizi bir öncekinden büyüktür ve fark süreyle katlanır."],
    ["72 kuralı nedir?", "72 sayısını yıllık yüzde orana bölerek paranın yaklaşık kaç yılda ikiye katlanacağını bulmanızı sağlayan pratik kuraldır. %12 getiride yaklaşık 6 yıl çıkar; yüksek oranlarda kesin formülle kontrol etmek gerekir."],
    ["Param kaç yılda ikiye katlanır?", "Kesin süre ln 2 ÷ ln(1 + yıllık oran) formülüyle bulunur. Yıllık %24 bileşik getiride yaklaşık 3,2 yıl, %40 getiride yaklaşık 2,1 yıl sürer; bu hesap faizin hiç çekilmediğini varsayar."],
    ["Aylık bileşik faiz yıllığa nasıl çevrilir?", "Aylık oranı ondalık olarak 1 ile toplayıp 12. kuvvetini alın ve 1 çıkarın. Aylık %3, yıllık olarak 1,03 üzeri 12 eksi 1 formülüyle %42,58 eder; 12 ile çarpmak yalnızca nominal oranı verir."],
    ["Efektif faiz nedir?", "Efektif faiz, bileşik dönemleri hesaba katan gerçek yıllık orandır. Yıllık nominal %40 oranlı ve aylık bileşik işleyen bir üründe efektif yıllık oran %48,21'dir; karşılaştırmalarda bu oran kullanılmalıdır."],
    ["Düzenli birikimde bileşik faiz nasıl hesaplanır?", "Aylık tutar × ((1 + aylık oran)^ay − 1) ÷ aylık oran formülü kullanılır. Aylık 5.000 TL, aylık %3 örnek getiriyle 24 ayda yaklaşık 172.132 TL birikir; yatırılan tutar ise 120.000 TL'dir."]
  ],
  tools: ["bilesik-faiz-hesapla", "faiz-hesapla", "72-kurali-hesapla", "efektif-faiz-hesapla", "birikim-hesapla"],
  related: ["enflasyona-gore-paranin-degeri", "50-30-20-butce-kurali"],
  sources: [
    ["TCMB – Faiz oranları ve istatistikler", "https://www.tcmb.gov.tr/"],
    ["MEB – Ortaöğretim matematik öğretim programı", "https://www.meb.gov.tr/"]
  ],
  uyari: "yatırım tavsiyesi değildir, örneklerdeki oranlar temsilîdir"
};
