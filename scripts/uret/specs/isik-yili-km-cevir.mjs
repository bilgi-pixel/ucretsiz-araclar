export default {
  slug: 'isik-yili-km-cevir',
  title: 'Işık Yılı Kilometre Çevirici',
  h1Tail: 'ışık yılı ↔ km',
  pageTitle: 'Işık Yılı Kilometre Çevirici – 1 Işık Yılı Kaç Km Hesaplama',
  description: 'Işık yılını kilometreye, kilometreyi ışık yılına çevirin. 1 ışık yılı = 9.460.730.472.580,8 km tanımıyla hesaplar; astronomik birim ve parsek karşılığını da verir.',
  card: 'Işık yılını kilometreye, kilometreyi ışık yılına çevirin; bilimsel gösterim, astronomik birim ve parsek karşılığıyla.',
  category: 'birim',
  keywords: ['ışık yılı km çevirme', '1 ışık yılı kaç km', 'ışık yılı kaç kilometre', 'ışık yılı hesaplama', 'ışık yılı nedir', 'ışık yılı parsek', 'ışık yılı astronomik birim', 'light year km'],
  lead: 'Gök bilimde kullanılan ışık yılını kilometreye ya da kilometreyi ışık yılına çevirin. Bir ışık yılı, ışığın boşlukta bir yılda aldığı yoldur ve <strong>yaklaşık 9,46 trilyon kilometre</strong> eder. Araç sonucu bilimsel gösterim, astronomik birim ve parsek olarak da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 4,2465', hint: 'Çok büyük sayılar için 1e15 gibi üslü yazım kullanabilirsiniz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['ly', 'Işık yılı → Kilometre'], ['km', 'Kilometre → Işık yılı']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const LY = 9460730472580.8; // km: 299.792,458 km/sn × 31.557.600 sn (Jülyen yılı)
    const AU = 149597870.7; // km
    const PC = AU * 648000 / Math.PI; // km
    const km = v.yon === 'km' ? x : x * LY;
    const ly = v.yon === 'km' ? x / LY : x;
    const genel = (n, d) => (n < 1e-3 || n >= 1e12 ? h.sig(n, 7) : h.fmt(n, d));
    let kmMetni;
    if (km < 1e9) kmMetni = h.fmt(km, 4);
    else if (km < 1e14) kmMetni = h.fmt(km, 1);
    else if (km < 1e15) kmMetni = h.fmt(km, 0);
    else kmMetni = h.sig(km, 7);
    const [mant, us] = km.toExponential(4).split('e');
    const bilimsel = `${String(Number(mant)).replace('.', ',')} × 10^${Number(us)} km`;
    return {
      rows: [
        v.yon === 'km' ? ['Işık yılı', h.sig(ly, 7) + ' ışık yılı'] : ['Kilometre', kmMetni + ' km'],
        v.yon === 'km' ? ['Kilometre', kmMetni + ' km'] : ['Işık yılı', h.sig(ly, 7) + ' ışık yılı'],
        ['Kilometre (bilimsel gösterim)', bilimsel],
        ['Astronomik birim', genel(km / AU, 4) + ' AB'],
        ['Parsek', genel(km / PC, 6) + ' pc'],
      ],
      note: '1 ışık yılı = 9.460.730.472.580,8 km (ışık hızı 299.792,458 km/sn, yıl 365,25 gün). 1 AB = 149.597.870,7 km. Çok büyük sonuçlar yedi anlamlı basamağa yuvarlanarak üslü biçimde gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'ly' }, out: { 'Kilometre': '9.460.730.472.580,8 km', 'Kilometre (bilimsel gösterim)': '9,4607 × 10^12 km', 'Astronomik birim': '63.241,0771 AB', 'Parsek': '0,306601 pc' } },
    { in: { deger: '9460730472580,8', yon: 'km' }, out: { 'Işık yılı': '1 ışık yılı', 'Astronomik birim': '63.241,0771 AB' } },
    { in: { deger: '2', yon: 'ly' }, out: { 'Kilometre': '18.921.460.945.161,6 km' } },
    { in: { deger: '0,5', yon: 'ly' }, out: { 'Kilometre': '4.730.365.236.290,4 km' } },
    { in: { deger: '4,2465', yon: 'ly' }, out: { 'Kilometre': '40.174.991.951.814,4 km', 'Kilometre (bilimsel gösterim)': '4,0175 × 10^13 km' } },
    { in: { deger: '100000', yon: 'ly' }, out: { 'Kilometre': '9,46073 × 10^17 km', 'Kilometre (bilimsel gösterim)': '9,4607 × 10^17 km' } },
    { in: { deger: '1', yon: 'km' }, out: { 'Işık yılı': '1,057001 × 10^-13 ışık yılı' } },
    { in: { deger: '149597870,7', yon: 'km' }, out: { 'Astronomik birim': '1 AB', 'Kilometre': '149.597.870,7 km' } },
    { in: { deger: '', yon: 'ly' }, error: true },
    { in: { deger: '0', yon: 'ly' }, error: true },
    { in: { deger: '-3', yon: 'km' }, error: true },
  ],
  howto: [
    '"Değer" alanına ışık yılı ya da kilometre cinsinden sayıyı yazın. Ondalık için virgül kullanabilirsiniz; çok büyük sayıları 4e13 gibi üslü biçimde de girebilirsiniz.',
    '"Çeviri yönü" listesinden ışık yılından kilometreye ya da kilometreden ışık yılına seçeneğini belirleyin.',
    '"Çevir" düğmesine basın. İlk satırda karşılık gelen değer, üçüncü satırda kilometrenin bilimsel gösterimi yer alır.',
    'Astronomik birim ve parsek satırlarını, mesafeyi başka kaynaklarla karşılaştırmak için kullanın.',
  ],
  sections: [
    { h: 'Işık yılı nedir?', p: [
      'Işık yılı, adında "yıl" geçmesine karşın bir zaman değil <strong>uzunluk</strong> birimidir. Işığın boşlukta bir yıl boyunca kat ettiği mesafeyi anlatır. Yıldızlar ve gökadalar arasındaki uzaklıklar kilometreyle yazıldığında on beş, yirmi basamaklı sayılar ortaya çıkar; ışık yılı bu sayıları kavranabilir büyüklüklere indirir.',
      'Birimin tanımında iki sabit kullanılır. Işığın boşluktaki hızı tam olarak saniyede 299.792.458 metredir. Yıl olarak ise 365,25 günlük Jülyen yılı alınır; bu da 31.557.600 saniye eder. İkisinin çarpımı bir ışık yılını verir: <strong>9.460.730.472.580,8 kilometre</strong>. Yuvarlak söylenişiyle yaklaşık 9,46 trilyon kilometre ya da 9,46 × 10<sup>12</sup> km.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Işık yılından kilometreye: <strong>km = ışık yılı × 9.460.730.472.580,8</strong>. Kilometreden ışık yılına: <strong>ışık yılı = km ÷ 9.460.730.472.580,8</strong>. Hızlı tahminlerde çarpan olarak 9,46 × 10<sup>12</sup> kullanmak yeterlidir.',
      'Sonuçlar çok büyük ya da çok küçük çıktığı için araç bilimsel gösterimi de verir. Örneğin 9,4607 × 10^12 yazımı, 9,4607 sayısının virgülünün 12 basamak sağa kaydırılacağı anlamına gelir. Negatif üs ise virgülün sola kayacağını gösterir: 1 kilometre, 1,057 × 10^-13 ışık yılıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Bir ışık yılı:</strong> Alana 1 yazıp "Işık yılı → Kilometre" seçtiğinizde 9.460.730.472.580,8 km sonucunu alırsınız. Aynı mesafe 63.241,0771 astronomik birim ve 0,306601 parsektir.',
      '<strong>Örnek 2 – En yakın yıldız:</strong> Güneş\'e en yakın yıldız olan Proxima Centauri yaklaşık 4,2465 ışık yılı uzaklıktadır. 4,2465 × 9.460.730.472.580,8 = 40.174.991.951.814,4 km; yani yaklaşık 40 trilyon kilometre ya da 4,0175 × 10^13 km.',
      '<strong>Örnek 3 – Gökada ölçeği:</strong> Samanyolu\'nun çapı çoğu kaynakta 100.000 ışık yılı dolayında verilir. Bu, yaklaşık 9,46 × 10^17 kilometredir. Bu büyüklükteki sayılarda araç sonucu yedi anlamlı basamağa yuvarlayıp üslü biçimde gösterir.',
      '<strong>Örnek 4 – Kilometreden ışık yılına:</strong> Dünya ile Güneş arasındaki ortalama uzaklık olan 149.597.870,7 km, tam olarak 1 astronomik birimdir ve yaklaşık 0,0000158 ışık yılı eder.',
    ] },
    { h: 'Işık saniyesi, ışık dakikası ve diğer alt birimler', p: [
      'Güneş sistemi içindeki uzaklıklar için ışık yılı fazla büyüktür; bu yüzden ışığın daha kısa sürelerde aldığı yollar kullanılır:',
    ], ul: [
      '<strong>1 ışık saniyesi</strong> = 299.792,458 km',
      '<strong>1 ışık dakikası</strong> = 17.987.547,48 km',
      '<strong>1 ışık saati</strong> = 1.079.252.848,8 km',
      '<strong>1 ışık günü</strong> = 25.902.068.371,2 km',
      '<strong>1 ışık yılı</strong> = 9.460.730.472.580,8 km',
    ] },
    { h: 'Bu ölçekler ne anlatır?', p: [
      'Ay\'dan yansıyan ışık Dünya\'ya ortalama 1,3 saniyede, Güneş\'ten çıkan ışık ise yaklaşık 499 saniyede, yani 8 dakika 19 saniyede ulaşır. Bu nedenle Güneş\'e baktığımızda onun yaklaşık sekiz dakika önceki hâlini görürüz. Aynı mantıkla, on ışık yılı uzaklıktaki bir yıldızdan bugün gözümüze ulaşan ışık on yıl önce yola çıkmıştır; uzaya bakmak geçmişe bakmaktır.',
    ] },
    { h: 'Astronomik birim ve parsek ile ilişkisi', p: [
      '<strong>Astronomik birim (AB)</strong>, Dünya ile Güneş arasındaki ortalama uzaklığa dayanır ve tam olarak 149.597.870,7 km olarak tanımlanmıştır. Gezegenler arası mesafelerde kullanılır. Bir ışık yılı yaklaşık 63.241 astronomik birimdir.',
      '<strong>Parsek (pc)</strong>, gök bilimcilerin meslekî çalışmalarda daha çok tercih ettiği birimdir. Dünya\'nın yörünge yarıçapının bir açı saniyelik açıyla görüldüğü uzaklık olarak tanımlanır ve yaklaşık 3,2616 ışık yılına eşittir. Tersinden bir ışık yılı 0,3066 parsek eder. Popüler bilim yayınlarında ışık yılı, akademik yayınlarda parsek ve katları (kiloparsek, megaparsek) daha sık görülür.',
    ] },
    { h: 'Bilinen bazı uzaklıklar', p: [
      'Aşağıdaki değerler yaklaşık olup ölçümler geliştikçe güncellenmektedir; karşılaştırma amacıyla verilmiştir.',
    ], ul: [
      'Proxima Centauri: yaklaşık 4,25 ışık yılı (yaklaşık 40 trilyon km)',
      'Sirius, gece göğünün en parlak yıldızı: yaklaşık 8,6 ışık yılı (yaklaşık 81 trilyon km)',
      'Samanyolu\'nun çapı: 100.000 ışık yılı dolayında',
      'Andromeda Gökadası: yaklaşık 2,5 milyon ışık yılı',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'Işık yılını süre sanmak en yaygın yanılgıdır; "ışık yılı sürdü" gibi bir kullanım yanlıştır. İkinci yanılgı trilyon sözcüğüyle ilgilidir: Türkçedeki trilyon 10<sup>12</sup>\'dir ve İngilizcedeki "trillion" ile aynıdır; ancak İngilizce "billion" Türkçede milyar demektir. Çeviri metinlerde bu karışıklık sayıları bin kat şaşırtabilir.',
      'Bilgisayarlar çok büyük sayıları yaklaşık 15–16 anlamlı basamakla tutar. Bu yüzden araç, 100 trilyon kilometreyi aşan sonuçlarda küsuratı göstermez, katrilyon ve üzerindeki sonuçları ise yedi anlamlı basamakla üslü biçimde verir. Gök cisimlerinin uzaklıkları zaten bu kesinlikte bilinmediği için bu yuvarlama uygulamada bir kayıp oluşturmaz. Sıfır ve negatif değerler kabul edilmez.',
    ] },
  ],
  faq: [
    ['1 ışık yılı kaç kilometredir?', '1 ışık yılı 9.460.730.472.580,8 kilometredir. Yuvarlak olarak 9,46 trilyon kilometre ya da 9,46 × 10^12 km diye ifade edilir.'],
    ['Işık yılı zaman birimi midir?', 'Hayır, uzunluk birimidir. Işığın boşlukta bir yılda aldığı yolu anlatır. Adındaki "yıl" sözcüğü yalnızca tanımda kullanılan süreyi belirtir.'],
    ['Işık yılı nasıl hesaplanır?', 'Işık hızı (saniyede 299.792,458 km), bir Jülyen yılındaki saniye sayısıyla (365,25 gün × 86.400 saniye = 31.557.600 saniye) çarpılır. Sonuç 9.460.730.472.580,8 kilometredir.'],
    ['1 ışık yılı kaç astronomik birimdir?', 'Yaklaşık 63.241 astronomik birimdir. Bir astronomik birim, Dünya ile Güneş arasındaki ortalama uzaklık olan 149.597.870,7 km\'dir.'],
    ['Işık yılı ile parsek arasındaki fark nedir?', 'İkisi de yıldızlar arası uzaklık birimidir. 1 parsek yaklaşık 3,2616 ışık yılı, 1 ışık yılı ise yaklaşık 0,3066 parsektir. Parsek, yıldızların ıraklık açısıyla doğrudan ilişkili olduğu için meslekî gök biliminde yeğlenir.'],
    ['Güneş ışığı Dünya\'ya ne kadar sürede ulaşır?', 'Yaklaşık 499 saniyede, yani 8 dakika 19 saniyede ulaşır. Bu yüzden Dünya-Güneş uzaklığı yaklaşık 8,3 ışık dakikası olarak da ifade edilir.'],
    ['Sonuç neden "× 10^" biçiminde çıkıyor?', 'Çok büyük ya da çok küçük sayılar onlarca basamak tuttuğu için bilimsel gösterim kullanılır. 9,46 × 10^17 yazımı, 9,46\'nın ardından virgülün 17 basamak sağa kaydırılması demektir. Katrilyonu aşan sonuçlar yalnızca bu biçimde gösterilir.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız sayılar cihazınızdan çıkmaz ve saklanmaz.'],
  ],
  related: ['astronomik-birim-km-cevir', 'parsek-isik-yili-cevir', 'bilimsel-gosterim-cevir', 'km-mil-cevir', 'yil-gun-cevir', 'birim-donustur'],
};
