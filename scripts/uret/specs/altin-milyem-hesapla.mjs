export default {
  slug: 'altin-milyem-hesapla',
  title: 'Altın Milyem Hesaplama',
  h1Tail: 'has karşılığı ve işçilik',
  pageTitle: 'Altın Milyem Hesaplama – Has Altın Karşılığı ve İşçilik Milyemi',
  description: 'Altının gramını ve milyemini yazın; has altın karşılığını, ayar eşdeğerini, işçilik milyemi dahil has miktarını ve gram has fiyatına göre tutarı hesaplayın.',
  card: 'Gram ve milyemden has altın karşılığını, ayar eşdeğerini ve işçilik milyemi dahil tutarı hesaplayın.',
  category: 'finans',
  keywords: ['altın milyem hesaplama', 'milyem nedir', 'has altın karşılığı hesaplama', '916 milyem kaç ayar', '585 milyem', 'işçilik milyemi', 'milyem ayar çevirme', 'hurda altın has hesabı'],
  lead: 'Bir altın ürünün ağırlığını ve milyemini yazın; araç ürünün kaç gram <strong>has altına</strong> karşılık geldiğini ve milyemin hangi ayara denk düştüğünü hesaplar. Kuyumculukta kullanılan işçilik milyemini ve gram has fiyatını da girerek tutarı görebilirsiniz.',
  button: 'Hesapla',
  inputs: [
    { id: 'gram', label: 'Ağırlık (gram)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'milyem', label: 'Milyem', type: 'number', placeholder: 'Örn. 916', hint: '0 ile 1000 arasında; üründeki damgada yazan değer (585, 750, 875, 916, 995…).' },
    { id: 'iscilik', label: 'İşçilik milyemi (isteğe bağlı)', type: 'number', placeholder: 'Örn. 30', hint: 'İşçiliğin has altın cinsinden binde karşılığı; ürün milyemine eklenir.' },
    { id: 'fiyat', label: 'Gram has altın fiyatı (TL, isteğe bağlı)', type: 'number', placeholder: 'Güncel fiyatı yazın', hint: 'Araç fiyat bilgisi çekmez; günün fiyatını siz girin.' },
  ],
  compute(v, h) {
    const g = h.pos(v.gram, 'Ağırlık');
    const m = h.pos(v.milyem, 'Milyem');
    if (m > 1000) h.err('"Milyem" en fazla 1000 olabilir; 1000 milyem saf altını ifade eder. Değeri 0,916 biçiminde değil 916 olarak yazın.');
    const bos = (s) => String(s ?? '').trim() === '';
    const isc = bos(v.iscilik) ? null : h.nonneg(v.iscilik, 'İşçilik milyemi');
    const fiyat = bos(v.fiyat) ? null : h.pos(v.fiyat, 'Gram has altın fiyatı');
    const has = g * m / 1000;
    const rows = [
      ['Has altın karşılığı', h.fmt(has, 3) + ' g'],
      ['Ayar karşılığı', h.fmt(m * 24 / 1000, 2) + ' ayar'],
      ['Saflık', '%' + h.fmt(m / 10, 2)],
      ['Diğer metal miktarı', h.fmt(g - has, 3) + ' g'],
    ];
    let toplamHas = has;
    if (isc !== null) {
      toplamHas = g * (m + isc) / 1000;
      rows.push(['İşçilik dahil milyem', h.fmt(m + isc, 2).replace(/\./g, '')]);
      rows.push(['İşçiliğin has karşılığı', h.fmt(toplamHas - has, 3) + ' g']);
      rows.push(['İşçilik dahil has karşılığı', h.fmt(toplamHas, 3) + ' g']);
    }
    if (fiyat !== null) {
      rows.push(['Has altın değeri', h.para(has * fiyat)]);
      if (isc !== null) rows.push(['İşçilik dahil tutar', h.para(toplamHas * fiyat)]);
    }
    return { rows, note: 'Has karşılığı = gram × milyem ÷ 1000. Tutarlar yazdığınız has fiyatına göredir; alış-satış farkı, vergi ve kâr payı dahil değildir.' };
  },
  cases: [
    { in: { gram: '10', milyem: '916' }, out: { 'Has altın karşılığı': '9,16 g', 'Ayar karşılığı': '21,98 ayar', 'Saflık': '%91,6', 'Diğer metal miktarı': '0,84 g' } },
    { in: { gram: '20', milyem: '916', iscilik: '30' }, out: { 'Has altın karşılığı': '18,32 g', 'İşçilik dahil milyem': '946', 'İşçiliğin has karşılığı': '0,6 g', 'İşçilik dahil has karşılığı': '18,92 g' } },
    { in: { gram: '100', milyem: '585' }, out: { 'Has altın karşılığı': '58,5 g', 'Ayar karşılığı': '14,04 ayar', 'Saflık': '%58,5' } },
    { in: { gram: '50', milyem: '750' }, out: { 'Has altın karşılığı': '37,5 g', 'Ayar karşılığı': '18 ayar' } },
    { in: { gram: '1', milyem: '995', fiyat: '3000' }, out: { 'Has altın karşılığı': '0,995 g', 'Has altın değeri': '2.985,00 TL' } },
    { in: { gram: '7', milyem: '916', iscilik: '20', fiyat: '2500' }, out: { 'Has altın karşılığı': '6,412 g', 'İşçilik dahil has karşılığı': '6,552 g', 'Has altın değeri': '16.030,00 TL', 'İşçilik dahil tutar': '16.380,00 TL' } },
    { in: { gram: '10', milyem: '1000' }, out: { 'Has altın karşılığı': '10 g', 'Ayar karşılığı': '24 ayar', 'Saflık': '%100' } },
    { in: { gram: '10', milyem: '1001' }, error: true },
    { in: { gram: '0', milyem: '916' }, error: true },
  ],
  howto: [
    '"Ağırlık" alanına ürünün ya da hurda altının gramını yazın. Taşlı ürünlerde taşların ağırlığını düşerek net altın ağırlığını girin.',
    '"Milyem" alanına ürünün damgasında yazan üç haneli değeri girin: 14 ayar için 585, 18 ayar için 750, 22 ayar için 916 gibi.',
    'Kuyumcunuz işçiliği milyem olarak belirtiyorsa bu değeri "İşçilik milyemi" alanına yazın; ürün milyemine eklenerek toplam has karşılığı bulunur.',
    'Tutarı görmek için "Gram has altın fiyatı" alanına günün has altın fiyatını girin ve "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Milyem nedir?', p: [
      'Milyem, bir altın alaşımındaki saf altın oranının binde olarak ifadesidir. Sözcük, Fransızca "binde bir" anlamındaki kelimeden gelir. 916 milyem, alaşımın 1.000 biriminden 916\'sının saf altın olduğunu anlatır. Ayar aynı oranı 24 üzerinden gösterirken milyem 1.000 üzerinden gösterir; bu yüzden daha hassastır ve kuyumculukta, rafinerilerde ve ayar evlerinde hesaplar milyemle yapılır.',
      'Altın ürünlerin üzerindeki 585, 750, 916 gibi damgalar milyem değeridir. Külçe altınlarda 995 ya da 999,9 yazar. Hurda altın alım satımında, atölyeler arası altın teslimatında ve toptan kuyum ticaretinde tüm alacak-verecek hesabı "has" üzerinden tutulur; milyem, farklı ayardaki ürünleri bu ortak birime çevirmenin anahtarıdır.',
    ] },
    { h: 'Has altın karşılığı formülü', p: [
      'Bir ürünün has karşılığı şu şekilde bulunur: <strong>Has altın (g) = Ağırlık (g) × Milyem ÷ 1000</strong>. Sonuç, o ürünün eritilip arıtılması hâlinde elde edilecek saf altın miktarını gösterir.',
      'Milyemden ayara geçmek için <strong>Ayar = Milyem × 24 ÷ 1000</strong>, ayardan milyeme geçmek için <strong>Milyem = Ayar × 1000 ÷ 24</strong> kullanılır. 750 milyem tam 18 ayardır. 916 milyem 21,98 ayar, 585 milyem 14,04 ayar eder; yani ticari damga değerleri kuramsal ayar karşılıklarına çok yakındır ama birebir aynı değildir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Elinizde 10 gram gelen 916 milyem (22 ayar) bir bilezik var. Has karşılığı 10 × 916 ÷ 1000 = <strong>9,16 gram</strong>, içindeki diğer metaller 0,84 gramdır.',
      'Bir kuyumcu atölyesi 100 gram 585 milyem hurda topladıysa bunun has karşılığı 100 × 585 ÷ 1000 = <strong>58,5 gram</strong> olur. 50 gram 750 milyem ürün ise 37,5 gram hasa denk gelir. Farklı ayardaki hurdaları toplarken gramları değil, her birinin has karşılığını toplamak gerekir: bu iki parti birlikte 150 gram çeker ama 96 gram has eder.',
    ] },
    { h: 'İşçilik milyemi nasıl çalışır?', p: [
      'Toptan kuyum ticaretinde işçilik çoğu zaman lira olarak değil, has altın cinsinden ve milyem olarak ifade edilir. Üretici, ürünün milyemine işçilik milyemini ekler ve alıcıdan toplam milyem üzerinden has altın ya da onun bedelini ister. Böylece altın fiyatı gün içinde değişse bile işçiliğin altın karşılığı sabit kalır.',
      'Örnek: 20 gramlık 916 milyem bir bilezikte işçilik 30 milyem olsun. Toplam milyem 916 + 30 = 946\'dır. Ürünün kendi has karşılığı 20 × 916 ÷ 1000 = 18,32 gram, işçiliğin has karşılığı 20 × 30 ÷ 1000 = 0,60 gram, toplam <strong>18,92 gram has</strong> eder. Gram has fiyatıyla çarpıldığında ödenecek tutar bulunur.',
      'İşçilik milyemi ürünün modeline, üretim tekniğine ve atölyeye göre değişir; sabit bir değeri yoktur. Perakende satışta işçilik çoğunlukla gram başına ya da parça başına lira olarak fiyatlanır. Araca, satıcınızın bildirdiği değeri yazın.',
    ] },
    { h: 'Sık kullanılan milyem değerleri', ul: [
      '<strong>333 milyem:</strong> 8 ayar; %33,3 saflık.',
      '<strong>585 milyem:</strong> 14 ayar; %58,5 saflık. Günlük takılarda en yaygın değer.',
      '<strong>750 milyem:</strong> 18 ayar; %75 saflık.',
      '<strong>875 milyem:</strong> 21 ayar; %87,5 saflık.',
      '<strong>916 milyem:</strong> 22 ayar; %91,6 saflık. Bilezik ve ziynet altınları.',
      '<strong>995 milyem:</strong> standart külçe ve gram altın; 24 ayar olarak anılır.',
      '<strong>999,9 milyem:</strong> yüksek saflıkta rafine külçe altın.',
    ] },
    { h: 'Bozdururken ve hurda verirken dikkat edilecekler', p: [
      'Kuyumcu hurda altını alırken önce net ağırlığı tartar, ardından milyemle çarparak has karşılığını bulur ve kendi has altın alış fiyatıyla çarpar. Bu fiyat, ekranlarda görülen satış fiyatından düşüktür. Bazı kuyumcular lehim, yay ve kirlilik payı için hesapta damga değerinden birkaç milyem düşük bir değer kullanabilir; bu yüzden aracın verdiği sonuç bir üst sınır niteliğindedir.',
      'Taş, inci, mine, çelik yay ve dolgu gibi altın olmayan kısımlar tartıdan düşülmelidir. Damgası olmayan ürünlerde milyem ancak ayar evi analiziyle ya da kuyumcunun testiyle belirlenebilir. Birkaç kuyumcudan fiyat almak ve hesabın has üzerinden nasıl yapıldığını sormak, bu sayfadaki sonuçla karşılaştırma yapmanızı sağlar.',
    ] },
    { h: 'Uyarı', p: [
      'Bu sayfa yalnızca oran hesabı yapar; güncel altın fiyatı içermez ve alım satım tavsiyesi vermez. Sonuçlar bilgilendirme amaçlıdır. Gerçek bir işlemde geçerli olan, yetkili kuyumcunun ya da ayar evinin ölçümü ve işlem anındaki fiyatlardır.',
    ] },
  ],
  faq: [
    ['Milyem nasıl hesaplanır?', 'Bir alaşımdaki saf altın ağırlığını toplam ağırlığa bölüp 1.000 ile çarparsınız. 20 gramlık bir üründe 15 gram saf altın varsa milyem 15 ÷ 20 × 1000 = 750 olur.'],
    ['916 milyem kaç ayardır?', '916 × 24 ÷ 1000 = 21,98; yani uygulamada 22 ayardır. Bilezik ve çeyrek, yarım, tam gibi ziynet altınları bu milyemdedir.'],
    ['585 milyem altın ne demek?', 'Ürünün binde 585\'inin, yani %58,5\'inin saf altın olduğu anlamına gelir. Bu değer 14 ayara karşılık gelir ve Türkiye\'de günlük kullanılan takıların çoğunda görülür.'],
    ['Has altın nedir?', 'Has, saf altın demektir. Kuyumculukta farklı ayardaki ürünler karşılaştırılırken hepsi has karşılığına çevrilir. Piyasada "has altın" fiyatı olarak anılan değer genellikle 995 milyem külçenin gram fiyatıdır.'],
    ['İşçilik milyemi nedir?', 'İşçilik bedelinin lira yerine has altın oranı olarak ifade edilmesidir. Ürün milyemine eklenir; 916 milyem ürüne 30 milyem işçilik uygulanıyorsa hesap 946 milyem üzerinden yapılır.'],
    ['Milyemi 0,916 olarak mı 916 olarak mı yazmalıyım?', 'Araç milyemi binde değeri olarak bekler; 916 yazın. 0,916 yazarsanız bu, binde bir bile olmayan çok düşük bir saflık olarak hesaplanır.'],
    ['Farklı ayarlardaki altınları nasıl toplarım?', 'Her parti için ayrı ayrı has karşılığını hesaplayın ve has miktarlarını toplayın. 100 gram 585 milyem ile 50 gram 750 milyem altın toplam 58,5 + 37,5 = 96 gram has eder.'],
    ['Girdiğim gram ve fiyat bilgileri saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız bilgiler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['altin-ayar-hesapla', 'doviz-kar-zarar-hesapla', 'kar-zarar-hesapla', 'hisse-ortalama-maliyet-hesapla', 'yatirim-getirisi-hesapla'],
};
