export default {
  slug: 'fayans-yapistirici-hesapla',
  title: 'Fayans Yapıştırıcısı Hesaplama',
  h1Tail: 'kg ve torba',
  pageTitle: 'Fayans Yapıştırıcısı Hesaplama – Kaç Torba Seramik Yapıştırıcı Gider?',
  description: 'Döşenecek alanı ve tarak diş ölçüsünü girin; gereken fayans ve seramik yapıştırıcısını kilogram ve torba olarak fire payıyla birlikte hesaplayın.',
  card: 'Alan ve tarak diş ölçüsüne göre gereken fayans yapıştırıcısını kilogram ve torba sayısı olarak hesaplayın.',
  category: 'insaat',
  keywords: ['fayans yapıştırıcısı hesaplama', 'seramik yapıştırıcı kaç kg gider', 'm2 yapıştırıcı sarfiyatı', '1 torba yapıştırıcı kaç m2', 'tarak diş ölçüsü', 'seramik yapıştırıcısı tüketimi', 'kaç torba yapıştırıcı'],
  lead: `Fayans ya da seramik döşeyeceğiniz alanı ve kullanacağınız <strong>tarak diş ölçüsünü</strong> seçin; araç metrekare tüketimini, toplam yapıştırıcı ihtiyacını ve alınacak torba sayısını verir. Ürününüzün ambalajındaki sarfiyat değerini biliyorsanız doğrudan onu da yazabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Döşenecek alan (m²)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'tarak', label: 'Tarak diş ölçüsü', type: 'select', value: '8', options: [['3', '3 mm (mozaik, küçük fayans)'], ['4', '4 mm (küçük duvar fayansı)'], ['6', '6 mm (orta boy karo)'], ['8', '8 mm (30×60, 45×45 karo)'], ['10', '10 mm (60×60 ve üzeri)'], ['12', '12 mm (büyük ebat, bozuk zemin)']] },
    { id: 'ozel', label: 'Ambalajdaki tüketim (kg/m²)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Doldurursanız tarak seçimi yerine bu değer kullanılır.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'torba', label: 'Torba ağırlığı (kg)', type: 'number', value: '25' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Döşenecek alan');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    let birim;
    let kaynak;
    if (String(v.ozel ?? '').trim() !== '') {
      birim = h.pos(v.ozel, 'Ambalajdaki tüketim');
      if (birim > 30) h.err('Ambalajdaki tüketim kg/m² olarak yazılmalı; çoğu üründe 2 ile 8 arasındadır.');
      kaynak = 'ambalaj değeri';
    } else {
      const dis = Number(v.tarak);
      if (![3, 4, 6, 8, 10, 12].includes(dis)) h.err('Listeden bir tarak diş ölçüsü seçin.');
      birim = dis * 0.5;
      kaynak = dis + ' mm tarak';
    }
    const net = birim * alan;
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / torba - 1e-9);
    return {
      rows: [
        ['Gerekli yapıştırıcı', h.fmt(toplam, 1) + ' kg'],
        ['Torba sayısı', `${h.fmt(adet, 0)} torba (${h.fmt(torba, 1)} kg)`],
        ['m² başına tüketim', `${h.fmt(birim, 2)} kg/m² (${kaynak})`],
        ['Fire hariç miktar', h.fmt(net, 1) + ' kg'],
        ['Bir torbanın kapladığı alan', h.fmt(torba / birim, 1) + ' m²'],
      ],
      note: 'Tarak seçiminde tüketim, diş ölçüsünün her milimetresi için yaklaşık 0,5 kg/m² kabul edilir. Zemin düzgünlüğü ve ürün tipi gerçek sarfiyatı değiştirir.',
    };
  },
  cases: [
    { in: { alan: '20', tarak: '8' }, out: { 'Gerekli yapıştırıcı': '88 kg', 'Torba sayısı': '4 torba (25 kg)', 'm² başına tüketim': '4 kg/m² (8 mm tarak)', 'Fire hariç miktar': '80 kg', 'Bir torbanın kapladığı alan': '6,3 m²' } },
    { in: { alan: '35', tarak: '10', fire: '5' }, out: { 'Gerekli yapıştırıcı': '183,8 kg', 'Torba sayısı': '8 torba (25 kg)', 'Fire hariç miktar': '175 kg' } },
    { in: { alan: '12', tarak: '6' }, out: { 'Gerekli yapıştırıcı': '39,6 kg', 'Torba sayısı': '2 torba (25 kg)', 'm² başına tüketim': '3 kg/m² (6 mm tarak)' } },
    { in: { alan: '40', tarak: '8', ozel: '4,5', fire: '0' }, out: { 'Gerekli yapıştırıcı': '180 kg', 'Torba sayısı': '8 torba (25 kg)', 'm² başına tüketim': '4,5 kg/m² (ambalaj değeri)' } },
    { in: { alan: '100', tarak: '4' }, out: { 'Gerekli yapıştırıcı': '220 kg', 'Torba sayısı': '9 torba (25 kg)', 'Bir torbanın kapladığı alan': '12,5 m²' } },
    { in: { alan: '50', tarak: '10', fire: '0' }, out: { 'Gerekli yapıştırıcı': '250 kg', 'Torba sayısı': '10 torba (25 kg)', 'Bir torbanın kapladığı alan': '5 m²' } },
    { in: { alan: '', tarak: '8' }, error: true },
    { in: { alan: '20', tarak: '8', ozel: '450' }, error: true },
    { in: { alan: '0', tarak: '8' }, error: true },
  ],
  howto: [
    `"Döşenecek alan" alanına karo kaplanacak toplam yüzeyi metrekare olarak yazın. Duvar ve zemin alanlarını toplayabilir ya da ayrı ayrı hesaplayabilirsiniz.`,
    `Kullanacağınız tarağın diş ölçüsünü listeden seçin. Seçeneklerin yanında o tarağın genellikle hangi karo boyutuyla kullanıldığı yazar.`,
    `Elinizdeki ürünün torbasında kg/m² cinsinden sarfiyat yazıyorsa bu değeri "Ambalajdaki tüketim" alanına girin; bu durumda tarak seçimi dikkate alınmaz.`,
    `Fire payını ve torba ağırlığını gerekirse değiştirin, ardından "Hesapla" düğmesine basın.`,
    `Sonuçtaki torba sayısını sipariş listenize ekleyin; "Bir torbanın kapladığı alan" satırı işi planlarken size yardımcı olur.`,
  ],
  sections: [
    { h: 'Yapıştırıcı tüketimini ne belirler?', p: [
      `Çimento esaslı fayans ve seramik yapıştırıcıları yüzeye mala ile yayılır, ardından dişli tarakla taranarak eşit kalınlıkta oluklar oluşturulur. Karo bu olukların üzerine bastırıldığında yapıştırıcı ezilerek karonun arkasına yayılır. Dolayısıyla metrekareye ne kadar malzeme gittiğini en çok <strong>tarağın diş ölçüsü</strong> belirler: diş büyüdükçe yüzeyde kalan yapıştırıcı miktarı artar.`,
      `Tarak seçimi ise karo boyutuna bağlıdır. Büyük ve ağır karolar, arkalarının tamamen dolması için daha kalın bir yatak ister; küçük duvar fayanslarında ince bir yatak yeterlidir. Zeminin düzgünlüğü, karonun arka yüzeyindeki dişler ve yapıştırıcının tek ya da çift taraflı sürülmesi de tüketimi etkiler.`,
    ] },
    { h: 'Hesap yöntemi', p: [
      `Çimento esaslı yapıştırıcılarda yaygın bir pratik kural, tüketimin tarak diş ölçüsünün yaklaşık yarısı kadar kg/m² olduğudur. Araç bu kuralı kullanır: <strong>tüketim (kg/m²) = diş ölçüsü (mm) × 0,5</strong>. Buna göre 6 mm tarak yaklaşık 3 kg/m², 8 mm tarak 4 kg/m², 10 mm tarak 5 kg/m² yapıştırıcı tüketir.`,
      `Toplam ihtiyaç, metrekare tüketiminin alanla çarpılması ve üzerine fire payının eklenmesiyle bulunur. Çıkan kilogram torba ağırlığına bölünür ve yukarı yuvarlanır. Bu kural bir ortalamadır; farklı ürünlerin yoğunluğu ve kıvamı değiştiği için üreticinin ambalajda verdiği sarfiyat değeri varsa onu kullanmanız daha doğru sonuç verir.`,
    ] },
    { h: 'Çözümlü örnek: 20 m² zemin, 8 mm tarak', p: [
      `8 mm tarak için metrekare tüketimi 8 × 0,5 = 4 kg/m² alınır. 20 m² zemin için net ihtiyaç 4 × 20 = 80 kg'dır. Yüzde 10 fire eklendiğinde 80 × 1,10 = <strong>88 kg</strong> bulunur. 25 kilogramlık torbalardan 88 ÷ 25 = 3,52 çıkar; yani 4 torba almak gerekir. Bu tüketimle bir torba yaklaşık 6,3 m² alan kaplar.`,
      `İkinci bir örnek: 35 m² salona 60×60 porselen karo 10 mm tarakla döşenecek ve fire yüzde 5 alınacak olsun. Tüketim 5 kg/m², net ihtiyaç 175 kg, fireyle birlikte 183,8 kg eder; bu da 8 torba demektir.`,
    ] },
    { h: 'Hangi karoya hangi tarak?', p: [
      `Aşağıdaki eşleştirme genel uygulama alışkanlıklarını özetler. Karo ve yapıştırıcı üreticilerinin önerileri farklıysa onlara uyun.`,
    ], ul: [
      `<strong>3–4 mm:</strong> mozaik, 10×10 ve 15×15 cm gibi küçük duvar fayansları.`,
      `<strong>6 mm:</strong> 20×25, 25×40 cm gibi orta boy duvar karoları.`,
      `<strong>8 mm:</strong> 30×60, 45×45 cm gibi yaygın yer ve duvar karoları.`,
      `<strong>10 mm:</strong> 60×60 cm ve üzeri porselen karolar.`,
      `<strong>12 mm:</strong> 60×120 cm gibi büyük ebatlar ve düzgün olmayan zeminler.`,
    ] },
    { h: 'Çift taraflı yapıştırma ve zemin düzgünlüğü', p: [
      `Büyük ebatlı karolarda, dış mekânlarda ve yoğun yük gören zeminlerde yapıştırıcı hem zemine hem karonun arkasına sürülür. Bu yöntem karonun altında boşluk kalmasını önler, ancak tüketimi belirgin biçimde artırır. Çift taraflı uygulama yapacaksanız ambalajdaki bu yönteme ait sarfiyat değerini "Ambalajdaki tüketim" alanına yazmanız en sağlıklı yoldur.`,
      `Zemindeki çukurlar ve bozukluklar da yapıştırıcıyla doldurulmaya çalışılırsa tüketim hesaplananın çok üzerine çıkar. Bozuk zeminlerde önce tesviye şapı ya da tamir harcıyla düzeltme yapmak, hem yapıştırıcıdan tasarruf sağlar hem de karoların sağlam oturmasına yardımcı olur.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Karo boyutuna göre küçük tarak seçmek: karonun arkası tam dolmaz, zamanla boşluk sesi ve kırılma görülür.`,
      `Fire payını hesaba katmamak: kovada kalan, kabuk bağlayıp atılan ve kenarlardan taşan malzeme için yüzde 5–10 ayırmak gerekir.`,
      `Yapıştırıcıyı derz dolgu yerine kullanmak: derzler için ayrı bir ürün ve ayrı bir hesap gerekir.`,
      `Tüm alanı tek seferde karıştırmak: yapıştırıcının kullanım süresi sınırlıdır; torbaları ihtiyaç oldukça açmak israfı önler.`,
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu araç çimento esaslı, toz halinde satılan yapıştırıcılar için yaklaşık bir malzeme keşfi sunar. Hazır macun tipi (dispersiyon) ve reaktif (epoksi, poliüretan) yapıştırıcıların tüketimi farklıdır; onlar için mutlaka ambalaj değerini kullanın. Islak hacimler, yüzme havuzları, cephe kaplamaları ve yerden ısıtmalı zeminler gibi özel uygulamalarda ürün sınıfı ve uygulama yöntemi için üreticinin teknik dokümanına ve uzman uygulayıcıya başvurun.`,
    ] },
  ],
  faq: [
    ['1 torba fayans yapıştırıcısı kaç metrekare yapar?', `Tarak ölçüsüne bağlıdır. 25 kilogramlık bir torba 6 mm tarakla yaklaşık 8,3 m², 8 mm tarakla 6,3 m², 10 mm tarakla 5 m² alan kaplar. Bu değerler firesiz ve düzgün zemin içindir.`],
    ['1 m² için kaç kilogram yapıştırıcı gider?', `Yaygın uygulamalarda 3 ile 5 kg/m² arasındadır. Küçük duvar fayanslarında 2 kg/m² civarına düşebilir, büyük ebatlı karolarda ve çift taraflı uygulamada 6 kg/m²'nin üzerine çıkabilir.`],
    ['Ambalajda farklı bir sarfiyat yazıyor, hangisini kullanmalıyım?', `Ambalajdaki değeri kullanın. Üretici o ürünün yoğunluğunu ve kıvamını bildiği için verdiği değer genel kuraldan daha isabetlidir. Bu değeri ilgili alana yazdığınızda araç tarak seçimini dikkate almaz.`],
    ['Fire payı yüzde kaç olmalı?', `Düzgün zeminde ve deneyimli bir ustayla yüzde 5 yeterli olabilir. Zemin bozuksa, çok sayıda kesim varsa ya da ilk kez uygulama yapıyorsanız yüzde 10–15 almak daha güvenlidir.`],
    ['Duvar ve zemin için ayrı mı hesaplamalıyım?', `Farklı boyutta karo ve farklı tarak kullanıyorsanız evet. Duvarı ve zemini ayrı ayrı hesaplayıp kilogramları toplayın, torba sayısını toplam üzerinden belirleyin; böylece fazladan torba almazsınız.`],
    ['Eski fayansın üzerine yapıştırmada tüketim değişir mi?', `Eski karo yüzeyi düz olduğu için tüketim genellikle benzer kalır, ancak bu iş için yüksek yapışma gücüne sahip, bu kullanıma uygun olduğu belirtilen bir ürün seçilmesi gerekir. Sarfiyat için o ürünün ambalaj değerini esas alın.`],
    ['Torba ağırlığı 25 kilogramdan farklıysa ne yapmalıyım?', `"Torba ağırlığı" alanına ürününüzün ağırlığını yazın. Toplam kilogram aynı kalır, torba sayısı yeni ağırlığa göre yeniden hesaplanır.`],
    ['Girdiğim bilgiler saklanıyor mu?', `Hayır. Hesaplama tamamen tarayıcınızda çalışır; alan ve malzeme bilgileriniz hiçbir sunucuya gönderilmez. Sayfa açıldıktan sonra internet olmadan da kullanılabilir.`],
  ],
  related: ['derz-dolgu-hesapla', 'boya-fayans-hesapla', 'metrekare-hesapla', 'sap-hesapla', 'cimento-hesapla'],
};
