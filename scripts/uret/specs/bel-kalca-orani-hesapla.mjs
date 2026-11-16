export default {
  slug: 'bel-kalca-orani-hesapla',
  title: 'Bel Kalça Oranı Hesaplama',
  h1Tail: 'BKO',
  pageTitle: 'Bel Kalça Oranı Hesaplama – BKO Nedir, Kaç Olmalı?',
  description: 'Bel ve kalça çevrenizi yazın, bel kalça oranınızı (BKO) ve cinsiyete göre risk düzeyini görün. Ölçüm nasıl yapılır, hangi değer ne anlama gelir?',
  card: 'Bel ve kalça çevresinden bel kalça oranını hesaplayın; kadın ve erkek için eşik değerlerle birlikte yorumlayın.',
  category: 'saglik',
  keywords: ['bel kalça oranı hesaplama', 'bel kalça oranı kaç olmalı', 'bko hesaplama', 'bel kalça oranı kadın', 'bel kalça oranı erkek', 'elma tipi armut tipi vücut', 'bel çevresi kalça çevresi'],
  lead: 'Bel çevrenizi kalça çevrenize bölerek <strong>bel kalça oranınızı</strong> hesaplayın. Araç, sonucu kadın ve erkek için yaygın kullanılan eşiklerle karşılaştırır ve yağın vücutta nerede toplandığı konusunda fikir verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: [['kadin', 'Kadın'], ['erkek', 'Erkek']] },
    { id: 'bel', label: 'Bel çevresi (cm)', type: 'number', placeholder: 'Örn. 78', hint: 'En alt kaburga ile kalça kemiğinin üst kenarı arasının ortasından ölçün.' },
    { id: 'kalca', label: 'Kalça çevresi (cm)', type: 'number', placeholder: 'Örn. 100', hint: 'Kalçanın en geniş yerinden ölçün.' },
  ],
  compute(v, h) {
    const bel = h.pos(v.bel, 'Bel çevresi');
    const kalca = h.pos(v.kalca, 'Kalça çevresi');
    if (bel < 30 || bel > 250) h.err('Bel çevresi 30 ile 250 cm arasında olmalı; değeri santimetre olarak yazdığınızdan emin olun.');
    if (kalca < 40 || kalca > 250) h.err('Kalça çevresi 40 ile 250 cm arasında olmalı; değeri santimetre olarak yazdığınızdan emin olun.');
    const erkek = v.cinsiyet === 'erkek';
    const oran = bel / kalca;
    const orta = erkek ? 0.90 : 0.80;
    const yuksek = erkek ? 1.00 : 0.85;
    const o = oran + 1e-9;
    const durum = o >= yuksek ? 'Yüksek risk' : o >= orta ? 'Orta risk' : 'Düşük risk';
    // Düşük risk bandında kalmak için bel çevresinin altında olması gereken değer
    const sinir = kalca * orta;
    return {
      rows: [
        ['Bel kalça oranı', h.fix(oran, 2)],
        ['Değerlendirme', durum],
        ['Dünya Sağlık Örgütü eşiği', `${erkek ? '0,90' : '0,85'} – ${o >= (erkek ? 0.90 : 0.85) ? 'eşikte ya da üzerinde' : 'eşiğin altında'}`],
        ['Düşük risk sınırı', `${h.fix(orta, 2)} altı`],
        ['Bu kalça ölçüsünde sınır bel çevresi', h.fmt(sinir, 1) + ' cm'],
        ['Vücut tipi eğilimi', o >= yuksek ? 'Elma tipi (karın bölgesinde toplanma)' : o >= orta ? 'Ara tip' : 'Armut tipi ya da dengeli dağılım'],
      ],
      note: erkek
        ? 'Değerlendirme satırı üç kademeli yaygın sınıflamayı kullanır (0,90 altı düşük, 0,90–0,99 orta, 1,00 ve üzeri yüksek). Dünya Sağlık Örgütü ise erkeklerde 0,90 ve üzerini artmış risk eşiği sayar. Sonuç tanı değildir.'
        : 'Değerlendirme satırı üç kademeli yaygın sınıflamayı kullanır (0,80 altı düşük, 0,80–0,84 orta, 0,85 ve üzeri yüksek). Dünya Sağlık Örgütü kadınlarda 0,85 ve üzerini artmış risk eşiği sayar. Sonuç tanı değildir.',
    };
  },
  cases: [
    { in: { cinsiyet: 'kadin', bel: '70', kalca: '100' }, out: { 'Bel kalça oranı': '0,70', 'Değerlendirme': 'Düşük risk', 'Bu kalça ölçüsünde sınır bel çevresi': '80 cm' } },
    { in: { cinsiyet: 'erkek', bel: '100', kalca: '100' }, out: { 'Bel kalça oranı': '1,00', 'Değerlendirme': 'Yüksek risk' } },
    { in: { cinsiyet: 'kadin', bel: '80', kalca: '100' }, out: { 'Bel kalça oranı': '0,80', 'Değerlendirme': 'Orta risk' } },
    { in: { cinsiyet: 'kadin', bel: '85', kalca: '100' }, out: { 'Bel kalça oranı': '0,85', 'Değerlendirme': 'Yüksek risk' } },
    { in: { cinsiyet: 'erkek', bel: '85', kalca: '100' }, out: { 'Bel kalça oranı': '0,85', 'Değerlendirme': 'Düşük risk', 'Bu kalça ölçüsünde sınır bel çevresi': '90 cm' } },
    { in: { cinsiyet: 'erkek', bel: '94', kalca: '98' }, out: { 'Bel kalça oranı': '0,96', 'Değerlendirme': 'Orta risk', 'Bu kalça ölçüsünde sınır bel çevresi': '88,2 cm' } },
    { in: { cinsiyet: 'kadin', bel: '74,5', kalca: '96' }, out: { 'Bel kalça oranı': '0,78', 'Değerlendirme': 'Düşük risk' } },
    { in: { cinsiyet: 'kadin', bel: '', kalca: '100' }, error: true },
    { in: { cinsiyet: 'erkek', bel: '0,9', kalca: '1' }, error: true },
    { in: { cinsiyet: 'erkek', bel: '90', kalca: '-95' }, error: true },
  ],
  howto: [
    'Cinsiyetinizi seçin; eşik değerler kadın ve erkek için farklıdır.',
    'Ayakta, karnınızı içeri çekmeden ve nefesinizi normal verdikten sonra bel çevrenizi mezurayla ölçüp santimetre olarak yazın.',
    'Mezurayı kalçanızın en geniş noktasından yere paralel geçirerek kalça çevrenizi ölçün ve ikinci alana yazın.',
    '"Hesapla" düğmesine basın; oranınız, risk bandı ve aynı kalça ölçüsünde düşük risk sınırına karşılık gelen bel çevresi görünür.',
    'Takip için ölçümü hep aynı saatte, tercihen sabah aç karnına ve aynı mezurayla yineleyin.',
  ],
  sections: [
    { h: 'Bel kalça oranı nedir?', p: [
      'Bel kalça oranı (BKO), bel çevresinin kalça çevresine bölünmesiyle elde edilen birimsiz bir sayıdır. İki ölçü de aynı birimde alındığı için santimetre ya da inç kullanmanız sonucu değiştirmez. Formül son derece yalındır: <strong>BKO = bel çevresi ÷ kalça çevresi</strong>.',
      'Bu oranın ilgi görmesinin nedeni, vücuttaki yağın ne kadar olduğundan çok <em>nerede</em> biriktiğine işaret etmesidir. Karın çevresinde, iç organların etrafında toplanan yağ ile kalça ve uylukta deri altında toplanan yağ sağlık açısından aynı anlama gelmez. Araştırmalar, karın bölgesindeki yağlanmanın kalp-damar hastalıkları ve tip 2 diyabet gibi sorunlarla daha yakından ilişkili olduğunu göstermiştir. Vücut kitle indeksi bu ayrımı yapamaz; boyu ve kilosu aynı olan iki kişinin BKO değeri çok farklı çıkabilir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Bel çevresi 94 cm, kalça çevresi 98 cm olan bir erkeği ele alalım. Oran 94 ÷ 98 = 0,959, yani yuvarlanmış hâliyle <strong>0,96</strong> olur. Erkekler için 0,90 ile 0,99 arası orta risk bandıdır; dolayısıyla sonuç "Orta risk" olarak gösterilir. Aynı kalça ölçüsünde düşük risk bandına inmek için bel çevresinin 98 × 0,90 = 88,2 cm\'nin altına düşmesi gerekir; araç bu değeri de ayrı bir satırda verir.',
      'Bel çevresi 70 cm, kalça çevresi 100 cm olan bir kadında ise oran 0,70 çıkar. Kadınlar için düşük risk sınırı 0,80 olduğundan sonuç "Düşük risk"tir ve bu kalça ölçüsünde sınır bel çevresi 80 cm\'dir.',
    ] },
    { h: 'Eşik değerler ve yorum', p: [
      'Dünya Sağlık Örgütü\'nün bel çevresi ve bel kalça oranına ilişkin uzman raporunda, metabolik sorun riskinin belirgin biçimde arttığı düzey erkeklerde 0,90, kadınlarda 0,85 olarak anılır. Uygulamada sıkça kullanılan üç basamaklı sınıflama ise şöyledir:',
    ], ul: [
      '<strong>Kadın:</strong> 0,80 altı düşük risk, 0,80–0,84 orta risk, 0,85 ve üzeri yüksek risk.',
      '<strong>Erkek:</strong> 0,90 altı düşük risk, 0,90–0,99 orta risk, 1,00 ve üzeri yüksek risk.',
    ] },
    { h: 'Elma tipi ve armut tipi vücut', p: [
      'Halk arasında kullanılan "elma" ve "armut" benzetmesi, bel kalça oranının gündelik karşılığıdır. Yağın daha çok karın ve gövdede toplandığı, belin kalçaya yakın ya da ondan geniş olduğu yapı elma tipine; yağın kalça ve uylukta toplandığı, belin belirgin biçimde ince kaldığı yapı armut tipine benzetilir. Erkeklerde ve menopoz sonrası kadınlarda elma tipi dağılım daha sık görülür. Bu benzetme estetik bir yargı değil, yağ dağılımının kaba bir tarifidir; kişinin genetiği, yaşı ve hormon düzeni dağılımı büyük ölçüde belirler.',
    ] },
    { h: 'Doğru ölçüm için ipuçları', ul: [
      'Mezura esnemeyen türden olsun; terzi mezurası uygundur, metal şerit metre vücuda oturmaz.',
      'Ölçümü çıplak tene ya da ince bir kıyafetin üzerinden yapın; kalın kazak birkaç santimetre fark yaratır.',
      'Bel için göbek deliğini değil, en alt kaburganın alt kenarı ile kalça kemiğinin üst çıkıntısı arasındaki orta noktayı esas alın.',
      'Mezurayı sıkmayın; deriye değsin ama içine gömülmesin. Yere paralel durduğunu aynadan kontrol edin.',
      'Yemekten hemen sonra ya da şişkinlik varken ölçmeyin; iki kez ölçüp ortalamasını alın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Bel kalça oranı bir tarama göstergesidir, tanı aracı değildir. Çok kısa ya da çok uzun boylu kişilerde, gebelikte, karında sıvı toplanmasına yol açan durumlarda, çocuklarda ve yoğun kas kütlesi olan sporcularda yanıltıcı olabilir. Ayrıca hem bel hem kalça birlikte genişlediğinde oran değişmeden kalabilir; bu nedenle tek başına bel çevresi ve bel boy oranı gibi ölçülerle birlikte değerlendirilmesi daha sağlıklıdır.',
      'Buradaki sonuç bilgilendirme amaçlıdır. Kilo, beslenme ya da kalp-damar sağlığıyla ilgili kararlar için hekiminize ya da diyetisyeninize danışın.',
    ] },
  ],
  faq: [
    ['Bel kalça oranı kaç olmalı?', 'Yaygın sınıflamaya göre kadınlarda 0,80\'in, erkeklerde 0,90\'ın altı düşük risk kabul edilir. Kadınlarda 0,85, erkeklerde 1,00 ve üzeri değerler karın bölgesinde belirgin yağlanmaya işaret eder.'],
    ['Bel kalça oranı nasıl hesaplanır?', 'Bel çevresi kalça çevresine bölünür. Örneğin bel 80 cm, kalça 100 cm ise oran 80 ÷ 100 = 0,80 olur. İki ölçünün aynı birimde olması yeterlidir.'],
    ['Bel çevresi tam olarak nereden ölçülür?', 'Ayakta dururken en alt kaburganın alt kenarı ile kalça kemiğinin üst kenarı arasındaki orta noktadan, normal bir nefes verişin sonunda ölçülür. Bu nokta çoğu kişide göbek deliğinin biraz üstüne denk gelir.'],
    ['Kalça çevresi nereden ölçülür?', 'Ayaklar bitişik dururken kalçanın yandan bakıldığında en çıkıntılı olduğu yerden, mezura yere paralel tutularak ölçülür.'],
    ['Bel kalça oranı mı, vücut kitle indeksi mi daha önemli?', 'İkisi farklı şeyleri ölçer. Vücut kitle indeksi boya göre toplam ağırlığı, bel kalça oranı ise yağın dağılımını gösterir. Birlikte bakıldıklarında daha anlamlı bir tablo ortaya çıkar; biri diğerinin yerini tutmaz.'],
    ['Oranım yüksek çıktı, ne yapmalıyım?', 'Tek bir ölçüm kesin bir sonuç değildir. Ölçümü doğru noktalardan yineleyin; değer yine yüksekse kan şekeri, kan yağları ve tansiyon gibi diğer göstergelerle birlikte değerlendirilmesi için bir hekime başvurun.'],
    ['Egzersizle bel kalça oranı düşer mi?', 'Düzenli hareket ve dengeli beslenmeyle toplam yağ azaldığında bel çevresi genellikle küçülür ve oran düşebilir. Ancak vücudun yağı hangi bölgeden önce vereceği kişiden kişiye değişir; yalnızca karın hareketleriyle bölgesel incelme beklenmemelidir.'],
    ['Ölçülerim bir yere kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; yazdığınız bel ve kalça ölçüleri sunucuya gönderilmez, saklanmaz.'],
  ],
  related: ['bel-boy-orani-hesapla', 'vki-hesapla', 'vucut-yag-orani-hesapla', 'ideal-kilo-hesapla', 'ideal-bel-cevresi-hesapla'],
};
