export default {
  slug: "ipv6-nedir-ipv4-farki",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "IPv6 Nedir? IPv4 ile Farkı, Adres Kısaltma Kuralları ve CIDR Gösterimi",
  pageTitle: "IPv6 Nedir? IPv4 Farkı, :: Kısaltma Kuralı ve /64 CIDR",
  description: "IPv6, 128 bitlik ve 8 gruplu yeni nesil IP adresidir; IPv4 ise 32 bittir. :: kısaltma kuralları, /64 CIDR anlamı, adres türleri ve modemde IPv6 açma örneklerle.",
  keywords: ["ipv6 nedir", "ipv4 ipv6 farkı", "ipv6 adresi nasıl yazılır", "ipv6 kısaltma", "cidr nedir", "ipv6 açmalı mıyım", "ipv4 neden tükendi", "ip adresi ikili çevirme"],
  lead: "IPv6, internete bağlı cihazlara adres vermek için kullanılan protokolün yeni sürümüdür ve <strong>128 bitlik</strong> adreslerle çalışır; IPv4 ise yalnızca <strong>32 bit</strong> kullanır. Bu fark, IPv4'teki yaklaşık 4,3 milyar adresi IPv6'da 3,4 × 10<sup>38</sup> adrese çıkarır. IPv6 adresi iki nokta üst üste ile ayrılmış 8 onaltılık gruptan oluşur ve <code>::</code> ile kısaltılabilir. Bu sayfada iki sürümün farklarını, kısaltma kurallarını, /64 gibi CIDR gösterimlerini ve modemde IPv6 açmanın ne anlama geldiğini bulacaksınız.",
  kisaCevap: [
    "IPv4 adresi 32 bittir, 0–255 arası 4 ondalık sayıyla yazılır: 192.168.1.10; toplam 2<sup>32</sup> = 4.294.967.296 adres vardır.",
    "IPv6 adresi 128 bittir, 16 bitlik 8 onaltılık grupla yazılır: 2001:0db8:0000:0000:0000:ff00:0042:8329.",
    "Kısaltmada her gruptaki baştaki sıfırlar atılır ve art arda gelen sıfır gruplarının en uzunu bir kez :: ile yazılır: 2001:db8::ff00:42:8329.",
    ":: bir adreste yalnızca bir kez kullanılabilir; tek bir sıfır grubu için kullanılmaz.",
    "CIDR gösterimindeki /64, adresin ilk 64 bitinin ağı, kalan 64 bitin cihazı tanımladığını söyler; bir /64 ağda 2<sup>64</sup> adres bulunur.",
    "::1 kendi cihazınız (geri döngü), fe80:: ile başlayanlar yerel bağlantı, 2 ya da 3 ile başlayanlar genel internet adresleridir."
  ],
  figure: {
    alt: "IPv6 adresinin kısaltma adımları: tam yazım 2001:0db8:0000:0000:0000:ff00:0042:8329, baştaki sıfırlar atılınca 2001:db8:0:0:0:ff00:42:8329, sıfır grupları birleşince 2001:db8::ff00:42:8329. Altta 64 bit ağ öneki ve 64 bit arayüz kimliği bölümü ile IPv4'ün 32 bitlik uzunluğu karşılaştırılıyor.",
    caption: "Üstte aynı adresin üç yazımı yer alıyor; üçü de aynı 128 biti gösterir. Altta tipik bir /64 adresin iki yarısı ve IPv4 adresinin dört kat daha kısa olan 32 bitlik uzunluğu görülüyor.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">IPv6 adresi nasıl kısaltılır?</text>
  <text x="20" y="66" class="sm b mu">1. Tam yazım (8 grup × 4 onaltılık rakam)</text>
  <g class="mid b">
    <rect x="20" y="76" width="80" height="36" rx="5" class="sf sb"/><text x="60" y="100">2001</text>
    <rect x="106" y="76" width="80" height="36" rx="5" class="sf sb"/><text x="146" y="100">0db8</text>
    <rect x="192" y="76" width="80" height="36" rx="5" class="dgs"/><text x="232" y="100">0000</text>
    <rect x="278" y="76" width="80" height="36" rx="5" class="dgs"/><text x="318" y="100">0000</text>
    <rect x="364" y="76" width="80" height="36" rx="5" class="dgs"/><text x="404" y="100">0000</text>
    <rect x="450" y="76" width="80" height="36" rx="5" class="sf sb"/><text x="490" y="100">ff00</text>
    <rect x="536" y="76" width="80" height="36" rx="5" class="sf sb"/><text x="576" y="100">0042</text>
    <rect x="622" y="76" width="80" height="36" rx="5" class="sf sb"/><text x="662" y="100">8329</text>
  </g>
  <text x="20" y="146" class="sm b mu">2. Baştaki sıfırları atın</text>
  <text x="20" y="172" class="lg">2001:db8:0:0:0:ff00:42:8329</text>
  <text x="20" y="206" class="sm b mu">3. En uzun sıfır dizisini bir kez :: yapın</text>
  <rect x="20" y="214" width="330" height="40" rx="6" class="p"/>
  <text x="34" y="241" class="lg b sf">2001:db8::ff00:42:8329</text>
  <text x="366" y="241" class="sm t2">:: = burada 3 sıfır grubu var</text>
  <line x1="20" y1="274" x2="700" y2="274" class="sb dash" fill="none"/>
  <text x="20" y="302" class="b">Tipik /64 adres: iki eşit yarı</text>
  <rect x="20" y="314" width="340" height="38" rx="6" class="ps"/>
  <rect x="360" y="314" width="340" height="38" rx="6" class="oks"/>
  <text x="190" y="338" class="sm mid b">64 bit ağ öneki (sağlayıcı + alt ağ)</text>
  <text x="530" y="338" class="sm mid b">64 bit arayüz kimliği (cihaz)</text>
  <text x="20" y="384" class="b">IPv4 adresi aynı ölçekte</text>
  <rect x="20" y="394" width="170" height="28" rx="6" class="a"/>
  <text x="200" y="414" class="sm">32 bit · 192.168.1.10 · IPv6'nın dörtte biri uzunlukta</text>
</svg>`
  },
  sections: [
    {
      h: "IP adresi nedir, IPv6 neden geliştirildi?",
      p: [
        "İnternete bağlanan her cihazın, verilerin doğru yere ulaşması için bir adrese ihtiyacı vardır. Bu adres IP (Internet Protocol) adresidir. 1980'lerin başında tasarlanan <strong>IPv4</strong>, 32 bitlik adresler kullanır ve en fazla 2<sup>32</sup> = 4.294.967.296 adres tanımlayabilir. O yıllarda bu sayı yeterli görünüyordu; ancak akıllı telefonlar, modemler, televizyonlar, güvenlik kameraları ve sensörlerle birlikte cihaz sayısı dünya nüfusunu çoktan aştı.",
        "<strong>IPv6</strong>, bu darlığı kalıcı olarak çözmek için 1990'ların sonunda standartlaştırıldı. 128 bitlik adres alanı yaklaşık 3,4 × 10<sup>38</sup> adres sunar; bu sayı o kadar büyüktür ki dünyadaki her insana trilyonlarca kez trilyon adres düşer. IPv6 yalnızca daha uzun bir adres değildir; başlık yapısını sadeleştirir, cihazların kendi adresini otomatik yapılandırmasını (SLAAC) kolaylaştırır ve adres paylaşımına (NAT) duyulan ihtiyacı ortadan kaldırır."
      ]
    },
    {
      h: "IPv4 adresleri neden tükendi?",
      p: [
        "IPv4 adresleri, dünya genelinde dağıtımı yöneten kurum (IANA) tarafından bölgesel kayıt kuruluşlarına bloklar hâlinde verilir. IANA elindeki son büyük blokları 2011'de dağıttı; Türkiye'nin de bağlı olduğu Avrupa, Orta Doğu ve Orta Asya bölgesinin kayıt kuruluşu RIPE NCC ise 2019 sonunda serbest IPv4 havuzunun bittiğini duyurdu. Bugün yeni IPv4 adresi ancak geri dönen bloklardan ya da ikinci el piyasadan edinilebiliyor.",
        "Tükenmeye rağmen IPv4'ün hâlâ çalışmasının nedeni <strong>NAT</strong> (ağ adresi çevirisi) tekniğidir. Evinizdeki modem tek bir genel IPv4 adresini alır ve evdeki tüm cihazlara 192.168.x.x gibi özel adresler dağıtır. Birçok mobil ve sabit hat sağlayıcısı ise bunun bir üst katmanını uygular: yüzlerce aboneyi tek bir genel adresin arkasında toplar (CGNAT). Bu çözüm iş görür ama uzaktan kamera izleme, oyun sunucusu ya da port yönlendirme gibi gelen bağlantı gerektiren işleri zorlaştırır."
      ]
    },
    {
      h: "IPv4 ile IPv6 arasındaki farklar",
      table: {
        head: ["Özellik", "IPv4", "IPv6"],
        rows: [
          ["Adres uzunluğu", "32 bit", "128 bit"],
          ["Yazım", "4 ondalık sayı, noktayla: 192.168.1.10", "8 onaltılık grup, iki nokta üst üsteyle"],
          ["Toplam adres", "yaklaşık 4,3 milyar", "yaklaşık 3,4 × 10<sup>38</sup>"],
          ["Başlık boyutu", "20–60 bayt, değişken", "40 bayt, sabit"],
          ["Adres yapılandırma", "Elle ya da DHCP", "Otomatik (SLAAC), DHCPv6 ya da elle"],
          ["Yayın (broadcast)", "Var", "Yok; çok noktaya yayın kullanılır"],
          ["NAT ihtiyacı", "Yaygın", "Gerekmez; her cihaz genel adres alabilir"],
          ["Ev ağı tipik alt ağı", "/24 (256 adres)", "/64 (2<sup>64</sup> adres)"]
        ],
        caption: "İki protokol birbirini doğrudan anlamaz. Bugün çoğu ağ \"çift yığın\" çalışır: cihaz hem IPv4 hem IPv6 adresi alır ve karşı taraf destekliyorsa IPv6'yı tercih eder."
      }
    },
    {
      h: "IPv6 adresi nasıl yazılır ve kısaltılır?",
      p: [
        "Bir IPv6 adresi 16 bitlik 8 gruptan oluşur; her grup dört onaltılık rakamla (0–9, a–f) yazılır ve gruplar iki nokta üst üste ile ayrılır. Tam yazım uzun ve okunması zor olduğu için standartlar (RFC 4291 ve önerilen metin gösterimini tanımlayan RFC 5952) iki kısaltma kuralı tanımlar."
      ],
      ol: [
        "<strong>Baştaki sıfırları atın:</strong> Her grubun başındaki sıfırlar yazılmaz. <code>0db8</code> → <code>db8</code>, <code>0042</code> → <code>42</code>, <code>0000</code> → <code>0</code>.",
        "<strong>Sıfır gruplarını birleştirin:</strong> Art arda gelen, tamamı sıfır olan grupların yerine bir kez <code>::</code> yazılır. Birden fazla sıfır dizisi varsa en uzunu kısaltılır; uzunlukları eşitse soldaki tercih edilir.",
        "<strong>Tek grubu kısaltmayın:</strong> Önerilen gösterimde yalnızca bir sıfır grubu için :: kullanılmaz; <code>2001:db8:0:1:1:1:1:1</code> olduğu gibi kalır.",
        "<strong>Küçük harf kullanın:</strong> <code>FF00</code> ile <code>ff00</code> aynıdır ama standart gösterim küçük harftir."
      ],
      table: {
        head: ["Tam yazım", "Kısa yazım"],
        rows: [
          ["2001:0db8:0000:0000:0000:ff00:0042:8329", "2001:db8::ff00:42:8329"],
          ["fe80:0000:0000:0000:0a1b:2cff:fe3d:4e5f", "fe80::a1b:2cff:fe3d:4e5f"],
          ["2001:0db8:0000:0001:0000:0000:0000:0001", "2001:db8:0:1::1"],
          ["0000:0000:0000:0000:0000:0000:0000:0001", "::1"],
          ["0000:0000:0000:0000:0000:0000:0000:0000", "::"]
        ],
        caption: "Üçüncü satırda iki sıfır dizisi var (tek grup ve üç grup); daha uzun olan üçlü dizi :: ile kısaltılır."
      }
    },
    {
      h: "IPv6'da :: ne anlama gelir?",
      p: [
        "Çift iki nokta (<code>::</code>), \"burada bir ya da daha fazla sıfır grubu var, toplamı 8 gruba tamamlayacak kadar\" demektir. Okuyan program kaç grup eksik olduğunu, adreste görünen grupları sayarak bulur. <code>2001:db8::ff00:42:8329</code> adresinde görünen 5 grup vardır; demek ki :: yerine 8 − 5 = 3 sıfır grubu gelir.",
        "Bu yüzden :: bir adreste yalnızca bir kez kullanılabilir. <code>2001::1::2</code> yazımı geçersizdir, çünkü eksik gruplardan kaçının hangi tarafa ait olduğu belirsiz kalır. Bir adresin doğru kısaltılıp kısaltılmadığından emin değilseniz [[arac:ipv6-kisalt-genislet|IPv6 Adresi Kısaltma ve Genişletme]] aracıyla standart kısa biçime indirebilir ya da 8 grubun tamamını görebilirsiniz; araç adresin türünü de söyler."
      ]
    },
    {
      h: "CIDR gösterimi (/64) ne demek?",
      p: [
        "CIDR (sınıfsız alanlar arası yönlendirme) gösteriminde adresin sonuna eğik çizgi ve bir sayı eklenir. Bu sayı, adresin soldan kaç bitinin <strong>ağ önekini</strong> oluşturduğunu söyler; kalan bitler o ağ içindeki cihazlara ayrılır. Aynı mantık iki protokolde de geçerlidir."
      ],
      formula: "Ağdaki adres sayısı = 2^(toplam bit − önek uzunluğu)\nIPv4 /24 → 2^(32 − 24) = 256 adres (254 kullanılabilir cihaz)\nIPv6 /64 → 2^(128 − 64) ≈ 1,8 × 10^19 adres\nIPv6 /56 → 2^(64 − 56) = 256 adet /64 alt ağ",
      after: [
        "IPv6'da bir yerel ağ neredeyse her zaman <strong>/64</strong> olarak tasarlanır; cihazların otomatik adres alması bu uzunluğa dayanır. İnternet sağlayıcıları ev ve işyerlerine genellikle /56 ya da /48 önek verir. /56 önek 256 ayrı /64 alt ağ, /48 önek ise 65.536 alt ağ oluşturmaya yeter. Bu sayede misafir ağı, kamera ağı, ofis ağı gibi bölümleri adres sıkıntısı çekmeden ayırabilirsiniz.",
        "IPv4 tarafında bir bloğun ilk ve son adresini, ağ maskesini ve yayın adresini [[arac:cidr-hesapla|CIDR Aralığı Hesaplama]] aracıyla bulabilirsiniz. Alt ağ maskesinin mantığı ve 255.255.255.0 gibi maskelerin /24 ile ilişkisi [[bilgi:ip-adresi-ve-alt-ag-maskesi-nedir|IP adresi ve alt ağ maskesi]] yazısında ayrıntılı anlatılıyor."
      ]
    },
    {
      h: "IPv6 adres türleri: hangi önek ne anlama gelir?",
      table: {
        head: ["Önek", "Tür", "Açıklama"],
        rows: [
          ["::1/128", "Geri döngü", "Cihazın kendisi; IPv4'teki 127.0.0.1'in karşılığı"],
          ["fe80::/10", "Yerel bağlantı (link-local)", "Yalnızca aynı ağ parçasında geçerli; her arayüzde otomatik oluşur"],
          ["fc00::/7 (pratikte fd00::/8)", "Benzersiz yerel adres (ULA)", "İnternete çıkmayan iç ağlar; IPv4'teki 192.168.x.x'e benzer"],
          ["2000::/3", "Genel tekil adres", "İnternette yönlendirilen gerçek adresler; 2 ya da 3 ile başlar"],
          ["ff00::/8", "Çok noktaya yayın", "Bir gruba aynı anda gönderim"],
          ["2001:db8::/32", "Belgeleme", "Yalnızca örneklerde kullanılır, gerçek ağda yoktur"]
        ]
      },
      after: [
        "Bir cihazın ağ ayarlarına baktığınızda genellikle birden çok IPv6 adresi görürsünüz: fe80 ile başlayan yerel bağlantı adresi, sağlayıcının verdiği genel adres ve gizlilik için zaman zaman değişen geçici adresler. Bu normaldir; IPv6'da bir arayüzün aynı anda birden fazla adresi olması tasarımın parçasıdır."
      ]
    },
    {
      h: "Modemde IPv6 açılmalı mı?",
      p: [
        "İnternet sağlayıcınız IPv6 hizmeti veriyorsa modemde IPv6'yı açmak genellikle faydalıdır. IPv6 destekleyen sitelere ve servislere NAT katmanı olmadan, doğrudan bağlanırsınız; bu bazı oyunlarda, görüntülü görüşmelerde ve uzaktan erişimde daha kararlı bağlantı sağlayabilir. Sağlayıcı IPv6 desteklemiyorsa seçeneği açmak bir şeyi bozmaz ama bir fayda da sağlamaz.",
        "Güvenlik tarafında bilinmesi gereken nokta şudur: IPv4'te NAT, dışarıdan gelen istenmeyen bağlantıları dolaylı olarak engelliyordu. IPv6'da her cihaz genel bir adres alabildiği için bu koruma güvenlik duvarına devredilir. Modeminizin IPv6 güvenlik duvarının açık olduğunu ve dışarıdan gelen bağlantılara varsayılan olarak izin vermediğini kontrol edin. Bazı eski cihazlarda ya da kurumsal VPN'lerde sorun yaşarsanız IPv6'yı geçici olarak kapatıp sağlayıcınızla görüşmek mantıklı bir sınamadır."
      ]
    },
    {
      h: "IP adresi ikili sayıya nasıl çevrilir?",
      p: [
        "IPv4 adresindeki her sayı bir okteti, yani 8 biti gösterir. Her okteti ayrı ayrı 8 haneli ikili sayıya çevirip yan yana yazdığınızda 32 bitlik adresi elde edersiniz. Örneğin 192.168.1.10 adresi şöyle çevrilir: 192 = 11000000, 168 = 10101000, 1 = 00000001, 10 = 00001010. Sonuç 11000000.10101000.00000001.00001010'dur.",
        "IPv6'da her onaltılık rakam doğrudan 4 bite karşılık gelir; <code>db8</code> grubu önce <code>0db8</code> olarak tamamlanır, sonra 0000 1101 1011 1000 diye yazılır. Alt ağ hesaplarında ağ önekinin nerede bittiğini görmek için ikili gösterim en anlaşılır yöntemdir. IPv4 adreslerini oktet oktet çevirmek için [[arac:ip-ikili-cevir|IP Adresini İkili Sayıya Çevirme]] aracını, çevirinin mantığı için [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısını kullanabilirsiniz."
      ]
    }
  ],
  faq: [
    ["IPv6 nedir?", "IPv6, internet protokolünün 128 bitlik adresler kullanan yeni sürümüdür. Yaklaşık 3,4 × 10^38 adres sunarak IPv4'teki adres darlığını kalıcı olarak çözer ve adresler iki nokta üst üsteyle ayrılmış 8 onaltılık grupla yazılır."],
    ["IPv4 ile IPv6 arasındaki fark nedir?", "IPv4 32 bitlik, noktayla ayrılmış dört ondalık sayıdan oluşan adresler kullanır ve yaklaşık 4,3 milyar adres sunar. IPv6 128 bitliktir, onaltılık yazılır, NAT gerektirmez, sabit 40 baytlık başlık kullanır ve otomatik adres yapılandırmasını destekler."],
    ["IPv6 adresi nasıl kısaltılır?", "Önce her gruptaki baştaki sıfırlar atılır. Ardından tamamı sıfır olan art arda grupların en uzun dizisi bir kez :: ile değiştirilir. Örneğin 2001:0db8:0000:0000:0000:ff00:0042:8329 adresi 2001:db8::ff00:42:8329 olarak yazılır."],
    ["IPv6'da :: ne anlama gelir?", ":: işareti, adresi 8 gruba tamamlayacak kadar sıfır grubunun yerini tutar. Görünen grup sayısı 8'den çıkarılarak kaç grubun gizlendiği bulunur. Belirsizlik olmaması için bir adreste yalnızca bir kez kullanılabilir."],
    ["CIDR gösterimi (/64) ne demek?", "Eğik çizgiden sonraki sayı, adresin soldan kaç bitinin ağ önekine ait olduğunu gösterir. /64, ilk 64 bitin ağı, son 64 bitin cihazı tanımladığı anlamına gelir. Böyle bir ağda 2^64, yani yaklaşık 18,4 kentilyon adres bulunur."],
    ["Modemde IPv6 açılmalı mı?", "İnternet sağlayıcınız IPv6 destekliyorsa açmak genellikle faydalıdır; IPv6 destekli servislere NAT olmadan bağlanırsınız. Açtığınızda modemin IPv6 güvenlik duvarının etkin olduğunu ve dışarıdan gelen bağlantıları varsayılan olarak engellediğini kontrol edin."],
    ["IPv4 adresleri neden tükendi?", "IPv4 yalnızca yaklaşık 4,3 milyar adres tanımlayabilir ve internete bağlı cihaz sayısı bunu çoktan aştı. Küresel dağıtım kurumu son bloklarını 2011'de dağıttı, Avrupa ve Orta Doğu bölgesinin kayıt kuruluşunun serbest havuzu da 2019 sonunda bitti."],
    ["IP adresi ikili sayıya nasıl çevrilir?", "IPv4 adresinin her sayısı 8 haneli ikili sayıya çevrilir ve dört oktet yan yana yazılır. 192.168.1.10 adresi 11000000.10101000.00000001.00001010 olur. IPv6'da ise her onaltılık rakam doğrudan 4 bitlik ikili gruba karşılık gelir."],
    ["::1 adresi neyi gösterir?", "::1, IPv6'daki geri döngü adresidir ve cihazın kendisini gösterir. IPv4'teki 127.0.0.1 adresinin karşılığıdır; yerel olarak çalışan bir programa ağ üzerinden bağlanmak ya da ağ yığınını sınamak için kullanılır."]
  ],
  tools: ["ipv6-kisalt-genislet", "ip-ikili-cevir", "cidr-hesapla"],
  related: ["ip-adresi-ve-alt-ag-maskesi-nedir", "ikilik-sayi-sistemi-nasil-cevrilir", "internet-hizi-kac-mbps-olmali"],
  sources: [
    ["IETF – RFC 4291: IPv6 Adresleme Mimarisi", "https://www.rfc-editor.org/rfc/rfc4291"],
    ["IETF – RFC 5952: IPv6 adreslerinin metin gösterimi", "https://www.rfc-editor.org/rfc/rfc5952"],
    ["RIPE NCC – IPv4 ve IPv6 adres dağıtımı", "https://www.ripe.net/"]
  ]
};
