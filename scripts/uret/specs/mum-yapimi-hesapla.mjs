export default {
  slug: 'mum-yapimi-hesapla',
  title: 'Mum Yapımı Mum ve Esans Miktarı Hesaplama',
  h1Tail: 'kaç gram mum, kaç gram esans?',
  pageTitle: 'Mum Yapımı Hesaplama – Kaba Göre Mum ve Esans Miktarı (Gram)',
  description: 'Kap hacmine ve kap sayısına göre kaç gram mum ve kaç gram esans gerektiğini hesaplayın. Soya, parafin ve balmumu için yoğunluk ve esans oranı ayarlanabilir.',
  card: 'Kavanoz hacmi ve adedine göre eritilecek mum ile eklenecek esansın gramını bulun; soya, parafin ve balmumuna uygun.',
  category: 'gunluk',
  keywords: ['mum yapımı hesaplama', 'mum esans oranı', 'kaç gram mum gerekir', 'soya mumu hesaplama', 'kokulu mum esans miktarı', 'mum kavanozu kaç gram mum alır', 'mum yapımı ölçüleri'],
  lead: 'Dolduracağınız kabın hacmini, kaç kap hazırlayacağınızı ve esans oranını yazın. Araç, kabı dolduracak toplam karışımın ağırlığını bulur ve bunu <strong>eritilecek mum</strong> ile <strong>eklenecek esans</strong> olarak gram cinsinden ikiye ayırır.',
  button: 'Hesapla',
  inputs: [
    { id: 'hacim', label: 'Bir kabın dolum hacmi (ml)', type: 'number', placeholder: 'Örn. 200', hint: 'Kabı doldurmak istediğiniz seviyeye kadar su koyup ölçebilirsiniz.' },
    { id: 'adet', label: 'Kap sayısı', type: 'number', value: '1' },
    { id: 'oran', label: 'Esans oranı (% – mum ağırlığına göre)', type: 'number', value: '8', hint: 'Kokusuz mum için 0 yazın.' },
    { id: 'yogunluk', label: 'Mum yoğunluğu (g/ml)', type: 'number', value: '0,9', hint: 'Soya ve parafin için yaklaşık 0,9; balmumu için yaklaşık 0,96.' },
    { id: 'fire', label: 'Fire payı (%)', type: 'number', value: '0', hint: 'Tencerede ve sürahide kalan mum için isteğe bağlı pay.' },
  ],
  compute(v, h) {
    const hacim = h.pos(v.hacim, 'Bir kabın dolum hacmi');
    const adet = h.posint(v.adet, 'Kap sayısı');
    const oran = h.nonneg(v.oran, 'Esans oranı');
    const yog = h.pos(v.yogunluk, 'Mum yoğunluğu');
    const fire = h.nonneg(h.opt(v.fire, 0, 'Fire payı'), 'Fire payı');
    if (oran > 15) h.err('Esans oranı %15\'i aşamaz; mumların çoğu %6–10 arasında esans taşır. Oranı düşürün.');
    if (yog < 0.7 || yog > 1.2) h.err('Mum yoğunluğu 0,7 ile 1,2 g/ml arasında olmalı; soya ve parafin için 0,9 yazabilirsiniz.');
    if (fire > 50) h.err('Fire payı %50\'den büyük olamaz.');
    const kapKarisim = hacim * yog;
    const toplam = kapKarisim * adet * (1 + fire / 100);
    const mum = toplam / (1 + oran / 100);
    const esans = toplam - mum;
    return {
      rows: [
        ['Eritilecek mum', h.fmt(mum, 1) + ' g'],
        ['Eklenecek esans', h.fmt(esans, 1) + ' g'],
        ['Toplam karışım', h.fmt(toplam, 1) + ' g'],
        ['Bir kaba düşen karışım', h.fmt(kapKarisim, 1) + ' g'],
        ['Bir kaba düşen esans', h.fmt(kapKarisim - kapKarisim / (1 + oran / 100), 1) + ' g'],
        ['Toplam dolum hacmi', h.fmt(hacim * adet, 0) + ' ml'],
      ],
      note: 'Esans oranı mum ağırlığına göre hesaplanır (100 g muma %8 esans = 8 g). Yoğunluk mum türüne ve markasına göre biraz değişir; ilk dökümde sonucu tartarak kendi katsayınızı bulun.',
    };
  },
  cases: [
    { in: { hacim: '200', adet: '6', oran: '8', yogunluk: '0,9', fire: '0' }, out: { 'Eritilecek mum': '1.000 g', 'Eklenecek esans': '80 g', 'Toplam karışım': '1.080 g', 'Bir kaba düşen karışım': '180 g' } },
    { in: { hacim: '250', adet: '1', oran: '10', yogunluk: '0,88' }, out: { 'Eritilecek mum': '200 g', 'Eklenecek esans': '20 g', 'Toplam karışım': '220 g' } },
    { in: { hacim: '100', adet: '4', oran: '0', yogunluk: '0,96' }, out: { 'Eritilecek mum': '384 g', 'Eklenecek esans': '0 g', 'Toplam dolum hacmi': '400 ml' } },
    { in: { hacim: '200', adet: '6', oran: '8', yogunluk: '0,9', fire: '5' }, out: { 'Eritilecek mum': '1.050 g', 'Eklenecek esans': '84 g', 'Toplam karışım': '1.134 g' } },
    { in: { hacim: '300', adet: '2', oran: '6', yogunluk: '0,9' }, out: { 'Toplam karışım': '540 g', 'Eritilecek mum': '509,4 g', 'Eklenecek esans': '30,6 g' } },
    { in: { hacim: '120', adet: '10', oran: '7', yogunluk: '0,9' }, out: { 'Toplam karışım': '1.080 g', 'Bir kaba düşen karışım': '108 g', 'Bir kaba düşen esans': '7,1 g' } },
    { in: { hacim: '200', adet: '2', oran: '25', yogunluk: '0,9' }, error: true },
    { in: { hacim: '0', adet: '2', oran: '8', yogunluk: '0,9' }, error: true },
    { in: { hacim: '200', adet: '2,5', oran: '8', yogunluk: '0,9' }, error: true },
  ],
  howto: [
    'Kabınızı doldurmak istediğiniz seviyeye kadar suyla doldurun, suyu ölçü kabına boşaltıp mililitresini okuyun ve "dolum hacmi" alanına yazın.',
    'Aynı kaptan kaç tane hazırlayacağınızı girin.',
    'Esans oranını yüzde olarak yazın. Emin değilseniz %6–8 ile başlayın; mum üreticisinin önerdiği en yüksek oranı aşmayın.',
    'Kullandığınız mumun yoğunluğunu kontrol edin; soya ve parafin için 0,9, balmumu için 0,96 iyi bir başlangıçtır.',
    '"Hesapla" düğmesine basın; mumu ve esansı hassas mutfak terazisinde gram olarak tartın.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Mum, sudan hafiftir: 1 mililitre su 1 gram gelirken, 1 mililitre katılaşmış mum yaklaşık 0,9 gramdır. Bu yüzden 200 ml\'lik bir kavanoz 200 gram değil, 180 gram civarında karışım alır. Araç önce kabı dolduracak toplam ağırlığı bulur: <strong>karışım (g) = hacim (ml) × yoğunluk (g/ml) × kap sayısı</strong>. Fire payı girildiyse bu değer aynı oranda artırılır.',
      'Mumculukta esans oranı, yaygın olarak <strong>mum ağırlığının yüzdesi</strong> olarak ifade edilir: %8 denildiğinde 100 gram muma 8 gram esans kastedilir. Kabı dolduran şey mum ile esansın toplamı olduğundan, mum miktarı toplamın (1 + oran) değerine bölünmesiyle bulunur: <strong>mum = karışım ÷ (1 + oran/100)</strong>, <strong>esans = karışım − mum</strong>.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1 – Altı adet 200 ml kavanoz, %8 esans, soya mumu:</strong> Karışım 200 × 0,9 × 6 = 1080 gramdır. Mum 1080 ÷ 1,08 = 1000 gram, esans 1080 − 1000 = 80 gram eder. Her kavanoza 180 gram karışım dökülür.',
      '<strong>Örnek 2 – Aynı parti, %5 fire payıyla:</strong> 1080 × 1,05 = 1134 gram karışım hazırlanır; bunun 1050 gramı mum, 84 gramı esanstır. Döküm sürahisinin çeperinde ve karıştırma çubuğunda kalan mum böylece karşılanır.',
      '<strong>Örnek 3 – Tek 250 ml kap, %10 esans, yoğunluk 0,88:</strong> 250 × 0,88 = 220 gram karışım; 200 gram mum ve 20 gram esans.',
    ] },
    { h: 'Mum türlerine göre yoğunluk ve esans taşıma', p: [
      'Yoğunluk değeri mumun cinsine, katkılarına ve sıcaklığına göre değişir; aşağıdakiler başlangıç için kullanılan yaklaşık değerlerdir. Erimiş mum katı muma göre daha fazla yer kaplar, soğurken çeker; bu yüzden hesap katılaşmış mumun yoğunluğuyla yapılır.',
    ], ul: [
      '<strong>Soya mumu:</strong> yaklaşık 0,9 g/ml. Kavanoz mumlarında en yaygın tercih; genellikle %6–10 esans taşır.',
      '<strong>Parafin:</strong> yaklaşık 0,9 g/ml. Kalıp ve kavanoz türleri farklıdır; esans taşıma oranı ürüne göre değişir.',
      '<strong>Balmumu:</strong> yaklaşık 0,96 g/ml. Kendi bal kokusu olduğu için çoğu zaman esanssız ya da düşük oranla dökülür.',
      '<strong>Hindistan cevizi karışımları:</strong> yaklaşık 0,9 g/ml; yumuşak yapılıdır, çoğunlukla başka mumlarla harmanlanır.',
    ] },
    { h: 'Esans oranını seçerken', p: [
      'Daha fazla esans her zaman daha güçlü koku demek değildir. Her mumun bağlayabileceği bir üst sınır vardır; bu sınır aşıldığında esans mumdan ayrışır, yüzeyde yağlı damlacıklar ("terleme") oluşur. Yüzeyde biriken esans alev alabileceği için bu yalnızca görüntü sorunu değil, güvenlik sorunudur. Araç bu nedenle %15\'in üzerindeki oranları kabul etmez; çoğu mum için pratik aralık %6–10\'dur.',
      'Esansı, mum üreticisinin önerdiği sıcaklıkta ekleyin ve bir iki dakika yavaşça karıştırın. Çok sıcak muma eklenen esansın uçucu notaları kaybolur, çok soğuk mumda ise esans tam bağlanmaz. Esansı hacimle değil, mutlaka teraziyle ölçün; esans yağlarının yoğunluğu birbirinden farklıdır ve damla ya da kaşık hesabı tutarsız sonuç verir.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Kabın etiketindeki hacmi doğrudan kullanmak: etiket ağza kadar hacmi gösterir, oysa mum fitil payı için ağızdan 1–1,5 cm aşağıda bırakılır. Suyla ölçmek en doğrusudur.',
      'Mililitreyi grama eşit saymak: 200 ml kavanoza 200 g mum eritirseniz yaklaşık 20 g artar.',
      'Esansı toplam karışımın yüzdesi sanmak: %8 mum ağırlığına göredir; toplamın yüzdesi olarak alındığında oran gerçekte biraz daha yüksek çıkar.',
      'Boya ve katkı maddelerini hesaba katmamak: mum boyası çok az kullanıldığı için ağırlığı ihmal edilir, ancak stearin gibi katkılar mum ağırlığına dahil edilmelidir.',
      'Fitili hacme göre değil kabın çapına göre seçmeyi unutmak: araç fitil boyutu hesaplamaz.',
    ] },
    { h: 'Güvenlik notu', p: [
      'Mumu doğrudan ateşte değil, benmari usulü eritin ve başından ayrılmayın; aşırı ısınan mum tutuşabilir. Tutuşan muma asla su dökmeyin, kabın ağzını kapatarak havasız bırakın. Yalnızca mum yapımı için üretilmiş, ısıya dayanıklı esansları ve kapları kullanın. Bu sayfadaki değerler hobi amaçlı planlama içindir; satış amaçlı üretimde ürün güvenliği ve etiketleme kurallarını ayrıca araştırın.',
    ] },
  ],
  faq: [
    ['200 ml kavanoz kaç gram mum alır?', 'Soya ya da parafin için yaklaşık 200 × 0,9 = 180 gram karışım alır. %8 esans kullanıyorsanız bunun yaklaşık 166,7 gramı mum, 13,3 gramı esanstır. Kavanozu ağzına kadar doldurmayacağınız için gerçek dolum hacmini suyla ölçmeniz daha doğru sonuç verir.'],
    ['Esans oranı neye göre hesaplanır?', 'Bu araçta ve mumculukta yaygın kullanımda esans oranı mum ağırlığının yüzdesidir. 1000 gram muma %8 esans 80 gram demektir ve toplam karışım 1080 gram olur.'],
    ['1 kilo muma kaç gram esans konur?', '%6 için 60 gram, %8 için 80 gram, %10 için 100 gram. Kullandığınız mumun üreticisi bir üst sınır belirtiyorsa onu aşmayın; sınır aşıldığında esans mumdan ayrılır ve yüzeyde yağlanma olur.'],
    ['Mum yoğunluğunu nasıl öğrenirim?', 'En pratik yol denemektir: hacmini bildiğiniz bir kabı mumla doldurun, donduktan sonra kabın darasını düşerek tartın ve gramı mililitreye bölün. 200 ml\'lik kap 178 gram mum aldıysa yoğunluk 0,89 g/ml\'dir. Bu değeri araca yazarak sonraki partileri daha isabetli hesaplayabilirsiniz.'],
    ['Fire payı gerekli mi?', 'Küçük partilerde sürahinin çeperinde kalan mum gözle görülür bir oran tutar. %3–5 pay, son kavanozun eksik kalmasını önler. Artan karışımı küçük bir kalıba ya da çay mumu kabına dökerek değerlendirebilirsiniz.'],
    ['Soğuyunca mumun ortası çöktü, hesap mı yanlış?', 'Hayır. Mum soğurken büzülür; özellikle parafinde fitil çevresinde çukur oluşması olağandır. Bunun için karışımdan bir miktar ayırıp, yüzey katılaştıktan sonra ince bir ikinci döküm yapılır. Fire payı bu ikinci döküm için de işe yarar.'],
    ['Kalıp mumlar için de kullanılabilir mi?', 'Evet. Kalıbın hacmini suyla ölçüp aynı biçimde girin. Düzgün geometrili kalıplarda hacmi iç ölçülerden de hesaplayabilirsiniz; örneğin 6 cm çapında, 10 cm yüksekliğinde silindir kalıp yaklaşık 283 ml\'dir.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesaplama tarayıcınızda çalışır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['epoksi-recine-hesapla', 'alkol-orani-seyreltme-hesapla', 'seyreltme-orani-hesapla', 'fire-orani-hesapla', 'litre-mililitre-cevir'],
};
