export default {
  slug: "rulo-uzunlugu-nasil-hesaplanir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Rulo Uzunluğu Nasıl Hesaplanır? Kâğıt, Kumaş ve Folyo Rulosunda Metre",
  pageTitle: "Rulo Uzunluğu Nasıl Hesaplanır? Çap ve Kalınlıktan Metre",
  description: "Rulo uzunluğu L = π × (D² − d²) ÷ (4 × t) formülüyle bulunur. Bobin kor çapı, gramajdan uzunluk, etiket rulosunda adet, misina makarası ve ölçüm hataları.",
  keywords: ["rulo uzunluğu hesaplama", "rulo kaç metre", "bobin uzunluğu", "kağıt rulo metre", "rulo çapı kalınlık", "etiket rulosu kaç adet", "misina makara kapasitesi", "bobin metraj hesabı"],
  lead: "Bir rulonun uzunluğu, dış çap (D), iç göbek ya da kor çapı (d) ve malzeme kalınlığı (t) biliniyorsa <strong>L = π × (D² − d²) ÷ (4 × t)</strong> formülüyle hesaplanır. Örneğin dış çapı 1.000 mm, kor çapı 76 mm ve kâğıt kalınlığı 0,1 mm olan bir bobinde yaklaşık 7.809 metre kâğıt vardır. Rulonun ağırlığı biliniyorsa uzunluk gramaj ve en üzerinden de bulunabilir. Bu sayfada iki yöntemi adım adım, etiket rulosunda adet hesabını, kumaş topu ve misina makarası örneklerini ve ölçüm hatalarının sonuca etkisini bulacaksınız.",
  kisaCevap: [
    "Çap yöntemi: L = π × (D² − d²) ÷ (4 × t); D dış çap, d kor çapı, t kalınlık, hepsi aynı birimde.",
    "Örnek: D = 1.000 mm, d = 76 mm, t = 0,1 mm → L ≈ 7.808.600 mm ≈ 7.809 m; sarım sayısı (D − d) ÷ 2t = 4.620.",
    "Ağırlık yöntemi: L (m) = net ağırlık (g) ÷ [gramaj (g/m²) × en (m)]; 25 kg, 80 g/m², 42 cm en → yaklaşık 744 m.",
    "Etiket adedi = rulo uzunluğu ÷ (etiket boyu + aradaki boşluk); 55 m ÷ 53 mm ≈ 1.037 etiket.",
    "Kalınlık ölçümündeki yüzde 10'luk hata uzunlukta da yaklaşık yüzde 10 hata yaratır; kalınlık en kritik değerdir.",
    "Kor çapı da hesaba katılmalıdır; göbek boşluğu düşülmezse uzunluk olduğundan fazla çıkar."
  ],
  figure: {
    alt: "Rulo kesiti: dış çap D 1000 mm, kor çapı d 76 mm, malzeme kalınlığı t 0,1 mm; halka alanının kalınlığa bölünmesiyle 7809 metre uzunluk bulunduğunu gösteren formül kartı.",
    caption: "Rulonun yan yüzündeki halka alanı, sarılı malzemenin kesit alanına eşittir. Bu alanı malzeme kalınlığına bölmek, rulo açıldığında elde edilecek şeridin uzunluğunu verir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Rulo uzunluğu: halka alanı ÷ kalınlık</text>
  <circle cx="180" cy="210" r="150" class="ps"/>
  <circle cx="180" cy="210" r="132" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="114" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="96" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="78" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="60" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="42" class="sb" fill="none"/>
  <circle cx="180" cy="210" r="24" class="sf sb"/>
  <line x1="30" y1="210" x2="330" y2="210" class="sp sw" fill="none"/>
  <text x="250" y="200" class="b p">D = 1.000 mm</text>
  <line x1="156" y1="236" x2="204" y2="236" class="sok sw" fill="none"/>
  <text x="180" y="256" class="sm mid b ok">d = 76 mm</text>
  <text x="180" y="78" class="sm mid">t = 0,1 mm (her kat)</text>
  <rect x="370" y="64" width="330" height="130" rx="10" class="sf sb"/>
  <text x="386" y="92" class="b">Formül</text>
  <text x="386" y="122" class="lg b p">L = π (D² − d²) ÷ 4t</text>
  <text x="386" y="150" class="sm">π × (1.000² − 76²) ÷ (4 × 0,1)</text>
  <text x="386" y="174" class="sm">= 7.808.617 mm ≈ <tspan class="b">7.809 m</tspan></text>
  <rect x="370" y="210" width="160" height="90" rx="10" class="p"/>
  <text x="450" y="238" class="sm mid sf">Sarım sayısı</text>
  <text x="450" y="270" class="xl mid sf">4.620</text>
  <text x="450" y="290" class="sm mid sf">(D − d) ÷ 2t</text>
  <rect x="540" y="210" width="160" height="90" rx="10" class="dgs"/>
  <text x="620" y="238" class="sm mid">t = 0,11 mm ise</text>
  <text x="620" y="270" class="xl mid">7.099 m</text>
  <text x="620" y="290" class="sm mid">%9 daha kısa</text>
  <rect x="370" y="316" width="330" height="66" rx="10" class="oks"/>
  <text x="386" y="342" class="b">Ağırlıktan: L = M ÷ (gramaj × en)</text>
  <text x="386" y="364" class="sm">25.000 g ÷ (80 g/m² × 0,42 m) ≈ 744 m</text>
</svg>`
  },
  sections: [
    {
      h: "Rulo uzunluğu neden hesaplanır?",
      p: [
        "Matbaa, ambalaj, etiket, tekstil ve kablo gibi sektörlerde malzeme rulo ya da bobin hâlinde alınır, satılır ve stokta tutulur. Bir rulonun üzerindeki etiket çoğu zaman başlangıç uzunluğunu gösterir; kullanılmaya başlanmış bir rulonun ne kadar kaldığını ise açıp ölçmeden bilmek gerekir. Sipariş planlaması, iş başına malzeme maliyeti ve fire takibi bu bilgiye dayanır.",
        "Rulo uzunluğunu bulmanın iki pratik yolu vardır: rulonun <strong>geometrisinden</strong> (çap ve kalınlık) ya da <strong>ağırlığından</strong> (gramaj ve en). İkisi de rulo açılmadan uygulanabilir ve birbirini doğrulamak için birlikte kullanılabilir."
      ]
    },
    {
      h: "Rulo uzunluğu çap ve kalınlıktan nasıl hesaplanır?",
      p: [
        "Rulonun yan yüzüne baktığınızda içi boş bir halka görürsünüz. Bu halkanın alanı, sarılı malzemenin kesitine eşittir: rulo açılıp düz bir şerit hâline getirildiğinde şeridin kalınlığı t, uzunluğu L ise kesit alanı t × L olur. Halka alanı ile bu alan eşitlenerek formül elde edilir."
      ],
      formula: "Halka alanı = π × (D² − d²) ÷ 4\nŞerit kesiti = L × t\nL = π × (D² − d²) ÷ (4 × t)\nSarım sayısı N = (D − d) ÷ (2 × t)\nAlternatif: L = N × π × (D + d) ÷ 2  (ortalama sarım çevresi × sarım sayısı)",
      ol: [
        "Ölçüler: dış çap D = 1.000 mm, kor (göbek) çapı d = 76 mm, kâğıt kalınlığı t = 0,1 mm.",
        "Kareleri bulun: D² = 1.000.000, d² = 5.776; fark 994.224 mm².",
        "π ile çarpın: 3,1416 × 994.224 ≈ 3.123.447.",
        "4 × t = 0,4'e bölün: 3.123.447 ÷ 0,4 ≈ 7.808.617 mm.",
        "Metreye çevirin: yaklaşık <strong>7.809 m</strong>.",
        "Kontrol: sarım sayısı (1.000 − 76) ÷ 0,2 = 4.620; ortalama sarım çevresi π × 538 ≈ 1.690 mm; 4.620 × 1.690 mm ≈ 7.809 m. İki yöntem aynı sonucu verir."
      ],
      after: [
        "Bu hesabı [[arac:rulo-uzunlugu-hesapla|Rulo Uzunluğu Hesaplama]] aracı tek adımda yapar ve sarım sayısını, ortalama sarım çevresini de gösterir. Formül kâğıt, plastik film, bant, kumaş, sac ve kablo gibi düzgün sarılmış her şerit malzemede geçerlidir."
      ]
    },
    {
      h: "Bobin iç çapı (kor) hesaba nasıl katılır?",
      p: [
        "Kor, malzemenin üzerine sarıldığı karton ya da plastik borudur. Hesapta önemli olan korun <strong>dış</strong> çapıdır, çünkü malzeme bu yüzeyin üzerinden başlar. Endüstride yaygın kor iç çapları 76 mm (3 inç) ve 152 mm (6 inç) gibi standart değerlerdir; kor duvar kalınlığı birkaç milimetre olduğundan, mümkünse dış çapı doğrudan ölçün.",
        "Kor hiç düşülmezse (d = 0 alınırsa) uzunluk olduğundan fazla çıkar. Örnekte d = 0 alınsaydı sonuç yaklaşık 7.854 m olurdu; fark 45 m, yani yaklaşık yüzde 0,6'dır. Küçük rulolarda bu fark çok daha büyüktür: 110 mm dış çaplı, 40 mm korlu bir etiket rulosunda koru yok saymak uzunluğu yaklaşık yüzde 15 fazla gösterir."
      ]
    },
    {
      h: "Kâğıt rulosunun gramajından uzunluk bulunabilir mi?",
      p: [
        "Evet. Rulonun net ağırlığını (kor hariç), kâğıdın gramajını (g/m²) ve rulonun enini biliyorsanız uzunluk doğrudan bulunur. Gramaj, 1 metrekarelik kâğıdın gram cinsinden ağırlığıdır; ayrıntısı [[bilgi:kagit-gramaji-nedir-80-gr|kâğıt gramajı yazısında]] anlatılır."
      ],
      formula: "Alan (m²) = net ağırlık (g) ÷ gramaj (g/m²)\nUzunluk (m) = alan (m²) ÷ en (m)\nKısaca: L = M ÷ (gramaj × en)",
      ol: [
        "Rulonun brüt ağırlığı 26,2 kg, korun ağırlığı 1,2 kg ise net ağırlık 25 kg = 25.000 g.",
        "Kâğıt 80 g/m², en 42 cm = 0,42 m.",
        "Alan: 25.000 ÷ 80 = 312,5 m².",
        "Uzunluk: 312,5 ÷ 0,42 ≈ <strong>744 m</strong>."
      ],
      after: [
        "Ters yönde, belirli bir uzunluktaki rulonun ağırlığını da bulabilirsiniz. Örnekteki 7.809 m'lik, 42 cm enli ve 80 g/m²'lik bobin yaklaşık 7.809 × 0,42 × 80 ≈ 262 kg gelir. Tek yaprak ya da paket ağırlığı için [[arac:kagit-agirligi-hesapla|Kâğıt Ağırlığı Hesaplama]] aracını kullanabilirsiniz.",
        "Ağırlık yöntemi, kalınlığın ölçülmesi zor olduğu durumlarda daha güvenilirdir. Ancak gramajın üretici toleransı (genellikle birkaç yüzde) ve kâğıdın nem alması sonucu etkiler; kritik siparişlerde iki yöntemle hesaplayıp karşılaştırın."
      ]
    },
    {
      h: "Etiket rulosunda kaç etiket olduğu nasıl hesaplanır?",
      p: [
        "Etiket rulolarında sarılan şerit, etiket malzemesi ile alttaki silikonlu astarın toplam kalınlığıdır. Önce rulo uzunluğu bulunur, sonra bir etiketin kapladığı adıma (etiket boyu + iki etiket arasındaki boşluk) bölünür."
      ],
      ol: [
        "Ölçüler: dış çap 110 mm, kor dış çapı 40 mm, etiket + astar kalınlığı 0,15 mm.",
        "Uzunluk: π × (110² − 40²) ÷ (4 × 0,15) = π × 10.500 ÷ 0,6 ≈ 54.978 mm ≈ 55 m.",
        "Etiket adımı: 50 mm etiket boyu + 3 mm boşluk = 53 mm.",
        "Adet: 54.978 ÷ 53 ≈ <strong>1.037 etiket</strong>.",
        "Etiketler yan yana birden fazla sıra hâlinde diziliyse sonucu sıra sayısıyla çarpın."
      ],
      after: [
        "Etiket kalınlığını kumpasla tek kat ölçmek zordur. Daha doğru sonuç için 10 kat etiketi üst üste koyup ölçün ve 10'a bölün; ya da bilinen sayıda etiketli yeni bir ruloyla ters hesap yaparak kalınlığı bulun."
      ]
    },
    {
      h: "Kumaş topunun metresi ve makaraya sarılacak misina",
      p: [
        "Kumaş topları kâğıt kadar sıkı sarılmaz ve kumaş basınç altında sıkışır; bu yüzden formül yalnızca yaklaşık sonuç verir. Örneğin 400 mm dış çaplı, 50 mm boru üzerine sarılmış ve sarılı hâldeki etkin kalınlığı 0,6 mm kabul edilen bir topta yaklaşık π × (400² − 50²) ÷ 2,4 ≈ 206 m kumaş bulunur. Kumaş toplarında ağırlık yöntemi (metre başına gram) genellikle daha güvenilirdir. Belirli bir dikiş işi için kaç metre kumaş gerektiğini [[arac:kumas-metraj-hesapla|Kumaş Metrajı Hesaplama]] aracıyla bulabilirsiniz.",
        "Olta makaralarında ise üretici, makaranın belirli bir çaptaki misinadan kaç metre aldığını yazar (örneğin 0,30 mm'den 150 m). Makaradaki hacim sabit olduğu için farklı çaptaki misinanın kapasitesi çap oranının karesiyle değişir: 0,25 mm misina için 150 × (0,30 ÷ 0,25)² = 216 m. Bu hesabı ve dolgu misinası miktarını [[arac:olta-misina-hesapla|Makaraya Sarılan Misina]] aracı yapar."
      ]
    },
    {
      h: "Ölçüm hataları sonucu ne kadar etkiler?",
      p: [
        "Formülde kalınlık paydadadır ve doğrudan bölen olarak yer alır; bu yüzden kalınlıktaki her yüzde 1'lik hata uzunlukta da yaklaşık yüzde 1'lik hata yaratır. Çapların ise kareleri alındığı için büyük rulolarda dış çaptaki küçük hatalar görece az etkilidir."
      ],
      table: {
        head: ["Değişiklik", "Hesaplanan uzunluk", "Fark"],
        rows: [
          ["Doğru değerler (D 1.000, d 76, t 0,1 mm)", "7.809 m", "—"],
          ["Kalınlık 0,11 mm ölçülürse", "7.099 m", "%−9,1"],
          ["Dış çap 1.002 mm ölçülürse", "7.840 m", "%+0,4"],
          ["Kor düşülmezse (d = 0)", "7.854 m", "%+0,6"]
        ]
      },
      ul: [
        "<strong>Kalınlığı ölçerken:</strong> Mikrometre kullanın, tek kat yerine 10 kat ölçüp 10'a bölün, malzemeyi sıkıştırmadan ölçün.",
        "<strong>Çapı ölçerken:</strong> Rulo tam yuvarlak olmayabilir; iki dik yönde ölçüp ortalamasını alın ya da çevreyi şeritle ölçüp π'ye bölün.",
        "<strong>Gevşek sarım:</strong> Katlar arasında hava kalan rulolarda formül uzunluğu olduğundan fazla gösterir."
      ]
    },
    {
      h: "Stok sayımında rulo tartısı neden kullanılır?",
      p: [
        "Depoda onlarca açılmış rulonun her birinin çapını ve kalınlığını ölçmek zaman alır. Bu yüzden birçok işletme, her malzeme türü için \"metre başına ağırlık\" (ya da gramaj × en) değerini bir kez belirler ve sayımda yalnızca ruloları tartar. Net ağırlık bu katsayıya bölünerek kalan metre bulunur.",
        "Tartı yöntemi hızlı ve tekrarlanabilirdir, ancak kor ağırlığının doğru düşülmesi gerekir. Her kor tipi için boş kor ağırlığını kaydedin. Bu yöntem, stok devir hızı ve fire oranı gibi göstergelerin güvenilir hesaplanmasına da temel olur; ayrıntılar için [[bilgi:fire-orani-nedir-nasil-hesaplanir|fire oranı yazısına]] ve [[bilgi:stok-devir-hizi-nasil-hesaplanir|stok devir hızı yazısına]] bakabilirsiniz. Duvar kâğıdı gibi kullanım başına rulo hesabı için [[bilgi:duvar-kagidi-kac-rulo-gider|duvar kâğıdı yazısı]] örnek oluşturur."
      ]
    }
  ],
  faq: [
    ["Rulo uzunluğu çap ve kalınlıktan nasıl hesaplanır?", "L = π × (D² − d²) ÷ (4 × t) formülü kullanılır; D dış çap, d kor çapı, t malzeme kalınlığıdır ve hepsi aynı birimde olmalıdır. 1.000 mm dış çaplı, 76 mm korlu, 0,1 mm kalınlıklı bobinde yaklaşık 7.809 m malzeme vardır."],
    ["Bobin iç çapı (kor) hesaba nasıl katılır?", "Formüldeki d değeri korun dış çapıdır, çünkü malzeme bu yüzeyin üzerine sarılır. Kor düşülmezse uzunluk olduğundan fazla çıkar; büyük bobinde fark küçük kalır ama küçük etiket rulolarında yüzde 15'e ulaşabilir."],
    ["Kâğıt rulosunun gramajından uzunluk bulunabilir mi?", "Evet. Net ağırlık grama çevrilip gramaja bölünerek alan, alan da rulo enine bölünerek uzunluk bulunur. 25 kg net, 80 g/m² ve 42 cm enli bir rulo için 25.000 ÷ 80 ÷ 0,42 ≈ 744 m çıkar."],
    ["Etiket rulosunda kaç etiket olduğu nasıl hesaplanır?", "Önce etiket ile astarın toplam kalınlığıyla rulo uzunluğu bulunur, sonra etiket boyu ile aradaki boşluğun toplamına bölünür. 55 m'lik rulo ve 53 mm adımla yaklaşık 1.037 etiket elde edilir; çok sıralı rulolarda sıra sayısıyla çarpılır."],
    ["Kumaş topunun metresi nasıl tahmin edilir?", "Çap formülü yaklaşık sonuç verir, ancak kumaş sıkıştığı için etkin kalınlığı belirlemek zordur. Daha güvenilir yol, kumaşın metre başına ağırlığını bir kez ölçüp topun net ağırlığını bu değere bölmektir."],
    ["Makaraya ne kadar misina sarılacağı nasıl bulunur?", "Makaradaki hacim sabit olduğundan kapasite misina çapının karesiyle ters orantılı değişir. 0,30 mm'den 150 m alan makara, 0,25 mm misinadan 150 × (0,30 ÷ 0,25)² = 216 m alır."],
    ["Ölçüm hataları sonucu ne kadar etkiler?", "Kalınlık doğrudan bölen olduğu için kalınlıktaki yüzde 10'luk hata uzunlukta da yaklaşık yüzde 10 hata yaratır. Büyük rulolarda dış çaptaki 2 mm'lik hata ise yalnızca yaklaşık yüzde 0,4 fark oluşturur; bu yüzden kalınlık en dikkatli ölçülmesi gereken değerdir."],
    ["Stok sayımında rulo tartısı neden kullanılır?", "Tartı, her ruloyu ölçmekten çok daha hızlıdır ve tekrarlanabilir sonuç verir. Malzeme türü başına metre ağırlığı bir kez belirlenir, sayımda net ağırlık bu değere bölünür. Boş kor ağırlığının doğru düşülmesi gerekir."],
    ["Rulo uzunluğu formülü hangi malzemelerde geçerlidir?", "Düzgün ve sıkı sarılmış her şerit malzemede geçerlidir: kâğıt, karton, plastik film, streç, bant, etiket, sac şerit ve kablo. Gevşek ya da sıkışan malzemelerde, örneğin kumaş ve sünger, yalnızca yaklaşık sonuç verir."]
  ],
  tools: ["rulo-uzunlugu-hesapla", "kagit-agirligi-hesapla", "kumas-metraj-hesapla", "olta-misina-hesapla"],
  related: ["kagit-gramaji-nedir-80-gr", "fire-orani-nedir-nasil-hesaplanir", "duvar-kagidi-kac-rulo-gider"]
};
