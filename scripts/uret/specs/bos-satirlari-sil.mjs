export default {
  slug: 'bos-satirlari-sil',
  title: 'Boş Satırları Silme',
  h1Tail: 'metindeki boş satırları kaldırın',
  pageTitle: 'Boş Satırları Silme – Metindeki Boş Satırları Kaldırma Aracı',
  description: 'Metindeki boş satırları tek tıkla silin ya da art arda gelen boş satırları teke indirin. Yalnızca boşluk içeren satırlar da temizlenir; içerik ve sıra değişmez.',
  card: 'Metindeki boş satırları silin ya da art arda gelen boş satırları teke indirin; dolu satırlara dokunulmaz.',
  category: 'metin',
  keywords: ['boş satırları silme', 'boş satır kaldırma', 'metinden boş satırları temizleme', 'fazla satır boşluklarını silme', 'çift satır aralığını kaldırma', 'boş satır silme aracı', 'art arda boş satırları teke indirme'],
  lead: 'PDF\'ten, e-postadan ya da bir internet sayfasından kopyalanan metinlerdeki gereksiz boş satırlardan kurtulun. İster <strong>tüm boş satırları</strong> silin, ister paragraf aralarını koruyup yalnızca <strong>art arda gelen boş satırları teke</strong> indirin.',
  button: 'Boş Satırları Sil',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Boş satırlarını temizlemek istediğiniz metni buraya yapıştırın', wide: true },
    { id: 'mod', label: 'İşlem', type: 'select', options: [['hepsi', 'Tüm boş satırları sil'], ['tek', 'Art arda boş satırları teke indir']] },
    { id: 'sonBosluk', label: 'Satır sonundaki boşluklar', type: 'select', options: [['koru', 'Dokunma'], ['sil', 'Sil']], hint: 'Dolu satırların sonunda kalmış görünmeyen boşluk ve sekmeleri de temizler.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s === '') h.err('Boş satırları silmek için "Metin" alanına bir metin yapıştırın.');
    const satirlar = s.split('\n');
    if (satirlar.length > 1 && satirlar[satirlar.length - 1] === '') satirlar.pop();
    const bos = (x) => x.trim() === '';
    if (satirlar.every(bos)) h.err('Metinde dolu satır yok; yalnızca boş satırlardan oluşuyor. İçinde yazı bulunan bir metin yapıştırın.');
    const duzelt = (x) => (v.sonBosluk === 'sil' ? x.replace(/[ \t ]+$/, '') : x);
    const cikti = [];
    if (v.mod === 'tek') {
      let bekleyen = false;
      for (const x of satirlar) {
        if (bos(x)) { if (cikti.length) bekleyen = true; continue; }
        if (bekleyen) { cikti.push(''); bekleyen = false; }
        cikti.push(duzelt(x));
      }
    } else {
      for (const x of satirlar) if (!bos(x)) cikti.push(duzelt(x));
    }
    return {
      rows: [
        ['Silinen boş satır', h.fmt(satirlar.length - cikti.length, 0)],
        ['Kalan satır', h.fmt(cikti.length, 0)],
        ['Girdideki satır', h.fmt(satirlar.length, 0)],
      ],
      text: cikti.join('\n'),
      note: v.mod === 'tek' ? 'Paragraf aralarında birer boş satır bırakıldı; metnin başındaki ve sonundaki boş satırlar silindi.' : 'Yalnızca boşluk ya da sekme içeren satırlar da boş sayılıp silindi.',
    };
  },
  cases: [
    { in: { metin: 'a\n\nb\n\n\nc', mod: 'hepsi' }, text: 'a\nb\nc', out: { 'Silinen boş satır': '3', 'Kalan satır': '3', 'Girdideki satır': '6' } },
    { in: { metin: 'a\n\nb\n\n\nc', mod: 'tek' }, text: 'a\n\nb\n\nc', out: { 'Silinen boş satır': '1', 'Kalan satır': '5', 'Girdideki satır': '6' } },
    { in: { metin: '\n\nbaşlık\n   \n\t\nmetin\n\n', mod: 'hepsi' }, text: 'başlık\nmetin', out: { 'Silinen boş satır': '5', 'Kalan satır': '2', 'Girdideki satır': '7' } },
    { in: { metin: '\n\nbaşlık\n   \n\t\nmetin\n\n', mod: 'tek' }, text: 'başlık\n\nmetin', out: { 'Silinen boş satır': '4', 'Kalan satır': '3' } },
    { in: { metin: 'x  \n\ny\t', sonBosluk: 'sil' }, text: 'x\ny', out: { 'Silinen boş satır': '1' } },
    { in: { metin: 'x  \n\ny\t', sonBosluk: 'koru' }, text: 'x  \ny\t', out: { 'Silinen boş satır': '1' } },
    { in: { metin: 'bir\r\n\r\niki' }, text: 'bir\niki', out: { 'Silinen boş satır': '1', 'Kalan satır': '2' } },
    { in: { metin: 'boş satır yok\nikinci satır' }, text: 'boş satır yok\nikinci satır', out: { 'Silinen boş satır': '0' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '\n  \n\t\n' }, error: true },
  ],
  howto: [
    'Düzenlemek istediğiniz metni "Metin" kutusuna yapıştırın.',
    '"İşlem" listesinden bir seçenek belirleyin: liste ve kod için "Tüm boş satırları sil", paragraflı yazılar için "Art arda boş satırları teke indir" uygundur.',
    'Dolu satırların sonunda kalan görünmez boşlukları da temizlemek istiyorsanız "Satır sonundaki boşluklar" seçeneğini "Sil" yapın.',
    '"Boş Satırları Sil" düğmesine basın. Temizlenmiş metin sonuç kutusunda, silinen satır sayısı üstteki özet satırlarında görünür.',
    '"Sonucu kopyala" düğmesiyle metni panoya alın ve belgenize yapıştırın.',
  ],
  sections: [
    { h: 'Boş satır nedir, nereden gelir?', p: [
      'Boş satır, iki satır sonu karakteri arasında hiçbir görünür karakter bulunmayan satırdır. Elle yazılan metinlerde paragrafları ayırmak için bilerek bırakılır; ancak kopyala-yapıştır sırasında istenmeyen boş satırlar da ortaya çıkar. PDF dosyalarından alınan metinlerde sayfa geçişleri ve tablo kenarları boş satırlara dönüşür. İnternet sayfalarından kopyalanan yazılarda her paragrafın arasına iki ya da üç boş satır girebilir. E-posta zincirlerinde her yanıtla birlikte satır aralıkları katlanır. Tablolama programından alınan sütunlarda ise boş hücreler boş satır olarak gelir.',
      'Bazı satırlar boş görünür ama aslında boşluk ya da sekme karakteri içerir. Bu satırlar basit "çift satır sonunu tek satır sonuyla değiştir" yöntemleriyle temizlenemez, çünkü iki satır sonu arasında görünmeyen karakterler vardır. Bu araç yalnızca boşluk, sekme ve benzeri görünmez boşluk karakterlerinden oluşan satırları da boş kabul eder.',
    ] },
    { h: 'İki işlem arasındaki fark', p: [
      '<strong>Tüm boş satırları sil</strong> seçeneği metinde hiç boş satır bırakmaz; dolu satırlar art arda dizilir. Alt alta yazılmış listeler, adres ve kod dökümleri, veri sütunları için doğru seçimdir. Paragraflı bir yazıda kullanıldığında ise paragraf araları da kaybolur ve metin tek blok hâline gelir.',
      '<strong>Art arda boş satırları teke indir</strong> seçeneği paragraf yapısını korur. Dolu satırlar arasında bir ya da daha fazla boş satır varsa yerine tek bir boş satır bırakılır. Metnin en başındaki ve en sonundaki boş satırlar ise tümüyle silinir, çünkü bunlar bir paragraf aralığı değil artıktır. Makale, mektup, rapor gibi okunacak metinlerde bu seçenek daha uygundur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Altı satırlık şu metni düşünün: birinci satır "a", ikinci satır boş, üçüncü satır "b", dördüncü ve beşinci satırlar boş, altıncı satır "c". "Tüm boş satırları sil" seçildiğinde üç boş satırın üçü de silinir ve sonuç alt alta a, b, c olmak üzere 3 satırdır. "Art arda boş satırları teke indir" seçildiğinde a ile b arasındaki tek boş satır yerinde kalır, b ile c arasındaki iki boş satır bire iner. Sonuç 5 satırdır ve yalnızca 1 boş satır silinmiştir.',
      'İkinci örnekte metin iki boş satırla başlasın, ardından "başlık", sonra içinde üç boşluk bulunan bir satır, sonra yalnızca sekme içeren bir satır, "metin" ve en sonda bir boş satır gelsin. Toplam 7 satırın 5\'i boştur. Tümünü silme işleminde geriye "başlık" ve "metin" kalır. Teke indirme işleminde baştaki ve sondaki boş satırlar atılır, aradaki iki görünmez satır tek boş satıra dönüşür; sonuç 3 satırdır ve 4 satır silinmiştir.',
    ] },
    { h: 'Satır sonundaki boşluklar', p: [
      'Dolu bir satırın sonunda kalan boşluk ve sekmeler ekranda görünmez, ama dosyada yer kaplar ve bazı durumlarda sorun çıkarır: sürüm denetimi araçları bunları değişiklik olarak işaretler, veri içe aktarılırken "Ankara" ile sonunda boşluk bulunan "Ankara " farklı değerler sayılır, kod biçimlendirme denetimleri uyarı verir. "Sil" seçeneği, boş satırlarla birlikte dolu satırların sonundaki bu artıkları da temizler. Satır başındaki girintilere dokunulmaz; böylece kodun ve iç içe listelerin yapısı bozulmaz.',
    ] },
    { h: 'Kimler kullanır?', ul: [
      'PDF ya da taranmış belgeden kopyaladığı metni kelime işlemciye aktaran öğrenciler ve büro çalışanları',
      'İnternet sayfasından alınan uzun yazıyı toparlayan içerik editörleri',
      'Boş hücreli bir sütunu kesintisiz listeye çevirmek isteyen tablo kullanıcıları',
      'Kod ya da yapılandırma dosyasındaki fazla aralıkları azaltmak isteyen geliştiriciler',
      'Uzun e-posta zincirlerini okunur hâle getirmek isteyenler',
      'Altyazı, şarkı sözü ya da şiir metinlerinde kıta aralarını tek satıra indirmek isteyenler',
    ] },
    { h: 'Dikkat edilecekler ve sınırlar', p: [
      'Bazı biçimlerde boş satır anlam taşır. Markdown\'da paragraflar boş satırla ayrılır; tüm boş satırları silerseniz paragraflar birleşir. Altyazı dosyalarında her altyazı bloğu boş satırla biter. Bu tür metinlerde "teke indir" seçeneğini tercih edin. Araç satır içindeki fazla boşluklara dokunmaz; kelime aralarındaki çift boşlukları düzeltmek için fazla boşlukları temizleme aracını kullanın. Çıktıda satır sonları tek tip (LF) üretilir; Windows biçimindeki CR LF satır sonları da doğru tanınır.',
    ] },
  ],
  faq: [
    ['Boş satırları silince paragraflarım birleşir mi?', '"Tüm boş satırları sil" seçeneğinde paragraf araları da silinir; her paragraf yine kendi satırında kalır ama aralarında boşluk olmaz. Paragraf aralarını korumak için "Art arda boş satırları teke indir" seçeneğini kullanın.'],
    ['İçinde yalnızca boşluk olan satırlar da siliniyor mu?', 'Evet. Yalnızca boşluk ya da sekme karakterlerinden oluşan satırlar boş kabul edilir ve gerçek boş satırlar gibi işlenir.'],
    ['Dolu satırların içeriği değişir mi?', 'Hayır. Dolu satırların sırası ve içeriği korunur. Yalnızca "Satır sonundaki boşluklar" seçeneğini "Sil" yaparsanız satırların sonundaki görünmez boşluk ve sekmeler temizlenir; satır başındaki girintiler yine korunur.'],
    ['"Teke indir" seçeneğinde metnin başındaki boş satırlar ne olur?', 'Metnin en başındaki ve en sonundaki boş satırlar tümüyle silinir. Yalnızca dolu satırlar arasında kalan boş satır grupları birer boş satıra indirilir.'],
    ['Word\'de çift satır aralığını bu araçla düzeltebilir miyim?', 'Belgedeki aralık gerçekten boş paragraflardan kaynaklanıyorsa evet: metni kopyalayın, temizleyin ve geri yapıştırın. Aralık paragraf biçimlendirmesinden geliyorsa metinde boş satır yoktur; bu durumda kelime işlemcinin paragraf aralığı ayarını değiştirmeniz gerekir.'],
    ['Satır sonu karakterlerini tümüyle kaldırıp metni tek satır yapabilir miyim?', 'Bu araç yalnızca boş satırları kaldırır, dolu satırları birleştirmez. Tüm satırları tek satırda toplamak için satırları birleştirme aracını kullanabilirsiniz.'],
    ['Kaç satırın silindiğini nasıl görürüm?', 'Sonucun üstündeki özet bölümünde silinen boş satır sayısı, kalan satır sayısı ve girdideki toplam satır sayısı ayrı ayrı gösterilir.'],
    ['Metnim bir yere kaydediliyor mu?', 'Hayır. Temizleme işlemi tarayıcınızda yapılır; metin sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['bosluk-temizle', 'tekrar-eden-satirlari-sil', 'satir-sayaci', 'satirlari-birlestir', 'paragraf-sayaci'],
};
