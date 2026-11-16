export default {
  slug: "fire-orani-nedir-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Fire Oranı Nedir, Nasıl Hesaplanır? Üretimde ve Mutfakta Fire Payı",
  pageTitle: "Fire Oranı Nedir, Nasıl Hesaplanır? Üretim ve Mutfak Örneği",
  description: "Fire oranı = fire miktarı ÷ giren miktar × 100. Verimle ilişkisi, nete eklenecek fire payı, et ve sebze örneği, fire maliyetinin fiyata yansıtılması ve vergi notları.",
  keywords: ["fire oranı nedir", "fire oranı hesaplama", "fire payı nasıl hesaplanır", "üretimde fire", "mutfak fire oranı", "fire maliyeti", "normal fire oranı", "verim randıman hesaplama"],
  lead: "Fire oranı, bir üretim ya da hazırlık sürecine giren malzemenin ne kadarının kullanılamaz hâle geldiğini gösterir ve <strong>fire miktarı ÷ giren miktar × 100</strong> formülüyle hesaplanır. 10 kg et ayıklandığında 3 kg kemik ve sinir çıkıyorsa fire oranı %30, verim (randıman) %70'tir. Fire, kullanılabilir ürünün birim maliyetini yükseltir: kilosu 600 TL'ye alınan etin temizlenmiş kilosu yaklaşık 857 TL'ye gelir. Bu rehberde formülleri, mutfak ve atölye örneklerini, fire payının fiyata nasıl yansıtılacağını ve fireyi azaltmanın yollarını bulacaksınız.",
  kisaCevap: [
    "Fire oranı = fire miktarı ÷ giren (brüt) miktar × 100.",
    "Verim (randıman) = net miktar ÷ giren miktar × 100 = 100 − fire oranı.",
    "Net birim maliyet = toplam alış maliyeti ÷ net miktar; fire arttıkça kullanılabilir ürün pahalanır.",
    "Gereken brüt miktar = hedef net miktar ÷ verim; %70 verimde 14 kg net için 20 kg almak gerekir.",
    "Nete eklenecek fire payı (fire ÷ net) her zaman fire oranından büyüktür: %30 fire için %42,86.",
    "Normal fire oranı sektöre ve ürüne göre değişir; işletmeler kendi ölçümleriyle ve sektör kaynaklarıyla belirler."
  ],
  figure: {
    alt: "10 kg brüt etten 3 kg fire (kemik, sinir, yağ) ve 7 kg net ürün; fire oranı yüzde 30, verim yüzde 70, net kilo maliyeti 857,14 TL; 14 kg net hedefi için 20 kg brüt alım.",
    caption: "Kilosu 600 TL'den alınan 10 kg etin toplam maliyeti 6.000 TL'dir. Ayıklama sonrası 7 kg kalır; aynı 6.000 TL artık 7 kg'a bölünür. Fireyi yalnızca miktar değil, maliyet olarak da görmek gerekir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Fire oranı ve net maliyet: mutfak örneği</text>
  <text x="20" y="66" class="b">Giren: 10 kg × 600 TL = 6.000 TL</text>
  <rect x="20" y="80" width="680" height="56" rx="6" class="sf sb"/>
  <rect x="20" y="80" width="476" height="56" rx="6" class="ok"/>
  <rect x="496" y="80" width="204" height="56" rx="6" class="dg"/>
  <text x="258" y="114" class="lg b mid sf">Net 7 kg (%70 verim)</text>
  <text x="598" y="114" class="lg b mid sf">Fire 3 kg</text>
  <g class="sm mid">
    <text x="20" y="156" class="mu">0</text><text x="496" y="156" class="mu">7 kg</text><text x="700" y="156" class="mu">10 kg</text>
  </g>
  <rect x="20" y="176" width="220" height="96" rx="10" class="dgs"/>
  <text x="130" y="204" class="sm mid">Fire oranı</text>
  <text x="130" y="236" class="xl mid">%30</text>
  <text x="130" y="260" class="sm mid t2">3 ÷ 10 × 100</text>
  <rect x="250" y="176" width="220" height="96" rx="10" class="oks"/>
  <text x="360" y="204" class="sm mid">Net kilo maliyeti</text>
  <text x="360" y="236" class="xl mid">857,14 TL</text>
  <text x="360" y="260" class="sm mid t2">6.000 ÷ 7</text>
  <rect x="480" y="176" width="220" height="96" rx="10" class="ps"/>
  <text x="590" y="204" class="sm mid">Fire maliyeti</text>
  <text x="590" y="236" class="xl mid">1.800 TL</text>
  <text x="590" y="260" class="sm mid t2">3 × 600</text>
  <rect x="20" y="290" width="680" height="110" rx="10" class="sf sb"/>
  <rect x="20" y="290" width="8" height="110" class="p"/>
  <text x="44" y="318" class="b">Ters hesap: 14 kg temizlenmiş et lazım</text>
  <text x="44" y="344">Gereken brüt = 14 ÷ 0,70 = 20 kg  (fire payı ile: 14 × 1,4286 = 20 kg)</text>
  <text x="44" y="372" class="sm t2">Yanlış yöntem: 14 × 1,30 = 18,2 kg → 1,8 kg eksik kalır</text>
</svg>`
  },
  sections: [
    {
      h: "Fire nedir, fire oranı ne işe yarar?",
      p: [
        "Fire, bir malzemenin üretim, hazırlık, kesim, depolama ya da taşıma sırasında kullanılamaz hâle gelen kısmıdır. Etin kemiği ve siniri, sebzenin kabuğu ve sapı, kumaşın kesimden artan parçaları, metal levhadan çıkan talaş, depoda bozulan ya da kırılan ürünler fireye örnektir. Fire bir hata değil, çoğu süreçte kaçınılmaz bir kayıptır; önemli olan onu ölçmek ve kontrol altında tutmaktır.",
        "Fire oranı bu kaybı yüzde olarak ifade eder. Bilmek üç açıdan kritiktir: doğru miktarda malzeme satın almak, kullanılabilir ürünün gerçek maliyetini hesaplamak ve satış fiyatını bu maliyete göre belirlemek. Fireyi hesaba katmayan bir restoran ya da atölye, kâğıt üzerinde kâr ederken gerçekte zarar edebilir."
      ]
    },
    {
      h: "Fire oranı nasıl hesaplanır? Formüller",
      p: [
        "Hesap için iki miktar yeterlidir: sürece giren (brüt) miktar ile ya fire miktarı ya da çıkan net miktar. Birimler aynı olmalıdır; kilogram ile gram, metre ile santimetre karıştırılırsa sonuç anlamsız çıkar."
      ],
      formula: "Fire oranı (%) = fire miktarı ÷ giren miktar × 100\nVerim (%) = net miktar ÷ giren miktar × 100 = 100 − fire oranı\nNete eklenecek fire payı (%) = fire miktarı ÷ net miktar × 100\nGereken brüt miktar = hedef net miktar ÷ (verim ÷ 100)\nNet birim maliyet = giren miktar × birim alış fiyatı ÷ net miktar",
      after: [
        "Fire oranı ve verim birbirinin tamamlayıcısıdır: biri %30 ise diğeri %70'tir. \"Nete eklenecek fire payı\" ise farklı bir şeydir; net miktardan geriye doğru brüt ihtiyaca giderken kullanılır ve paydası net miktar olduğu için her zaman fire oranından büyüktür. Bu ayrım en sık yapılan hesap hatasının kaynağıdır."
      ]
    },
    {
      h: "Fire payı ile verim arasındaki ilişki",
      p: [
        "Aşağıdaki tablo, farklı fire oranlarında verimi ve net miktardan brüte giderken eklenmesi gereken payı gösterir. Fire büyüdükçe iki oran arasındaki fark hızla açılır."
      ],
      table: {
        head: ["Fire oranı", "Verim", "Nete eklenecek pay", "100 kg net için gereken brüt"],
        rows: [
          ["%5", "%95", "%5,26", "105,3 kg"],
          ["%10", "%90", "%11,11", "111,1 kg"],
          ["%20", "%80", "%25,00", "125,0 kg"],
          ["%30", "%70", "%42,86", "142,9 kg"],
          ["%40", "%60", "%66,67", "166,7 kg"],
          ["%50", "%50", "%100,00", "200,0 kg"]
        ],
        caption: "Nete eklenecek pay = fire oranı ÷ verim. %50 firede net miktarın tamamı kadar, yani iki katı brüt malzeme gerekir."
      }
    },
    {
      h: "Mutfakta et ve sebze firesi nasıl bulunur? Çözümlü örnek",
      p: [
        "Restoran mutfaklarında fire, en güvenilir şekilde \"verim testi\" ile ölçülür: belirli bir miktar malzeme tartılır, standart yöntemle hazırlanır ve kalan kullanılabilir kısım yeniden tartılır. Aynı test birkaç kez tekrarlanarak ortalama alınır."
      ],
      ol: [
        "10 kg kemikli dana but tartılır; kilosu 600 TL, toplam maliyet 6.000 TL'dir.",
        "Kemik, sinir ve fazla yağ ayıklanır; kalan temiz et 7 kg gelir.",
        "Fire: 10 − 7 = 3 kg. Fire oranı: 3 ÷ 10 × 100 = %30. Verim: %70.",
        "Net kilo maliyeti: 6.000 ÷ 7 = 857,14 TL. Fire maliyeti: 3 × 600 = 1.800 TL.",
        "Pişirme kaybı ayrıca ölçülür: 7 kg çiğ et pişince 5,25 kg kalıyorsa pişirme firesi %25'tir ve pişmiş etin kilosu 6.000 ÷ 5,25 = 1.142,86 TL'ye çıkar.",
        "Hafta sonu için 14 kg temiz et gerekiyorsa sipariş 14 ÷ 0,70 = 20 kg olmalıdır."
      ],
      after: [
        "Sebzelerde de mantık aynıdır. 5 kg soğanın kabuğu ve uçları ayıklanınca 4,5 kg kalıyorsa fire %10'dur; 2 kg ıspanaktan kök ve sararmış yapraklar atılınca 1,4 kg kalıyorsa fire %30'dur. Porsiyon başına malzeme planlarken bu oranları kullanmak için [[bilgi:kisi-basi-kac-gram-et-mangal|kişi başı kaç gram et]] ve [[bilgi:tarif-nasil-olceklendirilir|tarif ölçeklendirme]] yazıları da yardımcı olur."
      ]
    },
    {
      h: "Fire maliyeti ürün fiyatına nasıl yansıtılır?",
      p: [
        "Fiyatlandırmada hata genellikle şuradan doğar: reçete maliyeti, malzemenin <em>alış</em> fiyatıyla hesaplanır. Oysa porsiyona giren et, fire sonrası kalan net etten gelir ve kilosu alış fiyatından pahalıdır. Doğru yöntem, reçetede her malzemenin <strong>net birim maliyetini</strong> kullanmaktır."
      ],
      table: {
        head: ["Kalem", "Fireyi yok sayan hesap", "Fireyi hesaba katan hesap"],
        rows: [
          ["Porsiyondaki et", "200 g", "200 g"],
          ["Kullanılan kilo fiyatı", "600 TL (alış)", "857,14 TL (net)"],
          ["Porsiyon et maliyeti", "120,00 TL", "171,43 TL"],
          ["Fark", "—", "51,43 TL eksik maliyet"]
        ],
        caption: "200 g'lık bir porsiyonda fireyi unutmak, maliyeti yaklaşık %30 düşük gösterir; kâr marjı da aynı ölçüde olduğundan yüksek görünür."
      },
      after: [
        "Doğru maliyeti bulduktan sonra satış fiyatını hedef kâr marjına göre belirleyebilirsiniz. Bunun için [[bilgi:kar-marji-nasil-hesaplanir|kâr marjı nasıl hesaplanır]] yazısı ile [[arac:kar-marji-hesapla|Kâr Marjı Hesaplama]] ve [[arac:birim-maliyet-hesapla|Birim Maliyet Hesaplama]] araçları kullanılabilir. Satılamayan, bozulan ya da iade edilen ürünler de fire maliyetine eklenmeli, aylık bazda takip edilmelidir."
      ]
    },
    {
      h: "Üretimde fire: tekstil, metal ve ambalaj örnekleri",
      p: [
        "Üretim işletmelerinde fire yalnızca hammadde kaybı değil, enerji, işçilik ve makine süresinin de boşa harcanması anlamına gelir. Bu nedenle birçok işletme fireyi üç ayrı kalemde izler: <strong>hammadde firesi</strong> (kesim, talaş, artık), <strong>proses firesi</strong> (ayar sırasında bozulan ürünler, kalite kontrolde ayrılanlar) ve <strong>depolama ve taşıma firesi</strong> (kırılma, nem, son kullanma tarihi)."
      ],
      ul: [
        "<strong>Tekstil:</strong> 1.000 metre kumaştan kesim planı sonrası 880 metre ürüne dönüşüyorsa kesim firesi %12'dir. Pastal planının iyileştirilmesi bu oranı doğrudan düşürür.",
        "<strong>Metal işleme:</strong> 500 kg levhadan 430 kg parça çıkıyorsa fire %14'tür; talaş ve artık parçaların hurda olarak satışı fire maliyetini kısmen geri kazandırır.",
        "<strong>Ambalaj ve baskı:</strong> Makine ayarı sırasında bozulan ilk tabakalar proses firesidir; iş başına sabit bir ayar firesi ve değişken bir üretim firesi olarak ayrı hesaplanabilir.",
        "<strong>Gıda üretimi:</strong> Pişirme, kurutma ya da soğutma sırasındaki nem kaybı ağırlık firesi oluşturur."
      ],
      after: [
        "Firenin yanı sıra genel üretim verimliliğini izlemek için [[arac:verimlilik-orani-hesapla|Verimlilik Oranı Hesaplama aracı]] gerçekleşen çıktıyı standart çıktıyla karşılaştırır."
      ]
    },
    {
      h: "Normal fire oranı yüzde kaç olmalı?",
      p: [
        "Bütün sektörler için geçerli tek bir \"normal fire oranı\" yoktur. Kemikli etin ayıklanmasında %25–35 olağan sayılabilecekken, hazır paketli bir üründe birkaç puanlık fire bile dikkat gerektirir. Oran; ürünün türüne, kullanılan yönteme, makine durumuna, personelin deneyimine ve malzemenin kalitesine göre değişir.",
        "İşletmenizin normal fire oranını bulmanın en sağlıklı yolu, kendi süreçlerinizde düzenli ölçüm yapıp ortalamayı ve sapmayı takip etmektir. Üretim işletmelerinde sanayi odalarının düzenlediği kapasite raporlarında ürün bazında fire oranlarına yer verilir; bu raporlar hem planlamada hem de olası vergi incelemelerinde referans olarak kullanılır. Ölçülen oran belirgin biçimde yükselirse bu bir süreç sorununun işaretidir."
      ]
    },
    {
      h: "Vergi açısından fire nasıl değerlendirilir?",
      p: [
        "Üretim ya da hazırlık sürecinin doğal sonucu olan ve makul sınırlar içindeki fire, genel olarak ürün maliyetinin bir parçası sayılır. Sorun, fire oranının olağan düzeyin çok üzerinde görünmesi ya da belgelenmemesidir; bu durumda vergi incelemesinde kayıt dışı satış şüphesi doğabilir. Bu yüzden fire oranlarını belgelemek, kapasite raporuyla uyumlu tutmak ve olağanüstü kayıpları (yangın, su baskını, bozulma gibi) tutanakla kayda geçirmek önemlidir.",
        "Olağan fireden farklı olarak zayi olan ya da imha edilen mallar için KDV mevzuatında indirilen verginin düzeltilmesi gibi özel kurallar bulunur. Hangi kaybın hangi kapsama girdiği işletmeye ve olayın niteliğine göre değiştiği için bu konuda mali müşavirinizin görüşünü almanız gerekir."
      ]
    },
    {
      h: "Fireyi azaltmanın yolları",
      ul: [
        "<strong>Standart reçete ve kesim planı:</strong> Herkes aynı yöntemi uyguladığında fire ölçülebilir ve azaltılabilir hâle gelir.",
        "<strong>Düzenli verim testi:</strong> Ayda en az bir kez ana malzemelerde test yapın; tedarikçi değişikliğinin etkisini hemen görürsünüz.",
        "<strong>Artıkları değerlendirmek:</strong> Kemikten et suyu, sebze artığından çorba, kumaş parçasından aksesuar yapmak fireyi ürüne dönüştürür.",
        "<strong>İlk giren ilk çıkar:</strong> Depoda eski stoku önce kullanmak son kullanma tarihi firesini azaltır; stok hızınızı [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı]] ile izleyebilirsiniz.",
        "<strong>Makine bakımı ve ayar:</strong> Ayar firesi, bakımsız makinelerde belirgin biçimde artar.",
        "<strong>Doğru sipariş miktarı:</strong> Gereken brüt miktarı verimle hesaplamak hem eksik hem fazla alımı önler."
      ],
      after: [
        "Fire oranını, verimi, fire maliyetini ve hedef için gereken brüt miktarı tek ekranda görmek için [[arac:fire-orani-hesapla|Fire Oranı Hesaplama aracını]] kullanabilirsiniz; araç giren miktarla birlikte fire ya da net miktarı kabul eder."
      ]
    }
  ],
  faq: [
    ["Fire oranı nedir?", "Fire oranı, bir üretim ya da hazırlık sürecine giren malzemenin yüzde kaçının kullanılamaz hâle geldiğini gösteren orandır. Kemik ve sinir, sebze kabuğu, kumaş artığı, talaş ve bozulan ürünler fire sayılır; oran satın alma, maliyet ve fiyat kararlarının temelini oluşturur."],
    ["Fire oranı nasıl hesaplanır?", "Fire miktarı giren brüt miktara bölünüp 100 ile çarpılır. 10 kg etten 3 kg kemik ve sinir çıkıyorsa fire oranı 3 ÷ 10 × 100 = yüzde 30 olur. Net miktar biliniyorsa fire, giren miktardan net miktar çıkarılarak bulunur."],
    ["Fire payı ile verim arasındaki ilişki nedir?", "Verim, yüz eksi fire oranıdır; yüzde 30 firede verim yüzde 70'tir. Net miktardan brüte giderken kullanılan fire payı ise fire miktarının net miktara oranıdır ve yüzde 30 fire için yüzde 42,86 olur; bu pay her zaman fire oranından büyüktür."],
    ["Mutfakta et ve sebze firesi nasıl bulunur?", "Belirli miktarda malzeme tartılır, standart yöntemle ayıklanır ve kalan kullanılabilir kısım yeniden tartılır. Aradaki fark firedir. Testi birkaç kez tekrarlayıp ortalamayı almak ve pişirme kaybını ayrıca ölçmek daha güvenilir sonuç verir."],
    ["Fire maliyeti ürün fiyatına nasıl yansıtılır?", "Reçete maliyeti alış fiyatıyla değil, net birim maliyetle hesaplanır. Kilosu 600 TL'ye alınan ve yüzde 30 fire veren etin net kilosu 857,14 TL'dir; 200 gramlık porsiyonun et maliyeti 120 TL değil 171,43 TL olarak alınmalıdır."],
    ["Normal fire oranı yüzde kaç olmalı?", "Tüm sektörler için tek bir normal oran yoktur; oran ürün, yöntem, makine ve personel deneyimine göre değişir. İşletmeler kendi düzenli ölçümleriyle ortalama bulur; üretim işletmelerinde kapasite raporlarındaki fire oranları da referans alınır."],
    ["Vergi açısından fire nasıl değerlendirilir?", "Sürecin doğal sonucu olan ve makul sınırdaki fire genellikle maliyetin parçası sayılır. Olağan düzeyin üzerindeki ya da belgelenmeyen fire vergi incelemesinde sorun yaratabilir; zayi ve imha edilen mallar için ayrıca özel kurallar vardır, mali müşavirinize danışın."],
    ["Fireyi azaltmanın yolları nelerdir?", "Standart reçete ve kesim planı uygulamak, düzenli verim testi yapmak, artıkları yeni ürünlerde değerlendirmek, depoda ilk giren ilk çıkar kuralını uygulamak, makine bakımını aksatmamak ve sipariş miktarını verime göre hesaplamak fireyi belirgin biçimde azaltır."],
    ["Hedef net miktar için ne kadar malzeme almalıyım?", "Hedef net miktarı verime bölün. Yüzde 70 verimle 14 kg temiz et için 14 ÷ 0,70 = 20 kg brüt et gerekir. Hedefi fire oranıyla çarpıp eklemek, yani 14 × 1,30 = 18,2 kg almak yanlıştır ve 1,8 kg eksik bırakır."]
  ],
  tools: ["fire-orani-hesapla", "birim-maliyet-hesapla", "verimlilik-orani-hesapla", "kar-marji-hesapla"],
  related: ["kar-marji-nasil-hesaplanir", "stok-devir-hizi-nasil-hesaplanir", "basabas-noktasi-nedir", "tarif-nasil-olceklendirilir"]
};
