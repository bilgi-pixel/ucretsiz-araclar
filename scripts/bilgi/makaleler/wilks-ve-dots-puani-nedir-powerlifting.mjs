export default {
  slug: "wilks-ve-dots-puani-nedir-powerlifting",
  kategori: "saglik",
  tarih: "2026-11-15",
  title: "Wilks ve DOTS Puanı Nedir? Powerlifting'de Kuvvet Nasıl Karşılaştırılır?",
  pageTitle: "Wilks ve DOTS Puanı Nedir? Powerlifting Puan Hesaplama",
  description: "Wilks ve DOTS, squat, bench press ve deadlift toplamını vücut ağırlığına göre katsayıyla çarpıp farklı kilodaki sporcuları karşılaştırır. Formül, örnek ve IPF GL farkı.",
  keywords: ["wilks puanı nedir", "dots puanı", "powerlifting puan hesaplama", "vücut ağırlığına göre kuvvet", "squat bench deadlift toplam", "ipf gl puanı", "wilks katsayısı", "1rm toplamı"],
  lead: "Wilks ve DOTS puanı, powerlifting'de <strong>squat, bench press ve deadlift</strong>'ta kaldırılan en yüksek ağırlıkların toplamını, sporcunun vücut ağırlığına bağlı bir <strong>katsayıyla</strong> çarparak farklı kilolardaki sporcuları tek bir ölçekte karşılaştırmaya yarayan puanlardır. Örneğin 82,5 kg ağırlığında 600 kg toplam kaldıran bir erkeğin Wilks puanı yaklaşık 402, DOTS puanı yaklaşık 406'dır. Bu sayfada formülleri, katsayının nasıl değiştiğini, IPF GL puanıyla farkı, tahmini 1RM kullanımını ve ilerlemeyi puanla takip etmeyi çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Toplam = squat + bench press + deadlift (her birinde en iyi geçerli kaldırış, kg).",
    "Wilks = toplam × 500 ÷ (a + b·W + c·W² + d·W³ + e·W⁴ + f·W⁵); W vücut ağırlığıdır, katsayılar cinsiyete göre farklıdır.",
    "DOTS = toplam × 500 ÷ (a + b·W + c·W² + d·W³ + e·W⁴); 2019 sonrasında yaygınlaşan, ağır sıkletlerde daha dengeli kabul edilen bir formüldür.",
    "Örnek: erkek, 82,5 kg, toplam 600 kg → Wilks ≈ 401,9, DOTS ≈ 406,4, IPF GL ≈ 83,3.",
    "Örnek: kadın, 63 kg, toplam 350 kg → Wilks ≈ 375,9, DOTS ≈ 376,4, IPF GL ≈ 76,6.",
    "Puanlar yarışma kaldırışları içindir; tahmini 1RM ile hesaplanan puan yalnızca kişisel takip amaçlı bir yaklaşımdır."
  ],
  figure: {
    alt: "Üç erkek sporcunun Wilks puanı karşılaştırması: 66 kg ve 520 kg toplam 408,3 puan; 82,5 kg ve 600 kg toplam 401,9 puan; 100 kg ve 650 kg toplam 395,6 puan. En hafif sporcu en az ağırlığı kaldırmasına rağmen en yüksek puanı alıyor.",
    caption: "Ham toplam ağır sporcuyu öne çıkarır; Wilks katsayısı bu avantajı dengeler. Katsayı 66 kg'da yaklaşık 0,785, 82,5 kg'da 0,670, 100 kg'da 0,609'dur. Puanlar klasik (1990'ların) Wilks formülüyle hesaplanmıştır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Toplam mı, puan mı? (erkek, klasik Wilks)</text>
  <g class="sm">
    <text x="30" y="78" class="b">Ham toplam (kg)</text>
    <text x="30" y="110">66 kg sporcu</text><rect x="160" y="96" width="416" height="22" class="ps"/><text x="586" y="112" class="b">520</text>
    <text x="30" y="140">82,5 kg sporcu</text><rect x="160" y="126" width="480" height="22" class="ps"/><text x="650" y="142" class="b">600</text>
    <text x="30" y="170">100 kg sporcu</text><rect x="160" y="156" width="520" height="22" class="p"/><text x="672" y="172" class="b sf end">650</text>
    <text x="30" y="226" class="b">Wilks puanı</text>
    <text x="30" y="258">66 kg · ×0,785</text><rect x="160" y="244" width="510" height="22" class="oks"/><text x="660" y="260" class="b end">408,3</text>
    <text x="30" y="288">82,5 kg · ×0,670</text><rect x="160" y="274" width="502" height="22" class="oks"/><text x="652" y="290" class="b end">401,9</text>
    <text x="30" y="318">100 kg · ×0,609</text><rect x="160" y="304" width="494" height="22" class="oks"/><text x="644" y="320" class="b end">395,6</text>
  </g>
  <rect x="30" y="344" width="660" height="40" rx="8" class="sf sb"/>
  <text x="360" y="369" class="mid sm">Puan = toplam × katsayı · katsayı vücut ağırlığı arttıkça küçülür</text>
</svg>`
  },
  sections: [
    {
      h: "Wilks puanı nedir, neden kullanılır?",
      p: [
        "Powerlifting'de sporcular squat, bench press (göğüs presi) ve deadlift (ölü kaldırış) hareketlerinde üçer deneme yapar; her harekette geçerli sayılan en yüksek kaldırışların toplamı sporcunun <strong>toplamı</strong>dır. Yarışmalar sıklet sınıflarına göre yapıldığı için aynı sıkletteki sporcular doğrudan toplamla karşılaştırılır. Ancak \"tüm sıkletlerin en güçlü sporcusu kim?\" sorusuna ham toplamla cevap verilemez; çünkü vücut ağırlığı arttıkça kaldırılabilen mutlak ağırlık da artar.",
        "Wilks formülü bu sorunu çözmek için geliştirildi. Vücut ağırlığına bağlı beşinci dereceden bir polinomla bir katsayı hesaplanır ve toplam bu katsayıyla çarpılır. Hafif sporcuların katsayısı büyük, ağır sporcuların katsayısı küçüktür; böylece kilo avantajı dengelenir. Uzun yıllar uluslararası federasyonların \"en iyi sporcu\" ödüllerinde Wilks kullanıldı. Wilks puanı, yarışma dışında da antrenman yapan kişilerin kendi kuvvetini benzer kilodaki ya da farklı kilodaki kişilerle karşılaştırması için yaygın bir ölçüdür."
      ]
    },
    {
      h: "Toplam (squat + bench + deadlift) ve Wilks formülü",
      formula: "Toplam = en iyi squat + en iyi bench press + en iyi deadlift\nWilks katsayısı = 500 ÷ (a + b·W + c·W² + d·W³ + e·W⁴ + f·W⁵)\nWilks puanı = toplam × Wilks katsayısı   (W: vücut ağırlığı, kg)",
      table: {
        head: ["Katsayı", "Erkek", "Kadın"],
        rows: [
          ["a", "−216,0475144", "594,31747775582"],
          ["b", "16,2606339", "−27,23842536447"],
          ["c", "−0,002388645", "0,82112226871"],
          ["d", "−0,00113732", "−0,00930733913"],
          ["e", "7,01863 × 10⁻⁶", "4,731582 × 10⁻⁵"],
          ["f", "−1,291 × 10⁻⁸", "−9,054 × 10⁻⁸"]
        ],
        caption: "Klasik Wilks katsayıları. 2020'de güncellenmiş bir sürüm (Wilks2) de yayımlanmıştır; iki sürümün puanları birbirine karıştırılmamalıdır."
      },
      ol: [
        "Erkek sporcu, vücut ağırlığı 82,5 kg; squat 220, bench press 140, deadlift 240 kg.",
        "Toplam: 220 + 140 + 240 = 600 kg.",
        "Polinom 82,5 kg için yaklaşık 746,4 değerini verir; katsayı 500 ÷ 746,4 ≈ 0,6699.",
        "Wilks puanı: 600 × 0,6699 ≈ 401,9.",
        "Aynı sporcu toplamını 610 kg'a çıkarırsa puanı yaklaşık 408,6 olur; aynı toplamı 81 kg'da yaparsa puanı yaklaşık 406,5'e çıkar. Bu, hem toplamı artırmanın hem de aynı toplamı daha düşük kiloda kaldırmanın puanı yükselttiğini gösterir."
      ],
      after: [
        "Bu hesabı elle yapmak zahmetli olduğu için [[arac:wilks-puani-hesapla|Wilks Puanı Hesaplama]] aracını kullanabilirsiniz; araç cinsiyet, vücut ağırlığı ve toplamdan katsayıyı ve puanı verir."
      ]
    },
    {
      h: "DOTS ve IPF GL puanı Wilks'ten nasıl farklıdır?",
      p: [
        "Zamanla Wilks formülünün bazı sıkletleri, özellikle çok hafif ve çok ağır sporcuları kayırdığı ya da dezavantajlı bıraktığı eleştirileri arttı. Bunun üzerine daha güncel yarışma verileriyle yeni formüller geliştirildi. <strong>DOTS</strong>, dördüncü dereceden bir polinom kullanan ve 2019'dan sonra pek çok federasyon ve yarışma platformunda yaygınlaşan bir puandır. <strong>IPF GL</strong> (Goodlift) puanı ise Uluslararası Powerlifting Federasyonu'nun kendi yarışmalarında kullandığı, üstel bir fonksiyona dayanan ve 100 civarında bir ölçek veren puandır."
      ],
      formula: "DOTS = toplam × 500 ÷ (a + b·W + c·W² + d·W³ + e·W⁴)\nIPF GL = toplam × 100 ÷ (A − B · e^(−C·W))\nIPF GL katsayıları (klasik, ekipmansız): erkek A=1199,72839 B=1025,18162 C=0,00921 · kadın A=610,32796 B=1045,59282 C=0,03048",
      table: {
        head: ["Sporcu", "Toplam", "Wilks", "DOTS", "IPF GL"],
        rows: [
          ["Erkek, 66 kg", "520 kg", "408,3", "407,4", "81,1"],
          ["Erkek, 82,5 kg", "600 kg", "401,9", "406,4", "83,3"],
          ["Erkek, 100 kg", "650 kg", "395,6", "400,1", "82,1"],
          ["Kadın, 57 kg", "300 kg", "348,1", "343,7", "70,4"],
          ["Kadın, 63 kg", "350 kg", "375,9", "376,4", "76,6"]
        ],
        caption: "Değerler formüllerle hesaplanmıştır. Wilks ve DOTS aynı büyüklükte (yüzlerce) bir ölçek verir; IPF GL ise 100 civarında bir ölçektir ve doğrudan karşılaştırılmaz."
      },
      after: [
        "Tabloda dikkat çeken nokta, sıralamanın formüle göre değişebilmesidir: Wilks'e göre 66 kg'lık sporcu en yüksek puanı alırken, IPF GL'ye göre 82,5 kg'lık sporcu öne geçer. Bu yüzden bir puanı paylaşırken hangi formülle hesaplandığını mutlaka belirtin."
      ]
    },
    {
      h: "Vücut ağırlığı ve cinsiyet puanı nasıl etkiler?",
      p: [
        "Kuvvet, kas kütlesiyle doğru orantılı artar; ama vücut ağırlığının tamamı kas değildir ve ağırlık arttıkça kas dışı doku payı da büyür. Bu nedenle kaldırılan ağırlık vücut ağırlığıyla doğrusal değil, yavaşlayan bir eğriyle artar. Wilks ve DOTS katsayıları bu eğriyi tersine çevirir: 66 kg'lık bir erkekte Wilks katsayısı yaklaşık 0,785 iken 100 kg'da 0,609'a iner.",
        "Kadın ve erkek katsayılarının farklı olması, aynı vücut ağırlığında ortalama kas kütlesi ve üst vücut kuvveti farkını yansıtır. Kadın katsayıları aynı ağırlıkta erkeklerinkinden belirgin biçimde büyüktür; 63 kg'lık bir kadının Wilks katsayısı yaklaşık 1,074'tür. Bu sayede kadın ve erkek sporcular aynı ölçek üzerinde karşılaştırılabilir hâle gelir, ama formüller farklı popülasyonlardan türetildiği için bu karşılaştırma yaklaşık kalır."
      ]
    },
    {
      h: "Tahmini 1RM puan hesabında kullanılabilir mi?",
      p: [
        "Yarışma puanları, hakem onaylı tek tekrarlık en yüksek kaldırışlarla (1RM) hesaplanır. Antrenmanda genellikle birkaç tekrarlı setler yapıldığı için 1RM formüllerle tahmin edilir. Örneğin Epley formülüne göre 100 kg ile 5 tekrar yapan birinin tahmini 1RM'si 100 × (1 + 5 ÷ 30) ≈ 116,7 kg'dır.",
        "Tahmini 1RM ile hesaplanan Wilks ya da DOTS puanı, kişisel ilerlemeyi izlemek için işe yarayan bir yaklaşımdır; ancak yarışma puanıyla aynı değildir. Tekrar sayısı arttıkça tahminin hata payı büyür ve formüller hareketten harekete farklı sonuç verir. Bu yüzden karşılaştırmayı her zaman aynı yöntemle yapın. Tahmini 1RM'nizi farklı formüllerle görmek için [[arac:bir-tekrar-maksimum-hesapla|1RM Hesaplama]] aracını, yöntemin ayrıntıları için [[bilgi:1rm-nedir-maksimum-kaldiris-hesaplama|1RM nedir]] yazısını inceleyebilirsiniz."
      ],
      note: "Gerçek 1RM denemesi yüksek risk taşıyan bir harekettir; deneyimli bir antrenör eşliğinde, uygun ısınmayla ve emniyet çubukları ya da yardımcı (spotter) bulunan bir ortamda yapılmalıdır."
    },
    {
      h: "İyi bir Wilks puanı kaçtır? kg ve pound çevirisi",
      p: [
        "Resmî bir \"iyi puan\" eşiği yoktur; değerlendirme sporcunun deneyimine ve karşılaştırma yapılan gruba bağlıdır. Antrenman topluluklarında kabaca kullanılan bir çerçeve aşağıdaki gibidir. Bu aralıklar yalnızca fikir verir; ekipmanlı ve ekipmansız yarışmalar, yaş grupları ve doping kontrollü federasyonlar arasında büyük farklar vardır."
      ],
      table: {
        head: ["Klasik Wilks (yaklaşık)", "Yaygın yorum"],
        rows: [
          ["200'ün altı", "Başlangıç düzeyi"],
          ["200–300", "Düzenli antrenman yapan, orta düzey"],
          ["300–400", "İleri düzey, yerel yarışma seviyesi"],
          ["400–500", "Ulusal düzeyde rekabetçi"],
          ["500 ve üzeri", "Uluslararası, elit düzey"]
        ],
        caption: "Gayriresmî bir çerçevedir; kendi gelişiminizi izlemek, başkalarıyla karşılaştırmaktan daha anlamlıdır."
      },
      after: [
        "Formüller kilogram cinsinden çalışır. Pound ile tutulan kayıtlar önce kilograma çevrilmelidir: 1 lb = 0,45359237 kg. Örneğin 500 lb'lik bir deadlift 226,8 kg'dır; 600 kg'lık toplam yaklaşık 1.322,8 lb eder. Çeviri için [[arac:kg-pound-cevir|Kg Pound Çevirici]] aracını kullanabilirsiniz. Vücut ağırlığını tartıda yarışma günündeki gibi aç karnına ve aynı saatte ölçmek, puanı tutarlı kılar."
      ]
    },
    {
      h: "Antrenmanda ilerleme puanla nasıl takip edilir?",
      ol: [
        "Her 8–12 haftalık antrenman döneminin sonunda üç hareketin en iyi kaldırışlarını (ya da aynı yöntemle tahmin edilen 1RM'leri) not edin.",
        "Aynı gün vücut ağırlığınızı ölçün ve toplamla birlikte kaydedin.",
        "Her zaman aynı formülü (ör. yalnızca DOTS) kullanarak puanı hesaplayın.",
        "Toplam arttı ama kilo da arttıysa puan değişmeyebilir; bu durumda artış büyük ölçüde kilodan gelmiştir.",
        "Toplam aynı kalıp kilo azaldıysa puan yükselir; bu, göreli kuvvetin arttığını gösterir."
      ],
      after: [
        "Puan takibi, kilo değiştiren sporcular için özellikle anlamlıdır. Ancak hızlı kilo verme ya da kilo alma hedefleri sağlık riskleri taşıyabilir; sıklet değiştirme planlarını antrenör ve beslenme uzmanıyla birlikte yapın. Kuvvet antrenmanında yakılan enerjiyi tahmin etmek isterseniz [[bilgi:met-degeri-nedir-kalori-nasil-hesaplanir|MET değeri]] yazısı yol gösterir."
      ],
      ul: [
        "<strong>Hata:</strong> Farklı formüllerin puanlarını karşılaştırmak. Wilks 400 ile IPF GL 80 aynı ölçek değildir.",
        "<strong>Hata:</strong> Klasik Wilks ile Wilks2'yi karıştırmak; iki sürüm farklı sonuç verir.",
        "<strong>Hata:</strong> Pound değerini kilogram yerine formüle yazmak; puan tamamen anlamsızlaşır.",
        "<strong>Hata:</strong> Tahmini 1RM puanını yarışma puanı gibi sunmak."
      ]
    }
  ],
  faq: [
    ["Wilks puanı nedir, neden kullanılır?", "Wilks puanı, squat, bench press ve deadlift toplamının vücut ağırlığına bağlı bir katsayıyla çarpılmasıyla elde edilir. Farklı kilodaki ve cinsiyetteki sporcuların kuvvetini tek bir ölçekte karşılaştırmak, örneğin tüm sıkletlerin en iyi sporcusunu belirlemek için kullanılır."],
    ["DOTS ve IPF GL puanı Wilks'ten nasıl farklıdır?", "DOTS, daha güncel verilerle türetilmiş dördüncü dereceden bir polinom kullanır ve ağır sıkletlerde daha dengeli kabul edilir. IPF GL ise Uluslararası Powerlifting Federasyonu'nun üstel bir fonksiyona dayanan puanıdır ve 100 civarında bir ölçek verir."],
    ["Toplam (squat + bench + deadlift) nasıl hesaplanır?", "Her harekette geçerli sayılan en yüksek kaldırış toplanır. Squatta 220, bench presste 140 ve deadliftte 240 kg kaldıran bir sporcunun toplamı 600 kg'dır. Antrenmanda tahmini 1RM değerleri de kişisel takip için toplanabilir."],
    ["Vücut ağırlığı puanı nasıl etkiler?", "Katsayı vücut ağırlığı arttıkça küçülür. Klasik Wilks'te erkeklerde 66 kg için yaklaşık 0,785, 82,5 kg için 0,670, 100 kg için 0,609'dur. Bu yüzden aynı toplamı daha düşük kiloda kaldırmak puanı yükseltir."],
    ["Kadın ve erkek için katsayılar neden farklı?", "Aynı vücut ağırlığında ortalama kas kütlesi ve kuvvet düzeyi cinsiyete göre farklı olduğu için formüller ayrı veri setlerinden türetilmiştir. Kadın katsayıları daha büyüktür; 63 kg'lık bir kadının Wilks katsayısı yaklaşık 1,074'tür."],
    ["Tahmini 1RM puan hesabında kullanılabilir mi?", "Kişisel ilerlemeyi izlemek için kullanılabilir, ancak yarışma puanıyla aynı değildir. Tekrar sayısı arttıkça tahminin hata payı büyür; karşılaştırmayı hep aynı formülle ve benzer tekrar aralığıyla yapmak gerekir."],
    ["İyi bir Wilks puanı kaçtır?", "Resmî bir eşik yoktur. Antrenman topluluklarında kabaca 200 ile 300 arası orta, 300 ile 400 arası ileri, 400 ile 500 arası ulusal düzeyde rekabetçi, 500 ve üzeri elit kabul edilir; bu aralıklar federasyona ve yarışma türüne göre değişir."],
    ["kg ve pound değerleri nasıl çevrilir?", "Bir pound 0,45359237 kilogramdır. Formüller kilogramla çalıştığı için pound kayıtları önce kilograma çevrilmelidir; 500 pound 226,8 kg, 600 kg ise yaklaşık 1.322,8 pound eder."],
    ["Antrenmanda ilerleme puanla nasıl takip edilir?", "Her antrenman dönemi sonunda toplamı ve aynı gün ölçülen vücut ağırlığını kaydedin, her seferinde aynı formülle puan hesaplayın. Toplam sabitken kilo düşerse puan artar; kilo ve toplam birlikte artarsa puan değişmeyebilir."],
    ["Wilks ile DOTS puanı birbirine çevrilebilir mi?", "Doğrudan bir çevirme katsayısı yoktur, çünkü iki formül vücut ağırlığına farklı eğrilerle tepki verir. Orta sıkletlerde değerler birbirine yakındır, uçlarda farklılaşır. Karşılaştırma için aynı toplam ve kiloyla her iki puanı ayrı ayrı hesaplamak gerekir."]
  ],
  tools: ["wilks-puani-hesapla", "bir-tekrar-maksimum-hesapla", "kg-pound-cevir"],
  related: ["1rm-nedir-maksimum-kaldiris-hesaplama", "met-degeri-nedir-kalori-nasil-hesaplanir", "gunluk-protein-ihtiyaci-ne-kadar"],
  sources: [
    ["Uluslararası Powerlifting Federasyonu (IPF)", "https://www.powerlifting.sport/"]
  ],
  uyari: "genel bilgidir, antrenman ya da tıbbi tavsiye değildir; ağır kaldırışları antrenör eşliğinde yapın ve sağlık sorununuz varsa önce hekiminize danışın"
};
