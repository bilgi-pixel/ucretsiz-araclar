export default {
  slug: 'standart-sapma-hesapla',
  title: 'Standart Sapma Hesaplama',
  h1Tail: 'örneklem ve anakütle',
  pageTitle: 'Standart Sapma Hesaplama – Örneklem (n−1) ve Anakütle (n) Formülü',
  description: 'Sayı dizinizin standart sapmasını örneklem (n−1) ya da anakütle (n) formülüyle hesaplayın. Ortalama, varyans, sapma kareleri toplamı ve değişim katsayısı da gösterilir.',
  card: 'Verilerinizin standart sapmasını örneklem ya da anakütle formülüyle bulun; ortalama, varyans ve değişim katsayısıyla birlikte.',
  category: 'matematik',
  keywords: ['standart sapma hesaplama', 'standart sapma formülü', 'standart sapma nasıl hesaplanır', 'örneklem standart sapması', 'anakütle standart sapması', 'n-1 standart sapma', 'sigma hesaplama'],
  lead: 'Verilerinizi yazın ve hesap türünü seçin; araç <strong>standart sapmayı</strong>, yani değerlerin ortalamadan tipik olarak ne kadar uzaklaştığını hesaplar. Örneklem (n−1) ve anakütle (n) formüllerinin ikisi de desteklenir.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 2 4 4 4 5 5 7 9', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın.', wide: true },
    { id: 'tur', label: 'Hesap türü', type: 'select', options: [['orneklem', 'Örneklem (n − 1\'e böl)'], ['anakutle', 'Anakütle (n\'ye böl)']] },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem standart sapması için en az iki sayı gerekir. Tek değeriniz varsa "Anakütle" türünü seçin ya da veri ekleyin.');
    const toplam = a.reduce((s, x) => s + x, 0);
    const ort = toplam / n;
    const kt = a.reduce((s, x) => s + (x - ort) * (x - ort), 0);
    const bolen = orneklem ? n - 1 : n;
    const varyans = kt / bolen;
    const ss = Math.sqrt(varyans);
    const rows = [
      [orneklem ? 'Standart sapma (s)' : 'Standart sapma (σ)', h.fmt(ss, 4)],
      ['Varyans', h.fmt(varyans, 4)],
      ['Aritmetik ortalama', h.fmt(ort, 4)],
      ['Sapma kareleri toplamı', h.fmt(kt, 4)],
      ['Veri sayısı (n)', String(n)],
      ['Bölen', orneklem ? `n − 1 = ${bolen}` : `n = ${bolen}`],
      ['Ortalama ± 1 standart sapma', `${h.fmt(ort - ss, 4)} ile ${h.fmt(ort + ss, 4)} arası`],
    ];
    if (Math.abs(ort) > 1e-12) rows.push(['Değişim katsayısı', '% ' + h.fmt((ss / Math.abs(ort)) * 100, 2)]);
    return {
      rows,
      note: orneklem
        ? 'Örneklem formülü kullanıldı: sapma kareleri toplamı n − 1\'e bölündü.'
        : 'Anakütle formülü kullanıldı: sapma kareleri toplamı n\'ye bölündü.',
    };
  },
  cases: [
    { in: { sayilar: '2 4 4 4 5 5 7 9', tur: 'anakutle' }, out: { 'Standart sapma (σ)': '2', 'Varyans': '4', 'Aritmetik ortalama': '5', 'Sapma kareleri toplamı': '32', 'Bölen': 'n = 8', 'Değişim katsayısı': '% 40' } },
    { in: { sayilar: '2 4 4 4 5 5 7 9', tur: 'orneklem' }, out: { 'Standart sapma (s)': '2,1381', 'Varyans': '4,5714', 'Bölen': 'n − 1 = 7' } },
    { in: { sayilar: '1 2 3 4 5', tur: 'orneklem' }, out: { 'Standart sapma (s)': '1,5811', 'Varyans': '2,5', 'Aritmetik ortalama': '3' } },
    { in: { sayilar: '1 2 3 4 5', tur: 'anakutle' }, out: { 'Standart sapma (σ)': '1,4142', 'Varyans': '2' } },
    { in: { sayilar: '600 470 170 430 300', tur: 'anakutle' }, out: { 'Standart sapma (σ)': '147,3228', 'Varyans': '21.704', 'Aritmetik ortalama': '394' } },
    { in: { sayilar: '600 470 170 430 300', tur: 'orneklem' }, out: { 'Standart sapma (s)': '164,7119', 'Varyans': '27.130' } },
    { in: { sayilar: '10 10 10', tur: 'orneklem' }, out: { 'Standart sapma (s)': '0', 'Varyans': '0' } },
    { in: { sayilar: '70 80 90', tur: 'orneklem' }, out: { 'Standart sapma (s)': '10', 'Ortalama ± 1 standart sapma': '70 ile 90 arası', 'Değişim katsayısı': '% 12,5' } },
    { in: { sayilar: '5', tur: 'orneklem' }, error: true },
    { in: { sayilar: '2 4 dört', tur: 'anakutle' }, error: true },
  ],
  howto: [
    'Verilerinizi "Sayılar" kutusuna yazın ya da bir tablodan kopyalayıp yapıştırın; sıralı olmaları gerekmez.',
    '"Hesap türü" listesinden formülü seçin. Verileriniz daha büyük bir gruptan alınmış bir örnekse "Örneklem", ilgilendiğiniz grubun tamamıysa "Anakütle" seçeneğini kullanın.',
    '"Hesapla" düğmesine basın. İlk satır standart sapmayı; alt satırlar varyansı, ortalamayı, sapma kareleri toplamını ve kullanılan böleni gösterir.',
    'Elle çözdüğünüz bir soruyu kontrol ediyorsanız ara değerleri karşılaştırın: önce ortalama, sonra sapma kareleri toplamı, en son bölen.',
  ],
  sections: [
    { h: 'Standart sapma ne anlatır?', p: [
      'Standart sapma, bir veri grubundaki değerlerin aritmetik ortalamanın çevresinde ne kadar dağıldığını tek bir sayıyla özetler. Küçük bir standart sapma değerlerin ortalamaya yakın toplandığını, büyük bir standart sapma ise geniş bir alana yayıldığını gösterir. Bütün değerler aynıysa yayılma yoktur ve standart sapma sıfır çıkar.',
      'Ortalama tek başına yanıltıcı olabilir. İki şubenin not ortalaması da 70 olsun; birinde bütün öğrenciler 65 ile 75 arasında, diğerinde 30 ile 100 arasında not almış olabilir. Ortalamalar eşittir ama sınıflar birbirine hiç benzemez. Bu farkı görünür kılan ölçü standart sapmadır. Üstelik verinin kendisiyle aynı birimi taşır: notlar puan cinsindense standart sapma da puandır, boylar santimetre cinsindense santimetredir.',
    ] },
    { h: 'Formül ve hesap adımları', p: [
      'Anakütle standart sapması <strong>σ = √( Σ(x − μ)² ÷ n )</strong>, örneklem standart sapması <strong>s = √( Σ(x − x̄)² ÷ (n − 1) )</strong> formülüyle bulunur. İki formül yalnızca bölende ayrılır.',
    ], ol: [
      'Değerleri toplayıp veri sayısına bölerek aritmetik ortalamayı bulun.',
      'Her değerden ortalamayı çıkarın; bu farklara sapma denir.',
      'Her sapmanın karesini alın. Kare alma, eksi ve artı sapmaların birbirini götürmesini önler.',
      'Kareleri toplayın; sonuç sapma kareleri toplamıdır.',
      'Toplamı anakütle için n\'ye, örneklem için n − 1\'e bölün; bu değer varyanstır.',
      'Varyansın karekökünü alın; sonuç standart sapmadır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Sekiz değerlik şu diziyi ele alalım: 2, 4, 4, 4, 5, 5, 7, 9. Toplam 40, ortalama 40 ÷ 8 = 5\'tir. Sapmalar sırasıyla −3, −1, −1, −1, 0, 0, 2 ve 4; kareleri 9, 1, 1, 1, 0, 0, 4 ve 16 olur. Karelerin toplamı <strong>32</strong>\'dir.',
      'Bu sekiz değer ilgilendiğimiz grubun tamamıysa 32 ÷ 8 = 4 varyansı elde edilir ve standart sapma √4 = <strong>2</strong> çıkar. Aynı sekiz değer daha büyük bir gruptan alınmış bir örnekse 32 ÷ 7 ≈ 4,5714 bulunur ve standart sapma √4,5714 ≈ <strong>2,1381</strong> olur. Diziyi araca yazıp iki türü sırayla seçerek aynı sonuçları görebilirsiniz.',
    ] },
    { h: 'Örneklem mi, anakütle mi?', p: [
      'Elinizdeki veriler hakkında konuştuğunuz grubun tamamını kapsıyorsa anakütle formülü kullanılır. Otuz kişilik bir sınıfın hepsinin sınav notu varsa ve yalnızca o sınıfı betimliyorsanız n\'ye bölersiniz.',
      'Veriler daha büyük bir gruptan seçilmiş bir parçaysa ve o büyük grup hakkında fikir yürütmek istiyorsanız örneklem formülü gerekir. Bir fabrikada günde binlerce parça üretilirken yirmi tanesini ölçtüyseniz, anket için şehirdeki herkes yerine beş yüz kişiyle görüştüyseniz n − 1\'e bölersiniz. Bunun nedeni, örneğin kendi ortalamasına göre hesaplanan sapmaların gerçek anakütle ortalamasına göre olanlardan sistematik biçimde küçük kalmasıdır; n − 1\'e bölmek bu eksik tahmini düzeltir ve Bessel düzeltmesi olarak bilinir. Veri sayısı büyüdükçe iki sonuç birbirine yaklaşır. Hangi formülün istendiği belirtilmemişse laboratuvar raporlarında ve araştırma verilerinde çoğunlukla örneklem formülü beklenir.',
    ] },
    { h: 'Sonucu yorumlama', p: [
      'Veriler çan eğrisi biçiminde, yani normal dağılıma yakın dağılıyorsa değerlerin yaklaşık yüzde 68\'i ortalamanın bir standart sapma, yüzde 95\'i iki standart sapma, yüzde 99,7\'si üç standart sapma çevresinde yer alır. Araç "Ortalama ± 1 standart sapma" satırında bu ilk aralığı verir. Notları 70, 80 ve 90 olan üç öğrenci için ortalama 80, örneklem standart sapması 10 ve aralık 70 ile 90 arasıdır. Bu oranlar çarpık ya da çok tepeli dağılımlarda geçerli değildir.',
      'Farklı birimlerdeki ya da farklı büyüklükteki verilerin yayılımını karşılaştırmak için standart sapmayı ortalamaya bölen <strong>değişim katsayısı</strong> kullanılır. Yukarıdaki sekiz değerlik dizide anakütle standart sapması 2, ortalama 5 olduğundan değişim katsayısı yüzde 40\'tır. Ortalama sıfırsa bu oran tanımsız olduğundan satır gösterilmez.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Sapmaların karesini almadan toplamak: sapmaların toplamı her zaman sıfırdır, bu yüzden kare alınır.',
      'Karekök almayı unutmak: karekök alınmamış değer varyanstır ve birimi verinin biriminin karesidir.',
      'Hesap makinesindeki iki tuşu karıştırmak: çoğu makinede biri n\'ye, diğeri n − 1\'e böler.',
      'Tek bir değerle örneklem standart sapması aramak: bölen sıfır olacağından hesaplanamaz ve araç hata verir.',
      'Binlik ayırıcı kullanmak: <code>1.250</code> yazımı 1,25 olarak okunur; büyük sayıları bitişik yazın.',
    ], p: [
      'Standart sapma uç değerlere duyarlıdır; tek bir aşırı gözlem sonucu belirgin biçimde büyütür. Sonuçlar dört ondalık basamağa yuvarlanarak gösterilir. Bu sayfa öğrenme ve hızlı kontrol amaçlıdır; araştırma, kalite kontrol ya da finansal risk kararlarında yöntemin uygunluğunu bir uzmanla değerlendirin.',
    ] },
  ],
  faq: [
    ['Standart sapma ile varyans arasındaki fark nedir?', 'Varyans, sapma karelerinin ortalamasıdır; standart sapma ise varyansın kareköküdür. Varyansın birimi verinin biriminin karesiyken standart sapma veriyle aynı birimdedir, bu yüzden yorumlaması daha kolaydır.'],
    ['Neden n − 1\'e bölünür?', 'Örneklemin kendi ortalamasına göre ölçülen sapmalar, anakütlenin gerçek ortalamasına göre olanlardan ortalamada daha küçük çıkar. n yerine n − 1\'e bölmek bu eksik tahmini giderir. Bu düzeltmeye Bessel düzeltmesi denir.'],
    ['Standart sapma negatif olabilir mi?', 'Hayır. Karelerin toplamı negatif olamayacağından varyans ve onun karekökü olan standart sapma sıfır ya da pozitiftir. Sıfır sonucu bütün değerlerin eşit olduğu anlamına gelir.'],
    ['Standart sapmanın büyük ya da küçük olduğuna nasıl karar verilir?', 'Tek başına bir eşik yoktur; sonuç ortalamaya ve bağlama göre değerlendirilir. Değişim katsayısı, yani standart sapmanın ortalamaya oranı bu karşılaştırmayı kolaylaştırır.'],
    ['Hesap tablosu programlarındaki işlevlerle sonuç uyuşur mu?', 'Evet. Hesap tablolarında örneklem ve anakütle için ayrı işlevler bulunur. Bu sayfada "Örneklem" seçeneği n − 1\'e, "Anakütle" seçeneği n\'ye bölen işlevle aynı sonucu verir.'],
    ['Bütün değerlere aynı sayıyı eklersem standart sapma değişir mi?', 'Değişmez. Bütün değerler aynı miktarda kaydığında ortalama da o kadar kayar ve sapmalar aynı kalır. Bütün değerleri bir sayıyla çarparsanız standart sapma o sayının mutlak değeriyle çarpılır.'],
    ['Standart hata ile standart sapma aynı mıdır?', 'Hayır. Standart sapma tek tek değerlerin yayılımını ölçer. Standart hata ise örneklem ortalamasının ne kadar güvenilir olduğunu gösterir ve standart sapmanın veri sayısının kareköküne bölünmesiyle bulunur.'],
    ['Girdiğim veriler bir yere gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; sayılarınız sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['varyans-hesapla', 'ortalama-hesapla', 'istatistik-hesapla', 'z-skoru-hesapla', 'degisim-katsayisi-hesapla', 'medyan-hesapla'],
};
