export default {
  slug: "elips-nedir-alani-ve-cevresi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Elips Nedir? Alanı, Çevresi, Odak Noktaları ve Dış Merkezlik",
  pageTitle: "Elips Nedir? Elipsin Alanı, Çevresi, Odakları ve Dış Merkezliği",
  description: "Elipsin alanı π·a·b'dir; çevresi için tam basit formül yoktur, Ramanujan yaklaşımı kullanılır. Odak uzaklığı c = √(a² − b²), dış merkezlik e = c/a. Çözümlü örnekler.",
  keywords: ["elips nedir", "elips alanı", "elips çevresi", "elipsin odak noktası", "dış merkezlik", "elips formülü", "ramanujan elips çevresi", "yörünge elips"],
  lead: "Elips, <strong>iki sabit noktaya (odaklara) olan uzaklıkları toplamı sabit kalan noktaların oluşturduğu kapalı eğridir</strong>; bu toplam, büyük eksen uzunluğuna (2a) eşittir. Yarı büyük eksen a, yarı küçük eksen b ise elipsin alanı A = π·a·b ile kesin olarak bulunur. Çevre için ise basit ve kesin bir formül yoktur; pratikte Ramanujan'ın yaklaşım formülü kullanılır. Bu sayfada formülleri, odak noktalarının ve dış merkezliğin nasıl bulunduğunu, hesaplanarak doğrulanmış örnekleri ve gezegen yörüngelerinin neden elips olduğunu bulacaksınız.",
  kisaCevap: [
    "Tanım: elips üzerindeki her noktanın iki odağa uzaklıkları toplamı 2a'dır.",
    "Alan: A = π × a × b; a = 5, b = 3 için A = 15π ≈ 47,12 birim².",
    "Odak uzaklığı: c = √(a² − b²); a = 5, b = 3 için c = 4, odaklar merkezden 4 birim uzaktadır.",
    "Dış merkezlik: e = c ÷ a; 0 ≤ e < 1; e = 0 daire, 1'e yaklaştıkça elips basıklaşır. Örnekte e = 0,8.",
    "Çevre (Ramanujan): P ≈ π[3(a + b) − √((3a + b)(a + 3b))]; a = 5, b = 3 için P ≈ 25,53 birim.",
    "Daire, a = b olan özel bir elipstir; bu durumda formüller πr² ve 2πr'ye dönüşür."
  ],
  figure: {
    alt: "Yarı büyük ekseni 5, yarı küçük ekseni 3 birim olan elips: merkez, iki odak noktası F1 ve F2 merkezden 4 birim uzakta, elips üzerindeki bir P noktasından odaklara uzaklıklar toplamı 10.",
    caption: "a = 5, b = 3 örneği. Odaklar merkezden c = √(25 − 9) = 4 birim uzaktadır. Elips üzerindeki herhangi bir P noktası için PF1 + PF2 = 2a = 10'dur; dış merkezlik e = 4 ÷ 5 = 0,8.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Elipsin parçaları (a = 5, b = 3)</text>
  <ellipse cx="300" cy="215" rx="225" ry="135" class="ps"/>
  <ellipse cx="300" cy="215" rx="225" ry="135" class="sp sw" fill="none"/>
  <line x1="75" y1="215" x2="525" y2="215" class="st dash" fill="none"/>
  <line x1="300" y1="80" x2="300" y2="350" class="st dash" fill="none"/>
  <line x1="300" y1="215" x2="525" y2="215" class="sp sw" fill="none"/>
  <text x="412" y="206" class="b mid p">a = 5</text>
  <line x1="300" y1="215" x2="300" y2="80" class="sok sw" fill="none"/>
  <text x="314" y="150" class="b ok">b = 3</text>
  <circle cx="120" cy="215" r="6" class="dg"/><text x="120" y="240" class="b mid dg">F1</text>
  <circle cx="480" cy="215" r="6" class="dg"/><text x="480" y="240" class="b mid dg">F2</text>
  <circle cx="300" cy="215" r="4" class="t"/>
  <text x="210" y="240" class="sm mid">c = 4</text>
  <circle cx="390" cy="91" r="6" class="p"/><text x="400" y="84" class="b">P</text>
  <line x1="120" y1="215" x2="390" y2="91" class="sa" fill="none"/>
  <line x1="480" y1="215" x2="390" y2="91" class="sa" fill="none"/>
  <rect x="540" y="70" width="165" height="270" rx="10" class="sf sb"/>
  <text x="622" y="98" class="b mid">Sonuçlar</text>
  <text x="556" y="130" class="sm">Alan = π·5·3</text>
  <text x="556" y="150" class="b">≈ 47,12</text>
  <text x="556" y="182" class="sm">Çevre (Ramanujan)</text>
  <text x="556" y="202" class="b">≈ 25,53</text>
  <text x="556" y="234" class="sm">Odak: c = √(25 − 9)</text>
  <text x="556" y="254" class="b">= 4</text>
  <text x="556" y="286" class="sm">e = c ÷ a</text>
  <text x="556" y="306" class="b">= 0,8</text>
  <text x="300" y="390" class="sm mid t2">PF1 + PF2 = 2a = 10 (elipsin her noktası için)</text>
</svg>`
  },
  sections: [
    {
      h: "Elips nedir?",
      p: [
        "Elips, düzlemde iki sabit noktaya olan uzaklıklarının toplamı sabit olan noktaların kümesidir. Bu iki sabit noktaya <strong>odak</strong> (F1 ve F2) denir. Elipsin her noktasından iki odağa çizilen doğru parçalarının uzunlukları toplamı, elipsin en uzun çapı olan büyük eksenin uzunluğuna, yani 2a'ya eşittir.",
        "Elipsin iki ekseni vardır. <strong>Büyük eksen</strong> odaklardan geçen en uzun çaptır; yarısına yarı büyük eksen (a) denir. <strong>Küçük eksen</strong> büyük eksene merkezde dik olan en kısa çaptır; yarısına yarı küçük eksen (b) denir. Her zaman a ≥ b'dir. Odaklar büyük eksen üzerinde, merkezden c kadar uzaktadır.",
        "Günlük hayatta elipsi her yerde görürsünüz: eğik tutulan bir bardağın ağzı, bir dairenin yandan görünüşü, oval masalar, stadyum planları, mimari kemerler ve gezegenlerin yörüngeleri. Analitik geometride merkezi orijinde olan, büyük ekseni x ekseni üzerindeki elipsin denklemi x²/a² + y²/b² = 1'dir."
      ]
    },
    {
      h: "Elipsin alanı nasıl hesaplanır?",
      p: [
        "Elipsin alanı, dairenin alan formülünün genelleştirilmiş hâlidir. Dairede iki yarıçap da r olduğu için alan πr² iken, elipste iki yarı eksen farklıdır ve alan bunların çarpımıyla bulunur. Bu formül kesindir; yaklaşım içermez."
      ],
      formula: "A = π × a × b\na: yarı büyük eksen · b: yarı küçük eksen\nÇapları biliyorsanız: A = π × (büyük çap ÷ 2) × (küçük çap ÷ 2)",
      ol: [
        "<strong>Örnek 1:</strong> a = 5 cm, b = 3 cm. A = π × 5 × 3 = 15π ≈ 47,12 cm².",
        "<strong>Örnek 2 (oval masa):</strong> Masa 120 cm × 80 cm. Yarı eksenler a = 60 cm, b = 40 cm. A = π × 60 × 40 = 2.400π ≈ 7.539,8 cm², yani yaklaşık 0,754 m².",
        "<strong>Kontrol:</strong> a = b = r alırsanız formül A = πr²'ye dönüşür; daire, elipsin özel hâlidir.",
        "<strong>Sık hata:</strong> Çapları doğrudan formüle koymak. 120 ve 80'i kullanırsanız sonuç dört kat büyük çıkar; önce ikiye bölün."
      ],
      after: [
        "Hesabı hızlıca yapmak için [[arac:elips-alani-hesapla|Elips Alanı ve Çevresi Hesaplama]] aracına iki ekseni girmeniz yeterlidir; araç alanı, çevreyi, dış merkezliği ve odak uzaklığını birlikte verir. Diğer düzlem şekillerinin formüllerini [[bilgi:alan-ve-hacim-formulleri|alan ve hacim formülleri]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Elipsin çevresi için neden tam formül yoktur?",
      p: [
        "Dairenin çevresi 2πr gibi basit bir formülle bulunur, ama elipsin çevresi için temel işlemlerle yazılabilen kesin bir formül yoktur. Çevre, matematikte <strong>eliptik integral</strong> denen ve kapalı biçimde temel fonksiyonlarla ifade edilemeyen bir integralle tanımlanır. Bu integral sayısal yöntemlerle istenen hassasiyette hesaplanabilir, ama \"π çarpı bir şey\" gibi kısa bir kesin formüle indirgenemez.",
        "Bu yüzden pratikte yaklaşım formülleri kullanılır. En basit yaklaşım π(a + b) olsa da elips basıklaştıkça hatası büyür. Daha iyi yaklaşımlar Hint matematikçi Srinivasa Ramanujan'ın 1914'te verdiği iki formüldür; bunlar günlük ve mühendislik hesaplarının neredeyse tamamı için yeterli doğruluk sağlar."
      ]
    },
    {
      h: "Ramanujan yaklaşımı nedir?",
      formula: "Ramanujan I: P ≈ π × [3(a + b) − √((3a + b)(a + 3b))]\nRamanujan II: h = (a − b)² ÷ (a + b)²\nP ≈ π × (a + b) × [1 + 3h ÷ (10 + √(4 − 3h))]",
      p: [
        "Birinci formül basit bir hesap makinesiyle kolayca uygulanır; ikinci formül daha da hassastır. Her ikisi de daire için (a = b) tam olarak 2πr sonucunu verir ve orta derecede basık elipslerde gerçek değerden ancak milyonda birler düzeyinde sapar."
      ],
      table: {
        head: ["Yöntem", "a = 5, b = 3 için çevre", "Gerçek değere göre hata"],
        rows: [
          ["Sayısal integral (gerçek değer)", "25,5270", "—"],
          ["Ramanujan I", "25,5270", "%0,0001'den az"],
          ["Ramanujan II", "25,5270", "ihmal edilebilir"],
          ["Basit yaklaşım π(a + b)", "25,1327", "%1,5 eksik"],
          ["Kök formülü 2π√((a² + b²) ÷ 2)", "25,9062", "%1,5 fazla"]
        ],
        caption: "Değerler hesaplanarak doğrulanmıştır. Elips basıklaştıkça basit yaklaşımların hatası büyür, Ramanujan formüllerinin hatası çok küçük kalır."
      },
      after: [
        "<strong>Adım adım (Ramanujan I, a = 5, b = 3):</strong> 3(a + b) = 3 × 8 = 24. (3a + b) = 18, (a + 3b) = 14; çarpımları 252, karekökü ≈ 15,8745. Fark 24 − 15,8745 = 8,1255. Çevre ≈ π × 8,1255 ≈ 25,527 birim.",
        "<strong>Oval masa örneği:</strong> a = 60 cm, b = 40 cm için Ramanujan I çevreyi ≈ 317,3 cm verir. Masanın kenarına şerit kaplayacaksanız yaklaşık 3,2 metre şerit gerekir. Basit π(a + b) formülü 314,2 cm vererek yaklaşık 3 cm eksik bırakırdı. Karekök hesabı için [[bilgi:karekok-nasil-alinir|karekök nasıl alınır]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "Odak noktaları nasıl bulunur?",
      p: [
        "Odaklar büyük eksen üzerinde, merkeze göre simetrik iki noktadır. Merkezden odağa olan uzaklık c ile gösterilir ve a, b, c arasında Pisagor bağıntısına benzeyen bir ilişki vardır: küçük eksenin ucundan bir odağa olan uzaklık a'ya eşittir; bu noktayı, merkezi ve odağı birleştiren dik üçgende a hipotenüs, b ve c dik kenarlardır."
      ],
      formula: "a² = b² + c²  →  c = √(a² − b²)\nOdaklar (merkez orijinde, büyük eksen x üzerinde): F1(−c, 0), F2(c, 0)",
      ul: [
        "a = 5, b = 3 için c = √(25 − 9) = √16 = 4; odaklar (−4, 0) ve (4, 0) noktalarındadır.",
        "a = 60 cm, b = 40 cm'lik masada c = √(3.600 − 1.600) = √2.000 ≈ 44,72 cm.",
        "a = b ise c = 0 olur; iki odak merkezde birleşir ve şekil daireye dönüşür."
      ],
      after: [
        "Bu ilişkinin dayandığı dik üçgen kuralını [[bilgi:pisagor-teoremi-nedir|Pisagor teoremi]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Dış merkezlik (eksantrisite) ne anlatır?",
      p: [
        "Dış merkezlik, elipsin ne kadar basık olduğunu tek bir sayıyla anlatır. Odak uzaklığının yarı büyük eksene oranı olarak tanımlanır: e = c ÷ a. Elipste bu değer her zaman 0 ile 1 arasındadır. e = 0 daire demektir; e büyüdükçe odaklar merkezden uzaklaşır ve elips uzayıp basıklaşır. e = 1 olduğunda şekil artık elips değil, paraboldür."
      ],
      table: {
        head: ["Dış merkezlik", "Şekil", "Örnek"],
        rows: [
          ["0", "Daire", "a = b"],
          ["≈ 0,0167", "Daireye çok yakın elips", "Dünya'nın yörüngesi"],
          ["0,6", "Belirgin oval", "a = 5, b = 4"],
          ["0,8", "Basık elips", "a = 5, b = 3"],
          ["≈ 0,97", "Çok uzun ve dar elips", "Halley kuyruklu yıldızının yörüngesi"]
        ],
        caption: "a = 5, b = 4 için c = 3 ve e = 0,6; a = 5, b = 3 için c = 4 ve e = 0,8."
      }
    },
    {
      h: "Gezegen yörüngeleri neden elipstir?",
      p: [
        "Johannes Kepler 1609'da, gezegenlerin Güneş etrafında daire değil, Güneş'in odaklarından birinde bulunduğu elips yörüngelerde dolandığını gösterdi. Bu, Kepler'in birinci yasası olarak bilinir. Isaac Newton daha sonra bunun nedenini açıkladı: uzaklığın karesiyle ters orantılı bir çekim kuvveti altında hareket eden bir cisim, kaçış hızına ulaşmadıkça kapalı bir elips yörünge izler.",
        "Dünya'nın yörüngesinin dış merkezliği yaklaşık 0,0167'dir; yani yörünge daireye çok yakındır. Yarı küçük eksenin yarı büyük eksene oranı √(1 − e²) ≈ 0,99986 olduğundan, yörüngeyi bir kâğıda çizseniz gözle daireden ayırt edemezsiniz. Buna rağmen Dünya ocak başında Güneş'e en yakın, temmuz başında en uzak noktadadır. Mevsimleri bu uzaklık farkı değil, Dünya'nın eksen eğikliği belirler. Bir cismin kapalı yörüngeden kurtulması için gereken hızı [[bilgi:kacis-hizi-nedir|kaçış hızı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "İp ve iki çiviyle elips nasıl çizilir?",
      p: [
        "Elipsin tanımı, onu çizmenin en pratik yolunu da verir. Bahçıvanlar, marangozlar ve tadilat ustaları oval havuz, çiçek tarhı ya da masa tablası çizerken bu yöntemi kullanır; bu yüzden \"bahçıvan elipsi\" olarak da anılır."
      ],
      ol: [
        "İstediğiniz elipsin büyük ve küçük çapını belirleyin; örneğin 120 cm × 80 cm. Yarı eksenler a = 60 cm, b = 40 cm olur.",
        "Odak uzaklığını hesaplayın: c = √(60² − 40²) ≈ 44,72 cm.",
        "Büyük eksen çizgisi üzerinde, merkezden iki yana 44,7 cm uzaklıkta iki çivi ya da raptiye çakın.",
        "Uzunluğu 2a = 120 cm olan bir ipin iki ucunu çivilere bağlayın.",
        "Kalemi ipin içine sokup ipi gergin tutarak çivilerin etrafında dolaştırın; çizilen eğri istediğiniz elipstir.",
        "Kontrol: kalem küçük eksenin ucundayken (merkezin 40 cm üstünde) ipin iki yarısı eşit ve 60'ar cm olmalıdır."
      ],
      after: [
        "İpin esnememesi önemlidir; esneyen bir lastik ya da ince örgü ip, eğrinin bir yanını diğerinden geniş çizer. Büyük ölçekli çizimlerde (örneğin bahçede) ip yerine ince bir tel ya da çelik şerit metre daha düzgün sonuç verir. Daire ve daire dilimiyle ilgili hesaplar için [[arac:daire-alani-hesapla|Daire Alanı Hesaplama]] aracını kullanabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Elips nedir?", "Elips, iki sabit noktaya (odaklara) olan uzaklıkları toplamı sabit kalan noktaların oluşturduğu kapalı eğridir. Bu toplam büyük eksenin uzunluğuna, yani 2a'ya eşittir; daire, iki odağın çakıştığı özel bir elipstir."],
    ["Elipsin alanı nasıl hesaplanır?", "Elipsin alanı A = π × a × b formülüyle kesin olarak bulunur; a yarı büyük eksen, b yarı küçük eksendir. a = 5 ve b = 3 için alan 15π, yani yaklaşık 47,12 birim karedir."],
    ["Elipsin çevresi için neden tam formül yoktur?", "Elipsin çevresi eliptik integral denen bir integralle tanımlanır ve bu integral temel fonksiyonlarla kısa bir kesin formüle indirgenemez. Bu nedenle pratikte Ramanujan'ın yaklaşım formülleri kullanılır."],
    ["Ramanujan yaklaşımı nedir?", "Ramanujan'ın 1914'te verdiği formül P ≈ π[3(a + b) − √((3a + b)(a + 3b))] şeklindedir. a = 5, b = 3 için yaklaşık 25,527 sonucunu verir ve gerçek değerden yalnızca milyonda birler düzeyinde sapar."],
    ["Odak noktaları nasıl bulunur?", "Odaklar büyük eksen üzerinde, merkezden c = √(a² − b²) uzaklıktadır. a = 5, b = 3 için c = 4 olur ve odaklar merkezin iki yanında 4'er birim uzaklıkta bulunur."],
    ["Dış merkezlik (eksantrisite) ne anlatır?", "Dış merkezlik e = c ÷ a oranıdır ve elipsin ne kadar basık olduğunu gösterir. 0 daire demektir, değer 1'e yaklaştıkça elips uzar; a = 5, b = 3 için e = 0,8'dir."],
    ["Gezegen yörüngeleri neden elipstir?", "Kepler'in birinci yasasına göre gezegenler, Güneş'in bir odakta bulunduğu elips yörüngelerde dolanır. Newton bunu uzaklığın karesiyle ters orantılı çekim kuvvetinin doğal sonucu olarak açıkladı; Dünya'nın yörüngesinde e yaklaşık 0,0167'dir."],
    ["İp ve iki çiviyle elips nasıl çizilir?", "Odak uzaklığı c'yi hesaplayıp iki çiviyi merkezden c uzaklığa çakın, uzunluğu 2a olan ipin uçlarını çivilere bağlayın ve kalemle ipi gergin tutarak dolaşın. Çizilen eğri istenen elipstir."],
    ["Oval masanın alanı nasıl bulunur?", "Masanın uzun ve kısa çaplarını ölçüp ikiye bölerek a ve b'yi bulun, ardından π × a × b ile çarpın. 120 × 80 cm'lik masa için alan yaklaşık 7.540 cm², yani 0,754 metrekaredir."]
  ],
  tools: ["elips-alani-hesapla", "daire-alani-hesapla", "alan-cevre-hesapla"],
  related: ["alan-ve-hacim-formulleri", "pisagor-teoremi-nedir", "daire-dilimi-ve-yay-uzunlugu", "kacis-hizi-nedir"]
};
