export default {
  slug: 'yuzme-temposu-hesapla',
  title: 'Yüzme Temposu Hesaplama',
  h1Tail: '100 metre temposu',
  pageTitle: 'Yüzme Temposu Hesaplama – 100 Metre Pace ve Hız Hesabı',
  description: 'Yüzdüğünüz mesafe ve süreden 100 metre temponuzu, ortalama hızınızı, havuz boyu sayısını ve boy başına sürenizi hesaplayın. 25 ve 50 metre havuz desteği.',
  card: 'Mesafe ve süreden 100 metre yüzme temponuzu, hızınızı ve havuz boyu başına sürenizi bulun.',
  category: 'saglik',
  keywords: ['yüzme temposu hesaplama', '100 metre yüzme temposu', 'yüzme pace hesaplama', 'yüzme hızı hesaplama', 'havuz boyu hesaplama', 'triatlon yüzme temposu', '1500 metre yüzme süresi'],
  lead: 'Yüzdüğünüz mesafeyi ve süreyi yazın; araç <strong>100 metre başına temponuzu</strong>, ortalama hızınızı, kaç havuz boyu yüzdüğünüzü ve her boyu ortalama kaç saniyede geçtiğinizi hesaplasın. Aynı tempoyla 400, 1500 ve 3800 metrenin kaç dakika süreceğini de görürsünüz.',
  button: 'Hesapla',
  inputs: [
    { id: 'mesafe', label: 'Yüzülen mesafe (metre)', type: 'number', placeholder: 'Örn. 1500' },
    { id: 'sure', label: 'Süre', type: 'text', placeholder: 'Örn. 30:00', hint: 'dk:sn ya da sa:dk:sn biçiminde yazın. Yalnızca sayı yazarsanız dakika kabul edilir.' },
    { id: 'havuz', label: 'Havuz uzunluğu', type: 'select', options: [['25', '25 metre (kısa kulvar)'], ['50', '50 metre (olimpik)']] },
  ],
  compute(v, h) {
    const mesafe = h.pos(v.mesafe, 'Yüzülen mesafe');
    const ham = String(v.sure ?? '').trim();
    if (ham === '') h.err('"Süre" alanını doldurun (örn. 30:00).');
    let sn;
    if (ham.includes(':')) {
      const p = ham.split(':').map((x) => x.trim());
      if (p.length > 3 || p.some((x) => !/^\d+([.,]\d+)?$/.test(x))) h.err('Süreyi dk:sn ya da sa:dk:sn biçiminde yazın (örn. 30:00 ya da 1:05:30).');
      const n = p.map((x) => Number(x.replace(',', '.')));
      if (p.length === 2) sn = n[0] * 60 + n[1];
      else sn = n[0] * 3600 + n[1] * 60 + n[2];
      if (n[n.length - 1] >= 60 || (p.length === 3 && n[1] >= 60)) h.err('Dakika ve saniye değerleri 60\'tan küçük olmalı.');
    } else {
      sn = h.pos(ham, 'Süre') * 60;
    }
    if (!(sn > 0)) h.err('"Süre" sıfırdan büyük olmalı.');
    const havuz = v.havuz === '50' ? 50 : 25;
    const tempo = (t) => {
      const t10 = Math.round(t * 10 + 1e-9);
      const m = Math.floor(t10 / 600);
      const k = t10 - m * 600;
      const s = Math.floor(k / 10);
      const d = k % 10;
      return `${m}:${String(s).padStart(2, '0')}${d ? ',' + d : ''}`;
    };
    const uzun = (t) => {
      const s = Math.round(t);
      const sa = Math.floor(s / 3600);
      const dk = Math.floor((s % 3600) / 60);
      const ss = s % 60;
      return sa > 0 ? `${sa}:${String(dk).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${dk}:${String(ss).padStart(2, '0')}`;
    };
    const yuzMetre = (sn / mesafe) * 100;
    const ms = mesafe / sn;
    if (ms > 3) h.err('Bu hız yüzme için gerçekçi değil (saniyede 3 metreden fazla). Mesafe ve süreyi kontrol edin.');
    const boy = mesafe / havuz;
    return {
      rows: [
        ['100 m temposu', tempo(yuzMetre) + ' /100 m'],
        ['Ortalama hız', h.fmt(ms * 3.6, 2) + ' km/sa'],
        ['Hız (metre/saniye)', h.fmt(ms, 3) + ' m/sn'],
        ['Havuz boyu sayısı', h.fmt(boy, 2) + ' boy'],
        ['Boy başına süre', h.fmt(sn / boy, 1) + ' sn'],
        ['Aynı tempoyla 400 m', uzun(yuzMetre * 4)],
        ['Aynı tempoyla 1500 m', uzun(yuzMetre * 15)],
        ['Aynı tempoyla 3800 m', uzun(yuzMetre * 38)],
      ],
      note: 'Tahmini süreler temponun hiç düşmediğini varsayar; uzun mesafede yorgunluk nedeniyle gerçek süre genellikle daha uzundur.',
    };
  },
  cases: [
    { in: { mesafe: '1500', sure: '30:00', havuz: '25' }, out: { '100 m temposu': '2:00 /100 m', 'Ortalama hız': '3 km/sa', 'Havuz boyu sayısı': '60 boy', 'Boy başına süre': '30 sn' } },
    { in: { mesafe: '400', sure: '7:30', havuz: '50' }, out: { '100 m temposu': '1:52,5 /100 m', 'Ortalama hız': '3,2 km/sa', 'Havuz boyu sayısı': '8 boy', 'Aynı tempoyla 1500 m': '28:08' } },
    { in: { mesafe: '750', sure: '12:30', havuz: '25' }, out: { '100 m temposu': '1:40 /100 m', 'Ortalama hız': '3,6 km/sa', 'Hız (metre/saniye)': '1 m/sn', 'Boy başına süre': '25 sn' } },
    { in: { mesafe: '3800', sure: '1:16:00', havuz: '50' }, out: { '100 m temposu': '2:00 /100 m', 'Havuz boyu sayısı': '76 boy', 'Aynı tempoyla 3800 m': '1:16:00' } },
    { in: { mesafe: '1000', sure: '22:05', havuz: '25' }, out: { '100 m temposu': '2:12,5 /100 m', 'Ortalama hız': '2,72 km/sa', 'Aynı tempoyla 400 m': '8:50' } },
    { in: { mesafe: '100', sure: '1', havuz: '25' }, out: { '100 m temposu': '1:00 /100 m', 'Ortalama hız': '6 km/sa' } },
    { in: { mesafe: '1500', sure: 'abc', havuz: '25' }, error: true },
    { in: { mesafe: '0', sure: '30:00', havuz: '25' }, error: true },
    { in: { mesafe: '1500', sure: '10:75', havuz: '25' }, error: true },
  ],
  howto: [
    '"Yüzülen mesafe" alanına antrenmanda ya da yarışta kat ettiğiniz toplam mesafeyi metre olarak yazın.',
    '"Süre" alanına toplam sürenizi <code>30:00</code> (dakika:saniye) ya da <code>1:16:00</code> (saat:dakika:saniye) biçiminde girin.',
    'Yüzdüğünüz havuzun uzunluğunu seçin; bu seçim yalnızca boy sayısını ve boy başına süreyi etkiler.',
    '"Hesapla" düğmesine basın; 100 metre temponuz ilk satırda, hız ve tahmini süreler altında görünür.',
    'Sonuçları kopyalayıp antrenman günlüğünüze yapıştırarak haftalar içindeki gelişiminizi izleyin.',
  ],
  sections: [
    { h: 'Yüzmede tempo ne demektir?', p: [
      'Koşuda tempo kilometre başına dakikayla ölçülür; yüzmede ise mesafeler kısa ve hızlar düşük olduğu için ölçü <strong>100 metre başına süre</strong>dir. "Tempom 2:00" diyen bir yüzücü, her 100 metreyi ortalama iki dakikada geçtiğini anlatır. Antrenman setleri, saat ayarları ve yarış planları neredeyse her zaman bu değer üzerinden konuşulur.',
      'Tempo, hızın tersidir: sayı küçüldükçe daha hızlı yüzüyorsunuz demektir. Bu nedenle 1:45 temposu 2:00 temposundan daha iyidir. Ortalama hızı km/sa olarak görmek ise yüzmenin ne kadar "yavaş" bir spor olduğunu hatırlatır; iyi bir amatör yüzücü bile saatte ancak 3–4 kilometre yol alır, çünkü su havadan yüzlerce kat daha yoğundur ve direnç hızla birlikte çok çabuk artar.',
    ] },
    { h: 'Hesap nasıl yapılır?', p: [
      'Formül basittir: <strong>100 m temposu = (toplam süre saniye ÷ mesafe metre) × 100</strong>. Ortalama hız ise mesafenin süreye bölünmesiyle metre/saniye olarak bulunur ve 3,6 ile çarpılarak km/sa\'ya çevrilir.',
      'Çözümlü örnek: 1500 metreyi 30 dakikada yüzdünüz. 30 dakika 1800 saniyedir. 1800 ÷ 1500 = 1,2 saniye/metre, 100 ile çarpınca 120 saniye, yani <strong>2:00 /100 m</strong> bulunur. Hız 1500 ÷ 1800 = 0,833 m/sn, bu da 3 km/sa eder. 25 metrelik havuzda 1500 metre 60 boy yapar ve her boy ortalama 30 saniye sürmüştür.',
      'İkinci örnek: 50 metrelik havuzda 400 metreyi 7 dakika 30 saniyede bitirdiniz. 450 saniye ÷ 400 metre × 100 = 112,5 saniye, yani 1:52,5 /100 m. Bu tempoyu 1500 metre boyunca koruyabilseydiniz süreniz 28 dakika 8 saniye olurdu.',
    ] },
    { h: 'Havuz uzunluğu neden önemli?', p: [
      'Türkiye\'deki belediye ve site havuzlarının çoğu 25 metredir; yarı olimpik olarak da anılır. Olimpik havuzlar 50 metredir. Aynı yüzücü 25 metrelik havuzda genellikle biraz daha iyi tempo yapar, çünkü daha sık dönüş yapar ve her dönüşte duvardan itilerek hız kazanır. Bu yüzden kısa kulvar ve uzun kulvar dereceleri ayrı tutulur.',
      'Araçta havuz uzunluğu tempoyu değiştirmez; yalnızca kaç boy yüzdüğünüzü ve boy başına ortalama sürenizi gösterir. Boy başına süre, havuz kenarındaki tempo saatine bakarak antrenman yapanlar için pratik bir hedeftir: 2:00 temposu için 25 metrelik havuzda her boyu 30 saniyede dönmeniz gerekir.',
    ] },
    { h: 'Tempoyu antrenmanda kullanma', p: [
      'Tempo bilgisi en çok aralıklı setlerde işe yarar. Örneğin "10 × 100 metre, 2:15 çıkışlı" bir sette her 100 metreye 2 dakika 15 saniyede bir başlarsınız; temponuz 2:00 ise her tekrar arasında 15 saniye dinlenirsiniz. Temponuzu bilmeden çıkış süresi seçmek ya hiç dinlenememeye ya da gereğinden fazla beklemeye yol açar.',
      'Gelişimi izlemek için aynı mesafeyi belirli aralıklarla ölçün. Sık kullanılan bir yöntem, iyice ısındıktan sonra 400 metre ve 200 metreyi en iyi çabayla yüzüp sürelerini not etmektir. Bu iki sürenin arasındaki fark, uzun süre koruyabileceğiniz eşik temposu hakkında fikir verir. Ayrıntılı antrenman planı için bir yüzme antrenörüyle çalışmak en doğrusudur.',
    ] },
    { h: 'Triatlon ve açık su mesafeleri', ul: [
      '<strong>Sprint triatlon:</strong> 750 metre yüzme',
      '<strong>Olimpik (standart) triatlon:</strong> 1500 metre yüzme',
      '<strong>Yarı mesafe (70.3):</strong> 1900 metre yüzme',
      '<strong>Tam mesafe:</strong> 3800 metre yüzme',
      '<strong>Havuz yarışları:</strong> 50, 100, 200, 400, 800 ve 1500 metre serbest',
    ], p: [
      'Açık suda dönüş duvarı olmadığı, dalga ve akıntı bulunduğu ve düz bir çizgide yüzmek zor olduğu için havuz temposunu aynen beklememek gerekir. Öte yandan neopren kıyafet kaldırma kuvveti sağlayarak tempoyu iyileştirebilir. Aracın verdiği 3800 metre tahmini, bu etkenleri hesaba katmayan sade bir orantıdır.',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', p: [
      'En yaygın hata, duvarda dinlenilen süreleri toplam süreye katıp katmamakta tutarsız davranmaktır. Akıllı saatler çoğu zaman yalnızca hareketli süreyi tempo hesabına alır; kendi kronometrenizle ölçtüğünüz toplam süre ise dinlenmeleri de içerir. Karşılaştırma yaparken hep aynı yöntemi kullanın.',
      'İkinci hata boy sayısını yanlış saymaktır. Bir "boy" havuzun bir ucundan diğerine tek geçiştir; gidiş-dönüş iki boydur. 25 metrelik havuzda 40 boy 1000 metre eder.',
      'Araç saniyede 3 metreden yüksek hızları kabul etmez; dünyanın en hızlı sprint yüzücüleri bile bu değerin altındadır, dolayısıyla böyle bir sonuç büyük olasılıkla yanlış girilmiş bir mesafe ya da süre demektir. Sonuçlar bilgilendirme amaçlıdır; sağlık sorununuz varsa yoğun antrenmana başlamadan önce hekiminize danışın.',
    ] },
  ],
  faq: [
    ['İyi bir 100 metre yüzme temposu kaçtır?', 'Bu, yaşa, deneyime ve mesafeye göre çok değişir. Düzenli yüzen yetişkin amatörlerin uzun mesafe temposu çoğunlukla 100 metrede 1:45 ile 2:30 arasındadır. Yeni başlayanlar için 2:30 ve üzeri gayet olağandır; önemli olan kendi temponuzun zaman içindeki değişimidir.'],
    ['1500 metreyi 30 dakikada yüzmek hangi tempoya denk gelir?', '100 metrede tam 2:00 temposuna denk gelir. Ortalama hız 3 km/sa olur; 25 metrelik havuzda bu 60 boy ve boy başına 30 saniye demektir.'],
    ['Süreyi nasıl yazmalıyım?', 'Dakika ve saniyeyi iki nokta ile ayırın: 7:30 yedi dakika otuz saniyedir. Bir saati aşan sürelerde 1:16:00 gibi saat:dakika:saniye biçimini kullanın. Yalnızca 25 gibi tek bir sayı yazarsanız araç bunu 25 dakika olarak yorumlar.'],
    ['Tempo ile hız arasındaki fark nedir?', 'Hız birim zamanda alınan yoldur (km/sa ya da m/sn); tempo ise birim yol için harcanan süredir (100 metre başına dakika). İkisi aynı bilgiyi ters yönden söyler: 2:00 temposu 3 km/sa hıza, 1:40 temposu 3,6 km/sa hıza eşittir.'],
    ['Yard cinsinden havuzlarda bu araç kullanılır mı?', 'Araç metreyle çalışır. Yard ölçülü bir havuzda yüzdüyseniz mesafeyi önce metreye çevirin; 1 yard 0,9144 metredir, yani 25 yardlık havuzun bir boyu 22,86 metre eder.'],
    ['Tahmini 1500 ve 3800 metre süreleri ne kadar güvenilir?', 'Bunlar girdiğiniz tempoyu sabit tutan düz orantı sonuçlarıdır. Kısa bir mesafenin temposunu uzun mesafeye taşırsanız sonuç iyimser kalır; çünkü mesafe uzadıkça tempo doğal olarak düşer. En gerçekçi tahmin, hedef mesafeye yakın bir antrenmanın temposundan elde edilir.'],
    ['Akıllı saatim farklı bir tempo gösteriyor, neden?', 'Saatler boy sayısını kol hareketinden tahmin eder ve kimi zaman boy atlar ya da fazladan sayar. Ayrıca çoğu saat duvardaki dinlenmeleri tempodan çıkarır. Mesafeyi kendiniz sayıp toplam süreyi girdiğinizde aradaki fark bu iki nedenden kaynaklanır.'],
    ['Girdiğim antrenman verileri kaydediliyor mu?', 'Hayır. Hesap bütünüyle tarayıcınızda yapılır; mesafe ve süre bilgisi hiçbir sunucuya gönderilmez, saklanmaz. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['yuzme-kalori-hesapla', 'kosu-temposu-hesapla', 'hiz-hesapla', 'maraton-sure-tahmini', 'maksimum-nabiz-hesapla'],
};
