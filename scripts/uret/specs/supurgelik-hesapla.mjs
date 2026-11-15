export default {
  slug: 'supurgelik-hesapla',
  title: 'Süpürgelik Hesaplama',
  h1Tail: 'metre ve adet',
  pageTitle: 'Süpürgelik Hesaplama – Kaç Metre ve Kaç Boy Süpürgelik Gerekir?',
  description: 'Oda ölçülerini, kapı sayısını ve süpürgelik boyunu girin; gereken toplam süpürgelik metresini ve alınacak boy adedini fire payıyla hesaplayın.',
  card: 'Oda ölçüleri ve kapı boşluklarına göre gereken süpürgelik metresini ve boy adedini fire payıyla hesaplayın.',
  category: 'insaat',
  keywords: ['süpürgelik hesaplama', 'kaç metre süpürgelik lazım', 'süpürgelik metraj hesabı', 'oda çevresi hesaplama', 'parke süpürgelik adedi', 'süpürgelik boyu', 'süpürgelik fire payı'],
  lead: `Odanın enini ve boyunu, kapı sayısını ve satın alacağınız süpürgeliğin boyunu yazın. Araç oda çevresinden kapı boşluklarını düşer, fire payını ekler ve <strong>kaç metre, kaç boy süpürgelik</strong> almanız gerektiğini gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'kapi', label: 'Kapı sayısı', type: 'number', value: '1' },
    { id: 'kapiGen', label: 'Kapı boşluğu genişliği (m)', type: 'number', value: '0,9' },
    { id: 'ek', label: 'Ek uzunluk (m)', type: 'number', value: '0', hint: 'Kolon çıkıntısı, niş, girinti gibi çevreyi uzatan dönüşler.' },
    { id: 'parca', label: 'Süpürgelik boyu (m)', type: 'number', value: '2,4', hint: 'Satıldığı tek parçanın uzunluğu.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const kapi = h.int(v.kapi, 'Kapı sayısı');
    if (kapi < 0) h.err('Kapı sayısı negatif olamaz; kapı yoksa 0 yazın.');
    const kapiGen = h.nonneg(v.kapiGen, 'Kapı boşluğu genişliği');
    const ek = h.nonneg(v.ek, 'Ek uzunluk');
    const parca = h.pos(v.parca, 'Süpürgelik boyu');
    const fire = h.nonneg(v.fire, 'Fire payı');
    const cevre = 2 * (en + boy);
    const dusulen = kapi * kapiGen;
    const net = cevre + ek - dusulen;
    if (!(net > 0)) h.err('Kapı boşlukları oda çevresinden büyük çıkıyor. Kapı sayısını ve genişliğini (metre olarak) kontrol edin.');
    const toplam = net * (1 + fire / 100);
    const adet = Math.ceil(toplam / parca - 1e-9);
    return {
      rows: [
        ['Gerekli süpürgelik', h.fmt(toplam, 2) + ' m'],
        ['Alınacak adet', `${h.fmt(adet, 0)} boy (${h.fmt(parca, 2)} m)`],
        ['Satın alınan toplam', h.fmt(adet * parca, 2) + ' m'],
        ['Oda çevresi', h.fmt(cevre, 2) + ' m'],
        ['Kapı boşlukları', h.fmt(dusulen, 2) + ' m'],
        ['Net döşenecek uzunluk', h.fmt(net, 2) + ' m'],
      ],
      note: 'Hesap dikdörtgen oda içindir. L biçimli ya da girintili odalarda fazladan dönüşleri "Ek uzunluk" alanına ekleyin.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5' }, out: { 'Gerekli süpürgelik': '18,81 m', 'Alınacak adet': '8 boy (2,4 m)', 'Satın alınan toplam': '19,2 m', 'Oda çevresi': '18 m', 'Net döşenecek uzunluk': '17,1 m' } },
    { in: { en: '3', boy: '3,5', kapiGen: '0,8', fire: '5' }, out: { 'Gerekli süpürgelik': '12,81 m', 'Alınacak adet': '6 boy (2,4 m)', 'Oda çevresi': '13 m', 'Net döşenecek uzunluk': '12,2 m' } },
    { in: { en: '6', boy: '4', kapi: '2', parca: '2,7' }, out: { 'Gerekli süpürgelik': '20,02 m', 'Alınacak adet': '8 boy (2,7 m)', 'Kapı boşlukları': '1,8 m', 'Net döşenecek uzunluk': '18,2 m' } },
    { in: { en: '5', boy: '5', kapi: '0', parca: '2,5', fire: '0' }, out: { 'Gerekli süpürgelik': '20 m', 'Alınacak adet': '8 boy (2,5 m)', 'Satın alınan toplam': '20 m' } },
    { in: { en: '4', boy: '3', ek: '1,2' }, out: { 'Gerekli süpürgelik': '15,73 m', 'Alınacak adet': '7 boy (2,4 m)', 'Net döşenecek uzunluk': '14,3 m' } },
    { in: { en: '2', boy: '1,5', kapi: '1', kapiGen: '0,7', parca: '2', fire: '0' }, out: { 'Gerekli süpürgelik': '6,3 m', 'Alınacak adet': '4 boy (2 m)', 'Oda çevresi': '7 m' } },
    { in: { en: '', boy: '5' }, error: true },
    { in: { en: '1', boy: '1', kapi: '5', kapiGen: '0,9' }, error: true },
    { in: { en: '4', boy: '5', kapi: '1,5' }, error: true },
  ],
  howto: [
    `Odanın enini ve boyunu duvardan duvara ölçüp metre olarak yazın. 4 metre 25 santimetre için 4,25 girilir.`,
    `Odaya açılan kapı sayısını ve kapı boşluğunun genişliğini girin. Balkon kapısı gibi yere kadar inen açıklıkları da kapı olarak sayın.`,
    `Odada kolon çıkıntısı, niş ya da girinti varsa bunların çevreye eklediği uzunluğu "Ek uzunluk" alanına yazın.`,
    `Satın alacağınız süpürgeliğin tek parça boyunu ve fire payını belirleyin, ardından "Hesapla" düğmesine basın.`,
    `Sonuçtaki boy adedini sipariş edin. Birden fazla oda varsa her odayı ayrı hesaplayıp adetleri toplayın.`,
  ],
  sections: [
    { h: 'Süpürgelik metrajı nasıl çıkarılır?', p: [
      `Süpürgelik, duvar ile zeminin birleştiği çizgiyi kapatan profildir; parke ve laminatın bıraktığı genleşme boşluğunu gizler, duvarı darbelerden ve temizlik suyundan korur. İhtiyaç duyulan miktar, odanın çevresi kadardır. Dikdörtgen bir odada çevre <strong>2 × (en + boy)</strong> formülüyle bulunur.`,
      `Kapıların olduğu yerde süpürgelik döşenmez; bu yüzden kapı boşluklarının toplam genişliği çevreden düşülür. Kolon ve baca çıkıntıları ise çevreyi uzatır: duvardan 30 cm öne çıkan bir kolon, iki yan yüzü nedeniyle çevreye 60 cm ekler. Araçtaki formül şöyledir: <strong>net uzunluk = çevre + ek uzunluk − kapı sayısı × kapı genişliği</strong>. Bulunan değere fire payı eklenir ve satış boyuna bölünerek yukarı yuvarlanır.`,
    ] },
    { h: 'Çözümlü örnek: 4 × 5 metrelik oda', p: [
      `Oda çevresi 2 × (4 + 5) = 18 metredir. 90 santimetrelik tek bir kapı olduğundan net uzunluk 18 − 0,9 = 17,1 metre olur. Yüzde 10 fire eklenince 17,1 × 1,10 = <strong>18,81 metre</strong> bulunur. Süpürgelikler 2,4 metrelik boylarla satılıyorsa 18,81 ÷ 2,4 = 7,84 çıkar; bu da <strong>8 boy</strong> almak demektir. Sekiz boy toplam 19,2 metre eder ve aradaki fark yedek olarak kalır.`,
      `Aynı odada 30 cm çıkıntılı iki kolon olsaydı ek uzunluğa 1,2 metre yazılır, net uzunluk 18,3 metreye, ihtiyaç da 20,13 metreye çıkardı; bu durumda 9 boy gerekirdi.`,
    ] },
    { h: 'Neden fire payı eklenir?', p: [
      `Süpürgelikler köşelerde gönye (45 derece) kesilerek birleştirilir ve her kesimde bir miktar malzeme kaybolur. Ayrıca duvar uzunlukları süpürgelik boyunun tam katı olmadığından artan kısa parçalar çoğu zaman kullanılamaz. Dört köşeli sade bir odada yüzde 5–10 fire yeterlidir. Çok girintili çıkıntılı odalarda, cumbalı salonlarda ya da kendiniz ilk kez kesim yapacaksanız yüzde 15'e yakın pay bırakmak daha güvenlidir.`,
      `Araç ayrıca "Satın alınan toplam" satırında aldığınız boyların toplam metresini gösterir. Bu değer ile net uzunluk arasındaki fark, elinizde kalacak gerçek yedek miktarıdır.`,
    ] },
    { h: 'Süpürgelik türleri ve satış boyları', p: [
      `Piyasada süpürgelikler malzemesine göre farklı boylarda satılır. Aşağıdakiler sık karşılaşılan örneklerdir; satın almadan önce ürünün gerçek boyunu etiketten kontrol edip araca o değeri yazın.`,
    ], ul: [
      `<strong>MDF ve laminat kaplı süpürgelikler:</strong> çoğunlukla 2,4 ya da 2,7 metre boyunda; laminat parkeyle birlikte en çok tercih edilen türdür.`,
      `<strong>PVC ve plastik süpürgelikler:</strong> genellikle 2,5 metre civarında; suya dayanıklı oldukları için mutfak ve ıslak hacimlere uygundur.`,
      `<strong>Masif ahşap süpürgelikler:</strong> boyları üreticiye göre değişir; masif parke ile uyumlu görünüm verir.`,
      `<strong>Alüminyum ve paslanmaz süpürgelikler:</strong> ofis ve mağazalarda kullanılır; profil boyları genellikle daha uzundur.`,
      `<strong>Seramik süpürgelik:</strong> karo boyunda parçalar hâlinde satılır; parça boyu olarak karonun uzunluğunu yazabilirsiniz.`,
    ] },
    { h: 'Ölçü alırken dikkat edilecekler', ul: [
      `Ölçüyü tavandan değil zemin seviyesinden alın; duvarlar tam dik olmayabilir.`,
      `Kapı boşluğunu kasa dışından kasa dışına ölçün; süpürgelik kasaya kadar gelir, pervazın altına girmez.`,
      `Gömme dolap, ankastre mutfak dolabı ya da sabit mobilya önüne süpürgelik döşenmeyecekse bu uzunlukları kapı boşluğu gibi düşebilirsiniz: kapı sayısını artırmak yerine genişlikleri toplayıp tek bir "kapı" olarak girmek pratik bir yoldur.`,
      `Köşe, birleşim ve bitiş aparatı kullanılan sistemlerde bu parçaların adedini ayrıca sayın: her iç köşe, dış köşe ve kapı kenarı için birer parça gerekir.`,
    ] },
    { h: 'Dikdörtgen olmayan odalar', p: [
      `L biçimli bir odanın çevresi, onu içine alan en büyük dikdörtgenin çevresine eşittir; bu nedenle L odalarda en dıştaki en ve boyu yazmanız yeterlidir, ek uzunluk gerekmez. Buna karşılık duvardan içeri doğru giren nişler ve dışarı çıkan kolonlar çevreyi artırır: her girinti ya da çıkıntı için derinliğin iki katını ek uzunluğa ekleyin. Yuvarlak ya da eğimli duvarlarda esnek süpürgelik kullanılır ve uzunluk şerit metreyle doğrudan duvar boyunca ölçülmelidir.`,
    ] },
    { h: 'Sınırlar', p: [
      `Sonuç, girdiğiniz ölçülere dayalı bir malzeme tahminidir. Duvarların eğriliği, köşelerin gönyesinde olmaması ve kesim sırasında yapılan hatalar gerçek ihtiyacı artırabilir. Renk ve desen farkı oluşmaması için tüm süpürgeliği tek seferde, aynı üretim partisinden almanız önerilir.`,
    ] },
  ],
  faq: [
    ['20 m² oda için kaç metre süpürgelik gerekir?', `Metrekare tek başına yeterli değildir, çünkü aynı alana sahip odaların çevresi farklı olabilir. 4 × 5 metrelik 20 m² odanın çevresi 18 metre, 2 × 10 metrelik 20 m² koridorun çevresi ise 24 metredir. Bu yüzden araç alan yerine en ve boy ölçülerini ister.`],
    ['Kapı boşluğu neden düşülüyor?', `Süpürgelik kapı kasasında sona erer ve kapı açıklığı boyunca döşenmez. Bu genişliği düşmezseniz her kapı için yaklaşık bir metre fazla malzeme hesaplamış olursunuz.`],
    ['Fire payını kaç almalıyım?', `Sade dikdörtgen odalarda yüzde 5–10 yeterlidir. Çok köşeli odalarda ya da kesimi kendiniz yapacaksanız yüzde 10–15 arası daha rahat bir paydır.`],
    ['Süpürgelik boyunu bilmiyorum, ne yazmalıyım?', `Laminat ve MDF süpürgeliklerde en yaygın boylar 2,4 ve 2,7 metredir. Kesin değer ürün etiketinde yazar; satın alacağınız ürünü belirledikten sonra hesabı o boyla yenilemeniz en doğrusudur.`],
    ['Birden fazla oda için nasıl hesap yaparım?', `Her odayı ayrı ayrı hesaplayın ve "Gerekli süpürgelik" metrelerini toplayın. Toplam metreyi süpürgelik boyuna bölerek tek bir adet bulursanız, bir odadan artan parçayı diğerinde kullanma şansınız olur ve daha az boy alırsınız.`],
    ['Kolon çıkıntısını nasıl eklerim?', `Kolonun duvardan ne kadar dışarı çıktığını ölçün ve iki katını "Ek uzunluk" alanına yazın. Kolonun ön yüzü zaten duvar uzunluğunun içinde sayıldığı için yalnızca iki yan yüz eklenir.`],
    ['Köşe ve bitiş aparatları hesaba dahil mi?', `Hayır. Araç yalnızca süpürgelik profilinin metresini ve boy adedini hesaplar. Aparatlı sistemlerde iç köşe, dış köşe, ek ve bitiş parçalarını odadaki köşe ve kapı sayısına göre ayrıca saymalısınız.`],
    ['Ölçülerim bir yere kaydediliyor mu?', `Hayır. Hesaplama yalnızca tarayıcınızda yapılır; oda ölçüleriniz sunucuya gönderilmez ve saklanmaz. Sayfa bir kez açıldıktan sonra çevrimdışı da çalışır.`],
  ],
  related: ['parke-hesapla', 'laminat-hesapla', 'tavan-kartonpiyer-hesapla', 'alan-cevre-hesapla', 'metrekare-hesapla', 'duvar-alani-hesapla'],
};
