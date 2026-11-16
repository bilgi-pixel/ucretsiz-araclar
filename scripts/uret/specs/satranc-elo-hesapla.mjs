export default {
  slug: 'satranc-elo-hesapla',
  title: 'Elo Puanı Hesaplama',
  h1Tail: 'satranç reyting değişimi',
  pageTitle: 'Elo Puanı Hesaplama – Satranç Reyting (Rating) Değişimi',
  description: 'Kendi Elo puanınızı, rakibinizin puanını ve maç sonucunu girerek beklenen skoru, puan değişimini ve yeni reytinginizi K katsayısına göre hesaplayın.',
  card: 'Satranç maçından sonra Elo puanınızın kaç puan artacağını ya da düşeceğini, beklenen skorla birlikte hesaplayın.',
  category: 'gunluk',
  keywords: ['elo hesaplama', 'elo puanı hesaplama', 'satranç rating hesaplama', 'elo kaç puan artar', 'k katsayısı satranç', 'beklenen skor elo', 'ukd elo hesaplama'],
  lead: 'Bir satranç maçının ardından <strong>Elo puanınızın nasıl değişeceğini</strong> hesaplayın. Araç iki oyuncunun puan farkından beklenen skoru bulur, gerçek sonuçla karşılaştırır ve seçtiğiniz K katsayısına göre yeni puanınızı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'puan', label: 'Sizin puanınız', type: 'number', placeholder: 'Örn. 1500' },
    { id: 'rakip', label: 'Rakibin puanı', type: 'number', placeholder: 'Örn. 1600' },
    { id: 'sonuc', label: 'Maç sonucu', type: 'select', options: [['1', 'Kazandım (1)'], ['0.5', 'Berabere (½)'], ['0', 'Kaybettim (0)']] },
    { id: 'k', label: 'K katsayısı', type: 'select', options: [['20', 'K = 20 (2400 altı oyuncular)'], ['40', 'K = 40 (yeni oyuncular; 18 yaş altı ve 2300 altı)'], ['10', 'K = 10 (2400 ve üzerine ulaşmış oyuncular)'], ['32', 'K = 32 (birçok çevrim içi sistem ve kulüp)'], ['16', 'K = 16'], ['24', 'K = 24']] },
  ],
  compute(v, h) {
    const ra = h.nonneg(v.puan, 'Sizin puanınız');
    const rb = h.nonneg(v.rakip, 'Rakibin puanı');
    if (ra > 4000 || rb > 4000) h.err('Puan 4000\'den büyük olamaz; Elo puanını yazdığınızdan emin olun (örn. 1500).');
    const s = Number(v.sonuc);
    if (![0, 0.5, 1].includes(s)) h.err('Maç sonucunu listeden seçin.');
    const k = Number(v.k);
    if (!(k > 0 && k <= 100)) h.err('K katsayısını listeden seçin.');
    const beklenen = 1 / (1 + Math.pow(10, (rb - ra) / 400));
    const degisim = k * (s - beklenen);
    const isaretli = (x, d) => {
      const r = Number(x.toFixed(d));
      return (r > 0 ? '+' : r < 0 ? '-' : '') + h.fmt(Math.abs(r), d);
    };
    return {
      rows: [
        ['Yeni puanınız', h.fmt(ra + degisim, 1).replace(/\./g, '')],
        ['Puan değişimi', isaretli(degisim, 2)],
        ['Beklenen skorunuz', h.fmt(beklenen, 3) + ' (%' + h.fmt(beklenen * 100, 1) + ')'],
        ['Rakibin beklenen skoru', h.fmt(1 - beklenen, 3) + ' (%' + h.fmt((1 - beklenen) * 100, 1) + ')'],
        ['Puan farkı', isaretli(ra - rb, 0)],
        ['Kazanırsanız / berabere / kaybederseniz', isaretli(k * (1 - beklenen), 2) + ' / ' + isaretli(k * (0.5 - beklenen), 2) + ' / ' + isaretli(k * (0 - beklenen), 2)],
      ],
      note: 'Araç lojistik Elo formülünü yuvarlamadan uygular. Resmî listelerde beklenen skor tablodan okunur, büyük puan farkları sınırlandırılır ve değişimler dönem sonunda yuvarlanır; bu yüzden küçük farklar olabilir. Uluslararası federasyon kurallarında 400 puandan büyük farklar 400 sayılır ve bir dönemdeki oyun sayısı çok olduğunda K düşürülür; araç bu iki sınırı uygulamaz.',
    };
  },
  cases: [
    { in: { puan: '1500', rakip: '1500', sonuc: '1', k: '20' }, out: { 'Yeni puanınız': '1510', 'Puan değişimi': '+10', 'Beklenen skorunuz': '0,5 (%50)', 'Puan farkı': '0' } },
    { in: { puan: '1600', rakip: '1200', sonuc: '0', k: '20' }, out: { 'Yeni puanınız': '1581,8', 'Puan değişimi': '-18,18', 'Beklenen skorunuz': '0,909 (%90,9)', 'Puan farkı': '+400' } },
    { in: { puan: '1600', rakip: '1200', sonuc: '1', k: '20' }, out: { 'Yeni puanınız': '1601,8', 'Puan değişimi': '+1,82' } },
    { in: { puan: '1800', rakip: '2000', sonuc: '1', k: '10' }, out: { 'Yeni puanınız': '1807,6', 'Puan değişimi': '+7,6', 'Beklenen skorunuz': '0,24 (%24)', 'Rakibin beklenen skoru': '0,76 (%76)' } },
    { in: { puan: '1400', rakip: '1600', sonuc: '0.5', k: '40' }, out: { 'Yeni puanınız': '1410,4', 'Puan değişimi': '+10,39', 'Puan farkı': '-200' } },
    { in: { puan: '1500', rakip: '1500', sonuc: '0.5', k: '32' }, out: { 'Yeni puanınız': '1500', 'Puan değişimi': '0', 'Kazanırsanız / berabere / kaybederseniz': '+16 / 0 / -16' } },
    { in: { puan: 'bin beş yüz', rakip: '1500' }, error: true },
    { in: { puan: '-100', rakip: '1500' }, error: true },
    { in: { puan: '1500', rakip: '15000' }, error: true },
  ],
  howto: [
    'Maçtan önceki kendi puanınızı ve rakibinizin puanını ilgili alanlara yazın.',
    'Maçın sonucunu seçin: galibiyet 1, beraberlik yarım, mağlubiyet 0 puan sayılır.',
    'Size uygulanan K katsayısını seçin. Emin değilseniz oynadığınız federasyonun ya da platformun kurallarına bakın.',
    '"Hesapla" düğmesine basın; yeni puanınızı, kazandığınız ya da kaybettiğiniz puanı ve maç öncesi beklenen skoru görün.',
    'Son satırdaki üçlü, aynı rakibe karşı üç olası sonucun her birinde puanınızın ne kadar değişeceğini gösterir; maça çıkmadan önce bakmak için kullanışlıdır.',
  ],
  sections: [
    { h: 'Elo sistemi nasıl çalışır?', p: [
      'Elo sistemi, adını fizikçi ve satranç ustası Arpad Elo\'dan alan bir güç ölçme yöntemidir. Temel fikir basittir: her oyuncunun bir puanı vardır ve iki oyuncunun puan farkı, maçtan beklenen sonucu belirler. Oyuncu beklenenden iyi sonuç alırsa puanı artar, beklenenden kötü sonuç alırsa düşer. Bir oyuncunun kazandığı puan, aynı K katsayısı uygulanıyorsa rakibinin kaybettiği puana eşittir.',
      'Sistemin güzelliği, sonucu rakibin gücüne göre tartmasıdır. Kendinizden çok güçlü birini yenmek büyük ödül getirir; çok zayıf birini yenmek neredeyse hiç puan kazandırmaz, ona yenilmek ise pahalıya patlar. Satranç dışında masa tenisi, e-spor, tavla ve çevrim içi oyunların eşleştirme sistemlerinde de aynı mantık kullanılır.',
    ] },
    { h: 'Formül', p: [
      'Beklenen skor şu eşitlikle bulunur: <strong>E = 1 ÷ (1 + 10<sup>(rakip puanı − sizin puanınız) ÷ 400</sup>)</strong>. Sonuç 0 ile 1 arasında bir sayıdır ve galibiyet olasılığı ile beraberlik olasılığının yarısının toplamı gibi okunabilir. Puanlar eşitse E = 0,5 olur. 200 puan üstün oyuncunun beklenen skoru yaklaşık 0,76, 400 puan üstün oyuncununki yaklaşık 0,91\'dir.',
      'Yeni puan ise şöyle hesaplanır: <strong>yeni puan = eski puan + K × (S − E)</strong>. Burada S gerçek sonuçtur (1, 0,5 ya da 0), K ise bir maçın puanı en fazla ne kadar oynatabileceğini belirleyen katsayıdır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Eşit rakip:</strong> 1500 puanlı iki oyuncu karşılaşıyor, K = 20. Beklenen skor 0,5\'tir. Kazanan 20 × (1 − 0,5) = 10 puan alır ve 1510\'a çıkar; kaybeden 1490\'a iner. Berabere biterse kimsenin puanı değişmez.',
      '<strong>Güçlü rakibi yenmek:</strong> 1800 puanlı oyuncu 2000 puanlı rakibini yeniyor, K = 10. Üs (2000 − 1800) ÷ 400 = 0,5; 10<sup>0,5</sup> yaklaşık 3,162 olduğundan E = 1 ÷ 4,162 = 0,240 bulunur. Değişim 10 × (1 − 0,240) = +7,6 puandır; yeni puan 1807,6 olur.',
      '<strong>Favorinin kaybı:</strong> 1600 puanlı oyuncu 1200 puanlı rakibine yeniliyor, K = 20. Beklenen skoru 10 ÷ 11 = 0,909\'dur. Değişim 20 × (0 − 0,909) = −18,18 puan eder. Aynı maçı kazansaydı yalnızca 1,82 puan alacaktı.',
    ] },
    { h: 'K katsayısı nasıl seçilir?', p: [
      'K büyüdükçe puan daha hızlı hareket eder. Uluslararası federasyonun standart tempolu oyunlar için uyguladığı düzen genel hatlarıyla şöyledir: listeye yeni giren oyuncular belirli bir maç sayısını tamamlayana kadar ve genç oyuncular belli bir puan düzeyine kadar K = 40 ile, 2400\'ün altındaki diğer oyuncular K = 20 ile, bir kez 2400\'e ulaşmış oyuncular ise kalıcı olarak K = 10 ile değerlendirilir. Bunun mantığı, gerçek gücü henüz belli olmayan oyuncunun puanını hızla yerine oturtmak, üst düzeyde ise listeyi kararlı tutmaktır.',
      'Ulusal puan sistemleri (Türkiye\'de UKD gibi), okul ve kulüp turnuvaları ile çevrim içi platformlar kendi katsayılarını ve ek kurallarını kullanabilir. Çevrim içi sitelerin çoğu aslında Elo\'nun geliştirilmiş türevlerini uygular; bu sistemlerde puanın belirsizliği de hesaba katıldığı için değişim burada bulduğunuzdan farklı çıkabilir. Kesin değer için ilgili kurumun güncel yönergesine bakılmalıdır.',
    ] },
    { h: 'Puan farkı ve beklenen skor tablosu', ul: [
      'Fark <strong>0</strong>: beklenen skor 0,50',
      'Fark <strong>50</strong>: güçlü oyuncu için yaklaşık 0,57',
      'Fark <strong>100</strong>: yaklaşık 0,64',
      'Fark <strong>200</strong>: yaklaşık 0,76',
      'Fark <strong>300</strong>: yaklaşık 0,85',
      'Fark <strong>400</strong>: yaklaşık 0,91',
    ] },
    { h: 'Resmî hesapla arasındaki farklar', p: [
      'Bu sayfa formülü tek bir maç için ve yuvarlamadan uygular. Resmî reyting hesaplarında birkaç ayrıntı vardır: beklenen skor, puan farkına karşılık gelen değerlerin yer aldığı bir tablodan okunur; çok büyük puan farkları belirli bir üst sınırla değerlendirilir; bir turnuvadaki bütün maçlar turnuva başındaki puan üzerinden hesaplanıp toplam değişim dönem sonunda işlenir. Bu yüzden turnuva içinde her maçtan sonra güncellenmiş puanla zincirleme hesap yapmak resmî sonuçla tam örtüşmez. Turnuva toplamını yaklaşık bulmak için her maçı başlangıç puanınızla ayrı ayrı hesaplayıp değişimleri toplayın.',
    ] },
  ],
  faq: [
    ['Bir maçta en fazla kaç puan kazanabilirim?', 'En fazla K katsayısı kadar. K = 20 ise sizden çok güçlü bir rakibi yendiğinizde değişim 20\'ye yaklaşır ama tam 20 olmaz, çünkü beklenen skorunuz hiçbir zaman tam sıfır değildir. Eşit rakibe karşı galibiyet K\'nin yarısını kazandırır.'],
    ['Beraberlikte puan değişir mi?', 'Puanlar eşit değilse evet. Düşük puanlı oyuncu beraberlikle beklenenden iyi sonuç almış olur ve puan kazanır; yüksek puanlı oyuncu aynı miktarda kaybeder. Örneğin 1400 puanlı oyuncu 1600 puanlı rakibiyle berabere kalırsa K = 40 ile 10,39 puan alır.'],
    ['Beklenen skor kazanma olasılığı mıdır?', 'Tam olarak değil. Beklenen skor, galibiyet olasılığı ile beraberlik olasılığının yarısının toplamıdır. 0,76 beklenen skor, yüz maçtan ortalama 76 puan toplanacağı anlamına gelir; bunun kaçının galibiyet, kaçının beraberlik olacağını formül söylemez.'],
    ['Rakibim ne kadar puan kaybeder?', 'İki oyuncuya aynı K uygulanıyorsa sizin kazandığınız kadar kaybeder. K katsayıları farklıysa her oyuncunun değişimi kendi katsayısıyla hesaplanır; bu durumda rakibin puanını ve K değerini yer değiştirerek aracı ikinci kez çalıştırabilirsiniz.'],
    ['Puanı olmayan biriyle oynarsam ne olur?', 'Puansız oyuncuya karşı oynanan maçlar genellikle sizin puanınızı etkilemez; yeni oyuncunun ilk puanı ise ayrı bir yöntemle, belirli sayıda maçtaki performansına göre belirlenir. Bu araç iki tarafın da puanı olduğu durumu hesaplar.'],
    ['Elo ile UKD aynı şey mi?', 'Hayır. Elo uluslararası puanlamayı, UKD ise Türkiye Satranç Federasyonu\'nun ulusal kuvvet derecesini ifade eder. İkisi de benzer mantıkla çalışır ama listeleri, katsayıları ve ayrıntı kuralları ayrıdır; bir oyuncunun iki puanı birbirinden farklı olabilir.'],
    ['Bu hesap satranç dışındaki oyunlarda kullanılabilir mi?', 'Evet. İki tarafın karşılaştığı ve sonucun galibiyet, beraberlik ya da mağlubiyet olduğu her oyunda aynı formül uygulanabilir. Kulüp içi masa tenisi, tavla ya da langırt sıralaması tutmak için K = 32 gibi sabit bir katsayı seçmeniz yeterlidir.'],
    ['Girdiğim puanlar kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; puanlar ve sonuç hiçbir sunucuya gönderilmez.'],
  ],
  related: ['oyun-puan-tablosu', 'olasilik-hesapla', 'lig-fiksturu-olustur', 'eleme-tablosu-olustur', 'gol-averaji-hesapla'],
};
