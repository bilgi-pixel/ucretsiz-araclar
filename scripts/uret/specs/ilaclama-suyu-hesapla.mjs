export default {
  slug: 'ilaclama-suyu-hesapla',
  title: 'Zirai İlaçlama Karışımı Hesaplama',
  h1Tail: 'ilaç, su ve depo hesabı',
  pageTitle: 'Zirai İlaçlama Karışımı Hesaplama – Depoya Kaç ml İlaç?',
  description: 'Arazi büyüklüğü, dekara su miktarı ve etiket dozuna göre toplam ilaç ve su ihtiyacını, kaç depo gerektiğini ve her depoya konacak ilaç miktarını hesaplayın.',
  card: 'Etiket dozuna göre toplam ilaç ve suyu, depo sayısını ve her depoya konacak ilaç miktarını bulun.',
  category: 'gunluk',
  keywords: ['ilaçlama hesaplama', 'depoya kaç ml ilaç', 'zirai ilaç dozu hesaplama', 'dekara ilaç miktarı', '100 litre suya ilaç', 'sırt pompası ilaç hesabı', 'ilaçlama suyu miktarı'],
  lead: 'Zirai ilaç etiketlerinde doz ya <strong>dekara</strong> ya da <strong>100 litre suya</strong> göre verilir; tarlada ise ilacı pülverizatörün deposuna koyarsınız. Bu araç, etiketteki dozu arazinize ve depo hacminize göre toplam ilaç, toplam su, depo sayısı ve depo başına ilaç miktarına çevirir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'İlaçlanacak alan (dekar)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'su', label: 'Dekara atılan su (litre/dekar)', type: 'number', placeholder: 'Örn. 40', hint: 'Kalibrasyonla ölçülen ilaçlama hacmi' },
    { id: 'doz', label: 'Etiket dozu (ml ya da g)', type: 'number', placeholder: 'Örn. 150' },
    { id: 'tur', label: 'Doz türü', type: 'select', options: [['da', 'Dekara doz (ml ya da g / dekar)'], ['yuz', '100 litre suya doz (ml ya da g / 100 L)']] },
    { id: 'depo', label: 'Depo hacmi (litre)', type: 'number', placeholder: 'Örn. 400', hint: 'Sırt pompası için 16 ya da 20, traktör pülverizatörü için 400–1000' },
  ],
  compute(v, h) {
    const alan = h.pos(v.alan, 'İlaçlanacak alan');
    const su = h.pos(v.su, 'Dekara atılan su');
    const doz = h.pos(v.doz, 'Etiket dozu');
    const depo = h.pos(v.depo, 'Depo hacmi');
    const yuz = v.tur === 'yuz';
    const toplamSu = alan * su;
    const toplamIlac = yuz ? toplamSu / 100 * doz : alan * doz;
    const depoIlac = toplamIlac / toplamSu * depo;
    const depoAlan = depo / su;
    const dolum = Math.ceil(toplamSu / depo - 1e-9);
    const tam = Math.floor(toplamSu / depo + 1e-9);
    const sonSu = toplamSu - tam * depo;
    const rows = [
      ['Bir depoya konacak ilaç', h.fmt(depoIlac, 2) + ' ml (g)'],
      ['Toplam ilaç', h.fmt(toplamIlac, 2) + ' ml (g)'],
      ['Toplam su', h.fmt(toplamSu, 2) + ' litre'],
      ['Depo dolum sayısı', h.fmt(dolum, 0) + ' dolum'],
      ['Bir deponun ilaçladığı alan', h.fmt(depoAlan, 2) + ' dekar'],
      ['Karışım oranı', h.fmt(toplamIlac / toplamSu * 100, 2) + ' ml (g) / 100 litre su'],
      ['Dekara düşen ilaç', h.fmt(toplamIlac / alan, 2) + ' ml (g) / dekar'],
    ];
    if (sonSu > 1e-6) {
      rows.push(['Son (yarım) depo', `${h.fmt(sonSu, 2)} litre su + ${h.fmt(sonSu / toplamSu * toplamIlac, 2)} ml (g) ilaç`]);
    }
    return {
      rows,
      note: 'Sıvı ilaçlarda sonuç mililitre, toz ve granül ilaçlarda gramdır. Her zaman ürün etiketindeki doza, bekleme süresine ve güvenlik talimatlarına uyun.',
    };
  },
  cases: [
    { in: { alan: '20', su: '40', doz: '150', tur: 'da', depo: '400' }, out: { 'Bir depoya konacak ilaç': '1.500 ml (g)', 'Toplam ilaç': '3.000 ml (g)', 'Toplam su': '800 litre', 'Depo dolum sayısı': '2 dolum', 'Bir deponun ilaçladığı alan': '10 dekar', 'Karışım oranı': '375 ml (g) / 100 litre su' } },
    { in: { alan: '5', su: '100', doz: '200', tur: 'yuz', depo: '16' }, out: { 'Bir depoya konacak ilaç': '32 ml (g)', 'Toplam ilaç': '1.000 ml (g)', 'Toplam su': '500 litre', 'Depo dolum sayısı': '32 dolum', 'Bir deponun ilaçladığı alan': '0,16 dekar', 'Dekara düşen ilaç': '200 ml (g) / dekar', 'Son (yarım) depo': '4 litre su + 8 ml (g) ilaç' } },
    { in: { alan: '50', su: '30', doz: '100', tur: 'da', depo: '600' }, out: { 'Bir depoya konacak ilaç': '2.000 ml (g)', 'Toplam ilaç': '5.000 ml (g)', 'Toplam su': '1.500 litre', 'Depo dolum sayısı': '3 dolum', 'Son (yarım) depo': '300 litre su + 1.000 ml (g) ilaç' } },
    { in: { alan: '1', su: '20', doz: '50', tur: 'da', depo: '20' }, out: { 'Bir depoya konacak ilaç': '50 ml (g)', 'Toplam su': '20 litre', 'Depo dolum sayısı': '1 dolum' } },
    { in: { alan: '8', su: '150', doz: '75', tur: 'yuz', depo: '1000' }, out: { 'Bir depoya konacak ilaç': '750 ml (g)', 'Toplam ilaç': '900 ml (g)', 'Toplam su': '1.200 litre', 'Depo dolum sayısı': '2 dolum', 'Dekara düşen ilaç': '112,5 ml (g) / dekar' } },
    { in: { alan: '3', su: '25', doz: '40', tur: 'da', depo: '400' }, out: { 'Bir depoya konacak ilaç': '640 ml (g)', 'Toplam ilaç': '120 ml (g)', 'Toplam su': '75 litre', 'Depo dolum sayısı': '1 dolum', 'Son (yarım) depo': '75 litre su + 120 ml (g) ilaç' } },
    { in: { alan: '20', su: '0', doz: '150', tur: 'da', depo: '400' }, error: true },
    { in: { alan: 'yirmi', su: '40', doz: '150', tur: 'da', depo: '400' }, error: true },
  ],
  howto: [
    'İlaçlayacağınız alanı dekar olarak yazın.',
    'Pülverizatörünüzün dekara attığı su miktarını girin. Bilmiyorsanız aşağıda anlatılan basit kalibrasyonla ölçün.',
    'İlaç etiketindeki dozu yazın ve dozun dekara mı yoksa 100 litre suya mı verildiğini listeden seçin.',
    'Depo hacmini litre olarak girin ve "Hesapla" düğmesine basın.',
    'İlk satırdaki "Bir depoya konacak ilaç" değerini ölçü kabıyla ölçerek depoya ekleyin; son depo yarım kalıyorsa ayrı satırda verilen su ve ilaç miktarını kullanın.',
  ],
  sections: [
    { h: 'Etiketteki iki doz türü', p: [
      'Tarla bitkilerinde kullanılan yabancı ot ilaçlarının ve birçok böcek ilacının dozu <strong>dekara</strong> verilir: "dekara 150 ml" gibi. Burada önemli olan, o dekara düşen ilaç miktarıdır; su yalnızca ilacı taşıyan araçtır. Suyu az ya da çok atmanız dekara düşen ilacı değiştirmemelidir, bu yüzden depoya konacak miktar pülverizatörün dekara attığı suya bağlıdır.',
      'Meyve bahçeleri, bağ ve sebzelerde ise doz çoğunlukla <strong>100 litre suya</strong> verilir: "100 litre suya 200 ml" gibi. Bu durumda karışımın derişimi sabittir; ağaçlar iyice ıslanana kadar ilaçlama yapılır ve toplam ilaç, harcanan su miktarıyla birlikte artar. Araç iki türü de destekler ve her ikisinde hem dekara düşen ilacı hem 100 litredeki karışım oranını gösterir; böylece etiketle karşılaştırma yapabilirsiniz.',
    ] },
    { h: 'Formüller ve çözümlü örnek', p: [
      'Toplam su her iki durumda aynıdır: <strong>toplam su = alan × dekara su</strong>. Dekara dozda <strong>toplam ilaç = alan × doz</strong>, 100 litreye dozda <strong>toplam ilaç = toplam su ÷ 100 × doz</strong> olur. Depoya konacak ilaç ise toplam ilacın toplam suya oranının depo hacmiyle çarpımıdır.',
      'Örnek 1: 20 dekar buğdaya dekara 150 ml yabancı ot ilacı atılacak; pülverizatör dekara 40 litre su atıyor ve depo 400 litre. Toplam su 20 × 40 = 800 litre, toplam ilaç 20 × 150 = 3.000 ml\'dir. Bir depo 400 ÷ 40 = 10 dekar ilaçlar, dolayısıyla her depoya 10 × 150 = 1.500 ml ilaç konur ve iki depo gerekir.',
      'Örnek 2: 5 dekar bahçe, 16 litrelik sırt pompasıyla ilaçlanacak; etiket 100 litre suya 200 ml diyor ve dekara yaklaşık 100 litre su harcanıyor. Toplam su 500 litre, toplam ilaç 500 ÷ 100 × 200 = 1.000 ml\'dir. Her 16 litrelik depoya 16 ÷ 100 × 200 = 32 ml ilaç konur. 500 ÷ 16 = 31,25 olduğundan 31 tam depo ve 4 litrelik bir son dolum, toplam 32 dolum yapılır; son dolumda 8 ml ilaç yeterlidir.',
    ] },
    { h: 'Dekara atılan suyu ölçmek (kalibrasyon)', p: [
      'Hesabın en çok hata yapılan girdisi dekara atılan su miktarıdır. Bu değer meme tipine, basınca ve ilerleme hızına göre değişir; tahminle yazmak yerine ölçmek gerekir. Basit yöntem şudur:',
    ], ol: [
      'Depoyu belli bir işarete kadar temiz suyla doldurun.',
      'Ölçtüğünüz bir alanı (örneğin 1 dekar ya da sırt pompası için 100 metrekare) normal çalışma hızınız ve basıncınızla ilaçlar gibi sulayın.',
      'Depoyu yeniden aynı işarete kadar doldururken eklediğiniz suyu ölçün.',
      'Eklenen suyu ilaçlanan alana bölün. 100 metrekarede 4 litre harcadıysanız dekara 40 litre atıyorsunuz demektir.',
    ] },
    { h: 'Karışımı hazırlarken dikkat edilecekler', ul: [
      'Depoyu önce yarıya kadar suyla doldurun, ilacı ekleyin, karıştırıcı çalışırken suyu tamamlayın.',
      'Toz ve granül ilaçları önce ayrı bir kapta az suyla bulamaç hâline getirmek topaklanmayı önler.',
      'Mutfak kaşığı ya da kapak yerine ölçülü kap ya da şırınga kullanın; küçük depolarda birkaç mililitrelik hata dozu belirgin biçimde değiştirir.',
      'Hazırlanan karışımı bekletmeyin; ihtiyaçtan fazla karışım hazırlamamak için son depoyu hesaplanan kadar doldurun.',
      'Birden fazla ilacı karıştırmadan önce etiketlerdeki karışabilirlik bilgisini kontrol edin.',
      'Rüzgârlı havada, günün en sıcak saatlerinde ve yağış beklenirken ilaçlama yapmayın.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, dekara verilen dozu doğrudan depoya koymaktır. Depo 10 dekarlık su taşıyorsa dekara 150 ml\'lik doz depoya 1.500 ml olarak konmalıdır. İkinci yaygın hata bunun tersidir: 100 litreye verilen dozu dekara doz sanmak. Üçüncüsü ise "biraz fazla olsun, daha iyi etki eder" düşüncesiyle dozu artırmaktır; fazla doz üründe yanıklığa, kalıntı sorununa ve zararlının dayanıklılık kazanmasına yol açabilir, ayrıca gereksiz masraftır. Düşük doz da etkisiz kalır ve yine dayanıklılığı besler.',
    ] },
    { h: 'Güvenlik ve sorumluluk', p: [
      'Bu araç yalnızca oran hesabı yapar; hangi ilacın hangi dozda kullanılacağını belirlemez. Geçerli olan her zaman ürünün ruhsatlı etiketidir: doz, uygulama zamanı, son ilaçlama ile hasat arasındaki bekleme süresi ve kullanılacak koruyucu donanım oradan okunmalıdır. İlaç hazırlarken eldiven, maske, gözlük ve uzun kollu giysi kullanın; boş ambalajları üç kez çalkalayıp çalkalama suyunu depoya ekleyin ve ambalajları başka amaçla kullanmayın. Tereddüt ettiğiniz durumlarda ziraat mühendisine ya da bitki koruma bayisine danışın.',
    ] },
  ],
  faq: [
    ['400 litrelik depoya kaç ml ilaç konur?', 'Bu, pülverizatörün dekara attığı suya bağlıdır. Dekara 40 litre atılıyorsa bir depo 10 dekar ilaçlar; dekara 150 ml dozda depoya 1.500 ml konur. Dekara 20 litre atılıyorsa aynı depo 20 dekar ilaçlar ve 3.000 ml gerekir.'],
    ['16 litrelik sırt pompasına ne kadar ilaç koymalıyım?', 'Doz 100 litre suya verilmişse dozu 100\'e bölüp 16 ile çarpın: 100 litreye 200 ml için 32 ml. Doz dekara verilmişse önce pompanızın dekara kaç litre attığını ölçüp araca girin.'],
    ['Dekara kaç litre su atılmalı?', 'Tek bir doğru değer yoktur; ilaç etiketinde çoğu zaman önerilen su miktarı aralığı yazar ve bu değer ilacın türüne, bitkinin gelişme dönemine ve kullanılan alete göre değişir. Önemli olan, etiketteki aralıkta kalmak ve kendi aletinizin gerçek sarfiyatını ölçmektir.'],
    ['Toz ilaçlarda sonuç gram mı?', 'Evet. Araç yalnızca oran hesabı yaptığı için dozu hangi birimde girerseniz sonuç da o birimdedir: sıvı ilaçta mililitre, toz ve granül ilaçta gram.'],
    ['Dozu cc olarak biliyorum, ml ile farkı var mı?', 'Hayır, 1 cc (santimetreküp) 1 mililitreye eşittir. Etikette cc yazıyorsa aynı sayıyı ml olarak girebilirsiniz.'],
    ['Son depo neden ayrı gösteriliyor?', 'Toplam su depo hacminin tam katı değilse son dolum yarım kalır. Depoyu yine tam doldurup tam doz koyarsanız karışım artar; bu satır, son dolum için gereken su ve ilaç miktarını ayrıca verir.'],
    ['Yapışkan-yayıcı gibi katkıları da hesaplayabilir miyim?', 'Evet. Katkı maddesinin etiket dozunu ve doz türünü girip aracı ikinci kez çalıştırmanız yeterlidir; çoğu yayıcı-yapıştırıcı 100 litre suya göre dozlanır.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızın içinde yapılır; alan, doz ve depo bilgileri hiçbir sunucuya gönderilmez.'],
  ],
  related: ['gubre-miktari-hesapla', 'tohum-miktari-hesapla', 'sulama-suyu-hesapla', 'donum-metrekare-cevir', 'dekar-verim-hesapla'],
};
