export default {
  slug: 'sayi-bicimlendir',
  title: 'Sayı Biçimlendirme (Binlik Ayraç)',
  h1Tail: 'noktalı, virgüllü ve boşluklu yazım',
  pageTitle: 'Sayı Biçimlendirme – Binlik Ayraç Ekleme, Nokta Virgül Çevirme',
  description: 'Uzun sayılara binlik ayraç ekleyin; Türkçe (1.234.567,89), İngilizce (1,234,567.89) ve boşluklu yazım arasında çevirin, ondalık basamağı yuvarlayın.',
  card: 'Sayıya binlik ayraç ekleyin; Türkçe, İngilizce ve boşluklu yazım arasında çevirin, ondalığı yuvarlayın.',
  category: 'metin',
  keywords: ['sayı biçimlendirme', 'binlik ayraç ekleme', 'binlik ayırıcı', 'nokta virgül çevirme', 'sayıya nokta koyma', 'ondalık ayraç', 'sayı formatı çevirme', 'binlik ayraç nasıl yazılır'],
  lead: 'Ayraçsız ya da farklı ülke yazımıyla gelmiş bir sayıyı okunaklı hâle getirin. Araç sayıyı <strong>Türkçe</strong> (binlik nokta, ondalık virgül), <strong>İngilizce</strong> (binlik virgül, ondalık nokta) ve <strong>boşluklu</strong> yazımda aynı anda gösterir; isterseniz ondalık basamak sayısını da sabitler.',
  button: 'Biçimlendir',
  inputs: [
    { id: 'sayi', label: 'Sayı', type: 'text', placeholder: 'Örn. 1234567,891', hint: 'Tek bir nokta ya da virgül ondalık ayraç sayılır. "1.500" ile bin beş yüzü kastediyorsanız giriş yazımını Türkçe seçin.' },
    { id: 'giris', label: 'Giriş yazımı', type: 'select', options: [['oto', 'Otomatik algıla'], ['tr', 'Türkçe (1.234,56)'], ['en', 'İngilizce (1,234.56)']] },
    { id: 'ondalik', label: 'Ondalık basamak', type: 'select', options: [['koru', 'Olduğu gibi bırak'], ['0', '0 (tam sayıya yuvarla)'], ['1', '1 basamak'], ['2', '2 basamak'], ['3', '3 basamak'], ['4', '4 basamak']] },
  ],
  compute(v, h) {
    let t = String(v.sayi ?? '').trim().replace(/[\s  '’_]/g, '').replace(/−/g, '-');
    if (t === '') h.err('"Sayı" alanına biçimlendirilecek sayıyı yazın (örn. 1234567,89).');
    let eksi = false;
    if (t[0] === '-' || t[0] === '+') { eksi = t[0] === '-'; t = t.slice(1); }
    if (!/^[\d.,]+$/.test(t) || !/\d/.test(t)) h.err('Sayıda yalnızca rakam, nokta, virgül ve baştaki eksi işareti bulunabilir.');
    if (t.length > 60) h.err('Sayı çok uzun. En fazla 60 karakterlik bir sayı yazın.');
    const nokta = (t.match(/\./g) || []).length, virgul = (t.match(/,/g) || []).length;
    let ond = '', belirsiz = false; // ond: ondalık ayraç karakteri ('' = yok)
    if (v.giris === 'tr') ond = virgul ? ',' : '';
    else if (v.giris === 'en') ond = nokta ? '.' : '';
    else if (nokta && virgul) ond = t.lastIndexOf(',') > t.lastIndexOf('.') ? ',' : '.';
    else if (nokta === 1) { ond = '.'; belirsiz = /^\d{1,3}\.\d{3}$/.test(t); }
    else if (virgul === 1) { ond = ','; belirsiz = /^\d{1,3},\d{3}$/.test(t); }
    const adet = ond === ',' ? virgul : ond === '.' ? nokta : 0;
    if (adet > 1) h.err('Ondalık ayraç sayıda yalnızca bir kez bulunabilir. Giriş yazımını kontrol edin.');
    let tam = t, kesir = '';
    if (ond) { const i = t.lastIndexOf(ond); tam = t.slice(0, i); kesir = t.slice(i + 1); }
    if (/[.,]/.test(kesir)) h.err('Ondalık kısımda binlik ayraç olamaz. Sayıyı ya da giriş yazımını kontrol edin.');
    tam = tam.replace(/[.,]/g, '');
    if (tam === '' && kesir === '') h.err('Geçerli bir sayı yazın (örn. 1234567,89).');
    tam = tam.replace(/^0+(?=\d)/, '') || '0';
    if (v.ondalik !== 'koru') {
      const n = Number(v.ondalik);
      if (kesir.length > n) {
        const yukari = kesir[n] >= '5';
        let b = BigInt(tam + kesir.slice(0, n));
        if (yukari) b += 1n;
        const s = b.toString().padStart(n + 1, '0');
        tam = s.slice(0, s.length - n);
        kesir = n ? s.slice(s.length - n) : '';
      } else kesir = kesir.padEnd(n, '0');
    }
    if (eksi && /^0+$/.test(tam) && /^0*$/.test(kesir)) eksi = false;
    const grupla = (s, ayrac) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ayrac);
    const yaz = (bin, on) => (eksi ? '-' : '') + grupla(tam, bin) + (kesir ? on + kesir : '');
    const rows = [
      ['Türkçe yazım', yaz('.', ',')],
      ['İngilizce yazım', yaz(',', '.')],
      ['Boşluklu yazım', yaz(' ', ',')],
      ['Ayraçsız (virgüllü)', yaz('', ',')],
      ['Ayraçsız (noktalı, kod için)', yaz('', '.')],
      ['Tam kısmın basamak sayısı', String(tam.length)],
      ['Ondalık basamak sayısı', String(kesir.length)],
    ];
    return {
      rows,
      note: belirsiz
        ? 'Girdide tek ayraç ve ardından üç rakam var; bu ayraç ondalık sayıldı. Binlik ayraç kastettiyseniz "Giriş yazımı" alanından doğru yazımı seçin.'
        : 'Yuvarlama, yarım ve üzeri değerlerin büyütülmesi kuralıyla, rakamlar üzerinde kayıpsız yapılır.',
    };
  },
  cases: [
    { in: { sayi: '1234567,891' }, out: { 'Türkçe yazım': '1.234.567,891', 'İngilizce yazım': '1,234,567.891', 'Boşluklu yazım': '1 234 567,891', 'Tam kısmın basamak sayısı': '7' } },
    { in: { sayi: '1,234,567.89', giris: 'oto', ondalik: 'koru' }, out: { 'Türkçe yazım': '1.234.567,89', 'Ayraçsız (noktalı, kod için)': '1234567.89' } },
    { in: { sayi: '1234567.5', ondalik: '2' }, out: { 'Türkçe yazım': '1.234.567,50', 'İngilizce yazım': '1,234,567.50' } },
    { in: { sayi: '1.234.567' }, out: { 'Türkçe yazım': '1.234.567', 'İngilizce yazım': '1,234,567', 'Ondalık basamak sayısı': '0' } },
    { in: { sayi: '1.500', giris: 'tr' }, out: { 'Türkçe yazım': '1.500', 'İngilizce yazım': '1,500' } },
    { in: { sayi: '1.500', giris: 'oto' }, out: { 'Türkçe yazım': '1,500', 'İngilizce yazım': '1.500' } },
    { in: { sayi: '999,995', ondalik: '2' }, out: { 'Türkçe yazım': '1.000,00' } },
    { in: { sayi: '-1234.5', ondalik: '0' }, out: { 'Türkçe yazım': '-1.235', 'Ayraçsız (virgüllü)': '-1235' } },
    { in: { sayi: '123456789012345678901234567890' }, out: { 'Türkçe yazım': '123.456.789.012.345.678.901.234.567.890', 'Tam kısmın basamak sayısı': '30' } },
    { in: { sayi: '0,004', ondalik: '2' }, out: { 'Türkçe yazım': '0,00' } },
    { in: { sayi: 'bin iki yüz' }, error: true },
    { in: { sayi: '1,2,3.4.5' }, error: true },
    { in: { sayi: '' }, error: true },
  ],
  howto: [
    'Sayıyı "Sayı" alanına yazın ya da yapıştırın. Ayraçsız (1234567), Türkçe (1.234.567,89) ya da İngilizce (1,234,567.89) yazılmış olabilir.',
    'Araç yazımı çoğu durumda kendisi anlar. "1.500" gibi iki anlama gelebilen girdilerde "Giriş yazımı" listesinden Türkçe ya da İngilizce seçerek ne kastettiğinizi belirtin.',
    'Ondalık kısmı sabitlemek istiyorsanız "Ondalık basamak" listesinden basamak sayısını seçin; istemiyorsanız "Olduğu gibi bırak" kalsın.',
    '"Biçimlendir" düğmesine basın ve ihtiyacınız olan yazımı sonuç satırlarından kopyalayın.',
  ],
  sections: [
    { h: 'Binlik ayraç nedir, neden kullanılır?', p: [
      'Uzun bir sayıyı tek bakışta okumak zordur: 12500000 ile 125000000 arasındaki farkı görmek için sıfırları tek tek saymak gerekir. Binlik ayraç, rakamları sağdan başlayarak üçer üçer gruplar ve bu sorunu ortadan kaldırır. 12.500.000 yazıldığında sayının on iki buçuk milyon olduğu hemen anlaşılır. Gruplama yalnızca tam kısma uygulanır; ondalık kısım ayrılmadan yazılır.',
      'Türkçede binlik ayraç olarak <strong>nokta</strong>, ondalık ayraç olarak <strong>virgül</strong> kullanılır: 1.234.567,89. İngilizce konuşulan ülkelerin çoğunda bunun tam tersi geçerlidir: 1,234,567.89. Bilimsel ve teknik metinlerde ise karışıklığı önlemek için gruplar arasına nokta ya da virgül yerine dar bir <strong>boşluk</strong> konması önerilir: 1 234 567,89.',
    ] },
    { h: 'Araç sayıyı nasıl yorumlar?', p: [
      'Otomatik algılama şu kurallarla çalışır: Sayıda hem nokta hem virgül varsa en sonda duran ayraç ondalık, diğeri binlik kabul edilir. Aynı ayraç birden fazla kez geçiyorsa (1.234.567 ya da 1,234,567) binlik ayraçtır, çünkü bir sayıda ondalık ayraç yalnızca bir kez bulunabilir. Tek bir ayraç varsa ondalık ayraç sayılır.',
      'Son kuralın bir zayıf noktası vardır: "1.500" yazan biri bin beş yüzü de bir buçuğu da kastediyor olabilir. Araç bu durumda ayracı ondalık sayar ve sonucun altına bir uyarı notu düşer. Bin beş yüzü kastediyorsanız giriş yazımını "Türkçe" seçmeniz yeterlidir; o zaman nokta her koşulda binlik ayraç olarak okunur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir veritabanından 1234567,891 değerini aldınız. Tam kısım 1234567 sağdan üçerli gruplanır: 1 – 234 – 567. Türkçe yazım 1.234.567,891, İngilizce yazım 1,234,567.891, boşluklu yazım 1 234 567,891 olur. Tam kısım yedi basamaklıdır.',
      '<strong>Örnek 2:</strong> Yabancı bir fatura üzerinde 1,234,567.89 yazıyor. Hem virgül hem nokta bulunduğu ve nokta en sonda durduğu için nokta ondalık ayraçtır. Türkçe karşılığı 1.234.567,89 şeklindedir.',
      '<strong>Örnek 3:</strong> 999,995 değerini iki ondalık basamağa yuvarlamak istiyorsunuz. Üçüncü ondalık basamak 5 olduğundan ikinci basamak büyütülür; 99 bir artınca elde tam kısma taşar ve sonuç 1.000,00 olur. Yuvarlamanın binlik ayracın yerini de değiştirebildiğine dikkat edin.',
    ] },
    { h: 'Hangi yazımı nerede kullanmalı?', ul: [
      '<strong>Türkçe yazım:</strong> fatura, teklif, sözleşme, rapor ve Türkçe her türlü metin.',
      '<strong>İngilizce yazım:</strong> yurt dışı müşterilere gönderilen proforma, İngilizce sunum ve makaleler.',
      '<strong>Boşluklu yazım:</strong> hem Türk hem yabancı okurun göreceği teknik tablolar; nokta ve virgülün karışma ihtimalini ortadan kaldırır.',
      '<strong>Ayraçsız noktalı yazım:</strong> program kodu, JSON, CSV ve SQL. Programlama dillerinin neredeyse tamamı ondalık ayraç olarak yalnızca noktayı kabul eder ve binlik ayracı sayı olarak okuyamaz.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Yıl ve numara gibi değerlere ayraç koymak: 2026 yılı, posta kodu, telefon ya da fatura numarası miktar bildirmez; gruplanmaz.',
      'Ondalık kısmı da üçerli gruplamak: 3,141.592 gibi bir yazım yanlıştır; ayraç yalnızca tam kısımda kullanılır.',
      'Hesap tablosuna yanlış yazımla yapıştırmak: bölge ayarı Türkçe olan bir programa 1,234.56 yapıştırırsanız değer metin olarak kalır ya da yanlış okunur. Önce bu araçla hedef yazıma çevirin.',
      'Kodda Türkçe yazım kullanmak: 1.234,56 değeri bir programlama dilinde sayı olarak geçerli değildir; "kod için" satırındaki yazımı kullanın.',
    ] },
    { h: 'Yuvarlama ve büyük sayılar', p: [
      'Ondalık basamak seçtiğinizde araç, atılacak ilk rakam 5 ya da daha büyükse son kalan rakamı bir artırır; küçükse olduğu gibi bırakır. Negatif sayılarda aynı kural mutlak değere uygulanır, yani -1234,5 tam sayıya yuvarlanınca -1.235 olur. Sayıda seçilenden az ondalık basamak varsa sonuna sıfır eklenir: 1234567,5 iki basamakla 1.234.567,50 biçiminde yazılır.',
      'İşlem, sayıyı kayan noktalı değere çevirmeden doğrudan rakamlar üzerinde yapılır. Bu sayede 30 basamaklı bir sayı da son rakamına kadar korunur; hesap makinelerinde ve bazı programlarda görülen "sondaki rakamların sıfıra dönmesi" sorunu burada yaşanmaz. Girdi uzunluğu 60 karakterle sınırlıdır ve bilimsel gösterim (1,5e6 gibi) desteklenmez.',
    ] },
  ],
  faq: [
    ['Türkçede binlik ayraç nokta mı virgül mü?', 'Türkçe yazımda binlikler nokta ile ayrılır, ondalık kısım virgülle gösterilir: 1.234.567,89. İngilizce yazımda bu iki işaretin görevi yer değiştirir.'],
    ['Dört basamaklı sayılara ayraç konur mu?', 'Konabilir; 1.500 de 1500 de anlaşılır. Para tutarlarında ve alt alta yazılan sütunlarda hizayı korumak için ayraç kullanmak yaygındır. Yıllarda ise ayraç kullanılmaz.'],
    ['"1.500" yazdım, sonuç neden 1,5 çıktı?', 'Otomatik algılama tek ayracı ondalık kabul eder. Bin beş yüzü kastediyorsanız "Giriş yazımı" alanından "Türkçe" seçin; nokta binlik ayraç olarak okunur ve sonuç 1.500 olur.'],
    ['Boşluklu yazım hangi durumda tercih edilir?', 'Okur kitlesi farklı ülkelerden olduğunda. Nokta ve virgül ülkeden ülkeye zıt anlam taşıdığı için uluslararası ölçü standartları üçerli grupların boşlukla ayrılmasını önerir; ondalık ayraç olarak virgül ya da nokta kullanılabilir.'],
    ['Çok büyük sayılarda rakam kaybı olur mu?', 'Hayır. Araç sayıyı metin olarak işler, bu yüzden onlarca basamaklı sayılar da eksiksiz gruplanır. Yuvarlama da tam sayı aritmetiğiyle yapıldığından sonda beklenmedik rakamlar oluşmaz.'],
    ['Birden fazla sayıyı aynı anda biçimlendirebilir miyim?', 'Bu araç tek sayı üzerinde çalışır ve aynı sayının bütün yazımlarını yan yana gösterir. Bir metnin içindeki sayıları toplu ayıklamak için sayı ayıklama aracını kullanabilirsiniz.'],
    ['Para birimi simgesi ekliyor mu?', 'Hayır, yalnızca sayıyı biçimlendirir. Simgeyi ya da kısaltmayı kopyaladıktan sonra kendiniz ekleyebilirsiniz; Türkçe metinlerde kısaltma genellikle tutardan sonra yazılır.'],
    ['Yazdığım sayılar kaydediliyor mu?', 'Hayır. Biçimlendirme tarayıcınızın içinde yapılır; sayı sunucuya gönderilmez ve saklanmaz. Sayfa yüklendikten sonra bağlantı olmadan da çalışır.'],
  ],
  related: ['sayi-ayikla', 'telefon-numarasi-bicimlendir', 'roma-rakami-tarih', 'liste-virgul-donustur', 'ingilizce-sayi-okunusu'],
};
