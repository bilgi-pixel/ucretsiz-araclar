export default {
  slug: 'empedans-hesapla',
  title: 'Empedans Hesaplama',
  h1Tail: 'seri RLC devresi',
  pageTitle: 'Empedans Hesaplama – Seri RLC Devresinde Z, Faz Açısı ve Cos φ',
  description: 'Direnç, frekans, endüktans ve kapasite değerlerinden seri RL, RC ve RLC devresinin empedansını, reaktanslarını, faz açısını, güç faktörünü ve akımını hesaplayın.',
  card: 'Seri RL, RC ya da RLC devresinin empedansını, faz açısını ve güç faktörünü hesaplayın; gerilim girerseniz akım ve güç de çıkar.',
  category: 'elektrik',
  keywords: ['empedans hesaplama', 'rlc devresi empedans', 'empedans formülü', 'faz açısı hesaplama', 'seri rlc hesaplama', 'rl devresi empedans', 'rc devresi empedans', 'z hesaplama'],
  lead: 'Seri bağlı direnç, bobin ve kondansatörden oluşan bir alternatif akım devresinin <strong>empedansını (Z)</strong> hesaplayın. Araç reaktansları, faz açısını ve güç faktörünü verir; kaynak gerilimini yazarsanız devre akımını ve harcanan aktif gücü de bulur.',
  button: 'Hesapla',
  inputs: [
    { id: 'direnc', label: 'Direnç R (Ω)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'frekans', label: 'Frekans (Hz)', type: 'number', value: '50' },
    { id: 'enduktans', label: 'Endüktans L (mH)', type: 'number', placeholder: 'Yoksa boş bırakın' },
    { id: 'kapasite', label: 'Kapasite C (µF)', type: 'number', placeholder: 'Yoksa boş bırakın' },
    { id: 'gerilim', label: 'Kaynak gerilimi (V, etkin)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız akım ve aktif güç de hesaplanır.' },
  ],
  compute(v, h) {
    const dolu = (s) => String(s ?? '').trim() !== '';
    const R = dolu(v.direnc) ? h.nonneg(v.direnc, 'Direnç R') : 0;
    const lVar = dolu(v.enduktans), cVar = dolu(v.kapasite);
    if (!dolu(v.direnc) && !lVar && !cVar) h.err('Direnç, endüktans ya da kapasite alanlarından en az birini doldurun.');
    let xl = 0, xc = 0;
    if (lVar || cVar) {
      const f = h.pos(v.frekans, 'Frekans');
      const w = 2 * Math.PI * f;
      if (lVar) xl = w * h.pos(v.enduktans, 'Endüktans L') / 1000;
      if (cVar) xc = 1 / (w * h.pos(v.kapasite, 'Kapasite C') * 1e-6);
    }
    const X = xl - xc;
    const Z = Math.hypot(R, X);
    if (!(Z > 0)) h.err('Empedans sıfır çıktı; direnç ya da reaktans değerlerinden en az biri sıfırdan büyük olmalı.');
    const esik = 1e-9 * Math.max(R, xl, xc, 1e-12);
    const net = Math.abs(X) < esik ? 0 : X;
    const faz = Math.atan2(net, R) * 180 / Math.PI;
    const pf = R / Z;
    const ohm = (x) => h.sig(x, 4) + ' Ω';
    const rows = [
      ['Empedans (Z)', ohm(Z)],
      ['Endüktif reaktans (XL)', ohm(xl)],
      ['Kapasitif reaktans (Xc)', ohm(xc)],
      ['Net reaktans (XL − Xc)', ohm(net)],
      ['Faz açısı (φ)', h.fmt(faz, 2) + '°'],
      ['Güç faktörü (cos φ)', h.fmt(pf, 3)],
      ['Devre karakteri', net > 0 ? 'Endüktif (akım gerilimden geride)' : net < 0 ? 'Kapasitif (akım gerilimin önünde)' : 'Omik (akım ve gerilim aynı fazda)'],
    ];
    if (dolu(v.gerilim)) {
      const V = h.pos(v.gerilim, 'Kaynak gerilimi');
      const I = V / Z;
      rows.push(['Akım', h.sig(I, 4) + ' A']);
      rows.push(['Aktif güç', h.fmt(I * I * R, 2) + ' W']);
      rows.push(['Görünür güç', h.fmt(V * I, 2) + ' VA']);
    }
    return { rows, note: 'Elemanların seri bağlı ve ideal olduğu, işaretin sinüs biçimli olduğu varsayılmıştır. Bobinin tel direncini R değerine ekleyebilirsiniz.' };
  },
  cases: [
    { in: { direnc: '30', frekans: '50', enduktans: '127,324', gerilim: '230' }, out: { 'Empedans (Z)': '50 Ω', 'Endüktif reaktans (XL)': '40 Ω', 'Faz açısı (φ)': '53,13°', 'Güç faktörü (cos φ)': '0,6', 'Akım': '4,6 A', 'Aktif güç': '634,8 W', 'Görünür güç': '1.058 VA' } },
    { in: { direnc: '100', frekans: '1000', enduktans: '10', kapasite: '1', gerilim: '10' }, out: { 'Empedans (Z)': '138,8 Ω', 'Endüktif reaktans (XL)': '62,83 Ω', 'Kapasitif reaktans (Xc)': '159,2 Ω', 'Net reaktans (XL − Xc)': '-96,32 Ω', 'Faz açısı (φ)': '-43,93°', 'Güç faktörü (cos φ)': '0,72', 'Akım': '0,07202 A', 'Aktif güç': '0,52 W' } },
    { in: { direnc: '100', frekans: '50', kapasite: '31,831' }, out: { 'Empedans (Z)': '141,4 Ω', 'Kapasitif reaktans (Xc)': '100 Ω', 'Faz açısı (φ)': '-45°', 'Güç faktörü (cos φ)': '0,707', 'Devre karakteri': 'Kapasitif (akım gerilimin önünde)' } },
    { in: { direnc: '50', frekans: '60', enduktans: '100', gerilim: '120' }, out: { 'Empedans (Z)': '62,62 Ω', 'Endüktif reaktans (XL)': '37,7 Ω', 'Faz açısı (φ)': '37,02°', 'Güç faktörü (cos φ)': '0,798', 'Akım': '1,916 A', 'Aktif güç': '183,62 W' } },
    { in: { direnc: '220', frekans: '50', enduktans: '500', kapasite: '10', gerilim: '230' }, out: { 'Empedans (Z)': '272,8 Ω', 'Endüktif reaktans (XL)': '157,1 Ω', 'Kapasitif reaktans (Xc)': '318,3 Ω', 'Faz açısı (φ)': '-36,24°', 'Güç faktörü (cos φ)': '0,807', 'Akım': '0,8432 A', 'Aktif güç': '156,43 W' } },
    { in: { direnc: '0', frekans: '50', enduktans: '100' }, out: { 'Empedans (Z)': '31,42 Ω', 'Faz açısı (φ)': '90°', 'Güç faktörü (cos φ)': '0', 'Devre karakteri': 'Endüktif (akım gerilimden geride)' } },
    { in: { direnc: '47', frekans: '50' }, out: { 'Empedans (Z)': '47 Ω', 'Faz açısı (φ)': '0°', 'Güç faktörü (cos φ)': '1', 'Devre karakteri': 'Omik (akım ve gerilim aynı fazda)' } },
    { in: { direnc: '', frekans: '50' }, error: true },
    { in: { direnc: '30', frekans: '', enduktans: '100' }, error: true },
    { in: { direnc: '-30', frekans: '50', enduktans: '100' }, error: true },
  ],
  howto: [
    'Devredeki direnci ohm olarak yazın. Devrede direnç yoksa 0 girin ya da boş bırakın.',
    'Kaynağın frekansını hertz olarak girin; şebeke için varsayılan 50 Hz değeri hazır gelir.',
    'Bobin varsa endüktansını milihenri, kondansatör varsa kapasitesini mikrofarad olarak yazın. Olmayan elemanın alanını boş bırakın.',
    'Akımı ve gücü de görmek istiyorsanız kaynağın etkin (RMS) gerilimini girin.',
    '"Hesapla" düğmesine basın; empedans, reaktanslar, faz açısı ve güç faktörü listelenir.',
  ],
  sections: [
    { h: 'Empedans nedir?', p: [
      'Empedans, bir devrenin alternatif akıma gösterdiği toplam karşı koymadır ve Z harfiyle gösterilir; birimi ohm\'dur. Doğru akım devresinde yalnızca direnç akımı sınırlar. Alternatif akımda ise bobin ve kondansatörler de frekansa bağlı bir karşı koyma, yani reaktans oluşturur. Empedans, direnç ile reaktansın birleşimidir ve Ohm kanununun alternatif akımdaki karşılığını verir: <strong>I = V ÷ Z</strong>.',
      'Direnç ve reaktans doğrudan toplanamaz, çünkü aralarında 90°\'lik faz farkı vardır. Direnç üzerindeki gerilim akımla aynı fazdadır; bobindeki gerilim akımın 90° önünde, kondansatördeki gerilim ise 90° gerisindedir. Bu yüzden toplama dik üçgendeki gibi, Pisagor bağıntısıyla yapılır.',
    ] },
    { h: 'Seri RLC devresinde formüller', p: [
      'Önce reaktanslar hesaplanır: <strong>X<sub>L</sub> = 2π · f · L</strong> ve <strong>X<sub>C</sub> = 1 ÷ (2π · f · C)</strong>. Net reaktans ikisinin farkıdır: <strong>X = X<sub>L</sub> − X<sub>C</sub></strong>. Empedans: <strong>Z = √(R² + X²)</strong>. Faz açısı: <strong>φ = arctan(X ÷ R)</strong>. Güç faktörü: <strong>cos φ = R ÷ Z</strong>.',
      'Faz açısı pozitifse devre endüktiftir ve akım gerilimden geride kalır; negatifse devre kapasitiftir ve akım gerilimin önündedir. Açı sıfırsa devre saf direnç gibi davranır. Bobin ya da kondansatör alanını boş bırakırsanız araç aynı formülleri RL, RC ya da yalnızca R devresi için uygular.',
    ] },
    { h: 'Çözümlü örnek: RL devresi', p: [
      '30 Ω\'luk bir direnç ile 127,324 mH\'lik bir bobin 50 Hz, 230 V\'luk kaynağa seri bağlanmış olsun. X<sub>L</sub> = 2π × 50 × 0,127324 ≈ 40 Ω bulunur. Empedans Z = √(30² + 40²) = √2500 = 50 Ω\'dur; bu, ders kitaplarındaki 3-4-5 üçgeninin on katıdır.',
      'Faz açısı arctan(40 ÷ 30) ≈ 53,13°, güç faktörü 30 ÷ 50 = 0,6\'dır. Akım 230 ÷ 50 = 4,6 A; aktif güç I² × R = 4,6² × 30 = 634,8 W; görünür güç 230 × 4,6 = 1.058 VA olur. Aktif gücün görünür güce oranı yine 0,6\'dır.',
    ] },
    { h: 'Çözümlü örnek: RLC devresi', p: [
      '100 Ω direnç, 10 mH bobin ve 1 µF kondansatör 1 kHz\'lik bir kaynağa seri bağlanırsa X<sub>L</sub> ≈ 62,83 Ω, X<sub>C</sub> ≈ 159,2 Ω olur. Net reaktans 62,83 − 159,2 = −96,32 Ω, empedans √(100² + 96,32²) ≈ 138,8 Ω\'dur. Faz açısı −43,93° çıktığından devre kapasitiftir; güç faktörü 0,72\'dir. 10 V\'luk kaynakta akım yaklaşık 72 mA olur.',
    ] },
    { h: 'Rezonans durumu', p: [
      'X<sub>L</sub> ile X<sub>C</sub> birbirine eşit olduğunda net reaktans sıfırlanır ve empedans en küçük değerine, yani yalnızca R\'ye iner. Bu frekansa rezonans frekansı denir. Seri rezonansta akım en yüksek değerine ulaşır ve bobin ile kondansatörün uçlarındaki gerilimler kaynak geriliminin çok üzerine çıkabilir. Radyo alıcılarındaki istasyon seçimi bu olguya dayanır; güç devrelerinde ise istenmeyen rezonans elemanlara zarar verebilir.',
    ] },
    { h: 'Güç faktörü neden önemlidir?', p: [
      'Güç faktörü, kaynaktan çekilen görünür gücün ne kadarının gerçekten işe dönüştüğünü gösterir. Motor, trafo ve balast gibi endüktif yükler güç faktörünü düşürür; aynı aktif güç için şebekeden daha fazla akım çekilir, kablolar ve trafolar gereksiz yüklenir. İşletmelerde bu durumu düzeltmek için kondansatör grupları (kompanzasyon) kullanılır. Kompanzasyon panosu tasarımı mevzuata ve dağıtım şirketi kurallarına bağlı bir mühendislik işidir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      '<strong>Doğrudan toplamak:</strong> R ile X\'i cebirsel olarak toplamak yanlış sonuç verir; karelerinin toplamının karekökü alınmalıdır.',
      '<strong>Birim karışıklığı:</strong> Endüktans milihenri, kapasite mikrofarad olarak girilmelidir; 100 nF için 0,1 yazın.',
      '<strong>Paralel devre:</strong> Bu araç yalnızca seri bağlantı içindir; paralel RLC devresinde hesap iletkenlikler üzerinden yapılır.',
      '<strong>Tepe değeri kullanmak:</strong> Akım ve güç hesabında gerilimin etkin (RMS) değeri girilmelidir; şebeke için bu 230 V\'tur.',
      '<strong>Bobin direncini unutmak:</strong> Gerçek bobinlerin tel direnci vardır; bu değeri R\'ye eklemek sonucu gerçeğe yaklaştırır.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar ideal elemanlara dayalı kuramsal değerlerdir ve bilgilendirme amaçlıdır. Şebeke gerilimiyle çalışan devrelerde deneme yapmak hayati tehlike taşır; tasarım, eleman seçimi ve güvenlik için yetkili bir elektrik-elektronik mühendisine danışın.',
    ] },
  ],
  faq: [
    ['Empedans formülü nedir?', 'Seri devrede Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²) formülü kullanılır. R direnç, X<sub>L</sub> endüktif reaktans, X<sub>C</sub> kapasitif reaktanstır ve hepsi ohm cinsindendir.'],
    ['Empedans ile direnç arasındaki fark nedir?', 'Direnç frekanstan bağımsızdır ve enerjiyi ısıya çevirir. Empedans ise direncin yanında bobin ve kondansatörün frekansa bağlı reaktansını da içerir. Devrede yalnızca direnç varsa empedans dirence eşittir.'],
    ['Faz açısının eksi çıkması ne demek?', 'Kapasitif reaktansın endüktif reaktanstan büyük olduğunu, yani devrenin kapasitif davrandığını gösterir. Bu durumda akım gerilimin önündedir. Artı açı ise endüktif devreyi ve akımın geride kaldığını ifade eder.'],
    ['Yalnızca bobin ya da yalnızca kondansatör olan devreyi hesaplayabilir miyim?', 'Evet. Dirence 0 yazın ya da boş bırakın ve yalnızca ilgili elemanı girin. Bu durumda empedans reaktansa eşit olur, faz açısı bobin için 90°, kondansatör için −90° çıkar ve güç faktörü sıfırdır.'],
    ['Güç faktörü 1 olursa ne anlama gelir?', 'Net reaktansın sıfır olduğunu, yani devrenin saf direnç gibi davrandığını gösterir. Bu ya devrede bobin ve kondansatör olmadığında ya da rezonans frekansında gerçekleşir. Çekilen görünür gücün tamamı aktif güçtür.'],
    ['Aktif güç neden yalnızca dirence göre hesaplanıyor?', 'İdeal bobin ve kondansatör enerjiyi depolayıp geri verdiği için ortalama güç harcamaz. Isıya ya da işe dönüşen güç yalnızca direnç üzerinde oluşur: P = I² × R. Bu değer V × I × cos φ çarpımına eşittir.'],
    ['Hoparlör empedansı bu hesapla aynı şey mi?', 'Kavram aynıdır, ancak hoparlörün 4 ya da 8 ohm olarak belirtilen değeri anma empedansıdır ve gerçek empedans frekansa göre değişir. Hoparlör, mekanik parçaları nedeniyle basit bir seri RLC devresinden daha karmaşık davranır.'],
    ['Girdiğim devre değerleri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['kapasitif-reaktans-hesapla', 'lc-rezonans-frekansi-hesapla', 'guc-faktoru-hesapla', 'ohm-kanunu-hesapla', 'rc-filtre-kesim-frekansi-hesapla', 'bobin-enduktans-hesapla'],
};
