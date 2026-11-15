// Beaufort Rüzgâr Ölçeği Çevirici — hesap mantığı. DOM yok, ağ yok; tarayıcıda çalışır.
export function compute(v, h) {
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
  }
