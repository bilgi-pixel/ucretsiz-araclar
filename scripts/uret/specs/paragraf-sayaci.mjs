export default {
  slug: 'paragraf-sayaci',
  title: 'Paragraf Sayacı',
  h1Tail: 'metindeki paragrafları sayın',
  pageTitle: 'Paragraf Sayacı – Metinde Kaç Paragraf Olduğunu Bulun',
  description: 'Metninizdeki paragraf sayısını, paragraf başına ortalama kelimeyi, en uzun ve en kısa paragrafı bulun. Boş satırla ya da satır sonuyla ayrılmış metinleri sayar.',
  card: 'Metindeki paragrafları sayın; paragraf başına ortalama kelimeyi, en uzun ve en kısa paragrafı görün.',
  category: 'metin',
  keywords: ['paragraf sayacı', 'paragraf sayısı bulma', 'metinde kaç paragraf var', 'paragraf sayma', 'paragraf uzunluğu', 'online paragraf sayacı', 'paragraf kelime sayısı'],
  lead: 'Metninizi yapıştırın; kaç paragraftan oluştuğunu, her paragrafa ortalama kaç kelime düştüğünü ve hangi paragrafın en uzun olduğunu görün. Paragrafların <strong>boş satırla</strong> mı yoksa <strong>tek satır sonuyla</strong> mı ayrıldığını araç kendisi anlayabilir ya da siz seçebilirsiniz.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Paragraflarını saymak istediğiniz metni buraya yapıştırın', wide: true },
    { id: 'ayirma', label: 'Paragraflar nasıl ayrılmış?', type: 'select', options: [['otomatik', 'Otomatik algıla'], ['bos', 'Aralarında boş satır var'], ['satir', 'Her satır sonu yeni paragraf']], hint: 'Otomatik: metinde boş satır varsa boş satıra göre, yoksa satır sonuna göre ayırır.' },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '').replace(/\r\n?/g, '\n');
    if (s.trim() === '') h.err('Paragraflarını saymak için "Metin" alanına bir metin yazın ya da yapıştırın.');
    let mod = v.ayirma;
    if (mod !== 'bos' && mod !== 'satir') mod = /\n[ \t]*\n/.test(s.trim()) ? 'bos' : 'satir';
    const parcalar = (mod === 'bos' ? s.split(/\n(?:[ \t]*\n)+/) : s.split('\n')).map((p) => p.trim()).filter((p) => p !== '');
    const kelimeSay = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    const uz = parcalar.map(kelimeSay);
    const toplam = uz.reduce((a, b) => a + b, 0);
    const karakter = parcalar.reduce((a, p) => a + Array.from(p).length, 0);
    const enUzun = Math.max(...uz), enKisa = Math.min(...uz);
    return {
      rows: [
        ['Paragraf sayısı', h.fmt(parcalar.length, 0)],
        ['Kelime sayısı', h.fmt(toplam, 0)],
        ['Paragraf başına ortalama kelime', h.fmt(toplam / parcalar.length, 2)],
        ['En uzun paragraf', `${h.fmt(enUzun, 0)} kelime (${uz.indexOf(enUzun) + 1}. paragraf)`],
        ['En kısa paragraf', `${h.fmt(enKisa, 0)} kelime (${uz.indexOf(enKisa) + 1}. paragraf)`],
        ['Paragraf başına ortalama karakter', h.fmt(karakter / parcalar.length, 1)],
        ['Kullanılan ayırma', mod === 'bos' ? 'Boş satır' : 'Satır sonu'],
      ],
      note: 'Yalnızca boşluk içeren satırlar boş sayılır; boş paragraflar sayıma girmez. Karakter ortalamasına paragraf içi boşluklar dahildir.',
    };
  },
  cases: [
    { in: { metin: 'Birinci paragrafın ilk satırı.\n\nİkinci paragraf burada başlıyor ve bitiyor.\n\nÜçüncü paragraf.', ayirma: 'otomatik' }, out: { 'Paragraf sayısı': '3', 'Kelime sayısı': '12', 'Paragraf başına ortalama kelime': '4', 'En uzun paragraf': '6 kelime (2. paragraf)', 'En kısa paragraf': '2 kelime (3. paragraf)', 'Kullanılan ayırma': 'Boş satır' } },
    { in: { metin: 'Sabah erken kalktım.\nKahvaltı hazırladım.\nİşe yürüyerek gittim.', ayirma: 'otomatik' }, out: { 'Paragraf sayısı': '3', 'Kelime sayısı': '8', 'Paragraf başına ortalama kelime': '2,67', 'Kullanılan ayırma': 'Satır sonu' } },
    { in: { metin: 'Satır bir\nsatır iki\n\nSatır üç', ayirma: 'bos' }, out: { 'Paragraf sayısı': '2', 'Kelime sayısı': '6', 'En uzun paragraf': '4 kelime (1. paragraf)' } },
    { in: { metin: 'Satır bir\nsatır iki\n\nSatır üç', ayirma: 'satir' }, out: { 'Paragraf sayısı': '3', 'Kelime sayısı': '6', 'Paragraf başına ortalama kelime': '2' } },
    { in: { metin: 'Tek paragraflık kısa metin', ayirma: 'otomatik' }, out: { 'Paragraf sayısı': '1', 'Kelime sayısı': '4', 'Paragraf başına ortalama karakter': '26' } },
    { in: { metin: '\n\nBaşta boşluk var.\n\n\n\n   \nSonda da var.\n\n', ayirma: 'bos' }, out: { 'Paragraf sayısı': '2', 'Kelime sayısı': '6' } },
    { in: { metin: '   \n\n  ', ayirma: 'otomatik' }, error: true },
  ],
  howto: [
    'Paragraflarını saymak istediğiniz metni "Metin" kutusuna yapıştırın ya da doğrudan yazın.',
    '"Paragraflar nasıl ayrılmış?" listesini "Otomatik algıla" konumunda bırakın; sonuç beklediğiniz gibi değilse metninize uyan seçeneği kendiniz belirleyin.',
    '"Say" düğmesine basın. İlk satırda paragraf sayısı, altında toplam kelime ve paragraf başına ortalama kelime görünür.',
    '"En uzun paragraf" satırındaki sıra numarasına bakarak bölünmesi gereken paragrafı bulun; "Kullanılan ayırma" satırı sayımın hangi kurala göre yapıldığını gösterir.',
  ],
  sections: [
    { h: 'Paragraf nedir, nasıl ayırt edilir?', p: [
      'Paragraf, tek bir düşünceyi ya da konunun tek bir yönünü işleyen cümleler bütünüdür. Kâğıt üzerinde paragraf başı girintiyle ya da satır atlanarak gösterilir. Bilgisayarda ise iki farklı alışkanlık vardır ve sayım yaparken hangisinin kullanıldığını bilmek gerekir.',
      'Kelime işlemci programlarında her Enter tuşu yeni bir paragraf başlatır; paragraflar arasındaki boşluk biçimlendirmeden gelir. Böyle bir belgeden kopyalanan metinde paragraflar <strong>tek satır sonuyla</strong> ayrılır. E-postalarda, düz metin dosyalarında ve internet sayfalarından kopyalanan yazılarda ise paragraflar arasında çoğunlukla <strong>boş bir satır</strong> bırakılır; tek satır sonu yalnızca satırın alt satıra geçtiğini gösterir. Şiir, adres bloğu ya da elle satır kırılmış metinler bu ikinci türdendir.',
    ] },
    { h: 'Üç ayırma seçeneği ne yapar?', ul: [
      '<strong>Otomatik algıla:</strong> metnin içinde en az bir boş satır varsa paragrafları boş satırlara göre ayırır; hiç boş satır yoksa her satırı ayrı paragraf kabul eder. Çoğu metin için doğru sonucu verir.',
      '<strong>Aralarında boş satır var:</strong> art arda gelen satırları tek paragrafta toplar, yalnızca boş satırda paragrafı bitirir. Birden çok boş satır tek ayırıcı gibi davranır.',
      '<strong>Her satır sonu yeni paragraf:</strong> dolu her satırı bir paragraf sayar. Kelime işlemciden kopyalanan metinlerde ve madde listelerinde bunu kullanın.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Aralarında boş satır bulunan şu üç bölümü düşünün: "Birinci paragrafın ilk satırı." (4 kelime), "İkinci paragraf burada başlıyor ve bitiyor." (6 kelime) ve "Üçüncü paragraf." (2 kelime). Otomatik algılama boş satırları görür ve 3 paragraf sayar. Toplam kelime 4 + 6 + 2 = 12, paragraf başına ortalama 12 ÷ 3 = 4 kelimedir. En uzun paragraf 6 kelimeyle ikinci, en kısa paragraf 2 kelimeyle üçüncüdür.',
      'Aynı metinde ayırma biçiminin sonucu nasıl değiştirdiğini görmek için şu dört satırı ele alalım: "Satır bir", altında "satır iki", bir boş satır ve "Satır üç". Boş satıra göre sayıldığında ilk iki satır birleşir ve 2 paragraf çıkar. Satır sonuna göre sayıldığında ise 3 paragraf bulunur. Kelime sayısı her iki durumda da 6\'dır; değişen yalnızca gruplamadır.',
    ] },
    { h: 'Paragraf uzunluğu neden izlenir?', p: [
      'Ekrandan okunan metinlerde uzun paragraflar "metin duvarı" etkisi yaratır ve okuyucunun gözü satır başını kaybeder. Telefon ekranında bu etki daha da belirgindir, çünkü masaüstünde beş satır tutan bir paragraf telefonda on beş satıra yayılabilir. Bu yüzden internet yazılarında paragraflar basılı kitaplara göre daha kısa tutulur.',
      'Okul ödevlerinde ve sınav kompozisyonlarında ise tersine bir kaygı vardır: giriş, gelişme ve sonuç bölümlerinin dengeli olması beklenir. Giriş ile sonuç birer paragraf, gelişme birkaç paragraf olacak biçimde planlanan bir yazıda, paragraf başına ortalama kelime ve en uzun paragraf bilgisi dengenin bozulup bozulmadığını hemen gösterir. Herkes için geçerli tek bir ideal uzunluk yoktur; ölçüyü yazının türü ve okuyucusu belirler.',
    ] },
    { h: 'Kullanım alanları', ul: [
      'Ödev ya da yarışma şartnamesindeki "en az beş paragraf" koşulunu denetlemek',
      'Blog yazısında telefon ekranında fazla uzun görünecek paragrafları bulmak',
      'Çeviri metninde kaynak ile hedefin paragraf sayısını karşılaştırıp atlanan bölüm olup olmadığını sınamak',
      'Kitap ya da tez bölümlerinde paragraf dağılımını izlemek',
      'Bir madde listesinde kaç dolu satır bulunduğunu hızlıca öğrenmek',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'PDF dosyalarından kopyalanan metinlerde her satırın sonuna satır sonu karakteri eklenir. Böyle bir metni "Her satır sonu yeni paragraf" seçeneğiyle sayarsanız paragraf sayısı gerçekte olduğundan çok daha yüksek çıkar. Bu durumda metinde boş satır yoksa önce paragraf aralarına birer boş satır ekleyin, ardından "Aralarında boş satır var" seçeneğini kullanın.',
      'Araç başlıkları, alt başlıkları ve madde işaretli satırları paragraftan ayırt edemez; boş satırla ayrılmış tek satırlık bir başlık da bir paragraf sayılır. Yalnızca gövde metnini saymak istiyorsanız başlıkları metinden çıkarın. Girinti, sekme ya da yalnızca boşluk karakterlerinden oluşan satırlar boş kabul edilir ve sayıma girmez.',
    ] },
  ],
  faq: [
    ['Paragraf sayısı nasıl bulunur?', 'Metin, seçilen kurala göre boş satırlardan ya da satır sonlarından bölünür; içinde yazı bulunan her parça bir paragraf sayılır. Boş kalan parçalar hesaba katılmaz.'],
    ['Otomatik algılama neye göre karar veriyor?', 'Metnin baştaki ve sondaki boşlukları atıldıktan sonra içinde en az bir boş satır kalıyorsa boş satıra göre, kalmıyorsa satır sonuna göre ayırır. Hangi kuralın uygulandığı sonuçtaki "Kullanılan ayırma" satırında yazar.'],
    ['Art arda birkaç boş satır bırakırsam fazladan paragraf sayılır mı?', 'Hayır. Art arda gelen boş satırlar tek bir ayırıcı olarak değerlendirilir ve boş paragraf oluşturmaz. Metnin başındaki ve sonundaki boş satırlar da sayımı etkilemez.'],
    ['Word belgesinden kopyaladığım metinde sonuç neden farklı çıktı?', 'Kelime işlemcilerde paragraflar çoğunlukla tek satır sonuyla ayrılır, aradaki boşluk biçimlendirmedir. Metinde boş satır yoksa otomatik algılama her satırı paragraf sayar; bu, kelime işlemcinin kendi paragraf sayımıyla aynı mantıktır.'],
    ['Başlıklar paragraf olarak sayılır mı?', 'Evet. Araç başlık ile gövde paragrafını ayırt edemez; kendi satırında duran her başlık bir paragraf olarak sayılır. Yalnızca gövde metnini saymak için başlıkları silip yeniden sayın.'],
    ['Paragraf başına ortalama kelime nasıl hesaplanır?', 'Toplam kelime sayısı paragraf sayısına bölünür. Örneğin 12 kelimelik üç paragraflı bir metinde ortalama 4 kelimedir. Kelime, boşluklarla ayrılmış ve içinde harf ya da rakam bulunan her parçadır.'],
    ['Şiirdeki dörtlükleri sayabilir miyim?', 'Evet. Dörtlükler arasında boş satır varsa "Aralarında boş satır var" seçeneğiyle her dörtlük bir paragraf olarak sayılır. Dize sayısını öğrenmek için "Her satır sonu yeni paragraf" seçeneğini kullanabilirsiniz.'],
    ['Metnim sunucuya gönderiliyor mu?', 'Hayır. Sayım yalnızca tarayıcınızda yapılır. Yapıştırdığınız metin hiçbir sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['cumle-sayaci', 'kelime-sayaci', 'satir-sayaci', 'karakter-sayaci', 'bos-satirlari-sil'],
};
