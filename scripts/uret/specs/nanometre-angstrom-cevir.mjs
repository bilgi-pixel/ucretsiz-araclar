export default {
  slug: 'nanometre-angstrom-cevir',
  title: 'Nanometre Angström Çevirici',
  h1Tail: 'nm ↔ Å',
  pageTitle: `Nanometre Angström Çevirici – nm'den Å'ye, Å'den nm'ye Çevirme`,
  description: `Nanometreyi angströme, angströmü nanometreye çevirin. 1 nm = 10 Å eşitliğiyle çalışır; pikometre, mikrometre ve metre karşılıklarını da gösterir.`,
  card: `Nanometre ile angström arasında çeviri yapın; pikometre, mikrometre ve metre karşılıklarını da görün.`,
  category: 'birim',
  keywords: ['nanometre angström çevirme', '1 nm kaç angström', 'angström kaç nanometre', 'angström kaç metre', 'nm Å çevirici', 'pikometre nanometre', 'dalga boyu angström'],
  lead: `Atom ve molekül ölçeğindeki uzunlukları nanometre (nm), angström (Å), pikometre (pm) ve mikrometre (µm) arasında çevirin. Araç <strong>1 nm = 10 Å</strong> tam eşitliğini kullanır ve metre karşılığını bilimsel gösterimle verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzunluk değeri', type: 'number', placeholder: 'Örn. 550' },
    { id: 'kaynak', label: 'Girilen birim', type: 'select', options: [['nm', 'Nanometre (nm)'], ['a', 'Angström (Å)'], ['pm', 'Pikometre (pm)'], ['um', 'Mikrometre (µm)']] },
    { id: 'hedef', label: 'Çevrilecek birim', type: 'select', options: [['a', 'Angström (Å)'], ['nm', 'Nanometre (nm)'], ['pm', 'Pikometre (pm)'], ['um', 'Mikrometre (µm)']] },
  ],
  compute(v, h) {
    // Taban birim pikometre: tüm çarpanlar tam sayıdır.
    const birimler = {
      pm: [1, 'pm'],
      a: [100, 'Å'],
      nm: [1000, 'nm'],
      um: [1e6, 'µm'],
    };
    const x = h.nonneg(v.deger, 'Uzunluk değeri');
    const k = birimler[v.kaynak] || birimler.nm;
    const t = birimler[v.hedef] || birimler.a;
    const pm = Number((x * k[0]).toPrecision(12));
    const yaz = (b) => h.sig(pm / b[0], 9) + ' ' + b[1];
    return {
      rows: [
        ['Sonuç', yaz(t)],
        ['Nanometre', yaz(birimler.nm)],
        ['Angström', yaz(birimler.a)],
        ['Pikometre', yaz(birimler.pm)],
        ['Mikrometre', yaz(birimler.um)],
        ['Metre', h.sig(pm * 1e-12, 9) + ' m'],
      ],
      note: '1 Å = 0,1 nm = 100 pm = 10⁻¹⁰ m. Angström SI birimi değildir ama metreyle ilişkisi tam tanımlıdır; çeviride yuvarlama yoktur.',
    };
  },
  cases: [
    { in: { deger: '1', kaynak: 'nm', hedef: 'a' }, out: { 'Sonuç': '10 Å', 'Pikometre': '1.000 pm', 'Metre': '1 × 10^-9 m' } },
    { in: { deger: '5', kaynak: 'a', hedef: 'nm' }, out: { 'Sonuç': '0,5 nm', 'Pikometre': '500 pm' } },
    { in: { deger: '550', kaynak: 'nm', hedef: 'a' }, out: { 'Sonuç': '5.500 Å', 'Mikrometre': '0,55 µm', 'Metre': '5,5 × 10^-7 m' } },
    { in: { deger: '1,54', kaynak: 'a', hedef: 'pm' }, out: { 'Sonuç': '154 pm', 'Nanometre': '0,154 nm' } },
    { in: { deger: '1', kaynak: 'um', hedef: 'nm' }, out: { 'Sonuç': '1.000 nm', 'Angström': '10.000 Å', 'Metre': '0,000001 m' } },
    { in: { deger: '53', kaynak: 'pm', hedef: 'a' }, out: { 'Sonuç': '0,53 Å', 'Nanometre': '0,053 nm' } },
    { in: { deger: '6562,8', kaynak: 'a', hedef: 'nm' }, out: { 'Sonuç': '656,28 nm' } },
    { in: { deger: 'on', kaynak: 'nm', hedef: 'a' }, error: true },
    { in: { deger: '-3', kaynak: 'nm', hedef: 'a' }, error: true },
  ],
  howto: [
    `"Uzunluk değeri" alanına sayıyı yazın; ondalık için virgül kullanabilirsiniz (örn. 1,54).`,
    `"Girilen birim" listesinden değerin birimini seçin: nanometre, angström, pikometre ya da mikrometre.`,
    `"Çevrilecek birim" listesinden hedef birimi belirleyin.`,
    `"Çevir" düğmesine basın. İlk satır seçtiğiniz birimdeki sonucu, diğer satırlar tüm karşılıkları ve metre değerini gösterir.`,
    `Rapor ya da ödeve aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Angström nedir, nanometreyle ilişkisi nasıldır?', p: [
      `Angström (Å), metrenin on milyarda biri olan bir uzunluk birimidir: 1 Å = 10<sup>−10</sup> m. Adını, güneş ışığının tayfı üzerine çalışan İsveçli fizikçi Anders Jonas Ångström'den alır. Birimin bu kadar tutulmasının nedeni basittir: atomların çapı ve atomlar arasındaki bağ uzunlukları 1 Å dolayındadır, dolayısıyla atom ölçeğindeki uzunluklar virgülsüz, kolay okunur sayılarla yazılabilir.`,
      `Nanometre ise metrenin milyarda biridir: 1 nm = 10<sup>−9</sup> m. İkisinin arasında tam on kat vardır: <strong>1 nm = 10 Å</strong> ve <strong>1 Å = 0,1 nm</strong>. Nanometreden angströme geçmek için değeri 10 ile çarpar, angströmden nanometreye geçmek için 10'a bölersiniz. Pikometre bir alt basamaktır: 1 Å = 100 pm, 1 nm = 1.000 pm. Mikrometre (mikron) ise bir üst basamaktır: 1 µm = 1.000 nm = 10.000 Å.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `İnsan gözünün en duyarlı olduğu yeşil ışığın dalga boyu yaklaşık 550 nm'dir. Angström karşılığı 550 × 10 = <strong>5.500 Å</strong>, mikrometre karşılığı 550 ÷ 1.000 = 0,55 µm, metre karşılığı 5,5 × 10<sup>−7</sup> m olur.`,
      `Ters yönde bir örnek: organik kimyada karbon-karbon tekli bağının uzunluğu yaklaşık 1,54 Å olarak verilir. Nanometre cinsinden 1,54 ÷ 10 = 0,154 nm, pikometre cinsinden 1,54 × 100 = <strong>154 pm</strong> eder. Gökbilim kaynaklarında hidrojenin kırmızı tayf çizgisi 6.562,8 Å olarak geçer; bu değer 656,28 nm'ye karşılık gelir.`,
    ] },
    { h: 'Hangi alanda hangi birim tercih edilir?', p: [
      `Angström SI sisteminin parçası değildir, ama bazı alanlarda alışkanlık olarak yaşamayı sürdürür. Kristalografide ve yapısal biyolojide atomlar arası uzaklıklar ile protein yapılarının çözünürlüğü angströmle bildirilir. Gökbilimde tayf çizgilerinin dalga boyları uzun süre angströmle yazılmıştır ve eski kataloglarla çalışırken çeviri gerekir.`,
      `Nanometre, günümüzde çok daha yaygın birimdir. Görünür ışığın dalga boyu yaklaşık 380 ile 750 nm arasındadır; lazerlerin, LED'lerin ve optik filtrelerin değerleri nanometreyle etiketlenir. Yarı iletken üretim teknolojileri, ince film kaplamalar ve nanoparçacık boyutları da nanometreyle anlatılır. Pikometre ise güncel kimya kaynaklarında atom yarıçapları ve bağ uzunlukları için angströmün SI uyumlu karşılığı olarak kullanılır.`,
    ] },
    { h: 'Ölçeği kavramak için başvuru değerleri', ul: [
      `<strong>Hidrojen atomunun Bohr yarıçapı:</strong> yaklaşık 0,53 Å = 53 pm`,
      `<strong>Karbon-karbon tekli bağı:</strong> yaklaşık 1,54 Å = 0,154 nm`,
      `<strong>Su molekülünde O–H bağı:</strong> yaklaşık 0,96 Å`,
      `<strong>DNA çift sarmalının çapı:</strong> yaklaşık 20 Å = 2 nm`,
      `<strong>Mor ışık:</strong> yaklaşık 400 nm = 4.000 Å`,
      `<strong>Yeşil ışık:</strong> yaklaşık 550 nm = 5.500 Å`,
      `<strong>Kırmızı ışık:</strong> yaklaşık 700 nm = 7.000 Å`,
      `<strong>1 mikrometre (mikron):</strong> 1.000 nm = 10.000 Å`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `<strong>Çarpanı ters uygulamak:</strong> angström daha küçük birim olduğu için aynı uzunluğun angström sayısı nanometre sayısından büyüktür. 5 Å, 50 nm değil 0,5 nm'dir.`,
      `<strong>Å simgesini A ile yazıp amperle karıştırmak:</strong> klavyede bulunmadığı için bazen düz A yazılır; uzunluk bağlamında bunun angström olduğunu belirtmek gerekir.`,
      `<strong>Nanometre ile mikrometreyi karıştırmak:</strong> aralarında bin kat vardır. 0,55 µm ile 550 nm aynı uzunluktur.`,
      `<strong>Üs işaretini atlamak:</strong> metreye geçerken 10<sup>−9</sup> ve 10<sup>−10</sup> arasındaki tek basamaklık fark sonucu on kat değiştirir. Emin olmadığınızda sonuçtaki "Metre" satırına bakın.`,
    ] },
    { h: 'Sınırlar ve gösterim', p: [
      `Araç negatif uzunluk kabul etmez. Sonuçlar dokuz anlamlı basamağa kadar gösterilir; milyonda birin altındaki metre değerleri "5,5 × 10^-7" biçiminde bilimsel gösterimle yazılır. Çeviri katsayıları tanım gereği tam olduğundan sonuçtaki tek belirsizlik sizin girdiğiniz ölçümün duyarlılığıdır: üç anlamlı basamakla ölçülmüş bir değeri çeviriden sonra da üç anlamlı basamakla bildirmek doğru olur.`,
    ] },
  ],
  faq: [
    ['1 nanometre kaç angström eder?', `1 nanometre tam olarak 10 angström eder. Nanometre değerini 10 ile çarparak angströme çevirirsiniz; örneğin 2,5 nm 25 Å'dir.`],
    ['1 angström kaç nanometre eder?', `1 angström 0,1 nanometredir. Angström değerini 10'a bölerek nanometreye geçersiniz; 4.000 Å, 400 nm eder.`],
    ['1 angström kaç metredir?', `1 angström metrenin on milyarda biridir, yani 10 üzeri eksi 10 metre. Aynı zamanda 100 pikometreye ve 0,0001 mikrometreye eşittir.`],
    ['Angström SI birimi midir?', `Hayır. Angström SI birimleri arasında yer almaz; SI içinde aynı ölçek nanometre ve pikometreyle ifade edilir. Yine de kristalografi, yapısal biyoloji ve gökbilim gibi alanlarda yaygın olarak kullanılmaya devam eder.`],
    ['Å simgesi klavyede nasıl yazılır?', `Simge, üzerinde halka bulunan büyük A harfidir. Birçok yazı programında özel karakter ekleme menüsünden bulunabilir. Yazılamadığı durumlarda birimin adını açıkça "angström" diye yazmak karışıklığı önler.`],
    ['Görünür ışığın dalga boyu angström olarak ne kadardır?', `Görünür ışık yaklaşık 380 ile 750 nanometre arasındadır; bu da yaklaşık 3.800 ile 7.500 angströme karşılık gelir. Sınırlar kişiden kişiye ve aydınlatma koşuluna göre biraz değişir.`],
    ['Pikometre ile angström arasında nasıl çeviri yapılır?', `1 angström 100 pikometredir. Angström değerini 100 ile çarparak pikometreye, pikometre değerini 100'e bölerek angströme çevirirsiniz; 154 pm, 1,54 Å eder.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar sunucuya iletilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra çevrimdışı da çalışır.`],
  ],
  related: ['mikron-mm-cevir', 'dalga-boyu-frekans-hesapla', 'foton-enerjisi-hesapla', 'bilimsel-gosterim-cevir', 'hertz-kilohertz-cevir'],
};
