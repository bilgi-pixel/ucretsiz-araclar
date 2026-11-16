export default {
  slug: "moduler-aritmetik-100-gun-sonra-hangi-gun",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Modüler Aritmetik: 100 Gün Sonra Hangi Gün? Mod Alma ve Saat Hesabı",
  pageTitle: "Modüler Aritmetik: 100 Gün Sonra Hangi Gün? Mod Alma",
  description: "Modüler aritmetik bölümden kalanla çalışır: 100 mod 7 = 2 olduğu için pazartesiden 100 gün sonra çarşambadır. Mod alma, denklik, negatif sayı ve üslerin kalanı.",
  keywords: ["modüler aritmetik", "mod alma nedir", "100 gün sonra hangi gün", "kalan bulma", "mod 7 gün hesabı", "saat aritmetiği", "denklik sınıfı", "büyük üslerin kalanı"],
  lead: "Modüler aritmetik, sayıların kendisiyle değil, belirli bir sayıya bölümünden kalanla çalışan aritmetiktir; bu yüzden \"saat aritmetiği\" de denir. Bugünden 100 gün sonrasının hangi gün olduğunu bulmak için 100'ü 7'ye bölersiniz: <strong>100 = 7 × 14 + 2</strong>, yani kalan 2'dir ve 100 gün sonra bugünden 2 gün sonraki haftanın günüdür. 16 Kasım 2026 pazartesi olduğu için 100 gün sonrası, 24 Şubat 2027, <strong>çarşambadır</strong>. Bu sayfada mod alma kuralını, denklik işaretini, negatif sayılarda kalanı, büyük üslerin kalanını ve şifrelemedeki kullanımı çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "a mod n, a'nın n'ye bölümünden kalandır ve 0 ile n − 1 arasında bir sayıdır: 100 mod 7 = 2.",
    "X gün sonra hangi gün: X mod 7 kadar gün ileri sayın; 100 gün sonra = 2 gün sonraki gün.",
    "a ≡ b (mod n) yazımı, a ile b'nin n'ye bölümünden aynı kalanı verdiğini, yani n'nin (a − b)'yi böldüğünü anlatır.",
    "Negatif sayıda matematiksel kalan pozitiftir: −17 mod 5 = 3; bazı programlama dilleri ise −2 verir.",
    "Büyük üslerde kalan döngüsü aranır: 2<sup>3</sup> ≡ 1 (mod 7) olduğu için 2<sup>100</sup> ≡ 2 (mod 7)."
  ],
  figure: {
    alt: "Haftanın günleri 7'lik bir saat kadranı gibi dizilmiş: pazartesiden başlayıp 100 gün ilerlemek, 14 tam tur ve 2 gün demektir; ok çarşambada durur. Yanında 100 = 7 × 14 + 2 bölme gösterimi.",
    caption: "Haftanın günleri 7'lik bir döngüdür. 100 günün 98'i (14 hafta) aynı güne geri getirir; geriye kalan 2 gün sonucu belirler. Örnek: 16 Kasım 2026 pazartesi + 100 gün = 24 Şubat 2027 çarşamba.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="uc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="p"/></marker></defs>
  <text x="360" y="30" class="lg b mid">100 gün sonra hangi gün? (mod 7)</text>
  <circle cx="200" cy="215" r="130" class="sf sb"/>
  <g class="mid">
    <circle cx="200" cy="85" r="30" class="p"/><text x="200" y="91" class="b sf">Pzt</text>
    <circle cx="302" cy="134" r="30" class="ps"/><text x="302" y="140" class="b">Sal</text>
    <circle cx="327" cy="244" r="30" class="oks"/><text x="327" y="250" class="b ok">Çar</text>
    <circle cx="256" cy="332" r="30" class="sf sb"/><text x="256" y="338" class="b">Per</text>
    <circle cx="144" cy="332" r="30" class="sf sb"/><text x="144" y="338" class="b">Cum</text>
    <circle cx="73" cy="244" r="30" class="sf sb"/><text x="73" y="250" class="b">Cmt</text>
    <circle cx="98" cy="134" r="30" class="sf sb"/><text x="98" y="140" class="b">Paz</text>
  </g>
  <path d="M232 92 Q290 100 300 102" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <path d="M318 162 Q335 200 330 210" class="sp sw" fill="none" marker-end="url(#uc)"/>
  <text x="200" y="210" class="mid b">14 tam tur</text>
  <text x="200" y="232" class="sm mid mu">(98 gün)</text>
  <text x="200" y="254" class="sm mid p b">+ 2 gün</text>
  <rect x="400" y="70" width="300" height="96" rx="8" class="p"/>
  <text x="550" y="104" class="lg mid b sf">100 = 7 × 14 + 2</text>
  <text x="550" y="136" class="mid sf">100 mod 7 = 2</text>
  <rect x="400" y="184" width="300" height="80" rx="8" class="sf sb"/>
  <text x="550" y="214" class="mid b">16.11.2026 Pazartesi</text>
  <text x="550" y="242" class="mid">+ 100 gün → 24.02.2027 Çarşamba</text>
  <rect x="400" y="282" width="300" height="96" rx="8" class="oks"/>
  <text x="550" y="310" class="mid b">Başka örnekler</text>
  <text x="550" y="334" class="sm mid">365 gün: 365 mod 7 = 1 → Salı</text>
  <text x="550" y="356" class="sm mid">1.000 gün: 1.000 mod 7 = 6 → Pazar</text>
</svg>`
  },
  sections: [
    {
      h: "Modüler aritmetik nedir?",
      p: [
        "Bir duvar saatini düşünün: saat 9'dan 5 saat sonra saat 14 değil, 2 olur. Çünkü saat kadranı 12'de başa döner. Modüler aritmetik bu \"başa dönen\" sayma biçiminin matematiksel adıdır. Bir sayının kendisiyle değil, belirli bir sayıya (modül) bölümünden kalanla ilgilenir. Saatte modül 12, haftanın günlerinde 7, ayın evrelerinde yaklaşık 29,5'tir.",
        "Modüler aritmetik ilk bakışta okul matematiğinin küçük bir konusu gibi görünse de günlük hayatın birçok hesabının altında yatar: \"bugünden 100 gün sonra hangi gün\", \"bu tarih hangi haftanın günü\", \"vardiya döngüsünde kimin sırası\" ya da \"Çin takviminde bu yıl hangi hayvan\" gibi soruların hepsi bir kalan bulma işlemidir. Aynı mantık bilgisayar biliminde, kontrol basamaklarında ve şifrelemede de temel araçtır."
      ]
    },
    {
      h: "\"a mod b\" nasıl hesaplanır?",
      p: [
        "a mod n, a sayısının n'ye bölümünden kalandır. Bölme işlemini a = n × q + r biçiminde yazarsınız; burada q bölüm, r kalandır ve kalan her zaman 0 ≤ r < n aralığındadır."
      ],
      formula: "a = n × q + r,  0 ≤ r < n  →  a mod n = r\n100 mod 7: 100 = 7 × 14 + 2 → 2\n38 mod 12: 38 = 12 × 3 + 2 → 2\n45 mod 9: 45 = 9 × 5 + 0 → 0 (9, 45'i tam böler)",
      ol: [
        "a'yı n'ye bölün ve bölümün tam kısmını alın: 100 ÷ 7 = 14,28… → 14.",
        "Tam kısmı n ile çarpın: 14 × 7 = 98.",
        "a'dan çıkarın: 100 − 98 = 2. Sonuç kalandır."
      ],
      after: [
        "Kalan 0 ise n, a'yı tam bölüyor demektir; bu yüzden mod alma [[bilgi:bolunebilme-kurallari|bölünebilme kuralları]] ile yakından ilişkilidir. Büyük sayılarla hesap yapmak için [[arac:mod-alma-hesapla|Mod Alma Hesaplama]] aracı kalanı anında bulur."
      ]
    },
    {
      h: "Bugünden 100 gün sonra haftanın hangi günü olur?",
      p: [
        "Hafta 7 günlük bir döngüdür; 7 gün, 14 gün, 98 gün sonra hep aynı güne geri dönersiniz. Bu yüzden X gün sonrasının hangi gün olduğunu bulmak için X'in 7'ye bölümünden kalanı bulup o kadar gün ileri saymanız yeterlidir."
      ],
      table: {
        head: ["Kaç gün sonra", "Gün mod 7", "16.11.2026 pazartesiden sonra", "Tarih"],
        rows: [
          ["7", "0", "Pazartesi (aynı gün)", "23.11.2026"],
          ["30", "2", "Çarşamba", "16.12.2026"],
          ["100", "2", "Çarşamba", "24.02.2027"],
          ["180", "5", "Cumartesi", "15.05.2027"],
          ["365", "1", "Salı", "16.11.2027"],
          ["1.000", "6", "Pazar", "12.08.2029"]
        ],
        caption: "Değerler hesaplanmıştır. Gün adı yalnızca kalana bağlıdır; tarihin kendisi ayların gün sayısına ve artık yıla göre değişir."
      },
      after: [
        "Geriye doğru da aynı yöntem çalışır: 100 gün önce, 2 gün geriye sayılır; pazartesiden 2 gün önce cumartesidir. Yalnızca gün adı değil tam tarih gerekiyorsa ayların farklı uzunlukta olması ve artık yıl hesaba girer; bu durumda [[arac:tarih-ekle-cikar|Tarih Ekle Çıkar]] aracı takvim günü ya da iş günü olarak doğru tarihi verir. Bir yılın 365 gün olması nedeniyle doğum gününüzün her yıl haftanın bir sonraki gününe kaymasının sebebi de 365 mod 7 = 1'dir; artık yıldan sonra iki gün kayar."
      ]
    },
    {
      h: "Saat aritmetiği neden mod 12 ile çalışır?",
      p: [
        "Analog saatin kadranında 12 sayı vardır ve akrep 12 saatte bir başa döner. Bu yüzden saat hesabı mod 12 ile yapılır, ancak saatte kalan 0 yerine 12 yazılır. 9'dan 50 saat sonra kadranın hangi saati göstereceğini bulmak için (9 + 50) mod 12 = 59 mod 12 = 11 hesaplanır: akrep 11'i gösterir.",
        "24 saatlik sistemde modül 24'tür ve 0 kullanılır: saat 15.00'ten 10 saat sonra (15 + 10) mod 24 = 1, yani saat 01.00'dir. Gece vardiyalarında çalışma süresi hesaplanırken bu \"gece yarısını geçme\" durumu sık yaşanır; [[arac:saat-hesapla|Saat Hesaplama]] aracı gece vardiyasını otomatik algılar. 12 ve 24 saatlik gösterimin ayrıntısını [[bilgi:am-pm-ne-demek-12-24-saat|AM, PM ve 24 saat]] makalesi anlatır."
      ]
    },
    {
      h: "Negatif sayılarda mod nasıl alınır?",
      p: [
        "Matematikte kalan her zaman 0 ile n − 1 arasında tanımlanır; bu yüzden negatif sayının da kalanı pozitif çıkar. −17'yi 5'e bölerken −17 = 5 × (−4) + 3 yazılır, kalan 3'tür. Kısa yol: negatif sayıya, pozitif olana kadar n'nin katlarını ekleyin. −17 + 20 = 3."
      ],
      formula: "−17 mod 5:  −17 = 5 × (−4) + 3 → matematiksel kalan 3\nKısa yol: −17 + 5 × 4 = 3\nBazı programlama dillerinde −17 % 5 = −2 (işaret bölünenden gelir)",
      after: [
        "Programlama dillerinin bir kısmı kalan işleminde sonucun işaretini bölünenden alır; bu yüzden −17 % 5 işleminin sonucu −2 olarak döner. Matematiksel kalanı istiyorsanız sonuca n ekleyip yeniden mod almanız gerekir: ((−17 % 5) + 5) % 5 = 3. Mod Alma Hesaplama aracı iki sonucu da ayrı ayrı gösterir; geçmişe doğru gün hesabı yaparken bu fark özellikle önemlidir."
      ]
    },
    {
      h: "Denklik (≡) işareti ne anlama gelir?",
      p: [
        "a ≡ b (mod n) yazımı \"a, n modülünde b'ye denktir\" diye okunur ve a ile b'nin n'ye bölündüğünde aynı kalanı verdiğini anlatır. Eşdeğer tanım: n, a − b farkını tam böler. Örneğin 38 ≡ 3 (mod 7), çünkü 38 − 3 = 35 ve 35, 7'ye tam bölünür; ikisinin de 7'ye bölümünden kalan 3'tür.",
        "Aynı kalanı veren sayılar bir <strong>denklik sınıfı</strong> oluşturur. Mod 7'de kalanı 2 olan sayılar …, −5, 2, 9, 16, 23, 30, … sınıfını oluşturur; haftanın aynı gününe düşen tarihler gibi düşünebilirsiniz. Denklik toplama, çıkarma ve çarpmada korunur: a ≡ b ve c ≡ d (mod n) ise a + c ≡ b + d ve a × c ≡ b × d (mod n). Bu özellik büyük sayıların kalanını hesaplamayı kolaylaştırır."
      ]
    },
    {
      h: "Büyük üslerin kalanı nasıl bulunur?",
      p: [
        "2<sup>100</sup> gibi bir sayıyı hesap makinesiyle yazmak zordur, ama 7'ye bölümünden kalanını bulmak kolaydır. Yöntem, üsler arttıkça kalanların tekrar eden bir döngüye girdiğini fark etmektir."
      ],
      formula: "2¹ ≡ 2, 2² ≡ 4, 2³ = 8 ≡ 1 (mod 7) → döngü uzunluğu 3\n100 = 3 × 33 + 1 → 2¹⁰⁰ = (2³)³³ × 2¹ ≡ 1³³ × 2 ≡ 2 (mod 7)\nSon basamak: 7²²² mod 10 → 7, 9, 3, 1 döngüsü (uzunluk 4); 222 mod 4 = 2 → 9",
      after: [
        "Aynı yöntemle 3<sup>50</sup>'nin 7'ye bölümünden kalanı da bulunur: 3<sup>6</sup> ≡ 1 (mod 7) ve 50 mod 6 = 2 olduğu için 3<sup>50</sup> ≡ 3<sup>2</sup> = 9 ≡ 2 (mod 7). Bir sayının son basamağını sormak, mod 10'daki kalanını sormakla aynıdır; sınavlarda sık çıkan \"7 üzeri 222'nin birler basamağı\" sorusu bu yüzden bir modüler aritmetik sorusudur. Üslü sayıların temel kuralları için [[bilgi:uslu-sayilar-kurallari|üslü sayılar]] makalesine bakabilirsiniz."
      ]
    },
    {
      h: "Modüler aritmetik şifrelemede nasıl kullanılır?",
      p: [
        "En eski örnek Sezar şifresidir: her harf alfabede belirli sayıda kaydırılır ve alfabenin sonuna gelindiğinde başa dönülür. Türk alfabesinin 29 harfiyle 3 harf kaydırma, (harf sırası + 3) mod 29 hesabıdır; Z'den sonra yeniden A gelir. Yöntemin ayrıntısı ve neden kolay kırıldığı [[bilgi:sezar-sifreleme-nedir|Sezar şifreleme]] makalesinde anlatılıyor.",
        "Günümüzün güvenli şifreleme yöntemleri de modüler aritmetiğe dayanır, ama çok daha büyük sayılarla. Açık anahtarlı şifrelemede yüzlerce basamaklı sayıların üssünün, yine çok büyük bir modüle göre kalanı hesaplanır. Bu hesap ileri yönde hızlı, geri yönde ise bugünkü bilgisayarlarla pratikte yapılamayacak kadar yavaştır; güvenlik bu asimetriden gelir. Banka kartı ve kimlik numaralarındaki kontrol basamakları da mod 10 ya da mod 11 hesaplarıyla yanlış yazımı yakalar. Bu kontrollerin en yaygın örneklerinden birinin adım adım işleyişini [[bilgi:luhn-algoritmasi-nedir-numara-dogrulama|Luhn algoritması]] makalesinde görebilirsiniz. Orada da yapılan iş, rakamlar üzerinde basit işlemlerden sonra toplamın 10'a bölümünden kalanın sıfır olup olmadığına bakmaktır; tek bir rakam yanlış yazıldığında kalan değişir ve hata yakalanır."
      ]
    }
  ],
  faq: [
    ["Modüler aritmetik nedir?", "Modüler aritmetik, sayıların belirli bir sayıya bölümünden kalanla çalışan aritmetiktir. Saat 12'de, hafta 7'de başa döndüğü için saat ve gün hesapları modüler aritmetiğin günlük örnekleridir."],
    ["'a mod b' nasıl hesaplanır?", "a sayısı b'ye bölünür, bölümün tam kısmı b ile çarpılıp a'dan çıkarılır; kalan sonuçtur. Örneğin 100 mod 7 için 100 = 7 × 14 + 2 yazılır ve sonuç 2 bulunur."],
    ["Bugünden 100 gün sonra haftanın hangi günü olur?", "100'ün 7'ye bölümünden kalan 2 olduğu için 100 gün sonra bugünden 2 gün sonraki gündür. 16 Kasım 2026 pazartesi ise 100 gün sonrası 24 Şubat 2027 çarşambadır."],
    ["Saat aritmetiği neden mod 12 ile çalışır?", "Analog saat kadranında 12 sayı vardır ve akrep 12 saatte bir başa döner. 9'dan 50 saat sonra (9 + 50) mod 12 = 11 olduğu için akrep 11'i gösterir; 24 saatlik sistemde mod 24 kullanılır."],
    ["Negatif sayılarda mod nasıl alınır?", "Matematiksel kalan her zaman 0 ile n − 1 arasındadır; −17 mod 5 için −17 = 5 × (−4) + 3 yazılır ve sonuç 3'tür. Bazı programlama dilleri ise işareti bölünenden alıp −2 verir."],
    ["Denklik (≡) işareti ne anlama gelir?", "a ≡ b (mod n), a ve b'nin n'ye bölümünden aynı kalanı verdiğini, yani n'nin a − b farkını tam böldüğünü anlatır. Örneğin 38 ≡ 3 (mod 7), çünkü 35 sayısı 7'ye tam bölünür."],
    ["Büyük üslerin kalanı nasıl bulunur?", "Üsler arttıkça kalanların tekrar ettiği döngü bulunur. 2 üzeri 3 mod 7'de 1 olduğu için döngü 3'lüktür; 100 mod 3 = 1 olduğundan 2 üzeri 100'ün 7'ye bölümünden kalan 2'dir."],
    ["Modüler aritmetik şifrelemede nasıl kullanılır?", "Sezar şifresinde harfler alfabe uzunluğuna göre mod alınarak kaydırılır. Modern açık anahtarlı şifreleme de çok büyük sayıların üslerinin büyük bir modüle göre kalanını hesaplayarak çalışır."],
    ["365 gün sonra neden haftanın bir sonraki günü gelir?", "365'in 7'ye bölümünden kalan 1'dir; bu yüzden bir yıl sonra aynı tarih haftanın bir sonraki gününe denk gelir. Araya 29 Şubat girerse 366 mod 7 = 2 olduğu için iki gün kayar."]
  ],
  tools: ["mod-alma-hesapla", "tarih-ekle-cikar", "saat-hesapla"],
  related: ["bolunebilme-kurallari", "sezar-sifreleme-nedir", "uslu-sayilar-kurallari", "am-pm-ne-demek-12-24-saat"]
};
