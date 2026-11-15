export default {
  slug: 'aciklik-hesapla',
  title: 'Açıklık (Ranj) Hesaplama',
  h1Tail: 'en büyük − en küçük',
  pageTitle: 'Açıklık (Ranj) Hesaplama – Veri Grubunun En Büyük ve En Küçük Farkı',
  description: 'Sayı listenizin açıklığını (ranj) bulun: en büyük değer ile en küçük değerin farkı. En küçük, en büyük, orta açıklık, ortalama ve veri sayısı da gösterilir.',
  card: 'Sayılarınızı yapıştırın; en büyük ile en küçük değer arasındaki farkı (açıklık) ve uç değerleri anında görün.',
  category: 'matematik',
  keywords: ['açıklık hesaplama', 'ranj hesaplama', 'açıklık nasıl bulunur', 'veri açıklığı', 'en büyük en küçük farkı', 'dağılım aralığı', 'orta açıklık', '7. sınıf açıklık'],
  lead: 'Bir veri grubunun <strong>açıklığını</strong>, yani en büyük değeri ile en küçük değeri arasındaki farkı bulun. Araç sayıları sizin yerinize tarar; uç değerleri, orta açıklığı ve ortalamayı da listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Veriler', type: 'textarea', placeholder: 'Örn. 45 60 72 88 95', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın; ondalık için virgül kullanabilirsiniz.', wide: true },
  ],
  compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler');
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    let enK = x[0], enB = x[0], top = 0;
    for (const a of x) { if (a < enK) enK = a; if (a > enB) enB = a; top += a; }
    const aciklik = enB - enK;
    return {
      rows: [
        ['Açıklık (ranj)', h.fmt(aciklik, 6)],
        ['En büyük değer', h.fmt(enB, 6)],
        ['En küçük değer', h.fmt(enK, 6)],
        ['Orta açıklık', h.fmt((enB + enK) / 2, 6)],
        ['Aritmetik ortalama', h.fmt(top / n, 4)],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note: n === 1 ? 'Tek veri girildiği için en büyük ve en küçük değer aynıdır; açıklık 0 çıkar.' : 'Açıklık = en büyük değer − en küçük değer. Orta açıklık, bu iki uç değerin ortalamasıdır.',
    };
  },
  cases: [
    { in: { sayilar: '45 60 72 88 95' }, out: { 'Açıklık (ranj)': '50', 'En büyük değer': '95', 'En küçük değer': '45', 'Orta açıklık': '70', 'Aritmetik ortalama': '72', 'Veri sayısı': '5' } },
    { in: { sayilar: '12; 3; 15; 7; 8' }, out: { 'Açıklık (ranj)': '12', 'En büyük değer': '15', 'En küçük değer': '3', 'Orta açıklık': '9', 'Aritmetik ortalama': '9' } },
    { in: { sayilar: '-5 3 10' }, out: { 'Açıklık (ranj)': '15', 'En küçük değer': '-5', 'Orta açıklık': '2,5' } },
    { in: { sayilar: '1,5\n4,25\n2' }, out: { 'Açıklık (ranj)': '2,75', 'En büyük değer': '4,25', 'En küçük değer': '1,5' } },
    { in: { sayilar: '18 22 31 27' }, out: { 'Açıklık (ranj)': '13', 'Aritmetik ortalama': '24,5' } },
    { in: { sayilar: '5 5 5' }, out: { 'Açıklık (ranj)': '0', 'Veri sayısı': '3' } },
    { in: { sayilar: '7' }, out: { 'Açıklık (ranj)': '0', 'En büyük değer': '7', 'En küçük değer': '7' } },
    { in: { sayilar: '1200 950 1800 1450' }, out: { 'Açıklık (ranj)': '850', 'En büyük değer': '1.800', 'Orta açıklık': '1.375' } },
    { in: { sayilar: '' }, error: true },
    { in: { sayilar: '4 yedi 9' }, error: true },
  ],
  howto: [
    '"Veriler" kutusuna sayılarınızı yazın ya da bir tablodan kopyalayıp yapıştırın. Sıralı olmaları gerekmez.',
    'Sayıları boşluk, yeni satır ya da noktalı virgülle ayırdığınızdan emin olun; virgül ondalık ayırıcı olarak okunur.',
    '"Hesapla" düğmesine basın. İlk satır açıklığı, sonraki iki satır en büyük ve en küçük değeri gösterir.',
    'Uç değerlerden biri beklediğinizden çok farklıysa veriyi kontrol edin; tek bir yazım hatası açıklığı tümüyle değiştirir.',
  ],
  sections: [
    { h: 'Açıklık (ranj) nedir?', p: [
      'Açıklık, bir veri grubundaki en büyük değer ile en küçük değer arasındaki farktır. Verilerin sayı doğrusu üzerinde ne kadar geniş bir aralığa yayıldığını tek bir sayıyla anlatır ve en basit yayılım ölçüsüdür. Fransızca kökenli "ranj" ve "değişim aralığı" adlarıyla da anılır; ortaokul matematiğinde aritmetik ortalama, ortanca ve tepe değerle birlikte öğretilir.',
      'Formülü şöyledir: <strong>Açıklık = en büyük değer − en küçük değer</strong>. Sonuç verinin kendi birimini taşır ve hiçbir zaman negatif olamaz; bütün değerler eşitse sıfırdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Sınav puanları:</strong> Beş öğrencinin puanları 45, 60, 72, 88 ve 95 olsun. En büyük değer 95, en küçük değer 45\'tir. Açıklık 95 − 45 = <strong>50</strong> puandır. Uç değerlerin ortalaması olan orta açıklık (95 + 45) ÷ 2 = 70, aritmetik ortalama ise 72\'dir.',
      '<strong>Sırasız veri:</strong> 12, 3, 15, 7, 8 sayılarında önce uç değerler bulunur: en büyük 15, en küçük 3. Açıklık 15 − 3 = 12\'dir. Veriyi sıralamak şart değildir, ancak elle hesaplarken sıralamak uç değerleri gözden kaçırma riskini azaltır.',
      '<strong>Negatif sayılar:</strong> Bir hafta içinde ölçülen en düşük sıcaklık −5 °C, en yüksek sıcaklık 10 °C ise açıklık 10 − (−5) = 15 derecedir. Negatif sayıyı çıkarırken işaret değiştiği için fark toplamaya dönüşür; en sık yapılan hata burada 10 − 5 = 5 bulmaktır.',
    ] },
    { h: 'Açıklık ne anlatır, ne anlatmaz?', p: [
      'Küçük bir açıklık, verilerin birbirine yakın olduğunu; büyük bir açıklık ise en az iki değerin birbirinden çok uzak olduğunu gösterir. İki sınıfın sınav ortalaması aynı olsa bile birinin açıklığı 20, diğerinin 70 puansa, ikinci sınıfta başarı düzeyleri arasındaki fark çok daha büyüktür.',
      'Öte yandan açıklık yalnızca iki değere, en uçtaki iki veriye bakar; aradaki değerlerin nasıl dağıldığı hakkında hiçbir şey söylemez. 1, 50, 50, 50, 100 ile 1, 2, 3, 99, 100 verilerinin açıklığı aynıdır (99), oysa dağılımları tümüyle farklıdır. Bu yüzden açıklık tek başına değil, ortalama ya da ortanca gibi bir merkez ölçüsüyle birlikte yorumlanmalıdır.',
    ] },
    { h: 'Uç değerlere duyarlılık', p: [
      'Açıklığın en zayıf yanı aykırı değerlerden tam anlamıyla etkilenmesidir. Aylık harcamalarınız 1.200, 950, 1.450 TL iken tek seferlik 1.800 TL\'lik bir ay eklendiğinde açıklık 500\'den 850\'ye çıkar; geri kalan aylar hiç değişmemiş olsa bile. Hatalı girilmiş tek bir sayı da aynı etkiyi yapar.',
      'Uç değerlerin sonucu belirlemesini istemediğiniz durumlarda çeyrekler açıklığı daha uygun bir ölçüdür: verinin en küçük ve en büyük dörtte birlik bölümlerini dışarıda bırakıp ortadaki yarının genişliğine bakar. Tüm verileri hesaba katan bir ölçü gerektiğinde ise standart sapma kullanılır.',
      'Açıklık örneklem büyüklüğüne de bağlıdır. Aynı topluluktan daha çok veri toplandıkça daha uç değerlerle karşılaşma olasılığı artar ve açıklık genellikle büyür. Farklı sayıda veri içeren iki grubun açıklıklarını karşılaştırırken bu etkiyi akılda tutmak gerekir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Hava durumu:</strong> Günlük en yüksek ve en düşük sıcaklık arasındaki fark, günlük sıcaklık açıklığıdır.',
      '<strong>Fiyat karşılaştırma:</strong> Aynı ürünün farklı satıcılardaki en pahalı ve en ucuz fiyatı arasındaki fark, pazarlık payı hakkında fikir verir.',
      '<strong>Kalite kontrol:</strong> Üretimden alınan küçük numunelerde ölçümlerin açıklığı hızlıca hesaplanır ve sürecin kararlılığını izlemek için kullanılır.',
      '<strong>Eğitim:</strong> Bir sınavda en yüksek ve en düşük puan arasındaki fark, sınıfın ne kadar homojen olduğuna dair ilk izlenimi sağlar.',
      '<strong>Frekans tablosu hazırlama:</strong> Veriler gruplara ayrılırken grup genişliği, açıklığın istenen grup sayısına bölünmesiyle belirlenir.',
    ] },
    { h: 'Orta açıklık ve sınırlar', p: [
      'Sonuçlardaki "orta açıklık", en büyük ve en küçük değerin ortalamasıdır: (en büyük + en küçük) ÷ 2. Verinin kapladığı aralığın tam orta noktasını gösterir. Dağılım simetrikse aritmetik ortalamaya yakın çıkar; ikisi arasındaki belirgin fark, verinin bir yöne doğru yığıldığına ya da tek taraflı bir uç değer bulunduğuna işaret eder.',
      'Araç en çok 100.000 sayı kabul eder ve ham (tek tek yazılmış) veriler içindir. Sınıf aralıklarıyla gruplandırılmış tablolarda açıklık, son grubun üst sınırı ile ilk grubun alt sınırı arasındaki fark olarak alınır; bu hesabı tablodaki sınır değerlerini yazarak yapabilirsiniz.',
    ] },
  ],
  faq: [
    ['Açıklık nasıl hesaplanır?', 'Veri grubundaki en büyük değerden en küçük değer çıkarılır. Örneğin 4, 9, 2, 7 sayılarında en büyük 9, en küçük 2 olduğundan açıklık 7\'dir.'],
    ['Açıklık ile ranj aynı şey mi?', 'Evet. Ranj, açıklığın Fransızca kökenli adıdır. Değişim aralığı ya da dağılım genişliği de aynı ölçüyü anlatır.'],
    ['Açıklık negatif çıkabilir mi?', 'Hayır. En büyük değer en küçük değerden küçük olamayacağı için sonuç her zaman sıfır ya da pozitiftir. Negatif bir sonuç bulduysanız çıkarmanın sırasını ters yapmışsınızdır.'],
    ['Veride negatif sayılar varsa nasıl hesaplanır?', 'Kural değişmez: en büyük değerden en küçük değer çıkarılır. En küçük değer negatifse çıkarma toplamaya dönüşür; −5 ile 10 arasındaki açıklık 10 − (−5) = 15\'tir.'],
    ['Açıklık sıfır çıkarsa ne anlama gelir?', 'Bütün verilerin birbirine eşit olduğunu, yani hiç yayılım bulunmadığını gösterir. Tek bir veri girildiğinde de sonuç sıfırdır.'],
    ['Açıklık mı, standart sapma mı daha iyi bir ölçüdür?', 'Açıklık hesaplaması ve anlaşılması en kolay ölçüdür ama yalnızca iki uç değere dayanır. Standart sapma bütün verileri hesaba katar ve daha bilgilendiricidir. Hızlı bir ilk bakış için açıklık, ayrıntılı değerlendirme için standart sapma ya da çeyrekler açıklığı tercih edilir.'],
    ['Tekrar eden değerler açıklığı etkiler mi?', 'Hayır. Açıklık yalnızca en büyük ve en küçük değere bağlıdır; bir değerin kaç kez tekrarlandığı sonucu değiştirmez.'],
    ['Girdiğim sayılar saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız veriler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['ceyreklik-hesapla', 'standart-sapma-hesapla', 'ortalama-hesapla', 'medyan-hesapla', 'tepe-deger-hesapla', 'degisim-katsayisi-hesapla'],
};
