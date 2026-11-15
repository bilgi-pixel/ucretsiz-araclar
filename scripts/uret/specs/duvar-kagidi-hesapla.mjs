export default {
  slug: 'duvar-kagidi-hesapla',
  title: 'Duvar Kâğıdı Hesaplama',
  h1Tail: 'kaç rulo gerekir?',
  pageTitle: 'Duvar Kâğıdı Hesaplama – Odaya Kaç Rulo Duvar Kâğıdı Gerekir?',
  description: 'Oda çevresi ve duvar yüksekliğinden kaç rulo duvar kâğıdı gerektiğini hesaplayın. Rulo ölçüsü, desen tekrarı ve kapı pencere boşlukları dikkate alınır.',
  card: 'Oda çevresi, yükseklik, rulo ölçüsü ve desen tekrarına göre gereken duvar kâğıdı rulo ve şerit sayısını bulun.',
  category: 'insaat',
  keywords: ['duvar kağıdı hesaplama', 'kaç rulo duvar kağıdı', 'duvar kağıdı rulo hesabı', 'duvar kağıdı metrekare', 'desen tekrarı hesaplama', 'duvar kağıdı şerit sayısı', '1 rulo duvar kağıdı kaç m2'],
  lead: 'Kaplanacak duvarların toplam uzunluğunu ve yüksekliğini yazın; araç rulo ölçüsüne ve desen tekrarına göre <strong>kaç şerit</strong> ve <strong>kaç rulo duvar kâğıdı</strong> gerektiğini şerit yöntemiyle hesaplasın.',
  button: 'Hesapla',
  inputs: [
    { id: 'cevre', label: 'Kaplanacak duvar uzunluğu (m)', type: 'number', placeholder: 'Örn. 16', hint: 'Tüm oda için oda çevresini, tek duvar için o duvarın genişliğini yazın.' },
    { id: 'yukseklik', label: 'Duvar yüksekliği (m)', type: 'number', placeholder: 'Örn. 2,6' },
    { id: 'dusulen', label: 'Düşülecek kapı ve pencere genişliği (m)', type: 'number', value: '0', hint: 'Emin değilseniz 0 bırakın; küçük boşlukları düşmemek daha güvenlidir.' },
    { id: 'ruloEn', label: 'Rulo eni (cm)', type: 'number', value: '53' },
    { id: 'ruloBoy', label: 'Rulo boyu (m)', type: 'number', value: '10,05' },
    { id: 'desen', label: 'Desen tekrarı (cm)', type: 'number', value: '0', hint: 'Düz ya da desen uydurma gerektirmeyen kâğıtlarda 0.' },
  ],
  compute(v, h) {
    const cevre = h.pos(v.cevre, 'Kaplanacak duvar uzunluğu');
    const yuk = h.pos(v.yukseklik, 'Duvar yüksekliği');
    const dus = h.nonneg(v.dusulen, 'Düşülecek kapı ve pencere genişliği');
    const ruloEn = h.pos(v.ruloEn, 'Rulo eni');
    const ruloBoy = h.pos(v.ruloBoy, 'Rulo boyu');
    const desen = h.nonneg(v.desen, 'Desen tekrarı');
    if (dus >= cevre) h.err('Düşülecek genişlik, kaplanacak duvar uzunluğundan küçük olmalı.');
    const net = cevre - dus;
    const serit = Math.ceil(net / (ruloEn / 100) - 1e-9);
    const seritBoy = yuk + 0.1 + desen / 100;
    const cikan = Math.floor(ruloBoy / seritBoy + 1e-9);
    if (cikan < 1) h.err('Bir şeridin boyu rulo boyundan uzun çıkıyor. Duvar yüksekliğini metre, desen tekrarını santimetre olarak yazdığınızı kontrol edin.');
    const rulo = Math.ceil(serit / cikan);
    return {
      rows: [
        ['Rulo sayısı', h.fmt(rulo, 0) + ' rulo'],
        ['Şerit sayısı', h.fmt(serit, 0) + ' şerit'],
        ['Şerit boyu (paylar dahil)', h.fmt(seritBoy, 2) + ' m'],
        ['Bir rulodan çıkan şerit', h.fmt(cikan, 0) + ' şerit'],
        ['Yedek kalan şerit', h.fmt(rulo * cikan - serit, 0) + ' şerit'],
        ['Kaplanacak duvar alanı', h.fmt(net * yuk, 2) + ' m²'],
      ],
      note: 'Her şeride alt ve üst kesim için toplam 10 cm, desenli kâğıtlarda ayrıca bir desen tekrarı kadar pay eklenir.',
    };
  },
  cases: [
    { in: { cevre: '16', yukseklik: '2,6', dusulen: '0', ruloEn: '53', ruloBoy: '10,05', desen: '0' }, out: { 'Rulo sayısı': '11 rulo', 'Şerit sayısı': '31 şerit', 'Şerit boyu (paylar dahil)': '2,7 m', 'Bir rulodan çıkan şerit': '3 şerit', 'Yedek kalan şerit': '2 şerit', 'Kaplanacak duvar alanı': '41,6 m²' } },
    { in: { cevre: '14', yukseklik: '2,5', dusulen: '2', ruloEn: '53', ruloBoy: '10,05', desen: '0' }, out: { 'Rulo sayısı': '8 rulo', 'Şerit sayısı': '23 şerit', 'Şerit boyu (paylar dahil)': '2,6 m', 'Kaplanacak duvar alanı': '30 m²' } },
    { in: { cevre: '16', yukseklik: '2,4', dusulen: '0', ruloEn: '53', ruloBoy: '10,05', desen: '0' }, out: { 'Rulo sayısı': '8 rulo', 'Bir rulodan çıkan şerit': '4 şerit', 'Yedek kalan şerit': '1 şerit' } },
    { in: { cevre: '16', yukseklik: '2,4', dusulen: '0', ruloEn: '53', ruloBoy: '10,05', desen: '32' }, out: { 'Rulo sayısı': '11 rulo', 'Şerit boyu (paylar dahil)': '2,82 m', 'Bir rulodan çıkan şerit': '3 şerit' } },
    { in: { cevre: '20', yukseklik: '2,8', dusulen: '0', ruloEn: '106', ruloBoy: '10', desen: '0' }, out: { 'Rulo sayısı': '7 rulo', 'Şerit sayısı': '19 şerit', 'Bir rulodan çıkan şerit': '3 şerit' } },
    { in: { cevre: '10,6', yukseklik: '2,4', dusulen: '0', ruloEn: '53', ruloBoy: '10,05', desen: '0' }, out: { 'Rulo sayısı': '5 rulo', 'Şerit sayısı': '20 şerit', 'Yedek kalan şerit': '0 şerit' } },
    { in: { cevre: '', yukseklik: '2,6' }, error: true },
    { in: { cevre: '16', yukseklik: '12' }, error: true },
    { in: { cevre: '4', yukseklik: '2,6', dusulen: '5' }, error: true },
  ],
  howto: [
    'Kaplanacak duvarların toplam uzunluğunu metre olarak yazın. Bütün oda kaplanacaksa bu değer oda çevresidir.',
    'Duvar yüksekliğini süpürgelik üstünden tavana (ya da kartonpiyere) kadar ölçüp girin.',
    'Kapı ve pencere gibi kâğıt yapıştırılmayacak geniş boşlukların toplam genişliğini isterseniz düşün.',
    'Rulo enini, rulo boyunu ve varsa desen tekrarını rulonun etiketinden okuyup yazın.',
    '"Hesapla" düğmesine basın; rulo sayısı, şerit sayısı ve bir rulodan çıkan şerit adedi görüntülenir.',
  ],
  sections: [
    { h: 'Neden alan yerine şerit sayısıyla hesap yapılır?', p: [
      'Duvar kâğıdı ihtiyacını duvar alanını rulo alanına bölerek bulmak akla ilk gelen yoldur, ancak çoğu zaman eksik sonuç verir. Kâğıt tavandan süpürgeliğe kesintisiz inen şeritler halinde yapıştırılır; bir rulonun sonunda kalan ve duvar yüksekliğinden kısa olan parça kullanılamaz. Yani rulonun bir bölümü kaçınılmaz olarak artar ve alan hesabı bu artığı görmez.',
      'Doğru yöntem şerit saymaktır. Önce duvar boyunca yan yana kaç şerit gerektiği bulunur: <strong>şerit sayısı = kaplanacak uzunluk ÷ rulo eni</strong>, yukarı yuvarlanır. Sonra bir rulodan kaç tam şerit çıktığı hesaplanır: <strong>rulo boyu ÷ şerit boyu</strong>, aşağı yuvarlanır. Rulo sayısı, şerit sayısının bir rulodan çıkan şerit adedine bölünüp yukarı yuvarlanmasıyla elde edilir.',
    ] },
    { h: 'Şerit boyu ve desen tekrarı', p: [
      'Şerit boyu duvar yüksekliğinden biraz fazla kesilir; tavan ve süpürgelik hizasında düzgün bir bitiş için fazlalık maket bıçağıyla alınır. Araç her şeride toplam <strong>10 cm</strong> kesim payı ekler.',
      'Desenli kâğıtlarda yan yana gelen şeritlerde desenin aynı hizaya denk gelmesi gerekir. Bunun için her şeritte en fazla bir desen tekrarı kadar kâğıt kaydırılarak harcanabilir. Desen tekrarı, aynı motifin kâğıt boyunca kaç santimetrede bir yinelendiğini gösterir ve etikette yazar. Araç güvenli tarafta kalmak için her şeride bir tam tekrar boyu ekler. Düz renkli ya da serbest eşleşmeli kâğıtlarda bu değer sıfırdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Çevresi 16 m, duvar yüksekliği 2,6 m olan bir oda, 53 cm eninde ve 10,05 m boyunda rulolarla kaplanacak olsun. Şerit sayısı 16 ÷ 0,53 = 30,2, yani <strong>31 şerit</strong> eder. Şerit boyu 2,6 + 0,1 = 2,7 m olur. Bir rulodan 10,05 ÷ 2,7 = 3,7, yani <strong>3 tam şerit</strong> çıkar. Rulo sayısı 31 ÷ 3 = 10,3, yukarı yuvarlanınca <strong>11 rulo</strong> bulunur ve 2 şerit yedek kalır.',
      'Aynı odayı alan yöntemiyle hesaplasaydık duvar alanı 41,6 m², bir rulonun alanı yaklaşık 5,3 m² olduğundan 8 rulo yeterli görünürdü. Aradaki üç ruloluk fark, her rulonun sonunda kalan ve kullanılamayan yaklaşık iki metrelik parçalardan kaynaklanır.',
      'Yükseklik 2,4 m olsaydı şerit boyu 2,5 m olur, bir rulodan 4 şerit çıkar ve 8 rulo yeterdi. Aynı odada 32 cm desen tekrarlı bir kâğıt seçilirse şerit boyu 2,82 m olur, rulodan yine 3 şerit çıkar ve ihtiyaç 11 ruloya yükselir. Yüksekliğin ve desenin sonucu nasıl sıçrattığı bu örnekte açıkça görülür.',
    ] },
    { h: 'Kapı ve pencereleri düşmeli miyim?', p: [
      'Kapı ve pencere üstlerine ve altlarına da kâğıt yapıştırılır; bu parçalar çoğu zaman tam şeritlerden kesilir. Bu yüzden boşlukları tümüyle düşmek eksik malzemeye yol açabilir. Yaygın uygulama, yalnızca balkon kapısı ya da boydan boya pencere gibi geniş açıklıkları düşmek, standart bir oda kapısını ise hesaba katmamaktır. Kararsızsanız düşülecek genişliği sıfır bırakın; bir rulo fazla almak, aynı partiden sonradan rulo aramaktan daha az sorun çıkarır.',
    ] },
    { h: 'Rulo ölçüleri hakkında', p: [
      'Piyasada en sık rastlanan rulo 53 cm eninde ve yaklaşık 10 m boyundadır; bunun yanında 70 cm ve 106 cm eninde, daha uzun rulolar da bulunur. Geniş rulolarda şerit sayısı azalır ve ek yeri daha az görünür, ancak tek kişinin uygulaması zorlaşır. Ölçüler üreticiye göre değiştiği için varsayılan değerlere güvenmek yerine satın alacağınız ürünün etiketini okuyun.',
    ], ul: [
      'Aynı desenin farklı üretim partilerinde renk tonu değişebilir; tüm ruloları aynı parti numarasından alın.',
      'Tavan eğimli ya da merdiven boşluğundaysa en yüksek noktayı duvar yüksekliği olarak girin.',
      'Tek duvar kaplanacaksa uzunluk alanına yalnızca o duvarın genişliğini yazın.',
      'İç ve dış köşelerde şerit bölünerek döndürülür; çok köşeli odalarda bir rulo fazla almak akıllıcadır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç dik ve eşit yükseklikte duvarlar varsayar; şeritlerin köşelerde bölünmesi, kaydırmalı (yarım atlamalı) desenler ve eğik tavanlar ayrıca hesaba katılmaz. Sonuç sipariş için sağlam bir tahmindir, ancak karmaşık mekânlarda uygulayıcının yerinde yaptığı ölçüm önceliklidir.',
    ] },
  ],
  faq: [
    ['1 rulo duvar kâğıdı kaç metrekare kaplar?', '53 cm × 10,05 m ölçüsündeki bir rulonun alanı yaklaşık 5,3 m² eder. Ancak kullanılabilir alan daha azdır: 2,6 m yükseklikte rulodan 3 şerit çıkar ve yaklaşık 4,1 m² duvar kaplanır; kalan parça artar.'],
    ['12 m² oda için kaç rulo duvar kâğıdı gerekir?', 'Rulo ihtiyacı taban alanına değil duvarlara bağlıdır. 3 × 4 m ölçüsünde bir odanın çevresi 14 m\'dir; 2,6 m yükseklik ve 53 cm rulo eniyle 27 şerit, yani 9 rulo gerekir.'],
    ['Desen tekrarı nedir, nereden öğrenirim?', 'Motifin kâğıt boyunca kaç santimetrede bir yinelendiğini gösteren değerdir ve rulo etiketinde yazar. Desen ne kadar büyükse şeritleri hizalamak için o kadar çok kâğıt harcanır.'],
    ['Sonuç satıcının söylediğinden fazla çıktı, neden?', 'Alan üzerinden yapılan kaba hesaplar rulo sonunda artan parçaları saymaz. Şerit yöntemi bu artığı hesaba kattığı için genellikle bir iki rulo fazla sonuç verir ve uygulamada daha gerçekçidir.'],
    ['Yedek rulo almalı mıyım?', 'Sonuçtaki yedek şerit sayısı sıfır ya da bir ise bir rulo fazla almak iyi olur. Yırtılan, yanlış kesilen ya da ileride hasar gören bir şeridi aynı partiden kâğıtla değiştirebilirsiniz.'],
    ['Tavan için de kullanabilir miyim?', 'Evet. Uzunluk alanına tavanın şeritlere dik kenarını, yükseklik alanına şeritlerin uzanacağı kenarı yazın. Mantık aynıdır: yan yana kaç şerit ve her biri ne kadar uzun.'],
    ['Geniş rulo almak daha mı ekonomik?', 'Şerit sayısı azalır, fakat rulo fiyatı da yüksektir. İki seçeneği bu araçla ayrı ayrı hesaplayıp rulo sayısını fiyatla çarparak karşılaştırabilirsiniz.'],
    ['Girdiğim oda ölçüleri saklanıyor mu?', 'Hayır. Hesaplama yalnızca tarayıcınızda çalışır; ölçüleriniz hiçbir sunucuya gönderilmez.'],
  ],
  related: ['boya-fayans-hesapla', 'duvar-alani-hesapla', 'parke-hesapla', 'tavan-kartonpiyer-hesapla', 'alan-cevre-hesapla'],
};
