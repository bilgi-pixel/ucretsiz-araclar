export default {
  slug: 'ses-hizi-hesapla',
  title: 'Ses Hızı Hesaplama',
  h1Tail: 'havada sıcaklığa göre',
  pageTitle: 'Ses Hızı Hesaplama – Sıcaklığa Göre Havada Ses Hızı (m/s, km/sa)',
  description: 'Hava sıcaklığına göre ses hızını m/s ve km/sa olarak hesaplayın. Süre girerek sesin aldığı yolu (şimşek, yankı), frekans girerek dalga boyunu da bulun.',
  card: 'Hava sıcaklığından ses hızını bulun; şimşek ya da yankı süresinden uzaklığı, frekanstan dalga boyunu hesaplayın.',
  category: 'bilim',
  keywords: ['ses hızı hesaplama', 'ses hızı kaç m/s', 'sıcaklığa göre ses hızı', 'ses hızı formülü', 'şimşek mesafesi hesaplama', 'yankı mesafesi', 'ses hızı km/sa', 'havada ses hızı'],
  lead: 'Kuru havada ses hızı sıcaklığa bağlıdır ve <strong>v = 331,3 · √(1 + T/273,15)</strong> bağıntısıyla hesaplanır. Sıcaklığı yazın; isterseniz süre ve frekans ekleyerek sesin aldığı yolu ve dalga boyunu da görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'sicaklik', label: 'Hava sıcaklığı (°C)', type: 'number', value: '20', placeholder: 'Örn. 20' },
    { id: 'sure', label: 'Süre (s) – isteğe bağlı', type: 'number', placeholder: 'Örn. 3', hint: 'Şimşek ile gök gürültüsü arasındaki ya da sesin gidiş süresi. Yazarsanız alınan yol hesaplanır.' },
    { id: 'frekans', label: 'Frekans (Hz) – isteğe bağlı', type: 'number', placeholder: 'Örn. 440', hint: 'Yazarsanız bu sıcaklıktaki dalga boyu hesaplanır.' },
  ],
  compute(v, h) {
    const T = h.num(v.sicaklik, 'Hava sıcaklığı');
    if (T <= -273.15) h.err('Sıcaklık mutlak sıfırın (−273,15 °C) üzerinde olmalı.');
    if (T > 1000) h.err('Bu formül çok yüksek sıcaklıklar için uygun değil; 1000 °C ya da altında bir değer yazın.');
    const hiz = 331.3 * Math.sqrt(1 + T / 273.15);
    const rows = [
      ['Ses hızı', h.fmt(hiz, 2) + ' m/s'],
      ['Ses hızı (km/sa)', h.fmt(hiz * 3.6, 1) + ' km/sa'],
      ['Doğrusal yaklaşımla', h.fmt(331.3 + 0.606 * T, 2) + ' m/s'],
      ['1 km için geçen süre', h.fmt(1000 / hiz, 2) + ' s'],
    ];
    if (String(v.sure ?? '').trim() !== '') {
      const t = h.nonneg(v.sure, 'Süre');
      rows.push(['Alınan yol', h.fmt(hiz * t, 1) + ' m']);
      rows.push(['Yankı için engel uzaklığı', h.fmt(hiz * t / 2, 1) + ' m']);
    }
    if (String(v.frekans ?? '').trim() !== '') {
      const f = h.pos(v.frekans, 'Frekans');
      rows.push(['Dalga boyu', h.fmt(hiz / f, 4) + ' m']);
    }
    return {
      rows,
      note: 'Kuru hava için ideal gaz yaklaşımı kullanılır. Nem hızı çok az artırır; basıncın gündelik koşullarda etkisi ihmal edilir.',
    };
  },
  cases: [
    { in: { sicaklik: '20' }, out: { 'Ses hızı': '343,21 m/s', 'Ses hızı (km/sa)': '1.235,6 km/sa', 'Doğrusal yaklaşımla': '343,42 m/s' } },
    { in: { sicaklik: '0' }, out: { 'Ses hızı': '331,3 m/s', 'Ses hızı (km/sa)': '1.192,7 km/sa' } },
    { in: { sicaklik: '20', sure: '3' }, out: { 'Alınan yol': '1.029,6 m', 'Yankı için engel uzaklığı': '514,8 m' } },
    { in: { sicaklik: '25', frekans: '440' }, out: { 'Ses hızı': '346,13 m/s', 'Dalga boyu': '0,7867 m' } },
    { in: { sicaklik: '-10' }, out: { 'Ses hızı': '325,18 m/s', 'Doğrusal yaklaşımla': '325,24 m/s' } },
    { in: { sicaklik: '15' }, out: { 'Ses hızı': '340,28 m/s', 'Ses hızı (km/sa)': '1.225 km/sa' } },
    { in: { sicaklik: '35', sure: '0' }, out: { 'Ses hızı': '351,89 m/s', 'Alınan yol': '0 m' } },
    { in: { sicaklik: 'sıcak' }, error: true },
    { in: { sicaklik: '-300' }, error: true },
    { in: { sicaklik: '20', frekans: '0' }, error: true },
  ],
  howto: [
    'Hava sıcaklığını santigrat derece olarak yazın. Sıfırın altındaki değerler için başına eksi işareti koyun.',
    'Sesin belirli bir sürede ne kadar yol aldığını öğrenmek istiyorsanız süreyi saniye olarak ekleyin; örneğin şimşeği gördükten sonra gök gürültüsünü duyana kadar saydığınız saniyeyi.',
    'Belirli bir frekanstaki sesin dalga boyunu görmek istiyorsanız frekansı hertz olarak yazın. Bu iki alan isteğe bağlıdır, boş bırakılabilir.',
    '"Hesapla" düğmesine basın. Ses hızı m/s ve km/sa olarak, doğrusal yaklaşım değeri ve varsa mesafe ile dalga boyu sonuçlarıyla birlikte listelenir.',
  ],
  sections: [
    { h: 'Ses hızı neye bağlıdır?', p: [
      'Ses, ortamdaki taneciklerin titreşimlerini komşularına aktarmasıyla yayılan mekanik bir dalgadır; bu yüzden boşlukta yayılamaz ve hızı içinde ilerlediği ortamın özelliklerine bağlıdır. Havada ses hızını belirleyen başlıca etken <strong>sıcaklıktır</strong>. Sıcak havada moleküller daha hızlı hareket ettiğinden titreşim daha çabuk aktarılır ve ses hızlanır.',
      'Yaygın bir yanılgının aksine, gündelik koşullarda hava basıncının ses hızına doğrudan etkisi yok denecek kadar azdır; çünkü basınç artarken yoğunluk da aynı oranda artar ve etkiler birbirini götürür. Yüksek irtifada sesin yavaşlamasının nedeni basıncın düşmesi değil, havanın soğumasıdır. Nem ise hızı bir miktar artırır, ancak etkisi sıcaklığa kıyasla küçüktür ve bu araçta hesaba katılmaz.',
    ] },
    { h: 'Ses hızı formülü', p: [
      'İdeal gaz kabulüyle kuru havadaki ses hızı mutlak sıcaklığın karekökü ile orantılıdır. Santigrat derece cinsinden yazıldığında bağıntı şöyledir: <strong>v = 331,3 · √(1 + T ÷ 273,15)</strong>. Buradaki 331,3 m/s, 0 °C\'deki ses hızıdır; T ise santigrat sıcaklıktır.',
      'Gündelik sıcaklık aralığında bu eğri neredeyse doğrusaldır ve çoğu ders kitabında <strong>v ≈ 331,3 + 0,606 · T</strong> yaklaşımı verilir: sıcaklık her 1 °C arttığında ses yaklaşık 0,6 m/s hızlanır. Araç iki değeri de gösterir; −20 ile 40 °C arasında aralarındaki fark 1 m/s\'nin altındadır, uç sıcaklıklarda ise karekök formülü daha doğrudur.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 20 °C sıcaklıkta v = 331,3 × √(1 + 20 ÷ 273,15) = 331,3 × √1,07322 ≈ 343,21 m/s bulunur. Saatteki karşılığı 343,21 × 3,6 ≈ 1.235,6 km/sa\'tir. Doğrusal yaklaşım 331,3 + 0,606 × 20 = 343,42 m/s verir.',
      '<strong>Örnek 2 (şimşek):</strong> Şimşeği gördükten 3 saniye sonra gök gürültüsünü duydunuz ve hava 20 °C. Işık neredeyse anında ulaştığı için aradaki süre sesin yolculuk süresidir: 343,21 × 3 ≈ 1.029,6 m. Yıldırım yaklaşık 1 kilometre uzağa düşmüştür. Pratik kural olarak her 3 saniye yaklaşık 1 kilometredir.',
      '<strong>Örnek 3 (yankı):</strong> Bir kayalığa doğru bağırdınız ve sesiniz 3 saniye sonra geri geldi. Ses gidip döndüğü için kayalığın uzaklığı alınan yolun yarısıdır: 1.029,6 ÷ 2 ≈ 514,8 m.',
      '<strong>Örnek 4:</strong> 25 °C\'de ses hızı yaklaşık 346,13 m/s\'dir. 440 Hz\'lik la notasının bu sıcaklıktaki dalga boyu 346,13 ÷ 440 ≈ 0,7867 m olur.',
    ] },
    { h: 'Sıcaklığa göre ses hızı tablosu', ul: [
      '<strong>−20 °C:</strong> yaklaşık 318,94 m/s',
      '<strong>−10 °C:</strong> yaklaşık 325,18 m/s',
      '<strong>0 °C:</strong> 331,3 m/s',
      '<strong>15 °C:</strong> yaklaşık 340,28 m/s',
      '<strong>20 °C:</strong> yaklaşık 343,21 m/s',
      '<strong>30 °C:</strong> yaklaşık 349,02 m/s',
      '<strong>40 °C:</strong> yaklaşık 354,73 m/s',
    ] },
    { h: 'Diğer ortamlarda ses', p: [
      'Ses sıvılarda ve katılarda havadakinden çok daha hızlı yayılır, çünkü bu ortamlarda tanecikler birbirine daha sıkı bağlıdır. Suda ses hızı kabaca saniyede bir buçuk kilometre, çelikte ise saniyede beş kilometre dolayındadır; kesin değerler sıcaklığa, tuzluluğa ve malzemenin bileşimine göre değişir. Tren raylarına kulağını dayayan birinin treni havadan gelen sesten önce duyması bu farkın sonucudur. Bu araç yalnızca hava için hesap yapar; başka bir ortamdaki hızı biliyorsanız dalga boyu ve frekans hesabını ilgili araçla yapabilirsiniz.',
    ] },
    { h: 'Mach sayısı ve ses duvarı', p: [
      'Bir cismin hızının bulunduğu ortamdaki ses hızına oranına Mach sayısı denir. Mach 1, ses hızına eşit hız demektir; ancak bu sabit bir km/sa değeri değildir. Yer seviyesinde 20 °C\'de Mach 1 yaklaşık 1.235,6 km/sa iken, havanın çok soğuk olduğu yüksek irtifalarda belirgin biçimde daha düşüktür. Bir uçağın Mach sayısını bulmak için hızını o sıcaklıktaki ses hızına bölmeniz yeterlidir.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Formül kuru hava ve ideal gaz davranışı varsayar. Nemli havada gerçek hız biraz daha yüksek çıkar; fark sıcak ve çok nemli ortamlarda bile genellikle yüzde bir düzeyini aşmaz. Rüzgâr, sesin yere göre hızını rüzgâr yönünde artırır, karşı yönde azaltır; araç durgun hava için hesap yapar. Şimşek ve yankı hesaplarında süreyi elle saymak yarım saniyelik hatayı kolayca getirir; bu da yaklaşık 170 metrelik belirsizlik demektir. Sonuçları yaklaşık kabul edin; fırtınada güvenli mesafe gibi kararları yalnızca bu tahmine dayandırmayın.',
    ] },
  ],
  faq: [
    ['Ses hızı kaç m/s\'dir?', 'Havada 20 °C sıcaklıkta yaklaşık 343 m/s, yani saatte yaklaşık 1.235 kilometredir. 0 °C\'de 331,3 m/s\'ye düşer. Sabit tek bir değer yoktur; sıcaklığa göre değişir.'],
    ['Sıcaklık arttıkça ses neden hızlanır?', 'Sıcak havada moleküller daha hızlı hareket eder ve titreşimi komşularına daha çabuk iletir. Hız mutlak sıcaklığın karekökü ile orantılıdır; gündelik aralıkta her 1 °C için yaklaşık 0,6 m/s artar.'],
    ['Şimşekten yıldırımın uzaklığını nasıl bulurum?', 'Şimşeği gördüğünüz an ile gök gürültüsünü duyduğunuz an arasındaki saniyeyi sayın ve süre alanına yazın. Kabaca her 3 saniye 1 kilometreye karşılık gelir.'],
    ['Yankıdan uzaklık nasıl hesaplanır?', 'Ses engele gidip geri döndüğü için toplam yolun yarısı alınır. Araç, süre girdiğinizde "Yankı için engel uzaklığı" satırında bu değeri verir.'],
    ['Ses hızı basınca bağlı mıdır?', 'İdeal gaz yaklaşımında sabit sıcaklıkta basınç değişimi ses hızını etkilemez; çünkü basınçla birlikte yoğunluk da aynı oranda değişir. Yüksekte sesin yavaşlaması soğuktan kaynaklanır.'],
    ['Nem ses hızını etkiler mi?', 'Evet, ama az. Nemli hava kuru havadan biraz daha hafiftir ve ses içinde biraz daha hızlı yayılır. Bu araç kuru hava için hesap yapar; nemli ortamda gerçek değer çok az yüksek olur.'],
    ['Ses boşlukta yayılır mı?', 'Hayır. Ses mekanik bir dalgadır ve titreşecek bir ortama ihtiyaç duyar. Uzay boşluğunda ses iletilmez; ışık ve radyo dalgaları ise ortam olmadan yayılabilir.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızın içinde yapılır; sıcaklık, süre ve frekans değerleri hiçbir yere gönderilmez.'],
  ],
  related: ['dalga-boyu-frekans-hesapla', 'doppler-etkisi-hesapla', 'ses-siddeti-hesapla', 'isik-siddeti-mesafe-hesapla'],
};
