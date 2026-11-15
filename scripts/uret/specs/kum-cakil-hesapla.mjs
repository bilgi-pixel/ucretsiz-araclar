export default {
  slug: 'kum-cakil-hesapla',
  title: 'Kum Çakıl Miktarı Hesaplama',
  h1Tail: 'm³ ve ton',
  pageTitle: 'Kum Çakıl Hesaplama – Kaç m³, Kaç Ton Malzeme Gerekir?',
  description: 'Serilecek alanın boyunu, enini ve kalınlığını girin; gereken kum, çakıl, mıcır ya da stabilize miktarını metreküp ve ton olarak sıkışma payıyla hesaplayın.',
  card: 'Alan ve kalınlıktan gereken kum, çakıl, mıcır ya da stabilize miktarını m³ ve ton olarak bulun.',
  category: 'insaat',
  keywords: ['kum hesaplama', 'çakıl hesaplama', 'mıcır hesaplama', 'kaç ton kum gerekir', '1 m3 kum kaç ton', 'stabilize hesaplama', 'kum çakıl miktarı'],
  lead: "Bir alana belirli kalınlıkta serilecek <strong>kum, çakıl, mıcır ya da stabilize</strong> malzemenin hacmini ve ağırlığını hesaplayın. Sıkışma ve fire payı sipariş miktarına otomatik eklenir.",
  button: 'Hesapla',
  inputs: [
    { id: 'boy', label: 'Alanın boyu (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'en', label: 'Alanın eni (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'kalinlik', label: 'Serim kalınlığı (cm)', type: 'number', placeholder: 'Örn. 10' },
    { id: 'malzeme', label: 'Malzeme', type: 'select', options: [['1600', 'Kum (yaklaşık 1600 kg/m³)'], ['1700', 'Çakıl (yaklaşık 1700 kg/m³)'], ['1500', 'Mıcır / kırma taş (yaklaşık 1500 kg/m³)'], ['1800', 'Stabilize dolgu (yaklaşık 1800 kg/m³)']] },
    { id: 'ozel', label: 'Özel yoğunluk (kg/m³)', type: 'number', placeholder: 'Boş bırakılabilir', hint: 'Satıcının verdiği gevşek birim ağırlığı biliyorsanız yazın.' },
    { id: 'pay', label: 'Sıkışma ve fire payı (%)', type: 'number', value: '10' },
  ],
  compute(v, h) {
    const a = h.pos(v.boy, 'Alanın boyu');
    const b = h.pos(v.en, 'Alanın eni');
    const k = h.pos(v.kalinlik, 'Serim kalınlığı');
    const p = h.nonneg(v.pay, 'Sıkışma ve fire payı');
    const ro = String(v.ozel ?? '').trim() === '' ? Number(v.malzeme) : h.pos(v.ozel, 'Özel yoğunluk');
    if (k > 300) h.err('Serim kalınlığı santimetre olarak yazılmalı; 300 cm üzeri değerler için ölçüyü kontrol edin.');
    const alan = a * b;
    const net = alan * k / 100;
    const siparis = net * (1 + p / 100);
    const ton = siparis * ro / 1000;
    return {
      rows: [
        ['Gerekli miktar', h.fmt(ton, 2) + ' ton'],
        ['Sipariş hacmi (paylı)', h.fmt(siparis, 2) + ' m³'],
        ['Net hacim', h.fmt(net, 2) + ' m³'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
        ['Metrekareye düşen miktar', h.fmt(ton * 1000 / alan, 1) + ' kg/m²'],
      ],
      note: 'Yoğunluklar gevşek (dökme) malzeme için yaklaşık değerlerdir; nem ve tane boyutu ağırlığı belirgin biçimde değiştirir.',
    };
  },
  cases: [
    { in: { boy: '5', en: '4', kalinlik: '10' }, out: { 'Gerekli miktar': '3,52 ton', 'Sipariş hacmi (paylı)': '2,2 m³', 'Net hacim': '2 m³', 'Alan': '20 m²', 'Metrekareye düşen miktar': '176 kg/m²' } },
    { in: { boy: '10', en: '3', kalinlik: '5', malzeme: '1700', pay: '0' }, out: { 'Gerekli miktar': '2,55 ton', 'Sipariş hacmi (paylı)': '1,5 m³', 'Net hacim': '1,5 m³' } },
    { in: { boy: '20', en: '6', kalinlik: '15', malzeme: '1800', pay: '20' }, out: { 'Gerekli miktar': '38,88 ton', 'Sipariş hacmi (paylı)': '21,6 m³', 'Net hacim': '18 m³' } },
    { in: { boy: '8', en: '2,5', kalinlik: '4', malzeme: '1500', pay: '5' }, out: { 'Gerekli miktar': '1,26 ton', 'Sipariş hacmi (paylı)': '0,84 m³', 'Net hacim': '0,8 m³' } },
    { in: { boy: '1', en: '1', kalinlik: '100', ozel: '1450', pay: '0' }, out: { 'Gerekli miktar': '1,45 ton', 'Net hacim': '1 m³', 'Metrekareye düşen miktar': '1.450 kg/m²' } },
    { in: { boy: '12', en: '10', kalinlik: '10', malzeme: '1600', pay: '10' }, out: { 'Gerekli miktar': '21,12 ton', 'Sipariş hacmi (paylı)': '13,2 m³' } },
    { in: { boy: '5', en: '4', kalinlik: '-3' }, error: true },
    { in: { boy: '5', en: '', kalinlik: '10' }, error: true },
  ],
  howto: [
    "Malzeme serilecek alanın boyunu ve enini metre olarak yazın. Alan düzgün dikdörtgen değilse parçalara bölüp her parçayı ayrı hesaplayabilirsiniz.",
    "Serim kalınlığını <strong>santimetre</strong> olarak girin. Sıkıştırma sonrasında elde etmek istediğiniz bitmiş kalınlığı yazın.",
    "Listeden malzemeyi seçin. Ocaktan ya da satıcıdan aldığınız birim ağırlık değeri varsa \"Özel yoğunluk\" alanına yazarak listedeki değerin yerine kullanın.",
    "Sıkışma ve fire payını işinize göre ayarlayıp \"Hesapla\" düğmesine basın. Sipariş edilecek miktar ton ve metreküp olarak görünür.",
  ],
  sections: [
    { h: 'Hesabın mantığı', p: [
      "Dökme malzemeler hacimle serilir, çoğu zaman ağırlıkla satılır. Bu yüzden iki adımlı bir hesap gerekir. Önce hacim bulunur: <strong>hacim (m³) = boy × en × kalınlık</strong>. Kalınlık santimetre girildiği için 100'e bölünerek metreye çevrilir. Ardından hacim, malzemenin gevşek birim ağırlığıyla çarpılır: <strong>ağırlık (ton) = hacim × yoğunluk ÷ 1000</strong>.",
      "Serilen malzeme tokmak ya da silindirle sıkıştırıldığında oturur; ayrıca taşıma ve serme sırasında bir miktarı zayi olur. Bitmiş kalınlığı tutturabilmek için hesaplanan net hacmin üzerine bir pay eklenir. Araç bu payı yüzde olarak alır ve sipariş hacmini net hacim × (1 + pay ÷ 100) biçiminde bulur.",
    ] },
    { h: 'Çözümlü örnek', p: [
      "5 m × 4 m ölçüsünde bir zemine kilit taşı altı için 10 cm kum serilecek olsun. Alan 20 m², net hacim 20 × 0,10 = 2 m³'tür. Yüzde 10 payla sipariş hacmi 2,2 m³ olur. Kumun gevşek birim ağırlığı 1600 kg/m³ alınırsa gereken miktar 2,2 × 1600 = 3520 kg, yani <strong>3,52 ton</strong> eder. Metrekareye düşen miktar 3520 ÷ 20 = 176 kg'dır.",
      "Aynı alana 15 cm stabilize dolgu serilseydi net hacim 3 m³ olurdu. Stabilize malzeme sıkıştırıldığında belirgin biçimde oturduğundan payı yüzde 20 almak daha gerçekçi olur; bu durumda 3,6 m³, yaklaşık 6,48 ton malzeme gerekir.",
    ] },
    { h: 'Malzemelerin yaklaşık birim ağırlıkları', p: [
      "Birim ağırlık; tane boyutuna, taşın cinsine ve özellikle neme göre değişir. Aşağıdaki değerler gevşek dökme malzeme için yaygın kullanılan yaklaşık rakamlardır:",
    ], ul: [
      "<strong>Kuru kum:</strong> yaklaşık 1500–1700 kg/m³. Islak kum belirgin biçimde daha ağırdır.",
      "<strong>Çakıl (dere malzemesi):</strong> yaklaşık 1600–1800 kg/m³.",
      "<strong>Mıcır (kırma taş):</strong> köşeli taneler arasında boşluk fazla olduğundan yaklaşık 1400–1600 kg/m³.",
      "<strong>Stabilize / karışık dolgu:</strong> ince ve iri taneler birbirini doldurduğu için yaklaşık 1700–1900 kg/m³.",
    ] },
    { h: 'Hangi iş için ne kadar kalınlık?', p: [
      "Kalınlık zeminin taşıma gücüne ve üzerinden geçecek yüke göre belirlenir; aşağıdakiler yalnızca sık karşılaşılan uygulama aralıklarıdır. Kilit taşı ve parke taşı altındaki yatak kumu genellikle 3–5 cm serilir. Bahçe yürüyüş yollarında dekoratif çakıl 4–6 cm yeterli olur; daha kalın serildiğinde yürümek zorlaşır. Araç girişleri ve otoparklarda sıkıştırılmış temel tabakası çoğunlukla 15–25 cm arasında tutulur. Drenaj hendeklerinde ise boru çevresine iri çakıl doldurulur ve hacim hendek kesitine göre hesaplanır.",
    ] },
    { h: 'Sipariş verirken dikkat edilecekler', ul: [
      "<strong>Satış birimini sorun:</strong> bazı ocaklar tonla, bazı nakliyeciler metreküp ya da \"kamyon\" hesabıyla satar. Araç iki değeri de verdiği için karşılaştırma yapabilirsiniz.",
      "<strong>Nem farkı:</strong> yağış sonrası alınan kumun tonu daha az hacim eder. Tonla alıyorsanız kuru havada teslim almak avantajlıdır.",
      "<strong>Zemin düzgünlüğü:</strong> altı bozuk zeminlerde çukurlar da dolacağından gerçek tüketim hesaptan fazla çıkar; payı artırın.",
      "<strong>Tek seferde teslim:</strong> eksik kalan birkaç yüz kilo için ikinci bir nakliye ücreti ödemek, baştan biraz fazla almaktan pahalıya gelir.",
      "<strong>Tane boyutu:</strong> yatak kumu, sıva kumu, beton agregası ve drenaj çakılı farklı elek aralıklarındadır; yalnızca miktarı değil cinsini de belirtin.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç düz ve eşit kalınlıkta serilen tabakalar içindir. Eğim verilerek serilen ya da kalınlığı değişen yüzeylerde ortalama kalınlığı kullanın. Yoğunluk değerleri yaklaşık olduğundan ton sonucu bir kestirimdir; kesin miktar teslimattaki kantar fişiyle belli olur. Beton karışımı için gereken kum ve çakıl oranları ayrı bir hesaptır; bu araç karışım tasarımı yapmaz. Yük taşıyacak zeminlerde tabaka kalınlıkları ve malzeme seçimi için bir inşaat mühendisine danışın.",
    ] },
  ],
  faq: [
    ['1 metreküp kum kaç ton eder?', "Kuru ve gevşek kum için metreküp başına yaklaşık 1,5–1,7 ton alınır; araçta 1,6 ton kullanılmıştır. Islak kum daha ağırdır ve değer 1,9 tona kadar çıkabilir."],
    ['1 ton çakıl kaç metreküp eder?', "Birim ağırlık 1700 kg/m³ alınırsa 1 ton çakıl yaklaşık 0,59 m³ eder. 10 cm kalınlıkta serildiğinde bu miktar kabaca 5,9 m² alanı kaplar."],
    ['Sıkışma payını yüzde kaç almalıyım?', "Yalnızca tesviye edilen ince kum yataklarında yüzde 5–10 çoğunlukla yeterlidir. Silindirle sıkıştırılan stabilize ve temel tabakalarında yüzde 15–25 arası paylar kullanılır. Zemin bozuksa payı yüksek tutun."],
    ['Dairesel bir alan için nasıl hesaplarım?', "Dairenin alanını π × yarıçap² ile bulun. Sonra boy alanına bu alanı, en alanına 1 yazarak aynı hacmi elde edebilirsiniz. Örneğin yarıçapı 2 m olan daire 12,57 m²'dir."],
    ['Torbalı kum için kaç torba gerekir?', "Bulunan ağırlığı torba ağırlığına bölün. 500 kg kum için 25 kg'lık torbalardan 20 adet gerekir. Büyük miktarlarda dökme malzeme torbalıya göre çok daha ekonomiktir."],
    ['Mıcır neden çakıldan hafif görünüyor?', "Taşın kendisi hafif değildir; kırma taşın köşeli taneleri birbirine tam oturmadığı için aralarında daha fazla boşluk kalır. Aynı hacimde daha az taş bulunduğundan dökme birim ağırlığı düşer."],
    ['Beton için gereken kum ve çakılı bu araç verir mi?', "Hayır. Beton ve harçta malzeme oranları karışım reçetesine bağlıdır. Bu araç yalnızca serilecek tabakanın hacmini ve ağırlığını hesaplar; karışımlar için harç karışımı ve çimento araçlarına bakın."],
    ['Girdiğim bilgiler saklanıyor mu?', "Hayır. Hesaplama tarayıcınızın içinde yapılır; ölçüleriniz herhangi bir sunucuya gönderilmez, kaydedilmez."],
  ],
  related: ['kilit-tasi-hesapla', 'hafriyat-hesapla', 'bahce-topragi-hesapla', 'harc-karisim-hesapla', 'asfalt-hesapla'],
};
