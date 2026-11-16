export default {
  slug: "anagram-ve-palindrom-nedir-ornekler",
  kategori: "gunluk",
  tarih: "2026-11-15",
  title: "Anagram ve Palindrom Nedir? Türkçe Örnekler ve Kelime Oyunları",
  pageTitle: "Anagram ve Palindrom Nedir? Türkçe Örnekler, Sayılar, Tarihler",
  description: "Anagram ve palindrom nedir? Kitap-takip, rakam-marka gibi Türkçe anagramlar, kabak ve Ey Edip Adana'da pide ye gibi palindromlar, palindrom sayı ve tarihler.",
  keywords: ["anagram nedir", "palindrom nedir", "tersten okunuşu aynı kelimeler", "türkçe palindrom örnekleri", "anagram örnekleri", "harfleri karıştırma", "palindrom sayı", "palindrom tarih"],
  lead: "Anagram, bir kelimenin ya da cümlenin harflerinin yerleri değiştirilerek oluşturulan başka bir kelime ya da cümledir: <strong>kitap → takip</strong>, <strong>rakam → marka</strong>. Palindrom ise tersten okunduğunda da aynı kalan kelime, cümle ya da sayıdır: <strong>kabak, ses, küllük</strong> ve \"Ey Edip Adana'da pide ye\". İki kavram da harf düzeniyle oynar, ama biri harfleri karıştırır, öteki simetri arar. Bu sayfada Türkçe örnekleri, palindrom sayı ve tarihleri, iki kelimenin anagram olup olmadığını denetlemeyi ve Türkçe karakterlerin neden önemli olduğunu bulacaksınız.",
  kisaCevap: [
    "Anagram: aynı harflerin aynı sayıda kullanılıp yeniden dizilmesiyle elde edilen kelime ya da cümle (masal → salam).",
    "Palindrom: soldan sağa ve sağdan sola aynı okunan dizi (kayak, neden, 12321).",
    "İki kelime anagramsa harflerini alfabetik sıraladığınızda aynı dizi çıkar: kitap ve takip → a i k p t.",
    "Cümle palindromlarında boşluk, büyük-küçük harf ve noktalama yok sayılır.",
    "Türkçede I ile ı, İ ile i farklı harflerdir; IRMAK ve kırma ancak Türkçe kurallarla anagram çıkar.",
    "Palindrom sayılar ters çevir-topla yöntemiyle bulunabilir: 87 → 165 → 726 → 1.353 → 4.884."
  ],
  figure: {
    alt: "Solda kitap kelimesinin harflerinin yer değiştirerek takip kelimesine dönüştüğü anagram şeması, sağda kabak kelimesinin ortadaki harf etrafında simetrik olduğu palindrom şeması.",
    caption: "Anagram harfleri yeniden dizer; harf kümesi aynı kalır. Palindrom ise bir simetri eksenine sahiptir: ilk harf sonuncuyla, ikinci harf sondan ikinciyle eşleşir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="180" y="32" class="lg b mid">Anagram: harfleri karıştır</text>
  <text x="540" y="32" class="lg b mid">Palindrom: tersten de aynı</text>
  <line x1="360" y1="50" x2="360" y2="380" class="sb dash" fill="none"/>
  <g class="mid">
    <rect x="30" y="64" width="52" height="52" rx="6" class="p"/><text x="56" y="98" class="xl sf">K</text>
    <rect x="88" y="64" width="52" height="52" rx="6" class="ps"/><text x="114" y="98" class="xl">İ</text>
    <rect x="146" y="64" width="52" height="52" rx="6" class="oks"/><text x="172" y="98" class="xl">T</text>
    <rect x="204" y="64" width="52" height="52" rx="6" class="sf sb"/><text x="230" y="98" class="xl">A</text>
    <rect x="262" y="64" width="52" height="52" rx="6" class="dgs"/><text x="288" y="98" class="xl">P</text>
    <rect x="30" y="196" width="52" height="52" rx="6" class="oks"/><text x="56" y="230" class="xl">T</text>
    <rect x="88" y="196" width="52" height="52" rx="6" class="sf sb"/><text x="114" y="230" class="xl">A</text>
    <rect x="146" y="196" width="52" height="52" rx="6" class="p"/><text x="172" y="230" class="xl sf">K</text>
    <rect x="204" y="196" width="52" height="52" rx="6" class="ps"/><text x="230" y="230" class="xl">İ</text>
    <rect x="262" y="196" width="52" height="52" rx="6" class="dgs"/><text x="288" y="230" class="xl">P</text>
  </g>
  <line x1="56" y1="118" x2="172" y2="194" class="st" fill="none"/>
  <line x1="114" y1="118" x2="230" y2="194" class="st" fill="none"/>
  <line x1="172" y1="118" x2="56" y2="194" class="st" fill="none"/>
  <line x1="230" y1="118" x2="114" y2="194" class="st" fill="none"/>
  <line x1="288" y1="118" x2="288" y2="194" class="st" fill="none"/>
  <text x="172" y="284" class="sm mid">Sıralı harfler: A İ K P T = A İ K P T</text>
  <text x="172" y="306" class="sm mid t2">aynı küme → anagram</text>
  <rect x="20" y="326" width="320" height="56" rx="8" class="sf sb"/>
  <text x="180" y="350" class="sm mid">rakam → marka · masal → salam</text>
  <text x="180" y="370" class="sm mid">arpa → para · kasap → pasak</text>
  <g class="mid">
    <rect x="400" y="130" width="52" height="52" rx="6" class="p"/><text x="426" y="164" class="xl sf">K</text>
    <rect x="458" y="130" width="52" height="52" rx="6" class="ps"/><text x="484" y="164" class="xl">A</text>
    <rect x="516" y="130" width="52" height="52" rx="6" class="a"/><text x="542" y="164" class="xl sf">B</text>
    <rect x="574" y="130" width="52" height="52" rx="6" class="ps"/><text x="600" y="164" class="xl">A</text>
    <rect x="632" y="130" width="52" height="52" rx="6" class="p"/><text x="658" y="164" class="xl sf">K</text>
  </g>
  <line x1="542" y1="110" x2="542" y2="200" class="sa sw dash" fill="none"/>
  <path d="M426,124 Q542,64 658,124" class="sp" fill="none"/>
  <path d="M484,124 Q542,92 600,124" class="sp" fill="none"/>
  <text x="542" y="226" class="sm mid">simetri ekseni</text>
  <rect x="380" y="250" width="320" height="132" rx="8" class="sf sb"/>
  <text x="540" y="276" class="sm mid b">Kelime: kabak, kayak, ses, ütü, küllük</text>
  <text x="540" y="300" class="sm mid">Cümle: Ey Edip Adana'da pide ye</text>
  <text x="540" y="324" class="sm mid">Sayı: 12321 · 4884 · 2002</text>
  <text x="540" y="348" class="sm mid">Tarih: 22.02.2022 → 22022022</text>
  <text x="540" y="370" class="sm mid t2">boşluk ve noktalama yok sayılır</text>
</svg>`
  },
  sections: [
    {
      h: "Anagram nedir?",
      p: [
        "<strong>Anagram</strong>, bir kelime ya da cümlenin bütün harflerini, her birini aynı sayıda kullanarak başka bir sıraya dizmekle elde edilen yeni kelime ya da cümledir. Harf eksiltmek ya da eklemek anagramı bozar: \"kitap\" ile \"takip\" anagramdır, çünkü ikisinde de birer a, i, k, p ve t vardır; \"kitap\" ile \"tapı\" anagram değildir, çünkü k harfi eksiktir.",
        "Anagramlar yüzyıllardır kelime oyunlarında, bulmacalarda, takma ad üretmede ve şiirde kullanılır. Bazı yazarlar adlarının harflerini yeniden dizerek mahlas oluşturmuştur. Bilgi yarışmalarında \"harfleri karışık kelimeyi bulun\" türü sorular da birer anagram çözme alıştırmasıdır.",
        "Anagramın matematiksel tanımı basittir: iki dizinin harf <strong>çoklu kümeleri</strong> aynıysa, yani her harf iki dizide aynı sayıda geçiyorsa, bu diziler birbirinin anagramıdır. Bu tanım, bir bilgisayarın anagram denetimini nasıl yaptığını da açıklar."
      ]
    },
    {
      h: "Türkçede bilinen anagram örnekleri",
      p: [
        "Türkçe eklemeli bir dil olduğu için kelime kökleri arasında çok sayıda anagram bulunur. Aşağıdaki örneklerin hepsi sözlükte yer alan kelimelerden oluşur:"
      ],
      table: {
        head: ["Kelime", "Anagramı", "Sıralı harfler"],
        rows: [
          ["kitap", "takip", "a i k p t"],
          ["rakam", "marka", "a a k m r"],
          ["masal", "salam", "a a l m s"],
          ["arpa", "para", "a a p r"],
          ["kasap", "pasak", "a a k p s"],
          ["ırmak", "kırma", "a ı k m r"],
          ["kalem", "Kemal (özel ad)", "a e k l m"]
        ],
        caption: "Sıralı harf sütunu, iki kelimenin aynı harf kümesinden oluştuğunu gösterir. Türkçe alfabe sırasında ı, i'den önce gelir."
      },
      after: [
        "Kendi kelime çiftlerinizi [[arac:anagram-kontrol|Anagram Kontrolü]] aracında deneyebilirsiniz; araç iki girdinin sıralı harf dizilimini ve varsa fazla ya da eksik harfleri gösterir. Türk alfabesinin harf sırası için [[bilgi:turk-alfabesi-kac-harf|Türk alfabesi yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "İki kelimenin anagram olup olmadığı nasıl kontrol edilir?",
      p: [
        "Elle denetlemenin en güvenilir yolu harf saymaktır. Bilgisayarlar da aynı mantığı kullanır: iki diziyi aynı biçime getirir, harflerini sıralar ve karşılaştırır."
      ],
      ol: [
        "İki girdiyi de küçük harfe çevirin; Türkçe metinde I harfinin ı, İ harfinin i olmasına dikkat edin.",
        "Boşlukları, noktalama işaretlerini ve kesme işaretlerini silin. Cümle anagramlarında yalnızca harfler sayılır.",
        "Her iki dizinin harflerini alfabe sırasına dizin: \"kitap\" → a i k p t, \"takip\" → a i k p t.",
        "Sıralı diziler birebir aynıysa kelimeler anagramdır. Farklıysa, hangi harfin fazla ya da eksik olduğu da bu karşılaştırmada ortaya çıkar.",
        "Alternatif yöntem: her harfin kaç kez geçtiğini sayan bir tablo yapın; iki tablo eşitse anagramdır."
      ],
      after: [
        "Uzunluk hızlı bir ön testtir: harf sayıları farklıysa iki kelime anagram olamaz. \"Masal\" ve \"salam\" beşer harftir; \"masal\" ile \"salata\" altı harf olduğu için daha ilk adımda elenir."
      ]
    },
    {
      h: "Türkçe karakterler anagram kontrolünü nasıl etkiler?",
      p: [
        "Türkçede noktalı ve noktasız i ayrı harflerdir: büyük I'nın küçüğü ı, büyük İ'nin küçüğü i'dir. Birçok yazılım ise büyük-küçük harf dönüşümünü İngilizce kurallarına göre yapar ve I harfini i'ye çevirir. Bu durumda \"IRMAK\" kelimesi \"irmak\" olur ve \"kırma\" ile anagram sayılmaz, oysa Türkçe kurallarla ikisi aynı harflerden oluşur.",
        "Benzer bir sorun ç, ğ, ö, ş, ü harflerinde de görülür. Bazı araçlar bu harfleri c, g, o, s, u'ya indirger; o zaman \"aşk\" ile \"kas\" yanlışlıkla anagram görünebilir, çünkü ş harfi s'ye dönüşür. Bilişim Ajans'ın anagram ve palindrom araçları Türkçe harf kurallarını uygular ve bu harfleri ayrı tutar. Bilgisayarlarda Türkçe karakterlerin nasıl kodlandığını [[bilgi:ascii-unicode-utf8-farki|ASCII, Unicode ve UTF-8 yazısında]] bulabilirsiniz."
      ]
    },
    {
      h: "Palindrom nedir?",
      p: [
        "<strong>Palindrom</strong>, baştan ve sondan okunduğunda aynı olan kelime, cümle, sayı ya da dizidir. Adını Yunanca \"geri dönen yol\" anlamına gelen bir ifadeden alır. Palindromun bir simetri ekseni vardır: tek sayıda harfli palindromlarda eksen ortadaki harfin üzerindedir (ka<strong>b</strong>ak), çift sayıda harfli olanlarda iki harfin arasındadır (kül|lük).",
        "Kelime palindromları kısa ve sık görülürken anlamlı cümle palindromları çok daha zordur; her kelimenin tersten okunuşunun da anlamlı bir cümle parçası oluşturması gerekir. Cümle palindromlarında boşluklar, büyük-küçük harf ve noktalama işaretleri yok sayılır."
      ]
    },
    {
      h: "Tersten de aynı okunan Türkçe kelime ve cümleler",
      table: {
        head: ["Tür", "Örnekler"],
        rows: [
          ["Üç harfli kelimeler", "kek, ses, sus, ütü, nan, ana, ece"],
          ["Beş harfli kelimeler", "kabak, kazak, kayak, kavak, kepek, neden, kılık"],
          ["Altı harfli kelime", "küllük"],
          ["Özel adlar", "Nalan, Ece"],
          ["Cümleler", "Ey Edip Adana'da pide ye · Para hazır ama Rıza harap · Anastas mum satsana"]
        ],
        caption: "Cümle palindromları harfler birleştirilerek denetlenir: \"Ey Edip Adana'da pide ye\" → eyedipadanadapideye."
      },
      after: [
        "Bir kelimenin ya da cümlenin palindrom olup olmadığını [[arac:palindrom-kontrol|Palindrom Kelime Kontrolü]] aracında denetleyebilirsiniz; araç boşluk ve noktalamayı yok sayar ve tersten yazılışı gösterir. Bir metni harf harf, kelime kelime ya da satır satır ters çevirmek için [[arac:metni-ters-cevir|Metni Ters Çevirme]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Palindrom sayılar ve tarihler nasıl bulunur?",
      p: [
        "Sayılarda da aynı kural geçerlidir: 121, 4.884, 12.321 ve 2.002 tersten de aynı okunur. Tek basamaklı sayıların hepsi palindromdur; iki basamaklılarda 9 tane (11, 22, …, 99), üç basamaklılarda 90 tane, dört basamaklılarda yine 90 tane, beş basamaklılarda 900 tane palindrom vardır. Bunun nedeni, sayının ilk yarısını seçtiğinizde ikinci yarısının kendiliğinden belirlenmesidir."
      ],
      formula: "Ters çevir-topla yöntemi:\n87 + 78 = 165\n165 + 561 = 726\n726 + 627 = 1.353\n1.353 + 3.531 = 4.884 → palindrom (4 adım)",
      after: [
        "Çoğu sayı birkaç adımda bu yöntemle palindroma ulaşır; ancak 196 gibi bazı sayıların bugüne kadar yapılan çok uzun denemelerde palindroma ulaşmadığı bilinmektedir ve ulaşıp ulaşmayacakları kanıtlanmamıştır. [[arac:palindrom-sayi-kontrol|Palindrom Sayı Kontrolü]] aracı bir sayının palindrom olup olmadığını, kendisinden sonraki ilk palindromu ve ters çevir-topla sonucunu gösterir.",
        "Tarihler de gün, ay ve yıl rakamları yan yana yazıldığında palindrom olabilir. GG.AA.YYYY biçiminde 02.02.2020 (02022020) ve 22.02.2022 (22022022) yakın geçmişin palindrom tarihleridir. 16 Kasım 2026'dan sonraki ilk palindrom tarih 03.02.2030'dur (03022030); çünkü 2027, 2028 ve 2029 için gerekli gün değerleri (72, 82, 92) takvimde yoktur."
      ]
    },
    {
      h: "Okulda ve etkinliklerde anagram ve palindrom",
      p: [
        "Anagram ve palindrom çalışmaları, ilkokuldan itibaren kelime dağarcığını ve harf farkındalığını geliştirmek için sınıf etkinliklerinde sık kullanılır. Öğrencilerden verilen bir kelimenin harfleriyle yeni kelimeler türetmeleri, beş harfli palindrom avına çıkmaları ya da kendi adlarının anagramını bulmaları istenebilir.",
        "Bu oyunlar yazım dikkatini de artırır: bir harfi yanlış yazan öğrenci anagramın tutmadığını hemen görür. Matematik derslerinde ise palindrom sayılar basamak değeri, simetri ve olasılık konularına eğlenceli bir giriş sağlar; örneğin rastgele seçilen dört basamaklı bir sayının palindrom olma olasılığı 90 ÷ 9.000 = %1'dir."
      ]
    },
    {
      h: "Bulmacalarda anagram ipuçları nasıl çözülür?",
      p: [
        "Çengel bulmaca ve şifreli bulmacalarda anagram ipuçları genellikle \"karışık\", \"bozuk\", \"dağınık\", \"yeniden düzenlenmiş\" gibi sözcüklerle verilir. Çözüm için şu sıra işe yarar:"
      ],
      ol: [
        "İpucundaki harf sayısını ve bulmacadaki kutu sayısını karşılaştırın; eşit olmalıdır.",
        "Harfleri bir kâğıda daire biçiminde yazın; düz sırada görmek beynin aynı kelimeyi tekrar okumasına yol açar.",
        "Türkçede sık görülen ek ve hece kalıplarını arayın: -lar, -ler, -lık, -cı gibi ekler ya da \"ka\", \"ma\" gibi heceler.",
        "Çaprazdaki kesişen harfleri yerleştirin; bir iki harf bile olasılıkları büyük ölçüde azaltır.",
        "Takıldığınızda harfleri [[arac:kelime-karistir|Kelime Harflerini Karıştırma]] aracıyla rastgele dizip yeni bir bakış açısı kazanın."
      ],
      after: [
        "Beş farklı harften oluşan bir kelimenin 5! = 120 farklı dizilişi vardır; altı harfte bu sayı 720'ye çıkar. Bu yüzden deneme yanılma yerine kalıp aramak daha verimlidir. Diziliş sayısının nasıl hesaplandığı [[bilgi:permutasyon-ve-kombinasyon-farki|permütasyon ve kombinasyon yazısında]] anlatılır. Kelime oyunları için daha fazla yöntemi [[rehber:kelime-bulucu-ve-kelime-oyunlari|kelime bulucu rehberinde]] bulabilirsiniz."
      ]
    }
  ],
  faq: [
    ["Anagram nedir?", "Anagram, bir kelimenin ya da cümlenin bütün harflerinin aynı sayıda kullanılıp yeniden dizilmesiyle elde edilen başka bir kelime ya da cümledir. Kitap ile takip, masal ile salam birbirinin anagramıdır; harf eklemek ya da eksiltmek anagramı bozar."],
    ["Türkçede bilinen anagram örnekleri nelerdir?", "Kitap-takip, rakam-marka, masal-salam, arpa-para, kasap-pasak ve ırmak-kırma Türkçede sözlükte yer alan anagram çiftleridir. Kalem ile Kemal de bir özel adla oluşan anagram örneğidir."],
    ["Palindrom nedir?", "Palindrom, baştan ve sondan okunduğunda aynı kalan kelime, cümle, sayı ya da dizidir. Kabak, ses, küllük ve neden kelime örnekleridir; cümlelerde boşluk, büyük-küçük harf ve noktalama yok sayılarak denetlenir."],
    ["Tersten de aynı okunan Türkçe kelime ve cümleler hangileridir?", "Kek, ses, ütü, kabak, kazak, kayak, kavak, kepek, neden ve küllük kelime örnekleridir. Ey Edip Adana'da pide ye, Para hazır ama Rıza harap ve Anastas mum satsana bilinen Türkçe cümle palindromlarıdır."],
    ["Palindrom sayılar nasıl bulunur?", "Bir sayının rakamları ters çevrildiğinde aynı sayı çıkıyorsa palindromdur. Yeni palindrom elde etmek için ters çevir-topla yöntemi kullanılabilir: 87, 165, 726 ve 1.353 adımlarından sonra 4.884 palindromuna ulaşılır."],
    ["İki kelimenin anagram olup olmadığı nasıl kontrol edilir?", "İki kelimeyi küçük harfe çevirip boşluk ve noktalamayı silin, sonra harflerini alfabe sırasına dizin. Sıralı diziler aynıysa kelimeler anagramdır. Anagram Kontrolü aracı bunu Türkçe harf kurallarıyla otomatik yapar."],
    ["Bulmacalarda anagram ipuçları nasıl çözülür?", "Önce harf sayısını kutu sayısıyla karşılaştırın, harfleri daire biçiminde yazın, Türkçe ek ve hece kalıplarını arayın ve çaprazdaki kesişen harfleri yerleştirin. Takıldığınızda harfleri rastgele karıştırmak yeni bir bakış açısı sağlar."],
    ["Türkçe karakterler anagram kontrolünü nasıl etkiler?", "Türkçede I'nın küçüğü ı, İ'nin küçüğü i'dir; İngilizce kurallı yazılımlar I'yı i'ye çevirdiği için IRMAK ile kırma anagram çıkmaz. Ç, ğ, ö, ş, ü harflerinin c, g, o, s, u'ya indirgenmesi de yanlış sonuç verir."],
    ["Palindrom tarih nedir, bir sonraki ne zaman?", "Gün, ay ve yıl rakamları yan yana yazıldığında tersten de aynı okunan tarihlerdir; 22.02.2022 buna örnektir. GG.AA.YYYY biçiminde 16 Kasım 2026'dan sonraki ilk palindrom tarih 03.02.2030'dur."]
  ],
  tools: ["anagram-kontrol", "palindrom-kontrol", "kelime-karistir", "palindrom-sayi-kontrol", "metni-ters-cevir"],
  related: ["turk-alfabesi-kac-harf", "permutasyon-ve-kombinasyon-farki"]
};
