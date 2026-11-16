export default {
  slug: "mac-adresi-nedir-nasil-ogrenilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "MAC Adresi Nedir, Nasıl Öğrenilir? IP Adresinden Farkı ve Yazım Biçimleri",
  pageTitle: "MAC Adresi Nedir, Nasıl Öğrenilir? IP Farkı ve Biçimleri",
  description: "MAC adresi nedir, Windows, macOS ve telefonda nasıl bulunur? IP adresinden farkı, ilk 6 hanenin anlamı, rastgele MAC, yazım biçimleri ve MAC filtrelemenin sınırları.",
  keywords: ["mac adresi nedir", "mac adresi nasıl öğrenilir", "mac adresi ip farkı", "telefon mac adresi", "rastgele mac adresi", "mac filtreleme", "mac adresi formatı", "fiziksel adres nedir"],
  lead: "MAC adresi, bir ağ kartına ya da Wi-Fi yongasına atanan, <strong>48 bitlik (12 onaltılık haneli) donanım kimliğidir</strong> ve yalnızca aynı yerel ağ içindeki cihazların birbirini tanımasında kullanılır. Windows'ta komut isteminde <code>ipconfig /all</code> yazıp \"Fiziksel Adres\" satırına, telefonlarda ise Wi-Fi ağ ayrıntılarına bakarak öğrenebilirsiniz. Bu sayfada MAC ile IP adresinin farkını, ilk altı hanenin neyi gösterdiğini, telefonların neden rastgele adres kullandığını, iki nokta ve tireli yazımların farkını ve modemdeki MAC filtrelemenin neden tek başına güvenlik sağlamadığını bulacaksınız.",
  kisaCevap: [
    "MAC adresi 48 bittir; 6 bayt, yani 12 onaltılık haneyle yazılır: 3C:52:82:1A:7F:09 gibi.",
    "İlk 3 bayt (6 hane) üreticiye atanan OUI önekidir, son 3 bayt üreticinin cihaza verdiği seri kısmıdır.",
    "MAC adresi yerel ağda (aynı Wi-Fi ya da kablolu ağ) çalışır; IP adresi ise ağlar arasında yönlendirme için kullanılır.",
    "Windows: ipconfig /all → Fiziksel Adres. macOS: Sistem Ayarları → Ağ → Ayrıntılar. Telefon: Wi-Fi ağ ayrıntıları.",
    "Telefonlar gizlilik için her ağa farklı rastgele MAC gösterebilir; bu adreslerde ikinci hane 2, 6, A ya da E olur.",
    "MAC filtreleme tek başına güvenlik değildir; ağı WPA2 ya da WPA3 ve güçlü bir şifreyle koruyun."
  ],
  figure: {
    alt: "MAC adresinin yapısı: 3C:52:82:1A:7F:09 adresinde ilk üç bayt üretici öneki, son üç bayt cihaza özgü kısım; ilk bayttaki iki bitin tekil-çoklu ve evrensel-yerel anlamı.",
    caption: "MAC adresi altı bayttır. İlk baytın en sağdaki iki biti adresin türünü söyler: birinci bit tekil ya da çoklu yayın, ikinci bit üretici atamalı ya da yerel yönetimli (rastgele) adres.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Bir MAC adresinin anatomisi</text>
  <g class="mid">
    <rect x="40" y="56" width="96" height="58" rx="8" class="p"/><text x="88" y="93" class="xl sf">3C</text>
    <rect x="146" y="56" width="96" height="58" rx="8" class="p"/><text x="194" y="93" class="xl sf">52</text>
    <rect x="252" y="56" width="96" height="58" rx="8" class="p"/><text x="300" y="93" class="xl sf">82</text>
    <rect x="372" y="56" width="96" height="58" rx="8" class="sf sb"/><text x="420" y="93" class="xl">1A</text>
    <rect x="478" y="56" width="96" height="58" rx="8" class="sf sb"/><text x="526" y="93" class="xl">7F</text>
    <rect x="584" y="56" width="96" height="58" rx="8" class="sf sb"/><text x="632" y="93" class="xl">09</text>
  </g>
  <line x1="40" y1="126" x2="348" y2="126" class="sp sw" fill="none"/>
  <line x1="372" y1="126" x2="680" y2="126" class="st sw" fill="none"/>
  <text x="194" y="148" class="b mid">Üretici öneki (OUI) – 24 bit</text>
  <text x="526" y="148" class="b mid">Cihaza özgü kısım – 24 bit</text>
  <text x="194" y="168" class="sm mid t2">IEEE tarafından üreticiye atanır</text>
  <text x="526" y="168" class="sm mid t2">Üretici her cihaza farklı verir</text>
  <text x="40" y="208" class="b">İlk bayt 3C = 0011 1100 (ikili)</text>
  <g class="mid">
    <rect x="40" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="62" y="248">0</text>
    <rect x="88" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="110" y="248">0</text>
    <rect x="136" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="158" y="248">1</text>
    <rect x="184" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="206" y="248">1</text>
    <rect x="232" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="254" y="248">1</text>
    <rect x="280" y="222" width="44" height="40" rx="4" class="sf sb"/><text x="302" y="248">1</text>
    <rect x="328" y="222" width="44" height="40" rx="4" class="oks"/><text x="350" y="248" class="b">0</text>
    <rect x="376" y="222" width="44" height="40" rx="4" class="ps"/><text x="398" y="248" class="b">0</text>
  </g>
  <line x1="350" y1="266" x2="350" y2="300" class="sok" fill="none"/>
  <line x1="398" y1="266" x2="398" y2="330" class="sp" fill="none"/>
  <text x="440" y="294" class="sm"><tspan class="b">U/L biti</tspan> 0 → üretici atamalı (evrensel)</text>
  <text x="440" y="312" class="sm t2">1 olsaydı → yerel yönetimli / rastgele</text>
  <text x="440" y="340" class="sm"><tspan class="b">I/G biti</tspan> 0 → tekil (unicast)</text>
  <text x="440" y="358" class="sm t2">1 olsaydı → çoklu yayın (multicast)</text>
  <rect x="40" y="290" width="380" height="80" rx="8" class="sf sb"/>
  <text x="56" y="314" class="sm b">Aynı adresin üç yazımı</text>
  <text x="56" y="336" class="sm">3C:52:82:1A:7F:09 · 3C-52-82-1A-7F-09</text>
  <text x="56" y="358" class="sm">3c52.821a.7f09 (noktalı üçlü grup)</text>
</svg>`
  },
  sections: [
    {
      h: "MAC adresi nedir?",
      p: [
        "MAC (Media Access Control, ortam erişim denetimi) adresi, ağa bağlanan her ağ arayüzüne verilen bir donanım kimliğidir. Bilgisayarınızın kablolu ağ kartının, Wi-Fi yongasının ve Bluetooth birimi gibi her arayüzün ayrı bir MAC adresi vardır. Bu yüzden aynı dizüstü bilgisayarın kablolu ve kablosuz bağlantıda iki farklı MAC adresi görünmesi normaldir.",
        "Adres 48 bit uzunluğundadır ve 6 bayt olarak, her bayt iki onaltılık haneyle yazılır. Onaltılık sistemde 0–9 rakamları ve A–F harfleri kullanılır; bu nedenle MAC adresinde G ya da Z gibi harfler bulunmaz. Onaltılık sayıların mantığı için [[bilgi:onaltilik-hex-sayi-sistemi|hex sayı sistemi yazısına]] bakabilirsiniz.",
        "MAC adresi, Ethernet ve Wi-Fi gibi ağ teknolojilerinde verinin aynı yerel ağ içindeki doğru cihaza ulaşmasını sağlar. Modeminiz evdeki telefonu, televizyonu ve bilgisayarı birbirinden MAC adresleriyle ayırır. Ancak bu adres internete çıkarken modemde kalır; ziyaret ettiğiniz sitelere iletilmez."
      ]
    },
    {
      h: "MAC adresi ile IP adresi arasındaki fark",
      p: [
        "İki adres sık karıştırılır, çünkü ikisi de bir cihazı tanımlar. Aralarındaki fark, mektup örneğiyle anlaşılabilir: IP adresi sokak ve bina adresine, MAC adresi ise binanın içindeki daire numarasına benzer. Mektup şehirden şehre IP adresiyle taşınır, binaya gelince doğru kapıyı MAC adresi bulur."
      ],
      table: {
        head: ["Özellik", "MAC adresi", "IP adresi"],
        rows: [
          ["Katman", "Veri bağı katmanı (2. katman)", "Ağ katmanı (3. katman)"],
          ["Uzunluk", "48 bit, 12 onaltılık hane", "IPv4 32 bit, IPv6 128 bit"],
          ["Örnek", "3C:52:82:1A:7F:09", "192.168.1.25"],
          ["Kim verir?", "Üretici (ya da işletim sistemi, rastgele)", "Modem ya da ağ yöneticisi (DHCP)"],
          ["Geçerli olduğu alan", "Yalnızca yerel ağ", "Yerel ağ ve internet"],
          ["Değişir mi?", "Donanım adresi sabittir; rastgele adres ağa göre değişir", "Ağ değiştikçe ve süre dolunca değişebilir"],
          ["İnternete gider mi?", "Hayır, modemde kalır", "Evet, genel IP adresi görünür"]
        ]
      },
      after: [
        "Yerel ağda bir cihaz IP adresi bilinen başka bir cihazın MAC adresini ARP (Adres Çözümleme Protokolü) ile öğrenir. IP adreslerinin yapısı ve alt ağ maskesi için [[bilgi:ip-adresi-ve-alt-ag-maskesi-nedir|IP adresi ve alt ağ maskesi]], yeni nesil adresler için [[bilgi:ipv6-nedir-ipv4-farki|IPv6 yazısını]] okuyabilirsiniz."
      ]
    },
    {
      h: "Windows, macOS, Linux ve telefonda MAC adresi nasıl bulunur?",
      ul: [
        "<strong>Windows (komut istemi):</strong> Başlat menüsüne \"cmd\" yazıp Komut İstemi'ni açın, <code>ipconfig /all</code> yazın. Kullandığınız bağdaştırıcının altındaki \"Fiziksel Adres\" satırı MAC adresidir. <code>getmac</code> komutu da tüm adresleri kısa liste olarak verir.",
        "<strong>Windows (ayarlar):</strong> Ayarlar → Ağ ve İnternet → Wi-Fi ya da Ethernet → bağlı ağın özellikleri. Sayfanın altında \"Fiziksel adres (MAC)\" yazar.",
        "<strong>macOS:</strong> Sistem Ayarları → Ağ → Wi-Fi → bağlı ağın yanındaki Ayrıntılar düğmesi. Donanım ya da Wi-Fi adresi bölümünde görünür. Terminal'de <code>ifconfig en0</code> komutundaki \"ether\" satırı da aynı bilgiyi verir.",
        "<strong>Linux:</strong> Terminalde <code>ip link</code> yazın; her arayüzün altındaki \"link/ether\" satırı MAC adresidir.",
        "<strong>Android:</strong> Ayarlar → Ağ ve internet → Wi-Fi → bağlı ağın ayrıntıları. Burada gösterilen adres, gizlilik ayarına göre rastgele adres olabilir. Cihazın kendi donanım adresi genellikle Ayarlar → Telefon hakkında bölümündedir.",
        "<strong>iOS:</strong> Ayarlar → Genel → Hakkında → Wi-Fi Adresi donanım adresini gösterir. Bir ağa bağlıyken o ağın ayrıntılarındaki \"Özel Wi-Fi Adresi\" o ağa özel rastgele adrestir."
      ],
      after: [
        "Okul, iş yeri ya da yurt ağına kayıt için MAC adresi isteniyorsa, o ağa bağlanırken cihazın göstereceği adresi bildirmelisiniz. Rastgele adres açıksa kayıt ettirdiğiniz adres ile ağın gördüğü adres farklı olabilir; ağ yöneticinizin talimatına göre o ağ için rastgele adresi kapatmanız istenebilir."
      ]
    },
    {
      h: "MAC adresindeki ilk 6 hane neyi gösterir?",
      p: [
        "MAC adresinin ilk üç baytı (ilk 6 onaltılık hane) <strong>OUI</strong> (Organizationally Unique Identifier, kuruluşa özgü tanımlayıcı) olarak adlandırılır. IEEE bu önekleri ağ donanımı üreten şirketlere atar ve herkese açık bir kayıtta yayımlar. Böylece bir adresin ilk yarısına bakarak ağ kartının hangi üretici tarafından yapıldığını çoğu zaman anlayabilirsiniz. Son üç bayt ise üreticinin her cihaza verdiği, kendi içinde benzersiz olması gereken kısımdır.",
        "İlk baytın en sağdaki iki biti özel anlam taşır. En sağdaki bit (I/G) 0 ise adres tek bir cihaza aittir (tekil), 1 ise bir gruba gönderilen çoklu yayın adresidir. Sağdan ikinci bit (U/L) 0 ise adres üretici tarafından atanmış evrensel adrestir, 1 ise yerel olarak, yani işletim sistemi ya da ağ yöneticisi tarafından belirlenmiş adrestir."
      ],
      formula: "İlk bayt 3C = 0011 1100 → I/G = 0 (tekil), U/L = 0 (evrensel, üretici atamalı)\nİlk bayt DA = 1101 1010 → I/G = 0 (tekil), U/L = 1 (yerel yönetimli, rastgele)\nKısa yol: ikinci hane 2, 6, A ya da E ise adres yerel yönetimlidir.",
      after: [
        "Bu bitleri elle çözmek yerine [[arac:mac-adresi-bicimlendir|MAC Adresi Biçimlendirme]] aracına adresi yazmanız yeterlidir: araç üretici önekini, tekil ya da çoklu yayın türünü ve adresin evrensel mi yerel mi olduğunu gösterir. Onaltılıktan ikiliye çevirme mantığı [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısında anlatılır."
      ]
    },
    {
      h: "Telefonlar neden rastgele (özel) MAC adresi kullanır?",
      p: [
        "Sabit bir MAC adresi, cihazın farklı mekânlarda tanınmasını mümkün kılar. Bir alışveriş merkezindeki, havalimanındaki ya da kafedeki Wi-Fi erişim noktaları, telefonun ağ ararken yaydığı sinyallerdeki MAC adresini kaydederek aynı kişinin hangi gün nerede bulunduğunu çıkarabilir. Bu bir gizlilik sorunudur.",
        "Bu nedenle güncel mobil işletim sistemleri ve birçok bilgisayar işletim sistemi, varsayılan olarak her Wi-Fi ağına cihazın gerçek adresi yerine o ağa özel, rastgele üretilmiş bir adres gösterir. Bu adreslerin U/L biti 1'dir; yani ikinci haneleri 2, 6, A ya da E olur. Aynı ağa her bağlandığınızda genellikle aynı rastgele adres kullanılır, farklı ağlarda farklı adres görünür."
      ],
      ul: [
        "<strong>Artısı:</strong> Farklı ağlar sizi aynı cihaz olarak eşleştiremez; konum geçmişi çıkarmak zorlaşır.",
        "<strong>Eksisi:</strong> Modemde cihaza sabit IP atadıysanız, ebeveyn denetimi ya da MAC'e bağlı kurallar koyduysanız, rastgele adres değiştiğinde bu kurallar çalışmayabilir.",
        "<strong>Öneri:</strong> Kendi ev ağınız gibi güvendiğiniz ağlarda gerekirse o ağa özel olarak rastgele adresi kapatabilir, halka açık ağlarda açık bırakabilirsiniz."
      ]
    },
    {
      h: "İki nokta, tire ve noktalı yazımlar arasındaki fark",
      p: [
        "Aynı 48 bitlik adres farklı sistemlerde farklı ayraçlarla yazılır. Bu yalnızca bir gösterim farkıdır; adresin değeri değişmez. Bir yönetim panelinin ya da kayıt formunun beklediği biçimde yazmazsanız adres reddedilebilir."
      ],
      table: {
        head: ["Biçim", "Örnek", "Nerede görülür"],
        rows: [
          ["İki nokta üst üste", "3C:52:82:1A:7F:09", "macOS, Linux, çoğu modem paneli"],
          ["Tire", "3C-52-82-1A-7F-09", "Windows (ipconfig, getmac)"],
          ["Noktalı üçlü grup", "3c52.821a.7f09", "Kurumsal ağ anahtarları ve yönlendiriciler"],
          ["Ayraçsız", "3C52821A7F09", "Bazı kayıt formları, lisans ve veritabanı alanları"]
        ],
        caption: "Büyük ve küçük harf aynı değeri gösterir: 3C ile 3c aynıdır."
      },
      after: [
        "Bir biçimden ötekine elle çevirirken hane atlamak kolaydır. MAC Adresi Biçimlendirme aracı adresi tüm biçimlerde ve seçtiğiniz harf düzeninde yazar, hatalı uzunluktaki adresleri de uyarır."
      ]
    },
    {
      h: "Modemde MAC filtreleme güvenli midir? Savunma bakışı",
      p: [
        "Modem ve erişim noktalarındaki MAC filtreleme, yalnızca listedeki adreslere sahip cihazların ağa bağlanmasına izin verir. Kâğıt üzerinde çekici görünse de tek başına güçlü bir güvenlik önlemi değildir. Wi-Fi çerçevelerinde MAC adresleri şifrelenmeden taşınır; ağı dinleyebilen biri izin verilen adresleri görebilir ve bir cihazın adresi yazılımla başka bir değere ayarlanabilir. Yani MAC filtrelemesi kararlı bir saldırganı durdurmaz, yalnızca rastgele bağlanma denemelerini azaltır.",
        "Ağınızı gerçekten korumak için aşağıdaki önlemleri öncelikli uygulayın; MAC filtrelemesini ise isterseniz ek bir katman olarak kullanın."
      ],
      ol: [
        "Kablosuz şifrelemeyi WPA3, desteklemiyorsa WPA2-AES olarak ayarlayın; WEP ve açık ağ kullanmayın.",
        "En az 12 karakterlik, tahmin edilmesi zor bir Wi-Fi şifresi belirleyin ve varsayılan şifreyi değiştirin. Şifre gücü için [[rehber:sifre-guvenligi-ve-guclu-sifre|güçlü şifre rehberine]] bakabilirsiniz.",
        "Modem yönetim paneli şifresini değiştirin ve uzaktan yönetimi kapatın.",
        "WPS özelliğini kullanmıyorsanız kapatın.",
        "Misafirler ve akıllı ev cihazları için ayrı bir misafir ağı açın.",
        "Modem yazılımını güncel tutun ve bağlı cihazlar listesini ara sıra kontrol edin; tanımadığınız bir MAC adresi görürseniz şifreyi değiştirin."
      ],
      note: "Başkasına ait bir ağa izinsiz erişmek ya da bir cihazın kimliğine bürünmek suç oluşturabilir. Bu bilgiler yalnızca kendi ağınızı yönetmek ve korumak içindir."
    },
    {
      h: "MAC adresi değiştirilebilir mi, kalıcı mıdır?",
      p: [
        "Ağ kartının üretimde yazılmış donanım adresi kalıcıdır. Ancak işletim sistemi ağa bu adres yerine başka bir adres gösterebilir; telefonlardaki rastgele adres özelliği bunun yasal ve yaygın örneğidir. Bu nedenle ağın gördüğü MAC adresi her zaman donanım adresi olmayabilir.",
        "Bu durumun pratik sonucu şudur: MAC adresini kimlik kanıtı ya da tek güvenlik anahtarı olarak kullanmayın. Kurumsal ağlar bu yüzden kullanıcı adı ve şifre ya da sertifikayla kimlik doğrulayan yöntemler kullanır. Ağ hizmetlerinin hangi portları kullandığını merak ediyorsanız [[bilgi:port-numaralari-80-443-22|port numaraları yazısı]] ve [[arac:port-numarasi-bul|Port Numarası Sorgulama]] aracı yardımcı olur."
      ]
    }
  ],
  faq: [
    ["MAC adresi nedir?", "MAC adresi, ağ kartı ya da Wi-Fi yongası gibi her ağ arayüzüne verilen 48 bitlik donanım kimliğidir. 12 onaltılık haneyle yazılır ve yalnızca aynı yerel ağdaki cihazların birbirini tanımasında kullanılır."],
    ["Windows, macOS ve telefonda MAC adresi nasıl bulunur?", "Windows'ta komut isteminde ipconfig /all yazıp Fiziksel Adres satırına bakın. macOS'ta Sistem Ayarları, Ağ, Wi-Fi ve Ayrıntılar yolunu izleyin. Telefonda bağlı Wi-Fi ağının ayrıntılarında ya da Telefon hakkında bölümünde görünür."],
    ["MAC adresi ile IP adresi arasındaki fark nedir?", "MAC adresi donanıma bağlı, yalnızca yerel ağda geçerli 48 bitlik kimliktir. IP adresi ise ağ tarafından verilir, ağ değiştikçe değişebilir ve verinin internet üzerinde yönlendirilmesini sağlar. MAC adresi modemde kalır, internete iletilmez."],
    ["Telefonlar neden rastgele (özel) MAC adresi kullanır?", "Sabit MAC adresi, cihazın farklı mekânlardaki Wi-Fi ağlarınca tanınıp izlenmesine imkân verir. Rastgele adres her ağa farklı görünerek bu izlemeyi zorlaştırır. Ev ağında MAC'e bağlı kurallar kullanıyorsanız o ağ için kapatılabilir."],
    ["MAC adresindeki ilk 6 hane neyi gösterir?", "İlk 6 hane, yani ilk üç bayt, IEEE'nin üreticiye atadığı OUI önekidir ve ağ kartının üreticisini gösterir. İkinci hane 2, 6, A ya da E ise adres üretici değil yerel olarak atanmış, genellikle rastgele bir adrestir."],
    ["İki nokta, tire ve noktalı yazımlar arasındaki fark nedir?", "Hepsi aynı adresi gösterir; yalnızca ayraç farklıdır. İki nokta macOS, Linux ve modemlerde, tire Windows'ta, noktalı üçlü grup kurumsal ağ cihazlarında yaygındır. Büyük ve küçük harf arasında değer farkı yoktur."],
    ["Modemde MAC filtreleme güvenli midir?", "Tek başına yeterli değildir, çünkü MAC adresleri Wi-Fi trafiğinde açıkça görünür ve bir cihazın gösterdiği adres yazılımla değiştirilebilir. Asıl koruma WPA2 ya da WPA3 şifreleme, güçlü şifre, güncel yazılım ve kapalı WPS'tir."],
    ["MAC adresi değiştirilebilir mi?", "Donanıma yazılmış adres kalıcıdır, ancak işletim sistemi ağa farklı bir adres gösterebilir; telefonlardaki rastgele adres bunun yaygın örneğidir. Bu nedenle MAC adresi kimlik kanıtı ya da tek güvenlik anahtarı olarak kullanılmamalıdır."],
    ["MAC adresimi biri öğrenirse tehlikeli olur mu?", "MAC adresi internete iletilmediği için uzaktaki biri onu genellikle göremez; yalnızca aynı yerel ağdaki cihazlar görür. Tek başına hesabınıza ya da cihazınıza erişim sağlamaz, ama ağınızı yine de güçlü şifre ve şifrelemeyle korumalısınız."]
  ],
  tools: ["mac-adresi-bicimlendir", "ip-ikili-cevir", "port-numarasi-bul"],
  related: ["ip-adresi-ve-alt-ag-maskesi-nedir", "ipv6-nedir-ipv4-farki", "port-numaralari-80-443-22"],
  sources: [
    ["IEEE Registration Authority – OUI kayıtları", "https://standards.ieee.org/products-programs/regauth/"],
    ["USOM – Ulusal Siber Olaylara Müdahale Merkezi", "https://www.usom.gov.tr/"]
  ]
};
