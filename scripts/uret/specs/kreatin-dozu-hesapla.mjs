export default {
  slug: 'kreatin-dozu-hesapla',
  title: 'Kreatin Kullanım Miktarı Hesaplama',
  h1Tail: 'yükleme ve idame dozu',
  pageTitle: 'Kreatin Dozu Hesaplama – Kiloya Göre Yükleme ve İdame Miktarı',
  description: 'Kilonuza göre kreatin yükleme ve idame dozunu hesaplayın. Günlük gram, doz başına miktar, yükleme süresi ve bir kutunun kaç gün yeteceği tek ekranda.',
  card: 'Kilonuza göre kreatin yükleme ve idame dozunu, öğün başına gramı ve kutunun kaç gün yeteceğini hesaplayın.',
  category: 'saglik',
  keywords: ['kreatin dozu hesaplama', 'kreatin yükleme hesaplama', 'günde kaç gram kreatin', 'kreatin kullanım miktarı', 'kreatin idame dozu', 'kiloya göre kreatin', 'kreatin kaç gün yeter'],
  lead: 'Kreatin monohidrat için literatürde en sık anılan iki kullanım şemasını kilonuza uygulayın. Araç, <strong>yükleme dönemi</strong> ve <strong>idame dönemi</strong> için günlük gramı, doz başına miktarı ve elinizdeki kutunun kaç gün yeteceğini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'kilo', label: 'Vücut ağırlığı (kg)', type: 'number', placeholder: 'Örn. 75' },
    { id: 'protokol', label: 'Kullanım şeması', type: 'select', options: [['yukleme', 'Yükleme + idame'], ['idame', 'Yalnızca idame (yüklemesiz)']] },
    { id: 'yuklemeGun', label: 'Yükleme süresi (gün)', type: 'number', value: '5', hint: 'Genellikle 5–7 gün. Yüklemesiz şemada dikkate alınmaz.' },
    { id: 'paket', label: 'Kutu miktarı (gram, isteğe bağlı)', type: 'number', placeholder: 'Örn. 300', hint: 'Yazarsanız kutunun kaç gün yeteceği hesaplanır.' },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Vücut ağırlığı');
    if (kilo < 40 || kilo > 250) h.err('Vücut ağırlığı 40 ile 250 kg arasında olmalı.');
    const yukleme = v.protokol !== 'idame';
    const formulIdame = kilo * 0.03;
    const idame = Math.max(3, formulIdame);
    const rows = [];
    let yuklemeToplam = 0;
    let gun = 0;
    if (yukleme) {
      gun = h.posint(String(v.yuklemeGun ?? '').trim() === '' ? '5' : v.yuklemeGun, 'Yükleme süresi');
      if (gun < 5 || gun > 7) h.err('Yükleme süresi 5 ile 7 gün arasında olmalı.');
      const gunluk = kilo * 0.3;
      yuklemeToplam = gunluk * gun;
      rows.push(['Yükleme dozu', h.fmt(gunluk, 1) + ' g/gün']);
      rows.push(['Yüklemede doz başına', `4 × ${h.fmt(gunluk / 4, 1)} g`]);
      rows.push(['Yükleme dönemi toplamı', `${h.fmt(yuklemeToplam, 1)} g (${gun} gün)`]);
      rows.push(['İdame dozu', h.fmt(idame, 1) + ' g/gün']);
    } else {
      rows.push(['İdame dozu', h.fmt(idame, 1) + ' g/gün']);
    }
    rows.push(['Kiloya göre idame (0,03 g/kg)', h.fmt(formulIdame, 1) + ' g/gün']);
    const ilk30 = yuklemeToplam + idame * (30 - gun);
    rows.push(['İlk 30 günde toplam', h.fmt(ilk30, 0) + ' g']);
    if (String(v.paket ?? '').trim() !== '') {
      const paket = h.pos(v.paket, 'Kutu miktarı');
      if (paket > 10000) h.err('Kutu miktarı 10.000 gramdan büyük olamaz; gram cinsinden yazın.');
      let yeter;
      if (paket <= yuklemeToplam + 1e-9) {
        yeter = yukleme ? Math.floor(paket / (kilo * 0.3) + 1e-9) : 0;
      } else {
        yeter = gun + Math.floor((paket - yuklemeToplam) / idame + 1e-9);
      }
      rows.push(['Kutunun yeteceği süre', `${yeter} gün`]);
    }
    return {
      rows,
      note: 'Yükleme 0,3 g/kg/gün, idame 0,03 g/kg/gün üzerinden hesaplanır; idame dozu en az 3 g alınır. Değerler kreatin monohidrat içindir ve sağlıklı yetişkinlere yönelik genel bilgidir, tıbbi öneri değildir.',
    };
  },
  cases: [
    { in: { kilo: '70', protokol: 'yukleme', yuklemeGun: '5' }, out: { 'Yükleme dozu': '21 g/gün', 'Yüklemede doz başına': '4 × 5,3 g', 'Yükleme dönemi toplamı': '105 g (5 gün)', 'İdame dozu': '3 g/gün', 'Kiloya göre idame (0,03 g/kg)': '2,1 g/gün', 'İlk 30 günde toplam': '180 g' } },
    { in: { kilo: '80', protokol: 'idame' }, out: { 'İdame dozu': '3 g/gün', 'Kiloya göre idame (0,03 g/kg)': '2,4 g/gün', 'İlk 30 günde toplam': '90 g' } },
    { in: { kilo: '100', protokol: 'yukleme', yuklemeGun: '7', paket: '500' }, out: { 'Yükleme dozu': '30 g/gün', 'Yüklemede doz başına': '4 × 7,5 g', 'Yükleme dönemi toplamı': '210 g (7 gün)', 'İdame dozu': '3 g/gün', 'İlk 30 günde toplam': '279 g', 'Kutunun yeteceği süre': '103 gün' } },
    { in: { kilo: '120', protokol: 'idame', paket: '300' }, out: { 'İdame dozu': '3,6 g/gün', 'İlk 30 günde toplam': '108 g', 'Kutunun yeteceği süre': '83 gün' } },
    { in: { kilo: '60', protokol: 'yukleme', yuklemeGun: '5', paket: '300' }, out: { 'Yükleme dozu': '18 g/gün', 'Yüklemede doz başına': '4 × 4,5 g', 'Yükleme dönemi toplamı': '90 g (5 gün)', 'Kutunun yeteceği süre': '75 gün' } },
    { in: { kilo: '90', protokol: 'yukleme', yuklemeGun: '6', paket: '100' }, out: { 'Yükleme dozu': '27 g/gün', 'Yükleme dönemi toplamı': '162 g (6 gün)', 'Kutunun yeteceği süre': '3 gün' } },
    { in: { kilo: '70', protokol: 'yukleme', yuklemeGun: '10' }, error: true },
    { in: { kilo: '', protokol: 'idame' }, error: true },
    { in: { kilo: '25', protokol: 'idame' }, error: true },
  ],
  howto: [
    '"Vücut ağırlığı" alanına güncel kilonuzu kilogram olarak yazın.',
    'Kullanım şemasını seçin: hızlı doygunluk için "Yükleme + idame", daha yavaş ama sade bir yol için "Yalnızca idame".',
    'Yükleme şemasını seçtiyseniz yükleme süresini 5 ile 7 gün arasında belirleyin.',
    'Elinizdeki ürünün net miktarını gram olarak "Kutu miktarı" alanına yazarsanız kutunun kaç gün yeteceği de hesaplanır.',
    '"Hesapla" düğmesine basın; günlük dozlar, doz başına gram ve ilk 30 günlük toplam tüketim görünür.',
  ],
  sections: [
    { h: 'Kreatin dozu nasıl hesaplanır?', p: [
      'Kreatin monohidrat üzerine yapılan çalışmalarda en sık kullanılan şema iki aşamalıdır. <strong>Yükleme döneminde</strong> günde vücut ağırlığının kilogramı başına yaklaşık 0,3 gram kreatin, 5–7 gün boyunca alınır; bu miktar genellikle güne yayılmış dört eşit doza bölünür. Ardından <strong>idame döneminde</strong> günde 3–5 gram ya da kilogram başına yaklaşık 0,03 gram ile devam edilir.',
      'Araç bu iki katsayıyı kilonuza uygular: <strong>yükleme = kilo × 0,3</strong> ve <strong>idame = kilo × 0,03</strong>. Kiloya göre idame değeri 3 gramın altında kalırsa, literatürde anılan 3–5 gramlık aralığın alt sınırı olan 3 gram idame dozu olarak gösterilir; formül değeri ayrı bir satırda yine de yer alır.',
    ] },
    { h: 'Çözümlü örnek: 70 kg', p: [
      '70 kg ağırlığında biri için yükleme dozu 70 × 0,3 = <strong>21 gram/gün</strong> eder. Dört eşit doza bölündüğünde her doz 5,25 gram, yani yaklaşık 5,3 gramdır. Beş günlük yükleme toplam 21 × 5 = 105 gram tutar. Kiloya göre idame 70 × 0,03 = 2,1 gramdır; bu değer 3 gramın altında olduğundan idame dozu 3 gram/gün olarak alınır.',
      'İlk 30 günün toplam tüketimi şöyle bulunur: 5 gün yükleme için 105 gram, kalan 25 gün idame için 25 × 3 = 75 gram; toplam <strong>180 gram</strong>. Aynı kişi yüklemesiz şemayı seçseydi ilk 30 günde yalnızca 30 × 3 = 90 gram kullanırdı.',
    ] },
    { h: 'Yükleme şart mı?', p: [
      'Hayır. Yükleme, kaslardaki kreatin depolarını yaklaşık bir hafta içinde doygunluğa yaklaştırmanın hızlı yoludur. Yükleme yapmadan doğrudan günde 3–5 gramla başlandığında da depolar dolar; ancak bu yaklaşık üç dört hafta sürer. Sonuçta ulaşılan düzey benzerdir, fark yalnızca hızdadır.',
      'Yükleme dönemindeki yüksek dozlar bazı kişilerde şişkinlik ve mide rahatsızlığı yapabilir. Bu yüzden dozun güne bölünmesi önerilir; rahatsızlık yaşayanlar için yüklemesiz şema daha konforlu bir seçenektir. Yakın bir tarihte müsabakası olmayan çoğu kişi için acele etmenin pratik bir yararı yoktur.',
    ] },
    { h: 'Kutu kaç gün yeter?', p: [
      'Kutu miktarını girdiğinizde araç önce yükleme döneminin tüketimini düşer, kalan miktarı idame dozuna böler. Örneğin 60 kg bir kişi 300 gramlık kutuyla 5 gün yükleme yaparsa yüklemede 18 × 5 = 90 gram harcar; kalan 210 gram günde 3 gramla 70 gün gider ve kutu toplam <strong>75 gün</strong> yeter. Yüklemesiz kullanımda aynı kutu 100 gün yeterdi.',
      'Ürünlerin yanında gelen ölçü kaşığının kaç gram aldığı markadan markaya değişir. Doğru doz için etiketteki kaşık gramajına bakın ya da hassas mutfak terazisi kullanın.',
    ] },
    { h: 'Kullanımda sık yapılan hatalar', ul: [
      '<strong>Yükleme dozunu tek seferde almak:</strong> 20 gramın üzerindeki miktarı bir kerede almak mide şikâyetlerini artırır; güne bölün.',
      '<strong>Yüklemeyi haftalarca sürdürmek:</strong> Depolar dolduktan sonra yüksek doz ek yarar sağlamaz; 5–7 gün sonunda idameye geçilir.',
      '<strong>Antrenman olmayan günlerde atlamak:</strong> İdame, depoları dolu tutmak içindir; düzenli kullanım esastır.',
      '<strong>Tartıdaki artışı yağ sanmak:</strong> Kreatin kas hücrelerinde su tutulumunu artırır; ilk haftalarda görülen 1–2 kg\'lık artış çoğunlukla sudur.',
      '<strong>Yetersiz sıvı almak:</strong> Kullanım süresince gün içinde yeterli su içmeye özen gösterin.',
    ] },
    { h: 'Sağlık uyarısı', p: [
      'Bu sayfadaki hesap, sağlıklı yetişkinler için literatürde anılan genel kullanım şemalarını kiloya uygular; kişiye özel tıbbi ya da beslenme önerisi değildir. Böbrek hastalığı ya da böbrek hastalığı riski olanlar, düzenli ilaç kullananlar, hamileler, emzirenler ve 18 yaşından küçükler hekime danışmadan kreatin kullanmamalıdır.',
      'Takviye ürünlerinin içeriği ve saflığı üreticiye göre değişir. Ürün etiketindeki kullanım talimatını okuyun ve belirtilen miktarı aşmayın. Kullanım sırasında beklenmedik bir şikâyet gelişirse ürünü bırakıp bir sağlık uzmanına başvurun.',
    ] },
  ],
  faq: [
    ['Günde kaç gram kreatin kullanılır?', 'İdame döneminde literatürde en sık anılan miktar günde 3–5 gramdır; kiloya göre hesapta kilogram başına yaklaşık 0,03 gram kullanılır. Yükleme yapılacaksa ilk 5–7 gün kilogram başına 0,3 gram alınır ve dört doza bölünür.'],
    ['80 kilo biri için yükleme dozu nedir?', '80 × 0,3 = 24 gram/gün eder; dört doza bölündüğünde her doz 6 gramdır. Beş günlük yükleme toplam 120 gram tutar. Ardından günde 3 gramlık idame dozuna geçilir.'],
    ['Yükleme yapmazsam kreatin etki etmez mi?', 'Eder. Yükleme yalnızca depoların dolmasını hızlandırır. Günde 3–5 gramla başlandığında kas kreatin düzeyi yaklaşık üç dört haftada benzer doygunluğa ulaşır.'],
    ['İdame dozu neden en az 3 gram gösteriliyor?', 'Kilogram başına 0,03 gram hesabı 100 kg\'ın altındaki kişilerde 3 gramdan küçük çıkar. Çalışmalarda yaygın olarak kullanılan idame aralığı 3–5 gram olduğu için araç alt sınırı 3 gram alır ve formül değerini ayrı satırda gösterir.'],
    ['Kreatini ne zaman almalıyım?', 'Araştırmalarda zamanlamanın etkisi küçük bulunmuştur; asıl belirleyici düzenli günlük kullanımdır. Birçok kişi unutmamak için antrenman sonrasına ya da bir ana öğüne bağlar.'],
    ['Kreatin kilo aldırır mı?', 'İlk haftalarda tartıda 1–2 kg\'lık artış görülebilir; bu büyük oranda kas hücrelerinde tutulan sudan kaynaklanır, yağ artışı değildir. Yükleme yapılmadığında bu artış daha yavaş ve daha az belirgin olur.'],
    ['Hesap hangi kreatin türü için geçerli?', 'Değerler, üzerinde en çok çalışılmış biçim olan kreatin monohidrat içindir. Farklı biçimlerde ürün kullanıyorsanız etiketteki kullanım talimatını esas alın.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; kilo ve kutu bilgileri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['protein-ihtiyaci-hesapla', 'makro-besin-hesapla', 'bir-tekrar-maksimum-hesapla', 'yagsiz-vucut-kutlesi-hesapla', 'wilks-puani-hesapla'],
};
