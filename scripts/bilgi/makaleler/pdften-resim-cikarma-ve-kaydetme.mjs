export default {
  slug: "pdften-resim-cikarma-ve-kaydetme",
  kategori: "dijital",
  tarih: "2026-11-15",
  title: "PDF'ten Resim Nasıl Çıkarılır? Gömülü Görsel mi, Sayfa Görüntüsü mü",
  pageTitle: "PDF'ten Resim Çıkarma: Gömülü Görsel ve Sayfa Görüntüsü",
  description: "PDF'teki resmi iki yolla kaydedersiniz: gömülü görseli orijinal kalitede çıkarmak ya da sayfayı JPG/PNG'ye çevirmek. Farkları, çözünürlük, logo ve telif notları.",
  keywords: ["pdf'ten resim çıkarma", "pdf'teki fotoğrafı kaydetme", "pdf jpg'ye çevirme", "pdf sayfasını resim yapma", "pdf görsel kalitesi", "pdf'ten logo alma", "pdf png", "taranmış pdf resim"],
  lead: "PDF'teki bir resmi kaydetmenin iki yolu vardır: dosyanın içine <strong>gömülü görseli olduğu gibi çıkarmak</strong> ya da <strong>sayfanın tamamını JPG veya PNG görüntüsüne çevirmek</strong>. Gömülü görseli çıkarmak, fotoğrafı PDF'e eklendiği orijinal çözünürlükte ve kalitede verir; sayfayı resme çevirmek ise sayfada ne görünüyorsa, yazılar ve çizimler dahil, seçtiğiniz çözünürlükte bir fotoğraf üretir. Hangisini seçeceğiniz ne istediğinize bağlıdır. Bu sayfada iki yöntemin farkını, çözünürlük hesabını, taranmış PDF ve logo durumlarını adım adım bulacaksınız.",
  kisaCevap: [
    "Gömülü görsel çıkarma, PDF'e eklenmiş fotoğrafı yeniden sıkıştırmadan, orijinal piksel boyutunda verir.",
    "Sayfayı resme çevirme, sayfanın görünen hâlini seçtiğiniz DPI'da yeni bir görüntü olarak oluşturur; A4 sayfa 150 DPI'da 1.240 × 1.754 piksel olur.",
    "Taranmış PDF'te her sayfa zaten tek bir resimdir; çıkarma işlemi sayfa sayısı kadar görüntü verir.",
    "Vektörel logo ve grafikler görsel olarak gömülü değildir; çıkarmak için sayfayı yüksek DPI'da PNG'ye çevirip kırpmak gerekir.",
    "Fotoğraf için JPG, yazı, tablo ve keskin kenarlı grafik için PNG daha uygundur."
  ],
  figure: {
    alt: "PDF'ten resim almanın iki yolu: solda gömülü görseli çıkarma, orijinal 1.200 × 800 piksel fotoğrafı verir; sağda sayfayı resme çevirme, tüm A4 sayfayı 150 DPI'da 1.240 × 1.754 piksel görüntüye dönüştürür.",
    caption: "Gömülü görsel çıkarma, sayfadaki fotoğrafın kendisini; sayfayı resme çevirme ise sayfanın ekran görüntüsünü verir. İkincisinde yazılar ve çizimler de görüntünün parçası olur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">PDF'ten resim almanın iki yolu</text>
  <rect x="290" y="56" width="140" height="196" rx="6" class="sf sb"/>
  <text x="360" y="78" class="sm mid b">PDF sayfası (A4)</text>
  <rect x="306" y="90" width="108" height="70" rx="4" class="ps"/>
  <text x="360" y="130" class="sm mid">fotoğraf</text>
  <line x1="306" y1="176" x2="414" y2="176" class="st" fill="none"/>
  <line x1="306" y1="190" x2="414" y2="190" class="st" fill="none"/>
  <line x1="306" y1="204" x2="390" y2="204" class="st" fill="none"/>
  <circle cx="330" cy="232" r="12" class="oks"/>
  <text x="352" y="236" class="sm">vektör logo</text>
  <line x1="290" y1="150" x2="200" y2="150" class="sp sw" fill="none"/>
  <line x1="430" y1="150" x2="520" y2="150" class="sp sw" fill="none"/>
  <rect x="20" y="96" width="180" height="120" rx="8" class="p"/>
  <text x="110" y="126" class="b mid sf">1. Gömülü görsel</text>
  <text x="110" y="152" class="sm mid sf">yalnızca fotoğraf</text>
  <text x="110" y="174" class="sm mid sf">1.200 × 800 piksel</text>
  <text x="110" y="196" class="sm mid sf">orijinal kalite</text>
  <rect x="520" y="96" width="180" height="120" rx="8" class="sf sb"/>
  <text x="610" y="126" class="b mid">2. Sayfayı resme</text>
  <text x="610" y="152" class="sm mid t2">tüm sayfa, yazılar dahil</text>
  <text x="610" y="174" class="sm mid p b">150 DPI: 1.240 × 1.754</text>
  <text x="610" y="196" class="sm mid p b">300 DPI: 2.480 × 3.508</text>
  <rect x="20" y="276" width="680" height="128" rx="8" class="sf sb"/>
  <rect x="20" y="276" width="8" height="128" class="p"/>
  <text x="44" y="302" class="b">Hangisini seçmeli?</text>
  <text x="44" y="328" class="sm">Fotoğrafı orijinal kalitede almak → gömülü görsel çıkarma</text>
  <text x="44" y="352" class="sm">Sayfayı paylaşmak, sosyal medyaya koymak → sayfayı JPG'ye çevirme</text>
  <text x="44" y="376" class="sm">Logo, grafik, tablo → sayfayı 300 DPI PNG'ye çevirip kırpma</text>
  <text x="44" y="396" class="sm mu">Taranmış PDF → iki yöntem de sayfa başına bir resim verir</text>
</svg>`
  },
  sections: [
    {
      h: "PDF'teki resim nasıl kaydedilir?",
      p: [
        "PDF bir sayfa tarif dosyasıdır: içinde yazılar, çizgiler, şekiller ve fotoğraflar ayrı nesneler olarak durur, görüntüleyici bunları üst üste koyarak sayfayı çizer. Fotoğraflar çoğunlukla dosyanın içine ayrı bir görüntü nesnesi olarak gömülür. Bu yüzden bir PDF'ten resim almak istediğinizde iki farklı şey isteyebilirsiniz: o fotoğraf nesnesinin kendisini ya da sayfanın gözünüzle gördüğünüz bütün hâlini.",
        "Fotoğrafın kendisini istiyorsanız [[arac:pdf-resim-cikar|PDF'ten Resim Çıkarma]] aracı dosyadaki tüm gömülü görselleri listeler, tek tek ya da ZIP olarak PNG veya JPG biçiminde indirmenizi sağlar. Sayfanın tamamını istiyorsanız [[arac:pdfden-resme|PDF'den Resme]] aracı seçtiğiniz sayfaları istediğiniz çözünürlükte JPG ya da PNG'ye çevirir. İki araç da tarayıcıda çalışır; dosyanız bilgisayarınızdan çıkmaz."
      ]
    },
    {
      h: "Gömülü görseli çıkarmak ile sayfayı resme çevirmek arasındaki fark",
      table: {
        head: ["Özellik", "Gömülü görseli çıkarma", "Sayfayı resme çevirme"],
        rows: [
          ["Ne verir?", "PDF'e eklenmiş fotoğrafın kendisi", "Sayfanın tamamının görüntüsü"],
          ["Yazılar dahil mi?", "Hayır", "Evet, görüntünün parçası olur"],
          ["Çözünürlük", "Fotoğrafın PDF'e eklendiği piksel boyutu", "Seçtiğiniz DPI'a göre"],
          ["Kalite kaybı", "Yok ya da çok az", "Seçilen biçim ve kaliteye bağlı"],
          ["Kırpılmış fotoğraf", "Kırpılmadan önceki tam hâl gelebilir", "Sayfada görünen kırpılmış hâl gelir"],
          ["Vektörel logo ve grafik", "Gelmez (görüntü değildir)", "Gelir"],
          ["Uygun kullanım", "Fotoğraf arşivi, ürün görseli", "Sayfa paylaşımı, sunum, önizleme"]
        ]
      },
      after: [
        "Bu farkın ilginç bir sonucu vardır: PDF'i hazırlayan kişi bir fotoğrafı sayfada kırpmış ya da bir kısmını başka bir şekille örtmüş olabilir. Gömülü görseli çıkardığınızda fotoğrafın kırpılmamış tam hâli ortaya çıkabilir. Kendi belgelerinizi paylaşırken bunu bilmek önemlidir; kişisel bilgileri yalnızca üstüne kutu çizerek gizlemek yeterli değildir. Doğru yöntem [[bilgi:pdfte-kisisel-veri-karartma-nasil-yapilir|PDF'te kişisel veri karartma]] makalesinde anlatılıyor."
      ]
    },
    {
      h: "Sayfayı resme çevirirken çözünürlük nasıl hesaplanır?",
      p: [
        "Sayfayı görüntüye çevirirken seçtiğiniz DPI (inç başına nokta) değeri, oluşacak resmin piksel boyutunu belirler. A4 sayfa 210 × 297 mm, yani 8,27 × 11,69 inçtir. Piksel boyutu, inç cinsinden ölçünün DPI ile çarpılmasıyla bulunur."
      ],
      formula: "Piksel = (mm ÷ 25,4) × DPI\nA4, 150 DPI: 210 ÷ 25,4 × 150 = 1.240 px; 297 ÷ 25,4 × 150 = 1.754 px\nA4, 300 DPI: 2.480 × 3.508 px",
      table: {
        head: ["DPI", "A4 piksel boyutu", "Uygun kullanım"],
        rows: [
          ["72", "595 × 842", "Küçük önizleme, küçük resim"],
          ["150", "1.240 × 1.754", "Ekranda okuma, e-posta, sosyal medya"],
          ["200", "1.654 × 2.339", "Küçük yazılı belgeler, sunum"],
          ["300", "2.480 × 3.508", "Baskı, logo ve tablo kırpma, metin tanıma (OCR)"]
        ]
      },
      after: [
        "DPI'ı iki katına çıkarmak piksel sayısını dört katına, dosya boyutunu da kabaca üç–dört katına çıkarır. Ekranda bakacağınız bir sayfa için 150 DPI çoğu zaman yeterlidir. DPI kavramının ayrıntısı için [[bilgi:dpi-ve-cozunurluk-nedir|DPI ve çözünürlük nedir]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Çıkarılan resim neden düşük çözünürlüklü olabilir?",
      p: [
        "Gömülü görsel çıkarma, fotoğrafı PDF'e eklendiği hâliyle verir; daha iyi bir kalite yaratamaz. PDF'i hazırlayan program dosyayı küçültmek için fotoğrafları önceden küçültmüş ya da sıkıştırmışsa, çıkardığınız resim de küçük olur. E-posta ile gönderilmek üzere \"küçük boyut\" ayarıyla kaydedilmiş PDF'lerde fotoğraflar 72–150 PPI civarına indirilmiş olabilir.",
        "Bir gömülü görselin sayfada etkin çözünürlüğünü hesaplamak kolaydır: piksel genişliğini sayfadaki genişliğine (inç) bölersiniz. Örneğin 600 piksel genişliğinde bir fotoğraf sayfada 10 cm (3,94 inç) genişlikte görünüyorsa etkin çözünürlüğü 600 ÷ 3,94 ≈ 152 PPI'dır. Bu, ekranda iyi görünür ama büyük baskı için yetersizdir. Böyle bir durumda sayfayı 300 DPI'da resme çevirmek de çözüm değildir; görüntü büyür, ama fotoğrafın içindeki ayrıntı artmaz."
      ]
    },
    {
      h: "PDF sayfası JPG mi PNG mi kaydedilmeli?",
      p: [
        "Seçim sayfanın içeriğine bağlıdır. <strong>JPG</strong> fotoğraflarda küçük dosya boyutu sağlar, ama kayıplı sıkıştırma yaptığı için yazıların ve çizgilerin çevresinde bulanık lekeler (sıkıştırma izi) oluşturur. <strong>PNG</strong> kayıpsızdır; yazı, tablo, grafik ve ekran görüntüsünde keskin kenarları korur, ancak fotoğraf ağırlıklı sayfalarda dosyası büyük olur."
      ],
      ul: [
        "Fotoğraf ağırlıklı broşür, katalog sayfası: JPG, kalite %80–90.",
        "Yazılı belge, fatura, tablo: PNG ya da yüksek kaliteli JPG.",
        "Logo, diyagram, şeffaf arka plan gereken grafik: PNG.",
        "Sosyal medyada paylaşılacak sayfa: JPG; ardından gerekiyorsa en-boy oranına göre kırpın."
      ],
      after: [
        "Biçimler arasındaki farkları daha ayrıntılı görmek isterseniz [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]] makalesi her biçimin güçlü ve zayıf yanlarını karşılaştırır."
      ]
    },
    {
      h: "Vektörel logo PDF'ten nasıl alınır?",
      p: [
        "Kurumsal belgelerde, faturalarda ve broşürlerde logo çoğunlukla fotoğraf değil, vektörel çizimdir: matematiksel eğri ve şekillerden oluşur ve her büyüklükte keskin kalır. Vektörel nesneler görüntü olarak gömülmediği için gömülü görsel çıkarma aracı onları listelemez; bu normaldir, araç hatalı değildir.",
        "Logoyu görüntü olarak almak için sayfayı yüksek çözünürlükte, örneğin 300 ya da 600 DPI'da PNG'ye çevirin, ardından [[arac:resim-kirp|Resim Kırpma]] aracıyla yalnızca logoyu içeren bölgeyi kırpın. Elde edeceğiniz PNG baskıya ve web sitesine yeterli olur. Logoyu düzenlenebilir vektör olarak istiyorsanız en doğru kaynak logoyu hazırlayan kişi ya da kurumdur; başka bir kurumun logosunu izinsiz kullanmamanız gerektiğini de unutmayın."
      ]
    },
    {
      h: "Taranmış PDF'te her sayfa neden tek resimdir?",
      p: [
        "Tarayıcıdan ya da telefon kamerasıyla oluşturulan PDF'lerde sayfadaki yazılar gerçek metin değil, fotoğrafın bir parçasıdır. Tarama programı her sayfayı tek bir görüntü olarak çeker ve PDF'e yerleştirir. Bu yüzden taranmış bir PDF'ten resim çıkardığınızda sayfa sayısı kadar görüntü elde edersiniz; sayfadaki ayrı ayrı fotoğrafları çıkaramazsınız.",
        "Taranmış bir sayfadaki fotoğrafı ayrı almak için önce sayfayı ya da gömülü sayfa görüntüsünü çıkarın, sonra kırpma aracıyla fotoğrafın olduğu bölgeyi kesin. Bu yöntem, eski bir belgedeki vesikalık fotoğrafı ya da kitap sayfasındaki bir şekli almak için de işe yarar. Bazı taranmış PDF'lerde görünmez bir metin katmanı (OCR sonucu) bulunur; bu katman metni seçmenize izin verir, ama görüntü yine tek parçadır."
      ]
    },
    {
      h: "Çıkarılan görseller kırpılabilir ve düzenlenebilir mi?",
      p: [
        "Evet. Çıkardığınız ya da dönüştürdüğünüz görüntüler artık sıradan resim dosyasıdır. Kırpabilir, döndürebilir, boyutlandırabilir ya da başka bir biçime çevirebilirsiniz. Kırparken hedef ortamın oranını seçmek işinizi kolaylaştırır: kare paylaşımlar için 1:1, sunum slaytı için 16:9, dikey hikâye formatı için 9:16 gibi.",
        "Bir sayfayı tamamen yeniden kullanmak istiyorsanız, sayfayı resme çevirmek yerine PDF'in kendisini bölmek ya da sayfa çıkarmak da bir seçenektir; böylece yazılar seçilebilir ve aranabilir kalır."
      ]
    },
    {
      h: "Adım adım: araçlarla PDF'ten resim almak",
      ol: [
        "Önce amacınızı belirleyin: yalnızca fotoğraf mı, yoksa sayfanın tamamı mı lazım?",
        "Fotoğraf için PDF'ten Resim Çıkarma aracına dosyanızı bırakın; araç her görselin piksel boyutunu listeler. Çok küçük görünen öğeler genellikle süs ya da arka plan parçasıdır, bunları atlayabilirsiniz.",
        "İstediğiniz görselleri tek tek indirin ya da hepsini ZIP olarak alın. Fotoğraflar için JPG, şeffaflık içeren görseller için PNG seçin.",
        "Sayfanın tamamı için PDF'den Resme aracında sayfa aralığını yazın ve DPI seçin: ekran için 150, baskı ve kırpma için 300.",
        "Çıkan görüntüyü gerekiyorsa kırpın, ardından dosya adını içeriği anlatacak şekilde değiştirin (ör. katalog-s12-urun.jpg).",
        "Son olarak görseli açıp büyütün; bulanıklık ya da sıkıştırma izi varsa daha yüksek DPI ya da PNG ile tekrar deneyin."
      ]
    },
    {
      h: "Telifli görselleri kullanırken nelere dikkat edilmeli?",
      p: [
        "Bir görseli PDF'ten teknik olarak çıkarabilmeniz, onu kullanma hakkınız olduğu anlamına gelmez. Fotoğraflar, çizimler ve logolar Türkiye'de 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunur; eser sahibinin izni olmadan çoğaltılması, yayımlanması ya da ticari amaçla kullanılması hukuki sorumluluk doğurabilir."
      ],
      ul: [
        "Kendi hazırladığınız ya da size kullanım izni verilmiş belgelerden görsel almak sorun yaratmaz.",
        "Ürün kataloğundaki fotoğrafları kendi satış sayfanızda kullanmak için üreticinin ya da tedarikçinin iznini alın.",
        "Ders kitabı ve dergi sayfalarındaki görselleri yalnızca kişisel ders çalışması gibi sınırlı amaçlarla kullanın, yayımlamayın.",
        "Alıntı yaptığınızda kaynağı belirtmek iyi bir uygulamadır, ama tek başına izin yerine geçmez."
      ]
    }
  ],
  faq: [
    ["PDF'teki resim nasıl kaydedilir?", "Fotoğrafın kendisini istiyorsanız PDF'ten Resim Çıkarma aracıyla gömülü görselleri PNG ya da JPG olarak indirin. Sayfanın tamamını istiyorsanız PDF'den Resme aracıyla sayfayı istediğiniz çözünürlükte görüntüye çevirin."],
    ["Gömülü görseli çıkarmak ile sayfayı resme çevirmek arasındaki fark nedir?", "Gömülü görsel çıkarma PDF'e eklenmiş fotoğrafı orijinal piksel boyutunda verir, yazıları içermez. Sayfayı resme çevirme ise sayfanın görünen hâlini, yazılar ve çizimler dahil, seçtiğiniz DPI'da yeni bir görüntü olarak oluşturur."],
    ["Çıkarılan resim neden düşük çözünürlüklü olabilir?", "Gömülü görsel, PDF'e eklendiği hâliyle gelir. PDF hazırlanırken fotoğraf küçültülmüş ya da sıkıştırılmışsa çıkan resim de küçük olur; hiçbir yöntem kaybolan ayrıntıyı geri getiremez."],
    ["PDF sayfası JPG mi PNG mi kaydedilmeli?", "Fotoğraf ağırlıklı sayfalar için JPG küçük dosya sağlar. Yazı, tablo, logo ve grafik içeren sayfalar için PNG keskin kenarları korur ve sıkıştırma izi bırakmaz."],
    ["Vektörel logo PDF'ten nasıl alınır?", "Vektörel logolar görüntü olarak gömülmediği için çıkarma aracında görünmez. Sayfayı 300 ya da 600 DPI'da PNG'ye çevirip logo bölgesini kırparak yüksek kaliteli bir görüntü elde edebilirsiniz."],
    ["Taranmış PDF'te her sayfa neden tek resimdir?", "Tarayıcı her sayfayı tek bir fotoğraf olarak çeker; sayfadaki yazılar ve resimler bu fotoğrafın parçasıdır. Bu yüzden çıkarma işlemi sayfa sayısı kadar görüntü verir, ayrı nesneler çıkmaz."],
    ["Çıkarılan görseller kırpılabilir mi?", "Evet, çıkardığınız görüntüler sıradan resim dosyalarıdır. Resim Kırpma aracıyla serbest ya da 1:1, 4:3, 16:9 gibi oranlarla kırpabilir, toplu işlem yapabilirsiniz."],
    ["Telifli görselleri kullanırken nelere dikkat edilmeli?", "Teknik olarak çıkarabilmek kullanım hakkı vermez. Başkasına ait fotoğraf, çizim ve logoları izin almadan yayımlamayın ya da ticari amaçla kullanmayın; 5846 sayılı Kanun bu eserleri korur."],
    ["PDF'ten resim çıkarma aracı dosyamı yüklüyor mu?", "Hayır. Araç PDF'i tarayıcınızda açar ve görselleri yine tarayıcınızda ayıklar; dosyanız hiçbir sunucuya gönderilmez, kayıt ya da üyelik gerekmez."]
  ],
  tools: ["pdf-resim-cikar", "pdfden-resme", "resim-kirp"],
  related: ["dpi-ve-cozunurluk-nedir", "jpg-png-svg-farki", "pdfte-kisisel-veri-karartma-nasil-yapilir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 5846 sayılı Fikir ve Sanat Eserleri Kanunu", "https://www.mevzuat.gov.tr/"],
    ["ISO – PDF standardı (ISO 32000)", "https://www.iso.org/"]
  ]
};
