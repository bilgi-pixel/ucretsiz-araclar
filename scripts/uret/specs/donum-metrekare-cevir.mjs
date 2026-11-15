export default {
  slug: 'donum-metrekare-cevir',
  title: 'Dönüm Metrekare Çevirici',
  h1Tail: 'dönüm ↔ m²',
  pageTitle: 'Dönüm Metrekare Çevirici – 1 Dönüm Kaç Metrekare Hesaplama',
  description: 'Dönümü metrekareye, metrekareyi dönüme çevirin. Yeni (metrik) dönüm 1.000 m², eski dönüm yaklaşık 919,3 m² seçeneğiyle; dekar ve hektar karşılığı da gösterilir.',
  card: 'Dönümü metrekareye, metrekareyi dönüme çevirin; yeni ve eski dönüm seçeneği, dekar ve hektar karşılığıyla.',
  category: 'birim',
  keywords: ['dönüm metrekare çevirme', '1 dönüm kaç metrekare', 'dönüm hesaplama', 'metrekare dönüm', 'tarla dönüm hesaplama', 'dekar dönüm', 'eski dönüm kaç metrekare', 'arsa dönüm hesabı'],
  lead: 'Tarla, bağ, bahçe ya da arsa alanını dönümden metrekareye veya metrekareden dönüme çevirin. Bugün kullanılan <strong>1 dönüm = 1.000 m²</strong> tanımının yanında eski dönüm seçeneği de vardır; sonuç dekar ve hektar olarak da verilir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Alan', type: 'number', placeholder: 'Örn. 7,5', hint: 'Binlik ayraç kullanmayın; 12500 gibi düz yazın, ondalık için virgül kullanın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['d', 'Dönüm → Metrekare'], ['m', 'Metrekare → Dönüm']] },
    { id: 'tur', label: 'Dönüm türü', type: 'select', options: [['yeni', 'Yeni (metrik) dönüm – 1.000 m²'], ['eski', 'Eski dönüm – yaklaşık 919,3 m²']] },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Alan');
    const birim = v.tur === 'eski' ? 919.3 : 1000;
    const m2 = v.yon === 'm' ? x : x * birim;
    const donum = v.yon === 'm' ? x / birim : x;
    const tam = Math.floor(donum + 1e-9);
    const kalan = Math.max(0, m2 - tam * birim);
    const rows = v.yon === 'm'
      ? [['Dönüm', h.fmt(donum, 4) + ' dönüm'], ['Metrekare', h.fmt(m2, 2) + ' m²']]
      : [['Metrekare', h.fmt(m2, 2) + ' m²'], ['Dönüm', h.fmt(donum, 4) + ' dönüm']];
    rows.push(['Dönüm ve metrekare', `${h.fmt(tam, 0)} dönüm ${h.fmt(kalan, 2)} m²`]);
    rows.push(['Dekar', h.fmt(m2 / 1000, 4) + ' daa']);
    rows.push(['Hektar', h.fmt(m2 / 10000, 4) + ' ha']);
    return {
      rows,
      note: v.tur === 'eski'
        ? 'Eski dönüm yaklaşık 919,3 m² alınmıştır; yöresel dönümler bundan farklı olabilir. Dekar ve hektar metrik birimlerdir.'
        : 'Yeni (metrik) dönüm 1.000 m² alınmıştır ve dekarla aynı büyüklüktedir.',
    };
  },
  cases: [
    { in: { deger: '5', yon: 'd', tur: 'yeni' }, out: { 'Metrekare': '5.000 m²', 'Hektar': '0,5 ha' } },
    { in: { deger: '2500', yon: 'm', tur: 'yeni' }, out: { 'Dönüm': '2,5 dönüm', 'Dönüm ve metrekare': '2 dönüm 500 m²' } },
    { in: { deger: '1', yon: 'd', tur: 'eski' }, out: { 'Metrekare': '919,3 m²', 'Dekar': '0,9193 daa' } },
    { in: { deger: '10', yon: 'd', tur: 'yeni' }, out: { 'Metrekare': '10.000 m²', 'Hektar': '1 ha', 'Dekar': '10 daa' } },
    { in: { deger: '12750', yon: 'm', tur: 'yeni' }, out: { 'Dönüm': '12,75 dönüm', 'Dönüm ve metrekare': '12 dönüm 750 m²', 'Hektar': '1,275 ha' } },
    { in: { deger: '0,5', yon: 'd', tur: 'yeni' }, out: { 'Metrekare': '500 m²' } },
    { in: { deger: '9193', yon: 'm', tur: 'eski' }, out: { 'Dönüm': '10 dönüm', 'Dönüm ve metrekare': '10 dönüm 0 m²' } },
    { in: { deger: '20', yon: 'd', tur: 'eski' }, out: { 'Metrekare': '18.386 m²', 'Hektar': '1,8386 ha' } },
    { in: { deger: '-3', yon: 'd', tur: 'yeni' }, error: true },
    { in: { deger: 'beş dönüm', yon: 'd', tur: 'yeni' }, error: true },
  ],
  howto: [
    '"Alan" alanına dönüm ya da metrekare cinsinden değeri yazın; tapudaki yüzölçümünü ayraçsız girin.',
    '"Çeviri yönü" listesinden dönümden metrekareye mi, metrekareden dönüme mi çevireceğinizi seçin.',
    '"Dönüm türü" listesinde çoğu durumda "Yeni (metrik) dönüm" seçili kalmalıdır; eski kayıtlarla çalışıyorsanız "Eski dönüm" seçin.',
    '"Çevir" düğmesine basın. Sonuçta karşılık gelen alan, "kaç dönüm kaç metrekare" gösterimi, dekar ve hektar değerleri yer alır.',
    'Sonucu alım satım notuna ya da mesajınıza eklemek için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Dönüm nedir, kaç metrekaredir?', p: [
      'Dönüm, Türkiye\'de tarım arazisi ve arsa büyüklüğünü anlatmak için halk arasında en çok kullanılan alan ölçüsüdür. Günümüzde dönüm denildiğinde <strong>1.000 metrekare</strong> anlaşılır. Bu büyüklük metrik sistemdeki dekarla aynıdır; bu yüzden "yeni dönüm", "metrik dönüm" ya da doğrudan "dekar" adlarıyla da anılır. Kenarları yaklaşık 31,6 metre olan bir kare ya da 20 × 50 metrelik bir dikdörtgen bir dönümdür.',
      'Osmanlı döneminden kalan <strong>eski dönüm</strong> (atik dönüm) ise kenarı 40 arşın olan bir karenin alanıdır ve yaklaşık 919,3 metrekare kabul edilir. Metrik sisteme geçişle birlikte dönüm 1.000 metrekareye yuvarlanmıştır. Bazı yörelerde halk arasında bunlardan farklı büyüklükte "dönüm"ler de söylenegelmiştir; bu nedenle sözlü olarak aktarılan eski ölçülerde hangi dönümün kastedildiğini sormakta yarar vardır.',
    ] },
    { h: 'Çeviri formülü', p: [
      'Dönümden metrekareye: <strong>m² = dönüm × 1.000</strong>. Metrekareden dönüme: <strong>dönüm = m² ÷ 1.000</strong>. Eski dönümle hesap yaparken 1.000 yerine 919,3 kullanılır.',
      'Metrik dönümde işlem aslında virgülü üç basamak kaydırmaktır: 7,5 dönüm 7.500 m², 12.750 m² ise 12,75 dönümdür. Ondalıklı dönümü "dönüm ve metrekare" olarak söylemek için tam kısım dönüm, ondalık kısım 1.000 ile çarpılarak metrekare olarak okunur: 12,75 dönüm = 12 dönüm 750 m².',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Tapuda yüzölçümü 2.500 m² yazan bir bahçe kaç dönümdür? 2.500 ÷ 1.000 = 2,5 dönüm, yani 2 dönüm 500 metrekare.',
      '<strong>Örnek 2:</strong> 5 dönümlük bir tarla 5 × 1.000 = 5.000 m² eder; bu aynı zamanda 5 dekar ve 0,5 hektardır.',
      '<strong>Örnek 3:</strong> Dededen kalma bir kayıtta "20 dönüm" yazıyor ve eski dönüm kastediliyor. 20 × 919,3 = 18.386 m². Aynı arazi metrik dönümle 18,386 dönümdür; yani eski ve yeni dönüm arasındaki yüzde 8\'lik fark 20 dönümde 1.614 metrekarelik bir farka dönüşür.',
      '<strong>Örnek 4:</strong> 10 dönüm = 10.000 m² = 1 hektar. Bu eşitlik, hektarla verilen destek ve istatistik rakamlarını dönüme çevirirken işinizi kolaylaştırır.',
    ] },
    { h: 'Dönüm, dekar, hektar ve ar ilişkisi', ul: [
      '<strong>1 ar</strong> = 100 m²',
      '<strong>1 dekar (daa)</strong> = 10 ar = 1.000 m² = 1 yeni dönüm',
      '<strong>1 hektar (ha)</strong> = 100 ar = 10 dekar = 10.000 m² = 10 yeni dönüm',
      '<strong>1 evlek</strong> = dönümün dörtte biri (yeni dönümde 250 m²)',
      '<strong>1 eski dönüm</strong> ≈ 919,3 m² ≈ 0,9193 dekar',
      '<strong>1 km²</strong> = 100 hektar = 1.000 dönüm',
    ] },
    { h: 'Tapu, ilan ve arazi işlerinde dikkat edilecekler', p: [
      'Tapu senetlerinde ve kadastro kayıtlarında yüzölçümü metrekare olarak yazılır; ilanlarda ve gündelik konuşmada ise dönüm kullanılır. Bir ilanı değerlendirirken dönüm sayısını metrekareye çevirip tapudaki yüzölçümüyle karşılaştırmak, yuvarlanmış ya da eski ölçüyle söylenmiş rakamlardan doğacak yanlış anlamaları önler. "Yaklaşık 3 dönüm" denilen yerin 2.700 m² çıkması az rastlanan bir durum değildir.',
      'Fiyat hesaplarında da aynı çeviri gerekir: dönümü belli bir fiyata söylenen arazinin metrekare fiyatı, dönüm fiyatının 1.000\'e bölünmesiyle bulunur. Ekim, gübreleme, ilaçlama ve sulama hesaplarında üretici önerileri çoğunlukla dekar başına verilir; metrik dönüm dekarla aynı olduğundan bu değerler doğrudan dönüm başına okunabilir.',
      'Bu araç yalnızca birim çevirir. Alım satım, miras paylaşımı, ifraz ya da imar gibi işlemlerde tapu ve kadastro kayıtları esas alınmalı; hukuki ve mali konularda ilgili uzmanlara danışılmalıdır.',
    ] },
    { h: 'Arazinin dönümünü ölçüden bulmak', p: [
      'Elinizde tapu yoksa ve arazi dikdörtgene yakınsa, en ile boyu metre olarak ölçüp çarparak metrekareyi bulabilir, sonra bu araçla dönüme çevirebilirsiniz. 40 metre × 75 metre ölçülerindeki bir tarla 3.000 m², yani 3 dönümdür. Yamuk ya da üçgen biçimli parçalarda alan ilgili geometri formülüyle hesaplanmalıdır; adımlayarak yapılan ölçümler yalnızca kaba bir fikir verir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç negatif değer kabul etmez. Metrekare iki, dönüm dört ondalık basamağa kadar gösterilir. Eski dönüm için kullanılan 919,3 m² değeri yaygın kabul gören yaklaşık karşılıktır; farklı kaynaklarda küçük farklarla verilebilir.',
    ] },
  ],
  faq: [
    ['1 dönüm kaç metrekaredir?', 'Günümüzde 1 dönüm 1.000 metrekaredir ve dekarla aynı büyüklüktedir. Eski dönüm ise yaklaşık 919,3 metrekaredir.'],
    ['1.000 metrekare kaç dönüm eder?', '1.000 m² tam 1 dönümdür. 500 m² yarım dönüm, 250 m² çeyrek dönüm, yani bir evlektir.'],
    ['Dönüm ile dekar aynı mı?', 'Yeni (metrik) dönüm ile dekar aynıdır: ikisi de 1.000 m²\'dir. Eski dönüm ise dekardan yaklaşık yüzde 8 küçüktür.'],
    ['1 hektar kaç dönümdür?', '1 hektar 10.000 m² olduğundan 10 dönüme eşittir. Eski dönümle hesaplanırsa yaklaşık 10,88 eski dönüm eder.'],
    ['Hangi dönüm türünü seçmeliyim?', 'Güncel ilanlar, resmî kayıtlar ve tarımsal hesaplar için yeni dönümü seçin. Yalnızca eski belgelerde ya da yaşlıların aktardığı ölçülerde eski dönümün kastedildiğinden eminseniz eski dönümü kullanın.'],
    ['Bir dönüm arazi kaç metreye kaç metredir?', 'Tek bir ölçüsü yoktur; alanı 1.000 m² olan her şekil bir dönümdür. Örnek olarak 20 × 50 metre, 25 × 40 metre ya da kenarı yaklaşık 31,6 metre olan bir kare verilebilir.'],
    ['2,35 dönüm ne demek?', '2 dönüm ve 0,35 × 1.000 = 350 metrekare demektir; toplamı 2.350 m² eder. Araç bu ayrımı "Dönüm ve metrekare" satırında gösterir.'],
    ['Girdiğim arazi bilgisi saklanıyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['hektar-donum-cevir', 'evlek-metrekare-cevir', 'akre-metrekare-cevir', 'kilometrekare-hektar-cevir', 'metrekare-fiyati-hesapla', 'alan-cevre-hesapla'],
};
