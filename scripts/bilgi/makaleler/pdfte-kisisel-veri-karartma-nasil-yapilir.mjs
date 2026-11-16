export default {
  slug: "pdfte-kisisel-veri-karartma-nasil-yapilir",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'te Kişisel Veri Nasıl Karartılır? KVKK İçin Gerçek Redaksiyon",
  pageTitle: "PDF'te Kişisel Veri Karartma: KVKK İçin Gerçek Redaksiyon",
  description: "PDF'te siyah kutu çizmek metni silmez; kopyala-yapıştırla geri gelir. Gerçek karartma için sayfa görüntüye çevrilir. KVKK, taranmış belge, meta veri ve kontrol.",
  keywords: ["pdf karartma", "pdf redaksiyon", "pdf'te bilgi gizleme", "kvkk belge karartma", "tc kimlik no gizleme pdf", "siyah kutu altında metin", "pdf'ten metin silme", "pdf meta veri temizleme"],
  lead: "PDF'te kişisel veri karartma (redaksiyon), gizlenecek bilginin belgeden <strong>gerçekten silinmesi</strong> ve yerine opak bir alan bırakılmasıdır. Metnin üstüne siyah dikdörtgen çizmek bu değildir: dikdörtgen ayrı bir çizim nesnesidir ve altındaki metin dosyada durmaya devam eder, kopyala-yapıştırla ya da metin çıkarma aracıyla geri gelir. Güvenilir yöntem, karartılacak sayfayı <strong>görüntüye çevirip</strong> kutuyu piksellere işlemek ve meta verileri temizlemektir. Bu sayfada KVKK bağlamını, yöntemin neden işe yaradığını, taranmış belgelerdeki tuzakları ve göndermeden önceki kontrol adımlarını anlatıyoruz.",
  kisaCevap: [
    "Redaksiyon, bilginin görünümünü değil kendisini kaldırmaktır; karartılan alanın altında okunabilir veri kalmamalıdır.",
    "Siyah kutu, vurgulama, beyaz yazı rengi ya da yorum katmanı metni silmez; metin katmanı dosyada kalır.",
    "Sayfa görüntüye çevrilip kutu piksellere işlendiğinde o sayfada kopyalanabilir metin kalmaz.",
    "Arama yapılabilir (OCR'lı) taranmış PDF'lerde görüntünün arkasında görünmez bir metin katmanı vardır; o da temizlenmelidir.",
    "Yazar, başlık, oluşturan program gibi meta veriler ve eski kayıt sürümleri kişisel bilgi taşıyabilir.",
    "KVKK, verilerin amaçla sınırlı ve ölçülü işlenmesini ve veri sorumlusunun gerekli güvenlik tedbirlerini almasını ister."
  ],
  figure: {
    alt: "PDF katmanları şeması: üstte siyah kutu çizilen sahte karartmada metin katmanı altta duruyor ve kopyala-yapıştırla TC kimlik numarası geri geliyor; altta gerçek karartmada sayfa görüntüye çevrilmiş, kutu piksellere işlenmiş, metin katmanı yok.",
    caption: "Sahte karartmada siyah kutu metnin üstünde ayrı bir katmandır; metin seçilip kopyalandığında bilgi aynen çıkar. Gerçek karartmada sayfa görüntü olarak yeniden oluşturulur ve karartılan alan yalnızca siyah piksellerden ibarettir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Siyah kutu ile gerçek karartma arasındaki fark</text>
  <text x="40" y="62" class="b dg">Sahte karartma: kutu ayrı bir katman</text>
  <rect x="60" y="120" width="300" height="70" rx="4" class="sf sb"/>
  <text x="80" y="150" class="sm">Ad Soyad: <tspan class="b">Ayşe Yılmaz</tspan></text>
  <text x="80" y="174" class="sm">T.C. Kimlik No: <tspan class="b">1234 5678 901</tspan></text>
  <text x="372" y="160" class="sm t2">metin katmanı</text>
  <rect x="80" y="82" width="300" height="70" rx="4" class="sf sb dash"/>
  <rect x="180" y="134" width="120" height="16" class="t"/>
  <rect x="200" y="162" width="110" height="16" class="t"/>
  <text x="392" y="100" class="sm t2">çizim katmanı (kutu)</text>
  <rect x="470" y="96" width="220" height="80" rx="8" class="dgs"/>
  <text x="580" y="122" class="b mid dg">Kopyala-yapıştır</text>
  <text x="580" y="146" class="sm mid">\"Ayşe Yılmaz</text>
  <text x="580" y="164" class="sm mid">1234 5678 901\"</text>
  <line x1="40" y1="220" x2="680" y2="220" class="sb dash" fill="none"/>
  <text x="40" y="252" class="b ok">Gerçek karartma: sayfa görüntüye çevrilir</text>
  <rect x="60" y="270" width="300" height="70" rx="4" class="oks"/>
  <text x="80" y="300" class="sm">Ad Soyad:</text>
  <rect x="150" y="288" width="120" height="16" class="t"/>
  <text x="80" y="324" class="sm">T.C. Kimlik No:</text>
  <rect x="180" y="312" width="110" height="16" class="t"/>
  <text x="372" y="310" class="sm t2">tek görüntü (150–200 dpi)</text>
  <rect x="470" y="262" width="220" height="80" rx="8" class="oks"/>
  <text x="580" y="288" class="b mid ok">Kopyala-yapıştır</text>
  <text x="580" y="312" class="sm mid">metin yok</text>
  <text x="580" y="330" class="sm mid">siyah alan = siyah piksel</text>
  <rect x="40" y="360" width="640" height="46" rx="8" class="sf sb"/>
  <rect x="40" y="360" width="8" height="46" class="a"/>
  <text x="62" y="388" class="sm">Ayrıca: meta verileri temizleyin, dosyayı yeni bir kopya olarak kaydedin, orijinali göndermeyin.</text>
</svg>`
  },
  sections: [
    {
      h: "PDF'te kişisel veri karartma (redaksiyon) nedir?",
      p: [
        "Redaksiyon, bir belgeyi paylaşmadan önce paylaşılmaması gereken bilgilerin belgeden çıkarılmasıdır. Kişisel veriler (ad-soyad, T.C. kimlik numarası, adres, telefon, IBAN, sağlık bilgisi), ticari sırlar ya da üçüncü kişilere ait bilgiler bu kapsamdadır. Karartılan alan genellikle siyah ya da beyaz bir kutuyla gösterilir; böylece okuyucu orada bir bilginin bulunduğunu, ama kasıtlı olarak çıkarıldığını anlar.",
        "Redaksiyonun tanımındaki kilit kelime \"çıkarmak\"tır. Ekranda görünmeyen ama dosyanın içinde duran bilgi, redakte edilmiş sayılmaz. Kamuya açıklanan mahkeme kararlarından ihale dosyalarına kadar pek çok belgede, kutunun altındaki metnin basit bir kopyalamayla ortaya çıktığı vakalar bu ayrımın önemini gösterir."
      ]
    },
    {
      h: "Üzerine siyah kutu çizmek neden yeterli değildir?",
      p: [
        "Bir PDF dosyası tek bir resim değil, katmanlardan oluşan bir yapıdır. Dijital olarak oluşturulmuş bir PDF'te her harf, yazı tipi bilgisi ve Unicode karşılığıyla birlikte bir <strong>metin nesnesi</strong> olarak saklanır. Bir PDF düzenleyicide ya da Word'de metnin üzerine siyah dikdörtgen çizdiğinizde dosyaya yeni bir <strong>çizim nesnesi</strong> eklenir; altındaki metin nesnesi silinmez. Ekrana bakınca kapalı görünür, ama dosyanın içinde bilgi olduğu gibi durur.",
        "Aşağıdaki yöntemlerin hepsinde aynı sorun vardır:"
      ],
      ul: [
        "<strong>Siyah dikdörtgen ya da şekil çizmek:</strong> Metin altta kalır.",
        "<strong>Siyah vurgulama (highlight):</strong> Yorum katmanıdır; kaldırılabilir ya da yok sayılabilir.",
        "<strong>Yazı rengini beyaz ya da siyah yapmak:</strong> Metin yerinde durur, yalnızca rengi değişir.",
        "<strong>Metni bir resimle kapatıp aynı dosyayı kaydetmek:</strong> Resim üstte, metin altta kalır.",
        "<strong>Word'de gizli biçimlendirme ya da beyaz kutu, sonra PDF'e aktarma:</strong> Aktarım sırasında metin çoğu zaman PDF'e taşınır.",
        "<strong>Ek açıklama (yorum) olarak kutu eklemek:</strong> Yorumlar ayrı bir katmandır, gizlenebilir ya da silinebilir."
      ]
    },
    {
      h: "Karartılan metin kopyala-yapıştırla geri gelir mi?",
      p: [
        "Yukarıdaki yöntemlerden biriyle \"karartılmış\" bir PDF'te evet, büyük olasılıkla gelir. Okuyucu kutunun bulunduğu satırı fareyle seçip kopyaladığında, panoya kutunun altındaki metin gelir ve bir not defterine yapıştırıldığında okunur. Tüm sayfayı seçip kopyalamak ya da bir metin çıkarma aracı kullanmak da aynı sonucu verir. Arama kutusuna T.C. kimlik numarasının ilk haneleri yazıldığında belge o noktayı bulup vurgular.",
        "Bunu kendi dosyanızda denemenin en kolay yolu, karartılmış PDF'i [[arac:pdf-metin-cikar|PDF Metin Çıkarma]] aracında açmak ya da sayfada Ctrl+A ile tüm metni seçip boş bir belgeye yapıştırmaktır. Gizlediğiniz bilgi çıkan metinde görünüyorsa karartma başarısızdır."
      ]
    },
    {
      h: "Görüntüye çevirmek neden işe yarar?",
      p: [
        "Gerçek redaksiyonun iki yolu vardır: ya PDF'in içindeki metin nesneleri işaretli bölgede tek tek silinir ve yerine opak bir dolgu konur, ya da sayfa bütünüyle <strong>görüntüye (rasterleştirme)</strong> çevrilip kutu bu görüntünün piksellerine işlenir. İkinci yöntem en sağlam olanıdır: sayfa artık yalnızca piksellerden oluşan bir resimdir; karartılan bölge siyah piksellerden ibarettir ve altında okunacak bir metin ya da gizli nesne kalmaz.",
        "Bu yöntemin bedeli de açıktır: görüntüye çevrilen sayfada metin seçilemez, aranamaz ve ekran okuyucular tarafından okunamaz; dosya boyutu da büyüyebilir. Bu yüzden yalnızca karartma yapılan sayfaları görüntüye çevirmek ve diğer sayfaları olduğu gibi bırakmak iyi bir dengedir. 150 dpi çoğu belge için ekranda ve baskıda yeterli netlik verir; küçük yazılı belgelerde 200 dpi tercih edilebilir.",
        "[[arac:pdf-karart|PDF Karartma]] aracı tam olarak bu yaklaşımı izler: işaretlediğiniz sayfaları seçtiğiniz çözünürlükte görüntüye çevirir, kutuları opak siyah olarak boyar, işaretlenmemiş sayfaları değiştirmeden kopyalar ve isteğe bağlı olarak meta verileri temizler. T.C. kimlik numarası, TR IBAN, e-posta ve telefon desenlerini dijital PDF'in metin katmanında otomatik bulup kutuya dönüştürebilir; işlem tamamen tarayıcınızda yapılır, dosya sunucuya gitmez."
      ]
    },
    {
      h: "KVKK kapsamında hangi bilgiler gizlenmeli?",
      p: [
        "6698 sayılı Kişisel Verilerin Korunması Kanunu'na göre kişisel veri, kimliği belirli ya da belirlenebilir gerçek kişiye ilişkin her türlü bilgidir. Kanun, verilerin işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmasını ister. Bir belgeyi paylaşırken amaç için gerekmeyen kişisel verileri karartmak bu ilkenin pratik uygulamasıdır. Kanun ayrıca veri sorumlusuna, verilerin hukuka aykırı erişime karşı korunması için gerekli teknik ve idari tedbirleri alma yükümlülüğü getirir; kutunun altından okunabilen bir T.C. kimlik numarası bu tedbirin alınmadığını gösterir."
      ],
      table: {
        head: ["Veri türü", "Örnek", "Not"],
        rows: [
          ["Kimlik bilgileri", "Ad-soyad, T.C. kimlik no, doğum tarihi, imza", "Belgenin amacı için gerekli değilse gizleyin"],
          ["İletişim bilgileri", "Adres, telefon, e-posta", "Üçüncü kişilere ait olanlar özellikle"],
          ["Finansal bilgiler", "IBAN, hesap no, maaş, kart bilgisi", "Bordro ve dekontlarda sık sızar"],
          ["Özel nitelikli veriler", "Sağlık, din, mezhep, sendika üyeliği, ceza mahkûmiyeti, biyometrik veri", "KVKK md. 6 kapsamında daha sıkı korunur"],
          ["Dolaylı tanımlayıcılar", "Plaka, sicil no, öğrenci no, fotoğraf", "Tek başına ya da birlikte kişiyi belirleyebilir"]
        ],
        caption: "Hangi bilginin gizleneceği belgenin amacına ve alıcısına göre değişir; şüpheli durumlarda kurumunuzun KVKK sorumlusuna ya da bir hukukçuya danışın."
      }
    },
    {
      h: "Taranmış belgede karartma nasıl yapılır?",
      p: [
        "Taranmış bir belge çoğu zaman zaten görüntüdür; metin katmanı yoksa, üzerine çizilen kutu ile görüntü birleştirildiğinde bilgi gerçekten kapanır. Ancak iki tuzak vardır. Birincisi, kutu ayrı bir nesne olarak eklenip görüntüyle birleştirilmeden kaydedilirse kutu kaldırılabilir ve alttaki taranmış görüntü görünür. İkincisi, birçok tarayıcı ve uygulama taranmış belgeye OCR uygulayıp görüntünün arkasına <strong>görünmez bir metin katmanı</strong> ekler; bu sayede belge aranabilir olur. Bu katman ekranda görünmez, ama kopyalanabilir ve aranabilir.",
        "Çözüm yine sayfayı kutuyla birlikte yeniden görüntüye çevirmektir; bu işlem hem gizli OCR katmanını hem ayrı kutu nesnesini ortadan kaldırır. Otomatik desen arama yalnızca metin katmanı olan dosyalarda çalışır; metin katmanı olmayan taranmış belgelerde karartılacak bölgeleri elle çizmeniz gerekir. Karartılmış sayfanın yeniden aranabilir olması gerekiyorsa çıktıyı [[arac:resimden-yaziya|Resimden Yazıya (OCR)]] aracından geçirebilir, sonucu mutlaka gözden geçirebilirsiniz. Ekran görüntüsü ve fotoğraflardaki bilgiler için [[arac:resim-bulaniklastir|Resim Bulanıklaştırma]] aracı vardır; ancak bulanıklaştırma yerine düz siyah kutu tercih edin, çünkü zayıf bulanıklaştırma ve pikselleştirme bazen kısmen okunabilir kalır."
      ]
    },
    {
      h: "PDF meta verisi kişisel bilgi taşır mı?",
      p: [
        "Evet. PDF dosyaları görünen içeriğin dışında birçok ek bilgi taşır: yazar adı, başlık, konu, anahtar kelimeler, oluşturan ve dönüştüren program, oluşturma ve değiştirme tarihi. Bu alanlar çoğu zaman belgeyi hazırlayan bilgisayarın kullanıcı adını ya da kişinin tam adını içerir. Bazı dosyalarda ayrıca XMP biçiminde genişletilmiş meta veri, ekli dosyalar, yer imleri, form alanları ve gizlenmiş katmanlar bulunur.",
        "Bir başka risk de artımlı kaydetmedir: bazı PDF düzenleyiciler değişiklikleri dosyanın sonuna ekleyerek kaydeder ve önceki sürüm dosyanın içinde kalır. Bu yüzden karartmadan sonra dosyayı \"yeni bir kopya olarak\" üretmek, eski içeriğin taşınmamasını sağlar. Meta verileri görmek ve silmek için [[arac:pdf-meta-temizle|PDF Meta Veri Temizleme]] aracını kullanabilirsiniz; fotoğraflardaki konum bilgisi için [[bilgi:fotograftaki-konum-bilgisi-nasil-silinir|konum bilgisi silme makalesine]] bakın."
      ]
    },
    {
      h: "Karartmanın başarılı olduğu nasıl kontrol edilir?",
      ol: [
        "<strong>Doğru dosyayı açın:</strong> Kontrolü orijinal dosyada değil, karartılmış çıktıda yapın.",
        "<strong>Tümünü seçip kopyalayın:</strong> Ctrl+A ve Ctrl+C ile metni bir not defterine yapıştırın; gizlenen bilgi görünmemeli.",
        "<strong>Arama yapın:</strong> Ctrl+F ile T.C. kimlik numarasının birkaç hanesini, IBAN'ın ilk haneleri ya da kişinin soyadını arayın.",
        "<strong>Metin çıkarma aracını deneyin:</strong> Dosyayı bir metin çıkarma aracında açın ve çıktıyı okuyun.",
        "<strong>Meta verilere bakın:</strong> Belge özelliklerinde yazar, başlık ve konu alanları boş ya da nötr olmalı.",
        "<strong>Tüm sayfaları gözden geçirin:</strong> Aynı bilgi başka bir sayfada, üst bilgide, alt bilgide, imza blokunda ya da ekte tekrar ediyor olabilir.",
        "<strong>Yakınlaştırın:</strong> Kutunun kenarlarından taşan harf parçaları ya da gölgeler kalmadığından emin olun."
      ],
      after: [
        "Bu kontrollerin hepsinden geçen dosyayı paylaşın; orijinal dosyayı gönderilecek klasörden kaldırın ki yanlışlıkla eklenmesin. Şifreleme ve meta veri temizliğini de kapsayan adım adım bir yol için [[rehber:pdf-sifreleme-ve-gizlilik|PDF şifreleme, karartma ve meta veri temizleme rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Mahkemeye sunulacak belgede karartma kuralları nelerdir?",
      p: [
        "Yargı mercilerine sunulan belgelerde karartma, hem kişisel verilerin korunması hem de delilin bütünlüğü açısından dikkat ister. Genel olarak davayla ilgisi olmayan üçüncü kişilerin kişisel verilerini (örneğin bir ekstrede başka işlemlerin karşı taraflarını ya da bir yazışmada konuyla ilgisiz kişilerin iletişim bilgilerini) ölçülü biçimde karartmak mümkündür. Ancak uyuşmazlığın konusunu oluşturan bilgileri karartmak, belgenin delil değerini zayıflatabilir ve mahkeme belgenin karartılmamış aslını isteyebilir.",
        "Bu nedenle mahkemeye sunulacak belgelerde hangi bilgilerin karartılacağına vekil avukatla birlikte karar verilmesi, karartma yapıldığının belgede ya da dilekçede belirtilmesi ve karartılmamış aslın gerektiğinde ibraz edilmek üzere saklanması önerilir. Kişisel veri içeren belgelerin kamuya açık ortamlarda paylaşılmasında ise KVKK hükümleri ayrıca dikkate alınmalıdır."
      ],
      note: "Bu sayfa genel bilgi verir, hukuki danışmanlık değildir. Kurumsal belge paylaşımında KVKK uyum sorumlunuza, yargı süreçlerinde avukatınıza danışın."
    }
  ],
  faq: [
    ["PDF'te kişisel veri karartma (redaksiyon) nedir?", "Redaksiyon, paylaşılmaması gereken bilginin belgeden gerçekten çıkarılması ve yerine opak bir alan bırakılmasıdır. Bilginin yalnızca görünümünü kapatmak redaksiyon sayılmaz; dosyanın içinde okunabilir veri kalmamalıdır."],
    ["Üzerine siyah kutu çizmek neden yeterli değildir?", "Siyah kutu PDF'e ayrı bir çizim nesnesi olarak eklenir ve altındaki metin nesnesi silinmez. Metin seçilip kopyalandığında, aratıldığında ya da bir metin çıkarma aracıyla okunduğunda bilgi aynen ortaya çıkar."],
    ["Karartılan metin kopyala-yapıştırla geri gelir mi?", "Kutu, vurgulama ya da beyaz yazı rengiyle yapılan karartmalarda büyük olasılıkla geri gelir. Sayfa görüntüye çevrilip kutu piksellere işlendiğinde ise o sayfada metin katmanı kalmadığı için kopyalanacak bir şey yoktur."],
    ["KVKK kapsamında hangi bilgiler gizlenmeli?", "Belgenin amacı için gerekmeyen kimlik, iletişim ve finansal bilgiler ile sağlık, din, sendika üyeliği, ceza mahkûmiyeti gibi özel nitelikli veriler gizlenmelidir. KVKK verilerin amaçla sınırlı ve ölçülü işlenmesini ister."],
    ["Taranmış belgede karartma nasıl yapılır?", "Bölgeler elle işaretlenir ve sayfa kutuyla birlikte yeniden görüntüye çevrilir. Bu işlem, OCR uygulanmış taranmış belgelerdeki görünmez metin katmanını ve ayrı duran kutu nesnesini de ortadan kaldırır."],
    ["PDF meta verisi kişisel bilgi taşır mı?", "Evet. Yazar, başlık, konu, oluşturan program ve tarih alanları çoğu zaman kişi adı ya da kullanıcı adı içerir. Artımlı kaydetmede eski sürümler de dosyada kalabildiğinden karartma sonrası yeni bir kopya üretmek ve meta veriyi temizlemek gerekir."],
    ["Karartmanın başarılı olduğu nasıl kontrol edilir?", "Karartılmış çıktıda tüm metni seçip bir not defterine yapıştırın, gizlenen bilgiyi aratın, bir metin çıkarma aracında açın ve belge özelliklerine bakın. Aynı bilginin başka sayfalarda tekrar etmediğini de kontrol edin."],
    ["Mahkemeye sunulacak belgede karartma kuralları nelerdir?", "Davayla ilgisiz üçüncü kişilerin verileri ölçülü biçimde karartılabilir, ancak uyuşmazlık konusu bilgileri karartmak delil değerini zayıflatabilir ve mahkeme aslını isteyebilir. Karara avukatla birlikte varılması ve aslın saklanması önerilir."],
    ["Karartılan sayfa neden aranamıyor?", "Gerçek karartma için sayfa görüntüye çevrildiğinden metin katmanı ortadan kalkar; bu bilinçli bir sonuçtur. Sayfanın aranabilir olması gerekiyorsa çıktı bir OCR aracından geçirilebilir, ancak ortaya çıkan metin gözden geçirilmelidir."]
  ],
  tools: ["pdf-karart", "pdf-meta-temizle", "pdf-metin-cikar", "resim-bulaniklastir", "resimden-yaziya"],
  related: ["fotograftaki-konum-bilgisi-nasil-silinir", "pdf-a-nedir-arsiv-pdf-farki", "tc-kimlik-numarasi-algoritmasi"],
  sources: [
    ["Kişisel Verileri Koruma Kurumu", "https://www.kvkk.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – 6698 sayılı Kişisel Verilerin Korunması Kanunu", "https://www.mevzuat.gov.tr/"]
  ],
  uyari: "hukuki danışmanlık yerine geçmez; KVKK uyumu ve yargı süreçleri için uzmana danışın"
};
