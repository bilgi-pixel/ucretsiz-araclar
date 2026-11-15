export default {
  slug: 'korelasyon-hesapla',
  title: 'Korelasyon Katsayısı Hesaplama',
  h1Tail: 'Pearson r',
  pageTitle: 'Korelasyon Katsayısı Hesaplama – Pearson r, r² ve Kovaryans',
  description: 'İki değişken arasındaki Pearson korelasyon katsayısını (r) hesaplayın. X ve Y değerlerini girin; r, r², kovaryans ve ilişkinin yönü ile gücü gösterilir.',
  card: 'X ve Y verilerinden Pearson korelasyon katsayısını bulun; r², kovaryans ve ilişkinin yönü ile gücüne dair yorumla birlikte.',
  category: 'matematik',
  keywords: ['korelasyon hesaplama', 'korelasyon katsayısı hesaplama', 'pearson korelasyon', 'korelasyon formülü', 'r değeri hesaplama', 'kovaryans hesaplama', 'iki değişken arasındaki ilişki'],
  lead: 'İki değişkenin birlikte nasıl değiştiğini ölçün. X ve Y değerlerini aynı sırayla yazın; araç <strong>Pearson korelasyon katsayısını (r)</strong>, belirlilik katsayısını ve kovaryansı hesaplar, ilişkinin yönünü ve gücünü sözle özetler.',
  button: 'Hesapla',
  inputs: [
    { id: 'xler', label: 'X değerleri', type: 'textarea', placeholder: 'Örn. 1 2 3 4 5', hint: 'Birinci değişken. Boşluk, satır sonu ya da noktalı virgülle ayırın.', wide: true },
    { id: 'yler', label: 'Y değerleri', type: 'textarea', placeholder: 'Örn. 50 55 65 70 85', hint: 'İkinci değişken; X ile aynı sırada ve aynı sayıda.', wide: true },
  ],
  compute(v, h) {
    const x = h.nums(v.xler, 'X değerleri');
    const y = h.nums(v.yler, 'Y değerleri');
    if (x.length !== y.length) h.err(`X değerlerinin sayısı (${x.length}) ile Y değerlerinin sayısı (${y.length}) eşit olmalı. Her X değerinin bir Y eşi bulunmalı.`);
    const n = x.length;
    if (n < 2) h.err('Korelasyon için en az iki veri çifti gerekir; anlamlı bir sonuç için çok daha fazlasını girin.');
    const ox = x.reduce((s, a) => s + a, 0) / n;
    const oy = y.reduce((s, a) => s + a, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - ox, dy = y[i] - oy;
      sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
    }
    const olcek = Math.max(1, ...x.map(Math.abs), ...y.map(Math.abs));
    const esik = 1e-18 * olcek * olcek;
    if (sxx <= esik) h.err('X değerlerinin hepsi aynı; değişmeyen bir değişkenle korelasyon hesaplanamaz.');
    if (syy <= esik) h.err('Y değerlerinin hepsi aynı; değişmeyen bir değişkenle korelasyon hesaplanamaz.');
    let r = sxy / Math.sqrt(sxx * syy);
    if (1 - Math.abs(r) < 1e-12) r = r > 0 ? 1 : -1;
    if (Math.abs(r) < 1e-12) r = 0;
    const m = Math.abs(r);
    const yon = r > 0 ? 'pozitif' : 'negatif';
    let yorum;
    if (m === 1) yorum = `Tam ${yon} doğrusal ilişki`;
    else if (m < 0.1) yorum = 'Doğrusal ilişki yok denecek kadar zayıf';
    else if (m < 0.2) yorum = `Çok zayıf ${yon} ilişki`;
    else if (m < 0.4) yorum = `Zayıf ${yon} ilişki`;
    else if (m < 0.6) yorum = `Orta düzeyde ${yon} ilişki`;
    else if (m < 0.8) yorum = `Güçlü ${yon} ilişki`;
    else yorum = `Çok güçlü ${yon} ilişki`;
    return {
      rows: [
        ['Korelasyon katsayısı (r)', h.fmt(r, 4)],
        ['Yorum', yorum],
        ['Belirlilik katsayısı (r²)', h.fmt(r * r, 4)],
        ['Kovaryans (örneklem)', h.fmt(sxy / (n - 1), 4)],
        ['X ortalaması', h.fmt(ox, 4)],
        ['Y ortalaması', h.fmt(oy, 4)],
        ['Çift sayısı (n)', String(n)],
      ],
      note: n < 5
        ? 'Çok az veri çiftiyle bulunan korelasyon tesadüfen yüksek çıkabilir; sonucu temkinli yorumlayın. Korelasyon nedensellik göstermez.'
        : 'Korelasyon yalnızca doğrusal ilişkinin yönünü ve gücünü ölçer; nedensellik göstermez.',
    };
  },
  cases: [
    { in: { xler: '1 2 3 4 5', yler: '50 55 65 70 85' }, out: { 'Korelasyon katsayısı (r)': '0,9815', 'Yorum': 'Çok güçlü pozitif ilişki', 'Belirlilik katsayısı (r²)': '0,9633', 'Kovaryans (örneklem)': '21,25', 'X ortalaması': '3', 'Y ortalaması': '65', 'Çift sayısı (n)': '5' } },
    { in: { xler: '1 2 3 4 5', yler: '2 4 5 4 5' }, out: { 'Korelasyon katsayısı (r)': '0,7746', 'Yorum': 'Güçlü pozitif ilişki', 'Belirlilik katsayısı (r²)': '0,6', 'Kovaryans (örneklem)': '1,5' } },
    { in: { xler: '1 2 3 4 5', yler: '2 4 6 8 10' }, out: { 'Korelasyon katsayısı (r)': '1', 'Yorum': 'Tam pozitif doğrusal ilişki', 'Belirlilik katsayısı (r²)': '1' } },
    { in: { xler: '1 2 3 4 5', yler: '10 8 6 4 2' }, out: { 'Korelasyon katsayısı (r)': '-1', 'Yorum': 'Tam negatif doğrusal ilişki' } },
    { in: { xler: '1 2 3', yler: '1 3 2' }, out: { 'Korelasyon katsayısı (r)': '0,5', 'Yorum': 'Orta düzeyde pozitif ilişki', 'Belirlilik katsayısı (r²)': '0,25' } },
    { in: { xler: '1 2 3 4', yler: '1 -1 1 -1' }, out: { 'Korelasyon katsayısı (r)': '-0,4472', 'Yorum': 'Orta düzeyde negatif ilişki' } },
    { in: { xler: '1 2 3 4 5', yler: '2 1 0 1 2' }, out: { 'Korelasyon katsayısı (r)': '0', 'Yorum': 'Doğrusal ilişki yok denecek kadar zayıf', 'Kovaryans (örneklem)': '0' } },
    { in: { xler: '1 2 3', yler: '4 5' }, error: true },
    { in: { xler: '3 3 3', yler: '1 2 3' }, error: true },
    { in: { xler: '5', yler: '7' }, error: true },
  ],
  howto: [
    '"X değerleri" kutusuna birinci değişkenin ölçümlerini yazın; örneğin haftalık çalışma saatleri.',
    '"Y değerleri" kutusuna ikinci değişkenin ölçümlerini aynı sırayla yazın; örneğin aynı öğrencilerin sınav notları. Birinci X birinci Y ile eşleşir.',
    'İki kutudaki sayı adedinin eşit olduğunu kontrol edin. Hesap tablosundan iki sütunu ayrı ayrı kopyalayıp yapıştırabilirsiniz.',
    '"Hesapla" düğmesine basın. İlk satırda r değerini, altında sözel yorumu, r² ve kovaryansı görürsünüz.',
  ],
  sections: [
    { h: 'Korelasyon katsayısı nedir?', p: [
      'Korelasyon katsayısı, iki sayısal değişkenin birlikte değişme eğilimini −1 ile +1 arasında tek bir sayıyla özetler. Bu sayfa en yaygın türü olan <strong>Pearson korelasyon katsayısını</strong> hesaplar ve r harfiyle gösterir. Pearson katsayısı iki değişken arasındaki <em>doğrusal</em> ilişkiyi ölçer: noktalar bir saçılım grafiğine dizildiğinde bir doğrunun çevresinde ne kadar sıkı toplandıklarını anlatır.',
      'İşaret yönü, büyüklük gücü gösterir. Pozitif r, bir değişken artarken diğerinin de artma eğiliminde olduğunu; negatif r, biri artarken diğerinin azaldığını söyler. +1 ya da −1 bütün noktaların kusursuz biçimde tek bir doğru üzerinde olduğu, 0 ise doğrusal bir bağ bulunmadığı anlamına gelir. Katsayı birimsizdir: boyu santimetre yerine metreyle, ağırlığı kilogram yerine gramla ölçmek sonucu değiştirmez.',
    ] },
    { h: 'Formül', p: [
      'Pearson katsayısı, iki değişkenin ortak değişiminin ayrı ayrı değişimlerine oranıdır: <strong>r = Σ(x − x̄)(y − ȳ) ÷ √( Σ(x − x̄)² · Σ(y − ȳ)² )</strong>. Paydaki toplam, her çiftin kendi ortalamasından sapmalarının çarpımlarıdır. İki değişken aynı anda ortalamanın üstünde ya da altında kalıyorsa çarpımlar pozitif, biri üstte biri altta kalıyorsa negatif çıkar.',
      'Aynı ifade <strong>r = kovaryans ÷ (s<sub>x</sub> · s<sub>y</sub>)</strong> biçiminde de yazılır. Kovaryans ilişkinin yönünü verir ama büyüklüğü birimlere bağlıdır; standart sapmaların çarpımına bölmek onu −1 ile +1 arasına sıkıştırır.',
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      'Beş öğrencinin haftalık çalışma süresi 1, 2, 3, 4 ve 5 saat; sınav notları sırasıyla 50, 55, 65, 70 ve 85 olsun. X ortalaması 3, Y ortalaması 65\'tir. X sapmaları −2, −1, 0, 1, 2; Y sapmaları −15, −10, 0, 5, 20 olur.',
      'Sapmaların çarpımları 30, 10, 0, 5 ve 40; toplamları <strong>85</strong>\'tir. X sapmalarının kareleri toplamı 10, Y sapmalarının kareleri toplamı 225 + 100 + 0 + 25 + 400 = 750 eder. Buradan r = 85 ÷ √(10 × 750) = 85 ÷ √7.500 ≈ 85 ÷ 86,6025 ≈ <strong>0,9815</strong> bulunur. Belirlilik katsayısı r² ≈ 0,9633, örneklem kovaryansı 85 ÷ 4 = 21,25\'tir. Bu değerleri araca yazdığınızda aynı sonuçları ve "çok güçlü pozitif ilişki" yorumunu görürsünüz.',
    ] },
    { h: 'r değerini yorumlama', p: [
      'Katsayının büyüklüğü için evrensel bir sınır yoktur; alandan alana beklenti değişir. Fizik deneylerinde 0,9 sıradan sayılırken sosyal bilimlerde 0,4 dikkate değer bir ilişkidir. Araç, giriş düzeyindeki kaynaklarda sık rastlanan şu kaba ölçeği kullanır:',
    ], ul: [
      '<strong>0,00 – 0,19:</strong> çok zayıf ya da yok',
      '<strong>0,20 – 0,39:</strong> zayıf',
      '<strong>0,40 – 0,59:</strong> orta',
      '<strong>0,60 – 0,79:</strong> güçlü',
      '<strong>0,80 – 1,00:</strong> çok güçlü',
    ] },
    { h: 'Belirlilik katsayısı (r²) ne söyler?', p: [
      'Korelasyon katsayısının karesi, bir değişkendeki değişkenliğin ne kadarının diğeriyle kurulan doğrusal ilişkiyle açıklanabildiğini gösterir. Yukarıdaki örnekte r² ≈ 0,96 olduğundan notlardaki farklılığın yaklaşık yüzde 96\'sı çalışma süresiyle doğrusal olarak ilişkilendirilebilir. r = 0,5 kulağa orta gibi gelse de r² yalnızca 0,25\'tir; yani değişkenliğin dörtte üçü açıklanamamaktadır. Bu yüzden r² çoğu zaman daha gerçekçi bir fikir verir.',
    ] },
    { h: 'Korelasyon nedensellik değildir', p: [
      'İki değişkenin birlikte hareket etmesi, birinin diğerine yol açtığını kanıtlamaz. Yaz aylarında hem dondurma satışı hem de denizde boğulma vakaları artar; aralarında yüksek korelasyon vardır ama dondurma boğulmaya neden olmaz. İkisini de etkileyen üçüncü bir etken, sıcak hava ve denize giren insan sayısı söz konusudur. İlişki tersine de işleyebilir ya da tümüyle tesadüf olabilir. Nedensellik iddiası için kontrollü deney ya da çok daha dikkatli bir araştırma tasarımı gerekir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      '<strong>Eğrisel ilişkiyi kaçırmak:</strong> 1, 2, 3, 4, 5 karşısında 2, 1, 0, 1, 2 değerleri kusursuz bir V biçimi oluşturur ama r tam sıfırdır. Sıfır korelasyon ilişki olmadığını değil, <em>doğrusal</em> ilişki olmadığını söyler.',
      '<strong>Uç değerler:</strong> Tek bir aykırı nokta katsayıyı belirgin biçimde yükseltebilir ya da düşürebilir. Veriyi bir saçılım grafiğinde görmeden yalnızca r\'ye güvenmeyin.',
      '<strong>Az veri:</strong> İki çiftle r her zaman +1 ya da −1 çıkar; üç dört çiftle de yüksek değerler tesadüfen oluşabilir.',
      '<strong>Eşleşmeyi bozmak:</strong> X ve Y listeleri aynı sırada olmalıdır. Listelerden birini sıralarsanız çiftler dağılır ve sonuç anlamını yitirir.',
      '<strong>Sıralı ya da kategorik veri:</strong> Sıralama puanları için Spearman sıra korelasyonu daha uygundur; bu araç onu hesaplamaz.',
    ], p: [
      'Değişkenlerden birinin bütün değerleri aynıysa standart sapması sıfır olur ve katsayı tanımsız kalır; araç bu durumda hata verir. Sonucun istatistiksel olarak anlamlı olup olmadığı, yani p değeri bu sayfada hesaplanmaz. Araştırma, sağlık ya da yatırım kararlarında sonucu bir uzmanla birlikte değerlendirin.',
    ] },
  ],
  faq: [
    ['Korelasyon katsayısı hangi değerleri alabilir?', '−1 ile +1 arasında her değeri alabilir. +1 kusursuz artan, −1 kusursuz azalan doğrusal ilişkiyi; 0 ise doğrusal ilişki olmadığını gösterir.'],
    ['Negatif korelasyon kötü bir şey midir?', 'Hayır. İşaret yalnızca yönü belirtir. −0,9 değeri, +0,9 kadar güçlü bir ilişkidir; fark, bir değişken artarken diğerinin azalmasıdır. Hız arttıkça yolculuk süresinin kısalması buna örnektir.'],
    ['r ile r² arasındaki fark nedir?', 'r ilişkinin yönünü ve gücünü verir. r², yani belirlilik katsayısı ise bir değişkendeki değişkenliğin diğeriyle doğrusal olarak açıklanabilen payıdır ve 0 ile 1 arasındadır.'],
    ['Korelasyon ile kovaryans arasındaki fark nedir?', 'İkisi de ortak değişimi ölçer. Kovaryansın büyüklüğü verilerin birimine bağlıdır ve tek başına yorumlanamaz. Korelasyon, kovaryansın standart sapmalara bölünmüş, birimsiz ve −1 ile +1 arasına sıkıştırılmış halidir.'],
    ['Kaç veri çifti gerekir?', 'Matematiksel olarak iki çift yeter, ancak sonuç anlamsız olur. Güvenilir bir fikir için en az yirmi otuz çift önerilir; ne kadar çok veri varsa katsayı o kadar kararlıdır.'],
    ['Korelasyon sıfırsa değişkenler ilişkisiz midir?', 'Zorunlu olarak değil. Pearson katsayısı yalnızca doğrusal ilişkiyi yakalar. Parabol ya da V biçimindeki güçlü bir ilişkide r sıfıra yakın çıkabilir; bu yüzden veriyi grafikte incelemek önemlidir.'],
    ['X ile Y\'nin yerini değiştirirsem sonuç değişir mi?', 'Hayır. Korelasyon simetriktir; hangi değişkeni X, hangisini Y olarak girdiğiniz r değerini etkilemez. Regresyon doğrusunda ise seçim önemlidir.'],
    ['Verilerim sunucuya yükleniyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar hiçbir yere gönderilmez ve saklanmaz.'],
  ],
  related: ['dogrusal-regresyon-hesapla', 'standart-sapma-hesapla', 'varyans-hesapla', 'istatistik-hesapla', 'z-skoru-hesapla', 'egim-hesapla'],
};
