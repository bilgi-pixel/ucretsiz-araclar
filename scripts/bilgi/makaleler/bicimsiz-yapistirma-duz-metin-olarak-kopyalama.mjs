export default {
  slug: "bicimsiz-yapistirma-duz-metin-olarak-kopyalama",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Biçimsiz Yapıştırma Nasıl Yapılır? Düz Metin, HTML ve Emoji Temizleme",
  pageTitle: "Biçimsiz Yapıştırma: Düz Metin Olarak Yapıştırma Yolları",
  description: "Biçimsiz yapıştırma için tarayıcıda Ctrl+Shift+V, Mac'te Cmd+Option+Shift+V kullanılır. HTML etiketi, emoji, sekme ve görünmez karakter temizleme adımları.",
  keywords: ["biçimsiz yapıştırma", "düz metin olarak yapıştır", "ctrl shift v", "html etiketlerini temizleme", "emoji silme metinden", "kopyalanan metin biçimi", "sekmeyi boşluğa çevirme", "görünmez karakter silme"],
  lead: "Biçimsiz yapıştırma için çoğu tarayıcıda ve web tabanlı editörde <strong>Ctrl+Shift+V</strong> (Mac'te <strong>Cmd+Option+Shift+V</strong>) kısayolu kullanılır; kelime işlemcilerde ise yapıştırdıktan sonra çıkan menüden \"Yalnızca metni tut\" seçilir. Bu yöntem kopyaladığınız metnin yazı tipini, rengini, boyutunu ve bağlantılarını atar, yalnızca harfleri bırakır. Bu sayfada yapıştırınca biçimin neden değiştiğini, kısayolların hangi programda çalıştığını, web'den gelen HTML etiketlerini, emojileri, sekmeleri ve görünmez karakterleri nasıl temizleyeceğinizi adım adım bulacaksınız.",
  kisaCevap: [
    "Panoya kopyalanan metin genellikle iki biçimde saklanır: zengin (HTML/RTF) ve düz metin; normal yapıştırma zengin olanı alır.",
    "Ctrl+Shift+V tarayıcılarda ve çoğu web editöründe düz metin yapıştırır; masaüstü programlarda karşılığı değişebilir.",
    "Kısayol çalışmazsa metni önce düz metin düzenleyicisine yapıştırıp oradan tekrar kopyalamak her yerde çalışan yöntemdir.",
    "HTML kaynak kodundan metin almak için etiketleri silen bir araç kullanılır; nbsp gibi karakter varlıkları da gerçek karakterlere çevrilir.",
    "Görünmez karakterler (sıfır genişlikli boşluk, bölünmez boşluk) arama, sayma ve form doğrulamasını bozar.",
    "Sekme karakterleri, hizalamanın her yerde aynı görünmesi için 2, 4 ya da 8 boşluğa çevrilebilir."
  ],
  figure: {
    alt: "Pano içeriği iki katman olarak gösterilmiş: üstte yazı tipi, renk, bağlantı ve HTML etiketleri içeren zengin metin, altta yalnızca harflerden oluşan düz metin. Normal yapıştırma zengin katmanı, Ctrl+Shift+V düz katmanı alır.",
    caption: "Kopyaladığınızda pano aynı metnin birden fazla sürümünü tutar. Hangi sürümün yapıştırılacağını kullandığınız komut belirler.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Panoda ne var?</text>
  <rect x="20" y="56" width="200" height="120" rx="10" class="sf sb"/>
  <text x="120" y="86" class="b mid">Web sayfası</text>
  <text x="120" y="114" class="sm mid">Başlık, kalın yazı,</text>
  <text x="120" y="134" class="sm mid">bağlantı, renk</text>
  <text x="120" y="160" class="sm mid mu">Ctrl+C</text>
  <line x1="222" y1="116" x2="268" y2="116" class="sp sw" fill="none"/>
  <polygon points="268,108 282,116 268,124" class="p"/>
  <rect x="288" y="56" width="200" height="56" rx="8" class="ps"/>
  <text x="388" y="80" class="b mid">Zengin katman</text>
  <text x="388" y="100" class="sm mid">HTML: etiket + stil</text>
  <rect x="288" y="120" width="200" height="56" rx="8" class="oks"/>
  <text x="388" y="144" class="b mid">Düz katman</text>
  <text x="388" y="164" class="sm mid">yalnızca karakterler</text>
  <line x1="490" y1="84" x2="530" y2="84" class="sp sw" fill="none"/>
  <polygon points="530,76 544,84 530,92" class="p"/>
  <line x1="490" y1="148" x2="530" y2="148" class="sok sw" fill="none"/>
  <polygon points="530,140 544,148 530,156" class="ok"/>
  <rect x="550" y="56" width="150" height="56" rx="8" class="sf sb"/>
  <text x="625" y="80" class="b mid sm">Ctrl+V</text><text x="625" y="100" class="sm mid">biçim gelir</text>
  <rect x="550" y="120" width="150" height="56" rx="8" class="sf sb"/>
  <text x="625" y="144" class="b mid sm">Ctrl+Shift+V</text><text x="625" y="164" class="sm mid">biçim atılır</text>
  <text x="20" y="220" class="b">Düz metinde bile gizli kalabilenler</text>
  <g class="sm">
    <rect x="20" y="236" width="160" height="70" rx="8" class="dgs"/><text x="100" y="264" class="mid b">U+200B</text><text x="100" y="286" class="mid">sıfır genişlikli boşluk</text>
    <rect x="193" y="236" width="160" height="70" rx="8" class="dgs"/><text x="273" y="264" class="mid b">U+00A0</text><text x="273" y="286" class="mid">bölünmez boşluk</text>
    <rect x="366" y="236" width="160" height="70" rx="8" class="dgs"/><text x="446" y="264" class="mid b">U+0009</text><text x="446" y="286" class="mid">sekme (tab)</text>
    <rect x="540" y="236" width="160" height="70" rx="8" class="dgs"/><text x="620" y="264" class="mid b">emoji</text><text x="620" y="286" class="mid">birleşik dizi</text>
  </g>
  <rect x="20" y="326" width="680" height="54" rx="8" class="sf sb"/>
  <rect x="20" y="326" width="8" height="54" class="p"/>
  <text x="44" y="348" class="b">Her yerde çalışan yöntem</text>
  <text x="44" y="369" class="sm t2">Düz metin düzenleyicisine yapıştırın, oradan yeniden kopyalayın: zengin katman tamamen silinir.</text>
</svg>`
  },
  sections: [
    {
      h: "Yapıştırınca neden yazı tipi ve renk değişir?",
      p: [
        "Bir web sayfasından, e-postadan ya da kelime işlemciden metin kopyaladığınızda işletim sistemi panoya yalnızca harfleri koymaz. Aynı içeriğin birkaç sürümünü birden saklar: biçimli bir HTML ya da RTF sürümü ve sade bir düz metin sürümü. Yapıştırdığınız program hangi sürümü destekliyorsa en zenginini tercih eder.",
        "Sonuç olarak kaynak sayfanın yazı tipi, punto büyüklüğü, rengi, arka plan rengi, satır aralığı, hatta görünmez tablo yapıları hedef belgeye taşınır. Kurumsal bir yazıya web'den bir paragraf eklediğinizde o paragrafın farklı yazı tipinde kalması bu yüzdendir.",
        "Biçimsiz yapıştırma, programdan yalnızca düz metin sürümünü almasını ister. Böylece metin, yapıştırdığınız yerin mevcut biçimini üstlenir: belgenizin yazı tipiyle, kendi paragraf ayarlarınızla görünür."
      ]
    },
    {
      h: "Biçimsiz yapıştırma kısayolları ve çalıştığı yerler",
      table: {
        head: ["Ortam", "Kısayol ya da yol", "Not"],
        rows: [
          ["Tarayıcılar ve web editörleri (Windows, Linux)", "Ctrl+Shift+V", "E-posta, form, çevrim içi belge editörlerinde çalışır"],
          ["Tarayıcılar ve çoğu program (Mac)", "Cmd+Option+Shift+V", "\"Yapıştır ve stili eşleştir\" olarak geçer"],
          ["Masaüstü kelime işlemci", "Yapıştır menüsü → Yalnızca metni tut", "Bazı sürümlerde Ctrl+Shift+V da çalışır"],
          ["Özel yapıştırma penceresi", "Ctrl+Alt+V → Biçimlendirilmemiş metin", "Kelime işlemci ve elektronik tablolarda"],
          ["Elektronik tablo", "Sağ tık → Özel yapıştır → Yalnızca değerler", "Formül ve biçim yerine sonuç değeri yapıştırır"],
          ["Terminal", "Ctrl+Shift+V", "Terminal zaten düz metin kullanır; kısayol çakışmayı önler"]
        ],
        caption: "Program sürümüne göre adlar değişebilir; menüde \"metin\", \"değer\" ya da \"biçimsiz\" sözcüklerini arayın."
      },
      after: [
        "Ctrl+Shift+V her programda aynı işi yapmaz. Eski kelime işlemci sürümlerinde bu kısayol \"biçimi yapıştır\" anlamına gelir ve tam tersini, yani yalnızca biçimi taşımayı yapar. Emin değilseniz yapıştırdıktan hemen sonra metnin yanında beliren küçük panodaki seçeneklere bakın.",
        "Hiçbir kısayol çalışmıyorsa evrensel yöntemi kullanın: metni önce sistemin düz metin düzenleyicisine (Not Defteri, TextEdit'in düz metin kipi vb.) yapıştırın, oradan seçip yeniden kopyalayın. Düz metin düzenleyicisi biçim tanımadığı için zengin katman tamamen kaybolur."
      ]
    },
    {
      h: "Web'den kopyalanan metindeki HTML etiketlerini temizlemek",
      p: [
        "Bazen elinizde görünen metin değil, sayfanın kaynak kodu olur: bir e-posta şablonu, bir içerik yönetim sisteminin HTML görünümü ya da bir dışa aktarma dosyası. Bu metin köşeli parantez içinde yazılan <code>p</code>, <code>strong</code>, <code>a</code> gibi etiketlerle doludur ve doğrudan okunamaz.",
        "Etiketleri elle silmek uzun metinlerde hem yavaş hem de hataya açıktır. [[arac:html-etiket-temizle|HTML Etiket Temizleme aracı]] etiketleri siler, paragraf ve liste satırlarını yeni satır olarak korur, betik ve stil bloklarını tamamen atar ve \"nbsp\", \"amp\" gibi ve-işaretiyle başlayan karakter varlıklarını gerçek karakterlere çevirir. Sonuç, herhangi bir yere güvenle yapıştırılabilecek düz metindir."
      ],
      ol: [
        "HTML kodunu araçtaki kutuya yapıştırın.",
        "Paragraf ve satır sonlarının korunmasını istiyorsanız ilgili seçeneği açık bırakın.",
        "Çıkan düz metni kontrol edin; tablo hücreleri sekme ya da boşlukla ayrılmış olabilir.",
        "Metni kopyalayıp hedef belgeye biçimsiz yapıştırma ile ekleyin."
      ],
      after: [
        "Düzenli ifadelerle kendi temizlik kurallarınızı yazmak isterseniz [[bilgi:regex-nedir-duzenli-ifade-ornekleri|düzenli ifade (regex) rehberi]] iyi bir başlangıçtır; ancak iç içe etiketler ve yorum blokları için hazır araç daha güvenlidir."
      ]
    },
    {
      h: "Metindeki emojileri toplu olarak silmek",
      p: [
        "Sosyal medya gönderilerinden, müşteri yorumlarından ya da mesajlaşma uygulamalarından alınan metinler bol emoji içerir. Bu metinler resmî bir rapora, bir veritabanına ya da yalnızca temel karakterleri kabul eden bir sisteme aktarılacağında emojilerin temizlenmesi gerekir.",
        "Emojiler göründüklerinden daha karmaşıktır. Bir aile emojisi, aralarına sıfır genişlikli birleştirici (U+200D) konmuş birkaç ayrı emojiden oluşur; ten rengi ve bayraklar da birden fazla kod noktasıyla yazılır. Basit bir \"karakteri sil\" yaklaşımı bu dizilerin yarısını bırakıp anlamsız kutucuklar oluşturabilir.",
        "[[arac:emoji-temizle|Emoji Temizleme aracı]] bu birleşik dizileri bütün olarak tanır ve tek seferde siler ya da boşlukla değiştirir; Türkçe harfler ve noktalama işaretleri korunur. Noktalama işaretlerini de atmak gerekiyorsa ardından [[arac:noktalama-temizle|Noktalama Temizleme aracı]] kullanılabilir."
      ]
    },
    {
      h: "Sekme karakterleri boşluğa nasıl çevrilir?",
      p: [
        "Sekme (tab, U+0009) karakteri tek bir karakterdir ama ekranda kaç boşluk genişliğinde görüneceğini program belirler. Bir editörde 4 boşluk, diğerinde 8 boşluk genişliğinde görünür. Bu yüzden sekmeyle hizalanmış tablolar ya da kodlar başka bir yere yapıştırıldığında kayar.",
        "Sorunu çözmenin yolu sekmeleri sabit sayıda boşluğa çevirmektir. Kod yazarken genellikle 2 ya da 4 boşluk tercih edilir; eski düz metin belgelerinde 8 boşluk yaygındır. [[arac:sekme-bosluk-donustur|Sekme Boşluk Dönüştürme aracı]] her iki yöne de çeviri yapar ve satır başındaki boşlukları yeniden sekmeye dönüştürebilir."
      ],
      table: {
        head: ["Kaynak", "Önerilen ayar", "Neden?"],
        rows: [
          ["Web ve betik kodu", "2 boşluk", "İç içe yapılarda satırlar dar ekrana sığar"],
          ["Genel programlama", "4 boşluk", "Okunabilirlik ve yaygın stil rehberleri"],
          ["Eski düz metin raporlar", "8 boşluk", "Klasik terminal sekme genişliği"],
          ["Elektronik tabloya aktarılacak veri", "Sekmeyi koruyun", "Sekme sütun ayırıcı olarak kullanılır"]
        ]
      }
    },
    {
      h: "Görünmez karakterler metni nasıl bozar?",
      p: [
        "Bazı karakterler ekranda hiç görünmez ya da sıradan boşluk gibi görünür ama bilgisayar için farklıdır. Web sayfalarından, PDF'lerden ve mesajlaşma uygulamalarından kopyalanan metinlerde sıkça bulunurlar ve şaşırtıcı hatalara yol açarlar."
      ],
      ul: [
        "<strong>Bölünmez boşluk (U+00A0):</strong> Normal boşluk gibi görünür ama arama yaparken eşleşmez; \"10 TL\" araması \"10 TL\" yazan hücreyi bulamaz.",
        "<strong>Sıfır genişlikli boşluk (U+200B):</strong> Hiç görünmez; bir e-posta adresinin ya da kullanıcı adının içine girerse form \"geçersiz\" hatası verir.",
        "<strong>Bayt sırası işareti (U+FEFF):</strong> Dosyanın başında görünmez bir karakter olarak durur; CSV başlığının ilk sütun adını bozar.",
        "<strong>Yumuşak tire (U+00AD):</strong> Yalnızca satır sonunda görünür; kelime sayımını ve aramayı etkiler.",
        "<strong>Yön işaretleri (U+200E, U+200F):</strong> Karışık dilli metinlerden gelir, imleç hareketini tuhaflaştırır."
      ],
      after: [
        "Bu karakterleri yakalamanın pratik yolu metni karakter sayısına bakarak kontrol etmektir: görünen harf sayısı ile sayaç farklıysa gizli karakter vardır. Karakterlerin kod noktalarını merak ediyorsanız [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 rehberi]] konuyu açıklar."
      ]
    },
    {
      h: "Kelime işlemciden içerik yönetim sistemine yapıştırırken dikkat edilecekler",
      p: [
        "Bir blog ya da kurumsal sitenin editörüne doğrudan kelime işlemciden metin yapıştırmak, arka planda yüzlerce satır gereksiz stil kodu ve boş etiket taşıyabilir. Bu kod sayfanın görünümünü sitenin temasından koparır, mobilde taşmalara yol açar ve sayfanın gereksiz yere ağırlaşmasına neden olur."
      ],
      ol: [
        "Metni editöre biçimsiz yapıştırın ya da editörün \"metin olarak yapıştır\" düğmesini kullanın.",
        "Başlıkları kelime işlemcideki gibi büyük punto ile değil, editörün başlık (H2, H3) seçenekleriyle yeniden işaretleyin.",
        "Kalın, italik ve bağlantıları editörün kendi düğmeleriyle yeniden ekleyin.",
        "Görselleri metinle birlikte değil, ayrı ayrı medya kitaplığına yükleyin.",
        "Yayından önce kod görünümüne bakıp gereksiz stil ya da boş etiket kalmadığını kontrol edin.",
        "Markdown destekleyen editörlerde metni Markdown olarak hazırlamak biçimi baştan temiz tutar; ayrıntı için [[bilgi:markdown-nedir-nasil-yazilir|Markdown rehberine]] bakın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Biçimsiz yapıştırmanın listeleri de düzleştireceğini unutmak:</strong> Madde işaretleri ve numaralar düz metne karakter olarak geçer ya da tamamen kaybolur; listeyi yeniden biçimlendirmeniz gerekebilir.",
        "<strong>Bağlantıların kaybolması:</strong> Düz metinde köprüler gider, yalnızca görünen yazı kalır. Bağlantılar gerekiyorsa önce adresleri ayrı not edin.",
        "<strong>Tabloları düz metinle taşımaya çalışmak:</strong> Tablolar sekmeyle ayrılmış satırlara dönüşür; elektronik tabloya aktarırken işe yarar, belgede ise tabloyu yeniden kurmak gerekir.",
        "<strong>Görünmez karakterleri gözden kaçırmak:</strong> Özellikle IBAN, telefon ve e-posta gibi alanlara yapıştırmadan önce metni temizleyin.",
        "<strong>Kaynak metnin kodlamasını kontrol etmemek:</strong> Türkçe harfler bozuk geliyorsa sorun yapıştırma değil kodlamadır; [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu rehberi]] çözüm yollarını anlatır."
      ]
    }
  ],
  faq: [
    ["Biçimsiz yapıştırma (düz metin) nasıl yapılır?", "Tarayıcılarda ve web editörlerinde Ctrl+Shift+V, Mac'te Cmd+Option+Shift+V kullanılır. Kelime işlemcilerde yapıştırdıktan sonra çıkan menüden Yalnızca metni tut seçilir; hiçbiri çalışmazsa metni önce düz metin düzenleyicisine yapıştırıp oradan yeniden kopyalayabilirsiniz."],
    ["Ctrl+Shift+V her programda çalışır mı?", "Hayır. Tarayıcılar, çevrim içi belge editörleri ve terminaller bu kısayolu düz metin yapıştırma olarak kullanır. Bazı eski kelime işlemci sürümlerinde ise aynı kısayol biçimi yapıştırma anlamına gelir; bu durumda yapıştırma seçenekleri menüsünü kullanmak gerekir."],
    ["Web'den kopyalanan metindeki HTML etiketleri nasıl temizlenir?", "Kaynak kodu bir HTML etiket temizleme aracına yapıştırın. Araç etiketleri siler, paragrafları yeni satır olarak korur, betik ve stil bloklarını atar ve karakter varlıklarını gerçek karakterlere çevirerek okunabilir düz metin üretir."],
    ["Metindeki emojiler toplu olarak nasıl silinir?", "Emoji temizleme aracı kullanın; bu araçlar ten rengi, bayrak ve birleşik aile emojileri gibi çok parçalı dizileri bütün olarak tanır. Basit karakter silme yöntemleri bu dizilerin bir kısmını bırakıp anlamsız kutucuklar oluşturabilir."],
    ["Sekme karakterleri boşluğa nasıl çevrilir?", "Sekme boşluk dönüştürme aracında hedef genişliği 2, 4 ya da 8 boşluk olarak seçin ve metni dönüştürün. Böylece hizalama her editörde aynı görünür; elektronik tabloya aktarılacak verilerde ise sekmeyi korumak daha doğrudur."],
    ["Yapıştırınca neden yazı tipi ve renk değişir?", "Kopyalanan içerik panoda biçimli HTML ya da RTF sürümüyle birlikte saklanır ve normal yapıştırma bu zengin sürümü alır. Bu yüzden kaynak sayfanın yazı tipi, rengi ve boyutu hedef belgeye taşınır; biçimsiz yapıştırma bunu önler."],
    ["Görünmez karakterler metni nasıl bozar?", "Bölünmez boşluk, sıfır genişlikli boşluk ve bayt sırası işareti gibi karakterler ekranda görünmez ama aramaların eşleşmemesine, formların geçersiz hata vermesine ve CSV başlıklarının bozulmasına yol açar. Önemli alanlara yapıştırmadan önce metni temizlemek gerekir."],
    ["WordPress'e Word'den yapıştırırken nelere dikkat edilir?", "Metni editöre biçimsiz yapıştırın, başlıkları editörün başlık seçenekleriyle yeniden işaretleyin, kalın yazı ve bağlantıları editör düğmeleriyle ekleyin ve görselleri ayrı yükleyin. Böylece gereksiz stil kodu sayfaya taşınmaz ve tema bozulmaz."],
    ["Biçimsiz yapıştırmada bağlantılar korunur mu?", "Hayır, düz metinde yalnızca görünen yazı kalır ve köprüler kaybolur. Bağlantıları korumanız gerekiyorsa önce adresleri ayrıca not edin, metni biçimsiz yapıştırdıktan sonra editörün bağlantı düğmesiyle yeniden ekleyin."]
  ],
  tools: ["html-etiket-temizle", "emoji-temizle", "sekme-bosluk-donustur", "noktalama-temizle"],
  related: ["ascii-unicode-utf8-farki", "markdown-nedir-nasil-yazilir", "turkce-karakter-sorunu-nasil-duzeltilir"]
};
