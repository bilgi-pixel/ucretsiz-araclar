export default {
  slug: "pdf-word-e-cevirince-duzen-neden-bozulur",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF Word'e Çevrilince Düzen Neden Bozulur? Metin Seçilemeyen PDF",
  pageTitle: "PDF Word'e Çevrilince Düzen Neden Bozulur? Çözüm Yolları",
  description: "PDF bir sayfa görüntüsünü, Word akan metni saklar; dönüşümde düzen bu yüzden kayar. Taranmış PDF, OCR, font ve tablo sorunları ile kontrol listesi.",
  keywords: ["pdf word'e çevirince bozuluyor", "pdf'te metin seçilemiyor", "taranmış pdf word'e çevirme", "pdf düzenlenebilir hale getirme", "pdf ocr türkçe", "pdf'ten metin kopyalama", "pdf word font sorunu", "pdf tablo word bozuk"],
  lead: "PDF Word'e çevrilince düzen bozulur, çünkü PDF her harfin sayfadaki kesin konumunu saklar, Word ise paragraf ve satırlardan oluşan akan bir metin bekler; dönüştürücü bu konumlardan paragrafları ve tabloları tahmin etmek zorunda kalır. Metin hiç seçilemiyorsa PDF büyük olasılıkla taranmış bir görüntüdür ve önce OCR ile metin katmanı eklenmesi gerekir. Bu sayfada bozulmanın nedenlerini, taranmış belgeyi düzenlenebilir hale getirmeyi, font ve tablo sorunlarını ve dönüşüm sonrası kontrol listesini bulacaksınız.",
  kisaCevap: [
    "PDF sabit sayfa düzeni, Word akan metin biçimidir; dönüşüm bir yeniden yorumlamadır, birebir kopya değildir.",
    "Metin seçilemiyorsa PDF taranmış bir görüntüdür; düzenlemek için önce OCR (optik karakter tanıma) gerekir.",
    "Tablolar PDF'te çoğu zaman yalnızca çizgi ve ayrı metin parçalarıdır; dönüştürücü hücre sınırlarını tahmin eder.",
    "Font gömülü değilse ya da harf eşleme tablosu eksikse Türkçe karakterler bozuk ya da farklı yazı tipiyle çıkabilir.",
    "Yalnızca içerik gerekiyorsa metni düz olarak çıkarmak, düzeni korumaya çalışmaktan çoğu zaman daha temiz sonuç verir."
  ],
  figure: {
    alt: "Akış şeması: PDF'te metin seçilebiliyor mu sorusu. Evet ise Word'e çevir ve kontrol et, hayır ise OCR ile metin katmanı ekle; ardından düzen mi içerik mi gerektiği sorusuna göre DOCX ya da düz metin.",
    caption: "Doğru yöntem iki soruya bağlıdır: PDF'te gerçek metin var mı ve size düzen mi yoksa yalnızca içerik mi lazım? Taranmış belgede önce OCR adımı gelir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="t2"/></marker></defs>
  <text x="360" y="30" class="lg b mid">PDF'ten Word'e: hangi yol?</text>
  <rect x="250" y="50" width="220" height="50" rx="8" class="p"/>
  <text x="360" y="72" class="b mid sf">PDF'te metni fareyle</text>
  <text x="360" y="90" class="b mid sf">seçebiliyor musunuz?</text>
  <line x1="300" y1="100" x2="160" y2="140" class="st" fill="none" marker-end="url(#ok)"/>
  <line x1="420" y1="100" x2="560" y2="140" class="st" fill="none" marker-end="url(#ok)"/>
  <text x="210" y="124" class="sm b ok">Evet</text>
  <text x="510" y="124" class="sm b dg end">Hayır</text>
  <rect x="40" y="144" width="240" height="64" rx="8" class="oks"/>
  <text x="160" y="170" class="b mid">Gerçek metin var</text>
  <text x="160" y="192" class="sm mid">Dijital olarak üretilmiş PDF</text>
  <rect x="440" y="144" width="240" height="64" rx="8" class="dgs"/>
  <text x="560" y="170" class="b mid">Yalnızca görüntü var</text>
  <text x="560" y="192" class="sm mid">Taranmış belge, fotoğraf</text>
  <line x1="560" y1="208" x2="560" y2="240" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="440" y="244" width="240" height="54" rx="8" class="sf sb"/>
  <text x="560" y="266" class="b mid">OCR ile metin katmanı</text>
  <text x="560" y="286" class="sm mid t2">en az 300 dpi tarama önerilir</text>
  <line x1="440" y1="271" x2="290" y2="271" class="st" fill="none" marker-end="url(#ok)"/>
  <line x1="160" y1="208" x2="160" y2="240" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="40" y="244" width="240" height="54" rx="8" class="ps"/>
  <text x="160" y="266" class="b mid">Size ne lazım?</text>
  <text x="160" y="286" class="sm mid">düzen mi, içerik mi?</text>
  <line x1="110" y1="298" x2="110" y2="330" class="st" fill="none" marker-end="url(#ok)"/>
  <line x1="210" y1="298" x2="300" y2="330" class="st" fill="none" marker-end="url(#ok)"/>
  <rect x="20" y="334" width="190" height="66" rx="8" class="sf sb"/>
  <text x="115" y="360" class="b mid">Word (DOCX)</text>
  <text x="115" y="382" class="sm mid t2">sonra düzeni kontrol et</text>
  <rect x="240" y="334" width="200" height="66" rx="8" class="sf sb"/>
  <text x="340" y="360" class="b mid">Düz metin (TXT)</text>
  <text x="340" y="382" class="sm mid t2">biçimi kendiniz verin</text>
  <rect x="470" y="324" width="230" height="86" rx="8" class="sf sb"/>
  <text x="485" y="348" class="sm b">Bozulmanın 3 kaynağı</text>
  <text x="485" y="370" class="sm">1 Sabit konum → paragraf tahmini</text>
  <text x="485" y="388" class="sm">2 Çizgiler → tablo tahmini</text>
  <text x="485" y="406" class="sm">3 Eksik font → harf hatası</text>
</svg>`
  },
  sections: [
    {
      h: "PDF ile Word belgesi arasındaki temel fark",
      p: [
        "Word belgesi bir <strong>akış</strong> belgesidir: metin paragraflardan oluşur, sayfa kenarına gelince alt satıra kendiliğinden geçer, bir cümle eklediğinizde sonraki her şey aşağı kayar. Başlık, madde işareti, tablo ve sayfa sonu gibi yapılar belgenin içinde ayrı ayrı tanımlıdır. Word bu yapıyı bildiği için sizin yerinize sayfayı yeniden düzenleyebilir.",
        "PDF ise bir <strong>sayfa tarifi</strong> biçimidir. Amacı belgenin her cihazda aynı görünmesidir; bu yüzden çoğu PDF yalnızca \"şu harfi, şu yazı tipiyle, sayfanın şu koordinatına çiz\" talimatlarını içerir. Bir satırın paragrafın devamı mı yoksa yeni bir başlık mı olduğu, iki sütunun nerede ayrıldığı ya da bir çizgi grubunun tablo olup olmadığı çoğu zaman dosyada açıkça yazmaz.",
        "Dönüştürücü bu yüzden bir yorumcu gibi çalışır: harflerin konumlarına bakarak satırları, satırlardan paragrafları, hizalanmış metin bloklarından sütunları ve tabloları tahmin eder. Tahmin isabetli olduğunda sonuç iyi görünür, isabetsiz olduğunda paragraflar satır satır kırılır, metin kutulara bölünür ya da tablolar dağılır."
      ]
    },
    {
      h: "PDF Word'e çevrilince sayfa düzeni neden kayar?",
      p: [
        "Düzen kaymasının arkasında genellikle birkaç tanıdık neden vardır. Bunları bilmek, hangi belgede iyi sonuç bekleyebileceğinizi ve hangisinde elle düzeltme gerekeceğini önceden görmenizi sağlar."
      ],
      table: {
        head: ["Belirti", "Olası neden", "Ne yapılabilir"],
        rows: [
          ["Her satır ayrı paragraf olmuş", "PDF'te satır sonları sabit, paragraf bilgisi yok", "Word'de satır sonlarını bul-değiştir ile birleştirin"],
          ["Metin kutulara bölünmüş", "Dönüştürücü konumu korumak için çerçeve kullanmış", "Akan metin seçeneğini deneyin ya da düz metin alın"],
          ["İki sütun karışmış", "Sütun sınırı yanlış tahmin edilmiş", "Sütunları ayrı ayrı kopyalayın veya sayfa aralığıyla bölün"],
          ["Yazı tipi değişmiş", "Özgün font bilgisayarda yok ya da gömülü değil", "Benzer bir yazı tipini belgeye toplu uygulayın"],
          ["Tablo dağılmış", "Hücreler çizgi ve ayrı metinlerden oluşuyor", "Tabloyu ayrıca Excel'e aktarmayı deneyin"],
          ["Sayfa sayısı değişmiş", "Word satır aralığını ve kenar boşluğunu farklı hesaplamış", "Kenar boşluklarını ve satır aralığını özgün belgeye göre ayarlayın"]
        ]
      },
      after: [
        "Bu sorunlar dönüştürücünün kötü olduğu anlamına gelmez; PDF'in tasarım amacının doğal sonucudur. En iyi sonuç, Word ya da benzeri bir programdan doğrudan \"PDF olarak kaydet\" ile üretilmiş, tek sütunlu ve basit düzenli belgelerde alınır. Dergi sayfası gibi çok sütunlu, görsel ağırlıklı belgelerde ise elle düzeltme payı her zaman olur."
      ]
    },
    {
      h: "PDF'te metin neden seçilemiyor?",
      p: [
        "Bir PDF'i açıp fareyle metni seçmeye çalıştığınızda bütün sayfa tek bir resim gibi seçiliyorsa ya da hiçbir şey seçilmiyorsa, belgede gerçek metin yoktur. Bu durum en çok tarayıcıdan ya da telefon kamerasıyla oluşturulmuş PDF'lerde görülür. Dosya aslında sayfaların fotoğraflarını içerir; harfler sizin gözünüze metin gibi görünse de bilgisayar için yalnızca piksellerden oluşan bir görüntüdür.",
        "Metnin seçilememesinin daha seyrek ikinci nedeni izin kısıtıdır. Belgeyi hazırlayan kişi kopyalamayı kısıtlamış olabilir. Bu durumda metin aslında vardır ama okuma programı seçmeye izin vermez. Kendi belgeniz değilse bu kısıtı belge sahibinin isteği olarak kabul etmek ve gerekirse ondan kısıtsız bir kopya istemek gerekir. Kısıtların nasıl çalıştığını [[bilgi:pdf-kullanici-ve-sahip-sifresi-farki|PDF kullanıcı ve sahip şifresi farkı]] yazısında anlatıyoruz."
      ],
      ul: [
        "<strong>Hızlı test:</strong> belgede arama yapın (Ctrl+F). Görünen bir kelime bulunamıyorsa metin katmanı yoktur.",
        "<strong>Seçim testi:</strong> tek bir kelimeyi fareyle seçmeye çalışın; tüm sayfa mavi bir kutu olarak seçiliyorsa belge görüntüdür.",
        "<strong>Kopyala-yapıştır testi:</strong> seçebildiğiniz metni bir not uygulamasına yapıştırın; anlamsız karakterler çıkıyorsa font eşleme sorunu vardır."
      ]
    },
    {
      h: "Taranmış PDF nasıl düzenlenebilir hale gelir?",
      p: [
        "Taranmış bir belgeyi düzenlemenin yolu <strong>OCR</strong>, yani optik karakter tanımadır. OCR yazılımı sayfa görüntüsündeki harf şekillerini tanıyıp onları gerçek karakterlere çevirir. Sonuç iki biçimde kullanılabilir: görüntünün arkasına görünmez bir metin katmanı eklenmiş aranabilir PDF ya da doğrudan kopyalanabilir düz metin."
      ],
      ol: [
        "Mümkünse belgeyi yeniden, en az 300 dpi çözünürlükte, düz ve gölgesiz tarayın. Eğik ya da bulanık sayfa tanıma oranını belirgin biçimde düşürür.",
        "[[arac:pdf-ocr|PDF OCR]] aracına dosyayı ekleyin, dil olarak Türkçeyi seçin ve gerekiyorsa sayfa aralığını belirleyin.",
        "Çıkan aranabilir PDF'te birkaç kelime arayarak tanımanın işe yarayıp yaramadığını kontrol edin.",
        "Düzenlenebilir belge istiyorsanız bu aranabilir PDF'i [[arac:pdfden-worde|PDF'den Word'e]] aracıyla DOCX'e çevirin.",
        "Tek bir sayfa ya da fotoğraf söz konusuysa [[arac:resimden-yaziya|Resimden Yazıya]] aracı JPG ve PNG görüntülerden doğrudan metin çıkarır."
      ],
      after: [
        "Tarama kalitesinin neden bu kadar belirleyici olduğunu ve dpi değerinin ne anlama geldiğini [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "OCR Türkçe karakterleri doğru tanır mı?",
      p: [
        "Türkçe dil modeli seçildiğinde OCR, ç, ğ, ı, İ, ö, ş ve ü harflerini çoğunlukla doğru tanır. Hataların büyük kısmı dil seçiminden değil görüntü kalitesinden kaynaklanır. ı ile i arasındaki fark tek bir noktadır; düşük çözünürlükte ya da lekeli kâğıtta bu nokta kaybolursa \"bilgi\" kelimesi \"bılgı\" olarak tanınabilir. Benzer biçimde ş ile s, ğ ile g arasındaki küçük işaretler de kötü taramada kaybolabilir.",
        "OCR'ı yanlışlıkla yalnızca İngilizce dil modeliyle çalıştırmak da sık yapılan bir hatadır; bu durumda Türkçe harfler en yakın İngilizce harfe dönüştürülür. Sonuçta kelimeler okunur gibi görünse de arama ve yazım denetimi düzgün çalışmaz. Bu yüzden hem tarama kalitesine hem de dil seçimine dikkat etmek gerekir."
      ],
      ul: [
        "El yazısı, damga, imza ve süslü yazı tiplerinde tanıma oranı belirgin biçimde düşer.",
        "Çok küçük punto (8 puntonun altı) ve renkli zemin üstündeki yazılar daha fazla hata üretir.",
        "Sayfa kenarındaki gölge ve kitap cildinin oluşturduğu kavis, satırları eğerek tanımayı bozar."
      ]
    },
    {
      h: "Font gömülü değilse ne olur? Tablolar neden bozuk aktarılır?",
      p: [
        "PDF oluşturulurken kullanılan yazı tipleri dosyanın içine gömülebilir ya da yalnızca adlarıyla anılabilir. Font gömülüyse PDF her bilgisayarda aynı görünür; ancak Word'e çevrildiğinde Word yine o yazı tipini bilgisayarınızda arar. Bulamazsa benzer bir yazı tipiyle değiştirir; bu da satır uzunluklarını, dolayısıyla sayfa düzenini değiştirir. Daha ciddi sorun, bazı PDF'lerde harflerin şekli ile hangi karaktere karşılık geldiği arasındaki eşleme tablosunun eksik olmasıdır. Bu belgelerde ekranda doğru görünen \"ş\" kopyalandığında başka bir simge olarak çıkabilir.",
        "Tablolar ise PDF'te çoğu zaman bir \"tablo\" olarak tanımlı değildir. Ekranda gördüğünüz tablo; yatay ve dikey çizgilerden, bunların arasına konumlandırılmış ayrı metin parçalarından oluşur. Dönüştürücü bu parçalardan hücreleri yeniden kurmaya çalışır. Birleştirilmiş hücreler, çok satırlı hücre içerikleri ve çizgisiz tablolar bu tahmini zorlaştırır. Tablo verisi sizin için asıl önemli kısımsa onu Excel'e ayrı aktarmak genellikle daha temiz sonuç verir; yöntemleri [[bilgi:pdf-tabloyu-excele-aktarma|PDF tablosunu Excel'e aktarma]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "PDF'ten yalnızca metni almak daha mı iyi?",
      p: [
        "Birçok durumda evet. Bir raporun içeriğini yeni bir şablona taşıyacaksanız, bir sözleşmedeki maddeleri alıntılayacaksanız ya da metni bir çeviri programına vereceksiniz, özgün düzeni korumaya çalışmak gereksiz iş yaratır. Düz metin olarak çıkarıp biçimi kendiniz vermek, dağılmış metin kutularını tek tek düzeltmekten çok daha hızlıdır.",
        "[[arac:pdf-metin-cikar|PDF Metin Çıkar]] aracı sayfa aralığı seçmenize ve kırık satırları paragraf halinde birleştirmenize izin verir; sonucu TXT ya da sade bir Word belgesi olarak alabilirsiniz. Belgenin görünümünü birebir koruması gereken durumlarda ise PDF'i hiç çevirmeden, üzerine not ve imza ekleyerek kullanmak daha doğrudur."
      ],
      table: {
        head: ["İhtiyaç", "Önerilen yol"],
        rows: [
          ["Metni yeni bir belgeye taşımak", "Düz metin çıkar, biçimi yeniden ver"],
          ["Birkaç kelimeyi düzeltip yeniden PDF almak", "Word'e çevir, düzelt, tekrar PDF kaydet"],
          ["Taranmış belgede arama yapabilmek", "OCR ile aranabilir PDF üret, çevirme"],
          ["Tablodaki rakamlarla hesap yapmak", "Tabloyu Excel'e aktar"],
          ["Görünümü birebir korumak", "PDF olarak bırak; gerekiyorsa not ekle"]
        ]
      }
    },
    {
      h: "Dönüşüm sonrası yapılması gereken kontroller",
      ol: [
        "<strong>Sayfa sayısını karşılaştırın:</strong> Word belgesi özgünden belirgin biçimde uzun ya da kısaysa satır aralığı veya kenar boşlukları farklıdır.",
        "<strong>Türkçe karakterleri arayın:</strong> ı, ş, ğ harflerini içeren birkaç kelimeyi aratın; bulunamıyorsa karakter hatası vardır.",
        "<strong>Sayıları tek tek doğrulayın:</strong> özellikle tutar, tarih ve kimlik bilgisi içeren alanlarda OCR hatası ciddi sonuç doğurabilir.",
        "<strong>Tabloları satır satır kontrol edin:</strong> kayan bir hücre bütün sütunu yanlış satıra bağlayabilir.",
        "<strong>Başlık ve madde yapısını düzeltin:</strong> başlıkları Word'ün başlık stilleriyle yeniden işaretlemek içindekiler tablosu ve erişilebilirlik için önemlidir.",
        "<strong>Gizli kalıntıları temizleyin:</strong> dönüşümde boş metin kutuları ve fazladan sayfa sonları oluşabilir; Word'ün biçim işaretlerini göster seçeneğiyle bunları görebilirsiniz."
      ],
      after: [
        "Resmî bir belgeyi düzenleyip yeniden kullanacaksanız, özgün belgenin hukuki niteliğini değiştirmemeye dikkat edin. Kurumların düzenlediği belgeleri değiştirmek yerine, gerekiyorsa kurumdan güncel bir belge istemek doğru yoldur."
      ]
    }
  ],
  faq: [
    ["PDF Word'e çevrilince sayfa düzeni neden kayar?", "PDF her harfin sayfadaki kesin konumunu saklar, paragraf ve tablo bilgisini çoğu zaman içermez. Dönüştürücü bu konumlardan yapıyı tahmin eder; tahmin isabetsiz olduğunda satırlar kırılır, sütunlar karışır ve sayfa sayısı değişir."],
    ["PDF'te metin neden seçilemiyor?", "En yaygın neden belgenin taranmış bir görüntü olmasıdır; sayfada harf değil piksel vardır. Daha seyrek olarak belge sahibi kopyalamayı kısıtlamış olabilir; bu durumda sahibinden kısıtsız kopya istemek gerekir."],
    ["Taranmış PDF nasıl düzenlenebilir hale gelir?", "Önce OCR ile sayfa görüntüsündeki harfler tanınır ve belgeye metin katmanı eklenir. Ardından bu aranabilir PDF Word'e çevrilebilir ya da metin doğrudan kopyalanabilir; en az 300 dpi tarama iyi sonuç verir."],
    ["OCR Türkçe karakterleri doğru tanır mı?", "Türkçe dil seçildiğinde ve tarama kaliteli olduğunda büyük ölçüde doğru tanır. Düşük çözünürlükte ı ile i, ş ile s gibi tek işaretle ayrılan harfler karışabilir; sonucu mutlaka okuyarak kontrol edin."],
    ["Tablolar Word'e neden bozuk aktarılır?", "PDF'teki tablolar çoğu zaman çizgilerden ve aralarına yerleştirilmiş ayrı metin parçalarından oluşur. Dönüştürücü hücreleri yeniden kurmaya çalışır; birleştirilmiş ya da çok satırlı hücrelerde bu tahmin sık sık şaşar."],
    ["Font gömülü değilse ne olur?", "Word özgün yazı tipini bulamazsa benzer bir fontla değiştirir; satır uzunlukları ve sayfa düzeni değişir. Harf eşleme tablosu eksik PDF'lerde ise kopyalanan Türkçe harfler anlamsız simgelere dönüşebilir."],
    ["PDF'ten yalnızca metni almak daha mı iyi?", "İçeriği yeni bir şablona taşıyacak, alıntı yapacak ya da çevirecekseniz evet. Düz metni alıp biçimi kendiniz vermek, dağılmış metin kutularını tek tek düzeltmekten genellikle daha hızlı ve temizdir."],
    ["Dönüşüm sonrası hangi kontroller yapılmalı?", "Sayfa sayısını, Türkçe karakterli kelimeleri, tutar ve tarih gibi sayıları, tablo satırlarını ve başlık yapısını kontrol edin. Özellikle OCR'dan geçmiş belgelerde rakam hataları kolay gözden kaçar."],
    ["Dönüştürme sırasında dosyam bir sunucuya gönderiliyor mu?", "Bilişim Ajans araçlarında hayır. PDF'den Word'e, OCR ve metin çıkarma işlemleri tarayıcınızda çalışır; dosya bilgisayarınızdan çıkmaz ve sayfayı kapattığınızda bellekten silinir."]
  ],
  tools: ["pdfden-worde", "pdf-ocr", "resimden-yaziya", "pdf-metin-cikar"],
  related: ["pdf-tabloyu-excele-aktarma", "dpi-ve-cozunurluk-nedir", "pdf-kullanici-ve-sahip-sifresi-farki"]
};
