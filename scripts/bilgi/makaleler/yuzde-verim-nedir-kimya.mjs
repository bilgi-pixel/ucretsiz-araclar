export default {
  slug: "yuzde-verim-nedir-kimya",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Yüzde Verim Nedir? Teorik ve Gerçek Verim Nasıl Hesaplanır",
  pageTitle: "Yüzde Verim Nedir? Teorik Verim ve Yüzde Verim Hesaplama",
  description: "Yüzde verim = gerçek verim ÷ teorik verim × 100. Teorik verim mol oranlarıyla, sınırlayıcı bileşenden bulunur. CaCO₃ ve su oluşumu örnekleri çözümlü.",
  keywords: ["yüzde verim nedir", "yüzde verim hesaplama", "teorik verim", "gerçek verim", "sınırlayıcı bileşen", "kimyasal hesaplamalar", "tanecik sayısı", "verim neden yüzde 100 olmaz"],
  lead: "Yüzde verim, bir tepkimede gerçekte elde edilen ürün miktarının kuramsal olarak elde edilebilecek en yüksek miktara oranıdır: <strong>yüzde verim = (gerçek verim ÷ teorik verim) × 100</strong>. 50 g kalsiyum karbonat ısıtıldığında kuramsal olarak 28 g kalsiyum oksit oluşur; laboratuvarda 25,2 g elde edilirse verim %90'dır. Teorik verim denkleştirilmiş tepkime denklemi, mol oranları ve sınırlayıcı bileşen kullanılarak bulunur. Bu sayfada adım adım çözümlü örnekleri, verimin neden %100 olmadığını ve %100'ü aşan sonuçların ne anlama geldiğini anlatıyoruz.",
  kisaCevap: [
    "Yüzde verim = gerçek verim ÷ teorik verim × 100; iki değer aynı birimde (g ya da mol) olmalıdır.",
    "Teorik verim, sınırlayıcı bileşenin tamamen harcandığı varsayılarak mol oranlarından hesaplanır.",
    "Sınırlayıcı bileşen, tepkimede ilk tükenen ve ürün miktarını belirleyen maddedir.",
    "Mol sayısı = kütle ÷ mol kütlesi; tanecik sayısı = mol × 6,022 × 10<sup>23</sup>.",
    "Gerçek verim genellikle teorik verimden düşüktür: yan tepkimeler, dengeye ulaşma, kayıplar ve saflık sorunları nedeniyle.",
    "%100'ü aşan verim çoğunlukla ürünün nemli ya da kirli olduğunu gösteren bir ölçüm hatasıdır."
  ],
  figure: {
    alt: "Yüzde verim hesap akışı: 50 g CaCO₃ bölü 100 g/mol eşittir 0,5 mol; 1:1 oranla 0,5 mol CaO; çarpı 56 g/mol eşittir 28 g teorik verim; gerçek 25,2 g ile yüzde verim %90. Altta teorik ve gerçek verim çubuk karşılaştırması.",
    caption: "Hesap her zaman aynı yolu izler: kütle → mol → denklem oranı → ürün molü → ürün kütlesi (teorik verim) → yüzde verim. Çubuktaki boşluk kayıp ürünü gösterir.",
    svg: `<svg viewBox="0 0 720 390" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">CaCO₃ → CaO + CO₂ (ısıtma ile ayrışma)</text>
  <rect x="20" y="52" width="130" height="78" rx="10" class="sf sb"/>
  <text x="85" y="78" class="sm mid t2">Başlangıç</text><text x="85" y="104" class="b mid">50 g CaCO₃</text><text x="85" y="122" class="sm mid">M = 100 g/mol</text>
  <rect x="166" y="52" width="130" height="78" rx="10" class="sf sb"/>
  <text x="231" y="78" class="sm mid t2">Mol</text><text x="231" y="104" class="b mid">0,5 mol</text><text x="231" y="122" class="sm mid">50 ÷ 100</text>
  <rect x="312" y="52" width="130" height="78" rx="10" class="sf sb"/>
  <text x="377" y="78" class="sm mid t2">Oran 1 : 1</text><text x="377" y="104" class="b mid">0,5 mol CaO</text><text x="377" y="122" class="sm mid">denklemden</text>
  <rect x="458" y="52" width="110" height="78" rx="10" class="ps"/>
  <text x="513" y="78" class="sm mid">Teorik</text><text x="513" y="106" class="b lg mid">28 g</text><text x="513" y="124" class="sm mid">0,5 × 56</text>
  <rect x="584" y="52" width="116" height="78" rx="10" class="p"/>
  <text x="642" y="78" class="sm mid sf">Yüzde verim</text><text x="642" y="108" class="b xl mid sf">%90</text>
  <g class="b p mid"><text x="158" y="96">→</text><text x="304" y="96">→</text><text x="450" y="96">→</text><text x="576" y="96">→</text></g>
  <text x="20" y="176" class="b">Teorik ve gerçek verim</text>
  <rect x="20" y="190" width="600" height="40" rx="6" class="sf sb"/>
  <rect x="20" y="190" width="600" height="40" rx="6" class="ps"/>
  <text x="640" y="216" class="sm b">28 g</text>
  <text x="320" y="216" class="b mid">Teorik verim (en fazla)</text>
  <rect x="20" y="244" width="540" height="40" rx="6" class="oks"/>
  <rect x="560" y="244" width="60" height="40" rx="6" class="dgs"/>
  <text x="290" y="270" class="b mid">Gerçek verim 25,2 g</text>
  <text x="640" y="270" class="sm b dg">2,8 g kayıp</text>
  <rect x="20" y="304" width="680" height="68" rx="8" class="sf sb"/><rect x="20" y="304" width="8" height="68" class="p"/>
  <text x="42" y="330" class="b">Yüzde verim = gerçek ÷ teorik × 100 = 25,2 ÷ 28 × 100 = %90</text>
  <text x="42" y="354" class="sm t2">Kayıp nedenleri: eksik ayrışma, sıçrama, tartım ve aktarma kaybı, nem</text>
</svg>`
  },
  sections: [
    {
      h: "Yüzde verim nedir?",
      p: [
        "Kimyasal bir tepkime denklemi, maddelerin hangi oranlarda tepkimeye girdiğini ve ne kadar ürün oluşabileceğini söyler. Ancak bu, her şeyin kusursuz gittiği ideal bir durumdur. Laboratuvarda ya da fabrikada ürünün bir kısmı yan tepkimelerle başka maddelere dönüşür, bir kısmı kaplarda kalır, bir kısmı süzme ve kurutma sırasında kaybolur. Sonuçta elde edilen miktar, hesaplanan en yüksek miktardan azdır.",
        "<strong>Teorik verim</strong>, denkleme göre elde edilebilecek en yüksek ürün miktarıdır. <strong>Gerçek verim</strong> (deneysel verim), deneyde tartılarak ölçülen ürün miktarıdır. <strong>Yüzde verim</strong> ise gerçek verimin teorik verime oranının yüz katıdır ve bir sürecin ne kadar etkin olduğunu gösterir. Kimya sanayisinde verimdeki birkaç puanlık iyileşme, büyük üretim hacimlerinde ciddi maliyet ve atık farkı yaratır."
      ],
      formula: "Yüzde verim = (gerçek verim ÷ teorik verim) × 100\nGerçek verim = teorik verim × yüzde verim ÷ 100\nGerekli teorik verim = istenen gerçek ürün ÷ (yüzde verim ÷ 100)"
    },
    {
      h: "Teorik verim nasıl bulunur?",
      p: [
        "Teorik verim hesabı, kimyasal hesaplamaların temel zinciri olan \"kütle → mol → mol oranı → mol → kütle\" adımlarıyla yapılır. Bu zinciri kurabilmek için denklemin denkleştirilmiş olması ve maddelerin mol kütlelerinin bilinmesi gerekir."
      ],
      ol: [
        "Tepkime denklemini yazın ve denkleştirin; katsayılar mol oranlarını verir.",
        "Verilen maddenin kütlesini mol kütlesine bölerek mol sayısını bulun.",
        "Birden çok tepken varsa sınırlayıcı bileşeni belirleyin.",
        "Sınırlayıcı bileşenin mol sayısını denklem katsayılarıyla ürünün mol sayısına çevirin.",
        "Ürün mol sayısını ürünün mol kütlesiyle çarparak teorik verimi gram cinsinden bulun."
      ],
      after: [
        "Mol kavramını ve kütle-mol dönüşümünü tazelemek için [[bilgi:mol-nedir-nasil-hesaplanir|mol nedir yazısına]] bakabilirsiniz. Bir bileşiğin mol kütlesini formülünden hesaplamak için [[arac:molar-kutle-hesapla|Molar Kütle Hesaplama]], kütleden mole geçmek için [[arac:mol-hesapla|Mol Hesaplama]] aracını kullanın."
      ]
    },
    {
      h: "Çözümlü örnek 1: kalsiyum karbonatın ayrışması",
      p: [
        "Kireç taşının ana bileşeni olan kalsiyum karbonat (CaCO<sub>3</sub>) ısıtıldığında kalsiyum okside (CaO, sönmemiş kireç) ve karbondioksite ayrışır: CaCO<sub>3</sub> → CaO + CO<sub>2</sub>. Mol kütleleri CaCO<sub>3</sub> için 100 g/mol, CaO için 56 g/mol alınsın (Ca = 40, C = 12, O = 16)."
      ],
      ol: [
        "50 g CaCO<sub>3</sub> ÷ 100 g/mol = <strong>0,5 mol</strong>.",
        "Denklemde katsayılar 1 : 1 olduğundan 0,5 mol CaO oluşabilir.",
        "Teorik verim: 0,5 mol × 56 g/mol = <strong>28 g CaO</strong>.",
        "Deneyde 25,2 g CaO tartılmış olsun. Yüzde verim = 25,2 ÷ 28 × 100 = <strong>%90</strong>.",
        "Kayıp ürün: 28 − 25,2 = 2,8 g. Bu kayıp eksik ayrışmadan ya da ürünün aktarılması sırasındaki kayıplardan kaynaklanabilir."
      ]
    },
    {
      h: "Sınırlayıcı bileşen nedir? Çözümlü örnek 2",
      p: [
        "İki ya da daha fazla madde tepkimeye girdiğinde genellikle biri diğerinden önce tükenir. Önce tükenen madde tepkimeyi durdurur ve oluşabilecek ürün miktarını belirler; buna <strong>sınırlayıcı bileşen</strong> denir. Fazla olan madde ise tepkime sonunda artar. Teorik verim her zaman sınırlayıcı bileşene göre hesaplanır; artan maddeye göre hesap yapmak yanlış ve fazla sonuç verir."
      ],
      ol: [
        "Tepkime: 2H<sub>2</sub> + O<sub>2</sub> → 2H<sub>2</sub>O. Elimizde 4 g H<sub>2</sub> ve 40 g O<sub>2</sub> var (H = 1, O = 16 alınsın).",
        "Mol sayıları: H<sub>2</sub> için 4 ÷ 2 = 2 mol, O<sub>2</sub> için 40 ÷ 32 = 1,25 mol.",
        "2 mol H<sub>2</sub>'nin tamamı için 1 mol O<sub>2</sub> gerekir; elimizde 1,25 mol var. O hâlde <strong>H<sub>2</sub> sınırlayıcıdır</strong>, 0,25 mol (8 g) O<sub>2</sub> artar.",
        "Oluşabilecek su: 2 mol H<sub>2</sub> → 2 mol H<sub>2</sub>O → 2 × 18 = <strong>36 g</strong> (teorik verim).",
        "Gerçekte 30,6 g su toplanmışsa yüzde verim 30,6 ÷ 36 × 100 = <strong>%85</strong>'tir."
      ],
      after: [
        "Pratik bir kural: her tepkenin mol sayısını kendi denklem katsayısına bölün; en küçük sonucu veren madde sınırlayıcıdır. Örnekte H<sub>2</sub> için 2 ÷ 2 = 1, O<sub>2</sub> için 1,25 ÷ 1 = 1,25 bulunur; küçük olan H<sub>2</sub>'dir."
      ]
    },
    {
      h: "Mol ve tanecik sayısı hesapta nasıl kullanılır?",
      p: [
        "Bazı sorular ürün miktarını gram yerine molekül ya da atom sayısı olarak ister. Bu durumda mol sayısı Avogadro sayısıyla (N<sub>A</sub> = 6,022 × 10<sup>23</sup>) çarpılır. Örnek 2'deki 2 mol su için teorik olarak 2 × 6,022 × 10<sup>23</sup> = 1,2044 × 10<sup>24</sup> su molekülü oluşabilir; %85 verimle bu sayı yaklaşık 1,02 × 10<sup>24</sup> olur.",
        "Gaz ürünlerde ise normal koşullarda (0 °C, 1 atm) 1 mol ideal gazın yaklaşık 22,4 litre kapladığı kabulüyle hacim hesabı yapılabilir. Örnek 1'de oluşan 0,5 mol CO<sub>2</sub> normal koşullarda yaklaşık 11,2 litre hacim kaplar. Gerçek koşullardaki hacim için [[bilgi:ideal-gaz-denklemi-pv-nrt|ideal gaz denklemi]] kullanılır. Mol ile tanecik arasında geçiş için [[arac:tanecik-sayisi-hesapla|Tanecik Sayısı Hesaplama]] aracı işinizi görür."
      ],
      table: {
        head: ["Dönüşüm", "İşlem", "Örnek"],
        rows: [
          ["Kütle → mol", "kütle ÷ mol kütlesi", "50 g CaCO<sub>3</sub> → 0,5 mol"],
          ["Mol → kütle", "mol × mol kütlesi", "0,5 mol CaO → 28 g"],
          ["Mol → tanecik", "mol × 6,022 × 10<sup>23</sup>", "2 mol H<sub>2</sub>O → 1,2044 × 10<sup>24</sup> molekül"],
          ["Mol → gaz hacmi (NK)", "mol × 22,4 L", "0,5 mol CO<sub>2</sub> → 11,2 L"]
        ]
      }
    },
    {
      h: "Verim neden yüzde 100 olmaz?",
      ul: [
        "<strong>Tersinir tepkimeler ve denge:</strong> Birçok tepkime tamamlanmaz, ürün ile tepkenler bir dengede kalır. Bu durumda teorik verime hiçbir zaman ulaşılamaz.",
        "<strong>Yan tepkimeler:</strong> Tepkenlerin bir kısmı istenmeyen başka ürünlere dönüşebilir.",
        "<strong>Eksik tepkime:</strong> Süre, sıcaklık ya da karıştırma yetersizse tepkenlerin bir kısmı hiç tepkimeye girmez.",
        "<strong>Fiziksel kayıplar:</strong> Ürün süzgeç kâğıdında, cam malzemenin çeperinde, aktarım sırasında kalır ya da sıçrar.",
        "<strong>Saflaştırma kayıpları:</strong> Kristallendirme ve yıkama gibi işlemler ürünü saflaştırırken bir kısmını da kaybettirir.",
        "<strong>Tepken saflığı:</strong> Başlangıç maddesi %100 saf değilse gerçek mol sayısı hesaplanandan azdır."
      ],
      after: [
        "Çok adımlı sentezlerde toplam verim, her adımın veriminin çarpımıdır. Üç adımlı bir süreçte verimler %80, %90 ve %95 ise toplam verim 0,80 × 0,90 × 0,95 ≈ %68,4'tür. Bu yüzden ilaç ve özel kimyasal üretiminde adım sayısını azaltmak büyük önem taşır."
      ]
    },
    {
      h: "Yüzde 100'den büyük verim ne anlama gelir?",
      p: [
        "Kütlenin korunumu yasasına göre bir tepkimede teorik verimden daha fazla saf ürün oluşamaz. Bu nedenle %100'ün üzerinde bir verim bulduysanız sonuç neredeyse her zaman bir ölçüm ya da işlem hatasına işaret eder."
      ],
      ul: [
        "Ürün tam kurutulmamıştır ve içinde su ya da çözücü kalmıştır.",
        "Ürün yan ürünlerle ya da artan tepkenle kirlenmiştir.",
        "Tartım hatası yapılmış, kabın darası düşülmemiştir.",
        "Teorik verim hesabında yanlış mol kütlesi ya da artan madde kullanılmıştır.",
        "Ürün havadaki nem ya da karbondioksitle tepkimeye girmiştir (örneğin CaO zamanla nem çeker)."
      ],
      after: [
        "Rapor yazarken %100'ü aşan sonucu düzeltmeye çalışmak yerine olası nedeni tartışmak bilimsel açıdan doğru yaklaşımdır. Bileşiklerdeki element oranlarının hesabı için [[bilgi:kutlece-yuzde-bilesim-nasil-bulunur|kütlece yüzde bileşim yazısı]] tamamlayıcı bir kaynaktır."
      ]
    },
    {
      h: "Laboratuvar güvenliği ve verim deneyleri",
      p: [
        "Okul laboratuvarında yapılan verim deneyleri öğretmen gözetiminde, koruyucu gözlük ve önlükle yapılmalıdır. Isıtma gerektiren ayrışma tepkimelerinde sıcak kaplar yanığa, oluşan gazlar ise kapalı ortamda solunum sorunlarına yol açabilir. Kalsiyum oksit su ile şiddetli ısı açığa çıkararak tepkimeye girer ve cilt ile göz için tahriş edicidir.",
        "Kimyasallar etiketlerindeki tehlike simgelerine göre saklanmalı, artıklar lavaboya dökülmeden öğretmenin gösterdiği atık kabına konmalıdır. Evde kimyasal tepkime denemesi yapılmamalıdır.",
        "Verim ölçümünün güvenilir olması için ürün sabit tartıma gelene kadar kurutulur: aynı numune birkaç dakika arayla iki kez tartıldığında değer değişmiyorsa nem uzaklaşmış demektir. Tartımda kabın darası mutlaka düşülmeli ve aynı terazi kullanılmalıdır; küçük miktarlarla çalışırken 0,1 gramlık bir hata bile verimi birkaç puan oynatabilir."
      ]
    },
    {
      h: "Yüzde Verim aracını kullanma",
      ol: [
        "[[arac:yuzde-verim-hesapla|Yüzde Verim Hesaplama]] sayfasını açın.",
        "Gerçek verimi ve teorik verimi aynı birimde (gram ya da mol) girin; araç yüzde verimi verir.",
        "Ters yönde, beklenen verim yüzdesini ve teorik verimi girerek elde edilecek gerçek ürünü bulun.",
        "Belirli bir miktar ürün hedefliyorsanız, araç gereken teorik miktarı hesaplar; örneğin %90 verimle 150 g ürün için teorik olarak yaklaşık 166,7 g ürün oluşturacak kadar tepken gerekir."
      ]
    }
  ],
  faq: [
    ["Yüzde verim nedir?", "Yüzde verim, bir tepkimede gerçekte elde edilen ürün miktarının, denkleme göre elde edilebilecek en yüksek miktara oranının yüz katıdır. Bir kimyasal sürecin ne kadar etkin çalıştığını gösterir."],
    ["Yüzde verim nasıl hesaplanır?", "Gerçek verim teorik verime bölünür ve 100 ile çarpılır. 28 g teorik verime karşılık 25,2 g ürün elde edildiyse yüzde verim 25,2 bölü 28 çarpı 100, yani yüzde 90 olur."],
    ["Teorik verim nasıl bulunur?", "Denkleştirilmiş denklem yazılır, verilen kütle mol sayısına çevrilir, sınırlayıcı bileşen belirlenir ve mol oranıyla ürünün mol sayısı bulunur. Bu mol sayısı ürünün mol kütlesiyle çarpılınca teorik verim gram olarak elde edilir."],
    ["Sınırlayıcı bileşen nedir?", "Sınırlayıcı bileşen tepkimede ilk tükenen ve oluşabilecek ürün miktarını belirleyen maddedir. Her tepkenin mol sayısı kendi denklem katsayısına bölündüğünde en küçük sonucu veren madde sınırlayıcıdır."],
    ["Verim neden yüzde 100 olmaz?", "Tersinir tepkimeler dengede kalır, yan tepkimeler istenmeyen ürünler oluşturur, tepkimeler tamamlanmayabilir ve ürünün bir kısmı süzme, aktarma ve kurutma sırasında kaybolur. Bu nedenle gerçek verim genellikle teorik verimden düşüktür."],
    ["Yüzde 100'den büyük verim ne anlama gelir?", "Kütlenin korunumu nedeniyle saf ürün teorik verimi aşamaz. Yüzde 100'ün üzerindeki sonuç genellikle ürünün nemli ya da kirli olduğunu veya tartım ve hesap hatası yapıldığını gösterir."],
    ["Mol ve tanecik sayısı hesapta nasıl kullanılır?", "Kütle mol kütlesine bölünerek mol bulunur, mol Avogadro sayısı olan 6,022 çarpı 10 üzeri 23 ile çarpılarak tanecik sayısı elde edilir. Gazlarda normal koşullarda 1 mol yaklaşık 22,4 litre kabul edilir."],
    ["Laboratuvarda verim kaybının nedenleri nelerdir?", "Eksik tepkime, yan tepkimeler, ürünün kaplarda ve süzgeç kâğıdında kalması, sıçrama, kristallendirme ve yıkama sırasındaki kayıplar ile tepkenlerin saf olmaması laboratuvardaki başlıca verim kaybı nedenleridir."],
    ["Çok adımlı tepkimede toplam verim nasıl bulunur?", "Toplam verim, her adımın yüzde veriminin ondalık karşılıklarının çarpımıdır. Verimleri yüzde 80, 90 ve 95 olan üç adımlı bir sentezin toplam verimi yaklaşık yüzde 68,4 olur."]
  ],
  tools: ["yuzde-verim-hesapla", "mol-hesapla", "tanecik-sayisi-hesapla", "molar-kutle-hesapla"],
  related: ["mol-nedir-nasil-hesaplanir", "kutlece-yuzde-bilesim-nasil-bulunur", "ideal-gaz-denklemi-pv-nrt"],
  uyari: "laboratuvar deneyleri yalnızca öğretmen gözetiminde ve koruyucu ekipmanla yapılmalıdır",
  sources: [
    ["IUPAC – Compendium of Chemical Terminology (Gold Book)", "https://goldbook.iupac.org/"],
    ["MEB – Kimya Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
