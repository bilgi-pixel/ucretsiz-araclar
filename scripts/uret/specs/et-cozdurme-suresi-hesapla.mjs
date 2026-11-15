export default {
  slug: 'et-cozdurme-suresi-hesapla',
  title: 'Donmuş Et Çözdürme Süresi Hesaplama',
  h1Tail: 'buzdolabında ve soğuk suda',
  pageTitle: 'Donmuş Et Çözdürme Süresi Hesaplama – Buzdolabında ve Suda',
  description: 'Donmuş et, tavuk ya da hindinin buzdolabında ve soğuk suda kaç saatte çözüleceğini ağırlığa göre hesaplayın; dondurucudan ne zaman çıkaracağınızı öğrenin.',
  card: 'Donmuş etin buzdolabında ya da soğuk suda kaç saatte çözüleceğini ve dondurucudan ne zaman çıkması gerektiğini bulun.',
  category: 'gunluk',
  keywords: ['et çözdürme süresi', 'donmuş et kaç saatte çözülür', 'buzdolabında et çözdürme', 'soğuk suda et çözdürme', 'donmuş tavuk çözdürme', 'hindi çözdürme süresi', 'buzluktan et ne zaman çıkarılır'],
  lead: 'Dondurucudaki etin ağırlığını yazın ve çözdürme yöntemini seçin. Araç, güvenli iki yöntem olan <strong>buzdolabında</strong> ve <strong>soğuk suda</strong> çözdürme için gereken süreyi tahmin eder; pişirmeye başlayacağınız saati yazarsanız eti dondurucudan ne zaman çıkarmanız gerektiğini de söyler.',
  button: 'Hesapla',
  inputs: [
    { id: 'agirlik', label: 'Donmuş etin ağırlığı (kg)', type: 'number', placeholder: 'Örn. 2' },
    { id: 'yontem', label: 'Çözdürme yöntemi', type: 'select', options: [['dolap', 'Buzdolabında (en güvenli)'], ['su', 'Soğuk suda (hızlı)']] },
    { id: 'hedef', label: 'Pişirmeye başlama saati (isteğe bağlı)', type: 'text', placeholder: 'Örn. 19:00', hint: 'Yazarsanız dondurucudan çıkarma zamanı hesaplanır.' },
  ],
  compute(v, h) {
    const kg = h.pos(v.agirlik, 'Donmuş etin ağırlığı');
    if (kg > 20) h.err('Ağırlık 20 kg\'dan büyük olamaz; değeri kilogram olarak yazın (750 g için 0,75).');
    const su = v.yontem === 'su';
    // Buzdolabı: 11 saat/kg, en az 12 saat. Soğuk su: 65 dk/kg.
    const dk = su ? Math.round(kg * 65 + 1e-9) : Math.max(720, Math.round(kg * 660 + 1e-9));
    const sa = (m) => {
      const g = Math.floor(m / 1440), s = Math.floor((m % 1440) / 60), d = m % 60;
      const p = [];
      if (g) p.push(g + ' gün');
      if (s) p.push(s + ' saat');
      if (d) p.push(d + ' dk');
      return p.length ? p.join(' ') : '0 dk';
    };
    const rows = [
      ['Tahmini çözülme süresi', sa(dk)],
      ['Saat olarak', h.fmt(dk / 60, 1) + ' saat'],
    ];
    if (su) {
      rows.push(['Su değiştirme sayısı', Math.floor((dk - 1) / 30) + ' kez (30 dakikada bir)']);
      rows.push(['Çözüldükten sonra', 'Bekletmeden hemen pişirin']);
    } else {
      rows.push(['Çözüldükten sonra', 'Buzdolabında 1–2 gün içinde pişirin']);
    }
    const s = String(v.hedef ?? '').trim();
    if (s !== '') {
      const m = /^(\d{1,2})[:.](\d{2})$/.exec(s);
      if (!m || +m[1] > 23 || +m[2] > 59) h.err('Saati SS:DD biçiminde yazın (örn. 19:00) ya da alanı boş bırakın.');
      const fark = +m[1] * 60 + +m[2] - dk;
      const gun = fark < 0 ? Math.ceil(-fark / 1440) : 0;
      const t = ((fark % 1440) + 1440) % 1440;
      const saat = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
      rows.push(['Dondurucudan çıkarma zamanı', gun === 0 ? `Aynı gün ${saat}` : `${gun} gün önce ${saat}`]);
    }
    return {
      rows,
      note: su
        ? 'Soğuk su için yaklaşık 65 dk/kg alınmıştır. Et sızdırmaz poşette olmalı, su soğuk kalmalı ve 30 dakikada bir yenilenmelidir.'
        : 'Buzdolabı (yaklaşık 4 °C) için 11 saat/kg, en az 12 saat alınmıştır. Parçanın kalınlığı ve dolabın sıcaklığı süreyi değiştirir.',
    };
  },
  cases: [
    { in: { agirlik: '2', yontem: 'dolap' }, out: { 'Tahmini çözülme süresi': '22 saat', 'Saat olarak': '22 saat', 'Çözüldükten sonra': 'Buzdolabında 1–2 gün içinde pişirin' } },
    { in: { agirlik: '2', yontem: 'su', hedef: '19:00' }, out: { 'Tahmini çözülme süresi': '2 saat 10 dk', 'Su değiştirme sayısı': '4 kez (30 dakikada bir)', 'Dondurucudan çıkarma zamanı': 'Aynı gün 16:50' } },
    { in: { agirlik: '5', yontem: 'dolap' }, out: { 'Tahmini çözülme süresi': '2 gün 7 saat', 'Saat olarak': '55 saat' } },
    { in: { agirlik: '0,5', yontem: 'dolap' }, out: { 'Tahmini çözülme süresi': '12 saat' } },
    { in: { agirlik: '1', yontem: 'su' }, out: { 'Tahmini çözülme süresi': '1 saat 5 dk', 'Su değiştirme sayısı': '2 kez (30 dakikada bir)', 'Saat olarak': '1,1 saat' } },
    { in: { agirlik: '2', yontem: 'dolap', hedef: '19:00' }, out: { 'Dondurucudan çıkarma zamanı': '1 gün önce 21:00' } },
    { in: { agirlik: '5', yontem: 'dolap', hedef: '12:00' }, out: { 'Dondurucudan çıkarma zamanı': '2 gün önce 05:00' } },
    { in: { agirlik: '-1', yontem: 'dolap' }, error: true },
    { in: { agirlik: '2', yontem: 'su', hedef: 'akşam' }, error: true },
  ],
  howto: [
    'Paketin üzerindeki ya da tartıdaki ağırlığı kilogram olarak yazın; 750 gram için 0,75 girin.',
    'Zamanınız varsa "Buzdolabında", aynı gün pişirecekseniz "Soğuk suda" yöntemini seçin.',
    'İsterseniz ocağı ya da fırını yakacağınız saati yazın; araç geriye sayarak eti dondurucudan çıkarma zamanını verir.',
    '"Hesapla" düğmesine basın ve çözülme süresini, soğuk su yönteminde suyu kaç kez değiştireceğinizi okuyun.',
    'Süre sonunda etin en kalın yerine bastırın ya da bıçak ucuyla yoklayın; ortada buz kristali kalmışsa biraz daha bekleyin.',
  ],
  sections: [
    { h: 'Hangi katsayılar kullanılıyor?', p: [
      'Çözülme hızı, etin çevresindeki ortamın sıcaklığına ve ısıyı ne kadar iyi ilettiğine bağlıdır. Su, havaya göre ısıyı çok daha iyi ilettiği için soğuk suya batırılan paket, aynı sıcaklıktaki havada duran paketten kat kat hızlı çözülür. Araç iki yöntem için yaygın gıda güvenliği kılavuzlarındaki pratik değerlere dayanır:',
    ], ul: [
      '<strong>Buzdolabında:</strong> kilogram başına yaklaşık 11 saat (her 2–2,5 kg için bir tam gün). Küçük paketler de merkezine kadar çözülsün diye süre en az 12 saat, yani bir gece olarak alınır.',
      '<strong>Soğuk suda:</strong> kilogram başına yaklaşık 65 dakika (her 450 gram için yarım saat). Su 30 dakikada bir yenilenir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – 2 kg kuşbaşı, buzdolabında:</strong> 2 × 11 = 22 saat. Etin ertesi akşam 19:00\'da tencereye girmesi isteniyorsa 19:00\'dan 22 saat geriye gidilir; paket bir gün önce saat 21:00\'de dondurucudan buzdolabının alt rafına alınmalıdır.',
      '<strong>Örnek 2 – 2 kg bütün tavuk, soğuk suda:</strong> 2 × 65 = 130 dakika, yani 2 saat 10 dakika. 19:00\'da pişirmeye başlamak için tavuk 16:50\'de suya girer. Su 30., 60., 90. ve 120. dakikalarda olmak üzere dört kez değiştirilir.',
      '<strong>Örnek 3 – 5 kg hindi, buzdolabında:</strong> 5 × 11 = 55 saat, yani 2 gün 7 saat. Yılbaşı öğleni 12:00 için hindi iki gün önce sabah 05:00\'te dolaba inmiş olmalıdır; pratikte üç gün önceki akşamdan çıkarmak rahat bir pay bırakır.',
    ] },
    { h: 'Neden tezgâhta çözdürülmez?', p: [
      'Oda sıcaklığında bırakılan donmuş etin merkezi saatlerce buz gibi kalırken dış yüzeyi çoktan ısınmış olur. Bakteriler yaklaşık 5 °C ile 60 °C arasında hızla çoğalır; bu aralık gıda güvenliğinde "tehlikeli bölge" diye anılır. Yüzey bu aralıkta ne kadar uzun kalırsa risk o kadar artar. Sıcak suya batırmak da aynı nedenle sakıncalıdır, üstelik etin dışını pişirmeye başlar.',
      'Buzdolabında çözdürmede et baştan sona güvenli sıcaklıkta kalır; bu yüzden yavaş ama en emniyetli yöntemdir. Soğuk suda çözdürmede su sıcaklığının düşük kalması için düzenli değiştirilmesi gerekir. Mikrodalganın buz çözme programı üçüncü bir seçenektir, ancak süre cihazın gücüne ve programına göre çok değiştiği için araç bunu hesaplamaz; mikrodalgada çözdürülen et yer yer pişmeye başladığından hemen pişirilmelidir.',
    ] },
    { h: 'Yöntemi doğru uygulamak', ul: [
      'Buzdolabında eti bir kabın ya da derin tabağın içine, en alt rafa koyun; damlayan su diğer yiyeceklere bulaşmasın.',
      'Soğuk suda et mutlaka sızdırmaz bir poşette olmalı; su ete temas ederse hem tat ve doku bozulur hem de mikroplar suya geçer.',
      'Paket suyun yüzeyine çıkıyorsa üzerine bir tabak koyarak tamamen batık kalmasını sağlayın.',
      'Suyu ılıtmayın; musluktan gelen soğuk su yeterlidir.',
      'İnce ve yayvan paketler hesaplanan süreden erken, top biçimli kalın parçalar daha geç çözülür. Kıymayı dondururken yassı poşetlemek ileride ciddi zaman kazandırır.',
    ] },
    { h: 'Çözüldükten sonra ne kadar bekler, tekrar dondurulur mu?', p: [
      'Buzdolabında çözdürülen et, dolaptan hiç çıkmadıysa kısa bir süre daha bekleyebilir: kıyma ve kanatlılar için bir iki gün, bütün parça kırmızı et için birkaç gün yaygın olarak verilen sınırlardır. Soğuk suda ya da mikrodalgada çözdürülen et ise bekletilmeden pişirilmelidir.',
      'Buzdolabında çözdürülmüş ve dolaptan çıkmamış çiğ et teknik olarak yeniden dondurulabilir, ancak her donma-çözülme döngüsünde hücrelerden su kaybı olur ve et kurur. Soğuk suda çözdürülen eti çiğ halde yeniden dondurmayın; önce pişirin, sonra dondurun.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Sonuç bir tahmindir. Buzdolabınızın gerçek sıcaklığı, paketin biçimi, etin kemikli olup olmaması ve dondurucunun ne kadar soğuk olduğu süreyi saatlerce oynatabilir. Derin dondurucudan (−18 °C ve altı) çıkan çok büyük parçalarda hesaplanan değere pay ekleyin. Bu sayfa bilgilendirme amaçlıdır; kokusu, rengi ya da dokusu şüphe uyandıran eti süre hesabına güvenerek tüketmeyin.',
    ] },
  ],
  faq: [
    ['1 kilo donmuş et buzdolabında kaç saatte çözülür?', 'Yaklaşık 11–12 saatte, yani bir gecede çözülür. Akşam yatmadan önce dondurucudan buzdolabına aldığınız 1 kiloluk paket ertesi gün öğlene hazır olur. Kalın ve top biçimli parçalarda birkaç saat daha gerekebilir.'],
    ['Soğuk suda et kaç dakikada çözülür?', 'Kilogram başına yaklaşık 65 dakika hesaplanır. Yarım kiloluk kıyma paketi yarım saat ile bir saat arasında, 2 kiloluk tavuk 2 saat 10 dakika civarında çözülür. Suyun 30 dakikada bir yenilenmesi şarttır.'],
    ['Donmuş eti sıcak suya koysam daha hızlı olmaz mı?', 'Daha hızlı olur ama güvenli değildir. Sıcak su etin dış yüzeyini bakterilerin hızla çoğaldığı sıcaklığa getirir, hatta yer yer pişirir; merkez ise hâlâ donuktur. Soğuk su hem yeterince hızlıdır hem de yüzeyi serin tutar.'],
    ['Donmuş eti çözdürmeden pişirebilir miyim?', 'Köfte, ince bonfile dilimi ya da kuşbaşı gibi küçük parçalar donuk halde pişirilebilir; pişme süresi yaklaşık yarı yarıya uzar. Bütün tavuk, hindi ya da rosto gibi büyük parçalarda dışı kurumadan merkezin güvenli sıcaklığa ulaşması zor olduğu için önce tam çözdürmek gerekir.'],
    ['Hindi kaç günde çözülür?', 'Buzdolabında 4 kg hindi yaklaşık 44 saat, 6 kg hindi 66 saat ister; yani iki ile üç gün arası. Yetişmeyecekse sızdırmaz poşet içinde soğuk suda 6 kg hindi yaklaşık 6,5 saatte çözülür, suyu 12 kez değiştirmek gerekir.'],
    ['Etin tamamen çözüldüğünü nasıl anlarım?', 'En kalın yerine parmakla bastırdığınızda sertlik hissetmemelisiniz. Bütün kanatlılarda karın boşluğuna bakın; içeride buz parçası kaldıysa çözülme bitmemiştir. Emin olmak için ince bir şişi merkeze batırın; direnç görüyorsa bir süre daha bekletin.'],
    ['Çözdürme suyu ne yapılmalı?', 'Çiğ etten sızan su mikrop taşıyabilir. Kabı ve lavaboyu sıcak su ve deterjanla yıkayın, bu suyun salata malzemesi gibi çiğ yenecek gıdalara sıçramasına izin vermeyin. Çiğ tavuğu musluk altında yıkamak da sıçrama yoluyla bulaşmayı artırdığı için önerilmez.'],
    ['Yazdığım bilgiler bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; ağırlık ve saat bilgisi sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['et-pisirme-suresi-hesapla', 'firin-derece-cevir', 'salamura-tuz-orani-hesapla', 'makarna-porsiyon-hesapla', 'pirinc-su-orani-hesapla'],
};
