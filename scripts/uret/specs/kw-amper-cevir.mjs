export default {
  slug: 'kw-amper-cevir',
  title: 'kW Amper Çevirici',
  h1Tail: 'kW ↔ A',
  pageTitle: 'kW Amper Çevirici – Kilowattı Ampere, Amperi kW\'a Çevirme',
  description: 'Kilowattı ampere, amperi kilowatta çevirin. Tek faz, üç faz ve doğru akım için gerilim ile güç faktörünü hesaba katar; görünür gücü de kVA olarak verir.',
  card: 'kW değerini ampere ya da amperi kW\'a çevirin; tek faz 230 V, üç faz 400 V ve DC için ayrı formülle.',
  category: 'elektrik',
  keywords: ['kw amper çevirme', '1 kw kaç amper', 'kw kaç amper çeker', 'amper kw hesaplama', 'trifaze kw amper', '5 kw kaç amper', 'motor akımı hesaplama'],
  lead: 'Kilowatt cinsinden verilen bir gücün kaç amper akım çektiğini ya da belirli bir akımın kaç kilowatta karşılık geldiğini bulun. Araç tek faz, üç faz ve doğru akım için doğru formülü seçer; gerilimi boş bırakırsanız Türkiye şebeke değerlerini (230 V ve 400 V) kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kwa', 'kW → Amper'], ['akw', 'Amper → kW']] },
    { id: 'sistem', label: 'Devre türü', type: 'select', options: [['tek', 'Tek faz'], ['uc', 'Üç faz'], ['dc', 'Doğru akım (DC)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', placeholder: 'Boş = 230 / 400', hint: 'Boş bırakılırsa tek fazda 230 V, üç fazda 400 V alınır. Doğru akımda yazılması zorunludur.' },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '1', hint: '0 ile 1 arasında; motorlarda etiketteki değeri yazın. Doğru akımda kullanılmaz.' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const dc = v.sistem === 'dc';
    const uc = v.sistem === 'uc';
    let V;
    if (String(v.gerilim ?? '').trim() === '') {
      if (dc) h.err('Doğru akım için "Gerilim" alanını doldurun (örn. 12, 24 ya da 48).');
      V = uc ? 400 : 230;
    } else V = h.pos(v.gerilim, 'Gerilim');
    const pf = dc ? 1 : h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,85).');
    const k = uc ? Math.sqrt(3) : 1;
    let I, kw;
    if (v.yon === 'akw') { I = x; kw = k * V * I * pf / 1000; } else { kw = x; I = kw * 1000 / (k * V * pf); }
    const kva = k * V * I / 1000;
    const rows = v.yon === 'akw'
      ? [['Aktif güç', h.fmt(kw, 2) + ' kW'], ['Akım', h.fmt(I, 2) + ' A']]
      : [['Akım', h.fmt(I, 2) + ' A'], ['Aktif güç', h.fmt(kw, 2) + ' kW']];
    if (!dc) rows.push(['Görünür güç', h.fmt(kva, 2) + ' kVA']);
    rows.push(['Hesapta kullanılan gerilim', h.fmt(V, 2) + ' V']);
    return { rows, note: (uc ? 'Üç faz: I = P ÷ (√3 × V × cos φ); V fazlar arası gerilimdir.' : dc ? 'Doğru akım: I = P ÷ V.' : 'Tek faz: I = P ÷ (V × cos φ).') + ' Sonuç bilgilendirme amaçlıdır; sigorta ve kablo seçimi için yetkili elektrikçiye danışın.' };
  },
  cases: [
    { in: { deger: '5', yon: 'kwa', sistem: 'tek', gerilim: '230', cosfi: '1' }, out: { 'Akım': '21,74 A', 'Görünür güç': '5 kVA' } },
    { in: { deger: '15', yon: 'kwa', sistem: 'uc', gerilim: '400', cosfi: '0,85' }, out: { 'Akım': '25,47 A', 'Görünür güç': '17,65 kVA' } },
    { in: { deger: '32', yon: 'akw', sistem: 'tek', gerilim: '', cosfi: '1' }, out: { 'Aktif güç': '7,36 kW', 'Hesapta kullanılan gerilim': '230 V' } },
    { in: { deger: '63', yon: 'akw', sistem: 'uc', gerilim: '', cosfi: '0,9' }, out: { 'Aktif güç': '39,28 kW', 'Hesapta kullanılan gerilim': '400 V' } },
    { in: { deger: '1,2', yon: 'kwa', sistem: 'dc', gerilim: '24' }, out: { 'Akım': '50 A' } },
    { in: { deger: '2,3', yon: 'kwa', sistem: 'tek' }, out: { 'Akım': '10 A' } },
    { in: { deger: '1', yon: 'kwa', sistem: 'dc', gerilim: '' }, error: true },
    { in: { deger: '5', yon: 'kwa', sistem: 'tek', gerilim: '230', cosfi: '0' }, error: true },
    { in: { deger: '-3', yon: 'kwa', sistem: 'tek', gerilim: '230', cosfi: '1' }, error: true },
  ],
  howto: [
    '"Değer" alanına kilowatt ya da amper değerini yazın ve "Çeviri yönü" listesinden hangisinden hangisine çevireceğinizi seçin.',
    '"Devre türü" listesinden tek faz, üç faz ya da doğru akımı seçin. Ev tipi cihazlar tek faz, büyük motorlar ve sanayi makineleri üç fazdır.',
    'Gerilimi biliyorsanız yazın; boş bırakırsanız tek faz için 230 V, üç faz için 400 V kullanılır. Akü ve güneş paneli gibi doğru akım sistemlerinde gerilimi mutlaka girin.',
    'Motorlu yüklerde etiketteki cos φ değerini yazın, ısıtıcılarda 1 olarak bırakın.',
    '"Çevir" düğmesine basıp akımı, aktif gücü ve görünür gücü okuyun.',
  ],
  sections: [
    { h: 'Kilowattan ampere nasıl geçilir?', p: [
      'Kilowatt gücün, amper akımın birimidir; ikisini birbirine bağlayan büyüklük gerilimdir. Güç sabitken gerilim yükseldikçe gereken akım azalır. 5 kW gücündeki bir yük 230 voltta yaklaşık 21,74 amper çekerken, aynı güç üç fazlı 400 volt sistemde faz başına yaklaşık 7,22 amperle karşılanır. Büyük güçlü cihazların üç fazlı yapılmasının temel nedeni budur: daha ince kablo ve daha küçük sigortayla aynı güç taşınır.',
    ], ul: [
      '<strong>Tek faz:</strong> I = (kW × 1000) ÷ (V × cos φ)',
      '<strong>Üç faz:</strong> I = (kW × 1000) ÷ (√3 × V × cos φ)',
      '<strong>Doğru akım:</strong> I = (kW × 1000) ÷ V',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Tek faz ısıtıcı:</strong> 5 kW gücünde bir ani su ısıtıcısı 230 voltta 5.000 ÷ 230 = 21,74 amper çeker. Bu akım standart 16 amperlik priz hattının üzerindedir; cihaz kendi sigortası ve uygun kesitli kablosu olan ayrı bir hat ister.',
      '<strong>Üç fazlı motor:</strong> Şebekeden 15 kW çeken, güç faktörü 0,85 olan bir motorun hat akımı 15.000 ÷ (1,732 × 400 × 0,85) = 25,47 amperdir. Görünür güç 15 ÷ 0,85 = 17,65 kVA olur.',
      '<strong>Tersine hesap:</strong> 32 amperlik tek fazlı bir hat 230 voltta 32 × 230 = 7.360 watt, yani 7,36 kW taşır. Üç fazlı 63 amperlik bir ana şalter, güç faktörü 0,9 iken 1,732 × 400 × 63 × 0,9 = 39,28 kW aktif güce karşılık gelir.',
      '<strong>Doğru akım:</strong> 24 voltluk akü grubundan beslenen 1,2 kW\'lık bir invertör girişi 1.200 ÷ 24 = 50 amper çeker. Düşük gerilimli sistemlerde akımların ne kadar büyüdüğü ve kabloların neden kalın seçildiği buradan anlaşılır.',
    ] },
    { h: 'Hızlı başvuru: 1 kW kaç amper?', p: ['Güç faktörü 1 kabul edilerek yaklaşık değerler:'], ul: [
      '<strong>Tek faz 230 V:</strong> 1 kW yaklaşık 4,35 A',
      '<strong>Üç faz 400 V:</strong> 1 kW yaklaşık 1,44 A',
      '<strong>12 V doğru akım:</strong> 1 kW yaklaşık 83,33 A',
      '<strong>24 V doğru akım:</strong> 1 kW yaklaşık 41,67 A',
      '<strong>48 V doğru akım:</strong> 1 kW yaklaşık 20,83 A',
    ] },
    { h: 'Motor etiketindeki kW değeri hakkında', p: [
      'Elektrik motorlarının etiketinde yazan kW değeri genellikle motorun milinden alınan mekanik çıkış gücüdür. Motor bu gücü üretebilmek için şebekeden, verim kaybı kadar daha fazla elektrik gücü çeker. Örneğin mil gücü 11 kW ve verimi yüzde 90 olan bir motorun şebekeden çektiği güç 11 ÷ 0,9 = yaklaşık 12,22 kW\'tır. Akımı bu araçla hesaplarken "Değer" alanına mil gücünü değil, verime bölünmüş giriş gücünü yazarsanız etiket akımına daha yakın sonuç alırsınız.',
      'Ayrıca motorlar ilk kalkışta kısa bir süre nominal akımın birkaç katını çeker. Bu geçici akım burada hesaplanmaz; koruma elemanları seçilirken ayrıca değerlendirilir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'Üç fazlı hesapta 400 volt yerine 230 volt yazmak, sonucu yaklaşık 1,73 kat büyütür. √3 çarpanı fazlar arası gerilimle birlikte kullanılır. Bir başka hata, güç faktörünü 1 bırakarak motor akımını olduğundan düşük hesaplamaktır; cos φ küçüldükçe aynı kW için çekilen akım artar.',
      'Kilowatt ile kilowatt-saat de sık karıştırılır. kW anlık gücü, kWh ise bu gücün belirli bir süre kullanılmasıyla tüketilen enerjiyi gösterir; faturadaki tüketim kWh\'tir ve ampere doğrudan çevrilmez.',
    ] },
    { h: 'Güvenlik ve sınırlar', p: [
      'Hesap dengeli yük ve sinüs biçimli gerilim varsayar; şebeke gerilimindeki dalgalanma, harmonikler ve dengesiz fazlar gerçek akımı değiştirir. Bulduğunuz akım, kablo ya da sigorta değeri olarak doğrudan kullanılmamalıdır: kesit seçimi hat uzunluğuna, döşeme biçimine, ortam sıcaklığına ve yönetmeliklere bağlıdır. Tesisat işlerini yetkili bir elektrikçiye yaptırın.',
    ] },
  ],
  faq: [
    ['1 kW kaç amper eder?', 'Tek faz 230 voltta ve güç faktörü 1 iken yaklaşık 4,35 amper, üç faz 400 voltta yaklaşık 1,44 amper eder. Güç faktörü düşükse akım aynı oranda artar.'],
    ['5 kW kaç amper çeker?', 'Tek faz 230 voltta 5.000 ÷ 230 = 21,74 amper çeker. Üç faz 400 voltta ve güç faktörü 1 iken faz başına yaklaşık 7,22 amperdir.'],
    ['Gerilimi boş bırakırsam ne olur?', 'Tek faz seçiliyken 230 volt, üç faz seçiliyken 400 volt kullanılır ve sonuç tablosunda hangi gerilimin alındığı gösterilir. Doğru akımda standart bir değer olmadığı için gerilim yazmanız istenir.'],
    ['Üç fazda bulunan akım toplam akım mı?', 'Hayır, her bir faz iletkeninden geçen hat akımıdır. Dengeli bir yükte üç fazın akımı birbirine eşittir ve şalter ile kablo bu değere göre değerlendirilir.'],
    ['Güç faktörü akımı nasıl etkiler?', 'Aktif güç sabitken güç faktörü düştükçe akım artar. 10 kW\'lık tek fazlı bir yük cos φ = 1 iken 43,48 amper, cos φ = 0,8 iken 54,35 amper çeker.'],
    ['kW ile kWh aynı şey mi?', 'Hayır. kW güç birimidir, kWh enerji birimidir. 2 kW\'lık bir cihaz 3 saat çalışırsa 6 kWh enerji tüketir. Bu araç anlık güç ile akım arasındaki ilişkiyi hesaplar.'],
    ['Bulduğum akıma göre sigorta seçebilir miyim?', 'Sonuç yalnızca yükün çektiği akımı gösterir. Sigorta ve kablo seçimi için kalkış akımı, hat uzunluğu ve yönetmelik koşulları da gerekir; bu seçimi yetkili bir elektrikçi yapmalıdır.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır, girdiğiniz değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['amper-watt-cevir', 'kva-kw-cevir', 'uc-faz-guc-hesapla', 'kablo-kesiti-hesapla', 'motor-guc-tork-hesapla', 'guc-faktoru-hesapla'],
};
