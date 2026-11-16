export default {
  slug: "dekar-basina-verim-ve-gelir-hesabi",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Dekar Başına Verim Nasıl Hesaplanır? Tarlada Verim, Gelir ve Kâr Hesabı",
  pageTitle: "Dekar Başına Verim Hesaplama: Tarlada Gelir, Maliyet ve Kâr",
  description: "Dekara verim = toplam hasat (kg) ÷ ekili alan (dekar). Hektar dönüşümü, dekar başı maliyet, net kâr, başabaş verim ve fiyat hesabı örnek tutarlarla adım adım.",
  keywords: ["dekar başına verim", "dekara verim hesaplama", "buğday dekara kaç kilo", "tarla geliri hesaplama", "dekar maliyeti", "tarım kâr zarar", "hektar dekar dönüşümü", "başabaş verim"],
  lead: "Dekar başına verim, <strong>toplam hasat miktarının (kg) ekili alana (dekar) bölünmesiyle</strong> bulunur: 25 dekarlık tarladan 9 ton buğday alındıysa verim 9.000 ÷ 25 = <strong>360 kg/da</strong>'dır. Verimi satış fiyatıyla çarptığınızda dekara brüt geliri, bu gelirden tohum, gübre, ilaç, mazot, hasat ve kira gibi dekara düşen giderleri çıkardığınızda dekara net kârı elde edersiniz. Bu rehberde hektar ve dönüm dönüşümlerini, maliyet kalemlerini, örnek tutarlarla tam bir kâr hesabını, başabaş verim ve fiyatı ve ürünleri karşılaştırma yöntemini bulacaksınız.",
  kisaCevap: [
    "Dekara verim (kg/da) = toplam hasat (kg) ÷ ekili alan (dekar).",
    "1 dekar = 1.000 m²; 1 hektar = 10 dekar = 10.000 m²; yeni (metrik) dönüm 1.000 m²'dir.",
    "Hektara ton ile dekara kilogram arasında: 1 t/ha = 100 kg/da; 3,6 t/ha = 360 kg/da.",
    "Dekara brüt gelir = verim × satış fiyatı; dekara net kâr = brüt gelir − dekara toplam maliyet.",
    "Başabaş verim = dekara maliyet ÷ fiyat; başabaş fiyat = dekara maliyet ÷ verim.",
    "Fiyat, maliyet ve destek tutarları yıldan yıla değişir; örneklerdeki tutarlar örnektir."
  ],
  figure: {
    alt: "Dekar başına kâr hesabı akış şeması: 9.000 kg hasat bölü 25 dekar eşittir 360 kg/da verim; çarpı 14 TL eşittir 5.040 TL dekara gelir; eksi 3.900 TL dekara maliyet eşittir 1.140 TL dekara net kâr. Altında maliyet kalemlerinin yığılmış çubuğu.",
    caption: "Örnek tutarlarla hesap zinciri: verim, gelir ve kâr sırayla bulunur. Alttaki çubuk 3.900 TL'lik dekara maliyetin kalemlerine dağılımını gösterir; en büyük paylar gübre ile toprak işleme ve ekim giderleridir.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">25 dekarlık buğday tarlası (örnek tutarlar)</text>
  <g class="mid">
    <rect x="20" y="52" width="160" height="80" rx="8" class="sf sb"/>
    <text x="100" y="78" class="sm mu">Hasat ÷ alan</text>
    <text x="100" y="100" class="b">9.000 kg ÷ 25 da</text>
    <text x="100" y="122" class="b p">360 kg/da</text>
    <rect x="200" y="52" width="160" height="80" rx="8" class="sf sb"/>
    <text x="280" y="78" class="sm mu">Verim × fiyat</text>
    <text x="280" y="100" class="b">360 × 14 TL</text>
    <text x="280" y="122" class="b p">5.040 TL/da</text>
    <rect x="380" y="52" width="160" height="80" rx="8" class="dgs"/>
    <text x="460" y="78" class="sm">Dekara maliyet</text>
    <text x="460" y="100" class="b">− 3.900 TL/da</text>
    <text x="460" y="122" class="sm">tüm girdiler</text>
    <rect x="560" y="52" width="140" height="80" rx="8" class="p"/>
    <text x="630" y="78" class="sm sf">Net kâr</text>
    <text x="630" y="100" class="b sf">1.140 TL/da</text>
    <text x="630" y="122" class="b sf">28.500 TL</text>
  </g>
  <text x="20" y="176" class="b">Dekara maliyetin dağılımı (3.900 TL)</text>
  <rect x="20" y="190" width="94" height="44" class="ps"/>
  <rect x="114" y="190" width="214" height="44" class="p"/>
  <rect x="328" y="190" width="51" height="44" class="dgs"/>
  <rect x="379" y="190" width="137" height="44" class="sf sb"/>
  <rect x="516" y="190" width="77" height="44" class="oks"/>
  <rect x="593" y="190" width="26" height="44" class="ps"/>
  <rect x="619" y="190" width="81" height="44" class="dgs"/>
  <g class="sm">
    <text x="67" y="217" class="mid b">550</text>
    <text x="221" y="217" class="mid b sf">1.250</text>
    <text x="353" y="217" class="mid b">300</text>
    <text x="447" y="217" class="mid b">800</text>
    <text x="554" y="217" class="mid b">450</text>
    <text x="659" y="217" class="mid b">400</text>
  </g>
  <g class="sm">
    <text x="20" y="258">Tohum</text>
    <text x="150" y="258">Gübre</text>
    <text x="318" y="278">İlaç</text>
    <text x="390" y="258">İşleme, ekim</text>
    <text x="516" y="278">Hasat</text>
    <text x="566" y="298">Diğer 150</text>
    <text x="624" y="258">Kira</text>
  </g>
  <rect x="20" y="320" width="330" height="92" rx="8" class="oks"/>
  <text x="185" y="346" class="b mid">Başabaş verim</text>
  <text x="185" y="370" class="mid">3.900 ÷ 14 ≈ 279 kg/da</text>
  <text x="185" y="394" class="sm mid">bu verimin altı zarar</text>
  <rect x="370" y="320" width="330" height="92" rx="8" class="ps"/>
  <text x="535" y="346" class="b mid">Başabaş fiyat</text>
  <text x="535" y="370" class="mid">3.900 ÷ 360 ≈ 10,83 TL/kg</text>
  <text x="535" y="394" class="sm mid">bu fiyatın altı zarar</text>
</svg>`
  },
  sections: [
    {
      h: "Dekar başına verim nedir, neden önemlidir?",
      p: [
        "Verim, birim alandan elde edilen ürün miktarıdır. Türkiye'de tarla tarımında birim alan olarak çoğunlukla <strong>dekar</strong> kullanılır ve verim \"dekara kilogram\" (kg/da) olarak söylenir. İstatistiklerde ve uluslararası karşılaştırmalarda ise hektara ton (t/ha) yaygındır.",
        "Toplam hasat tek başına bir tarlanın ne kadar başarılı olduğunu anlatmaz; 50 dekardan 10 ton ile 20 dekardan 10 ton çok farklı sonuçlardır. Dekar başına verim; tarlaları, yılları, çeşitleri, sulu ve kuru koşulları ve komşu üreticilerle karşılaştırmayı mümkün kılar. Gelir ve kâr hesabının da başlangıç noktasıdır, çünkü maliyetlerin büyük kısmı dekar başına oluşur."
      ]
    },
    {
      h: "Dekar başına verim nasıl hesaplanır?",
      formula: "Dekara verim (kg/da) = toplam hasat (kg) ÷ alan (dekar)\nToplam hasat ton ise: kg = ton × 1.000\nAlan m² ise: dekar = m² ÷ 1.000 · Alan hektar ise: dekar = hektar × 10",
      ol: [
        "Hasat miktarını kilograma çevirin: kantar fişinde 9,2 ton yazıyorsa 9.200 kg.",
        "Alanı dekara çevirin: tapu ya da ÇKS kaydında 24.800 m² yazıyorsa 24,8 dekar.",
        "Böl: 9.200 ÷ 24,8 ≈ <strong>371 kg/da</strong>.",
        "Nem ve yabancı madde kesintisi varsa hesabı kesinti sonrası net ağırlıkla yapın; satışta esas alınan miktar budur."
      ],
      after: [
        "Ölçü dönüşümleri için [[arac:ton-kg-cevir|Ton Kilogram Çevirici]] ve [[arac:donum-metrekare-cevir|Dönüm Metrekare Çevirici]] araçlarını, hesabın tamamı için [[arac:dekar-verim-hesapla|Dekara Verim Hesaplama]] aracını kullanabilirsiniz. Araç dekara verimi, hektara ton karşılığını ve fiyat girerseniz dekara geliri birlikte verir."
      ]
    },
    {
      h: "Hektar, dekar ve dönüm dönüşümü",
      p: [
        "Alan birimleri karıştırıldığında verim on kat ya da yüzde sekiz gibi farklarla hatalı çıkabilir. Bugün resmî kayıtlarda kullanılan dönüm, dekarla aynıdır (1.000 m²). Bazı yörelerde hâlâ söylenen <strong>eski dönüm</strong> ise yaklaşık 919 m²'dir; eski kayıtlarla çalışıyorsanız bu farka dikkat edin. Ayrıntılar için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazısına bakabilirsiniz."
      ],
      table: {
        head: ["Birim", "Metrekare", "Dekar", "Hektar"],
        rows: [
          ["1 dekar", "1.000 m²", "1", "0,1"],
          ["1 dönüm (yeni, metrik)", "1.000 m²", "1", "0,1"],
          ["1 eski dönüm", "yaklaşık 919 m²", "yaklaşık 0,919", "yaklaşık 0,092"],
          ["1 hektar", "10.000 m²", "10", "1"],
          ["1 km²", "1.000.000 m²", "1.000", "100"]
        ]
      },
      after: [
        "Verim dönüşümü: 1 t/ha = 1.000 kg ÷ 10 da = <strong>100 kg/da</strong>. Bu yüzden 3,6 t/ha'lık bir verim 360 kg/da, 450 kg/da'lık bir verim 4,5 t/ha demektir. Kural basit: t/ha değerini 100 ile çarpın ya da kg/da değerini 100'e bölün."
      ]
    },
    {
      h: "Buğday dekara ortalama kaç kilo verir?",
      p: [
        "Buğday verimi; yağışa, sulamaya, toprağa, çeşide, ekim zamanına, gübrelemeye ve hastalık-zararlı baskısına göre büyük farklılık gösterir. Türkiye ortalaması son yıllarda kabaca <strong>dekara 250–330 kg</strong> aralığında seyretmiştir; kurak yıllarda düşer, yağışlı yıllarda yükselir. Sulu ve iyi yönetilen alanlarda 500–700 kg/da ve üzeri, yağışı az kuru alanlarda ise 150–250 kg/da sık görülür. Güncel il ve ürün bazlı verim istatistikleri için TÜİK bitkisel üretim verilerine bakabilirsiniz.",
        "Kendi veriminizi bölge ortalamasıyla karşılaştırmak, iyileştirme alanlarını görmenin en hızlı yoludur. Ortalamanın belirgin altındaysanız toprak analizi, tohum ve çeşit seçimi, ekim normu ve gübreleme zamanlaması ilk bakılacak noktalardır."
      ]
    },
    {
      h: "Dekar başına maliyet nasıl çıkarılır?",
      p: [
        "Maliyeti doğru bulmak için sezon boyunca yapılan tüm harcamaları toplayıp ekili alana bölmek gerekir. Kendi makinenizi kullanıyorsanız mazot ve bakımı, kiralık iş yaptırıyorsanız ödenen ücreti yazın. Kendi arazinizde üretim yapsanız bile arazinin kiraya verilseydi getireceği tutarı (fırsat maliyeti) hesaba katmak, gerçek kârlılığı görmenizi sağlar."
      ],
      table: {
        head: ["Maliyet kalemi", "Örnek tutar (TL/da)", "Açıklama"],
        rows: [
          ["Tohum", "550", "Sertifikalı tohum ve ekim normuna göre"],
          ["Gübre", "1.250", "Taban ve üst gübre"],
          ["Zirai ilaç", "300", "Yabancı ot ve hastalık mücadelesi"],
          ["Toprak işleme ve ekim", "800", "Mazot, makine kirası ya da ücret"],
          ["Hasat (biçerdöver)", "450", "Dekar başına ücret"],
          ["Nakliye ve diğer", "150", "Römork, kantar, çuval vb."],
          ["Arazi kirası", "400", "Kira ya da fırsat maliyeti"],
          ["Toplam", "3.900", "Dekara toplam maliyet"]
        ],
        caption: "Tutarlar yalnızca hesabın mantığını göstermek için verilmiş örnek tutarlardır; bölgeye, yıla ve işletmeye göre çok farklı olabilir."
      },
      after: [
        "Faiz, sigorta, kendi işçiliğiniz ve makinelerin değer kaybı da uzun vadede gerçek maliyetin parçasıdır. Makine değer kaybını yıllara yaymanın yolu [[bilgi:amortisman-nasil-hesaplanir|amortisman hesabı]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Tarladan elde edilen net kâr nasıl hesaplanır?",
      p: [
        "Yukarıdaki örnek tarlayla devam edelim: 25 dekar, 9.000 kg net hasat, satış fiyatı <strong>örnek olarak</strong> 14 TL/kg."
      ],
      ol: [
        "Verim: 9.000 ÷ 25 = 360 kg/da.",
        "Dekara brüt gelir: 360 × 14 = 5.040 TL.",
        "Dekara maliyet: 3.900 TL (tablodaki toplam).",
        "Dekara net kâr: 5.040 − 3.900 = <strong>1.140 TL</strong>.",
        "Toplam net kâr: 1.140 × 25 = <strong>28.500 TL</strong>.",
        "Kâr marjı: 1.140 ÷ 5.040 ≈ %22,6. Saman satışı ya da dekar başı devlet destekleri varsa gelire ekleyin."
      ],
      formula: "Dekara brüt gelir = verim (kg/da) × fiyat (TL/kg)\nDekara net kâr = dekara brüt gelir + dekara destek − dekara maliyet\nBaşabaş verim (kg/da) = dekara maliyet ÷ fiyat\nBaşabaş fiyat (TL/kg) = dekara maliyet ÷ verim",
      after: [
        "Örnekte başabaş verim 3.900 ÷ 14 ≈ 279 kg/da, başabaş fiyat 3.900 ÷ 360 ≈ 10,83 TL/kg'dır. Verim 279 kg/da'nın ya da fiyat 10,83 TL/kg'ın altına düştüğünde tarla zarar eder. Bu iki sayı, kuraklık ya da fiyat düşüşü riskine karşı ne kadar dayanıklı olduğunuzu gösterir. Kâr ve zarar oranlarını hızlıca görmek için [[arac:kar-zarar-hesapla|Kâr Zarar Hesaplama]] aracını, başabaş mantığının genel anlatımı için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazısını kullanabilirsiniz."
      ]
    },
    {
      h: "Verimi etkileyen başlıca faktörler",
      ul: [
        "<strong>Su:</strong> Kuru tarımda yağışın miktarı ve zamanlaması, sulu tarımda sulama sayısı ve zamanı verimi en çok belirleyen etkendir.",
        "<strong>Toprak verimliliği:</strong> Organik madde, pH, tuzluluk ve besin elementi düzeyi; toprak analiziyle bilinmeden yapılan gübreleme hem israf hem verim kaybı yaratır.",
        "<strong>Tohum ve çeşit:</strong> Bölgeye uygun, sertifikalı ve hastalıklara dayanıklı çeşit seçimi.",
        "<strong>Ekim zamanı ve normu:</strong> Erken ya da geç ekim, sık ya da seyrek ekim verimi belirgin biçimde değiştirir.",
        "<strong>Bitki koruma:</strong> Yabancı ot, hastalık ve zararlıyla zamanında mücadele.",
        "<strong>Hasat kayıpları:</strong> Biçerdöver ayarı ve hasat zamanı; geç kalınan hasatta dane dökülmesi artar.",
        "<strong>Münavebe (ekim nöbeti):</strong> Aynı tarlaya üst üste aynı ürünü ekmek hastalık baskısını artırır ve verimi düşürür."
      ]
    },
    {
      h: "Ürün seçiminde dekar başı gelir nasıl karşılaştırılır?",
      p: [
        "Farklı ürünleri karşılaştırırken ton fiyatına ya da verime tek başına bakmak yanıltıcıdır. Doğru ölçüt <strong>dekar başına net kâr</strong>dır. Yüksek verimli ama pahalı girdiler ve sulama gerektiren bir ürün, düşük verimli ama ucuz bir üründen daha az kâr bırakabilir."
      ],
      table: {
        head: ["Ürün (örnek)", "Verim (kg/da)", "Fiyat (TL/kg)", "Brüt gelir (TL/da)", "Maliyet (TL/da)", "Net (TL/da)"],
        rows: [
          ["Ürün A", "360", "14", "5.040", "3.900", "1.140"],
          ["Ürün B", "320", "12", "3.840", "3.100", "740"],
          ["Ürün C (sulu)", "1.100", "9", "9.900", "8.200", "1.700"]
        ],
        caption: "Tüm sayılar yöntemi göstermek için verilmiş örnek tutarlardır; gerçek karar için bölgenizin güncel verim, fiyat ve maliyet değerlerini kullanın."
      },
      after: [
        "Tabloda Ürün C en yüksek net kârı bırakıyor; ancak sulama suyu, sermaye ihtiyacı, pazarlama kolaylığı ve fiyat riski de değerlendirilmelidir. Yüksek maliyetli bir üründe kötü bir yıl çok daha büyük zarar demektir. Hasat ve alım dönemlerinde açıklanan fiyatlar ile dekar başı destek tutarları için TMO ve Tarım ve Orman Bakanlığı duyurularını takip edin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Brüt ağırlıkla hesap yapmak:</strong> Nem ve yabancı madde kesintisi düşülmeden hesaplanan verim, satıştan elde edilecek geliri olduğundan yüksek gösterir.",
        "<strong>Tapu alanı ile ekili alanı karıştırmak:</strong> Tarla kenarları, yollar ve ekilmeyen köşeler düşülmezse verim düşük görünür. ÇKS kaydındaki ekili alanı kullanın.",
        "<strong>Eski dönümle yeni dönümü karıştırmak:</strong> Yaklaşık %8'lik fark, dekar başı maliyet ve kâr hesaplarını da aynı oranda saptırır.",
        "<strong>Kendi emeğini ve arazisini sıfır saymak:</strong> Kâğıt üzerinde kârlı görünen bir ürün, işçilik ve arazi kirası karşılığı eklendiğinde zarar ediyor olabilir.",
        "<strong>Tek yılın sonucuna göre karar vermek:</strong> Verim ve fiyat yıldan yıla dalgalanır. Ürün seçimini son üç beş yılın ortalamasına ve kötü yıl senaryosuna göre yapmak daha sağlıklıdır.",
        "<strong>Fiyatı hasat sonrasına göre varsaymak:</strong> Hasat döneminde fiyatlar genellikle düşer; depolama imkânınız yoksa satış fiyatını bu döneme göre tahmin edin."
      ],
      after: [
        "Hesapları her sezon aynı yöntemle tutmak, yıllar içinde kendi tarlanızın verim ve maliyet geçmişini oluşturur. Bu kayıtlar hem ürün planlamasında hem de kredi ve destek başvurularında işinizi kolaylaştırır."
      ]
    }
  ],
  faq: [
    ["Dekar başına verim nasıl hesaplanır?", "Toplam hasat miktarı kilogram cinsinden ekili alanın dekar cinsinden değerine bölünür. 25 dekardan 9.000 kilogram ürün alındıysa dekara verim 9.000 ÷ 25 = 360 kg/da'dır; hesapta kesinti sonrası net ağırlık kullanılmalıdır."],
    ["Buğday dekara ortalama kaç kilo verir?", "Türkiye ortalaması son yıllarda yaklaşık 250–330 kg/da aralığında seyretmiştir. Sulu ve iyi yönetilen alanlarda 500–700 kg/da ve üzeri, kuru ve az yağışlı alanlarda 150–250 kg/da görülebilir; güncel istatistik için TÜİK verilerine bakılmalıdır."],
    ["Dekar başına maliyet nasıl çıkarılır?", "Tohum, gübre, ilaç, toprak işleme, ekim, hasat, nakliye ve arazi kirası gibi sezon boyunca yapılan tüm harcamalar toplanır ve ekili alana bölünür. Kendi arazinizde bile kira karşılığını fırsat maliyeti olarak eklemek gerçek kârlılığı gösterir."],
    ["Tarladan elde edilen net kâr nasıl hesaplanır?", "Dekara verim satış fiyatıyla çarpılarak dekara brüt gelir bulunur, varsa destekler eklenir ve dekara maliyet çıkarılır. Sonuç ekili alanla çarpılarak toplam net kâr elde edilir."],
    ["Ton ve kilogram dönüşümü verim hesabında nasıl yapılır?", "1 ton 1.000 kilogramdır; kantar fişindeki ton değeri 1.000 ile çarpılarak kilograma çevrilir. Hektara ton olarak verilen verim ise 100 ile çarpılarak dekara kilograma dönüştürülür."],
    ["Hektar verimi dekara nasıl çevrilir?", "1 hektar 10 dekar olduğu için 1 t/ha verim 1.000 kg ÷ 10 = 100 kg/da eder. Hektara ton değerini 100 ile çarpmanız yeterlidir: 3,6 t/ha verim 360 kg/da'dır."],
    ["Verimi etkileyen başlıca faktörler nelerdir?", "Yağış ve sulama, toprak verimliliği, tohum ve çeşit seçimi, ekim zamanı ve normu, gübreleme, bitki koruma, hasat kayıpları ve ekim nöbeti verimi belirleyen başlıca etkenlerdir. Su genellikle en belirleyici faktördür."],
    ["Ürün seçiminde dekar başı gelir nasıl karşılaştırılır?", "Her ürün için dekara verim fiyatla çarpılıp dekara maliyet çıkarılır ve dekara net kâr karşılaştırılır. Sermaye ihtiyacı, su, pazarlama kolaylığı ve fiyat riski de kararın parçası olmalıdır."],
    ["Başabaş verim nedir?", "Başabaş verim, dekara maliyetin satış fiyatına bölünmesiyle bulunan ve gelirin maliyeti tam karşıladığı verimdir. Örnek tutarlarla 3.900 TL maliyet ve 14 TL/kg fiyatta başabaş verim yaklaşık 279 kg/da'dır."]
  ],
  tools: ["dekar-verim-hesapla", "donum-metrekare-cevir", "kar-zarar-hesapla", "ton-kg-cevir"],
  related: ["1-donum-kac-metrekare", "basabas-noktasi-nedir", "amortisman-nasil-hesaplanir"],
  sources: [
    ["TÜİK – Bitkisel üretim istatistikleri", "https://www.tuik.gov.tr/"],
    ["Tarım ve Orman Bakanlığı", "https://www.tarimorman.gov.tr/"],
    ["Toprak Mahsulleri Ofisi (TMO)", "https://www.tmo.gov.tr/"]
  ]
};
