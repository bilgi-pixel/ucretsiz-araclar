export default {
  slug: 'troy-ons-gram-cevir',
  title: 'Troy Ons Gram Çevirici',
  h1Tail: 'ozt ↔ g',
  pageTitle: 'Troy Ons Gram Çevirici – 1 Ons Altın Kaç Gram, Ons Fiyatından Gram',
  description: 'Troy onsu grama, gramı troy onsa çevirin. 1 troy ons = 31,1034768 gram; isterseniz ons fiyatını yazıp aynı para birimiyle gram başına fiyatı da görün.',
  card: 'Altın ve gümüşte kullanılan troy onsu grama, gramı troy onsa çevirin; ons fiyatından gram başına fiyatı da bulun.',
  category: 'birim',
  keywords: ['troy ons gram', '1 ons altın kaç gram', 'ons kaç gram altın', 'troy ons nedir', 'ons gram çevirme', 'gram troy ons hesaplama', 'ons fiyatından gram fiyatı'],
  lead: 'Altın, gümüş, platin ve paladyumun uluslararası tartı birimi olan troy onsu (<strong>ozt</strong>) grama ya da gramı troy onsa çevirin. <strong>1 troy ons = 31,1034768 gram</strong> tanımı kullanılır; ons fiyatını yazarsanız gram başına düşen fiyat da hesaplanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Ağırlık', type: 'number', placeholder: 'Örn. 1' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ozt', 'Troy ons → Gram'], ['g', 'Gram → Troy ons']] },
    { id: 'fiyat', label: 'Ons fiyatı (isteğe bağlı)', type: 'number', placeholder: 'Örn. 2500', hint: 'Bir troy onsun fiyatı; para birimi fark etmez. Binlik ayraç kullanmayın ya da 2.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const TROY = 31.1034768;
    const OZ = 28.349523125;
    const x = h.nonneg(v.deger, 'Ağırlık');
    const g = v.yon === 'g' ? x : x * TROY;
    const ozt = v.yon === 'g' ? x / TROY : x;
    const rows = v.yon === 'g'
      ? [['Troy ons', h.fmt(ozt, 4) + ' ozt'], ['Gram', h.fmt(g, 4) + ' g']]
      : [['Gram', h.fmt(g, 4) + ' g'], ['Troy ons', h.fmt(ozt, 4) + ' ozt']];
    rows.push(['Kilogram', h.fmt(g / 1000, 6) + ' kg']);
    rows.push(['Gündelik ons (avoirdupois)', h.fmt(g / OZ, 4) + ' oz']);
    let note = '1 troy ons = 31,1034768 g (tam tanım). Gündelik ons (28,349523125 g) ile aynı birim değildir.';
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Ons fiyatı');
      rows.push(['Gram başına fiyat', h.fix(f / TROY, 2)]);
      rows.push(['Girilen ağırlığın tutarı', h.fix(f * ozt, 2)]);
      note += ' Fiyat satırları, yazdığınız ons fiyatıyla aynı para birimindedir ve saf maden içindir; ayar, işçilik, alış-satış farkı ve vergiler dahil değildir.';
    }
    return { rows, note };
  },
  cases: [
    { in: { deger: '1', yon: 'ozt' }, out: { 'Gram': '31,1035 g', 'Gündelik ons (avoirdupois)': '1,0971 oz' } },
    { in: { deger: '100', yon: 'g' }, out: { 'Troy ons': '3,2151 ozt', 'Kilogram': '0,1 kg' } },
    { in: { deger: '31,1034768', yon: 'g' }, out: { 'Troy ons': '1 ozt' } },
    { in: { deger: '10', yon: 'ozt' }, out: { 'Gram': '311,0348 g', 'Kilogram': '0,311035 kg' } },
    { in: { deger: '1000', yon: 'g' }, out: { 'Troy ons': '32,1507 ozt' } },
    { in: { deger: '400', yon: 'ozt' }, out: { 'Gram': '12.441,3907 g', 'Kilogram': '12,441391 kg' } },
    { in: { deger: '2', yon: 'ozt', fiyat: '3110,34768' }, out: { 'Gram': '62,207 g', 'Gram başına fiyat': '100,00', 'Girilen ağırlığın tutarı': '6.220,70' } },
    { in: { deger: 'bir ons', yon: 'ozt' }, error: true },
    { in: { deger: '1', yon: 'ozt', fiyat: '-5' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına troy ons ya da gram cinsinden miktarı yazın.',
    '"Çeviri yönü" listesinden Troy ons → Gram ya da Gram → Troy ons seçeneğini belirleyin.',
    'Gram başına fiyatı da görmek istiyorsanız "Ons fiyatı" alanına bir troy onsun güncel fiyatını yazın; istemiyorsanız boş bırakın.',
    '"Çevir" düğmesine basın. İlk satır ağırlık karşılığını, fiyat girdiyseniz son iki satır gram başına fiyatı ve girdiğiniz ağırlığın tutarını gösterir.',
    'Farklı para birimine geçmek istiyorsanız fiyat sonucunu güncel kurla kendiniz çarpın; araç kur bilgisi içermez.',
  ],
  sections: [
    { h: 'Troy ons nedir?', p: [
      'Troy ons, değerli madenlerin dünya piyasalarında tartıldığı ve fiyatlandığı birimdir. Haberlerde "altının onsu" ya da "ons altın" denildiğinde kastedilen her zaman troy onstur. Simgesi <strong>ozt</strong> ya da "oz t" biçiminde yazılır. Adının, Orta Çağ\'da önemli bir ticaret fuarına ev sahipliği yapan Fransa\'nın Troyes kentinden geldiği kabul edilir.',
      'Bir troy ons tam olarak <strong>31,1034768 gramdır</strong>. Bu değer, troy sisteminin temel birimi olan "grain" üzerinden tanımlanır: bir troy ons 480 grain, bir grain de tam olarak 64,79891 miligramdır. Dolayısıyla çeviri ölçüme değil sabit bir tanıma dayanır.',
    ] },
    { h: 'Troy ons ile gündelik ons arasındaki fark', p: [
      'Gıda ambalajlarında, tariflerde ve kargo ağırlıklarında görülen ons, avoirdupois onsudur ve 28,349523125 gramdır. Troy ons bundan yaklaşık yüzde 9,7 daha ağırdır: 1 troy ons, 1,0971 gündelik onsa eşittir. İki birimin aynı adı taşıması, özellikle yabancı sitelerden gümüş ya da altın ürün alırken yanlış hesaplara yol açar.',
      'İlginç bir ayrıntı da pound düzeyinde durumun tersine dönmesidir. Bir troy pound 12 troy onstur ve yaklaşık 373,24 gram gelir; gündelik pound ise 16 gündelik onstur ve 453,59 gramdır. Yani troy onsu gündelik onstan ağır, troy poundu ise gündelik pounddan hafiftir. Değerli maden piyasasında pound kullanılmaz; miktarlar ons ve kilogramla ifade edilir.',
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      'Troy onstan grama geçmek için değeri 31,1034768 ile çarparsınız: <strong>g = ozt × 31,1034768</strong>. Gramdan troy onsa geçmek için aynı sayıya bölersiniz: <strong>ozt = g ÷ 31,1034768</strong>.',
      'Örnek 1: 10 troy onsluk bir gümüş külçe 10 × 31,1034768 = 311,0348 gram, yani 0,311035 kg gelir.',
      'Örnek 2: 100 gramlık bir külçe altın 100 ÷ 31,1034768 = 3,2151 troy onstur.',
      'Örnek 3: 1 kilogram (1.000 gram) saf maden 32,1507 troy ons eder. Bu sayı, kilogram fiyatı ile ons fiyatı arasında geçiş yaparken sık kullanılır.',
      'Örnek 4: Uluslararası piyasada işlem gören büyük külçeler yaklaşık 400 troy onstur. 400 × 31,1034768 = 12.441,3907 gram, yani yaklaşık 12,44 kilogram eder.',
    ] },
    { h: 'Ons fiyatından gram fiyatını bulmak', p: [
      'Altının uluslararası fiyatı ons başına ilan edilir, Türkiye\'de ise alışveriş gram üzerinden yapılır. İkisi arasındaki köprü şu formüldür: <strong>gram fiyatı = ons fiyatı ÷ 31,1034768</strong>. Sonuç, ons fiyatıyla aynı para birimindedir; lira karşılığını bulmak için ayrıca güncel kurla çarpmanız gerekir.',
      'Sayısal örnek: Ons fiyatı 3.110,34768 birim olsaydı gram başına fiyat tam 100,00 birim olurdu; 2 troy ons, yani 62,207 gram için tutar 6.220,70 birim ederdi. Araçtaki isteğe bağlı fiyat alanı bu hesabı yapar. Fiyatlar sürekli değiştiği için sayfa herhangi bir güncel fiyat ya da kur içermez; değeri siz girersiniz.',
      'Bu hesap <strong>saf maden</strong> içindir ve kuramsal bir değer verir. Piyasada gördüğünüz gram altın fiyatı; alış-satış farkı, işçilik, yerel arz-talep koşulları ve vergiler nedeniyle bu sonuçtan farklı olabilir. 22 ya da 14 ayar gibi alaşımlarda saf altın oranı daha düşük olduğundan ayrıca ayar oranıyla çarpmak gerekir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 ozt</strong> = 31,1035 g',
      '<strong>0,5 ozt</strong> = 15,5517 g',
      '<strong>0,25 ozt</strong> = 7,7759 g',
      '<strong>0,1 ozt</strong> = 3,1103 g',
      '<strong>5 ozt</strong> = 155,5174 g',
      '<strong>10 ozt</strong> = 311,0348 g',
      '<strong>100 ozt</strong> = 3.110,3477 g',
      '<strong>1 g</strong> = 0,0322 ozt',
      '<strong>100 g</strong> = 3,2151 ozt',
      '<strong>1 kg</strong> = 32,1507 ozt',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Yatırım amaçlı külçe ve sikkelerin ağırlığı çoğunlukla troy ons üzerinden belirlenir; bir onsluk, yarım onsluk, çeyrek onsluk ve onda bir onsluk sikkeler yaygındır. Yurt dışından gümüş ya da altın ürün alırken ilandaki "1 oz" ifadesinin troy ons olduğunu bilmek, gram karşılığını doğru hesaplamanızı sağlar. Ekonomi haberlerini izleyenler ons fiyatındaki değişimin gram fiyatına nasıl yansıyacağını kabaca görmek için de aynı çeviriyi kullanır.',
      'Platin, paladyum ve rodyum gibi öbür değerli madenler de troy onsla fiyatlanır. Değerli taşlar ise farklı bir birimle, karatla tartılır.',
    ] },
    { h: 'Uyarı ve sınırlar', p: [
      'Bu araç yalnızca birim çevirir ve verdiğiniz fiyatı ağırlığa oranlar. Yatırım tavsiyesi vermez, güncel fiyat ya da kur sağlamaz, alım satım için bir öneri niteliği taşımaz. Yatırım kararlarınızı kendi araştırmanıza ve gerekirse yetkili bir uzmanın görüşüne dayandırın; vergi ve yasal yükümlülükler için güncel mevzuatı kontrol edin. Araç negatif değer kabul etmez; fiyat alanında binlik ayraç olarak tek nokta kullanmayın.',
    ] },
  ],
  faq: [
    ['1 ons altın kaç gramdır?', '1 ons altın 31,1034768 gramdır; pratikte 31,10 gram olarak alınır. Altında kullanılan ons, troy onstur.'],
    ['1 gram kaç troy onstur?', '1 gram yaklaşık 0,03215 troy onstur. 100 gram 3,2151 troy ons, 1 kilogram 32,1507 troy ons eder.'],
    ['Troy ons ile normal ons arasındaki fark nedir?', 'Troy ons 31,1034768 gram, gündelik (avoirdupois) ons 28,349523125 gramdır. Troy ons yaklaşık yüzde 9,7 daha ağırdır ve yalnızca değerli madenlerde kullanılır.'],
    ['Ons fiyatından gram altın fiyatını nasıl hesaplarım?', 'Ons fiyatını 31,1034768\'e bölerseniz aynı para biriminde saf altının gram fiyatını bulursunuz. Lira karşılığı için sonucu güncel kurla çarpın. Piyasadaki gram fiyatı işçilik, alış-satış farkı ve vergiler nedeniyle bu değerden farklı olabilir.'],
    ['Gümüş de troy onsla mı ölçülür?', 'Evet. Altın, gümüş, platin ve paladyum uluslararası piyasalarda troy ons üzerinden fiyatlanır.'],
    ['Çeyrek ons kaç gramdır?', 'Çeyrek troy ons 7,7759 gramdır. Türkiye\'deki çeyrek altın farklı bir üründür ve bu ağırlıkla ilgisi yoktur; onun ağırlığı ve ayarı ayrıca belirlenmiştir.'],
    ['ozt ne demek?', 'ozt, troy ons (ounce troy) kısaltmasıdır. Gündelik onsun kısaltması olan oz ile karışmaması için sonuna t eklenir; ancak değerli maden ilanlarında çoğu zaman yalnızca oz yazılır ve troy ons kastedilir.'],
    ['Girdiğim ağırlık ve fiyat bilgisi bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez, saklanmaz. Sayfa hiçbir kaynaktan fiyat ya da kur çekmez.'],
  ],
  related: ['gram-ons-cevir', 'karat-gram-cevir', 'kg-gram-cevir', 'zekat-hesapla', 'birim-donustur'],
};
