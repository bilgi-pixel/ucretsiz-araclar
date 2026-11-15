export default {
  slug: 'dogrusal-interpolasyon-hesapla',
  title: 'Doğrusal İnterpolasyon Hesaplama',
  h1Tail: 'ara değer bulma',
  pageTitle: 'Doğrusal İnterpolasyon Hesaplama – İki Nokta Arasında Ara Değer',
  description: 'Bilinen iki nokta arasındaki ara değeri doğrusal interpolasyonla bulun. Eğimi ve aralıktaki konumu gösterir; ekstrapolasyonu da belirtir.',
  card: 'Bilinen iki (x, y) noktası arasında istediğiniz x için y değerini doğrusal interpolasyonla hesaplayın.',
  category: 'matematik',
  keywords: ['doğrusal interpolasyon hesaplama', 'interpolasyon formülü', 'ara değer bulma', 'enterpolasyon hesaplama', 'tablodan ara değer okuma', 'lineer interpolasyon', 'ekstrapolasyon hesaplama'],
  lead: 'Elinizde iki ölçüm ya da iki tablo satırı var ve aradaki bir değere ihtiyacınız mı var? Bilinen iki noktayı ve aradığınız x değerini yazın; araç karşılık gelen <strong>y değerini doğrusal interpolasyonla</strong> hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'x1', label: 'Birinci nokta: x₁', type: 'number', placeholder: 'Örn. 20' },
    { id: 'y1', label: 'Birinci nokta: y₁', type: 'number', placeholder: 'Örn. 2,5' },
    { id: 'x2', label: 'İkinci nokta: x₂', type: 'number', placeholder: 'Örn. 30' },
    { id: 'y2', label: 'İkinci nokta: y₂', type: 'number', placeholder: 'Örn. 3,5' },
    { id: 'x', label: 'Aranan noktanın x değeri', type: 'number', placeholder: 'Örn. 24', hint: 'x₁ ile x₂ arasında olursa interpolasyon, dışında olursa ekstrapolasyon yapılır.' },
  ],
  compute(v, h) {
    const x1 = h.num(v.x1, 'x₁'), y1 = h.num(v.y1, 'y₁');
    const x2 = h.num(v.x2, 'x₂'), y2 = h.num(v.y2, 'y₂');
    const x = h.num(v.x, 'Aranan x');
    if (x1 === x2) h.err('x₁ ile x₂ aynı olamaz; interpolasyon için x değerleri farklı iki nokta gerekir.');
    const egim = (y2 - y1) / (x2 - x1);
    const t = (x - x1) / (x2 - x1);
    const y = y1 + (x - x1) * egim;
    const icinde = t >= 0 && t <= 1;
    return {
      rows: [
        ['y değeri', h.fmt(y, 6)],
        ['Hesap türü', icinde ? 'İnterpolasyon (aralık içinde)' : 'Ekstrapolasyon (aralık dışında)'],
        ['Eğim (x bir birim artınca y değişimi)', h.fmt(egim, 6)],
        ['Aralıktaki konum', '%' + h.fmt(t * 100, 2)],
      ],
      note: icinde
        ? 'y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁). İki nokta arasında değişimin doğrusal olduğu varsayılır.'
        : 'Aranan x, bilinen iki noktanın dışında kalıyor. Ekstrapolasyon, eğilimin aralık dışında da aynı sürdüğünü varsayar; sonucu temkinli kullanın.',
    };
  },
  cases: [
    { in: { x1: '20', y1: '2,5', x2: '30', y2: '3,5', x: '24' }, out: { 'y değeri': '2,9', 'Hesap türü': 'İnterpolasyon (aralık içinde)', 'Eğim (x bir birim artınca y değişimi)': '0,1', 'Aralıktaki konum': '%40' } },
    { in: { x1: '0', y1: '0', x2: '10', y2: '100', x: '5' }, out: { 'y değeri': '50', 'Aralıktaki konum': '%50' } },
    { in: { x1: '1', y1: '2', x2: '3', y2: '6', x: '2' }, out: { 'y değeri': '4', 'Eğim (x bir birim artınca y değişimi)': '2' } },
    { in: { x1: '10', y1: '50', x2: '20', y2: '30', x: '12' }, out: { 'y değeri': '46', 'Eğim (x bir birim artınca y değişimi)': '-2', 'Aralıktaki konum': '%20' } },
    { in: { x1: '100', y1: '1,2', x2: '200', y2: '1,8', x: '150' }, out: { 'y değeri': '1,5' } },
    { in: { x1: '0', y1: '0', x2: '10', y2: '20', x: '15' }, out: { 'y değeri': '30', 'Hesap türü': 'Ekstrapolasyon (aralık dışında)', 'Aralıktaki konum': '%150' } },
    { in: { x1: '5', y1: '7', x2: '9', y2: '11', x: '5' }, out: { 'y değeri': '7', 'Aralıktaki konum': '%0' } },
    { in: { x1: '5', y1: '7', x2: '5', y2: '11', x: '5' }, error: true },
    { in: { x1: '5', y1: '7', x2: '9', y2: '11', x: '' }, error: true },
  ],
  howto: [
    'Bildiğiniz iki noktadan ilkinin x ve y değerlerini "x₁" ve "y₁" alanlarına, ikincisininkileri "x₂" ve "y₂" alanlarına yazın. Tablodan okuyorsanız aradığınız değerin hemen altındaki ve üstündeki satırları kullanın.',
    'Karşılığını bulmak istediğiniz x değerini "Aranan noktanın x değeri" alanına girin.',
    '"Hesapla" düğmesine basın. İlk satırda aradığınız y değeri görünür.',
    '"Hesap türü" satırını kontrol edin: aranan x iki noktanın arasındaysa interpolasyon, dışındaysa ekstrapolasyon yapılmıştır.',
    'Ters yönde hesap gerekiyorsa (y biliniyor, x aranıyor) x ve y sütunlarının yerini değiştirerek girin.',
  ],
  sections: [
    { h: 'Doğrusal interpolasyon nedir?', p: [
      'İnterpolasyon (ara değer kestirimi, Türkçe kaynaklarda enterpolasyon olarak da yazılır), bilinen iki değer arasında kalan ve doğrudan ölçülmemiş bir değeri tahmin etme işlemidir. Doğrusal interpolasyonda iki bilinen nokta düz bir çizgiyle birleştirilir ve aranan değer bu çizginin üzerinden okunur.',
      'Yöntemin dayandığı varsayım basittir: iki nokta arasında y, x ile <strong>sabit bir hızla</strong> değişir. Bu varsayım noktalar birbirine yakınken çoğu fiziksel büyüklük için iyi bir yaklaşımdır; noktalar arası açıldıkça ve gerçek ilişki eğrileştikçe hata büyür.',
    ] },
    { h: 'Formül ve mantığı', p: [
      'Formül şöyledir: <strong>y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁)</strong>.',
      'Buradaki (y₂ − y₁) ÷ (x₂ − x₁) ifadesi iki noktayı birleştiren doğrunun eğimidir; x bir birim arttığında y\'nin ne kadar değiştiğini verir. (x − x₁) ise birinci noktadan ne kadar uzaklaştığınızdır. İkisinin çarpımı, y₁ değerine eklenecek artışı verir.',
      'Aynı hesabı oran üzerinden de düşünebilirsiniz. Aranan x, aralığın yüzde kaçındaysa y de kendi aralığının aynı yüzdesindedir. Araç bu oranı "Aralıktaki konum" satırında gösterir: %0 birinci noktayı, %100 ikinci noktayı, %50 tam ortayı ifade eder.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bir tabloda x = 20 için y = 2,5 ve x = 30 için y = 3,5 verilmiş olsun. x = 24 için y kaçtır?',
      'Eğim: (3,5 − 2,5) ÷ (30 − 20) = 1 ÷ 10 = 0,1. Birinci noktadan uzaklık: 24 − 20 = 4. Artış: 4 × 0,1 = 0,4. Sonuç: y = 2,5 + 0,4 = <strong>2,9</strong>.',
      'Oran yoluyla sağlama: 24, 20 ile 30 arasındaki aralığın %40\'ındadır. y aralığı 1 birim genişliğindedir; %40\'ı 0,4 eder. 2,5 + 0,4 = 2,9. İki yol da aynı sonucu verir.',
      'Azalan bir ilişkide de yöntem aynıdır. x = 10 için y = 50, x = 20 için y = 30 ise eğim −2\'dir; x = 12 için y = 50 + 2 × (−2) = 46 bulunur.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Tablo okuma:</strong> Mühendislik ve fizik tablolarında (yoğunluk, basınç, sıcaklık, malzeme özellikleri) aranan değer çoğu zaman iki satırın arasına düşer; ara değer interpolasyonla bulunur.',
      '<strong>Ölçüm ve kalibrasyon:</strong> Bir sensörün iki bilinen noktadaki okuması varsa aradaki okumalar gerçek değere doğrusal olarak çevrilebilir.',
      '<strong>Laboratuvar:</strong> Kalibrasyon eğrisinin iki standart noktası arasında kalan numunenin derişimi hesaplanır.',
      '<strong>Zaman serileri:</strong> İki sayım ya da iki ölçüm tarihi arasındaki eksik bir günün değeri kestirilir; örneğin ay başı ve ay sonu sayaç okumalarından ay ortası değeri.',
      '<strong>Harita ve arazi:</strong> İki eş yükselti eğrisi arasındaki bir noktanın kotu, eğrilere uzaklığıyla orantılı olarak bulunur.',
      '<strong>Grafik ve yazılım:</strong> Renk geçişleri, animasyon kareleri ve ses örnekleri arasındaki ara değerler aynı formülle üretilir.',
    ] },
    { h: 'İnterpolasyon ile ekstrapolasyon arasındaki fark', p: [
      'Aranan x değeri bilinen iki noktanın arasındaysa işlem interpolasyondur ve sonuç iki bilinen y değerinin arasında kalır. Aranan x aralığın dışındaysa aynı formül çalışmaya devam eder, ancak bu kez yapılan iş <strong>ekstrapolasyondur</strong>: doğru, ölçüm yapılmamış bir bölgeye uzatılmaktadır.',
      'Ekstrapolasyon çok daha risklidir, çünkü eğilimin aralık dışında da aynı sürdüğüne dair elinizde veri yoktur. Örneğin x = 0 için y = 0 ve x = 10 için y = 20 ise formül x = 15 için 30 verir; fakat gerçek ilişki 10\'dan sonra yavaşlıyor ya da doygunluğa ulaşıyorsa bu tahmin yanıltıcı olur. Araç bu durumu "Hesap türü" satırında ve sonuç notunda açıkça belirtir.',
    ] },
    { h: 'Doğruluk, sınırlar ve uyarı', p: [
      'Doğrusal interpolasyonun hatası, gerçek ilişkinin eğriliğine ve iki nokta arasındaki mesafeye bağlıdır. Üstel büyüme, logaritmik ölçekler ya da keskin dönüş yapan eğrilerde iki uzak nokta arasında yapılan doğrusal kestirim belirgin biçimde sapabilir. Bu durumda birbirine daha yakın iki nokta seçmek hatayı azaltmanın en kolay yoludur.',
      'Basamaklı çalışan değerler için interpolasyon uygun değildir: dilimli tarifeler ya da kademeli fiyat listeleri iki değer arasında yumuşak geçiş yapmaz, belirli eşiklerde sıçrar.',
      'Sonuçlar altı ondalık basamağa yuvarlanır. Hesap bilgilendirme amaçlıdır; emniyet, sağlık ya da mali sonucu olan mühendislik ve tasarım kararlarında ilgili standardın öngördüğü yöntemi kullanın ve bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Doğrusal interpolasyon formülü nedir?', 'y = y₁ + (x − x₁) × (y₂ − y₁) ÷ (x₂ − x₁). Bilinen iki nokta (x₁, y₁) ve (x₂, y₂), aranan nokta ise x değeri bilinen ve y değeri hesaplanan noktadır.'],
    ['İnterpolasyon ile ekstrapolasyon arasındaki fark nedir?', 'İnterpolasyon bilinen iki nokta arasındaki bir değeri kestirir; ekstrapolasyon ise bilinen aralığın dışına çıkar. Formül aynıdır, ancak ekstrapolasyonun güvenilirliği belirgin biçimde düşüktür.'],
    ['Noktaları hangi sırayla girmeliyim?', 'Sıra sonucu değiştirmez. Küçük x değerini birinci, büyüğünü ikinci nokta olarak girmek alışılmış olandır, ancak ters yazsanız da aynı y değeri bulunur. Önemli olan her x değerinin kendi y değeriyle eşleşmesidir.'],
    ['y değerini biliyorum, x değerini nasıl bulurum?', 'Sütunların rolünü değiştirin: y değerlerini x alanlarına, x değerlerini y alanlarına yazın ve bildiğiniz y değerini "aranan x" alanına girin. Doğrusal ilişki iki yönde de aynı doğruyu kullanır.'],
    ['İki x değeri aynı olursa neden hata veriyor?', 'x₁ ve x₂ eşitse formülün paydası sıfır olur ve eğim tanımsız kalır. Aynı x için iki farklı y değeri varsa bu bir fonksiyon ilişkisi değildir; farklı x değerine sahip iki nokta seçmelisiniz.'],
    ['Sonuç ne kadar doğrudur?', 'İki nokta arasındaki gerçek ilişki doğrusala ne kadar yakınsa sonuç o kadar doğrudur. Noktalar birbirine yakınsa hata genellikle küçüktür. Eğri biçimli ilişkilerde daha sık aralıklı veri kullanmak ya da eğriye uygun başka bir yöntem seçmek gerekir.'],
    ['Negatif ya da ondalıklı değer girebilir miyim?', 'Evet. Bütün alanlar negatif ve ondalıklı sayıları kabul eder; ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz. Sıfırın altındaki sıcaklıklar ya da azalan değerler sorunsuz hesaplanır.'],
    ['Girdiğim veriler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['egim-hesapla', 'dogru-denklemi-bul', 'orta-nokta-hesapla', 'dogrusal-regresyon-hesapla', 'yuzde-degisim-hesapla'],
};
