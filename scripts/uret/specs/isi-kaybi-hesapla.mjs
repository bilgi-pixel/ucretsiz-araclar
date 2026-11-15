export default {
  slug: 'isi-kaybi-hesapla',
  title: 'Duvar Isı Kaybı Hesaplama',
  h1Tail: 'U değeri ve watt',
  pageTitle: 'Duvar Isı Kaybı Hesaplama – U Değeri ve Watt Cinsinden Kayıp',
  description: 'Duvar alanı, malzeme kalınlığı, ısı iletkenliği ve sıcaklık farkından duvarın U değerini ve watt cinsinden ısı kaybını hesaplayın; yalıtımın etkisini görün.',
  card: 'Duvar kalınlığı, malzeme iletkenliği ve sıcaklık farkından U değerini ve ısı kaybını bulun; yalıtımın kazancını karşılaştırın.',
  category: 'insaat',
  keywords: ['ısı kaybı hesaplama', 'duvar u değeri hesaplama', 'ısı geçirgenlik katsayısı', 'yalıtım kalınlığı hesabı', 'duvar ısıl direnç', 'mantolama ısı kaybı', 'lambda değeri'],
  lead: 'Bir dış duvardan iletimle kaybedilen ısıyı hesaplayın. Araç, duvar ve yalıtım katmanlarının ısıl dirençlerini toplayıp <strong>U değerini</strong> bulur, ardından <strong>Q = U × A × ΔT</strong> formülüyle ısı kaybını watt olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'alan', label: 'Duvar alanı (m²)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'icSicaklik', label: 'İç sıcaklık (°C)', type: 'number', value: '20' },
    { id: 'disSicaklik', label: 'Dış sıcaklık (°C)', type: 'number', placeholder: 'Örn. -5' },
    { id: 'duvarKalinlik', label: 'Duvar kalınlığı (cm)', type: 'number', placeholder: 'Örn. 19' },
    { id: 'duvarLambda', label: 'Duvar malzemesi ısı iletkenliği λ (W/mK)', type: 'number', placeholder: 'Örn. 0,45', hint: 'Malzemenin teknik föyündeki lambda değeri; küçük değer daha iyi yalıtım demektir.' },
    { id: 'yalitimKalinlik', label: 'Yalıtım kalınlığı (cm)', type: 'number', value: '0', hint: 'Yalıtım yoksa 0 bırakın.' },
    { id: 'yalitimLambda', label: 'Yalıtım malzemesi λ (W/mK)', type: 'number', value: '0,035' },
  ],
  compute(v, h) {
    const A = h.pos(v.alan, 'Duvar alanı');
    const ti = h.num(String(v.icSicaklik ?? '').trim() === '' ? '20' : v.icSicaklik, 'İç sıcaklık');
    const td = h.num(v.disSicaklik, 'Dış sıcaklık');
    const dT = ti - td;
    if (!(dT > 0)) h.err('İç sıcaklık dış sıcaklıktan yüksek olmalı; ısı kaybı ısıtma dönemi için hesaplanır.');
    const d1 = h.pos(v.duvarKalinlik, 'Duvar kalınlığı') / 100;
    const l1 = h.pos(v.duvarLambda, 'Duvar malzemesi ısı iletkenliği');
    const d2 = h.opt(v.yalitimKalinlik, 0, 'Yalıtım kalınlığı') / 100;
    if (d2 < 0) h.err('"Yalıtım kalınlığı" negatif olamaz.');
    const l2 = d2 > 0 ? h.pos(v.yalitimLambda, 'Yalıtım malzemesi λ') : 1;
    const Ryuzey = 0.13 + 0.04;
    const R0 = Ryuzey + d1 / l1;
    const R = R0 + (d2 > 0 ? d2 / l2 : 0);
    const U = 1 / R;
    const Q = U * A * dT;
    const rows = [
      ['Isı kaybı', h.fmt(Q, 1) + ' W'],
      ['U değeri (ısı geçirgenlik katsayısı)', h.fmt(U, 3) + ' W/m²K'],
      ['Toplam ısıl direnç', h.fmt(R, 3) + ' m²K/W'],
      ['Sıcaklık farkı', h.fmt(dT, 1) + ' °C'],
      ['24 saatte kaybedilen enerji', h.fmt(Q * 24 / 1000, 2) + ' kWh'],
    ];
    if (d2 > 0) {
      const Q0 = A * dT / R0;
      rows.push(['Yalıtımsız durumda ısı kaybı', h.fmt(Q0, 1) + ' W']);
      rows.push(['Yalıtımın sağladığı azalma', '%' + h.fmt((1 - Q / Q0) * 100, 1)]);
    }
    return {
      rows,
      note: 'İç ve dış yüzey dirençleri toplam 0,17 m²K/W alınmıştır. Sıva katmanları, ısı köprüleri, pencere ve hava sızıntısı kayıpları dahil değildir.',
    };
  },
  cases: [
    { in: { alan: '20', icSicaklik: '20', disSicaklik: '-5', duvarKalinlik: '19', duvarLambda: '0,45', yalitimKalinlik: '0', yalitimLambda: '0,035' }, out: { 'Isı kaybı': '844,3 W', 'U değeri (ısı geçirgenlik katsayısı)': '1,689 W/m²K', 'Toplam ısıl direnç': '0,592 m²K/W', 'Sıcaklık farkı': '25 °C', '24 saatte kaybedilen enerji': '20,26 kWh' } },
    { in: { alan: '20', icSicaklik: '20', disSicaklik: '-5', duvarKalinlik: '19', duvarLambda: '0,45', yalitimKalinlik: '5', yalitimLambda: '0,035' }, out: { 'Isı kaybı': '247,4 W', 'U değeri (ısı geçirgenlik katsayısı)': '0,495 W/m²K', 'Toplam ısıl direnç': '2,021 m²K/W', 'Yalıtımsız durumda ısı kaybı': '844,3 W', 'Yalıtımın sağladığı azalma': '%70,7' } },
    { in: { alan: '10', icSicaklik: '20', disSicaklik: '0', duvarKalinlik: '20', duvarLambda: '2,5', yalitimKalinlik: '0', yalitimLambda: '0,035' }, out: { 'Isı kaybı': '800 W', 'U değeri (ısı geçirgenlik katsayısı)': '4 W/m²K', 'Toplam ısıl direnç': '0,25 m²K/W', '24 saatte kaybedilen enerji': '19,2 kWh' } },
    { in: { alan: '10', icSicaklik: '20', disSicaklik: '0', duvarKalinlik: '20', duvarLambda: '2,5', yalitimKalinlik: '8', yalitimLambda: '0,04' }, out: { 'Isı kaybı': '88,9 W', 'U değeri (ısı geçirgenlik katsayısı)': '0,444 W/m²K', 'Toplam ısıl direnç': '2,25 m²K/W', 'Yalıtımın sağladığı azalma': '%88,9' } },
    { in: { alan: '100', icSicaklik: '22', disSicaklik: '0', duvarKalinlik: '20', duvarLambda: '0,13', yalitimKalinlik: '0', yalitimLambda: '0,035' }, out: { 'Isı kaybı': '1.287,7 W', 'U değeri (ısı geçirgenlik katsayısı)': '0,585 W/m²K', 'Sıcaklık farkı': '22 °C' } },
    { in: { alan: '50', icSicaklik: '21', disSicaklik: '-9', duvarKalinlik: '24', duvarLambda: '0,33', yalitimKalinlik: '10', yalitimLambda: '0,035' }, out: { 'Isı kaybı': '399,5 W', 'U değeri (ısı geçirgenlik katsayısı)': '0,266 W/m²K', 'Sıcaklık farkı': '30 °C', '24 saatte kaybedilen enerji': '9,59 kWh' } },
    { in: { alan: '20', icSicaklik: '20', disSicaklik: '25', duvarKalinlik: '19', duvarLambda: '0,45' }, error: true },
    { in: { alan: '20', icSicaklik: '20', disSicaklik: '-5', duvarKalinlik: '19', duvarLambda: '0' }, error: true },
  ],
  howto: [
    'Dışarıya bakan duvarın alanını metrekare olarak yazın; pencere ve kapı boşluklarını düşmüş net alanı kullanın.',
    'Odada istediğiniz iç sıcaklığı ve hesap yapmak istediğiniz dış sıcaklığı girin. Eksi değerler için başına tire koyun.',
    'Duvarın kalınlığını santimetre, malzemesinin ısı iletkenliğini (lambda) W/mK olarak yazın.',
    'Duvarda yalıtım varsa ya da yapılması düşünülüyorsa yalıtım kalınlığını ve lambda değerini girin; yoksa kalınlığı 0 bırakın.',
    '"Hesapla" düğmesine basın. Isı kaybı, U değeri, ısıl direnç ve yalıtımlı ile yalıtımsız durum karşılaştırması görüntülenir.',
  ],
  sections: [
    { h: 'Isı kaybı formülü ve U değeri', p: [
      'Bir yapı elemanından iletimle geçen ısı üç şeye bağlıdır: elemanın ısıyı ne kadar kolay geçirdiği, yüzey alanı ve iki tarafı arasındaki sıcaklık farkı. Bu ilişki <strong>Q = U × A × ΔT</strong> formülüyle ifade edilir. Q watt cinsinden ısı kaybı, A metrekare cinsinden alan, ΔT iç ve dış sıcaklık farkıdır.',
      '<strong>U değeri</strong> (ısı geçirgenlik katsayısı), bir metrekarelik yüzeyden, iki taraf arasında bir derecelik fark varken geçen ısıyı gösterir; birimi W/m²K\'dir. U değeri ne kadar küçükse duvar o kadar iyi yalıtır. U değeri toplam ısıl direncin tersidir: <strong>U = 1 ÷ R<sub>toplam</sub></strong>.',
      'Her katmanın ısıl direnci, kalınlığının ısı iletkenliğine bölünmesiyle bulunur: <strong>R = d ÷ λ</strong>. Kalınlık metre, lambda W/mK olmalıdır. Katman dirençleri toplanır ve buna duvarın iç ve dış yüzeyindeki hava filmlerinin direnci eklenir. Araç, yatay ısı akışı için yaygın kullanılan iç yüzey direnci 0,13 ve dış yüzey direnci 0,04 m²K/W değerlerini, yani toplam 0,17 m²K/W değerini kullanır.',
    ] },
    { h: 'Çözümlü örnek: yalıtımsız tuğla duvar', p: [
      '20 m² alanında, 19 cm kalınlığında ve ısı iletkenliği 0,45 W/mK olan bir tuğla duvar düşünelim. İçerisi 20 °C, dışarısı −5 °C olsun.',
    ], ol: [
      'Duvarın ısıl direnci: 0,19 ÷ 0,45 = 0,422 m²K/W.',
      'Toplam direnç: 0,17 + 0,422 = 0,592 m²K/W.',
      'U değeri: 1 ÷ 0,592 = 1,689 W/m²K.',
      'Sıcaklık farkı: 20 − (−5) = 25 °C.',
      'Isı kaybı: 1,689 × 20 × 25 = <strong>844,3 W</strong>.',
      'Bu koşullar 24 saat sürerse kaybedilen enerji 844,3 × 24 ÷ 1000 = 20,26 kWh olur.',
    ] },
    { h: 'Aynı duvara 5 cm yalıtım eklenirse', p: [
      'Yukarıdaki duvarın dışına ısı iletkenliği 0,035 W/mK olan 5 cm yalıtım levhası uygulandığını varsayalım. Yalıtımın direnci 0,05 ÷ 0,035 = 1,429 m²K/W\'dir; tek başına tuğla duvarın direncinin üç katından fazladır. Toplam direnç 0,592 + 1,429 = 2,021 m²K/W\'ye, U değeri 0,495 W/m²K\'ye iner. Isı kaybı 0,495 × 20 × 25 = <strong>247,4 W</strong> olur. Yalıtım, bu duvardaki iletim kaybını <strong>%70,7</strong> azaltmıştır.',
      'Dikkat çekici nokta şudur: 5 santimetrelik yalıtım, 19 santimetrelik duvardan çok daha fazla direnç sağlar. Çünkü direnç yalnızca kalınlığa değil, kalınlığın lambda değerine oranına bağlıdır. Betonarme perde gibi iletkenliği yüksek elemanlarda fark daha da çarpıcıdır: 20 cm betonarmenin (λ = 2,5) direnci yalnızca 0,08 m²K/W\'dir ve yüzey dirençleriyle birlikte U değeri 4 W/m²K\'ye ulaşır.',
    ] },
    { h: 'Lambda değerini nereden bulurum?', p: [
      'Isı iletkenliği malzemenin yoğunluğuna, gözenek yapısına ve nem durumuna göre değişir; kesin değer ürünün teknik föyünde ya da ambalajında yazar. Aşağıdaki aralıklar yalnızca fikir vermesi için yaklaşık değerlerdir; hesabınızda kullanacağınız ürünün beyan edilen değerini esas alın.',
    ], ul: [
      '<strong>Betonarme:</strong> yaklaşık 2,0–2,5 W/mK',
      '<strong>Doğal taş:</strong> türüne göre yaklaşık 1,5–3,5 W/mK',
      '<strong>Yatay delikli tuğla duvar:</strong> yaklaşık 0,33–0,50 W/mK',
      '<strong>Bims (pomza) blok:</strong> yaklaşık 0,15–0,30 W/mK',
      '<strong>Gazbeton:</strong> yaklaşık 0,09–0,16 W/mK',
      '<strong>Taş yünü ve cam yünü:</strong> yaklaşık 0,035–0,040 W/mK',
      '<strong>EPS (genleştirilmiş polistiren):</strong> yaklaşık 0,035–0,040 W/mK',
      '<strong>XPS (haddelenmiş polistiren):</strong> yaklaşık 0,030–0,035 W/mK',
    ] },
    { h: 'Yalıtım kalınlığını artırmanın getirisi azalır', p: [
      'Isı kaybı direncin tersiyle orantılı olduğundan, eklenen her santimetre yalıtım bir öncekinden daha az kazanç sağlar. Örnekteki tuğla duvarda ilk 5 cm yalıtım kaybı 844 watttan 247 watta indirirken, kalınlığı 10 cm\'ye çıkarmak kaybı yaklaşık 145 watta düşürür: ikinci 5 santimetrenin katkısı 100 watt civarındadır. Bu nedenle en uygun kalınlık; iklim, yakıt maliyeti ve yalıtım malzemesi fiyatı birlikte değerlendirilerek seçilir. Araçta kalınlığı değiştirip sonuçları karşılaştırarak bu eğriyi kendi duvarınız için görebilirsiniz.',
    ] },
    { h: 'Bu hesabın kapsamadığı kayıplar', p: [
      'Bir binanın toplam ısı kaybı yalnızca duvarlardan oluşmaz. Pencereler ve kapılar, çatı ve tavan, zemin ve bodrum döşemesi ayrı ayrı hesaplanması gereken yüzeylerdir; her birinin kendi U değeri vardır. Ayrıca kolon, kiriş ve balkon döşemesi gibi yalıtımın kesintiye uğradığı noktalardaki <strong>ısı köprüleri</strong> ile kapı ve pencere aralıklarından sızan soğuk hava önemli kayıp kalemleridir. Havalandırma yoluyla giden ısı da toplam ihtiyacın içindedir.',
      'Araç iç ve dış sıvayı ayrı katman olarak almaz; bu katmanların direnci küçüktür ve sonucu güvenli tarafta bırakır. İsterseniz sıva kalınlığını duvar kalınlığına ekleyerek yaklaşık bir düzeltme yapabilirsiniz. Nemli duvarın iletkenliği kuru hâline göre belirgin biçimde yüksektir; su alan duvarlarda gerçek kayıp hesaplanandan fazla olur.',
    ] },
    { h: 'Sonuç nasıl yorumlanmalı? Uyarı', p: [
      'Bulunan watt değeri, girdiğiniz sıcaklık farkı sürdüğü sürece o duvardan sürekli kaçan ısıl güçtür. Kombi ya da radyatör gücü seçerken bütün dış yüzeylerin ve havalandırmanın kaybı toplanır; tek bir duvarın sonucu cihaz seçimi için yeterli değildir. Bu araç bilgilendirme ve karşılaştırma amaçlıdır; mühendislik hesabının ve enerji kimlik belgesi çalışmasının yerini tutmaz. Yeni binalarda ve tadilatlarda uyulması gereken en büyük U değerleri ilgili ısı yalıtım standardı ve yönetmeliklerle iklim bölgesine göre belirlenir; güncel mevzuatı kontrol edin ve tasarım için bir makine ya da inşaat mühendisine danışın.',
    ] },
  ],
  faq: [
    ['U değeri nedir?', 'U değeri, bir yapı elemanının bir metrekaresinden, iki tarafı arasında bir derece sıcaklık farkı varken geçen ısıl güçtür. Birimi W/m²K\'dir. Değer küçüldükçe eleman ısıyı daha az geçirir, yani daha iyi yalıtır.'],
    ['U değeri nasıl hesaplanır?', 'Her katmanın kalınlığı (metre) lambda değerine bölünerek ısıl direnci bulunur, dirençler toplanır, iç ve dış yüzey dirençleri (toplam 0,17 m²K/W) eklenir. U değeri bu toplamın tersidir. 19 cm, λ = 0,45 olan duvar için U = 1 ÷ (0,17 + 0,422) = 1,689 W/m²K\'dir.'],
    ['Lambda (λ) ile U değeri arasındaki fark nedir?', 'Lambda malzemenin kendisine ait bir özelliktir ve kalınlıktan bağımsızdır. U değeri ise belirli kalınlıklardaki katmanlardan oluşan bütün bir duvarın performansını gösterir. Aynı malzemeden yapılmış kalın duvarın U değeri ince duvardan düşüktür.'],
    ['5 cm yalıtım ne kadar tasarruf sağlar?', 'Duvarın mevcut durumuna bağlıdır. 19 cm tuğla duvarda λ = 0,035 olan 5 cm yalıtım iletim kaybını yaklaşık %70,7 azaltır. Bu oran yalnızca o duvardan geçen ısı içindir; binanın toplam yakıt tüketimindeki düşüş pencere, çatı ve hava sızıntısı kayıplarına bağlı olarak daha küçüktür.'],
    ['Hangi dış sıcaklığı yazmalıyım?', 'Cihaz gücü için bölgenizin en soğuk dönemine ait tasarım sıcaklığı kullanılır. Ortalama tüketimi tahmin etmek istiyorsanız kış aylarının ortalama sıcaklığını yazmak daha anlamlıdır.'],
    ['Isı kaybı yazın da hesaplanabilir mi?', 'Formül aynıdır, yalnızca ısı akışının yönü tersine döner; bu durumda ısı kazancından söz edilir. Araç ısıtma dönemi için tasarlandığından iç sıcaklığın dış sıcaklıktan yüksek olmasını ister. Yazın duvara gelen güneş ışınımı ayrıca hesaba katılması gereken ek bir yüktür.'],
    ['Sonuç neden kombimin gücünden çok küçük?', 'Çünkü yalnızca tek bir duvarın iletim kaybını gösterir. Kombi gücü; bütün dış duvarlar, pencereler, çatı, zemin, havalandırma kaybı ve sıcak kullanım suyu ihtiyacı birlikte düşünülerek belirlenir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; yazdığınız değerler hiçbir sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['mantolama-hesapla', 'petek-hesapla', 'duvar-alani-hesapla', 'oda-hacmi-hesapla', 'gazbeton-hesapla'],
};
