export default {
  slug: "markdown-nedir-nasil-yazilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Markdown Nedir, Nasıl Yazılır? Başlık, Liste, Tablo ve Bağlantı Sözdizimi",
  pageTitle: "Markdown Nedir, Nasıl Yazılır? Başlık, Liste, Tablo Örnekleri",
  description: "Markdown, düz metni # başlık, **kalın**, - liste ve | tablo gibi işaretlerle biçimlendiren yazım dilidir. Sözdizimi, örnekler, MD dosyası açma ve HTML'e çevirme.",
  keywords: ["markdown nedir", "markdown nasıl yazılır", "markdown tablo", "markdown kalın yazı", "md dosyası nasıl açılır", "markdown html çevirme", "markdown başlık", "readme nasıl yazılır"],
  lead: "Markdown, düz metne birkaç basit işaret ekleyerek <strong>başlık, kalın yazı, liste, bağlantı ve tablo</strong> oluşturmanızı sağlayan hafif bir biçimlendirme dilidir: satır başına <code>#</code> koyarsanız başlık, kelimeyi <code>**</code> arasına alırsanız kalın yazı elde edersiniz. Dosyalar <code>.md</code> uzantısıyla kaydedilir, her metin düzenleyicide açılır ve bir dönüştürücüyle HTML'e çevrilir. Bu rehberde temel ve genişletilmiş sözdizimini, tablo yazımını, MD dosyasını açmayı, yapay zekâ yanıtlarındaki yıldızların nedenini ve sık yapılan hataları örneklerle bulacaksınız.",
  kisaCevap: [
    "Başlık için satırın başına bir ile altı arasında # ve bir boşluk yazılır: # en büyük, ###### en küçük başlıktır.",
    "Kalın yazı **metin**, italik yazı *metin*, ikisi birden ***metin*** biçiminde yazılır.",
    "Madde listesi - ya da * ile, numaralı liste 1. 2. 3. ile başlar; alt madde için satırın başına girinti eklenir.",
    "Bağlantı [görünen metin](adres), görsel ise başına ünlem konarak ![açıklama](görsel-adresi) biçiminde yazılır.",
    "Tablo, hücreleri | ile ayırıp başlık satırının altına |---|---| ayırıcı satırı eklenerek oluşturulur.",
    "MD dosyası her metin düzenleyicide açılır; biçimli görünüm için önizleme ya da Markdown'dan HTML'e dönüştürücü gerekir."
  ],
  figure: {
    alt: "Solda Markdown kaynak metni, sağda aynı metnin biçimlenmiş hâli: # başlık büyük başlığa, **kalın** kalın yazıya, - madde listeye, bağlantı söz dizimi tıklanabilir bağlantıya ve dikey çizgili satırlar tabloya dönüşüyor.",
    caption: "Markdown'ın mantığı: soldaki düz metin işaretleri, dönüştürücüden geçince sağdaki biçimli çıktıya dönüşür. Kaynak her yerde okunabilir kalır; biçim yalnızca görüntülenirken uygulanır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Markdown kaynağı → biçimli çıktı</text>
  <rect x="20" y="50" width="300" height="350" rx="10" class="sf sb"/>
  <rect x="20" y="50" width="300" height="34" rx="10" class="ps"/>
  <text x="170" y="73" class="b mid">notlar.md (düz metin)</text>
  <g class="sm">
    <text x="36" y="114" class="p b"># Haftalık Rapor</text>
    <text x="36" y="148">Satışlar **yüzde 12** arttı.</text>
    <text x="36" y="182">- Yeni ürünler</text>
    <text x="36" y="204">- Kampanya sonuçları</text>
    <text x="36" y="238">[Ayrıntılar](rapor.html)</text>
    <text x="36" y="276">| Ay | Satış |</text>
    <text x="36" y="298">|----|-------|</text>
    <text x="36" y="320">| Ekim | 120 |</text>
    <text x="36" y="342">| Kasım | 134 |</text>
    <text x="36" y="378" class="mu">Her düzenleyicide açılır</text>
  </g>
  <line x1="332" y1="225" x2="384" y2="225" class="sp sw" fill="none"/>
  <polygon points="384,215 400,225 384,235" class="p"/>
  <text x="366" y="252" class="sm mid mu">dönüştür</text>
  <rect x="400" y="50" width="300" height="350" rx="10" class="sf sb"/>
  <rect x="400" y="50" width="300" height="34" rx="10" class="oks"/>
  <text x="550" y="73" class="b mid">Görünen sonuç</text>
  <text x="416" y="118" class="lg b">Haftalık Rapor</text>
  <line x1="416" y1="128" x2="684" y2="128" class="sb" fill="none"/>
  <text x="416" y="152" class="sm">Satışlar <tspan class="b">yüzde 12</tspan> arttı.</text>
  <circle cx="424" cy="178" r="3" class="t"/><text x="436" y="182" class="sm">Yeni ürünler</text>
  <circle cx="424" cy="200" r="3" class="t"/><text x="436" y="204" class="sm">Kampanya sonuçları</text>
  <text x="416" y="240" class="sm p b">Ayrıntılar</text>
  <line x1="416" y1="244" x2="482" y2="244" class="sp" fill="none"/>
  <rect x="416" y="262" width="268" height="90" rx="4" class="sf sb"/>
  <rect x="416" y="262" width="268" height="30" rx="4" class="ps"/>
  <line x1="550" y1="262" x2="550" y2="352" class="sb" fill="none"/>
  <line x1="416" y1="322" x2="684" y2="322" class="sb" fill="none"/>
  <g class="sm">
    <text x="430" y="282" class="b">Ay</text><text x="564" y="282" class="b">Satış</text>
    <text x="430" y="312">Ekim</text><text x="564" y="312">120</text>
    <text x="430" y="342">Kasım</text><text x="564" y="342">134</text>
    <text x="416" y="378" class="mu">Önizleme ya da HTML çıktısı</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Markdown nedir, ne işe yarar?",
      p: [
        "Markdown, 2004 yılında yayımlanan ve amacı <strong>okunması kolay düz metin</strong> yazıp bunu kolayca HTML'e çevirmek olan bir yazım biçimidir. Kelime işlemcilerdeki gibi düğmelere basmazsınız; biçimi metnin içine yazdığınız birkaç işaretle belirtirsiniz. Satır başındaki diyez başlığı, iki yıldız kalın yazıyı, tire madde işaretini gösterir.",
        "En büyük avantajı, dosyanın biçim uygulanmamış hâlinin bile anlaşılır olmasıdır. Bir <code>.md</code> dosyasını en basit not defterinde açtığınızda başlıkları, listeleri ve vurguları rahatça seçebilirsiniz. Bu yüzden yazılım belgeleri, proje tanıtım (README) dosyaları, not alma uygulamaları, forumlar, sohbet uygulamaları ve yapay zekâ asistanlarının yanıtları Markdown kullanır.",
        "Markdown bir programlama dili değildir; hesap yapmaz, yalnızca metnin nasıl görüneceğini tarif eder. Öğrenmesi birkaç dakika sürer, çünkü kuralların çoğu insanların e-postalarda zaten kullandığı alışkanlıklardan (yıldızla vurgulama, tireyle liste yapma) türetilmiştir."
      ]
    },
    {
      h: "Temel Markdown sözdizimi tablosu",
      p: [
        "Aşağıdaki tablo günlük kullanımda ihtiyaç duyacağınız işaretlerin neredeyse tamamını kapsar. Soldaki sütunu olduğu gibi yazdığınızda sağdaki sonucu elde edersiniz. İşaretlerden sonra bırakılan boşluklar önemlidir; örneğin <code>#Başlık</code> bazı dönüştürücülerde başlık olarak tanınmaz, <code># Başlık</code> her yerde çalışır."
      ],
      table: {
        head: ["Öğe", "Yazılışı", "Sonuç"],
        rows: [
          ["1. düzey başlık", "<code># Başlık</code>", "En büyük başlık (sayfa başlığı)"],
          ["2. ve 3. düzey başlık", "<code>## Alt başlık</code>, <code>### Bölüm</code>", "Giderek küçülen başlıklar"],
          ["Kalın", "<code>**metin**</code> ya da <code>__metin__</code>", "<strong>metin</strong>"],
          ["İtalik", "<code>*metin*</code> ya da <code>_metin_</code>", "<em>metin</em>"],
          ["Üstü çizili (genişletilmiş)", "<code>~~metin~~</code>", "Üzeri çizgili metin"],
          ["Madde listesi", "<code>- elma</code> ya da <code>* elma</code>", "Madde işaretli liste"],
          ["Numaralı liste", "<code>1. ilk</code>, <code>2. ikinci</code>", "Sıralı liste"],
          ["Bağlantı", "<code>[metin](adres)</code>", "Tıklanabilir metin"],
          ["Görsel", "<code>![açıklama](resim.png)</code>", "Sayfaya gömülü görsel"],
          ["Satır içi kod", "Tek ters tırnak: <code>`kod`</code>", "Eş aralıklı yazı"],
          ["Alıntı", "Satır başında büyüktür işareti: <code>> alıntı</code>", "Girintili alıntı bloğu"],
          ["Yatay çizgi", "<code>---</code> (tek başına bir satırda)", "Bölüm ayırıcı çizgi"]
        ],
        caption: "Alıntı satırı, satırın başına büyüktür işareti ve bir boşluk konarak yazılır. Üstü çizili yazı ve tablolar temel Markdown'da değil, yaygın genişletilmiş lehçede bulunur."
      }
    },
    {
      h: "Markdown'da başlık, kalın ve italik yazı nasıl yazılır?",
      p: [
        "Başlıklar satırın en başına yazılan diyez (<code>#</code>) sayısıyla belirlenir. Bir diyez 1. düzey, iki diyez 2. düzey başlık demektir ve bu sayı altıya kadar çıkar. Bir belgede genellikle tek bir 1. düzey başlık bulunur; bölümler 2. düzey, alt bölümler 3. düzey başlıkla yazılır. Bu hiyerarşi HTML'deki h1–h6 etiketlerine birebir karşılık gelir ve arama motorlarının da sayfa yapısını anlamasına yardım eder.",
        "Vurgu için yıldız ya da alt çizgi kullanılır. Kelimeyi tek yıldız arasına alırsanız italik (<code>*önemli*</code>), çift yıldız arasına alırsanız kalın (<code>**önemli**</code>), üç yıldızla hem kalın hem italik olur. Kelimenin ortasında vurgu yapmanız gerekiyorsa yıldızı tercih edin; alt çizgi kelime içinde birçok dönüştürücüde vurgu olarak algılanmaz. Bu sayede <code>dosya_adi_2026</code> gibi ifadeler bozulmaz."
      ],
      ol: [
        "Satırın başına <code>## </code> yazın ve başlık metnini ekleyin: <code>## Kurulum</code>.",
        "Başlıktan sonra bir boş satır bırakın; paragraflar boş satırla ayrılır.",
        "Vurgulamak istediğiniz kelimeyi seçip iki yanına <code>**</code> koyun.",
        "Kapanış yıldızının hemen önünde boşluk bırakmayın: <code>**kalın **</code> yazımı çoğu yerde vurgu olarak tanınmaz."
      ]
    },
    {
      h: "Liste, bağlantı ve görsel ekleme",
      p: [
        "Madde listesi için satır başına tire, yıldız ya da artı işareti ve bir boşluk yazmanız yeterlidir. Numaralı listelerde rakam ve nokta kullanılır; ilginç bir ayrıntı olarak çoğu dönüştürücü numaraları kendisi sıralar, yani tüm satırlara <code>1.</code> yazsanız bile çıktı 1, 2, 3 diye devam eder. Alt madde oluşturmak için satırı üst maddenin metin hizasına kadar (genellikle iki ya da dört boşluk) girintileyin.",
        "Bağlantıda köşeli parantez görünen metni, hemen yanındaki normal parantez adresi taşır: <code>[fiyat listesi](fiyatlar.html)</code>. Arada boşluk olmamalıdır. Görselin yazımı aynıdır, yalnızca başına ünlem işareti eklenir; köşeli parantez içindeki metin görselin alternatif açıklaması (alt metni) olur. Görme engelli kullanıcıların ekran okuyucuları bu metni seslendirdiği için açıklamayı anlamlı yazın.",
        "Uzun adresleri metnin içinde tekrar etmek istemiyorsanız referans stili bağlantı kullanabilirsiniz: metne <code>[rapor][1]</code> yazıp belgenin sonuna <code>[1]: rapor.html</code> satırını eklersiniz. Bu yöntem çok bağlantılı belgelerde kaynak metni daha okunur tutar."
      ]
    },
    {
      h: "Markdown'da tablo nasıl oluşturulur?",
      p: [
        "Tablolar temel Markdown tanımında yoktur, ancak bugün kullanılan hemen her platformun desteklediği genişletilmiş lehçede (GFM olarak bilinen yaygın sürüm) standart hâle gelmiştir. Hücreler dikey çizgiyle (<code>|</code>) ayrılır, başlık satırının hemen altına en az üç tireden oluşan bir ayırıcı satır eklenir. Sütunların hizalanması için ayırıcı satırdaki iki noktayı kullanırsınız."
      ],
      formula: "| Ürün    | Adet | Fiyat  |\n|:--------|:----:|-------:|\n| Kalem   |  12  |  45,00 |\n| Defter  |   3  | 120,00 |\n:--- sola, :---: ortaya, ---: sağa hizalar",
      after: [
        "Sütunları kaynakta da hizalı yazmak zorunlu değildir; <code>|Kalem|12|45,00|</code> da aynı tabloyu üretir. Ancak boşluklarla hizalanmış kaynak, dosyayı düz metin olarak okuyan biri için çok daha anlaşılırdır. Hücre içinde dikey çizgi kullanmanız gerekirse önüne ters eğik çizgi koyun: <code>\\|</code>.",
        "Hücre içinde birden çok satır, birleştirilmiş hücre ya da iç içe tablo gibi gelişmiş düzenler Markdown'da desteklenmez. Böyle bir tabloya ihtiyacınız varsa o kısmı doğrudan HTML olarak yazmak ya da veriyi bir elektronik tabloda hazırlamak daha uygundur. Elinizde CSV biçiminde bir veri varsa [[arac:csv-json-donustur|CSV JSON Dönüştürücü]] Markdown tablo çıktısı da verir; elle dikey çizgi yazma zahmetinden kurtulursunuz."
      ]
    },
    {
      h: "Kod blokları ve kaçış karakteri",
      p: [
        "Teknik belgelerde komut ya da kod örneği göstermek için üç ters tırnakla açılıp kapanan <strong>kod çiti</strong> kullanılır. Açılış çitinin hemen yanına dil adı yazarsanız (örneğin <code>```json</code>) birçok görüntüleyici sözdizimini renklendirir. Kod bloğunun içindeki yıldızlar, diyezler ve alt çizgiler biçim olarak yorumlanmaz; yazdığınız gibi görünür.",
        "Bir işaretin biçim olarak değil, karakter olarak görünmesini istiyorsanız önüne ters eğik çizgi koyarsınız. <code>\\*</code> yazdığınızda ekranda yıldız görünür, italik başlamaz. Fiyat listelerinde <code>5 * 3</code> gibi çarpma ifadeleri ya da satır başında <code>2026. yıl</code> gibi numaralı listeye benzeyen ifadeler beklenmedik sonuç veriyorsa kaçış karakteri ile düzeltebilirsiniz: <code>2026\\. yıl</code>."
      ]
    },
    {
      h: "Yapay zekâ yanıtlarındaki yıldız ve diyezler neden çıkar?",
      p: [
        "Sohbet tabanlı yapay zekâ asistanları yanıtlarını çoğunlukla Markdown ile biçimlendirir. Sohbet ekranı bu metni yorumladığında başlıkları ve kalın yazıları düzgün görürsünüz. Ancak yanıtı kopyalayıp Markdown'ı tanımayan bir yere (e-posta, kelime işlemci, mesajlaşma uygulaması, form alanı) yapıştırdığınızda işaretler ham hâliyle kalır: <code>**Önemli:**</code> gibi yıldızlar, satır başlarında <code>###</code> ve tireler görünür.",
        "Bunun üç pratik çözümü vardır. Birincisi, metni Markdown'ı anlayan bir önizlemeye yapıştırıp oradan biçimli hâlini kopyalamaktır. İkincisi, Markdown'ı HTML'e çevirip HTML'i destekleyen bir alana (e-posta düzenleyicisi gibi) yapıştırmaktır. Üçüncüsü, asistandan yanıtı baştan \"düz metin, Markdown kullanmadan\" vermesini istemektir."
      ],
      ul: [
        "Biçimli kopya için: metni [[arac:markdown-onizleme|Markdown Editör ve Önizleme]] aracına yapıştırın, sağdaki önizlemeden seçip kopyalayın.",
        "HTML gerekiyorsa: [[arac:markdown-html-donustur|Markdown HTML Dönüştürücü]] ile gövde HTML'i üretin.",
        "Tersi gerekiyorsa: bir web sayfasından aldığınız HTML'i [[arac:html-markdown-donustur|HTML Markdown Dönüştürücü]] ile sade Markdown'a çevirin.",
        "Türkçe karakterler bozuk görünüyorsa sorun Markdown'da değil, karakter kodlamasındadır; [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu rehberine]] bakın."
      ]
    },
    {
      h: "MD dosyası nasıl açılır ve README nasıl hazırlanır?",
      p: [
        "<code>.md</code> uzantılı dosya düz metin dosyasıdır; özel bir programa ihtiyaç duymadan işletim sisteminizin not defteriyle açabilirsiniz. Gördüğünüz şey işaretli ham metin olur. Biçimli hâlini görmek için dosyayı Markdown önizlemesi sunan bir düzenleyiciye yükleyin; tarayıcıda çalışan önizleme araçları dosyayı herhangi bir sunucuya göndermeden gösterebilir.",
        "Yazılım projelerinde kök klasördeki <code>README.md</code> dosyası, depo sayfasında otomatik olarak biçimlenmiş hâliyle gösterilir. İyi bir README genellikle şu sırayı izler: proje adı (1. düzey başlık), bir cümlelik tanım, kurulum adımları (numaralı liste ve kod bloğu), kullanım örneği, yapılandırma seçenekleri (tablo) ve lisans bilgisi. Görseller için göreli yol (<code>docs/ekran.png</code>) kullanmak, depo taşındığında bağlantıların kırılmasını önler."
      ],
      ol: [
        "Dosyanın başına proje adını <code># Proje Adı</code> şeklinde yazın ve altına tek cümlelik açıklama ekleyin.",
        "<code>## Kurulum</code> başlığı altında komutları kod çiti içinde verin.",
        "<code>## Kullanım</code> bölümünde en sık kullanılan örneği gösterin.",
        "Seçenekleri tablo olarak listeleyin, lisansı en sona yazın ve dosyayı UTF-8 kodlamasıyla kaydedin."
      ]
    },
    {
      h: "Markdown yazarken sık yapılan hatalar",
      ul: [
        "<strong>İşaretten sonra boşluk bırakmamak:</strong> <code>#Başlık</code> ve <code>-madde</code> birçok dönüştürücüde düz metin olarak kalır.",
        "<strong>Boş satır unutmak:</strong> Liste, tablo ve başlıktan önce boş satır bırakılmazsa öğe bir önceki paragrafa yapışabilir.",
        "<strong>Tek satır sonu beklemek:</strong> Markdown'da tek Enter yeni paragraf açmaz; satırlar birleşir. Yeni paragraf için boş satır, aynı paragrafta satır kırmak için satır sonuna iki boşluk ya da ters eğik çizgi ekleyin.",
        "<strong>Tablo ayırıcı satırını atlamak:</strong> Başlığın altındaki <code>|---|---|</code> satırı olmadan tablo oluşmaz.",
        "<strong>Lehçe farkını gözden kaçırmak:</strong> Tablo, görev listesi (<code>- [ ] yapılacak</code>) ve üstü çizili yazı her ortamda desteklenmez; yayınlayacağınız platformda önizleyin.",
        "<strong>Güvenilmeyen HTML'i olduğu gibi yayımlamak:</strong> Markdown içine HTML yazılabildiği için başkalarından gelen metni sayfanıza basarken güvenli çıktı seçeneğiyle dönüştürün."
      ]
    },
    {
      h: "Markdown'ı HTML'e çevirme ve araçla çalışma adımları",
      p: [
        "Markdown'ın HTML karşılığı birebirdir: <code>#</code> h1'e, <code>**</code> strong'a, tire listesi ul ve li etiketlerine dönüşür. Bir web sitesine, bloga ya da e-posta şablonuna içerik aktaracaksanız dönüştürücü bu işi saniyeler içinde yapar. Bilişim Ajans'ın Markdown araçları tarayıcıda çalışır; yazdığınız metin bir sunucuya yüklenmez."
      ],
      ol: [
        "Metninizi [[arac:markdown-onizleme|Markdown önizleme aracına]] yazın ya da <code>.md</code> dosyanızı yükleyin; sağ tarafta sonucu anlık görün.",
        "Biçimden memnunsanız [[arac:markdown-html-donustur|Markdown HTML dönüştürücüsünde]] tam belge ya da yalnızca gövde çıktısını seçin.",
        "Başlıklara otomatik kimlik (id) eklenmesini isterseniz ilgili seçeneği açın; içindekiler bağlantıları bu kimliklerle çalışır.",
        "Çıktıyı kopyalayın ya da <code>.html</code> olarak indirin; çok dosyanız varsa toplu dönüşümle tek seferde işleyin."
      ],
      after: [
        "Belgeye görsel ya da küçük bir dosyayı metin olarak gömmeniz gerekirse veri adresleri Base64 kodlaması kullanır; bunun mantığını [[bilgi:base64-nedir-ne-ise-yarar|Base64 nedir rehberinde]] bulabilirsiniz. Markdown ve HTML arasında gidip gelirken Türkçe karakterlerin bozulmaması için dosyaları her zaman UTF-8 olarak kaydetmeyi alışkanlık hâline getirin."
      ]
    }
  ],
  faq: [
    ["Markdown nedir?", "Markdown, düz metne diyez, yıldız, tire ve köşeli parantez gibi işaretler ekleyerek başlık, vurgu, liste, bağlantı ve tablo oluşturmayı sağlayan hafif bir biçimlendirme dilidir. Dosyalar .md uzantılıdır ve HTML'e kolayca çevrilir."],
    ["Markdown'da başlık nasıl yazılır?", "Satırın başına bir ile altı arasında diyez işareti ve bir boşluk yazılır. # en büyük başlığı, ## ikinci düzey başlığı, ###### ise en küçük başlığı verir. Başlıktan önce ve sonra boş satır bırakmak en güvenli yazımdır."],
    ["Markdown'da kalın ve italik yazı nasıl yapılır?", "Kalın yazı için metni iki yıldız arasına (**metin**), italik için tek yıldız arasına (*metin*) alırsınız. Üç yıldız hem kalın hem italik yapar. Alt çizgi de kullanılabilir ama kelime ortasında yıldız daha güvenilir çalışır."],
    ["Markdown'da tablo nasıl oluşturulur?", "Hücreleri dikey çizgiyle ayırarak başlık satırını yazar, hemen altına |---|---| biçiminde ayırıcı satır eklersiniz. Ayırıcı satırdaki iki nokta hizalamayı belirler: :--- sola, :---: ortaya, ---: sağa hizalar."],
    ["MD dosyası nasıl açılır?", "MD dosyası düz metin olduğu için her not defteri ya da kod düzenleyiciyle açılır. Biçimlenmiş hâlini görmek için dosyayı Markdown önizlemesi sunan bir araca yükleyin ya da Markdown'dan HTML'e dönüştürüp tarayıcıda açın."],
    ["Markdown HTML'ye nasıl çevrilir?", "Bir Markdown dönüştürücüsüne metni yapıştırır ya da .md dosyasını yüklersiniz; araç başlıkları h1–h6, kalın yazıyı strong, listeleri ul ve li etiketlerine çevirir. Çıktıyı tam HTML belgesi ya da yalnızca gövde olarak alabilirsiniz."],
    ["Yapay zekâ yanıtlarındaki yıldızlar neden çıkar?", "Yapay zekâ asistanları yanıtları Markdown ile biçimlendirir. Metni Markdown'ı tanımayan bir uygulamaya yapıştırdığınızda biçim uygulanmaz ve yıldız, diyez gibi işaretler ham hâliyle görünür. Önizlemeden biçimli kopyalamak ya da HTML'e çevirmek sorunu çözer."],
    ["README dosyası nasıl biçimlendirilir?", "README.md dosyası Markdown ile yazılır: en üste proje adı 1. düzey başlık olarak, ardından kısa tanım, kurulum ve kullanım bölümleri 2. düzey başlıklarla gelir. Komutlar kod çitine, seçenekler tabloya yazılır ve dosya UTF-8 olarak kaydedilir."],
    ["Markdown'da yeni satır neden oluşmuyor?", "Markdown'da tek bir satır sonu yeni paragraf başlatmaz, satırlar birleştirilir. Yeni paragraf için araya boş satır bırakın; aynı paragraf içinde satır kırmak için satırın sonuna iki boşluk ya da ters eğik çizgi ekleyin."]
  ],
  tools: ["markdown-onizleme", "markdown-html-donustur", "html-markdown-donustur", "csv-json-donustur"],
  related: ["turkce-karakter-sorunu-nasil-duzeltilir", "base64-nedir-ne-ise-yarar"],
  sources: [
    ["CommonMark – Markdown belirtimi", "https://spec.commonmark.org/"],
    ["W3C – HTML başlık ve liste öğeleri", "https://www.w3.org/"]
  ]
};
