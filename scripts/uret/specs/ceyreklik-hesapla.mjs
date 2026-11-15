export default {
  slug: 'ceyreklik-hesapla',
  title: 'Çeyreklikler ve IQR Hesaplama',
  h1Tail: 'Q1, Q2, Q3 ve aykırı değerler',
  pageTitle: 'Çeyreklik ve IQR Hesaplama – Q1, Q3, Çeyrekler Açıklığı',
  description: 'Veri setinizin Q1, Q2 (medyan) ve Q3 çeyrekliklerini, çeyrekler açıklığını (IQR) ve 1,5 × IQR kuralına göre aykırı değerlerini bulun. Üç farklı yöntem desteklenir.',
  card: 'Sayılarınızı yapıştırın; Q1, medyan, Q3, çeyrekler açıklığı (IQR) ve aykırı değerleri tek adımda görün.',
  category: 'matematik',
  keywords: ['çeyreklik hesaplama', 'çeyrekler açıklığı hesaplama', 'IQR hesaplama', 'Q1 Q3 hesaplama', 'alt çeyrek üst çeyrek', 'aykırı değer bulma', 'kutu grafiği değerleri', 'çeyrek sapma'],
  lead: 'Bir veri setini dört eşit parçaya bölen <strong>Q1, Q2 ve Q3</strong> değerlerini ve aralarındaki farkı gösteren <strong>çeyrekler açıklığını (IQR)</strong> hesaplayın. Araç ayrıca 1,5 × IQR kuralıyla alt ve üst sınırları belirleyip aykırı değerleri listeler.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Veriler', type: 'textarea', placeholder: 'Örn. 6 7 15 36 39 40 41 42 43 47 49', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın; ondalık için virgül kullanabilirsiniz.', wide: true },
    { id: 'yontem', label: 'Yöntem', type: 'select', options: [['haric', 'Medyan hariç (okul yöntemi)'], ['dahil', 'Medyan dahil (Tukey menteşeleri)'], ['dogrusal', 'Doğrusal ara değer (hesap tablosu yöntemi)']] },
  ],
  compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler').slice().sort((a, b) => a - b);
    const n = x.length;
    if (n < 2) h.err('Çeyreklikleri hesaplamak için en az 2 veri girin.');
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const medyan = (a) => { const m = a.length; return m % 2 ? a[(m - 1) / 2] : (a[m / 2 - 1] + a[m / 2]) / 2; };
    const q2 = medyan(x);
    let q1, q3;
    if (v.yontem === 'dogrusal') {
      const konum = (f) => {
        const s = f * (n - 1), a = Math.floor(s + 1e-9), k = s - a;
        return a >= n - 1 ? x[n - 1] : (k < 1e-9 ? x[a] : x[a] + k * (x[a + 1] - x[a]));
      };
      q1 = konum(0.25); q3 = konum(0.75);
    } else {
      const yari = Math.floor(n / 2);
      const dahil = v.yontem === 'dahil' && n % 2 === 1;
      q1 = medyan(x.slice(0, dahil ? yari + 1 : yari));
      q3 = medyan(x.slice(dahil ? yari : n - yari));
    }
    const iqr = q3 - q1;
    const alt = q1 - 1.5 * iqr, ust = q3 + 1.5 * iqr;
    const aykiri = x.filter((a) => a < alt - 1e-9 || a > ust + 1e-9);
    let aykiriMetin = 'Yok';
    if (aykiri.length) {
      aykiriMetin = aykiri.slice(0, 30).map((a) => h.fmt(a, 4)).join('; ');
      if (aykiri.length > 30) aykiriMetin += ` … (toplam ${h.fmt(aykiri.length, 0)})`;
    }
    return {
      rows: [
        ['Q1 (birinci çeyreklik)', h.fmt(q1, 4)],
        ['Q2 (medyan)', h.fmt(q2, 4)],
        ['Q3 (üçüncü çeyreklik)', h.fmt(q3, 4)],
        ['Çeyrekler açıklığı (IQR)', h.fmt(iqr, 4)],
        ['Çeyrek sapma (IQR ÷ 2)', h.fmt(iqr / 2, 4)],
        ['Alt sınır (Q1 − 1,5 × IQR)', h.fmt(alt, 4)],
        ['Üst sınır (Q3 + 1,5 × IQR)', h.fmt(ust, 4)],
        ['Aykırı değerler', aykiriMetin],
        ['En küçük – en büyük', `${h.fmt(x[0], 4)} – ${h.fmt(x[n - 1], 4)}`],
        ['Veri sayısı', h.fmt(n, 0)],
      ],
      note: 'Çeyrekliklerin birden çok kabul görmüş tanımı vardır; küçük veri setlerinde yöntemler farklı sonuç verebilir. Ödev ya da raporda istenen yöntemi seçin.',
    };
  },
  cases: [
    { in: { sayilar: '6 7 15 36 39 40 41 42 43 47 49', yontem: 'haric' }, out: { 'Q1 (birinci çeyreklik)': '15', 'Q2 (medyan)': '40', 'Q3 (üçüncü çeyreklik)': '43', 'Çeyrekler açıklığı (IQR)': '28', 'Alt sınır (Q1 − 1,5 × IQR)': '-27', 'Üst sınır (Q3 + 1,5 × IQR)': '85', 'Aykırı değerler': 'Yok', 'Veri sayısı': '11' } },
    { in: { sayilar: '1 2 3 4 5 6 7 8 9 100', yontem: 'haric' }, out: { 'Q1 (birinci çeyreklik)': '3', 'Q2 (medyan)': '5,5', 'Q3 (üçüncü çeyreklik)': '8', 'Çeyrekler açıklığı (IQR)': '5', 'Alt sınır (Q1 − 1,5 × IQR)': '-4,5', 'Üst sınır (Q3 + 1,5 × IQR)': '15,5', 'Aykırı değerler': '100' } },
    { in: { sayilar: '6 7 15 36 39 40 41 42 43 47 49', yontem: 'dahil' }, out: { 'Q1 (birinci çeyreklik)': '25,5', 'Q2 (medyan)': '40', 'Q3 (üçüncü çeyreklik)': '42,5', 'Çeyrekler açıklığı (IQR)': '17' } },
    { in: { sayilar: '6 7 15 36 39 40 41 42 43 47 49', yontem: 'dogrusal' }, out: { 'Q1 (birinci çeyreklik)': '25,5', 'Q3 (üçüncü çeyreklik)': '42,5' } },
    { in: { sayilar: '7 15 36 39 40 41', yontem: 'haric' }, out: { 'Q1 (birinci çeyreklik)': '15', 'Q2 (medyan)': '37,5', 'Q3 (üçüncü çeyreklik)': '40', 'Çeyrekler açıklığı (IQR)': '25', 'Çeyrek sapma (IQR ÷ 2)': '12,5' } },
    { in: { sayilar: '7 15 36 39 40 41', yontem: 'dogrusal' }, out: { 'Q1 (birinci çeyreklik)': '20,25', 'Q3 (üçüncü çeyreklik)': '39,75', 'Çeyrekler açıklığı (IQR)': '19,5' } },
    { in: { sayilar: '8; 3; 1; 6; 2; 7; 5; 4', yontem: 'haric' }, out: { 'Q1 (birinci çeyreklik)': '2,5', 'Q2 (medyan)': '4,5', 'Q3 (üçüncü çeyreklik)': '6,5', 'Çeyrekler açıklığı (IQR)': '4', 'En küçük – en büyük': '1 – 8' } },
    { in: { sayilar: '1 2 3 4 5 6 7 8', yontem: 'dogrusal' }, out: { 'Q1 (birinci çeyreklik)': '2,75', 'Q3 (üçüncü çeyreklik)': '6,25', 'Çeyrekler açıklığı (IQR)': '3,5' } },
    { in: { sayilar: '2 4 6 8 10', yontem: 'haric' }, out: { 'Q1 (birinci çeyreklik)': '3', 'Q3 (üçüncü çeyreklik)': '9' } },
    { in: { sayilar: '2 4 6 8 10', yontem: 'dahil' }, out: { 'Q1 (birinci çeyreklik)': '4', 'Q3 (üçüncü çeyreklik)': '8' } },
    { in: { sayilar: '5', yontem: 'haric' }, error: true },
    { in: { sayilar: '', yontem: 'haric' }, error: true },
    { in: { sayilar: '4 x 9', yontem: 'dogrusal' }, error: true },
  ],
  howto: [
    '"Veriler" kutusuna sayılarınızı yazın ya da yapıştırın; sıralamanız gerekmez.',
    'Yöntemi seçin. Okul matematiğinde ve çoğu sınav sorusunda "medyan hariç" yöntemi beklenir; hesap tablosu sonuçlarıyla karşılaştırma yapacaksanız "doğrusal ara değer" seçeneğini kullanın.',
    '"Hesapla" düğmesine basın. İlk üç satır çeyreklikleri, dördüncü satır çeyrekler açıklığını gösterir.',
    'Alt ve üst sınır satırlarına bakın; bu sınırların dışında kalan veriler "Aykırı değerler" satırında listelenir.',
    'Kutu grafiği çizecekseniz en küçük, Q1, medyan, Q3 ve en büyük değerleri sonuçtan doğrudan alabilirsiniz.',
  ],
  sections: [
    { h: 'Çeyreklikler ve çeyrekler açıklığı nedir?', p: [
      'Küçükten büyüğe sıralanmış bir veri setini dört eşit parçaya bölen üç değere çeyreklik denir. <strong>Q1</strong> (alt çeyrek) verilerin en küçük dörtte birini, <strong>Q2</strong> (medyan) yarısını, <strong>Q3</strong> (üst çeyrek) dörtte üçünü geride bırakan noktadır. Bu değerler sırasıyla 25., 50. ve 75. yüzdeliklere karşılık gelir.',
      '<strong>Çeyrekler açıklığı</strong>, İngilizce kısaltmasıyla IQR, Q3 ile Q1 arasındaki farktır: IQR = Q3 − Q1. Verilerin ortadaki yarısının ne kadar geniş bir aralığa yayıldığını gösterir. En büyük ve en küçük değer hesaba girmediği için uç değerlerden etkilenmez; bu yönüyle açıklığa (ranj) ve standart sapmaya göre daha dayanıklı bir yayılım ölçüsüdür. Çeyrek sapma ise IQR\'nin yarısıdır.',
    ] },
    { h: 'Çeyreklikler nasıl bulunur?', ol: [
      'Verileri küçükten büyüğe sıralayın.',
      'Medyanı (Q2) bulun: veri sayısı tekse ortadaki değer, çiftse ortadaki iki değerin ortalamasıdır.',
      'Veriyi medyandan alt ve üst yarıya ayırın. Veri sayısı tekse ortadaki değerin yarılara katılıp katılmayacağı yönteme göre değişir.',
      'Alt yarının medyanı Q1, üst yarının medyanı Q3\'tür.',
      'Q3\'ten Q1\'i çıkararak çeyrekler açıklığını bulun.',
    ] },
    { h: 'Üç yöntem arasındaki fark', p: [
      '<strong>Medyan hariç:</strong> Veri sayısı tek olduğunda ortadaki değer iki yarıya da katılmaz. Okul matematiğinde en sık öğretilen ve pek çok hesap makinesinin kullandığı yöntem budur.',
      '<strong>Medyan dahil:</strong> Veri sayısı tek olduğunda ortadaki değer hem alt hem üst yarıya eklenir. Kutu grafiğini geliştiren John Tukey\'nin "menteşe" tanımıdır. Veri sayısı çift olduğunda ilk yöntemle aynı sonucu verir.',
      '<strong>Doğrusal ara değer:</strong> Q1 için 1 + 0,25 × (n − 1), Q3 için 1 + 0,75 × (n − 1) sırası hesaplanır ve sıra kesirliyse komşu iki veri arasında orantılı değer alınır. Hesap tablosu programlarındaki ÇEYREK işlevinin varsayılan davranışıdır.',
      'Veri sayısı büyüdükçe yöntemlerin sonuçları birbirine yaklaşır; fark asıl olarak 10 – 20 verili küçük setlerde göze çarpar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Veriler: 6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49 (11 veri). Ortadaki, yani altıncı değer 40\'tır: Q2 = 40.',
      '<strong>Medyan hariç yöntemle</strong> alt yarı 6, 7, 15, 36, 39 olur; ortadaki değer 15 olduğundan Q1 = 15\'tir. Üst yarı 41, 42, 43, 47, 49\'dur; Q3 = 43. Çeyrekler açıklığı 43 − 15 = <strong>28</strong> çıkar.',
      '<strong>Medyan dahil yöntemle</strong> alt yarı 6, 7, 15, 36, 39, 40 olur; ortadaki iki değerin ortalaması (15 + 36) ÷ 2 = 25,5\'tir. Üst yarı 40, 41, 42, 43, 47, 49 için Q3 = (42 + 43) ÷ 2 = 42,5 bulunur. IQR = 17\'dir. Doğrusal ara değer yöntemi de bu veri için aynı 25,5 ve 42,5 değerlerini verir.',
      'Aynı verinin IQR değerinin bir yöntemde 28, diğerinde 17 çıkması, 15 ile 36 arasındaki büyük boşluktan kaynaklanır. Sonuç bildirirken yöntemi de belirtmek bu yüzden önemlidir.',
    ] },
    { h: 'Aykırı değerlerin belirlenmesi: 1,5 × IQR kuralı', p: [
      'Yaygın bir kurala göre <strong>Q1 − 1,5 × IQR</strong> değerinden küçük ya da <strong>Q3 + 1,5 × IQR</strong> değerinden büyük veriler aykırı değer adayı sayılır. Kutu grafiklerinde bıyıklar bu sınırların içindeki en uç verilere kadar uzatılır, dışarıda kalanlar ayrı noktalar olarak çizilir.',
      'Örnek: 1, 2, 3, 4, 5, 6, 7, 8, 9, 100 verisinde medyan hariç yöntemle Q1 = 3, Q3 = 8 ve IQR = 5\'tir. Alt sınır 3 − 7,5 = −4,5; üst sınır 8 + 7,5 = 15,5 olur. 100 değeri üst sınırı aştığı için aykırı değer olarak listelenir.',
      'Bu kural bir işaretleme aracıdır, hüküm değildir. İşaretlenen değer bir ölçüm ya da yazım hatası olabileceği gibi, verinin gerçek ve önemli bir parçası da olabilir. Bir değeri yalnızca sınırın dışında kaldığı için silmek doğru değildir; önce nedenini araştırmak gerekir.',
    ] },
    { h: 'Nerede kullanılır, sınırları nelerdir?', p: [
      'Çeyreklikler; ücret ve fiyat dağılımlarının özetlenmesinde, sınav sonuçlarının değerlendirilmesinde, kalite kontrolünde ve dağılımı çarpık olan her tür veride ortalama ve standart sapmaya tercih edilir. Beş sayı özeti (en küçük, Q1, medyan, Q3, en büyük) bir veri setini tek satırda tanıtmanın en yaygın yoludur.',
      'Çok az veriyle hesaplanan çeyreklikler kararsızdır; tek bir verinin eklenmesi sonucu belirgin biçimde değiştirebilir. Araç en az 2, en çok 100.000 sayı kabul eder ve gruplandırılmış (sınıf aralıklı) frekans tablolarından çeyreklik hesaplamaz.',
    ] },
  ],
  faq: [
    ['Çeyrekler açıklığı (IQR) nasıl hesaplanır?', 'Üçüncü çeyreklikten birinci çeyreklik çıkarılır: IQR = Q3 − Q1. Önce veriler sıralanır, medyan bulunur, ardından alt ve üst yarıların medyanları Q1 ve Q3 olarak alınır.'],
    ['Q1, Q2 ve Q3 ne anlama gelir?', 'Q1 verilerin %25\'inin, Q2 %50\'sinin, Q3 %75\'inin altında kaldığı değerdir. Q2 aynı zamanda medyandır.'],
    ['Hesap tablosunda bulduğum çeyreklik neden farklı?', 'Hesap tabloları varsayılan olarak doğrusal ara değer yöntemini kullanır; okul yöntemi ise veriyi yarılara ayırıp medyan alır. Yöntem listesinden "Doğrusal ara değer" seçeneğini seçerseniz aynı sonucu görürsünüz.'],
    ['Veri sayısı tek olduğunda medyan yarılara katılır mı?', 'Yönteme bağlıdır. "Medyan hariç" yönteminde katılmaz, "Medyan dahil" yönteminde her iki yarıya da katılır. Ders kitabınızın ya da öğretmeninizin hangi yöntemi kullandığını kontrol edin.'],
    ['Aykırı değer nasıl belirlenir?', 'En yaygın kural 1,5 × IQR kuralıdır: Q1 − 1,5 × IQR değerinden küçük ya da Q3 + 1,5 × IQR değerinden büyük veriler aykırı değer adayı sayılır. Araç bu sınırları ve dışında kalan verileri otomatik gösterir.'],
    ['Çeyrek sapma nedir?', 'Çeyrekler açıklığının yarısıdır: (Q3 − Q1) ÷ 2. Yarı çeyrekler açıklığı olarak da adlandırılır ve medyanın çevresindeki tipik yayılımı gösterir.'],
    ['IQR sıfır çıkabilir mi?', 'Evet. Verilerin en az yarısı aynı değerde toplanmışsa Q1 ile Q3 eşit olur ve IQR sıfır çıkar. Bu durumda 1,5 × IQR kuralı o değerden farklı her veriyi aykırı olarak işaretler; sonucu dikkatle yorumlamak gerekir.'],
    ['Verilerim kaydediliyor mu?', 'Hayır. Tüm işlem tarayıcınızda gerçekleşir; girdiğiniz sayılar sunucuya gönderilmez.'],
  ],
  related: ['yuzdelik-dilim-hesapla', 'medyan-hesapla', 'aciklik-hesapla', 'standart-sapma-hesapla', 'degisim-katsayisi-hesapla', 'ortalama-hesapla'],
};
