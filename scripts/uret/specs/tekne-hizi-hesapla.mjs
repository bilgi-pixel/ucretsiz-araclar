export default {
  slug: 'tekne-hizi-hesapla',
  title: 'Tekne Gövde Hızı Hesaplama',
  h1Tail: 'su hattı boyundan',
  pageTitle: 'Tekne Gövde Hızı Hesaplama – Su Hattı Boyuna Göre Azami Hız',
  description: 'Su hattı boyunu yazın; deplasman tipi teknenin kuramsal gövde hızını knot, km/sa ve m/sn olarak hesaplayın. Seyir süresi tahmini de verir.',
  card: 'Su hattı boyuna göre yelkenli ya da deplasman teknesinin gövde hızını knot ve km/sa olarak hesaplayın.',
  category: 'gunluk',
  keywords: ['gövde hızı hesaplama', 'tekne hızı hesaplama', 'hull speed hesaplama', 'yelkenli azami hız', 'su hattı boyu hız', 'tekne kaç knot yapar', 'deplasman tekne hızı'],
  lead: 'Yelkenliler, guletler ve balıkçı tekneleri gibi suyu yararak ilerleyen teknelerin hızı, motor gücünden çok <strong>su hattı boyuyla</strong> sınırlanır. Bu araç, su hattı boyundan teknenin kuramsal gövde hızını hesaplar ve isterseniz belirli bir mesafenin bu hızla ne kadar süreceğini de gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Su hattı boyu (LWL)', type: 'number', placeholder: 'Örn. 9' },
    { id: 'birim', label: 'Boy birimi', type: 'select', options: [['m', 'Metre'], ['ft', 'Feet']] },
    { id: 'katsayi', label: 'Hız/boy katsayısı', type: 'number', value: '1,34', hint: 'Klasik değer 1,34 (knot ve feet için)' },
    { id: 'mesafe', label: 'Seyir mesafesi (deniz mili)', type: 'number', placeholder: 'İsteğe bağlı' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Su hattı boyu');
    const k = h.opt(v.katsayi, 1.34, 'Hız/boy katsayısı');
    if (k < 0.5 || k > 3) h.err('Hız/boy katsayısı 0,5 ile 3 arasında olmalı; klasik değer 1,34\'tür.');
    const ft = v.birim === 'ft' ? boy : boy / 0.3048;
    const m = ft * 0.3048;
    if (m > 500) h.err('Su hattı boyu 500 metreyi aşamaz; değeri ve birimi kontrol edin.');
    const knot = k * Math.sqrt(ft);
    const rows = [
      ['Gövde hızı', h.fmt(knot, 2) + ' knot'],
      ['Gövde hızı (km/sa)', h.fmt(knot * 1.852, 2) + ' km/sa'],
      ['Gövde hızı (m/sn)', h.fmt((knot * 1852) / 3600, 2) + ' m/sn'],
      ['Su hattı boyu', `${h.fmt(m, 2)} m (${h.fmt(ft, 2)} ft)`],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const mil = h.pos(v.mesafe, 'Seyir mesafesi');
      const dk = Math.round((mil / knot) * 60 + 1e-9);
      rows.push(['Gövde hızında seyir süresi', `${Math.floor(dk / 60)} sa ${dk % 60} dk`]);
    }
    return {
      rows,
      note: 'Gövde hızı deplasman tipi tekneler için kuramsal bir üst sınırdır; kayıcı (planing) tekneler, katamaranlar ve çok dar gövdeler bu sınırı aşabilir. Gerçek seyir hızı rüzgâra, denize ve yüke göre daha düşüktür.',
    };
  },
  cases: [
    { in: { boy: '25', birim: 'ft' }, out: { 'Gövde hızı': '6,7 knot', 'Gövde hızı (km/sa)': '12,41 km/sa', 'Su hattı boyu': '7,62 m (25 ft)' } },
    { in: { boy: '9', birim: 'm' }, out: { 'Gövde hızı': '7,28 knot', 'Gövde hızı (km/sa)': '13,49 km/sa', 'Gövde hızı (m/sn)': '3,75 m/sn' } },
    { in: { boy: '36', birim: 'ft' }, out: { 'Gövde hızı': '8,04 knot', 'Gövde hızı (km/sa)': '14,89 km/sa' } },
    { in: { boy: '16', birim: 'ft' }, out: { 'Gövde hızı': '5,36 knot', 'Gövde hızı (km/sa)': '9,93 km/sa' } },
    { in: { boy: '100', birim: 'ft' }, out: { 'Gövde hızı': '13,4 knot', 'Gövde hızı (km/sa)': '24,82 km/sa' } },
    { in: { boy: '25', birim: 'ft', mesafe: '20' }, out: { 'Gövde hızı': '6,7 knot', 'Gövde hızında seyir süresi': '2 sa 59 dk' } },
    { in: { boy: '12', birim: 'm' }, out: { 'Gövde hızı': '8,41 knot', 'Gövde hızı (km/sa)': '15,57 km/sa' } },
    { in: { boy: '25', birim: 'ft', katsayi: '1,2' }, out: { 'Gövde hızı': '6 knot' } },
    { in: { boy: '0', birim: 'm' }, error: true },
    { in: { boy: '', birim: 'm' }, error: true },
    { in: { boy: '9', birim: 'm', katsayi: '10' }, error: true },
  ],
  howto: [
    '"Su hattı boyu" alanına teknenin suyla temas eden kısmının uzunluğunu yazın. Bu değer teknenin tam boyundan kısadır; tekne bilgilerinde LWL olarak geçer.',
    '"Boy birimi" listesinden metre ya da feet seçin.',
    'Hız/boy katsayısını bilmiyorsanız 1,34 olarak bırakın. Teknenizin gövde biçimine göre farklı bir değer kullanmak isterseniz değiştirin.',
    'İsterseniz "Seyir mesafesi" alanına gideceğiniz mesafeyi deniz mili olarak yazın.',
    '"Hesapla" düğmesine basın. Gövde hızını knot, km/sa ve m/sn olarak, mesafe girdiyseniz bu hızla seyir süresini görürsünüz.',
  ],
  sections: [
    { h: 'Gövde hızı nedir?', p: [
      'Suyu yararak ilerleyen bir tekne, baş tarafında bir dalga tepesi oluşturur ve arkasında bir dalga sistemi bırakır. Tekne hızlandıkça bu dalgaların boyu uzar. Belirli bir hızda baş dalgasının boyu teknenin su hattı boyuna eşitlenir: tekne başta bir tepe, kıçta bir sonraki tepe ve arada bir çukur olacak biçimde kendi dalgasının içine oturur. Bu hıza gövde hızı denir.',
      'Bu noktadan sonra hızlanmak için teknenin kendi baş dalgasına tırmanması gerekir. Dalga direnci hızla artar; motor gücünü ya da yelken alanını iki katına çıkarmak hızı çok az yükseltir, kıç suya gömülür ve yakıt tüketimi fırlar. Bu yüzden deplasman teknelerinde gövde hızı pratik bir üst sınır gibi davranır.',
    ] },
    { h: 'Formül', p: [
      'Derin sudaki bir dalganın hızı yalnızca dalga boyuna bağlıdır. Dalga boyu su hattı boyuna eşit alındığında şu sade bağıntı çıkar: <strong>gövde hızı (knot) = 1,34 × √(su hattı boyu, feet)</strong>. Metre ile çalışmak isterseniz aynı formül <strong>hız (knot) ≈ 2,43 × √(su hattı boyu, metre)</strong> biçimini alır.',
      'Araç, metre olarak girdiğiniz boyu 0,3048\'e bölerek feet\'e çevirir, karekökünü alır ve katsayıyla çarpar. Sonuç 1,852 ile çarpılarak km/sa\'e, 1852 ÷ 3600 ile çarpılarak m/sn\'ye dönüştürülür. Hız boyun kareköküyle arttığı için hızı iki katına çıkarmak, su hattı boyunu dört katına çıkarmayı gerektirir; uzun teknelerin hızlı olmasının nedeni budur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Su hattı boyu 25 feet (7,62 m) olan bir yelkenli. √25 = 5; 1,34 × 5 = <strong>6,7 knot</strong>, yani 12,41 km/sa.',
      '<strong>Örnek 2:</strong> Su hattı boyu 9 metre olan bir tekne. 9 ÷ 0,3048 = 29,53 feet; karekökü 5,434; 1,34 × 5,434 = <strong>7,28 knot</strong>, yani 13,49 km/sa ya da 3,75 m/sn.',
      '<strong>Örnek 3:</strong> 36 feet su hattı boyunda √36 = 6 ve hız 8,04 knot\'tır. 100 feet\'lik büyük bir teknede ise 13,4 knot bulunur.',
      '<strong>Örnek 4:</strong> İlk örnekteki tekne 20 deniz millik bir geçişi gövde hızında yaparsa 20 ÷ 6,7 = 2,985 saat, yani yaklaşık 2 saat 59 dakika sürer. Gerçekte ortalama hız bundan düşük olacağı için plan yaparken pay bırakmak gerekir.',
    ] },
    { h: 'Hızlı başvuru: su hattı boyu ve gövde hızı', ul: [
      '<strong>5 m:</strong> yaklaşık 5,4 knot',
      '<strong>7 m:</strong> yaklaşık 6,4 knot',
      '<strong>9 m:</strong> 7,28 knot',
      '<strong>12 m:</strong> 8,41 knot',
      '<strong>15 m:</strong> yaklaşık 9,4 knot',
      '<strong>20 m:</strong> yaklaşık 10,9 knot',
      '<strong>30 m:</strong> yaklaşık 13,3 knot',
    ] },
    { h: 'Su hattı boyu ile tam boy farkı', p: [
      'Tekne ilanlarında ve ruhsatlarda yazan boy çoğu zaman tam boydur (LOA): baş bodoslamadan kıç aynalığa kadar olan uzunluk. Formülde kullanılması gereken ise <strong>su hattı boyudur</strong> (LWL): teknenin durgun suda yüzerken suyla kesiştiği hattın uzunluğu. Baş ve kıç çıkıntıları olan klasik yelkenlilerde su hattı boyu tam boydan belirgin biçimde kısadır; düz başlı modern teknelerde ikisi birbirine yakındır.',
      'Su hattı boyunu teknenin teknik bilgilerinden öğrenebilir ya da tekne denizdeyken iskeleden ölçebilirsiniz. Tekne yüklendikçe ve yelken altında yattıkça (bayıldıkça) çıkıntılar suya girer ve etkin su hattı boyu uzar; uzun çıkıntılı yelkenlilerin yatarak beklenenden hızlı gitmesinin nedeni budur.',
    ] },
    { h: 'Katsayı ne zaman değişir?', p: [
      '1,34 katsayısı ağır ve dolgun gövdeli deplasman tekneleri için geçerli klasik değerdir. Hafif ve ince gövdeli tekneler daha az dalga yaptığı için bu sınırın üzerine çıkabilir; bu tür teknelerde daha yüksek katsayılar kullanılır. Katamaranların ve trimaranların çok dar gövdeleri, kürek teknesi ve kano gibi uzun ince gövdeler gövde hızı sınırına pek takılmaz.',
      'Kayıcı (planing) sürat tekneleri ise bambaşka çalışır: yeterli güçle baş dalgasını aşıp suyun üstüne çıkarlar ve hızları su hattı boyuyla değil güç-ağırlık oranıyla belirlenir. Bu araç o tür tekneler için anlamlı sonuç vermez. Yelkenliler de arkadan gelen büyük dalgalarda kısa süreli olarak gövde hızının üzerine çıkabilir.',
    ] },
    { h: 'Pratikte nasıl kullanılır?', p: [
      'Tekne almayı düşünenler, baktıkları teknenin gerçekçi seyir hızını bu hesapla kestirir. Motorla seyirde gövde hızının yaklaşık yüzde 70-80\'i dolayında gitmek yakıtı belirgin biçimde azaltır; son bir knot için harcanan yakıt, kazandırdığı zamana çoğu kez değmez. Geçiş planlarken süreyi gövde hızıyla değil, bunun altında bir ortalama hızla hesaplamak daha güvenlidir: rüzgâr her zaman uygun esmez, akıntı ve dalga hızı düşürür.',
      'Bu sayfa bilgilendirme amaçlıdır. Seyir planı, yakıt hesabı ve güvenlik kararlarında teknenizin gerçek performans verilerini, güncel hava ve deniz tahminlerini esas alın.',
    ] },
  ],
  faq: [
    ['Gövde hızı formülü nedir?', 'Knot cinsinden gövde hızı, feet cinsinden su hattı boyunun karekökünün 1,34 katıdır. Metre kullanırsanız katsayı yaklaşık 2,43 olur: hız ≈ 2,43 × √LWL.'],
    ['10 metrelik bir tekne kaç knot yapar?', 'Su hattı boyu 10 m ise gövde hızı yaklaşık 7,7 knot\'tır. Ancak tam boyu 10 m olan bir teknenin su hattı boyu daha kısadır; örneğin 9 m su hattı için sonuç 7,28 knot olur.'],
    ['Tekne gövde hızını aşabilir mi?', 'Ağır deplasman tekneleri pratikte aşamaz; aşmak için gereken güç çok hızlı artar. Hafif ve ince gövdeli tekneler, çok gövdeliler ve kayıcı sürat tekneleri ise aşabilir. Yelkenliler dalga sörfünde kısa süreliğine üzerine çıkabilir.'],
    ['Daha güçlü motor takarsam teknem hızlanır mı?', 'Deplasman tipi bir teknede gövde hızına yaklaştıktan sonra hayır. Fazladan güç büyük ölçüde dalga yapmaya harcanır; hız çok az artarken yakıt tüketimi ciddi biçimde yükselir.'],
    ['LWL ve LOA ne demek?', 'LOA teknenin baştan kıça tam boyudur. LWL ise su hattı boyudur, yani teknenin suyla kesiştiği hattın uzunluğu. Gövde hızı hesabında LWL kullanılır.'],
    ['Knot kaç km/sa eder?', '1 knot saatte bir deniz mili, yani 1,852 km/sa\'tir. 6,7 knot yaklaşık 12,4 km/sa eder; araç bu çeviriyi sonuçta kendiliğinden gösterir.'],
    ['Katamaranlar için bu hesap geçerli mi?', 'Sınırlı ölçüde. Katamaran gövdeleri çok dar olduğundan az dalga yapar ve klasik gövde hızının belirgin biçimde üzerinde seyredebilir. Bu tekneler için 1,34 katsayısı fazla düşük kalır.'],
    ['Girdiğim tekne bilgileri saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['knot-kmh-cevir', 'deniz-mili-km-cevir', 'beaufort-ruzgar-cevir', 'ufuk-mesafesi-hesapla', 'metre-feet-cevir'],
};
