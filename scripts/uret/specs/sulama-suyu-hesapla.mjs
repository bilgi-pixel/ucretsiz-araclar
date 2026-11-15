export default {
  slug: 'sulama-suyu-hesapla',
  title: 'Sulama Suyu İhtiyacı Hesaplama',
  h1Tail: 'mm, ton ve sulama süresi',
  pageTitle: 'Sulama Suyu İhtiyacı Hesaplama – Dekara Kaç Ton Su Gerekir?',
  description: 'Arazi büyüklüğü, verilecek su derinliği (mm) ve sulama randımanına göre toplam su ihtiyacını ton, metreküp ve litre olarak; pompa debisine göre sulama süresini bulun.',
  card: 'Verilecek su derinliğinden toplam su ihtiyacını ton ve metreküp olarak, pompa debisinden sulama süresini bulun.',
  category: 'gunluk',
  keywords: ['sulama suyu hesaplama', 'dekara kaç ton su', 'sulama suyu ihtiyacı', 'sulama süresi hesaplama', 'mm su kaç ton', 'damla sulama su hesabı', 'tarla sulama hesabı'],
  lead: 'Bitkinin su ihtiyacı yağış gibi <strong>milimetre</strong> ile ifade edilir; pompa ve sayaç ise metreküp ya da ton ile çalışır. Bu araç, bir sulamada verilmek istenen net su derinliğini arazinizin büyüklüğüne ve sulama yönteminizin randımanına göre toplam su hacmine, pompa debisi girerseniz sulama süresine çevirir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Sulanacak alan (dekar)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'net', label: 'Verilecek net su (mm)', type: 'number', placeholder: 'Örn. 45', hint: 'Bitkinin kök bölgesine ulaşması istenen su derinliği' },
    { id: 'randiman', label: 'Sulama randımanı (%)', type: 'number', value: '90', hint: 'Damla için 90, yağmurlama için 75, salma için 50–60 civarı' },
    { id: 'debi', label: 'Pompa / sistem debisi (m³/saat, isteğe bağlı)', type: 'number', placeholder: 'Örn. 25' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'Sulanacak alan');
    const net = h.pos(v.net, 'Verilecek net su');
    const rand = h.pos(v.randiman, 'Sulama randımanı');
    if (rand > 100) h.err('Sulama randımanı %100\'den büyük olamaz; 50 ile 95 arasında bir değer yazın.');
    const debi = h.opt(v.debi, 0, 'Pompa debisi');
    if (debi < 0) h.err('Pompa debisi negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    const brut = net / (rand / 100);
    const hacim = alan * brut; // 1 mm × 1 dekar = 1 m³
    const netHacim = alan * net;
    const rows = [
      ['Toplam su ihtiyacı', h.fmt(hacim, 2) + ' m³ (ton)'],
      ['Litre karşılığı', h.fmt(hacim * 1000, 0) + ' litre'],
      ['Brüt su derinliği', h.fmt(brut, 2) + ' mm'],
      ['Dekara verilecek su', h.fmt(brut, 2) + ' m³/dekar'],
      ['Bitkiye ulaşan net su', h.fmt(netHacim, 2) + ' m³'],
      ['Kayıp (buharlaşma, sızma, akış)', h.fmt(hacim - netHacim, 2) + ' m³'],
    ];
    if (debi > 0) {
      const saat = hacim / debi;
      const tamSaat = Math.floor(saat + 1e-9);
      let dk = Math.round((saat - tamSaat) * 60);
      let ss = tamSaat;
      if (dk === 60) { ss += 1; dk = 0; }
      rows.push(['Sulama süresi', `${h.fmt(saat, 2)} saat (${ss} saat ${dk} dakika)`]);
    }
    return {
      rows,
      note: '1 mm su, 1 dekarda 1 m³ (1 ton) eder. Brüt su = net su ÷ randıman. Değerler planlama amaçlıdır; gerçek ihtiyaç toprak, iklim ve bitkiye göre değişir.',
    };
  },
  cases: [
    { in: { alan: '10', net: '45', randiman: '90', debi: '25' }, out: { 'Toplam su ihtiyacı': '500 m³ (ton)', 'Litre karşılığı': '500.000 litre', 'Brüt su derinliği': '50 mm', 'Bitkiye ulaşan net su': '450 m³', 'Kayıp (buharlaşma, sızma, akış)': '50 m³', 'Sulama süresi': '20 saat (20 saat 0 dakika)' } },
    { in: { alan: '25', net: '60', randiman: '75', debi: '' }, out: { 'Toplam su ihtiyacı': '2.000 m³ (ton)', 'Brüt su derinliği': '80 mm', 'Dekara verilecek su': '80 m³/dekar', 'Bitkiye ulaşan net su': '1.500 m³' } },
    { in: { alan: '1', net: '1', randiman: '100', debi: '' }, out: { 'Toplam su ihtiyacı': '1 m³ (ton)', 'Litre karşılığı': '1.000 litre' } },
    { in: { alan: '40', net: '50', randiman: '50', debi: '100' }, out: { 'Toplam su ihtiyacı': '4.000 m³ (ton)', 'Brüt su derinliği': '100 mm', 'Sulama süresi': '40 saat (40 saat 0 dakika)' } },
    { in: { alan: '3', net: '30', randiman: '90', debi: '8' }, out: { 'Toplam su ihtiyacı': '100 m³ (ton)', 'Brüt su derinliği': '33,33 mm', 'Sulama süresi': '12,5 saat (12 saat 30 dakika)' } },
    { in: { alan: '0,5', net: '20', randiman: '80', debi: '5' }, out: { 'Toplam su ihtiyacı': '12,5 m³ (ton)', 'Litre karşılığı': '12.500 litre', 'Sulama süresi': '2,5 saat (2 saat 30 dakika)' } },
    { in: { alan: '10', net: '45', randiman: '120', debi: '' }, error: true },
    { in: { alan: '10', net: '', randiman: '90', debi: '' }, error: true },
    { in: { alan: '-4', net: '45', randiman: '90', debi: '' }, error: true },
  ],
  howto: [
    'Sulayacağınız alanı dekar olarak girin.',
    'Bu sulamada bitkinin kök bölgesine ulaşmasını istediğiniz net su derinliğini milimetre olarak yazın.',
    'Sulama yönteminize uygun randımanı girin; emin değilseniz damla sulama için 90, yağmurlama için 75, salma sulama için 50–60 arası bir değer kullanın.',
    'Sulama süresini de görmek istiyorsanız pompanızın ya da sisteminizin debisini metreküp/saat olarak yazın; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın; toplam su ihtiyacını, kayıpları ve süreyi sonuç kutusunda görün.',
  ],
  sections: [
    { h: 'Milimetre su ne demek?', p: [
      'Yağış ve sulama suyu derinlik olarak ölçülür. 1 milimetre su, düz bir yüzeye yayıldığında 1 mm yüksekliğinde bir su tabakası demektir. 1 metrekareye 1 mm su 1 litre eder. 1 dekar 1.000 metrekare olduğundan <strong>1 mm su, 1 dekarda 1.000 litre, yani 1 metreküp (yaklaşık 1 ton)</strong> su demektir. Bu eşitlik hesabı çok kolaylaştırır: dekara 50 mm sulama, dekara 50 ton sudur.',
      'Hektarla çalışanlar için aynı ilişki 10 katıdır: 1 mm su 1 hektarda 10 metreküp eder. Su tonla anıldığında 1 metreküp tatlı suyun yaklaşık 1 ton geldiği kabul edilir; sulama hesabında bu fark önemsizdir.',
    ] },
    { h: 'Net su, brüt su ve randıman', p: [
      'Pompadan çıkan suyun tamamı bitki köklerine ulaşmaz. Bir kısmı iletim sırasında sızar, bir kısmı buharlaşır, bir kısmı tarla sonundan akıp gider ya da kök bölgesinin altına süzülür. Köklere ulaşan kısma <strong>net sulama suyu</strong>, bunun için kaynaktan alınması gereken toplam suya <strong>brüt sulama suyu</strong> denir. İkisinin oranı sulama randımanıdır.',
      'Formül şöyledir: <strong>brüt su (mm) = net su (mm) ÷ (randıman ÷ 100)</strong> ve <strong>toplam su (m³) = alan (dekar) × brüt su (mm)</strong>. Randıman düştükçe aynı net suyu vermek için gereken su artar; yüzde 50 randımanla çalışan bir salma sulamada bitkiye ulaşan her ton su için kaynaktan iki ton çekilir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Örnek 1: 10 dekar mısır tarlasına damla sulamayla 45 mm net su verilecek, randıman yüzde 90. Brüt su 45 ÷ 0,90 = 50 mm\'dir. Toplam ihtiyaç 10 × 50 = 500 metreküp, yani 500 ton sudur. Sistemin debisi saatte 25 metreküp ise sulama 500 ÷ 25 = 20 saat sürer. Bitkiye ulaşan su 450 metreküp, kayıp 50 metreküptür.',
      'Örnek 2: Aynı hesabı 25 dekar yonca ve yağmurlama sulama için yapalım; 60 mm net su ve yüzde 75 randıman. Brüt su 60 ÷ 0,75 = 80 mm, toplam ihtiyaç 25 × 80 = 2.000 metreküptür. Burada 500 metreküp su kayıp olarak hesaplanır.',
      'Örnek 3: 3 dekarlık bir bahçeye 30 mm net su, yüzde 90 randımanla verilecek ve kuyudan saatte 8 metreküp su çıkıyor. Brüt su 33,33 mm, toplam ihtiyaç 100 metreküp, süre 12,5 saat, yani 12 saat 30 dakikadır.',
    ] },
    { h: 'Yaklaşık randıman değerleri', ul: [
      '<strong>Damla sulama:</strong> yaklaşık %85–95',
      '<strong>Mini yağmurlama ve yağmurlama:</strong> yaklaşık %70–85 (rüzgâr ve sıcaklık kaybı artırır)',
      '<strong>Karık sulama:</strong> yaklaşık %55–70',
      '<strong>Salma (göllendirme) sulama:</strong> yaklaşık %40–60',
    ], p: [
      'Bu aralıklar genel kabul gören yaklaşık değerlerdir. Gerçek randıman; arazinin tesviyesine, toprağın bünyesine, sistemin bakımına, basınç dengesine ve sulamayı yapan kişinin özenine göre değişir. Açık toprak kanallarla uzun mesafe taşınan suda iletim kayıpları ayrıca hesaba katılmalıdır.',
    ] },
    { h: 'Net su miktarını nereden bulurum?', p: [
      'Verilecek net su; bitkinin günlük su tüketimine ve iki sulama arasındaki gün sayısına bağlıdır. Günlük tüketimi 6 mm olan bir bitkiyi 7 günde bir suluyorsanız ve bu sürede yağış olmadıysa bir sulamada yaklaşık 6 × 7 = 42 mm net su gerekir. Günlük tüketim bitkinin türüne, gelişme dönemine ve havanın sıcaklığına, nemine, rüzgârına göre değişir; bölgeniz için güncel değerleri tarım müdürlüklerinin ve araştırma enstitülerinin yayımladığı bitki su tüketimi rehberlerinden alabilirsiniz.',
      'Toprağın su tutma kapasitesi de sınır koyar: kumlu toprak bir seferde az su tutar, bu yüzden az ve sık sulama gerekir; killi toprak daha fazla su depolar ama suyu yavaş alır. Toprağın tutabileceğinden fazla verilen su kök bölgesinin altına iner ve boşa gider.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Net suyu doğrudan pompalanacak su sanmak ve randımanı hesaba katmamak.',
      'Pompanın etiket debisini kullanmak; gerçek debi kuyu derinliğine, boru çapına ve basınca göre etiketten düşük olabilir. Sayaçla ya da hacmi bilinen bir depoyu doldurarak ölçmek daha doğrudur.',
      'Damla sulamada yalnızca ıslatılan şeridi değil tüm alanı sulanıyor varsaymak; sıra arası geniş bahçelerde ıslatılan alan oranı ayrıca dikkate alınabilir.',
      'Yağışı hesaptan düşmemek; sulama aralığında düşen etkili yağış net ihtiyacı azaltır.',
    ], p: [
      'Araç tuzluluk nedeniyle verilen yıkama suyunu, don ya da serinletme amaçlı sulamayı ve iletim hattı kayıplarını ayrıca hesaplamaz. Sonuçlar planlama ve bilgilendirme amaçlıdır; sulama projesi, pompa ve boru seçimi için ziraat ya da sulama mühendisine danışın.',
    ] },
  ],
  faq: [
    ['Dekara 1 mm su kaç ton eder?', '1 mm su 1 dekarda 1 metreküp, yani yaklaşık 1 ton (1.000 litre) eder. Dekara 40 mm sulama 40 ton su demektir.'],
    ['10 dönüm tarla için kaç ton su gerekir?', 'Bu, verilecek su derinliğine ve sulama yöntemine bağlıdır. 45 mm net su ve %90 randımanla 500 ton; aynı net su %50 randımanlı salma sulamayla 900 ton su gerektirir.'],
    ['Sulama randımanı nedir?', 'Kaynaktan alınan suyun yüzde kaçının bitki kök bölgesinde depolandığını gösteren orandır. %75 randıman, çekilen her 100 litre suyun 75 litresinin bitkiye yaradığı anlamına gelir.'],
    ['Pompa debisini litre/saniye olarak biliyorum, nasıl girerim?', 'Litre/saniye değerini 3,6 ile çarparak metreküp/saate çevirin. Saniyede 5 litre veren bir pompa saatte 18 metreküp su verir.'],
    ['Su sayacındaki metreküp ile ton aynı mı?', 'Sulama hesabı açısından evet. 1 metreküp su 1.000 litredir ve yaklaşık 1 ton gelir; bu yüzden sonuç satırında iki birim birlikte gösterilir.'],
    ['Damla sulamada su tasarrufu neden yüksek?', 'Su doğrudan kök bölgesine, düşük debiyle ve yüzeyde göllenmeden verildiği için buharlaşma, yüzey akışı ve derine sızma kayıpları azalır. Aynı net su için daha az brüt su çekilir; araçta randımanı değiştirerek farkı görebilirsiniz.'],
    ['Sulama süresi neden tahminden uzun çıkıyor?', 'Çoğu zaman gerçek debi sanılandan düşüktür ya da alanın tamamı aynı anda sulanamaz. Sistemi bölümler hâlinde çalıştırıyorsanız her bölümü kendi alanı ve o bölüme giden debiyle ayrı hesaplayın.'],
    ['Girdiğim veriler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; arazi ve su bilgileriniz sunucuya iletilmez, saklanmaz.'],
  ],
  related: ['gubre-miktari-hesapla', 'ilaclama-suyu-hesapla', 'dekar-verim-hesapla', 'fidan-sayisi-hesapla', 'donum-metrekare-cevir'],
};
