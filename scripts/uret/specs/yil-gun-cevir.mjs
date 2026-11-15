export default {
  slug: 'yil-gun-cevir',
  title: 'Yıl Gün Çevirici',
  h1Tail: 'yıl ↔ gün',
  pageTitle: "Yıl Gün Çevirici – Yılı Güne, Günü Yıla Çevirme",
  description: "Yılı güne, günü yıla çevirin. 365 günlük normal yıl, 366 günlük artık yıl, Gregoryen ortalaması ve Jülyen yılı seçenekleriyle hafta, saat ve dakika karşılığını görün.",
  card: "Yılı güne, günü yıla çevirin; normal, artık ve ortalama yıl seçenekleriyle hafta ve saat karşılığı da gelsin.",
  category: 'birim',
  keywords: ['yıl gün çevirme', '1 yıl kaç gün', 'gün yıl hesaplama', 'kaç gün kaç yıl eder', '1000 gün kaç yıl', 'bir yıl kaç saat', 'artık yıl kaç gün'],
  lead: "Yıl olarak verilen bir süreyi güne ya da gün sayısını yıla çevirin. Hesabın hangi yıl uzunluğuyla yapılacağını siz seçersiniz: <strong>365 günlük normal yıl</strong>, 366 günlük artık yıl, 365,2425 günlük Gregoryen ortalaması ya da 365,25 günlük Jülyen yılı.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 3' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['yil', 'Yıl → Gün'], ['gun', 'Gün → Yıl']] },
    { id: 'yilTipi', label: 'Yıl uzunluğu', type: 'select', options: [['normal', 'Normal yıl (365 gün)'], ['artik', 'Artık yıl (366 gün)'], ['gregoryen', 'Gregoryen ortalaması (365,2425 gün)'], ['julyen', 'Jülyen yılı (365,25 gün)']], hint: 'Uzun dönemlerde ortalama yıl, tek bir takvim yılı için 365 ya da 366 seçin.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const tablo = { normal: 365, artik: 366, gregoryen: 365.2425, julyen: 365.25 };
    const g = tablo[v.yilTipi] || 365;
    const gun = v.yon === 'gun' ? x : x * g;
    const yil = gun / g;
    const tam = Math.floor(yil + 1e-9);
    const kalan = Math.max(0, gun - tam * g);
    const rows = v.yon === 'gun'
      ? [['Yıl', h.fmt(yil, 4) + ' yıl'], ['Yıl ve gün', `${h.fmt(tam, 0)} yıl ${h.fmt(kalan, 2)} gün`], ['Gün', h.fmt(gun, 4) + ' gün']]
      : [['Gün', h.fmt(gun, 4) + ' gün'], ['Yıl', h.fmt(yil, 4) + ' yıl']];
    rows.push(['Hafta', h.fmt(gun / 7, 2) + ' hafta']);
    rows.push(['Saat', h.fmt(gun * 24, 2) + ' saat']);
    rows.push(['Dakika', h.fmt(gun * 1440, 0) + ' dakika']);
    return { rows, note: `Hesapta 1 yıl = ${h.fmt(g, 4)} gün alındı. Belirli iki tarih arasındaki gerçek gün sayısı, aradaki artık yıllara göre değişir.` };
  },
  cases: [
    { in: { deger: '1', yon: 'yil', yilTipi: 'normal' }, out: { 'Gün': '365 gün', 'Hafta': '52,14 hafta', 'Saat': '8.760 saat', 'Dakika': '525.600 dakika' } },
    { in: { deger: '1000', yon: 'gun', yilTipi: 'normal' }, out: { 'Yıl': '2,7397 yıl', 'Yıl ve gün': '2 yıl 270 gün' } },
    { in: { deger: '1', yon: 'yil', yilTipi: 'gregoryen' }, out: { 'Gün': '365,2425 gün', 'Saat': '8.765,82 saat' } },
    { in: { deger: '4', yon: 'yil', yilTipi: 'julyen' }, out: { 'Gün': '1.461 gün' } },
    { in: { deger: '730', yon: 'gun', yilTipi: 'normal' }, out: { 'Yıl': '2 yıl', 'Yıl ve gün': '2 yıl 0 gün' } },
    { in: { deger: '1', yon: 'yil', yilTipi: 'artik' }, out: { 'Gün': '366 gün', 'Saat': '8.784 saat' } },
    { in: { deger: '10', yon: 'yil', yilTipi: 'gregoryen' }, out: { 'Gün': '3.652,425 gün' } },
    { in: { deger: 'abc', yon: 'yil', yilTipi: 'normal' }, error: true },
    { in: { deger: '-3', yon: 'gun', yilTipi: 'normal' }, error: true },
  ],
  howto: [
    "'Değer' alanına çevirmek istediğiniz yıl ya da gün sayısını yazın. Ondalıklı değer girebilirsiniz; örneğin bir buçuk yıl için 1,5 yazın.",
    "'Çeviri yönü' listesinden yıldan güne mi, günden yıla mı çevireceğinizi seçin.",
    "'Yıl uzunluğu' listesinden hesabın dayanacağı yıl tanımını belirleyin. Emin değilseniz gündelik işler için 365 günlük normal yılı kullanın.",
    "'Çevir' düğmesine basın. Sonuçta gün ya da yıl değerinin yanında hafta, saat ve dakika karşılıkları da listelenir.",
    "Günden yıla çeviride 'Yıl ve gün' satırına bakın; ondalıklı yıl yerine tam yıl ve artan gün olarak okunur.",
  ],
  sections: [
    { h: 'Bir yıl kaç gündür sorusunun neden tek cevabı yok?', p: [
      "Gündelik konuşmada bir yıl 365 gün kabul edilir, ama takvimde her yıl aynı uzunlukta değildir. Dünya'nın Güneş çevresindeki bir turu yaklaşık 365,2422 gün sürer. Bu küsuratı takvime yedirmek için bazı yıllara bir gün eklenir ve o yıllar 366 gün olur. Dolayısıyla tek bir takvim yılı 365 ya da 366 gün, uzun dönemlerin ortalaması ise ikisinin arasında bir değerdir.",
      "Bu araç dört ayrı tanım sunar. <strong>Normal yıl</strong> 365 gün, <strong>artık yıl</strong> 366 gündür. <strong>Gregoryen ortalaması</strong> bugün kullandığımız miladi takvimin 400 yıllık döngüsünün ortalamasıdır ve 365,2425 gün eder. <strong>Jülyen yılı</strong> ise tam 365,25 gündür; astronomide ve ışık yılı tanımında bu değer kullanılır.",
    ] },
    { h: 'Çeviri formülü ve çözümlü örnekler', p: [
      "Yıldan güne geçmek için yıl sayısını seçtiğiniz yıl uzunluğuyla çarparsınız: <strong>gün = yıl × yıl uzunluğu</strong>. Günden yıla geçmek için bölersiniz: <strong>yıl = gün ÷ yıl uzunluğu</strong>.",
      "Örnek 1: 1 normal yıl 365 gündür. Bu da 365 ÷ 7 = 52,14 hafta, 365 × 24 = 8.760 saat ve 525.600 dakika eder. Bir yılın tam 52 hafta olmadığına dikkat edin; 52 hafta 364 gündür ve geriye bir gün artar.",
      "Örnek 2: 1000 gün kaç yıl eder? 1000 ÷ 365 = 2,7397 yıl. Tam yıl ve gün olarak yazarsak 2 yıl 730 gün tuttuğu için geriye 270 gün kalır; sonuç 2 yıl 270 gündür.",
      "Örnek 3: 10 yıllık bir süreyi Gregoryen ortalamasıyla hesaplarsak 10 × 365,2425 = 3.652,425 gün buluruz. Aynı süre 365 günle hesaplandığında 3.650 gün çıkar; aradaki yaklaşık iki buçuk günlük fark, on yıla düşen artık günlerden gelir.",
    ] },
    { h: 'Artık yıl kuralı', p: [
      "Miladi takvimde bir yılın artık yıl olup olmadığı üç adımlı bir kuralla belirlenir. Şubat ayı artık yıllarda 29, diğer yıllarda 28 gün çeker.",
    ], ul: [
      "Yıl 4'e tam bölünüyorsa artık yıldır (2024, 2028 gibi).",
      "Ancak 100'e tam bölünen yıllar artık yıl değildir (1900, 2100 gibi).",
      "Bunun da istisnası vardır: 400'e tam bölünen yıllar yine artık yıldır (2000, 2400 gibi).",
    ] },
    { h: 'Hangi yıl uzunluğunu seçmeliyim?', p: [
      "Seçim, sonucu nerede kullanacağınıza bağlıdır. Yanlış tanım küçük sürelerde fark yaratmaz, ama onlarca yıllık hesaplarda günler birikir.",
    ], ul: [
      "<strong>Normal yıl (365):</strong> kaba tahminler, sözleşmelerde 'yıl 365 gün sayılır' denen durumlar, günlük hayat hesapları.",
      "<strong>Artık yıl (366):</strong> içinde 29 Şubat bulunan tek bir takvim yılının gün, saat ya da dakika karşılığı.",
      "<strong>Gregoryen ortalaması (365,2425):</strong> yaş, kıdem, proje süresi gibi birden çok yıla yayılan dönemlerin ortalama gün sayısı.",
      "<strong>Jülyen yılı (365,25):</strong> astronomi, fizik ve dört yılda bir artık yıl varsayan basit hesaplar. Dört Jülyen yılı tam 1.461 gündür.",
    ] },
    { h: 'Türkiye\'den kullanım senaryoları', p: [
      "Gün ve yıl arasında gidip gelmek pek çok işte gerekir. Çalışma hayatında kıdem ya da prim günü olarak verilen bir sayıyı kabaca yıla çevirmek, askerlik ya da gurbette geçen süreyi gün olarak görmek, bir bebeğin ya da evcil hayvanın kaç günlük olduğunu yıla vurmak bunlardan bazılarıdır. Ürün garanti süreleri, abonelik dönemleri ve vadeli işlemler de çoğu zaman gün olarak tanımlanır.",
      "Resmî işlemlerde yılın kaç gün sayılacağı ilgili mevzuatta ya da sözleşmede ayrıca belirtilmiş olabilir; bazı hesaplarda yıl 360 gün, bazılarında 365 gün alınır. Hak kaybına yol açabilecek hesaplarda bu aracın sonucunu yalnızca fikir vermek için kullanın ve güncel mevzuatı ya da ilgili kurumu kontrol edin.",
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      "<strong>1 yıl</strong> = 365 gün = 8.760 saat = 525.600 dakika = 31.536.000 saniye",
      "<strong>1 artık yıl</strong> = 366 gün = 8.784 saat",
      "<strong>2 yıl</strong> = 730 gün",
      "<strong>5 yıl</strong> = 1.825 gün",
      "<strong>10 yıl</strong> = 3.650 gün (artık günler hariç)",
      "<strong>100 gün</strong> = 0,274 yıl, yaklaşık 3 ay 10 gün",
      "<strong>10.000 gün</strong> = 27,4 yıl",
    ] },
    { h: 'Sınırlar ve sık yapılan hatalar', p: [
      "Bu araç bir süre çeviricisidir; takvim üzerinde iki tarih arasını saymaz. 'Şu tarihten bu tarihe kaç gün var' sorusunun kesin cevabı, aradaki 29 Şubat sayısına bağlıdır ve tarih farkı hesabı gerektirir. Buradaki sonuç ise seçtiğiniz sabit yıl uzunluğuna göre bulunan ortalama bir değerdir.",
      "En sık yapılan hata, bir yılı 52 hafta kabul edip haftadan güne dönmektir; bu yol her yıl için bir ya da iki günü kaybettirir. İkinci yaygın hata, ondalıklı yılı ay gibi okumaktır: 2,5 yıl iki yıl beş ay değil, iki yıl altı aydır. Negatif değerler kabul edilmez.",
    ] },
  ],
  faq: [
    ['1 yıl kaç gündür?', "Normal bir takvim yılı 365, artık yıl 366 gündür. Miladi takvimin uzun dönem ortalaması 365,2425 gündür. Gündelik hesaplarda 365 kullanmak yeterlidir."],
    ['1000 gün kaç yıl eder?', "365 günlük yılla 1000 gün 2,7397 yıl, yani 2 yıl 270 gün eder. Ortalama yıl uzunluğuyla hesaplandığında sonuç çok az değişir ve yaklaşık 2,7379 yıl olur."],
    ['Bir yıl kaç saattir?', "365 günlük bir yıl 8.760 saattir. Artık yılda bu sayı 8.784 saate çıkar. Elektrik tüketimi ya da makine çalışma süresi gibi yıllık hesaplarda genellikle 8.760 saat kullanılır."],
    ['Bir yıl kaç haftadır?', "365 gün 52 hafta 1 gün eder; ondalıklı yazımla 52,14 haftadır. Artık yıl 52 hafta 2 gündür. Bu yüzden her yıl aynı tarih haftanın bir sonraki gününe kayar."],
    ['Hangi yıllar artık yıldır?', "4'e bölünen yıllar artık yıldır; 100'e bölünenler hariç tutulur, 400'e bölünenler yeniden dahil edilir. 2024 ve 2028 artık yıldır, 2100 değildir, 2000 ise artık yıldı."],
    ['Gregoryen ortalaması ile Jülyen yılı arasındaki fark nedir?', "Jülyen yılı her dört yılda bir artık yıl olduğunu varsayar ve 365,25 gündür. Gregoryen takvimi 400 yılda üç artık yılı atladığı için ortalaması 365,2425 gündür. Aradaki fark yılda yaklaşık 11 dakikadır."],
    ['Ondalıklı yıl girebilir miyim?', "Evet. 0,5 yıl yazdığınızda normal yıla göre 182,5 gün sonucunu alırsınız. Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz."],
    ['Girdiğim sayılar kaydediliyor mu?', "Hayır. Hesap yalnızca tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra bağlantı olmadan da çalışır."],
  ],
  related: ['ay-gun-cevir', 'hafta-gun-cevir', 'gun-saat-cevir', 'saat-dakika-cevir', 'saniye-dakika-cevir'],
};
