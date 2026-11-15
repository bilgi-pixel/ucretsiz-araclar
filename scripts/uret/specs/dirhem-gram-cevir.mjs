export default {
  slug: 'dirhem-gram-cevir',
  title: 'Dirhem ve Miskal Gram Çevirici',
  h1Tail: 'dirhem, miskal ↔ gram',
  pageTitle: 'Dirhem ve Miskal Kaç Gram? Dirhem Miskal Gram Çevirici',
  description: 'Dirhem, miskal ve kıratı grama çevirin. Osmanlı ölçüsüyle 1 dirhem 3,2074 g, 1 miskal 1,5 dirhem yani 4,811 g alınır; gramdan eski ölçülere de çevirir.',
  card: 'Dirhem, miskal ve kıratı grama, gramı bu eski tartı birimlerine çevirin; kuyumculuk ve tarih metinleri için pratik hesap.',
  category: 'birim',
  keywords: ['dirhem kaç gram', '1 dirhem kaç gr', 'miskal kaç gram', '1 miskal altın kaç gram', 'kırat kaç gram', 'dirhem gram çevirme', 'osmanlı tartı birimleri', 'miskal dirhem'],
  lead: 'Eski tariflerde, kuyumcu defterlerinde ve tarih kitaplarında geçen dirhem ve miskal ölçülerini grama çevirin. Araç, Osmanlı çarşısında kullanılan değerleri esas alır: <strong>1 dirhem = 3,2074 gram</strong>, <strong>1 miskal = 1,5 dirhem = 4,811 gram</strong> ve <strong>1 kırat = 1/16 dirhem</strong>.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 20' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['dirhem', 'Dirhem'], ['miskal', 'Miskal (1,5 dirhem)'], ['kirat', 'Kırat (1/16 dirhem)'], ['gram', 'Gram']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const DIRHEM = 3.2073625; // gram (okka 1,282945 kg ÷ 400)
    const dKat = { dirhem: 1, miskal: 1.5, kirat: 1 / 16 };
    let dirhem;
    if (v.birim === 'gram') dirhem = x / DIRHEM;
    else if (dKat[v.birim]) dirhem = x * dKat[v.birim];
    else h.err('Listeden geçerli bir birim seçin.');
    const gram = v.birim === 'gram' ? x : dirhem * DIRHEM;
    const s = {
      gram: ['Gram', h.fmt(gram, 4) + ' g'],
      dirhem: ['Dirhem', h.fmt(dirhem, 4) + ' dirhem'],
      miskal: ['Miskal', h.fmt(dirhem / 1.5, 4) + ' miskal'],
      kirat: ['Kırat', h.fmt(dirhem * 16, 3) + ' kırat'],
    };
    const sira = v.birim === 'gram' ? ['dirhem', 'miskal', 'kirat'] : ['gram', 'dirhem', 'miskal', 'kirat'];
    const rows = sira.filter((k) => k !== v.birim).map((k) => s[k]);
    rows.push(['Okka', h.fmt(dirhem / 400, 5) + ' okka']);
    return {
      rows,
      note: 'Osmanlı çarşı (örfi) ölçüsü kullanılmıştır: 1 dirhem = 3,2073625 g. Dinî hesaplarda esas alınan şer\'i dirhem ve miskal daha hafiftir; bu araç onları hesaplamaz.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'dirhem' }, out: { 'Gram': '3,2074 g', 'Miskal': '0,6667 miskal', 'Kırat': '16 kırat' } },
    { in: { deger: '1', birim: 'miskal' }, out: { 'Gram': '4,811 g', 'Dirhem': '1,5 dirhem', 'Kırat': '24 kırat' } },
    { in: { deger: '100', birim: 'gram' }, out: { 'Dirhem': '31,1783 dirhem', 'Miskal': '20,7855 miskal' } },
    { in: { deger: '400', birim: 'dirhem' }, out: { 'Gram': '1.282,945 g', 'Okka': '1 okka' } },
    { in: { deger: '10', birim: 'miskal' }, out: { 'Gram': '48,1104 g', 'Dirhem': '15 dirhem' } },
    { in: { deger: '1', birim: 'kirat' }, out: { 'Gram': '0,2005 g', 'Dirhem': '0,0625 dirhem' } },
    { in: { deger: '0', birim: 'dirhem' }, out: { 'Gram': '0 g' } },
    { in: { deger: 'yüz', birim: 'dirhem' }, error: true },
    { in: { deger: '-2', birim: 'gram' }, error: true },
  ],
  howto: [
    '"Değer" alanına miktarı yazın; ondalık kısım için virgül kullanın.',
    '"Girilen değerin birimi" listesinden dirhem, miskal, kırat ya da gram seçin.',
    '"Çevir" düğmesine basın. Eski bir ölçü girdiyseniz ilk satırda gram, gram girdiyseniz dirhem karşılığı görünür.',
    'Alt satırlarda aynı ağırlığın miskal, kırat ve okka cinsinden değerlerini inceleyin.',
    'Sonucu kopyalayarak tarif defterinize, ödevinize ya da araştırma notlarınıza ekleyin.',
  ],
  sections: [
    { h: 'Dirhem nedir?', p: [
      'Dirhem, kökeni Eski Yunan\'ın drahmisine uzanan ve hem para hem ağırlık birimi olarak yüzyıllarca kullanılmış bir ölçüdür. Osmanlı ağırlık sisteminde en küçük gündelik tartı birimi dirhemdir ve okkanın dört yüzde biridir. Okka 1,282945 kilogram olduğundan bir dirhem 1.282,945 ÷ 400 = <strong>3,2073625 gram</strong> eder.',
      'Dirhem, az miktarda satılan değerli malların ölçüsüydü: baharat, safran, ipek, gümüş, ilaç ham maddeleri ve tütün dirhemle tartılırdı. Aktarların ve eczacıların pirinç dirhem takımları, iç içe geçen küçük ağırlıklardan oluşurdu. Eski yemek ve macun tariflerinde "yirmi dirhem tarçın, on dirhem karanfil" gibi ifadeler bu yüzden yaygındır.',
    ] },
    { h: 'Miskal nedir?', p: [
      'Miskal, altın ve değerli taş gibi daha da kıymetli maddelerin tartısında kullanılan birimdir. Osmanlı ölçüsünde bir miskal bir buçuk dirhem, yani 1,5 × 3,2073625 = <strong>4,81104375 gram</strong> kabul edilir. Araç bunu dört ondalıkla 4,811 g olarak gösterir.',
      'Miskal 24 kırata bölünür. Kuyumculukta saf altının "24 ayar" olarak adlandırılması, bir bütünü yirmi dört eşit paya bölen bu eski tartı geleneğiyle bağlantılıdır: 18 ayar denildiğinde yirmi dört payın on sekizinin altın olduğu anlaşılır. Gül yağı gibi çok değerli ürünlerin de geleneksel olarak miskalle satıldığı bilinir.',
    ] },
    { h: 'Birimler arasındaki ilişki', ul: [
      '<strong>1 kırat</strong> = 1/16 dirhem ≈ 0,2005 gram',
      '<strong>1 dirhem</strong> = 16 kırat ≈ 3,2074 gram',
      '<strong>1 miskal</strong> = 1,5 dirhem = 24 kırat ≈ 4,811 gram',
      '<strong>1 okka</strong> = 400 dirhem = 1.282,945 gram',
      '<strong>100 gram</strong> ≈ 31,1783 dirhem ≈ 20,7855 miskal',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Dirhemden grama geçmek için <strong>gram = dirhem × 3,2073625</strong>, miskalden grama geçmek için <strong>gram = miskal × 4,81104375</strong> çarpımı yapılır. Ters yönde gram değeri aynı katsayıya bölünür.',
      '<strong>Örnek 1:</strong> Eski bir tarifte 10 miskal amber geçiyor. 10 × 4,81104375 = 48,1104 gram. Bu miktar aynı zamanda 15 dirhemdir.',
      '<strong>Örnek 2:</strong> 100 gram baharat kaç dirhemdir? 100 ÷ 3,2073625 = 31,1783 dirhem; miskal olarak 31,1783 ÷ 1,5 = 20,7855 miskal.',
      '<strong>Örnek 3:</strong> "Dört yüz dirhem" ifadesi tam bir okkadır: 400 × 3,2073625 = 1.282,945 gram. Eski metinlerde okka yerine "dört yüz dirhemlik" denmesi bu yüzdendir.',
    ] },
    { h: 'Çarşı dirhemi ile şer\'i dirhem farkı', p: [
      'Dirhem ve miskal konusundaki en önemli ayrıntı, iki farklı ölçü geleneğinin bulunmasıdır. Bu araçta kullanılan değerler Osmanlı çarşısında ticarette geçerli olan, <em>örfi</em> denilen ölçülerdir. Fıkıh kitaplarında zekât, mehir ve diyet gibi konularda geçen <em>şer\'i</em> dirhem ve miskal ise daha hafiftir.',
      'Bu nedenle dinî yükümlülüklerle ilgili bir hesap yapıyorsanız bu sayfadaki sonucu doğrudan kullanmayın. Örneğin zekât için aranan altın miktarı yirmi miskal olarak ifade edilir, ancak bunun gram karşılığı şer\'i miskal üzerinden belirlenir ve yaygın olarak yaklaşık 80 gram altın şeklinde açıklanır; çarşı miskaliyle yapılacak hesap bundan belirgin biçimde yüksek çıkar. Güncel ve bağlayıcı değer için yetkili dinî kurumların açıklamalarına bakın.',
    ] },
    { h: 'Bugün nerelerde işe yarar?', p: [
      'Dirhem ve miskal günümüzde resmî tartı birimi değildir; ticarette gram kullanılır. Yine de bu çeviri birçok durumda gereklidir. Osmanlı mutfağını canlandırmak isteyen aşçılar ve yemek tarihçileri eski tarifleri uygulanabilir hâle getirmek için dirhemi grama çevirir. Tarih ve iktisat tarihi öğrencileri narh defterlerindeki fiyatları yorumlarken birimlerin karşılığını bilmek zorundadır.',
      'Dilimizde de izleri sürer. "Dirhem dirhem" azar azar anlamında kullanılır; "bir dirhem et bin ayıp örter" atasözü, dirhemin ne kadar küçük bir miktarı anlattığını bilince daha anlamlı hâle gelir. Ayrıca bazı ülkelerin para birimlerinin adı da dirhemdir; bu sayfa para birimini değil, ağırlık ölçüsünü hesaplar.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Dirhemi yuvarlak 3 gram saymak. Küçük miktarlarda önemsiz görünse de yüz dirhemde yaklaşık 21 gramlık fark oluşur.',
      'Miskal ile dirhemi eş kabul etmek. Miskal, dirhemin bir buçuk katıdır.',
      'Buradaki kıratı mücevher karatıyla karıştırmak. Değerli taşlarda kullanılan metrik karat 0,2 gramdır; eski kırat buna çok yakın olsa da aynı tanım değildir.',
      'Para birimi olan dirhem için bu aracı kullanmak. Döviz çevirisi bu sayfanın konusu değildir.',
      'Tarihî ölçülerin dönemlere göre küçük farklar gösterebildiğini unutmak. Akademik çalışmada kullandığınız katsayıyı belirtin.',
    ] },
  ],
  faq: [
    ['1 dirhem kaç gramdır?', 'Osmanlı çarşı ölçüsüyle 1 dirhem yaklaşık 3,2074 gramdır. Bu değer, 1,282945 kilogramlık okkanın dört yüze bölünmesiyle bulunur.'],
    ['1 miskal kaç gramdır?', 'Osmanlı ölçüsünde 1 miskal 1,5 dirhemdir ve yaklaşık 4,811 gram eder. Dinî hesaplarda kullanılan şer\'i miskal ise daha hafiftir.'],
    ['1 miskal kaç dirhem eder?', '1 miskal 1,5 dirhemdir. Tersinden bakıldığında 1 dirhem yaklaşık 0,6667 miskal, yani bir miskalin üçte ikisidir.'],
    ['Kırat ne kadardır?', 'Kırat, dirhemin on altıda biridir ve yaklaşık 0,2005 gram gelir. Bir miskal 24 kırattır.'],
    ['400 dirhem kaç kilogramdır?', '400 dirhem tam bir okkadır ve 1,282945 kilogram eder. Bu yüzden okkaya "dört yüz dirhem" de denmiştir.'],
    ['Zekât hesabında bu aracı kullanabilir miyim?', 'Doğrudan kullanmanız önerilmez. Bu araç çarşı ölçüsünü esas alır; zekât ve benzeri hesaplarda şer\'i dirhem ve miskal kullanılır ve gram karşılıkları farklıdır. Güncel değer için yetkili dinî kurumların açıklamalarına başvurun.'],
    ['Eski tariflerdeki dirhemi mutfakta nasıl uygularım?', 'Dirhem sayısını 3,2 ile çarpmak mutfak için yeterli bir yaklaşımdır. Örneğin 50 dirhem şeker yaklaşık 160 gramdır. Daha hassas sonuç için bu sayfadaki hesabı kullanın.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda çalışır; girdiğiniz sayı sunucuya iletilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da kullanılabilir.'],
  ],
  related: ['kantar-kg-cevir', 'okka-kg-cevir', 'karat-gram-cevir', 'troy-ons-gram-cevir', 'altin-ayar-hesapla', 'gram-ons-cevir'],
};
