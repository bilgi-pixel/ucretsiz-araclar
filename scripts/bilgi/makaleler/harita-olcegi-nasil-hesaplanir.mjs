export default {
  slug: "harita-olcegi-nasil-hesaplanir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Harita Ölçeği Nasıl Hesaplanır? Kesir ve Çizgi Ölçek, Gerçek Uzunluk",
  pageTitle: "Harita Ölçeği Nasıl Hesaplanır? Kesir ve Çizgi Ölçek",
  description: "Gerçek uzunluk = haritadaki uzunluk × ölçek paydası. 1/100.000'de 1 cm 1 km'dir. Kesir-çizgi ölçek farkı, büyük-küçük ölçek, alan hesabı ve birim dönüşümü örnekleri.",
  keywords: ["harita ölçeği hesaplama", "ölçek nasıl hesaplanır", "kesir ölçek", "çizgi ölçek", "1/100000 ölçek", "harita uzunluğu gerçek uzunluk", "büyük ölçek küçük ölçek", "ölçekte alan hesabı"],
  lead: "Harita ölçeği, haritadaki uzunluğun gerçek uzunluğa oranıdır; <strong>gerçek uzunluk = haritadaki uzunluk × ölçek paydası</strong> formülüyle bulunur. 1/100.000 ölçekli bir haritada 1 cm, gerçekte 100.000 cm yani 1 km'dir. Paydası küçük olan ölçek \"büyük ölçek\"tir ve daha ayrıntılı gösterir. Bu sayfada kesir ve çizgi ölçeği, gerçek uzunluk ve harita uzunluğu hesabını, ölçek bulmayı, alan hesabındaki kare kuralını ve birim dönüşümünü çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Ölçek = haritadaki uzunluk ÷ gerçek uzunluk; iki uzunluk aynı birimde olmalıdır.",
    "Gerçek uzunluk = harita uzunluğu × payda; harita uzunluğu = gerçek uzunluk ÷ payda.",
    "1/100.000 ölçekte 1 cm = 1 km; 1/25.000'de 1 cm = 250 m; 1/1.000.000'da 1 cm = 10 km.",
    "Payda küçüldükçe ölçek büyür: 1/25.000 büyük, 1/1.000.000 küçük ölçektir.",
    "Alanlar ölçeğin karesiyle değişir: ölçek paydası 2 katına çıkarsa haritadaki alan 4'te 1'e iner.",
    "Çizgi ölçek harita ile birlikte büyüyüp küçüldüğü için fotokopide doğru kalır; kesir ölçek bozulur."
  ],
  figure: {
    alt: "Kesir ölçek 1/100.000 ve aynı haritanın çizgi ölçeği yan yana; haritada 6 cm ölçülen iki şehir arası 1/250.000 ölçekte 15 km; alan için 1 cm kare 0,25 km kare örneği.",
    caption: "Üstte aynı ölçeğin iki gösterimi, altta uzunluk ve alan hesaplarının özeti. Uzunluk paydayla, alan paydanın karesiyle çarpılır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Harita ölçeği: uzunluk ve alan nasıl hesaplanır?</text>
  <rect x="20" y="50" width="220" height="90" rx="10" class="p"/>
  <text x="130" y="80" class="sm mid sf">Kesir ölçek</text>
  <text x="130" y="116" class="xl mid sf">1 / 100.000</text>
  <rect x="260" y="50" width="440" height="90" rx="10" class="sf sb"/>
  <text x="480" y="76" class="sm mid t2">Çizgi ölçek (aynı ölçek)</text>
  <rect x="290" y="92" width="95" height="14" class="p"/><rect x="385" y="92" width="95" height="14" class="sf sb"/>
  <rect x="480" y="92" width="95" height="14" class="p"/><rect x="575" y="92" width="95" height="14" class="sf sb"/>
  <g class="sm mid"><text x="290" y="126">0</text><text x="385" y="126">1 km</text><text x="480" y="126">2 km</text><text x="575" y="126">3 km</text><text x="670" y="126">4 km</text></g>
  <rect x="20" y="160" width="330" height="140" rx="10" class="ps"/>
  <text x="36" y="188" class="b">Uzunluk örneği · 1/250.000</text>
  <circle cx="60" cy="230" r="8" class="p"/><circle cx="300" cy="230" r="8" class="p"/>
  <line x1="68" y1="230" x2="292" y2="230" class="sp sw dash" fill="none"/>
  <text x="180" y="220" class="sm mid b">haritada 6 cm</text>
  <text x="36" y="264" class="sm">6 × 250.000 = 1.500.000 cm</text>
  <text x="36" y="286" class="b">= 15.000 m = 15 km</text>
  <rect x="370" y="160" width="330" height="140" rx="10" class="oks"/>
  <text x="386" y="188" class="b">Alan örneği · 1/50.000</text>
  <rect x="390" y="204" width="40" height="40" class="sf sb"/>
  <text x="440" y="222" class="sm">1 cm = 50.000 cm = 0,5 km</text>
  <text x="440" y="242" class="sm">1 cm² = 0,5 × 0,5 = 0,25 km²</text>
  <text x="386" y="274" class="sm">Haritada 4 cm² →</text>
  <text x="386" y="292" class="b">4 × 0,25 = 1 km²</text>
  <rect x="20" y="318" width="680" height="84" rx="10" class="sf sb"/>
  <rect x="20" y="318" width="8" height="84" class="a"/>
  <text x="40" y="344" class="b">Büyük ölçek ↔ küçük ölçek</text>
  <text x="40" y="368" class="sm">1/25.000 (mahalle, arazi) · 1/250.000 (il) · 1/1.000.000 (ülke)</text>
  <text x="40" y="390" class="sm t2">Payda büyüdükçe ölçek küçülür, alan genişler, ayrıntı azalır.</text>
</svg>`
  },
  sections: [
    {
      h: "Harita ölçeği nedir?",
      p: [
        "Harita, yeryüzünün küçültülmüş bir çizimidir. <strong>Ölçek</strong>, bu küçültmenin oranını gösterir: haritadaki bir uzunluğun, yeryüzündeki gerçek karşılığına oranıdır. 1/100.000 ölçeği, haritadaki her uzunluğun gerçekte 100.000 katı olduğunu anlatır; 1 cm gerçekte 100.000 cm, 1 mm gerçekte 100.000 mm'dir.",
        "Ölçek bir oran olduğu için birimsizdir. Hesap yaparken haritadaki ve gerçek uzunluğun <strong>aynı birimde</strong> yazılması gerekir; sonuç istenen birime en sonda çevrilir. Konu 9. sınıf coğrafyasının ve KPSS coğrafyasının klasik sorularından biridir ve matematikteki oran-orantının doğrudan uygulamasıdır. Oran-orantı mantığı için [[bilgi:oran-oranti-nasil-cozulur|oran orantı nasıl çözülür]] makalesine bakabilirsiniz."
      ],
      formula: "Ölçek = Haritadaki uzunluk ÷ Gerçek uzunluk\nGerçek uzunluk = Haritadaki uzunluk × Payda\nHaritadaki uzunluk = Gerçek uzunluk ÷ Payda"
    },
    {
      h: "Kesir ölçek ile çizgi ölçek farkı nedir?",
      p: [
        "<strong>Kesir ölçek</strong> oranı sayıyla yazar: 1/100.000 ya da 1:100.000. Hesap yapmak için en pratik gösterimdir. <strong>Çizgi ölçek</strong> ise haritanın kenarına çizilmiş, eşit parçalara bölünmüş bir cetveldir; her parçanın gerçekte kaç kilometreye karşılık geldiği üzerine yazılır. Haritadaki bir mesafeyi pergelle ya da bir kâğıt şeridiyle alıp çizgi ölçeğin üzerine koyarak hesap yapmadan gerçek uzunluğu okuyabilirsiniz.",
        "İki gösterim birbirine çevrilebilir. 1/100.000 ölçekli bir haritada her 1 cm'lik parça 1 km'yi gösterir; bu nedenle çizgi ölçek 1 cm aralıklarla 0, 1, 2, 3 km diye işaretlenir. Tersinden, çizgi ölçekte 2 cm'lik parçanın 10 km olduğu yazıyorsa 1 cm = 5 km = 500.000 cm, yani kesir ölçek 1/500.000'dir.",
        "Bazı haritalarda ölçek üçüncü bir biçimde, sözle de yazılır: \"1 cm = 5 km\" gibi. Bu gösterim kesir ölçeğe kolayca çevrilir; 5 km'yi santimetreye çevirip (500.000 cm) 1'e bölmek yeterlidir. Dijital harita uygulamalarında ise ekranın bir köşesinde yalnızca çizgi ölçek görünür ve yakınlaştırdıkça üzerindeki değer değişir; bunun nedeni ekrandaki gerçek ölçeğin her yakınlaştırmada yeniden hesaplanmasıdır."
      ]
    },
    {
      h: "1/100.000 ölçekli haritada 1 cm kaç km'dir?",
      p: [
        "1 cm × 100.000 = 100.000 cm. Santimetreyi metreye çevirmek için 100'e, metreyi kilometreye çevirmek için 1.000'e böleriz: 100.000 cm = 1.000 m = <strong>1 km</strong>. Pratik bir kısa yol: ölçek paydasından beş sıfır atarsanız 1 cm'nin kaç kilometre olduğunu bulursunuz."
      ],
      table: {
        head: ["Ölçek", "Haritada 1 cm", "Gerçekte 1 km haritada", "Kullanım örneği"],
        rows: [
          ["1/5.000", "50 m", "20 cm", "İmar planı, kadastro"],
          ["1/25.000", "250 m", "4 cm", "Topoğrafya, yürüyüş haritası"],
          ["1/100.000", "1 km", "1 cm", "İlçe ve bölge haritası"],
          ["1/250.000", "2,5 km", "0,4 cm", "İl haritası"],
          ["1/1.000.000", "10 km", "1 mm", "Ülke haritası"],
          ["1/10.000.000", "100 km", "0,1 mm", "Kıta, atlas sayfası"]
        ]
      }
    },
    {
      h: "Haritadaki uzunluktan gerçek mesafe nasıl bulunur?",
      p: [
        "Haritadaki uzunluğu ölçek paydasıyla çarpar, sonucu istenen birime çevirirsiniz. Aşağıdaki örneklerde adımlar ayrı ayrı yazılmıştır."
      ],
      ol: [
        "<strong>Gerçek uzunluk:</strong> 1/250.000 ölçekli haritada iki şehir arası 6 cm ölçülüyor. 6 × 250.000 = 1.500.000 cm = 15.000 m = <strong>15 km</strong>.",
        "<strong>Haritadaki uzunluk:</strong> Gerçekte 36 km olan bir yol 1/200.000 ölçekli haritada kaç cm çizilir? 36 km = 3.600.000 cm; 3.600.000 ÷ 200.000 = <strong>18 cm</strong>.",
        "<strong>Ölçeği bulma:</strong> Gerçekte 20 km olan bir mesafe haritada 4 cm ise 20 km = 2.000.000 cm; 2.000.000 ÷ 4 = 500.000. Ölçek <strong>1/500.000</strong>'dir.",
        "<strong>Milimetre ile:</strong> 1/50.000 ölçekli haritada 7 mm'lik bir köprü uzunluğu 7 × 50.000 = 350.000 mm = 350 m'dir."
      ],
      after: [
        "Bu hesapları adım adım görmek için [[arac:oran-oranti-hesapla|Oran Orantı Hesaplama]] aracının harita ölçeği modunu kullanabilirsiniz; araç sonucu metre ve kilometre olarak verir. Haritadaki kuş uçuşu mesafenin karayolunda ne kadar tuttuğunu merak ediyorsanız [[arac:uzaklik-hesapla|Uzaklık Hesaplama]] aracı iller arası kuş uçuşu ve yaklaşık karayolu mesafesini birlikte gösterir; ikisi arasındaki farkın nedeni yolların düz gitmemesidir."
      ]
    },
    {
      h: "Ölçek problemlerinde birim dönüşümü nasıl yapılır?",
      p: [
        "Ölçek sorularındaki hataların büyük kısmı birim dönüşümünden kaynaklanır. Uzunluk birimleri arasında 10'un kuvvetleriyle geçiş yapılır: 1 km = 1.000 m = 100.000 cm = 1.000.000 mm. Hesabı her zaman aynı birimde yapıp en sonda çevirmek en güvenli yoldur."
      ],
      table: {
        head: ["Dönüşüm", "Çarpan"],
        rows: [
          ["km → m", "× 1.000"],
          ["m → cm", "× 100"],
          ["km → cm", "× 100.000"],
          ["cm → km", "÷ 100.000"],
          ["km² → cm²", "× 10.000.000.000 (10<sup>10</sup>)"],
          ["km² → hektar", "× 100"]
        ]
      },
      after: [
        "Birim dönüşümünde emin olamadığınız durumlarda [[arac:birim-donustur|Birim Dönüştürücü]] ile değerleri çift yönlü çevirebilirsiniz. Alan birimleri arasındaki geçiş için [[bilgi:alan-birimleri-m2-cm2-km2-hektar-donusumu|alan birimleri dönüşümü]] makalesine göz atın."
      ]
    },
    {
      h: "Büyük ölçekli harita neden daha ayrıntılıdır?",
      p: [
        "Ölçeğin \"büyük\" ya da \"küçük\" olması kesrin değerine göre belirlenir. 1/25.000 kesri 1/1.000.000 kesrinden büyüktür; bu yüzden 1/25.000 <strong>büyük ölçek</strong>, 1/1.000.000 <strong>küçük ölçek</strong>tir. Yani payda küçüldükçe ölçek büyür.",
        "Büyük ölçekli haritada küçültme oranı azdır: aynı kâğıda daha küçük bir alan sığar ama o alandaki ayrıntılar (sokaklar, binalar, dereler, eş yükselti eğrileri) daha çok gösterilir. Küçük ölçekli haritada ise aynı kâğıda çok geniş bir alan sığar; ayrıntılar genelleştirilir, yalnızca büyük şehirler ve ana yollar görünür.",
        "Özetle: büyük ölçek → dar alan, çok ayrıntı, gerçeğe yakın uzunluklar; küçük ölçek → geniş alan, az ayrıntı, daha fazla bozulma. Dünya haritalarında kutuplara yakın bölgelerin büyük görünmesi de küçük ölçekli haritalardaki projeksiyon bozulmasının bir sonucudur."
      ]
    },
    {
      h: "Ölçek küçültülünce alan nasıl değişir?",
      p: [
        "Alan iki boyutlu olduğu için ölçeğin <strong>karesiyle</strong> değişir. 1/50.000 ölçekli haritada 1 cm gerçekte 0,5 km'dir; 1 cm² ise 0,5 × 0,5 = 0,25 km²'ye karşılık gelir. Bu haritada 4 cm² yer kaplayan bir göl gerçekte 4 × 0,25 = <strong>1 km²</strong>'dir.",
        "Aynı göl 1/100.000 ölçekli bir haritada çizilirse uzunluklar yarıya iner, alan ise 4'te 1'ine düşer: haritada 1 cm² yer kaplar. Genel kural: ölçek paydası k katına çıkarsa haritadaki uzunluklar k'da 1'e, alanlar k²'de 1'e iner."
      ],
      formula: "Gerçek alan = Haritadaki alan × Payda²\nÖrnek: 4 cm² × 50.000² = 4 × 2.500.000.000 = 10.000.000.000 cm² = 1 km²"
    },
    {
      h: "Çizgi ölçek neden fotokopide bozulmaz?",
      p: [
        "Bir haritayı fotokopide %50 küçülttüğünüzü düşünün. Haritadaki tüm uzunluklar yarıya iner; ancak kenardaki \"1/100.000\" yazısı değişmez. Artık 1 cm gerçekte 2 km'yi gösterdiği için haritanın gerçek ölçeği 1/200.000 olmuştur ve kesir ölçek yanlış bilgi verir.",
        "Çizgi ölçek ise haritanın bir parçası olduğu için o da yarıya küçülür. \"1 km\" yazan aralık artık 0,5 cm'dir ve haritadaki mesafeleri yine doğru gösterir. Bu yüzden ekranda yakınlaştırılan dijital haritalar ve farklı boyutlarda basılacak haritalar her zaman çizgi ölçekle birlikte verilir."
      ]
    },
    {
      h: "Ölçek ve eğim: iki nokta arasındaki eğim nasıl bulunur?",
      p: [
        "Coğrafya sorularında ölçek çoğu zaman eş yükselti eğrileriyle birlikte sorulur. Eğim, iki nokta arasındaki yükselti farkının yatay mesafeye oranıdır ve genellikle yüzde olarak ifade edilir. Yatay mesafe haritadan ölçek yardımıyla bulunur; yükselti farkı ise eş yükselti eğrilerinin değerlerinden okunur.",
        "Örnek: 1/25.000 ölçekli bir topoğrafya haritasında A noktası 450 m, B noktası 600 m yükseltidedir ve iki nokta arası haritada 4 cm'dir. Yatay mesafe 4 × 25.000 = 100.000 cm = 1.000 m'dir. Yükselti farkı 600 − 450 = 150 m'dir. Eğim = 150 ÷ 1.000 × 100 = <strong>%15</strong> bulunur.",
        "Aynı iki nokta 1/50.000 ölçekli bir haritada 2 cm aralıkla görünür; yatay mesafe yine 1.000 m olduğu için eğim değişmez. Bu, ölçeğin harita üzerindeki görünüşü değiştirdiğini ama gerçek dünyadaki ilişkileri değiştirmediğini gösteren iyi bir kontroldür. Eş yükselti eğrileri birbirine yaklaştıkça eğim artar; haritada sık çizilmiş eğriler dik bir yamacı, seyrek eğriler düzlüğe yakın bir araziyi anlatır."
      ],
      formula: "Eğim (%) = Yükselti farkı ÷ Yatay mesafe × 100\nYatay mesafe = Haritadaki uzunluk × Payda"
    },
    {
      h: "Ölçek sorularında sık yapılan hatalar",
      ul: [
        "<strong>Birimleri karıştırmak:</strong> Haritadaki cm ile gerçek km'yi aynı birime çevirmeden bölmek.",
        "<strong>Büyük-küçük ölçeği paydaya göre sanmak:</strong> Paydası büyük olan ölçek küçüktür.",
        "<strong>Alanda kareyi unutmak:</strong> Alan sorularında paydanın karesi alınır; yalnızca payda ile çarpmak 50.000 kat hatalı sonuç verir.",
        "<strong>Sıfır saymada hata:</strong> 100.000 cm = 1 km dönüşümünde bir sıfır fazla ya da eksik yazmak sonucu 10 kat değiştirir; büyük sayıları üçlü gruplarla yazmak bu hatayı azaltır."
      ]
    }
  ],
  faq: [
    ["Harita ölçeği nedir?", "Harita ölçeği, haritadaki bir uzunluğun yeryüzündeki gerçek uzunluğa oranıdır. 1/100.000 ölçeği, haritadaki her uzunluğun gerçekte 100.000 katı olduğunu gösterir; iki uzunluk aynı birimle yazılır."],
    ["Kesir ölçek ile çizgi ölçek farkı nedir?", "Kesir ölçek oranı 1/100.000 gibi sayıyla, çizgi ölçek ise üzerinde gerçek mesafeleri yazan bir cetvel çizimiyle gösterir. Çizgi ölçek hesap yapmadan okunabilir ve harita büyütülüp küçültüldüğünde doğru kalır."],
    ["1/100.000 ölçekli haritada 1 cm kaç km'dir?", "1 cm × 100.000 = 100.000 cm = 1.000 m = 1 km'dir. Pratik kural olarak ölçek paydasından beş sıfır atıldığında 1 cm'nin kaç kilometreye karşılık geldiği bulunur."],
    ["Haritadaki uzunluktan gerçek mesafe nasıl bulunur?", "Haritadaki uzunluk ölçek paydasıyla çarpılır ve sonuç istenen birime çevrilir. 1/250.000 ölçekli haritada 6 cm, 6 × 250.000 = 1.500.000 cm yani 15 km eder."],
    ["Büyük ölçekli harita neden daha ayrıntılıdır?", "Büyük ölçekli haritada payda küçük, küçültme oranı azdır. Aynı kâğıda daha dar bir alan sığdığı için sokak, bina ve dere gibi ayrıntılar gösterilebilir; küçük ölçekte ayrıntılar genelleştirilir."],
    ["Ölçek küçültülünce alan nasıl değişir?", "Alan ölçeğin karesiyle değişir. Ölçek paydası iki katına çıkarsa haritadaki uzunluklar yarıya, alanlar dörtte birine iner. Gerçek alan, haritadaki alanın paydanın karesiyle çarpılmasıyla bulunur."],
    ["Ölçek problemlerinde birim dönüşümü nasıl yapılır?", "Önce tüm uzunluklar aynı birime çevrilir, hesap yapılır, sonuç en sonda istenen birime dönüştürülür. 1 km = 100.000 cm ve 1 km² = 10.000.000.000 cm² dönüşümleri en sık kullanılanlardır."],
    ["Çizgi ölçek neden fotokopide bozulmaz?", "Çizgi ölçek haritanın parçası olduğu için harita küçültülüp büyütüldüğünde o da aynı oranda değişir ve mesafeleri doğru göstermeye devam eder. Kesir ölçek yazısı ise değişmediği için yanlış hâle gelir."],
    ["Haritadan ölçek nasıl bulunur?", "Gerçek uzunluğu bilinen bir mesafe haritada ölçülür, iki değer aynı birime çevrilir ve gerçek uzunluk haritadaki uzunluğa bölünür. 20 km'lik mesafe haritada 4 cm ise ölçek 1/500.000'dir."]
  ],
  tools: ["oran-oranti-hesapla", "birim-donustur", "uzaklik-hesapla"],
  related: ["oran-oranti-nasil-cozulur", "alan-birimleri-m2-cm2-km2-hektar-donusumu", "enlem-boylam-derece-dakika-saniye-nasil-okunur"],
  sources: [
    ["Harita Genel Müdürlüğü", "https://www.harita.gov.tr/"],
    ["MEB – Coğrafya dersi öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
