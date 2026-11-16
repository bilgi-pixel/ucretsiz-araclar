export default {
  slug: "nufus-yogunlugu-nasil-hesaplanir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Nüfus Yoğunluğu Nasıl Hesaplanır? Aritmetik, Tarımsal ve Fizyolojik",
  pageTitle: "Nüfus Yoğunluğu Nasıl Hesaplanır? Aritmetik, Tarımsal, Fizyolojik",
  description: "Aritmetik nüfus yoğunluğu = nüfus ÷ yüz ölçümü. TÜİK 2025 verisiyle Türkiye'de km²'ye 112, İstanbul'da 2.943 kişi düşüyor. Tarımsal, fizyolojik yoğunluk ve artış hızı.",
  keywords: ["nüfus yoğunluğu nasıl hesaplanır", "aritmetik nüfus yoğunluğu", "tarımsal nüfus yoğunluğu", "fizyolojik nüfus yoğunluğu", "nüfus artış hızı", "km² başına kişi", "türkiye nüfus yoğunluğu", "nüfus piramidi"],
  lead: "Nüfus yoğunluğu, <strong>bir bölgenin nüfusunun yüz ölçümüne bölünmesiyle bulunur ve kilometrekare başına düşen kişi sayısını gösterir</strong>; buna aritmetik nüfus yoğunluğu denir. TÜİK'in 2025 sonu verilerine göre Türkiye'de kilometrekareye 112 kişi düşmektedir; en yoğun il 2.943 kişiyle İstanbul, en seyrek il 11 kişiyle Tunceli'dir. Tarımsal yoğunluk tarımla geçinen nüfusu, fizyolojik yoğunluk ise toplam nüfusu yalnızca tarım alanına böler. Bu sayfada üç formülü, çözümlü örnekleri, nüfus artış hızı hesabını ve nüfus piramidinin okunuşunu bulacaksınız.",
  kisaCevap: [
    "Aritmetik nüfus yoğunluğu = toplam nüfus ÷ yüz ölçümü (km²); birimi kişi/km²'dir.",
    "Tarımsal nüfus yoğunluğu = tarımla geçinen nüfus ÷ tarım alanı (km²).",
    "Fizyolojik nüfus yoğunluğu = toplam nüfus ÷ tarım alanı (km²); tarım alanı üzerindeki baskıyı gösterir.",
    "TÜİK 2025: Türkiye nüfusu 86.092.168, yoğunluk 112 kişi/km²; İstanbul 2.943, Tunceli 11 kişi/km².",
    "Yıllık nüfus artış hızı (binde) = ln(son nüfus ÷ ilk nüfus) ÷ yıl × 1.000; Türkiye'de 2025'te binde 5 oldu.",
    "Kalabalık bir il yoğunlukta geride kalabilir, çünkü yoğunluk nüfusu alana göre ölçer; geniş yüz ölçümü değeri düşürür."
  ],
  figure: {
    alt: "Üç nüfus yoğunluğu türünün örnek bir il için karşılaştırması: aritmetik 80, tarımsal 50, fizyolojik 200 kişi/km²; formüllerdeki pay ve paydaların kutularla gösterimi.",
    caption: "Örnek il: yüz ölçümü 12.000 km², nüfus 960.000, tarım alanı 4.800 km², tarımla geçinen nüfus 240.000. Aynı ilde üç ölçüt üç farklı değer verir; her biri başka bir soruya cevaptır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Aynı il, üç farklı yoğunluk</text>
  <rect x="20" y="54" width="220" height="190" rx="10" class="sf sb"/>
  <text x="130" y="82" class="b mid">Aritmetik</text>
  <text x="130" y="112" class="sm mid">960.000 kişi</text>
  <line x1="60" y1="122" x2="200" y2="122" class="st" fill="none"/>
  <text x="130" y="142" class="sm mid">12.000 km² (tüm alan)</text>
  <text x="130" y="200" class="xl mid">80</text>
  <text x="130" y="226" class="sm mid mu">kişi/km²</text>
  <rect x="250" y="54" width="220" height="190" rx="10" class="oks"/>
  <text x="360" y="82" class="b mid">Tarımsal</text>
  <text x="360" y="112" class="sm mid">240.000 çiftçi nüfus</text>
  <line x1="290" y1="122" x2="430" y2="122" class="st" fill="none"/>
  <text x="360" y="142" class="sm mid">4.800 km² tarım alanı</text>
  <text x="360" y="200" class="xl mid">50</text>
  <text x="360" y="226" class="sm mid">kişi/km²</text>
  <rect x="480" y="54" width="220" height="190" rx="10" class="p"/>
  <text x="590" y="82" class="b mid sf">Fizyolojik</text>
  <text x="590" y="112" class="sm mid sf">960.000 kişi</text>
  <line x1="520" y1="122" x2="660" y2="122" class="sb" fill="none"/>
  <text x="590" y="142" class="sm mid sf">4.800 km² tarım alanı</text>
  <text x="590" y="200" class="xl mid sf">200</text>
  <text x="590" y="226" class="sm mid sf">kişi/km²</text>
  <text x="20" y="280" class="b">Türkiye, TÜİK 2025 (kişi/km²)</text>
  <text x="20" y="316">Tunceli</text>
  <rect x="130" y="300" width="4" height="24" class="ps"/><text x="142" y="318" class="sm b">11</text>
  <text x="20" y="352">Türkiye</text>
  <rect x="130" y="336" width="21" height="24" class="ps"/><text x="160" y="354" class="sm b">112</text>
  <text x="20" y="388">İstanbul</text>
  <rect x="130" y="372" width="560" height="24" class="p"/><text x="680" y="390" class="sm b end sf">2.943</text>
</svg>`
  },
  sections: [
    {
      h: "Nüfus yoğunluğu nedir?",
      p: [
        "Nüfus yoğunluğu, bir bölgede birim alana düşen ortalama kişi sayısıdır. Türkiye'de ve dünyada en yaygın birim kişi/km²'dir. Bir ülkenin, ilin ya da ilçenin ne kadar kalabalık olduğunu yalnızca nüfus sayısıyla anlatmak yanıltıcı olabilir; 1 milyon kişinin 1.000 km²'ye ya da 50.000 km²'ye yayılması çok farklı yaşam koşulları demektir. Yoğunluk bu farkı tek bir sayıyla görünür kılar.",
        "Coğrafya derslerinde ve sınavlarda üç tür nüfus yoğunluğu öğretilir: aritmetik, tarımsal ve fizyolojik. Üçü de bir bölme işlemidir; farkları pay ve paydada neyin kullanıldığıdır. Hangi yoğunluğun hesaplanacağı, cevaplanmak istenen soruya bağlıdır: genel kalabalık mı, tarım alanları üzerindeki baskı mı, tarımın ne kadar emek yoğun yapıldığı mı?"
      ]
    },
    {
      h: "Nüfus yoğunluğu nasıl hesaplanır? Üç formül",
      formula: "Aritmetik yoğunluk = toplam nüfus ÷ yüz ölçümü (km²)\nTarımsal yoğunluk = tarımla geçinen nüfus ÷ tarım alanı (km²)\nFizyolojik yoğunluk = toplam nüfus ÷ tarım alanı (km²)",
      table: {
        head: ["Tür", "Pay", "Payda", "Neyi gösterir?"],
        rows: [
          ["Aritmetik", "Toplam nüfus", "Toplam yüz ölçümü", "Genel kalabalık düzeyi"],
          ["Tarımsal", "Tarımla geçinen nüfus", "Tarım alanı", "Tarımda emek yoğunluğu, makineleşme düzeyi"],
          ["Fizyolojik", "Toplam nüfus", "Tarım alanı", "Tarım topraklarına düşen nüfus baskısı"]
        ]
      },
      after: [
        "Fizyolojik yoğunluk her zaman aritmetik yoğunluktan büyüktür, çünkü aynı nüfus daha küçük bir alana (yalnızca tarım alanına) bölünür. Tarımsal yoğunluk ise ekonomik yapıya göre değişir: tarımda makineleşmenin yaygın olduğu bölgelerde birim tarım alanında daha az kişi çalıştığı için tarımsal yoğunluk düşüktür."
      ]
    },
    {
      h: "Çözümlü örnek: aynı ilde üç yoğunluk",
      p: [
        "Bir ilin yüz ölçümü 12.000 km², nüfusu 960.000 kişi olsun. İlde 4.800 km² tarım alanı bulunsun ve 240.000 kişi geçimini tarımdan sağlasın. Üç yoğunluğu sırayla hesaplayalım."
      ],
      ol: [
        "<strong>Aritmetik:</strong> 960.000 ÷ 12.000 = 80 kişi/km².",
        "<strong>Tarımsal:</strong> 240.000 ÷ 4.800 = 50 kişi/km².",
        "<strong>Fizyolojik:</strong> 960.000 ÷ 4.800 = 200 kişi/km².",
        "<strong>Yorum:</strong> Fizyolojik yoğunluğun aritmetik yoğunluğun 2,5 katı olması, ilin topraklarının ancak %40'ının tarıma elverişli olduğunu gösterir (4.800 ÷ 12.000 = 0,4). Tarımla geçinen nüfusun oranı ise 240.000 ÷ 960.000 = %25'tir."
      ],
      after: [
        "Sınavlarda sık görülen bir başka soru tipi, yoğunluk ve alan verilip nüfusun istenmesidir. Bu durumda formülü tersine çevirirsiniz: nüfus = yoğunluk × alan. Örneğin yoğunluğu 150 kişi/km² ve alanı 4.000 km² olan bir ilin nüfusu 150 × 4.000 = 600.000 kişidir. Bu tür ters ve doğru orantı sorularının mantığını [[bilgi:oran-oranti-nasil-cozulur|oran orantı nasıl çözülür]] yazısında bulabilirsiniz.",
        "Alan bazen km² yerine hektar ya da dekar olarak verilir. 1 km² = 100 hektar = 1.000 dekar olduğunu unutmayın; birimleri çevirmeden bölme yaparsanız sonuç 100 ya da 1.000 kat hatalı çıkar. Dönüşümler için [[bilgi:alan-birimleri-m2-cm2-km2-hektar-donusumu|alan birimleri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Türkiye'de nüfus yoğunluğu (TÜİK 2025)",
      p: [
        "TÜİK'in Şubat 2026'da açıkladığı Adrese Dayalı Nüfus Kayıt Sistemi (ADNKS) sonuçlarına göre 31 Aralık 2025 itibarıyla Türkiye'nin nüfusu 86.092.168 kişidir. Türkiye genelinde kilometrekareye düşen kişi sayısı 112'dir."
      ],
      table: {
        head: ["Gösterge (31.12.2025)", "Değer", "Kaynak"],
        rows: [
          ["Türkiye nüfusu", "86.092.168 kişi", "TÜİK, ADNKS 2025"],
          ["Türkiye nüfus yoğunluğu", "112 kişi/km²", "TÜİK, ADNKS 2025"],
          ["En yoğun il: İstanbul", "2.943 kişi/km²", "TÜİK, ADNKS 2025"],
          ["İstanbul nüfusu", "15.754.053 kişi", "TÜİK, ADNKS 2025"],
          ["En seyrek il: Tunceli", "11 kişi/km²", "TÜİK, ADNKS 2025"],
          ["Yıllık nüfus artış hızı", "Binde 5 (2024'te binde 3,4)", "TÜİK, ADNKS 2025"],
          ["İl ve ilçe merkezlerinde yaşayanlar", "%93,6", "TÜİK, ADNKS 2025"]
        ],
        caption: "TÜİK yoğunluğu illerin göl yüzeyleri hariç yüz ölçümüne göre hesaplar. Güncel ve il bazlı veriler için TÜİK'in veri portalına bakın."
      },
      after: [
        "İki değeri birbirinden kontrol edebilirsiniz: 86.092.168 ÷ 112 ≈ 768.700 km², yani yoğunluğun hesaplandığı alan yaklaşık 770 bin km²'dir. Aynı şekilde 15.754.053 ÷ 2.943 ≈ 5.353 km² İstanbul'un hesapta kullanılan yüz ölçümüne yakın bir değerdir. İstanbul ile Tunceli arasındaki fark yaklaşık 270 kattır. Bu kadar büyük farklar, ülke ortalamasının tek başına bir ilin yaşam koşullarını anlatmaya yetmediğini gösterir."
      ]
    },
    {
      h: "Nüfus yoğunluğu ile nüfus miktarı neden farklı sıralama verir?",
      p: [
        "Nüfus miktarı yalnızca kişi sayısını, yoğunluk ise kişi sayısının alana oranını ölçer. Bu yüzden nüfusu kalabalık ama yüz ölçümü geniş bir il, yoğunluk sıralamasında daha küçük ama sıkışık bir ilin gerisinde kalabilir. Örneğin Konya nüfus bakımından Türkiye'nin en kalabalık illerinden biridir, ama yüz ölçümü çok geniş olduğu için yoğunluğu ülke ortalamasının altındadır. Tersine Kocaeli gibi yüz ölçümü küçük sanayi illeri yoğunlukta üst sıralara çıkar.",
        "Basit bir örnekle: A ilinde 2.000.000 kişi 20.000 km²'de yaşıyor (100 kişi/km²), B ilinde 600.000 kişi 1.500 km²'de yaşıyor (400 kişi/km²). A ili nüfusta 3 kattan fazla önde, ama B ili yoğunlukta 4 kat önde. İki sıralamayı karıştırmamak, coğrafya sorularında en sık yapılan hatayı önler."
      ]
    },
    {
      h: "Nüfus artış hızı nasıl hesaplanır?",
      p: [
        "Nüfus artış hızı, nüfusun belirli bir sürede ne kadar değiştiğini binde (‰) olarak ifade eder. TÜİK yıllık nüfus artış hızını üstel büyüme varsayımıyla, doğal logaritma kullanarak hesaplar. Okul sorularında ise çoğu zaman basit yüzde ya da binde değişim kullanılır; kısa sürelerde iki yöntem birbirine çok yakın sonuç verir."
      ],
      formula: "TÜİK yöntemi: r (binde) = ln(Pₜ ÷ P₀) ÷ t × 1.000\nBasit yöntem: r (binde) = (Pₜ − P₀) ÷ P₀ × 1.000\nP₀: ilk nüfus · Pₜ: son nüfus · t: yıl sayısı",
      ol: [
        "2024 sonu nüfus: 85.664.944; 2025 sonu nüfus: 86.092.168; t = 1 yıl.",
        "Oran: 86.092.168 ÷ 85.664.944 ≈ 1,004987.",
        "Doğal logaritma: ln(1,004987) ≈ 0,004975.",
        "Binde artış hızı: 0,004975 × 1.000 ≈ 4,97, yani yaklaşık binde 5. Basit yöntem de ≈ 4,99 verir."
      ],
      after: [
        "Çok yıllık dönemlerde logaritmalı yöntem, yıllık ortalama büyümeyi doğru verir; ekonomideki bileşik büyüme oranıyla aynı mantıktır. Bu mantığı [[bilgi:cagr-yillik-bilesik-buyume-orani|yıllık bileşik büyüme oranı]] yazısında, yüzde ve yüzde puan farkını [[bilgi:yuzde-puan-ve-yuzde-degisim-farki|yüzde puan ve yüzde değişim]] yazısında bulabilirsiniz. Basit yüzde değişimi hızla hesaplamak için [[arac:yuzde-degisim-hesapla|Yüzde Değişim Hesaplama]] aracı kullanılabilir."
      ]
    },
    {
      h: "Nüfus piramidi nasıl okunur?",
      p: [
        "Nüfus piramidi, nüfusun yaş gruplarına ve cinsiyete göre dağılımını gösteren yatay çubuk grafiktir. Ortadaki dikey eksenin solunda erkekler, sağında kadınlar yer alır; en alttaki çubuk 0–4 yaş grubunu, yukarı çıktıkça daha ileri yaş gruplarını gösterir. Çubuğun uzunluğu o yaş grubundaki kişi sayısını ya da toplam nüfus içindeki payını verir."
      ],
      ul: [
        "<strong>Tabanı geniş, tepesi dar piramit:</strong> Doğum oranı yüksek, ortalama yaşam süresi görece kısa, genç ve hızlı büyüyen nüfus.",
        "<strong>Tabanı daralan, ortası şişkin piramit:</strong> Doğum oranının düştüğü, nüfusun yaşlanmaya başladığı geçiş dönemi.",
        "<strong>Tersine dönmeye başlayan piramit:</strong> Doğumların azaldığı, yaşlı nüfus payının arttığı, büyümenin durduğu ya da negatife döndüğü nüfus.",
        "<strong>Tek bir yaş grubundaki girinti:</strong> Savaş, salgın ya da göç gibi bir olayın izleri olabilir."
      ],
      after: [
        "Türkiye'nin piramidi son yıllarda tabanı daralan bir yapıya dönüşmektedir; TÜİK verilerine göre çocuk nüfusunun toplam içindeki payı 2025 sonunda %24,8'e gerilemiştir. Bu durum, ileride çalışma çağındaki ve yaşlı nüfusun payının artacağına işaret eder."
      ]
    },
    {
      h: "Yoğunluk haritası nasıl yorumlanır? TÜİK verileri nereden alınır?",
      p: [
        "Nüfus yoğunluğu haritalarında iller ya da ilçeler, yoğunluk aralıklarına göre farklı renk tonlarıyla boyanır; koyu renk genellikle yüksek yoğunluğu gösterir. Haritayı yorumlarken lejanttaki aralıklara dikkat edin: aralıklar eşit değilse (örneğin 0–50, 50–100, 100–500, 500 üzeri) renk farkı gerçek farkı olduğundan küçük ya da büyük gösterebilir.",
        "Yüksek yoğunluk genellikle sanayi, ticaret ve liman kentlerinde, verimli ovalarda ve iklimi ılıman kıyılarda görülür. Düşük yoğunluk ise dağlık, engebeli, iklimi sert ya da ulaşımı zor bölgelerde yoğunlaşır. Türkiye'de Marmara kıyıları ile Ege ve Akdeniz'in ovaları yoğun, Doğu Anadolu'nun yüksek kesimleri ve İç Anadolu'nun bazı bölümleri seyrek nüfusludur.",
        "Resmî veriler TÜİK'in veri portalında yayımlanır. ADNKS sonuçları her yıl genellikle şubat ayında, bir önceki yılın 31 Aralık tarihi itibarıyla açıklanır. Portaldan il ve ilçe nüfuslarını, yüz ölçümlerini ve yoğunlukları indirip kendi hesaplarınızı yapabilirsiniz; oran hesapları için [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] aracı yardımcı olur."
      ]
    }
  ],
  faq: [
    ["Nüfus yoğunluğu nasıl hesaplanır?", "Aritmetik nüfus yoğunluğu, toplam nüfusun yüz ölçümüne bölünmesiyle bulunur ve kişi/km² olarak ifade edilir. 960.000 nüfuslu, 12.000 km²'lik bir ilde yoğunluk 80 kişi/km²'dir."],
    ["Aritmetik, tarımsal ve fizyolojik yoğunluk farkı nedir?", "Aritmetik yoğunluk toplam nüfusu toplam alana, tarımsal yoğunluk tarımla geçinen nüfusu tarım alanına, fizyolojik yoğunluk ise toplam nüfusu tarım alanına böler. Her biri farklı bir soruyu cevaplar."],
    ["Nüfus artış hızı nasıl hesaplanır?", "TÜİK yöntemiyle artış hızı, son nüfusun ilk nüfusa oranının doğal logaritmasının yıl sayısına bölünüp binle çarpılmasıyla bulunur. 2025'te Türkiye'de yıllık artış hızı yaklaşık binde 5 olmuştur."],
    ["Türkiye'de nüfus yoğunluğu en yüksek il hangisi?", "TÜİK'in 2025 sonu verilerine göre nüfus yoğunluğu en yüksek il kilometrekareye 2.943 kişiyle İstanbul'dur. En düşük yoğunluk ise kilometrekareye 11 kişiyle Tunceli'dedir."],
    ["Nüfus yoğunluğu ile nüfus miktarı neden farklı sıralama verir?", "Nüfus miktarı yalnızca kişi sayısını, yoğunluk ise kişi sayısının alana oranını ölçer. Kalabalık ama geniş yüz ölçümlü bir il, daha az nüfuslu ama küçük alanlı bir ilin yoğunlukta gerisinde kalabilir."],
    ["Nüfus piramidi nasıl okunur?", "Piramitte dikey eksenin solunda erkekler, sağında kadınlar, aşağıdan yukarıya yaş grupları yer alır. Geniş taban genç ve hızlı büyüyen, daralan taban yaşlanan bir nüfusa işaret eder."],
    ["TÜİK nüfus verileri nereden alınır?", "Resmî nüfus verileri TÜİK'in veri portalında yayımlanır. Adrese Dayalı Nüfus Kayıt Sistemi sonuçları genellikle her yıl şubatta, bir önceki yılın son günü itibarıyla açıklanır."],
    ["Yoğunluk haritası nasıl yorumlanır?", "Renk tonları yoğunluk aralıklarını gösterir; koyu renk genellikle yüksek yoğunluktur. Lejanttaki aralıkların eşit olup olmadığına bakmak ve yoğunluğun sanayi, iklim ve yer şekilleriyle ilişkisini düşünmek gerekir."],
    ["Fizyolojik yoğunluk neden aritmetik yoğunluktan büyüktür?", "Fizyolojik yoğunlukta aynı toplam nüfus, toplam alan yerine yalnızca tarım alanına bölünür. Tarım alanı her zaman toplam alandan küçük olduğu için sonuç daha büyük çıkar."]
  ],
  tools: ["oran-oranti-hesapla", "yuzde-degisim-hesapla", "metrekare-hesapla"],
  related: ["oran-oranti-nasil-cozulur", "yuzde-puan-ve-yuzde-degisim-farki", "cagr-yillik-bilesik-buyume-orani", "alan-birimleri-m2-cm2-km2-hektar-donusumu"],
  sources: [
    ["TÜİK – Adrese Dayalı Nüfus Kayıt Sistemi Sonuçları, 2025", "https://data.tuik.gov.tr/"],
    ["TÜİK – Türkiye İstatistik Kurumu", "https://www.tuik.gov.tr/"]
  ]
};
