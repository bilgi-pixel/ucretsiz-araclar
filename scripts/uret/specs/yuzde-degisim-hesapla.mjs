export default {
  slug: 'yuzde-degisim-hesapla',
  title: 'Yüzde Değişim Hesaplama',
  h1Tail: 'artış ve azalış oranı',
  pageTitle: 'Yüzde Değişim Hesaplama – Artış ve Azalış Oranı Bulma',
  description: 'Eski ve yeni değeri yazın, yüzde değişimi hesaplayın. Artış ya da azalış oranı, aradaki fark, kat sayısı ve eski değere dönmek için gereken oran gösterilir.',
  card: 'Eski ve yeni değer arasındaki yüzde artışı ya da azalışı bulun; fark, kat ve geri dönüş oranıyla birlikte.',
  category: 'matematik',
  keywords: ['yüzde değişim hesaplama', 'yüzde artış hesaplama', 'yüzde azalış hesaplama', 'değişim oranı hesaplama', 'yüzde kaç arttı', 'yüzde kaç azaldı', 'artış oranı formülü'],
  lead: 'Bir değerin eski hâlinden yeni hâline <strong>yüzde kaç arttığını ya da azaldığını</strong> hesaplayın. Araç değişim oranının yanında mutlak farkı, yeni değerin eskinin kaç katı olduğunu ve eski düzeye dönmek için gereken oranı da verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'eski', label: 'Eski (başlangıç) değer', type: 'number', placeholder: 'Örn. 200' },
    { id: 'yeni', label: 'Yeni (son) değer', type: 'number', placeholder: 'Örn. 250' },
  ],
  compute(v, h) {
    const eski = h.num(v.eski, 'Eski (başlangıç) değer');
    const yeni = h.num(v.yeni, 'Yeni (son) değer');
    if (eski === 0) h.err('Eski değer sıfır olamaz; sıfırdan başlayan bir değişim yüzdeyle ifade edilemez. Sıfırdan farklı bir başlangıç değeri yazın.');
    const fark = yeni - eski;
    const oran = (fark / Math.abs(eski)) * 100;
    const yaz = (o) => {
      if (Math.abs(o) < 5e-7) return '%0 (değişim yok)';
      return `%${h.fmt(Math.abs(o), 2)} ${o > 0 ? 'artış' : 'azalış'}`;
    };
    const farkYaz = (fark > 0 ? '+' : '') + h.fmt(fark, 4);
    const geri = yeni === 0 ? 'Hesaplanamaz (yeni değer 0)' : yaz(((eski - yeni) / Math.abs(yeni)) * 100);
    return {
      rows: [
        ['Yüzde değişim', yaz(oran)],
        ['Fark', farkYaz],
        ['Kat (yeni ÷ eski)', h.fmt(yeni / eski, 4)],
        ['Eski değere dönmek için', geri],
      ],
      note: 'Formül: (yeni − eski) ÷ |eski| × 100. Oran her zaman eski değere göre hesaplanır.' + (eski < 0 ? ' Eski değer negatif olduğunda yüzde değişim yanıltıcı olabilir; farkı ayrıca değerlendirin.' : ''),
    };
  },
  cases: [
    { in: { eski: '200', yeni: '250' }, out: { 'Yüzde değişim': '%25 artış', 'Fark': '+50', 'Kat (yeni ÷ eski)': '1,25', 'Eski değere dönmek için': '%20 azalış' } },
    { in: { eski: '250', yeni: '200' }, out: { 'Yüzde değişim': '%20 azalış', 'Fark': '-50', 'Kat (yeni ÷ eski)': '0,8', 'Eski değere dönmek için': '%25 artış' } },
    { in: { eski: '50', yeni: '150' }, out: { 'Yüzde değişim': '%200 artış', 'Kat (yeni ÷ eski)': '3', 'Eski değere dönmek için': '%66,67 azalış' } },
    { in: { eski: '1200', yeni: '900' }, out: { 'Yüzde değişim': '%25 azalış', 'Fark': '-300', 'Eski değere dönmek için': '%33,33 artış' } },
    { in: { eski: '100', yeni: '100' }, out: { 'Yüzde değişim': '%0 (değişim yok)', 'Fark': '0', 'Kat (yeni ÷ eski)': '1' } },
    { in: { eski: '80', yeni: '92' }, out: { 'Yüzde değişim': '%15 artış', 'Fark': '+12', 'Kat (yeni ÷ eski)': '1,15' } },
    { in: { eski: '100', yeni: '0' }, out: { 'Yüzde değişim': '%100 azalış', 'Eski değere dönmek için': 'Hesaplanamaz (yeni değer 0)' } },
    { in: { eski: '12,5', yeni: '15' }, out: { 'Yüzde değişim': '%20 artış', 'Fark': '+2,5', 'Kat (yeni ÷ eski)': '1,2' } },
    { in: { eski: '-50', yeni: '-25' }, out: { 'Yüzde değişim': '%50 artış', 'Fark': '+25' } },
    { in: { eski: '0', yeni: '50' }, error: true },
    { in: { eski: 'abc', yeni: '50' }, error: true },
    { in: { eski: '100', yeni: '' }, error: true },
  ],
  howto: [
    '"Eski (başlangıç) değer" alanına karşılaştırmanın temel aldığı ilk değeri yazın: geçen ayki fiyat, geçen yılki ciro, diyet öncesi kilo gibi.',
    '"Yeni (son) değer" alanına güncel değeri yazın. Ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Hesapla" düğmesine basın. İlk satır değişimin yüzdesini ve yönünü (artış ya da azalış) gösterir.',
    'Alt satırlardan mutlak farkı, yeni değerin eskinin kaç katı olduğunu ve eski düzeye geri dönmek için gereken oranı okuyun.',
  ],
  sections: [
    { h: 'Yüzde değişim formülü', p: [
      'Yüzde değişim, bir büyüklüğün başlangıç değerine göre ne kadar değiştiğini gösterir. Formül şöyledir:',
      '<strong>Yüzde değişim = (yeni değer − eski değer) ÷ eski değer × 100</strong>',
      'Sonuç pozitifse artış, negatifse azalış vardır. Bölen her zaman <strong>eski değerdir</strong>, çünkü soru "başlangıca göre ne kadar değişti?" sorusudur. Formülün en sık karıştırılan yeri burasıdır: farkı yeni değere bölmek başka bir soruyu, "yeni değerin yüzde kaçı farktan oluşuyor?" sorusunu yanıtlar.',
    ] },
    { h: 'Adım adım çözümlü örnekler', ol: [
      '<strong>Fiyat artışı:</strong> 200 liralık ürün 250 lira olmuş. Fark 250 − 200 = 50. 50 ÷ 200 = 0,25 ve 0,25 × 100 = 25. Ürün %25 zamlanmıştır; yeni fiyat eskisinin 1,25 katıdır.',
      '<strong>İndirim:</strong> 1.200 liralık mont 900 liraya düşmüş. Fark 900 − 1.200 = −300. −300 ÷ 1.200 = −0,25. Fiyat %25 azalmıştır.',
      '<strong>Üç katına çıkma:</strong> aylık ziyaretçi sayısı 50\'den 150\'ye çıkmış. Fark 100, 100 ÷ 50 = 2. Artış %200\'dür. Değer üç katına çıkmıştır ama artış %300 değil %200\'dür, çünkü ilk %100 zaten başlangıç değerinin kendisidir.',
      '<strong>Küçük ondalıklı değerler:</strong> litre fiyatı 12,5 liradan 15 liraya çıkmış. Fark 2,5, 2,5 ÷ 12,5 = 0,2. Artış %20\'dir.',
    ] },
    { h: 'Artış ve azalış neden simetrik değildir?', p: [
      'Bir değer %25 artıp ardından %25 azalırsa başlangıca dönmez. 200 lira %25 artınca 250 olur; 250\'nin %25\'i 62,5 lira ettiğinden %25 düşüşle 187,5 liraya iner. Nedeni, ikinci yüzdenin daha büyük bir sayı üzerinden hesaplanmasıdır.',
      'Araçtaki "Eski değere dönmek için" satırı bu farkı gösterir. 200\'den 250\'ye çıkış %25 artıştır, ama 250\'den 200\'e dönmek için %20 azalış yeterlidir. Tersine, bir değer %50 düştüyse eski düzeyine gelmesi için %100 artması, yani ikiye katlanması gerekir. Yatırım ve fiyat takibinde bu ayrım önemlidir: yarı yarıya değer kaybeden bir varlığın yeniden %50 artması kaybı kapatmaz.',
    ] },
    { h: 'Yüzde değişim ile yüzde puan farkı', p: [
      'Değişen büyüklüğün kendisi bir yüzde olduğunda iki farklı ifade karışır. Bir oranın %10\'dan %15\'e çıkması <strong>5 yüzde puanlık</strong> bir artıştır; ama oransal olarak bakıldığında (15 − 10) ÷ 10 × 100 = <strong>%50</strong> artış vardır. İkisi de doğrudur, ancak farklı şeyler söyler. Faiz oranı, işsizlik oranı, oy oranı ya da KDV oranı gibi verilerden söz ederken hangisinin kastedildiğini belirtmek gerekir. Bu araç oransal değişimi hesaplar; puan farkı için iki oranı birbirinden çıkarmanız yeterlidir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Zam ve indirim:</strong> etiketteki eski ve yeni fiyattan gerçek indirim oranını doğrulamak.',
      '<strong>Maaş:</strong> yeni maaşın eskisine göre yüzde kaç arttığını görmek ve bunu fiyat artışlarıyla karşılaştırmak.',
      '<strong>İşletme:</strong> aylık ya da yıllık ciro, sipariş sayısı, müşteri sayısı ve maliyet kalemlerindeki değişimi raporlamak.',
      '<strong>Fatura takibi:</strong> elektrik, su ve doğal gaz tüketiminin geçen döneme göre değişimini izlemek.',
      '<strong>Sağlık ve spor:</strong> kilo, bel çevresi ya da koşu süresindeki değişimi oran olarak ifade etmek.',
      '<strong>Web ve sosyal medya:</strong> ziyaretçi, takipçi ve tıklama sayılarındaki büyümeyi ölçmek.',
    ] },
    { h: 'Özel durumlar ve sınırlar', p: [
      '<strong>Eski değer sıfırsa</strong> yüzde değişim tanımsızdır; sıfıra bölme yapılamaz. Sıfırdan 50\'ye çıkan bir satış "%sonsuz" artmış değildir; böyle durumlarda yalnızca mutlak fark söylenir. Araç bu girdide uyarı verir.',
      '<strong>Yeni değer sıfırsa</strong> değişim %100 azalıştır ve bu, bir büyüklüğün alabileceği en büyük azalıştır; pozitif bir değer %100\'den fazla azalamaz. Artış için ise üst sınır yoktur: bir değer %500 ya da %5.000 artabilir.',
      '<strong>Negatif değerlerde</strong> yorum güçleşir. Araç böleni mutlak değer olarak alır; böylece −50\'den −25\'e geçiş, sayı büyüdüğü için %50 artış olarak gösterilir. Zarardan kâra geçiş gibi işaret değiştiren durumlarda yüzde değişim anlamlı bir özet sunmaz; farkı tutar olarak belirtmek daha sağlıklıdır.',
      'Art arda gelen değişimler toplanmaz, çarpılır. Önce %10, sonra %20 artış toplamda %30 değil, 1,10 × 1,20 = 1,32 olduğundan %32 artış eder. Sonuçlar bilgilendirme amaçlıdır; mali kararlar için kendi kayıtlarınızı ve gerekirse bir uzmanın görüşünü esas alın.',
    ] },
  ],
  faq: [
    ['Yüzde değişim nasıl hesaplanır?', 'Yeni değerden eski değer çıkarılır, sonuç eski değere bölünür ve 100 ile çarpılır. 80\'den 92\'ye çıkan bir değer için (92 − 80) ÷ 80 × 100 = %15 artış bulunur.'],
    ['Yüzde artış ile yüzde azalış formülü farklı mı?', 'Hayır, formül aynıdır. Sonuç pozitif çıkarsa artış, negatif çıkarsa azalış olarak yorumlanır. Araç işareti kendisi yorumlar ve sonucu "artış" ya da "azalış" sözcüğüyle yazar.'],
    ['Farkı eski değere mi yeni değere mi bölmeliyim?', 'Eski değere. Yüzde değişim başlangıç noktasına göre tanımlanır. Yeni değere bölerseniz farklı bir oran elde edersiniz (artışlarda daha küçük, azalışlarda daha büyük); bu, değişim oranı değildir.'],
    ['Bir değer iki katına çıkarsa yüzde kaç artmış olur?', '%100 artmış olur. Üç katına çıkması %200, dört katına çıkması %300 artış demektir. Kat sayısından 1 çıkarıp 100 ile çarparak artış yüzdesini bulabilirsiniz.'],
    ['%50 düşen bir fiyatın eski hâline dönmesi için yüzde kaç artması gerekir?', '%100 artması gerekir. 100 liralık ürün %50 düşünce 50 lira olur; 50 liradan 100 liraya çıkmak ise ikiye katlanmak, yani %100 artış demektir.'],
    ['Eski değer sıfırken neden hesap yapılmıyor?', 'Formülde eski değere bölme vardır ve sıfıra bölme tanımsızdır. Sıfırdan başlayan bir büyüklükte değişim yalnızca mutlak fark olarak ifade edilebilir.'],
    ['Yüzde değişim ile yüzde fark aynı şey mi?', 'Değildir. Yüzde değişimde bir başlangıç ve bir bitiş vardır, bölen başlangıç değeridir. Yüzde farkta ise iki değerden hiçbiri temel alınmaz ve fark, iki değerin ortalamasına bölünür.'],
    ['Girdiğim rakamlar saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez, kaydedilmez ve başkasıyla paylaşılmaz.'],
  ],
  related: ['yuzde-hesapla', 'yuzde-fark-hesapla', 'zam-orani-hesapla', 'indirim-orani-hesapla', 'enflasyon-hesapla', 'binde-hesapla'],
};
