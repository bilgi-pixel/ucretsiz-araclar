export default {
  slug: 'basamak-toplami-hesapla',
  title: 'Basamak Toplamı Hesaplama',
  h1Tail: 'rakamları toplamı ve sayısal kök',
  pageTitle: 'Basamak Toplamı Hesaplama – Rakamları Toplamı ve Sayısal Kök',
  description: 'Bir sayının rakamları toplamını hesaplayın. Basamak sayısı, sayısal kök, rakamların çarpımı ile 3 ve 9 ile bölünebilme sonucu birlikte gösterilir.',
  card: 'Sayının rakamları toplamını, sayısal kökünü ve basamak sayısını bulun; 3 ve 9 ile bölünebilirliği görün.',
  category: 'matematik',
  keywords: ['basamak toplamı hesaplama', 'rakamları toplamı', 'rakamlar toplamı bulma', 'sayısal kök hesaplama', 'basamak sayısı bulma', '9 ile bölünebilme', 'rakamların çarpımı'],
  lead: 'Bir tam sayının <strong>rakamları toplamını</strong> bulun. Araç çok uzun sayılarla da çalışır; toplamın yanında basamak sayısını, tek basamağa inene kadar toplanarak bulunan sayısal kökü ve 3 ile 9\'a bölünebilme durumunu gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayi', label: 'Sayı', type: 'text', placeholder: 'Örn. 12345', hint: 'Yalnızca rakam yazın; boşluklar yok sayılır. En fazla 1000 basamak.', wide: true },
  ],
  compute(v, h) {
    let s = String(v.sayi ?? '').replace(/\s/g, '').replace(/−/g, '-');
    if (s === '') h.err('"Sayı" alanını doldurun.');
    if (s[0] === '-' || s[0] === '+') s = s.slice(1);
    if (!/^\d+$/.test(s)) h.err('Yalnızca rakamlardan oluşan bir tam sayı yazın; nokta, virgül ya da harf kullanmayın (örn. 12345).');
    s = s.replace(/^0+(?=\d)/, '');
    if (s.length > 1000) h.err('Sayı en fazla 1000 basamaklı olabilir; daha kısa bir sayı yazın.');
    let toplam = 0;
    let carpim = 1n;
    for (const c of s) { const d = c.charCodeAt(0) - 48; toplam += d; carpim *= BigInt(d); }
    const kok = toplam === 0 ? 0 : 1 + ((toplam - 1) % 9);
    // Kök adımları: 12345 → 15 → 6
    const adimlar = [];
    let t = toplam;
    while (t > 9) { adimlar.push(t); t = String(t).split('').reduce((a, c) => a + Number(c), 0); }
    adimlar.push(t);
    const rows = [
      ['Basamak toplamı', String(toplam)],
      ['Basamak sayısı', String(s.length)],
      ['Sayısal kök', String(kok)],
      ['Basamak çarpımı', String(carpim)],
      ['3 ile bölünebilir mi?', toplam % 3 === 0 ? 'Evet' : 'Hayır'],
      ['9 ile bölünebilir mi?', toplam % 9 === 0 ? 'Evet' : 'Hayır'],
    ];
    if (s.length <= 40) rows.push(['İşlem', s.length === 1 ? s : `${s.split('').join(' + ')} = ${toplam}`]);
    return {
      rows,
      note: adimlar.length > 1 ? `Sayısal kök adımları: ${adimlar.join(' → ')}.` : 'Basamak toplamı tek basamaklı olduğu için sayısal kök toplamın kendisidir.',
    };
  },
  cases: [
    { in: { sayi: '12345' }, out: { 'Basamak toplamı': '15', 'Basamak sayısı': '5', 'Sayısal kök': '6', 'Basamak çarpımı': '120', '3 ile bölünebilir mi?': 'Evet', '9 ile bölünebilir mi?': 'Hayır', 'İşlem': '1 + 2 + 3 + 4 + 5 = 15' } },
    { in: { sayi: '999' }, out: { 'Basamak toplamı': '27', 'Basamak sayısı': '3', 'Sayısal kök': '9', 'Basamak çarpımı': '729', '9 ile bölünebilir mi?': 'Evet' } },
    { in: { sayi: '2026' }, out: { 'Basamak toplamı': '10', 'Sayısal kök': '1', 'Basamak çarpımı': '0', '3 ile bölünebilir mi?': 'Hayır' } },
    { in: { sayi: '123456789' }, out: { 'Basamak toplamı': '45', 'Basamak sayısı': '9', 'Sayısal kök': '9', 'Basamak çarpımı': '362880' } },
    { in: { sayi: '0' }, out: { 'Basamak toplamı': '0', 'Basamak sayısı': '1', 'Sayısal kök': '0', 'İşlem': '0' } },
    { in: { sayi: '-481' }, out: { 'Basamak toplamı': '13', 'Basamak sayısı': '3', 'Sayısal kök': '4', 'Basamak çarpımı': '32' } },
    { in: { sayi: '100000000000000000000' }, out: { 'Basamak toplamı': '1', 'Basamak sayısı': '21', 'Sayısal kök': '1' } },
    { in: { sayi: '98 765' }, out: { 'Basamak toplamı': '35', 'Sayısal kök': '8', 'Basamak sayısı': '5' } },
    { in: { sayi: '007' }, out: { 'Basamak toplamı': '7', 'Basamak sayısı': '1' } },
    { in: { sayi: '12,5' }, error: true },
    { in: { sayi: 'abc' }, error: true },
    { in: { sayi: '' }, error: true },
  ],
  howto: [
    '"Sayı" alanına rakamları toplanacak tam sayıyı yazın ya da yapıştırın. Okumayı kolaylaştırmak için araya boşluk koyabilirsiniz; boşluklar hesaba katılmaz.',
    '"Hesapla" düğmesine basın. İlk satırda rakamların toplamı görünür.',
    'Diğer satırlardan basamak sayısını, sayısal kökü, rakamların çarpımını ve sayının 3 ile 9\'a bölünüp bölünmediğini okuyun.',
    '40 basamağa kadar olan sayılarda "İşlem" satırı toplamayı açık biçimde yazar; bunu defterinize aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Basamak toplamı nedir?', p: [
      'Bir sayının basamak toplamı, o sayıyı oluşturan rakamların basamak değerlerine bakılmaksızın tek tek toplanmasıyla bulunur. Okul kitaplarında "rakamları toplamı" olarak da geçer. 12345 sayısı için 1 + 2 + 3 + 4 + 5 = 15 elde edilir. Burada 1 rakamının aslında on binler basamağında olması önemli değildir; her rakam yalnızca kendi sayı değeriyle toplama girer.',
      'Bu işlem basit görünse de sayılar kuramında, bölünebilme kurallarında, sağlama yöntemlerinde ve bilgisayar bilimindeki hata denetimi düşüncesinde karşımıza çıkar. Programlama öğrenenler için de klasik bir alıştırmadır: sayı 10\'a bölünerek son basamağı alınır, toplam değişkenine eklenir ve sayı bitene kadar işlem sürdürülür.',
    ] },
    { h: '3 ve 9 ile bölünebilme kuralı', p: [
      'Basamak toplamının en bilinen kullanımı bölünebilme kurallarıdır. <strong>Bir sayının rakamları toplamı 3\'e bölünüyorsa sayının kendisi de 3\'e bölünür; rakamları toplamı 9\'a bölünüyorsa sayı da 9\'a bölünür.</strong> 12345 sayısının rakamları toplamı 15\'tir; 15, 3\'ün katı olduğundan 12345 de 3\'e tam bölünür. 15, 9\'un katı olmadığı için sayı 9\'a bölünmez.',
      'Kuralın nedeni, 10\'un 9\'a bölümünden 1 kalmasıdır. 10, 100, 1000 gibi tüm basamak değerleri 9\'un bir katından 1 fazladır: 10 = 9 + 1, 100 = 99 + 1. Dolayısıyla 300 sayısı 3 × 99 + 3 biçiminde yazılabilir ve 9\'a bölümünden kalan, rakamın kendisinden gelir. Her basamak için aynı şey geçerli olduğundan, bir sayının 9\'a bölümünden kalan ile rakamları toplamının 9\'a bölümünden kalan aynıdır. 3 de 9\'un böleni olduğu için aynı mantık 3 için de çalışır.',
    ] },
    { h: 'Sayısal kök nedir?', p: [
      'Basamak toplamı birden fazla basamaklı çıktığında işlemi yeniden uygulayıp tek basamaklı bir sayı kalana kadar sürdürürseniz <strong>sayısal kök</strong> elde edilir. 12345 için ilk toplam 15, ikinci adımda 1 + 5 = 6 bulunur; sayısal kök 6\'dır. 98765 için adımlar 35 ve ardından 8\'dir.',
      'Sayısal kökü adım adım toplamadan bulmanın kısa bir yolu vardır: sayının 9\'a bölümünden kalana bakılır. Kalan sıfır değilse sayısal kök bu kalandır; kalan sıfırsa ve sayı sıfır değilse sayısal kök 9\'dur. 12345 ÷ 9 işleminde kalan 6\'dır ve sayısal kök de 6 çıkar. Araç bu bağıntıyı kullanır ve adımları sonuç notunda ayrıca yazar.',
    ] },
    { h: 'Dokuz atma ile sağlama', p: [
      'Hesap makinelerinin yaygınlaşmasından önce uzun toplama ve çarpma işlemlerinin sağlaması "dokuz atma" yöntemiyle yapılırdı. Yöntem sayısal köklere dayanır: bir çarpma doğruysa, çarpanların sayısal köklerinin çarpımının sayısal kökü ile sonucun sayısal kökü aynı olmalıdır.',
      'Örnek: 123 × 45 = 5535 işlemini denetleyelim. 123\'ün sayısal kökü 6, 45\'in sayısal kökü 9\'dur. 6 × 9 = 54 ve 54\'ün sayısal kökü 9\'dur. Sonuç olan 5535\'in rakamları toplamı 18, sayısal kökü 9\'dur. İki değer tuttuğu için işlem bu denetimden geçer. Yöntemin bir sınırı vardır: kökler tutmuyorsa işlem kesinlikle yanlıştır, ama tutması doğruluğu kanıtlamaz. Örneğin rakamların yeri karıştırılarak yazılmış bir sonuç aynı sayısal köke sahip olur ve bu denetimden fark edilmeden geçer.',
    ] },
    { h: 'Basamak çarpımı ve basamak sayısı', p: [
      'Araç rakamların çarpımını da verir. 12345 için 1 × 2 × 3 × 4 × 5 = 120 bulunur. Sayının içinde tek bir sıfır bile varsa çarpım sıfır olur; 2026 sayısının basamak çarpımı bu yüzden 0\'dır. Basamak çarpımı, sayı bulmacalarında ve olimpiyat tipi sorularda sıkça karşılaşılan bir kavramdır.',
      'Basamak sayısı satırı, özellikle çok uzun sayılarda işe yarar. Bir seri numarasının, barkodun ya da büyük bir faktöriyel sonucunun kaç haneli olduğunu elle saymak yerine buradan okuyabilirsiniz. Baştaki sıfırlar sayının değerini değiştirmediği için sayılmaz; 007 girdisi tek basamaklı 7 olarak değerlendirilir.',
    ] },
    { h: 'Hızlı başvuru örnekleri', ul: [
      '<strong>999:</strong> toplam 27, sayısal kök 9; sayı 9\'a bölünür.',
      '<strong>2026:</strong> toplam 10, sayısal kök 1; sayı 3\'e bölünmez.',
      '<strong>123456789:</strong> toplam 45, sayısal kök 9, basamak çarpımı 362.880.',
      '<strong>1 ve ardından yirmi sıfır:</strong> 21 basamak, toplam 1.',
      '<strong>481:</strong> toplam 13, sayısal kök 4, basamak çarpımı 32.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Araç yalnızca tam sayılarla çalışır. Ondalıklı bir sayının rakamları toplamı gerekiyorsa virgülü silip rakamları arka arkaya yazabilirsiniz. Eksi işareti toplamı etkilemez; negatif sayılarda rakamlar aynı biçimde toplanır. Binlik ayırıcı olarak nokta kullanmayın, onun yerine boşluk bırakın ya da hiç ayırmayın. Üst sınır 1000 basamaktır; bu uzunluktaki sayılarda da toplam ve çarpım tam doğrulukla hesaplanır.',
      'Bu sayfa matematiksel bir özelliği hesaplar. Rakam toplamlarına anlam yükleyen numeroloji türü yorumların bilimsel bir dayanağı yoktur; araç bu tür bir yorum sunmaz.',
    ] },
  ],
  faq: [
    ['Bir sayının rakamları toplamı nasıl bulunur?', 'Sayıyı oluşturan rakamlar basamak değerlerine bakılmadan tek tek toplanır. 12345 için 1 + 2 + 3 + 4 + 5 = 15 bulunur.'],
    ['Sayısal kök ile basamak toplamı aynı şey mi?', 'Hayır. Basamak toplamı rakamların bir kez toplanmasıdır. Sayısal kök ise sonuç tek basamağa inene kadar toplamanın yinelenmesiyle bulunur. 12345 için basamak toplamı 15, sayısal kök 6\'dır.'],
    ['Basamak toplamı 9\'a bölünüyorsa sayı da 9\'a bölünür mü?', 'Evet, her zaman. Tersi de doğrudur: 9\'a bölünen her sayının rakamları toplamı 9\'un katıdır. Aynı kural 3 için de geçerlidir.'],
    ['Aynı kural 6 ya da 7 için kullanılabilir mi?', 'Doğrudan kullanılamaz. Bir sayının 6\'ya bölünmesi için hem çift olması hem de rakamları toplamının 3\'e bölünmesi gerekir. 7 için basamak toplamına dayanan basit bir kural yoktur.'],
    ['Rakamların yerini değiştirince basamak toplamı değişir mi?', 'Değişmez. 123, 321 ve 213 sayılarının rakamları toplamı 6\'dır. Bu yüzden rakamları aynı olan sayıların 3 ve 9\'a bölünebilme durumu da aynıdır.'],
    ['Sayısal kök hangi değerleri alabilir?', 'Sıfır için 0, diğer tüm pozitif tam sayılar için 1 ile 9 arasında bir değerdir. 9\'un katı olan sayıların sayısal kökü 9\'dur.'],
    ['Çok büyük sayılar için sonuç güvenilir mi?', 'Evet. Araç sayıyı metin olarak okuyup rakam rakam işlediği için 1000 basamağa kadar olan sayılarda yuvarlama ya da taşma olmaz; çarpım da büyük tam sayı aritmetiğiyle hesaplanır.'],
    ['Yazdığım sayı bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz sayı sunucuya iletilmez ve saklanmaz. Bu, seri numarası gibi uzun sayıların hane sayısını kontrol ederken de geçerlidir.'],
  ],
  related: ['asal-carpan-hesapla', 'bolen-hesapla', 'ebob-ekok', 'mod-alma-hesapla', 'palindrom-sayi-kontrol', 'asal-sayi-sorgula'],
};
