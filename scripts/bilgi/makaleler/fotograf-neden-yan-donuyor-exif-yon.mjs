export default {
  slug: "fotograf-neden-yan-donuyor-exif-yon",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Fotoğraf Neden Yan Dönüyor? EXIF Yön Bilgisi ve Kalıcı Döndürme",
  pageTitle: "Fotoğraf Neden Yan Dönüyor? EXIF Yön Bilgisi ve Kalıcı Düzeltme",
  description: "Telefonda düz görünen fotoğraf yükleyince yan dönüyorsa nedeni EXIF yön etiketidir. 1–8 yön değerleri, ayna görüntüsü, kalıcı döndürme ve PDF sayfa düzeltme.",
  keywords: ["fotoğraf yan dönüyor", "fotoğraf ters çıkıyor", "exif orientation", "exif yön bilgisi", "resim döndürme", "yüklenen fotoğraf yan", "fotoğraf ayna görüntüsü", "fotoğraf döndürme kaydetme", "toplu fotoğraf döndürme"],
  lead: "Telefonda düz görünen bir fotoğraf bir siteye yüklenince yan dönüyorsa, fotoğrafın pikselleri aslında yan kaydedilmiştir ve doğru duruşu yalnızca dosyadaki <strong>EXIF yön (Orientation) etiketi</strong> söyler. Telefonun galerisi bu etiketi okuyup fotoğrafı çevirerek gösterir; etiketi okumayan ya da yükleme sırasında silen bir sistem ise ham pikselleri olduğu gibi gösterir. Kalıcı çözüm, pikselleri gerçekten döndürüp yön etiketini \"normal\" değerine çekmektir. Bu sayfada yön değerlerini, ön kameranın ayna etkisini, kalite kaybını ve PDF'teki yan sayfaları anlatıyoruz.",
  kisaCevap: [
    "Telefon kamerası sensörü hep aynı yönde okur; telefonu nasıl tuttuğunuz pikselleri değil, EXIF yön etiketini değiştirir.",
    "EXIF yön etiketi 1 ile 8 arasında bir değerdir: 1 normal, 3 baş aşağı, 6 saat yönünde 90°, 8 saatin tersine 90° döndürülmesi gerektiğini anlatır.",
    "2, 4, 5 ve 7 değerleri ayna (yatay ya da dikey çevirme) içerir; günlük fotoğraflarda nadir görülür.",
    "Etiketi okumayan ya da meta verileri silen sistemler fotoğrafı yan gösterir; çözüm pikselleri kalıcı olarak döndürmektir.",
    "JPEG'i 90° döndürüp yeniden kaydetmek küçük bir sıkıştırma kaybı yaratır; yüksek kalite ayarıyla bu kayıp gözle fark edilmez.",
    "PDF'teki yan sayfa fotoğraftan farklı biçimde, sayfanın döndürme değeri değiştirilerek kayıpsız düzeltilir."
  ],
  figure: {
    alt: "Telefonun sensörü pikselleri yatay kaydediyor, EXIF etiketine 6 yazıyor. Etiketi okuyan galeri fotoğrafı dik gösteriyor, etiketi okumayan site yan gösteriyor. Altta 1, 3, 6 ve 8 yön değerleri.",
    caption: "Dikey tutulan telefonla çekilen fotoğrafta pikseller yatay kaydedilir ve etikete 6 yazılır. Galeri etiketi okuyup 90° çevirir; etiketi yok sayan sistem ham pikselleri gösterir. Kalıcı döndürme pikselleri çevirip etiketi 1 yapar.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Aynı dosya, iki farklı görünüm</text>
  <rect x="20" y="48" width="200" height="190" rx="10" class="sf sb"/>
  <text x="120" y="72" class="b mid">Dosyanın içi</text>
  <rect x="50" y="88" width="140" height="90" rx="4" class="ps"/>
  <text x="120" y="128" class="sm mid b">Pikseller yatay</text>
  <text x="120" y="148" class="sm mid">(kişi yan yatmış)</text>
  <rect x="50" y="190" width="140" height="32" rx="6" class="p"/>
  <text x="120" y="211" class="sm mid sf b">EXIF yön = 6</text>
  <line x1="222" y1="110" x2="300" y2="90" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="222" y1="180" x2="300" y2="200" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="305" y="48" width="190" height="96" rx="10" class="oks"/>
  <text x="400" y="74" class="b mid">Galeri etiketi okur</text>
  <text x="400" y="98" class="sm mid">90° saat yönünde çevirir</text>
  <text x="400" y="124" class="sm mid ok b">Düz görünür</text>
  <rect x="305" y="160" width="190" height="96" rx="10" class="dgs"/>
  <text x="400" y="186" class="b mid">Site etiketi yok sayar</text>
  <text x="400" y="210" class="sm mid">Ham pikselleri gösterir</text>
  <text x="400" y="236" class="sm mid dg b">Yan görünür</text>
  <rect x="515" y="48" width="185" height="208" rx="10" class="sf sb"/>
  <text x="607" y="74" class="b mid">Kalıcı döndürme</text>
  <text x="607" y="102" class="sm mid">Pikseller 90° çevrilir</text>
  <text x="607" y="124" class="sm mid">Etiket 1 yapılır</text>
  <rect x="577" y="140" width="60" height="90" rx="4" class="oks"/>
  <text x="607" y="190" class="sm mid b">Dik</text>
  <text x="607" y="248" class="sm mid ok b">Her yerde düz</text>
  <text x="20" y="282" class="b">Sık görülen yön değerleri</text>
  <g class="mid">
    <rect x="20" y="296" width="160" height="110" rx="8" class="sf sb"/><text x="100" y="322" class="xl">1</text><text x="100" y="350" class="sm">Normal</text><text x="100" y="372" class="sm mu">Döndürme yok</text>
    <rect x="193" y="296" width="160" height="110" rx="8" class="sf sb"/><text x="273" y="322" class="xl">3</text><text x="273" y="350" class="sm">Baş aşağı</text><text x="273" y="372" class="sm mu">180° çevir</text>
    <rect x="366" y="296" width="160" height="110" rx="8" class="ps"/><text x="446" y="322" class="xl">6</text><text x="446" y="350" class="sm">Dikey çekim</text><text x="446" y="372" class="sm mu">90° saat yönü</text>
    <rect x="540" y="296" width="160" height="110" rx="8" class="sf sb"/><text x="620" y="322" class="xl">8</text><text x="620" y="350" class="sm">Ters dikey</text><text x="620" y="372" class="sm mu">90° saat tersi</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Telefonda düz görünen fotoğraf yükleyince neden yan dönüyor?",
      p: [
        "Telefon kamerasının görüntü sensörü dikdörtgendir ve her çekimde pikselleri aynı sırayla okur. Telefonu dik ya da yatay tutmanız sensörün okuma yönünü değiştirmez. Bunun yerine telefonun yön algılayıcısı, çekim anında cihazın nasıl tutulduğunu ölçer ve bu bilgiyi fotoğraf dosyasının içine küçük bir not olarak yazar. Bu nota <strong>EXIF yön etiketi</strong> denir.",
        "Galeri uygulamanız fotoğrafı açarken önce bu notu okur ve görüntüyü gerektiği kadar çevirerek gösterir. Siz de fotoğrafı düz görürsünüz. Ancak dosyanın içindeki pikseller hâlâ \"yan\" durmaktadır. Fotoğrafı yüklediğiniz başvuru sistemi, eski bir web sitesi ya da bir belge programı EXIF notunu okumuyorsa ya da yükleme sırasında meta verileri temizliyorsa ham pikselleri olduğu gibi gösterir ve fotoğraf yan çıkar.",
        "Sorunun tuhaf tarafı, aynı dosyanın bir yerde düz, başka yerde yan görünmesidir. Bu durum dosyanın bozuk olduğunu göstermez; yalnızca iki programın yön etiketine farklı davrandığını gösterir."
      ]
    },
    {
      h: "EXIF yön (orientation) bilgisi nedir? 1–8 değer tablosu",
      p: [
        "EXIF, dijital fotoğraflara gömülen meta veri standardıdır: çekim tarihi, cihaz modeli, pozlama ayarları, bazen de GPS konumu burada saklanır. Yön etiketi bu alanlardan yalnızca biridir ve sekiz olası değer alır. Her değer, ham pikselleri doğru görüntüye çevirmek için ne yapılması gerektiğini anlatır."
      ],
      table: {
        head: ["Değer", "Anlamı", "Düzeltmek için", "Ne zaman oluşur?"],
        rows: [
          ["1", "Normal", "İşlem yok", "Telefon yatay tutulmuş"],
          ["2", "Yatay ayna", "Yatay çevir", "Bazı ön kamera ve tarayıcı çıktıları"],
          ["3", "Baş aşağı", "180° döndür", "Telefon ters yatay tutulmuş"],
          ["4", "Dikey ayna", "Dikey çevir", "Nadir"],
          ["5", "Ayna + 90°", "Çevir ve döndür", "Nadir"],
          ["6", "90° yatık", "90° saat yönünde döndür", "Telefon dik tutulmuş (en yaygın)"],
          ["7", "Ayna + 270°", "Çevir ve döndür", "Nadir"],
          ["8", "90° ters yatık", "90° saatin tersine döndür", "Telefon ters dik tutulmuş"]
        ],
        caption: "Gündelik fotoğrafların büyük çoğunluğunda değer 1 ya da 6'dır. Değer yoksa görüntüleyiciler 1 kabul eder."
      },
      after: [
        "EXIF verisi yalnızca yön bilgisini değil, çoğu zaman fotoğrafı çektiğiniz yerin konumunu da taşır. Fotoğrafı paylaşmadan önce bu verileri temizlemek isterseniz [[bilgi:fotograftaki-konum-bilgisi-nasil-silinir|fotoğraftaki konum bilgisini silme]] yazısına bakabilirsiniz. Dikkat: meta verileri silen bir araç, pikselleri döndürmeden yön etiketini de silerse fotoğraf her yerde yan görünmeye başlar. Doğru sıra önce kalıcı döndürme, sonra temizliktir."
      ]
    },
    {
      h: "Fotoğraf kalıcı olarak nasıl döndürülür?",
      p: [
        "\"Kalıcı döndürme\", pikselleri gerçekten çevirip yön etiketini 1 (normal) değerine sıfırlamak demektir. Böylece fotoğraf, etiketi okuyan ya da okumayan her sistemde aynı görünür. Galeri uygulamalarının bir kısmı \"döndür\" dediğinizde yalnızca etiketi değiştirir; bu da sorunu çözmez, yalnızca yönünü değiştirir."
      ],
      ol: [
        "Fotoğrafı [[arac:resim-dondur|Resim Döndür ve Çevir aracında]] açın. Araç EXIF yön değerini okur ve fotoğrafı sizin galerinizde gördüğünüz hâliyle gösterir.",
        "Görüntü hâlâ yanlışsa 90°, 180° ya da 270° döndürme düğmelerini kullanın; ayna görüntüsünü düzeltmek için yatay çevirmeyi seçin.",
        "Çıktı biçimini seçin. Belge ve başvuru için JPG genellikle yeterlidir; metin içeren ekran görüntüleri için PNG daha keskindir.",
        "İndirdiğiniz dosyayı başka bir programda açarak düz göründüğünü kontrol edin, sonra yükleyin."
      ],
      after: [
        "Fotoğrafta gereksiz kenarlar varsa döndürmeden sonra [[arac:resim-kirp|Resim Kırpma aracıyla]] istenen orana kırpabilirsiniz. Kırpmayı döndürmeden önce yaparsanız oranlar yanlış eksende uygulanabilir."
      ]
    },
    {
      h: "Ön kamera fotoğrafı neden ayna gibi ters görünür?",
      p: [
        "Ön kamerayla çekim yaparken ekranda kendinizi aynada görür gibi görürsünüz; sağ elinizi kaldırdığınızda ekrandaki görüntü de sağda el kaldırır. Bu önizleme bilerek aynalanmıştır, çünkü insanlar kendi yüzlerini aynadan tanır. Fotoğraf kaydedilirken ise bazı cihazlar görüntüyü aynalamadan, yani başkalarının sizi gördüğü hâliyle saklar. Sonuçta kaydedilen fotoğraf önizlemeye göre \"ters\" görünür.",
        "Bu bir yön sorunu değil, ayna sorunudur; 90° ya da 180° döndürmek düzeltmez. Özellikle tişörtteki yazı, tabela ya da belge fotoğraflarında yazının ters okunması bundandır. Çözüm, fotoğrafı yatay olarak çevirmektir. Birçok telefonda kamera ayarlarında \"ön kamerayı aynala\" gibi bir seçenek de bulunur.",
        "Kimlik ya da başvuru fotoğrafında yüzü aynalamak genellikle sorun yaratmaz, ama arkada yazı varsa ya da belge fotoğrafı çekiyorsanız mutlaka arka kamerayı kullanın."
      ]
    },
    {
      h: "Döndürme fotoğraf kalitesini düşürür mü?",
      p: [
        "JPEG kayıplı sıkıştırılmış bir biçimdir. Fotoğrafı döndürüp yeniden JPEG olarak kaydettiğinizde görüntü baştan sıkıştırılır ve teorik olarak az miktarda ayrıntı kaybolur. Pratikte yüksek kalite ayarıyla (yüzde 90 civarı) yapılan tek bir döndürme gözle fark edilmez. Sorun, aynı fotoğrafı defalarca döndürüp kaydettiğinizde birikir.",
        "Tamamen kayıpsız döndürme de mümkündür, ama yalnızca 90° katlarında ve görüntü boyutları JPEG blok boyutunun (8 ya da 16 piksel) katı olduğunda. PNG ve WebP kayıpsız modda ise döndürme hiçbir kalite kaybı yaratmaz. Serbest açıyla (örneğin 3°) düzeltme yapmak her biçimde yeniden örnekleme gerektirir; kenarlarda hafif yumuşama ve köşelerde boş alan oluşur, bu yüzden ardından kırpma gerekir."
      ],
      table: {
        head: ["İşlem", "JPEG", "PNG / WebP kayıpsız"],
        rows: [
          ["Yalnızca EXIF etiketini değiştirmek", "Kayıpsız ama her yerde çalışmaz", "Etiket desteği sınırlı"],
          ["90° / 180° / 270° döndürüp kaydetmek", "Çok küçük kayıp (yeniden sıkıştırma)", "Kayıpsız"],
          ["Serbest açıyla düzeltmek", "Yeniden örnekleme + sıkıştırma", "Yeniden örnekleme"],
          ["Aynı dosyayı tekrar tekrar döndürmek", "Kayıp birikir", "Kayıpsız"]
        ]
      }
    },
    {
      h: "PDF'teki yan sayfa nasıl düzeltilir?",
      p: [
        "PDF'te durum fotoğraftan farklıdır. Her PDF sayfasının kendi döndürme değeri vardır (0, 90, 180 ya da 270) ve görüntüleyici sayfayı bu değere göre çevirir. Bu değer PDF standardının parçasıdır ve tüm görüntüleyiciler tarafından desteklenir. Taranan bir belgede bir sayfa yan geldiyse sayfanın döndürme değerini değiştirmek yeterlidir; içerik yeniden sıkıştırılmaz ve kalite kaybı olmaz.",
        "[[arac:pdf-dondur|PDF Sayfa Döndür aracı]] tüm sayfaları ya da yalnızca seçtiğiniz aralığı döndürür. Sayfa silme ve sıralama gibi işlemler için [[bilgi:pdf-sayfa-silme-ve-dondurme|PDF sayfa silme ve döndürme]] yazısı ayrıntılı yol gösterir.",
        "Fotoğrafları PDF'e çevirmeden önce döndürmek daha temiz sonuç verir. Yan duran bir fotoğraf PDF'e konduğunda sayfa dikey olabilir ama içindeki görüntü yan kalır; bu durumda sayfayı değil, fotoğrafı düzeltmeniz gerekir."
      ]
    },
    {
      h: "E-Devlet'e ya da başvuru sistemine yüklenen belge neden yan görünür?",
      p: [
        "Resmî başvuru sistemleri güvenlik ve dosya boyutu nedeniyle yüklenen fotoğrafları çoğu zaman yeniden işler: boyutunu küçültür, biçimini değiştirir ve meta verileri siler. Meta veriler silinince yön etiketi de gider ve fotoğraf ham pikselleriyle, yani yan olarak kaydedilir. Sizin önizlemede düz gördüğünüz fotoğraf, sistemdeki kopyada yan durur.",
        "Bunu önlemenin yolu, yüklemeden önce fotoğrafı kalıcı olarak döndürmek ve gerekiyorsa boyut sınırına göre küçültmektir. Belgenin PDF olarak istenmesi durumunda boyut ve biçim kuralları için [[rehber:e-devlet-pdf-boyutu|e-Devlet PDF boyutu rehberine]] göz atabilirsiniz."
      ]
    },
    {
      h: "Toplu fotoğraf döndürme",
      p: [
        "Onlarca belge fotoğrafını tek tek döndürmek zaman alır. Resim Döndür aracı birden çok dosyayı aynı anda açıp her birinin EXIF yönünü otomatik düzeltebilir ve sonuçları tek bir ZIP dosyası olarak indirir. Fotoğraflarınız tarayıcınızda işlenir; hiçbir sunucuya gönderilmez.",
        "Toplu işlemde önce birkaç örneği kontrol etmek iyi bir alışkanlıktır. Aynı klasördeki fotoğrafların bir kısmı dik, bir kısmı yatay çekilmiş olabilir; \"tümünü 90° döndür\" komutu doğru olanları da bozabilir. Otomatik EXIF düzeltmesi bu yüzden daha güvenlidir: her dosyayı kendi etiketine göre çevirir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yalnızca galeride döndürmek:</strong> Bazı uygulamalar etiketi değiştirir, pikselleri değil; sorun başka sistemde tekrar eder.",
        "<strong>Önce meta verileri silmek:</strong> Etiket silinirse fotoğraf yan kalır; önce döndürün, sonra temizleyin.",
        "<strong>Ayna sorununu döndürmeyle çözmeye çalışmak:</strong> Ters yazı için yatay çevirme gerekir.",
        "<strong>Aynı JPEG'i defalarca kaydetmek:</strong> Kalite kaybı birikir; düzeltmeyi orijinal dosya üzerinde bir kez yapın.",
        "<strong>PDF'teki fotoğrafı sayfa döndürerek düzeltmeye çalışmak:</strong> Sayfa doğruysa ama görüntü yansa sorun görüntüdedir."
      ]
    }
  ],
  faq: [
    ["Telefonda düz görünen fotoğraf yükleyince neden yan dönüyor?", "Fotoğrafın pikselleri aslında yan kaydedilmiştir ve doğru yönü yalnızca EXIF yön etiketi gösterir. Galeri bu etiketi okur; etiketi okumayan ya da yüklemede silen sistemler fotoğrafı yan gösterir."],
    ["EXIF yön (orientation) bilgisi nedir?", "Fotoğraf dosyasına yazılan ve görüntünün doğru gösterilmesi için ne kadar döndürülüp çevrilmesi gerektiğini anlatan 1 ile 8 arasındaki değerdir. 1 normal, 6 ise dikey çekilmiş ve 90° döndürülmesi gereken fotoğrafı anlatır."],
    ["Fotoğraf kalıcı olarak nasıl döndürülür?", "Pikselleri gerçekten döndürüp EXIF yön etiketini 1 yapan bir araç kullanın. Resim Döndür aracı etiketi okuyup fotoğrafı düzeltir ve yeni dosyayı indirmenizi sağlar; böylece her sistemde aynı görünür."],
    ["Ön kamera fotoğrafı neden ayna gibi ters görünür?", "Ön kamera önizlemesi aynalanmış gösterilir, ama bazı cihazlar fotoğrafı aynalamadan kaydeder. Bu bir döndürme sorunu değildir; görüntüyü yatay çevirerek ya da kamera ayarındaki aynalama seçeneğiyle düzeltebilirsiniz."],
    ["Döndürme fotoğraf kalitesini düşürür mü?", "JPEG'i döndürüp yeniden kaydetmek çok küçük bir sıkıştırma kaybı yaratır ve tek seferde gözle fark edilmez. PNG gibi kayıpsız biçimlerde 90° katlarında döndürme hiç kalite kaybı yaratmaz."],
    ["PDF'teki yan sayfa nasıl düzeltilir?", "PDF sayfasının döndürme değerini 90, 180 ya da 270 derece değiştirin. Bu işlem içeriği yeniden sıkıştırmadığı için kayıpsızdır; PDF Sayfa Döndür aracı tüm sayfaları ya da seçili aralığı döndürebilir."],
    ["Toplu fotoğraf döndürme yapılabilir mi?", "Evet. Resim Döndür aracına birden çok fotoğraf ekleyip her birini kendi EXIF etiketine göre otomatik düzeltebilir, sonuçları tek ZIP dosyası olarak indirebilirsiniz. Dosyalar tarayıcıda işlenir."],
    ["E-Devlet'e yüklenen belge neden yan görünür?", "Başvuru sistemleri yüklenen fotoğrafı küçültürken meta verileri silebilir; yön etiketi gidince fotoğraf ham hâliyle, yani yan kaydedilir. Yüklemeden önce fotoğrafı kalıcı olarak döndürmek bu sorunu önler."],
    ["EXIF temizlemek fotoğrafı yan çevirir mi?", "Pikseller döndürülmeden yön etiketi silinirse evet, fotoğraf ham hâliyle yan görünür. Bu yüzden önce kalıcı döndürme yapın, ardından konum ve diğer meta verileri temizleyin."]
  ],
  tools: ["resim-dondur", "pdf-dondur", "resim-kirp", "exif-temizle"],
  related: ["fotograftaki-konum-bilgisi-nasil-silinir", "pdf-sayfa-silme-ve-dondurme", "jpg-png-svg-farki"],
  sources: [
    ["CIPA – Exif standardı (DC-008)", "https://www.cipa.jp/"]
  ]
};
