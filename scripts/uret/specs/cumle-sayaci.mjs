export default {
  slug: 'cumle-sayaci',
  title: 'Cümle Sayacı',
  h1Tail: 'metindeki cümleleri sayın',
  pageTitle: 'Cümle Sayacı – Metindeki Cümle Sayısını ve Ortalamasını Bulun',
  description: 'Metninizdeki cümle sayısını, cümle başına ortalama kelimeyi, en uzun ve en kısa cümleyi, soru ve ünlem cümlelerini anında sayın. Kısaltmalar dikkate alınır.',
  card: 'Metindeki cümleleri sayın; ortalama cümle uzunluğunu, en uzun cümleyi, soru ve ünlem cümlelerini görün.',
  category: 'metin',
  keywords: ['cümle sayacı', 'cümle sayısı bulma', 'metinde kaç cümle var', 'cümle sayma', 'ortalama cümle uzunluğu', 'cümle sayısı hesaplama', 'online cümle sayacı'],
  lead: 'Metninizi yapıştırın, kaç cümleden oluştuğunu hemen görün. Araç yalnızca noktaları saymaz; <strong>Dr.</strong> gibi kısaltmaları, <strong>3.5</strong> gibi ondalık sayıları ve <strong>2. kat</strong> gibi sıra sayılarını cümle sonu saymamaya çalışır, ayrıca ortalama cümle uzunluğunu verir.',
  button: 'Say',
  inputs: [
    { id: 'metin', label: 'Metin', type: 'textarea', placeholder: 'Cümlelerini saymak istediğiniz metni buraya yazın ya da yapıştırın', wide: true },
  ],
  compute(v, h) {
    const s = String(v.metin ?? '');
    if (s.trim() === '') h.err('Cümlelerini saymak için "Metin" alanına bir metin yazın ya da yapıştırın.');
    const kisaltma = new Set(['dr', 'prof', 'doç', 'yrd', 'av', 'sn', 'uzm', 'öğr', 'gör', 'müh', 'bkz', 'örn']);
    const re = /[.!?…]+["'”’»)\]]*(?=\s|$)/g;
    const kelimeSay = (t) => t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    const cumleler = [];
    let bas = 0, m;
    while ((m = re.exec(s)) !== null) {
      const son = m.index + m[0].length;
      const isaret = m[0];
      const kalan = s.slice(son);
      const sonraki = (/\S/.exec(kalan) || [''])[0];
      // Sonraki sözcük küçük harfle başlıyorsa cümle sürüyor demektir (3. sınıf, vb. gibi)
      if (sonraki && /\p{Ll}/u.test(sonraki)) continue;
      if (/^\.["'”’»)\]]*$/.test(isaret)) {
        const onceki = (/([\p{L}\p{N}]+)$/u.exec(s.slice(bas, m.index)) || ['', ''])[1];
        if (kisaltma.has(onceki.toLocaleLowerCase('tr'))) continue;
        if (onceki.length === 1 && /\p{Lu}/u.test(onceki)) continue; // ad baş harfi: A. Yılmaz
      }
      const parca = s.slice(bas, son).trim();
      bas = son;
      if (/[\p{L}\p{N}]/u.test(parca)) cumleler.push({ t: parca, tur: isaret.includes('?') ? 'soru' : isaret.includes('!') ? 'unlem' : 'duz' });
    }
    const artan = s.slice(bas).trim();
    if (/[\p{L}\p{N}]/u.test(artan)) cumleler.push({ t: artan, tur: 'duz' });
    if (!cumleler.length) h.err('Metinde harf ya da rakam bulunamadı. Sayılacak en az bir cümle yazın.');
    const uz = cumleler.map((c) => kelimeSay(c.t));
    const toplam = uz.reduce((a, b) => a + b, 0);
    const enUzun = Math.max(...uz), enKisa = Math.min(...uz);
    const say = (tur) => cumleler.filter((c) => c.tur === tur).length;
    return {
      rows: [
        ['Cümle sayısı', h.fmt(cumleler.length, 0)],
        ['Kelime sayısı', h.fmt(toplam, 0)],
        ['Cümle başına ortalama kelime', h.fmt(toplam / cumleler.length, 2)],
        ['En uzun cümle', `${h.fmt(enUzun, 0)} kelime (${uz.indexOf(enUzun) + 1}. cümle)`],
        ['En kısa cümle', `${h.fmt(enKisa, 0)} kelime (${uz.indexOf(enKisa) + 1}. cümle)`],
        ['Düz cümle', h.fmt(say('duz'), 0)],
        ['Soru cümlesi', h.fmt(say('soru'), 0)],
        ['Ünlem cümlesi', h.fmt(say('unlem'), 0)],
      ],
      note: 'Cümle sonu; nokta, soru işareti, ünlem ya da üç noktadan sonra boşluk gelmesiyle belirlenir. Ardından küçük harfle devam eden yerler ve yaygın unvan kısaltmaları cümle sonu sayılmaz.',
    };
  },
  cases: [
    { in: { metin: 'Merhaba dünya. Bugün hava çok güzel! Sen nasılsın?' }, out: { 'Cümle sayısı': '3', 'Kelime sayısı': '8', 'Cümle başına ortalama kelime': '2,67', 'Soru cümlesi': '1', 'Ünlem cümlesi': '1', 'Düz cümle': '1' } },
    { in: { metin: 'Dr. Ayşe saat 3.5 gibi geldi. Toplantı 2. katta yapıldı.' }, out: { 'Cümle sayısı': '2', 'Kelime sayısı': '10', 'Cümle başına ortalama kelime': '5', 'En uzun cümle': '6 kelime (1. cümle)', 'En kısa cümle': '4 kelime (2. cümle)' } },
    { in: { metin: 'Nokta kullanmadan yazılmış kısa bir not' }, out: { 'Cümle sayısı': '1', 'Kelime sayısı': '6' } },
    { in: { metin: 'Bekle... Geliyorum.' }, out: { 'Cümle sayısı': '2', 'Kelime sayısı': '2' } },
    { in: { metin: 'Ne dedin?! Duymadım.' }, out: { 'Cümle sayısı': '2', 'Soru cümlesi': '1', 'Ünlem cümlesi': '0' } },
    { in: { metin: '"Gel!" dedi annesi. Çocuk koştu.' }, out: { 'Cümle sayısı': '2', 'Ünlem cümlesi': '0', 'Düz cümle': '2' } },
    { in: { metin: 'Kitabı A. Yılmaz yazdı. Yayın yılı 2020.\nİkinci baskı tükendi.' }, out: { 'Cümle sayısı': '3', 'Kelime sayısı': '10' } },
    { in: { metin: '' }, error: true },
    { in: { metin: '... !!! ???' }, error: true },
  ],
  howto: [
    'Cümlelerini saymak istediğiniz metni "Metin" kutusuna yazın ya da başka bir belgeden kopyalayıp yapıştırın.',
    '"Say" düğmesine basın. İlk satırda toplam cümle sayısını, altında kelime sayısını ve cümle başına ortalama kelimeyi görürsünüz.',
    '"En uzun cümle" satırındaki sıra numarasına bakarak metninizde bölmeniz gerekebilecek cümleyi bulun.',
    'Metni düzelttikten sonra yeniden sayın; sonuçları "Sonucu kopyala" düğmesiyle raporunuza ya da notlarınıza aktarabilirsiniz.',
  ],
  sections: [
    { h: 'Cümle nasıl sayılır?', p: [
      'Bir metindeki cümleleri saymanın en kaba yolu noktaları saymaktır; ama bu yöntem hemen yanılır. "Dr. Ayşe saat 3.5 gibi geldi." cümlesinde üç nokta vardır, cümle ise tektir. Bu araç bu yüzden yalnızca işarete değil, işaretin çevresine de bakar. Bir nokta, soru işareti, ünlem ya da üç nokta ancak ardından boşluk, satır sonu ya da metnin sonu geliyorsa cümle sonu adayı olur. Böylece <code>3.5</code>, <code>12.03.2024</code> ya da bir dosya adındaki nokta sayıma girmez.',
      'İkinci denetim, işaretten sonra gelen ilk harftir. Türkçede cümleler büyük harfle başladığı için, noktadan sonra küçük harfle devam eden yerler cümle sonu kabul edilmez. "Toplantı 2. katta yapıldı" ya da "elma, armut vb. meyveler" gibi yazımlar bu sayede tek cümle olarak kalır. Üçüncü denetim ise unvan kısaltmalarıdır: Dr., Prof., Doç., Av., Sn., Uzm., Müh. gibi kısaltmalardan ve "A. Yılmaz" biçimindeki ad baş harflerinden sonra büyük harf gelse bile cümle bölünmez.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Şu metni ele alalım: <em>"Merhaba dünya. Bugün hava çok güzel! Sen nasılsın?"</em> İlk cümle iki, ikinci cümle dört, üçüncü cümle iki kelimedir. Araç 3 cümle ve 8 kelime bulur; ortalama 8 ÷ 3 = 2,67 kelimedir. Cümlelerden biri nokta ile bittiği için düz, biri ünlem, biri soru cümlesi olarak sınıflanır. En uzun cümle 4 kelimeyle ikinci cümledir.',
      'İkinci örnek: <em>"Dr. Ayşe saat 3.5 gibi geldi. Toplantı 2. katta yapıldı."</em> Burada beş nokta bulunur, fakat araç 2 cümle sayar. İlk cümle 6, ikinci cümle 4 kelimedir; toplam 10 kelime ve ortalama 5 kelime çıkar.',
    ] },
    { h: 'Ortalama cümle uzunluğu neden önemlidir?', p: [
      'Cümle başına düşen kelime sayısı, bir metnin ne kadar rahat okunduğuna dair en basit göstergelerden biridir. Çok uzun cümleler okuyucunun özneyi ve yüklemi aklında tutmasını zorlaştırır; hep çok kısa cümleler ise metni kesik kesik ve çocuksu gösterebilir. Türkçe sondan eklemeli bir dil olduğu için tek bir kelime İngilizcedeki birkaç kelimenin işini görür; bu yüzden Türkçe metinlerde ortalama cümle uzunluğu genellikle İngilizce metinlere göre daha düşük çıkar. Başka dillerden alınan "ideal cümle uzunluğu" ölçülerini Türkçeye doğrudan uygulamak doğru olmaz.',
      'Kesin bir sınır yoktur, ancak pratik bir öneri şudur: genel okuyucuya yazılan haber, blog ve bilgilendirme metinlerinde ortalamanın çok yükselmesi cümleleri bölme zamanının geldiğini gösterir. Akademik ve hukuki metinlerde ortalama doğal olarak daha yüksektir. Sayıyı tek başına bir hedef olarak değil, "en uzun cümle" satırıyla birlikte bir uyarı ışığı olarak kullanın.',
    ] },
    { h: 'Kimler kullanır?', ul: [
      '<strong>Öğrenciler:</strong> "en az on cümlelik paragraf" gibi ödev koşullarını denetlemek için.',
      '<strong>Öğretmenler:</strong> kompozisyon ve yazılı anlatım çalışmalarında cümle sayısını hızlıca görmek için.',
      '<strong>İçerik yazarları ve editörler:</strong> okunabilirliği izlemek, uzun cümleleri bulup bölmek için.',
      '<strong>Çevirmenler:</strong> kaynak ve hedef metnin cümle sayılarını karşılaştırıp atlanan cümle olup olmadığını sınamak için.',
      '<strong>Konuşma ve sunum hazırlayanlar:</strong> nefes aralıklarını planlamak, tek solukta okunamayacak cümleleri ayıklamak için.',
    ] },
    { h: 'Sınırlar ve sık karşılaşılan durumlar', p: [
      'Cümle saymak dil bilgisi açısından her zaman kesin bir iş değildir; araç bir kural kümesi uygular ve bazı durumlarda sizin sayımınızdan farklı sonuç verebilir. Bilmeniz gerekenler şunlardır:',
    ], ul: [
      'Noktadan sonra boşluk bırakılmamışsa ("Geldim.Gördüm.") iki cümle tek cümle sayılır. Yazım kuralı gereği noktalama işaretinden sonra boşluk bırakın.',
      'Sonunda noktalama işareti olmayan başlıklar ve madde satırları, kendilerinden sonra gelen cümleyle birleşebilir. Başlıkları sayım dışında tutmak için metinden çıkarın.',
      'Cümle sonunda kullanılan "vb." kısaltmasından sonra büyük harfle yeni cümle başlıyorsa doğru biçimde bölünür; ancak listede olmayan bir kısaltmadan sonra özel ad geliyorsa ("Mah. Bahçelievler") fazladan bir cümle sayılabilir.',
      'Tırnak içindeki konuşma ("Gel!" dedi annesi.) tırnaktan sonra küçük harfle sürdüğü için ayrı cümle sayılmaz; cümlenin türü de sondaki işarete göre belirlenir.',
      'Yalnızca noktalama işaretinden oluşan parçalar cümle kabul edilmez; içinde en az bir harf ya da rakam bulunmalıdır.',
    ] },
  ],
  faq: [
    ['Cümle sayısı nasıl hesaplanıyor?', 'Metin; nokta, soru işareti, ünlem ve üç nokta gibi cümle sonu işaretlerinden bölünür. İşaretten sonra boşluk ya da satır sonu gelmiyorsa, ardından küçük harfle devam ediliyorsa ya da işaret bir unvan kısaltmasına aitse orası cümle sonu sayılmaz.'],
    ['Sonunda nokta olmayan metin cümle sayılır mı?', 'Evet. Son cümle sonu işaretinden sonra kalan ve içinde harf ya da rakam bulunan bölüm bir cümle olarak sayılır. Hiç noktalama içermeyen kısa bir not bu yüzden 1 cümle olarak görünür.'],
    ['Üç nokta kaç cümle sayılır?', 'Art arda gelen işaretler tek bir cümle sonu kabul edilir. "Bekle... Geliyorum." metni iki cümledir. Üç noktadan sonra küçük harfle devam ediliyorsa cümle bölünmez.'],
    ['Soru ve ünlem cümleleri nasıl ayrılıyor?', 'Cümlenin sonundaki işarete bakılır. İçinde soru işareti olan bitişler soru cümlesi, yalnızca ünlem içerenler ünlem cümlesi, diğerleri düz cümle sayılır. "?!" ile biten cümle soru cümlesi olarak sınıflanır.'],
    ['Ondalık sayılar ve tarihler sayımı bozar mı?', 'Hayır. 3.5, 1.250 ya da 12.03.2024 gibi yazımlarda noktadan sonra boşluk bulunmadığı için bunlar cümle sonu olarak değerlendirilmez.'],
    ['Kelime sayısı neye göre bulunuyor?', 'Boşluklarla ayrılmış ve içinde en az bir harf ya da rakam bulunan her parça bir kelime sayılır. Tek başına duran tire ya da noktalama işaretleri kelime sayılmaz.'],
    ['İngilizce ya da başka dilde metin sayabilir miyim?', 'Evet. Kurallar noktalama ve büyük-küçük harf ayrımına dayandığı için Latin alfabesi kullanan dillerde çalışır. Kısaltma listesi Türkçe unvanlara göre hazırlandığından "Mr." gibi yabancı kısaltmalarda fazladan cümle sayılabilir.'],
    ['Yapıştırdığım metin bir yere kaydediliyor mu?', 'Hayır. Sayım tümüyle tarayıcınızda yapılır; metniniz sunucuya gönderilmez, saklanmaz. Sayfayı kapattığınızda metin de silinir.'],
  ],
  related: ['kelime-sayaci', 'karakter-sayaci', 'paragraf-sayaci', 'okuma-suresi-hesapla', 'metin-istatistikleri'],
};
