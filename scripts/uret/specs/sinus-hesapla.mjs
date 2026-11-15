export default {
  slug: 'sinus-hesapla',
  title: 'Sinüs Hesaplama',
  h1Tail: 'sin(x) değeri',
  pageTitle: 'Sinüs Hesaplama – Derece, Radyan ve Grad İçin sin(x) Değeri',
  description: 'Bir açının sinüsünü derece, radyan ya da grad olarak hesaplayın. Özel açılarda köklü tam değeri, kosekantı, esas ölçüyü ve açının bölgesini de gösterir.',
  card: 'Açının sinüsünü derece, radyan ya da grad cinsinden bulun; özel açılarda köklü tam değer ve kosekant ile birlikte.',
  category: 'matematik',
  keywords: ['sinüs hesaplama', 'sin hesaplama', 'sin 30 kaç', 'sinüs değerleri', 'sinüs tablosu', 'radyan sinüs', 'kosekant hesaplama', 'sin x hesapla'],
  lead: 'Açıyı yazın, birimini seçin; araç <strong>sin(x)</strong> değerini on ondalık basamağa kadar hesaplar. 30°, 45°, 60° gibi özel açılarda köklü tam değeri, ayrıca kosekantı, esas ölçüyü ve açının hangi bölgede olduğunu da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'aci', label: 'Açı', type: 'number', placeholder: 'Örn. 30' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece (°)'], ['radyan', 'Radyan'], ['pi', 'π\'nin katı (değer × π radyan)'], ['grad', 'Grad']], hint: '"π\'nin katı" seçiliyken 0,5 yazmak π/2 radyan demektir.' },
  ],
  compute(v, h) {
    const x = h.num(v.aci, 'Açı');
    const kat = { derece: 1, radyan: 180 / Math.PI, pi: 180, grad: 0.9 }[v.birim] || 1;
    let deg = x * kat;
    if (Math.abs(deg) > 1e12) h.err('Açı çok büyük; daha küçük bir değer yazın.');
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const d = ((deg % 360) + 360) % 360;
    let s = Math.sin(d * Math.PI / 180);
    if (d % 180 === 0) s = 0; else if (d === 90) s = 1; else if (d === 270) s = -1;
    const m = d % 180, ref = m > 90 ? 180 - m : m;
    const tablo = { 0: '0', 15: '(√6 - √2)/4', 30: '1/2', 45: '√2/2', 60: '√3/2', 75: '(√6 + √2)/4', 90: '1' };
    let tam = tablo[ref];
    if (tam !== undefined && d > 180) tam = '-' + tam;
    let bolge;
    if (d % 90 === 0) bolge = 'Eksen üzerinde (bölge sınırı)';
    else bolge = ['I. bölge (sinüs pozitif)', 'II. bölge (sinüs pozitif)', 'III. bölge (sinüs negatif)', 'IV. bölge (sinüs negatif)'][Math.floor(d / 90)];
    const rows = [['Sinüs', h.fmt(s, 10)]];
    if (tam !== undefined) rows.push(['Tam değer', tam]);
    rows.push(
      ['Kosekant (1 / sin)', s === 0 ? 'tanımsız' : h.fmt(1 / s, 10)],
      ['Açı (derece)', h.fmt(deg, 6) + '°'],
      ['Açı (radyan)', h.fmt(deg * Math.PI / 180, 6) + ' rad'],
      ['Esas ölçü', h.fmt(d, 6) + '°'],
      ['Bölge', bolge],
    );
    return { rows, note: 'Sinüs değeri her zaman -1 ile 1 arasındadır. Sonuç en fazla on ondalık basamağa yuvarlanır.' };
  },
  cases: [
    { in: { aci: '30', birim: 'derece' }, out: { 'Sinüs': '0,5', 'Tam değer': '1/2', 'Kosekant (1 / sin)': '2', 'Bölge': 'I. bölge (sinüs pozitif)' } },
    { in: { aci: '1', birim: 'radyan' }, out: { 'Sinüs': '0,8414709848', 'Açı (derece)': '57,29578°' } },
    { in: { aci: '45', birim: 'derece' }, out: { 'Sinüs': '0,7071067812', 'Tam değer': '√2/2', 'Kosekant (1 / sin)': '1,4142135624' } },
    { in: { aci: '90', birim: 'derece' }, out: { 'Sinüs': '1', 'Açı (radyan)': '1,570796 rad' } },
    { in: { aci: '180', birim: 'derece' }, out: { 'Sinüs': '0', 'Kosekant (1 / sin)': 'tanımsız' } },
    { in: { aci: '0,5', birim: 'pi' }, out: { 'Sinüs': '1', 'Açı (derece)': '90°' } },
    { in: { aci: '100', birim: 'grad' }, out: { 'Sinüs': '1' } },
    { in: { aci: '210', birim: 'derece' }, out: { 'Sinüs': '-0,5', 'Tam değer': '-1/2', 'Bölge': 'III. bölge (sinüs negatif)' } },
    { in: { aci: '750', birim: 'derece' }, out: { 'Sinüs': '0,5', 'Esas ölçü': '30°' } },
    { in: { aci: '-60', birim: 'derece' }, out: { 'Sinüs': '-0,8660254038', 'Tam değer': '-√3/2', 'Esas ölçü': '300°' } },
    { in: { aci: 'abc', birim: 'derece' }, error: true },
    { in: { aci: '', birim: 'radyan' }, error: true },
  ],
  howto: [
    '"Açı" alanına sinüsünü bulmak istediğiniz açıyı yazın. Negatif açılar ve 360°\'den büyük açılar da kabul edilir.',
    '"Açı birimi" listesinden değerin derece mi, radyan mı, π\'nin katı mı yoksa grad mı olduğunu seçin. Hesap makinelerindeki en yaygın hata burada yapılır; birimi mutlaka kontrol edin.',
    '"Hesapla" düğmesine basın. İlk satırda sin(x) değeri, altında varsa köklü tam değer ve kosekant görünür.',
    'Açının derece ve radyan karşılığını, esas ölçüsünü ve bulunduğu bölgeyi sonuç kutusunun alt satırlarından okuyun.',
  ],
  sections: [
    { h: 'Sinüs nedir?', p: [
      'Sinüs, trigonometrinin temel oranıdır. Bir dik üçgende bir dar açının sinüsü, <strong>o açının karşısındaki dik kenarın hipotenüse oranıdır</strong>: sin A = karşı kenar ÷ hipotenüs. Hipotenüs her zaman en uzun kenar olduğu için dar açılarda bu oran 0 ile 1 arasında kalır.',
      'Tanım yalnızca dar açılarla sınırlı değildir. Merkezi başlangıç noktasında olan ve yarıçapı 1 birim alınan birim çemberde, pozitif x ekseninden saat yönünün tersine x açısı kadar dönüldüğünde varılan noktanın <strong>y koordinatı</strong> sin(x) değerini verir. Bu sayede 90°\'den büyük, hatta negatif açıların da sinüsü tanımlanır ve değer -1 ile 1 arasında dolaşır.',
    ] },
    { h: 'Hesap nasıl yapılır? Çözümlü örnekler', p: [
      'Araç önce yazdığınız açıyı dereceye çevirir: radyan değeri 180/π ile, grad değeri 0,9 ile çarpılır; "π\'nin katı" seçeneğinde yazdığınız sayı 180 ile çarpılır. Sonra açının 360°\'ye bölümünden kalan, yani esas ölçü bulunur ve sinüs bu açı üzerinden hesaplanır.',
      '<strong>Örnek 1:</strong> sin 30° istensin. Kenarları 1, √3 ve 2 olan 30-60-90 üçgeninde 30°\'nin karşısındaki kenar 1, hipotenüs 2\'dir; oran 1/2 = 0,5 bulunur. Araç da "Sinüs: 0,5" ve "Tam değer: 1/2" yazar; kosekant bunun tersi olan 2\'dir.',
      '<strong>Örnek 2:</strong> sin 210° için açı III. bölgededir ve referans açısı 210 − 180 = 30°\'dir. III. bölgede sinüs negatif olduğundan sonuç −sin 30° = −0,5 olur.',
      '<strong>Örnek 3:</strong> sin 750° için 750 = 2 × 360 + 30 yazılır; esas ölçü 30°\'dir ve sonuç yine 0,5\'tir. Sinüs 360° periyotlu olduğundan tam turlar sonucu değiştirmez.',
      '<strong>Örnek 4:</strong> 1 radyan yaklaşık 57,29578° eder ve sin(1) = 0,8414709848 bulunur. Aynı sayıyı derece olarak girerseniz sin 1° = 0,0174524064 çıkar; iki sonuç arasındaki büyük fark birim seçiminin önemini gösterir.',
    ] },
    { h: 'Özel açıların sinüs değerleri', ul: [
      '<strong>sin 0°</strong> = 0',
      '<strong>sin 15°</strong> = (√6 − √2)/4 ≈ 0,2588',
      '<strong>sin 30°</strong> = 1/2 = 0,5',
      '<strong>sin 45°</strong> = √2/2 ≈ 0,7071',
      '<strong>sin 60°</strong> = √3/2 ≈ 0,8660',
      '<strong>sin 75°</strong> = (√6 + √2)/4 ≈ 0,9659',
      '<strong>sin 90°</strong> = 1',
      '<strong>sin 180°</strong> = 0',
      '<strong>sin 270°</strong> = −1',
      '<strong>sin 360°</strong> = 0',
    ] },
    { h: 'Bölgelere göre işaret ve temel özdeşlikler', p: [
      'Sinüs birim çemberde y koordinatı olduğu için x ekseninin üstünde kalan I. ve II. bölgede pozitif, altında kalan III. ve IV. bölgede negatiftir. Araç, sonucun işaretini kontrol edebilmeniz için açının bölgesini ayrıca yazar.',
      'Soru çözerken en çok kullanılan özellikler şunlardır: sin(−x) = −sin x (sinüs tek fonksiyondur), sin(180° − x) = sin x, sin(180° + x) = −sin x, sin(90° − x) = cos x ve sin²x + cos²x = 1. Örneğin sin 150° = sin(180° − 30°) = sin 30° = 0,5 olur. Bütünler açıların sinüsleri eşit olduğu için bir sinüs değerinden açıya geri dönerken iki farklı açı çıkabileceğini unutmayın.',
    ] },
    { h: 'Sinüs nerelerde kullanılır?', p: [
      'Lise matematiğinde ve üniversite sınavına hazırlıkta trigonometri sorularının büyük bölümü sinüs değerlerine dayanır. Fizikte eğik atışta hızın düşey bileşeni v·sin θ ile, eğik düzlemde ağırlığın yüzeye paralel bileşeni m·g·sin θ ile bulunur. Alternatif akım gerilimi ve ses dalgaları zamana bağlı sinüs fonksiyonuyla ifade edilir.',
      'Gündelik işlerde de karşınıza çıkar: duvara belirli bir açıyla dayanan merdivenin ulaştığı yükseklik merdiven boyu × sin(açı) kadardır. 4 metrelik bir merdiven yerle 60° açı yapıyorsa ulaştığı yükseklik 4 × 0,8660 ≈ 3,46 metredir. Haritacılıkta, çatı ve rampa hesaplarında, bilgisayar grafiklerinde nesneleri döndürürken de aynı oran kullanılır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata derece ile radyanı karıştırmaktır. Sonuç beklediğinizden çok farklıysa önce birimi kontrol edin. İkinci hata, sin²x ifadesini sin(x²) sanmaktır; sin²x, sinüs değerinin karesidir. Üçüncüsü, sin(2x) değerinin 2·sin x olduğunu düşünmektir; doğrusu sin 2x = 2·sin x·cos x\'tir.',
      'Araç sonucu en fazla on ondalık basamağa yuvarlar; köklü tam değer yalnızca 15°\'nin katı olan açılarda gösterilir. Radyan girişlerinde π\'yi elle yazmak yuvarlama getireceği için π/6, π/4 gibi açılarda "π\'nin katı" seçeneğini kullanmak en temiz sonucu verir. Kosekant, sinüsün sıfır olduğu 0°, 180° ve katlarında tanımsızdır.',
    ] },
  ],
  faq: [
    ['Sin 30 kaçtır?', 'sin 30° = 1/2, yani 0,5\'tir. 30-60-90 üçgeninde 30°\'nin karşısındaki kenar hipotenüsün yarısı olduğu için bu değer tamdır.'],
    ['Sin 90 neden 1\'dir?', 'Birim çemberde 90° dönüldüğünde varılan nokta (0, 1) noktasıdır. Sinüs bu noktanın y koordinatı olduğu için sin 90° = 1 olur ve sinüsün alabileceği en büyük değer budur.'],
    ['Sinüs negatif olabilir mi?', 'Evet. Esas ölçüsü 180° ile 360° arasında olan açılarda, yani III. ve IV. bölgede sinüs negatiftir. Örneğin sin 210° = −0,5 ve sin 270° = −1\'dir.'],
    ['Radyan cinsinden açının sinüsünü nasıl hesaplarım?', 'Birim listesinden "Radyan" seçip değeri yazmanız yeterlidir. π/6, π/3 gibi açılarda "π\'nin katı" seçeneğini kullanın ve yalnızca katsayıyı yazın; π/6 için 0,1666667 yerine birimi dereceye çevirip 30 yazmak da aynı sonucu verir.'],
    ['Kosekant nedir?', 'Kosekant, sinüsün çarpmaya göre tersidir: cosec x = 1 / sin x. Dik üçgende hipotenüsün karşı kenara oranıdır. Sinüsün sıfır olduğu açılarda bölme yapılamadığı için kosekant tanımsızdır.'],
    ['Sinüs değerinden açıyı nasıl bulurum?', 'Bunun için ters sinüs (arcsin) kullanılır. Örneğin sinüsü 0,5 olan temel açı 30°\'dir; ancak 0° ile 360° arasında 150° de aynı sinüse sahiptir. Açıya geri dönmek için ters trigonometri aracını kullanabilirsiniz.'],
    ['Sinüsün periyodu kaçtır?', 'Sinüs fonksiyonunun periyodu 360°, yani 2π radyandır. Bir açıya 360°\'nin tam katlarını eklemek ya da çıkarmak sinüs değerini değiştirmez; bu yüzden sin 390° ile sin 30° eşittir.'],
    ['Yazdığım açı bir yere kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; yazdığınız değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kosinus-hesapla', 'tanjant-hesapla', 'ters-trigonometri-hesapla', 'derece-radyan-cevir', 'sinus-teoremi-hesapla', 'dik-ucgen-hesapla'],
};
