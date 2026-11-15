export default {
  slug: "ikilik-sayi-sistemi-nasil-cevrilir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "İkilik Sayı Sistemi Nedir? Binary, Onluk ve Onaltılık Çevirme Yöntemi",
  pageTitle: "İkilik Sayı Sistemi: Onluktan İkiliğe ve Onaltılığa Çevirme",
  description: "Onluk sayı 2'ye art arda bölünüp kalanlar aşağıdan yukarı yazılarak ikiliğe çevrilir: 45 = 101101. Ters çeviri, hex ve sekizlik taban, toplama, ikiye tümleyen.",
  keywords: ["ikilik sayı sistemi", "binary çevirme", "onluk sayıyı ikiliğe çevirme", "onaltılık sayı sistemi", "sayı tabanları", "ikilik sistemde toplama", "ikiye tümleyen", "sekizlik taban"],
  lead: "İkilik (binary) sayı sistemi, <strong>yalnızca 0 ve 1 rakamlarını kullanan ve her basamağı 2'nin bir kuvvetini gösteren</strong> 2 tabanlı sayı sistemidir. Onluk bir sayı ikiliğe, sayı 0 olana kadar art arda 2'ye bölünüp kalanlar aşağıdan yukarı yazılarak çevrilir: 45 sayısı ikilikte 101101'dir. Tersi için her 1'in basamak değeri (1, 2, 4, 8, 16, 32…) toplanır. Bu sayfada iki yönlü çevirmeyi, onaltılık ve sekizlik tabanları, ikilik sistemde toplamayı, negatif sayıların ikiye tümleyenle gösterimini ve bilgisayarların neden ikilik sistem kullandığını çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "İkilik sistemde basamak değerleri sağdan sola 1, 2, 4, 8, 16, 32, 64, 128… diye ikişer kat artar.",
    "Onluktan ikiliğe: sayıyı 2'ye böl, kalanı yaz, bölümle devam et; kalanları aşağıdan yukarı oku. 45 → 101101.",
    "İkilikten onluğa: 1 olan basamakların değerlerini topla. 101101 = 32 + 8 + 4 + 1 = 45.",
    "Onaltılık (hex) tabanda her hane 4 bite denk gelir: 0010 1101 = 2D; sekizlik tabanda her hane 3 bittir: 101 101 = 55.",
    "İkilik toplamada 1 + 1 = 10'dur; 0 yazılır, 1 elde bir sonraki basamağa aktarılır.",
    "Negatif sayılar ikiye tümleyenle gösterilir: bitleri ters çevir, 1 ekle. 8 bitte −5 = 11111011."
  ],
  figure: {
    alt: "45 sayısının 2'ye art arda bölünmesi: 45, 22, 11, 5, 2, 1 bölümleri ve 1, 0, 1, 1, 0, 1 kalanları; kalanlar aşağıdan yukarı okununca 101101. Sağda basamak değerleri 32, 16, 8, 4, 2, 1 ile sağlama.",
    caption: "Solda bölme merdiveni: ilk kalan en sağdaki (en düşük değerli) bittir, bu yüzden kalanlar aşağıdan yukarı okunur. Sağda aynı sonucun basamak değerleriyle sağlaması: 32 + 8 + 4 + 1 = 45.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">45 sayısını ikiliğe çevirmek</text>
  <g>
    <text x="40" y="70" class="sm b">Bölme</text><text x="200" y="70" class="sm b mid">Bölüm</text><text x="290" y="70" class="sm b mid">Kalan</text>
    <rect x="30" y="80" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="103">45 ÷ 2</text><text x="200" y="103" class="mid">22</text><text x="290" y="103" class="mid b p">1</text>
    <rect x="30" y="118" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="141">22 ÷ 2</text><text x="200" y="141" class="mid">11</text><text x="290" y="141" class="mid b p">0</text>
    <rect x="30" y="156" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="179">11 ÷ 2</text><text x="200" y="179" class="mid">5</text><text x="290" y="179" class="mid b p">1</text>
    <rect x="30" y="194" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="217">5 ÷ 2</text><text x="200" y="217" class="mid">2</text><text x="290" y="217" class="mid b p">1</text>
    <rect x="30" y="232" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="255">2 ÷ 2</text><text x="200" y="255" class="mid">1</text><text x="290" y="255" class="mid b p">0</text>
    <rect x="30" y="270" width="300" height="34" rx="4" class="sf sb"/><text x="40" y="293">1 ÷ 2</text><text x="200" y="293" class="mid">0</text><text x="290" y="293" class="mid b p">1</text>
  </g>
  <line x1="345" y1="294" x2="345" y2="96" class="sp sw" fill="none"/>
  <polygon points="337,98 353,98 345,84" class="p"/>
  <text x="180" y="336" class="b mid">Aşağıdan yukarı oku:</text>
  <rect x="80" y="348" width="200" height="44" rx="8" class="p"/>
  <text x="180" y="378" class="lg b mid sf">101101</text>
  <line x1="380" y1="60" x2="380" y2="400" class="sb dash" fill="none"/>
  <text x="550" y="70" class="b mid">Sağlama: basamak değerleri</text>
  <g class="mid">
    <text x="425" y="110" class="sm t2">32</text><text x="475" y="110" class="sm t2">16</text><text x="525" y="110" class="sm t2">8</text>
    <text x="575" y="110" class="sm t2">4</text><text x="625" y="110" class="sm t2">2</text><text x="675" y="110" class="sm t2">1</text>
    <rect x="405" y="120" width="40" height="44" rx="6" class="ps"/><text x="425" y="149" class="lg b">1</text>
    <rect x="455" y="120" width="40" height="44" rx="6" class="sf sb"/><text x="475" y="149" class="lg">0</text>
    <rect x="505" y="120" width="40" height="44" rx="6" class="ps"/><text x="525" y="149" class="lg b">1</text>
    <rect x="555" y="120" width="40" height="44" rx="6" class="ps"/><text x="575" y="149" class="lg b">1</text>
    <rect x="605" y="120" width="40" height="44" rx="6" class="sf sb"/><text x="625" y="149" class="lg">0</text>
    <rect x="655" y="120" width="40" height="44" rx="6" class="ps"/><text x="675" y="149" class="lg b">1</text>
  </g>
  <text x="550" y="198" class="b mid">32 + 8 + 4 + 1 = 45</text>
  <rect x="405" y="230" width="290" height="160" rx="10" class="sf sb"/>
  <text x="420" y="258" class="b">Aynı sayı diğer tabanlarda</text>
  <text x="420" y="288">Onaltılık: 0010 1101 → 2D</text>
  <text x="420" y="316">Sekizlik: 101 101 → 55</text>
  <text x="420" y="344">Onluk: 45</text>
  <text x="420" y="372" class="sm t2">Hex 4 bitlik, sekizlik 3 bitlik gruplarla okunur.</text>
</svg>`
  },
  sections: [
    {
      h: "Sayı tabanı nedir? Onluk sistemden ikilik sisteme",
      p: [
        "Günlük hayatta kullandığımız onluk sistemde 0'dan 9'a kadar on rakam vardır ve her basamak bir öncekinin 10 katı değer taşır. 345 sayısı aslında 3 × 100 + 4 × 10 + 5 × 1 demektir. Bu yapıya <strong>basamak değerli sayı sistemi</strong>, kullanılan rakam sayısına da <strong>taban</strong> denir.",
        "İkilik sistem aynı mantığı 2 tabanıyla kurar. Yalnızca 0 ve 1 rakamları vardır ve her basamak bir öncekinin 2 katıdır. Sağdan sola basamak değerleri 1, 2, 4, 8, 16, 32, 64, 128 diye gider; bunlar 2<sup>0</sup>, 2<sup>1</sup>, 2<sup>2</sup>… şeklinde 2'nin kuvvetleridir. İkilik sistemde bir basamağa <strong>bit</strong>, sekiz bitlik gruba <strong>bayt</strong> denir.",
        "Hangi tabanda yazıldığı karışabilecek sayılarda taban alt simgeyle belirtilir: 101<sub>2</sub> ikilik 101'dir ve onlukta 5 eder; 101<sub>10</sub> ise yüz birdir. Programlama dillerinde ikilik sayıların başına <code>0b</code>, onaltılık sayıların başına <code>0x</code> yazılır."
      ]
    },
    {
      h: "Onluk sayı ikiliğe nasıl çevrilir?",
      p: [
        "En yaygın yöntem art arda 2'ye bölmedir. Sayıyı 2'ye bölün, kalanı (0 ya da 1) not edin, bölümü yeniden 2'ye bölün; bölüm 0 olana kadar devam edin. Sonra kalanları <strong>sondan başa</strong>, yani aşağıdan yukarı doğru yan yana yazın."
      ],
      ol: [
        "45 ÷ 2 = 22, kalan 1 (en sağdaki bit)",
        "22 ÷ 2 = 11, kalan 0",
        "11 ÷ 2 = 5, kalan 1",
        "5 ÷ 2 = 2, kalan 1",
        "2 ÷ 2 = 1, kalan 0",
        "1 ÷ 2 = 0, kalan 1 (en soldaki bit)",
        "Kalanlar aşağıdan yukarı: <strong>101101</strong>. Yani 45<sub>10</sub> = 101101<sub>2</sub>."
      ],
      after: [
        "İkinci yöntem çıkarma yöntemidir ve küçük sayılarda daha hızlıdır. Sayıya sığan en büyük 2 kuvvetini bulun, çıkarın ve o basamağa 1 yazın; kalanla devam edin. 45 için 32 sığar (kalan 13), 16 sığmaz (0), 8 sığar (kalan 5), 4 sığar (kalan 1), 2 sığmaz (0), 1 sığar (kalan 0): yine 101101 bulunur.",
        "Ondalık kesirler için yöntem tersine işler: kesirli kısım 2 ile çarpılır, tam kısım bit olarak yazılır ve kesirle devam edilir. 0,625 × 2 = 1,25 → 1; 0,25 × 2 = 0,5 → 0; 0,5 × 2 = 1,0 → 1; sonuç 0,101<sub>2</sub>. 0,1 gibi bazı onluk kesirler ise ikilikte sonsuz tekrar eder; bilgisayarda 0,1 + 0,2 işleminin tam 0,3 çıkmamasının nedeni budur."
      ]
    },
    {
      h: "İkilik sayı onluğa nasıl çevrilir?",
      p: [
        "Ters yön daha kolaydır: her bitin altına basamak değerini yazın ve 1 olan basamakların değerlerini toplayın. 0 olan basamaklar toplama katılmaz."
      ],
      formula: "Onluk değer = Σ (bit × 2^konum)   (konum sağdan 0'dan başlar)\n101101 = 1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 45\n11111111 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255",
      table: {
        head: ["Onluk", "İkilik", "Onluk", "İkilik"],
        rows: [
          ["0", "0", "8", "1000"],
          ["1", "1", "9", "1001"],
          ["2", "10", "10", "1010"],
          ["3", "11", "11", "1011"],
          ["4", "100", "12", "1100"],
          ["5", "101", "13", "1101"],
          ["6", "110", "14", "1110"],
          ["7", "111", "15", "1111"]
        ],
        caption: "0–15 arası sayıların ikilik karşılığı. Bu 16 satır, onaltılık sisteme geçişin de anahtarıdır."
      },
      after: [
        "n bitle yazılabilecek en büyük sayı 2<sup>n</sup> − 1'dir: 4 bitle 15, 8 bitle 255, 16 bitle 65.535. Bir bayt bu yüzden 256 farklı değer alır; renk kodlarında her rengin 0–255 aralığında olması da buradan gelir. Sayıları elle çevirdikten sonra [[arac:ikili-ondalik-cevir|İkili Ondalık Çevirici]] ile sağlama yapabilirsiniz; araç sonucu dörtlü bit gruplarıyla gösterir."
      ]
    },
    {
      h: "Onaltılık (hex) ve sekizlik sayı sistemi nedir?",
      p: [
        "Uzun ikilik sayılar insan için okunması zor dizilerdir. <strong>Onaltılık (hexadecimal) sistem</strong> bu sorunu çözer: 16 = 2<sup>4</sup> olduğu için her onaltılık hane tam olarak 4 bite karşılık gelir. 0–9'dan sonra 10 için A, 11 için B, 12 için C, 13 için D, 14 için E, 15 için F kullanılır.",
        "Çevirmek için ikilik sayıyı sağdan başlayarak 4'erli gruplara ayırıp her grubu tek bir hex haneye dönüştürmeniz yeterlidir. 101101 sayısı soldan sıfırla tamamlanınca 0010 1101 olur; 0010 = 2, 1101 = D, sonuç 2D<sub>16</sub>'dır. Tersine, 0xFF = 1111 1111 = 255'tir.",
        "<strong>Sekizlik (oktal) sistem</strong> aynı fikri 3 bitlik gruplarla uygular, çünkü 8 = 2<sup>3</sup>'tür. 101101 → 101 101 → 55<sub>8</sub>. Sekizlik taban bugün en çok Linux ve Unix sistemlerindeki dosya izinlerinde karşınıza çıkar: 755 izni 111 101 101 bitlerine, yani sahibine okuma-yazma-çalıştırma, diğerlerine okuma-çalıştırma iznine karşılık gelir."
      ],
      table: {
        head: ["Kullanım alanı", "Taban", "Örnek"],
        rows: [
          ["Web renk kodları", "Onaltılık", "#FF8800 → kırmızı 255, yeşil 136, mavi 0"],
          ["Ağ kartı (MAC) adresi", "Onaltılık", "00:1A:2B:3C:4D:5E"],
          ["IPv6 adresleri", "Onaltılık", "2001:db8::1"],
          ["Bellek adresi ve hata kodları", "Onaltılık", "0x0000007B"],
          ["Linux dosya izinleri", "Sekizlik", "chmod 755"],
          ["Alt ağ maskesi", "İkilik", "255.255.255.0 = 24 adet 1 biti"]
        ]
      },
      after: [
        "Renk kodlarında onaltılık sistemin nasıl kullanıldığını [[bilgi:hex-rgb-renk-kodlari-nedir|HEX ve RGB renk kodları]] yazısında ayrıntılı bulabilirsiniz. Onaltılık ile onluk arasında hızlı çeviri için [[arac:onaltilik-ondalik-cevir|Onaltılık Ondalık Çevirici]], 2 ile 36 arasındaki herhangi iki taban için [[arac:sayi-tabani-donustur|Sayı Tabanı Dönüştürücü]] kullanılabilir."
      ]
    },
    {
      h: "İkilik sistemde toplama ve çıkarma nasıl yapılır?",
      p: [
        "İkilik toplama, onluk sistemdeki eldeli toplamanın aynısıdır; yalnızca \"10 olunca elde\" yerine \"2 olunca elde\" kuralı geçerlidir. Dört temel kural vardır: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (0 yaz, 1 elde), 1 + 1 + 1 = 11 (1 yaz, 1 elde)."
      ],
      formula: "    1011   (11)\n  + 0110   ( 6)\n  ------\n   10001   (17)",
      ol: [
        "En sağ basamak: 1 + 0 = 1, elde yok.",
        "İkinci basamak: 1 + 1 = 10 → 0 yaz, 1 elde.",
        "Üçüncü basamak: 0 + 1 + 1 (elde) = 10 → 0 yaz, 1 elde.",
        "Dördüncü basamak: 1 + 0 + 1 (elde) = 10 → 0 yaz, 1 elde.",
        "Kalan elde en sola yazılır: sonuç 10001 = 16 + 1 = 17. Onlukta 11 + 6 = 17, sağlama tamam."
      ],
      after: [
        "Çıkarmada ise 0 − 1 işleminde bir soldaki basamaktan \"2\" ödünç alınır. Bilgisayarlar çıkarmayı genellikle doğrudan yapmaz; çıkarılacak sayının ikiye tümleyenini alıp toplar. Toplama, çıkarma, çarpma ve bölmeyi ikilik olarak yapıp sonucu onlukla doğrulamak için [[arac:ikili-sayi-islem|İkili Sayı İşlem aracı]] kullanılabilir."
      ]
    },
    {
      h: "İkiye tümleyen nedir? Negatif sayıların gösterimi",
      p: [
        "Bilgisayar belleğinde eksi işareti yoktur; negatif sayıların da bitlerle gösterilmesi gerekir. Günümüzde neredeyse bütün işlemciler <strong>ikiye tümleyen</strong> yöntemini kullanır. Sabit bit sayısında (ör. 8 bit) bir sayının negatifi şöyle bulunur: sayının bütün bitleri ters çevrilir (0'lar 1, 1'ler 0 olur), sonra sonuca 1 eklenir."
      ],
      formula: "+5      = 0000 0101\nTers çevir = 1111 1010\n+1      = 1111 1011  → −5\nSağlama: 0000 0101 + 1111 1011 = 1 0000 0000 → 8 bitte 0",
      after: [
        "Bu yöntemde en soldaki bit işaret biti gibi davranır: 0 ise sayı pozitif, 1 ise negatiftir. 8 bitlik işaretli bir sayı −128 ile +127 arasında değer alır; 16 bitte bu aralık −32.768 ile +32.767'dir. İkiye tümleyenin asıl avantajı, işlemcinin toplama ve çıkarmayı aynı devreyle yapabilmesidir. Aralık aşıldığında oluşan taşma (overflow), bir oyunda puanın birden eksiye dönmesi gibi tuhaf hataların klasik nedenidir."
      ]
    },
    {
      h: "Bilgisayarlar neden ikilik sistem kullanır?",
      p: [
        "Bir bilgisayarın temel yapı taşı olan transistör, açık ya da kapalı olmak üzere iki durumda en güvenilir şekilde çalışır. Elektrik sinyalinde iki seviyeyi (gerilim var ya da yok) ayırt etmek, on farklı seviyeyi ayırt etmekten çok daha kolay ve gürültüye karşı çok daha dayanıklıdır. Küçük bir parazit 3 ile 4 arasındaki farkı bozabilir, ama 0 ile 1 arasındaki belirgin farkı nadiren bozar.",
        "İkilik sistem mantık cebiriyle de birebir örtüşür: 1 doğru, 0 yanlış demektir ve VE, VEYA, DEĞİL gibi mantık kapıları ikilik aritmetiğin tüm işlemlerini kurmaya yeter. Metin, ses, görüntü ve video da sonunda bitlere çevrilerek saklanır. Bir harfin kaç bitle saklandığı ve bunun dosya boyutuna etkisi için [[bilgi:gb-kac-mb-veri-birimleri|veri birimleri]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Sayı tabanı çevirirken sık yapılan hatalar",
      ul: [
        "<strong>Kalanları yukarıdan aşağı okumak:</strong> İlk bulunan kalan en sağdaki bittir. 45'in sonucu 101101 tesadüfen simetrik olduğu için fark edilmez; ama 6 için doğru sonuç 110 iken yukarıdan okuyan 011 = 3 bulur.",
        "<strong>Hex gruplamayı soldan yapmak:</strong> 4'lü gruplar her zaman sağdan başlar; eksik kalan sol grup başına sıfır eklenerek tamamlanır.",
        "<strong>Basamak değerini 1'den değil 2'den başlatmak:</strong> En sağdaki bitin değeri 2<sup>0</sup> = 1'dir.",
        "<strong>İkiye tümleyende 1 eklemeyi unutmak:</strong> Yalnızca bitleri ters çevirmek birlere tümleyeni verir ve sonuç bir eksik çıkar.",
        "<strong>Bit sayısını belirtmemek:</strong> 11111011, 8 bit işaretli yorumda −5, işaretsiz yorumda 251'dir; bağlam belirtilmelidir."
      ]
    }
  ],
  faq: [
    ["İkilik sayı sistemi nedir?", "İkilik sayı sistemi yalnızca 0 ve 1 rakamlarını kullanan 2 tabanlı sayı sistemidir. Her basamak sağdan sola 1, 2, 4, 8, 16 diye 2'nin kuvvetlerini gösterir; bilgisayarlar tüm veriyi bu sistemde saklar ve işler."],
    ["Onluk sayı ikiliğe nasıl çevrilir?", "Sayı bölüm 0 olana kadar art arda 2'ye bölünür ve her adımın kalanı yazılır. Kalanlar aşağıdan yukarı okunarak ikilik sayı elde edilir; örneğin 45 sayısı bu yöntemle 101101 bulunur."],
    ["İkilik sayı onluğa nasıl çevrilir?", "Her bitin altına sağdan başlayarak 1, 2, 4, 8, 16, 32 gibi basamak değerleri yazılır ve 1 olan basamakların değerleri toplanır. 101101 için 32 + 8 + 4 + 1 = 45 bulunur."],
    ["Onaltılık (hex) sayı sistemi nedir?", "Onaltılık sistem 0–9 rakamları ile A–F harflerini kullanan 16 tabanlı sistemdir. Her hanesi tam 4 bite karşılık geldiği için uzun ikilik sayıları kısa yazmakta, renk kodlarında ve bellek adreslerinde kullanılır."],
    ["Bilgisayarlar neden ikilik sistem kullanır?", "Transistörler açık ve kapalı olmak üzere iki durumda en güvenilir çalışır ve iki gerilim seviyesini ayırt etmek gürültüye karşı çok dayanıklıdır. İkilik sistem ayrıca mantık cebiriyle birebir örtüştüğü için devre tasarımını kolaylaştırır."],
    ["İkilik sistemde toplama nasıl yapılır?", "Onluk sistemdeki eldeli toplama gibi yapılır, ancak 1 + 1 = 10 olduğu için 0 yazılıp 1 elde aktarılır. Örneğin 1011 ile 0110 toplandığında sonuç 10001, yani onlukta 11 + 6 = 17 olur."],
    ["Sekizlik taban nerede kullanılır?", "Sekizlik taban her hanesi 3 bite denk geldiği için ikilik sayıları gruplamakta kullanılır. Bugün en yaygın kullanımı Linux ve Unix dosya izinleridir; 755 izni 111 101 101 bitlerine karşılık gelir."],
    ["İkiye tümleyen nedir?", "İkiye tümleyen, negatif sayıları bitlerle göstermenin standart yoludur. Sayının bütün bitleri ters çevrilir ve 1 eklenir; 8 bitte +5 = 00000101 iken −5 = 11111011 olur ve aralık −128 ile +127 arasıdır."]
  ],
  tools: ["sayi-tabani-donustur", "ikili-ondalik-cevir", "onaltilik-ondalik-cevir", "ikili-sayi-islem"],
  related: ["hex-rgb-renk-kodlari-nedir", "gb-kac-mb-veri-birimleri", "roma-rakamlari-tablosu"],
  sources: [
    ["MEB – Ortaöğretim Matematik ve Bilgisayar Bilimi öğretim programları", "https://mufredat.meb.gov.tr/"]
  ]
};
