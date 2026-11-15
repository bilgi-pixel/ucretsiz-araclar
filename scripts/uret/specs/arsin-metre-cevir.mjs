export default {
  slug: 'arsin-metre-cevir',
  title: 'Arşın Metre Çevirici',
  h1Tail: 'arşın ↔ metre',
  pageTitle: 'Arşın Metre Çevirici – 1 Arşın Kaç Metre, Kaç Santimetre?',
  description: 'Arşını metreye, metreyi arşına çevirin. Çarşı arşını (68 cm), mimar arşını (75,77 cm) ve endaze (65 cm) için ayrı ayrı hesap yapar, santimetre karşılığını gösterir.',
  card: 'Çarşı arşını, mimar arşını ve endazeyi metreye ve santimetreye çevirin; eski ölçüleri bugünkü karşılığıyla görün.',
  category: 'birim',
  keywords: ['arşın kaç metre', '1 arşın kaç cm', 'arşın metre çevirme', 'çarşı arşını', 'mimar arşını', 'endaze kaç cm', 'zira kaç metre', 'eski uzunluk ölçüleri'],
  lead: 'Eski bir tapu kaydında, vakfiyede, romanda ya da büyüklerinizin anlatısında geçen arşın ölçüsünü metreye çevirin. Araç, en yaygın üç arşın türünü ayrı ayrı hesaplar: <strong>çarşı arşını 68 cm</strong>, <strong>mimar arşını yaklaşık 75,77 cm</strong> ve <strong>endaze 65 cm</strong>.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 12' },
    { id: 'birim', label: 'Girilen değerin birimi', type: 'select', options: [['carsi', 'Çarşı arşını (68 cm)'], ['mimar', 'Mimar arşını (75,7738 cm)'], ['endaze', 'Endaze (65 cm)'], ['metre', 'Metre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kat = { carsi: 0.68, mimar: 0.757738, endaze: 0.65, metre: 1 };
    const k = kat[v.birim];
    if (!k) h.err('Listeden geçerli bir birim seçin.');
    const m = x * k;
    const tum = [
      ['metre', 'Metre', h.fmt(m, 4) + ' m'],
      ['carsi', 'Çarşı arşını', h.fmt(m / kat.carsi, 4) + ' arşın'],
      ['mimar', 'Mimar arşını', h.fmt(m / kat.mimar, 4) + ' arşın'],
      ['endaze', 'Endaze', h.fmt(m / kat.endaze, 4) + ' endaze'],
    ];
    // Ana sonuç: arşın girildiyse metre, metre girildiyse çarşı arşını
    const rows = tum.filter((t) => t[0] !== v.birim).map((t) => [t[1], t[2]]);
    rows.splice(1, 0, ['Santimetre', h.fmt(m * 100, 2) + ' cm']);
    return {
      rows,
      note: 'Çarşı arşını 0,68 m, mimar arşını 0,757738 m, endaze 0,65 m kabul edilmiştir. Tarihî ölçüler döneme ve bölgeye göre küçük farklar gösterebilir.',
    };
  },
  cases: [
    { in: { deger: '1', birim: 'carsi' }, out: { 'Metre': '0,68 m', 'Santimetre': '68 cm' } },
    { in: { deger: '10', birim: 'mimar' }, out: { 'Metre': '7,5774 m', 'Santimetre': '757,74 cm' } },
    { in: { deger: '100', birim: 'metre' }, out: { 'Çarşı arşını': '147,0588 arşın', 'Santimetre': '10.000 cm', 'Endaze': '153,8462 endaze' } },
    { in: { deger: '1', birim: 'endaze' }, out: { 'Metre': '0,65 m', 'Santimetre': '65 cm' } },
    { in: { deger: '2,5', birim: 'carsi' }, out: { 'Metre': '1,7 m', 'Santimetre': '170 cm' } },
    { in: { deger: '6,8', birim: 'metre' }, out: { 'Çarşı arşını': '10 arşın' } },
    { in: { deger: '0', birim: 'mimar' }, out: { 'Metre': '0 m' } },
    { in: { deger: 'on', birim: 'carsi' }, error: true },
    { in: { deger: '-3', birim: 'metre' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz uzunluğu yazın; ondalık kısım için virgül kullanabilirsiniz.',
    '"Girilen değerin birimi" listesinden yazdığınız sayının hangi ölçü olduğunu seçin: çarşı arşını, mimar arşını, endaze ya da metre.',
    'Hangi arşını seçeceğinizden emin değilseniz kaynağınıza bakın: kumaş ve gündelik alışveriş için çarşı arşını, yapı ve arazi ölçüleri için mimar arşını kullanılırdı.',
    '"Çevir" düğmesine basın; metre, santimetre ve diğer arşın türlerindeki karşılıklar birlikte listelenir.',
    'Sonucu "Sonucu kopyala" düğmesiyle alıp notlarınıza ya da çalışmanıza ekleyin.',
  ],
  sections: [
    { h: 'Arşın nedir?', p: [
      'Arşın, metrik sistem yerleşmeden önce Osmanlı coğrafyasında ve Anadolu\'da kullanılan temel uzunluk ölçüsüdür. Kökeni, insan kolunun dirsekten orta parmak ucuna kadar olan boyuna dayanır; Arapça kaynaklı metinlerde aynı ölçü <em>zira</em> adıyla geçer. Kol boyu kişiden kişiye değiştiği için zamanla çarşıda, inşaatta ve kumaş ticaretinde ayrı ayrı standartlaşmış arşınlar ortaya çıkmıştır.',
      'Bu yüzden "bir arşın kaç metre?" sorusunun tek bir cevabı yoktur. Hangi arşının kastedildiğini bilmek gerekir. Bu araç en çok karşılaşılan üç türü ayrı seçenekler olarak sunar ve aynı uzunluğun diğer türlerdeki karşılığını da gösterir; böylece kaynağınızda arşının türü belirtilmemişse olası aralığı görebilirsiniz.',
    ] },
    { h: 'Arşın türleri ve metrik karşılıkları', ul: [
      '<strong>Çarşı arşını:</strong> 68 cm (0,68 m). Esnafın gündelik alışverişte, özellikle yünlü ve pamuklu kumaş ölçerken kullandığı arşındır. Halk arasında yalnızca "arşın" denildiğinde çoğunlukla bu kastedilir.',
      '<strong>Mimar arşını (zira-ı mimari):</strong> 75,7738 cm (0,757738 m). Yapı işlerinde, arsa ve yol ölçümlerinde kullanılmıştır. Cami, köprü, han gibi tarihî yapıların ölçüleri bu arşınla verilir.',
      '<strong>Endaze:</strong> 65 cm (0,65 m). Daha çok ipekli ve değerli kumaşların ölçümünde kullanılan, çarşı arşınından biraz kısa ölçüdür.',
    ] },
    { h: 'Çevirme formülü ve çözümlü örnekler', p: [
      'Hesap tek bir çarpmadan ibarettir: <strong>metre = arşın × katsayı</strong>. Katsayı çarşı arşını için 0,68, mimar arşını için 0,757738, endaze için 0,65\'tir. Metreden arşına dönmek için aynı katsayıya bölersiniz: <strong>arşın = metre ÷ katsayı</strong>.',
      '<strong>Örnek 1:</strong> Eski bir çeyiz defterinde "2,5 arşın kumaş" yazıyor. Kumaş çarşı arşınıyla ölçüldüğüne göre 2,5 × 0,68 = 1,7 metre, yani 170 santimetre eder.',
      '<strong>Örnek 2:</strong> Bir vakıf kaydında yapının cephesi 10 mimar arşını olarak verilmiş. 10 × 0,757738 = 7,57738 metre; araç bunu 7,5774 m ve 757,74 cm olarak gösterir.',
      '<strong>Örnek 3:</strong> 100 metrelik bir mesafe kaç arşındır? Çarşı arşınıyla 100 ÷ 0,68 = 147,0588 arşın, endazeyle 100 ÷ 0,65 = 153,8462 endaze eder. Aynı uzunluk mimar arşınıyla yaklaşık 131,97 arşındır; görüldüğü gibi tür seçimi sonucu yüzde onu aşan oranda değiştirir.',
    ] },
    { h: 'Arşının alt ve üst birimleri', p: [
      'Çarşı arşını ve endaze sekiz eşit parçaya bölünür; her parçaya <em>rub</em> (urup) denir. Çarşı arşınının bir rubu 68 ÷ 8 = 8,5 santimetredir. Rub da ikiye bölünerek <em>kirah</em> elde edilir; bir arşın 16 kirahtır. Terzilikte bugün bile duyulan "bir urup" sözü bu bölümlemeden kalmadır.',
      'Mimar arşını ise 24 <em>parmağa</em> ayrılır; bir parmak yaklaşık 3,16 santimetredir. Parmak 12 <em>hatta</em>, hat da 12 <em>noktaya</em> bölünür. Üst birim olarak <em>kulaç</em> ve uzun mesafelerde <em>fersah</em> kullanılmıştır. Buradaki parmak, tesisatçılıkta inç anlamında kullanılan parmakla karıştırılmamalıdır; ikisi farklı uzunluklardır.',
    ] },
    { h: 'Nerelerde karşınıza çıkar?', p: [
      'Arşın bugün resmî ölçü değildir, ancak birçok alanda yaşamaya devam eder. Osmanlı dönemi tapu kayıtları, mahkeme sicilleri ve vakfiyeler uzunluğu arşın, alanı arşın kare üzerinden verir. Tarih, sanat tarihi ve mimarlık öğrencileri kaynak okurken bu ölçüleri metreye çevirmek zorunda kalır. Edebiyatta da sık rastlanır: eski romanlarda kumaş, boy ve mesafe çoğunlukla arşınla anlatılır.',
      'Gündelik dilde arşın deyimlerle sürer. "Herkesi kendi arşınıyla ölçmek", "dili bir arşın" ya da "arşın arşın yürümek" gibi kullanımlar, ölçünün bir zamanlar ne kadar yaygın olduğunu gösterir. Bazı yörelerde yaşlı terziler ve kumaşçılar hâlâ arşın ve urup üzerinden konuşur.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Türünü sormadan arşını 68 cm kabul etmek. Bir yapı ya da arsa ölçüsünde mimar arşını kullanılmış olabilir; aradaki fark arşın başına yaklaşık 7,8 santimetredir.',
      'Arşın kare ile arşını karıştırmak. Alan ölçüsünde katsayının karesi alınır: bir mimar arşın kare yaklaşık 0,574 metrekaredir, 0,7577 değil.',
      'Mimar arşınındaki parmağı inç sanmak. Mimar arşınının parmağı yaklaşık 3,16 cm, inç ise 2,54 cm\'dir.',
      'Farklı kaynaklardaki küçük sapmaları hata saymak. Tarihî ölçüler döneme göre birkaç milimetre oynayabilir; bazı kaynaklar mimar arşınını yuvarlayarak 75,8 cm verir.',
    ] },
    { h: 'Varsayımlar ve sınırlar', p: [
      'Araç, literatürde en yaygın kabul gören değerleri sabit alır. Arşın yüzyıllar içinde ve bölgeden bölgeye değişmiş bir ölçü olduğundan, elinizdeki belgenin dönemine özgü farklı bir değer olabilir. Tapu, miras ya da sınır anlaşmazlığı gibi hukuki sonuç doğuracak işlerde yalnızca bu çeviriye dayanmayın; kadastro kayıtlarına ve konunun uzmanına başvurun. Akademik çalışmalarda da kullandığınız katsayıyı kaynak göstererek belirtmeniz doğru olur.',
    ] },
  ],
  faq: [
    ['1 arşın kaç metredir?', 'Çarşı arşını 0,68 metre, mimar arşını yaklaşık 0,7577 metre, endaze ise 0,65 metredir. Tür belirtilmeden söylenen arşın gündelik kullanımda genellikle 68 santimetrelik çarşı arşınıdır.'],
    ['1 metre kaç arşın eder?', 'Çarşı arşınıyla 1 metre yaklaşık 1,4706 arşın, mimar arşınıyla yaklaşık 1,3197 arşın, endazeyle yaklaşık 1,5385 endaze eder. Hesap, 1 sayısını ilgili katsayıya bölerek yapılır.'],
    ['Çarşı arşını ile mimar arşını arasındaki fark nedir?', 'Çarşı arşını ticarette, özellikle kumaş ölçümünde kullanılan 68 santimetrelik ölçüdür. Mimar arşını yapı ve arazi işlerinde kullanılır ve yaklaşık 75,77 santimetredir. İkisi arasında arşın başına 7,8 santimetre kadar fark vardır.'],
    ['Endaze nedir?', 'Endaze, ipekli ve değerli kumaşların ölçümünde kullanılan 65 santimetrelik eski bir uzunluk birimidir. Çarşı arşını gibi sekiz ruba bölünür. Günümüz Türkçesinde "endazeyi kaçırmak" deyiminde ölçü, kıvam anlamıyla yaşar.'],
    ['Zira ile arşın aynı şey mi?', 'Büyük ölçüde evet. Zira, Arapça kökenli adıdır ve Osmanlı belgelerinde arşınla aynı anlamda kullanılır. "Zira-ı mimari" mimar arşınını ifade eder.'],
    ['Bir urup kaç santimetredir?', 'Urup (rub), arşının sekizde biridir. Çarşı arşınında 68 ÷ 8 = 8,5 santimetre, endazede 65 ÷ 8 = 8,125 santimetre eder.'],
    ['Arşın bugün resmî olarak kullanılıyor mu?', 'Hayır. Türkiye\'de resmî ölçü sistemi metrik sistemdir ve ticarette metre kullanılır. Arşın yalnızca tarihî belgelerde, edebiyatta, deyimlerde ve bazı zanaatkârların gündelik dilinde yaşamaktadır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz sayı hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.'],
  ],
  related: ['parmak-cm-cevir', 'karis-cm-cevir', 'fersah-km-cevir', 'cm-inc-cevir', 'metre-yarda-cevir', 'birim-donustur'],
};
