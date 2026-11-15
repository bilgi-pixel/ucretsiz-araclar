export default {
  slug: 'kinetik-enerji-hesapla',
  title: 'Kinetik Enerji Hesaplama',
  h1Tail: 'E = ½ · m · v²',
  pageTitle: 'Kinetik Enerji Hesaplama – ½mv² Formülüyle Enerji, Kütle, Hız',
  description: 'Kütle ve hızdan kinetik enerjiyi joule olarak hesaplayın ya da enerjiden kütleyi, hızı bulun. Hızı m/s veya km/sa girin; çözümlü örnekler sayfada.',
  card: 'E = ½mv² ile hareket enerjisini, kütleyi ya da hızı bulun; hızı m/s veya km/sa olarak girebilirsiniz.',
  category: 'bilim',
  keywords: ['kinetik enerji hesaplama', 'kinetik enerji formülü', '1/2 mv2', 'hareket enerjisi', 'kinetik enerji nasıl bulunur', 'joule hesaplama', 'kinetik enerjiden hız bulma'],
  lead: `Hareket eden bir cismin <strong>kinetik enerjisini</strong> kütlesinden ve hızından hesaplayın; enerjisi bilinen cismin kütlesini ya da hızını da bulabilirsiniz. Araç <strong>E<sub>k</sub> = ½ · m · v²</strong> bağıntısını kullanır, hızı m/s ya da km/sa olarak kabul eder.`,
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['e', 'Kinetik enerji (E)'], ['m', 'Kütle (m)'], ['v', 'Hız (v)']] },
    { id: 'kutle', label: 'Kütle (kg)', type: 'number', placeholder: 'Örn. 2', hint: 'Kütleyi arıyorsanız boş bırakın.' },
    { id: 'hiz', label: 'Hız', type: 'number', placeholder: 'Örn. 3', hint: 'Hızı arıyorsanız boş bırakın.' },
    { id: 'hizBirim', label: 'Hız birimi', type: 'select', options: [['ms', 'm/s'], ['kmh', 'km/sa']] },
    { id: 'enerji', label: 'Kinetik enerji (J)', type: 'number', placeholder: 'Örn. 9', hint: 'Enerjiyi arıyorsanız boş bırakın.' },
  ],
  compute(v, h) {
    const kat = v.hizBirim === 'kmh' ? 1 / 3.6 : 1;
    let m, hiz, e;
    if (v.bul === 'm') {
      e = h.pos(v.enerji, 'Kinetik enerji');
      hiz = h.pos(v.hiz, 'Hız') * kat;
      m = (2 * e) / (hiz * hiz);
    } else if (v.bul === 'v') {
      e = h.nonneg(v.enerji, 'Kinetik enerji');
      m = h.pos(v.kutle, 'Kütle');
      hiz = Math.sqrt((2 * e) / m);
    } else {
      m = h.pos(v.kutle, 'Kütle');
      hiz = h.nonneg(v.hiz, 'Hız') * kat;
      e = 0.5 * m * hiz * hiz;
    }
    const satirlar = {
      e: ['Kinetik enerji', h.fmt(e, 4) + ' J'],
      m: ['Kütle', h.fmt(m, 4) + ' kg'],
      v: ['Hız', h.fmt(hiz, 4) + ' m/s'],
    };
    const sira = v.bul === 'm' ? ['m', 'e', 'v'] : v.bul === 'v' ? ['v', 'e', 'm'] : ['e', 'm', 'v'];
    return {
      rows: [
        ...sira.map((k) => satirlar[k]),
        ['Hız (km/sa)', h.fmt(hiz * 3.6, 2) + ' km/sa'],
        ['Enerji (kJ)', h.fmt(e / 1000, 4) + ' kJ'],
        ['Momentum', h.fmt(m * hiz, 4) + ' kg·m/s'],
      ],
      note: 'Klasik mekanik bağıntısı kullanılır; ışık hızına yakın hızlar için geçerli değildir. 1 kJ = 1000 J.',
    };
  },
  cases: [
    { in: { bul: 'e', kutle: '2', hiz: '3', hizBirim: 'ms' }, out: { 'Kinetik enerji': '9 J', 'Momentum': '6 kg·m/s' } },
    { in: { bul: 'e', kutle: '1000', hiz: '72', hizBirim: 'kmh' }, out: { 'Kinetik enerji': '200.000 J', 'Hız': '20 m/s', 'Enerji (kJ)': '200 kJ' } },
    { in: { bul: 'v', kutle: '2', enerji: '100' }, out: { 'Hız': '10 m/s', 'Hız (km/sa)': '36 km/sa' } },
    { in: { bul: 'm', hiz: '5', hizBirim: 'ms', enerji: '50' }, out: { 'Kütle': '4 kg', 'Momentum': '20 kg·m/s' } },
    { in: { bul: 'e', kutle: '0,01', hiz: '400', hizBirim: 'ms' }, out: { 'Kinetik enerji': '800 J', 'Enerji (kJ)': '0,8 kJ' } },
    { in: { bul: 'e', kutle: '70', hiz: '0', hizBirim: 'ms' }, out: { 'Kinetik enerji': '0 J' } },
    { in: { bul: 'm', hiz: '36', hizBirim: 'kmh', enerji: '2500' }, out: { 'Kütle': '50 kg', 'Hız': '10 m/s' } },
    { in: { bul: 'e', kutle: '-2', hiz: '3' }, error: true },
    { in: { bul: 'm', hiz: '0', enerji: '50' }, error: true },
  ],
  howto: [
    `"Bulunacak büyüklük" listesinden kinetik enerjiyi mi, kütleyi mi, hızı mı aradığınızı seçin.`,
    `Bildiğiniz değerleri yazın: kütle kilogram, enerji joule cinsindendir. Aradığınız büyüklüğün kutusu boş kalabilir.`,
    `Hızı yazdıysanız "Hız birimi" listesinden m/s ya da km/sa seçin; araç km/sa değerini kendisi m/s birimine çevirir.`,
    `"Hesapla" düğmesine basın. İlk satır aradığınız sonuçtur; altında hızın iki birimdeki karşılığı, enerjinin kilojoule değeri ve momentum yer alır.`,
  ],
  sections: [
    { h: 'Kinetik enerji nedir?', p: [
      `Kinetik enerji, bir cismin hareket ediyor olmasından dolayı sahip olduğu enerjidir. Duran bir cismin kinetik enerjisi sıfırdır; cisim hızlandıkça bu enerji artar. Yuvarlanan bir top, akan su, esen rüzgâr ve yolda giden araç kinetik enerji taşır. Bu enerji başka türlere dönüşebilir: fren yapan aracın kinetik enerjisi balatalarda ısıya, rüzgârın kinetik enerjisi türbinde elektrik enerjisine çevrilir.`,
      `Kinetik enerji yönsüz (skaler) bir büyüklüktür ve hiçbir zaman negatif olmaz. Cisim sağa da gitse sola da gitse aynı süratle hareket ediyorsa kinetik enerjisi aynıdır.`,
    ] },
    { h: 'Formül: E = ½ · m · v²', p: [
      `Öteleme hareketi yapan bir cismin kinetik enerjisi <strong>E<sub>k</sub> = ½ · m · v²</strong> bağıntısıyla bulunur. Burada m kilogram cinsinden kütle, v metre bölü saniye cinsinden hızdır; sonuç <strong>joule (J)</strong> olarak çıkar. 1 joule, 1 kg·m²/s² demektir.`,
      `Formül diğer büyüklükler için de düzenlenebilir: kütle için <code>m = 2E ÷ v²</code>, hız için <code>v = √(2E ÷ m)</code>. Araç seçiminize göre bu üç biçimden uygun olanı kullanır.`,
      `Formülün en önemli özelliği hızın <strong>karesinin</strong> alınmasıdır. Kütle iki katına çıkarsa enerji iki katına çıkar; hız iki katına çıkarsa enerji dört katına, üç katına çıkarsa dokuz katına çıkar.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Örnek 1:</strong> 2 kg kütleli bir cisim 3 m/s hızla hareket ediyor. E = ½ × 2 × 3² = ½ × 2 × 9 = <strong>9 J</strong>.`,
      `<strong>Örnek 2:</strong> 1000 kg kütleli bir otomobil 72 km/sa hızla gidiyor. Önce hız çevrilir: 72 ÷ 3,6 = 20 m/s. E = ½ × 1000 × 20² = 500 × 400 = <strong>200.000 J</strong>, yani 200 kJ.`,
      `<strong>Örnek 3:</strong> 2 kg'lık bir cismin kinetik enerjisi 100 J ise hızı v = √(2 × 100 ÷ 2) = √100 = <strong>10 m/s</strong> olur; bu da 36 km/sa eder.`,
      `<strong>Örnek 4:</strong> 5 m/s hızla giden bir cismin kinetik enerjisi 50 J ise kütlesi m = 2 × 50 ÷ 5² = 100 ÷ 25 = <strong>4 kg</strong> bulunur.`,
    ] },
    { h: 'Hızın karesi trafikte neden önemli?', p: [
      `Fren mesafesinin hızla doğru orantılı değil, yaklaşık olarak hızın karesiyle arttığı bu formülden anlaşılır. Aracı durdurmak için frenlerin tüm kinetik enerjiyi ısıya çevirmesi gerekir. 50 km/sa hızdan 100 km/sa hıza çıkıldığında enerji iki değil dört katına çıkar; aynı fren kuvvetiyle durma yolu da kabaca dört katına uzar.`,
      `Aynı nedenle çarpışmalarda hızdaki küçük artışlar hasarı orantısız biçimde büyütür. 1000 kg'lık bir araç için 50 km/sa hızdaki kinetik enerji yaklaşık 96 kJ iken 90 km/sa hızda 312,5 kJ olur. Bu değerleri aracı kullanarak kendiniz de doğrulayabilirsiniz.`,
    ] },
    { h: 'İş-enerji teoremi ve enerji dönüşümleri', p: [
      `Bir cisme etki eden net kuvvetin yaptığı iş, cismin kinetik enerjisindeki değişime eşittir. Durgun bir cisme 9 J iş yapıldığında kinetik enerjisi 9 J olur; hareketli bir cismi durdurmak için de kinetik enerjisi kadar iş yapılması gerekir.`,
      `Sürtünmenin ihmal edildiği durumlarda mekanik enerji korunur: yüksekten bırakılan cismin potansiyel enerjisi düştükçe kinetik enerjiye dönüşür. Salıncak, sarkaç ve lunapark treni bu dönüşümün gündelik örnekleridir. Gerçek hayatta sürtünme ve hava direnci enerjinin bir kısmını ısıya çevirir.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `Hızın karesini almayı unutmak ya da ½ çarpanını atlamak.`,
      `km/sa cinsinden hızı çevirmeden kullanmak; sonuç yaklaşık 13 kat büyük çıkar (3,6'nın karesi).`,
      `Gram cinsinden kütleyi kilograma çevirmemek; 10 g'lık cisim 0,01 kg'dır.`,
      `Kinetik enerjiyi momentumla karıştırmak; momentum hızla, kinetik enerji hızın karesiyle orantılıdır.`,
      `Bu sayfa yalnızca öteleme kinetik enerjisini hesaplar. Dönen cisimlerin (tekerlek, volan) dönme kinetik enerjisi ayrıca hesaplanır; çok yüksek hızlarda ise göreli bağıntılar gerekir.`,
    ] },
  ],
  faq: [
    ['Kinetik enerji formülü nedir?', `Kinetik enerji, kütlenin yarısı ile hızın karesinin çarpımıdır: E = ½ · m · v². Kütle kg, hız m/s alındığında sonuç joule olur.`],
    ['Kinetik enerjinin birimi nedir?', `SI sisteminde enerji birimi joule'dür (J). 1 J = 1 kg·m²/s² = 1 N·m. Büyük değerlerde kilojoule (1 kJ = 1000 J) kullanılır.`],
    ['Hız iki katına çıkarsa kinetik enerji ne olur?', `Dört katına çıkar. Formülde hızın karesi bulunduğundan hızdaki artış enerjiye karesiyle yansır; hız üç katına çıkarsa enerji dokuz katına çıkar.`],
    ['Kinetik enerji negatif olabilir mi?', `Hayır. Kütle pozitiftir ve hızın karesi hiçbir zaman negatif olmaz; bu yüzden kinetik enerji sıfır ya da pozitiftir. Hareketin yönü sonucu değiştirmez.`],
    ['Kinetik enerjiden hız nasıl bulunur?', `Hız, enerjinin iki katının kütleye bölümünün kareköküdür: v = √(2E ÷ m). Örneğin 100 J enerjili 2 kg'lık cisim 10 m/s hızla hareket eder.`],
    ['km/sa cinsinden hızı nasıl kullanırım?', `"Hız birimi" listesinden km/sa seçmeniz yeterlidir. Araç değeri 3,6'ya bölerek m/s birimine çevirir; elle hesap yapıyorsanız aynı bölmeyi siz yapmalısınız.`],
    ['Kinetik ve potansiyel enerji arasındaki fark nedir?', `Kinetik enerji hareketten, potansiyel enerji konumdan ya da durumdan kaynaklanır. Yüksekte duran cismin potansiyel enerjisi vardır; düşmeye başlayınca bu enerji kinetik enerjiye dönüşür.`],
    ['Yazdığım değerler bir yere gönderiliyor mu?', `Hayır. Tüm hesap tarayıcınızın içinde yapılır; girdiğiniz sayılar sunucuya iletilmez ve kaydedilmez.`],
  ],
  related: ['potansiyel-enerji-hesapla', 'momentum-hesapla', 'is-hesapla', 'guc-hesapla', 'kuvvet-hesapla'],
};
