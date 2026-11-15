export default {
  slug: 'gunluk-faiz-hesapla',
  title: 'Günlük Faiz Hesaplama',
  h1Tail: 'gün başına faiz getirisi',
  pageTitle: 'Günlük Faiz Hesaplama – Gün Başına Faiz ve Vade Sonu Tutar',
  description: 'Anapara, yıllık faiz oranı ve gün sayısını girin; paranızın günde kaç lira faiz getirdiğini, brüt ve net toplam faizi ve vade sonu tutarı hesaplayın.',
  card: 'Paranız günde kaç lira faiz getiriyor? Yıllık orandan günlük faizi, toplam brüt ve net getiriyi hesaplayın.',
  category: 'finans',
  keywords: ['günlük faiz hesaplama', 'günlük faiz getirisi', 'gecelik faiz hesaplama', '1 günlük faiz', 'günlük mevduat faizi', 'faiz gün hesabı', 'günlük faiz formülü'],
  lead: 'Yıllık faiz oranı bilinen bir paranın <strong>bir günde ne kadar faiz getirdiğini</strong> ve seçtiğiniz gün sayısı sonunda toplam ne kazandırdığını hesaplayın. Günlük biriken hesaplar, kısa vadeli mevduat ve gün hesabıyla işleyen borçlar için uygundur.',
  button: 'Hesapla',
  inputs: [
    { id: 'anapara', label: 'Anapara (TL)', type: 'number', placeholder: 'Örn. 100000' },
    { id: 'oran', label: 'Yıllık faiz oranı (%)', type: 'number', placeholder: 'Örn. 45' },
    { id: 'gun', label: 'Gün sayısı', type: 'number', value: '1' },
    { id: 'yontem', label: 'Faiz işleme yöntemi', type: 'select', options: [['basit', 'Basit (faiz vade sonunda eklenir)'], ['bilesik', 'Günlük bileşik (faiz her gün anaparaya eklenir)']] },
    { id: 'esas', label: 'Yıl gün esası', type: 'select', options: [['365', '365 gün'], ['360', '360 gün']] },
    { id: 'stopaj', label: 'Stopaj oranı (%)', type: 'number', value: '0', hint: 'İsteğe bağlı; kesinti yoksa 0' },
  ],
  compute(v, h) {
    const P = h.pos(v.anapara, 'Anapara');
    const r = h.nonneg(v.oran, 'Yıllık faiz oranı') / 100;
    const gun = h.posint(h.opt(v.gun, 1, 'Gün sayısı'), 'Gün sayısı');
    const esas = v.esas === '360' ? 360 : 365;
    const stopaj = h.nonneg(h.opt(v.stopaj, 0, 'Stopaj oranı'), 'Stopaj oranı') / 100;
    if (stopaj >= 1) h.err('Stopaj oranı %100\'den küçük olmalı.');
    if (gun > 36500) h.err('Gün sayısı en fazla 36.500 (100 yıl) olabilir.');
    if (r > 100) h.err('Yıllık faiz oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    const gunlukOran = r / esas;
    const gunlukFaiz = P * gunlukOran;
    const brut = v.yontem === 'bilesik' ? P * (Math.pow(1 + gunlukOran, gun) - 1) : gunlukFaiz * gun;
    const kesinti = brut * stopaj;
    const net = brut - kesinti;
    return {
      rows: [
        ['Günlük faiz (brüt)', h.para(gunlukFaiz)],
        ['Günlük faiz (net)', h.para(gunlukFaiz * (1 - stopaj))],
        ['Günlük faiz oranı', '%' + h.fmt(gunlukOran * 100, 5)],
        [gun + ' günlük brüt faiz', h.para(brut)],
        ['Stopaj kesintisi', h.para(kesinti)],
        [gun + ' günlük net faiz', h.para(net)],
        ['Vade sonu tutar (net)', h.para(P + net)],
      ],
      note: v.yontem === 'bilesik'
        ? 'Günlük bileşik: tutar = anapara × (1 + yıllık oran ÷ ' + esas + ')^gün. Günlük faiz satırları ilk güne aittir; sonraki günlerde biraz artar.'
        : 'Basit faiz: faiz = anapara × yıllık oran × gün ÷ ' + esas + '.',
    };
  },
  cases: [
    { in: { anapara: '100000', oran: '36,5', gun: '1' }, out: { 'Günlük faiz (brüt)': '100,00 TL', 'Günlük faiz oranı': '%0,1', '1 günlük brüt faiz': '100,00 TL', 'Vade sonu tutar (net)': '100.100,00 TL' } },
    { in: { anapara: '100000', oran: '36,5', gun: '30', yontem: 'basit', esas: '365', stopaj: '15' }, out: { '30 günlük brüt faiz': '3.000,00 TL', 'Stopaj kesintisi': '450,00 TL', '30 günlük net faiz': '2.550,00 TL', 'Günlük faiz (net)': '85,00 TL', 'Vade sonu tutar (net)': '102.550,00 TL' } },
    { in: { anapara: '50000', oran: '36', gun: '90', esas: '360' }, out: { 'Günlük faiz (brüt)': '50,00 TL', '90 günlük brüt faiz': '4.500,00 TL', 'Günlük faiz oranı': '%0,1' } },
    { in: { anapara: '1000', oran: '36,5', gun: '365', yontem: 'bilesik' }, out: { '365 günlük brüt faiz': '440,25 TL', 'Günlük faiz (brüt)': '1,00 TL' } },
    { in: { anapara: '250000', oran: '0', gun: '10' }, out: { 'Günlük faiz (brüt)': '0,00 TL', 'Vade sonu tutar (net)': '250.000,00 TL' } },
    { in: { anapara: '73000', oran: '50', gun: '7' }, out: { 'Günlük faiz (brüt)': '100,00 TL', '7 günlük brüt faiz': '700,00 TL' } },
    { in: { anapara: '100000', oran: '36,5', gun: '2', yontem: 'bilesik' }, out: { '2 günlük brüt faiz': '200,10 TL' } },
    { in: { anapara: '100000', oran: '40', gun: '0' }, error: true },
    { in: { anapara: '-100', oran: '40', gun: '5' }, error: true },
    { in: { anapara: '100000', oran: '40', gun: '2,5' }, error: true },
  ],
  howto: [
    '"Anapara" alanına faiz işleyecek tutarı, "Yıllık faiz oranı" alanına bankanın ilan ettiği ya da sözleşmedeki yıllık oranı yazın.',
    'Kaç günlük faizi görmek istediğinizi "Gün sayısı" alanına girin; tek bir günün getirisi için 1 bırakın.',
    'Faiz vade sonunda toplu ekleniyorsa "Basit", her gün hesabınıza yansıyıp ertesi gün o da faiz kazanıyorsa "Günlük bileşik" yöntemini seçin.',
    'Bankanızın kullandığı gün esasını (çoğu TL mevduatta 365) ve varsa stopaj oranını belirtin.',
    '"Hesapla" düğmesine basın. İlk satırlar bir günlük getiriyi, alt satırlar seçtiğiniz sürenin toplamını ve vade sonu tutarı gösterir.',
  ],
  sections: [
    { h: 'Günlük faiz nasıl hesaplanır?', p: [
      'Faiz oranları neredeyse her zaman yıllık olarak ilan edilir. Bir günlük faizi bulmak için yıllık oran, yıldaki gün sayısına bölünür ve anaparayla çarpılır: <strong>günlük faiz = anapara × yıllık oran ÷ 365</strong>. Birden fazla gün için basit faizde bu tutar gün sayısıyla çarpılır: <strong>faiz = anapara × yıllık oran × gün ÷ 365</strong>.',
      'Örneğin 100.000 TL, yıllık %36,5 faizle günde 100.000 × 0,365 ÷ 365 = <strong>100 TL</strong> brüt faiz getirir. Günlük oran %0,1\'dir. Otuz günde 3.000 TL brüt faiz birikir; %15 stopaj varsayımıyla 450 TL kesilir ve elinize 2.550 TL geçer, yani günlük net getiri 85 TL\'dir.',
    ] },
    { h: 'Basit faiz ile günlük bileşik faiz', p: [
      'Vadeli mevduatta faiz genellikle vade sonunda tek seferde ödenir; vade boyunca anapara değişmediği için hesap basit faizdir. Günlük getiri sağlayan hesaplarda ise kazanılan faiz her gün bakiyeye eklenir ve ertesi günün faizi biraz daha büyük bir tutar üzerinden işler. Bu durumda formül <strong>tutar = anapara × (1 + yıllık oran ÷ 365)<sup>gün</sup></strong> olur.',
      'Kısa sürelerde iki yöntem arasındaki fark çok küçüktür: 100.000 TL ve %36,5 için iki günde basit faiz 200 TL, bileşik faiz 200,10 TL\'dir. Süre uzadıkça fark açılır: 1.000 TL bir yıl boyunca günlük bileşikle 440,25 TL kazandırırken basit faizle 365 TL kazandırır. Bileşik yöntemde araçtaki "günlük faiz" satırı ilk günün getirisidir.',
      'Uygulamada günlük hesaplarda stopaj da her gün kesildiğinden bileşiklenen tutar net faizdir. Araç sadelik için brüt faizi bileşiklendirir ve stopajı toplamdan düşer; uzun sürelerde gerçek net getiri gösterilenden biraz düşük olabilir.',
    ] },
    { h: '365 gün mü, 360 gün mü?', p: [
      'Türk lirası mevduat ve kredilerinde yıl çoğunlukla 365 gün kabul edilir. Bazı döviz işlemlerinde, uluslararası para piyasalarında ve ticari sözleşmelerde ise 360 günlük yıl kullanılır. Aynı yıllık oran 360 gün esasıyla biraz daha yüksek günlük faiz üretir: %36 oran 360 esasında günlük %0,1 ederken 365 esasında %0,09863 eder. Hangi esasın geçerli olduğu sözleşmenizde ya da ürün bilgi formunda yazar; emin değilseniz 365 seçin.',
    ] },
    { h: 'Kullanım senaryoları', ul: [
      '<strong>Günlük getirili hesaplar:</strong> Paranızı vadesiz gibi kullanıp günlük faiz aldığınız hesaplarda bir gecelik kazancı görmek.',
      '<strong>Kısa vadeli mevduat:</strong> 32, 46 ya da 92 günlük vadelerde vade sonunda elinize geçecek net tutarı tahmin etmek.',
      '<strong>Vade bozma kararı:</strong> Paraya birkaç gün erken ihtiyaç duyduğunuzda vazgeçeceğiniz faizi gün bazında hesaplamak.',
      '<strong>Gecikmiş alacak ve borçlar:</strong> Faturada ya da sözleşmede belirtilen yıllık oran üzerinden gecikilen gün kadar faiz hesaplamak.',
      '<strong>Kredi ara dönem faizi:</strong> Kredinin kullanıldığı gün ile ilk taksit dönemi arasındaki ek günlerin faizini tahmin etmek.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Aylık oranı yıllık oran alanına yazmak. Elinizde aylık oran varsa önce 12 ile çarpın.',
      'Vadeyi ay olarak düşünüp 30 gün yazmak. Bankalar gerçek takvim gününü sayar; 1 aylık vade 28 ile 31 gün arasında, yaygın mevduat vadesi ise 32 gündür.',
      'Brüt faizi net sanmak. Mevduat faizinden stopaj kesilir; karşılaştırma yaparken net satırına bakın.',
      'Günlük faizi 365 ile çarpıp yıllık getiriyi bulduğunu düşünmek. Faiz yeniden değerlendirilirse yıllık getiri bileşik etki nedeniyle daha yüksek olur.',
    ] },
    { h: 'Hızlı başvuru: 100.000 TL\'nin günlük brüt faizi (365 gün esası)', ul: [
      'Yıllık %20 → günde 54,79 TL',
      'Yıllık %30 → günde 82,19 TL',
      'Yıllık %36,5 → günde 100,00 TL',
      'Yıllık %40 → günde 109,59 TL',
      'Yıllık %50 → günde 136,99 TL',
    ] },
    { h: 'Uyarı', p: [
      'Sonuçlar girdiğiniz oranların süre boyunca değişmediği varsayımıyla hesaplanır ve bilgilendirme amaçlıdır. Stopaj oranı vadeye ve döneme göre değiştiği için araçta sabit bir değer yoktur; güncel oranı bankanızdan öğrenip girin. Bankaların kuruş yuvarlama ve gün sayma kuralları küçük farklar yaratabilir. Mali kararlarınız için bankanızın bildirdiği tutarları esas alın ve gerekirse uzmana danışın.',
    ] },
  ],
  faq: [
    ['Günlük faiz oranı nasıl bulunur?', 'Yıllık faiz oranını 365\'e (ya da sözleşme 360 gün esaslıysa 360\'a) bölersiniz. Yıllık %36,5 için günlük oran 36,5 ÷ 365 = %0,1\'dir.'],
    ['100.000 TL günde ne kadar faiz getirir?', 'Bu tamamen yıllık orana bağlıdır. Formül 100.000 × oran ÷ 365\'tir; yıllık %40 için günde yaklaşık 109,59 TL, yıllık %50 için 136,99 TL brüt eder. Güncel oranı araca yazarak kendi sonucunuzu görebilirsiniz.'],
    ['Gecelik faiz ile günlük faiz aynı şey mi?', 'Gündelik kullanımda evet; ikisi de paranın bir gün (bir gece) bankada kalması karşılığında işleyen faizi anlatır. Hafta sonu ve tatillerde para üç ya da daha fazla gün kaldığı için o günlerin faizi de işler.'],
    ['Stopaj günlük faizi nasıl etkiler?', 'Stopaj brüt faiz üzerinden kesilir. Günlük brüt faiz 100 TL ve stopaj %15 ise net günlük faiz 85 TL\'dir. Stopaj oranı vadeye ve yürürlükteki düzenlemeye göre değişir.'],
    ['Günlük bileşik seçeneğini ne zaman kullanmalıyım?', 'Faiz her gün hesabınıza ekleniyor ve ertesi gün toplam bakiye üzerinden yeniden faiz işliyorsa. Vade sonunda tek seferde faiz ödeyen klasik vadeli mevduatta basit yöntem doğrudur.'],
    ['Gün sayısını nasıl saymalıyım?', 'Paranın yatırıldığı gün sayılır, çekildiği gün sayılmaz; yani iki tarih arasındaki gün farkı kullanılır. İki tarih arasındaki gün sayısını bulmak için sitedeki tarih farkı aracından yararlanabilirsiniz.'],
    ['Bu araç gecikme faizini de hesaplar mı?', 'Yıllık oranı ve geciken gün sayısını bildiğiniz basit faizli gecikmelerde evet. Vergi borçları gibi aylık oranla ve kendine özgü kurallarla işleyen gecikme zamları için ilgili kurumun hesaplama yöntemini esas alın.'],
    ['Girdiğim tutarlar sunucuya gidiyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; anapara ve oran bilgileri hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['faiz-hesapla', 'mevduat-faizi-hesapla', 'bilesik-faiz-hesapla', 'aylik-yillik-faiz-cevir', 'efektif-faiz-hesapla', 'tarih-farki'],
};
