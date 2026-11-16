export default {
  slug: "onaltilik-hex-sayi-sistemi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Onaltılık (Hex) Sayı Sistemi Nedir? Hex Ondalığa Nasıl Çevrilir",
  pageTitle: "Onaltılık (Hex) Sayı Sistemi: Hex Ondalık Çevirme Yöntemi",
  description: "Onaltılık sistem 0–9 rakamları ve A–F harfleriyle 16 tabanında sayar. Hex ondalık çevirme, ondalıktan hex'e bölme yöntemi, ikilik ilişkisi, renk kodları ve hex toplama.",
  keywords: ["onaltılık sayı sistemi", "hex nedir", "hex ondalık çevirme", "16 tabanı", "ondalıktan hex'e çevirme", "sekizlik sayı sistemi", "sayı tabanı dönüştürme", "hex toplama"],
  lead: "Onaltılık (hexadecimal, kısaca hex) sayı sistemi, <strong>16 tabanında</strong> sayan ve 0–9 rakamlarının yanına 10–15 değerleri için <strong>A, B, C, D, E, F</strong> harflerini ekleyen bir sayı sistemidir. Hex sayıyı ondalığa çevirmek için her basamağı 16'nın kuvvetleriyle çarpıp toplarsınız: 2F = 2 × 16 + 15 = 47. Bir hex basamak tam 4 bite karşılık geldiği için bilgisayar belleği, renk kodları, MAC adresleri ve hata kodları bu sistemle yazılır. Aşağıda iki yönlü çeviriyi, ikilik ve sekizlik sistemle ilişkiyi ve hex toplamayı örneklerle anlatıyoruz.",
  kisaCevap: [
    "Onaltılık sistemde 16 sembol vardır: 0–9 ve A=10, B=11, C=12, D=13, E=14, F=15.",
    "Hex'ten ondalığa: her basamak 16<sup>n</sup> ile çarpılıp toplanır; 3E8 = 3×256 + 14×16 + 8 = 1.000.",
    "Ondalıktan hex'e: sayı 16'ya art arda bölünür, kalanlar sondan başa yazılır; 2026 = 7EA.",
    "1 hex basamak = 4 bit; 1 bayt (8 bit) tam olarak 2 hex basamakla yazılır (00–FF, yani 0–255).",
    "Renk kodu #FF8800, kırmızı 255, yeşil 136, mavi 0 demektir; her renk kanalı 2 hex basamaktır.",
    "Sekizlik (oktal) sistem 8 tabanlıdır, 0–7 rakamlarını kullanır ve 1 oktal basamak 3 bite karşılık gelir."
  ],
  figure: {
    alt: "3E8 onaltılık sayısının ondalığa çevrilmesi: 3 çarpı 256, E yani 14 çarpı 16 ve 8 çarpı 1 toplamı 1000; altında 7EA sayısının ikilik karşılığı 0111 1110 1010 olarak her hex basamağın dört bite ayrılması.",
    caption: "Üstte basamak değerleriyle hex'ten ondalığa çeviri, altta her hex basamağın tam olarak dört ikilik basamağa (bit) karşılık geldiği gösterilir. Hex'in bilgisayar dünyasında yaygın olmasının nedeni bu kolay eşleşmedir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hex'ten ondalığa: 3E8</text>
  <g class="mid">
    <rect x="120" y="50" width="120" height="64" rx="8" class="p"/><text x="180" y="92" class="xl sf">3</text>
    <rect x="300" y="50" width="120" height="64" rx="8" class="p"/><text x="360" y="92" class="xl sf">E</text>
    <rect x="480" y="50" width="120" height="64" rx="8" class="p"/><text x="540" y="92" class="xl sf">8</text>
    <text x="180" y="138" class="sm mu">basamak değeri 16² = 256</text>
    <text x="360" y="138" class="sm mu">basamak değeri 16¹ = 16</text>
    <text x="540" y="138" class="sm mu">basamak değeri 16⁰ = 1</text>
    <rect x="120" y="150" width="120" height="40" rx="6" class="sf sb"/><text x="180" y="176" class="b">3 × 256 = 768</text>
    <rect x="300" y="150" width="120" height="40" rx="6" class="sf sb"/><text x="360" y="176" class="b">14 × 16 = 224</text>
    <rect x="480" y="150" width="120" height="40" rx="6" class="sf sb"/><text x="540" y="176" class="b">8 × 1 = 8</text>
    <text x="270" y="176" class="lg b">+</text><text x="450" y="176" class="lg b">+</text>
    <rect x="240" y="202" width="240" height="40" rx="8" class="oks"/>
    <text x="360" y="228" class="lg b ok">= 1.000 (ondalık)</text>
  </g>
  <line x1="40" y1="262" x2="680" y2="262" class="sb dash" fill="none"/>
  <text x="360" y="292" class="b mid">Her hex basamak = 4 bit: 7EA (2026)</text>
  <g class="mid">
    <rect x="100" y="306" width="160" height="40" rx="6" class="ps"/><text x="180" y="332" class="b lg">7</text>
    <rect x="280" y="306" width="160" height="40" rx="6" class="ps"/><text x="360" y="332" class="b lg">E</text>
    <rect x="460" y="306" width="160" height="40" rx="6" class="ps"/><text x="540" y="332" class="b lg">A</text>
    <rect x="100" y="356" width="160" height="40" rx="6" class="sf sb"/><text x="180" y="382" class="b">0111</text>
    <rect x="280" y="356" width="160" height="40" rx="6" class="sf sb"/><text x="360" y="382" class="b">1110</text>
    <rect x="460" y="356" width="160" height="40" rx="6" class="sf sb"/><text x="540" y="382" class="b">1010</text>
  </g>
</svg>`
  },
  sections: [
    {
      h: "Onaltılık (hex) sayı sistemi nedir?",
      p: [
        "Günlük hayatta kullandığımız ondalık sistem 10 tabanlıdır: 0'dan 9'a kadar on rakam vardır ve 9'dan sonra bir basamak sola kayarak 10 yazarız. Onaltılık sistemde ise bir basamağa 16 farklı değer sığar. 0–9 rakamları yetmediği için 10'dan 15'e kadar olan değerler A'dan F'ye harflerle gösterilir. F'den (15) sonra basamak dolar ve 10 yazılır; ancak bu onaltılık \"10\", ondalık 16 demektir.",
        "Karışıklığı önlemek için hex sayılar genellikle bir işaretle yazılır: programlamada <code>0x</code> öneki (<code>0x2F</code>), web renklerinde <code>#</code> işareti (<code>#FF8800</code>), matematik derslerinde alt indis (2F<sub>16</sub>). Harfler büyük ya da küçük yazılabilir; <code>ff</code> ile <code>FF</code> aynı değerdir.",
        "Onaltılık sistemin yaygınlaşmasının nedeni insanlar için değil bilgisayarlar için kolay olmasıdır. Bilgisayarlar her şeyi ikilik sistemde (0 ve 1) tutar; ama uzun bit dizileri insanlar için okunmazdır. 16 = 2<sup>4</sup> olduğu için her hex basamak tam 4 bite denk gelir. Böylece 32 haneli bir ikilik sayı yalnızca 8 hex basamakla, kolayca okunur ve hatasız yazılır."
      ]
    },
    {
      h: "A–F harfleri neyi temsil eder? Karşılık tablosu",
      p: [
        "Aşağıdaki tablo 0–15 arasındaki değerlerin dört sistemdeki karşılığını gösterir. Bu tabloyu, özellikle ikilik sütununu ezberlemek, çevirileri kafadan yapmanın anahtarıdır."
      ],
      table: {
        head: ["Ondalık", "Hex", "İkilik (4 bit)", "Sekizlik"],
        rows: [
          ["0", "0", "0000", "0"], ["1", "1", "0001", "1"], ["2", "2", "0010", "2"], ["3", "3", "0011", "3"],
          ["4", "4", "0100", "4"], ["5", "5", "0101", "5"], ["6", "6", "0110", "6"], ["7", "7", "0111", "7"],
          ["8", "8", "1000", "10"], ["9", "9", "1001", "11"], ["10", "A", "1010", "12"], ["11", "B", "1011", "13"],
          ["12", "C", "1100", "14"], ["13", "D", "1101", "15"], ["14", "E", "1110", "16"], ["15", "F", "1111", "17"]
        ],
        caption: "Ondalık 16, hex'te 10, ikilikte 10000, sekizlikte 20 olarak yazılır."
      }
    },
    {
      h: "Hex sayı ondalığa nasıl çevrilir?",
      p: [
        "Her sayı sisteminde basamaklar sağdan sola doğru tabanın kuvvetleri kadar değer taşır. Ondalık 345 sayısı 3 × 100 + 4 × 10 + 5 × 1'dir. Hex'te aynı mantıkla basamak değerleri 1, 16, 256, 4.096, 65.536 diye büyür. Çeviri için her basamağın değerini (harfse sayısal karşılığını) kendi basamak değeriyle çarpıp sonuçları toplarsınız."
      ],
      formula: "ondalık = dₙ × 16ⁿ + … + d₂ × 16² + d₁ × 16¹ + d₀ × 16⁰\nÖrnek: 1A3 = 1 × 256 + 10 × 16 + 3 × 1 = 256 + 160 + 3 = 419",
      ol: [
        "Sayıyı sağdan sola basamaklarına ayırın: 3E8 için en sağdaki 8, ortadaki E, soldaki 3'tür.",
        "Harfleri sayıya çevirin: E = 14.",
        "Basamak değerlerini yazın: sağdan başlayarak 1, 16, 256.",
        "Çarpın: 8 × 1 = 8, 14 × 16 = 224, 3 × 256 = 768.",
        "Toplayın: 768 + 224 + 8 = 1.000. Yani 0x3E8 ondalık 1.000'dir."
      ],
      after: [
        "İki haneli hex sayılar için pratik bir kısayol vardır: soldaki basamağı 16 ile çarpıp sağdakini ekleyin. FF = 15 × 16 + 15 = 255, 80 = 8 × 16 = 128, C8 = 12 × 16 + 8 = 200. Uzun sayılar ve hızlı kontrol için [[arac:onaltilik-ondalik-cevir|onaltılık ondalık çevirici]] sonucu ikilik ve sekizlik karşılığıyla birlikte verir."
      ]
    },
    {
      h: "Ondalık sayı hex'e nasıl çevrilir?",
      p: [
        "Ters yönde <strong>art arda bölme</strong> yöntemi kullanılır: sayıyı 16'ya bölün, kalanı not edin, bölümü yeniden 16'ya bölün ve bölüm sıfır olana kadar devam edin. Kalanları <strong>sondan başa</strong> okuduğunuzda hex sayıyı elde edersiniz. 10–15 arasındaki kalanları harfe çevirmeyi unutmayın."
      ],
      table: {
        head: ["Adım", "Bölme", "Bölüm", "Kalan", "Hex basamak"],
        rows: [
          ["1", "2026 ÷ 16", "126", "10", "A"],
          ["2", "126 ÷ 16", "7", "14", "E"],
          ["3", "7 ÷ 16", "0", "7", "7"]
        ],
        caption: "Kalanlar aşağıdan yukarı okunur: 7, E, A. Sonuç: 2026 = 7EA (hex). Kontrol: 7 × 256 + 14 × 16 + 10 = 2.026."
      },
      after: [
        "Bir başka yol, sayıyı önce ikilik sisteme çevirip sağdan dörder bitlik gruplara ayırmaktır. 2026'nın ikilik karşılığı 11111101010'dur; sağdan dörderli grupladığınızda 0111 1110 1010 olur ve bu gruplar tablodan 7, E, A diye okunur. İkilik çevirinin ayrıntıları için [[bilgi:ikilik-sayi-sistemi-nasil-cevrilir|ikilik sayı sistemi]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Hex ile ikilik sistem arasındaki ilişki",
      p: [
        "Hex ile ikilik arasında çeviri, aritmetik gerektirmeyen bir eşleştirme işidir. Hex'ten ikiliğe geçerken her hex basamağı tablodaki 4 bitlik karşılığıyla değiştirirsiniz; ikilikten hex'e geçerken bitleri sağdan dörderli gruplar, eksik kalan soldaki gruba sıfır eklersiniz.",
        "Örnek: 0x2F = 0010 1111; 0xA5 = 1010 0101. Ters yönde 110110011 sayısı sağdan gruplanınca 1 1011 0011 olur, soldaki tek bit 0001 diye tamamlanır ve sonuç 1B3 çıkar. Bir bayt 8 bit olduğu için her bayt tam iki hex basamakla gösterilir; bu yüzden bellek dökümleri, dosya imzaları ve özet (hash) değerleri hep çift sayıda hex basamaktan oluşur.",
        "Bu ilişki ağ adreslerinde de karşınıza çıkar. Ağ kartlarının fiziksel adresi (MAC) altı bayttan oluşur ve 00:1A:2B:3C:4D:5E gibi iki haneli hex gruplarıyla yazılır. Yeni nesil internet adresleri olan IPv6 da 16 bitlik dört hex basamaklı gruplar kullanır; ayrıntılar [[bilgi:ipv6-nedir-ipv4-farki|IPv6 nedir]] yazısında."
      ]
    },
    {
      h: "Hex renk kodları neden onaltılık?",
      p: [
        "Ekrandaki her renk kırmızı, yeşil ve mavi (RGB) ışığın karışımıyla oluşur. Her kanal 0 ile 255 arasında bir değer alır; bu da tam 1 bayt, yani iki hex basamak eder. Altı haneli renk kodu bu üç baytın yan yana yazılmasıdır: <code>#RRGGBB</code>.",
        "Örneğin <code>#FF8800</code> kodunda FF = 255 (tam kırmızı), 88 = 136 (orta yeşil), 00 = 0 (mavi yok) demektir ve sonuç turuncudur. <code>#000000</code> siyah, <code>#FFFFFF</code> beyaz, <code>#808080</code> orta gridir. Üç haneli kısa yazımda her basamak ikilenir: <code>#F80</code> ile <code>#FF8800</code> aynı renktir. Renk kodlarının RGB ve diğer biçimlerle ilişkisini [[bilgi:hex-rgb-renk-kodlari-nedir|hex ve RGB renk kodları]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Sekizlik (oktal) sistem nedir?",
      p: [
        "Sekizlik sistem 8 tabanlıdır ve yalnızca 0–7 rakamlarını kullanır. 8 = 2<sup>3</sup> olduğu için her sekizlik basamak tam 3 bite karşılık gelir. Hex kadar yaygın değildir ama bazı alanlarda hâlâ kullanılır; en bilineni Unix ve Linux sistemlerindeki <strong>dosya izinleri</strong>dir.",
        "Örneğin <code>755</code> izni sahibine 7 (okuma 4 + yazma 2 + çalıştırma 1), gruba 5 (okuma + çalıştırma), diğerlerine 5 hakkı verir. Ondalık karşılığı 7 × 64 + 5 × 8 + 5 = 493'tür. Sekizlikten ondalığa çeviri hex'teki gibi yapılır; yalnızca basamak değerleri 1, 8, 64, 512 diye ilerler. Bu çevirileri [[arac:sekizlik-ondalik-cevir|sekizlik ondalık çevirici]] ile, 2–36 arasındaki tüm tabanlar için ise [[arac:sayi-tabani-donustur|sayı tabanı dönüştürücü]] ile yapabilirsiniz."
      ]
    },
    {
      h: "Hex sayılarla toplama nasıl yapılır?",
      p: [
        "Hex toplama, ondalık toplamayla aynı mantıkta yapılır; tek fark, bir basamağın toplamı 16 ya da daha büyük olduğunda elde oluşmasıdır. Basamak toplamından 16 çıkarılır, sonuç yazılır ve bir sonraki basamağa 1 aktarılır."
      ],
      ol: [
        "Örnek: 9A + 7C. Sağ basamaklar: A + C = 10 + 12 = 22. 22, 16'dan büyük olduğu için 22 − 16 = 6 yazılır, elde 1.",
        "Sol basamaklar: 9 + 7 + 1 (elde) = 17. 17 − 16 = 1 yazılır, elde 1.",
        "Elde kalan 1 en sola yazılır. Sonuç: 116 (hex).",
        "Kontrol: 9A = 154, 7C = 124, toplam 278. 116 = 1 × 256 + 1 × 16 + 6 = 278. Sonuç doğru."
      ],
      after: [
        "Çıkarmada da benzer biçimde, üstteki basamak küçükse soldan 16 ödünç alınır. Çarpma ve bölme elle zahmetli olduğundan pratikte [[arac:onaltilik-hesap-makinesi|onaltılık hesap makinesi]] kullanılır; araç AND, OR ve XOR gibi bit işlemlerini de yapar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Hex 10'u ondalık 10 sanmak:</strong> 0x10 ondalık 16'dır. Öneki olmayan sayılarda hangi tabanın kastedildiğini mutlaka kontrol edin.",
        "<strong>Kalanları yanlış sırayla okumak:</strong> Art arda bölmede ilk bulunan kalan en sağdaki basamaktır. Kalanlar aşağıdan yukarı okunur.",
        "<strong>Harfleri sayıya çevirmeyi unutmak:</strong> E basamağını 5 ya da 14 yerine başka bir değerle çarpmak tüm sonucu bozar. Tablodaki karşılıkları kullanın.",
        "<strong>Gruplamayı soldan yapmak:</strong> İkilikten hex'e geçerken bitler sağdan dörderli gruplanmalıdır; soldan gruplamak farklı bir sayı üretir.",
        "<strong>O harfi ile 0 rakamını karıştırmak:</strong> Hex'te O harfi yoktur; yalnızca A–F harfleri geçerlidir. G, H gibi harfler hex sayıda bulunamaz."
      ]
    }
  ],
  faq: [
    ["Onaltılık (hex) sayı sistemi nedir?", "Onaltılık sistem 16 tabanında sayan bir sayı sistemidir. 0–9 rakamlarının yanında 10–15 değerleri için A, B, C, D, E ve F harflerini kullanır. Her basamak 4 bite karşılık geldiği için bilgisayar biliminde çok yaygındır."],
    ["Hex sayı ondalığa nasıl çevrilir?", "Her basamak sağdan başlayarak 1, 16, 256, 4.096 gibi 16'nın kuvvetleriyle çarpılır ve sonuçlar toplanır. Örneğin 3E8 için 3 × 256 + 14 × 16 + 8 × 1 = 1.000 bulunur; harfler önce sayısal karşılığına çevrilir."],
    ["Ondalık sayı hex'e nasıl çevrilir?", "Sayı bölüm sıfır olana kadar art arda 16'ya bölünür ve her adımdaki kalan not edilir. Kalanlar sondan başa okunur, 10–15 arasındakiler harfe çevrilir. 2026 sayısı bu yöntemle 7EA olarak bulunur."],
    ["A–F harfleri neyi temsil eder?", "A harfi 10, B 11, C 12, D 13, E 14 ve F 15 değerini temsil eder. Onaltılık sistemde tek basamağa 16 değer sığması gerektiği için 9'dan sonraki değerler harflerle gösterilir; büyük ya da küçük yazılması fark etmez."],
    ["Hex renk kodları neden onaltılık?", "Her renk kanalı kırmızı, yeşil ve mavi için 0 ile 255 arasında değer alır ve bu tam bir bayttır. Bir bayt iki hex basamakla yazıldığı için altı haneli kod üç kanalı kısa ve düzenli biçimde gösterir; #FF8800 turuncudur."],
    ["Sekizlik (oktal) sistem nedir?", "Sekizlik sistem 8 tabanlıdır ve yalnızca 0–7 rakamlarını kullanır. Her basamak 3 bite denk gelir. Günümüzde en çok Unix ve Linux dosya izinlerinde görülür; 755 izni ondalık 493 sayısına karşılık gelir."],
    ["Hex ile ikilik sistem arasındaki ilişki nedir?", "16 sayısı 2'nin dördüncü kuvveti olduğu için her hex basamak tam olarak dört ikilik basamağa karşılık gelir. Bu sayede çeviri hesap gerektirmez; bitler sağdan dörderli gruplanıp her grup tek bir hex basamakla yazılır."],
    ["Hex sayılarla toplama nasıl yapılır?", "Basamaklar sağdan toplanır; toplam 16 veya daha büyükse 16 çıkarılıp sonuç yazılır ve sola 1 elde aktarılır. Örneğin 9A + 7C işleminde sonuç 116 çıkar, ondalık karşılığıyla 154 + 124 = 278 kontrolü yapılabilir."],
    ["0x öneki ne anlama gelir?", "0x öneki, ardından gelen sayının onaltılık olduğunu belirtmek için programlama dillerinde kullanılan bir işarettir. 0x10 ondalık 16, 0xFF ondalık 255 demektir; önek sayının değerine katılmaz, yalnızca tabanı gösterir."]
  ],
  tools: ["onaltilik-ondalik-cevir", "onaltilik-hesap-makinesi", "sayi-tabani-donustur", "sekizlik-ondalik-cevir"],
  related: ["ikilik-sayi-sistemi-nasil-cevrilir", "hex-rgb-renk-kodlari-nedir", "ascii-unicode-utf8-farki", "ipv6-nedir-ipv4-farki"],
  sources: [
    ["MEB – Bilişim Teknolojileri alanı ders materyalleri", "https://www.meb.gov.tr/"],
    ["W3C – CSS Color Module (onaltılık renk gösterimi)", "https://www.w3.org/TR/css-color-4/"]
  ]
};
