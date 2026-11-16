export default {
  slug: "kalip-alani-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Kalıp Alanı Nasıl Hesaplanır? Kolon, Kiriş ve Döşeme Kalıbı m²",
  pageTitle: "Kalıp Alanı Nasıl Hesaplanır? Kolon, Kiriş, Döşeme m²",
  description: "Kalıp alanı nasıl hesaplanır? Kolon, kiriş, döşeme, perde ve temel kalıbı metrekare formülleri, kiriş altlarının sayılması, fire payı, plywood ve beton hacmi örnekli.",
  keywords: ["kalıp alanı hesaplama", "kalıp metrekare hesabı", "kolon kalıbı hesaplama", "döşeme kalıbı", "kiriş kalıbı", "kalıpçı metrekare fiyatı", "beton hacmi hesaplama", "temel kalıbı ölçüsü"],
  lead: "Kalıp alanı, <strong>betonun kalıba değen yüzeylerinin metrekare olarak toplamıdır</strong>. Kolonda dört yan yüz sayılır: 30 × 50 cm kesitli, 2,70 m yüksekliğindeki kolonun kalıbı 2 × (0,30 + 0,50) × 2,70 = 4,32 m² eder. Kirişte alt yüz ile iki yan yüz, döşemede alt yüz, perde duvarda iki yüz, temelde yan yüzler hesaba girer. Kalıpçılık işleri çoğunlukla bu metrekare üzerinden fiyatlandığı için ölçünün doğru alınması hem malzeme hem hakediş hesabı için önemlidir. Bu yazıda her eleman için formülü, çift sayma tuzaklarını ve örnek bir kat hesabını bulacaksınız.",
  kisaCevap: [
    "Kolon kalıbı = 2 × (en + boy) × kolon yüksekliği; 30 × 50 cm, 2,70 m kolon için 4,32 m².",
    "Kiriş kalıbı = (alt genişlik + 2 × yan yükseklik) × uzunluk; döşemeyle birlikte dökülüyorsa yan yükseklikten döşeme kalınlığı düşülür.",
    "Döşeme kalıbı = döşemenin alt yüzey alanı; kiriş altları ayrıca kirişte sayılıyorsa döşemeden çıkarılır.",
    "Perde duvar kalıbı = 2 × uzunluk × yükseklik; temel kalıbı yalnızca yan yüzlerden hesaplanır.",
    "Fire payı için kalıp alanına genellikle %5–10 eklenir; 125 × 250 cm plywood levha 3,125 m²'dir.",
    "Beton hacmi kalıp alanından değil, elemanın hacminden bulunur: en × boy × yükseklik."
  ],
  figure: {
    alt: "Üç elemanın kalıp yüzeyleri: kolonda dört yan yüz 4,32 m², kirişte alt yüz ve döşeme altında kalan iki yan yüz 5,05 m², döşemede alt yüz. Yanda örnek kat için toplam 233,6 m² ve fireli 250 m².",
    caption: "Kolon 30 × 50 cm ve 2,70 m; kiriş 25 × 50 cm, 5 m ve 12 cm döşemeyle birlikte dökülüyor. Renkli yüzeyler kalıba değen yüzlerdir. Örnek katın kalıp alanı 233,6 m², %7 fireyle yaklaşık 250 m² olur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kalıba hangi yüzeyler girer?</text>
  <rect x="20" y="50" width="200" height="300" rx="12" class="sf sb"/>
  <text x="120" y="76" class="b mid">Kolon</text>
  <polygon points="80,100 130,100 150,86 100,86" class="ps"/>
  <rect x="80" y="100" width="50" height="190" class="p"/>
  <polygon points="130,100 150,86 150,276 130,290" class="ps"/>
  <text x="105" y="200" class="sm mid sf b">50</text>
  <text x="160" y="190" class="sm">30</text>
  <text x="120" y="316" class="sm mid">2 × (0,30 + 0,50) × 2,70</text>
  <text x="120" y="338" class="b mid p">= 4,32 m²</text>
  <rect x="240" y="50" width="220" height="300" rx="12" class="sf sb"/>
  <text x="350" y="76" class="b mid">Kiriş + döşeme</text>
  <rect x="256" y="110" width="188" height="24" class="oks"/>
  <text x="350" y="127" class="sm mid b">döşeme 12 cm (alt yüz)</text>
  <rect x="322" y="134" width="56" height="76" class="sf sb"/>
  <rect x="314" y="134" width="8" height="76" class="p"/>
  <rect x="378" y="134" width="8" height="76" class="p"/>
  <rect x="322" y="210" width="56" height="8" class="p"/>
  <text x="300" y="176" class="sm end">38</text>
  <text x="350" y="236" class="sm mid">25</text>
  <text x="350" y="270" class="sm mid">(0,25 + 2 × 0,38) × 5</text>
  <text x="350" y="292" class="b mid p">= 5,05 m²</text>
  <text x="350" y="318" class="sm mid t2">50 cm − 12 cm döşeme = 38 cm yan</text>
  <text x="350" y="338" class="sm mid t2">koyu: kirişte sayılan yüzler</text>
  <rect x="480" y="50" width="220" height="300" rx="12" class="sf sb"/>
  <text x="590" y="76" class="b mid">Örnek kat</text>
  <text x="496" y="106" class="sm">10 kolon</text><text x="684" y="106" class="sm b end">43,2 m²</text>
  <text x="496" y="130" class="sm">8 kiriş × 5 m</text><text x="684" y="130" class="sm b end">40,4 m²</text>
  <text x="496" y="154" class="sm">Döşeme 120 − 10</text><text x="684" y="154" class="sm b end">110,0 m²</text>
  <text x="496" y="178" class="sm">Temel yanları</text><text x="684" y="178" class="sm b end">40,0 m²</text>
  <line x1="496" y1="190" x2="684" y2="190" class="sb" fill="none"/>
  <text x="496" y="214" class="b">Net</text><text x="684" y="214" class="b end">233,6 m²</text>
  <rect x="496" y="228" width="188" height="34" rx="6" class="p"/>
  <text x="590" y="250" class="b mid sf">%7 fire ≈ 250 m²</text>
  <text x="590" y="290" class="sm mid">250 ÷ 3,125 ≈ 80 levha</text>
  <text x="590" y="312" class="sm mid t2">(kesim planı hariç)</text>
  <text x="360" y="380" class="sm mid t2">Ölçüler metre cinsindendir; değerler örnek amaçlıdır.</text>
</svg>`
  },
  sections: [
    {
      h: "Kalıp alanı nedir, neden metrekare ile ölçülür?",
      p: [
        "Betonarme yapılarda beton, sertleşene kadar şeklini koruyacak geçici bir kabın içine dökülür; bu kaba kalıp denir. Kalıp alanı, betonla temas eden kalıp yüzeylerinin toplam alanıdır ve metrekare (m²) ile ölçülür. Plywood, kalıp tahtası ya da çelik panel gibi malzeme ihtiyacı, işçilik süresi ve kalıpçılık hakedişi büyük ölçüde bu alana bağlıdır.",
        "Kalıp alanı ile beton hacmi farklı şeylerdir. Beton hacmi (m³) elemanın içindeki betonu, kalıp alanı (m²) ise dış yüzeyini ölçer. İnce ve uzun elemanlar (perde, kiriş) az beton ama çok kalıp gerektirir; kalın temeller ise çok beton ama görece az kalıp ister. Bu yüzden iki hesap ayrı yapılır ve birbirinin yerine kullanılmaz."
      ]
    },
    {
      h: "Kolon kalıbı metrekaresi nasıl bulunur?",
      p: [
        "Dikdörtgen kesitli bir kolonun dört yan yüzü kalıplanır; alt ucu temel ya da döşemeye, üst ucu kiriş ya da döşemeye oturur ve kalıba girmez. Kalıp alanı kesitin çevresi ile kolon yüksekliğinin çarpımıdır. Kolon yüksekliği olarak genellikle döşeme üstünden kiriş ya da döşeme altına kadar olan net yükseklik alınır."
      ],
      formula: "Kolon kalıbı (m²) = 2 × (en + boy) × yükseklik\nÖrnek: 2 × (0,30 + 0,50) × 2,70 = 1,60 × 2,70 = 4,32 m²\n10 kolon: 4,32 × 10 = 43,2 m²\nDairesel kolon: π × çap × yükseklik",
      after: [
        "Ölçüleri her zaman metreye çevirerek çarpın; 30 cm yerine 0,30 yazmak sonuçta 10.000 katlık hatayı önler. Dairesel kolonlarda kalıp genellikle hazır boru ya da özel kalıpla yapılır ve alan çevreyle (π × çap) hesaplanır: 40 cm çaplı, 2,70 m kolon için 3,14 × 0,40 × 2,70 ≈ 3,39 m²."
      ]
    },
    {
      h: "Kiriş kalıbı ve döşemede kiriş altları sayılır mı?",
      p: [
        "Kirişin kalıbı alt yüzü ile iki yan yüzünden oluşur. Kiriş döşemeyle birlikte (monolitik) dökülüyorsa yan yüzlerin üst kısmı döşemenin içinde kalır; bu durumda yan yükseklikten döşeme kalınlığı çıkarılır. 25 cm genişliğinde, 50 cm yüksekliğinde bir kiriş 12 cm'lik döşemeyle dökülüyorsa yan yüz yüksekliği 50 − 12 = 38 cm olur."
      ],
      formula: "Kiriş kalıbı (m²) = (alt genişlik + 2 × yan yükseklik) × uzunluk\nDöşemeyle dökülen kiriş: yan yükseklik = kiriş yüksekliği − döşeme kalınlığı\nÖrnek: (0,25 + 2 × 0,38) × 5,00 = 1,01 × 5 = 5,05 m²\nDöşemeden bağımsız kiriş: (0,25 + 2 × 0,50) × 5,00 = 6,25 m²",
      after: [
        "Döşeme kalıbında kiriş altlarının sayılıp sayılmayacağı en çok tartışılan konudur. Kural basittir: <strong>bir yüzey yalnızca bir kez sayılmalıdır</strong>. Kiriş alt yüzünü kiriş kalıbına dahil ettiyseniz, döşeme alanından kirişlerin kapladığı alanı (kiriş genişliği × kiriş uzunluğu) çıkarın. Alternatif olarak döşemeyi brüt alan olarak hesaplayıp kirişte yalnızca iki yan yüzü sayabilirsiniz. İki yöntem de aynı toplamı verir; hangisinin kullanılacağı keşif ya da hakediş sözleşmesinde yazılı olmalıdır.",
        "Döşeme kenarlarındaki alın kalıpları (döşeme kalınlığı × kenar uzunluğu) ve konsol uçları da ayrıca eklenmelidir; küçük görünseler de geniş döşemelerde birkaç metrekare tutarlar."
      ]
    },
    {
      h: "Döşeme, perde ve temel kalıbı nasıl ölçülür?",
      table: {
        head: ["Eleman", "Kalıba giren yüzeyler", "Formül", "Örnek"],
        rows: [
          ["Döşeme", "Alt yüz (+ kenar alınları)", "en × boy", "10 × 12 = 120 m²"],
          ["Perde duvar", "İki yan yüz", "2 × uzunluk × yükseklik", "2 × 4 × 2,70 = 21,6 m²"],
          ["Tekil temel", "Dört yan yüz", "2 × (en + boy) × yükseklik", "2 × (1,5 + 1,5) × 0,60 = 3,6 m²"],
          ["Sürekli (mütemadi) temel", "İki uzun yan yüz", "2 × yükseklik × toplam uzunluk", "2 × 0,50 × 40 = 40 m²"],
          ["Merdiven", "Alt eğik yüz + basamak alınları", "Eğik alan + rıht sayısı × rıht alanı", "Projeye göre"]
        ],
        caption: "Toprağa ya da grobetona doğrudan dökülen yüzeyler (temel tabanı gibi) kalıba girmez. Ölçüler örnektir."
      },
      after: [
        "Temel kalıbında yalnızca yan yüzler hesaplanır, çünkü taban grobeton ya da zemin üzerine oturur. Temel kazısı yan duvarları sağlam ve düzgün olan zeminlerde bazen toprak kalıp kullanılır; bu durumda kalıp alanı azalır ama beton sarfiyatı artabilir. Temel kazısı ve hafriyat hacmi için [[bilgi:hafriyat-hesabi-nasil-yapilir|hafriyat hesabı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Örnek: bir katın kalıp alanı adım adım",
      p: [
        "Küçük bir yapının bir katı için kalıp metrajı çıkaralım. Katta 30 × 50 cm kesitli 10 kolon (2,70 m), 25 × 50 cm kesitli ve 5 m uzunluğunda 8 kiriş, 10 × 12 m döşeme (12 cm) ve 0,50 m yüksekliğinde toplam 40 m sürekli temel bulunsun. Kiriş alt yüzleri kirişte sayılacak."
      ],
      ol: [
        "Kolonlar: 4,32 × 10 = 43,2 m².",
        "Kirişler: döşemeyle birlikte döküldüğü için (0,25 + 2 × 0,38) × 5 = 5,05 m²; 8 kiriş için 40,4 m².",
        "Döşeme: 10 × 12 = 120 m²; kiriş altları kirişte sayıldığı için 8 × 5 × 0,25 = 10 m² çıkarılır, 110 m² kalır.",
        "Temel yan yüzleri: 2 × 0,50 × 40 = 40 m².",
        "Net toplam: 43,2 + 40,4 + 110 + 40 = 233,6 m².",
        "Fire payı (%7): 233,6 × 1,07 ≈ 250 m². Bu alan yaklaşık 250 ÷ 3,125 ≈ 80 adet 125 × 250 cm plywood levhaya karşılık gelir."
      ],
      after: [
        "Bu hesapta döşeme alın kalıpları, merdiven ve konsollar yoktur; gerçek bir projede bunlar da eklenir. Aynı hesabı her eleman için [[arac:kalip-alani-hesapla|Kalıp Alanı Hesaplama]] aracıyla yapıp sonuçları toplayabilirsiniz; araç fire payını ve yaklaşık levha sayısını da gösterir."
      ]
    },
    {
      h: "Kalıp için kaç levha ve ne kadar kereste gerekir?",
      p: [
        "Kalıp yüzeyi çoğunlukla plywood levhalarla kaplanır; yaygın ölçü 125 × 250 cm, yani levha başına 3,125 m²'dir. Levha sayısını bulmak için fireli kalıp alanını levha alanına bölüp yukarı yuvarlarsınız. Ancak gerçek ihtiyaç kesim planına bağlıdır: kolon ve kiriş gibi dar elemanlarda kesimden artan parçalar fireyi artırır.",
        "Yüzey malzemesine ek olarak kalıbı taşıyan kuşaklar, kadronlar, dikmeler (direkler) ve bağlantı elemanları gerekir. Bunların miktarı kalıp sistemine, döşeme yüksekliğine ve kalıbın kaç kez kullanılacağına göre değişir; bu nedenle \"metrekare başına şu kadar kereste\" gibi sabit bir oran yerine projenin kalıp planına bakmak gerekir. Kereste hacmini hesaplamak için [[bilgi:kereste-metrekup-hesabi-nasil-yapilir|kereste metreküp hesabı]] yazısını ve [[arac:kereste-hacmi-hesapla|Kereste Hacmi Hesaplama]] aracını kullanabilirsiniz.",
        "Plywood ve kereste birden çok kez kullanılabilir. Aynı kalıp malzemesi üst katlarda tekrar kullanıldığında bina toplamında malzeme ihtiyacı kat sayısıyla doğru orantılı artmaz; kalıpçılık teklifleri bu yüzden genellikle malzeme dahil ya da hariç olarak ayrı ayrı verilir."
      ]
    },
    {
      h: "Fire payı ne kadar eklenmeli?",
      p: [
        "Fire, kesim artıkları, hasar gören levhalar ve ölçü farkları nedeniyle hesaplanan alandan fazla alınması gereken malzemedir. Düzgün geometrili, geniş döşemelerde fire düşük, çok sayıda küçük kolon ve kiriş içeren karmaşık planlarda yüksektir. Yaygın uygulamada kalıp alanına %5–10 fire eklenir; ilk kez kullanılacak yeni malzemede alt sınır, tekrar kullanılan yıpranmış malzemede üst sınır daha gerçekçidir."
      ],
      formula: "Fireli kalıp alanı = net alan × (1 + fire oranı)\n233,6 × 1,05 = 245,3 m² · 233,6 × 1,10 = 257,0 m²\nLevha sayısı = fireli alan ÷ 3,125 (yukarı yuvarlanır)",
      after: [
        "Fire oranının mantığı ve farklı malzemelerdeki tipik değerleri için [[bilgi:fire-orani-nedir-nasil-hesaplanir|fire oranı nedir]] yazısı ayrıntılı bilgi verir."
      ]
    },
    {
      h: "Kolon betonu kaç metreküp tutar?",
      p: [
        "Beton hacmi elemanın geometrik hacmidir: en × boy × yükseklik. 30 × 50 cm kesitli ve 2,70 m yüksekliğindeki bir kolon 0,30 × 0,50 × 2,70 = 0,405 m³ beton alır; 10 kolon için 4,05 m³ gerekir. Hazır beton siparişinde pompaya ve kalıp esnemesine karşı küçük bir pay eklenir; kesin miktarı proje metrajından alın.",
        "Kolon hacmi için [[arac:kolon-beton-hesapla|Kolon Beton Hesaplama]], temel betonu için Temel Beton Hesaplama aracını kullanabilirsiniz. Şantiyede beton elle hazırlanacaksa gereken çimento miktarını [[bilgi:1-m3-beton-icin-kac-torba-cimento|1 m³ beton için kaç torba çimento]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Kalıpçılık metrekare üzerinden nasıl fiyatlanır?",
      p: [
        "Kalıpçılık işleri çoğunlukla kalıp metrekaresi üzerinden, işçilik ya da malzeme dahil fiyat olarak teklif edilir. Toplam bedel, ölçülen kalıp alanı ile anlaşılan birim fiyatın çarpımıdır. Birim fiyat bölgeye, yapının yüksekliğine, eleman çeşitliliğine, kalıp sistemine ve malzemenin kime ait olduğuna göre değişir; bu nedenle sabit bir fiyat vermek doğru olmaz.",
        "Anlaşmazlıkları önlemek için sözleşmede şu noktaları açıkça yazın: kiriş altlarının döşemede mi kirişte mi sayılacağı, alın kalıplarının ve merdivenlerin dahil olup olmadığı, boşlukların (merdiven boşluğu, şaft) düşülüp düşülmeyeceği, fire payının fiyata dahil olup olmadığı ve iskele-dikme işinin kimde olduğu. Ölçü yöntemi baştan belli olduğunda hakediş hesabı tartışmasız yapılır."
      ],
      ul: [
        "<strong>Çift sayma:</strong> Kiriş altını hem kirişte hem döşemede saymak en sık yapılan hatadır.",
        "<strong>Döşeme kalınlığını düşmemek:</strong> Döşemeyle dökülen kirişlerde yan yüzleri tam yükseklikle hesaplamak alanı büyütür.",
        "<strong>Birim hatası:</strong> Santimetreyle metreyi karıştırmak sonucu katlarca değiştirir.",
        "<strong>Boşlukları unutmak:</strong> Döşemedeki büyük boşluklar (merdiven, şaft) çıkarılmazsa alan fazla çıkar.",
        "<strong>Güvenlik:</strong> Dikme aralıkları ve kalıp söküm süreleri statik proje ve şantiye şefinin talimatına göre belirlenmelidir; bu yazı yalnızca metraj hesabını anlatır."
      ]
    }
  ],
  faq: [
    ["Kalıp alanı nasıl hesaplanır?", "Betonun kalıba değen tüm yüzeylerinin alanı toplanır. Kolonda dört yan yüz, kirişte alt ve yan yüzler, döşemede alt yüz, perdede iki yüz, temelde yan yüzler hesaplanır; sonuç metrekare olarak bulunur."],
    ["Kolon kalıbı metrekaresi nasıl bulunur?", "Kolon kesitinin çevresi kolon yüksekliğiyle çarpılır: 2 × (en + boy) × yükseklik. 30 × 50 cm kesitli ve 2,70 m yüksekliğindeki bir kolonun kalıbı 2 × 0,80 × 2,70 = 4,32 m² eder."],
    ["Döşeme kalıbında kiriş altları sayılır mı?", "Bir yüzey yalnızca bir kez sayılmalıdır. Kiriş alt yüzü kiriş kalıbında hesaplandıysa döşeme alanından kirişlerin kapladığı alan çıkarılır; döşeme brüt alınırsa kirişte yalnızca yan yüzler sayılır. Yöntem sözleşmede belirtilmelidir."],
    ["Kalıpçılık işi metrekare üzerinden nasıl fiyatlanır?", "Toplam bedel, ölçülen kalıp alanı ile anlaşılan metrekare birim fiyatın çarpımıdır. Birim fiyat bölgeye, malzemenin kime ait olduğuna ve yapının karmaşıklığına göre değişir; ölçü yöntemi sözleşmede açıkça yazılmalıdır."],
    ["Kalıp için kaç metreküp kereste gerekir?", "Sabit bir oran yoktur; kuşak, kadron ve dikme miktarı kalıp sistemine, döşeme yüksekliğine ve tekrar kullanım sayısına bağlıdır. Yüzey için plywood sayısı ise fireli alanın 3,125 m² levha alanına bölünmesiyle tahmin edilir."],
    ["Kolon betonu kaç metreküp tutar?", "Kolon betonu en × boy × yükseklik formülüyle bulunur. 30 × 50 cm kesitli, 2,70 m yüksekliğindeki bir kolon 0,405 m³ beton alır; on kolon için yaklaşık 4,05 m³ beton gerekir."],
    ["Temel kalıbı nasıl ölçülür?", "Temelde yalnızca yan yüzler kalıplanır, taban zemin ya da grobeton üzerine oturur. Tekil temelde 2 × (en + boy) × yükseklik, sürekli temelde 2 × yükseklik × toplam uzunluk formülü kullanılır."],
    ["Fire payı ne kadar eklenmeli?", "Kalıp alanına genellikle %5–10 fire eklenir. Geniş ve düzgün döşemelerde ve yeni malzemede alt sınır, çok sayıda küçük eleman içeren planlarda ve tekrar kullanılan yıpranmış malzemede üst sınır daha gerçekçidir."],
    ["Kiriş kalıbı nasıl hesaplanır?", "Kiriş kalıbı (alt genişlik + 2 × yan yükseklik) × uzunluk formülüyle bulunur. Döşemeyle birlikte dökülen kirişte yan yükseklikten döşeme kalınlığı düşülür; 25 × 50 cm, 5 m kiriş ve 12 cm döşemede sonuç 5,05 m²'dir."]
  ],
  tools: ["kalip-alani-hesapla", "kolon-beton-hesapla", "kereste-hacmi-hesapla", "temel-beton-hesapla"],
  related: ["kereste-metrekup-hesabi-nasil-yapilir", "1-m3-beton-icin-kac-torba-cimento", "hafriyat-hesabi-nasil-yapilir", "fire-orani-nedir-nasil-hesaplanir", "insaat-demiri-agirligi-tablosu"]
};
