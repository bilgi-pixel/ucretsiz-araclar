export default {
  slug: "pdf-nasil-bolunur-sayfa-ayirma",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF Nasıl Bölünür? Sayfaları Ayırma, Tek Sayfa Çıkarma ve Parçalama",
  pageTitle: "PDF Nasıl Bölünür? Sayfa Ayırma Senaryoları ve Sık Hatalar",
  description: "PDF bölmenin üç yolu: sayfa aralığı çıkarma, her N sayfada bölme, her sayfayı ayrı dosya yapma. E-Devlet sınırı, imzalı belge, şifreli PDF ve sık hatalar.",
  keywords: ["pdf bölme", "pdf sayfa ayırma", "pdften tek sayfa çıkarma", "pdf parçalama", "pdfi ikiye bölme", "pdf sayfa aralığı", "pdf bölme ücretsiz", "e-devlet pdf parçalama"],
  lead: "PDF'i bölmek için belgeyi bir bölme aracına açıp üç işlemden birini seçersiniz: <strong>belirli sayfaları tek dosya olarak çıkarmak</strong>, <strong>belgeyi her N sayfada eşit parçalara ayırmak</strong> ya da <strong>her sayfayı ayrı PDF yapmak</strong>. Sayfa aralığı \"3-7\" gibi tire ile, tek sayfalar virgülle yazılır. Bölme sayfaları yeniden çizmediği için kalite düşmez. Bu yazı aracın düğmelerini tekrar anlatmak yerine gerçek kullanım senaryolarına, hangi durumda hangi işlemin seçileceğine ve en sık yapılan hatalara odaklanıyor.",
  kisaCevap: [
    "Belirli sayfalar gerekiyorsa \"aralık çıkar\" tek bir PDF üretir; \"3-7, 10\" gibi yazılır.",
    "Eşit parçalar gerekiyorsa \"her N sayfada böl\" kullanılır; 12 sayfalık belge 4'erli bölünürse 3 dosya çıkar.",
    "Toplu taranmış makbuz ve faturalar için \"her sayfayı ayrı PDF yap\" en hızlı yoldur.",
    "Bölme kaliteyi düşürmez; metin seçilebilir kalır, görseller yeniden sıkıştırılmaz.",
    "Elektronik imzalı bir PDF bölünürse parçalardaki imza geçerliliğini yitirir; imzalı belgeyi bölmeyin.",
    "Açılış parolalı PDF, parola bilinmeden bölünemez; parçalar sonradan birleştirme aracıyla yeniden bir araya getirilebilir."
  ],
  figure: {
    alt: "12 sayfalık bir PDF'in üç farklı bölme işlemiyle nasıl parçalandığını gösteren şema: aralık çıkarma tek dosya, her 4 sayfada bölme üç dosya, her sayfayı ayırma on iki dosya.",
    caption: "Aynı 12 sayfalık belge: \"3-5\" aralığını çıkarmak 1 dosya, her 4 sayfada bölmek 3 dosya, her sayfayı ayırmak 12 dosya üretir. Sayfalar kopyalanır, yeniden çizilmez.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir PDF, üç bölme yolu</text>
  <rect x="20" y="60" width="150" height="300" rx="10" class="p"/>
  <text x="95" y="190" class="xl mid sf">12</text>
  <text x="95" y="220" class="mid sf">sayfalık PDF</text>
  <line x1="170" y1="110" x2="250" y2="110" class="sp sw" fill="none"/>
  <line x1="170" y1="210" x2="250" y2="210" class="sp sw" fill="none"/>
  <line x1="170" y1="310" x2="250" y2="310" class="sp sw" fill="none"/>
  <rect x="250" y="70" width="450" height="80" rx="8" class="sf sb"/>
  <text x="266" y="98" class="b">Aralık çıkar: "3-5"</text>
  <rect x="266" y="110" width="30" height="30" class="ps"/><text x="281" y="131" class="sm mid">3</text>
  <rect x="300" y="110" width="30" height="30" class="ps"/><text x="315" y="131" class="sm mid">4</text>
  <rect x="334" y="110" width="30" height="30" class="ps"/><text x="349" y="131" class="sm mid">5</text>
  <text x="690" y="131" class="b end p">1 dosya</text>
  <rect x="250" y="170" width="450" height="80" rx="8" class="sf sb"/>
  <text x="266" y="198" class="b">Her 4 sayfada böl</text>
  <rect x="266" y="210" width="80" height="30" class="ps"/><text x="306" y="231" class="sm mid">1–4</text>
  <rect x="354" y="210" width="80" height="30" class="ps"/><text x="394" y="231" class="sm mid">5–8</text>
  <rect x="442" y="210" width="80" height="30" class="ps"/><text x="482" y="231" class="sm mid">9–12</text>
  <text x="690" y="231" class="b end p">3 dosya</text>
  <rect x="250" y="270" width="450" height="80" rx="8" class="sf sb"/>
  <text x="266" y="298" class="b">Her sayfayı ayrı PDF yap</text>
  <g class="oks">
    <rect x="266" y="310" width="22" height="30"/><rect x="292" y="310" width="22" height="30"/><rect x="318" y="310" width="22" height="30"/>
    <rect x="344" y="310" width="22" height="30"/><rect x="370" y="310" width="22" height="30"/><rect x="396" y="310" width="22" height="30"/>
    <rect x="422" y="310" width="22" height="30"/><rect x="448" y="310" width="22" height="30"/><rect x="474" y="310" width="22" height="30"/>
    <rect x="500" y="310" width="22" height="30"/><rect x="526" y="310" width="22" height="30"/><rect x="552" y="310" width="22" height="30"/>
  </g>
  <text x="690" y="331" class="b end p">12 dosya</text>
  <text x="360" y="388" class="sm mid t2">Sayfa numarası = PDF okuyucudaki sıra, basılı numara değil</text>
</svg>`
  },
  sections: [
    {
      h: "PDF bölmek ne demektir, ne zaman gerekir?",
      p: [
        "PDF bölmek, bir belgenin sayfalarını kopyalayıp bir ya da birden fazla yeni dosyaya yerleştirmektir. Orijinal dosya değişmez; yeni parçalar ayrı dosya olarak indirilir. Bu yüzden bölme, belgeyi kaybetme riski olmadan yapılabilecek en güvenli PDF işlemlerinden biridir.",
        "İhtiyaç genellikle üç yerden doğar: bir sistem dosya boyutunu sınırlar, karşı taraf belgenin yalnızca bir bölümünü ister ya da toplu taranmış kâğıtların her biri ayrı belge olarak saklanmalıdır. Hangi ihtiyacın sizde olduğunu bilmek doğru işlemi seçmenin ilk adımıdır. Aracın kendisinin nasıl kullanıldığını [[arac:pdf-bol|PDF Böl]] sayfası adım adım anlatıyor; bu yazı senaryolara ve hatalara ayrılmıştır."
      ]
    },
    {
      h: "Senaryoya göre hangi bölme işlemi seçilir?",
      table: {
        head: ["Durum", "Doğru işlem", "Örnek ifade", "Sonuç"],
        rows: [
          ["Sözleşmeden yalnızca imza sayfası istenmiş", "Aralık çıkar", "14", "1 sayfalık tek PDF"],
          ["Kitaptan ödev için bir bölüm gerekiyor", "Aralık çıkar", "37-52", "16 sayfalık tek PDF"],
          ["Yıllık banka dökümü aylara ayrılacak (her ay 3 sayfa)", "Her N sayfada böl", "N = 3", "12 dosya"],
          ["40 makbuz tek seferde taranmış", "Her sayfayı ayrı PDF yap", "—", "40 dosya"],
          ["Taramada 2 boş sayfa var", "Sayfa sil", "5, 18", "Kalan sayfalar tek PDF"],
          ["Kapak, özet ve ekler ayrı gönderilecek", "Aralık çıkar (üç kez)", "1, 2-3, 41-", "3 ayrı PDF"]
        ],
        caption: "Sayfa sil ile aralık çıkar birbirinin tersidir: biri yazdığınızı atar, diğeri yalnızca yazdığınızı alır."
      },
      after: [
        "Belgenin ortasından birkaç sayfayı atmak istiyorsanız bölme yerine [[arac:pdf-sayfa-sil|PDF Sayfa Sil]] aracı daha az adım ister. Sayfaları hem silmek hem yeniden sıralamak hem de döndürmek gerekiyorsa [[arac:pdf-sayfa-duzenle|PDF Sayfa Düzenle]] tek ekranda hepsini yapar; bu işlemlerin ayrıntısı [[bilgi:pdf-sayfa-silme-ve-dondurme|PDF'den sayfa silme ve döndürme]] yazısında."
      ]
    },
    {
      h: "Sayfa aralığı nasıl yazılır? Örnek ifadeler",
      p: [
        "Sayfa ifadesi; tek sayfaları virgülle, ardışık sayfaları tire ile gösterir. Tire ile biten ifade \"buradan sona kadar\", tire ile başlayan ifade \"baştan buraya kadar\" anlamına gelir. Aralık çıkarma işleminde yazdığınız sıra korunur; bu, sayfa sırasını değiştirmenin de pratik bir yoludur."
      ],
      table: {
        head: ["İfade", "Anlamı"],
        rows: [
          ["3-7", "3, 4, 5, 6 ve 7. sayfalar"],
          ["1, 4, 9", "Yalnızca üç sayfa"],
          ["10-", "10. sayfadan son sayfaya kadar"],
          ["-3", "İlk üç sayfa"],
          ["5, 1-2", "Önce 5. sayfa, sonra 1 ve 2"],
          ["2-4, 8-10", "İki ayrı aralık tek dosyada"]
        ]
      },
      after: [
        "Numaralar her zaman PDF okuyucunun gösterdiği sıraya göredir. Kapak ve içindekiler bulunan bir kitapta basılı \"1. sayfa\" dosyanın 11. sayfası olabilir; numarayı belgenin içinden değil okuyucunun sayfa kutusundan okuyun."
      ]
    },
    {
      h: "E-Devlet ve başvuru sistemlerinin dosya sınırı için PDF nasıl parçalanır?",
      p: [
        "Kamu ve özel başvuru sistemlerinin çoğu dosya başına bir boyut sınırı koyar; sınır her hizmette farklıdır ve hizmet sayfasında yazılıdır. Sınırı aşan bir belgede iki yol vardır: önce küçültmeyi denemek, olmazsa bölmek. Bölmeden önce sistemin aynı başvuruda birden fazla dosya kabul edip etmediğine bakın; tek dosya kabul eden bir alana belgeyi parçalar hâlinde yükleyemezsiniz."
      ],
      ol: [
        "Belgenin toplam boyutunu ve sayfa sayısını öğrenin. Örnek: 60 sayfa, 18 MB, sistem sınırı 5 MB (örnek sınır).",
        "Ortalama sayfa boyutu 18 ÷ 60 = 0,3 MB'tır; 5 MB sınırına yaklaşık 16 sayfa sığar. Pay bırakmak için 15 sayfalık parçalar seçin.",
        "Her 15 sayfada bölün: 4 dosya çıkar. Taranmış sayfaların boyutu birbirinden farklı olabileceği için her parçanın boyutunu tek tek kontrol edin.",
        "Sınırı aşan bir parça varsa o parçayı ikiye bölün ya da önce küçültün.",
        "Dosya adlarına sıra numarası verin: \"dilekce-ekler-1-4.pdf\" gibi adlar karşı tarafın sırayı anlamasını sağlar."
      ],
      after: [
        "Çoğu zaman küçültme bölmekten daha iyi sonuç verir, çünkü belge bütün kalır. Bunun yollarını [[rehber:e-devlet-pdf-boyutu|e-Devlet'e yüklenecek PDF boyutunu küçültme]] rehberinde bulabilirsiniz."
      ]
    },
    {
      h: "Bölme işlemi kaliteyi düşürür mü? Parçaların boyutu neden toplamı aşar?",
      p: [
        "Doğru yapılan bölme kaliteyi düşürmez: sayfalar yeniden çizilmez, metin seçilebilir kalır, görseller yeniden sıkıştırılmaz. Sayfa boyutu ve yönü de korunur. Kalite kaybı yalnızca, bölme sırasında belgeyi görüntüye çeviren ya da \"yazdır ve PDF olarak kaydet\" yöntemi kullanıldığında ortaya çıkar.",
        "Şaşırtıcı bir nokta şudur: parçaların boyutları toplandığında orijinalden büyük çıkabilir. PDF'teki yazı tipleri ve ortak görseller (örneğin her sayfada tekrarlanan logo) orijinalde bir kez saklanır; bölünen her parça bunların kendi kopyasını taşımak zorundadır. 10 MB'lık bir belgeyi 5 parçaya bölmek, toplamda 11–12 MB eden dosyalar verebilir. Ayrıca tek bir taranmış sayfa 3 MB, düz metinli bir sayfa 50 KB olabileceği için sayfa sayısına bakarak boyut tahmini yapmak yanıltıcıdır."
      ]
    },
    {
      h: "Şifreli, imzalı ve form içeren PDF'lerde nelere dikkat edilir?",
      ul: [
        "<strong>Açılış parolası olan PDF:</strong> Parolayı bilmeden açılamaz, bu yüzden bölünemez. Parolayı biliyorsanız belgeyi PDF okuyucunuzda açıp parolasız bir kopya kaydederek bölebilirsiniz; belgenin sahibi olmadığınız dosyalarda koyulan kısıtlamalara uyun. Parola türleri için [[bilgi:pdf-kullanici-ve-sahip-sifresi-farki|kullanıcı ve sahip şifresi farkı]] yazısına bakabilirsiniz.",
        "<strong>Elektronik ya da dijital imzalı PDF:</strong> İmza, belgenin tamamının değişmediğini kanıtlar. Belge bölündüğünde parçalardaki imza doğrulanamaz hâle gelir. Karşı taraf belgenin bir bölümünü istiyorsa imzalı tam dosyayı gönderip ilgili sayfa numaralarını belirtmek daha güvenlidir.",
        "<strong>Doldurulabilir form:</strong> Bazı form alanları ve hesaplamalar belgenin bütününe bağlıdır; bölünen parçada alanlar çalışmayabilir. Formu önce doldurup kaydedin, sonra bölün.",
        "<strong>Yer imleri ve iç bağlantılar:</strong> İçindekiler bağlantıları başka parçadaki sayfayı gösteriyorsa çalışmaz; bu normaldir.",
        "<strong>Kişisel veri:</strong> Bir belgenin yalnızca ilgili sayfasını göndermek, gereksiz kişisel veri paylaşımını azaltır; aynı sayfadaki fazladan bilgiyi gizlemek için karartma gerekebilir."
      ]
    },
    {
      h: "Bölünen sayfalar sonra tekrar birleştirilebilir mi?",
      p: [
        "Evet. Bölme orijinali değiştirmediği ve parçalar sayfaları olduğu gibi taşıdığı için parçalar istediğiniz sırada yeniden birleştirilebilir. Bu, sayfaları farklı belgelere dağıtıp yeniden düzenlemenin de yoludur: iki belgeden seçtiğiniz bölümleri çıkarıp tek dosyada toplayabilirsiniz.",
        "Birleştirme için [[arac:pdf-birlestir|PDF Birleştir]] aracını kullanabilir, ayrıntılı adımlar için [[rehber:pdf-birlestirme-nasil-yapilir|PDF birleştirme rehberine]] bakabilirsiniz. Birleştirmeden önce dosya adlarına sıra numarası vermek, aracın dosyaları doğru sırada listelemesini kolaylaştırır."
      ]
    },
    {
      h: "Dosyam sunucuya gönderilmeden bölme yapılabilir mi?",
      p: [
        "Evet. Bilişim Ajans'ın PDF araçları işlemi tarayıcınızda yapar; belge internete yüklenmez, işlem bilgisayarınızın ya da telefonunuzun belleğinde gerçekleşir. Bu, kimlik fotokopisi, tapu, sağlık raporu ya da maaş bordrosu gibi kişisel veri içeren belgeler için önemlidir.",
        "Bir aracın dosyanızı yükleyip yüklemediğini anlamanın basit bir yolu, sayfa açıldıktan sonra internet bağlantısını kesip işlemi denemektir. İşlem çevrimdışı tamamlanıyorsa belge cihazınızdan çıkmamıştır.",
        "Tarayıcıda çalışan araçların tek sınırı cihazın belleğidir. Yüzlerce sayfalık, yüksek çözünürlükle taranmış bir belge eski bir telefonda yavaş işlenebilir. Böyle bir durumda işlemi bilgisayarda yapmak ya da belgeyi önce iki büyük parçaya ayırıp sonra her parçayı ayrıca bölmek işi hızlandırır. İşlem bittikten sonra sekmeyi kapatmak, belleğe alınan belge verisini de temizler; geride yalnızca indirdiğiniz parçalar kalır."
      ]
    },
    {
      h: "PDF bölerken sık yapılan hatalar",
      ul: [
        "<strong>Basılı sayfa numarasını yazmak:</strong> Kapaklı belgelerde yanlış sayfa çıkarılır; okuyucudaki sırayı kullanın.",
        "<strong>\"10-\" ile \"10\"u karıştırmak:</strong> İlki sona kadar alır, ikincisi yalnızca 10. sayfayı.",
        "<strong>Silme ile çıkarmayı karıştırmak:</strong> Sonuç beklediğinizin tersiyse işlem türünü değiştirin.",
        "<strong>Parçaları açıp kontrol etmemek:</strong> Özellikle imza ve kaşe sayfasını ayırdıysanız göndermeden önce bir kez açın.",
        "<strong>İmzalı belgeyi bölüp resmî işlemde kullanmak:</strong> Bölünen parçadaki imza doğrulanamaz.",
        "<strong>Dosya adını değiştirmemek:</strong> \"belge-1.pdf, belge-2.pdf\" gibi adlar karşı tarafta karışır; içeriği anlatan adlar verin.",
        "<strong>Orijinali silmek:</strong> Parçalar doğru çıksa bile orijinal belgeyi bir süre saklayın; ileride başka bir aralık gerektiğinde ya da bir parça kaybolduğunda yeniden bölmek için tek kaynak odur."
      ]
    }
  ],
  faq: [
    ["Bir PDF dosyasını birden fazla dosyaya nasıl bölebilirim?", "Bölme aracında \"her N sayfada böl\" seçeneğiyle belgeyi eşit parçalara ayırabilir ya da aralık çıkarma işlemini birkaç kez yaparak farklı uzunlukta parçalar oluşturabilirsiniz. Her parça ayrı dosya olarak indirilir."],
    ["PDF'ten yalnızca belirli sayfaları nasıl çıkarırım?", "\"Aralık çıkar\" işlemini seçip istediğiniz sayfaları virgül ve tire ile yazın, örneğin \"3-7, 10\". Sonuç, yalnızca bu sayfaları yazdığınız sırada içeren tek bir PDF dosyasıdır."],
    ["Sayfa aralığı (ör. 3-7) nasıl yazılır?", "Ardışık sayfalar tire ile, tek sayfalar virgülle yazılır. \"3-7\" üçüncüden yedinciye kadar, \"10-\" onuncudan sona kadar, \"-3\" ilk üç sayfa anlamına gelir; numaralar PDF okuyucudaki sıradır."],
    ["PDF'i her sayfa ayrı dosya olacak şekilde bölmek mümkün mü?", "Evet, \"her sayfayı ayrı PDF yap\" seçeneği belgedeki her sayfayı kendi dosyasına koyar. Toplu taranmış makbuz, fatura ve kartvizitleri ayrı belgeler hâlinde arşivlemek için en hızlı yöntemdir."],
    ["Bölme işlemi kaliteyi düşürür mü?", "Hayır. Sayfalar yeniden çizilmeden kopyalandığı için metin seçilebilir kalır ve görseller yeniden sıkıştırılmaz. Kalite kaybı yalnızca belgeyi görüntüye çeviren ya da yazdırıp yeniden kaydeden yöntemlerde olur."],
    ["Şifreli PDF bölünebilir mi?", "Açılış parolası olan bir PDF parola bilinmeden açılamadığı için bölünemez. Parolayı biliyorsanız belgeyi okuyucunuzda açıp parolasız bir kopya kaydederek bölebilirsiniz; başkasına ait belgelerin kısıtlamalarına uyulmalıdır."],
    ["Bölünen sayfalar sonra tekrar birleştirilebilir mi?", "Evet. Parçalar orijinal sayfaları taşıdığı için birleştirme aracıyla istediğiniz sırada yeniden tek dosya hâline getirilebilir. Dosya adlarına sıra numarası vermek doğru sırayı korumayı kolaylaştırır."],
    ["E-Devlet yükleme sınırı için PDF nasıl parçalanır?", "Toplam boyutu sayfa sayısına bölerek ortalama sayfa boyutunu bulun, sınıra pay bırakarak sığacak sayfa sayısını belirleyin ve belgeyi o kadar sayfada bölün. Önce küçültmeyi denemek çoğu zaman daha iyi sonuç verir."],
    ["Dosyam sunucuya gönderilmeden bölme yapılabilir mi?", "Evet. Bilişim Ajans PDF araçları belgeyi tarayıcınızda işler ve hiçbir sunucuya yüklemez. Sayfayı açtıktan sonra interneti kesip işlemi deneyerek dosyanın cihazınızdan çıkmadığını kendiniz doğrulayabilirsiniz."]
  ],
  tools: ["pdf-bol", "pdf-sayfa-sil", "pdf-birlestir", "pdf-sayfa-duzenle"],
  related: ["pdf-sayfa-silme-ve-dondurme", "pdf-kullanici-ve-sahip-sifresi-farki"]
};
