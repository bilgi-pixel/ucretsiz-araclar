export default {
  slug: "geri-odeme-suresi-nedir",
  kategori: "isletme",
  tarih: "2026-11-15",
  title: "Geri Ödeme Süresi Nedir? Yatırım Kendini Kaç Yılda Öder",
  pageTitle: "Geri Ödeme Süresi Nedir, Nasıl Hesaplanır? Örnekli",
  description: "Geri ödeme süresi nedir, nasıl hesaplanır? Eşit ve eşit olmayan nakit akışlarında formül, iskontolu geri ödeme, NBD ile birlikte kullanım ve makine örneği.",
  keywords: ["geri ödeme süresi nedir", "geri ödeme süresi hesaplama", "payback period", "yatırım kaç yılda kendini öder", "iskontolu geri ödeme süresi", "yatırım getirisi", "güneş paneli geri ödeme", "makine yatırımı geri dönüş"],
  lead: "Geri ödeme süresi, <strong>bir yatırımın başlangıç maliyetinin, yatırımdan elde edilen net nakit girişleriyle kaç yılda geri kazanıldığını</strong> gösterir. Nakit girişleri her yıl eşitse hesap tek bir bölmedir: 600.000 TL'lik makine yılda 150.000 TL net nakit sağlıyorsa 600.000 ÷ 150.000 = 4 yılda kendini öder. Girişler yıldan yıla değişiyorsa kümülatif toplam izlenir. Paranın zaman değerini hesaba katan iskontolu geri ödeme süresi ise daha uzun ve daha gerçekçi sonuç verir. Bu yazıda her iki yöntemi, eksiklerini ve net bugünkü değerle birlikte kullanımını örneklerle anlatıyoruz.",
  kisaCevap: [
    "Eşit nakit akışında: geri ödeme süresi = yatırım tutarı ÷ yıllık net nakit girişi.",
    "Eşit olmayan akışta: kümülatif nakit yatırımı geçene kadar yıllar sayılır, kalan tutar o yılın girişine bölünerek kesirli yıl eklenir.",
    "İskontolu geri ödeme süresinde her yılın girişi önce (1 + r)ⁿ'e bölünerek bugüne indirgenir; sonuç her zaman basit süreden uzundur.",
    "Geri ödeme süresi kısa olan yatırım daha az risklidir ama geri ödemeden sonraki kazançları göstermez.",
    "Kârlılığı ölçmek için net bugünkü değer (NBD) ya da iç verim oranıyla birlikte kullanılmalıdır.",
    "Nakit girişi kâr değil, nakit olarak hesaplanır: amortisman gibi nakit çıkışı olmayan giderler geri eklenir."
  ],
  figure: {
    alt: "500.000 TL'lik yatırımın kümülatif nakit akışı çizgisi: yıllık 100, 150, 200 ve 250 bin TL girişlerle 3,2 yılda sıfır çizgisini geçiyor; yüzde 10 iskontolu çizgi 3,79 yılda geçiyor.",
    caption: "Başlangıçta −500.000 TL olan kümülatif bakiye, yıllık girişlerle yükselir. Basit hesapta sıfır çizgisi 3,2 yılda, %10 iskontolu hesapta yaklaşık 3,79 yılda geçilir.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Yatırım kaç yılda kendini öder?</text>
  <line x1="90" y1="60" x2="90" y2="360" class="st" fill="none"/>
  <line x1="90" y1="160" x2="660" y2="160" class="st sw" fill="none"/>
  <text x="82" y="164" class="sm end b">0</text>
  <text x="82" y="84" class="sm end">+200 bin</text>
  <text x="82" y="244" class="sm end">−200 bin</text>
  <text x="82" y="324" class="sm end">−400 bin</text>
  <text x="82" y="364" class="sm end">−500 bin</text>
  <line x1="90" y1="80" x2="660" y2="80" class="sb dash" fill="none"/>
  <line x1="90" y1="240" x2="660" y2="240" class="sb dash" fill="none"/>
  <line x1="90" y1="320" x2="660" y2="320" class="sb dash" fill="none"/>
  <g class="sm mid">
    <text x="90" y="384">0</text><text x="220" y="384">1</text><text x="350" y="384">2</text><text x="480" y="384">3</text><text x="610" y="384">4. yıl</text>
  </g>
  <polyline points="90,360 220,320 350,260 480,180 610,80" class="sp sw" fill="none"/>
  <polyline points="90,360 220,324 350,274 480,214 610,146" class="sa sw dash" fill="none"/>
  <circle cx="90" cy="360" r="5" class="dg"/>
  <circle cx="480" cy="180" r="5" class="p"/>
  <circle cx="610" cy="80" r="5" class="p"/>
  <text x="472" y="196" class="sm end">−50 bin</text>
  <text x="602" y="72" class="sm end">+200 bin</text>
  <circle cx="506" cy="160" r="7" class="ok"/>
  <text x="500" y="146" class="sm b ok end">Basit: 3,2 yıl</text>
  <circle cx="583" cy="160" r="7" class="a"/>
  <text x="590" y="182" class="sm b">İskontolu %10: 3,79 yıl</text>
  <rect x="110" y="86" width="270" height="66" rx="8" class="sf sb"/>
  <text x="124" y="106" class="sm b">Yatırım 500.000 TL</text>
  <text x="124" y="125" class="sm">Girişler: 100 · 150 · 200 · 250 bin</text>
  <text x="124" y="144" class="sm">3 yılda 450 bin; 50 ÷ 250 = 0,2 yıl</text>
  <text x="360" y="412" class="sm mid t2">Düz çizgi: basit kümülatif · kesikli çizgi: %10 ile bugüne indirgenmiş kümülatif</text>
</svg>`
  },
  sections: [
    {
      h: "Geri ödeme süresi nedir?",
      p: [
        "Geri ödeme süresi (İngilizcede payback period), bir yatırım için harcanan paranın, yatırımın ürettiği net nakitle ne kadar sürede geri döneceğini gösteren basit bir yatırım değerlendirme ölçüsüdür. Bir kafenin kahve makinesi, bir atölyenin CNC tezgâhı, bir evin güneş paneli ya da bir şirketin yeni yazılımı için aynı soru sorulur: \"Bu para kaç yılda geri gelir?\"",
        "Yöntemin en büyük avantajı anlaşılır olmasıdır. Finans bilgisi olmayan biri bile \"4 yılda kendini öder\" cümlesini kolayca yorumlar. Bu yüzden KOSGEB ve kalkınma ajansı destek başvurularında, banka kredi dosyalarında ve iş planlarında sıkça istenir. Ancak basitliği aynı zamanda zayıflığıdır; neyi göstermediğini bilmek de en az hesap kadar önemlidir."
      ]
    },
    {
      h: "Geri ödeme süresi nasıl hesaplanır? Eşit nakit akışı",
      p: [
        "Yatırım her yıl yaklaşık aynı net nakit girişini sağlıyorsa formül tek bir bölmedir. Net nakit girişi; yatırımın sağladığı ek gelir ya da tasarruftan, yatırımın doğurduğu ek giderlerin (bakım, enerji, personel, vergi) çıkarılmasıyla bulunur."
      ],
      formula: "Geri ödeme süresi (yıl) = başlangıç yatırımı ÷ yıllık net nakit girişi\nÖrnek: 600.000 TL ÷ 150.000 TL/yıl = 4 yıl\nKesirli sonuç: 0,4 yıl × 12 = 4,8 ay",
      after: [
        "<strong>Makine örneği:</strong> Bir mobilya atölyesi 600.000 TL'ye yeni bir kesim makinesi alıyor. Makine yılda 220.000 TL ek satış ya da işçilik tasarrufu sağlıyor, bakım ve enerji için yılda 70.000 TL ek gider yaratıyor. Yıllık net nakit girişi 220.000 − 70.000 = 150.000 TL'dir ve makine 600.000 ÷ 150.000 = 4 yılda kendini öder. Net giriş 160.000 TL olsaydı süre 3,75 yıl, yani 3 yıl 9 ay olurdu. Tutarlar örnektir."
      ]
    },
    {
      h: "Nakit akışları eşit değilse nasıl hesaplanır?",
      p: [
        "Çoğu yatırım ilk yıllarda düşük, sonra artan nakit üretir: yeni açılan bir şubenin müşteri tabanı zamanla büyür. Bu durumda yıllık girişler kümülatif olarak toplanır ve toplamın yatırımı geçtiği yıl bulunur."
      ],
      ol: [
        "Yatırım 500.000 TL; yıllık net girişler sırasıyla 100.000, 150.000, 200.000 ve 250.000 TL.",
        "Kümülatif toplamı yazın: 1. yıl 100.000, 2. yıl 250.000, 3. yıl 450.000, 4. yıl 700.000 TL.",
        "Yatırımın geçildiği yılı bulun: 3. yıl sonunda 450.000 TL toplanmış, 4. yıl içinde 500.000 TL aşılıyor.",
        "Kalanı hesaplayın: 500.000 − 450.000 = 50.000 TL.",
        "Kesirli yılı bulun: 50.000 ÷ 250.000 = 0,2 yıl. Geri ödeme süresi 3 + 0,2 = 3,2 yıl, yaklaşık 3 yıl 2 ay."
      ],
      after: [
        "Kesirli yıl hesabı, o yılın nakdinin yıl boyunca eşit dağıldığını varsayar. Gelir mevsimselse (örneğin yazın yoğunlaşıyorsa) gerçek geri ödeme anı birkaç ay önce ya da sonra olabilir; daha hassas sonuç için aylık nakit akışıyla çalışın."
      ],
      table: {
        head: ["Yıl", "Net nakit girişi", "Kümülatif", "Kalan yatırım"],
        rows: [
          ["0", "−500.000 TL", "−500.000 TL", "500.000 TL"],
          ["1", "100.000 TL", "−400.000 TL", "400.000 TL"],
          ["2", "150.000 TL", "−250.000 TL", "250.000 TL"],
          ["3", "200.000 TL", "−50.000 TL", "50.000 TL"],
          ["4", "250.000 TL", "+200.000 TL", "Geri ödendi (3,2. yıl)"]
        ]
      }
    },
    {
      h: "İskontolu geri ödeme süresi nedir?",
      p: [
        "Basit geri ödeme süresi, 4. yıl alınan 250.000 TL'yi bugünkü 250.000 TL ile aynı sayar. Oysa enflasyon, faiz ve risk nedeniyle gelecekteki para bugünkünden daha az değerlidir. İskontolu geri ödeme süresi, her yılın nakdini önce bir iskonto oranıyla bugüne indirger, sonra aynı kümülatif yöntemi uygular. İskonto oranı genellikle sermayenin maliyeti, yani paranızı başka güvenli bir yere yatırsanız alacağınız getiri ya da kredi faizi olarak seçilir."
      ],
      formula: "Bugünkü değer = nakit girişi ÷ (1 + r)ⁿ\nr = %10: 100.000 ÷ 1,10 = 90.909 · 150.000 ÷ 1,21 = 123.967\n200.000 ÷ 1,331 = 150.263 · 250.000 ÷ 1,4641 = 170.753\nKümülatif: 90.909 → 214.876 → 365.139 → 535.892 TL\nİskontolu süre = 3 + (500.000 − 365.139) ÷ 170.753 ≈ 3,79 yıl",
      after: [
        "Aynı yatırım %10 iskontoyla 3,2 yıl yerine yaklaşık 3,79 yılda, yani 3 yıl 9,5 ay civarında kendini öder. İskonto oranı yükseldikçe süre uzar; oran yeterince yüksekse yatırım verilen süre içinde hiç geri dönmeyebilir. Bu hesabı [[arac:geri-odeme-suresi-hesapla|Geri Ödeme Süresi Hesaplama]] aracı her iki yöntemle aynı anda yapar."
      ]
    },
    {
      h: "Geri ödeme süresinin eksik yönleri",
      ul: [
        "<strong>Geri ödemeden sonrasını görmez:</strong> 3 yılda kendini ödeyip duran bir yatırım ile 4 yılda ödeyip 15 yıl kazandıran bir yatırım arasında ilkini seçtirebilir.",
        "<strong>Basit hali paranın zaman değerini yok sayar:</strong> Bu eksik iskontolu yöntemle giderilir, ama yine de geri ödeme sonrası nakit dikkate alınmaz.",
        "<strong>Kârlılık ölçüsü değildir:</strong> Kısa geri ödeme süresi yüksek getiri anlamına gelmez; yalnızca paranın ne kadar sürede riskte kaldığını gösterir.",
        "<strong>Kabul sınırı keyfidir:</strong> \"3 yıldan kısa olsun\" gibi eşikler sektöre ve yönetimin risk iştahına göre seçilir.",
        "<strong>Hurda değeri ve yenileme yatırımlarını içermez:</strong> Makinenin ömür sonunda satış değeri ya da ara dönem büyük bakımları ayrıca değerlendirilmelidir."
      ],
      after: [
        "Bu nedenlerle geri ödeme süresi bir eleme ve risk ölçüsü olarak kullanılmalı, son karar daha kapsamlı yöntemlere bırakılmalıdır."
      ]
    },
    {
      h: "NBD ile geri ödeme süresi nasıl birlikte kullanılır?",
      p: [
        "Net bugünkü değer (NBD), yatırımın ömrü boyunca üreteceği tüm nakit girişlerinin bugünkü değeri ile başlangıç yatırımı arasındaki farktır. NBD sıfırdan büyükse yatırım, seçilen iskonto oranından fazla kazandırır. Örneğimizde 4 yıllık indirgenmiş girişlerin toplamı 535.892 TL, yatırım 500.000 TL olduğu için NBD yaklaşık +35.892 TL'dir; yatırım %10 beklentiyi karşılar.",
        "Pratik bir karar akışı şöyledir: önce geri ödeme süresiyle riskli projeleri eleyin (örneğin makinenin ekonomik ömründen uzun süre geri dönen projeler), sonra kalanları NBD ve iç verim oranıyla sıralayın. İki ölçü çelişirse, nakit sıkıntısı yaşayan bir işletme kısa geri ödemeyi, nakdi güçlü bir işletme yüksek NBD'yi öne alabilir. Yöntemin ayrıntısı [[bilgi:net-bugunku-deger-ve-ic-verim-orani|net bugünkü değer ve iç verim oranı]] yazısındadır; hesap için [[arac:net-bugunku-deger-hesapla|Net Bugünkü Değer Hesaplama]] aracını kullanabilirsiniz."
      ]
    },
    {
      h: "Güneş paneli ve ev yatırımlarında geri ödeme",
      p: [
        "Bireysel yatırımlarda da aynı mantık geçerlidir. Bir çatıya 250.000 TL'lik güneş enerjisi sistemi kuruluyor ve sistem elektrik faturasında yılda 50.000 TL tasarruf sağlıyorsa basit geri ödeme süresi 250.000 ÷ 50.000 = 5 yıldır. Elektrik fiyatları her yıl artarsa tasarruf da artar ve süre kısalır; panel verimi yıllar içinde azalırsa süre uzar. İnvertör değişimi gibi ara yatırımları da hesaba katmak gerekir. Sistemin kaç watt olması gerektiğini [[bilgi:gunes-paneli-kac-watt-gerekir|güneş paneli kaç watt gerekir]] yazısında, tahmini üretimi [[arac:gunes-paneli-hesapla|Güneş Paneli Hesaplama]] aracında bulabilirsiniz.",
        "Bir ev satın alıp kiraya vermek de bir geri ödeme sorusudur; bu durumda genellikle \"amorti süresi\" ifadesi kullanılır. Ev fiyatının yıllık net kiraya bölünmesiyle bulunan süre [[bilgi:ev-kac-yilda-amorti-eder|ev kaç yılda amorti eder]] yazısında ayrıntılı anlatılır."
      ]
    },
    {
      h: "Kabul edilebilir geri ödeme süresi kaç yıldır?",
      p: [
        "Herkes için geçerli tek bir sınır yoktur. Teknoloji gibi hızlı eskiyen yatırımlarda 1–3 yıl beklenirken, bina, enerji santrali ya da altyapı yatırımlarında 8–15 yıl normal kabul edilebilir. Temel kural, <strong>geri ödeme süresinin yatırımın ekonomik ömründen belirgin biçimde kısa olması</strong>dır. 5 yıl dayanacak bir makinenin 6 yılda kendini ödemesi, yatırımın hiçbir zaman kâra geçmeyeceği anlamına gelir.",
        "İşletmeler eşik belirlerken nakit durumunu, finansman maliyetini ve belirsizliği hesaba katar. Belirsizlik yüksekse kısa süre tercih edilir, çünkü uzak yılların tahminleri daha az güvenilirdir. Yatırımın genel getirisini oran olarak görmek için [[arac:yatirim-getirisi-hesapla|Yatırım Getirisi Hesaplama]] aracı da kullanılabilir."
      ]
    },
    {
      h: "Hesaplarken sık yapılan hatalar",
      ul: [
        "<strong>Brüt geliri kullanmak:</strong> Yatırımın yarattığı ek giderler düşülmezse süre olduğundan kısa görünür.",
        "<strong>Kâr ile nakdi karıştırmak:</strong> Muhasebe kârından amortisman düşülmüştür; nakit akışında amortisman geri eklenir. Ayrıntı için [[bilgi:amortisman-nasil-hesaplanir|amortisman]] yazısına bakın.",
        "<strong>İşletme sermayesini unutmak:</strong> Yeni bir şube için stok ve kasa ihtiyacı da başlangıç yatırımının parçasıdır.",
        "<strong>Vergiyi atlamak:</strong> Kazanç arttıkça vergi de artar; net nakit vergi sonrası hesaplanmalıdır.",
        "<strong>İyimser tahmin:</strong> Satış artışı tahminlerini kötümser, beklenen ve iyimser olmak üzere üç senaryoyla deneyin."
      ]
    }
  ],
  faq: [
    ["Geri ödeme süresi nedir?", "Geri ödeme süresi, bir yatırımın başlangıç maliyetinin yatırımdan elde edilen net nakit girişleriyle kaç yılda geri kazanıldığını gösteren ölçüdür. Yatırımın ne kadar süre riskte kaldığını anlamak için kullanılır."],
    ["Geri ödeme süresi nasıl hesaplanır?", "Yıllık nakit girişi eşitse yatırım tutarı yıllık net nakit girişine bölünür. 600.000 TL'lik ve yılda 150.000 TL net nakit sağlayan bir makine 600.000 ÷ 150.000 = 4 yılda kendini öder."],
    ["Nakit akışları eşit değilse nasıl hesaplanır?", "Yıllık girişler kümülatif olarak toplanır ve toplamın yatırımı geçtiği yıl bulunur. Önceki yıl sonunda kalan tutar o yılın girişine bölünerek kesirli yıl eklenir; 500.000 TL örneğinde sonuç 3,2 yıldır."],
    ["İskontolu geri ödeme süresi nedir?", "Her yılın nakit girişinin bir iskonto oranıyla bugüne indirgendikten sonra kümülatif toplandığı geri ödeme süresidir. Paranın zaman değerini hesaba kattığı için sonuç her zaman basit geri ödeme süresinden uzundur."],
    ["Geri ödeme süresinin eksik yönleri nelerdir?", "Geri ödemeden sonraki nakit akışlarını dikkate almaz, basit hali paranın zaman değerini yok sayar ve kârlılığı ölçmez. Bu yüzden bir eleme ve risk ölçüsü olarak kullanılmalı, son karar NBD gibi yöntemlerle verilmelidir."],
    ["NBD ile geri ödeme süresi nasıl birlikte kullanılır?", "Önce geri ödeme süresiyle ekonomik ömrüne göre çok geç dönen riskli projeler elenir, sonra kalan projeler net bugünkü değer ve iç verim oranıyla sıralanır. NBD sıfırdan büyükse yatırım beklenen getiriyi aşar."],
    ["Makine yatırımı kaç yılda kendini öder?", "Makinenin fiyatı, sağladığı yıllık ek gelir ya da tasarruftan bakım ve enerji gibi ek giderler düşülerek bulunan net nakde bölünür. Örnekte 600.000 TL'lik makine yılda 150.000 TL net nakitle 4 yılda kendini öder."],
    ["Kabul edilebilir geri ödeme süresi kaç yıldır?", "Tek bir sınır yoktur; teknoloji yatırımlarında 1–3 yıl, altyapı ve enerji yatırımlarında 8–15 yıl normal sayılabilir. Temel kural, geri ödeme süresinin yatırımın ekonomik ömründen belirgin biçimde kısa olmasıdır."],
    ["Güneş paneli kaç yılda kendini öder?", "Kurulum maliyeti yıllık elektrik tasarrufuna bölünerek bulunur. 250.000 TL'lik sistem yılda 50.000 TL tasarruf sağlıyorsa süre 5 yıldır; elektrik fiyat artışları süreyi kısaltır, panel verim kaybı ve ara bakımlar uzatır."]
  ],
  tools: ["geri-odeme-suresi-hesapla", "net-bugunku-deger-hesapla", "yatirim-getirisi-hesapla", "gunes-paneli-hesapla"],
  related: ["net-bugunku-deger-ve-ic-verim-orani", "amortisman-nasil-hesaplanir", "ev-kac-yilda-amorti-eder", "gunes-paneli-kac-watt-gerekir", "basabas-noktasi-nedir"]
};
