export default {
  slug: "snell-yasasi-isigin-kirilmasi",
  kategori: "bilim",
  tarih: "2026-11-15",
  title: "Snell Yasası Nedir? Işığın Kırılması, Kırılma İndisi ve Sınır Açısı",
  pageTitle: "Snell Yasası: Işığın Kırılması, Kırılma İndisi ve Sınır Açısı",
  description: "Snell yasası n₁·sin θ₁ = n₂·sin θ₂ eşitliğidir. Kırılma açısı hesabı, kırılma indisi, sınır açısı ve tam yansıma; su, cam ve elmas için çözümlü örnekler.",
  keywords: ["snell yasası", "ışığın kırılması", "kırılma indisi", "kırılma açısı hesaplama", "sınır açısı", "tam yansıma", "kırılma 10. sınıf", "kalem suda neden kırık görünür"],
  lead: "Snell yasası, ışık bir ortamdan diğerine geçerken gelme ve kırılma açılarının ortamların kırılma indisleriyle ilişkisini veren <strong>n₁ · sin θ₁ = n₂ · sin θ₂</strong> eşitliğidir; açılar yüzeye değil, yüzeye dik çizilen normale göre ölçülür. Havadan suya 45°'lik açıyla giren ışık, suyun kırılma indisi 1,333 olduğu için normale yaklaşır ve yaklaşık 32,0°'lik açıyla ilerler. Bu sayfada kırılma indisinin anlamını, kırılma açısının adım adım hesaplanmasını, sınır açısını, tam yansımayı ve kalemin suda kırık görünmesi ile elmasın parlaması gibi günlük örnekleri anlatıyoruz.",
  kisaCevap: [
    "Snell yasası: n₁ · sin θ₁ = n₂ · sin θ₂; θ₁ gelme açısı, θ₂ kırılma açısıdır ve ikisi de normale göre ölçülür.",
    "Kırılma indisi n = c / v'dir; ışığın boşluktaki hızının ortamdaki hızına oranıdır ve 1'den küçük olmaz.",
    "Işık az yoğun ortamdan çok yoğun ortama geçerken normale yaklaşır, tersinde normalden uzaklaşır.",
    "Sınır (kritik) açı sin θ<sub>s</sub> = n₂ / n₁ ile bulunur; sudan havaya yaklaşık 48,6°, camdan havaya yaklaşık 41,8°'dir.",
    "Gelme açısı sınır açıyı aşarsa ışık ikinci ortama geçmez, tamamen geri yansır; buna tam yansıma denir.",
    "Tipik kırılma indisleri: hava ≈ 1,000, su 1,333, cam ≈ 1,5, elmas 2,417."
  ],
  figure: {
    alt: "Hava ile su ara yüzeyinde ışığın kırılması: normal çizgisi dikey, ışık havadan 45 derece gelme açısıyla gelip suda 32 derecelik kırılma açısıyla normale yaklaşarak ilerliyor; yanda Snell yasası hesabı.",
    caption: "Hava (n ≈ 1,000) ile su (n = 1,333) sınırında 45°'lik gelme açısı, sin θ₂ = sin 45° / 1,333 ≈ 0,530 verir; kırılma açısı yaklaşık 32,0°'dir. Işığın küçük bir kısmı da aynı açıyla geri yansır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="220" width="500" height="160" class="ps"/>
  <text x="34" y="60" class="b">Hava · n₁ ≈ 1,000</text>
  <text x="34" y="370" class="b p">Su · n₂ = 1,333</text>
  <line x1="20" y1="220" x2="520" y2="220" class="st sw" fill="none"/>
  <line x1="360" y1="50" x2="360" y2="390" class="st dash" fill="none"/>
  <text x="366" y="66" class="sm mu">normal</text>
  <line x1="239.8" y1="99.8" x2="360" y2="220" class="sa sw" fill="none"/>
  <polygon points="300,160 288,154 294,148" class="a"/>
  <line x1="360" y1="220" x2="450.2" y2="364.1" class="sa sw" fill="none"/>
  <line x1="360" y1="220" x2="480.2" y2="99.8" class="sb dash" fill="none"/>
  <text x="430" y="120" class="sm mu">zayıf yansıma</text>
  <path d="M360 160 A60 60 0 0 0 317.6 177.6" class="sp sw" fill="none"/>
  <text x="322" y="152" class="sm b">θ₁ = 45°</text>
  <path d="M360 290 A70 70 0 0 0 397.1 279.4" class="sok sw" fill="none"/>
  <text x="372" y="318" class="sm b ok">θ₂ ≈ 32,0°</text>
  <rect x="540" y="60" width="164" height="300" rx="10" class="sf sb"/>
  <text x="622" y="88" class="b mid">Hesap</text>
  <text x="556" y="118" class="sm">n₁·sin θ₁ = n₂·sin θ₂</text>
  <text x="556" y="146" class="sm">1 × sin 45°</text>
  <text x="556" y="166" class="sm">= 0,7071</text>
  <text x="556" y="196" class="sm">sin θ₂ = 0,7071 / 1,333</text>
  <text x="556" y="216" class="sm">= 0,5305</text>
  <text x="556" y="248" class="b ok">θ₂ ≈ 32,0°</text>
  <line x1="556" y1="266" x2="690" y2="266" class="sb" fill="none"/>
  <text x="556" y="290" class="sm">Sınır açı (su → hava)</text>
  <text x="556" y="312" class="sm">sin θs = 1 / 1,333</text>
  <text x="556" y="338" class="b p">θs ≈ 48,6°</text>
</svg>`
  },
  sections: [
    {
      h: "Işığın kırılması nedir?",
      p: [
        "Işık, havadan suya ya da camdan havaya geçtiği gibi bir ortamdan başka bir ortama geçerken ara yüzeyde doğrultusunu değiştirir. Bu olaya <strong>kırılma</strong> denir. Kırılmanın nedeni, ışığın farklı ortamlarda farklı hızlarda yayılmasıdır: boşlukta saniyede yaklaşık 299.792 km olan ışık hızı suda yaklaşık 225.000 km'ye, camda yaklaşık 200.000 km'ye düşer.",
        "Bunu, beton yoldan çamura eğik açıyla giren bir araba gibi düşünebilirsiniz: çamura önce giren tekerlek yavaşlar, diğeri hâlâ hızlıdır ve araba yön değiştirir. Işık dalgasının ara yüzeye önce ulaşan kısmı da önce yavaşlar ve dalga cephesi döner. Işık yüzeye dik gelirse (gelme açısı 0°) hız yine değişir ama doğrultu değişmez.",
        "Kırılma 10. sınıf fizik müfredatının optik ünitesinde yer alır; mercekler, gözlükler, fotoğraf makineleri, fiber optik kablolar ve gökkuşağı bu olayla açıklanır. Işığın dalga özelliğini, yani dalga boyu ile frekans ilişkisini [[bilgi:dalga-boyu-ve-frekans-iliskisi|dalga boyu ve frekans]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Snell yasası nedir? Formül",
      p: [
        "Snell yasası, 17. yüzyılda Hollandalı bilim insanı Willebrord Snellius'un adıyla anılan kırılma yasasıdır. Yasaya göre birinci ortamın kırılma indisi ile gelme açısının sinüsünün çarpımı, ikinci ortamın kırılma indisi ile kırılma açısının sinüsünün çarpımına eşittir. Gelen ışın, kırılan ışın ve normal aynı düzlemdedir."
      ],
      formula: "n₁ · sin θ₁ = n₂ · sin θ₂\nθ₂ = arcsin( n₁ · sin θ₁ / n₂ )\nAçılar ara yüzeye dik çizilen normale göre ölçülür.",
      after: [
        "Formülden iki kural çıkar. n₂ > n₁ ise (havadan suya) sin θ₂ küçülür ve ışık <strong>normale yaklaşır</strong>. n₂ < n₁ ise (sudan havaya) sin θ₂ büyür ve ışık <strong>normalden uzaklaşır</strong>. İkinci durumda sin θ₂ değeri 1'i aşabilir; bu, ışığın ikinci ortama hiç geçemediği anlamına gelir ve aşağıda anlatılan tam yansımaya yol açar."
      ]
    },
    {
      h: "Kırılma indisi ne anlama gelir?",
      p: [
        "Kırılma indisi (n), ışığın boşluktaki hızının (c) o ortamdaki hızına (v) oranıdır. Bir ortamın kırılma indisi ne kadar büyükse ışık o ortamda o kadar yavaş ilerler ve ortam \"optik olarak daha yoğun\" sayılır. Optik yoğunluk, maddenin kütle yoğunluğuyla aynı şey değildir; örneğin bazı yağlar sudan hafif olduğu hâlde kırılma indisi daha büyüktür."
      ],
      formula: "n = c / v\nc ≈ 299.792.458 m/s (boşlukta ışık hızı)\nSu: v = c / 1,333 ≈ 2,249 × 10⁸ m/s",
      table: {
        head: ["Ortam", "Kırılma indisi (yaklaşık)", "Işığın hızı (km/s, yaklaşık)"],
        rows: [
          ["Boşluk", "1 (tanım gereği)", "299.792"],
          ["Hava (deniz seviyesi)", "1,0003", "299.700"],
          ["Buz", "1,31", "228.900"],
          ["Su", "1,333", "224.900"],
          ["Etil alkol", "1,36", "220.400"],
          ["Pencere camı", "1,50 – 1,52", "yaklaşık 200.000"],
          ["Elmas", "2,417", "124.000"]
        ],
        caption: "Değerler sarı ışık (yaklaşık 589 nm) için verilmiştir; kırılma indisi dalga boyuna göre biraz değişir."
      },
      after: [
        "Kırılma indisinin dalga boyuna bağlı olmasına <strong>dağılma (dispersiyon)</strong> denir. Mor ışık kırmızı ışıktan daha fazla kırılır; prizmanın beyaz ışığı renklerine ayırması ve gökkuşağının oluşması bundandır. Işık hızının ayrıntılarını ve ışık yılı kavramını [[bilgi:isik-yili-nedir-kac-km|ışık yılı]] yazısında bulabilirsiniz."
      ]
    },
    {
      h: "Kırılma açısı nasıl hesaplanır? Çözümlü örnekler",
      ol: [
        "<strong>Havadan suya, 45°:</strong> n₁ = 1,000, n₂ = 1,333. sin θ₂ = 1 × sin 45° / 1,333 = 0,7071 / 1,333 ≈ 0,5305. θ₂ = arcsin(0,5305) ≈ <strong>32,0°</strong>. Işık normale yaklaştı.",
        "<strong>Havadan cama, 30°:</strong> n₂ = 1,5. sin θ₂ = 0,5 / 1,5 ≈ 0,3333 → θ₂ ≈ <strong>19,5°</strong>.",
        "<strong>Sudan havaya, 30°:</strong> sin θ₂ = 1,333 × 0,5 = 0,6665 → θ₂ ≈ <strong>41,8°</strong>. Işık normalden uzaklaştı.",
        "<strong>Camdan suya, 30°:</strong> sin θ₂ = 1,5 × 0,5 / 1,333 ≈ 0,5626 → θ₂ ≈ <strong>34,2°</strong>. İkisi de yoğun ortam olsa da cam daha yoğun olduğu için ışık normalden biraz uzaklaşır.",
        "<strong>Sudan havaya, 60°:</strong> sin θ₂ = 1,333 × 0,866 ≈ 1,154. Sinüs 1'den büyük olamayacağı için kırılan ışın yoktur; ışık tamamen geri yansır."
      ],
      after: [
        "Bu hesapları elle yaparken hesap makinesinin derece modunda olduğundan emin olun; radyan modunda sonuçlar tamamen yanlış çıkar. Sinüs değerleri için [[bilgi:trigonometri-sin-cos-tan-tablosu|trigonometri tablosu]] işinize yarar. Kırılma açısını, sapmayı ve sınır açısını birlikte görmek için [[arac:kirilma-acisi-hesapla|Kırılma Açısı Hesaplama]] aracına iki indisi ve gelme açısını girmeniz yeterlidir."
      ]
    },
    {
      h: "Işık neden sudan havaya geçerken kırılır? Kalemin kırık görünmesi",
      p: [
        "Sudaki bir cisimden çıkan ışık ışınları yüzeyden havaya geçerken normalden uzaklaşır. Gözümüz ise ışığın düz bir çizgi boyunca geldiğini varsayar ve ışınları geriye doğru uzatarak cismi olduğundan daha yukarıda \"görür\". Bardağa daldırılan kalemin su yüzeyinde kırılmış gibi görünmesinin nedeni budur: kalemin sudaki kısmı gerçekte olduğundan daha yukarıda ve daha yakında algılanır.",
        "Aynı etki havuzların olduğundan sığ görünmesine yol açar. Yukarıdan, normale yakın bakıldığında <strong>görünür derinlik ≈ gerçek derinlik / n</strong> olur. Su için 1 / 1,333 ≈ 0,75 olduğundan 2 m derinliğindeki havuz yaklaşık 1,5 m derinliğinde görünür. Eğik açıyla bakıldıkça havuz daha da sığ görünür. Bu yüzden derinliği bilmediğiniz suya atlamak tehlikelidir."
      ],
      note: "Havuz ve gölde suyun gerçek derinliği göründüğünden fazladır. Derinliğini bilmediğiniz suya baş üstü atlamayın."
    },
    {
      h: "Sınır açısı nasıl bulunur, tam yansıma ne zaman olur?",
      p: [
        "Işık optik olarak yoğun ortamdan az yoğun ortama geçerken gelme açısı arttıkça kırılma açısı daha hızlı artar. Kırılma açısının tam 90° olduğu, yani kırılan ışının yüzeyi yalayarak geçtiği gelme açısına <strong>sınır açısı</strong> (kritik açı) denir. Snell yasasında θ₂ = 90° ve sin 90° = 1 yazılarak bulunur."
      ],
      formula: "sin θₛ = n₂ / n₁   (yalnızca n₁ > n₂ iken)\nSu → hava: sin θₛ = 1 / 1,333 ≈ 0,750 → θₛ ≈ 48,6°\nCam → hava: sin θₛ = 1 / 1,5 ≈ 0,667 → θₛ ≈ 41,8°\nElmas → hava: sin θₛ = 1 / 2,417 ≈ 0,414 → θₛ ≈ 24,4°",
      after: [
        "Gelme açısı sınır açıdan büyükse ışık ikinci ortama hiç geçmez ve ayna gibi tamamen geri yansır; buna <strong>tam yansıma</strong> denir. Tam yansıma için iki şart birlikte gerekir: ışık yoğun ortamdan az yoğun ortama gitmeli ve gelme açısı sınır açıyı aşmalıdır. Işık az yoğun ortamdan yoğun ortama geçerken (havadan suya) tam yansıma hiçbir açıda olmaz.",
        "Fiber optik kablolar bu ilkeyle çalışır: ışık, kırılma indisi yüksek çekirdek ile indisi biraz düşük kaplama arasındaki sınırda sürekli tam yansıyarak kilometrelerce ilerler. Dürbün ve periskoplardaki prizmalar, ayna yerine tam yansımayı kullanarak daha parlak görüntü verir. Yaz günlerinde asfaltta görülen \"ıslak yol\" serabı da sıcak hava katmanlarında ışığın kırılıp geri dönmesiyle oluşur."
      ]
    },
    {
      h: "Elmas neden parlar?",
      p: [
        "Elmasın kırılma indisi 2,417 ile doğal malzemeler arasında çok yüksektir; bu yüzden elmastan havaya sınır açısı yalnızca yaklaşık 24,4°'dir. Elmasın içine giren ışık, yüzeylere çoğu zaman bu açıdan daha eğik çarpar ve dışarı çıkamayıp defalarca tam yansır. Taş, ışığın büyük kısmını üst yüzeyden geri gönderecek açılarla kesildiğinde bu yansımalar parlaklık olarak görünür.",
        "Elmasın dağılma gücünün de yüksek olması, beyaz ışığı renklerine ayırarak taşın renkli pırıltılar saçmasına yol açar. Aynı biçimde kesilmiş cam taşlar, cam için sınır açısı yaklaşık 41,8° olduğundan ışığı daha kolay dışarı kaçırır ve elmas kadar parlamaz."
      ]
    },
    {
      h: "Kırılma ile yansıma arasındaki fark",
      p: [
        "Işık iki ortamın sınırına ulaştığında genellikle iki şey birlikte olur: bir kısmı aynı ortama geri döner (<strong>yansıma</strong>), bir kısmı diğer ortama geçer (<strong>kırılma</strong>). Yansımada gelme açısı yansıma açısına eşittir ve ortamların indisi açıyı etkilemez. Kırılmada ise açı, Snell yasasına göre indislerin oranıyla değişir.",
        "Yansıyan ışığın oranı gelme açısına bağlıdır. Durgun bir göle neredeyse dik bakarken suyun dibini görürsünüz, çünkü ışığın büyük kısmı kırılıp geçer. Göle uzaktan, yüzeye çok eğik bakarken ise karşı kıyının yansıması belirginleşir; eğik açılarda yansıyan pay hızla artar. Tam yansıma bu sürecin uç noktasıdır: sınır açısının ötesinde kırılan pay sıfıra iner ve ışığın tamamı yansır.",
        "Snell yasası, ışığın iki nokta arasında en kısa sürede gidilebilecek yolu izlediğini söyleyen Fermat ilkesinden de türetilebilir. Kumsalda koşup sonra yüzerek boğulmakta olan birine ulaşmaya çalışan cankurtaran, düz çizgi yerine kumda biraz daha uzun koşup suda daha kısa yüzdüğü kırık bir yolu seçerse daha erken varır; ışık da yavaş olduğu ortamda daha kısa yol alacak biçimde kırılır."
      ]
    },
    {
      h: "Kırılmanın kullanıldığı yerler: mercekler ve gözlük",
      ul: [
        "<strong>Mercekler:</strong> İnce kenarlı (yakınsak) mercek ışığı odakta toplar, kalın kenarlı (ıraksak) mercek dağıtır. Odak uzaklığı ile görüntü konumu arasındaki ilişki için [[arac:mercek-denklemi-hesapla|Mercek Denklemi Hesaplama]] aracını kullanabilirsiniz.",
        "<strong>Göz ve gözlük:</strong> Gözdeki kornea ve göz merceği ışığı ağ tabakaya odaklar; miyop ve hipermetropta odak kaydığı için gözlük camıyla düzeltilir.",
        "<strong>Gökkuşağı:</strong> Yağmur damlasına giren güneş ışığı kırılır, damlanın arkasından yansır ve çıkarken yeniden kırılır; dağılma renkleri ayırır.",
        "<strong>Fiber optik iletişim:</strong> İnternet altyapısının büyük kısmı, tam yansımayla ışık taşıyan cam liflerle çalışır.",
        "<strong>Atmosferik kırılma:</strong> Güneş ufkun biraz altındayken bile görünür; atmosfer ışığı büker ve gün batımı birkaç dakika uzar."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Açıyı yüzeyden ölçmek:</strong> Gelme ve kırılma açıları her zaman normale göre ölçülür; yüzeyle yapılan açı 90°'den çıkarılmalıdır.",
        "<strong>İndisleri yer değiştirmek:</strong> n₁ ışığın geldiği ortamın, n₂ gittiği ortamın indisidir.",
        "<strong>Her durumda kırılma beklemek:</strong> sin θ₂ hesabı 1'i aşarsa kırılan ışın yoktur, tam yansıma vardır.",
        "<strong>Hesap makinesini radyan modunda kullanmak:</strong> Sinüs ve arksinüs derece modunda alınmalıdır.",
        "<strong>Optik yoğunluğu kütle yoğunluğu sanmak:</strong> Kırılma indisi ışık hızıyla ilgilidir, maddenin ağırlığıyla değil."
      ]
    }
  ],
  faq: [
    ["Snell yasası nedir?", "Snell yasası, ışığın iki ortam arasında kırılmasını tarif eden n₁·sin θ₁ = n₂·sin θ₂ eşitliğidir. Açılar ara yüzeye dik normale göre ölçülür ve ortamların kırılma indisleri, ışığın ne kadar büküleceğini belirler."],
    ["Kırılma açısı nasıl hesaplanır?", "Birinci ortamın kırılma indisi gelme açısının sinüsüyle çarpılır, ikinci ortamın indisine bölünür ve sonucun arksinüsü alınır. Havadan suya 45 derecelik gelişte sin θ₂ ≈ 0,5305 bulunur ve kırılma açısı yaklaşık 32 derece olur."],
    ["Kırılma indisi ne anlama gelir?", "Kırılma indisi, ışığın boşluktaki hızının o ortamdaki hızına oranıdır. Suyun indisi 1,333 olduğu için ışık suda boşluktakinden yaklaşık 1,333 kat yavaş, yani saniyede yaklaşık 225.000 kilometre hızla ilerler."],
    ["Işık neden sudan havaya geçerken kırılır?", "Işık suda havadakinden daha yavaş ilerler; hızın değiştiği sınırda dalga cephesinin bir kısmı önce hızlandığı için doğrultu değişir. Sudan havaya geçerken ışık normalden uzaklaşır ve bu yüzden sudaki cisimler olduklarından yukarıda görünür."],
    ["Sınır açısı nasıl bulunur?", "Sınır açısı, yoğun ortamdan az yoğun ortama geçişte sin θs = n₂ / n₁ formülüyle hesaplanır. Sudan havaya sınır açısı yaklaşık 48,6 derece, camdan havaya 41,8 derece ve elmastan havaya 24,4 derecedir."],
    ["Tam yansıma ne zaman olur?", "Işık kırılma indisi büyük ortamdan küçük ortama giderken gelme açısı sınır açıyı aştığında ikinci ortama geçemez ve tamamen geri yansır. Fiber optik kablolar ve dürbünlerdeki prizmalar bu olaydan yararlanır."],
    ["Kalemin suda kırık görünmesinin nedeni nedir?", "Kalemin sudaki kısmından gelen ışık su yüzeyinde normalden uzaklaşarak kırılır. Göz ışığın düz geldiğini varsaydığı için kalemin sudaki kısmını olduğundan daha yukarıda görür ve kalem yüzeyde kırılmış gibi algılanır."],
    ["Elmas neden parlar?", "Elmasın kırılma indisi 2,417 gibi yüksek bir değer olduğundan havaya sınır açısı yalnızca yaklaşık 24,4 derecedir. İçeri giren ışık defalarca tam yansıyarak üst yüzeyden çıkar; yüksek dağılma da renkli pırıltılar oluşturur."],
    ["Işık yüzeye dik gelirse kırılır mı?", "Işık yüzeye dik geldiğinde, yani gelme açısı sıfır olduğunda doğrultusu değişmez ve kırılmadan düz devam eder. Ancak ikinci ortamda hızı yine değişir; yalnızca yön değişikliği olmadığı için kırılma görülmez."]
  ],
  tools: ["kirilma-acisi-hesapla", "dalga-boyu-frekans-hesapla", "mercek-denklemi-hesapla"],
  related: ["dalga-boyu-ve-frekans-iliskisi", "isik-yili-nedir-kac-km", "trigonometri-sin-cos-tan-tablosu"],
  sources: [
    ["NIST – Işık hızı (fiziksel sabitler)", "https://physics.nist.gov/cuu/Constants/"],
    ["MEB – Ortaöğretim fizik öğretim programı", "https://tymm.meb.gov.tr/"]
  ]
};
