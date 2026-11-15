export default {
  slug: 'hektar-donum-cevir',
  title: 'Hektar Dönüm Çevirici',
  h1Tail: 'ha ↔ dönüm',
  pageTitle: 'Hektar Dönüm Çevirici – 1 Hektar Kaç Dönüm Hesaplama',
  description: 'Hektarı dönüme, dönümü hektara çevirin. 1 hektar = 10 dönüm = 10.000 m² eşitliğiyle çalışır; metrekare, kilometrekare ve eski dönüm karşılığını da gösterir.',
  card: 'Hektarı dönüme, dönümü hektara çevirin; metrekare, kilometrekare ve eski dönüm karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['hektar dönüm çevirme', '1 hektar kaç dönüm', 'dönüm hektar', 'hektar hesaplama', 'hektar kaç metrekare', 'ha dönüm', 'hektar dekar çevirme'],
  lead: 'Tarım arazisi, orman ya da mera alanını hektardan dönüme veya dönümden hektara çevirin. Hesap <strong>1 hektar = 10 dönüm</strong> eşitliğine dayanır; aynı alanın metrekare, kilometrekare ve eski dönüm karşılığı da listelenir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 3,5', hint: 'Binlik ayraç kullanmayın; ondalık için virgül yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['h', 'Hektar → Dönüm'], ['d', 'Dönüm → Hektar']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const ha = v.yon === 'd' ? x / 10 : x;
    const donum = v.yon === 'd' ? x : x * 10;
    const m2 = ha * 10000;
    const rows = v.yon === 'd'
      ? [['Hektar', h.fmt(ha, 4) + ' ha'], ['Dönüm', h.fmt(donum, 4) + ' dönüm']]
      : [['Dönüm', h.fmt(donum, 4) + ' dönüm'], ['Hektar', h.fmt(ha, 4) + ' ha']];
    rows.push(['Metrekare', h.fmt(m2, 2) + ' m²']);
    rows.push(['Kilometrekare', h.fmt(ha / 100, 6) + ' km²']);
    rows.push(['Eski dönüm (919,3 m²)', h.fmt(m2 / 919.3, 4) + ' eski dönüm']);
    return { rows, note: 'Dönüm, 1.000 m² olan metrik dönüm (dekar) olarak alınmıştır. Eski dönüm satırı yaklaşık 919,3 m² üzerinden hesaplanır.' };
  },
  cases: [
    { in: { deger: '1', yon: 'h' }, out: { 'Dönüm': '10 dönüm', 'Metrekare': '10.000 m²', 'Eski dönüm (919,3 m²)': '10,8778 eski dönüm' } },
    { in: { deger: '25', yon: 'd' }, out: { 'Hektar': '2,5 ha', 'Metrekare': '25.000 m²' } },
    { in: { deger: '3,5', yon: 'h' }, out: { 'Dönüm': '35 dönüm', 'Metrekare': '35.000 m²' } },
    { in: { deger: '100', yon: 'h' }, out: { 'Dönüm': '1.000 dönüm', 'Kilometrekare': '1 km²' } },
    { in: { deger: '7', yon: 'd' }, out: { 'Hektar': '0,7 ha', 'Kilometrekare': '0,007 km²' } },
    { in: { deger: '0,25', yon: 'h' }, out: { 'Dönüm': '2,5 dönüm', 'Metrekare': '2.500 m²' } },
    { in: { deger: '0', yon: 'd' }, out: { 'Hektar': '0 ha' } },
    { in: { deger: '-1', yon: 'h' }, error: true },
    { in: { deger: '', yon: 'h' }, error: true },
  ],
  howto: [
    '"Alan" alanına hektar ya da dönüm cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden Hektar → Dönüm ya da Dönüm → Hektar seçeneğini belirleyin.',
    '"Çevir" düğmesine basın; ilk satırda aradığınız karşılık, altında metrekare, kilometrekare ve eski dönüm değerleri görünür.',
    'Sonucu başvuru formuna, rapora ya da mesaja aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Hektar nedir?', p: [
      'Hektar, kenarı 100 metre olan bir karenin alanıdır: 100 × 100 = <strong>10.000 metrekare</strong>. Simgesi "ha" olarak yazılır. Adı, "yüz" anlamındaki "hekto" ön eki ile 100 metrekarelik "ar" biriminin birleşmesinden gelir; yani bir hektar yüz ardır. Metrik sistemle uyumlu olduğu için tarım, ormancılık, şehir planlama ve çevre alanlarında dünya genelinde yaygın biçimde kullanılır.',
      'Göz önünde canlandırmak için: bir hektar, standart bir futbol sahasından biraz daha büyük bir alandır. Sahaların ölçüsü değişebildiği için bu yalnızca kaba bir benzetmedir; kesin değer her zaman 10.000 m²\'dir.',
    ] },
    { h: 'Hektar ile dönüm arasındaki bağıntı', p: [
      'Günümüzde dönüm 1.000 metrekare olarak kullanılır ve dekarla aynıdır. Hektar 10.000 metrekare olduğuna göre <strong>1 hektar = 10 dönüm</strong> ve <strong>1 dönüm = 0,1 hektar</strong> eder. Çeviri yalnızca 10 ile çarpma ya da 10\'a bölmedir; virgülü bir basamak kaydırmak yeterlidir.',
      'Hektardan dönüme: <strong>dönüm = hektar × 10</strong>. Dönümden hektara: <strong>hektar = dönüm ÷ 10</strong>.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 3,5 hektarlık bir arazi 3,5 × 10 = 35 dönümdür; metrekare olarak 35.000 m² eder.',
      '<strong>Örnek 2:</strong> 25 dönüm tarla 25 ÷ 10 = 2,5 hektardır; bu da 25.000 m²\'ye karşılık gelir.',
      '<strong>Örnek 3:</strong> 7 dönümlük bir zeytinlik 0,7 hektardır. Hektar cinsinden doldurulması istenen bir formda bu değeri yazarsınız.',
      '<strong>Örnek 4:</strong> 100 hektar = 1.000 dönüm = 1 kilometrekare. Haberlerde geçen "500 hektarlık alan" ifadesi 5.000 dönüm ya da 5 km² demektir.',
      '<strong>Örnek 5:</strong> Çeyrek hektar, yani 0,25 ha, 2,5 dönüm ya da 2.500 m²\'dir.',
    ] },
    { h: 'Eski dönümle karşılaştırma', p: [
      'Eski kayıtlarda ya da yaşlıların anlatımında geçen dönüm, yaklaşık 919,3 metrekarelik eski dönüm olabilir. Bu ölçüyle 1 hektar 10.000 ÷ 919,3 = 10,8778 eski dönüme karşılık gelir. Araç, karışıklığı önlemek için bu değeri ayrı bir satırda verir. Güncel ilanlarda, resmî yazışmalarda ve tarımsal destek hesaplarında metrik dönüm, yani dekar geçerlidir; emin değilseniz metrekare üzerinden doğrulama yapmak en güvenli yoldur.',
    ] },
    { h: 'Hektar nerelerde karşınıza çıkar?', p: [
      'Türkiye\'de çiftçiler gündelik hayatta dönüm ya da dekar konuşur; buna karşılık istatistikler, orman ve mera kayıtları, çevre raporları, büyük yatırım projeleri ve uluslararası kaynaklar alanı hektarla verir. Yangın haberlerinde zarar gören orman alanı, baraj ve sulama projelerinde sulanacak arazi, organize sanayi bölgelerinin büyüklüğü, ülkelerin ekili alan verileri hep hektar cinsindendir.',
      'Verim hesaplarında da iki birim arasında gidip gelmek gerekir. Uluslararası kaynaklar verimi hektar başına ton olarak bildirirken yerelde dekar başına kilogram konuşulur. Hektar başına 5 ton verim, dekar başına 500 kilograma karşılık gelir; çünkü hem alan 10\'a bölünür hem de ton kilograma çevrilir. Tohum, gübre ve ilaç dozlarında da "hektara" ve "dekara" verilen değerler arasında 10 kat fark olduğunu unutmamak gerekir; etiketteki birimi yanlış okumak on kat fazla ya da eksik uygulamaya yol açar.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>0,1 ha</strong> = 1 dönüm = 1.000 m²',
      '<strong>0,5 ha</strong> = 5 dönüm = 5.000 m²',
      '<strong>1 ha</strong> = 10 dönüm = 10.000 m²',
      '<strong>2 ha</strong> = 20 dönüm = 20.000 m²',
      '<strong>5 ha</strong> = 50 dönüm = 50.000 m²',
      '<strong>10 ha</strong> = 100 dönüm = 100.000 m² = 0,1 km²',
      '<strong>50 ha</strong> = 500 dönüm = 0,5 km²',
      '<strong>100 ha</strong> = 1.000 dönüm = 1 km²',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata hektarı 1.000 metrekare, dönümü 10.000 metrekare sanarak iki birimi ters çevirmektir; büyük olan hektardır. İkinci hata, hektarı doğrudan 100 dönüm kabul etmektir; 100 sayısı hektar ile ar arasındaki ilişkidir, dönümle ilişki 10\'dur. Üçüncüsü eski ve yeni dönümü karıştırmaktır.',
      'Araç negatif değer kabul etmez; sonuçlar dört ondalık basamağa kadar gösterilir. Bu sayfa bilgilendirme amaçlı bir birim çeviricidir; tapu, kadastro, destek başvurusu gibi resmî işlemlerde ilgili kurumun kayıtlarındaki yüzölçümü esas alınır.',
    ] },
  ],
  faq: [
    ['1 hektar kaç dönümdür?', '1 hektar 10 dönümdür. Hektar 10.000 m², metrik dönüm ise 1.000 m² olduğu için oran 10\'dur.'],
    ['1 dönüm kaç hektar eder?', '1 dönüm 0,1 hektardır. 5 dönüm yarım hektar, 10 dönüm bir hektar eder.'],
    ['1 hektar kaç metrekaredir?', '1 hektar 10.000 metrekaredir; kenarı 100 metre olan bir karenin alanına eşittir.'],
    ['Hektar ile dekar arasındaki fark nedir?', 'Dekar 1.000 m², hektar 10.000 m²\'dir; yani 1 hektar 10 dekardır. Metrik dönüm dekarla aynı büyüklükte olduğundan dönüm için de aynı oran geçerlidir.'],
    ['1 kilometrekare kaç hektardır?', '1 km² 100 hektar, yani 1.000 dönümdür. Araç, girdiğiniz alanın kilometrekare karşılığını da gösterir.'],
    ['Eski dönümle 1 hektar kaç dönüm eder?', 'Eski dönüm yaklaşık 919,3 m² kabul edildiğinde 1 hektar yaklaşık 10,8778 eski dönüm eder.'],
    ['Hektar başına verimi dekara nasıl çeviririm?', 'Hektar başına değeri 10\'a bölün. Hektara 4.000 kg verim, dekara 400 kg demektir. Birim tondan kilograma geçiyorsa ayrıca 1.000 ile çarpmayı unutmayın.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda gerçekleşir; girdiğiniz alan bilgisi sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['donum-metrekare-cevir', 'kilometrekare-hektar-cevir', 'akre-metrekare-cevir', 'evlek-metrekare-cevir', 'alan-cevre-hesapla'],
};
