export default {
  slug: 'litre-galon-cevir',
  title: 'Litre Galon Çevirici',
  h1Tail: 'L ↔ gal',
  pageTitle: 'Litre Galon Çevirici – Litreden Galona, Galondan Litreye',
  description: 'Litreyi ABD ya da İngiliz galonuna, galonu litreye çevirin. 1 ABD galonu 3,785 litre, 1 İngiliz galonu 4,546 litre tanımıyla anında hesaplar.',
  card: 'Litreyi ABD ve İngiliz galonuna, galonu litreye çevirin; iki galon türünün karşılığını yan yana görün.',
  category: 'birim',
  keywords: ['litre galon çevirme', '1 galon kaç litre', 'galon litre hesaplama', 'abd galonu kaç litre', 'ingiliz galonu kaç litre', 'litre kaç galon', 'gallon to liter'],
  lead: 'Bir hacmi litreden galona ya da galondan litreye çevirin. Araç hem <strong>ABD sıvı galonunu (3,785411784 L)</strong> hem de <strong>İngiliz galonunu (4,54609 L)</strong> destekler ve iki türün karşılığını birlikte gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 50' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['lg', 'Litre → Galon'], ['gl', 'Galon → Litre']] },
    { id: 'tur', label: 'Galon türü', type: 'select', options: [['abd', 'ABD sıvı galonu'], ['ing', 'İngiliz (imperial) galonu']], hint: 'Galondan litreye çevirirken yazdığınız değerin hangi galon olduğunu belirtir.' },
  ],
  compute(v, h) {
    const ABD = 3.785411784;
    const ING = 4.54609;
    const x = h.nonneg(v.deger, 'Değer');
    const ing = v.tur === 'ing';
    const litre = v.yon === 'gl' ? x * (ing ? ING : ABD) : x;
    const abdSatir = ['ABD galonu', h.fmt(litre / ABD, 4) + ' gal'];
    const ingSatir = ['İngiliz galonu', h.fmt(litre / ING, 4) + ' gal'];
    const litreSatir = ['Litre', h.fmt(litre, 4) + ' L'];
    const rows = v.yon === 'gl'
      ? [litreSatir, ing ? abdSatir : ingSatir, ing ? ingSatir : abdSatir]
      : [ing ? ingSatir : abdSatir, ing ? abdSatir : ingSatir, litreSatir];
    rows.push(['Metreküp', h.fmt(litre / 1000, 6) + ' m³']);
    return {
      rows,
      note: '1 ABD sıvı galonu = 3,785411784 L, 1 İngiliz galonu = 4,54609 L (tam tanımlar). Sonuçlar en fazla dört ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '10', yon: 'lg', tur: 'abd' }, out: { 'ABD galonu': '2,6417 gal', 'İngiliz galonu': '2,1997 gal' } },
    { in: { deger: '5', yon: 'gl', tur: 'abd' }, out: { 'Litre': '18,9271 L', 'İngiliz galonu': '4,1634 gal' } },
    { in: { deger: '1', yon: 'gl', tur: 'ing' }, out: { 'Litre': '4,5461 L', 'ABD galonu': '1,2009 gal' } },
    { in: { deger: '50', yon: 'lg', tur: 'ing' }, out: { 'İngiliz galonu': '10,9985 gal', 'ABD galonu': '13,2086 gal' } },
    { in: { deger: '15', yon: 'gl', tur: 'abd' }, out: { 'Litre': '56,7812 L', 'Metreküp': '0,056781 m³' } },
    { in: { deger: '0', yon: 'lg', tur: 'abd' }, out: { 'ABD galonu': '0 gal' } },
    { in: { deger: '3,785411784', yon: 'lg', tur: 'abd' }, out: { 'ABD galonu': '1 gal' } },
    { in: { deger: 'on litre', yon: 'lg', tur: 'abd' }, error: true },
    { in: { deger: '-2', yon: 'gl', tur: 'ing' }, error: true },
  ],
  howto: [
    '"Değer" alanına çevirmek istediğiniz miktarı yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden litreden galona mı, galondan litreye mi geçeceğinizi seçin.',
    '"Galon türü" listesinden ABD sıvı galonu ya da İngiliz galonunu seçin. Kaynağınız ABD kökenliyse ilkini, Birleşik Krallık kökenliyse ikincisini kullanın.',
    '"Çevir" düğmesine basın. İlk satır asıl sonucunuzdur; altında diğer galon türü, litre ve metreküp karşılıkları yer alır.',
    'Gerekirse "Sonucu kopyala" ile tüm satırları panoya alıp tabloya ya da yazışmaya yapıştırın.',
  ],
  sections: [
    { h: 'Galon tek bir birim değildir', p: [
      'Galon denildiğinde çoğu kişi tek bir ölçü düşünür; oysa bugün kullanımda olan iki farklı galon vardır. <strong>ABD sıvı galonu</strong> 231 inç küp olarak tanımlanır ve tam 3,785411784 litreye eşittir. <strong>İngiliz (imperial) galonu</strong> ise tam 4,54609 litredir. Aradaki fark küçük değildir: İngiliz galonu, ABD galonundan yaklaşık yüzde 20 daha büyüktür.',
      'Bu farkı gözden kaçırmak, özellikle yakıt tüketimi karşılaştırmalarında yanlış sonuca götürür. Bir İngiliz otomobil dergisinde "galon başına 50 mil" olarak verilen değer ile bir Amerikan kaynağındaki aynı ifade aynı tüketimi anlatmaz. Araç bu yüzden her hesapta iki galon türünün karşılığını da listeler; kaynağınızdan emin değilseniz iki sonucu birlikte görmeniz hatayı fark etmenizi kolaylaştırır.',
      'ABD\'de ayrıca tahıl gibi kuru mallar için kullanılmış bir "kuru galon" da vardır, ancak bugün neredeyse hiç karşılaşılmaz ve bu araçta yer almaz.',
    ] },
    { h: 'Çevirme formülleri', p: [
      'Litreden ABD galonuna geçmek için litre değeri 3,785411784\'e bölünür: <strong>ABD galonu = litre ÷ 3,785411784</strong>. İngiliz galonu için bölen 4,54609 olur: <strong>İngiliz galonu = litre ÷ 4,54609</strong>. Ters yönde aynı sayılarla çarpılır.',
      'Zihinden hızlı tahmin için ABD galonunu yaklaşık 3,8 litre, İngiliz galonunu yaklaşık 4,5 litre kabul edebilirsiniz. Dört litrelik bir kap kabaca bir ABD galonundan biraz fazla, bir İngiliz galonundan biraz azdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 10 litrelik bir bidon kaç galondur? ABD galonu için 10 ÷ 3,785411784 = 2,6417 galon; İngiliz galonu için 10 ÷ 4,54609 = 2,1997 galon bulunur.',
      '<strong>Örnek 2:</strong> ABD\'den gelen bir boya kutusunun üzerinde 5 galon yazıyor. 5 × 3,785411784 = 18,9271 litre eder. Aynı miktar İngiliz galonuyla ifade edilseydi 4,1634 galon olurdu.',
      '<strong>Örnek 3:</strong> 50 litrelik bir yakıt deposu İngiliz galonuyla 50 ÷ 4,54609 = 10,9985 galon, ABD galonuyla 13,2086 galondur. Aynı depo için iki ülkede farklı sayıların yazılmasının nedeni budur.',
    ] },
    { h: 'Galonla nerelerde karşılaşılır?', ul: [
      '<strong>Yakıt:</strong> ABD\'de benzin galonla satılır; tüketim "mil/galon" (MPG) olarak verilir. Birleşik Krallık\'ta yakıt litreyle satılsa da tüketim değerleri hâlâ İngiliz galonuna göre anılır.',
      '<strong>Akvaryum:</strong> Yabancı kaynaklı akvaryum rehberlerinde tank hacimleri ve balık yoğunluğu önerileri çoğunlukla ABD galonuyla yazılır.',
      '<strong>Boya ve kimyasallar:</strong> İthal boya, vernik, motor yağı ve temizlik kimyasallarının ambalajlarında galon ya da çeyrek galon (quart) ölçüsü görülür.',
      '<strong>Su damacanaları:</strong> Türkiye\'de yaygın 19 litrelik damacana, 5 ABD galonuna (18,93 L) karşılık gelen uluslararası ambalaj ölçüsünden gelir.',
      '<strong>Havuz ve tesisat:</strong> Yabancı pompa ve filtre kataloglarında debi "galon/dakika" (GPM) olarak belirtilir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 ABD galonu</strong> = 3,7854 L',
      '<strong>1 İngiliz galonu</strong> = 4,5461 L',
      '<strong>1 litre</strong> = 0,2642 ABD galonu = 0,22 İngiliz galonu',
      '<strong>5 ABD galonu</strong> = 18,9271 L',
      '<strong>10 litre</strong> = 2,6417 ABD galonu',
      '<strong>50 litre</strong> = 13,2086 ABD galonu = 10,9985 İngiliz galonu',
      '<strong>1 İngiliz galonu</strong> = 1,2009 ABD galonu',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, kaynağın hangi galonu kullandığını sorgulamadan ABD değeriyle hesap yapmaktır. Kanada, Avustralya ve Birleşik Krallık kökenli eski belgelerde galon büyük olasılıkla İngiliz galonudur. İkinci yaygın hata, galonun alt birimlerini karıştırmaktır: 1 galon 4 quart ve 8 pint eder, ancak bu alt birimlerin büyüklüğü de galon türüne göre değişir.',
      'Araç negatif değer kabul etmez. Sonuçlar dört ondalık basamağa yuvarlanarak gösterilir; hesap ise tam tanım değerleriyle yapılır. Sıvıların hacmi sıcaklıkla değiştiği için ticari yakıt ölçümlerinde sıcaklık düzeltmesi ayrıca uygulanır; bu araç yalnızca birim çevirir.',
    ] },
  ],
  faq: [
    ['1 galon kaç litredir?', 'ABD sıvı galonu tam 3,785411784 litre, İngiliz galonu tam 4,54609 litredir. Hangi değerin geçerli olduğu, galon ifadesinin hangi ülkeye ait kaynaktan geldiğine bağlıdır.'],
    ['1 litre kaç galondur?', '1 litre yaklaşık 0,2642 ABD galonu ya da 0,22 İngiliz galonudur. Kabaca dört litre bir ABD galonundan biraz fazladır.'],
    ['ABD galonu ile İngiliz galonu arasındaki fark nedir?', 'İngiliz galonu ABD galonundan yaklaşık yüzde 20 büyüktür: 1 İngiliz galonu 1,2009 ABD galonuna eşittir. Fark, iki ülkenin 19. yüzyılda farklı hacim tanımlarını benimsemesinden kaynaklanır.'],
    ['19 litrelik damacana kaç galondur?', '19 litre yaklaşık 5,02 ABD galonudur. Bu ambalaj boyutu uluslararası 5 galonluk (18,93 L) şişe ölçüsünden gelir; Türkiye\'de yuvarlanarak 19 litre olarak anılır.'],
    ['Yakıt deposu 60 litre ise kaç galon eder?', '60 litre, 15,85 ABD galonu ya da 13,2 İngiliz galonu eder. Değeri araca yazıp "Litre → Galon" yönünü seçerek iki sonucu da görebilirsiniz.'],
    ['Galonun kısaltması nedir?', 'Galon genellikle "gal" olarak kısaltılır. Türü belirtmek gerektiğinde "US gal" ve "imp gal" ya da "UK gal" yazımları kullanılır.'],
    ['Bir galon kaç quart ve pint eder?', 'Her iki sistemde de 1 galon 4 quart ve 8 pint eder. Ancak galonun kendisi farklı olduğu için ABD pinti yaklaşık 473 mL, İngiliz pinti yaklaşık 568 mL\'dir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda çalışır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['galon-ingiliz-abd-cevir', 'pint-litre-cevir', 'varil-litre-cevir', 'yakit-tuketimi-birim-cevir', 'litre-metrekup-cevir', 'birim-donustur'],
};
