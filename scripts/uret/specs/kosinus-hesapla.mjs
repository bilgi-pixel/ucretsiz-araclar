export default {
  slug: 'kosinus-hesapla',
  title: 'Kosinüs Hesaplama',
  h1Tail: 'cos(x) değeri',
  pageTitle: 'Kosinüs Hesaplama – Derece ve Radyan İçin cos(x) Değeri',
  description: 'Bir açının kosinüsünü derece, radyan ya da grad olarak hesaplayın. Özel açılarda köklü tam değeri, sekantı, esas ölçüyü ve açının bölgesini birlikte görün.',
  card: 'Açının kosinüsünü derece, radyan ya da grad cinsinden hesaplayın; köklü tam değer, sekant ve bölge bilgisiyle.',
  category: 'matematik',
  keywords: ['kosinüs hesaplama', 'cos hesaplama', 'cos 60 kaç', 'kosinüs değerleri', 'kosinüs tablosu', 'sekant hesaplama', 'cos x hesapla', 'radyan kosinüs'],
  lead: 'Açıyı ve birimini girin; araç <strong>cos(x)</strong> değerini on ondalık basamağa kadar verir. Özel açılarda köklü tam değeri, ayrıca sekantı, esas ölçüyü ve kosinüsün o bölgedeki işaretini de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'aci', label: 'Açı', type: 'number', placeholder: 'Örn. 60' },
    { id: 'birim', label: 'Açı birimi', type: 'select', options: [['derece', 'Derece (°)'], ['radyan', 'Radyan'], ['pi', 'π\'nin katı (değer × π radyan)'], ['grad', 'Grad']], hint: '"π\'nin katı" seçiliyken 2 yazmak 2π radyan, yani tam tur demektir.' },
  ],
  compute(v, h) {
    const x = h.num(v.aci, 'Açı');
    const kat = { derece: 1, radyan: 180 / Math.PI, pi: 180, grad: 0.9 }[v.birim] || 1;
    let deg = x * kat;
    if (Math.abs(deg) > 1e12) h.err('Açı çok büyük; daha küçük bir değer yazın.');
    if (Math.abs(deg - Math.round(deg)) < 1e-9) deg = Math.round(deg);
    const d = ((deg % 360) + 360) % 360;
    let c = Math.cos(d * Math.PI / 180);
    if (d === 90 || d === 270) c = 0; else if (d === 0) c = 1; else if (d === 180) c = -1;
    const m = d % 180, ref = m > 90 ? 180 - m : m;
    const tablo = { 0: '1', 15: '(√6 + √2)/4', 30: '√3/2', 45: '√2/2', 60: '1/2', 75: '(√6 - √2)/4', 90: '0' };
    let tam = tablo[ref];
    if (tam !== undefined && d > 90 && d < 270) tam = '-' + tam;
    let bolge;
    if (d % 90 === 0) bolge = 'Eksen üzerinde (bölge sınırı)';
    else bolge = ['I. bölge (kosinüs pozitif)', 'II. bölge (kosinüs negatif)', 'III. bölge (kosinüs negatif)', 'IV. bölge (kosinüs pozitif)'][Math.floor(d / 90)];
    const rows = [['Kosinüs', h.fmt(c, 10)]];
    if (tam !== undefined) rows.push(['Tam değer', tam]);
    rows.push(
      ['Sekant (1 / cos)', c === 0 ? 'tanımsız' : h.fmt(1 / c, 10)],
      ['Açı (derece)', h.fmt(deg, 6) + '°'],
      ['Açı (radyan)', h.fmt(deg * Math.PI / 180, 6) + ' rad'],
      ['Esas ölçü', h.fmt(d, 6) + '°'],
      ['Bölge', bolge],
    );
    return { rows, note: 'Kosinüs değeri her zaman -1 ile 1 arasındadır. Sonuç en fazla on ondalık basamağa yuvarlanır.' };
  },
  cases: [
    { in: { aci: '60', birim: 'derece' }, out: { 'Kosinüs': '0,5', 'Tam değer': '1/2', 'Sekant (1 / cos)': '2', 'Bölge': 'I. bölge (kosinüs pozitif)' } },
    { in: { aci: '1', birim: 'pi' }, out: { 'Kosinüs': '-1', 'Açı (derece)': '180°', 'Açı (radyan)': '3,141593 rad' } },
    { in: { aci: '0', birim: 'derece' }, out: { 'Kosinüs': '1', 'Tam değer': '1' } },
    { in: { aci: '90', birim: 'derece' }, out: { 'Kosinüs': '0', 'Sekant (1 / cos)': 'tanımsız' } },
    { in: { aci: '45', birim: 'derece' }, out: { 'Kosinüs': '0,7071067812', 'Tam değer': '√2/2' } },
    { in: { aci: '120', birim: 'derece' }, out: { 'Kosinüs': '-0,5', 'Tam değer': '-1/2', 'Bölge': 'II. bölge (kosinüs negatif)' } },
    { in: { aci: '1', birim: 'radyan' }, out: { 'Kosinüs': '0,5403023059' } },
    { in: { aci: '-30', birim: 'derece' }, out: { 'Kosinüs': '0,8660254038', 'Tam değer': '√3/2', 'Esas ölçü': '330°' } },
    { in: { aci: '200', birim: 'grad' }, out: { 'Kosinüs': '-1' } },
    { in: { aci: '420', birim: 'derece' }, out: { 'Kosinüs': '0,5', 'Esas ölçü': '60°' } },
    { in: { aci: 'otuz', birim: 'derece' }, error: true },
    { in: { aci: '', birim: 'derece' }, error: true },
  ],
  howto: [
    '"Açı" alanına kosinüsünü öğrenmek istediğiniz açıyı girin; eksi işaretli ve bir turdan büyük açılar da geçerlidir.',
    'Açının hangi birimde olduğunu listeden seçin. Fizik ve analiz sorularında açılar çoğunlukla radyan, geometri sorularında derece olarak verilir.',
    '"Hesapla" düğmesine basın; cos(x) değeri ilk satırda, özel açılarda köklü karşılığı "Tam değer" satırında belirir.',
    'Sekant değerini, açının öbür birimdeki karşılığını ve bölgesini alt satırlardan okuyun; gerekirse "Sonucu kopyala" ile ödevinize aktarın.',
  ],
  sections: [
    { h: 'Kosinüs nedir?', p: [
      'Kosinüs, bir dik üçgende dar açının <strong>komşu dik kenarının hipotenüse oranıdır</strong>: cos A = komşu kenar ÷ hipotenüs. Adındaki "ko" öneki tümler açıdan gelir; bir açının kosinüsü, onu 90°\'ye tamamlayan açının sinüsüne eşittir. Yani cos 60° ile sin 30° aynı sayıdır.',
      'Birim çember tanımında ise x açısı kadar dönüldüğünde varılan noktanın <strong>x koordinatı</strong> cos(x) değeridir. Açı 0° iken nokta (1, 0) üzerindedir ve kosinüs en büyük değeri olan 1\'i alır; açı büyüdükçe nokta sola kayar, 90°\'de kosinüs sıfıra, 180°\'de −1\'e iner.',
    ] },
    { h: 'Adım adım çözümlü örnekler', p: [
      '<strong>cos 60°:</strong> Bir eşkenar üçgeni yüksekliğiyle ikiye böldüğünüzde 30-60-90 üçgeni oluşur. Hipotenüs 2 birimse 60°\'nin komşu kenarı 1 birimdir; oran 1/2 = 0,5 çıkar. Araç "Kosinüs: 0,5", "Tam değer: 1/2" ve "Sekant: 2" yazar.',
      '<strong>cos 120°:</strong> Açı II. bölgededir, referans açısı 180 − 120 = 60°\'dir. II. bölgede x koordinatı negatif olduğu için sonuç −cos 60° = −0,5 olur.',
      '<strong>cos(−30°):</strong> Kosinüs çift fonksiyondur, yani cos(−x) = cos x. Bu yüzden sonuç cos 30° = √3/2 ≈ 0,8660254038 değerine eşittir; araç esas ölçüyü 330° olarak gösterir.',
      '<strong>cos π:</strong> Birimi "π\'nin katı" seçip 1 yazdığınızda açı 180° olur ve kosinüs −1 bulunur. Radyan seçip 1 yazarsanız bu kez 1 radyanın, yani yaklaşık 57,3°\'nin kosinüsü olan 0,5403023059 çıkar.',
    ] },
    { h: 'Özel açıların kosinüs değerleri', ul: [
      '<strong>cos 0°</strong> = 1',
      '<strong>cos 15°</strong> = (√6 + √2)/4 ≈ 0,9659',
      '<strong>cos 30°</strong> = √3/2 ≈ 0,8660',
      '<strong>cos 45°</strong> = √2/2 ≈ 0,7071',
      '<strong>cos 60°</strong> = 1/2 = 0,5',
      '<strong>cos 75°</strong> = (√6 − √2)/4 ≈ 0,2588',
      '<strong>cos 90°</strong> = 0',
      '<strong>cos 180°</strong> = −1',
      '<strong>cos 270°</strong> = 0',
      '<strong>cos 360°</strong> = 1',
    ] },
    { h: 'İşaret kuralı ve kullanışlı özdeşlikler', p: [
      'Kosinüs, y ekseninin sağında kalan I. ve IV. bölgede pozitif; solunda kalan II. ve III. bölgede negatiftir. Sinüsle karşılaştırıldığında fark şuradadır: sinüs üst yarıda, kosinüs sağ yarıda pozitiftir.',
      'İndirgeme yaparken şu eşitlikler işinizi görür: cos(−x) = cos x, cos(180° − x) = −cos x, cos(180° + x) = −cos x, cos(360° − x) = cos x ve cos(90° − x) = sin x. Sinüsle arasındaki temel bağ sin²x + cos²x = 1 eşitliğidir; birini biliyorsanız diğerinin mutlak değerini buradan bulabilirsiniz. Yarım açı ve iki kat açı sorularında cos 2x = cos²x − sin²x = 2cos²x − 1 biçimi sıkça kullanılır.',
    ] },
    { h: 'Kosinüsün kullanıldığı yerler', p: [
      'Fizikte bir kuvvetin yaptığı iş W = F·d·cos θ ile hesaplanır; kuvvet hareket doğrultusuna dikse cos 90° = 0 olduğundan iş yapılmaz. Bir vektörün yatay bileşeni büyüklük × cos θ ile bulunur. İki vektör arasındaki açı da skaler çarpım üzerinden kosinüsle elde edilir.',
      'Elektrikte alternatif akım devrelerinin <strong>güç faktörü</strong> cos φ olarak adlandırılır ve gerilim ile akım arasındaki faz açısının kosinüsüdür. Geometride kosinüs teoremi, iki kenarı ve aralarındaki açısı bilinen üçgenin üçüncü kenarını verir. Bir rampanın yatay izdüşümü rampa boyu × cos(eğim açısı) kadardır: 5 metrelik bir rampa 30° eğimliyse yatayda 5 × 0,8660 ≈ 4,33 metre yer kaplar.',
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      'Hesap makinesi ya da bu araç derece modundayken radyan değeri yazmak en sık rastlanan hatadır. İkinci yaygın hata, geniş açılarda eksi işaretini unutmaktır; sonucun işaretinden emin olmak için "Bölge" satırına bakın. Ayrıca cos(a + b) ifadesi cos a + cos b değildir; doğrusu cos a·cos b − sin a·sin b\'dir.',
      'Araç değeri on ondalık basamağa yuvarlar; köklü tam değer yalnızca 15°\'nin katlarında yazılır. Sekant, kosinüsün sıfır olduğu 90°, 270° ve bunların tam turlu eşlerinde tanımsızdır. Radyan girişinde π\'yi elle yazarken oluşan küçük yuvarlama farkları sonucun son basamaklarına yansıyabilir.',
    ] },
  ],
  faq: [
    ['Cos 60 kaçtır?', 'cos 60° = 1/2, yani 0,5\'tir. Bu değer sin 30° ile aynıdır, çünkü 60° ile 30° tümler açılardır.'],
    ['Cos 90 neden sıfırdır?', 'Birim çemberde 90° dönüldüğünde (0, 1) noktasına varılır. Kosinüs bu noktanın x koordinatı olduğu için cos 90° = 0 olur.'],
    ['Cos 0 kaçtır?', 'cos 0° = 1\'dir. Açı sıfırken birim çember üzerindeki nokta (1, 0) noktasıdır ve kosinüs burada en büyük değerini alır.'],
    ['Kosinüs hangi bölgelerde negatiftir?', 'Esas ölçüsü 90° ile 270° arasında olan açılarda, yani II. ve III. bölgede kosinüs negatiftir. Örneğin cos 120° = −0,5 ve cos 180° = −1\'dir.'],
    ['Sekant nedir, nasıl bulunur?', 'Sekant, kosinüsün çarpmaya göre tersidir: sec x = 1 / cos x. Dik üçgende hipotenüsün komşu kenara oranıdır. cos 60° = 0,5 olduğundan sec 60° = 2\'dir.'],
    ['Sinüs ile kosinüs arasındaki fark nedir?', 'Dik üçgende sinüs karşı kenarı, kosinüs komşu kenarı hipotenüse oranlar. Birim çemberde sinüs y, kosinüs x koordinatıdır. İkisinin grafiği aynı dalga biçimindedir; kosinüs grafiği sinüsün 90° sola kaydırılmış hâlidir.'],
    ['Kosinüs değerinden açıya nasıl dönülür?', 'Ters kosinüs (arccos) kullanılır ve sonuç 0° ile 180° arasında verilir. Kosinüsü 0,5 olan temel açı 60°\'dir; 0°–360° aralığında 300° de aynı kosinüse sahiptir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; açı değeri hiçbir sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['sinus-hesapla', 'tanjant-hesapla', 'ters-trigonometri-hesapla', 'kosinus-teoremi-hesapla', 'derece-radyan-cevir', 'vektor-hesapla'],
};
