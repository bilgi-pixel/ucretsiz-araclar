export default {
  slug: 'kelvin-rankine-cevir',
  title: 'Kelvin Rankine Çevirici',
  h1Tail: 'K ↔ °R',
  pageTitle: 'Kelvin Rankine Çevirici – K\'den °R\'ye Sıcaklık Çevirme',
  description: 'Kelvini Rankine\'e, Rankine\'i kelvine çevirin. °R = K × 1,8 bağıntısıyla çalışır; aynı sıcaklığın Celsius ve Fahrenheit karşılığını da gösterir.',
  card: 'Kelvini Rankine\'e, Rankine\'i kelvine çevirin; Celsius ve Fahrenheit karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['kelvin rankine çevirme', 'rankine kelvin dönüştürme', '1 kelvin kaç rankine', 'rankine nedir', 'mutlak sıcaklık çevirici', 'K to R', 'rankine hesaplama'],
  lead: 'Mutlak sıcaklığı kelvinden Rankine\'e ya da Rankine\'den kelvine çevirin. İki ölçek de mutlak sıfırdan başladığı için çeviri tek bir çarpandır: <strong>°R = K × 1,8</strong>.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Sıcaklık', type: 'number', placeholder: 'Örn. 300', hint: 'Mutlak ölçeklerde değer sıfırdan küçük olamaz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['k', 'Kelvin → Rankine'], ['r', 'Rankine → Kelvin']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Sıcaklık');
    if (x < 0) h.err('Kelvin ve Rankine mutlak ölçeklerdir; sıcaklık 0\'dan küçük olamaz. Celsius ya da Fahrenheit değeri çevirmek istiyorsanız ilgili çeviriciyi kullanın.');
    const k = v.yon === 'r' ? x / 1.8 : x;
    const r = v.yon === 'r' ? x : x * 1.8;
    const satirR = ['Rankine', h.fmt(r, 4) + ' °R'];
    const satirK = ['Kelvin', h.fmt(k, 4) + ' K'];
    return {
      rows: [
        v.yon === 'r' ? satirK : satirR,
        v.yon === 'r' ? satirR : satirK,
        ['Celsius', h.fmt(k - 273.15, 4) + ' °C'],
        ['Fahrenheit', h.fmt(r - 459.67, 4) + ' °F'],
      ],
      note: '°R = K × 9/5. Mutlak sıfır her iki ölçekte de 0\'dır (−273,15 °C, −459,67 °F).',
    };
  },
  cases: [
    { in: { deger: '273,15', yon: 'k' }, out: { 'Rankine': '491,67 °R', 'Celsius': '0 °C', 'Fahrenheit': '32 °F' } },
    { in: { deger: '491,67', yon: 'r' }, out: { 'Kelvin': '273,15 K', 'Celsius': '0 °C' } },
    { in: { deger: '373,15', yon: 'k' }, out: { 'Rankine': '671,67 °R', 'Celsius': '100 °C', 'Fahrenheit': '212 °F' } },
    { in: { deger: '300', yon: 'k' }, out: { 'Rankine': '540 °R', 'Celsius': '26,85 °C', 'Fahrenheit': '80,33 °F' } },
    { in: { deger: '100', yon: 'r' }, out: { 'Kelvin': '55,5556 K' } },
    { in: { deger: '0', yon: 'k' }, out: { 'Rankine': '0 °R', 'Celsius': '-273,15 °C', 'Fahrenheit': '-459,67 °F' } },
    { in: { deger: '1', yon: 'k' }, out: { 'Rankine': '1,8 °R' } },
    { in: { deger: '-5', yon: 'k' }, error: true },
    { in: { deger: 'sıcak', yon: 'r' }, error: true },
  ],
  howto: [
    '"Sıcaklık" alanına çevirmek istediğiniz değeri yazın; ondalık için virgül ya da nokta kullanabilirsiniz.',
    '"Çeviri yönü" listesinden kelvinden Rankine\'e mi, Rankine\'den kelvine mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında aynı sıcaklığın Celsius ve Fahrenheit değerleri görünür.',
    'Gerekirse "Sonucu kopyala" ile tüm satırları ödevinize ya da hesap tablonuza aktarın.',
  ],
  sections: [
    { h: 'Kelvin ve Rankine ölçekleri', p: [
      'Kelvin (K), Uluslararası Birim Sistemi\'nin sıcaklık birimidir. Sıfır noktası, bir maddenin ısıl enerjisinin kuramsal olarak en düşük olduğu mutlak sıfırdır; basamak büyüklüğü ise Celsius derecesiyle aynıdır. Bu yüzden suyun donma noktası 273,15 K, kaynama noktası (standart basınçta) 373,15 K olarak yazılır. Kelvin için derece işareti kullanılmaz; "300 K" denir, "300 °K" denmez.',
      'Rankine (°R ya da °Ra), aynı düşüncenin Fahrenheit basamaklarıyla kurulmuş hâlidir. On dokuzuncu yüzyılda İskoç mühendis William Rankine tarafından önerilmiştir. Sıfır noktası yine mutlak sıfırdır, fakat bir Rankine derecesi bir Fahrenheit derecesi kadardır. Günümüzde ağırlıklı olarak ABD\'deki mühendislik uygulamalarında, özellikle termodinamik, yanma, gaz türbini ve soğutma hesaplarında karşımıza çıkar.',
    ] },
    { h: 'Çeviri formülü neden bu kadar basit?', p: [
      'Celsius ile Fahrenheit arasında çevirirken hem çarpma hem de 32 ekleme ya da çıkarma gerekir, çünkü bu iki ölçeğin sıfır noktaları farklıdır. Kelvin ve Rankine ise aynı noktadan, mutlak sıfırdan başlar. Aralarındaki tek fark basamak büyüklüğüdür: bir kelvin, bir Rankine derecesinin 1,8 katıdır. Dolayısıyla <strong>°R = K × 9/5</strong> ve <strong>K = °R × 5/9</strong> eşitlikleri yeterlidir; sabit eklenmez.',
      'Araç ek olarak Celsius ve Fahrenheit karşılıklarını da hesaplar: <strong>°C = K − 273,15</strong> ve <strong>°F = °R − 459,67</strong>. Bu sayılar tanımdan gelir; 273,15 × 1,8 = 491,67 ve 491,67 − 32 = 459,67 olduğu için dört ölçek birbiriyle tutarlıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Oda sıcaklığına yakın 300 K kaç Rankine\'dir? 300 × 1,8 = 540 °R. Aynı sıcaklık 26,85 °C ve 80,33 °F\'tır.',
      '<strong>Örnek 2:</strong> Bir ABD kaynaklı tabloda gaz sıcaklığı 671,67 °R verilmiş. Kelvin karşılığı 671,67 ÷ 1,8 = 373,15 K, yani suyun standart basınçtaki kaynama noktası olan 100 °C\'dir.',
      '<strong>Örnek 3:</strong> 100 °R çok düşük bir sıcaklıktır: 100 ÷ 1,8 = 55,5556 K. Bu, yaklaşık −217,59 °C\'ye karşılık gelir ve sıvı azotun kaynama noktasından bile soğuktur.',
    ] },
    { h: 'Hızlı başvuru tablosu', ul: [
      '<strong>0 K</strong> = 0 °R (mutlak sıfır; −273,15 °C; −459,67 °F)',
      '<strong>77 K</strong> = 138,6 °R (sıvı azotun kaynama noktasına yakın)',
      '<strong>273,15 K</strong> = 491,67 °R (suyun donma noktası; 0 °C; 32 °F)',
      '<strong>293,15 K</strong> = 527,67 °R (20 °C; 68 °F)',
      '<strong>310,15 K</strong> = 558,27 °R (37 °C; 98,6 °F)',
      '<strong>373,15 K</strong> = 671,67 °R (suyun kaynama noktası; 100 °C; 212 °F)',
      '<strong>1.000 K</strong> = 1.800 °R',
    ] },
    { h: 'Mutlak sıcaklık neden gerekir?', p: [
      'Gaz yasaları, ısıl verim ve ışınım formülleri sıcaklığın oranlarıyla çalışır. İdeal gaz denkleminde basınç ile hacmin çarpımı mutlak sıcaklıkla doğru orantılıdır; bir gazı 300 K\'den 600 K\'e ısıtmak sıcaklığını iki katına çıkarmaktır, ama 27 °C\'den 54 °C\'ye ısıtmak iki katına çıkarmak değildir. Carnot verimi, Stefan-Boltzmann yasası ve entropi hesapları da mutlak sıcaklık ister. Metrik birimlerle çalışan biri bu formüllerde kelvin, ABD birimleriyle çalışan biri Rankine kullanır.',
      'Türkiye\'de mühendislik öğrencileri bu çeviriyle en çok İngilizce termodinamik ders kitaplarındaki problemlerde karşılaşır. Buhar tabloları, soğutucu akışkan çizelgeleri ya da yurt dışından gelen bir cihazın teknik belgesi Rankine ve BTU ile hazırlanmış olabilir. Böyle bir tabloyu metrik hesaba taşırken sıcaklığı kelvine çevirmek ilk adımdır.',
    ] },
    { h: 'Sıcaklık farkı ile sıcaklık değeri aynı şey değildir', p: [
      'Bir sıcaklık <em>farkını</em> çevirirken de aynı 1,8 çarpanı kullanılır ve burada hiçbir sabit devreye girmez: 10 K\'lik fark 18 °R\'lik farktır, aynı zamanda 10 °C\'lik ve 18 °F\'lık farktır. Karışıklık genellikle Celsius ya da Fahrenheit değerinin doğrudan 1,8 ile çarpılmasından doğar. 25 °C\'yi Rankine\'e çevirmek için önce 273,15 ekleyip kelvine geçmek, sonra 1,8 ile çarpmak gerekir: (25 + 273,15) × 1,8 = 536,67 °R.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Mutlak sıfırın altında sıcaklık tanımlı olmadığı için araç negatif girdiyi kabul etmez ve bir uyarı gösterir. Eksi bir değer yazma ihtiyacı duyuyorsanız elinizdeki sayı büyük olasılıkla Celsius ya da Fahrenheit cinsindendir. Sonuçlar en fazla dört ondalık basamakla gösterilir; laboratuvar ölçümlerinde termometrenizin belirsizliği genellikle bundan çok daha büyüktür. Rankine simgesi kaynaklara göre °R ya da °Ra olarak yazılır; eski Fransız ölçeği Réaumur de bazen °R ile gösterildiğinden, tarihî belgelerde hangi ölçeğin kastedildiğine bakmak gerekir.',
    ] },
  ],
  faq: [
    ['1 kelvin kaç Rankine\'dir?', '1 K, 1,8 °R\'dir. İki ölçek de mutlak sıfırdan başladığı için çeviride yalnızca bu çarpan kullanılır; ekleme ya da çıkarma yapılmaz.'],
    ['Rankine\'i kelvine nasıl çeviririm?', 'Rankine değerini 1,8\'e bölün ya da 5/9 ile çarpın. Örneğin 540 °R, 540 ÷ 1,8 = 300 K eder.'],
    ['Rankine ile Fahrenheit arasındaki ilişki nedir?', 'Basamak büyüklükleri aynıdır, yalnızca sıfır noktaları farklıdır: °R = °F + 459,67. Kelvin ile Celsius arasındaki ilişkinin Fahrenheit tarafındaki karşılığıdır.'],
    ['Suyun donma ve kaynama noktası kaç Rankine\'dir?', 'Standart basınçta suyun donma noktası 491,67 °R (273,15 K), kaynama noktası 671,67 °R\'dir (373,15 K). Aradaki fark 180 °R\'dir; Fahrenheit ölçeğindeki 32–212 aralığıyla aynı genişliktedir.'],
    ['Negatif kelvin ya da Rankine olur mu?', 'Gündelik ve mühendislik anlamında hayır; mutlak sıfır en düşük sıcaklıktır ve her iki ölçekte 0 ile gösterilir. Bu yüzden araç negatif girdide hata verir.'],
    ['Rankine bugün nerede kullanılıyor?', 'Daha çok ABD\'de, İngiliz birim sistemiyle yapılan termodinamik ve ısı transferi hesaplarında kullanılır. Bilimsel yayınlarda ve Türkiye\'deki uygulamada kelvin esastır.'],
    ['Kelvin yazarken neden derece işareti konmuyor?', 'Kelvin 1960\'lardan beri "derece Kelvin" olarak değil, doğrudan birim adı olarak kullanılır; bu yüzden 300 K yazılır. Rankine için ise derece işareti yaygın olarak korunur: 540 °R.'],
    ['Girdiğim sıcaklık değeri saklanıyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; yazdığınız değer sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['celsius-kelvin-cevir', 'fahrenheit-kelvin-cevir', 'celsius-fahrenheit-cevir', 'ideal-gaz-denklemi-hesapla', 'isi-enerjisi-hesapla'],
};
