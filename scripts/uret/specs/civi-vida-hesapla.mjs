export default {
  slug: 'civi-vida-hesapla',
  title: 'Vida ve Dübel Adedi Hesaplama',
  h1Tail: 'aralığa göre adet',
  pageTitle: 'Vida ve Dübel Adedi Hesaplama – Kaç Vida, Kaç Dübel Gerekir?',
  description: 'Montaj hattının uzunluğu, sıra sayısı ve vida aralığına göre gereken vida ve dübel adedini hesaplayın. Kenar payı, fire ve kutu sayısı da hesaba katılır.',
  card: 'Hat uzunluğu, sıra sayısı ve vida aralığından gereken vida, dübel ve kutu sayısını fire payıyla birlikte bulun.',
  category: 'insaat',
  keywords: ['vida adedi hesaplama', 'dübel hesaplama', 'kaç vida gerekir', 'vida aralığı hesaplama', 'alçıpan vida hesabı', 'profil dübel aralığı', 'vida kutu hesabı'],
  lead: 'Profil, lata, levha ya da ray sabitlerken kaç vida ve dübel gerektiğini hesaplayın. Araç, her sıranın uzunluğunu <strong>en fazla vida aralığını aşmayacak biçimde eşit parçalara</strong> böler, sıra sayısıyla çarpar, fire ekler ve kaç kutu almanız gerektiğini söyler.',
  button: 'Hesapla',
  inputs: [
    { id: 'uzunluk', label: 'Bir sıranın uzunluğu (m)', type: 'number', placeholder: 'Örn. 3', hint: 'Vidaların dizileceği profilin, latanın ya da levha kenarının boyu.' },
    { id: 'sira', label: 'Sıra sayısı', type: 'number', value: '1', hint: 'Aynı uzunlukta kaç hat vidalanacak?' },
    { id: 'aralik', label: 'En fazla vida aralığı (cm)', type: 'number', placeholder: 'Örn. 30' },
    { id: 'kenar', label: 'Uçlardan kenar payı (cm)', type: 'number', value: '5', hint: 'İlk ve son vidanın hattın ucuna uzaklığı.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '10' },
    { id: 'dubel', label: 'Dübel', type: 'select', options: [['evet', 'Her vidaya bir dübel'], ['hayir', 'Dübel kullanılmayacak']] },
    { id: 'kutu', label: 'Kutudaki adet (isteğe bağlı)', type: 'number', placeholder: 'Örn. 100', hint: 'Yazarsanız kaç kutu almanız gerektiği gösterilir.' },
  ],
  compute(v, h) {
    const L = h.pos(v.uzunluk, 'Bir sıranın uzunluğu') * 100;
    const sira = h.posint(String(v.sira ?? '').trim() === '' ? '1' : v.sira, 'Sıra sayısı');
    const aralik = h.pos(v.aralik, 'En fazla vida aralığı');
    const kenar = h.opt(v.kenar, 5, 'Uçlardan kenar payı');
    if (kenar < 0) h.err('"Uçlardan kenar payı" negatif olamaz.');
    const fire = h.opt(v.fire, 10, 'Fire payı');
    if (fire < 0 || fire > 100) h.err('"Fire payı" 0 ile 100 arasında bir yüzde olmalı (örn. 10).');
    const acik = L - 2 * kenar;
    if (!(acik > 1e-9)) h.err('Kenar payları hattın tamamını kaplıyor; uzunluğu metre, kenar payını santimetre olarak kontrol edin.');
    const bolme = Math.max(1, Math.ceil(acik / aralik - 1e-9));
    const siraBasi = bolme + 1;
    const net = siraBasi * sira;
    const fireli = Math.ceil(net * (1 + fire / 100) - 1e-9);
    const rows = [
      ['Alınacak vida (fire dahil)', h.fmt(fireli, 0) + ' adet'],
      ['Net vida adedi', h.fmt(net, 0) + ' adet'],
      ['Sıra başına vida', h.fmt(siraBasi, 0) + ' adet'],
      ['Gerçekleşen vida aralığı', h.fmt(acik / bolme, 2) + ' cm'],
    ];
    if (v.dubel !== 'hayir') rows.push(['Alınacak dübel (fire dahil)', h.fmt(fireli, 0) + ' adet']);
    if (String(v.kutu ?? '').trim() !== '') {
      const k = h.posint(v.kutu, 'Kutudaki adet');
      rows.push(['Vida kutusu sayısı', h.fmt(Math.ceil(fireli / k - 1e-9), 0) + ' kutu']);
    }
    return {
      rows,
      note: 'Vidalar her sırada eşit aralıkla dizilir; gerçekleşen aralık yazdığınız en fazla aralığı aşmaz. Vida çapı, boyu ve dübel tipi seçimi bu hesabın dışındadır.',
    };
  },
  cases: [
    { in: { uzunluk: '3', sira: '4', aralik: '30', kenar: '5', fire: '10', dubel: 'evet' }, out: { 'Alınacak vida (fire dahil)': '49 adet', 'Net vida adedi': '44 adet', 'Sıra başına vida': '11 adet', 'Gerçekleşen vida aralığı': '29 cm', 'Alınacak dübel (fire dahil)': '49 adet' } },
    { in: { uzunluk: '2,4', sira: '1', aralik: '60', kenar: '5', fire: '10', dubel: 'evet' }, out: { 'Alınacak vida (fire dahil)': '6 adet', 'Net vida adedi': '5 adet', 'Gerçekleşen vida aralığı': '57,5 cm' } },
    { in: { uzunluk: '2,5', sira: '5', aralik: '25', kenar: '0', fire: '0', dubel: 'hayir' }, out: { 'Alınacak vida (fire dahil)': '55 adet', 'Sıra başına vida': '11 adet', 'Gerçekleşen vida aralığı': '25 cm' } },
    { in: { uzunluk: '6', sira: '2', aralik: '50', kenar: '10', fire: '5', dubel: 'evet', kutu: '100' }, out: { 'Alınacak vida (fire dahil)': '28 adet', 'Net vida adedi': '26 adet', 'Gerçekleşen vida aralığı': '48,33 cm', 'Vida kutusu sayısı': '1 kutu' } },
    { in: { uzunluk: '1,2', sira: '40', aralik: '20', kenar: '2,5', fire: '10', dubel: 'hayir', kutu: '250' }, out: { 'Alınacak vida (fire dahil)': '308 adet', 'Net vida adedi': '280 adet', 'Sıra başına vida': '7 adet', 'Gerçekleşen vida aralığı': '19,17 cm', 'Vida kutusu sayısı': '2 kutu' } },
    { in: { uzunluk: '0,5', sira: '1', aralik: '80', kenar: '5', fire: '0', dubel: 'evet' }, out: { 'Alınacak vida (fire dahil)': '2 adet', 'Gerçekleşen vida aralığı': '40 cm' } },
    { in: { uzunluk: '3', sira: '4', aralik: '0', kenar: '5', fire: '10' }, error: true },
    { in: { uzunluk: '0,1', sira: '1', aralik: '30', kenar: '5', fire: '10' }, error: true },
  ],
  howto: [
    'Vidalayacağınız bir hattın (profil, lata, ray ya da levha kenarı) uzunluğunu metre olarak yazın.',
    'Aynı uzunlukta kaç hat olduğunu "Sıra sayısı" alanına girin. Farklı uzunlukta hatlar için hesabı ayrı ayrı yapıp sonuçları toplayın.',
    'İki vida arasında bırakılabilecek en büyük mesafeyi santimetre olarak yazın; bu değeri malzeme üreticisinin montaj talimatından alın.',
    'Kenar payını ve fire oranını gerekirse değiştirin; dübel kullanıp kullanmayacağınızı seçin.',
    'Kutudaki adedi yazarsanız kaç kutu alacağınız da hesaplanır. "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Vida adedi nasıl hesaplanır?', p: [
      'Bir hat boyunca vida dizerken ilk ve son vida uçlardan belirli bir kenar payı kadar içeride olur; aradaki açıklık ise eşit parçalara bölünür. Hesap şu adımları izler:',
    ], ol: [
      'Vidalanacak açıklık: <strong>açıklık = hat uzunluğu − 2 × kenar payı</strong>.',
      'Bölme sayısı: açıklık en fazla vida aralığına bölünür ve <strong>yukarı yuvarlanır</strong>. Böylece hiçbir aralık izin verilen değeri aşmaz.',
      'Sıra başına vida: <strong>bölme sayısı + 1</strong>. Çit direği sayarken olduğu gibi, aralık sayısından bir fazla vida gerekir.',
      'Net adet: sıra başına vida × sıra sayısı.',
      'Alınacak adet: net adet fire payıyla artırılır ve tam sayıya yukarı yuvarlanır.',
    ] },
    { h: 'Çözümlü örnek: dört sıra profil', p: [
      'Duvara 3 metre uzunluğunda dört adet profil sabitlenecek olsun. Vida aralığı en fazla 30 cm, uçlardan kenar payı 5 cm, fire %10.',
      'Açıklık 300 − 2 × 5 = 290 cm\'dir. 290 ÷ 30 = 9,67 olduğundan bölme sayısı 10\'a yuvarlanır ve gerçekleşen aralık 290 ÷ 10 = 29 cm olur. Her profilde 10 + 1 = 11 vida, dört profilde 44 vida bulunur. %10 fireyle 48,4, yani <strong>49 vida</strong> almak gerekir. Duvar tuğla ya da beton olduğu için her vidaya bir dübel düşer; dübel adedi de 49\'dur.',
      'İkinci bir örnek: 2,4 metrelik tek bir rayı en fazla 60 cm arayla sabitleyelim. Açıklık 230 cm, 230 ÷ 60 = 3,83 olduğundan dört bölme yapılır; 5 vida gerekir ve aralık 57,5 cm olur. Yalnızca aşağı yuvarlansaydı dört vida kullanılır, aralık 76,7 cm\'ye çıkar ve izin verilen değeri aşardı.',
    ] },
    { h: 'Neden "bölme + 1"?', p: [
      'Bu, sayma problemlerinde en sık yapılan hatadır ve "çit direği hatası" olarak bilinir. 3 metrelik bir hattı 30 santimetrede bir vidalamak denince akla 300 ÷ 30 = 10 vida gelir; oysa 10 aralığın iki ucunda toplam 11 nokta vardır. Uzun tek bir hatta bir vidalık fark önemsiz görünse de, kırk kısa parçanın her birinde bir vida eksik saymak iş ortasında malzemenin bitmesine yol açar. Araç bu eklemeyi her sıra için otomatik yapar.',
    ] },
    { h: 'Vida aralığı neye göre belirlenir?', p: [
      'Aralık; sabitlenen malzemenin ağırlığına, zeminin taşıma gücüne, vidanın ve dübelin çapına ve yükün yönüne bağlıdır. Tavana asılan bir elemanda vidalar çekmeye çalışır ve daha sık dizilir; duvara dayalı bir elemanda yük çoğunlukla kesme yönündedir. Hafif süpürgelik ve çıta gibi parçalarda aralık geniş tutulabilirken ağır raf rayları, dolap askıları ve cephe profillerinde sıklaştırılır.',
      'Alçıpan, OSB, cephe paneli, çatı sacı gibi sistem malzemelerinde vida aralığını üretici belirler ve montaj kılavuzunda yazar; levha kenarlarında ve ortasında farklı aralıklar istenebilir. Bu araç aralığı sizden alır ve yalnızca adedi hesaplar; aralık konusunda her zaman ürünün teknik dokümanını esas alın.',
    ] },
    { h: 'Dübel seçerken zemin önemlidir', ul: [
      '<strong>Beton ve dolu tuğla:</strong> standart plastik dübeller yaygın biçimde kullanılır; ağır yüklerde çelik dübel tercih edilir.',
      '<strong>Delikli tuğla ve briket:</strong> boşlukta açılan ya da düğümlenen tipte dübeller daha iyi tutunur.',
      '<strong>Gazbeton:</strong> yumuşak yapısı nedeniyle bu malzemeye özel, geniş dişli dübeller gerekir.',
      '<strong>Alçıpan:</strong> levhanın arkasında açılan kelebek ya da yaylı dübeller kullanılır; ağır yükler mutlaka arkadaki profile bağlanmalıdır.',
      '<strong>Ahşap ve metal profil:</strong> dübel gerekmez; uygun ahşap vidası ya da matkap uçlu vida doğrudan kullanılır. Bu durumda "Dübel kullanılmayacak" seçeneğini işaretleyin.',
    ] },
    { h: 'Fire payı ve kutu hesabı', p: [
      'Vida ve dübelde fire; düşüp kaybolan, başı sıyrılan, yanlış delinen ya da kırılan parçalardan oluşur. Küçük işlerde birkaç adetlik yedek yeterliyken büyük montajlarda %5–10 pay bırakmak alışılmış bir uygulamadır. Vidalar çoğunlukla 100, 200, 250, 500 ya da 1000 adetlik kutularda satılır. Kutudaki adedi yazdığınızda araç, fireli ihtiyacı karşılayan en az kutu sayısını verir. Kutu ile ihtiyaç arasındaki fark küçükse bir üst kutuya geçmek, eksik kalıp ikinci kez alışverişe gitmekten çoğu zaman daha ucuzdur.',
    ] },
    { h: 'Sınırlar ve güvenlik uyarısı', p: [
      'Hesap, vidaların tek doğrultuda ve eşit aralıkla dizildiğini varsayar. Levha kaplamalarda hem kenar hem orta sıralar bulunduğundan her vida hattını ayrı bir sıra olarak düşünün ve sıra sayısını buna göre girin. Araç yük hesabı yapmaz: bir vidanın ya da dübelin taşıyabileceği kuvvet zemine, çapa, gömme derinliğine ve montaj kalitesine bağlıdır. Televizyon askısı, asma dolap, klima dış ünitesi, korkuluk ve cephe elemanı gibi düşmesi hâlinde tehlike yaratacak montajlarda bağlantı elemanı üreticisinin yük tablolarına bakın, gerekirse bir mühendise danışın. Delme öncesinde duvar içindeki elektrik ve su hatlarını kontrol etmeyi unutmayın.',
    ] },
  ],
  faq: [
    ['3 metre profile 30 cm arayla kaç vida gerekir?', 'Uçlardan 5 cm kenar payı bırakılırsa açıklık 290 cm olur, 10 eşit aralığa bölünür ve 11 vida gerekir. Vidalar arasındaki gerçek mesafe 29 cm olur.'],
    ['Neden aralık sayısından bir fazla vida çıkıyor?', 'Çünkü her aralığın iki ucunda birer vida vardır. On aralık, on bir noktayla sınırlanır. Hattın iki ucuna da vida konulduğu sürece vida sayısı aralık sayısının bir fazlasıdır.'],
    ['Gerçekleşen aralık yazdığım değerden neden küçük?', 'Araç vidaları eşit aralıkla dağıtır ve hiçbir aralığın sizin verdiğiniz en büyük değeri aşmamasını sağlar. Açıklık aralığın tam katı değilse bir bölme fazla yapılır ve aralıklar biraz daralır.'],
    ['Dübel adedi vida adediyle aynı mı?', 'Dübelli montajda her vida bir dübele girer, bu yüzden adetler eşittir. Ahşaba ya da metal profile doğrudan vidalama yapılıyorsa dübel gerekmez; ilgili seçeneği değiştirerek dübel satırını kaldırabilirsiniz.'],
    ['Kenar payı ne kadar olmalı?', 'Vidanın malzemenin ucuna çok yakın olması çatlamaya yol açabilir, çok uzak olması ise ucun esnemesine. Çoğu montajda birkaç santimetrelik pay bırakılır; kesin değer için malzemenin montaj talimatına bakın. Kenar payı istemiyorsanız 0 yazabilirsiniz.'],
    ['Çivi için de kullanabilir miyim?', 'Evet. Hesap yalnızca aralığa göre adet bulduğundan çivi, perçin, kelepçe ya da klips gibi eşit aralıkla dizilen bütün bağlantı elemanları için aynı mantık geçerlidir. Dübel seçeneğini "kullanılmayacak" yapmanız yeterlidir.'],
    ['Farklı uzunlukta parçalarım var, nasıl hesaplarım?', 'Aynı uzunluktaki parçaları bir grup olarak girin, sonucu not edin ve diğer uzunluklar için hesabı tekrarlayın. Net adetleri toplayıp fireyi en sonda eklemek en doğru sonucu verir.'],
    ['Girdiğim ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['alcipan-hesapla', 'osb-kontrplak-hesapla', 'cit-hesapla', 'supurgelik-hesapla', 'profil-agirligi-hesapla'],
};
