export default {
  slug: 'port-numarasi-bul',
  title: 'Port Numarası Sorgulama',
  h1Tail: 'hangi port hangi hizmet?',
  pageTitle: 'Port Numarası Sorgulama – Hangi Port Hangi Hizmete Ait?',
  description: 'Port numarasını yazın, hangi hizmetin kullandığını öğrenin; ya da hizmet adını yazıp varsayılan portunu bulun. TCP/UDP bilgisi ve port aralığıyla birlikte.',
  card: 'Port numarasından hizmeti, hizmet adından varsayılan portu bulun; TCP/UDP ve port aralığı bilgisiyle.',
  category: 'gelistirici',
  keywords: ['port numarası sorgulama', 'hangi port ne işe yarar', '443 portu nedir', 'ssh portu kaç', 'port listesi', 'tcp udp portları', 'mysql portu', 'rdp portu kaç'],
  lead: 'Bir port numarası (<code>443</code>) ya da hizmet adı (<code>ssh</code>) yazın. Araç, yaygın ağ hizmetlerinin varsayılan portlarını içeren tablodan karşılığını bulur; taşıma protokolünü ve portun hangi aralıkta yer aldığını gösterir.',
  button: 'Sorgula',
  inputs: [
    { id: 'girdi', label: 'Port numarası ya da hizmet adı', type: 'text', placeholder: 'Örn. 443 ya da ssh', hint: 'Port numarası 0 ile 65535 arasında olmalıdır.' },
  ],
  compute(v, h) {
    const t = String(v.girdi ?? '').trim();
    if (!t) h.err('Bir port numarası (örn. 443) ya da hizmet adı (örn. ssh) yazın.');
    if (t.length > 40) h.err('Girdi çok uzun. Yalnızca port numarasını ya da hizmetin kısa adını yazın.');
    // port: [hizmet, taşıma, açıklama, ek arama sözcükleri]
    const P = {
      20: ['FTP (veri)', 'TCP', 'Dosya aktarım protokolünün etkin kipte veri bağlantısı.', 'ftp'],
      21: ['FTP (denetim)', 'TCP', 'Dosya aktarım protokolünün komut bağlantısı. Şifrelenmemiş çalışır.', 'ftp'],
      22: ['SSH', 'TCP', 'Güvenli uzak kabuk; SFTP ve SCP dosya aktarımı da bu port üzerinden yapılır.', 'sftp scp'],
      23: ['Telnet', 'TCP', 'Şifrelenmemiş uzak terminal bağlantısı; güvenlik nedeniyle yerini SSH almıştır.', ''],
      25: ['SMTP', 'TCP', 'Posta sunucuları arasında e-posta aktarımı.', 'eposta mail'],
      53: ['DNS', 'UDP ve TCP', 'Alan adı çözümleme. Sorgular çoğunlukla UDP, büyük yanıtlar ve bölge aktarımları TCP kullanır.', ''],
      67: ['DHCP (sunucu)', 'UDP', 'Ağdaki cihazlara otomatik IP adresi dağıtan sunucunun dinlediği port.', 'bootp'],
      68: ['DHCP (istemci)', 'UDP', 'IP adresi isteyen istemcinin kullandığı port.', 'bootp'],
      69: ['TFTP', 'UDP', 'Basit dosya aktarımı; ağ üzerinden önyükleme ve cihaz yazılımı yüklemede kullanılır.', ''],
      80: ['HTTP', 'TCP', 'Şifrelenmemiş web trafiği.', 'web www'],
      88: ['Kerberos', 'TCP ve UDP', 'Ağ kimlik doğrulama protokolü.', ''],
      110: ['POP3', 'TCP', 'E-postayı sunucudan indirme protokolü (şifrelenmemiş).', 'eposta mail'],
      119: ['NNTP', 'TCP', 'Haber grubu protokolü.', 'usenet'],
      123: ['NTP', 'UDP', 'Ağ üzerinden saat eşitleme.', 'saat zaman'],
      135: ['RPC uç nokta eşleyici', 'TCP', 'Windows ağlarında uzak yordam çağrılarının eşlendiği port.', 'msrpc'],
      137: ['NetBIOS ad hizmeti', 'UDP', 'Eski Windows ağlarında ad çözümleme.', ''],
      139: ['NetBIOS oturum hizmeti', 'TCP', 'Eski Windows dosya ve yazıcı paylaşımı.', ''],
      143: ['IMAP', 'TCP', 'E-postayı sunucuda tutarak erişme protokolü (şifrelenmemiş ya da STARTTLS).', 'eposta mail'],
      161: ['SNMP', 'UDP', 'Ağ cihazlarını izleme ve yönetme protokolü.', ''],
      162: ['SNMP tuzakları', 'UDP', 'Cihazların yönetim sunucusuna gönderdiği olay bildirimleri.', 'trap'],
      179: ['BGP', 'TCP', 'İnternet omurgasında yönlendirme bilgisi alışverişi.', ''],
      389: ['LDAP', 'TCP ve UDP', 'Dizin hizmetlerine erişim.', 'dizin'],
      443: ['HTTPS', 'TCP (HTTP/3 için UDP)', 'TLS ile şifrelenmiş web trafiği.', 'web ssl tls'],
      445: ['SMB', 'TCP', 'Windows dosya ve yazıcı paylaşımı.', 'cifs samba paylaşım'],
      465: ['SMTPS', 'TCP', 'Baştan TLS ile şifrelenmiş e-posta gönderimi.', 'smtp eposta mail'],
      500: ['IKE (IPsec)', 'UDP', 'IPsec VPN bağlantılarında anahtar değişimi.', 'vpn isakmp'],
      514: ['Syslog', 'UDP', 'Cihaz ve sunucu günlüklerinin merkezî sunucuya gönderimi.', 'log'],
      515: ['LPD', 'TCP', 'Satır yazıcı hizmeti; ağ yazıcılarına baskı gönderimi.', 'yazıcı printer lpr'],
      554: ['RTSP', 'TCP', 'Gerçek zamanlı akış denetimi; IP kameralarda yaygındır.', 'kamera'],
      587: ['SMTP (ileti gönderimi)', 'TCP', 'E-posta istemcilerinin kimlik doğrulayarak ileti gönderdiği port; STARTTLS ile şifrelenir.', 'submission eposta mail'],
      631: ['IPP', 'TCP', 'İnternet yazdırma protokolü.', 'yazıcı printer cups'],
      636: ['LDAPS', 'TCP', 'TLS ile şifrelenmiş LDAP.', 'ldap dizin'],
      853: ['DNS over TLS', 'TCP', 'Şifrelenmiş DNS sorguları.', 'dot dns'],
      873: ['rsync', 'TCP', 'Dosya eşitleme hizmeti.', ''],
      990: ['FTPS (denetim)', 'TCP', 'Baştan TLS ile şifrelenmiş FTP komut bağlantısı.', 'ftp'],
      993: ['IMAPS', 'TCP', 'TLS ile şifrelenmiş IMAP.', 'imap eposta mail'],
      995: ['POP3S', 'TCP', 'TLS ile şifrelenmiş POP3.', 'pop3 eposta mail'],
      1194: ['OpenVPN', 'UDP (TCP de olabilir)', 'OpenVPN bağlantılarının varsayılan portu.', 'vpn'],
      1433: ['Microsoft SQL Server', 'TCP', 'SQL Server veritabanı bağlantıları.', 'mssql sql veritabanı'],
      1521: ['Oracle veritabanı dinleyicisi', 'TCP', 'Oracle veritabanı bağlantıları.', 'veritabanı'],
      1723: ['PPTP', 'TCP', 'Eski bir VPN tünelleme protokolü.', 'vpn'],
      1883: ['MQTT', 'TCP', 'Nesnelerin interneti cihazlarında hafif ileti protokolü.', 'iot'],
      1900: ['SSDP', 'UDP', 'Yerel ağda cihaz keşfi (UPnP).', 'upnp'],
      2049: ['NFS', 'TCP ve UDP', 'Ağ dosya sistemi paylaşımı.', ''],
      3306: ['MySQL / MariaDB', 'TCP', 'MySQL ve MariaDB veritabanı bağlantıları.', 'veritabanı'],
      3389: ['RDP', 'TCP ve UDP', 'Windows uzak masaüstü bağlantısı.', 'uzak masaüstü'],
      3478: ['STUN / TURN', 'UDP ve TCP', 'Görüntülü görüşmelerde ağ adresi çevirisini aşmak için kullanılır.', 'webrtc'],
      4500: ['IPsec NAT geçişi', 'UDP', 'Ağ adresi çevirisi arkasındaki IPsec VPN trafiği.', 'vpn'],
      5060: ['SIP', 'UDP ve TCP', 'İnternet telefonunda çağrı kurulum sinyalleşmesi.', 'voip santral'],
      5061: ['SIP (TLS)', 'TCP', 'Şifrelenmiş SIP sinyalleşmesi.', 'sip voip'],
      5353: ['mDNS', 'UDP', 'Yerel ağda sunucusuz ad çözümleme.', 'bonjour'],
      5432: ['PostgreSQL', 'TCP', 'PostgreSQL veritabanı bağlantıları.', 'postgres veritabanı'],
      5672: ['AMQP', 'TCP', 'İleti kuyruğu protokolü.', 'kuyruk'],
      5900: ['VNC', 'TCP', 'Uzak masaüstü görüntüleme ve denetimi.', 'uzak masaüstü'],
      6379: ['Redis', 'TCP', 'Redis bellek içi veri deposu bağlantıları.', 'önbellek'],
      8080: ['HTTP (alternatif)', 'TCP', 'Vekil sunucular ve uygulama sunucuları için yaygın alternatif web portu.', 'web proxy vekil'],
      8443: ['HTTPS (alternatif)', 'TCP', 'Yönetim panelleri ve uygulama sunucuları için yaygın alternatif şifreli web portu.', 'web'],
      8883: ['MQTT (TLS)', 'TCP', 'TLS ile şifrelenmiş MQTT.', 'mqtt iot'],
      9100: ['Ham yazdırma (RAW)', 'TCP', 'Ağ yazıcılarına doğrudan baskı verisi gönderimi.', 'yazıcı printer'],
      11211: ['Memcached', 'TCP ve UDP', 'Memcached önbellek sunucusu.', 'önbellek'],
      27017: ['MongoDB', 'TCP', 'MongoDB veritabanı bağlantıları.', 'veritabanı'],
      51820: ['WireGuard', 'UDP', 'WireGuard VPN bağlantılarının yaygın varsayılan portu.', 'vpn'],
    };
    const aralik = (p) => (p <= 1023 ? 'Bilinen (sistem) portlar: 0–1023' : p <= 49151 ? 'Kayıtlı portlar: 1024–49151' : 'Dinamik / özel portlar: 49152–65535');
    const satirlar = (p) => [
      ['Hizmet', P[p][0]],
      ['Port', String(p)],
      ['Taşıma protokolü', P[p][1]],
      ['Aralık', aralik(p)],
      ['Açıklama', P[p][2]],
    ];

    if (/^[\d\s.,+-]+$/.test(t)) {
      if (!/^\d{1,5}$/.test(t)) h.err('Port numarası 0 ile 65535 arasında bir tam sayı olmalıdır.');
      const p = Number(t);
      if (p > 65535) h.err('Port numarası en fazla 65535 olabilir; port alanı 16 bitlik bir sayıdır.');
      if (p === 0) return { rows: [['Hizmet', 'Ayrılmış (kullanılmaz)'], ['Port', '0'], ['Aralık', aralik(0)]], note: 'Port 0 ayrılmıştır. Programlamada "0" çoğunlukla işletim sisteminden boş bir port seçmesini istemek için kullanılır.' };
      if (P[p]) return { rows: satirlar(p), note: 'Listelenen değer hizmetin varsayılan portudur; yöneticiler hizmeti başka bir porta taşıyabilir.' };
      return {
        rows: [['Hizmet', 'Tabloda yaygın bir atama yok'], ['Port', String(p)], ['Aralık', aralik(p)]],
        note: p >= 49152 ? 'Bu aralıktaki portlar kalıcı olarak atanmaz; işletim sistemleri giden bağlantılar için geçici olarak kullanır.' : 'Bu port tabloda yer almıyor. Herhangi bir yazılım bu portu kullanacak biçimde yapılandırılmış olabilir.',
      };
    }

    // Hizmet adına göre arama
    const q = t.toLocaleLowerCase('tr');
    if (q.length < 2) h.err('Hizmet adı en az iki karakter olmalıdır (örn. ssh, dns, smtp).');
    const tam = [];
    const kismi = [];
    for (const key of Object.keys(P)) {
      const p = Number(key);
      const ad = P[p][0].toLocaleLowerCase('tr');
      const sozcukler = (ad + ' ' + P[p][3]).split(/[^a-z0-9çğıöşü]+/).filter(Boolean);
      if (sozcukler.includes(q) || ad === q) tam.push(p);
      else if (ad.includes(q)) kismi.push(p);
    }
    const bulunan = tam.length ? tam : kismi;
    if (!bulunan.length) h.err(`"${t}" adında bir hizmet tabloda bulunamadı. Kısa protokol adını deneyin (örn. http, ssh, imap, rdp).`);
    if (bulunan.length === 1) return { rows: satirlar(bulunan[0]), note: 'Listelenen değer hizmetin varsayılan portudur; yöneticiler hizmeti başka bir porta taşıyabilir.' };
    return {
      rows: [
        ['Port', bulunan.join(', ')],
        ['Eşleşen kayıt', `${bulunan.length} port`],
      ],
      text: bulunan.map((p) => `${p} – ${P[p][0]} – ${P[p][1]} – ${P[p][2]}`).join('\n'),
      note: 'Arama birden fazla portla eşleşti; ayrıntılar aşağıda listelenmiştir.',
    };
  },
  cases: [
    { in: { girdi: '443' }, out: { 'Hizmet': 'HTTPS', 'Port': '443', 'Taşıma protokolü': 'TCP (HTTP/3 için UDP)', 'Aralık': 'Bilinen (sistem) portlar: 0–1023' } },
    { in: { girdi: 'ssh' }, out: { 'Hizmet': 'SSH', 'Port': '22', 'Taşıma protokolü': 'TCP' } },
    { in: { girdi: '3306' }, out: { 'Hizmet': 'MySQL / MariaDB', 'Aralık': 'Kayıtlı portlar: 1024–49151' } },
    { in: { girdi: 'smtp' }, out: { 'Port': '25, 465, 587', 'Eşleşen kayıt': '3 port' }, textMatch: '^25 – SMTP – TCP' },
    { in: { girdi: '53' }, out: { 'Hizmet': 'DNS', 'Taşıma protokolü': 'UDP ve TCP' } },
    { in: { girdi: '60000' }, out: { 'Hizmet': 'Tabloda yaygın bir atama yok', 'Aralık': 'Dinamik / özel portlar: 49152–65535' } },
    { in: { girdi: 'RDP' }, out: { 'Port': '3389', 'Hizmet': 'RDP' } },
    { in: { girdi: 'postgres' }, out: { 'Port': '5432', 'Hizmet': 'PostgreSQL' } },
    { in: { girdi: '1024' }, out: { 'Aralık': 'Kayıtlı portlar: 1024–49151' } },
    { in: { girdi: '70000' }, error: true },
    { in: { girdi: '' }, error: true },
    { in: { girdi: '-5' }, error: true },
    { in: { girdi: 'olmayanhizmet' }, error: true },
  ],
  howto: [
    'Kutuya sorgulamak istediğiniz port numarasını yazın; örneğin güvenlik duvarı günlüğünde gördüğünüz <code>3389</code> ya da modem arayüzünde yönlendirmeniz istenen <code>443</code>.',
    'Portu değil hizmeti biliyorsanız kısa adını yazın: <code>ssh</code>, <code>imap</code>, <code>mysql</code>, <code>rdp</code>. "vpn", "yazıcı" ya da "veritabanı" gibi genel sözcüklerle ilgili tüm portları da listeleyebilirsiniz.',
    '"Sorgula" düğmesine basın. Hizmet adı, port numarası, TCP/UDP bilgisi, portun aralığı ve kısa açıklaması görüntülenir.',
    'Arama birden fazla portla eşleşirse sonuç kutusunda her biri ayrı satırda listelenir; örneğin "smtp" için 25, 465 ve 587 birlikte gelir.',
  ],
  sections: [
    { h: 'Port numarası nedir?', p: [
      'Bir IP adresi ağdaki cihazı gösterir; port numarası ise o cihazda çalışan hangi hizmete ulaşmak istediğinizi belirtir. Bunu bir apartmana benzetebilirsiniz: IP adresi binanın adresi, port ise daire numarasıdır. Aynı sunucu hem web sitesi, hem e-posta, hem de uzak yönetim hizmeti verebilir; gelen bağlantının hangisine ait olduğu port numarasından anlaşılır.',
      'Port alanı 16 bitlik bir sayıdır; bu yüzden değerler <strong>0 ile 65535</strong> arasında olur. Tarayıcıya bir web adresi yazdığınızda port belirtmezsiniz, çünkü tarayıcı şifreli bağlantılar için 443, şifresiz bağlantılar için 80 numaralı portu varsayar. Farklı bir port kullanılacaksa adresin sonuna iki nokta ile eklenir.',
    ] },
    { h: 'Üç port aralığı', ul: [
      '<strong>Bilinen (sistem) portlar, 0–1023:</strong> temel internet hizmetlerine ayrılmıştır. Birçok işletim sisteminde bu portları dinlemek yönetici yetkisi gerektirir.',
      '<strong>Kayıtlı portlar, 1024–49151:</strong> belirli uygulamalar için kayda geçirilmiş portlardır; veritabanları, uzak masaüstü ve ileti kuyruğu yazılımları bu aralıktadır.',
      '<strong>Dinamik / özel portlar, 49152–65535:</strong> kalıcı olarak atanmaz. İşletim sistemi, giden her bağlantı için bu aralıktan geçici bir kaynak portu seçer.',
    ] },
    { h: 'TCP ile UDP farkı', p: [
      'Port numaraları TCP ve UDP için ayrı ayrı tutulur; yani 53 numaralı TCP portu ile 53 numaralı UDP portu teknik olarak iki farklı kapıdır. <strong>TCP</strong> bağlantı kurar, verinin eksiksiz ve sıralı ulaşmasını güvenceye alır; web, e-posta ve dosya aktarımı gibi kayıp kabul etmeyen hizmetlerde kullanılır. <strong>UDP</strong> bağlantı kurmadan paket gönderir; daha hızlıdır ama teslim güvencesi vermez. Alan adı sorguları, saat eşitleme, sesli görüşme ve kimi VPN türleri UDP kullanır.',
      'Güvenlik duvarında ya da modemde kural yazarken protokolü doğru seçmek gerekir. UDP ile çalışan bir VPN için TCP portu açmak hiçbir işe yaramaz. Araç bu yüzden her kayıt için taşıma protokolünü ayrıca gösterir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Kutuya <strong>443</strong> yazıp sorguladığınızda hizmet "HTTPS", taşıma protokolü "TCP (HTTP/3 için UDP)", aralık "Bilinen (sistem) portlar: 0–1023" olarak görünür. <strong>ssh</strong> yazdığınızda araç adı tabloda arar ve 22 numaralı TCP portunu döndürür.',
      '<strong>smtp</strong> yazdığınızda tek bir port değil, üç kayıt gelir: 25, 465 ve 587. E-posta gönderiminde üç ayrı portun bulunması sık sorulan bir konudur: 25 sunucular arası aktarım, 587 istemcilerin kimlik doğrulayarak gönderimi, 465 ise baştan şifrelenmiş gönderim içindir. Tabloda bulunmayan <strong>60000</strong> gibi bir değer yazarsanız araç bir hizmet adı uydurmaz; yalnızca portun dinamik aralıkta yer aldığını bildirir.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Küçük işletmelerde en sık karşılaşılan durum port yönlendirmedir: güvenlik kamerası kayıt cihazına, muhasebe programının veritabanına ya da ofisteki bir bilgisayara dışarıdan erişmek için modemde hangi portun açılacağını bilmek gerekir. Ağ yazıcısı kurulumunda sürücünün hangi portu kullandığını bilmek, baskı gitmediğinde sorunu daraltır. Güvenlik duvarı günlüklerinde sürekli denenen bir port gördüğünüzde bunun hangi hizmeti hedeflediğini anlamak, önlem almanın ilk adımıdır.',
      'Yazılım geliştirirken yerelde çalıştırdığınız bir hizmetin portu başka bir programla çakışabilir. Kullanmayı düşündüğünüz portun yaygın bir hizmete ait olup olmadığını önceden sorgulamak bu tür çakışmaları azaltır.',
    ] },
    { h: 'Güvenlik uyarısı ve sınırlar', p: [
      'Bir portu internete açmak, o hizmeti dünyadaki herkesin denemesine açmak demektir. Uzak masaüstü, veritabanı ve dosya paylaşımı portlarının doğrudan internete açılması yaygın bir saldırı nedenidir. Bu tür erişimler için VPN kullanmak, erişimi belirli IP adresleriyle sınırlamak ve güçlü kimlik doğrulama uygulamak gerekir. Bu sayfadaki bilgiler genel başvuru niteliğindedir; kurumsal ağ tasarımı için bir ağ ya da güvenlik uzmanına danışın.',
      'Araç yaygın hizmetleri içeren sabit bir tabloyla çalışır ve portun <em>varsayılan</em> kullanımını gösterir. Bir portun bilgisayarınızda açık olup olmadığını, o an hangi programın dinlediğini denetlemez; ağınıza hiçbir istek göndermez. Yöneticiler hizmetleri varsayılan dışındaki portlara taşıyabildiği için bir portta beklenenden farklı bir yazılım çalışıyor olabilir.',
    ] },
  ],
  faq: [
    ['80 ve 443 numaralı portların farkı nedir?', '80 şifrelenmemiş web trafiği (HTTP), 443 ise TLS ile şifrelenmiş web trafiği (HTTPS) içindir. Güncel siteler 80 numaralı porta gelen istekleri 443\'e yönlendirir.'],
    ['SSH portu kaçtır, değiştirilebilir mi?', 'Varsayılan SSH portu 22\'dir. Sunucu yapılandırmasından başka bir değere taşınabilir; bu, otomatik denemelerin gürültüsünü azaltır ama tek başına güvenlik önlemi sayılmaz. Anahtar tabanlı kimlik doğrulama asıl korumadır.'],
    ['E-posta için neden üç farklı SMTP portu var?', '25 numaralı port posta sunucularının birbirine ileti aktarması içindir. 587, e-posta programlarının kimlik doğrulayarak ileti göndermesi için ayrılmıştır ve bağlantı STARTTLS ile şifrelenir. 465 ise bağlantının en baştan TLS ile kurulduğu gönderim portudur.'],
    ['Bir portun açık olup olmadığını bu araçla görebilir miyim?', 'Hayır. Araç yalnızca portun hangi hizmete ait olduğunu söyleyen bir başvuru tablosudur; ağınıza ya da herhangi bir sunucuya bağlantı denemesi yapmaz.'],
    ['Tabloda olmayan bir port ne anlama gelir?', 'Portun yaygın, bilinen bir varsayılan kullanımı olmadığı anlamına gelir. Herhangi bir yazılım 1024 üzerindeki boş bir portu kullanacak biçimde ayarlanabilir; portu kimin kullandığını öğrenmek için ilgili cihazdaki dinleyen süreçlere bakmak gerekir.'],
    ['Dinamik portlar ne için kullanılır?', 'Bilgisayarınız bir sunucuya bağlanırken kendi tarafında geçici bir kaynak portu açar. İşletim sistemi bu portu genellikle yüksek numaralı dinamik aralıktan seçer ve bağlantı kapanınca serbest bırakır.'],
    ['Aynı port numarası hem TCP hem UDP olabilir mi?', 'Evet. TCP ve UDP port alanları birbirinden bağımsızdır. DNS her ikisini de 53 numarayla kullanır; kimi hizmetler ise yalnızca birini kullanır. Güvenlik duvarı kuralında protokolü ayrıca belirtmeniz gerekir.'],
    ['Sorguladığım portlar kaydediliyor mu?', 'Hayır. Port tablosu sayfanın içindedir; arama tarayıcınızda yapılır ve yazdığınız değer hiçbir sunucuya gönderilmez.'],
  ],
  related: ['ip-alt-ag-hesapla', 'cidr-hesapla', 'http-durum-kodlari', 'mac-adresi-bicimlendir', 'url-ayristir', 'alt-ag-maskesi-cevir'],
};
