export default {
  slug: 'satir-numarasi-ekle',
  title: 'Satır Numarası Ekleme',
  h1Tail: 'metni otomatik numaralandırın',
  pageTitle: 'Satır Numarası Ekleme – Metni ve Listeyi Otomatik Numaralandırma',
  description: 'Metninizin her satırının başına sıra numarası ekleyin. Başlangıç sayısını, artışı, numara biçimini ve hizalamayı seçin; boş satırları atlayın, sonucu kopyalayın.',
  card: 'Satırların başına 1., 2), [3] gibi sıra numarası ekleyin; başlangıç, artış, sıfır doldurma ve boş satır seçenekleriyle.',
  category: 'metin',
  keywords: ['satır numarası ekleme', 'metin numaralandırma', 'liste numaralandırma', 'satır başına numara', 'otomatik numara verme', 'satır numaralandır', 'numaralı liste oluşturma'],
  lead: 'Alt alta yazılmış satırların başına otomatik <strong>sıra numarası</strong> ekleyin. Numaranın hangi sayıdan başlayacağını, kaçar kaçar artacağını, noktayla mı parantezle mi yazılacağını ve basamakların nasıl hizalanacağını siz belirlersiniz.',
  button: 'Numaralandır',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Her satır ayrı numara alır', rows: 8 },
    { id: 'baslangic', label: 'Başlangıç numarası', type: 'number', value: '1' },
    { id: 'artis', label: 'Artış', type: 'number', value: '1', hint: 'Örn. 10 yazarsanız 10, 20, 30…' },
    { id: 'bicim', label: 'Numara biçimi', type: 'select', options: [['nokta', '1. Satır'], ['parantez', '1) Satır'], ['ikinokta', '1: Satır'], ['tire', '1 - Satır'], ['koseli', '[1] Satır'], ['sekme', '1 (sekme) Satır'], ['bosluk', '1 Satır']] },
    { id: 'hiza', label: 'Basamak hizalama', type: 'select', options: [['yok', 'Hizalama yok'], ['sifir', 'Başa sıfır ekle (01, 02…)'], ['bosluk', 'Boşlukla sağa yasla']] },
    { id: 'bos', label: 'Boş satırlar', type: 'select', options: [['atla', 'Numara verme, yerinde bırak'], ['numarala', 'Numara ver'], ['sil', 'Sil']] },
  ],
  compute(v, h) {
    const ham = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (ham.trim() === '') h.err('Numaralandırılacak metni yazın.');
    const bas = h.int(v.baslangic, 'Başlangıç numarası');
    const artis = h.int(v.artis, 'Artış');
    if (artis === 0) h.err('"Artış" sıfır olamaz; 1 ya da başka bir tam sayı yazın.');
    if (Math.abs(bas) > 1e9 || Math.abs(artis) > 1e6) h.err('Başlangıç en çok 1.000.000.000, artış en çok 1.000.000 olabilir.');
    let satirlar = ham.split('\n');
    while (satirlar.length && satirlar[satirlar.length - 1].trim() === '') satirlar.pop();
    if (v.bos === 'sil') satirlar = satirlar.filter((s) => s.trim() !== '');
    if (satirlar.length > 200000) h.err('En fazla 200.000 satır numaralandırılabilir.');
    const numaraAlir = (s) => v.bos === 'numarala' || s.trim() !== '';
    const adet = satirlar.filter(numaraAlir).length;
    const son = bas + (adet - 1) * artis;
    const yaz = (n) => (n < 0 ? '-' : '') + String(Math.abs(n));
    const genislik = Math.max(yaz(bas).length, yaz(son).length);
    const numaraMetni = (n) => {
      const t = yaz(n);
      if (v.hiza === 'bosluk') return t.padStart(genislik, ' ');
      if (v.hiza === 'sifir') {
        const rakam = String(Math.abs(n));
        const hedef = genislik - (n < 0 ? 1 : 0);
        return (n < 0 ? '-' : '') + rakam.padStart(Math.max(hedef, rakam.length), '0');
      }
      return t;
    };
    const SARMA = {
      nokta: (t) => t + '. ', parantez: (t) => t + ') ', ikinokta: (t) => t + ': ', tire: (t) => t + ' - ',
      koseli: (t) => '[' + t + '] ', sekme: (t) => t + '\t', bosluk: (t) => t + ' ',
    };
    const sar = SARMA[v.bicim] || SARMA.nokta;
    let n = bas;
    const cikti = satirlar.map((s) => {
      if (!numaraAlir(s)) return s;
      const satir = sar(numaraMetni(n)) + s;
      n += artis;
      return satir;
    });
    return {
      rows: [
        ['Numaralanan satır', h.fmt(adet, 0)],
        ['İlk numara', yaz(bas)],
        ['Son numara', yaz(son)],
        ['Toplam satır', h.fmt(satirlar.length, 0)],
      ],
      text: cikti.join('\n'),
    };
  },
  cases: [
    { in: { metin: 'elma\narmut\nkiraz' }, text: '1. elma\n2. armut\n3. kiraz', out: { 'Numaralanan satır': '3', 'Son numara': '3' } },
    { in: { metin: 'giriş\ngelişme\nsonuç', baslangic: '10', artis: '10', bicim: 'parantez' }, text: '10) giriş\n20) gelişme\n30) sonuç', out: { 'İlk numara': '10', 'Son numara': '30' } },
    { in: { metin: 'a\n\nb', bos: 'atla' }, text: '1. a\n\n2. b', out: { 'Numaralanan satır': '2', 'Toplam satır': '3' } },
    { in: { metin: 'a\n\nb', bos: 'numarala', bicim: 'ikinokta' }, text: '1: a\n2: \n3: b', out: { 'Numaralanan satır': '3' } },
    { in: { metin: 'a\n\nb\n\n', bos: 'sil', bicim: 'koseli' }, text: '[1] a\n[2] b', out: { 'Toplam satır': '2' } },
    { in: { metin: 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj', hiza: 'sifir' }, textMatch: '^01\\. a\\n02\\. b[^]*\\n09\\. i\\n10\\. j$', out: { 'Son numara': '10' } },
    { in: { metin: 'x\ny\nz', baslangic: '8', hiza: 'bosluk', bicim: 'tire' }, text: ' 8 - x\n 9 - y\n10 - z' },
    { in: { metin: 'üç\niki\nbir', baslangic: '3', artis: '-1', bicim: 'bosluk' }, text: '3 üç\n2 iki\n1 bir', out: { 'Son numara': '1' } },
    { in: { metin: 'ad\tsoyad', bicim: 'sekme', baslangic: '0' }, text: '0\tad\tsoyad' },
    { in: { metin: '' }, error: true },
    { in: { metin: 'a', artis: '0' }, error: true },
    { in: { metin: 'a', baslangic: '1,5' }, error: true },
  ],
  howto: [
    'Numaralandırmak istediğiniz metni kutuya yazın ya da yapıştırın. Her satır sonu yeni bir satır sayılır.',
    '"Başlangıç numarası" ve "Artış" alanlarını ayarlayın. Varsayılan değerlerle numaralar 1, 2, 3 diye ilerler.',
    '"Numara biçimi" listesinden numaradan sonra gelecek işareti seçin: nokta, parantez, iki nokta, tire, köşeli parantez, sekme ya da yalnızca boşluk.',
    'Gerekirse "Basamak hizalama" ile numaraları aynı genişliğe getirin ve "Boş satırlar" ile boş satırlara ne yapılacağını belirleyin.',
    '"Numaralandır" düğmesine basıp sonucu kopyalayın.',
  ],
  sections: [
    { h: 'Satır numarası eklemek ne zaman gerekir?', p: [
      'Kelime işlemciler numaralı liste özelliği sunar, ancak bu numaralar çoğu zaman biçimlendirmenin parçasıdır; metni e-postaya, mesajlaşma uygulamasına, bir form alanına ya da düz metin dosyasına taşıdığınızda kaybolabilir veya bozulabilir. Bu araç numarayı doğrudan metnin içine, gerçek karakter olarak yazar. Böylece nereye yapıştırırsanız yapıştırın numaralar yerinde kalır.',
      'Tipik kullanım alanları şunlardır: toplantı gündemi ve yapılacaklar listesi hazırlamak, sınav ya da anket sorularını numaralandırmak, bir tarifin adımlarını sıraya koymak, dilekçe ekindeki belge listesini numaralamak, bir şiirin ya da metnin dizelerine atıf yapabilmek için satır numarası vermek ve bir kod parçasını ya da günlük kaydını anlatırken "14. satıra bakın" diyebilmek. Hesap tablosuna yapıştırılacak verilerde sekmeli biçim seçildiğinde numara ayrı bir sütuna düşer.',
    ] },
    { h: 'Başlangıç ve artış nasıl çalışır?', p: [
      'İlk numaralanan satır başlangıç değerini alır; sonraki her satırda numara artış kadar büyür. Formül basittir: <strong>n. satırın numarası = başlangıç + (n − 1) × artış</strong>. Başlangıç 1 ve artış 1 ise bildiğimiz 1, 2, 3 sırası oluşur.',
      'Başlangıcı değiştirmek, uzun bir listeyi parçalar hâlinde numaralandırırken işe yarar: ilk bölüm 25. maddede bittiyse ikinci bölümü 26\'dan başlatırsınız. Programcıların sıfırdan saymaya alışkın olduğu durumlarda başlangıca 0 yazılabilir. Artışı 10 yapmak ise eski bir alışkanlığın modern karşılığıdır: 10, 20, 30 diye numaralanan maddelerin arasına sonradan 15 numaralı yeni bir madde eklemek, tüm listeyi yeniden numaralamadan mümkün olur.',
      'Artış negatif de olabilir. Başlangıç 3 ve artış −1 seçildiğinde satırlar 3, 2, 1 diye geriye doğru numaralanır; geri sayım ya da "ilk 10" türü sıralamalarda kullanılır. Artışın sıfır olmasına izin verilmez, çünkü bütün satırlar aynı numarayı alırdı.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Kutuya alt alta <code>giriş</code>, <code>gelişme</code>, <code>sonuç</code> yazın; başlangıcı 10, artışı 10 yapın ve biçim olarak "1) Satır" seçin. Sonuç şu üç satırdır: <code>10) giriş</code>, <code>20) gelişme</code>, <code>30) sonuç</code>. Son numara formülle de doğrulanabilir: 10 + (3 − 1) × 10 = 30.',
      'Varsayılan ayarlarla <code>elma</code>, <code>armut</code>, <code>kiraz</code> satırları <code>1. elma</code>, <code>2. armut</code>, <code>3. kiraz</code> olur. Arada boş bir satır bulunan <code>a</code>, (boş), <code>b</code> metninde "Numara verme" seçiliyken boş satır yerinde kalır ve sonuç <code>1. a</code>, (boş), <code>2. b</code> biçimindedir; yani numaralar boş satırı atlayıp kesintisiz devam eder.',
    ] },
    { h: 'Basamak hizalama: 01, 02 ya da sağa yaslı', p: [
      'Dokuzdan fazla satır olduğunda tek ve çift basamaklı numaralar farklı genişlikte durur ve metin sütunu kayar. Hizalama seçenekleri bunu giderir. Araç önce en uzun numaranın kaç basamak olduğuna bakar, sonra bütün numaraları o genişliğe getirir.',
    ], ul: [
      '<strong>Başa sıfır ekle:</strong> 10 satırlık listede numaralar 01, 02, … 10; 150 satırlık listede 001, 002, … 150 olur. Dosya adı gibi alfabetik sıralanan yerlerde doğru sıranın korunmasını sağlar, çünkü sıfırsız yazımda "10" alfabetik olarak "2"den önce gelir.',
      '<strong>Boşlukla sağa yasla:</strong> Kısa numaraların önüne boşluk konur. Eş aralıklı yazı tipiyle görüntülenen kod ve günlük dosyalarında okunaklı bir sütun oluşturur.',
      '<strong>Hizalama yok:</strong> Numaralar olduğu gibi yazılır; kısa listeler ve gündelik mesajlar için yeterlidir.',
    ] },
    { h: 'Boş satır seçenekleri', p: [
      'Paragraflar arasında boşluk bırakılmış bir metinde boş satırlara numara vermek genellikle istenmez. Varsayılan seçenek boş satırları yerinde bırakır ama numaralandırmaz. "Numara ver" seçeneği, bir dosyanın gerçek satır numaralarını göstermek istediğinizde uygundur; kod düzenleyicilerdeki satır numaraları boş satırları da sayar. "Sil" seçeneği ise boş satırları tamamen kaldırıp sıkışık bir liste üretir. Yalnızca boşluk ya da sekme içeren satırlar da boş sayılır. Metnin en sonundaki boş satırlar hiçbir seçenekte numaralanmaz.',
    ] },
    { h: 'Dikkat edilecek noktalar', ul: [
      'Metniniz zaten numaralıysa araç eski numaraları silmez; yenisini başa ekler. Önce eski numaraları temizlemeniz gerekir.',
      'Uzun bir paragraf ekranda birkaç satıra sarılmış görünse de içinde satır sonu yoksa tek satır sayılır ve tek numara alır.',
      'Satırların başındaki girintiler korunur; numara girintinin önüne yazılır.',
      'Sekmeli biçim, sonucu hesap tablosuna yapıştırdığınızda numarayı ve metni ayrı sütunlara yerleştirir.',
      'Tek seferde en fazla 200.000 satır işlenir.',
    ] },
  ],
  faq: [
    ['Numaralandırmayı 1 dışında bir sayıdan başlatabilir miyim?', 'Evet. "Başlangıç numarası" alanına istediğiniz tam sayıyı yazın. 0, 26, 100 ya da negatif bir sayı olabilir; ilk numaralanan satır bu değeri alır.'],
    ['Boş satırlara numara verilmesini nasıl engellerim?', '"Boş satırlar" seçeneğini "Numara verme, yerinde bırak" konumunda tutun. Boş satırlar metinde kalır ama sayıma katılmaz; numaralar dolu satırlar arasında kesintisiz ilerler.'],
    ['01, 02, 03 biçiminde numara nasıl yazdırırım?', '"Basamak hizalama" listesinden "Başa sıfır ekle" seçeneğini seçin. Sıfır sayısı listenin uzunluğuna göre kendiliğinden ayarlanır: 99 satıra kadar iki, 999 satıra kadar üç basamak kullanılır.'],
    ['Numaraları tersten, büyükten küçüğe verebilir miyim?', 'Evet. Başlangıca en büyük numarayı, artışa −1 yazın. Örneğin 10 satırlık bir liste için başlangıç 10 ve artış −1 seçildiğinde numaralar 10\'dan 1\'e doğru iner.'],
    ['Numarayı satırın sonuna ekleyebilir miyim?', 'Bu araç numarayı satır başına yazar. Satır sonuna sabit bir ifade eklemek için ön ek ve son ek ekleme aracını kullanabilirsiniz; ancak o araç sabit metin ekler, artan numara üretmez.'],
    ['Harfle (a, b, c) ya da Roma rakamıyla numaralandırma var mı?', 'Hayır, araç yalnızca sayı kullanır. Kısa listelerde harfleri elle yazmak daha pratiktir; Roma rakamı karşılıkları için sitedeki Roma rakamı çeviricisinden yararlanabilirsiniz.'],
    ['Sonucu hesap tablosuna yapıştırınca numara ayrı sütuna düşer mi?', 'Numara biçimini "1 (sekme) Satır" seçerseniz evet. Sekme karakteri hesap tablolarında sütun ayırıcı olarak yorumlanır; numara birinci, metin ikinci sütuna yerleşir.'],
    ['Metnim sunucuya gönderiliyor mu?', 'Hayır. Numaralandırma tarayıcınızın içinde yapılır; metniniz hiçbir yere iletilmez, kaydedilmez. Sayfa açıldıktan sonra çevrimdışı da kullanılabilir.'],
  ],
  related: ['onek-sonek-ekle', 'satir-sayaci', 'bos-satirlari-sil', 'alfabetik-sirala', 'satirlari-birlestir'],
};
