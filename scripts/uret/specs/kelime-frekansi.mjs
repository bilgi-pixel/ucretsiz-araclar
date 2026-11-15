export default {
  slug: 'kelime-frekansi',
  title: 'Kelime Frekansı Analizi',
  h1Tail: 'en çok geçen kelimeleri bulun',
  pageTitle: 'Kelime Frekansı Analizi – Metinde En Çok Geçen Kelimeleri Bulma',
  description: 'Metninizde hangi kelimenin kaç kez geçtiğini sayın. En sık kullanılan kelimeleri adet ve yüzdeleriyle sıralayın; Türkçe harf kurallarına uygun, bağlaç filtresiyle.',
  card: 'Metinde hangi kelimenin kaç kez geçtiğini sayın; en sık kelimeleri adet ve yüzdeyle sıralayın, bağlaçları filtreleyin.',
  category: 'metin',
  keywords: ['kelime frekansı', 'kelime sıklığı analizi', 'en çok geçen kelimeler', 'kelime tekrar sayısı', 'kelime yoğunluğu hesaplama', 'metin analizi', 'kelime sayma aracı', 'anahtar kelime yoğunluğu'],
  lead: 'Bir metinde geçen her kelimenin <strong>kaç kez kullanıldığını</strong> sayın ve en sık geçenleri adet ve yüzde oranlarıyla sıralayın. Büyük-küçük harf birleştirme Türkçe kurallarına göre yapılır; isterseniz bağlaç gibi dolgu kelimelerini ve kısa kelimeleri sayım dışı bırakabilirsiniz.',
  button: 'Analiz et',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Analiz edilecek metni yapıştırın', rows: 8 },
    { id: 'harf', label: 'Büyük-küçük harf', type: 'select', options: [['birlestir', 'Birleştir (Elma = elma)'], ['ayir', 'Ayrı say']] },
    { id: 'dolgu', label: 'Dolgu kelimeleri', type: 'select', options: [['hepsi', 'Say'], ['cikar', 'Sayma (ve, bir, bu, için…)']] },
    { id: 'enaz', label: 'En az harf sayısı', type: 'number', value: '1', hint: 'Bundan kısa kelimeler sayılmaz' },
    { id: 'adet', label: 'Listelenecek kelime sayısı', type: 'number', value: '20', hint: '1–100 arası; tam liste kopyalanabilir tabloda yer alır' },
  ],
  compute(v, h) {
    const metin = String(v.metin ?? '');
    if (metin.trim() === '') h.err('Analiz edilecek metni yazın.');
    if (metin.length > 2000000) h.err('Metin 2.000.000 karakterden uzun; parçalara bölerek deneyin.');
    const enaz = h.posint(v.enaz, 'En az harf sayısı');
    const adet = h.posint(v.adet, 'Listelenecek kelime sayısı');
    if (adet > 100) h.err('"Listelenecek kelime sayısı" en fazla 100 olabilir.');
    const DOLGU = new Set(['ve', 'veya', 'ile', 'bir', 'bu', 'şu', 'o', 'de', 'da', 'ki', 'mi', 'mı', 'mu', 'mü', 'için', 'ama', 'fakat', 'ancak', 'gibi', 'daha', 'çok', 'en', 'ya', 'ne', 'her', 'ise', 'diye', 'kadar', 'olarak', 'olan', 'hem', 'yani', 'çünkü']);
    const kucuk = (s) => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
    const bulunan = metin.normalize('NFC').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
    if (!bulunan.length) h.err('Metinde kelime bulunamadı; harf ya da rakam içeren bir metin yazın.');
    const sayac = new Map();
    let toplam = 0;
    for (const ham of bulunan) {
      let k = ham.replace(/’/g, '\'');
      const alt = kucuk(k);
      if (v.harf !== 'ayir') k = alt;
      if (Array.from(k.replace(/'/g, '')).length < enaz) continue;
      if (v.dolgu === 'cikar' && DOLGU.has(alt)) continue;
      sayac.set(k, (sayac.get(k) || 0) + 1);
      toplam++;
    }
    if (!toplam) h.err('Seçtiğiniz ölçütlere uyan kelime kalmadı; en az harf sayısını düşürün ya da dolgu kelimesi filtresini kapatın.');
    const sirali = [...sayac.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'tr'));
    const yuzde = (n) => '%' + h.fmt((n / toplam) * 100, 1);
    const tekil = sirali.filter((x) => x[1] === 1).length;
    const rows = [
      ['Toplam kelime', h.fmt(toplam, 0)],
      ['Farklı kelime', h.fmt(sirali.length, 0)],
      ['En sık kelime', `${sirali[0][0]} (${h.fmt(sirali[0][1], 0)} kez)`],
      ['Bir kez geçen kelime', h.fmt(tekil, 0)],
    ];
    sirali.slice(0, adet).forEach(([k, n], i) => rows.push([`${i + 1}. ${k}`, `${h.fmt(n, 0)} kez (${yuzde(n)})`]));
    const tablo = ['Sıra\tKelime\tAdet\tYüzde'].concat(sirali.slice(0, 5000).map(([k, n], i) => `${i + 1}\t${k}\t${n}\t${yuzde(n)}`));
    return {
      rows,
      text: tablo.join('\n'),
      note: 'Yüzdeler sayıma katılan kelimelerin toplamına göredir. Aşağıdaki sekmeyle ayrılmış tablo hesap tablosuna yapıştırılabilir.',
    };
  },
  cases: [
    { in: { metin: 'Bir elma, iki elma, üç elma; bir armut.' }, out: { 'Toplam kelime': '8', 'Farklı kelime': '5', 'En sık kelime': 'elma (3 kez)', 'Bir kez geçen kelime': '3', '1. elma': '3 kez (%37,5)', '2. bir': '2 kez (%25)', '3. armut': '1 kez (%12,5)' }, textMatch: '^Sıra\\tKelime\\tAdet\\tYüzde\\n1\\telma\\t3\\t%37,5\\n2\\tbir\\t2\\t%25\\n' },
    { in: { metin: 'Ali ali ALİ', harf: 'birlestir' }, out: { 'Toplam kelime': '3', 'Farklı kelime': '1', '1. ali': '3 kez (%100)' } },
    { in: { metin: 'Ali ali ALİ', harf: 'ayir' }, out: { 'Toplam kelime': '3', 'Farklı kelime': '3', 'Bir kez geçen kelime': '3' } },
    { in: { metin: 'ISI ısı Isı' }, out: { 'Farklı kelime': '1', 'En sık kelime': 'ısı (3 kez)' } },
    { in: { metin: 'Kedi ve köpek ile kuş ve balık', dolgu: 'cikar' }, out: { 'Toplam kelime': '4', 'Farklı kelime': '4' } },
    { in: { metin: 'Kedi ve köpek ile kuş ve balık', dolgu: 'hepsi' }, out: { 'Toplam kelime': '7', 'En sık kelime': 've (2 kez)', '1. ve': '2 kez (%28,6)' } },
    { in: { metin: 'at ata atlı atlas at', enaz: '4' }, out: { 'Toplam kelime': '2', 'Farklı kelime': '2' } },
    { in: { metin: 'İstanbul\'da yaşıyorum, İSTANBUL\'DA çalışıyorum.' }, out: { 'Toplam kelime': '4', '1. istanbul\'da': '2 kez (%50)' } },
    { in: { metin: '2026 yılı, 2026 hedefi' }, out: { 'En sık kelime': '2026 (2 kez)', 'Farklı kelime': '3' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '... !!! ???' }, error: true },
    { in: { metin: 've ile bir', dolgu: 'cikar' }, error: true },
    { in: { metin: 'elma armut', adet: '0' }, error: true },
  ],
  howto: [
    'İncelemek istediğiniz metni kutuya yapıştırın. Bir makale, ödev, ürün açıklaması ya da konuşma metni olabilir.',
    'Büyük ve küçük harfle yazılmış aynı kelimenin tek kelime sayılıp sayılmayacağını seçin. Genel analiz için "Birleştir" uygundur.',
    'Bağlaç ve edat gibi anlam taşımayan kelimeleri görmek istemiyorsanız dolgu kelimelerini sayım dışı bırakın; gerekiyorsa en az harf sayısını yükseltin.',
    '"Analiz et" düğmesine basın. Özet değerlerin altında en sık geçen kelimeler adet ve yüzdeleriyle sıralanır.',
    'Bütün kelimelerin tablosunu almak için "Sonucu kopyala" düğmesini kullanın ve hesap tablosuna yapıştırın.',
  ],
  sections: [
    { h: 'Kelime frekansı nedir?', p: [
      'Kelime frekansı, bir kelimenin belirli bir metinde kaç kez geçtiğidir. Bütün kelimeler için bu sayım yapılıp büyükten küçüğe sıralandığında metnin bir tür parmak izi ortaya çıkar: hangi kavramların öne çıktığı, hangi kelimelere gereğinden fazla yaslanıldığı ve söz varlığının ne kadar çeşitli olduğu tek bakışta görülür.',
      'Araç iki tür sayı verir. <strong>Toplam kelime</strong>, sayıma katılan bütün kelimelerin adedidir; aynı kelime her geçişinde yeniden sayılır. <strong>Farklı kelime</strong> ise birbirinden ayrı kaç kelime kullanıldığını gösterir. Her kelimenin yanındaki yüzde, o kelimenin adedinin toplam kelime sayısına bölünmesiyle bulunur: <strong>yüzde = adet ÷ toplam × 100</strong>.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu cümleyi ele alalım: <code>Bir elma, iki elma, üç elma; bir armut.</code> Noktalama işaretleri ayıklandığında sekiz kelime kalır: bir, elma, iki, elma, üç, elma, bir, armut. Büyük-küçük harf birleştirildiği için baştaki "Bir" ile sondaki "bir" aynı kelime sayılır.',
      'Sonuç şöyledir: toplam 8 kelime, 5 farklı kelime. "elma" 3 kez geçer ve payı 3 ÷ 8 × 100 = %37,5 olur. "bir" 2 kez geçer, payı %25\'tir. "armut", "iki" ve "üç" birer kez geçer; her birinin payı %12,5\'tir ve bu üçü "Bir kez geçen kelime" satırında 3 olarak görünür. Aynı sayıda geçen kelimeler kendi aralarında alfabetik sıralanır.',
    ] },
    { h: 'Kimler, ne için kullanır?', ul: [
      '<strong>Yazarlar ve editörler:</strong> Farkında olmadan sürekli yinelenen kelimeleri bulup eş anlamlılarıyla değiştirmek, anlatımı tekdüzelikten kurtarmak için.',
      '<strong>Öğrenciler:</strong> Ödev, makale ya da tez bölümünde aynı ifadeye çok sık başvurulup başvurulmadığını görmek için.',
      '<strong>İçerik ve SEO çalışanları:</strong> Bir sayfada hedef kelimenin yaklaşık yoğunluğunu ölçmek ve metnin gerçekten hangi konuya ağırlık verdiğini denetlemek için.',
      '<strong>Dil öğrenenler ve öğretmenler:</strong> Bir okuma parçasında en sık geçen kelimeleri çıkarıp öncelikli kelime listesi hazırlamak için.',
      '<strong>Araştırmacılar:</strong> Açık uçlu anket yanıtlarında, görüşme dökümlerinde ya da müşteri yorumlarında öne çıkan temaları ilk bakışta saptamak için.',
      '<strong>Konuşmacılar:</strong> Bir sunum metninde "yani", "aslında", "şey" gibi dolgu sözlerinin ne kadar yer tuttuğunu görmek için.',
    ] },
    { h: 'Türkçe metinlerde dikkat edilmesi gerekenler', p: [
      'Türkçe sondan eklemeli bir dildir; aynı kök çok sayıda farklı biçimde karşımıza çıkar. "ev", "evler", "evde", "evimiz" ve "evden" sözcükleri bu araçta beş ayrı kelime olarak sayılır, çünkü sayım yazılışa göre yapılır ve kelimeler köklerine indirgenmez. Bu nedenle bir kavramın gerçek ağırlığını görmek için listede aynı kökten gelen satırları birlikte değerlendirmeniz gerekir. Kesme işaretiyle ayrılan ekler de kelimenin parçası sayılır: "İstanbul\'da" ile "İstanbul\'un" ayrı satırlarda yer alır.',
      'Büyük-küçük harf birleştirme Türkçe kurallarına göre yapılır. Büyük I harfi küçük ı ile, büyük İ harfi küçük i ile eşleştirilir. Böylece "ISI", "Isı" ve "ısı" tek kelime olarak sayılır; "ALİ" ile "ali" de aynı satırda toplanır. İngilizce kurallarıyla çalışan araçlarda bu kelimeler yanlış biçimde ayrışabilir ya da birleşebilir.',
      'Doğal bir Türkçe metinde listenin başını çoğunlukla "ve", "bir", "bu", "de", "da", "için" gibi kelimeler tutar. Bunlar metnin konusu hakkında bilgi vermez. Dolgu kelimelerini sayım dışı bırakma seçeneği, yaygın bağlaç, edat ve soru eklerinden oluşan kısa bir listeyi eler; yüzdeler de kalan kelimeler üzerinden yeniden hesaplanır.',
    ] },
    { h: 'Anahtar kelime yoğunluğu hakkında', p: [
      'Bir kelimenin yüzdesi, içerik dünyasında "anahtar kelime yoğunluğu" olarak anılır. Bu değeri bir hedefe ulaşmak için değil, aşırıya kaçılıp kaçılmadığını görmek için kullanmak daha sağlıklıdır. Bir kelimeyi belirli bir orana ulaşsın diye metne zorla serpiştirmek okumayı güçleştirir ve arama motorlarınca olumsuz değerlendirilebilen bir uygulamadır. Okura yararlı, doğal akan bir metinde konuyla ilgili kelimeler zaten yeterince geçer. Bu araçtaki oran tek kelimeler içindir; iki ya da üç kelimelik ifadelerin sıklığı ayrıca hesaplanmaz.',
    ] },
    { h: 'Sayım kuralları ve sınırlar', ul: [
      'Kelime, kesintisiz harf ve rakam dizisidir. Boşluk, noktalama işareti, tire ve satır sonu kelimeleri ayırır; "e-posta" bu yüzden "e" ve "posta" olarak iki kelime sayılır.',
      'Rakamlar da kelime sayılır; "2026" bir kelimedir. Ondalıklı sayılar virgül ya da noktadan bölünür.',
      '"En az harf sayısı" alanı kısa kelimeleri eler; 3 yazarsanız bir ve iki harfli kelimeler sayılmaz.',
      'Ekranda en fazla 100 kelime listelenir. Kopyalanabilir tabloda ilk 5.000 farklı kelime yer alır.',
      'Metin uzunluğu 2.000.000 karakterle sınırlıdır.',
    ] },
  ],
  faq: [
    ['Kelime frekansı ile kelime sayısı arasındaki fark nedir?', 'Kelime sayısı metindeki toplam kelime adedini verir. Kelime frekansı ise her bir kelimenin ayrı ayrı kaç kez geçtiğini gösterir; yani toplamın hangi kelimelerden oluştuğunu döker.'],
    ['"Ev" ve "evler" neden ayrı sayılıyor?', 'Araç kelimeleri yazıldıkları gibi sayar, eklerini ayırıp köküne indirgemez. Türkçede bir kök çok sayıda ek alabildiği için aynı kökten gelen kelimeleri listede birlikte değerlendirmeniz gerekir.'],
    ['Bağlaçları listeden nasıl çıkarırım?', '"Dolgu kelimeleri" seçeneğini "Sayma" konumuna getirin. "ve", "ile", "bir", "bu", "için", "ama", "gibi" gibi yaygın kelimeler sayım dışı kalır ve yüzdeler kalan kelimelere göre hesaplanır.'],
    ['Yüzde değeri neye göre hesaplanıyor?', 'Kelimenin geçme sayısı, sayıma katılan toplam kelime sayısına bölünüp 100 ile çarpılır. Filtre kullandıysanız elenen kelimeler toplamın dışında kalır; bu yüzden filtreli ve filtresiz yüzdeler farklı çıkar.'],
    ['Büyük harfle başlayan kelimeler ayrı mı sayılır?', 'Varsayılan ayarda hayır; "Elma" ile "elma" tek kelime sayılır. Özel adları cins adlardan ayırmak gibi bir amacınız varsa "Ayrı say" seçeneğini kullanabilirsiniz.'],
    ['Sonuçları hesap tablosuna aktarabilir miyim?', 'Evet. "Sonucu kopyala" düğmesi sıra, kelime, adet ve yüzde sütunlarından oluşan sekmeyle ayrılmış tabloyu panoya alır. Hesap tablosuna yapıştırdığınızda her değer kendi hücresine yerleşir.'],
    ['İdeal anahtar kelime yoğunluğu yüzde kaçtır?', 'Herkes için geçerli, kesin bir oran yoktur. Metnin doğal okunması asıl ölçüttür. Bir kelimenin gözle fark edilir biçimde tekrarlandığını görüyorsanız bir kısmını eş anlamlılarıyla değiştirmek ya da cümleleri yeniden kurmak iyi bir fikirdir.'],
    ['Metnim bir yere yükleniyor mu?', 'Hayır. Sayım tamamen tarayıcınızda yapılır; yayımlanmamış yazılarınız ya da ödevleriniz dahil hiçbir metin sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['kelime-sayaci', 'harf-frekansi', 'kelime-bulutu', 'karakter-sayaci', 'kelime-tekrar-bul', 'metin-istatistikleri'],
};
