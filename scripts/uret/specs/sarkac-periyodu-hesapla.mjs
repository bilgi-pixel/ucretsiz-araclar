export default {
  slug: 'sarkac-periyodu-hesapla',
  title: 'Sarkaç Periyodu Hesaplama',
  h1Tail: 'T = 2π√(L/g)',
  pageTitle: 'Sarkaç Periyodu Hesaplama – Basit Sarkaç Formülü T = 2π√(L/g)',
  description: 'Basit sarkacın periyodunu ip uzunluğu ve yerçekimi ivmesinden hesaplayın; periyottan ip uzunluğunu ya da g değerini bulun. Frekans ve açısal frekans da gösterilir.',
  card: 'İp uzunluğundan basit sarkacın periyodunu ve frekansını bulun; periyottan uzunluğu ya da yerçekimi ivmesini hesaplayın.',
  category: 'bilim',
  keywords: ['sarkaç periyodu hesaplama', 'basit sarkaç formülü', 'sarkaç frekansı', 'sarkaç ip uzunluğu', 'sarkaçla g hesaplama', 'periyot hesaplama', 'saniye sarkacı'],
  lead: 'Basit sarkacın bir tam salınım süresini <strong>T = 2π√(L/g)</strong> bağıntısıyla hesaplayın. Aynı formülü tersine çevirerek istenen periyot için gereken ip uzunluğunu ya da ölçtüğünüz periyottan yerçekimi ivmesini de bulabilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'bul', label: 'Bulunacak büyüklük', type: 'select', options: [['periyot', 'Periyot (T)'], ['uzunluk', 'İp uzunluğu (L)'], ['g', 'Yerçekimi ivmesi (g)']] },
    { id: 'uzunluk', label: 'İp uzunluğu (m)', type: 'number', placeholder: 'Örn. 1', hint: 'Askı noktasından kütlenin merkezine kadar. Aranıyorsa boş bırakın.' },
    { id: 'periyot', label: 'Periyot (s)', type: 'number', placeholder: 'Örn. 2', hint: 'Bir tam gidiş-dönüş süresi. Aranıyorsa boş bırakın.' },
    { id: 'g', label: 'Yerçekimi ivmesi (m/s²)', type: 'number', value: '9,80665', hint: 'Dünya için standart değer 9,80665; Ay için yaklaşık 1,62. Aranıyorsa dikkate alınmaz.' },
  ],
  compute(v, h) {
    let L, T, g;
    if (v.bul === 'uzunluk') {
      T = h.pos(v.periyot, 'Periyot'); g = h.pos(v.g, 'Yerçekimi ivmesi');
      L = g * T * T / (4 * Math.PI * Math.PI);
    } else if (v.bul === 'g') {
      L = h.pos(v.uzunluk, 'İp uzunluğu'); T = h.pos(v.periyot, 'Periyot');
      g = 4 * Math.PI * Math.PI * L / (T * T);
    } else {
      L = h.pos(v.uzunluk, 'İp uzunluğu'); g = h.pos(v.g, 'Yerçekimi ivmesi');
      T = 2 * Math.PI * Math.sqrt(L / g);
    }
    const pS = ['Periyot', h.fmt(T, 4) + ' s'];
    const lS = ['İp uzunluğu', h.fmt(L, 4) + ' m'];
    const gS = ['Yerçekimi ivmesi', h.fmt(g, 4) + ' m/s²'];
    const ilk = v.bul === 'uzunluk' ? [lS, pS, gS] : v.bul === 'g' ? [gS, pS, lS] : [pS, lS, gS];
    return {
      rows: [
        ...ilk,
        ['Frekans', h.fmt(1 / T, 4) + ' Hz'],
        ['Açısal frekans', h.fmt(2 * Math.PI / T, 4) + ' rad/s'],
        ['Dakikadaki salınım sayısı', h.fmt(60 / T, 2)],
      ],
      note: 'Küçük açılı salınım (yaklaşık 15° altı), ağırlıksız ip ve sürtünmesiz ortam varsayılır. Periyot kütleye bağlı değildir.',
    };
  },
  cases: [
    { in: { bul: 'periyot', uzunluk: '1', g: '9,80665' }, out: { 'Periyot': '2,0064 s', 'Frekans': '0,4984 Hz' } },
    { in: { bul: 'uzunluk', periyot: '2', g: '9,80665' }, out: { 'İp uzunluğu': '0,9936 m', 'Frekans': '0,5 Hz', 'Dakikadaki salınım sayısı': '30' } },
    { in: { bul: 'g', uzunluk: '1', periyot: '2' }, out: { 'Yerçekimi ivmesi': '9,8696 m/s²', 'Açısal frekans': '3,1416 rad/s' } },
    { in: { bul: 'periyot', uzunluk: '0,25', g: '9,80665' }, out: { 'Periyot': '1,0032 s' } },
    { in: { bul: 'periyot', uzunluk: '9,80665', g: '9,80665' }, out: { 'Periyot': '6,2832 s', 'Açısal frekans': '1 rad/s' } },
    { in: { bul: 'periyot', uzunluk: '1', g: '1,62' }, out: { 'Periyot': '4,9365 s' } },
    { in: { bul: 'periyot', uzunluk: '-1', g: '9,80665' }, error: true },
    { in: { bul: 'periyot', uzunluk: '1', g: '0' }, error: true },
    { in: { bul: 'uzunluk', periyot: '', g: '9,80665' }, error: true },
  ],
  howto: [
    '"Bulunacak büyüklük" listesinden periyodu mu, ip uzunluğunu mu, yerçekimi ivmesini mi hesaplayacağınızı seçin.',
    'İp uzunluğunu metre olarak yazın. Uzunluk, askı noktasından sarkaç kütlesinin merkezine kadar ölçülür; 80 cm için 0,8 girin.',
    'Yerçekimi ivmesi alanı Dünya için standart değerle doludur. Sorunuzda g = 10 ya da 9,8 verilmişse ya da başka bir gök cismi için hesap yapıyorsanız değeri değiştirin.',
    '"Hesapla" düğmesine basın. Periyotla birlikte frekans, açısal frekans ve dakikadaki salınım sayısı listelenir.',
  ],
  sections: [
    { h: 'Basit sarkaç nedir?', p: [
      'Basit sarkaç, uzamayan ve ağırlığı ihmal edilen bir ipin ucuna asılmış noktasal bir kütleden oluşan ideal modeldir. Kütle denge konumundan biraz çekilip bırakıldığında yerçekiminin etkisiyle ileri geri salınır. Salınımın bir tam gidiş-dönüş için geçen süresine <strong>periyot</strong> (T), bir saniyedeki salınım sayısına <strong>frekans</strong> (f) denir; ikisi birbirinin tersidir: f = 1 ÷ T.',
      'Sarkacın en şaşırtıcı özelliği, küçük açılarda periyodun ne kütleye ne de salınımın genişliğine bağlı olmasıdır. İpin ucuna 100 gramlık bilye de assanız 2 kilogramlık ağırlık da assanız, ip uzunluğu aynı kaldıkça salınım süresi değişmez. Sarkaçlı saatlerin yüzyıllarca zaman ölçmede kullanılabilmesi bu özelliğe dayanır.',
    ] },
    { h: 'Sarkaç periyodu formülü', p: [
      'Küçük açılı salınımlar için periyot <strong>T = 2π√(L/g)</strong> ile verilir. L ip uzunluğu (metre), g yerçekimi ivmesi (m/s²), T periyottur (saniye). Formülden iki sonuç çıkar: ip uzadıkça periyot uzar, yerçekimi büyüdükçe periyot kısalır. İlişki karekök biçiminde olduğundan periyodu iki katına çıkarmak için ipi dört katına uzatmak gerekir.',
      'Formül tersine çevrilerek ip uzunluğu <strong>L = g · T² ÷ (4π²)</strong>, yerçekimi ivmesi ise <strong>g = 4π² · L ÷ T²</strong> olarak bulunur. Açısal frekans ω = 2π ÷ T = √(g/L) bağıntısıyla hesaplanır ve birimi rad/s\'dir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 1 metre uzunluğunda bir sarkaç, g = 9,80665 m/s² alınarak hesaplanıyor. T = 2π × √(1 ÷ 9,80665) = 2π × 0,31933 ≈ 2,0064 s bulunur. Frekans 1 ÷ 2,0064 ≈ 0,4984 Hz, yani sarkaç dakikada yaklaşık 29,9 tam salınım yapar.',
      '<strong>Örnek 2 (saniye sarkacı):</strong> Her yarım salınımı tam 1 saniye süren, yani periyodu 2 s olan sarkaca saniye sarkacı denir. Gereken uzunluk L = 9,80665 × 2² ÷ (4π²) ≈ 0,9936 m\'dir. Büyük ayaklı saatlerin sarkaçlarının yaklaşık bir metre olmasının nedeni budur.',
      '<strong>Örnek 3 (g ölçümü):</strong> Laboratuvarda 1 m uzunluğundaki sarkacın 10 salınımı 20 saniye sürmüş olsun; periyot 2 s\'dir. g = 4π² × 1 ÷ 2² ≈ 9,8696 m/s² bulunur. Aynı sarkaç Ay yüzeyinde (g ≈ 1,62 m/s²) yaklaşık 4,9365 saniyede bir salınım yapardı.',
    ] },
    { h: 'Deneyde periyot nasıl ölçülür?', ol: [
      'İpi sağlam ve sallanmayan bir noktaya bağlayın; uzunluğu askı noktasından kütlenin ortasına kadar cetvelle ölçün.',
      'Kütleyi düşeyden en fazla 10–15 derece ayırıp itmeden bırakın.',
      'Tek bir salınımı ölçmek yerine 10 ya da 20 tam salınımın toplam süresini kronometreyle ölçün ve salınım sayısına bölün; böylece tepki süresinden gelen hata küçülür.',
      'Ölçümü birkaç kez tekrarlayıp ortalamasını alın, sonra bu sayfada "Yerçekimi ivmesi" seçeneğiyle g değerini hesaplayın.',
    ] },
    { h: 'Hızlı başvuru değerleri (g = 9,80665 m/s²)', ul: [
      '<strong>0,25 m</strong> ip: yaklaşık 1,0032 s',
      '<strong>0,5 m</strong> ip: yaklaşık 1,4187 s',
      '<strong>1 m</strong> ip: yaklaşık 2,0064 s',
      '<strong>2 m</strong> ip: yaklaşık 2,8375 s',
      '<strong>4 m</strong> ip: yaklaşık 4,0128 s (1 metrelik sarkacın tam iki katı)',
    ] },
    { h: 'Varsayımlar, sınırlar ve sık yapılan hatalar', p: [
      'Formül küçük açı yaklaşımına dayanır. Salınım açısı büyüdükçe gerçek periyot formülün verdiğinden biraz uzun olur; fark 15 derecede yüzde yarım civarındayken büyük açılarda belirginleşir. Hava direnci, ipin kütlesi ve esnemesi, askı noktasındaki sürtünme de hesaba katılmaz. Kütlesi ipe göre küçük olmayan ya da çubuk biçimindeki sarkaçlar (fiziksel sarkaç) için bu formül geçerli değildir.',
      'Sık yapılan hatalar şunlardır: ip uzunluğunu santimetre olarak girmek, uzunluğu kütlenin merkezine değil ipin bittiği yere kadar ölçmek, yarım salınımı (bir uçtan diğerine gidişi) periyot sanmak ve kütlenin periyodu etkilediğini düşünmek. Periyot yalnızca ip uzunluğuna ve bulunulan yerdeki çekim ivmesine bağlıdır.',
    ] },
  ],
  faq: [
    ['Sarkaç periyodu nasıl hesaplanır?', 'T = 2π√(L/g) formülüyle hesaplanır. İp uzunluğu metre, yerçekimi ivmesi m/s² olarak yazılır. 1 metrelik sarkacın periyodu Dünya\'da yaklaşık 2,0064 saniyedir.'],
    ['Sarkacın periyodu kütleye bağlı mıdır?', 'Hayır. Basit sarkaçta periyot kütleden bağımsızdır; yalnızca ip uzunluğu ve yerçekimi ivmesi belirler. Kütle arttıkça çekim kuvveti de eylemsizlik de aynı oranda arttığı için etkiler birbirini götürür.'],
    ['İp uzunluğu dört katına çıkarsa periyot ne olur?', 'Periyot ip uzunluğunun karekökü ile orantılı olduğundan iki katına çıkar. 1 m\'lik sarkacın periyodu yaklaşık 2,0064 s iken 4 m\'lik sarkacınki yaklaşık 4,0128 s olur.'],
    ['Periyot ile frekans arasındaki ilişki nedir?', 'Birbirlerinin tersidir: f = 1 ÷ T. Periyodu 2 s olan sarkacın frekansı 0,5 Hz\'dir; yani saniyede yarım, dakikada 30 tam salınım yapar.'],
    ['Aynı sarkaç Ay\'da nasıl salınır?', 'Ay\'da çekim ivmesi yaklaşık 1,62 m/s² olduğundan sarkaç daha yavaş salınır. 1 metrelik sarkacın periyodu Ay\'da yaklaşık 4,9365 saniye olur; Dünya\'dakinin yaklaşık 2,46 katı.'],
    ['Salınım açısı periyodu etkiler mi?', 'Küçük açılarda etkisi ihmal edilecek kadar azdır. Açı 15–20 dereceyi geçtikçe gerçek periyot formüldekinden uzun çıkar; bu araç küçük açı yaklaşımını kullanır.'],
    ['g değerini 9,8 mi 10 mu almalıyım?', 'Sorunuzda hangisi verilmişse onu yazın. Alan başlangıçta standart değer olan 9,80665 ile gelir; okul sorularında çoğu zaman 10 ya da 9,8 kullanılır ve sonuç buna göre biraz değişir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız uzunluk ve süre değerleri sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['yay-sabiti-hesapla', 'dalga-boyu-frekans-hesapla', 'serbest-dusme-hesapla', 'gezegen-agirligi-hesapla', 'aci-hizi-hesapla'],
};
