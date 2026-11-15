export default {
  slug: 'duzgun-cokgen-alani-hesapla',
  title: 'Düzgün Çokgen Alanı Hesaplama',
  h1Tail: 'beşgen, sekizgen, n-gen',
  pageTitle: 'Düzgün Çokgen Alanı Hesaplama – Beşgen, Sekizgen ve n Kenarlı',
  description: 'Kenar sayısını ve kenar uzunluğunu, çevrel yarıçapı ya da apotemi yazın; düzgün çokgenin alanı, çevresi, apotemi, yarıçapı, iç ve dış açısı hesaplansın.',
  card: 'Beşgenden sekizgene her düzgün çokgenin alanını, çevresini, apotemini ve açılarını kenar sayısından hesaplayın.',
  category: 'matematik',
  keywords: ['düzgün çokgen alanı hesaplama', 'beşgen alanı hesaplama', 'sekizgen alanı hesaplama', 'düzgün çokgen formülü', 'apotem hesaplama', 'çokgen çevrel çember yarıçapı', 'n kenarlı çokgen alanı'],
  lead: `Kenar sayısı üç ve üzeri olan her <strong>düzgün çokgenin</strong> alanını hesaplayın. Kenar uzunluğunu, çevrel çember yarıçapını ya da apotemi bilmeniz yeterlidir; araç alanla birlikte çevreyi, eksik ölçüleri, iç ve dış açıyı ve köşegen sayısını verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kenarSayisi', label: 'Kenar sayısı (n)', type: 'number', placeholder: 'Örn. 5', hint: '3 ile 1.000 arasında tam sayı' },
    { id: 'deger', label: 'Ölçü', type: 'number', placeholder: 'Örn. 1' },
    { id: 'tur', label: 'Yazdığınız ölçü', type: 'select', options: [['kenar', 'Kenar uzunluğu'], ['yaricap', 'Çevrel çember yarıçapı (merkez–köşe)'], ['apotem', 'Apotem (merkez–kenar ortası)']] },
  ],
  compute(v, h) {
    const n = h.int(v.kenarSayisi, 'Kenar sayısı');
    if (n < 3) h.err('Bir çokgenin en az 3 kenarı olur; kenar sayısını 3 ya da daha büyük yazın.');
    if (n > 1000) h.err('Kenar sayısı en fazla 1.000 olabilir.');
    const x = h.pos(v.deger, 'Ölçü');
    const t = Math.PI / n;
    let a;
    if (v.tur === 'yaricap') a = 2 * x * Math.sin(t);
    else if (v.tur === 'apotem') a = 2 * x * Math.tan(t);
    else a = x;
    const apotem = a / (2 * Math.tan(t));
    const R = a / (2 * Math.sin(t));
    const alan = n * a * apotem / 2;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(n * a, 4) + ' birim'],
        ['Apotem', h.fmt(apotem, 4) + ' birim'],
        ['Çevrel çember yarıçapı', h.fmt(R, 4) + ' birim'],
        ['İç açı', h.fmt(180 * (n - 2) / n, 4) + '°'],
        ['Dış açı (merkez açı)', h.fmt(360 / n, 4) + '°'],
        ['Köşegen sayısı', h.fmt(n * (n - 3) / 2, 0)],
      ],
      note: 'Alan = çevre × apotem ÷ 2 = n·a² ÷ (4·tan(180°/n)). Formül yalnızca bütün kenarları ve açıları eşit (düzgün) çokgenler için geçerlidir.',
    };
  },
  cases: [
    { in: { kenarSayisi: '5', deger: '1', tur: 'kenar' }, out: { 'Alan': '1,7205 birim²', 'Çevre': '5 birim', 'İç açı': '108°', 'Dış açı (merkez açı)': '72°', 'Köşegen sayısı': '5' } },
    { in: { kenarSayisi: '4', deger: '5', tur: 'kenar' }, out: { 'Alan': '25 birim²', 'Apotem': '2,5 birim', 'Çevrel çember yarıçapı': '3,5355 birim', 'İç açı': '90°' } },
    { in: { kenarSayisi: '3', deger: '2', tur: 'kenar' }, out: { 'Alan': '1,7321 birim²', 'İç açı': '60°', 'Köşegen sayısı': '0' } },
    { in: { kenarSayisi: '8', deger: '1', tur: 'kenar' }, out: { 'Alan': '4,8284 birim²', 'İç açı': '135°', 'Köşegen sayısı': '20' } },
    { in: { kenarSayisi: '6', deger: '1', tur: 'kenar' }, out: { 'Alan': '2,5981 birim²', 'Çevrel çember yarıçapı': '1 birim' } },
    { in: { kenarSayisi: '12', deger: '1', tur: 'yaricap' }, out: { 'Alan': '3 birim²', 'Kenar': '0,5176 birim', 'İç açı': '150°' } },
    { in: { kenarSayisi: '4', deger: '1', tur: 'yaricap' }, out: { 'Alan': '2 birim²', 'Kenar': '1,4142 birim' } },
    { in: { kenarSayisi: '4', deger: '2', tur: 'apotem' }, out: { 'Alan': '16 birim²', 'Kenar': '4 birim', 'Çevre': '16 birim' } },
    { in: { kenarSayisi: '5', deger: '10', tur: 'kenar' }, out: { 'Alan': '172,0477 birim²' } },
    { in: { kenarSayisi: '2', deger: '1', tur: 'kenar' }, error: true },
    { in: { kenarSayisi: '5,5', deger: '1', tur: 'kenar' }, error: true },
    { in: { kenarSayisi: '5', deger: '-1', tur: 'kenar' }, error: true },
  ],
  howto: [
    `"Kenar sayısı" kutusuna çokgenin kaç kenarlı olduğunu yazın: üçgen için 3, beşgen için 5, sekizgen için 8 gibi.`,
    `"Ölçü" kutusuna bildiğiniz uzunluğu girin ve yanındaki listeden bunun kenar uzunluğu, çevrel çember yarıçapı ya da apotem olduğunu seçin.`,
    `"Hesapla" düğmesine basın. Alan en üstte; kenar, çevre, apotem, yarıçap, açılar ve köşegen sayısı altında görünür.`,
    `Farklı kenar sayılarını deneyerek aynı yarıçapta alanın daireye nasıl yaklaştığını gözlemleyebilirsiniz.`,
  ],
  sections: [
    { h: 'Düzgün çokgen nedir?', p: [
      `Bütün kenarları eşit uzunlukta ve bütün iç açıları eşit olan çokgene düzgün çokgen denir. Eşkenar üçgen, kare, düzgün beşgen, düzgün altıgen ve düzgün sekizgen en bilinen örneklerdir. Yalnızca kenarların eşit olması yetmez: eşkenar dörtgenin kenarları eşittir ama açıları eşit olmadığından düzgün çokgen sayılmaz.`,
      `Her düzgün çokgenin bir merkezi vardır. Merkezden köşelere olan uzaklık <strong>çevrel çember yarıçapı</strong> (R), merkezden kenarların orta noktasına inen dikmenin uzunluğu ise <strong>apotem</strong> (iç teğet çember yarıçapı) olarak adlandırılır.`,
    ] },
    { h: 'Alan formülü nereden gelir?', p: [
      `Merkezi köşelere birleştirdiğinizde n kenarlı düzgün çokgen, n tane eş ikizkenar üçgene ayrılır. Her üçgenin tabanı bir kenar (a), yüksekliği apotemdir. Tek üçgenin alanı a × apotem ÷ 2 olduğundan toplam alan <strong>n × a × apotem ÷ 2</strong>, yani <strong>çevre × apotem ÷ 2</strong> eder.`,
      `Apotem, kenar uzunluğundan trigonometriyle bulunur: apotem = a ÷ (2 · tan(180° ÷ n)). Yerine koyunca yalnızca kenara bağlı formül elde edilir: <strong>Alan = n · a² ÷ (4 · tan(180° ÷ n))</strong>. Yarıçap biliniyorsa aynı alan <strong>½ · n · R² · sin(360° ÷ n)</strong> şeklinde de yazılabilir.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Düzgün beşgen, kenar 1:</strong> tan 36° ≈ 0,72654 olduğundan alan 5 × 1 ÷ (4 × 0,72654) ≈ <strong>1,7205 birim²</strong>. Kenar 10 olursa alan kenarın karesiyle büyür ve yüz katına, 172,0477 birim²'ye çıkar. İç açı 108°, dış açı 72°'dir.`,
      `<strong>Düzgün sekizgen, kenar 1:</strong> alan 2 · (1 + √2) ≈ <strong>4,8284 birim²</strong>, iç açı 135°, köşegen sayısı 20'dir.`,
      `<strong>Kare, kenar 5:</strong> formül 4 × 25 ÷ (4 × tan 45°) = <strong>25</strong> sonucunu verir; apotem kenarın yarısı olan 2,5, yarıçap köşegenin yarısı olan yaklaşık 3,5355 birimdir. Bildiğiniz kare formülüyle aynı sonucun çıkması, genel formülün sağlamasıdır.`,
      `<strong>Düzgün onikigen, yarıçap 1:</strong> alan ½ × 12 × 1² × sin 30° = <strong>3 birim²</strong>. Aynı yarıçaplı dairenin alanı π ≈ 3,1416 olduğundan onikigen daireyi yaklaşık yüzde 95,5 oranında doldurur.`,
    ] },
    { h: 'Açılar ve köşegen sayısı', ul: [
      `<strong>İç açı:</strong> (n − 2) × 180° ÷ n. Beşgende 108°, altıgende 120°, sekizgende 135°, ongende 144°.`,
      `<strong>Dış açı ve merkez açı:</strong> 360° ÷ n. İç açı ile dış açının toplamı her zaman 180°'dir.`,
      `<strong>İç açılar toplamı:</strong> (n − 2) × 180°. Üçgende 180°, dörtgende 360°, beşgende 540°.`,
      `<strong>Köşegen sayısı:</strong> n × (n − 3) ÷ 2. Üçgenin köşegeni yoktur; karenin 2, beşgenin 5, altıgenin 9, sekizgenin 20 köşegeni vardır.`,
    ] },
    { h: 'Kenar sayısı arttıkça çokgen daireye yaklaşır', p: [
      `Yarıçapı sabit tutup kenar sayısını artırdığınızda çokgen çevrel çemberini giderek daha iyi doldurur. Yarıçap 1 iken kare 2, altıgen yaklaşık 2,5981, onikigen 3 birim² alan kaplar; kenar sayısı büyüdükçe değer π'ye yaklaşır. Arşimet, pi sayısını tam da bu yöntemle, çembere içten ve dıştan 96 kenarlı çokgenler çizerek sınırlandırmıştır. Araçta kenar sayısını 96, yarıçapı 1 yazarak onun ulaştığı yaklaşık değeri kendiniz görebilirsiniz.`,
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      `Sekizgen biçimli kamelya, çardak ve şadırvan tabanlarında zemin kaplaması ve çatı malzemesi, sekizgenin alanından hesaplanır; bu yapılarda genellikle bir kenar uzunluğu ya da karşılıklı iki kenar arası (apotemin iki katı) ölçülür. Trafik levhaları, madeni paralar, masa tablaları, somun ve cıvata başları, geleneksel Türk süsleme sanatındaki geometrik yıldız desenleri ve bilgisayar grafiklerinde dairenin çokgenle yaklaşık çizimi de düzgün çokgen hesabına dayanır.`,
      `Matematik derslerinde çokgenler konusu, iç ve dış açı sorularının yanında alan ve çevre ilişkilerini de kapsar. Sonucu elle bulduktan sonra burada kontrol etmek, özellikle tanjant değerinin yanlış okunmasından kaynaklanan hataları ortaya çıkarır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Formülü düzgün olmayan çokgene uygulamak. Kenarları ya da açıları eşit değilse şekli üçgenlere bölerek hesaplayın.`,
      `Apotem ile çevrel çember yarıçapını karıştırmak. Yarıçap köşeye, apotem kenar ortasına ölçülür; yarıçap her zaman daha uzundur.`,
      `Hesap makinesinde açı birimini radyanda bırakıp tan(180 ÷ n) değerini yanlış bulmak.`,
      `Kenar sayısına ondalıklı ya da 3'ten küçük değer yazmak. Araç yalnızca 3 ile 1.000 arasındaki tam sayıları kabul eder.`,
    ], p: [
      `Sonuçlar dört ondalık basamağa yuvarlanır ve girdiğiniz uzunluk biriminin karesi cinsindendir. Yapı ve imalat işlerinde kesim payı, derz ve fire ayrıca eklenmelidir.`,
    ] },
  ],
  faq: [
    ['Düzgün çokgenin alanı nasıl hesaplanır?', 'Çevre ile apotem çarpılıp ikiye bölünür. Yalnızca kenar biliniyorsa n · a² ÷ (4 · tan(180° ÷ n)) formülü kullanılır. Kenarı 1 olan düzgün beşgenin alanı yaklaşık 1,7205 birim karedir.'],
    ['Düzgün beşgenin alanı nasıl bulunur?', 'Kenar uzunluğunun karesi yaklaşık 1,7205 ile çarpılır. Kenarı 10 birim olan düzgün beşgenin alanı yaklaşık 172,05 birim karedir. Araçta kenar sayısına 5 yazmanız yeterlidir.'],
    ['Düzgün sekizgenin alanı nasıl hesaplanır?', 'Kenar uzunluğunun karesi 2 · (1 + √2), yani yaklaşık 4,8284 ile çarpılır. Kenarı 1 birim olan düzgün sekizgenin alanı 4,8284 birim karedir.'],
    ['Apotem ne demektir?', 'Düzgün çokgenin merkezinden bir kenarın orta noktasına inen dikmenin uzunluğudur. İç teğet çemberin yarıçapına eşittir ve alan formülünde yükseklik görevi görür.'],
    ['İç açı nasıl hesaplanır?', 'Kenar sayısından iki çıkarılır, 180 ile çarpılır ve kenar sayısına bölünür. Sekizgen için (8 − 2) × 180 ÷ 8 = 135 derece bulunur.'],
    ['Düzgün olmayan çokgenin alanını bu araçla bulabilir miyim?', 'Hayır. Buradaki formüller bütün kenarların ve açıların eşit olduğunu varsayar. Düzensiz bir çokgeni üçgenlere ayırıp her birinin alanını ayrı hesaplayarak toplamanız gerekir.'],
    ['Kenar sayısı için neden üst sınır var?', 'Kenar sayısı çok büyüdüğünde çokgen pratikte daireden ayırt edilemez; bu durumda daire formüllerini kullanmak daha anlamlıdır. Araç 1.000 kenara kadar hesap yapar.'],
    ['Girdiğim sayılar saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['altigen-alani-hesapla', 'cokgen-ic-aci-hesapla', 'ucgen-alani-hesapla', 'daire-alani-hesapla', 'alan-cevre-hesapla'],
};
