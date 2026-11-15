export default {
  slug: 'kagit-agirligi-hesapla',
  title: 'Kâğıt Ağırlığı (Gramaj) Hesaplama',
  h1Tail: 'g/m² → gram ve kilogram',
  pageTitle: 'Kâğıt Ağırlığı Hesaplama – Gramajdan Yaprak ve Paket Ağırlığı',
  description: 'Kâğıdın eni, boyu, gramajı (g/m²) ve yaprak sayısından tek yaprağın gram ağırlığını ve toplam paket ağırlığını kilogram olarak hesaplayın.',
  card: 'Gramaj (g/m²), ebat ve yaprak sayısından tek yaprağın ve tüm paketin ağırlığını hesaplayın; kargo ve baskı işleri için.',
  category: 'gunluk',
  keywords: ['kâğıt ağırlığı hesaplama', 'gramaj hesaplama', 'a4 kağıt kaç gram', '500 a4 kaç kg', 'kağıt gramaj nedir', 'matbaa kağıt ağırlığı', 'g/m2 hesaplama'],
  lead: "Bir kâğıdın ya da kartonun ağırlığını <strong>gramajından (g/m²)</strong> hesaplayın. En ve boy ölçüsünü milimetre olarak, gramajı ve yaprak sayısını yazın; araç tek yaprağın gramını, toplam alanı ve tüm paketin kilogramını versin.",
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'En (mm)', type: 'number', value: '210' },
    { id: 'boy', label: 'Boy (mm)', type: 'number', value: '297' },
    { id: 'gramaj', label: 'Gramaj (g/m²)', type: 'number', value: '80' },
    { id: 'adet', label: 'Yaprak sayısı', type: 'number', value: '500' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'En');
    const boy = h.pos(v.boy, 'Boy');
    const g = h.pos(v.gramaj, 'Gramaj');
    const adet = h.posint(v.adet, 'Yaprak sayısı');
    const alan = en * boy / 1e6;
    const tek = alan * g;
    const toplam = tek * adet;
    return {
      rows: [
        ['Toplam ağırlık', h.fmt(toplam / 1000, 3) + ' kg'],
        ['Toplam ağırlık (gram)', h.fmt(toplam, 1) + ' g'],
        ['Tek yaprak ağırlığı', h.fmt(tek, 3) + ' g'],
        ['Tek yaprak alanı', h.fmt(alan, 5) + ' m²'],
        ['Toplam alan', h.fmt(alan * adet, 3) + ' m²'],
      ],
      note: 'Ağırlık = en × boy × gramaj. Ambalaj, nem ve üretim toleransı hesaba katılmamıştır; gerçek paket birkaç yüzde farklı gelebilir.',
    };
  },
  cases: [
    { in: { en: '210', boy: '297', gramaj: '80', adet: '500' }, out: { 'Toplam ağırlık': '2,495 kg', 'Toplam ağırlık (gram)': '2.494,8 g', 'Tek yaprak ağırlığı': '4,99 g', 'Tek yaprak alanı': '0,06237 m²' } },
    { in: { en: '700', boy: '1000', gramaj: '300', adet: '100' }, out: { 'Toplam ağırlık': '21 kg', 'Tek yaprak ağırlığı': '210 g', 'Toplam alan': '70 m²' } },
    { in: { en: '841', boy: '1189', gramaj: '80', adet: '1' }, out: { 'Tek yaprak ağırlığı': '79,996 g', 'Toplam ağırlık': '0,08 kg' } },
    { in: { en: '297', boy: '420', gramaj: '100', adet: '1000' }, out: { 'Toplam ağırlık': '12,474 kg', 'Tek yaprak ağırlığı': '12,474 g' } },
    { in: { en: '90', boy: '50', gramaj: '350', adet: '1000' }, out: { 'Toplam ağırlık': '1,575 kg', 'Tek yaprak ağırlığı': '1,575 g' } },
    { in: { en: '1000', boy: '1000', gramaj: '120', adet: '1' }, out: { 'Tek yaprak ağırlığı': '120 g', 'Tek yaprak alanı': '1 m²' } },
    { in: { en: '210', boy: '297', gramaj: '0', adet: '500' }, error: true },
    { in: { en: '210', boy: '297', gramaj: '80', adet: '2,5' }, error: true },
    { in: { en: 'a4', boy: '297', gramaj: '80', adet: '500' }, error: true },
  ],
  howto: [
    'Kâğıdın enini ve boyunu milimetre olarak yazın. Varsayılan değerler A4 ölçüsüdür (210 × 297 mm).',
    'Gramajı g/m² cinsinden girin. Bu değer kâğıt paketinin etiketinde yazar; fotokopi kâğıdında genellikle 80\'dir.',
    'Yaprak sayısını yazın. Tek bir yaprağın ağırlığını görmek için 1, bir paket için 500 girebilirsiniz.',
    'Hesapla düğmesine basın. Toplam ağırlık kilogram ve gram olarak, tek yaprak ağırlığı ve alan bilgisiyle birlikte görünür.',
  ],
  sections: [
    { h: 'Gramaj nedir?', p: [
      'Gramaj, bir metrekare kâğıdın gram cinsinden ağırlığıdır ve <strong>g/m²</strong> ile gösterilir. Kâğıdın ne kadar kalın ve tok olduğu hakkında fikir veren temel ölçüdür: sayı büyüdükçe kâğıt ağırlaşır, genellikle kalınlaşır ve sertleşir. 80 g/m² dendiğinde, o kâğıttan 1 metre × 1 metre boyutunda bir tabakanın 80 gram geldiği anlaşılır.',
      'Gramaj doğrudan kalınlık demek değildir. Aynı gramajdaki iki kâğıttan biri daha sıkı preslenmiş ve ince, diğeri daha hacimli ve kalın olabilir. Kuşe, birinci hamur, kraft ve bristol gibi türlerin yoğunlukları farklıdır. Yine de ağırlık hesabında tür fark etmez; yalnızca alan ve gramaj yeterlidir.',
    ] },
    { h: 'Hesaplama formülü ve çözümlü örnek', p: [
      'Tek yaprağın ağırlığı, yaprağın metrekare cinsinden alanı ile gramajın çarpımıdır: <strong>ağırlık (g) = en (m) × boy (m) × gramaj (g/m²)</strong>. Ölçüler milimetre ise çarpımı bir milyona bölmek gerekir. Toplam ağırlık için sonuç yaprak sayısıyla çarpılır.',
      'A4 kâğıdı 210 × 297 mm\'dir. Alanı 0,210 × 0,297 = 0,06237 m² eder. 80 g/m² gramajda tek yaprak 0,06237 × 80 = 4,99 gram gelir; yani bir A4 yaprağı yaklaşık 5 gramdır. 500 yapraklık bir paket 4,9896 × 500 = 2.494,8 gram, yani yaklaşık 2,5 kilogramdır. Beş paketlik bir koli de ambalaj hariç 12,5 kilogram civarında olur.',
      'Matbaada sık kullanılan 70 × 100 cm tabaka için hesap daha da kolaydır: alan 0,7 m² olduğundan 300 g/m² kartonun tek tabakası 210 gram, 100 tabakası 21 kilogram gelir.',
    ] },
    { h: 'A serisi neden hesabı kolaylaştırır?', p: [
      'A serisi kâğıt ölçüleri, A0 tabakasının alanı 1 metrekare olacak şekilde tanımlanmıştır ve her bir sonraki boyut bir öncekinin yarısıdır. Bu sayede A0 kâğıdın gram ağırlığı gramajın kendisine çok yakındır; 80 g/m² A0 tabaka yaklaşık 80 gramdır. A1 bunun yarısı, A2 dörtte biri, A3 sekizde biri, A4 ise on altıda biridir. 80 ÷ 16 = 5 gram kuralı buradan gelir.',
      'Bu ilişki zihinden hızlı tahmin yapmayı sağlar: A4 yaprağın gramı kabaca gramajın on altıda biri, A5 yaprağın gramı otuz ikide biridir. 160 g/m² bir A4 davetiye kartı yaklaşık 10 gram, 300 g/m² bir A5 kart yaklaşık 9,3 gram gelir.',
    ] },
    { h: 'Yaygın gramajlar ve kullanım yerleri', ul: [
      '<strong>45–60 g/m²:</strong> gazete kâğıdı, ince roman ve sözlük sayfaları',
      '<strong>70–80 g/m²:</strong> fotokopi ve yazıcı kâğıdı, defter yaprakları',
      '<strong>90–120 g/m²:</strong> antetli kâğıt, kaliteli mektup kâğıdı, broşür iç sayfaları',
      '<strong>130–170 g/m²:</strong> afiş, el ilanı, dergi kapağı, katalog sayfası',
      '<strong>200–250 g/m²:</strong> dosya, ince kapak, kartpostal',
      '<strong>300–350 g/m²:</strong> kartvizit, davetiye, kutu ve ambalaj kartonu',
    ] },
    { h: 'Nerelerde kullanılır?', p: [
      'Kargo ve posta gönderilerinde ücret ağırlığa göre belirlendiğinden, bin adet broşürün ya da iki bin kartvizitin kaç kilo çekeceğini önceden bilmek işe yarar. Örneğin 90 × 50 mm ölçüsünde, 350 g/m² kartondan bin kartvizit 1,575 kilogram gelir. Davetiye bastıranlar, zarfla birlikte posta ağırlık kademesini aşıp aşmayacağını aynı yöntemle görebilir.',
      'Matbaalar ve kırtasiyeler kâğıdı çoğu zaman kilogram ya da ton üzerinden satın alır; bir iş için kaç tabaka gerektiği bilindiğinde alınacak kâğıdın ağırlığı ve dolayısıyla maliyeti bu hesapla çıkarılır. Arşiv ve depo planlamasında rafların taşıyacağı yük, okul ve ofislerde taşınacak koli ağırlığı da aynı formülle tahmin edilir. Tez ve kitap ciltlerinde sayfa sayısından kitabın yaklaşık ağırlığına ulaşmak mümkündür: yaprak sayısı, sayfa sayısının yarısıdır.',
    ] },
    { h: 'Dikkat edilmesi gerekenler', p: [
      'Üretimde gramaj için birkaç yüzdelik tolerans kabul edilir; 80 g/m² etiketli bir kâğıt gerçekte bir miktar hafif ya da ağır olabilir. Kâğıt havadaki nemi emdiği için nemli ortamda ağırlığı artar. Paketlerin ambalaj kâğıdı, koli ve palet ağırlıkları bu hesaba dahil değildir. Kesim payı bırakılan matbaa işlerinde bitmiş ürünün ağırlığı için net ölçüyü, satın alınacak kâğıt için ise tabaka ölçüsünü yazmalısınız.',
      'Araç yalnızca dikdörtgen yapraklar için hesap yapar. Rulo kâğıtlarda eni ve toplam uzunluğu milimetre olarak yazıp yaprak sayısına 1 girerek rulonun ağırlığını bulabilirsiniz.',
    ] },
  ],
  faq: [
    ['Bir A4 kâğıdı kaç gramdır?', '80 g/m² gramajlı bir A4 yaprağı 4,99 gram, yani yaklaşık 5 gramdır. 70 g/m² kâğıtta bu değer 4,37 gram, 100 g/m² kâğıtta 6,24 gram olur.'],
    ['500 yapraklık A4 paketi kaç kilodur?', '80 g/m² gramajda 2,495 kilogram gelir; ambalajıyla birlikte yaklaşık 2,5 kilogram kabul edilir. Beş paketlik koli 12,5 kilogram civarındadır.'],
    ['Gramaj ile kalınlık aynı şey mi?', 'Hayır. Gramaj birim alanın ağırlığıdır; kalınlık ise mikron ya da milimetre ile ölçülür. Aynı gramajdaki kâğıtlar, hamur türüne ve preslenme derecesine göre farklı kalınlıkta olabilir.'],
    ['Kartvizit kaç gram gelir?', '90 × 50 mm ölçüsünde ve 350 g/m² kartondan tek bir kartvizit 1,575 gramdır. Bin adetlik kutu yaklaşık 1,6 kilogram çeker.'],
    ['Ölçüleri santimetre olarak girebilir miyim?', 'Alanlar milimetre bekler. Santimetre değerinizi 10 ile çarparak yazın; örneğin 35 × 50 cm için 350 ve 500 girin.'],
    ['Kitabın ağırlığını sayfa sayısından bulabilir miyim?', 'Evet. Yaprak sayısı sayfa sayısının yarısıdır. Kitabın kesilmiş sayfa ölçüsünü ve iç kâğıt gramajını yazıp yaprak sayısını girin; kapak için ayrı bir hesap yapıp sonuca ekleyin.'],
    ['Sonuç neden terazide ölçtüğümden biraz farklı?', 'Kâğıt üretiminde gramaj toleransı vardır ve kâğıt nem çeker. Ayrıca ambalaj hesaba dahil değildir. Birkaç yüzdelik fark olağandır.'],
    ['Girdiğim ölçüler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır ve yazdığınız değerler hiçbir yere gönderilmez.'],
  ],
  related: ['kagit-boyutlari', 'sayfa-basi-maliyet-hesapla', 'desi-hesapla', 'kg-gram-cevir', 'rulo-uzunlugu-hesapla'],
};
