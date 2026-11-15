export default {
  slug: 'siva-hesapla',
  title: 'Sıva Malzemesi Hesaplama',
  h1Tail: 'kaç torba sıva gerekir?',
  pageTitle: 'Sıva Malzemesi Hesaplama – Kaç Torba Hazır Sıva Gerekir?',
  description: 'Sıvanacak alanı, sıva kalınlığını ve ürünün sarfiyat değerini yazın; fire payıyla birlikte gereken sıva miktarını kilogram, metreküp ve torba olarak hesaplayın.',
  card: 'Alan, kalınlık ve sarfiyat değerinden gereken sıva miktarını kilogram, metreküp ve torba sayısı olarak bulun.',
  category: 'insaat',
  keywords: ['sıva hesaplama', 'kaç torba sıva gider', 'sıva malzemesi hesabı', 'm2 sıva sarfiyatı', 'hazır sıva hesaplama', 'alçı sıva kaç kg gider', 'duvar sıvası metraj'],
  lead: 'Sıvanacak yüzeyin alanını, uygulayacağınız sıva kalınlığını ve ürünün ambalajında yazan sarfiyat değerini girin. Araç fire payını ekleyerek <strong>toplam sıva miktarını ve kaç torba almanız gerektiğini</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Sıvanacak alan (m²)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'kalinlik', label: 'Sıva kalınlığı (mm)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'sarfiyat', label: 'Sarfiyat (kg/m², 1 mm kalınlık için)', type: 'number', value: '1,4', hint: 'Ürün ambalajındaki ya da teknik föyündeki değeri yazın.' },
    { id: 'torba', label: 'Torba ağırlığı (kg)', type: 'number', value: '25' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Sıvanacak alan');
    const kal = h.pos(v.kalinlik, 'Sıva kalınlığı');
    if (kal > 100) h.err('Sıva kalınlığı milimetre olarak yazılmalı ve en fazla 100 mm olabilir (2 cm için 20 yazın).');
    const sarf = h.pos(v.sarfiyat, 'Sarfiyat');
    if (sarf > 5) h.err('Sarfiyat değeri 1 mm kalınlık için kg/m² olmalı; genellikle 0,8 ile 2 arasındadır.');
    const torba = h.pos(v.torba, 'Torba ağırlığı');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 50) h.err('Fire payı %0 ile %50 arasında olmalı.');
    const carpan = 1 + fire / 100;
    const kgNet = alan * kal * sarf;
    const kg = kgNet * carpan;
    const hacim = alan * kal / 1000 * carpan;
    const adet = Math.ceil(kg / torba - 1e-9);
    return {
      rows: [
        ['Gerekli torba sayısı', h.fmt(adet, 0) + ' torba (' + h.fmt(torba, 2) + ' kg\'lık)'],
        ['Toplam kuru sıva (fireli)', h.fmt(kg, 1) + ' kg'],
        ['Firesiz sıva miktarı', h.fmt(kgNet, 1) + ' kg'],
        ['Metrekare sarfiyatı', h.fmt(kal * sarf, 2) + ' kg/m²'],
        ['Sıva hacmi (fireli)', h.fmt(hacim, 3) + ' m³'],
      ],
      note: 'Sonuç, girdiğiniz sarfiyat değerine dayanır; bu değer üründen ürüne değişir. Yüzey bozuksa ortalama kalınlık artacağı için gerçek tüketim hesaplanandan yüksek çıkabilir.',
    };
  },
  cases: [
    { in: { alan: '100', kalinlik: '20', sarfiyat: '1,5', torba: '25', fire: '10' }, out: { 'Gerekli torba sayısı': '132 torba (25 kg\'lık)', 'Toplam kuru sıva (fireli)': '3.300 kg', 'Firesiz sıva miktarı': '3.000 kg', 'Metrekare sarfiyatı': '30 kg/m²', 'Sıva hacmi (fireli)': '2,2 m³' } },
    { in: { alan: '50', kalinlik: '10', sarfiyat: '1,2', torba: '35', fire: '5' }, out: { 'Gerekli torba sayısı': '18 torba (35 kg\'lık)', 'Toplam kuru sıva (fireli)': '630 kg', 'Firesiz sıva miktarı': '600 kg', 'Sıva hacmi (fireli)': '0,525 m³' } },
    { in: { alan: '12', kalinlik: '15', sarfiyat: '1,4', torba: '25', fire: '0' }, out: { 'Gerekli torba sayısı': '11 torba (25 kg\'lık)', 'Toplam kuru sıva (fireli)': '252 kg', 'Metrekare sarfiyatı': '21 kg/m²', 'Sıva hacmi (fireli)': '0,18 m³' } },
    { in: { alan: '80', kalinlik: '8', sarfiyat: '1', torba: '40', fire: '10' }, out: { 'Gerekli torba sayısı': '18 torba (40 kg\'lık)', 'Toplam kuru sıva (fireli)': '704 kg', 'Sıva hacmi (fireli)': '0,704 m³' } },
    { in: { alan: '30', kalinlik: '25', sarfiyat: '1,5', torba: '25', fire: '4' }, out: { 'Gerekli torba sayısı': '47 torba (25 kg\'lık)', 'Toplam kuru sıva (fireli)': '1.170 kg', 'Firesiz sıva miktarı': '1.125 kg', 'Sıva hacmi (fireli)': '0,78 m³' } },
    { in: { alan: '200', kalinlik: '3', sarfiyat: '1', torba: '20', fire: '5' }, out: { 'Gerekli torba sayısı': '32 torba (20 kg\'lık)', 'Toplam kuru sıva (fireli)': '630 kg', 'Metrekare sarfiyatı': '3 kg/m²' } },
    { in: { alan: '0', kalinlik: '20', sarfiyat: '1,5', torba: '25', fire: '10' }, error: true },
    { in: { alan: '100', kalinlik: '200', sarfiyat: '1,5', torba: '25', fire: '10' }, error: true },
    { in: { alan: '100', kalinlik: '', sarfiyat: '1,5', torba: '25', fire: '10' }, error: true },
  ],
  howto: [
    'Sıvanacak toplam yüzey alanını metrekare olarak yazın. Kapı ve pencere boşluklarını düşmüş net alanı kullanın.',
    'Uygulayacağınız ortalama sıva kalınlığını milimetre olarak girin; 2 cm için 20 yazın.',
    'Kullanacağınız ürünün sarfiyat değerini yazın. Ambalajlarda genellikle "1 mm kalınlık için kg/m²" ya da "1 cm kalınlık için kg/m²" biçiminde verilir; ikincisini 10\'a bölerek girin.',
    'Torba ağırlığını ve fire payını kendi ürününüze ve işinize göre ayarlayın.',
    '"Hesapla" düğmesine basın; ilk satır almanız gereken torba sayısını gösterir.',
  ],
  sections: [
    { h: 'Sıva miktarı nasıl hesaplanır?', p: [
      'Sıva tüketimi üç şeye bağlıdır: yüzeyin büyüklüğü, sıvanın kalınlığı ve malzemenin yoğunluğu. Hazır sıva üreticileri yoğunluk yerine doğrudan <strong>sarfiyat</strong> değeri verir: bir metrekare yüzeyi bir milimetre kalınlığında kaplamak için kaç kilogram kuru toz gerektiği. Bu değer bilindiğinde hesap yalın bir çarpmaya dönüşür.',
    ], ul: [
      '<strong>Firesiz miktar (kg)</strong> = alan (m²) × kalınlık (mm) × sarfiyat (kg/m²/mm)',
      '<strong>Fireli miktar</strong> = firesiz miktar × (1 + fire ÷ 100)',
      '<strong>Torba sayısı</strong> = fireli miktar ÷ torba ağırlığı, yukarı yuvarlanır',
      '<strong>Sıva hacmi (m³)</strong> = alan × kalınlık ÷ 1000, fire eklenerek',
    ] },
    { h: 'Çözümlü örnek: 100 m² duvar, 2 cm sıva', p: [
      'Bir dairenin iç duvarlarında toplam 100 m² yüzeye 20 mm kalınlığında, sarfiyatı 1 mm için 1,5 kg/m² olan bir hazır sıva uygulanacak olsun. Ürün 25 kg\'lık torbalarda satılıyor ve yüzde 10 fire öngörülüyor.',
    ], ol: [
      'Metrekare sarfiyatı: 20 mm × 1,5 = 30 kg/m²',
      'Firesiz miktar: 100 m² × 30 kg/m² = 3000 kg',
      'Fireli miktar: 3000 × 1,10 = 3300 kg',
      'Torba sayısı: 3300 ÷ 25 = 132 torba',
      'Sıva hacmi: 100 × 0,020 = 2 m³; fireyle 2,2 m³',
    ] },
    { h: 'İkinci örnek: ince kat uygulama', p: [
      'Aynı mantık ince uygulamalarda da geçerlidir. 50 m² tavana 10 mm kalınlığında, sarfiyatı 1,2 kg/m² olan bir sıva uygulanırsa firesiz 600 kg, yüzde 5 fireyle 630 kg malzeme gerekir. 35 kg\'lık torbalarla 630 ÷ 35 = 18 torba eder. Sonuç tam sayı çıkmadığında araç her zaman yukarı yuvarlar; çünkü yarım torba satın alınamaz.',
    ] },
    { h: 'Sarfiyat değerini nereden bulurum?', p: [
      'Sarfiyat, ürünün türüne ve içeriğine göre belirgin biçimde değişir. Çimento esaslı sıvalar ağırdır; alçı esaslı ve hafif agregalı (perlitli) sıvalar aynı kalınlıkta daha az kilogram tüketir. Bu yüzden başka bir ürünün değeriyle hesap yapmak yanıltıcı olur. Doğru değer torbanın üzerinde ya da üreticinin teknik bilgi föyünde yazar.',
      'Etiketlerde iki farklı yazım görülür. "1 mm kalınlık için 1,4 kg/m²" biçimindeyse değeri doğrudan girin. "1 cm kalınlık için 14 kg/m²" biçimindeyse 10\'a bölüp 1,4 yazın. Bazı ürünlerde ise "bir torba şu kalınlıkta şu kadar metrekare kaplar" bilgisi verilir; bu durumda torba ağırlığını kaplanan alana ve kalınlığa bölerek sarfiyatı bulabilirsiniz. Örneğin 35 kg\'lık torba 10 mm kalınlıkta 2,5 m² kaplıyorsa sarfiyat 35 ÷ (2,5 × 10) = 1,4 kg/m² olur.',
      'Araçtaki varsayılan 1,4 değeri yalnızca bir başlangıç örneğidir; kendi ürününüzün değeriyle değiştirin.',
    ] },
    { h: 'Sıva kalınlığı nasıl belirlenir?', p: [
      'Kalınlık, yüzeyin düzgünlüğüne ve sıvanın türüne göre seçilir. Düzgün örülmüş gazbeton ya da beton yüzeylerde ince bir kat yeterli olurken, eğri ve girintili çıkıntılı tuğla duvarlarda yüzeyi şakülüne getirmek için daha kalın uygulama gerekir. Dış cephe sıvaları hava koşullarına dayanması için iç sıvalardan genellikle daha kalın yapılır. Saten alçı gibi son kat perdah malzemeleri ise yalnızca birkaç milimetre uygulanır.',
      'Hesapta kullanmanız gereken değer en kalın nokta değil, <strong>ortalama kalınlıktır</strong>. Bozuk bir duvarda bazı bölgeler 10 mm, bazıları 30 mm sıva alabilir. Ana (mastar çıtası) atıldıktan sonra birkaç noktadan derinlik ölçüp ortalamasını almak en gerçekçi sonucu verir. Her ürünün tek katta uygulanabileceği en az ve en çok kalınlık üretici tarafından belirtilir; daha kalın uygulamalar katlar hâlinde yapılır.',
    ] },
    { h: 'Sıvanacak alanı ölçmek', p: [
      'Duvar alanı, oda çevresi ile tavan yüksekliğinin çarpımından kapı ve pencere boşlukları düşülerek bulunur. 4 × 5 metrelik, 2,7 metre yüksekliğinde bir odanın çevresi 18 metredir; brüt duvar alanı 18 × 2,7 = 48,6 m² eder. Bir kapı (yaklaşık 1,9 m²) ve bir pencere (yaklaşık 2 m²) düşüldüğünde net alan yaklaşık 44,7 m² kalır. Tavan da sıvanacaksa 20 m² eklenir.',
      'Pencere ve kapı kenarlarındaki dönüş yüzeyleri (denizlik altı, söve, lento altı) da sıva alır. Bu küçük yüzeyler ayrıca hesaplanmıyorsa boşlukları tam düşmek yerine bir bölümünü alanda bırakmak ya da fire payını biraz yüksek tutmak pratik bir çözümdür.',
    ] },
    { h: 'Fire payı ve sık yapılan hatalar', ul: [
      'Yere dökülen, kovada ve makinede kalan, mastarla sıyrılıp yeniden kullanılamayan harç fire oluşturur. Elle uygulamada yüzde 5–10, bozuk yüzeylerde ve tavanlarda daha yüksek pay bırakılır.',
      'Kalınlığı santimetre olarak yazmak en sık yapılan hatadır: 2 cm için 2 değil 20 girilmelidir.',
      'Kuru toz ağırlığı ile su katılmış harç ağırlığı karıştırılmamalıdır; sarfiyat değerleri kuru toz üzerinden verilir.',
      'Hazır sıvaların raf ömrü sınırlıdır ve nemden etkilenir; ihtiyacın çok üzerinde stok yapmak yerine işin ilerleyişine göre almak daha doğrudur.',
    ], p: [
      'Bu araç hazır (torbalı) sıvalar için sarfiyat temelli bir ön hesap sunar; şantiyede çimento, kireç ve kumla hazırlanan geleneksel harcın bileşen miktarlarını vermez. Sonuçlar bilgilendirme amaçlıdır; kesin metraj ve ürün seçimi için uygulayıcınıza ya da üreticinin teknik belgelerine başvurun.',
    ] },
  ],
  faq: [
    ['1 metrekareye kaç kilogram sıva gider?', 'Kalınlık ile ürünün sarfiyat değerinin çarpımı kadar. Sarfiyatı 1 mm için 1,5 kg/m² olan bir sıva 20 mm kalınlıkta 30 kg/m², 10 mm kalınlıkta 15 kg/m² tüketir.'],
    ['Bir torba sıva kaç metrekare kaplar?', 'Torba ağırlığını metrekare sarfiyatına bölün. 25 kg\'lık torba, 30 kg/m² tüketimde yaklaşık 0,83 m², 15 kg/m² tüketimde yaklaşık 1,67 m² kaplar.'],
    ['Alçı sıva ile çimento esaslı sıvanın sarfiyatı aynı mı?', 'Hayır. Alçı esaslı ve hafif agregalı sıvalar genellikle daha düşük yoğunlukludur ve aynı kalınlıkta daha az kilogram tüketir. Her ürün için ambalajdaki değeri kullanın.'],
    ['Sarfiyat değeri ambalajda 1 cm için verilmiş, ne yapmalıyım?', 'Değeri 10\'a bölerek girin. Örneğin 1 cm kalınlık için 14 kg/m² yazıyorsa araca 1,4 yazın.'],
    ['Sıva hacmi (m³) ne işime yarar?', 'Silo ya da hazır yaş sıva siparişlerinde ve makineyle uygulamada miktar hacim üzerinden konuşulur. Ayrıca farklı ürünleri yoğunluktan bağımsız karşılaştırmanıza yardım eder.'],
    ['Fire payını ne kadar almalıyım?', 'Düzgün yüzeylerde ve deneyimli ekiple yüzde 5 yeterli olabilir. Bozuk duvarlarda, tavanlarda ve çok köşeli mekânlarda yüzde 10 ve üzeri almak daha güvenlidir.'],
    ['İç ve dış sıvayı birlikte hesaplayabilir miyim?', 'Kalınlıkları ve çoğunlukla ürünleri farklı olduğu için ayrı ayrı hesaplamak doğrudur. Her biri için alanı, kalınlığı ve sarfiyatı girip sonuçları ayrı not edin.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['duvar-alani-hesapla', 'tugla-hesapla', 'cimento-hesapla', 'harc-karisim-hesapla', 'sap-hesapla', 'mantolama-hesapla'],
};
