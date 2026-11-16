export default {
  slug: "bulanik-fotograf-nasil-netlestirilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Bulanık Fotoğraf Nasıl Netleştirilir? Keskinleştirme, Büyütme ve Sınırları",
  pageTitle: "Bulanık Fotoğraf Nasıl Netleştirilir? Keskinleştirme ve Sınırları",
  description: "Hafif bulanık fotoğraf keskinleştirmeyle (unsharp mask) daha net görünür ama kaybolan ayrıntı geri gelmez. Bulanıklık türleri, büyütme ve aşırı keskinleştirme.",
  keywords: ["bulanık fotoğraf netleştirme", "fotoğraf netleştirme", "resim keskinleştirme", "düşük çözünürlüklü fotoğraf büyütme", "eski fotoğraf netleştirme", "fotoğraf neden bulanık çıkar", "unsharp mask nedir", "yapay zeka ile netleştirme"],
  lead: "Hafif bulanık bir fotoğraf, kenarlardaki ton farkını artıran <strong>keskinleştirme</strong> (unsharp mask) ile belirgin biçimde daha net görünür; ancak çekim anında kaydedilmemiş ayrıntı hiçbir yöntemle gerçek olarak geri getirilemez. Keskinleştirme var olan kenarları vurgular, yeni bilgi üretmez. Bu sayfada bulanıklığın türlerini, keskinleştirmenin nasıl çalıştığını, yarıçap-miktar-eşik ayarlarını, küçük fotoğrafı büyütmenin gerçekçi sınırlarını, aşırı keskinleştirmenin bıraktığı kusurları ve telefon ile eski taranmış fotoğraflar için pratik önerileri bulacaksınız.",
  kisaCevap: [
    "Keskinleştirme, kenarların iki yanındaki açık-koyu farkını büyüterek algılanan netliği artırır; kayıp ayrıntıyı geri getirmez.",
    "Unsharp mask üç ayarla çalışır: yarıçap (kenarın genişliği), miktar (kontrast artışı) ve eşik (hangi farkların dokunulmadan kalacağı).",
    "Hafif odak kaçması ve yumuşak lens bulanıklığı iyi düzelir; güçlü hareket bulanıklığı ve ağır odak hatası düzelmez.",
    "Büyütme (2x, 4x) piksel sayısını artırır ama ayrıntı eklemez; Lanczos gibi yöntemler yalnızca daha yumuşak ara değerler üretir.",
    "Aşırı keskinleştirme kenarlarda beyaz hale, gürültü artışı ve yapay doku oluşturur; ekranı %100 büyütmede kontrol edin.",
    "Yapay zekâ tabanlı \"netleştirme\" ayrıntıyı tahmin ederek üretir; yüz, yazı ve plaka gibi kanıt niteliğinde ayrıntılar için güvenilir değildir."
  ],
  figure: {
    alt: "Bir kenarın parlaklık profili: bulanık kenarda yumuşak geçiş, keskinleştirilmiş kenarda daha dik geçiş ve iki yanında hafif aşma, aşırı keskinleştirmede belirgin beyaz ve siyah hale.",
    caption: "Keskinleştirme, kenarın geçişini dikleştirir ve iki yanına küçük bir açık-koyu aşma ekler; göz bunu netlik olarak algılar. Miktar fazla olunca aşma büyür ve kenarlarda hale oluşur.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir kenarın parlaklık profili</text>
  <g>
    <rect x="20" y="50" width="220" height="250" rx="8" class="sf sb"/>
    <text x="130" y="76" class="b mid">Bulanık</text>
    <polyline points="40,250 90,250 110,240 130,170 150,110 170,100 220,100" class="sp sw" fill="none"/>
    <text x="130" y="285" class="sm mid mu">yumuşak, geniş geçiş</text>
  </g>
  <g>
    <rect x="250" y="50" width="220" height="250" rx="8" class="ps"/>
    <text x="360" y="76" class="b mid">Keskinleştirilmiş</text>
    <polyline points="270,250 330,250 345,262 355,180 365,92 380,100 450,100" class="sok sw" fill="none"/>
    <text x="360" y="285" class="sm mid">dik geçiş, küçük aşma</text>
  </g>
  <g>
    <rect x="480" y="50" width="220" height="250" rx="8" class="dgs"/>
    <text x="590" y="76" class="b mid">Aşırı</text>
    <polyline points="500,250 555,250 570,286 580,180 590,66 605,100 680,100" class="sdg sw" fill="none"/>
    <text x="590" y="285" class="sm mid dg">belirgin hale (artefakt)</text>
  </g>
  <line x1="20" y1="320" x2="700" y2="320" class="sb dash" fill="none"/>
  <text x="20" y="348" class="b">Örnek ayar (telefon fotoğrafı, ekranda paylaşım)</text>
  <text x="20" y="374" class="sm t2">Yarıçap 1,0 px · Miktar %80 · Eşik 3 · Önce gürültü azalt, sonra keskinleştir, en son boyutlandır.</text>
</svg>`
  },
  sections: [
    {
      h: "Bulanık fotoğraf gerçekten netleştirilebilir mi?",
      p: [
        "Kısa cevap: <strong>kısmen</strong>. Bir fotoğraf çekildiği anda sensöre düşen ışık kaydedilir; bulanıklık, bir noktadan gelen ışığın birkaç piksele yayılması demektir. Bu yayılma hafifse, piksellerin arasındaki küçük farkları büyüterek kenarları yeniden belirgin hâle getirebilirsiniz. Yayılma güçlüyse, ayrıntılar birbirine karışmış ve ayrıştırılamaz hâle gelmiştir.",
        "Bu nedenle netleştirme beklentisini doğru kurmak önemlidir. Biraz yumuşak çıkmış bir portre, akşam ışığında hafif titremiş bir manzara ya da taranmış eski bir fotoğraf belirgin biçimde iyileşebilir. Ancak 10 metreden çekilmiş, birkaç piksellik bir plaka ya da yüz okunur hâle getirilemez. Filmlerdeki \"yakınlaştır, netleştir\" sahneleri gerçeği yansıtmaz.",
        "Yapay zekâ tabanlı yöntemler de bu kuralı değiştirmez; yalnızca eksik ayrıntıyı benzer görüntülerden öğrendiği kalıplarla <em>tahmin ederek</em> doldurur. Sonuç göze hoş gelebilir ama orada gerçekten var olan ayrıntı olmayabilir. Bir yüzün ya da yazının tahmini sürümü kanıt ya da kimlik tespiti için kullanılmamalıdır."
      ]
    },
    {
      h: "Fotoğraflar neden bulanık çıkar? Bulanıklık türleri",
      p: [
        "Düzeltme yöntemini seçmeden önce bulanıklığın kaynağını anlamak gerekir. Her türün görünüşü ve düzelme şansı farklıdır."
      ],
      table: {
        head: ["Tür", "Nasıl tanınır?", "Nedeni", "Düzelme şansı"],
        rows: [
          ["Odak kaçması", "Bir bölge net, asıl konu yumuşak", "Otomatik odak yanlış noktaya kilitlendi", "Hafifse iyi, belirginse düşük"],
          ["Hareket (titreme) bulanıklığı", "Tüm kare tek yönde izli", "Enstantane yavaş, el sallandı", "Düşük; yön izleri kalır"],
          ["Konu hareketi", "Arka plan net, hareket eden kişi izli", "Konu çekim sırasında hareket etti", "Çok düşük"],
          ["Düşük çözünürlük", "Bloklu, pikselli görünüm", "Fotoğraf küçültülmüş ya da kırpılmış", "Büyütme yumuşatır, ayrıntı eklemez"],
          ["Sıkıştırma", "Kenarlarda kare kare bozulma", "Mesajlaşma ve sosyal medya sıkıştırması", "Düşük; orijinal dosyayı bulun"],
          ["Kirli lens / buğu", "Tüm karede puslu, parlak ışıklarda hale", "Lens camında parmak izi, yağ", "Orta; kontrast artışı yardımcı olur"]
        ]
      },
      after: [
        "Hareket bulanıklığı ile odak kaçmasını ayırmanın kolay yolu parlak noktalara bakmaktır: odak kaçmasında nokta yuvarlak bir lekeye dönüşür, hareket bulanıklığında ise bir çizgi ya da iz bırakır. Hareket izi tek yönlü olduğu için sıradan keskinleştirme onu \"çift görüntüye\" çevirebilir. Enstantane ve ışık ilişkisini merak ediyorsanız [[bilgi:diyafram-enstantane-iso-nedir|diyafram, enstantane ve ISO rehberine]] bakın."
      ]
    },
    {
      h: "Keskinleştirme (unsharp mask) nasıl çalışır?",
      p: [
        "Adının aksine \"unsharp mask\" görüntüyü netleştiren klasik yöntemdir. Adını karanlık oda döneminden alır: fotoğrafçılar negatifin bulanık bir kopyasını maske olarak kullanarak kenar kontrastını artırırdı. Dijital karşılığı üç adımda çalışır."
      ],
      formula: "1) Bulanık kopya = görüntünün yarıçap kadar bulanıklaştırılmış hâli\n2) Ayrıntı = orijinal − bulanık kopya\n3) Sonuç = orijinal + miktar × ayrıntı   (ayrıntı < eşik ise dokunulmaz)",
      table: {
        head: ["Ayar", "Ne yapar?", "Tipik başlangıç"],
        rows: [
          ["Yarıçap", "Vurgulanacak kenarın kaç piksel genişlikte olduğunu belirler", "0,5–1,5 px (ekran), 1,5–2,5 px (baskı)"],
          ["Miktar", "Kenar kontrastının ne kadar artırılacağını belirler", "%50–%120"],
          ["Eşik", "Küçük ton farklarını (cilt, gökyüzü, gürültü) korur", "2–6 seviye"]
        ]
      },
      after: [
        "Örnek: 12 megapiksellik bir telefon fotoğrafını ekranda paylaşacaksanız yarıçapı 1,0 piksel, miktarı %80, eşiği 3 yaparak başlayın. Cilt pürüzlü görünmeye başlarsa eşiği 5–6'ya çıkarın; kenarlarda beyaz çizgi oluşursa miktarı düşürün. [[arac:fotograf-netlestir|Fotoğraf Netleştirme aracı]] bu üç ayarı önce/sonra karşılaştırmasıyla sunar ve yapay zekâ kullanmaz; yaptığı her değişiklik matematiksel olarak açıklanabilir."
      ]
    },
    {
      h: "Küçük fotoğraf kalite kaybetmeden büyütülebilir mi?",
      p: [
        "Bir fotoğrafı büyütmek piksel sayısını artırır; 1.000 × 750 piksellik bir görüntüyü 2 kat büyütürseniz 2.000 × 1.500 piksel elde edersiniz. Ancak yeni piksellerin değeri, komşu piksellerden <strong>enterpolasyon</strong> ile hesaplanır. Bu hesap ne kadar iyi olursa olsun ilk fotoğrafta bulunmayan bir ayrıntıyı üretemez.",
        "Enterpolasyon yöntemleri arasında yine de fark vardır. En yakın komşu yöntemi pikselleri kopyalar ve basamaklı görüntü verir. Çift doğrusal yöntem yumuşatır ama bulanıklaştırır. <strong>Lanczos</strong> gibi gelişmiş yöntemler kenarları daha iyi korur; bu yüzden büyütmede tercih edilir. Büyütmeden sonra hafif bir keskinleştirme, yumuşayan kenarları toparlar."
      ],
      table: {
        head: ["Başlangıç", "Büyütme", "Sonuç piksel", "10 × 15 cm baskıda dpi", "Değerlendirme"],
        rows: [
          ["800 × 600", "1x", "800 × 600", "yaklaşık 135", "Baskı için zayıf"],
          ["800 × 600", "2x", "1.600 × 1.200", "yaklaşık 270", "Kabul edilebilir, ayrıntı aynı"],
          ["800 × 600", "4x", "3.200 × 2.400", "yaklaşık 540", "Gereksiz; dosya büyür, ayrıntı artmaz"]
        ],
        caption: "dpi değerleri uzun kenar (15 cm ≈ 5,9 inç) üzerinden yaklaşık hesaplanmıştır: 800 ÷ 5,9 ≈ 135."
      },
      after: [
        "Kural olarak 2 kattan fazla büyütme nadiren anlamlıdır. Baskı çözünürlüğü ile piksel ilişkisini [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük rehberinde]] ayrıntılı bulabilirsiniz. Belirli bir ölçüye getirmek için [[arac:resim-boyutlandir|Resim Boyutlandırma aracı]] daha uygundur."
      ]
    },
    {
      h: "Aşırı keskinleştirme hangi kusurlara yol açar?",
      ul: [
        "<strong>Hale (halo):</strong> Koyu nesnelerin etrafında beyaz, açık nesnelerin etrafında koyu çizgi oluşur. Özellikle gökyüzüne karşı binalarda ve saç tellerinde belirgindir.",
        "<strong>Gürültü artışı:</strong> Düşük ışıkta çekilmiş fotoğraflardaki renkli kumlanma, keskinleştirmeyle birlikte büyür. Önce gürültü azaltma, sonra keskinleştirme yapılmalıdır.",
        "<strong>Yapay doku:</strong> Cilt, duvar ve gökyüzü gibi düz yüzeyler pürüzlü, \"kum kağıdı\" gibi görünür. Eşik değerini artırmak bunu önler.",
        "<strong>Sıkıştırma bloklarının belirginleşmesi:</strong> Defalarca paylaşılmış JPEG'lerde 8 × 8 piksellik kareler keskinleştirmeyle görünür hâle gelir.",
        "<strong>Renk kayması:</strong> Kenarlarda mor ya da yeşil saçaklar (kromatik sapma) vurgulanır."
      ],
      after: [
        "Bu kusurları yakalamanın en güvenilir yolu sonucu %100 büyütmede, yani bir görüntü pikselinin bir ekran pikseline denk geldiği ölçekte incelemektir. Küçültülmüş önizlemede iyi görünen bir ayar, tam boyutta kabul edilemez olabilir."
      ]
    },
    {
      h: "Eski taranmış fotoğraflar nasıl iyileştirilir?",
      p: [
        "Aile albümlerinden taranan fotoğraflar genellikle soluk, sararmış, tozlu ve hafif yumuşaktır. Burada en büyük kazanç keskinleştirmeden değil, doğru taramadan gelir. Kâğıt fotoğrafı en az 600 dpi'da, mümkünse kayıpsız biçimde (PNG ya da TIFF) tarayın; daha sonra küçültmek her zaman mümkündür, eksik taramayı sonradan telafi etmek mümkün değildir."
      ],
      ol: [
        "Tarayıcı camını ve fotoğrafı yumuşak, tüy bırakmayan bir bezle temizleyin.",
        "600 dpi'da tarayın ve orijinali ayrı bir klasörde saklayın; düzenlemeleri kopyada yapın.",
        "Otomatik kontrast ya da seviye ayarıyla solukluğu giderin.",
        "Gürültü azaltmayı düşük düzeyde uygulayın; kâğıt dokusunu tamamen silmeyin.",
        "Yarıçapı 1,5–2 piksel, miktarı %60–90 arasında tutarak keskinleştirin.",
        "Sepya ya da siyah-beyaz görünüm isterseniz [[arac:fotograf-filtre|Fotoğraf Filtre aracı]] ile tonlamayı en sonda yapın."
      ],
      after: [
        "Paylaşmadan önce dosyayı uygun biçimde kaydedin; fotoğraflar için JPEG, metin ya da çizim içeren görüntüler için PNG daha uygundur. Ayrıntı için [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Telefon fotoğrafını netleştirirken nelere dikkat edilmeli?",
      p: [
        "Telefonlar çekim anında zaten bir miktar keskinleştirme ve gürültü azaltma uygular. Bu yüzden telefon fotoğrafına yeniden güçlü keskinleştirme uygulamak hızla haleye yol açar. Hafif ayarlarla başlayın ve sonucu orijinalle yan yana karşılaştırın.",
        "Mesajlaşma uygulamalarından gelen fotoğraflar boyut küçültme ve sıkıştırmadan geçmiştir. Mümkünse fotoğrafı çeken kişiden orijinal dosyayı \"belge olarak\" ya da bulut bağlantısıyla isteyin; bu, her türlü netleştirmeden daha büyük fark yaratır.",
        "İşlem sırası da önemlidir: önce kırpın ve döndürün, sonra gürültüyü azaltın, ardından keskinleştirin, en son hedef boyuta getirin. Küçültme işleminden sonra çok hafif bir keskinleştirme daha yapmak, ekrandaki son görüntüyü canlandırır. Fotoğrafı paylaşmadan önce içindeki konum bilgisini silmek isterseniz [[bilgi:fotograftaki-konum-bilgisi-nasil-silinir|konum bilgisi rehberine]] göz atın."
      ]
    },
    {
      h: "Bir dahaki çekimde bulanıklığı önlemek",
      ul: [
        "Lensi her çekimden önce temiz bir bezle silin; cebe konan telefonlarda yağ tabakası en sık görülen netlik kaybı nedenidir.",
        "Ekranda konuya dokunarak odağı kilitleyin ve odak işaretinin doğru yerde olduğundan emin olun.",
        "Loş ortamda telefonu iki elle tutun, dirseklerinizi gövdenize yaslayın ya da bir yüzeye dayayın.",
        "Hareketli konularda çekim modunu ya da seri çekimi kullanın; seriden en net kareyi seçin.",
        "Dijital yakınlaştırma yerine konuya yaklaşın; dijital yakınlaştırma aslında kırpıp büyütmektir.",
        "Sonradan kırpacağınızı biliyorsanız en yüksek çözünürlükte çekin."
      ]
    }
  ],
  faq: [
    ["Bulanık fotoğraf gerçekten netleştirilebilir mi?", "Hafif bulanıklık keskinleştirmeyle belirgin şekilde iyileşir, çünkü kenarlardaki küçük ton farkları büyütülür. Güçlü bulanıklıkta ise ayrıntılar birbirine karışmıştır ve hiçbir yöntem kaydedilmemiş bilgiyi gerçek olarak geri getiremez."],
    ["Keskinleştirme (sharpen) nasıl çalışır?", "Keskinleştirme, görüntünün bulanık bir kopyasını orijinalden çıkararak kenar ayrıntısını bulur ve bu ayrıntıyı belirli bir miktarla orijinale geri ekler. Sonuçta kenarların iki yanındaki açık-koyu farkı artar ve göz bunu netlik olarak algılar."],
    ["Hareket bulanıklığı ile odak kaçması farkı nedir?", "Odak kaçmasında parlak noktalar yuvarlak lekeye dönüşür ve karenin bir bölümü net kalabilir. Hareket bulanıklığında ise tüm kare ya da hareket eden konu tek yönde iz bırakır; bu tür bulanıklık keskinleştirmeyle çok daha zor düzelir."],
    ["Küçük fotoğraf kalite kaybetmeden büyütülebilir mi?", "Büyütme piksel sayısını artırır ama yeni ayrıntı eklemez; yeni pikseller komşu piksellerden hesaplanır. Lanczos gibi yöntemler kenarları daha iyi korur, ancak iki kattan fazla büyütme genellikle gözle görülür bir kazanç sağlamaz."],
    ["Fotoğraflar neden bulanık çıkar?", "En sık nedenler kirli lens, yanlış noktaya kilitlenen odak, düşük ışıkta yavaş enstantane nedeniyle el titremesi, konunun hareket etmesi, dijital yakınlaştırma ve mesajlaşma uygulamalarının yaptığı sıkıştırmadır."],
    ["Aşırı keskinleştirme hangi kusurlara yol açar?", "Kenarlarda beyaz ya da koyu hale, gürültünün büyümesi, ciltte ve gökyüzünde pürüzlü yapay doku ve sıkıştırma bloklarının görünür hâle gelmesi en sık görülen kusurlardır. Sonucu yüzde yüz büyütmede kontrol etmek bunları yakalamanızı sağlar."],
    ["Eski taranmış fotoğraflar nasıl iyileştirilir?", "Fotoğrafı en az 600 dpi'da kayıpsız biçimde tarayın, kontrastı düzeltin, hafif gürültü azaltma uygulayın ve 1,5–2 piksel yarıçapla ölçülü keskinleştirme yapın. Orijinal taramayı her zaman ayrı bir kopya olarak saklayın."],
    ["Telefon fotoğrafını netleştirirken nelere dikkat edilir?", "Telefonlar çekimde zaten keskinleştirme yaptığı için hafif ayarlarla başlayın. Mümkünse sıkıştırılmamış orijinal dosyayı kullanın; işlem sırasını kırpma, gürültü azaltma, keskinleştirme ve en son boyutlandırma olarak koruyun."],
    ["Yapay zekâ ile netleştirme güvenilir mi?", "Yapay zekâ eksik ayrıntıyı öğrendiği kalıplara göre tahmin ederek üretir; sonuç estetik olarak güzel görünebilir ama gerçekte orada olmayan ayrıntı içerebilir. Yüz, plaka, yazı gibi kanıt değeri taşıyan ayrıntılarda bu tahminlere güvenilmemelidir."]
  ],
  tools: ["fotograf-netlestir", "resim-boyutlandir", "fotograf-filtre"],
  related: ["dpi-ve-cozunurluk-nedir", "diyafram-enstantane-iso-nedir", "jpg-png-svg-farki"]
};
