export default {
  slug: "deprem-buyuklugu-ve-enerji-farki",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Deprem Büyüklüğü Nedir? 1 Birim Artış Kaç Kat Enerji Demek, Richter ve Mw",
  pageTitle: "Deprem Büyüklüğü Nedir? Richter, Mw ve Enerji Farkı",
  description: "Deprem büyüklüğü 1 birim artınca genlik 10 kat, enerji yaklaşık 31,6 kat artar. Richter ve Mw farkı, büyüklük–şiddet ayrımı ve kurumların farklı değerleri.",
  keywords: ["deprem büyüklüğü nedir", "richter ölçeği nedir", "deprem büyüklüğü enerji farkı", "büyüklük ve şiddet farkı", "moment büyüklüğü mw", "logaritmik ölçek nedir", "afad kandilli farklı büyüklük", "deprem enerjisi tnt"],
  lead: "Deprem büyüklüğü, bir depremin <strong>kaynağında açığa çıkan enerjiyi</strong> anlatan logaritmik bir sayıdır. Büyüklük 1 birim arttığında sismograflarda ölçülen yer hareketi genliği 10 kat, açığa çıkan enerji ise yaklaşık <strong>31,6 kat</strong> artar; 2 birim fark yaklaşık 1.000 kat enerji demektir. Bu yüzden 7 büyüklüğündeki bir deprem, 6 büyüklüğündekinin yaklaşık 32 katı, 5 büyüklüğündekinin yaklaşık 1.000 katı enerji açığa çıkarır. Günümüzde büyük depremler için Richter yerine moment büyüklüğü (Mw) kullanılır. Bu sayfa kavramları açıklamak içindir; resmî deprem bilgileri ve hazırlık rehberleri için AFAD'ı takip edin.",
  kisaCevap: [
    "Büyüklük depremin kaynağındaki enerjiyi, şiddet ise belirli bir yerde hissedilen sarsıntı ve hasarı anlatır.",
    "Büyüklük 1 artınca genlik 10 kat, enerji 10<sup>1,5</sup> ≈ 31,6 kat artar; 2 birim fark ≈ 1.000 kat enerjidir.",
    "0,2 birimlik fark bile enerjiyi yaklaşık 2 katına çıkarır; 6,0 ile 6,2 arasındaki fark küçük değildir.",
    "Yaklaşık enerji bağıntısı: log₁₀ E = 1,5 × M + 4,8 (E joule cinsinden).",
    "Richter ölçeği (ML) yerel ve orta büyüklükteki depremler için geliştirildi; büyük depremlerde moment büyüklüğü (Mw) kullanılır.",
    "Farklı kurumlar farklı istasyonlar, yöntemler ve büyüklük türleri kullandığı için ilk açıklanan değerler birkaç onda bir farklı olabilir."
  ],
  figure: {
    alt: "Deprem büyüklüğü 4'ten 8'e kadar her birim için açığa çıkan enerjinin göreli büyüklüğünü gösteren, her basamakta yaklaşık 31,6 kat büyüyen kareler; altında büyüklük 1 artınca genliğin 10 kat, enerjinin 31,6 kat, 2 artınca enerjinin 1000 kat arttığını gösteren kutular.",
    caption: "Her basamak bir öncekinin yaklaşık 31,6 katı enerji taşır. Bu yüzden ölçekteki küçük sayı farkları enerjide çok büyük farklara karşılık gelir. Değerler log E = 1,5M + 4,8 bağıntısıyla hesaplanan yaklaşık sismik enerjidir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Büyüklük arttıkça enerji nasıl büyür?</text>
  <g class="mid">
    <rect x="40" y="96" width="60" height="44" rx="6" class="sf sb"/>
    <text x="70" y="124" class="b">M4</text>
    <rect x="150" y="84" width="80" height="56" rx="6" class="ps"/>
    <text x="190" y="118" class="b">M5</text>
    <rect x="280" y="70" width="100" height="70" rx="6" class="oks"/>
    <text x="330" y="112" class="b">M6</text>
    <rect x="430" y="56" width="110" height="84" rx="6" class="a"/>
    <text x="485" y="104" class="b">M7</text>
    <rect x="590" y="44" width="110" height="96" rx="6" class="p"/>
    <text x="645" y="98" class="b sf lg">M8</text>
    <text x="70" y="162" class="sm">6,3 × 10¹⁰ J</text>
    <text x="190" y="162" class="sm">2,0 × 10¹² J</text>
    <text x="330" y="162" class="sm">6,3 × 10¹³ J</text>
    <text x="485" y="162" class="sm">2,0 × 10¹⁵ J</text>
    <text x="645" y="162" class="sm">6,3 × 10¹⁶ J</text>
    <g class="sm b p"><text x="125" y="80">×31,6</text><text x="255" y="66">×31,6</text><text x="405" y="52">×31,6</text><text x="565" y="40">×31,6</text></g>
  </g>
  <text x="360" y="186" class="sm mid mu">Kutuların boyutu ölçekli değildir; gerçek oran her adımda ≈ 31,6 kattır.</text>
  <line x1="40" y1="204" x2="680" y2="204" class="sb dash" fill="none"/>
  <g class="mid">
    <rect x="40" y="222" width="200" height="96" rx="10" class="sf sb"/>
    <text x="140" y="248" class="sm">Büyüklük farkı 0,2</text>
    <text x="140" y="278" class="lg b">≈ 2 kat</text>
    <text x="140" y="302" class="sm mu">enerji</text>
    <rect x="260" y="222" width="200" height="96" rx="10" class="ps"/>
    <text x="360" y="248" class="sm">Büyüklük farkı 1</text>
    <text x="360" y="278" class="lg b">≈ 31,6 kat</text>
    <text x="360" y="302" class="sm">enerji · 10 kat genlik</text>
    <rect x="480" y="222" width="200" height="96" rx="10" class="p"/>
    <text x="580" y="248" class="sm sf">Büyüklük farkı 2</text>
    <text x="580" y="278" class="lg b sf">≈ 1.000 kat</text>
    <text x="580" y="302" class="sm sf">enerji · 100 kat genlik</text>
  </g>
  <rect x="40" y="338" width="640" height="64" rx="10" class="oks"/>
  <text x="360" y="364" class="sm mid b">Büyüklük kaynaktaki enerjiyi anlatır; hasar ayrıca derinliğe,</text>
  <text x="360" y="386" class="sm mid b">uzaklığa, zemine ve yapı kalitesine bağlıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Deprem büyüklüğü nedir?",
      p: [
        "Deprem, yer kabuğundaki bir fay boyunca biriken gerilimin aniden boşalmasıyla oluşur. Bu boşalma sırasında açığa çıkan enerjinin bir kısmı sismik dalgalar olarak her yöne yayılır ve dünyanın dört bir yanındaki sismograflar tarafından kaydedilir. <strong>Deprem büyüklüğü</strong> (magnitüd), bu kayıtlardan hesaplanan ve depremin kaynağındaki enerjiyi tek bir sayıyla ifade eden ölçüdür.",
        "Büyüklük, depremin <em>kendisine</em> ait bir özelliktir; nerede ölçülürse ölçülsün tek bir değeri olması hedeflenir. Bir depremin Ankara'da, İzmir'de ya da yurt dışında kaydedilmesi büyüklüğünü değiştirmez. Buna karşılık o depremin her şehirde hissedilme biçimi farklıdır; bu da şiddet kavramıyla anlatılır."
      ]
    },
    {
      h: "Logaritmik ölçek ne demektir?",
      p: [
        "Deprem büyüklüğü <strong>logaritmik</strong> bir ölçektir. Doğrusal bir ölçekte 6, 3'ün iki katıdır; logaritmik ölçekte ise her bir birim artış, ölçülen büyüklüğün belirli bir <em>katla</em> çarpılması demektir. Deprem büyüklüğünde sismograf kaydındaki dalga genliği her birimde 10 katına çıkar. Böyle bir ölçek, birkaç milimetrelik mikro sarsıntılardan devasa depremlere kadar uzanan çok geniş bir aralığı 0 ile 9 arasındaki sayılarla kullanışlı biçimde göstermeyi sağlar.",
        "Aynı mantık asitlik için kullanılan pH ölçeğinde de vardır: pH değeri 1 düştüğünde asitlik 10 kat artar. İki ölçeğin arkasındaki matematik [[bilgi:logaritma-nasil-hesaplanir|logaritma nasıl hesaplanır]] ve [[bilgi:ph-nedir-nasil-hesaplanir|pH nedir]] yazılarında anlatılıyor. Logaritmik ölçeğin sezgiyle yanıltıcı olabilmesinin nedeni budur: 6 ile 7 arasındaki fark, 1 ile 2 arasındaki farkla aynı \"bir birim\" gibi görünse de gerçekte çok daha büyük bir enerji farkını temsil eder."
      ]
    },
    {
      h: "Büyüklük 1 artınca enerji kaç kat artar?",
      p: [
        "Sismologların kullandığı ilişkiye göre açığa çıkan sismik enerji, büyüklüğün 1,5 katı oranında logaritmik olarak artar. Bu, büyüklük 1 birim arttığında enerjinin 10<sup>1,5</sup> ≈ 31,6 katına çıkması demektir. Genlik ve enerji farklı oranlarda arttığı için \"1 birim = 10 kat\" ifadesi yalnızca sismograf kaydındaki dalga genliği için doğrudur; enerji için doğru oran yaklaşık 32'dir."
      ],
      formula: "Enerji oranı = 10^(1,5 × ΔM)\nGenlik oranı = 10^ΔM\nYaklaşık sismik enerji: log₁₀ E = 1,5 × M + 4,8 (E: joule)",
      table: {
        head: ["Büyüklük farkı (ΔM)", "Genlik oranı", "Enerji oranı"],
        rows: [
          ["0,1", "≈ 1,26 kat", "≈ 1,41 kat"],
          ["0,2", "≈ 1,58 kat", "≈ 2,0 kat"],
          ["0,5", "≈ 3,16 kat", "≈ 5,6 kat"],
          ["1,0", "10 kat", "≈ 31,6 kat"],
          ["1,5", "≈ 31,6 kat", "≈ 178 kat"],
          ["2,0", "100 kat", "≈ 1.000 kat"],
          ["3,0", "1.000 kat", "≈ 31.600 kat"]
        ],
        caption: "Oranlar büyük depremin küçük depreme oranıdır ve yalnızca büyüklük farkına bağlıdır."
      },
      after: [
        "Bu tablo, iki farklı kurumun aynı deprem için 0,1–0,2 fark eden değerler açıklamasının neden önemsiz olmadığını da gösterir: 0,2'lik fark, enerji tahmininde yaklaşık iki katlık bir fark demektir. İki büyüklüğü karşılaştırıp enerji ve genlik oranını görmek için [[arac:deprem-buyuklugu-enerji-hesapla|deprem büyüklüğü enerji hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Richter ölçeği nasıl çalışır?",
      p: [
        "Richter ölçeği, 1935'te sismolog Charles Richter tarafından Güney Kaliforniya'daki yerel depremleri karşılaştırmak için geliştirildi. Yöntem, belirli bir tip sismografta kaydedilen en büyük dalga genliğinin logaritmasını, depremin uzaklığına göre düzelterek tek bir sayıya çevirmeye dayanıyordu. Bugün bu yöntemin geliştirilmiş biçimine <strong>yerel büyüklük (ML)</strong> denir.",
        "Richter ölçeği orta büyüklükteki ve yakın depremler için hâlâ kullanışlıdır. Ancak yaklaşık 6,5–7 üzerindeki büyük depremlerde ölçülen dalga genlikleri artık enerjiyle orantılı büyümez; ölçek \"doyuma\" ulaşır ve büyük depremleri olduğundan küçük gösterir. Bu nedenle günümüzde basında \"Richter\" ifadesi yaygın olarak kullanılsa da büyük depremler için açıklanan değer çoğunlukla moment büyüklüğüdür."
      ]
    },
    {
      h: "Mw (moment büyüklüğü) nedir?",
      p: [
        "<strong>Moment büyüklüğü (Mw)</strong>, 1970'lerin sonunda geliştirilen ve doğrudan depremin fiziksel kaynağına dayanan bir ölçektir. Hesap, <strong>sismik moment</strong> (M₀) denen bir büyüklükten yapılır: fayın kayan yüzey alanı, fay boyunca ortalama kayma miktarı ve kayaçların sertliğinin çarpımı. Böylece büyüklük, dalga genliğine değil, fayda gerçekte ne kadar kırılma ve kayma olduğuna bağlanır."
      ],
      formula: "M₀ = μ × A × D (μ: kayaç sertliği, A: fay alanı, D: ortalama kayma)\nMw = (2/3) × (log₁₀ M₀ − 9,1), M₀ newton·metre cinsinden",
      after: [
        "Mw ölçeği doyuma ulaşmaz; en büyük depremleri de doğru biçimde ayırt eder. Ölçek, orta büyüklükteki depremlerde Richter değerleriyle yaklaşık uyumlu olacak şekilde tanımlanmıştır. Bu yüzden 5 civarındaki bir depremde ML ve Mw genellikle birbirine yakın çıkar, büyük depremlerde ise Mw daha güvenilir değeri verir. Mw formülündeki çok büyük M₀ değerlerini okumak için [[arac:bilimsel-gosterim-cevir|bilimsel gösterim çevirici]] işinizi kolaylaştırır."
      ]
    },
    {
      h: "Büyüklük ile şiddet arasındaki fark nedir?",
      p: [
        "<strong>Büyüklük</strong> depremin kaynağındaki enerjiyi anlatan tek bir sayıdır. <strong>Şiddet</strong> ise depremin belirli bir yerde insanlar, eşyalar ve yapılar üzerinde yarattığı etkiyi anlatır ve Roma rakamlarıyla I'den XII'ye kadar derecelendirilir. Avrupa Makrosismik Ölçeği (EMS-98) ve Değiştirilmiş Mercalli Ölçeği bu tür şiddet ölçekleridir.",
        "Aynı depremin şiddeti yerden yere değişir. Merkez üssüne yakın, yumuşak alüvyon zemin üzerindeki bir yerde şiddet yüksek olurken uzakta ve sağlam kaya zemin üzerindeki bir yerde çok daha düşük olabilir. Şiddeti belirleyen başlıca etkenler deprem büyüklüğü, odak derinliği, merkez üssüne uzaklık, zemin özellikleri ve yapıların depreme dayanıklılığıdır. Bu yüzden iki deprem aynı büyüklükte olsa bile yol açtıkları hasar çok farklı olabilir."
      ],
      table: {
        head: ["Özellik", "Büyüklük (magnitüd)", "Şiddet"],
        rows: [
          ["Neyi anlatır?", "Kaynakta açığa çıkan enerji", "Belirli bir yerde hissedilen etki ve hasar"],
          ["Kaç değeri vardır?", "Her deprem için tek değer", "Her yer için ayrı değer"],
          ["Nasıl gösterilir?", "Ondalıklı sayı (ör. 6,4)", "Roma rakamı (ör. VII)"],
          ["Nasıl belirlenir?", "Sismograf kayıtlarından hesapla", "Gözlem, anket, hasar tespiti, ivme kayıtları"],
          ["Neye bağlıdır?", "Fay alanı ve kayma miktarı", "Büyüklük, derinlik, uzaklık, zemin, yapı kalitesi"]
        ]
      }
    },
    {
      h: "Farklı kurumlar neden farklı büyüklük açıklar?",
      p: [
        "Türkiye'de depremleri AFAD (Afet ve Acil Durum Yönetimi Başkanlığı) ile Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü ayrı ayrı izler; uluslararası kurumlar da kendi değerlerini yayımlar. Aynı deprem için açıklanan değerlerin birkaç onda bir farklı olması olağandır ve bunun birkaç nedeni vardır.",
        "Birincisi, kurumlar farklı istasyon ağlarının verilerini kullanır; istasyonların sayısı, konumu ve depreme uzaklığı sonucu etkiler. İkincisi, farklı <strong>büyüklük türleri</strong> (ML, Mw, Md gibi) farklı yöntemlerle hesaplanır ve aynı depremde birbirinden biraz farklı sonuç verebilir. Üçüncüsü, ilk dakikalarda açıklanan değerler otomatik ve hızlı hesaplamalara dayanır; daha fazla veri geldikçe değerler gözden geçirilip güncellenebilir.",
        "Türkiye'de afet yönetiminden sorumlu resmî kurum AFAD'dır. Deprem bilgileri, toplanma alanları ve afete hazırlık konusunda resmî açıklamaları ve rehberleri esas almanız önerilir."
      ]
    },
    {
      h: "Deprem enerjisi atom bombasıyla nasıl karşılaştırılır?",
      p: [
        "Enerji büyüklüklerini somutlaştırmak için sık kullanılan bir yol TNT eşdeğeridir: 1 ton TNT yaklaşık 4,184 × 10⁹ joule enerjiye karşılık gelir. log E = 1,5M + 4,8 bağıntısıyla hesaplanan sismik enerjiye göre 6 büyüklüğündeki bir deprem yaklaşık 6,3 × 10¹³ joule, yani yaklaşık 15 kiloton TNT eşdeğeri enerji yayar. 7 büyüklüğünde bu değer yaklaşık 480 kiloton, 8 büyüklüğünde yaklaşık 15 megaton TNT eşdeğerine çıkar."
      ],
      table: {
        head: ["Büyüklük", "Yaklaşık sismik enerji", "Yaklaşık TNT eşdeğeri"],
        rows: [
          ["4,0", "6,3 × 10¹⁰ J", "≈ 15 ton"],
          ["5,0", "2,0 × 10¹² J", "≈ 480 ton"],
          ["6,0", "6,3 × 10¹³ J", "≈ 15 kiloton"],
          ["7,0", "2,0 × 10¹⁵ J", "≈ 480 kiloton"],
          ["8,0", "6,3 × 10¹⁶ J", "≈ 15 megaton"]
        ],
        caption: "Değerler yalnızca sismik dalgalarla yayılan yaklaşık enerjiyi gösterir; fay boyunca ısı ve kırılmaya harcanan enerji bu hesapta yoktur."
      },
      after: [
        "Bu karşılaştırmanın sınırlarını bilmek önemlidir. Bir patlamanın enerjisi tek bir noktada ve çok kısa sürede açığa çıkarken deprem enerjisi kilometrelerce uzunluktaki bir fay boyunca saniyeler ya da dakikalar içinde boşalır ve yer altında derinlerde yayılır. Bu yüzden iki olayın etkileri birbirine benzemez; karşılaştırma yalnızca enerji ölçeğini kavramaya yardımcı bir benzetmedir."
      ],
      note: "Bu sayfa deprem büyüklüğü kavramını açıklamak amacıyla hazırlanmıştır ve hiçbir deprem tahmini içermez. Depremlerin zamanı, yeri ve büyüklüğü bugün bilimsel olarak önceden kesin biçimde bilinemez; sosyal medyada dolaşan tarihli \"deprem tahminleri\"ne itibar etmeyin. Resmî bilgi, deprem çantası hazırlığı, toplanma alanları ve \"Çök, Kapan, Tutun\" gibi hayat kurtaran davranışlar için AFAD'ın duyurularını ve eğitim materyallerini takip edin."
    }
  ],
  faq: [
    ["Deprem büyüklüğü nedir?", "Deprem büyüklüğü, bir depremin kaynağında açığa çıkan enerjiyi sismograf kayıtlarından hesaplayarak tek bir sayıyla ifade eden logaritmik ölçüdür. Her deprem için tek bir değeri vardır ve depremin nerede ölçüldüğüne bağlı olarak değişmesi beklenmez."],
    ["Richter ölçeği nasıl çalışır?", "Richter ölçeği, sismograftaki en büyük dalga genliğinin logaritmasını depremin uzaklığına göre düzelterek büyüklüğü hesaplar. 1935'te yerel depremler için geliştirilmiştir; büyük depremlerde doyuma ulaştığı için bugün büyük depremlerde moment büyüklüğü kullanılır."],
    ["Büyüklük 1 artınca enerji kaç kat artar?", "Büyüklük 1 birim arttığında sismograftaki dalga genliği 10 kat, açığa çıkan enerji ise yaklaşık 31,6 kat artar. Büyüklük 2 birim arttığında enerji yaklaşık 1.000 katına çıkar; 0,2 birimlik fark bile enerjiyi yaklaşık iki katına çıkarır."],
    ["Büyüklük ile şiddet arasındaki fark nedir?", "Büyüklük depremin kaynağındaki enerjiyi anlatır ve tek bir değerdir. Şiddet ise belirli bir yerde hissedilen sarsıntıyı ve hasarı anlatır, I'den XII'ye kadar Roma rakamlarıyla gösterilir ve uzaklık, derinlik, zemin ve yapı kalitesine göre yerden yere değişir."],
    ["Mw (moment büyüklüğü) nedir?", "Moment büyüklüğü, fayın kayan yüzey alanı, ortalama kayma miktarı ve kayaç sertliğinden hesaplanan sismik momente dayanan ölçektir. Büyük depremlerde doyuma ulaşmadığı için günümüzde özellikle büyük depremlerin büyüklüğü Mw olarak açıklanır."],
    ["AFAD ve Kandilli neden farklı büyüklük açıklar?", "Kurumlar farklı istasyon ağlarının verilerini, farklı hesaplama yöntemlerini ve ML, Mw gibi farklı büyüklük türlerini kullanır. İlk değerler otomatik hesaplamalara dayanır ve veri geldikçe güncellenebilir; Türkiye'de afet yönetiminde resmî kurum AFAD'dır."],
    ["Deprem enerjisi atom bombasıyla nasıl karşılaştırılır?", "Sismik enerji TNT eşdeğeriyle karşılaştırılabilir: 6 büyüklüğündeki bir deprem yaklaşık 15 kiloton, 7 büyüklüğündeki yaklaşık 480 kiloton TNT eşdeğeri sismik enerji yayar. Ancak deprem enerjisi geniş bir fay boyunca ve derinde boşaldığı için etkileri patlamaya benzemez."],
    ["Logaritmik ölçek ne demektir?", "Logaritmik ölçekte her birim artış, ölçülen niceliğin sabit bir katla çarpılması anlamına gelir. Deprem büyüklüğünde her birim dalga genliğini 10 kat artırır. Bu sayede çok küçük ve çok büyük depremler 0 ile 9 arasındaki sayılarla gösterilebilir."],
    ["Depremler önceden tahmin edilebilir mi?", "Hayır, bugün bilimsel olarak bir depremin zamanı, yeri ve büyüklüğü önceden kesin biçimde bilinemez. Bilim insanları bölgelerin uzun dönem deprem tehlikesini değerlendirebilir; resmî bilgi ve hazırlık rehberleri için AFAD'ın duyurularını takip etmek gerekir."]
  ],
  tools: ["deprem-buyuklugu-enerji-hesapla", "us-logaritma-hesapla", "bilimsel-gosterim-cevir"],
  related: ["logaritma-nasil-hesaplanir", "ph-nedir-nasil-hesaplanir", "kinetik-ve-potansiyel-enerji"],
  sources: [
    ["AFAD – Afet ve Acil Durum Yönetimi Başkanlığı", "https://www.afad.gov.tr/"],
    ["AFAD – Deprem Dairesi Başkanlığı, son depremler", "https://deprem.afad.gov.tr/"],
    ["Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü", "https://www.koeri.boun.edu.tr/"]
  ]
};
