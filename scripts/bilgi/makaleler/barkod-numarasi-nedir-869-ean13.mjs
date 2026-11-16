export default {
  slug: "barkod-numarasi-nedir-869-ean13",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Barkod Numarası Nedir? 869 Kodu, EAN-13 Kontrol Hanesi ve ISBN",
  pageTitle: "Barkod Numarası Nedir? 869 Kodu, EAN-13 ve Kontrol Hanesi",
  description: "869 ile başlayan barkod, numaranın GS1 Türkiye üyesi bir firmaya verildiğini gösterir; üretim yerini değil. EAN-13 yapısı, kontrol hanesi hesabı ve ISBN ilişkisi.",
  keywords: ["barkod numarası nedir", "869 barkod hangi ülke", "ean 13 nedir", "barkod kontrol hanesi", "barkod nasıl alınır", "isbn nedir", "ürün barkodu oluşturma", "gs1 türkiye barkod"],
  lead: "Barkod numarası, bir ürünü dünyada tekil olarak tanımlayan koddur; marketlerde en yaygın biçimi 13 haneli <strong>EAN-13</strong>'tür. 868 ya da 869 ile başlayan barkodlar, numaranın <strong>GS1 Türkiye üyesi bir firmaya</strong> tahsis edildiğini gösterir; ürünün Türkiye'de üretildiğini kesin olarak kanıtlamaz. Numaranın son hanesi, önceki 12 haneden hesaplanan bir kontrol hanesidir. Bu sayfada EAN-13'ün yapısını, kontrol hanesi hesabını, barkodun nereden alındığını ve ISBN ile ilişkisini adım adım bulacaksınız.",
  kisaCevap: [
    "EAN-13 barkod 13 haneden oluşur: GS1 ön eki, firma kodu, ürün kodu ve 1 haneli kontrol hanesi.",
    "868 ve 869 ön ekleri GS1 Türkiye'ye ayrılmıştır; ürünün değil, barkodu alan firmanın üyeliğini gösterir.",
    "Kontrol hanesi: tek sıradaki haneler 1, çift sıradakiler 3 ile çarpılıp toplanır; toplamı 10'un katına tamamlayan rakam son hanedir.",
    "Satış için geçerli ürün barkodu GS1 Türkiye üyeliğiyle alınır; rastgele numara başka bir ürünle çakışabilir.",
    "ISBN-13 kitap numarasıdır ve 978 ya da 979 ön ekli bir EAN-13 olarak basılır.",
    "020–029 ile başlayan numaralar mağaza içi kullanım için ayrılmıştır ve dışarıda geçerli değildir."
  ],
  figure: {
    alt: "8691234567890 numaralı EAN-13 barkodun bölümleri: 869 GS1 Türkiye ön eki, firma kodu, ürün kodu ve 0 kontrol hanesi; altta kontrol hanesinin 1 ve 3 ağırlıklarıyla hesaplanışı.",
    caption: "Örnek numara tamamen temsilîdir. Firma ve ürün kodu uzunluğu, firmanın aldığı numara kapasitesine göre değişir; toplam her zaman 13 hanedir.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">EAN-13 barkodun yapısı</text>
  <rect x="40" y="52" width="150" height="66" rx="8" class="p"/>
  <text x="115" y="84" class="xl mid sf">869</text>
  <text x="115" y="106" class="sm mid sf">GS1 Türkiye ön eki</text>
  <rect x="200" y="52" width="210" height="66" rx="8" class="ps"/>
  <text x="305" y="84" class="xl mid">12345</text>
  <text x="305" y="106" class="sm mid">firma kodu</text>
  <rect x="420" y="52" width="180" height="66" rx="8" class="sf sb"/>
  <text x="510" y="84" class="xl mid">6789</text>
  <text x="510" y="106" class="sm mid">ürün kodu</text>
  <rect x="610" y="52" width="70" height="66" rx="8" class="oks"/>
  <text x="645" y="84" class="xl mid ok">0</text>
  <text x="645" y="106" class="sm mid">kontrol</text>
  <text x="40" y="152" class="b">Kontrol hanesi hesabı (ilk 12 hane)</text>
  <g class="mid">
    <text x="70" y="186" class="b">8</text><text x="115" y="186" class="b">6</text><text x="160" y="186" class="b">9</text><text x="205" y="186" class="b">1</text><text x="250" y="186" class="b">2</text><text x="295" y="186" class="b">3</text><text x="340" y="186" class="b">4</text><text x="385" y="186" class="b">5</text><text x="430" y="186" class="b">6</text><text x="475" y="186" class="b">7</text><text x="520" y="186" class="b">8</text><text x="565" y="186" class="b">9</text>
    <text x="70" y="212" class="sm mu">×1</text><text x="115" y="212" class="sm p">×3</text><text x="160" y="212" class="sm mu">×1</text><text x="205" y="212" class="sm p">×3</text><text x="250" y="212" class="sm mu">×1</text><text x="295" y="212" class="sm p">×3</text><text x="340" y="212" class="sm mu">×1</text><text x="385" y="212" class="sm p">×3</text><text x="430" y="212" class="sm mu">×1</text><text x="475" y="212" class="sm p">×3</text><text x="520" y="212" class="sm mu">×1</text><text x="565" y="212" class="sm p">×3</text>
  </g>
  <rect x="40" y="232" width="640" height="104" rx="8" class="sf sb"/>
  <text x="60" y="258" class="sm">Tek sıradakiler: 8 + 9 + 2 + 4 + 6 + 8 = 37</text>
  <text x="60" y="282" class="sm">Çift sıradakiler: (6 + 1 + 3 + 5 + 7 + 9) × 3 = 31 × 3 = 93</text>
  <text x="60" y="306" class="sm">Toplam: 37 + 93 = 130 → 10'un katı, eksik 0</text>
  <text x="60" y="326" class="sm b ok">Kontrol hanesi = 0 → 8691234567890</text>
  <rect x="40" y="352" width="640" height="56" rx="8" class="dgs"/>
  <text x="60" y="377" class="sm b">869 = numara GS1 Türkiye'den alındı</text>
  <text x="60" y="397" class="sm">Ürünün üretildiği ülkeyi tek başına göstermez.</text>
</svg>`
  },
  sections: [
    {
      h: "Barkod numarası ne anlama gelir?",
      p: [
        "Barkod, bir numaranın siyah çubuklar ve beyaz boşluklar hâlinde makinenin okuyabileceği biçimde yazılmasıdır. Asıl bilgi çubukların altındaki numaradır; çubuklar yalnızca bu numaranın hızlı okunmasını sağlar. Kasada okutulan numara, mağazanın sisteminde ürünün adı, fiyatı ve stok bilgisiyle eşleştirilir. Yani barkodun kendisi fiyat ya da ürün adı içermez.",
        "Perakende ürünlerde kullanılan numaralar uluslararası GS1 sistemi tarafından yönetilir. GS1, her ülkedeki üye kuruluşa bir ya da daha fazla ön ek verir; bu kuruluşlar da kendi üyelerine numara blokları tahsis eder. Böylece dünyada aynı numaranın iki farklı ürüne verilmesi önlenir. Bu numaralara genel olarak GTIN (küresel ticari ürün numarası) denir; EAN-13 bunun en yaygın biçimidir. Aynı numara dünyanın her yerinde aynı ürünü gösterdiği için tedarikçi, depo, mağaza ve pazaryeri aynı dili konuşur."
      ]
    },
    {
      h: "869 ile başlayan barkod hangi ülkenin?",
      p: [
        "GS1 sisteminde <strong>868 ve 869</strong> ön ekleri GS1 Türkiye'ye ayrılmıştır. Bir barkodun 869 ile başlaması, o numaranın GS1 Türkiye'ye üye bir firmaya verildiğini gösterir. Bu firma genellikle ürünün markasının sahibi, üreticisi ya da ithalatçısıdır.",
        "Sık yapılan hata, ön ekin ürünün üretildiği ülkeyi gösterdiğini düşünmektir. Türkiye'de kurulu bir firma ürününü yurt dışında ürettirip kendi 869'lu numarasıyla satabilir; yurt dışındaki bir marka da Türkiye'de ürettirdiği ürüne kendi ülkesinin ön ekini basabilir. Bu yüzden menşe bilgisi için ambalajdaki \"üretim yeri\" ya da \"menşei\" ibaresine bakmak gerekir."
      ],
      table: {
        head: ["Ön ek", "Anlamı"],
        rows: [
          ["868–869", "GS1 Türkiye"],
          ["000–019, 030–039, 060–139", "GS1 ABD (UPC uyumlu numaralar)"],
          ["020–029, 040–049, 200–299", "Mağaza ya da şirket içi kullanım için ayrılmış"],
          ["400–440", "GS1 Almanya"],
          ["978–979", "Kitaplar (ISBN)"],
          ["977", "Süreli yayınlar (ISSN)"]
        ],
        caption: "Ön ek listesi GS1 tarafından yayımlanır; tablo yalnızca örnekleri gösterir."
      }
    },
    {
      h: "EAN-13 barkodu kaç haneden oluşur?",
      p: [
        "EAN-13, adından da anlaşılacağı gibi 13 haneden oluşur ve dört bölüme ayrılır: GS1 ön eki, firma kodu, ürün kodu ve kontrol hanesi. Ön ek genellikle 3 hanedir. Firma kodu ile ürün kodu toplam 9 hane paylaşır; firmanın ihtiyacı olan numara sayısına göre firma kodu kısa ya da uzun olabilir. Son hane her zaman kontrol hanesidir."
      ],
      table: {
        head: ["Tür", "Hane sayısı", "Yaygın kullanım"],
        rows: [
          ["EAN-13", "13", "Perakende ürünler, marketler, pazaryerleri"],
          ["EAN-8", "8", "Çok küçük ambalajlar"],
          ["UPC-A", "12", "ABD ve Kanada perakendesi"],
          ["ITF-14", "14", "Koli ve dış ambalaj"],
          ["Code 128", "Değişken", "Lojistik, kargo, depo etiketleri"],
          ["Code 39", "Değişken", "Sanayi, envanter etiketleri"]
        ]
      },
      after: [
        "Bu biçimlerin tümünü [[arac:barkod-olustur|Barkod Oluşturucu]] ile üretebilirsiniz; araç EAN-13, EAN-8 ve UPC-A için kontrol hanesini otomatik hesaplar ve PNG ya da SVG olarak indirmenize izin verir."
      ]
    },
    {
      h: "Barkodun son hanesi nasıl hesaplanır?",
      p: [
        "Kontrol hanesi, okutma ya da elle girişte yapılan tek hane hatalarını ve komşu iki hanenin yer değiştirmesini yakalamak için kullanılır. EAN-13'te hesap, soldan sağa ilk 12 haneye 1 ve 3 ağırlıklarının sırayla uygulanmasıyla yapılır."
      ],
      formula: "Toplam = (1., 3., 5., 7., 9., 11. haneler) × 1 + (2., 4., 6., 8., 10., 12. haneler) × 3\nKontrol hanesi = (10 − toplam mod 10) mod 10",
      ol: [
        "İlk 12 hane: 8 6 9 1 2 3 4 5 6 7 8 9.",
        "Tek sıradaki haneler: 8 + 9 + 2 + 4 + 6 + 8 = 37.",
        "Çift sıradaki haneler: 6 + 1 + 3 + 5 + 7 + 9 = 31; 31 × 3 = 93.",
        "Toplam: 37 + 93 = 130.",
        "130'u bir sonraki 10'un katına tamamlamak için gereken sayı 0'dır; kontrol hanesi 0.",
        "Tam numara: 8691234567890."
      ],
      after: [
        "Toplam örneğin 127 olsaydı bir sonraki 10'un katı 130 olduğu için kontrol hanesi 3 olurdu. Elinizdeki bir numaranın geçerli olup olmadığını aynı yöntemle sınayabilirsiniz: 13 hanenin tümüne ağırlık uygulanır (13. hane 1 ile çarpılır) ve toplam 10'un katıysa numara biçim olarak geçerlidir. Benzer kontrol hanesi mantığı T.C. kimlik numarasında ve IBAN'da da kullanılır; ayrıntı için [[bilgi:tc-kimlik-numarasi-algoritmasi|T.C. kimlik numarası algoritması]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Ürün barkodu nereden alınır?",
      p: [
        "Türkiye'de perakende satışta geçerli ürün barkodu numaraları, Türkiye Odalar ve Borsalar Birliği bünyesinde faaliyet gösteren <strong>GS1 Türkiye</strong> üyeliğiyle alınır. Üye olan firmaya bir firma kodu tahsis edilir; firma bu kodun altındaki ürün numaralarını kendi ürünlerine kendisi verir. Üyelik yıllık aidata tabidir ve aidat, alınan numara kapasitesine göre değişir. Güncel koşullar ve ücretler için GS1 Türkiye'nin duyurularına bakın.",
        "Zincir marketler ve büyük pazaryerleri genellikle GS1 üyeliğiyle alınmış geçerli bir barkod ister. Bazı pazaryerleri barkodu olmayan el yapımı ürünler için kendi iç kodlarını kullanmaya izin verebilir; ürün listelemeden önce ilgili platformun kurallarını okuyun."
      ],
      ul: [
        "Her farklı ürüne, ayrıca her farklı renk, beden ve ambalaj boyutuna ayrı numara verilir.",
        "Bir numara başka bir ürüne verildikten sonra uzun süre yeniden kullanılmamalıdır; satıştan kalkan ürünün numarası hemen yeni ürüne verilmez.",
        "Koli ve dış ambalajlar için ayrı numara (ör. ITF-14) gerekebilir.",
        "Numaraların hangi ürüne verildiğini bir tabloda düzenli kaydedin."
      ]
    },
    {
      h: "Kendi oluşturduğum barkod markette okunur mu?",
      p: [
        "Barkod okuyucu, biçim olarak doğru basılmış her EAN-13 numarasını okur; okuyucu numaranın kime ait olduğunu denetlemez. Sorun okumada değil, eşleştirmededir. Rastgele seçtiğiniz bir numara başka bir firmanın gerçek ürününe ait olabilir; bu durumda kasada yanlış ürün çıkabilir, pazaryerinde ürününüz başka bir ürünle birleştirilebilir ya da marka hakları açısından sorun yaşanabilir.",
        "Kendi dükkânınızda, deponuzda ya da envanter sayımında kullanmak için barkod üretmek ise tamamen meşrudur. Bu amaçla GS1'in mağaza içi kullanıma ayırdığı 20–29 ile başlayan numaraları ya da Code 128 gibi serbest biçimli kodları kullanmak çakışma riskini ortadan kaldırır. Bu numaralar yalnızca sizin sisteminizde anlamlıdır, başka bir mağazada geçerli değildir."
      ]
    },
    {
      h: "ISBN ile barkod arasındaki ilişki nedir?",
      p: [
        "ISBN (Uluslararası Standart Kitap Numarası), kitapları tanımlayan numaradır. 2007'den beri 13 hanelidir ve 978 ya da 979 ile başlar. Bu sayede her ISBN-13, aynı zamanda bir EAN-13'tür: kitabın arka kapağındaki barkod doğrudan ISBN numarasını taşır ve kontrol hanesi EAN-13 ile aynı yöntemle hesaplanır.",
        "Türkiye'de ISBN, Kültür ve Turizm Bakanlığı Kütüphaneler ve Yayımlar Genel Müdürlüğü bünyesindeki ISBN Türkiye Ajansı tarafından yayıncılara verilir; GS1 üyeliği gerekmez. Türkiye'deki yayıncılara verilen numaralar genellikle 978-605, 978-625 ya da 978-975 ile başlar. Eski 10 haneli ISBN'ler, başına 978 eklenip kontrol hanesi yeniden hesaplanarak 13 haneye çevrilir. Bir ISBN'nin doğruluğunu ve iki biçim arasındaki karşılığını [[arac:isbn-dogrula|ISBN Doğrulama]] aracıyla görebilirsiniz."
      ]
    },
    {
      h: "Raf etiketi ve fiyat etiketine barkod nasıl eklenir?",
      ol: [
        "Ürün listenizi barkod numarası, ürün adı ve fiyatla birlikte hazırlayın.",
        "Barkodu SVG biçiminde üretin; vektör olduğu için her boyutta net basılır.",
        "Barkodun etrafında yeterli beyaz boşluk (sessiz alan) bırakın; çubukların sol ve sağında boşluk olmazsa okuma zorlaşır.",
        "Siyah çubuk, beyaz zemin en güvenli kontrasttır; kırmızı çubuk ya da koyu zemin okuyucuların çoğunda sorun çıkarır.",
        "EAN-13'ü çok küçültmeyin; tavsiye edilen boyutun yaklaşık %80'inin altına inmek okumayı zorlaştırabilir.",
        "Etiketi bastıktan sonra telefonunuzla ya da kasadaki okuyucuyla deneyin."
      ],
      after: [
        "Barkodlu raf ve fiyat etiketlerini toplu hazırlamak için [[arac:etiket-olustur|Etiket Oluşturucu]]yu kullanabilirsiniz. Ürün sayfasına, menüye ya da kampanyaya bağlantı vermek istiyorsanız barkod yerine [[arac:qr-kod|QR Kod Oluşturucu]] daha uygundur; ayrıntı için [[rehber:qr-kod-nasil-olusturulur|QR kod rehberine]] bakın."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>869'u menşe sanmak:</strong> Ön ek numarayı veren GS1 üyesini gösterir, üretim yerini değil.",
        "<strong>Rastgele numara kullanmak:</strong> Başka bir ürünle çakışabilir.",
        "<strong>Varyantlara aynı numarayı vermek:</strong> Her renk, beden ve ambalaj ayrı numara ister.",
        "<strong>Kontrol hanesini elle yanlış hesaplamak:</strong> Ağırlıkların sırası soldan başlar ve 1 ile başlar.",
        "<strong>Düşük çözünürlüklü görselle basmak:</strong> Bulanık çubuklar okunmaz; vektör çıktı tercih edin."
      ]
    }
  ],
  faq: [
    ["Barkod numarası ne anlama gelir?", "Barkod numarası bir ürünü dünyada tekil olarak tanımlayan koddur. Numara ürünün adını ya da fiyatını taşımaz; kasada okutulduğunda mağazanın sistemindeki ürün kaydıyla eşleştirilir."],
    ["869 ile başlayan barkod hangi ülkenin?", "868 ve 869 ön ekleri GS1 Türkiye'ye ayrılmıştır. Bu ön ek numaranın GS1 Türkiye üyesi bir firmaya verildiğini gösterir; ürünün Türkiye'de üretildiğini tek başına kanıtlamaz."],
    ["EAN-13 barkodu kaç haneden oluşur?", "EAN-13 13 haneden oluşur: genellikle 3 haneli GS1 ön eki, firma kodu, ürün kodu ve en sonda 1 haneli kontrol hanesi. Firma ve ürün kodunun uzunluğu firmanın numara kapasitesine göre değişir."],
    ["Barkodun son hanesi nasıl hesaplanır?", "İlk 12 hanede tek sıradakiler 1, çift sıradakiler 3 ile çarpılıp toplanır. Toplamı bir sonraki 10'un katına tamamlayan rakam kontrol hanesidir; toplam 130 ise kontrol hanesi 0'dır."],
    ["Ürün barkodu nereden alınır?", "Perakendede geçerli ürün barkodu numaraları TOBB bünyesindeki GS1 Türkiye üyeliğiyle alınır. Üye firmaya bir firma kodu verilir ve firma bu kodun altındaki numaraları kendi ürünlerine atar."],
    ["ISBN ile barkod arasındaki ilişki nedir?", "ISBN-13 kitap numarasıdır ve 978 ya da 979 ile başlayan bir EAN-13 olarak basılır. Kontrol hanesi aynı yöntemle hesaplanır; Türkiye'de ISBN, Bakanlık bünyesindeki ISBN ajansından alınır."],
    ["Kendi oluşturduğum barkod markette okunur mu?", "Okuyucu biçimi doğru her numarayı okur, ama rastgele numara başka bir firmanın ürünüyle çakışabilir. Mağaza içi kullanım için 20–29 ile başlayan numaralar ya da Code 128 gibi serbest kodlar kullanılmalıdır."],
    ["Raf etiketi ve fiyat etiketine barkod nasıl eklenir?", "Barkodu SVG gibi vektör biçimde üretin, etrafında beyaz boşluk bırakın, siyah çubuk ve beyaz zemin kullanın ve çok küçültmeyin. Basılı etiketi bir okuyucuyla deneyip sonra çoğaltın."],
    ["Barkod numarası fiyat bilgisi içerir mi?", "Standart ürün barkodu fiyat içermez; fiyat mağazanın kendi sisteminde tutulur. Yalnızca tartılarak satılan ürünlerde mağaza içi ön ekli numaralara ağırlık ya da fiyat bilgisi kodlanabilir."]
  ],
  tools: ["barkod-olustur", "isbn-dogrula", "etiket-olustur", "qr-kod"],
  related: ["tc-kimlik-numarasi-algoritmasi", "iban-nedir-kac-haneli", "pazaryeri-komisyonu-nasil-hesaplanir"],
  sources: [
    ["TOBB – GS1 Türkiye", "https://www.tobb.org.tr/"],
    ["GS1 – Ön ek listesi ve GTIN standardı", "https://www.gs1.org/"],
    ["Kültür ve Turizm Bakanlığı – Kütüphaneler ve Yayımlar Genel Müdürlüğü", "https://kygm.ktb.gov.tr/"]
  ]
};
