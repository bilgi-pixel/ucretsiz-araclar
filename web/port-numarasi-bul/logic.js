// Port Numarası Sorgulama — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
