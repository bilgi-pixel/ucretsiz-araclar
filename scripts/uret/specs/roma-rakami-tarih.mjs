export default {
  slug: 'roma-rakami-tarih',
  title: 'Tarihi Roma Rakamına Çevirme',
  h1Tail: 'gün, ay ve yıl Roma rakamıyla',
  pageTitle: 'Tarihi Roma Rakamına Çevirme – Doğum Tarihi Roma Rakamıyla Yazılışı',
  description: 'Bir tarihi Roma rakamlarıyla yazın: 29.10.1923 → XXIX.X.MCMXXIII. Gün, ay ve yıl sırasını ve ayracı seçin; dövme, yüzük ve davetiye için hazır yazım alın.',
  card: 'Doğum, evlilik ya da özel bir tarihi Roma rakamlarıyla yazın; sıra ve ayraç seçenekleriyle.',
  category: 'metin',
  keywords: ['tarihi roma rakamına çevirme', 'doğum tarihi roma rakamı', 'roma rakamı tarih dövme', 'roma rakamıyla tarih yazma', 'yıl roma rakamı', 'roma rakamı evlilik tarihi', 'tarih roma rakamı çevirici'],
  lead: 'Bir tarih seçin; gün, ay ve yıl ayrı ayrı <strong>Roma rakamına</strong> çevrilsin ve seçtiğiniz sıra ile ayraçla tek satırda yazılsın. Dövme, yüzük içi yazısı, davetiye, tablo ya da hediye üzerine işlenecek tarihler için kullanışlıdır.',
  button: 'Çevir',
  inputs: [
    { id: 'tarih', label: 'Tarih', type: 'date' },
    { id: 'sira', label: 'Sıra', type: 'select', options: [['gay', 'Gün – Ay – Yıl'], ['agy', 'Ay – Gün – Yıl'], ['yag', 'Yıl – Ay – Gün']] },
    { id: 'ayrac', label: 'Ayraç', type: 'select', options: [['nokta', 'Nokta (XV.III.MMXXVI)'], ['orta', 'Orta nokta (XV·III·MMXXVI)'], ['tire', 'Tire (XV-III-MMXXVI)'], ['egik', 'Eğik çizgi (XV/III/MMXXVI)'], ['bosluk', 'Boşluk (XV III MMXXVI)']] },
  ],
  compute(v, h) {
    const d = h.date(v.tarih, 'Tarih');
    const gun = d.getUTCDate(), ay = d.getUTCMonth() + 1, yil = d.getUTCFullYear();
    if (yil < 1 || yil > 3999) h.err('Standart Roma rakamlarıyla yalnızca 1–3999 arasındaki yıllar yazılabilir.');
    const roma = (n) => {
      const tablo = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
      let s = '';
      for (const [deger, simge] of tablo) while (n >= deger) { s += simge; n -= deger; }
      return s;
    };
    const G = roma(gun), A = roma(ay), Y = roma(yil);
    const ayr = { nokta: '.', orta: '·', tire: '-', egik: '/', bosluk: ' ' }[v.ayrac] ?? '.';
    const parcalar = v.sira === 'agy' ? [A, G, Y] : v.sira === 'yag' ? [Y, A, G] : [G, A, Y];
    const yazim = parcalar.join(ayr);
    return {
      rows: [
        ['Roma rakamıyla tarih', yazim],
        ['Gün', `${gun} = ${G}`],
        ['Ay', `${ay} (${h.ayAdi(ay)}) = ${A}`],
        ['Yıl', `${yil} = ${Y}`],
        ['Haftanın günü', h.gunAdi(d)],
        ['Karakter sayısı (ayraçlar dahil)', String(Array.from(yazim).length)],
      ],
      note: 'Çıkarma kuralına dayalı standart yazım kullanılır (4 = IV, 9 = IX, 40 = XL, 90 = XC, 400 = CD, 900 = CM).',
    };
  },
  cases: [
    { in: { tarih: '1923-10-29' }, out: { 'Roma rakamıyla tarih': 'XXIX.X.MCMXXIII', 'Yıl': '1923 = MCMXXIII', 'Haftanın günü': 'Pazartesi' } },
    { in: { tarih: '2026-03-15', sira: 'gay', ayrac: 'tire' }, out: { 'Roma rakamıyla tarih': 'XV-III-MMXXVI', 'Gün': '15 = XV', 'Ay': '3 (Mart) = III', 'Karakter sayısı (ayraçlar dahil)': '13' } },
    { in: { tarih: '19.05.1919', ayrac: 'orta' }, out: { 'Roma rakamıyla tarih': 'XIX·V·MCMXIX' } },
    { in: { tarih: '1988-02-14', sira: 'agy', ayrac: 'egik' }, out: { 'Roma rakamıyla tarih': 'II/XIV/MCMLXXXVIII' } },
    { in: { tarih: '2000-01-01', sira: 'yag', ayrac: 'bosluk' }, out: { 'Roma rakamıyla tarih': 'MM I I', 'Yıl': '2000 = MM' } },
    { in: { tarih: '1999-12-31' }, out: { 'Roma rakamıyla tarih': 'XXXI.XII.MCMXCIX' } },
    { in: { tarih: '2024-08-28' }, out: { 'Roma rakamıyla tarih': 'XXVIII.VIII.MMXXIV' } },
    { in: { tarih: '' }, error: true },
    { in: { tarih: '31.02.2020' }, error: true },
    { in: { tarih: '01.01.4000' }, error: true },
  ],
  howto: [
    '"Tarih" alanından çevirmek istediğiniz günü seçin; doğum günü, evlilik yıl dönümü ya da sizin için anlamlı herhangi bir tarih olabilir.',
    '"Sıra" listesinden parçaların dizilişini belirleyin. Türkiye\'de alışılmış olan gün – ay – yıl sırasıdır.',
    '"Ayraç" listesinden parçaların arasına konacak işareti seçin: nokta, orta nokta, tire, eğik çizgi ya da boşluk.',
    '"Çevir" düğmesine basın. İlk satırdaki yazımı kopyalayın; alt satırlarda her parçanın tek tek karşılığını görüp kontrol edebilirsiniz.',
  ],
  sections: [
    { h: 'Roma rakamları nasıl okunur?', p: [
      'Roma rakamları yedi harften oluşur: <strong>I</strong> = 1, <strong>V</strong> = 5, <strong>X</strong> = 10, <strong>L</strong> = 50, <strong>C</strong> = 100, <strong>D</strong> = 500 ve <strong>M</strong> = 1000. Sayılar bu harflerin büyükten küçüğe yan yana dizilmesiyle yazılır ve değerler toplanır: VIII = 5 + 1 + 1 + 1 = 8, XXVI = 10 + 10 + 5 + 1 = 26.',
      'Aynı harfin dört kez art arda yazılmasını önlemek için <strong>çıkarma kuralı</strong> kullanılır: küçük değerli bir harf, kendisinden büyük bir harfin soluna yazılırsa ondan çıkarılır. Bu yalnızca altı durumda yapılır: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400 ve CM = 900. Dolayısıyla 4 sayısı IIII değil IV, 1900 ise MDCCCC değil MCM olarak yazılır.',
    ] },
    { h: 'Bir tarih Roma rakamına nasıl çevrilir?', p: [
      'Tarihin tamamı tek bir sayı gibi çevrilmez; gün, ay ve yıl <strong>ayrı ayrı</strong> çevrilir ve aralarına bir ayraç konur. Roma rakamlarında sıfır bulunmadığı için "05" gibi başta sıfır taşıyan yazımlar da yoktur: mayıs ayı yalnızca V olarak yazılır.',
      '<strong>Çözümlü örnek:</strong> 29 Ekim 1923 tarihini ele alalım. Gün 29 = 10 + 10 + 9 → XXIX. Ay 10 → X. Yıl 1923 = 1000 + 900 + 20 + 3 → M + CM + XX + III = MCMXXIII. Parçalar gün – ay – yıl sırasıyla ve noktayla birleştirildiğinde <strong>XXIX.X.MCMXXIII</strong> elde edilir. Aynı yöntemle 19 Mayıs 1919, XIX.V.MCMXIX; 15 Mart 2026 ise XV.III.MMXXVI olur.',
    ] },
    { h: 'Günler, aylar ve sık kullanılan yıllar', ul: [
      '<strong>Aylar:</strong> Ocak I, Şubat II, Mart III, Nisan IV, Mayıs V, Haziran VI, Temmuz VII, Ağustos VIII, Eylül IX, Ekim X, Kasım XI, Aralık XII.',
      '<strong>Zorlanılan günler:</strong> 4 = IV, 9 = IX, 14 = XIV, 19 = XIX, 24 = XXIV, 28 = XXVIII, 29 = XXIX, 30 = XXX, 31 = XXXI.',
      '<strong>1980</strong> = MCMLXXX, <strong>1985</strong> = MCMLXXXV, <strong>1990</strong> = MCMXC, <strong>1995</strong> = MCMXCV, <strong>1999</strong> = MCMXCIX.',
      '<strong>2000</strong> = MM, <strong>2005</strong> = MMV, <strong>2010</strong> = MMX, <strong>2015</strong> = MMXV, <strong>2020</strong> = MMXX, <strong>2025</strong> = MMXXV.',
    ] },
    { h: 'Dövme, yüzük ve hediye için ipuçları', p: [
      'Kalıcı bir yere işlenecek tarihlerde en sık görülen sorun, sıranın karışmasıdır. Türkiye\'de ve Avrupa\'nın büyük bölümünde gün önce yazılır; Amerika Birleşik Devletleri\'nde ise ay önce gelir. 5 Mart ile 3 Mayıs, yani V.III ile III.V, birbirine karışabilir. Tasarımı yurt dışındaki bir kaynaktan örnek alıyorsanız hangi sıranın kullanıldığını kontrol edin ve araçtaki "Sıra" seçeneğini buna göre ayarlayın.',
      'Ayraç seçimi görünüşü belirgin biçimde değiştirir. Nokta ve orta nokta klasik, anıt yazıtlarını andıran bir hava verir; tire ve eğik çizgi daha modern durur; boşluk ise en sade seçenektir. 1988 gibi yıllar Roma rakamıyla hayli uzundur (MCMLXXXVIII on bir harf). Bilek, parmak ya da yüzük içi gibi dar alanlarda sonuçtaki "Karakter sayısı" satırı, yazının sığıp sığmayacağını ustayla konuşurken işinize yarar.',
      'Usta ya da kuyumcuya vermeden önce yazımı harf harf denetleyin: alt satırlardaki gün, ay ve yıl karşılıkları bu kontrolü kolaylaştırmak için ayrı ayrı gösterilir. Kalıcı bir işlemde sorumluluk yazımı onaylayandadır; ikinci bir gözün bakması iyi olur.',
    ] },
    { h: 'Sınırlar ve yazım tercihleri', p: [
      'Standart Roma rakamlarıyla yazılabilen en büyük sayı 3999\'dur (MMMCMXCIX); daha büyük sayılar için harfin üzerine çizgi koymak gibi ek gösterimler gerekir. Bu yüzden araç 1 ile 3999 arasındaki yılları kabul eder. Yılın yalnızca son iki hanesini (örneğin 88 = LXXXVIII) kullanmak ya da saat kadranlarında görülen IIII biçimini tercih etmek isteyenler olabilir; bunlar süsleme tercihidir ve standart yazım sayılmaz. Araç her zaman çıkarma kurallı standart biçimi üretir. Tarihler, bugün kullanılan miladi takvime göre değerlendirilir; 30 Şubat gibi takvimde bulunmayan günler reddedilir.',
    ] },
  ],
  faq: [
    ['Doğum tarihim Roma rakamıyla nasıl yazılır?', 'Gün, ay ve yılı ayrı ayrı Roma rakamına çevirip aralarına nokta ya da tire koyarsınız. Örneğin 14 Şubat 1988, XIV.II.MCMLXXXVIII biçiminde yazılır. Tarihi seçmeniz yeterlidir; araç üç parçayı da çevirir.'],
    ['Roma rakamlarında sıfır var mı?', 'Hayır. Roma sayı sisteminde sıfır için bir simge bulunmaz. Bu yüzden tarihlerde 05 ya da 09 gibi başına sıfır konmuş yazımlar olmaz; 5 yalnızca V, 9 yalnızca IX olarak gösterilir.'],
    ['2000 yılı ve sonrası nasıl yazılır?', '2000, iki M ile MM olarak yazılır. Sonraki yıllar bunun üzerine eklenir: 2024 = MMXXIV, 2025 = MMXXV, 2026 = MMXXVI.'],
    ['4 için IIII mü IV mü yazılmalı?', 'Standart yazım IV\'tür. IIII biçimi bazı saat kadranlarında geleneksel olarak kullanılır, ancak tarih yazımında beklenen biçim çıkarma kurallı olandır; araç da bunu üretir.'],
    ['Gün mü önce yazılır, ay mı?', 'Türkiye\'de gün – ay – yıl sırası kullanılır. Amerikan yazımında ay önce gelir. Günü 12\'den büyük olan tarihlerde karışıklık olmaz, ama 3 Mayıs ve 5 Mart gibi tarihlerde sıra anlamı değiştirir; bu yüzden tercihinizi bilerek yapın.'],
    ['En uzun tarih yazımı hangisidir?', 'Yıl kısmı belirleyicidir. 1888, MDCCCLXXXVIII olarak on üç harfle yazılır ve yakın dönemin en uzun yıllarındandır. 2000 ise yalnızca iki harftir. Dar alanlar için karakter sayısı satırına bakabilirsiniz.'],
    ['Küçük harfle yazabilir miyim?', 'Roma rakamları geleneksel olarak büyük harfle yazılır. Küçük harfli biçim (xv.iii.mmxxvi) sayfa numaralarında ve madde işaretlerinde görülür; tasarım amacıyla isterseniz sonucu küçük harfe çevirerek kullanabilirsiniz.'],
    ['Seçtiğim tarih bir yere gönderiliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; tarih sunucuya iletilmez ve kaydedilmez. Sayfa bir kez açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['roma-rakami', 'hangi-gun-hesapla', 'tarih-farki', 'dogum-gunu-geri-sayim', 'julyen-gun-hesapla'],
};
