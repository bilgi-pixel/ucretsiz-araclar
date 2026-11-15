export default {
  slug: 'jenerator-gucu-hesapla',
  title: 'Jeneratör Gücü Hesaplama',
  h1Tail: 'kW ve kVA ihtiyacı',
  pageTitle: 'Jeneratör Gücü Hesaplama – Kaç kVA Jeneratör Gerekir?',
  description: 'Çalıştıracağınız cihazların güçlerini yazın; kalkış akımı, güç faktörü ve yedek payla birlikte gereken jeneratör gücünü kW ve kVA olarak hesaplayın.',
  card: 'Cihaz güçlerinden, motor kalkış yükünden ve yedek paydan gereken jeneratör gücünü kW ve kVA olarak bulun.',
  category: 'elektrik',
  keywords: ['jeneratör gücü hesaplama', 'kaç kva jeneratör lazım', 'jeneratör kva hesaplama', 'ev için jeneratör hesaplama', 'jeneratör seçimi', 'kalkış gücü hesaplama', 'jeneratör kw hesaplama'],
  lead: 'Aynı anda çalışacak cihazların güçlerini watt olarak yazın. Araç toplam çalışma gücünü, en büyük motorun kalkış anındaki tepe yükünü ve yedek payı hesaba katarak <strong>gereken jeneratör gücünü kW ve kVA</strong> olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'yukler', label: 'Cihaz güçleri (W)', type: 'textarea', placeholder: 'Örn. 1000 500 300', hint: 'Aynı anda çalışacak cihazların watt değerlerini boşluk ya da satır sonuyla ayırın. Binlik ayraç kullanmayın.', wide: true },
    { id: 'motor', label: 'En büyük motorlu cihazın gücü (W, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1000', hint: 'Listede yer alan pompa, kompresör, buzdolabı gibi en büyük motorlu yük.' },
    { id: 'katsayi', label: 'Kalkış katsayısı', type: 'number', value: '3', hint: 'Motorun kalkışta çalışma gücünün kaç katını çektiği; genellikle 2–6 arası.' },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '0,8' },
    { id: 'pay', label: 'Yedek pay (%)', type: 'number', value: '20' },
  ],
  compute(v, h) {
    const liste = h.nums(v.yukler, 'Cihaz güçleri');
    if (liste.some((x) => x < 0)) h.err('Cihaz güçleri negatif olamaz.');
    const toplam = liste.reduce((a, b) => a + b, 0);
    if (!(toplam > 0)) h.err('Toplam güç sıfırdan büyük olmalı; en az bir cihazın gücünü yazın.');
    const motor = h.opt(v.motor, 0, 'En büyük motorlu cihazın gücü');
    if (motor < 0) h.err('Motor gücü negatif olamaz.');
    if (motor > toplam + 1e-9) h.err('Motorlu cihazın gücü toplamdan büyük olamaz; bu cihazı "Cihaz güçleri" listesine de ekleyin.');
    const k = h.opt(v.katsayi, 3, 'Kalkış katsayısı');
    if (k < 1 || k > 10) h.err('Kalkış katsayısı 1 ile 10 arasında olmalı.');
    const cosfi = h.opt(v.cosfi, 0.8, 'Güç faktörü');
    if (!(cosfi > 0) || cosfi > 1) h.err('Güç faktörü 0 ile 1 arasında olmalı (örn. 0,8).');
    const pay = h.opt(v.pay, 20, 'Yedek pay');
    if (pay < 0 || pay > 200) h.err('Yedek pay %0 ile %200 arasında olmalı.');
    const tepe = toplam + motor * (k - 1);
    const surekli = toplam * (1 + pay / 100);
    const secim = Math.max(tepe, surekli);
    const kva = secim / cosfi / 1000;
    return {
      rows: [
        ['Önerilen en düşük jeneratör gücü', h.fmt(kva, 2) + ' kVA'],
        ['Karşılık gelen aktif güç', h.fmt(secim / 1000, 2) + ' kW'],
        ['Toplam çalışma gücü', h.fmt(toplam, 0) + ' W'],
        ['Kalkış anındaki tepe yük', h.fmt(tepe, 0) + ' W'],
        ['Yedek paylı sürekli güç', h.fmt(surekli, 0) + ' W'],
        ['Belirleyici ölçüt', tepe > surekli + 1e-9 ? 'Motor kalkış yükü' : 'Sürekli yük ve yedek pay'],
        ['Cihaz sayısı', liste.length + ' adet'],
      ],
      note: 'Sonuç, tepe yük ile yedek paylı sürekli yükten büyük olanına göre verilir ve temkinli bir alt sınırdır. Piyasadaki bir üst standart güce yuvarlayın; kesin seçim için cihaz etiketlerine ve üretici verilerine bakın.',
    };
  },
  cases: [
    { in: { yukler: '1000 500 300', motor: '1000', katsayi: '3', cosfi: '0,8', pay: '20' }, out: { 'Önerilen en düşük jeneratör gücü': '4,75 kVA', 'Karşılık gelen aktif güç': '3,8 kW', 'Toplam çalışma gücü': '1.800 W', 'Kalkış anındaki tepe yük': '3.800 W', 'Yedek paylı sürekli güç': '2.160 W', 'Belirleyici ölçüt': 'Motor kalkış yükü' } },
    { in: { yukler: '2000', motor: '', katsayi: '3', cosfi: '0,8', pay: '20' }, out: { 'Önerilen en düşük jeneratör gücü': '3 kVA', 'Karşılık gelen aktif güç': '2,4 kW', 'Belirleyici ölçüt': 'Sürekli yük ve yedek pay', 'Cihaz sayısı': '1 adet' } },
    { in: { yukler: '150\n100\n60\n200', motor: '150', katsayi: '4', cosfi: '1', pay: '25' }, out: { 'Toplam çalışma gücü': '510 W', 'Kalkış anındaki tepe yük': '960 W', 'Yedek paylı sürekli güç': '638 W', 'Önerilen en düşük jeneratör gücü': '0,96 kVA' } },
    { in: { yukler: '5000 3000 2000', motor: '3000', katsayi: '2', cosfi: '0,8', pay: '25' }, out: { 'Toplam çalışma gücü': '10.000 W', 'Kalkış anındaki tepe yük': '13.000 W', 'Yedek paylı sürekli güç': '12.500 W', 'Önerilen en düşük jeneratör gücü': '16,25 kVA' } },
    { in: { yukler: '800; 1200', motor: '', katsayi: '3', cosfi: '0,8', pay: '0' }, out: { 'Karşılık gelen aktif güç': '2 kW', 'Önerilen en düşük jeneratör gücü': '2,5 kVA' } },
    { in: { yukler: '4000', motor: '4000', katsayi: '3', cosfi: '0,8', pay: '20' }, out: { 'Kalkış anındaki tepe yük': '12.000 W', 'Önerilen en düşük jeneratör gücü': '15 kVA' } },
    { in: { yukler: '', motor: '', katsayi: '3', cosfi: '0,8', pay: '20' }, error: true },
    { in: { yukler: '1000 500', motor: '2000', katsayi: '3', cosfi: '0,8', pay: '20' }, error: true },
    { in: { yukler: '1000', motor: '', katsayi: '3', cosfi: '1,2', pay: '20' }, error: true },
  ],
  howto: [
    'Jeneratörden aynı anda beslenecek cihazların çalışma güçlerini watt olarak "Cihaz güçleri" alanına yazın; değerleri boşlukla ya da alt alta ayırabilirsiniz.',
    'Listede motorlu bir cihaz (su pompası, kompresör, buzdolabı, klima, matkap) varsa en büyüğünün gücünü ayrıca "En büyük motorlu cihaz" alanına girin.',
    'Kalkış katsayısını cihazın türüne göre ayarlayın. Bilmiyorsanız 3 değerini bırakın; ağır yük altında kalkan kompresör ve pompalar için daha yüksek bir değer seçin.',
    'Güç faktörünü ve yedek payı gerekirse değiştirin. Jeneratör etiketlerinde yaygın olarak 0,8 kullanılır.',
    '"Hesapla" düğmesine basın. İlk satırdaki kVA değerinin bir üstündeki standart jeneratör gücünü seçin.',
  ],
  sections: [
    { h: 'Jeneratör gücü neden yalnızca watt toplamı değildir?', p: [
      'Cihazların etiketindeki güçleri toplayıp o büyüklükte bir jeneratör almak en sık yapılan hatadır. Üç ayrı etken bu toplamın üzerine eklenmelidir. Birincisi <strong>kalkış akımıdır</strong>: elektrik motorları ilk hareket anında, dönmeye başlayana kadar çalışma güçlerinin birkaç katını çeker. İkincisi <strong>güç faktörüdür</strong>: jeneratörler görünür güçle (kVA) anılır, cihazlar ise aktif güçle (kW) çalışır. Üçüncüsü <strong>yedek paydır</strong>: sürekli tam yükte çalışan bir jeneratör hem daha çok yakıt harcar hem daha çabuk yıpranır.',
      'Bu araç üç etkeni birlikte değerlendirir ve iki ayrı ölçüt hesaplar: kalkış anındaki tepe yük ve yedek pay eklenmiş sürekli yük. Jeneratör bunlardan büyük olanını karşılayacak biçimde seçilir.',
    ] },
    { h: 'Hesap yöntemi ve formüller', ul: [
      '<strong>Toplam çalışma gücü</strong> = cihaz güçlerinin toplamı (W)',
      '<strong>Tepe yük</strong> = toplam + motor gücü × (kalkış katsayısı − 1)',
      '<strong>Yedek paylı sürekli güç</strong> = toplam × (1 + pay ÷ 100)',
      '<strong>Gereken aktif güç (kW)</strong> = bu ikisinden büyük olanı ÷ 1000',
      '<strong>Gereken görünür güç (kVA)</strong> = kW ÷ cos φ',
    ], p: [
      'Tepe yük formülünde katsayıdan 1 çıkarılmasının nedeni, motorun çalışma gücünün zaten toplamın içinde bulunmasıdır; üzerine yalnızca kalkıştaki fazlalık eklenir. Hesap, en büyük motorun diğer tüm cihazlar çalışırken devreye girdiği en zor anı esas alır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir bağ evinde 1000 W\'lık su pompası, 500 W\'lık aydınlatma ve küçük cihazlar ile 300 W\'lık bir buzdolabı aynı anda çalışacak olsun. En büyük motorlu yük pompadır, kalkış katsayısı 3, güç faktörü 0,8 ve yedek pay yüzde 20 alınmıştır.',
    ], ol: [
      'Toplam çalışma gücü: 1000 + 500 + 300 = 1800 W',
      'Tepe yük: 1800 + 1000 × (3 − 1) = 3800 W',
      'Yedek paylı sürekli güç: 1800 × 1,20 = 2160 W',
      'Belirleyici olan tepe yüktür: 3800 W = 3,8 kW',
      'Görünür güç: 3,8 ÷ 0,8 = 4,75 kVA',
    ] },
    { h: 'Örneğin yorumu', p: [
      'Bu sonuca göre piyasada 5 kVA olarak satılan bir jeneratör uygun alt sınırdır. Dikkat edin: yalnızca watt toplamına bakılsaydı 2 kW\'lık bir makine yeterli görünürdü ve pompa her devreye girdiğinde jeneratör zorlanır ya da koruması atardı. Motorlu yük bulunmayan bir senaryoda ise ölçüt değişir: tek başına 2000 W\'lık bir ısıtıcı için sonuç 2,4 kW, yani 3 kVA çıkar ve belirleyici olan yedek paydır.',
    ] },
    { h: 'Kalkış katsayısı nasıl seçilir?', p: [
      'Katsayı cihazın türüne ve yol verme yöntemine göre değişir. Aşağıdaki aralıklar genel bir fikir verir; kesin değer için cihazın etiketine ya da üretici belgesine bakılmalıdır.',
    ], ul: [
      '<strong>Rezistanslı yükler</strong> (ısıtıcı, ütü, fırın, akkor lamba): kalkış fazlalığı yok sayılabilir; motor alanını boş bırakın.',
      '<strong>Üniversal motorlu el aletleri</strong> (matkap, taşlama): yaklaşık 2–3 kat.',
      '<strong>Buzdolabı, derin dondurucu, klima kompresörü:</strong> yaklaşık 3–5 kat.',
      '<strong>Dalgıç ve santrifüj pompalar, hava kompresörleri:</strong> yaklaşık 3–6 kat.',
      '<strong>İnverterli ya da yumuşak yol vericili cihazlar:</strong> kalkış akımı sınırlandığı için 1–2 kat.',
    ] },
    { h: 'kW ile kVA arasındaki fark', p: [
      'kW, cihazın gerçekten işe çevirdiği aktif güçtür; kVA ise jeneratörün sargılarından geçen toplam, yani görünür güçtür. İkisi arasındaki oran güç faktörüdür: <strong>kW = kVA × cos φ</strong>. Jeneratör etiketlerinde çoğunlukla 0,8 güç faktörü esas alınır; bu durumda 10 kVA\'lık bir jeneratör 8 kW aktif güç verebilir. Yalnızca rezistanslı yük besleyecekseniz cos φ değerini 1 alabilirsiniz; motor ağırlıklı tesislerde 0,8 daha gerçekçidir.',
    ] },
    { h: 'Seçimde gözden kaçan noktalar', p: [
      'Tek fazlı ve üç fazlı jeneratörler aynı kVA değerinde olsa bile farklı davranır: üç fazlı bir makinenin tek bir fazından toplam gücün yalnızca üçte biri çekilebilir. Ev tipi tek fazlı cihazları üç fazlı jeneratöre bağlayacaksanız yükleri fazlara dengeli dağıtmanız gerekir.',
      'Etiketlerde bazen "azami" ve "sürekli" olmak üzere iki güç yazar. Hesabınızı sürekli (anma) güce göre yapın; azami güç yalnızca kısa süreli dayanımı gösterir. Yüksek rakım ve sıcak hava motor gücünü düşürdüğü için yayla ve şantiye kullanımlarında ek pay bırakmak yerinde olur. Elektronik cihazlar, kombi kartları ve bilgisayarlar için gerilimi düzgün, inverter çıkışlı ya da otomatik gerilim regülatörlü modeller tercih edilmelidir.',
      'Bu sayfa bilgilendirme amaçlı bir ön hesap sunar. Jeneratörün bina tesisatına bağlanması, transfer panosu ve topraklama işleri yetkili bir elektrikçi tarafından yapılmalı; şebekeye geri besleme oluşturacak bağlantılardan kesinlikle kaçınılmalıdır.',
    ] },
  ],
  faq: [
    ['Ev için kaç kVA jeneratör gerekir?', 'Tek bir yanıtı yoktur; aynı anda çalıştırmak istediğiniz cihazlara bağlıdır. Yalnızca aydınlatma, televizyon ve buzdolabı için birkaç kVA yeterken klima, pompa ve elektrikli ısıtıcı eklendiğinde ihtiyaç hızla büyür. Cihazlarınızın güçlerini yazarak kendi değerinizi bulun.'],
    ['Cihazın watt değerini nereden öğrenirim?', 'Cihazın arkasındaki ya da altındaki etikette ve kullanım kılavuzunda yazar. Yalnızca akım (A) verilmişse tek fazlı cihazlarda akımı şebeke gerilimiyle çarparak yaklaşık gücü bulabilirsiniz.'],
    ['Birden çok motorlu cihazım varsa ne yapmalıyım?', 'Araç en büyük motorun diğerleri çalışırken kalktığı durumu hesaplar; motorlar aynı anda kalkmadığı sürece bu yeterlidir. Cihazları sırayla, büyükten küçüğe çalıştırmak jeneratörü rahatlatır.'],
    ['kVA değerini kW\'a nasıl çeviririm?', 'kVA değerini güç faktörüyle çarpın. 0,8 güç faktörüyle 5 kVA, 4 kW eder. Tersine kW değerini 0,8\'e bölerek kVA bulunur.'],
    ['Yedek payı ne kadar bırakmalıyım?', 'Yüzde 20–25 yaygın bir tercihtir. Jeneratörün sürekli olarak anma gücünün yaklaşık dörtte üçünde çalışması hem yakıt tüketimi hem ömür açısından uygundur; ileride yük eklemeyi düşünüyorsanız payı artırın.'],
    ['Gereğinden büyük jeneratör almanın sakıncası var mı?', 'Çok düşük yükte çalışan jeneratör verimsiz yakıt tüketir ve özellikle dizel motorlarda kurum birikimi artar. İhtiyacın epeyce üstünde bir makine yerine hesaplanan değerin bir üst standart gücünü seçmek dengelidir.'],
    ['İnverter klima için kalkış katsayısını kaç almalıyım?', 'İnverterli cihazlar kompresörü yavaşça hızlandırdığı için kalkış fazlalığı küçüktür; 1 ile 2 arasında bir katsayı çoğu durumda yeterlidir. Kesin değer için üretici verisine bakın.'],
    ['Yazdığım cihaz listesi saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kva-kw-cevir', 'kw-amper-cevir', 'guc-faktoru-hesapla', 'ups-calisma-suresi-hesapla', 'elektrik-gucu-hesapla', 'uc-faz-guc-hesapla'],
};
