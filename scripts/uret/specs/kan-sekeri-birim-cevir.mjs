export default {
  slug: 'kan-sekeri-birim-cevir',
  title: 'Kan Şekeri Birim Çevirici (mg/dL – mmol/L)',
  h1Tail: 'mg/dL ↔ mmol/L',
  pageTitle: 'Kan Şekeri Birim Çevirici – mg/dL mmol/L Dönüştürme',
  description: 'Kan şekeri değerini mg/dL\'den mmol/L\'ye ya da mmol/L\'den mg/dL\'ye çevirin. Açlık ya da tokluk ölçümünün hangi aralığa düştüğünü de görün.',
  card: 'Kan şekerini mg/dL ve mmol/L arasında çevirin; açlık ya da tokluk ölçümünün hangi aralıkta olduğunu görün.',
  category: 'saglik',
  keywords: ['kan şekeri birim çevirme', 'mg/dl mmol/l çevirme', 'mmol/l kaç mg/dl', 'şeker ölçüm birimi dönüştürme', 'glukoz birim çevirici', 'açlık kan şekeri mmol', 'kan şekeri 5,5 mmol kaç mg'],
  lead: 'Şeker ölçüm cihazınız ya da yurt dışında yapılan tahliliniz farklı bir birim mi kullanıyor? Kan şekeri (glukoz) değerini <strong>mg/dL</strong> ile <strong>mmol/L</strong> arasında çevirin; isterseniz ölçümün açlık ya da tokluk için hangi aralığa düştüğünü de görün.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Kan şekeri değeri', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mg', 'mg/dL → mmol/L'], ['mmol', 'mmol/L → mg/dL']] },
    { id: 'olcum', label: 'Ölçüm türü', type: 'select', options: [['yok', 'Yalnızca çevir'], ['aclik', 'Açlık kan şekeri'], ['tokluk', 'Şeker yüklemesinden 2 saat sonra']] },
  ],
  compute(v, h) {
    const K = 18.016; // glukozun mol kütlesi 180,16 g/mol
    const x = h.pos(v.deger, 'Kan şekeri değeri');
    const girdiMmol = v.yon === 'mmol';
    const mg = girdiMmol ? x * K : x;
    const mmol = girdiMmol ? x : x / K;
    if (mg > 2000) h.err(girdiMmol ? 'Değer mmol/L için çok yüksek; ölçümünüz mg/dL ise çeviri yönünü değiştirin.' : 'Değer çok yüksek görünüyor; yazdığınız sayıyı kontrol edin.');
    if (mg < 5) h.err(girdiMmol ? 'Değer çok düşük görünüyor; yazdığınız sayıyı kontrol edin.' : 'Değer mg/dL için çok düşük; ölçümünüz mmol/L ise çeviri yönünü değiştirin.');
    const rows = [
      girdiMmol ? ['mg/dL karşılığı', h.fmt(mg, 1) + ' mg/dL'] : ['mmol/L karşılığı', h.fmt(mmol, 2) + ' mmol/L'],
      girdiMmol ? ['Girilen değer', h.fmt(mmol, 2) + ' mmol/L'] : ['Girilen değer', h.fmt(mg, 1) + ' mg/dL'],
    ];
    if (v.olcum === 'aclik' || v.olcum === 'tokluk') {
      // Eşikler girilen birimde uygulanır (yuvarlama kayması olmasın diye)
      const e = v.olcum === 'aclik'
        ? (girdiMmol ? [3.9, 5.6, 7.0] : [70, 100, 126])
        : (girdiMmol ? [null, 7.8, 11.1] : [null, 140, 200]);
      const b = girdiMmol ? 'mmol/L' : 'mg/dL';
      const f = (n) => h.fmt(n, 1);
      let s;
      if (e[0] !== null && x < e[0]) s = `Düşük (${f(e[0])} ${b} altı)`;
      else if (x < e[1]) s = `Normal aralık (${f(e[1])} ${b} altı)`;
      else if (x < e[2]) s = (v.olcum === 'aclik' ? 'Bozulmuş açlık glukozu aralığı' : 'Bozulmuş glukoz toleransı aralığı') + ` (${f(e[1])} – ${f(e[2])} ${b} arası)`;
      else s = `Diyabet aralığı (${f(e[2])} ${b} ve üzeri)`;
      rows.push([v.olcum === 'aclik' ? 'Açlık ölçümü aralığı' : 'Yükleme sonrası 2. saat aralığı', s]);
    }
    return {
      rows,
      note: '1 mmol/L = 18,016 mg/dL (glukoz için). Aralıklar toplardamar kanından laboratuvarda ölçülen plazma glukozu içindir; tek ölçüm tanı koydurmaz.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'mg', olcum: 'yok' }, out: { 'mmol/L karşılığı': '5,55 mmol/L', 'Girilen değer': '100 mg/dL' } },
    { in: { deger: '5,5', yon: 'mmol', olcum: 'yok' }, out: { 'mg/dL karşılığı': '99,1 mg/dL', 'Girilen değer': '5,5 mmol/L' } },
    { in: { deger: '126', yon: 'mg', olcum: 'aclik' }, out: { 'mmol/L karşılığı': '6,99 mmol/L', 'Açlık ölçümü aralığı': 'Diyabet aralığı (126 mg/dL ve üzeri)' } },
    { in: { deger: '90', yon: 'mg', olcum: 'aclik' }, out: { 'mmol/L karşılığı': '5 mmol/L', 'Açlık ölçümü aralığı': 'Normal aralık (100 mg/dL altı)' } },
    { in: { deger: '110', yon: 'mg', olcum: 'aclik' }, out: { 'mmol/L karşılığı': '6,11 mmol/L', 'Açlık ölçümü aralığı': 'Bozulmuş açlık glukozu aralığı (100 – 126 mg/dL arası)' } },
    { in: { deger: '150', yon: 'mg', olcum: 'tokluk' }, out: { 'mmol/L karşılığı': '8,33 mmol/L', 'Yükleme sonrası 2. saat aralığı': 'Bozulmuş glukoz toleransı aralığı (140 – 200 mg/dL arası)' } },
    { in: { deger: '60', yon: 'mg', olcum: 'aclik' }, out: { 'mmol/L karşılığı': '3,33 mmol/L', 'Açlık ölçümü aralığı': 'Düşük (70 mg/dL altı)' } },
    { in: { deger: '7', yon: 'mmol', olcum: 'aclik' }, out: { 'mg/dL karşılığı': '126,1 mg/dL', 'Açlık ölçümü aralığı': 'Diyabet aralığı (7 mmol/L ve üzeri)' } },
    { in: { deger: '11,1', yon: 'mmol', olcum: 'tokluk' }, out: { 'mg/dL karşılığı': '200 mg/dL', 'Yükleme sonrası 2. saat aralığı': 'Diyabet aralığı (11,1 mmol/L ve üzeri)' } },
    { in: { deger: 'abc', yon: 'mg', olcum: 'yok' }, error: true },
    { in: { deger: '0', yon: 'mg', olcum: 'yok' }, error: true },
    { in: { deger: '180', yon: 'mmol', olcum: 'yok' }, error: true },
  ],
  howto: [
    'Ölçüm cihazınızda ya da tahlil raporunuzda yazan değeri "Kan şekeri değeri" alanına girin.',
    'Değerin birimine göre çeviri yönünü seçin: elinizdeki değer mg/dL ise ilk, mmol/L ise ikinci seçeneği kullanın.',
    'Yalnızca birim çevirmek istiyorsanız ölçüm türünü "Yalnızca çevir" olarak bırakın; aralık bilgisini de görmek için açlık ya da yükleme sonrası 2. saat seçeneğini işaretleyin.',
    '"Çevir" düğmesine basın. Sonucu kopyalayıp ölçüm günlüğünüze ekleyebilirsiniz.',
  ],
  sections: [
    { h: 'İki birim arasındaki fark', p: [
      'Kan şekeri iki farklı biçimde bildirilir. <strong>mg/dL</strong> (desilitrede miligram) kütle derişimidir: bir desilitre kanda kaç miligram glukoz bulunduğunu gösterir. Türkiye, ABD ve birçok ülkede laboratuvarlar ve ev tipi ölçüm cihazları bu birimi kullanır. <strong>mmol/L</strong> (litrede milimol) ise madde miktarı derişimidir: bir litre kanda kaç milimol glukoz molekülü bulunduğunu söyler. Birleşik Krallık, Kanada, Avustralya ve pek çok Avrupa ülkesinde standart birim budur.',
      'İki birim aynı ölçümün farklı ifadesidir; biri diğerinden daha doğru değildir. Karışıklık genellikle yurt dışından alınan bir ölçüm cihazı, yabancı dilde bir kaynak ya da başka ülkede yapılmış bir tahlil nedeniyle ortaya çıkar. 5,5 gibi küçük bir sayı görürseniz değer büyük olasılıkla mmol/L, 100 dolayında bir sayı görürseniz mg/dL\'dir.',
    ] },
    { h: 'Çevirme formülü', p: [
      'Çeviri katsayısı glukozun mol kütlesinden gelir. Glukozun (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) bir molü yaklaşık 180,16 gramdır. Bir milimol 180,16 mg eder; litre yerine desilitreye geçmek için ona bölündüğünde <strong>1 mmol/L = 18,016 mg/dL</strong> bulunur.',
    ], ul: [
      '<strong>mmol/L = mg/dL ÷ 18,016</strong>',
      '<strong>mg/dL = mmol/L × 18,016</strong>',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '100 mg/dL değerini çevirelim: 100 ÷ 18,016 = 5,5506, yani yaklaşık <strong>5,55 mmol/L</strong>. Tersine 5,5 mmol/L değeri 5,5 × 18,016 = 99,088, yani yaklaşık <strong>99,1 mg/dL</strong> eder.',
      'Pratikte birçok kaynak katsayıyı 18 olarak yuvarlar; bu durumda 100 mg/dL için 5,56 mmol/L bulunur. Aradaki fark binde birin altındadır ve ölçüm cihazlarının kendi hata payının çok gerisinde kalır. Kafadan hızlı hesap için mg/dL değerini 18\'e bölmek ya da mmol/L değerini 18 ile çarpmak yeterlidir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>70 mg/dL</strong> ≈ 3,89 mmol/L',
      '<strong>90 mg/dL</strong> ≈ 5,00 mmol/L',
      '<strong>100 mg/dL</strong> ≈ 5,55 mmol/L',
      '<strong>126 mg/dL</strong> ≈ 6,99 mmol/L',
      '<strong>140 mg/dL</strong> ≈ 7,77 mmol/L',
      '<strong>180 mg/dL</strong> ≈ 9,99 mmol/L',
      '<strong>200 mg/dL</strong> ≈ 11,10 mmol/L',
      '<strong>300 mg/dL</strong> ≈ 16,65 mmol/L',
    ] },
    { h: 'Aralıklar nasıl belirleniyor?', p: [
      'Ölçüm türünü seçtiğinizde araç, değeri tanı kılavuzlarında yaygın kullanılan eşiklerle karşılaştırır. En az sekiz saatlik açlıktan sonra ölçülen <strong>açlık plazma glukozunda</strong> 100 mg/dL (5,6 mmol/L) altı normal, 100–125 mg/dL (5,6–6,9 mmol/L) bozulmuş açlık glukozu, 126 mg/dL (7,0 mmol/L) ve üzeri diyabet aralığı kabul edilir. 70 mg/dL (3,9 mmol/L) altı ise düşük kan şekeri uyarı sınırıdır.',
      '75 gram glukozla yapılan <strong>şeker yükleme testinin 2. saatinde</strong> 140 mg/dL (7,8 mmol/L) altı normal, 140–199 mg/dL (7,8–11,0 mmol/L) bozulmuş glukoz toleransı, 200 mg/dL (11,1 mmol/L) ve üzeri diyabet aralığıdır. Araç eşikleri değeri girdiğiniz birimde uygular; böylece yuvarlamadan kaynaklanan sınır kaymaları olmaz.',
      'Sıradan bir öğünden sonra ölçülen tokluk şekeri yükleme testiyle aynı şey değildir; yenen yemeğe ve geçen süreye göre değişir. Diyabetli kişilerde hedef aralıklar da tanı eşiklerinden farklıdır ve hekim tarafından kişiye göre belirlenir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Birimi karıştırmak: 7 mmol/L normalin üzerinde bir açlık değeridir, 7 mg/dL ise yaşamla bağdaşmayacak kadar düşüktür. Araç, seçilen yöne göre olanaksız görünen değerlerde uyarı verir.',
      'Ondalık ayracı atlamak: cihazda 5.8 görünen değeri 58 olarak not etmek sonucu on kat değiştirir.',
      'Farklı günlerin ölçümlerini farklı birimlerle aynı deftere yazmak. Günlüğünüzde tek bir birim kullanın ve hekiminize hangi birimi kullandığınızı belirtin.',
    ] },
    { h: 'Önemli uyarı', p: [
      'Bu araç bir birim çeviricidir; tanı koymaz. Diyabet tanısı, laboratuvarda toplardamar kanından yapılan ve gerektiğinde yinelenen ölçümlerle hekim tarafından konur. Parmak ucundan ölçüm yapan ev cihazları izlem içindir ve laboratuvar sonucundan bir miktar sapabilir. Gebelikte kullanılan eşikler bu sayfadakilerden farklıdır.',
      'Kan şekeriniz çok düşük ya da çok yüksek ölçülüyor ve terleme, titreme, bilinç bulanıklığı, aşırı susama, bulantı ya da nefeste aseton kokusu gibi belirtiler eşlik ediyorsa gecikmeden sağlık kuruluşuna başvurun. İnsülin ya da ilaç dozunuzu bu sayfadaki sonuca göre değiştirmeyin.',
    ] },
  ],
  faq: [
    ['mg/dL nasıl mmol/L\'ye çevrilir?', 'mg/dL değerini 18,016\'ya bölersiniz. Örneğin 100 mg/dL, 100 ÷ 18,016 ≈ 5,55 mmol/L eder. Hızlı hesap için 18\'e bölmek de yeterlidir.'],
    ['5,5 mmol/L kaç mg/dL eder?', '5,5 × 18,016 ≈ 99,1 mg/dL eder. Bu, açlık ölçümü için normal aralıkta bir değerdir.'],
    ['Katsayı neden 18?', 'Glukozun mol kütlesi yaklaşık 180 g/mol\'dür. Litreden desilitreye geçerken ona bölündüğü için katsayı 18 olur; tam değer 18,016\'dır.'],
    ['Bu katsayı kolesterol ya da üre için de geçerli mi?', 'Hayır. Katsayı her maddenin mol kütlesine göre değişir. 18,016 yalnızca glukoz içindir; kolesterol için yaklaşık 38,67, trigliserit için yaklaşık 88,57 kullanılır.'],
    ['Ölçüm cihazım mmol/L gösteriyor, mg/dL\'ye ayarlayabilir miyim?', 'Bazı cihazlarda birim ayarı bulunur, bazılarında ise birim satıldığı ülkeye göre sabittir. Kullanım kılavuzuna bakın; değiştirilemiyorsa değerleri bu araçla çevirebilirsiniz.'],
    ['HbA1c değerini de bu araçla çevirebilir miyim?', 'Hayır. HbA1c yüzde ya da mmol/mol olarak bildirilen farklı bir ölçümdür ve glukoz birim katsayısıyla çevrilmez. Ortalama kan şekeri karşılığı için HbA1c hesaplama aracını kullanın.'],
    ['Açlık şekerim 100 ile 125 arasında çıktı, diyabet miyim?', 'Bu aralık bozulmuş açlık glukozu olarak adlandırılır ve diyabet tanısı anlamına gelmez; ancak izlem gerektirir. Değerlendirme ve gerekli ek testler için hekiminize başvurun.'],
    ['Girdiğim şeker değerleri saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hba1c-ortalama-seker-hesapla', 'kolesterol-orani-hesapla', 'birim-donustur', 'vki-hesapla', 'tansiyon-degerlendirme'],
};
