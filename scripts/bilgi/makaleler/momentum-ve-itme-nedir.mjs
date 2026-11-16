export default {
  slug: "momentum-ve-itme-nedir",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Momentum ve İtme Nedir? Formülleri, Çarpışmalar ve Momentumun Korunumu",
  pageTitle: "Momentum ve İtme Nedir? p = m·v, F·Δt ve Çarpışmalar",
  description: "Momentum kütle ile hızın çarpımıdır (p = m·v), itme ise kuvvet ile sürenin çarpımıdır (I = F·Δt = Δp). Korunum yasası ve çarpışmalar çözümlü örneklerle.",
  keywords: ["momentum nedir", "itme nedir", "momentum formülü", "momentumun korunumu", "esnek çarpışma", "itme momentum değişimi", "momentumun birimi", "hava yastığı itme"],
  lead: "Momentum, hareket eden bir cismin <strong>kütlesi ile hızının çarpımıdır</strong> (p = m · v) ve birimi kg·m/s'dir; itme ise bir kuvvetin <strong>ne kadar süre uygulandığının ölçüsüdür</strong> (I = F · Δt) ve her zaman momentumdaki değişime eşittir. Dış kuvvet etkimeyen bir sistemde toplam momentum korunur; bu yüzden çarpışma ve patlama problemleri momentumla çözülür. Bu sayfada formülleri, itme–momentum teoremini, esnek ve esnek olmayan çarpışmaları, hava yastığının çalışma ilkesini ve 11. sınıf ile AYT düzeyinde çözümlü örnekleri bulacaksınız.",
  kisaCevap: [
    "Momentum p = m · v; vektörel bir büyüklüktür, yönü hızın yönüdür; birimi kg·m/s'dir.",
    "İtme I = F · Δt; birimi N·s'dir ve 1 N·s = 1 kg·m/s olduğu için momentumla aynı birimdedir.",
    "İtme–momentum teoremi: cisme uygulanan itme, momentumundaki değişime eşittir: F · Δt = Δp = m · (v<sub>son</sub> − v<sub>ilk</sub>).",
    "Dış kuvvetlerin toplamı sıfırsa sistemin toplam momentumu korunur: m<sub>1</sub>v<sub>1</sub> + m<sub>2</sub>v<sub>2</sub> = m<sub>1</sub>v<sub>1</sub>' + m<sub>2</sub>v<sub>2</sub>'.",
    "Esnek çarpışmada momentum ve kinetik enerji korunur; esnek olmayan çarpışmada yalnızca momentum korunur.",
    "Hava yastığı durma süresini uzatarak aynı momentum değişimini daha küçük ortalama kuvvetle gerçekleştirir."
  ],
  figure: {
    alt: "İki çarpışma örneği: üstte 2 kg ve 6 m/s hızla giden cisim duran 4 kg'lık cisme çarpıyor. Esnek çarpışmada birinci cisim 2 m/s ile geri dönüyor, ikinci cisim 4 m/s ile ilerliyor. Esnek olmayan çarpışmada ikisi yapışıp 2 m/s ile birlikte ilerliyor. Her durumda toplam momentum 12 kg·m/s.",
    caption: "Aynı başlangıç, iki farklı sonuç. İki durumda da toplam momentum 12 kg·m/s olarak korunur; esnek çarpışmada kinetik enerji de 36 J'de kalır, yapışarak çarpışmada 12 J'ye düşer ve 24 J ısı, ses ve şekil değişimine gider.",
    svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="t"/></marker></defs>
  <text x="360" y="30" class="lg b mid">Çarpışmada momentum korunur</text>
  <text x="20" y="64" class="b">Önce</text>
  <line x1="20" y1="120" x2="700" y2="120" class="sb" fill="none"/>
  <rect x="90" y="80" width="60" height="40" rx="6" class="p"/><text x="120" y="106" class="b mid sf">2 kg</text>
  <line x1="156" y1="98" x2="236" y2="98" class="st sw" fill="none" marker-end="url(#ok)"/><text x="196" y="88" class="sm mid b">6 m/s</text>
  <rect x="300" y="72" width="80" height="48" rx="6" class="ok"/><text x="340" y="102" class="b mid sf">4 kg</text>
  <text x="340" y="140" class="sm mid t2">duruyor</text>
  <rect x="460" y="70" width="240" height="56" rx="8" class="sf sb"/>
  <text x="472" y="92" class="sm b">p = 2 × 6 + 4 × 0 = 12 kg·m/s</text>
  <text x="472" y="114" class="sm">Ek = ½·2·6² = 36 J</text>
  <text x="20" y="184" class="b p">Esnek çarpışma</text>
  <line x1="20" y1="240" x2="700" y2="240" class="sb" fill="none"/>
  <rect x="140" y="200" width="60" height="40" rx="6" class="p"/><text x="170" y="226" class="b mid sf">2 kg</text>
  <line x1="134" y1="218" x2="80" y2="218" class="st sw" fill="none" marker-end="url(#ok)"/><text x="104" y="208" class="sm mid b">2 m/s</text>
  <rect x="300" y="192" width="80" height="48" rx="6" class="ok"/><text x="340" y="222" class="b mid sf">4 kg</text>
  <line x1="386" y1="216" x2="440" y2="216" class="st sw" fill="none" marker-end="url(#ok)"/><text x="412" y="206" class="sm mid b">4 m/s</text>
  <rect x="460" y="190" width="240" height="56" rx="8" class="oks"/>
  <text x="472" y="212" class="sm b">p = 2·(−2) + 4·4 = 12 kg·m/s</text>
  <text x="472" y="234" class="sm">Ek = 4 + 32 = 36 J (korundu)</text>
  <text x="20" y="304" class="b p">Esnek olmayan (yapışan) çarpışma</text>
  <line x1="20" y1="360" x2="700" y2="360" class="sb" fill="none"/>
  <rect x="240" y="320" width="60" height="40" rx="6" class="p"/><text x="270" y="346" class="b mid sf">2 kg</text>
  <rect x="300" y="312" width="80" height="48" rx="6" class="ok"/><text x="340" y="342" class="b mid sf">4 kg</text>
  <line x1="386" y1="336" x2="440" y2="336" class="st sw" fill="none" marker-end="url(#ok)"/><text x="412" y="326" class="sm mid b">2 m/s</text>
  <rect x="460" y="310" width="240" height="56" rx="8" class="dgs"/>
  <text x="472" y="332" class="sm b">p = 6 × 2 = 12 kg·m/s</text>
  <text x="472" y="354" class="sm">Ek = ½·6·2² = 12 J (24 J kayıp)</text>
  <text x="360" y="410" class="sm mid mu">Sağa doğru pozitif yön; negatif hız sola hareket demektir.</text>
</svg>`
  },
  sections: [
    {
      h: "Momentum nedir?",
      p: [
        "Momentum (çizgisel momentum), bir cismin hareketinin \"ne kadar zor durdurulacağını\" anlatan büyüklüktür. Aynı hızla giden bir bisiklet ile bir kamyonu düşünün: kamyonu durdurmak çok daha zordur, çünkü kütlesi büyüktür. Aynı kütleli iki top düşünün: hızlı olanı yakalamak daha zordur. Momentum bu iki etkiyi tek bir sayıda birleştirir: kütle çarpı hız.",
        "Momentum <strong>vektörel</strong> bir büyüklüktür; büyüklüğü kadar yönü de önemlidir. Tek boyutlu problemlerde bir yönü pozitif seçer, ters yöndeki hızları negatif yazarız. İki cismin momentumlarını toplarken bu işaretlere dikkat etmek, çarpışma sorularındaki hataların büyük kısmını önler."
      ],
      formula: "p = m · v\np: momentum (kg·m/s) · m: kütle (kg) · v: hız (m/s)",
      after: [
        "Örnek: 1.200 kg kütleli bir otomobil 72 km/sa hızla gidiyor. Hızı m/s'ye çevirmek için 3,6'ya böleriz: 72 ÷ 3,6 = 20 m/s. Momentum p = 1.200 × 20 = 24.000 kg·m/s'dir. Aynı momentuma sahip olmak için 0,4 kg'lık bir futbol topunun 60.000 m/s hızla gitmesi gerekirdi. Hız birimlerinin çevrilmesi için [[bilgi:hiz-yol-zaman-formulu|hız, yol, zaman formülü]] yazısına bakabilirsiniz; momentumu ve aynı cismin kinetik enerjisini birlikte görmek için [[arac:momentum-hesapla|Momentum Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Momentumun birimi nedir?",
      p: [
        "Uluslararası Birimler Sistemi'nde momentumun birimi <strong>kilogram metre bölü saniye (kg·m/s)</strong>'dir. Momentumun kendine ait özel bir adı yoktur; bu birim doğrudan kütle ve hız birimlerinin çarpımından gelir. İtmenin birimi olan newton saniye (N·s) ise kg·m/s ile aynıdır, çünkü 1 N = 1 kg·m/s² olduğundan 1 N·s = 1 kg·m/s eder.",
        "Bu eşitlik tesadüf değildir: itme, momentum değişimidir ve ikisinin aynı birimle ölçülmesi gerekir. Soru çözerken kütleyi gram, hızı km/sa olarak bırakırsanız sonuç bu birimlerde çıkmaz; önce kilogram ve m/s'ye çevirin."
      ]
    },
    {
      h: "İtme nedir? İtme ile momentum arasındaki ilişki",
      p: [
        "İtme (impuls), bir kuvvetin uygulandığı süre boyunca cisme kazandırdığı toplam etkidir ve kuvvet ile sürenin çarpımıyla bulunur. Newton'un ikinci yasası F = m · a, ivmenin a = Δv ÷ Δt olduğu hatırlanarak yeniden yazıldığında itme–momentum teoremi ortaya çıkar: kuvvet çarpı süre, momentumdaki değişime eşittir."
      ],
      formula: "I = F · Δt\nF · Δt = m · Δv = m · (v_son − v_ilk) = Δp\nOrtalama kuvvet: F = Δp ÷ Δt",
      ol: [
        "<strong>Topa vuruş:</strong> 0,45 kg'lık bir top 20 m/s hızla oyuncuya geliyor ve ayakla 15 m/s hızla geri gönderiliyor; temas süresi 0,01 s. Topun geliş yönünü pozitif seçelim: v<sub>ilk</sub> = +20 m/s, v<sub>son</sub> = −15 m/s.",
        "Momentum değişimi Δp = 0,45 × (−15 − 20) = 0,45 × (−35) = −15,75 kg·m/s. Eksi işareti, değişimin geliş yönünün tersine olduğunu gösterir.",
        "İtme = Δp = −15,75 N·s; ortalama kuvvetin büyüklüğü F = 15,75 ÷ 0,01 = 1.575 N.",
        "Dikkat: hızlar ters yönde olduğu için büyüklükler toplanır (20 + 15 = 35). Yön işaretini unutursak 0,45 × 5 = 2,25 N·s gibi yanlış bir sonuç buluruz."
      ],
      after: [
        "Kuvvet–zaman grafiğinde itme, eğrinin altında kalan alandır. Kuvvet sabit değilse (gerçek çarpışmalarda neredeyse hiç sabit değildir) itme bu alanın hesaplanmasıyla bulunur ve ortalama kuvvet, bu alanın süreye bölünmesidir. Kuvvetten ve süreden ya da kütle ve hız değişiminden itmeyi bulmak için [[arac:itme-hesapla|İtme (İmpuls) Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Hava yastığı ve emniyet kemeri itme ilkesine göre nasıl çalışır?",
      p: [
        "Bir çarpışmada yolcunun momentumu belirli bir değerden sıfıra iner; bu değişim, çarpışmanın nasıl olduğundan bağımsız olarak aynıdır. Değiştirebileceğimiz tek şey, bu değişimin ne kadar sürede gerçekleştiğidir. F = Δp ÷ Δt formülüne göre süre uzadıkça vücuda etkiyen ortalama kuvvet azalır."
      ],
      ol: [
        "70 kg kütleli bir yolcu 54 km/sa (15 m/s) hızla giderken araç aniden duruyor. Yolcunun momentum değişimi 70 × 15 = 1.050 kg·m/s'dir.",
        "Yolcu sert bir yüzeye çarparak 0,01 s içinde durursa ortalama kuvvet 1.050 ÷ 0,01 = 105.000 N olur.",
        "Emniyet kemeri ve hava yastığı durma süresini örneğin 0,1 s'ye uzatırsa kuvvet 1.050 ÷ 0,1 = 10.500 N'a, yani onda birine iner.",
        "Momentum değişimi her iki durumda aynıdır; farkı yaratan yalnızca süredir."
      ],
      after: [
        "Aynı ilke günlük hayatın birçok yerinde karşımıza çıkar: yüksekten atlayan birinin dizlerini bükmesi, kalecinin topu tutarken ellerini geri çekmesi, kask içindeki köpük, ambalajlardaki hava kabarcıklı naylon ve spor salonlarındaki minderler hep durma süresini uzatarak kuvveti azaltır. Bu örnekler, kuvvet ve hareket arasındaki ilişkiyi açıklayan [[bilgi:newtonun-hareket-yasalari|Newton'un hareket yasalarının]] doğrudan uygulamalarıdır."
      ]
    },
    {
      h: "Momentumun korunumu ne demek?",
      p: [
        "Bir sisteme dışarıdan net kuvvet etkimiyorsa sistemin toplam momentumu değişmez. Çarpışan iki cisim birbirine eşit büyüklükte ve zıt yönde kuvvet uygular (Newton'un üçüncü yasası); bu kuvvetler aynı süre boyunca etkidiği için cisimlere eşit ve zıt itmeler verir. Birinin kazandığı momentumu diğeri kaybeder, toplam sabit kalır."
      ],
      formula: "m1 · v1 + m2 · v2 = m1 · v1' + m2 · v2'\n(v: çarpışmadan önceki, v': sonraki hızlar)",
      after: [
        "Geri tepme bu yasanın en bilinen örneğidir. 4 kg'lık bir tüfekten 10 g (0,01 kg) kütleli mermi 400 m/s hızla çıksın. Başlangıçta ikisi de durduğu için toplam momentum sıfırdır. Atıştan sonra 0 = 0,01 × 400 + 4 × v<sub>tüfek</sub>, buradan v<sub>tüfek</sub> = −1 m/s bulunur: tüfek 1 m/s hızla geriye doğru teper. Roketlerin uzay boşluğunda ilerlemesi, patenli iki kişinin birbirini itince zıt yönlere kayması ve bir topun duvardan sekmesi de aynı ilkeyle açıklanır.",
        "Korunum yalnızca dış kuvvetlerin ihmal edilebildiği kısa olaylarda pratik olarak geçerlidir. Çarpışma süresince sürtünme ve yerçekimi gibi dış kuvvetler, çarpışan cisimlerin birbirine uyguladığı devasa kuvvetlerin yanında genellikle çok küçük kalır; bu yüzden \"çarpışmadan hemen önce ve hemen sonra\" momentum korunur kabul edilir."
      ]
    },
    {
      h: "Esnek ve esnek olmayan çarpışma farkı nedir?",
      table: {
        head: ["Özellik", "Esnek çarpışma", "Esnek olmayan çarpışma", "Tam esnek olmayan (yapışan)"],
        rows: [
          ["Momentum", "Korunur", "Korunur", "Korunur"],
          ["Kinetik enerji", "Korunur", "Bir kısmı kaybolur", "En fazla kayıp"],
          ["Cisimler çarpışmadan sonra", "Ayrılır", "Ayrılır", "Birlikte hareket eder"],
          ["Geri sıçrama katsayısı e", "1", "0 ile 1 arası", "0"],
          ["Örnek", "Bilardo topları, atom altı parçacıklar (yaklaşık)", "Zıplayan top, otomobil kazaları", "Çamur topunun duvara yapışması, bağlanan vagonlar"]
        ],
        caption: "Kaybolan kinetik enerji yok olmaz; ısıya, sese ve kalıcı şekil değişimine dönüşür. Enerji dönüşümlerinin genel mantığı için kinetik ve potansiyel enerji yazısına bakabilirsiniz."
      },
      after: [
        "Gerçek hayatta tam esnek çarpışma yok denecek kadar azdır; çelik bilyeler ve bilardo topları buna oldukça yakındır. Soru metinlerinde \"cisimler kenetlenir\", \"yapışır\", \"birlikte hareket eder\" ifadeleri tam esnek olmayan çarpışmayı; \"enerji kaybı yoktur\" ya da \"esnek\" ifadesi esnek çarpışmayı gösterir. Kinetik enerjinin hesaplanması için [[bilgi:kinetik-ve-potansiyel-enerji|kinetik ve potansiyel enerji]] yazısı yardımcı olur."
      ]
    },
    {
      h: "Çarpışma sonrası hızlar nasıl hesaplanır? Çözümlü örnekler",
      p: [
        "Aşağıdaki iki örnekte aynı başlangıç durumu kullanılıyor: m<sub>1</sub> = 2 kg kütleli cisim v<sub>1</sub> = 6 m/s hızla, duran (v<sub>2</sub> = 0) m<sub>2</sub> = 4 kg kütleli cisme merkezî olarak çarpıyor. Sağa doğru yön pozitif."
      ],
      ol: [
        "<strong>Tam esnek olmayan çarpışma:</strong> Cisimler yapışıyor. Momentum korunumu: 2 × 6 + 4 × 0 = (2 + 4) × v'. 12 = 6 × v', buradan v' = 2 m/s (sağa).",
        "<strong>Enerji kaybı:</strong> İlk kinetik enerji ½ × 2 × 6² = 36 J. Son kinetik enerji ½ × 6 × 2² = 12 J. Kayıp 36 − 12 = 24 J, yani başlangıç enerjisinin %66,7'si.",
        "<strong>Esnek çarpışma (durgun hedef):</strong> v<sub>1</sub>' = (m<sub>1</sub> − m<sub>2</sub>) ÷ (m<sub>1</sub> + m<sub>2</sub>) × v<sub>1</sub> = (2 − 4) ÷ 6 × 6 = −2 m/s. Birinci cisim 2 m/s hızla geri döner.",
        "<strong>İkinci cismin hızı:</strong> v<sub>2</sub>' = 2m<sub>1</sub> ÷ (m<sub>1</sub> + m<sub>2</sub>) × v<sub>1</sub> = 4 ÷ 6 × 6 = 4 m/s (sağa).",
        "<strong>Kontrol:</strong> Momentum 2 × (−2) + 4 × 4 = −4 + 16 = 12 kg·m/s; kinetik enerji ½ × 2 × 2² + ½ × 4 × 4² = 4 + 32 = 36 J. İkisi de korunmuş."
      ],
      after: [
        "Bu formüllerden iki pratik sonuç çıkar. Eşit kütleli iki cisim esnek çarpışırsa hızlarını değiş tokuş eder: bilardoda düz vuruşta beyaz topun durup hedef topun aynı hızla gitmesi bundandır. Küçük kütleli cisim çok büyük kütleli duran bir cisme esnek çarparsa yaklaşık aynı hızla geri seker; topun duvardan sekmesi gibi. Kısmen esnek çarpışmalar ve iki cismin de hareket ettiği durumlar için [[arac:carpisma-hesapla|Esnek ve Esnek Olmayan Çarpışma Hesaplama]] aracı geri sıçrama katsayısıyla birlikte son hızları ve enerji kaybını hesaplar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Yönü unutmak:</strong> Ters yönlü hızları negatif yazmadan toplamak, çarpışma sorularındaki en yaygın hatadır.",
        "<strong>Birim çevirmemek:</strong> km/sa'yi m/s'ye (3,6'ya bölerek), gramı kilograma çevirmeden hesap yapmak sonucu binlerce kat şaşırtır.",
        "<strong>Enerjiyi her zaman korunur sanmak:</strong> Momentum her çarpışmada korunur, kinetik enerji yalnızca esnek çarpışmada korunur.",
        "<strong>İtmeyi kuvvetle karıştırmak:</strong> İtme kuvvet çarpı süredir; büyük kuvvet kısa süreli olabilir, küçük kuvvet uzun sürede aynı itmeyi verebilir.",
        "<strong>Dış kuvvetleri göz ardı etmek:</strong> Uzun süreli olaylarda (örneğin sürtünmeli zeminde kayma) dış kuvvetler momentumu değiştirir; korunum yalnızca çarpışma anı için kullanılmalıdır."
      ]
    }
  ],
  faq: [
    ["Momentum nedir?", "Momentum, hareket eden bir cismin kütlesi ile hızının çarpımıdır ve cismin hareketinin ne kadar zor durdurulacağını gösterir. Vektörel bir büyüklüktür, yönü hızın yönüyle aynıdır ve birimi kilogram metre bölü saniyedir (kg·m/s)."],
    ["Momentum formülü nedir?", "Momentum formülü p = m · v'dir; m kütleyi kilogram, v hızı metre bölü saniye cinsinden gösterir. Örneğin 20 m/s hızla giden 1.200 kg'lık bir otomobilin momentumu 24.000 kg·m/s'dir. Ters yöndeki hızlar negatif işaretle yazılır."],
    ["İtme ile momentum arasındaki ilişki nedir?", "İtme, kuvvet ile kuvvetin uygulandığı sürenin çarpımıdır ve cismin momentumundaki değişime eşittir: F · Δt = Δp. Bu ilişkiye itme–momentum teoremi denir. İtme ve momentum aynı birimle, newton saniye ya da kg·m/s ile ölçülür."],
    ["Momentumun korunumu ne demek?", "Bir sisteme dış kuvvet etkimiyorsa sistemin toplam momentumu sabit kalır. Çarpışan cisimler birbirine eşit ve zıt itmeler uyguladığı için birinin kazandığı momentumu diğeri kaybeder. Çarpışma, patlama ve geri tepme problemleri bu yasayla çözülür."],
    ["Esnek ve esnek olmayan çarpışma farkı nedir?", "Esnek çarpışmada hem momentum hem kinetik enerji korunur ve cisimler ayrılır. Esnek olmayan çarpışmada momentum korunur ama kinetik enerjinin bir kısmı ısı, ses ve şekil değişimine dönüşür. Cisimler yapışırsa çarpışma tam esnek olmayandır."],
    ["Çarpışma sonrası hızlar nasıl hesaplanır?", "Yapışan cisimlerde momentum korunumundan ortak hız bulunur: v' = (m1v1 + m2v2) ÷ (m1 + m2). Esnek çarpışmada momentum ve kinetik enerji korunumu birlikte kullanılır; duran hedef için v1' = (m1 − m2) ÷ (m1 + m2) × v1 formülü uygulanır."],
    ["Hava yastığı itme ilkesine göre nasıl çalışır?", "Çarpışmada yolcunun momentum değişimi sabittir; hava yastığı ve emniyet kemeri bu değişimin gerçekleştiği süreyi uzatır. Ortalama kuvvet momentum değişiminin süreye bölümü olduğu için süre on katına çıkınca vücuda etkiyen kuvvet onda birine iner."],
    ["Momentumun birimi nedir?", "Momentumun SI birimi kilogram metre bölü saniyedir (kg·m/s). Özel bir adı yoktur. İtmenin birimi newton saniye (N·s) da aynı büyüklüğe eşittir, çünkü 1 newton 1 kg·m/s² olduğundan 1 N·s = 1 kg·m/s eder."],
    ["İtme nasıl hesaplanır?", "Kuvvet ve süre biliniyorsa itme I = F · Δt ile bulunur. Kütle ve hız değişimi biliniyorsa I = m · (v son − v ilk) kullanılır. Örneğin 20 m/s ile gelip 15 m/s ile geri dönen 0,45 kg'lık topun aldığı itmenin büyüklüğü 15,75 N·s'dir."]
  ],
  tools: ["momentum-hesapla", "itme-hesapla", "carpisma-hesapla"],
  related: ["newtonun-hareket-yasalari", "kinetik-ve-potansiyel-enerji", "hiz-yol-zaman-formulu", "egik-atis-formulleri"],
  sources: [
    ["MEB – Ortaöğretim fizik dersi öğretim programı (11. sınıf)", "https://www.meb.gov.tr/"],
    ["ÖSYM – YKS sınav kapsamı", "https://www.osym.gov.tr/"]
  ]
};
