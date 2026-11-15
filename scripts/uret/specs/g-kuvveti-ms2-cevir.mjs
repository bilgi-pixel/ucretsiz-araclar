export default {
  slug: 'g-kuvveti-ms2-cevir',
  title: 'G Kuvveti m/s² Çevirici',
  h1Tail: 'g ↔ m/s²',
  pageTitle: 'G Kuvveti m/s² Çevirici – g Değerini İvmeye Çevirme',
  description: 'G kuvvetini m/s² cinsinden ivmeye, m/s² değerini g\'ye çevirin. Standart yer çekimi ivmesi 9,80665 m/s² alınır; ft/s² ve Gal karşılığı da gösterilir.',
  card: 'G kuvvetini m/s² ivmeye, m/s² değerini g\'ye çevirin; ft/s² ve Gal karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['g kuvveti m/s2 çevirme', '1 g kaç m/s2', 'g kuvveti hesaplama', 'ivme g çevirici', 'm/s2 g dönüştürme', 'yer çekimi ivmesi 9,81', 'kaç g'],
  lead: 'Bir ivmeyi g cinsinden m/s²\'ye ya da m/s²\'den g\'ye çevirin. Araç, uluslararası kabul edilen standart yer çekimi ivmesini, yani <strong>1 g = 9,80665 m/s²</strong> değerini kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'İvme değeri', type: 'number', placeholder: 'Örn. 3', hint: 'Yavaşlama (fren) için negatif değer yazabilirsiniz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['g', 'g → m/s²'], ['ms2', 'm/s² → g']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'İvme değeri');
    const G0 = 9.80665;
    const ms2 = v.yon === 'ms2' ? x : x * G0;
    const g = v.yon === 'ms2' ? x / G0 : x;
    const satirMs2 = ['m/s²', h.fmt(ms2, 6) + ' m/s²'];
    const satirG = ['g', h.fmt(g, 5) + ' g'];
    return {
      rows: [
        v.yon === 'ms2' ? satirG : satirMs2,
        v.yon === 'ms2' ? satirMs2 : satirG,
        ['ft/s²', h.fmt(ms2 / 0.3048, 4) + ' ft/s²'],
        ['Gal (cm/s²)', h.fmt(ms2 * 100, 3) + ' Gal'],
      ],
      note: 'Standart yer çekimi ivmesi g₀ = 9,80665 m/s² (tam tanım) alınmıştır. Gerçek yer çekimi ivmesi enleme ve yüksekliğe göre biraz değişir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'g' }, out: { 'm/s²': '9,80665 m/s²', 'ft/s²': '32,174 ft/s²', 'Gal (cm/s²)': '980,665 Gal' } },
    { in: { deger: '9,80665', yon: 'ms2' }, out: { 'g': '1 g' } },
    { in: { deger: '3', yon: 'g' }, out: { 'm/s²': '29,41995 m/s²' } },
    { in: { deger: '19,6133', yon: 'ms2' }, out: { 'g': '2 g' } },
    { in: { deger: '0,5', yon: 'g' }, out: { 'm/s²': '4,903325 m/s²' } },
    { in: { deger: '10', yon: 'ms2' }, out: { 'g': '1,01972 g' } },
    { in: { deger: '0', yon: 'g' }, out: { 'm/s²': '0 m/s²' } },
    { in: { deger: 'on', yon: 'g' }, error: true },
    { in: { deger: '', yon: 'ms2' }, error: true },
  ],
  howto: [
    '"İvme değeri" alanına çevirmek istediğiniz sayıyı yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden g\'den m/s²\'ye mi, m/s²\'den g\'ye mi çevireceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında ft/s² ve Gal birimlerindeki değer görünür.',
    'Sonuçları rapora ya da ödeve aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'G kuvveti aslında nedir?', p: [
      'Adında "kuvvet" geçse de g kuvveti bir kuvvet değil, bir <strong>ivme ölçüsüdür</strong>. Bir cismin maruz kaldığı ivmenin, Dünya yüzeyindeki standart yer çekimi ivmesinin kaç katı olduğunu söyler. Yerde hareketsiz duran biri 1 g hisseder; çünkü zemin, vücudu yer çekimine karşı aynı büyüklükte bir tepkiyle taşır. Hızlanan bir uçakta koltuğa yapışma, lunaparktaki trenin dönemecinde ağırlaşma ya da asansör aşağı doğru hızlanırken hafifleme hissi, bu değerin 1\'in üstüne ya da altına çıkmasıdır.',
      'Birimin temeli, 1901\'de uluslararası ölçü konferansında benimsenen standart yer çekimi ivmesidir: 9,80665 m/s². Bu sayı bir ölçüm sonucu değil, sabitlenmiş bir tanımdır; dolayısıyla çeviri tam olarak bir çarpma ya da bölmedir. Simgesi küçük ve çoğu zaman eğik yazılan g harfidir; gram simgesiyle karışmaması için bağlama dikkat etmek gerekir.',
    ] },
    { h: 'Çeviri formülü', p: [
      'g değerinden metre bölü saniye kareye geçmek için 9,80665 ile çarparsınız: <strong>a (m/s²) = g × 9,80665</strong>. Tersine, m/s² değerini 9,80665\'e bölerek g bulunur: <strong>g = a ÷ 9,80665</strong>. Okul problemlerinde yer çekimi ivmesi çoğu zaman 9,8, 9,81 ya da kolaylık için 10 m/s² alınır; bu araç yuvarlanmamış standart değeri kullandığından sonuç bu kabullerle yapılan hesaptan binde birkaç oranında farklı çıkabilir.',
      'Ek satırlardaki ft/s² değeri, ivmenin feet bölü saniye kare karşılığıdır (1 ft = 0,3048 m); 1 g yaklaşık 32,174 ft/s² eder. Gal ise jeofizikte ve deprem mühendisliğinde kullanılan, 1 cm/s² büyüklüğündeki birimdir; 1 g tam olarak 980,665 Gal\'dir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir pilot keskin dönüşte 3 g\'ye maruz kalıyor. İvme kaç m/s²\'dir? 3 × 9,80665 = 29,41995 m/s². Bu sırada 80 kg\'lık pilotun koltuğa uyguladığı kuvvet, normaldeki ağırlığının üç katı kadardır.',
      '<strong>Örnek 2:</strong> Bir otomobil testinde frenleme ivmesi 10 m/s² ölçülüyor. Bu kaç g eder? 10 ÷ 9,80665 = 1,01972 g; yani yaklaşık 1 g\'lik bir yavaşlama. Yavaşlamayı yönüyle belirtmek isterseniz değeri eksi işaretiyle yazabilirsiniz; araç işareti korur.',
      '<strong>Örnek 3:</strong> Bir ivmeölçer 19,6133 m/s² gösteriyor. 19,6133 ÷ 9,80665 = 2 g. Yarım g ise 0,5 × 9,80665 = 4,903325 m/s²\'dir.',
    ] },
    { h: 'Gündelik hayattan yaklaşık g değerleri', p: [
      'Aşağıdaki değerler kaynağa, araca ve koşula göre değişen kaba büyüklüklerdir; yalnızca fikir vermesi için sıralanmıştır.',
    ], ul: [
      '<strong>0 g</strong>: yörüngedeki uzay aracında serbest düşme hâli (ağırlıksızlık hissi)',
      '<strong>Yaklaşık 0,17 g</strong>: Ay yüzeyindeki çekim ivmesi',
      '<strong>1 g</strong>: Dünya yüzeyinde hareketsiz durmak',
      '<strong>1 g civarı</strong>: binek otomobilde kuru asfaltta çok sert frenleme',
      '<strong>Birkaç g</strong>: hızlı lunapark trenlerinin dip ve dönemeç noktaları, akrobasi uçuşları',
      '<strong>Onlarca g ve üstü</strong>: çarpışma anları, yere düşen bir telefonun zemine vurduğu çok kısa süre',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Havacılık ve uzay alanında uçak gövdelerinin ve pilotların dayanabileceği yük sınırları g ile ifade edilir. Otomotiv dergilerinde viraj tutuşu ve fren performansı g olarak verilir. Telefonlardaki, akıllı saatlerdeki ve oyun kumandalarındaki ivmeölçerler ölçümlerini genellikle g ya da mg (binde bir g) biriminde raporlar; yazılım geliştirirken bu değeri fizik formüllerinde kullanmak için m/s²\'ye çevirmek gerekir. Kargo ve ambalaj testlerinde düşme darbeleri, titreşim analizinde makine gövdesindeki salınımlar yine g ile ölçülür.',
      'Deprem mühendisliğinde zeminin en büyük ivmesi g\'nin kesri olarak ya da Gal biriminde verilir. Örneğin 0,4 g\'lik bir yer ivmesi 3,92266 m/s² ve 392,266 Gal demektir. Bu sayfadaki çeviri bu tür değerleri birbirine dönüştürmenize yardım eder; ancak yapı tasarımı gibi mühendislik kararları için yürürlükteki yönetmelikler ve yetkili bir mühendisin hesabı esas alınmalıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En sık yapılan hata g\'yi kuvvet sanmaktır. Kuvveti bulmak için ivmeyi kütleyle çarpmak gerekir: 2 g altındaki 70 kg\'lık bir kişiye etkiyen kuvvet 70 × 19,6133 ≈ 1.373 newtondur. İkinci hata, küçük g (ivme) ile büyük G\'yi (evrensel kütle çekim sabiti) karıştırmaktır; ikisi tamamen farklı niceliklerdir. Üçüncü hata, ivmeölçer verisinde yer çekiminin zaten 1 g olarak yer aldığını unutmaktır: masada duran bir telefon sıfır değil, yaklaşık 1 g gösterir.',
      'Dünya üzerindeki gerçek yer çekimi ivmesi sabit değildir; ekvatorda yaklaşık 9,78, kutuplarda yaklaşık 9,83 m/s² dolayındadır ve yükseklikle azalır. Araç bu yerel farkları değil, tanım gereği sabit olan standart değeri kullanır. İnsan vücudunun dayanabileceği g değerleri süreye, yöne ve kişiye göre çok değişir; bu sayfa bu konuda bir sağlık ya da güvenlik değerlendirmesi sunmaz.',
    ] },
  ],
  faq: [
    ['1 g kaç m/s²\'dir?', '1 g, tanım gereği tam olarak 9,80665 m/s²\'dir. Günlük hesaplarda 9,81 ya da 9,8 olarak yuvarlanır; bu sayfa yuvarlanmamış standart değeri kullanır.'],
    ['1 m/s² kaç g eder?', '1 m/s², 1 ÷ 9,80665 ≈ 0,10197 g eder. Kabaca her 10 m/s² ivme 1 g\'den biraz fazladır.'],
    ['G kuvveti gerçekten bir kuvvet midir?', 'Hayır. Adı öyle yerleşmiş olsa da g bir ivme ölçüsüdür. Kuvveti bulmak için ivmeyi cismin kütlesiyle çarpmanız gerekir; aynı g değeri ağır bir cisimde daha büyük kuvvet demektir.'],
    ['Neden 9,81 değil de 9,80665 kullanılıyor?', '9,80665 m/s², uluslararası olarak kabul edilmiş standart yer çekimi ivmesidir ve g biriminin tanımıdır. 9,81 bunun yuvarlanmış hâlidir. Fark yaklaşık on binde üçtür ve çoğu problemde önemsizdir.'],
    ['Negatif g ne anlama gelir?', 'İşaret yönü gösterir. Hareket yönünün tersine olan ivme, yani yavaşlama, eksi işaretle yazılabilir. Havacılıkta negatif g ise pilotun koltuğundan yukarı doğru itildiği durumu anlatır. Araç işareti değiştirmeden çevirir.'],
    ['Gal birimi nedir?', 'Gal, 1 cm/s² büyüklüğündeki ivme birimidir ve adını Galileo\'dan alır. 1 m/s² 100 Gal, 1 g ise 980,665 Gal\'dir. Deprem kayıtlarında ve yer çekimi ölçümlerinde kullanılır.'],
    ['Telefonumun ivmeölçeri neden dururken 1 g gösteriyor?', 'Çünkü ivmeölçer serbest düşmeye göre ivmeyi ölçer. Masada duran cihaz, masanın onu yer çekimine karşı taşımasından dolayı yukarı yönde 1 g algılar. Serbest düşen bir cihaz ise sıfıra yakın değer gösterir.'],
    ['Girdiğim değer bir sunucuya gidiyor mu?', 'Hayır. Çeviri tamamen tarayıcınızda yapılır; yazdığınız sayı hiçbir yere gönderilmez ve kaydedilmez.'],
  ],
  related: ['ivme-hesapla', 'kuvvet-hesapla', 'kutle-agirlik-hesapla', 'serbest-dusme-hesapla', 'newton-kgf-cevir', 'gezegen-agirligi-hesapla'],
};
