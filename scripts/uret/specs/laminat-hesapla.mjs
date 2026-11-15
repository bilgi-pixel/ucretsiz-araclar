export default {
  slug: 'laminat-hesapla',
  title: 'Laminat Paket Sayısı Hesaplama',
  h1Tail: 'fire dahil',
  pageTitle: 'Laminat Paket Sayısı Hesaplama – Kaç Paket Laminat Parke Gerekir?',
  description: 'Oda ölçüsü, paket metrekaresi ve fire oranına göre kaç paket laminat parke almanız gerektiğini hesaplayın. Toplam metrekare, yedek kalan alan ve tutar gösterilir.',
  card: 'Oda eni ve boyu, paket metrekaresi ve fire payından kaç paket laminat parke gerektiğini ve toplam tutarı hesaplayın.',
  category: 'insaat',
  keywords: ['laminat hesaplama', 'kaç paket laminat gerekir', 'laminat parke hesaplama', 'laminat paket sayısı', 'laminat fire oranı', 'parke metrekare hesaplama', 'laminat maliyet hesaplama'],
  lead: 'Laminat parke paketle satılır ve paketler bölünmez. Odanızın ölçüsünü, seçtiğiniz ürünün paket metrekaresini ve fire payını yazın; araç <strong>yukarı yuvarlanmış paket sayısını</strong>, alacağınız toplam metrekareyi ve isterseniz toplam tutarı hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'paket', label: 'Bir paketin kapladığı alan (m²)', type: 'number', placeholder: 'Örn. 2,131', hint: 'Ürün etiketinde ya da paketin üzerinde yazar.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10', hint: 'Düz döşemede %5–10, çapraz döşemede %10–15 yaygındır.' },
    { id: 'fiyat', label: 'Paket fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Örn. 850', hint: 'Binlik ayraç kullanmayın ya da 1.500,00 biçiminde yazın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const paket = h.pos(v.paket, 'Bir paketin kapladığı alan');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const alan = en * boy;
    const fireli = alan * (1 + fire / 100);
    const adet = Math.max(1, Math.ceil(fireli / paket - 1e-9));
    const toplam = adet * paket;
    const rows = [
      ['Gerekli paket sayısı', h.fmt(adet, 0) + ' paket'],
      ['Zemin alanı', h.fmt(alan, 2) + ' m²'],
      ['Fire dahil gereken alan', h.fmt(fireli, 2) + ' m²'],
      ['Alınacak toplam alan', h.fmt(toplam, 2) + ' m²'],
      ['Fire ve yedek için kalan', h.fmt(toplam - alan, 2) + ' m²'],
    ];
    if (String(v.fiyat ?? '').trim() !== '') {
      const f = h.nonneg(v.fiyat, 'Paket fiyatı');
      rows.push(['Toplam tutar', h.para(adet * f)]);
      rows.push(['Zemin metrekaresi başına maliyet', h.para(adet * f / alan)]);
    }
    return {
      rows,
      note: 'Paket sayısı her zaman yukarı yuvarlanır. Şilte, süpürgelik, geçiş profili ve işçilik bu hesaba dahil değildir.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', paket: '2,131', fire: '10' }, out: { 'Gerekli paket sayısı': '11 paket', 'Zemin alanı': '20 m²', 'Fire dahil gereken alan': '22 m²', 'Alınacak toplam alan': '23,44 m²', 'Fire ve yedek için kalan': '3,44 m²' } },
    { in: { en: '3', boy: '4', paket: '2,22', fire: '5' }, out: { 'Gerekli paket sayısı': '6 paket', 'Fire dahil gereken alan': '12,6 m²', 'Alınacak toplam alan': '13,32 m²', 'Fire ve yedek için kalan': '1,32 m²' } },
    { in: { en: '5', boy: '4', paket: '2', fire: '0' }, out: { 'Gerekli paket sayısı': '10 paket', 'Alınacak toplam alan': '20 m²', 'Fire ve yedek için kalan': '0 m²' } },
    { in: { en: '6', boy: '4,5', paket: '1,996', fire: '10' }, out: { 'Gerekli paket sayısı': '15 paket', 'Zemin alanı': '27 m²', 'Fire dahil gereken alan': '29,7 m²', 'Alınacak toplam alan': '29,94 m²' } },
    { in: { en: '3,6', boy: '3,2', paket: '2,131', fire: '15' }, out: { 'Gerekli paket sayısı': '7 paket', 'Zemin alanı': '11,52 m²', 'Alınacak toplam alan': '14,92 m²' } },
    { in: { en: '4', boy: '5', paket: '2,131', fire: '10', fiyat: '850' }, out: { 'Gerekli paket sayısı': '11 paket', 'Toplam tutar': '9.350,00 TL', 'Zemin metrekaresi başına maliyet': '467,50 TL' } },
    { in: { en: '4', boy: '5', paket: '0', fire: '10' }, error: true },
    { in: { en: '4', boy: '5', paket: '2,131', fire: '-5' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu duvardan duvara ölçüp metre olarak yazın. Kapı eşiği altına kadar döşenecekse o kısmı da ölçüye katın.',
    'Beğendiğiniz laminatın etiketinden bir paketin kaç metrekare kapladığını bulun ve ilgili alana girin.',
    'Fire payını döşeme yönüne göre ayarlayın: duvara paralel düz döşeme için %5–10, çapraz için %10–15.',
    'Toplam maliyeti görmek isterseniz bir paketin fiyatını yazın, ardından "Hesapla" düğmesine basın.',
    'Sonuçtaki paket sayısını tek seferde ve aynı üretim partisinden satın alın.',
  ],
  sections: [
    { h: 'Laminat paket sayısı nasıl hesaplanır?', p: [
      'Hesap üç adımdan oluşur. Önce zemin alanı bulunur: <strong>alan = en × boy</strong>. Sonra kesim kayıpları için fire payı eklenir: <strong>gereken alan = alan × (1 + fire ÷ 100)</strong>. Son olarak bu değer bir paketin kapladığı alana bölünür ve sonuç <strong>yukarı yuvarlanır</strong>, çünkü mağazalar yarım paket satmaz: <strong>paket sayısı = ⌈gereken alan ÷ paket alanı⌉</strong>.',
      'Yukarı yuvarlama nedeniyle elinize geçen toplam metrekare çoğu zaman fireli ihtiyaçtan biraz fazladır. Araç bu farkı "Fire ve yedek için kalan" satırında gösterir; bu değer hem kesim kayıplarını hem de iş bitince elinizde kalacak yedek tahtaları kapsar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '4 × 5 metrelik bir salona, paketi 2,131 m² kaplayan bir laminat döşenecek olsun. Döşeme duvara paralel yapılacağı için fire %10 alınsın.',
    ], ol: [
      'Zemin alanı: 4 × 5 = 20 m².',
      'Fire dahil gereken alan: 20 × 1,10 = 22 m².',
      'Paket ihtiyacı: 22 ÷ 2,131 = 10,32. Yukarı yuvarlanınca <strong>11 paket</strong>.',
      'Alınacak toplam alan: 11 × 2,131 = 23,44 m².',
      'Zemin alanının üzerindeki pay: 23,44 − 20 = 3,44 m². Bunun bir kısmı kesimde harcanır, kalanı yedek olur.',
      'Paket fiyatı 850 TL ise toplam tutar 11 × 850 = 9.350,00 TL, zemin metrekaresi başına maliyet 467,50 TL olur.',
    ] },
    { h: 'Paket metrekaresi neden üründen ürüne değişir?', p: [
      'Bir paketin kapladığı alan; tahtanın eni, boyu ve paketteki tahta adedine bağlıdır. Kalın laminatlar ağır olduğu için pakete daha az tahta konur ve paket alanı küçülür. Bu yüzden aynı oda için bir üründen 10, başka bir üründen 12 paket gerekebilir. Fiyat karşılaştırırken paket fiyatına değil, <strong>metrekare fiyatına</strong> bakmak gerekir; paket fiyatını paket alanına bölerek bunu bulabilirsiniz.',
      'Paket alanını etiketten okuyamıyorsanız kendiniz hesaplayabilirsiniz: tahta eni × tahta boyu × paketteki adet. Örneğin 0,192 m × 1,285 m ölçüsünde 9 tahta içeren bir paket 0,192 × 1,285 × 9 = 2,22 m² kaplar.',
    ] },
    { h: 'Fire payı ne kadar olmalı?', p: [
      'Fire, duvar kenarlarında tahtaların kesilmesinden ve kesilen parçaların bir kısmının yeniden kullanılamamasından kaynaklanır. Oran, odanın biçimine ve döşeme yönüne göre değişir.',
    ], ul: [
      '<strong>Düz döşeme, dikdörtgen oda:</strong> %5–7 çoğu zaman yeterlidir.',
      '<strong>Düz döşeme, girintili çıkıntılı oda:</strong> kolon, niş ve kapı girişleri kesimi artırır; %10 güvenli bir değerdir.',
      '<strong>Çapraz (45 derece) döşeme:</strong> her sıranın iki ucunda açılı kesim olduğundan %10–15 hesaplanır.',
      '<strong>Balıksırtı ve desenli döşeme:</strong> fire daha da yükselir; üreticinin önerisine bakın.',
      '<strong>Çok küçük alanlar:</strong> koridor ve antre gibi dar mekânlarda kesim oranı yüksektir; fire payını artırın.',
    ] },
    { h: 'Neden bir paket fazla almak akıllıcadır?', p: [
      'Laminat üretimi partiler hâlinde yapılır ve aynı ürün kodunun farklı partileri arasında ton ve doku farkı olabilir. İş ortasında malzeme biterse aynı partiden paket bulamayabilirsiniz; sonradan alınan paket zeminde fark edilen bir renk geçişi yaratır. Ayrıca yıllar içinde su alan, çizilen ya da kabaran tek bir tahtayı değiştirmek için elinizde aynı partiden yedek bulunması büyük kolaylıktır. Hesap sonucu sınırda çıkıyorsa, yani kalan pay çok küçükse, bir paket eklemek genellikle pişman olunmayan bir karardır.',
    ] },
    { h: 'Birden fazla oda için hesap', p: [
      'Her odayı ayrı ayrı hesaplayıp paketleri toplarsanız her oda için ayrı yukarı yuvarlama yapılır ve gereğinden fazla paket çıkabilir. Aynı ürün bütün odalara döşenecekse odaların alanlarını toplayıp tek bir alan olarak girmek daha ekonomik sonuç verir. Bunun için "oda eni" alanına 1, "oda boyu" alanına toplam metrekareyi yazabilirsiniz. Öte yandan odalar arasında eşik profiliyle ayrım yapılacaksa her odanın kesim firesi ayrı oluşur; bu durumda fire payını biraz yüksek tutun.',
    ] },
    { h: 'Laminatla birlikte alınacak diğer malzemeler', p: [
      'Paket sayısı yalnızca laminat tahtaları kapsar. Döşeme için ayrıca zemin alanı kadar şilte (alt örtü), oda çevresi kadar süpürgelik, kapı geçişleri için eşik profili ve duvar kenarlarında genleşme boşluğu bırakmak için takozlar gerekir. Laminat, nem ve sıcaklıkla bir miktar genleşip büzülen bir malzemedir; bu nedenle duvar diplerinde üreticinin belirttiği kadar boşluk bırakılır ve bu boşluk süpürgelikle kapatılır.',
      'Zemin düzgün değilse tesviye şapı, zemin nemliyse nem bariyeri gerekebilir. Bu kalemler bütçeyi etkilediği için laminat fiyatına ek olarak hesaba katılmalıdır. Sonuçlar bilgilendirme amaçlıdır; kesin miktar için döşemeyi yapacak ustanın yerinde ölçü almasında fayda vardır.',
    ] },
  ],
  faq: [
    ['20 metrekare oda için kaç paket laminat gerekir?', 'Paket alanına bağlıdır. Paketi 2,131 m² olan bir üründe %10 fireyle 22 m² gerekir ve bu 11 paket eder. Paketi 2,4 m² olan bir üründe aynı oda için 10 paket yeterlidir.'],
    ['Bir paket laminat kaç metrekaredir?', 'Sabit bir değer yoktur; tahta ölçüsüne, kalınlığa ve paketteki adede göre çoğunlukla 1,5 ile 2,5 m² arasında değişir. Kesin değer ürün etiketinde yazar; hesapta mutlaka o değeri kullanın.'],
    ['Fire payını sıfır girebilir miyim?', 'Girebilirsiniz, ancak önerilmez. Duvar kenarlarında kesim kaçınılmazdır; firesiz hesap, odanız paket alanının tam katı olsa bile pratikte malzemenin yetmemesiyle sonuçlanır.'],
    ['Çapraz döşemede fire neden artar?', 'Tahtalar duvara 45 derece açıyla geldiği için her sıranın başında ve sonunda üçgen parçalar kesilip atılır. Bu parçaların çoğu başka yerde kullanılamaz, bu yüzden fire %10–15 düzeyine çıkar.'],
    ['Artan paketleri iade edebilir miyim?', 'Bu tamamen satıcının iade koşullarına bağlıdır. Açılmamış paketleri belirli süre içinde geri alan satıcılar olduğu gibi kabul etmeyenler de vardır; satın almadan önce sorun.'],
    ['Toplam tutara işçilik dahil mi?', 'Hayır. Tutar yalnızca paket sayısı ile paket fiyatının çarpımıdır. Şilte, süpürgelik, profil, nakliye ve döşeme işçiliği ayrıca hesaplanmalıdır.'],
    ['L biçimli oda için nasıl hesap yaparım?', 'Odayı iki dikdörtgene bölüp alanlarını toplayın. Ardından "oda eni" alanına 1, "oda boyu" alanına toplam metrekareyi yazın. Girintili odalarda fire payını %10 ve üzeri tutmak yerinde olur.'],
    ['Girdiğim ölçü ve fiyatlar saklanıyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez.'],
  ],
  related: ['parke-hesapla', 'supurgelik-hesapla', 'sap-hesapla', 'alan-cevre-hesapla', 'boya-fayans-hesapla'],
};
