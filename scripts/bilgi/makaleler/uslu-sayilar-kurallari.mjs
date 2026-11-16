export default {
  slug: "uslu-sayilar-kurallari",
  kategori: "egitim",
  tarih: "2026-11-15",
  title: "Üslü Sayılar Kuralları: Çarpma, Bölme, Negatif Üs ve 8. Sınıf Örnekleri",
  pageTitle: "Üslü Sayılar Kuralları: Çarpma, Bölme, Negatif Üs, Örnekler",
  description: "Üslü sayılarda çarpma, bölme, kuvvetin kuvveti, negatif ve sıfırıncı üs kuralları; işaret kuralı, bilimsel gösterim ve LGS tipi çözümlü örnekler.",
  keywords: ["üslü sayılar", "üslü sayılar kuralları", "negatif üs", "üslü sayılarda çarpma", "üslü sayılarda bölme", "sıfırıncı kuvvet", "üslü ifadeler 8. sınıf", "10'un kuvvetleri", "kuvvetin kuvveti"],
  lead: "Üslü sayı, bir sayının kendisiyle kaç kez çarpıldığını kısaca yazmanın yoludur: 2<sup>5</sup> = 2 · 2 · 2 · 2 · 2 = 32. Tabanları aynı üslü sayılar çarpılırken üsler toplanır, bölünürken çıkarılır; kuvvetin kuvveti alınırken üsler çarpılır. Negatif üs sayının çarpmaya göre tersini, sıfırıncı kuvvet ise 1'i verir. Bu sayfada 8. sınıf ve LGS müfredatındaki tüm kuralları, işaret kuralını, 10'un kuvvetleriyle bilimsel gösterimi ve adım adım çözülmüş örnekleri bulacaksınız.",
  kisaCevap: [
    "a<sup>n</sup> ifadesinde a taban, n üstür; a, n kez kendisiyle çarpılır: 3<sup>4</sup> = 81.",
    "Tabanlar aynıysa çarpmada üsler toplanır: a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup>; bölmede çıkarılır: a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>.",
    "Kuvvetin kuvvetinde üsler çarpılır: (a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup>, örneğin (3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup> = 729.",
    "Sıfırdan farklı her sayının sıfırıncı kuvveti 1'dir; 0<sup>0</sup> tanımsızdır.",
    "Negatif üs ters çevirir: a<sup>−n</sup> = 1 ÷ a<sup>n</sup>, örneğin 2<sup>−3</sup> = 1/8 = 0,125.",
    "Negatif tabanın çift kuvveti pozitif, tek kuvveti negatiftir: (−2)<sup>4</sup> = 16, (−2)<sup>3</sup> = −8; ama −2<sup>4</sup> = −16."
  ],
  figure: {
    alt: "Üslü sayıların altı temel kuralı kartlar hâlinde: üs toplama, üs çıkarma, kuvvetin kuvveti, sıfırıncı kuvvet, negatif üs ve işaret kuralı; her kartta sayısal örnek var.",
    caption: "Altı kural ve örnekleri. Üst sıradaki üç kural yalnızca tabanlar aynıyken geçerlidir; toplama ve çıkarma işlemlerinde üsler toplanmaz, önce ortak çarpan parantezine alınır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Üslü sayılarda 6 temel kural</text>
  <g>
    <rect x="20" y="50" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="20" y="50" width="220" height="36" rx="10" class="p"/>
    <text x="130" y="74" class="b mid sf">1. Çarpma: üs toplanır</text>
    <text x="130" y="122" class="lg b mid">a<tspan dy="-8" class="sm">m</tspan><tspan dy="8"> · a</tspan><tspan dy="-8" class="sm">n</tspan><tspan dy="8"> = a</tspan><tspan dy="-8" class="sm">m+n</tspan></text>
    <text x="130" y="160" class="mid">2<tspan dy="-7" class="sm">3</tspan><tspan dy="7"> · 2</tspan><tspan dy="-7" class="sm">4</tspan><tspan dy="7"> = 2</tspan><tspan dy="-7" class="sm">7</tspan><tspan dy="7"> = 128</tspan></text>
    <text x="130" y="186" class="sm mid mu">tabanlar aynı olmalı</text>
  </g>
  <g>
    <rect x="250" y="50" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="250" y="50" width="220" height="36" rx="10" class="p"/>
    <text x="360" y="74" class="b mid sf">2. Bölme: üs çıkarılır</text>
    <text x="360" y="122" class="lg b mid">a<tspan dy="-8" class="sm">m</tspan><tspan dy="8"> ÷ a</tspan><tspan dy="-8" class="sm">n</tspan><tspan dy="8"> = a</tspan><tspan dy="-8" class="sm">m−n</tspan></text>
    <text x="360" y="160" class="mid">5<tspan dy="-7" class="sm">6</tspan><tspan dy="7"> ÷ 5</tspan><tspan dy="-7" class="sm">4</tspan><tspan dy="7"> = 5</tspan><tspan dy="-7" class="sm">2</tspan><tspan dy="7"> = 25</tspan></text>
    <text x="360" y="186" class="sm mid mu">payın üssünden paydanınki</text>
  </g>
  <g>
    <rect x="480" y="50" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="480" y="50" width="220" height="36" rx="10" class="p"/>
    <text x="590" y="74" class="b mid sf">3. Kuvvetin kuvveti</text>
    <text x="590" y="122" class="lg b mid">(a<tspan dy="-8" class="sm">m</tspan><tspan dy="8">)</tspan><tspan dy="-8" class="sm">n</tspan><tspan dy="8"> = a</tspan><tspan dy="-8" class="sm">m·n</tspan></text>
    <text x="590" y="160" class="mid">(3<tspan dy="-7" class="sm">2</tspan><tspan dy="7">)</tspan><tspan dy="-7" class="sm">3</tspan><tspan dy="7"> = 3</tspan><tspan dy="-7" class="sm">6</tspan><tspan dy="7"> = 729</tspan></text>
    <text x="590" y="186" class="sm mid mu">üsler çarpılır</text>
  </g>
  <g>
    <rect x="20" y="214" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="20" y="214" width="220" height="36" rx="10" class="ps"/>
    <text x="130" y="238" class="b mid">4. Sıfırıncı kuvvet</text>
    <text x="130" y="286" class="lg b mid">a<tspan dy="-8" class="sm">0</tspan><tspan dy="8"> = 1  (a ≠ 0)</tspan></text>
    <text x="130" y="324" class="mid">7<tspan dy="-7" class="sm">0</tspan><tspan dy="7"> = 1 · (−4)</tspan><tspan dy="-7" class="sm">0</tspan><tspan dy="7"> = 1</tspan></text>
    <text x="130" y="350" class="sm mid dg">0 üssü 0 tanımsız</text>
  </g>
  <g>
    <rect x="250" y="214" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="250" y="214" width="220" height="36" rx="10" class="ps"/>
    <text x="360" y="238" class="b mid">5. Negatif üs</text>
    <text x="360" y="286" class="lg b mid">a<tspan dy="-8" class="sm">−n</tspan><tspan dy="8"> = 1 ÷ a</tspan><tspan dy="-8" class="sm">n</tspan></text>
    <text x="360" y="324" class="mid">2<tspan dy="-7" class="sm">−3</tspan><tspan dy="7"> = 1/8 = 0,125</tspan></text>
    <text x="360" y="350" class="sm mid mu">sonuç negatif olmaz</text>
  </g>
  <g>
    <rect x="480" y="214" width="220" height="150" rx="10" class="sf sb"/>
    <rect x="480" y="214" width="220" height="36" rx="10" class="ps"/>
    <text x="590" y="238" class="b mid">6. İşaret kuralı</text>
    <text x="590" y="280" class="mid ok b">(−2)<tspan dy="-7" class="sm">4</tspan><tspan dy="7"> = +16  çift üs</tspan></text>
    <text x="590" y="310" class="mid dg b">(−2)<tspan dy="-7" class="sm">3</tspan><tspan dy="7"> = −8  tek üs</tspan></text>
    <text x="590" y="342" class="mid">−2<tspan dy="-7" class="sm">4</tspan><tspan dy="7"> = −16 (parantez yok)</tspan></text>
  </g>
  <rect x="20" y="376" width="680" height="36" rx="8" class="dgs"/>
  <text x="360" y="399" class="mid b">Dikkat: 2<tspan dy="-7" class="sm">3</tspan><tspan dy="7"> + 2</tspan><tspan dy="-7" class="sm">3</tspan><tspan dy="7"> = 2 · 2</tspan><tspan dy="-7" class="sm">3</tspan><tspan dy="7"> = 16, 2</tspan><tspan dy="-7" class="sm">6</tspan><tspan dy="7"> değildir.</tspan></text>
</svg>`
  },
  sections: [
    {
      h: "Üslü sayı nedir? Taban, üs ve kuvvet",
      p: [
        "Aynı sayıyı art arda çarpmak uzun bir yazım gerektirir. 3 · 3 · 3 · 3 yerine kısaca <strong>3<sup>4</sup></strong> yazarız ve \"3 üssü 4\" ya da \"3'ün 4. kuvveti\" diye okuruz. Burada 3 <strong>taban</strong>, 4 <strong>üs</strong> (kuvvet) adını alır; işlemin sonucu olan 81 de 3'ün 4. kuvvetidir.",
        "Üs, tabanın kaç kez çarpan olarak yazıldığını söyler; tabanla üssün çarpımı değildir. 3<sup>4</sup> = 12 diye düşünmek öğrencilerin en sık düştüğü hatadır. Doğrusu 3 · 3 · 3 · 3 = 81'dir.",
        "Özel adlar da vardır: bir sayının 2. kuvvetine <strong>karesi</strong>, 3. kuvvetine <strong>küpü</strong> denir. 5<sup>2</sup> = 25 \"5'in karesi\", 2<sup>3</sup> = 8 \"2'nin küpü\" diye okunur. Bu adlar geometriden gelir: kenarı 5 birim olan karenin alanı 25, kenarı 2 birim olan küpün hacmi 8 birim küptür. Kare ve küp değerlerini ezberlemek için [[arac:kare-kup-tablosu|Kare ve Küp Tablosu]] aracıyla istediğiniz aralıkta tablo oluşturabilirsiniz."
      ]
    },
    {
      h: "Üslü sayılarda çarpma ve bölme kuralları",
      p: [
        "Tabanları aynı iki üslü sayıyı çarptığınızda toplam çarpan sayısı iki üssün toplamı olur. 2<sup>3</sup> · 2<sup>4</sup> ifadesinde önce üç tane, sonra dört tane 2 vardır; toplam yedi tane 2 çarpılır ve sonuç 2<sup>7</sup> = 128 olur.",
        "Bölmede pay ve paydadaki ortak çarpanlar sadeleşir. 5<sup>6</sup> ÷ 5<sup>4</sup> işleminde paydaki altı 5'ten dördü paydadakilerle sadeleşir, geriye 5<sup>2</sup> = 25 kalır. Kısaca üsler çıkarılır.",
        "Üsleri aynı, tabanları farklı sayılarda ise tabanlar çarpılır ya da bölünür, üs korunur: 2<sup>3</sup> · 5<sup>3</sup> = (2 · 5)<sup>3</sup> = 10<sup>3</sup> = 1.000. Bu kural, büyük çarpımları zihinden yapmanın en hızlı yoludur."
      ],
      formula: "a^m · a^n = a^(m+n)        a^m ÷ a^n = a^(m−n)   (a ≠ 0)\na^n · b^n = (a·b)^n        a^n ÷ b^n = (a ÷ b)^n  (b ≠ 0)\n(a^m)^n = a^(m·n)",
      after: [
        "Kuvvetin kuvveti kuralında üsler çarpılır: (3<sup>2</sup>)<sup>3</sup> = 3<sup>2</sup> · 3<sup>2</sup> · 3<sup>2</sup> = 3<sup>6</sup> = 729. Bunu 3<sup>2<sup>3</sup></sup> ile karıştırmayın; parantez yoksa üst üste yazılan üsler yukarıdan aşağıya hesaplanır ve 3<sup>8</sup> = 6.561 çıkar."
      ]
    },
    {
      h: "Sıfırıncı kuvvet neden 1'dir?",
      p: [
        "Bölme kuralını aynı üsle uygularsanız cevap kendiliğinden ortaya çıkar: 7<sup>4</sup> ÷ 7<sup>4</sup> = 7<sup>4−4</sup> = 7<sup>0</sup>. Öte yandan bir sayıyı kendisine bölmek her zaman 1 verir. İki sonucun aynı olması için 7<sup>0</sup> = 1 kabul edilir.",
        "Aynı mantık sıfır dışındaki her sayı için geçerlidir: 1.000<sup>0</sup> = 1, (−4)<sup>0</sup> = 1, (2/3)<sup>0</sup> = 1. Yalnızca <strong>0<sup>0</sup></strong> ifadesi ortaokul ve lise matematiğinde <strong>tanımsız</strong> kabul edilir, çünkü 0 ÷ 0 bölmesine dayanır.",
        "Bir örüntüyle de görebilirsiniz: 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2. Üs bir azaldıkça sonuç 2'ye bölünüyor. Bir adım daha giderseniz 2 ÷ 2 = 1 olur; bu da 2<sup>0</sup>'dır. Sonraki adım 1 ÷ 2 = 1/2'dir ve bizi negatif üslere götürür."
      ]
    },
    {
      h: "Negatif üs ne anlama gelir?",
      p: [
        "Negatif üs, sayının çarpmaya göre tersini alıp pozitif üsle yazmak demektir: a<sup>−n</sup> = 1 ÷ a<sup>n</sup>. Yukarıdaki örüntüyü sürdürürsek 2<sup>−1</sup> = 1/2, 2<sup>−2</sup> = 1/4, 2<sup>−3</sup> = 1/8 = 0,125 olur.",
        "Negatif üs sonucu negatif yapmaz; yalnızca sayıyı kesre çevirir. 2<sup>−3</sup> = −8 yazmak sık yapılan bir hatadır. Kesirli tabanda ise ters çevirme kesrin pay ve paydasını yer değiştirir: (2/3)<sup>−2</sup> = (3/2)<sup>2</sup> = 9/4 = 2,25.",
        "Paydadaki negatif üslü çarpan paya, paydaki negatif üslü çarpan paydaya pozitif üsle geçer. Bu nedenle 1 ÷ 5<sup>−2</sup> = 5<sup>2</sup> = 25'tir. Sınavlarda karmaşık görünen kesirli ifadeleri bu kuralla tek tabana indirmek işi kolaylaştırır."
      ],
      table: {
        head: ["İfade", "Ters çevrilmiş hâli", "Kesir", "Ondalık"],
        rows: [
          ["10<sup>−1</sup>", "1 ÷ 10<sup>1</sup>", "1/10", "0,1"],
          ["10<sup>−3</sup>", "1 ÷ 10<sup>3</sup>", "1/1.000", "0,001"],
          ["2<sup>−3</sup>", "1 ÷ 2<sup>3</sup>", "1/8", "0,125"],
          ["5<sup>−2</sup>", "1 ÷ 5<sup>2</sup>", "1/25", "0,04"],
          ["(2/3)<sup>−2</sup>", "(3/2)<sup>2</sup>", "9/4", "2,25"],
          ["2<sup>−1</sup> + 2<sup>−2</sup>", "1/2 + 1/4", "3/4", "0,75"]
        ],
        caption: "Negatif üslü ifadelerin kesir ve ondalık karşılıkları."
      }
    },
    {
      h: "Negatif sayıların kuvvetlerinde işaret kuralı",
      p: [
        "Negatif bir tabanın kuvvetinde sonucun işaretini üssün tek ya da çift olması belirler. İki negatif sayının çarpımı pozitif olduğu için negatif çarpanlar ikişer ikişer eşleşir. Üs çiftse hepsi eşleşir ve sonuç pozitif, tekse bir çarpan eşsiz kalır ve sonuç negatif olur.",
        "Örnekler: (−2)<sup>4</sup> = (−2)(−2)(−2)(−2) = 16, (−2)<sup>3</sup> = −8, (−1)<sup>100</sup> = 1, (−1)<sup>101</sup> = −1. Pozitif sayıların her kuvveti ise pozitiftir."
      ],
      ul: [
        "<strong>Parantez fark yaratır:</strong> (−2)<sup>4</sup> ifadesinde üs eksi işaretini de kapsar ve sonuç 16'dır. −2<sup>4</sup> ifadesinde ise üs yalnızca 2'ye aittir: −(2<sup>4</sup>) = −16.",
        "<strong>Çift kuvvetin sonucu negatif olamaz:</strong> x<sup>2</sup> = −9 denkleminin gerçek sayılarda çözümü yoktur.",
        "<strong>Negatif üs ile negatif taban karıştırılmamalı:</strong> (−2)<sup>−3</sup> = 1 ÷ (−2)<sup>3</sup> = −1/8; burada eksi, tek üsten gelir."
      ]
    },
    {
      h: "10'un kuvvetleri ve bilimsel gösterim",
      p: [
        "10'un pozitif kuvvetleri 1'in arkasına üs kadar sıfır yazılarak bulunur: 10<sup>3</sup> = 1.000, 10<sup>6</sup> = 1.000.000. Negatif kuvvetlerde virgülden sonra üs kadar basamak vardır: 10<sup>−3</sup> = 0,001. Ondalık sayıları 10'un kuvvetleriyle çarpmak, virgülü üs kadar kaydırmaktır.",
        "<strong>Bilimsel gösterim</strong>, bir sayıyı a × 10<sup>n</sup> biçiminde yazmaktır; burada 1 ≤ |a| < 10 ve n bir tam sayıdır. Çok büyük ve çok küçük sayıları kısa yazmayı sağlar. Örneğin 4.500.000 = 4,5 × 10<sup>6</sup>, 0,00032 = 3,2 × 10<sup>−4</sup> olur. Uzunluk ve kütle birimlerindeki kilo, mega, mili, mikro gibi önekler de 10'un kuvvetleridir; bunun ayrıntısı [[bilgi:si-onekleri-mili-mikro-kilo-mega|SI önekleri yazısında]] anlatılıyor."
      ],
      ol: [
        "Sayıda virgülü, solunda sıfırdan farklı tek bir rakam kalacak şekilde kaydırın: 4.500.000 → 4,5.",
        "Virgülü kaç basamak kaydırdığınızı sayın: 6 basamak sola.",
        "Sola kaydırdıysanız üs pozitif, sağa kaydırdıysanız negatiftir: 4,5 × 10<sup>6</sup>.",
        "Kontrol için 4,5'i 10<sup>6</sup> ile çarpın; virgül 6 basamak sağa gider ve 4.500.000 bulunur."
      ],
      after: [
        "Bilimsel gösterimdeki iki sayıyı çarparken katsayılar çarpılır, üsler toplanır: (2 × 10<sup>3</sup>) · (4 × 10<sup>5</sup>) = 8 × 10<sup>8</sup>. Sonuçta katsayı 10'u geçerse yeniden düzenlenir: (5 × 10<sup>3</sup>) · (4 × 10<sup>2</sup>) = 20 × 10<sup>5</sup> = 2 × 10<sup>6</sup>. Dönüşümleri kontrol etmek için [[arac:bilimsel-gosterim-cevir|Bilimsel Gösterim Çevirici]]yi kullanabilirsiniz."
      ]
    },
    {
      h: "Adım adım çözümlü örnekler (LGS tipi)",
      p: [
        "Sınav sorularında genellikle farklı tabanlar verilir ve önce hepsini aynı tabana çevirmeniz beklenir. 4, 8, 16, 32 sayıları 2'nin; 9, 27, 81 sayıları 3'ün; 25, 125 sayıları 5'in kuvvetidir. Bu dönüşümü hızlı yapmak, sorunun yarısını çözmek demektir."
      ],
      ol: [
        "<strong>Örnek 1:</strong> 4<sup>5</sup> · 8<sup>2</sup> ÷ 16<sup>3</sup> = ? Hepsini 2 tabanına çevirin: 4<sup>5</sup> = 2<sup>10</sup>, 8<sup>2</sup> = 2<sup>6</sup>, 16<sup>3</sup> = 2<sup>12</sup>. Sonuç 2<sup>10+6−12</sup> = 2<sup>4</sup> = 16.",
        "<strong>Örnek 2:</strong> 3<sup>5</sup> + 3<sup>5</sup> + 3<sup>5</sup> = ? Aynı terim üç kez toplanıyor: 3 · 3<sup>5</sup> = 3<sup>6</sup> = 729. Üsleri toplayıp 3<sup>15</sup> demek yanlıştır.",
        "<strong>Örnek 3:</strong> 25<sup>3</sup> ÷ 5<sup>4</sup> = ? 25 = 5<sup>2</sup> olduğundan 25<sup>3</sup> = 5<sup>6</sup>; 5<sup>6−4</sup> = 5<sup>2</sup> = 25.",
        "<strong>Örnek 4:</strong> 2<sup>−1</sup> + 2<sup>−2</sup> = ? Kesre çevirin: 1/2 + 1/4 = 2/4 + 1/4 = 3/4 = 0,75.",
        "<strong>Örnek 5:</strong> Bir bakteri her saat ikiye bölünüyor. 1 bakteri 10 saat sonra kaç bakteri olur? Her saat sayı 2 ile çarpıldığı için 2<sup>10</sup> = 1.024 bakteri olur.",
        "<strong>Örnek 6:</strong> Bir virüsün çapı 0,00000012 m'dir. Bilimsel gösterimle yazınız. Virgül 7 basamak sağa kayar: 1,2 × 10<sup>−7</sup> m."
      ],
      after: [
        "Sonuçlarınızı [[arac:us-logaritma-hesapla|Üslü Sayı ve Logaritma Hesaplama]] aracıyla kontrol edebilirsiniz. Üssün kendisini bilmediğiniz sorular (2<sup>x</sup> = 1.024 gibi) logaritmanın konusudur; mantığını [[bilgi:logaritma-nasil-hesaplanir|logaritma nasıl hesaplanır]] yazısında bulabilirsiniz. Kesirli üsler ise köklü sayılarla ilişkilidir: 9<sup>1/2</sup> = √9 = 3. Bu bağlantı için [[bilgi:karekok-nasil-alinir|karekök yazısına]] bakabilirsiniz."
      ]
    },
    {
      h: "Üslü sayılarda en sık yapılan hatalar",
      ul: [
        "<strong>Tabanla üssü çarpmak:</strong> 3<sup>4</sup> = 12 değil, 81'dir.",
        "<strong>Toplamada üsleri toplamak:</strong> 2<sup>3</sup> + 2<sup>3</sup> = 2<sup>6</sup> değildir; 2 · 2<sup>3</sup> = 2<sup>4</sup> = 16'dır. Üs kuralları yalnızca çarpma ve bölmede geçerlidir.",
        "<strong>Farklı tabanlarda üsleri birleştirmek:</strong> 2<sup>3</sup> · 3<sup>2</sup> = 6<sup>5</sup> değildir; 8 · 9 = 72'dir.",
        "<strong>Negatif üssü negatif sonuç sanmak:</strong> 5<sup>−2</sup> = −25 değil, 1/25'tir.",
        "<strong>Parantezi atlamak:</strong> −3<sup>2</sup> = −9, (−3)<sup>2</sup> = 9'dur.",
        "<strong>Toplamın kuvvetini dağıtmak:</strong> (a + b)<sup>2</sup> ≠ a<sup>2</sup> + b<sup>2</sup>. Doğru açılım [[bilgi:cebirsel-ozdeslikler-tam-kare-iki-kare-farki|tam kare özdeşliği]] ile a<sup>2</sup> + 2ab + b<sup>2</sup>'dir.",
        "<strong>0<sup>0</sup> = 1 yazmak:</strong> Ortaokul ve lise kapsamında bu ifade tanımsızdır."
      ]
    },
    {
      h: "Konuyu çalışırken pratik öneriler",
      p: [
        "2'nin ilk on kuvvetini (2, 4, 8, 16, 32, 64, 128, 256, 512, 1.024), 3'ün ilk altı kuvvetini (3, 9, 27, 81, 243, 729) ve 5'in ilk dört kuvvetini (5, 25, 125, 625) ezbere bilmek, sınavdaki taban çevirme adımını saniyelere indirir. Bu listeleri bir kâğıda yazıp her gün birkaç dakika tekrar etmek yeterlidir.",
        "Her soruda önce tabanları eşitleyin, sonra işlem türüne göre kuralı seçin, en son sayısal değeri hesaplayın. Toplama ya da çıkarma varsa ortak çarpan parantezine alın: 2<sup>5</sup> − 2<sup>3</sup> = 2<sup>3</sup>(2<sup>2</sup> − 1) = 8 · 3 = 24. Bu sırayı alışkanlık hâline getirmek işlem hatalarını belirgin biçimde azaltır.",
        "Çözdüğünüz her sorunun sonucunu küçük bir sayıyla deneyerek sınayın. Bir kuralı unuttuğunuzda 2<sup>2</sup> · 2<sup>3</sup> gibi küçük bir örneği açık çarpım olarak yazın: 4 · 8 = 32 = 2<sup>5</sup>. Böylece üslerin toplandığını kendiniz yeniden keşfedersiniz; ezber yerine mantığı hatırlamak sınav stresinde daha güvenilirdir."
      ]
    }
  ],
  faq: [
    ["Üslü sayı nedir?", "Üslü sayı, bir tabanın kendisiyle kaç kez çarpıldığını gösteren kısa yazımdır. 2<sup>5</sup> ifadesinde 2 taban, 5 üstür ve 2 · 2 · 2 · 2 · 2 = 32 anlamına gelir."],
    ["Tabanları aynı üslü sayılar nasıl çarpılır?", "Tabanlar aynıysa taban korunur ve üsler toplanır: a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup>. Örneğin 2<sup>3</sup> · 2<sup>4</sup> = 2<sup>7</sup> = 128 eder. Tabanlar farklıysa önce aynı tabana çevirmeyi deneyin."],
    ["Üslü sayılarda bölme nasıl yapılır?", "Tabanları aynı iki üslü sayı bölünürken paydaki üsten paydadaki üs çıkarılır: a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>. Örneğin 5<sup>6</sup> ÷ 5<sup>4</sup> = 5<sup>2</sup> = 25 olur; sonuç negatif üs çıkarsa kesre çevrilir."],
    ["Negatif üs ne anlama gelir?", "Negatif üs, sayının çarpmaya göre tersinin pozitif üslü hâlidir: a<sup>−n</sup> = 1 ÷ a<sup>n</sup>. 2<sup>−3</sup> = 1/8 = 0,125'tir. Negatif üs sonucu negatif yapmaz, yalnızca sayıyı kesre dönüştürür."],
    ["Bir sayının sıfırıncı kuvveti neden 1'dir?", "Bir sayıyı kendisine böldüğünüzde 1 bulursunuz; bölme kuralına göre aynı işlem a<sup>n−n</sup> = a<sup>0</sup> sonucunu verir. İki sonucun tutarlı olması için sıfırdan farklı her sayının sıfırıncı kuvveti 1 kabul edilir."],
    ["Negatif sayının çift ve tek kuvveti nasıl işaret alır?", "Negatif tabanın çift kuvveti pozitif, tek kuvveti negatiftir: (−2)<sup>4</sup> = 16, (−2)<sup>3</sup> = −8. Parantez yoksa eksi işaret üsse dahil olmaz; −2<sup>4</sup> = −16 olarak hesaplanır."],
    ["(a^m)^n kuralı nedir?", "Kuvvetin kuvveti alınırken üsler çarpılır: (a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup>. Örneğin (3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup> = 729 olur. Parantezsiz yazılan üst üste üsler ise yukarıdan aşağıya hesaplanır ve farklı sonuç verir."],
    ["10'un kuvvetleri ve bilimsel gösterim nasıl ilişkilidir?", "Bilimsel gösterim, sayıyı 1 ile 10 arasındaki bir katsayı ile 10'un bir kuvvetinin çarpımı olarak yazar. 4.500.000 = 4,5 × 10<sup>6</sup>, 0,00032 = 3,2 × 10<sup>−4</sup> olur; üs, virgülün kaç basamak kaydığını gösterir."],
    ["Üslü sayılarda en sık yapılan hatalar nelerdir?", "En sık hatalar tabanla üssü çarpmak, toplamada üsleri toplamak, negatif üssü negatif sonuç sanmak, parantezi atlamak ve (a + b)<sup>2</sup> ifadesini a<sup>2</sup> + b<sup>2</sup> diye açmaktır. Her işlemde önce tabanları eşitlemek bu hataları azaltır."],
    ["3 üssü 5 artı 3 üssü 5 artı 3 üssü 5 kaç eder?", "Aynı terim üç kez toplandığı için ifade 3 · 3<sup>5</sup> biçiminde yazılır ve üsler toplanarak 3<sup>6</sup> = 729 bulunur. Toplamada üslerin toplanmadığını, ortak çarpan parantezine alındığını gösteren klasik bir sınav sorusudur."]
  ],
  tools: ["us-logaritma-hesapla", "kare-kup-tablosu", "bilimsel-gosterim-cevir", "hesap-makinesi"],
  related: ["logaritma-nasil-hesaplanir", "karekok-nasil-alinir", "si-onekleri-mili-mikro-kilo-mega"],
  sources: [
    ["MEB – Ortaokul Matematik Dersi Öğretim Programı", "https://mufredat.meb.gov.tr/"],
    ["MEB – LGS örnek sorular", "https://odsgm.meb.gov.tr/"]
  ]
};
