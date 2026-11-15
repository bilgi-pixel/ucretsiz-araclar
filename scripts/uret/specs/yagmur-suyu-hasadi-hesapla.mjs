export default {
  slug: 'yagmur-suyu-hasadi-hesapla',
  title: 'Yağmur Suyu Hasadı Hesaplama',
  h1Tail: 'çatıdan toplanabilir su',
  pageTitle: 'Yağmur Suyu Hasadı Hesaplama – Çatıdan Kaç Litre Su Toplanır?',
  description: 'Çatı alanı, yıllık yağış ve akış katsayısına göre çatınızdan yılda kaç litre yağmur suyu toplanabileceğini, aylık ve günlük ortalamasını hesaplayın.',
  card: 'Çatı alanı ve yıllık yağış miktarından toplanabilir yağmur suyunu litre ve metreküp olarak hesaplayın.',
  category: 'insaat',
  keywords: ['yağmur suyu hasadı hesaplama', 'çatıdan kaç litre su toplanır', 'yağmur suyu toplama', 'yağmur suyu deposu hesabı', 'akış katsayısı', '1 mm yağış kaç litre', 'yağmur hasadı'],
  lead: 'Çatınıza düşen yağmurun ne kadarının depoya ulaşabileceğini hesaplayın. Araç, <strong>çatı alanı × yağış × akış katsayısı × filtre verimi</strong> formülünü kullanır ve sonucu yıllık, aylık ve günlük ortalama olarak litre cinsinden verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Çatı izdüşüm alanı (m²)', type: 'number', placeholder: 'Örn. 100', hint: 'Çatının eğimli yüzeyi değil, yukarıdan bakıldığında kapladığı alan.' },
    { id: 'yagis', label: 'Yıllık yağış (mm)', type: 'number', placeholder: 'Örn. 500', hint: 'Bulunduğunuz ilin yıllık toplam yağışı; 1 mm = 1 m²\'ye 1 litre.' },
    { id: 'katsayi', label: 'Çatı kaplaması (akış katsayısı)', type: 'select', options: [['0.8', 'Kiremit çatı (0,80)'], ['0.9', 'Metal / sac çatı (0,90)'], ['0.7', 'Beton teras (0,70)'], ['0.6', 'Çakıl kaplı düz çatı (0,60)'], ['0.4', 'Yeşil (bitkili) çatı (0,40)']] },
    { id: 'verim', label: 'Filtre ve sistem verimi (%)', type: 'number', value: '90', hint: 'İlk yağmur ayırıcı ve filtrede kaybolan su düşüldükten sonra kalan oran.' },
    { id: 'tuketim', label: 'Günlük su ihtiyacı (litre, isteğe bağlı)', type: 'number', placeholder: 'Örn. 100', hint: 'Yazarsanız toplanan suyun ihtiyacın yüzde kaçını karşıladığı da gösterilir.' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Çatı izdüşüm alanı');
    const yagis = h.nonneg(v.yagis, 'Yıllık yağış');
    const k = Number(v.katsayi);
    const verim = h.opt(v.verim, 90, 'Filtre ve sistem verimi');
    if (!(verim > 0) || verim > 100) h.err('"Filtre ve sistem verimi" 0 ile 100 arasında bir yüzde olmalı (örn. 90).');
    const birMm = alan * k * verim / 100;
    const yil = birMm * yagis;
    const rows = [
      ['Yıllık toplanabilir su', h.fmt(yil, 0) + ' litre'],
      ['Metreküp karşılığı', h.fmt(yil / 1000, 2) + ' m³'],
      ['Aylık ortalama', h.fmt(yil / 12, 0) + ' litre'],
      ['Günlük ortalama', h.fmt(yil / 365, 1) + ' litre'],
      ['Her 1 mm yağışta toplanan', h.fmt(birMm, 1) + ' litre'],
    ];
    if (String(v.tuketim ?? '').trim() !== '') {
      const t = h.pos(v.tuketim, 'Günlük su ihtiyacı');
      rows.push(['Yıllık ihtiyaç', h.fmt(t * 365, 0) + ' litre']);
      rows.push(['İhtiyacı karşılama oranı', '%' + h.fmt(yil / (t * 365) * 100, 1)]);
    }
    return {
      rows,
      note: 'Sonuç yıllık toplam üzerinden bir ortalamadır; yağış aylara eşit dağılmaz. Depo boyutunu belirlerken yağışlı ve kurak ayları ayrı ayrı değerlendirin.',
    };
  },
  cases: [
    { in: { alan: '100', yagis: '500', katsayi: '0.8', verim: '90' }, out: { 'Yıllık toplanabilir su': '36.000 litre', 'Metreküp karşılığı': '36 m³', 'Aylık ortalama': '3.000 litre', 'Günlük ortalama': '98,6 litre', 'Her 1 mm yağışta toplanan': '72 litre' } },
    { in: { alan: '150', yagis: '600', katsayi: '0.9', verim: '100' }, out: { 'Yıllık toplanabilir su': '81.000 litre', 'Metreküp karşılığı': '81 m³', 'Aylık ortalama': '6.750 litre' } },
    { in: { alan: '80', yagis: '450', katsayi: '0.8', verim: '90', tuketim: '100' }, out: { 'Yıllık toplanabilir su': '25.920 litre', 'Yıllık ihtiyaç': '36.500 litre', 'İhtiyacı karşılama oranı': '%71' } },
    { in: { alan: '120', yagis: '700', katsayi: '0.6', verim: '85' }, out: { 'Yıllık toplanabilir su': '42.840 litre', 'Metreküp karşılığı': '42,84 m³' } },
    { in: { alan: '50', yagis: '1000', katsayi: '0.4', verim: '90' }, out: { 'Yıllık toplanabilir su': '18.000 litre', 'Her 1 mm yağışta toplanan': '18 litre' } },
    { in: { alan: '200', yagis: '0', katsayi: '0.8', verim: '90' }, out: { 'Yıllık toplanabilir su': '0 litre' } },
    { in: { alan: '', yagis: '500', katsayi: '0.8', verim: '90' }, error: true },
    { in: { alan: '100', yagis: '500', katsayi: '0.8', verim: '150' }, error: true },
  ],
  howto: [
    'Çatınızın izdüşüm alanını metrekare olarak yazın. Dikdörtgen bir binada bu değer, saçak uçları dahil binanın eni ile boyunun çarpımıdır.',
    'Bulunduğunuz yerin yıllık toplam yağışını milimetre olarak girin. Tek bir ayı hesaplamak isterseniz o ayın yağış miktarını yazabilirsiniz; bu durumda ilk satır o ayın toplamını gösterir.',
    'Çatı kaplamanıza en yakın seçeneği işaretleyin. Pürüzsüz yüzeyler suyu daha az tutar, bu yüzden katsayıları yüksektir.',
    'Filtre ve sistem verimini olduğu gibi bırakın ya da kendi sisteminize göre değiştirin. İsterseniz günlük su ihtiyacınızı da ekleyin.',
    '"Hesapla" düğmesine basın; yıllık toplam, metreküp karşılığı, aylık ve günlük ortalamalar listelenir.',
  ],
  sections: [
    { h: 'Yağmur suyu hasadı nasıl hesaplanır?', p: [
      'Hesabın temeli çok basit bir eşitliğe dayanır: <strong>1 milimetre yağış, 1 metrekarelik yüzeye 1 litre su bırakır</strong>. Çünkü 1 m² alan üzerinde 1 mm yüksekliğindeki su tabakasının hacmi 0,001 m³, yani tam 1 litredir. Dolayısıyla 100 m² bir çatıya yılda 500 mm yağış düşüyorsa çatıya ulaşan toplam su 100 × 500 = 50.000 litredir.',
      'Bu suyun tamamı depoya ulaşmaz. Bir kısmı çatı yüzeyini ıslatırken tutulur, bir kısmı buharlaşır, bir kısmı sıçrayarak ya da oluktan taşarak kaybolur. Bu kayıplar <strong>akış katsayısı</strong> ile hesaba katılır. Ayrıca yağışın ilk dakikalarında çatıdaki tozu ve yaprakları taşıyan kirli su çoğu sistemde depoya alınmaz, filtrede de bir miktar su kaybolur; bunun için ikinci bir çarpan, yani sistem verimi kullanılır.',
      'Formül şöyledir: <strong>Toplanan su (litre) = Çatı alanı (m²) × Yağış (mm) × Akış katsayısı × Verim</strong>.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'İzdüşüm alanı 100 m² olan kiremit çatılı bir ev düşünelim. Yıllık yağış 500 mm, akış katsayısı 0,80, filtre verimi %90 olsun. Hesap: 100 × 500 × 0,80 × 0,90 = <strong>36.000 litre</strong>, yani 36 metreküp. Bunu on iki aya bölersek ayda ortalama 3.000 litre, 365 güne bölersek günde yaklaşık 98,6 litre eder. Aynı çatıda her 1 mm yağış depoya 72 litre su getirir; 10 mm\'lik orta şiddette bir yağış sonunda depoda 720 litre birikmiş olur.',
      'Aynı evde günlük 100 litre bahçe sulama ve temizlik suyu gerekiyorsa yıllık ihtiyaç 36.500 litredir. 80 m² çatı ve 450 mm yağışla toplanan 25.920 litre bu ihtiyacın yaklaşık %71\'ini karşılar. Kalan kısım şebeke ya da başka bir kaynaktan tamamlanmalıdır.',
    ] },
    { h: 'Çatı alanı neden izdüşüm olarak alınır?', p: [
      'Yağmur yukarıdan aşağıya düşer; bu yüzden toplanan su çatının eğimli yüzey alanına değil, yere düşen gölgesine, yani yatay izdüşümüne bağlıdır. Dik bir çatının yüzey alanı daha büyük olsa da yakaladığı yağmur, aynı taban alanına sahip düz bir çatıyla hemen hemen aynıdır. Alanı bulmak için binanın dış ölçülerini saçak çıkıntılarıyla birlikte ölçüp en ile boyu çarpmanız yeterlidir. Yalnızca çatının bir yüzü oluğa bağlıysa o yüzün izdüşümünü yazın.',
    ] },
    { h: 'Akış katsayısı seçimi', p: [
      'Akış katsayısı, çatıya düşen suyun oluğa ulaşan oranıdır ve kaplama malzemesine, eğime, yüzeyin pürüzlülüğüne göre değişir. Aşağıdaki değerler yaygın kullanılan yaklaşık değerlerdir; kaynaklar arasında küçük farklar bulunur.',
    ], ul: [
      '<strong>Metal, sac, sandviç panel:</strong> yaklaşık 0,90. Yüzey pürüzsüzdür, su hemen akar.',
      '<strong>Kiremit:</strong> yaklaşık 0,80. Gözenekli yapı bir miktar su emer.',
      '<strong>Beton teras:</strong> yaklaşık 0,70. Düşük eğim nedeniyle göllenme ve buharlaşma artar.',
      '<strong>Çakıl kaplı düz çatı:</strong> yaklaşık 0,60. Çakıl tabakası suyun önemli bir bölümünü tutar.',
      '<strong>Yeşil çatı:</strong> yaklaşık 0,40 ve altı. Bitki ve toprak katmanı suyun çoğunu kullanır.',
    ] },
    { h: 'Yıllık toplam ile depo boyutu aynı şey değildir', p: [
      'Bu aracın verdiği değer bir yılda toplanabilecek toplam sudur; alınması gereken deponun hacmi değildir. Türkiye\'nin büyük bölümünde yağışın çoğu sonbahar, kış ve ilkbahar aylarında düşer, yaz ayları kurak geçer. Suya en çok ihtiyaç duyulan dönemle yağışın bol olduğu dönem örtüşmez. Bu nedenle depo, yağışlı aylarda biriken suyu kurak döneme taşıyacak büyüklükte seçilir.',
      'Kaba bir başlangıç için birkaç haftalık ihtiyacınızı ya da en yağışlı ayın getirisini karşılayan bir hacim düşünülebilir. Daha doğru bir boyutlandırma için her ayın yağışını bu araca ayrı ayrı girip aylık getiriyi bulun, aylık tüketiminizle karşılaştırın ve depodaki suyun ay ay nasıl değişeceğini bir tabloya dökün. Deponun taşma hattı mutlaka bulunmalı, taşan su binadan uzağa yönlendirilmelidir.',
    ] },
    { h: 'Toplanan su nerelerde kullanılır?', p: [
      'Çatıdan toplanan yağmur suyu en çok bahçe ve sera sulamasında, araç ve zemin yıkamada, rezervuar beslemesinde ve hayvancılıkta kullanılır. Yağmur suyu kireç içermediği için bitki sulamasında ve yıkama işlerinde avantajlıdır. Köy evlerinde, bağ evlerinde ve şebeke suyunun pahalı ya da kesintili olduğu yerlerde su faturasını belirgin biçimde düşürebilir.',
      'Çatıdan gelen su; toz, kuş pisliği, yaprak ve kaplama malzemesinden çözünen maddeler içerebilir. Uygun arıtma ve düzenli analiz yapılmadan <strong>içme ve yemek suyu olarak kullanılmamalıdır</strong>. Depo ışık almayan, kapalı ve sinek girişine karşı korunmuş olmalıdır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap, uzun yıllar ortalamasına dayanan tek bir yağış değerini kullanır; kurak bir yılda getiri belirgin biçimde düşebilir. Kar yağışı, rüzgârla savrulan yağmur, oluk kapasitesinin aşıldığı sağanaklar ve çatıdaki baca, güneş paneli gibi engeller sonucu değiştirir. Sonuç planlama amaçlı bir tahmindir; sistem tasarımı, depo statiği ve tesisat bağlantıları için bir mühendise ya da uzman uygulayıcıya danışın. Yeni yapılarda yağmur suyu toplama sistemine ilişkin zorunluluklar ve belediye uygulamaları değişebildiği için güncel mevzuatı kontrol edin.',
    ] },
  ],
  faq: [
    ['1 mm yağış metrekareye kaç litre su bırakır?', '1 mm yağış, 1 metrekarelik alana tam 1 litre su bırakır. 100 m² bir çatıya 1 mm yağış düştüğünde çatıya ulaşan su 100 litredir; kayıplar düşüldükten sonra bunun 70–80 litresi depoya ulaşır.'],
    ['100 metrekare çatıdan yılda kaç litre su toplanır?', 'Yağışa bağlıdır. Yıllık 500 mm yağış, kiremit çatı (0,80) ve %90 verimle 36.000 litre toplanır. Yağış 800 mm ise aynı çatı 57.600 litre verir. Kendi ilinizin yağış değerini yazarak kesin sonucu görebilirsiniz.'],
    ['Yıllık yağış miktarını nereden öğrenirim?', 'İllerin uzun yıllar ortalamasına ait aylık ve yıllık toplam yağış değerleri resmî meteoroloji istatistiklerinde yayımlanır. Bulunduğunuz ilçe için en yakın ölçüm istasyonunun değerini kullanmak en doğrusudur; dağlık ve kıyı kesimlerde kısa mesafelerde bile yağış belirgin biçimde değişir.'],
    ['Çatı eğimi hesabı değiştirir mi?', 'Alan olarak hayır; hesapta çatının yatay izdüşümü kullanılır. Eğim yalnızca akış katsayısını biraz etkiler: dik çatılarda su daha hızlı aktığı için kayıp azalır, düz çatılarda göllenme ve buharlaşma nedeniyle artar.'],
    ['Filtre verimi için hangi değeri yazmalıyım?', 'İlk yağmur ayırıcısı ve yaprak filtresi olan tipik bir sistemde %85–95 arası değerler kullanılır; emin değilseniz %90 makul bir kabuldür. Hiç filtre ve ayırıcı yoksa %100 yazabilirsiniz, ancak bu durumda depoya kirli su da girer.'],
    ['Kaç litrelik depo almalıyım?', 'Bu, yağışın aylara dağılımına ve tüketiminize bağlıdır. Araç yıllık toplamı ve aylık ortalamayı verir; depoyu seçerken kurak dönemin uzunluğunu ve o dönemdeki günlük ihtiyacınızı çarparak gerekli hacmi kabaca bulabilir, bütçenize ve yerinize göre karar verebilirsiniz.'],
    ['Toplanan yağmur suyu içilir mi?', 'Arıtılmadan ve analiz edilmeden içilmemelidir. Çatı yüzeyinden gelen su mikrobiyolojik ve kimyasal kirlilik taşıyabilir. Sulama, temizlik ve rezervuar gibi içme dışı kullanımlar için uygundur.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız alan ve yağış değerleri hiçbir sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['cati-alani-hesapla', 'su-deposu-hacmi-hesapla', 'tank-doluluk-hesapla', 'boru-hacmi-hesapla', 'havuz-hacmi-hesapla'],
};
