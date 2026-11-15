export default {
  slug: 'gram-ons-cevir',
  title: 'Gram Ons Çevirici',
  h1Tail: 'g ↔ oz',
  pageTitle: 'Gram Ons Çevirici – Gramdan Onsa, Onstan Grama Hesaplama',
  description: 'Gramı onsa, onsu grama çevirin. 1 ons = 28,349523125 gram tanımını kullanır; pound karşılığını ve troy ons farkını da aynı sonuçta gösterir.',
  card: 'Gramı onsa, onsu grama çevirin; yabancı tarifler, paket etiketleri ve kargo için pound ve troy ons karşılığıyla.',
  category: 'birim',
  keywords: ['gram ons çevirme', 'ons kaç gram', '1 oz kaç gram', 'gram oz hesaplama', 'ons gram dönüştürme', 'oz to gram', '100 gram kaç ons'],
  lead: 'Bir ağırlığı gramdan onsa (<strong>oz</strong>) ya da onstan grama çevirin. Araç gündelik kullanımdaki avoirdupois onsunu esas alır: <strong>1 ons = 28,349523125 gram</strong>. Karışıklığı önlemek için aynı ağırlığın troy ons karşılığı da gösterilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 250' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['g', 'Gram → Ons'], ['oz', 'Ons → Gram']] },
  ],
  compute(v, h) {
    const OZ = 28.349523125;
    const TROY = 31.1034768;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = v.yon === 'oz' ? x * OZ : x;
    const oz = v.yon === 'oz' ? x : x / OZ;
    const ana = v.yon === 'oz'
      ? [['Gram', h.fmt(g, 4) + ' g'], ['Ons', h.fmt(oz, 4) + ' oz']]
      : [['Ons', h.fmt(oz, 4) + ' oz'], ['Gram', h.fmt(g, 4) + ' g']];
    return {
      rows: [
        ...ana,
        ['Pound', h.fmt(oz / 16, 4) + ' lb'],
        ['Kilogram', h.fmt(g / 1000, 6) + ' kg'],
        ['Troy ons (değerli maden)', h.fmt(g / TROY, 4) + ' ozt'],
      ],
      note: '1 oz = 28,349523125 g (avoirdupois, tam tanım); 16 oz = 1 lb. Altın ve gümüşte kullanılan troy ons 31,1034768 gramdır.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'g' }, out: { 'Ons': '3,5274 oz', 'Kilogram': '0,1 kg' } },
    { in: { deger: '16', yon: 'oz' }, out: { 'Gram': '453,5924 g', 'Pound': '1 lb' } },
    { in: { deger: '28,349523125', yon: 'g' }, out: { 'Ons': '1 oz', 'Pound': '0,0625 lb' } },
    { in: { deger: '1', yon: 'oz' }, out: { 'Gram': '28,3495 g', 'Troy ons (değerli maden)': '0,9115 ozt' } },
    { in: { deger: '250', yon: 'g' }, out: { 'Ons': '8,8185 oz', 'Pound': '0,5512 lb' } },
    { in: { deger: '8', yon: 'oz' }, out: { 'Gram': '226,7962 g', 'Pound': '0,5 lb' } },
    { in: { deger: '0', yon: 'g' }, out: { 'Ons': '0 oz' } },
    { in: { deger: 'on gram', yon: 'g' }, error: true },
    { in: { deger: '-1', yon: 'oz' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına gram ya da ons cinsinden değeri yazın; kesirli değerlerde virgül kullanabilirsiniz (örn. 3,5).',
    '"Çeviri yönü" listesinden Gram → Ons ya da Ons → Gram seçeneğini işaretleyin.',
    '"Çevir" düğmesine basın. İlk satır aradığınız karşılığı, sonraki satırlar pound, kilogram ve troy ons değerlerini verir.',
    'Tarif ya da etiket için tek bir sayıya ihtiyacınız varsa ilk satırı, tümünü saklamak istiyorsanız "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Ons nedir, kaç çeşit ons vardır?', p: [
      'Ons (ounce), kısaltması <strong>oz</strong> olan ve özellikle ABD\'de gıda, kozmetik, posta ve kumaş gibi alanlarda kullanılan küçük bir kütle birimidir. Kısaltmadaki "z" harfi, sözcüğün eski İtalyanca yazımı olan "onza"dan gelir. Gündelik hayatta "ons" denildiğinde kastedilen avoirdupois onsudur; bir poundun on altıda biridir ve tam olarak 28,349523125 gramdır.',
      'Aynı adı taşıyan iki birim daha vardır ve karışıklığın kaynağı da budur. <strong>Troy ons</strong> altın, gümüş, platin gibi değerli madenlerde kullanılır ve 31,1034768 gramdır; yani gündelik onstan yaklaşık yüzde 9,7 daha ağırdır. <strong>Sıvı ons</strong> (fl oz) ise ağırlık değil hacim birimidir; içecek şişelerinde ve tariflerde sıvılar için geçer ve grama doğrudan çevrilemez, çünkü sonuç sıvının yoğunluğuna bağlıdır.',
    ] },
    { h: 'Gramı onsa çevirme formülü ve çözümlü örnekler', p: [
      'Gramdan onsa geçmek için değeri 28,349523125\'e bölersiniz: <strong>oz = g ÷ 28,349523125</strong>. Onstan grama geçmek için aynı sayıyla çarparsınız: <strong>g = oz × 28,349523125</strong>.',
      'Örnek 1: 250 gramlık bir paket tereyağı 250 ÷ 28,349523125 = 8,8185 ons eder. Bu, yarım pounddan (8 ons) biraz fazladır; pound karşılığı 0,5512 lb olarak görünür.',
      'Örnek 2: Amerikan tarifinde 8 ons çikolata isteniyorsa 8 × 28,349523125 = 226,7962 gram gerekir. Mutfak terazisinde 227 gram tartmanız yeterlidir.',
      'Örnek 3: 100 gramlık bir ürünün etiketine ons yazmanız gerekiyorsa 100 ÷ 28,349523125 = 3,5274 ons bulursunuz; ambalajlarda bu değer çoğunlukla 3,5 oz olarak yuvarlanır.',
    ] },
    { h: 'Mutfakta ons: tarif çevirirken dikkat edilecekler', p: [
      'İngilizce tariflerde "oz" tek başına yazıldığında katı malzemeler için ağırlık onsu, sıvılar için ise çoğu zaman sıvı ons kastedilir. Un, şeker, tereyağı, çikolata ve peynir gibi malzemelerde bu aracı güvenle kullanabilirsiniz. Süt, su, krema gibi sıvılarda tarif "fl oz" diyorsa bir hacim çevirisine ihtiyacınız vardır; ağırlık onsunu grama çevirmek doğru miktarı vermez.',
      'Tariflerde yuvarlama olağandır: 1 ons 28 ya da 30 gram, 4 ons 115 gram, 8 ons 225 gram, 16 ons 450 gram olarak yazılır. Ekmek ve pasta gibi oranların önemli olduğu tariflerde yuvarlanmış değerler yerine bu sayfadaki tam sonucu kullanmak, özellikle tarif büyütülürken biriken farkı önler.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>1 oz</strong> = 28,35 g',
      '<strong>2 oz</strong> = 56,70 g',
      '<strong>4 oz</strong> = 113,40 g (çeyrek pound)',
      '<strong>8 oz</strong> = 226,80 g (yarım pound)',
      '<strong>12 oz</strong> = 340,19 g',
      '<strong>16 oz</strong> = 453,59 g (1 pound)',
      '<strong>50 g</strong> = 1,7637 oz',
      '<strong>100 g</strong> = 3,5274 oz',
      '<strong>500 g</strong> = 17,637 oz',
      '<strong>1 kg</strong> = 35,274 oz',
    ] },
    { h: 'Ons nerelerde karşınıza çıkar?', ul: [
      '<strong>İthal gıda ve kozmetik ambalajları:</strong> net ağırlık çoğu zaman hem gram hem ons olarak basılır.',
      '<strong>Kumaş ve tekstil:</strong> kot ve tişört kumaşlarının kalınlığı yarda kare başına ons ile anlatılır; "14 oz denim" gibi ifadeler bu yüzden görülür.',
      '<strong>Posta ve kargo:</strong> ABD çıkışlı hafif gönderilerde ücret kademeleri ons üzerinden belirlenir.',
      '<strong>Kahve ve çay:</strong> yabancı kavurucular paketlerini 12 oz gibi ölçülerle satar; bu yaklaşık 340 gramdır.',
      '<strong>Boks eldivenleri:</strong> eldiven ağırlığı 10 oz, 12 oz, 16 oz gibi değerlerle sınıflandırılır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Birinci hata, altın fiyatındaki "ons" ile mutfaktaki onsu aynı saymaktır. Altının onsu troy onstur; 1 gündelik ons yalnızca 0,9115 troy ons eder. Bu yüzden araç troy ons karşılığını ayrı bir satırda gösterir; değerli maden hesabı yapıyorsanız o satırı ya da doğrudan troy ons çeviricisini kullanın.',
      'İkinci hata, onsu 30 gram kabul edip büyük miktarlara uygulamaktır. 1 onsta fark 1,65 gramdır ama 32 onsluk bir pakette bu fark yaklaşık 53 grama ulaşır. Üçüncü hata, ondalıklı pound ile pound-ons yazımını karıştırmaktır: 1,5 lb, 1 pound 5 ons değil, 1 pound 8 onstur.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç yalnızca kütle çevirir; sıvı ons gibi hacim birimlerini kapsamaz. Negatif değer girilemez. Sonuçlar dört ondalık basamağa kadar gösterilir; bu duyarlılık mutfak ve paketleme işlerinin çok ötesindedir. Ticari etiketlemede yuvarlama ve beyan kuralları ülkeye göre değiştiği için ürününüzün satılacağı pazarın güncel mevzuatını ayrıca kontrol edin.',
    ] },
  ],
  faq: [
    ['1 ons kaç gramdır?', 'Gündelik kullanımdaki 1 ons tam olarak 28,349523125 gramdır; pratikte 28,35 gram olarak alınır. Değerli madenlerde kullanılan troy ons ise 31,1034768 gramdır.'],
    ['1 gram kaç onstur?', '1 gram yaklaşık 0,035274 onstur. 100 gram 3,5274 ons, 1 kilogram ise 35,274 ons eder.'],
    ['oz ne demek?', 'oz, ons (ounce) biriminin kısaltmasıdır. Ambalajlarda "Net Wt 12 oz" gibi ifadelerde ağırlığı, "fl oz" biçiminde yazıldığında ise sıvı hacmini anlatır.'],
    ['Altının onsu ile bu ons aynı mı?', 'Hayır. Altın, gümüş ve platin troy ons ile tartılır; 1 troy ons 31,1034768 gramdır. Bu sayfadaki ana çeviri gündelik onsu kullanır, troy ons karşılığı yalnızca bilgi için ayrı satırda verilir.'],
    ['Sıvı onsu (fl oz) grama çevirebilir miyim?', 'Doğrudan çeviremezsiniz, çünkü sıvı ons hacim birimidir. Önce mililitreye çevirmeniz, sonra sıvının yoğunluğuyla çarpmanız gerekir. Su için 1 mililitre yaklaşık 1 gramdır; yağ, bal ya da süt için değer farklıdır.'],
    ['Bir pound kaç onstur?', '1 pound 16 onstur ve 453,59237 gram eder. Araç, girdiğiniz ağırlığın pound karşılığını da sonuç kutusunda gösterir.'],
    ['Tarifte 6 oz un yazıyor, kaç gram tartmalıyım?', '6 ons, 6 × 28,349523125 = 170,1 gram eder. Mutfak terazisinde 170 gram tartmanız yeterlidir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızın içinde yapılır; yazdığınız sayı sunucuya gönderilmez, saklanmaz. Sayfa bir kez yüklendikten sonra çevrimdışı da kullanılabilir.'],
  ],
  related: ['troy-ons-gram-cevir', 'kg-pound-cevir', 'mutfak-olcu-donustur', 'tarif-olcekle', 'kg-gram-cevir'],
};
