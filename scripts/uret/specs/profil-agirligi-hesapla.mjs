export default {
  slug: 'profil-agirligi-hesapla',
  title: 'Kutu Profil Ağırlığı Hesaplama',
  h1Tail: 'kare ve dikdörtgen profil',
  pageTitle: 'Kutu Profil Ağırlığı Hesaplama – Kare ve Dikdörtgen Profil kg/m',
  description: 'Kare ve dikdörtgen kutu profilin en, boy ve et kalınlığından metre ağırlığını, boy ağırlığını ve toplam kilogramı hesaplayın. Çelik, paslanmaz, alüminyum.',
  card: 'Kutu profilin ölçülerinden kg/m birim ağırlığı, 6 metrelik boy ağırlığını, toplam kilogramı ve boya yüzeyini bulun.',
  category: 'insaat',
  keywords: ['kutu profil ağırlığı hesaplama', 'profil kg hesaplama', '40x40 profil kaç kg', 'kare profil ağırlığı', 'dikdörtgen profil ağırlık', 'profil metre ağırlığı', 'kutu profil ağırlık tablosu'],
  lead: 'Kutu profilin dış ölçülerini ve et kalınlığını yazın; araç kesit alanından <strong>metre ağırlığını</strong>, bir boyun ağırlığını ve adede göre <strong>toplam kilogramı</strong> hesaplasın. Boya ve galvaniz için dış yüzey alanı da verilir.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Profil eni (mm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'boy', label: 'Profil yüksekliği (mm)', type: 'number', placeholder: 'Örn. 40', hint: 'Kare profilde en ile aynı değeri yazın.' },
    { id: 'et', label: 'Et kalınlığı (mm)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'uzunluk', label: 'Profil boyu (m)', type: 'number', value: '6' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [['7850', 'Çelik (7.850 kg/m³)'], ['7930', 'Paslanmaz çelik (7.930 kg/m³)'], ['2700', 'Alüminyum (2.700 kg/m³)']] },
    { id: 'fiyat', label: 'Kilogram fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const a = h.pos(v.en, 'Profil eni');
    const b = h.pos(v.boy, 'Profil yüksekliği');
    const t = h.pos(v.et, 'Et kalınlığı');
    const L = h.pos(v.uzunluk, 'Profil boyu');
    const n = h.posint(v.adet, 'Adet');
    if (2 * t >= Math.min(a, b)) h.err('Et kalınlığı, profilin kısa kenarının yarısından küçük olmalı; aksi halde kesit içi boş kalmaz.');
    const ro = v.malzeme === '7930' ? 7930 : v.malzeme === '2700' ? 2700 : 7850;
    const kesit = a * b - (a - 2 * t) * (b - 2 * t);
    const birim = kesit * ro / 1e6;
    const boyKg = birim * L;
    const toplam = boyKg * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Birim ağırlık', h.fmt(birim, 3) + ' kg/m'],
      ['Bir boyun ağırlığı', h.fmt(boyKg, 2) + ' kg'],
      ['Toplam uzunluk', h.fmt(L * n, 2) + ' m'],
      ['Kesit alanı', h.fmt(kesit, 2) + ' mm²'],
      ['Dış yüzey alanı', h.fmt(2 * (a + b) / 1000 * L * n, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Kesit keskin köşeli kabul edilmiştir. Gerçek profillerde köşeler yuvarlak olduğundan tablo ağırlıkları bir miktar daha düşük olabilir.' };
  },
  cases: [
    { in: { en: '40', boy: '40', et: '2', uzunluk: '6', adet: '10', malzeme: '7850' }, out: { 'Toplam ağırlık': '143,18 kg', 'Birim ağırlık': '2,386 kg/m', 'Bir boyun ağırlığı': '14,32 kg', 'Toplam uzunluk': '60 m', 'Kesit alanı': '304 mm²', 'Dış yüzey alanı': '9,6 m²' } },
    { in: { en: '100', boy: '100', et: '5', uzunluk: '6', adet: '1', malzeme: '7850' }, out: { 'Toplam ağırlık': '89,49 kg', 'Birim ağırlık': '14,915 kg/m', 'Kesit alanı': '1.900 mm²' } },
    { in: { en: '30', boy: '50', et: '2', uzunluk: '6', adet: '5', malzeme: '7850' }, out: { 'Toplam ağırlık': '71,59 kg', 'Birim ağırlık': '2,386 kg/m' } },
    { in: { en: '20', boy: '20', et: '1,5', uzunluk: '6', adet: '25', malzeme: '7850' }, out: { 'Toplam ağırlık': '130,7 kg', 'Birim ağırlık': '0,871 kg/m', 'Kesit alanı': '111 mm²' } },
    { in: { en: '60', boy: '40', et: '3', uzunluk: '6', adet: '4', malzeme: '2700' }, out: { 'Toplam ağırlık': '36,55 kg', 'Birim ağırlık': '1,523 kg/m', 'Kesit alanı': '564 mm²' } },
    { in: { en: '80', boy: '40', et: '2,5', uzunluk: '3,2', adet: '12', malzeme: '7850' }, out: { 'Toplam ağırlık': '173,33 kg', 'Birim ağırlık': '4,514 kg/m', 'Toplam uzunluk': '38,4 m' } },
    { in: { en: '40', boy: '40', et: '2', uzunluk: '6', adet: '10', malzeme: '7850', fiyat: '32' }, out: { 'Tutar': '4.581,89 TL' } },
    { in: { en: '40', boy: '40', et: '20', uzunluk: '6', adet: '1' }, error: true },
    { in: { en: '0', boy: '40', et: '2' }, error: true },
    { in: { en: '40', boy: '40', et: '2', adet: '0' }, error: true },
  ],
  howto: [
    'Profilin dış enini ve yüksekliğini milimetre olarak yazın. Kare profilde iki değere aynı sayıyı girin.',
    'Et kalınlığını, yani sac duvarın kalınlığını milimetre olarak ekleyin.',
    'Profil boyunu metre, kaç boy alacağınızı adet olarak belirtin. Ticari boy çoğunlukla 6 metredir.',
    'Malzemeyi seçin; tutarı da görmek isterseniz kilogram fiyatını yazın.',
    '"Hesapla" düğmesine basın; birim ağırlık, boy ağırlığı ve toplam kilogram listelenir.',
  ],
  sections: [
    { h: 'Kutu profil ağırlığı nasıl hesaplanır?', p: [
      'Kutu profil, içi boş kare ya da dikdörtgen kesitli bir tüptür. Ağırlığı, kesitteki malzeme alanının uzunluk ve yoğunlukla çarpımıdır. Malzeme alanı, dış dikdörtgenden iç boşluğun çıkarılmasıyla bulunur: <strong>kesit = a × b − (a − 2t) × (b − 2t)</strong>. Burada a ve b dış ölçüler, t et kalınlığıdır; hepsi milimetre cinsindendir.',
      'Kesit alanı milimetrekare olarak bulunduktan sonra birim ağırlık şu şekilde hesaplanır: <strong>kg/m = kesit × yoğunluk ÷ 1.000.000</strong>. Çelik için yoğunluk 7.850 kg/m³ alındığında her 100 mm² kesit yaklaşık 0,785 kg/m gelir. Toplam ağırlık, birim ağırlığın profil boyu ve adetle çarpımıdır.',
    ] },
    { h: 'Çözümlü örnek: 40 × 40 × 2 mm profil', p: [
      'Dış ölçüsü 40 × 40 mm, et kalınlığı 2 mm olan çelik bir kutu profil alalım. Dış alan 40 × 40 = 1.600 mm², iç boşluk 36 × 36 = 1.296 mm² olduğundan kesit 1.600 − 1.296 = <strong>304 mm²</strong> eder. Birim ağırlık 304 × 7.850 ÷ 1.000.000 = <strong>2,386 kg/m</strong> bulunur.',
      '6 metrelik bir boy 2,386 × 6 = <strong>14,32 kg</strong> gelir. 10 boy için toplam <strong>143,18 kg</strong> ve 60 m profil elde edilir. Profilin dış çevresi 160 mm olduğundan boyanacak yüzey 0,16 × 60 = 9,6 m²\'dir. İlginç bir ayrıntı: 30 × 50 × 2 mm dikdörtgen profilin çevresi de 160 mm olduğu için birim ağırlığı aynı çıkar, 2,386 kg/m.',
    ] },
    { h: 'Hızlı başvuru değerleri (çelik, keskin köşe kabulüyle)', ul: [
      '<strong>20 × 20 × 1,5 mm:</strong> 0,871 kg/m',
      '<strong>40 × 40 × 2 mm:</strong> 2,386 kg/m',
      '<strong>30 × 50 × 2 mm:</strong> 2,386 kg/m',
      '<strong>80 × 40 × 2,5 mm:</strong> 4,514 kg/m',
      '<strong>100 × 100 × 5 mm:</strong> 14,915 kg/m',
    ], p: [
      'Bu değerler aracın formülüyle elde edilen teorik sonuçlardır. Üretici kataloglarındaki ağırlıklar köşe yuvarlaklığı nedeniyle bunlardan bir miktar düşük olur; fark et kalınlığı arttıkça büyür.',
    ] },
    { h: 'Hesap ile katalog arasındaki fark', p: [
      'Kutu profiller sacın bükülüp kaynaklanmasıyla üretilir ve köşeleri keskin değil yuvarlaktır. Yuvarlak köşe, keskin köşeye göre daha az malzeme içerir; bu nedenle gerçek kesit alanı formülün verdiğinden biraz küçüktür. Ayrıca et kalınlığında üretim toleransı bulunur; ince tarafta üretilmiş bir profil hesaplanandan hafif gelir.',
      'Bu sapmalar keşif ve nakliye planlaması için önemsizdir, ancak ağırlık üzerinden satın alırken fark edilebilir. Kesin değer gerektiğinde üreticinin ağırlık tablosunu ya da kantar fişini esas alın. Et kalınlığını kumpasla ölçerek etiketteki değeri doğrulamak da iyi bir kontroldür.',
    ] },
    { h: 'Nerelerde işe yarar?', ul: [
      'Ferforje, korkuluk, kapı ve sundurma imalatında malzeme maliyetini çıkarmak',
      'Çelik konstrüksiyon, raf ve platform işlerinde toplam tonajı ve nakliye yükünü öngörmek',
      'Kilogramla satılan profili boy fiyatına, boyla satılan profili kilogram fiyatına çevirerek teklifleri karşılaştırmak',
      'Boya, astar ve galvaniz kaplama için dış yüzey alanını bulmak',
      'Aynı işi çelik yerine alüminyumla yapmanın ağırlık farkını görmek',
    ], p: [
      'Projede parça boyları farklıysa profil boyu alanına toplam metrajı, adede 1 yazmanız yeterlidir. Sipariş verirken ise kesim artıkları yüzünden ihtiyacı tam boylara yuvarlamanız gerekir: 6 metrelik boydan 2,5 metrelik iki parça çıkar ve 1 metre artar. Kesim planını önceden yapmak, hem artığı hem de alınacak boy sayısını azaltır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca ağırlık hesaplar; profilin taşıyabileceği yükü, sehimini ya da burkulma dayanımını vermez. Taşıyıcı amaçla kullanılacak profillerin kesiti statik hesapla belirlenmelidir; bunun için bir inşaat ya da makine mühendisine danışın. Paslanmaz çelik ve alüminyum için kullanılan yoğunluklar yaygın alaşımlara ait yaklaşık değerlerdir; alaşıma göre küçük farklar olabilir.',
    ] },
  ],
  faq: [
    ['40 × 40 profil kaç kilogram gelir?', 'Et kalınlığına bağlıdır. 2 mm et kalınlığında çelik 40 × 40 kutu profil teorik olarak 2,386 kg/m gelir; 6 metrelik boyu 14,32 kg eder. Katalog değeri köşe yuvarlaklığı nedeniyle biraz daha düşük olabilir.'],
    ['Kare ve dikdörtgen profil için formül farklı mı?', 'Hayır, aynıdır. Dış alandan iç boşluk çıkarılır. Kare profilde en ve yükseklik eşittir. Çevresi ve et kalınlığı aynı olan kare ve dikdörtgen profillerin ağırlığı da aynı çıkar.'],
    ['Et kalınlığı neyi ifade eder?', 'Profili oluşturan sacın kalınlığıdır. Ağırlık üzerindeki en etkili ölçüdür: 40 × 40 profilde et kalınlığını 2 mm\'den 3 mm\'ye çıkarmak ağırlığı yaklaşık yüzde 46 artırır.'],
    ['Sonuç neden üretici tablosundan biraz fazla?', 'Formül köşeleri keskin kabul eder. Gerçek profillerde köşeler yuvarlak olduğu için malzeme biraz daha azdır. Kesin ağırlık için üretici tablosunu kullanın.'],
    ['Dış yüzey alanı ne işe yarar?', 'Boya, astar ya da galvaniz tüketimini tahmin etmek için kullanılır. Profilin dış çevresi ile toplam uzunluğun çarpımıdır; uç kesitler dahil değildir.'],
    ['Alüminyum profil çeliğe göre ne kadar hafif?', 'Aynı ölçülerde alüminyum profil, çeliğin yaklaşık üçte biri ağırlığındadır, çünkü yoğunluğu 2.700 kg/m³ ile çeliğin 7.850 kg/m³ değerinin yaklaşık yüzde 34\'üdür.'],
    ['Yuvarlak boru için kullanabilir miyim?', 'Hayır. Bu araç kare ve dikdörtgen kesitler içindir. Yuvarlak kesitli borular için boru ağırlığı aracını kullanın.'],
    ['Yazdığım ölçüler ve fiyatlar kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['sac-agirligi-hesapla', 'boru-agirligi-hesapla', 'insaat-demiri-agirligi-hesapla', 'cit-hesapla', 'birim-donustur'],
};
