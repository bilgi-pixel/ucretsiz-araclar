export default {
  slug: 'cc-ml-cevir',
  title: 'cc Mililitre Çevirici',
  h1Tail: 'cc ↔ mL',
  pageTitle: 'cc Mililitre Çevirici – cc Kaç mL, mL Kaç cc Hesaplama',
  description: 'cc değerini mililitreye, mililitreyi cc\'ye çevirin. 1 cc = 1 cm³ = 1 mL eşitliğiyle çalışır; litre karşılığını verir, enjektör ve motor hacmi için pratiktir.',
  card: 'cc\'yi mililitreye, mililitreyi cc\'ye çevirin; enjektör ölçüleri ve motor hacimleri için litre karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['cc ml çevirme', '1 cc kaç ml', 'cc kaç mililitre', 'ml cc hesaplama', 'cc nedir', '1600 cc kaç litre', 'santimetreküp mililitre'],
  lead: 'cc ile mililitre arasında çeviri yapın. cc, santimetreküpün kısaltmasıdır ve <strong>1 cc = 1 cm³ = 1 mL</strong> eşitliği tamdır; araç ayrıca litre, santilitre ve milimetreküp karşılıklarını gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['cm', 'cc → Mililitre'], ['mc', 'Mililitre → cc']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    // 1 cc = 1 mL olduğundan sayısal değer değişmez; yön yalnızca satır sırasını belirler.
    const ml = x;
    const mlSatir = ['Mililitre', h.fmt(ml, 4) + ' mL'];
    const ccSatir = ['cc (cm³)', h.fmt(ml, 4) + ' cc'];
    return {
      rows: [
        v.yon === 'mc' ? ccSatir : mlSatir,
        v.yon === 'mc' ? mlSatir : ccSatir,
        ['Litre', h.fmt(ml / 1000, 6) + ' L'],
        ['Santilitre', h.fmt(ml / 10, 4) + ' cL'],
        ['Milimetreküp', h.fmt(ml * 1000, 1) + ' mm³'],
      ],
      note: '1 cc = 1 cm³ = 1 mL (tam eşitlik). Sayısal değer değişmez; yalnızca birimin adı farklıdır.',
    };
  },
  cases: [
    { in: { deger: '5', yon: 'cm' }, out: { 'Mililitre': '5 mL', 'Litre': '0,005 L' } },
    { in: { deger: '1600', yon: 'cm' }, out: { 'Mililitre': '1.600 mL', 'Litre': '1,6 L' } },
    { in: { deger: '2,5', yon: 'mc' }, out: { 'cc (cm³)': '2,5 cc', 'Santilitre': '0,25 cL' } },
    { in: { deger: '125', yon: 'cm' }, out: { 'Litre': '0,125 L' } },
    { in: { deger: '0,5', yon: 'mc' }, out: { 'cc (cm³)': '0,5 cc', 'Milimetreküp': '500 mm³' } },
    { in: { deger: '1000', yon: 'mc' }, out: { 'cc (cm³)': '1.000 cc', 'Litre': '1 L' } },
    { in: { deger: '0', yon: 'cm' }, out: { 'Mililitre': '0 mL' } },
    { in: { deger: '5 cc', yon: 'cm' }, error: true },
    { in: { deger: '-10', yon: 'mc' }, error: true },
  ],
  howto: [
    '"Değer" alanına yalnızca sayıyı yazın; birim kısaltmasını (cc, mL) eklemeyin.',
    '"Çeviri yönü" listesinden cc\'den mililitreye ya da mililitreden cc\'ye seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılıktır; litre, santilitre ve milimetreküp değerleri altında listelenir.',
    'Motor hacmi gibi büyük değerlerde "Litre" satırına bakarak 1600 cc\'nin 1,6 litre olduğunu doğrudan görebilirsiniz.',
  ],
  sections: [
    { h: 'cc nedir?', p: [
      'cc, İngilizce "cubic centimetre" yani santimetreküp ifadesinin kısaltmasıdır. Kenarları birer santimetre olan küçük bir küpün hacmini anlatır. Bilimsel yazımda aynı birim cm³ olarak gösterilir; cc ise daha çok sağlık alanında ve motorlu taşıtlarda yerleşmiş gündelik bir kısaltmadır.',
      'Mililitre, litrenin binde biridir. Litre bir desimetreküp olarak tanımlandığından ve bir desimetreküp 1000 santimetreküp ettiğinden, litrenin binde biri tam olarak bir santimetreküpe denk gelir. Kısacası <strong>cc ile mililitre aynı hacmin iki farklı adıdır</strong>. 5 cc ile 5 mL arasında hiçbir fark yoktur.',
    ] },
    { h: 'Çeviri neden bire birdir?', p: [
      'Birçok birim çevirisinde bir katsayı ile çarpmak gerekir; cc ve mililitrede katsayı 1\'dir. Zincir şöyle kurulur: 1 L = 1 dm³, 1 dm = 10 cm, dolayısıyla 1 dm³ = 10 × 10 × 10 = 1000 cm³. Buradan 1 L = 1000 cm³ ve 1 mL = 1 cm³ = 1 cc sonucuna varılır.',
      'Litrenin kendisi Uluslararası Birim Sistemi\'nin temel birimlerinden biri değildir, ancak bu sistemle birlikte kullanılması kabul edilmiş bir birimdir. Simgesi küçük "l" ya da büyük "L" olarak yazılabilir; küçük harfin 1 rakamıyla karışmaması için mililitrede "mL" yazımı giderek daha çok tercih edilmektedir.',
      'Bu yüzden araçta sayısal değer değişmez. Aracın asıl faydası, aynı miktarın litre, santilitre ve milimetreküp karşılıklarını tek bakışta göstermesi ve "acaba bir katsayı var mıydı" kuşkusunu ortadan kaldırmasıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir şurup kutusundaki ölçek "5 cc" çizgisini gösteriyor. Bu 5 mL\'dir ve 0,005 litreye karşılık gelir.',
      '<strong>Örnek 2:</strong> Ruhsatında silindir hacmi 1600 cc yazan bir otomobilin motoru 1.600 mL, yani 1,6 litredir. Otomobil tanıtımlarındaki "1.6 motor" ifadesi buradan gelir.',
      '<strong>Örnek 3:</strong> 125 cc\'lik bir motosiklet motoru 0,125 litre hacmindedir. 0,5 mL\'lik bir doz ise 0,5 cc ve 500 mm³ eder.',
    ] },
    { h: 'cc ile nerelerde karşılaşılır?', ul: [
      '<strong>Enjektörler:</strong> Şırıngalar 1, 2, 5, 10, 20 ve 50 cc gibi boylarda anılır; üzerlerindeki ölçek çoğunlukla mL olarak basılıdır. İkisi aynı çizgiyi gösterir.',
      '<strong>İlaç ölçekleri:</strong> Şurup kaşıkları ve damlalıklar mL ya da cc ile işaretlenir.',
      '<strong>Motor hacmi:</strong> Otomobil, motosiklet, çim biçme makinesi ve jeneratör motorlarının silindir hacmi cc ile verilir.',
      '<strong>Laboratuvar:</strong> Deney tüpü, pipet ve mezürlerde mL kullanılır; eski kaynaklarda aynı değerler cc olarak geçer.',
      '<strong>Kozmetik ve dolgu uygulamaları:</strong> Ürün hacimleri sıklıkla cc cinsinden söylenir.',
    ] },
    { h: 'Motor hacminde cc ve litre', p: [
      'Motor hacmi, pistonların bir turda süpürdüğü toplam hacimdir. Küçük motorlarda cc, büyük motorlarda litre kullanmak alışkanlık hâline gelmiştir. Dönüşüm için cc değerini 1000\'e bölmek yeterlidir: 999 cc yaklaşık 1,0 litre, 1395 cc yaklaşık 1,4 litre, 1968 cc yaklaşık 2,0 litre olarak anılır. Üreticiler ticari adlandırmada değeri en yakın ondalığa yuvarlar; gerçek silindir hacmi ruhsatta yazan cc değeridir.',
      'Türkiye\'de taşıt vergileri ve bazı sigorta kalemleri motor silindir hacmi dilimlerine göre belirlenir. Dilim sınırları ve tutarlar zaman içinde değiştiği için vergiyle ilgili bir hesap yaparken güncel mevzuatı ve resmî tarifeleri kontrol edin.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 cc</strong> = 1 mL = 0,001 L',
      '<strong>5 cc</strong> = 5 mL (yaklaşık bir tatlı kaşığı)',
      '<strong>10 cc</strong> = 10 mL = 1 cL',
      '<strong>100 cc</strong> = 100 mL = 0,1 L',
      '<strong>250 cc</strong> = 250 mL = 0,25 L',
      '<strong>1000 cc</strong> = 1 L',
      '<strong>1600 cc</strong> = 1,6 L',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'cc bir hacim birimidir; gram ya da miligramla aynı şey değildir. Bir ilacın "5 mg" dozu ile "5 cc" hacmi birbirine eşit olmak zorunda değildir; ikisi arasındaki bağı ilacın derişimi belirler. Derişim kutunun ya da prospektüsün üzerinde "mg/mL" biçiminde yazar.',
      'Bu araç yalnızca birim adını çevirir ve bilgilendirme amaçlıdır. İlaç dozu, enjeksiyon miktarı ya da bebeklere verilecek sıvı ölçüsü gibi konularda hekim ve eczacının talimatı ile ürünün kendi ölçeği esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['1 cc kaç mL eder?', '1 cc tam olarak 1 mL eder. cc santimetreküpün, mL mililitrenin kısaltmasıdır ve ikisi aynı hacmi ifade eder.'],
    ['cc ile cm³ aynı mıdır?', 'Evet. cc, santimetreküpün gündelik kısaltmasıdır; cm³ ise aynı birimin bilimsel yazımıdır. İkisi arasında hiçbir fark yoktur.'],
    ['1600 cc kaç litre eder?', '1600 cc, 1,6 litredir. cc değerini 1000\'e bölerek litre karşılığını bulursunuz.'],
    ['5 cc\'lik enjektör kaç mL alır?', '5 mL alır. Enjektörün üzerindeki ölçek mL olarak basılmış olsa bile 5 cc ile 5 mL aynı çizgidir.'],
    ['cc gram demek midir?', 'Hayır. cc hacim, gram kütle birimidir. Yalnızca su için 1 cc yaklaşık 1 gram gelir; diğer maddelerde yoğunluğa göre değişir.'],
    ['1 litre kaç cc eder?', '1 litre 1000 cc eder. Aynı şekilde yarım litre 500 cc, çeyrek litre 250 cc\'dir.'],
    ['Tatlı kaşığı kaç cc alır?', 'Ölçü olarak kullanılan tatlı kaşığı yaklaşık 5 cc, yani 5 mL kabul edilir. Evdeki kaşıkların hacmi değişebildiği için ilaç verirken ürünün kendi ölçeğini kullanmak daha doğrudur.'],
    ['Girdiğim sayı bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; hiçbir değer sunucuya iletilmez ya da kaydedilmez.'],
  ],
  related: ['litre-mililitre-cevir', 'santilitre-mililitre-cevir', 'desimetrekup-litre-cevir', 'tatli-kasigi-ml-cevir', 'ml-sivi-ons-cevir', 'birim-donustur'],
};
