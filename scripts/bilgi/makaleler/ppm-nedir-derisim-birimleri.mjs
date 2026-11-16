export default {
  slug: "ppm-nedir-derisim-birimleri",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "PPM Nedir? Yüzde Derişim, Molalite ve PPM Arasında Çeviri Rehberi",
  pageTitle: "PPM Nedir? 1 ppm Kaç mg/L, PPM Yüzde Çevirme ve Derişim",
  description: "PPM milyonda bir kısım demektir: 1 ppm = 1 mg/kg, sulu çözeltide yaklaşık 1 mg/L. %1 = 10.000 ppm. Kütlece yüzde, ppb, molalite, molarite ve TDS örnekleri.",
  keywords: ["ppm nedir", "1 ppm kaç mg/l", "ppm yüzde çevirme", "kütlece yüzde derişim", "molalite nedir", "molalite molarite farkı", "tds ppm su", "ppb nedir"],
  lead: "PPM (parts per million), <strong>milyonda bir kısım</strong> anlamına gelen bir derişim birimidir: 1 ppm, 1 kilogram karışımın içinde 1 miligram madde bulunması demektir ve yoğunluğu suya yakın seyreltik çözeltilerde <strong>1 mg/L</strong>'ye eşit kabul edilir. Yüzdeyle ilişkisi basittir: %1 = 10.000 ppm, 1 ppm = %0,0001. Bu rehberde ppm, ppb, kütlece yüzde, molarite ve molalite arasındaki farkları, birbirine nasıl çevrildiklerini ve içme suyundaki TDS, havuz kloru ya da gübre karışımı gibi günlük örnekleri çözümlü olarak bulacaksınız.",
  kisaCevap: [
    "1 ppm = 1 mg madde / 1 kg karışım = 10<sup>−6</sup>; sulu ve seyreltik çözeltilerde 1 ppm ≈ 1 mg/L.",
    "Yüzde ile çeviri: ppm = yüzde × 10.000; yüzde = ppm ÷ 10.000.",
    "1 ppb (milyarda bir) = 1 µg/kg = 0,001 ppm; 1.000 ppb = 1 ppm.",
    "Kütlece yüzde derişim = çözünen kütlesi ÷ çözelti kütlesi × 100.",
    "Molarite (M) = mol ÷ litre çözelti; molalite (m) = mol ÷ kilogram çözücü.",
    "Gazlarda ppm genellikle hacimce ifade edilir (ppmv); havadaki CO<sub>2</sub> yaklaşık 420 ppm düzeyindedir."
  ],
  figure: {
    alt: "Derişim birimleri merdiveni: yüzde, binde (promil), ppm ve ppb; her basamağın bir öncekine göre kaç kat küçük olduğu ve 1 litre suda karşılık gelen miktarlar: yüzde 1 eşittir 10 gram, 1 ppm eşittir 1 miligram, 1 ppb eşittir 1 mikrogram.",
    caption: "Her basamak bir öncekinden 10 ya da 1.000 kat küçüktür. Sağ sütun, yoğunluğu 1 kg/L kabul edilen 1 litre su için her birimin kaç gram ya da miligram maddeye karşılık geldiğini gösterir: %1 = 10 g, 1 ppm = 1 mg.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Derişim birimleri merdiveni</text>
  <text x="40" y="62" class="sm mu">Birim</text>
  <text x="260" y="62" class="sm mu">Oran</text>
  <text x="560" y="62" class="sm mu mid">1 litre suda</text>
  <rect x="30" y="74" width="660" height="56" rx="8" class="p"/>
  <text x="50" y="108" class="lg b sf">%1 (yüzde)</text>
  <text x="260" y="108" class="b sf">1 / 100</text>
  <text x="560" y="108" class="lg b mid sf">10 g</text>
  <rect x="30" y="144" width="660" height="56" rx="8" class="ps"/>
  <text x="50" y="178" class="lg b">‰1 (binde)</text>
  <text x="260" y="178" class="b">1 / 1.000</text>
  <text x="560" y="178" class="lg b mid">1 g</text>
  <rect x="30" y="214" width="660" height="56" rx="8" class="oks"/>
  <text x="50" y="248" class="lg b">1 ppm</text>
  <text x="260" y="248" class="b">1 / 1.000.000</text>
  <text x="560" y="248" class="lg b mid">1 mg</text>
  <rect x="30" y="284" width="660" height="56" rx="8" class="sf sb"/>
  <text x="50" y="318" class="lg b">1 ppb</text>
  <text x="260" y="318" class="b">1 / 1.000.000.000</text>
  <text x="560" y="318" class="lg b mid">1 µg</text>
  <g class="sm p b">
    <text x="700" y="140" class="end">÷10</text>
    <text x="700" y="210" class="end">÷1.000</text>
    <text x="700" y="280" class="end">÷1.000</text>
  </g>
  <rect x="30" y="356" width="660" height="58" rx="8" class="sf sb"/>
  <text x="360" y="380" class="b mid">%1 = 10.000 ppm · %0,1 = 1.000 ppm · %0,0001 = 1 ppm</text>
  <text x="360" y="402" class="sm mid t2">mg/L eşitliği yoğunluğu suya yakın seyreltik çözeltiler için geçerlidir</text>
</svg>`
  },
  sections: [
    {
      h: "PPM nedir?",
      p: [
        "PPM, İngilizce \"parts per million\" ifadesinin kısaltmasıdır ve Türkçede <strong>milyonda bir kısım</strong> demektir. Yüzde (yüzde bir kısım) ve binde (promil) gibi bir orandır; tek farkı paydanın bir milyon olmasıdır. Çok küçük miktarları yüzdeyle yazmak zahmetli olduğu için ppm kullanılır: %0,0035 yazmak yerine 35 ppm demek hem kolay hem anlaşılırdır.",
        "Katı ve sıvılarda ppm genellikle <strong>kütle</strong> oranıdır: 1 ppm = 1 mg madde / 1 kg karışım. Suyun yoğunluğu yaklaşık 1 kg/L olduğu için seyreltik sulu çözeltilerde 1 kg yerine 1 L yazılabilir; bu yüzden su analizlerinde ppm ile mg/L birbirinin yerine kullanılır. Gazlarda ise ppm çoğunlukla <strong>hacim</strong> oranıdır (ppmv): havadaki karbondioksitin yaklaşık 420 ppm olması, 1 milyon hacim havanın yaklaşık 420 hacminin CO<sub>2</sub> olduğu anlamına gelir.",
        "Bir büyüklüğün ppm olarak ne kadar küçük olduğunu canlandırmak için şu karşılaştırma işe yarar: 1 ppm, yaklaşık 11,5 günün içindeki tek bir saniyeye ya da 1 ton suyun içine eklenen tek bir grama karşılık gelir. Bu yüzden ppm; içme suyundaki mineraller, topraktaki besin elementleri, gıdalardaki katkı ve kalıntı maddeleri ile havadaki gazlar gibi alanlarda, yüzdenin çok kaba kaldığı durumlarda tercih edilir. Değer büyüdükçe yeniden yüzdeye dönmek okunurluğu artırır: 25.000 ppm yerine %2,5 yazmak daha anlaşılırdır."
      ]
    },
    {
      h: "1 ppm kaç mg/L'dir? Temel eşitlikler",
      table: {
        head: ["Birim", "Kütle ile", "Sulu çözeltide (yaklaşık)", "Ondalık oran"],
        rows: [
          ["%1", "10 g/kg", "10.000 mg/L", "0,01"],
          ["‰1 (binde)", "1 g/kg", "1.000 mg/L", "0,001"],
          ["1 ppm", "1 mg/kg", "1 mg/L", "0,000001"],
          ["1 ppb", "1 µg/kg", "1 µg/L", "0,000000001"],
          ["1 ppt", "1 ng/kg", "1 ng/L", "10<sup>−12</sup>"]
        ],
        caption: "µg mikrogram (gramın milyonda biri), ng nanogramdır (gramın milyarda biri)."
      },
      p: [
        "Bir çözeltinin yoğunluğu 1 kg/L'den belirgin biçimde farklıysa (ör. deniz suyu, şurup ya da derişik asit) mg/L ile mg/kg arasındaki eşitlik bozulur. Bu durumda mg/L değerini çözeltinin yoğunluğuna (kg/L) bölerek kütle temelli ppm'e çevirmek gerekir."
      ]
    },
    {
      h: "PPM yüzdeye nasıl çevrilir?",
      p: [
        "Yüzde, yüze bölmek; ppm, milyona bölmektir. Aradaki fark 10.000 kattır. Bu nedenle çeviri tek bir çarpma ya da bölmeyle yapılır."
      ],
      formula: "ppm = yüzde × 10.000\nyüzde = ppm ÷ 10.000\nppb = ppm × 1.000\nppm = mg çözünen ÷ kg çözelti",
      ol: [
        "%0,5'lik bir çözelti kaç ppm'dir? 0,5 × 10.000 = <strong>5.000 ppm</strong>.",
        "250 ppm kaç yüzdedir? 250 ÷ 10.000 = <strong>%0,025</strong>.",
        "0,02 ppm kaç ppb'dir? 0,02 × 1.000 = <strong>20 ppb</strong>.",
        "2 kg suda 0,5 g tuz çözünmüşse derişim kaç ppm'dir? 0,5 g = 500 mg; çözelti yaklaşık 2,0005 kg; 500 ÷ 2,0005 ≈ <strong>250 ppm</strong>."
      ],
      after: [
        "Bu dönüşümleri [[arac:ppm-yuzde-cevir|PPM Yüzde Çevirici]] ile anında yapabilir, çözünen ve çözelti miktarından doğrudan ppm bulmak için [[arac:ppm-hesapla|PPM Derişim Hesaplama]] aracını kullanabilirsiniz. Yüzde hesabının genel mantığı [[bilgi:oran-oranti-nasil-cozulur|oran ve orantı]] konusuyla aynıdır."
      ]
    },
    {
      h: "Kütlece yüzde derişim nasıl hesaplanır?",
      p: [
        "Kütlece yüzde, 100 gram çözeltide kaç gram çözünen bulunduğunu gösterir. Paydaya çözücünün değil, <strong>çözeltinin</strong> (çözünen + çözücü) kütlesi yazılır. Bu ayrım küçük derişimlerde önemsizdir ama derişim arttıkça belirginleşir."
      ],
      formula: "Kütlece % = çözünen kütlesi ÷ (çözünen + çözücü kütlesi) × 100\nGereken çözünen = hedef % × çözücü ÷ (100 − hedef %)",
      after: [
        "<strong>Örnek 1:</strong> 30 g şeker 170 g suda çözülürse çözelti 200 g olur ve kütlece yüzde 30 ÷ 200 × 100 = <strong>%15</strong>'tir. Paydaya yalnızca su yazılsaydı %17,6 gibi hatalı bir sonuç çıkardı.",
        "<strong>Örnek 2:</strong> 500 g suyla kütlece %10'luk tuzlu su hazırlamak için 10 × 500 ÷ 90 ≈ <strong>55,6 g</strong> tuz gerekir. Aynı mantık mutfakta da geçerlidir; turşu salamurasında çözelti yüzdesi ile su üzerinden yüzdenin farkını [[bilgi:tursu-salamura-tuz-orani|turşu salamura tuz oranı]] yazısında görebilirsiniz. Kimya ödevleri için [[arac:kutlece-yuzde-derisim-hesapla|Kütlece Yüzde Derişim Hesaplama]] aracı her iki yönde hesap yapar."
      ]
    },
    {
      h: "Molalite ile molarite farkı nedir?",
      p: [
        "Kimyada derişim çoğu zaman mol cinsinden ifade edilir, çünkü tepkimeler tanecik sayısıyla yürür. İki mol temelli birim sık karıştırılır:"
      ],
      table: {
        head: ["Birim", "Tanım", "Birimi", "Sıcaklıktan etkilenir mi?", "Kullanım"],
        rows: [
          ["Molarite (M)", "Çözünen mol ÷ çözelti hacmi (L)", "mol/L", "Evet, hacim sıcaklıkla değişir", "Laboratuvar çözeltileri, titrasyon"],
          ["Molalite (m)", "Çözünen mol ÷ çözücü kütlesi (kg)", "mol/kg", "Hayır, kütle değişmez", "Donma noktası alçalması, kaynama noktası yükselmesi"],
          ["Kütlece yüzde", "Çözünen g ÷ çözelti g × 100", "%", "Hayır", "Ticari ürünler, gıda, ilaç"],
          ["ppm", "Çözünen mg ÷ çözelti kg", "mg/kg", "Hayır (kütle temelliyse)", "Su analizi, iz elementler, gübre"]
        ]
      },
      after: [
        "<strong>Molalite örneği:</strong> 11,7 g NaCl (mol kütlesi 58,44 g/mol, yani 0,2 mol) 500 g suda çözülürse molalite 0,2 ÷ 0,5 = <strong>0,4 mol/kg</strong> olur. Molalite koligatif özellik sorularında kullanılır, çünkü donma ve kaynama noktası değişimi çözücü kütlesine bağlıdır. Bu hesap için [[arac:molalite-hesapla|Molalite Hesaplama]] aracını, molarite hesabının ayrıntıları için [[bilgi:molarite-nasil-hesaplanir|molarite nasıl hesaplanır]] yazısını kullanabilirsiniz.",
        "<strong>Molariteden ppm'e:</strong> Seyreltik sulu çözeltilerde ppm ≈ molarite × mol kütlesi × 1.000. Örneğin 0,01 M NaCl çözeltisi 0,01 × 58,44 × 1.000 ≈ <strong>584 ppm</strong> NaCl içerir."
      ]
    },
    {
      h: "İçme suyunda TDS kaç ppm olmalı?",
      p: [
        "TDS (toplam çözünmüş katı madde), sudaki çözünmüş tuzların, minerallerin ve diğer maddelerin toplamıdır ve genellikle ppm ya da mg/L olarak ifade edilir. Evde kullanılan TDS kalemleri aslında suyun elektriksel iletkenliğini ölçer ve bir katsayıyla ppm'e çevirir; bu yüzden sonuç yaklaşıktır.",
        "Dünya Sağlık Örgütü TDS için sağlık temelli bir sınır değer koymaz; ancak suyun lezzeti açısından genel bir sınıflama verir: yaklaşık 300 mg/L'nin altı mükemmel, 300–600 iyi, 600–900 orta, 900–1.200 zayıf, 1.200 mg/L üstü kabul edilemez lezzette kabul edilir. Çok düşük TDS'li su ise tatsız bulunabilir. Türkiye'de içme suyunun kalitesi İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik ile düzenlenir; yönetmelik TDS yerine iletkenlik ve tek tek maddeler için sınır değerler belirler.",
        "TDS değeri tek başına suyun güvenli olduğunu ya da olmadığını göstermez. Kurşun, arsenik, nitrat ya da mikrobiyolojik kirlilik düşük TDS'li suda da bulunabilir. Suyunuzun içilebilirliğinden emin değilseniz yetkili laboratuvar analizi yaptırın."
      ]
    },
    {
      h: "PPB nedir, havuz klorunda ppm ne anlama gelir?",
      p: [
        "<strong>PPB</strong> (parts per billion) milyarda bir kısımdır: 1 ppb = 0,001 ppm = 1 µg/L. Ağır metaller ve bazı kirleticiler çok düşük derişimlerde bile önem taşıdığı için ppb ile ölçülür. Örneğin içme suyunda arsenik ve kurşun için sınır değerler mikrogram/litre düzeyindedir; 10 µg/L, 10 ppb ya da 0,01 ppm ile aynı şeydir.",
        "<strong>Havuz klorunda</strong> ppm, suyun her litresinde kaç miligram serbest klor bulunduğunu gösterir. Yüzme havuzlarında serbest klor genellikle 1–3 ppm aralığında tutulur; umumi havuzlar için geçerli değerler Sağlık Bakanlığı mevzuatında belirlenir. Örneğin 50 m³ (50.000 L) suyu 1 ppm artırmak için 50.000 mg = 50 g aktif klor gerekir. Ürünün aktif klor oranı %65 ise 50 ÷ 0,65 ≈ 77 g ürün kullanılır. Klor ürünlerini kullanırken üretici talimatlarına ve güvenlik uyarılarına uyun.",
        "<strong>Gübre ve sulama</strong> uygulamalarında da ppm sık kullanılır: 10 litre suya 1 g madde eklemek 1.000 mg ÷ 10 L = 100 ppm derişim verir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Payda olarak çözücüyü kullanmak:</strong> Kütlece yüzde ve ppm çözeltinin toplam kütlesine göre hesaplanır.",
        "<strong>Her durumda ppm = mg/L demek:</strong> Bu eşitlik yalnızca yoğunluğu suya yakın, seyreltik çözeltilerde geçerlidir.",
        "<strong>Gaz ppm'ini kütle ppm'iyle karıştırmak:</strong> Hava kalitesi ölçümlerindeki ppm genellikle hacim oranıdır; mg/m³'e çevirmek için gazın mol kütlesi ve sıcaklık gerekir.",
        "<strong>Molarite ile molaliteyi karıştırmak:</strong> Molarite litre çözelti, molalite kilogram çözücü başınadır.",
        "<strong>Birim önekini kaçırmak:</strong> mg ile µg arasında 1.000 kat fark vardır; ppm ile ppb'yi karıştırmak sonucu bin kat saptırır."
      ]
    },
    {
      h: "Derişim hesaplarını araçlarla yapma",
      ol: [
        "Çözünen ve çözelti miktarınız varsa [[arac:ppm-hesapla|PPM Derişim Hesaplama]] aracına miktarları ve birimlerini girin; araç ppm, ppb ve yüzde karşılığını birlikte verir.",
        "Elinizde yüzde ya da ppm değeri varsa ve diğerine çevirmek istiyorsanız [[arac:ppm-yuzde-cevir|PPM Yüzde Çevirici]]yi kullanın.",
        "Belirli bir yüzdede çözelti hazırlamak için gereken maddeyi [[arac:kutlece-yuzde-derisim-hesapla|Kütlece Yüzde Derişim Hesaplama]] aracıyla bulun.",
        "Koligatif özellik soruları için önce [[arac:molalite-hesapla|Molalite Hesaplama]] aracıyla mol/kg değerini hesaplayın.",
        "Sonuçları birimlerin anlamını düşünerek kontrol edin: 1 litre suya birkaç gram madde eklediyseniz sonucun binlerce ppm olması gerekir."
      ]
    }
  ],
  faq: [
    ["PPM nedir?", "PPM, parts per million kısaltmasıdır ve milyonda bir kısım anlamına gelir. Katı ve sıvılarda 1 ppm, 1 kilogram karışımda 1 miligram madde bulunduğunu gösterir; gazlarda ise genellikle hacim oranı olarak kullanılır."],
    ["1 ppm kaç mg/L'dir?", "Yoğunluğu suya yakın seyreltik sulu çözeltilerde 1 ppm yaklaşık 1 mg/L'ye eşittir, çünkü 1 litre su yaklaşık 1 kilogramdır. Yoğunluğu farklı çözeltilerde mg/L değeri yoğunluğa bölünerek kütle temelli ppm bulunur."],
    ["PPM yüzdeye nasıl çevrilir?", "PPM değeri 10.000'e bölünerek yüzde bulunur; yüzde 10.000 ile çarpılarak ppm'e çevrilir. Örneğin 250 ppm yüzde 0,025'e, yüzde 0,5 ise 5.000 ppm'e karşılık gelir."],
    ["Kütlece yüzde derişim nasıl hesaplanır?", "Çözünen maddenin kütlesi, çözünen ile çözücünün toplam kütlesine bölünür ve 100 ile çarpılır. 30 gram şeker 170 gram suda çözülürse çözelti 200 gram olur ve kütlece derişim yüzde 15'tir."],
    ["Molalite ile molarite farkı nedir?", "Molarite bir litre çözeltideki çözünen mol sayısıdır ve sıcaklıkla değişir. Molalite bir kilogram çözücüdeki çözünen mol sayısıdır ve sıcaklıktan etkilenmez; bu yüzden donma ve kaynama noktası hesaplarında kullanılır."],
    ["İçme suyunda TDS kaç ppm olmalı?", "Dünya Sağlık Örgütü TDS için sağlık temelli sınır koymaz; lezzet açısından 300 mg/L altı mükemmel, 600'e kadar iyi, 1.200 üstü kabul edilemez sayılır. TDS suyun güvenliğini tek başına göstermez; kuşkuda laboratuvar analizi gerekir."],
    ["PPB nedir?", "PPB milyarda bir kısımdır ve 1 ppb, 0,001 ppm ya da yaklaşık 1 mikrogram/litreye eşittir. Kurşun, arsenik gibi çok düşük derişimde bile önemli olan maddeler ppb ile ölçülür."],
    ["Havuz klorunda ppm değeri ne anlama gelir?", "Havuz suyunun her litresinde kaç miligram serbest klor bulunduğunu gösterir. Genellikle 1–3 ppm aralığında tutulur; 50 metreküp suyu 1 ppm artırmak için yaklaşık 50 gram aktif klor gerekir. Umumi havuz değerleri mevzuatla belirlenir."],
    ["Havadaki CO2 kaç ppm?", "Atmosferdeki karbondioksit derişimi günümüzde yaklaşık 420 ppm düzeyindedir ve hacim oranı olarak ifade edilir. Kapalı ve havalandırılmayan odalarda insan solunumu nedeniyle bu değer birkaç bin ppm'e çıkabilir."]
  ],
  tools: ["ppm-hesapla", "ppm-yuzde-cevir", "kutlece-yuzde-derisim-hesapla", "molalite-hesapla"],
  related: ["molarite-nasil-hesaplanir", "mol-nedir-nasil-hesaplanir", "tursu-salamura-tuz-orani", "ph-nedir-nasil-hesaplanir"],
  sources: [
    ["Dünya Sağlık Örgütü – İçme suyu kalitesi kılavuzu", "https://www.who.int/publications/i/item/9789240045064"],
    ["Mevzuat Bilgi Sistemi – İnsani Tüketim Amaçlı Sular Hakkında Yönetmelik", "https://www.mevzuat.gov.tr/"]
  ]
};
