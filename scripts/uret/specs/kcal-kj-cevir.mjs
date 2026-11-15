export default {
  slug: 'kcal-kj-cevir',
  title: 'Kilokalori Kilojoule Çevirici',
  h1Tail: 'kcal ↔ kJ',
  pageTitle: 'Kilokalori Kilojoule Çevirici – kcal\'den kJ\'ye, kJ\'den kcal\'ye',
  description: 'Gıda etiketlerindeki enerji değerini kilokaloriden kilojoule\'e ya da kilojoule\'den kilokaloriye çevirin. 1 kcal = 4,184 kJ eşitliğiyle anında sonuç alın.',
  card: 'Besin etiketlerindeki kcal ve kJ değerlerini birbirine çevirin; joule ve watt-saat karşılığını da görün.',
  category: 'birim',
  keywords: ['kcal kj çevirme', 'kj kcal dönüştürme', '1 kcal kaç kj', 'kilojoule kalori', 'kj kaç kalori', 'enerji değeri kj kcal', 'kilokalori kilojoule hesaplama'],
  lead: 'Kilokalori (kcal) ile kilojoule (kJ) arasında çeviri yapın. Besin etiketlerinde yan yana yazılan bu iki değer aynı enerjiyi anlatır; araç <strong>1 kcal = 4,184 kJ</strong> eşitliğini kullanır.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kcal', 'Kilokalori → Kilojoule'], ['kj', 'Kilojoule → Kilokalori']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const kj = v.yon === 'kj' ? x : x * 4.184;
    const kcal = kj / 4.184;
    const kjRow = ['Kilojoule', h.fmt(kj, 3) + ' kJ'];
    const kcalRow = ['Kilokalori', h.fmt(kcal, 3) + ' kcal'];
    return {
      rows: [
        ...(v.yon === 'kj' ? [kcalRow, kjRow] : [kjRow, kcalRow]),
        ['Joule', h.fmt(kj * 1000, 0) + ' J'],
        ['Megajoule', h.fmt(kj / 1000, 4) + ' MJ'],
        ['Watt-saat', h.fmt(kj / 3.6, 3) + ' Wh'],
      ],
      note: '1 kcal = 4,184 kJ (termokimyasal tanım). Sonuçlar en fazla üç ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '2000', yon: 'kcal' }, out: { 'Kilojoule': '8.368 kJ', 'Megajoule': '8,368 MJ' } },
    { in: { deger: '8400', yon: 'kj' }, out: { 'Kilokalori': '2.007,648 kcal' } },
    { in: { deger: '1', yon: 'kcal' }, out: { 'Kilojoule': '4,184 kJ', 'Joule': '4.184 J', 'Watt-saat': '1,162 Wh' } },
    { in: { deger: '100', yon: 'kj' }, out: { 'Kilokalori': '23,901 kcal' } },
    { in: { deger: '500', yon: 'kcal' }, out: { 'Kilojoule': '2.092 kJ' } },
    { in: { deger: '0', yon: 'kj' }, out: { 'Kilokalori': '0 kcal' } },
    { in: { deger: '', yon: 'kcal' }, error: true },
    { in: { deger: '-100', yon: 'kcal' }, error: true },
  ],
  howto: [
    'Ürün etiketinde ya da tarifte gördüğünüz enerji değerini "Değer" alanına yazın.',
    'Değer kcal ise "Kilokalori → Kilojoule", kJ ise "Kilojoule → Kilokalori" yönünü seçin.',
    '"Çevir" düğmesine basın; karşılık gelen değer ilk satırda, joule, megajoule ve watt-saat karşılıkları altında görünür.',
    'Birden fazla ürünü karşılaştırıyorsanız her birini sırayla çevirip sonuçları kopyalayarak not alın.',
  ],
  sections: [
    { h: 'kcal ve kJ neden birlikte yazılır?', p: [
      'Paketli gıdaların besin değeri tablosunda enerji satırı genellikle iki birimle verilir: kilojoule (kJ) ve kilokalori (kcal). İkisi de aynı büyüklüğü, yani besinin vücuda sağlayabileceği enerjiyi ifade eder. Kilojoule uluslararası birim sisteminin enerji birimine dayanır; kilokalori ise beslenme alanında alışkanlıkla kullanılan birimdir. Halk arasında "kalori" denildiğinde neredeyse her zaman kilokalori kastedilir.',
      'Bazı ülkelerde, örneğin Avustralya ve Yeni Zelanda\'da etiketlerde kilojoule öne çıkar; yurt dışından alınan bir üründe ya da yabancı bir tarif sitesinde yalnızca kJ değeri görmek olağandır. Böyle durumlarda günlük kalori hedefinizle karşılaştırma yapabilmek için kJ değerini kcal\'ye çevirmeniz gerekir.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Dönüşüm sabit bir katsayıya dayanır: <strong>kJ = kcal × 4,184</strong> ve <strong>kcal = kJ ÷ 4,184</strong>. Kafadan hesap için kJ değerini 4\'e bölüp sonuçtan biraz düşmek ya da kcal değerini 4 ile çarpıp biraz eklemek yeterince yakın bir tahmin verir. Örneğin 800 kJ kabaca 200 kcal\'nin biraz altındadır; kesin değer 191,205 kcal\'dir.',
      'Etiketlerdeki iki sayı her zaman bu katsayıyla birebir tutmayabilir. Bunun nedeni üreticilerin enerjiyi protein, karbonhidrat ve yağ miktarlarından standart katsayılarla hesaplayıp her birimi ayrı ayrı yuvarlamasıdır. Birkaç birimlik fark hata değil, yuvarlama sonucudur.',
    ] },
    { h: 'Adım adım örnekler', p: [
      '<strong>Günlük enerji:</strong> Yetişkinler için etiketlerde referans alınan 2000 kcal\'lik günlük enerji 2000 × 4,184 = 8368 kJ eder. Etiketlerde bu değer çoğunlukla 8400 kJ olarak yuvarlanmış biçimde görülür; 8400 kJ\'yi geri çevirdiğinizde 2007,648 kcal bulursunuz.',
      '<strong>Tek porsiyon:</strong> Bir atıştırmalığın etiketinde 100 kJ yazıyorsa bu 100 ÷ 4,184 = 23,901 kcal\'dir. 500 kcal\'lik bir öğün ise 2092 kJ eder.',
      '<strong>Elektrik karşılığı:</strong> Araç watt-saat satırını da gösterir. 1 kcal yaklaşık 1,162 Wh\'dir; 2000 kcal\'lik günlük enerji yaklaşık 2,3 kWh\'ye denk gelir. Bu karşılaştırma yalnızca enerjinin büyüklüğü hakkında fikir vermek içindir.',
    ] },
    { h: 'Besin öğelerinin enerji katsayıları', p: [
      'Etiketlerdeki enerji değeri genellikle besin öğelerinin gram başına ortalama enerji katsayılarıyla hesaplanır. Yaygın olarak kullanılan yaklaşık değerler şöyledir:',
    ], ul: [
      '<strong>Karbonhidrat:</strong> gram başına yaklaşık 4 kcal (17 kJ)',
      '<strong>Protein:</strong> gram başına yaklaşık 4 kcal (17 kJ)',
      '<strong>Yağ:</strong> gram başına yaklaşık 9 kcal (37 kJ)',
      '<strong>Alkol:</strong> gram başına yaklaşık 7 kcal (29 kJ)',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, etiketteki büyük sayıyı kalori sanmaktır. Aynı satırda "1046 kJ / 250 kcal" yazıyorsa ürün 250 kcal\'dir; 1046 değeri kilojoule\'dür. İkinci hata, 100 gram için verilen değeri porsiyon değeriyle karıştırmaktır; tabloda hangi sütunun 100 g, hangisinin porsiyon için olduğuna bakın.',
      'Üçüncü hata, kalori (cal) ile kilokaloriyi (kcal) aynı sanmaktır. Fizik anlamındaki kalori, kilokalorinin binde biridir. Bu araç doğrudan kilokaloriyle çalışır; küçük kaloriyle işlem yapmanız gerekiyorsa kalori–joule çeviricisini kullanın.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>50 kcal</strong> = 209,2 kJ',
      '<strong>100 kcal</strong> = 418,4 kJ',
      '<strong>250 kcal</strong> = 1046 kJ',
      '<strong>500 kcal</strong> = 2092 kJ',
      '<strong>1500 kcal</strong> = 6276 kJ',
      '<strong>2000 kcal</strong> = 8368 kJ',
      '<strong>2500 kcal</strong> = 10.460 kJ',
      '<strong>1000 kJ</strong> ≈ 239 kcal',
    ] },
    { h: 'Yurt dışı tarifleri ve spor uygulamalarında kJ', p: [
      'Yabancı kaynaklı yemek tariflerinde, sporcu besinlerinde ve bazı koşu bandı ya da bisiklet ergometresi ekranlarında enerji yalnızca kilojoule olarak verilebilir. Kalori takibi yapan biri için bu sayılar ilk bakışta çok yüksek görünür; 1700 kJ\'lik bir öğün aslında yaklaşık 406 kcal\'dir. Kalori sayan bir uygulamaya veri girerken birimi doğru seçmek ya da değeri önce bu sayfada çevirmek, günlük toplamın dört kat şişmesini önler.',
      'Tersine, Türkiye\'de hazırladığınız bir besin değeri tablosunu kilojoule kullanan bir ülkeye göndermeniz gerekiyorsa kcal değerlerini 4,184 ile çarpıp tam sayıya yuvarlamanız yeterlidir. Etiket hazırlama gibi resmî işlerde yuvarlama ve gösterim kuralları için yürürlükteki gıda etiketleme mevzuatını kontrol edin.',
    ] },
    { h: 'Uyarı', p: [
      'Bu sayfa yalnızca birim çevirir; kişisel enerji ihtiyacınızı ya da beslenme planınızı belirlemez. Günlük ihtiyaç yaşa, cinsiyete, vücut yapısına ve hareket düzeyine göre değişir. Diyet, kilo yönetimi ya da bir sağlık sorunu için karar verirken hekime ya da diyetisyene danışın.',
    ] },
  ],
  faq: [
    ['1 kcal kaç kJ eder?', '1 kilokalori 4,184 kilojoule\'dür. Buna göre 100 kcal 418,4 kJ, 1000 kcal 4184 kJ eder.'],
    ['1 kJ kaç kcal eder?', '1 kilojoule yaklaşık 0,239 kilokaloridir. 1000 kJ yaklaşık 239 kcal\'ye karşılık gelir.'],
    ['Etikette yazan "kalori" kcal mi?', 'Evet. Gıda etiketlerinde ve diyet listelerinde kalori denildiğinde kastedilen birim kilokaloridir. Etikette birim olarak kcal yazar.'],
    ['Etiketteki kJ ve kcal değerleri neden tam tutmuyor?', 'Üreticiler enerjiyi besin öğelerinden hesaplayıp her birimi ayrı ayrı tam sayıya yuvarlar. Bu yüzden iki sayı arasında 4,184 katsayısından birkaç birimlik sapma görülebilir.'],
    ['8400 kJ kaç kaloridir?', '8400 kJ yaklaşık 2007,6 kcal\'dir. Etiketlerde referans günlük enerji çoğunlukla "8400 kJ / 2000 kcal" olarak yuvarlanmış biçimde verilir.'],
    ['Kilojoule\'ü kafadan kaloriye nasıl çeviririm?', 'kJ değerini 4\'e bölün ve sonucu yaklaşık yüzde beş azaltın. Örneğin 1000 kJ için 1000 ÷ 4 = 250, yüzde beş eksiği yaklaşık 238 kcal eder; kesin değer 239 kcal\'dir.'],
    ['Spor saatim kJ gösteriyor, bu yakılan kalori mi?', 'Bazı cihazlar yapılan mekanik işi kJ olarak gösterir; bu, vücudun harcadığı toplam enerjiyle aynı şey değildir. Cihazınızın kılavuzunda gösterilen değerin ne anlama geldiğine bakın; araç yalnızca birimi dönüştürür.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; yazdığınız sayılar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['kalori-joule-cevir', 'kalori-kilokalori-cevir', 'kalori-hesapla', 'kwh-kcal-cevir', 'met-kalori-hesapla'],
};
