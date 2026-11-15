export default {
  slug: 'duvar-resim-hizalama-hesapla',
  title: 'Tablo Asma Yüksekliği ve Aralık Hesaplama',
  h1Tail: 'çivi nereye çakılır?',
  pageTitle: 'Tablo Asma Yüksekliği ve Aralık Hesaplama – Çivi Yeri Bulma',
  description: 'Tablonun yüksekliğine ve askı noktasına göre çivinin yerden kaç cm yükseğe çakılacağını bulun; yan yana tabloları duvara eşit aralıkla yerleştirin.',
  card: 'Tabloyu göz hizasına asmak için çivi yüksekliğini ve yan yana tabloların duvardaki çivi konumlarını hesaplayın.',
  category: 'gunluk',
  keywords: ['tablo asma yüksekliği', 'tablo kaç cm yüksekliğe asılır', 'çivi yeri hesaplama', 'tablo aralığı hesaplama', 'duvara tablo hizalama', 'çerçeve asma ölçüsü', 'yan yana tablo asma'],
  lead: 'Tablonun yüksekliğini ve askısının üst kenardan ne kadar aşağıda kaldığını yazın; araç, tablonun ortası <strong>göz hizasına</strong> gelecek biçimde çivinin yerden yüksekliğini verir. Duvar genişliğini ve tablo sayısını da girerseniz her çivinin sol köşeden uzaklığını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'yukseklik', label: 'Tablo yüksekliği (cm)', type: 'number', placeholder: 'Örn. 60' },
    { id: 'aski', label: 'Askı noktasının üst kenara uzaklığı (cm)', type: 'number', value: '0', hint: 'Teli ya da askıyı parmağınızla gerip tablonun üst kenarına olan mesafeyi ölçün.' },
    { id: 'merkez', label: 'Tablo ortasının yerden yüksekliği (cm)', type: 'number', value: '145', hint: 'Göz hizası için yaygın değer 145–150 cm.' },
    { id: 'duvar', label: 'Duvar genişliği (cm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 300' },
    { id: 'genislik', label: 'Tablo genişliği (cm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'adet', label: 'Yan yana tablo sayısı', type: 'number', value: '1' },
    { id: 'aralik', label: 'Tablolar arası aralık (cm, boş = eşit dağıt)', type: 'number', placeholder: 'Örn. 8' },
  ],
  compute(v, h) {
    const yuk = h.pos(v.yukseklik, 'Tablo yüksekliği');
    const aski = h.nonneg(h.opt(v.aski, 0, 'Askı uzaklığı'), 'Askı uzaklığı');
    const merkez = h.pos(v.merkez, 'Tablo ortasının yüksekliği');
    if (aski > yuk) h.err('Askı noktasının üst kenara uzaklığı tablo yüksekliğinden büyük olamaz.');
    const ust = merkez + yuk / 2;
    const alt = merkez - yuk / 2;
    if (alt < 0) h.err('Bu yükseklikte tablonun altı zemine taşıyor; orta yüksekliğini artırın ya da tablo ölçüsünü kontrol edin.');
    const civi = ust - aski;
    const rows = [
      ['Çivi yüksekliği (yerden)', h.fmt(civi, 1) + ' cm'],
      ['Tablonun üst kenarı', h.fmt(ust, 1) + ' cm'],
      ['Tablonun alt kenarı', h.fmt(alt, 1) + ' cm'],
    ];
    let note = 'Çivi yüksekliği = orta yüksekliği + tablo yüksekliğinin yarısı − askı uzaklığı. Ölçüler bitmiş zeminden alınır.';
    if (String(v.duvar ?? '').trim() !== '') {
      const duvar = h.pos(v.duvar, 'Duvar genişliği');
      const gen = h.pos(v.genislik, 'Tablo genişliği');
      const n = h.posint(v.adet, 'Tablo sayısı');
      if (n > 20) h.err('Tablo sayısı en fazla 20 olabilir.');
      const esit = String(v.aralik ?? '').trim() === '';
      let ara, kenar;
      if (esit) {
        ara = (duvar - n * gen) / (n + 1);
        kenar = ara;
      } else {
        ara = h.nonneg(v.aralik, 'Tablolar arası aralık');
        kenar = (duvar - n * gen - (n - 1) * ara) / 2;
      }
      if (kenar < -1e-9) h.err('Tablolar bu duvara sığmıyor; tablo sayısını ya da aralığı azaltın, duvar genişliğini kontrol edin.');
      const yerler = [];
      for (let i = 0; i < n; i++) yerler.push(h.fmt(kenar + gen / 2 + i * (gen + ara), 1) + ' cm');
      rows.push(['Çivi konumları (sol köşeden)', yerler.join(' · ')]);
      rows.push(['Tablolar arası boşluk', h.fmt(ara, 1) + ' cm']);
      rows.push(['Duvar kenarına kalan boşluk', h.fmt(Math.max(0, kenar), 1) + ' cm']);
      rows.push(['Grubun toplam genişliği', h.fmt(n * gen + (n - 1) * ara, 1) + ' cm']);
      note += esit ? ' Yatayda tablolar ve duvar kenarları arasındaki tüm boşluklar eşit dağıtıldı.' : ' Yatayda tablolar verilen aralıkla gruplandı ve grup duvara ortalandı.';
    }
    return { rows, note };
  },
  cases: [
    { in: { yukseklik: '60', aski: '10', merkez: '145' }, out: { 'Çivi yüksekliği (yerden)': '165 cm', 'Tablonun üst kenarı': '175 cm', 'Tablonun alt kenarı': '115 cm' } },
    { in: { yukseklik: '60', aski: '10', merkez: '145', duvar: '300', genislik: '50', adet: '3' }, out: { 'Çivi yüksekliği (yerden)': '165 cm', 'Çivi konumları (sol köşeden)': '62,5 cm · 150 cm · 237,5 cm', 'Tablolar arası boşluk': '37,5 cm' } },
    { in: { yukseklik: '60', aski: '10', merkez: '145', duvar: '300', genislik: '50', adet: '3', aralik: '10' }, out: { 'Çivi konumları (sol köşeden)': '90 cm · 150 cm · 210 cm', 'Duvar kenarına kalan boşluk': '65 cm', 'Grubun toplam genişliği': '170 cm' } },
    { in: { yukseklik: '40', aski: '0', merkez: '150' }, out: { 'Çivi yüksekliği (yerden)': '170 cm', 'Tablonun alt kenarı': '130 cm' } },
    { in: { yukseklik: '70', aski: '12,5', merkez: '145', duvar: '200', genislik: '80', adet: '1' }, out: { 'Çivi yüksekliği (yerden)': '167,5 cm', 'Çivi konumları (sol köşeden)': '100 cm', 'Duvar kenarına kalan boşluk': '60 cm' } },
    { in: { yukseklik: '30', aski: '3', merkez: '145', duvar: '180', genislik: '30', adet: '2', aralik: '6' }, out: { 'Çivi yüksekliği (yerden)': '157 cm', 'Çivi konumları (sol köşeden)': '72 cm · 108 cm' } },
    { in: { yukseklik: '60', aski: '70', merkez: '145' }, error: true },
    { in: { yukseklik: '60', aski: '10', merkez: '145', duvar: '120', genislik: '50', adet: '3' }, error: true },
    { in: { yukseklik: '', aski: '10', merkez: '145' }, error: true },
  ],
  howto: [
    'Tablonun çerçeve dahil yüksekliğini ölçüp yazın.',
    'Tabloyu ters çevirin, askı telini ya da askı halkasını asılıyken duracağı gibi yukarı doğru gerin ve en üst noktasının çerçevenin üst kenarına uzaklığını ölçün. Askı tam üst kenardaysa 0 bırakın.',
    'Tablonun ortasının yerden kaç santimetre yukarıda olmasını istediğinizi girin; karar veremiyorsanız 145 değerini kullanın.',
    'Birden çok tablo asacaksanız ya da tabloyu duvarda ortalamak istiyorsanız duvar genişliğini, tablo genişliğini ve adedi yazın. Sabit bir aralık istiyorsanız onu da girin.',
    '"Hesapla" düğmesine basın; çivi yüksekliğini yerden, çivi konumlarını duvarın sol köşesinden ölçerek kurşun kalemle işaretleyin.',
  ],
  sections: [
    { h: 'Göz hizası kuralı', p: [
      'Müze ve galerilerde eserler, ortaları ayakta duran bir yetişkinin göz hizasına gelecek biçimde asılır. Bu yükseklik uygulamada yerden yaklaşık <strong>145–150 cm</strong> olarak alınır. Kuralın güzelliği, farklı boyutlardaki tabloların hepsinde aynı çalışmasıdır: büyük tablonun da küçük tablonun da ortası aynı çizgide durduğunda duvar derli toplu görünür.',
      'Evlerde en sık yapılan hata tabloları fazla yükseğe asmaktır; çivi çakarken kol hizası göz hizasının üstünde kaldığı için el kendiliğinden yukarı kayar. Ölçüp işaretlemek bu yanılgıyı önler.',
    ] },
    { h: 'Çivi yüksekliği formülü', p: [
      'Tablonun ortası istenen yükseklikte duracaksa üst kenarı bunun yarım tablo boyu kadar yukarısındadır. Çivi ise üst kenardan askı payı kadar aşağıda kalır. Buna göre: <strong>çivi yüksekliği = orta yüksekliği + (tablo yüksekliği ÷ 2) − askı uzaklığı</strong>.',
      '<strong>Örnek:</strong> 60 cm yüksekliğindeki bir tablonun teli gerildiğinde üst kenarın 10 cm altında kalıyor ve orta 145 cm\'de isteniyor. Üst kenar 145 + 30 = 175 cm\'de, alt kenar 145 − 30 = 115 cm\'de durur. Çivi 175 − 10 = <strong>165 cm</strong> yüksekliğe çakılır.',
      'İki askı halkası olan geniş çerçevelerde aynı yüksekliği iki çivi için de kullanın ve iki işaretin aynı hizada olduğunu su terazisiyle doğrulayın.',
    ] },
    { h: 'Yan yana tabloları yerleştirmek', p: [
      'Araç iki ayrı düzen sunar. Aralık alanı boş bırakılırsa <strong>eşit dağıtım</strong> yapılır: tabloların arasındaki ve iki uçtaki boşlukların hepsi eşit olur. Boşluk = (duvar genişliği − adet × tablo genişliği) ÷ (adet + 1). 300 cm\'lik duvara 50 cm genişliğinde üç tablo için (300 − 150) ÷ 4 = 37,5 cm bulunur; çiviler sol köşeden 62,5, 150 ve 237,5 cm uzağa gelir.',
      'Aralık yazılırsa tablolar <strong>grup</strong> olarak ele alınır ve bu grup duvarda ortalanır. Aynı üç tablo 10 cm arayla asılırsa grubun genişliği 3 × 50 + 2 × 10 = 170 cm olur, iki yanda 65\'er cm boşluk kalır ve çiviler 90, 150 ve 210 cm\'ye çakılır. Bir seri oluşturan tablolar birbirine yakın durduğunda tek bir kompozisyon gibi okunur; bu nedenle iç mimarlar çoğunlukla dar ve sabit bir aralığı, sıklıkla 5–10 cm civarını tercih eder.',
      'Verilen çivi konumları her tablonun yatay ortasıdır. Askısı ortada olmayan ya da iki noktadan asılan çerçevelerde bu değerden askı noktalarına olan mesafeyi sağa ve sola taşıyın.',
    ] },
    { h: 'Mobilya üzerine asarken', p: [
      'Koltuk, konsol, şifonyer ya da yatak başı üzerine asılan tabloda yalnızca göz hizası değil, mobilyayla ilişki de önemlidir. Tablonun alt kenarı mobilyanın üstünden çok uzakta kalırsa ikisi kopuk görünür; yaygın öneri arada bir iki karış, kabaca 15–25 cm bırakmaktır. Araç tablonun alt kenarının yerden yüksekliğini verdiği için bu boşluğu hemen kontrol edebilirsiniz: koltuk sırtı 90 cm ise ve alt kenar 115 cm çıkıyorsa arada 25 cm vardır. Boşluk fazla geliyorsa orta yüksekliğini birkaç santim düşürmek, göz hizası kuralına körü körüne uymaktan daha iyi sonuç verir.',
      'Genişlik için de benzer bir oran gözetilir: tablo ya da tablo grubunun toplam genişliği, altındaki mobilyanın genişliğinin yaklaşık üçte ikisi kadar olduğunda dengeli durur. Duvar genişliği alanına duvarın tamamı yerine mobilyanın genişliğini yazarsanız tabloları mobilyaya göre ortalamış olursunuz; bu durumda konumları mobilyanın sol kenarından ölçün.',
    ] },
    { h: 'Uygulama ipuçları', ul: [
      'Yüksekliği süpürgelikten değil, bitmiş zeminden ölçün; halı varsa halının altındaki zemini esas alın.',
      'Çakmadan önce tablonun ölçüsünde bir kâğıt kesip duvara maskeleme bandıyla yapıştırın; uzaktan bakıp yerini onaylayın.',
      'Tel askılarda tel zamanla biraz esner; ölçerken teli gerçekten gergin tutun.',
      'Merdiven duvarında orta yüksekliğini her basamağın üzerinden ölçerek tabloları merdivenin eğimine paralel dizin.',
      'Çocuk odasında ya da hep oturarak bakılan bir duvarda (yemek masası yanı gibi) orta yüksekliğini 10–15 cm düşürmek daha doğal görünür.',
      'Delmeden önce duvarın içinden elektrik ya da su tesisatı geçip geçmediğini kontrol edin; priz ve anahtarların düşey ve yatay hizaları riskli bölgelerdir.',
    ] },
  ],
  faq: [
    ['Tablo yerden kaç santimetre yükseğe asılır?', 'Tablonun ortası yerden yaklaşık 145–150 cm yükseklikte olmalıdır. Çivinin yeri tablonun boyuna ve askısına göre değişir; 60 cm\'lik tabloda askı üstten 10 cm aşağıdaysa çivi 165 cm\'ye çakılır.'],
    ['Askı uzaklığını nasıl ölçerim?', 'Tabloyu yüzüstü yatırın, teli ya da ipi ortasından tutup çerçevenin üst kenarına doğru gerin. Telin en üst noktası ile çerçevenin üst kenarı arasındaki mesafe askı uzaklığıdır. Testere dişli metal askılarda dişin iç kenarını esas alın.'],
    ['İki tablo arasında kaç santimetre boşluk bırakılmalı?', 'Aynı seriden tablolar için 5–10 cm arası dar bir boşluk grubun bütün olarak algılanmasını sağlar. Büyük ve birbirinden bağımsız tablolar arasında daha geniş boşluk bırakılabilir. Araçta aralığı yazarak ya da boş bırakıp eşit dağıtarak iki düzeni de deneyebilirsiniz.'],
    ['Eşit dağıtım ile ortalanmış grup arasındaki fark nedir?', 'Eşit dağıtımda duvar kenarı dahil bütün boşluklar aynıdır; tablolar duvara yayılır. Ortalanmış grupta tablolar sizin belirlediğiniz arayla yan yana durur ve artan boşluk iki yana eşit paylaştırılır. Geniş duvarda az sayıda tablo için ikincisi genellikle daha derli toplu görünür.'],
    ['Farklı boyutlarda tabloları nasıl hizalarım?', 'Hepsinin ortasını aynı yüksekliğe getirin. Her tablo için yüksekliği ve askı uzaklığını ayrı ayrı girip çivi yüksekliğini hesaplayın; çivi yükseklikleri farklı çıkar ama tabloların orta çizgisi aynı hizada durur.'],
    ['Tavan çok yüksekse tabloyu daha yukarı mı asmalıyım?', 'Hayır; göz hizası tavana değil insana göre belirlenir. Yüksek tavanlı odalarda da 145–150 cm kuralı geçerlidir. Üstte kalan boşluğu doldurmak isterseniz daha büyük bir tablo ya da üst üste iki sıra düzen düşünebilirsiniz.'],
    ['Çivi konumları neden sol köşeden veriliyor?', 'Tek bir referans noktasından ölçmek hataların birikmesini önler. Bir tablodan diğerine ölçerek ilerlerseniz her adımdaki küçük sapma toplanır; hepsini aynı köşeden ölçtüğünüzde her çivi kendi başına doğru yere gelir.'],
    ['Yazdığım ölçüler saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; girdiğiniz ölçüler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['duvar-alani-hesapla', 'duvar-kagidi-hesapla', 'altin-oran-hesapla', 'hali-boyutu-hesapla', 'avize-boyutu-hesapla'],
};
