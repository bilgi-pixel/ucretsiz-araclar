export default {
  slug: 'ruzgar-hissedilen-sicaklik-hesapla',
  title: 'Hissedilen Sıcaklık (Rüzgâr Etkisi) Hesaplama',
  h1Tail: 'rüzgâr soğutması',
  pageTitle: 'Hissedilen Sıcaklık Hesaplama – Rüzgâr Soğutması (Wind Chill)',
  description: 'Hava sıcaklığı ve rüzgâr hızından hissedilen sıcaklığı hesaplayın. Rüzgâr soğutması formülüyle çalışır; km/sa, m/sn ve knot girişini, donma riskini gösterir.',
  card: 'Soğuk havada rüzgârın etkisiyle hissedilen sıcaklığı hesaplayın; donma riski düzeyiyle birlikte.',
  category: 'gunluk',
  keywords: ['hissedilen sıcaklık hesaplama', 'rüzgar soğutması', 'wind chill hesaplama', 'rüzgarda hissedilen sıcaklık', 'hissedilen sıcaklık nedir', 'rüzgar soğutma indeksi', 'soğuk hava donma riski'],
  lead: 'Termometre −5 °C gösterirken dışarıda sert bir rüzgâr esiyorsa cildiniz çok daha soğuk bir havadaymış gibi ısı kaybeder. Bu araç, hava sıcaklığı ve rüzgâr hızından <strong>rüzgâr soğutması indeksini</strong>, yani soğuk havada hissedilen sıcaklığı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'sicaklik', label: 'Hava sıcaklığı (°C)', type: 'number', placeholder: 'Örn. -5' },
    { id: 'ruzgar', label: 'Rüzgâr hızı', type: 'number', placeholder: 'Örn. 30' },
    { id: 'birim', label: 'Rüzgâr hızı birimi', type: 'select', options: [['kmh', 'km/sa'], ['ms', 'm/sn'], ['knot', 'knot']] },
  ],
  compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    const r = h.nonneg(v.ruzgar, 'Rüzgâr hızı');
    const kat = v.birim === 'ms' ? 3.6 : v.birim === 'knot' ? 1.852 : 1;
    const V = r * kat;
    if (T > 10) h.err('Rüzgâr soğutması formülü 10 °C ve altındaki sıcaklıklar için tanımlıdır. Sıcak havalar için ısı indeksi aracını kullanın.');
    if (T < -60) h.err('Hava sıcaklığı −60 °C\'den düşük olamaz; değeri kontrol edin.');
    if (V > 200) h.err('Rüzgâr hızı 200 km/sa değerini aşamaz; birimi kontrol edin.');
    const gecerli = V >= 4.8 - 1e-9;
    const p = Math.pow(V, 0.16);
    const wc = gecerli ? 13.12 + 0.6215 * T - 11.37 * p + 0.3965 * T * p : T;
    const his = Math.min(wc, T);
    let risk;
    if (his > 0) risk = 'Donma riski yok; uygun giyimle rahatsızlık azalır';
    else if (his > -10) risk = 'Düşük: rahatsızlık artar, kat kat giyinin';
    else if (his > -28) risk = 'Orta: uzun süre açıkta kalındığında hipotermi ve donma riski';
    else if (his > -40) risk = 'Yüksek: açıktaki cilt yaklaşık 10-30 dakikada donabilir';
    else if (his > -48) risk = 'Çok yüksek: açıktaki cilt yaklaşık 5-10 dakikada donabilir';
    else if (his > -55) risk = 'Şiddetli: açıktaki cilt yaklaşık 2-5 dakikada donabilir';
    else risk = 'Aşırı: açıktaki cilt 2 dakikadan kısa sürede donabilir';
    return {
      rows: [
        ['Hissedilen sıcaklık', h.fmt(his, 1) + ' °C'],
        ['Termometre ile fark', h.fmt(his - T, 1) + ' °C'],
        ['Hissedilen sıcaklık (Fahrenhayt)', h.fmt(his * 9 / 5 + 32, 1) + ' °F'],
        ['Rüzgâr hızı', `${h.fmt(V, 1)} km/sa (${h.fmt(V / 3.6, 1)} m/sn)`],
        ['Risk düzeyi', risk],
      ],
      note: gecerli
        ? 'Formül, 10 m yükseklikte ölçülen rüzgâr hızı ve gölgede kuru cilt için geçerlidir; güneş, ıslaklık ve nem etkisini içermez.'
        : 'Rüzgâr hızı 4,8 km/sa değerinin altında olduğunda rüzgâr soğutması hesaplanmaz; hissedilen sıcaklık hava sıcaklığına eşit alınmıştır.',
    };
  },
  cases: [
    { in: { sicaklik: '-10', ruzgar: '20', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '-17,9 °C', 'Termometre ile fark': '-7,9 °C' } },
    { in: { sicaklik: '0', ruzgar: '30', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '-6,5 °C', 'Hissedilen sıcaklık (Fahrenhayt)': '20,3 °F' } },
    { in: { sicaklik: '-20', ruzgar: '40', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '-34,1 °C', 'Risk düzeyi': 'Yüksek: açıktaki cilt yaklaşık 10-30 dakikada donabilir' } },
    { in: { sicaklik: '5', ruzgar: '10', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '2,7 °C' } },
    { in: { sicaklik: '-5', ruzgar: '10', birim: 'ms' }, out: { 'Hissedilen sıcaklık': '-13,7 °C', 'Rüzgâr hızı': '36 km/sa (10 m/sn)' } },
    { in: { sicaklik: '-30', ruzgar: '50', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '-49 °C' } },
    { in: { sicaklik: '-3', ruzgar: '2', birim: 'kmh' }, out: { 'Hissedilen sıcaklık': '-3 °C', 'Termometre ile fark': '0 °C' } },
    { in: { sicaklik: '25', ruzgar: '20', birim: 'kmh' }, error: true },
    { in: { sicaklik: '-5', ruzgar: '', birim: 'kmh' }, error: true },
    { in: { sicaklik: '-5', ruzgar: '-10', birim: 'kmh' }, error: true },
  ],
  howto: [
    '"Hava sıcaklığı" alanına termometrenin gösterdiği değeri santigrat derece olarak yazın; sıfırın altındaki değerlerin başına eksi işareti koyun.',
    '"Rüzgâr hızı" alanına hava tahmininde ya da ölçüm cihazında gördüğünüz hızı girin ve yanındaki listeden birimini seçin: km/sa, m/sn ya da knot.',
    '"Hesapla" düğmesine basın. İlk satırda hissedilen sıcaklığı, altında termometreyle arasındaki farkı ve Fahrenhayt karşılığını görürsünüz.',
    '"Risk düzeyi" satırını okuyun; giyim ve dışarıda kalma sürenizi buna göre planlayın.',
  ],
  sections: [
    { h: 'Rüzgâr neden daha soğuk hissettirir?', p: [
      'Vücudumuz cildin hemen üstünde ince bir ılık hava tabakası oluşturur; bu tabaka bir yalıtım görevi görür. Rüzgâr estiğinde bu tabaka sürekli süpürülür, yerine soğuk hava gelir ve cilt ısısını çok daha hızlı kaybeder. Termometrenin gösterdiği değer değişmez, çünkü rüzgâr havayı soğutmaz; değişen şey ısı kaybının hızıdır. Hissedilen sıcaklık, rüzgârlı havadaki ısı kaybını, aynı kaybı durgun havada yaratacak sıcaklıkla ifade eder.',
      'Bu yüzden rüzgâr soğutması cansız nesneleri hava sıcaklığının altına düşürmez. −5 °C havada hissedilen sıcaklık −14 °C olsa bile arabanızın radyatöründeki su ya da dışarıdaki boru en fazla −5 °C\'ye kadar soğur; rüzgâr yalnızca o sıcaklığa daha çabuk inmelerine yol açar.',
    ] },
    { h: 'Kullanılan formül', p: [
      'Araç, Kuzey Amerika meteoroloji servislerinin 2001\'den beri kullandığı rüzgâr soğutması indeksini hesaplar. Formül, yüzünü rüzgâra dönmüş yürüyen bir yetişkinin ısı kaybı ölçümlerine dayanır:',
      '<code>H = 13,12 + 0,6215·T − 11,37·V<sup>0,16</sup> + 0,3965·T·V<sup>0,16</sup></code>',
      'Burada <strong>T</strong> hava sıcaklığı (°C), <strong>V</strong> yerden 10 metre yükseklikte ölçülen rüzgâr hızı (km/sa), <strong>H</strong> ise hissedilen sıcaklıktır. Formül 10 °C ve altındaki sıcaklıklar ile 4,8 km/sa ve üzerindeki rüzgârlar için tanımlıdır. Daha zayıf rüzgârda araç hissedilen sıcaklığı hava sıcaklığına eşit alır; 10 °C\'nin üzerinde ise hesap yapmaz. Rüzgârı m/sn olarak girerseniz 3,6 ile, knot olarak girerseniz 1,852 ile çarpılarak km/sa\'e çevrilir.',
    ] },
    { h: 'Adım adım çözümlü örnek', p: [
      'Hava −10 °C, rüzgâr 20 km/sa olsun. Önce V<sup>0,16</sup> hesaplanır: 20<sup>0,16</sup> ≈ 1,615. Sonra terimler toplanır: 13,12 + 0,6215 × (−10) = 6,905; 11,37 × 1,615 ≈ 18,362; 0,3965 × (−10) × 1,615 ≈ −6,403. Sonuç 6,905 − 18,362 − 6,403 ≈ <strong>−17,9 °C</strong> olur. Yani 20 km/sa\'lik bir rüzgâr, −10 °C\'lik havayı cildiniz için yaklaşık 8 derece daha soğuk yapar.',
      'İkinci örnek: hava 0 °C, rüzgâr 30 km/sa. Sonuç −6,5 °C\'dir. Üçüncü örnek: −20 °C ve 40 km/sa rüzgârda hissedilen sıcaklık −34,1 °C\'ye iner; bu düzeyde açıktaki cilt dakikalar içinde donabilir.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>5 °C, 10 km/sa:</strong> yaklaşık 2,7 °C',
      '<strong>0 °C, 30 km/sa:</strong> yaklaşık −6,5 °C',
      '<strong>−5 °C, 36 km/sa (10 m/sn):</strong> yaklaşık −13,7 °C',
      '<strong>−10 °C, 20 km/sa:</strong> yaklaşık −17,9 °C',
      '<strong>−20 °C, 40 km/sa:</strong> yaklaşık −34,1 °C',
      '<strong>−30 °C, 50 km/sa:</strong> yaklaşık −49 °C',
    ] },
    { h: 'Risk düzeyleri nasıl yorumlanır?', p: [
      'Araç sonucu, Kanada meteoroloji servisinin halka yönelik sınıflamasına benzer basamaklarla yorumlar. Hissedilen sıcaklık 0 ile −9 °C arasındayken risk düşüktür ve asıl sorun rahatsızlıktır. −10 ile −27 °C arasında uzun süre açıkta kalmak hipotermi ve donma riski doğurur. −28 °C ve altında açıktaki cilt 10-30 dakika içinde donabilir; −40 °C\'nin altında bu süre 5-10 dakikaya, −48 °C\'nin altında birkaç dakikaya iner.',
      'Süreler sağlıklı bir yetişkinin kuru ve açıktaki cildi için yaklaşık değerlerdir. Çocuklar, yaşlılar, dolaşım sorunu olanlar ve ıslak giysiyle dışarıda kalanlar çok daha çabuk etkilenir.',
    ] },
    { h: 'Türkiye\'de nerelerde işe yarar?', p: [
      'Erzurum, Kars, Ardahan ve Ağrı gibi kış sıcaklıklarının −20 °C\'nin altına indiği illerde rüzgâr soğutması günlük hayatın parçasıdır. Uludağ, Palandöken, Erciyes ya da Kartalkaya\'da kayak yaparken telesiyejde ve zirve hatlarında rüzgâr belirgin biçimde artar; pist dibindeki termometreye güvenmek yanıltıcı olur. Motosiklet ve bisiklet sürücüleri için sürüş hızı da rüzgâr demektir: durgun havada 60 km/sa hızla gitmek, yüzünüze 60 km/sa rüzgâr esmesiyle aynı etkiyi yapar. Açık alanda çalışan inşaat, tarım ve enerji hattı ekipleri de çalışma ve mola sürelerini hissedilen sıcaklığa göre planlar.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Formül gölgede, kuru cilt ve uygun giyinmiş bir yetişkin varsayımıyla türetilmiştir. Parlak güneş hissedilen sıcaklığı birkaç derece yükseltebilir; ıslak giysi ve yağış ise ısı kaybını ciddi biçimde artırır. Hava tahminlerindeki "hissedilen sıcaklık" değeri kurumdan kuruma farklı yöntemlerle hesaplanabildiği için bu sayfadaki sonuçla birebir aynı olmayabilir.',
      'Sonuç bilgilendirme amaçlıdır; tıbbi değerlendirme yerine geçmez. Uyuşma, ciltte beyazlama ya da titremenin durması gibi belirtilerde hemen sıcak bir ortama geçin ve sağlık kuruluşuna başvurun.',
    ] },
  ],
  faq: [
    ['Hissedilen sıcaklık nedir?', 'Rüzgâr, nem ve benzeri etkenler yüzünden vücudun algıladığı sıcaklıktır. Soğuk havada belirleyici etken rüzgârdır; bu sayfa rüzgârın yol açtığı ek ısı kaybını durgun havadaki eşdeğer sıcaklık olarak verir.'],
    ['Rüzgâr soğutması hangi koşullarda hesaplanır?', 'Formül hava sıcaklığı 10 °C ya da daha düşük ve rüzgâr hızı en az 4,8 km/sa olduğunda geçerlidir. Daha sıcak havalarda rüzgâr serinletici etki yapsa da bu formül kullanılmaz.'],
    ['Rüzgâr soğutması suyu dondurur mu?', 'Hava sıcaklığı sıfırın üzerindeyse hayır. Hissedilen sıcaklık −3 °C görünse bile hava 2 °C ise su donmaz. Rüzgâr yalnızca nesnelerin hava sıcaklığına daha çabuk inmesini sağlar, onun altına düşürmez.'],
    ['Rüzgâr hızını nereden öğrenirim?', 'Hava tahmini uygulamaları ve meteoroloji bültenleri rüzgâr hızını genellikle km/sa olarak verir. Denizcilik tahminlerinde knot, bazı ölçüm cihazlarında m/sn kullanılır; araç üç birimi de kabul eder.'],
    ['Motosiklet sürerken hissedilen sıcaklığı nasıl bulurum?', 'Durgun havada sürüş hızınızı rüzgâr hızı olarak yazabilirsiniz. Örneğin 0 °C havada 30 km/sa hızla giderken korumasız cildiniz yaklaşık −6,5 °C hisseder. Karşıdan rüzgâr varsa etkisi daha da artar.'],
    ['Sonuç neden hava durumu uygulamasındakinden farklı çıkıyor?', 'Uygulamalar farklı formüller kullanabilir, nemi ve güneşlenmeyi hesaba katabilir ya da rüzgârı farklı yükseklikte ölçebilir. Ayrıca tahmin edilen rüzgâr ile bulunduğunuz noktadaki gerçek rüzgâr aynı olmayabilir.'],
    ['Hangi hissedilen sıcaklıkta donma tehlikesi başlar?', 'Genel kabul, hissedilen sıcaklık −28 °C\'nin altına indiğinde açıktaki cildin 10-30 dakika içinde donabileceği yönündedir. Daha yüksek değerlerde de uzun süre açıkta kalmak risklidir.'],
    ['Girdiğim değerler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; sıcaklık ve rüzgâr değerleri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['isi-indeksi-hesapla', 'beaufort-ruzgar-cevir', 'ciy-noktasi-hesapla', 'celsius-fahrenheit-cevir', 'ms-kmh-cevir'],
};
