export default {
  slug: "cati-icin-kac-kiremit-gerekir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Çatı İçin Kaç Kiremit Gerekir? Çatı Alanı, Eğim ve Kiremit Hesabı",
  pageTitle: "Çatı İçin Kaç Kiremit Gerekir? Çatı Alanı ve Eğim Hesabı",
  description: "Kiremit adedi = eğimli çatı alanı × m² başına kiremit × fire. Marsilya kiremitte m²'ye yaklaşık 13–15 adet gider. Eğim yüzdesi, mahya ve örnek hesap.",
  keywords: ["çatı kiremit hesaplama", "1 m2 çatıya kaç kiremit", "çatı alanı hesaplama", "çatı eğimi kaç olmalı", "marsilya kiremit m2", "mahya kiremidi hesabı", "eğim yüzdesi derece", "kırma çatı alanı"],
  lead: "Çatı için gereken kiremit sayısı, <strong>eğimli çatı alanının m² başına kiremit adedi ile çarpılıp %5–10 fire eklenmesiyle</strong> bulunur. Marsilya tipi kiremitte m²'ye yaklaşık 13–15 adet gider; kesin değer üreticinin teknik föyünde yazar. Örneğin saçaklarla birlikte 11 × 9 metrelik, %40 eğimli bir çatının gerçek alanı 106,6 m² eder ve m²'de 15 adetle %5 fire eklendiğinde yaklaşık 1.680 kiremit gerekir. Aşağıda eğimin alana etkisini, mahya hesabını ve sık yapılan hataları bulacaksınız.",
  kisaCevap: [
    "Eğimli çatı alanı = plan (yatay izdüşüm) alanı × √(1 + eğim²); eğim ondalık yazılır, %40 için 0,40.",
    "Kiremit adedi = eğimli alan × m² başına adet × (1 + fire), yukarı yuvarlanır.",
    "Marsilya kiremit için m²'ye yaklaşık 13–15 adet yaygın bir değerdir; ürün föyündeki değeri kullanın.",
    "Mahya kiremidi metreye göre hesaplanır; metrede yaklaşık 2,5–3 adet gider, kırma çatıda köşe mahyaları da eklenir.",
    "Tüm yüzeyleri aynı eğimdeki beşik ve kırma çatının alanı, plan alanı aynıysa eşittir; fark mahya uzunluğundadır.",
    "Eğim yüzdesi = yükseklik ÷ yatay mesafe × 100; %100 eğim 45 dereceye eşittir."
  ],
  figure: {
    alt: "Beşik çatı kesiti: yarım genişlik 4,5 metre, mahya yüksekliği 1,8 metre, eğim yüzde 40 yani 21,8 derece, mertek uzunluğu 4,85 metre. Yanında hesap: 99 metrekare plan alanı 1,077 katsayısıyla 106,6 metrekare, 1.680 kiremit.",
    caption: "Eğim, kiremitlerin oturduğu yüzeyi plan alanından büyütür. %40 eğimde her 1 m² plan alanı yaklaşık 1,077 m² çatı yüzeyine karşılık gelir; hesap bu katsayıyla yapılır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Eğim çatı alanını nasıl büyütür?</text>
  <polygon points="40,280 240,200 440,280" class="ps"/>
  <polyline points="40,280 240,200 440,280" class="sp sw" fill="none"/>
  <rect x="80" y="280" width="320" height="70" class="sf sb"/>
  <text x="240" y="322" class="sm mid mu">bina: 10 × 8 m + 0,5 m saçak</text>
  <line x1="240" y1="200" x2="240" y2="280" class="sa dash" fill="none"/>
  <line x1="240" y1="280" x2="440" y2="280" class="sa dash" fill="none"/>
  <text x="250" y="248" class="sm b">1,8 m</text>
  <text x="340" y="298" class="sm b mid">4,5 m (yatay)</text>
  <text x="330" y="226" class="sm b p">4,85 m</text>
  <text x="408" y="270" class="sm b end">21,8°</text>
  <text x="150" y="190" class="b mid">%40 eğim</text>
  <text x="150" y="210" class="sm mid mu">1,8 ÷ 4,5 = 0,40</text>
  <rect x="470" y="60" width="230" height="290" rx="10" class="sf sb"/>
  <text x="486" y="90" class="b">Hesap</text>
  <text x="486" y="120" class="sm">Plan: 11 × 9 = 99 m²</text>
  <text x="486" y="146" class="sm">Katsayı: √(1 + 0,40²) = 1,077</text>
  <text x="486" y="172" class="sm">Çatı alanı: 106,63 m²</text>
  <text x="486" y="198" class="sm">15 adet/m² × 1,05 fire</text>
  <rect x="486" y="212" width="198" height="40" rx="6" class="p"/>
  <text x="585" y="238" class="b mid sf">1.680 kiremit</text>
  <text x="486" y="280" class="sm">Mahya (beşik): 11 m × 3</text>
  <text x="486" y="304" class="sm">× 1,05 = 35 mahya kiremidi</text>
  <text x="486" y="334" class="sm mu">Adetler örnek ürüne göredir.</text>
  <text x="240" y="378" class="sm mid t2">Kesit tek yüzü gösterir; çatının iki yüzü simetriktir.</text>
</svg>`
  },
  sections: [
    {
      h: "Kiremit hesabının mantığı",
      p: [
        "Kiremit hesabında asıl bilinmesi gereken, kiremitlerin oturacağı <strong>eğimli yüzeyin alanıdır</strong>. Binanın taban alanı ya da plan üzerindeki izdüşüm alanı çatı yüzeyinden küçüktür; çünkü çatı yüzeyi eğimli olduğu için daha uzundur. Eğim arttıkça aradaki fark büyür.",
        "İkinci bilgi, seçtiğiniz kiremidin 1 m²'ye kaç adet gittiğidir. Bu değer kiremidin boyutuna ve bindirme (üst üste gelme) payına bağlıdır, bu yüzden her ürün için farklıdır. Üreticiler bunu teknik föyde \"adet/m²\" olarak verir. Üçüncü bilgi ise kesim, kırılma ve nakliye kayıpları için eklenen fire payıdır."
      ],
      formula: "Eğimli alan = plan alanı × √(1 + (eğim % ÷ 100)²)\nKiremit adedi = eğimli alan × adet/m² × (1 + fire % ÷ 100)\nMahya kiremidi = mahya uzunluğu (m) × adet/m × (1 + fire % ÷ 100)"
    },
    {
      h: "1 m² çatıya kaç kiremit gider?",
      p: [
        "Türkiye'de en yaygın kullanılan kiremit tiplerinden Marsilya kiremidi için m²'ye yaklaşık 13–15 adet değeri sık görülür. Daha büyük formatlı kiremitlerde bu sayı 10–12'ye düşebilir, küçük formatlı ya da düz (kunduz) tiplerde ise artar. Ağırlık da tipe göre değişir; çatı konstrüksiyonu hesaplanırken m² başına ağırlık mutlaka dikkate alınmalıdır."
      ],
      table: {
        head: ["Kiremit tipi", "Yaklaşık adet/m²", "Not"],
        rows: [
          ["Marsilya (geleneksel)", "13–15", "En yaygın tip; bindirme ve lata aralığı üreticiye göre değişir"],
          ["Büyük formatlı geçmeli", "10–12", "Daha az adet, daha ağır tek parça"],
          ["Oluklu (alaturka) kiremit", "25–35", "Alt ve üst sıra ayrı sayılır; bölgesel üretim farkları büyüktür"],
          ["Düz (kunduz) kiremit", "30 ve üstü", "Çift kat döşeme yapıldığı için adet yükselir"]
        ],
        caption: "Değerler genel fikir vermek içindir; sipariş için kullanacağınız ürünün teknik föyündeki adet/m² değerini esas alın."
      },
      after: [
        "Lata aralığı da adedi etkiler. Kiremitler lataya asılır ve lata aralığı kiremidin bindirme payını belirler. Usta lata aralığını üreticinin önerdiği aralıkta biraz değiştirirse m² başına adet de değişir; bu yüzden fire payını çok dar tutmamak gerekir."
      ]
    },
    {
      h: "Çatı eğimi yüzde mi derece mi? Eğim tablosu",
      p: [
        "Eğim iki şekilde ifade edilir. <strong>Yüzde eğim</strong>, yükseklik farkının yatay mesafeye oranının 100 ile çarpımıdır: 4,5 metrede 1,8 metre yükselen çatı %40 eğimlidir. <strong>Derece</strong> ise aynı eğimin açı olarak karşılığıdır ve arktanjant ile bulunur: arctan(0,40) = 21,8°. Mimari projelerde ve kiremit föylerinde iki gösterim de kullanılır; yüzde ile dereceyi karıştırmak ciddi hatalara yol açar."
      ],
      formula: "Eğim % = yükseklik ÷ yatay mesafe × 100\nAçı (°) = arctan(eğim % ÷ 100)\nEğim % = tan(açı) × 100",
      table: {
        head: ["Eğim (%)", "Açı (derece)", "Alan katsayısı"],
        rows: [
          ["20", "11,3°", "1,020"],
          ["30", "16,7°", "1,044"],
          ["35", "19,3°", "1,059"],
          ["40", "21,8°", "1,077"],
          ["45", "24,2°", "1,097"],
          ["50", "26,6°", "1,118"],
          ["60", "31,0°", "1,166"],
          ["100", "45,0°", "1,414"]
        ],
        caption: "Alan katsayısı = √(1 + eğim²). Plan alanını bu sayıyla çarparak eğimli çatı alanını bulursunuz."
      },
      after: [
        "Kiremit çatılarda kullanılabilecek en düşük eğim kiremit tipine, rüzgâr ve kar yüküne göre değişir; üreticiler genellikle bir alt sınır ve bu sınırın altında ek su yalıtımı şartı belirtir. Ülkemizdeki konut çatılarında %30–%45 arası eğimler sık görülür. Projenizdeki eğimi ve ürün föyündeki alt sınırı mutlaka karşılaştırın. Yüzde-derece dönüşümü için [[arac:egim-yuzdesi-hesapla|Eğim Yüzdesi Hesaplama aracını]] kullanabilirsiniz."
      ]
    },
    {
      h: "Çatı alanı nasıl hesaplanır? Beşik ve kırma çatı örnekleri",
      p: [
        "<strong>Örnek 1, beşik çatı:</strong> Bina 10 × 8 metre, her yönde 0,5 metre saçak var. Plan ölçüsü saçaklarla birlikte 11 × 9 = 99 m²'dir. Eğim %40 olduğunda katsayı √(1 + 0,16) = 1,077'dir ve eğimli çatı alanı 99 × 1,077 = 106,63 m² olur. Her bir mertek, yarım genişlik olan 4,5 metrenin 1,077 katı, yani yaklaşık 4,85 metre uzunluğundadır; mahya yüksekliği 4,5 × 0,40 = 1,8 metredir.",
        "<strong>Kiremit adedi:</strong> m²'ye 15 adet giden bir Marsilya kiremidi ve %5 fireyle 106,63 × 15 × 1,05 = 1.679,4, yani 1.680 adet gerekir. Firesiz net ihtiyaç 1.600 adettir. Beşik çatıda mahya, uzun kenar boyunca 11 metredir; metrede 3 adet ve %5 fireyle 11 × 3 × 1,05 = 34,65, yani 35 mahya kiremidi gerekir.",
        "<strong>Örnek 2, kırma çatı:</strong> Aynı 11 × 9 metrelik plan, dört yüzü de %40 eğimli kırma çatıyla örtülsün. Bütün yüzler aynı eğimde olduğu sürece toplam çatı alanı yine 99 × 1,077 = 106,63 m²'dir; kırma ya da beşik olması alanı değiştirmez. Değişen, mahya uzunluğudur: üst mahya 11 − 9 = 2 metreye kısalır, ama dört köşeden inen köşe mahyaları eklenir."
      ],
      formula: "Köşe mahyası plan uzunluğu = yarım genişlik × √2 = 4,5 × 1,414 = 6,36 m\nKöşe mahyası gerçek uzunluğu = √(6,36² + 1,8²) = 6,61 m\nToplam mahya = 2 + 4 × 6,61 = 28,46 m → 28,46 × 3 × 1,05 ≈ 90 mahya kiremidi",
      after: [
        "Bu örnek, kırma çatıda kiremit sayısı aynı kalsa da mahya kiremidi ihtiyacının beşik çatının yaklaşık 2,5 katına çıktığını gösterir. Köşe mahyalarında ayrıca kiremitlerin açılı kesilmesi gerektiğinden kırma çatıda fire payını %8–10'a çıkarmak yerinde olur. Çatı alanını, mertek boyunu ve mahya yüksekliğini [[arac:cati-alani-hesapla|Çatı Alanı Hesaplama aracıyla]] beşik, kırma ve tek eğimli çatılar için bulabilirsiniz."
      ]
    },
    {
      h: "Mahya ve özel parçalar nasıl hesaplanır?",
      p: [
        "Mahya kiremidi, iki çatı yüzünün birleştiği tepe çizgisini ve kırma çatıdaki köşe çizgilerini kapatır. Mahya kiremitleri metre başına adetle hesaplanır; birçok üründe bu değer 2,5–3 adet/metre civarındadır. Mahya kiremitleri harçla ya da kuru mahya sistemiyle (havalandırma bantlı) sabitlenir."
      ],
      ul: [
        "<strong>Mahya başlangıç ve bitiş parçaları:</strong> Mahyanın iki ucunu kapatan özel parçalar adet olarak ayrıca sayılır.",
        "<strong>Kenar (rüzgâr) kiremidi:</strong> Beşik çatının üçgen alınlıklarına (kalkan duvar) gelen kenarlar için kullanılır; kenar boyu uzunluğunca hesaplanır.",
        "<strong>Havalandırma kiremidi:</strong> Çatı arasının nefes almasını sağlar; üretici her belirli m² için bir adet önerir.",
        "<strong>Dere (oluk) bölgeleri:</strong> İki çatı yüzünün içe doğru birleştiği yerlerde metal dere sacı ve açılı kesim gerekir; buralarda fire artar.",
        "<strong>Baca ve çatı penceresi:</strong> Bu boşlukların alanı küçükse genellikle düşülmez; kesim firesi zaten bu alanı karşılar."
      ]
    },
    {
      h: "Fire payı ne kadar eklenmeli? Ağırlık ve taşıma",
      p: [
        "Sade beşik çatılarda %5, kırma çatılarda ve çok sayıda dere, baca ya da çatı penceresi bulunan çatılarda %8–10 fire payı uygun bir başlangıçtır. Kiremitler nakliye ve çatıya taşıma sırasında kırılabildiği için siparişi tam tutmak yerine biraz fazla almak, iş ortasında aynı partiden ürün bulamama riskini azaltır.",
        "Kiremit ağırlığı çatı konstrüksiyonu için önemlidir. Tek bir Marsilya kiremidinin ağırlığı ürüne göre yaklaşık 2,5–3,5 kg arasında değişebilir. Örnek olarak 2,8 kg kabul edilirse 1.680 kiremit yaklaşık 4,7 ton eder; bu da m² başına 40 kg'ın üzerinde bir yük demektir. Ahşap çatıyı yenilerken mevcut konstrüksiyonun bu yükü taşıyıp taşımadığını bir inşaat mühendisine kontrol ettirmeniz önerilir."
      ],
      note: "Çatıda çalışmak düşme riski taşır. Tadilat işlerinde emniyet kemeri, iskele ve korkuluk gibi önlemlerin alınması ve işin deneyimli ekiplerce yapılması gerekir."
    },
    {
      h: "Kiremit yerine shingle kullanılabilir mi?",
      p: [
        "Shingle (bitümlü şıngıl), kiremide göre çok daha hafif bir örtüdür ve düşük eğimli ya da karmaşık biçimli çatılarda sık tercih edilir. Kiremit lataya asılırken shingle, çatının tamamını kaplayan OSB ya da kontrplak gibi bir levha üzerine, altına su yalıtım örtüsü serilerek çivilenir. Bu nedenle shingle hesabında adet yerine paket metrekaresi ve kaplama levhası sayısı hesaplanır."
      ],
      table: {
        head: ["Özellik", "Kiremit", "Shingle"],
        rows: [
          ["Taşıyıcı alt yapı", "Lata ve kontrlata", "Tam yüzey OSB/kontrplak + yalıtım örtüsü"],
          ["Ağırlık", "Yüksek (m²'de onlarca kg)", "Düşük"],
          ["Uygun eğim", "Ürüne göre alt sınırı daha yüksek", "Daha düşük eğimlerde de kullanılabilir (üreticiye göre)"],
          ["Hesap birimi", "Adet/m²", "Paket m² + levha adedi"]
        ]
      },
      after: [
        "Shingle altına gelecek levha sayısını [[arac:osb-kontrplak-hesapla|OSB ve Kontrplak Hesaplama aracı]] ile bulabilirsiniz. Hangi örtünün uygun olduğu bölgenizdeki kar yüküne, rüzgâra ve imar koşullarına göre değişeceği için karar vermeden önce yerel bir uzmanın görüşünü almanız yararlı olur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Taban alanıyla hesap yapmak:</strong> Eğim katsayısı unutulursa %40 eğimli çatıda yaklaşık %8 eksik kiremit alınır.",
        "<strong>Saçakları unutmak:</strong> Saçak payı plan ölçüsüne eklenmezse kenarlarda kiremit eksik kalır.",
        "<strong>Yüzde ile dereceyi karıştırmak:</strong> \"40 derece\" yerine \"%40\" yazmak katsayıyı 1,305'ten 1,077'ye düşürür.",
        "<strong>Kırma çatıda köşe mahyalarını saymamak:</strong> Mahya kiremidi ihtiyacı birkaç kat eksik çıkar.",
        "<strong>Başka ürünün adet/m² değerini kullanmak:</strong> İki kiremit aynı adı taşısa da boyutları farklı olabilir."
      ]
    },
    {
      h: "Kiremit hesaplama aracı nasıl kullanılır?",
      ol: [
        "Çatı alanını biliyorsanız doğrudan girin; yalnızca plan ölçüsünü biliyorsanız plan alanını ve eğim yüzdesini girin.",
        "Ürün föyündeki m² başına kiremit adedini yazın.",
        "Fire payını çatı tipinize göre %5–10 arasında seçin.",
        "Mahya uzunluğunu ve metre başına mahya kiremidi adedini ekleyin; isterseniz tek kiremit ağırlığını girerek toplam yükü görün.",
        "Sonuçtaki kiremit ve mahya adedini satıcının palet adetlerine göre yuvarlayın."
      ],
      after: [
        "[[arac:kiremit-hesapla|Kiremit Hesaplama aracı]] tarayıcınızda çalışır ve girdiğiniz ölçüleri hiçbir yere göndermez. Çatının ısı yalıtımını da düşünüyorsanız [[bilgi:mantolama-nedir-kac-cm-olmali|mantolama ve yalıtım kalınlığı]] yazısına göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["1 m² çatıya kaç kiremit gider?", "Kiremit tipine göre değişir. Marsilya kiremitte m²'ye yaklaşık 13–15 adet, büyük formatlı kiremitlerde 10–12 adet yaygındır. Sipariş için kullanacağınız ürünün teknik föyündeki adet/m² değerini esas alın."],
    ["Çatı alanı nasıl hesaplanır?", "Saçaklar dahil plan alanını bulun ve √(1 + eğim²) katsayısıyla çarpın; eğim ondalık yazılır. Örneğin 99 m² plan alanı %40 eğimde 99 × 1,077 = 106,6 m² çatı alanı eder."],
    ["Çatı eğimi yüzde kaç olmalı?", "Kiremit tipine, kar ve rüzgâr yüküne göre değişir; ülkemizde konut çatılarında %30–45 arası eğimler sık görülür. Üreticinin önerdiği en düşük eğimi ve proje değerini mutlaka karşılaştırın."],
    ["Kırma ve beşik çatı alanı farklı mı hesaplanır?", "Bütün yüzler aynı eğimdeyse ve plan alanı aynıysa iki çatının toplam alanı eşittir; ikisinde de plan alanı eğim katsayısıyla çarpılır. Fark, kırma çatıda köşe mahyalarının eklenmesi ve fire payının artmasıdır."],
    ["Mahya kiremidi nasıl hesaplanır?", "Mahya uzunluğunu metre başına mahya kiremidi adediyle çarpıp fire ekleyin. Beşik çatıda mahya uzun kenar boyuncadır; kırma çatıda üst mahyaya dört köşe mahyasının gerçek uzunlukları da eklenir."],
    ["Kiremit yerine shingle kullanılabilir mi?", "Evet, shingle daha hafif bir çatı örtüsüdür ve daha düşük eğimlerde de kullanılabilir. Ancak tüm yüzeyin OSB ya da kontrplakla kaplanması ve altına su yalıtım örtüsü serilmesi gerekir."],
    ["Fire payı ne kadar eklenmeli?", "Sade beşik çatılarda yaklaşık %5, kırma çatılarda ve dere, baca, çatı penceresi gibi kesim gerektiren ayrıntılar çoksa %8–10 fire payı uygun bir başlangıçtır."],
    ["Çatı eğimi derece mi yüzde mi ifade edilir?", "İkisi de kullanılır. Yüzde eğim yüksekliğin yatay mesafeye oranıdır, derece ise bu oranın arktanjantıdır. %40 eğim 21,8 dereceye, %100 eğim ise 45 dereceye eşittir."],
    ["Mevcut çatı yeni kiremidin ağırlığını taşır mı?", "Bunu yalnızca yerinde inceleme yapan bir inşaat mühendisi söyleyebilir. Kiremit çatılar m² başına onlarca kilogram yük getirir; çürümüş ya da zayıf ahşap konstrüksiyonda yenileme öncesi kontrol şarttır."]
  ],
  tools: ["kiremit-hesapla", "cati-alani-hesapla", "egim-yuzdesi-hesapla", "osb-kontrplak-hesapla"],
  related: ["mantolama-nedir-kac-cm-olmali", "trigonometri-sin-cos-tan-tablosu", "pisagor-teoremi-nedir"]
};
