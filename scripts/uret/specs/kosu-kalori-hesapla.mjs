export default {
  slug: 'kosu-kalori-hesapla',
  title: 'Koşuda Yakılan Kalori Hesaplama',
  h1Tail: 'mesafe, süre ve kiloya göre',
  pageTitle: 'Koşuda Yakılan Kalori Hesaplama – Mesafe ve Süreye Göre',
  description: 'Koşu mesafenizi, sürenizi ve kilonuzu yazın; yakılan kaloriyi, MET değerini, tempoyu ve kilometre başına harcanan enerjiyi eğim dahil hesaplayın.',
  card: 'Koşu mesafesi, süre, kilo ve eğime göre yakılan kaloriyi, MET değerini ve tempoyu hesaplayın.',
  category: 'saglik',
  keywords: ['koşuda yakılan kalori', 'koşu kalori hesaplama', '5 km koşu kaç kalori', '10 km koşu kalori', 'koşu bandı kalori', 'yarım saat koşu kaç kalori', 'koşu MET değeri'],
  lead: `Koştuğunuz mesafeyi, süreyi ve vücut ağırlığınızı girin; araç koşu hızınızdan oksijen tüketimini tahmin ederek <strong>yakılan toplam kaloriyi</strong>, MET değerini, temponuzu ve kilometre başına harcadığınız enerjiyi gösterir. Koşu bandındaki ya da yokuştaki eğimi de hesaba katabilirsiniz.`,
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Vücut ağırlığı (kg)', type: 'number', placeholder: 'Örn. 70' },
    { id: 'mesafe', label: 'Koşu mesafesi (km)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'sure', label: 'Süre (dakika)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'egim', label: 'Eğim (%)', type: 'number', value: '0', hint: 'Düz zemin için 0 bırakın. Koşu bandındaki eğim değerini yazabilirsiniz.' },
  ],
  compute(v, h) {
    const kg = h.pos(v.kilo, 'Vücut ağırlığı');
    const km = h.pos(v.mesafe, 'Koşu mesafesi');
    const dk = h.pos(v.sure, 'Süre');
    const egim = h.opt(v.egim, 0, 'Eğim');
    if (kg < 25 || kg > 250) h.err('Vücut ağırlığı 25 ile 250 kg arasında olmalı.');
    if (egim < 0 || egim > 15) h.err('Eğim 0 ile 15 arasında olmalı. İniş eğimi için bu formül geçerli değildir.');
    const hiz = (km * 1000) / dk; // m/dk
    const kmh = (km / dk) * 60;
    if (kmh < 6) h.err('Ortalama hız 6 km/sa altında kalıyor; bu yürüyüş temposudur. Mesafe ve süreyi kontrol edin ya da yürüyüş aracını kullanın.');
    if (kmh > 25) h.err('Ortalama hız 25 km/sa üzerinde çıkıyor. Mesafeyi kilometre, süreyi dakika olarak yazdığınızdan emin olun.');
    const vo2 = 0.2 * hiz + 0.9 * hiz * (egim / 100) + 3.5; // ml/kg/dk
    const kcal = (vo2 * kg * dk) / 200;
    const net = ((vo2 - 3.5) * kg * dk) / 200;
    const tempoSn = Math.round((dk / km) * 60);
    const tempo = `${Math.floor(tempoSn / 60)}:${String(tempoSn % 60).padStart(2, '0')}`;
    return {
      rows: [
        ['Yakılan kalori', h.fmt(kcal, 0) + ' kcal'],
        ['Net kalori (dinlenme hariç)', h.fmt(net, 0) + ' kcal'],
        ['Ortalama hız', h.fmt(kmh, 2) + ' km/sa'],
        ['Tempo', tempo + ' dk/km'],
        ['MET değeri', h.fmt(vo2 / 3.5, 1)],
        ['Kilometre başına', h.fmt(kcal / km, 1) + ' kcal'],
        ['Dakika başına', h.fmt(kcal / dk, 1) + ' kcal'],
      ],
      note: 'Tahmin, koşu için kullanılan metabolik denkleme dayanır; kişisel verim, rüzgâr, zemin ve sıcaklık sonucu yüzde 10–15 kadar değiştirebilir.',
    };
  },
  cases: [
    { in: { kilo: '70', mesafe: '10', sure: '50', egim: '0' }, out: { 'Yakılan kalori': '761 kcal', 'Net kalori (dinlenme hariç)': '700 kcal', 'Ortalama hız': '12 km/sa', 'Tempo': '5:00 dk/km', 'MET değeri': '12,4' } },
    { in: { kilo: '80', mesafe: '5', sure: '30', egim: '0' }, out: { 'Yakılan kalori': '442 kcal', 'Ortalama hız': '10 km/sa', 'Tempo': '6:00 dk/km' } },
    { in: { kilo: '60', mesafe: '21,0975', sure: '120' }, out: { 'Yakılan kalori': '1.392 kcal', 'Tempo': '5:41 dk/km' } },
    { in: { kilo: '75', mesafe: '5', sure: '30', egim: '5' }, out: { 'Yakılan kalori': '499 kcal', 'MET değeri': '12,7' } },
    { in: { kilo: '70', mesafe: '10', sure: '60', egim: '0' }, out: { 'Net kalori (dinlenme hariç)': '700 kcal', 'MET değeri': '10,5' } },
    { in: { kilo: '90', mesafe: '3', sure: '20', egim: '1' }, out: { 'Ortalama hız': '9 km/sa', 'Yakılan kalori': '314 kcal' } },
    { in: { kilo: '70', mesafe: '2', sure: '60' }, error: true },
    { in: { kilo: '', mesafe: '10', sure: '50' }, error: true },
    { in: { kilo: '70', mesafe: '10', sure: '50', egim: '-3' }, error: true },
  ],
  howto: [
    `"Vücut ağırlığı" alanına güncel kilonuzu kilogram olarak yazın. Sırt çantası ya da ağırlık yeleğiyle koşuyorsanız taşıdığınız yükü de ekleyin.`,
    `"Koşu mesafesi" alanına kilometre, "Süre" alanına dakika girin. 47 dakika 30 saniye için 47,5 yazabilirsiniz.`,
    `Koşu bandında ya da sürekli yokuş çıkarak koştuysanız "Eğim" alanına yüzde değerini yazın; düz parkur için 0 bırakın.`,
    `"Hesapla" düğmesine basın. İlk satır toplam kaloriyi, diğer satırlar net kaloriyi, hızı, tempoyu ve MET değerini gösterir.`,
    `Sonucu antrenman günlüğünüze ya da beslenme planınıza aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Hesaplama nasıl yapılıyor?', p: [
      `Koşarken harcanan enerji, vücudun tükettiği oksijen miktarıyla doğru orantılıdır. Egzersiz fizyolojisinde koşu için yaygın kullanılan metabolik denklem, oksijen tüketimini hızdan tahmin eder: <strong>VO<sub>2</sub> = 0,2 × hız + 0,9 × hız × eğim + 3,5</strong>. Burada hız metre/dakika, eğim ondalık kesir (yüzde 5 için 0,05), sonuç ise kilogram başına dakikada mililitre oksijendir. Sondaki 3,5 değeri dinlenme hâlindeki tüketimi, yani 1 MET'i temsil eder.`,
      `Vücut her litre oksijen için yaklaşık 5 kcal enerji harcar. Dolayısıyla toplam kalori şu şekilde bulunur: <strong>kalori = VO<sub>2</sub> × kilo × dakika ÷ 200</strong>. Araç ayrıca VO<sub>2</sub> değerini 3,5'e bölerek aktivitenin MET karşılığını verir; bu sayı, koşunun dinlenmeye göre kaç kat enerji gerektirdiğini anlatır.`,
    ] },
    { h: 'Çözümlü örnek: 70 kg, 10 km, 50 dakika', p: [
      `10 kilometreyi 50 dakikada koşan biri dakikada 200 metre yol alır; bu saatte 12 km hıza ve 5:00 dk/km tempoya denk gelir. Düz zeminde oksijen tüketimi 0,2 × 200 + 3,5 = 43,5 ml/kg/dk olur. MET değeri 43,5 ÷ 3,5 = 12,4'tür.`,
      `Toplam enerji 43,5 × 70 × 50 ÷ 200 = 761 kcal çıkar. Dinlenirken de harcanacak olan 3,5'lik kısmı çıkarırsak koşunun kendisine ait net harcama 40 × 70 × 50 ÷ 200 = 700 kcal'dir. Bu sonuç, koşucular arasında bilinen "kilometre başına kilo kadar kalori" kuralıyla da örtüşür: 70 kg × 10 km = 700 kcal.`,
    ] },
    { h: 'Toplam kalori ile net kalori arasındaki fark', p: [
      `Akıllı saatler ve koşu bantları çoğunlukla toplam (brüt) kaloriyi gösterir; bu değerin içinde, koşmasaydınız da harcayacağınız dinlenme enerjisi vardır. Kilo yönetimi yapıyorsanız günlük enerji hesabınıza eklemeniz gereken değer çoğu zaman <strong>net kaloridir</strong>, çünkü bazal harcamanız zaten ayrıca hesaplanmıştır. Aksi hâlde aynı enerjiyi iki kez saymış olursunuz.`,
      `İlginç bir sonuç: net kalori neredeyse yalnızca mesafeye ve kiloya bağlıdır. 10 kilometreyi 50 dakikada da 60 dakikada da koşsanız 70 kg için net harcama 700 kcal civarındadır. Hızlı koşmak birim zamanda daha çok enerji yakar, ama aynı mesafeyi daha kısa sürede bitirdiğiniz için toplam pek değişmez.`,
    ] },
    { h: 'Eğim ve koşu bandı', p: [
      `Yokuş yukarı koşmak, vücut ağırlığını yer çekimine karşı kaldırmayı gerektirdiği için enerji harcamasını belirgin biçimde artırır. Denklemdeki eğim terimi bunu hesaba katar. 75 kg ağırlığında biri 5 kilometreyi 30 dakikada düz zeminde koştuğunda yaklaşık 414 kcal harcarken aynı koşuyu yüzde 5 eğimde yaptığında 499 kcal harcar.`,
      `Koşu bandında hava direnci olmadığı için birçok antrenör, açık havadaki eforu taklit etmek üzere bandı yüzde 1 eğime ayarlamayı önerir. Bandın gösterdiği kalori değeri kilonuzu bilmiyorsa varsayılan bir ağırlığa göre hesaplanır; bu yüzden bu araçla kendi kilonuza göre kontrol etmek daha güvenilirdir. İniş eğiminde denklem geçerli olmadığından araç negatif eğim kabul etmez.`,
    ] },
    { h: 'Hızlı başvuru: 70 kg için yaklaşık değerler', ul: [
      `<strong>5 km, 30 dakika</strong> (6:00 dk/km): yaklaşık 387 kcal`,
      `<strong>5 km, 25 dakika</strong> (5:00 dk/km): yaklaşık 381 kcal`,
      `<strong>10 km, 60 dakika</strong>: yaklaşık 774 kcal`,
      `<strong>10 km, 50 dakika</strong>: yaklaşık 761 kcal`,
      `<strong>Yarı maraton, 2 saat</strong>: yaklaşık 1.624 kcal`,
      `<strong>Maraton, 4 saat</strong>: yaklaşık 3.248 kcal`,
    ] },
    { h: 'Sonucu etkileyen etkenler ve sınırlar', p: [
      `Denklem ortalama bir koşucunun verimini varsayar. Deneyimli koşucular aynı hızda biraz daha az, yeni başlayanlar biraz daha çok enerji harcayabilir. Karşıdan esen rüzgâr, kum ya da çamur gibi yumuşak zemin, sıcak ve nemli hava harcamayı artırır. Yaş, cinsiyet ve vücut yağ oranı da küçük farklar yaratır.`,
      `Formül sabit tempolu, kesintisiz koşu için geçerlidir ve 6 km/sa altındaki hızlarda yürüyüşe ait farklı bir denklem gerektiğinden araç bu durumda uyarı verir. Aralıklı antrenmanlarda ortalama hızı kullanmak kabaca doğru sonuç verir. Koşudan sonra bir süre devam eden yüksek oksijen tüketimi hesaba dahil değildir.`,
      `Buradaki değerler bilgilendirme amaçlıdır. Kalp, tansiyon, eklem sorununuz varsa ya da uzun süredir hareketsizseniz koşu programına başlamadan önce hekiminize danışın; beslenme planı için diyetisyenden destek alın.`,
    ] },
  ],
  faq: [
    ['1 km koşmak kaç kalori yakar?', `Net harcama yaklaşık olarak kilonuz kadardır: 70 kg biri kilometre başına 70 kcal civarında yakar. Dinlenme enerjisi de eklendiğinde toplam değer tempoya göre 75–80 kcal arasına çıkar.`],
    ['Yarım saat koşu kaç kalori yakar?', `Hıza ve kiloya bağlıdır. 70 kg ağırlığında biri 30 dakikada 5 km koşarsa yaklaşık 387 kcal, aynı sürede 6 km koşarsa yaklaşık 457 kcal harcar. Kendi değerleriniz için mesafe ve süreyi araca yazın.`],
    ['Hızlı koşmak mı yavaş koşmak mı daha çok kalori yakar?', `Aynı sürede hızlı koşmak daha çok mesafe kat ettirdiği için daha çok kalori yakar. Aynı mesafede ise fark küçüktür; net harcama temelde kilo ve kilometreye bağlıdır.`],
    ['Koşu bandındaki kalori göstergesi neden farklı çıkıyor?', `Bantlar çoğu zaman varsayılan bir vücut ağırlığı kullanır ve üreticiye göre farklı denklemler uygular. Kilonuzu girmediyseniz gösterge sizin için hatalı olabilir. Bu araç doğrudan sizin kilonuza göre hesaplar.`],
    ['Kilo vermek için ne kadar koşmalıyım?', `Tek bir doğru cevap yoktur; kilo değişimi toplam enerji dengesine bağlıdır. Koşuyla harcadığınız net kaloriyi beslenmenizle birlikte değerlendirin. Kişisel hedef ve güvenli hız için hekim ya da diyetisyen görüşü alın.`],
    ['Akıllı saatim neden farklı bir değer gösteriyor?', `Saatler nabız, yaş, cinsiyet ve kendi algoritmalarını kullanır; bazıları yalnızca aktif kaloriyi, bazıları toplamı gösterir. Yüzde 10–20 fark olağandır. Karşılaştırırken saatin hangi değeri gösterdiğine bakın.`],
    ['Yokuş aşağı koşu için hesap yapabilir miyim?', `Hayır. Kullanılan denklem düz ve yokuş yukarı koşu için geliştirilmiştir. İnişte enerji harcaması azalır ama doğrusal değildir; bu yüzden araç negatif eğimi kabul etmez. İnişli çıkışlı parkurlarda eğimi 0 bırakmak makul bir ortalama verir.`],
    ['Girdiğim kilo ve koşu bilgileri kaydediliyor mu?', `Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve saklanmaz.`],
  ],
  related: ['kosu-temposu-hesapla', 'yuruyus-kalori-hesapla', 'met-kalori-hesapla', 'maraton-sure-tahmini', 'kalori-acigi-hesapla'],
};
