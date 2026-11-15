export default {
  slug: 'bahce-topragi-hesapla',
  title: 'Bahçe Toprağı Hesaplama',
  h1Tail: 'm³, litre ve torba',
  pageTitle: 'Bahçe Toprağı Hesaplama – Kaç Metreküp, Kaç Torba Toprak?',
  description: 'Bahçe, çiçek tarhı ya da yükseltilmiş yatak için gereken toprağı metreküp, litre ve torba sayısı olarak hesaplayın; yaklaşık ağırlığı ton cinsinden görün.',
  card: 'Alan ve derinliğe göre gereken bahçe toprağını metreküp, litre, torba sayısı ve yaklaşık ton olarak bulun.',
  category: 'insaat',
  keywords: ['bahçe toprağı hesaplama', 'kaç metreküp toprak', 'toprak hacmi hesaplama', 'kaç torba toprak gerekir', 'yükseltilmiş yatak toprak hesabı', 'bitkisel toprak hesaplama', 'torf hesaplama'],
  lead: `Dolduracağınız alanın enini, boyunu ve toprak derinliğini girin; araç gereken toprağı <strong>metreküp</strong> ve <strong>litre</strong> olarak hesaplar, seçtiğiniz torba hacmine göre <strong>kaç torba</strong> alacağınızı ve dökme toprak siparişi için yaklaşık ağırlığı gösterir.`,
  button: 'Hesapla',
  inputs: [
    { id: 'en', label: 'Alanın eni (m)', type: 'number', placeholder: 'Örn. 5' },
    { id: 'boy', label: 'Alanın boyu (m)', type: 'number', placeholder: 'Örn. 4' },
    { id: 'derinlik', label: 'Toprak derinliği (cm)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'torba', label: 'Torba hacmi (litre)', type: 'number', value: '50', hint: 'Torbanın üzerinde yazan litre değerini girin (20, 40, 50, 70 L gibi).' },
    { id: 'yogunluk', label: 'Toprak yoğunluğu (ton/m³)', type: 'number', value: '1,3', hint: 'Nemli bahçe toprağı için yaklaşık değerdir; torf ve hafif karışımlarda çok daha düşüktür.' },
  ],
  compute(v, h) {
    const en = h.pos(v.en, 'Alanın eni');
    const boy = h.pos(v.boy, 'Alanın boyu');
    const d = h.pos(v.derinlik, 'Toprak derinliği');
    const torba = h.pos(v.torba, 'Torba hacmi');
    const yog = h.pos(v.yogunluk, 'Toprak yoğunluğu');
    const alan = en * boy;
    const hacim = alan * d / 100;
    const litre = hacim * 1000;
    const adet = Math.ceil(litre / torba - 1e-9);
    return {
      rows: [
        ['Gereken toprak hacmi', h.fmt(hacim, 3) + ' m³'],
        ['Litre karşılığı', h.fmt(litre, 0) + ' L'],
        ['Torba sayısı', h.fmt(adet, 0) + ' torba (' + h.fmt(torba, 1) + ' L\'lik)'],
        ['Yaklaşık ağırlık', h.fmt(hacim * yog, 2) + ' ton'],
        ['Alan', h.fmt(alan, 2) + ' m²'],
      ],
      note: 'Torba sayısı yukarı yuvarlanır. Toprak serildikten sonra oturacağı için %10–15 fazla almak yaygın bir uygulamadır; bu pay sonuca eklenmemiştir.',
    };
  },
  cases: [
    { in: { en: '5', boy: '4', derinlik: '20', torba: '50', yogunluk: '1,3' }, out: { 'Gereken toprak hacmi': '4 m³', 'Litre karşılığı': '4.000 L', 'Torba sayısı': '80 torba (50 L\'lik)', 'Yaklaşık ağırlık': '5,2 ton' } },
    { in: { en: '2', boy: '1', derinlik: '30', torba: '50', yogunluk: '1,3' }, out: { 'Gereken toprak hacmi': '0,6 m³', 'Litre karşılığı': '600 L', 'Torba sayısı': '12 torba (50 L\'lik)', 'Yaklaşık ağırlık': '0,78 ton' } },
    { in: { en: '10', boy: '10', derinlik: '10', torba: '50', yogunluk: '1,3' }, out: { 'Gereken toprak hacmi': '10 m³', 'Torba sayısı': '200 torba (50 L\'lik)', 'Yaklaşık ağırlık': '13 ton', 'Alan': '100 m²' } },
    { in: { en: '1,2', boy: '0,8', derinlik: '25', torba: '70', yogunluk: '1,3' }, out: { 'Gereken toprak hacmi': '0,24 m³', 'Litre karşılığı': '240 L', 'Torba sayısı': '4 torba (70 L\'lik)' } },
    { in: { en: '3', boy: '2', derinlik: '15', torba: '20', yogunluk: '0,5' }, out: { 'Gereken toprak hacmi': '0,9 m³', 'Torba sayısı': '45 torba (20 L\'lik)', 'Yaklaşık ağırlık': '0,45 ton' } },
    { in: { en: '5', boy: '4', derinlik: '0' }, error: true },
    { in: { en: '', boy: '4', derinlik: '20' }, error: true },
  ],
  howto: [
    'Toprak serilecek alanın enini ve boyunu metre olarak ölçüp yazın. Düzgün olmayan alanları dikdörtgenlere bölüp ayrı ayrı hesaplayın.',
    'İstediğiniz toprak kalınlığını santimetre olarak girin; çim için ince, sebze yatağı için daha kalın bir katman gerekir.',
    'Torbalı toprak alacaksanız torbanın litre değerini yazın. Dökme alacaksanız bu alanı olduğu gibi bırakabilirsiniz.',
    'Dökme toprak tonla satılıyorsa satıcıdan yoğunluk bilgisini alıp ilgili alanı güncelleyin.',
    '"Hesapla" düğmesine basın; hacmi, litre karşılığını, torba sayısını ve yaklaşık ağırlığı görün.',
  ],
  sections: [
    { h: 'Toprak miktarı nasıl hesaplanır?', p: [
      `Gereken toprak, doldurulacak boşluğun hacmidir: <strong>hacim (m³) = en (m) × boy (m) × derinlik (m)</strong>. Derinlik genellikle santimetre olarak düşünüldüğü için araç bu değeri 100'e bölerek metreye çevirir. Torbalı toprak litreyle satıldığından hacim ayrıca litreye çevrilir: 1 m³ tam 1.000 litredir. Torba sayısı, toplam litrenin torba hacmine bölünüp yukarı yuvarlanmasıyla bulunur.`,
      `Daire biçimli bir tarh için alanı π × yarıçap² ile bulup, aracın en alanına bu alanı, boy alanına 1 yazabilirsiniz. Üçgen bir köşe için taban × yükseklik ÷ 2 değerini aynı şekilde kullanın.`,
    ] },
    { h: 'Çözümlü örnekler', p: [
      `<strong>Çim öncesi dolgu:</strong> 5 m × 4 m'lik bir bahçeye 20 cm bitkisel toprak serilecek. Hacim 5 × 4 × 0,20 = 4 m³, yani 4.000 litredir. 50 litrelik torbalarla 80 torba gerekir. Bu büyüklükte bir iş için torba yerine dökme toprak sipariş etmek çok daha ekonomiktir; 1,3 ton/m³ yoğunlukla yük yaklaşık 5,2 ton eder.`,
      `<strong>Yükseltilmiş sebze yatağı:</strong> 2 m × 1 m ölçüsünde, 30 cm derinliğinde ahşap bir kasa 2 × 1 × 0,30 = 0,6 m³, yani 600 litre toprak alır. 50 litrelik torbalardan 12 adet yeter.`,
      `<strong>Balkon saksı kasası:</strong> 1,2 m × 0,8 m tabanlı, 25 cm derinliğindeki bir kasa 0,24 m³ (240 L) eder. 70 litrelik torbalardan 240 ÷ 70 = 3,43, yukarı yuvarlanınca 4 torba alınır.`,
    ] },
    { h: 'Hangi iş için ne kadar derinlik?', p: [
      `Derinlik seçimi bitkinin kök yapısına göre yapılır. Aşağıdaki aralıklar bahçecilikte sık anılan pratik değerlerdir; toprağınızın mevcut durumu ve yetiştireceğiniz türe göre değişebilir.`,
    ], ul: [
      '<strong>Çim tohumu ya da rulo çim:</strong> Mevcut zemin iyiyse 5–10 cm üst toprak, zemin moloz ya da kil ise 15–20 cm.',
      '<strong>Mevsimlik çiçek tarhları:</strong> 20–30 cm gevşek, organik maddece zengin toprak.',
      '<strong>Sebze yatakları:</strong> Yapraklı sebzeler için 20–30 cm, domates, biber, havuç gibi derin köklüler için 30–45 cm.',
      '<strong>Çalı ve süs bitkileri:</strong> 40–60 cm.',
      '<strong>Üst gübreleme ve malç:</strong> 2–5 cm ince katman.',
    ] },
    { h: 'Torba mı, dökme mi?', p: [
      `Torbalı toprak temiz, taşıması kolay ve küçük işler için pratiktir; ancak litre başına maliyeti yüksektir. Kabaca 1 m³'ün altındaki işlerde torba, üzerindeki işlerde kamyonla dökme toprak tercih edilir. Dökme toprak bazı satıcılarda metreküple, bazılarında tonla fiyatlandırılır. İkisini karşılaştırmak için yoğunluğa ihtiyaç vardır: <strong>ağırlık (ton) = hacim (m³) × yoğunluk (ton/m³)</strong>.`,
      `Yoğunluk toprağın türüne ve nemine göre çok değişir. Nemli bahçe toprağı için 1,2–1,6 ton/m³ aralığı sık anılır; araçtaki 1,3 varsayılanı bu aralıktan orta bir değerdir. Torf, kompost ve saksı harcı ise çok daha hafiftir. Kesin değer için satıcıdan kantar fişi ya da ürün bilgisi isteyin ve alandaki rakamı ona göre değiştirin.`,
    ] },
    { h: 'Oturma payı ve sık yapılan hatalar', p: [
      `Yeni serilen toprak gevşektir; sulama ve zamanla sıkışarak hacminin bir kısmını kaybeder. Bu yüzden bahçıvanlar genellikle hesaplanan miktarın %10–15 fazlasını sipariş eder. Araç bu payı sonuca kendiliğinden eklemez; isterseniz derinliği biraz yüksek girerek payı hesaba katabilirsiniz (20 cm yerine 22–23 cm gibi).`,
    ], ul: [
      'Derinliği metre yerine santimetre yazmayı unutmak ya da tersi: araç derinliği santimetre bekler.',
      'Torbanın üzerindeki kilogram değerini litre sanmak. Torbalı toprak hacimle satılır; ağırlık nem oranına göre değişir.',
      'Eğimli arazide tek bir derinlik almak. Çukur ve tümsek olan yerlerde birkaç noktadan ölçüp ortalama derinlik kullanın.',
      'Kasa ya da saksıyı ağzına kadar hesaplamak. Sulama payı için üstten 3–5 cm boşluk bırakılır.',
    ] },
    { h: 'Teras ve balkonda ağırlık uyarısı', p: [
      `Islak toprak çok ağırdır: 30 cm derinliğindeki bir yatak, metrekare başına birkaç yüz kilogram yük oluşturabilir. Teras, çatı bahçesi ya da balkon gibi taşıyıcı döşeme üzerine büyük hacimli toprak koymadan önce yapının bu yükü taşıyıp taşıyamayacağını bir inşaat mühendisine sorun; su yalıtımı ve drenaj katmanı da ayrıca planlanmalıdır. Bu sayfadaki ağırlık değeri yaklaşık bir bilgilendirmedir, statik hesap yerine geçmez.`,
    ] },
  ],
  faq: [
    ['1 metreküp toprak kaç torba eder?', '1 m³ 1.000 litredir. 50 litrelik torbadan 20, 40 litrelikten 25, 70 litrelikten 15 (14,3 yukarı yuvarlanır), 20 litrelikten 50 torba eder.'],
    ['1 metreküp toprak kaç ton gelir?', 'Türüne ve nemine bağlıdır. Nemli bahçe toprağı için kabaca 1,2–1,6 ton arası değerler anılır; torf ve kompost çok daha hafiftir. Kesin değer için satıcının verdiği yoğunluğu kullanın.'],
    ['100 metrekare bahçeye kaç metreküp toprak gerekir?', 'Derinliğe göre değişir: 5 cm için 5 m³, 10 cm için 10 m³, 20 cm için 20 m³ gerekir. Formül alan × derinlik (metre) şeklindedir.'],
    ['Yuvarlak bir saksı ya da tarh için nasıl hesaplarım?', 'Taban alanını π × yarıçap² ile bulun. Bu değeri "en" alanına, "boy" alanına 1 yazın, derinliği girin. Çapı 1 m olan bir tarhın alanı yaklaşık 0,785 m²\'dir.'],
    ['Torba hacmini bilmiyorsam ne yazmalıyım?', 'Torbanın ön ya da arka yüzünde litre (L) değeri yazar. Bulamazsanız varsayılan 50 litreyle ön fikir edinin; satın alırken etiketi kontrol edip hesabı yenileyin.'],
    ['Sonuç oturma payını içeriyor mu?', 'Hayır. Araç geometrik hacmi verir. Toprak sulandıkça çökeceği için siparişte %10–15 fazla almanız önerilir.'],
    ['Kum, çakıl ya da malç için de kullanılabilir mi?', 'Hacim ve torba hesabı aynıdır; yalnızca yoğunluk alanına o malzemenin değerini yazmanız gerekir. Kum ve çakıl için bu sitedeki ayrı hesaplayıcı daha uygun ayrıntılar sunar.'],
    ['Girdiğim ölçüler bir yere kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['cim-tohumu-hesapla', 'kum-cakil-hesapla', 'hafriyat-hesapla', 'cit-hesapla'],
};
