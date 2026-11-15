export default {
  slug: 'amper-miliamper-cevir',
  title: 'Amper Miliamper Çevirici',
  h1Tail: 'A ↔ mA',
  pageTitle: 'Amper Miliamper Çevirici – A, mA, µA ve kA Hesaplama',
  description: 'Amperi miliampere, miliamperi ampere çevirin. 1 A = 1.000 mA eşitliğiyle çalışır; mikroamper ve kiloamper karşılığını, gerilim yazarsanız watt cinsinden gücü de verir.',
  card: 'Amper, miliamper, mikroamper ve kiloamper arasında çeviri yapın; şarj cihazı ve devre değerlerini kolayca karşılaştırın.',
  category: 'birim',
  keywords: ['amper miliamper çevirme', '1 amper kaç miliamper', 'mA kaç amper', 'miliamper amper', 'mikroamper miliamper', '2000 mA kaç amper', 'akım birimleri', 'mA A dönüşümü'],
  lead: 'Şarj cihazının üzerindeki 2 A değerini miliampere, devre şemasındaki 20 mA değerini ampere çevirin. Kural basittir: <strong>1 amper = 1.000 miliamper</strong>. Araç aynı akımın mikroamper ve kiloamper karşılığını gösterir; gerilimi de yazarsanız çekilen gücü watt olarak hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Akım değeri', type: 'number', placeholder: 'Örn. 2,5' },
    { id: 'birim', label: 'Akımın birimi', type: 'select', options: [['a', 'Amper (A)'], ['ma', 'Miliamper (mA)'], ['ua', 'Mikroamper (µA)'], ['ka', 'Kiloamper (kA)']] },
    { id: 'volt', label: 'Gerilim (volt, isteğe bağlı)', type: 'number', placeholder: 'Örn. 5', hint: 'Boş bırakılabilir. Yazarsanız güç (watt) hesaplanır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Akım değeri');
    const kat = { a: 1, ma: 1e-3, ua: 1e-6, ka: 1e3 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const a = x * k;
    const s = {
      a: ['Amper', h.sig(a, 9) + ' A'],
      ma: ['Miliamper', h.sig(a * 1e3, 9) + ' mA'],
      ua: ['Mikroamper', h.sig(a * 1e6, 9) + ' µA'],
      ka: ['Kiloamper', h.sig(a / 1e3, 9) + ' kA'],
    };
    const sira = v.birim === 'a' ? ['ma', 'ua', 'ka'] : ['a', 'ma', 'ua', 'ka'];
    const rows = sira.filter((b) => b !== v.birim).map((b) => s[b]);
    const volt = h.opt(v.volt, null, 'Gerilim');
    if (volt !== null) {
      if (volt < 0) h.err('"Gerilim" negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
      rows.push(['Güç', h.sig(a * volt, 6) + ' W']);
    }
    return {
      rows,
      note: volt !== null
        ? 'Güç, P = V × I bağıntısıyla hesaplandı; doğru akım ya da güç katsayısı 1 olan yükler için geçerlidir.'
        : '1 A = 1.000 mA = 1.000.000 µA; 1 kA = 1.000 A.',
    };
  },
  cases: [
    { in: { deger: '2,5', birim: 'a' }, out: { 'Miliamper': '2.500 mA', 'Mikroamper': '2.500.000 µA', 'Kiloamper': '0,0025 kA' } },
    { in: { deger: '500', birim: 'ma', volt: '5' }, out: { 'Amper': '0,5 A', 'Mikroamper': '500.000 µA', 'Güç': '2,5 W' } },
    { in: { deger: '20', birim: 'ma' }, out: { 'Amper': '0,02 A', 'Mikroamper': '20.000 µA' } },
    { in: { deger: '1', birim: 'ka' }, out: { 'Amper': '1.000 A', 'Miliamper': '1.000.000 mA' } },
    { in: { deger: '150', birim: 'ua' }, out: { 'Amper': '0,00015 A', 'Miliamper': '0,15 mA' } },
    { in: { deger: '16', birim: 'a', volt: '230' }, out: { 'Miliamper': '16.000 mA', 'Güç': '3.680 W' } },
    { in: { deger: '0', birim: 'a' }, out: { 'Miliamper': '0 mA' } },
    { in: { deger: 'iki', birim: 'a' }, error: true },
    { in: { deger: '2', birim: 'a', volt: '-5' }, error: true },
    { in: { deger: '-3', birim: 'ma' }, error: true },
  ],
  howto: [
    '"Akım değeri" alanına sayıyı yazın; ondalık için virgül kullanabilirsiniz.',
    '"Akımın birimi" listesinden değerin amper, miliamper, mikroamper ya da kiloamper olduğunu seçin.',
    'Cihazın çektiği gücü de görmek isterseniz çalışma gerilimini volt olarak üçüncü alana yazın; gerekmiyorsa boş bırakın.',
    '"Çevir" düğmesine basın. Akımın diğer birimlerdeki karşılığı ve varsa watt cinsinden güç listelenir.',
    'Adaptör ya da pil seçerken iki ürünün değerlerini aynı birime çevirip karşılaştırın.',
  ],
  sections: [
    { h: 'Amper ve miliamper nedir?', p: [
      'Amper, elektrik akımının birimidir ve bir iletkenden birim zamanda geçen elektrik yükünü anlatır. Su tesisatı benzetmesiyle gerilim borudaki basınca, akım ise borudan akan suyun debisine karşılık gelir. Simgesi A\'dır ve uluslararası birim sisteminin yedi temel biriminden biridir.',
      'Miliamper, amperin binde biridir ve mA olarak yazılır. "Mili" ön eki binde bir anlamına gelir; milimetre ile metre arasındaki ilişkinin aynısı miliamper ile amper arasında da geçerlidir. Elektronik devrelerde, pillerde ve küçük cihazlarda akımlar çoğu zaman amperin çok altında olduğu için miliamper daha kullanışlı bir birimdir.',
    ] },
    { h: 'Çevirme kuralı', p: [
      'Amperden miliampere geçerken değeri 1.000 ile çarparsınız, yani virgülü üç basamak sağa kaydırırsınız: <strong>mA = A × 1.000</strong>. Miliamperden ampere geçerken 1.000\'e bölersiniz, yani virgülü üç basamak sola kaydırırsınız: <strong>A = mA ÷ 1.000</strong>.',
      'Diğer ön ekler de aynı mantıkla işler. Mikroamper (µA) amperin milyonda biri, kiloamper (kA) amperin bin katıdır. Bu durumda 1 mA = 1.000 µA ve 1 kA = 1.000 A = 1.000.000 mA olur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Tablet adaptörünün çıkışı 2,5 A olarak yazılmış. 2,5 × 1.000 = 2.500 mA. Aynı akım 2.500.000 µA ve 0,0025 kA\'dır.',
      '<strong>Örnek 2:</strong> Eski bir telefon şarj cihazı 5 volt, 500 mA veriyor. 500 ÷ 1.000 = 0,5 A. Gücü P = V × I bağıntısıyla 5 × 0,5 = 2,5 watt eder. 2,5 A veren adaptörle aynı gerilimde güç beş katına, 12,5 watta çıkar.',
      '<strong>Örnek 3:</strong> Standart bir gösterge LED\'i yaklaşık 20 mA akımla çalışır. 20 mA = 0,02 A = 20.000 µA.',
      '<strong>Örnek 4:</strong> Bir sensör uyku kipinde 150 µA çekiyor. 150 ÷ 1.000 = 0,15 mA, yani 0,00015 A. Pil ömrü hesaplarında bu kadar küçük akımlar belirleyici olur.',
      '<strong>Örnek 5:</strong> 16 amperlik bir priz hattında 230 volt gerilimde çekilebilecek güç 16 × 230 = 3.680 watt eder.',
    ] },
    { h: 'Gündelik hayatta amper ve miliamper', ul: [
      '<strong>Şarj cihazları:</strong> Çıkış akımı eski modellerde mA (500 mA, 1000 mA), yenilerde A (2 A, 3 A) olarak yazılır. 2000 mA ile 2 A aynı şeydir.',
      '<strong>Ev sigortaları:</strong> Aydınlatma ve priz hatlarında 10 A, 16 A, 25 A gibi değerler kullanılır.',
      '<strong>Kaçak akım rölesi:</strong> İnsan hayatını korumaya yönelik tiplerin açma akımı 30 mA, yani 0,03 A\'dır.',
      '<strong>Endüstriyel sensörler:</strong> Ölçüm sinyali yaygın olarak 4–20 mA akım döngüsüyle taşınır.',
      '<strong>Multimetre:</strong> Akım ölçümünde mA ve 10 A için ayrı girişler bulunur; yanlış girişe takmak sigortayı attırır.',
      '<strong>Kısa devre akımları:</strong> Pano ve kesici etiketlerinde 6 kA, 10 kA gibi kiloamper değerleri görülür.',
    ] },
    { h: 'mA ile mAh aynı şey değildir', p: [
      'En sık karıştırılan iki kavram miliamper (mA) ve miliampersaattir (mAh). Miliamper anlık akımı, miliampersaat ise pilin depoladığı yük miktarını, yani kapasiteyi anlatır. Kapasite, akım ile sürenin çarpımıdır: 5.000 mAh\'lik bir pil, kuramsal olarak 500 mA akımı 10 saat boyunca verebilir.',
      'Bu yüzden "5000 miliamperlik powerbank" ifadesi aslında 5.000 mAh kapasiteyi anlatır; cihazın verebileceği akım ise çıkış etiketinde amper olarak ayrıca yazılır. Gerçek kullanım süresi dönüşüm kayıpları ve pilin yaşı nedeniyle kuramsal değerden kısa olur.',
    ] },
    { h: 'Akım, gerilim ve güç ilişkisi', p: [
      'Amper tek başına bir cihazın ne kadar enerji harcadığını söylemez; gerilimle birlikte değerlendirilmelidir. Doğru akımda güç, gerilim ile akımın çarpımıdır: <strong>P (watt) = V (volt) × I (amper)</strong>. Formülde akımın amper cinsinden olması gerekir; miliamper değerini önce 1.000\'e bölmelisiniz. Araçtaki isteğe bağlı gerilim alanı bu hesabı sizin için yapar.',
      'Alternatif akımda motor ve trafo gibi yüklerde güç katsayısı devreye girer ve gerçek güç bu çarpımdan düşük çıkar. Bu sayfadaki güç satırı doğru akım devreleri ve ısıtıcı gibi omik yükler için doğrudur.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'İnsan vücudu için tehlikeli olan şey yalnızca yüksek gerilim değil, vücuttan geçen akımdır ve onlarca miliamper düzeyindeki akımlar bile hayati risk oluşturabilir. Bu sayfa yalnızca birim çevirir; kablo kesiti, sigorta ve kaçak akım rölesi seçimi gibi konularda sonuçlar bilgilendirme amaçlıdır. Şebeke gerilimiyle çalışan tesisatta yapılacak her iş için yetkili bir elektrikçiye ya da elektrik mühendisine danışın.',
    ] },
  ],
  faq: [
    ['1 amper kaç miliamperdir?', '1 amper 1.000 miliamperdir. Amper değerini 1.000 ile çarparak miliampere çevirirsiniz; örneğin 1,5 A = 1.500 mA.'],
    ['1 miliamper kaç amperdir?', '1 miliamper 0,001 amperdir. Miliamper değerini 1.000\'e bölerek ampere çevirirsiniz; örneğin 250 mA = 0,25 A.'],
    ['2000 mA kaç amper eder?', '2000 mA, 2000 ÷ 1.000 = 2 amper eder. Şarj cihazlarında 2000 mA ve 2 A yazımları aynı çıkış akımını anlatır.'],
    ['Mikroamper nedir?', 'Mikroamper (µA), amperin milyonda biri, miliamperin binde biridir. Saat, sensör ve uyku kipindeki mikrodenetleyiciler gibi çok az akım çeken devrelerde kullanılır.'],
    ['Yüksek amperli şarj cihazı telefona zarar verir mi?', 'Adaptörün üzerindeki amper değeri verebileceği en yüksek akımdır; cihaz yalnızca ihtiyacı kadarını çeker. Önemli olan gerilimin ve şarj standardının uyumlu olmasıdır. Kuşku duyduğunuzda üreticinin önerdiği adaptörü kullanın.'],
    ['mAh değerini ampere çevirebilir miyim?', 'Doğrudan çeviremezsiniz, çünkü mAh kapasite, amper ise akım birimidir. Kapasiteyi çalışma süresine (saat) bölerseniz ortalama akımı bulursunuz: 3.000 mAh\'lik pil 6 saatte boşalıyorsa ortalama akım 500 mA\'dır.'],
    ['Amperden watt nasıl hesaplanır?', 'Doğru akımda watt, volt ile amperin çarpımıdır. 12 voltta 2 amper çeken bir cihaz 24 watt harcar. Bu sayfada gerilim alanını doldurursanız güç otomatik hesaplanır.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['volt-milivolt-cevir', 'ohm-kiloohm-cevir', 'amper-watt-cevir', 'ohm-kanunu-hesapla', 'elektrik-gucu-hesapla', 'kw-amper-cevir'],
};
