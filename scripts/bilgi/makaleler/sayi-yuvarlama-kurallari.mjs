export default {
  slug: "sayi-yuvarlama-kurallari",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Sayı Yuvarlama Nasıl Yapılır? Onluğa, Yüzlüğe ve Ondalık Yuvarlama Kuralları",
  pageTitle: "Sayı Yuvarlama Kuralları: Onluğa, Yüzlüğe, Ondalık Yuvarlama",
  description: "Yuvarlamada bir sağdaki basamağa bakılır: 5 ve üzeri yukarı, 4 ve altı aşağı. Onluğa, yüzlüğe, virgülden sonra iki basamağa, bankacı yuvarlaması ve para örnekleri.",
  keywords: ["yuvarlama nasıl yapılır", "en yakın onluğa yuvarlama", "yüzlüğe yuvarlama", "ondalık sayı yuvarlama", "yuvarlama kuralları", "5 yukarı mı yuvarlanır", "bankacı yuvarlaması", "virgülden sonra iki basamak", "bilimsel gösterim"],
  lead: "Bir sayıyı yuvarlamak için yuvarlanacak basamağın <strong>hemen sağındaki rakama</strong> bakılır: bu rakam 5, 6, 7, 8 ya da 9 ise basamak bir artırılır, 0, 1, 2, 3 ya da 4 ise olduğu gibi bırakılır; sağdaki basamaklar sıfırlanır ya da atılır. Örneğin 347 en yakın onluğa 350'ye, en yakın yüzlüğe 300'e yuvarlanır; 3,14159 virgülden sonra iki basamağa 3,14 olur. Bu sayfada okuldaki yuvarlama kuralını, 5 ile biten sayıların durumunu, bankacı yuvarlamasını, tahminle farkını, para hesaplarını ve bilimsel gösterimi örneklerle bulacaksınız.",
  kisaCevap: [
    "Yuvarlanacak basamağın sağındaki rakam 5 veya daha büyükse basamak 1 artar, 4 veya daha küçükse değişmez.",
    "En yakın onluğa yuvarlamada birler basamağına bakılır: 347 → 350, 342 → 340.",
    "Okulda tam ortadaki 5 yukarı yuvarlanır: 345 → 350, 2,5 → 3.",
    "Virgülden sonra iki basamağa yuvarlamada üçüncü ondalık basamağa bakılır: 2,675 → 2,68.",
    "Bankacı yuvarlamasında tam ortadaki değer en yakın çift sayıya gider: 2,5 → 2, 3,5 → 4.",
    "Bilimsel gösterimde sayı 1 ile 10 arasında bir katsayı ve 10'un kuvvetiyle yazılır: 299.792.458 ≈ 3,00 × 10<sup>8</sup>."
  ],
  figure: {
    alt: "Sayı doğrusu üzerinde 340 ile 350 arası: 341, 342, 343 ve 344 aşağı ok ile 340'a, 345'ten 349'a kadar olanlar yukarı ok ile 350'ye gidiyor. Altta 347'nin onluğa, yüzlüğe ve binliğe yuvarlanması.",
    caption: "Onluğa yuvarlamada belirleyici olan birler basamağıdır. 345 tam ortadadır; okul kuralında yukarı (350), bankacı yuvarlamasında çift onluğa (340) gider.",
    svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">En yakın onluğa yuvarlama</text>
  <line x1="60" y1="130" x2="660" y2="130" class="st sw" fill="none"/>
  <g class="st" fill="none">
    <line x1="60" y1="118" x2="60" y2="142"/><line x1="120" y1="124" x2="120" y2="136"/><line x1="180" y1="124" x2="180" y2="136"/>
    <line x1="240" y1="124" x2="240" y2="136"/><line x1="300" y1="124" x2="300" y2="136"/><line x1="360" y1="118" x2="360" y2="142"/>
    <line x1="420" y1="124" x2="420" y2="136"/><line x1="480" y1="124" x2="480" y2="136"/><line x1="540" y1="124" x2="540" y2="136"/>
    <line x1="600" y1="124" x2="600" y2="136"/><line x1="660" y1="118" x2="660" y2="142"/>
  </g>
  <rect x="34" y="150" width="52" height="30" rx="6" class="p"/><text x="60" y="171" class="b mid sf">340</text>
  <rect x="634" y="150" width="52" height="30" rx="6" class="p"/><text x="660" y="171" class="b mid sf">350</text>
  <g class="sm mid">
    <text x="120" y="112">341</text><text x="180" y="112">342</text><text x="240" y="112">343</text><text x="300" y="112">344</text>
    <text x="360" y="112" class="b p">345</text><text x="420" y="112">346</text><text x="480" y="112">347</text><text x="540" y="112">348</text><text x="600" y="112">349</text>
  </g>
  <rect x="80" y="56" width="250" height="30" rx="6" class="dgs"/>
  <text x="205" y="76" class="sm b mid">1–4: aşağı → 340</text>
  <rect x="340" y="56" width="280" height="30" rx="6" class="oks"/>
  <text x="480" y="76" class="sm b mid">5–9: yukarı → 350</text>
  <line x1="320" y1="210" x2="320" y2="210" class="sb" fill="none"/>
  <rect x="40" y="210" width="640" height="150" rx="10" class="sf sb"/>
  <text x="60" y="240" class="b">347 sayısı farklı basamaklara</text>
  <text x="60" y="272">Onluğa: birler 7 ≥ 5</text><text x="660" y="272" class="b end p">→ 350</text>
  <text x="60" y="302">Yüzlüğe: onlar 4 &lt; 5</text><text x="660" y="302" class="b end p">→ 300</text>
  <text x="60" y="332">Binliğe: yüzler 3 &lt; 5</text><text x="660" y="332" class="b end p">→ 0</text>
  <text x="360" y="352" class="sm mid t2">Her seferinde yalnızca hedef basamağın bir sağına bakılır.</text>
</svg>`
  },
  sections: [
    {
      h: "Yuvarlama nedir, ne işe yarar?",
      p: [
        "Yuvarlama, bir sayıyı belirli bir basamağa kadar kısaltarak ona en yakın \"daha sade\" sayıyı bulmaktır. Amaç, gereğinden fazla ayrıntıyı atıp sayıyı okunur, akılda kalır ve kullanışlı hale getirmektir. Bir şehrin nüfusunu 2.384.517 yerine \"yaklaşık 2,4 milyon\" demek ya da 12,4867 TL'lik bir tutarı 12,49 TL olarak yazmak yuvarlamadır.",
        "Yuvarlama ilkokul 3. ve 4. sınıfta en yakın onluğa ve yüzlüğe yuvarlamayla başlar, ortaokulda ondalık sayılara genişler, lisede ve fen derslerinde anlamlı basamak ve bilimsel gösterimle devam eder. Kural her düzeyde aynıdır; değişen yalnızca hangi basamağa yuvarlandığıdır."
      ]
    },
    {
      h: "Sayı yuvarlama nasıl yapılır? Adım adım kural",
      ol: [
        "Hangi basamağa yuvarlayacağınızı belirleyin (onlar, yüzler, virgülden sonra iki basamak…). Bu basamağın altını çizin.",
        "Altı çizili basamağın hemen sağındaki rakama bakın. Yalnızca bu rakam karar verir; daha sağdakiler etkilemez.",
        "Bu rakam 5, 6, 7, 8 ya da 9 ise altı çizili basamağı 1 artırın. 0, 1, 2, 3 ya da 4 ise olduğu gibi bırakın.",
        "Tam sayılarda sağdaki basamakların hepsini 0 yapın; ondalık kısımda ise sağdaki basamakları atın.",
        "Artırılan basamak 9 ise 10 olur ve bir soldaki basamağa elde aktarılır: 296 onluğa 300, 9,96 bir ondalık basamağa 10,0 olur."
      ],
      table: {
        head: ["Sayı", "Onluğa", "Yüzlüğe", "Binliğe"],
        rows: [
          ["347", "350", "300", "0"],
          ["1.862", "1.860", "1.900", "2.000"],
          ["4.995", "5.000", "5.000", "5.000"],
          ["72.450", "72.450", "72.500", "72.000"],
          ["8.049", "8.050", "8.000", "8.000"]
        ],
        caption: "8.049'u önce onluğa (8.050), sonra yüzlüğe yuvarlarsanız yanlışlıkla 8.100 bulursunuz; doğrusu doğrudan yüzlüğe yuvarlamak ve 8.000 bulmaktır."
      }
    },
    {
      h: "5 ile biten sayılar yukarı mı aşağı mı yuvarlanır?",
      p: [
        "Okul matematiğinde ve günlük hayatta kural nettir: tam ortada kalan 5 <strong>yukarı</strong> yuvarlanır. 345 en yakın onluğa 350, 2,5 tam sayıya 3, 0,125 iki basamağa 0,13 olur. Bu yönteme \"yarım yukarı\" denir.",
        "Negatif sayılarda \"yukarı\" sözcüğü karışıklık yaratabilir. Okulda ve çoğu hesap programında tam ortadaki değer <strong>sıfırdan uzağa</strong> yuvarlanır: −2,5 → −3. Bazı programlama dillerinin hazır işlevleri ise −2,5'i −2'ye (pozitif sonsuza doğru) yuvarlar. Sonuçlar arasında fark görürseniz kullanılan yöntemi kontrol edin.",
        "Ölçüm sonuçlarında da aynı kural uygulanır, ama burada yuvarlanacak basamağı ölçü aletinin hassasiyeti belirler. Milimetre bölmeli bir cetvelle 12,46 cm okunan bir uzunluk 12,5 cm olarak raporlanır; ölçmediğiniz bir basamağı yazmak, olmayan bir kesinlik izlenimi verir.",
        "Tam ortada olmayan sayılarda tartışma yoktur: 2,51 her yöntemde 3'e, 2,49 her yöntemde 2'ye gider. Fark yalnızca sağdaki kısım tam olarak 5, 50, 500… olduğunda ortaya çıkar."
      ]
    },
    {
      h: "Ondalık sayı virgülden sonra iki basamağa nasıl yuvarlanır?",
      p: [
        "Ondalık sayılarda da aynı kural geçerlidir; yalnızca basamak adları değişir. Virgülden sonraki birinci basamak onda birler, ikincisi yüzde birler, üçüncüsü binde birlerdir. İki basamağa yuvarlarken üçüncü basamağa bakılır."
      ],
      ul: [
        "3,14159 → iki basamağa: üçüncü basamak 1 < 5, sonuç 3,14. Dört basamağa: beşinci basamak 9, sonuç 3,1416.",
        "2,675 → iki basamağa: üçüncü basamak 5, okul kuralında yukarı, sonuç 2,68.",
        "0,0049 → iki basamağa: üçüncü basamak 0, sonuç 0,00. Üç basamağa: dördüncü basamak 9, sonuç 0,005.",
        "12,996 → iki basamağa: 12,99 + 0,01 = 13,00. Sondaki sıfırlar istenen hassasiyeti gösterdiği için yazılabilir."
      ],
      after: [
        "Bilgisayarlar ondalık sayıları ikilik sistemde yaklaşık sakladığı için 2,675 gibi değerler bazı programlarda 2,67'ye yuvarlanabilir; nedenini [[bilgi:ieee-754-kayan-nokta-0-1-0-2|IEEE 754 kayan nokta]] makalesi açıklar. [[arac:yuvarlama-hesapla|Yuvarlama Hesaplama]] aracı sayıyı metin olarak işlediği için bu hatayı yapmaz; yarım yukarı, tavan, taban, kesme ve bankacı yuvarlamasını yan yana gösterir."
      ]
    },
    {
      h: "Yuvarlama yöntemleri: tavan, taban, kesme ve bankacı yuvarlaması",
      p: [
        "\"Yuvarlama\" denince çoğunlukla en yakın değere yuvarlama anlaşılır, ama farklı işler farklı yöntem gerektirir. Aşağıdaki tablo aynı sayıların tam sayıya hangi yöntemle nasıl yuvarlandığını gösterir."
      ],
      table: {
        head: ["Sayı", "Yarım yukarı", "Tavan (yukarı)", "Taban (aşağı)", "Kesme", "Bankacı"],
        rows: [
          ["2,3", "2", "3", "2", "2", "2"],
          ["2,5", "3", "3", "2", "2", "2"],
          ["3,5", "4", "4", "3", "3", "4"],
          ["2,7", "3", "3", "2", "2", "3"],
          ["−2,5", "−3", "−2", "−3", "−2", "−2"]
        ],
        caption: "Tavan pozitif sonsuza, taban negatif sonsuza doğru yuvarlar; kesme yalnızca ondalık kısmı atar."
      },
      ul: [
        "<strong>Tavan (yukarı yuvarlama):</strong> \"Yetmeme\" riskinin olduğu yerlerde kullanılır. 23 kişilik grup 5 kişilik araçlara bölünecekse 4,6 araç değil 5 araç gerekir.",
        "<strong>Taban ve kesme:</strong> Tamamlanmış birimleri sayarken kullanılır; 37 ay için \"3 yıl\" dersiniz, 3,08 yıl 4 yıl sayılmaz.",
        "<strong>Bankacı yuvarlaması:</strong> Tam ortadaki değer en yakın çift sayıya gider. Çok sayıda yuvarlamanın toplamında yukarı kayma birikmesini önler; istatistik, muhasebe yazılımları ve ölçüm sistemlerinde kullanılır."
      ]
    },
    {
      h: "Tahmin ile yuvarlama arasındaki fark nedir?",
      p: [
        "Yuvarlama tek bir sayıya kesin bir kuralla uygulanır ve sonucu tektir. <strong>Tahmin</strong> ise bir işlemin sonucunu yaklaşık bulmak için sayıları yuvarlayıp zihinden hesap yapmaktır. Tahmin bir amaçtır, yuvarlama ise bu amaca ulaşmanın aracıdır.",
        "Örneğin 48 + 31 işlemini tahmin etmek için sayılar en yakın onluğa yuvarlanır: 50 + 30 = 80. Gerçek sonuç 79'dur. 398 × 21 için 400 × 20 = 8.000 tahmini yapılır; gerçek sonuç 8.358'dir. Tahmin, hesap makinesindeki bir tuş hatasını fark etmenin en hızlı yoludur: 8.358 yerine 83.580 gördüyseniz bir sıfır fazladır.",
        "Okulda tahmin sorularında hangi basamağa yuvarlanacağı genellikle belirtilir. Belirtilmemişse sayıların büyüklüğüne uygun basamak seçilir ve sonucun \"yaklaşık\" olduğu ≈ işaretiyle gösterilir. Market alışverişinde fiyatları en yakın liraya yuvarlayıp toplamak, kasada çıkacak tutarı birkaç liralık farkla önceden görmenizi sağlar."
      ]
    },
    {
      h: "Para hesaplarında yuvarlama nasıl yapılır?",
      p: [
        "Türk lirası kuruşa kadar bölündüğü için tutarlar virgülden sonra iki basamağa yuvarlanır. KDV, indirim ya da faiz hesaplarında üç ve daha fazla ondalık basamak çıkabilir; bu durumda üçüncü basamağa bakılarak kuruşa yuvarlanır. Örneğin 83,333 TL → 83,33 TL, 19,995 TL → 20,00 TL olur.",
        "Çok kalemli hesaplarda en önemli kural <strong>yuvarlamayı en sona bırakmaktır</strong>. Her kalemi ayrı yuvarlayıp toplamak ile toplamı bir kez yuvarlamak bir iki kuruş fark yaratabilir. Fatura ve bordrolarda hangi aşamada yuvarlama yapılacağı kullanılan yazılıma ve ilgili mevzuata göre belirlenir; resmî bir belge hazırlıyorsanız muhasebecinizin ya da yazılımın kuralını esas alın.",
        "Tutarı yazıyla yazarken de yuvarlanmış değer kullanılır; kuruşların nasıl yazıldığını [[bilgi:para-yaziyla-nasil-yazilir|para yazıyla nasıl yazılır]] makalesinde bulabilirsiniz."
      ]
    },
    {
      h: "Çok büyük sayılar bilimsel gösterimle nasıl yazılır?",
      p: [
        "Bilimsel gösterimde sayı, 1 ile 10 arasında bir katsayı ile 10'un bir kuvvetinin çarpımı olarak yazılır: a × 10<sup>n</sup>. Katsayı, istenen anlamlı basamak sayısına göre yuvarlanır. Bu yöntem hem çok büyük hem çok küçük sayıları kısa ve karşılaştırılabilir hale getirir."
      ],
      ul: [
        "Işık hızı 299.792.458 m/s → 2,99792458 × 10<sup>8</sup>; üç anlamlı basamağa 3,00 × 10<sup>8</sup> m/s.",
        "0,000123 → 1,23 × 10<sup>−4</sup>; virgül dört basamak sağa kaydığı için üs −4'tür.",
        "Türkiye nüfusu gibi milyonluk sayılar haberlerde çoğunlukla \"85,7 milyon\" gibi yuvarlanmış ve önekle yazılır; bu da bir tür ölçekli gösterimdir."
      ],
      after: [
        "Sayıyı bilimsel, mühendislik ve E gösterimine çevirmek için [[arac:bilimsel-gosterim-cevir|Bilimsel Gösterim Çevirici]]yi, mili, mikro, kilo, mega gibi öneklerin değerleri için [[bilgi:si-onekleri-mili-mikro-kilo-mega|SI önekleri]] makalesini kullanabilirsiniz. Yuvarladığınız bir sayı listesini sıraya koymak için [[arac:sayi-siralama|Sayı Sıralama]] aracı da işinize yarar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Zincirleme yuvarlama:</strong> 8.049'u önce onluğa sonra yüzlüğe yuvarlamak 8.100 verir; doğrudan yüzlüğe yuvarlanınca sonuç 8.000'dir.",
        "<strong>Sağdaki tüm basamaklara bakmak:</strong> Karar yalnızca bir sağdaki rakamla verilir; 2,4999 tam sayıya 2'dir.",
        "<strong>Tam sayıda sıfırları silmek:</strong> 347'yi onluğa yuvarlayınca 35 değil 350 yazılır; basamak değeri korunmalıdır.",
        "<strong>9'dan sonraki eldeyi unutmak:</strong> 1,96 bir basamağa 2,0'dır, 1,10 değil.",
        "<strong>Ara sonuçları yuvarlamak:</strong> Çok adımlı hesapta her adımı yuvarlamak hatayı büyütür; yuvarlamayı en sona bırakın.",
        "<strong>Yöntemi belirtmemek:</strong> Ölçüm, para ve istatistikte farklı yöntemler kullanılabilir; raporlarda hangi yöntemin kullanıldığını yazın."
      ]
    }
  ],
  faq: [
    ["Sayı yuvarlama nasıl yapılır?", "Yuvarlanacak basamağın hemen sağındaki rakama bakılır. Bu rakam 5 ve üzeriyse basamak 1 artırılır, 4 ve altıysa değiştirilmez; ardından sağdaki basamaklar tam sayılarda sıfırlanır, ondalık kısımda atılır."],
    ["En yakın onluğa yuvarlama kuralı nedir?", "En yakın onluğa yuvarlarken birler basamağına bakılır. Birler basamağı 0–4 ise onlar basamağı aynı kalır, 5–9 ise bir artar; 347 sayısı 350'ye, 342 sayısı 340'a yuvarlanır."],
    ["5 ile biten sayılar yukarı mı aşağı mı yuvarlanır?", "Okulda ve günlük hesaplarda tam ortadaki 5 yukarı yuvarlanır; 345 onluğa 350, 2,5 tam sayıya 3 olur. Bankacı yuvarlamasında ise tam ortadaki değer en yakın çift sayıya gider ve 2,5 sayısı 2 olur."],
    ["Ondalık sayı virgülden sonra iki basamağa nasıl yuvarlanır?", "Virgülden sonraki üçüncü basamağa bakılır: 5 ve üzeriyse ikinci basamak bir artırılır, değilse aynı kalır. 3,14159 sayısı 3,14'e, 2,675 sayısı 2,68'e yuvarlanır."],
    ["Tahmin ile yuvarlama arasındaki fark nedir?", "Yuvarlama tek bir sayıya uygulanan kesin bir kuraldır. Tahmin ise sayıları yuvarlayıp işlemin sonucunu yaklaşık bulmaktır; 48 + 31 için 50 + 30 = 80 tahmini yapılır, gerçek sonuç 79'dur."],
    ["Bankacı yuvarlaması nedir?", "Bankacı yuvarlaması, tam ortadaki değeri en yakın çift sayıya yuvarlayan yöntemdir: 2,5 → 2, 3,5 → 4. Çok sayıda yuvarlama toplandığında sonuçların sürekli yukarı kaymasını önlediği için muhasebe ve istatistik yazılımlarında kullanılır."],
    ["Para hesaplarında yuvarlama nasıl yapılır?", "Türk lirası tutarları kuruşa, yani virgülden sonra iki basamağa yuvarlanır; üçüncü basamağa bakılır. Çok kalemli hesaplarda yuvarlamayı en sona bırakmak, kalem kalem yuvarlamadan doğan kuruş farklarını önler."],
    ["Çok büyük sayılar bilimsel gösterimle nasıl yazılır?", "Sayı 1 ile 10 arasında bir katsayı ve 10'un kuvveti olarak yazılır. 299.792.458 sayısı üç anlamlı basamakla 3,00 × 10<sup>8</sup>, 0,000123 sayısı ise 1,23 × 10<sup>−4</sup> olarak gösterilir."],
    ["Yukarı yuvarlama ne zaman kullanılır?", "Bir şeyin yetmemesi kabul edilemiyorsa yukarı yuvarlama (tavan) kullanılır. 23 kişiyi 5 kişilik araçlara bölmek 4,6 sonucunu verir, ama 5 araç gerekir; boya, koli ve malzeme hesaplarında da aynı mantık geçerlidir."]
  ],
  tools: ["yuvarlama-hesapla", "bilimsel-gosterim-cevir", "sayi-siralama"],
  related: ["si-onekleri-mili-mikro-kilo-mega", "ieee-754-kayan-nokta-0-1-0-2", "para-yaziyla-nasil-yazilir"],
  sources: [
    ["MEB – İlkokul ve Ortaokul Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"]
  ]
};
