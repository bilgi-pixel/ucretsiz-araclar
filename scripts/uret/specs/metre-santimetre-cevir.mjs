export default {
  slug: 'metre-santimetre-cevir',
  title: 'Metre Santimetre Çevirici',
  h1Tail: 'm ↔ cm',
  pageTitle: 'Metre Santimetre Çevirici – Metreyi cm\'ye, cm\'yi Metreye Çevirme',
  description: 'Metreyi santimetreye, santimetreyi metreye çevirin. 1 metre = 100 santimetre eşitliğiyle hesaplar; milimetre, desimetre ve "metre + cm" yazımını da verir.',
  card: 'Metreyi santimetreye, santimetreyi metreye çevirin; milimetre ve "2 m 35 cm" biçimindeki yazımıyla birlikte.',
  category: 'birim',
  keywords: ['metre santimetre çevirme', '1 metre kaç cm', 'cm metre çevirme', 'santimetre kaç metre', 'm cm hesaplama', '1,5 metre kaç cm', 'uzunluk ölçüleri çevirme', '250 cm kaç metre'],
  lead: 'Bir uzunluğu metreden santimetreye ya da santimetreden metreye çevirin. Temel kural <strong>1 metre = 100 santimetre</strong> eşitliğidir; araç sonucu milimetre, desimetre ve kilometre olarak, ayrıca "2 m 35 cm" biçiminde de gösterir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Uzunluk', type: 'number', placeholder: 'Örn. 1,75' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['m', 'Metre → Santimetre'], ['cm', 'Santimetre → Metre']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Uzunluk');
    const cm = v.yon === 'cm' ? x : x * 100;
    const m = v.yon === 'cm' ? x / 100 : x;
    let tam = Math.floor(m + 1e-9);
    let kalan = Math.round((cm - tam * 100) * 10000) / 10000;
    if (kalan >= 100) { tam += 1; kalan = 0; }
    if (kalan < 0) kalan = 0;
    return {
      rows: [
        v.yon === 'cm' ? ['Metre', h.fmt(m, 6) + ' m'] : ['Santimetre', h.fmt(cm, 4) + ' cm'],
        v.yon === 'cm' ? ['Santimetre', h.fmt(cm, 4) + ' cm'] : ['Metre', h.fmt(m, 6) + ' m'],
        ['Metre ve santimetre', `${h.fmt(tam, 0)} m ${h.fmt(kalan, 4)} cm`],
        ['Milimetre', h.fmt(cm * 10, 3) + ' mm'],
        ['Desimetre', h.fmt(cm / 10, 5) + ' dm'],
        ['Kilometre', h.sig(m / 1000, 8) + ' km'],
      ],
      note: '1 m = 100 cm = 10 dm = 1.000 mm. "Metre ve santimetre" satırı, tam metre ile kalan santimetreyi ayrı yazar.',
    };
  },
  cases: [
    { in: { deger: '1,75', yon: 'm' }, out: { 'Santimetre': '175 cm', 'Metre ve santimetre': '1 m 75 cm', 'Milimetre': '1.750 mm' } },
    { in: { deger: '250', yon: 'cm' }, out: { 'Metre': '2,5 m', 'Metre ve santimetre': '2 m 50 cm', 'Desimetre': '25 dm' } },
    { in: { deger: '1', yon: 'm' }, out: { 'Santimetre': '100 cm', 'Milimetre': '1.000 mm', 'Desimetre': '10 dm', 'Kilometre': '0,001 km' } },
    { in: { deger: '1', yon: 'cm' }, out: { 'Metre': '0,01 m', 'Milimetre': '10 mm' } },
    { in: { deger: '12,345', yon: 'm' }, out: { 'Santimetre': '1.234,5 cm', 'Metre ve santimetre': '12 m 34,5 cm' } },
    { in: { deger: '99,9', yon: 'cm' }, out: { 'Metre': '0,999 m', 'Metre ve santimetre': '0 m 99,9 cm' } },
    { in: { deger: '0,05', yon: 'm' }, out: { 'Santimetre': '5 cm', 'Milimetre': '50 mm' } },
    { in: { deger: '100', yon: 'cm' }, out: { 'Metre': '1 m', 'Metre ve santimetre': '1 m 0 cm' } },
    { in: { deger: '1 m 75', yon: 'm' }, error: true },
    { in: { deger: '-5', yon: 'cm' }, error: true },
  ],
  howto: [
    '"Uzunluk" alanına sayıyı yazın. Ondalık için virgül ya da nokta kullanılabilir; yalnızca sayı girin, birim yazmayın.',
    '"Çeviri yönü" listesinden metreden santimetreye ya da santimetreden metreye seçimini yapın.',
    '"Çevir" düğmesine basın; karşılık ilk satırda görünür.',
    'Ölçüyü "kaç metre kaç santim" biçiminde söylemek istiyorsanız üçüncü satırdaki "Metre ve santimetre" değerini kullanın.',
  ],
  sections: [
    { h: 'Metre ve santimetre arasındaki ilişki', p: [
      'Metre, Uluslararası Birimler Sistemi\'nin temel uzunluk birimidir. Santimetre ise metrenin yüzde biridir; adındaki "santi" öneki Latince yüz anlamına gelen sözcükten türemiştir ve "yüzde bir" demektir. Bu yüzden iki birim arasındaki ilişki her zaman aynıdır: <strong>1 metre = 100 santimetre</strong>, <strong>1 santimetre = 0,01 metre</strong>.',
      'Metrik sistemin en büyük kolaylığı, birimler arası geçişin onun katlarıyla yapılmasıdır. İnç-feet ya da okka-dirhem gibi sistemlerde akılda tutulması gereken farklı çarpanlar varken, metrik sistemde yalnızca ondalık virgülünü kaydırmak yeter.',
    ] },
    { h: 'Çeviri kuralı: virgülü iki basamak kaydırın', p: [
      'Metreden santimetreye geçerken değer 100 ile çarpılır: <strong>cm = m × 100</strong>. Bu, virgülü iki basamak sağa kaydırmak demektir: 1,75 m → 175 cm; 0,6 m → 60 cm; 12 m → 1.200 cm.',
      'Santimetreden metreye geçerken değer 100\'e bölünür: <strong>m = cm ÷ 100</strong>. Virgül iki basamak sola kayar: 250 cm → 2,5 m; 85 cm → 0,85 m; 7 cm → 0,07 m. Tek basamaklı sayılarda başa sıfır eklemeyi unutmamak gerekir; 7 cm, 0,7 m değil 0,07 metredir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Boy:</strong> Boyu 1,75 metre olan biri kaç santimetredir? 1,75 × 100 = 175 cm. Gündelik dilde bu "bir yetmiş beş" ya da "1 metre 75 santim" diye söylenir; araç bunu "1 m 75 cm" olarak da yazar.',
      '<strong>Örnek 2 – Perde ölçüsü:</strong> Pencere genişliğini 250 cm ölçtünüz, kumaş ise metreyle satılıyor. 250 ÷ 100 = 2,5 metre; yani 2 metre 50 santimetre.',
      '<strong>Örnek 3 – Küsuratlı ölçü:</strong> 12,345 metrelik bir kablonun santimetre karşılığı 12,345 × 100 = 1.234,5 cm\'dir. Tam metre ve kalan olarak 12 m 34,5 cm eder.',
      '<strong>Örnek 4 – Küçük ölçü:</strong> 0,05 metre kaç santimetredir? 0,05 × 100 = 5 cm, yani 50 milimetre.',
    ] },
    { h: 'Uzunluk ölçüleri merdiveni', p: [
      'Okullarda uzunluk birimleri bir merdiven gibi öğretilir. Büyükten küçüğe her basamak bir öncekinin onda biridir:',
    ], ul: [
      '<strong>Kilometre (km)</strong> = 1.000 metre',
      '<strong>Hektometre (hm)</strong> = 100 metre',
      '<strong>Dekametre (dam)</strong> = 10 metre',
      '<strong>Metre (m)</strong> = temel birim',
      '<strong>Desimetre (dm)</strong> = 0,1 metre = 10 santimetre',
      '<strong>Santimetre (cm)</strong> = 0,01 metre',
      '<strong>Milimetre (mm)</strong> = 0,001 metre = 0,1 santimetre',
    ] },
    { h: 'Merdiven yöntemiyle çeviri', p: [
      'Merdivende aşağı inerken (büyük birimden küçüğe) her basamakta 10 ile çarpılır, yukarı çıkarken (küçükten büyüğe) her basamakta 10\'a bölünür. Metreden santimetreye iki basamak inildiği için 10 × 10 = 100 ile çarpılır; santimetreden metreye iki basamak çıkıldığı için 100\'e bölünür. Aynı mantıkla metreden milimetreye üç basamak inilir ve 1.000 ile çarpılır.',
      'Alan ve hacim birimlerinde çarpan değişir: 1 metrekare 100 değil 10.000 santimetrekaredir, 1 metreküp ise 1.000.000 santimetreküptür. Bir odanın alanını ya da bir kabın hacmini çevirirken uzunluk çarpanını kullanmak sık yapılan bir hatadır.',
    ] },
    { h: 'Gündelik hayatta nerelerde gerekir?', ul: [
      '<strong>Mobilya ve beyaz eşya alışverişi:</strong> Ürün ölçüleri santimetre, oda ölçüleri çoğunlukla metre ile verilir. 2,10 metrelik duvara 215 santimetrelik dolabın sığmayacağını görmek için iki ölçüyü aynı birime getirmek gerekir.',
      '<strong>Kumaş, perde ve halı:</strong> Terziler ve perdeciler ölçüyü santimetre alır, kumaş metreyle satılır.',
      '<strong>İnşaat ve tadilat:</strong> Mimari projelerde ölçüler santimetre ya da milimetre yazılır; malzeme ise metre üzerinden sipariş edilir. Süpürgelik, kartonpiyer, profil ve boru gibi boy malzemelerinde bu çeviri sürekli yapılır.',
      '<strong>Okul ödevleri:</strong> İlkokul ve ortaokul matematik derslerinde uzunluk ölçüleri konusunun temel alıştırmasıdır.',
      '<strong>Sağlık kayıtları:</strong> Boy bazı formlarda metre (1,68), bazılarında santimetre (168) olarak istenir.',
      '<strong>Kargo ve nakliye:</strong> Paket boyutları santimetre girilir; araç kasası ya da depo ölçüleri metreyle ifade edilir.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En sık görülen hata, virgülün yanlış yöne ya da tek basamak kaydırılmasıdır: 1,5 metreyi 15 cm ya da 1.500 cm sanmak gibi. Doğrusu 150 cm\'dir. İkinci hata, "1 metre 5 santim" ifadesini 1,5 metre olarak yazmaktır; oysa 1 metre 5 santimetre 1,05 metredir, 1,5 metre ise 1 metre 50 santimetredir. Sonuç kutusundaki "Metre ve santimetre" satırı bu karışıklığı önlemek için eklenmiştir.',
      'Araç yalnızca sayı kabul eder; "1 m 75" gibi birim içeren yazımlar hata verir. Negatif uzunluk da kabul edilmez. Santimetre sonuçları dört, metre sonuçları altı ondalık basamağa kadar gösterilir.',
    ] },
  ],
  faq: [
    ['1 metre kaç santimetredir?', '1 metre 100 santimetredir. Aynı uzunluk 10 desimetre ve 1.000 milimetre eder.'],
    ['1 santimetre kaç metredir?', '1 santimetre 0,01 metredir, yani metrenin yüzde biridir. 10 santimetre 0,1 metre, 50 santimetre 0,5 metre eder.'],
    ['Metreyi santimetreye nasıl çeviririm?', 'Metre değerini 100 ile çarpın ya da ondalık virgülünü iki basamak sağa kaydırın. Örneğin 2,35 metre 235 santimetredir.'],
    ['Santimetreyi metreye nasıl çeviririm?', 'Santimetre değerini 100\'e bölün ya da virgülü iki basamak sola kaydırın. Örneğin 180 santimetre 1,8 metre, 45 santimetre 0,45 metredir.'],
    ['1,5 metre kaç cm eder?', '1,5 metre 150 santimetredir; "1 metre 50 santimetre" olarak da söylenir. 1 metre 5 santimetre ise farklı bir ölçüdür ve 1,05 metreye karşılık gelir.'],
    ['Metrekareyi santimetrekareye de aynı şekilde çevirebilir miyim?', 'Hayır. Alan birimlerinde çarpan 100 değil 10.000\'dir: 1 metrekare 10.000 santimetrekare eder. Alan için metrekare santimetrekare çeviricisini kullanın.'],
    ['Santimetre ile "santim" aynı mıdır?', 'Evet, "santim" santimetrenin gündelik dildeki kısaltmasıdır. Resmî ve teknik metinlerde "santimetre" ya da "cm" yazılması doğrudur; cm simgesinden sonra nokta konmaz.'],
    ['Bu sayfa girdiğim sayıları saklıyor mu?', 'Hayır. İşlem tarayıcınızda yapılır; yazdığınız değer sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['cm-inc-cevir', 'metre-feet-cevir', 'metrekare-santimetrekare-cevir', 'mikron-mm-cevir', 'boy-feet-cm-cevir', 'birim-donustur'],
};
