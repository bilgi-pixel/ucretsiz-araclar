export default {
  slug: 'binde-hesapla',
  title: 'Binde Hesaplama',
  h1Tail: '‰ (promil) hesabı',
  pageTitle: 'Binde Hesaplama – Bir Sayının Binde Kaçı, Binde Oranı Bulma',
  description: 'Bir sayının binde kaçını hesaplayın, bir sayının diğerinin binde kaçı olduğunu bulun ya da tutara binde oranı ekleyip çıkarın. Yüzde karşılığı da gösterilir.',
  card: 'Bir sayının binde X\'ini bulun, iki sayı arasındaki binde oranını hesaplayın ya da tutara binde ekleyip çıkarın.',
  category: 'matematik',
  keywords: ['binde hesaplama', 'binde kaç hesaplama', 'binde oranı hesaplama', 'promil hesaplama', 'binde 5 nasıl hesaplanır', 'binde yüzde çevirme', 'binde işareti'],
  lead: 'Yüzdenin onda biri duyarlılığındaki <strong>binde (‰)</strong> oranlarıyla dört temel hesabı yapın: bir sayının binde X\'ini bulma, bir sayının diğerinin binde kaçı olduğunu bulma, tutara binde oranı ekleme ve tutardan binde oranı çıkarma.',
  button: 'Hesapla',
  inputs: [
    { id: 'islem', label: 'İşlem', type: 'select', wide: true, options: [
      ['pay', 'Sayının binde X\'i kaçtır?'],
      ['oran', 'Bir sayı, ana sayının binde kaçıdır?'],
      ['ekle', 'Sayıya binde X ekle'],
      ['cikar', 'Sayıdan binde X çıkar'],
    ] },
    { id: 'sayi', label: 'Ana sayı (tutar)', type: 'number', placeholder: 'Örn. 50000' },
    { id: 'deger', label: 'Binde oranı (‰) ya da karşılaştırılan sayı', type: 'number', placeholder: 'Örn. 7,59', hint: '"Binde kaçıdır?" işleminde karşılaştırılan sayıyı, diğer işlemlerde binde oranını yazın.' },
  ],
  compute(v, h) {
    if (v.islem === 'oran') {
      const s = h.num(v.sayi, 'Ana sayı (tutar)');
      const a = h.num(v.deger, 'Karşılaştırılan sayı');
      if (s === 0) h.err('Ana sayı sıfır olamaz; bir sayının sıfıra oranı hesaplanamaz. Sıfırdan farklı bir ana sayı yazın.');
      const o = a / s;
      return {
        rows: [
          ['Binde oranı', '‰' + h.fmt(o * 1000, 4)],
          ['Yüzde karşılığı', '%' + h.fmt(o * 100, 5)],
          ['Ondalık oran', h.fmt(o, 8)],
        ],
        note: `İşlem: ${h.fmt(a, 6)} ÷ ${h.fmt(s, 6)} × 1000.`,
      };
    }
    const s = h.num(v.sayi, 'Ana sayı (tutar)');
    const x = h.nonneg(v.deger, 'Binde oranı');
    const pay = (s * x) / 1000;
    const yuzde = ['Yüzde karşılığı', '%' + h.fmt(x / 10, 5)];
    if (v.islem === 'ekle') {
      return {
        rows: [['Sonuç', h.fmt(s + pay, 4)], ['Eklenen tutar', h.fmt(pay, 4)], yuzde],
        note: `İşlem: ${h.fmt(s, 6)} × (1 + ${h.fmt(x, 6)} ÷ 1000).`,
      };
    }
    if (v.islem === 'cikar') {
      return {
        rows: [['Sonuç', h.fmt(s - pay, 4)], ['Çıkarılan tutar', h.fmt(pay, 4)], yuzde],
        note: `İşlem: ${h.fmt(s, 6)} × (1 − ${h.fmt(x, 6)} ÷ 1000).`,
      };
    }
    return {
      rows: [['Sonuç', h.fmt(pay, 4)], yuzde, ['Ondalık çarpan', h.fmt(x / 1000, 8)]],
      note: `İşlem: ${h.fmt(s, 6)} × ${h.fmt(x, 6)} ÷ 1000.`,
    };
  },
  cases: [
    { in: { islem: 'pay', sayi: '50000', deger: '7,59' }, out: { 'Sonuç': '379,5', 'Yüzde karşılığı': '%0,759', 'Ondalık çarpan': '0,00759' } },
    { in: { islem: 'oran', sayi: '2000', deger: '5' }, out: { 'Binde oranı': '‰2,5', 'Yüzde karşılığı': '%0,25', 'Ondalık oran': '0,0025' } },
    { in: { islem: 'ekle', sayi: '1000', deger: '15' }, out: { 'Sonuç': '1.015', 'Eklenen tutar': '15', 'Yüzde karşılığı': '%1,5' } },
    { in: { islem: 'cikar', sayi: '1000', deger: '15' }, out: { 'Sonuç': '985', 'Çıkarılan tutar': '15' } },
    { in: { islem: 'pay', sayi: '250000', deger: '2' }, out: { 'Sonuç': '500', 'Yüzde karşılığı': '%0,2', 'Ondalık çarpan': '0,002' } },
    { in: { islem: 'pay', sayi: '1000', deger: '1' }, out: { 'Sonuç': '1', 'Yüzde karşılığı': '%0,1' } },
    { in: { islem: 'oran', sayi: '80000', deger: '400' }, out: { 'Binde oranı': '‰5', 'Yüzde karşılığı': '%0,5' } },
    { in: { islem: 'pay', sayi: '1250', deger: '40' }, out: { 'Sonuç': '50', 'Yüzde karşılığı': '%4' } },
    { in: { islem: 'oran', sayi: '0', deger: '5' }, error: true },
    { in: { islem: 'pay', sayi: 'abc', deger: '5' }, error: true },
    { in: { islem: 'ekle', sayi: '1000', deger: '-3' }, error: true },
    { in: { islem: 'pay', sayi: '1000', deger: '' }, error: true },
  ],
  howto: [
    '"İşlem" listesinden yapmak istediğiniz hesabı seçin.',
    '"Ana sayı (tutar)" alanına bütünü, yani oranın uygulanacağı sayıyı yazın: sözleşme bedeli, satış tutarı, nüfus gibi.',
    'İkinci alana, seçtiğiniz işleme göre binde oranını (örneğin 7,59) ya da ana sayıyla karşılaştırılacak sayıyı yazın.',
    '"Hesapla" düğmesine basın. Sonucun yanında oranın yüzde karşılığı ve yapılan işlem de gösterilir.',
  ],
  sections: [
    { h: 'Binde nedir?', p: [
      'Binde, bir bütünün bin eşit parçaya bölündüğü düşünülerek bu parçalardan kaç tanesinin alındığını söyleyen orandır. Yüzdeye çok benzer; tek fark paydanın 100 yerine 1000 olmasıdır. "Binde 5" demek 5/1000, yani 0,005 demektir. Simgesi yüzde işaretinin sonuna bir küçük sıfır daha eklenmiş hâlidir: <strong>‰</strong>. Bu simge "promil" diye de okunur.',
      'Binde, oranlar küçük olduğunda tercih edilir. Yüzde 0,2 demek yerine binde 2 demek hem daha kolay söylenir hem de virgül hatası yapma olasılığını azaltır. Bu yüzden küçük kesintiler, harçlar, komisyonlar ve nüfus istatistikleri çoğunlukla binde ile ifade edilir.',
    ] },
    { h: 'Dört hesap türü ve formülleri', ul: [
      '<strong>Bir sayının binde X\'i:</strong> sayı × X ÷ 1000. Örnek: 50.000\'in binde 7,59\'u = 50.000 × 7,59 ÷ 1000 = 379,5.',
      '<strong>Bir sayı diğerinin binde kaçı:</strong> parça ÷ bütün × 1000. Örnek: 5, 2.000\'in binde kaçıdır? 5 ÷ 2.000 × 1000 = ‰2,5.',
      '<strong>Sayıya binde X ekleme:</strong> sayı × (1 + X ÷ 1000). Örnek: 1.000\'e binde 15 eklenirse 1.000 × 1,015 = 1.015 olur.',
      '<strong>Sayıdan binde X çıkarma:</strong> sayı × (1 − X ÷ 1000). Örnek: 1.000\'den binde 15 çıkarılırsa 1.000 × 0,985 = 985 kalır.',
    ] },
    { h: 'Binde ile yüzde arasında geçiş', p: [
      'Binde değerini yüzdeye çevirmek için 10\'a bölersiniz; yüzdeyi bindeye çevirmek için 10 ile çarparsınız. Binde 5, yüzde 0,5\'tir; yüzde 2, binde 20\'dir. Ondalık çarpana geçmek için binde değeri 1000\'e bölünür, yani virgül üç basamak sola kayar: binde 7,59 çarpan olarak 0,00759\'dur.',
    ], ul: [
      '<strong>‰1</strong> = %0,1 = 0,001',
      '<strong>‰2</strong> = %0,2 = 0,002',
      '<strong>‰5</strong> = %0,5 = 0,005',
      '<strong>‰10</strong> = %1 = 0,01',
      '<strong>‰25</strong> = %2,5 = 0,025',
      '<strong>‰100</strong> = %10 = 0,1',
      '<strong>‰1000</strong> = %100 = 1 (bütünün tamamı)',
    ] },
    { h: 'Binde nerelerde kullanılır?', p: [
      'Türkiye\'de binde oranıyla en sık resmî işlemlerde karşılaşılır. Sözleşmelerde ve çeşitli kâğıtlarda alınan damga vergisi, tapu işlemlerindeki harçlar, bazı banka ve aracılık komisyonları ile sigorta primlerinde oranlar binde olarak belirtilir. Bu oranlar zaman içinde değişebildiği için araç sabit bir oran içermez; işleminiz için geçerli güncel oranı ilgili kurumdan öğrenip kendiniz girmeniz gerekir.',
      'İstatistikte doğum, ölüm ve göç hızları bin kişi başına verilir: bir ilde yılda bin kişi başına 14 doğum olması, kaba doğum hızının binde 14 olduğu anlamına gelir. Deniz suyunun tuzluluğu da binde ile ölçülür; okyanus suyunun ortalama tuzluluğu yaklaşık binde 35\'tir, yani bir kilogram suda yaklaşık 35 gram tuz bulunur. Demiryolu ve boru hatlarında eğim binde olarak verilir; binde 10 eğim, her 1.000 metrede 10 metre yükselme demektir. Kandaki alkol miktarı için kullanılan "promil" sözcüğü de binde anlamına gelir.',
    ] },
    { h: 'Çözümlü örnek: sözleşme bedeli üzerinden kesinti', p: [
      'Bedeli 250.000 lira olan bir sözleşmeden binde 2 oranında bir kesinti yapılacağını varsayalım. Hesap şöyle yürür: 250.000 × 2 ÷ 1000 = 500 lira. Araçta "Sayının binde X\'i kaçtır?" işlemini seçip ana sayıya 250000, orana 2 yazdığınızda sonuç 500, yüzde karşılığı %0,2 çıkar.',
      'Aynı hesabı tersten de sorabilirsiniz: 80.000 liralık bir işlemde 400 lira masraf alınmışsa oran nedir? "Bir sayı, ana sayının binde kaçıdır?" işleminde ana sayıya 80000, ikinci alana 400 yazın; sonuç ‰5, yani %0,5 olur. Bu yol, ödediğiniz bir masrafın beyan edilen oranla tutup tutmadığını denetlemek için kullanışlıdır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, binde oranını yüzde gibi 100\'e bölmektir. Binde 5\'i 0,05 olarak almak sonucu on kat büyütür; doğru çarpan 0,005\'tir. İkinci hata, yüzde ile bindeyi sözlü ifadede karıştırmaktır: "binde 20" ile "yüzde 20" arasında on katlık fark vardır.',
      'Üçüncü hata, ekleme ve çıkarmanın birbirini götürdüğünü sanmaktır. 1.000\'e binde 15 ekleyip çıkan 1.015\'ten binde 15 çıkarırsanız 1.000 değil yaklaşık 999,78 bulursunuz; çünkü ikinci oran daha büyük bir sayıya uygulanır. Son olarak, binde ile milyonda bir anlamına gelen ppm karıştırılmamalıdır; binde 1, milyonda 1.000\'e eşittir.',
      'Bu araçtaki sonuçlar aritmetik hesap niteliğindedir. Vergi, harç ve komisyon tutarlarında yuvarlama kuralları, alt ve üst sınırlar ile istisnalar bulunabilir; resmî işlemlerde ilgili kurumun hesabını ya da bir mali müşavirin görüşünü esas alın.',
    ] },
  ],
  faq: [
    ['Bir sayının binde kaçı nasıl hesaplanır?', 'Sayı binde oranıyla çarpılır ve 1000\'e bölünür. 50.000\'in binde 7,59\'u için 50.000 × 7,59 ÷ 1000 = 379,5 bulunur.'],
    ['Binde 5 yüzde kaçtır?', 'Binde 5, yüzde 0,5\'tir. Binde değerini yüzdeye çevirmek için 10\'a bölmek yeterlidir; ondalık karşılığı ise 0,005\'tir.'],
    ['Binde işareti klavyede nasıl yazılır?', 'Binde işareti ‰ biçimindedir. Çoğu klavyede doğrudan bir tuşu yoktur; birçok telefon klavyesinde yüzde tuşuna basılı tutulduğunda çıkar, bilgisayarda ise özel karakter tablosundan eklenebilir. İşareti yazamıyorsanız "binde 5" biçiminde sözle belirtmek de doğrudur.'],
    ['Promil ile binde aynı şey mi?', 'Evet. Promil, Latince kökenli "bin başına" anlamındaki ifadeden gelir ve binde ile aynı oranı gösterir. 1 promil, binde 1, yani 0,001\'dir.'],
    ['Bir sayının diğerinin binde kaçı olduğunu nasıl bulurum?', 'Küçük sayıyı (parçayı) büyük sayıya (bütüne) bölüp 1000 ile çarparsınız. 400, 80.000\'in binde kaçıdır sorusunda 400 ÷ 80.000 × 1000 = 5 olduğundan cevap binde 5\'tir.'],
    ['Binde 1 ne kadardır?', 'Bütünün binde biri, yani 0,001 katıdır. 1.000 liranın binde 1\'i 1 lira, 1 milyon liranın binde 1\'i 1.000 liradır. Yüzde olarak %0,1\'e eşittir.'],
    ['Araçta güncel damga vergisi ya da harç oranı var mı?', 'Hayır. Bu oranlar değişebildiği için araca sabit bir oran konmamıştır. Geçerli oranı ilgili kurumun duyurusundan öğrenip "Binde oranı" alanına kendiniz yazmalısınız.'],
    ['Girdiğim tutarlar kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız tutar ve oranlar sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['yuzde-hesapla', 'yuzde-kesir-cevir', 'damga-vergisi-hesapla', 'oran-oranti-hesapla', 'yuzde-degisim-hesapla', 'harc-hesapla'],
};
