export default {
  slug: 'beaufort-ruzgar-cevir',
  title: 'Beaufort Rüzgâr Ölçeği Çevirici',
  h1Tail: 'km/sa, m/sn, knot ↔ bofor',
  pageTitle: 'Beaufort Rüzgâr Ölçeği Çevirici – Rüzgâr Hızı Kaç Bofor?',
  description: 'Rüzgâr hızını km/sa, m/sn, knot ya da mil/sa olarak yazın, Beaufort (bofor) kuvvetini ve adını öğrenin; bofor değerinden hız aralığına da çevirin.',
  card: 'Rüzgâr hızını Beaufort (bofor) kuvvetine ya da bofor değerini hız aralığına çevirin; karadaki ve denizdeki etkileriyle.',
  category: 'gunluk',
  keywords: ['beaufort ölçeği', 'bofor hesaplama', 'rüzgar kaç bofor', 'bofor km çevirme', 'rüzgar kuvveti hesaplama', 'knot bofor çevirme', 'rüzgar şiddeti ölçeği', '7 bofor kaç km'],
  lead: 'Denizcilik bültenlerinde rüzgâr "6-7 kuvvetinde" diye duyurulur, hava durumu uygulamanız ise km/sa gösterir. Bu araç, rüzgâr hızını <strong>Beaufort (bofor) kuvvetine</strong> ve bofor değerini karşılık geldiği hız aralığına çevirir; her kuvvetin adını, karada ve denizde nasıl göründüğünü de yazar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 45' },
    { id: 'birim', label: 'Girdiğiniz değerin birimi', type: 'select', options: [['kmh', 'km/sa'], ['ms', 'm/sn'], ['knot', 'knot (deniz mili/sa)'], ['mph', 'mil/sa (mph)'], ['bft', 'Beaufort kuvveti (0-12)']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const ADLAR = ['Sakin', 'Esinti', 'Hafif rüzgâr', 'Tatlı rüzgâr', 'Orta rüzgâr', 'Sert rüzgâr', 'Kuvvetli rüzgâr', 'Fırtınamsı rüzgâr', 'Fırtına', 'Kuvvetli fırtına', 'Tam fırtına', 'Çok şiddetli fırtına', 'Kasırga'];
    const KARA = [
      'Duman dik yükselir, yapraklar kıpırdamaz',
      'Duman rüzgârın yönünü gösterir, rüzgâr gülü dönmez',
      'Rüzgâr yüzde hissedilir, yapraklar hışırdar',
      'Yapraklar ve ince dallar sürekli kıpırdar, hafif bayraklar açılır',
      'Toz ve kâğıt parçaları havalanır, küçük dallar sallanır',
      'Yapraklı küçük ağaçlar sallanmaya başlar',
      'Büyük dallar sallanır, teller ıslık çalar, şemsiye kullanmak güçleşir',
      'Ağaçlar bütünüyle sallanır, rüzgâra karşı yürümek zorlaşır',
      'İnce dallar kırılır, yürümek çok güçleşir',
      'Hafif yapısal hasar görülür, kiremitler ve baca başlıkları uçabilir',
      'Ağaçlar kökünden sökülebilir, yapılarda ciddi hasar olur',
      'Yaygın ve ağır hasar görülür',
      'Yıkıcı etki; çok ağır ve yaygın hasar',
    ];
    const DENIZ = [
      'Deniz ayna gibi düzdür',
      'Balık pulu görünümünde kırışıklıklar oluşur, köpük yoktur',
      'Kısa, belirgin dalgacıklar; tepeleri kırılmaz',
      'Büyük dalgacıklar; tepeler kırılmaya başlar, yer yer köpük',
      'Küçük dalgalar uzar, köpüklü tepeler sıklaşır',
      'Orta boy uzun dalgalar, çok sayıda köpüklü tepe, yer yer serpinti',
      'Büyük dalgalar oluşur, beyaz köpüklü tepeler her yerdedir',
      'Deniz kabarır, kırılan dalgaların köpüğü şeritler halinde savrulur',
      'Orta yükseklikte uzun dalgalar, belirgin köpük şeritleri',
      'Yüksek dalgalar, yoğun köpük şeritleri; serpinti görüşü azaltır',
      'Çok yüksek, sarkan tepeli dalgalar; deniz yüzeyi beyaz görünür',
      'Olağanüstü yüksek dalgalar; küçük ve orta boy tekneler dalga arasında kaybolur',
      'Hava köpük ve serpintiyle dolar, deniz bembeyazdır, görüş çok kısıtlıdır',
    ];
    const KN = 0.514444;
    const MPH = 0.44704;
    if (v.birim === 'bft') {
      if (!Number.isInteger(x) || x > 12) h.err('Beaufort kuvveti 0 ile 12 arasında bir tam sayı olmalı.');
      const alt = x === 0 ? 0 : 0.836 * Math.pow(x - 0.5, 1.5);
      const ust = 0.836 * Math.pow(x + 0.5, 1.5);
      const aralik = (k, d, birim) => (x === 12 ? `${h.fmt(alt * k, d)} ${birim} ve üzeri` : `${h.fmt(alt * k, d)} – ${h.fmt(ust * k, d)} ${birim}`);
      return {
        rows: [
          ['Rüzgârın adı', ADLAR[x]],
          ['Hız aralığı (km/sa)', aralik(3.6, 1, 'km/sa')],
          ['Hız aralığı (m/sn)', aralik(1, 1, 'm/sn')],
          ['Hız aralığı (knot)', aralik(1 / KN, 1, 'knot')],
          ['Karada', KARA[x]],
          ['Denizde', DENIZ[x]],
        ],
        note: 'Aralıklar v = 0,836 × B^1,5 (m/sn) bağıntısından hesaplanır; basılı tablolardaki tam sayıya yuvarlanmış sınırlarla küçük farklar olabilir.',
      };
    }
    const ms = x * (v.birim === 'ms' ? 1 : v.birim === 'knot' ? KN : v.birim === 'mph' ? MPH : 1 / 3.6);
    if (ms > 140) h.err('Rüzgâr hızı çok yüksek görünüyor (500 km/sa üzeri); değeri ve birimi kontrol edin.');
    const B = Math.min(12, Math.round(Math.pow(ms / 0.836, 2 / 3) + 1e-9));
    return {
      rows: [
        ['Beaufort kuvveti', String(B)],
        ['Rüzgârın adı', ADLAR[B]],
        ['km/sa', h.fmt(ms * 3.6, 1) + ' km/sa'],
        ['m/sn', h.fmt(ms, 2) + ' m/sn'],
        ['knot', h.fmt(ms / KN, 1) + ' knot'],
        ['mil/sa', h.fmt(ms / MPH, 1) + ' mil/sa'],
        ['Karada', KARA[B]],
        ['Denizde', DENIZ[B]],
      ],
      note: 'Beaufort kuvveti, 10 m yükseklikte ölçülen ortalama rüzgâr hızına göre belirlenir; hamleler (ani esintiler) bu değerin belirgin biçimde üzerine çıkabilir.',
    };
  },
  cases: [
    { in: { deger: '20', birim: 'kmh' }, out: { 'Beaufort kuvveti': '4', 'Rüzgârın adı': 'Orta rüzgâr', 'm/sn': '5,56 m/sn', 'knot': '10,8 knot' } },
    { in: { deger: '50', birim: 'kmh' }, out: { 'Beaufort kuvveti': '7', 'Rüzgârın adı': 'Fırtınamsı rüzgâr', 'knot': '27 knot' } },
    { in: { deger: '10', birim: 'ms' }, out: { 'Beaufort kuvveti': '5', 'Rüzgârın adı': 'Sert rüzgâr', 'km/sa': '36 km/sa' } },
    { in: { deger: '35', birim: 'knot' }, out: { 'Beaufort kuvveti': '8', 'Rüzgârın adı': 'Fırtına', 'km/sa': '64,8 km/sa' } },
    { in: { deger: '4', birim: 'bft' }, out: { 'Rüzgârın adı': 'Orta rüzgâr', 'Hız aralığı (km/sa)': '19,7 – 28,7 km/sa', 'Hız aralığı (knot)': '10,6 – 15,5 knot' } },
    { in: { deger: '0', birim: 'kmh' }, out: { 'Beaufort kuvveti': '0', 'Rüzgârın adı': 'Sakin' } },
    { in: { deger: '120', birim: 'kmh' }, out: { 'Beaufort kuvveti': '12', 'Rüzgârın adı': 'Kasırga' } },
    { in: { deger: '75', birim: 'kmh' }, out: { 'Beaufort kuvveti': '9', 'Rüzgârın adı': 'Kuvvetli fırtına' } },
    { in: { deger: '12', birim: 'bft' }, out: { 'Rüzgârın adı': 'Kasırga', 'Hız aralığı (km/sa)': '117,4 km/sa ve üzeri' } },
    { in: { deger: '7', birim: 'bft' }, out: { 'Hız aralığı (km/sa)': '49,9 – 61,8 km/sa', 'Hız aralığı (m/sn)': '13,9 – 17,2 m/sn' } },
    { in: { deger: '13', birim: 'bft' }, error: true },
    { in: { deger: '4,5', birim: 'bft' }, error: true },
    { in: { deger: '', birim: 'kmh' }, error: true },
    { in: { deger: '-20', birim: 'kmh' }, error: true },
  ],
  howto: [
    '"Değer" alanına rüzgâr hızını ya da Beaufort kuvvetini yazın.',
    '"Girdiğiniz değerin birimi" listesinden yazdığınız sayının ne olduğunu seçin: km/sa, m/sn, knot, mil/sa ya da 0-12 arası Beaufort kuvveti.',
    '"Çevir" düğmesine basın. Hız girdiyseniz Beaufort kuvvetini, rüzgârın adını ve diğer birimlerdeki karşılıklarını; Beaufort kuvveti girdiyseniz bu kuvvetin kapsadığı hız aralığını görürsünüz.',
    '"Karada" ve "Denizde" satırlarını okuyarak o kuvvetteki rüzgârın çevrede nasıl belirtiler verdiğini öğrenin.',
  ],
  sections: [
    { h: 'Beaufort ölçeği nedir?', p: [
      'Beaufort ölçeği, rüzgârın şiddetini 0 ile 12 arasında bir sayıyla ifade eden bir sınıflamadır. İngiliz amiral Francis Beaufort tarafından 1805\'te, rüzgârı ölçecek alet bulunmayan yelkenli gemilerde gözleme dayalı ortak bir dil oluşturmak için geliştirildi. Başlangıçta her basamak, bir savaş gemisinin o rüzgârda ne kadar yelken taşıyabildiğine göre tanımlanıyordu. Sonraki yıllarda basamaklar deniz yüzeyinin görünümüne ve karadaki belirtilere, ardından da ölçülen rüzgâr hızlarına bağlandı.',
      'Türkçede ölçek "bofor" olarak da anılır; "rüzgâr 7 bofor" ile "7 kuvvetinde rüzgâr" aynı anlama gelir. Denizcilik hava raporlarında, fırtına ihbarlarında ve liman duyurularında rüzgâr hâlâ çoğunlukla bu ölçekle bildirilir.',
    ] },
    { h: 'Hız ile Beaufort kuvveti arasındaki bağıntı', p: [
      'Ölçek, 10 metre yükseklikte ölçülen ortalama rüzgâr hızıyla şu deneysel bağıntı üzerinden ilişkilendirilir: <strong>v = 0,836 × B<sup>1,5</sup></strong> (m/sn). Tersinden, hızı bilinen bir rüzgârın kuvveti <code>B = (v ÷ 0,836)<sup>2/3</sup></code> değerinin en yakın tam sayıya yuvarlanmasıyla bulunur. Araç tam olarak bunu yapar; 12\'nin üzerindeki sonuçlar 12 olarak gösterilir.',
      'Girdiğiniz birim önce m/sn\'ye çevrilir: 1 km/sa = 1 ÷ 3,6 m/sn, 1 knot = 0,514444 m/sn, 1 mil/sa = 0,44704 m/sn. Beaufort kuvvetinden hıza çevirirken aralığın alt ve üst sınırı, B − 0,5 ve B + 0,5 değerleri aynı bağıntıya konularak hesaplanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Hava durumu 50 km/sa rüzgâr gösteriyor. 50 ÷ 3,6 = 13,89 m/sn. 13,89 ÷ 0,836 = 16,61; bunun 2/3\'üncü kuvveti 6,51\'dir ve 7\'ye yuvarlanır. Sonuç <strong>7 kuvvetinde, fırtınamsı rüzgâr</strong>; knot karşılığı 27\'dir.',
      '<strong>Örnek 2:</strong> Denizcilik raporunda 35 knot yazıyor. 35 × 0,514444 = 18,0 m/sn, yani 64,8 km/sa. Bağıntı 7,75 verir ve 8\'e yuvarlanır: <strong>fırtına</strong>.',
      '<strong>Örnek 3:</strong> "Rüzgâr 4 kuvvetinde" duyurusu ne demek? Alt sınır 0,836 × 3,5<sup>1,5</sup> = 5,47 m/sn, üst sınır 0,836 × 4,5<sup>1,5</sup> = 7,98 m/sn\'dir. Bu da 19,7 – 28,7 km/sa ya da 10,6 – 15,5 knot aralığıdır.',
    ] },
    { h: 'Beaufort tablosu (yaklaşık km/sa aralıkları)', ul: [
      '<strong>0 – Sakin:</strong> 1 km/sa\'in altı',
      '<strong>1 – Esinti:</strong> 1-5 km/sa',
      '<strong>2 – Hafif rüzgâr:</strong> 6-11 km/sa',
      '<strong>3 – Tatlı rüzgâr:</strong> 12-19 km/sa',
      '<strong>4 – Orta rüzgâr:</strong> 20-28 km/sa',
      '<strong>5 – Sert rüzgâr:</strong> 29-38 km/sa',
      '<strong>6 – Kuvvetli rüzgâr:</strong> 39-49 km/sa',
      '<strong>7 – Fırtınamsı rüzgâr:</strong> 50-61 km/sa',
      '<strong>8 – Fırtına:</strong> 62-74 km/sa',
      '<strong>9 – Kuvvetli fırtına:</strong> 75-88 km/sa',
      '<strong>10 – Tam fırtına:</strong> 89-102 km/sa',
      '<strong>11 – Çok şiddetli fırtına:</strong> 103-117 km/sa',
      '<strong>12 – Kasırga:</strong> 118 km/sa ve üzeri',
    ] },
    { h: 'Bültenleri okurken bilinmesi gerekenler', p: [
      'Beaufort kuvveti <strong>ortalama</strong> rüzgârı anlatır. Ortalama, genellikle on dakikalık bir süre üzerinden alınır; bu süre içindeki kısa süreli hamleler ortalamanın belirgin biçimde üzerine çıkabilir. Bültende "5-6 kuvvetinde, hamlesi 8" gibi bir ifade görürseniz planı hamleye göre yapmak gerekir.',
      'Türkiye\'de denizcilik raporlarında rüzgâr, yön adıyla birlikte verilir: yıldız (kuzey), poyraz (kuzeydoğu), gündoğusu (doğu), keşişleme (güneydoğu), kıble (güney), lodos (güneybatı), günbatısı (batı) ve karayel (kuzeybatı). "Lodos 6-8" denildiğinde güneybatıdan 39-74 km/sa aralığında bir rüzgâr beklenir. Fırtına ihbarları çoğunlukla 8 ve üzeri kuvvetler için yayımlanır.',
      'Ölçekteki adlar kaynaktan kaynağa küçük farklar gösterebilir; örneğin 3 için "hafif meltem", 12 için "orkan" adları da kullanılır. Sayılar ise her yerde aynıdır.',
    ] },
    { h: 'Kimler kullanır?', p: [
      'Yelkenciler camadan vurma (yelken küçültme) kararını, amatör balıkçılar ve küçük tekne sahipleri denize çıkıp çıkmamayı kuvvete göre değerlendirir. Rüzgâr sörfü ve uçurtma sörfü yapanlar yelken ve uçurtma boyunu knot ya da bofor üzerinden seçer. Yamaç paraşütü pilotları, drone kullananlar, vinç operatörleri ve açık hava etkinliği düzenleyenler için de rüzgâr sınırları belirleyicidir. Çiftçiler ilaçlama yaparken, kampçılar çadır yerini seçerken aynı ölçekten yararlanır. Elinizde ölçüm aleti yokken "Karada" ve "Denizde" satırlarındaki belirtilere bakarak rüzgârı kabaca kestirebilirsiniz.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bağıntı deneyseldir ve sınır değerlerde basılı tablolarla bir basamak fark edebilir; örneğin tam iki kuvvetin sınırındaki bir hız, kullanılan yuvarlamaya göre alt ya da üst basamağa düşebilir. Rüzgâr yerden yükseldikçe artar; elde ölçülen ya da alçak bir direkte ölçülen hız, 10 metredeki standart ölçümden düşük çıkar. Dalga durumu yalnızca rüzgâra değil, rüzgârın ne kadar süredir ve ne kadar uzun bir mesafe boyunca estiğine de bağlıdır.',
      'Bu sayfa bilgilendirme amaçlıdır. Denize çıkış, uçuş, yüksekte çalışma gibi güvenlikle ilgili kararlarda resmî meteoroloji tahmin ve ihbarlarını esas alın.',
    ] },
  ],
  faq: [
    ['7 bofor kaç km/sa eder?', '7 kuvveti yaklaşık 50-61 km/sa aralığındaki ortalama rüzgârı ifade eder; bu da 28-33 knot ya da 13,9-17,2 m/sn dolayındadır. Türkçe adı fırtınamsı rüzgârdır.'],
    ['Fırtına kaç boforda başlar?', 'Ölçekte "fırtına" adı 8 kuvvetiyle, yani yaklaşık 62 km/sa (34 knot) ortalama hızla başlar. 7 kuvveti "fırtınamsı rüzgâr" olarak adlandırılır.'],
    ['Beaufort ölçeği neden 12\'de bitiyor?', 'Ölçek tanımlandığında 12, bir yelkenlinin hiçbir yelken taşıyamadığı en şiddetli rüzgârı anlatıyordu. Daha güçlü tropikal fırtınalar için ayrı sınıflamalar kullanılır; bu araç 12\'nin üzerindeki hızları 12 olarak gösterir.'],
    ['Knot ile bofor arasındaki ilişki nedir?', 'Knot bir hız birimidir (saatte bir deniz mili, 1,852 km/sa), bofor ise hız aralıklarına verilen kuvvet numarasıdır. Örneğin 12-15 knot dolayındaki rüzgâr 4 kuvvetinde, 23-26 knot dolayındaki rüzgâr 6 kuvvetindedir.'],
    ['Hamle (ani rüzgâr) hesaba katılıyor mu?', 'Hayır. Ölçek ortalama rüzgâra göredir. Hamleler ortalamanın belirgin biçimde üzerine çıkabildiği için özellikle denizde ve yüksekte çalışırken ayrıca dikkate alınmalıdır.'],
    ['Küçük tekneyle kaç kuvvete kadar denize çıkılır?', 'Bu teknenin tipine, mürettebatın deneyimine ve denizin durumuna bağlıdır; tek bir sayı vermek doğru olmaz. Resmî tahminleri izleyin, teknenizin tasarım sınırlarını bilin ve kararsız kaldığınızda çıkmayın.'],
    ['Aletim yokken rüzgârın kuvvetini nasıl tahmin ederim?', 'Çevredeki belirtilere bakın: yapraklar hışırdıyorsa 2, toz ve kâğıt havalanıyorsa 4, büyük dallar sallanıp şemsiye kullanmak zorlaşıyorsa 6, rüzgâra karşı yürümek güçleşiyorsa 7 kuvveti dolayındadır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tamamen tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['knot-kmh-cevir', 'ms-kmh-cevir', 'ruzgar-hissedilen-sicaklik-hesapla', 'tekne-hizi-hesapla', 'kmh-mph-cevir'],
};
