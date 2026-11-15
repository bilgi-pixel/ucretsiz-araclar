export default {
  slug: 'tanjant-hesapla',
  title: 'Tanjant ve Kotanjant Hesaplama',
  h1Tail: 'tan(x) ve cot(x)',
  pageTitle: 'Tanjant ve Kotanjant Hesaplama – tan(x), cot(x) Değerleri',
  description: 'Bir açının tanjantını ve kotanjantını derece, radyan ya da grad olarak hesaplayın. Özel açılarda köklü tam değerleri ve yüzde eğim karşılığını da verir.',
  card: 'Açının tanjant ve kotanjant değerini bulun; özel açılarda köklü tam değer, tanımsız noktalar ve yüzde eğim ile.',
  category: 'matematik',
  keywords: ['tanjant hesaplama', 'kotanjant hesaplama', 'tan hesaplama', 'cot hesaplama', 'tan 45 kaç', 'tanjant değerleri', 'tan 90 tanımsız', 'tanjant tablosu'],
  lead: 'Açıyı girin; araç <strong>tan(x)</strong> ve <strong>cot(x)</strong> değerlerini birlikte hesaplar. Tanımsız olduğu açıları belirtir, özel açılarda köklü tam değeri ve tanjantın yüzde eğim karşılığını gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'aci', label: 'Açı', type: 'number', placeholder: 'Örn. 45' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece (°)'], ['radyan', 'Radyan'], ['pi', 'π\'nin katı (değer × π radyan)'], ['grad', 'Grad']], hint: '"π\'nin katı" seçiliyken 0,25 yazmak π/4 radyan demektir.' },
  ],
  compute(v, h) {
    const x = h.num(v.aci, 'Açı');
    const kat = { derece: 1, radyan: 180 / Math.PI, pi: 180, grad: 0.9 }[v.birim] || 1;
    let deg = x * kat;
    if (Math.abs(deg) > 1e12) h.err('Açı çok büyük; daha küçük bir değer yazın.');
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const d = ((deg % 360) + 360) % 360;
    const m = d % 180, ref = m > 90 ? 180 - m : m;
    const neg = m > 90;
    let t = null, k = null; // null = tanımsız
    if (m === 0) { t = 0; }
    else if (m === 90) { k = 0; }
    else { t = Math.tan(m * Math.PI / 180); k = 1 / t; }
    const tanTablo = { 0: '0', 15: '2 - √3', 30: '√3/3', 45: '1', 60: '√3', 75: '2 + √3' };
    const cotTablo = { 15: '2 + √3', 30: '√3', 45: '1', 60: '√3/3', 75: '2 - √3', 90: '0' };
    const isaretle = (s) => (s === undefined ? undefined : !neg || s === '0' ? s : s.includes(' ') ? '-(' + s + ')' : '-' + s);
    const tanTam = isaretle(tanTablo[ref]), cotTam = isaretle(cotTablo[ref]);
    let bolge;
    if (d % 90 === 0) bolge = 'Eksen üzerinde (bölge sınırı)';
    else bolge = ['I. bölge (tanjant pozitif)', 'II. bölge (tanjant negatif)', 'III. bölge (tanjant pozitif)', 'IV. bölge (tanjant negatif)'][Math.floor(d / 90)];
    const rows = [['Tanjant', t === null ? 'tanımsız' : h.fmt(t, 10)]];
    if (tanTam !== undefined) rows.push(['Tanjant (tam değer)', tanTam]);
    rows.push(['Kotanjant', k === null ? 'tanımsız' : h.fmt(k, 10)]);
    if (cotTam !== undefined) rows.push(['Kotanjant (tam değer)', cotTam]);
    rows.push(
      ['Yüzde eğim karşılığı', t === null ? 'tanımsız (düşey)' : '%' + h.fmt(t * 100, 4)],
      ['Açı (derece)', h.fmt(deg, 6) + '°'],
      ['Açı (radyan)', h.fmt(deg * Math.PI / 180, 6) + ' rad'],
      ['Esas ölçü', h.fmt(d, 6) + '°'],
      ['Bölge', bolge],
    );
    return { rows, note: 'Tanjant 90° ve 270°\'de, kotanjant 0° ve 180°\'de tanımsızdır. Sonuçlar en fazla on ondalık basamağa yuvarlanır.' };
  },
  cases: [
    { in: { aci: '45', birim: 'derece' }, out: { 'Tanjant': '1', 'Kotanjant': '1', 'Tanjant (tam değer)': '1', 'Yüzde eğim karşılığı': '%100' } },
    { in: { aci: '60', birim: 'derece' }, out: { 'Tanjant': '1,7320508076', 'Tanjant (tam değer)': '√3', 'Kotanjant': '0,5773502692', 'Kotanjant (tam değer)': '√3/3' } },
    { in: { aci: '90', birim: 'derece' }, out: { 'Tanjant': 'tanımsız', 'Kotanjant': '0', 'Yüzde eğim karşılığı': 'tanımsız (düşey)' } },
    { in: { aci: '0', birim: 'derece' }, out: { 'Tanjant': '0', 'Kotanjant': 'tanımsız' } },
    { in: { aci: '135', birim: 'derece' }, out: { 'Tanjant': '-1', 'Tanjant (tam değer)': '-1', 'Bölge': 'II. bölge (tanjant negatif)' } },
    { in: { aci: '1', birim: 'radyan' }, out: { 'Tanjant': '1,5574077247', 'Kotanjant': '0,6420926159' } },
    { in: { aci: '0,25', birim: 'pi' }, out: { 'Tanjant': '1', 'Açı (derece)': '45°' } },
    { in: { aci: '15', birim: 'derece' }, out: { 'Tanjant': '0,2679491924', 'Tanjant (tam değer)': '2 - √3', 'Kotanjant (tam değer)': '2 + √3' } },
    { in: { aci: '225', birim: 'derece' }, out: { 'Tanjant': '1', 'Bölge': 'III. bölge (tanjant pozitif)' } },
    { in: { aci: '165', birim: 'derece' }, out: { 'Tanjant (tam değer)': '-(2 - √3)', 'Tanjant': '-0,2679491924' } },
    { in: { aci: '50', birim: 'grad' }, out: { 'Tanjant': '1' } },
    { in: { aci: 'x', birim: 'derece' }, error: true },
    { in: { aci: '', birim: 'derece' }, error: true },
  ],
  howto: [
    '"Açı" alanına değeri yazın. Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz; negatif açılar da hesaplanır.',
    '"Açı birimi" listesinden derece, radyan, π\'nin katı ya da grad seçeneklerinden uygun olanı işaretleyin.',
    '"Hesapla" düğmesine basın. Tanjant ilk satırda, kotanjant hemen altında görünür; özel açılarda köklü tam değerler ayrı satırlarda verilir.',
    'Bir fonksiyon o açıda tanımlı değilse sonuçta "tanımsız" yazar. Yol ya da rampa hesabı yapıyorsanız "Yüzde eğim karşılığı" satırını kullanın.',
  ],
  sections: [
    { h: 'Tanjant ve kotanjant nedir?', p: [
      'Dik üçgende bir dar açının tanjantı, <strong>karşı dik kenarın komşu dik kenara oranıdır</strong>: tan A = karşı ÷ komşu. Kotanjant bunun tersidir: cot A = komşu ÷ karşı. Sinüs ve kosinüsten farklı olarak bu oranlarda hipotenüs yer almaz; bu yüzden değerleri 1\'i aşabilir ve sınırsız büyüyebilir.',
      'Sinüs ve kosinüs cinsinden yazıldığında tan x = sin x ÷ cos x ve cot x = cos x ÷ sin x olur. Buradan iki sonuç çıkar: tanjant ile kotanjant birbirinin çarpmaya göre tersidir (tan x · cot x = 1) ve paydanın sıfır olduğu açılarda fonksiyon tanımsızdır. Geometrik olarak tanjant, açının bitim kolunun eğimidir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>tan 45°:</strong> İkizkenar dik üçgende iki dik kenar eşittir, dolayısıyla karşı ÷ komşu = 1 olur. Kotanjant da 1\'dir. Araç yüzde eğim karşılığını %100 olarak gösterir; yani yatayda 1 metre ilerlerken 1 metre yükselirsiniz.',
      '<strong>tan 60°:</strong> 30-60-90 üçgeninde 60°\'nin karşısındaki kenar √3, komşu kenar 1 birimdir. tan 60° = √3 ≈ 1,7320508076 ve cot 60° = 1/√3 = √3/3 ≈ 0,5773502692 bulunur.',
      '<strong>tan 135°:</strong> Açı II. bölgededir, referans açısı 45°\'dir. II. bölgede sinüs pozitif, kosinüs negatif olduğundan oran negatiftir: tan 135° = −1.',
      '<strong>tan 225°:</strong> 225 = 180 + 45 olduğundan ve tanjantın periyodu 180° olduğundan sonuç tan 45° = 1\'dir. III. bölgede sinüs de kosinüs de negatiftir, oranları pozitif çıkar.',
      '<strong>tan 90°:</strong> cos 90° = 0 olduğu için bölme yapılamaz; araç "tanımsız" yazar. Aynı açıda kotanjant 0\'dır.',
    ] },
    { h: 'Özel açıların tanjant ve kotanjant değerleri', ul: [
      '<strong>0°:</strong> tan = 0, cot tanımsız',
      '<strong>15°:</strong> tan = 2 − √3 ≈ 0,2679, cot = 2 + √3 ≈ 3,7321',
      '<strong>30°:</strong> tan = √3/3 ≈ 0,5774, cot = √3 ≈ 1,7321',
      '<strong>45°:</strong> tan = 1, cot = 1',
      '<strong>60°:</strong> tan = √3 ≈ 1,7321, cot = √3/3 ≈ 0,5774',
      '<strong>75°:</strong> tan = 2 + √3 ≈ 3,7321, cot = 2 − √3 ≈ 0,2679',
      '<strong>90°:</strong> tan tanımsız, cot = 0',
      '<strong>180°:</strong> tan = 0, cot tanımsız',
    ] },
    { h: 'Tanımsız noktalar, periyot ve işaret', p: [
      'Tanjant 90° ve 270°\'de (genel olarak 90° + k·180° açılarında), kotanjant 0° ve 180°\'de (k·180° açılarında) tanımsızdır. Açı 90°\'ye soldan yaklaşırken tanjant sınırsız büyür: tan 89° ≈ 57,29 iken tan 89,9° ≈ 572,96 olur. Bu yüzden 90°\'ye çok yakın açılarda çok büyük sayılar görmeniz hata değildir.',
      'Sinüs ve kosinüsün periyodu 360° iken tanjant ve kotanjantın periyodu <strong>180°</strong>\'dir; tan(x + 180°) = tan x. İşaret kuralı da buna bağlıdır: I. ve III. bölgede pozitif, II. ve IV. bölgede negatiftir. Ayrıca tan(−x) = −tan x ve tan(90° − x) = cot x eşitlikleri indirgeme sorularında sıkça kullanılır.',
    ] },
    { h: 'Tanjant ve eğim ilişkisi', p: [
      'Bir doğrunun x ekseniyle yaptığı açının tanjantı o doğrunun eğimidir. Yol, rampa ve çatı işlerinde eğim genellikle yüzde olarak söylenir; yüzde eğim, tanjantın 100 ile çarpılmış hâlidir. Örneğin 5,71°\'lik bir açının tanjantı yaklaşık 0,1\'dir ve bu %10 eğime karşılık gelir.',
      'Yükseklik ölçümünde de tanjant kullanılır: bir binanın dibinden 20 metre uzakta durup tepesini 60° açıyla görüyorsanız, binanın göz hizanızdan yüksekliği 20 × tan 60° ≈ 34,64 metredir. Fizikte eğik düzlemde cismin kaymaya başladığı açının tanjantı statik sürtünme katsayısına eşittir. Bu tür uygulamalarda sonuç bilgilendirme amaçlıdır; yapı ve yol projelerinde ilgili yönetmelik ve mühendis hesabı esas alınmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Kotanjantı ters tanjant (arctan) ile karıştırmak yaygın bir yanılgıdır. cot x, tanjantın çarpmaya göre tersidir ve bir oran verir; arctan ise orandan açıya dönen ters fonksiyondur. Hesap makinelerindeki tan<sup>−1</sup> tuşu arctan\'dır, kotanjant değildir.',
      'İkinci hata birim seçimidir: tan 45 derece modunda 1 iken radyan modunda yaklaşık 1,6198 çıkar. Üçüncüsü, yüzde eğimi açıyla aynı sanmaktır; %100 eğim 90° değil 45°\'dir. Köklü tam değerler yalnızca 15°\'nin katlarında gösterilir, diğer açılarda ondalık sonuç kullanılır.',
    ] },
  ],
  faq: [
    ['Tan 45 kaçtır?', 'tan 45° = 1\'dir. İkizkenar dik üçgende karşı ve komşu dik kenarlar eşit olduğu için oranları 1 eder; cot 45° de 1\'dir.'],
    ['Tan 90 neden tanımsızdır?', 'tan x = sin x ÷ cos x olarak tanımlanır ve cos 90° = 0\'dır. Sıfıra bölme yapılamadığı için tan 90° tanımsızdır. Açı 90°\'ye yaklaştıkça tanjant sınırsız büyür.'],
    ['Kotanjant nasıl hesaplanır?', 'Kotanjant, tanjantın çarpmaya göre tersidir: cot x = 1 ÷ tan x = cos x ÷ sin x. Örneğin tan 60° = √3 olduğundan cot 60° = 1/√3 = √3/3 ≈ 0,5774 olur.'],
    ['Tanjant hangi bölgelerde negatiftir?', 'II. ve IV. bölgede, yani esas ölçüsü 90°–180° ya da 270°–360° arasında olan açılarda tanjant ve kotanjant negatiftir. Bu bölgelerde sinüs ile kosinüsün işaretleri birbirinden farklıdır.'],
    ['Tanjant 1\'den büyük olabilir mi?', 'Evet. Sinüs ve kosinüsün aksine tanjantın üst sınırı yoktur. 45°\'den büyük dar açılarda tanjant 1\'i aşar; örneğin tan 60° ≈ 1,732 ve tan 80° ≈ 5,671\'dir.'],
    ['Yüzde eğimi açıya nasıl çeviririm?', 'Yüzde eğimi 100\'e bölüp ters tanjantını alırsınız. %10 eğim için arctan(0,1) ≈ 5,71° bulunur. Bu araç ters yönde çalışır: açıyı yazdığınızda yüzde eğim karşılığını verir.'],
    ['Tanjantın periyodu kaçtır?', 'Tanjant ve kotanjantın periyodu 180°, yani π radyandır. Bu yüzden tan 225° ile tan 45° eşittir ve ikisi de 1\'dir.'],
    ['Yazdığım açı sunucuya gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızın içinde yapılır; girdiğiniz değer hiçbir yere gönderilmez ve kaydedilmez.'],
  ],
  related: ['sinus-hesapla', 'kosinus-hesapla', 'ters-trigonometri-hesapla', 'egim-yuzdesi-hesapla', 'derece-radyan-cevir', 'dik-ucgen-hesapla'],
};
