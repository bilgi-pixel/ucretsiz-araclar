export default {
  slug: 'sayi-siralama',
  title: 'Sayı Sıralama (Küçükten Büyüğe)',
  h1Tail: 'artan ve azalan sıra',
  pageTitle: 'Sayı Sıralama – Küçükten Büyüğe ve Büyükten Küçüğe Sıralama',
  description: 'Sayı listenizi küçükten büyüğe ya da büyükten küçüğe sıralayın. Ondalıklı ve negatif sayıları destekler, tekrarları kaldırır, en küçük ve en büyüğü gösterir.',
  card: 'Sayıları küçükten büyüğe ya da büyükten küçüğe sıralayın; tekrarları kaldırın, en küçük ve en büyük değeri görün.',
  category: 'matematik',
  keywords: ['sayı sıralama', 'küçükten büyüğe sıralama', 'büyükten küçüğe sıralama', 'sayıları sırala', 'ondalık sayı sıralama', 'negatif sayıları sıralama', 'artan sıralama', 'tekrar eden sayıları silme'],
  lead: `Sayılarınızı boşlukla, noktalı virgülle ya da alt alta yazın; araç listeyi <strong>küçükten büyüğe</strong> ya da <strong>büyükten küçüğe</strong> dizer. Ondalıklı ve negatif sayılar doğru sıralanır, isterseniz tekrar eden değerler teke indirilir.`,
  button: 'Sırala',
  inputs: [
    { id: 'sayilar', label: 'Sayılar', type: 'textarea', placeholder: 'Örn. 12 7 3,5 -4 20 7', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın. Virgül ondalık ayırıcıdır.' },
    { id: 'yon', label: 'Sıralama yönü', type: 'select', options: [['artan', 'Küçükten büyüğe (artan)'], ['azalan', 'Büyükten küçüğe (azalan)']] },
    { id: 'tekrar', label: 'Tekrar eden sayılar', type: 'select', options: [['koru', 'Olduğu gibi kalsın'], ['kaldir', 'Teke indir']] },
  ],
  compute(v, h) {
    let liste = h.nums(v.sayilar, 'Sayılar');
    if (liste.length > 20000) h.err('En fazla 20.000 sayı sıralanabilir; listeyi parçalara bölün.');
    const girilen = liste.length;
    if (v.tekrar === 'kaldir') liste = [...new Set(liste.map((x) => (x === 0 ? 0 : x)))];
    liste.sort((a, b) => a - b);
    const enKucuk = liste[0], enBuyuk = liste[liste.length - 1];
    if (v.yon === 'azalan') liste.reverse();
    const yaz = (x) => String(x === 0 ? 0 : x).replace('.', ',');
    const parcalar = liste.map(yaz);
    const rows = [
      ['Sıralı liste', parcalar.join('; ')],
      ['Sayı adedi', String(liste.length)],
      ['En küçük', yaz(enKucuk)],
      ['En büyük', yaz(enBuyuk)],
    ];
    if (v.tekrar === 'kaldir') rows.push(['Çıkarılan tekrar', String(girilen - liste.length)]);
    return {
      rows,
      text: parcalar.join('\n'),
      note: 'Alttaki kutuda aynı sıra, tabloya yapıştırmaya uygun biçimde her satırda bir sayı olacak şekilde verilir.',
    };
  },
  cases: [
    { in: { sayilar: '5 3 8 1', yon: 'artan' }, out: { 'Sıralı liste': '1; 3; 5; 8', 'Sayı adedi': '4', 'En küçük': '1', 'En büyük': '8' }, text: '1\n3\n5\n8' },
    { in: { sayilar: '3,5 -2 0 10', yon: 'azalan' }, out: { 'Sıralı liste': '10; 3,5; 0; -2', 'En küçük': '-2', 'En büyük': '10' } },
    { in: { sayilar: '4 4 2 2 1', yon: 'artan', tekrar: 'kaldir' }, out: { 'Sıralı liste': '1; 2; 4', 'Sayı adedi': '3', 'Çıkarılan tekrar': '2' } },
    { in: { sayilar: '10;9;8', yon: 'artan' }, out: { 'Sıralı liste': '8; 9; 10' } },
    { in: { sayilar: '2,5\n1,25\n-3', yon: 'artan' }, out: { 'Sıralı liste': '-3; 1,25; 2,5' } },
    { in: { sayilar: '100 20 3', yon: 'artan' }, out: { 'Sıralı liste': '3; 20; 100' } },
    { in: { sayilar: '0,5 0,25 0,125', yon: 'azalan' }, out: { 'Sıralı liste': '0,5; 0,25; 0,125' } },
    { in: { sayilar: '', yon: 'artan' }, error: true },
    { in: { sayilar: '5 elma 3', yon: 'artan' }, error: true },
  ],
  howto: [
    `Sayılarınızı "Sayılar" kutusuna yazın ya da bir tablodan kopyalayıp yapıştırın. Aralarına boşluk, noktalı virgül koyabilir ya da her sayıyı ayrı satıra yazabilirsiniz.`,
    `Ondalıklı sayılarda virgül kullanın (3,5 gibi). Negatif sayıların başına eksi işareti koyun.`,
    `"Sıralama yönü" listesinden küçükten büyüğe ya da büyükten küçüğe seçeneğini belirleyin.`,
    `Aynı sayıdan birden fazla varsa ve yalnızca farklı değerleri görmek istiyorsanız "Teke indir" seçeneğini işaretleyin.`,
    `"Sırala" düğmesine basın. Sıralı liste, sayı adedi, en küçük ve en büyük değer görünür; alttaki kutudan listeyi satır satır kopyalayabilirsiniz.`,
  ],
  sections: [
    { h: 'Sayılar nasıl sıralanır?', p: [
      `Sayıları sıralamak, onları sayı doğrusundaki yerlerine göre dizmek demektir. Sayı doğrusunda solda kalan sayı daha küçük, sağda kalan daha büyüktür. Küçükten büyüğe sıralamaya <strong>artan sıra</strong>, büyükten küçüğe sıralamaya <strong>azalan sıra</strong> denir. Pozitif tam sayılarda kural kolaydır: basamak sayısı fazla olan büyüktür; basamak sayıları eşitse soldan başlanarak basamaklar karşılaştırılır.`,
      `Bu araç her değeri sayı olarak okur ve gerçek büyüklüğüne göre karşılaştırır. Bu ayrıntı önemlidir; çünkü metin gibi sıralama yapan bazı programlar 100 sayısını 20'den, 20'yi de 3'ten önce koyar. Burada 100, 20 ve 3 yazdığınızda sonuç beklendiği gibi 3; 20; 100 olur.`,
    ] },
    { h: 'Negatif sayıları sıralamak', p: [
      `Negatif sayılarda sezgi yanıltabilir: mutlak değeri büyük olan negatif sayı aslında daha küçüktür. −10, −2'den küçüktür; çünkü sayı doğrusunda daha soldadır. Sıcaklık örneği akılda kalıcıdır: eksi 10 derece, eksi 2 dereceden daha soğuktur. Bütün negatif sayılar sıfırdan, sıfır da bütün pozitif sayılardan küçüktür.`,
      `<strong>Örnek:</strong> 3,5; −2; 0 ve 10 sayılarını büyükten küçüğe sıralayalım. En büyük sayı 10'dur, ardından 3,5 gelir, sonra 0 ve en sonda −2 yer alır. Araç da aynı girdiye <strong>10; 3,5; 0; −2</strong> sonucunu verir; en küçük değer −2, en büyük değer 10 olarak gösterilir.`,
    ] },
    { h: 'Ondalıklı sayıları sıralamak', p: [
      `Ondalıklı sayılarda en sık yapılan hata, virgülden sonraki basamak sayısı fazla olanı büyük sanmaktır. 0,125 sayısı üç basamaklı olsa da 0,5'ten küçüktür. Doğru yöntem önce tam kısımları karşılaştırmak, tam kısımlar eşitse ondalık basamakları soldan sağa sırayla karşılaştırmaktır. Kolaylık için basamak sayıları sıfır eklenerek eşitlenebilir: 0,5 = 0,500 ve 0,25 = 0,250 yazıldığında 0,500 > 0,250 > 0,125 olduğu hemen görülür.`,
      `<strong>Örnek:</strong> 2,5; 1,25 ve −3 sayıları küçükten büyüğe sıralandığında önce negatif olan −3, ardından 1,25 ve son olarak 2,5 gelir. Tam kısmı 1 olan sayı, tam kısmı 2 olandan küçük olduğu için ondalık kısma bakmaya gerek kalmaz.`,
    ] },
    { h: 'Tekrar eden sayılar ve en küçük, en büyük değer', p: [
      `Bir veri listesinde aynı değer birden fazla kez geçebilir. Sınav notlarını sıralarken tekrarların kalması gerekir; çünkü her not ayrı bir öğrenciye aittir. Buna karşılık bir listede hangi farklı değerlerin bulunduğunu görmek istiyorsanız tekrarları teke indirmek işinizi kolaylaştırır. Örneğin 4, 4, 2, 2, 1 listesi teke indirildiğinde 1; 2; 4 kalır ve araç iki tekrarın çıkarıldığını ayrıca bildirir.`,
      `Sıralı bir listede ilk ve son eleman, verinin en küçük ve en büyük değeridir. Bu iki değerin farkı açıklığı verir; listenin tam ortasındaki değer ise medyandır. Dolayısıyla sıralama, ortanca, çeyreklik ve yüzdelik dilim gibi istatistik hesaplarının ilk adımıdır.`,
    ] },
    { h: 'Kullanım alanları', ul: [
      `<strong>Ödev ve sınav hazırlığı:</strong> İlkokul ve ortaokul matematiğindeki doğal sayı, tam sayı ve ondalık gösterim sıralama alıştırmalarının cevabını kontrol etmek.`,
      `<strong>Not ve puan listeleri:</strong> Sınıfın notlarını yüksekten düşüğe dizip en yüksek ve en düşük puanı görmek.`,
      `<strong>Fiyat karşılaştırma:</strong> Farklı satıcılardan alınan teklifleri ucuzdan pahalıya sıralamak.`,
      `<strong>Ölçüm verileri:</strong> Deney, sayaç ya da spor ölçümlerini medyan hesabından önce düzene sokmak.`,
      `<strong>Tablo hazırlığı:</strong> Sıralı listeyi satır satır kopyalayıp hesap tablosundaki bir sütuna yapıştırmak.`,
    ] },
    { h: 'Yazım kuralları ve sınırlar', p: [
      `Türkçe yazımda virgül ondalık ayırıcı olduğu için araç virgülü sayıları ayırmak için kullanmaz. Sayıların arasına boşluk, satır sonu ya da noktalı virgül koyun. "3, 1, 2" gibi virgülden sonra boşluk bırakılmış listeler de okunur; ancak "3,1,2" gibi bitişik yazılmış bir ifade tek bir hatalı sayı sayılır ve araç sizi uyarır. Binlik ayırıcı olarak nokta kullanmayın; 1.250 yazımı ondalıklı 1,25 olarak okunur.`,
      `Tek seferde en fazla 20.000 sayı sıralanabilir. Sonuçta sayılar binlik ayırıcı eklenmeden, ondalık virgülle yazılır; böylece listeyi yeniden bu araca ya da başka bir hesaplayıcıya yapıştırdığınızda değerler bozulmaz. Harf ya da simge içeren girdiler sıralanmaz; kelime listeleri için alfabetik sıralama aracını kullanın.`,
    ] },
  ],
  faq: [
    ['Küçükten büyüğe sıralama ne demek?', 'Sayıların en küçüğünden başlayıp en büyüğüne doğru dizilmesidir; artan sıra olarak da adlandırılır. 8, 3, 5 sayıları küçükten büyüğe 3; 5; 8 biçiminde sıralanır.'],
    ['Negatif sayılar nasıl sıralanır?', 'Sıfırdan uzaklaştıkça negatif sayılar küçülür. −7, −1\'den küçüktür. Küçükten büyüğe sıralamada önce negatifler (mutlak değeri büyük olandan başlayarak), sonra sıfır, ardından pozitif sayılar gelir.'],
    ['Ondalıklı sayıları hangi işaretle yazmalıyım?', 'Virgülle yazın: 2,75 gibi. Tek başına nokta da ondalık ayırıcı olarak kabul edilir (2.75). Sayıları birbirinden ayırmak için virgül değil boşluk, satır sonu ya da noktalı virgül kullanın.'],
    ['Aynı sayıdan iki tane varsa ne olur?', 'Varsayılan ayarda ikisi de listede kalır ve yan yana gelir. "Teke indir" seçeneğini seçerseniz her değer bir kez yazılır ve kaç tekrarın çıkarıldığı gösterilir.'],
    ['Kesirleri sıralayabilir miyim?', 'Araç 3/4 gibi kesir yazımını okumaz. Kesirleri önce ondalığa çevirin (3/4 = 0,75) ve ondalık karşılıklarını yazın ya da kesir karşılaştırma aracını kullanın.'],
    ['Excel\'den kopyaladığım sütunu yapıştırabilir miyim?', 'Evet. Bir sütunu kopyaladığınızda her hücre ayrı satıra gelir ve araç satırları ayrı sayılar olarak okur. Sonuç kutusundaki satır satır listeyi de aynı şekilde tabloya geri yapıştırabilirsiniz.'],
    ['Sıralamada 100 neden 20\'den sonra geliyor?', 'Çünkü değerler metin olarak değil sayı olarak karşılaştırılır. Metin sıralamasında "100", "20"den önce gelir; sayısal sıralamada ise 20 daha küçük olduğu için öndedir. Doğru olan sayısal sıralamadır.'],
    ['Listem bir yere yükleniyor mu?', 'Hayır. Sıralama tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez, saklanmaz ve başkalarıyla paylaşılmaz.'],
  ],
  related: ['medyan-hesapla', 'ortalama-hesapla', 'aciklik-hesapla', 'alfabetik-sirala', 'tepe-deger-hesapla'],
};
