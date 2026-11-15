export default {
  slug: 'aci-hizi-hesapla',
  title: 'Açısal Hız Hesaplama',
  h1Tail: 'rad/s, devir/dakika, frekans ve periyot',
  pageTitle: 'Açısal Hız Hesaplama – rad/s, Devir/Dakika, Frekans ve Periyot',
  description: 'Açısal hızı devir/dakika, frekans, periyot, taranan açı ya da çizgisel hızdan hesaplayın; rad/s, derece/s, dev/dk karşılıklarını ve çizgisel hızı birlikte görün.',
  card: 'Devir/dakika, frekans, periyot ya da çizgisel hızdan açısal hızı rad/s olarak bulun; tüm karşılıkları birlikte görün.',
  category: 'bilim',
  keywords: ['açısal hız hesaplama', 'açısal hız formülü', 'rad/s hesaplama', 'devir dakika rad/s çevirme', 'rpm rad/s', 'omega hesaplama', 'periyot frekans açısal hız', 'çizgisel hız açısal hız'],
  lead: 'Dönen bir cismin açısal hızını (ω) elinizdeki bilgiye göre hesaplayın: devir sayısı, frekans, periyot, taranan açı ve süre ya da çizgisel hız ve yarıçap. Sonuç <strong>rad/s</strong>, derece/saniye ve devir/dakika olarak, frekans ve periyotla birlikte verilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Bilinen büyüklük', type: 'select', options: [['rpm', 'Devir sayısı (devir/dakika)'], ['frekans', 'Frekans (Hz)'], ['periyot', 'Periyot (saniye)'], ['aci', 'Taranan açı (derece) ve süre'], ['cizgisel', 'Çizgisel hız (m/s) ve yarıçap']] },
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 3000', hint: 'Seçtiğiniz büyüklüğün değeri: dev/dk, Hz, saniye, derece ya da m/s.' },
    { id: 'sure', label: 'Süre (saniye)', type: 'number', placeholder: 'Örn. 2', hint: 'Yalnızca "taranan açı ve süre" seçeneğinde gerekir.' },
    { id: 'yaricap', label: 'Yarıçap (metre)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Çizgisel hız seçeneğinde zorunlu; diğerlerinde doldurursanız çizgisel hız ve merkezcil ivme de hesaplanır.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const ikiPi = 2 * Math.PI;
    let w;
    let r = null;
    if (v.mod === 'cizgisel') {
      const hiz = h.pos(v.deger, 'Çizgisel hız');
      r = h.pos(v.yaricap, 'Yarıçap');
      w = hiz / r;
    } else {
      if (v.mod === 'frekans') w = ikiPi * h.pos(v.deger, 'Frekans');
      else if (v.mod === 'periyot') w = ikiPi / h.pos(v.deger, 'Periyot');
      else if (v.mod === 'aci') {
        const aci = h.pos(v.deger, 'Taranan açı');
        if (!dolu(v.sure)) h.err('Taranan açıdan hesap için "Süre" alanını da doldurun.');
        w = (aci * Math.PI / 180) / h.pos(v.sure, 'Süre');
      } else w = h.pos(v.deger, 'Devir sayısı') * ikiPi / 60;
      if (dolu(v.yaricap)) r = h.pos(v.yaricap, 'Yarıçap');
    }
    const f = w / ikiPi;
    const rows = [
      ['Açısal hız', h.sig(w) + ' rad/s'],
      ['Derece/saniye', h.sig(w * 180 / Math.PI) + ' °/s'],
      ['Devir/dakika', h.sig(f * 60) + ' dev/dk'],
      ['Frekans', h.sig(f) + ' Hz'],
      ['Periyot', h.sig(1 / f) + ' s'],
    ];
    if (r !== null) {
      rows.push(['Çizgisel hız', h.sig(w * r) + ' m/s']);
      rows.push(['Çizgisel hız (km/saat)', h.sig(w * r * 3.6) + ' km/saat']);
      rows.push(['Merkezcil ivme', h.sig(w * w * r) + ' m/s²']);
    }
    return {
      rows,
      note: 'Dönmenin düzgün (sabit hızlı) olduğu varsayılır. Taranan açıdan yapılan hesap ortalama açısal hızı verir.',
    };
  },
  cases: [
    { in: { mod: 'rpm', deger: '3000' }, out: { 'Açısal hız': '314,159 rad/s', 'Frekans': '50 Hz', 'Periyot': '0,02 s' } },
    { in: { mod: 'periyot', deger: '2' }, out: { 'Açısal hız': '3,14159 rad/s', 'Frekans': '0,5 Hz', 'Devir/dakika': '30 dev/dk' } },
    { in: { mod: 'rpm', deger: '60' }, out: { 'Açısal hız': '6,28319 rad/s', 'Derece/saniye': '360 °/s', 'Frekans': '1 Hz', 'Periyot': '1 s' } },
    { in: { mod: 'frekans', deger: '50' }, out: { 'Açısal hız': '314,159 rad/s', 'Devir/dakika': '3.000 dev/dk' } },
    { in: { mod: 'aci', deger: '360', sure: '2' }, out: { 'Açısal hız': '3,14159 rad/s', 'Derece/saniye': '180 °/s' } },
    { in: { mod: 'cizgisel', deger: '10', yaricap: '2' }, out: { 'Açısal hız': '5 rad/s', 'Devir/dakika': '47,7465 dev/dk', 'Merkezcil ivme': '50 m/s²' } },
    { in: { mod: 'periyot', deger: '86400' }, out: { 'Açısal hız': '0,0000727221 rad/s' } },
    { in: { mod: 'rpm', deger: '60', yaricap: '0,5' }, out: { 'Çizgisel hız': '3,14159 m/s', 'Merkezcil ivme': '19,7392 m/s²' } },
    { in: { mod: 'periyot', deger: '0' }, error: true },
    { in: { mod: 'aci', deger: '90', sure: '' }, error: true },
    { in: { mod: 'cizgisel', deger: '10', yaricap: '' }, error: true },
  ],
  howto: [
    '"Bilinen büyüklük" listesinden elinizdeki veriyi seçin: devir/dakika, frekans, periyot, taranan açı ya da çizgisel hız.',
    '"Değer" kutusuna bu büyüklüğü yazın. Örneğin bir motor için 3000 (dev/dk), bir pikap için 33,3 ya da saniyede bir tur atan cisim için periyot olarak 1.',
    'Taranan açı seçeneğinde açıyı derece olarak yazıp "Süre" kutusunu doldurun; çizgisel hız seçeneğinde "Yarıçap" kutusu zorunludur.',
    'Çizgisel hızı ve merkezcil ivmeyi de görmek istiyorsanız diğer seçeneklerde de yarıçapı metre olarak girin.',
    '"Hesapla" düğmesine basın; açısal hız tüm birim karşılıklarıyla birlikte listelenir.',
  ],
  sections: [
    { h: 'Açısal hız nedir?', p: [
      'Açısal hız, dönen bir cismin birim zamanda taradığı açıdır ve Yunan harfi omega (ω) ile gösterilir. Uluslararası birim sisteminde birimi saniyede radyandır (rad/s). Bir tam dönüş 2π radyan, yani yaklaşık 6,283 radyan olduğundan, saniyede bir tur atan cismin açısal hızı 2π rad/s eder.',
      'Açısal hızın en kullanışlı yanı, katı bir cismin bütün noktaları için aynı olmasıdır. Dönen bir tekerleğin jantındaki bir nokta ile lastiğin dış yüzeyindeki bir nokta aynı sürede aynı açıyı tarar; ancak dıştaki nokta daha uzun bir yol kat ettiği için çizgisel hızı daha büyüktür. Bu ayrım, dişli sistemlerinden dönme dolaplara kadar pek çok problemin anahtarıdır.',
    ] },
    { h: 'Formüller', ul: [
      '<strong>ω = Δθ/Δt</strong> — taranan açının (radyan) geçen süreye oranı',
      '<strong>ω = 2π·f</strong> — frekanstan (Hz) açısal hız',
      '<strong>ω = 2π/T</strong> — periyottan (saniye) açısal hız',
      '<strong>ω = 2π·n/60</strong> — dakikadaki devir sayısından (n) açısal hız',
      '<strong>ω = v/r</strong> — çizgisel hız ve yarıçaptan açısal hız',
    ], p: [
      'Dereceyi radyana çevirmek için π/180 ile çarpılır; 180° = π rad, 360° = 2π rad\'dır. Frekans ile periyot birbirinin tersidir (f = 1/T). Araç, hangi büyüklükten başlarsanız başlayın bu bağıntıları kullanarak diğerlerinin tümünü hesaplar.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Elektrik motoru:</strong> Dakikada 3000 devir yapan bir motorun açısal hızı ω = 2π × 3000/60 = 100π ≈ <strong>314,159 rad/s</strong> olur. Bu motor saniyede 50 tur atar (50 Hz) ve bir turu 0,02 saniyede tamamlar.',
      '<strong>Periyottan:</strong> Bir turu 2 saniyede tamamlayan dönme dolabın açısal hızı ω = 2π/2 = π ≈ <strong>3,14159 rad/s</strong>, frekansı 0,5 Hz, devir sayısı 30 dev/dk\'dır. Aynı sonuç, 2 saniyede 360° tarayan bir cisim için açı ve süre girilerek de bulunur: saniyede 180°.',
      '<strong>Çizgisel hızdan:</strong> Yarıçapı 2 m olan bir pistte 10 m/s hızla dönen cismin açısal hızı ω = 10/2 = <strong>5 rad/s</strong>, devir sayısı yaklaşık 47,75 dev/dk, merkezcil ivmesi ω²·r = 25 × 2 = 50 m/s² olur.',
      '<strong>Dünya\'nın dönüşü:</strong> Periyot olarak 86.400 saniye (24 saat) girildiğinde açısal hız yaklaşık 0,0000727 rad/s çıkar. Bu kadar küçük bir açısal hız, Dünya\'nın büyük yarıçapı nedeniyle ekvatorda saniyede yüzlerce metrelik bir çizgisel hıza karşılık gelir.',
    ] },
    { h: 'Açısal hız ile çizgisel hız arasındaki ilişki', p: [
      'Dönme eksenine r uzaklığındaki bir noktanın çizgisel (teğetsel) hızı <strong>v = ω·r</strong> bağıntısıyla bulunur. Açısal hız sabitken yarıçap büyüdükçe çizgisel hız doğru orantılı artar. Atlıkarıncada dış sıradaki atların daha hızlı gitmesi ya da uzun bir matkap ucunun kenarının merkezinden daha hızlı kesmesi bu yüzdendir.',
      'Dakikada 60 devir yapan, yarıçapı 0,5 m olan bir tekerlek için ω = 2π ≈ 6,28319 rad/s ve kenardaki noktanın hızı v = 6,28319 × 0,5 ≈ 3,14 m/s olur. Aynı noktaya etki eden merkezcil ivme a = ω²·r ≈ 19,74 m/s², yani yer çekimi ivmesinin yaklaşık iki katıdır. Yarıçap kutusunu doldurduğunuzda araç bu iki değeri de verir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '1 dev/dk = 0,10472 rad/s = 6 °/s',
      '1 rad/s = 9,5493 dev/dk = 57,2958 °/s',
      '1 Hz = 60 dev/dk = 6,28319 rad/s',
      'Saatin saniye ibresi: 1 dev/dk = 0,10472 rad/s',
      'Saatin dakika ibresi: periyot 3600 s, yaklaşık 0,001745 rad/s',
      '1500 dev/dk = 157,08 rad/s; 3000 dev/dk = 314,159 rad/s',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata dev/dk değerini doğrudan rad/s gibi kullanmaktır; aradaki çarpan 2π/60, yani yaklaşık 0,1047\'dir. İkinci hata, v = ω·r bağıntısında açısal hızı derece/saniye olarak bırakmaktır; bu bağıntı yalnızca radyan ile doğru sonuç verir. Üçüncüsü yarıçap yerine çapın kullanılmasıdır. Ayrıca açısal frekans ile frekans karıştırılmamalıdır: ikisi de saniyenin tersi boyutundadır, ancak aralarında 2π çarpanı vardır.',
      'Araç düzgün dairesel hareketi, yani sabit açısal hızı varsayar. Hızlanan ya da yavaşlayan dönmede hesaplanan değer, verilen süredeki ortalama açısal hızdır; anlık değer için açısal ivme bilgisi gerekir. Yön bilgisi (saat yönü ya da tersi) hesaba katılmaz; sonuç büyüklük olarak verilir.',
    ] },
  ],
  faq: [
    ['Açısal hız formülü nedir?', 'Temel tanım ω = Δθ/Δt\'dir. Düzgün dönmede ω = 2π·f = 2π/T olarak da yazılır. Çizgisel hız ve yarıçap biliniyorsa ω = v/r kullanılır. Birimi rad/s\'dir.'],
    ['Devir/dakika rad/s\'ye nasıl çevrilir?', 'Devir sayısı 2π ile çarpılıp 60\'a bölünür; kısaca 0,10472 ile çarpılır. Örneğin 3000 dev/dk yaklaşık 314,16 rad/s, 1500 dev/dk yaklaşık 157,08 rad/s eder.'],
    ['Açısal hız ile çizgisel hız arasındaki fark nedir?', 'Açısal hız birim zamanda taranan açıyı, çizgisel hız birim zamanda alınan yolu ölçer. Dönen katı bir cismin her noktasında açısal hız aynıdır; çizgisel hız ise eksene uzaklıkla artar: v = ω·r.'],
    ['Açısal hız ile açısal frekans aynı şey midir?', 'Düzgün dairesel harekette sayısal olarak aynıdır ve ikisi de ω = 2π·f ile verilir. Açısal frekans terimi daha çok titreşim ve dalga hareketlerinde kullanılır.'],
    ['Radyan neden kullanılır?', 'Radyan, yay uzunluğunun yarıçapa oranı olarak tanımlandığından boyutsuzdur ve v = ω·r, a = ω²·r gibi bağıntıların ek çarpan olmadan yazılmasını sağlar. Derece kullanılırsa her formüle π/180 çarpanı eklemek gerekir.'],
    ['Dünya\'nın açısal hızı ne kadardır?', '24 saatlik (86.400 saniye) bir dönüş için yaklaşık 7,27 × 10^-5 rad/s\'dir. Yıldızlara göre gerçek dönme süresi biraz daha kısa olduğundan kesin değer bunun çok az üzerindedir.'],
    ['Yarıçap değişirse açısal hız değişir mi?', 'Aynı katı cisim üzerinde hayır; tüm noktalar aynı açısal hızla döner. Ancak çizgisel hız sabit tutulursa (örneğin kayışla bağlı kasnaklarda) küçük yarıçaplı kasnak daha büyük açısal hızla döner.'],
    ['Girdiğim veriler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler bir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['merkezcil-kuvvet-hesapla', 'eylemsizlik-momenti-hesapla', 'tork-hesapla', 'sarkac-periyodu-hesapla', 'dalga-boyu-frekans-hesapla'],
};
