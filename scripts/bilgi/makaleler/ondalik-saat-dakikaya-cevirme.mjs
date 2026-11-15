export default {
  slug: "ondalik-saat-dakikaya-cevirme",
  kategori: "calisma",
  tarih: "2026-11-15",
  title: "Ondalık Saat Dakikaya Nasıl Çevrilir? 1,5 Saat, 7,75 Saat Kaç Dakika",
  pageTitle: "Ondalık Saat Dakikaya Çevirme: 1,5 Saat, 7,75 Saat Kaç Dakika",
  description: "Ondalık saati dakikaya çevirmek için virgülden sonraki kısmı 60 ile çarpın: 1,5 saat 90 dakika, 7,75 saat 7 saat 45 dakikadır. Puantaj, mesai ve Excel örnekleri.",
  keywords: ["ondalık saat çevirme", "1,5 saat kaç dakika", "7,75 saat kaç saat kaç dakika", "saat dakika çevirme", "dakikayı ondalık saate çevirme", "mesai saati hesaplama", "giriş çıkış saati hesaplama", "excel saat ondalık"],
  lead: "Ondalık saati dakikaya çevirmek için <strong>virgülden sonraki kısmı 60 ile çarparsınız</strong>: 1,5 saat = 1 saat + 0,5 × 60 = 1 saat 30 dakika, yani 90 dakikadır; 7,75 saat ise 7 saat 45 dakikadır. Ters yönde dakikayı 60'a bölüp saate eklersiniz: 7 saat 45 dakika = 7 + 45 ÷ 60 = 7,75 saat. Puantaj tablolarında, bordrolarda ve Excel'de saatler genellikle ondalık tutulur çünkü ücret ve fazla mesai bu biçimle doğrudan çarpılabilir. Bu yazıda iki yönlü çevirmeyi, giriş-çıkıştan çalışma süresi bulmayı, haftalık toplamı ve sık yapılan hataları örneklerle anlatıyoruz.",
  kisaCevap: [
    "Ondalık saat → dakika: tam kısım saattir, virgülden sonraki kısım × 60 dakikadır (7,75 → 7 sa 45 dk).",
    "Toplam dakika = ondalık saat × 60; örneğin 1,5 saat × 60 = 90 dakika.",
    "Saat:dakika → ondalık saat: saat + dakika ÷ 60; örneğin 8 sa 20 dk = 8 + 20 ÷ 60 ≈ 8,33 saat.",
    "Çeyrekler akılda tutulur: 0,25 saat = 15 dk, 0,5 saat = 30 dk, 0,75 saat = 45 dk, 0,1 saat = 6 dk.",
    "7,30 saat 7 saat 30 dakika değildir; 7 saat 18 dakikadır. 7 saat 30 dakikanın ondalık karşılığı 7,5'tir.",
    "Excel saatleri günün kesri olarak saklar; ondalık saate çevirmek için hücreyi 24 ile çarpın."
  ],
  figure: {
    alt: "Saat kadranı dörde bölünmüş: 0,25 saat 15 dakika, 0,5 saat 30 dakika, 0,75 saat 45 dakika. Sağda 7,75 saatin 7 saat 45 dakikaya ve 8 saat 20 dakikanın 8,33 saate çevrilişi.",
    caption: "Bir saat 60 dakika olduğu için ondalık kısım 60 ile çarpılır. Kadrandaki çeyrekler en sık karşılaşılan değerlerdir; sağdaki iki kart iki yönlü çevirmeyi adım adım gösterir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Ondalık saat ile dakika arasında çeviri</text>
  <circle cx="170" cy="210" r="130" class="sf sb sw"/>
  <path d="M170 210 L170 80 A130 130 0 0 1 300 210 Z" class="ps"/>
  <path d="M170 210 L300 210 A130 130 0 0 1 170 340 Z" class="oks"/>
  <path d="M170 210 L170 340 A130 130 0 0 1 40 210 Z" class="ps"/>
  <line x1="170" y1="80" x2="170" y2="340" class="st" fill="none"/>
  <line x1="40" y1="210" x2="300" y2="210" class="st" fill="none"/>
  <circle cx="170" cy="210" r="6" class="p"/>
  <text x="170" y="70" class="sm mid b">0 / 60 dk</text>
  <text x="236" y="160" class="mid b">0,25</text><text x="236" y="178" class="sm mid">15 dk</text>
  <text x="236" y="258" class="mid b">0,50</text><text x="236" y="276" class="sm mid">30 dk</text>
  <text x="104" y="258" class="mid b">0,75</text><text x="104" y="276" class="sm mid">45 dk</text>
  <text x="104" y="160" class="mid b">1,00</text><text x="104" y="178" class="sm mid">60 dk</text>
  <text x="170" y="372" class="sm mid t2">0,1 saat = 6 dk · 0,2 saat = 12 dk</text>
  <rect x="350" y="62" width="350" height="140" rx="10" class="sf sb"/>
  <rect x="350" y="62" width="8" height="140" class="p"/>
  <text x="372" y="90" class="b p">Ondalık → saat ve dakika</text>
  <text x="372" y="120" class="lg b">7,75 saat</text>
  <text x="372" y="148">Tam kısım: 7 saat</text>
  <text x="372" y="172">0,75 × 60 = 45 dakika</text>
  <text x="372" y="194" class="b ok">Sonuç: 7 sa 45 dk (465 dk)</text>
  <rect x="350" y="222" width="350" height="140" rx="10" class="sf sb"/>
  <rect x="350" y="222" width="8" height="140" class="ok"/>
  <text x="372" y="250" class="b ok">Saat:dakika → ondalık</text>
  <text x="372" y="280" class="lg b">8 sa 20 dk</text>
  <text x="372" y="308">20 ÷ 60 = 0,333…</text>
  <text x="372" y="332">8 + 0,333 = 8,33 saat</text>
  <text x="372" y="354" class="sm t2">Ücret hesabında 8,33 × saatlik ücret</text>
</svg>`
  },
  sections: [
    {
      h: "Ondalık saat nedir, neden kullanılır?",
      p: [
        "Günlük hayatta süreyi \"7 saat 45 dakika\" ya da \"7:45\" biçiminde söyleriz. Bu yazım 60 tabanlıdır: 60 dakika dolduğunda bir saat olur. Hesap tablolarının, maaş programlarının ve hesap makinelerinin çoğu ise 10 tabanlı çalışır. Aynı süreyi 10 tabanında yazdığınızda <strong>ondalık saat</strong> elde edersiniz: 7 saat 45 dakika = 7,75 saat.",
        "Ondalık biçimin en büyük avantajı çarpma ve toplamayı kolaylaştırmasıdır. Saatlik ücreti 200 TL olan bir çalışanın 7 saat 45 dakikalık ücretini bulmak için 7,75 × 200 = 1.550 TL hesabı yeterlidir. Aynı işlemi saat:dakika biçimiyle yapmaya kalkarsanız önce dakikaları ayrı hesaplayıp sonra toplamanız gerekir. Bu yüzden puantaj cetvelleri, fazla mesai tabloları, proje zaman kayıtları ve faturalandırılan danışmanlık saatleri çoğunlukla ondalık tutulur.",
        "Sorun, iki biçimin birbirine çok benzemesidir. \"7,30\" yazan bir hücre bir kişi için yedi buçuk saat, başka biri için yedi saat otuz dakika anlamına gelebilir; oysa ikisi de değildir. Bu karışıklık bordro hatalarının ve çalışan-işveren anlaşmazlıklarının sık görülen kaynaklarından biridir."
      ]
    },
    {
      h: "Ondalık saati dakikaya çevirme formülü",
      formula: "Saat = ondalık sayının tam kısmı\nDakika = ondalık kısım × 60\nToplam dakika = ondalık saat × 60\nSaniye (gerekirse) = dakikanın ondalık kısmı × 60",
      p: [
        "Çevirme iki adımdır. Önce virgülün solundaki tam sayıyı saat olarak ayırırsınız. Sonra virgülün sağında kalan kısmı 60 ile çarparak dakikayı bulursunuz. Dakika da küsuratlı çıkarsa aynı işlemi bir kez daha yapıp saniyeye geçebilirsiniz.",
        "Yalnızca toplam dakikayı merak ediyorsanız ayırma yapmanıza gerek yoktur: ondalık saati doğrudan 60 ile çarpın. 1,5 saat × 60 = 90 dakika; 2,25 saat × 60 = 135 dakika; 7,75 saat × 60 = 465 dakika."
      ],
      ol: [
        "<strong>1,5 saat:</strong> tam kısım 1 saat; 0,5 × 60 = 30 dakika. Sonuç 1 saat 30 dakika, toplam 90 dakika.",
        "<strong>7,75 saat:</strong> tam kısım 7 saat; 0,75 × 60 = 45 dakika. Sonuç 7 saat 45 dakika, toplam 465 dakika.",
        "<strong>8,4 saat:</strong> tam kısım 8 saat; 0,4 × 60 = 24 dakika. Sonuç 8 saat 24 dakika.",
        "<strong>2,35 saat:</strong> tam kısım 2 saat; 0,35 × 60 = 21 dakika. Sonuç 2 saat 21 dakika.",
        "<strong>0,6 saat:</strong> tam kısım 0; 0,6 × 60 = 36 dakika. Sonuç 36 dakika.",
        "<strong>3,1416 saat:</strong> 0,1416 × 60 = 8,496 dakika; 0,496 × 60 ≈ 30 saniye. Sonuç yaklaşık 3 saat 8 dakika 30 saniye."
      ],
      after: [
        "Bu adımları her seferinde elle yapmak istemiyorsanız [[arac:ondalik-saat-cevir|Ondalık Saat Dakika Çevirici]] her iki yönde de anında sonuç verir."
      ]
    },
    {
      h: "Dakikayı ondalık saate çevirme",
      p: [
        "Ters yönde dakikayı 60'a bölüp saate eklersiniz. Puantajda bu yön daha sık kullanılır, çünkü giriş-çıkış kayıtları saat:dakika biçiminde gelir ama ücret ondalık saatle hesaplanır."
      ],
      formula: "Ondalık saat = saat + dakika ÷ 60\nYalnızca dakika verilmişse: ondalık saat = dakika ÷ 60",
      table: {
        head: ["Dakika", "Ondalık saat", "Dakika", "Ondalık saat"],
        rows: [
          ["5 dk", "0,0833", "35 dk", "0,5833"],
          ["6 dk", "0,10", "40 dk", "0,6667"],
          ["10 dk", "0,1667", "42 dk", "0,70"],
          ["12 dk", "0,20", "45 dk", "0,75"],
          ["15 dk", "0,25", "48 dk", "0,80"],
          ["18 dk", "0,30", "50 dk", "0,8333"],
          ["20 dk", "0,3333", "54 dk", "0,90"],
          ["24 dk", "0,40", "55 dk", "0,9167"],
          ["30 dk", "0,50", "60 dk", "1,00"]
        ],
        caption: "6'nın katı olan dakikalar (6, 12, 18, 24…) tam bir ondalık basamağa denk gelir. 10, 20, 40, 50 gibi değerler ise sonsuz devreden ondalık verir ve yuvarlanmalıdır."
      },
      after: [
        "Tablodaki ilginç ayrıntı şudur: 20 dakika 0,3333… saattir ve sonsuza kadar devreder. Bordroda bu değeri 0,33 ya da 0,34 olarak yuvarlamak gerekir. Tek bir günde fark önemsizdir, ama ay sonunda yüzlerce satır toplandığında kuruş farkları birikir. Mümkünse önce toplam dakikayı bulun, en sonda bir kez 60'a bölün; böylece yuvarlama hatası tek bir kez oluşur."
      ]
    },
    {
      h: "Giriş-çıkış saatinden günlük çalışma süresi",
      p: [
        "Günlük çalışma süresi, çıkış saatinden giriş saatinin çıkarılması ve ardından ücretsiz mola süresinin düşülmesiyle bulunur. Çıkarmayı saat:dakika biçiminde yaparken dakika eksik gelirse bir saati 60 dakika olarak ödünç alırsınız."
      ],
      ol: [
        "Giriş 08:40, çıkış 17:55 olsun. Dakikalar: 55 − 40 = 15 dakika. Saatler: 17 − 8 = 9 saat. Brüt süre 9 saat 15 dakikadır.",
        "Öğle arası 1 saattir; 9 saat 15 dakika − 1 saat = 8 saat 15 dakika net çalışma.",
        "Ondalığa çevirin: 8 + 15 ÷ 60 = 8,25 saat.",
        "Giriş 09:50, çıkış 18:20 gibi dakikanın eksik geldiği durumda: 20 − 50 yapılamayacağı için 18:20 yerine 17:80 yazın. 80 − 50 = 30 dakika, 17 − 9 = 8 saat; brüt 8 saat 30 dakika = 8,5 saat.",
        "Gece vardiyasında çıkış saati giriş saatinden küçükse (22:00 – 06:00) çıkışa 24 saat ekleyin: 30:00 − 22:00 = 8 saat."
      ],
      after: [
        "Çok sayıda gün için bu hesabı tek tek yapmak zahmetlidir. [[arac:calisma-suresi-hesapla|Çalışma Süresi (Giriş Çıkış) Hesaplama]] aracına giriş-çıkış saatlerini ve molayı yazdığınızda net süreyi hem saat-dakika hem ondalık saat olarak gösterir; gece vardiyasını da doğru hesaplar. Aylık puantajı nasıl tutacağınızı [[bilgi:puantaj-nasil-hesaplanir|puantaj nasıl hesaplanır]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "Haftalık toplam ve fazla mesai hesabı",
      p: [
        "Haftalık toplamı bulmanın en güvenli yolu her günü önce ondalık saate çevirip sonra toplamaktır. Saat:dakika biçimini doğrudan toplamaya çalışırsanız dakikaların 60'ı aştığı yerleri ayrıca düzeltmeniz gerekir. Aşağıdaki örnekte cumartesi de çalışılan bir hafta var."
      ],
      table: {
        head: ["Gün", "Giriş – çıkış", "Mola", "Net süre", "Ondalık saat"],
        rows: [
          ["Pazartesi", "08:40 – 17:55", "60 dk", "8 sa 15 dk", "8,25"],
          ["Salı", "09:00 – 17:30", "60 dk", "7 sa 30 dk", "7,50"],
          ["Çarşamba", "08:15 – 19:00", "60 dk", "9 sa 45 dk", "9,75"],
          ["Perşembe", "09:00 – 18:00", "60 dk", "8 sa 00 dk", "8,00"],
          ["Cuma", "08:30 – 18:00", "60 dk", "8 sa 30 dk", "8,50"],
          ["Cumartesi", "09:00 – 13:45", "yok", "4 sa 45 dk", "4,75"],
          ["Toplam", "", "", "46 sa 45 dk", "46,75"]
        ],
        caption: "Ondalık sütunu toplamak tek adımdır: 8,25 + 7,50 + 9,75 + 8,00 + 8,50 + 4,75 = 46,75 saat = 46 saat 45 dakika."
      },
      after: [
        "4857 sayılı İş Kanunu'na göre haftalık normal çalışma süresi en çok 45 saattir ve bunu aşan süre fazla çalışma sayılır. Örnekteki çalışanın fazla çalışması 46,75 − 45 = 1,75 saattir, yani 1 saat 45 dakika. Kanun fazla çalışmanın her saatini normal saat ücretinin yüzde elli fazlasıyla ödemeyi öngörür. Saatlik ücret örnek olarak 150 TL ise fazla çalışma ücreti 1,75 × 150 × 1,5 = 393,75 TL olur.",
        "Aynı hesabı 1 saat 45 dakikayı yanlışlıkla \"1,45 saat\" yazarak yaparsanız 1,45 × 150 × 1,5 = 326,25 TL bulursunuz; çalışan aleyhine 67,50 TL fark oluşur. Fazla mesai tutarını brüt ücretten adım adım bulmak için [[arac:mesai-hesapla|Fazla Mesai Hesaplama]] aracını, haftalık süre sınırları için [[bilgi:haftalik-calisma-suresi-kac-saat|haftalık çalışma süresi]] yazısını inceleyebilirsiniz."
      ]
    },
    {
      h: "Excel'de saatler neden ondalık görünür?",
      p: [
        "Excel (ve benzeri hesap tabloları) zamanı <strong>günün kesri</strong> olarak saklar. Bir gün 1'e eşittir; 12:00 öğlen 0,5'tir; 7:45 ise 7,75 ÷ 24 = 0,3229… değerindedir. Hücre biçimi \"Saat\" olduğunda bu sayı 7:45 olarak görünür; biçimi \"Genel\" ya da \"Sayı\" yaparsanız 0,3229 gibi anlamsız görünen bir değer ortaya çıkar.",
        "Excel'deki saat değerini ondalık saate çevirmek için hücreyi 24 ile çarparsınız: <code>=A2*24</code>. Sonucun hücre biçimini \"Sayı\" yapmayı unutmayın; aksi hâlde Excel çarpımı yine saat biçiminde göstermeye çalışır. Ondalık saati Excel saatine dönüştürmek için de tersini yapın: <code>=B2/24</code> ve biçimi saat olarak seçin.",
        "Bir başka sık sorun, 24 saati aşan toplamlardır. Haftalık 46:45 saatlik toplam, standart saat biçiminde 22:45 olarak görünür çünkü Excel tam günleri gizler. Türkçe Excel'de özel biçim olarak <code>[s]:dd</code> (İngilizce sürümde <code>[h]:mm</code>) yazarsanız köşeli parantez saatlerin 24'te sıfırlanmasını engeller ve doğru toplam görünür."
      ]
    },
    {
      h: "Hazır dönüşüm tablosu: sık kullanılan değerler",
      table: {
        head: ["Ondalık saat", "Saat ve dakika", "Toplam dakika"],
        rows: [
          ["0,25", "15 dk", "15"],
          ["0,5", "30 dk", "30"],
          ["0,75", "45 dk", "45"],
          ["1,25", "1 sa 15 dk", "75"],
          ["1,5", "1 sa 30 dk", "90"],
          ["2,2", "2 sa 12 dk", "132"],
          ["3,75", "3 sa 45 dk", "225"],
          ["4,5", "4 sa 30 dk", "270"],
          ["7,5", "7 sa 30 dk", "450"],
          ["7,75", "7 sa 45 dk", "465"],
          ["8,25", "8 sa 15 dk", "495"],
          ["9,6", "9 sa 36 dk", "576"],
          ["11,25", "11 sa 15 dk", "675"],
          ["45", "45 sa", "2.700"]
        ]
      },
      after: [
        "Tabloda olmayan bir değer için kısa yol: ondalık kısmın her 0,1'i 6 dakikadır. 0,7 saat 42 dakika, 0,9 saat 54 dakikadır. Yüzde birlik basamak (0,01) ise 0,6 dakika, yani 36 saniyedir. Gün ve hafta düzeyindeki dönüşümler için [[arac:gun-saat-cevir|Gün Saat Çevirici]] işinizi kolaylaştırır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Virgülden sonrasını dakika sanmak:</strong> 7,30 saat 7 saat 30 dakika değil, 7 saat 18 dakikadır. Yedi buçuk saat 7,5 diye yazılır.",
        "<strong>Saat:dakika değerlerini ondalık gibi toplamak:</strong> 7:45 + 8:30 işlemini 7,45 + 8,30 = 15,75 diye yapmak yanlıştır; doğru sonuç 16 saat 15 dakika, yani 16,25 saattir.",
        "<strong>Her satırda ayrı yuvarlamak:</strong> 20 dakikayı her gün 0,33 olarak yazıp 22 iş günü toplarsanız 7,26 saat bulursunuz; doğru değer 22 × 20 ÷ 60 = 7,33 saattir.",
        "<strong>Mola süresini unutmak:</strong> Giriş-çıkış farkı brüt süredir. İş sözleşmesinde ya da işyeri uygulamasında ücretsiz sayılan ara dinlenmesi düşülmeden fazla mesai hesaplanmaz.",
        "<strong>Gece yarısını geçen vardiyada negatif süre:</strong> 22:00 – 06:00 aralığında çıkıştan girişi doğrudan çıkarmak −16 saat verir. Çıkış saatine 24 ekleyin.",
        "<strong>Excel'de biçimi değiştirmemek:</strong> Saat hücresini 24 ile çarptıktan sonra sonucu yine saat biçiminde bırakırsanız anlamsız bir saat görürsünüz; sonuç hücresinin biçimi \"Sayı\" olmalıdır."
      ]
    },
    {
      h: "Ücretsiz araçlarla adım adım çevirme",
      ol: [
        "Ondalık Saat Dakika Çevirici sayfasını açın.",
        "Ondalık saatten dakikaya çevirmek için değeri virgüllü yazın (örnek 7,75); araç 7 saat 45 dakika ve toplam dakika karşılığını verir.",
        "Ters yönde saat ve dakikayı ayrı alanlara yazın (örnek 8 saat 20 dakika); araç 8,33 saati gösterir.",
        "Birden çok günün giriş-çıkışını hesaplayacaksanız Çalışma Süresi Hesaplama aracına geçin, molayı girin ve günlük net süreyi alın.",
        "Haftalık toplam 45 saati aşıyorsa fazla kısmı ondalık olarak not edin ve ücret hesabına aktarın."
      ],
      after: [
        "Tüm araçlar tarayıcınızda çalışır; yazdığınız saatler ya da ücret bilgileri bir sunucuya gönderilmez. İşyerinizde fazla çalışma ve ara dinlenmesiyle ilgili özel düzenlemeler (toplu iş sözleşmesi, denkleştirme) varsa son hesabı bu kurallara göre yapın."
      ]
    }
  ],
  faq: [
    ["Ondalık saat dakikaya nasıl çevrilir?", "Virgülün solundaki tam sayı saati verir, sağındaki ondalık kısım 60 ile çarpılarak dakika bulunur. Örneğin 2,4 saat 2 saat ve 0,4 × 60 = 24 dakika, yani 2 saat 24 dakikadır."],
    ["1,5 saat kaç dakikadır?", "1,5 saat 90 dakikadır. Bir tam saat 60 dakika, yarım saat 0,5 × 60 = 30 dakika eder ve ikisinin toplamı 90 dakikayı, yani 1 saat 30 dakikayı verir."],
    ["7,75 saat kaç saat kaç dakika eder?", "7,75 saat 7 saat 45 dakikadır. Tam kısım 7 saattir, ondalık kısım 0,75 × 60 = 45 dakikadır. Toplam dakika olarak 7,75 × 60 = 465 dakikaya karşılık gelir."],
    ["Dakika ondalık saate nasıl çevrilir?", "Dakikayı 60'a bölüp saate eklersiniz. 45 dakika 0,75 saat, 20 dakika yaklaşık 0,33 saat, 6 dakika 0,1 saattir. Örneğin 8 saat 20 dakika yaklaşık 8,33 saate karşılık gelir."],
    ["Excel'de saatler neden ondalık görünür?", "Excel zamanı günün kesri olarak saklar; bir gün 1 değerindedir ve 7:45 yaklaşık 0,3229 olarak tutulur. Hücreyi 24 ile çarpıp biçimini Sayı yaparsanız 7,75 gibi ondalık saat değerini görürsünüz."],
    ["Günlük çalışma süresi giriş–çıkıştan nasıl hesaplanır?", "Çıkış saatinden giriş saati çıkarılır, ardından ücretsiz mola süresi düşülür. 08:40 giriş, 17:55 çıkış ve 1 saat molada net süre 8 saat 15 dakika, yani 8,25 saattir."],
    ["Fazla mesai ondalık saatle nasıl hesaplanır?", "Haftalık toplam çalışma ondalık saat olarak bulunur ve 45 saati aşan kısım fazla çalışma sayılır. Bu süre saatlik ücretle ve kanundaki yüzde elli zamlı oranla, yani 1,5 ile çarpılarak ücret bulunur."],
    ["Haftalık toplam çalışma süresi nasıl toplanır?", "Her günün net süresini önce ondalık saate çevirip sonra toplamak en güvenli yoldur. Saat:dakika biçimini doğrudan toplarsanız 60'ı aşan dakikaları ayrıca saate çevirmeniz gerekir ve hata riski artar."],
    ["7,30 saat yedi buçuk saat mi demektir?", "Hayır. Ondalık yazımda 7,30 saat 7 saat 18 dakikadır çünkü 0,30 × 60 = 18 dakika eder. Yedi buçuk saat 7,5 olarak, 7 saat 30 dakika ise saat biçiminde 7:30 olarak yazılır."]
  ],
  tools: ["ondalik-saat-cevir", "saat-dakika-cevir", "calisma-suresi-hesapla", "mesai-hesapla", "gun-saat-cevir"],
  related: ["puantaj-nasil-hesaplanir", "haftalik-calisma-suresi-kac-saat", "resmi-tatilde-calisma-ucreti-nasil-hesaplanir"],
  sources: [
    ["Mevzuat Bilgi Sistemi – 4857 sayılı İş Kanunu", "https://www.mevzuat.gov.tr/"]
  ]
};
