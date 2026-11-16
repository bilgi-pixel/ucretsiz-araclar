export default {
  slug: "pasta-grafigi-nasil-yapilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Pasta Grafiği Nasıl Yapılır? Yüzdeli Daire Grafiği ve Sütun Grafik Çizme",
  pageTitle: "Pasta Grafiği Nasıl Yapılır? Daire Grafiği Açı Hesabı",
  description: "Pasta (daire) grafiği nasıl yapılır? Dilim açısı ve yüzde hesabı, çözümlü ödev örneği, pasta mı sütun grafik mi, yüzdeler 100 etmezse ne yapılır, CSV verisinden grafik.",
  keywords: ["pasta grafiği nasıl yapılır", "daire grafiği çizme", "sütun grafik oluşturma", "grafik oluşturma online", "yüzdeli pasta grafiği", "daire grafiği açı hesaplama", "veriden grafik çizme", "excel olmadan grafik"],
  lead: "Pasta grafiği yapmak için <strong>her kategorinin değerini toplama bölüp yüzdesini bulur, bu oranı 360° ile çarparak dilim açısını hesaplarsınız</strong>. 40 öğrencinin 14'ü futbolu seçtiyse futbolun payı 14 ÷ 40 = %35, dilim açısı 0,35 × 360° = 126° olur. Pasta grafiği bir bütünün parçalarını göstermek için idealdir; kategoriler arasında karşılaştırma ya da zaman içindeki değişim için sütun veya çizgi grafik daha uygundur. Bu yazıda elle çizim adımlarını, açı hesabını, grafik türü seçimini ve verinizden çevrim içi grafik oluşturmayı anlatıyoruz.",
  kisaCevap: [
    "Yüzde = kategori değeri ÷ toplam × 100; dilim açısı = kategori değeri ÷ toplam × 360°.",
    "Yüzde biliniyorsa açı = yüzde × 3,6°; %25'lik dilim 90°, %10'luk dilim 36°'dir.",
    "Tüm dilimlerin açıları toplamı 360°, yüzdeleri toplamı %100 olmalıdır.",
    "Pasta grafiği bir bütünün parçalarını gösterir; dilim sayısını 5–6 ile sınırlamak okunabilirliği artırır.",
    "Kategorileri karşılaştırmak için sütun grafik, zaman içindeki değişim için çizgi grafik daha uygundur.",
    "Yuvarlama nedeniyle yüzdeler 99 ya da 101 ederse en büyük küsuratlı dilim düzeltilir ya da not düşülür."
  ],
  figure: {
    alt: "40 öğrencinin sevdiği spor dalları pasta grafiği: futbol yüzde 35 (126 derece), basketbol yüzde 25 (90 derece), voleybol yüzde 20 (72 derece), yüzme yüzde 15 (54 derece), diğer yüzde 5 (18 derece).",
    caption: "Her dilimin açısı, öğrenci sayısının 40'a bölünüp 360° ile çarpılmasıyla bulunur. Açıların toplamı 126 + 90 + 72 + 54 + 18 = 360° eder.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">40 öğrencinin sevdiği spor</text>
  <path d="M190 215 L190.0 75.0 A140 140 0 0 1 303.3 297.3 Z" class="p"/>
  <path d="M190 215 L303.3 297.3 A140 140 0 0 1 107.7 328.3 Z" class="ps"/>
  <path d="M190 215 L107.7 328.3 A140 140 0 0 1 56.9 171.7 Z" class="oks"/>
  <path d="M190 215 L56.9 171.7 A140 140 0 0 1 146.7 81.9 Z" class="sf sb"/>
  <path d="M190 215 L146.7 81.9 A140 140 0 0 1 190.0 75.0 Z" class="dgs"/>
  <text x="267" y="182" class="b mid sf">%35</text>
  <text x="204" y="306" class="b mid">%25</text>
  <text x="107" y="248" class="b mid">%20</text>
  <text x="129" y="160" class="b mid">%15</text>
  <text x="178" y="64" class="sm mid b">%5</text>
  <g>
    <rect x="390" y="66" width="310" height="300" rx="12" class="sf sb"/>
    <text x="410" y="94" class="b">Kategori</text><text x="560" y="94" class="b end">Kişi</text><text x="620" y="94" class="b end">%</text><text x="684" y="94" class="b end">Açı</text>
    <line x1="410" y1="106" x2="684" y2="106" class="sb" fill="none"/>
    <rect x="410" y="120" width="14" height="14" class="p"/><text x="432" y="132" class="sm">Futbol</text><text x="560" y="132" class="sm end">14</text><text x="620" y="132" class="sm end">35</text><text x="684" y="132" class="sm end b">126°</text>
    <rect x="410" y="152" width="14" height="14" class="ps"/><text x="432" y="164" class="sm">Basketbol</text><text x="560" y="164" class="sm end">10</text><text x="620" y="164" class="sm end">25</text><text x="684" y="164" class="sm end b">90°</text>
    <rect x="410" y="184" width="14" height="14" class="oks"/><text x="432" y="196" class="sm">Voleybol</text><text x="560" y="196" class="sm end">8</text><text x="620" y="196" class="sm end">20</text><text x="684" y="196" class="sm end b">72°</text>
    <rect x="410" y="216" width="14" height="14" class="sf sb"/><text x="432" y="228" class="sm">Yüzme</text><text x="560" y="228" class="sm end">6</text><text x="620" y="228" class="sm end">15</text><text x="684" y="228" class="sm end b">54°</text>
    <rect x="410" y="248" width="14" height="14" class="dgs"/><text x="432" y="260" class="sm">Diğer</text><text x="560" y="260" class="sm end">2</text><text x="620" y="260" class="sm end">5</text><text x="684" y="260" class="sm end b">18°</text>
    <line x1="410" y1="274" x2="684" y2="274" class="sb" fill="none"/>
    <text x="432" y="294" class="sm b">Toplam</text><text x="560" y="294" class="sm end b">40</text><text x="620" y="294" class="sm end b">100</text><text x="684" y="294" class="sm end b">360°</text>
    <text x="410" y="326" class="sm p b">Açı = kişi ÷ 40 × 360°</text>
    <text x="410" y="348" class="sm t2">Futbol: 14 ÷ 40 × 360 = 126°</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Pasta grafiği nedir, ne zaman kullanılır?",
      p: [
        "Pasta grafiği (daire grafiği), bir bütünün parçalara nasıl bölündüğünü gösteren dairesel bir grafiktir. Dairenin tamamı toplamı, yani %100'ü temsil eder; her dilim bir kategorinin bu bütün içindeki payıdır. Bir sınıftaki öğrencilerin tercihleri, bir aile bütçesinin harcama kalemleri ya da bir seçimde oyların dağılımı pasta grafiğiyle anlatılabilir.",
        "Pasta grafiği en iyi şu üç koşul bir aradayken çalışır: veriler bir bütünün parçalarıdır ve toplamları anlamlıdır, kategori sayısı azdır (en fazla 5–6), dilimler arasında belirgin büyüklük farkları vardır. Birbirine çok yakın değerler (%22 ile %24 gibi) dilimlerde gözle ayırt edilemez; bu durumda sütun grafik çok daha net bir karşılaştırma sağlar."
      ]
    },
    {
      h: "Daire grafiğinde dilim açısı nasıl hesaplanır?",
      p: [
        "Bir dairenin merkezindeki tam açı 360°'dir. Her dilimin açısı, kategorinin toplamdaki payı kadar bu 360°'den pay alır. Önce yüzdeyi, sonra açıyı bulmak hem kontrolü kolaylaştırır hem de grafiğe yüzde etiketi yazmanızı sağlar."
      ],
      formula: "Yüzde (%) = kategori değeri ÷ toplam × 100\nDilim açısı (°) = kategori değeri ÷ toplam × 360\nYüzde biliniyorsa: açı = yüzde × 3,6\nKontrol: açılar toplamı = 360°, yüzdeler toplamı = %100",
      table: {
        head: ["Yüzde", "Açı", "Yüzde", "Açı"],
        rows: [
          ["%5", "18°", "%40", "144°"],
          ["%10", "36°", "%50", "180°"],
          ["%12,5", "45°", "%60", "216°"],
          ["%20", "72°", "%75", "270°"],
          ["%25", "90°", "%100", "360°"]
        ],
        caption: "Her %1'lik pay 3,6° eder. %25'lik dilim tam bir dik açı (90°), %50'lik dilim yarım daire (180°) oluşturur."
      },
      after: [
        "Yüzde hesabını hızlıca yapmak için [[arac:yuzde-hesapla|Yüzde Hesaplama]] aracını kullanabilirsiniz. Açı ile oran arasındaki ilişki bir doğru orantıdır; bu mantığı [[bilgi:oran-oranti-nasil-cozulur|oran-orantı]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Pasta grafiği nasıl yapılır? Çözümlü ödev örneği",
      p: [
        "Bir sınıfta 40 öğrenciye en sevdikleri spor sorulmuş ve şu sonuçlar alınmış: futbol 14, basketbol 10, voleybol 8, yüzme 6, diğer 2. Pergel, cetvel ve iletki ile elle bir daire grafiği çizelim."
      ],
      ol: [
        "Toplamı bulun: 14 + 10 + 8 + 6 + 2 = 40 öğrenci.",
        "Yüzdeleri hesaplayın: futbol 14 ÷ 40 = %35, basketbol %25, voleybol %20, yüzme %15, diğer %5. Toplam %100 olmalı.",
        "Açıları hesaplayın: futbol 0,35 × 360 = 126°, basketbol 90°, voleybol 72°, yüzme 54°, diğer 18°. Toplam 360° olmalı.",
        "Pergelle bir daire çizin ve merkezden saat 12 yönüne doğru bir yarıçap çizgisi çekin; bu başlangıç çizgisidir.",
        "İletkiyi merkeze yerleştirip başlangıç çizgisinden 126° ölçün ve ikinci yarıçapı çizin; bu futbol dilimidir.",
        "Yeni çizgiden başlayarak sırasıyla 90°, 72°, 54° ölçün; kalan dilim 18° olmalıdır. Küçük bir fark varsa ölçümlerinizi kontrol edin.",
        "Her dilimi farklı renk ya da tarama ile boyayın, üzerine kategori adını ve yüzdesini yazın, grafiğe bir başlık ekleyin."
      ],
      after: [
        "Dilimleri büyükten küçüğe, saat yönünde sıralamak grafiği okumayı kolaylaştırır. \"Diğer\" gibi toplu kategorileri en sona koymak yaygın bir uygulamadır. Ödevlerde verinin kaynağını (örneğin \"7-B sınıfı anketi, 40 öğrenci\") grafiğin altına yazmak iyi bir alışkanlıktır."
      ]
    },
    {
      h: "Sütun grafiği ile pasta grafiği farkı nedir?",
      p: [
        "İki grafik aynı veriyi farklı sorulara cevap verecek biçimde gösterir. Pasta grafiği \"bütünün ne kadarı?\" sorusunu, sütun grafik ise \"hangisi daha büyük, ne kadar fark var?\" sorusunu daha iyi cevaplar. İnsan gözü uzunlukları açılardan çok daha doğru karşılaştırır; bu yüzden kategoriler arasında kesin karşılaştırma gerektiğinde sütun grafik tercih edilir."
      ],
      table: {
        head: ["Ölçüt", "Pasta (daire) grafiği", "Sütun grafiği", "Çizgi grafiği"],
        rows: [
          ["En iyi kullanım", "Bütünün parçaları", "Kategorileri karşılaştırma", "Zaman içindeki değişim"],
          ["Kategori sayısı", "En fazla 5–6", "Çok sayıda olabilir", "Çok sayıda nokta"],
          ["Toplamın anlamı", "Zorunlu (%100)", "Gerekmez", "Gerekmez"],
          ["Negatif değer", "Gösterilemez", "Gösterilebilir", "Gösterilebilir"],
          ["Örnek", "Bütçe dağılımı", "Şehirlere göre satış", "Aylık sıcaklık"]
        ]
      },
      after: [
        "Bir ödevde iki grafiği yan yana kullanmak da mümkündür: pasta grafiği genel dağılımı, sütun grafik ayrıntılı karşılaştırmayı gösterir. Verinin dağılımını ve uç değerleri incelemek için ise [[bilgi:ceyreklikler-ve-kutu-grafigi|kutu grafiği]] gibi istatistiksel grafikler kullanılır; ortalama ve medyan gibi özet ölçüler [[bilgi:ortalama-medyan-mod-nedir|ortalama, medyan, mod]] yazısında anlatılır."
      ]
    },
    {
      h: "Yüzdeler toplamı 100 etmezse ne yapılmalı?",
      p: [
        "Yüzdeleri tam sayıya yuvarladığınızda toplam bazen %99 ya da %101 çıkar. Örneğin 3 eşit kategori %33,33'er paya sahiptir; tam sayıya yuvarlanınca %33 + %33 + %33 = %99 eder. Bu bir hesap hatası değil, yuvarlamanın doğal sonucudur. Çözüm için üç yaygın yöntem vardır:"
      ],
      ul: [
        "<strong>Bir ondalık basamak kullanmak:</strong> %33,3 + %33,3 + %33,3 = %99,9; fark çok küçülür ve genellikle kabul edilir.",
        "<strong>En büyük küsurat yöntemi:</strong> Tüm yüzdeleri aşağı yuvarlayın, eksik kalan puanları küsuratı en büyük olan kategorilere birer birer ekleyin; toplam tam %100 olur.",
        "<strong>Not düşmek:</strong> Grafiğin altına \"Yuvarlama nedeniyle toplam %100 etmeyebilir\" yazmak, resmî raporlarda da kullanılan dürüst bir yöntemdir."
      ],
      after: [
        "Toplam belirgin biçimde 100'den farklıysa (örneğin %85 ya da %130) sorun yuvarlama değildir. Ya bir kategori eksiktir ya da katılımcılar birden fazla seçenek işaretleyebilmiştir. Çoklu seçim sorularında toplam %100'ü aşar ve bu veriler pasta grafiğine uygun değildir; sütun grafik kullanın."
      ]
    },
    {
      h: "Excel olmadan grafik nasıl oluşturulur?",
      p: [
        "Elektronik tablo programı kurmadan da tarayıcıda grafik oluşturabilirsiniz. [[arac:grafik-olustur|Grafik Oluşturucu]] aracına kategorileri ve değerleri yazın; sütun, yatay çubuk, çizgi, pasta, halka ya da alan grafiği seçin. Araç yüzdeleri otomatik hesaplar, renkleri ve etiketleri ayarlamanıza izin verir. Sonucu PNG (isteğe bağlı şeffaf zeminli) ya da SVG olarak indirebilirsiniz.",
        "Verileriniz tarayıcınızda işlenir, hiçbir sunucuya gönderilmez ve kayıt gerekmez. Bu, özellikle şirket içi satış rakamları ya da kişisel bütçe gibi paylaşmak istemediğiniz veriler için önemlidir."
      ],
      ol: [
        "Grafik türünü seçin: bütünün parçaları için pasta ya da halka, karşılaştırma için sütun.",
        "Verileri girin: her satıra bir kategori ve değer yazın ya da tablodan yapıştırın.",
        "Başlık, eksen adları ve birim ekleyin (örneğin \"Öğrenci sayısı\").",
        "Etiketlerde yüzdeyi, değeri ya da ikisini birden gösterin.",
        "Grafiği indirin ve ödevinize, sunumunuza ya da raporunuza ekleyin."
      ]
    },
    {
      h: "CSV verisinden grafik çizilebilir mi?",
      p: [
        "Evet. Verileriniz bir CSV dosyasında ya da tabloda duruyorsa, kategori ve değer sütunlarını kopyalayıp grafik aracına yapıştırabilirsiniz. CSV (virgülle ayrılmış değerler), her satırın bir kayıt, her virgülün ya da noktalı virgülün bir sütun ayırıcı olduğu düz metin biçimidir. Türkçe bölgesel ayarlarda ondalık ayırıcı virgül olduğu için sütun ayırıcı olarak genellikle noktalı virgül kullanılır; dosyayı açarken bu farka dikkat edin.",
        "CSV dosyasını önce tabloya çevirip incelemek isterseniz [[arac:csv-excel|CSV Excel Dönüştürücü]] işinize yarar. Çok satırlı ham veriden pasta grafiği yapmadan önce kategorilere göre toplamları almanız gerekir; örneğin 500 satış kaydını önce ürün grubuna göre toplayıp sonra 5 dilimlik bir grafik çizersiniz."
      ]
    },
    {
      h: "Grafik ödevlere ve sunumlara nasıl eklenir?",
      p: [
        "İndirdiğiniz grafiği belge ya da sunum programına görsel olarak ekleyebilirsiniz. Hangi dosya biçimini seçeceğiniz kullanıma bağlıdır: PNG, her programda açılan ve şeffaf zemini destekleyen yaygın bir biçimdir; SVG ise vektörel olduğu için büyütüldüğünde bulanıklaşmaz ve baskıda en keskin sonucu verir. Biçimler arasındaki farkı [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısında bulabilirsiniz.",
        "Sunumlarda grafiği slaytın tamamına yakın büyüklükte kullanın ve üzerinde yalnızca en önemli 3–5 etiketi bırakın. Ödevlerde ise grafiğin altına bir numara ve açıklama (\"Grafik 1: Sınıfımızda en sevilen sporlar\") ekleyin ve metinde bu grafiğe atıf yapın."
      ],
      ul: [
        "<strong>Sık yapılan hata:</strong> Çok fazla dilim kullanmak; 10 dilimli bir pasta okunamaz, küçükleri \"Diğer\" altında toplayın.",
        "<strong>Sık yapılan hata:</strong> Üç boyutlu pasta kullanmak; perspektif öndeki dilimleri olduğundan büyük gösterir.",
        "<strong>Sık yapılan hata:</strong> Birbirine yakın renkler seçmek; yan yana dilimler ayırt edilemez, renk körlüğü olan okuyucular için etiket de ekleyin.",
        "<strong>Sık yapılan hata:</strong> Yüzde yerine yalnızca açıyı yazmak; okuyucu için yüzde çok daha anlamlıdır."
      ]
    }
  ],
  faq: [
    ["Pasta grafiği nasıl yapılır?", "Önce kategorilerin toplamı bulunur, her kategorinin yüzdesi hesaplanır ve yüzde 3,6 ile çarpılarak dilim açısı bulunur. Daire çizilir, iletkiyle açılar sırayla ölçülür, dilimler boyanır ve yüzde etiketleriyle başlık eklenir."],
    ["Daire grafiğinde dilim açısı nasıl hesaplanır?", "Dilim açısı, kategori değerinin toplama bölünüp 360 ile çarpılmasıyla bulunur. 40 öğrencinin 14'ü futbolu seçtiyse futbol dilimi 14 ÷ 40 × 360 = 126 derecedir; tüm açıların toplamı 360 derece olmalıdır."],
    ["Pasta grafiği ne zaman kullanılmalı?", "Veriler bir bütünün parçalarıysa, toplamları anlamlıysa ve kategori sayısı beş altı ile sınırlıysa pasta grafiği uygundur. Değerler birbirine yakınsa ya da zaman içindeki değişim gösterilecekse başka grafikler daha iyidir."],
    ["Sütun grafiği ile pasta grafiği farkı nedir?", "Pasta grafiği bütünün ne kadarının hangi kategoriye ait olduğunu, sütun grafiği ise kategorilerin birbirine göre büyüklüğünü gösterir. Göz uzunlukları açılardan daha iyi karşılaştırdığı için kesin karşılaştırmada sütun grafik tercih edilir."],
    ["Excel olmadan grafik nasıl oluşturulur?", "Tarayıcıda çalışan bir grafik oluşturucuya kategorileri ve değerleri girerek sütun, çizgi, pasta ya da halka grafik oluşturabilirsiniz. Sonucu PNG veya SVG olarak indirip belgenize ekleyebilirsiniz; program kurmanız gerekmez."],
    ["Grafik ödevlere ve sunumlara nasıl eklenir?", "Grafiği PNG ya da SVG olarak indirip belge veya sunum programına görsel olarak ekleyin. Ödevlerde altına numara ve açıklama yazın, sunumlarda grafiği büyük kullanıp yalnızca önemli etiketleri bırakın."],
    ["Yüzdeler toplamı 100 etmezse ne yapılmalı?", "Fark yuvarlamadan kaynaklanıyorsa bir ondalık basamak kullanın, en büyük küsuratlı dilimi düzeltin ya da grafiğin altına not düşün. Fark büyükse eksik kategori ya da çoklu seçim olabilir; bu durumda sütun grafik kullanın."],
    ["CSV verisinden grafik çizilebilir mi?", "Evet. CSV dosyasındaki kategori ve değer sütunlarını grafik aracına yapıştırabilirsiniz. Ham veri çok satırlıysa önce kategorilere göre toplamları alın; Türkçe ayarlarda sütun ayırıcının noktalı virgül olabileceğine dikkat edin."],
    ["Yüzde 25'lik dilim kaç derecedir?", "Her yüzde bir 3,6 dereceye karşılık geldiği için %25'lik dilim 25 × 3,6 = 90 derecedir, yani tam bir dik açıdır. Aynı hesapla %50 yarım daire olan 180 derece, %10 ise 36 derece eder."]
  ],
  tools: ["grafik-olustur", "yuzde-hesapla", "csv-excel"],
  related: ["ortalama-medyan-mod-nedir", "ceyreklikler-ve-kutu-grafigi", "jpg-png-svg-farki", "oran-oranti-nasil-cozulur"]
};
