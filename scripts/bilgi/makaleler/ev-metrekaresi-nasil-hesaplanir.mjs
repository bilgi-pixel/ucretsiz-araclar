export default {
  slug: "ev-metrekaresi-nasil-hesaplanir",
  kategori: "ev",
  tarih: "2026-11-15",
  title: "Ev Metrekaresi Nasıl Hesaplanır? Brüt, Net ve Brüt Ortak Alan Farkı",
  pageTitle: "Ev Metrekaresi Nasıl Hesaplanır? Brüt ve Net Metrekare Farkı",
  description: "Net metrekare odaların iç ölçüleriyle, brüt metrekare duvarlar dahil bulunur. Brüt ortak alan, tapudaki alan, balkon ve metrekare fiyatı örnekli anlatım.",
  keywords: ["ev metrekaresi nasıl hesaplanır", "brüt net metrekare farkı", "net metrekare nasıl ölçülür", "brüt ortak alan nedir", "metrekare hesaplama", "tapudaki metrekare", "balkon metrekareye dahil mi", "metrekare fiyatı hesaplama"],
  lead: "Ev metrekaresi, her odanın iç ölçüleri (en × boy) çarpılıp toplanarak <strong>net</strong> olarak, duvar ve kolonların kapladığı alan da eklenerek <strong>brüt</strong> olarak hesaplanır. Net alan evin içinde gerçekten kullanabildiğiniz zemindir; brüt alan bağımsız bölümün duvarlarıyla birlikte kapladığı alandır; brüt ortak alan ise buna merdiven, asansör boşluğu ve giriş holü gibi ortak yerlerden düşen payın eklenmiş hâlidir. Bu sayfada üç kavramın farkını, net alanı kendiniz nasıl ölçeceğinizi, tapuda ne yazdığını ve metrekare fiyatını doğru karşılaştırmayı örneklerle bulacaksınız.",
  kisaCevap: [
    "Net metrekare = odaların duvar iç yüzleri arasında ölçülen alanlarının toplamıdır.",
    "Brüt metrekare = net alan + iç ve dış duvarların, kolonların ve tesisat boşluklarının kapladığı alandır.",
    "Brüt ortak alan (genel brüt) = brüt alan + binanın ortak yerlerinden daireye düşen paydır.",
    "Uygulamada net alan çoğu zaman brüt alanın yaklaşık %75–85'i kadar çıkar; oran projeye göre değişir.",
    "Kat mülkiyetli tapudaki yüzölçümü dairenin değil, binanın oturduğu parselin alanıdır.",
    "Metrekare fiyatı = toplam fiyat ÷ alan; karşılaştırırken her ilanda aynı alan türünü kullanın."
  ],
  figure: {
    alt: "Bir dairenin oda oda net alanlarını gösteren kat planı ve yanında net 79,67 metrekare, brüt 100 metrekare ve brüt ortak alanlı 112 metrekarenin iç içe kutularla karşılaştırması.",
    caption: "Soldaki örnek planda odaların iç ölçüleri toplanarak net alan 79,67 m² bulunur. Sağdaki iç içe kutular aynı dairenin üç farklı metrekaresini gösterir; brüt ve brüt ortak alan değerleri örnektir ve projeden okunur.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="28" class="b mid">Örnek plan (iç ölçüler, m)</text>
  <rect x="20" y="44" width="360" height="300" class="sf sb"/>
  <rect x="20" y="44" width="180" height="126" class="ps"/>
  <text x="110" y="100" class="b mid">Salon</text><text x="110" y="120" class="sm mid">6,0 × 4,2 = 25,20</text>
  <rect x="200" y="44" width="180" height="126" class="sf sb"/>
  <text x="290" y="100" class="b mid">Yatak 1</text><text x="290" y="120" class="sm mid">4,2 × 3,6 = 15,12</text>
  <rect x="20" y="170" width="360" height="40" class="sf sb"/>
  <text x="200" y="195" class="sm mid">Koridor 6,5 × 1,4 = 9,10</text>
  <rect x="20" y="210" width="130" height="134" class="sf sb"/>
  <text x="85" y="268" class="b mid">Mutfak</text><text x="85" y="288" class="sm mid">3,8 × 3,0</text><text x="85" y="306" class="sm mid">= 11,40</text>
  <rect x="150" y="210" width="120" height="134" class="sf sb"/>
  <text x="210" y="268" class="b mid">Yatak 2</text><text x="210" y="288" class="sm mid">3,6 × 3,2</text><text x="210" y="306" class="sm mid">= 11,52</text>
  <rect x="270" y="210" width="110" height="84" class="sf sb"/>
  <text x="325" y="246" class="sm mid b">Banyo</text><text x="325" y="264" class="sm mid">2,5 × 2,1 = 5,25</text>
  <rect x="270" y="294" width="110" height="50" class="sf sb"/>
  <text x="325" y="324" class="sm mid">WC 2,08</text>
  <text x="20" y="372" class="sm">Toplam net alan:</text>
  <text x="20" y="398" class="lg b p">79,67 m²</text>
  <rect x="420" y="44" width="280" height="300" rx="8" class="sf sb"/>
  <text x="560" y="70" class="b mid">Brüt ortak alanlı ≈ 112 m²</text>
  <rect x="440" y="84" width="240" height="244" rx="8" class="ps"/>
  <text x="560" y="110" class="b mid">Brüt ≈ 100 m²</text>
  <rect x="464" y="124" width="192" height="186" rx="8" class="p"/>
  <text x="560" y="210" class="lg b mid sf">Net</text>
  <text x="560" y="236" class="lg b mid sf">79,67 m²</text>
  <text x="420" y="372" class="sm">Net ÷ brüt = 79,67 ÷ 100 ≈ %80</text>
  <text x="420" y="396" class="sm t2">Ortak pay: merdiven, asansör, hol, sığınak</text>
</svg>`
  },
  sections: [
    {
      h: "Net, brüt ve brüt ortak alan ne demek?",
      p: [
        "Bir dairenin alanını anlatırken üç farklı metrekare kullanılır ve aralarındaki fark 30 m²'yi bulabilir. İlanlarda, satış sözleşmelerinde, kira anlaşmalarında ve projelerde hangisinin kastedildiğini bilmek, hem fiyatı doğru değerlendirmek hem de sonradan yaşanacak anlaşmazlıkları önlemek için önemlidir."
      ],
      table: {
        head: ["Kavram", "Neyi kapsar?", "Nerede karşınıza çıkar?"],
        rows: [
          ["Net alan", "Odaların duvar iç yüzleri arasındaki zemin alanı; duvar, kolon ve tesisat boşlukları hariç", "Kullanım alanı, kira ve eşya planlaması, döşeme malzemesi hesabı"],
          ["Brüt alan", "Net alan + dairenin iç duvarları, dış duvarları, kolonları ve kendi tesisat boşlukları", "Satış ilanları, mimari proje alan tabloları"],
          ["Brüt ortak alan", "Brüt alan + merdiven, asansör boşluğu, giriş holü, sığınak gibi ortak yerlerden düşen pay", "Yeni projelerin satış tabloları, \"genel brüt\" ifadesi"]
        ]
      },
      after: [
        "Komşu dairelerle paylaşılan ortak duvarların brüt alana nasıl katılacağı, balkonların ve teraslardaki alanların nasıl sayılacağı gibi ayrıntılar projeden projeye farklı ele alınabilir. Bu yüzden ilanda ya da sözleşmede yalnızca \"120 m²\" yazması yeterli değildir; hangi alanın kastedildiği yazılı olarak belirtilmelidir."
      ]
    },
    {
      h: "Net metrekare nasıl ölçülür? Adım adım",
      p: [
        "Net alanı bir şerit metre ya da lazer metreyle kendiniz ölçebilirsiniz. Ölçümü süpürgelik hizasında, duvardan duvara yapın; kapı eşiklerini ve dolapların arkasını ayrıca düşünün."
      ],
      ol: [
        "Her odanın enini ve boyunu duvar iç yüzlerinden ölçün. Ölçüleri metre cinsinden, iki ondalıkla yazın: 4,23 m gibi.",
        "Dikdörtgen odalarda en ile boyu çarpın: salon 6,0 × 4,2 = 25,20 m².",
        "L biçimli ya da girintili odaları iki ya da üç dikdörtgene bölüp her birini ayrı hesaplayın ve toplayın.",
        "Koridor, antre, banyo, WC ve kilerleri unutmayın; bunlar küçük görünse de toplamda 15–20 m²'yi bulabilir.",
        "Tüm odaları toplayın. Örnek planda 25,20 + 15,12 + 11,52 + 11,40 + 5,25 + 2,08 + 9,10 = 79,67 m² net alan bulunur.",
        "Balkonları ayrı bir satırda tutun; açık balkonun net alana katılıp katılmadığı ilan ve sözleşmeye göre değişir."
      ],
      after: [
        "Düzensiz biçimli odalar ve L planlar için [[arac:metrekare-hesapla|metrekare hesaplama aracı]] dikdörtgen, L şekli, üçgen ve köşe koordinatlarıyla alan hesabı yapar. Daire, yamuk gibi diğer şekiller için [[arac:alan-cevre-hesapla|alan ve çevre hesaplama aracı]]nı kullanabilirsiniz; şekillerin formülleri [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazımızda topluca anlatılır."
      ]
    },
    {
      h: "Brüt metrekareye neler dahildir?",
      p: [
        "Brüt alan, dairenin dış sınırları içinde kalan her şeyi kapsar: odaların net alanları, odaları ayıran iç duvarlar, dışarıya bakan duvarlar, kolonlar ve daireye ait baca ya da tesisat boşlukları. Komşu daireyle ortak duvarlarda genellikle duvarın yarısı her iki daireye ayrılır.",
        "Örnek plandaki daire için düşünelim: odaların toplam net alanı 79,67 m²'dir. Dairenin içinde toplam 30 metre uzunluğunda 10 cm kalınlığında iç duvar varsa bu duvarlar yaklaşık 30 × 0,10 = 3 m² yer kaplar. Dış duvarlar 38 metre çevre boyunca 25 cm kalınlıktaysa yaklaşık 38 × 0,25 = 9,5 m² eder. Kolonlar, baca ve tesisat boşlukları da birkaç metrekare ekler. Balkonla birlikte toplam, projede yazan 100 m² brüt alana yaklaşır.",
        "Brüt alan çoğunlukla onaylı mimari projenin alan tablosunda yer alır ve elle ölçmek zordur, çünkü duvarların kalınlığını ve dış yüzünü ölçmeniz gerekir. Yaklaşık bir tahmin için dairenin dış ölçülerini (dış duvar dış yüzünden) çarpabilirsiniz. Kalın dış duvarlı, çok kolonlu ya da mantolamalı binalarda brüt ile net arasındaki fark büyür."
      ]
    },
    {
      h: "Brüt-net oranı genelde yüzde kaç?",
      p: [
        "Net alanın brüt alana oranı, daire planına ve yapı sistemine bağlıdır. Uygulamada konutlarda net alan çoğu zaman brütün yaklaşık %75–85'i kadardır; küçük dairelerde duvar oranı yüksek olduğu için oran düşebilir. Brüt ortak alan kullanılan yeni projelerde ise net alan genel brütün daha küçük bir kısmına karşılık gelebilir."
      ],
      table: {
        head: ["Brüt alan (örnek)", "Net oran %75", "Net oran %80", "Net oran %85"],
        rows: [
          ["80 m²", "60 m²", "64 m²", "68 m²"],
          ["100 m²", "75 m²", "80 m²", "85 m²"],
          ["120 m²", "90 m²", "96 m²", "102 m²"],
          ["150 m²", "112,5 m²", "120 m²", "127,5 m²"]
        ],
        caption: "Tablo yalnızca oranın etkisini gösterir; gerçek net alan ölçülerek ya da projeden okunarak bulunmalıdır."
      },
      after: [
        "İlanda yalnızca brüt alan yazıyorsa bu tabloyla kabaca bir net alan aralığı tahmin edebilirsiniz. Ancak karar vermeden önce dairenin net alanını yerinde ölçmek ya da projeden öğrenmek her zaman daha güvenlidir."
      ]
    },
    {
      h: "Tapudaki metrekare brüt mü net mi?",
      p: [
        "Kat mülkiyeti kurulmuş bir dairenin tapu senedinde yazan <strong>yüzölçümü</strong>, çoğu zaman dairenin değil, binanın üzerinde bulunduğu parselin (arsanın) alanıdır. Tapuda daireyi gösteren asıl bilgi ise bağımsız bölüm numarası ve <strong>arsa payı</strong>dır. Arsa payı, dairenin ana taşınmazdaki ortak mülkiyet payını gösterir; dairenin kullanım alanıyla doğrudan aynı şey değildir.",
        "Bu yüzden tapudaki yüzölçümünü daire alanı sanmak yaygın bir hatadır. Dairenin brüt ve net alanını öğrenmek için belediyedeki onaylı mimari projeye, yapı kullanma izin belgesindeki bilgilere ya da ekspertiz raporuna bakılır. Satın alma öncesinde bu belgelerdeki alan ile ilandaki alanı karşılaştırmanız ve gerekirse ölçüm yaptırmanız önerilir.",
        "Tarla, arsa ve bahçe gibi kat mülkiyeti olmayan taşınmazlarda ise tapudaki yüzölçümü doğrudan parselin alanıdır ve metrekare cinsinden yazılır. Bu alanın dönüm, hektar gibi birimlerle karşılığı için [[bilgi:1-donum-kac-metrekare|1 dönüm kaç metrekare]] yazımıza bakabilirsiniz. Tapu masrafları içinse [[rehber:tapu-harci-ve-emlak-masraflari|tapu harcı ve emlak masrafları rehberi]] yol gösterir."
      ]
    },
    {
      h: "Balkon metrekareye dahil mi?",
      p: [
        "Balkonlar brüt alana genellikle dahildir; net alana dahil edilip edilmediği ise ilan veren kişiye ve projenin alan tablosuna göre değişir. Kapalı (camlı) balkonlar çoğu zaman yaşam alanı gibi değerlendirilirken açık balkonlar ve teraslar ayrı belirtilebilir.",
        "Karşılaştırma yaparken \"net 90 m², 8 m² balkon\" gibi ayrık yazılmış ilanları tercih edin ya da ilan sahibine balkonun hangi alana dahil olduğunu sorun. Kira ve satış sözleşmelerinde de balkon, teras ve bahçe kullanım alanlarının ayrıca yazılması anlaşmazlıkları önler."
      ]
    },
    {
      h: "Metrekare fiyatı nasıl hesaplanır?",
      formula: "Metrekare fiyatı = toplam fiyat ÷ alan (m²)\nAlan türü (net, brüt ya da brüt ortak) her ilanda aynı seçilmelidir.",
      p: [
        "Örnek tutarlarla düşünelim: 4.500.000 TL'ye satılan bir dairenin net alanı 79,67 m², brüt alanı 100 m², brüt ortak alanı 112 m² olsun."
      ],
      table: {
        head: ["Hesapta kullanılan alan", "Hesap", "Metrekare fiyatı (örnek)"],
        rows: [
          ["Net 79,67 m²", "4.500.000 ÷ 79,67", "56.483 TL/m²"],
          ["Brüt 100 m²", "4.500.000 ÷ 100", "45.000 TL/m²"],
          ["Brüt ortak 112 m²", "4.500.000 ÷ 112", "40.179 TL/m²"]
        ],
        caption: "Tutarlar örnektir. Aynı daire, seçilen alan türüne göre yüzde 40'a varan farklı metrekare fiyatı gösterebilir."
      },
      after: [
        "Tablo, alan türünü karıştırmanın ne kadar yanıltıcı olabileceğini gösterir. Bir ilanın net, diğerinin brüt alan üzerinden metrekare fiyatını karşılaştırırsanız pahalı olanı ucuz sanabilirsiniz. [[arac:metrekare-fiyati-hesapla|Metrekare fiyatı hesaplama aracı]] brüt ve net birim fiyatı birlikte verir ve bölge ortalamasıyla farkı yüzde olarak gösterir. Kira ile satış fiyatı arasındaki ilişkiyi merak ediyorsanız [[bilgi:ev-kac-yilda-amorti-eder|ev kaç yılda amorti eder]] yazımız yardımcı olur."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tapudaki yüzölçümünü daire alanı sanmak:</strong> Kat mülkiyetli tapularda bu alan genellikle parselin alanıdır.",
        "<strong>Farklı alan türlerini karşılaştırmak:</strong> Bir ilanın net, diğerinin brüt metrekaresini yan yana koymak fiyat değerlendirmesini bozar.",
        "<strong>Koridor ve küçük alanları unutmak:</strong> Antre, koridor, kiler ve WC'yi atlamak net alanı 10–20 m² eksik gösterebilir.",
        "<strong>Süpürgelik üstünden ölçmek:</strong> Ölçümü duvarın en dar yerinden ve aynı yükseklikten yapın; eğri duvarlarda birkaç noktadan ölçüp ortalama alın.",
        "<strong>Cm ile m'yi karıştırmak:</strong> 420 cm × 360 cm = 151.200 cm²'dir; metrekareye çevirmek için 10.000'e bölmeniz gerekir: 15,12 m²."
      ]
    },
    {
      h: "Araçlarla ev metrekaresi hesaplama",
      ol: [
        "Her odanın ölçülerini bir kağıda oda adıyla birlikte yazın.",
        "[[arac:metrekare-hesapla|Metrekare hesaplama aracı]]na odaları tek tek girin; L biçimli odalar için L şekli seçeneğini kullanın.",
        "Toplam net alanı bulduktan sonra satış ya da kira fiyatını [[arac:metrekare-fiyati-hesapla|metrekare fiyatı aracı]]na yazarak birim fiyatı hesaplayın.",
        "Klima ya da havalandırma planlıyorsanız tavan yüksekliğini de ölçüp [[arac:oda-hacmi-hesapla|oda hacmi hesaplama aracı]]yla metreküpü bulun."
      ],
      after: [
        "Oda hacmi, klima kapasitesi hesabının da temelidir; ayrıntılar için [[bilgi:klima-kac-btu-olmali|klima kaç BTU olmalı]] yazımıza göz atabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Ev metrekaresi nasıl hesaplanır?", "Her odanın iç ölçüleri metre cinsinden en ve boy olarak ölçülür, çarpılır ve tüm odalar toplanır; bu net alanı verir. Brüt alan ise duvarlar, kolonlar ve tesisat boşlukları dahil edilerek bulunur ve genellikle projeden okunur."],
    ["Brüt ve net metrekare arasındaki fark nedir?", "Net metrekare evin içinde kullanılabilen zemin alanıdır. Brüt metrekare buna iç ve dış duvarların, kolonların ve dairenin tesisat boşluklarının kapladığı alanı ekler. Bu nedenle brüt alan her zaman netten büyüktür."],
    ["Net metrekare nasıl ölçülür?", "Her odanın enini ve boyunu duvar iç yüzlerinden ölçüp çarparsınız. L biçimli odaları dikdörtgenlere bölersiniz. Koridor, banyo, WC ve kiler dahil tüm alanları topladığınızda net metrekareyi bulursunuz."],
    ["Brüt metrekareye neler dahildir?", "Brüt metrekareye odaların net alanları, odaları ayıran iç duvarlar, dış duvarlar, kolonlar ve daireye ait tesisat boşlukları dahildir. Komşu daireyle ortak duvarlarda genellikle duvar kalınlığının yarısı hesaba katılır."],
    ["Tapudaki metrekare brüt mü net mi?", "Kat mülkiyetli dairelerde tapuda yazan yüzölçümü çoğu zaman dairenin değil, binanın bulunduğu parselin alanıdır. Dairenin brüt ve net alanı onaylı mimari projeden, yapı kullanma izin belgesinden ya da ekspertiz raporundan öğrenilir."],
    ["Balkon metrekareye dahil mi?", "Balkonlar brüt alana genellikle dahildir. Net alana dahil edilip edilmediği ilana ve projenin alan tablosuna göre değişir. Karşılaştırma yaparken balkonun ayrı yazıldığı ilanları tercih edin ya da ilan sahibine sorun."],
    ["Brüt-net oranı genelde yüzde kaç?", "Konutlarda net alan çoğu zaman brüt alanın yaklaşık %75–85'i kadar çıkar. Küçük dairelerde, kalın duvarlı ya da çok kolonlu binalarda oran düşebilir; kesin değer ölçüm ya da projeyle bulunur."],
    ["Metrekare fiyatı nasıl hesaplanır?", "Toplam satış ya da kira bedeli dairenin alanına bölünür. Karşılaştırma yaparken her ilanda aynı alan türünü, örneğin hep net ya da hep brüt alanı kullanmak gerekir; aksi hâlde sonuçlar yanıltıcı olur."],
    ["Brüt ortak alan nedir?", "Brüt ortak alan, dairenin brüt alanına merdiven, asansör boşluğu, giriş holü, sığınak gibi binanın ortak yerlerinden düşen payın eklenmesiyle bulunan alandır. Yeni projelerin satış tablolarında sıkça kullanılır."]
  ],
  tools: ["metrekare-hesapla", "alan-cevre-hesapla", "metrekare-fiyati-hesapla", "oda-hacmi-hesapla"],
  related: ["alan-ve-hacim-formulleri", "ev-kac-yilda-amorti-eder", "klima-kac-btu-olmali"],
  sources: [
    ["Tapu ve Kadastro Genel Müdürlüğü", "https://www.tkgm.gov.tr/"],
    ["Mevzuat Bilgi Sistemi – Kat Mülkiyeti Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
