export default {
  slug: 'kg-stone-cevir',
  title: 'Kilogram Stone Çevirici',
  h1Tail: 'kg ↔ st',
  pageTitle: 'Kilogram Stone Çevirici – kg\'dan Stone\'a, Stone ve Pounddan kg\'a',
  description: 'Kilogramı stone\'a, stone ve pound olarak verilen kiloyu kilograma çevirin. 1 stone = 14 pound = 6,35029318 kg tanımıyla çalışır.',
  card: 'Kilogramı stone\'a, "11 st 7 lb" gibi stone-pound değerlerini kilograma çevirin; İngiliz usulü kilo gösterimi için.',
  category: 'birim',
  keywords: ['kg stone çevirme', 'stone kaç kg', '1 stone kaç kilo', 'stone pound kg', 'kg to stone', 'st lb kg hesaplama', 'stone ağırlık birimi'],
  lead: 'Vücut ağırlığını kilogramdan stone\'a (<strong>st</strong>) ya da stone ve pounddan kilograma çevirin. Birleşik Krallık ve İrlanda\'da kilo çoğunlukla "11 stone 7" biçiminde söylenir; araç <strong>1 stone = 14 pound = 6,35029318 kg</strong> tanımını kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 70' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kg', 'Kilogram → Stone'], ['st', 'Stone → Kilogram']] },
    { id: 'ekPound', label: 'Ek pound (isteğe bağlı)', type: 'number', placeholder: 'Örn. 7', hint: 'Yalnızca Stone → Kilogram yönünde kullanılır: "11 st 7 lb" için buraya 7 yazın.' },
  ],
  compute(v, h) {
    const LB = 0.45359237;
    const x = h.nonneg(v.deger, 'Değer');
    let lb;
    if (v.yon === 'st') {
      const ek = h.opt(v.ekPound, 0, 'Ek pound');
      if (ek < 0) h.err('"Ek pound" negatif olamaz.');
      lb = x * 14 + ek;
    } else {
      if (String(v.ekPound ?? '').trim() !== '') h.err('"Ek pound" alanı yalnızca Stone → Kilogram yönünde kullanılır; bu alanı boşaltın ya da yönü değiştirin.');
      lb = x / LB;
    }
    const kg = v.yon === 'st' ? lb * LB : x;
    const st = lb / 14;
    let tam = Math.floor(st + 1e-9);
    let kalan = Math.round((lb - tam * 14) * 100) / 100;
    if (kalan < 0) kalan = 0;
    if (kalan >= 14) { tam += 1; kalan = 0; }
    const ana = v.yon === 'st'
      ? [['Kilogram', h.fmt(kg, 4) + ' kg'], ['Stone', h.fmt(st, 4) + ' st']]
      : [['Stone', h.fmt(st, 4) + ' st'], ['Kilogram', h.fmt(kg, 4) + ' kg']];
    return {
      rows: [
        ...ana,
        ['Stone ve pound', `${h.fmt(tam, 0)} st ${h.fmt(kalan, 2)} lb`],
        ['Pound', h.fmt(lb, 4) + ' lb'],
      ],
      note: '1 st = 14 lb = 6,35029318 kg (tam tanım). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '70', yon: 'kg' }, out: { 'Stone': '11,0231 st', 'Stone ve pound': '11 st 0,32 lb', 'Pound': '154,3236 lb' } },
    { in: { deger: '11', yon: 'st', ekPound: '7' }, out: { 'Kilogram': '73,0284 kg', 'Stone': '11,5 st', 'Pound': '161 lb' } },
    { in: { deger: '10', yon: 'st' }, out: { 'Kilogram': '63,5029 kg', 'Stone ve pound': '10 st 0 lb' } },
    { in: { deger: '6,35029318', yon: 'kg' }, out: { 'Stone': '1 st', 'Stone ve pound': '1 st 0 lb', 'Pound': '14 lb' } },
    { in: { deger: '100', yon: 'kg' }, out: { 'Stone': '15,7473 st', 'Stone ve pound': '15 st 10,46 lb' } },
    { in: { deger: '1', yon: 'st' }, out: { 'Kilogram': '6,3503 kg', 'Pound': '14 lb' } },
    { in: { deger: 'abc', yon: 'kg' }, error: true },
    { in: { deger: '70', yon: 'kg', ekPound: '5' }, error: true },
    { in: { deger: '-2', yon: 'st' }, error: true },
  ],
  howto: [
    'Kilogramdan stone\'a çevirecekseniz "Değer" alanına kiloyu yazın ve yönü "Kilogram → Stone" olarak bırakın; "Ek pound" alanını boş geçin.',
    'Stone\'dan kilograma çevirecekseniz yönü "Stone → Kilogram" yapın, "Değer" alanına stone sayısını, varsa artan poundu "Ek pound" alanına yazın (11 st 7 lb için 11 ve 7).',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı gösterir.',
    '"Stone ve pound" satırındaki değeri İngiltere kaynaklı form, uygulama ya da tartı kayıtlarına doğrudan aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Stone nedir?', p: [
      'Stone, sözcük anlamı "taş" olan ve bugün neredeyse yalnızca Birleşik Krallık ile İrlanda\'da, o da insanların vücut ağırlığını söylerken kullanılan bir kütle birimidir. Kısaltması <strong>st</strong> biçimindedir. Bir stone 14 pounda eşittir; pound da tam olarak 0,45359237 kilogram olduğu için bir stone 14 × 0,45359237 = 6,35029318 kilogram eder.',
      'Birimin adı, eskiden pazarlarda tartı ağırlığı olarak gerçekten taş kullanılmasından gelir. Geçmişte yün, et ya da baharat gibi mallar için farklı stone değerleri vardı; günümüzde ise tek bir değer, 14 poundluk stone kullanılır. ABD\'de stone kullanılmaz; orada kilo yalnızca pound olarak söylenir.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Kilogramdan stone\'a geçmek için değeri 6,35029318\'e bölersiniz: <strong>st = kg ÷ 6,35029318</strong>. Stone\'dan kilograma geçerken aynı sayıyla çarparsınız: <strong>kg = st × 6,35029318</strong>. Değer stone ve pound olarak verilmişse önce tamamını pounda çevirmek en kolay yoldur: <strong>lb = st × 14 + ek pound</strong>, ardından <strong>kg = lb × 0,45359237</strong>.',
      'Örnek 1: 70 kg kaç stone eder? 70 ÷ 6,35029318 = 11,0231 stone. Tam kısım 11 stone\'dur; kalan 0,0231 stone 14 ile çarpılınca 0,32 pound bulunur. Yani 70 kg, "11 st 0,32 lb" olarak yazılır; gündelik konuşmada kısaca "11 stone" denir.',
      'Örnek 2: "11 stone 7" diyen birinin kilosu nedir? 11 × 14 + 7 = 161 pound; 161 × 0,45359237 = 73,0284 kg. Bu değer aynı zamanda 11,5 stone\'dur, çünkü 7 pound yarım stone eder.',
      'Örnek 3: 100 kg, 100 ÷ 6,35029318 = 15,7473 stone, yani 15 st 10,46 lb eder.',
    ] },
    { h: 'Stone ve pound yazımı nasıl okunur?', p: [
      'İngiltere\'de kilo, boy ölçüsündeki feet-inç mantığına benzer biçimde iki parçalı söylenir: önce tam stone, sonra artan pound. "9 st 4 lb", "9 stone 4" ya da yalnızca "9 st 4" yazımlarının üçü de aynı anlama gelir. Artan pound her zaman 0 ile 14 arasındadır; 14 pounda ulaşınca bir sonraki stone\'a geçilir.',
      'Buradaki en yaygın yanılgı, bu yazımı ondalık sayı sanmaktır. "10 st 7 lb" 10,7 stone değildir; 7 pound yarım stone ettiği için doğru ondalık karşılık 10,5 stone\'dur. Aynı şekilde 10,7 stone da "10 st 7 lb" değil, yaklaşık 10 st 9,8 lb eder. Araç her iki gösterimi ayrı satırlarda verdiği için bu karışıklığı kendi gözünüzle görebilirsiniz.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 st</strong> = 6,3503 kg',
      '<strong>8 st</strong> = 50,8023 kg',
      '<strong>9 st</strong> = 57,1526 kg',
      '<strong>10 st</strong> = 63,5029 kg',
      '<strong>11 st</strong> = 69,8532 kg',
      '<strong>12 st</strong> = 76,2035 kg',
      '<strong>13 st</strong> = 82,5538 kg',
      '<strong>14 st</strong> = 88,9041 kg',
      '<strong>15 st</strong> = 95,2544 kg',
      '<strong>50 kg</strong> = 7 st 12,23 lb',
      '<strong>60 kg</strong> = 9 st 6,28 lb',
      '<strong>80 kg</strong> = 12 st 8,37 lb',
      '<strong>90 kg</strong> = 14 st 2,42 lb',
    ] },
    { h: 'Bu çeviriye ne zaman ihtiyaç duyulur?', p: [
      'İngiltere\'de yaşayan ya da oraya taşınan Türkiye\'den kişiler, aile hekimi kayıtlarında, spor salonu üyeliklerinde ve banyo tartılarında stone birimiyle karşılaşır. İngiliz yapımı diyet ve spor programlarında, dizi ve belgesellerde, boks ve at yarışı haberlerinde ağırlıklar stone ile söylenir; jokeylerin taşıdığı ağırlık da geleneksel olarak stone ve pound ile ilan edilir. İngilizce kilo verme forumlarında "2 stone verdim" diyen biri yaklaşık 12,7 kg vermiştir.',
      'Ters yönde, Türkiye\'deki bir tartıdan okunan kilogram değerini İngiliz bir uygulamaya ya da forma girerken stone ve pound karşılığına ihtiyaç duyarsınız. İkinci el İngiliz tartılarında kadranın yalnızca stone ile işaretlenmiş olması da sık görülen bir durumdur.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç negatif değer kabul etmez; "Ek pound" alanı yalnızca stone\'dan kilograma çeviride anlamlıdır ve öbür yönde dolu bırakılırsa yanlış okumayı önlemek için uyarı verir. Artan pound için 14\'ten büyük bir değer yazarsanız hesap yine doğru yapılır, ancak sonuçtaki "Stone ve pound" satırı değeri kurala uygun biçimde yeniden düzenler.',
      'Bu sayfa yalnızca birim çevirir; kilonuzun sağlıklı aralıkta olup olmadığına dair bir değerlendirme yapmaz. Kilo takibi, diyet ya da ilaç dozu gibi sağlık kararları için hekiminize ya da diyetisyeninize danışın.',
    ] },
  ],
  faq: [
    ['1 stone kaç kilogramdır?', '1 stone tam olarak 6,35029318 kilogramdır; pratikte 6,35 kg olarak alınır. Bu değer 14 pound ile 0,45359237 kg\'ın çarpımından gelir.'],
    ['1 kilogram kaç stone eder?', '1 kilogram yaklaşık 0,1575 stone\'dur. 10 kg 1,5747 stone, 100 kg 15,7473 stone eder.'],
    ['1 stone kaç pounddur?', '1 stone 14 pounddur. Bu yüzden stone ve pound yazımında artan pound değeri 0 ile 14 arasında kalır.'],
    ['"12 stone 3" ne demek?', '12 stone ve 3 pound demektir. Toplam 12 × 14 + 3 = 171 pound, yani yaklaşık 77,56 kilogram eder. Araçta "Değer" alanına 12, "Ek pound" alanına 3 yazarak aynı sonucu görürsünüz.'],
    ['Stone Amerika\'da da kullanılır mı?', 'Hayır. ABD\'de vücut ağırlığı yalnızca pound olarak söylenir. Stone, günümüzde Birleşik Krallık ve İrlanda\'ya özgü bir alışkanlıktır.'],
    ['10,5 stone ile 10 st 5 lb aynı mı?', 'Hayır. 10,5 stone, 10 stone ve 7 pounda eşittir, çünkü yarım stone 7 pounddur. 10 st 5 lb ise yaklaşık 10,357 stone eder. Ondalık yazım ile stone-pound yazımını karıştırmamak gerekir.'],
    ['Stone neden vücut ağırlığı dışında kullanılmıyor?', 'Birim, Birleşik Krallık\'ta ticarette resmî ölçü olmaktan çıkarılmış, yalnızca gündelik alışkanlık olarak kişilerin kilosunu söylemekte yaşamaya devam etmiştir. Market ürünleri ve resmî kayıtlar kilogram ve gram kullanır.'],
    ['Yazdığım kilo bilgisi bir yere kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; kilo bilginiz sunucuya gönderilmez, saklanmaz ve kimseyle paylaşılmaz.'],
  ],
  related: ['kg-pound-cevir', 'vki-hesapla', 'ideal-kilo-hesapla', 'birim-donustur', 'gram-ons-cevir'],
};
