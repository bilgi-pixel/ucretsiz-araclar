export default {
  slug: 'bugunku-deger-hesapla',
  title: 'Bugünkü Değer (PV) Hesaplama',
  h1Tail: 'gelecekteki paranın bugünkü karşılığı',
  pageTitle: 'Bugünkü Değer (PV) Hesaplama – Gelecekteki Paranın Bugünkü Değeri',
  description: 'Gelecekte alınacak ya da ödenecek tutarı, iskonto oranını ve süreyi girin; paranın bugünkü değerini (PV), iskonto tutarını ve iskonto faktörünü hesaplayın.',
  card: 'İleride alacağınız ya da ödeyeceğiniz bir tutarın bugünkü değerini (PV) iskonto oranına göre hesaplayın.',
  category: 'finans',
  keywords: ['bugünkü değer hesaplama', 'pv hesaplama', 'şimdiki değer hesaplama', 'bugünkü değer formülü', 'iskonto faktörü', 'present value hesaplama', 'paranın bugünkü değeri'],
  lead: 'Üç yıl sonra alacağınız 100.000 TL bugün kaç lira eder? Gelecekteki tutarı, iskonto (indirgeme) oranını ve süreyi yazın; araç <strong>bugünkü değeri (PV)</strong> ve aradaki farkı hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'gelecek', label: 'Gelecekteki tutar (TL)', type: 'number', placeholder: 'Örn. 100000' },
    { id: 'oran', label: 'Yıllık iskonto oranı (%)', type: 'number', placeholder: 'Örn. 40', hint: 'Beklenen getiri, faiz ya da enflasyon oranı' },
    { id: 'sure', label: 'Süre (yıl)', type: 'number', placeholder: 'Örn. 3' },
    { id: 'siklik', label: 'Bileşiklenme dönemi', type: 'select', options: [['1', 'Yıllık'], ['2', 'Altı aylık'], ['4', 'Üç aylık'], ['12', 'Aylık'], ['365', 'Günlük']] },
  ],
  compute(v, h) {
    const FV = h.pos(v.gelecek, 'Gelecekteki tutar');
    const oran = h.num(v.oran, 'Yıllık iskonto oranı');
    const yil = h.nonneg(v.sure, 'Süre');
    const m = Number(v.siklik);
    if (![1, 2, 4, 12, 365].includes(m)) h.err('Listeden geçerli bir bileşiklenme dönemi seçin.');
    if (oran <= -100) h.err('İskonto oranı −%100\'den büyük olmalı.');
    if (oran > 10000) h.err('İskonto oranı %10.000\'den büyük olamaz; değeri kontrol edin.');
    if (yil > 200) h.err('Süre en fazla 200 yıl olabilir.');
    const i = oran / 100 / m;
    if (i <= -1) h.err('Dönem oranı −%100 ya da altına düşüyor; oranı kontrol edin.');
    const N = yil * m;
    const faktor = Math.pow(1 + i, -N);
    const PV = FV * faktor;
    if (!Number.isFinite(PV)) h.err('Sonuç gösterilemeyecek kadar büyük; oranı ya da süreyi kontrol edin.');
    return {
      rows: [
        ['Bugünkü değer (PV)', h.para(PV)],
        ['İskonto tutarı (FV − PV)', h.para(FV - PV)],
        ['İskonto faktörü', h.fmt(faktor, 6)],
        ['Bugünkü değerin gelecekteki tutara oranı', '%' + h.fmt(faktor * 100, 2)],
        ['Dönem sayısı', h.fmt(N, 2)],
        ['Dönem oranı', '%' + h.fmt(i * 100, 5)],
      ],
      note: 'PV = FV ÷ (1 + i)^n. Oranın süre boyunca sabit kaldığı varsayılır; vergi ve masraflar dikkate alınmaz.',
    };
  },
  cases: [
    { in: { gelecek: '1210', oran: '10', sure: '2', siklik: '1' }, out: { 'Bugünkü değer (PV)': '1.000,00 TL', 'İskonto tutarı (FV − PV)': '210,00 TL', 'İskonto faktörü': '0,826446' } },
    { in: { gelecek: '10000', oran: '8', sure: '5', siklik: '1' }, out: { 'Bugünkü değer (PV)': '6.805,83 TL', 'İskonto faktörü': '0,680583', 'Bugünkü değerin gelecekteki tutara oranı': '%68,06' } },
    { in: { gelecek: '1000', oran: '10', sure: '1', siklik: '1' }, out: { 'Bugünkü değer (PV)': '909,09 TL' } },
    { in: { gelecek: '1000000', oran: '40', sure: '3', siklik: '1' }, out: { 'Bugünkü değer (PV)': '364.431,49 TL', 'İskonto faktörü': '0,364431' } },
    { in: { gelecek: '100000', oran: '8', sure: '2', siklik: '4' }, out: { 'Bugünkü değer (PV)': '85.349,04 TL', 'Dönem sayısı': '8', 'Dönem oranı': '%2' } },
    { in: { gelecek: '5000', oran: '0', sure: '3', siklik: '1' }, out: { 'Bugünkü değer (PV)': '5.000,00 TL', 'İskonto faktörü': '1' } },
    { in: { gelecek: '100000', oran: '50', sure: '2', siklik: '1' }, out: { 'Bugünkü değer (PV)': '44.444,44 TL', 'İskonto tutarı (FV − PV)': '55.555,56 TL' } },
    { in: { gelecek: '100000', oran: '42', sure: '1', siklik: '12' }, out: { 'Bugünkü değer (PV)': '66.178,33 TL' } },
    { in: { gelecek: '0', oran: '10', sure: '2', siklik: '1' }, error: true },
    { in: { gelecek: '1000', oran: '-100', sure: '2', siklik: '1' }, error: true },
    { in: { gelecek: '1000', oran: '10', sure: '-1', siklik: '1' }, error: true },
  ],
  howto: [
    '"Gelecekteki tutar" alanına ileride elinize geçecek ya da ödeyeceğiniz parayı yazın (vadeli alacak, senet, ikramiye, hedef birikim gibi).',
    '"Yıllık iskonto oranı" alanına paranızı değerlendirebileceğiniz yıllık getiri oranını ya da alım gücü hesabı için beklenen enflasyonu girin.',
    'Paranın kaç yıl sonra alınacağını yazın; ay için 12\'ye bölün (6 ay = 0,5 yıl).',
    'Oranın nasıl bileşiklendiğini seçin; emin değilseniz "Yıllık" bırakın.',
    '"Hesapla" düğmesine basın. İlk satır, gelecekteki tutarın bugünkü karşılığıdır.',
  ],
  sections: [
    { h: 'Bugünkü değer (PV) nedir?', p: [
      'Bugünkü değer, gelecekte alınacak ya da ödenecek bir paranın bugünkü karşılığıdır. Şimdiki değer olarak da adlandırılır, İngilizce "present value" ifadesinden PV ile kısaltılır. Temel fikir basittir: bugün elinizde olan parayı faize yatırabilir ya da bir işte değerlendirebilirsiniz; bu yüzden yarın alınacak 100 lira, bugünkü 100 liradan daha az değerlidir.',
      'Gelecekteki tutarı bugüne taşıma işlemine <strong>iskonto etme</strong> ya da indirgeme, kullanılan orana da iskonto oranı denir. Soruyu şöyle de sorabilirsiniz: "Belirli bir oranla değerlendirdiğimde, vade sonunda bu tutara ulaşmak için bugün ne kadar param olmalı?"',
    ] },
    { h: 'Bugünkü değer formülü', p: [
      'Formül, bileşik faiz formülünün tersidir: <strong>PV = FV ÷ (1 + i)<sup>n</sup></strong>. FV gelecekteki tutar, i dönem oranı (yıllık oran ÷ yıldaki dönem sayısı), n dönem sayısıdır. 1 ÷ (1 + i)<sup>n</sup> ifadesine <strong>iskonto faktörü</strong> denir; gelecekteki 1 liranın bugün kaç lira ettiğini gösterir ve finans tablolarında hazır olarak verilir.',
      'Oran ya da süre arttıkça iskonto faktörü küçülür, yani gelecekteki para bugün daha az eder. Oran sıfırsa faktör 1\'dir ve bugünkü değer gelecekteki tutara eşittir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> 5 yıl sonra alınacak 10.000 TL\'nin yıllık %8 iskonto oranıyla bugünkü değeri: (1,08)<sup>5</sup> = 1,469328; iskonto faktörü 1 ÷ 1,469328 = 0,680583. PV = 10.000 × 0,680583 = <strong>6.805,83 TL</strong>. Başka bir deyişle bugün 6.805,83 TL\'yi yıllık %8 ile değerlendirirseniz beş yıl sonra 10.000 TL\'niz olur.',
      '<strong>Örnek 2:</strong> 3 yıl sonra ödenecek 1.000.000 TL, yıllık %40 oranla bugün 1.000.000 ÷ (1,40)<sup>3</sup> = 1.000.000 ÷ 2,744 = <strong>364.431,49 TL</strong> eder. Yüksek oranlarda gelecekteki paranın bugünkü karşılığı hızla erir: tutarın neredeyse üçte ikisi iskonto olarak düşmüştür.',
      '<strong>Örnek 3 – Dönemli bileşiklenme:</strong> 2 yıl sonra alınacak 100.000 TL, yıllık %8 nominal oran ve üç aylık bileşiklenmeyle indirgenirse dönem oranı %2, dönem sayısı 8 olur. PV = 100.000 ÷ (1,02)<sup>8</sup> = <strong>85.349,04 TL</strong>.',
    ] },
    { h: 'İskonto oranı nasıl seçilir?', p: [
      'Sonucu belirleyen en önemli girdi iskonto oranıdır ve tek bir doğru değeri yoktur; amaca göre seçilir:',
    ], ul: [
      '<strong>Alternatif getiri:</strong> Parayı bugün alsaydınız güvenle elde edebileceğiniz getiri (örneğin mevduat ya da devlet tahvili faizi). Vadeli bir teklifi peşin teklifle karşılaştırırken en yaygın seçimdir.',
      '<strong>Borçlanma maliyeti:</strong> Parayı kredi ile finanse ediyorsanız kredinin yıllık maliyeti.',
      '<strong>Enflasyon:</strong> Gelecekteki tutarın bugünkü alım gücünü görmek istiyorsanız beklenen yıllık enflasyon oranı.',
      '<strong>Beklenen getiri ya da sermaye maliyeti:</strong> İşletmeler yatırım projelerinde, riske göre belirledikleri asgari getiri oranını kullanır. Risk arttıkça oran yükseltilir.',
    ] },
    { h: 'Nerelerde kullanılır?', ul: [
      '<strong>Peşin – vadeli karşılaştırması:</strong> "Bugün 90.000 TL mi, bir yıl sonra 120.000 TL mi?" sorusunda vadeli tutarı bugüne indirip peşin tutarla kıyaslamak.',
      '<strong>Çek ve senet değerlemesi:</strong> Vadesi gelmemiş bir alacağın bugünkü ekonomik değerini görmek.',
      '<strong>Hedef birikim:</strong> Belirli bir tarihte ihtiyaç duyulacak tutar için bugün toplu olarak ne kadar ayırmak gerektiğini bulmak.',
      '<strong>Tazminat ve uzun vadeli sözleşmeler:</strong> İleri tarihli ödemelerin bugünkü karşılığını tahmin etmek.',
      '<strong>Eğitim:</strong> Finans, muhasebe ve mühendislik ekonomisi derslerindeki paranın zaman değeri sorularını doğrulamak.',
    ] },
    { h: 'Hızlı başvuru: 1 yıl sonraki 100.000 TL\'nin bugünkü değeri', ul: [
      'Yıllık %10 iskonto → 90.909,09 TL',
      'Yıllık %20 iskonto → 83.333,33 TL',
      'Yıllık %30 iskonto → 76.923,08 TL',
      'Yıllık %40 iskonto → 71.428,57 TL',
      'Yıllık %50 iskonto → 66.666,67 TL',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç tek bir gelecekteki tutarı indirger. Farklı tarihlerde birden çok ödeme varsa her birini ayrı ayrı indirgemek ya da net bugünkü değer aracını kullanmak gerekir. Hesap, iskonto oranının tüm süre boyunca sabit olduğunu varsayar ve vergi, masraf ya da tahsil edememe riskini içermez. Bankaların çek ve senet kırdırırken kullandığı dış iskonto yöntemi bu formülden farklıdır. Sonuçlar bilgilendirme amaçlıdır; önemli mali kararlarda uzman görüşü alın.',
    ] },
  ],
  faq: [
    ['Bugünkü değer nasıl hesaplanır?', 'Gelecekteki tutar, bir artı dönem oranının dönem sayısı kadar kuvvetine bölünür: PV = FV ÷ (1 + i) üzeri n. Örneğin iki yıl sonraki 1.210 TL, %10 oranla 1.210 ÷ 1,21 = 1.000 TL eder.'],
    ['Bugünkü değer ile şimdiki değer aynı mı?', 'Evet. Her ikisi de İngilizce present value (PV) teriminin Türkçe karşılığıdır; ders kitaplarında ve mesleki metinlerde ikisi de kullanılır.'],
    ['İskonto faktörü ne işe yarar?', 'Gelecekteki 1 liranın bugünkü değerini verir. Tutarı bu faktörle çarparak doğrudan bugünkü değere ulaşırsınız. Örneğin %8 ve 5 yıl için faktör 0,680583\'tür; 10.000 TL\'nin bugünkü değeri 6.805,83 TL olur.'],
    ['İskonto oranı yükselirse bugünkü değer neden düşer?', 'Çünkü yüksek oran, paranızı bugün daha yüksek getiriyle değerlendirebileceğiniz anlamına gelir; aynı gelecekteki tutara ulaşmak için bugün daha az para yeterlidir. Dolayısıyla beklemenin maliyeti artar ve gelecekteki para bugün daha az eder.'],
    ['Enflasyona göre bugünkü değeri nasıl bulurum?', 'İskonto oranı alanına beklenen yıllık enflasyonu yazın. Sonuç, gelecekteki tutarın bugünkü fiyatlarla alım gücünü gösterir. Örneğin yıllık %50 enflasyonla iki yıl sonraki 100.000 TL bugünün 44.444,44 TL\'sine denktir.'],
    ['Süre tam yıl olmak zorunda mı?', 'Hayır. Ondalıklı süre girebilirsiniz: 6 ay için 0,5, 18 ay için 1,5 yazın. Süreye 0 yazarsanız bugünkü değer gelecekteki tutara eşit çıkar.'],
    ['Birden fazla ödemenin bugünkü değerini nasıl hesaplarım?', 'Her ödemeyi kendi vadesiyle ayrı ayrı hesaplayıp sonuçları toplayabilirsiniz. Yıllık düzenli nakit akışları için net bugünkü değer aracı bu işlemi tek seferde yapar.'],
    ['Yazdığım tutarlar kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['gelecek-deger-hesapla', 'net-bugunku-deger-hesapla', 'pesin-vadeli-karsilastir', 'cek-senet-iskonto-hesapla', 'bilesik-faiz-hesapla', 'enflasyon-hesapla'],
};
