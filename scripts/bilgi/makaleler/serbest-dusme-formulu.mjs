export default {
  slug: "serbest-dusme-formulu",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Serbest Düşme Formülü Nedir? Düşme Süresi, Hız ve Yükseklik Hesabı",
  pageTitle: "Serbest Düşme Formülü: h = ½gt², v = gt ve Çözümlü Örnekler",
  description: "Serbest düşmede yol h = ½gt², hız v = gt ve v² = 2gh formülleriyle bulunur. 20 m'den düşen cisim yaklaşık 2 s'de yere 19,8 m/s hızla çarpar. Örnekler ve yukarı atış.",
  keywords: ["serbest düşme formülü", "serbest düşme hareketi", "düşme süresi hesaplama", "h=1/2gt²", "yere çarpma hızı", "düzgün hızlanan hareket", "yukarı atış formülü", "yer çekimi ivmesi 9,81"],
  lead: "Serbest düşme, bir cismin hava direnci ihmal edilerek <strong>yalnızca yer çekiminin etkisiyle</strong> düşmesidir ve üç temel formülle hesaplanır: düşülen yükseklik <strong>h = ½ × g × t²</strong>, hız <strong>v = g × t</strong>, zamansız bağıntı <strong>v² = 2 × g × h</strong>. Burada g yer çekimi ivmesidir ve yeryüzünde yaklaşık 9,81 m/s² alınır; ders kitaplarında kolaylık için 10 m/s² de kullanılır. Örneğin 20 metreden bırakılan bir cisim yaklaşık 2,02 saniyede yere ulaşır ve 19,8 m/s (yaklaşık 71 km/s) hızla çarpar. Aşağıda formüllerin nereden geldiğini, çözümlü örnekleri ve yukarı atış hareketini bulacaksınız.",
  kisaCevap: [
    "Serbest düşmede ilk hız sıfırdır ve ivme sabittir: a = g ≈ 9,81 m/s² (hesap kolaylığı için 10 m/s²).",
    "Yükseklik: h = ½ × g × t²; hız: v = g × t; zamansız: v² = 2 × g × h.",
    "Düşme süresi t = √(2h ÷ g); yere çarpma hızı v = √(2gh).",
    "Hava direnci ihmal edilirse ağır ve hafif cisimler aynı anda yere düşer; kütle formülde yoktur.",
    "g = 10 alındığında ardışık saniyelerde alınan yollar 5, 15, 25, 35 metre gibi 1:3:5:7 oranında artar.",
    "Yukarı v₀ hızıyla atılan cisim t = v₀ ÷ g sürede tepe noktasına çıkar ve h = v₀² ÷ 2g yüksekliğe ulaşır."
  ],
  figure: {
    alt: "Serbest düşen bir topun her saniyedeki konumunu gösteren dikey diyagram: g 10 alındığında 1. saniyede 5 m, 2. saniyede 20 m, 3. saniyede 45 m, 4. saniyede 80 m aşağıda; yanında hız değerleri 10, 20, 30, 40 m/s ve formül kutusu.",
    caption: "Cisim her saniye bir öncekinden daha fazla yol alır, çünkü hızı her saniye g kadar artar. Toplam yol zamanın karesiyle büyür: 2 kat sürede 4 kat, 3 kat sürede 9 kat yol. Değerler g = 10 m/s² ile hesaplanmıştır; g = 9,81 ile yaklaşık %2 daha küçük çıkar.",
    svg: `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">Serbest düşmede saniye saniye konum (g = 10 m/s²)</text>
  <line x1="150" y1="50" x2="150" y2="420" class="st" fill="none"/>
  <g class="sm end">
    <text x="138" y="58">0 m</text><text x="138" y="77">5 m</text><text x="138" y="122">20 m</text><text x="138" y="197">45 m</text><text x="138" y="302">80 m</text>
  </g>
  <g>
    <circle cx="200" cy="54" r="10" class="p"/>
    <circle cx="200" cy="73" r="10" class="p"/>
    <circle cx="200" cy="118" r="10" class="p"/>
    <circle cx="200" cy="193" r="10" class="p"/>
    <circle cx="200" cy="298" r="10" class="p"/>
  </g>
  <g class="sm">
    <text x="222" y="58">t = 0 s · v = 0</text>
    <text x="222" y="80">t = 1 s · v = 10 m/s</text>
    <text x="222" y="122">t = 2 s · v = 20 m/s</text>
    <text x="222" y="197">t = 3 s · v = 30 m/s</text>
    <text x="222" y="302">t = 4 s · v = 40 m/s</text>
  </g>
  <g class="sm mid">
    <rect x="390" y="56" width="60" height="22" rx="4" class="oks"/><text x="420" y="72">5 m</text>
    <rect x="390" y="88" width="60" height="22" rx="4" class="oks"/><text x="420" y="104">15 m</text>
    <rect x="390" y="150" width="60" height="22" rx="4" class="oks"/><text x="420" y="166">25 m</text>
    <rect x="390" y="240" width="60" height="22" rx="4" class="oks"/><text x="420" y="256">35 m</text>
    <text x="420" y="290" class="mu">o saniyede alınan yol</text>
  </g>
  <rect x="480" y="56" width="220" height="200" rx="10" class="sf sb"/>
  <text x="590" y="84" class="b mid">Üç temel formül</text>
  <text x="500" y="116" class="b">h = ½ · g · t²</text>
  <text x="500" y="146" class="b">v = g · t</text>
  <text x="500" y="176" class="b">v² = 2 · g · h</text>
  <line x1="500" y1="192" x2="680" y2="192" class="sb dash" fill="none"/>
  <text x="500" y="216" class="sm">t = √(2h ÷ g)</text>
  <text x="500" y="240" class="sm">v = √(2 · g · h)</text>
  <rect x="480" y="276" width="220" height="80" rx="10" class="ps"/>
  <text x="590" y="302" class="sm mid b">20 m'den bırakılan cisim</text>
  <text x="590" y="324" class="sm mid">g = 9,81: t ≈ 2,02 s</text>
  <text x="590" y="344" class="sm mid">v ≈ 19,8 m/s ≈ 71 km/s</text>
  <line x1="150" y1="420" x2="700" y2="420" class="st sw" fill="none"/>
  <text x="425" y="438" class="sm mid mu">zemin</text>
</svg>`
  },
  sections: [
    {
      h: "Serbest düşme nedir?",
      p: [
        "Bir cisim belli bir yükseklikten ilk hızı olmadan bırakıldığında ve üzerine yalnızca yer çekimi kuvveti etki ettiğinde yaptığı harekete <strong>serbest düşme</strong> denir. Bu hareket, ivmesi sabit olan doğrusal bir harekettir: cismin hızı her saniye aynı miktarda, yaklaşık 9,81 m/s artar. Bu sabit ivmeye <strong>yer çekimi ivmesi</strong> denir ve g harfiyle gösterilir.",
        "Gerçek hayatta havanın direnci düşmeyi yavaşlatır. Ancak ağır ve küçük cisimlerin kısa yüksekliklerden düşüşünde bu etki çok küçüktür; bu yüzden fizik derslerinde hava direnci ihmal edilerek ideal serbest düşme incelenir. Yaprak, kâğıt ya da paraşüt gibi geniş yüzeyli ve hafif cisimlerde ise hava direnci belirleyicidir ve bu formüller doğru sonuç vermez.",
        "Serbest düşme, 9. sınıf fizik müfredatında ve TYT'de düzgün hızlanan hareketin en tipik örneği olarak incelenir. Formülleri anlamak, eğik ve yatay atış gibi daha karmaşık hareketlerin de temelini oluşturur."
      ]
    },
    {
      h: "Serbest düşme formülleri nelerdir?",
      p: [
        "Serbest düşme, ilk hızı sıfır ve ivmesi g olan düzgün hızlanan harekettir. Bu yüzden genel hareket denklemlerinde v₀ = 0 ve a = g yazıldığında serbest düşme formülleri elde edilir. Aşağı yönü pozitif kabul etmek hesapları kolaylaştırır."
      ],
      formula: "Hız: v = g × t\nYükseklik (alınan yol): h = ½ × g × t²\nZamansız bağıntı: v² = 2 × g × h\nDüşme süresi: t = √(2h ÷ g) · Çarpma hızı: v = √(2 × g × h)",
      table: {
        head: ["Yükseklik", "Düşme süresi (g = 9,81)", "Çarpma hızı (m/s)", "Çarpma hızı (km/s)"],
        rows: [
          ["1 m", "0,45 s", "4,4 m/s", "16 km/s"],
          ["5 m", "1,01 s", "9,9 m/s", "36 km/s"],
          ["10 m", "1,43 s", "14,0 m/s", "50 km/s"],
          ["20 m", "2,02 s", "19,8 m/s", "71 km/s"],
          ["45 m", "3,03 s", "29,7 m/s", "107 km/s"],
          ["100 m", "4,52 s", "44,3 m/s", "159 km/s"]
        ],
        caption: "Hava direnci ihmal edilmiştir. Gerçekte yüksek düşüşlerde hız hava direnci nedeniyle bu değerlerin altında kalır."
      },
      after: [
        "Yüksekliği, süreyi ya da çarpma hızını girerek diğer ikisini [[arac:serbest-dusme-hesapla|serbest düşme hesaplama]] aracıyla bulabilirsiniz. m/s değerini km/s'ye çevirmek için 3,6 ile çarpmak yeterlidir."
      ]
    },
    {
      h: "Bir cismin düşme süresi nasıl hesaplanır? Çözümlü örnek",
      ol: [
        "Soru: 45 metre yüksekliğindeki bir binanın çatısından bırakılan taş kaç saniyede yere düşer ve yere hangi hızla çarpar? (g = 10 m/s² alın.)",
        "Süre formülünü yazın: t = √(2h ÷ g).",
        "Değerleri yerine koyun: t = √(2 × 45 ÷ 10) = √9 = 3 s.",
        "Hızı bulun: v = g × t = 10 × 3 = 30 m/s. Kontrol: v² = 2gh = 2 × 10 × 45 = 900 → v = 30 m/s.",
        "km/s'ye çevirin: 30 × 3,6 = 108 km/s.",
        "Aynı soruyu g = 9,81 ile çözerseniz t = √(90 ÷ 9,81) ≈ 3,03 s ve v ≈ 29,7 m/s bulursunuz. Fark yaklaşık %1'dir."
      ],
      after: [
        "Sorularda verilen g değerini kullanmak önemlidir. Sınav soruları sonucu tam sayı çıkarmak için genellikle g = 10 m/s² verir; mühendislik ve gerçek hesaplarda 9,81 m/s² kullanılır."
      ]
    },
    {
      h: "Yere çarpma hızı nasıl bulunur?",
      p: [
        "Süre bilinmiyorsa en hızlı yol zamansız bağıntıdır: v² = 2gh. Bu formül, cismin potansiyel enerjisinin tamamen kinetik enerjiye dönüşmesinden de elde edilebilir: m × g × h = ½ × m × v². Kütle iki tarafta sadeleştiği için çarpma hızı yalnızca yüksekliğe bağlıdır.",
        "Örneğin 5 metreden düşen bir cisim için v = √(2 × 9,81 × 5) ≈ 9,9 m/s yani yaklaşık 36 km/s'dir. Yükseklik 4 katına çıkarsa (20 m) hız yalnızca 2 katına çıkar (19,8 m/s); çünkü hız yüksekliğin kareköküyle büyür. Enerji dönüşümünün ayrıntıları [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Hava direnci ihmal edilirse ağır cisim daha hızlı mı düşer?",
      p: [
        "Hayır. Formüllerde kütle yer almaz; hava direnci yoksa bir demir bilye ile bir kuş tüyü aynı yükseklikten aynı anda bırakıldığında yere aynı anda ulaşır. Aristoteles'ten beri yaygın olan \"ağır cisim daha hızlı düşer\" düşüncesini Galileo deney ve akıl yürütmeyle çürütmüştür. 1971'de Ay yüzeyindeki bir astronot, havasız ortamda bir çekiç ve bir tüyü aynı anda bırakarak bunu gözle görülür biçimde göstermiştir.",
        "Bunun nedeni, ağır cisme etki eden yer çekimi kuvvetinin daha büyük olması ama aynı oranda daha büyük eylemsizliğe (kütleye) sahip olmasıdır. Newton'un ikinci yasasında F = m × a ve F = m × g yazıldığında kütle sadeleşir ve a = g bulunur. Kuvvet ile kütle ilişkisi [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasaları]] yazısında, kütle ile ağırlık farkı ise [[bilgi:kutle-ve-agirlik-farki|kütle ve ağırlık farkı]] yazısında ele alınıyor.",
        "Havanın olduğu gerçek ortamda ise sonuç değişir. Hava direnci hızla birlikte artar ve bir noktada yer çekimini dengeler; cisim artık hızlanmaz ve <strong>limit hız</strong>a ulaşır. Paraşütle atlayan biri paraşüt açılmadan önce yaklaşık 200 km/s civarında bir limit hıza ulaşır; paraşüt açıldığında yüzey alanı büyüdüğü için limit hız birkaç m/s'ye düşer."
      ]
    },
    {
      h: "Düzgün hızlanan hareket denklemleri nelerdir?",
      p: [
        "Serbest düşme, sabit ivmeli hareketin özel bir hâlidir. Genel hâlde cismin ilk hızı (v₀) sıfırdan farklı olabilir ve ivme herhangi bir sabit değer (a) alabilir. Dört temel denklem şunlardır:"
      ],
      formula: "v = v₀ + a × t\nx = v₀ × t + ½ × a × t²\nv² = v₀² + 2 × a × x\nx = (v₀ + v) ÷ 2 × t",
      after: [
        "Bu denklemlerde beş büyüklük vardır: ilk hız, son hız, ivme, süre ve yer değiştirme. Herhangi üçünü bildiğinizde diğer ikisini bulabilirsiniz. Genel sabit ivmeli hareket problemleri için [[arac:duzgun-hizlanan-hareket-hesapla|düzgün hızlanan hareket hesaplama]] aracını, sabit hızlı hareket için ise [[arac:hiz-hesapla|hız hesaplama]] aracını kullanabilirsiniz. Sabit hızlı hareketin temel ilişkisi [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısında anlatılıyor."
      ]
    },
    {
      h: "Yukarı atılan cisim ne zaman tepe noktasına ulaşır?",
      p: [
        "Yukarı doğru v₀ hızıyla atılan bir cisim, yer çekimi tarafından her saniye g kadar yavaşlatılır. Hızı sıfıra indiğinde tepe noktasına ulaşır, ardından serbest düşmeye başlar. Hava direnci yoksa hareket simetriktir: çıkış süresi iniş süresine eşittir ve cisim atıldığı noktaya atıldığı hızla geri döner."
      ],
      formula: "Tepe noktasına çıkış süresi: t = v₀ ÷ g\nÇıkabileceği en büyük yükseklik: h = v₀² ÷ (2 × g)\nToplam uçuş süresi (aynı seviyeye dönüş): 2 × v₀ ÷ g",
      ol: [
        "Soru: Bir top 20 m/s hızla dik yukarı atılıyor (g = 10 m/s²).",
        "Tepeye çıkış süresi: t = 20 ÷ 10 = 2 s.",
        "En büyük yükseklik: h = 20² ÷ (2 × 10) = 400 ÷ 20 = 20 m.",
        "Toplam uçuş süresi: 2 × 2 = 4 s. Top 4 saniye sonra eline 20 m/s hızla geri döner.",
        "Aynı topu 9,81 m/s² ile hesaplarsanız çıkış süresi ≈ 2,04 s, yükseklik ≈ 20,4 m bulunur."
      ],
      after: [
        "Cisim dik değil de belirli bir açıyla atılırsa hareket yatay ve dikey bileşenlere ayrılır; dikey bileşen burada anlatılan formüllere, yatay bileşen ise sabit hızlı harekete uyar. Bu konunun ayrıntıları [[bilgi:egik-atis-formulleri|eğik atış formülleri]] yazısında."
      ]
    },
    {
      h: "g neden 9,8 ya da 10 alınır?",
      p: [
        "Yer çekimi ivmesi Dünya'nın her yerinde tam olarak aynı değildir. Dünya'nın kendi ekseni etrafında dönmesi ve kutuplardan basık olması nedeniyle g ekvatorda yaklaşık 9,78 m/s², kutuplarda yaklaşık 9,83 m/s²'dir; yüksek dağlarda da biraz azalır. Bilimsel ve teknik hesaplarda kullanılan uluslararası <strong>standart değer 9,80665 m/s²</strong>'dir ve çoğu hesapta 9,81'e yuvarlanır.",
        "Ders kitapları ve sınavlar ise işlem kolaylığı için g = 10 m/s² alır. Bu yuvarlama sonucu yaklaşık %2 değiştirir; kavramları öğrenirken ve tam sayılarla çalışmak için yeterlidir. Ay'da yer çekimi ivmesi yaklaşık 1,62 m/s²'dir; aynı 20 metrelik düşüş Ay'da yaklaşık 5 saniye sürer."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Kareyi unutmak:</strong> h = ½gt² formülünde t'nin karesi alınır. 3 saniyede düşülen yol 15 m değil 45 m'dir (g = 10).",
        "<strong>Ardışık saniyede alınan yolu toplam yolla karıştırmak:</strong> 3. saniye içinde alınan yol 25 m, ilk 3 saniyede alınan toplam yol 45 m'dir.",
        "<strong>Yukarı atışta yönleri karıştırmak:</strong> Yukarıyı pozitif aldıysanız g'yi negatif yazmalısınız; işaretleri baştan belirleyin.",
        "<strong>Hızı km/s yerine m/s ile yorumlamak:</strong> 30 m/s günlük dilde 108 km/s'dir; birimleri karıştırmayın.",
        "<strong>Her cisme formülü uygulamak:</strong> Kâğıt, yaprak ve paraşüt gibi hafif ve geniş cisimlerde hava direnci baskındır; ideal formül gerçeği yansıtmaz."
      ]
    }
  ],
  faq: [
    ["Serbest düşme nedir?", "Serbest düşme, bir cismin ilk hızı olmadan bırakılıp hava direnci ihmal edilerek yalnızca yer çekiminin etkisiyle düşmesidir. Cisim sabit ivmeyle hızlanır; hızı her saniye yaklaşık 9,81 m/s artar ve hareket düzgün hızlanan doğrusal harekettir."],
    ["Serbest düşme formülleri nelerdir?", "Temel formüller h = ½ × g × t², v = g × t ve v² = 2 × g × h'dir. Bunlardan düşme süresi t = √(2h ÷ g), yere çarpma hızı ise v = √(2gh) olarak türetilir. g yeryüzünde yaklaşık 9,81 m/s², ders kitaplarında 10 m/s² alınır."],
    ["Bir cismin düşme süresi nasıl hesaplanır?", "Düşme süresi t = √(2h ÷ g) formülüyle bulunur. Örneğin 45 metreden bırakılan bir taş için g = 10 alındığında t = √(90 ÷ 10) = 3 saniye çıkar; g = 9,81 ile süre yaklaşık 3,03 saniyedir."],
    ["Yere çarpma hızı nasıl bulunur?", "Yere çarpma hızı v = √(2 × g × h) formülüyle, süre biliniyorsa v = g × t ile bulunur. 20 metreden düşen cisim yaklaşık 19,8 m/s yani 71 km/s hızla çarpar. Hız yüksekliğin kareköküyle büyüdüğü için yükseklik 4 kat olunca hız 2 kat olur."],
    ["Hava direnci ihmal edilirse ağır cisim daha hızlı mı düşer?", "Hayır, hava direnci yoksa tüm cisimler kütlelerinden bağımsız olarak aynı ivmeyle düşer ve aynı anda yere ulaşır. Ağır cisme etki eden kuvvet büyüktür ama kütlesi de aynı oranda büyüktür; Newton'un ikinci yasasında kütle sadeleşir."],
    ["Düzgün hızlanan hareket denklemleri nelerdir?", "Dört temel denklem v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax ve x = (v₀ + v) ÷ 2 × t'dir. Serbest düşme bu denklemlerde ilk hızın sıfır ve ivmenin g alındığı özel durumdur; bilinen üç büyüklükten diğer ikisi bulunur."],
    ["Yukarı atılan cisim ne zaman tepe noktasına ulaşır?", "Yukarı v₀ hızıyla atılan cisim t = v₀ ÷ g sürede tepe noktasına ulaşır ve h = v₀² ÷ 2g yüksekliğe çıkar. 20 m/s ile atılan bir top g = 10 alındığında 2 saniyede 20 metreye çıkar ve 4 saniye sonra atıldığı yere döner."],
    ["g neden 9,8 ya da 10 alınır?", "Yer çekimi ivmesinin standart değeri 9,80665 m/s²'dir ve hesaplarda genellikle 9,81 ya da 9,8 kullanılır. Ders kitapları ve sınavlar işlem kolaylığı için 10 m/s² alır; bu yuvarlama sonucu yaklaşık yüzde 2 değiştirir."],
    ["Ardışık saniyelerde alınan yollar neden 1:3:5:7 oranında artar?", "Serbest düşmede hız her saniye eşit miktarda arttığı için her saniyede alınan yol bir öncekinden sabit bir miktar fazladır. g = 10 alındığında 1., 2., 3. ve 4. saniyelerde sırasıyla 5, 15, 25 ve 35 metre yol alınır; bu da tek sayılar oranıdır."]
  ],
  tools: ["serbest-dusme-hesapla", "duzgun-hizlanan-hareket-hesapla", "hiz-hesapla"],
  related: ["egik-atis-formulleri", "kinetik-ve-potansiyel-enerji", "newtonun-hareket-yasalari", "kutle-ve-agirlik-farki", "hiz-yol-zaman-formulu"],
  sources: [
    ["BIPM – SI Broşürü (standart yer çekimi ivmesi gₙ)", "https://www.bipm.org/en/publications/si-brochure"],
    ["MEB – Ortaöğretim fizik dersi öğretim programı", "https://www.meb.gov.tr/"]
  ]
};
