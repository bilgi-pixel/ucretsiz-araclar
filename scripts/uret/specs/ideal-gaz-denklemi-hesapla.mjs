export default {
  slug: 'ideal-gaz-denklemi-hesapla',
  title: 'İdeal Gaz Denklemi Hesaplama',
  h1Tail: 'PV = nRT',
  pageTitle: 'İdeal Gaz Denklemi Hesaplama – PV = nRT ile Basınç, Hacim, Mol',
  description: 'PV = nRT denklemiyle basınç, hacim, mol sayısı ya da sıcaklıktan bilinmeyeni bulun. atm, kPa, bar, mmHg ve °C, K birimleriyle çalışır.',
  card: 'PV = nRT ile bir gazın basıncını, hacmini, mol sayısını ya da sıcaklığını üç bilinen değerden hesaplayın.',
  category: 'bilim',
  keywords: ['ideal gaz denklemi hesaplama', 'pv=nrt hesaplama', 'gaz basıncı hesaplama', 'gaz hacmi hesaplama', 'mol sayısı bulma gaz', 'ideal gaz sabiti', 'normal koşullarda hacim', 'gaz yasaları'],
  lead: 'İdeal gaz denklemi <strong>P · V = n · R · T</strong> bir gazın basıncını, hacmini, mol sayısını ve mutlak sıcaklığını birbirine bağlar. Üçünü yazın, dördüncüsünü araç bulsun; birim dönüşümlerini de kendisi yapar.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['P', 'Basınç (P)'], ['V', 'Hacim (V)'], ['n', 'Mol sayısı (n)'], ['T', 'Sıcaklık (T)']] },
    { id: 'basinc', label: 'Basınç', type: 'number', placeholder: 'Örn. 1', hint: 'Bulunacak büyüklük basınçsa boş bırakın.' },
    { id: 'pBirim', label: 'Basınç birimi', type: 'select', options: [['atm', 'atm'], ['kPa', 'kPa'], ['bar', 'bar'], ['mmHg', 'mmHg']] },
    { id: 'hacim', label: 'Hacim (litre)', type: 'number', placeholder: 'Örn. 22,4', hint: 'Bulunacak büyüklük hacimse boş bırakın.' },
    { id: 'mol', label: 'Mol sayısı (mol)', type: 'number', placeholder: 'Örn. 1', hint: 'Bulunacak büyüklük mol ise boş bırakın.' },
    { id: 'sicaklik', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 25', hint: 'Bulunacak büyüklük sıcaklıksa boş bırakın.' },
    { id: 'tBirim', label: 'Sıcaklık birimi', type: 'select', options: [['C', '°C'], ['K', 'K']] },
  ],
  compute(v, h) {
    const R = 8.314462618; // J/(mol·K)
    const pa = { atm: 101325, kPa: 1000, bar: 100000, mmHg: 101325 / 760 };
    const pb = pa[v.pBirim] ? v.pBirim : 'atm';
    const bul = ['P', 'V', 'n', 'T'].includes(v.bul) ? v.bul : 'P';
    let P, V, n, T;
    if (bul !== 'P') P = h.pos(v.basinc, 'Basınç') * pa[pb];
    if (bul !== 'V') V = h.pos(v.hacim, 'Hacim') / 1000;
    if (bul !== 'n') n = h.pos(v.mol, 'Mol sayısı');
    if (bul !== 'T') {
      const t = h.num(v.sicaklik, 'Sıcaklık');
      T = v.tBirim === 'K' ? t : t + 273.15;
      if (!(T > 0)) h.err('Sıcaklık mutlak sıfırdan (0 K, −273,15 °C) büyük olmalı.');
    }
    if (bul === 'P') P = n * R * T / V;
    else if (bul === 'V') V = n * R * T / P;
    else if (bul === 'n') n = P * V / (R * T);
    else T = P * V / (n * R);
    const satir = {
      P: ['Basınç', h.sig(P / pa[pb], 6) + ' ' + pb],
      V: ['Hacim', h.sig(V * 1000, 6) + ' L'],
      n: ['Mol sayısı', h.sig(n, 6) + ' mol'],
      T: ['Sıcaklık', h.sig(T, 6) + ' K'],
    };
    const rows = [satir[bul]];
    for (const k of ['P', 'V', 'n', 'T']) if (k !== bul) rows.push(satir[k]);
    rows.push(['Sıcaklık (°C)', h.fmt(T - 273.15, 2) + ' °C']);
    rows.push(['Basınç (kPa)', h.sig(P / 1000, 6) + ' kPa']);
    rows.push(['Basınç (atm)', h.sig(P / 101325, 6) + ' atm']);
    rows.push(['Hacim (m³)', h.sig(V, 6) + ' m³']);
    rows.push(['Tanecik sayısı', h.sig(n * 6.02214076e23, 4)]);
    return { rows, note: 'R = 8,314462618 J/(mol·K) = 0,082057 L·atm/(mol·K) alınmıştır. Gaz ideal kabul edilir.' };
  },
  cases: [
    { in: { bul: 'V', basinc: '1', pBirim: 'atm', mol: '1', sicaklik: '0', tBirim: 'C' }, out: { 'Hacim': '22,414 L', 'Sıcaklık': '273,15 K', 'Basınç (kPa)': '101,325 kPa' } },
    { in: { bul: 'P', pBirim: 'kPa', hacim: '10', mol: '2', sicaklik: '300', tBirim: 'K' }, out: { 'Basınç': '498,868 kPa', 'Basınç (atm)': '4,92344 atm', 'Sıcaklık (°C)': '26,85 °C' } },
    { in: { bul: 'n', basinc: '1', pBirim: 'atm', hacim: '24,5', sicaklik: '25', tBirim: 'C' }, out: { 'Mol sayısı': '1,00141 mol' } },
    { in: { bul: 'T', basinc: '200', pBirim: 'kPa', hacim: '5', mol: '0,5' }, out: { 'Sıcaklık': '240,545 K', 'Sıcaklık (°C)': '-32,61 °C' } },
    { in: { bul: 'V', basinc: '2,5', pBirim: 'bar', mol: '3', sicaklik: '350', tBirim: 'K' }, out: { 'Hacim': '34,9207 L' } },
    { in: { bul: 'P', pBirim: 'mmHg', hacim: '6', mol: '0,25', sicaklik: '37', tBirim: 'C' }, out: { 'Basınç': '805,92 mmHg' } },
    { in: { bul: 'V', basinc: '1', pBirim: 'atm', mol: '1', sicaklik: '-300', tBirim: 'C' }, error: true },
    { in: { bul: 'P', pBirim: 'atm', hacim: '', mol: '1', sicaklik: '25', tBirim: 'C' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden hesaplamak istediğiniz değişkeni seçin: basınç, hacim, mol sayısı ya da sıcaklık.',
    'Diğer üç değeri ilgili alanlara yazın. Bulunacak büyüklüğün alanını boş bırakabilirsiniz; dolu olsa da dikkate alınmaz.',
    'Basınç birimini (atm, kPa, bar, mmHg) ve sıcaklık birimini (°C ya da K) seçin. Hacim her zaman litre olarak girilir.',
    '"Hesapla" düğmesine basın. İlk satır aradığınız değerdir; altında dört değişkenin tamamı ve basıncın, hacmin başka birimlerdeki karşılıkları yer alır.',
  ],
  sections: [
    { h: 'İdeal gaz denklemi ne söyler?', p: [
      'On yedinci ve on sekizinci yüzyılda gazlar üzerine yapılan deneyler üç ayrı yasayla özetlenmişti: sabit sıcaklıkta basınç ile hacim ters orantılıdır (Boyle), sabit basınçta hacim mutlak sıcaklıkla doğru orantılıdır (Charles), aynı koşullarda eşit hacimdeki gazlar eşit sayıda tanecik içerir (Avogadro). Bu üç sonuç tek bir bağıntıda birleşir: <strong>P · V = n · R · T</strong>.',
      'Denklemde P basınç, V hacim, n gazın mol sayısı, T mutlak sıcaklık (kelvin), R ise evrensel gaz sabitidir. Gazın cinsi denklemde yer almaz; ideal davranan bir mol helyum da bir mol azot da aynı koşullarda aynı hacmi kaplar. Bu yüzden denklem kimya ve fizik derslerinin en çok kullanılan araçlarından biridir.',
    ] },
    { h: 'Gaz sabiti R ve birimler', p: [
      'R\'nin sayısal değeri kullandığınız birimlere bağlıdır. SI birimlerinde (pascal, metreküp, kelvin) <strong>R = 8,314 J/(mol·K)</strong>; kimya derslerinde alışılan litre ve atmosfer birimleriyle <strong>R = 0,082 L·atm/(mol·K)</strong> olur. Sınav sorularında kimi zaman 22,4/273 kesri de aynı sabit olarak verilir. Araç tüm girdileri önce SI birimlerine çevirir, hesabı tek bir R değeriyle yapar ve sonucu seçtiğiniz birime döndürür; bu sayede birim uyuşmazlığından doğan hatalar ortadan kalkar.',
      'En sık yapılan hata sıcaklığı santigrat derece olarak denkleme koymaktır. Denklem yalnızca kelvin ile çalışır: <strong>T(K) = t(°C) + 273,15</strong>. Sıcaklık birimini °C seçtiğinizde bu dönüşümü araç yapar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Normal koşullarda molar hacim:</strong> 1 mol gaz 0 °C ve 1 atm basınçta ne kadar hacim kaplar? V = nRT / P = 1 × 0,082057 × 273,15 / 1 = 22,414 L. Ders kitaplarındaki "normal koşullarda 1 mol gaz 22,4 litredir" bilgisi buradan gelir.',
      '<strong>Örnek 2 – Kapalı kapta basınç:</strong> 10 litrelik bir tüpte 300 K sıcaklıkta 2 mol gaz bulunuyor. P = nRT / V = 2 × 8,314 × 300 / 0,010 m³ = 498 868 Pa, yani yaklaşık 498,87 kPa ya da 4,92 atm.',
      '<strong>Örnek 3 – Mol sayısı:</strong> 25 °C ve 1 atm\'de 24,5 litre hacim kaplayan gaz kaç moldür? n = PV / RT = 1 × 24,5 / (0,082057 × 298,15) = 1,0014 mol. Oda koşullarında bir mol gazın yaklaşık 24,5 litre kapladığı böylece doğrulanır.',
      '<strong>Örnek 4 – Sıcaklık:</strong> 0,5 mol gaz 5 litrelik kapta 200 kPa basınç yapıyorsa T = PV / nR = 200 000 × 0,005 / (0,5 × 8,314) = 240,5 K, yani yaklaşık −32,6 °C\'dir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>Normal koşullar (0 °C, 1 atm):</strong> 1 mol ideal gaz 22,414 L',
      '<strong>Oda koşulları (25 °C, 1 atm):</strong> 1 mol ideal gaz yaklaşık 24,47 L',
      '<strong>1 atm</strong> = 101,325 kPa = 1,01325 bar = 760 mmHg',
      '<strong>1 bar</strong> = 100 kPa',
      '<strong>0 °C</strong> = 273,15 K; <strong>25 °C</strong> = 298,15 K',
      '<strong>1 mol</strong> = 6,022 × 10²³ tanecik',
    ] },
    { h: 'Gerçek gazlar ne zaman idealden sapar?', p: [
      'İdeal gaz modeli iki varsayıma dayanır: gaz taneciklerinin kendi hacmi kabın hacmi yanında ihmal edilebilir ve tanecikler çarpışma anı dışında birbirini çekmez ya da itmez. Düşük basınç ve yüksek sıcaklıkta bu varsayımlar iyi tutar; oda koşullarındaki hava, azot, oksijen, helyum için hata genellikle yüzde birin altındadır.',
      'Basınç yükseldikçe tanecikler birbirine yaklaşır, sıcaklık düştükçe aralarındaki çekim önem kazanır ve gaz sıvılaşmaya yaklaşır. Dolu bir LPG ya da karbondioksit tüpünün içi, soğutucu akışkanlar, yüksek basınçlı doğal gaz hatları gibi durumlarda ideal gaz denklemi belirgin biçimde yanılır; bu durumlarda van der Waals gibi gerçek gaz denklemleri ya da sıkıştırılabilirlik çarpanı kullanılır. Bu araç yalnızca ideal davranışı hesaplar.',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Lise ve üniversite kimya sorularında tepkimede açığa çıkan gazın hacmini bulmak, bir tüpteki gaz miktarını tahmin etmek, lastik basıncının sıcaklıkla nasıl değişeceğini görmek, balon ve dalış hesaplarında fikir edinmek başlıca kullanım alanlarıdır. Örneğin soğuk bir sabah ölçülen lastik basıncının yolculuk sonrası ısınan lastikte daha yüksek çıkması, hacim yaklaşık sabitken basıncın mutlak sıcaklıkla orantılı artmasının sonucudur.',
      'Sonuçlar eğitim amaçlıdır. Basınçlı kap, tüp dolumu ya da proses tasarımı gibi güvenlikle ilgili işlerde ilgili standartlar ve yetkili mühendis hesabı esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['PV = nRT formülünde R kaçtır?', 'SI birimlerinde 8,314 J/(mol·K), litre ve atmosfer kullanıldığında 0,082 L·atm/(mol·K) alınır. İkisi aynı sabitin farklı birimlerdeki yazımıdır; önemli olan basınç ve hacim birimleriyle uyumlu olanı seçmektir.'],
    ['Sıcaklığı neden Kelvin\'e çevirmek gerekiyor?', 'Denklemdeki orantılar mutlak sıcaklık için geçerlidir. 0 °C sıfır sıcaklık demek değildir; gaz tanecikleri hâlâ hareket eder. Santigrat değere 273,15 ekleyerek kelvin elde edilir. Sıcaklık birimini °C seçerseniz araç bu dönüşümü kendisi yapar.'],
    ['Normal koşullarda 1 mol gaz kaç litredir?', '0 °C ve 1 atm basınçta 22,414 litre, yuvarlak hesapla 22,4 litredir. 25 °C ve 1 atm için bu değer yaklaşık 24,5 litreye çıkar.'],
    ['Hacmi mililitre ya da metreküp olarak nasıl girerim?', 'Hacim alanı litre bekler. Mililitreyi 1000\'e bölerek, metreküpü 1000 ile çarparak litreye çevirin: 500 mL = 0,5 L, 2 m³ = 2000 L. Sonuçta hacmin metreküp karşılığı ayrıca gösterilir.'],
    ['Gazın kütlesinden mol sayısını nasıl bulurum?', 'Mol sayısı, kütlenin mol kütlesine bölümüdür: n = m / M. Örneğin 64 gram oksijen gazı (O₂, 32 g/mol) 2 moldür. Bu değeri mol alanına yazarak hesabı sürdürebilirsiniz.'],
    ['Gaz karışımlarında denklem geçerli mi?', 'Evet. İdeal davranan karışımlarda n olarak toplam mol sayısı alınır ve bulunan basınç toplam basınçtır. Her bileşenin kısmi basıncı, kendi mol kesri ile toplam basıncın çarpımına eşittir.'],
    ['Sonuç gerçek tüp basıncıyla neden uyuşmayabilir?', 'Yüksek basınçta ya da sıvılaşma noktasına yakın sıcaklıklarda gazlar idealden sapar. Ayrıca manometreler çoğunlukla atmosfer basıncına göre fark basıncını (gösterge basıncı) ölçer; denklemde ise mutlak basınç kullanılır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; girdiğiniz sayılar sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['birlesik-gaz-yasasi-hesapla', 'gaz-yogunlugu-hesapla', 'mol-hesapla', 'basinc-hesapla', 'tanecik-sayisi-hesapla'],
};
