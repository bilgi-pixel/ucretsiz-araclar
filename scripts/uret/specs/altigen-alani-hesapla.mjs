export default {
  slug: 'altigen-alani-hesapla',
  title: 'Düzgün Altıgen Alanı Hesaplama',
  h1Tail: 'kenar, çevre ya da anahtar ağzından',
  pageTitle: 'Düzgün Altıgen Alanı Hesaplama – Kenar, Çevre ve Köşegenden',
  description: 'Düzgün altıgenin alanını kenar uzunluğu, çevre, karşılıklı kenar arası (anahtar ağzı) ya da köşeden köşeye ölçüsünden hesaplayın; apotem ve köşegenler de verilir.',
  card: 'Düzgün altıgenin alanını kenardan, çevreden ya da anahtar ağzı ölçüsünden bulun; apotem ve köşegenleriyle birlikte.',
  category: 'matematik',
  keywords: ['altıgen alanı hesaplama', 'düzgün altıgenin alanı formülü', 'altıgen çevresi', 'altıgen köşegen uzunluğu', 'altıgen apotem', 'anahtar ağzı köşe ölçüsü', 'bal peteği alanı'],
  lead: `Düzgün altıgenin alanını tek bir ölçüden hesaplayın. <strong>Kenar uzunluğu</strong>, <strong>çevre</strong>, <strong>karşılıklı iki kenar arası</strong> (somunlarda anahtar ağzı), <strong>köşeden köşeye uzunluk</strong> ya da <strong>alan</strong> değerinden herhangi birini yazmanız yeterlidir; diğerleri bulunur.`,
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Ölçü', type: 'number', placeholder: 'Örn. 2' },
    { id: 'tur', label: 'Yazdığınız ölçü', type: 'select', options: [['kenar', 'Kenar uzunluğu'], ['cevre', 'Çevre'], ['duz', 'Karşılıklı kenarlar arası (anahtar ağzı)'], ['kose', 'Köşeden köşeye (uzun köşegen)'], ['alan', 'Alan']] },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Ölçü');
    const k3 = Math.sqrt(3);
    let a;
    if (v.tur === 'cevre') a = x / 6;
    else if (v.tur === 'duz') a = x / k3;
    else if (v.tur === 'kose') a = x / 2;
    else if (v.tur === 'alan') a = Math.sqrt(2 * x / (3 * k3));
    else a = x;
    const alan = v.tur === 'alan' ? x : 3 * k3 / 2 * a * a;
    return {
      rows: [
        ['Alan', h.fmt(alan, 4) + ' birim²'],
        ['Kenar', h.fmt(a, 4) + ' birim'],
        ['Çevre', h.fmt(6 * a, 4) + ' birim'],
        ['Apotem (iç teğet çember yarıçapı)', h.fmt(a * k3 / 2, 4) + ' birim'],
        ['Çevrel çember yarıçapı', h.fmt(a, 4) + ' birim'],
        ['Köşeden köşeye (uzun köşegen)', h.fmt(2 * a, 4) + ' birim'],
        ['Karşılıklı kenarlar arası', h.fmt(a * k3, 4) + ' birim'],
      ],
      note: 'Alan = (3·√3 ÷ 2)·a² ≈ 2,5981·a². Düzgün altıgende çevrel çember yarıçapı kenar uzunluğuna eşittir.',
    };
  },
  cases: [
    { in: { deger: '2', tur: 'kenar' }, out: { 'Alan': '10,3923 birim²', 'Çevre': '12 birim', 'Apotem (iç teğet çember yarıçapı)': '1,7321 birim', 'Köşeden köşeye (uzun köşegen)': '4 birim', 'Karşılıklı kenarlar arası': '3,4641 birim' } },
    { in: { deger: '36', tur: 'cevre' }, out: { 'Alan': '93,5307 birim²', 'Kenar': '6 birim', 'Apotem (iç teğet çember yarıçapı)': '5,1962 birim' } },
    { in: { deger: '1', tur: 'kenar' }, out: { 'Alan': '2,5981 birim²', 'Apotem (iç teğet çember yarıçapı)': '0,866 birim' } },
    { in: { deger: '10', tur: 'kenar' }, out: { 'Alan': '259,8076 birim²', 'Çevrel çember yarıçapı': '10 birim' } },
    { in: { deger: '17', tur: 'duz' }, out: { 'Alan': '250,2813 birim²', 'Kenar': '9,815 birim', 'Köşeden köşeye (uzun köşegen)': '19,6299 birim' } },
    { in: { deger: '20', tur: 'kose' }, out: { 'Alan': '259,8076 birim²', 'Kenar': '10 birim', 'Karşılıklı kenarlar arası': '17,3205 birim' } },
    { in: { deger: '0,5', tur: 'kenar' }, out: { 'Alan': '0,6495 birim²', 'Çevre': '3 birim' } },
    { in: { deger: '259,8076', tur: 'alan' }, out: { 'Kenar': '10 birim', 'Çevre': '60 birim' } },
    { in: { deger: '0', tur: 'kenar' }, error: true },
    { in: { deger: 'altı', tur: 'cevre' }, error: true },
  ],
  howto: [
    `"Ölçü" kutusuna altıgenin bildiğiniz değerini yazın.`,
    `"Yazdığınız ölçü" listesinden bu değerin ne olduğunu seçin: kenar, çevre, karşılıklı kenarlar arası, köşeden köşeye uzunluk ya da alan.`,
    `"Hesapla" düğmesine basın. Alan ilk satırda görünür; kenar, çevre, apotem, yarıçap ve iki farklı genişlik ölçüsü ardından listelenir.`,
    `Sonuçları parça listesine ya da ödevinize aktarmak için "Sonucu kopyala" düğmesini kullanın.`,
  ],
  sections: [
    { h: 'Düzgün altıgenin alan formülü', p: [
      `Düzgün altıgen, altı kenarı eşit uzunlukta ve altı iç açısı 120° olan çokgendir. Merkezini köşelere birleştirdiğinizde şekil <strong>altı eş eşkenar üçgene</strong> ayrılır. Kenarı a olan eşkenar üçgenin alanı a² · √3 ÷ 4 olduğundan altıgenin alanı bunun altı katıdır: <strong>Alan = (3 · √3 ÷ 2) · a²</strong>. Katsayı yaklaşık 2,5981'dir; yani kenarı 1 birim olan düzgün altıgenin alanı yaklaşık 2,5981 birim²'dir.`,
      `Çözümlü örnek: kenarı 2 cm olan düzgün altıgende a² = 4, alan 2,5981 × 4 ≈ <strong>10,3923 cm²</strong>'dir. Çevre 6 × 2 = <strong>12 cm</strong>, apotem 2 × √3 ÷ 2 ≈ <strong>1,7321 cm</strong> olur. Alanı "çevre × apotem ÷ 2" ile de bulabilirsiniz: 12 × 1,7321 ÷ 2 ≈ 10,39; iki yol aynı sonuca varır.`,
    ] },
    { h: 'Apotem, yarıçap ve iki farklı genişlik', p: [
      `Altıgenin "genişliği" nereden ölçüldüğüne göre değişir ve bu karışıklık en sık yapılan hatanın kaynağıdır.`,
    ], ul: [
      `<strong>Çevrel çember yarıçapı:</strong> merkezden köşeye uzaklıktır ve kenar uzunluğuna eşittir (R = a). Pergeli kenar uzunluğu kadar açıp çemberi altı kez işaretleyerek altıgen çizilebilmesinin nedeni budur.`,
      `<strong>Apotem:</strong> merkezden kenarın ortasına inen dikmenin uzunluğudur, aynı zamanda iç teğet çemberin yarıçapıdır: a · √3 ÷ 2 ≈ 0,866 · a.`,
      `<strong>Köşeden köşeye:</strong> karşılıklı iki köşe arasındaki uzun köşegen, 2a.`,
      `<strong>Karşılıklı kenarlar arası:</strong> paralel iki kenar arasındaki uzaklık, apotemin iki katı: a · √3 ≈ 1,7321 · a. Aynı zamanda kısa köşegenin uzunluğudur.`,
    ] },
    { h: 'Somun ve cıvata başlarında anahtar ağzı', p: [
      `Altıgen başlı cıvata ve somunlarda anahtarın kavradığı ölçü, karşılıklı iki düz yüzey arasındaki mesafedir; buna anahtar ağzı denir. Köşeden köşeye ölçü bundan daima daha büyüktür ve oran sabittir: 2 ÷ √3 ≈ 1,1547.`,
      `Örnek: anahtar ağzı 17 mm olan bir somunda kenar uzunluğu 17 ÷ √3 ≈ <strong>9,815 mm</strong>, köşeden köşeye ölçü ≈ <strong>19,6299 mm</strong>, altıgen yüzün alanı ≈ <strong>250,2813 mm²</strong> çıkar. Somunun döneceği yuvanın ya da lokmanın sığacağı deliğin çapını belirlerken köşeden köşeye ölçüyü esas almak gerekir; yalnızca anahtar ağzına göre açılan delikte somun dönmez. Gerçek bağlantı elemanlarında köşeler pahlı olduğu için ölçülen değer hesaplanandan bir miktar küçük olabilir; kesin ölçü için ilgili standart tablosuna ya da kumpasla alınan ölçüye bakın.`,
    ] },
    { h: 'Neden bal peteği altıgendir?', p: [
      `Düzlemi boşluk bırakmadan kaplayabilen yalnızca üç düzgün çokgen vardır: eşkenar üçgen, kare ve düzgün altıgen. Bunların arasında aynı alanı en kısa çevreyle sınırlayan altıgendir. Arılar bu sayede en az balmumuyla en çok bal depolar. Aynı ilke mühendislikte de kullanılır: petek dolgulu paneller, hafif ama rijit yapılar elde etmek için altıgen hücrelerden oluşur.`,
      `Gündelik hayatta altıgen kaldırım ve zemin karoları, altıgen duvar seramikleri, kurşun kalem kesitleri, futbol topundaki beyaz paneller, vida başları ve kafes tel gözleri bu şeklin tanıdık örnekleridir.`,
    ] },
    { h: 'Karo döşemede adet hesabı', p: [
      `Altıgen karo alırken ambalajda genellikle karşılıklı kenarlar arası ya da köşeden köşeye ölçü yazar. Örneğin köşeden köşeye 20 cm olan bir karonun kenarı 10 cm, karşılıklı kenar arası yaklaşık 17,32 cm, alanı yaklaşık 259,81 cm²'dir. Bir metrekare 10.000 cm² olduğundan derzsiz hesapla metrekareye yaklaşık 38,5 adet düşer. Derz genişliği, kenar kesimleri ve kırılma payı için satıcının önerdiği fire oranını bu sayının üzerine eklemelisiniz.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      `İki genişlik ölçüsünü karıştırmak. Karşılıklı kenar arası ile köşeden köşeye ölçü arasında yaklaşık yüzde 15 fark vardır; listeden doğru seçeneği işaretleyin.`,
      `Formülü düzgün olmayan altıgene uygulamak. Kenarları ya da açıları eşit olmayan altıgenler için şekli üçgenlere bölerek hesap yapmak gerekir.`,
      `Apotemi yarıçap sanmak. Düzgün altıgende yarıçap kenara eşittir; apotem ondan kısadır.`,
      `Kenarın karesini 6 ile çarpmak. Altı parça kare değil eşkenar üçgendir; doğru katsayı yaklaşık 2,5981'dir.`,
    ] },
    { h: 'Birimler ve sınırlar', p: [
      `Araç birimden bağımsızdır; ölçüyü milimetre yazarsanız alan milimetrekare, santimetre yazarsanız santimetrekare çıkar. Ölçü sıfırdan büyük olmalıdır. Sonuçlar dört ondalık basamağa yuvarlanır. İmalat toleransı gerektiren işlerde hesap değerinin yanında parça üzerinden alınan gerçek ölçüyü de dikkate alın.`,
    ] },
  ],
  faq: [
    ['Düzgün altıgenin alanı nasıl hesaplanır?', 'Kenar uzunluğunun karesi 3√3 ÷ 2 ile, yani yaklaşık 2,5981 ile çarpılır. Kenarı 2 birim olan düzgün altıgenin alanı yaklaşık 10,3923 birim karedir.'],
    ['Altıgenin çevresi nasıl bulunur?', 'Altı kenar eşit olduğundan kenar uzunluğu altıyla çarpılır. Çevresi 36 birim olan düzgün altıgenin bir kenarı 6 birim, alanı yaklaşık 93,5307 birim karedir.'],
    ['Altıgenin kaç köşegeni vardır?', 'Dokuz köşegeni vardır. Bunlardan üçü merkezden geçen uzun köşegenlerdir ve uzunlukları kenarın iki katıdır; altısı kısa köşegendir ve uzunlukları kenarın √3 katıdır.'],
    ['Düzgün altıgenin iç açıları kaç derecedir?', 'Her iç açı 120 derecedir; altı iç açının toplamı 720 derece eder. Her dış açı 60 derecedir.'],
    ['Anahtar ağzından köşe ölçüsü nasıl bulunur?', 'Karşılıklı kenarlar arası ölçü 2 ÷ √3, yani yaklaşık 1,1547 ile çarpılır. 17 mm anahtar ağzı için köşeden köşeye ölçü yaklaşık 19,63 mm\'dir.'],
    ['Apotem nedir?', 'Apotem, düzgün çokgenin merkezinden bir kenarın orta noktasına inen dik uzaklıktır. Düzgün altıgende kenarın yaklaşık 0,866 katıdır ve alan, çevre ile apotemin çarpımının yarısına eşittir.'],
    ['Alanı bilinen altıgenin kenarı nasıl bulunur?', 'Alan 2,5981\'e bölünür ve karekökü alınır. Araçta ölçü türünü "Alan" seçerseniz kenar otomatik hesaplanır; alanı 259,8076 olan altıgenin kenarı 10 birimdir.'],
    ['Hesap sırasında verilerim paylaşılıyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; yazdığınız sayılar sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['duzgun-cokgen-alani-hesapla', 'cokgen-ic-aci-hesapla', 'ucgen-alani-hesapla', 'daire-alani-hesapla', 'alan-cevre-hesapla'],
};
