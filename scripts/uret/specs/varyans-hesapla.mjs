export default {
  slug: 'varyans-hesapla',
  title: 'Varyans Hesaplama',
  h1Tail: 'adım adım sapma tablosuyla',
  pageTitle: 'Varyans Hesaplama – Örneklem ve Anakütle Varyansı, Sapma Tablosu',
  description: 'Sayı dizinizin varyansını örneklem (n−1) ya da anakütle (n) formülüyle hesaplayın. Her değerin sapmasını ve sapma karesini gösteren adım adım tabloyla birlikte.',
  card: 'Verilerinizin varyansını örneklem ya da anakütle formülüyle bulun; her değerin sapması ve karesi adım adım tabloda.',
  category: 'matematik',
  keywords: ['varyans hesaplama', 'varyans formülü', 'varyans nasıl hesaplanır', 'örneklem varyansı', 'anakütle varyansı', 'sapma kareleri toplamı', 'varyans nedir'],
  lead: 'Verilerinizi yazın; araç <strong>varyansı</strong>, yani değerlerin ortalamadan uzaklıklarının karelerinin ortalamasını hesaplar. Sonucun altında her değerin sapmasını ve sapma karesini gösteren tablo yer alır, böylece hesabı satır satır izleyebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 6 8 10 12 14', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Ondalık için virgül kullanın.', wide: true },
    { id: 'tur', label: 'Varyans türü', type: 'select', options: [['orneklem', 'Örneklem varyansı (n − 1)'], ['anakutle', 'Anakütle varyansı (n)']] },
  ],
  compute(v, h) {
    const a = h.nums(v.sayilar, 'Sayılar');
    const n = a.length;
    const orneklem = v.tur !== 'anakutle';
    if (orneklem && n < 2) h.err('Örneklem varyansı için en az iki sayı gerekir. Veri ekleyin ya da "Anakütle varyansı" türünü seçin.');
    const toplam = a.reduce((s, x) => s + x, 0);
    const ort = toplam / n;
    const kareToplam = a.reduce((s, x) => s + x * x, 0);
    const kt = a.reduce((s, x) => s + (x - ort) * (x - ort), 0);
    const bolen = orneklem ? n - 1 : n;
    const varyans = kt / bolen;
    const satirlar = a.slice(0, 100).map((x) => `${h.fmt(x, 4)}\t${h.fmt(x - ort, 4)}\t${h.fmt((x - ort) * (x - ort), 4)}`);
    return {
      rows: [
        [orneklem ? 'Varyans (s²)' : 'Varyans (σ²)', h.fmt(varyans, 4)],
        ['Standart sapma', h.fmt(Math.sqrt(varyans), 4)],
        ['Aritmetik ortalama', h.fmt(ort, 4)],
        ['Sapma kareleri toplamı', h.fmt(kt, 4)],
        ['Değerlerin kareleri toplamı (Σx²)', h.fmt(kareToplam, 4)],
        ['Veri sayısı (n)', String(n)],
        ['Bölen', orneklem ? `n − 1 = ${bolen}` : `n = ${bolen}`],
      ],
      text: 'Değer\tSapma\tSapma karesi\n' + satirlar.join('\n') + (n > 100 ? '\n…' : '') + `\nToplam\t0\t${h.fmt(kt, 4)}`,
      note: 'Varyansın birimi, verinin biriminin karesidir. Veriyle aynı birimde bir yayılım ölçüsü için standart sapma satırına bakın.',
    };
  },
  cases: [
    { in: { sayilar: '6 8 10 12 14', tur: 'orneklem' }, out: { 'Varyans (s²)': '10', 'Standart sapma': '3,1623', 'Aritmetik ortalama': '10', 'Sapma kareleri toplamı': '40', 'Değerlerin kareleri toplamı (Σx²)': '540', 'Bölen': 'n − 1 = 4' }, text: 'Değer\tSapma\tSapma karesi\n6\t-4\t16\n8\t-2\t4\n10\t0\t0\n12\t2\t4\n14\t4\t16\nToplam\t0\t40' },
    { in: { sayilar: '6 8 10 12 14', tur: 'anakutle' }, out: { 'Varyans (σ²)': '8', 'Standart sapma': '2,8284', 'Bölen': 'n = 5' } },
    { in: { sayilar: '2 4 4 4 5 5 7 9', tur: 'anakutle' }, out: { 'Varyans (σ²)': '4', 'Standart sapma': '2', 'Sapma kareleri toplamı': '32' } },
    { in: { sayilar: '1 2 3 4 5', tur: 'orneklem' }, out: { 'Varyans (s²)': '2,5' } },
    { in: { sayilar: '4 10 16', tur: 'orneklem' }, out: { 'Varyans (s²)': '36', 'Standart sapma': '6' } },
    { in: { sayilar: '9 10 11', tur: 'anakutle' }, out: { 'Varyans (σ²)': '0,6667', 'Aritmetik ortalama': '10' } },
    { in: { sayilar: '1,5 2,5', tur: 'orneklem' }, out: { 'Varyans (s²)': '0,5', 'Aritmetik ortalama': '2' } },
    { in: { sayilar: '3 3 3', tur: 'anakutle' }, out: { 'Varyans (σ²)': '0', 'Standart sapma': '0' } },
    { in: { sayilar: '7', tur: 'orneklem' }, error: true },
    { in: { sayilar: '', tur: 'anakutle' }, error: true },
  ],
  howto: [
    'Verilerinizi "Sayılar" kutusuna aralarında boşluk bırakarak yazın; alt alta yazılmış bir sütunu da yapıştırabilirsiniz.',
    '"Varyans türü" listesinden örneklem ya da anakütle varyansını seçin. Emin değilseniz aşağıdaki "Hangi bölen?" bölümüne göz atın.',
    '"Hesapla" düğmesine basın. İlk satırda varyansı, altında standart sapmayı, ortalamayı ve ara toplamları görürsünüz.',
    'Sonucun altındaki tabloda her değerin ortalamadan sapmasını ve bu sapmanın karesini inceleyin; elle çözdüğünüz sorudaki hatalı satırı bu tabloyla bulabilirsiniz.',
  ],
  sections: [
    { h: 'Varyans nedir?', p: [
      'Varyans, bir veri grubundaki değerlerin aritmetik ortalamadan ne kadar uzaklaştığını ölçen bir yayılım ölçüsüdür. Tanımı gereği her değerin ortalamadan farkının karesi alınır ve bu karelerin ortalaması hesaplanır. Değerler birbirine ne kadar yakınsa varyans o kadar küçük, ne kadar dağınıksa o kadar büyük çıkar. Bütün değerler eşit olduğunda varyans sıfırdır ve hiçbir zaman negatif olamaz.',
      'Farkların karesinin alınmasının iki nedeni vardır. Birincisi, ortalamanın altındaki ve üstündeki sapmalar ters işaretlidir ve doğrudan toplandıklarında her zaman sıfır verirler; kare almak işareti ortadan kaldırır. İkincisi, kare alma büyük sapmaları küçüklere göre daha ağır cezalandırır: ortalamadan 4 birim uzaktaki bir değer, 2 birim uzaktakinin iki katı değil dört katı katkı yapar.',
    ] },
    { h: 'Varyans formülü', p: [
      'Anakütle varyansı <strong>σ² = Σ(x − μ)² ÷ n</strong>, örneklem varyansı <strong>s² = Σ(x − x̄)² ÷ (n − 1)</strong> ile hesaplanır. Paydaki ifade sapma kareleri toplamıdır ve iki formülde de aynıdır; fark yalnızca bölendedir.',
      'Elle hesapta işi kısaltan eşdeğer bir yol daha vardır: sapma kareleri toplamı, <strong>Σx² − n·x̄²</strong> ifadesine eşittir. Yani değerlerin karelerini toplayıp bundan veri sayısı ile ortalamanın karesinin çarpımını çıkarırsanız aynı sonuca ulaşırsınız. Araç bu kontrolü yapabilmeniz için değerlerin kareleri toplamını ayrı bir satırda verir.',
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      'Bir büfenin beş günlük simit satışı 6, 8, 10, 12 ve 14 düzine olsun. Toplam 50, ortalama 50 ÷ 5 = 10\'dur. Sapmalar −4, −2, 0, 2 ve 4; kareleri 16, 4, 0, 4 ve 16\'dır. Sapma kareleri toplamı <strong>40</strong> eder.',
      'Bu beş gün yalnızca bir örnekse 40 ÷ 4 = <strong>10</strong> örneklem varyansı bulunur. İlgilendiğimiz dönem yalnızca bu beş günse 40 ÷ 5 = <strong>8</strong> anakütle varyansı elde edilir. Kısa yolla sağlama yapalım: karelerin toplamı 36 + 64 + 100 + 144 + 196 = 540, veri sayısı ile ortalamanın karesinin çarpımı 5 × 100 = 500, fark yine 40\'tır. Aynı diziyi araca yazdığınızda bu sayıların tamamını ve sapma tablosunu görürsünüz.',
    ] },
    { h: 'Hangi bölen: n mi, n − 1 mi?', p: [
      'Veriniz hakkında konuştuğunuz grubun tamamıysa n\'ye bölün. Bir takımın on bir oyuncusunun boyları ya da bir sınıftaki herkesin notu böyledir. Veriniz daha geniş bir grubun küçük bir parçasıysa ve o geniş grubun yayılımını tahmin etmek istiyorsanız n − 1\'e bölün.',
      'n − 1\'e bölmenin gerekçesi serbestlik derecesi kavramıdır. Sapmaların toplamı her zaman sıfır olduğundan, n sapmadan n − 1 tanesini bildiğinizde sonuncusu zaten bellidir; yani serbestçe değişebilen yalnızca n − 1 bilgi vardır. Örneklem ortalaması veriye en yakın nokta olduğu için ona göre ölçülen sapmalar olması gerekenden küçük kalır ve n − 1\'e bölmek bu eğilimi dengeler. Veri sayısı arttıkça iki sonuç arasındaki fark önemsizleşir.',
    ] },
    { h: 'Varyansın birimi ve standart sapmayla ilişkisi', p: [
      'Kare alma işlemi nedeniyle varyansın birimi verinin biriminin karesidir. Boylar santimetre ile ölçüldüyse varyans santimetrekare, gelirler lira ile ölçüldüyse "lira kare" cinsindendir. Bu birimler gündelik anlam taşımadığından sonuç yorumlanırken çoğunlukla varyansın karekökü olan standart sapma kullanılır.',
      'Varyansın üstünlüğü ise toplanabilir olmasıdır. Birbirinden bağımsız iki büyüklüğün toplamının varyansı, varyanslarının toplamına eşittir; standart sapmalar ise bu şekilde toplanamaz. Varyans analizi, regresyon, ölçüm belirsizliklerinin birleştirilmesi ve portföy riski hesapları bu özelliğe dayanır.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Kalite kontrol:</strong> Aynı makineden çıkan parçaların ölçülerindeki dalgalanmayı izlemek; varyansın artması ayarın bozulduğuna işaret eder.',
      '<strong>Eğitim:</strong> İki sınavın ya da iki şubenin not dağılımlarının ne kadar homojen olduğunu karşılaştırmak.',
      '<strong>Finans:</strong> Getirilerin oynaklığını ölçmek. Getirileri 9, 10 ve 11 olan bir yatırımın örneklem varyansı 1 iken 4, 10 ve 16 olanınki 36\'dır; ortalamalar aynı olsa da ikincisi çok daha değişkendir.',
      '<strong>Tarım ve deney tasarımı:</strong> Parseller ya da deney grupları arasındaki farkın tesadüf olup olmadığını varyans analiziyle sınamak.',
    ], p: [
      'Bu sayfa öğrenme ve hızlı kontrol amaçlıdır. Yatırım, üretim ya da araştırma kararlarında yalnızca bu sonuca dayanmayın; yöntemin verinize uygunluğunu bir uzmanla değerlendirin.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Sapmaların karesini almak yerine mutlak değerini toplamak farklı bir ölçü olan ortalama mutlak sapmayı verir. Değerlerin karelerinin ortalamasını varyans sanmak da yaygın bir hatadır; ortalamanın karesi çıkarılmadıkça sonuç doğru olmaz. Varyans uç değerlere karşı çok duyarlıdır: tek bir aşırı gözlem, karesi alındığı için sonucu katlayarak büyütür.',
      'Sayılar dört ondalık basamağa yuvarlanarak gösterilir ve sapma tablosunda en fazla ilk yüz değer listelenir; hesap ise bütün veriyle yapılır. Binlik ayırıcı kullanmayın: <code>2.500</code> yazımı 2,5 olarak okunur.',
    ] },
  ],
  faq: [
    ['Varyans ile standart sapma arasındaki ilişki nedir?', 'Standart sapma varyansın kareköküdür; varyans da standart sapmanın karesidir. İkisi aynı bilgiyi taşır, ancak standart sapma veriyle aynı birimde olduğu için yorumlaması daha kolaydır.'],
    ['Varyans negatif çıkabilir mi?', 'Hayır. Varyans karelerin toplamından elde edildiği için en az sıfırdır. Elle hesapta negatif bir sonuç bulduysanız kısa yol formülünde çıkarma sırasını ya da yuvarlamayı kontrol edin.'],
    ['Varyansın sıfır olması ne anlama gelir?', 'Bütün değerlerin birbirine eşit olduğunu gösterir. Hiçbir değer ortalamadan ayrılmadığı için sapmaların tamamı sıfırdır.'],
    ['Örneklem varyansı neden anakütle varyansından büyük çıkar?', 'Aynı sapma kareleri toplamı daha küçük bir sayıya, n yerine n − 1\'e bölündüğü için. Fark küçük veri gruplarında belirgindir, veri sayısı büyüdükçe azalır.'],
    ['Bütün değerleri iki katına çıkarırsam varyans ne olur?', 'Dört katına çıkar. Değerler bir sayıyla çarpıldığında varyans o sayının karesiyle çarpılır. Bütün değerlere aynı sayı eklendiğinde ise varyans değişmez.'],
    ['Sapmaların toplamı neden hep sıfır çıkıyor?', 'Aritmetik ortalama, değerlerin denge noktasıdır; altındaki sapmaların toplamı üstündekilerin toplamına eşittir. Tablonun "Toplam" satırındaki sıfır bu özelliği gösterir ve hesabınız için iyi bir sağlamadır.'],
    ['Gruplandırılmış veride varyans hesaplanabilir mi?', 'Bu araç tek tek yazılmış ham veriler içindir. Sıklık tablonuz varsa her değeri sıklığı kadar tekrar yazarak aynı sonucu elde edebilirsiniz.'],
    ['Verilerim sunucuya gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız sayılar hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['standart-sapma-hesapla', 'ortalama-hesapla', 'istatistik-hesapla', 'degisim-katsayisi-hesapla', 'aciklik-hesapla', 'z-skoru-hesapla'],
};
