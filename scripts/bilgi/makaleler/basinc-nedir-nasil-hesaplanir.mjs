export default {
  slug: "basinc-nedir-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Basınç Nedir? Katı, Sıvı ve Gaz Basıncı Formülleri ve Birimleri",
  pageTitle: "Basınç Nedir? Katı, Sıvı ve Gaz Basıncı Formülleri",
  description: "Basınç birim yüzeye dik etki eden kuvvettir: katıda P = F/A, sıvıda P = d·g·h. Pascal, bar ve atm çevirme, açık hava basıncı ve 8. sınıf düzeyinde çözümlü örnekler.",
  keywords: ["basınç nedir", "basınç formülü", "sıvı basıncı formülü", "açık hava basıncı", "pascal nedir", "bar atm çevirme", "katı basıncı", "derinlik arttıkça basınç"],
  lead: "Basınç, <strong>birim yüzeye dik olarak etki eden kuvvettir ve katılarda kuvvetin yüzey alanına bölünmesiyle bulunur: P = F ÷ A</strong>. Birimi pascaldır (1 Pa = 1 N/m²). Sıvılarda basınç derinliğe ve sıvının yoğunluğuna bağlıdır: P = d · g · h. Deniz seviyesinde açık hava basıncı yaklaşık 1 atm = 101.325 Pa = 1,01325 bar'dır. 600 N ağırlığındaki bir kişi toplam 0,04 m² ayakkabı tabanıyla zemine 15.000 Pa basınç uygular. Aşağıda katı, sıvı ve gaz basıncını birim çevirmeleri ve 8. sınıf düzeyinde çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Katı basıncı: P = F ÷ A; kuvvet artarsa basınç artar, yüzey alanı artarsa basınç azalır.",
    "Basıncın SI birimi pascal (Pa): 1 Pa = 1 N/m²; 1 kPa = 1.000 Pa.",
    "Sıvı basıncı: P = d · g · h; yalnızca sıvının yoğunluğuna ve derinliğe bağlıdır, kabın şekline bağlı değildir.",
    "Açık hava basıncı deniz seviyesinde 1 atm = 101.325 Pa = 76 cmHg = 1,01325 bar'dır ve yükseldikçe azalır.",
    "1 bar = 100.000 Pa; 1 atm ≈ 1,013 bar; suda her 10 metre derinlik yaklaşık 1 atm ek basınç oluşturur.",
    "Kapalı kaptaki sıvıya uygulanan basınç her yöne aynen iletilir (Pascal ilkesi); hidrolik kriko ve fren buna dayanır."
  ],
  figure: {
    alt: "Üç basınç türü: 20 N ağırlıklı tuğla geniş yüzeyle 1.000 Pa, dar yüzeyle 4.000 Pa basınç yapar; suda 10 metre derinlikte sıvı basıncı 98.100 Pa; deniz seviyesinde açık hava basıncı 101.325 Pa, 76 cmHg.",
    caption: "Katıda basınç temas alanına, sıvıda derinliğe, açık havada yüksekliğe bağlıdır. Tuğla örneğinde g = 10 N/kg, su örneğinde g = 9,81 m/s² alınmıştır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="120" y="30" class="b mid">Katı: P = F ÷ A</text>
  <text x="360" y="30" class="b mid">Sıvı: P = d · g · h</text>
  <text x="600" y="30" class="b mid">Açık hava basıncı</text>
  <line x1="20" y1="260" x2="220" y2="260" class="st sw" fill="none"/>
  <rect x="30" y="200" width="100" height="60" class="p"/>
  <text x="80" y="236" class="sm mid sf b">20 N</text>
  <rect x="160" y="140" width="40" height="120" class="ps"/>
  <text x="180" y="204" class="sm mid b">20 N</text>
  <text x="80" y="284" class="sm mid">A = 0,02 m²</text>
  <text x="80" y="306" class="b mid p">1.000 Pa</text>
  <text x="180" y="284" class="sm mid">A = 0,005 m²</text>
  <text x="180" y="306" class="b mid p">4.000 Pa</text>
  <rect x="270" y="60" width="180" height="200" class="oks"/>
  <line x1="270" y1="60" x2="450" y2="60" class="sok sw" fill="none"/>
  <line x1="465" y1="60" x2="465" y2="230" class="sp" fill="none"/>
  <line x1="458" y1="230" x2="472" y2="230" class="sp" fill="none"/>
  <text x="472" y="150" class="sm b">h = 10 m</text>
  <circle cx="360" cy="230" r="8" class="p"/>
  <text x="360" y="284" class="sm mid">1.000 × 9,81 × 10</text>
  <text x="360" y="306" class="b mid p">98.100 Pa ≈ 0,97 atm</text>
  <rect x="540" y="60" width="120" height="200" rx="6" class="sf sb"/>
  <rect x="585" y="70" width="30" height="190" class="sf sb"/>
  <rect x="585" y="104" width="30" height="156" class="p"/>
  <text x="600" y="98" class="sm mid mu">boşluk</text>
  <line x1="620" y1="104" x2="660" y2="104" class="sp dash" fill="none"/>
  <text x="664" y="180" class="sm">76 cm</text>
  <text x="600" y="284" class="sm mid">deniz seviyesi, 0 °C</text>
  <text x="600" y="306" class="b mid p">101.325 Pa</text>
  <rect x="20" y="334" width="680" height="72" rx="10" class="sf sb"/>
  <text x="360" y="362" class="b mid">1 atm = 101.325 Pa = 1,01325 bar = 76 cmHg</text>
  <text x="360" y="388" class="sm mid t2">1 bar = 100.000 Pa · 1 kPa = 1.000 Pa · 1 hPa = 1 milibar</text>
</svg>`
  },
  sections: [
    {
      h: "Basınç nedir?",
      p: [
        "Basınç, bir yüzeye dik olarak etki eden kuvvetin, o yüzeyin birim alanına düşen miktarıdır. Aynı kuvvet küçük bir alana uygulanırsa basınç büyük, geniş bir alana yayılırsa küçük olur. Karda yürürken botla batmanız ama kar ayakkabısıyla batmamanız, ağırlığınız aynı kalırken temas alanının değişmesinden kaynaklanır.",
        "Kuvvet vektörel bir büyüklüktür ama basınç, yüzeye dik doğrultudaki etkiyi ölçen skaler bir büyüklüktür. Basınç katılarda ağırlığın yüzeye dağılmasıyla, sıvılarda sıvının kendi ağırlığıyla, gazlarda ise moleküllerin kabın çeperlerine çarpmasıyla oluşur.",
        "Konu Türkiye'de 8. sınıf fen bilimleri dersinde \"Basınç\" ünitesi olarak işlenir ve LGS'de düzenli olarak soru çıkar; 10. sınıf fizikte ise kaldırma kuvveti ve akışkanlarla birlikte genişletilir."
      ]
    },
    {
      h: "Katı basıncı formülü ve çözümlü örnekler",
      formula: "P = F ÷ A\nP: basınç (Pa),  F: yüzeye dik kuvvet ya da ağırlık (N),  A: yüzey alanı (m²)",
      ol: [
        "<strong>Ayakta duran kişi:</strong> Ağırlığı 600 N olan bir kişinin iki ayakkabısının zemine değen toplam alanı 0,04 m²'dir. P = 600 ÷ 0,04 = 15.000 Pa. Tek ayak üzerinde durursa alan 0,02 m²'ye iner ve basınç 30.000 Pa'ya çıkar.",
        "<strong>Kayak:</strong> Aynı kişi toplam 0,3 m² alanlı kayaklarla 600 ÷ 0,3 = 2.000 Pa basınç uygular; bu yüzden kara batmaz.",
        "<strong>Tuğla:</strong> Kütlesi 2 kg (ağırlığı g = 10 N/kg ile 20 N) olan 20 cm × 10 cm × 5 cm boyutlarındaki tuğla en geniş yüzü (20 × 10 = 200 cm² = 0,02 m²) üzerinde 20 ÷ 0,02 = 1.000 Pa, en dar yüzü (10 × 5 = 50 cm² = 0,005 m²) üzerinde 20 ÷ 0,005 = 4.000 Pa basınç yapar. Kuvvet aynı, basınç 4 kat farklıdır.",
        "<strong>Birim dönüşümüne dikkat:</strong> Alanı cm² cinsinden verilen sorularda 1 m² = 10.000 cm² olduğunu unutmayın; cm²'yi 10.000'e bölerek m²'ye çevirin."
      ],
      after: [
        "Kuvvet ve alandan basıncı, basınçtan kuvveti ya da alanı bulmak ve sonucu kPa, bar ve atm cinsinden görmek için [[arac:basinc-hesapla|Basınç Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Bıçağın keskin tarafı neden daha iyi keser?",
      p: [
        "Bıçağın keskin kenarı çok ince olduğu için domatese değen yüzey alanı birkaç milimetrekareye iner. Aynı el kuvveti bu küçük alana uygulandığında basınç çok büyür ve domatesin kabuğu kolayca yırtılır. Kör bıçakta ya da bıçağın sırtında temas alanı büyük olduğu için basınç düşer ve kesmek için çok daha fazla kuvvet gerekir.",
        "Aynı ilke günlük hayatta pek çok yerde karşımıza çıkar. Raptiye, iğne, çivi ve zımba ucu basıncı artırmak için sivriltilir. Tırtıllı iş makineleri, kamyonların çift tekerlekleri, sırt çantalarının geniş askıları ve kar ayakkabıları ise basıncı azaltmak için temas alanını büyütür. Deve ayaklarının geniş tabanı kumda batmamasını sağlar."
      ]
    },
    {
      h: "Sıvı basıncı formülü: derinlik arttıkça basınç neden artar?",
      p: [
        "Bir sıvının içindeki noktada basınç, o noktanın üzerindeki sıvı sütununun ağırlığından kaynaklanır. Derine indikçe üstteki sıvı sütunu uzar, ağırlığı artar ve basınç da artar. Sıvı basıncı aynı derinlikteki her noktada eşittir ve her yöne etki eder."
      ],
      formula: "P = d · g · h\nd: sıvının yoğunluğu (kg/m³),  g: yer çekimi ivmesi (m/s²),  h: sıvı yüzeyinden derinlik (m)\nMutlak basınç = sıvı basıncı + açık hava basıncı",
      ul: [
        "<strong>Havuz:</strong> 2 m derinlikteki havuz tabanında su basıncı 1.000 × 9,81 × 2 = 19.620 Pa'dır.",
        "<strong>Deniz:</strong> 10 m derinlikte deniz suyunun (d ≈ 1.025 kg/m³) basıncı 1.025 × 9,81 × 10 ≈ 100.550 Pa, yani yaklaşık 1 atm'dir. Dalgıç bu derinlikte kendi üzerindeki atmosferle birlikte yaklaşık 2 atm mutlak basınç hisseder.",
        "<strong>Cıva:</strong> Aynı 10 cm derinlikte cıvanın (13.600 kg/m³) basıncı suyunkinin 13,6 katıdır.",
        "<strong>Kabın şekli önemsizdir:</strong> Geniş bir havuz ile ince bir borunun aynı derinlikteki tabanında basınç aynıdır; buna hidrostatik paradoks denir."
      ],
      after: [
        "Barajların tabana doğru kalınlaştırılması, denizaltıların sağlam gövdesi ve su kulelerinin yüksek yapılması bu formülün doğrudan sonuçlarıdır. Derinliğe göre sıvı basıncını su, deniz suyu ya da cıva için hesaplamak isterseniz [[arac:hidrostatik-basinc-hesapla|Hidrostatik Basınç Hesaplama]] aracını kullanabilirsiniz. Yoğunluk kavramını tekrar etmek için [[bilgi:yogunluk-nedir-nasil-hesaplanir|yoğunluk nedir]] yazımıza bakabilirsiniz."
      ]
    },
    {
      h: "Açık hava basıncı ve gaz basıncı",
      p: [
        "Dünya'yı saran hava tabakasının ağırlığı yeryüzüne bir basınç uygular; buna <strong>açık hava basıncı</strong> (atmosfer basıncı) denir. İtalyan bilim insanı Torricelli 1643'te cıvayla doldurduğu bir boruyu ters çevirerek cıva kabına daldırdığında, deniz seviyesinde cıvanın 76 cm yükseklikte dengede kaldığını gördü. Bu deneyden 1 atm = 76 cmHg tanımı doğdu.",
        "Yükseklere çıkıldıkça üstte kalan hava tabakası incelir ve açık hava basıncı azalır. Bu yüzden yüksek dağlarda su 100 °C'nin altında kaynar, uçak kabinleri basınçlandırılır ve kulaklarımız tıkanır. Hava tahminlerinde basınç genellikle hektopaskal (hPa) ya da milibar ile verilir; ikisi aynıdır ve deniz seviyesinde ortalama değer yaklaşık 1.013 hPa'dır.",
        "Kapalı bir kaptaki gazın basıncı, moleküllerin kabın çeperlerine çarpmasından kaynaklanır. Sıcaklık artarsa moleküller hızlanır ve basınç artar; hacim küçülürse aynı moleküller daha sık çarpar ve yine basınç artar. Bisiklet pompası, düdüklü tencere ve araç lastikleri gaz basıncının günlük örnekleridir."
      ]
    },
    {
      h: "Basınç birimleri: pascal, bar ve atm çevirme",
      table: {
        head: ["Birim", "Pascal karşılığı", "Nerede kullanılır?"],
        rows: [
          ["1 pascal (Pa)", "1", "SI birimi, bilimsel hesaplar"],
          ["1 kilopascal (kPa)", "1.000", "Mühendislik, lastik basıncı"],
          ["1 hektopascal (hPa) = 1 milibar", "100", "Meteoroloji"],
          ["1 bar", "100.000", "Tesisat, kombi, kompresör"],
          ["1 atmosfer (atm)", "101.325", "Kimya, açık hava basıncı"],
          ["1 cmHg", "≈ 1.333", "Barometre, ders kitapları"],
          ["1 psi", "≈ 6.895", "Lastik ve ithal cihazlar"]
        ],
        caption: "1 atm = 1,01325 bar = 76 cmHg = 760 mmHg; 1 bar ≈ 0,987 atm ≈ 14,5 psi."
      },
      after: [
        "Örneğin bir kombinin göstergesinde 1,5 bar görüyorsanız bu 150.000 Pa ya da yaklaşık 1,48 atm demektir. Araç lastiğinde önerilen 32 psi yaklaşık 2,2 bar eder. Bu çevirmeleri hızlıca yapmak için [[arac:bar-atm-cevir|Bar Atm Çevirici]] ve [[arac:pascal-bar-cevir|Pascal Bar Çevirici]] araçlarını kullanabilirsiniz."
      ]
    },
    {
      h: "Pascal ilkesi ve hidrolik sistemler",
      p: [
        "Fransız bilim insanı Blaise Pascal, kapalı bir kaptaki sıvıya uygulanan basıncın sıvının her noktasına ve kabın çeperlerine aynen iletildiğini gösterdi. Bu ilke, küçük bir kuvvetle büyük bir yükü kaldırmayı mümkün kılar."
      ],
      formula: "F₁ ÷ A₁ = F₂ ÷ A₂  (iki pistondaki basınç eşit)",
      after: [
        "Örnek: Hidrolik bir krikoda küçük pistonun alanı 5 cm², büyük pistonun alanı 500 cm²'dir. Küçük pistona 100 N kuvvet uygulanırsa büyük pistonda 100 × 500 ÷ 5 = 10.000 N kuvvet oluşur; bu yaklaşık 1 tonluk bir aracı kaldırmaya yeter. Ancak enerji korunur: büyük piston yalnızca 1 cm yükselirken küçük piston 100 cm itilmelidir. Araç frenleri, berber koltukları ve iş makinelerinin kolları bu ilkeyle çalışır. Kuvvetten kazanıp yoldan kaybetme mantığı [[bilgi:basit-makineler-kaldirac-makara|basit makineler]] konusunda da karşınıza çıkar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Alanı m²'ye çevirmemek:</strong> cm² ile hesap yapıp sonucu Pa yazmak sonucu 10.000 kat saptırır.",
        "<strong>Kütleyi kuvvet yerine koymak:</strong> P = F ÷ A'da F newton cinsinden ağırlıktır; kg değerini g ile çarpın.",
        "<strong>Derinliği yanlış ölçmek:</strong> Sıvı basıncında h, noktanın sıvı yüzeyinden dikey uzaklığıdır; kabın tabanından ölçülmez.",
        "<strong>Kabın şeklini hesaba katmak:</strong> Sıvı basıncı kabın genişliğine bağlı değildir; tabana etki eden toplam kuvvet ise taban alanına bağlıdır.",
        "<strong>bar ile atm'yi eşit saymak:</strong> İkisi yakındır ama aynı değildir; 1 atm = 1,01325 bar."
      ]
    }
  ],
  faq: [
    ["Basınç nedir?", "Basınç, bir yüzeye dik olarak etki eden kuvvetin birim alana düşen miktarıdır. Aynı kuvvet küçük bir yüzeye uygulandığında basınç büyür, geniş bir yüzeye yayıldığında küçülür. Birimi pascaldır ve 1 Pa, bir metrekareye etki eden 1 newtonluk kuvvettir."],
    ["Katı basıncı nasıl hesaplanır?", "Katı basıncı, yüzeye dik etki eden kuvvetin ya da ağırlığın temas alanına bölünmesiyle hesaplanır: P eşittir F bölü A. Ağırlığı 600 N olan bir kişi 0,04 metrekarelik ayakkabı tabanıyla zemine 15.000 Pa basınç uygular."],
    ["Sıvı basıncı formülü nedir?", "Sıvı basıncı P eşittir d çarpı g çarpı h formülüyle bulunur; d sıvının yoğunluğu, g yer çekimi ivmesi, h ise sıvı yüzeyinden derinliktir. Basınç kabın şekline bağlı değildir. Suda 10 metre derinlikte sıvı basıncı yaklaşık 98.100 Pa'dır."],
    ["Açık hava basıncı kaçtır?", "Deniz seviyesinde ve 0 santigrat derecede açık hava basıncı 1 atm'dir; bu 101.325 Pa, 1,01325 bar ve 76 cmHg'ye eşittir. Yükseklere çıkıldıkça üstteki hava tabakası azaldığı için açık hava basıncı da düşer."],
    ["1 bar kaç atm'dir?", "1 bar yaklaşık 0,987 atm'dir; tersine 1 atm 1,01325 bar'dır. Bar, tam olarak 100.000 pascal olarak tanımlanmıştır. Günlük kullanımda iki birim birbirine çok yakın olduğu için sık karıştırılır, ancak hassas hesaplarda fark önemlidir."],
    ["Pascal nedir?", "Pascal, Uluslararası Birim Sistemi'nde basınç birimidir ve bir metrekarelik yüzeye dik etki eden bir newtonluk kuvvetin oluşturduğu basınçtır. Çok küçük bir birim olduğu için günlük hayatta genellikle kilopascal, hektopascal ya da bar kullanılır."],
    ["Derinlik arttıkça basınç neden artar?", "Sıvı içindeki bir noktadaki basınç, o noktanın üzerindeki sıvı sütununun ağırlığından kaynaklanır. Derine inildikçe üstteki sıvı miktarı ve ağırlığı arttığı için basınç da doğrusal olarak artar; suda her 10 metre yaklaşık 1 atm ekler."],
    ["Bıçağın keskin tarafı neden daha iyi keser?", "Keskin kenarın temas ettiği yüzey alanı çok küçüktür. Aynı kuvvet çok küçük bir alana uygulandığında basınç çok büyür ve malzeme kolayca kesilir. Kör tarafta temas alanı büyük olduğu için basınç düşer ve kesmek için daha fazla kuvvet gerekir."],
    ["Pascal ilkesi nedir?", "Kapalı bir kaptaki durgun sıvıya uygulanan basınç, sıvının her noktasına ve kabın çeperlerine aynı büyüklükte iletilir. Hidrolik kriko ve fren sistemleri bu ilkeyle küçük pistona uygulanan kuvveti büyük pistonda kat kat büyütür."]
  ],
  tools: ["basinc-hesapla", "hidrostatik-basinc-hesapla", "bar-atm-cevir", "pascal-bar-cevir"],
  related: ["yogunluk-nedir-nasil-hesaplanir", "kutle-ve-agirlik-farki", "basit-makineler-kaldirac-makara"],
  sources: [
    ["MEB – Fen Bilimleri Dersi Öğretim Programı (8. sınıf Basınç)", "https://www.meb.gov.tr/"],
    ["BIPM – SI birimleri", "https://www.bipm.org/en/measurement-units"],
    ["Meteoroloji Genel Müdürlüğü", "https://www.mgm.gov.tr/"]
  ]
};
