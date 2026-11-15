export default {
  slug: 'protein-ihtiyaci-hesapla',
  title: 'Günlük Protein İhtiyacı Hesaplama',
  h1Tail: 'gram/gün',
  pageTitle: 'Günlük Protein İhtiyacı Hesaplama – Kiloya Göre Kaç Gram?',
  description: 'Kilonuza ve hareket düzeyinize göre günlük protein ihtiyacınızı gram olarak hesaplayın. Öğün başına düşen miktarı ve proteinden gelen kaloriyi de görün.',
  card: 'Kilonuza ve hedefinize göre günde kaç gram protein almanız gerektiğini, öğün başına payıyla birlikte hesaplayın.',
  category: 'saglik',
  keywords: ['günlük protein ihtiyacı hesaplama', 'kilo başına protein', 'günde kaç gram protein', 'protein hesaplama', 'kas için protein miktarı', 'sporcu protein ihtiyacı', 'öğün başına protein'],
  lead: 'Vücut ağırlığınıza ve hareket düzeyinize göre <strong>günlük protein ihtiyacınızı</strong> gram cinsinden hesaplayın. Araç, kilogram başına önerilen aralığı kilonuzla çarpar; sonucu öğünlere böler ve proteinden gelen kaloriyi gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'duzey', label: 'Hareket düzeyi / hedef', type: 'select', options: [
      ['sedanter', 'Hareketsiz yetişkin (0,8 g/kg)'],
      ['hafif', 'Hafif aktif (1,0–1,2 g/kg)'],
      ['dayaniklilik', 'Düzenli dayanıklılık sporu (1,2–1,6 g/kg)'],
      ['kuvvet', 'Kuvvet antrenmanı, kas kazanımı (1,6–2,2 g/kg)'],
      ['kiloverme', 'Kilo verirken kas koruma (1,6–2,4 g/kg)'],
      ['ileriyas', '65 yaş ve üzeri (1,0–1,2 g/kg)'],
    ] },
    { id: 'ogun', label: 'Günlük öğün sayısı', type: 'number', value: '3' },
    { id: 'kalori', label: 'Günlük kalori (kcal) – isteğe bağlı', type: 'number', placeholder: 'Örn. 2500', hint: 'Yazarsanız proteinin toplam kalorideki payı da gösterilir.' },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    if (kilo < 30 || kilo > 300) h.err('Kilo 30 ile 300 kg arasında olmalı; bu araç yetişkinler içindir.');
    const ogun = h.posint(v.ogun, 'Günlük öğün sayısı');
    if (ogun > 10) h.err('Öğün sayısı en fazla 10 olabilir.');
    const tablo = {
      sedanter: [0.8, 0.8], hafif: [1.0, 1.2], dayaniklilik: [1.2, 1.6],
      kuvvet: [1.6, 2.2], kiloverme: [1.6, 2.4], ileriyas: [1.0, 1.2],
    };
    const [alt, ust] = tablo[v.duzey] || tablo.sedanter;
    const a = kilo * alt, b = kilo * ust;
    const aralik = (x, y, d, birim, on = '') => (Math.abs(x - y) < 1e-9 ? `${on}${h.fmt(x, d)}${birim}` : `${on}${h.fmt(x, d)} – ${on}${h.fmt(y, d)}${birim}`);
    const rows = [
      ['Günlük protein', aralik(a, b, 0, ' g')],
      ['Öğün başına', aralik(a / ogun, b / ogun, 1, ' g')],
      ['Proteinden gelen kalori', aralik(a * 4, b * 4, 0, ' kcal')],
      ['Kullanılan aralık', aralik(alt, ust, 1, ' g/kg')],
    ];
    if (String(v.kalori ?? '').trim() !== '') {
      const kal = h.pos(v.kalori, 'Günlük kalori');
      if (kal < 800 || kal > 10000) h.err('Günlük kalori 800 ile 10.000 kcal arasında olmalı.');
      rows.push(['Günlük kalorideki payı', aralik(a * 4 / kal * 100, b * 4 / kal * 100, 1, '', '%')]);
    }
    return {
      rows,
      note: 'Böbrek hastalığı, gebelik, emzirme ya da özel bir diyet durumunda protein miktarını hekiminiz ya da diyetisyeniniz belirlemelidir.',
    };
  },
  cases: [
    { in: { kilo: '70', duzey: 'sedanter', ogun: '3' }, out: { 'Günlük protein': '56 g', 'Öğün başına': '18,7 g', 'Proteinden gelen kalori': '224 kcal', 'Kullanılan aralık': '0,8 g/kg' } },
    { in: { kilo: '70', duzey: 'kuvvet', ogun: '4', kalori: '2500' }, out: { 'Günlük protein': '112 – 154 g', 'Öğün başına': '28 – 38,5 g', 'Proteinden gelen kalori': '448 – 616 kcal', 'Günlük kalorideki payı': '%17,9 – %24,6' } },
    { in: { kilo: '80', duzey: 'dayaniklilik', ogun: '3' }, out: { 'Günlük protein': '96 – 128 g', 'Öğün başına': '32 – 42,7 g', 'Proteinden gelen kalori': '384 – 512 kcal' } },
    { in: { kilo: '60', duzey: 'hafif', ogun: '3' }, out: { 'Günlük protein': '60 – 72 g', 'Öğün başına': '20 – 24 g', 'Kullanılan aralık': '1 – 1,2 g/kg' } },
    { in: { kilo: '90', duzey: 'kiloverme', ogun: '4' }, out: { 'Günlük protein': '144 – 216 g', 'Öğün başına': '36 – 54 g' } },
    { in: { kilo: '75', duzey: 'ileriyas', ogun: '3' }, out: { 'Günlük protein': '75 – 90 g', 'Öğün başına': '25 – 30 g', 'Proteinden gelen kalori': '300 – 360 kcal' } },
    { in: { kilo: '', duzey: 'sedanter', ogun: '3' }, error: true },
    { in: { kilo: '70', duzey: 'kuvvet', ogun: '0' }, error: true },
    { in: { kilo: '-70', duzey: 'kuvvet', ogun: '3' }, error: true },
  ],
  howto: [
    'Kilonuzu kilogram olarak yazın.',
    'Listeden size en yakın hareket düzeyini ya da hedefi seçin; her seçeneğin yanında kullanılan gram/kilogram aralığı yazar.',
    'Günde kaç ana ve ara öğünde protein aldığınızı girin; varsayılan değer 3\'tür.',
    'İsterseniz günlük kalori alımınızı da yazın; böylece proteinin toplam enerjideki payını görürsünüz.',
    '"Hesapla" düğmesine basın ve günlük toplamı, öğün başına miktarı ve kalori karşılığını okuyun.',
  ],
  sections: [
    { h: 'Protein ihtiyacı neye göre belirlenir?', p: [
      'Protein ihtiyacı çoğunlukla vücut ağırlığının kilogramı başına gram olarak ifade edilir. Hesap basittir: <strong>günlük protein (g) = kilo (kg) × katsayı (g/kg)</strong>. Asıl soru hangi katsayının seçileceğidir ve bunun yanıtı yaşa, hareket düzeyine ve hedefe göre değişir.',
      'Sağlıklı ve hareketsiz bir yetişkin için beslenme rehberlerinde yaygın olarak anılan değer kilogram başına 0,8 gramdır. Bu, eksikliği önlemeye yönelik bir taban değerdir; "en iyi" miktar olduğu anlamına gelmez. Düzenli spor yapanlar, kas kütlesini artırmak isteyenler, enerji kısıtlaması yaparken kasını korumaya çalışanlar ve ileri yaştaki kişiler için spor beslenmesi ve geriatri kaynaklarında daha yüksek aralıklar önerilir.',
    ] },
    { h: 'Araçta kullanılan aralıklar', ul: [
      '<strong>Hareketsiz yetişkin:</strong> 0,8 g/kg. Masa başı çalışan, düzenli egzersiz yapmayan kişiler.',
      '<strong>Hafif aktif:</strong> 1,0–1,2 g/kg. Haftada birkaç gün yürüyüş ya da hafif egzersiz yapanlar.',
      '<strong>Düzenli dayanıklılık sporu:</strong> 1,2–1,6 g/kg. Koşu, bisiklet, yüzme gibi sporları düzenli sürdürenler.',
      '<strong>Kuvvet antrenmanı ve kas kazanımı:</strong> 1,6–2,2 g/kg. Ağırlık çalışan ve kas kütlesini artırmayı hedefleyenler.',
      '<strong>Kilo verirken kas koruma:</strong> 1,6–2,4 g/kg. Kalori açığındayken yağsız kütleyi korumak isteyenler.',
      '<strong>65 yaş ve üzeri:</strong> 1,0–1,2 g/kg. Yaşla birlikte kas kaybını yavaşlatmak için önerilen aralık.',
    ], p: [
      'Bu aralıklar literatürde sık geçen genel çerçevelerdir; kişisel bir reçete değildir. Aralığın alt ucu çoğu kişi için yeterli bir başlangıçtır; üst uç yoğun antrenman dönemlerinde ya da belirgin kalori kısıtlamasında gündeme gelir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '70 kg ağırlığında, haftada dört gün ağırlık çalışan biri "Kuvvet antrenmanı, kas kazanımı" seçeneğini işaretlesin. Alt sınır 70 × 1,6 = 112 g, üst sınır 70 × 2,2 = 154 g olur; yani günlük hedef <strong>112 – 154 gram</strong> proteindir. Dört öğüne bölündüğünde öğün başına 28 ile 38,5 gram düşer.',
      'Proteinin gramı yaklaşık 4 kilokalori enerji verir. Buna göre bu miktar 448 ile 616 kcal arasında enerji sağlar. Kişi günde 2500 kcal alıyorsa protein, toplam enerjinin yaklaşık %17,9 ile %24,6\'sını oluşturur. Aynı kilodaki hareketsiz bir yetişkin için ise hesap 70 × 0,8 = 56 gramdır.',
    ] },
    { h: 'Bu kadar protein hangi besinlerde var?', p: [
      'Besinlerin protein içeriği ürüne, pişirme biçimine ve markaya göre değişir; aşağıdaki değerler yaklaşık ve yalnızca fikir vermek içindir. Kesin değer için ambalaj üzerindeki besin etiketine bakın.',
    ], ul: [
      'Bir orta boy yumurta: yaklaşık 6 g',
      '100 g pişmiş tavuk göğsü: yaklaşık 30 g',
      '100 g pişmiş kırmızı et ya da balık: yaklaşık 20–26 g',
      'Bir su bardağı süt ya da yoğurt: yaklaşık 7–8 g',
      '100 g pişmiş kuru baklagil (mercimek, nohut, kuru fasulye): yaklaşık 7–9 g',
      '30 g beyaz peynir: yaklaşık 5 g',
    ] },
    { h: 'Öğünlere dağıtmak neden önerilir?', p: [
      'Günlük toplam miktar en belirleyici etkendir; yine de proteinin tek bir öğüne yığılması yerine güne yayılması sıkça önerilir. Türkiye\'de yaygın alışkanlık kahvaltıda ve öğlen görece az, akşam yemeğinde fazla protein almaktır. Kahvaltıya yumurta, peynir ya da yoğurt; ara öğüne süt ürünü ya da kuruyemiş eklemek dağılımı dengelemenin kolay yoludur. Araçtaki "Öğün başına" satırı, toplamı eşit paylaştırdığınızda her öğünde hedeflemeniz gereken miktarı gösterir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Çok kilolu kişilerde hesabı mevcut kilo üzerinden yapmak ihtiyacı olduğundan yüksek gösterebilir; bu durumda hedef kilo ya da yağsız vücut kütlesi üzerinden düşünmek daha gerçekçi olur. Bir diğer hata, besinin ağırlığını protein miktarı sanmaktır: 100 gram et 100 gram protein demek değildir. Protein tozu gibi takviyeler zorunlu değildir; yalnızca besinlerle hedefe ulaşmak zorlaştığında bir kolaylıktır.',
      'Böbrek ya da karaciğer hastalığı olanlarda, gebelik ve emzirmede, çocuk ve ergenlerde protein gereksinimi farklı değerlendirilir. Bu araç genel bilgilendirme sağlar; beslenme planı için diyetisyene, sağlık sorununuz varsa hekiminize danışın.',
    ] },
  ],
  faq: [
    ['Günde kaç gram protein almalıyım?', 'Hareketsiz sağlıklı bir yetişkin için taban değer kilogram başına 0,8 gramdır; 70 kg için bu 56 gram eder. Düzenli spor yapanlarda aralık 1,2 ile 2,2 g/kg arasına çıkar.'],
    ['Kas yapmak için kilo başına kaç gram protein gerekir?', 'Kuvvet antrenmanı yapanlar için sık anılan aralık kilogram başına 1,6 ile 2,2 gramdır. 80 kg bir kişi için bu 128 ile 176 gram arasına denk gelir. Antrenman ve yeterli toplam enerji olmadan yalnızca protein artırmak kas kazandırmaz.'],
    ['Kilo verirken protein neden artırılır?', 'Kalori açığında vücut yalnızca yağ değil, yağsız doku da kaybedebilir. Yeterli protein ve direnç egzersizi bu kaybı sınırlamaya yardımcı olur; ayrıca protein tokluk hissini destekler.'],
    ['Bir öğünde en fazla ne kadar protein alınabilir?', 'Vücut bir öğünde alınan proteini sindirir ve emer; kesin bir "üst sınır" yoktur. Yine de toplamı üç dört öğüne bölmek pratik bir yaklaşımdır ve çoğu kişi için öğün başına 20–40 gram aralığına denk gelir.'],
    ['Fazla protein zararlı mı?', 'Sağlıklı kişilerde buradaki aralıklar genel olarak güvenli kabul edilir. Böbrek hastalığı olanlarda protein kısıtlaması gerekebileceği için bu kişilerin hekim önerisi dışında alımı artırmaması gerekir.'],
    ['Bitkisel beslenenler hedefe ulaşabilir mi?', 'Evet. Baklagiller, soya ürünleri, tahıllar ve kuruyemişler birlikte tüketildiğinde ihtiyaç karşılanabilir. Bitkisel kaynakların protein yoğunluğu daha düşük olduğundan porsiyonları buna göre planlamak gerekir.'],
    ['Hesap mevcut kiloya göre mi, ideal kiloya göre mi yapılmalı?', 'Normal kilo aralığındaki kişilerde mevcut kilo kullanılır. Belirgin fazla kilosu olanlarda hedef kilo ya da yağsız vücut kütlesi üzerinden hesaplamak daha makul sonuç verir.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kilonuz ve diğer değerler sunucuya gönderilmez.'],
  ],
  related: ['makro-besin-hesapla', 'kalori-hesapla', 'karbonhidrat-ihtiyaci-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'bazal-metabolizma-hesapla'],
};
