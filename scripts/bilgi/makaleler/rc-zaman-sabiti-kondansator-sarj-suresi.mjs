export default {
  slug: "rc-zaman-sabiti-kondansator-sarj-suresi",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "RC Zaman Sabiti Nedir? Kondansatör Şarj Süresi, 5τ Kuralı ve RC Filtre",
  pageTitle: "RC Zaman Sabiti (τ) Nedir? Kondansatör Şarj Süresi Hesabı",
  description: "RC zaman sabiti τ = R × C ile bulunur. Kondansatör 1τ'da %63,2, 5τ'da %99,3 dolar. Şarj-deşarj formülleri, kesim frekansı, enerji ve çözümlü örnekler.",
  keywords: ["rc zaman sabiti", "tau nedir", "kondansatör şarj süresi", "kondansatör kaç saniyede dolar", "5 tau kuralı", "rc filtre kesim frekansı", "kondansatör deşarj", "rc devresi", "kondansatör enerjisi"],
  lead: "RC zaman sabiti, direnç (R) ile kapasitenin (C) çarpımıdır: <strong>τ = R × C</strong> ve birimi saniyedir. Bir kondansatör, direnç üzerinden dolarken 1τ sürede besleme geriliminin yaklaşık <strong>%63,2</strong>'sine, 5τ sürede <strong>%99,3</strong>'üne ulaşır; bu yüzden uygulamada \"5τ'da doldu\" kabul edilir. Örneğin 10 kΩ ve 100 µF ile τ = 1 saniye, tam dolma süresi yaklaşık 5 saniyedir. Bu sayfada şarj ve deşarj formüllerini, %63 değerinin nereden geldiğini, RC filtrenin kesim frekansını, depolanan enerjiyi ve çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Zaman sabiti τ = R × C'dir; ohm ile faradı çarparsanız sonuç saniye çıkar.",
    "Şarjda gerilim V(t) = V<sub>kaynak</sub> × (1 − e<sup>−t/τ</sup>) formülüyle artar; 1τ'da %63,2'ye ulaşır.",
    "Deşarjda gerilim V(t) = V<sub>0</sub> × e<sup>−t/τ</sup> ile azalır; 1τ'da başlangıcın %36,8'i kalır.",
    "5τ sonunda kondansatör %99,3 dolar ya da boşalır; mühendislikte bu süre \"tam dolma süresi\" sayılır.",
    "RC filtrenin kesim frekansı f<sub>c</sub> = 1 ÷ (2πRC)'dir; bu noktada çıkış −3 dB (yaklaşık %70,7) düşer.",
    "Kondansatörde depolanan enerji E = ½ × C × V<sup>2</sup> formülüyle joule olarak bulunur."
  ],
  figure: {
    alt: "RC şarj eğrisi: yatay eksende 0'dan 5τ'ya zaman, dikey eksende gerilim yüzdesi; 1τ'da %63,2, 2τ'da %86,5, 3τ'da %95, 5τ'da %99,3 noktaları işaretli. Sağda 10 kilohm ve 100 mikrofarad örneği.",
    caption: "Kondansatör ilk zaman sabitinde hızlı, sonra giderek yavaş dolar. 10 kΩ ve 100 µF ile τ = 1 sn olduğundan yatay eksendeki her çizgi 1 saniyeye karşılık gelir.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="250" y="30" class="lg b mid">Kondansatör şarj eğrisi</text>
  <line x1="60" y1="330" x2="460" y2="330" class="st" fill="none"/>
  <line x1="60" y1="330" x2="60" y2="60" class="st" fill="none"/>
  <line x1="60" y1="80" x2="460" y2="80" class="sb dash" fill="none"/>
  <text x="54" y="84" class="sm end mu">%100</text>
  <text x="54" y="334" class="sm end mu">%0</text>
  <g class="sb dash" fill="none">
    <line x1="140" y1="330" x2="140" y2="172"/><line x1="220" y1="330" x2="220" y2="114"/>
    <line x1="300" y1="330" x2="300" y2="92"/><line x1="380" y1="330" x2="380" y2="85"/><line x1="460" y1="330" x2="460" y2="82"/>
  </g>
  <polyline points="60,330 80,275 100,231 120,195 140,172 160,152 180,136 200,124 220,114 260,100 300,92 340,88 380,85 420,83 460,82" class="sp sw" fill="none"/>
  <g class="sm mid">
    <text x="140" y="350">1τ</text><text x="220" y="350">2τ</text><text x="300" y="350">3τ</text><text x="380" y="350">4τ</text><text x="460" y="350">5τ</text>
  </g>
  <circle cx="140" cy="172" r="6" class="p"/><text x="150" y="168" class="b p">%63,2</text>
  <circle cx="220" cy="114" r="5" class="p"/><text x="228" y="132" class="sm b">%86,5</text>
  <circle cx="300" cy="92" r="5" class="p"/><text x="300" y="112" class="sm b mid">%95,0</text>
  <circle cx="460" cy="82" r="6" class="ok"/><text x="460" y="70" class="sm b mid ok">%99,3</text>
  <text x="260" y="380" class="sm mid t2">Zaman (τ katları) · τ = 1 sn ise her çizgi 1 saniye</text>
  <rect x="490" y="60" width="210" height="270" rx="10" class="sf sb"/>
  <rect x="490" y="60" width="210" height="40" rx="10" class="p"/>
  <text x="595" y="86" class="b mid sf">Örnek devre</text>
  <text x="505" y="128" class="sm">R = 10 kΩ = 10.000 Ω</text>
  <text x="505" y="152" class="sm">C = 100 µF = 0,0001 F</text>
  <text x="505" y="186" class="b">τ = 10.000 × 0,0001</text>
  <text x="505" y="210" class="b p">τ = 1 saniye</text>
  <line x1="505" y1="226" x2="685" y2="226" class="sb" fill="none"/>
  <text x="505" y="250" class="sm">5 V beslemede 1 sn'de 3,16 V</text>
  <text x="505" y="274" class="sm">Yarı gerilim: 0,69 sn</text>
  <text x="505" y="298" class="sm">Tam dolma (5τ): 5 sn</text>
  <text x="505" y="320" class="sm">Kesim frekansı: 0,159 Hz</text>
</svg>`
  },
  sections: [
    {
      h: "RC zaman sabiti nedir, neden önemlidir?",
      p: [
        "Bir direnç ile bir kondansatör seri bağlanıp gerilim uygulandığında kondansatör anında dolmaz. Başta akım yüksektir, kondansatörün gerilimi yükseldikçe direnç üzerindeki gerilim farkı azalır ve akım da düşer. Bu yüzden dolum, önce hızlı sonra giderek yavaşlayan üstel bir eğri izler.",
        "Bu eğrinin ne kadar hızlı ilerlediğini tek bir sayı belirler: <strong>zaman sabiti τ (tau)</strong>. τ, direnç ile kapasitenin çarpımıdır. Direnç büyüdükçe akım sınırlanır ve dolum yavaşlar; kapasite büyüdükçe doldurulacak yük artar ve yine dolum yavaşlar. İkisini birlikte değerlendirmek için çarpımlarına bakmak yeterlidir.",
        "Zaman sabiti; zamanlayıcı devrelerinin gecikmesini, butonların sıçrama (debounce) filtresini, güç kaynaklarındaki yumuşak başlatmayı, ses devrelerindeki ton filtrelerini ve sensör sinyallerinin yumuşatılmasını belirler. Elektrik-elektronik meslek lisesinde ve üniversitedeki devre analizi derslerinde ilk öğretilen geçici rejim kavramıdır."
      ]
    },
    {
      h: "Tau (τ) nasıl hesaplanır? Formül ve birimler",
      p: [
        "Hesabın tek zor yanı birimlerdir. Direnç ohm (Ω), kapasite farad (F) cinsinden yazılırsa çarpım doğrudan saniye verir. Kondansatörler genellikle mikrofarad (µF), nanofarad (nF) ya da pikofarad (pF) ile etiketlendiği için önce farada çevirmeniz gerekir."
      ],
      formula: "τ = R × C   (Ω × F = saniye)\n1 µF = 0,000001 F · 1 nF = 0,000000001 F · 1 pF = 10⁻¹² F\n1 kΩ = 1.000 Ω · 1 MΩ = 1.000.000 Ω",
      table: {
        head: ["Direnç", "Kapasite", "τ", "5τ (tam dolma)"],
        rows: [
          ["1 kΩ", "100 nF", "0,1 ms (100 µs)", "0,5 ms"],
          ["10 kΩ", "10 µF", "0,1 sn", "0,5 sn"],
          ["10 kΩ", "100 µF", "1 sn", "5 sn"],
          ["4,7 kΩ", "470 µF", "2,209 sn", "11,045 sn"],
          ["1 MΩ", "1 µF", "1 sn", "5 sn"]
        ],
        caption: "Aynı τ değerine farklı R ve C çiftleriyle ulaşılabilir: 10 kΩ × 100 µF ile 1 MΩ × 1 µF ikisi de 1 saniye verir."
      },
      after: [
        "Kapasite birimlerini karıştırıyorsanız [[arac:farad-mikrofarad-cevir|Farad Mikrofarad Çevirici]] µF, nF ve pF arasında dönüşüm yapar. Gövdesinde 104 ya da 472 gibi kod yazan kondansatörlerin değerini okumak için [[bilgi:kondansator-kodu-nasil-okunur-104|kondansatör kodu okuma rehberine]] bakabilirsiniz."
      ]
    },
    {
      h: "Kondansatör kaç saniyede dolar? Şarj ve deşarj formülleri",
      p: [
        "Kondansatörün gerilimi zamanla üstel olarak değişir. Şarj sırasında kaynak gerilimine yaklaşır ama matematiksel olarak hiçbir zaman tam ulaşmaz; deşarjda ise sıfıra yaklaşır. Formüllerdeki <em>e</em> doğal logaritma tabanıdır ve yaklaşık 2,718'e eşittir."
      ],
      formula: "Şarj:   V(t) = V × (1 − e^(−t/τ))\nDeşarj: V(t) = V₀ × e^(−t/τ)\nAkım:   I(t) = (V ÷ R) × e^(−t/τ)\nBelirli gerilime ulaşma süresi: t = −τ × ln(1 − V(t) ÷ V)",
      table: {
        head: ["Süre", "Şarjda ulaşılan gerilim", "Deşarjda kalan gerilim"],
        rows: [
          ["1τ", "%63,21", "%36,79"],
          ["2τ", "%86,47", "%13,53"],
          ["3τ", "%95,02", "%4,98"],
          ["4τ", "%98,17", "%1,83"],
          ["5τ", "%99,33", "%0,67"]
        ],
        caption: "Değerler 1 − e<sup>−n</sup> ve e<sup>−n</sup> ifadelerinden hesaplanmıştır; her zaman sabitinde kalan fark yaklaşık 2,718'e bölünür."
      },
      after: [
        "Tablo, \"kondansatör kaç saniyede dolar\" sorusunun cevabını verir: τ'yu hesaplayıp 5 ile çarpın. Devreniz yalnızca belirli bir eşik gerilime ihtiyaç duyuyorsa (örneğin bir mantık kapısının 3 V eşiği) son formülle tam süreyi bulabilirsiniz. Üstel ifade ve doğal logaritma (ln) bu hesabın temelidir; bilimsel hesap makinesindeki ln tuşuyla sonucu kolayca bulabilirsiniz."
      ]
    },
    {
      h: "Yüzde 63 neden önemlidir? 5τ kuralı ne anlama gelir?",
      p: [
        "%63,2 değeri rastgele seçilmiş bir eşik değildir. Şarj formülünde t = τ yazdığınızda sonuç 1 − e<sup>−1</sup> = 1 − 0,3679 = 0,6321 olur. Yani zaman sabiti, \"kondansatörün kalan farkın yaklaşık üçte ikisini kapattığı süre\" olarak tanımlanmış olur. Osiloskopta bir şarj eğrisine bakarak τ'yu ölçmek isteyen biri, gerilimin son değerin %63'üne çıktığı anı okur.",
        "<strong>5τ kuralı</strong> ise pratik bir kabuldür. 5 zaman sabiti sonra fark %0,67'ye iner; bu, çoğu ölçüm aletinin ve devrenin ayırt edemeyeceği kadar küçüktür. Bu yüzden tasarımcılar \"kondansatör 5τ'da tam dolar ya da tam boşalır\" der. Daha hassas devrelerde (ör. 16 bit ADC örnekleme kondansatörü) 7τ ile 11τ arası beklenir, çünkü istenen hata payı çok daha küçüktür."
      ],
      ul: [
        "<strong>Yarı gerilim süresi:</strong> t = τ × ln 2 ≈ 0,693τ. Bu, radyoaktif bozunmadaki yarı ömür kavramının elektronikteki karşılığıdır; bkz. [[bilgi:yari-omur-nedir-nasil-hesaplanir|yarı ömür nedir]].",
        "<strong>%90 süresi:</strong> t ≈ 2,303τ. Yükselme süresi (rise time) genellikle %10'dan %90'a geçiş olarak tanımlanır ve RC devrede yaklaşık 2,2τ'dur.",
        "<strong>%99 süresi:</strong> t ≈ 4,6τ; 5τ kuralı bunu biraz aşan güvenli bir yuvarlamadır."
      ]
    },
    {
      h: "Çözümlü örnekler",
      p: [
        "<strong>Örnek 1 – Zamanlayıcı:</strong> 10 kΩ direnç ve 100 µF kondansatör 5 V ile besleniyor. τ = 10.000 × 0,0001 = 1 saniye. 1 saniye sonunda gerilim 5 × 0,6321 = 3,16 V olur. Kondansatör yaklaşık 5 saniyede tam dolmuş sayılır. Gerilimin 2,5 V'a (yarısına) çıkma süresi 0,693 × 1 = 0,69 saniyedir.",
        "<strong>Örnek 2 – Eşik süresi:</strong> Aynı devrede bir girişin 3 V'ta tetiklendiğini düşünün. t = −1 × ln(1 − 3 ÷ 5) = −ln(0,4) = 0,916 saniye. Yani tetikleme yaklaşık 0,92 saniye gecikmeyle olur.",
        "<strong>Örnek 3 – Büyük kondansatör:</strong> 4,7 kΩ ve 470 µF için τ = 4.700 × 0,00047 = 2,209 saniye; tam dolma 5 × 2,209 ≈ 11 saniye sürer. Güç kaynaklarının fişten çekildikten sonra bir süre ışık yakmaya devam etmesi benzer bir deşarj sürecidir.",
        "<strong>Örnek 4 – Hızlı devre:</strong> 1 kΩ ve 100 nF ile τ = 1.000 × 0,0000001 = 0,0001 saniye, yani 100 mikrosaniyedir. Buton sıçramalarını süzmek için kullanılan devreler genellikle bu mertebededir."
      ],
      after: [
        "Bu hesapları elle yapmak yerine [[arac:rc-zaman-sabiti-hesapla|RC Zaman Sabiti Hesaplama]] aracına direnç ve kapasiteyi yazın; τ, 5τ, yarı gerilim süresi ve kesim frekansı birlikte gösterilir."
      ]
    },
    {
      h: "RC filtrenin kesim frekansı nasıl bulunur?",
      p: [
        "Aynı direnç ve kondansatör, alternatif sinyallerde frekans seçici bir filtre gibi davranır. Kondansatörün çıkışı alındığında düşük frekanslar geçer, yüksekler zayıflar: buna <strong>alçak geçiren filtre</strong> denir. Elemanların yeri değiştirilip direnç üzerinden çıkış alınırsa <strong>yüksek geçiren filtre</strong> elde edilir.",
        "İki filtrenin de sınırı kesim frekansıdır. Bu frekansta çıkış genliği girişin 1 ÷ √2 ≈ %70,7'sine iner; desibel cinsinden bu −3 dB demektir ve güç yarıya düşer. Kesim frekansı ile zaman sabiti doğrudan bağlıdır: biri bilinirse diğeri bulunur."
      ],
      formula: "f꜀ = 1 ÷ (2π × R × C) = 1 ÷ (2π × τ)\nAlçak geçiren kazanç: |H| = 1 ÷ √(1 + (f ÷ f꜀)²)",
      ul: [
        "1 kΩ ve 100 nF: f<sub>c</sub> = 1 ÷ (2π × 0,0001) ≈ 1.591,5 Hz. Bu filtre konuşma bandının üst kısmını yumuşatır.",
        "10 kΩ ve 100 µF (τ = 1 sn): f<sub>c</sub> ≈ 0,159 Hz. Bu kadar düşük kesim, sensör verisini yavaşça ortalamak için kullanılır.",
        "Kesim frekansının 10 katında alçak geçiren filtrenin kazancı yaklaşık 0,0995'e (−20 dB) düşer; tek kademeli RC filtre her on katta yaklaşık 20 dB zayıflatır."
      ],
      after: [
        "Belirli bir frekanstaki kazancı ve faz kaymasını görmek için [[arac:rc-filtre-kesim-frekansi-hesapla|RC Filtre Kesim Frekansı Hesaplama]] aracını kullanabilirsiniz. Kondansatörün frekansa göre gösterdiği direnç benzeri karşı koymayı (reaktans) [[bilgi:empedans-ve-reaktans-nedir|empedans ve reaktans]] makalesi ayrıntılı anlatır."
      ]
    },
    {
      h: "Kondansatörde depolanan enerji nasıl hesaplanır?",
      p: [
        "Dolu bir kondansatör, plakaları arasındaki elektrik alanında enerji saklar. Enerji kapasiteyle doğru, gerilimin karesiyle orantılıdır; bu yüzden gerilimi iki katına çıkarmak enerjiyi dört katına çıkarır. Depolanan yük ise Q = C × V ile coulomb cinsinden bulunur."
      ],
      formula: "E = ½ × C × V²   (joule)\nQ = C × V   (coulomb)",
      ul: [
        "100 µF kondansatör 12 V'a dolu: E = 0,5 × 0,0001 × 144 = 0,0072 J (7,2 mJ), Q = 0,0012 C.",
        "1.000 µF kondansatör 25 V'a dolu: E = 0,5 × 0,001 × 625 = 0,3125 J.",
        "Enerji küçük görünse de bir anda boşaldığında yüksek akım çeker; büyük elektrolitik kondansatörlerin uçlarını kısa devre etmek kıvılcıma ve hasara yol açabilir."
      ],
      after: [
        "Kapasite ve gerilim girerek enerjiyi joule ve watt-saat olarak görmek için [[arac:kondansator-enerjisi-hesapla|Kondansatör Enerjisi Hesaplama]] aracını kullanın."
      ],
      note: "Güç kaynakları, flaş devreleri ve motor sürücülerindeki büyük kondansatörler cihaz kapatıldıktan sonra da tehlikeli gerilim tutabilir. Bu tür devrelere dokunmadan önce uygun bir deşarj direnciyle boşaltın ve ölçü aletiyle kontrol edin; şebeke gerilimli cihazlarda işi yetkili bir elektrik-elektronik teknisyenine bırakın."
    },
    {
      h: "RC devreleri nerelerde kullanılır?",
      ul: [
        "<strong>Zamanlayıcılar ve gecikme devreleri:</strong> Bir rölenin ya da LED'in birkaç saniye geç açılması, 555 zamanlayıcının darbe süresi.",
        "<strong>Buton sıçraması filtresi:</strong> Mekanik butonların milisaniyeler içindeki titreşimini tek bir temiz geçişe çevirir.",
        "<strong>Güç açılışında sıfırlama (reset):</strong> Mikrodenetleyicinin besleme kararlı hale gelene kadar beklemesini sağlar.",
        "<strong>Ses ve sinyal filtreleri:</strong> Tiz ve bas ayarları, gürültü süzme, örnekleme öncesi kenar yumuşatma (anti-aliasing).",
        "<strong>Doğrultucu sonrası yumuşatma:</strong> Köprü diyot çıkışındaki dalgalanmayı azaltan filtre kondansatörü, yük direnciyle birlikte bir RC devresi oluşturur.",
        "<strong>Dokunmatik ve kapasitif sensörler:</strong> Parmak yaklaştığında kapasite değişir, ölçülen τ da değişir."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Birim çevirmeden çarpmak:</strong> 10 kΩ × 100 µF işlemini 10 × 100 = 1.000 diye yapmak yanlıştır; doğrusu 10.000 Ω × 0,0001 F = 1 saniyedir.",
        "<strong>5τ'yu kesin dolum sanmak:</strong> 5τ'da kondansatör %99,3 doludur; hassas ölçümlerde bu fark önemlidir.",
        "<strong>Kaynağın iç direncini unutmak:</strong> Gerçek devrede kaynak ve kablo direnci R'ye eklenir; çok küçük dirençlerde bu fark baskınlaşabilir.",
        "<strong>Tolerans etkisi:</strong> Elektrolitik kondansatörlerde ±%20 tolerans yaygındır; hesaplanan τ gerçekte bu kadar sapabilir.",
        "<strong>Yükü hesaba katmamak:</strong> Filtre çıkışına bağlanan devrenin giriş direnci, RC değerini etkiler ve kesim frekansını kaydırır. Seri ve paralel dirençlerin eşdeğerini bulmak için [[bilgi:seri-ve-paralel-direnc-hesaplama|seri ve paralel direnç hesabına]] bakın."
      ]
    }
  ],
  faq: [
    ["RC zaman sabiti nedir?", "RC zaman sabiti, direnç ile kapasitenin çarpımıdır ve τ simgesiyle gösterilir. Kondansatörün kaynak geriliminin yaklaşık %63,2'sine dolması için geçen süreyi saniye cinsinden verir."],
    ["Tau (τ) nasıl hesaplanır?", "Direnci ohm, kapasiteyi farad cinsine çevirip çarparsınız. Örneğin 10 kΩ ile 100 µF için 10.000 × 0,0001 = 1 saniye bulunur; birim çevrimi atlanırsa sonuç binlerce kat yanlış çıkar."],
    ["Kondansatör kaç saniyede dolar?", "Pratikte 5 zaman sabitinde, yani 5 × R × C saniyede tam dolmuş kabul edilir. Bu noktada gerilim kaynağın %99,3'üne ulaşmıştır; teorik olarak tam %100'e hiçbir zaman ulaşılmaz."],
    ["5τ kuralı ne anlama gelir?", "5τ kuralı, beş zaman sabiti sonra kalan farkın %0,67'ye inmesi nedeniyle şarj ya da deşarjın bitmiş sayılmasıdır. Daha hassas devrelerde 7τ ile 11τ arası beklenir."],
    ["Yüzde 63 neden önemlidir?", "Şarj formülünde t = τ yazıldığında 1 − e<sup>−1</sup> = 0,632 çıkar. Bu nedenle zaman sabiti, gerilimin son değerin %63,2'sine ulaştığı an olarak ölçülür ve osiloskopta bu noktadan okunur."],
    ["RC filtrenin kesim frekansı nasıl bulunur?", "Kesim frekansı f<sub>c</sub> = 1 ÷ (2πRC) formülüyle bulunur. 1 kΩ ve 100 nF için yaklaşık 1.591 Hz çıkar; bu frekansta çıkış genliği girişin %70,7'sine, yani −3 dB seviyesine iner."],
    ["Kondansatörde depolanan enerji nasıl hesaplanır?", "Enerji E = ½ × C × V<sup>2</sup> formülüyle joule olarak hesaplanır. 100 µF kondansatör 12 V'a dolduğunda 0,0072 J, yani 7,2 milijoule enerji saklar; gerilim iki katına çıkarsa enerji dört katına çıkar."],
    ["RC devreleri nerelerde kullanılır?", "Zamanlayıcı ve gecikme devrelerinde, buton sıçraması filtrelerinde, mikrodenetleyici sıfırlama devrelerinde, ses filtrelerinde ve güç kaynağı yumuşatma katlarında kullanılır. Hepsinde belirleyici büyüklük τ = R × C değeridir."],
    ["Deşarjda kondansatör ne kadar sürede boşalır?", "Deşarj da aynı zaman sabitiyle ilerler: 1τ'da gerilim başlangıcın %36,8'ine, 5τ'da %0,67'sine iner. Bu yüzden deşarj direnci seçerken güvenli seviyeye inme süresi 5 × R × C ile tahmin edilir."]
  ],
  tools: ["rc-zaman-sabiti-hesapla", "rc-filtre-kesim-frekansi-hesapla", "kondansator-enerjisi-hesapla", "farad-mikrofarad-cevir"],
  related: ["empedans-ve-reaktans-nedir", "kondansator-kodu-nasil-okunur-104", "ohm-kanunu-nedir"],
  sources: [
    ["MEB – Mesleki ve Teknik Eğitim, Elektrik-Elektronik Teknolojisi modülleri", "https://megep.meb.gov.tr/"],
    ["BIPM – SI birimleri ve önekleri", "https://www.bipm.org/en/measurement-units/si-prefixes"]
  ],
  uyari: "elektrik devreleriyle çalışırken güvenlik kurallarına uyun; şebeke gerilimli işleri yetkili bir teknisyene bırakın"
};
