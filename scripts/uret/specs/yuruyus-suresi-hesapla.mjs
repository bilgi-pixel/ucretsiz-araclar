export default {
  slug: 'yuruyus-suresi-hesapla',
  title: 'Yürüyüş Süresi ve Mesafe Hesaplama',
  h1Tail: 'kaç dakikada yürünür, kaç km eder?',
  pageTitle: 'Yürüyüş Süresi ve Mesafe Hesaplama – Kaç Dakikada Yürünür?',
  description: 'Mesafe ve yürüyüş hızından süreyi, süre ve hızdan mesafeyi hesaplayın. Kilometre başına tempoyu ve adım boyunuza göre tahmini adım sayısını da görün.',
  card: 'Bir mesafenin yürüyerek kaç dakika sürdüğünü ya da belirli sürede kaç kilometre yürüneceğini, tempo ve adım sayısıyla birlikte bulun.',
  category: 'gunluk',
  keywords: ['yürüyüş süresi hesaplama', '1 km kaç dakikada yürünür', '5 km yürüyüş kaç dakika', 'yürüme mesafesi hesaplama', 'yürüyüş temposu', 'kaç adım kaç km', 'yürüme hızı hesaplama'],
  lead: 'İşe, okula ya da metro durağına yürüyerek kaç dakikada varacağınızı; ya da yarım saatlik bir yürüyüşte kaç kilometre yol alacağınızı hesaplayın. Araç <strong>süre = mesafe ÷ hız</strong> ilişkisini kullanır ve sonucun yanında kilometre başına tempoyu ve tahmini adım sayısını verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'mod', label: 'Ne hesaplansın?', type: 'select', options: [['sure', 'Mesafeden süre'], ['mesafe', 'Süreden mesafe']] },
    { id: 'km', label: 'Mesafe (km)', type: 'number', placeholder: 'Örn. 5', hint: '"Mesafeden süre" için doldurun' },
    { id: 'dakika', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 45', hint: '"Süreden mesafe" için doldurun' },
    { id: 'hiz', label: 'Yürüyüş hızı (km/sa)', type: 'number', value: '5', hint: 'Yavaş 3–4, normal 4,5–5, tempolu 5,5–6,5' },
    { id: 'adimBoyu', label: 'Adım boyu (cm, isteğe bağlı)', type: 'number', value: '70' },
  ],
  compute(v, h) {
    const hiz = h.pos(v.hiz, 'Yürüyüş hızı');
    if (hiz > 12) h.err('"Yürüyüş hızı" en fazla 12 km/sa olabilir; bunun üzeri koşu temposudur.');
    let km, dk;
    if (v.mod === 'mesafe') {
      dk = h.pos(v.dakika, 'Süre');
      km = hiz * dk / 60;
    } else {
      km = h.pos(v.km, 'Mesafe');
      dk = km / hiz * 60;
    }
    const toplamDk = Math.round(dk);
    let sure;
    if (toplamDk < 1) sure = '1 dakikadan az';
    else if (toplamDk < 60) sure = `${toplamDk} dk`;
    else sure = `${h.fmt(Math.floor(toplamDk / 60), 0)} saat ${toplamDk % 60} dk`;
    const snKm = Math.round(3600 / hiz);
    const tempo = `${Math.floor(snKm / 60)}:${String(snKm % 60).padStart(2, '0')} dk/km`;
    const mesafeSatir = ['Mesafe', `${h.fmt(km, 2)} km`];
    const sureSatir = ['Yürüyüş süresi', sure];
    const rows = v.mod === 'mesafe' ? [mesafeSatir, sureSatir] : [sureSatir, mesafeSatir];
    rows.push(['Tempo', tempo]);
    rows.push(['Hız', `${h.fmt(hiz, 2)} km/sa (${h.fmt(hiz * 1000 / 60, 1)} m/dk)`]);
    if (String(v.adimBoyu || '').trim() !== '') {
      const adim = h.pos(v.adimBoyu, 'Adım boyu');
      if (adim < 20 || adim > 150) h.err('"Adım boyu" 20 ile 150 cm arasında olmalı.');
      rows.push(['Tahmini adım sayısı', `${h.fmt(Math.round(km * 100000 / adim), 0)} adım`]);
    }
    return {
      rows,
      note: 'Hesap düz zeminde, sabit hızla ve duraksamadan yürüdüğünüzü varsayar. Yokuş, trafik ışıkları, kalabalık ve mola süreleri gerçek süreyi uzatır.',
    };
  },
  cases: [
    { in: { mod: 'sure', km: '5', hiz: '5', adimBoyu: '70' }, out: { 'Yürüyüş süresi': '1 saat 0 dk', 'Mesafe': '5 km', 'Tempo': '12:00 dk/km', 'Tahmini adım sayısı': '7.143 adım' } },
    { in: { mod: 'mesafe', dakika: '45', hiz: '6', adimBoyu: '70' }, out: { 'Mesafe': '4,5 km', 'Yürüyüş süresi': '45 dk', 'Tempo': '10:00 dk/km', 'Hız': '6 km/sa (100 m/dk)', 'Tahmini adım sayısı': '6.429 adım' } },
    { in: { mod: 'sure', km: '3', hiz: '4,5', adimBoyu: '70' }, out: { 'Yürüyüş süresi': '40 dk', 'Tempo': '13:20 dk/km', 'Hız': '4,5 km/sa (75 m/dk)' } },
    { in: { mod: 'sure', km: '10', hiz: '5,5', adimBoyu: '' }, out: { 'Yürüyüş süresi': '1 saat 49 dk', 'Tempo': '10:55 dk/km' } },
    { in: { mod: 'mesafe', dakika: '30', hiz: '5', adimBoyu: '75' }, out: { 'Mesafe': '2,5 km', 'Tahmini adım sayısı': '3.333 adım' } },
    { in: { mod: 'sure', km: '1,2', hiz: '4', adimBoyu: '70' }, out: { 'Yürüyüş süresi': '18 dk', 'Tempo': '15:00 dk/km', 'Tahmini adım sayısı': '1.714 adım' } },
    { in: { mod: 'sure', km: '', hiz: '5' }, error: true },
    { in: { mod: 'sure', km: '5', hiz: '0' }, error: true },
    { in: { mod: 'mesafe', dakika: 'yarım saat', hiz: '5' }, error: true },
  ],
  howto: [
    'Neyi öğrenmek istediğinizi seçin: bir mesafenin kaç dakika süreceğini mi, yoksa belirli bir sürede ne kadar yol yürüyeceğinizi mi?',
    'Seçiminize göre mesafeyi kilometre olarak ya da süreyi dakika olarak yazın. 800 metre için 0,8 girin.',
    'Yürüyüş hızınızı girin. Bilmiyorsanız normal tempo için 5 km/sa değerini kullanabilirsiniz.',
    'Adım sayısını da görmek istiyorsanız adım boyunuzu santimetre olarak yazın; istemiyorsanız alanı boşaltın.',
    '"Hesapla" düğmesine basın; süre, mesafe, tempo ve adım sayısı sonuç kutusunda görünür.',
  ],
  sections: [
    { h: 'Formüller', p: [
      'Yürüyüş hesabı, hız problemlerinin en sade hâlidir. Süre için <strong>süre (dakika) = mesafe (km) ÷ hız (km/sa) × 60</strong>, mesafe için <strong>mesafe (km) = hız (km/sa) × süre (dakika) ÷ 60</strong> kullanılır.',
      'Tempo, bir kilometrenin kaç dakikada yüründüğünü gösterir ve hızın tersidir: <strong>tempo (dk/km) = 60 ÷ hız</strong>. 5 km/sa hız 12:00 dk/km, 6 km/sa hız 10:00 dk/km tempoya denk gelir. Adım sayısı ise mesafenin adım boyuna bölünmesiyle bulunur: <strong>adım = mesafe (cm) ÷ adım boyu (cm)</strong>.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Mesafeden süre:</strong> 5 kilometrelik bir parkuru saatte 5 km hızla yürürseniz 5 ÷ 5 × 60 = 60 dakika, yani 1 saat sürer. Adım boyunuz 70 cm ise 500.000 ÷ 70 = yaklaşık 7.143 adım atarsınız.',
      '<strong>Süreden mesafe:</strong> Öğle arasında 45 dakikanız var ve tempolu, saatte 6 km hızla yürüyorsunuz. 6 × 45 ÷ 60 = 4,5 kilometre yol alırsınız; bu yaklaşık 6.429 adım eder.',
      '<strong>Gündelik bir durum:</strong> Eviniz durağa 1,2 km uzaklıktaysa ve sakin bir tempoyla saatte 4 km yürüyorsanız 1,2 ÷ 4 × 60 = 18 dakikada varırsınız. Aynı yolu saatte 5 km hızla yürümek süreyi yaklaşık 14 dakikaya indirir.',
    ] },
    { h: 'Hangi hızı seçmeliyim?', p: [
      'Yürüyüş hızı kişinin yaşına, boyuna, kondisyonuna, zemine ve taşıdığı yüke göre değişir. Aşağıdaki aralıklar düz zemin için yaygın kabul gören yaklaşık değerlerdir:',
    ], ul: [
      '<strong>3–4 km/sa:</strong> Gezinti temposu; vitrinlere bakarak, çocukla ya da yaşlı biriyle yürüme.',
      '<strong>4,5–5 km/sa:</strong> Çoğu yetişkinin gündelik, rahat yürüyüş hızı. Harita uygulamalarının yaya süreleri genellikle bu düzeye yakındır.',
      '<strong>5,5–6,5 km/sa:</strong> Tempolu yürüyüş; nefes hızlanır ama konuşmak hâlâ mümkündür.',
      '<strong>7 km/sa ve üzeri:</strong> Spor amaçlı çok hızlı yürüyüş; çoğu kişi bu hızda koşmaya geçer.',
    ] },
    { h: 'Kendi hızınızı ve adım boyunuzu ölçmek', p: [
      'En güvenilir yöntem, uzunluğunu bildiğiniz bir mesafeyi yürüyüp süre tutmaktır. Standart bir atletizm pistinin iç kulvarı 400 metredir; bir turu 4 dakika 48 saniyede tamamlıyorsanız hızınız saatte 5 kilometredir. Telefonunuzdaki konum tabanlı spor uygulamaları da ortalama hızı gösterir.',
      'Adım boyu için düz bir zeminde 10 adım atın, başlangıç ve bitiş noktası arasını ölçüp 10\'a bölün. Kaba bir tahmin gerekiyorsa adım boyunun boy uzunluğunun yaklaşık yüzde 41–42\'si olduğu kabul edilir; 170 cm boyunda biri için bu yaklaşık 70 cm eder. Hızlandıkça adım boyu da uzar, bu yüzden tempolu yürüyüşte adım sayısı biraz daha düşük çıkar.',
    ] },
    { h: 'Hızlı başvuru: 5 km/sa hızla', ul: [
      '500 m → 6 dakika',
      '1 km → 12 dakika',
      '2 km → 24 dakika',
      '3 km → 36 dakika',
      '5 km → 1 saat',
      '10 km → 2 saat',
      '10.000 adım (70 cm adım boyuyla) → 7 km, yaklaşık 1 saat 24 dakika',
    ] },
    { h: 'Sınırlar ve sağlık notu', p: [
      'Araç düz ve engelsiz bir yol varsayar. Şehir içinde trafik ışıkları, kaldırım kalabalığı ve karşıdan karşıya geçişler süreyi uzatır; yokuş yukarı yürüyüş belirgin biçimde yavaşlar. Dağ ve doğa yürüyüşlerinde yükseklik kazanımını da hesaba katan ayrı bir yöntem gerekir; bunun için tırmanış süresi hesaplayıcısını kullanabilirsiniz.',
      'Düzenli yürüyüş çoğu insan için güvenli bir egzersizdir, ancak bu sayfa bir egzersiz programı ya da sağlık önerisi sunmaz. Kalp, eklem ya da solunum sorununuz varsa ya da uzun süredir hareketsizseniz, yürüyüş süresini ve temposunu artırmadan önce hekiminize danışın.',
    ] },
  ],
  faq: [
    ['1 km kaç dakikada yürünür?', 'Normal bir tempoyla, saatte 5 km hızla 12 dakikada yürünür. Yavaş tempoda (4 km/sa) 15 dakika, tempolu yürüyüşte (6 km/sa) 10 dakika sürer.'],
    ['5 km yürüyüş kaç dakika sürer?', 'Saatte 5 km hızla tam 1 saat sürer. Saatte 6 km hızla 50 dakikaya iner, saatte 4 km hızla 1 saat 15 dakikaya çıkar.'],
    ['10.000 adım kaç kilometre eder?', 'Adım boyuna bağlıdır. 70 cm adım boyuyla 7 km, 65 cm ile 6,5 km, 75 cm ile 7,5 km eder. Saatte 5 km hızla 7 km yaklaşık 1 saat 24 dakikada yürünür.'],
    ['30 dakikada kaç kilometre yürünür?', 'Saatte 5 km hızla 2,5 km, saatte 6 km hızla 3 km yürünür. "Süreden mesafe" seçeneğiyle kendi hızınıza göre hesaplayabilirsiniz.'],
    ['Tempo ile hız arasındaki fark nedir?', 'Hız, bir saatte kaç kilometre gittiğinizi; tempo, bir kilometreyi kaç dakikada tamamladığınızı gösterir. İkisi birbirinin tersidir: 60\'ı hıza bölerseniz tempoyu bulursunuz.'],
    ['Harita uygulamasının verdiği süre neden farklı çıkıyor?', 'Harita uygulamaları kendi varsaydıkları ortalama yaya hızını, güzergâhtaki eğimi ve bazen geçiş noktalarını hesaba katar. Sizin hızınız bu varsayımdan farklıysa süre de değişir.'],
    ['Metre cinsinden mesafeyi nasıl girerim?', 'Kilometreye çevirerek yazın: 800 metre için 0,8; 1.500 metre için 1,5 girin.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tamamen tarayıcınızda yapılır; yazdığınız mesafe, süre ve hız değerleri sunucuya gönderilmez.'],
  ],
  related: ['adim-hesapla', 'hiz-hesapla', 'tirmanis-suresi-hesapla', 'kalori-hesapla', 'saat-hesapla'],
};
