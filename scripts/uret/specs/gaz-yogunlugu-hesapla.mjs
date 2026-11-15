export default {
  slug: 'gaz-yogunlugu-hesapla',
  title: 'Gaz Yoğunluğu Hesaplama',
  h1Tail: 'd = P·M ÷ (R·T)',
  pageTitle: 'Gaz Yoğunluğu Hesaplama – Basınç ve Sıcaklığa Göre g/L',
  description: 'İdeal gaz denklemiyle bir gazın yoğunluğunu mol kütlesi, basınç ve sıcaklıktan hesaplayın. Molar hacmi ve havaya göre bağıl yoğunluğu da gösterir.',
  card: 'Mol kütlesi, basınç ve sıcaklıktan gazın yoğunluğunu, molar hacmini ve havaya göre ağır mı hafif mi olduğunu bulun.',
  category: 'bilim',
  keywords: ['gaz yoğunluğu hesaplama', 'gaz yoğunluğu formülü', 'd = PM/RT', 'gazların öz kütlesi', 'molar hacim hesaplama', 'havaya göre yoğunluk', 'normal koşullarda gaz yoğunluğu'],
  lead: 'Bir gazın belirli basınç ve sıcaklıktaki <strong>yoğunluğunu</strong> ideal gaz denkleminden hesaplayın. Araç yoğunluğu g/L olarak verir, ayrıca o koşullardaki molar hacmi ve gazın havadan ağır mı hafif mi olduğunu gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'molKutle', label: 'Gazın mol kütlesi (g/mol)', type: 'number', placeholder: 'Örn. 32', hint: 'O₂ 32, N₂ 28,01, CO₂ 44,01, CH₄ 16,04, He 4,003, kuru hava yaklaşık 28,97.' },
    { id: 'basinc', label: 'Basınç', type: 'number', value: '1' },
    { id: 'pBirim', label: 'Basınç birimi', type: 'select', options: [['atm', 'atm'], ['kpa', 'kPa'], ['bar', 'bar'], ['mmhg', 'mmHg']] },
    { id: 'sicaklik', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 25' },
    { id: 'tBirim', label: 'Sıcaklık birimi', type: 'select', options: [['c', '°C'], ['k', 'K']] },
  ],
  compute(v, h) {
    const R = 0.082057366; // L·atm/(mol·K)
    const HAVA = 28.97;
    const M = h.pos(v.molKutle, 'Gazın mol kütlesi');
    const p = h.pos(v.basinc, 'Basınç');
    const t = h.num(v.sicaklik, 'Sıcaklık');
    const atm = v.pBirim === 'kpa' ? p / 101.325 : v.pBirim === 'bar' ? p / 1.01325 : v.pBirim === 'mmhg' ? p / 760 : p;
    const T = v.tBirim === 'k' ? t : t + 273.15;
    if (!(T > 0)) h.err('Sıcaklık mutlak sıfırın (0 K = −273,15 °C) üzerinde olmalı.');
    const Vm = R * T / atm;
    const d = M / Vm;
    const bagil = M / HAVA;
    const yorum = Math.abs(bagil - 1) < 0.005 ? 'hava ile yaklaşık aynı' : bagil > 1 ? 'havadan ağır' : 'havadan hafif';
    return {
      rows: [
        ['Yoğunluk', h.fmt(d, 4) + ' g/L'],
        ['Yoğunluk (SI)', h.fmt(d, 4) + ' kg/m³'],
        ['Molar hacim', h.fmt(Vm, 4) + ' L/mol'],
        ['Havaya göre bağıl yoğunluk', `${h.fmt(bagil, 4)} (${yorum})`],
        ['Mutlak sıcaklık', h.fmt(T, 2) + ' K'],
        ['Basınç', h.fmt(atm, 4) + ' atm'],
      ],
      note: 'İdeal gaz kabulüyle hesaplanmıştır (R = 0,082057 L·atm/(mol·K)). Yüksek basınçta ve yoğuşma noktasına yakın sıcaklıklarda gerçek yoğunluk farklı olabilir.',
    };
  },
  cases: [
    { in: { molKutle: '32', basinc: '1', pBirim: 'atm', sicaklik: '0', tBirim: 'c' }, out: { 'Yoğunluk': '1,4277 g/L', 'Molar hacim': '22,414 L/mol', 'Havaya göre bağıl yoğunluk': '1,1046 (havadan ağır)', 'Mutlak sıcaklık': '273,15 K' } },
    { in: { molKutle: '44,01', basinc: '1', pBirim: 'atm', sicaklik: '25', tBirim: 'c' }, out: { 'Yoğunluk': '1,7989 g/L', 'Molar hacim': '24,4654 L/mol', 'Havaya göre bağıl yoğunluk': '1,5192 (havadan ağır)' } },
    { in: { molKutle: '28,97', basinc: '1', pBirim: 'atm', sicaklik: '20', tBirim: 'c' }, out: { 'Yoğunluk': '1,2043 g/L', 'Havaya göre bağıl yoğunluk': '1 (hava ile yaklaşık aynı)' } },
    { in: { molKutle: '4,0026', basinc: '760', pBirim: 'mmhg', sicaklik: '273,15', tBirim: 'k' }, out: { 'Yoğunluk': '0,1786 g/L', 'Yoğunluk (SI)': '0,1786 kg/m³', 'Basınç': '1 atm' } },
    { in: { molKutle: '32', basinc: '101,325', pBirim: 'kpa', sicaklik: '0', tBirim: 'c' }, out: { 'Yoğunluk': '1,4277 g/L', 'Basınç': '1 atm' } },
    { in: { molKutle: '32', basinc: '2', pBirim: 'atm', sicaklik: '273,15', tBirim: 'c' }, out: { 'Yoğunluk': '1,4277 g/L', 'Molar hacim': '22,414 L/mol', 'Mutlak sıcaklık': '546,3 K' } },
    { in: { molKutle: '2,016', basinc: '1,01325', pBirim: 'bar', sicaklik: '0', tBirim: 'c' }, out: { 'Yoğunluk': '0,0899 g/L', 'Havaya göre bağıl yoğunluk': '0,0696 (havadan hafif)' } },
    { in: { molKutle: '32', basinc: '1', pBirim: 'atm', sicaklik: '-300', tBirim: 'c' }, error: true },
    { in: { molKutle: '0', basinc: '1', pBirim: 'atm', sicaklik: '25', tBirim: 'c' }, error: true },
    { in: { molKutle: '32', basinc: '1', pBirim: 'atm', sicaklik: '', tBirim: 'c' }, error: true },
  ],
  howto: [
    'Gazın mol kütlesini g/mol olarak yazın. Değeri bilmiyorsanız formüldeki atomların kütlelerini toplayın; alanın altındaki ipucunda sık kullanılan gazlar yer alır.',
    'Basıncı girin ve birimini seçin: atm, kPa, bar ya da mmHg.',
    'Sıcaklığı yazın ve Celsius mu Kelvin mi olduğunu belirtin. Celsius değeri hesapta otomatik olarak Kelvin\'e çevrilir.',
    '"Hesapla" düğmesine basın. İlk satır yoğunluğu g/L olarak verir; aynı sayı kg/m³ için de geçerlidir.',
    '"Havaya göre bağıl yoğunluk" satırından gazın açık havada yükselme mi çökme mi eğiliminde olduğunu okuyun.',
  ],
  sections: [
    { h: 'Gaz yoğunluğu formülü nereden gelir?', p: [
      'İdeal gaz denklemi <strong>P·V = n·R·T</strong> biçimindedir. Mol sayısı kütlenin mol kütlesine oranı olduğundan (n = m ÷ M) denklem P·V = (m ÷ M)·R·T olarak yazılabilir. Yoğunluk kütlenin hacme oranıdır (d = m ÷ V); düzenlendiğinde şu bağıntı elde edilir:',
      '<strong>d = P·M ÷ (R·T)</strong>',
      'Burada P basınç (atm), M mol kütlesi (g/mol), T mutlak sıcaklık (K) ve R gaz sabitidir (0,082057 L·atm/(mol·K)). Bu birimlerle sonuç g/L çıkar. Bir litre binde bir metreküp, bir gram binde bir kilogram olduğundan g/L ile kg/m³ sayıca aynıdır.',
      'Formül üç şeyi açıkça gösterir: gazın yoğunluğu basınçla doğru orantılı, mutlak sıcaklıkla ters orantılı ve mol kütlesiyle doğru orantılıdır. Katı ve sıvılardan farklı olarak gazların tek bir "yoğunluk değeri" yoktur; koşullar belirtilmeden verilen bir gaz yoğunluğu eksik bilgidir.',
    ] },
    { h: 'Çözümlü örnek: normal koşullarda oksijen', p: [
      'Oksijen gazının (O₂, 32 g/mol) 0 °C ve 1 atm\'deki yoğunluğunu bulalım. Sıcaklık 273,15 K\'dir. d = 1 × 32 ÷ (0,082057 × 273,15) = 32 ÷ 22,414 = <strong>1,4277 g/L</strong>. Paydadaki 22,414 değeri, ideal bir gazın normal koşullardaki molar hacmidir; lise kitaplarında 22,4 L olarak yuvarlanır. Yani normal koşullarda kısa yol d = M ÷ 22,4 bağıntısıdır.',
      'Aynı gazın basıncı 2 atm\'ye, mutlak sıcaklığı da iki katına (546,3 K) çıkarılırsa iki etki birbirini götürür ve yoğunluk yine 1,4277 g/L olur. Araçla bu durumu deneyerek P ÷ T oranının belirleyici olduğunu görebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: oda koşullarında karbondioksit', p: [
      'Karbondioksitin (44,01 g/mol) 25 °C ve 1 atm\'deki yoğunluğu için T = 298,15 K alınır. Molar hacim 0,082057 × 298,15 = 24,4654 L/mol, yoğunluk 44,01 ÷ 24,4654 = <strong>1,7989 g/L</strong> bulunur. Kuru havanın ortalama mol kütlesi yaklaşık 28,97 g/mol olduğundan bağıl yoğunluk 44,01 ÷ 28,97 = 1,5192\'dir; karbondioksit havadan yaklaşık bir buçuk kat ağırdır ve kapalı, alçak yerlerde zemine yakın birikme eğilimi gösterir.',
    ] },
    { h: 'Havaya göre bağıl yoğunluk ne işe yarar?', p: [
      'Aynı basınç ve sıcaklıkta iki gazın yoğunlukları oranı, mol kütleleri oranına eşittir. Bu yüzden bir gazın havadan ağır mı hafif mi olduğunu anlamak için mol kütlesini 28,97 ile karşılaştırmak yeter. Helyum (4,003) ve hidrojen (2,016) çok hafif oldukları için balonları yükseltir; metan (16,04) havadan hafiftir ve yukarı doğru dağılır; propan (44,1) ve bütan (58,1) gibi gazlar ise havadan ağırdır ve zemine çöker.',
      'Bu bilgi gaz dedektörlerinin tavana mı zemine mi yakın yerleştirileceği gibi konularda temel fikir verir. Ancak gerçek ortamlarda sıcaklık farkları, hava akımı ve karışma hızı da rol oynar; güvenlik tasarımı için ilgili standartlar ve yetkili uzmanlar esas alınmalıdır.',
    ] },
    { h: 'Hızlı başvuru: 0 °C ve 1 atm\'de yoğunluklar', ul: [
      '<strong>Hidrojen (H₂, 2,016 g/mol):</strong> 0,0899 g/L',
      '<strong>Helyum (He, 4,0026 g/mol):</strong> 0,1786 g/L',
      '<strong>Oksijen (O₂, 32 g/mol):</strong> 1,4277 g/L',
      '<strong>Kuru hava (28,97 g/mol), 20 °C\'de:</strong> 1,2043 g/L',
      '<strong>Karbondioksit (44,01 g/mol), 25 °C\'de:</strong> 1,7989 g/L',
    ], p: [
      'Bu değerler ideal gaz kabulüyle hesaplanmıştır; ölçülen değerler son basamaklarda küçük farklar gösterebilir.',
    ] },
    { h: 'Sık yapılan hatalar ve modelin sınırları', ul: [
      'Sıcaklığı Celsius olarak formüle koymak. Formülde her zaman Kelvin kullanılır; 25 °C, 298,15 K\'dir.',
      'Basınç birimi ile gaz sabitini uyumsuz seçmek. Araç tüm basınçları atm\'ye çevirerek bu hatayı önler.',
      'İki atomlu gazlarda atom kütlesini yazmak. Oksijen gazı için 16 değil 32, azot için 14 değil 28,01 g/mol kullanılmalıdır.',
      'Normal koşullar (0 °C, 1 atm) ile oda koşullarını (25 °C, 1 atm) karıştırmak. Molar hacim ilkinde 22,4 L, ikincisinde yaklaşık 24,5 L\'dir.',
    ], p: [
      'İdeal gaz modeli, moleküllerin hacmini ve aralarındaki çekimi yok sayar. Atmosfer basıncı dolayında ve oda sıcaklığında çoğu gaz için hata küçüktür; yüksek basınçlı tüplerde, çok düşük sıcaklıklarda ya da su buharı gibi yoğuşmaya yakın gazlarda sapma büyür. Sonuçlar eğitim ve ön hesap amaçlıdır.',
    ] },
  ],
  faq: [
    ['Gaz yoğunluğu hangi formülle hesaplanır?', 'İdeal gaz denkleminden türetilen d = P·M ÷ (R·T) bağıntısıyla. P atm, M g/mol, T Kelvin ve R = 0,082057 L·atm/(mol·K) alındığında sonuç g/L olarak çıkar.'],
    ['Normal koşullarda gaz yoğunluğu nasıl bulunur?', '0 °C ve 1 atm\'de bir mol ideal gaz yaklaşık 22,4 litre hacim kaplar. Bu yüzden yoğunluk, mol kütlesinin 22,4\'e bölünmesiyle bulunur; oksijen için 32 ÷ 22,4 yaklaşık 1,43 g/L eder.'],
    ['Sıcaklık artınca gazın yoğunluğu neden azalır?', 'Sabit basınçta ısınan gaz genleşir; aynı kütle daha büyük hacme yayılır. Formülde mutlak sıcaklık paydada olduğu için yoğunluk sıcaklıkla ters orantılı olarak düşer. Sıcak hava balonları bu ilkeyle yükselir.'],
    ['Bir gazın havadan ağır olup olmadığını nasıl anlarım?', 'Mol kütlesini kuru havanın ortalama mol kütlesi olan yaklaşık 28,97 g/mol ile karşılaştırın. Büyükse gaz havadan ağır, küçükse hafiftir. Araç bu oranı "Havaya göre bağıl yoğunluk" satırında verir.'],
    ['g/L ile kg/m³ arasında fark var mı?', 'Sayısal olarak yoktur. 1 g/L, 1 kg/m³\'e eşittir; bu nedenle araç iki satırda aynı sayıyı farklı birimle gösterir.'],
    ['Gaz karışımlarının yoğunluğunu hesaplayabilir miyim?', 'Evet, karışımın ortalama mol kütlesini girerseniz. Ortalama mol kütlesi, her gazın mol kesri ile mol kütlesinin çarpımlarının toplamıdır; kuru hava için bu değer yaklaşık 28,97 g/mol\'dür.'],
    ['Sonuç gerçek gazlar için ne kadar doğrudur?', 'Atmosfer basıncı civarında ve oda sıcaklığında çoğu gaz için sapma küçüktür. Basınç yükseldikçe ve gaz yoğuşma noktasına yaklaştıkça ideal gaz kabulü zayıflar; hassas mühendislik hesaplarında gerçek gaz verileri kullanılmalıdır.'],
    ['Girdiğim değerler bir sunucuya gidiyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; mol kütlesi, basınç ve sıcaklık değerleri hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['ideal-gaz-denklemi-hesapla', 'birlesik-gaz-yasasi-hesapla', 'molar-kutle-hesapla', 'yogunluk-hesapla', 'mol-hesapla'],
};
