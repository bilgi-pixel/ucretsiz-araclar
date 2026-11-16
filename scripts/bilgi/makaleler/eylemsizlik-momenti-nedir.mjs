export default {
  slug: "eylemsizlik-momenti-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Eylemsizlik Momenti Nedir? Disk, Küre ve Çubuk İçin Formüller",
  pageTitle: "Eylemsizlik Momenti Nedir? Disk, Küre, Çubuk Formülleri",
  description: "Eylemsizlik momenti, bir cismin dönmeye karşı direncidir: I = Σ m·r². Disk, halka, küre ve çubuk formülleri, paralel eksen teoremi, tork ve çözümlü örnekler.",
  keywords: ["eylemsizlik momenti nedir", "eylemsizlik momenti formülü", "disk eylemsizlik momenti", "küre eylemsizlik momenti", "çubuk eylemsizlik momenti", "paralel eksen teoremi", "tork açısal ivme", "dönme kinetik enerjisi"],
  lead: "Eylemsizlik momenti (I), bir cismin belirli bir eksen etrafında <strong>dönmeye başlamaya ya da dönüş hızını değiştirmeye karşı gösterdiği dirençtir</strong>; doğrusal harekette kütlenin oynadığı rolü dönmede üstlenir. Cismi oluşturan her küçük kütlenin, eksene uzaklığının karesiyle çarpılıp toplanmasıyla bulunur: I = Σ m·r². Bu yüzden aynı kütle eksenden uzağa yayıldıkça eylemsizlik momenti hızla büyür. Bu sayfada disk, halka, küre ve çubuk formüllerini, paralel eksen teoremini, tork ile açısal ivme ilişkisini ve node ile doğrulanmış çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Tanım: I = Σ mᵢ·rᵢ²; birim kg·m². Noktasal kütle için I = m·r².",
    "Dolu disk ya da silindir (simetri ekseni): I = ½·m·r²; ince halka: I = m·r².",
    "Dolu küre: I = (2/5)·m·r²; ince küresel kabuk: I = (2/3)·m·r².",
    "İnce çubuk, ortasından dik eksen: I = (1/12)·m·L²; ucundan: I = (1/3)·m·L².",
    "Paralel eksen teoremi: I = I<sub>kütle merkezi</sub> + m·d².",
    "Dönme için Newton yasası: τ = I·α; dönme kinetik enerjisi: E = ½·I·ω²."
  ],
  figure: {
    alt: "Aynı kütle ve yarıçaptaki dört cismin eylemsizlik momenti katsayıları çubuk grafikle karşılaştırılıyor: dolu küre 0,4, küresel kabuk 0,67, dolu disk 0,5 ve ince halka 1. Altta 2 kilogram, 0,3 metre örneği için disk 0,09 ve halka 0,18 kg·m².",
    caption: "I = k·m·r² biçimindeki formüllerde k katsayısı kütlenin eksene göre nasıl dağıldığını gösterir. Kütlesi kenarda toplanan halka en büyük, merkeze yakın toplanan dolu küre en küçük katsayıya sahiptir. Örnek değerler m = 2 kg, r = 0,3 m içindir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Kütle eksenden uzaklaştıkça I büyür</text>
  <text x="360" y="52" class="sm mid mu">I = k × m × r² (aynı m ve r için k karşılaştırması)</text>
  <line x1="60" y1="300" x2="680" y2="300" class="st" fill="none"/>
  <g class="mid">
    <circle cx="140" cy="94" r="30" class="ps"/><circle cx="140" cy="94" r="4" class="p"/>
    <rect x="105" y="220" width="70" height="80" class="oks"/><text x="140" y="212" class="b">0,40</text>
    <text x="140" y="322" class="b">Dolu küre</text><text x="140" y="340" class="sm">2/5</text>
    <circle cx="290" cy="94" r="30" class="sf sp sw"/>
    <rect x="255" y="166" width="70" height="134" class="ps"/><text x="290" y="158" class="b">0,67</text>
    <text x="290" y="322" class="b">Küresel kabuk</text><text x="290" y="340" class="sm">2/3</text>
    <ellipse cx="440" cy="94" rx="34" ry="14" class="ps"/><ellipse cx="440" cy="88" rx="34" ry="14" class="sf sb"/>
    <rect x="405" y="200" width="70" height="100" class="ps"/><text x="440" y="192" class="b">0,50</text>
    <text x="440" y="322" class="b">Dolu disk</text><text x="440" y="340" class="sm">1/2</text>
    <ellipse cx="590" cy="94" rx="34" ry="14" class="sf sp sw"/>
    <rect x="555" y="100" width="70" height="200" class="p"/><text x="590" y="132" class="b sf">1,00</text>
    <text x="590" y="322" class="b">İnce halka</text><text x="590" y="340" class="sm">1</text>
  </g>
  <rect x="60" y="356" width="620" height="52" rx="10" class="sf sb"/>
  <text x="76" y="378" class="b">Örnek: m = 2 kg, r = 0,3 m (m·r² = 0,18 kg·m²)</text>
  <text x="76" y="398" class="sm">Disk: 0,5 × 0,18 = 0,09 · Halka: 1 × 0,18 = 0,18 · Dolu küre: 0,4 × 0,18 = 0,072 kg·m²</text>
</svg>`
  },
  sections: [
    {
      h: "Eylemsizlik momenti nedir?",
      p: [
        "Durgun bir arabayı itmek, boş bir alışveriş arabasını itmekten zordur; çünkü kütlesi, yani eylemsizliği daha büyüktür. Dönme hareketinde de benzer bir direnç vardır: ağır bir volanı döndürmeye başlatmak ya da hızla dönen bir tekerleği durdurmak çaba ister. Bu direncin ölçüsüne <strong>eylemsizlik momenti</strong> (dönme eylemsizliği) denir.",
        "Önemli fark şudur: doğrusal harekette yalnızca toplam kütle önemlidir; dönmede ise kütlenin <strong>eksene göre nasıl dağıldığı</strong> da belirleyicidir. Aynı kütledeki iki cisimden kütlesi eksenden uzakta toplanmış olan çok daha zor döner. Bu nedenle eylemsizlik momenti her zaman belirli bir dönme eksenine göre tanımlanır; aynı cismin farklı eksenlere göre farklı eylemsizlik momentleri vardır.",
        "Matematiksel tanım, cismi küçük kütle parçalarına bölüp her parçanın kütlesini eksene uzaklığının karesiyle çarpmak ve hepsini toplamaktır. Sürekli cisimlerde bu toplam integrale dönüşür."
      ],
      formula: "I = Σ mᵢ × rᵢ²   (sürekli cisimde I = ∫ r² dm)\nBirim: kg·m²"
    },
    {
      h: "Kütle dağılımı eylemsizlik momentini nasıl etkiler?",
      p: [
        "Formüldeki uzaklığın karesi, kütle dağılımının etkisini büyütür. Bir kütleyi eksenden iki kat uzağa taşımak, onun eylemsizlik momentine katkısını dört katına çıkarır. Basit bir örnekle görelim: 1 kg'lık iki noktasal kütle bir çubuğun iki ucunda, eksenden 0,5 m uzakta olsun. I = 2 × 1 × 0,5² = 0,5 kg·m². Aynı kütleler eksenden 0,25 m'ye çekilirse I = 2 × 1 × 0,25² = 0,125 kg·m² olur; dörtte birine iner.",
        "Mühendisler bu özelliği bilinçli olarak kullanır. Volanlarda kütle kenara toplanır ki az malzemeyle çok enerji depolanabilsin. Bisiklet jantlarında ise hafiflik istenir, çünkü jantın kenardaki kütlesi hızlanmayı en çok zorlaştıran kısımdır. Kütle ile ağırlık arasındaki farkı hatırlamak için [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Disk, halka, küre ve çubuk için formüller",
      table: {
        head: ["Cisim ve eksen", "Formül", "k katsayısı"],
        rows: [
          ["Noktasal kütle, eksene r uzaklıkta", "I = m·r²", "1"],
          ["İnce halka ya da ince cidarlı boru (simetri ekseni)", "I = m·r²", "1"],
          ["Dolu disk ya da dolu silindir (simetri ekseni)", "I = ½·m·r²", "0,5"],
          ["Kalın cidarlı boru (iç yarıçap r₁, dış r₂)", "I = ½·m·(r₁² + r₂²)", "—"],
          ["Dolu küre (çap ekseni)", "I = (2/5)·m·r²", "0,4"],
          ["İnce küresel kabuk (çap ekseni)", "I = (2/3)·m·r²", "≈ 0,667"],
          ["İnce çubuk, ortasından dik eksen", "I = (1/12)·m·L²", "—"],
          ["İnce çubuk, ucundan dik eksen", "I = (1/3)·m·L²", "—"],
          ["Dikdörtgen levha (a × b), merkezden yüzeye dik eksen", "I = (1/12)·m·(a² + b²)", "—"]
        ],
        caption: "Formüller homojen (yoğunluğu her yerde aynı) cisimler içindir."
      },
      after: [
        "Dolu disk ve halkanın formülleri neden farklıdır? Halkada tüm kütle tam r uzaklıktadır, bu yüzden I = m·r². Diskte ise kütle merkezden kenara kadar yayılmıştır; merkeze yakın parçalar çok az katkı yapar. Tüm parçaların katkısı integralle toplandığında ortalama etki r²'nin yarısına denk gelir ve I = ½·m·r² bulunur. Aynı mantık küre ile kabuk arasındaki farkı da açıklar."
      ]
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "Aşağıdaki örneklerin sonuçları hesaplanarak doğrulanmıştır."
      ],
      ol: [
        "<strong>Dolu disk:</strong> m = 2 kg, r = 0,3 m. I = ½ × 2 × 0,3² = ½ × 2 × 0,09 = <strong>0,09 kg·m²</strong>.",
        "<strong>İnce halka:</strong> Aynı kütle ve yarıçapla I = 2 × 0,09 = <strong>0,18 kg·m²</strong>; diskin iki katı.",
        "<strong>Dolu küre:</strong> m = 5 kg, r = 0,1 m. I = 0,4 × 5 × 0,01 = <strong>0,02 kg·m²</strong>.",
        "<strong>İnce çubuk, ortasından:</strong> m = 1,5 kg, L = 1,2 m. I = 1,5 × 1,44 ÷ 12 = <strong>0,18 kg·m²</strong>.",
        "<strong>Aynı çubuk, ucundan:</strong> I = 1,5 × 1,44 ÷ 3 = <strong>0,72 kg·m²</strong>; dört kat daha büyük."
      ],
      after: [
        "Son iki örnek, aynı cismin farklı eksenlere göre çok farklı eylemsizlik momentleri olabileceğini gösterir. Kendi değerlerinizle hesap yapmak için [[arac:eylemsizlik-momenti-hesapla|Eylemsizlik Momenti Hesaplama aracını]] kullanabilirsiniz; araç açısal hız verildiğinde dönme kinetik enerjisini de hesaplar."
      ]
    },
    {
      h: "Paralel eksen teoremi nedir?",
      p: [
        "Bir cismin kütle merkezinden geçen eksene göre eylemsizlik momentini biliyorsanız, ona paralel başka bir eksene göre momenti hesaplamak için integral almanız gerekmez. <strong>Paralel eksen (Steiner) teoremi</strong> bu hesabı tek adıma indirir:"
      ],
      formula: "I = I<sub>km</sub> + m × d²\nd: iki paralel eksen arasındaki uzaklık",
      after: [
        "Çubuk örneğiyle doğrulayalım: ortasından geçen eksene göre I<sub>km</sub> = 0,18 kg·m². Uç noktası ortadan d = 0,6 m uzaktadır. I = 0,18 + 1,5 × 0,6² = 0,18 + 0,54 = 0,72 kg·m². Bu, doğrudan (1/3)·m·L² formülüyle bulduğumuz sonuçla aynıdır. Teorem, kütle merkezinden geçen eksenin her zaman en küçük eylemsizlik momentini verdiğini de gösterir; çünkü m·d² terimi hiçbir zaman negatif olamaz."
      ]
    },
    {
      h: "Tork ile açısal ivme arasındaki ilişki",
      p: [
        "Doğrusal harekette Newton'un ikinci yasası F = m·a'dır. Dönmede kuvvetin yerini <strong>tork</strong> (τ), kütlenin yerini eylemsizlik momenti (I), ivmenin yerini açısal ivme (α) alır. Bu benzerlik, eylemsizlik momentinin neden \"dönme kütlesi\" olarak anıldığını açıklar. Doğrusal hareketteki karşılığı için [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] yazısına bakabilirsiniz."
      ],
      formula: "τ = I × α\nDönme kinetik enerjisi: E = ½ × I × ω²\nAçısal momentum: L = I × ω",
      table: {
        head: ["Doğrusal hareket", "Dönme hareketi"],
        rows: [
          ["Kütle m (kg)", "Eylemsizlik momenti I (kg·m²)"],
          ["Kuvvet F (N)", "Tork τ (N·m)"],
          ["İvme a (m/s²)", "Açısal ivme α (rad/s²)"],
          ["F = m·a", "τ = I·α"],
          ["E = ½·m·v²", "E = ½·I·ω²"],
          ["p = m·v", "L = I·ω"]
        ]
      },
      after: [
        "Örnek: 0,09 kg·m²'lik diski 10 rad/s² açısal ivmeyle hızlandırmak için τ = 0,09 × 10 = 0,9 N·m tork gerekir. Disk 20 rad/s hızla döndüğünde depoladığı enerji E = ½ × 0,09 × 20² = 18 J olur. Kuvvet ve kol uzunluğundan torku bulmak için [[arac:tork-hesapla|Tork Hesaplama aracını]], dönen cisimlerde merkezcil kuvvet için [[bilgi:merkezcil-kuvvet-ve-acisal-hiz|merkezcil kuvvet ve açısal hız]] yazısını kullanabilirsiniz."
      ]
    },
    {
      h: "Patenci kollarını kapatınca neden hızlanır?",
      p: [
        "Dış tork etki etmediğinde açısal momentum L = I·ω korunur. Buz patencisi kollarını açıkken dönmeye başlar; kollarını gövdesine çektiğinde kütlesinin bir kısmı eksene yaklaşır ve eylemsizlik momenti küçülür. L sabit kalacağı için açısal hız artmak zorundadır.",
        "Sayısal örnek: patencinin eylemsizlik momenti kollar açıkken 4 kg·m², kapalıyken 1,6 kg·m² olsun. Kollar açıkken saniyede 2 tur dönüyorsa, kolları kapattığında ω₂ = 4 × 2 ÷ 1,6 = 5 tur/s hızla döner. Bu sırada dönme kinetik enerjisi artar; fazladan enerji, patencinin kollarını içeri çekerken yaptığı işten gelir. Aynı ilke dalgıçların ve jimnastikçilerin havada dönüş hızını ayarlamasında da görülür."
      ]
    },
    {
      h: "Eğik düzlemde yuvarlanan cisimlerde hangisi önce iner?",
      p: [
        "Kaymadan yuvarlanan bir cisim, potansiyel enerjisinin bir kısmını öteleme, bir kısmını dönme kinetik enerjisine çevirir. Eylemsizlik momenti büyük olan cisim enerjinin daha büyük kısmını dönmeye harcar ve daha yavaş hızlanır. Sonuç, kütleden ve yarıçaptan bağımsızdır; yalnızca k katsayısına bağlıdır."
      ],
      formula: "v = √( 2·g·h ÷ (1 + k) ),  a = g·sin θ ÷ (1 + k)",
      table: {
        head: ["Cisim", "k", "1 m yükseklikten sonraki hız (g = 9,81 m/s²)", "Sıra"],
        rows: [
          ["Dolu küre", "0,40", "≈ 3,74 m/s", "1."],
          ["Dolu silindir / disk", "0,50", "≈ 3,62 m/s", "2."],
          ["İnce küresel kabuk", "0,67", "≈ 3,43 m/s", "3."],
          ["İnce halka / boru", "1,00", "≈ 3,13 m/s", "4."]
        ],
        caption: "Sürtünmesiz kayan bir blok aynı yükseklikten yaklaşık 4,43 m/s hıza ulaşırdı; yuvarlanan cisimlerin hepsi ondan yavaştır."
      },
      after: [
        "Yani aynı rampadan bırakılan dolu bir bilye, aynı çaptaki içi boş bir toptan ve bir halkadan önce aşağı iner. Enerji dönüşümünün temeli için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Günlük hayattan örnekler",
      ul: [
        "<strong>Kapı kolu:</strong> Kapıyı menteşeye yakın iterseniz zor açılır; tork kolu kısalır ama kapının eylemsizlik momenti değişmez, gereken açısal ivme için daha büyük kuvvet gerekir.",
        "<strong>Cambaz sırığı:</strong> İp cambazının uzun sırığı eylemsizlik momentini artırır; gövdenin dönmesi yavaşlar ve dengeyi düzeltmek için zaman kazanılır.",
        "<strong>Çamaşır makinesi tamburu:</strong> Kenarda toplanan çamaşırlar yüksek eylemsizlik momenti yaratır; motor bu yüzden sıkmaya kademeli olarak hızlanarak geçer.",
        "<strong>Beyzbol sopası ve çekiç:</strong> Aynı sopayı ince ucundan tutmak, kalın ucundan tutmaya göre çok daha zor savrulur; eksen değişince eylemsizlik momenti değişir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ekseni belirtmemek:</strong> Eylemsizlik momenti eksene göre tanımlıdır; \"çubuğun eylemsizlik momenti\" eksen söylenmeden eksiktir.",
        "<strong>Çapı yarıçap yerine koymak:</strong> Formüldeki r yarıçaptır; çap kullanmak sonucu dört katına çıkarır.",
        "<strong>Birimleri karıştırmak:</strong> Santimetre ve gram yerine metre ve kilogram kullanın; sonuç kg·m² çıkar.",
        "<strong>Paralel eksen teoremini kütle merkezi dışından uygulamak:</strong> Teorem yalnızca kütle merkezinden geçen eksenden başlayarak geçerlidir.",
        "<strong>Dönme dakikası ile rad/s'yi karıştırmak:</strong> Enerji ve tork formüllerinde ω rad/s olmalıdır; 1 devir/dk = 2π ÷ 60 rad/s."
      ]
    }
  ],
  faq: [
    ["Eylemsizlik momenti nedir?", "Bir cismin belirli bir eksen etrafında dönmeye başlamaya ya da dönüş hızını değiştirmeye karşı gösterdiği dirençtir. Her küçük kütlenin eksene uzaklığının karesiyle çarpılıp toplanmasıyla bulunur ve birimi kg·m²'dir."],
    ["Kütle dağılımı eylemsizlik momentini nasıl etkiler?", "Uzaklığın karesi formüle girdiği için kütle eksenden uzaklaştıkça eylemsizlik momenti hızla büyür. Bir kütleyi iki kat uzağa taşımak, onun katkısını dört katına çıkarır."],
    ["Dolu disk ve halkanın formülleri neden farklıdır?", "Halkada tüm kütle tam yarıçap uzaklığında durur ve I = m·r² olur. Diskte kütle merkezden kenara yayıldığı için merkeze yakın parçaların katkısı azdır; integral sonucu I = ½·m·r² bulunur."],
    ["Küre için eylemsizlik momenti nasıl hesaplanır?", "Dolu homojen bir kürenin çap eksenine göre eylemsizlik momenti I = (2/5)·m·r² formülüyle bulunur. Örneğin 5 kg kütleli, 0,1 m yarıçaplı bir küre için I = 0,02 kg·m² çıkar; ince kabukta katsayı 2/3'tür."],
    ["Paralel eksen teoremi nedir?", "Kütle merkezinden geçen eksene göre momenti bilinen bir cismin, ona paralel ve d uzaklıktaki bir eksene göre momenti I = I_km + m·d² ile bulunur. Ortasından 0,18 kg·m² olan çubuk ucundan 0,72 kg·m² olur."],
    ["Tork ile açısal ivme arasındaki ilişki nedir?", "Dönme için Newton yasası τ = I·α biçimindedir: tork, eylemsizlik momenti ile açısal ivmenin çarpımıdır. 0,09 kg·m²'lik bir diski 10 rad/s² ivmeyle hızlandırmak için 0,9 N·m tork gerekir."],
    ["Patenci kollarını kapatınca neden hızlanır?", "Dış tork olmadığında açısal momentum korunur. Kollar kapanınca eylemsizlik momenti küçülür ve açısal hız aynı oranda artar; eylemsizlik momenti 4'ten 1,6 kg·m²'ye inerse dönüş hızı 2,5 katına çıkar."],
    ["Eğik düzlemde yuvarlanan cisimlerde hangisi önce iner?", "Eylemsizlik momenti katsayısı en küçük olan dolu küre önce iner; onu dolu silindir, küresel kabuk ve halka izler. Sonuç kütleden ve yarıçaptan bağımsızdır, yalnızca kütle dağılımına bağlıdır."],
    ["Eylemsizlik momentinin birimi nedir?", "SI biriminde kilogram çarpı metre kare, yani kg·m²'dir. Formüllerde kütleyi kilogram, uzunluğu metre olarak yazmak gerekir; gram ve santimetre kullanılırsa sonuç farklı birimde çıkar."]
  ],
  tools: ["eylemsizlik-momenti-hesapla", "tork-hesapla", "merkezcil-kuvvet-hesapla"],
  related: ["newtonun-hareket-yasalari", "merkezcil-kuvvet-ve-acisal-hiz", "kinetik-ve-potansiyel-enerji", "momentum-ve-itme-nedir"],
  sources: [
    ["MEB – Ortaöğretim Fizik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
