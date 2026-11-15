export default {
  slug: 'paralel-direnc-hesapla',
  title: 'Paralel Direnç Hesaplama',
  h1Tail: 'eşdeğer direnç ve kol akımları',
  pageTitle: 'Paralel Direnç Hesaplama – Paralel Bağlı Dirençlerin Eşdeğeri',
  description: 'Paralel bağlı iki ya da daha fazla direncin eşdeğer direncini hesaplayın. Gerilim yazarsanız her koldan geçen akımı, toplam akımı ve gücü de görün.',
  card: 'Paralel bağlı dirençlerin eşdeğerini bulun; gerilim girerek kol akımlarını ve toplam gücü de hesaplayın.',
  category: 'elektrik',
  keywords: ['paralel direnç hesaplama', 'paralel bağlı dirençler', 'eşdeğer direnç', 'paralel direnç formülü', 'kol akımı hesaplama', 'iki direnç paralel', 'paralel devre'],
  lead: 'Uçları aynı iki noktaya bağlanmış dirençlerin <strong>eşdeğer direncini</strong> hesaplayın. Kaynak gerilimini de yazarsanız araç her koldan geçen akımı, kaynaktan çekilen toplam akımı ve toplam gücü verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'direncler', label: 'Direnç değerleri', type: 'text', placeholder: 'Örn. 10 15 30', hint: 'Değerleri boşlukla ayırın; ondalık için virgül kullanın (2,2).', wide: true },
    { id: 'birim', label: 'Dirençlerin birimi', type: 'select', options: [['1', 'Ohm (Ω)'], ['1000', 'Kiloohm (kΩ)'], ['1000000', 'Megaohm (MΩ)']] },
    { id: 'gerilim', label: 'Kaynak gerilimi (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12' },
  ],
  compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const liste = h.nums(v.direncler, 'Direnç değerleri').map((x) => {
      if (!(x > 0)) h.err('Direnç değerleri sıfırdan büyük olmalı. Sıfır ohm kısa devre anlamına gelir.');
      return x * carpan;
    });
    if (liste.length < 2) h.err('Paralel bağlantı için en az iki direnç değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 direnç değeri yazabilirsiniz.');
    const iletkenlik = liste.reduce((a, r) => a + 1 / r, 0);
    const es = 1 / iletkenlik;
    const ohmYaz = (r) => (r >= 1e6 ? h.fmt(r / 1e6, 4) + ' MΩ' : r >= 1e3 ? h.fmt(r / 1e3, 4) + ' kΩ' : h.fmt(r, 4) + ' Ω');
    const rows = [
      ['Eşdeğer direnç', h.fmt(es, 4) + ' Ω'],
      ['Kısa gösterim', ohmYaz(es)],
      ['Direnç sayısı', String(liste.length)],
      ['En küçük direnç', ohmYaz(Math.min(...liste))],
      ['Toplam iletkenlik', h.sig(iletkenlik * 1000, 6) + ' mS'],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      rows.push(['Toplam akım', h.fmt(u / es, 4) + ' A']);
      rows.push(['Kol akımları', liste.map((r) => h.fmt(u / r, 4) + ' A').join(' · ')]);
      rows.push(['Toplam güç', h.fmt(u * u / es, 4) + ' W']);
    }
    return { rows, note: 'Eşdeğer direnç her zaman en küçük dirençten küçüktür. Dirençler ideal kabul edilmiştir.' };
  },
  cases: [
    { in: { direncler: '100 100', birim: '1' }, out: { 'Eşdeğer direnç': '50 Ω', 'Direnç sayısı': '2', 'Toplam iletkenlik': '20 mS' } },
    { in: { direncler: '10 15 30', birim: '1', gerilim: '12' }, out: { 'Eşdeğer direnç': '5 Ω', 'Toplam akım': '2,4 A', 'Kol akımları': '1,2 A · 0,8 A · 0,4 A', 'Toplam güç': '28,8 W' } },
    { in: { direncler: '220 330', birim: '1' }, out: { 'Eşdeğer direnç': '132 Ω', 'En küçük direnç': '220 Ω' } },
    { in: { direncler: '1 1', birim: '1000' }, out: { 'Eşdeğer direnç': '500 Ω', 'Kısa gösterim': '500 Ω' } },
    { in: { direncler: '4 12', birim: '1' }, out: { 'Eşdeğer direnç': '3 Ω' } },
    { in: { direncler: '10 10 10 10', birim: '1000', gerilim: '5' }, out: { 'Kısa gösterim': '2,5 kΩ', 'Toplam akım': '0,002 A', 'Toplam güç': '0,01 W' } },
    { in: { direncler: '6 3', birim: '1', gerilim: '6' }, out: { 'Eşdeğer direnç': '2 Ω', 'Toplam akım': '3 A', 'Kol akımları': '1 A · 2 A', 'Toplam güç': '18 W' } },
    { in: { direncler: '100', birim: '1' }, error: true },
    { in: { direncler: '100 0', birim: '1' }, error: true },
    { in: { direncler: 'abc def', birim: '1' }, error: true },
  ],
  howto: [
    'Paralel bağlı dirençlerin değerlerini aralarında boşluk bırakarak "Direnç değerleri" alanına yazın. İki dirençle sınırlı değilsiniz; elli değere kadar girebilirsiniz.',
    'Birim listesinden değerlerin ohm, kiloohm ya da megaohm cinsinden olduğunu belirtin. Bütün değerler aynı birimde yazılmalıdır.',
    'Kol akımlarını görmek istiyorsanız paralel grubun uçlarındaki gerilimi volt olarak yazın; yalnızca eşdeğer direnç gerekiyorsa boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır eşdeğer direnci, sonraki satırlar kısa gösterimi, en küçük direnci ve toplam iletkenliği verir.',
    'Gerilim girdiyseniz toplam akım, her kolun akımı (yazdığınız sırayla) ve toplam güç de listelenir.',
  ],
  sections: [
    { h: 'Paralel bağlantının mantığı', p: [
      'Dirençlerin birer ucu ortak bir noktada, diğer uçları başka bir ortak noktada birleşiyorsa bağlantı paraleldir. Bu durumda her direncin uçları arasında <strong>aynı gerilim</strong> bulunur, akım ise kollara bölünür. Her yeni kol akım için ek bir yol açtığından toplam direnç azalır. Evdeki prizlerin tamamı bu mantıkla bağlıdır: her cihaz aynı şebeke gerilimini görür ve biri kapatıldığında diğerleri çalışmaya devam eder.',
      'Akımın kollara dağılımı dirençle ters orantılıdır. Küçük direnç akıma daha az karşı koyduğu için akımın büyük kısmı küçük dirençli koldan geçer.',
    ] },
    { h: 'Paralel direnç formülü', p: [
      'Paralel bağlantıda dirençlerin kendileri değil, tersleri (iletkenlikleri) toplanır: <strong>1 ÷ R<sub>eş</sub> = 1 ÷ R<sub>1</sub> + 1 ÷ R<sub>2</sub> + 1 ÷ R<sub>3</sub> + …</strong> Toplam bulunduktan sonra tersi alınarak eşdeğer dirence geçilir. Araç bu ara değeri "Toplam iletkenlik" satırında milisiemens (mS) olarak gösterir.',
      'Yalnızca iki direnç varsa aynı formül daha kısa yazılabilir: <strong>R<sub>eş</sub> = (R<sub>1</sub> × R<sub>2</sub>) ÷ (R<sub>1</sub> + R<sub>2</sub>)</strong>. "Çarpım bölü toplam" diye bilinen bu kısayol üç ve daha fazla direnç için doğrudan uygulanamaz; ya ikişer ikişer ilerlemek ya da terslerin toplamını kullanmak gerekir.',
      'Değeri R olan n adet eş direnç paralel bağlanırsa sonuç R ÷ n olur. Dört adet 10 kΩ direncin paralel eşdeğeri 2,5 kΩ\'dur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 10 Ω, 15 Ω ve 30 Ω dirençler paralel bağlı. Terslerin toplamı 1/10 + 1/15 + 1/30 = 3/30 + 2/30 + 1/30 = 6/30 = 0,2 siemens (200 mS) eder. Eşdeğer direnç 1 ÷ 0,2 = 5 Ω\'dur. Gruba 12 V uygulanırsa kol akımları 12 ÷ 10 = 1,2 A, 12 ÷ 15 = 0,8 A ve 12 ÷ 30 = 0,4 A olur. Toplam akım 2,4 A, toplam güç 12 × 2,4 = 28,8 W\'tır.',
      '<strong>Örnek 2:</strong> 220 Ω ile 330 Ω paralel. Çarpım bölü toplam: (220 × 330) ÷ (220 + 330) = 72.600 ÷ 550 = 132 Ω. Sonucun 220 Ω\'dan küçük çıktığına dikkat edin.',
      '<strong>Örnek 3:</strong> 6 Ω ve 3 Ω dirençler 6 V\'a paralel bağlanırsa eşdeğer direnç 18 ÷ 9 = 2 Ω, kol akımları 1 A ve 2 A, toplam akım 3 A, güç 18 W olur.',
    ] },
    { h: 'Hızlı kontrol kuralları', ul: [
      'Eşdeğer direnç her zaman en küçük dirençten <strong>küçüktür</strong>. Daha büyük bir sonuç bulduysanız hesapta hata vardır.',
      'İki eşit direncin paraleli, değerin yarısıdır: 100 Ω ile 100 Ω → 50 Ω.',
      'Biri diğerinden çok büyükse (örneğin yüz kat) eşdeğer direnç neredeyse küçük olana eşittir: 100 Ω ile 10 kΩ → yaklaşık 99 Ω.',
      'Kol akımlarının toplamı kaynak akımına eşit olmalıdır (Kirchhoff\'un akımlar yasası).',
      'Paralel koldaki bir direnç devreden çıkarılırsa toplam direnç artar, toplam akım azalır.',
    ] },
    { h: 'Uygulamada paralel bağlantı', p: [
      'Elektronikte paralel bağlantı çoğu zaman standart seride bulunmayan bir değeri elde etmek için kullanılır. Örneğin 500 Ω standart E12 serisinde yoktur; iki adet 1 kΩ direnç paralel bağlanarak elde edilir. Bir başka amaç gücü paylaştırmaktır: aynı değerde iki direnç paralel bağlandığında her biri toplam gücün yarısını harcar, böylece küçük güçlü dirençlerle daha büyük bir yük oluşturulabilir.',
      'Akım ölçümünde kullanılan şönt dirençleri de çoğunlukla birkaç düşük değerli direncin paralel bağlanmasıyla yapılır. Ölçü aletlerinin iç direnci de ölçülen elemana paralel gelir; yüksek dirençli bir noktada voltmetreyle ölçüm yaparken aletin iç direnci sonucu düşürebilir. Bu etkiyi kestirmek için ölçülen direnci ve aletin iç direncini bu araca girip eşdeğere bakabilirsiniz.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Hesap doğru akım ve ideal dirençler içindir. Sıfır ohm değeri kabul edilmez, çünkü paralel koldaki sıfır direnç kısa devredir ve eşdeğer direnci sıfıra indirir. Çok düşük dirençlerde kablo ve temas dirençleri, çok yüksek dirençlerde kaçak akımlar gerçek sonucu değiştirir.',
      'Paralel bağlantıda toplam akım hızla büyüyebilir; kaynağın ve iletkenlerin bu akımı taşıyabildiğinden emin olun. Buradaki sonuçlar bilgilendirme amaçlıdır; şebeke gerilimli tesisatlarda ve güvenliği ilgilendiren devrelerde karar için yetkili bir elektrik uzmanına danışın.',
    ] },
  ],
  faq: [
    ['Paralel bağlı iki direncin eşdeğeri nasıl hesaplanır?', 'İki direncin çarpımı toplamlarına bölünür. 4 Ω ile 12 Ω için (4 × 12) ÷ (4 + 12) = 48 ÷ 16 = 3 Ω bulunur.'],
    ['Üç ve daha fazla direnç için hangi formül kullanılır?', 'Her direncin tersi alınıp toplanır, sonra toplamın tersi alınır. 10, 15 ve 30 Ω için terslerin toplamı 0,2 olduğundan eşdeğer direnç 5 Ω çıkar.'],
    ['Paralel bağlantıda eşdeğer direnç neden küçülür?', 'Her yeni kol akım için ek bir yol demektir. Yol sayısı arttıkça aynı gerilimde daha fazla akım geçer; bu da toplam direncin azalması anlamına gelir.'],
    ['Paralel devrede gerilim dirençler arasında bölünür mü?', 'Hayır. Paralel bağlı her direncin uçlarında aynı gerilim vardır. Bölünen büyüklük akımdır.'],
    ['Hangi koldan daha fazla akım geçer?', 'Direnci küçük olan koldan. Akım dirençle ters orantılıdır; 6 V altında 3 Ω\'luk koldan 2 A, 6 Ω\'luk koldan 1 A geçer.'],
    ['Seri ve paralel karışık devreyi bu araçla çözebilir miyim?', 'Adım adım çözebilirsiniz. Önce paralel grupların eşdeğerini bu araçla bulun, sonra bulduğunuz değerleri seri direnç hesabında toplayın.'],
    ['İletkenlik ve siemens ne anlama gelir?', 'İletkenlik direncin tersidir ve birimi siemenstir (S). 50 Ω\'luk bir direncin iletkenliği 1 ÷ 50 = 0,02 S, yani 20 mS\'dir. Paralel bağlantıda iletkenlikler toplanır.'],
    ['Girdiğim değerler bir sunucuya gidiyor mu?', 'Hayır. Bütün hesap tarayıcınızın içinde yapılır; değerler gönderilmez, kaydedilmez.'],
  ],
  related: ['seri-direnc-hesapla', 'ohm-kanunu-hesapla', 'gerilim-bolucu-hesapla', 'direnc-renk-kodu-hesapla', 'isi-kaybi-direnc-hesapla'],
};
