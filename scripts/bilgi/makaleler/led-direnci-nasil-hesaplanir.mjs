export default {
  slug: "led-direnci-nasil-hesaplanir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "LED Direnci Nasıl Hesaplanır? 5V ve 12V İçin Kaç Ohm Direnç Gerekir",
  pageTitle: "LED Direnci Hesaplama: 5V ve 12V İçin Kaç Ohm Direnç?",
  description: "LED direnci R = (kaynak gerilimi − LED gerilimi) ÷ akım formülüyle bulunur. 5V kırmızı LED için 150 Ω, 12V beyaz LED için 470 Ω; güç hesabı ve seri-paralel bağlantı.",
  keywords: ["led direnci hesaplama", "led için kaç ohm direnç", "5v led direnç", "12v led direnç", "led ileri gerilimi", "arduino led direnç", "led seri paralel bağlantı", "direnç kaç watt"],
  lead: "LED için gereken seri direnç, <strong>R = (kaynak gerilimi − LED ileri gerilimi) ÷ LED akımı</strong> formülüyle hesaplanır ve sonuç bir üstteki standart direnç değerine yuvarlanır. Örneğin 5 V kaynakta 2 V'luk kırmızı LED'i 20 mA ile yakmak için (5 − 2) ÷ 0,02 = <strong>150 Ω</strong>, 12 V kaynakta 3,2 V'luk beyaz LED için 440 Ω hesaplanır ve 470 Ω seçilir. Direnç, LED'in akımını sınırlayarak yanmasını önler. Bu rehberde ileri gerilim tablosunu, çözümlü örnekleri, direncin kaç watt olması gerektiğini ve birden fazla LED'in nasıl bağlanacağını bulacaksınız.",
  kisaCevap: [
    "Formül: R = (V<sub>kaynak</sub> − V<sub>f</sub>) ÷ I; I amper cinsindendir (20 mA = 0,02 A).",
    "Hesaplanan değer piyasada yoksa bir üstteki standart (E12) değer seçilir; böylece akım hedefi aşmaz.",
    "Kırmızı LED'in ileri gerilimi yaklaşık 1,8–2,2 V, beyaz ve mavi LED'inki yaklaşık 2,8–3,4 V'tur.",
    "5 V'ta kırmızı LED için 150 Ω, beyaz LED için 100 Ω; 12 V'ta kırmızı için 560 Ω, beyaz için 470 Ω uygundur (20 mA).",
    "Dirençte harcanan güç P = (V<sub>kaynak</sub> − V<sub>f</sub>) × I'dır; seçilen direncin watt değeri bunun en az iki katı olmalıdır.",
    "Paralel bağlanan her LED kendi direncini almalıdır; tek dirençle paralel LED sürmek akımın dengesiz dağılmasına yol açar."
  ],
  figure: {
    alt: "12 volt kaynak, 470 ohm direnç ve beyaz LED'den oluşan seri devre şeması; altında 12 voltun 8,8 volt dirençte, 3,2 volt LED'de düştüğünü gösteren gerilim çubuğu ve 18,7 miliamper akım hesabı.",
    caption: "Seri devrede kaynak gerilimi direnç ile LED arasında paylaşılır. LED kendi ileri gerilimini (burada 3,2 V) alır, kalan 8,8 V direnç üzerinde düşer. Akımı belirleyen bu kalan gerilim ile direnç değeridir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">12 V kaynakta beyaz LED devresi</text>
  <rect x="40" y="90" width="90" height="120" rx="8" class="p"/>
  <text x="85" y="140" class="lg b mid sf">12 V</text>
  <text x="85" y="164" class="sm mid sf">kaynak</text>
  <text x="85" y="84" class="b mid dg">+</text>
  <line x1="130" y1="110" x2="250" y2="110" class="st sw" fill="none"/>
  <rect x="250" y="94" width="150" height="34" rx="6" class="ps"/>
  <text x="325" y="117" class="b mid">470 Ω</text>
  <text x="325" y="80" class="sm mid">direnç</text>
  <line x1="400" y1="110" x2="520" y2="110" class="st sw" fill="none"/>
  <polygon points="520,88 520,132 560,110" class="a"/>
  <line x1="562" y1="88" x2="562" y2="132" class="st sw" fill="none"/>
  <text x="540" y="80" class="sm mid">LED (Vf 3,2 V)</text>
  <line x1="562" y1="110" x2="660" y2="110" class="st sw" fill="none"/>
  <line x1="660" y1="110" x2="660" y2="200" class="st sw" fill="none"/>
  <line x1="660" y1="200" x2="130" y2="200" class="st sw" fill="none"/>
  <text x="400" y="190" class="sm mid mu">akım yönü: + kutuptan direnç ve LED üzerinden − kutba</text>
  <text x="40" y="250" class="b">Gerilim nereye gidiyor?</text>
  <rect x="40" y="264" width="469" height="40" rx="4" class="ps"/>
  <rect x="509" y="264" width="171" height="40" rx="4" class="a"/>
  <text x="274" y="290" class="b mid">Dirençte 8,8 V</text>
  <text x="594" y="290" class="b mid">LED'de 3,2 V</text>
  <rect x="40" y="322" width="640" height="78" rx="8" class="sf sb"/>
  <text x="58" y="346" class="b">Hesap: R = (12 − 3,2) ÷ 0,020 = 440 Ω → standart 470 Ω</text>
  <text x="58" y="368" class="sm">Gerçek akım: 8,8 ÷ 470 = 18,7 mA · Dirençte güç: 8,8 × 0,0187 = 0,165 W</text>
  <text x="58" y="388" class="sm p b">Seçim: 470 Ω, en az 0,5 W (güvenlik payı ×2)</text>
</svg>`
  },
  sections: [
    {
      h: "LED'e neden direnç takılır?",
      p: [
        "LED (ışık yayan diyot) bir ampul gibi davranmaz. Ampulün direnci kabaca sabittir ve gerilim artınca akım ölçülü artar. LED'de ise belli bir eşik gerilimine, yani <strong>ileri gerilime</strong> (V<sub>f</sub>) kadar neredeyse hiç akım geçmez; eşik aşıldığında ise küçük bir gerilim artışı akımı çok hızlı yükseltir. LED'i doğrudan bir pile ya da adaptöre bağlarsanız akımı sınırlayan bir şey kalmaz ve LED saniyeler içinde ısınarak bozulur.",
        "Seri bağlanan direnç bu sınırlamayı yapar. Kaynak gerilimi ile LED'in ileri gerilimi arasındaki fark direnç üzerinde düşer ve Ohm kanunu gereği akım bu farkın direnç değerine bölümü kadar olur. Direncin değeri doğru seçildiğinde LED, üreticinin önerdiği akımda güvenle çalışır. Formülün temeli olan Ohm kanununu [[bilgi:ohm-kanunu-nedir|Ohm kanunu nedir]] yazısında ayrıntılı bulabilirsiniz."
      ]
    },
    {
      h: "LED direnci formülü",
      p: [
        "Hesap için üç değere ihtiyacınız var: kaynak gerilimi, LED'in ileri gerilimi ve LED'den geçirmek istediğiniz akım. Akım değerini mutlaka ampere çevirin; 20 mA = 0,020 A, 10 mA = 0,010 A'dir."
      ],
      formula: "R = (V kaynak − V f) ÷ I\nSeri n LED için: R = (V kaynak − n × V f) ÷ I\nDirençte güç: P = (V kaynak − V f) × I  ya da  P = I² × R\nSeçilecek direnç gücü ≥ 2 × P",
      after: [
        "Hesaplanan değer genellikle piyasadaki standart değerlerle örtüşmez. Yaygın olan E12 serisinde her onluk basamakta 1,0 – 1,2 – 1,5 – 1,8 – 2,2 – 2,7 – 3,3 – 3,9 – 4,7 – 5,6 – 6,8 – 8,2 katsayıları bulunur (ör. 100, 120, 150 … 820 Ω). <strong>Bir üstteki değeri</strong> seçmek akımı hedefin biraz altında tutar; bu hem LED'in ömrünü uzatır hem de parlaklıkta gözle fark edilir bir kayıp yaratmaz. Direncin değerini renk bantlarından okumak için [[bilgi:direnc-renk-kodlari-nasil-okunur|direnç renk kodları]] yazısına bakabilirsiniz."
      ]
    },
    {
      h: "LED ileri gerilimi (Vf) nedir?",
      p: [
        "İleri gerilim, LED'in ışık vermeye başladığı ve çalışma akımında üzerinde düşen gerilimdir. Değer LED'in yarı iletken malzemesine, dolayısıyla rengine bağlıdır. Kesin değer LED'in teknik veri sayfasında yazar; elinizde veri sayfası yoksa aşağıdaki tipik aralıklar başlangıç için yeterlidir."
      ],
      table: {
        head: ["LED rengi", "Tipik ileri gerilim (Vf)", "Hesapta kullanılabilecek değer", "Tipik akım (5 mm standart LED)"],
        rows: [
          ["Kızılötesi", "1,2–1,6 V", "1,4 V", "20 mA"],
          ["Kırmızı", "1,8–2,2 V", "2,0 V", "20 mA"],
          ["Turuncu, sarı", "1,9–2,3 V", "2,1 V", "20 mA"],
          ["Sarı-yeşil (eski tip)", "2,0–2,4 V", "2,2 V", "20 mA"],
          ["Parlak yeşil, mavi, beyaz", "2,8–3,4 V", "3,2 V", "20 mA"],
          ["Mor ötesi (UV)", "3,0–3,8 V", "3,4 V", "20 mA"]
        ],
        caption: "Değerler yaklaşıktır; üreticiye ve akıma göre değişir. Gösterge LED'lerinde 5–10 mA bile yeterli parlaklık verir."
      },
      after: [
        "İleri gerilim sıcaklıkla biraz azalır ve aynı paketten çıkan LED'ler arasında bile küçük farklar olur. Bu yüzden hesapta tipik değeri kullanıp akımı en yüksek değerin değil, önerilen çalışma değerinin üzerine çıkarmamak gerekir."
      ]
    },
    {
      h: "Çözümlü örnekler: 5V, 12V ve seri LED",
      p: [
        "<strong>Örnek 1 – 5 V'ta kırmızı LED (ör. bir mikrodenetleyici kartının 5 V pini):</strong> V<sub>f</sub> = 2,0 V, I = 20 mA. R = (5 − 2) ÷ 0,02 = <strong>150 Ω</strong>. Bu değer E12 serisinde tam olarak bulunur. Dirençte harcanan güç 3 × 0,02 = 0,06 W'tır; standart 1/4 W (0,25 W) direnç rahatlıkla yeterlidir.",
        "<strong>Örnek 2 – 5 V'ta beyaz LED:</strong> V<sub>f</sub> = 3,2 V, I = 20 mA. R = (5 − 3,2) ÷ 0,02 = 90 Ω. 90 Ω standart değil; bir alttaki 82 Ω akımı hedefin üstüne çıkaracağı için <strong>100 Ω</strong> seçilir. Gerçek akım 1,8 ÷ 100 = 18 mA olur.",
        "<strong>Örnek 3 – 12 V'ta beyaz LED:</strong> R = (12 − 3,2) ÷ 0,02 = 440 Ω, bir üst değer <strong>470 Ω</strong>. Akım 8,8 ÷ 470 ≈ 18,7 mA, dirençteki güç 8,8 × 0,0187 ≈ 0,165 W'tır. 1/4 W direnç teorik olarak yeterli görünse de ısınmayı önlemek için iki kat pay bırakılır ve <strong>0,5 W</strong> direnç seçilir.",
        "<strong>Örnek 4 – 12 V'ta üç beyaz LED seri:</strong> Toplam ileri gerilim 3 × 3,2 = 9,6 V. R = (12 − 9,6) ÷ 0,02 = <strong>120 Ω</strong>. Dirençteki güç yalnızca 2,4 × 0,02 = 0,048 W'tır. Seri bağlantı, aynı akımla üç LED'i yakarken dirençte harcanan enerjiyi büyük ölçüde azaltır."
      ],
      table: {
        head: ["Kaynak", "LED", "Hesaplanan R", "Seçilen R (E12)", "Gerçek akım", "Dirençte güç", "Direnç gücü"],
        rows: [
          ["3,3 V", "Kırmızı (2,0 V)", "65 Ω", "68 Ω", "19,1 mA", "0,025 W", "1/4 W"],
          ["5 V", "Kırmızı (2,0 V)", "150 Ω", "150 Ω", "20 mA", "0,06 W", "1/4 W"],
          ["5 V", "Beyaz (3,2 V)", "90 Ω", "100 Ω", "18 mA", "0,032 W", "1/4 W"],
          ["9 V", "Kırmızı (2,0 V)", "350 Ω", "390 Ω", "17,9 mA", "0,126 W", "1/2 W"],
          ["12 V", "Kırmızı (2,0 V)", "500 Ω", "560 Ω", "17,9 mA", "0,179 W", "1/2 W"],
          ["12 V", "Beyaz (3,2 V)", "440 Ω", "470 Ω", "18,7 mA", "0,165 W", "1/2 W"],
          ["12 V", "3 beyaz seri", "120 Ω", "120 Ω", "20 mA", "0,048 W", "1/4 W"],
          ["24 V", "Beyaz (3,2 V)", "1.040 Ω", "1,2 kΩ", "17,3 mA", "0,36 W", "1 W"]
        ],
        caption: "Hedef akım 20 mA alınmıştır. Direnç gücü sütunu, harcanan gücün en az iki katını karşılayan standart değerdir."
      }
    },
    {
      h: "Dirençte harcanan güç ve kaç watt'lık direnç seçilmeli?",
      p: [
        "Direnç, üzerinde düşen gerilimi ısıya çevirir. Harcanan güç P = V × I ile bulunur; burada V direnç üzerindeki gerilimdir (kaynak eksi LED gerilimi). Yaygın küçük dirençler 1/8 W, 1/4 W ve 1/2 W güçtedir. Direnç, etiketindeki gücün sınırında çalışırsa çok ısınır, zamanla değeri kayar ve devre kartını karartabilir.",
        "Güvenli kural, seçilen direncin watt değerinin <strong>harcanan gücün en az iki katı</strong> olmasıdır. Yukarıdaki tabloda görüldüğü gibi 5 V'luk devrelerde güç çok düşüktür ve 1/4 W her zaman yeter; 12 V ve üstünde tek LED süren dirençler ise kolayca 1/4 W sınırına yaklaşır. Kaynak gerilimi yükseldikçe enerjinin büyük kısmı ısıya gider; 24 V'ta tek beyaz LED süren bir devrede harcanan enerjinin yaklaşık %87'si dirençte ısıya dönüşür. Bu durumda birden fazla LED'i seri bağlamak ya da sabit akım sürücüsü kullanmak daha verimlidir.",
        "Güç hesabını ayrıca doğrulamak için [[arac:isi-kaybi-direnc-hesapla|Dirençte Harcanan Güç Hesaplama]] aracını kullanabilirsiniz. Gerilim, akım ve güç arasındaki genel ilişki [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Birden fazla LED seri mi paralel mi bağlanmalı?",
      p: [
        "<strong>Seri bağlantıda</strong> LED'ler art arda dizilir ve hepsinden aynı akım geçer. Tek bir direnç yeterlidir; toplam ileri gerilim kaynak geriliminden belirgin biçimde düşük olmalıdır (en az 1–2 V fark bırakın). 12 V'ta en fazla üç beyaz LED seri bağlanması bu yüzden yaygındır; dört beyaz LED 12,8 V ister ve 12 V'ta ya hiç yanmaz ya da çok sönük yanar.",
        "<strong>Paralel bağlantıda</strong> her LED'in kendi seri direnci olmalıdır. Paralel LED'leri tek bir ortak dirençle beslemek cazip görünür ama ileri gerilimi biraz daha düşük olan LED akımın büyük kısmını çeker, ısınır, ileri gerilimi daha da düşer ve sonunda bozulur. Ardından akım kalan LED'lere dağılır ve zincirleme arıza başlar.",
        "Uzun LED dizileri için iki yöntem birleştirilir: üçerli seri gruplar oluşturulur, her grup kendi direnciyle kaynağa paralel bağlanır. Hazır 12 V LED şeritleri de bu şekilde, her üç LED'de bir direnç bulunacak biçimde üretilir."
      ]
    },
    {
      h: "Direnç takılmazsa ne olur?",
      p: [
        "LED doğrudan kaynağa bağlandığında akımı yalnızca kaynağın iç direnci ve kabloların direnci sınırlar. Küçük bir düğme pil yüksek iç direnci nedeniyle LED'i bir süre yakabilir; bu yüzden direnç olmadan yanan anahtarlık lambaları görürsünüz. Ancak bir adaptör, araç aküsü ya da USB çıkışı yüzlerce miliamper ya da daha fazla akım verebilir ve LED anında ya da kısa sürede bozulur.",
        "Bozulma her zaman göz önünde olmaz: LED parlak bir ışıkla yanıp sönebilir, rengi değişebilir ya da parlaklığı haftalar içinde azalır. Mikrodenetleyici pinine dirençsiz LED bağlamak ise pini de zorlar; pin çıkışının izin verdiği akımı aşmak kartın kendisine zarar verebilir. Yüksek güçlü LED'lerde (1 W ve üstü) direnç yerine akımı sabit tutan bir LED sürücüsü kullanılır."
      ]
    },
    {
      h: "LED direnci hesaplama aracını kullanma",
      ol: [
        "[[arac:led-direnc-hesapla|LED Direnç Hesaplama]] aracına kaynak gerilimini volt olarak yazın.",
        "LED'in ileri gerilimini veri sayfasından ya da yukarıdaki tablodan girin.",
        "İstediğiniz akımı miliamper olarak yazın; standart 5 mm LED'ler için 10–20 mA uygundur.",
        "Seri bağlayacağınız LED sayısını girin; araç toplam ileri gerilimi kendisi hesaplar.",
        "Sonuçta gerekli direnci, en yakın standart değeri, gerçek akımı, dirençte harcanan gücü ve önerilen direnç watt değerini görürsünüz.",
        "Farklı bir kombinasyon (gerilim, akım ve direnç) denemek için [[arac:ohm-kanunu-hesapla|Ohm Kanunu Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Akımı miliamper olarak formüle koymak:</strong> (5 − 2) ÷ 20 = 0,15 Ω gibi saçma bir sonuç çıkar; akımı ampere çevirin.",
        "<strong>Bir alttaki standart değeri seçmek:</strong> Akım hedefin üstüne çıkar; her zaman bir üst değeri seçin.",
        "<strong>Direnç gücünü hesaplamamak:</strong> 12 V ve üstünde 1/4 W direnç ısınabilir.",
        "<strong>Kutup yönünü ters takmak:</strong> LED'in uzun bacağı artıdır (anot); ters takılan LED yanmaz ve yüksek ters gerilimde bozulabilir.",
        "<strong>Paralel LED'lere tek direnç:</strong> Her paralel kola ayrı direnç koyun."
      ]
    }
  ],
  faq: [
    ["LED için direnç nasıl hesaplanır?", "Kaynak geriliminden LED'in ileri gerilimi çıkarılır ve sonuç amper cinsinden LED akımına bölünür. Örneğin 5 V kaynak, 2 V kırmızı LED ve 20 mA akım için (5 − 2) ÷ 0,02 = 150 Ω bulunur; sonuç bir üst standart değere yuvarlanır."],
    ["5V'ta LED'e kaç ohm direnç takılır?", "20 mA akım için 5 V'ta kırmızı, sarı ve turuncu LED'lere 150 Ω, beyaz, mavi ve parlak yeşil LED'lere 100 Ω uygundur. Gösterge amaçlı daha sönük ışık yeterliyse 220 ile 330 Ω arası dirençler de güvenle kullanılabilir."],
    ["12V için hangi direnç gerekir?", "12 V'ta 20 mA hedefle kırmızı LED için 560 Ω, beyaz ya da mavi LED için 470 Ω seçilir. Bu dirençlerde yaklaşık 0,17 W harcandığı için 1/2 W güçte direnç kullanılmalıdır; üç beyaz LED seri bağlanırsa 120 Ω yeterlidir."],
    ["LED ileri gerilimi (Vf) nedir?", "İleri gerilim, LED çalışma akımında iletime geçtiğinde üzerinde düşen gerilimdir ve rengine bağlıdır. Kırmızı LED'lerde yaklaşık 1,8–2,2 V, beyaz ve mavi LED'lerde yaklaşık 2,8–3,4 V'tur; kesin değer veri sayfasında yazar."],
    ["Dirençte harcanan güç nasıl hesaplanır?", "Direnç üzerindeki gerilim, yani kaynak gerilimi eksi LED gerilimi, akımla çarpılır. 12 V kaynakta beyaz LED için 8,8 V × 0,0187 A ≈ 0,165 W bulunur; seçilen direncin gücü bunun en az iki katı olmalıdır."],
    ["Kaç watt'lık direnç seçilmeli?", "Harcanan gücün en az iki katını karşılayan standart değer seçilir. 5 V'luk LED devrelerinde 1/4 W yeterlidir; 12 V'ta tek LED süren dirençler için 1/2 W, 24 V'ta 1 W gerekebilir."],
    ["Birden fazla LED seri mi paralel mi bağlanmalı?", "Toplam ileri gerilim kaynak geriliminden yeterince düşükse seri bağlantı tek dirençle verimli çalışır. Paralel bağlantıda her LED'in ayrı direnci olmalıdır; ortak tek direnç akımın dengesiz dağılmasına ve LED'lerin sırayla bozulmasına yol açar."],
    ["Direnç takılmazsa ne olur?", "Akımı sınırlayan bir şey kalmadığı için LED aşırı akım çeker, ısınır ve kısa sürede bozulur. Bozulma bazen anında, bazen parlaklığın haftalar içinde azalması şeklinde görülür; mikrodenetleyici pinine dirençsiz bağlamak pini de zorlar."],
    ["Arduino'da LED için kaç ohm direnç kullanılır?", "5 V çıkışlı kartlarda kırmızı LED için 150 ile 330 Ω, beyaz LED için 100 ile 220 Ω arası dirençler yaygındır. Pin başına akım sınırını aşmamak için 10–15 mA hedeflemek kartı ve LED'i daha güvenli tutar."]
  ],
  tools: ["led-direnc-hesapla", "ohm-kanunu-hesapla", "isi-kaybi-direnc-hesapla"],
  related: ["ohm-kanunu-nedir", "direnc-renk-kodlari-nasil-okunur", "watt-amper-volt-iliskisi"],
  sources: [
    ["IEC – Dirençler için tercih edilen değer serileri (IEC 60063)", "https://www.iec.ch/"]
  ]
};
