export default {
  slug: 'mm-punto-cevir',
  title: 'Milimetre Punto Çevirici',
  h1Tail: 'mm ↔ pt',
  pageTitle: 'Milimetre Punto Çevirici – mm\'den pt\'ye, Puntodan mm\'ye',
  description: 'Milimetreyi puntoya, puntoyu milimetreye çevirin. 1 punto = 1/72 inç = 0,3528 mm tanımıyla çalışır; pika ve inç karşılığını da gösterir.',
  card: 'Milimetreyi puntoya, puntoyu milimetreye çevirin; pika ve inç karşılığıyla birlikte, baskı ve PDF işleri için.',
  category: 'birim',
  keywords: ['mm punto çevirme', 'punto kaç mm', 'milimetre punto', '1 punto kaç milimetre', 'pt mm hesaplama', 'a4 kaç punto', 'yazı yüksekliği mm'],
  lead: `Baskı ve mizanpaj ölçülerini <strong>milimetre</strong> ile <strong>punto (pt)</strong> arasında çevirin. Araç, masaüstü yayıncılıkta geçerli olan 1 punto = 1/72 inç tanımını kullanır ve sonucu pika ile inç olarak da verir.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 12' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['mm', 'Milimetre → Punto'], ['pt', 'Punto → Milimetre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const pt = v.yon === 'pt' ? x : x * 72 / 25.4;
    const mm = pt * 25.4 / 72;
    const a = ['Punto', h.fmt(pt, 4) + ' pt'];
    const b = ['Milimetre', h.fmt(mm, 4) + ' mm'];
    return {
      rows: [
        v.yon === 'pt' ? b : a,
        v.yon === 'pt' ? a : b,
        ['Pika', h.fmt(pt / 12, 4) + ' pika'],
        ['İnç', h.fmt(pt / 72, 4) + ' inç'],
      ],
      note: '1 punto = 1/72 inç = 0,3528 mm (yaklaşık); 1 mm = 2,8346 punto (yaklaşık).',
    };
  },
  cases: [
    { in: { deger: '25,4', yon: 'mm' }, out: { 'Punto': '72 pt', 'Pika': '6 pika', 'İnç': '1 inç' } },
    { in: { deger: '12', yon: 'pt' }, out: { 'Milimetre': '4,2333 mm', 'Pika': '1 pika' } },
    { in: { deger: '1', yon: 'mm' }, out: { 'Punto': '2,8346 pt' } },
    { in: { deger: '210', yon: 'mm' }, out: { 'Punto': '595,2756 pt' } },
    { in: { deger: '297', yon: 'mm' }, out: { 'Punto': '841,8898 pt' } },
    { in: { deger: '10', yon: 'pt' }, out: { 'Milimetre': '3,5278 mm' } },
    { in: { deger: '72', yon: 'pt' }, out: { 'Milimetre': '25,4 mm', 'İnç': '1 inç' } },
    { in: { deger: '-2', yon: 'mm' }, error: true },
    { in: { deger: '12pt', yon: 'pt' }, error: true },
  ],
  howto: [
    `"Değer" alanına milimetre ya da punto cinsinden ölçüyü yazın; yalnızca sayıyı girin, birim eklemeyin.`,
    `"Çeviri yönü" listesinden milimetreden puntoya mı, puntodan milimetreye mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satır aradığınız karşılıktır; altında pika ve inç değerleri yer alır.`,
    `Sonucu mizanpaj programına ya da şartnameye aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Punto fiziksel bir uzunluktur', p: [
      `Punto çoğu kişinin aklına yalnızca yazı boyutunu getirir; oysa bir uzunluk birimidir ve cetvelle ölçülebilir. Bilgisayarlı dizgiyle birlikte yerleşen tanıma göre <strong>1 punto, inçin 72'de biridir</strong>. Bir inç 25,4 milimetre olduğundan 1 punto 25,4 ÷ 72 = 0,352777… milimetre eder. Yuvarlak söylemek gerekirse bir punto, milimetrenin üçte birinden biraz fazladır; üç punto yaklaşık bir milimetredir.`,
      `Türkiye'de kâğıt, kesim ve kenar boşluğu ölçüleri milimetreyle, yazı boyutu, satır aralığı ve çizgi kalınlığı ise puntoyla konuşulur. Bir sayfa tasarımında iki sistemi bir arada kullanmak kaçınılmazdır; bu araç aradaki geçişi sağlar.`,
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      `Milimetreden puntoya: <strong>pt = mm × 72 ÷ 25,4</strong> (yaklaşık mm × 2,8346). Puntodan milimetreye: <strong>mm = pt × 25,4 ÷ 72</strong> (yaklaşık pt × 0,3528).`,
      `<strong>Örnek 1:</strong> 12 puntoluk yazı tipi kaç milimetredir? 12 × 25,4 ÷ 72 = 4,2333 mm. Bu aynı zamanda 1 pikadır.`,
      `<strong>Örnek 2:</strong> A4 kâğıdın genişliği 210 mm'dir. 210 × 72 ÷ 25,4 = 595,2756 punto. Yüksekliği 297 mm için sonuç 841,8898 puntodur. PDF dosyalarında A4 sayfa boyutunun 595 × 842 punto dolayında görünmesi bundandır.`,
      `<strong>Örnek 3:</strong> 25,4 mm tam 72 punto, yani 6 pika ve 1 inç eder.`,
    ] },
    { h: 'Punto değeri harfin yüksekliği değildir', p: [
      `"10 punto yazı 3,53 mm yüksekliğindedir" demek tam doğru olmaz. Punto boyutu, yazı tipinin tasarlandığı hayali karenin (em kutusunun) yüksekliğidir. Bu kutu, satır çizgisinin altına sarkan g, p, y gibi harflerin kuyruklarını ve yukarı uzanan b, d, l gibi harflerin tepe paylarını birlikte kapsar. Tek bir büyük harfin mürekkep yüksekliği kutudan belirgin biçimde kısadır ve yazı tipinden yazı tipine değişir.`,
      `Bu ayrım özellikle etiket ve ambalaj işlerinde önem taşır. Bir şartname "harf yüksekliği en az şu kadar milimetre olmalı" diyorsa, ölçülecek şey çoğu zaman belirli bir harfin gerçek yüksekliğidir, punto boyutu değil. Bu durumda puntoyu milimetreye çevirmek yalnızca başlangıç noktası verir; seçtiğiniz yazı tipinde harfi basıp ölçmeniz ve ilgili güncel mevzuatı kontrol etmeniz gerekir.`,
    ] },
    { h: 'Pika nedir?', p: [
      `Pika, 12 puntoya eşit olan dizgi birimidir; 6 pika 1 inç eder. Sütun genişliği, sayfa kenar boşluğu gibi puntoyla söylendiğinde büyük sayılara ulaşan ölçüler geleneksel olarak pikayla ifade edilir. Mizanpaj programlarında "3p6" gibi bir gösterim 3 pika 6 punto, yani 42 punto anlamına gelir. Araç pikayı ondalıklı olarak verir: 42 punto 3,5 pikadır.`,
    ] },
    { h: 'Hızlı başvuru: yazı boyutları ve çizgi kalınlıkları', ul: [
      `<strong>0,25 pt</strong> = 0,0882 mm (çok ince çizgi)`,
      `<strong>0,5 pt</strong> = 0,1764 mm`,
      `<strong>1 pt</strong> = 0,3528 mm`,
      `<strong>6 pt</strong> = 2,1167 mm`,
      `<strong>8 pt</strong> = 2,8222 mm`,
      `<strong>10 pt</strong> = 3,5278 mm`,
      `<strong>11 pt</strong> = 3,8806 mm`,
      `<strong>12 pt</strong> = 4,2333 mm`,
      `<strong>14 pt</strong> = 4,9389 mm`,
      `<strong>18 pt</strong> = 6,35 mm`,
      `<strong>24 pt</strong> = 8,4667 mm`,
      `<strong>36 pt</strong> = 12,7 mm`,
      `<strong>72 pt</strong> = 25,4 mm`,
    ] },
    { h: 'Hızlı başvuru: milimetreden puntoya', ul: [
      `<strong>1 mm</strong> = 2,8346 pt`,
      `<strong>3 mm</strong> = 8,5039 pt (yaygın taşma payı)`,
      `<strong>5 mm</strong> = 14,1732 pt`,
      `<strong>10 mm</strong> = 28,3465 pt`,
      `<strong>25 mm</strong> = 70,8661 pt (2,5 cm kenar boşluğu)`,
      `<strong>148 mm</strong> = 419,5276 pt (A5 genişliği)`,
      `<strong>210 mm</strong> = 595,2756 pt (A4 genişliği)`,
      `<strong>297 mm</strong> = 841,8898 pt (A4 yüksekliği)`,
    ] },
    { h: 'Hangi işlerde gerekir?', p: [
      `PDF üreten yazılımlar ve programlama kitaplıkları sayfa koordinatlarını çoğunlukla punto olarak ister; milimetreyle düşünülmüş bir fatura ya da etiket şablonunu kodlarken her ölçüyü puntoya çevirmek gerekir. Mizanpaj ve vektör çizim programlarında çizgi kalınlığı puntoyla girilir, ancak matbaa en ince basılabilir çizgiyi milimetreyle bildirebilir. Tez ve rapor şablonlarında kenar boşlukları santimetre, yazı ve satır aralığı punto olarak tanımlanır; bir satırın sayfada kaç milimetre tuttuğunu görmek sayfa başına satır sayısını tahmin etmeyi kolaylaştırır.`,
    ] },
    { h: 'Sınırlar ve tarihsel not', p: [
      `Punto tarih boyunca tek bir değere sahip olmadı. Avrupa matbaacılığında kullanılan Didot puntosu yaklaşık 0,376 mm, eski Amerikan matbaa puntosu ise yaklaşık 0,3515 mm idi. Günümüzde yazılımların tamamına yakını 1/72 inç tanımını kullandığından araç yalnızca bu değerle hesap yapar. Çok eski bir dizgi şartnamesiyle çalışıyorsanız hangi puntonun kastedildiğini ayrıca doğrulayın. Sonuçlar dört ondalık basamağa yuvarlanır.`,
    ] },
  ],
  faq: [
    ['1 punto kaç milimetredir?', '1 punto 25,4 ÷ 72 = yaklaşık 0,3528 milimetredir. Kabaca üç punto bir milimetreden biraz fazla eder.'],
    ['1 milimetre kaç puntodur?', '1 milimetre 72 ÷ 25,4 = yaklaşık 2,8346 puntodur. 10 milimetre 28,3465 punto eder.'],
    ['12 punto yazı kaç milimetre yüksekliğindedir?', '12 punto 4,2333 mm\'dir; ancak bu, yazı tipinin tasarım kutusunun yüksekliğidir. Tek bir büyük harfin görünen yüksekliği bundan daha kısadır ve yazı tipine göre değişir.'],
    ['A4 kâğıt kaç puntodur?', '210 × 297 mm ölçüsündeki A4, 595,2756 × 841,8898 punto eder. PDF yazılımları bunu çoğunlukla 595 × 842 olarak yuvarlar.'],
    ['Pika ile punto arasındaki ilişki nedir?', '1 pika 12 puntodur ve 6 pika 1 inç eder. 1 pika yaklaşık 4,2333 mm\'dir.'],
    ['Punto ile piksel aynı mı?', 'Hayır. Punto fiziksel bir uzunluktur, piksel ise çözünürlüğe bağlıdır. 96 DPI kabul eden web ortamında 1 punto 1,3333 piksele karşılık gelir.'],
    ['Çizgi kalınlığını milimetre olarak nasıl girerim?', 'Programınız punto istiyorsa milimetre değerini bu araçla çevirin. Örneğin 0,2 mm kalınlığında bir çizgi yaklaşık 0,5669 punto eder.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda gerçekleşir; girdiğiniz sayı sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['punto-piksel-cevir', 'mm-inc-cevir', 'cm-inc-cevir', 'kagit-boyutlari', 'css-birim-cevir'],
};
