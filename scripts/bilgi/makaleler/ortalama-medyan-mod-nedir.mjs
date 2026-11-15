export default {
  slug: "ortalama-medyan-mod-nedir",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Aritmetik Ortalama, Medyan, Mod ve Açıklık Nedir? Nasıl Bulunur",
  pageTitle: "Medyan, Mod, Ortalama ve Açıklık Nedir? Nasıl Bulunur",
  description: "Medyan sıralı verinin ortasındaki değer, mod en sık tekrar eden değer, açıklık en büyük ile en küçüğün farkıdır. Tek-çift veri, çeyrekler açıklığı ve örnekler.",
  keywords: ["medyan nedir", "mod nedir", "medyan nasıl bulunur", "aritmetik ortalama nasıl hesaplanır", "açıklık nedir", "merkezi eğilim ölçüleri", "çeyrekler açıklığı", "ortanca nedir"],
  lead: "Aritmetik ortalama <strong>verilerin toplamının veri sayısına bölünmesiyle</strong>, medyan (ortanca) <strong>veriler küçükten büyüğe sıralandığında tam ortada kalan değerle</strong>, mod (tepe değer) <strong>en sık tekrar eden değerle</strong> bulunur; açıklık ise en büyük değerden en küçük değerin çıkarılmasıdır. 45, 60, 70, 70, 75, 80, 85, 90, 100 notlarında ortalama 75, medyan 75, mod 70, açıklık 55'tir. Bu yazıda çift sayıda veride medyanı, birden fazla modu, çeyrekler açıklığını ve hangi ölçünün ne zaman daha anlamlı olduğunu 6. sınıf ve TYT düzeyinde örneklerle anlatıyoruz.",
  kisaCevap: [
    "Aritmetik ortalama = veriler toplamı ÷ veri sayısı.",
    "Medyan: veriler sıralanır; tek sayıda veride ortadaki değer, çift sayıda veride ortadaki iki değerin ortalamasıdır.",
    "Mod: en çok tekrar eden değerdir; hiç olmayabilir ya da birden fazla olabilir.",
    "Açıklık (ranj) = en büyük değer − en küçük değer.",
    "Çeyrekler açıklığı = üst çeyrek (Q3) − alt çeyrek (Q1); verinin ortadaki yarısının yayılımını gösterir.",
    "Uç değer içeren verilerde (maaş, ev fiyatı) medyan, ortalamadan daha temsilî bir merkez verir."
  ],
  figure: {
    alt: "Sayı doğrusunda dokuz sınav notu: 45, 60, iki tane 70, 75, 80, 85, 90 ve 100. Ortalama ve medyan 75'te, mod 70'te, açıklık 45 ile 100 arasındaki 55 birimlik mesafe.",
    caption: "Aynı veri setinde dört ölçü: ortalama ve medyan 75'e, mod iki kez tekrar eden 70'e denk gelir. Açıklık uç değerler arasındaki mesafedir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">9 sınav notu üzerinde merkez ve yayılım</text>
  <line x1="60" y1="220" x2="690" y2="220" class="st sw" fill="none"/>
  <g class="sm mid mu">
    <line x1="60" y1="214" x2="60" y2="226" class="st" fill="none"/><text x="60" y="246">40</text>
    <line x1="163" y1="214" x2="163" y2="226" class="st" fill="none"/><text x="163" y="246">50</text>
    <line x1="267" y1="214" x2="267" y2="226" class="st" fill="none"/><text x="267" y="246">60</text>
    <line x1="370" y1="214" x2="370" y2="226" class="st" fill="none"/><text x="370" y="246">70</text>
    <line x1="473" y1="214" x2="473" y2="226" class="st" fill="none"/><text x="473" y="246">80</text>
    <line x1="577" y1="214" x2="577" y2="226" class="st" fill="none"/><text x="577" y="246">90</text>
    <line x1="680" y1="214" x2="680" y2="226" class="st" fill="none"/><text x="680" y="246">100</text>
  </g>
  <g>
    <circle cx="112" cy="200" r="11" class="p"/>
    <circle cx="267" cy="200" r="11" class="p"/>
    <circle cx="370" cy="200" r="11" class="a"/>
    <circle cx="370" cy="174" r="11" class="a"/>
    <circle cx="422" cy="200" r="11" class="p"/>
    <circle cx="473" cy="200" r="11" class="p"/>
    <circle cx="525" cy="200" r="11" class="p"/>
    <circle cx="577" cy="200" r="11" class="p"/>
    <circle cx="680" cy="200" r="11" class="p"/>
  </g>
  <line x1="422" y1="80" x2="422" y2="186" class="sok sw dash" fill="none"/>
  <rect x="432" y="66" width="230" height="52" rx="8" class="oks"/>
  <text x="547" y="88" class="b mid">Ortalama = Medyan = 75</text>
  <text x="547" y="108" class="sm mid">675 ÷ 9 = 75 · 5. sıradaki değer</text>
  <line x1="370" y1="160" x2="370" y2="130" class="sa" fill="none"/>
  <rect x="250" y="80" width="150" height="48" rx="8" class="sf sb"/>
  <text x="325" y="101" class="b mid">Mod = 70</text>
  <text x="325" y="120" class="sm mid t2">2 kez tekrar</text>
  <line x1="112" y1="290" x2="680" y2="290" class="sp sw" fill="none"/>
  <line x1="112" y1="280" x2="112" y2="300" class="sp sw" fill="none"/>
  <line x1="680" y1="280" x2="680" y2="300" class="sp sw" fill="none"/>
  <text x="396" y="318" class="b mid p">Açıklık = 100 − 45 = 55</text>
  <rect x="60" y="340" width="630" height="44" rx="8" class="sf sb"/>
  <text x="375" y="368" class="sm mid t2">Sıralı veri: 45 · 60 · 70 · 70 · 75 · 80 · 85 · 90 · 100</text>
</svg>`
  },
  sections: [
    {
      h: "Merkezi eğilim ve yayılım ölçüleri nedir?",
      p: [
        "Bir veri grubunu tek bir sayıyla özetlemek istediğimizde <strong>merkezi eğilim ölçülerini</strong> kullanırız: aritmetik ortalama, medyan ve mod. Bu üç ölçü, verilerin \"tipik\" değerinin nerede toplandığını farklı yollardan anlatır.",
        "Ancak merkez tek başına yetmez. Ortalaması 70 olan iki sınıftan birinde herkes 65 ile 75 arasında, diğerinde 20 ile 100 arasında not almış olabilir. Verilerin ne kadar dağınık olduğunu gösteren <strong>yayılım ölçüleri</strong> bu farkı ortaya koyar: açıklık, çeyrekler açıklığı ve standart sapma.",
        "Bu konular ortaokulda 6. sınıf veri analizi ünitesinde başlar, lisede çeyrekler açıklığı ve standart sapmayla genişler ve TYT matematiğinde düzenli olarak sorulur."
      ]
    },
    {
      h: "Aritmetik ortalama nasıl hesaplanır?",
      formula: "Aritmetik ortalama = (x₁ + x₂ + … + xₙ) ÷ n",
      p: [
        "Örnek veri: 45, 60, 70, 70, 75, 80, 85, 90, 100. Toplam 675, veri sayısı 9'dur. Ortalama 675 ÷ 9 = 75'tir.",
        "Ortalama, tüm verileri hesaba kattığı için bilgi kaybı yaşatmaz; ama tam da bu yüzden uç değerlere duyarlıdır. Tek bir çok büyük ya da çok küçük değer ortalamayı kendine doğru çeker. Ağırlıklı ortalama, geometrik ortalama gibi farklı türler için [[arac:ortalama-hesapla|Ortalama Hesaplama]] aracını kullanabilirsiniz; karne ortalaması gibi ağırlıklı hesaplarda ders saatleri ağırlık olarak kullanılır."
      ]
    },
    {
      h: "Medyan nedir, nasıl bulunur?",
      p: [
        "Medyan (ortanca), veriler küçükten büyüğe sıralandığında tam ortada kalan değerdir. Verilerin yarısı medyanın altında, yarısı üstündedir. Medyanı bulmadan önce verileri <strong>mutlaka sıralayın</strong>; sırasız listede ortadaki sayıyı almak en sık yapılan hatadır."
      ],
      formula: "Tek sayıda veri (n tek): medyan = (n + 1) ÷ 2'nci sıradaki değer\nÇift sayıda veri (n çift): medyan = (n ÷ 2'nci + n ÷ 2 + 1'inci değer) ÷ 2",
      ol: [
        "Tek sayıda veri: 45, 60, 70, 70, 75, 80, 85, 90, 100 → n = 9, (9 + 1) ÷ 2 = 5'inci değer: <strong>75</strong>.",
        "Çift sayıda veri: listeye 30 eklenirse sıralı veri 30, 45, 60, 70, 70, 75, 80, 85, 90, 100 olur. n = 10; 5'inci ve 6'ncı değerler 70 ve 75'tir: (70 + 75) ÷ 2 = <strong>72,5</strong>.",
        "Aynı yeni veride ortalama 705 ÷ 10 = 70,5'e düşer. Tek bir düşük değer ortalamayı 4,5 puan, medyanı 2,5 puan aşağı çekmiştir."
      ],
      after: [
        "Uzun listelerde sıralamayı ve orta değeri otomatik görmek için [[arac:medyan-hesapla|Medyan Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Mod nedir? Birden fazla mod olabilir mi?",
      p: [
        "Mod (tepe değer), veri grubunda en çok tekrar eden değerdir. Örnek veride 70 iki kez geçtiği için mod 70'tir. Mod, sayısal olmayan verilerde de kullanılabilen tek merkezi eğilim ölçüsüdür: bir sınıfta en çok tercih edilen renk, en çok satılan ayakkabı numarası ya da en sık verilen cevap moddur.",
        "Bir veri grubunda hiç mod olmayabilir (her değer bir kez geçiyorsa) ya da birden fazla mod olabilir. 2, 3, 3, 5, 7, 7, 9 verisinde 3 ve 7 ikişer kez geçtiği için iki mod vardır; bu tür verilere iki modlu denir. Tüm değerler eşit sayıda tekrar ediyorsa (örneğin 4, 4, 6, 6, 8, 8) mod yoktur, çünkü hiçbir değer diğerlerinden sık değildir."
      ]
    },
    {
      h: "Açıklık ve çeyrekler açıklığı",
      p: [
        "<strong>Açıklık</strong> (ranj), en büyük değer ile en küçük değer arasındaki farktır: örnek veride 100 − 45 = 55. Hesaplaması en kolay yayılım ölçüsüdür, ancak yalnızca iki uç değere baktığı için tek bir aykırı değerle çok büyüyebilir. Hızlı hesap için [[arac:aciklik-hesapla|Açıklık Hesaplama]] aracı en küçük, en büyük ve orta açıklığı birlikte verir.",
        "<strong>Çeyrekler açıklığı</strong> bu sorunu azaltır. Sıralı veri dört eşit parçaya bölünür. Alt çeyrek (Q1) alt yarının medyanı, üst çeyrek (Q3) üst yarının medyanıdır. Çeyrekler açıklığı Q3 − Q1'dir ve verinin ortadaki %50'sinin ne kadar yayıldığını gösterir."
      ],
      ol: [
        "Sıralı veri: 45, 60, 70, 70, <strong>75</strong>, 80, 85, 90, 100. Medyan 75.",
        "Alt yarı (medyan hariç): 45, 60, 70, 70 → Q1 = (60 + 70) ÷ 2 = 65.",
        "Üst yarı (medyan hariç): 80, 85, 90, 100 → Q3 = (85 + 90) ÷ 2 = 87,5.",
        "Çeyrekler açıklığı = 87,5 − 65 = 22,5."
      ],
      after: [
        "Not: Çeyrekleri hesaplamak için birden fazla yöntem vardır (medyanı yarılara dahil etmek ya da etmemek, enterpolasyon yapmak gibi). Okul müfredatında genellikle yukarıdaki yöntem kullanılır; hesap makineleri ve yazılımlar küçük farklı sonuçlar verebilir. [[arac:istatistik-hesapla|İstatistik Hesaplama]] aracı çeyrekleri standart sapma ve varyansla birlikte gösterir."
      ]
    },
    {
      h: "Ortalama ile medyan farkı: hangisi ne zaman kullanılır?",
      p: [
        "Altı kişilik bir işyerinde aylık maaşlar 30, 32, 35, 38 ve 40 bin TL ile yöneticinin 400 bin TL'sinden oluşsun. Ortalama 575 ÷ 6 ≈ 95,8 bin TL çıkar; oysa altı kişiden beşi 40 bin TL ve altında kazanmaktadır. Medyan ise (35 + 38) ÷ 2 = 36,5 bin TL'dir ve tipik çalışanı çok daha iyi temsil eder.",
        "Bu nedenle gelir, ev fiyatı, kira, internet hızı gibi sağa çarpık (birkaç çok büyük değer içeren) verilerde medyan tercih edilir. Ölçüm hatası ya da aykırı değer içermeyen, simetrik dağılan verilerde (örneğin bir sınıfın boy ölçüleri) ortalama daha fazla bilgi taşır. Kategorik verilerde ise yalnızca mod kullanılabilir."
      ],
      table: {
        head: ["Ölçü", "Nasıl bulunur?", "Uç değerden etkilenir mi?", "En uygun kullanım"],
        rows: [
          ["Aritmetik ortalama", "Toplam ÷ veri sayısı", "Çok etkilenir", "Simetrik sayısal veri, not ortalaması"],
          ["Medyan", "Sıralı verinin ortası", "Az etkilenir", "Maaş, fiyat, süre gibi çarpık veri"],
          ["Mod", "En sık tekrar eden", "Etkilenmez", "Kategorik veri, en çok tercih edilen"],
          ["Açıklık", "En büyük − en küçük", "Çok etkilenir", "Hızlı yayılım fikri"],
          ["Çeyrekler açıklığı", "Q3 − Q1", "Az etkilenir", "Aykırı değerli verinin yayılımı"]
        ]
      }
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Sıralamadan medyan almak:</strong> 70, 45, 100, 60, 85 listesinde ortadaki 100 değil, sıralı listedeki 70 medyandır.",
        "<strong>Çift veride tek değer seçmek:</strong> Çift sayıda veride ortadaki iki değerin ortalaması alınır.",
        "<strong>Modu en büyük değer sanmak:</strong> Mod en sık tekrar eden değerdir, en büyük değer değildir.",
        "<strong>Tekrar eden değerleri bir kez saymak:</strong> 70 iki kez geçiyorsa toplamda ve sıralamada iki kez yer alır.",
        "<strong>Açıklığı en büyük değer sanmak:</strong> Açıklık bir farktır; birimi verinin birimiyle aynıdır."
      ],
      after: [
        "Kombinasyon ve olasılık sorularıyla birlikte çalışıyorsanız [[bilgi:permutasyon-ve-kombinasyon-farki|permütasyon ve kombinasyon]] yazımız da işinize yarayabilir."
      ]
    }
  ],
  faq: [
    ["Medyan nedir, nasıl bulunur?", "Medyan, veriler küçükten büyüğe sıralandığında tam ortada kalan değerdir. Tek sayıda veride ortadaki değer, çift sayıda veride ortadaki iki değerin ortalaması medyandır. Önce veriyi sıralamak gerekir; sırasız listede ortadaki sayı medyan değildir."],
    ["Mod nedir?", "Mod, bir veri grubunda en çok tekrar eden değerdir. Örneğin 45, 60, 70, 70, 75 verisinde 70 iki kez geçtiği için mod 70'tir. Mod, renk ya da marka gibi sayısal olmayan veriler için de kullanılabilen tek merkezi eğilim ölçüsüdür."],
    ["Çift sayıda veride medyan nasıl hesaplanır?", "Veriler sıralanır ve ortada kalan iki değerin aritmetik ortalaması alınır. On veride 5'inci ve 6'ncı değerler kullanılır; bunlar 70 ve 75 ise medyan 72,5 olur. Bu durumda medyan veri setinde olmayan bir değer çıkabilir."],
    ["Aritmetik ortalama ile medyan farkı nedir?", "Ortalama tüm değerleri toplayıp veri sayısına böler ve uç değerlerden çok etkilenir. Medyan ise yalnızca sıralı verinin ortasına bakar ve uç değerlerden az etkilenir. Maaş gibi çarpık verilerde medyan tipik değeri daha iyi gösterir."],
    ["Açıklık nasıl hesaplanır?", "Açıklık, veri grubundaki en büyük değerden en küçük değerin çıkarılmasıyla bulunur. 45 ile 100 arasındaki notlarda açıklık 55'tir. Hesaplaması kolaydır ama yalnızca iki uç değere dayandığı için aykırı değerlerden kolayca etkilenir."],
    ["Çeyrekler açıklığı nedir?", "Çeyrekler açıklığı, üst çeyrek ile alt çeyrek arasındaki farktır ve verinin ortadaki yarısının yayılımını gösterir. Alt çeyrek alt yarının, üst çeyrek üst yarının medyanıdır. Örnek veride Q1 65, Q3 87,5 olduğundan çeyrekler açıklığı 22,5'tir."],
    ["Birden fazla mod olabilir mi?", "Evet. En yüksek tekrar sayısına sahip birden fazla değer varsa veri grubunun birden fazla modu olur; 2, 3, 3, 5, 7, 7 verisinde 3 ve 7 moddur. Tüm değerler aynı sayıda tekrar ediyorsa ise veri grubunun modu yoktur."],
    ["Hangi durumda medyan ortalamadan daha iyidir?", "Veride birkaç çok büyük ya da çok küçük değer varsa medyan daha iyidir. Gelir, ev fiyatı, kira ve bekleme süresi gibi verilerde tek bir uç değer ortalamayı çarpıtır, medyan ise tipik değeri korur. Simetrik verilerde ikisi birbirine yakındır."],
    ["Medyan ile ortanca aynı şey mi?", "Evet, medyan ve ortanca aynı kavramın iki adıdır. Ders kitaplarında ortanca, istatistik ve günlük kullanımda ise medyan terimi daha yaygındır. Benzer biçimde mod için tepe değer, açıklık için ranj terimleri de kullanılır."]
  ],
  tools: ["medyan-hesapla", "ortalama-hesapla", "istatistik-hesapla", "aciklik-hesapla"],
  related: ["permutasyon-ve-kombinasyon-farki", "takdir-tesekkur-kac-ortalama"],
  sources: [
    ["MEB – Matematik Dersi Öğretim Programı (veri analizi)", "https://www.meb.gov.tr/"],
    ["TÜİK – İstatistiksel terimler", "https://www.tuik.gov.tr/"]
  ]
};
