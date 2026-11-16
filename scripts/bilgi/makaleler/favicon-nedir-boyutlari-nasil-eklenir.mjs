export default {
  slug: "favicon-nedir-boyutlari-nasil-eklenir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "Favicon Nedir? Boyutları, ICO ve PNG Farkı, Siteye Nasıl Eklenir?",
  pageTitle: "Favicon Nedir? Favicon Boyutları ve Siteye Ekleme Rehberi",
  description: "Favicon tarayıcı sekmesinde görünen site simgesidir. 16, 32, 48, 180, 192 ve 512 piksellik boyutlar, ICO-PNG-SVG farkı, HTML kodu ve favicon neden görünmez.",
  keywords: ["favicon nedir", "favicon boyutu", "favicon nasıl eklenir", "favicon ico png", "apple touch icon", "favicon görünmüyor", "wordpress favicon", "site simgesi"],
  lead: "Favicon, bir web sitesinin tarayıcı sekmesinde, yer imlerinde, geçmiş listesinde ve arama sonuçlarında adının yanında görünen <strong>küçük kare simgesidir</strong>. Eksiksiz bir kurulum için 16, 32 ve 48 piksel içeren bir favicon.ico, telefon ana ekranı için 180×180 piksel bir Apple touch simgesi ve uygulama olarak yükleme için 192 ile 512 piksellik PNG'ler hazırlanır. Bu sayfada boyutların nerede kullanıldığını, ICO, PNG ve SVG farkını, HTML'e eklenecek satırları ve favicon'un neden hemen görünmediğini anlatıyoruz.",
  kisaCevap: [
    "Favicon, sitenin sekmede ve arama sonuçlarında görünen kare simgesidir; adı \"favorite icon\" ifadesinden gelir.",
    "Temel set: favicon.ico (16, 32, 48 px), 180×180 Apple touch simgesi, 192×192 ve 512×512 manifest simgeleri.",
    "ICO birden çok boyutu tek dosyada taşır; PNG tek boyutludur; SVG ölçeklenir ama her tarayıcıda desteklenmez.",
    "Google arama sonuçları için simge kare olmalı ve en az 8×8 piksel olmalıdır; 48×48'den büyük olması önerilir.",
    "Tarayıcılar favicon'u uzun süre önbellekte tutar; değişiklik hemen görünmüyorsa dosya adına sürüm eki eklenir.",
    "Logodan favicon yaparken ayrıntılar silinir; tek harf ya da sembolle yüksek kontrastlı bir tasarım daha iyi okunur."
  ],
  figure: {
    alt: "Favicon boyutlarının gerçek ölçekli karşılaştırması: 16, 32, 48, 180 ve 512 piksellik kareler ve her birinin kullanıldığı yer etiketleriyle.",
    caption: "Kareler birbirine göre ölçeklidir (512 hariç, kısaltıldı). 16 pikselde yalnızca bir harf ya da basit bir sembol okunur; 180 ve 512 piksellik simgeler telefon ana ekranında ve uygulama olarak yüklemede kullanılır.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Favicon boyutları ve kullanıldığı yer</text>
  <rect x="40" y="226" width="16" height="16" class="p"/>
  <rect x="90" y="210" width="32" height="32" class="p"/>
  <rect x="156" y="194" width="48" height="48" class="p"/>
  <text x="180" y="226" class="b mid sf">B</text>
  <rect x="250" y="62" width="180" height="180" rx="34" class="p"/>
  <text x="340" y="172" class="xl mid sf">BA</text>
  <rect x="470" y="62" width="230" height="180" rx="10" class="ps"/>
  <text x="585" y="140" class="xl mid p">512</text>
  <text x="585" y="170" class="sm mid">gerçek boyutu bu alanın</text>
  <text x="585" y="188" class="sm mid">yaklaşık 3 katı</text>
  <text x="48" y="266" class="sm mid b">16</text>
  <text x="106" y="266" class="sm mid b">32</text>
  <text x="180" y="266" class="sm mid b">48</text>
  <text x="340" y="266" class="sm mid b">180</text>
  <text x="585" y="266" class="sm mid b">192 / 512</text>
  <rect x="20" y="284" width="210" height="80" rx="8" class="sf sb"/>
  <text x="125" y="310" class="b mid">favicon.ico</text>
  <text x="125" y="332" class="sm mid">sekme, yer imi, adres</text>
  <text x="125" y="350" class="sm mid t2">16 + 32 + 48 tek dosyada</text>
  <rect x="245" y="284" width="190" height="80" rx="8" class="sf sb"/>
  <text x="340" y="310" class="b mid">Apple touch</text>
  <text x="340" y="332" class="sm mid">telefon ana ekranı</text>
  <text x="340" y="350" class="sm mid t2">dolu zemin, PNG</text>
  <rect x="450" y="284" width="250" height="80" rx="8" class="sf sb"/>
  <text x="575" y="310" class="b mid">Manifest simgeleri</text>
  <text x="575" y="332" class="sm mid">uygulama olarak yükleme</text>
  <text x="575" y="350" class="sm mid t2">maskable: güvenli alan %80</text>
</svg>`
  },
  sections: [
    {
      h: "Favicon nedir, nerede görünür?",
      p: [
        "Favicon, \"favorite icon\" (sık kullanılan simgesi) ifadesinin kısaltmasıdır. İlk olarak tarayıcıların yer imleri listesinde siteleri ayırt etmek için kullanıldı; bugün çok daha fazla yerde görünür: tarayıcı sekmesi, adres çubuğu önerileri, geçmiş listesi, yer imleri, telefonda ana ekrana eklenen kısayol, uygulama olarak yüklenen web siteleri ve arama sonuçlarında site adının yanı.",
        "Çok sekme açık olduğunda kullanıcı sekmeleri çoğu zaman yalnızca favicon'a bakarak bulur. Arama sonuçlarında ise simge, sitenin tanınırlığını ve tıklanma isteğini etkileyen küçük ama sürekli görünen bir marka öğesidir. Favicon'u olmayan site, sekmede tarayıcının gri varsayılan simgesiyle görünür ve özensiz bir izlenim bırakır."
      ]
    },
    {
      h: "Favicon hangi boyutlarda hazırlanmalı?",
      p: [
        "Tek bir boyut her yere yetmez, çünkü simge 16 piksellik sekmeden 512 piksellik uygulama ekranına kadar farklı ölçülerde gösterilir. Küçük boyutu büyütmek bulanık, büyük boyutu tarayıcının küçültmesine bırakmak ise bazen silik sonuç verir. Bu yüzden aşağıdaki set yaygın kabul görür."
      ],
      table: {
        head: ["Boyut (piksel)", "Dosya", "Nerede kullanılır?"],
        rows: [
          ["16×16", "favicon.ico içinde", "Tarayıcı sekmesi, yer imleri"],
          ["32×32", "favicon.ico içinde ya da PNG", "Yüksek çözünürlüklü ekranda sekme, görev çubuğu"],
          ["48×48", "favicon.ico içinde", "Masaüstü kısayolları, arama sonuçları"],
          ["180×180", "apple-touch-icon.png", "Telefon ve tablette ana ekrana ekleme"],
          ["192×192", "manifest PNG", "Uygulama olarak yükleme, ana ekran"],
          ["512×512", "manifest PNG", "Açılış ekranı, uygulama mağazası benzeri listeler"]
        ],
        caption: "Kaynak görseliniz en az 512×512 piksel ve kare olmalıdır; diğer boyutlar ondan küçültülerek üretilir."
      },
      after: [
        "Görseliniz kare değilse önce kırpın ya da kenarlarına boşluk ekleyerek kare yapın; dikdörtgen bir logo kareye sıkıştırılınca bozulur. Boyutlandırma için [[arac:resim-boyutlandir|Resim Boyutlandır]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "ICO, PNG ve SVG favicon arasındaki fark nedir?",
      table: {
        head: ["Biçim", "Avantajı", "Sınırı"],
        rows: [
          ["ICO", "Birden çok boyutu tek dosyada taşır; eski ve yeni tüm tarayıcılar tanır", "Yalnızca simge için kullanılır, büyük boyutta dosya şişer"],
          ["PNG", "Saydamlık destekler, her araçla üretilir", "Her boyut ayrı dosya ister"],
          ["SVG", "Vektördür, her boyutta keskin; koyu temaya göre renk değiştirebilir", "Bazı tarayıcılar desteklemez; ICO ya da PNG yedeği gerekir"]
        ]
      },
      after: [
        "Pratik çözüm, üçünü birlikte kullanmaktır: kök dizinde bir favicon.ico, modern tarayıcılar için bir SVG ya da 32 piksellik PNG ve telefonlar için 180 piksellik PNG. Tarayıcı desteklediği en uygun dosyayı seçer. Biçimler arasındaki genel farkı [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] yazısında bulabilirsiniz; SVG kaynaktan PNG üretmek için [[arac:svg-png|SVG PNG dönüştürücü]], JPG logodan saydam olmayan PNG almak için [[arac:jpg-png-donustur|JPG PNG dönüştürücü]] işinizi görür."
      ]
    },
    {
      h: "Apple touch icon ve manifest simgeleri neden gerekir?",
      p: [
        "Bir kullanıcı sitenizi telefonunun ana ekranına eklediğinde sistem 16 piksellik favicon'u kullanmaz; daha büyük bir simge arar. Apple cihazlar bunun için 180×180 piksellik \"apple-touch-icon\" dosyasını okur. Bu simgede saydam alan bırakmamak önemlidir; saydam kısımlar sistem tarafından siyah ya da beyazla doldurulabilir. Köşeler sistem tarafından yuvarlatıldığı için simgeyi kendiniz yuvarlatmanız gerekmez.",
        "Web uygulama bildirimi (manifest) ise sitenin uygulama gibi yüklenebilmesi için gereken JSON dosyasıdır ve içinde 192 ile 512 piksellik simgeler listelenir. \"Maskable\" türündeki simgede sistem görseli daire, yuvarlak kare ya da başka bir şekle kırpabilir; bu yüzden logo, merkezdeki güvenli alanda (simgenin yaklaşık %80'lik orta kısmı) kalmalı, kenarlar yalnızca zemin rengiyle dolmalıdır."
      ]
    },
    {
      h: "HTML'e favicon kodu nasıl eklenir?",
      p: [
        "Dosyaları sitenin kök dizinine yükledikten sonra her sayfanın head bölümüne aşağıdaki satırları birer link etiketi olarak eklersiniz. Satırların başına açılı ayraç, sonuna kapanış ayracı konur; burada yalnızca etiketin içeriği gösterilmiştir."
      ],
      formula: "link rel=\"icon\" href=\"/favicon.ico\" sizes=\"32x32\"\nlink rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\"\nlink rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\"\nlink rel=\"manifest\" href=\"/site.webmanifest\"",
      ol: [
        "Kaynak logoyu en az 512×512 piksel, kare ve sade hâle getirin.",
        "Gerekli boyutları ve favicon.ico dosyasını üretin.",
        "Dosyaları kök dizine yükleyin; adres çubuğuna alanadınız/favicon.ico yazarak açıldığını kontrol edin.",
        "Head bölümüne yukarıdaki satırları ekleyin ve sayfayı yeni bir sekmede açın."
      ],
      after: [
        "Bütün bu dosyaları ve hazır kodu tek seferde almak için [[arac:favicon-olustur|Favicon Oluşturucu]] aracını kullanabilirsiniz; logonuzdan ya da iki harften ICO, PNG, Apple touch, manifest simgeleri ve site.webmanifest dosyasını tek zip olarak üretir ve görseliniz bilgisayarınızdan çıkmaz."
      ]
    },
    {
      h: "WordPress'te site simgesi nereden değiştirilir?",
      p: [
        "WordPress, favicon için \"Site Simgesi\" adlı ayrı bir alan sunar. Klasik temalarda yönetim panelinde Görünüm, Özelleştir ve Site Kimliği adımlarıyla bu alana ulaşılır; blok temalarında ise site editöründe site logosu bloğunun ayarlarında ya da Ayarlar, Genel sayfasında bulunur. Yüklenmesi önerilen görsel en az 512×512 piksel ve kare olmalıdır; WordPress diğer boyutları kendisi üretir ve gerekli etiketleri sayfalara ekler.",
        "Temanız ya da bir eklentiniz de ayrıca favicon ekliyorsa sayfalarda çakışan iki simge tanımı oluşabilir. Sayfa kaynağında birden fazla icon satırı görüyorsanız birini kaldırın; aksi hâlde tarayıcı hangisini kullanacağını kendi seçer."
      ]
    },
    {
      h: "Favicon neden tarayıcıda hemen görünmez?",
      p: [
        "En yaygın neden önbellektir. Tarayıcılar favicon'u sayfadan ayrı ve çok uzun süre saklar; siteyi yenilemek çoğu zaman yeni simgeyi getirmez. Sorunu çözmenin güvenilir yolu, dosya adresine bir sürüm eki eklemektir: \"/favicon.ico?v=2\" gibi. Adres değiştiği için tarayıcı dosyayı yeniden indirir.",
        "Diğer nedenler şunlardır: dosya yolu yanlıştır ya da sunucu dosyayı 404 hatasıyla döndürüyordur; içerik dağıtım ağı eski dosyayı sunuyordur; head bölümüne eklenen satır başka bir satırla çakışıyordur ya da simge görseli kare değildir. Gizli pencerede açmak önbellek etkisini ayırt etmeye yardımcı olur: gizli pencerede görünüyor, normal pencerede görünmüyorsa sorun önbellektir."
      ]
    },
    {
      h: "Google arama sonuçlarında favicon nasıl çıkar?",
      p: [
        "Google, arama sonuçlarında sitenin ana sayfasında tanımlanan simgeyi gösterir. Simgenin kare olması, en az 8×8 piksel olması ve dosyanın arama motorunun taramasına açık olması gerekir; daha net görünmesi için 48×48 pikselden büyük bir kaynak önerilir. Simge sabit bir adreste durmalı ve sık değiştirilmemelidir.",
        "Yeni eklenen ya da değiştirilen favicon'un arama sonuçlarına yansıması günler ya da haftalar sürebilir, çünkü ana sayfanın yeniden taranması beklenir. Uygunsuz ya da yanıltıcı simgeler yerine varsayılan simge gösterilebilir. Çok küçük ayrıntılar arama sonucunda 16 piksel civarında görüneceği için okunaklılık burada da belirleyicidir."
      ]
    },
    {
      h: "Koyu temada favicon nasıl okunur kalır?",
      p: [
        "Tarayıcıların ve işletim sistemlerinin koyu teması yaygınlaştıkça, açık zeminde iyi görünen siyah bir simge koyu sekme çubuğunda kaybolabiliyor. Bunun iki çözümü vardır. Birincisi simgeye dolu ve renkli bir zemin vermektir: koyu bordo zemin üzerinde beyaz harf, her iki temada da okunur. İkincisi SVG favicon içinde renk düzenini algılayan bir stil kuralı kullanmaktır; tarayıcı koyu temadaysa simgenin rengi otomatik değişir.",
        "İkinci yöntem yalnızca SVG'yi destekleyen tarayıcılarda çalıştığı için ICO ve PNG yedekleri yine de iki temada okunabilecek bir renkle hazırlanmalıdır. Test için tarayıcınızı ya da işletim sisteminizi bir kez koyu temaya alıp sekmeye bakmak yeterlidir."
      ]
    },
    {
      h: "Logodan favicon üretirken nelere dikkat edilir?",
      ul: [
        "<strong>Sadeleştirin:</strong> Uzun yazılı logolar 16 pikselde okunmaz; ilk harf, baş harfler ya da logodaki sembol kullanılır.",
        "<strong>Kontrastı yükseltin:</strong> Açık sekme çubuğunda ve koyu temada okunabilmesi için zemin ve sembol arasında güçlü renk farkı olsun.",
        "<strong>Kenar boşluğu bırakın:</strong> Sembol kareyi tamamen doldurursa küçük boyutta sıkışık görünür; birkaç piksellik nefes payı okunaklılığı artırır.",
        "<strong>İnce çizgilerden kaçının:</strong> 1 pikselden ince çizgiler küçültmede kaybolur.",
        "<strong>Saydamlığı bilinçli kullanın:</strong> Sekmede saydam zemin iyi görünür, telefon simgesinde dolu zemin gerekir.",
        "<strong>Gerçek boyutta test edin:</strong> Simgeyi 16 ve 32 pikselde görüntüleyip birkaç sekme arasında bulunabiliyor mu diye bakın."
      ]
    }
  ],
  faq: [
    ["Favicon nedir, nerede görünür?", "Favicon, sitenin tarayıcı sekmesinde, yer imlerinde, geçmiş listesinde, telefon ana ekranında ve arama sonuçlarında site adının yanında görünen küçük kare simgedir. Kullanıcıların siteyi hızla tanımasını sağlar."],
    ["Favicon hangi boyutlarda hazırlanmalı?", "Temel set 16, 32 ve 48 pikseli içeren bir favicon.ico, telefonlar için 180×180 piksellik Apple touch simgesi ve uygulama olarak yükleme için 192×192 ile 512×512 piksellik PNG dosyalarından oluşur."],
    ["ICO, PNG ve SVG favicon arasındaki fark nedir?", "ICO birden çok boyutu tek dosyada taşır ve her tarayıcıda çalışır; PNG saydamlık destekler ama her boyut ayrı dosyadır; SVG her boyutta keskindir fakat bazı tarayıcılarda desteklenmediği için yedek gerekir."],
    ["Apple touch icon ve manifest ikonları neden gerekir?", "Site ana ekrana eklendiğinde ya da uygulama olarak yüklendiğinde küçük favicon yetersiz kalır. Apple cihazlar 180 piksellik simgeyi, manifest ise 192 ve 512 piksellik simgeleri kullanarak net bir ana ekran görüntüsü sağlar."],
    ["HTML'e favicon kodu nasıl eklenir?", "Dosyaları kök dizine yükledikten sonra head bölümüne rel değeri icon, apple-touch-icon ve manifest olan link etiketleri eklenir. Her etiket ilgili dosyanın adresini href özelliğinde gösterir."],
    ["WordPress'te site simgesi nereden değiştirilir?", "Klasik temalarda Görünüm, Özelleştir, Site Kimliği yolundaki Site Simgesi alanından; blok temalarında site editöründeki logo ayarlarından ya da genel ayarlardan değiştirilir. En az 512×512 piksellik kare görsel yüklenmelidir."],
    ["Favicon neden tarayıcıda hemen görünmez?", "Tarayıcılar favicon'u uzun süre önbellekte tutar. Dosya adresine \"?v=2\" gibi bir sürüm eki eklemek, gizli pencerede kontrol etmek ve dosya yolunun 404 hatası vermediğinden emin olmak sorunu çoğu zaman çözer."],
    ["Google arama sonuçlarında favicon nasıl çıkar?", "Ana sayfada tanımlanan simge kare, en az 8×8 piksel ve taramaya açık olmalıdır; 48×48 pikselden büyük kaynak önerilir. Değişikliğin arama sonuçlarına yansıması ana sayfanın yeniden taranmasına bağlı olarak günler sürebilir."],
    ["Logodan favicon üretirken nelere dikkat edilir?", "Logo sadeleştirilmeli, tek harf ya da sembol kullanılmalı, kontrast yüksek tutulmalı ve ince çizgilerden kaçınılmalıdır. Son tasarımı 16 ve 32 piksel gerçek boyutta görüntüleyip okunaklılığını test etmek gerekir."]
  ],
  tools: ["favicon-olustur", "resim-boyutlandir", "svg-png", "jpg-png-donustur"],
  related: ["jpg-png-svg-farki"],
  sources: [
    ["Google Search Central – Arama sonuçlarında favicon tanımlama", "https://developers.google.com/search/docs/appearance/favicon-in-search"],
    ["W3C – Web Application Manifest", "https://www.w3.org/TR/appmanifest/"]
  ]
};
