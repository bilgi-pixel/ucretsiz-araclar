export default {
  slug: 'kilometrekare-hektar-cevir',
  title: 'Kilometrekare Hektar Çevirici',
  h1Tail: 'km² ↔ ha',
  pageTitle: 'Kilometrekare Hektar Çevirici – 1 km² Kaç Hektar Hesaplama',
  description: 'Kilometrekareyi hektara, hektarı kilometrekareye çevirin. 1 km² = 100 hektar eşitliğiyle çalışır; metrekare ve dönüm karşılığını, çözümlü örnekleri de sunar.',
  card: 'Kilometrekareyi hektara, hektarı kilometrekareye çevirin; metrekare ve dönüm karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['kilometrekare hektar çevirme', '1 km2 kaç hektar', 'hektar kilometrekare', 'km2 ha', 'hektar kaç km2', 'kilometrekare kaç dönüm', 'yüzölçümü çevirme'],
  lead: 'Büyük alanları kilometrekareden (km²) hektara (ha) ya da hektardan kilometrekareye çevirin. Araç <strong>1 km² = 100 hektar</strong> eşitliğini kullanır; aynı alanın metrekare ve dönüm karşılığını da gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 12,5', hint: 'Binlik ayraç kullanmayın; ondalık için virgül yazın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['k', 'Kilometrekare (km²) → Hektar (ha)'], ['h', 'Hektar (ha) → Kilometrekare (km²)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const ha = v.yon === 'h' ? x : x * 100;
    const km2 = v.yon === 'h' ? x / 100 : x;
    const rows = v.yon === 'h'
      ? [['Kilometrekare', h.fmt(km2, 6) + ' km²'], ['Hektar', h.fmt(ha, 4) + ' ha']]
      : [['Hektar', h.fmt(ha, 4) + ' ha'], ['Kilometrekare', h.fmt(km2, 6) + ' km²']];
    rows.push(['Metrekare', h.fmt(ha * 10000, 2) + ' m²']);
    rows.push(['Dönüm', h.fmt(ha * 10, 3) + ' dönüm']);
    return { rows, note: '1 km² = 100 ha = 1.000.000 m². Dönüm, 1.000 m² olan metrik dönüm (dekar) olarak alınmıştır.' };
  },
  cases: [
    { in: { deger: '1', yon: 'k' }, out: { 'Hektar': '100 ha', 'Metrekare': '1.000.000 m²', 'Dönüm': '1.000 dönüm' } },
    { in: { deger: '250', yon: 'h' }, out: { 'Kilometrekare': '2,5 km²', 'Dönüm': '2.500 dönüm' } },
    { in: { deger: '2,5', yon: 'k' }, out: { 'Hektar': '250 ha' } },
    { in: { deger: '1', yon: 'h' }, out: { 'Kilometrekare': '0,01 km²', 'Metrekare': '10.000 m²' } },
    { in: { deger: '0,5', yon: 'k' }, out: { 'Hektar': '50 ha', 'Metrekare': '500.000 m²' } },
    { in: { deger: '15000', yon: 'h' }, out: { 'Kilometrekare': '150 km²' } },
    { in: { deger: '0,03', yon: 'k' }, out: { 'Hektar': '3 ha', 'Dönüm': '30 dönüm' } },
    { in: { deger: '-4', yon: 'k' }, error: true },
    { in: { deger: 'on', yon: 'h' }, error: true },
  ],
  howto: [
    '"Alan" alanına kilometrekare ya da hektar cinsinden değeri yazın.',
    '"Çeviri yönü" listesinden hangi birimden hangisine geçeceğinizi seçin.',
    '"Çevir" düğmesine basın; ilk satır aradığınız karşılığı, sonraki satırlar metrekare ve dönüm değerlerini gösterir.',
    'Sonucu rapora, sunuma ya da ödeve aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'İki birimin tanımı', p: [
      'Kilometrekare, kenarı 1 kilometre olan karenin alanıdır. 1 kilometre 1.000 metre olduğundan 1 km² = 1.000 × 1.000 = 1.000.000 metrekaredir. Ülke, il, ilçe, göl ve ada yüzölçümleri bu birimle verilir.',
      'Hektar ise kenarı 100 metre olan karenin alanıdır: 100 × 100 = 10.000 metrekare. Tarım arazileri, ormanlar, parklar, sanayi bölgeleri ve yangın ya da sel gibi olaylardan etkilenen alanlar çoğunlukla hektarla bildirilir. İki birim de metrik sistemin parçasıdır; aralarındaki oran tam ve yuvarlamasızdır.',
    ] },
    { h: 'Neden 100?', p: [
      'Bir kilometrelik kenar, 100 metrelik on parçaya bölünebilir. Kilometrekarelik kareyi hem yatayda hem dikeyde ona böldüğünüzde 10 × 10 = 100 küçük kare elde edersiniz ve bunların her biri bir hektardır. Bu yüzden <strong>1 km² = 100 ha</strong> ve <strong>1 ha = 0,01 km²</strong> olur.',
      'Kilometrekareden hektara: <strong>ha = km² × 100</strong>. Hektardan kilometrekareye: <strong>km² = ha ÷ 100</strong>. İşlem, virgülü iki basamak sağa ya da sola kaydırmaktan ibarettir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 2,5 km²\'lik bir göl kaç hektardır? 2,5 × 100 = 250 hektar.',
      '<strong>Örnek 2:</strong> Bir haberde 15.000 hektarlık orman alanından söz ediliyor. 15.000 ÷ 100 = 150 km². Bu, kenarı yaklaşık 12,2 kilometre olan bir kareye denktir.',
      '<strong>Örnek 3:</strong> 0,5 km²\'lik bir kampüs 50 hektar, yani 500.000 metrekaredir.',
      '<strong>Örnek 4:</strong> 3 hektarlık bir park 0,03 km² eder; dönüm olarak 30 dönümdür.',
      '<strong>Örnek 5:</strong> 1 hektar 0,01 km²\'dir. Küçük alanlarda kilometrekare değerinin sıfıra çok yakın çıkması bu yüzden olağandır; böyle durumlarda hektar ya da metrekare daha okunaklı bir birimdir.',
    ] },
    { h: 'Hangi büyüklükte hangi birim?', p: [
      'Aynı alan farklı birimlerle yazılabilir, ama okunabilirlik için sayının makul büyüklükte kalması istenir. Kabaca bir kural olarak bir konut ya da arsa metrekareyle, bir tarla dönümle, bir çiftlik ya da orman parseli hektarla, bir ilçe ya da il kilometrekareyle anlatılır. "2.000.000 metrekare" yerine "200 hektar" ya da "2 km²" yazmak hem daha kısa hem daha anlaşılırdır.',
      'Haber ve raporlarda birimlerin karıştırılması sık rastlanan bir yanlıştır. 500 hektarı 500 km² diye aktarmak alanı yüz kat büyütür. Bir rakam size olağandışı büyük ya da küçük geliyorsa bu araçla öteki birime çevirip tanıdık bir büyüklükle karşılaştırmak iyi bir sağlama yöntemidir: örneğin 100 hektar, 1 kilometreye 1 kilometrelik bir alandır.',
    ] },
    { h: 'Metrik alan birimleri merdiveni', ul: [
      '<strong>1 ar</strong> = 100 m²',
      '<strong>1 dekar (dönüm)</strong> = 10 ar = 1.000 m²',
      '<strong>1 hektar</strong> = 10 dekar = 100 ar = 10.000 m²',
      '<strong>1 kilometrekare</strong> = 100 hektar = 1.000 dekar = 1.000.000 m²',
      '<strong>10 km²</strong> = 1.000 ha',
      '<strong>100 km²</strong> = 10.000 ha',
      '<strong>1.000 km²</strong> = 100.000 ha',
    ] },
    { h: 'Kullanım senaryoları', p: [
      'Coğrafya derslerinde illerin ve ülkelerin yüzölçümü kilometrekareyle öğretilir; tarım ve ormancılık verileri ise hektarladır. Ekili alanın il yüzölçümüne oranını bulmak gibi bir hesapta iki değeri aynı birime getirmek gerekir. Örneğin yüzölçümü 8.000 km² olan bir ilde 200.000 hektar tarım arazisi varsa, önce 200.000 ÷ 100 = 2.000 km² bulunur; oran 2.000 ÷ 8.000 = yüzde 25\'tir.',
      'Çevresel etki raporları, imar planı açıklamaları, harita ölçeği çalışmaları ve nüfus yoğunluğu hesapları da benzer çeviriler ister. Nüfus yoğunluğu genellikle kilometrekare başına kişi olarak verilir; alan hektarla verilmişse önce kilometrekareye çevrilmelidir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Uzunluk ile alan katsayılarını karıştırmak başlıca hatadır: 1 kilometre 1.000 metredir ama 1 kilometrekare 1.000 değil 1.000.000 metrekaredir. Benzer biçimde 1 km² 10 ya da 1.000 değil, 100 hektardır. Dönüme geçerken ise katsayı 1.000 olur.',
      'Araç negatif değer kabul etmez. Hektar dört, kilometrekare altı ondalık basamağa kadar gösterilir; böylece bir hektarın altındaki küçük alanlar da kilometrekare satırında sıfıra yuvarlanmadan görünür. Resmî işlemlerde ilgili kurumun yayımladığı yüzölçümü değerleri esas alınmalıdır.',
    ] },
  ],
  faq: [
    ['1 kilometrekare kaç hektardır?', '1 km² tam 100 hektardır. Çünkü 1 km² 1.000.000 m², 1 hektar ise 10.000 m²\'dir.'],
    ['1 hektar kaç kilometrekare eder?', '1 hektar 0,01 km²\'dir; yani bir kilometrekarenin yüzde biridir.'],
    ['1 kilometrekare kaç dönümdür?', '1 km² 1.000 dönümdür (1.000 m²\'lik metrik dönüme göre). Araç bu değeri "Dönüm" satırında gösterir.'],
    ['1 kilometrekare kaç metrekaredir?', '1 km² 1.000.000 metrekaredir. Kenar uzunluğu 1.000 metre olduğundan alan 1.000 × 1.000 ile bulunur.'],
    ['10.000 hektar kaç kilometrekare eder?', '10.000 ÷ 100 = 100 km² eder. Bu, kenarı 10 kilometre olan bir karenin alanıdır.'],
    ['Hektarı kilometrekareye çevirirken neden 100\'e bölüyorum, 1.000\'e değil?', 'Çünkü alan birimlerinde kenar oranının karesi geçerlidir. Hektarın kenarı 100 m, kilometrekarenin kenarı 1.000 m\'dir; kenar oranı 10, alan oranı 10 × 10 = 100 olur.'],
    ['Çok küçük bir hektar değeri yazdığımda sonuç neden 0\'a yakın çıkıyor?', 'Kilometrekare çok büyük bir birimdir; 1 hektar bile yalnızca 0,01 km² eder. Küçük alanlar için metrekare ya da dönüm satırına bakmak daha anlamlıdır.'],
    ['Girdiğim sayılar bir yere gönderiliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['hektar-donum-cevir', 'donum-metrekare-cevir', 'akre-metrekare-cevir', 'metrekare-santimetrekare-cevir', 'alan-cevre-hesapla'],
};
