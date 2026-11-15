export default {
  slug: 'prizma-hacmi-hesapla',
  title: 'Dikdörtgenler Prizması Hacmi Hesaplama',
  h1Tail: 'en × boy × yükseklik',
  pageTitle: 'Dikdörtgenler Prizması Hacmi Hesaplama – En × Boy × Yükseklik',
  description: 'Dikdörtgenler prizmasının hacmini en, boy ve yükseklikten hesaplayın. Litre karşılığı, toplam yüzey alanı, yanal alan ve cisim köşegeni de gösterilir.',
  card: 'En, boy ve yükseklikten kutu, oda ya da depo hacmini; litre karşılığı, yüzey alanı ve köşegeniyle birlikte bulun.',
  category: 'matematik',
  keywords: ['dikdörtgenler prizması hacmi', 'prizma hacmi hesaplama', 'en boy yükseklik hacim', 'kutu hacmi hesaplama', 'dikdörtgen prizma yüzey alanı', 'koli hacmi kaç litre', 'prizma köşegeni'],
  lead: `Kutu, koli, oda, akvaryum ya da depo gibi dikdörtgenler prizması biçimindeki cisimlerin hacmini <strong>V = en · boy · yükseklik</strong> formülüyle hesaplayın. Araç ayrıca litre karşılığını, toplam yüzey alanını, yanal alanı ve cisim köşegenini verir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'En (a)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'boy', label: 'Boy (b)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'yukseklik', label: 'Yükseklik (c)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'birim', label: 'Uzunluk birimi', type: 'select', options: [['cm', 'Santimetre (cm)'], ['m', 'Metre (m)'], ['mm', 'Milimetre (mm)']] },
  ],
  compute(v, h) {
    const a = h.pos(v.en, 'En');
    const b2 = h.pos(v.boy, 'Boy');
    const c = h.pos(v.yukseklik, 'Yükseklik');
    const b = v.birim === 'm' || v.birim === 'mm' ? v.birim : 'cm';
    const litreKat = b === 'm' ? 1000 : b === 'mm' ? 1e-6 : 1e-3;
    const hacim = a * b2 * c;
    const yuzey = 2 * (a * b2 + a * c + b2 * c);
    const yanal = 2 * c * (a + b2);
    const kosegen = Math.sqrt(a * a + b2 * b2 + c * c);
    return {
      rows: [
        ['Hacim', `${h.fmt(hacim, 4)} ${b}³`],
        ['Litre karşılığı', `${h.fmt(hacim * litreKat, 4)} L`],
        ['Toplam yüzey alanı', `${h.fmt(yuzey, 4)} ${b}²`],
        ['Taban alanı', `${h.fmt(a * b2, 4)} ${b}²`],
        ['Yanal alan', `${h.fmt(yanal, 4)} ${b}²`],
        ['Cisim köşegeni', `${h.fmt(kosegen, 4)} ${b}`],
      ],
      note: 'Bütün köşelerin dik açılı olduğu kabul edilir. Kap kapasitesi için iç ölçüleri girin.',
    };
  },
  cases: [
    { in: { en: '2', boy: '3', yukseklik: '4', birim: 'cm' }, out: { 'Hacim': '24 cm³', 'Toplam yüzey alanı': '52 cm²', 'Yanal alan': '40 cm²', 'Cisim köşegeni': '5,3852 cm' } },
    { in: { en: '30', boy: '50', yukseklik: '40', birim: 'cm' }, out: { 'Hacim': '60.000 cm³', 'Litre karşılığı': '60 L', 'Toplam yüzey alanı': '9.400 cm²', 'Taban alanı': '1.500 cm²' } },
    { in: { en: '3', boy: '4', yukseklik: '12', birim: 'cm' }, out: { 'Hacim': '144 cm³', 'Toplam yüzey alanı': '192 cm²', 'Cisim köşegeni': '13 cm' } },
    { in: { en: '2', boy: '3', yukseklik: '2,5', birim: 'm' }, out: { 'Hacim': '15 m³', 'Litre karşılığı': '15.000 L', 'Toplam yüzey alanı': '37 m²', 'Yanal alan': '25 m²' } },
    { in: { en: '1', boy: '1', yukseklik: '1', birim: 'm' }, out: { 'Hacim': '1 m³', 'Toplam yüzey alanı': '6 m²', 'Cisim köşegeni': '1,7321 m' } },
    { in: { en: '100', boy: '50', yukseklik: '40', birim: 'cm' }, out: { 'Hacim': '200.000 cm³', 'Litre karşılığı': '200 L' } },
    { in: { en: '2', boy: '3', yukseklik: '0', birim: 'cm' }, error: true },
    { in: { en: '', boy: '3', yukseklik: '4', birim: 'cm' }, error: true },
    { in: { en: '2', boy: 'x', yukseklik: '4', birim: 'm' }, error: true },
  ],
  howto: [
    `Cismin enini, boyunu ve yüksekliğini aynı birimle ölçün. Hangi kenara en, hangisine boy dediğiniz hacmi değiştirmez.`,
    `Üç ölçüyü ilgili alanlara yazın; ondalıklı değerlerde virgül ya da nokta kullanabilirsiniz.`,
    `Ölçü birimini seçin. Koli ve akvaryum için santimetre, oda ve depo için metre, küçük parçalar için milimetre uygundur.`,
    `"Hesapla" düğmesine basın; hacim, litre karşılığı, yüzey alanları ve cisim köşegeni sonuç kutusunda görünür.`,
  ],
  sections: [
    { h: 'Dikdörtgenler prizması ve formülleri', p: [
      `Dikdörtgenler prizması, altı yüzü de dikdörtgen olan ve karşılıklı yüzleri birbirine eş olan cisimdir. Gündelik hayatta en sık karşılaşılan üç boyutlu biçimdir: kutular, odalar, tuğlalar, dolaplar, kitaplar hep bu biçime yakındır. Üç ayrıt uzunluğu a, b ve c ile gösterilirse:`,
    ], ul: [
      `<strong>Hacim:</strong> V = a · b · c`,
      `<strong>Toplam yüzey alanı:</strong> A = 2 · (a·b + a·c + b·c)`,
      `<strong>Yanal alan:</strong> 2 · c · (a + b) — alt ve üst yüz dışındaki dört yan yüz`,
      `<strong>Cisim köşegeni:</strong> √(a² + b² + c²)`,
    ] },
    { h: 'Çözümlü örnek: küçük bir kutu', p: [
      `Ayrıtları 2 cm, 3 cm ve 4 cm olan bir prizmanın hacmi 2 · 3 · 4 = <strong>24 cm³</strong> olur. Yüzey alanı için üç farklı yüzün alanı bulunur: 2·3 = 6, 2·4 = 8 ve 3·4 = 12 cm². Her yüzden iki tane olduğundan toplam 2 · (6 + 8 + 12) = <strong>52 cm²</strong> eder. Cisim köşegeni √(4 + 9 + 16) = √29 ≈ 5,3852 cm\'dir.`,
    ] },
    { h: 'Çözümlü örnek: koli ve oda', p: [
      `Eni 30 cm, boyu 50 cm, yüksekliği 40 cm olan bir kolinin hacmi 30 · 50 · 40 = 60.000 cm³\'tür. Bin santimetreküp bir litre ettiğinden koli <strong>60 litre</strong> hacme sahiptir. Koliyi tamamen kaplamak için gereken yüzey 2 · (1.500 + 1.200 + 2.000) = 9.400 cm², yani 0,94 m² olur.`,
      `Eni 2 m, boyu 3 m, tavan yüksekliği 2,5 m olan bir odanın hacmi 2 · 3 · 2,5 = <strong>15 m³</strong> eder. Duvarların toplam alanı yanal alandır: 2 · 2,5 · (2 + 3) = 25 m². Boya hesabı yaparken bu değerden kapı ve pencere boşlukları düşülür; tavan da boyanacaksa 6 m²\'lik taban alanı eklenir.`,
    ] },
    { h: 'Hacim birimleri ve litre', p: [
      `Üç ölçü de aynı birimde olmalıdır; biri metre diğerleri santimetre ise önce dönüştürün. Santimetre ile yapılan hesap cm³ verir ve 1000\'e bölünerek litreye çevrilir. Metre ile yapılan hesap m³ verir ve 1 m³ = 1000 litredir. Bu nedenle 100 cm × 50 cm × 40 cm ölçülerindeki bir akvaryumun brüt hacmi 200.000 cm³, yani 200 litredir. Gerçek su miktarı cam kalınlığı, üstte bırakılan boşluk ve içerideki kum, taş gibi malzemeler nedeniyle bundan az olur.`,
    ] },
    { h: 'Kullanım senaryoları', ul: [
      `<strong>Kargo ve taşımacılık:</strong> Koli hacmi, araç kasasına ya da depoya kaç koli sığacağını tahmin etmek için kullanılır.`,
      `<strong>Ev ve inşaat:</strong> Oda hacmi klima ve havalandırma kapasitesi seçiminde; dikdörtgen temel ya da döşeme hacmi beton miktarında esas alınır.`,
      `<strong>Depolama:</strong> Dikdörtgen su deposu, sandık, buzdolabı ya da dondurucu iç hacmi litre olarak ifade edilir.`,
      `<strong>Bahçe:</strong> Yükseltilmiş bir yetiştirme kasasını doldurmak için gereken toprak miktarı en, boy ve derinlikten hesaplanır.`,
      `<strong>Köşegen:</strong> Bir kutuya ya da bagaja sığabilecek en uzun düz cismin (olta, boru, çubuk) boyu cisim köşegeninden anlaşılır.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      `Farklı birimleri karıştırmak en yaygın hatadır: 2 m × 50 cm × 40 cm ölçülerini doğrudan çarpmak anlamsız bir sayı verir. İkinci hata dış ölçüyle kapasite hesaplamaktır; kalın duvarlı bir kasada iç hacim belirgin biçimde küçüktür. Üçüncüsü, yüzey alanında her yüzün iki kez sayılması gerektiğini unutmaktır.`,
      `Araç, bütün köşeleri dik açılı olan prizma içindir. Yan yüzleri eğik kasalar, kenarları yuvarlatılmış kaplar ve tabanı dikdörtgen olmayan prizmalar farklı hesap gerektirir. Sonuçlar bilgilendirme amaçlıdır; beton, hafriyat ya da yük taşıma gibi maliyet ve güvenlik doğuran işlerde yerinde ölçüm ve uzman hesabı esas alınmalıdır.`,
    ] },
  ],
  faq: [
    ['Dikdörtgenler prizmasının hacmi nasıl hesaplanır?', 'En, boy ve yükseklik birbiriyle çarpılır: V = a · b · c. Ayrıtları 2, 3 ve 4 cm olan prizmanın hacmi 24 cm³ olur.'],
    ['Kutunun kaç litre olduğunu nasıl bulurum?', 'Ölçüleri santimetre olarak çarpın ve sonucu 1000\'e bölün. 30 × 50 × 40 cm ölçülerindeki koli 60.000 cm³, yani 60 litredir. Araç bu değeri "Litre karşılığı" satırında gösterir.'],
    ['Yüzey alanı nasıl hesaplanır?', 'Üç farklı yüzün alanı toplanır ve ikiyle çarpılır: A = 2 · (a·b + a·c + b·c). Ayrıtları 2, 3 ve 4 cm olan prizmada bu değer 52 cm² eder.'],
    ['Küp ile dikdörtgenler prizması arasındaki fark nedir?', 'Küp, üç ayrıtı da eşit olan özel bir dikdörtgenler prizmasıdır. Bu araca üç ölçüyü de aynı girerseniz küpün hacmini ve yüzey alanını elde edersiniz.'],
    ['Cisim köşegeni ne işe yarar?', 'Prizmanın karşılıklı en uzak iki köşesi arasındaki uzaklıktır ve içine sığabilecek en uzun düz cismin boyunu gösterir. √(a² + b² + c²) ile hesaplanır; 3 × 4 × 12 cm\'lik kutuda tam 13 cm\'dir.'],
    ['Oda hacmini metreküp olarak nasıl bulurum?', 'Odanın enini, boyunu ve tavan yüksekliğini metre olarak girin. 2 m × 3 m × 2,5 m ölçülerindeki oda 15 m³ hacme sahiptir.'],
    ['Hacim bilinirken eksik kenar nasıl bulunur?', 'Hacmi bilinen iki kenarın çarpımına bölün. Örneğin hacmi 144 cm³, eni 3 cm ve boyu 4 cm olan prizmanın yüksekliği 144 ÷ 12 = 12 cm\'dir.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['kup-hacmi-hesapla', 'piramit-hacmi-hesapla', 'silindir-hacmi-hesapla', 'litre-metrekup-cevir', 'oda-hacmi-hesapla', 'akvaryum-hacmi-hesapla'],
};
