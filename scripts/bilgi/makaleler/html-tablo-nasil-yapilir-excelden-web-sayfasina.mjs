export default {
  slug: "html-tablo-nasil-yapilir-excelden-web-sayfasina",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "HTML Tablo Nasıl Yapılır? Excel'den Web Sayfasına ve WordPress'e Tablo",
  pageTitle: "HTML Tablo Nasıl Yapılır? Excel'den Web Sayfasına Tablo Ekleme",
  description: "HTML tablo hangi etiketlerle yapılır? table, thead, tr, th, td yapısı, colspan ve rowspan, CSS kenarlık, mobilde kaydırma ve Excel'den WordPress'e tablo aktarma.",
  keywords: ["html tablo nasıl yapılır", "html table kodu", "excel tablosunu html'e çevirme", "wordpress tablo ekleme", "csv'den html tablo", "tablo kenarlık css", "mobil uyumlu tablo", "colspan rowspan"],
  lead: "HTML'de tablo, <code>table</code> etiketinin içine satırları <code>tr</code>, başlık hücrelerini <code>th</code> ve veri hücrelerini <code>td</code> ile yazarak yapılır; başlık satırı <code>thead</code>, veri satırları <code>tbody</code> içinde toplanır. Excel'deki bir tabloyu elle kodlamak yerine hücreleri kopyalayıp bir dönüştürücüye yapıştırarak saniyeler içinde temiz kod elde edebilirsiniz. Bu yazıda etiketlerin görevini, hücre birleştirmeyi, CSS ile kenarlık ve zebra satırları, mobil kaydırmayı, erişilebilirliği ve WordPress'e ekleme yollarını anlatıyoruz.",
  kisaCevap: [
    "Temel yapı: table → thead → tr → th (başlık) ve tbody → tr → td (veri).",
    "Hücre birleştirme colspan (yatay) ve rowspan (dikey) öznitelikleriyle yapılır; colspan=\"2\" iki sütunu tek hücre yapar.",
    "Kenarlık ve satır renkleri HTML ile değil CSS ile verilir; border-collapse: collapse çift çizgiyi tek çizgiye indirir.",
    "Mobilde taşmayı önlemek için tablo, yatay kaydırılabilen bir kapsayıcının (overflow-x: auto) içine konur.",
    "Erişilebilirlik için th hücrelerine scope özniteliği ve tabloya caption (başlık) eklenir.",
    "Excel veya CSV'den kopyalanan veri, sekmeyle ayrılmış metin olarak gelir; dönüştürücü bunu doğrudan HTML'e çevirir."
  ],
  figure: {
    alt: "HTML tablo anatomisi: table içinde caption, thead satırında th başlık hücreleri, tbody satırlarında td hücreleri ve iki sütunu birleştiren colspan örneği.",
    caption: "Bir HTML tablosunun katmanları. Başlık satırı thead içinde th hücrelerinden, veri satırları tbody içinde td hücrelerinden oluşur. Son satırda colspan=\"2\" ile iki sütun tek hücrede birleştirilmiştir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">HTML tablonun anatomisi</text>
  <rect x="40" y="50" width="420" height="350" rx="10" class="sf sb"/>
  <text x="56" y="74" class="sm b p">table</text>
  <text x="250" y="96" class="sm mid t2">caption: 2026 Ürün Fiyat Listesi</text>
  <rect x="60" y="108" width="380" height="44" rx="4" class="p"/>
  <text x="70" y="124" class="sm sf">thead › tr</text>
  <g class="sm mid b">
    <text x="125" y="144" class="sf">Ürün</text><text x="250" y="144" class="sf">Adet</text><text x="375" y="144" class="sf">Fiyat</text>
  </g>
  <line x1="187" y1="130" x2="187" y2="152" class="sb" fill="none"/><line x1="313" y1="130" x2="313" y2="152" class="sb" fill="none"/>
  <text x="70" y="172" class="sm mu">tbody</text>
  <rect x="60" y="178" width="380" height="40" class="sf sb"/>
  <rect x="60" y="218" width="380" height="40" class="ps"/>
  <rect x="60" y="258" width="380" height="40" class="sf sb"/>
  <g class="sm mid">
    <text x="125" y="203">Toner</text><text x="250" y="203">2</text><text x="375" y="203">1.200</text>
    <text x="125" y="243">Kâğıt</text><text x="250" y="243">10</text><text x="375" y="243">950</text>
    <text x="125" y="283">Kartuş</text><text x="250" y="283">1</text><text x="375" y="283">640</text>
  </g>
  <line x1="187" y1="178" x2="187" y2="298" class="sb" fill="none"/><line x1="313" y1="178" x2="313" y2="298" class="sb" fill="none"/>
  <rect x="60" y="306" width="253" height="40" class="oks"/>
  <rect x="313" y="306" width="127" height="40" class="sf sb"/>
  <text x="186" y="331" class="sm mid b">Toplam (colspan="2")</text>
  <text x="376" y="331" class="sm mid b">2.790</text>
  <text x="250" y="380" class="sm mid t2">2. satır zebra rengi: tr:nth-child(even)</text>
  <g class="sm">
    <rect x="490" y="108" width="200" height="44" rx="6" class="p"/><text x="504" y="128" class="sf b">th</text><text x="504" y="144" class="sf">başlık hücresi, scope="col"</text>
    <rect x="490" y="178" width="200" height="44" rx="6" class="sf sb"/><text x="504" y="198" class="b">td</text><text x="504" y="214">veri hücresi</text>
    <rect x="490" y="238" width="200" height="44" rx="6" class="ps"/><text x="504" y="258" class="b">tr</text><text x="504" y="274">bir satır</text>
    <rect x="490" y="306" width="200" height="44" rx="6" class="oks"/><text x="504" y="326" class="b">colspan / rowspan</text><text x="504" y="342">hücre birleştirme</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "HTML tablo hangi etiketlerle oluşturulur?",
      p: [
        "Bir web tablosu iç içe geçmiş birkaç etiketten oluşur. En dışta <code>table</code> bulunur ve tablonun başladığını ve bittiğini gösterir. Her yatay satır <code>tr</code> (table row) ile açılır. Satırın içindeki hücreler ise iki türdür: sütun ya da satır başlığı olan hücreler <code>th</code> (table header), sıradan veri hücreleri <code>td</code> (table data) ile yazılır.",
        "Satırlar anlamlarına göre üç bölüme ayrılabilir: başlık satırları <code>thead</code>, veri satırları <code>tbody</code>, toplam ya da dipnot satırları <code>tfoot</code> içine konur. Tablonun ne anlattığını söyleyen kısa başlık için <code>caption</code> kullanılır ve <code>table</code> açıldıktan hemen sonra yazılır. Sütunlara toplu genişlik ya da renk vermek isterseniz <code>colgroup</code> ve <code>col</code> etiketlerinden yararlanabilirsiniz."
      ],
      table: {
        head: ["Etiket", "Görevi", "Nerede kullanılır?"],
        rows: [
          ["<code>table</code>", "Tablonun kapsayıcısı", "En dışta, bir kez"],
          ["<code>caption</code>", "Tablo başlığı", "table'dan hemen sonra"],
          ["<code>thead</code>", "Başlık bölümü", "Sütun adlarının olduğu satırlar"],
          ["<code>tbody</code>", "Veri bölümü", "Asıl içerik satırları"],
          ["<code>tfoot</code>", "Alt bölüm", "Toplam, ortalama, dipnot"],
          ["<code>tr</code>", "Satır", "Her bölümün içinde"],
          ["<code>th</code>", "Başlık hücresi", "Sütun veya satır başlığı"],
          ["<code>td</code>", "Veri hücresi", "Sayı, metin, bağlantı"]
        ]
      },
      after: [
        "Yazım sırası her zaman aynıdır: tablo açılır, başlık eklenir, thead içinde bir tr ve onun içinde th hücreleri yazılır; ardından tbody içinde her veri satırı için bir tr açılır ve td hücreleri sıralanır. Her satırdaki hücre sayısı (birleştirmeler hesaba katılarak) eşit olmalıdır, yoksa tablo kayar."
      ]
    },
    {
      h: "Başlık satırı (thead ve th) neden önemlidir?",
      p: [
        "Görsel olarak ilk satırı kalın yazmak için td hücresine kalın yazı vermek yetiyormuş gibi görünebilir. Oysa th etiketi yalnızca görünüş değil anlam taşır. Ekran okuyucular bir veri hücresine gelindiğinde ilgili th hücresini de seslendirir; görme engelli bir kullanıcı \"Fiyat: 1.200\" bilgisini bu sayede duyar. Arama motorları da tablonun hangi sütunda ne tuttuğunu th üzerinden anlar.",
        "thead kullanmanın pratik faydaları da vardır. Uzun bir tablo yazdırıldığında tarayıcılar thead satırını her sayfanın başında tekrarlayabilir. CSS ile yalnızca başlık bölümüne yapışkan (sticky) konum verip aşağı kaydırırken sütun adlarının görünür kalmasını sağlamak da thead sayesinde kolaylaşır.",
        "Satır başlığı gereken tablolarda, örneğin ilk sütunda ay adlarının olduğu bir tabloda, her satırın ilk hücresini th yapıp <code>scope=\"row\"</code> vermek doğru yöntemdir. Sütun başlıklarında ise <code>scope=\"col\"</code> kullanılır."
      ]
    },
    {
      h: "Hücre birleştirme: colspan ve rowspan",
      p: [
        "Bazı tablolarda bir hücrenin birden fazla sütunu ya da satırı kaplaması gerekir. Yatay birleştirme için hücreye <code>colspan</code>, dikey birleştirme için <code>rowspan</code> özniteliği yazılır ve kaç hücre kaplanacağı sayıyla belirtilir. Yukarıdaki görseldeki \"Toplam\" hücresi colspan=\"2\" ile Ürün ve Adet sütunlarını birlikte kaplar; o satırda yalnızca iki hücre yazılır.",
        "rowspan kullanırken alttaki satırlardan birleştirilen sütunun hücresini çıkarmayı unutmamak gerekir. Örneğin ilk sütundaki \"Ocak\" hücresine rowspan=\"3\" verdiyseniz, izleyen iki satırın ilk hücresini yazmazsınız. Bu hesap karıştığında tablo bir sütun sağa kayar; en sık görülen hatalardan biri budur."
      ],
      formula: "Bir satırdaki hücre sayısı = sütun sayısı − (colspan ile fazladan kaplanan sütunlar) − (üst satırlardan rowspan ile inen hücreler)\nÖrnek: 3 sütunlu tabloda colspan=\"2\" olan satır → 3 − 1 = 2 hücre",
      after: [
        "Birleştirmeyi elle saymak yerine [[arac:html-tablo-olustur|HTML Tablo Oluşturucu]]da hücreleri seçip birleştirebilir, kodu hazır kopyalayabilirsiniz."
      ]
    },
    {
      h: "Excel'deki tablo HTML koduna nasıl çevrilir?",
      p: [
        "Excel'de hücreleri seçip kopyaladığınızda panoya sekme (tab) karakteriyle ayrılmış düz metin de yazılır. Bu biçim aslında bir tür CSV'dir: satırlar satır sonuyla, sütunlar sekmeyle ayrılır. Bir dönüştürücü bu metni okuyup her satırı bir tr'ye, her sütunu bir td'ye çevirir; ilk satırı başlık kabul ederseniz th hücreleri ve thead oluşturur.",
        "Elinizde CSV dosyası varsa aynı işlem dosyanın içeriğiyle yapılır. Türkçe Excel ayarlarında CSV dosyalarında ayırıcı genellikle noktalı virgüldür, çünkü virgül ondalık işareti olarak kullanılır. Dönüştürücüde doğru ayırıcıyı seçmezseniz bütün satır tek hücreye yığılır. CSV biçimi ve ayırıcı sorunları için [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV dosyası nedir]] yazısına bakabilirsiniz."
      ],
      ol: [
        "Excel'de başlık satırı dahil tabloyu seçin ve Ctrl+C ile kopyalayın.",
        "[[arac:csv-html-tablo|CSV'den HTML Tabloya]] aracını açıp metni yapıştırın; ayırıcı olarak sekme ya da noktalı virgül seçin.",
        "\"İlk satır başlık\" seçeneğini işaretleyin; araç thead ve th hücrelerini kurar.",
        "Para ve sayı sütunlarını sağa hizalayın; okumayı kolaylaştırır.",
        "Üretilen kodu kopyalayıp sayfanıza ya da WordPress'teki HTML bloğuna yapıştırın."
      ],
      after: [
        "Dönüştürme sırasında küçüktür, büyüktür ve ve-işareti gibi özel karakterler kaçış dizisine çevrilir; bu sayede hücredeki bir \"5 < 10\" ifadesi sayfayı bozmaz. Veri bir PDF içindeyse önce [[bilgi:pdf-tabloyu-excele-aktarma|PDF'teki tabloyu Excel'e aktarma]] adımlarını uygulayın."
      ]
    },
    {
      h: "CSS ile kenarlık, satır rengi ve hizalama",
      p: [
        "Eski sayfalarda tabloya border=\"1\" yazıldığını görebilirsiniz; bu öznitelik artık önerilmez. Görünüm CSS ile verilir. Tablonun tamamına <code>border-collapse: collapse</code> yazmak hücreler arasındaki çift çizgiyi tek çizgiye indirir. Ardından th ve td hücrelerine ince bir kenarlık ve iç boşluk (padding) verilir.",
        "Zebra görünümü, yani bir satırın açık bir satırın beyaz olması, uzun tablolarda gözün satırı kaybetmesini önler. Bunun için <code>tbody tr:nth-child(even)</code> seçicisine açık bir arka plan rengi verilir. Fareyle üzerine gelinen satırı vurgulamak için de <code>tr:hover</code> kullanılabilir."
      ],
      table: {
        head: ["Amaç", "CSS özelliği", "Örnek değer"],
        rows: [
          ["Çift çizgiyi tekleştirme", "border-collapse", "collapse"],
          ["Hücre kenarlığı", "border", "1px solid gri"],
          ["Hücre iç boşluğu", "padding", "8px 12px"],
          ["Zebra satır", "tbody tr:nth-child(even)", "açık gri arka plan"],
          ["Sayıları sağa yaslama", "text-align", "right"],
          ["Tablo genişliği", "width", "100%"],
          ["Sabit başlık", "position (th)", "sticky; top: 0"]
        ],
        caption: "Renkleri sitenizin temasına uygun seçin; metin ile arka plan arasında yeterli kontrast bırakın."
      }
    },
    {
      h: "Tablo mobilde nasıl kaydırılabilir yapılır?",
      p: [
        "Altı yedi sütunlu bir tablo 360 piksel genişliğindeki bir telefon ekranına sığmaz. Tarayıcı ya sayfanın tamamını yatay kaydırır ya da hücreleri okunamayacak kadar daraltır. En yaygın ve güvenli çözüm, tabloyu bir kapsayıcı div içine koyup kapsayıcıya <code>overflow-x: auto</code> vermektir. Böylece yalnızca tablo yatay kaydırılır, sayfanın geri kalanı yerinde kalır.",
        "Alternatif olarak dar ekranlarda her satırı bir kart gibi alt alta gösteren CSS düzenleri de kullanılabilir; ancak bu yöntem th bilgisini her hücreye ayrıca yazmayı gerektirir ve bakımı zordur. Sütun sayısını azaltmak, gereksiz sütunları gizlemek ya da uzun tabloyu ikiye bölmek çoğu zaman daha sade bir çözümdür.",
        "Kaydırılabilir tabloda ilk sütunu yapışkan yapmak (position: sticky; left: 0) kullanıcının hangi satırda olduğunu kaybetmesini önler. Kapsayıcıya klavyeyle odaklanılabilmesi için tabindex vermek de erişilebilirlik açısından yararlıdır."
      ]
    },
    {
      h: "WordPress'e tablo nasıl eklenir?",
      p: [
        "WordPress'in blok düzenleyicisinde \"Tablo\" bloğu bulunur. Satır ve sütun sayısını seçip hücreleri doldurabilir, başlık ve alt bölüm satırlarını açabilir, sabit genişlik ve zebra stilini ayarlayabilirsiniz. Excel'den kopyalanan hücreleri doğrudan bu bloğa yapıştırmak çoğu durumda tabloyu otomatik oluşturur; ancak birleştirilmiş hücreler ve biçimlendirme aktarılmayabilir.",
        "Daha fazla kontrol isterseniz \"Özel HTML\" bloğunu ekleyip dönüştürücüden aldığınız kodu yapıştırabilirsiniz. Bu yöntemde colspan, rowspan, caption ve scope gibi ayrıntılar korunur. Tema CSS'iniz tabloya zaten stil veriyorsa ek CSS yazmanıza gerek kalmaz; vermiyorsa \"Ek CSS\" bölümüne yukarıdaki tablodaki kuralları ekleyebilirsiniz.",
        "Yazınızı Markdown ile hazırlıyorsanız tabloyu dikey çizgilerle yazıp HTML'e çevirmek de mümkündür. [[arac:markdown-html-donustur|Markdown HTML Dönüştürücü]] tablo sözdizimini destekler."
      ]
    },
    {
      h: "Erişilebilir tablo için kontrol listesi",
      ul: [
        "Tabloyu yalnızca tablo verisi için kullanın; sayfa düzeni kurmak için tablo kullanmak ekran okuyucuları şaşırtır.",
        "Her tabloya ne anlattığını söyleyen bir caption ekleyin.",
        "Sütun başlıklarını th ile yazın ve scope=\"col\", satır başlıklarına scope=\"row\" verin.",
        "Boş hücre bırakmak yerine \"—\" ya da \"veri yok\" yazın; boş hücre ekran okuyucuda belirsizlik yaratır.",
        "Rengi tek başına bilgi taşıyıcı yapmayın; kırmızı hücre yerine \"gecikmeli\" gibi bir metin de ekleyin.",
        "Metin ile arka plan arasında en az AA düzeyinde kontrast sağlayın.",
        "Çok karmaşık, iç içe birleştirilmiş başlıklar yerine tabloyu iki basit tabloya bölmeyi düşünün."
      ]
    },
    {
      h: "Markdown tablo ile HTML tablo arasındaki fark",
      p: [
        "Markdown tablosu, sütunları dikey çizgiyle ayırıp başlığın altına tirelerden bir satır ekleyerek yazılır. Yazması hızlıdır ve düz metin olarak da okunabilir. Ancak hücre birleştirme, caption, scope ya da hücre bazında stil gibi ayrıntıları desteklemez. Markdown işlenirken sonunda yine HTML tablosuna çevrilir.",
        "Kural olarak blog yazısında basit bir karşılaştırma tablosu için Markdown yeterlidir. Birleştirilmiş hücreler, çok satırlı başlıklar ya da özel hizalama gereken tablolarda doğrudan HTML yazmak gerekir. Markdown sözdiziminin tamamı için [[bilgi:markdown-nedir-nasil-yazilir|Markdown nedir, nasıl yazılır]] yazısına göz atabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Satırlarda farklı hücre sayısı:</strong> Birleştirme hesabı tutmayınca tablo sağa kayar; her satırı sayın.",
        "<strong>Başlığı td ile yazmak:</strong> Kalın görünse de anlamsal başlık olmaz; th kullanın.",
        "<strong>Sabit piksel genişlik:</strong> 900 piksel genişlik verilen tablo telefonda taşar; yüzde ya da kaydırılabilir kapsayıcı kullanın.",
        "<strong>Excel biçimini birebir taşımaya çalışmak:</strong> Hücre renklerini ve yazı tiplerini satır içi stil olarak taşımak kodu şişirir; stil CSS'te olmalı.",
        "<strong>Ondalık ayırıcıyı karıştırmak:</strong> CSV'de virgül hem ayırıcı hem ondalık işareti olursa sütunlar bölünür; Türkçe veride noktalı virgül ya da sekme kullanın.",
        "<strong>Çok büyük tablo:</strong> Yüzlerce satırlık tabloyu tek sayfaya koymak yerine sayfalara bölmek ya da indirilebilir dosya sunmak daha kullanışlıdır."
      ]
    }
  ],
  faq: [
    ["HTML'de tablo hangi etiketlerle oluşturulur?", "Tablo table etiketiyle açılır; satırlar tr, başlık hücreleri th, veri hücreleri td ile yazılır. Başlık satırları thead, veri satırları tbody, toplam satırları tfoot içinde toplanır ve tablonun başlığı caption ile verilir."],
    ["Başlık satırı (thead, th) neden önemlidir?", "th hücreleri ekran okuyuculara ve arama motorlarına hangi sütunun ne tuttuğunu anlatır. thead ayrıca yazdırırken başlığın her sayfada tekrarlanmasını ve kaydırırken sabit kalmasını kolaylaştırır."],
    ["Excel'deki tablo HTML koduna nasıl çevrilir?", "Excel'de hücreleri kopyaladığınızda sekmeyle ayrılmış metin oluşur. Bu metni bir CSV-HTML dönüştürücüsüne yapıştırıp ilk satırı başlık seçerseniz thead, tbody, th ve td yapısı kurulmuş temiz kod elde edersiniz."],
    ["WordPress'e tablo nasıl eklenir?", "Blok düzenleyicideki Tablo bloğunu kullanabilir ya da Excel hücrelerini bu bloğa yapıştırabilirsiniz. Hücre birleştirme ve caption gerekiyorsa Özel HTML bloğu ekleyip dönüştürücüden aldığınız kodu yapıştırmak daha güvenlidir."],
    ["Hücre birleştirme (colspan, rowspan) nasıl yapılır?", "Yatay birleştirme için hücreye colspan, dikey birleştirme için rowspan yazılır ve kaplanacak hücre sayısı verilir. Birleştirilen alandaki diğer hücreler o satırdan ya da alttaki satırlardan çıkarılmalıdır."],
    ["Tabloya kenarlık ve satır rengi CSS ile nasıl verilir?", "Tabloya border-collapse: collapse, hücrelere ince bir border ve padding verin. Zebra görünüm için tbody tr:nth-child(even) seçicisine açık bir arka plan rengi tanımlayın; renkleri sitenizin temasına uygun seçin."],
    ["Tablo mobilde nasıl kaydırılabilir yapılır?", "Tabloyu bir div kapsayıcının içine koyup kapsayıcıya overflow-x: auto verin. Böylece dar ekranda yalnızca tablo yatay kaydırılır; isterseniz ilk sütunu yapışkan yaparak satırların takibini kolaylaştırırsınız."],
    ["Erişilebilir tablo için nelere dikkat edilir?", "Tabloya caption ekleyin, başlıkları th ve uygun scope ile yazın, boş hücre bırakmayın, bilgiyi yalnızca renkle vermeyin ve yeterli kontrast sağlayın. Düzen kurmak için tablo kullanmaktan kaçının."],
    ["Markdown tablo ile HTML tablo arasındaki fark nedir?", "Markdown tablosu dikey çizgilerle hızlıca yazılır ama hücre birleştirme, caption ve scope desteklemez. HTML tablosu daha uzun yazılır ancak tüm ayrıntıları kontrol etmenizi sağlar; Markdown sonunda zaten HTML'e çevrilir."]
  ],
  tools: ["html-tablo-olustur", "csv-html-tablo", "markdown-html-donustur", "markdown-onizleme"],
  related: ["csv-dosyasi-nedir-excelde-nasil-acilir", "markdown-nedir-nasil-yazilir"],
  sources: [
    ["W3C – HTML tablolar ve erişilebilirlik öğreticisi", "https://www.w3.org/WAI/tutorials/tables/"],
    ["WHATWG – HTML Living Standard", "https://html.spec.whatwg.org/"]
  ]
};
