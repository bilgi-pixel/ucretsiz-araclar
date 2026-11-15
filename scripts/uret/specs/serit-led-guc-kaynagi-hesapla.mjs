export default {
  slug: 'serit-led-guc-kaynagi-hesapla',
  title: 'Şerit LED Güç Kaynağı Hesaplama',
  h1Tail: 'adaptör (trafo) gücü ve akımı',
  pageTitle: 'Şerit LED Güç Kaynağı Hesaplama – Kaç Amper Adaptör Gerekir?',
  description: 'Şerit LED uzunluğunu ve metre başına gücünü yazın; toplam watt değerini, çekilen akımı ve yedek paylı adaptör (trafo) gücünü 5, 12 ve 24 V için hesaplayın.',
  card: 'Şerit LED uzunluğu ve metre başına gücünden gereken adaptör (trafo) watt ve amper değerini hesaplayın.',
  category: 'elektrik',
  keywords: ['şerit led trafo hesaplama', 'şerit led kaç amper', 'şerit led adaptör hesaplama', 'led trafosu kaç watt', '5 metre şerit led kaç amper', 'şerit led güç kaynağı', '12v şerit led trafo'],
  lead: 'Şerit LED\'in uzunluğunu, metre başına gücünü ve çalışma gerilimini girin. Araç şeridin <strong>toplam gücünü ve çektiği akımı</strong> bulur, seçtiğiniz yedek payı ekleyerek almanız gereken adaptörün en düşük watt ve amper değerini verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Şerit uzunluğu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'wm', label: 'Metre başına güç (W/m)', type: 'number', placeholder: 'Örn. 14,4', hint: 'Ürün etiketinde ya da ambalajında yazar.' },
    { id: 'gerilim', label: 'Çalışma gerilimi', type: 'select', options: [['12', '12 V'], ['24', '24 V'], ['5', '5 V']] },
    { id: 'pay', label: 'Yedek pay (%)', type: 'number', value: '20' },
  ],
  compute(v, h) {
    const l = h.pos(v.uzunluk, 'Şerit uzunluğu');
    const wm = h.pos(v.wm, 'Metre başına güç');
    const u = v.gerilim === '24' ? 24 : v.gerilim === '5' ? 5 : 12;
    const pay = h.opt(v.pay, 20, 'Yedek pay');
    if (pay < 0 || pay > 100) h.err('Yedek pay %0 ile %100 arasında olmalı.');
    const p = l * wm;
    const i = p / u;
    const pOn = p * (1 + pay / 100);
    const iOn = pOn / u;
    const sinir = u === 24 ? 10 : 5;
    let note = 'Adaptörü hesaplanan değere eşit ya da bir üst standart güçte seçin. Adaptör gerilimi şeridin gerilimiyle aynı olmalıdır.';
    if (l > sinir + 1e-9) note += ' Şerit ' + sinir + ' metreden uzun olduğu için tek uçtan beslemede uçta parlaklık düşebilir; şeridi iki uçtan ya da ara noktalardan besleyin.';
    return {
      rows: [
        ['Önerilen en düşük adaptör gücü', h.fmt(pOn, 1) + ' W'],
        ['Önerilen en düşük adaptör akımı', h.fmt(iOn, 2) + ' A'],
        ['Şeridin toplam gücü', h.fmt(p, 2) + ' W'],
        ['Şeridin çektiği akım', h.fmt(i, 2) + ' A'],
        ['Çalışma gerilimi', u + ' V DC'],
      ],
      note,
    };
  },
  cases: [
    { in: { uzunluk: '5', wm: '14,4', gerilim: '12', pay: '20' }, out: { 'Önerilen en düşük adaptör gücü': '86,4 W', 'Önerilen en düşük adaptör akımı': '7,2 A', 'Şeridin toplam gücü': '72 W', 'Şeridin çektiği akım': '6 A' } },
    { in: { uzunluk: '10', wm: '9,6', gerilim: '24', pay: '20' }, out: { 'Önerilen en düşük adaptör gücü': '115,2 W', 'Önerilen en düşük adaptör akımı': '4,8 A', 'Şeridin toplam gücü': '96 W', 'Şeridin çektiği akım': '4 A' } },
    { in: { uzunluk: '5', wm: '4,8', gerilim: '12', pay: '20' }, out: { 'Şeridin toplam gücü': '24 W', 'Şeridin çektiği akım': '2 A', 'Önerilen en düşük adaptör gücü': '28,8 W', 'Önerilen en düşük adaptör akımı': '2,4 A' } },
    { in: { uzunluk: '2', wm: '15', gerilim: '5', pay: '0' }, out: { 'Şeridin toplam gücü': '30 W', 'Şeridin çektiği akım': '6 A', 'Önerilen en düşük adaptör gücü': '30 W', 'Çalışma gerilimi': '5 V DC' } },
    { in: { uzunluk: '2,5', wm: '7,2', gerilim: '12', pay: '25' }, out: { 'Şeridin toplam gücü': '18 W', 'Şeridin çektiği akım': '1,5 A', 'Önerilen en düşük adaptör gücü': '22,5 W', 'Önerilen en düşük adaptör akımı': '1,88 A' } },
    { in: { uzunluk: '15', wm: '14,4', gerilim: '24', pay: '20' }, out: { 'Şeridin toplam gücü': '216 W', 'Şeridin çektiği akım': '9 A', 'Önerilen en düşük adaptör gücü': '259,2 W', 'Önerilen en düşük adaptör akımı': '10,8 A' } },
    { in: { uzunluk: '0', wm: '14,4', gerilim: '12', pay: '20' }, error: true },
    { in: { uzunluk: '5', wm: 'on', gerilim: '12', pay: '20' }, error: true },
  ],
  howto: [
    'Kullanacağınız şerit LED\'in toplam uzunluğunu metre olarak yazın. Birden çok parçayı aynı adaptöre bağlayacaksanız uzunlukları toplayın.',
    'Şeridin metre başına gücünü (W/m) girin. Bu değer ambalajda ya da ürün bilgisinde yer alır; yalnızca makaranın toplam gücü yazıyorsa makara uzunluğuna bölün.',
    'Şeridin çalışma gerilimini seçin: 12 V, 24 V ya da adreslenebilir şeritlerde yaygın olan 5 V.',
    'Yedek payı ayarlayın; yüzde 20 çoğu kurulum için uygun bir değerdir.',
    '"Hesapla" düğmesine basın ve ilk iki satırdaki watt ve amper değerine eşit ya da daha büyük bir adaptör seçin.',
  ],
  sections: [
    { h: 'Şerit LED için adaptör gücü nasıl hesaplanır?', p: [
      'Şerit LED\'ler sabit gerilimle çalışır ve tükettikleri güç uzunlukla doğru orantılıdır. Hesap üç adımdan oluşur. Önce toplam güç bulunur: <strong>P = uzunluk × metre başına güç</strong>. Sonra akım hesaplanır: <strong>I = P ÷ U</strong>. Son olarak adaptörün sürekli tam yükte çalışmaması için bir yedek pay eklenir: <strong>adaptör gücü = P × (1 + pay ÷ 100)</strong>.',
      'Adaptör etiketlerinde bazen yalnızca watt, bazen yalnızca amper yazar. İkisi aynı bilgiyi taşır; 12 V için 5 A bir adaptör 60 W, 24 V için 5 A bir adaptör 120 W verir. Araç iki değeri de gösterdiği için hangisi yazıyorsa onunla karşılaştırabilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: 5 metre, 14,4 W/m, 12 V', p: [
      'Mutfak tezgâhı altına metre başına 14,4 W çeken 5 metrelik 12 V şerit döşeyeceğinizi düşünelim.',
    ], ol: [
      'Toplam güç: 5 m × 14,4 W/m = 72 W',
      'Çekilen akım: 72 W ÷ 12 V = 6 A',
      'Yüzde 20 yedek payla adaptör gücü: 72 × 1,20 = 86,4 W',
      'Yedek paylı akım: 86,4 W ÷ 12 V = 7,2 A',
    ] },
    { h: 'Sonucun yorumu ve 24 V karşılaştırması', p: [
      'Bu sonuca göre en az 86,4 W, yani en az 7,2 A verebilen 12 V bir adaptör gerekir; piyasada bulunan bir üst standart güç seçilir. Tam 72 W\'lık ya da 6 A\'lik bir adaptör kâğıt üzerinde yeterli görünse de sürekli sınırda çalışacağı için ısınır ve ömrü kısalır.',
      'Aynı işi 24 V şeritle yapmak akımı yarıya indirir: metre başına 9,6 W çeken 10 metrelik 24 V bir şerit 96 W tüketir ve yalnızca 4 A çeker. Yüzde 20 payla 115,2 W, yani 4,8 A\'lik bir adaptör yeterlidir.',
    ] },
    { h: 'Neden yedek pay bırakılır?', p: [
      'Güç kaynakları anma gücünün tamamında sürekli çalıştırıldığında iç sıcaklıkları yükselir; kondansatörler daha çabuk yaşlanır ve arıza olasılığı artar. Kapalı tavan boşluğu, mobilya içi ya da güneş alan dış mekân gibi havalandırması zayıf yerlerde bu etki büyür. Ayrıca şeritlerin gerçek tüketimi etiket değerinden bir miktar sapabilir. Yüzde 20 pay yaygın bir uygulamadır; sıcak ve kapalı ortamlarda yüzde 30\'a çıkmak mantıklıdır. Öte yandan gereğinden çok büyük bir adaptör zarar vermez ama gereksiz maliyet ve yer kaybıdır.',
    ] },
    { h: 'Metre başına güç değerleri', p: [
      'Şeridin gücü, metredeki LED sayısına ve LED çipinin tipine göre değişir. Aynı görünen iki şerit arasında bile fark olabildiği için hesapta her zaman kendi ürününüzün etiket değerini kullanın. Piyasada sık rastlanan tek renk şerit değerleri kabaca şöyledir:',
    ], ul: [
      'Düşük yoğunluklu dekoratif şeritler: yaklaşık 4,8 W/m',
      'Orta yoğunluklu şeritler: yaklaşık 7,2–9,6 W/m',
      'Yüksek parlaklıklı şeritler: yaklaşık 14,4 W/m ve üzeri',
      'Renkli (RGB) şeritlerde etiket değeri genellikle üç rengin birlikte tam parlaklıkta yandığı beyaz ışığa göre verilir; tek renk yanarken tüketim daha düşüktür.',
    ] },
    { h: 'Uzun hatlarda gerilim düşümü', p: [
      'Şerit LED\'in üzerindeki ince bakır yollar dirençlidir. Akım şerit boyunca ilerledikçe gerilim düşer ve uçtaki LED\'ler baştakilere göre daha sönük, beyaz şeritlerde hafif sarımsı görünür. Bu nedenle 12 V şeritlerin tek uçtan beslenen kesintisiz uzunluğu genellikle 5 metreyle sınırlandırılır; 24 V şeritlerde akım yarı yarıya düşük olduğu için bu uzunluk yaklaşık iki katına çıkar. Kesin sınır üreticiye göre değişir.',
      'Daha uzun kurulumlarda şeritler uç uca eklenmez; her parça adaptörden ayrı kabloyla beslenir ya da şerit iki ucundan birden beslenir. Adaptör ile şerit arasındaki kablo da incelirse aynı sorun yaşanır; yüksek akımlı hatlarda kablo kesitini akıma ve mesafeye göre seçin. Araç, girdiğiniz uzunluk bu tipik sınırları aştığında not satırında uyarır.',
    ] },
    { h: 'Sık yapılan hatalar ve güvenlik', ul: [
      '12 V şeride 24 V adaptör bağlamak şeridi kısa sürede yakar; 24 V şeride 12 V adaptör bağlamak ise şeridi çok sönük yakar ya da hiç yakmaz.',
      'Dimmer, kumanda ya da kontrol cihazı kullanıyorsanız onun da akım sınırı vardır; şeridin çektiği akım kontrol cihazının kanal başına akımını aşmamalıdır.',
      'Banyo, balkon ve bahçe gibi nemli ortamlarda hem şeridin hem adaptörün koruma sınıfı ortama uygun olmalıdır.',
      'Adaptörün şebeke tarafı 230 V taşır. Klemensli (kafesli) güç kaynaklarının bağlantısı enerjisi kesilmiş hatta ve yetkin bir kişi tarafından yapılmalıdır.',
    ], p: [
      'Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; kesin seçim için ürününüzün teknik bilgilerine bakın ve sabit tesisat işlerinde elektrikçiye danışın.',
    ] },
  ],
  faq: [
    ['5 metre şerit LED kaç amper çeker?', 'Metre başına gücüne ve gerilimine bağlıdır. 12 V ve 14,4 W/m bir şerit 5 metrede 72 W tüketir ve 6 A çeker; 4,8 W/m bir şerit ise 24 W tüketir ve 2 A çeker.'],
    ['Adaptör gücü şeritten büyük olursa zarar verir mi?', 'Hayır. Şerit yalnızca ihtiyacı kadar akım çeker; adaptörün fazla kapasitesi kullanılmadan kalır. Zarar veren şey gerilimin yanlış olmasıdır, gücün fazla olması değil.'],
    ['Watt değerini bilmiyorum, nasıl bulurum?', 'Ambalajdaki toplam gücü makara uzunluğuna bölün. Örneğin 5 metrelik makara için 36 W yazıyorsa metre başına güç 7,2 W\'tır. Hiç bilgi yoksa bir ampermetreyle akımı ölçüp gerilimle çarpabilirsiniz.'],
    ['12 V mu 24 V mu şerit seçmeliyim?', 'Kısa ve basit kurulumlarda ikisi de iş görür. Uzun hatlarda 24 V aynı güç için yarı akım çektiğinden gerilim düşümü ve kablo ısınması daha az olur.'],
    ['Birden fazla şeridi tek adaptöre bağlayabilir miyim?', 'Evet; şeritleri adaptöre paralel bağlayın ve toplam uzunluğu araca girin. Her şeridi ayrı kabloyla beslemek, uç uca eklemekten daha eşit parlaklık sağlar.'],
    ['RGB şeritte hesap değişir mi?', 'Formül aynıdır. Etiketteki W/m değeri çoğunlukla tüm renkler tam açıkken geçerli olan en yüksek tüketimdir; adaptörü bu değere göre seçmek güvenli taraftadır.'],
    ['Şeridi keserek kısaltırsam güç azalır mı?', 'Evet, güç uzunlukla orantılıdır. Şeritler yalnızca üzerinde işaretli kesim noktalarından kesilmelidir; yeni uzunluğu yazarak hesabı yenileyebilirsiniz.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; yazdıklarınız sunucuya gönderilmez.'],
  ],
  related: ['led-direnc-hesapla', 'amper-watt-cevir', 'gerilim-dusumu-hesapla', 'kablo-kesiti-hesapla', 'aydinlatma-lumen-hesapla', 'led-tasarruf-hesapla'],
};
