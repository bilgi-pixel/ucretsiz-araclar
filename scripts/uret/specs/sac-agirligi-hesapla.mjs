export default {
  slug: 'sac-agirligi-hesapla',
  title: 'Sac Ağırlığı Hesaplama',
  h1Tail: 'levha kg ve m² ağırlığı',
  pageTitle: 'Sac Ağırlığı Hesaplama – Levha Sacın Kilogramı ve m² Ağırlığı',
  description: 'Sac levhanın en, boy ve kalınlığından ağırlığını hesaplayın. Çelik, paslanmaz, alüminyum, bakır ve pirinç için kg, m² ağırlığı ve toplam tutar.',
  card: 'Levha ölçüleri ve kalınlıktan sacın kilogramını, metrekare ağırlığını, toplam ağırlığı ve tutarı hesaplayın.',
  category: 'insaat',
  keywords: ['sac ağırlığı hesaplama', 'sac kg hesaplama', '1 mm sac kaç kg', 'sac levha ağırlığı', 'paslanmaz sac ağırlığı', 'alüminyum levha ağırlığı', 'sac metrekare ağırlığı'],
  lead: 'Sac levhanın enini, boyunu ve kalınlığını yazın; araç seçtiğiniz malzemenin yoğunluğuna göre <strong>levha ağırlığını</strong>, <strong>metrekare ağırlığını</strong> ve adede göre toplam kilogramı hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Levha eni (mm)', type: 'number', placeholder: 'Örn. 1000' },
    { id: 'boy', label: 'Levha boyu (mm)', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'kalinlik', label: 'Kalınlık (mm)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'adet', label: 'Adet', type: 'number', value: '1' },
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [['7850', 'Çelik sac – siyah, DKP, galvaniz (7.850 kg/m³)'], ['7930', 'Paslanmaz çelik (7.930 kg/m³)'], ['2700', 'Alüminyum (2.700 kg/m³)'], ['8960', 'Bakır (8.960 kg/m³)'], ['8500', 'Pirinç (8.500 kg/m³)']] },
    { id: 'fiyat', label: 'Kilogram fiyatı (TL)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Levha eni');
    const boy = h.pos(v.boy, 'Levha boyu');
    const k = h.pos(v.kalinlik, 'Kalınlık');
    const n = h.posint(v.adet, 'Adet');
    const yog = { 7850: 7850, 7930: 7930, 2700: 2700, 8960: 8960, 8500: 8500 };
    const ro = yog[v.malzeme] || 7850;
    const alan = en * boy / 1e6;
    const m2kg = k * ro / 1000;
    const levha = alan * m2kg;
    const toplam = levha * n;
    const rows = [
      ['Toplam ağırlık', h.fmt(toplam, 2) + ' kg'],
      ['Bir levhanın ağırlığı', h.fmt(levha, 2) + ' kg'],
      ['m² ağırlığı', h.fmt(m2kg, 3) + ' kg/m²'],
      ['Toplam alan', h.fmt(alan * n, 3) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Kilogram fiyatı');
      rows.push(['Tutar', h.para(toplam * f)]);
    }
    return { rows, note: 'Teorik ağırlıktır; kalınlık toleransı ve kaplama nedeniyle kantar ağırlığı birkaç puan farklı olabilir.' };
  },
  cases: [
    { in: { en: '1000', boy: '2000', kalinlik: '1', adet: '1', malzeme: '7850' }, out: { 'Toplam ağırlık': '15,7 kg', 'Bir levhanın ağırlığı': '15,7 kg', 'm² ağırlığı': '7,85 kg/m²', 'Toplam alan': '2 m²' } },
    { in: { en: '1250', boy: '2500', kalinlik: '3', adet: '1', malzeme: '7850' }, out: { 'Toplam ağırlık': '73,59 kg', 'm² ağırlığı': '23,55 kg/m²', 'Toplam alan': '3,125 m²' } },
    { in: { en: '1500', boy: '3000', kalinlik: '1', adet: '1', malzeme: '2700' }, out: { 'Toplam ağırlık': '12,15 kg', 'm² ağırlığı': '2,7 kg/m²', 'Toplam alan': '4,5 m²' } },
    { in: { en: '1000', boy: '2000', kalinlik: '3', adet: '1', malzeme: '7930' }, out: { 'Toplam ağırlık': '47,58 kg', 'm² ağırlığı': '23,79 kg/m²' } },
    { in: { en: '500', boy: '800', kalinlik: '1,2', adet: '7', malzeme: '7850' }, out: { 'Toplam ağırlık': '26,38 kg', 'Bir levhanın ağırlığı': '3,77 kg', 'Toplam alan': '2,8 m²' } },
    { in: { en: '1000', boy: '2000', kalinlik: '10', adet: '1', malzeme: '8960' }, out: { 'Toplam ağırlık': '179,2 kg', 'm² ağırlığı': '89,6 kg/m²' } },
    { in: { en: '1500', boy: '6000', kalinlik: '8', adet: '1', malzeme: '7850' }, out: { 'Toplam ağırlık': '565,2 kg', 'm² ağırlığı': '62,8 kg/m²', 'Toplam alan': '9 m²' } },
    { in: { en: '1000', boy: '2000', kalinlik: '1', adet: '5', malzeme: '7850', fiyat: '30' }, out: { 'Toplam ağırlık': '78,5 kg', 'Tutar': '2.355,00 TL' } },
    { in: { en: '1000', boy: '2000', kalinlik: '0' }, error: true },
    { in: { en: '', boy: '2000', kalinlik: '1' }, error: true },
    { in: { en: '1000', boy: '2000', kalinlik: '1', adet: '2,5' }, error: true },
  ],
  howto: [
    'Levhanın enini ve boyunu milimetre olarak yazın. 1 × 2 metrelik levha için 1000 ve 2000 girin.',
    'Sac kalınlığını milimetre olarak ekleyin; ondalık için virgül kullanabilirsiniz (örn. 0,8).',
    'Kaç levha olduğunu belirtin ve malzemeyi seçin.',
    'Tutarı da görmek isterseniz kilogram fiyatını yazın.',
    '"Hesapla" düğmesine basın; levha ağırlığı, metrekare ağırlığı ve toplam kilogram görüntülenir.',
  ],
  sections: [
    { h: 'Sac ağırlığı formülü', p: [
      'Düz bir levhanın ağırlığı hacmi ile yoğunluğunun çarpımıdır. Ölçüler milimetre olarak verildiğinde formül şöyle yazılır: <strong>ağırlık (kg) = en × boy × kalınlık × yoğunluk ÷ 1.000.000.000</strong>. Bölme işlemi, milimetreküpü metreküpe çevirmek içindir. Çelik için yoğunluk 7.850 kg/m³ alınır.',
      'Bu formülün çok kullanışlı bir kısa yolu vardır: çelik sacın <strong>her milimetre kalınlığı metrekarede 7,85 kg</strong> gelir. Yani metrekare ağırlığı kalınlık × 7,85\'tir; levha ağırlığını bulmak için bunu alanla çarpmak yeterlidir. 2 mm sac metrekarede 15,7 kg, 5 mm sac 39,25 kg, 10 mm sac 78,5 kg eder.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'En yaygın levha ölçüsü olan 1.000 × 2.000 mm ve 1 mm kalınlıkta çelik sacı ele alalım. Alan 1 × 2 = 2 m², metrekare ağırlığı 1 × 7,85 = 7,85 kg/m² olduğundan levha <strong>15,7 kg</strong> gelir. Aynı levhadan 5 adet 78,5 kg eder; kilogram fiyatı 30 TL olarak girilirse tutar 2.355,00 TL çıkar. Buradaki fiyat yalnızca örnek amaçlıdır.',
      '1.250 × 2.500 mm ölçüsünde 3 mm sacın alanı 3,125 m², metrekare ağırlığı 23,55 kg\'dır; levha 3,125 × 23,55 = <strong>73,59 kg</strong> gelir. 1.500 × 6.000 mm ölçüsünde 8 mm kalınlığındaki bir levha ise 9 m² × 62,8 kg/m² = <strong>565,2 kg</strong> ağırlığındadır; bu ağırlıkta bir levhanın elle taşınamayacağı, vinç ya da forklift gerektiği açıktır.',
    ] },
    { h: 'Malzemelere göre metrekare ağırlığı (1 mm kalınlık için)', ul: [
      '<strong>Çelik sac (siyah, DKP, galvaniz):</strong> 7,85 kg/m²',
      '<strong>Paslanmaz çelik:</strong> 7,93 kg/m²',
      '<strong>Alüminyum:</strong> 2,70 kg/m²',
      '<strong>Bakır:</strong> 8,96 kg/m²',
      '<strong>Pirinç:</strong> 8,50 kg/m²',
    ], p: [
      'Başka bir kalınlık için bu değeri kalınlıkla çarpmanız yeterlidir. Yoğunluklar yaygın alaşımlar için kabul edilen yaklaşık değerlerdir; paslanmaz çelik, alüminyum ve pirinçte alaşıma göre küçük farklar görülür. Galvanizli sacda çinko kaplama ağırlığa çok az katkı yapar ve bu hesapta ihmal edilmiştir.',
    ] },
    { h: 'Sac türleri ve ticari ölçüler', p: [
      'Piyasada sac, üretim yöntemine göre adlandırılır. Sıcak haddelenmiş sac "siyah sac" olarak bilinir ve genellikle kalın levhalarda kullanılır. Soğuk haddelenmiş sac "DKP" diye anılır; yüzeyi daha düzgün, kalınlık toleransı daha dardır. Galvanizli sac çinko kaplıdır ve paslanmaya karşı dayanıklıdır. Hepsinin ana malzemesi çelik olduğu için ağırlık hesabında aynı yoğunluk kullanılır.',
      'Levhalar çoğunlukla 1.000 × 2.000 mm, 1.250 × 2.500 mm ve 1.500 × 3.000 mm gibi ölçülerde satılır; rulodan istenen boyda kesim de yapılır. Fiyat genellikle kilogram üzerinden verildiğinden, bir levhanın kaç liraya geleceğini bilmek için önce ağırlığını hesaplamak gerekir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Ölçüleri santimetre ya da metre olarak yazmak. Bütün alanlar milimetredir; 1 metre için 1000 girin.',
      'Kalınlığı "mikron" ya da "numara" olarak düşünmek. Kalınlık doğrudan milimetre olmalıdır.',
      'Alüminyum ya da paslanmaz için çelik yoğunluğunu kullanmak. Alüminyum aynı ölçüde çeliğin yaklaşık üçte biri ağırlığındadır.',
      'Baklavalı ya da gözyaşı desenli sacı düz sac gibi hesaplamak. Desen kabartmaları ek ağırlık getirir; üreticinin tablosuna bakın.',
      'Delikli ya da genişletilmiş sacda boşlukları hesaba katmamak. Bu ürünlerde ağırlık, açıklık oranına göre azalır.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonuç teorik ağırlıktır. Standartlar sac kalınlığında belirli bir toleransa izin verdiğinden, kantarda ölçülen ağırlık hesaplanandan birkaç puan sapabilir. Araç yalnızca düz, dikdörtgen levhalar içindir ve sacın taşıyabileceği yük ya da sehim hakkında bilgi vermez. Taşıyıcı amaçlı kullanım, depo ve platform kaplamaları gibi işlerde kalınlık seçimi için bir mühendise danışın.',
    ] },
  ],
  faq: [
    ['1 mm sacın metrekaresi kaç kilogramdır?', 'Çelik sacda 7,85 kg gelir. Kalınlık arttıkça doğru orantılı artar: 2 mm için 15,7 kg, 3 mm için 23,55 kg, 5 mm için 39,25 kg.'],
    ['1000 × 2000 mm 2 mm sac kaç kilo?', 'Alan 2 m², metrekare ağırlığı 15,7 kg olduğundan levha 31,4 kg gelir. Aynı ölçüde 1 mm sac 15,7 kg, 3 mm sac 47,1 kg eder.'],
    ['Galvanizli sacın ağırlığı siyah sacdan farklı mı?', 'Pratikte hayır. İkisinin de ana malzemesi çeliktir; çinko kaplama çok ince olduğu için ağırlığa katkısı küçüktür ve bu hesapta ihmal edilir.'],
    ['Paslanmaz sac neden biraz daha ağır çıkıyor?', 'Yaygın paslanmaz çeliklerin yoğunluğu, içerdikleri nikel ve krom nedeniyle karbon çeliğinden bir miktar yüksektir. Araç 7.930 kg/m³ değerini kullanır; fark yaklaşık yüzde birdir.'],
    ['Alüminyum levha çeliğe göre ne kadar hafiftir?', 'Aynı ölçüde alüminyum levha çeliğin yaklaşık yüzde 34\'ü kadar ağırlıktadır. 1.500 × 3.000 mm, 1 mm alüminyum levha 12,15 kg gelirken aynı ölçüde çelik sac 35,33 kg eder.'],
    ['Rulo sac için kullanabilir miyim?', 'Evet. Rulonun enini ve açılmış toplam boyunu milimetre olarak yazarsanız ağırlığı bulursunuz. Tersine, rulo ağırlığını metrekare ağırlığına bölerek yaklaşık alanı da hesaplayabilirsiniz.'],
    ['Dairesel ya da özel biçimli parçaların ağırlığını nasıl bulurum?', 'Parçanın alanını metrekare olarak hesaplayın ve sonuçtaki m² ağırlığıyla çarpın. Örneğin 1 mm çelik sacdan 0,5 m² alanlı bir parça 3,93 kg gelir.'],
    ['Girdiğim ölçü ve fiyatlar bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['profil-agirligi-hesapla', 'boru-agirligi-hesapla', 'insaat-demiri-agirligi-hesapla', 'cam-agirligi-hesapla', 'mermer-agirligi-hesapla'],
};
