export default {
  slug: 'yuzdelik-dilim-hesapla',
  title: 'Yüzdelik Dilim (Persentil) Hesaplama',
  h1Tail: 'veri setinden persentil bulma',
  pageTitle: 'Yüzdelik Dilim (Persentil) Hesaplama – Veri Setinde P. Yüzdelik',
  description: 'Veri setinizin istediğiniz yüzdelik dilimine (persentil) karşılık gelen değeri üç yaygın yöntemle bulun; ayrıca bir değerin veri içindeki yüzdelik sırasını hesaplayın.',
  card: 'Sayılarınızı yapıştırın; 25., 90. ya da istediğiniz yüzdelik dilimin değerini ve bir değerin yüzdelik sırasını bulun.',
  category: 'matematik',
  keywords: ['yüzdelik dilim hesaplama', 'persentil hesaplama', 'yüzdelik nasıl hesaplanır', '90. persentil', 'yüzdelik sıra hesaplama', 'percentile hesaplama', 'yüzdebirlik hesaplama'],
  lead: 'Bir veri setinde verilerin belirli bir yüzdesinin altında kaldığı değeri, yani <strong>yüzdelik dilimi (persentil)</strong> bulun. Araç doğrusal ara değer, en yakın sıra ve (n + 1) yöntemlerinin sonuçlarını birlikte verir; isterseniz bir değerin veri içindeki yüzdelik sırasını da hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'sayilar', label: 'Veriler', type: 'textarea', placeholder: 'Örn. 15 20 35 40 50', hint: 'Sayıları boşluk, satır sonu ya da noktalı virgülle ayırın; ondalık için virgül kullanabilirsiniz.', wide: true },
    { id: 'yuzdelik', label: 'Yüzdelik (0–100)', type: 'number', placeholder: 'Örn. 90' },
    { id: 'deger', label: 'Sırası bulunacak değer (isteğe bağlı)', type: 'number', placeholder: 'Örn. 35', hint: 'Bu değerin verinin yüzde kaçından büyük olduğunu gösterir.' },
  ],
  compute(v, h) {
    const x = h.nums(v.sayilar, 'Veriler').slice().sort((a, b) => a - b);
    const n = x.length;
    if (n > 100000) h.err('En fazla 100.000 veri girebilirsiniz.');
    const p = h.num(v.yuzdelik, 'Yüzdelik (0–100)');
    if (p < 0 || p > 100) h.err('"Yüzdelik" 0 ile 100 arasında olmalı.');
    const f = p / 100;
    // sıra: 1 tabanlı, kesirli olabilir
    const araDeger = (sira) => {
      const alt = Math.floor(sira + 1e-9);
      const kes = sira - alt;
      if (alt >= n) return x[n - 1];
      if (alt < 1) return x[0];
      return kes < 1e-9 ? x[alt - 1] : x[alt - 1] + kes * (x[alt] - x[alt - 1]);
    };
    const dogrusal = araDeger(1 + f * (n - 1));
    const enYakin = x[Math.min(n, Math.max(1, Math.ceil(f * n - 1e-9))) - 1];
    const sExc = f * (n + 1);
    const haric = sExc >= 1 - 1e-9 && sExc <= n + 1e-9 ? h.fmt(araDeger(sExc), 4) : '— (bu veri sayısıyla tanımsız)';
    const rows = [
      ['Yüzdelik değer', h.fmt(dogrusal, 4)],
      ['En yakın sıra yöntemi', h.fmt(enYakin, 4)],
      ['(n + 1) yöntemi', haric],
      ['Veri sayısı', h.fmt(n, 0)],
      ['En küçük – en büyük', `${h.fmt(x[0], 4)} – ${h.fmt(x[n - 1], 4)}`],
    ];
    if (String(v.deger ?? '').trim() !== '') {
      const d = h.num(v.deger, 'Sırası bulunacak değer');
      let kucuk = 0, esit = 0;
      for (const a of x) { if (a < d) kucuk++; else if (a === d) esit++; }
      rows.push(['Değerin yüzdelik sırası', '%' + h.fmt((kucuk + 0.5 * esit) / n * 100, 2)]);
      rows.push(['Değerden küçük veri sayısı', `${h.fmt(kucuk, 0)} (eşit: ${h.fmt(esit, 0)})`]);
    }
    return {
      rows,
      note: `İlk satır ${h.fmt(p, 4)}. yüzdeliği doğrusal ara değer yöntemiyle verir (hesap tablolarındaki YÜZDEBİRLİK işleviyle aynı). Yöntemler küçük veri setlerinde farklı sonuç verebilir.`,
    };
  },
  cases: [
    { in: { sayilar: '15 20 35 40 50', yuzdelik: '40' }, out: { 'Yüzdelik değer': '29', 'En yakın sıra yöntemi': '20', '(n + 1) yöntemi': '26', 'Veri sayısı': '5', 'En küçük – en büyük': '15 – 50' } },
    { in: { sayilar: '1 2 3 4 5 6 7 8 9 10', yuzdelik: '90' }, out: { 'Yüzdelik değer': '9,1', 'En yakın sıra yöntemi': '9', '(n + 1) yöntemi': '9,9' } },
    { in: { sayilar: '1 2 3 4 5 6 7 8 9 10', yuzdelik: '50', deger: '7' }, out: { 'Yüzdelik değer': '5,5', 'En yakın sıra yöntemi': '5', '(n + 1) yöntemi': '5,5', 'Değerin yüzdelik sırası': '%65', 'Değerden küçük veri sayısı': '6 (eşit: 1)' } },
    { in: { sayilar: '3; 6; 7; 8; 8; 10; 13; 15; 16; 20', yuzdelik: '25' }, out: { 'Yüzdelik değer': '7,25', 'En yakın sıra yöntemi': '7', '(n + 1) yöntemi': '6,75' } },
    { in: { sayilar: '3 6 7 8 8 10 13 15 16 20', yuzdelik: '75' }, out: { 'En yakın sıra yöntemi': '15', 'Yüzdelik değer': '14,5', '(n + 1) yöntemi': '15,25' } },
    { in: { sayilar: '50\n20\n15\n40\n35', yuzdelik: '100' }, out: { 'Yüzdelik değer': '50', 'En yakın sıra yöntemi': '50', '(n + 1) yöntemi': '— (bu veri sayısıyla tanımsız)' } },
    { in: { sayilar: '15 20 35 40 50', yuzdelik: '0' }, out: { 'Yüzdelik değer': '15', 'En yakın sıra yöntemi': '15' } },
    { in: { sayilar: '3,5 1,5 2,5', yuzdelik: '50' }, out: { 'Yüzdelik değer': '2,5', 'En yakın sıra yöntemi': '2,5', '(n + 1) yöntemi': '2,5' } },
    { in: { sayilar: '50 60 70 80 90', yuzdelik: '50', deger: '80' }, out: { 'Yüzdelik değer': '70', 'Değerin yüzdelik sırası': '%70' } },
    { in: { sayilar: '42', yuzdelik: '30' }, out: { 'Yüzdelik değer': '42', 'En yakın sıra yöntemi': '42' } },
    { in: { sayilar: '15 20 35 40 50', yuzdelik: '120' }, error: true },
    { in: { sayilar: '', yuzdelik: '50' }, error: true },
    { in: { sayilar: '15 yirmi 35', yuzdelik: '50' }, error: true },
    { in: { sayilar: '15 20 35', yuzdelik: '' }, error: true },
  ],
  howto: [
    '"Veriler" kutusuna sayılarınızı yazın ya da bir tablodan kopyalayıp yapıştırın. Sıralı olmaları gerekmez; araç küçükten büyüğe kendisi sıralar.',
    '"Yüzdelik" alanına 0 ile 100 arasında aradığınız dilimi yazın: medyan için 50, üst %10 sınırı için 90.',
    'Belirli bir değerin veri içinde nerede durduğunu merak ediyorsanız "Sırası bulunacak değer" alanını da doldurun.',
    '"Hesapla" düğmesine basın. İlk satır doğrusal ara değerle bulunan yüzdelik değeridir; alttaki iki satır diğer yöntemlerin sonucunu gösterir.',
    'Sonucu raporda kullanacaksanız hangi yöntemi tercih ettiğinizi belirtin; ders kitabınız ya da kurumunuz belirli bir yöntem istiyor olabilir.',
  ],
  sections: [
    { h: 'Yüzdelik dilim (persentil) nedir?', p: [
      'P. yüzdelik, sıralanmış bir veri setinde verilerin yaklaşık yüzde P\'sinin altında kaldığı değerdir. 90. yüzdelik 85 puan ise, puanların kabaca %90\'ı 85\'in altında, %10\'u üstündedir. 50. yüzdelik medyana, 25. ve 75. yüzdelikler birinci ve üçüncü çeyrekliğe karşılık gelir.',
      'Yüzdelikler ortalamadan farklı olarak verinin dağılımı hakkında konum bilgisi verir ve uç değerlerden az etkilenir. Sınav sonuçlarının sıralanması, çocukların boy ve kilo gelişiminin izlenmesi, ücret araştırmaları, bir web sayfasının yanıt sürelerinin değerlendirilmesi gibi alanlarda yaygın olarak kullanılır.',
    ] },
    { h: 'Üç hesaplama yöntemi', p: [
      'Yüzdeliğin tek bir evrensel formülü yoktur; aranan sıra iki veri arasına düştüğünde ne yapılacağı konusunda farklı gelenekler vardır. Araç en yaygın üçünü birlikte gösterir. Aşağıda n veri sayısını, P yüzdeliği gösterir.',
    ], ul: [
      '<strong>Doğrusal ara değer:</strong> Sıra = 1 + (P ÷ 100) × (n − 1). Sıra tam sayı değilse komşu iki veri arasında orantılı bir değer alınır. Hesap tablosu programlarındaki YÜZDEBİRLİK işlevi ve pek çok istatistik yazılımının varsayılanı budur.',
      '<strong>En yakın sıra:</strong> Sıra = (P ÷ 100) × n değeri yukarı yuvarlanır ve o sıradaki veri alınır. Sonuç her zaman veri setindeki gerçek bir değerdir; ara değer hesaplanmaz.',
      '<strong>(n + 1) yöntemi:</strong> Sıra = (P ÷ 100) × (n + 1) alınır ve gerekiyorsa ara değer hesaplanır. Birçok ders kitabı bu yöntemi öğretir. Sıra 1\'den küçük ya da n\'den büyük çıkarsa yüzdelik tanımsızdır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Veriler 15, 20, 35, 40, 50 olsun ve 40. yüzdelik aransın (n = 5).',
      '<strong>Doğrusal ara değer:</strong> Sıra = 1 + 0,40 × 4 = 2,6. İkinci veri 20, üçüncü veri 35\'tir. 20 + 0,6 × (35 − 20) = <strong>29</strong>.',
      '<strong>En yakın sıra:</strong> 0,40 × 5 = 2; yukarı yuvarlamaya gerek yoktur. İkinci veri <strong>20</strong>\'dir.',
      '<strong>(n + 1) yöntemi:</strong> Sıra = 0,40 × 6 = 2,4. 20 + 0,4 × 15 = <strong>26</strong>.',
      'Aynı soruya 20, 26 ve 29 gibi üç farklı yanıt çıkması bir hata değildir; yalnızca beş verili bir sette yöntem farkının ne kadar büyüyebileceğini gösterir. Veri sayısı arttıkça üç yöntemin sonuçları birbirine yaklaşır.',
    ] },
    { h: 'Bir değerin yüzdelik sırası', p: [
      'Tersine soru da sıkça sorulur: "Benim puanım kaçıncı yüzdelikte?" Araç bunu şu formülle hesaplar: <strong>yüzdelik sıra = (küçük olanların sayısı + 0,5 × eşit olanların sayısı) ÷ n × 100</strong>. Eşit değerlerin yarısının sayılması, aynı puanı alan kişilerin ortada konumlandırılmasını sağlar.',
      'Örneğin 1\'den 10\'a kadar olan sayılarda 7 değerinden küçük 6 veri, ona eşit 1 veri vardır: (6 + 0,5) ÷ 10 × 100 = %65. Beş kişilik bir grupta puanlar 50, 60, 70, 80, 90 ise 80 puanın yüzdelik sırası (3 + 0,5) ÷ 5 × 100 = %70\'tir.',
    ] },
    { h: 'Yüzdelik ile yüzdeyi karıştırmayın', p: [
      'Bir sınavdan 100 üzerinden 70 almak, yüzde 70 başarı demektir; bu bir yüzdedir. Aynı puanın 95. yüzdelikte olması ise sınava girenlerin yaklaşık %95\'inden yüksek puan aldığınızı anlatır. Zor bir sınavda düşük bir puan yüksek bir yüzdeliğe, kolay bir sınavda yüksek bir puan düşük bir yüzdeliğe denk gelebilir.',
      'Sınav sonuç belgelerindeki "yüzdelik dilim" ifadesi ülkemizde çoğunlukla üstten sayılır: %5\'lik dilimde olmak en başarılı %5 içinde olmak demektir. Bu araçtaki yüzdelik ise alttan sayılır; en başarılı %5\'in sınırı 95. yüzdeliktir. Karşılaştırma yaparken yönü dönüştürmeyi unutmayın.',
    ] },
    { h: 'Sınırlar', p: [
      'Çok küçük veri setlerinde uç yüzdelikler (örneğin 10 veriyle 99. yüzdelik) anlamlı bilgi taşımaz; sonuç pratikte en büyük değere eşit ya da ona çok yakın çıkar. Çocuk gelişimi gibi alanlardaki yüzdelik eğrileri bu araçla üretilemez; onlar çok büyük referans topluluklarından elde edilmiş hazır tablolara dayanır ve yorumu hekime aittir. Araç en çok 100.000 veriyle çalışır ve yalnızca sayısal değerleri kabul eder.',
    ] },
  ],
  faq: [
    ['Yüzdelik dilim nasıl hesaplanır?', 'Veriler küçükten büyüğe sıralanır, aranan yüzdeliğin sırası bulunur ve o sıradaki değer alınır. En yaygın yöntemde sıra 1 + (P ÷ 100) × (n − 1) formülüyle hesaplanır; sıra kesirliyse iki komşu veri arasında doğrusal ara değer alınır.'],
    ['Persentil ile yüzdelik aynı şey mi?', 'Evet. Persentil, İngilizce "percentile" sözcüğünden gelir; Türkçe karşılığı yüzdelik ya da yüzdebirliktir. Üçü de aynı kavramı anlatır.'],
    ['Farklı programlar neden farklı sonuç veriyor?', 'Çünkü yüzdeliğin birden çok kabul görmüş tanımı vardır. Hesap tabloları, istatistik yazılımları ve ders kitapları farklı ara değer kurallarını varsayılan olarak kullanabilir. Araç bu yüzden üç yaygın yöntemin sonucunu yan yana gösterir.'],
    ['50. yüzdelik medyan mıdır?', 'Evet. Doğrusal ara değer ve (n + 1) yöntemlerinde 50. yüzdelik her zaman medyana eşittir. En yakın sıra yönteminde veri sayısı çiftse ortadaki iki değerden küçüğü alınır, bu yüzden küçük bir fark oluşabilir.'],
    ['Çeyreklikleri bu araçla bulabilir miyim?', 'Evet; 25, 50 ve 75 değerlerini sırayla yazarak birinci, ikinci ve üçüncü çeyrekliği bulabilirsiniz. Üçünü birlikte ve çeyrekler açıklığıyla görmek için çeyreklik aracı daha pratiktir.'],
    ['Tekrar eden değerler sonucu bozar mı?', 'Hayır. Tekrar eden değerler sıralamada ayrı ayrı yer alır ve hesaba katılır. Yüzdelik sıra hesabında eşit değerlerin yarısı "küçük" sayılır.'],
    ['Ondalıklı sayıları nasıl yazmalıyım?', 'Ondalık ayırıcı olarak virgül ya da nokta kullanabilirsiniz. Virgül ondalık işareti sayıldığı için sayıları birbirinden boşluk, satır sonu ya da noktalı virgülle ayırın.'],
    ['Verilerim bir sunucuya gönderiliyor mu?', 'Hayır. Sıralama ve hesaplama tarayıcınızda yapılır; yapıştırdığınız veriler cihazınızdan çıkmaz.'],
  ],
  related: ['ceyreklik-hesapla', 'medyan-hesapla', 'z-skoru-hesapla', 'aciklik-hesapla', 'standart-sapma-hesapla', 'ortalama-hesapla'],
};
