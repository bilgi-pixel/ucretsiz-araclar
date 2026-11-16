export default {
  slug: "kondansator-kodu-nasil-okunur-104",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Kondansatör Kodu Nasıl Okunur? 104, 103, 223 ve Seri-Paralel Bağlama",
  pageTitle: "Kondansatör Kodu Okuma: 104 Kaç nF? Kod Tablosu ve Bağlama",
  description: "104 kondansatör 100 nF yani 0,1 µF'tır. Üç haneli kodun çözümü, J-K-M tolerans harfleri, voltaj kodları, seri-paralel bağlama formülleri ve çözümlü örnekler.",
  keywords: ["kondansatör kodu okuma", "104 kondansatör kaç nf", "103 kondansatör değeri", "kondansatör kodları tablosu", "seramik kondansatör kodu", "kondansatör seri paralel bağlama", "mikrofarad nanofarad çevirme", "kondansatör tolerans harfi"],
  lead: "Üzerinde <strong>104</strong> yazan kondansatör <strong>100.000 pF = 100 nF = 0,1 µF</strong> değerindedir: ilk iki rakam (10) değerin kendisi, üçüncü rakam (4) arkasına eklenecek sıfır sayısıdır ve sonuç her zaman pikofarad cinsindendir. Aynı kuralla 103 = 10 nF, 223 = 22 nF, 472 = 4,7 nF eder. Bu sayfada kodun sonundaki J, K, M harflerini, voltaj kodlarını, pF-nF-µF çevirmeyi ve kondansatörleri seri ya da paralel bağladığınızda toplam kapasitenin nasıl değiştiğini örneklerle bulacaksınız.",
  kisaCevap: [
    "Üç haneli kodda ilk iki rakam değer, üçüncü rakam 10'un kuvvetidir; sonuç pikofarad (pF) cinsindendir.",
    "104 = 10 × 10.000 pF = 100.000 pF = 100 nF = 0,1 µF; 103 = 10 nF; 102 = 1 nF; 101 = 100 pF.",
    "Koddan sonraki harf toleranstır: J ±%5, K ±%10, M ±%20; Z ise +%80 / −%20 anlamına gelir.",
    "1 µF = 1.000 nF = 1.000.000 pF; birim basamakları her adımda 1.000 katıdır.",
    "Paralel bağlamada kapasiteler toplanır; seri bağlamada 1/C<sub>toplam</sub> = 1/C<sub>1</sub> + 1/C<sub>2</sub> + … olur.",
    "Kondansatörün çalışma gerilimi devredeki en yüksek gerilimin üzerinde seçilmelidir; aşılırsa yalıtkan delinir."
  ],
  figure: {
    alt: "104 kodlu seramik kondansatörün çözümü: 1 ve 0 rakamları değer, 4 rakamı dört sıfır; sonuç 100.000 pF, 100 nF ve 0,1 µF. Altta 100 nF ile 220 nF'nin paralel ve seri bağlama sonuçları.",
    caption: "Üç haneli kod pF cinsinden okunur. Aynı iki kondansatör paralel bağlandığında 320 nF, seri bağlandığında yaklaşık 68,75 nF eder; seri bağlamada sonuç her zaman en küçük kondansatörden de küçüktür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">104 kodu nasıl çözülür?</text>
  <ellipse cx="110" cy="120" rx="70" ry="56" class="ps"/>
  <text x="110" y="128" class="xl mid">104</text>
  <line x1="90" y1="176" x2="90" y2="215" class="st sw" fill="none"/>
  <line x1="130" y1="176" x2="130" y2="215" class="st sw" fill="none"/>
  <text x="110" y="236" class="sm mid mu">iki bacak, kutupsuz</text>
  <rect x="220" y="62" width="70" height="56" rx="8" class="p"/><text x="255" y="99" class="xl mid sf">1</text>
  <rect x="298" y="62" width="70" height="56" rx="8" class="p"/><text x="333" y="99" class="xl mid sf">0</text>
  <rect x="400" y="62" width="70" height="56" rx="8" class="oks"/><text x="435" y="99" class="xl mid">4</text>
  <text x="294" y="140" class="sm mid">değer: 10</text>
  <text x="435" y="140" class="sm mid">× 10<tspan dy="-6" class="sm">4</tspan></text>
  <rect x="500" y="62" width="200" height="56" rx="8" class="sf sb"/>
  <text x="600" y="86" class="b mid">10 × 10.000</text><text x="600" y="106" class="sm mid t2">birim: pikofarad (pF)</text>
  <rect x="220" y="164" width="150" height="50" rx="8" class="sf sb"/><text x="295" y="195" class="b lg mid">100.000 pF</text>
  <rect x="385" y="164" width="150" height="50" rx="8" class="ps"/><text x="460" y="195" class="b lg mid">100 nF</text>
  <rect x="550" y="164" width="150" height="50" rx="8" class="p"/><text x="625" y="195" class="b lg mid sf">0,1 µF</text>
  <text x="377" y="194" class="b mid">=</text><text x="542" y="194" class="b mid">=</text>
  <line x1="20" y1="256" x2="700" y2="256" class="sb dash" fill="none"/>
  <text x="185" y="284" class="b mid">Paralel: kapasiteler toplanır</text>
  <line x1="60" y1="310" x2="310" y2="310" class="st" fill="none"/>
  <line x1="60" y1="370" x2="310" y2="370" class="st" fill="none"/>
  <line x1="130" y1="310" x2="130" y2="333" class="st" fill="none"/><line x1="110" y1="333" x2="150" y2="333" class="st sw" fill="none"/>
  <line x1="110" y1="345" x2="150" y2="345" class="st sw" fill="none"/><line x1="130" y1="345" x2="130" y2="370" class="st" fill="none"/>
  <line x1="240" y1="310" x2="240" y2="333" class="st" fill="none"/><line x1="220" y1="333" x2="260" y2="333" class="st sw" fill="none"/>
  <line x1="220" y1="345" x2="260" y2="345" class="st sw" fill="none"/><line x1="240" y1="345" x2="240" y2="370" class="st" fill="none"/>
  <text x="90" y="344" class="sm end">100 nF</text><text x="300" y="344" class="sm">220 nF</text>
  <text x="185" y="400" class="b mid ok">100 + 220 = 320 nF</text>
  <text x="535" y="284" class="b mid">Seri: terslerin toplamı</text>
  <line x1="390" y1="340" x2="470" y2="340" class="st" fill="none"/>
  <line x1="470" y1="320" x2="470" y2="360" class="st sw" fill="none"/><line x1="482" y1="320" x2="482" y2="360" class="st sw" fill="none"/>
  <line x1="482" y1="340" x2="590" y2="340" class="st" fill="none"/>
  <line x1="590" y1="320" x2="590" y2="360" class="st sw" fill="none"/><line x1="602" y1="320" x2="602" y2="360" class="st sw" fill="none"/>
  <line x1="602" y1="340" x2="690" y2="340" class="st" fill="none"/>
  <text x="476" y="312" class="sm mid">100 nF</text><text x="596" y="312" class="sm mid">220 nF</text>
  <text x="535" y="400" class="b mid p">1 ÷ (1/100 + 1/220) ≈ 68,75 nF</text>
</svg>`
  },
  sections: [
    {
      h: "Kondansatör nedir, neden üzerine kod yazılır?",
      p: [
        "Kondansatör (kapasitör), iki iletken plaka arasına konmuş bir yalıtkandan oluşan ve elektrik yükünü kısa süreliğine depolayan devre elemanıdır. Güç kaynaklarında dalgalanmayı süzmek, entegrelerin besleme bacağındaki parazitleri bastırmak, zamanlama devrelerinde gecikme oluşturmak ve ses devrelerinde sinyali geçirip doğru akımı engellemek için kullanılır.",
        "Kondansatörün asıl değeri <strong>kapasite</strong>dir ve birimi <strong>farad (F)</strong>'tır. Bir farad günlük elektronik için çok büyük bir değer olduğu için pratikte mikrofarad (µF), nanofarad (nF) ve pikofarad (pF) kullanılır. Elektrolitik kondansatörler büyük olduğu için üzerlerine değer doğrudan yazılır (ör. 470 µF 25 V). Seramik ve film kondansatörler ise bir mercimek tanesi kadar küçük olabildiğinden üzerlerine \"µ\" işareti ve ondalık virgül sığmaz; bu yüzden üretici kısa bir sayı kodu basar.",
        "Bu kodu çözmeyi öğrendiğinizde bir arıza kartındaki küçük kondansatörün yerine doğru değeri takabilir, şemadaki 100 nF ifadesinin elinizdeki 104 kodlu parçayla aynı şey olduğunu anlayabilirsiniz."
      ]
    },
    {
      h: "Üç haneli kondansatör kodu nasıl çözülür?",
      p: [
        "Uluslararası yaygın kullanılan kodlamada ilk iki rakam değerin anlamlı basamaklarıdır, üçüncü rakam ise bu sayının arkasına kaç sıfır ekleneceğini, yani 10'un kaçıncı kuvvetiyle çarpılacağını gösterir. Çıkan sonuç her zaman <strong>pikofarad</strong> cinsindendir. Kuralı direnç kodlarındaki çarpan mantığına benzetebilirsiniz; tek fark birimin ohm değil pF olmasıdır."
      ],
      formula: "Kapasite (pF) = (ilk iki rakam) × 10^(üçüncü rakam)\n104 → 10 × 10⁴ = 100.000 pF = 100 nF = 0,1 µF\n473 → 47 × 10³ = 47.000 pF = 47 nF",
      ol: [
        "Kodun ilk iki rakamını okuyun: 223 için 22.",
        "Üçüncü rakam kadar sıfır ekleyin: 3 sıfır → 22.000.",
        "Sonuca pF birimini yazın: 22.000 pF.",
        "Daha okunur birime çevirin: 1.000'e bölünce 22 nF, bir daha 1.000'e bölünce 0,022 µF."
      ],
      after: [
        "Üçüncü rakam 8 ise çarpan 0,01, 9 ise 0,1'dir; bu iki istisna çok küçük değerleri yazmak için ayrılmıştır. Örneğin 109 kodu 10 × 0,1 = 1 pF demektir. Ancak bu kullanım nadirdir; 1–10 pF arası değerler genellikle aşağıda anlatılan R harfiyle yazılır.",
        "Yalnızca iki rakam yazan bir kondansatörde (ör. 47 ya da 22) çarpan yoktur ve değer doğrudan pikofarad olarak okunur: 47 = 47 pF. Tek tek hesaplamak yerine kodu [[arac:kondansator-kodu-coz|Kondansatör Kodu Çözücü]]ye yazarsanız pF, nF ve µF karşılıklarını birlikte görürsünüz."
      ]
    },
    {
      h: "Sık kullanılan kondansatör kodları tablosu",
      p: [
        "Hobi elektroniğinde ve tamir işlerinde aşağıdaki kodlarla çok sık karşılaşırsınız. Özellikle 104 (100 nF), entegrelerin besleme bacaklarına konan klasik \"dekuplaj\" kondansatörüdür ve neredeyse her kartta bulunur."
      ],
      table: {
        head: ["Kod", "pF", "nF", "µF"],
        rows: [
          ["101", "100", "0,1", "0,0001"],
          ["221", "220", "0,22", "0,00022"],
          ["471", "470", "0,47", "0,00047"],
          ["102", "1.000", "1", "0,001"],
          ["222", "2.200", "2,2", "0,0022"],
          ["472", "4.700", "4,7", "0,0047"],
          ["103", "10.000", "10", "0,01"],
          ["223", "22.000", "22", "0,022"],
          ["473", "47.000", "47", "0,047"],
          ["104", "100.000", "100", "0,1"],
          ["224", "220.000", "220", "0,22"],
          ["474", "470.000", "470", "0,47"],
          ["105", "1.000.000", "1.000", "1"]
        ],
        caption: "Değerler 10, 22, 47 gibi standart E serisi basamaklarıyla üretilir; bu yüzden tabloda bu rakamlar tekrar eder."
      },
      after: [
        "Tabloya dikkatle bakarsanız her satırın bir öncekinden ya da sonrakinden yaklaşık iki kat farklı olduğunu görürsünüz. Bu, üreticilerin E6 ve E12 değer serilerini kullanmasından kaynaklanır; yedek parça ararken tam değeri bulamazsanız en yakın standart değeri seçmeniz çoğu devrede yeterlidir."
      ]
    },
    {
      h: "R harfi, tolerans harfleri (J, K, M) ve voltaj kodları",
      p: [
        "Bazı küçük değerli kondansatörlerde ondalık virgül yerine <strong>R</strong> harfi kullanılır: <code>4R7</code> = 4,7 pF, <code>1R0</code> = 1 pF, <code>R47</code> = 0,47 pF. Bu kullanım özellikle radyo frekansı devrelerindeki çok küçük kondansatörlerde görülür.",
        "Rakamlardan sonra gelen tek harf <strong>tolerans</strong>ı, yani gerçek değerin yazılı değerden ne kadar sapabileceğini gösterir. 104K yazan bir kondansatörün değeri 90 nF ile 110 nF arasında olabilir. Zamanlama ve filtre devrelerinde dar toleranslı (J ya da daha iyi) parça seçmek sonucu belirgin biçimde iyileştirir; besleme süzmede ise M ve Z sınıfı yeterlidir."
      ],
      table: {
        head: ["Harf", "Tolerans", "Tipik kullanım"],
        rows: [
          ["B", "±0,1 pF", "Çok küçük RF kondansatörleri"],
          ["C", "±0,25 pF", "Çok küçük RF kondansatörleri"],
          ["D", "±0,5 pF", "10 pF altı değerler"],
          ["F", "±%1", "Hassas filtre ve osilatör"],
          ["G", "±%2", "Hassas filtre"],
          ["J", "±%5", "Film kondansatörler, zamanlama"],
          ["K", "±%10", "Genel amaçlı seramik ve film"],
          ["M", "±%20", "Genel amaçlı, süzme"],
          ["Z", "+%80 / −%20", "Ucuz seramik dekuplaj"]
        ]
      },
      after: [
        "Film kondansatörlerde değerin yanında bir de <strong>gerilim kodu</strong> bulunabilir. Yaygın kodlamada 1C = 16 V, 1E = 25 V, 1H = 50 V, 2A = 100 V, 2E = 250 V, 2G = 400 V, 2J = 630 V anlamına gelir. Bazı üreticiler gerilimi doğrudan \"100V\" ya da \"630V\" diye yazar. Örneğin <code>2A104J</code> etiketi 100 V, 100 nF, ±%5 toleranslı bir kondansatörü tarif eder."
      ]
    },
    {
      h: "pF, nF ve µF nasıl çevrilir?",
      p: [
        "Kapasite birimleri SI öneklerine göre her adımda 1.000 kat değişir. Büyük birimden küçüğe geçerken 1.000 ile çarpar, küçükten büyüğe geçerken 1.000'e bölersiniz. Şemalarda bazen \"0,1 µF\", bazen \"100 nF\", bazen \"100n\" yazar; üçü de aynı değerdir. Öneklerin genel mantığını [[bilgi:si-onekleri-mili-mikro-kilo-mega|SI önekleri makalesinde]] ayrıntılı bulabilirsiniz."
      ],
      formula: "1 F = 1.000.000 µF\n1 µF = 1.000 nF = 1.000.000 pF\n1 nF = 1.000 pF = 0,001 µF",
      ul: [
        "<strong>4,7 nF kaç pF?</strong> 4,7 × 1.000 = 4.700 pF; kodu 472'dir.",
        "<strong>0,047 µF kaç nF?</strong> 0,047 × 1.000 = 47 nF; kodu 473'tür.",
        "<strong>2.200 pF kaç µF?</strong> 2.200 ÷ 1.000.000 = 0,0022 µF; kodu 222'dir.",
        "<strong>Eski şemalardaki \"mF\" ve \"mmF\":</strong> Eski Amerikan şemalarında \"mF\" ya da \"MFD\" çoğu zaman mikrofarad, \"mmF\" ise mikromikrofarad yani pikofarad anlamında kullanılmıştır. Bugünkü SI'da mF milifarad demektir; eski şema okurken bağlama bakın."
      ],
      after: [
        "Birim çevirmeyi hızlı yapmak için [[arac:farad-mikrofarad-cevir|Farad Mikrofarad Çevirici]]yi kullanabilirsiniz; değerleri yazdığınız anda diğer birimlerdeki karşılığı görünür."
      ]
    },
    {
      h: "Seri ve paralel bağlamada toplam kapasite",
      p: [
        "Kondansatörlerde bağlama kuralları dirençlerin tam tersidir. <strong>Paralel</strong> bağlamada plakaların toplam alanı büyümüş gibi olur ve kapasiteler doğrudan toplanır. <strong>Seri</strong> bağlamada ise plakalar arası mesafe artmış gibi davranır; toplam kapasite terslerin toplamının tersiyle bulunur ve her zaman en küçük kondansatörün değerinden de küçük çıkar. Dirençlerin bağlanma kuralları için [[bilgi:seri-ve-paralel-direnc-hesaplama|seri ve paralel direnç hesaplama]] yazısına bakabilirsiniz."
      ],
      formula: "Paralel: C_toplam = C₁ + C₂ + C₃ + …\nSeri: 1 / C_toplam = 1/C₁ + 1/C₂ + 1/C₃ + …\nİki kondansatör seri: C_toplam = (C₁ × C₂) / (C₁ + C₂)",
      ol: [
        "<strong>Paralel örnek:</strong> 100 nF ile 220 nF paralel bağlanırsa toplam 100 + 220 = 320 nF olur.",
        "<strong>Seri örnek:</strong> Aynı iki kondansatör seri bağlanırsa (100 × 220) / (100 + 220) = 22.000 / 320 = 68,75 nF bulunur.",
        "<strong>Eşit kondansatörler:</strong> İki adet 100 µF seri bağlanırsa sonuç 50 µF'tır; n adet eşit kondansatör seride C/n eder.",
        "<strong>Gerilim paylaşımı:</strong> Seri bağlı kondansatörlerde gerilim kapasiteyle ters orantılı paylaşılır. 100 nF ve 220 nF seri bağlanıp 32 V uygulanırsa 100 nF'nin üzerinde yaklaşık 22 V, 220 nF'nin üzerinde yaklaşık 10 V kalır; küçük kondansatör daha çok zorlanır."
      ],
      after: [
        "Seri bağlama, elinizde yüksek gerilimli kondansatör yokken daha düşük gerilimli iki parçayla iş görmek için kullanılır; ancak kaçak akımlar eşit olmadığından pratikte her kondansatöre paralel bir dengeleme direnci eklenir. Bu hesapları [[arac:kondansator-seri-paralel-hesapla|Kondansatör Seri Paralel Hesaplama]] aracıyla dört kondansatöre kadar hızla yapabilirsiniz."
      ]
    },
    {
      h: "Voltaj değeri neden önemli? Depolanan enerji",
      p: [
        "Kondansatörün üzerinde yazan gerilim, yalıtkan katmanın güvenle dayanabileceği en yüksek gerilimdir. Bu değer aşılırsa yalıtkan delinir, kondansatör kısa devre olur; elektrolitik tiplerde şişme, sızıntı ve patlama görülebilir. Genel uygulama, devredeki en yüksek gerilimin en az 1,5 katı, mümkünse 2 katı gerilimli kondansatör seçmektir. 12 V'luk bir hatta 16 V'luk değil 25 V'luk elektrolitik tercih etmek bu yüzdendir.",
        "Kondansatörde depolanan enerji gerilimin karesiyle artar. Bu yüzden büyük kapasiteli ve yüksek gerilimli kondansatörler, cihaz fişten çekildikten sonra bile tehlikeli miktarda enerji tutabilir."
      ],
      formula: "E = ½ × C × V²\nÖrnek: 100 µF, 12 V → E = 0,5 × 0,0001 × 144 = 0,0072 J = 7,2 mJ\nÖrnek: 470 µF, 400 V → E = 0,5 × 0,00047 × 160.000 = 37,6 J",
      after: [
        "İlk örnekteki 7,2 mJ zararsız bir değerdir; ikinci örnekteki 37,6 J ise ciddi bir elektrik çarpmasına ve kıvılcıma yol açabilir. Bu nedenle güç kaynağı, mikrodalga fırın, flaş ve televizyon gibi cihazların içine dokunmadan önce kondansatörlerin uygun bir yükle boşaltıldığından emin olunmalıdır. Enerjiyi farklı değerlerle denemek için [[arac:kondansator-enerjisi-hesapla|Kondansatör Enerjisi Hesaplama]] aracı vardır."
      ],
      note: "Şebeke gerilimiyle çalışan cihazların içinde fiş çekili olsa bile yüklü kondansatör bulunabilir. Bu tür onarımları yetkin bir elektrik-elektronik teknisyenine bırakın."
    },
    {
      h: "Elektrolitik, tantal ve SMD kondansatörlerde değer okuma",
      p: [
        "Alüminyum <strong>elektrolitik</strong> kondansatörlerde değer, gerilim ve sıcaklık sınıfı doğrudan yazılır: \"1000 µF 35 V 105 °C\" gibi. Bunlar kutupludur; gövdedeki şerit genellikle eksi bacağı gösterir ve uzun bacak artıdır. Ters takılan elektrolitik kısa sürede ısınıp bozulur.",
        "<strong>Tantal</strong> kondansatörler de kutupludur ama işaretleri terstir: gövdedeki çizgi ya da artı işareti genellikle <strong>artı</strong> bacağı gösterir. Üzerlerinde 106 (10 µF) ya da 475 (4,7 µF) gibi üç haneli kodlar bulunabilir; okuma kuralı seramiklerle aynıdır.",
        "Yüzey montajlı (SMD) çok katmanlı seramik kondansatörlerin çoğunun üzerinde hiçbir yazı yoktur. Değerini öğrenmenin yolu kart şemasına, parça listesine ya da kapasite ölçebilen bir ölçü aletine başvurmaktır. Devre üzerindeyken yapılan ölçümler paralel elemanlar nedeniyle yanıltıcı olabilir."
      ]
    },
    {
      h: "Kondansatör kodu okurken sık yapılan hatalar",
      ul: [
        "<strong>Sonucu µF sanmak:</strong> Üç haneli kod her zaman pF verir. 104'ü \"100 µF\" okumak bin kat hatadır.",
        "<strong>Tolerans harfini rakam sanmak:</strong> 104K'daki K kilo değil ±%10 toleranstır.",
        "<strong>Gerilim kodunu değer sanmak:</strong> 2A104J etiketinde 2A gerilimi (100 V) gösterir; değer yalnızca 104'tür.",
        "<strong>Seri bağlamada toplamak:</strong> Seri kondansatörlerin değeri toplanmaz; sonuç en küçük değerden de küçüktür.",
        "<strong>Gerilim payı bırakmamak:</strong> Çalışma gerilimine çok yakın seçilen kondansatörün ömrü kısalır; özellikle sıcak ortamda.",
        "<strong>Kutuplu kondansatörü ters takmak:</strong> Elektrolitik ve tantal kondansatörde yön kritiktir; tantalda işaret artıyı gösterir."
      ]
    },
    {
      h: "Araçlarla adım adım kondansatör hesabı",
      ol: [
        "Kondansatörün üzerindeki kodu (ör. 473J) [[arac:kondansator-kodu-coz|Kondansatör Kodu Çözücü]]ye yazın; 47 nF ve ±%5 tolerans aralığı görünür.",
        "Şemadaki değer farklı birimdeyse [[arac:farad-mikrofarad-cevir|Farad Mikrofarad Çevirici]] ile karşılaştırın.",
        "Elinizdeki parçaları birleştirip hedef değere ulaşmak istiyorsanız seri-paralel aracına değerleri girin.",
        "Yüksek gerilimli bir uygulamada depolanan enerjiyi kontrol edip güvenlik önlemlerinizi buna göre alın."
      ],
      after: [
        "Kondansatörle birlikte kullanılan dirençlerin değerini okumak için [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısı tamamlayıcıdır. Tüm hesaplar tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya gönderilmez."
      ]
    }
  ],
  faq: [
    ["Kondansatör üzerindeki 104 ne anlama gelir?", "104, ilk iki rakam olan 10'un arkasına dört sıfır eklenerek okunur ve 100.000 pikofarad eder. Bu değer 100 nanofarad ya da 0,1 mikrofarad ile aynıdır ve dekuplaj için en yaygın değerdir."],
    ["103 kodlu kondansatör kaç nF?", "103 kodu 10 × 1.000 = 10.000 pF demektir. Bu da 10 nF ya da 0,01 µF eder. Benzer şekilde 102 kodu 1 nF, 101 kodu 100 pF değerindedir."],
    ["Üç haneli kondansatör kodu nasıl çözülür?", "İlk iki rakam değerin kendisidir, üçüncü rakam ise eklenecek sıfır sayısıdır ve sonuç pikofarad olarak okunur. Örneğin 472 için 47'nin arkasına iki sıfır eklenir, 4.700 pF yani 4,7 nF bulunur."],
    ["Kodun sonundaki J, K, M harfleri ne demek?", "Bu harfler toleransı gösterir: J ±%5, K ±%10, M ±%20 sapma demektir. Z harfi ise değerin %80 fazla ya da %20 eksik olabileceğini gösterir ve ucuz seramik kondansatörlerde görülür."],
    ["Seri bağlı kondansatörlerin toplam kapasitesi nasıl bulunur?", "Seri bağlamada kapasitelerin terslerinin toplamı alınır ve sonucun tersi bulunur. İki kondansatör için kısa yol çarpımın toplama bölünmesidir; 100 nF ile 220 nF seri bağlandığında yaklaşık 68,75 nF elde edilir."],
    ["Paralel bağlamada kapasite nasıl değişir?", "Paralel bağlamada kapasiteler doğrudan toplanır, çünkü plaka alanı büyümüş gibi olur. 100 nF ile 220 nF paralel bağlanırsa toplam 320 nF olur; gerilim dayanımı ise en düşük gerilimli parçayla sınırlıdır."],
    ["pF, nF ve µF nasıl çevrilir?", "Her basamak 1.000 kattır: 1 µF 1.000 nF, 1 nF de 1.000 pF eder. Büyükten küçüğe geçerken 1.000 ile çarpın, küçükten büyüğe geçerken 1.000'e bölün; 0,1 µF bu yolla 100 nF bulunur."],
    ["Kondansatörün voltaj değeri neden önemli?", "Üzerinde yazan gerilim yalıtkanın dayanabileceği sınırdır. Aşılırsa kondansatör delinir, kısa devre olur ya da şişip patlayabilir; bu nedenle devredeki en yüksek gerilimin en az 1,5 katı seçilmesi önerilir."],
    ["Kodun yerine üzerinde 4R7 yazıyorsa değeri nedir?", "R harfi ondalık virgülün yerini tutar ve değer pikofarad olarak okunur. 4R7 yazan kondansatör 4,7 pF'tır; bu kodlama genellikle radyo frekansı devrelerindeki çok küçük değerlerde kullanılır."]
  ],
  tools: ["kondansator-kodu-coz", "kondansator-seri-paralel-hesapla", "farad-mikrofarad-cevir", "kondansator-enerjisi-hesapla"],
  related: ["direnc-renk-kodlari-nasil-okunur", "seri-ve-paralel-direnc-hesaplama", "si-onekleri-mili-mikro-kilo-mega", "ohm-kanunu-nedir"],
  uyari: "elektrik ve elektronik onarımları uzmanlık gerektirir; şebeke gerilimli cihazlarda çalışmadan önce yetkin bir teknisyene danışın",
  sources: [
    ["BIPM – SI önekleri", "https://www.bipm.org/en/measurement-units/si-prefixes"],
    ["IEC – Uluslararası Elektroteknik Komisyonu", "https://www.iec.ch/"]
  ]
};
