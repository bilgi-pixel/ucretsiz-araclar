export default {
  slug: 'eylemsizlik-momenti-hesapla',
  title: 'Eylemsizlik Momenti Hesaplama',
  h1Tail: 'disk, küre, çubuk, halka ve levha',
  pageTitle: 'Eylemsizlik Momenti Hesaplama – Disk, Küre, Çubuk ve Halka Formülleri',
  description: 'Disk, silindir, halka, küre, küresel kabuk, ince çubuk ve dikdörtgen levhanın eylemsizlik momentini hesaplayın; dönme kinetik enerjisini ve açısal momentumu da bulun.',
  card: 'Disk, küre, çubuk, halka gibi yaygın cisimlerin eylemsizlik momentini ve dönme kinetik enerjisini hesaplayın.',
  category: 'bilim',
  keywords: ['eylemsizlik momenti hesaplama', 'atalet momenti hesaplama', 'eylemsizlik momenti formülleri', 'dönme eylemsizliği', 'disk eylemsizlik momenti', 'küre eylemsizlik momenti', 'çubuk eylemsizlik momenti', 'dönme kinetik enerjisi'],
  lead: 'Yaygın geometrik cisimlerin kütle eylemsizlik (atalet) momentini kütle ve boyutlardan hesaplayın. Araç her şekil için standart formülü uygular, <strong>kg·m²</strong> cinsinden sonucu ve jirasyon yarıçapını verir; açısal hız girerseniz dönme kinetik enerjisini ve açısal momentumu da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'sekil', label: 'Cisim ve dönme ekseni', type: 'select', options: [
      ['disk', 'Dolu silindir / disk (simetri ekseni)'],
      ['halka', 'İnce halka / ince cidarlı boru (simetri ekseni)'],
      ['bos', 'Kalın cidarlı içi boş silindir (simetri ekseni)'],
      ['kure', 'Dolu küre (çap ekseni)'],
      ['kabuk', 'İnce küresel kabuk (çap ekseni)'],
      ['cubukorta', 'İnce çubuk (ortasından, çubuğa dik eksen)'],
      ['cubukuc', 'İnce çubuk (ucundan, çubuğa dik eksen)'],
      ['levha', 'Dikdörtgen levha (merkezden, yüzeye dik eksen)'],
      ['nokta', 'Noktasal kütle (eksene r uzaklıkta)'],
    ], wide: true },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'boyut', label: 'Yarıçap, çubuk boyu ya da levha kenarı a (m)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Disk, halka, küre ve noktasal kütlede yarıçap; içi boş silindirde dış yarıçap; çubukta toplam uzunluk; levhada birinci kenar.' },
    { id: 'ikinci', label: 'İç yarıçap ya da levha kenarı b (m)', type: 'number', placeholder: 'Örn. 0,1', hint: 'Yalnızca içi boş silindir (iç yarıçap) ve dikdörtgen levha (ikinci kenar) için gerekir.' },
    { id: 'omega', label: 'Açısal hız (rad/s, isteğe bağlı)', type: 'number', placeholder: 'Örn. 10', hint: 'Doldurursanız dönme kinetik enerjisi ve açısal momentum da hesaplanır.' },
  ],
  compute(v, h) {
    const m = h.pos(v.kutle, 'Kütle');
    const a = h.pos(v.boyut, 'Boyut');
    let I;
    let formul;
    switch (v.sekil) {
      case 'halka': I = m * a * a; formul = 'I = m·r²'; break;
      case 'nokta': I = m * a * a; formul = 'I = m·r²'; break;
      case 'bos': {
        const ic = h.pos(v.ikinci, 'İç yarıçap');
        if (ic >= a) h.err('İç yarıçap dış yarıçaptan küçük olmalı. Dış yarıçapı ilk boyut kutusuna yazın.');
        I = 0.5 * m * (a * a + ic * ic); formul = 'I = ½·m·(R² + r²)'; break;
      }
      case 'kure': I = 0.4 * m * a * a; formul = 'I = (2/5)·m·r²'; break;
      case 'kabuk': I = (2 / 3) * m * a * a; formul = 'I = (2/3)·m·r²'; break;
      case 'cubukorta': I = m * a * a / 12; formul = 'I = (1/12)·m·L²'; break;
      case 'cubukuc': I = m * a * a / 3; formul = 'I = (1/3)·m·L²'; break;
      case 'levha': {
        const b = h.pos(v.ikinci, 'Levha kenarı b');
        I = m * (a * a + b * b) / 12; formul = 'I = (1/12)·m·(a² + b²)'; break;
      }
      default: I = 0.5 * m * a * a; formul = 'I = ½·m·r²';
    }
    const rows = [
      ['Eylemsizlik momenti', h.sig(I) + ' kg·m²'],
      ['Kullanılan formül', formul],
      ['Jirasyon yarıçapı', h.sig(Math.sqrt(I / m)) + ' m'],
      ['g·cm² cinsinden', h.sig(I * 1e7) + ' g·cm²'],
    ];
    if (String(v.omega ?? '').trim() !== '') {
      const w = h.nonneg(v.omega, 'Açısal hız');
      rows.push(['Dönme kinetik enerjisi', h.sig(0.5 * I * w * w) + ' J']);
      rows.push(['Açısal momentum', h.sig(I * w) + ' kg·m²/s']);
    }
    return {
      rows,
      note: 'Cismin kütlesinin düzgün dağıldığı (homojen olduğu) ve eksenin seçenekte belirtilen konumda bulunduğu varsayılır.',
    };
  },
  cases: [
    { in: { sekil: 'disk', kutle: '2', boyut: '0,5' }, out: { 'Eylemsizlik momenti': '0,25 kg·m²', 'Kullanılan formül': 'I = ½·m·r²', 'Jirasyon yarıçapı': '0,353553 m' } },
    { in: { sekil: 'kure', kutle: '5', boyut: '0,2' }, out: { 'Eylemsizlik momenti': '0,08 kg·m²' } },
    { in: { sekil: 'cubukorta', kutle: '3', boyut: '2' }, out: { 'Eylemsizlik momenti': '1 kg·m²' } },
    { in: { sekil: 'cubukuc', kutle: '3', boyut: '2' }, out: { 'Eylemsizlik momenti': '4 kg·m²' } },
    { in: { sekil: 'halka', kutle: '2', boyut: '0,5' }, out: { 'Eylemsizlik momenti': '0,5 kg·m²', 'Jirasyon yarıçapı': '0,5 m' } },
    { in: { sekil: 'bos', kutle: '4', boyut: '0,3', ikinci: '0,1' }, out: { 'Eylemsizlik momenti': '0,2 kg·m²' } },
    { in: { sekil: 'levha', kutle: '6', boyut: '1', ikinci: '2' }, out: { 'Eylemsizlik momenti': '2,5 kg·m²' } },
    { in: { sekil: 'kabuk', kutle: '3', boyut: '1' }, out: { 'Eylemsizlik momenti': '2 kg·m²' } },
    { in: { sekil: 'disk', kutle: '2', boyut: '0,5', omega: '10' }, out: { 'Dönme kinetik enerjisi': '12,5 J', 'Açısal momentum': '2,5 kg·m²/s' } },
    { in: { sekil: 'nokta', kutle: '0,5', boyut: '2' }, out: { 'Eylemsizlik momenti': '2 kg·m²' } },
    { in: { sekil: 'disk', kutle: '-1', boyut: '0,5' }, error: true },
    { in: { sekil: 'bos', kutle: '4', boyut: '0,3', ikinci: '' }, error: true },
    { in: { sekil: 'bos', kutle: '4', boyut: '0,1', ikinci: '0,3' }, error: true },
  ],
  howto: [
    '"Cisim ve dönme ekseni" listesinden hesaplamak istediğiniz şekli seçin. Eksenin konumu sonucu değiştirdiği için parantez içindeki açıklamaya dikkat edin.',
    'Cismin kütlesini kilogram olarak yazın.',
    'İlk boyut kutusuna şekle göre yarıçapı, çubuk boyunu ya da levhanın bir kenarını metre cinsinden girin. Santimetre değerlerini 100\'e bölün.',
    'İçi boş silindir için iç yarıçapı, dikdörtgen levha için ikinci kenarı ikinci boyut kutusuna yazın; diğer şekillerde bu kutu boş kalabilir.',
    'Cismin dönme enerjisini de öğrenmek istiyorsanız açısal hızı rad/s olarak ekleyip "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Eylemsizlik momenti nedir?', p: [
      'Eylemsizlik momenti, bir cismin dönme hareketindeki değişikliğe karşı gösterdiği dirençtir. Öteleme hareketinde kütle ne ise dönme hareketinde eylemsizlik momenti odur: kütlesi büyük bir cismi hızlandırmak nasıl zorsa, eylemsizlik momenti büyük bir cismi döndürmek ya da dönmesini durdurmak da o kadar zordur. Türkçede atalet momenti ya da dönme eylemsizliği adlarıyla da anılır ve I harfiyle gösterilir.',
      'Kütleden önemli bir farkı vardır: eylemsizlik momenti yalnızca kütlenin miktarına değil, bu kütlenin dönme eksenine göre nasıl dağıldığına da bağlıdır. Tanımı gereği her küçük kütle parçasının eksene uzaklığının karesiyle çarpımının toplamıdır (I = Σ m·r²). Eksenden uzaktaki kütle, eksene yakın kütleden çok daha fazla katkı yapar. Bu nedenle aynı cismin farklı eksenlere göre eylemsizlik momentleri farklıdır.',
    ] },
    { h: 'Araçtaki şekiller ve formülleri', ul: [
      '<strong>Dolu silindir ya da disk</strong>, simetri ekseni: I = ½·m·r²',
      '<strong>İnce halka ya da ince cidarlı boru</strong>, simetri ekseni: I = m·r²',
      '<strong>Kalın cidarlı içi boş silindir</strong>, simetri ekseni: I = ½·m·(R² + r²)',
      '<strong>Dolu küre</strong>, merkezden geçen eksen: I = (2/5)·m·r²',
      '<strong>İnce küresel kabuk</strong>, merkezden geçen eksen: I = (2/3)·m·r²',
      '<strong>İnce çubuk</strong>, ortasından geçen dik eksen: I = (1/12)·m·L²',
      '<strong>İnce çubuk</strong>, ucundan geçen dik eksen: I = (1/3)·m·L²',
      '<strong>Dikdörtgen levha</strong>, merkezden geçen ve yüzeye dik eksen: I = (1/12)·m·(a² + b²)',
      '<strong>Noktasal kütle</strong>, eksene r uzaklıkta: I = m·r²',
    ], p: [
      'Silindir formüllerinde silindirin boyu yer almaz; simetri ekseni etrafındaki dönmede önemli olan yalnızca kütlenin eksenden ne kadar uzakta olduğudur. İnce bir disk ile aynı kütle ve yarıçaptaki uzun bir silindirin bu eksene göre eylemsizlik momenti aynıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Disk:</strong> Kütlesi 2 kg, yarıçapı 0,5 m olan dolu bir diskin merkez eksenine göre eylemsizlik momenti I = ½ × 2 × 0,5² = ½ × 2 × 0,25 = <strong>0,25 kg·m²</strong> olur. Aynı kütle ve yarıçaptaki ince bir halkada tüm kütle kenarda toplandığı için I = 2 × 0,25 = 0,5 kg·m², yani diskin iki katıdır.',
      '<strong>Küre:</strong> 5 kg kütleli, 0,2 m yarıçaplı dolu bir küre için I = (2/5) × 5 × 0,2² = 0,4 × 5 × 0,04 = <strong>0,08 kg·m²</strong> bulunur.',
      '<strong>Çubuk ve eksenin önemi:</strong> 3 kg kütleli, 2 m uzunluğundaki ince bir çubuk ortasından döndürülürse I = (1/12) × 3 × 2² = 1 kg·m²; ucundan döndürülürse I = (1/3) × 3 × 2² = 4 kg·m² olur. Yalnızca ekseni uca taşımak eylemsizlik momentini dört katına çıkarmıştır. Bir sopayı ortasından tutup çevirmenin ucundan tutup savurmaktan kolay olmasının nedeni budur.',
      '<strong>Dönme enerjisi:</strong> Yukarıdaki disk 10 rad/s açısal hızla dönüyorsa kinetik enerjisi E = ½·I·ω² = ½ × 0,25 × 10² = 12,5 J, açısal momentumu L = I·ω = 2,5 kg·m²/s\'dir.',
    ] },
    { h: 'Paralel eksen teoremi', p: [
      'Listede bulunmayan bir eksen için çoğu zaman paralel eksen (Steiner) teoremi yeterlidir: kütle merkezinden geçen bir eksene göre eylemsizlik momenti I<sub>km</sub> biliniyorsa, bu eksene paralel ve d kadar uzaktaki başka bir eksene göre değer <strong>I = I<sub>km</sub> + m·d²</strong> olur. Yukarıdaki çubuk örneği bunu doğrular: ortadan geçen eksen için 1 kg·m², eksen 1 m kaydırıldığında 1 + 3 × 1² = 4 kg·m². Birden çok parçadan oluşan cisimlerde her parçanın aynı eksene göre eylemsizlik momenti hesaplanıp toplanır.',
    ] },
    { h: 'Jirasyon yarıçapı ve günlük hayattan örnekler', p: [
      'Jirasyon (dönme) yarıçapı, cismin tüm kütlesi tek bir noktada toplansaydı aynı eylemsizlik momentini vermesi için eksenden ne kadar uzakta olması gerektiğini gösterir: k = √(I/m). İnce halkada bu değer yarıçapın kendisidir; dolu diskte yarıçapın yaklaşık 0,707 katıdır.',
      'Eylemsizlik momenti gündelik hayatta sürekli karşımıza çıkar. Buz patencisi kollarını gövdesine çektiğinde kütlesini eksene yaklaştırır, eylemsizlik momenti küçülür ve açısal momentum korunduğu için dönüşü hızlanır. Volanlar, kütlelerinin çoğunu çembere yakın taşıyacak biçimde yapılır; böylece aynı kütleyle daha fazla dönme enerjisi depolarlar. Eğik düzlemden yuvarlanan dolu bir silindir, aynı kütledeki içi boş bir borudan önce aşağı iner, çünkü borunun enerjisinin daha büyük bölümü dönmeye gider.',
    ] },
    { h: 'Dikkat edilecek noktalar', p: [
      'Buradaki büyüklük <strong>kütle eylemsizlik momentidir</strong> ve birimi kg·m²\'dir. Kiriş ve profil hesaplarında kullanılan, birimi cm<sup>4</sup> ya da mm<sup>4</sup> olan <em>alan atalet momenti</em> farklı bir kavramdır; eğilme dayanımı hesapları için bu araç kullanılmaz.',
      'Formüller homojen, yani yoğunluğu her yerde aynı olan cisimler içindir. "İnce" çubuk ve "ince" kabuk kabulleri, kalınlığın diğer boyutlara göre ihmal edilebilir olduğu anlamına gelir. Yarıçap yerine çap girmek sonucu dört katına çıkaran yaygın bir hatadır. Gerçek makine parçalarında delikler, kamalar ve farklı malzemeler nedeniyle kesin değer için tasarım yazılımı ya da ölçüm gerekir; sonuçlar ders ve ön hesap amaçlıdır.',
    ] },
  ],
  faq: [
    ['Eylemsizlik momentinin birimi nedir?', 'Uluslararası birim sisteminde kg·m²\'dir. Küçük parçalar için g·cm² de kullanılır; 1 kg·m² = 10.000.000 g·cm² eder. Araç her iki birimde de sonuç verir.'],
    ['Eylemsizlik momenti ile atalet momenti aynı şey midir?', 'Evet, dönme dinamiği bağlamında ikisi de aynı büyüklüğü anlatır. Yalnızca mukavemet derslerindeki "alan atalet momenti" farklı bir kavramdır ve birimi uzunluğun dördüncü kuvvetidir.'],
    ['Aynı kütledeki halka ile diskten hangisini döndürmek daha zordur?', 'Halkayı. Halkada kütlenin tamamı eksenden r uzaklıktadır ve I = m·r² olur; dolu diskte kütle merkeze doğru da dağıldığı için I = ½·m·r² ile yarısı kadardır.'],
    ['Dönme ekseni değişirse sonuç değişir mi?', 'Evet. Eylemsizlik momenti her zaman belirli bir eksene göre tanımlanır. İnce bir çubuk ucundan döndürüldüğünde, ortasından döndürülmesine göre dört kat büyük eylemsizlik momentine sahiptir.'],
    ['Dönme kinetik enerjisi nasıl hesaplanır?', 'E = ½·I·ω² formülüyle. I eylemsizlik momenti (kg·m²), ω açısal hızdır (rad/s). Devir/dakika verilmişse önce 2π/60 ile çarparak rad/s\'ye çevirmek gerekir.'],
    ['Listede olmayan bir şekli nasıl hesaplarım?', 'Cismi listedeki basit parçalara ayırın, her birinin aynı eksene göre eylemsizlik momentini bulun ve toplayın. Parçanın kendi kütle merkezi eksenin üzerinde değilse paralel eksen teoremiyle m·d² terimini ekleyin.'],
    ['Silindirin boyu neden formülde yok?', 'Simetri ekseni etrafındaki dönmede her kütle parçasının katkısı yalnızca eksene olan uzaklığına bağlıdır. Boy, kütleyi eksen boyunca dağıtır ama eksene uzaklığı değiştirmez; etkisi zaten toplam kütlenin içinde yer alır.'],
    ['Girdiğim değerler bir yere kaydediliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; kütle ve boyut bilgileri sunucuya gönderilmez.'],
  ],
  related: ['tork-hesapla', 'aci-hizi-hesapla', 'kinetik-enerji-hesapla', 'momentum-hesapla', 'merkezcil-kuvvet-hesapla'],
};
