export default {
  slug: "enerji-birimleri-kwh-joule-btu-kcal",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Enerji Birimleri: 1 kWh Kaç Joule, BTU ve Kilokalori Karşılığı",
  pageTitle: "Enerji Birimleri: 1 kWh Kaç Joule, Kaç kcal, Kaç BTU?",
  description: "1 kWh = 3,6 MJ = yaklaşık 860 kcal = 3.412 BTU. Joule, Wh, kcal ve BTU dönüşümleri, kW ile kWh farkı, doğalgazda m³'ün kWh'ye çevrilmesi ve mAh-Wh ilişkisi.",
  keywords: ["enerji birimleri", "1 kwh kaç joule", "1 btu kaç kcal", "kwh kcal", "enerji birim dönüşümü", "joule watt saat", "doğalgaz kwh", "kw ile kwh farkı"],
  lead: "Enerjinin SI birimi <strong>joule</strong>'dür (J). Günlük hayatta ise elektrikte kilovatsaat (kWh), gıdada kilokalori (kcal), klima ve ısıtmada BTU kullanılır. Temel eşitlik: <strong>1 kWh = 3.600.000 J = 3,6 MJ ≈ 860 kcal ≈ 3.412 BTU</strong>. 1 BTU yaklaşık 1.055 J ve 0,252 kcal'dir. Bu sayfada tüm birimleri tek tabloda, güç (kW) ile enerjinin (kWh) farkını, doğalgaz faturasında m³'ün neden kWh'ye çevrildiğini, telefon bataryasındaki mAh'nin Wh'ye nasıl dönüştüğünü ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Enerjinin SI birimi joule'dür: 1 J = 1 N·m = 1 W·s.",
    "1 Wh = 3.600 J; 1 kWh = 3.600.000 J = 3,6 MJ.",
    "1 kWh ≈ 860,42 kcal (4,184 J'lük kaloriyle) ya da 859,85 kcal (4,1868 J'lük uluslararası tablo kalorisiyle).",
    "1 BTU ≈ 1.055,06 J ≈ 0,252 kcal; 1 kWh ≈ 3.412 BTU.",
    "kW güçtür (enerjinin harcanma hızı), kWh enerjidir: 2 kW'lık cihaz 15 dakikada 0,5 kWh harcar.",
    "Batarya enerjisi: Wh = mAh × V ÷ 1.000; 5.000 mAh ve 3,7 V'luk batarya 18,5 Wh eder."
  ],
  figure: {
    alt: "1 kilovatsaatin farklı enerji birimlerindeki karşılığı: 3,6 megajoule, yaklaşık 860 kilokalori ve 3.412 BTU; ayrıca kW ile kWh farkını gösteren güç-süre dikdörtgeni.",
    caption: "Aynı enerji miktarı farklı birimlerde. Sağdaki dikdörtgen, enerjinin güç ile sürenin çarpımı olduğunu gösterir: 2 kW × 0,25 saat = 0,5 kWh.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">1 kWh'nin karşılıkları</text>
  <rect x="140" y="56" width="180" height="70" rx="10" class="p"/>
  <text x="230" y="88" class="xl mid sf">1 kWh</text><text x="230" y="112" class="sm mid sf">elektrik faturası</text>
  <line x1="230" y1="128" x2="80" y2="176" class="sp sw" fill="none"/>
  <line x1="230" y1="128" x2="230" y2="176" class="sp sw" fill="none"/>
  <line x1="230" y1="128" x2="380" y2="176" class="sp sw" fill="none"/>
  <rect x="10" y="180" width="140" height="80" rx="8" class="sf sb"/>
  <text x="80" y="212" class="lg b mid">3,6 MJ</text><text x="80" y="236" class="sm mid t2">3.600.000 J</text>
  <rect x="160" y="180" width="140" height="80" rx="8" class="oks"/>
  <text x="230" y="212" class="lg b mid">≈ 860 kcal</text><text x="230" y="236" class="sm mid t2">gıda, kombi</text>
  <rect x="310" y="180" width="140" height="80" rx="8" class="ps"/>
  <text x="380" y="212" class="lg b mid">≈ 3.412 BTU</text><text x="380" y="236" class="sm mid t2">klima</text>
  <text x="230" y="292" class="sm mid">1 BTU ≈ 1.055 J ≈ 0,252 kcal · 1 kcal = 4,184 kJ</text>
  <text x="590" y="70" class="b mid">Güç × süre = enerji</text>
  <line x1="500" y1="90" x2="500" y2="290" class="st" fill="none"/>
  <line x1="500" y1="290" x2="700" y2="290" class="st" fill="none"/>
  <rect x="500" y="130" width="100" height="160" class="ps"/>
  <text x="550" y="216" class="b mid">0,5 kWh</text>
  <text x="488" y="134" class="sm end">2 kW</text>
  <text x="600" y="308" class="sm mid">15 dk</text>
  <text x="600" y="330" class="sm mid t2">yükseklik = güç, genişlik = süre</text>
  <rect x="20" y="344" width="680" height="44" rx="8" class="sf sb"/>
  <text x="360" y="372" class="sm mid">Batarya: 5.000 mAh × 3,7 V ÷ 1.000 = 18,5 Wh = 66.600 J</text>
</svg>`
  },
  sections: [
    {
      h: "Enerjinin SI birimi nedir?",
      p: [
        "Enerji, bir sistemin iş yapabilme kapasitesidir ve Uluslararası Birimler Sistemi'ndeki (SI) birimi <strong>joule</strong>'dür. 1 joule, 1 newtonluk kuvvetin bir cismi 1 metre hareket ettirirken yaptığı iştir; aynı zamanda 1 vatlık gücün 1 saniye boyunca harcanmasıdır. Yani 1 J = 1 N·m = 1 W·s.",
        "Joule küçük bir birimdir: 100 gramlık bir elmayı yerden 1 metre kaldırmak yaklaşık 1 J gerektirir. Bu yüzden büyük enerji miktarlarında kilojoule (kJ), megajoule (MJ) ve gigajoule (GJ) kullanılır. Elektrik, gıda ve ısıtma alanlarında ise tarihsel nedenlerle farklı birimler yerleşmiştir; hepsi sonuçta joule'ün katlarıdır. İş ve güç kavramlarının temeli için [[bilgi:is-ve-guc-formulu-fizik|iş ve güç formülü yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "1 kWh kaç joule eder?",
      formula: "1 W = 1 J/s\n1 Wh = 1 W × 3.600 s = 3.600 J\n1 kWh = 1.000 Wh = 3.600.000 J = 3,6 MJ\n1 MJ = 1 ÷ 3,6 ≈ 0,2778 kWh",
      p: [
        "Kilovatsaat, 1.000 vatlık gücün 1 saat boyunca harcanmasıyla ortaya çıkan enerjidir. Bir saat 3.600 saniye olduğu için 1 kWh tam olarak 3,6 milyon joule eder. Bu eşitlik tanım gereğidir; yuvarlama içermez.",
        "Elektrik faturalarında kWh kullanılmasının nedeni pratikliktir: bir evin aylık tüketimi 200 kWh gibi okunabilir bir sayıyken joule cinsinden 720 milyon J gibi hantal bir değer olurdu. Wh ile J arasında hızlı geçiş için [[arac:joule-watt-saat-cevir|Joule Watt-saat Çevirici]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Kalori, kilokalori ve iki farklı kalori tanımı",
      p: [
        "Kalori ilk olarak 1 gram suyu 1 °C ısıtmak için gereken ısı olarak tanımlandı. Ancak bu miktar suyun başlangıç sıcaklığına göre biraz değiştiği için zamanla iki standart tanım ortaya çıktı: <strong>termokimyasal kalori</strong> (1 cal = 4,184 J) ve <strong>uluslararası tablo kalorisi</strong> (1 cal<sub>IT</sub> = 4,1868 J). Gıda etiketlerinde ve kimyada çoğunlukla 4,184 J, buhar tablolarında ve bazı mühendislik hesaplarında 4,1868 J kullanılır.",
        "Gıda etiketlerindeki \"kalori\" aslında kilokaloridir (kcal): 1 kcal = 1.000 cal = 4,184 kJ. 250 kcal'lik bir yiyecek yaklaşık 1.046 kJ enerji sağlar. Bu karışıklığın ayrıntıları [[bilgi:kalori-ile-kilokalori-farki-kcal-kj|kalori ve kilokalori farkı yazısında]] anlatılır."
      ],
      formula: "1 kWh = 3.600.000 J ÷ 4.184 J/kcal ≈ 860,42 kcal (termokimyasal)\n1 kWh = 3.600.000 J ÷ 4.186,8 J/kcal ≈ 859,85 kcal (uluslararası tablo)",
      after: [
        "İki tanım arasındaki fark yalnızca binde 0,7'dir ve günlük hesaplarda göz ardı edilebilir. [[arac:kalori-joule-cevir|Kalori Joule Çevirici]] her iki tanımı da seçenek olarak sunar; [[arac:kwh-kcal-cevir|kWh kcal Çevirici]] ise 860,42 değerini kullanır."
      ]
    },
    {
      h: "1 BTU kaç kcal ve kaç joule'dür?",
      p: [
        "BTU (British Thermal Unit, İngiliz ısı birimi) 1 libre suyu 1 °F ısıtmak için gereken ısı olarak tanımlanmıştır. Uluslararası tablo tanımına göre 1 BTU yaklaşık <strong>1.055,06 J</strong> ve <strong>0,252 kcal</strong>'dir. Türkiye'de BTU en çok klima kapasitelerinde, \"9.000 BTU\" ya da \"12.000 BTU\" gibi ifadelerle karşımıza çıkar."
      ],
      ul: [
        "Klimalardaki değer aslında <strong>BTU/saat</strong>tir, yani bir güç birimidir: 9.000 BTU/h ≈ 2,64 kW, 12.000 BTU/h ≈ 3,52 kW, 18.000 BTU/h ≈ 5,28 kW soğutma kapasitesi.",
        "Kombilerde ise kapasite genellikle kW ya da kcal/saat ile verilir: 24.000 kcal/h ≈ 27,9 kW.",
        "Bu değerler cihazın soğutma ya da ısıtma gücüdür; çektiği elektrik gücü değildir. Klimanın elektrik tüketimi verimlilik katsayısına bağlıdır ve genellikle kapasitenin üçte biri ile beşte biri arasındadır."
      ],
      after: [
        "BTU ile kcal arasında geçiş için [[arac:btu-kcal-cevir|BTU kcal Çevirici]] aracını kullanabilirsiniz. Odanız için kaç BTU'luk klima gerektiği ise [[bilgi:klima-kac-btu-olmali|klima kaç BTU olmalı yazısında]] anlatılır."
      ]
    },
    {
      h: "Enerji birimleri tek tabloda",
      table: {
        head: ["Birim", "Joule karşılığı", "kWh karşılığı", "kcal karşılığı", "Tipik kullanım"],
        rows: [
          ["1 J", "1", "2,778 × 10⁻⁷", "0,000239", "Fizik, SI"],
          ["1 kJ", "1.000", "0,000278", "0,239", "Gıda etiketi (kJ)"],
          ["1 kcal", "4.184", "0,001162", "1", "Gıda, beslenme"],
          ["1 BTU", "1.055,06", "0,000293", "0,252", "Klima, ısıtma"],
          ["1 Wh", "3.600", "0,001", "0,860", "Batarya, küçük cihaz"],
          ["1 kWh", "3.600.000", "1", "860,42", "Elektrik faturası"],
          ["1 MJ", "1.000.000", "0,2778", "239,0", "Yakıt ısıl değeri"]
        ],
        caption: "kcal sütunu termokimyasal kalori (4,184 J) ile hesaplanmıştır. BTU uluslararası tablo tanımıdır."
      },
      after: [
        "Tabloyu kullanmanın kolay yolu, önce her şeyi joule'e, sonra hedef birime çevirmektir. Örneğin 500 kcal kaç kWh eder? 500 × 4.184 = 2.092.000 J; bunu 3.600.000'e bölünce yaklaşık 0,581 kWh bulunur."
      ]
    },
    {
      h: "kWh ile kW arasındaki fark nedir?",
      p: [
        "<strong>kW</strong> (kilovat) bir güç birimidir ve enerjinin ne kadar hızlı harcandığını gösterir. <strong>kWh</strong> (kilovatsaat) ise bir enerji birimidir ve toplam ne kadar enerji harcandığını gösterir. İkisi arasındaki ilişki, hız ile yol arasındaki ilişkiye benzer: enerji = güç × süre.",
        "Örnek: 2.000 W (2 kW) gücündeki bir su ısıtıcısı 15 dakika, yani 0,25 saat çalışırsa 2 × 0,25 = 0,5 kWh enerji harcar. Aynı enerjiyi 100 W'lık bir cihaz 5 saatte harcar. Cihaz etiketlerindeki watt değeri güçtür; faturadaki kWh ise bu gücün zamanla toplamıdır. Elektrik faturası hesabının ayrıntıları için [[bilgi:elektrik-faturasi-nasil-hesaplanir|elektrik faturası yazısına]], güç-akım-gerilim ilişkisi için [[bilgi:watt-amper-volt-iliskisi|watt amper volt yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Doğalgaz faturasında m³ neden kWh'ye çevrilir?",
      p: [
        "Doğalgaz sayacı hacmi (m³) ölçer, ama satın aldığınız şey aslında gazın içindeki enerjidir. Doğalgazın bileşimi ve dolayısıyla 1 m³'ün taşıdığı enerji kaynaktan kaynağa ve zamana göre biraz değişir. Bu nedenle dağıtım şirketleri tüketilen hacmi, o dönem için belirlenen <strong>ısıl değer katsayısı</strong> (kWh/m³) ile çarparak enerjiye çevirir ve faturayı kWh üzerinden hesaplar."
      ],
      ol: [
        "Faturanızdaki tüketimi bulun: örneğin 10 m³.",
        "Faturada yazan dönüşüm katsayısını bulun. Örnek değer olarak 10,64 kWh/m³ alalım; gerçek değer faturanızda yazar.",
        "Enerji: 10 × 10,64 = 106,4 kWh.",
        "Kilokaloriye çevirmek isterseniz: 106,4 × 860,42 ≈ 91.549 kcal."
      ],
      after: [
        "Bu dönüşüm, doğalgaz ile elektriği aynı birimde karşılaştırmanızı da sağlar. Kombi kapasitesi ve tüketim ilişkisi [[bilgi:dogalgaz-faturasi-ve-kombi-kapasitesi|doğalgaz faturası ve kombi kapasitesi yazısında]] ayrıntılı anlatılır."
      ],
      note: "Isıl değer katsayısı dönemden döneme ve bölgeden bölgeye değişebilir. Hesaplarınızda örnek değer yerine faturanızda yazan katsayıyı kullanın."
    },
    {
      h: "Wh ile mAh arasındaki ilişki ve gıda-elektrik karşılaştırması",
      p: [
        "Telefon ve powerbank bataryalarının kapasitesi genellikle mAh (miliamper-saat) ile verilir. mAh bir yük (elektrik miktarı) birimidir, enerji birimi değildir; enerjiye çevirmek için gerilimle çarpmak gerekir. Bu yüzden aynı mAh değerine sahip ama farklı gerilimdeki iki batarya farklı enerji taşır."
      ],
      formula: "Enerji (Wh) = kapasite (mAh) × gerilim (V) ÷ 1.000\n5.000 mAh × 3,7 V ÷ 1.000 = 18,5 Wh\n18,5 Wh × 3.600 = 66.600 J ≈ 15,9 kcal",
      after: [
        "Bir powerbank'in telefonu kaç kez şarj edeceğini hesaplarken bu dönüşüm ve dönüştürme kayıpları birlikte değerlendirilir; ayrıntı [[bilgi:powerbank-kac-kez-sarj-eder|powerbank yazısında]] bulunur.",
        "Gıda enerjisi de aynı fiziksel büyüklüktür, dolayısıyla karşılaştırılabilir. Günde 2.000 kcal alan bir yetişkinin besin enerjisi 2.000 × 4.184 = 8,37 MJ, yani yaklaşık 2,32 kWh eder. Bu, 2 kW'lık bir su ısıtıcısının bir saat on dakika kadar çalışmasıyla aynı enerjidir. Ancak vücudun enerji kullanımı ve beslenme ihtiyacı kişiden kişiye değişir; kişisel beslenme planı için bir diyetisyene danışılmalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>kW ile kWh'yi karıştırmak:</strong> Biri güç, öteki enerjidir. \"Klima saatte 1 kW yakıyor\" yerine \"klima 1 kW güç çekiyor, saatte 1 kWh harcıyor\" demek doğrudur.",
        "<strong>Klima BTU'sunu enerji sanmak:</strong> Klimadaki BTU değeri BTU/saattir ve soğutma gücünü anlatır.",
        "<strong>mAh'yi gerilimsiz karşılaştırmak:</strong> Farklı gerilimli bataryaları karşılaştırırken Wh'ye çevirin.",
        "<strong>Gıda etiketindeki kaloriyi cal sanmak:</strong> Etiketteki değer kcal'dir; cal'a çevirmek için 1.000 ile çarpılır.",
        "<strong>İki kalori tanımını karıştırmak:</strong> Hassas hesaplarda 4,184 mü 4,1868 mi kullanıldığını belirtin.",
        "<strong>Ara sonuçları erken yuvarlamak:</strong> Çok adımlı dönüşümlerde 860 ya da 0,25 gibi yuvarlanmış katsayılar kullanmak büyük miktarlarda yüzde birkaçlık sapma yaratır; yuvarlamayı en sona bırakın."
      ]
    }
  ],
  faq: [
    ["Enerjinin SI birimi nedir?", "Enerjinin SI birimi joule'dür. 1 joule, 1 newtonluk kuvvetin 1 metre boyunca yaptığı iş ya da 1 vatlık gücün 1 saniye boyunca harcanmasıdır. kJ, MJ ve GJ gibi katları büyük enerji miktarları için kullanılır."],
    ["1 kWh kaç joule eder?", "1 kWh tam olarak 3.600.000 joule, yani 3,6 megajoule eder. Bu değer 1.000 vatlık gücün 3.600 saniye boyunca harcanmasından gelir ve tanım gereği kesindir; yuvarlama içermez."],
    ["1 BTU kaç kcal ve kaç joule'dür?", "Uluslararası tablo tanımına göre 1 BTU yaklaşık 1.055,06 joule ve yaklaşık 0,252 kilokaloridir. Tersinden 1 kcal yaklaşık 3,97 BTU, 1 kWh ise yaklaşık 3.412 BTU eder."],
    ["kWh ile kW arasındaki fark nedir?", "kW güç birimidir ve enerjinin harcanma hızını gösterir; kWh enerji birimidir ve toplam harcanan miktarı gösterir. 2 kW'lık bir cihaz 15 dakika çalışırsa 2 × 0,25 = 0,5 kWh enerji harcar."],
    ["Doğalgaz faturasında m³ neden kWh'ye çevrilir?", "Sayaç hacmi ölçer ama satılan şey gazın enerjisidir ve 1 m³'ün enerjisi gazın bileşimine göre değişir. Dağıtım şirketi tüketilen m³'ü faturada yazan ısıl değer katsayısıyla çarparak kWh'ye çevirir ve bedeli bu enerjiden hesaplar."],
    ["Gıda enerjisi ile elektrik enerjisi karşılaştırılabilir mi?", "Evet, ikisi de aynı fiziksel büyüklüktür. 2.000 kcal'lik günlük besin enerjisi 2.000 × 4.184 = 8,37 MJ, yani yaklaşık 2,32 kWh eder. Ancak vücudun enerji kullanımı ve beslenme ihtiyacı kişiye özeldir."],
    ["Wh ve mAh arasındaki ilişki nedir?", "mAh yük birimidir; enerjiye çevirmek için gerilimle çarpılıp 1.000'e bölünür. 5.000 mAh'lik 3,7 V'luk bir batarya 18,5 Wh enerji taşır. Farklı gerilimli bataryaları karşılaştırırken Wh kullanmak gerekir."],
    ["Enerji birimleri nasıl tek tabloda gösterilir?", "Her birim joule cinsinden yazılarak tek tabloda toplanır: 1 kcal 4.184 J, 1 BTU 1.055,06 J, 1 Wh 3.600 J, 1 kWh 3.600.000 J. Dönüşüm için önce joule'e, sonra hedef birime çevirmek en kolay yoldur."],
    ["1 kWh kaç kcal eder?", "1 kWh, termokimyasal kalori (4,184 J) ile yaklaşık 860,42 kcal, uluslararası tablo kalorisi (4,1868 J) ile yaklaşık 859,85 kcal eder. Aradaki fark binde 0,7'dir ve günlük hesaplarda genellikle 860 kcal alınır."]
  ],
  tools: ["joule-watt-saat-cevir", "kwh-kcal-cevir", "btu-kcal-cevir", "kalori-joule-cevir"],
  related: ["kalori-ile-kilokalori-farki-kcal-kj", "klima-kac-btu-olmali", "dogalgaz-faturasi-ve-kombi-kapasitesi"],
  sources: [
    ["BIPM – SI broşürü ve türetilmiş birimler", "https://www.bipm.org/en/publications/si-brochure"],
    ["NIST – Birim dönüşüm faktörleri (SP 811)", "https://www.nist.gov/pml/special-publication-811"]
  ]
};
