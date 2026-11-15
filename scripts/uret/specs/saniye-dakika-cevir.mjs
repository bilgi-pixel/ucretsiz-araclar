export default {
  slug: 'saniye-dakika-cevir',
  title: 'Saniye Dakika Çevirici',
  h1Tail: 'sn ↔ dk',
  pageTitle: 'Saniye Dakika Çevirici – Saniyeyi Dakikaya, Dakikayı Saniyeye Çevirme',
  description: 'Saniyeyi dakikaya, dakikayı saniyeye çevirin. Ondalık dakika değerinin yanında "2 dk 30 sn" gösterimini, saat karşılığını ve SS:DD:SN biçimini de verir.',
  card: 'Saniyeyi dakikaya, dakikayı saniyeye çevirin; dakika-saniye ayrımı ve saat karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['saniye dakika çevirme', '1 dakika kaç saniye', 'saniye kaç dakika', 'dakika saniye hesaplama', '90 saniye kaç dakika', 'saniyeyi dakikaya çevirme', 'dakikayı saniyeye çevirme'],
  lead: 'Saniye cinsinden bir süreyi dakikaya ya da dakikayı saniyeye çevirin. Araç <strong>1 dakika = 60 saniye</strong> eşitliğini kullanır; sonucu hem ondalık dakika hem de "dakika ve saniye" olarak ayrı ayrı gösterir, böylece 2,5 dakikanın 2 dakika 30 saniye olduğunu tek bakışta görürsünüz.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Süre', type: 'number', placeholder: 'Örn. 150' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['sn', 'Saniye → Dakika'], ['dk', 'Dakika → Saniye']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Süre');
    const sn = v.yon === 'dk' ? x * 60 : x;
    const dk = sn / 60;
    const s = Math.round(sn * 1000) / 1000;
    const tamDk = Math.floor(s / 60);
    const kalan = s - tamDk * 60;
    const t = Math.round(sn);
    const p = (n) => String(n).padStart(2, '0');
    const sa = Math.floor(t / 3600);
    const bicim = `${p(sa)}:${p(Math.floor((t - sa * 3600) / 60))}:${p(t % 60)}`;
    const rDk = ['Dakika', h.fmt(dk, 6) + ' dakika'];
    const rSn = ['Saniye', h.fmt(sn, 4) + ' saniye'];
    return {
      rows: [
        ...(v.yon === 'dk' ? [rSn, rDk] : [rDk, rSn]),
        ['Dakika ve saniye', `${h.fmt(tamDk, 0)} dk ${h.fmt(kalan, 3)} sn`],
        ['Saat', h.fmt(sn / 3600, 6) + ' saat'],
        ['Süre biçimi (SS:DD:SN)', bicim],
      ],
      note: '1 dakika = 60 saniye. Süre biçimi satırı en yakın tam saniyeye yuvarlanır.',
    };
  },
  cases: [
    { in: { deger: '150', yon: 'sn' }, out: { 'Dakika': '2,5 dakika', 'Dakika ve saniye': '2 dk 30 sn', 'Süre biçimi (SS:DD:SN)': '00:02:30' } },
    { in: { deger: '90', yon: 'dk' }, out: { 'Saniye': '5.400 saniye', 'Saat': '1,5 saat', 'Süre biçimi (SS:DD:SN)': '01:30:00' } },
    { in: { deger: '3600', yon: 'sn' }, out: { 'Dakika': '60 dakika', 'Saat': '1 saat' } },
    { in: { deger: '45', yon: 'sn' }, out: { 'Dakika': '0,75 dakika', 'Dakika ve saniye': '0 dk 45 sn' } },
    { in: { deger: '100', yon: 'sn' }, out: { 'Dakika': '1,666667 dakika', 'Dakika ve saniye': '1 dk 40 sn' } },
    { in: { deger: '1,25', yon: 'dk' }, out: { 'Saniye': '75 saniye', 'Dakika ve saniye': '1 dk 15 sn' } },
    { in: { deger: '1', yon: 'dk' }, out: { 'Saniye': '60 saniye' } },
    { in: { deger: 'bir', yon: 'sn' }, error: true },
    { in: { deger: '-30', yon: 'sn' }, error: true },
  ],
  howto: [
    '"Süre" alanına saniye ya da dakika cinsinden değeri yazın. Kesirli süreler için virgül kullanabilirsiniz (örneğin 2,5).',
    '"Çeviri yönü" listesinden saniyeden dakikaya mı, dakikadan saniyeye mi geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satır doğrudan çeviri sonucudur; "Dakika ve saniye" satırı aynı süreyi tam dakika ve artan saniye olarak verir.',
    'Süreyi bir tabloya ya da video düzenleme programına yazacaksanız "Süre biçimi" satırındaki SS:DD:SN gösterimini kopyalayabilirsiniz.',
  ],
  sections: [
    { h: 'Saniye dakikaya nasıl çevrilir?', p: [
      'Bir dakika altmış saniyedir. Bu yüzden saniyeden dakikaya geçmek için değeri 60\'a bölersiniz: <strong>dakika = saniye ÷ 60</strong>. Dakikadan saniyeye geçmek içinse 60 ile çarparsınız: <strong>saniye = dakika × 60</strong>.',
      'Çözümlü örnek: 150 saniye kaç dakikadır? 150 ÷ 60 = 2,5 dakika. Bölmenin tam kısmı 2 dakikadır; kalan 150 − 2 × 60 = 30 saniyedir. Yani 150 saniye = 2 dakika 30 saniye. Tersine bir örnek: 90 dakikalık bir maç 90 × 60 = 5.400 saniye sürer; bu da 1,5 saate eşittir.',
    ] },
    { h: 'Ondalık dakika ile dakika-saniye aynı şey değildir', p: [
      'En sık yapılan hata, ondalık kısmı saniye sanmaktır. 2,5 dakika, 2 dakika 50 saniye değil, 2 dakika 30 saniyedir; çünkü virgülden sonraki 0,5 "yarım dakika" demektir. Ondalık kısmı saniyeye çevirmek için 60 ile çarpmak gerekir: 0,5 × 60 = 30 saniye, 0,25 × 60 = 15 saniye, 0,75 × 60 = 45 saniye, 0,1 × 60 = 6 saniye.',
      'Aynı tuzak ters yönde de geçerlidir. 1 dakika 40 saniye, 1,40 dakika değildir; 40 saniye 40 ÷ 60 = 0,666667 dakika ettiğinden doğru değer 1,666667 dakikadır. Zaman onluk değil altmışlık sistemle sayıldığı için hesap makinesinde süre toplarken önce her şeyi saniyeye çevirmek, sonunda yeniden dakikaya dönmek en güvenli yoldur. Araç iki gösterimi de verdiği için hangisine ihtiyacınız varsa onu kullanabilirsiniz.',
    ] },
    { h: 'Sık kullanılan karşılıklar', ul: [
      '<strong>15 saniye</strong> = 0,25 dakika',
      '<strong>30 saniye</strong> = 0,5 dakika',
      '<strong>45 saniye</strong> = 0,75 dakika',
      '<strong>90 saniye</strong> = 1,5 dakika (1 dk 30 sn)',
      '<strong>120 saniye</strong> = 2 dakika',
      '<strong>300 saniye</strong> = 5 dakika',
      '<strong>600 saniye</strong> = 10 dakika',
      '<strong>900 saniye</strong> = 15 dakika',
      '<strong>1.800 saniye</strong> = 30 dakika',
      '<strong>3.600 saniye</strong> = 60 dakika = 1 saat',
    ] },
    { h: 'Kullanım alanları', p: [
      'Spor ve antrenmanda dinlenme araları saniyeyle, toplam süre dakikayla konuşulur: 8 set arasında 75\'er saniye dinlenirseniz toplam 600 saniye, yani 10 dakika dinlenmiş olursunuz. Koşu ve yüzme derecelerini karşılaştırırken dakika-saniye biçimindeki süreleri saniyeye çevirmek farkı görmeyi kolaylaştırır; 4 dakika 35 saniye 275 saniyedir.',
      'Mutfakta tariflerdeki "90 saniye mikrodalgada ısıtın" ifadesi, dakikayla ayarlanan cihazlarda 1 dakika 30 saniye olarak girilir. Video ve ses düzenlemede klip uzunlukları saniye olarak görünür; 215 saniyelik bir parça 3 dakika 35 saniyedir. Sunum provasında konuşma süresi, sınavlarda soru başına düşen zaman, çağrı merkezlerinde ortalama görüşme süresi de bu çeviriyi gerektirir. Yazılım tarafında zaman aşımı ayarları çoğunlukla saniye cinsinden istenir; 15 dakikalık bir oturum süresi için 900 yazmanız gerekir.',
    ] },
    { h: 'Saniyenin tanımı ve altmışlık sistem', p: [
      'Saniye, Uluslararası Birimler Sistemi\'nin temel zaman birimidir ve sezyum atomunun belirli bir geçişine ait ışınımın periyodu üzerinden tanımlanır. Dakika ve saat ise SI\'nin temel birimleri değildir, ancak SI ile birlikte kullanılması kabul edilen birimlerdir. Bir saatin 60 dakikaya, bir dakikanın 60 saniyeye bölünmesi çok eski bir geleneğe, altmış tabanlı sayma düzenine dayanır. Altmış sayısının 2, 3, 4, 5, 6, 10, 12, 15, 20 ve 30\'a kalansız bölünebilmesi, sürelerin yarısını, üçte birini ya da çeyreğini tam sayı olarak ifade etmeyi kolaylaştırır.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif süre kabul etmez. Dakika değeri en fazla altı, saniye değeri en fazla dört ondalık basamakla gösterilir. "Süre biçimi" satırında süre en yakın tam saniyeye yuvarlanır ve saat kısmı 24\'ü aşsa bile gün olarak ayrılmaz; örneğin 100.000 saniye 27:46:40 olarak yazılır. Dakikanın her zaman 60 saniye sayıldığı varsayılır; resmî saat ölçümünde nadiren eklenen artık saniye gibi özel durumlar hesaba katılmaz.',
    ] },
  ],
  faq: [
    ['1 dakika kaç saniyedir?', '1 dakika 60 saniyedir. Buna göre 5 dakika 300, 10 dakika 600, 60 dakika 3.600 saniye eder.'],
    ['1 saniye kaç dakikadır?', '1 saniye, 1 ÷ 60 = 0,016667 dakikadır. Altmış saniye bir araya geldiğinde bir dakika olur.'],
    ['90 saniye kaç dakika eder?', '90 saniye 1,5 dakikadır; dakika ve saniye olarak 1 dakika 30 saniye diye söylenir.'],
    ['2,5 dakika kaç saniyedir?', '2,5 × 60 = 150 saniyedir. Bu süre 2 dakika 30 saniyeye eşittir; 2 dakika 50 saniye değildir.'],
    ['Dakika ve saniyeyi birlikte nasıl saniyeye çeviririm?', 'Dakikayı 60 ile çarpıp saniyeyi ekleyin. Örneğin 3 dakika 20 saniye, 3 × 60 + 20 = 200 saniyedir. Araçta bunun için 3 dakika 20 saniyeyi ondalık olarak 3,333333 yazmak yerine doğrudan 200 saniyeyi dakikaya çevirerek sonucu doğrulayabilirsiniz.'],
    ['1 saat kaç saniyedir?', '1 saat 60 dakika, her dakika 60 saniye olduğundan 60 × 60 = 3.600 saniyedir. Bir gün 86.400 saniye eder.'],
    ['Saniyenin kısaltması nedir?', 'Türkçede saniye "sn", dakika "dk", saat "sa" olarak kısaltılır. Uluslararası birim simgeleri ise sırasıyla s, min ve h\'dir.'],
    ['Yazdığım süre bir yere kaydediliyor mu?', 'Hayır. Çeviri yalnızca tarayıcınızda yapılır; girdiğiniz değer sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['saat-dakika-cevir', 'gun-saat-cevir', 'milisaniye-saniye-cevir', 'ondalik-saat-cevir', 'kronometre', 'saat-hesapla'],
};
