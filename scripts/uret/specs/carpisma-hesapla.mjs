export default {
  slug: 'carpisma-hesapla',
  title: 'Esnek ve Esnek Olmayan Çarpışma Hesaplama',
  h1Tail: 'son hızlar ve enerji kaybı',
  pageTitle: 'Esnek ve Esnek Olmayan Çarpışma Hesaplama – Son Hız ve Enerji Kaybı',
  description: 'Tek boyutta esnek, kısmen esnek ve tam esnek olmayan çarpışmalarda cisimlerin son hızlarını, toplam momentumu ve kaybolan kinetik enerjiyi hesaplayın.',
  card: 'İki cismin merkezî çarpışmasında son hızları, korunan momentumu ve kinetik enerji kaybını hesaplayın.',
  category: 'bilim',
  keywords: ['çarpışma hesaplama', 'esnek çarpışma', 'esnek olmayan çarpışma', 'momentum korunumu', 'çarpışma sonrası hız', 'ortak hız hesaplama', 'kinetik enerji kaybı', 'çarpışma katsayısı'],
  lead: 'Aynı doğru üzerinde hareket eden iki cismin çarpışma sonrası hızlarını bulun. Araç momentumun korunumunu kullanır; <strong>esnek</strong>, <strong>tam esnek olmayan (yapışan)</strong> ve geri sıçrama katsayısıyla tanımlanan <strong>kısmen esnek</strong> çarpışmaları hesaplar, kinetik enerji kaybını da gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'tur', label: 'Çarpışma türü', type: 'select', options: [['esnek', 'Esnek (kinetik enerji korunur)'], ['yapisan', 'Tam esnek olmayan (cisimler yapışır)'], ['kismi', 'Kısmen esnek (geri sıçrama katsayısı ile)']] },
    { id: 'm1', label: 'Birinci cismin kütlesi m₁ (kg)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'v1', label: 'Birinci cismin ilk hızı v₁ (m/s)', type: 'number', placeholder: 'Örn. 3', hint: 'Sağa doğru hareket pozitif, sola doğru hareket negatif yazılır.' },
    { id: 'm2', label: 'İkinci cismin kütlesi m₂ (kg)', type: 'number', placeholder: 'Örn. 1' },
    { id: 'v2', label: 'İkinci cismin ilk hızı v₂ (m/s)', type: 'number', value: '0', hint: 'Duran cisim için 0; karşıdan geliyorsa negatif değer girin.' },
    { id: 'e', label: 'Geri sıçrama katsayısı e (0–1)', type: 'number', placeholder: 'Örn. 0,5', hint: 'Yalnızca kısmen esnek çarpışmada kullanılır. 1 tam esnek, 0 tam esnek olmayan çarpışmadır.' },
  ],
  compute(v, h) {
    const m1 = h.pos(v.m1, 'Birinci cismin kütlesi');
    const m2 = h.pos(v.m2, 'İkinci cismin kütlesi');
    const u1 = h.num(v.v1, 'Birinci cismin ilk hızı');
    const u2 = h.num(v.v2, 'İkinci cismin ilk hızı');
    if (u1 === u2) h.err('İki cismin hızı aynıysa çarpışma olmaz. Hızlardan birini değiştirin.');
    let e = 1;
    if (v.tur === 'yapisan') e = 0;
    else if (v.tur === 'kismi') {
      e = h.num(v.e, 'Geri sıçrama katsayısı');
      if (e < 0 || e > 1) h.err('Geri sıçrama katsayısı 0 ile 1 arasında olmalı.');
    }
    const M = m1 + m2;
    const p = m1 * u1 + m2 * u2;
    const s1 = (p + m2 * e * (u2 - u1)) / M;
    const s2 = (p + m1 * e * (u1 - u2)) / M;
    const ke0 = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    const ke1 = 0.5 * m1 * s1 * s1 + 0.5 * m2 * s2 * s2;
    let kayip = ke0 - ke1;
    if (Math.abs(kayip) < 1e-9 * Math.max(1, ke0)) kayip = 0;
    const hiz = (x) => h.fmt(x, 4) + ' m/s';
    const rows = [];
    if (v.tur === 'yapisan') {
      rows.push(['Ortak son hız', hiz(s1)]);
    } else {
      rows.push(['Birinci cismin son hızı', hiz(s1)]);
      rows.push(['İkinci cismin son hızı', hiz(s2)]);
    }
    rows.push(['Toplam momentum (korunur)', h.fmt(p, 4) + ' kg·m/s']);
    rows.push(['İlk kinetik enerji', h.fmt(ke0, 4) + ' J']);
    rows.push(['Son kinetik enerji', h.fmt(ke0 - kayip, 4) + ' J']);
    rows.push(['Kaybolan kinetik enerji', h.fmt(kayip, 4) + ' J']);
    rows.push(['Enerji kaybı oranı', '%' + h.fmt(kayip / ke0 * 100, 2)]);
    rows.push(['Kütle merkezinin hızı', hiz(p / M)]);
    return {
      rows,
      note: 'Çarpışma tek boyutlu (merkezî) kabul edilir ve dış kuvvetler ihmal edilir. Negatif hız, seçtiğiniz pozitif yönün tersine hareketi gösterir.',
    };
  },
  cases: [
    { in: { tur: 'esnek', m1: '2', v1: '3', m2: '1', v2: '0' }, out: { 'Birinci cismin son hızı': '1 m/s', 'İkinci cismin son hızı': '4 m/s', 'Toplam momentum (korunur)': '6 kg·m/s', 'Kaybolan kinetik enerji': '0 J' } },
    { in: { tur: 'yapisan', m1: '2', v1: '3', m2: '1', v2: '0' }, out: { 'Ortak son hız': '2 m/s', 'İlk kinetik enerji': '9 J', 'Son kinetik enerji': '6 J', 'Kaybolan kinetik enerji': '3 J', 'Enerji kaybı oranı': '%33,33' } },
    { in: { tur: 'esnek', m1: '1', v1: '5', m2: '1', v2: '0' }, out: { 'Birinci cismin son hızı': '0 m/s', 'İkinci cismin son hızı': '5 m/s' } },
    { in: { tur: 'yapisan', m1: '1000', v1: '20', m2: '1500', v2: '0' }, out: { 'Ortak son hız': '8 m/s', 'Kaybolan kinetik enerji': '120.000 J', 'Enerji kaybı oranı': '%60' } },
    { in: { tur: 'esnek', m1: '1', v1: '2', m2: '3', v2: '-2' }, out: { 'Birinci cismin son hızı': '-4 m/s', 'İkinci cismin son hızı': '0 m/s', 'İlk kinetik enerji': '8 J', 'Son kinetik enerji': '8 J' } },
    { in: { tur: 'yapisan', m1: '3', v1: '4', m2: '3', v2: '-4' }, out: { 'Ortak son hız': '0 m/s', 'Kaybolan kinetik enerji': '48 J', 'Enerji kaybı oranı': '%100' } },
    { in: { tur: 'kismi', m1: '2', v1: '3', m2: '1', v2: '0', e: '0,5' }, out: { 'Birinci cismin son hızı': '1,5 m/s', 'İkinci cismin son hızı': '3 m/s', 'Son kinetik enerji': '6,75 J', 'Kaybolan kinetik enerji': '2,25 J' } },
    { in: { tur: 'esnek', m1: '0', v1: '3', m2: '1', v2: '0' }, error: true },
    { in: { tur: 'kismi', m1: '2', v1: '3', m2: '1', v2: '0', e: '1,5' }, error: true },
    { in: { tur: 'esnek', m1: '2', v1: '3', m2: '1', v2: '3' }, error: true },
  ],
  howto: [
    '"Çarpışma türü" listesinden esnek, tam esnek olmayan (yapışan) ya da kısmen esnek seçeneğini işaretleyin.',
    'İki cismin kütlelerini kilogram olarak yazın. Gram verilmişse bine bölerek girin.',
    'İlk hızları m/s cinsinden girin. Bir yönü pozitif seçin; ters yönde giden cismin hızını eksi işaretiyle yazın. Duran cisim için 0 bırakın.',
    'Kısmen esnek çarpışma seçtiyseniz 0 ile 1 arasında bir geri sıçrama katsayısı yazın.',
    '"Hesapla" düğmesine basın. Son hızlar, korunan momentum, çarpışma öncesi ve sonrası kinetik enerji ile kayıp oranı listelenir.',
  ],
  sections: [
    { h: 'Çarpışma türleri', p: [
      'İki cisim çarpıştığında, çarpışma süresince birbirlerine uyguladıkları kuvvetler eşit büyüklükte ve zıt yönlüdür. Dışarıdan net bir kuvvet etki etmiyorsa sistemin toplam momentumu çarpışmadan önce ve sonra aynıdır. Bu kural çarpışmanın türü ne olursa olsun geçerlidir. Çarpışma türlerini birbirinden ayıran şey kinetik enerjinin başına gelendir.',
      '<strong>Esnek çarpışmada</strong> toplam kinetik enerji de korunur; cisimler şekil değiştirmeden, ısı ve ses açığa çıkarmadan birbirinden ayrılır. Bilardo toplarının ya da atom altı parçacıkların çarpışması buna çok yakındır. <strong>Tam esnek olmayan çarpışmada</strong> cisimler birbirine yapışır ve ortak bir hızla hareket eder; kinetik enerjinin mümkün olan en büyük bölümü ısıya, sese ve kalıcı şekil değişikliğine dönüşür. Gerçek çarpışmaların çoğu bu iki ucun arasında kalır ve <strong>kısmen esnek</strong> olarak adlandırılır.',
    ] },
    { h: 'Kullanılan formüller', p: [
      'Momentumun korunumu her durumda <strong>m₁·v₁ + m₂·v₂ = m₁·v₁′ + m₂·v₂′</strong> biçiminde yazılır. Esnek çarpışmada buna kinetik enerjinin korunumu eklenir ve iki denklemin çözümü şu sonuçları verir: <strong>v₁′ = [(m₁ − m₂)·v₁ + 2·m₂·v₂]/(m₁ + m₂)</strong> ve <strong>v₂′ = [(m₂ − m₁)·v₂ + 2·m₁·v₁]/(m₁ + m₂)</strong>.',
      'Tam esnek olmayan çarpışmada cisimler birlikte hareket ettiğinden tek bir bilinmeyen kalır: <strong>v′ = (m₁·v₁ + m₂·v₂)/(m₁ + m₂)</strong>. Bu değer aynı zamanda sistemin kütle merkezinin hızıdır ve çarpışmadan etkilenmez.',
      'Kısmen esnek çarpışmada geri sıçrama katsayısı <strong>e = (v₂′ − v₁′)/(v₁ − v₂)</strong> olarak tanımlanır; yani ayrılma hızının yaklaşma hızına oranıdır. e = 1 esnek, e = 0 tam esnek olmayan çarpışmaya karşılık gelir. Araç üç durumu da bu genel bağıntıyla çözer.',
    ] },
    { h: 'Çözümlü örnek: aynı cisimler, iki farklı sonuç', p: [
      '3 m/s hızla ilerleyen 2 kg\'lık bir araba, duran 1 kg\'lık bir arabaya çarpıyor. Toplam momentum 2 × 3 + 1 × 0 = 6 kg·m/s, ilk kinetik enerji ½ × 2 × 3² = 9 J\'dür.',
      '<strong>Esnek ise:</strong> v₁′ = (2 − 1) × 3/(2 + 1) = 1 m/s ve v₂′ = 2 × 2 × 3/3 = 4 m/s bulunur. Kontrol: momentum 2 × 1 + 1 × 4 = 6 kg·m/s, kinetik enerji ½ × 2 × 1² + ½ × 1 × 4² = 1 + 8 = 9 J. İkisi de korunmuştur.',
      '<strong>Cisimler yapışırsa:</strong> ortak hız v′ = 6/3 = 2 m/s olur. Son kinetik enerji ½ × 3 × 2² = 6 J\'dür; 3 J, yani başlangıç enerjisinin %33,33\'ü kaybolmuştur. <strong>e = 0,5 ise:</strong> son hızlar 1,5 m/s ve 3 m/s, son kinetik enerji 6,75 J, kayıp 2,25 J olur. Görüldüğü gibi momentum üç durumda da 6 kg·m/s\'dir; değişen yalnızca enerjinin ne kadarının hareket olarak kaldığıdır.',
    ] },
    { h: 'Özel durumlar', ul: [
      '<strong>Eşit kütleler, esnek çarpışma:</strong> cisimler hızlarını değiş tokuş eder. Hareketli top durur, duran top onun hızıyla yola çıkar.',
      '<strong>Ağır cisim hafif duran cisme çarparsa:</strong> ağır cisim hızını neredeyse korur, hafif cisim yaklaşık iki katı hızla fırlar.',
      '<strong>Hafif cisim çok ağır duran cisme çarparsa:</strong> hafif cisim neredeyse aynı süratle geri döner, ağır cisim hemen hemen yerinde kalır. Duvara çarpan top bu durumun sınırıdır.',
      '<strong>Eşit ve zıt momentumlu cisimler yapışırsa:</strong> ortak hız sıfır olur ve kinetik enerjinin tamamı kaybolur.',
    ] },
    { h: 'Kaybolan enerji nereye gider?', p: [
      'Enerji yok olmaz; kinetik enerjinin eksilen kısmı cisimlerin ısınmasına, kalıcı biçim değiştirmesine, titreşime ve sese dönüşür. 20 m/s hızla giden 1000 kg\'lık bir aracın duran 1500 kg\'lık bir araca çarpıp kenetlendiği örnekte ortak hız 8 m/s çıkar; 200.000 J\'lük başlangıç enerjisinin 120.000 J\'ü, yani %60\'ı şekil değişimine ve ısıya gider. Otomobillerdeki ezilme bölgeleri bu enerjiyi yolculardan uzakta ve denetimli biçimde harcamak için tasarlanır.',
    ] },
    { h: 'İşaretler, sık hatalar ve sınırlar', p: [
      'En sık yapılan hata yönleri işaretsiz girmektir. Hız vektörel bir büyüklüktür; karşılıklı yaklaşan iki cisimden birinin hızı mutlaka negatif yazılmalıdır. İkinci yaygın hata, esnek olmayan çarpışmada kinetik enerjinin korunduğunu varsaymaktır; korunan momentumdur. Üçüncüsü, kütleleri gram, hızları km/saat olarak bırakmaktır: 72 km/saat 20 m/s eder.',
      'Araç çarpışmayı tek boyutta, yani cisimlerin aynı doğru üzerinde hareket ettiği merkezî çarpışma olarak ele alır. Açılı çarpışmalarda momentum her eksen için ayrı korunur ve ek bilgi gerekir. Sürtünme, dönme hareketi ve çarpışma sırasında etki eden dış kuvvetler hesaba katılmaz. Sonuçlar ders çalışması ve kavramsal inceleme içindir; kaza analizi gibi uygulamalar uzmanlık gerektiren ayrıntılı yöntemlerle yapılır.',
    ] },
  ],
  faq: [
    ['Esnek ve esnek olmayan çarpışma arasındaki fark nedir?', 'İkisinde de momentum korunur. Esnek çarpışmada kinetik enerji de korunurken, esnek olmayan çarpışmada kinetik enerjinin bir kısmı ısı, ses ve şekil değişimine dönüşür. Cisimler yapışıyorsa çarpışma tam esnek olmayan çarpışmadır.'],
    ['Çarpışmada momentum her zaman korunur mu?', 'Sisteme dışarıdan net bir kuvvet etki etmiyorsa evet. Çarpışma çok kısa sürdüğü için sürtünme gibi dış kuvvetlerin etkisi genellikle ihmal edilir ve toplam momentum çarpışmanın hemen öncesi ile hemen sonrasında eşit alınır.'],
    ['Ortak hız nasıl bulunur?', 'Toplam momentum toplam kütleye bölünür: v′ = (m₁·v₁ + m₂·v₂)/(m₁ + m₂). Zıt yönlü hızlardan biri negatif alınmalıdır. Örneğin 2 kg ve 3 m/s ile duran 1 kg için ortak hız 2 m/s\'dir.'],
    ['Eşit kütleli cisimlerin esnek çarpışmasında ne olur?', 'Cisimler hızlarını değiştirir. Biri duruyorsa, çarpan cisim durur ve duran cisim çarpanın hızıyla hareket eder. Sarkaçlı çelik bilye düzeneğinde görülen davranış budur.'],
    ['Geri sıçrama katsayısı nedir?', 'Çarpışma sonrası ayrılma hızının çarpışma öncesi yaklaşma hızına oranıdır ve 0 ile 1 arasında değer alır. Malzemeye, hıza ve sıcaklığa bağlı olarak deneyle belirlenir; sabit bir malzeme özelliği gibi düşünülmemelidir.'],
    ['Sonuçta negatif hız çıkması ne anlama gelir?', 'Cismin, pozitif kabul ettiğiniz yönün tersine hareket ettiğini gösterir. Örneğin hafif bir cisim ağır bir cisme çarpıp geri dönüyorsa son hızı negatif çıkar.'],
    ['Esnek olmayan çarpışmada enerji korunumu bozulur mu?', 'Hayır. Toplam enerji yine korunur; yalnızca kinetik enerjinin bir bölümü başka enerji türlerine dönüşür. Araçtaki "kaybolan kinetik enerji" satırı bu dönüşen miktarı gösterir.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; girdiğiniz kütle ve hız değerleri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['momentum-hesapla', 'kinetik-enerji-hesapla', 'itme-hesapla', 'kuvvet-hesapla', 'ivme-hesapla'],
};
