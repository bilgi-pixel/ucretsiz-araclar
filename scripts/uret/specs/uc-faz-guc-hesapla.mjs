export default {
  slug: 'uc-faz-guc-hesapla',
  title: 'Üç Faz (Trifaze) Güç Hesaplama',
  h1Tail: 'kW, kVA, kVAr, amper',
  pageTitle: 'Üç Faz (Trifaze) Güç Hesaplama – kW, kVA, kVAr ve Akım',
  description: 'Trifaze sistemde gerilim, akım ve cos φ değerlerinden aktif, görünür ve reaktif gücü hesaplayın ya da kW değerinden hat akımını bulun. √3 formülüyle.',
  card: 'Üç fazlı sistemde gerilim, akım ve cos φ ile kW, kVA ve kVAr değerlerini ya da güçten hat akımını hesaplayın.',
  category: 'elektrik',
  keywords: ['üç faz güç hesaplama', 'trifaze güç hesaplama', 'trifaze akım hesaplama', 'kök 3 formülü', '3 faz kw hesaplama', 'trifaze amper hesabı', 'aktif reaktif görünür güç'],
  lead: `Üç fazlı (trifaze) dengeli bir yükün <strong>aktif gücünü (kW)</strong>, <strong>görünür gücünü (kVA)</strong> ve <strong>reaktif gücünü (kVAr)</strong> hat gerilimi, hat akımı ve güç faktöründen hesaplayın. İsterseniz gücü yazıp çekilecek hat akımını da bulabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'İşlem', type: 'select', options: [['guc', 'Akımdan güç hesapla'], ['akim', 'Güçten akım hesapla']] },
    { id: 'gerilim', label: 'Hat gerilimi – fazlar arası (V)', type: 'number', value: '400' },
    { id: 'akim', label: 'Hat akımı (A)', type: 'number', placeholder: 'Örn. 10', hint: 'Akımdan güç hesaplanırken doldurun.' },
    { id: 'kw', label: 'Aktif güç (kW)', type: 'number', placeholder: 'Örn. 15', hint: 'Güçten akım hesaplanırken doldurun.' },
    { id: 'cos', label: 'Güç faktörü (cos φ)', type: 'number', value: '0,85', hint: '0 ile 1 arasında; omik yükler için 1.' },
  ],
  compute(v, h) {
    const U = h.pos(v.gerilim, 'Hat gerilimi');
    const cos = h.pos(v.cos, 'Güç faktörü');
    if (cos > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,85).');
    const k3 = Math.sqrt(3);
    let I, P;
    if (v.mod === 'akim') {
      P = h.pos(v.kw, 'Aktif güç') * 1000;
      I = P / (k3 * U * cos);
    } else {
      I = h.pos(v.akim, 'Hat akımı');
      P = k3 * U * I * cos;
    }
    const S = k3 * U * I;
    const Q = S * Math.sqrt(Math.max(0, 1 - cos * cos));
    const pSatir = ['Aktif güç', h.fmt(P / 1000, 3) + ' kW'];
    const iSatir = ['Hat akımı', h.fmt(I, 2) + ' A'];
    return {
      rows: [
        ...(v.mod === 'akim' ? [iSatir, pSatir] : [pSatir, iSatir]),
        ['Görünür güç', h.fmt(S / 1000, 3) + ' kVA'],
        ['Reaktif güç', h.fmt(Q / 1000, 3) + ' kVAr'],
        ['Faz-nötr gerilimi', h.fmt(U / k3, 1) + ' V'],
      ],
      note: 'P = √3 × U × I × cos φ. Dengeli yük ve sinüs biçimli akım varsayılır; U fazlar arası (hat) gerilimidir.',
    };
  },
  cases: [
    { in: { mod: 'guc', gerilim: '400', akim: '10', cos: '0,8' }, out: { 'Aktif güç': '5,543 kW', 'Görünür güç': '6,928 kVA', 'Reaktif güç': '4,157 kVAr', 'Faz-nötr gerilimi': '230,9 V' } },
    { in: { mod: 'akim', gerilim: '400', kw: '15', cos: '0,85' }, out: { 'Hat akımı': '25,47 A', 'Görünür güç': '17,647 kVA', 'Reaktif güç': '9,296 kVAr' } },
    { in: { mod: 'guc', gerilim: '380', akim: '20', cos: '1' }, out: { 'Aktif güç': '13,164 kW', 'Görünür güç': '13,164 kVA', 'Reaktif güç': '0 kVAr' } },
    { in: { mod: 'akim', gerilim: '380', kw: '5,5', cos: '0,8' }, out: { 'Hat akımı': '10,45 A' } },
    { in: { mod: 'guc', gerilim: '400', akim: '32', cos: '0,9' }, out: { 'Aktif güç': '19,953 kW', 'Görünür güç': '22,17 kVA', 'Reaktif güç': '9,664 kVAr' } },
    { in: { mod: 'guc', gerilim: '400', akim: '100', cos: '0,85' }, out: { 'Aktif güç': '58,89 kW', 'Görünür güç': '69,282 kVA' } },
    { in: { mod: 'guc', gerilim: '400', akim: '10', cos: '1,2' }, error: true },
    { in: { mod: 'guc', gerilim: '400', akim: '', cos: '0,85' }, error: true },
    { in: { mod: 'akim', gerilim: '400', kw: '15', cos: '0' }, error: true },
  ],
  howto: [
    `"İşlem" listesinden akımdan güç mü, güçten akım mı hesaplayacağınızı seçin.`,
    `Hat gerilimini, yani iki faz arasında ölçülen gerilimi yazın. Türkiye'deki alçak gerilim şebekesi için bu değer 400 V'tur (eski gösterimle 380 V).`,
    `Seçtiğiniz işleme göre hat akımını (pens ampermetreyle bir fazdan ölçülen değer) ya da aktif gücü kilowatt olarak girin.`,
    `Yükün güç faktörünü yazın. Motor etiketinde cos φ olarak belirtilir; rezistanslı ısıtıcılar için 1 kullanın.`,
    `"Hesapla" düğmesine basın. Aktif, görünür ve reaktif güç ile hat akımı ve faz-nötr gerilimi listelenir.`,
  ],
  sections: [
    { h: 'Üç fazlı sistem ve √3 nereden geliyor?', p: [
      `Üç fazlı sistemde aralarında 120 derece faz farkı bulunan üç sinüs gerilimi vardır. Bir faz ile nötr arasındaki gerilime faz gerilimi, iki faz arasındaki gerilime hat gerilimi denir. Aradaki 120 derecelik açı nedeniyle hat gerilimi faz geriliminin √3, yani yaklaşık 1,732 katıdır: 230 V faz gerilimi 400 V hat gerilimine karşılık gelir.`,
      `Dengeli bir yükte toplam güç, üç fazın güçlerinin toplamıdır: P = 3 × U<sub>faz</sub> × I × cos φ. Faz gerilimi yerine hat gerilimi yazıldığında 3 ÷ √3 = √3 kalır ve bilinen formül ortaya çıkar: <strong>P = √3 × U × I × cos φ</strong>. Bu eşitlik yıldız ve üçgen bağlantının ikisi için de geçerlidir; yeter ki U hat gerilimi, I hat akımı olsun.`,
    ] },
    { h: 'Aktif, reaktif ve görünür güç', ul: [
      `<strong>Görünür güç (S, kVA):</strong> S = √3 × U × I. Şebekenin, trafonun ve kabloların taşımak zorunda olduğu toplam güçtür.`,
      `<strong>Aktif güç (P, kW):</strong> P = S × cos φ. İşe, ısıya ya da ışığa dönüşen, sayaçta kWh olarak faturalanan güçtür.`,
      `<strong>Reaktif güç (Q, kVAr):</strong> Q = S × sin φ. Motor ve trafoların manyetik alanını kurmak için şebekeyle yük arasında gidip gelen güçtür; iş yapmaz ama akım çeker.`,
    ], p: [
      `Bu üçü bir dik üçgen oluşturur: <strong>S² = P² + Q²</strong>. Güç faktörü (cos φ) aktif gücün görünür güce oranıdır. Güç faktörü düştükçe aynı işi yapmak için daha fazla akım çekilir; kablolar daha çok ısınır ve gerilim düşümü artar.`,
    ] },
    { h: 'Çözümlü örnek: akımdan güç', p: [
      `400 V şebekeden, her fazdan 10 A çeken ve güç faktörü 0,8 olan bir yük düşünelim. Görünür güç 1,732 × 400 × 10 = 6928 VA, yani <strong>6,928 kVA</strong>'dır. Aktif güç 6,928 × 0,8 = <strong>5,543 kW</strong> olur. cos φ = 0,8 için sin φ = 0,6 olduğundan reaktif güç 6,928 × 0,6 = <strong>4,157 kVAr</strong> çıkar. Sağlama: 5,543² + 4,157² = 48,0 ve 6,928² = 48,0.`,
    ] },
    { h: 'Çözümlü örnek: güçten akım', p: [
      `Etiketinde 15 kW yazan bir yük 400 V şebekeye bağlanacak ve güç faktörü 0,85 olsun. Hat akımı I = 15 000 ÷ (1,732 × 400 × 0,85) = <strong>25,47 A</strong> bulunur. Görünür güç 15 ÷ 0,85 = 17,647 kVA'dır.`,
      `Motorlarda dikkat edilmesi gereken bir ayrıntı vardır: etiketteki kW değeri mil çıkış gücüdür. Şebekeden çekilen elektriksel güç, bu değerin motor verimine bölünmesiyle bulunur. %90 verimli 15 kW'lık bir motorun elektriksel gücü 16,67 kW'dır; akımı bulmak için güç alanına bu değeri yazmanız gerekir. Bu durumda akım yaklaşık 28,3 A çıkar ve motor etiketindeki anma akımına yaklaşır.`,
    ] },
    { h: 'Hızlı tahmin kuralları', p: [
      `400 V şebekede ve cos φ yaklaşık 0,85 iken her 1 kW için kabaca 1,7 A hat akımı çekilir; verim de hesaba katıldığında motorlar için "kW başına yaklaşık 2 A" kuralı yaygın olarak kullanılır. Omik yüklerde (cos φ = 1) her 1 kW yaklaşık 1,44 A eder. Bu kurallar pano başında kaba kontrol içindir; sigorta, kontaktör ve kablo seçimi için kesin hesap ve üretici verileri kullanılmalıdır.`,
    ] },
    { h: 'Tek fazlı hesapla farkı', p: [
      `Tek fazlı sistemde güç P = U × I × cos φ ile hesaplanır ve U faz-nötr gerilimidir (230 V). Aynı 15 kW'lık yük tek fazdan beslenseydi 15 000 ÷ (230 × 0,85) = 76,7 A çekerdi; üç fazda ise faz başına 25,47 A yeterlidir. Büyük güçlü cihazların trifaze beslenmesinin başlıca nedeni budur: aynı güç daha ince iletkenlerle ve daha dengeli biçimde taşınır.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `Hat gerilimi yerine 230 V faz gerilimini yazmak. Formüldeki √3 çarpanı hat gerilimine göredir; 230 V yazılırsa sonuç yaklaşık 1,73 kat düşük çıkar.`,
      `Üç fazın akımlarını toplayıp formüle koymak. I, tek bir hattan geçen akımdır.`,
      `Güç faktörünü yüzde olarak yazmak. 85 değil 0,85 girilmelidir.`,
      `kVA ile kW'ı aynı sanmak. Jeneratör ve trafo güçleri kVA, motor ve ısıtıcı güçleri kW olarak verilir.`,
      `Dengesiz yüklerde tek bir akım değeriyle hesap yapmak. Fazlardan farklı akımlar geçiyorsa her faz ayrı hesaplanıp toplanmalıdır.`,
    ] },
    { h: 'Sınırlar ve güvenlik uyarısı', p: [
      `Araç dengeli yük, sinüs biçimli gerilim ve akım varsayar. Frekans konvertörleri, doğrultucular ve LED sürücüleri gibi harmonik üreten yüklerde gerçek güç faktörü ve akım bu basit hesaptan farklı olabilir. Reaktif enerji bedeli, kompanzasyon zorunluluğu ve sınır oranları mevzuatla belirlenir ve zaman içinde değişir; güncel mevzuatı kontrol edin.`,
      `Üç fazlı tesisatta ölçüm ve bağlantı işleri ölümcül elektrik çarpması riski taşır ve yalnızca yetkili kişilerce yapılmalıdır. Bu sayfadaki sonuçlar bilgilendirme amaçlıdır; kablo, şalt malzemesi ve koruma seçimi için bir elektrik mühendisine danışın.`,
    ] },
  ],
  faq: [
    ['Üç faz güç formülü nedir?', `P = √3 × U × I × cos φ. U fazlar arası (hat) gerilimi, I hat akımı, cos φ güç faktörüdür. √3 yaklaşık 1,732'dir. Sonuç watt çıkar; kilowatt için 1000'e bölünür.`],
    ['Trifaze 1 kW kaç amper çeker?', `400 V'ta ve cos φ = 1 iken yaklaşık 1,44 A; cos φ = 0,85 iken yaklaşık 1,70 A çeker. Motorlarda verim de hesaba katıldığında kW başına yaklaşık 2 A kabul edilir.`],
    ['Gerilim olarak 380 mi 400 mü yazmalıyım?', `Türkiye'de alçak gerilim şebekesinin anma değeri 230/400 V'tur; eski tesislerde ve etiketlerde 220/380 V gösterimi görülür. En doğrusu panoda ölçtüğünüz fazlar arası gerilimi yazmaktır.`],
    ['kW ile kVA arasındaki fark nedir?', `kVA görünür güç, kW aktif güçtür. kW = kVA × cos φ. Güç faktörü 1 olan omik yüklerde ikisi eşittir; motorlu yüklerde kW her zaman kVA'dan küçüktür.`],
    ['Yıldız ve üçgen bağlantıda formül değişir mi?', `Hayır. Hat gerilimi ve hat akımı kullanıldığı sürece formül aynıdır. Değişen, sargı başına düşen gerilim ve akımdır; aynı motor üçgen bağlandığında yıldıza göre yaklaşık üç kat güç çeker.`],
    ['Reaktif güç neden önemli?', `İş yapmadığı hâlde akım çektiği için kabloları ve trafoyu yükler. Güç faktörü düşük tesislerde kompanzasyon panosuyla reaktif güç yerinde karşılanır; böylece şebekeden çekilen akım azalır.`],
    ['Dengesiz yükte bu hesap doğru mu?', `Tam doğru olmaz. Fazlardan farklı akımlar geçiyorsa her faz için faz gerilimi × akım × cos φ hesaplanıp toplanmalıdır. Araç üç fazın eşit yüklendiğini varsayar.`],
    ['Girdiğim değerler bir yere gönderiliyor mu?', `Hayır. Hesap tarayıcınızda yapılır; hiçbir veri sunucuya iletilmez ve saklanmaz.`],
  ],
  related: ['kw-amper-cevir', 'kva-kw-cevir', 'guc-faktoru-hesapla', 'kablo-kesiti-hesapla', 'motor-guc-tork-hesapla', 'gerilim-dusumu-hesapla'],
};
