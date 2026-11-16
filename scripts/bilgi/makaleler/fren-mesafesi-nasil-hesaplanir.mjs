export default {
  slug: "fren-mesafesi-nasil-hesaplanir",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Fren Mesafesi Nasıl Hesaplanır? Hıza Göre Duruş ve Takip Mesafesi",
  pageTitle: "Fren Mesafesi Nasıl Hesaplanır? Duruş ve Takip Mesafesi",
  description: "Duruş mesafesi = reaksiyon mesafesi + fren mesafesi. 90 km/s'de kuru yolda yaklaşık 70 m, ıslakta 105 m. Formül, hız tablosu, 2 saniye kuralı ve zemin etkisi.",
  keywords: ["fren mesafesi nasıl hesaplanır", "duruş mesafesi formülü", "90 km hızda fren mesafesi", "takip mesafesi kaç metre", "ıslak zeminde fren mesafesi", "reaksiyon mesafesi nedir", "2 saniye kuralı", "ehliyet fren mesafesi sorusu"],
  lead: "Fren mesafesi, frene basıldığı andan aracın tamamen durduğu ana kadar alınan yoldur ve yaklaşık olarak <strong>v² ÷ (2 × μ × g)</strong> formülüyle hesaplanır; burada v m/s cinsinden hız, μ lastik ile yol arasındaki sürtünme katsayısı, g ise 9,81 m/s²'dir. Sürücünün tehlikeyi görüp frene basana kadar geçen sürede alınan reaksiyon mesafesi de eklendiğinde toplam duruş mesafesi bulunur: 90 km/s hızla kuru asfaltta yaklaşık 70 m, ıslak yolda yaklaşık 105 m. Bu değerler fiziksel bir tahmindir; gerçek mesafe araç, lastik ve yol koşullarına göre daha uzun olabilir.",
  kisaCevap: [
    "Duruş mesafesi = reaksiyon mesafesi + fren mesafesi.",
    "Reaksiyon mesafesi = hız (m/s) × reaksiyon süresi; hesaplarda çoğunlukla 1 saniye kabul edilir.",
    "Fren mesafesi ≈ v² ÷ (2 × μ × 9,81); kuru asfaltta μ ≈ 0,7, ıslakta ≈ 0,4, karda ≈ 0,2, buzda ≈ 0,1.",
    "km/s'yi m/s'ye çevirmek için 3,6'ya bölün: 90 km/s = 25 m/s.",
    "Hız iki katına çıkınca fren mesafesi dört katına çıkar; çünkü mesafe hızın karesiyle büyür.",
    "Takip mesafesi için en az 2 saniye bırakın: 90 km/s'de bu yaklaşık 50 m eder; ıslak ve karlı yolda süreyi artırın."
  ],
  figure: {
    alt: "50, 90 ve 120 km/s hızlar için kuru asfaltta duruş mesafesinin reaksiyon ve fren mesafesine ayrılmış yatay çubukları: 50 km/s'de 28 m, 90 km/s'de 70 m, 120 km/s'de 114 m; altında 90 km/s için ıslak, karlı ve buzlu zemin karşılaştırması.",
    caption: "Açık renkli kısım reaksiyon süresince (1 sn) alınan yol, koyu kısım frenleme mesafesidir. Hız arttıkça koyu kısım çok daha hızlı büyür. Alt satırda aynı 90 km/s hızın zemin kayganlaştıkça ne kadar uzun mesafe gerektirdiği görülüyor. Değerler yaklaşık hesaptır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Kuru asfaltta toplam duruş mesafesi</text>
  <g class="sm">
    <rect x="20" y="52" width="16" height="14" class="ps"/><text x="42" y="64">Reaksiyon (1 sn)</text>
    <rect x="170" y="52" width="16" height="14" class="p"/><text x="192" y="64">Fren mesafesi (μ = 0,7)</text>
  </g>
  <g>
    <text x="20" y="104" class="b">50 km/s</text>
    <rect x="110" y="88" width="56" height="26" class="ps"/><rect x="166" y="88" width="56" height="26" class="p"/>
    <text x="232" y="106" class="b">≈ 28 m</text>
    <text x="20" y="150" class="b">90 km/s</text>
    <rect x="110" y="134" width="100" height="26" class="ps"/><rect x="210" y="134" width="182" height="26" class="p"/>
    <text x="402" y="152" class="b">≈ 70 m</text>
    <text x="20" y="196" class="b">120 km/s</text>
    <rect x="110" y="180" width="133" height="26" class="ps"/><rect x="243" y="180" width="324" height="26" class="p"/>
    <text x="577" y="198" class="b">≈ 114 m</text>
  </g>
  <text x="110" y="226" class="sm mu">1 kare ≈ 4 m · hız %33 arttı, fren mesafesi %78 arttı</text>
  <line x1="20" y1="244" x2="700" y2="244" class="sb dash" fill="none"/>
  <text x="360" y="272" class="b mid">90 km/s'de zemine göre duruş mesafesi</text>
  <g class="mid">
    <rect x="20" y="290" width="160" height="80" rx="8" class="oks"/>
    <text x="100" y="316" class="sm">Kuru (μ 0,7)</text><text x="100" y="348" class="lg b">≈ 70 m</text>
    <rect x="193" y="290" width="160" height="80" rx="8" class="sf sb"/>
    <text x="273" y="316" class="sm">Islak (μ 0,4)</text><text x="273" y="348" class="lg b">≈ 105 m</text>
    <rect x="366" y="290" width="160" height="80" rx="8" class="ps"/>
    <text x="446" y="316" class="sm">Karlı (μ 0,2)</text><text x="446" y="348" class="lg b">≈ 184 m</text>
    <rect x="539" y="290" width="160" height="80" rx="8" class="dgs"/>
    <text x="619" y="316" class="sm">Buzlu (μ 0,1)</text><text x="619" y="348" class="lg b dg">≈ 344 m</text>
  </g>
  <text x="360" y="400" class="sm mid t2">Yaklaşık fiziksel hesap; gerçek mesafe araç ve koşullara göre daha uzun olabilir.</text>
</svg>`
  },
  sections: [
    {
      h: "Duruş mesafesi ile fren mesafesi farkı",
      p: [
        "Günlük dilde \"fren mesafesi\" denince çoğu zaman aracın tehlikeyi görmekten durmaya kadar aldığı toplam yol kastedilir. Teknik olarak bu toplamın adı <strong>duruş mesafesi</strong>dir ve iki parçadan oluşur.",
        "Birinci parça <strong>reaksiyon (intikal) mesafesi</strong>dir: sürücünün tehlikeyi fark etmesi, karar vermesi ve ayağını gazdan frene götürmesi sırasında araç hiç yavaşlamadan yoluna devam eder. İkinci parça <strong>fren mesafesi</strong>dir: fren pedalına basıldığı andan aracın tamamen durduğu ana kadar alınan yoldur. Reaksiyon mesafesi hızla doğru orantılı büyürken fren mesafesi hızın karesiyle büyür; yüksek hızlarda toplamın büyük kısmını fren mesafesi oluşturur.",
        "Bu ayrım ehliyet sınavı sorularında da sık geçer. Soruda \"duruş mesafesi\" isteniyorsa ikisini toplamanız, yalnızca \"fren mesafesi\" isteniyorsa ikinci parçayı hesaplamanız gerekir."
      ]
    },
    {
      h: "Fren mesafesi formülü",
      p: [
        "Fren mesafesi formülü, hareket eden aracın kinetik enerjisinin, lastik ile yol arasındaki sürtünme kuvvetinin yaptığı işle sıfırlanması fikrine dayanır. Sürtünme kuvveti μ × m × g, kinetik enerji ½ × m × v² olduğu için kütle sadeleşir ve formül hızla zemin katsayısına bağlı kalır. Bu yüzden ideal koşullarda yüklü ve boş araç aynı mesafede durur; gerçekte ise ağır araçların frenleri daha fazla ısınır ve mesafe uzayabilir."
      ],
      formula: "v (m/s) = hız (km/s) ÷ 3,6\nReaksiyon mesafesi = v × t (t: reaksiyon süresi, sn)\nFren mesafesi = v² ÷ (2 × μ × g), g = 9,81 m/s²\nDuruş mesafesi = reaksiyon mesafesi + fren mesafesi",
      after: [
        "Formül düz yol, kilitlenmeyen tekerlekler, iyi durumda fren ve lastik varsayar. Yokuş aşağıda, aşınmış lastikle, aşırı yüklü araçla ya da fren sistemi arızalıyken mesafe belirgin uzar. Bu yüzden formülden çıkan sayı, ulaşılabilecek <strong>en iyi</strong> durumu anlatan bir tahmin olarak düşünülmelidir. Kinetik enerjinin hızın karesiyle büyümesinin fiziği [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısında, hız–yol–zaman ilişkisi ise [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısında anlatılır."
      ]
    },
    {
      h: "Çözümlü örnek: 90 km/s hızda araç kaç metrede durur?",
      ol: [
        "Hızı m/s'ye çevirin: 90 ÷ 3,6 = 25 m/s.",
        "Reaksiyon mesafesini bulun: reaksiyon süresi 1 sn kabul edilirse 25 × 1 = 25 m. Araç bu 25 metreyi hiç yavaşlamadan gider.",
        "Kuru asfalt için fren mesafesini hesaplayın: 25² ÷ (2 × 0,7 × 9,81) = 625 ÷ 13,73 ≈ 45,5 m.",
        "Toplayın: 25 + 45,5 ≈ 70,5 m. Yani 90 km/s'de tehlikeyi gördüğünüz andan durana kadar yaklaşık 70 metre yol alırsınız.",
        "Aynı hesabı ıslak yol için yapın: μ = 0,4 ile fren mesafesi 625 ÷ 7,85 ≈ 79,6 m, toplam ≈ 104,6 m. Islak zemin toplam mesafeyi yaklaşık 34 metre uzattı.",
        "Reaksiyon süresi yorgunluk ya da dikkat dağınıklığı nedeniyle 2 saniyeye çıkarsa kuru yolda toplam 50 + 45,5 ≈ 95,5 m olur."
      ],
      after: [
        "Bu adımları hız, reaksiyon süresi ve zemin seçerek [[arac:fren-mesafesi-hesapla|fren mesafesi hesaplama]] aracında anında yapabilirsiniz; araç toplam duruş süresini ve yavaşlama ivmesini de gösterir. Hız birimleri arasında geçiş için [[arac:ms-kmh-cevir|m/s km/s çevirici]] kullanılabilir."
      ]
    },
    {
      h: "Hıza göre duruş mesafesi tablosu",
      p: [
        "Aşağıdaki tablo 1 saniye reaksiyon süresi ve tipik sürtünme katsayılarıyla hesaplanmıştır. Değerlerin hızla nasıl büyüdüğüne dikkat edin: 50 km/s'den 90 km/s'ye çıkmak kuru yolda duruş mesafesini 2,5 katına, ıslak yolda ise 2,7 katına çıkarır."
      ],
      table: {
        head: ["Hız", "Reaksiyon (1 sn)", "Fren, kuru", "Duruş, kuru", "Duruş, ıslak", "Duruş, karlı"],
        rows: [
          ["30 km/s", "8,3 m", "5,1 m", "13 m", "17 m", "26 m"],
          ["50 km/s", "13,9 m", "14,0 m", "28 m", "39 m", "63 m"],
          ["70 km/s", "19,4 m", "27,5 m", "47 m", "68 m", "116 m"],
          ["90 km/s", "25,0 m", "45,5 m", "71 m", "105 m", "184 m"],
          ["110 km/s", "30,6 m", "68,0 m", "99 m", "150 m", "269 m"],
          ["120 km/s", "33,3 m", "80,9 m", "114 m", "175 m", "317 m"],
          ["130 km/s", "36,1 m", "94,9 m", "131 m", "202 m", "368 m"]
        ],
        caption: "μ değerleri: kuru 0,7, ıslak 0,4, karlı 0,2. Yaklaşık fiziksel hesaptır; gerçek koşullarda mesafe daha uzun olabilir."
      },
      after: [
        "Okul ve yerleşim alanlarında hız sınırlarının düşük tutulmasının nedeni bu tablodadır. 50 km/s'de yaklaşık 28 metrede durabilen bir araç, aynı noktada 70 km/s ile gidiyorsa 28 metreyi geçtiğinde hâlâ yaklaşık 60 km/s hızındadır; çünkü ilk 19 metreyi reaksiyon süresinde hiç yavaşlamadan alır."
      ]
    },
    {
      h: "Hız iki katına çıkınca fren mesafesi kaç kat artar?",
      p: [
        "Fren mesafesi formülünde hız karesi alındığı için hız 2 katına çıkınca fren mesafesi <strong>4 katına</strong>, 3 katına çıkınca <strong>9 katına</strong> çıkar. 45 km/s'de kuru yolda yaklaşık 11 metre olan fren mesafesi, 90 km/s'de yaklaşık 45 metreye ulaşır. Reaksiyon mesafesi ise yalnızca 2 katına çıkar; bu yüzden toplam duruş mesafesi 4 kattan biraz az artar.",
        "Bunun bir başka sonucu da çarpma hızıdır. 90 km/s'de 70 metrede durabilen bir araç, önündeki engel 50 metre uzaktaysa durmayı başaramaz ve engele hâlâ yaklaşık 60 km/s hızla çarpar. Küçük hız farkları bu yüzden kaza sonuçlarında büyük fark yaratır."
      ]
    },
    {
      h: "Reaksiyon süresi kaç saniye kabul edilir?",
      p: [
        "Ders kitaplarında ve sınav sorularında reaksiyon süresi çoğunlukla <strong>1 saniye</strong> alınır. Dikkatli ve dinlenmiş bir sürücü beklediği bir uyarıya 0,7–1 saniyede tepki verebilir; beklenmedik bir tehlikede bu süre 1,5 saniyeyi rahatça aşar. Yorgunluk, uykusuzluk, telefonla ilgilenmek, alkol ve bazı ilaçlar reaksiyon süresini belirgin biçimde uzatır.",
        "Reaksiyon süresindeki her yarım saniye, 90 km/s'de 12,5 metre ek yol demektir. Telefon ekranına 2 saniye bakan sürücü, 90 km/s hızla 50 metreyi yolu görmeden geçmiş olur. Fren mesafesini kısaltmanın sürücünün elindeki en etkili yolu, hızı düşürmek ve dikkati yolda tutmaktır."
      ]
    },
    {
      h: "Takip mesafesi kaç metre olmalı? 2 saniye kuralı",
      p: [
        "Takip mesafesi, öndeki araç ani fren yaptığında sizin de güvenle durabilmeniz için bırakmanız gereken aralıktır. Öndeki araç da frenlediği için gereken mesafe tam duruş mesafeniz kadar olmayabilir; ancak reaksiyon süreniz boyunca araya giren yolu ve iki aracın fren farklarını karşılayacak kadar boşluk bırakmanız gerekir.",
        "Pratikte iki kural kullanılır. <strong>2 saniye kuralı</strong>nda öndeki araç bir direği ya da işareti geçtiğinde saymaya başlarsınız; siz aynı noktaya \"bin bir, bin iki\" demeden ulaşıyorsanız çok yakınsınız. 90 km/s'de 2 saniye 50 metre eder. Türkiye'de sürücü kurslarında öğretilen <strong>hızın yarısı kuralı</strong> ise 90 km/s'de en az 45 metre mesafe bırakmayı söyler. Islak yolda süreyi en az 3–4 saniyeye, karlı ve buzlu yolda daha fazlasına çıkarın."
      ],
      table: {
        head: ["Hız", "Hızın yarısı kuralı", "2 saniye kuralı", "Islak yol (4 saniye)"],
        rows: [
          ["50 km/s", "25 m", "28 m", "56 m"],
          ["70 km/s", "35 m", "39 m", "78 m"],
          ["90 km/s", "45 m", "50 m", "100 m"],
          ["110 km/s", "55 m", "61 m", "122 m"],
          ["120 km/s", "60 m", "67 m", "133 m"]
        ]
      },
      after: [
        "Hızınıza göre takip mesafesini metre ve araç boyu olarak görmek için [[arac:takip-mesafesi-hesapla|takip mesafesi hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Islak ve karlı yolda fren mesafesi ne kadar uzar?",
      p: [
        "Sürtünme katsayısı formülün paydasında olduğu için zemin kaydıkça fren mesafesi ters orantılı uzar. Kuru asfalttan ıslak asfalta geçişte katsayı yaklaşık 0,7'den 0,4'e düştüğünde fren mesafesi yaklaşık 1,75 katına, kara geçişte 3,5 katına, buzda 7 katına çıkar. Yağmurun ilk dakikalarında yol yüzeyindeki yağ ve toz suyla karışıp kaygan bir tabaka oluşturduğu için tutunma daha da kötüleşebilir.",
        "Lastik durumu da kritik bir etkendir. Diş derinliği azalmış lastikler ıslak zeminde suyu tahliye edemez ve su kızağı (aquaplaning) riski artar; mevsime uygun olmayan lastik soğuk havada sertleşip tutunmayı kaybeder. Doğru lastik basıncı hem fren mesafesini hem yol tutuşunu etkiler; ayrıntılar [[bilgi:lastik-basinci-kac-bar-psi-olmali|lastik basıncı kaç bar olmalı]] yazısında."
      ],
      note: "Önemli: Buradaki formüller ve tablolar, frenlemenin fiziğini anlamaya yardım eden yaklaşık hesaplardır. Gerçek fren mesafesi aracın fren sistemi, ABS, lastik, yük, yol eğimi ve hava koşullarına göre daha uzun olabilir. Hız sınırlarına ve trafik kurallarına uyun, takip mesafenizi bu hesaplardan daha geniş tutun."
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>km/s değerini doğrudan formüle koymak:</strong> 90² ÷ 13,73 = 590 m gibi anlamsız sonuçlar çıkar. Önce 3,6'ya bölüp m/s'ye çevirin.",
        "<strong>Reaksiyon mesafesini unutmak:</strong> Yalnızca fren mesafesini hesaplamak, gerçek duruş mesafesini 90 km/s'de yaklaşık 25 metre eksik gösterir.",
        "<strong>Doğrusal düşünmek:</strong> \"Biraz daha hızlı gidiyorum, biraz daha uzun mesafede dururum\" düşüncesi yanlıştır; fark hızın karesiyle büyür.",
        "<strong>ABS'nin mesafeyi her zaman kısalttığını sanmak:</strong> ABS tekerleklerin kilitlenmesini önleyip direksiyon hâkimiyetini korur; gevşek kar ya da çakıl gibi zeminlerde mesafeyi kısaltmayabilir.",
        "<strong>Öndeki aracın da aynı mesafede duracağını varsaymak:</strong> Öndeki araç bir engele çarparak aniden durabilir. Takip mesafesini bu ihtimale göre bırakın."
      ]
    }
  ],
  faq: [
    ["Fren mesafesi nasıl hesaplanır?", "Hız önce 3,6'ya bölünerek m/s'ye çevrilir, sonra hızın karesi 2 × μ × 9,81 değerine bölünür; μ zeminin sürtünme katsayısıdır. 90 km/s yani 25 m/s hız ve kuru asfaltta μ 0,7 için fren mesafesi yaklaşık 45,5 metre çıkar."],
    ["Duruş mesafesi ile fren mesafesi farkı nedir?", "Fren mesafesi yalnızca frene basıldıktan sonra alınan yoldur. Duruş mesafesi buna sürücünün tehlikeyi görüp frene basana kadar geçen sürede aldığı reaksiyon mesafesini de ekler; trafikte asıl önemli olan toplam duruş mesafesidir."],
    ["90 km/s hızda araç kaç metrede durur?", "1 saniye reaksiyon süresiyle 90 km/s hızdaki araç kuru asfaltta yaklaşık 70 metrede, ıslak asfaltta yaklaşık 105 metrede, karlı yolda yaklaşık 184 metrede durur. Bunlar yaklaşık hesaplardır; gerçek mesafe koşullara göre daha uzun olabilir."],
    ["Reaksiyon süresi kaç saniye kabul edilir?", "Hesaplarda ve sınav sorularında genellikle 1 saniye kabul edilir. Dikkatli bir sürücü beklediği uyarıya 0,7 ile 1 saniyede tepki verebilir; beklenmedik durumlarda, yorgunken ya da dikkat dağınıkken süre 1,5 ila 2 saniyeyi aşabilir."],
    ["Takip mesafesi kaç metre olmalı?", "Kuru yolda en az 2 saniyelik ya da hızın yarısı kadar metrelik mesafe bırakılmalıdır; 90 km/s'de bu 45 ile 50 metre eder. Islak, karlı ve sisli havada, yorgunken veya ağır araç takip ederken mesafe iki katına çıkarılmalıdır."],
    ["2 saniye kuralı nedir?", "Öndeki araç bir direği veya yol işaretini geçtiğinde saymaya başlayıp aynı noktaya en erken iki saniye sonra ulaşmanızı öngören takip kuralıdır. Hızdan bağımsız uygulanabildiği için pratiktir; 90 km/s'de yaklaşık 50 metreye karşılık gelir."],
    ["Islak ve karlı yolda fren mesafesi ne kadar uzar?", "Sürtünme katsayısı düştükçe fren mesafesi ters orantılı uzar. Islak asfaltta fren mesafesi kuru asfalta göre yaklaşık 1,75 katına, karlı yolda yaklaşık 3,5 katına, buzlu yolda yaklaşık 7 katına çıkabilir; lastik durumu bu farkı daha da büyütür."],
    ["Hız iki katına çıkınca fren mesafesi kaç kat artar?", "Fren mesafesi hızın karesiyle büyüdüğü için hız iki katına çıkınca fren mesafesi dört katına çıkar. Reaksiyon mesafesi ise yalnızca iki katına çıkar; bu yüzden toplam duruş mesafesi dört kattan biraz daha az artar."],
    ["Ehliyet sınavında fren mesafesi soruları nasıl çözülür?", "Soruda istenen büyüklüğü dikkatle okuyun: duruş mesafesi isteniyorsa reaksiyon ve fren mesafesini toplayın. Hızı m/s'ye çevirmeyi unutmayın ve sorunun verdiği reaksiyon süresi ile sürtünme katsayısını kullanın; verilmemişse genel kural olarak hızın yarısı takip mesafesi kabul edilir."]
  ],
  tools: ["fren-mesafesi-hesapla", "takip-mesafesi-hesapla", "ms-kmh-cevir", "kmh-mph-cevir"],
  related: ["hiz-yol-zaman-formulu", "kinetik-ve-potansiyel-enerji", "lastik-basinci-kac-bar-psi-olmali", "newtonun-hareket-yasalari"],
  uyari: "hesaplar yaklaşık fiziksel tahmindir; trafikte hız sınırlarına uyun ve takip mesafenizi her zaman daha geniş tutun",
  sources: [
    ["Karayolları Genel Müdürlüğü – Trafik güvenliği", "https://www.kgm.gov.tr/"],
    ["Emniyet Genel Müdürlüğü Trafik Başkanlığı", "https://www.trafik.gov.tr/"]
  ]
};
