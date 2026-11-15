export default {
  slug: 'km-mil-cevir',
  title: 'Kilometre Mil Çevirici',
  h1Tail: 'km ↔ mil',
  pageTitle: 'Kilometre Mil Çevirici – km\'den Mile, Milden Kilometreye Çevirme',
  description: 'Kilometreyi mile, mili kilometreye anında çevirin. 1 mil = 1,609344 km tanımıyla çalışır; metre, feet ve deniz mili karşılığını da gösterir.',
  card: 'Kilometreyi kara miline, mili kilometreye çevirin; araç göstergesi, koşu mesafesi ve yurt dışı yol tabelaları için.',
  category: 'birim',
  keywords: ['km mil çevirme', '1 mil kaç km', 'mil kaç kilometre', 'kilometre mil hesaplama', 'km to miles', 'mil km dönüştürme', '100 mil kaç km', 'kara mili'],
  lead: 'Bir mesafeyi kilometreden mile ya da milden kilometreye çevirin. Araç, kara mili için uluslararası tanım olan <strong>1 mil = 1,609344 km</strong> eşitliğini kullanır; metre, feet ve deniz mili karşılığını da ayrıca listeler.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Mesafe', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['km', 'Kilometre → Mil'], ['mil', 'Mil → Kilometre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Mesafe');
    const km = v.yon === 'mil' ? x * 1.609344 : x;
    const mil = v.yon === 'mil' ? x : x / 1.609344;
    return {
      rows: [
        v.yon === 'mil' ? ['Kilometre', h.fmt(km, 4) + ' km'] : ['Mil', h.fmt(mil, 4) + ' mil'],
        v.yon === 'mil' ? ['Mil', h.fmt(mil, 4) + ' mil'] : ['Kilometre', h.fmt(km, 4) + ' km'],
        ['Metre', h.fmt(km * 1000, 2) + ' m'],
        ['Feet', h.fmt(mil * 5280, 1) + ' ft'],
        ['Deniz mili', h.fmt(km / 1.852, 4) + ' nmi'],
      ],
      note: 'Kara mili (statute mile) esas alınır: 1 mil = 1,609344 km = 5.280 feet. Deniz mili farklı bir birimdir (1,852 km).',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'km' }, out: { 'Mil': '62,1371 mil', 'Metre': '100.000 m' } },
    { in: { deger: '1', yon: 'mil' }, out: { 'Kilometre': '1,6093 km', 'Metre': '1.609,34 m', 'Feet': '5.280 ft' } },
    { in: { deger: '26,2', yon: 'mil' }, out: { 'Kilometre': '42,1648 km' } },
    { in: { deger: '5', yon: 'km' }, out: { 'Mil': '3,1069 mil' } },
    { in: { deger: '60', yon: 'mil' }, out: { 'Kilometre': '96,5606 km' } },
    { in: { deger: '1,609344', yon: 'km' }, out: { 'Mil': '1 mil', 'Feet': '5.280 ft' } },
    { in: { deger: '1,852', yon: 'km' }, out: { 'Mil': '1,1508 mil', 'Deniz mili': '1 nmi' } },
    { in: { deger: '', yon: 'km' }, error: true },
    { in: { deger: '-10', yon: 'mil' }, error: true },
  ],
  howto: [
    '"Mesafe" alanına çevirmek istediğiniz sayıyı girin; 42,195 gibi ondalıklı değerler virgülle ya da noktayla yazılabilir.',
    '"Çeviri yönü" listesinden kilometreden mile ya da milden kilometreye seçeneğini işaretleyin.',
    '"Çevir" düğmesine bastığınızda sonuç kutusunun ilk satırında karşılık gelen mesafe yer alır.',
    'Alt satırlardaki metre, feet ve deniz mili değerlerinden işinize yarayanı kullanın ya da hepsini "Sonucu kopyala" ile panoya alın.',
  ],
  sections: [
    { h: 'Mil hangi birimdir?', p: [
      'Gündelik konuşmada "mil" denildiğinde çoğunlukla <strong>kara mili</strong> kastedilir. Amerika Birleşik Devletleri ve Birleşik Krallık\'ta yol tabelaları, araç kilometre saatleri ve hız sınırları bu birimle ifade edilir. Bir kara mili 1.760 yarda ya da 5.280 feettir; yarda 1959\'da tam olarak 0,9144 metreye bağlandığı için mil de tam olarak 1.609,344 metre, yani 1,609344 kilometre eder.',
      'Aynı adı taşıyan <strong>deniz mili</strong> ise ayrı bir birimdir ve 1,852 kilometredir. Gemi ve uçak seyrinde kullanılır. İki birim arasındaki fark yüzde 15 dolayındadır; bu yüzden bir metinde geçen milin hangisi olduğuna bakmadan çeviri yapmak ciddi yanılgıya yol açabilir. Bu sayfa kara milini çevirir, deniz mili karşılığını da bilgi olarak ayrı satırda verir.',
    ] },
    { h: 'Kilometre mil formülü', p: [
      'Milden kilometreye geçerken değeri 1,609344 ile çarparsınız: <strong>km = mil × 1,609344</strong>. Kilometreden mile geçerken aynı sayıya bölersiniz: <strong>mil = km ÷ 1,609344</strong>. Bölme yerine çarpma kullanmak isterseniz 1 kilometre yaklaşık 0,621371 mildir.',
      'Zihinden hesap için iki pratik yol vardır. Birincisi, mili 8 ile çarpıp 5\'e bölmektir: 50 mil için 50 × 8 ÷ 5 = 80 km bulunur, gerçek değer 80,47 km\'dir. İkincisi Fibonacci dizisinden yararlanır: dizideki ardışık iki sayının oranı 1,618\'e yaklaştığı için 5 mil yaklaşık 8 km, 8 mil yaklaşık 13 km, 13 mil yaklaşık 21 km eder. Bu yöntemler yolda tabela okurken yeterlidir; kesin değer için aracı kullanın.',
    ] },
    { h: 'Adım adım örnekler', p: [
      '<strong>Örnek 1:</strong> 100 kilometrelik bir yol kaç mildir? 100 ÷ 1,609344 = 62,1371 mil. Araç bu değerin yanında 100.000 metre karşılığını da gösterir.',
      '<strong>Örnek 2:</strong> Maraton mesafesi İngilizce kaynaklarda 26,2 mil olarak geçer. 26,2 × 1,609344 = 42,1648 km. Resmî maraton mesafesi 42,195 km olduğundan 26,2 değeri yuvarlanmış bir ifadedir; tam karşılık 26,2188 mildir.',
      '<strong>Örnek 3:</strong> Kiralık araçta gösterge saatte 60 mil gösteriyor. 60 × 1,609344 = 96,5606; yani saatte yaklaşık 97 kilometre hızla gidiyorsunuz. Mesafe çarpanı hız için de aynıdır, çünkü zaman birimi değişmez.',
    ] },
    { h: 'Türkiye\'den kullanım senaryoları', ul: [
      '<strong>Yurt dışında araç kullanmak:</strong> Birleşik Krallık ve ABD\'de hız sınırları mil/saat olarak yazılır. 30 mil/saat yaklaşık 48 km/saat, 70 mil/saat yaklaşık 113 km/saattir.',
      '<strong>İthal araç ilanları:</strong> ABD ya da İngiltere çıkışlı araçlarda kat edilen yol mil olarak yazılır. 80.000 mil görünen bir aracın gerçek kullanımı yaklaşık 128.748 kilometredir.',
      '<strong>Koşu ve bisiklet:</strong> Spor saatleri ve antrenman planları mil birimine ayarlı gelebilir. 5 km yarışı 3,1069 mil, 10 km yarışı 6,2137 mil eder.',
      '<strong>Uçuş mil programları:</strong> Havayollarının kazandırdığı "mil" puanları tarihsel olarak uçulan mesafeden türemiştir; iki şehir arası mesafeyi mil cinsinden görmek bu yüzden hâlâ yaygındır.',
      '<strong>Film, kitap ve haber çevirileri:</strong> Metinde geçen mesafeleri okuyucunun alışık olduğu kilometreye çevirmek gerekir.',
    ] },
    { h: 'Sık kullanılan karşılıklar', ul: [
      '<strong>1 mil</strong> = 1,6093 km',
      '<strong>5 mil</strong> = 8,0467 km',
      '<strong>10 mil</strong> = 16,0934 km',
      '<strong>50 mil</strong> = 80,4672 km',
      '<strong>100 mil</strong> = 160,9344 km',
      '<strong>1 km</strong> = 0,6214 mil',
      '<strong>10 km</strong> = 6,2137 mil',
      '<strong>21,0975 km</strong> (yarı maraton) = 13,1094 mil',
      '<strong>42,195 km</strong> (maraton) = 26,2188 mil',
      '<strong>100 km</strong> = 62,1371 mil',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'Tarih boyunca farklı ülkelerde farklı uzunlukta "mil"ler kullanılmıştır; eski metinlerde geçen Roma mili ya da çeşitli Avrupa milleri bugünkü kara miliyle aynı değildir. Güncel bir İngilizce kaynakta özel bir belirtme yoksa mil sözcüğü 1,609344 kilometrelik kara milidir. Denizcilik ve havacılık metinlerinde ise deniz mili varsayılır.',
      'Yakıt tüketimini çevirirken yalnızca mesafe çarpanı yetmez; "galon başına mil" değeri hem mesafe hem hacim birimi içerdiğinden ayrı bir hesap gerektirir. Aynı şekilde koşu temposu (dakika/mil) mesafe değil süre oranıdır. Araç negatif mesafe kabul etmez ve sonuçları dört ondalık basamağa kadar gösterir.',
    ] },
  ],
  faq: [
    ['1 mil kaç kilometredir?', '1 kara mili tam olarak 1,609344 kilometredir; metre olarak 1.609,344 metre eder. Gündelik kullanımda 1,6 km olarak yuvarlanır.'],
    ['1 kilometre kaç mildir?', '1 kilometre yaklaşık 0,6214 mildir. Hesap 1 ÷ 1,609344 işlemiyle yapılır; 10 kilometre 6,2137 mil, 100 kilometre 62,1371 mil eder.'],
    ['Kara mili ile deniz mili arasındaki fark nedir?', 'Kara mili 1,609344 km, deniz mili 1,852 km\'dir. Deniz mili yerkürenin enlem dakikasına dayanır ve denizcilikle havacılıkta kullanılır. Bir deniz mili yaklaşık 1,1508 kara miline eşittir.'],
    ['Saatte 60 mil kaç kilometre hız demektir?', 'Saatte 60 mil, saatte 96,56 kilometreye karşılık gelir. Hız çevirisinde de aynı 1,609344 çarpanı kullanılır; bu yüzden mesafe alanına hız değerini yazıp sonucu km/saat olarak okuyabilirsiniz.'],
    ['Maraton kaç mildir?', 'Maratonun resmî mesafesi 42,195 kilometredir ve bu 26,2188 mile denk gelir. İngilizce kaynaklarda kısaca 26,2 mil olarak anılır. Yarı maraton 21,0975 km, yani 13,1094 mildir.'],
    ['Mil simgesi nasıl yazılır?', 'Uluslararası kullanımda mil için "mi" kısaltması yaygındır; hız için "mph" (saatte mil) yazılır. Türkçe metinlerde çoğunlukla açıkça "mil" yazılması tercih edilir.'],
    ['İthal aracın mil göstergesini kilometreye nasıl çevirebilirim?', 'Göstergedeki mil değerini "Mesafe" alanına yazıp "Mil → Kilometre" yönünü seçin. Örneğin 50.000 mil 80.467,2 kilometre eder. Alana sayıyı binlik ayraç kullanmadan, 50000 biçiminde yazın.'],
    ['Bu çeviri sırasında verilerim paylaşılıyor mu?', 'Hayır. İşlem cihazınızdaki tarayıcıda gerçekleşir; yazdığınız mesafe hiçbir yere iletilmez, kayıt altına alınmaz.'],
  ],
  related: ['deniz-mili-km-cevir', 'kmh-mph-cevir', 'metre-yarda-cevir', 'metre-feet-cevir', 'dakika-kilometre-tempo-cevir', 'yakit-tuketimi-birim-cevir'],
};
