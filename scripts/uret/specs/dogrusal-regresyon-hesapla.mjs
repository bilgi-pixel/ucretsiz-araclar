export default {
  slug: 'dogrusal-regresyon-hesapla',
  title: 'Doğrusal Regresyon Hesaplama',
  h1Tail: 'en küçük kareler doğrusu',
  pageTitle: 'Doğrusal Regresyon Hesaplama – En Küçük Kareler Doğrusu ve R²',
  description: 'X ve Y verilerinizden basit doğrusal regresyon denklemini bulun. Eğim, kesişim, R² ve standart hata hesaplanır; istediğiniz x için y tahmini yapılır.',
  card: 'X ve Y verilerinden en küçük kareler doğrusunu bulun: eğim, kesişim, R² ve girdiğiniz x değeri için y tahmini.',
  category: 'matematik',
  keywords: ['doğrusal regresyon hesaplama', 'regresyon denklemi bulma', 'en küçük kareler yöntemi', 'regresyon doğrusu', 'eğilim çizgisi hesaplama', 'r kare hesaplama', 'basit doğrusal regresyon'],
  lead: 'Veri noktalarınıza en iyi uyan doğruyu bulun. X ve Y değerlerini aynı sırayla yazın; araç en küçük kareler yöntemiyle <strong>y = bx + a</strong> regresyon denklemini, R² değerini ve isterseniz belirli bir x için y tahminini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'xler', label: 'X değerleri (bağımsız değişken)', type: 'textarea', placeholder: 'Örn. 1 2 3 4', hint: 'Boşluk, satır sonu ya da noktalı virgülle ayırın.', wide: true },
    { id: 'yler', label: 'Y değerleri (bağımlı değişken)', type: 'textarea', placeholder: 'Örn. 6 5 7 10', hint: 'X ile aynı sırada ve aynı sayıda.', wide: true },
    { id: 'tahminx', label: 'Tahmin için x (isteğe bağlı)', type: 'number', placeholder: 'Örn. 5', hint: 'Boş bırakırsanız yalnızca denklem hesaplanır.' },
  ],
  compute(v, h) {
    const x = h.nums(v.xler, 'X değerleri');
    const y = h.nums(v.yler, 'Y değerleri');
    if (x.length !== y.length) h.err(`X değerlerinin sayısı (${x.length}) ile Y değerlerinin sayısı (${y.length}) eşit olmalı. Her X değerinin bir Y eşi bulunmalı.`);
    const n = x.length;
    if (n < 2) h.err('Bir doğru belirlemek için en az iki veri noktası gerekir.');
    const ox = x.reduce((s, a) => s + a, 0) / n;
    const oy = y.reduce((s, a) => s + a, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i] - ox, dy = y[i] - oy;
      sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
    }
    const olcekX = Math.max(1, ...x.map(Math.abs));
    const olcekY = Math.max(1, ...y.map(Math.abs));
    if (sxx <= 1e-18 * olcekX * olcekX) h.err('X değerlerinin hepsi aynı; noktalar düşey bir çizgide olduğundan regresyon doğrusunun eğimi hesaplanamaz.');
    const b = sxy / sxx;
    const a = oy - b * ox;
    const ySabit = syy <= 1e-18 * olcekY * olcekY;
    let r = ySabit ? NaN : sxy / Math.sqrt(sxx * syy);
    if (!ySabit && 1 - Math.abs(r) < 1e-12) r = r > 0 ? 1 : -1;
    const sse = Math.max(0, syy - b * sxy);
    const bS = h.fmt(b, 4);
    const aS = h.fmt(Math.abs(a), 4);
    let denklem;
    if (bS === '0') denklem = 'y = ' + h.fmt(a, 4);
    else denklem = 'y = ' + bS + 'x' + (aS === '0' ? '' : (a > 0 ? ' + ' : ' - ') + aS);
    const rows = [
      ['Regresyon denklemi', denklem],
      ['Eğim (b)', bS],
      ['Kesişim (a)', h.fmt(a, 4)],
      ['Korelasyon katsayısı (r)', ySabit ? 'Tanımsız (Y sabit)' : h.fmt(r, 4)],
      ['Belirlilik katsayısı (R²)', ySabit ? 'Tanımsız (Y sabit)' : h.fmt(r * r, 4)],
    ];
    if (n > 2) rows.push(['Tahminin standart hatası', h.fmt(Math.sqrt(sse / (n - 2)), 4)]);
    rows.push(['Çift sayısı (n)', String(n)]);
    let note = 'Doğru, noktaların düşey uzaklıklarının kareleri toplamını en küçük yapan en küçük kareler doğrusudur.';
    if (String(v.tahminx ?? '').trim() !== '') {
      const tx = h.num(v.tahminx, 'Tahmin için x');
      rows.push(['Tahmini y', `${h.fmt(a + b * tx, 4)} (x = ${h.fmt(tx, 4)} için)`]);
      const enK = Math.min(...x), enB = Math.max(...x);
      if (tx < enK || tx > enB) note = `Dikkat: x = ${h.fmt(tx, 4)}, verinizin kapsadığı ${h.fmt(enK, 4)} – ${h.fmt(enB, 4)} aralığının dışında. Bu bir dış kestirimdir ve ilişkinin aynı biçimde sürdüğü varsayımına dayanır.`;
    }
    return { rows, note };
  },
  cases: [
    { in: { xler: '1 2 3 4', yler: '6 5 7 10', tahminx: '5' }, out: { 'Regresyon denklemi': 'y = 1,4x + 3,5', 'Eğim (b)': '1,4', 'Kesişim (a)': '3,5', 'Korelasyon katsayısı (r)': '0,8367', 'Belirlilik katsayısı (R²)': '0,7', 'Tahminin standart hatası': '1,4491', 'Çift sayısı (n)': '4', 'Tahmini y': '10,5 (x = 5 için)' } },
    { in: { xler: '1 2 3 4 5', yler: '2 4 5 4 5', tahminx: '6' }, out: { 'Regresyon denklemi': 'y = 0,6x + 2,2', 'Belirlilik katsayısı (R²)': '0,6', 'Tahminin standart hatası': '0,8944', 'Tahmini y': '5,8 (x = 6 için)' } },
    { in: { xler: '1 2 3', yler: '2 4 6' }, out: { 'Regresyon denklemi': 'y = 2x', 'Eğim (b)': '2', 'Kesişim (a)': '0', 'Belirlilik katsayısı (R²)': '1', 'Tahminin standart hatası': '0' } },
    { in: { xler: '1 2 3', yler: '5 3 1' }, out: { 'Regresyon denklemi': 'y = -2x + 7', 'Korelasyon katsayısı (r)': '-1' } },
    { in: { xler: '1 2 3', yler: '1 3 5', tahminx: '2,5' }, out: { 'Regresyon denklemi': 'y = 2x - 1', 'Kesişim (a)': '-1', 'Tahmini y': '4 (x = 2,5 için)' } },
    { in: { xler: '0 10', yler: '32 50', tahminx: '100' }, out: { 'Regresyon denklemi': 'y = 1,8x + 32', 'Tahmini y': '212 (x = 100 için)', 'Çift sayısı (n)': '2' } },
    { in: { xler: '1 2 3', yler: '4 4 4' }, out: { 'Regresyon denklemi': 'y = 4', 'Eğim (b)': '0', 'Korelasyon katsayısı (r)': 'Tanımsız (Y sabit)' } },
    { in: { xler: '1 2 3', yler: '4 5' }, error: true },
    { in: { xler: '2 2 2', yler: '1 2 3' }, error: true },
    { in: { xler: '4', yler: '9' }, error: true },
    { in: { xler: '1 2 3', yler: '2 4 6', tahminx: 'beş' }, error: true },
  ],
  howto: [
    '"X değerleri" kutusuna bağımsız değişkeni, yani açıklayan büyüklüğü yazın: ay numarası, reklam harcaması, çalışma saati gibi.',
    '"Y değerleri" kutusuna bağımlı değişkeni, yani tahmin etmek istediğiniz büyüklüğü aynı sırayla yazın: satış, not, tüketim gibi.',
    'Belirli bir x için tahmin istiyorsanız "Tahmin için x" alanını doldurun; istemiyorsanız boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satırda regresyon denklemini, altında eğimi, kesişimi, R² değerini ve varsa tahmini görürsünüz.',
    'Sonuç notunu okuyun: tahmin için yazdığınız x, verinizin aralığı dışındaysa araç bunu ayrıca belirtir.',
  ],
  sections: [
    { h: 'Doğrusal regresyon nedir?', p: [
      'Basit doğrusal regresyon, iki sayısal değişken arasındaki ilişkiyi bir doğruyla özetleme yöntemidir. Elinizde x ve y çiftlerinden oluşan noktalar vardır ve bu noktaların arasından geçen, onlara en iyi uyan doğru aranır. Doğru bulunduktan sonra iki iş için kullanılır: ilişkinin büyüklüğünü sayıya dökmek (x bir birim arttığında y ortalama ne kadar değişir) ve yeni bir x değeri için y tahmini yapmak.',
      'Hesap tablolarındaki "eğilim çizgisi" de aynı doğrudur. Burada x\'e bağımsız ya da açıklayıcı değişken, y\'ye bağımlı ya da açıklanan değişken denir. Korelasyondan farklı olarak regresyonda hangi değişkenin x, hangisinin y olduğu önemlidir; yerlerini değiştirirseniz farklı bir doğru elde edersiniz.',
    ] },
    { h: 'En küçük kareler yöntemi ve formüller', p: [
      'Hiçbir doğru dağınık noktaların hepsinden geçemez. Her nokta ile doğru arasındaki düşey farka <strong>artık</strong> denir. En küçük kareler yöntemi, bu artıkların kareleri toplamını mümkün olan en küçük değere indiren doğruyu seçer. Çözüm kapalı formüllerle bulunur:',
    ], ul: [
      '<strong>Eğim:</strong> b = Σ(x − x̄)(y − ȳ) ÷ Σ(x − x̄)²',
      '<strong>Kesişim:</strong> a = ȳ − b · x̄',
      '<strong>Denklem:</strong> y = bx + a',
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      'Bir işletmenin dört aylık satışı (bin adet) şöyle olsun: 1. ay 6, 2. ay 5, 3. ay 7, 4. ay 10. X değerleri 1, 2, 3, 4; Y değerleri 6, 5, 7, 10\'dur. X ortalaması 2,5, Y ortalaması 7\'dir.',
      'X sapmaları −1,5, −0,5, 0,5 ve 1,5; Y sapmaları −1, −2, 0 ve 3 olur. Çarpımları 1,5, 1, 0 ve 4,5; toplamları <strong>7</strong>\'dir. X sapmalarının kareleri toplamı 2,25 + 0,25 + 0,25 + 2,25 = <strong>5</strong> eder. Eğim b = 7 ÷ 5 = <strong>1,4</strong>, kesişim a = 7 − 1,4 × 2,5 = <strong>3,5</strong> bulunur. Denklem <strong>y = 1,4x + 3,5</strong> olur: satışlar ayda ortalama 1,4 bin adet artmaktadır.',
      'Beşinci ay için tahmin 1,4 × 5 + 3,5 = <strong>10,5</strong> bin adettir. Doğrunun dört ay için verdiği değerler 4,9, 6,3, 7,7 ve 9,1; artıklar 1,1, −1,3, −0,7 ve 0,9\'dur. Artık kareleri toplamı 4,2, Y\'nin toplam değişkenliği 14 olduğundan R² = 1 − 4,2 ÷ 14 = <strong>0,7</strong> çıkar. Tahminin standart hatası √(4,2 ÷ 2) ≈ 1,4491\'dir. Aynı verileri ve tahmin için 5 değerini araca yazarak bütün bu sonuçları doğrulayabilirsiniz.',
    ] },
    { h: 'Sonuçları yorumlama', p: [
      '<strong>Eğim (b)</strong>, x bir birim arttığında y\'nin ortalama kaç birim değiştiğini gösterir; işareti ilişkinin yönünü verir. <strong>Kesişim (a)</strong>, x sıfırken doğrunun verdiği y değeridir. Verinizde x sıfıra yakın değerler almıyorsa kesişimin tek başına gerçekçi bir anlamı olmayabilir; yalnızca doğrunun konumunu belirler.',
      '<strong>R²</strong>, y\'deki değişkenliğin ne kadarının doğruyla açıklandığını 0 ile 1 arasında ifade eder. 0,7 değeri, satışlardaki dalgalanmanın yüzde 70\'inin zaman eğilimiyle açıklandığını, kalanının başka etkenlere ya da rastlantıya bağlı olduğunu söyler. Basit doğrusal regresyonda R², korelasyon katsayısının karesine eşittir. <strong>Tahminin standart hatası</strong> ise noktaların doğrudan tipik sapmasını y\'nin biriminde verir; küçük olması tahminlerin daha isabetli olduğunu gösterir ve hesaplanabilmesi için en az üç nokta gerekir.',
    ] },
    { h: 'Kullanım alanları', ul: [
      '<strong>Satış ve talep:</strong> Geçmiş ayların verisinden eğilimi çıkarıp bir sonraki dönem için kaba bir öngörü üretmek.',
      '<strong>Maliyet analizi:</strong> Üretim miktarı ile toplam gider arasındaki doğrudan sabit gideri (kesişim) ve birim değişken gideri (eğim) ayırmak.',
      '<strong>Laboratuvar:</strong> Kalibrasyon doğrusu çizmek; bilinen derişimlere karşı ölçülen sinyalden bilinmeyen numuneyi hesaplamak.',
      '<strong>Fizik deneyleri:</strong> Yaya asılan kütle ile uzama arasındaki doğrunun eğiminden yay sabitini bulmak.',
      '<strong>Birim dönüşümü:</strong> İki ölçek arasındaki doğrusal bağıntıyı iki noktadan çıkarmak. 0 ve 10 santigrat derecenin karşılığı 32 ve 50 fahrenhayttır; regresyon y = 1,8x + 32 verir.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      '<strong>Dış kestirim:</strong> Doğru yalnızca verinin kapsadığı aralıkta sınanmıştır. Dört aylık veriden on ikinci ayı tahmin etmek, eğilimin hiç değişmeyeceğini varsaymaktır ve çoğu zaman yanıltır. Araç, tahmin için girdiğiniz x aralığın dışındaysa sizi uyarır.',
      '<strong>Doğrusal olmayan ilişki:</strong> Noktalar bir eğri çiziyorsa doğru kötü uyar ve R² düşük çıkar. Önce veriyi bir saçılım grafiğinde görmek en sağlıklı yoldur. <strong>Aykırı değerler:</strong> Kare alma nedeniyle tek bir uç nokta doğruyu kendine doğru belirgin biçimde çeker. <strong>Nedensellik:</strong> İyi uyan bir doğru, x\'in y\'ye neden olduğunu kanıtlamaz.',
      'X değerlerinin tamamı aynıysa eğim tanımsızdır ve araç hata verir. Y değerlerinin tamamı aynıysa doğru yataydır, eğim sıfırdır ve R² tanımsız kalır. İki noktayla doğru her zaman noktalardan tam geçer; bu durumda R² 1 çıkar ama bir uyum ölçüsü olarak anlam taşımaz. Bu sayfa tek açıklayıcı değişkenli modeli hesaplar; katsayıların anlamlılık sınamalarını ve güven aralıklarını vermez. Sonuçlar bilgilendirme amaçlıdır; mali, tıbbi ya da mühendislik kararlarında bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['Regresyon denklemi nasıl bulunur?', 'Önce x ve y ortalamaları hesaplanır. Eğim, sapma çarpımları toplamının x sapmalarının kareleri toplamına bölünmesiyle; kesişim ise y ortalamasından eğim ile x ortalamasının çarpımının çıkarılmasıyla bulunur.'],
    ['Eğim ve kesişim ne anlama gelir?', 'Eğim, x bir birim arttığında y\'nin ortalama ne kadar değiştiğini; kesişim ise x sıfır olduğunda doğrunun y eksenini kestiği değeri gösterir.'],
    ['R² kaç olmalı?', 'Evrensel bir eşik yoktur. Fiziksel ölçümlerde 0,99 üzeri beklenirken insan davranışına ilişkin verilerde 0,3 bile değerli olabilir. R² yalnızca uyumu ölçer; modelin doğru kurulduğunu tek başına kanıtlamaz.'],
    ['Regresyon ile korelasyon arasındaki fark nedir?', 'Korelasyon iki değişkenin birlikte hareket etme gücünü birimsiz tek bir sayıyla verir ve simetriktir. Regresyon ise bir değişkeni diğerinden tahmin etmeye yarayan denklemi üretir; hangisinin x olduğu sonucu değiştirir.'],
    ['Tahmin için aralık dışında bir x girebilir miyim?', 'Girebilirsiniz, ancak bu dış kestirimdir ve ilişkinin veri aralığı dışında da aynı kaldığı varsayımına dayanır. Aralıktan uzaklaştıkça tahminin güvenilirliği hızla düşer.'],
    ['En az kaç veri noktası gerekir?', 'Hesap için iki nokta yeterlidir, fakat iki noktadan her zaman kusursuz bir doğru geçer. Uyumun kalitesini değerlendirebilmek için en az üç, güvenilir bir eğilim için çok daha fazla nokta gerekir.'],
    ['Negatif eğim hata mıdır?', 'Hayır. Negatif eğim, x arttıkça y\'nin azaldığını gösterir. Fiyat yükseldikçe satış adedinin düşmesi ya da yükseklik arttıkça sıcaklığın azalması bunun tipik örnekleridir.'],
    ['Verilerim bir sunucuya gönderiliyor mu?', 'Hayır. Bütün hesap tarayıcınızda yapılır; yazdığınız değerler hiçbir yere iletilmez ve saklanmaz.'],
  ],
  related: ['korelasyon-hesapla', 'egim-hesapla', 'dogru-denklemi-bul', 'dogrusal-interpolasyon-hesapla', 'standart-sapma-hesapla', 'istatistik-hesapla'],
};
