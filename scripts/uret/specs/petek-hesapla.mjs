export default {
  slug: 'petek-hesapla',
  title: 'Petek (Radyatör) Hesaplama',
  h1Tail: 'oda için kaç metre petek?',
  pageTitle: 'Petek Hesaplama – Odaya Kaç Metre Radyatör Gerekir?',
  description: 'Oda ölçülerine ve yalıtım durumuna göre ısı ihtiyacını watt ve kcal/h olarak bulun, gereken panel radyatör (petek) uzunluğunu metre cinsinden hesaplayın.',
  card: 'Oda hacmi ve yalıtım durumuna göre ısı ihtiyacını ve gereken petek uzunluğunu metre olarak hesaplayın.',
  category: 'insaat',
  keywords: ['petek hesaplama', 'radyatör hesaplama', 'kaç metre petek', 'oda ısı ihtiyacı', 'petek metre hesabı', 'kombi petek hesabı', 'panel radyatör hesaplama'],
  lead: `Odanızın en, boy ve tavan yüksekliğini girin; araç oda hacmini, yaklaşık <strong>ısı ihtiyacını</strong> (watt ve kcal/h) ve bu ihtiyacı karşılayacak <strong>petek uzunluğunu</strong> metre olarak hesaplar. Sonuç bir ön keşif değeridir; kesin proje için tesisat mühendisine danışın.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Oda eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'boy', label: 'Oda boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'yukseklik', label: 'Tavan yüksekliği (m)', type: 'number', value: '2,7' },
    { id: 'yalitim', label: 'Yalıtım ve konum', type: 'select', options: [['50', 'Orta: ara kat, kısmen yalıtımlı (50 W/m³)'], ['40', 'İyi: mantolamalı, ısıcamlı (40 W/m³)'], ['60', 'Zayıf: yalıtımsız, köşe ya da çatı katı (60 W/m³)'], ['70', 'Çok zayıf: soğuk iklim, çok cepheli (70 W/m³)']] },
    { id: 'guc', label: 'Peteğin metre başına gücü (W/m)', type: 'number', value: '1700', hint: 'Ürün kataloğundaki değeri yazın; 600 mm yüksekliğinde çift panelli petekler için tipik bir değerdir.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Oda eni');
    const boy = h.pos(v.boy, 'Oda boyu');
    const yuk = h.pos(v.yukseklik, 'Tavan yüksekliği');
    const guc = h.pos(v.guc, 'Peteğin metre başına gücü');
    const kat = Number(v.yalitim) || 50;
    if (yuk > 10) h.err('Tavan yüksekliği 10 metreden büyük olamaz; değeri metre cinsinden yazın (örn. 2,7).');
    const alan = en * boy;
    const hacim = alan * yuk;
    const watt = hacim * kat;
    const metre = watt / guc;
    const yuvarlak = Math.ceil(metre * 10 - 1e-9) / 10;
    return {
      rows: [
        ['Gereken petek uzunluğu', h.fmt(yuvarlak, 1) + ' m'],
        ['Isı ihtiyacı', h.fmt(watt, 0) + ' W'],
        ['Isı ihtiyacı (kcal/h)', h.fmt(watt * 0.859845, 0) + ' kcal/h'],
        ['Oda hacmi', h.fmt(hacim, 2) + ' m³'],
        ['Taban alanı', h.fmt(alan, 2) + ' m²'],
        ['Hesaplanan uzunluk (yuvarlamadan)', h.fmt(metre, 2) + ' m'],
      ],
      note: 'Petek uzunluğu 10 cm\'lik adıma yukarı yuvarlanır. Katsayılar pratik keşif değerleridir; kesin ısı kaybı hesabı yerine geçmez.',
    };
  },
  cases: [
    { in: { en: '4', boy: '5', yukseklik: '2,7', yalitim: '50', guc: '1700' }, out: { 'Gereken petek uzunluğu': '1,6 m', 'Isı ihtiyacı': '2.700 W', 'Oda hacmi': '54 m³', 'Isı ihtiyacı (kcal/h)': '2.322 kcal/h' } },
    { in: { en: '3', boy: '4', yukseklik: '2,5', yalitim: '40', guc: '1500' }, out: { 'Gereken petek uzunluğu': '0,8 m', 'Isı ihtiyacı': '1.200 W', 'Taban alanı': '12 m²' } },
    { in: { en: '5', boy: '6', yukseklik: '3', yalitim: '60', guc: '1800' }, out: { 'Gereken petek uzunluğu': '3 m', 'Isı ihtiyacı': '5.400 W', 'Oda hacmi': '90 m³' } },
    { in: { en: '2', boy: '2', yukseklik: '2,5', yalitim: '70', guc: '1000' }, out: { 'Gereken petek uzunluğu': '0,7 m', 'Isı ihtiyacı': '700 W' } },
    { in: { en: '3,5', boy: '4', yukseklik: '2,8', yalitim: '50', guc: '1700' }, out: { 'Isı ihtiyacı': '1.960 W', 'Gereken petek uzunluğu': '1,2 m', 'Hesaplanan uzunluk (yuvarlamadan)': '1,15 m' } },
    { in: { en: '0', boy: '5', yukseklik: '2,7' }, error: true },
    { in: { en: '4', boy: 'beş', yukseklik: '2,7' }, error: true },
  ],
  howto: [
    'Odanın enini ve boyunu metre cinsinden yazın; duvardan duvara iç ölçüyü kullanın.',
    'Tavan yüksekliğini girin. Çoğu konutta 2,6–2,8 m arasındadır; yüksek tavanlı eski yapılarda mutlaka ölçün.',
    '"Yalıtım ve konum" listesinden odanıza en yakın durumu seçin. Kararsızsanız bir alt (daha zayıf) seçeneği almak güvenli tarafta kalır.',
    'Almayı düşündüğünüz peteğin metre başına ısı gücünü katalogdan bulup yazın; bilmiyorsanız varsayılan değerle ön fikir edinin.',
    '"Hesapla" düğmesine basın; gereken petek uzunluğunu, ısı ihtiyacını ve oda hacmini sonuç kutusunda görün.',
  ],
  sections: [
    { h: 'Petek hesabı nasıl yapılır?', p: [
      `Bir odayı ısıtmak için gereken güç, o odadan dışarı kaçan ısıya eşittir. Mühendislik projelerinde bu kayıp her duvar, pencere, döşeme ve tavan için ayrı ayrı hesaplanır. Ön keşifte ise yaygın ve pratik bir yol izlenir: odanın hacmi, yalıtım durumunu temsil eden bir katsayıyla çarpılır. Bu araç da aynı yöntemi kullanır: <strong>ısı ihtiyacı (W) = en × boy × yükseklik × katsayı</strong>.`,
      `İkinci adımda bulunan güç, seçtiğiniz peteğin bir metresinin verdiği güce bölünür: <strong>petek uzunluğu (m) = ısı ihtiyacı ÷ metre başına güç</strong>. Petekler genellikle 10 cm'lik adımlarla üretildiği için araç sonucu bir üst 10 cm'ye yuvarlar; yuvarlanmamış değeri de ayrı satırda gösterir.`,
    ] },
    { h: 'Çözümlü örnek', p: [
      `4 m × 5 m ölçülerinde, tavanı 2,7 m olan bir ara kat salonu düşünelim. Hacim 4 × 5 × 2,7 = 54 m³ eder. Orta yalıtım için 50 W/m³ katsayısı alınırsa ısı ihtiyacı 54 × 50 = 2.700 W, yani yaklaşık 2.322 kcal/h olur. Metre başına 1.700 W veren bir petek seçildiğinde 2.700 ÷ 1.700 = 1,59 m bulunur ve bu değer 1,6 m'ye yuvarlanır. Bu uzunluğu tek parça yerine, örneğin 80 cm'lik iki petek olarak iki ayrı pencere altına bölmek ısının odaya daha dengeli yayılmasını sağlar.`,
      `Aynı oda yalıtımsız bir çatı katında olsaydı katsayı 60 W/m³ alınır, ihtiyaç 3.240 W'a, petek uzunluğu da 2 m'ye çıkardı. Yalıtımın petek boyuna etkisi bu kadar belirgindir.`,
    ] },
    { h: 'Yalıtım katsayısını seçerken nelere bakılır?', ul: [
      '<strong>Dış duvar sayısı:</strong> Köşe odaların iki cephesi dışarıya bakar ve ısı kaybı ara odalara göre belirgin biçimde fazladır.',
      '<strong>Kat konumu:</strong> Çatı altı ve zemin (ısıtılmayan bodrum ya da toprak üstü) katlar, altı ve üstü ısıtılan ara katlardan daha fazla ısı kaybeder.',
      '<strong>Pencereler:</strong> Geniş cam yüzeyler ve tek cam doğramalar ihtiyacı artırır; ısıcamlı ve contalı doğrama azaltır.',
      '<strong>Cephe yönü:</strong> Kuzeye bakan ve rüzgâr alan odalar güney cepheli odalara göre daha zor ısınır.',
      '<strong>İklim:</strong> Kışı sert geçen iç ve doğu bölgelerde aynı oda için kıyı şeridine göre daha yüksek katsayı seçmek gerekir.',
      '<strong>Kullanım amacı:</strong> Banyoda konfor sıcaklığı daha yüksek istenir; yatak odasında bir miktar düşük tutulabilir.',
    ] },
    { h: 'Peteğin metre başına gücü neye göre değişir?', p: [
      `Bir peteğin verdiği ısı; yüksekliğine, panel ve konvektör sayısına (tek panelli, çift panelli gibi tiplere) ve içinden geçen suyun sıcaklığına bağlıdır. Kataloglarda güç değeri belirli bir su gidiş-dönüş sıcaklığı ve oda sıcaklığı için verilir. Yoğuşmalı kombilerde verim için su sıcaklığı düşük tutulduğunda aynı petek katalogdaki değerden daha az ısı verir; bu durumda petek boyunu bir miktar uzun seçmek gerekir.`,
      `Bu yüzden araçtaki "metre başına güç" alanı serbest bırakılmıştır. Varsayılan 1.700 W/m değeri, 600 mm yüksekliğindeki çift panelli peteklerde sık karşılaşılan bir büyüklüğü temsil eder; satın alacağınız modelin kendi kataloğundaki değeri yazmanız sonucu çok daha güvenilir kılar. Alçak (400–500 mm) peteklerde bu değer düşer, 900 mm gibi yüksek modellerde artar.`,
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Yalnızca metrekareye göre hesap yapmak: tavanı yüksek odalarda hacim büyür ve aynı alan için daha fazla petek gerekir.',
      'Bütün odalara aynı katsayıyı uygulamak: köşe oda ile ara oda aynı boyda olsa bile ihtiyaçları farklıdır.',
      'Peteği kalın perde, koltuk ya da dekoratif kapak arkasında bırakmak; ısı odaya yayılamaz ve hesaplanan uzunluk yetersiz kalır.',
      'Kombi kapasitesini petek toplamından bağımsız seçmek: tüm odaların ısı ihtiyacı toplanmalı, sıcak kullanım suyu gereksinimi de ayrıca değerlendirilmelidir.',
      'Açık mutfak ve salon gibi birleşik hacimleri ayrı ayrı değil tek hacim olarak hesaplamayı unutmak.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      `Bu hesap bir <strong>ön keşif</strong> aracıdır. Gerçek ısı kaybı; duvar kesitine, yalıtım kalınlığına, pencere alanına, hava sızdırmazlığına ve bulunduğunuz ilin dış tasarım sıcaklığına göre değişir. Yeni tesisat, kombi seçimi ya da merkezi sistem tasarımı gibi kararlar için yetkili bir tesisat firmasından ya da makine mühendisinden ısı kaybı hesabı isteyin. Araç, petek markası ya da fiyatı önermez; yalnızca girdiğiniz değerlerle aritmetik hesap yapar.`,
    ] },
  ],
  faq: [
    ['1 metre petek kaç metreküp alanı ısıtır?', 'Peteğin gücüne ve yalıtıma bağlıdır. Metre başına 1.700 W veren bir petek, 50 W/m³ katsayısıyla 1.700 ÷ 50 = 34 m³ hacmi karşılar; bu, 2,7 m tavanlı yaklaşık 12,6 m² bir odaya denk gelir. Yalıtım zayıfsa bu değer düşer.'],
    ['20 metrekare odaya kaç metre petek gerekir?', '2,7 m tavan yüksekliğinde 20 m² oda 54 m³ eder. Orta yalıtımda 2.700 W ihtiyaç doğar ve 1.700 W/m güçte bir petekle yaklaşık 1,6 m gerekir. İyi yalıtımda 1,3 m, yalıtımsız köşe odada 2 m civarına çıkar.'],
    ['Watt ile kcal/h arasındaki fark nedir?', 'İkisi de ısı gücü birimidir. 1 W yaklaşık 0,86 kcal/h, 1 kcal/h ise yaklaşık 1,163 W eder. Eski kataloglarda ve kombi etiketlerinde kcal/h, yenilerinde W ya da kW kullanılır; araç ikisini de gösterir.'],
    ['Peteği büyük seçmek zararlı mı?', 'Bir miktar büyük seçmek genellikle sorun olmaz; termostatik vana ile ısı kısılabilir ve düşük su sıcaklığında çalışan yoğuşmalı kombilerde verimi olumlu etkiler. Aşırı büyük seçim ise gereksiz maliyet ve yer kaybı demektir.'],
    ['Petek pencerenin altına mı konmalı?', 'Genel uygulama pencerelerin altına yerleştirmektir; camdan inen soğuk hava akımı petekten yükselen sıcak havayla karşılanır ve oda daha dengeli ısınır. Yer uygun değilse dış duvara yakın bir konum tercih edilir.'],
    ['Banyo ve mutfak için aynı hesap kullanılır mı?', 'Hacim hesabı aynıdır, ancak banyoda daha yüksek sıcaklık istendiği için bir üst katsayı seçmek yerinde olur. Mutfakta ocak ve fırından gelen ısı nedeniyle çoğu zaman bir alt katsayı yeterli olur.'],
    ['Havlupan gücü de bu hesaba girer mi?', 'Havlupanların ısı gücü aynı boydaki panel radyatörden belirgin biçimde düşüktür. Banyo için bulunan watt değerini havlupanın katalog gücüyle karşılaştırın; yetmiyorsa daha büyük model ya da ek ısıtıcı gerekir.'],
    ['Girdiğim oda ölçüleri kaydediliyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['isi-kaybi-hesapla', 'oda-hacmi-hesapla', 'mantolama-hesapla', 'duvar-alani-hesapla'],
};
