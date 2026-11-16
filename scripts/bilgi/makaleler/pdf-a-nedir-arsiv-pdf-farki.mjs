export default {
  slug: "pdf-a-nedir-arsiv-pdf-farki",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF/A Nedir? Normal PDF ile Farkı ve Resmî Kurumlar Neden İster",
  pageTitle: "PDF/A Nedir? Arşiv PDF ile Normal PDF Farkı",
  description: "PDF/A, yıllar sonra da aynı görünmesi için yazı tiplerini gömen, şifre ve JavaScript'i yasaklayan ISO 19005 arşiv biçimidir. A-1, A-2, A-3 farkı ve kaydetme yolu.",
  keywords: ["pdf/a nedir", "pdf a formatı", "arşiv pdf", "pdf/a dönüştürme", "pdf/a-1b pdf/a-2b farkı", "pdf sürümleri", "pdf yazı tipi gömme", "word pdf/a kaydetme"],
  lead: "PDF/A, belgenin onlarca yıl sonra da <strong>bugünkü gibi açılıp aynı görünmesi</strong> için tasarlanmış, ISO 19005 standardıyla tanımlanan arşiv amaçlı PDF biçimidir. Normal PDF'ten farkı, görüntü için gereken her şeyi (yazı tipleri, renk tanımları, resimler) dosyanın içinde taşıması ve şifre, JavaScript, dış bağlantılı içerik gibi gelecekte sorun çıkarabilecek özellikleri yasaklamasıdır. Bu sayfada PDF/A'nın neden istendiğini, A-1, A-2, A-3 ve A-4 sürümlerinin farkını, a-b-u uyumluluk düzeylerini, Word'den PDF/A kaydetmeyi ve dosyanın PDF/A olup olmadığını anlamayı bulacaksınız.",
  kisaCevap: [
    "PDF/A, ISO 19005 standardının adıdır; \"A\" harfi arşiv (archive) anlamına gelir.",
    "PDF/A'da tüm yazı tipleri dosyaya gömülmek zorundadır; bilgisayarda yazı tipi olmasa da metin aynı görünür.",
    "PDF/A'da parola ile şifreleme, JavaScript, ses-video ve dışarıdan yüklenen içerik yasaktır.",
    "PDF/A-1 (2005) PDF 1.4'e, PDF/A-2 (2011) ve A-3 (2012) PDF 1.7'ye, PDF/A-4 (2020) PDF 2.0'a dayanır.",
    "Harf sonekleri uyumluluk düzeyidir: b temel görünüm, u ek olarak Unicode metin, a ek olarak erişilebilir yapı ister.",
    "Dosyanın PDF/A olduğu bilgisi XMP üst verisinde saklanır; üst veriyi silmek bu bildirimi de siler."
  ],
  figure: {
    alt: "Normal PDF ile PDF/A karşılaştırması: normal PDF yazı tipini bilgisayardan çağırabilir, şifre ve JavaScript içerebilir; PDF/A yazı tipini, renk profilini ve üst veriyi dosyanın içinde taşır, şifre ve JavaScript içermez.",
    caption: "Normal PDF, görüntünün bir kısmı için açıldığı bilgisayara güvenebilir. PDF/A ise kendi kendine yeterlidir: gereken her şey dosyanın içindedir, gelecekte çalışmayabilecek özellikler yasaktır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Normal PDF ile PDF/A</text>
  <rect x="20" y="50" width="330" height="290" rx="10" class="sf sb"/>
  <text x="185" y="80" class="b lg mid">Normal PDF</text>
  <g class="sm">
    <rect x="40" y="98" width="290" height="34" rx="6" class="dgs"/><text x="54" y="120">Yazı tipi gömülmeyebilir</text>
    <rect x="40" y="140" width="290" height="34" rx="6" class="dgs"/><text x="54" y="162">Parola ile şifrelenebilir</text>
    <rect x="40" y="182" width="290" height="34" rx="6" class="dgs"/><text x="54" y="204">JavaScript, ses, video olabilir</text>
    <rect x="40" y="224" width="290" height="34" rx="6" class="dgs"/><text x="54" y="246">Dış kaynaktan içerik çağırabilir</text>
    <rect x="40" y="266" width="290" height="34" rx="6" class="sf sb"/><text x="54" y="288">Üst veri isteğe bağlı</text>
  </g>
  <text x="185" y="326" class="sm mid mu">Görüntü açılan bilgisayara bağlı olabilir</text>
  <rect x="370" y="50" width="330" height="290" rx="10" class="ps"/>
  <text x="535" y="80" class="b lg mid p">PDF/A (ISO 19005)</text>
  <g class="sm">
    <rect x="390" y="98" width="290" height="34" rx="6" class="oks"/><text x="404" y="120">Tüm yazı tipleri gömülü</text>
    <rect x="390" y="140" width="290" height="34" rx="6" class="oks"/><text x="404" y="162">Şifreleme yok</text>
    <rect x="390" y="182" width="290" height="34" rx="6" class="oks"/><text x="404" y="204">JavaScript ve çoklu ortam yok</text>
    <rect x="390" y="224" width="290" height="34" rx="6" class="oks"/><text x="404" y="246">Renk profili (çıktı amacı) gömülü</text>
    <rect x="390" y="266" width="290" height="34" rx="6" class="oks"/><text x="404" y="288">XMP üst verisi ve PDF/A bildirimi zorunlu</text>
  </g>
  <text x="535" y="326" class="sm mid">Dosya kendi kendine yeterli</text>
  <g class="sm mid">
    <rect x="20" y="356" width="160" height="50" rx="8" class="p"/><text x="100" y="378" class="sf b">PDF/A-1</text><text x="100" y="396" class="sf">2005 · PDF 1.4</text>
    <rect x="193" y="356" width="160" height="50" rx="8" class="p"/><text x="273" y="378" class="sf b">PDF/A-2</text><text x="273" y="396" class="sf">2011 · PDF 1.7</text>
    <rect x="366" y="356" width="160" height="50" rx="8" class="p"/><text x="446" y="378" class="sf b">PDF/A-3</text><text x="446" y="396" class="sf">2012 · ek dosya</text>
    <rect x="540" y="356" width="160" height="50" rx="8" class="p"/><text x="620" y="378" class="sf b">PDF/A-4</text><text x="620" y="396" class="sf">2020 · PDF 2.0</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "PDF/A nedir, normal PDF'ten farkı ne?",
      p: [
        "PDF, bir belgeyi hangi bilgisayarda açılırsa açılsın aynı görünsün diye geliştirilmiş bir biçimdir. Ancak bu vaat her zaman tam tutulmaz: yazı tipi dosyaya gömülmemişse görüntüleyici benzer bir yazı tipiyle yer değiştirir, satırlar kayar; renkler cihazdan cihaza farklı yorumlanır; dışarıdan çağrılan bir görsel yıllar sonra bulunamaz.",
        "<strong>PDF/A</strong>, bu riskleri ortadan kaldırmak için PDF'in özelliklerinden bir alt küme seçer ve bazı kuralları zorunlu kılar. Uluslararası Standartlar Örgütü bunu <strong>ISO 19005</strong> numarasıyla yayımlamıştır. Bir PDF/A dosyası teknik olarak yine bir PDF'tir; her PDF okuyucu onu açabilir. Fark, dosyanın içinde neyin bulunmasının zorunlu, neyin bulunmasının yasak olduğundadır.",
        "Kısacası normal PDF \"bugün güzel görünmeyi\", PDF/A ise \"yarın da aynı görünmeyi\" hedefler. Bu yüzden arşivlenecek sözleşmeler, kararlar, tez ve raporlar, faturalar ve resmî yazışmalar için tercih edilir."
      ]
    },
    {
      h: "Resmî kurumlar ve mahkemeler neden PDF/A ister?",
      p: [
        "Kamu kurumları, mahkemeler ve arşivler belgeleri yıllarca, bazen süresiz saklamak zorundadır. Bir dava dosyasındaki dilekçenin on yıl sonra açıldığında farklı görünmesi, bir sayfanın boş çıkması ya da şifre sorması kabul edilemez. PDF/A bu belirsizliği ortadan kaldırdığı için elektronik belge yönetimi ve arşiv sistemlerinde uzun süreli saklama biçimi olarak sıkça istenir.",
        "İkinci neden doğrulanabilirliktir. PDF/A kuralları makine tarafından denetlenebilir; bir doğrulayıcı dosyayı tarayıp \"uyumlu\" ya da \"şu kural ihlal ediliyor\" diyebilir. Kurumlar böylece binlerce dosyayı tek tek açmadan kontrol edebilir.",
        "Hangi alt sürümün (örneğin PDF/A-1b ya da PDF/A-2b) istendiği kurumdan kuruma değişebilir. Bir başvuru ya da dosya yükleme ekranında PDF/A şartı görüyorsanız ilgili kurumun kılavuzundaki sürüm ve dosya boyutu sınırını mutlaka kontrol edin."
      ]
    },
    {
      h: "PDF/A-1, A-2, A-3 ve A-4 arasındaki fark",
      p: [
        "Standart yıllar içinde dört ana bölümle genişledi. Yeni bölümler eskilerini geçersiz kılmaz; PDF/A-1 dosyası bugün de geçerli bir arşiv dosyasıdır. Farklar, izin verilen PDF özelliklerindedir."
      ],
      table: {
        head: ["Bölüm", "Yıl", "Dayandığı PDF", "Öne çıkan fark"],
        rows: [
          ["PDF/A-1", "2005", "PDF 1.4", "Saydamlık ve JPEG 2000 yok; en katı ve en yaygın desteklenen sürüm"],
          ["PDF/A-2", "2011", "PDF 1.7", "Saydamlık, katmanlar, JPEG 2000 sıkıştırma; yalnızca PDF/A ekler"],
          ["PDF/A-3", "2012", "PDF 1.7", "A-2'ye ek olarak her türlü dosya eklenebilir (XML, tablo vb.)"],
          ["PDF/A-4", "2020", "PDF 2.0", "PDF 2.0 tabanı; uyumluluk düzeyleri sadeleştirildi"]
        ]
      },
      after: [
        "PDF/A-3'ün ek dosya izni özellikle e-fatura gibi alanlarda kullanılır: insanın okuyacağı görüntü PDF olarak, makinenin okuyacağı veri ise XML eki olarak aynı dosyada taşınır. Ancak arşivci açısından ek dosyanın kendisi PDF/A kurallarına tabi değildir; yıllar sonra açılabileceği garanti edilmez."
      ]
    },
    {
      h: "Uyumluluk düzeyleri: PDF/A-1b, 2u, 1a ne demek?",
      p: [
        "Sürüm numarasından sonra gelen küçük harf, dosyanın standarda ne ölçüde uyduğunu gösterir. Üç düzey vardır ve her biri bir öncekinin üzerine kural ekler."
      ],
      table: {
        head: ["Düzey", "Anlamı", "Ne garanti eder?"],
        rows: [
          ["b (basic)", "Temel", "Görünüm yıllar sonra da birebir aynı kalır"],
          ["u (unicode)", "Unicode", "b'ye ek olarak metin doğru şekilde aranabilir ve kopyalanabilir"],
          ["a (accessible)", "Erişilebilir", "u'ya ek olarak başlık, paragraf, tablo yapısı etiketlidir; ekran okuyucular okuyabilir"]
        ]
      },
      after: [
        "Taranmış belgeler genellikle <strong>b</strong> düzeyinde kalır; çünkü sayfa bir resimdir ve metin yapısı yoktur. OCR ile görünmez metin katmanı eklenirse arama yapılabilir hâle gelir. Türkçe karakterlerin aramada doğru çalışması için u ya da a düzeyi daha uygundur; bu konuda [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 farkı]] yazısı arka planı açıklar."
      ]
    },
    {
      h: "Yazı tipi gömme neden zorunludur?",
      p: [
        "Bir PDF'te metin, harf kodları ve bu harflerin hangi yazı tipiyle çizileceği bilgisiyle saklanır. Yazı tipi dosyaya gömülmemişse, görüntüleyici bilgisayarda aynı adlı yazı tipini arar; bulamazsa benzer bir yazı tipini kullanır. Harf genişlikleri farklı olduğu için satırlar uzar ya da kısalır, tablolar taşar, Türkçe harfler kutucuk ya da soru işareti olarak görünebilir.",
        "PDF/A bu riski tamamen kaldırmak için kullanılan her yazı tipinin, en azından belgede geçen harflerinin dosyaya gömülmesini şart koşar. Yazı tipi lisansı gömmeye izin vermiyorsa o belge PDF/A olarak kaydedilemez; bu durumda gömülmeye izin veren başka bir yazı tipi seçmek gerekir."
      ]
    },
    {
      h: "PDF/A'da şifre, JavaScript ve bağlantılar kullanılabilir mi?",
      ul: [
        "<strong>Parola ve şifreleme:</strong> Yasaktır. Arşivdeki dosyanın parolası yıllar sonra bilinmeyebilir; bu da belgeyi kalıcı olarak erişilmez kılar. Gizlilik gerekiyorsa koruma dosya düzeyinde değil, arşiv sisteminin erişim yetkileriyle sağlanır.",
        "<strong>JavaScript ve çalıştırılabilir içerik:</strong> Yasaktır. Hem güvenlik riski taşır hem de gelecekteki okuyucuların aynı kodu çalıştıracağı garanti edilemez.",
        "<strong>Ses, video ve 3B içerik:</strong> Yasaktır; görüntülenebilirliği uzun vadede güvence altına alınamaz.",
        "<strong>Dış içerik:</strong> Dosyanın dışından çağrılan resim ya da yazı tipi yasaktır. Web bağlantıları ise metin içinde tıklanabilir köprü olarak bulunabilir; bağlantının hedefi belgenin parçası sayılmaz.",
        "<strong>Elektronik imza:</strong> İzinlidir. İmza belgeyi şifrelemez, yalnızca bütünlüğünü ve imzalayanı doğrular."
      ],
      after: [
        "Parola korumalı bir PDF'i PDF/A'ya çevirmek için önce yetkili olarak parolayı kaldırmanız gerekir. Bu bilgiler, dosyayı [[arac:pdf-ac|PDF Aç]] aracında açtığınızda parola sorulup sorulmadığına bakarak da hızlıca kontrol edilebilir."
      ]
    },
    {
      h: "Word belgesi PDF/A olarak nasıl kaydedilir?",
      p: [
        "Masaüstü kelime işlemcilerin çoğunda PDF/A seçeneği \"PDF olarak kaydet\" ya da \"Dışa aktar\" penceresinin seçenekler bölümünde bulunur. Genel adımlar şöyledir:"
      ],
      ol: [
        "Belgeyi açın ve kullanılan yazı tiplerinin bilgisayarınızda kurulu olduğundan emin olun.",
        "Dosya menüsünden \"Farklı Kaydet\" ya da \"Dışa Aktar\" seçeneğine gidin ve biçim olarak PDF'i seçin.",
        "\"Seçenekler\" düğmesine tıklayın ve \"ISO 19005 uyumlu (PDF/A)\" kutusunu işaretleyin; bazı programlarda sürüm (A-1b, A-2b) de seçilebilir.",
        "Belge şifreleme seçeneğinin kapalı olduğunu kontrol edin; PDF/A seçildiğinde çoğu program bunu otomatik kapatır.",
        "Kaydedin ve dosyayı bir PDF okuyucuda açarak üst kısımda \"PDF/A kipinde görüntüleniyor\" benzeri bir uyarı çıkıp çıkmadığına bakın."
      ],
      after: [
        "Bilişim Ajans'ın [[arac:wordden-pdfe|Word'den PDF'e]] aracı tarayıcıda hızlı ve standart bir PDF üretir; ancak PDF/A doğrulaması gerektiren resmî başvurularda kelime işlemcinizin PDF/A seçeneğini kullanmanız ya da kurumun önerdiği dönüştürücüyle doğrulama yapmanız daha güvenlidir."
      ]
    },
    {
      h: "PDF'in sürümü ve PDF/A olup olmadığı nasıl öğrenilir?",
      p: [
        "Her PDF dosyası ilk satırında bir sürüm bilgisi taşır: \"%PDF-1.4\", \"%PDF-1.7\" ya da \"%PDF-2.0\" gibi. Bu satır, okuyucu programların belge özellikleri penceresinde \"PDF sürümü\" olarak gösterilir. Ancak sürüm numarası tek başına dosyanın PDF/A olduğunu kanıtlamaz.",
        "PDF/A bildirimi, dosyanın içindeki XMP üst verisinde \"pdfaid:part\" (sürüm, ör. 1 ya da 2) ve \"pdfaid:conformance\" (düzey, ör. B ya da A) alanlarıyla yapılır. Okuyucu programlar bu alanı gördüğünde belgeyi PDF/A kipinde açar ve genellikle bir bilgi çubuğu gösterir.",
        "Önemli bir uyarı: [[arac:pdf-meta-temizle|PDF Üst Veri Temizleme]] gibi araçlarla XMP üst verisini tamamen silerseniz PDF/A bildirimi de silinir ve dosya artık PDF/A olarak tanınmaz. Arşiv dosyasında yazar adı gibi bir alanı gizlemeniz gerekiyorsa üst veriyi tamamen silmek yerine yalnızca ilgili alanı düzenleyin."
      ]
    },
    {
      h: "PDF/A dosya boyutunu büyütür mü?",
      p: [
        "Çoğu zaman biraz büyütür. Gömülen yazı tipleri, renk profili ve üst veri dosyaya genellikle birkaç on ile birkaç yüz kilobayt ekler. Birden fazla yazı tipi ve kalın-italik çeşitleri kullanılan belgelerde artış daha belirgindir. Taranmış belgelerde ise boyutu asıl belirleyen resimlerdir; yazı tipi etkisi önemsiz kalır.",
        "Dosya boyutu sınırı olan sistemlerde önce resimlerin çözünürlüğünü makul bir düzeye (metin belgeleri için 200–300 dpi) indirip sonra PDF/A'ya dönüştürmek en temiz yoldur. PDF/A dosyasını sonradan küçültmek mümkündür ama küçültme aracı PDF/A kurallarını korumayabilir; [[arac:pdf-kucult|PDF Küçültme]] sonrasında dosyanın hâlâ PDF/A olarak tanınıp tanınmadığını kontrol edin. Boyut hesapları için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri rehberi]] yardımcı olabilir."
      ]
    }
  ],
  faq: [
    ["PDF/A nedir, normal PDF'ten farkı ne?", "PDF/A, ISO 19005 ile tanımlanan arşiv amaçlı PDF biçimidir. Normal PDF'ten farkı, yazı tipi ve renk profili gibi görüntü için gereken her şeyi dosyada taşıması, şifre ve JavaScript gibi gelecekte sorun çıkarabilecek özellikleri ise yasaklamasıdır."],
    ["Resmî kurumlar ve mahkemeler neden PDF/A ister?", "Belgeler yıllarca saklanır ve her açılışta aynı görünmesi gerekir. PDF/A kuralları bunu garanti eder ve makineyle doğrulanabilir; bu sayede kurumlar çok sayıda dosyayı tek tek açmadan arşive uygun olup olmadığını denetleyebilir."],
    ["PDF/A-1, A-2 ve A-3 arasındaki fark nedir?", "PDF/A-1 PDF 1.4'e dayanır ve saydamlığa izin vermez. PDF/A-2 PDF 1.7 tabanlıdır, saydamlık ve JPEG 2000 sıkıştırmayı destekler. PDF/A-3 ise A-2'ye ek olarak XML ya da tablo gibi her türlü dosyanın eklenmesine izin verir."],
    ["Yazı tipi gömme neden zorunludur?", "Yazı tipi gömülmezse belge başka bir bilgisayarda benzer bir yazı tipiyle gösterilir; satırlar kayar, tablolar bozulur, Türkçe harfler yanlış görünebilir. Gömülü yazı tipi, belgenin her cihazda ve yıllar sonra da aynı görünmesini sağlar."],
    ["PDF/A'da şifre ve JavaScript kullanılabilir mi?", "Hayır. Şifre yıllar sonra bilinmeyebileceği için belgeyi erişilmez kılabilir, JavaScript ise güvenlik riski taşır ve gelecekte çalışacağı garanti edilemez. Elektronik imza ise belgeyi şifrelemediği için PDF/A dosyasında kullanılabilir."],
    ["Word belgesi PDF/A olarak nasıl kaydedilir?", "Farklı Kaydet ya da Dışa Aktar penceresinde biçim olarak PDF seçilir, ardından Seçenekler bölümündeki ISO 19005 uyumlu (PDF/A) kutusu işaretlenir. Kaydedilen dosya bir PDF okuyucuda açıldığında PDF/A kipinde görüntülendiğine dair uyarı çıkmalıdır."],
    ["PDF'in sürümü nasıl öğrenilir?", "PDF okuyucunun belge özellikleri penceresi PDF sürümünü gösterir; bu bilgi dosyanın ilk satırında da yazar. PDF/A olup olmadığı ise XMP üst verisindeki pdfaid alanlarıyla belirlenir ve okuyucu programlar bunu bir bilgi çubuğuyla bildirir."],
    ["PDF/A dosya boyutunu büyütür mü?", "Genellikle biraz büyütür, çünkü yazı tipleri, renk profili ve üst veri dosyaya eklenir. Artış çoğu belgede birkaç yüz kilobaytı geçmez; taranmış belgelerde ise boyutu asıl olarak resimlerin çözünürlüğü belirler."],
    ["PDF/A dosyasının üst verisini silebilir miyim?", "XMP üst verisini tamamen silerseniz dosyanın PDF/A olduğunu bildiren alanlar da silinir ve okuyucular onu artık PDF/A olarak tanımaz. Yalnızca yazar adı gibi belirli alanları düzenlemek, arşiv uyumluluğunu korumanın daha güvenli yoludur."]
  ],
  tools: ["pdf-ac", "wordden-pdfe", "pdf-meta-temizle", "pdf-kucult"],
  related: ["ascii-unicode-utf8-farki", "gb-kac-mb-veri-birimleri"],
  sources: [
    ["ISO – ISO 19005 (PDF/A) standart ailesi", "https://www.iso.org/"]
  ]
};
