export default {
  slug: "port-numaralari-80-443-22",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Port Numarası Nedir? 80, 443, 22 ve 3389 Portları Ne İşe Yarar",
  pageTitle: "Port Numarası Nedir? 80, 443, 22, 3389 Portları ve Görevleri",
  description: "Port, bir cihazdaki hizmeti ayıran 0–65535 arası numaradır. 80 HTTP, 443 HTTPS, 22 SSH, 3389 uzak masaüstü. TCP-UDP farkı, port yönlendirme ve güvenlik.",
  keywords: ["port numarası nedir", "443 portu nedir", "80 portu", "22 portu ssh", "3389 portu", "port listesi", "port yönlendirme", "tcp udp farkı"],
  lead: "Port numarası, aynı IP adresine sahip bir cihazda çalışan farklı hizmetleri birbirinden ayıran <strong>0 ile 65.535 arasındaki</strong> sayıdır. IP adresi binanın adresiyse port daire numarasıdır. Web sitelerinde 80 şifresiz HTTP, 443 şifreli HTTPS için; 22 güvenli uzaktan yönetim (SSH), 3389 Windows uzak masaüstü için varsayılan porttur. Bu sayfada port aralıklarını, TCP ile UDP farkını, URL'de portun nereye yazıldığını ve ev ya da iş yerinde portları güvenli yönetmenin ilkelerini anlatıyoruz.",
  kisaCevap: [
    "Port numarası 16 bitlik bir sayıdır; 0–65.535 arasında değer alır ve IP adresiyle birlikte bir hizmeti tanımlar.",
    "0–1.023 iyi bilinen portlar, 1.024–49.151 kayıtlı portlar, 49.152–65.535 dinamik (geçici) portlardır.",
    "80 HTTP, 443 HTTPS, 22 SSH, 21 FTP, 25 SMTP, 53 DNS, 3389 RDP için varsayılandır.",
    "TCP bağlantı kurar ve teslimatı garanti eder; UDP bağlantısızdır, hızlıdır ama paket kaybını kendisi düzeltmez.",
    "URL'de port, ana makine adından sonra iki nokta ile yazılır: alanadi.com:8080; 80 ve 443 için yazılmaz.",
    "Güvenlik ilkesi: yalnızca gerçekten gereken portu açın; 22 ve 3389 gibi yönetim portlarını internete doğrudan açmak yerine VPN kullanın."
  ],
  figure: {
    alt: "Port kavramı şeması: bir IP adresindeki sunucuda 80, 443, 22 ve 3389 numaralı kapılar; altta port aralıkları çubuğu 0–1023 iyi bilinen, 1024–49151 kayıtlı, 49152–65535 dinamik.",
    caption: "IP adresi cihazı, port numarası o cihazdaki hizmeti bulur. Güvenlik duvarı yalnızca izin verilen kapıların açık kalmasını sağlar.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">IP adresi = bina, port = kapı numarası</text>
  <rect x="40" y="56" width="150" height="160" rx="10" class="ps"/>
  <text x="115" y="86" class="b mid">İstemci</text>
  <text x="115" y="110" class="sm mid">tarayıcı</text>
  <text x="115" y="134" class="sm mid t2">kaynak port</text>
  <text x="115" y="154" class="sm mid b">51734</text>
  <text x="115" y="178" class="sm mid t2">(geçici, rastgele)</text>
  <line x1="190" y1="136" x2="330" y2="136" class="sp sw" fill="none"/>
  <polygon points="330,128 344,136 330,144" class="p"/>
  <text x="262" y="124" class="sm mid">hedef 203.0.113.10:443</text>
  <rect x="350" y="56" width="330" height="160" rx="10" class="sf sb"/>
  <text x="515" y="80" class="b mid">Sunucu 203.0.113.10</text>
  <rect x="366" y="94" width="146" height="50" rx="6" class="oks"/><text x="439" y="116" class="b mid">443 HTTPS</text><text x="439" y="134" class="sm mid">açık</text>
  <rect x="520" y="94" width="146" height="50" rx="6" class="ps"/><text x="593" y="116" class="b mid">80 HTTP</text><text x="593" y="134" class="sm mid">443'e yönlendirir</text>
  <rect x="366" y="152" width="146" height="50" rx="6" class="dgs"/><text x="439" y="174" class="b mid">22 SSH</text><text x="439" y="192" class="sm mid">yalnızca VPN'den</text>
  <rect x="520" y="152" width="146" height="50" rx="6" class="dgs"/><text x="593" y="174" class="b mid">3389 RDP</text><text x="593" y="192" class="sm mid">kapalı</text>
  <text x="40" y="254" class="b">Port aralıkları (IANA)</text>
  <rect x="40" y="266" width="120" height="44" class="p"/>
  <rect x="160" y="266" width="360" height="44" class="ps"/>
  <rect x="520" y="266" width="160" height="44" class="oks"/>
  <text x="100" y="293" class="sm mid sf b">0–1.023</text>
  <text x="340" y="293" class="sm mid b">1.024–49.151 kayıtlı</text>
  <text x="600" y="293" class="sm mid b">49.152–65.535</text>
  <text x="100" y="330" class="sm mid">iyi bilinen</text>
  <text x="340" y="330" class="sm mid">uygulamalara atanmış</text>
  <text x="600" y="330" class="sm mid">dinamik / geçici</text>
  <rect x="40" y="348" width="640" height="38" rx="8" class="sf sb"/>
  <text x="360" y="372" class="sm mid">Toplam 65.536 port: 2^16 · TCP ve UDP için ayrı ayrı</text>
</svg>`
  },
  sections: [
    {
      h: "Port numarası nedir?",
      p: [
        "İnternete bağlı bir bilgisayar ya da sunucu aynı anda birçok hizmet çalıştırabilir: web sitesi, e-posta, dosya paylaşımı, uzaktan yönetim. Hepsi aynı IP adresini paylaşır. Gelen bir paketin hangi programa teslim edileceğini belirleyen şey <strong>port numarasıdır</strong>. IP adresi ve port birlikte \"soket\" adı verilen tekil bir adres oluşturur: 203.0.113.10:443 gibi.",
        "Port numarası taşıma katmanında, TCP ve UDP başlıklarında 16 bitlik bir alan olarak taşınır. 2<sup>16</sup> = 65.536 farklı değer mümkündür, yani 0'dan 65.535'e kadar. Her bağlantıda iki port vardır: hedef port hizmeti belirler, kaynak port ise istemcinin işletim sisteminin geçici olarak seçtiği numaradır ve cevabın doğru sekmeye ya da programa dönmesini sağlar.",
        "IP adreslerinin yapısını ve alt ağ mantığını tazelemek isterseniz [[bilgi:ip-adresi-ve-alt-ag-maskesi-nedir|IP adresi ve alt ağ maskesi yazısına]] bakabilirsiniz. Port numaraları IPv4 ve IPv6'da aynı şekilde çalışır."
      ]
    },
    {
      h: "Port aralıkları: iyi bilinen, kayıtlı ve dinamik",
      p: [
        "Port numaralarının hangi hizmete ait olacağını Internet Assigned Numbers Authority (IANA) düzenler. Kayıt üç gruba ayrılır. Bu bir zorunluluk değil sözleşmedir; bir hizmet teknik olarak herhangi bir portta çalışabilir, ancak varsayılan numaralar herkesin aynı dili konuşmasını sağlar."
      ],
      table: {
        head: ["Aralık", "Adı", "Açıklama"],
        rows: [
          ["0–1.023", "İyi bilinen (sistem) portlar", "HTTP, HTTPS, SSH, DNS gibi temel hizmetler; birçok sistemde yönetici yetkisiyle açılır"],
          ["1.024–49.151", "Kayıtlı portlar", "Veritabanları, oyun sunucuları ve uygulamalar için IANA'ya kayıtlı numaralar"],
          ["49.152–65.535", "Dinamik / özel portlar", "İstemcilerin giden bağlantılar için geçici olarak kullandığı numaralar"]
        ]
      },
      after: [
        "Port 0 ayrılmıştır ve gerçek bir hizmet için kullanılmaz. Bir programın dinlediği port numarasını öğrenmek ya da bir hizmetin varsayılan portunu bulmak için [[arac:port-numarasi-bul|Port Numarası Bul]] aracına numarayı ya da hizmet adını yazmanız yeterlidir."
      ]
    },
    {
      h: "En bilinen port numaraları",
      table: {
        head: ["Port", "Protokol", "Hizmet", "Not"],
        rows: [
          ["20, 21", "TCP", "FTP (dosya aktarımı)", "Şifresizdir; yerine SFTP ya da FTPS tercih edilir"],
          ["22", "TCP", "SSH, SFTP", "Şifreli uzaktan yönetim ve dosya aktarımı"],
          ["23", "TCP", "Telnet", "Şifresiz eski protokol; kullanılmamalı"],
          ["25", "TCP", "SMTP", "Sunucular arası e-posta iletimi"],
          ["53", "TCP/UDP", "DNS", "Alan adını IP adresine çevirir"],
          ["80", "TCP", "HTTP", "Şifresiz web"],
          ["110 / 995", "TCP", "POP3 / POP3S", "E-posta indirme; 995 şifreli"],
          ["143 / 993", "TCP", "IMAP / IMAPS", "E-posta eşitleme; 993 şifreli"],
          ["443", "TCP (ve UDP)", "HTTPS", "Şifreli web; HTTP/3 UDP 443 kullanır"],
          ["587", "TCP", "SMTP gönderim", "E-posta istemcisinden şifreli gönderim"],
          ["3306", "TCP", "MySQL", "Veritabanı; internete açılmamalı"],
          ["3389", "TCP/UDP", "RDP", "Windows uzak masaüstü"],
          ["8080", "TCP", "Alternatif HTTP", "Geliştirme ve vekil sunucularda sık kullanılır"]
        ],
        caption: "Tablo varsayılan atamaları gösterir. Yöneticiler hizmetleri farklı portlarda da çalıştırabilir."
      }
    },
    {
      h: "80 ve 443 portları arasındaki fark",
      p: [
        "<strong>80 numaralı port</strong> şifresiz HTTP içindir. Tarayıcı ile sunucu arasındaki her şey, yani formlara yazdıklarınız, çerezler ve sayfa içeriği ağ üzerinde açık metin olarak taşınır. Aynı Wi-Fi ağındaki ya da yol üzerindeki biri bu trafiği görebilir veya değiştirebilir.",
        "<strong>443 numaralı port</strong> HTTPS içindir: aynı HTTP protokolü TLS şifrelemesi içinde taşınır. Tarayıcı sunucunun sertifikasını doğrular, ardından tüm trafik şifrelenir. Adres çubuğundaki kilit simgesi bu bağlantının göstergesidir. Günümüzde neredeyse tüm siteler 443 kullanır; 80'e gelen istekler genellikle otomatik olarak 443'e yönlendirilir.",
        "Sunucunun bir isteğe verdiği cevabın anlamını, örneğin 301 yönlendirme ya da 403 yasak kodlarını, [[bilgi:http-durum-kodlari-404-500-nedir|HTTP durum kodları yazısında]] bulabilirsiniz. Tek tek kod aramak için [[arac:http-durum-kodlari|HTTP Durum Kodları]] aracını kullanın."
      ]
    },
    {
      h: "22 ve 3389 portları: uzaktan yönetim ve güvenlik",
      p: [
        "<strong>22 numaralı port</strong> SSH (Secure Shell) için kullanılır. SSH, sunuculara şifreli komut satırı bağlantısı ve güvenli dosya aktarımı (SFTP) sağlar. Linux sunucuların ve ağ cihazlarının yönetiminde standarttır. <strong>3389 numaralı port</strong> ise Windows'un Uzak Masaüstü Protokolü'dür (RDP); başka bir bilgisayarın ekranını ve klavyesini uzaktan kullanmanızı sağlar.",
        "Bu iki port güçlü yönetim yetkisi verdiği için internette en sık hedef alınan portlar arasındadır. İnternete doğrudan açık bir RDP ya da SSH hizmeti, sürekli otomatik oturum açma denemeleriyle karşılaşır; zayıf parola, güncellenmemiş yazılım ya da yanlış yapılandırma ciddi veri kaybına ve fidye yazılımı olaylarına yol açabilir. Bu yüzden güvenlik ekipleri bu portları \"yönetim portu\" olarak sınıflandırır ve dışarıya kapalı tutar."
      ],
      ul: [
        "Yönetim portlarını internete doğrudan açmak yerine şirket VPN'i ya da güvenli erişim ağ geçidi üzerinden erişin.",
        "SSH'de parola yerine anahtar tabanlı kimlik doğrulama kullanın; yönetici hesabıyla doğrudan girişi kapatın.",
        "RDP için ağ düzeyinde kimlik doğrulamayı (NLA) ve çok faktörlü doğrulamayı etkinleştirin.",
        "Güvenlik duvarında erişimi yalnızca bilinen IP adreslerine sınırlayın; başarısız giriş denemelerini izleyin ve kilitleyin.",
        "İşletim sistemini ve uzaktan erişim yazılımını düzenli güncelleyin.",
        "Portu farklı bir numaraya taşımak otomatik taramaları azaltabilir ama tek başına güvenlik önlemi değildir."
      ]
    },
    {
      h: "TCP ile UDP arasındaki fark",
      p: [
        "Port numaraları iki ana taşıma protokolünde ayrı ayrı vardır: TCP 443 ile UDP 443 farklı kapılardır. Hangi protokolün seçileceği, hizmetin hız mı yoksa kesin teslimat mı istediğine bağlıdır."
      ],
      table: {
        head: ["Özellik", "TCP", "UDP"],
        rows: [
          ["Bağlantı", "Üçlü el sıkışmayla bağlantı kurar", "Bağlantı kurmaz, doğrudan gönderir"],
          ["Teslimat", "Kayıp paketi yeniden gönderir, sırayı korur", "Garanti yok; kayıp uygulamaya kalır"],
          ["Hız ve gecikme", "Daha fazla ek yük", "Daha az ek yük, düşük gecikme"],
          ["Tipik kullanım", "Web, e-posta, dosya aktarımı, SSH", "DNS sorguları, sesli-görüntülü görüşme, oyun, canlı yayın"]
        ]
      },
      after: [
        "Modern web protokolü HTTP/3, QUIC adı verilen ve UDP üzerinde çalışan bir yapı kullanır; şifreleme ve güvenilirliği kendi içinde sağlar. Bu yüzden 443 portu artık hem TCP hem UDP için önemlidir."
      ]
    },
    {
      h: "Bir URL'de port numarası nereye yazılır?",
      p: [
        "Web adresinde port, ana makine adından hemen sonra iki nokta üst üste ile yazılır. Şema varsayılan portu zaten belirttiği için http için 80, https için 443 yazılmaz; tarayıcı bunu kendisi ekler."
      ],
      formula: "şema + ana-makine:port + /yol?sorgu#parça\nhttps şeması, ornek.com → port 443 (varsayılan, yazılmaz)\nhttp şeması, 192.168.1.1:8080/ayarlar → port 8080\nhttps şeması, [2001:db8::1]:8443 → IPv6 adreste köşeli parantez + port",
      after: [
        "Bir adresin hangi parçasının port olduğunu görmek için [[arac:url-ayristir|URL Ayrıştırıcı]] adresi şema, ana makine, port, yol ve sorgu parametrelerine böler. URL'deki özel karakterlerin nasıl kodlandığı ise [[bilgi:url-kodlama-yuzde-20-nedir|URL kodlama yazısında]] anlatılır."
      ]
    },
    {
      h: "Port yönlendirme nedir, ne zaman gerekir?",
      p: [
        "Ev ve küçük ofis modemleri NAT (ağ adresi çevirisi) kullanır: içerideki tüm cihazlar dışarıya tek bir genel IP adresiyle çıkar. İçeriden başlayan bağlantılar sorunsuz çalışır, ama dışarıdan gelen bir isteğin hangi iç cihaza gideceğini modem bilmez. <strong>Port yönlendirme</strong> (port forwarding), \"genel IP'ye 8443 numaralı porttan gelen trafiği 192.168.1.20 adresindeki cihazın 443 portuna ilet\" gibi bir kural tanımlamaktır.",
        "Port yönlendirme bir iç cihazı internete açtığı için dikkatli kullanılmalıdır. Yalnızca gerçekten ihtiyaç duyulan hizmet için, mümkünse kısa süreli ve güçlü kimlik doğrulamayla açılmalı; kullanılmayan kurallar silinmelidir. Güvenlik kamerası, ağ depolama (NAS) ya da yazıcı gibi cihazların yönetim arayüzlerini doğrudan internete açmak yerine üreticinin şifreli bulut erişimini ya da bir VPN'i tercih etmek daha güvenlidir.",
        "Modeminizde UPnP (otomatik port açma) özelliği varsa, uygulamalar sizin haberiniz olmadan port açabilir. Ağınızı yönetirken modemin arayüzündeki port yönlendirme ve UPnP listesini düzenli kontrol etmek iyi bir alışkanlıktır."
      ]
    },
    {
      h: "Port yönetiminde sık yapılan hatalar",
      ul: [
        "<strong>\"Ne olur ne olmaz\" diye port açmak:</strong> Açık her port saldırı yüzeyini büyütür; en az yetki ilkesine göre yalnızca gerekeni açın.",
        "<strong>Veritabanını internete açmak:</strong> 3306, 5432 gibi veritabanı portları yalnızca iç ağdan ya da uygulama sunucusundan erişilebilir olmalıdır.",
        "<strong>Şifresiz protokol kullanmak:</strong> FTP (21) ve Telnet (23) parolayı açık metinle taşır; SFTP ve SSH tercih edin.",
        "<strong>Varsayılan parolayı değiştirmemek:</strong> Modem ve kamera arayüzlerindeki fabrika parolaları ilk kurulumda değiştirilmelidir.",
        "<strong>Port değiştirmeyi güvenlik sanmak:</strong> Farklı port yalnızca gürültüyü azaltır; kimlik doğrulama ve güncelleme asıl korumadır."
      ],
      after: [
        "Ağ adreslerini ikili sistemde görmek ve alt ağ hesabını anlamak için [[arac:ip-ikili-cevir|IP İkili Çevirici]] yardımcı olur. Tüm araçlar tarayıcınızda çalışır; yazdığınız adresler ve port numaraları dışarıya gönderilmez."
      ]
    }
  ],
  faq: [
    ["Port numarası nedir?", "Port numarası, aynı IP adresindeki farklı hizmetleri ayıran 0 ile 65.535 arasındaki sayıdır. IP adresi cihazı, port ise o cihazdaki programı bulur; ikisi birlikte bir bağlantının uç noktasını oluşturur."],
    ["80 ve 443 portları arasındaki fark nedir?", "80 numaralı port şifresiz HTTP, 443 numaralı port TLS ile şifrelenmiş HTTPS içindir. 443 üzerinden giden veriler yol üzerinde okunamaz; günümüzde siteler 80'e gelen istekleri genellikle otomatik olarak 443'e yönlendirir."],
    ["22 numaralı port ne için kullanılır?", "22 numaralı port SSH için kullanılır; sunuculara şifreli komut satırı erişimi ve SFTP ile güvenli dosya aktarımı sağlar. Güçlü yetki verdiği için anahtar tabanlı kimlik doğrulama ve erişim kısıtlamasıyla korunmalıdır."],
    ["3389 portu neden güvenlik riski taşır?", "3389, Windows uzak masaüstü (RDP) portudur ve bilgisayarın tam kontrolünü verir. İnternete doğrudan açık olduğunda otomatik giriş denemelerinin hedefi olur; VPN arkasında tutmak, çok faktörlü doğrulama ve güncelleme riski büyük ölçüde azaltır."],
    ["TCP ile UDP arasındaki fark nedir?", "TCP bağlantı kurar, kayıp paketleri yeniden gönderir ve sırayı korur; web ve e-posta gibi kesinlik isteyen işlerde kullanılır. UDP bağlantısızdır ve daha hızlıdır; DNS, görüntülü görüşme ve oyunlarda tercih edilir."],
    ["Port yönlendirme nedir?", "Port yönlendirme, modemin genel IP adresine belirli bir porttan gelen trafiği iç ağdaki bir cihaza iletmesini sağlayan kuraldır. İç cihazı internete açtığı için yalnızca gerektiğinde, güçlü kimlik doğrulamayla ve kısa süreli kullanılmalıdır."],
    ["Bir URL'de port numarası nereye yazılır?", "Port, ana makine adından sonra iki nokta üst üste ile yazılır, örneğin ornek.com:8080. HTTP için 80 ve HTTPS için 443 varsayılan olduğundan bu iki port adreste genellikle yazılmaz."],
    ["En bilinen port numaraları hangileridir?", "En bilinen portlar 21 FTP, 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS, 587 e-posta gönderimi ve 3389 uzak masaüstüdür. Bu numaralar IANA tarafından kayıt altında tutulur."],
    ["Kaç tane port numarası vardır?", "Port alanı 16 bit olduğu için 65.536 değer vardır, yani 0'dan 65.535'e kadar. Bu sayı TCP ve UDP için ayrı ayrı geçerlidir; port 0 ayrılmıştır ve gerçek hizmetler için kullanılmaz."]
  ],
  tools: ["port-numarasi-bul", "url-ayristir", "http-durum-kodlari", "ip-ikili-cevir"],
  related: ["ip-adresi-ve-alt-ag-maskesi-nedir", "http-durum-kodlari-404-500-nedir", "url-kodlama-yuzde-20-nedir", "ipv6-nedir-ipv4-farki"],
  sources: [
    ["IANA – Service Name and Transport Protocol Port Number Registry", "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"],
    ["USOM – Ulusal Siber Olaylara Müdahale Merkezi", "https://www.usom.gov.tr/"]
  ]
};
