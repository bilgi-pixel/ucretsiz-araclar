export default {
  slug: 'astronomik-birim-km-cevir',
  title: 'Astronomik Birim Kilometre Çevirici',
  h1Tail: 'AB ↔ km',
  pageTitle: `Astronomik Birim Kilometre Çevirici – AB (AU) Kaç km Hesaplama`,
  description: `Astronomik birimi kilometreye, kilometreyi astronomik birime çevirin. 1 AB = 149.597.870,7 km tanımıyla çalışır; ışığın bu yolu kaç dakikada aldığını da verir.`,
  card: `Astronomik birimi (AB) kilometreye ya da kilometreyi AB'ye çevirin; ışığın yol süresini de görün.`,
  category: 'birim',
  keywords: ['astronomik birim kaç km', '1 AB kaç kilometre', 'AU km çevirme', 'astronomik birim çevirici', 'dünya güneş uzaklığı km', 'km astronomik birim', 'ışık dakikası hesaplama'],
  lead: `Güneş Sistemi içindeki uzaklıkları astronomik birim (AB, İngilizce kısaltmasıyla AU) ile kilometre arasında çevirin. Araç, Uluslararası Astronomi Birliği'nin belirlediği <strong>1 AB = 149.597.870,7 km</strong> tam değerini kullanır ve ışığın bu yolu ne kadar sürede aldığını da hesaplar.`,
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzaklık', type: 'number', placeholder: 'Örn. 5,2', hint: 'Kilometre yazarken binlik ayraç kullanmayın (örn. 384400).' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ab', 'Astronomik birim → Kilometre'], ['km', 'Kilometre → Astronomik birim']] },
  ],
  compute(v, h) {
    const AB_KM = 149597870.7;          // tam tanım (IAU 2012)
    const C_KM_S = 299792.458;          // ışık hızı, km/s (tam)
    const IY_KM = 9460730472580.8;      // ışık yılı, km (Jülyen yılıyla tam)
    const x = h.nonneg(v.deger, 'Uzaklık');
    const km = v.yon === 'km' ? x : x * AB_KM;
    const ab = km / AB_KM;
    const sn = km / C_KM_S;
    let sure;
    if (sn < 60) sure = h.fmt(sn, 2) + ' sn';
    else if (sn < 3600) {
      const dk = Math.floor(sn / 60 + 1e-9);
      sure = `${dk} dk ${h.fmt(Math.max(0, sn - dk * 60), 1)} sn`;
    } else if (sn < 86400) {
      const toplamDk = Math.round(sn / 60);
      sure = `${Math.floor(toplamDk / 60)} sa ${toplamDk % 60} dk`;
    } else sure = h.fmt(sn / 86400, 2) + ' gün';
    const kmSatir = ['Kilometre', h.fmt(km, 3) + ' km'];
    const abSatir = ['Astronomik birim', h.sig(ab, 6) + ' AB'];
    return {
      rows: [
        v.yon === 'km' ? abSatir : kmSatir,
        v.yon === 'km' ? kmSatir : abSatir,
        ['Milyon kilometre', h.fmt(km / 1e6, 3) + ' milyon km'],
        ['Işığın yol süresi', sure],
        ['Işık yılı', h.sig(km / IY_KM, 6) + ' ışık yılı'],
      ],
      note: '1 AB = 149.597.870,7 km (tam tanım). Işık süresi, ışığın boşluktaki hızı 299.792,458 km/s alınarak hesaplanır.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'ab' }, out: { 'Kilometre': '149.597.870,7 km', 'Milyon kilometre': '149,598 milyon km', 'Işığın yol süresi': '8 dk 19 sn' } },
    { in: { deger: '149597870,7', yon: 'km' }, out: { 'Astronomik birim': '1 AB', 'Işık yılı': '0,0000158125 ışık yılı' } },
    { in: { deger: '5,2', yon: 'ab' }, out: { 'Kilometre': '777.908.927,64 km', 'Işığın yol süresi': '43 dk 14,8 sn' } },
    { in: { deger: '384400', yon: 'km' }, out: { 'Astronomik birim': '0,00256956 AB', 'Işığın yol süresi': '1,28 sn' } },
    { in: { deger: '30,07', yon: 'ab' }, out: { 'Kilometre': '4.498.407.971,949 km', 'Işığın yol süresi': '4 sa 10 dk' } },
    { in: { deger: '1000000000', yon: 'km' }, out: { 'Astronomik birim': '6,68459 AB', 'Milyon kilometre': '1.000 milyon km', 'Işığın yol süresi': '55 dk 35,6 sn' } },
    { in: { deger: '0', yon: 'ab' }, out: { 'Kilometre': '0 km' } },
    { in: { deger: 'uzak', yon: 'ab' }, error: true },
    { in: { deger: '-1', yon: 'ab' }, error: true },
  ],
  howto: [
    `"Uzaklık" alanına çevirmek istediğiniz değeri yazın; ondalık için virgül kullanın (örn. 5,2).`,
    `"Çeviri yönü" listesinden astronomik birimden kilometreye mi, kilometreden astronomik birime mi çevireceğinizi seçin.`,
    `"Çevir" düğmesine basın. İlk satır aradığınız karşılığı gösterir.`,
    `Alt satırlardan aynı uzaklığın milyon kilometre ve ışık yılı karşılığını, ayrıca ışığın bu yolu ne kadar sürede aldığını okuyun.`,
  ],
  sections: [
    { h: 'Astronomik birim nedir?', p: [
      `Astronomik birim, kabaca Dünya ile Güneş arasındaki ortalama uzaklığa karşılık gelen bir uzunluk birimidir. Güneş Sistemi içindeki uzaklıklar kilometreyle yazıldığında yüz milyonlar, milyarlar gibi okunması zor sayılar çıkar; astronomik birim bu sayıları "Jüpiter 5,2 AB, Neptün 30 AB uzakta" gibi akılda kalan değerlere indirger. Türkçe kaynaklarda AB, uluslararası yazında au ya da AU kısaltması kullanılır.`,
      `Birim uzun süre Dünya'nın yörünge ölçümlerine bağlı olarak tanımlandı ve değeri ölçümler iyileştikçe küçük oynamalar gösterdi. Uluslararası Astronomi Birliği 2012'de bu duruma son verdi ve astronomik birimi sabit bir sayı olarak belirledi: <strong>1 AB = 149.597.870.700 metre</strong>, yani 149.597.870,7 kilometre. Dolayısıyla bugün astronomik birim ölçülen değil, tanımlanan bir uzunluktur ve çeviride belirsizlik yoktur.`,
    ] },
    { h: 'Çeviri formülü ve çözümlü örnek', p: [
      `Astronomik birimden kilometreye geçmek için değer 149.597.870,7 ile çarpılır: <strong>km = AB × 149.597.870,7</strong>. Ters yönde aynı sayıya bölünür: <strong>AB = km ÷ 149.597.870,7</strong>.`,
      `Jüpiter'in Güneş'e ortalama uzaklığı yaklaşık 5,2 AB'dir. Kilometre karşılığı 5,2 × 149.597.870,7 = <strong>777.908.927,64 km</strong>, yani yaklaşık 778 milyon kilometre eder. Işık bu yolu 777.908.927,64 ÷ 299.792,458 ≈ 2.594,8 saniyede, yani 43 dakika 14,8 saniyede alır. Ters yönde bir örnek: Ay'ın Dünya'ya ortalama uzaklığı olan 384.400 km, 384.400 ÷ 149.597.870,7 ≈ 0,00257 AB'dir; ışık bu yolu yaklaşık 1,28 saniyede kat eder.`,
    ] },
    { h: 'Işık dakikası: 8 dakika 19 saniye', p: [
      `Sonuçlardaki "Işığın yol süresi" satırı, uzaklığı ışığın o yolu alması için gereken zamanla ifade eder. 1 AB için bu süre yaklaşık 499 saniye, yani 8 dakika 19 saniyedir. Gökyüzünde gördüğümüz Güneş, aslında yaklaşık sekiz dakika önceki Güneş'tir.`,
      `Aynı mantık uzay araçlarıyla haberleşmede de geçerlidir. Radyo sinyalleri ışık hızıyla yayıldığı için bir komutun araca ulaşması, aracın uzaklığına göre dakikalar ya da saatler sürer. Uzaklık bir günü aşan ışık süresine karşılık geldiğinde araç sonucu gün olarak gösterir.`,
    ] },
    { h: 'Gezegenlerin Güneş\'e ortalama uzaklıkları', p: [
      `Aşağıdaki değerler yörüngelerin yarı büyük eksenlerine göre yuvarlanmış yaklaşık uzaklıklardır. Yörüngeler elips olduğundan gezegenlerin Güneş'e gerçek uzaklığı yıl içinde bu ortalamanın biraz altına ve üstüne çıkar.`,
    ], ul: [
      `<strong>Merkür:</strong> yaklaşık 0,39 AB`,
      `<strong>Venüs:</strong> yaklaşık 0,72 AB`,
      `<strong>Dünya:</strong> 1 AB`,
      `<strong>Mars:</strong> yaklaşık 1,52 AB`,
      `<strong>Jüpiter:</strong> yaklaşık 5,2 AB`,
      `<strong>Satürn:</strong> yaklaşık 9,5 AB`,
      `<strong>Uranüs:</strong> yaklaşık 19,2 AB`,
      `<strong>Neptün:</strong> yaklaşık 30,1 AB`,
    ] },
    { h: 'Astronomik birim, ışık yılı ve parsek', p: [
      `Astronomik birim Güneş Sistemi ölçeğine uygundur; yıldızlar arası uzaklıklar için küçük kalır. Bir ışık yılı yaklaşık 63.241 AB, bir parsek ise yaklaşık 206.265 AB eder. Bu yüzden gezegen, asteroit ve kuyruklu yıldız yörüngeleri AB ile, yıldız uzaklıkları ışık yılı ya da parsekle anlatılır. Araç, girdiğiniz uzaklığın ışık yılı karşılığını da gösterir; böylece iki ölçek arasındaki farkı doğrudan görebilirsiniz.`,
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      `<strong>AB'yi Dünya'nın o anki uzaklığı sanmak:</strong> Dünya ocak başında Güneş'e yaklaşık 147 milyon km, temmuz başında yaklaşık 152 milyon km uzaklıktadır. Astronomik birim bu ikisinin arasındaki sabit bir değerdir.`,
      `<strong>Milyon ile milyarı karıştırmak:</strong> 1 AB yaklaşık 150 milyon km'dir, 150 milyar değil. "Milyon kilometre" satırı bu denetimi kolaylaştırır.`,
      `<strong>Kilometreyi noktalı yazmak:</strong> tek noktalı girdi ondalık sayılır; 384.400 yazarsanız 384,4 olarak okunur. Büyük sayıları ayraçsız girin.`,
      `<strong>Ortalama uzaklığı kesin konum saymak:</strong> gezegen uzaklıkları yörünge boyunca değişir; belirli bir tarih için konum hesabı bu aracın kapsamı dışındadır.`,
    ] },
    { h: 'Gösterim ve duyarlılık', p: [
      `Kilometre sonucu en fazla üç ondalık basamakla, astronomik birim ve ışık yılı karşılıkları altı anlamlı basamakla gösterilir. Çeviri katsayısı tanım gereği tam olduğu için sonucun güvenilirliği girdiğiniz değerin duyarlılığına bağlıdır: "yaklaşık 5,2 AB" gibi yuvarlanmış bir değerden elde edilen kilometre sonucunun son basamakları gerçek bir ölçümü yansıtmaz. Ödev ve sunumlarda sonucu girdiyle aynı sayıda anlamlı basamağa yuvarlamak, örneğin 778 milyon km demek daha doğru bir alışkanlıktır. Araç negatif uzaklık kabul etmez; sıfır geçerli bir giriştir.`,
    ] },
  ],
  faq: [
    ['1 astronomik birim kaç kilometredir?', `1 astronomik birim tam olarak 149.597.870,7 kilometredir. Günlük kullanımda yaklaşık 150 milyon kilometre olarak yuvarlanır.`],
    ['AB ile AU aynı şey midir?', `Evet. AB Türkçe "astronomik birim" adının, AU ise İngilizce karşılığının kısaltmasıdır. İkisi de aynı uzunluğu gösterir.`],
    ['Güneş ışığı Dünya\'ya kaç dakikada ulaşır?', `Işık 1 astronomik birimlik yolu yaklaşık 499 saniyede, yani 8 dakika 19 saniyede alır. Dünya'nın Güneş'e uzaklığı yıl içinde biraz değiştiği için gerçek süre birkaç saniye oynar.`],
    ['Astronomik birimin değeri neden sabit?', `Uluslararası Astronomi Birliği 2012'de birimi ölçüme bağlı olmaktan çıkarıp 149.597.870.700 metre olarak tanımladı. Böylece değer, yeni ölçümlerle değişmeyen sabit bir sayı haline geldi.`],
    ['1 ışık yılı kaç astronomik birimdir?', `1 ışık yılı yaklaşık 63.241 astronomik birimdir. Tersinden bakıldığında 1 AB, bir ışık yılının yaklaşık 63 binde biridir.`],
    ['Mars Dünya\'ya kaç astronomik birim uzaklıktadır?', `Bu uzaklık sabit değildir. İki gezegen Güneş'in aynı tarafında yakınlaştığında aradaki mesafe yaklaşık 0,4 ile 0,7 AB arasına iner, Güneş'in karşı taraflarında olduklarında ise 2,5 AB dolayına çıkar.`],
    ['Kilometreyi astronomik birime nasıl çeviririm?', `Kilometre değerini 149.597.870,7'ye bölün. Örneğin 1 milyar kilometre yaklaşık 6,68 AB eder. Araçta "Kilometre → Astronomik birim" yönünü seçmeniz yeterlidir.`],
    ['Girdiğim değerler kaydediliyor mu?', `Hayır. Hesap tarayıcınızın içinde yapılır; yazdığınız sayılar sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra internet bağlantısı olmadan da çalışır.`],
  ],
  related: ['isik-yili-km-cevir', 'parsek-isik-yili-cevir', 'gezegen-agirligi-hesapla', 'bilimsel-gosterim-cevir', 'km-mil-cevir'],
};
