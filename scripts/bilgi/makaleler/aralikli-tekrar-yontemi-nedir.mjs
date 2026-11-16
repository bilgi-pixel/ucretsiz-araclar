export default {
  slug: "aralikli-tekrar-yontemi-nedir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Aralıklı Tekrar Yöntemi Nedir? Unutma Eğrisine Göre Tekrar Planı Nasıl Yapılır",
  pageTitle: "Aralıklı Tekrar Yöntemi Nedir? Unutma Eğrisi ve Tekrar Planı",
  description: "Aralıklı tekrar, bilgiyi giderek uzayan aralıklarla (1, 3, 7, 14, 30. gün) tekrar etmektir. Unutma eğrisi, ezber kartları, kelime ezberi ve sınav tekrar planı.",
  keywords: ["aralıklı tekrar yöntemi", "unutma eğrisi", "konu tekrarı nasıl yapılır", "ezber kartı tekrar", "spaced repetition", "kelime ezberleme yöntemi", "sınav tekrar planı", "leitner kutusu", "blok çalışma"],
  lead: "Aralıklı tekrar, öğrendiğiniz bir konuyu tek oturumda defalarca çalışmak yerine <strong>giderek uzayan aralıklarla</strong> yeniden hatırlamaya çalışmaktır; örneğin ilk çalışmadan 1, 3, 7, 14 ve 30 gün sonra. Her başarılı hatırlama, unutmanın hızını yavaşlatır ve bir sonraki tekrarın daha geç yapılmasına izin verir. Yöntem, Hermann Ebbinghaus'un 1885'te yayımladığı unutma eğrisi deneylerine dayanır. Bu sayfada unutma eğrisinin ne anlattığını, tekrar aralıklarının nasıl seçileceğini, ezber kartlarının kullanımını, kelime ezberini ve sınava göre tekrar planı kurmayı bulacaksınız.",
  kisaCevap: [
    "Aralıklı tekrar, aynı bilgiyi zamana yayılmış ve giderek uzayan aralıklarla tekrar etmektir.",
    "Unutma eğrisi, öğrenilen bilginin ilk saatlerde hızlı, sonra yavaş unutulduğunu gösterir.",
    "Yaygın başlangıç planı ilk çalışmadan 1, 3, 7, 14 ve 30 gün sonra tekrar etmektir.",
    "Tekrar, notu yeniden okumak değil, bakmadan hatırlamaya çalışmak (kendini sınamak) olmalıdır.",
    "Ezber kartında doğru hatırlanan kartın aralığı büyütülür, unutulan kart başa döner.",
    "Sınav tarihi bellidir: son tekrarı sınavdan birkaç gün önceye denk getirecek biçimde geriye doğru planlayın."
  ],
  figure: {
    alt: "Zamana göre hatırlama grafiği: tekrar yapılmayan bilgi hızla düşen bir eğri izliyor. Tekrar yapılan bilgi 1., 3., 7. ve 14. günlerde yeniden yükseliyor ve her seferinde daha yavaş düşüyor.",
    caption: "Kesikli çizgi tekrar yapılmadığında hatırlamanın nasıl düştüğünü, kalın çizgi 1., 3., 7. ve 14. günlerde yapılan tekrarların etkisini gösterir. Eğriler kavramı anlatmak için çizilmiştir; gerçek oranlar konuya ve kişiye göre değişir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Unutma eğrisi ve tekrarın etkisi</text>
  <line x1="70" y1="320" x2="690" y2="320" class="st" fill="none"/>
  <line x1="70" y1="320" x2="70" y2="60" class="st" fill="none"/>
  <text x="62" y="84" class="sm end mu">%100</text>
  <text x="62" y="324" class="sm end mu">%0</text>
  <text x="30" y="200" class="sm mu">hatırlama</text>
  <path d="M70,80 C90,180 120,230 170,250 S350,280 690,292" class="st dash" fill="none"/>
  <text x="560" y="310" class="sm t2">tekrar yok</text>
  <path d="M70,80 C82,140 95,165 110,175" class="sp sw" fill="none"/>
  <line x1="110" y1="175" x2="110" y2="82" class="sp sw" fill="none"/>
  <path d="M110,82 C130,130 160,150 190,158" class="sp sw" fill="none"/>
  <line x1="190" y1="158" x2="190" y2="82" class="sp sw" fill="none"/>
  <path d="M190,82 C220,115 270,132 330,138" class="sp sw" fill="none"/>
  <line x1="330" y1="138" x2="330" y2="82" class="sp sw" fill="none"/>
  <path d="M330,82 C380,104 470,118 610,122" class="sp sw" fill="none"/>
  <line x1="610" y1="122" x2="610" y2="82" class="sp sw" fill="none"/>
  <path d="M610,82 C640,90 665,95 690,98" class="sp sw" fill="none"/>
  <g class="sm mid">
    <text x="70" y="340">0</text><text x="110" y="340" class="b p">1</text><text x="190" y="340" class="b p">3</text>
    <text x="330" y="340" class="b p">7</text><text x="610" y="340" class="b p">14</text><text x="690" y="340">gün</text>
  </g>
  <rect x="380" y="160" width="300" height="88" rx="10" class="sf sb"/>
  <rect x="380" y="160" width="8" height="88" class="p"/>
  <text x="402" y="188" class="b">Örnek plan: 1 Aralık'ta çalışıldı</text>
  <text x="402" y="212" class="sm">Tekrar: 2, 4, 8, 15 ve 31 Aralık</text>
  <text x="402" y="234" class="sm t2">Her tekrar bakmadan hatırlama ile yapılır</text>
  <text x="380" y="378" class="sm mid t2">Her tekrardan sonra düşüş yavaşlar, aralık uzatılabilir.</text>
</svg>`
  },
  sections: [
    {
      h: "Aralıklı tekrar yöntemi nedir?",
      p: [
        "Aralıklı tekrar (İngilizce spaced repetition), öğrenilen bilgiyi zamana yayılmış oturumlarda yeniden çalışmaya dayanan bir öğrenme yöntemidir. Temel fikir basittir: bir bilgiyi unutmaya başladığınız anda yeniden hatırlamaya çalışırsanız, bellekte daha kalıcı hale gelir. Her başarılı tekrardan sonra unutma yavaşladığı için bir sonraki tekrarı daha geç yapabilirsiniz.",
        "Yöntemin karşıtı <strong>blok çalışma</strong>dır: bir konuyu tek oturumda, arka arkaya defalarca çalışmak. Sınavdan önceki gece yapılan yoğun çalışma kısa vadede işe yarar gibi görünür, ama birkaç hafta sonra bilginin büyük kısmı kaybolur. Aralıklı tekrarda toplam çalışma süresi aynı kalsa bile kalıcılık belirgin biçimde artar; bu etki psikoloji literatüründe <em>aralık etkisi</em> (spacing effect) olarak bilinir ve yüzyılı aşkın süredir tekrar tekrar gözlenmiştir.",
        "Yöntemin işe yaramasının ikinci nedeni <strong>hatırlama pratiğidir</strong>. Tekrar sırasında notu yeniden okumak yerine bakmadan hatırlamaya çalışmak, beynin bilgiyi geri getirme yolunu güçlendirir. Kendini sınama etkisi (testing effect) denen bu durum, aralıklı tekrarla birlikte kullanıldığında en iyi sonucu verir."
      ]
    },
    {
      h: "Unutma eğrisi ne anlatır?",
      p: [
        "Alman psikolog Hermann Ebbinghaus, 1880'lerde kendisi üzerinde deneyler yaptı. Anlamsız hece listeleri ezberledi ve farklı süreler sonra aynı listeyi yeniden öğrenmenin ne kadar daha kısa sürdüğünü ölçtü. Bu \"tasarruf\" oranlarından unutmanın zamana göre seyrini çıkardı ve 1885'te yayımladı. Ortaya çıkan grafiğe <strong>unutma eğrisi</strong> denir.",
        "Eğrinin ana mesajı şudur: unutma en hızlı ilk saatlerde ve ilk gün olur, sonra yavaşlar ve düzleşir. Ebbinghaus'un ölçümlerinde tasarruf oranı 20 dakika sonra yaklaşık %58, 1 saat sonra %44, 1 gün sonra %34, 6 gün sonra %25, 31 gün sonra %21 civarındaydı. Bu sayılar anlamsız heceler için geçerlidir; anlamlı, ilişkilendirilmiş ve iyi anlaşılmış bilgi çok daha yavaş unutulur.",
        "Bu yüzden eğrideki kesin yüzdeleri değil, şeklini akılda tutmak gerekir. İlk tekrarın erken yapılması, düşüşün en dik olduğu anı yakalar. Sonraki tekrarlar ise eğri her seferinde daha yatay hale geldiği için giderek seyrekleşebilir."
      ],
      table: {
        head: ["Geçen süre", "Ebbinghaus'un tasarruf oranı", "Pratik anlamı"],
        rows: [
          ["20 dakika", "yaklaşık %58", "Ders bitiminde kısa bir özet faydalıdır"],
          ["1 saat", "yaklaşık %44", "Düşüş en hızlı bu aralıktadır"],
          ["1 gün", "yaklaşık %34", "İlk tekrar için en uygun zaman"],
          ["6 gün", "yaklaşık %25", "Düşüş yavaşlamıştır"],
          ["31 gün", "yaklaşık %21", "Eğri neredeyse düzdür"]
        ],
        caption: "Değerler anlamsız hece listeleriyle yapılan tarihî deneylerden alınmıştır ve okul konuları için doğrudan geçerli değildir; yalnızca eğrinin şeklini göstermek için verilmiştir."
      }
    },
    {
      h: "Konular hangi aralıklarla tekrar edilmeli?",
      p: [
        "Tek bir \"doğru\" aralık dizisi yoktur, ama yaygın kullanılan ve iyi bir başlangıç noktası olan plan şudur: ilk çalışmadan sonraki <strong>1., 3., 7., 14. ve 30. gün</strong>. Aralıklar kabaca ikiye katlanarak büyür. Konu zorsa ya da tekrarda zorlandıysanız bir sonraki aralığı kısaltın; kolay hatırladıysanız uzatın.",
        "Hatırlanması istenen süre uzadıkça aralıklar da uzayabilir. Haftalık bir quiz için 1 ve 3 gün yeterliyken, aylar sonraki bir sınav için 30, 60 ve 90. günler de plana eklenir. Önemli olan, son tekrarın sınava yakın, ama sınav sabahına sıkışmayacak bir tarihe denk gelmesidir."
      ],
      table: {
        head: ["Tekrar", "İlk çalışmadan sonra", "1 Aralık 2026'da çalışılan konu için", "Önerilen süre"],
        rows: [
          ["1. tekrar", "1 gün", "2 Aralık Çarşamba", "10–15 dakika"],
          ["2. tekrar", "3 gün", "4 Aralık Cuma", "10 dakika"],
          ["3. tekrar", "7 gün", "8 Aralık Salı", "10 dakika"],
          ["4. tekrar", "14 gün", "15 Aralık Salı", "5–10 dakika"],
          ["5. tekrar", "30 gün", "31 Aralık Perşembe", "5–10 dakika"]
        ],
        caption: "Süreler örnek değerlerdir; her tekrar ilk çalışmadan çok daha kısa sürer, çünkü yalnızca hatırlanamayan kısımlar yeniden çalışılır."
      },
      after: [
        "Kendi tarihlerinizi gün adlarıyla görmek için [[arac:konu-tekrar-plani|Konu Tekrar Planı]] aracına çalışma tarihini ve aralıkları yazın; araç tekrarların sınav tarihinden önce bitip bitmediğini de kontrol eder."
      ]
    },
    {
      h: "Ezber kartları (flashcard) nasıl kullanılır?",
      p: [
        "Ezber kartı, ön yüzünde bir soru, arka yüzünde cevabı olan küçük karttır: bir kelime ve anlamı, bir tarih ve olay, bir formül ve adı. Kart, bakmadan hatırlamayı zorunlu kıldığı için aralıklı tekrarın en pratik aracıdır. Kâğıt kart da dijital kart da aynı ilkeyle çalışır."
      ],
      ol: [
        "Her karta tek bir bilgi yazın. \"Fotosentez nedir ve hangi aşamalardan oluşur\" yerine iki ayrı kart hazırlayın.",
        "Kartın ön yüzüne bakın, cevabı yüksek sesle ya da yazarak söyleyin, sonra arka yüzü çevirip kontrol edin.",
        "Doğru hatırladığınız kartın bir sonraki tekrarını ileri atın; hatırlayamadığınız kartı ertesi güne alın.",
        "<strong>Leitner kutusu</strong> yöntemi bunu kolaylaştırır: kartlar 1'den 5'e numaralı bölmelerde durur. Doğru bilinen kart bir sonraki bölmeye geçer, yanlış bilinen kart 1. bölmeye döner. 1. bölme her gün, 2. bölme iki günde bir, 3. bölme dört günde bir çalışılır.",
        "Dijital yöntemlerde her kartın aralığı bir <strong>kolaylık çarpanıyla</strong> büyütülür. Yaygın başlangıç ayarında ilk aralık 1 gün, ikinci aralık 6 gün, çarpan 2,5'tir; sonraki aralıklar 15, 38, 95 gün olur."
      ],
      after: [
        "Kolaylık çarpanına göre tekrar tarihlerini listelemek için [[arac:ezber-karti-zamanlama|Ezber Kartı Zamanlama]] aracını kullanabilirsiniz. Varsayılan değerlerle altı tekrar ilk öğrenmeden 1, 7, 22, 60, 155 ve 393 gün sonraya düşer."
      ]
    },
    {
      h: "Kelime ezberlemek için en iyi yöntem nedir?",
      p: [
        "Yabancı dilde kelime öğrenmek, aralıklı tekrarın en güçlü olduğu alandır, çünkü kelimeler birbirinden bağımsız ve kısa bilgi parçalarıdır. Ancak yalnızca kelime-anlam eşleştirmesi ezberlemek, kelimeyi konuşmada kullanmaya yetmez. En iyi sonuç birkaç tekniğin birlikte kullanılmasıyla alınır."
      ],
      ul: [
        "<strong>Bağlam içinde öğrenin:</strong> Kartın ön yüzüne yalnızca kelimeyi değil, kelimenin geçtiği kısa bir cümleyi yazın.",
        "<strong>İki yönlü çalışın:</strong> Hem yabancı kelimeden Türkçeye hem Türkçeden yabancı kelimeye kart hazırlayın; ikincisi daha zordur ve konuşmada işe yarar.",
        "<strong>Günlük sınır koyun:</strong> Günde 10–20 yeni kelime, tekrar yükünü yönetilebilir tutar. Yeni kart ekledikçe gelecek günlerin tekrar sayısı birikir.",
        "<strong>Sesli söyleyin:</strong> Telaffuzu da hatırlama sürecine katın.",
        "<strong>Kendi örneğinizi kurun:</strong> Kelimeyle kendi hayatınızdan bir cümle yazmak, bağlantıyı güçlendirir."
      ],
      after: [
        "Okuma hızınızı ve günlük okuma hedefinizi belirlemek isterseniz [[bilgi:dakikada-kac-kelime-okunur|dakikada kaç kelime okunur]] makalesi yol gösterir."
      ]
    },
    {
      h: "Aralıklı tekrar ile blok çalışma farkı nedir?",
      table: {
        head: ["Özellik", "Blok çalışma", "Aralıklı tekrar"],
        rows: [
          ["Zaman dağılımı", "Tek uzun oturum", "Birçok kısa oturuma yayılmış"],
          ["Kısa vadede his", "\"Öğrendim\" hissi güçlü", "Tekrarda zorlanma hissi olur"],
          ["Birkaç hafta sonra", "Bilginin büyük kısmı kaybolur", "Bilgi çok daha kalıcıdır"],
          ["Toplam süre", "Aynı ya da daha fazla", "Aynı ya da daha az"],
          ["Uygun olduğu durum", "Son gün hızlı göz gezdirme", "Dönem boyu ve sınav hazırlığı"]
        ]
      },
      after: [
        "Blok çalışmanın yanıltıcı yanı, oturum sırasında bilginin kolayca akılda olmasıdır. Bu tanıdıklık hissi gerçek öğrenme sanılır. Aralıklı tekrarda ise bir gün sonra bazı ayrıntıları hatırlamakta zorlanırsınız; bu zorlanma kötü bir işaret değil, belleği güçlendiren \"istenen zorluk\"tur.",
        "Aralıklı tekrarı <strong>karışık çalışma</strong> (interleaving) ile birleştirmek de faydalıdır: aynı oturumda tek tip soru yerine farklı konulardan sorular çözmek, hangi yöntemin ne zaman kullanılacağını ayırt etmeyi öğretir. Kısa ve odaklı oturumlar için [[bilgi:pomodoro-teknigi-nedir|Pomodoro tekniği]] iyi bir çerçeve sunar."
      ]
    },
    {
      h: "Sınava kaç gün kala tekrar planı yapılmalı? Sınav takvimine ekleme",
      p: [
        "Tekrar planı, sınava kalan sürenin tamamına yayıldığında en verimlidir. Bu yüzden plan, dönem başında ya da konu ilk öğrenildiği gün kurulmalıdır. Sınava çok az zaman kaldıysa da yöntem işe yarar; yalnızca aralıklar sıkışır."
      ],
      ol: [
        "Sınav tarihlerinizi tek bir takvimde toplayın ve her sınavın kapsadığı konuları listeleyin.",
        "Her konu için ilk çalışma tarihini belirleyin; zor ve uzun konuları öne alın.",
        "Her konunun tekrarlarını 1-3-7-14-30 düzeniyle takvime işleyin. 30. gün sınavdan sonraya düşüyorsa aralıkları kısaltın: 1-3-7-12 gibi.",
        "Son tekrarı sınavdan 1–3 gün önceye koyun; sınavdan önceki gece yalnızca hafif bir göz gezdirme ve uyku planlayın.",
        "Her gün için toplam tekrar süresini kontrol edin. Aynı güne çok fazla tekrar biriktiyse yeni konu sayısını azaltın."
      ],
      after: [
        "Sınav tarihlerinizi kalan gün sayısıyla listelemek için [[arac:sinav-takvimi-olustur|Sınav Takvimi Oluştur]], haftalık çalışma saatinizi derslere ağırlıklarına göre dağıtmak için [[arac:ders-calisma-plani-hesapla|Ders Çalışma Planı Hesaplama]] aracını kullanabilirsiniz. Günlük planı zaman bloklarıyla kurmak için [[bilgi:gunluk-plan-nasil-yapilir-zaman-bloklama|zaman bloklama]] makalesine göz atın.",
        "Uyku da bu planın parçasıdır: öğrenilen bilginin pekişmesi büyük ölçüde uyku sırasında olur. Sınav dönemi boyunca düzenli uyku, gece geç saatlere kadar yapılan ek çalışmadan genellikle daha faydalıdır."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Tekrarı yeniden okumak sanmak:</strong> Notu baştan okumak pasif bir tekrardır; önce kapatıp hatırlamaya çalışın, sonra kontrol edin.",
        "<strong>Çok fazla yeni kart eklemek:</strong> Her yeni kart gelecekte birkaç tekrar demektir; tekrar yükü birikince plan bırakılır.",
        "<strong>Anlamadan ezberlemek:</strong> Aralıklı tekrar anlamayı değil hatırlamayı güçlendirir. Önce konuyu anlayın, sonra karta dökün.",
        "<strong>Unutulan kartı ileri atmak:</strong> Hatırlayamadığınız kartı dürüstçe başa alın; aksi halde zayıf bilgi uzun aralığa kaçar.",
        "<strong>Planı ilk aksaklıkta bırakmak:</strong> Bir günü kaçırdıysanız ertesi gün kalan tekrarları yapın; planı baştan kurmanız gerekmez."
      ]
    }
  ],
  faq: [
    ["Aralıklı tekrar yöntemi nedir?", "Aralıklı tekrar, öğrenilen bilgiyi tek oturumda değil, giderek uzayan aralıklarla yeniden hatırlamaya çalışarak pekiştirme yöntemidir. Örneğin bir konu ilk çalışmadan 1, 3, 7, 14 ve 30 gün sonra tekrar edilir."],
    ["Unutma eğrisi ne anlatır?", "Unutma eğrisi, öğrenilen bilginin ilk saatlerde hızla, sonra giderek yavaşlayarak unutulduğunu gösterir. Hermann Ebbinghaus'un 1885'te yayımladığı deneylere dayanır; anlamlı ve iyi anlaşılmış bilgi anlamsız hecelerden çok daha yavaş unutulur."],
    ["Konular hangi aralıklarla tekrar edilmeli?", "Yaygın ve iyi bir başlangıç planı ilk çalışmadan sonraki 1., 3., 7., 14. ve 30. günlerdir. Zorlandığınız konularda aralığı kısaltın, kolay hatırladıklarınızda uzatın; son tekrarı sınavdan birkaç gün önceye yerleştirin."],
    ["Ezber kartları (flashcard) nasıl kullanılır?", "Her karta tek bilgi yazılır, ön yüze bakılarak cevap bakmadan söylenir, sonra kontrol edilir. Doğru bilinen kartın aralığı büyütülür, yanlış bilinen kart başa döner; Leitner kutusu bunu numaralı bölmelerle düzenler."],
    ["Kelime ezberlemek için en iyi yöntem nedir?", "Kelimeleri örnek cümle içinde, iki yönlü kartlarla ve aralıklı tekrarla çalışmak en verimli yoldur. Günde 10–20 yeni kelimeyle sınırlı kalmak tekrar yükünü yönetilebilir tutar; sesli söylemek telaffuzu da pekiştirir."],
    ["Sınava kaç gün kala tekrar planı yapılmalı?", "Mümkünse konu ilk öğrenildiği gün ya da dönem başında plan kurulmalıdır. Sınava az zaman kaldıysa aralıklar sıkıştırılır; son tekrar sınavdan 1–3 gün önceye konur ve sınavdan önceki gece uykuya öncelik verilir."],
    ["Aralıklı tekrar ile blok çalışma farkı nedir?", "Blok çalışmada konu tek uzun oturumda çalışılır ve kısa vadede iyi hissettirir ama hızla unutulur. Aralıklı tekrarda aynı süre birçok kısa oturuma yayılır; tekrarda zorlanma olsa da bilgi haftalar sonra çok daha iyi hatırlanır."],
    ["Sınav takvimi tekrar planına nasıl eklenir?", "Önce bütün sınav tarihleri ve kapsadıkları konular tek takvimde toplanır. Ardından her konunun tekrarları sınavdan geriye doğru yerleştirilir, aynı güne biriken tekrar süresi kontrol edilir ve gerekirse yeni konu sayısı azaltılır."],
    ["Tekrar ederken notları yeniden okumak yeterli mi?", "Yeniden okumak tanıdıklık hissi verir ama hatırlamayı zayıf güçlendirir. Etkili tekrar için önce notu kapatıp bilgiyi hatırlamaya çalışmak, sonra kontrol etmek ve eksikleri işaretlemek gerekir."]
  ],
  tools: ["konu-tekrar-plani", "ezber-karti-zamanlama", "sinav-takvimi-olustur", "ders-calisma-plani-hesapla"],
  related: ["pomodoro-teknigi-nedir", "gunluk-plan-nasil-yapilir-zaman-bloklama", "dakikada-kac-kelime-okunur"],
  sources: [
    ["MEB – Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü", "https://odsgm.meb.gov.tr/"],
    ["ÖSYM – Sınav takvimi", "https://www.osym.gov.tr/"]
  ]
};
