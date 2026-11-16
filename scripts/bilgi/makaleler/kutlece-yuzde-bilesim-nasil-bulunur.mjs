export default {
  slug: "kutlece-yuzde-bilesim-nasil-bulunur",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Bileşikteki Elementin Kütlece Yüzdesi Nasıl Bulunur? Formül ve Örnekler",
  pageTitle: "Kütlece Yüzde Bileşim Nasıl Bulunur? Formül ve Örnekler",
  description: "Kütlece yüzde = elementin formüldeki toplam kütlesi ÷ molar kütle × 100. Suda oksijen %88,81, hidrojen %11,19. Basit formül bulma, gübre etiketi ve mol hesabı.",
  keywords: ["kütlece yüzde bileşim", "bileşikte element yüzdesi", "suda oksijen yüzdesi", "suda hidrojen yüzdesi", "molar kütle hesaplama", "basit formül bulma", "kütlece yüzde formülü", "sabit oranlar kanunu", "kimya 10. sınıf"],
  lead: "Bir bileşikteki elementin kütlece yüzdesi, o elementin formüldeki toplam kütlesinin bileşiğin molar kütlesine bölünüp 100 ile çarpılmasıyla bulunur: <strong>% element = (atom sayısı × atom kütlesi) ÷ molar kütle × 100</strong>. Örneğin suyun (H₂O) molar kütlesi 18,015 g/mol'dür; oksijen <strong>%88,81</strong>, hidrojen <strong>%11,19</strong> pay alır. Bu sayfada molar kütle hesabını, çözümlü örnekleri, kütlece yüzdeden basit formül çıkarmayı, sabit oranlar kanununu, derişimle farkını ve gübre etiketindeki azot yüzdesini bulacaksınız.",
  kisaCevap: [
    "Kütlece yüzde = (elementin atom sayısı × atom kütlesi) ÷ bileşiğin molar kütlesi × 100.",
    "Molar kütle, formüldeki her atomun kütlesinin atom sayısıyla çarpılıp toplanmasıyla bulunur: H₂O = 2 × 1,008 + 15,999 = 18,015 g/mol.",
    "Suda oksijen kütlece %88,81, hidrojen %11,19'dur; tam sayılı kütlelerle (H = 1, O = 16) %88,9 ve %11,1 çıkar.",
    "Bir bileşikteki elementlerin yüzdeleri toplamı her zaman %100'dür; son elementi farkla bulabilirsiniz.",
    "Kütlece yüzdeden basit formül bulmak için her yüzde atom kütlesine bölünür ve oranlar en küçük tam sayılara çevrilir.",
    "Mol sayısı n = kütle ÷ molar kütledir: 36 g su yaklaşık 2 moldür."
  ],
  figure: {
    alt: "Su molekülünün kütle dağılımı çubuğu: oksijen 15,999 gram yüzde 88,81, iki hidrojen 2,016 gram yüzde 11,19. Altta üre için çubuk: azot yüzde 46,65, oksijen yüzde 26,64, karbon yüzde 20,00, hidrojen yüzde 6,71.",
    caption: "Atom sayısı ile kütle payı aynı şey değildir: suda atomların üçte ikisi hidrojendir, ama kütlenin yalnızca %11'i hidrojene aittir. Ürenin azot payı gübre etiketlerindeki %46 değerini açıklar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bileşikte kütle payları</text>
  <text x="40" y="70" class="b">Su, H₂O · 18,015 g/mol</text>
  <rect x="40" y="84" width="568" height="46" rx="4" class="p"/>
  <rect x="608" y="84" width="72" height="46" rx="4" class="ps"/>
  <text x="324" y="113" class="b mid sf">O: 15,999 g · %88,81</text>
  <text x="644" y="113" class="sm b mid">H₂</text>
  <text x="680" y="150" class="sm end">2 × 1,008 = 2,016 g · %11,19</text>
  <g class="sm">
    <circle cx="80" cy="186" r="20" class="p"/><text x="80" y="191" class="b mid sf">O</text>
    <circle cx="54" cy="212" r="11" class="ps"/><text x="54" y="216" class="mid">H</text>
    <circle cx="106" cy="212" r="11" class="ps"/><text x="106" y="216" class="mid">H</text>
    <text x="134" y="194">3 atomun 2'si hidrojen, ama kütlenin yalnızca %11'i</text>
  </g>
  <line x1="40" y1="240" x2="680" y2="240" class="sb dash" fill="none"/>
  <text x="40" y="272" class="b">Üre, CO(NH₂)₂ · 60,056 g/mol</text>
  <rect x="40" y="286" width="299" height="46" rx="4" class="oks"/>
  <rect x="339" y="286" width="170" height="46" rx="4" class="p"/>
  <rect x="509" y="286" width="128" height="46" rx="4" class="sf sb"/>
  <rect x="637" y="286" width="43" height="46" rx="4" class="ps"/>
  <text x="190" y="315" class="b mid">N %46,65</text>
  <text x="424" y="315" class="b mid sf">O %26,64</text>
  <text x="573" y="315" class="b mid">C %20,00</text>
  <text x="658" y="315" class="sm b mid">H</text>
  <text x="680" y="352" class="sm end">H %6,71</text>
  <text x="40" y="384" class="sm t2">Azot: 2 × 14,007 = 28,014 g → 28,014 ÷ 60,056 × 100 = %46,65</text>
</svg>`
  },
  sections: [
    {
      h: "Kütlece yüzde bileşim nedir?",
      p: [
        "Bir bileşiğin kütlece yüzde bileşimi, bileşiğin toplam kütlesinin yüzde kaçının hangi elemente ait olduğunu gösterir. Örneğin 100 g suyun yaklaşık 88,81 g'ı oksijen, 11,19 g'ı hidrojendir. Bu oran, suyun nereden geldiğinden ve ne kadar olduğundan bağımsız olarak her zaman aynıdır.",
        "Kütlece yüzde, formül biliniyorsa doğrudan hesaplanır; tersine, laboratuvarda ölçülen yüzdelerden bileşiğin formülü bulunabilir. Bu yüzden 10. sınıf kimyada \"kimyanın temel kanunları\" ve \"mol kavramı\" konularıyla birlikte işlenir, TYT ve AYT kimya hesaplamalarının da sık sorulan bir parçasıdır.",
        "Hesap için iki bilgiye ihtiyaç vardır: bileşiğin kimyasal formülü (hangi elementten kaç atom olduğu) ve elementlerin atom kütleleri. Atom kütleleri periyodik tablodan alınır."
      ]
    },
    {
      h: "Molar kütle nasıl bulunur?",
      p: [
        "Molar kütle, bir mol maddenin gram cinsinden kütlesidir ve birimi g/mol'dür. Bir bileşiğin molar kütlesi, formüldeki her elementin atom kütlesinin o elementin atom sayısıyla çarpılıp toplanmasıyla bulunur. Parantezli formüllerde parantez dışındaki sayı, parantez içindeki her atomu çarpar."
      ],
      formula: "M = Σ (atom sayısı × atom kütlesi)\nH₂O: 2 × 1,008 + 1 × 15,999 = 18,015 g/mol\nCO(NH₂)₂: 12,011 + 15,999 + 2 × 14,007 + 4 × 1,008 = 60,056 g/mol",
      table: {
        head: ["Element", "Sembol", "Atom kütlesi (g/mol)"],
        rows: [
          ["Hidrojen", "H", "1,008"],
          ["Karbon", "C", "12,011"],
          ["Azot", "N", "14,007"],
          ["Oksijen", "O", "15,999"],
          ["Sodyum", "Na", "22,990"],
          ["Kükürt", "S", "32,06"],
          ["Klor", "Cl", "35,45"],
          ["Bakır", "Cu", "63,546"]
        ],
        caption: "Standart atom kütleleri, ondalık basamak sayısı kaynağa göre değişebilir. Okul sorularında çoğunlukla H = 1, C = 12, N = 14, O = 16 gibi yuvarlanmış değerler verilir; soruda verilen değeri kullanın."
      },
      after: [
        "Formülü yazarak molar kütleyi hesaplamak için [[arac:molar-kutle-hesapla|Molar Kütle Hesaplama]] aracını, element bilgileri için [[arac:periyodik-tablo|Periyodik Tablo]]yu kullanabilirsiniz."
      ]
    },
    {
      h: "Bileşikteki bir elementin kütlece yüzdesi nasıl hesaplanır?",
      ol: [
        "Bileşiğin formülünü yazın ve her elementten kaç atom olduğunu sayın. Su için 2 H ve 1 O.",
        "Her elementin formüldeki toplam kütlesini bulun: H için 2 × 1,008 = 2,016 g; O için 1 × 15,999 = 15,999 g.",
        "Bu kütleleri toplayarak molar kütleyi bulun: 2,016 + 15,999 = 18,015 g/mol.",
        "Her elementin kütlesini molar kütleye bölüp 100 ile çarpın: H = 2,016 ÷ 18,015 × 100 = %11,19; O = 15,999 ÷ 18,015 × 100 = %88,81.",
        "Sağlama yapın: %11,19 + %88,81 = %100."
      ],
      formula: "% element = (n × A) ÷ M × 100",
      after: [
        "Tam sayılı kütlelerle (H = 1, O = 16) hesap yapılırsa M = 18 g/mol, H = 2 ÷ 18 = %11,1 ve O = 16 ÷ 18 = %88,9 bulunur. İki sonuç arasındaki fark yalnızca atom kütlelerinin yuvarlanmasından kaynaklanır.",
        "Kimyasal formülü yazdığınızda her elementin yüzdesini parantezli formüller ve kristal suyu dahil gösteren [[arac:kutle-yuzdesi-bilesik-hesapla|Kütle Yüzdesi Bileşik Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnekler ve karşılaştırma tablosu",
      table: {
        head: ["Bileşik", "Molar kütle (g/mol)", "Kütlece yüzde bileşim"],
        rows: [
          ["Su, H₂O", "18,015", "H %11,19 · O %88,81"],
          ["Karbondioksit, CO₂", "44,009", "C %27,29 · O %72,71"],
          ["Sofra tuzu, NaCl", "58,440", "Na %39,34 · Cl %60,66"],
          ["Kireç taşı, CaCO₃", "100,086", "Ca %40,04 · C %12,00 · O %47,96"],
          ["Glikoz, C₆H₁₂O₆", "180,156", "C %40,00 · H %6,71 · O %53,28"],
          ["Üre, CO(NH₂)₂", "60,056", "N %46,65 · O %26,64 · C %20,00 · H %6,71"],
          ["Amonyum nitrat, NH₄NO₃", "80,043", "N %35,00 · O %59,96 · H %5,04"],
          ["Göztaşı, CuSO₄·5H₂O", "249,677", "Cu %25,45 · su %36,08"]
        ],
        caption: "Değerler standart atom kütleleriyle hesaplanmıştır. Kristal sulu tuzlarda suyun kütlece payı da aynı yöntemle bulunur: 5 × 18,015 ÷ 249,677 × 100 = %36,08."
      },
      after: [
        "<strong>Örnek: Sofra tuzundaki sodyum.</strong> NaCl'nin molar kütlesi 22,990 + 35,45 = 58,44 g/mol'dür. Sodyum payı 22,990 ÷ 58,44 × 100 = %39,34'tür. Yani 10 g tuzda yaklaşık 3,93 g sodyum bulunur. Bu hesap, besin etiketlerinde \"tuz\" ile \"sodyum\" değerlerinin neden farklı yazıldığını açıklar.",
        "<strong>Örnek: Karbondioksitteki karbon.</strong> CO₂'nin molar kütlesi 12,011 + 2 × 15,999 = 44,009 g/mol'dür; karbon payı 12,011 ÷ 44,009 × 100 = %27,29'dur. 1 kg CO₂'de yaklaşık 273 g karbon vardır."
      ]
    },
    {
      h: "Kütlece yüzdeden basit formül nasıl çıkarılır?",
      p: [
        "Laboratuvarda bir maddenin element analizi yapıldığında sonuç çoğunlukla kütlece yüzde olarak verilir. Bu yüzdelerden atomların birbirine oranı, yani <strong>basit (en basit) formül</strong> bulunabilir. İşlemi kolaylaştırmak için 100 g madde varsayılır; böylece yüzdeler doğrudan gram olur."
      ],
      ol: [
        "Analiz sonucu: %40,0 C, %6,7 H, %53,3 O. 100 g maddede 40,0 g C, 6,7 g H, 53,3 g O vardır.",
        "Her kütleyi atom kütlesine bölerek mol sayısını bulun: C = 40,0 ÷ 12,011 = 3,33 mol; H = 6,7 ÷ 1,008 = 6,65 mol; O = 53,3 ÷ 15,999 = 3,33 mol.",
        "En küçük değere bölün: C = 1, H = 2,0, O = 1. Basit formül CH₂O'dur.",
        "Oranlardan biri 1,5 ya da 1,33 gibi çıkarsa tüm oranları 2 ya da 3 ile çarparak tam sayıya getirin.",
        "Molar kütle biliniyorsa gerçek (molekül) formülü bulun: CH₂O'nun kütlesi 30,03 g/mol'dür; madde 180 g/mol ise 180 ÷ 30 = 6 ve formül C₆H₁₂O₆ (glikoz) olur."
      ],
      after: [
        "Mol sayısını kütle, tanecik sayısı ya da gaz hacminden hesaplamak için [[arac:mol-hesapla|Mol Hesaplama]] aracını kullanabilirsiniz. Mol kavramının ayrıntısı için [[bilgi:mol-nedir-nasil-hesaplanir|mol nedir, nasıl hesaplanır]] makalesine bakın."
      ]
    },
    {
      h: "Sabit oranlar kanunu nedir?",
      p: [
        "Sabit oranlar kanunu, Fransız kimyacı Joseph Proust'un 18. yüzyılın sonunda ortaya koyduğu ilkedir: bir bileşiği oluşturan elementlerin kütleleri arasında <strong>sabit bir oran</strong> vardır. Saf su, ister yağmurdan ister laboratuvardan elde edilsin, her zaman kütlece yaklaşık 1 birim hidrojene 8 birim oksijen içerir (2,016 : 15,999 ≈ 1 : 7,94).",
        "Bu kanun kütlece yüzde bileşimin değişmez olmasının nedenidir. Okul sorularında sıkça şu biçimde kullanılır: \"4 g hidrojen ile 40 g oksijen tepkimeye girerse ne kadar su oluşur?\" 1 : 8 oranına göre 4 g hidrojen 32 g oksijenle birleşir; 36 g su oluşur ve 8 g oksijen artar.",
        "Aynı iki elementin birden fazla bileşik oluşturması ise katlı oranlar kanunuyla açıklanır: CO ve CO₂'de aynı miktar karbonla birleşen oksijen kütleleri 1 : 2 oranındadır."
      ]
    },
    {
      h: "Kütlece yüzde bileşim ile kütlece yüzde derişim farkı nedir?",
      p: [
        "İki kavram adlarının benzerliği yüzünden sık karıştırılır. <strong>Kütlece yüzde bileşim</strong> tek bir saf bileşiğin içindeki elementlerin payını anlatır ve formülden hesaplanır; değeri o bileşik için sabittir. <strong>Kütlece yüzde derişim</strong> ise bir karışımın, örneğin bir çözeltinin içindeki çözünen maddenin payını anlatır ve hazırlayan kişinin seçtiği miktarlara göre değişir.",
        "Örneğin %10'luk tuzlu su, 100 g çözeltide 10 g NaCl olduğunu söyler; bu bir derişimdir. Aynı tuzun %39,34'ünün sodyum olması ise bir bileşim bilgisidir. Derişim birimleri ve ppm hesapları için [[bilgi:ppm-nedir-derisim-birimleri|ppm ve derişim birimleri]], mol cinsinden derişim için [[bilgi:molarite-nasil-hesaplanir|molarite]] makalelerine göz atabilirsiniz."
      ],
      formula: "Bileşim:  % element = element kütlesi ÷ bileşik kütlesi × 100   (sabit)\nDerişim:  % kütlece = çözünen kütlesi ÷ çözelti kütlesi × 100   (değişken)"
    },
    {
      h: "Gübre etiketindeki azot yüzdesi nasıl hesaplanır?",
      p: [
        "Gübre torbalarındaki \"%46 N\" ya da \"%21 N\" gibi değerler, gübrenin kütlece ne kadarının azot olduğunu gösterir. Saf ürenin azot payı %46,65'tir; ticari ürede bu değer genellikle %46 olarak beyan edilir. Saf amonyum sülfat (NH₄)₂SO₄ için hesap 2 × 14,007 ÷ 132,134 × 100 = %21,20 verir ve %21 azotlu gübre etiketlerini açıklar.",
        "Bu bilgiyle uygulanan saf azot miktarı hesaplanabilir: 50 kg'lık %21 azotlu gübre torbasında 50 × 0,21 = 10,5 kg azot vardır. 100 kg ürede ise yaklaşık 46 kg azot bulunur. Etiketteki fosfor ve potasyum değerleri ise çoğunlukla element olarak değil oksit (P₂O₅ ve K₂O) olarak verilir; bunları karıştırmamak gerekir.",
        "Hangi bitkiye dekara ne kadar azot verileceği toprağa, ürüne ve analiz sonuçlarına bağlıdır. Genel yaklaşım için [[bilgi:dekara-ne-kadar-gubre-atilir|dekara ne kadar gübre atılır]] makalesine bakabilir, uygulama miktarı için tarım danışmanınızın ya da il/ilçe tarım müdürlüğünün önerisini esas alabilirsiniz."
      ],
      note: "Gübre ve kimyasalları taşırken ve uygularken etiketteki güvenlik talimatlarına uyun; eldiven ve uygun koruyucu ekipman kullanın, çocuklardan ve gıdadan uzak saklayın. Amonyum nitrat gibi bazı gübreler yüksek ısı ve yanıcı maddelerle temas ettiğinde tehlikeli olabilir; depolama kurallarına dikkat edin."
    },
    {
      h: "Mol sayısı nasıl bulunur? Sık yapılan hatalar",
      p: [
        "Mol sayısı, maddenin kütlesinin molar kütlesine bölünmesiyle bulunur: n = m ÷ M. 36 g su için n = 36 ÷ 18,015 ≈ 2,0 mol; 1 mol su yaklaşık 6,022 × 10<sup>23</sup> molekül içerir. Kütlece yüzde hesabıyla birleştirildiğinde, belirli bir kütlede ne kadar element bulunduğu da bulunabilir: 36 g suda 36 × 0,8881 ≈ 32,0 g oksijen vardır."
      ],
      ul: [
        "<strong>Atom sayısını unutmak:</strong> H₂O'da hidrojenin kütlesi 1,008 değil 2 × 1,008'dir.",
        "<strong>Parantezi açmamak:</strong> CO(NH₂)₂'de 2 azot ve 4 hidrojen vardır; parantez dışındaki 2 içerideki her atomu çarpar.",
        "<strong>Kristal suyunu atlamak:</strong> CuSO₄·5H₂O'nun molar kütlesi CuSO₄'ünkünden (159,6 g/mol) belirgin biçimde büyüktür.",
        "<strong>Atom sayısı payıyla kütle payını karıştırmak:</strong> Sudaki atomların üçte ikisi hidrojendir, ama kütlenin yalnızca %11,19'u.",
        "<strong>Basit formülde erken yuvarlamak:</strong> 1,33 gibi oranları 1'e yuvarlamak yanlış formül verir; 3 ile çarparak 4'e çevirin."
      ]
    }
  ],
  faq: [
    ["Bileşikteki bir elementin kütlece yüzdesi nasıl hesaplanır?", "Elementin atom sayısı atom kütlesiyle çarpılır, bileşiğin molar kütlesine bölünür ve 100 ile çarpılır. Suda hidrojen için 2 × 1,008 ÷ 18,015 × 100 = %11,19 bulunur."],
    ["Sudaki oksijenin kütlece yüzdesi kaçtır?", "Suda oksijenin kütlece yüzdesi standart atom kütleleriyle %88,81'dir; hidrojen ise %11,19 pay alır. Okul sorularında H = 1 ve O = 16 alınırsa oksijen yaklaşık %88,9 olarak bulunur."],
    ["Molar kütle nasıl bulunur?", "Formüldeki her elementin atom kütlesi atom sayısıyla çarpılır ve sonuçlar toplanır. Su için 2 × 1,008 + 15,999 = 18,015 g/mol, üre için 60,056 g/mol çıkar; birimi gram bölü moldür."],
    ["Kütlece yüzdeden basit formül nasıl çıkarılır?", "100 g madde varsayılıp yüzdeler gram kabul edilir, her biri atom kütlesine bölünerek mol sayısı bulunur ve en küçük değere bölünür. %40 C, %6,7 H, %53,3 O içeren maddenin basit formülü CH₂O çıkar."],
    ["Kütlece yüzde bileşim ile kütlece yüzde derişim farkı nedir?", "Bileşim, saf bir bileşiğin içindeki elementlerin sabit payıdır ve formülden hesaplanır. Derişim ise bir çözeltideki çözünen maddenin payıdır ve hazırlanan miktara göre değişir; %10'luk tuzlu su bir derişim örneğidir."],
    ["Sabit oranlar kanunu nedir?", "Sabit oranlar kanunu, bir bileşiği oluşturan elementlerin kütleleri arasında her zaman aynı oranın bulunduğunu söyler. Saf su kaynağı ne olursa olsun kütlece yaklaşık 1 birim hidrojene 8 birim oksijen içerir."],
    ["Gübre etiketindeki azot yüzdesi nasıl hesaplanır?", "Etiketteki yüzde, gübre kütlesinin ne kadarının azot olduğunu gösterir. Saf ürede azot payı 2 × 14,007 ÷ 60,056 × 100 = %46,65'tir; 50 kg'lık %21 azotlu torbada ise 10,5 kg saf azot bulunur."],
    ["Mol sayısı nasıl bulunur?", "Mol sayısı, maddenin gram cinsinden kütlesinin molar kütlesine bölünmesiyle bulunur: n = m ÷ M. 36 g su için 36 ÷ 18,015 yaklaşık 2 mol eder ve bu da yaklaşık 1,2 × 10<sup>24</sup> molekül demektir."],
    ["Kristal suyu kütlece yüzdeye dahil edilir mi?", "Evet. Formülde nokta ile gösterilen su molekülleri molar kütleye eklenir. Göztaşı CuSO₄·5H₂O'nun molar kütlesi 249,677 g/mol'dür ve kütlesinin yaklaşık %36,08'i kristal suyudur."]
  ],
  tools: ["kutle-yuzdesi-bilesik-hesapla", "molar-kutle-hesapla", "mol-hesapla", "periyodik-tablo"],
  related: ["mol-nedir-nasil-hesaplanir", "molarite-nasil-hesaplanir", "ppm-nedir-derisim-birimleri"],
  sources: [
    ["IUPAC – Standart atom kütleleri", "https://iupac.org/"],
    ["MEB – Ortaöğretim Kimya Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ],
  uyari: "kimyasal ve gübre uygulamalarında ürün etiketine, güvenlik bilgi formuna ve uzman önerisine uyun"
};
