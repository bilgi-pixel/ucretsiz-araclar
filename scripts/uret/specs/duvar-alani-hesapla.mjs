export default {
  slug: 'duvar-alani-hesapla',
  title: 'Duvar Alanı Hesaplama',
  h1Tail: 'kapı ve pencere düşülerek',
  pageTitle: 'Duvar Alanı Hesaplama – Oda Duvarı Kaç Metrekare?',
  description: 'Odanın en, boy ve yüksekliğinden toplam duvar alanını hesaplayın. Kapı ve pencere boşlukları düşülür; net ve brüt metrekare, oda çevresi ve tavan alanı gösterilir.',
  card: 'Oda ölçülerinden duvar metrekaresini bulun; kapı ve pencere boşlukları düşülmüş net alanı ve tavan alanını görün.',
  category: 'insaat',
  keywords: ['duvar alanı hesaplama', 'duvar metrekare hesaplama', 'oda duvarı kaç metrekare', 'boya için duvar alanı', 'net duvar alanı', 'duvar m2 hesaplama', 'oda çevresi hesaplama'],
  lead: 'Dikdörtgen bir odanın dört duvarının toplam alanını hesaplayın. Araç <strong>oda çevresi × tavan yüksekliği</strong> ile brüt alanı bulur, kapı ve pencere boşluklarını düşerek boya, sıva ya da duvar kâğıdı için gereken net metrekareyi verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Tavan yüksekliği (m)', type: 'number', placeholder: 'Örn. 2,7' },
    { id: 'kapiAdet', label: 'Kapı sayısı', type: 'number', value: '1' },
    { id: 'kapiEn', label: 'Kapı eni (m)', type: 'number', value: '0,9' },
    { id: 'kapiBoy', label: 'Kapı yüksekliği (m)', type: 'number', value: '2,1' },
    { id: 'pencereAdet', label: 'Pencere sayısı', type: 'number', value: '1' },
    { id: 'pencereEn', label: 'Pencere eni (m)', type: 'number', value: '1,2' },
    { id: 'pencereBoy', label: 'Pencere yüksekliği (m)', type: 'number', value: '1,4', hint: 'Farklı boyutta pencereler varsa ortalama ölçüyü yazın ya da en büyüğünü esas alın.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const adet = (s, ad) => {
      const n = h.opt(s, 0, ad);
      if (n < 0 || !Number.isInteger(n)) h.err(`"${ad}" sıfır ya da pozitif bir tam sayı olmalı.`);
      return n;
    };
    const kapiN = adet(v.kapiAdet, 'Kapı sayısı');
    const penN = adet(v.pencereAdet, 'Pencere sayısı');
    const kapiAlan = kapiN > 0 ? kapiN * h.pos(v.kapiEn, 'Kapı eni') * h.pos(v.kapiBoy, 'Kapı yüksekliği') : 0;
    const penAlan = penN > 0 ? penN * h.pos(v.pencereEn, 'Pencere eni') * h.pos(v.pencereBoy, 'Pencere yüksekliği') : 0;
    const cevre = 2 * (en + boy);
    const brut = cevre * yuk;
    const bosluk = kapiAlan + penAlan;
    if (bosluk >= brut - 1e-9) h.err('Kapı ve pencere boşlukları duvar alanından büyük çıktı; ölçüleri metre olarak kontrol edin.');
    return {
      rows: [
        ['Net duvar alanı', h.fmt(brut - bosluk, 2) + ' m²'],
        ['Brüt duvar alanı', h.fmt(brut, 2) + ' m²'],
        ['Kapı ve pencere boşluğu', h.fmt(bosluk, 2) + ' m²'],
        ['Oda çevresi', h.fmt(cevre, 2) + ' m'],
        ['Tavan (zemin) alanı', h.fmt(en * boy, 2) + ' m²'],
      ],
      note: 'Dikdörtgen planlı oda kabul edilmiştir. Malzeme siparişinde net alana fire payı eklemeyi unutmayın.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', yukseklik: '2,7', kapiAdet: '1', kapiEn: '0,9', kapiBoy: '2,1', pencereAdet: '1', pencereEn: '1,2', pencereBoy: '1,4' }, out: { 'Net duvar alanı': '45,03 m²', 'Brüt duvar alanı': '48,6 m²', 'Kapı ve pencere boşluğu': '3,57 m²', 'Oda çevresi': '18 m', 'Tavan (zemin) alanı': '20 m²' } },
    { in: { en: '3', boy: '4', yukseklik: '2,6', kapiAdet: '1', kapiEn: '0,9', kapiBoy: '2,1', pencereAdet: '2', pencereEn: '1', pencereBoy: '1,2' }, out: { 'Net duvar alanı': '32,11 m²', 'Brüt duvar alanı': '36,4 m²', 'Kapı ve pencere boşluğu': '4,29 m²' } },
    { in: { en: '5', boy: '6', yukseklik: '2,8', kapiAdet: '0', pencereAdet: '0' }, out: { 'Net duvar alanı': '61,6 m²', 'Brüt duvar alanı': '61,6 m²', 'Kapı ve pencere boşluğu': '0 m²' } },
    { in: { en: '3,5', boy: '3,5', yukseklik: '2,5', kapiAdet: '2', kapiEn: '0,8', kapiBoy: '2', pencereAdet: '1', pencereEn: '1,5', pencereBoy: '1,5' }, out: { 'Net duvar alanı': '29,55 m²', 'Brüt duvar alanı': '35 m²', 'Tavan (zemin) alanı': '12,25 m²' } },
    { in: { en: '2', boy: '1,5', yukseklik: '2,4', kapiAdet: '1', kapiEn: '0,7', kapiBoy: '2', pencereAdet: '0' }, out: { 'Net duvar alanı': '15,4 m²', 'Oda çevresi': '7 m' } },
    { in: { en: '6', boy: '4', yukseklik: '3', kapiAdet: '1', kapiEn: '1', kapiBoy: '2,2', pencereAdet: '3', pencereEn: '1,4', pencereBoy: '1,3' }, out: { 'Net duvar alanı': '52,34 m²', 'Kapı ve pencere boşluğu': '7,66 m²' } },
    { in: { en: '', boy: '5', yukseklik: '2,7' }, error: true },
    { in: { en: '4', boy: '5', yukseklik: '2,7', kapiAdet: '1,5', kapiEn: '0,9', kapiBoy: '2,1', pencereAdet: '0' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu zeminden, duvar diplerinden ölçüp metre olarak yazın.',
    'Tavan yüksekliğini zeminden tavana kadar ölçün. Asma tavan ya da kartonpiyer varsa kaplanacak yüksekliği esas alın.',
    'Odadaki kapı ve pencere sayısını, ardından bunların en ve yükseklik ölçülerini girin. Boşluk düşmek istemiyorsanız sayılara 0 yazın.',
    '"Hesapla" düğmesine basın. Net ve brüt duvar alanı, düşülen boşluk, oda çevresi ve tavan alanı listelenir.',
    'Net alanı boya, sıva, duvar kâğıdı ya da kaplama malzemesinin ambalajında yazan tüketim değeriyle karşılaştırarak sipariş miktarını belirleyin.',
  ],
  sections: [
    { h: 'Duvar alanı nasıl hesaplanır?', p: [
      'Dikdörtgen bir odada karşılıklı duvarlar eşittir: iki duvar oda eni kadar, iki duvar oda boyu kadar uzundur. Dört duvarın toplam uzunluğu odanın çevresidir: <strong>çevre = 2 × (en + boy)</strong>. Bu uzunluğu tavan yüksekliğiyle çarptığınızda bütün duvarların brüt alanını bulursunuz: <strong>brüt alan = çevre × yükseklik</strong>.',
      'Kapı ve pencereler duvarda boşluk oluşturur; bu yüzeylere boya ya da sıva yapılmaz. Her birinin alanı en × yükseklik ile bulunur, adetle çarpılır ve brüt alandan çıkarılır: <strong>net alan = brüt alan − (kapı alanları + pencere alanları)</strong>.',
    ] },
    { h: 'Çözümlü örnek: 4 × 5 metre oda', p: [
      'Eni 4 m, boyu 5 m, tavan yüksekliği 2,70 m olan bir yatak odasını ele alalım. Odada 0,90 × 2,10 m ölçüsünde bir kapı ve 1,20 × 1,40 m ölçüsünde bir pencere bulunsun.',
    ], ol: [
      'Oda çevresi: 2 × (4 + 5) = 18 m.',
      'Brüt duvar alanı: 18 × 2,70 = 48,6 m².',
      'Kapı alanı: 0,90 × 2,10 = 1,89 m².',
      'Pencere alanı: 1,20 × 1,40 = 1,68 m².',
      'Toplam boşluk: 1,89 + 1,68 = 3,57 m².',
      'Net duvar alanı: 48,6 − 3,57 = <strong>45,03 m²</strong>.',
      'Tavan alanı: 4 × 5 = 20 m². Tavan da boyanacaksa toplam yüzey 65,03 m² olur.',
    ] },
    { h: 'Net alan mı, brüt alan mı kullanılmalı?', p: [
      'Malzeme hesabında genellikle <strong>net alan</strong> kullanılır, çünkü boya, astar ve duvar kâğıdı yalnızca gerçekten kaplanan yüzeye gider. Ancak pencere ve kapı kenarlarındaki dönüşler (pervaz içi, denizlik altı, kasa yanları) de kaplandığı için küçük boşlukların tamamını düşmek malzemeyi eksik hesaplamanıza yol açabilir. Bu nedenle bazı ustalar küçük pencereleri hiç düşmez, yalnızca büyük açıklıkları hesaba katar.',
      'İşçilik metrajında ise uygulama farklı olabilir. Sıva, boya ve alçı işlerinde hakediş hesaplanırken belirli bir büyüklüğün altındaki boşlukların düşülmediği uygulamalar yaygındır; hangi yöntemin geçerli olacağı ustayla ya da yükleniciyle yapılan anlaşmaya ve ilgili şartnameye bağlıdır. İşe başlamadan önce metrajın nasıl alınacağını yazılı olarak netleştirmek anlaşmazlıkları önler.',
    ] },
    { h: 'Bulduğunuz alanla ne hesaplanır?', ul: [
      '<strong>Boya:</strong> Net alanı kutunun üzerinde yazan bir litrenin kapladığı alana bölün ve kat sayısıyla çarpın. Örneğin ambalajda litre başına tek katta 10 m² yazıyorsa 45,03 m² duvar iki kat için yaklaşık 9 litre boya ister.',
      '<strong>Astar ve macun:</strong> Tüketim değerleri boyadan farklıdır; yine net alan üzerinden hesaplanır.',
      '<strong>Duvar kâğıdı:</strong> Rulo eni ve boyuna göre şerit sayısı bulunur; desen tekrarı fireyi artırır. Net alan burada yalnızca kaba bir ön tahmin verir.',
      '<strong>Fayans ve seramik:</strong> Banyo ve mutfak duvarlarında kaplanacak yüksekliği tavan yüksekliği yerine yazarak yalnızca o bölümün alanını bulabilirsiniz.',
      '<strong>Alçıpan, lambri, duvar paneli:</strong> Levha alanına bölünerek adet bulunur; kesim firesi eklenir.',
      '<strong>Süpürgelik ve kartonpiyer:</strong> "Oda çevresi" satırı doğrudan metretül ihtiyacını verir; kapı genişliği süpürgelikten düşülür.',
    ] },
    { h: 'Ölçü alırken sık yapılan hatalar', p: [
      'Ölçüyü santimetre alıp metre alanına yazmak en yaygın hatadır: 270 cm tavan yüksekliği 2,7 olarak girilmelidir. Eski binalarda duvarlar tam paralel olmayabilir; her duvarı ayrı ölçüp karşılıklı duvarların ortalamasını almak daha doğru sonuç verir. Tavan yüksekliği de odanın farklı köşelerinde birkaç santimetre değişebilir.',
      'Kolon ve kiriş çıkıntıları, nişler, gömme dolap arkaları ve baca çıkıntıları duvar yüzeyini artırır ya da azaltır. Çıkıntılı bir kolonun yan yüzleri de boyanacağı için bu yüzeyleri ayrıca ekleyin. Tam boy gömme dolapla kapanan duvar boyanmayacaksa o duvarı hesaptan çıkarabilirsiniz; bunun için dolabı, eni dolap genişliği ve yüksekliği dolap yüksekliği olan büyük bir "pencere" gibi girmek pratik bir yöntemdir.',
    ] },
    { h: 'L biçimli ve düzgün olmayan odalar', p: [
      'Araç dikdörtgen plan için tasarlanmıştır, ancak L biçimli odalarda da çevre mantığı işe yarar: köşeleri dik olan bir L odanın çevresi, onu içine alan dikdörtgenin çevresine eşittir. Yani odanın en uzun enini ve en uzun boyunu yazarsanız duvar alanı doğru çıkar; yalnızca tavan alanı satırı gerçek değerden büyük görünür. Eğik tavanlı çatı katlarında ise her duvarı ayrı bir şekil olarak hesaplamak gerekir; üçgen ve yamuk biçimli duvarlar için alan formüllerini ayrı ayrı uygulayın.',
    ] },
    { h: 'Fire payı ve uyarı', p: [
      'Hesaplanan net alan teorik değerdir. Uygulamada yüzeyin emiciliği, pürüzlülüğü, kesim kayıpları ve işçilik nedeniyle malzeme tüketimi artar. Boyada genellikle yüzde 5–10, kaplama ve levha malzemelerinde desene ve kesime göre yüzde 10 ya da daha fazla fire payı eklemek alışılmış bir uygulamadır. Sonuçlar bilgilendirme amaçlıdır; büyük çaplı işlerde kesin metraj için uygulayıcınızla yerinde ölçüm yapın.',
    ] },
  ],
  faq: [
    ['Duvar metrekaresi nasıl hesaplanır?', 'Odanın çevresi tavan yüksekliğiyle çarpılır: 2 × (en + boy) × yükseklik. Bulunan brüt alandan kapı ve pencere alanları çıkarılır. 4 × 5 m oda ve 2,70 m tavan için brüt alan 48,6 m²\'dir.'],
    ['Tek bir duvarın alanını nasıl bulurum?', 'Tek duvar için duvar uzunluğunu yükseklikle çarpmanız yeterlidir. Bu araçta yalnızca bir duvarı hesaplamak isterseniz ayrı bir çarpma yapın; araç dört duvarın toplamını verir.'],
    ['Kapı ve pencere alanını düşmeli miyim?', 'Malzeme hesabında genellikle düşülür. Ancak pervaz içleri ve denizlik altları da kaplandığı için küçük pencereleri düşmemek güvenli tarafta kalmanızı sağlar. İşçilik metrajında hangi boşlukların düşüleceği anlaşmaya bağlıdır.'],
    ['Standart kapı ve pencere ölçüleri nedir?', 'Konutlarda iç oda kapıları çoğunlukla 80–90 cm genişliğinde ve 200–210 cm yüksekliğindedir; banyo kapıları daha dar olabilir. Pencere ölçüleri binaya göre çok değişir. En doğrusu kendi kapı ve pencerenizi kasa dışından ölçmektir.'],
    ['Tavan alanı da sonuca dahil mi?', 'Net ve brüt duvar alanına dahil değildir; ayrı bir satırda gösterilir. Tavanı da boyayacaksanız iki değeri toplayın.'],
    ['Farklı boyutlarda pencerelerim var, nasıl girerim?', 'Pencerelerin alanlarını ayrı ayrı hesaplayıp toplayın, sonra pencere sayısına 1, enine 1 ve yüksekliğine bu toplam alanı yazın. Böylece toplam boşluk doğru düşülür.'],
    ['100 metrekare evin duvar alanı kaç metrekaredir?', 'Tek bir sayı vermek mümkün değildir; oda sayısına, iç duvar miktarına ve tavan yüksekliğine bağlıdır. En sağlıklı yöntem her odayı bu araçla ayrı ayrı hesaplayıp sonuçları toplamaktır.'],
    ['Oda ölçülerim bir yere kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız ölçüler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['boya-fayans-hesapla', 'duvar-kagidi-hesapla', 'siva-hesapla', 'alcipan-hesapla', 'supurgelik-hesapla', 'oda-hacmi-hesapla'],
};
