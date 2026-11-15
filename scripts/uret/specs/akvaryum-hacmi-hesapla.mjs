export default {
  slug: 'akvaryum-hacmi-hesapla',
  title: 'Akvaryum Hacmi Hesaplama',
  h1Tail: 'litre ve su ağırlığı',
  pageTitle: "Akvaryum Hacmi Hesaplama – Kaç Litre Su Alır, Kaç Kilo Gelir?",
  description: "Akvaryumun en, boy ve yükseklik ölçülerinden brüt litresini; cam kalınlığı, üst boşluk ve dekor payını düşerek gerçek su hacmini ve su ağırlığını hesaplayın.",
  card: "Akvaryumunuzun ölçülerinden brüt ve net su hacmini litre olarak, suyun ağırlığıyla birlikte hesaplayın.",
  category: 'gunluk',
  keywords: ['akvaryum hacmi hesaplama', 'akvaryum kaç litre', 'akvaryum litre hesaplama', 'akvaryum su ağırlığı', 'net akvaryum hacmi', '100 litre akvaryum ölçüleri', 'akvaryum litre formülü'],
  lead: "Dikdörtgen bir akvaryumun dış ölçülerini santimetre olarak girin; araç <strong>brüt hacmi</strong>, cam kalınlığı ile üst boşluk düşüldükten sonraki <strong>gerçek su hacmini</strong> ve suyun yaklaşık ağırlığını hesaplar.",
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Boy / uzunluk (cm)', type: 'number', placeholder: 'Örn. 100' },
    { id: 'en', label: 'En / derinlik (cm)', type: 'number', placeholder: 'Örn. 40' },
    { id: 'yukseklik', label: 'Yükseklik (cm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'cam', label: 'Cam kalınlığı (mm)', type: 'number', value: '0', hint: 'Bilmiyorsanız 0 bırakın; ölçüler iç ölçü kabul edilir.' },
    { id: 'bosluk', label: 'Üstten boşluk (cm)', type: 'number', value: '0', hint: 'Su yüzeyi ile camın üst kenarı arasındaki mesafe.' },
    { id: 'dekor', label: 'Kum ve dekor payı (%)', type: 'number', value: '0', hint: 'Kum, taş ve köklerin kapladığı hacim için tahmini oran.' },
  ],
  compute(v, h) {
    const boy = h.pos(v.boy, 'Boy');
    const en = h.pos(v.en, 'En');
    const yuk = h.pos(v.yukseklik, 'Yükseklik');
    const cam = h.nonneg(h.opt(v.cam, 0, 'Cam kalınlığı') + '', 'Cam kalınlığı') / 10;
    const bosluk = h.nonneg(h.opt(v.bosluk, 0, 'Üstten boşluk') + '', 'Üstten boşluk');
    const dekor = h.nonneg(h.opt(v.dekor, 0, 'Kum ve dekor payı') + '', 'Kum ve dekor payı');
    if (dekor >= 100) h.err('Kum ve dekor payı yüzde 100\'den küçük olmalı.');
    const icBoy = boy - 2 * cam;
    const icEn = en - 2 * cam;
    const suYuk = yuk - cam - bosluk;
    if (icBoy <= 0 || icEn <= 0) h.err('Cam kalınlığı ölçülere göre çok büyük. Cam kalınlığını milimetre, diğer ölçüleri santimetre olarak yazın.');
    if (suYuk <= 0) h.err('Üstten boşluk ve cam kalınlığı toplamı yükseklikten küçük olmalı.');
    const brut = boy * en * yuk / 1000;
    const dolu = icBoy * icEn * suYuk / 1000;
    const net = dolu * (1 - dekor / 100);
    return {
      rows: [
        ['Net su hacmi', h.fmt(net, 1) + ' L'],
        ['Brüt hacim (dış ölçü)', h.fmt(brut, 1) + ' L'],
        ['Su ağırlığı (tatlı su)', h.fmt(net, 1) + ' kg'],
        ['Su yüksekliği', h.fmt(suYuk, 1) + ' cm'],
        ['Taban alanı (iç)', h.fmt(icBoy * icEn, 0) + ' cm²'],
      ],
      note: 'Tatlı suyun 1 litresi yaklaşık 1 kg kabul edilmiştir. Camın, kumun, taşların ve sehpanın ağırlığı su ağırlığına dahil değildir.',
    };
  },
  cases: [
    { in: { boy: '100', en: '40', yukseklik: '50' }, out: { 'Net su hacmi': '200 L', 'Brüt hacim (dış ölçü)': '200 L', 'Su ağırlığı (tatlı su)': '200 kg' } },
    { in: { boy: '100', en: '40', yukseklik: '50', cam: '8', bosluk: '3' }, out: { 'Net su hacmi': '174,6 L', 'Brüt hacim (dış ölçü)': '200 L', 'Su yüksekliği': '46,2 cm' } },
    { in: { boy: '60', en: '30', yukseklik: '30' }, out: { 'Net su hacmi': '54 L', 'Taban alanı (iç)': '1.800 cm²' } },
    { in: { boy: '80', en: '35', yukseklik: '40', cam: '0', bosluk: '0', dekor: '10' }, out: { 'Net su hacmi': '100,8 L', 'Brüt hacim (dış ölçü)': '112 L' } },
    { in: { boy: '30', en: '30', yukseklik: '30', cam: '5', bosluk: '2' }, out: { 'Net su hacmi': '23,1 L', 'Su yüksekliği': '27,5 cm', 'Taban alanı (iç)': '841 cm²' } },
    { in: { boy: '120', en: '50', yukseklik: '50', cam: '10', bosluk: '4', dekor: '5' }, out: { 'Net su hacmi': '242,1 L', 'Brüt hacim (dış ölçü)': '300 L' } },
    { in: { boy: '100', en: '', yukseklik: '50' }, error: true },
    { in: { boy: '100', en: '40', yukseklik: '50', bosluk: '60' }, error: true },
  ],
  howto: [
    "Akvaryumun boyunu (ön camın uzunluğu), enini (önden arkaya derinlik) ve yüksekliğini şerit metreyle dıştan dışa ölçüp santimetre olarak yazın.",
    "Cam kalınlığını biliyorsanız milimetre olarak girin. Böylece araç iç ölçüleri kendisi hesaplar. Ölçüleri zaten içten aldıysanız bu alanı 0 bırakın.",
    "Suyu camın üst kenarına kadar doldurmuyorsanız, su yüzeyi ile üst kenar arasındaki mesafeyi 'Üstten boşluk' alanına yazın.",
    "Kum, taş ve kök gibi malzemelerin kapladığı hacmi hesaba katmak isterseniz tahmini bir yüzde girin; emin değilseniz 0 bırakabilirsiniz.",
    "'Hesapla' düğmesine basın. İlk satır gerçek su hacmini, ikinci satır akvaryumun satılırken söylenen brüt litresini gösterir.",
  ],
  sections: [
    { h: 'Akvaryum litresi nasıl hesaplanır?', p: [
      "Dikdörtgen prizma biçimindeki bir akvaryumun hacmi üç ölçünün çarpımıdır. Ölçüler santimetre alındığında sonuç santimetreküp çıkar; 1 litre 1000 santimetreküp olduğundan sonucu 1000'e bölmek yeterlidir: <strong>hacim (L) = boy × en × yükseklik ÷ 1000</strong>.",
      "100 cm boyunda, 40 cm eninde ve 50 cm yüksekliğinde bir akvaryum için hesap 100 × 40 × 50 = 200.000 cm³, yani 200 litredir. Akvaryumcularda bu tank '200 litrelik' olarak satılır. Ancak bu değer brüt hacimdir; içine koyabileceğiniz gerçek su miktarı her zaman daha azdır.",
    ] },
    { h: 'Brüt hacim ile net su hacmi arasındaki fark', p: [
      "Dış ölçülerle hesaplanan hacmin bir kısmını camın kendisi kaplar. Yan camlar boy ve enden ikişer cam kalınlığı, taban camı ise yükseklikten bir cam kalınlığı götürür. Ayrıca su hiçbir zaman ağzına kadar doldurulmaz; balıkların sıçramaması, kapağın ve filtre çıkışının rahat çalışması için üstte birkaç santimetre boşluk bırakılır.",
      "Araç net hacmi şu biçimde bulur: <strong>(boy − 2 × cam) × (en − 2 × cam) × (yükseklik − cam − üst boşluk) ÷ 1000</strong>. Ardından girdiğiniz dekor yüzdesi kadarını düşer.",
      "Yukarıdaki 100 × 40 × 50 cm akvaryumu 8 mm camla ve üstten 3 cm boşlukla ele alalım. İç boy 100 − 1,6 = 98,4 cm, iç en 40 − 1,6 = 38,4 cm, su yüksekliği 50 − 0,8 − 3 = 46,2 cm olur. Çarpım 98,4 × 38,4 × 46,2 = 174.569 cm³, yani yaklaşık 174,6 litredir. Etikette 200 litre yazan tankta gerçekte 25 litreden fazla su eksiktir.",
    ] },
    { h: 'Net hacmi bilmek neden önemli?', ul: [
      "<strong>İlaç ve su düzenleyici dozu:</strong> Dozlar litre başına verilir. Brüt hacme göre doz yapmak, gerçekte daha az su bulunan tankta fazla doza yol açar.",
      "<strong>Isıtıcı seçimi:</strong> Isıtıcı gücü su hacmine ve oda sıcaklığıyla hedef sıcaklık arasındaki farka göre belirlenir; hacmi doğru bilmek gereğinden zayıf ya da güçlü ısıtıcı almayı önler.",
      "<strong>Filtre debisi:</strong> Filtrelerin saatlik debisi tank hacminin katı olarak seçilir. Net hacim, karşılaştırma yaparken daha gerçekçi bir temel sağlar.",
      "<strong>Su değişimi:</strong> Haftalık yüzde 20–30 su değişiminde kaç litre su hazırlamanız gerektiğini net hacimden hesaplarsınız.",
      "<strong>Canlı yükü:</strong> Kaç balık bakılabileceği değerlendirilirken gerçek su miktarı esas alınır.",
    ] },
    { h: 'Kum ve dekor ne kadar yer kaplar?', p: [
      "Taban malzemesi, taşlar, kökler ve tank içi ekipman da su hacminden yer alır. Kum ya da çakılın taneleri arasında su bulunduğu için kapladığı hacmin tamamı kayıp sayılmaz; yine de kalın bir taban katmanı ve yoğun taş düzeni olan tanklarda kayıp belirgin hâle gelir. Sade düzenlenmiş bir tank için yüzde 5, yoğun taşlı düzenler için yüzde 10–15 civarı bir pay kaba bir tahmin olarak kullanılabilir.",
      "En doğru yöntem akvaryumu ilk kez doldururken kaç litre su koyduğunuzu saymaktır. Hacmi bilinen bir kova ya da bidonla doldurup sayıyı not ederseniz, dekorlu tankınızın gerçek su hacmini kesin olarak öğrenmiş olursunuz. Bu araç, doldurmadan önce planlama yapmak ya da mevcut bir tankı boşaltmadan tahmin etmek için kullanışlıdır.",
    ] },
    { h: 'Su ağırlığı ve sehpa seçimi', p: [
      "Tatlı suyun bir litresi yaklaşık bir kilogram gelir, bu yüzden araç net litreyi doğrudan kilogram olarak da gösterir. Deniz suyu tuz içerdiğinden biraz daha yoğundur; tuzlu su akvaryumlarında ağırlık yüzde 2–3 kadar fazla olur.",
      "Toplam yük yalnızca sudan ibaret değildir. Camın kendisi, taban malzemesi, taşlar, kapak ve sehpa da ağırlığa eklenir; orta boy bir akvaryumda cam ve kumun ağırlığı onlarca kilogramı bulabilir. 200 litrelik dolu bir akvaryumun toplam ağırlığının 250 kilogramı aşması olağandır. Bu yükü taşıyacak sehpanın akvaryum için üretilmiş, tabanı tam destekleyen ve terazisinde duran bir sehpa olması gerekir. Büyük tankları eski binalarda döşemenin ortasına değil, taşıyıcı duvara yakın bir yere yerleştirmek ve emin olamadığınız durumlarda bir inşaat mühendisine danışmak doğru olur.",
    ] },
    { h: 'Hızlı başvuru: yaygın akvaryum ölçüleri', ul: [
      "30 × 30 × 30 cm = 27 litre (küp nano tank)",
      "40 × 25 × 25 cm = 25 litre",
      "60 × 30 × 30 cm = 54 litre",
      "60 × 30 × 36 cm = 64,8 litre",
      "80 × 35 × 40 cm = 112 litre",
      "100 × 40 × 40 cm = 160 litre",
      "100 × 40 × 50 cm = 200 litre",
      "120 × 40 × 50 cm = 240 litre",
      "120 × 50 × 50 cm = 300 litre",
      "150 × 50 × 60 cm = 450 litre",
    ] },
    { h: 'Sınırlar', p: [
      "Araç yalnızca dikdörtgen tabanlı akvaryumlar içindir. Bombeli ön camlı, köşe, altıgen ya da silindir tanklarda hacim farklı formüllerle hesaplanır; bombeli tanklarda dikdörtgen hesabı gerçek hacmi olduğundan az gösterir. Sonuçlar bir ondalık basamağa yuvarlanır; şerit metreyle alınan ölçülerdeki birkaç milimetrelik hata büyük tanklarda birkaç litre fark yaratabilir.",
    ] },
  ],
  faq: [
    ["Akvaryum litresi hangi formülle bulunur?", "Santimetre cinsinden boy, en ve yükseklik çarpılır ve 1000'e bölünür. Örneğin 60 × 30 × 30 cm ölçülerindeki akvaryum 54.000 cm³, yani 54 litredir."],
    ["100 × 40 × 50 cm akvaryum kaç litredir?", "Brüt hacmi 200 litredir. 8 mm cam kalınlığı ve üstten 3 cm boşluk hesaba katıldığında gerçek su hacmi yaklaşık 174,6 litreye düşer."],
    ["Ölçüleri içten mi dıştan mı almalıyım?", "Dıştan ölçüp cam kalınlığını ayrıca girerseniz araç iç ölçüleri kendisi hesaplar. Ölçüleri doğrudan içten alıyorsanız cam kalınlığını 0 bırakın; aksi hâlde cam iki kez düşülmüş olur."],
    ["Cam kalınlığını nasıl öğrenirim?", "Üst kenardan cetvel ya da kumpasla ölçebilirsiniz. Küçük tanklarda genellikle 4–6 mm, orta boy tanklarda 8–10 mm, büyük tanklarda 12 mm ve üzeri cam kullanılır; kesin değer üreticiye ve tankın yüksekliğine göre değişir."],
    ["Dolu akvaryum kaç kilo gelir?", "Suyun ağırlığı litre sayısına yaklaşık eşittir: 100 litre su yaklaşık 100 kg'dır. Buna cam, kum, taş ve ekipman ağırlığını eklemeniz gerekir; araç yalnızca su ağırlığını gösterir."],
    ["İlaç dozunu brüt hacme göre mi net hacme göre mi yapmalıyım?", "Net su hacmine göre yapılmalıdır, çünkü ilaç yalnızca suyun içinde çözünür. Doz konusunda ürünün kullanım talimatına uyun; hassas canlılarda bir uzmana ya da veteriner hekime danışmak en güvenli yoldur."],
    ["Silindir ya da bombeli akvaryum için kullanabilir miyim?", "Hayır, bu araç dikdörtgen tabanlı tanklar için tasarlanmıştır. Silindir tanklarda taban alanı daire formülüyle bulunur; bombeli tanklarda ise en doğru yöntem doldururken litreyi saymaktır."],
    ["Girdiğim ölçüler kaydediliyor mu?", "Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız ölçüler hiçbir sunucuya gönderilmez."],
  ],
  related: ['hacim-hesapla', 'litre-galon-cevir', 'litre-metrekup-cevir', 'saksi-topragi-hesapla', 'silindir-hacmi-hesapla'],
};
