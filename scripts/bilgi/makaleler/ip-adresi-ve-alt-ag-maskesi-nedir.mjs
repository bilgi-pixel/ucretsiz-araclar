export default {
  slug: "ip-adresi-ve-alt-ag-maskesi-nedir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "IP Adresi ve Alt Ağ Maskesi Nedir? Subnet, CIDR ve /24 Hesaplama",
  pageTitle: "IP Adresi ve Alt Ağ Maskesi Nedir? Subnet ve CIDR Hesaplama",
  description: "Alt ağ maskesi, IP adresinin hangi bitlerinin ağı, hangilerinin cihazı gösterdiğini belirler. 255.255.255.0 = /24 = 254 cihaz. Ağ ve yayın adresi bulma örnekli.",
  keywords: ["alt ağ maskesi nedir", "subnet mask nedir", "cidr hesaplama", "/24 kaç ip", "255.255.255.0 ne demek", "ip adresi sınıfları", "ağ adresi yayın adresi bulma", "özel ip genel ip farkı", "ipv4 ipv6 farkı"],
  lead: "IP adresi, bir ağdaki cihazı tanımlayan 32 bitlik (IPv4) numaradır; <strong>alt ağ maskesi</strong> ise bu 32 bitin kaç tanesinin ağı, kaç tanesinin cihazı gösterdiğini belirler. En yaygın maske olan 255.255.255.0, CIDR gösterimiyle /24'tür: ilk 24 bit ağı, son 8 bit cihazı gösterir; ağda 256 adres bulunur ve bunların 254'ü cihazlara verilebilir. Bu sayfada IP adresinin yapısını, maskenin ikili sistemde nasıl çalıştığını, CIDR'ın nasıl okunduğunu, ağ ve yayın adresinin nasıl bulunduğunu, özel ve genel IP farkını ve IPv6'yı çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "IPv4 adresi 32 bittir ve noktayla ayrılmış dört sayıyla (her biri 0–255) yazılır: 192.168.1.130 gibi.",
    "Alt ağ maskesi ağ bitlerini 1, cihaz bitlerini 0 yapar; 255.255.255.0 ikili sistemde 24 tane 1 ve 8 tane 0'dır.",
    "CIDR gösterimi /n, maskedeki 1 sayısını verir; /n ağında 2<sup>32−n</sup> adres vardır.",
    "Kullanılabilir cihaz sayısı = 2<sup>32−n</sup> − 2; /24'te 254, /26'da 62, /30'da 2'dir.",
    "Ağ adresi = IP VE maske (bit bit); yayın adresi ağdaki son adrestir: 192.168.1.130/26 için ağ .128, yayın .191.",
    "Özel adres blokları 10.0.0.0/8, 172.16.0.0/12 ve 192.168.0.0/16'dır; bunlar internette yönlendirilmez."
  ],
  figure: {
    alt: "192.168.1.130 adresinin /26 maskesiyle ikili gösterimi: 32 bitin 26'sı ağ, 6'sı cihaz kısmı; son baytta 130 ile 192'nin bit bit VE işlemiyle ağ adresi 128'in bulunması, ağ aralığı .128 ile .191.",
    caption: "Maskedeki 1'ler ağ kısmını, 0'lar cihaz kısmını işaretler. IP ile maske bit bit VE işlemine sokulduğunda ağ adresi çıkar. /26 bloğu 64 adreslidir: ilk adres ağ, son adres yayın adresidir, aradaki 62 adres cihazlara verilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">192.168.1.130 /26 nasıl çözülür?</text>
  <g class="mid">
    <rect x="30" y="50" width="150" height="40" rx="6" class="p"/><text x="105" y="76" class="b sf">192</text>
    <rect x="190" y="50" width="150" height="40" rx="6" class="p"/><text x="265" y="76" class="b sf">168</text>
    <rect x="350" y="50" width="150" height="40" rx="6" class="p"/><text x="425" y="76" class="b sf">1</text>
    <rect x="510" y="50" width="76" height="40" rx="6" class="p"/><text x="548" y="76" class="b sf">2 bit</text>
    <rect x="590" y="50" width="100" height="40" rx="6" class="oks"/><text x="640" y="76" class="b">6 bit</text>
  </g>
  <text x="30" y="112" class="sm b p">Ağ kısmı: 26 bit</text><text x="690" y="112" class="sm b ok end">Cihaz kısmı: 6 bit</text>
  <text x="30" y="150" class="b">Son bayt üzerinde VE işlemi</text>
  <g class="lg">
    <text x="60" y="186">IP   130</text><text x="250" y="186" class="b">1 0 | 0 0 0 0 1 0</text>
    <text x="60" y="218">Maske 192</text><text x="250" y="218" class="b">1 1 | 0 0 0 0 0 0</text>
  </g>
  <line x1="60" y1="232" x2="520" y2="232" class="st" fill="none"/>
  <text x="60" y="262" class="lg b p">Ağ  128</text><text x="250" y="262" class="lg b p">1 0 | 0 0 0 0 0 0</text>
  <text x="560" y="186" class="sm t2">1 VE 1 = 1</text><text x="560" y="210" class="sm t2">diğer her durum 0</text>
  <rect x="30" y="292" width="660" height="110" rx="10" class="sf sb"/>
  <text x="50" y="320" class="b">Blok: 2^6 = 64 adres · maske 255.255.255.192</text>
  <rect x="50" y="336" width="100" height="44" rx="6" class="ps"/><text x="100" y="356" class="sm b mid">Ağ</text><text x="100" y="373" class="sm mid">.128</text>
  <rect x="160" y="336" width="380" height="44" rx="6" class="oks"/><text x="350" y="356" class="sm b mid">Cihazlar: 62 adres</text><text x="350" y="373" class="sm mid">.129 – .190</text>
  <rect x="550" y="336" width="120" height="44" rx="6" class="ps"/><text x="610" y="356" class="sm b mid">Yayın</text><text x="610" y="373" class="sm mid">.191</text>
</svg>`
  },
  sections: [
    {
      h: "IP adresi nedir?",
      p: [
        "IP (Internet Protocol) adresi, bir ağa bağlı her cihaza verilen ve veri paketlerinin doğru yere ulaşmasını sağlayan numaradır. Posta adresine benzer: bir kısmı \"hangi sokak\" (ağ), bir kısmı \"hangi kapı\" (cihaz) bilgisini taşır. Bilgisayarınız, telefonunuz, yazıcınız, akıllı televizyonunuz ve modeminiz ağda birer IP adresiyle bulunur.",
        "Bugün en yaygın kullanılan sürüm <strong>IPv4</strong>'tür. IPv4 adresi 32 bitten oluşur ve okunması kolay olsun diye 8 bitlik dört parçaya (oktet) bölünüp her parça 0 ile 255 arasında bir ondalık sayıyla yazılır: 192.168.1.130 gibi. Toplamda 2<sup>32</sup>, yani yaklaşık 4,3 milyar farklı IPv4 adresi vardır. İnternete bağlı cihaz sayısı bu rakamı çoktan aştığı için 128 bitlik <strong>IPv6</strong> geliştirilmiştir.",
        "Bir IP adresinin ikili karşılığını görmek, alt ağ hesaplarını anlamanın anahtarıdır. 192 sayısı ikili sistemde 11000000, 168 sayısı 10101000'dır. Dönüşümü [[arac:ip-ikili-cevir|IP ikili çevirici]] ile yapabilir, ikili sayıların mantığını [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazımızdan öğrenebilirsiniz."
      ]
    },
    {
      h: "Alt ağ maskesi ne işe yarar? 255.255.255.0 ne demek?",
      p: [
        "Alt ağ maskesi (subnet mask), bir IP adresinin hangi bitlerinin ağı, hangilerinin o ağdaki cihazı tanımladığını söyler. Maske de 32 bittir: ağ kısmına karşılık gelen bitler 1, cihaz kısmına karşılık gelen bitler 0'dır ve 1'ler her zaman soldan başlayıp kesintisiz devam eder.",
        "255.255.255.0 maskesi ikili sistemde 11111111.11111111.11111111.00000000 şeklindedir. İlk üç oktetin tüm bitleri 1 olduğu için ilk 24 bit ağı, son oktetin 8 biti cihazı gösterir. Yani 192.168.1.10 ve 192.168.1.200 aynı ağdadır ve birbirleriyle doğrudan konuşabilir; 192.168.2.10 ise farklı bir ağdadır ve ona ulaşmak için bir yönlendirici (router) gerekir.",
        "Cihazınız bir paketi göndermeden önce hedef adresi kendi maskesiyle karşılaştırır. Hedef aynı ağdaysa paketi doğrudan gönderir; değilse varsayılan ağ geçidine (genellikle modem) yollar. Maske yanlış girildiğinde cihaz aynı ağdaki yazıcıyı \"başka ağda\" sanabilir ya da tersi olur; ağ sorunlarının önemli bir kısmı bu nedenle yaşanır."
      ]
    },
    {
      h: "CIDR gösterimi nasıl okunur? /24, /26, /30",
      p: [
        "CIDR (Classless Inter-Domain Routing) gösterimi, maskeyi uzun uzun yazmak yerine maskedeki 1 bitlerinin sayısını eğik çizgiden sonra yazar. 192.168.1.0/24 ifadesi \"ilk 24 bit ağdır\" demektir ve 255.255.255.0 maskesiyle aynıdır. Bu gösterim, eski A, B, C sınıflarının katı sınırları yerine istenen büyüklükte ağ tanımlamayı sağlar."
      ],
      formula: "Toplam adres = 2^(32 − önek)\nKullanılabilir cihaz = 2^(32 − önek) − 2 (ağ ve yayın adresi çıkarılır)\nBlok büyüklüğü (son anlamlı oktette) = 256 − maskenin o oktetteki değeri",
      table: {
        head: ["CIDR", "Alt ağ maskesi", "Toplam adres", "Kullanılabilir cihaz", "Tipik kullanım"],
        rows: [
          ["/8", "255.0.0.0", "16.777.216", "16.777.214", "Çok büyük kurum ağları"],
          ["/16", "255.255.0.0", "65.536", "65.534", "Kampüs, büyük şirket"],
          ["/22", "255.255.252.0", "1.024", "1.022", "Orta büyüklükte ağ"],
          ["/24", "255.255.255.0", "256", "254", "Ev ve küçük ofis ağı"],
          ["/25", "255.255.255.128", "128", "126", "Ağı ikiye bölmek"],
          ["/26", "255.255.255.192", "64", "62", "Kat ya da departman"],
          ["/27", "255.255.255.224", "32", "30", "Küçük sunucu grubu"],
          ["/28", "255.255.255.240", "16", "14", "Küçük ofis, kamera ağı"],
          ["/30", "255.255.255.252", "4", "2", "İki yönlendirici arası bağlantı"],
          ["/32", "255.255.255.255", "1", "Tek adres", "Tek cihazı tanımlamak"]
        ]
      },
      after: [
        "<strong>/24 ağda kaç IP adresi vardır?</strong> 2<sup>8</sup> = 256 adres vardır. İlki (örneğin 192.168.1.0) ağ adresi, sonuncusu (192.168.1.255) yayın adresidir; cihazlara 192.168.1.1 ile 192.168.1.254 arasındaki 254 adres verilebilir. Maske ile CIDR arasında hızlı dönüşüm için [[arac:alt-ag-maskesi-cevir|alt ağ maskesi çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Ağ adresi ve yayın adresi nasıl bulunur? Çözümlü örnek",
      p: [
        "Ağ adresi, IP adresi ile maskenin bit bit VE (AND) işlemine sokulmasıyla bulunur: iki bit de 1 ise sonuç 1, diğer tüm durumlarda 0'dır. Yayın (broadcast) adresi ise ağ adresinin cihaz bitlerinin tamamı 1 yapılarak bulunur."
      ],
      ol: [
        "Adres ve önek: 192.168.1.130/26. Maske 26 bit 1'den oluşur: 255.255.255.192.",
        "İlk üç oktette maske 255 olduğu için ağ adresinin ilk üç okteti IP'yle aynıdır: 192.168.1.",
        "Son oktet: 130 = 10000010, 192 = 11000000. VE işlemi: 10000000 = 128. Ağ adresi 192.168.1.128'dir.",
        "Blok büyüklüğü 256 − 192 = 64'tür. Bu ağ 128'den başlar, 128 + 64 − 1 = 191'de biter. Yayın adresi 192.168.1.191'dir.",
        "Cihazlara verilebilecek adresler 192.168.1.129 ile 192.168.1.190 arasındaki 62 adrestir."
      ],
      after: [
        "Pratik bir kısa yol: blok büyüklüğünün katlarını yazın (0, 64, 128, 192). IP'nin son okteti hangi iki kat arasındaysa küçük olan ağ adresi, büyük olanın bir eksiği yayın adresidir. 130, 128 ile 192 arasında olduğu için ağ .128, yayın .191 bulunur.",
        "Daha büyük bloklarda hesap üçüncü oktete taşar. Örneğin 10.0.0.0/22 bloğunda maske 255.255.252.0'dır, blok büyüklüğü üçüncü oktette 256 − 252 = 4'tür; ağ 10.0.0.0 ile 10.0.3.255 arasını kapsar ve 1.022 cihaz adresi içerir. Bu hesapları [[arac:cidr-hesapla|CIDR hesaplama aracı]] ilk ve son adresi, toplam ve kullanılabilir adres sayısını göstererek yapar."
      ]
    },
    {
      h: "Özel ve genel IP farkı nedir?",
      p: [
        "İnternette doğrudan erişilebilen adreslere <strong>genel (public) IP</strong> denir ve bunlar dünya genelinde tekildir. Evinizdeki ya da ofisinizdeki cihazlar ise genellikle <strong>özel (private) IP</strong> kullanır. Özel adres blokları internette yönlendirilmez; aynı adres milyonlarca farklı ev ağında aynı anda kullanılabilir."
      ],
      table: {
        head: ["Blok", "Aralık", "Ne için kullanılır?"],
        rows: [
          ["10.0.0.0/8", "10.0.0.0 – 10.255.255.255", "Özel ağ; büyük kurum ağları"],
          ["172.16.0.0/12", "172.16.0.0 – 172.31.255.255", "Özel ağ"],
          ["192.168.0.0/16", "192.168.0.0 – 192.168.255.255", "Özel ağ; ev modemlerinde en yaygın"],
          ["127.0.0.0/8", "127.0.0.1 en bilineni", "Geri döngü (cihazın kendisi)"],
          ["169.254.0.0/16", "169.254.0.1 – 169.254.255.254", "Otomatik adres; DHCP'den adres alınamadığında"],
          ["100.64.0.0/10", "100.64.0.0 – 100.127.255.255", "Servis sağlayıcı içi paylaşılan adres (CGNAT)"]
        ]
      },
      after: [
        "Modeminiz, evdeki özel adresleri tek bir genel adresin arkasında toplar; bu işleme <strong>NAT</strong> (ağ adresi çevirisi) denir. Bilgisayarınızın ayarlarında 192.168.1.35 gibi bir adres görürken internetteki sitelerin sizi bambaşka bir adresle görmesi bundandır. Bilgisayarınızda 169.254 ile başlayan bir adres görüyorsanız cihaz modemden adres alamamış demektir; kablo ya da kablosuz bağlantıyı ve modemi kontrol edin."
      ]
    },
    {
      h: "IP adresi sınıfları: A, B ve C",
      p: [
        "CIDR'dan önce IPv4 adresleri ilk oktetlerine göre sınıflara ayrılırdı ve her sınıfın maskesi sabitti. Bugün yönlendirme sınıfsız yapılır; ancak sınıflar ders kitaplarında ve sınavlarda hâlâ sorulur."
      ],
      table: {
        head: ["Sınıf", "İlk oktet aralığı", "Varsayılan maske", "Not"],
        rows: [
          ["A", "1 – 126", "255.0.0.0 (/8)", "127 geri döngü için ayrılmıştır"],
          ["B", "128 – 191", "255.255.0.0 (/16)", ""],
          ["C", "192 – 223", "255.255.255.0 (/24)", ""],
          ["D", "224 – 239", "Yok", "Çok noktaya yayın (multicast)"],
          ["E", "240 – 255", "Yok", "Deneysel, ayrılmış"]
        ]
      }
    },
    {
      h: "IPv4 ile IPv6 farkı nedir?",
      p: [
        "IPv6 adresleri 128 bittir; bu, 2<sup>128</sup> gibi pratikte tükenmeyecek kadar büyük bir adres alanı demektir. Adresler 16 bitlik sekiz gruba ayrılır ve on altılık sistemde, iki nokta üst üsteyle yazılır: 2001:0db8:0000:0000:0000:0000:0000:0001 gibi.",
        "Bu uzun yazımı kısaltmak için kurallar vardır: her gruptaki baştaki sıfırlar atılır ve art arda gelen tamamen sıfır gruplar bir kez \"::\" ile gösterilir. Yukarıdaki adres 2001:db8::1 olarak yazılır. Kısaltma ve genişletme kurallarını uygulayan [[arac:ipv6-kisalt-genislet|IPv6 kısaltma ve genişletme aracı]] adresin türünü de gösterir.",
        "IPv6'da alt ağ mantığı aynıdır ve yine CIDR önekiyle yazılır; ancak son kullanıcı ağları için genellikle /64 bloklar kullanılır ve IPv4'teki gibi adres tasarrufu yapmak gerekmez. Ayrıca IPv6'da yayın adresi yoktur; bunun yerine çok noktaya yayın adresleri kullanılır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Ağ ve yayın adresini cihaza vermek:</strong> /24 ağda .0 ve .255 cihazlara verilmez; /26'da ise blok sınırları .64, .128 gibi farklı yerlerdedir.",
        "<strong>Maskeyi kesintili yazmak:</strong> 255.255.0.255 geçerli bir maske değildir; 1 bitleri soldan kesintisiz gelmelidir.",
        "<strong>/24'ü her yerde varsaymak:</strong> Kurumsal ağlarda farklı önekler kullanılabilir; ayarları ağ yöneticisinden alın.",
        "<strong>Kullanılabilir sayıdan 2 çıkarmayı unutmak:</strong> 2<sup>n</sup> toplam adrestir; cihaz sayısı için ağ ve yayın adresi düşülür (/31 ve /32 gibi özel durumlar hariç).",
        "<strong>Özel IP'yi dışarıdan erişilebilir sanmak:</strong> 192.168 ile başlayan bir adrese internetten doğrudan ulaşılamaz; dış erişim için modemde yönlendirme gerekir."
      ]
    },
    {
      h: "Araçlarla alt ağ hesaplama",
      ol: [
        "Adresi ve maskeyi not edin; maske ondalık yazılmışsa [[arac:alt-ag-maskesi-cevir|alt ağ maskesi çevirici]] ile CIDR önekine çevirin.",
        "[[arac:cidr-hesapla|CIDR hesaplama aracı]]na blok bilgisini yazarak ağ adresi, yayın adresi, ilk ve son kullanılabilir adresi ve toplam adres sayısını görün.",
        "Bit düzeyinde ne olduğunu görmek isterseniz [[arac:ip-ikili-cevir|IP ikili çevirici]] ile adresi ve maskeyi ikili sisteme çevirin.",
        "IPv6 adresleriyle çalışıyorsanız [[arac:ipv6-kisalt-genislet|IPv6 aracı]]yla adresleri standart biçime getirin."
      ],
      after: [
        "İnternet bağlantınızın hızıyla ilgili sorularınız için [[bilgi:internet-hizi-kac-mbps-olmali|internet hızı kaç Mbps olmalı]] yazımıza göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["IP adresi nedir?", "IP adresi, bir ağa bağlı her cihaza verilen ve veri paketlerinin doğru yere ulaşmasını sağlayan numaradır. IPv4 adresleri 32 bittir ve 192.168.1.10 gibi noktayla ayrılmış dört sayıyla yazılır."],
    ["Alt ağ maskesi ne işe yarar?", "Alt ağ maskesi, IP adresinin hangi bitlerinin ağı, hangilerinin cihazı gösterdiğini belirler. Cihaz bu bilgiyle hedefin aynı ağda olup olmadığına karar verir ve paketi doğrudan ya da ağ geçidi üzerinden gönderir."],
    ["255.255.255.0 ne anlama gelir?", "255.255.255.0, ilk 24 bitin ağı ve son 8 bitin cihazı gösterdiği maskedir; CIDR gösterimiyle /24'tür. Bu ağda 256 adres bulunur ve bunların 254'ü cihazlara verilebilir."],
    ["/24 ağda kaç IP adresi vardır?", "/24 ağda 2 üzeri 8, yani 256 adres vardır. İlk adres ağ adresi, son adres yayın adresi olduğu için cihazlara verilebilecek adres sayısı 254'tür."],
    ["CIDR gösterimi nasıl okunur?", "Eğik çizgiden sonraki sayı, maskede soldan kaç bitin 1 olduğunu gösterir. 10.0.0.0/22 ifadesi ilk 22 bitin ağı gösterdiğini, ağda 2 üzeri 10, yani 1.024 adres bulunduğunu anlatır."],
    ["Özel ve genel IP farkı nedir?", "Genel IP internette tekildir ve doğrudan erişilebilir. Özel IP'ler 10.0.0.0/8, 172.16.0.0/12 ve 192.168.0.0/16 bloklarındadır, yalnızca yerel ağda kullanılır ve modem NAT ile tek bir genel adresin arkasında toplar."],
    ["IPv4 ile IPv6 farkı nedir?", "IPv4 32 bitlik adreslerle yaklaşık 4,3 milyar adres sunar. IPv6 ise 128 bitliktir, on altılık sistemde iki nokta üst üsteyle yazılır ve adres sıkıntısını ortadan kaldıracak kadar geniş bir adres alanı sağlar."],
    ["Ağ adresi ve yayın adresi nasıl bulunur?", "Ağ adresi, IP ile maskenin bit bit VE işlemiyle bulunur. Yayın adresi, ağ adresinin cihaz bitlerinin tamamı 1 yapılarak elde edilir; örneğin 192.168.1.130/26 için ağ .128, yayın .191'dir."],
    ["/30 ağ ne için kullanılır?", "/30 ağda 4 adres vardır ve bunların yalnızca 2'si cihazlara verilebilir. Bu yüzden iki yönlendirici arasındaki noktadan noktaya bağlantılarda, adres israfını önlemek için tercih edilir."]
  ],
  tools: ["alt-ag-maskesi-cevir", "cidr-hesapla", "ip-ikili-cevir", "ipv6-kisalt-genislet"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "internet-hizi-kac-mbps-olmali", "http-durum-kodlari-404-500-nedir"],
  sources: [
    ["IETF – RFC 1918: Özel ağlar için adres ayırma", "https://www.rfc-editor.org/rfc/rfc1918"],
    ["IETF – RFC 4632: CIDR", "https://www.rfc-editor.org/rfc/rfc4632"],
    ["IETF – RFC 5952: IPv6 adreslerinin metin gösterimi", "https://www.rfc-editor.org/rfc/rfc5952"]
  ]
};
