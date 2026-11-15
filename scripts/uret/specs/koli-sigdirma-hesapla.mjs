export default {
  slug: 'koli-sigdirma-hesapla',
  title: 'Koli Sığdırma (Palet ve Konteyner) Hesaplama',
  h1Tail: 'kaç koli sığar?',
  pageTitle: 'Koli Sığdırma Hesaplama – Palete ve Konteynere Kaç Koli Sığar?',
  description: 'Koli ölçülerini girin; Euro palete, standart palete, 20 ve 40 feet konteynere ya da kendi ölçünüzdeki alana kaç koli sığacağını, kat düzenini ve doluluğu görün.',
  card: 'Koli ölçüsünden palete, konteynere ya da özel bir alana kaç koli sığacağını, kat düzenini ve hacim doluluğunu bulun.',
  category: 'gunluk',
  keywords: ['koli sığdırma hesaplama', 'palete kaç koli sığar', 'konteynere kaç koli sığar', 'palet dizilimi hesaplama', 'euro palet koli adedi', '20 feet konteyner koli', 'koli yerleşim hesabı'],
  lead: 'Bir palete, konteynere ya da depo rafına aynı ölçüdeki kolilerden <strong>kaç tane sığacağını</strong> hesaplayın. Koli ölçülerini girin, yükleme alanını seçin; araç en çok koli alan düzgün dizilimi, kat başına adedi, kat sayısını ve hacim doluluğunu verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'koliBoy', label: 'Koli boyu (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'koliEn', label: 'Koli eni (cm)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'koliYuk', label: 'Koli yüksekliği (cm)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'alan', label: 'Yükleme alanı', type: 'select', options: [
      ['euro', 'Euro palet (120 × 80 cm)'],
      ['standart', 'Standart palet (120 × 100 cm)'],
      ['k20', '20 feet konteyner (589 × 235 × 239 cm)'],
      ['k40', '40 feet konteyner (1203 × 235 × 239 cm)'],
      ['k40hc', '40 feet high cube (1203 × 235 × 269 cm)'],
      ['ozel', 'Özel ölçü'],
    ] },
    { id: 'alanYuk', label: 'Yükleme yüksekliği (cm)', type: 'number', placeholder: 'Örn. 150', hint: 'Palette ve özel ölçüde zorunlu; palet tahtası hariç yük yüksekliği. Konteynerde yok sayılır.' },
    { id: 'alanBoy', label: 'Özel alan boyu (cm)', type: 'number', placeholder: 'Örn. 300', hint: 'Yalnızca "Özel ölçü" seçiliyse' },
    { id: 'alanEn', label: 'Özel alan eni (cm)', type: 'number', placeholder: 'Örn. 200', hint: 'Yalnızca "Özel ölçü" seçiliyse' },
    { id: 'dondur', label: 'Koli döndürme', type: 'select', options: [['taban', 'Yalnızca tabanda döndür (dik kalsın)'], ['her', 'Her yöne çevrilebilir'], ['yok', 'Döndürme yok']] },
  ],
  compute(v, h) {
    const l = h.pos(v.koliBoy, 'Koli boyu');
    const w = h.pos(v.koliEn, 'Koli eni');
    const k = h.pos(v.koliYuk, 'Koli yüksekliği');
    const hazir = { k20: [589, 235, 239], k40: [1203, 235, 239], k40hc: [1203, 235, 269] };
    let L, W, H;
    if (hazir[v.alan]) [L, W, H] = hazir[v.alan];
    else {
      if (v.alan === 'ozel') { L = h.pos(v.alanBoy, 'Özel alan boyu'); W = h.pos(v.alanEn, 'Özel alan eni'); }
      else if (v.alan === 'standart') { L = 120; W = 100; }
      else { L = 120; W = 80; }
      H = h.pos(v.alanYuk, 'Yükleme yüksekliği');
    }
    let yonler;
    if (v.dondur === 'yok') yonler = [[l, w, k]];
    else if (v.dondur === 'her') yonler = [[l, w, k], [w, l, k], [l, k, w], [k, l, w], [w, k, l], [k, w, l]];
    else yonler = [[l, w, k], [w, l, k]];
    let en = null;
    for (const [a, b, c] of yonler) {
      const nx = Math.floor(L / a + 1e-9), ny = Math.floor(W / b + 1e-9), nz = Math.floor(H / c + 1e-9);
      const adet = nx * ny * nz;
      if (!en || adet > en.adet) en = { adet, nx, ny, nz, a, b, c };
    }
    if (!en || en.adet < 1) h.err('Koli bu alana sığmıyor. Ölçüleri santimetre olarak girdiğinizden emin olun ya da döndürme seçeneğini değiştirin.');
    if (en.adet > 1e7) h.err('Sonuç 10 milyon koliyi aşıyor; ölçüleri kontrol edin.');
    const doluluk = en.adet * l * w * k / (L * W * H) * 100;
    const taban = en.nx * en.ny * en.a * en.b / (L * W) * 100;
    return {
      rows: [
        ['Sığan koli sayısı', h.fmt(en.adet, 0) + ' koli'],
        ['Yerleşim (boy × en × kat)', en.nx + ' × ' + en.ny + ' × ' + en.nz],
        ['Kat başına koli', h.fmt(en.nx * en.ny, 0) + ' koli'],
        ['Kat sayısı', h.fmt(en.nz, 0) + ' kat'],
        ['Koli yönü (boy × en × yükseklik)', h.fmt(en.a, 1) + ' × ' + h.fmt(en.b, 1) + ' × ' + h.fmt(en.c, 1) + ' cm'],
        ['Yük yüksekliği', h.fmt(en.nz * en.c, 1) + ' cm'],
        ['Taban doluluğu', '%' + h.fmt(taban, 1)],
        ['Hacim doluluğu', '%' + h.fmt(doluluk, 2)],
        ['Toplam koli hacmi', h.fmt(en.adet * l * w * k / 1e6, 2) + ' m³'],
      ],
      note: 'Tüm koliler aynı yönde, düzgün sıralar hâlinde dizilir. Karışık (örgülü) dizilimle bazen birkaç koli daha sığabilir; ağırlık sınırı ayrıca kontrol edilmelidir.',
    };
  },
  cases: [
    { in: { koliBoy: '40', koliEn: '30', koliYuk: '20', alan: 'euro', alanYuk: '100', dondur: 'taban' }, out: { 'Sığan koli sayısı': '40 koli', 'Yerleşim (boy × en × kat)': '4 × 2 × 5', 'Kat başına koli': '8 koli', 'Kat sayısı': '5 kat', 'Hacim doluluğu': '%100', 'Toplam koli hacmi': '0,96 m³' } },
    { in: { koliBoy: '60', koliEn: '40', koliYuk: '40', alan: 'k20', dondur: 'taban' }, out: { 'Sığan koli sayısı': '225 koli', 'Yerleşim (boy × en × kat)': '9 × 5 × 5', 'Kat başına koli': '45 koli', 'Hacim doluluğu': '%65,29', 'Toplam koli hacmi': '21,6 m³' } },
    { in: { koliBoy: '40', koliEn: '30', koliYuk: '20', alan: 'euro', alanYuk: '100', dondur: 'yok' }, out: { 'Sığan koli sayısı': '30 koli', 'Yerleşim (boy × en × kat)': '3 × 2 × 5', 'Taban doluluğu': '%75', 'Hacim doluluğu': '%75' } },
    { in: { koliBoy: '60', koliEn: '40', koliYuk: '30', alan: 'standart', alanYuk: '120', dondur: 'her' }, out: { 'Sığan koli sayısı': '18 koli', 'Hacim doluluğu': '%90' } },
    { in: { koliBoy: '60', koliEn: '40', koliYuk: '40', alan: 'k40hc', dondur: 'taban' }, out: { 'Sığan koli sayısı': '600 koli', 'Yerleşim (boy × en × kat)': '20 × 5 × 6', 'Yük yüksekliği': '240 cm' } },
    { in: { koliBoy: '50', koliEn: '50', koliYuk: '50', alan: 'ozel', alanYuk: '100', alanBoy: '100', alanEn: '100', dondur: 'taban' }, out: { 'Sığan koli sayısı': '8 koli', 'Yerleşim (boy × en × kat)': '2 × 2 × 2', 'Hacim doluluğu': '%100' } },
    { in: { koliBoy: '200', koliEn: '100', koliYuk: '100', alan: 'euro', alanYuk: '150', dondur: 'taban' }, error: true },
    { in: { koliBoy: '40', koliEn: '30', koliYuk: '20', alan: 'euro', alanYuk: '', dondur: 'taban' }, error: true },
  ],
  howto: [
    'Kolinin dış ölçülerini santimetre olarak girin: boy, en ve yükseklik. İç ölçü yerine dış ölçüyü kullanın; karton kalınlığı yüzlerce kolide belirgin fark yaratır.',
    '"Yükleme alanı" listesinden palet ya da konteyner tipini seçin. Raf, kamyonet kasası ya da depo bölmesi gibi alanlar için "Özel ölçü" seçip boy ve eni alttaki alanlara yazın.',
    'Palet ve özel ölçüde "Yükleme yüksekliği" alanına kolilerin en fazla kaç santimetre yükselebileceğini girin. Palet tahtasının kendi yüksekliğini bu değere katmayın.',
    'Kolinin yan ya da ters çevrilip çevrilemeyeceğine göre döndürme seçeneğini belirleyin. Kırılacak ya da sıvı içeren ürünlerde "Yalnızca tabanda döndür" seçeneğini kullanın.',
    '"Hesapla" düğmesine basın. Sonuçtaki yerleşim satırı, alanın boyu ve eni boyunca kaç koli dizileceğini ve kaç kat çıkılacağını gösterir.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılır?', p: [
      'Araç, bütün kolilerin aynı yönde ve düzgün sıralar hâlinde dizildiği ızgara yerleşimini hesaplar. Alanın boyu koli boyuna, eni koli enine, yüksekliği koli yüksekliğine bölünür ve her bölümün tam kısmı alınır. Üç sayının çarpımı sığan koli adedidir: <strong>adet = ⌊alan boyu ÷ koli boyu⌋ × ⌊alan eni ÷ koli eni⌋ × ⌊yükseklik ÷ koli yüksekliği⌋</strong>.',
      'Koli döndürülebiliyorsa aynı hesap her olası yön için tekrarlanır ve en çok koli alan yön seçilir. "Yalnızca tabanda döndür" seçeneğinde koli dik kalır, yalnızca boyu ile eni yer değiştirir; iki yön denenir. "Her yöne çevrilebilir" seçeneğinde kolinin üç kenarından herhangi biri yükseklik olabilir; altı yön denenir.',
    ] },
    { h: 'Çözümlü örnek: Euro palete 40 × 30 × 20 cm koli', p: [
      'Euro paletin tabanı 120 × 80 cm\'dir ve yükleme yüksekliğini 100 cm aldığımızı düşünelim. Koliyi 40 cm\'lik kenarı paletin boyuna gelecek biçimde dizersek boyda 120 ÷ 40 = 3, ende 80 ÷ 30 = 2 koli sığar; kat başına 6 koli eder ve tabanın dörtte biri boş kalır. Koliyi tabanda çeyrek tur döndürürsek boyda 120 ÷ 30 = 4, ende 80 ÷ 40 = 2 koli sığar; kat başına 8 koli olur ve taban tümüyle dolar.',
      'Yükseklikte 100 ÷ 20 = 5 kat çıkılabilir. Döndürülmüş dizilimle toplam 8 × 5 = 40 koli sığar; döndürme kapalıyken sonuç 6 × 5 = 30 kolide kalır. Araç bu örnek için "4 × 2 × 5" yerleşimini ve yüzde 100 hacim doluluğunu gösterir. Tek bir çeyrek dönüşün palet başına on koli fark ettirdiği bu örnek, dizilim yönünün nakliye maliyetini nasıl etkilediğini açıkça gösterir.',
    ] },
    { h: 'Hazır alan ölçüleri', ul: [
      '<strong>Euro palet:</strong> 120 × 80 cm taban. Avrupa\'ya ihracatta ve perakende zincirlerinde en yaygın ölçüdür.',
      '<strong>Standart (endüstriyel) palet:</strong> 120 × 100 cm taban.',
      '<strong>20 feet konteyner:</strong> iç ölçü yaklaşık 589 × 235 × 239 cm, hacim yaklaşık 33 m³.',
      '<strong>40 feet konteyner:</strong> iç ölçü yaklaşık 1203 × 235 × 239 cm, hacim yaklaşık 67 m³.',
      '<strong>40 feet high cube:</strong> iç ölçü yaklaşık 1203 × 235 × 269 cm; standart 40 feet\'ten yaklaşık 30 cm daha yüksektir.',
    ], p: [
      'Konteyner iç ölçüleri üreticiye ve konteynerin yaşına göre birkaç santimetre değişir; kapı açıklığı da iç ölçüden biraz dardır. Sınırda kalan dizilimlerde nakliyecinizden kullanılacak konteynerin gerçek iç ölçülerini isteyin ya da "Özel ölçü" seçeneğiyle bir miktar pay bırakarak hesaplayın.',
    ] },
    { h: 'Palet yüksekliğini belirlerken', p: [
      'Yükleme yüksekliği için tek bir doğru değer yoktur; alıcının depo raf aralığı, nakliye aracının iç yüksekliği ve ürünün üst üste binmeye dayanımı belirleyicidir. Alıcılar ve lojistik firmaları çoğunlukla palet dahil toplam yükseklik için bir üst sınır bildirir; bu sınırdan palet tahtasının yüksekliğini (ahşap paletlerde yaklaşık 14–15 cm) düşerek araca girin.',
      'Konteynere paletli yükleme yapacaksanız iki adımda ilerleyin: önce bu araçla bir palete kaç koli sığdığını bulun, sonra paleti (yüküyle birlikte) tek bir büyük koli gibi düşünüp konteyner seçeneğiyle kaç palet sığacağını hesaplayın.',
    ] },
    { h: 'Sonucu yorumlarken dikkat edilecekler', p: [
      '<strong>Ağırlık sınırı:</strong> Araç yalnızca geometriye bakar. Paletlerin, rafların, araçların ve konteynerlerin taşıyabileceği azami yük vardır; ağır ürünlerde hacim dolmadan ağırlık sınırına ulaşılır. Koli ağırlığını adetle çarpıp taşıyıcının bildirdiği sınırla karşılaştırın.',
      '<strong>Üst üste binme dayanımı:</strong> Alt sıradaki kolinin üstündeki katların ağırlığını taşıyabilmesi gerekir. Karton kolilerin dayanımı nemle düşer; üretici koli üzerinde azami istif katını belirtmişse bu sayıyı aşmayın.',
      '<strong>Taşma ve boşluk:</strong> Kolilerin palet kenarından taşması hasar riskini artırır; araç taşmaya izin vermez. Öte yandan gerçek yüklemede koliler arasında birkaç milimetrelik boşluk kalır; sonuç tam sınırdaysa (bölüm tam sayı çıkıyorsa) koli ölçülerine bir iki milimetre pay ekleyerek yeniden hesaplamak güvenlidir.',
      '<strong>Karışık dizilim:</strong> Bazı ölçülerde kolilerin bir kısmını boyuna, bir kısmını enine koyan örgülü dizilimler düzgün ızgaradan daha fazla koli alır ve istifi daha sağlam kılar. Araç bu dizilimleri hesaplamaz; "Taban doluluğu" yüzdesi düşükse elle bir karışık düzen denemeye değer.',
    ] },
    { h: 'Kimler için yararlı?', p: [
      'E-ticaret satıcıları ve üreticiler koli ölçüsünü belirlerken bu hesabı tersinden kullanabilir: koliyi birkaç santimetre küçültmek ya da oranlarını değiştirmek, palete sığan adedi belirgin biçimde artırabilir. İhracatçılar teklif aşamasında bir konteynere kaç koli sığacağını görerek birim navlun maliyetini çıkarabilir. Depo sorumluları raf gözü ölçüsünü "Özel ölçü" olarak girip göz başına stok kapasitesini hesaplayabilir. Sonuçlar planlama amaçlıdır; kesin yükleme planı için taşıyıcınızın ölçü ve ağırlık koşullarını esas alın.',
    ] },
  ],
  faq: [
    ['Euro palete kaç koli sığar?', 'Koli ölçüsüne ve yükleme yüksekliğine bağlıdır. Örneğin 40 × 30 × 20 cm kolilerden kat başına 8 adet sığar; 100 cm yük yüksekliğinde 5 kat ile toplam 40 koli eder. Kendi ölçünüzü girerek sonucu görebilirsiniz.'],
    ['20 feet konteynere kaç koli sığar?', '60 × 40 × 40 cm koliler için düzgün dizilimle 225 koli sığar: tabanda 9 × 5 = 45 koli ve 5 kat. Farklı ölçüler için koli boyutlarını yazıp "20 feet konteyner" seçeneğini kullanın.'],
    ['Yükleme yüksekliğine palet dahil mi?', 'Hayır. Bu alana yalnızca kolilerin kaplayabileceği yüksekliği yazın. Size toplam yükseklik sınırı bildirilmişse palet tahtasının yüksekliğini düşüp kalanı girin.'],
    ['"Her yöne çevrilebilir" seçeneğini ne zaman kullanmalıyım?', 'Ürün yan ya da ters durduğunda zarar görmüyorsa ve koli üzerinde "bu taraf yukarı" işareti yoksa kullanabilirsiniz. Sıvı, cam, elektronik ve gıda ürünlerinde genellikle koli dik kalmalıdır.'],
    ['Araç neden daha fazla koli sığabileceğini söylüyor?', 'Hesap, tüm kolilerin aynı yönde dizildiği düzeni esas alır. Bazı ölçü oranlarında kolilerin bir bölümünü çevirerek oluşturulan karışık dizilimler birkaç koli daha alabilir. Taban doluluğu yüzde 85\'in altındaysa bunu denemeye değer.'],
    ['Farklı boyutlarda koliler için hesap yapabilir miyim?', 'Araç tek tip koli için tasarlanmıştır. Farklı ölçülerdeki kolileri karışık yüklemek için her ölçüyü ayrı hesaplayıp alanı aralarında paylaştırabilirsiniz; ancak sonuç yaklaşık olur.'],
    ['Koli ölçülerini inç olarak aldım, ne yapmalıyım?', 'Her ölçüyü 2,54 ile çarparak santimetreye çevirin. Örneğin 16 × 12 × 8 inç bir koli 40,64 × 30,48 × 20,32 cm eder; ondalıklı değerleri virgülle yazabilirsiniz.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; ürün ve sevkiyat bilgileriniz sunucuya iletilmez.'],
  ],
  related: ['palet-yukleme-hesapla', 'ev-tasima-koli-hesapla', 'bavul-hacmi-hesapla', 'desimetrekup-litre-cevir', 'cm-inc-cevir'],
};
