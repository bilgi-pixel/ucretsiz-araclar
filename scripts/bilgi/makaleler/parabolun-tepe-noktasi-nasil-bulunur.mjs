export default {
  slug: "parabolun-tepe-noktasi-nasil-bulunur",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Parabolün Tepe Noktası Nasıl Bulunur? r = -b/2a ve Grafik Çizimi",
  pageTitle: "Parabolün Tepe Noktası Nasıl Bulunur? r = -b/2a, Grafik",
  description: "f(x) = ax² + bx + c parabolünün tepe noktası T(r, k): r = -b/2a, k = f(r) = -Δ/4a. Simetri ekseni, kolların yönü, grafik çizimi ve en büyük-en küçük değer örnekleri.",
  keywords: ["parabolün tepe noktası", "tepe noktası formülü", "-b/2a", "parabol grafiği çizme", "ikinci dereceden fonksiyon", "parabol simetri ekseni", "parabol en büyük en küçük değer", "tepe noktası biçimi"],
  lead: "f(x) = ax² + bx + c parabolünün tepe noktası T(r, k) noktasıdır; apsis r = −b ÷ 2a formülüyle, ordinat ise k = f(r) ya da k = −Δ ÷ 4a formülüyle bulunur. Örneğin f(x) = 2x² − 8x + 3 için r = 8 ÷ 4 = 2 ve k = f(2) = −5, yani tepe noktası T(2, −5)'tir. Bu yazıda formülün nereden geldiğini, simetri eksenini, a katsayısının etkisini, diskriminantla x eksenini kesme durumunu, adım adım grafik çizimini ve en büyük–en küçük değer problemlerini çözümlü örneklerle anlatıyoruz.",
  kisaCevap: [
    "Tepe noktasının apsisi r = −b ÷ 2a'dır.",
    "Ordinatı k = f(r) ile ya da doğrudan k = −Δ ÷ 4a (Δ = b² − 4ac) ile bulunur.",
    "a > 0 ise kollar yukarı bakar ve tepe noktası en küçük değerdir; a < 0 ise kollar aşağı bakar ve tepe noktası en büyük değerdir.",
    "Simetri ekseni tepe noktasından geçen x = r doğrusudur; eşit uzaklıktaki noktaların y değerleri aynıdır.",
    "Δ > 0 ise parabol x eksenini iki noktada keser, Δ = 0 ise teğettir, Δ < 0 ise kesmez.",
    "Tepe noktası biçimi: f(x) = a(x − r)² + k; örnekte f(x) = 2(x − 2)² − 5."
  ],
  figure: {
    alt: "f(x) = 2x² − 8x + 3 parabolünün grafiği: tepe noktası T(2, −5), simetri ekseni x = 2, y eksenini 3'te kestiği nokta ve simetriği (4, 3), kökler yaklaşık 0,42 ve 3,58.",
    caption: "Örnek parabol f(x) = 2x² − 8x + 3. a = 2 pozitif olduğu için kollar yukarı bakar ve en küçük değer tepe noktasında, −5'tir. y eksenini kestiği (0, 3) noktasının simetri eksenine göre eşi (4, 3)'tür.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="28" class="lg b mid">f(x) = 2x² − 8x + 3 grafiği</text>
  <line x1="60" y1="140" x2="460" y2="140" class="st" fill="none"/>
  <line x1="100" y1="50" x2="100" y2="300" class="st" fill="none"/>
  <g class="sm t2 mid">
    <text x="160" y="156">1</text><text x="220" y="156">2</text><text x="280" y="156">3</text><text x="340" y="156">4</text><text x="450" y="132">x</text>
  </g>
  <g class="sm t2 end">
    <text x="94" y="84">3</text><text x="94" y="144">0</text><text x="94" y="184">−2</text><text x="94" y="224">−4</text><text x="94" y="248">−5</text><text x="94" y="58">y</text>
  </g>
  <line x1="220" y1="50" x2="220" y2="300" class="sa dash" fill="none"/>
  <text x="226" y="62" class="sm b">x = 2 simetri ekseni</text>
  <path d="M100,80 Q220,400 340,80" class="sp sw" fill="none"/>
  <circle cx="220" cy="240" r="7" class="p"/>
  <text x="232" y="262" class="sm b p">T(2, −5)</text>
  <circle cx="100" cy="80" r="5" class="p"/><text x="108" y="96" class="sm">(0, 3)</text>
  <circle cx="340" cy="80" r="5" class="p"/><text x="302" y="96" class="sm">(4, 3)</text>
  <circle cx="160" cy="200" r="5" class="ok"/><text x="108" y="214" class="sm">(1, −3)</text>
  <circle cx="280" cy="200" r="5" class="ok"/><text x="290" y="204" class="sm">(3, −3)</text>
  <circle cx="125" cy="140" r="5" class="dg"/><circle cx="315" cy="140" r="5" class="dg"/>
  <text x="125" y="128" class="sm mid dg">0,42</text><text x="315" y="128" class="sm mid dg">3,58</text>
  <rect x="480" y="56" width="220" height="330" rx="10" class="sf sb"/>
  <text x="496" y="84" class="b">Adımlar</text>
  <text x="496" y="114" class="sm">a = 2, b = −8, c = 3</text>
  <text x="496" y="142" class="sm">r = −b ÷ 2a = 8 ÷ 4 = 2</text>
  <text x="496" y="170" class="sm">k = f(2) = 8 − 16 + 3 = −5</text>
  <text x="496" y="198" class="sm">Δ = 64 − 24 = 40</text>
  <text x="496" y="226" class="sm">k = −Δ ÷ 4a = −40 ÷ 8 = −5</text>
  <text x="496" y="254" class="sm">Δ > 0 → iki kök</text>
  <text x="496" y="282" class="sm">x = 2 ± √10 ÷ 2</text>
  <text x="496" y="310" class="sm">x₁ ≈ 0,42 · x₂ ≈ 3,58</text>
  <rect x="490" y="326" width="200" height="48" rx="6" class="ps"/>
  <text x="590" y="348" class="sm mid b">f(x) = 2(x − 2)² − 5</text>
  <text x="590" y="366" class="sm mid">tepe noktası biçimi</text>
</svg>`
  },
  sections: [
    {
      h: "Parabolün tepe noktası nedir?",
      p: [
        "İkinci dereceden bir fonksiyonun genel biçimi f(x) = ax² + bx + c'dir (a ≠ 0). Bu fonksiyonun grafiği parabol denilen, simetrik bir U ya da ters U eğrisidir. Parabolün yön değiştirdiği, yani azalmaktan artmaya ya da artmaktan azalmaya geçtiği noktaya <strong>tepe noktası</strong> denir ve genellikle T(r, k) ile gösterilir.",
        "Tepe noktası iki açıdan önemlidir. Birincisi, parabolün simetri ekseni bu noktadan geçer; grafik çizerken tepe noktasını bulmak işin yarısıdır. İkincisi, tepe noktasının ordinatı k, fonksiyonun alabileceği en küçük (kollar yukarıysa) ya da en büyük (kollar aşağıysa) değerdir. Bu yüzden optimizasyon, yani \"en çok kâr\", \"en büyük alan\", \"en yüksek nokta\" sorularının çoğu tepe noktası bulunarak çözülür."
      ]
    },
    {
      h: "Tepe noktasının apsisi neden −b/2a'dır?",
      p: [
        "Formülü anlamanın en kolay yolu tam kareye tamamlamadır. f(x) = ax² + bx + c ifadesinde a ortak paranteze alınır ve parantez içi tam kareye tamamlanır: f(x) = a(x² + (b/a)x) + c = a(x + b/2a)² − b²/4a + c. Buradan f(x) = a(x + b/2a)² + (4ac − b²)/4a elde edilir.",
        "Kare ifade (x + b/2a)² hiçbir zaman negatif olmaz ve en küçük değeri olan 0'ı yalnızca x = −b/2a olduğunda alır. a pozitifse fonksiyon en küçük değerine bu noktada ulaşır; a negatifse en büyük değerine. Yani tepe noktasının apsisi r = −b/2a, ordinatı ise k = (4ac − b²)/4a = −Δ/4a'dır.",
        "Bir başka yol simetridir: parabol x eksenini kesiyorsa kökler simetri ekseninin iki yanında eşit uzaklıktadır. Köklerin ortalaması (x₁ + x₂)/2'dir ve kökler toplamı −b/a olduğu için ortalama yine −b/2a çıkar."
      ],
      formula: "f(x) = ax² + bx + c = a(x − r)² + k\nr = −b ÷ 2a\nk = f(r) = −Δ ÷ 4a = (4ac − b²) ÷ 4a"
    },
    {
      h: "Tepe noktasının ordinatı nasıl bulunur? Çözümlü örnekler",
      p: [
        "Ordinatı bulmanın iki yolu vardır: r değerini fonksiyonda yerine koymak ya da −Δ/4a formülünü kullanmak. İkisi her zaman aynı sonucu verir; birini hesap, diğerini kontrol için kullanmak iyi bir alışkanlıktır."
      ],
      ol: [
        "<strong>Örnek 1:</strong> f(x) = 2x² − 8x + 3. a = 2, b = −8, c = 3. r = −(−8) ÷ (2 × 2) = 2. k = f(2) = 2·4 − 16 + 3 = −5. Kontrol: Δ = 64 − 24 = 40, k = −40 ÷ 8 = −5. Tepe noktası T(2, −5).",
        "<strong>Örnek 2:</strong> f(x) = −x² + 6x − 5. a = −1, b = 6. r = −6 ÷ (−2) = 3. k = −9 + 18 − 5 = 4. Tepe noktası T(3, 4); a negatif olduğu için 4 en büyük değerdir.",
        "<strong>Örnek 3:</strong> f(x) = x² + 4x + 7. r = −4 ÷ 2 = −2. k = 4 − 8 + 7 = 3. Δ = 16 − 28 = −12 < 0; parabol x eksenini kesmez ve tamamen x ekseninin üstündedir.",
        "<strong>Örnek 4:</strong> f(x) = 3x² − 12. b = 0 olduğu için r = 0; k = −12. Tepe noktası y ekseni üzerinde, T(0, −12)."
      ],
      after: [
        "Kendi fonksiyonunuzun tepe noktasını, köklerini ve grafiğini [[arac:denklem-cozucu|Denklem Çözücü]]nün ikinci derece bölümünde görebilir, belirli x değerlerindeki f(x)'i [[arac:polinom-deger-hesapla|Polinom Değer Hesaplama aracıyla]] tablo hâlinde hesaplayabilirsiniz."
      ]
    },
    {
      h: "a katsayısının işareti kolları nasıl belirler?",
      p: [
        "a katsayısı parabolün hem yönünü hem genişliğini belirler. a > 0 ise kollar yukarı bakar (gülen yüz) ve tepe noktası grafiğin en alt noktasıdır. a < 0 ise kollar aşağı bakar (asık yüz) ve tepe noktası en üst noktadır. |a| büyüdükçe parabol daralır ve dikleşir; |a| küçüldükçe genişler ve yayvanlaşır.",
        "b katsayısı tek başına bir anlam taşımaz ama a ile birlikte tepe noktasının sağda mı solda mı olduğunu belirler: a ile b aynı işaretliyse r negatiftir (tepe y ekseninin solunda), zıt işaretliyse r pozitiftir. c katsayısı ise parabolün y eksenini kestiği noktadır: f(0) = c."
      ],
      table: {
        head: ["Koşul", "Kolların yönü", "Tepe noktası", "Değer kümesi"],
        rows: [
          ["a > 0", "Yukarı", "En küçük değer", "y ≥ k"],
          ["a < 0", "Aşağı", "En büyük değer", "y ≤ k"],
          ["|a| büyük", "Dar, dik", "Aynı formülle", "—"],
          ["b = 0", "a'ya göre", "y ekseni üzerinde (r = 0)", "—"],
          ["c", "—", "—", "y eksenini (0, c)'de keser"]
        ]
      }
    },
    {
      h: "Simetri ekseni nedir?",
      p: [
        "Parabolün simetri ekseni, tepe noktasından geçen dikey doğrudur ve denklemi x = r'dir. Grafik bu doğruya göre ayna simetrisine sahiptir: eksenden eşit uzaklıktaki iki x değeri aynı y değerini verir. Örneğimizde x = 2 ekseninden 1 birim uzaklıktaki x = 1 ve x = 3 için f(1) = f(3) = −3; 2 birim uzaklıktaki x = 0 ve x = 4 için f(0) = f(4) = 3'tür.",
        "Bu özellik grafik çizerken hesap yükünü yarıya indirir: eksenin bir tarafındaki noktaları bulup öbür tarafa aynalamanız yeterlidir. Ayrıca iki noktanın y değeri eşitse simetri ekseninin bu iki noktanın tam ortasından geçtiğini söyleyebilirsiniz; bazı sorularda tepe noktası bu yolla, katsayılar bilinmeden bulunur."
      ]
    },
    {
      h: "Diskriminant parabolün x eksenini kesip kesmediğini nasıl gösterir?",
      p: [
        "Parabolün x eksenini kestiği noktalar f(x) = 0 denkleminin kökleridir. Köklerin sayısını diskriminant Δ = b² − 4ac belirler. Tepe noktası formülü k = −Δ/4a da bunu açıklar: a > 0 ve Δ > 0 ise k negatiftir, yani tepe noktası x ekseninin altındadır ve yukarı bakan kollar ekseni iki yerde keser."
      ],
      table: {
        head: ["Diskriminant", "x eksenini kesme", "Tepe noktasının konumu (a > 0)"],
        rows: [
          ["Δ > 0", "İki farklı noktada keser", "x ekseninin altında"],
          ["Δ = 0", "Tek noktada teğet", "x ekseni üzerinde (k = 0)"],
          ["Δ < 0", "Kesmez", "x ekseninin üstünde"]
        ],
        caption: "a < 0 için konumlar tersine döner: Δ > 0 iken tepe noktası x ekseninin üstündedir."
      },
      after: [
        "Örnek 1'de Δ = 40 olduğu için kökler x = (8 ± √40) ÷ 4 = 2 ± √10/2, yani yaklaşık 0,42 ve 3,58'dir. Köklerin ortalaması 2'dir, yani tam simetri ekseni. Diskriminant ve kök formülünün ayrıntıları için [[bilgi:diskriminant-ikinci-derece-denklem|diskriminant ve ikinci derece denklem]] yazısına, hesap için [[arac:diskriminant-hesapla|Diskriminant Hesaplama aracına]] bakabilirsiniz."
      ]
    },
    {
      h: "Parabol grafiği adım adım nasıl çizilir?",
      ol: [
        "a'nın işaretine bakın: kolların yukarı mı aşağı mı açılacağını belirleyin.",
        "Tepe noktasını bulun: r = −b/2a, k = f(r). Noktayı koordinat düzlemine işaretleyin.",
        "Simetri eksenini x = r olarak kesikli çizgiyle çizin.",
        "y eksenini kestiği noktayı işaretleyin: (0, c). Simetri eksenine göre eşini de (2r, c) olarak işaretleyin.",
        "Diskriminantı hesaplayın; Δ ≥ 0 ise kökleri bulup x ekseni üzerinde işaretleyin.",
        "Gerekirse tepe noktasının bir birim sağ ve solundaki noktaları hesaplayın: f(r ± 1) = k + a.",
        "Noktaları düzgün, simetrik bir eğriyle birleştirin; kolları sonsuza uzanacak biçimde ok ya da açık uçlu bırakın."
      ],
      p: [
        "Altıncı adımdaki kısayol işe yarar: tepe noktasından bir birim uzaklaşınca fonksiyon değeri tam a kadar değişir. Örneğimizde a = 2 olduğu için f(1) = f(3) = −5 + 2 = −3'tür. İki birim uzaklaşınca değişim 4a, üç birimde 9a olur."
      ]
    },
    {
      h: "En büyük ve en küçük değer problemleri",
      p: [
        "Tepe noktasının en pratik kullanımı, bir büyüklüğü en büyük ya da en küçük yapan değeri bulmaktır. Problemi ikinci dereceden bir fonksiyona dönüştürüp tepe noktasını bulmanız yeterlidir."
      ],
      ul: [
        "<strong>En büyük alan:</strong> 40 m tel ile çevrilecek dikdörtgen bahçenin bir kenarı x ise diğer kenar 20 − x'tir. Alan A(x) = x(20 − x) = −x² + 20x. r = −20 ÷ (−2) = 10; A(10) = 100 m². En büyük alan, kenarları 10 m olan karede elde edilir.",
        "<strong>Atılan top:</strong> Yüksekliği h(t) = −5t² + 20t + 1 metre olan topun en yüksek noktası t = −20 ÷ (−10) = 2 saniyede, h(2) = −20 + 40 + 1 = 21 metredir.",
        "<strong>En çok kâr:</strong> Bir ürünün fiyatı p arttıkça satış adedi düşüyorsa gelir G(p) = p × (a − bp) biçiminde bir parabol olur; en yüksek gelir p = a ÷ 2b fiyatındadır. Maliyet ve kâr analizine giriş için [[bilgi:basabas-noktasi-nedir|başabaş noktası]] yazısına bakabilirsiniz."
      ],
      after: [
        "Bu problemlerde tanım aralığına dikkat edin. Kenar uzunluğu negatif olamaz, zaman sıfırdan başlar. Tepe noktası izin verilen aralığın dışında kalıyorsa en büyük ya da en küçük değer aralığın uç noktalarından birindedir."
      ]
    },
    {
      h: "Tepe noktası biçimi y = a(x − r)² + k nasıl yazılır? Sık hatalar",
      p: [
        "Tepe noktası biçimi, parabolü doğrudan tepe noktası üzerinden yazar: f(x) = a(x − r)² + k. Genel biçimden bu biçime geçmek için r ve k'yı bulup yerine yazmanız yeterlidir. Örnek 1 için f(x) = 2(x − 2)² − 5. Açarak kontrol edebilirsiniz: 2(x² − 4x + 4) − 5 = 2x² − 8x + 3.",
        "Tersine, tepe noktası ve bir noktası verilen parabolün denklemi de bu biçimle kolayca bulunur. Tepe noktası T(1, 4) olan ve (3, 0) noktasından geçen parabol için 0 = a(3 − 1)² + 4 → 4a = −4 → a = −1; denklem f(x) = −(x − 1)² + 4 = −x² + 2x + 3 olur. Farklı biçimlerdeki denklem sistemleri için [[bilgi:iki-bilinmeyenli-denklem-nasil-cozulur|iki bilinmeyenli denklemler]] yazısı da yardımcı olur."
      ],
      ul: [
        "<strong>Eksi işaretini unutmak:</strong> r = −b/2a'da b negatifse sonuç pozitif olur; f(x) = 2x² − 8x + 3 için r = +2'dir.",
        "<strong>Paydada a yerine 2 yazmak:</strong> Payda 2a'dır; a = 3 ise payda 6 olur.",
        "<strong>Tepe biçiminde işareti karıştırmak:</strong> (x − 2)² tepe noktasının x = 2'de, (x + 2)² ise x = −2'de olduğunu gösterir.",
        "<strong>En büyük/en küçük karışıklığı:</strong> a > 0 ise tepe noktası en küçük değerdir; en büyük değer yoktur.",
        "<strong>Δ < 0 iken kök aramak:</strong> Gerçek kök yoktur; grafik x eksenini kesmez."
      ]
    }
  ],
  faq: [
    ["Parabolün tepe noktası nedir?", "Tepe noktası, ikinci dereceden fonksiyonun grafiği olan parabolün yön değiştirdiği noktadır ve T(r, k) ile gösterilir. Kollar yukarı bakıyorsa en alt, aşağı bakıyorsa en üst noktadır; simetri ekseni bu noktadan geçer."],
    ["Tepe noktasının apsisi neden -b/2a'dır?", "f(x) = ax² + bx + c tam kareye tamamlandığında a(x + b/2a)² + (4ac − b²)/4a elde edilir. Kare ifade en küçük değeri olan sıfırı x = −b/2a iken aldığı için tepe noktasının apsisi budur."],
    ["Tepe noktasının ordinatı nasıl bulunur?", "Apsis r fonksiyonda yerine konularak k = f(r) bulunur ya da doğrudan k = −Δ/4a formülü kullanılır. f(x) = 2x² − 8x + 3 için iki yol da k = −5 sonucunu verir."],
    ["a katsayısının işareti parabolün kollarını nasıl belirler?", "a pozitifse kollar yukarı bakar ve tepe noktası en küçük değerdir; a negatifse kollar aşağı bakar ve tepe noktası en büyük değerdir. a'nın mutlak değeri büyüdükçe parabol daralır."],
    ["Simetri ekseni nedir?", "Simetri ekseni tepe noktasından geçen x = r dikey doğrusudur. Bu eksenden eşit uzaklıktaki iki x değeri aynı y değerini verir; örneğin f(x) = 2x² − 8x + 3 için f(1) = f(3) = −3'tür."],
    ["Diskriminant parabolün x eksenini kesip kesmediğini nasıl gösterir?", "Δ = b² − 4ac pozitifse parabol x eksenini iki noktada keser, sıfırsa eksene teğettir, negatifse hiç kesmez. Tepe noktasının ordinatı k = −Δ/4a olduğu için bu durum tepe noktasının konumundan da görülür."],
    ["Parabol grafiği adım adım nasıl çizilir?", "Önce a'nın işaretiyle kolların yönü belirlenir, sonra tepe noktası, simetri ekseni, y eksenini kestiği nokta ve varsa kökler işaretlenir. Simetri eksenine göre eşlenik noktalar eklenip noktalar simetrik bir eğriyle birleştirilir."],
    ["En büyük ve en küçük değer problemleri tepe noktasıyla nasıl çözülür?", "Problem ikinci dereceden bir fonksiyona dönüştürülür ve tepe noktası bulunur. Örneğin 40 metre telle çevrilen dikdörtgenin alanı A(x) = x(20 − x) olup tepe noktası x = 10'da en büyük alan 100 metrekaredir."],
    ["Tepe noktası biçimi y = a(x - r)² + k nasıl yazılır?", "Genel biçimdeki fonksiyonun a katsayısı korunur, tepe noktasının koordinatları r ve k yerine yazılır. f(x) = 2x² − 8x + 3 için tepe noktası (2, −5) olduğundan biçim f(x) = 2(x − 2)² − 5 olur."]
  ],
  tools: ["diskriminant-hesapla", "denklem-cozucu", "polinom-deger-hesapla"],
  related: ["diskriminant-ikinci-derece-denklem", "iki-bilinmeyenli-denklem-nasil-cozulur"]
};
