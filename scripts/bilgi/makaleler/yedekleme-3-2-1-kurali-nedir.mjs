export default {
  slug: "yedekleme-3-2-1-kurali-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Yedekleme Nasıl Yapılır? 3-2-1 Kuralı, Bulut ve Harici Disk Kapasitesi",
  pageTitle: "3-2-1 Yedekleme Kuralı Nedir? Harici Disk ve Bulut Yedeği",
  description: "3-2-1 kuralı: verinin 3 kopyası, 2 farklı ortam, 1 kopya başka yerde. Kaç TB disk gerektiği, bulut yüklemesinin süresi, RAID farkı ve yedek testi örnekli.",
  keywords: ["yedekleme nasıl yapılır", "3-2-1 yedekleme kuralı", "telefon yedekleme", "harici disk kaç tb", "bulut yedekleme", "fotoğraf yedekleme", "yedekleme sıklığı", "fidye yazılımı yedek"],
  lead: "3-2-1 yedekleme kuralı, önemli verilerinizin en az 3 kopyasını tutmanız, bu kopyaları 2 farklı ortamda saklamanız ve 1 kopyayı evinizin ya da iş yerinizin dışında bulundurmanız demektir. Böylece disk arızası, hırsızlık, yangın ya da fidye yazılımı gibi tek bir olay bütün kopyaları aynı anda yok edemez. Bu sayfada kuralı adım adım uygulamayı, kaç TB harici disk gerektiğini hesaplamayı, bulut yedeğinin ne kadar sürede yükleneceğini ve yedeklerin nasıl test edileceğini anlatıyoruz.",
  kisaCevap: [
    "3 kopya: çalıştığınız özgün veri ve en az 2 yedek.",
    "2 ortam: örneğin bilgisayar diski ve harici disk; aynı diskin iki klasörü sayılmaz.",
    "1 kopya dışarıda: bulutta ya da başka bir adreste; yangın, sel ve hırsızlığa karşı korur.",
    "Senkronizasyon yedek değildir: silinen ya da şifrelenen dosya her yerde silinir veya şifrelenir.",
    "RAID disk arızasına karşı çalışmayı sürdürür ama yedeğin yerini tutmaz; yanlışlıkla silmeye karşı korumaz.",
    "Yedek, geri yüklenebildiği kadar değerlidir; en az üç ayda bir örnek dosya geri yükleyerek test edin."
  ],
  figure: {
    alt: "3-2-1 kuralı şeması: üç kopya (bilgisayar, harici disk, bulut), iki ortam türü (yerel disk ve ağ üzerindeki depolama) ve bir kopyanın binanın dışında olması. Altta 500 GB verinin 20 Mbps yükleme hızıyla buluta yaklaşık 56 saatte çıkması.",
    caption: "Üç kopyadan ikisi evde farklı ortamlarda, biri dışarıda durur. Alt kısım, ilk bulut yedeğinin neden günler sürebileceğini gösterir: 500 GB × 8 ÷ 20 Mbps ≈ 55,6 saat.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">3-2-1: tek bir olay tüm kopyaları silemesin</text>
  <rect x="20" y="50" width="440" height="200" rx="10" class="sf sb dash"/>
  <text x="36" y="72" class="sm b t2">Ev / iş yeri</text>
  <rect x="40" y="86" width="190" height="140" rx="8" class="p"/>
  <text x="135" y="116" class="xl mid sf">1</text>
  <text x="135" y="146" class="b mid sf">Özgün veri</text>
  <text x="135" y="170" class="sm mid sf">bilgisayar diski</text>
  <text x="135" y="196" class="sm mid sf">her gün kullanılır</text>
  <rect x="250" y="86" width="190" height="140" rx="8" class="ps"/>
  <text x="345" y="116" class="xl mid">2</text>
  <text x="345" y="146" class="b mid">Harici disk</text>
  <text x="345" y="170" class="sm mid">farklı ortam</text>
  <text x="345" y="196" class="sm mid">yedekten sonra çıkarılır</text>
  <rect x="490" y="86" width="210" height="140" rx="8" class="oks"/>
  <text x="595" y="116" class="xl mid">3</text>
  <text x="595" y="146" class="b mid">Bulut / başka adres</text>
  <text x="595" y="170" class="sm mid">binanın dışında</text>
  <text x="595" y="196" class="sm mid">yangın, sel, hırsızlık</text>
  <g class="b mid">
    <text x="120" y="282" class="lg p">3 kopya</text>
    <text x="360" y="282" class="lg p">2 ortam</text>
    <text x="600" y="282" class="lg p">1 dışarıda</text>
  </g>
  <rect x="20" y="304" width="680" height="100" rx="10" class="sf sb"/>
  <rect x="20" y="304" width="8" height="100" class="p"/>
  <text x="44" y="330" class="b">İlk bulut yedeği ne kadar sürer?</text>
  <text x="44" y="356" class="sm">500 GB = 500.000 MB · × 8 = 4.000.000 megabit</text>
  <text x="44" y="380" class="sm">÷ 20 Mbps yükleme = 200.000 saniye ≈ 55,6 saat (yaklaşık 2,3 gün)</text>
  <text x="44" y="398" class="sm t2">Sonraki yedeklerde yalnızca değişen dosyalar gider.</text>
</svg>`
  },
  sections: [
    {
      h: "3-2-1 yedekleme kuralı nedir?",
      p: [
        "3-2-1 kuralı, yedeklemeyi ezberlenmesi kolay üç sayıya indirger. Amacı, veri kaybına yol açan olayların hiçbirinin bütün kopyaları birlikte etkilememesidir. Bir disk bozulabilir, bir dizüstü bilgisayar çalınabilir, evde su baskını olabilir ya da bir fidye yazılımı bağlı bütün diskleri şifreleyebilir. Kopyalar farklı ortamlarda ve farklı yerlerde durursa bu olaylardan biri yaşandığında en az bir sağlam kopya kalır.",
        "<strong>3 kopya</strong>, özgün veriyle birlikte toplam üç kopya demektir; yani iki ayrı yedek. <strong>2 ortam</strong>, kopyaların aynı türden tek bir cihaza bağlı olmamasıdır: bilgisayar diski ile harici disk, ya da harici disk ile ağ depolama birimi gibi. <strong>1 dışarıda</strong>, kopyalardan birinin fiziksel olarak başka bir yerde, çoğu zaman bir bulut hizmetinde ya da güvendiğiniz bir yakınınızın evinde durmasıdır.",
        "Son yıllarda bu kurala eklemeler de yapılıyor. Örneğin kopyalardan birinin çevrim dışı ya da değiştirilemez olması ve yedeklerin hatasız geri yüklendiğinin doğrulanması öneriliyor. Bu eklemeler, özellikle fidye yazılımına karşı korunmanın önemini vurgular."
      ]
    },
    {
      h: "Yedekleme ile senkronizasyon arasındaki fark nedir?",
      p: [
        "En sık yapılan yanlış, bir bulut klasörüne eşitlenen dosyaları yedek sanmaktır. <strong>Senkronizasyon</strong>, iki ya da daha fazla konumu aynı halde tutar: bilgisayarınızda bir dosyayı sildiğinizde buluttaki kopyası da silinir; bir fidye yazılımı dosyayı şifrelerse şifreli hali buluta da eşitlenir. Senkronizasyonun amacı erişimdir, koruma değil.",
        "<strong>Yedekleme</strong> ise verinin belirli bir andaki halini ayrı bir yerde saklar ve genellikle birden çok sürümü tutar. Dün sildiğiniz bir dosyayı geçen haftanın yedeğinden geri getirebilirsiniz. Bazı bulut hizmetleri silinen dosyalar ve önceki sürümler için belirli bir süre geri alma imkânı sunar; bu özellik faydalıdır ama süresi sınırlıdır ve gerçek bir yedeğin yerini tamamen tutmaz."
      ],
      table: {
        head: ["Özellik", "Senkronizasyon", "Yedekleme"],
        rows: [
          ["Amaç", "Dosyalara her cihazdan erişmek", "Kaybolan veriyi geri getirmek"],
          ["Silinen dosya", "Her yerde silinir", "Eski yedekte durur"],
          ["Fidye yazılımı", "Şifreli dosya her yere yayılır", "Önceki sürüm temiz kalır"],
          ["Sürüm geçmişi", "Sınırlı ya da yok", "Günlük, haftalık, aylık sürümler"],
          ["Tipik araç", "Eşitlenen bulut klasörü", "Yedekleme yazılımı, harici disk, sürüm tutan bulut yedeği"]
        ]
      }
    },
    {
      h: "Kaç TB harici disk gerekir? Çözümlü örnek",
      p: [
        "Harici disk kapasitesini belirlerken yalnızca bugünkü veri miktarına bakmak yetmez. Veri her yıl büyür ve iyi bir yedekleme düzeni birden çok sürüm saklar. Pratik bir hesap için üç değer yeterlidir: bugünkü veri miktarı, yıllık büyüme tahmini ve sürümler için ek pay."
      ],
      formula: "Gereken kapasite ≈ bugünkü veri × (1 + yıllık büyüme)^yıl × sürüm payı\nÖrnek: 500 GB × 1,2³ × 1,5 ≈ 1.296 GB → 2 TB disk",
      ol: [
        "Yedeklenecek veriyi toplayın: belgeler 40 GB, fotoğraf ve videolar 420 GB, diğer dosyalar 40 GB; toplam 500 GB.",
        "Büyümeyi hesaba katın: yılda %20 büyüme varsayımıyla 3 yıl sonra 500 × 1,2 × 1,2 × 1,2 = 864 GB olur.",
        "Sürüm payı ekleyin: önceki sürümler ve silinen dosyalar için 1,5 kat pay ile 864 × 1,5 ≈ 1.296 GB.",
        "Piyasadaki bir üst kapasiteyi seçin: 2 TB disk bu ihtiyacı karşılar.",
        "Bilgisayarda görünen kapasiteyi beklentinize ekleyin: 2 TB disk işletim sisteminde yaklaşık 1,82 TB olarak görünür; bu bir eksik değil, birim farkıdır."
      ],
      after: [
        "Disk kapasitesinin neden kutudaki değerden küçük göründüğünü [[bilgi:gb-kac-mb-veri-birimleri|1 GB kaç MB]] yazısında anlatıyoruz. Hesabı farklı değerlerle denemek için [[arac:gb-tb-cevir|GB TB Çevirici]] hem 1.000 hem 1.024 tabanında sonuç verir."
      ]
    },
    {
      h: "Bulut yedeği ne kadar sürede yüklenir?",
      p: [
        "İlk bulut yedeği çoğu kişinin beklediğinden uzun sürer, çünkü ev internet bağlantılarında yükleme hızı indirme hızından genellikle çok daha düşüktür. Süreyi hesaplamak için veri miktarını megabite çevirip yükleme hızına bölmeniz yeterlidir."
      ],
      formula: "Süre (saniye) = veri (MB) × 8 ÷ yükleme hızı (Mbps)\n500 GB: 500.000 × 8 ÷ 20 = 200.000 sn ≈ 55,6 saat",
      table: {
        head: ["Veri miktarı", "10 Mbps yükleme", "20 Mbps yükleme", "50 Mbps yükleme"],
        rows: [
          ["50 GB", "11,1 saat", "5,6 saat", "2,2 saat"],
          ["200 GB", "44,4 saat", "22,2 saat", "8,9 saat"],
          ["500 GB", "111,1 saat", "55,6 saat", "22,2 saat"],
          ["1 TB", "222,2 saat", "111,1 saat", "44,4 saat"]
        ],
        caption: "Teorik değerlerdir; Wi-Fi, hat yoğunluğu ve hizmetin kendi sınırları nedeniyle gerçek süre genellikle daha uzundur."
      },
      after: [
        "İyi haber şu ki bu süre yalnızca ilk yedekte yaşanır. Sonraki yedeklerde yalnızca yeni ve değişen dosyalar gönderilir. İlk yüklemeyi geceleri ve hafta sonları yapmak, gün içindeki internet kullanımınızı etkilemez. Kendi hattınızla hesap yapmak için [[arac:indirme-suresi-hesapla|İndirme Süresi Hesaplama]] aracına hızınızı yükleme değeri olarak girebilirsiniz; hat hızı seçimi için [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Telefon fotoğrafları nasıl yedeklenir?",
      p: [
        "Telefonlar çoğu insanın en değerli fotoğraflarını tutar, ama en kolay kaybolan, düşen ya da çalınan cihazlardır. Telefon için de 3-2-1 mantığı geçerlidir; yalnızca uygulaması biraz farklıdır."
      ],
      ul: [
        "<strong>Otomatik bulut yedeği:</strong> telefonun fotoğraf yedekleme özelliğini açın ve yalnızca Wi-Fi'de yüklemeyi seçin. Bu, dışarıdaki kopyanızdır.",
        "<strong>Bilgisayara ya da harici diske aktarım:</strong> ayda bir fotoğrafları kabloyla bilgisayara aktarın ve oradan harici diske yedekleyin. Bu, ikinci ortamdır.",
        "<strong>Tarih klasörleri:</strong> aktarılan fotoğrafları yıl ve ay klasörlerine ayırmak hem aramayı hem yedeğin eksiksiz olup olmadığını kontrol etmeyi kolaylaştırır.",
        "<strong>Silmeden önce kontrol:</strong> telefonda yer açmak için fotoğrafları silmeden önce iki ayrı kopyada da göründüklerinden emin olun.",
        "<strong>Mesajlaşma yedekleri:</strong> sohbet uygulamalarının kendi yedekleme ayarları vardır; fotoğraf yedeği bunları kapsamayabilir."
      ]
    },
    {
      h: "RAID yedek yerine geçer mi?",
      p: [
        "Geçmez. RAID, birden çok diski tek bir birim gibi kullanarak ya hız ya da disk arızasına karşı süreklilik sağlar. Örneğin RAID 1'de veri iki diske aynı anda yazılır; disklerden biri bozulursa sistem diğeriyle çalışmaya devam eder. Bu, çalışmanın kesintisiz sürmesi için iyidir.",
        "Ancak RAID her değişikliği anında bütün disklere uygular. Yanlışlıkla sildiğiniz bir klasör her iki diskten de silinir; fidye yazılımı her iki diski de şifreler; cihazın güç kaynağı arızalanıp diskleri birlikte bozarsa iki kopya birden gider. Kısacası RAID bir donanım arızasına karşı önlemdir, veri kaybına karşı değil. Seviyeler arasındaki farkları [[bilgi:raid-0-1-5-10-farki|RAID 0, 1, 5, 10 farkı]] yazısında, kullanılabilir kapasiteyi ise [[arac:raid-kapasite-hesapla|RAID Kapasite Hesaplama]] aracında görebilirsiniz."
      ]
    },
    {
      h: "Fidye yazılımına karşı çevrim dışı yedek neden önemlidir?",
      p: [
        "Fidye yazılımı, bilgisayara bulaştığında erişebildiği dosyaları şifreleyen ve açmak için ödeme isteyen zararlı yazılımdır. Erişebildiği alan yalnızca bilgisayarın kendi diski değildir: takılı duran harici disk, ağdaki paylaşılan klasörler ve eşitlenen bulut klasörleri de etkilenebilir. Bu yüzden sürekli bağlı duran bir yedek, en çok ihtiyaç duyulduğu anda işe yaramayabilir.",
        "Çevrim dışı yedek, yedekleme bittikten sonra bilgisayardan çıkarılan ve çekmecede duran disktir. Saldırı anında bağlı olmadığı için etkilenmez. Bunun bir alternatifi, belirli bir süre boyunca silinemeyen ve değiştirilemeyen sürümler tutan yedekleme hizmetleridir. Hangisini seçerseniz seçin, en az bir yedeğin saldırganın ulaşamayacağı yerde durması gerekir."
      ],
      note: "Bir fidye yazılımı saldırısı yaşarsanız bilgisayarı ağdan ayırın, yedek diskinizi o bilgisayara takmayın ve temizlik yapılmadan geri yükleme yapmayın; gerekiyorsa bir bilişim uzmanından destek alın."
    },
    {
      h: "Yedekler ne sıklıkla alınmalı ve test edilmelidir?",
      p: [
        "Yedekleme sıklığının ölçüsü basittir: kaybetmeyi göze alabileceğiniz en uzun çalışma süresi kadar. Her gün belge üreten bir serbest çalışan için günlük yedek, ayda bir fotoğraf aktaran bir aile için aylık yedek yeterli olabilir. Otomatik yedekleme kurmak, \"yarın yaparım\" ertelemesinin önüne geçer."
      ],
      table: {
        head: ["Veri türü", "Önerilen sıklık", "Not"],
        rows: [
          ["İş belgeleri, muhasebe dosyaları", "Günlük", "Otomatik ve sürüm tutan yedek"],
          ["Telefon fotoğrafları", "Sürekli bulut + aylık disk", "Wi-Fi'de otomatik yükleme"],
          ["Kişisel belgeler", "Haftalık", "Önemli değişiklikten sonra ayrıca"],
          ["Arşiv (eski fotoğraf, taranmış belge)", "Değiştiğinde", "Yılda bir ikinci diske kopyalayın"]
        ]
      },
      ol: [
        "Üç ayda bir, yedekten rastgele birkaç dosyayı farklı bir klasöre geri yükleyin ve açılıp açılmadığını kontrol edin.",
        "Büyük arşivlerde dosyaların bozulmadığını doğrulamak için dosya özetini karşılaştırın; [[arac:dosya-hash|Dosya Hash Hesaplama]] aynı dosyanın iki kopyasının birebir aynı olup olmadığını gösterir.",
        "Yedek diskini yılda bir kontrol edin; eski diskler uyarı vermeden bozulabilir, 4–5 yıllık diskleri yenilemeyi planlayın.",
        "Bulut hesabınızda iki adımlı doğrulama açık olsun; yedeğinize giden yolu da korumanız gerekir. Ayrıntılar için [[bilgi:iki-adimli-dogrulama-nedir-2fa|iki adımlı doğrulama]] yazısına bakın."
      ]
    }
  ],
  faq: [
    ["3-2-1 yedekleme kuralı nedir?", "Verinin toplam 3 kopyasını tutmak, bu kopyaları 2 farklı ortamda saklamak ve 1 kopyayı bina dışında bulundurmak demektir. Böylece disk arızası, hırsızlık ya da yangın gibi tek bir olay bütün kopyaları birden yok edemez."],
    ["Yedekleme ile senkronizasyon arasındaki fark nedir?", "Senkronizasyon konumları aynı halde tutar; silinen ya da şifrelenen dosya her yerde silinir veya şifrelenir. Yedekleme verinin belirli bir andaki halini ayrı saklar ve eski sürümlere dönmenizi sağlar."],
    ["Kaç TB harici disk gerekir?", "Bugünkü veri miktarını yıllık büyümeyle ve sürüm payıyla çarpın. Örneğin 500 GB veri, yılda %20 büyüme, 3 yıl ve 1,5 kat sürüm payıyla yaklaşık 1,3 TB eder; 2 TB disk yeterli olur."],
    ["Bulut yedeği ne kadar sürede yüklenir?", "Veri miktarını megabite çevirip yükleme hızına bölün. 500 GB veri 20 Mbps yükleme hızıyla teorik olarak yaklaşık 55,6 saat sürer; sonraki yedeklerde yalnızca değişen dosyalar gönderildiği için süre kısalır."],
    ["Telefon fotoğrafları nasıl yedeklenir?", "Telefonda otomatik bulut yedeğini Wi-Fi ile açın, ayrıca ayda bir fotoğrafları bilgisayara ve oradan harici diske aktarın. Fotoğrafları telefondan silmeden önce iki ayrı kopyada da bulunduklarını kontrol edin."],
    ["RAID yedek yerine geçer mi?", "Geçmez. RAID disk arızasında çalışmanın sürmesini sağlar ama silme, fidye yazılımı ve cihazın tümden arızalanması gibi durumlarda tüm diskler birlikte etkilenir. RAID kullansanız da ayrı bir yedek gerekir."],
    ["Yedekler ne sıklıkla test edilmelidir?", "En az üç ayda bir yedekten rastgele dosyalar geri yükleyip açılabildiklerini kontrol edin. Geri yüklenemeyen yedek, hiç yedek olmamasıyla aynıdır; eski diskleri de düzenli aralıklarla yenileyin."],
    ["Fidye yazılımına karşı çevrim dışı yedek neden önemlidir?", "Fidye yazılımı bilgisayara bağlı diskleri ve eşitlenen klasörleri de şifreleyebilir. Yedekten sonra çıkarılan disk saldırı anında bağlı olmadığı için etkilenmez ve temiz kopyayı korur."],
    ["Yedeklerimi şifrelemeli miyim?", "Kişisel veya ticari bilgi içeren yedekleri şifrelemek, disk kaybolduğunda ya da çalındığında verinin okunmasını önler. Şifreleme parolasını yedekten ayrı ve güvenli bir yerde saklayın; parolayı kaybederseniz yedeğe siz de ulaşamazsınız."]
  ],
  tools: ["gb-tb-cevir", "indirme-suresi-hesapla", "raid-kapasite-hesapla", "dosya-hash"],
  related: ["raid-0-1-5-10-farki", "gb-kac-mb-veri-birimleri", "iki-adimli-dogrulama-nedir-2fa", "internet-hizi-kac-mbps-olmali"]
};
