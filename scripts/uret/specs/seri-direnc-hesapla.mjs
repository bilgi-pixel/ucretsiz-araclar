export default {
  slug: 'seri-direnc-hesapla',
  title: 'Seri Direnç Hesaplama',
  h1Tail: 'eşdeğer direnç, akım ve gerilim düşümleri',
  pageTitle: 'Seri Direnç Hesaplama – Seri Bağlı Dirençlerin Eşdeğeri',
  description: 'Seri bağlı dirençlerin eşdeğer direncini hesaplayın. Kaynak gerilimi yazarsanız devre akımını, her direnç üzerindeki gerilim düşümünü ve gücü de görün.',
  card: 'Seri bağlı dirençlerin toplam direncini, devre akımını ve her dirençteki gerilim düşümünü hesaplayın.',
  category: 'elektrik',
  keywords: ['seri direnç hesaplama', 'seri bağlı dirençler', 'eşdeğer direnç hesaplama', 'toplam direnç', 'seri devre akım', 'seri bağlama formülü', 'direnç toplama'],
  lead: 'Uç uca bağlanmış dirençlerin <strong>eşdeğer direncini</strong> bulun. İsterseniz kaynak gerilimini de yazın; araç devreden geçen akımı, her direncin üzerine düşen gerilimi ve harcanan gücü ayrı ayrı gösterir.',
  button: 'Hesapla',
  inputs: [
    { id: 'direncler', label: 'Direnç değerleri', type: 'text', placeholder: 'Örn. 100 220 330', hint: 'Değerleri boşlukla ayırın; ondalık için virgül kullanın (4,7).', wide: true },
    { id: 'birim', label: 'Dirençlerin birimi', type: 'select', options: [['1', 'Ohm (Ω)'], ['1000', 'Kiloohm (kΩ)'], ['1000000', 'Megaohm (MΩ)']] },
    { id: 'gerilim', label: 'Kaynak gerilimi (V, isteğe bağlı)', type: 'number', placeholder: 'Örn. 12' },
  ],
  compute(v, h) {
    const carpan = Number(v.birim) || 1;
    const liste = h.nums(v.direncler, 'Direnç değerleri').map((x) => {
      if (!(x > 0)) h.err('Direnç değerleri sıfırdan büyük olmalı.');
      return x * carpan;
    });
    if (liste.length < 2) h.err('Seri bağlantı için en az iki direnç değeri yazın.');
    if (liste.length > 50) h.err('En fazla 50 direnç değeri yazabilirsiniz.');
    const toplam = liste.reduce((a, b) => a + b, 0);
    const ohmYaz = (r) => (r >= 1e6 ? h.fmt(r / 1e6, 4) + ' MΩ' : r >= 1e3 ? h.fmt(r / 1e3, 4) + ' kΩ' : h.fmt(r, 4) + ' Ω');
    const rows = [
      ['Eşdeğer direnç', h.fmt(toplam, 4) + ' Ω'],
      ['Kısa gösterim', ohmYaz(toplam)],
      ['Direnç sayısı', String(liste.length)],
      ['En büyük direnç', ohmYaz(Math.max(...liste))],
    ];
    const u = h.opt(v.gerilim, null, 'Kaynak gerilimi');
    if (u !== null) {
      if (!(u > 0)) h.err('"Kaynak gerilimi" sıfırdan büyük olmalı.');
      const akim = u / toplam;
      rows.push(['Devre akımı', h.fmt(akim * 1000, 4) + ' mA']);
      rows.push(['Toplam güç', h.fmt(u * akim, 4) + ' W']);
      rows.push(['Gerilim düşümleri', liste.map((r) => h.fmt(akim * r, 3) + ' V').join(' · ')]);
      rows.push(['Dirençlerde harcanan güç', liste.map((r) => h.fmt(akim * akim * r * 1000, 2) + ' mW').join(' · ')]);
    }
    return { rows, note: 'Dirençler ideal kabul edilir; tolerans ve bağlantı kablolarının direnci hesaba katılmaz.' };
  },
  cases: [
    { in: { direncler: '100 220 330', birim: '1' }, out: { 'Eşdeğer direnç': '650 Ω', 'Direnç sayısı': '3', 'En büyük direnç': '330 Ω' } },
    { in: { direncler: '100 200 300', birim: '1', gerilim: '12' }, out: { 'Eşdeğer direnç': '600 Ω', 'Devre akımı': '20 mA', 'Toplam güç': '0,24 W', 'Gerilim düşümleri': '2 V · 4 V · 6 V', 'Dirençlerde harcanan güç': '40 mW · 80 mW · 120 mW' } },
    { in: { direncler: '1 2,2 4,7', birim: '1000' }, out: { 'Eşdeğer direnç': '7.900 Ω', 'Kısa gösterim': '7,9 kΩ' } },
    { in: { direncler: '1 1', birim: '1000000', gerilim: '10' }, out: { 'Kısa gösterim': '2 MΩ', 'Devre akımı': '0,005 mA', 'Gerilim düşümleri': '5 V · 5 V' } },
    { in: { direncler: '10;15;25', birim: '1', gerilim: '5' }, out: { 'Eşdeğer direnç': '50 Ω', 'Devre akımı': '100 mA', 'Toplam güç': '0,5 W' } },
    { in: { direncler: '470 330', birim: '1', gerilim: '8' }, out: { 'Eşdeğer direnç': '800 Ω', 'Devre akımı': '10 mA', 'Gerilim düşümleri': '4,7 V · 3,3 V' } },
    { in: { direncler: '100', birim: '1' }, error: true },
    { in: { direncler: '100 -50', birim: '1' }, error: true },
    { in: { direncler: '', birim: '1' }, error: true },
  ],
  howto: [
    'Seri bağlı dirençlerin değerlerini "Direnç değerleri" alanına aralarında boşluk bırakarak yazın. Sıra önemli değildir, ancak gerilim düşümleri yazdığınız sırayla listelenir.',
    'Değerlerin hangi birimde olduğunu seçin. Tüm değerler aynı birimde olmalıdır; karışık değerleriniz varsa hepsini ohm olarak yazın (4,7 kΩ için 4700).',
    'Akım ve gerilim paylaşımını da görmek istiyorsanız kaynak gerilimini volt olarak girin. Yalnızca toplam direnç gerekiyorsa bu alanı boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır eşdeğer direnci ohm olarak, ikinci satır kΩ ya da MΩ kısaltmasıyla verir.',
    'Gerilim yazdıysanız alt satırlarda akımı, toplam gücü ve her direnç için gerilim düşümü ile güç değerini bulursunuz.',
  ],
  sections: [
    { h: 'Seri bağlantı ne demektir?', p: [
      'İki ya da daha fazla direnç, birinin çıkış ucu diğerinin giriş ucuna gelecek şekilde tek bir hat üzerinde arka arkaya bağlanmışsa bu bağlantıya seri bağlantı denir. Seri devrede akımın izleyebileceği tek bir yol vardır; bu yüzden bütün dirençlerden <strong>aynı akım</strong> geçer. Kaynak gerilimi ise dirençler arasında, her birinin büyüklüğüyle orantılı olarak paylaşılır.',
      'Seri bağlantının pratikteki en bilinen sonucu şudur: zincirin herhangi bir noktası koparsa akım tamamen kesilir. Eski tip yılbaşı ışık zincirlerinde tek bir ampul yandığında bütün dizinin sönmesi bu yüzdendir.',
    ] },
    { h: 'Seri direnç formülü', p: [
      'Seri bağlı dirençlerin eşdeğeri, değerlerin doğrudan toplamıdır: <strong>R<sub>eş</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + …</strong> Bunun nedeni akımın her dirençte ayrı ayrı zorlanmasıdır; engeller üst üste biner. Sonuç her zaman zincirdeki en büyük dirençten daha büyüktür. Hesabınız en büyük dirençten küçük bir sayı veriyorsa bir yerde birim hatası yapılmıştır.',
      'Kaynak gerilimi biliniyorsa Ohm kanunuyla akım bulunur: <strong>I = U ÷ R<sub>eş</sub></strong>. Her direncin üzerindeki gerilim <strong>U<sub>n</sub> = I × R<sub>n</sub></strong>, harcadığı güç ise <strong>P<sub>n</sub> = I² × R<sub>n</sub></strong> olur. Gerilim düşümlerinin toplamı kaynak gerilimine eşit çıkmalıdır; bu, Kirchhoff\'un gerilimler yasasının doğrudan sonucudur ve sonucu sınamak için iyi bir yoldur.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '12 voltluk bir kaynağa 100 Ω, 200 Ω ve 300 Ω dirençler seri bağlanmış olsun. Eşdeğer direnç 100 + 200 + 300 = 600 Ω eder. Devre akımı 12 ÷ 600 = 0,02 A, yani 20 mA\'dir.',
      'Gerilim düşümleri sırasıyla 0,02 × 100 = 2 V, 0,02 × 200 = 4 V ve 0,02 × 300 = 6 V olur; toplamları 12 V\'tur. Güçler 40 mW, 80 mW ve 120 mW, toplam güç 0,24 W çıkar. En büyük direncin hem en yüksek gerilimi hem de en yüksek gücü aldığına dikkat edin: seri devrede ısınan eleman büyük dirençtir.',
      'İkinci bir örnek: 1 kΩ, 2,2 kΩ ve 4,7 kΩ dirençlerin seri eşdeğeri 7,9 kΩ, yani 7.900 Ω\'dur. Birim olarak kiloohm seçip değerleri 1, 2,2 ve 4,7 biçiminde yazmanız yeterlidir.',
    ] },
    { h: 'Seri bağlantı nerelerde kullanılır?', ul: [
      '<strong>Elde olmayan bir değeri elde etmek:</strong> 1,5 kΩ direnç bulunamıyorsa 1 kΩ ile 470 Ω seri bağlanarak 1,47 kΩ elde edilir; çoğu devre için bu fark tolerans içindedir.',
      '<strong>Gerilimi bölmek:</strong> iki seri direncin orta noktasından, kaynak geriliminin belirli bir oranı alınır. Sensör okuma ve referans gerilimi üretmede temel yöntemdir.',
      '<strong>Akımı sınırlamak:</strong> bir LED\'in önüne konan direnç, LED ile seri bağlıdır ve akımı güvenli düzeyde tutar.',
      '<strong>Gerilim dayanımını artırmak:</strong> yüksek gerilimli ölçüm devrelerinde tek bir direnç yerine birkaç eşit direnç seri bağlanır; böylece her birine düşen gerilim azalır.',
      '<strong>Gücü dağıtmak:</strong> aynı değerde iki direnç seri bağlandığında toplam güç ikisi arasında eşit paylaşılır.',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata birimleri karıştırmaktır. 470 Ω ile 2,2 kΩ toplanırken sonuç 472,2 değil 2.670 Ω\'dur. Değerleriniz farklı birimlerdeyse hepsini ohm\'a çevirip birim listesinden "Ohm" seçin.',
      'İkinci hata, seri ve paralel bağlantının karıştırılmasıdır. Dirençlerin iki ucu da aynı iki noktaya bağlıysa bağlantı paraleldir ve toplama kuralı geçerli olmaz; o durumda eşdeğer direnç en küçük dirençten bile küçük çıkar.',
      'Üçüncü nokta güç seçimidir. Hesaplanan güç direncin anma gücüne çok yakınsa direnç aşırı ısınır. Yaygın çeyrek watt (0,25 W) dirençlerde hesaplanan gücün anma değerinin yaklaşık yarısını geçmemesi iyi bir uygulamadır.',
    ] },
    { h: 'Varsayımlar ve uyarı', p: [
      'Hesap doğru akım ve ideal dirençler için geçerlidir. Gerçek dirençlerin yüzde 1, yüzde 5 gibi toleransları vardır; seri bağlantıda mutlak hata payları toplanır. Kaynağın iç direnci, kablolar ve temas dirençleri hesaba katılmaz; çok küçük dirençlerle çalışırken bunlar sonucu belirgin biçimde değiştirebilir.',
      'Sonuçlar bilgilendirme ve eğitim amaçlıdır. Şebeke gerilimiyle çalışan ya da can ve mal güvenliğini etkileyen devrelerde tasarım ve uygulama yetkili bir elektrik ya da elektronik uzmanı tarafından yapılmalıdır.',
    ] },
  ],
  faq: [
    ['Seri bağlı dirençlerde toplam direnç nasıl bulunur?', 'Bütün direnç değerleri toplanır. 100 Ω, 220 Ω ve 330 Ω seri bağlıysa eşdeğer direnç 650 Ω olur. Kaç direnç olursa olsun kural değişmez.'],
    ['Seri devrede akım her dirençte aynı mıdır?', 'Evet. Akımın izleyeceği tek yol olduğu için bütün dirençlerden aynı akım geçer. Değişen, her direncin üzerine düşen gerilimdir.'],
    ['Seri devrede gerilim nasıl paylaşılır?', 'Her direnç, kendi değerinin toplam dirence oranı kadar gerilim alır. 12 V kaynakta 100 Ω ve 300 Ω seri bağlıysa 100 Ω üzerinde 3 V, 300 Ω üzerinde 9 V bulunur.'],
    ['Aynı değerde iki direnci seri bağlarsam ne olur?', 'Eşdeğer direnç iki katına çıkar, gerilim ikisi arasında eşit bölünür. İki adet 1 kΩ direnç seri bağlandığında 2 kΩ elde edilir.'],
    ['Seri bağlantıda hangi direnç daha çok ısınır?', 'Akım ortak olduğu için güç dirençle doğru orantılıdır; yani değeri en büyük olan direnç en çok gücü harcar ve en çok ısınır.'],
    ['Farklı birimdeki dirençleri nasıl girerim?', 'Araç tek bir birim kabul eder. Karışık değerleri ohm\'a çevirin: 2,2 kΩ için 2200, 1 MΩ için 1000000 yazın ve birim olarak "Ohm" seçin.'],
    ['Seri bağlantı toleransı nasıl etkiler?', 'Yüzde olarak tolerans aynı kalır, mutlak sapma büyür. Yüzde 5 toleranslı iki 1 kΩ direncin seri eşdeğeri 2 kΩ olup en kötü durumda 1,9 kΩ ile 2,1 kΩ arasında değişebilir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; girdiğiniz değerler hiçbir sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['paralel-direnc-hesapla', 'gerilim-bolucu-hesapla', 'ohm-kanunu-hesapla', 'direnc-renk-kodu-hesapla', 'led-direnc-hesapla'],
};
