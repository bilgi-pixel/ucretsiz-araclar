export default {
  slug: "pdf-tabloyu-excele-aktarma",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'teki Tablo Excel'e Nasıl Aktarılır? Hesap Dökümü ve Fiyat Listesi",
  pageTitle: "PDF Tabloyu Excel'e Aktarma: Hesap Dökümü ve Fiyat Listesi",
  description: "PDF'teki tabloyu elektronik tabloya aktarmanın yolları: metin katmanlı PDF, taranmış belge ve OCR, sütun kayması, ondalık virgül sorunu, CSV mi XLSX mi, doğrulama.",
  keywords: ["pdf tabloyu excel'e aktarma", "pdf excel'e çevirme", "hesap ekstresi excel", "pdf fiyat listesi excel", "pdf'ten tablo kopyalama", "sütunlar kayıyor", "csv'ye aktarma", "taranmış pdf tablo"],
  lead: "PDF'teki bir tabloyu elektronik tablo programına aktarmanın en güvenilir yolu, <strong>PDF'in metin katmanından satır ve sütunları ayıran bir dönüştürücü kullanıp sonucu XLSX ya da CSV olarak almaktır</strong>; düz kopyala–yapıştır çoğu zaman bütün satırı tek hücreye döker. Önce PDF'in gerçek metin mi yoksa taranmış görüntü mü olduğunu anlamanız gerekir: taranmış belgede önce OCR ile metin katmanı oluşturulur. Bu sayfada hesap dökümü ve fiyat listesi örnekleriyle adımları, sütun kayması ve ondalık ayırıcı sorunlarının çözümünü, aktarılan verinin nasıl doğrulanacağını bulacaksınız.",
  kisaCevap: [
    "PDF'te tablo diye bir yapı yoktur; sayfada belirli koordinatlara yerleştirilmiş metin parçaları vardır, sütunları dönüştürücü yeniden kurar.",
    "Metni fareyle seçebiliyorsanız PDF metin katmanlıdır ve doğrudan dönüştürülebilir; seçemiyorsanız önce OCR gerekir.",
    "Kopyala–yapıştırda sütunlar tek hücreye düşer, çünkü panoya hücre sınırı değil, boşluklarla ayrılmış düz metin gider.",
    "Türkçe ayarlı elektronik tablo programında ondalık ayırıcı virgüldür; 1,250.50 gibi noktalı değerler metin olarak kalabilir.",
    "Ham veri ve başka sisteme aktarım için CSV, biçim ve birden fazla sayfa için XLSX daha uygundur.",
    "Aktarımdan sonra satır sayısını ve sütun toplamlarını PDF'teki ara toplamlarla mutlaka karşılaştırın."
  ],
  figure: {
    alt: "PDF tablosunu elektronik tabloya aktarma karar akışı: metin seçilebiliyor mu sorusuna göre doğrudan dönüştürme ya da önce OCR, ardından sütun ayarı, CSV veya XLSX çıktı ve toplam kontrolü.",
    caption: "Karar akışı: önce PDF'in türünü belirleyin. Metin katmanı varsa doğrudan sütun ayırmaya geçin; taranmışsa önce OCR uygulayın. Her iki yol da toplam kontrolüyle biter.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="pk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="st"/></marker></defs>
  <text x="360" y="30" class="lg b mid">PDF tablosu elektronik tabloya nasıl geçer?</text>
  <rect x="235" y="50" width="250" height="50" rx="10" class="p"/>
  <text x="360" y="81" class="b mid sf">Metni fareyle seçebiliyor musunuz?</text>
  <line x1="300" y1="100" x2="160" y2="140" class="st" fill="none" marker-end="url(#pk)"/>
  <line x1="420" y1="100" x2="560" y2="140" class="st" fill="none" marker-end="url(#pk)"/>
  <text x="200" y="124" class="sm ok b">Evet</text>
  <text x="510" y="124" class="sm dg b">Hayır</text>
  <rect x="40" y="144" width="240" height="64" rx="10" class="oks"/>
  <text x="160" y="170" class="b mid">Metin katmanlı PDF</text>
  <text x="160" y="192" class="sm mid">doğrudan dönüştürülür</text>
  <rect x="440" y="144" width="240" height="64" rx="10" class="dgs"/>
  <text x="560" y="170" class="b mid">Taranmış (görüntü) PDF</text>
  <text x="560" y="192" class="sm mid">önce OCR ile metin katmanı</text>
  <line x1="560" y1="208" x2="430" y2="246" class="st" fill="none" marker-end="url(#pk)"/>
  <line x1="160" y1="208" x2="290" y2="246" class="st" fill="none" marker-end="url(#pk)"/>
  <rect x="210" y="250" width="300" height="50" rx="10" class="sf sb"/>
  <text x="360" y="272" class="b mid">Sütun ayraçlarını yerleştir</text>
  <text x="360" y="291" class="sm mid mu">tarih | açıklama | tutar | bakiye</text>
  <line x1="360" y1="300" x2="360" y2="322" class="st" fill="none" marker-end="url(#pk)"/>
  <rect x="210" y="326" width="140" height="44" rx="8" class="ps"/>
  <text x="280" y="353" class="b mid">CSV</text>
  <rect x="370" y="326" width="140" height="44" rx="8" class="ps"/>
  <text x="440" y="353" class="b mid">XLSX</text>
  <rect x="40" y="386" width="640" height="42" rx="8" class="sf sb"/>
  <rect x="40" y="386" width="8" height="42" class="p"/>
  <text x="62" y="413" class="sm">Kontrol: 48 satır ve tutar toplamı PDF'teki dönem toplamıyla aynı mı?</text>
</svg>`
  },
  sections: [
    {
      h: "PDF'te tablo neden kolayca kopyalanmaz?",
      p: [
        "PDF, belgenin her cihazda aynı görünmesi için tasarlanmış bir sayfa tanımlama biçimidir. Elektronik tablodaki gibi satır, sütun ve hücre bilgisi taşımaz; yalnızca \"şu metin parçası, sayfanın şu koordinatına, şu yazı tipiyle yazılacak\" bilgisini taşır. Gözünüzün tablo olarak gördüğü şey, aynı hizaya yerleştirilmiş metin parçaları ve aralarına çizilmiş çizgilerden ibarettir.",
        "Bu yüzden PDF'ten tablo aktarmak aslında bir yeniden kurma işidir. Dönüştürücü, metin parçalarının yatay konumuna bakarak hangisinin hangi sütuna, dikey konumuna bakarak hangisinin hangi satıra ait olduğunu tahmin eder. Düzenli aralıklı bir fiyat listesinde bu tahmin kolaydır; birleştirilmiş başlıklar, iki satıra taşan açıklamalar ve sayfa ortasında biten tablolarda zorlaşır.",
        "İşe başlamadan önce PDF'in hangi tür olduğunu belirlemeniz gerekir. Belge açıkken metni fareyle seçip kopyalayabiliyorsanız metin katmanı vardır. Seçim yapamıyorsanız ya da seçtiğinizde bütün sayfa tek bir resim gibi işaretleniyorsa belge taranmıştır ve önce OCR gerekir."
      ]
    },
    {
      h: "Kopyala–yapıştırda sütunlar neden tek hücreye düşer?",
      p: [
        "PDF görüntüleyicisinden kopyaladığınızda panoya hücre sınırları değil, satır satır düz metin gider. Sütunlar arasındaki boşluk çoğu zaman tek bir boşluk karakterine dönüşür. Elektronik tablo programı bu metni yapıştırırken bir sütun ayırıcısı göremediği için her satırı tek hücreye yerleştirir.",
        "Kısa listelerde programın \"metni sütunlara dönüştür\" özelliğiyle boşluk ya da sabit genişlik ayırıcı seçerek bu sorunu kısmen düzeltebilirsiniz. Ancak açıklama sütununda kelimeler arasında da boşluk olduğu için \"Market alışverişi 125,40\" gibi bir satır üç parçaya bölünür. Uzun ve çok sütunlu tablolarda bu yüzden konum bazlı çalışan bir dönüştürücü daha az el emeği ister."
      ],
      table: {
        head: ["Yöntem", "Uygun olduğu durum", "Zayıf yanı"],
        rows: [
          ["Kopyala–yapıştır", "Birkaç satırlık, tek sütunlu liste", "Sütunlar tek hücreye düşer"],
          ["Metni sütunlara dönüştür", "Boşluksuz kod ve sayılardan oluşan tablo", "Açıklamalı satırlarda bölünme"],
          ["Konum bazlı PDF dönüştürücü", "Hesap dökümü, fiyat listesi, stok listesi", "Birleştirilmiş hücrelerde elle düzeltme"],
          ["Önce OCR, sonra dönüştürme", "Taranmış ya da fotoğrafı çekilmiş belge", "Tanıma hataları, özellikle 0/O ve 1/l"],
          ["Kaynaktan veri istemek", "Bankadan ya da tedarikçiden düzenli veri", "Karşı tarafa bağlısınız"]
        ]
      }
    },
    {
      h: "Adım adım: metin katmanlı PDF'teki tabloyu aktarmak",
      ol: [
        "PDF'i [[arac:pdf-excel|PDF'den Excel'e Çevir]] aracında açın. Araç dosyayı tarayıcınızda işler; belge hiçbir sunucuya yüklenmez.",
        "Tablonun bulunduğu sayfaları seçin. Kapak, açıklama ve yasal metin sayfalarını dışarıda bırakmak sonucu sadeleştirir.",
        "Önizlemede sütun ayraçlarını sürükleyerek her sütunun sınırını belirleyin. Tarih, açıklama, tutar ve bakiye gibi sütunların başlıklarının ayraçlar arasında kaldığını kontrol edin.",
        "Başlık satırının her sayfada tekrar ettiği belgelerde, tekrarlayan başlıkları sonradan filtreyle silmek üzere not edin.",
        "Çıktı biçimini seçin: başka bir yazılıma aktaracaksanız CSV, kendiniz çalışacaksanız XLSX.",
        "Dosyayı elektronik tablo programında açıp aşağıdaki doğrulama adımlarını uygulayın."
      ],
      after: [
        "Bu araç basit, düzenli tablolar için tasarlanmış bir beta özelliğidir. Birleştirilmiş başlıklar ya da iç içe tablolar içeren karmaşık raporlarda sonucu mutlaka gözle kontrol edin. Yalnızca metni almak istiyorsanız [[arac:pdf-metin-cikar|PDF'den Metin Çıkar]] aracı satırları düz metin hâlinde verir."
      ]
    },
    {
      h: "Banka hesap dökümü elektronik tabloya nasıl alınır?",
      p: [
        "En temiz yol, verinin kaynağına gitmektir. Bankaların internet şubelerinin çoğu hesap hareketlerini PDF'in yanı sıra elektronik tablo ya da CSV biçiminde de indirme seçeneği sunar. Bu seçenek varsa PDF'le uğraşmadan doğrudan tablo dosyasını alın; sayılar zaten sayı olarak gelir.",
        "Elinizde yalnızca PDF ekstre varsa, metin katmanlı olduğunu kontrol edip yukarıdaki adımları uygulayın. Hesap dökümlerinde dikkat edilmesi gereken noktalar şunlardır: açıklama sütunu sık sık iki satıra taşar, borç ve alacak tutarları ayrı sütunlarda ya da eksi işaretiyle tek sütunda olabilir, her sayfanın sonunda \"devreden bakiye\" satırı bulunabilir."
      ],
      ul: [
        "<strong>İki satıra taşan açıklama:</strong> Aktarımdan sonra tarihi boş olan satırları bir üstteki satırın açıklamasıyla birleştirin.",
        "<strong>Devreden bakiye satırları:</strong> Toplama girmemeleri için filtreyle bulup silin ya da ayrı bir sütunla işaretleyin.",
        "<strong>Eksi işareti:</strong> Bazı ekstrelerde eksi işareti tutarın sonunda (125,40-) yazılır; bunu formülle başa almanız gerekir.",
        "<strong>Kişisel veri:</strong> Dökümü başkasıyla paylaşacaksanız hesap numarası ve kimlik bilgilerini önceden karartın."
      ],
      after: [
        "<strong>Çözümlü kontrol örneği:</strong> Bir aylık ekstrede PDF'in alt kısmında \"Dönem içi toplam harcama: 18.742,35 TL\" ve 48 işlem yazıyor olsun. Aktarımdan sonra tutar sütununda yalnızca eksi değerleri toplayan bir formül de 18.742,35 TL vermeli ve işlem satırı sayısı 48 olmalıdır. Toplam 18.617,35 TL çıkıyorsa aradaki 125,00 TL'lik fark büyük olasılıkla metin olarak kalmış ya da iki satıra bölünmüş bir işlemdir."
      ]
    },
    {
      h: "Taranmış tablodan veri çıkarılabilir mi?",
      p: [
        "Evet, ama arada bir adım daha vardır. Taranmış PDF aslında sayfaların fotoğrafıdır; içinde seçilebilir metin yoktur. Önce optik karakter tanıma (OCR) ile görüntüdeki harfler metne çevrilir. [[arac:pdf-ocr|PDF OCR]] aracı belgeye görünmez bir metin katmanı ekler; bu katman oluştuktan sonra belge metin katmanlı PDF gibi dönüştürülebilir.",
        "OCR'ın doğruluğu taramanın kalitesine bağlıdır. 300 dpi civarında, düz ve gölgesiz taranmış belgelerde sonuç iyidir. Eğik, buruşuk ya da telefonla açılı çekilmiş sayfalarda rakam hataları artar. Tablolarda en sık karışan karakterler 0 ile O, 1 ile l ya da I, 5 ile S ve 8 ile B'dir. Fiyat listesi ve ekstre gibi sayıların önemli olduğu belgelerde OCR sonucunu mutlaka toplamlarla doğrulayın."
      ]
    },
    {
      h: "Ondalık ayırıcı (virgül/nokta) sorunu nasıl çözülür?",
      p: [
        "Türkçe bölge ayarlarında ondalık ayırıcı virgül, binlik ayırıcı noktadır: 1.250,50. İngilizce ayarlarda ise tersi geçerlidir: 1,250.50. PDF'teki sayı biçimi bilgisayarınızın bölge ayarıyla uyuşmuyorsa elektronik tablo programı sayıyı tanımaz ve metin olarak bırakır. Metin hâlindeki hücreler sola yaslanır, toplama girmez ve formüller hata verir.",
        "Çözüm, sayıları programa tanıtmaktır. Yabancı biçimli bir listede önce binlik ayırıcı olan virgülleri silip ardından noktayı virgüle çevirmek, ya da içe aktarma sırasında ondalık ve binlik ayırıcıyı elle seçmek gerekir. CSV ile çalışıyorsanız ayraç karakterinin (noktalı virgül, virgül ya da sekme) ve dosya kodlamasının da doğru seçilmesi önemlidir; [[arac:csv-excel|CSV ↔ Excel Dönüştürücü]] ayraç ve kodlamayı otomatik algılar."
      ],
      table: {
        head: ["PDF'teki yazım", "Türkçe ayarlı programda", "Yapılacak işlem"],
        rows: [
          ["1.250,50", "Sayı olarak tanınır", "İşlem gerekmez"],
          ["1,250.50", "Metin kalır", "Virgülü sil, noktayı virgüle çevir"],
          ["1250.50", "Metin ya da tarih sanılabilir", "Noktayı virgüle çevir"],
          ["125,40-", "Metin kalır", "Sondaki eksiyi başa al"],
          ["₺ 1.250,50", "Metin kalabilir", "Para birimi simgesini sil, biçimi sonra uygula"]
        ]
      },
      after: [
        "CSV dosyalarındaki ayraç ve kodlama karmaşasını daha ayrıntılı anlatan [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV dosyası nedir ve nasıl açılır]] yazısına, Türkçe harflerin bozulması durumunda [[bilgi:turkce-karakter-sorunu-nasil-duzeltilir|Türkçe karakter sorunu]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "CSV mi XLSX mi tercih edilmeli?",
      p: [
        "CSV (virgülle ayrılmış değerler) yalnızca ham veriyi taşır: biçim, renk, formül ya da birden fazla sayfa yoktur. Bu sadelik onu muhasebe programlarına, e-ticaret panellerine ve veritabanlarına aktarım için ideal kılar. Buna karşılık açıldığı bilgisayarın bölge ayarına göre farklı yorumlanabilir.",
        "XLSX ise elektronik tablo programının kendi biçimidir. Sayı biçimlerini, sütun genişliklerini, formülleri ve birden fazla çalışma sayfasını korur. Veriyi siz analiz edecek, başkasıyla paylaşacak ya da yazdıracaksanız XLSX daha az sürpriz çıkarır. Kural basittir: makineye CSV, insana XLSX."
      ]
    },
    {
      h: "Birleştirilmiş hücreli tablolar neden bozulur?",
      p: [
        "Birleştirilmiş başlıklar (örneğin iki sütunun üstüne yazılmış \"2025 Fiyatları\") PDF'te tek bir metin parçasıdır ve iki sütunun ortasına denk gelir. Dönüştürücü bu metni ya sütunlardan birine ya da ayrı bir sütuna yerleştirir. Benzer biçimde, birden fazla satıra yayılan grup adları (\"Toner\", \"Drum\" gibi ürün grupları) yalnızca ilk satırda görünür, alt satırlarda boş kalır.",
        "En pratik yöntem, başlık satırlarını aktarım dışında bırakıp başlıkları elektronik tabloda kendiniz yazmaktır. Grup adı yalnızca ilk satırda olan listelerde boş hücreleri bir üstteki değerle doldurmak için programın \"boşlukları doldur\" yaklaşımını ya da basit bir formülü kullanabilirsiniz. Fiyat listelerinde ayrıca KDV dahil ve hariç fiyatların ayrı sütunlarda olup olmadığını kontrol edin."
      ]
    },
    {
      h: "Aktarılan veriler nasıl doğrulanır?",
      ol: [
        "<strong>Satır sayısı:</strong> PDF'teki işlem ya da ürün sayısıyla tablodaki satır sayısını karşılaştırın.",
        "<strong>Toplam kontrolü:</strong> PDF'te ara toplam ya da genel toplam varsa tablodaki toplamla aynı olmalıdır.",
        "<strong>Metin kalan sayılar:</strong> Sayı sütununda sola yaslanmış hücreleri arayın; bunlar toplama girmemiştir.",
        "<strong>Rastgele örnek:</strong> Baştan, ortadan ve sondan birkaç satırı PDF'le tek tek karşılaştırın.",
        "<strong>Sayfa geçişleri:</strong> Sayfa sonlarında tekrar eden başlıkların ve bölünen satırların temizlendiğinden emin olun.",
        "<strong>Tarih biçimi:</strong> 03.04.2026 gibi tarihlerin 4 Mart değil 3 Nisan olarak okunduğunu kontrol edin."
      ]
    }
  ],
  faq: [
    ["PDF'teki tablo Excel'e nasıl aktarılır?", "PDF metin katmanlıysa konum bazlı bir dönüştürücüyle sayfaları seçip sütun ayraçlarını belirleyerek XLSX ya da CSV alırsınız. Taranmış belgede önce OCR ile metin katmanı oluşturulur, sonra aynı adımlar uygulanır."],
    ["Kopyala–yapıştırda sütunlar neden tek hücreye düşer?", "PDF'ten kopyalanan metin panoya hücre sınırları olmadan, boşluklarla ayrılmış düz satırlar olarak gider. Elektronik tablo programı bir ayırıcı göremediği için her satırı tek bir hücreye yerleştirir."],
    ["Banka hesap dökümü Excel'e nasıl alınır?", "Önce internet şubesinde hareketleri tablo ya da CSV olarak indirme seçeneği olup olmadığına bakın. Yalnızca PDF varsa dönüştürücüyle aktarın, ardından işlem sayısını ve dönem toplamını PDF'tekiyle karşılaştırarak doğrulayın."],
    ["Taranmış tablodan veri çıkarılabilir mi?", "Evet. Taranmış belgeye önce OCR uygulanarak görünmez bir metin katmanı eklenir, ardından tablo dönüştürülür. Tarama kalitesi düşükse rakam hataları olabileceği için toplamlarla kontrol şarttır."],
    ["Ondalık ayırıcı (virgül/nokta) sorunu nasıl çözülür?", "Türkçe ayarlarda ondalık virgül, binlik noktadır. Noktalı ondalık içeren yabancı biçimli sayılarda binlik virgülleri silip noktayı virgüle çevirin ya da içe aktarırken ayırıcıları elle seçin."],
    ["CSV mi XLSX mi tercih edilmeli?", "Veriyi başka bir yazılıma ya da panele aktaracaksanız ham veri taşıyan CSV, kendiniz analiz edip paylaşacak ya da yazdıracaksanız biçim ve formül koruyan XLSX daha uygundur."],
    ["Birleştirilmiş hücreli tablolar neden bozulur?", "Birleştirilmiş başlık PDF'te iki sütunun ortasına düşen tek bir metin parçasıdır ve dönüştürücü onu tek sütuna atar. Başlıkları aktarım dışında bırakıp elektronik tabloda yeniden yazmak en pratik çözümdür."],
    ["Aktarılan veriler nasıl doğrulanır?", "Satır sayısını, genel ve ara toplamları PDF'tekilerle karşılaştırın; sayı sütununda metin olarak kalan hücreleri arayın ve baştan, ortadan, sondan birkaç satırı tek tek kontrol edin."],
    ["Dönüştürme sırasında belgem bir yere yükleniyor mu?", "Hayır. Bilişim Ajans'ın PDF araçları dosyayı tarayıcınızda işler; ekstre ya da fiyat listesi hiçbir sunucuya gönderilmez ve sayfa kapatıldığında bellekten silinir."]
  ],
  tools: ["pdf-excel", "pdf-metin-cikar", "csv-excel", "pdf-ocr"],
  related: ["csv-dosyasi-nedir-excelde-nasil-acilir", "turkce-karakter-sorunu-nasil-duzeltilir", "pdfte-kisisel-veri-karartma-nasil-yapilir"]
};
