export default {
  slug: 'gerilim-dusumu-hesapla',
  title: 'Gerilim Düşümü Hesaplama',
  h1Tail: 'kabloda volt ve yüzde kayıp',
  pageTitle: 'Gerilim Düşümü Hesaplama – Kabloda Voltaj Kaybı (V ve %)',
  description: 'Kablo kesiti, uzunluk ve akımdan gerilim düşümünü volt ve yüzde olarak hesaplayın. Hat sonundaki gerilimi, hat direncini ve kabloda kaybolan gücü gösterir.',
  card: 'Kablo kesiti, uzunluk ve akıma göre gerilim düşümünü volt ve yüzde olarak, kablodaki güç kaybıyla birlikte hesaplayın.',
  category: 'elektrik',
  keywords: ['gerilim düşümü hesaplama', 'voltaj düşümü hesaplama', 'kabloda gerilim kaybı', 'gerilim düşümü formülü', 'yüzde gerilim düşümü', 'trifaze gerilim düşümü', 'kablo güç kaybı'],
  lead: 'Belirli bir kesitteki kablonun üzerinde <strong>kaç volt kaybolduğunu</strong> hesaplayın. Sistemi, gerilimi, akımı, hat uzunluğunu ve kesiti girin; araç düşümü volt ve yüzde olarak, hat sonunda kalan gerilimi ve kabloda ısıya dönüşen gücü verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sistem', label: 'Sistem', type: 'select', options: [['tek', 'Tek faz (AC)'], ['uc', 'Üç faz (AC)'], ['dc', 'Doğru akım (DC)']] },
    { id: 'gerilim', label: 'Gerilim (V)', type: 'number', value: '230', hint: 'Tek fazda faz-nötr (230), üç fazda faz-faz (400), DC\'de kaynak gerilimi.' },
    { id: 'akim', label: 'Akım (A)', type: 'number', placeholder: 'Örn. 16' },
    { id: 'uzunluk', label: 'Hat uzunluğu (m, tek yön)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'kesit', label: 'Kablo kesiti (mm²)', type: 'number', placeholder: 'Örn. 2,5' },
    { id: 'malzeme', label: 'İletken', type: 'select', options: [['cu', 'Bakır'], ['al', 'Alüminyum']] },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '1', hint: 'Omik yüklerde 1; motorlarda etiket değeri. DC\'de dikkate alınmaz.' },
    { id: 'sinir', label: 'Karşılaştırma sınırı (%, isteğe bağlı)', type: 'number', value: '3' },
  ],
  compute(v, h) {
    const sistem = ['tek', 'uc', 'dc'].includes(v.sistem) ? v.sistem : 'tek';
    const u = h.pos(v.gerilim, 'Gerilim');
    const i = h.pos(v.akim, 'Akım');
    const l = h.pos(v.uzunluk, 'Hat uzunluğu');
    const s = h.pos(v.kesit, 'Kablo kesiti');
    let cosfi = 1;
    if (sistem !== 'dc') {
      cosfi = h.pos(v.cosfi, 'Güç faktörü');
      if (cosfi > 1) h.err('"Güç faktörü" 0 ile 1 arasında olmalı (örn. 0,85).');
    }
    const iletkenlik = v.malzeme === 'al' ? 35 : 56;
    const tekIletken = l / (iletkenlik * s);
    const ucFaz = sistem === 'uc';
    const dusum = (ucFaz ? Math.sqrt(3) : 2) * tekIletken * i * cosfi;
    if (dusum >= u) h.err('Hesaplanan gerilim düşümü kaynak gerilimine eşit ya da ondan büyük; bu kesit ve uzunlukla bu akım taşınamaz. Kesiti büyütün ya da değerleri kontrol edin.');
    const yuzde = (dusum / u) * 100;
    const kayip = (ucFaz ? 3 : 2) * i * i * tekIletken;
    const rows = [
      ['Gerilim düşümü', h.fmt(dusum, 3) + ' V'],
      ['Gerilim düşümü yüzdesi', '%' + h.fmt(yuzde, 2)],
      ['Hat sonundaki gerilim', h.fmt(u - dusum, 2) + ' V'],
      [ucFaz ? 'Faz iletkeni direnci' : 'Hat direnci (gidiş + dönüş)', h.fmt(ucFaz ? tekIletken : 2 * tekIletken, 4) + ' Ω'],
      ['Kabloda kaybolan güç', h.fmt(kayip, 2) + ' W'],
    ];
    const sinir = h.opt(v.sinir, null, 'Karşılaştırma sınırı');
    if (sinir !== null) {
      if (!(sinir > 0)) h.err('"Karşılaştırma sınırı" sıfırdan büyük olmalı ya da boş bırakılmalı.');
      rows.push(['Sınırla karşılaştırma', yuzde <= sinir + 1e-9 ? `%${h.fmt(sinir, 2)} sınırının içinde` : `%${h.fmt(sinir, 2)} sınırı aşılıyor`]);
    }
    return { rows, note: 'Yalnızca iletkenin omik direnci dikkate alınır (bakır 56, alüminyum 35 m/Ω·mm²). Sıcaklık artışı, reaktans ve bağlantı noktalarındaki kayıplar gerçek düşümü artırabilir.' };
  },
  cases: [
    { in: { sistem: 'tek', gerilim: '230', akim: '16', uzunluk: '30', kesit: '2,5', malzeme: 'cu', cosfi: '1', sinir: '3' }, out: { 'Gerilim düşümü': '6,857 V', 'Gerilim düşümü yüzdesi': '%2,98', 'Hat sonundaki gerilim': '223,14 V', 'Hat direnci (gidiş + dönüş)': '0,4286 Ω', 'Kabloda kaybolan güç': '109,71 W', 'Sınırla karşılaştırma': '%3 sınırının içinde' } },
    { in: { sistem: 'dc', gerilim: '12', akim: '10', uzunluk: '5', kesit: '6', malzeme: 'cu', sinir: '3' }, out: { 'Gerilim düşümü': '0,298 V', 'Gerilim düşümü yüzdesi': '%2,48', 'Hat sonundaki gerilim': '11,7 V', 'Hat direnci (gidiş + dönüş)': '0,0298 Ω', 'Kabloda kaybolan güç': '2,98 W' } },
    { in: { sistem: 'uc', gerilim: '400', akim: '32', uzunluk: '50', kesit: '6', malzeme: 'cu', cosfi: '0,8', sinir: '3' }, out: { 'Gerilim düşümü': '6,598 V', 'Gerilim düşümü yüzdesi': '%1,65', 'Faz iletkeni direnci': '0,1488 Ω', 'Kabloda kaybolan güç': '457,14 W' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '40', uzunluk: '100', kesit: '25', malzeme: 'al', cosfi: '1', sinir: '3' }, out: { 'Gerilim düşümü': '9,143 V', 'Gerilim düşümü yüzdesi': '%3,98', 'Hat direnci (gidiş + dönüş)': '0,2286 Ω', 'Kabloda kaybolan güç': '365,71 W', 'Sınırla karşılaştırma': '%3 sınırı aşılıyor' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '10', uzunluk: '20', kesit: '1,5', malzeme: 'cu', cosfi: '1', sinir: '' }, out: { 'Gerilim düşümü': '4,762 V', 'Gerilim düşümü yüzdesi': '%2,07', 'Hat sonundaki gerilim': '225,24 V' } },
    { in: { sistem: 'dc', gerilim: '24', akim: '20', uzunluk: '10', kesit: '10', malzeme: 'cu', sinir: '3' }, out: { 'Gerilim düşümü': '0,714 V', 'Gerilim düşümü yüzdesi': '%2,98', 'Kabloda kaybolan güç': '14,29 W' } },
    { in: { sistem: 'tek', gerilim: '230', akim: '16', uzunluk: '30', kesit: '0', malzeme: 'cu', cosfi: '1' }, error: true },
    { in: { sistem: 'dc', gerilim: '12', akim: '100', uzunluk: '50', kesit: '1', malzeme: 'cu' }, error: true },
    { in: { sistem: 'tek', gerilim: '230', akim: 'x', uzunluk: '30', kesit: '2,5', malzeme: 'cu', cosfi: '1' }, error: true },
    { in: { sistem: 'uc', gerilim: '400', akim: '32', uzunluk: '50', kesit: '6', malzeme: 'cu', cosfi: '0' }, error: true },
  ],
  howto: [
    'Sistemi seçin ve gerilimi yazın: tek fazda 230 V, üç fazda faz-faz 400 V, doğru akımda akü ya da kaynak gerilimi.',
    'Hattan geçen akımı amper olarak girin. Akımı bilmiyorsanız gücü gerilime bölerek yaklaşık değeri bulabilirsiniz (tek faz omik yükte I = P ÷ U).',
    'Kaynaktan yüke kadar olan mesafeyi tek yön olarak metre cinsinden, kullanılan kablonun kesitini mm² olarak yazın.',
    'İletken malzemesini seçin; alternatif akımda yükün güç faktörünü girin ya da 1 bırakın.',
    'İsterseniz sonucu kıyaslamak için bir yüzde sınırı yazın ve "Hesapla" düğmesine basın.',
    'Düşüm sınırı aşıyorsa kesiti bir üst standart değere çıkarıp yeniden hesaplayın.',
  ],
  sections: [
    { h: 'Gerilim düşümü nedir, neden önemlidir?', p: [
      'Her iletkenin küçük de olsa bir direnci vardır. Üzerinden akım geçtiğinde Ohm kanunu gereği bu direncin üzerinde bir gerilim kalır; kaynaktan çıkan gerilimin bir kısmı yüke ulaşamadan kabloda harcanır. Kaynak ile yük uçları arasındaki bu farka gerilim düşümü denir. Kablo ne kadar uzun, ne kadar ince ve akım ne kadar yüksekse düşüm o kadar büyür.',
      'Düşümün iki sonucu vardır. Birincisi, yük anma geriliminin altında çalışır: motorlar zor kalkar ve daha çok ısınır, ısıtıcıların gücü belirgin biçimde azalır, elektronik cihazlar kapanabilir, doğru akımlı LED aydınlatmada hattın sonundaki ışıklar daha sönük yanar. İkincisi, kabloda kalan gerilim akımla çarpılarak ısıya dönüşür; bu hem enerji kaybı hem de kablonun ısınması demektir.',
    ] },
    { h: 'Gerilim düşümü formülü', p: [
      'Bir iletkenin direnci <strong>R = L ÷ (κ × S)</strong> bağıntısıyla bulunur; L uzunluk (m), S kesit (mm²), κ öz iletkenliktir (bakır için 56, alüminyum için 35 m/(Ω·mm²) alınır).',
      'Tek fazlı alternatif akımda ve doğru akımda akım gidiş ve dönüş iletkenlerinin ikisinden de geçer: <strong>ΔU = 2 × L × I × cos φ ÷ (κ × S)</strong>. Üç fazlı dengeli sistemde faz-faz gerilimindeki düşüm <strong>ΔU = √3 × L × I × cos φ ÷ (κ × S)</strong> olur. Yüzde değer, düşümün sistem gerilimine bölünüp 100 ile çarpılmasıyla elde edilir.',
      'Kabloda kaybolan güç güç faktöründen bağımsızdır ve iletken sayısına göre hesaplanır: tek faz ve doğru akımda <strong>P = 2 × I² × R</strong>, üç fazda <strong>P = 3 × I² × R</strong>; burada R tek bir iletkenin direncidir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Tek faz priz hattı:</strong> 230 V, 16 A, 30 metre, 2,5 mm² bakır. Tek iletken direnci 30 ÷ (56 × 2,5) = 0,2143 Ω, gidiş-dönüş 0,4286 Ω. Düşüm 16 × 0,4286 = 6,857 V; yüzde olarak 6,857 ÷ 230 = yüzde 2,98. Hat sonunda 223,14 V kalır. Kabloda 16² × 0,4286 = 109,71 W ısıya dönüşür.',
      '<strong>12 V akü hattı:</strong> 10 A, 5 metre, 6 mm² bakır. Hat direnci 2 × 5 ÷ (56 × 6) = 0,0298 Ω, düşüm 0,298 V (yüzde 2,48), yükte 11,7 V kalır. Aynı hat 1,5 mm² kabloyla çekilseydi düşüm 1,19 V, yani yaklaşık yüzde 10 olurdu.',
      '<strong>Üç faz motor hattı:</strong> 400 V, 32 A, cos φ 0,8, 50 metre, 6 mm² bakır. Faz iletkeni direnci 50 ÷ (56 × 6) = 0,1488 Ω. Düşüm 1,732 × 32 × 0,8 × 0,1488 = 6,598 V, yüzde 1,65. Üç iletkende toplam kayıp 3 × 32² × 0,1488 = 457,14 W\'tır.',
    ] },
    { h: 'Düşümü azaltmanın yolları', ul: [
      '<strong>Kesiti büyütmek:</strong> en doğrudan yöntem. Kesit iki katına çıkarsa düşüm yarıya iner.',
      '<strong>Hattı kısaltmak:</strong> kaynağı ya da panoyu yüke yaklaştırmak, kabloyu gereksiz dolaştırmamak.',
      '<strong>Gerilimi yükseltmek:</strong> aynı güç daha yüksek gerilimde daha düşük akımla taşınır. Güneş enerjisi ve akü sistemlerinde 12 V yerine 24 ya da 48 V seçilmesinin başlıca nedeni budur; gerilim iki katına çıkınca yüzde düşüm dörtte bire iner.',
      '<strong>Yükü bölmek:</strong> büyük bir yükü tek hat yerine ayrı hatlarla beslemek.',
      '<strong>Bağlantıları sağlam yapmak:</strong> gevşek klemens ve oksitlenmiş bağlantılar hesaba girmeyen ek direnç yaratır.',
    ] },
    { h: 'Hesabın sınırları', p: [
      'Araç yalnızca iletkenin omik direncini kullanır ve iletkenlik değerlerini yaklaşık 20 °C için alır. Yük altında ısınan kablonun direnci artar; çalışma sıcaklığında gerçek düşüm hesaplanandan bir miktar yüksek çıkabilir. Büyük kesitli ve uzun alternatif akım hatlarında kablonun endüktif reaktansı, düşük güç faktöründe düşümü belirgin biçimde artırır; bu durumlarda reaktansı da içeren ayrıntılı hesap yapılmalıdır. Üç faz formülü dengeli yük varsayar.',
      'Motorların kalkış anında çektiği akım anma akımının birkaç katı olabilir; kalkıştaki anlık düşümü görmek için akım alanına kalkış akımını yazıp ayrıca hesaplayabilirsiniz.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar bilgilendirme amaçlıdır. İzin verilen gerilim düşümü sınırları tesisin türüne göre yürürlükteki yönetmelik ve standartlarla belirlenir; karşılaştırma alanındaki yüzde 3 yalnızca bir örnek değerdir, güncel mevzuatı kontrol edin. Gerilim düşümünün uygun çıkması kablonun o akımı güvenle taşıyabileceği anlamına gelmez; akım taşıma kapasitesi ve koruma elemanı ayrıca değerlendirilmelidir. Tesisat tasarımı ve uygulaması için yetkili bir elektrik mühendisine ya da ehliyetli elektrikçiye danışın.',
    ] },
  ],
  faq: [
    ['Gerilim düşümü nasıl hesaplanır?', 'Tek faz ve doğru akımda ΔU = 2 × L × I × cos φ ÷ (κ × S), üç fazda 2 yerine kök üç kullanılır. L tek yön uzunluk, S kesit, κ bakır için 56, alüminyum için 35\'tir.'],
    ['Yüzde gerilim düşümü nasıl bulunur?', 'Volt cinsinden düşüm sistem gerilimine bölünür ve 100 ile çarpılır. 230 V\'ta 6,857 V düşüm yüzde 2,98 eder.'],
    ['Kabul edilebilir gerilim düşümü yüzde kaçtır?', 'Tesisin ve devrenin türüne göre değişir ve yönetmeliklerle belirlenir. Uygulamada yüzde birkaç düzeyinde sınırlar kullanılır; kesin değer için güncel mevzuata ve proje şartnamesine bakın.'],
    ['Hat uzunluğu olarak neyi yazmalıyım?', 'Kaynaktan yüke kadar olan tek yön kablo güzergâhı uzunluğunu. Dönüş iletkeni formülde ayrıca hesaba katılır.'],
    ['Kabloda kaybolan güç neyi gösterir?', 'İletkenlerde ısıya dönüşen gücü. Sürekli çalışan hatlarda bu kayıp elektrik faturasına yansır ve kablonun ısınmasına neden olur.'],
    ['Düşük gerilimli sistemlerde düşüm neden daha büyük sorun?', 'Aynı güç için akım yüksek, tolerans ise volt olarak küçüktür. 12 V\'luk bir sistemde 1 V kayıp yüzde 8\'den fazladır; 230 V\'ta aynı 1 V yarım yüzdenin altındadır.'],
    ['Alüminyum kabloda düşüm ne kadar artar?', 'Aynı kesit ve uzunlukta alüminyumun direnci bakırın 56 ÷ 35 = 1,6 katıdır; düşüm de aynı oranda artar.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kablo-kesiti-hesapla', 'awg-mm2-cevir', 'ohm-kanunu-hesapla', 'kw-amper-cevir', 'uc-faz-guc-hesapla'],
};
