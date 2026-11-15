export default {
  slug: "gunes-paneli-kac-watt-gerekir",
  kategori: "teknoloji",
  tarih: "2026-11-15",
  title: "Ev İçin Kaç Watt Güneş Paneli Gerekir? Panel, Akü ve İnverter Hesabı",
  pageTitle: "Ev İçin Kaç Watt Güneş Paneli Gerekir? Panel ve Akü Hesabı",
  description: "Gereken panel gücü = günlük tüketim ÷ (güneş saati × verim). Aylık 300 kWh için yaklaşık 2,8 kWp. Bağ evi, akü Ah ve inverter seçimi çözümlü örnekle.",
  keywords: ["güneş paneli hesaplama", "ev için kaç watt güneş paneli", "güneş paneli günde kaç kwh üretir", "bağ evi güneş enerjisi", "akü kapasitesi hesaplama", "inverter seçimi", "güneş paneli kaç yılda amorti eder", "panel açısı"],
  lead: "Ev için gereken güneş paneli gücü, <strong>günlük tüketiminizin (kWh) günlük eşdeğer güneş saati ile sistem veriminin çarpımına bölünmesiyle</strong> bulunur. Aylık 300 kWh (günde 10 kWh) tüketen bir ev, 4,5 saatlik eşdeğer güneş ve %20 kayıpla yaklaşık 10 ÷ (4,5 × 0,8) ≈ 2,8 kWp kurulu güce ihtiyaç duyar; bu da 450 W'lık panellerden 7 adet eder. Bu sayfada formülün mantığını, Türkiye'nin güneş potansiyelini, bağ evi gibi şebekeden bağımsız sistemlerde akü ve inverter seçimini, panel açısını, bulutlu havayı ve geri ödeme süresini çözümlü örneklerle bulacaksınız.",
  kisaCevap: [
    "Gereken kurulu güç (kWp) = günlük tüketim (kWh) ÷ [eşdeğer güneş saati × (1 − kayıp oranı)].",
    "1 kWp panel, günlük 4,5 eşdeğer güneş saati ve %20 kayıpla günde yaklaşık 3,6 kWh, yılda yaklaşık 1.300 kWh üretir.",
    "Türkiye'de yıllık toplam güneşlenme süresi 2.741 saat, yıllık güneş ışınımı yaklaşık 1.527 kWh/m²'dir; bu, günlük ortalama 4,2 kWh/m²'ye karşılık gelir.",
    "Akü kapasitesi (Ah) = günlük tüketim (Wh) × yedek gün ÷ (akü gerilimi × deşarj derinliği × inverter verimi).",
    "İnverter gücü, aynı anda çalışacak cihazların toplamından ve motorlu cihazların kalkış akımından büyük seçilir.",
    "Geri ödeme süresi = toplam yatırım ÷ yıllık kazanç; fiyat ve tarifeler değiştiği için güncel tutarlarla hesaplanmalıdır."
  ],
  figure: {
    alt: "Güneş enerjisi sistemi akış şeması: güneş, panel dizisi, şarj kontrol cihazı, akü ve inverter üzerinden ev cihazlarına; altında aylık 300 kilowattsaat tüketim için 2,8 kWp ve 7 panel hesabı.",
    caption: "Şebekeden bağımsız bir sistemde enerji panelden şarj kontrol cihazı üzerinden aküye, oradan inverterle 230 V'a çevrilerek cihazlara ulaşır. Şebekeye bağlı sistemlerde akü çoğu zaman bulunmaz. Alttaki kart, metindeki ev örneğinin hesabıdır.",
    svg: `<svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="p"/></marker></defs>
  <text x="360" y="28" class="lg b mid">Güneşten prize enerji yolu</text>
  <circle cx="70" cy="110" r="34" class="y"/>
  <text x="70" y="116" class="sm b mid">Güneş</text>
  <polygon points="140,140 240,140 260,80 160,80" class="ps"/>
  <polygon points="140,140 240,140 260,80 160,80" class="sp" fill="none"/>
  <line x1="190" y1="80" x2="170" y2="140" class="sp" fill="none"/><line x1="225" y1="80" x2="205" y2="140" class="sp" fill="none"/>
  <text x="200" y="164" class="sm b mid">Panel dizisi</text>
  <rect x="300" y="86" width="110" height="56" rx="8" class="sf sb"/>
  <text x="355" y="110" class="sm b mid">Şarj kontrol</text><text x="355" y="128" class="sm mid">cihazı</text>
  <rect x="300" y="190" width="110" height="56" rx="8" class="oks"/>
  <text x="355" y="214" class="sm b mid">Akü</text><text x="355" y="232" class="sm mid">24 V · 100 Ah</text>
  <rect x="450" y="86" width="110" height="56" rx="8" class="p"/>
  <text x="505" y="110" class="sm b mid sf">İnverter</text><text x="505" y="128" class="sm mid sf">DC → 230 V</text>
  <rect x="600" y="86" width="100" height="56" rx="8" class="sf sb"/>
  <text x="650" y="118" class="sm b mid">Ev cihazları</text>
  <line x1="108" y1="110" x2="150" y2="110" class="sa" fill="none" marker-end="url(#ok)"/>
  <line x1="262" y1="112" x2="296" y2="112" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="355" y1="144" x2="355" y2="186" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="412" y1="216" x2="460" y2="146" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <line x1="562" y1="114" x2="596" y2="114" class="sp sw" fill="none" marker-end="url(#ok)"/>
  <rect x="30" y="276" width="660" height="128" rx="10" class="sf sb"/>
  <rect x="30" y="276" width="8" height="128" class="p"/>
  <text x="54" y="304" class="b">Örnek ev: aylık 300 kWh → günde 10 kWh</text>
  <text x="54" y="332" class="sm">Eşdeğer güneş 4,5 saat · kayıp %20 → 10 ÷ (4,5 × 0,8) = 2,78 kWp</text>
  <text x="54" y="356" class="sm">450 W panel: 2.780 ÷ 450 = 6,2 → 7 panel = 3,15 kWp</text>
  <text x="54" y="384" class="sm b p">Tahmini üretim: 3,15 × 4,5 × 0,8 ≈ 11,3 kWh/gün · ≈ 4.140 kWh/yıl</text>
</svg>`
  },
  sections: [
    {
      h: "Güneş paneli gücü neye göre hesaplanır?",
      p: [
        "Bir güneş paneli sisteminin boyutu üç soruyla belirlenir: Ne kadar elektrik tüketiyorsunuz, bulunduğunuz yerde panellere ne kadar güneş enerjisi düşüyor ve sistemin kablolardan inverter verimine kadar toplam kaybı ne kadar? Panel sayısı, akü kapasitesi ve inverter gücü bu üç sorunun cevabından türetilir.",
        "Panel güçleri <strong>Wp</strong> (watt-peak) ile verilir. Bu değer, panelin standart test koşullarında (metrekareye 1.000 W ışınım, 25 °C hücre sıcaklığı) üreteceği güçtür. Gerçek hayatta güneş gün boyu farklı açılarla gelir, bulut ve sıcaklık verimi düşürür. Bu yüzden hesapta saatlik değil, <strong>günlük eşdeğer güneş saati</strong> kullanılır: günlük toplam ışınımın, metrekareye 1.000 W'lık tam güneşte kaç saate eşdeğer olduğu."
      ],
      formula: "Günlük tüketim (kWh) = aylık tüketim ÷ 30\nGereken kurulu güç (kWp) = günlük tüketim ÷ [eşdeğer güneş saati × (1 − kayıp)]\nPanel sayısı = kurulu güç (W) ÷ tek panel gücü (W), yukarı yuvarlanır\nGünlük üretim (kWh) = kurulu güç (kWp) × eşdeğer güneş saati × (1 − kayıp)"
    },
    {
      h: "Türkiye'de güneş potansiyeli ve eşdeğer güneş saati",
      p: [
        "Enerji ve Tabiat Kaynakları Bakanlığı'nın güneş enerjisi potansiyel atlasına göre Türkiye'de yıllık toplam güneşlenme süresi 2.741 saat, yıllık toplam güneş ışınımı ise yaklaşık 1.527 kWh/m²'dir. Bu ışınım değeri günlük ortalama yaklaşık 4,2 kWh/m²'ye, yani yatay düzlemde ortalama 4,2 eşdeğer güneş saatine karşılık gelir. Güneye bakan ve uygun açıyla eğilmiş panellerde bu değer biraz artar.",
        "Güneşlenme süresi ile eşdeğer güneş saati aynı şey değildir. Güneşin göründüğü 7,5 saatin tamamında panel tam güç üretmez; sabah ve akşam saatlerinde ışınım düşüktür. Hesaplarda bu yüzden güneşlenme süresi değil, ışınımdan türetilen eşdeğer saat kullanılır.",
        "Değer bölgeye ve mevsime göre büyük fark gösterir. Akdeniz ve Güneydoğu Anadolu'da yıllık ortalama yüksekken Karadeniz kıyısında daha düşüktür. Yaz aylarında günlük eşdeğer saat 6–7'ye çıkabilirken aralık ve ocakta 2'nin altına düşebilir. Şebekeye bağlı sistemlerde yıllık ortalama, akülü sistemlerde ise en zayıf ay esas alınarak hesap yapılır. Bulunduğunuz yerin değerini Bakanlığın güneş enerjisi potansiyel atlasından öğrenebilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek 1: şebekeye bağlı bir ev",
      ol: [
        "Faturanızdan yıllık tüketimi bulup 12'ye bölün: örnek evde aylık ortalama 300 kWh. Günlük tüketim 300 ÷ 30 = 10 kWh.",
        "Bölgeniz için yıllık ortalama eşdeğer güneş saatini seçin: örnek olarak 4,5 saat.",
        "Sistem kaybını belirleyin: kablo, inverter, sıcaklık, toz ve gölgelenme kayıpları toplamda genellikle %15–25 arasında kabul edilir; örnekte %20.",
        "Kurulu gücü hesaplayın: 10 ÷ (4,5 × 0,8) = 2,78 kWp.",
        "Panel sayısını bulun: 450 W'lık panellerle 2.780 ÷ 450 = 6,2; yukarı yuvarlayınca 7 panel, yani 3,15 kWp.",
        "Üretimi kontrol edin: 3,15 × 4,5 × 0,8 ≈ 11,3 kWh/gün, yılda yaklaşık 4.140 kWh. Bu, ortalama tüketimi biraz aşar."
      ],
      after: [
        "Şebekeye bağlı sistemde yazın üretilen fazla enerji şebekeye verilir, kışın eksik kalan şebekeden alınır. Bu nedenle aylık dengeye değil, yıllık toplama bakmak yeterlidir. Kendi değerlerinizle [[arac:gunes-paneli-hesapla|güneş paneli hesaplama aracı]] panel sayısını, kurulu gücü ve aylık ile yıllık üretimi verir. Tüketiminizi henüz bilmiyorsanız [[arac:elektrik-tuketim-hesapla|elektrik tüketim hesaplama aracı]]yla cihaz cihaz hesaplayabilirsiniz."
      ]
    },
    {
      h: "Çözümlü örnek 2: bağ evi için şebekeden bağımsız sistem",
      p: [
        "Şebekenin olmadığı bir bağ evinde sistem akülüdür ve en zayıf güneş döneminde de yetmesi gerekir. Önce günlük enerji ihtiyacı cihaz cihaz watt-saat olarak çıkarılır."
      ],
      table: {
        head: ["Cihaz", "Güç", "Günlük kullanım", "Günlük enerji"],
        rows: [
          ["LED lambalar (5 adet)", "10 W", "5 saat", "250 Wh"],
          ["Buzdolabı", "Etiket değerine göre", "Gün boyu", "800 Wh (örnek)"],
          ["Televizyon", "80 W", "4 saat", "320 Wh"],
          ["Telefon şarjı (2 adet)", "15 Wh", "Günde 1 kez", "30 Wh"],
          ["Su pompası", "400 W", "30 dakika", "200 Wh"],
          ["Toplam", "", "", "1.600 Wh"]
        ],
        caption: "Buzdolabının günlük tüketimi için etiketindeki yıllık kWh değerini 365'e bölebilirsiniz."
      },
      ol: [
        "Panel: Kış için örnek 2,5 eşdeğer güneş saati ve %25 kayıpla 1.600 ÷ (2,5 × 0,75) ≈ 853 W. 450 W'lık panellerden 2 adet (900 W) yeterlidir.",
        "Akü: 1 günlük yedek, 24 V sistem, %80 deşarj derinliği (lityum demir fosfat için yaygın) ve %90 inverter verimiyle 1.600 ÷ (24 × 0,8 × 0,9) ≈ 93 Ah; 24 V 100 Ah bir akü grubu seçilir.",
        "Aynı hesap %50 deşarj derinliğiyle kullanılması önerilen kurşun-asit akülerle yapılırsa 1.600 ÷ (24 × 0,5 × 0,9) ≈ 148 Ah, yani yaklaşık 150 Ah gerekir.",
        "İnverter: aynı anda çalışabilecek yük buzdolabı, pompa, televizyon ve lambalar için yaklaşık 700 W'tır; buzdolabı ve pompanın kalkış akımı birkaç kat yüksek olabileceğinden 1.000–1.500 W'lık tam sinüs bir inverter uygun olur."
      ],
      after: [
        "Akünün belirli bir yükü kaç saat besleyeceğini [[arac:aku-kullanim-suresi-hesapla|akü kullanım süresi hesaplama aracı]]yla kontrol edebilirsiniz. Birden fazla bulutlu gün için yedek istiyorsanız akü kapasitesini yedek gün sayısıyla çarpın."
      ]
    },
    {
      h: "Kaç amper akü ve hangi güçte inverter gerekir?",
      formula: "Akü kapasitesi (Ah) = günlük tüketim (Wh) × yedek gün ÷ (akü gerilimi × deşarj derinliği × inverter verimi)\nAkü enerjisi (Wh) = Ah × V · Örnek: 24 V × 100 Ah = 2.400 Wh",
      p: [
        "Aynı enerji, daha yüksek akü geriliminde daha az amperle taşınır. 1.600 Wh'lik bir ihtiyaç için 12 V sistemde yaklaşık 185 Ah, 24 V sistemde 93 Ah, 48 V sistemde 46 Ah akü gerekir. Düşük amper daha ince kablo ve daha az kayıp demektir; bu yüzden birkaç yüz wattın üzerindeki sistemlerde 24 V ya da 48 V tercih edilir.",
        "İnverter seçiminde iki değer önemlidir: sürekli güç ve kısa süreli tepe (kalkış) gücü. Buzdolabı, pompa ve kompresör gibi motorlu cihazlar çalışmaya başlarken çalışma gücünün birkaç katını kısa süre çekebilir. Ayrıca motorlu cihazlar ve hassas elektronikler için <strong>tam sinüs</strong> çıkışlı inverterler önerilir. Watt ve amper ilişkisinin ayrıntıları [[bilgi:watt-amper-volt-iliskisi|watt, amper ve volt ilişkisi]] yazımızdadır."
      ]
    },
    {
      h: "Panel açısı ve yönü verimi nasıl etkiler?",
      p: [
        "Kuzey yarım kürede paneller güneye baktığında en yüksek yıllık üretimi verir. Doğu ya da batıya bakan paneller de çalışır ama yıllık üretim belirgin biçimde azalır; kuzeye bakan çatılar genellikle uygun değildir.",
        "Sabit sistemlerde yıllık üretimi en çok artıran eğim açısı yaklaşık olarak bulunduğunuz enlem civarındadır. Türkiye 36° ile 42° kuzey enlemleri arasında yer aldığı için sabit paneller çoğunlukla 30–35° eğimle kurulur. Kış üretimini öne çıkarmak isteyen akülü sistemlerde açı biraz artırılır, yaz ağırlıklı kullanımda azaltılır.",
        "Gölge, açıdan daha büyük bir düşmandır. Bir panelin küçük bir bölümüne düşen baca, ağaç ya da anten gölgesi, panellerin seri bağlandığı dizinin tamamının üretimini düşürebilir. Kurulumdan önce çatının gün boyunca ve kış aylarında gölge alıp almadığını gözlemleyin."
      ]
    },
    {
      h: "Güneş paneli bulutlu havada çalışır mı?",
      p: [
        "Evet, ama üretim belirgin biçimde düşer. Paneller doğrudan güneşin yanında bulutlardan saçılan dağınık ışıkla da üretim yapar; ancak yoğun bulutlu bir günde üretim açık bir günün küçük bir kısmına inebilir. Kar örtüsü panelleri tamamen kapatırsa üretim durur. Akülü sistemlerde art arda birkaç bulutlu günü karşılamak için akü yedeği ya da jeneratör gibi bir yedek kaynak planlanır.",
        "Sıcaklık da verimi etkiler: paneller serin ve güneşli havada en iyi çalışır. Çok sıcak yaz günlerinde hücre sıcaklığı arttıkça çıkış gücü bir miktar düşer. Bu yüzden panellerin arkasında hava dolaşımı bırakılır."
      ]
    },
    {
      h: "Güneş paneli kendini kaç yılda amorti eder?",
      p: [
        "Geri ödeme süresi, sistemin toplam maliyetinin her yıl sağladığı kazanca bölünmesiyle hesaplanır. Kazanç, şebekeden almadığınız elektriğin bedeli ve varsa şebekeye satılan fazla enerjinin gelirinden oluşur."
      ],
      formula: "Yıllık kazanç = yıllık üretim (kWh) × elektrik birim fiyatı (TL/kWh)\nBasit geri ödeme süresi (yıl) = toplam yatırım ÷ yıllık kazanç",
      after: [
        "Örnek tutarlarla: 3,15 kWp'lik sistemin anahtar teslim maliyeti 150.000 TL, yıllık üretimi 4.140 kWh ve elektrik birim fiyatı 3 TL/kWh olsun. Yıllık kazanç 4.140 × 3 = 12.420 TL, basit geri ödeme süresi 150.000 ÷ 12.420 ≈ 12 yıl olur. Bu tutarlar yalnızca hesabı göstermek içindir; güncel kurulum fiyatlarını tekliflerden, elektrik tarifesini faturanızdan alın.",
        "Elektrik fiyatlarının artması geri ödeme süresini kısaltır; inverter değişimi ve bakım giderleri ise uzatır. Paranın zaman değerini de hesaba katmak isterseniz [[arac:geri-odeme-suresi-hesapla|geri ödeme süresi hesaplama aracı]]nın iskontolu yöntemini kullanın; bu yaklaşım [[bilgi:net-bugunku-deger-ve-ic-verim-orani|net bugünkü değer ve iç verim oranı]] yazımızda ayrıntılı anlatılır.",
        "Şebekeye bağlı sistemler için başvuru, bağlantı ve mahsuplaşma kuralları Enerji Piyasası Düzenleme Kurumu'nun lisanssız üretim düzenlemeleriyle belirlenir; güncel koşulları dağıtım şirketinizden ve EPDK'dan öğrenin."
      ]
    },
    {
      h: "Sık yapılan hatalar",
      ul: [
        "<strong>Güneşlenme süresini eşdeğer saat sanmak:</strong> Günde 7,5 saat güneş görülmesi panelin 7,5 saat tam güç ürettiği anlamına gelmez.",
        "<strong>Akülü sistemi yıllık ortalamayla boyutlandırmak:</strong> Kışın üretim yaz ortalamasının çok altına düşer; bağımsız sistemler en zayıf aya göre hesaplanır.",
        "<strong>Kalkış akımını unutmak:</strong> Buzdolabı ve pompa çalışmaya başlarken küçük inverteri korumaya geçirebilir.",
        "<strong>Akünün tamamını kullanılabilir sanmak:</strong> Kurşun-asit aküleri sürekli tam boşaltmak ömürlerini kısaltır; deşarj derinliğini hesaba katın.",
        "<strong>Gölgeyi küçümsemek:</strong> Tek bir panele düşen gölge tüm dizinin üretimini düşürebilir."
      ]
    }
  ],
  faq: [
    ["Ev için kaç watt güneş paneli gerekir?", "Günlük tüketiminizi eşdeğer güneş saati ve sistem veriminin çarpımına bölerek bulursunuz. Aylık 300 kWh tüketen bir ev, 4,5 eşdeğer güneş saati ve yüzde 20 kayıpla yaklaşık 2,8 kWp, yani 450 W'lık 7 panele ihtiyaç duyar."],
    ["1 kW panel günde kaç kWh üretir?", "1 kWp panel, günlük 4,5 eşdeğer güneş saati ve yüzde 20 kayıpla günde yaklaşık 3,6 kWh üretir. Üretim yazın bu değerin üzerine çıkar, kışın belirgin biçimde düşer; yıllık toplam yaklaşık 1.300 kWh civarındadır."],
    ["Bağ evi için güneş enerjisi sistemi nasıl hesaplanır?", "Önce cihazların günlük watt-saat tüketimi toplanır. Panel gücü kış ayının eşdeğer güneş saatine göre, akü kapasitesi yedek gün ve deşarj derinliğine göre, inverter ise eş zamanlı yük ve kalkış akımına göre seçilir."],
    ["Kaç amper akü gerekir?", "Günlük tüketimi yedek gün sayısıyla çarpıp akü gerilimi, deşarj derinliği ve inverter veriminin çarpımına bölersiniz. Günde 1.600 Wh için 24 V ve yüzde 80 deşarjla yaklaşık 93 Ah, yani 100 Ah'lik bir akü grubu gerekir."],
    ["İnverter gücü nasıl seçilir?", "Aynı anda çalışacak cihazların watt değerleri toplanır ve motorlu cihazların kalkış anında çektiği yüksek güç için pay bırakılır. Buzdolabı ve pompa içeren küçük sistemlerde 1.000–1.500 W tam sinüs inverter yaygın bir seçimdir."],
    ["Güneş paneli bulutlu havada çalışır mı?", "Çalışır, ancak dağınık ışıkla ürettiği için üretim belirgin biçimde düşer ve yoğun bulutlu günlerde açık günün küçük bir kısmına inebilir. Akülü sistemlerde bulutlu günler için yedek kapasite planlanır."],
    ["Panel açısı verimi nasıl etkiler?", "Türkiye'de sabit paneller genellikle güneye bakacak biçimde ve 30–35 derece eğimle kurulduğunda yıllık üretim en yüksek seviyeye yaklaşır. Doğu ya da batıya bakan panellerde ve gölgeli konumlarda üretim azalır."],
    ["Güneş paneli kendini kaç yılda amorti eder?", "Toplam yatırımı yıllık kazanca bölerek basit geri ödeme süresini bulursunuz. Yıllık kazanç, üretilen kilowattsaat ile elektrik birim fiyatının çarpımıdır; sonuç kurulum fiyatına ve tarifeye göre değiştiği için güncel tutarlarla hesaplanmalıdır."],
    ["Güneş paneli kışın ne kadar üretir?", "Kış aylarında günler kısa, güneş açısı düşük ve bulutlu günler fazla olduğu için üretim yaz aylarının üçte biri ile yarısı arasına düşebilir. Bölgeye göre fark büyüktür; aylık değerler için potansiyel atlasına bakın."]
  ],
  tools: ["gunes-paneli-hesapla", "aku-kullanim-suresi-hesapla", "elektrik-tuketim-hesapla", "geri-odeme-suresi-hesapla"],
  related: ["watt-amper-volt-iliskisi", "elektrik-faturasi-nasil-hesaplanir", "net-bugunku-deger-ve-ic-verim-orani"],
  sources: [
    ["Enerji ve Tabiat Kaynakları Bakanlığı – Güneş enerjisi", "https://enerji.gov.tr/bilgi-merkezi-enerji-gunes-en"],
    ["Enerji Piyasası Düzenleme Kurumu (EPDK)", "https://www.epdk.gov.tr/"]
  ]
};
