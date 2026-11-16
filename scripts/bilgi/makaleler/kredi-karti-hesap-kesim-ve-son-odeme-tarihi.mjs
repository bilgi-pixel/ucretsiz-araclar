export default {
  slug: "kredi-karti-hesap-kesim-ve-son-odeme-tarihi",
  kategori: "finans",
  tarih: "2026-11-15",
  title: "Kredi Kartı Hesap Kesim Tarihi ve Son Ödeme Tarihi Farkı: Faizsiz Gün",
  pageTitle: "Hesap Kesim Tarihi ve Son Ödeme Tarihi Farkı: Faizsiz Gün Sayısı",
  description: "Hesap kesim tarihi ekstrenin kapandığı, son ödeme tarihi borcun faizsiz ödenebileceği son gündür; arada en az 10 gün olur. Faizsiz gün hesabı ve tarihli örnekler.",
  keywords: ["hesap kesim tarihi nedir", "son ödeme tarihi", "kredi kartı faizsiz gün", "ekstre kesim tarihi", "hesap kesim tarihinden sonra alışveriş", "son ödeme tarihi tatile denk gelirse", "ekstre borcu", "dönem içi borç"],
  lead: "<strong>Hesap kesim tarihi</strong>, kredi kartı döneminin kapandığı ve o güne kadarki harcamaların ekstreye (hesap özetine) yazıldığı gündür; <strong>son ödeme tarihi</strong> ise bu ekstre borcunun faizsiz ödenebileceği son gündür. Mevzuata göre ikisi arasında <strong>en az 10 gün</strong> bulunur. Hesap kesiminin ertesi günü yapılan bir alışveriş bir sonraki ekstreye girer ve yaklaşık 40 gün sonra ödenir; kesim günü yapılan alışverişin ise yalnızca 10 gün faizsiz süresi olur. Bu sayfada tarihli örneklerle faizsiz gün sayısını, taksitlerin ekstreye yansımasını ve tatil kuralını anlatıyoruz.",
  kisaCevap: [
    "Hesap kesim tarihi dönemin kapandığı gündür; o güne kadarki harcamalar ekstre borcunu oluşturur.",
    "Son ödeme tarihi, ekstre borcunun faiz işlemeden ödenebileceği son gündür; kesimle arasında en az 10 gün olur.",
    "Kesimden sonraki gün yapılan alışveriş bir sonraki ekstreye girer; faizsiz süre yaklaşık 40 gündür.",
    "Kesim günü yapılan alışverişin faizsiz süresi en kısadır, yaklaşık 10 gün.",
    "Taksitli alışverişte her ay yalnızca o ayın taksiti ekstreye yansır.",
    "Son ödeme tarihinden sonra yapılan ödemede asgari tutarın ödenmeyen kısmına gecikme faizi, kalan borca akdi faiz işler."
  ],
  figure: {
    alt: "Kredi kartı dönem çizelgesi: 10 Kasım 2026 hesap kesimi, 20 Kasım son ödeme, 11 Kasım'da yapılan alışveriş 10 Aralık kesimine girer ve 20 Aralık'ta ödenir, toplam 39 gün faizsiz süre.",
    caption: "Hesap kesimi her ayın 10'u, son ödeme 20'si olan bir kartta 11 Kasım'daki alışveriş 39 gün, 10 Kasım'daki alışveriş ise yalnızca 10 gün sonra ödenir. 20 Aralık 2026 pazara denk geldiği için birçok banka son ödemeyi ilk iş gününe kaydırır.",
    svg: `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="30" class="lg b mid">Hesap kesim: her ayın 10'u · Son ödeme: 20'si</text>
  <line x1="40" y1="150" x2="690" y2="150" class="st sw" fill="none"/>
  <rect x="60" y="120" width="230" height="60" class="ps"/>
  <text x="175" y="146" class="b mid">Kasım dönemi</text>
  <text x="175" y="166" class="sm mid t2">11 Ekim – 10 Kasım harcamaları</text>
  <rect x="290" y="120" width="300" height="60" class="oks"/>
  <text x="440" y="146" class="b mid">Aralık dönemi</text>
  <text x="440" y="166" class="sm mid t2">11 Kasım – 10 Aralık harcamaları</text>
  <circle cx="290" cy="150" r="8" class="p"/>
  <circle cx="590" cy="150" r="8" class="p"/>
  <text x="290" y="102" class="b mid p">10 Kasım kesim</text>
  <text x="590" y="102" class="b mid p">10 Aralık kesim</text>
  <line x1="390" y1="190" x2="390" y2="230" class="sa" fill="none"/>
  <text x="390" y="246" class="sm mid b">20 Kasım son ödeme</text>
  <line x1="680" y1="190" x2="680" y2="230" class="sa" fill="none"/>
  <text x="640" y="246" class="sm mid b">20 Aralık son ödeme</text>
  <rect x="40" y="270" width="310" height="110" rx="8" class="dgs"/>
  <text x="56" y="296" class="b dg">10 Kasım'da alışveriş</text>
  <text x="56" y="320" class="sm">Kasım ekstresine girer</text>
  <text x="56" y="342" class="sm">Ödeme: 20 Kasım</text>
  <text x="56" y="366" class="lg b dg">10 gün faizsiz</text>
  <rect x="370" y="270" width="310" height="110" rx="8" class="oks"/>
  <text x="386" y="296" class="b ok">11 Kasım'da alışveriş</text>
  <text x="386" y="320" class="sm">Aralık ekstresine girer</text>
  <text x="386" y="342" class="sm">Ödeme: 20 Aralık (pazar)</text>
  <text x="386" y="366" class="lg b ok">39 gün faizsiz</text>
</svg>`
  },
  sections: [
    {
      h: "Hesap kesim tarihi nedir?",
      p: [
        "Kredi kartı harcamaları aylık dönemler halinde toplanır. <strong>Hesap kesim tarihi</strong>, bir dönemin kapandığı gündür. Banka bu tarihe kadar hesaba yansıyan harcamaları, taksitleri, ücretleri ve varsa önceki dönemden kalan borç ile faizi toplar ve hesap özetini (ekstreyi) hazırlar. Ekstrede yazan toplam tutara <strong>dönem borcu</strong> ya da ekstre borcu denir.",
        "Kesim tarihi genellikle kartı aldığınızda bankayla belirlenir ve her ay aynı güne denk gelir. Kesim günü hafta sonuna ya da tatile denk gelse bile dönem çoğunlukla o gün kapanır; ödeme günü ise ayrıca değerlendirilir. Bazı bankalar kesim tarihini, ayın gün sayısına göre bir iki gün oynayan sabit bir kural ile belirler; kendi kartınızın kuralını ekstrede görebilirsiniz."
      ]
    },
    {
      h: "Son ödeme tarihi nedir, arada kaç gün olur?",
      p: [
        "<strong>Son ödeme tarihi</strong>, ekstre borcunun tamamını faiz ödemeden kapatabileceğiniz ya da en az asgari tutarı ödeyerek gecikmeye düşmekten kurtulabileceğiniz son gündür. Banka Kartları ve Kredi Kartları Hakkında Yönetmelik, hesap kesim tarihi ile son ödeme tarihi arasında <strong>on günden az</strong> bir süre olamayacağını düzenler. Uygulamada bu süre çoğu kartta 10 gündür.",
        "Bu iki tarih arasındaki dönem, ekstreyi inceleyip itiraz etmeniz ve ödemeyi planlamanız için verilen süredir. Ekstre size e-posta, SMS ya da mobil uygulama ile ulaştırılır; ekstrenin size ulaşmaması ödeme yükümlülüğünü ortadan kaldırmaz, bu yüzden kesim tarihinden birkaç gün sonra uygulamadan borcunuzu kontrol etmek iyi bir alışkanlıktır."
      ],
      table: {
        head: ["Kavram", "Ne anlama gelir?", "Örnek (kesim 10, ödeme 20)"],
        rows: [
          ["Hesap kesim tarihi", "Dönemin kapandığı gün", "10 Kasım 2026"],
          ["Dönem (ekstre) borcu", "Kesime kadar biriken borç", "Kasım ekstresindeki toplam"],
          ["Son ödeme tarihi", "Faizsiz ödemenin son günü", "20 Kasım 2026"],
          ["Dönem içi borç", "Kesimden sonra yapılan, henüz ekstreye girmemiş harcamalar", "11 Kasım ve sonrası"],
          ["Asgari ödeme", "Gecikmeye düşmemek için en az ödenecek kısım", "Limite göre dönem borcunun %20 ya da %40'ı"]
        ]
      }
    },
    {
      h: "Hesap kesiminden hemen sonra yapılan alışveriş ne zaman ödenir?",
      p: [
        "Kesim tarihinden bir gün sonra yapılan harcama, o anda kapanmış olan ekstreye giremez; bir sonraki dönemde toplanır ve bir sonraki son ödeme tarihinde ödenir. Bu yüzden kesimin ertesi günü kartla yapılan alışverişlerin faizsiz süresi en uzundur.",
        "Örnek: Hesap kesimi her ayın 10'u, son ödeme 20'si olan bir kartla 11 Kasım 2026 Çarşamba günü alışveriş yaptınız. Bu harcama 10 Aralık 2026 kesimine girer ve 20 Aralık 2026'da ödenir. 11 Kasım ile 20 Aralık arasında <strong>39 gün</strong> vardır. Aynı alışverişi bir gün önce, 10 Kasım'da yapsaydınız harcama Kasım ekstresine girecek ve 20 Kasım'da, yani yalnızca <strong>10 gün</strong> sonra ödenecekti."
      ],
      formula: "Faizsiz gün = son ödeme tarihi − alışveriş tarihi\nEn uzun: kesimin ertesi günü (≈ bir dönem + 10 gün ≈ 40 gün)\nEn kısa: kesim günü (≈ 10 gün)",
      after: [
        "İki tarih arasındaki gün sayısını [[arac:tarih-ekle-cikar|Tarih Ekle Çıkar]] aracıyla, belirli bir faturanın ya da ödemenin hangi tarihe denk geleceğini [[arac:vade-tarihi-hesapla|Vade Tarihi Hesaplama]] aracıyla hızlıca bulabilirsiniz."
      ]
    },
    {
      h: "Kredi kartında en uzun faizsiz süre kaç gündür?",
      p: [
        "En uzun faizsiz süre, bir dönemin uzunluğu ile kesim ile son ödeme arasındaki sürenin toplamına yakındır. Dönem 30 gün, ödeme süresi 10 gün olan bir kartta kesimin ertesi günü yapılan alışveriş yaklaşık 40 gün sonra ödenir. 31 çeken aylarda süre 41 güne, şubatı kapsayan dönemlerde 38–39 güne iner. Son ödeme hafta sonuna denk gelip ilk iş gününe kayarsa bir iki gün daha eklenebilir.",
        "Bu süre yalnızca <strong>dönem borcunun tamamını</strong> ödediğinizde faizsizdir. Asgari ödeme yapıp kalanı devrederseniz, devreden borca akdi faiz işler ve bankanın faiz hesaplama yöntemine göre yeni harcamalarınız da faize konu olabilir. Faiz türlerinin ayrıntısını [[bilgi:kredi-karti-akdi-ve-gecikme-faizi-2026|akdi ve gecikme faizi makalesinde]] bulabilirsiniz.",
        "Nakit avans bu hesaba girmez. Nakit çekimlerde faiz, çekim tarihinden itibaren işleyebilir; hesap kesiminin ertesi günü nakit çekmek faizsiz süre kazandırmaz."
      ]
    },
    {
      h: "Taksitler hangi ekstreye yansır?",
      p: [
        "Taksitli alışverişte toplam tutar kart limitinizden bir seferde düşer, ama ekstreye her ay yalnızca bir taksit yansır. İlk taksit, alışverişin yapıldığı tarihe göre girdiği ilk ekstreye eklenir. Kesimden bir gün sonra yapılan 6 taksitli alışverişin ilk taksiti bir sonraki ekstreye girer, son taksiti altı ekstre sonra ödenir.",
        "Örnek: 11 Kasım 2026'da 12.000 TL'lik bir alışverişi 6 taksitle yaptınız. Her ay 2.000 TL ödersiniz; ilk taksit Aralık ekstresinde (20 Aralık ödemesi), son taksit Mayıs 2027 ekstresinde yer alır. Limitinizde ise 12.000 TL ilk günden bloke olur ve her ödenen taksitle birlikte serbest kalır.",
        "Bazı kampanyalarda \"taksit erteleme\" seçeneği sunulur; bu durumda ilk taksit iki üç ekstre sonra gelir. Ekstreyi kontrol ederken \"bu dönem taksitleri\" ile \"kalan taksitler\" satırlarının ayrı gösterildiğine dikkat edin."
      ]
    },
    {
      h: "Son ödeme tarihi hafta sonuna denk gelirse ne olur?",
      p: [
        "Son ödeme tarihinin cumartesi, pazar ya da resmî tatile denk gelmesi halinde bankaların çoğu ödeme gününü <strong>izleyen ilk iş gününe</strong> kaydırır ve bunu ekstrede yeni tarih olarak gösterir. Örneğimizdeki 20 Aralık 2026 pazara denk gelir; bu tür durumlarda ödeme genellikle 21 Aralık Pazartesi'ye kadar kabul edilir.",
        "Kuralın ayrıntısı kart sözleşmenize ve bankanızın uygulamasına bağlıdır. En güvenli yol ekstrede yazan son ödeme tarihini esas almaktır. Ödemeyi otomatik talimatla yapıyorsanız, talimatın hesap bakiyeniz yeterliyken çalışacağından emin olun; mobil ve internet bankacılığı ödemeleri hafta sonu da çoğunlukla anında kart hesabına geçer, ancak başka bankadan yapılan havale ve EFT'lerin iş günü saatlerine bağlı olabileceğini unutmayın."
      ]
    },
    {
      h: "Son ödeme tarihinden bir gün geç ödenirse faiz işler mi?",
      p: [
        "Evet. Son ödeme tarihinden sonra yapılan ödeme, o dönem için borcun zamanında ödenmediği anlamına gelir. Asgari tutarın ödenmeyen kısmına gecikme faizi, kalan borca akdi faiz uygulanır. Faiz gün bazında hesaplandığı için bir günlük gecikmenin faiz tutarı küçük olabilir, ama asgari tutarın ödenmemiş sayılması kredi sicilinize gecikme olarak yansıyabilir.",
        "Faiz hesaplama başlangıcı bankadan bankaya değişebilir. Mevzuat, alışveriş borçlarında faizin hesap kesim tarihinden önceki bir tarihten itibaren işletilmesini öngören sözleşme hükümlerini geçersiz sayar. Yani geç ödemede faiz, en erken hesap kesim tarihinden itibaren hesaplanır. Ayrıntılı hesap için ekstredeki faiz satırına ve bankanızın ücret ve faiz tablosuna bakın."
      ]
    },
    {
      h: "Hesap kesim tarihi değiştirilebilir mi?",
      p: [
        "Çoğu banka kart sahibinin talebiyle hesap kesim tarihini değiştirebilir; bu işlem genellikle müşteri hizmetleri ya da mobil uygulama üzerinden yapılır. Değişiklik için bankalar belirli sıklık sınırları koyabilir ve geçiş döneminde bir ekstre olağandan kısa ya da uzun olabilir.",
        "Kesim tarihini maaş gününüze göre ayarlamak bütçe yönetimini kolaylaştırır. Maaşınız ayın 1'inde yatıyorsa, son ödeme tarihinin ayın ilk haftasına denk gelmesi ödemeyi garantiye alır. Örneğin kesimi ayın 25'i yaparsanız son ödeme ayın 5'i civarına gelir. Hane bütçesini bu takvime göre kurmak için [[bilgi:aile-butcesi-nasil-yapilir-gelir-gider-tablosu|aile bütçesi makalesindeki]] tabloyu kullanabilirsiniz."
      ]
    },
    {
      h: "Ekstre borcu ile dönem içi borç farkı nedir?",
      p: [
        "<strong>Ekstre (dönem) borcu</strong>, son hesap kesiminde kesinleşen ve son ödeme tarihinde ödenmesi gereken tutardır. <strong>Dönem içi borç</strong> ise kesimden sonra yaptığınız ve henüz ekstreye girmemiş harcamalardır. Mobil uygulamada \"güncel borç\" ya da \"toplam borç\" satırı ikisinin toplamını gösterir.",
        "Son ödeme tarihinde yalnızca ekstre borcunu ödemeniz yeterlidir; dönem içi harcamalar bir sonraki ekstreye girecektir. Güncel borcun tamamını ödemek yasak değildir, ama nakit akışınızı gereksiz yere erken sıkıştırır. Asgari ödeme tutarının hesaplanışını [[rehber:kredi-karti-asgari-odeme-nasil-hesaplanir|asgari ödeme rehberinde]], kalan borcun maliyetini [[arac:kredi-karti-asgari-odeme-hesapla|Kredi Kartı Asgari Ödeme Hesaplama]] aracında görebilirsiniz."
      ],
      note: "Bu sayfa genel bilgi verir. Kartınıza ait kesim ve ödeme tarihleri ile faiz uygulaması için hesap özetinizi ve kart sözleşmenizi esas alın."
    }
  ],
  faq: [
    ["Hesap kesim tarihi ile son ödeme tarihi arasındaki fark nedir?", "Hesap kesim tarihi dönemin kapandığı ve ekstrenin hazırlandığı gündür. Son ödeme tarihi ise bu ekstre borcunun faizsiz ödenebileceği son gündür. Yönetmeliğe göre ikisi arasında en az on gün bulunur."],
    ["Hesap kesiminden hemen sonra yapılan alışveriş ne zaman ödenir?", "Kesimin ertesi günü yapılan alışveriş bir sonraki ekstreye girer ve bir sonraki son ödeme tarihinde ödenir. Kesimi 10, ödemesi 20 olan kartta 11 Kasım'daki alışveriş 20 Aralık'ta, yani 39 gün sonra ödenir."],
    ["Kredi kartında en uzun faizsiz süre kaç gündür?", "Dönem uzunluğu ile kesim ve ödeme arasındaki sürenin toplamı kadardır; çoğu kartta yaklaşık 40 gün eder. Ayın uzunluğuna ve son ödemenin iş gününe kaymasına göre 38 ile 42 gün arasında değişebilir."],
    ["Son ödeme tarihi hafta sonuna denk gelirse ne olur?", "Bankaların çoğu son ödeme tarihini izleyen ilk iş gününe kaydırır ve bunu ekstrede gösterir. Uygulama sözleşmeye göre değişebildiği için en güvenli yol ekstredeki tarihi esas almak ve ödemeyi önceden yapmaktır."],
    ["Hesap kesim tarihi değiştirilebilir mi?", "Çoğu banka talep üzerine hesap kesim tarihini değiştirir; müşteri hizmetleri ya da mobil uygulamadan başvurulur. Geçiş döneminde bir ekstre kısa ya da uzun olabilir ve bankalar değişiklik sıklığına sınır koyabilir."],
    ["Ekstre borcu ile dönem içi borç farkı nedir?", "Ekstre borcu son kesimde kesinleşen ve son ödeme tarihinde ödenecek tutardır. Dönem içi borç kesimden sonra yapılan, henüz ekstreye girmemiş harcamalardır ve bir sonraki dönemde ödenir."],
    ["Son ödeme tarihinden bir gün geç ödenirse faiz işler mi?", "Evet. Geç ödemede asgari tutarın ödenmeyen kısmına gecikme faizi, kalan borca akdi faiz işler. Faiz gün bazında hesaplanır ve en erken hesap kesim tarihinden başlatılabilir; gecikme kredi siciline de yansıyabilir."],
    ["Taksitler hangi ekstreye yansır?", "Taksitli alışverişin ilk taksiti alışverişin girdiği ilk ekstreye eklenir ve her ay bir taksit yansır. Toplam tutar ise limitten ilk gün düşer ve taksitler ödendikçe limit serbest kalır."],
    ["Nakit avansta da faizsiz süre var mı?", "Genellikle yoktur. Nakit avansta faiz çekim tarihinden itibaren işleyebilir ve TCMB tablosunda en yüksek oran kademesi uygulanır. Hesap kesiminin ertesi günü nakit çekmek faizsiz süre kazandırmaz."]
  ],
  tools: ["kredi-karti-asgari-odeme-hesapla", "vade-tarihi-hesapla", "tarih-ekle-cikar"],
  related: ["kredi-karti-akdi-ve-gecikme-faizi-2026", "aile-butcesi-nasil-yapilir-gelir-gider-tablosu", "pesin-mi-taksit-mi-hesaplama"],
  sources: [
    ["BDDK – Banka Kartları ve Kredi Kartları mevzuatı", "https://www.bddk.org.tr/"],
    ["TCMB – Kredi kartı azami faiz oranları", "https://www.tcmb.gov.tr/"]
  ],
  uyari: "finansal danışmanlık değildir; kartınıza ait kurallar için bankanıza danışın"
};
