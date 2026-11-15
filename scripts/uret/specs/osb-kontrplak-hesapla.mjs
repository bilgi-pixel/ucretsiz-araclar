export default {
  slug: 'osb-kontrplak-hesapla',
  title: 'OSB ve Kontrplak Levha Hesaplama',
  h1Tail: 'levha adedi ve hacim',
  pageTitle: 'OSB ve Kontrplak Levha Hesaplama – Kaç Levha Gerekir?',
  description: 'Kaplanacak yüzeyin ölçüsüne ve levha boyutuna göre kaç adet OSB ya da kontrplak gerektiğini hesaplayın. Fire payı, toplam alan, hacim ve tutar birlikte gösterilir.',
  card: 'Yüzey ölçüsü ve levha boyutundan gereken OSB ya da kontrplak adedini, toplam alanı, hacmi ve tutarı hesaplayın.',
  category: 'insaat',
  keywords: ['osb hesaplama', 'kontrplak hesaplama', 'kaç adet osb gerekir', 'osb levha ölçüleri', 'plywood hesaplama', 'osb metrekare hesaplama', 'levha adedi hesaplama'],
  lead: 'Çatı, döşeme ya da duvar kaplaması için kaç levha almanız gerektiğini bulun. Araç kaplanacak alanı fire payıyla büyütür, seçtiğiniz levhanın alanına böler ve sonucu <strong>tam levhaya yukarı yuvarlar</strong>; kalınlık yazarsanız toplam hacmi de verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Yüzey eni (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'boy', label: 'Yüzey boyu (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'levha', label: 'Levha ölçüsü', type: 'select', options: [['1220x2440', '1220 × 2440 mm'], ['1250x2500', '1250 × 2500 mm'], ['ozel', 'Özel ölçü (aşağıya yazın)']] },
    { id: 'ozelEn', label: 'Özel levha eni (mm)', type: 'number', placeholder: 'Örn. 1500', hint: 'Yalnızca "Özel ölçü" seçildiğinde kullanılır.' },
    { id: 'ozelBoy', label: 'Özel levha boyu (mm)', type: 'number', placeholder: 'Örn. 3000' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'kalinlik', label: 'Levha kalınlığı (mm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 18', hint: 'Yazarsanız toplam hacim (m³) hesaplanır.' },
    { id: 'fiyat', label: 'Levha fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 600', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Yüzey eni');
    const boy = h.pos(v.boy, 'Yüzey boyu');
    let le, lb;
    if (v.levha === 'ozel') {
      le = h.pos(v.ozelEn, 'Özel levha eni');
      lb = h.pos(v.ozelBoy, 'Özel levha boyu');
    } else {
      const p = String(v.levha || '1220x2440').split('x');
      le = Number(p[0]); lb = Number(p[1]);
    }
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const levhaAlan = le * lb / 1e6;
    const alan = en * boy;
    const fireli = alan * (1 + fire / 100);
    const adet = Math.max(1, Math.ceil(fireli / levhaAlan - 1e-9));
    const rows = [
      ['Gerekli levha sayısı', h.fmt(adet, 0) + ' adet'],
      ['Kaplanacak alan', h.fmt(alan, 2) + ' m²'],
      ['Fire dahil gereken alan', h.fmt(fireli, 2) + ' m²'],
      ['Bir levhanın alanı', h.fmt(levhaAlan, 4) + ' m²'],
      ['Alınacak toplam levha alanı', h.fmt(adet * levhaAlan, 2) + ' m²'],
    ];
    if (String(v.kalinlik ?? '').trim() !== '') {
      const k = h.pos(v.kalinlik, 'Levha kalınlığı');
      rows.push(['Toplam hacim', h.fmt(adet * levhaAlan * k / 1000, 3) + ' m³']);
    }
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Levha fiyatı');
      rows.push(['Toplam tutar', h.para(adet * f)]);
    }
    return {
      rows,
      note: 'Hesap alan üzerinden yapılır. Yüzey ölçüleri levha ölçüsünün katı değilse kesim planına göre bir iki levha fazlası gerekebilir.',
    };
  },
  cases: [
    { in: { en: '5', boy: '4', levha: '1220x2440', fire: '10' }, out: { 'Gerekli levha sayısı': '8 adet', 'Kaplanacak alan': '20 m²', 'Fire dahil gereken alan': '22 m²', 'Bir levhanın alanı': '2,9768 m²', 'Alınacak toplam levha alanı': '23,81 m²' } },
    { in: { en: '5', boy: '4', levha: '1250x2500', fire: '10' }, out: { 'Gerekli levha sayısı': '8 adet', 'Bir levhanın alanı': '3,125 m²', 'Alınacak toplam levha alanı': '25 m²' } },
    { in: { en: '6', boy: '2,5', levha: '1250x2500', fire: '0' }, out: { 'Gerekli levha sayısı': '5 adet', 'Kaplanacak alan': '15 m²' } },
    { in: { en: '2,5', boy: '2,5', levha: '1250x2500', fire: '0' }, out: { 'Gerekli levha sayısı': '2 adet', 'Alınacak toplam levha alanı': '6,25 m²' } },
    { in: { en: '10', boy: '8', levha: '1220x2440', fire: '5', kalinlik: '18' }, out: { 'Gerekli levha sayısı': '29 adet', 'Fire dahil gereken alan': '84 m²', 'Toplam hacim': '1,554 m³' } },
    { in: { en: '12', boy: '3', levha: 'ozel', ozelEn: '1500', ozelBoy: '3000', fire: '10' }, out: { 'Gerekli levha sayısı': '9 adet', 'Bir levhanın alanı': '4,5 m²', 'Fire dahil gereken alan': '39,6 m²' } },
    { in: { en: '5', boy: '4', levha: '1220x2440', fire: '10', fiyat: '600' }, out: { 'Gerekli levha sayısı': '8 adet', 'Toplam tutar': '4.800,00 TL' } },
    { in: { en: '5', boy: '4', levha: 'ozel', ozelEn: '', ozelBoy: '', fire: '10' }, error: true },
    { in: { en: '', boy: '4', levha: '1220x2440', fire: '10' }, error: true },
  ],
  howto: [
    'Kaplayacağınız yüzeyin enini ve boyunu metre olarak yazın. Birden fazla yüzey varsa alanları toplayıp eni 1, boyu toplam metrekare olarak girebilirsiniz.',
    'Satın alacağınız levhanın ölçüsünü listeden seçin. Listede yoksa "Özel ölçü"yü seçip levhanın enini ve boyunu milimetre olarak girin.',
    'Fire payını yüzeyin biçimine göre ayarlayın; dikdörtgen yüzeylerde %10 yaygın bir başlangıçtır.',
    'Hacim ya da tutar görmek istiyorsanız kalınlığı ve levha fiyatını da yazın.',
    '"Hesapla" düğmesine basın; levha adedi, toplam alan ve varsa hacim ile tutar görüntülenir.',
  ],
  sections: [
    { h: 'Levha adedi nasıl hesaplanır?', p: [
      'Yöntem alan esaslıdır. Önce kaplanacak yüzeyin alanı bulunur: <strong>alan = en × boy</strong>. Kesim kayıplarını karşılamak için fire eklenir: <strong>gereken alan = alan × (1 + fire ÷ 100)</strong>. Bir levhanın alanı, milimetre cinsinden en ve boyun çarpımının bir milyona bölünmesiyle metrekareye çevrilir. Son olarak gereken alan levha alanına bölünür ve <strong>yukarı yuvarlanır</strong>.',
      'En yaygın iki levha ölçüsünün alanları şöyledir: 1220 × 2440 mm levha 2,9768 m², 1250 × 2500 mm levha 3,125 m² kaplar. Aradaki fark levha başına yaklaşık yüzde beştir; büyük metrajlarda bu fark birkaç levhaya karşılık gelir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '5 × 4 metre ölçüsünde bir döşeme, 1220 × 2440 mm OSB ile kaplanacak ve %10 fire öngörülüyor olsun.',
    ], ol: [
      'Kaplanacak alan: 5 × 4 = 20 m².',
      'Fire dahil alan: 20 × 1,10 = 22 m².',
      'Levha alanı: 1,22 × 2,44 = 2,9768 m².',
      'Levha ihtiyacı: 22 ÷ 2,9768 = 7,39; yukarı yuvarlanınca <strong>8 adet</strong>.',
      'Alınacak toplam levha alanı: 8 × 2,9768 = 23,81 m².',
      'Levha fiyatı 600 TL ise toplam tutar 8 × 600 = 4.800,00 TL olur.',
    ] },
    { h: 'OSB ile kontrplak arasındaki fark', p: [
      '<strong>OSB</strong> (yönlendirilmiş yonga levha), ince ve uzun ağaç yongalarının katmanlar hâlinde, her katmanda belirli bir yöne dizilerek reçineyle preslenmesiyle üretilir. Çatı altı kaplaması, hafif çelik ve ahşap karkas yapıların duvar ve döşeme kaplaması, şantiye perdeleri ve ambalaj sandıkları başlıca kullanım alanlarıdır. Nem dayanımına ve yük taşıma durumuna göre sınıflara ayrılır; nemli ortamda taşıyıcı amaçla kullanılacak levhanın buna uygun sınıfta olması gerekir.',
      '<strong>Kontrplak</strong> (plywood), ince ağaç kaplamalarının lifleri birbirine dik gelecek biçimde üst üste yapıştırılmasıyla elde edilir. Yüzeyi daha düzgündür, vida tutuşu ve kenar dayanımı iyidir. Beton kalıbı (film kaplı kontrplak), mobilya, araç kasası zemini, tekne ve sahne yapımında tercih edilir. Genellikle OSB\'den pahalıdır. Hangi malzemenin seçileceği yüke, neme, görünür yüzey beklentisine ve bütçeye bağlıdır; adet hesabı ise ikisi için de aynıdır.',
    ] },
    { h: 'Alan hesabı ile kesim planı arasındaki fark', p: [
      'Alan üzerinden yapılan hesap, kesilen parçaların başka bir yerde kullanılabildiğini varsayar. Gerçekte her artık parça işe yaramaz. Örneğin 2,5 × 2,5 metrelik bir yüzeye 1250 × 2500 mm levha tam oturur ve iki levha yeter. Ancak 2,6 × 2,6 metrelik bir yüzeyde alan hesabı fireli hâliyle üç levha gösterse de, kenarda kalan 10 santimetrelik şeritleri kapatmak için parçaların nasıl yerleştirileceği önem kazanır.',
      'Bu nedenle sipariş vermeden önce basit bir yerleşim krokisi çizmek yararlıdır: levhaları yüzeye sırayla dizin, her sıranın sonunda kesilen parçanın bir sonraki sıranın başında kullanılıp kullanılamayacağına bakın. Taşıyıcı kaplamalarda levha ek yerlerinin karkas elemanlarının (mertek, dikme, kiriş) üzerine denk gelmesi gerekir; bu koşul, karkas aralığı levha ölçüsüyle uyumlu değilse fireyi artırır.',
    ] },
    { h: 'Fire payı için öneriler', ul: [
      '<strong>Levha ölçüsünün katı olan dikdörtgen yüzeyler:</strong> %5 yeterli olabilir.',
      '<strong>Sıradan dikdörtgen döşeme ve duvarlar:</strong> %10 yaygın kabuldür.',
      '<strong>Kırma ve beşik çatılar, mahya ve dere kesimleri:</strong> açılı kesimler nedeniyle %15 ve üzeri düşünülmelidir.',
      '<strong>Çok sayıda pencere, kapı ve baca boşluğu olan yüzeyler:</strong> boşluk alanı düşülse bile kesim artığı büyür; fireyi yüksek tutun.',
      '<strong>Şaşırtmalı (tuğla örgüsü gibi) dizilim:</strong> ek yerlerinin üst üste gelmemesi için gereklidir ve bir miktar ek kesim getirir.',
    ] },
    { h: 'Kalınlık, hacim ve ağırlık', p: [
      'Levha kalınlığını yazdığınızda araç toplam hacmi metreküp olarak verir: <strong>hacim = levha sayısı × levha alanı × kalınlık</strong>. Örneğin 29 adet 1220 × 2440 mm, 18 mm kalınlığında levhanın hacmi 29 × 2,9768 × 0,018 = 1,554 m³\'tür. Bazı satıcılar levhayı adet yerine metreküp üzerinden fiyatlandırır; bu değer fiyat karşılaştırmasında işe yarar.',
      'Hacmi malzemenin yoğunluğuyla çarparak yaklaşık ağırlığı bulabilirsiniz. Yoğunluk ürüne ve ağaç türüne göre değişir; kesin değer için üreticinin teknik föyüne bakın. Ağırlık bilgisi nakliye aracını seçerken ve levhaların çatıya ya da üst kata nasıl çıkarılacağını planlarken gerekir.',
    ] },
    { h: 'Uygulamada dikkat edilecekler ve uyarı', p: [
      'Ahşap esaslı levhalar nemle bir miktar genleşir. Bu yüzden levhalar birbirine sıkı sıkıya dayandırılmaz; aralarında ve duvar diplerinde üreticinin önerdiği kadar küçük bir derz boşluğu bırakılır. Levhalar montajdan önce uygulanacakları ortamda bir süre bekletilerek ortamın nemine alıştırılmalı, şantiyede zeminden yükseltilmiş ve üzeri örtülü biçimde istiflenmelidir.',
      'Bu araç yalnızca adet ve miktar hesabı yapar; hangi kalınlıkta levhanın hangi açıklığı taşıyacağını, vida aralığını ya da levha sınıfını belirlemez. Taşıyıcı döşeme, çatı ve perde duvar uygulamalarında kalınlık ve sınıf seçimi için üretici tablolarına ve bir inşaat mühendisine danışın.',
    ] },
  ],
  faq: [
    ['Bir OSB levha kaç metrekaredir?', '1220 × 2440 mm ölçüsündeki levha 2,9768 m², 1250 × 2500 mm ölçüsündeki levha 3,125 m² kaplar. Hesap için en ile boyu metreye çevirip çarpmanız yeterlidir.'],
    ['20 metrekare için kaç OSB gerekir?', '%10 fireyle 22 m² gerekir. 1220 × 2440 mm levhadan 8 adet, 1250 × 2500 mm levhadan da 8 adet alınmalıdır; ikinci durumda elinizde daha fazla yedek kalır.'],
    ['100 metrekare çatı için kaç levha gerekir?', '%10 fireyle 110 m² eder. 1220 × 2440 mm levhadan 110 ÷ 2,9768 = 36,95, yani 37 adet; 1250 × 2500 mm levhadan 110 ÷ 3,125 = 35,2, yani 36 adet gerekir. Kırma çatılarda fireyi artırın.'],
    ['Kontrplak için de aynı hesap geçerli mi?', 'Evet. Adet hesabı malzemeden bağımsızdır ve yalnızca levha ölçüsüne bağlıdır. Kontrplak, MDF, sunta ve benzeri levhalar için de ölçüyü seçerek ya da özel ölçü girerek kullanabilirsiniz.'],
    ['Levha ölçüsü listede yoksa ne yapmalıyım?', '"Özel ölçü" seçeneğini işaretleyip levhanın enini ve boyunu milimetre olarak yazın. Örneğin 1500 × 3000 mm bir levha 4,5 m² olarak hesaba katılır.'],
    ['Pencere ve kapı boşluklarını düşmeli miyim?', 'Büyük boşlukları düşebilirsiniz; bunun için net alanı kendiniz hesaplayıp eni 1, boyu net metrekare olarak girin. Ancak boşluk çevresindeki kesimler fireyi artırdığından fire payını düşürmeyin.'],
    ['Hacim neden gösteriliyor?', 'Bazı satıcılar levhaları metreküp fiyatıyla satar; ayrıca nakliye ve ağırlık tahmini için hacim gerekir. Kalınlık alanını boş bırakırsanız bu satır gösterilmez.'],
    ['Yazdığım ölçüler ve fiyatlar kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz bilgiler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kereste-hacmi-hesapla', 'alcipan-hesapla', 'cati-alani-hesapla', 'laminat-hesapla', 'civi-vida-hesapla'],
};
