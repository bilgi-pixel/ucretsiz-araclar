export default {
  slug: "dosya-uzantilari-nedir-docx-xlsx-pdf",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Dosya Uzantıları Nedir? .docx, .xlsx, .pdf, .webp, .zip Ne Anlama Gelir",
  pageTitle: "Dosya Uzantıları Nedir? docx, xlsx, pdf, webp, zip Anlamları",
  description: "Dosya uzantısı, adın sonundaki noktadan sonra gelen ve dosya türünü belirten kısımdır. Yaygın uzantılar tablosu, uzantıyı gösterme, değiştirme riski ve sahte uzantılar.",
  keywords: ["dosya uzantıları", "dosya uzantısı nedir", "docx nedir", "xlsx nedir", "webp nedir", "dosya uzantısı nasıl gösterilir", "dosya açılmıyor", "mime türü nedir"],
  lead: "Dosya uzantısı, dosya adının sonundaki noktadan sonra gelen ve dosyanın <strong>türünü</strong> belirten kısımdır: <code>rapor.docx</code> bir kelime işlemci belgesi, <code>tablo.xlsx</code> bir hesap tablosu, <code>fatura.pdf</code> bir PDF belgesidir. İşletim sistemi dosyayı hangi programla açacağına uzantıya bakarak karar verir. Uzantı yalnızca bir etikettir; adını elle değiştirmek dosyanın içeriğini dönüştürmez. Bu sayfada en yaygın uzantıların anlamını, uzantıları görünür yapmayı, WebP sorununu, zararlı dosyaların uzantı hilelerini ve MIME türünü bulacaksınız.",
  kisaCevap: [
    "Uzantı, dosya adının son noktasından sonraki kısımdır ve dosya türünü gösterir: .pdf, .docx, .jpg, .zip.",
    "Uzantıyı elle değiştirmek dosyayı dönüştürmez; .webp dosyasının adını .jpg yapmak içeriği değiştirmez, yalnızca programı yanıltır.",
    "Windows varsayılan olarak bilinen uzantıları gizler; Dosya Gezgini'nde Görünüm menüsünden \"Dosya adı uzantıları\" açılabilir.",
    "Zararlı dosyalar çoğunlukla \"fatura.pdf.exe\" gibi çift uzantıyla belge taklidi yapar; asıl tür son uzantıdır.",
    "MIME türü, uzantının internetteki karşılığıdır: PDF için application/pdf, JPG için image/jpeg."
  ],
  figure: {
    alt: "Bir dosya adının anatomisi: 'Teklif-2026' dosya adı, nokta ve 'pdf' uzantısı. Altında çift uzantılı sahte dosya örneği: 'fatura.pdf.exe' aslında bir program dosyasıdır.",
    caption: "Dosya türünü belirleyen her zaman son noktadan sonraki kısımdır. Uzantılar gizliyken \"fatura.pdf.exe\" dosyası ekranda \"fatura.pdf\" gibi görünür; bu yüzden uzantıları görünür yapmak güvenlik için de önemlidir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Dosya adının anatomisi</text>
  <rect x="80" y="56" width="330" height="70" rx="10" class="sf sb"/>
  <text x="245" y="100" class="xl mid">Teklif-2026</text>
  <rect x="420" y="56" width="40" height="70" rx="10" class="ps"/>
  <text x="440" y="100" class="xl mid">.</text>
  <rect x="470" y="56" width="170" height="70" rx="10" class="p"/>
  <text x="555" y="100" class="xl mid sf">pdf</text>
  <text x="245" y="148" class="sm mid mu">dosya adı: istediğiniz gibi</text>
  <text x="555" y="148" class="sm mid p b">uzantı: türü belirler</text>
  <line x1="20" y1="172" x2="700" y2="172" class="sb dash" fill="none"/>
  <text x="20" y="204" class="b">Çift uzantı hilesi</text>
  <rect x="20" y="218" width="320" height="56" rx="8" class="oks"/>
  <text x="180" y="244" class="mid b">Ekranda görünen: fatura.pdf</text>
  <text x="180" y="264" class="sm mid">(uzantılar gizliyken)</text>
  <line x1="350" y1="246" x2="372" y2="246" class="sdg sw" fill="none"/>
  <rect x="380" y="218" width="320" height="56" rx="8" class="dgs"/>
  <text x="540" y="244" class="mid b">Gerçek ad: fatura.pdf.exe</text>
  <text x="540" y="264" class="sm mid dg b">son uzantı .exe: program</text>
  <rect x="20" y="296" width="680" height="88" rx="8" class="sf sb"/>
  <rect x="20" y="296" width="8" height="88" class="p"/>
  <text x="44" y="322" class="b">Uzantı değiştirmek dönüştürmez</text>
  <text x="44" y="348" class="sm">foto.webp → foto.jpg olarak yeniden adlandırılırsa içerik yine WebP kalır.</text>
  <text x="44" y="370" class="sm p b">Doğru yol: dönüştürme aracıyla gerçekten JPG'ye çevirmek.</text>
</svg>`
  },
  sections: [
    {
      h: "Dosya uzantısı nedir?",
      p: [
        "Bilgisayardaki her dosya aslında baytlardan oluşan bir dizidir; bir fotoğrafın da bir sözleşmenin de diskteki görüntüsü sayılardan ibarettir. Bu sayıların nasıl yorumlanacağını, yani dosyanın türünü, işletim sistemine anlatmanın en basit yolu dosya adının sonuna bir etiket eklemektir. Bu etikete uzantı denir ve addan bir noktayla ayrılır.",
        "Uzantılar çoğunlukla 3 ya da 4 harflidir ama bu bir kural değildir; .md, .js gibi iki harfli ya da .webmanifest gibi uzun uzantılar da vardır. Bir dosyada birden fazla nokta olabilir (\"rapor.son.hali.docx\"); türü belirleyen her zaman son noktadan sonraki kısımdır. Bazı dosyaların hiç uzantısı yoktur; bu durumda işletim sistemi dosyayı hangi programla açacağını sorar."
      ]
    },
    {
      h: "En yaygın dosya uzantıları ne anlama gelir?",
      table: {
        head: ["Uzantı", "Tür", "Ne işe yarar", "Not"],
        rows: [
          [".pdf", "Belge", "Her cihazda aynı görünen sayfa", "Resmî yazışma ve başvurular için yaygın"],
          [".docx / .doc", "Kelime işlemci belgesi", "Düzenlenebilir metin belgesi", ".docx yeni, .doc eski biçimdir"],
          [".xlsx / .xls", "Hesap tablosu", "Formüllü tablo, liste", ".xlsx yeni biçim; makro içeren .xlsm"],
          [".pptx", "Sunum", "Slayt dosyası", "Eski biçim .ppt"],
          [".csv", "Düz metin tablo", "Virgül ya da noktalı virgülle ayrılmış veri", "Programlar arası veri aktarımı"],
          [".txt", "Düz metin", "Biçimsiz yazı", "Her programda açılır"],
          [".jpg / .jpeg", "Fotoğraf", "Kayıplı sıkıştırılmış görüntü", "İki uzantı aynı biçimdir"],
          [".png", "Görüntü", "Kayıpsız, şeffaflık destekler", "Ekran görüntüsü ve logo"],
          [".webp", "Görüntü", "Web için küçük boyutlu görüntü", "Eski sistemler kabul etmeyebilir"],
          [".heic", "Fotoğraf", "Bazı telefonların fotoğraf biçimi", "Paylaşmadan önce JPG'ye çevirmek gerekebilir"],
          [".zip / .rar / .7z", "Arşiv", "Birden çok dosyayı sıkıştırılmış tek pakette toplar", ".zip her sistemde yerleşik açılır"],
          [".mp4", "Video", "Yaygın video kabı", "Telefon ve bilgisayarda oynar"],
          [".mp3 / .wav", "Ses", "Sıkıştırılmış / sıkıştırılmamış ses", ".wav çok daha büyüktür"],
          [".exe / .msi", "Program", "Windows'ta çalıştırılabilir dosya", "Bilinmeyen kaynaktan açmayın"]
        ]
      },
      after: [
        "Bazı uzantılar Bilgi Bankası'nda ayrıca anlatılıyor: tablo verisi için [[bilgi:csv-dosyasi-nedir-excelde-nasil-acilir|CSV dosyası nedir]], görüntü biçimleri için [[bilgi:jpg-png-svg-farki|JPG, PNG ve SVG farkı]], veri dosyaları için [[bilgi:json-nedir-nasil-okunur|JSON nedir]] makalelerine göz atabilirsiniz."
      ]
    },
    {
      h: ".docx ve .xlsx dosyalarının içinde ne var?",
      p: [
        "Yeni tip ofis dosyaları, adlarındaki \"x\" harfinin işaret ettiği gibi XML tabanlıdır. Bir .docx ya da .xlsx dosyası aslında içinde XML metinleri, görseller ve ayar dosyaları bulunan bir ZIP arşividir. Dosyanın bir kopyasının uzantısını .zip yapıp açarsanız bu klasör yapısını görebilirsiniz; bu, uzantının yalnızca bir etiket olduğunun güzel bir kanıtıdır.",
        "Bu yapının pratik sonuçları vardır. Bir .docx dosyasını ZIP ile sıkıştırmak boyutunu çok az küçültür, çünkü zaten sıkıştırılmıştır. Belgedeki tüm görselleri çıkarmak isterseniz arşivin \"media\" klasörüne bakmanız yeterlidir. Eski .doc ve .xls biçimleri ise bu yapıda değildir; tek parça ikili dosyalardır."
      ]
    },
    {
      h: "Windows'ta ve Mac'te dosya uzantıları nasıl görünür yapılır?",
      ol: [
        "<strong>Windows 11:</strong> Dosya Gezgini'ni açın, üst menüden Görünüm > Göster > Dosya adı uzantıları seçeneğini işaretleyin.",
        "<strong>Windows 10:</strong> Dosya Gezgini'nde Görünüm sekmesine geçin ve \"Dosya adı uzantıları\" kutusunu işaretleyin.",
        "<strong>Mac:</strong> Finder'da Ayarlar > Gelişmiş bölümüne gidin ve \"Tüm dosya adı uzantılarını göster\" kutusunu işaretleyin.",
        "<strong>Telefon:</strong> Dosya yöneticisi uygulamalarının çoğu uzantıyı adla birlikte gösterir; göstermiyorsa dosyanın \"Bilgi\" ya da \"Ayrıntılar\" ekranına bakın."
      ],
      after: [
        "Uzantıları görünür yapmak, özellikle e-posta eki ve indirilen dosyalarla çok çalışıyorsanız önerilir. Böylece bir dosyanın gerçekten PDF mi yoksa PDF taklidi yapan bir program mı olduğunu bir bakışta anlarsınız."
      ]
    },
    {
      h: "Uzantıyı elle değiştirmek dosyayı dönüştürür mü?",
      p: [
        "Hayır. Uzantıyı değiştirmek, bir kutunun üzerindeki etiketi değiştirmek gibidir; kutunun içindeki değişmez. \"foto.webp\" dosyasını \"foto.jpg\" olarak yeniden adlandırdığınızda içerik hâlâ WebP biçimindedir. Bazı akıllı programlar dosyanın ilk baytlarına bakarak gerçek türü anlar ve dosyayı yine açar; birçok başvuru sistemi ve eski program ise uzantıya güvenip dosyayı bozuk diye reddeder.",
        "Gerçek dönüştürme için dosyanın içeriğinin yeni biçime göre yeniden yazılması gerekir. Görseller için [[arac:resim-donustur|Resim Dönüştürücü]] WebP, PNG, GIF, BMP, AVIF, SVG ve ICO dosyalarını JPG, PNG ya da WebP'ye çevirir (HEIC biçimi tarayıcılarda açılamadığı için bu araçta desteklenmez); belgeler için ilgili PDF ve ofis dönüştürücülerini kullanın. Uzantı değiştirmenin işe yaradığı tek durum, aynı biçimin iki adı olduğu durumlardır: .jpeg ile .jpg, .htm ile .html aynı biçimdir."
      ]
    },
    {
      h: "WebP fotoğraf neden bazı yerlere yüklenmiyor?",
      p: [
        "WebP, web sayfalarının daha hızlı yüklenmesi için geliştirilmiş bir görüntü biçimidir ve aynı kalitede JPG'den genellikle belirgin biçimde küçüktür. Tarayıcılar bir web sitesinden görseli \"farklı kaydet\" dediğinizde çoğu zaman WebP olarak indirir. Ancak birçok başvuru formu, kamu kurumu sistemi, eski fotoğraf düzenleme programı ve baskı servisi yalnızca JPG ve PNG kabul eder.",
        "Çözüm basittir: dosyayı yüklemeden önce [[arac:webp-jpg-donustur|WebP JPG Dönüştürücü]] ile gerçek bir JPG'ye çevirin. Araç toplu dönüştürme yapar, kalite ayarı sunar ve dosyalarınızı tarayıcıdan çıkarmaz. Aynı sorun bazı telefonların varsayılan fotoğraf biçimi olan HEIC için de geçerlidir; telefonun kamera ayarlarından \"en uyumlu\" biçimi seçmek ya da paylaşırken dönüştürmek gerekir."
      ]
    },
    {
      h: "Bir dosya hangi programla açılır?",
      p: [
        "İşletim sistemi her uzantı için bir varsayılan program tutar. Bir dosyaya çift tıkladığınızda bu program açılır. Varsayılanı değiştirmek için dosyaya sağ tıklayıp \"Birlikte aç\" menüsünden başka bir program seçebilir ve \"her zaman bu uygulamayla aç\" seçeneğini işaretleyebilirsiniz.",
        "Dosya açılmıyorsa üç ihtimal vardır: bilgisayarınızda o türü açan bir program yoktur, dosyanın uzantısı yanlıştır ya da dosya bozuktur (örneğin indirme yarıda kesilmiştir). Önce uzantıyı kontrol edin, ardından dosyanın boyutunun beklenen büyüklükte olup olmadığına bakın. 0 KB görünen bir dosya içi boş demektir ve hiçbir programla açılmaz. Arşiv dosyaları için [[arac:zip|ZIP aracı]] ile tarayıcıda içeriği görebilirsiniz."
      ]
    },
    {
      h: "Zararlı dosyalar hangi uzantıları taklit eder?",
      p: [
        "Kötü amaçlı yazılımlar çoğunlukla e-posta eki ya da indirme bağlantısı olarak gelir ve kendini zararsız bir belge gibi gösterir. En yaygın hile çift uzantıdır: \"Fatura_Kasim.pdf.exe\" adlı bir dosya, uzantılar gizliyken ekranda \"Fatura_Kasim.pdf\" gibi görünür ama çift tıklandığında bir program çalıştırır."
      ],
      ul: [
        "<strong>Program uzantıları:</strong> .exe, .msi, .scr, .bat, .cmd, .com bir belge değil, programdır. Fatura ya da kargo bildirimi olarak gelmesi büyük bir uyarı işaretidir.",
        "<strong>Betik uzantıları:</strong> .js, .vbs, .ps1, .hta dosyaları çift tıklandığında komut çalıştırabilir.",
        "<strong>Kısayol ve disk kalıbı:</strong> .lnk kısayolları ve e-postayla gelen .iso, .img dosyaları içinde program saklayabilir.",
        "<strong>Makrolu belgeler:</strong> .docm ve .xlsm dosyaları makro içerebilir; tanımadığınız kaynaktan gelen belgede \"içeriği etkinleştir\" uyarısına onay vermeyin.",
        "<strong>Ters çevrilmiş adlar:</strong> Dosya adına gizlenen görünmez bir yazı yönü karakteri, adın son kısmını ters çevirerek .exe ile biten bir dosyayı .pdf ile bitiyormuş gibi gösterebilir. Şüphelendiğiniz bir dosyanın gerçek türünü sağ tıklayıp Özellikler penceresinden kontrol edin; orada \"Uygulama\" yazıyorsa dosya bir belge değildir."
      ],
      after: [
        "Beklemediğiniz bir ek geldiğinde gönderen adresine ve bağlantılara dikkat edin; sahte iletileri tanımanın yollarını [[bilgi:oltalama-sahte-link-nasil-anlasilir|oltalama rehberinde]] bulabilirsiniz."
      ]
    },
    {
      h: "MIME türü nedir?",
      p: [
        "Bilgisayarınız dosya türünü uzantıdan anlar; internet ise başka bir etiket kullanır: <strong>MIME türü</strong> (medya türü). Bir web sunucusu size dosya gönderirken \"Content-Type\" başlığında bu türü bildirir; tarayıcı dosyayı göstereceğine mi, indireceğine mi buna bakarak karar verir. E-posta ekleri de aynı etiketle işaretlenir.",
        "MIME türü iki parçadan oluşur: genel tür ve alt tür. PDF için <code>application/pdf</code>, JPG için <code>image/jpeg</code>, PNG için <code>image/png</code>, düz metin için <code>text/plain</code>, CSV için <code>text/csv</code> kullanılır. Ofis dosyalarının türleri uzundur: .docx için <code>application/vnd.openxmlformats-officedocument.wordprocessingml.document</code>. Bir uzantının doğru MIME türünü ya da bir MIME türünün uzantısını [[arac:mime-turu-bul|MIME Türü Bulucu]] ile öğrenebilirsiniz; web sitesi kuran ya da dosya yükleme formu hazırlayanlar için özellikle yararlıdır."
      ]
    }
  ],
  faq: [
    ["Dosya uzantısı nedir?", "Dosya uzantısı, dosya adının son noktasından sonra gelen ve türünü belirten kısımdır. İşletim sistemi dosyayı hangi programla açacağına bu etikete bakarak karar verir; örneğin .pdf belge, .jpg fotoğraf demektir."],
    ["En yaygın dosya uzantıları ne anlama gelir?", ".pdf sabit görünümlü belge, .docx kelime işlemci belgesi, .xlsx hesap tablosu, .jpg ve .png görüntü, .zip sıkıştırılmış arşiv, .mp4 video, .exe ise Windows programıdır."],
    ["Windows'ta dosya uzantıları nasıl görünür yapılır?", "Windows 11'de Dosya Gezgini'nde Görünüm > Göster > Dosya adı uzantıları seçeneğini işaretleyin. Windows 10'da Görünüm sekmesindeki Dosya adı uzantıları kutusunu işaretlemeniz yeterlidir."],
    ["Uzantıyı elle değiştirmek dosyayı dönüştürür mü?", "Hayır. Uzantıyı değiştirmek yalnızca etiketi değiştirir, içerik aynı kalır. Bir WebP dosyasının adını .jpg yapmak onu JPG'ye çevirmez; gerçek dönüşüm için bir dönüştürme aracı gerekir."],
    ["Bir dosya hangi programla açılır?", "İşletim sistemi her uzantı için varsayılan bir program kullanır. Dosyaya sağ tıklayıp Birlikte aç menüsünden başka bir program seçebilir ve bunu kalıcı varsayılan yapabilirsiniz."],
    ["WebP fotoğraf neden bazı yerlere yüklenmiyor?", "Birçok başvuru formu, eski program ve baskı servisi yalnızca JPG ve PNG kabul eder. WebP dosyasını yüklemeden önce WebP JPG Dönüştürücü ile gerçek bir JPG'ye çevirmeniz sorunu çözer."],
    ["Zararlı dosyalar hangi uzantıları taklit eder?", "Programlar genellikle fatura.pdf.exe gibi çift uzantıyla belge taklidi yapar. .exe, .scr, .js, .vbs, .lnk ve e-postayla gelen .iso dosyalarına, makrolu .docm ve .xlsm belgelerine dikkat edin."],
    ["MIME türü nedir?", "MIME türü dosya türünün internetteki etiketidir ve sunucular ile e-posta programları bunu kullanır. PDF için application/pdf, JPG için image/jpeg, CSV için text/csv yazılır."],
    ["Dosya açılmıyorsa ne yapmalıyım?", "Önce uzantının doğru olduğunu ve dosya boyutunun sıfır olmadığını kontrol edin. Uygun program yüklü değilse türü açan bir program ya da tarayıcıda çalışan bir araç kullanın; dosya yarım indiyse tekrar indirin."]
  ],
  tools: ["mime-turu-bul", "webp-jpg-donustur", "resim-donustur", "zip"],
  related: ["csv-dosyasi-nedir-excelde-nasil-acilir", "jpg-png-svg-farki", "json-nedir-nasil-okunur", "oltalama-sahte-link-nasil-anlasilir"],
  sources: [
    ["IANA – Medya türleri (MIME) kaydı", "https://www.iana.org/assignments/media-types/media-types.xhtml"]
  ]
};
