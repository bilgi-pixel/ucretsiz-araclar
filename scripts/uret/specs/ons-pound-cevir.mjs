export default {
  slug: 'ons-pound-cevir',
  title: 'Ons Pound Çevirici',
  h1Tail: 'oz ↔ lb',
  pageTitle: 'Ons Pound Çevirici – Onsu Libreye, Poundu Onsa Çevirme',
  description: 'Onsu pounda (libre), poundu onsa çevirin. 1 pound = 16 ons eşitliğiyle çalışır; "pound ve ons" gösterimini, gram ve kilogram karşılığını da verir.',
  card: 'Onsu pounda, poundu onsa çevirin; "lb oz" gösterimi, gram ve kilogram karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['ons pound çevirme', '1 pound kaç ons', 'ons libre çevirici', 'oz lb dönüştürme', '16 ons kaç pound', 'pound ons hesaplama', 'lb oz kaç gram'],
  lead: 'Ağırlığı onstan pounda (libre) ya da pounddan onsa çevirin. Araç <strong>1 pound = 16 ons</strong> eşitliğini kullanır; sonucu "pound ve ons" biçiminde, ayrıca gram ve kilogram olarak da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 24' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['oz', 'Ons → Pound'], ['lb', 'Pound → Ons']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Ağırlık');
    const OZ_G = 28.349523125;
    const oz = v.yon === 'lb' ? x * 16 : x;
    const lb = oz / 16;
    const tamLb = Math.floor(lb + 1e-9);
    let kalanOz = oz - tamLb * 16;
    if (kalanOz < 0) kalanOz = 0;
    const g = oz * OZ_G;
    const satirLb = ['Pound', h.fmt(lb, 5) + ' lb'];
    const satirOz = ['Ons', h.fmt(oz, 4) + ' oz'];
    return {
      rows: [
        v.yon === 'lb' ? satirOz : satirLb,
        v.yon === 'lb' ? satirLb : satirOz,
        ['Pound ve ons', `${h.fmt(tamLb, 0)} lb ${h.fmt(kalanOz, 2)} oz`],
        ['Gram', h.fmt(g, 3) + ' g'],
        ['Kilogram', h.fmt(g / 1000, 4) + ' kg'],
      ],
      note: '1 lb = 16 oz = 453,59237 g; 1 oz = 28,349523125 g (avoirdupois, tam tanım). Değerli madenlerde kullanılan troy ons farklı bir birimdir.',
    };
  },
  cases: [
    { in: { deger: '16', yon: 'oz' }, out: { 'Pound': '1 lb', 'Pound ve ons': '1 lb 0 oz', 'Gram': '453,592 g' } },
    { in: { deger: '2,5', yon: 'lb' }, out: { 'Ons': '40 oz', 'Pound ve ons': '2 lb 8 oz', 'Kilogram': '1,134 kg' } },
    { in: { deger: '8', yon: 'oz' }, out: { 'Pound': '0,5 lb', 'Gram': '226,796 g' } },
    { in: { deger: '20', yon: 'oz' }, out: { 'Pound': '1,25 lb', 'Pound ve ons': '1 lb 4 oz' } },
    { in: { deger: '1', yon: 'oz' }, out: { 'Pound': '0,0625 lb', 'Gram': '28,35 g' } },
    { in: { deger: '1', yon: 'lb' }, out: { 'Ons': '16 oz', 'Gram': '453,592 g', 'Kilogram': '0,4536 kg' } },
    { in: { deger: '7,5', yon: 'lb' }, out: { 'Ons': '120 oz', 'Pound ve ons': '7 lb 8 oz', 'Kilogram': '3,4019 kg' } },
    { in: { deger: '-3', yon: 'oz' }, error: true },
    { in: { deger: 'yarım', yon: 'lb' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına çevirmek istediğiniz değeri yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden onstan pounda mı, pounddan onsa mı geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, ardından "pound ve ons" gösterimi ile gram ve kilogram değeri görünür.',
    'Tarifinize, kargo formuna ya da sipariş notuna aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Ons ve pound nedir?', p: [
      'Ons (ounce, simgesi oz) ve pound (simgesi lb), ABD\'de gündelik hayatta, Birleşik Krallık\'ta ise kısmen kullanılan ağırlık birimleridir. Pound Türkçede "libre" olarak da anılır; "lb" kısaltması Latince <em>libra</em> sözcüğünden gelir. Günlük ticarette kullanılan sistemin adı avoirdupois\'dır ve bu sistemde bir pound on altı onsa bölünür.',
      'Uluslararası anlaşmayla 1 pound tam olarak 0,45359237 kilogram kabul edilmiştir. Buradan 1 ons için 28,349523125 gram değeri çıkar. İki birim arasındaki oran tam sayı olduğundan ons-pound çevirisi hiçbir yuvarlama içermez; yalnızca 16 ile çarpılır ya da 16\'ya bölünür.',
    ] },
    { h: 'Çeviri formülü ve "lb oz" gösterimi', p: [
      'Onstan pounda geçmek için <strong>pound = ons ÷ 16</strong>, pounddan onsa geçmek için <strong>ons = pound × 16</strong> işlemi yapılır. 24 ons, 24 ÷ 16 = 1,5 pound; 3 pound ise 3 × 16 = 48 ons eder.',
      'Ancak bu birimleri kullanan ülkelerde ağırlık çoğu zaman ondalıklı değil, "pound ve ons" olarak söylenir: 1,5 pound yerine "1 lb 8 oz" denir. Ondalıklı pound değerini bu biçime çevirmek için tam kısım pound olarak alınır, kalan ondalık kısım 16 ile çarpılarak onsa çevrilir. Burada en sık yapılan hata, ondalık kısmı doğrudan ons sanmaktır: 2,5 pound "2 lb 5 oz" değil, "2 lb 8 oz" demektir, çünkü 0,5 × 16 = 8\'dir. Araç bu gösterimi ayrı bir satırda hazır verir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir Amerikan tarifinde 20 ons un isteniyor. 20 ÷ 16 = 1,25 pound, yani 1 lb 4 oz. Gram karşılığı 20 × 28,349523125 ≈ 566,99 gramdır; mutfak terazinizi yaklaşık 567 grama ayarlayabilirsiniz.',
      '<strong>Örnek 2:</strong> Yurt dışındaki bir yakınınız bebeğinin 7,5 pound doğduğunu söylüyor. 7,5 × 16 = 120 ons, başka bir deyişle 7 lb 8 oz. Kilogram olarak 3,4019 kg, yani yaklaşık 3.400 gramdır.',
      '<strong>Örnek 3:</strong> Bir ürün etiketinde "Net Wt 8 oz" yazıyor. 8 ÷ 16 = 0,5 pound; gram olarak 226,796 g. Etiketlerde bu değer genellikle 226 ya da 227 gram olarak yuvarlanır.',
    ] },
    { h: 'Nerelerde karşınıza çıkar?', p: [
      'Yurt dışı kaynaklı yemek tarifleri bu çevirinin en yaygın kullanım alanıdır; tereyağı, et, un ve peynir miktarları çoğunlukla ons ya da pound ile verilir. İthal gıda ambalajlarında, takviye ve kahve paketlerinde net ağırlık ons olarak da yazılır. Uluslararası kargo ve e-ticaret tarafında gönderi ağırlıkları pound ve ons cinsinden girilir; taşıyıcıların fiyat basamakları da çoğu zaman bu birimlere göre belirlenir. Bu nedenle yurt dışına ürün gönderen satıcıların paket ağırlığını doğru çevirmesi önemlidir.',
      'Spor ve hobi alanında da örnekler çoktur: boks eldivenleri 10, 12, 16 ons gibi ağırlıklarla sınıflandırılır; olta takımlarında misina dayanımı ve yem ağırlığı pound ve ons ile belirtilir; kamp ve bisiklet malzemelerinin kataloglarında ağırlıklar "lb oz" olarak yazılır. Yeni doğan bebeklerin ağırlığı ABD ve Birleşik Krallık\'ta geleneksel olarak pound ve ons ile söylenir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 oz</strong> = 0,0625 lb ≈ 28,35 g',
      '<strong>4 oz</strong> = 0,25 lb (çeyrek pound) ≈ 113,4 g',
      '<strong>8 oz</strong> = 0,5 lb (yarım pound) ≈ 226,8 g',
      '<strong>12 oz</strong> = 0,75 lb ≈ 340,2 g',
      '<strong>16 oz</strong> = 1 lb ≈ 453,6 g',
      '<strong>32 oz</strong> = 2 lb ≈ 907,2 g',
      '<strong>35,274 oz</strong> ≈ 2,2046 lb ≈ 1 kg',
    ] },
    { h: 'Karıştırılan birimler: troy ons ve sıvı ons', p: [
      'Altın, gümüş ve platin gibi değerli madenlerin fiyatı "ons" üzerinden açıklanır, fakat oradaki birim <strong>troy onstur</strong> ve yaklaşık 31,1035 gramdır; bu sayfadaki 28,35 gramlık onstan yaklaşık yüzde 10 ağırdır. Üstelik troy sisteminde bir pound 12 onstur. Altın hesabı yaparken bu çeviriciyi değil, troy ons için hazırlanmış aracı kullanın.',
      '<strong>Sıvı ons</strong> (fl oz) ise ağırlık değil hacim birimidir; içecek şişelerinde ve kozmetik ambalajlarında görülür ve ABD ile Birleşik Krallık\'ta farklı büyüklüktedir. Bir tarifteki "8 oz süt" çoğunlukla hacmi, "8 oz un" ise ağırlığı anlatır; hangisinin kastedildiğini malzemenin türünden ve tarifin bağlamından çıkarmak gerekir.',
    ] },
    { h: 'Duyarlılık ve sınırlar', p: [
      'Araç negatif ağırlık kabul etmez. Pound değeri beş, ons değeri dört, gram değeri üç ondalık basamağa kadar gösterilir; "pound ve ons" satırında kalan ons iki ondalığa yuvarlanır. Mutfak ve kargo işleri için bu duyarlılık fazlasıyla yeterlidir. Ticari tartımda geçerli olan değer, damgalı ve doğrulanmış terazinin gösterdiği değerdir; çevrim sonucu yalnızca bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['1 pound kaç onstur?', '1 pound tam olarak 16 onstur. Bu oran gündelik ticarette kullanılan avoirdupois sistemi için geçerlidir.'],
    ['1 ons kaç pounddur?', '1 ons, 1 ÷ 16 = 0,0625 pounddur. Gram olarak yaklaşık 28,35 grama denk gelir.'],
    ['Pound ile libre aynı şey mi?', 'Evet. Libre, pound biriminin Türkçede kullanılan adıdır; "lb" kısaltması da Latince libra sözcüğünden gelir. İkisi de 453,59237 gramlık aynı birimi anlatır.'],
    ['2,5 pound, 2 pound 5 ons mu demektir?', 'Hayır. Ondalık kısım onsa çevrilirken 16 ile çarpılır: 0,5 × 16 = 8. Yani 2,5 pound, 2 pound 8 onstur. Araçtaki "Pound ve ons" satırı bu gösterimi doğrudan verir.'],
    ['Altın fiyatlarındaki ons bu ons mu?', 'Hayır. Değerli madenlerde troy ons kullanılır ve yaklaşık 31,1035 gramdır. Bu sayfadaki ons 28,35 gramlık avoirdupois onsudur; ikisini karıştırmak yaklaşık yüzde 10 hataya yol açar.'],
    ['Sıvı ons (fl oz) ile ons aynı mı?', 'Hayır. Sıvı ons bir hacim birimidir, ons ise ağırlık birimidir. Su için değerler birbirine yakın çıksa da yağ, bal ya da un gibi yoğunluğu farklı malzemelerde belirgin biçimde ayrışır.'],
    ['1 kilogram kaç pound ve kaç ons eder?', '1 kilogram yaklaşık 2,2046 pound ya da 35,274 onstur. "Pound ve ons" olarak yazıldığında yaklaşık 2 lb 3,27 oz eder.'],
    ['Yazdığım ağırlık bilgisi bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz değer sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['kg-pound-cevir', 'gram-ons-cevir', 'troy-ons-gram-cevir', 'kg-stone-cevir', 'ml-sivi-ons-cevir', 'mutfak-olcu-donustur'],
};
