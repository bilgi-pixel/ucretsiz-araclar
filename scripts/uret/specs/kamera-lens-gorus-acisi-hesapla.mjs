export default {
  slug: 'kamera-lens-gorus-acisi-hesapla',
  title: 'Kamera Lens Görüş Açısı Hesaplama',
  h1Tail: 'odak uzaklığı ve sensörden',
  pageTitle: 'Lens Görüş Açısı Hesaplama – Odak Uzaklığı ve Sensör Boyutu',
  description: 'Odak uzaklığı ve sensör boyutundan lensin yatay, dikey ve köşegen görüş açısını, crop faktörünü ve belirli bir mesafede kadraja giren alanı hesaplayın.',
  card: 'Odak uzaklığı ve sensör boyutundan lensin yatay, dikey ve köşegen görüş açısını ve kadraja giren alanı hesaplayın.',
  category: 'gunluk',
  keywords: ['görüş açısı hesaplama', 'lens görüş açısı', 'odak uzaklığı görüş açısı', '50mm kaç derece', 'kamera açı hesaplama', 'fov hesaplama', 'güvenlik kamerası lens açısı'],
  lead: "Bir lensin ne kadar geniş bir alanı gördüğünü hesaplayın. <strong>Odak uzaklığını</strong> yazıp sensör boyutunu seçin; araç yatay, dikey ve köşegen görüş açısını derece olarak verir. Çekim mesafesini de girerseniz kadraja giren alanın genişliğini ve yüksekliğini görürsünüz.",
  button: 'Hesapla',
  inputs: [
    { id: 'odak', label: 'Odak uzaklığı (mm)', type: 'number', placeholder: 'Örn. 50' },
    { id: 'sensor', label: 'Sensör boyutu', type: 'select', options: [['ff', 'Tam kare – 36 × 24 mm'], ['apsc', 'APS-C – 23,5 × 15,6 mm'], ['apscc', 'APS-C (dar) – 22,3 × 14,9 mm'], ['mft', 'Micro Four Thirds – 17,3 × 13 mm'], ['bir', '1 inç tip – 13,2 × 8,8 mm'], ['ozel', 'Özel ölçü (aşağıya yazın)']] },
    { id: 'sensorEn', label: 'Özel sensör eni (mm)', type: 'number', placeholder: 'Yalnızca özel ölçüde' },
    { id: 'sensorBoy', label: 'Özel sensör boyu (mm)', type: 'number', placeholder: 'Yalnızca özel ölçüde' },
    { id: 'mesafe', label: 'Çekim mesafesi (m)', type: 'number', placeholder: 'İsteğe bağlı', hint: 'Yazarsanız o mesafede kadraja giren alan hesaplanır.' },
  ],
  compute(v, h) {
    const S = { ff: [36, 24], apsc: [23.5, 15.6], apscc: [22.3, 14.9], mft: [17.3, 13], bir: [13.2, 8.8] };
    const f = h.pos(v.odak, 'Odak uzaklığı');
    let w, y;
    if (v.sensor === 'ozel') {
      w = h.pos(v.sensorEn, 'Özel sensör eni');
      y = h.pos(v.sensorBoy, 'Özel sensör boyu');
    } else {
      [w, y] = S[v.sensor] || S.ff;
    }
    const kosegen = Math.sqrt(w * w + y * y);
    const aci = (d) => 2 * Math.atan(d / (2 * f)) * 180 / Math.PI;
    const crop = Math.sqrt(36 * 36 + 24 * 24) / kosegen;
    const rows = [
      ['Yatay görüş açısı', h.fmt(aci(w), 2) + '°'],
      ['Dikey görüş açısı', h.fmt(aci(y), 2) + '°'],
      ['Köşegen görüş açısı', h.fmt(aci(kosegen), 2) + '°'],
      ['Sensör', h.fmt(w, 2) + ' × ' + h.fmt(y, 2) + ' mm (köşegen ' + h.fmt(kosegen, 2) + ' mm)'],
      ['Crop faktörü', h.fmt(crop, 2)],
      ['Tam kare eşdeğeri odak', h.fmt(f * crop, 1) + ' mm'],
    ];
    if (String(v.mesafe ?? '').trim() !== '') {
      const m = h.pos(v.mesafe, 'Çekim mesafesi');
      rows.push(['Kadraj genişliği', h.fmt(m * w / f, 2) + ' m']);
      rows.push(['Kadraj yüksekliği', h.fmt(m * y / f, 2) + ' m']);
    }
    return {
      rows,
      note: 'Açı = 2 × arctan(sensör ölçüsü ÷ (2 × odak uzaklığı)). Sonsuza odaklanmış, bozulmasız (rektilineer) lens varsayılır; balık gözü lenslerde geçerli değildir.',
    };
  },
  cases: [
    { in: { odak: '50', sensor: 'ff' }, out: { 'Yatay görüş açısı': '39,6°', 'Dikey görüş açısı': '26,99°', 'Köşegen görüş açısı': '46,79°', 'Crop faktörü': '1', 'Tam kare eşdeğeri odak': '50 mm' } },
    { in: { odak: '24', sensor: 'ff' }, out: { 'Yatay görüş açısı': '73,74°', 'Dikey görüş açısı': '53,13°', 'Köşegen görüş açısı': '84,06°' } },
    { in: { odak: '35', sensor: 'apsc' }, out: { 'Dikey görüş açısı': '25,13°', 'Köşegen görüş açısı': '43,89°', 'Crop faktörü': '1,53', 'Tam kare eşdeğeri odak': '53,7 mm' } },
    { in: { odak: '25', sensor: 'mft' }, out: { 'Yatay görüş açısı': '38,17°', 'Dikey görüş açısı': '29,15°', 'Köşegen görüş açısı': '46,81°', 'Crop faktörü': '2', 'Tam kare eşdeğeri odak': '50 mm' } },
    { in: { odak: '50', sensor: 'ff', mesafe: '10' }, out: { 'Kadraj genişliği': '7,2 m', 'Kadraj yüksekliği': '4,8 m' } },
    { in: { odak: '18', sensor: 'ozel', sensorEn: '36', sensorBoy: '24' }, out: { 'Yatay görüş açısı': '90°', 'Dikey görüş açısı': '67,38°' } },
    { in: { odak: '200', sensor: 'ff' }, out: { 'Yatay görüş açısı': '10,29°', 'Dikey görüş açısı': '6,87°', 'Köşegen görüş açısı': '12,35°' } },
    { in: { odak: '0', sensor: 'ff' }, error: true },
    { in: { odak: '50', sensor: 'ozel', sensorEn: '', sensorBoy: '' }, error: true },
    { in: { odak: 'elli', sensor: 'ff' }, error: true },
  ],
  howto: [
    'Lensin odak uzaklığını milimetre olarak yazın. Zoom lenslerde hesaplamak istediğiniz konumdaki değeri girin.',
    'Sensör boyutunu listeden seçin. Makinenizin sensörü listede yoksa "Özel ölçü" seçip en ve boyu milimetre olarak yazın.',
    'Belirli bir uzaklıkta ne kadar alanın kadraja gireceğini görmek için çekim mesafesini metre olarak girin; bu alan isteğe bağlıdır.',
    'Hesapla düğmesine basın. Yatay, dikey ve köşegen açılar derece olarak, crop faktörü ve tam kare eşdeğeri odak uzaklığıyla birlikte listelenir.',
  ],
  sections: [
    { h: 'Görüş açısı nedir ve neye bağlıdır?', p: [
      'Görüş açısı, bir kameranın sahnenin ne kadarını kadraja aldığını gösteren açıdır. İki şeye bağlıdır: lensin <strong>odak uzaklığına</strong> ve ışığın düştüğü <strong>sensörün boyutuna</strong>. Odak uzaklığı kısaldıkça açı genişler ve kadraja daha çok şey girer; uzadıkça açı daralır ve uzaktaki konu yakınlaşmış görünür. Aynı lens daha küçük bir sensörün önüne takıldığında ise görüntünün yalnızca orta bölümü kaydedilir, bu da açının daralması demektir.',
      'Bu yüzden "50 mm lens" ifadesi tek başına açıyı söylemez. Tam kare bir makinede 50 mm yaklaşık 40 derecelik yatay açıyla insan gözünün doğal algısına yakın bir görüntü verirken, aynı odak uzaklığı küçük sensörlü bir makinede kısa tele gibi davranır.',
    ] },
    { h: 'Formül ve çözümlü örnek', p: [
      'Sonsuza odaklanmış, düz çizgileri düz gösteren bir lens için görüş açısı şu formülle bulunur: <strong>açı = 2 × arctan(d ÷ (2 × f))</strong>. Burada <em>f</em> odak uzaklığı, <em>d</em> ise sensörün ilgili ölçüsüdür: yatay açı için sensör eni, dikey açı için boyu, köşegen açı için köşegen uzunluğu kullanılır.',
      'Tam kare sensör 36 × 24 mm\'dir; köşegeni 43,27 mm eder. 50 mm lens için yatay açı 2 × arctan(36 ÷ 100) = 2 × 19,80° = <strong>39,6°</strong> bulunur. Dikey açı 2 × arctan(24 ÷ 100) = 26,99°, köşegen açı 2 × arctan(43,27 ÷ 100) = 46,79° olur. Lens kataloglarında yazan açı çoğunlukla köşegen açıdır; 50 mm lens için verilen 47 derece değeri buradan gelir.',
      '24 mm geniş açı lenste aynı hesap yatay 73,74°, dikey 53,13° ve köşegen 84,06° verir. 200 mm tele lenste yatay açı yalnızca 10,29 derecedir.',
    ] },
    { h: 'Crop faktörü ve eşdeğer odak uzaklığı', p: [
      'Farklı sensörlerdeki lensleri karşılaştırmak için tam kare sensör ölçüt alınır. <strong>Crop faktörü</strong>, tam kare köşegeninin (43,27 mm) ilgili sensörün köşegenine oranıdır. 23,5 × 15,6 mm APS-C sensörde bu oran 1,53, daha dar APS-C sensörde 1,61, Micro Four Thirds sensörde 2, 1 inç tip sensörde 2,73\'tür.',
      'Odak uzaklığı crop faktörüyle çarpıldığında, tam karede aynı köşegen görüş açısını verecek odak uzaklığı bulunur. APS-C makinedeki 35 mm lens 35 × 1,53 = 53,7 mm eşdeğerindedir; yani tam karedeki 50 mm lens gibi kadraj verir. Micro Four Thirds makinedeki 25 mm lens de 50 mm eşdeğeridir. Lensin gerçek odak uzaklığı değişmez; değişen yalnızca sensörün gördüğü alandır.',
    ] },
    { h: 'Odak uzaklığına göre tam kare görüş açıları', ul: [
      '<strong>14 mm:</strong> yatay 104,25° – ultra geniş, iç mekân ve gece gökyüzü',
      '<strong>24 mm:</strong> yatay 73,74° – manzara, mimari',
      '<strong>35 mm:</strong> yatay 54,43° – sokak, belgesel',
      '<strong>50 mm:</strong> yatay 39,6° – standart, gündelik çekim',
      '<strong>85 mm:</strong> yatay 23,91° – portre',
      '<strong>135 mm:</strong> yatay 15,19° – yakın tele',
      '<strong>200 mm:</strong> yatay 10,29° – spor, sahne',
      '<strong>400 mm:</strong> yatay 5,15° – yaban hayatı, kuş',
    ] },
    { h: 'Kadraja giren alanı hesaplama', p: [
      'Çekim mesafesini girdiğinizde araç, o uzaklıkta kadrajın kapladığı genişliği ve yüksekliği verir. Hesap benzer üçgenlere dayanır: <strong>kadraj genişliği = mesafe × sensör eni ÷ odak uzaklığı</strong>. Tam karede 50 mm lensle 10 metre uzaktaki bir sahnenin 7,2 metre genişliğinde ve 4,8 metre yüksekliğinde bölümü kadraja girer.',
      'Bu bilgi çekim planlarken işe yarar: düğün salonunda kalabalık bir grubu sığdırmak için ne kadar geri çekilmeniz gerektiğini, bir ürün çekiminde masanın tamamını almak için hangi lensi seçeceğinizi ya da sahadaki bir oyuncuyu kadraja doldurmak için kaç milimetre gerektiğini önceden görebilirsiniz. Güvenlik kamerası kurulumlarında da aynı mantık geçerlidir: kameranın sensör ölçüsünü "Özel ölçü" olarak girip lens odak uzaklığını yazdığınızda, kapının ya da otoparkın kaç metresinin görüntüye gireceğini bulursunuz.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Formül, düz çizgileri düz gösteren (rektilineer) lensler için geçerlidir. Balık gözü lensler farklı bir izdüşüm kullandığından aynı odak uzaklığında çok daha geniş açı verir. Yakın mesafeye odaklanıldığında lensin etkin odak uzaklığı değiştiğinden gerçek açı hesaplanandan biraz dar olur; makro çekimde fark belirginleşir. Video çekiminde birçok makine sensörün tamamını kullanmaz; 16:9 kırpma ya da ek kırpma uygulanıyorsa "Özel ölçü" ile kullanılan alanın ölçülerini girmeniz gerekir.',
      'Üreticiler sensör ölçülerini modele göre küçük farklarla üretir; listede verilen değerler tipik ölçülerdir. Kesin sonuç için makinenizin teknik özelliklerindeki sensör boyutunu kullanın.',
    ] },
  ],
  faq: [
    ['50 mm lensin görüş açısı kaç derecedir?', 'Tam kare sensörde yatay 39,6°, dikey 26,99° ve köşegen 46,79° derecedir. APS-C sensörde aynı lens yaklaşık 26,5 derecelik yatay açıya iner.'],
    ['Görüş açısı formülü nedir?', 'Açı = 2 × arctan(sensör ölçüsü ÷ (2 × odak uzaklığı)). Yatay açı için sensör eni, dikey için boyu, köşegen için köşegen uzunluğu kullanılır.'],
    ['Crop faktörü görüş açısını nasıl etkiler?', 'Sensör küçüldükçe görüntünün yalnızca ortası kaydedilir ve açı daralır. Odak uzaklığını crop faktörüyle çarparak tam karede aynı kadrajı veren odak uzaklığını bulursunuz.'],
    ['Lens kutusunda yazan açı hangisidir?', 'Çoğunlukla köşegen görüş açısıdır. Bu yüzden katalogda 50 mm için 47 derece, 24 mm için 84 derece gibi değerler görürsünüz; yatay açılar bunlardan küçüktür.'],
    ['Telefon kamerası için hesap yapabilir miyim?', 'Evet, ancak sensörün gerçek ölçülerini ve lensin gerçek odak uzaklığını bilmeniz gerekir. Telefonlarda çoğunlukla tam kare eşdeğeri odak uzaklığı belirtilir; bu durumda eşdeğer değeri yazıp tam kare sensörü seçebilirsiniz.'],
    ['Dikey çekimde açılar değişir mi?', 'Açıların kendisi değişmez, yalnızca yer değiştirir: makineyi dikey tuttuğunuzda yatay açı olarak verilen değer dikeyde, dikey açı yatayda geçerli olur.'],
    ['Odak uzaklığını iki katına çıkarınca açı yarıya mı iner?', 'Dar açılarda yaklaşık olarak evet; geniş açılarda ilişki doğrusal değildir. Örneğin 24 mm\'den 50 mm\'ye geçişte yatay açı 73,74 dereceden 39,6 dereceye iner.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez.'],
  ],
  related: ['alan-derinligi-hesapla', 'crop-faktoru-hesapla', 'pozlama-hesapla', 'timelapse-hesapla', 'en-boy-orani-hesapla', 'derece-radyan-cevir'],
};
