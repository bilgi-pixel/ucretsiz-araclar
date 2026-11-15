export default {
  slug: "hash-nedir-sha256-md5",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Hash Nedir? SHA-256 ve MD5 ile Dosya Doğrulama Nasıl Yapılır",
  pageTitle: "Hash Nedir? SHA-256, MD5 ve Dosya Doğrulama Rehberi",
  description: "Hash, her uzunluktaki veriden sabit uzunlukta, geri çevrilemeyen bir özet üretir. SHA-256 64, MD5 32 karakterdir. Dosya doğrulama, şifreleme farkı ve CRC32.",
  keywords: ["hash nedir", "sha256 nedir", "md5 nedir", "dosya hash kontrolü", "checksum nedir", "hash ve şifreleme farkı", "sha256 doğrulama", "crc32 nedir"],
  lead: "Hash, bir metin ya da dosyadan <strong>sabit uzunlukta, tek yönlü bir özet (parmak izi)</strong> üreten matematiksel işlemdir: aynı veri her zaman aynı hash'i verir, verinin tek bir harfi bile değişirse hash tamamen değişir ve hash'ten asıl veriye geri dönülemez. SHA-256 her girdi için 64 karakterlik onaltılık bir özet üretir; MD5 32 karakterlik özet üretir ama artık güvenli sayılmaz. Bu sayfada hash'in nasıl çalıştığını, indirdiğiniz bir dosyayı SHA-256 ile nasıl doğrulayacağınızı ve hash ile şifreleme arasındaki farkı bulacaksınız.",
  kisaCevap: [
    "Hash fonksiyonu her boyuttaki veriyi sabit uzunlukta bir özete dönüştürür; SHA-256 çıktısı 256 bit, yani 64 onaltılık karakterdir.",
    "Aynı girdi her zaman aynı hash'i verir; tek bir bit değişse bile özet tamamen farklı olur (çığ etkisi).",
    "Hash tek yönlüdür: özetten orijinal veri hesaplanamaz; şifreleme ise anahtarla geri çözülebilir.",
    "MD5 (128 bit) ve SHA-1 (160 bit) için çakışma saldırıları bulunmuştur; güvenlik gerektiren işlerde SHA-256 ve üstü kullanılır.",
    "Dosya doğrulama: indirdiğiniz dosyanın SHA-256 değerini hesaplayıp yayıncının sitesindeki değerle karakter karakter karşılaştırırsınız.",
    "CRC32 bir hata denetim toplamıdır; kazara bozulmayı yakalar ama kasıtlı değişikliğe karşı koruma sağlamaz."
  ],
  figure: {
    alt: "Hash çığ etkisi: 'Merhaba' ve 'merhaba' kelimelerinin SHA-256 özetleri tamamen farklı. Altta algoritmalara göre özet uzunluğu: CRC32 8, MD5 32, SHA-1 40, SHA-256 64, SHA-512 128 onaltılık karakter.",
    caption: "Yalnızca ilk harfin büyük-küçük olması bile özetin tamamını değiştirir. Alt bölüm, özet uzunluğunun algoritmaya göre nasıl büyüdüğünü gösterir; güvenlik açısından uzunluk tek başına yeterli değildir, algoritmanın kırılmamış olması gerekir.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Tek harf değişince hash ne olur?</text>
  <rect x="20" y="52" width="130" height="44" rx="8" class="ps"/><text x="85" y="80" class="b mid">Merhaba</text>
  <line x1="150" y1="74" x2="196" y2="74" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <text x="173" y="64" class="sm mid mu">SHA-256</text>
  <rect x="200" y="50" width="500" height="50" rx="8" class="sf sb"/>
  <text x="212" y="70" class="sm">7fdc9f4717c5fe66df286c700fab969b</text>
  <text x="212" y="90" class="sm">4d6209d03aa84624c5f8f58c17c9c058</text>
  <rect x="20" y="114" width="130" height="44" rx="8" class="ps"/><text x="85" y="142" class="b mid">merhaba</text>
  <line x1="150" y1="136" x2="196" y2="136" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="200" y="112" width="500" height="50" rx="8" class="sf sb"/>
  <text x="212" y="132" class="sm">4c6bcdd55f3153e1939669ab1ec039e4</text>
  <text x="212" y="152" class="sm">059174dc25abdfcb2f58868849b4d61b</text>
  <text x="360" y="186" class="sm mid dg b">Benzerlik yok: özetten girdiyi tahmin etmek mümkün değildir</text>
  <line x1="20" y1="204" x2="700" y2="204" class="sb dash" fill="none"/>
  <text x="20" y="232" class="b">Özet uzunluğu (onaltılık karakter)</text>
  <g class="sm">
    <text x="20" y="266">CRC32</text><rect x="110" y="252" width="20" height="20" rx="3" class="sf sb"/><text x="140" y="266">8 · hata denetimi</text>
    <text x="20" y="300">MD5</text><rect x="110" y="286" width="80" height="20" rx="3" class="dgs"/><text x="200" y="300">32 · güvenli değil</text>
    <text x="20" y="334">SHA-1</text><rect x="110" y="320" width="100" height="20" rx="3" class="dgs"/><text x="220" y="334">40 · güvenli değil</text>
    <text x="20" y="368">SHA-256</text><rect x="110" y="354" width="160" height="20" rx="3" class="p"/><text x="280" y="368">64 · önerilen</text>
    <text x="20" y="402">SHA-512</text><rect x="110" y="388" width="320" height="20" rx="3" class="oks"/><text x="440" y="402">128 · güçlü</text>
  </g>
  <text x="700" y="430" class="sm end mu">1 onaltılık karakter = 4 bit</text>
</svg>`
  },
  sections: [
    {
      h: "Hash nedir, nasıl çalışır?",
      p: [
        "Hash fonksiyonu, girdi olarak verilen her türlü veriyi (bir kelime, bir belge ya da birkaç gigabaytlık bir dosya) alıp her zaman aynı uzunlukta bir çıktı üreten matematiksel bir işlemdir. Bu çıktıya <strong>hash</strong>, <strong>özet</strong> ya da <strong>digest</strong> denir. Bir insanın parmak izi gibi, verinin kısa ve benzersize çok yakın bir temsilidir.",
        "Kriptografik hash fonksiyonlarının üç temel özelliği vardır. <strong>Belirleyicilik:</strong> aynı girdi her zaman aynı özeti verir. <strong>Tek yönlülük:</strong> özetten girdiyi hesaplamak pratikte imkânsızdır. <strong>Çakışma direnci:</strong> aynı özeti veren iki farklı girdi bulmak pratikte imkânsız olmalıdır. Bunlara ek olarak girdideki en küçük değişiklik özetin yaklaşık yarısının bitlerini değiştirir; buna <strong>çığ etkisi</strong> denir.",
        "Örneğin \"abc\" metninin SHA-256 özeti <code>ba7816bf…20015ad</code> ile başlayıp biten 64 karakterlik bir dizidir. Boş bir metnin bile özeti vardır: <code>e3b0c442…7852b855</code>. Bu değerler dünyanın her yerinde, her bilgisayarda aynıdır."
      ]
    },
    {
      h: "SHA-256 nedir? MD5 neden artık güvenli sayılmıyor?",
      p: [
        "SHA-256, ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) tarafından yayımlanan SHA-2 ailesinin 256 bitlik üyesidir. Yazılım dağıtımında dosya doğrulama, dijital imzalar, TLS sertifikaları, sürüm kontrol sistemleri ve blokzincir gibi pek çok alanda kullanılır. 256 bitlik bir özette olası değer sayısı 2<sup>256</sup>'dır; bu, evrendeki tahmini atom sayısıyla karşılaştırılabilecek büyüklükte bir sayıdır.",
        "MD5 1990'ların başında yaygınlaşan, 128 bitlik özet üreten bir algoritmadır. 2004'te araştırmacılar MD5 için pratik çakışma, yani aynı özeti veren iki farklı veri üretme yöntemi gösterdi; sonraki yıllarda bu saldırılar sahte sertifika üretilebilecek düzeye ulaştı. SHA-1 için de 2017'de ilk pratik çakışma yayımlandı. Bu nedenle MD5 ve SHA-1 artık güvenlik amaçlı kullanılmamalıdır."
      ],
      table: {
        head: ["Algoritma", "Özet boyu", "Onaltılık karakter", "Güvenlik durumu", "Uygun kullanım"],
        rows: [
          ["CRC32", "32 bit", "8", "Kriptografik değil", "Kazara bozulma denetimi (ZIP, PNG, Ethernet)"],
          ["MD5", "128 bit", "32", "Çakışma bulunmuş", "Yalnızca kazara bozulma kontrolü, eski sistemler"],
          ["SHA-1", "160 bit", "40", "Çakışma bulunmuş", "Eski sistemlerle uyumluluk"],
          ["SHA-256", "256 bit", "64", "Güvenli kabul edilir", "Dosya doğrulama, imza, sertifika"],
          ["SHA-512", "512 bit", "128", "Güvenli kabul edilir", "Yüksek güvenlik payı istenen işler"]
        ],
        caption: "MD5'in kazara bozulmayı yakalama yeteneği hâlâ iş görür; sorun, birinin kasıtlı olarak aynı MD5'i veren zararlı bir dosya hazırlayabilmesidir."
      }
    },
    {
      h: "Checksum nedir? CRC32 ne işe yarar?",
      p: [
        "Checksum (sağlama toplamı), verinin aktarım ya da saklama sırasında bozulup bozulmadığını anlamak için hesaplanan kısa bir değerdir. Her hash bir anlamda checksum olarak kullanılabilir, ama her checksum kriptografik hash değildir. CRC32 (döngüsel artıklık denetimi) bunun en yaygın örneğidir: ZIP arşivleri, PNG görselleri ve Ethernet çerçeveleri verinin bozulmadığını CRC32 ile denetler.",
        "CRC32 çok hızlıdır ve rastgele bit hatalarını yakalamakta başarılıdır, ancak tasarım gereği tersine çevrilebilir bir yapıya sahiptir: aynı CRC32'yi veren farklı veri üretmek kolaydır. Bu yüzden CRC32 bir dosyanın birileri tarafından değiştirilmediğini kanıtlamak için kullanılamaz. Bir metnin ya da bayt dizisinin CRC32 değerini [[arac:crc32-hesapla|CRC32 Hesaplama aracıyla]] onaltılık, ondalık ve ikili olarak görebilirsiniz; yaygın test değeri olarak \"123456789\" metninin CRC32 değeri <code>CBF43926</code>'dır."
      ]
    },
    {
      h: "İndirilen dosyanın hash'i nasıl kontrol edilir?",
      p: [
        "Yazılım yayıncıları, işletim sistemi kalıpları ve sürücü dağıtıcıları indirme sayfalarında dosyanın SHA-256 değerini yayımlar. Bu değeri kendi bilgisayarınızda hesapladığınız değerle karşılaştırarak dosyanın eksiksiz indiğini ve yolda değiştirilmediğini doğrularsınız. Doğrulama, özellikle aynalardan (mirror) ya da yavaş bağlantıdan inen büyük dosyalarda önemlidir."
      ],
      ol: [
        "Yayıncının resmî sitesinden dosyayla birlikte SHA-256 değerini kopyalayın. Değeri dosyanın indirildiği üçüncü taraf siteden değil, mümkünse yayıncının kendi sitesinden alın.",
        "[[arac:dosya-hash|Dosya Hash Hesaplama aracını]] açın ve indirdiğiniz dosyayı sürükleyip bırakın; dosya bilgisayarınızdan çıkmaz, hesap tarayıcıda yapılır.",
        "Araç SHA-256, SHA-1, SHA-512 ve MD5 değerlerini hesaplar; beklenen değeri karşılaştırma kutusuna yapıştırın.",
        "Değerler birebir aynıysa dosya sağlamdır. Tek bir karakter bile farklıysa dosyayı kullanmayın, yeniden indirin; fark devam ediyorsa yayıncıya bildirin."
      ],
      after: [
        "Aynı işi komut satırından da yapabilirsiniz: Windows'ta <code>certutil -hashfile dosya.iso SHA256</code> ya da PowerShell'de <code>Get-FileHash dosya.iso</code>, macOS'te <code>shasum -a 256 dosya.iso</code>, Linux'ta <code>sha256sum dosya.iso</code> komutu çalışır. Karşılaştırmada büyük-küçük harf farkı önemli değildir; onaltılık değerler iki biçimde de yazılabilir.",
        "Unutmayın: hash doğrulaması dosyanın yayıncının yayımladığı dosyayla aynı olduğunu gösterir, yayıncının güvenilir olduğunu göstermez. Hash değerini de dosyayı da aynı ele geçirilmiş siteden alıyorsanız saldırgan ikisini birden değiştirmiş olabilir. Bu yüzden büyük yazılımlar ayrıca dijital imza kullanır."
      ]
    },
    {
      h: "Hash ile şifreleme arasındaki fark nedir?",
      p: [
        "İki kavram sık karıştırılır ama amaçları farklıdır. Şifreleme (encryption) veriyi gizlemek için yapılır ve doğru anahtara sahip olan kişi veriyi geri çözebilir. Hash ise veriyi gizlemek değil, ona bir parmak izi çıkarmak için kullanılır ve geri çözülmez. Base64 gibi kodlamalar ise ikisinden de farklıdır: herkesin geri çevirebileceği bir biçim dönüşümüdür, güvenlik sağlamaz."
      ],
      table: {
        head: ["Özellik", "Hash", "Şifreleme", "Kodlama (Base64)"],
        rows: [
          ["Geri çevrilebilir mi?", "Hayır", "Evet, anahtarla", "Evet, herkes"],
          ["Çıktı uzunluğu", "Sabit", "Girdiyle orantılı", "Girdiyle orantılı"],
          ["Anahtar gerekir mi?", "Hayır (HMAC'te gizli anahtar kullanılır)", "Evet", "Hayır"],
          ["Amaç", "Bütünlük, parmak izi", "Gizlilik", "Biçim uyumu"],
          ["Örnek", "SHA-256", "AES-256", "Base64"]
        ]
      },
      after: [
        "Örneğin bir PDF'e parola koymak şifrelemedir; parolayı bilen belgeyi açar. Aynı PDF'in SHA-256 değerini yayımlamak ise belgeyi gizlemez, yalnızca alıcının elindeki kopyanın aynı olduğunu doğrulamasını sağlar. PDF şifreleme hakkında bilgi için [[rehber:pdf-sifreleme-ve-gizlilik|PDF şifreleme ve gizlilik rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Şifreler neden hash'lenerek saklanır?",
      p: [
        "İyi tasarlanmış bir web sitesi kullanıcı şifrelerini düz metin olarak değil, hash'leri olarak saklar. Siz giriş yaptığınızda yazdığınız şifrenin hash'i hesaplanır ve kayıtlı hash ile karşılaştırılır. Böylece veritabanı sızdırılsa bile şifrelerin kendisi doğrudan görünmez.",
        "Ancak şifre saklamada SHA-256 gibi hızlı hash fonksiyonları tek başına yeterli değildir. Hızlı olmaları, saldırganın sızdırılan hash'ler üzerinde saniyede milyarlarca tahmin denemesine olanak verir. Bu nedenle şifreler için her kullanıcıya özel rastgele bir değer (<strong>tuz</strong>, salt) eklenir ve bilinçli olarak yavaş çalışan, şifre saklama için tasarlanmış algoritmalar (Argon2, bcrypt, scrypt, PBKDF2) kullanılır. Tuz, aynı şifreyi kullanan iki kişinin hash'inin farklı olmasını sağlar ve önceden hesaplanmış tablolarla saldırıyı engeller.",
        "Kullanıcı tarafında yapılabilecek en iyi şey, her site için farklı ve uzun şifre kullanmaktır. Güçlü şifre oluşturmanın ayrıntıları [[rehber:sifre-guvenligi-ve-guclu-sifre|şifre güvenliği rehberinde]] anlatılır."
      ]
    },
    {
      h: "Metnin SHA-256 özetini hesaplamak ve sık yapılan hatalar",
      p: [
        "Bir metnin SHA-256 özetini [[arac:metin-sha256-hesapla|Metin SHA-256 Hesaplama aracında]] onaltılık ve Base64 biçiminde görebilirsiniz. Metin hash'lerken karşılaşılan farkların çoğu, girdinin görünmeyen biçimde farklı olmasından kaynaklanır:"
      ],
      ul: [
        "<strong>Görünmeyen boşluk ve satır sonu:</strong> Metnin sonundaki tek bir boşluk ya da satır sonu, özeti tamamen değiştirir. Komut satırında <code>echo</code> komutu metnin sonuna satır sonu ekleyebilir.",
        "<strong>Karakter kodlaması:</strong> Hash baytlar üzerinde hesaplanır. \"ş\" harfi UTF-8'de iki bayttır, eski Türkçe kod sayfasında tek bayttır; aynı görünen metin farklı hash verir.",
        "<strong>Windows ve Linux satır sonları:</strong> CRLF ile LF farkı, metin dosyalarının hash'ini değiştirir.",
        "<strong>Büyük-küçük harf:</strong> \"Merhaba\" ile \"merhaba\" tamamen farklı özetler üretir.",
        "<strong>Yanlış algoritmayla karşılaştırma:</strong> 32 karakterlik bir değeri SHA-256 sanmak sık yapılan bir hatadır; uzunluk algoritmayı ele verir."
      ]
    },
    {
      h: "Hash nerelerde kullanılır?",
      ul: [
        "<strong>Yazılım ve dosya doğrulama:</strong> İndirilen dosyanın eksiksiz ve değiştirilmemiş olduğunu kanıtlamak.",
        "<strong>Dijital imza ve e-imza:</strong> Belgenin tamamı yerine hash'i imzalanır; belgedeki tek bir değişiklik imzayı geçersiz kılar.",
        "<strong>Yedekleme ve senkronizasyon:</strong> Dosyanın değişip değişmediğini içeriğine bakmadan hızla anlamak.",
        "<strong>Yinelenen dosya tespiti:</strong> Aynı hash'e sahip dosyalar aynı içeriğe sahiptir.",
        "<strong>Sürüm kontrol sistemleri:</strong> Her kayıt (commit) ve dosya içeriği hash'iyle adreslenir.",
        "<strong>Adli bilişim:</strong> Delil olarak alınan disk kopyalarının sonradan değiştirilmediğini göstermek için hash değerleri kayda geçirilir."
      ]
    }
  ],
  faq: [
    ["Hash nedir?", "Hash, her uzunluktaki veriden sabit uzunlukta, tek yönlü bir özet üreten matematiksel işlemdir. Aynı veri her zaman aynı özeti verir, en küçük değişiklik özeti tamamen değiştirir ve özetten orijinal veriye geri dönülemez."],
    ["SHA-256 nedir?", "SHA-256, NIST tarafından standartlaştırılan SHA-2 ailesinin 256 bitlik hash algoritmasıdır ve 64 onaltılık karakterlik özet üretir. Dosya doğrulama, dijital imza ve sertifikalarda güvenli kabul edilen yaygın bir standarttır."],
    ["MD5 neden artık güvenli sayılmıyor?", "MD5 için aynı özeti veren iki farklı veri üretmeyi sağlayan pratik çakışma saldırıları 2004'ten beri bilinmektedir. Bu nedenle kötü niyetli biri değiştirilmiş bir dosyayı aynı MD5 değeriyle sunabilir; güvenlik işlerinde SHA-256 tercih edilmelidir."],
    ["İndirilen dosyanın hash'i nasıl kontrol edilir?", "Dosyayı Dosya Hash Hesaplama aracına bırakın ya da komut satırında sha256sum, shasum veya certutil komutunu çalıştırın. Çıkan değeri yayıncının resmî sitesindeki SHA-256 değeriyle karakter karakter karşılaştırın; tek fark bile dosyanın farklı olduğunu gösterir."],
    ["Checksum nedir?", "Checksum, verinin aktarım ya da saklama sırasında bozulup bozulmadığını anlamak için hesaplanan kısa bir denetim değeridir. CRC32 gibi basit checksum'lar kazara hataları yakalar; kasıtlı değişikliklere karşı ise kriptografik hash gerekir."],
    ["Hash ile şifreleme arasındaki fark nedir?", "Şifreleme veriyi gizler ve doğru anahtarla geri çözülebilir. Hash ise veriyi gizlemez, sabit uzunlukta bir parmak izi üretir ve geri çevrilemez. Şifreleme gizlilik, hash bütünlük ve doğrulama için kullanılır."],
    ["Şifreler neden hash'lenerek saklanır?", "Veritabanı sızdırıldığında şifrelerin doğrudan okunmasını önlemek için. Doğru uygulamada her şifreye rastgele tuz eklenir ve Argon2, bcrypt gibi bilinçli olarak yavaş algoritmalar kullanılır; düz SHA-256 tek başına yeterli değildir."],
    ["CRC32 ne işe yarar?", "CRC32, ZIP, PNG ve Ethernet gibi biçimlerde verinin kazara bozulup bozulmadığını hızla denetleyen 32 bitlik bir sağlama toplamıdır. Kasıtlı değişiklikleri tespit etmek için tasarlanmadığından güvenlik amacıyla kullanılmamalıdır."],
    ["İki farklı dosyanın hash'i aynı olabilir mi?", "Teorik olarak olabilir, çünkü sonsuz olası girdi sabit sayıda özete eşlenir. SHA-256 için böyle bir çakışma bulmak bugünkü teknolojiyle pratikte imkânsızdır; MD5 ve SHA-1 için ise çakışma üretmek mümkün hâle gelmiştir."]
  ],
  tools: ["dosya-hash", "metin-sha256-hesapla", "crc32-hesapla"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "gb-kac-mb-veri-birimleri", "http-durum-kodlari-404-500-nedir"],
  sources: [
    ["NIST – FIPS 180-4 Secure Hash Standard", "https://csrc.nist.gov/"],
    ["Ulusal Siber Olaylara Müdahale Merkezi (USOM)", "https://www.usom.gov.tr/"]
  ]
};
