export default {
  slug: "yuzde-puan-ve-yuzde-degisim-farki",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Yüzde Puan ile Yüzde Değişim Farkı Nedir? Faiz ve Enflasyon Haberlerinde",
  pageTitle: "Yüzde Puan ile Yüzde Farkı: Baz Puan ve Yüzde Değişim",
  description: "Faiz %40'tan %45'e çıkınca artış 5 yüzde puan, ama yüzde değişim %12,5'tir. Baz puan, simetrik yüzde fark, negatif değerler ve haberlerdeki ifadelerin anlamı.",
  keywords: ["yüzde puan nedir", "yüzde puan yüzde farkı", "baz puan nedir", "yüzde değişim hesaplama", "faiz 500 baz puan", "yüzde fark simetrik", "enflasyon yüzde puan düştü", "puan mı yüzde mi"],
  lead: "Yüzde puan, <strong>iki yüzde oranı arasındaki basit çıkarma farkıdır</strong>; yüzde değişim ise bu farkın başlangıç oranına göre büyüklüğüdür. Politika faizi %40'tan %45'e çıktığında artış <strong>5 yüzde puan</strong>dır, ama oran kendi içinde <strong>%12,5</strong> büyümüştür. Haberlerde iki ifade sık karıştırılır ve aynı olay çok farklı büyüklükte algılanır. Bu yazıda yüzde puan, baz puan, yüzde değişim ve simetrik yüzde farkın formüllerini, çözümlü örnekleri ve faiz, enflasyon ve anket haberlerini doğru okumayı bulacaksınız.",
  kisaCevap: [
    "Yüzde puan farkı = yeni oran − eski oran: %40 → %45 artış 5 yüzde puandır.",
    "Yüzde değişim = (yeni − eski) ÷ eski × 100: %40 → %45 artış %12,5'tir.",
    "1 baz puan = 0,01 yüzde puan; 100 baz puan = 1 yüzde puan; 500 baz puan = 5 yüzde puan.",
    "Yüzde değişim simetrik değildir: 40'tan 45'e %12,5 artış, 45'ten 40'a %11,1 düşüştür.",
    "Simetrik yüzde fark = |a − b| ÷ ((a + b) ÷ 2) × 100; 40 ile 45 arasında %11,76'dır.",
    "Enflasyonun 5 puan düşmesi fiyatların düştüğü değil, daha yavaş arttığı anlamına gelir."
  ],
  figure: {
    alt: "Faiz oranının yüzde 40'tan yüzde 45'e çıkışı: iki çubuk arasındaki fark 5 yüzde puan ya da 500 baz puan; bu fark başlangıç oranının yüzde 12,5'i.",
    caption: "Aynı artış üç şekilde ifade edilebilir: 5 yüzde puan, 500 baz puan ya da %12,5 yüzde değişim. Hangisinin kullanıldığı haberin algısını değiştirir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı artış, üç farklı ifade</text>
  <line x1="60" y1="340" x2="380" y2="340" class="st" fill="none"/>
  <rect x="100" y="100" width="90" height="240" class="ps sb"/>
  <rect x="250" y="70" width="90" height="270" class="p"/>
  <text x="145" y="92" class="b mid">%40</text>
  <text x="295" y="62" class="b mid">%45</text>
  <text x="145" y="362" class="sm mid">Eski oran</text>
  <text x="295" y="362" class="sm mid">Yeni oran</text>
  <line x1="190" y1="100" x2="250" y2="100" class="sa dash" fill="none"/>
  <rect x="250" y="70" width="90" height="30" class="a"/>
  <text x="295" y="90" class="sm mid b">+5</text>
  <g>
    <rect x="410" y="60" width="290" height="78" rx="10" class="ps"/>
    <text x="430" y="88" class="b">Yüzde puan farkı</text>
    <text x="430" y="116" class="lg b p">45 − 40 = 5 puan</text>
    <rect x="410" y="152" width="290" height="78" rx="10" class="sf sb"/>
    <text x="430" y="180" class="b">Baz puan</text>
    <text x="430" y="208" class="lg b">5 × 100 = 500 bp</text>
    <rect x="410" y="244" width="290" height="96" rx="10" class="oks"/>
    <text x="430" y="272" class="b">Yüzde değişim</text>
    <text x="430" y="300" class="lg b ok">5 ÷ 40 = %12,5</text>
    <text x="430" y="324" class="sm t2">Geri dönüş: 5 ÷ 45 = %11,1 düşüş</text>
  </g>
  <text x="360" y="390" class="sm mid t2">Puan: oranlar arası fark · Yüzde değişim: farkın eski orana oranı</text>
</svg>`
  },
  sections: [
    {
      h: "Yüzde ile yüzde puan arasındaki fark nedir?",
      p: [
        "Yüzde, bir miktarın yüzde kaçının söz konusu olduğunu anlatır. Bir oranın kendisi de yüzde olarak ifade edildiğinde, örneğin faiz, enflasyon, işsizlik ya da oy oranı, iki oran arasındaki farkı anlatmanın iki yolu doğar. Birincisi oranları birbirinden çıkarmaktır; sonuç <strong>yüzde puan</strong> (kısaca puan) olarak söylenir. İkincisi, bu farkın başlangıç oranına göre büyüklüğünü bulmaktır; sonuç <strong>yüzde değişim</strong>dir.",
        "Karışıklık şu cümlelerde ortaya çıkar: \"İşsizlik %10'dan %12'ye yükseldi.\" Bu artış 2 yüzde puandır; ama işsiz oranı kendi içinde %20 artmıştır. \"İşsizlik %2 arttı\" demek ise yanlış anlaşılmaya açıktır; okuyucu %10'un %2 fazlası olan %10,2'yi anlayabilir. Doğru ifade \"2 puan arttı\" ya da \"%20 arttı\" olmalıdır.",
        "Kısaca: oranlar arasındaki farktan söz ediyorsanız <strong>puan</strong>, büyüme ya da küçülme hızından söz ediyorsanız <strong>yüzde</strong> kullanın. Genel yüzde hesaplarını hızlıca yapmak için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracı işinizi görür."
      ]
    },
    {
      h: "Formüller: yüzde puan, yüzde değişim ve baz puan",
      formula: "Yüzde puan farkı = yeni oran − eski oran\nYüzde değişim (%) = (yeni değer − eski değer) ÷ eski değer × 100\nBaz puan = yüzde puan × 100  (1 bp = 0,01 puan)\nSimetrik yüzde fark (%) = |a − b| ÷ ((a + b) ÷ 2) × 100",
      p: [
        "Yüzde değişim formülü yalnızca oranlarda değil, fiyat, maaş, nüfus gibi her türlü değerde kullanılır. Yüzde puan ise yalnızca iki yüzde oranı karşılaştırılırken anlamlıdır; \"maaş 5 puan arttı\" gibi bir ifade, maaş bir oran olmadığı için doğru değildir."
      ],
      after: [
        "Eski ve yeni değeri yazarak artış ya da azalış oranını, aradaki farkı ve eski değere dönmek için gereken oranı [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek: faiz %40'tan %45'e çıkarsa",
      ol: [
        "Yüzde puan farkı: 45 − 40 = 5 yüzde puan.",
        "Baz puan: 5 × 100 = 500 baz puan. Haberde \"500 baz puanlık artış\" diye geçer.",
        "Yüzde değişim: (45 − 40) ÷ 40 × 100 = %12,5. Faiz oranı kendi içinde sekizde bir büyümüştür.",
        "Tersine düşüş: faiz %45'ten %40'a inerse yüzde değişim (40 − 45) ÷ 45 × 100 = −%11,1 olur, puan farkı yine 5'tir.",
        "Kredi etkisi: 100.000 TL'lik bir tutarın yıllık basit faizi %40'ta 40.000 TL, %45'te 45.000 TL'dir; faiz yükü 5.000 TL, yani %12,5 artar."
      ],
      after: [
        "Son adım önemlidir: yüzde puan farkı oranlar arasındaki mesafeyi, yüzde değişim ise ödenecek faiz tutarındaki göreli artışı gösterir. Kredi ve mevduat faizinin tutara etkisini görmek için [[arac:faiz-hesapla|Faiz Hesaplama]] aracını kullanabilirsiniz; nominal ve efektif faiz farkı ise [[bilgi:nominal-ve-efektif-faiz-farki|nominal ve efektif faiz]] yazısında anlatılır."
      ]
    },
    {
      h: "Baz puan nedir, neden kullanılır?",
      p: [
        "Baz puan (bp), yüzde puanın yüzde biridir: 1 baz puan = 0,01 yüzde puan. Merkez bankaları, bankalar ve finans piyasaları küçük oran değişikliklerini kesirli yüzde puanlarla anlatmak yerine baz puanla ifade eder. \"Faiz 0,25 puan artırıldı\" yerine \"25 baz puan artırıldı\" demek hem kısadır hem de \"yüzde\" kelimesinin yarattığı belirsizliği ortadan kaldırır."
      ],
      table: {
        head: ["Baz puan", "Yüzde puan", "Örnek ifade"],
        rows: [
          ["1 bp", "0,01 puan", "Tahvil faizi 1 baz puan geriledi"],
          ["25 bp", "0,25 puan", "%42,50'den %42,75'e"],
          ["50 bp", "0,5 puan", "%45'ten %45,5'e"],
          ["100 bp", "1 puan", "%40'tan %41'e"],
          ["250 bp", "2,5 puan", "%47,5'ten %45'e indirim"],
          ["500 bp", "5 puan", "%40'tan %45'e artış"]
        ]
      },
      after: [
        "Baz puan da puan gibi oranlar arası farktır; yüzde değişim değildir. 250 baz puanlık indirim, %47,5'lik bir faizde yaklaşık %5,3'lük, %10'luk bir faizde ise %25'lik bir göreli düşüş anlamına gelir."
      ]
    },
    {
      h: "Yüzde değişim ve simetrik yüzde fark neden farklı sonuç verir?",
      p: [
        "Yüzde değişim her zaman <strong>başlangıç değerine</strong> göre hesaplanır; bu yüzden yön değiştiğinde sonuç da değişir. 40'tan 45'e artış %12,5, 45'ten 40'a düşüş %11,1'dir. Hangi değerin başlangıç olduğu belli değilse, örneğin iki mağazadaki fiyatı ya da iki şehrin nüfusunu karşılaştırıyorsanız, iki değerin ortalamasını taban alan <strong>simetrik yüzde fark</strong> kullanılır.",
        "Simetrik farkta 40 ile 45 arasındaki fark |40 − 45| ÷ 42,5 × 100 = %11,76'dır ve hangi sırayla yazarsanız yazın aynı çıkar. İki değer birbirine yakınken üç yöntem benzer sonuç verir; değerler uzaklaştıkça fark büyür."
      ],
      table: {
        head: ["Karşılaştırma", "A'dan B'ye değişim", "B'den A'ya değişim", "Simetrik fark"],
        rows: [
          ["A = 40, B = 45", "+%12,5", "−%11,1", "%11,76"],
          ["A = 80 TL, B = 100 TL", "+%25", "−%20", "%22,2"],
          ["A = 50, B = 100", "+%100", "−%50", "%66,7"]
        ]
      },
      after: [
        "Örneğin aynı ürün bir mağazada 80 TL, diğerinde 100 TL ise \"pahalı olan %25 daha pahalı\" ve \"ucuz olan %20 daha ucuz\" cümlelerinin ikisi de doğrudur. Sıra belirtmeden karşılaştırmak için %22,2'lik simetrik farkı [[arac:yuzde-fark-hesapla|Yüzde Fark Hesaplama]] aracıyla bulabilirsiniz."
      ]
    },
    {
      h: "Enflasyon haberlerinde \"puan düştü\" ne demek?",
      p: [
        "Yıllık enflasyonun %50'den %45'e indiğini düşünelim. Bu, enflasyonun 5 puan düştüğü anlamına gelir. Yüzde değişimle ifade edersek enflasyon oranı %10 gerilemiştir. Ancak en önemli nokta şudur: fiyatlar düşmemiştir. Yıllık %45 enflasyon, fiyatların bir yıl önceye göre ortalama %45 daha yüksek olduğunu gösterir; yalnızca artış hızı yavaşlamıştır.",
        "Fiyatların gerçekten düşmesi için enflasyonun eksi olması (deflasyon) gerekir. Bu ayrım maaş pazarlığında da önemlidir: enflasyon düşerken alınan %45'lik zam, %50 enflasyonlu yıla göre daha fazla alım gücü korur; ama fiyatlar düşmediği için maaşın satın aldığı sepet yine pahalıdır. Paranın değerinin zaman içindeki değişimi [[bilgi:enflasyona-gore-paranin-degeri|enflasyona göre paranın değeri]], gerçek getiri [[bilgi:reel-faiz-nedir-nasil-hesaplanir|reel faiz]] yazısında anlatılır."
      ]
    },
    {
      h: "Negatif değerler ve anket sonuçları",
      p: [
        "Başlangıç değeri negatif ya da sıfırsa yüzde değişim yanıltıcı olur. Bir şirket geçen yıl 20 milyon TL zarar edip bu yıl 10 milyon TL zarar ettiyse durum iyileşmiştir; ancak formül (−10 − (−20)) ÷ (−20) = −%50 sonucunu verir ve sanki kötüleşme varmış gibi görünür. Bu nedenle negatif tabanlarda payda olarak başlangıç değerinin mutlak değeri kullanılır ve sonuç \"zarar %50 azaldı\" diye ifade edilir. Başlangıç sıfırsa yüzde değişim tanımsızdır; yalnızca mutlak fark söylenebilir.",
        "Anket ve seçim sonuçlarında yüzde puan özellikle önemlidir. Bir partinin oyu %30'dan %33'e çıktıysa artış 3 puandır; yüzde değişimle %10'dur. \"Oy oranı %10 arttı\" demek teknik olarak doğrudur ama okuyucu %40'a çıktığını sanabilir. Bu yüzden anket raporları farkı puan olarak verir. Anketlerdeki hata payı da puanla ifade edilir: \"±3 puan hata payı\", tahminin 3 puan aşağı ya da yukarı olabileceğini gösterir."
      ]
    },
    {
      h: "Bir haberi okurken sorulacak dört soru",
      ol: [
        "Konuşulan şey bir oran mı (faiz, enflasyon, oy oranı), yoksa bir tutar mı (fiyat, maaş, nüfus)? Oransa puan ifadesi beklenir.",
        "Verilen sayı puan farkı mı, yüzde değişim mi? \"Puan\" ya da \"baz puan\" kelimesi geçmiyorsa iki anlama da gelebilir; eski ve yeni değeri arayın.",
        "Başlangıç değeri hangisi? Yüzde değişim hep başlangıca göre hesaplanır; taban değişince sonuç değişir.",
        "Mutlak etki ne kadar? Oran değişiminin tutara etkisini kendi borç ya da birikim tutarınızla hesaplayın."
      ],
      after: [
        "Bu dört soruyu sormak, \"faiz yüzde 12,5 arttı\" ile \"faiz 5 puan arttı\" başlıklarının aynı olayı anlattığını hemen görmenizi sağlar. Karşılaştırmayı kendi rakamlarınızla yapmak, başlığın yarattığı algıdan bağımsız bir karar vermenin en kısa yoludur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Puanı yüzde diye söylemek:</strong> \"Faiz %5 arttı\" yerine \"faiz 5 puan arttı\" deyin; aksi hâlde %40'ın %5'i olan 2 puan anlaşılabilir.",
        "<strong>Art arda yüzdeleri toplamak:</strong> Önce %10 artıp sonra %10 düşen bir fiyat başa dönmez; 100 → 110 → 99 olur.",
        "<strong>Düşüşü aynı oranla geri almak:</strong> %20 düşen bir değeri eski hâline getirmek için %25 artış gerekir.",
        "<strong>Oran olmayan değerlerde puan kullanmak:</strong> Maaş, fiyat ve nüfus için puan değil yüzde değişim kullanılır.",
        "<strong>Enflasyon düşüşünü fiyat düşüşü sanmak:</strong> Enflasyonun düşmesi fiyatların daha yavaş arttığını gösterir."
      ],
      after: [
        "Ardışık indirimlerin neden toplanamadığı [[bilgi:zincirleme-indirim-nasil-hesaplanir|zincirleme indirim]] yazısında örneklerle anlatılır."
      ]
    }
  ],
  faq: [
    ["Yüzde puan ile yüzde arasındaki fark nedir?", "Yüzde puan iki oran arasındaki çıkarma farkıdır; yüzde değişim ise bu farkın başlangıç oranına bölünmesiyle bulunur. Faiz yüzde 40'tan 45'e çıkarsa fark 5 yüzde puan, yüzde değişim ise yüzde 12,5'tir."],
    ["Faiz yüzde 40'tan 45'e çıkınca artış yüzde kaçtır?", "Oranlar arasındaki fark 5 yüzde puan ya da 500 baz puandır. Yüzde değişim olarak ise 5'in 40'a bölünmesiyle yüzde 12,5 artış bulunur; yani faiz yükü kendi içinde sekizde bir büyür."],
    ["Baz puan nedir, 100 baz puan kaç yüzde puandır?", "Baz puan yüzde puanın yüzde biridir; 1 baz puan 0,01 yüzde puana eşittir. Buna göre 100 baz puan 1 yüzde puan, 500 baz puan 5 yüzde puan eder. Finans piyasaları küçük oran değişikliklerini baz puanla ifade eder."],
    ["Yüzde değişim ve yüzde fark (simetrik) neden farklı sonuç verir?", "Yüzde değişim başlangıç değerine göre hesaplanır ve yön değiştiğinde sonuç değişir. Simetrik yüzde fark iki değerin ortalamasını taban alır ve sıradan bağımsızdır. 40 ile 45 için değişim yüzde 12,5 ya da 11,1, simetrik fark 11,76'dır."],
    ["Enflasyon haberlerinde 'puan düştü' ne demektir?", "Yıllık enflasyon oranının bir önceki değere göre kaç yüzde puan azaldığını anlatır. Enflasyonun yüzde 50'den 45'e inmesi 5 puanlık düşüştür; fiyatlar düşmemiş, yalnızca daha yavaş artmaya başlamıştır."],
    ["Negatif değerlerde yüzde değişim nasıl yorumlanır?", "Başlangıç değeri negatifse formül yanıltıcı işaret verir. Bu durumda paydada başlangıç değerinin mutlak değeri kullanılır; 20 milyon zarardan 10 milyon zarara geçiş, zararın yüzde 50 azalması olarak ifade edilir."],
    ["İki ürünün fiyat farkı yüzde kaç olarak ifade edilir?", "Hangi ürünü taban aldığınıza bağlıdır. 80 TL ile 100 TL arasında pahalı olan yüzde 25 daha pahalı, ucuz olan yüzde 20 daha ucuzdur. Taban belirtmeden karşılaştırmak için simetrik fark yüzde 22,2 kullanılabilir."],
    ["Anket sonuçlarında yüzde puan neden kullanılır?", "Oy oranları zaten yüzde olduğu için değişimi puanla vermek karışıklığı önler. Yüzde 30'dan 33'e çıkış 3 puandır; yüzde 10 artış demek okuyucunun oy oranını yüzde 40 sanmasına yol açabilir. Hata payı da puanla verilir."]
  ],
  tools: ["yuzde-fark-hesapla", "yuzde-degisim-hesapla", "yuzde-hesapla", "faiz-hesapla"],
  related: ["nominal-ve-efektif-faiz-farki", "reel-faiz-nedir-nasil-hesaplanir", "enflasyona-gore-paranin-degeri", "zincirleme-indirim-nasil-hesaplanir"],
  sources: [
    ["Türkiye Cumhuriyet Merkez Bankası – Para politikası kararları", "https://www.tcmb.gov.tr/"],
    ["Türkiye İstatistik Kurumu – Tüketici fiyat endeksi", "https://www.tuik.gov.tr/"]
  ]
};
