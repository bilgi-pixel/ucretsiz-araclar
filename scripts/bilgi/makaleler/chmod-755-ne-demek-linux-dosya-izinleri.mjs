export default {
  slug: "chmod-755-ne-demek-linux-dosya-izinleri",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "chmod 755 Ne Demek? Linux Dosya İzinleri ve Sekizlik Gösterim",
  pageTitle: "chmod 755 Ne Demek? Linux Dosya İzinleri, 644 ve 777 Farkı",
  description: "chmod 755 sahibine okuma-yazma-çalıştırma, gruba ve diğerlerine okuma-çalıştırma verir. rwx, sekizlik izin hesabı, 644, 600, 777 riski, umask ve sunucu örnekleri.",
  keywords: ["chmod 755 ne demek", "chmod 644", "linux dosya izinleri", "rwx nedir", "chmod 777 tehlikeli mi", "sekizlik izin", "wordpress dosya izinleri", "umask nedir"],
  lead: "<code>chmod 755</code>, bir dosya ya da klasöre <strong>sahibi için okuma, yazma ve çalıştırma</strong>, <strong>grup ve diğer kullanıcılar için yalnızca okuma ve çalıştırma</strong> izni verir; harfli gösterimi <code>rwxr-xr-x</code>'tir. Her rakam bir kullanıcı sınıfını temsil eder ve okuma 4, yazma 2, çalıştırma 1 değerinin toplamıdır: 7 = 4 + 2 + 1, 5 = 4 + 1. Bu sayfada izinlerin nasıl okunduğunu, web sunucularında hangi değerlerin kullanıldığını ve 777'nin neden ciddi bir güvenlik riski olduğunu anlatıyoruz.",
  kisaCevap: [
    "Okuma (r) = 4, yazma (w) = 2, çalıştırma (x) = 1; her rakam bu değerlerin toplamıdır.",
    "Üç rakam sırasıyla sahip (user), grup (group) ve diğerleri (others) içindir.",
    "755 = rwxr-xr-x: klasörler ve çalıştırılabilir betikler için yaygındır.",
    "644 = rw-r--r--: web sitesi dosyaları ve yapılandırma dışındaki belgeler için yaygındır.",
    "777 = rwxrwxrwx: sunucudaki herkesin dosyayı değiştirmesine izin verir; sorun çözmek için kullanılmamalıdır.",
    "umask yeni dosyaların varsayılan iznini belirler; 022 değeri dosyaları 644, klasörleri 755 yapar."
  ],
  figure: {
    alt: "chmod 755 izninin çözümlemesi: sahip için 7 yani okuma, yazma, çalıştırma; grup ve diğerleri için 5 yani okuma ve çalıştırma; rakamların 4, 2 ve 1 toplamı olarak gösterimi.",
    caption: "755'in her rakamı bir kullanıcı sınıfıdır. Rakam, açık olan izinlerin değerleri toplanarak bulunur: r = 4, w = 2, x = 1. Kırmızı kutular kapalı izni gösterir.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="32" class="lg b mid">chmod 755 = rwxr-xr-x</text>
  <text x="140" y="74" class="b mid">Sahip (u)</text>
  <text x="360" y="74" class="b mid">Grup (g)</text>
  <text x="580" y="74" class="b mid">Diğerleri (o)</text>
  <g class="b mid">
    <rect x="65" y="90" width="46" height="46" rx="6" class="oks"/><text x="88" y="120">r</text>
    <rect x="117" y="90" width="46" height="46" rx="6" class="oks"/><text x="140" y="120">w</text>
    <rect x="169" y="90" width="46" height="46" rx="6" class="oks"/><text x="192" y="120">x</text>
    <rect x="285" y="90" width="46" height="46" rx="6" class="oks"/><text x="308" y="120">r</text>
    <rect x="337" y="90" width="46" height="46" rx="6" class="dgs"/><text x="360" y="120">−</text>
    <rect x="389" y="90" width="46" height="46" rx="6" class="oks"/><text x="412" y="120">x</text>
    <rect x="505" y="90" width="46" height="46" rx="6" class="oks"/><text x="528" y="120">r</text>
    <rect x="557" y="90" width="46" height="46" rx="6" class="dgs"/><text x="580" y="120">−</text>
    <rect x="609" y="90" width="46" height="46" rx="6" class="oks"/><text x="632" y="120">x</text>
  </g>
  <g class="sm mid t2">
    <text x="88" y="156">4</text><text x="140" y="156">2</text><text x="192" y="156">1</text>
    <text x="308" y="156">4</text><text x="360" y="156">0</text><text x="412" y="156">1</text>
    <text x="528" y="156">4</text><text x="580" y="156">0</text><text x="632" y="156">1</text>
  </g>
  <rect x="85" y="176" width="110" height="60" rx="8" class="p"/><text x="140" y="216" class="xl mid sf">7</text>
  <rect x="305" y="176" width="110" height="60" rx="8" class="p"/><text x="360" y="216" class="xl mid sf">5</text>
  <rect x="525" y="176" width="110" height="60" rx="8" class="p"/><text x="580" y="216" class="xl mid sf">5</text>
  <text x="140" y="258" class="sm mid">4 + 2 + 1</text>
  <text x="360" y="258" class="sm mid">4 + 0 + 1</text>
  <text x="580" y="258" class="sm mid">4 + 0 + 1</text>
  <rect x="20" y="282" width="680" height="84" rx="8" class="sf sb"/>
  <text x="40" y="310" class="b">644 = rw-r--r--   (dosya: herkes okur, yalnızca sahip yazar)</text>
  <text x="40" y="336" class="b">600 = rw-------   (gizli dosya: yalnızca sahip)</text>
  <text x="40" y="358" class="b dg">777 = rwxrwxrwx   (herkes yazar: güvenlik riski)</text>
</svg>`
  },
  sections: [
    {
      h: "chmod komutu ne işe yarar?",
      p: [
        "Linux ve diğer Unix benzeri sistemlerde her dosya ve klasörün bir sahibi, bir grubu ve bir izin takımı vardır. <code>chmod</code> (change mode) komutu bu izinleri değiştirir: kimin dosyayı okuyabileceğini, değiştirebileceğini ve program olarak çalıştırabileceğini belirler. Web barındırma panellerindeki \"dosya izinleri\" kutusu da arka planda aynı işi yapar.",
        "İzinler güvenliğin temel katmanıdır. Bir web sitesinin dosyaları yanlış izinlerle bırakılırsa sunucudaki başka bir kullanıcı ya da ele geçirilmiş bir eklenti dosyalara kötü amaçlı kod yazabilir. Tersine, izinler gereğinden dar olursa site dosyaları okunamaz ve sayfa hata verir. Doğru değer, \"çalışması için gereken en az izin\" ilkesiyle seçilir."
      ]
    },
    {
      h: "rwx harfleri ne anlama gelir? Dosya ve klasörde fark",
      p: [
        "Üç izin harfi dosyada ve klasörde farklı anlamlar taşır. Bu fark, klasörlerin neden çoğu zaman 755, dosyaların ise 644 olduğunu açıklar."
      ],
      table: {
        head: ["Harf", "Değer", "Dosyada anlamı", "Klasörde anlamı"],
        rows: [
          ["r (read)", "4", "İçeriği okumak", "Klasördeki dosya adlarını listelemek"],
          ["w (write)", "2", "İçeriği değiştirmek", "Klasöre dosya eklemek, silmek, yeniden adlandırmak"],
          ["x (execute)", "1", "Program ya da betik olarak çalıştırmak", "Klasöre girmek ve içindeki dosyalara erişmek"],
          ["- (tire)", "0", "İzin yok", "İzin yok"]
        ]
      },
      after: [
        "Bir klasörde x izni yoksa, içindeki dosyanın kendi izni ne olursa olsun o dosyaya ulaşılamaz. Bu yüzden web sunucusunun okuması gereken klasörlerde diğerleri için en az r ve x açık olmalıdır. Terminalde <code>ls -l</code> komutu izinleri, başında dosya türünü gösteren bir harfle birlikte (ör. klasör için d) on karakter olarak listeler: <code>drwxr-xr-x</code> gibi."
      ]
    },
    {
      h: "Sekizlik sayı izinleri nasıl temsil eder?",
      p: [
        "Her kullanıcı sınıfı için üç izin vardır ve her izin açık ya da kapalıdır; bu üç bit 0 ile 7 arasında tek bir sekizlik (oktal) rakamla yazılabilir. Okuma en soldaki bit (4), yazma ortadaki (2), çalıştırma en sağdaki (1) bittir. Örneğin r-x, ikilik olarak 101, sekizlik olarak 5'tir."
      ],
      formula: "İzin rakamı = 4 × r + 2 × w + 1 × x   (açıksa 1, kapalıysa 0)\nrwx = 111₂ = 7 · rw- = 110₂ = 6 · r-x = 101₂ = 5 · r-- = 100₂ = 4\nÜç rakam: sahip, grup, diğerleri → 755, 644, 600 …",
      table: {
        head: ["Rakam", "İkilik", "Harfler", "Anlamı"],
        rows: [
          ["0", "000", "---", "Hiç izin yok"],
          ["4", "100", "r--", "Yalnızca okuma"],
          ["5", "101", "r-x", "Okuma ve çalıştırma"],
          ["6", "110", "rw-", "Okuma ve yazma"],
          ["7", "111", "rwx", "Tüm izinler"]
        ]
      },
      after: [
        "Sekizlik sistemin neden kullanıldığını ve ikilik sistemle ilişkisini [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısında bulabilirsiniz. Bir izin kodunun açılımını ve ondalık karşılığını görmek için [[arac:sekizlik-ondalik-cevir|Sekizlik Ondalık Çevirici]], bitleri tek tek görmek için [[arac:ikili-ondalik-cevir|İkili Ondalık Çevirici]] kullanılabilir."
      ]
    },
    {
      h: "755, 644, 600 ve 777 izinleri nasıl okunur?",
      table: {
        head: ["Kod", "Harfli", "Tipik kullanım", "Değerlendirme"],
        rows: [
          ["755", "rwxr-xr-x", "Klasörler, çalıştırılabilir betikler", "Yaygın ve güvenli varsayılan"],
          ["644", "rw-r--r--", "HTML, CSS, görsel ve PHP dosyaları", "Yaygın ve güvenli varsayılan"],
          ["600", "rw-------", "Gizli anahtar, parola içeren yapılandırma", "Yalnızca sahip erişir"],
          ["640", "rw-r-----", "Grubun okuması gereken yapılandırma", "Diğerleri hiç erişemez"],
          ["700", "rwx------", "Kişisel betik ve klasörler", "Yalnızca sahip"],
          ["777", "rwxrwxrwx", "Önerilmez", "Herkes yazabilir, ciddi risk"]
        ]
      },
      after: [
        "Okuma alışkanlığı kazanmak için kodu soldan sağa üçe ayırın: 640'ta sahip 6 (okur, yazar), grup 4 (yalnızca okur), diğerleri 0 (hiçbir şey yapamaz). Dört basamaklı kodlarda (ör. 1777) ilk rakam özel bitleri gösterir: 4 setuid, 2 setgid, 1 yapışkan bit. Yapışkan bit, herkesin yazabildiği ortak klasörlerde kullanıcıların yalnızca kendi dosyalarını silebilmesini sağlar."
      ]
    },
    {
      h: "chmod 777 neden güvenlik riski taşır?",
      p: [
        "777, sistemdeki her kullanıcıya dosya üzerinde tam yetki verir. Paylaşımlı bir barındırmada \"diğerleri\" sınıfı, aynı sunucudaki başka hesapları ve web sunucusu sürecini de kapsayabilir. Bir sitenin eklentisinde açık bulunduğunda saldırgan, 777 izinli bir klasöre zararlı bir betik yazıp çalıştırabilir ya da mevcut dosyaya gizli kod ekleyebilir. Bu, sitelerin \"hacklendi\" diye fark edildiği vakaların sık rastlanan bir başlangıç noktasıdır.",
        "777 genellikle bir hata mesajını hızlıca susturmak için verilir: \"Dosya yazılamıyor\" uyarısı görülünce izin sonuna kadar açılır. Doğru çözüm, dosyanın sahibini ve grubunu düzeltmek ya da yalnızca yazılması gereken klasöre (ör. yükleme klasörü) dar bir izin vermektir. Kural basittir: bir şey 777 ile çalışıp 755 ile çalışmıyorsa sorun çoğu zaman izin değil, sahipliktir ve kalıcı çözüm de oradadır."
      ],
      ul: [
        "777 verdiyseniz geri alın: klasörleri 755, dosyaları 644 yapın.",
        "Web sunucusunun yazması gereken klasörün sahibini sunucu kullanıcısına ayarlayın ya da grubu ortaklaştırın.",
        "Hiçbir zaman yapılandırma ve parola dosyalarına 666 ya da 777 vermeyin.",
        "Bir site saldırıya uğradıktan sonra izinleri düzeltmek yetmez; değiştirilmiş dosyaları temiz yedekle karşılaştırın ve tüm parolaları yenileyin."
      ]
    },
    {
      h: "Sahip, grup ve diğerleri ayrımı nedir?",
      p: [
        "Sahip (user), dosyayı oluşturan ya da sahipliği kendisine atanan kullanıcıdır. Grup (group), dosyanın bağlı olduğu kullanıcı grubudur; aynı projede çalışan birkaç kişiye ya da web sunucusu ile site kullanıcısına ortak erişim vermek için kullanılır. Diğerleri (others) ise bu iki sınıfa girmeyen herkestir.",
        "Sahiplik <code>chown</code>, grup <code>chgrp</code> ya da <code>chown kullanici:grup</code> ile değiştirilir; bu komutlar genellikle yönetici yetkisi ister. Bir sorunun izinden mi sahiplikten mi kaynaklandığını anlamak için önce <code>ls -l</code> çıktısında sahip ve grup sütunlarına bakmak gerekir."
      ]
    },
    {
      h: "Sembolik gösterim (u+x) ile sayısal gösterim farkı nedir?",
      p: [
        "Sayısal gösterim izinlerin tamamını tek seferde ayarlar: <code>chmod 644 dosya</code> önceki durum ne olursa olsun sonucu rw-r--r-- yapar. Sembolik gösterim ise mevcut izinlerin üzerine ekleme ya da çıkarma yapar ve tek bir izni değiştirmek istediğinizde daha güvenlidir."
      ],
      table: {
        head: ["Komut", "Etkisi"],
        rows: [
          ["chmod u+x betik.sh", "Yalnızca sahibe çalıştırma izni ekler"],
          ["chmod g-w rapor.txt", "Gruptan yazma iznini kaldırır"],
          ["chmod o= gizli.conf", "Diğerlerinin tüm izinlerini kaldırır"],
          ["chmod a+r ilan.html", "Herkese okuma izni ekler (a = all)"],
          ["chmod u=rwx,go=rx klasor", "755 ile aynı sonucu verir"]
        ]
      },
      after: [
        "<code>-R</code> seçeneği izni alt klasörlere de uygular ama dosya ile klasörü ayırmaz. Tüm ağaca <code>chmod -R 755</code> vermek dosyaları da çalıştırılabilir yapar. Klasörleri ve dosyaları ayrı ayarlamak için türüne göre filtreleyen bir arama komutuyla iki ayrı işlem yapmak daha doğrudur."
      ]
    },
    {
      h: "WordPress dosya ve klasörleri için önerilen izinler nelerdir?",
      p: [
        "WordPress'in kendi güvenlik belgelerinde önerilen genel düzen, klasörler için 755, dosyalar için 644'tür. Veritabanı parolasını içeren yapılandırma dosyası için daha dar bir izin (ör. 640 ya da 600; bazı barındırmalarda 440 veya 400) önerilir; hangi değerin çalışacağı sunucunun hangi kullanıcıyla çalıştığına bağlıdır. Yükleme klasörü web sunucusu tarafından yazılabilmelidir ama bu, 777 gerektirmez; doğru sahiplikle 755 yeterlidir.",
        "Barındırma panellerinin çoğu dosya yöneticisinde izni üç rakamla gösterir. Bir eklenti ya da tema güncellemesi \"yazılamıyor\" hatası verirse önce sahipliği kontrol edin; sorun devam ediyorsa barındırma desteğinden sahiplik düzeltmesi isteyin."
      ]
    },
    {
      h: "umask izinleri nasıl etkiler?",
      p: [
        "umask, yeni oluşturulan dosya ve klasörlerden hangi izinlerin <em>kaldırılacağını</em> söyleyen bir maskedir. Sistem dosyaları 666, klasörleri 777 tabanıyla oluşturur ve umask'taki bitleri çıkarır. En yaygın umask değeri 022'dir."
      ],
      formula: "Yeni dosya = 666 − umask → 666 − 022 = 644\nYeni klasör = 777 − umask → 777 − 022 = 755\numask 027 ile: dosya 640, klasör 750",
      after: [
        "Burada \"çıkarma\" aslında bit düzeyinde maskeleme işlemidir; 022 gibi değerlerde sonuç basit çıkarmayla aynı çıkar. Daha kapalı bir varsayılan isteyen sunucularda 027 kullanılır; böylece yeni dosyaları diğer kullanıcılar hiç göremez. Farklı tabanlar arasında çeviri yapmak için [[arac:sayi-tabani-donustur|Sayı Tabanı Dönüştürücü]] işinizi görür."
      ]
    }
  ],
  faq: [
    ["chmod komutu ne işe yarar?", "chmod, Linux ve Unix benzeri sistemlerde bir dosya ya da klasörün okuma, yazma ve çalıştırma izinlerini sahip, grup ve diğer kullanıcılar için ayrı ayrı değiştiren komuttur. Barındırma panellerindeki izin ayarı da aynı işi yapar."],
    ["rwx harfleri ne anlama gelir?", "r okuma, w yazma, x çalıştırma iznidir ve sayısal değerleri sırasıyla 4, 2 ve 1'dir. Klasörde r listelemeyi, w dosya eklemeyi ve silmeyi, x ise klasöre girmeyi sağlar."],
    ["755, 644 ve 777 izinleri nasıl okunur?", "Rakamlar soldan sağa sahip, grup ve diğerleri içindir. 755 rwxr-xr-x, 644 rw-r--r--, 777 ise rwxrwxrwx demektir; 777 herkese yazma izni verdiği için önerilmez."],
    ["Sekizlik sayı izinleri nasıl temsil eder?", "Her kullanıcı sınıfının üç izni üç bitlik bir ikilik sayı oluşturur ve bu sayı 0 ile 7 arasında tek bir sekizlik rakamla yazılır. Örneğin r-x ikilik olarak 101, sekizlik olarak 5'tir."],
    ["Sahip, grup ve diğerleri ayrımı nedir?", "Sahip dosyanın sahibi olan kullanıcı, grup dosyanın bağlı olduğu kullanıcı grubu, diğerleri ise bu iki sınıfa girmeyen herkestir. İzinler bu üç sınıf için ayrı ayrı belirlenir."],
    ["WordPress dosya ve klasörleri için önerilen izinler nelerdir?", "Genel öneri klasörler için 755, dosyalar için 644'tür. Veritabanı parolasını içeren yapılandırma dosyası için 640, 600 ya da barındırmaya göre 440 gibi daha dar bir izin önerilir; 777 hiçbir dosya için gerekmez."],
    ["chmod 777 neden güvenlik riski taşır?", "777 sistemdeki her kullanıcıya ve sürece dosyayı değiştirme yetkisi verir. Bir eklentideki açık ya da paylaşımlı sunucudaki başka bir hesap, bu dosya ve klasörlere zararlı kod yazabilir."],
    ["Sembolik gösterim (u+x) ile sayısal gösterim farkı nedir?", "Sayısal gösterim izinlerin tamamını yeniden yazar, sembolik gösterim ise mevcut izinlere ekleme ya da çıkarma yapar. Tek bir izni değiştirmek için u+x veya g-w gibi sembolik ifadeler daha güvenlidir."],
    ["umask izinleri nasıl etkiler?", "umask, yeni dosya ve klasörlerden kaldırılacak izinleri belirleyen maskedir. Yaygın değer olan 022 ile yeni dosyalar 644, yeni klasörler 755 izinle oluşturulur; 027 ile bu değerler 640 ve 750 olur."]
  ],
  tools: ["sekizlik-ondalik-cevir", "ikili-ondalik-cevir", "sayi-tabani-donustur"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "hash-nedir-sha256-md5"]
};
