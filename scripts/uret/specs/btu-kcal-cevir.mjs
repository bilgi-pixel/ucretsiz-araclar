export default {
  slug: 'btu-kcal-cevir',
  title: 'BTU Kilokalori Çevirici',
  h1Tail: 'BTU ↔ kcal',
  pageTitle: 'BTU Kilokalori Çevirici – BTU\'dan kcal\'ye, kcal\'den BTU\'ya',
  description: 'BTU değerini kilokaloriye, kilokaloriyi BTU\'ya çevirin. 1 BTU ≈ 0,252 kcal eşitliğiyle çalışır; kombi ve klima kapasitelerinde BTU/h ile kcal/h için de geçerlidir.',
  card: 'BTU\'yu kilokaloriye, kilokaloriyi BTU\'ya çevirin; kombi, kazan ve klima kapasitelerini kJ ve Wh karşılığıyla karşılaştırın.',
  category: 'birim',
  keywords: ['btu kcal çevirme', 'kcal btu dönüştürme', '1 btu kaç kcal', '1 kcal kaç btu', 'btu kilokalori', 'kcal/h btu/h', 'kombi kcal btu', 'btu kalori hesaplama'],
  lead: 'Isı miktarını BTU ile kilokalori (kcal) arasında çevirin. <strong>1 BTU ≈ 0,252 kcal</strong> ve <strong>1 kcal ≈ 3,968 BTU</strong> eşitlikleri kullanılır; aynı oran saatlik kapasiteler (BTU/h ↔ kcal/h) için de geçerlidir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 20000', hint: 'Binlik ayraç kullanmadan yazın (20000). Tek noktalı yazım ondalık sayılır.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['btu', 'BTU → Kilokalori'], ['kcal', 'Kilokalori → BTU']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Değer');
    const KJ_BTU = 1.05505585262; // 1 BTU (IT) kaç kJ
    const KJ_KCAL = 4.1868; // 1 kcal (IT) kaç kJ
    const kj = v.yon === 'kcal' ? x * KJ_KCAL : x * KJ_BTU;
    const kcalRow = ['Kilokalori', h.fmt(kj / KJ_KCAL, 4) + ' kcal'];
    const btuRow = ['BTU', h.fmt(kj / KJ_BTU, 4) + ' BTU'];
    return {
      rows: [
        ...(v.yon === 'kcal' ? [btuRow, kcalRow] : [kcalRow, btuRow]),
        ['Kilojoule', h.fmt(kj, 4) + ' kJ'],
        ['Watt-saat', h.fmt(kj / 3.6, 4) + ' Wh'],
      ],
      note: 'Uluslararası tablo tanımları kullanılır: 1 BTU = 1055,056 J, 1 kcal = 4186,8 J. Aynı oran BTU/h ile kcal/h arasında da geçerlidir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'btu' }, out: { 'Kilokalori': '0,252 kcal', 'Kilojoule': '1,0551 kJ', 'Watt-saat': '0,2931 Wh' } },
    { in: { deger: '1', yon: 'kcal' }, out: { 'BTU': '3,9683 BTU', 'Kilojoule': '4,1868 kJ' } },
    { in: { deger: '1000', yon: 'btu' }, out: { 'Kilokalori': '251,9958 kcal' } },
    { in: { deger: '12000', yon: 'btu' }, out: { 'Kilokalori': '3.023,9491 kcal' } },
    { in: { deger: '1000', yon: 'kcal' }, out: { 'BTU': '3.968,3207 BTU' } },
    { in: { deger: '20000', yon: 'kcal' }, out: { 'BTU': '79.366,4144 BTU', 'Kilokalori': '20.000 kcal' } },
    { in: { deger: '0', yon: 'btu' }, out: { 'Kilokalori': '0 kcal' } },
    { in: { deger: 'yirmi bin', yon: 'kcal' }, error: true },
    { in: { deger: '-1', yon: 'btu' }, error: true },
  ],
  howto: [
    'Çevirmek istediğiniz ısı miktarını ya da saatlik kapasiteyi "Değer" alanına ayraçsız olarak yazın.',
    'Elinizdeki değer BTU ise "BTU → Kilokalori", kcal ise "Kilokalori → BTU" yönünü seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında kilojoule ve watt-saat değerleri görünür.',
    'Saatlik kapasite çeviriyorsanız (BTU/h ya da kcal/h) sonuçtaki sayıyı aynen kullanın; yalnızca birimin sonuna "/saat" eklemeniz yeterlidir.',
  ],
  sections: [
    { h: 'İki ısı birimi: BTU ve kilokalori', p: [
      'BTU ve kilokalori aynı mantıkla tanımlanmış iki ısı birimidir; aralarındaki fark kullandıkları ölçü sistemidir. Kilokalori, bir kilogram suyun sıcaklığını bir santigrat derece yükselten ısıdır. BTU ise bir libre suyun sıcaklığını bir Fahrenheit derece yükselten ısıdır. Libre kilogramdan, Fahrenheit derecesi santigrat derecesinden küçük olduğu için BTU kilokalorinin yaklaşık dörtte biri kadardır.',
      'Bu benzerlik dönüşüm katsayısını da açıklar. Bir libre 0,45359237 kg, bir Fahrenheit derecelik fark ise 5/9 santigrat derecedir. İkisini çarptığınızda 0,45359237 × 5 ÷ 9 = 0,251996 bulunur; yani <strong>1 BTU ≈ 0,252 kcal</strong>. Tersinden <strong>1 kcal ≈ 3,968 BTU</strong>.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Formüller: <strong>kcal = BTU × 0,251996</strong> ve <strong>BTU = kcal × 3,968321</strong>. Kafadan hesapta BTU değerini 4\'e bölmek ya da kcal değerini 4 ile çarpmak yüzde birin altında hatayla sonuç verir.',
      '<strong>Örnek 1:</strong> 12.000 BTU kaç kcal eder? 12000 × 0,251996 = 3023,9491 kcal. Bu, 12 bin BTU\'luk bir klimanın bir saatte ortamdan çektiği ısının kilokalori karşılığıdır.',
      '<strong>Örnek 2:</strong> 20.000 kcal/h kapasiteli bir kombi kaç BTU/h eder? 20000 × 3,968321 = 79.366,4144 BTU/h.',
      '<strong>Örnek 3:</strong> 1000 BTU, 251,9958 kcal\'dir; 1000 kcal ise 3968,3207 BTU eder.',
    ] },
    { h: 'BTU/h ve kcal/h: kapasite birimleri', p: [
      'Isıtma ve soğutma cihazlarında söylenen değerler çoğunlukla enerji değil, saatlik ısı aktarımıdır. Klimalar BTU/h, eski tip kombi, kazan, soba ve şofbenler kcal/h ile anılır; yeni etiketlerde ise her ikisinin yerine kilovat kullanılır. İki birimin paydası aynı (saat) olduğu için dönüşüm katsayısı değişmez: 1 BTU/h ≈ 0,252 kcal/h.',
      'Bu sayede farklı cihaz türlerini aynı ölçekte görebilirsiniz. Örneğin 24.000 BTU/h bir salon tipi klima yaklaşık 6048 kcal/h ısı taşır; 20.000 kcal/h bir kombi ise yaklaşık 79.366 BTU/h, yani 23,26 kW ısı üretebilir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1 BTU</strong> ≈ 0,252 kcal ≈ 1,0551 kJ',
      '<strong>1 kcal</strong> ≈ 3,9683 BTU = 4,1868 kJ',
      '<strong>9000 BTU</strong> ≈ 2268 kcal',
      '<strong>12.000 BTU</strong> ≈ 3024 kcal',
      '<strong>18.000 BTU</strong> ≈ 4536 kcal',
      '<strong>24.000 BTU</strong> ≈ 6048 kcal',
      '<strong>10.000 kcal</strong> ≈ 39.683 BTU',
      '<strong>24.000 kcal</strong> ≈ 95.240 BTU',
    ] },
    { h: 'Hangi kalori, hangi BTU?', p: [
      'Hem kalorinin hem BTU\'nun birbirine çok yakın birkaç tanımı vardır. Bu araç, ısıtma-soğutma mühendisliğinde yaygın olan uluslararası tablo (IT) tanımlarını kullanır: 1 BTU = 1055,056 J ve 1 kcal = 4186,8 J. Beslenmede kullanılan termokimyasal kilokalori (4184 J) ile hesap yapılırsa sonuç yaklaşık on binde yedi oranında değişir; 1 BTU bu durumda 0,25216 kcal olur. Cihaz kapasitesi karşılaştırmalarında bu fark önemsizdir.',
      'Dikkat edilmesi gereken bir başka nokta, bazı ABD kaynaklarında görülen "MBH" ve "MMBtu" kısaltmalarıdır. Bu yazımlarda M harfi Roma rakamıyla bini gösterir: MBH saatte bin BTU, MMBtu ise bir milyon BTU demektir. Çevirmeden önce değeri düz BTU\'ya açmanız gerekir.',
    ] },
    { h: 'Kullanım senaryoları', p: [
      'Klimayla ısıtma ile kombiyle ısıtmayı karşılaştırmak isteyen biri, klimanın BTU/h değerini kcal/h\'ye çevirerek iki cihazın ısı kapasitesini aynı birimde görebilir. Yurt dışı kaynaklı bir şömine, kazan ya da brülör kataloğunda BTU/h olarak verilen kapasiteyi yerli ürünlerin kcal/h değerleriyle eşleştirmek de aynı işlemi gerektirir.',
      'Yakıtların ısıl değerleri de bu birimlerle verilir. Türkçe kaynaklarda doğal gaz, kömür ve odunun ısıl değeri kcal ile, uluslararası enerji istatistiklerinde ise BTU ile ifade edilir. Yakıtın gerçek ısıl değeri kaynağa ve kaliteye göre değiştiği için bu sayfada sabit bir değer verilmemiştir; hesap yaparken faturanızdaki ya da tedarikçinizin bildirdiği değeri kullanın.',
    ] },
    { h: 'Sınırlar ve uyarı', p: [
      'Araç yalnızca birim çevirir; cihaz verimini, ısı kaybını ya da bir mekânın ısı ihtiyacını hesaplamaz. Kapasite ile yakıt ya da elektrik tüketimi aynı şey değildir. Cihaz seçimi ve projelendirme için yetkili servise ya da tesisat mühendisine danışın; sonuçlar bilgilendirme amaçlıdır.',
    ] },
  ],
  faq: [
    ['1 BTU kaç kcal eder?', '1 BTU yaklaşık 0,252 kilokaloridir. Daha hassas değer 0,251996 kcal\'dir.'],
    ['1 kcal kaç BTU eder?', '1 kilokalori yaklaşık 3,968 BTU eder. Pratikte 4 ile çarpmak yaklaşık sonuç için yeterlidir.'],
    ['12000 BTU kaç kcal eder?', '12.000 BTU yaklaşık 3024 kcal\'dir. Klima kapasitesi olarak 12.000 BTU/h, saatte 3024 kcal ısı aktarımına karşılık gelir.'],
    ['BTU/h değerini kcal/h\'ye çevirmek için ayrı bir katsayı gerekir mi?', 'Hayır. Her iki birim de saat başına olduğundan katsayı aynıdır: 1 BTU/h yaklaşık 0,252 kcal/h eder.'],
    ['24.000 kcal kombi kaç BTU eder?', '24.000 kcal/h yaklaşık 95.240 BTU/h\'dir. Kilovat karşılığı yaklaşık 27,9 kW\'tır.'],
    ['Buradaki kcal ile gıda etiketindeki kcal aynı mı?', 'Büyüklük olarak neredeyse aynıdır; aralarında on binde yedi düzeyinde tanım farkı vardır. Bu araç ısıtma-soğutma hesaplarında kullanılan tanımı esas alır; besin değeri çevirileri için kilokalori–kilojoule çeviricisi daha uygundur.'],
    ['Küçük kaloriyi (cal) nasıl çeviririm?', 'Küçük kalori, kilokalorinin binde biridir. Değeri 1000\'e bölüp kcal olarak girin; 1 BTU yaklaşık 252 cal eder.'],
    ['Yazdığım değerler saklanıyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar hiçbir sunucuya gönderilmez.'],
  ],
  related: ['btu-kw-cevir', 'klima-btu-hesapla', 'kombi-kapasite-hesapla', 'kwh-kcal-cevir', 'kcal-kj-cevir'],
};
