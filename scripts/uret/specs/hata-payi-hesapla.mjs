export default {
  slug: 'hata-payi-hesapla',
  title: 'Hata Payı Hesaplama',
  h1Tail: 'anket sonuçları için',
  pageTitle: 'Hata Payı Hesaplama – Anket Sonucu Kaç Puan Yanılabilir?',
  description: 'Örneklem büyüklüğü, güven düzeyi ve bulunan orandan anket hata payını hesaplayın. Sonucun güven aralığını, standart hatayı ve sonlu evren düzeltmesini birlikte görün.',
  card: 'Katılımcı sayısı ve güven düzeyinden anket hata payını (±) bulun; oranın güven aralığını ve standart hatasını görün.',
  category: 'matematik',
  keywords: ['hata payı hesaplama', 'anket hata payı', 'hata payı nedir', 'hata payı formülü', 'örneklem hata payı', 'artı eksi yüzde hata', 'anket güven aralığı', 'standart hata oran'],
  lead: 'Bir ankette ya da oran araştırmasında bulduğunuz yüzdenin gerçek değerden en çok kaç puan sapabileceğini hesaplayın. Araç <strong>z × √(p × (1 − p) ÷ n)</strong> formülünü kullanır; evren büyüklüğünü yazarsanız sonlu evren düzeltmesini de uygular.',
  button: 'Hesapla',
  inputs: [
    { id: 'n', label: 'Örneklem büyüklüğü (n)', type: 'number', placeholder: 'Örn. 1000', hint: 'Tamamlanmış anket sayısı' },
    { id: 'guven', label: 'Güven düzeyi', type: 'select', options: [['95', '%95'], ['90', '%90'], ['99', '%99'], ['80', '%80'], ['98', '%98']] },
    { id: 'oran', label: 'Bulunan oran (%)', type: 'number', value: '50', hint: 'Bilinmiyorsa 50 bırakın; en büyük hata payını verir' },
    { id: 'evren', label: 'Evren büyüklüğü (isteğe bağlı)', type: 'number', placeholder: 'Örn. 25000', hint: 'Hedef kitlenin toplam büyüklüğü; çok büyükse boş bırakın' },
  ],
  compute(v, h) {
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const z = zTablo[duzey];
    const n = h.posint(v.n, 'Örneklem büyüklüğü (n)');
    const pY = h.num(v.oran, 'Bulunan oran (%)');
    if (pY < 0 || pY > 100) h.err('"Bulunan oran (%)" 0 ile 100 arasında olmalı.');
    const evrenVar = String(v.evren ?? '').trim() !== '';
    const N = evrenVar ? h.posint(v.evren, 'Evren büyüklüğü') : null;
    if (N !== null && n > N) h.err('Örneklem büyüklüğü evren büyüklüğünden fazla olamaz.');
    const p = pY / 100;
    const fpc = N === null ? 1 : (N > 1 ? Math.sqrt((N - n) / (N - 1)) : 0);
    const se = Math.sqrt(p * (1 - p) / n) * fpc;
    const me = z * se * 100;
    const alt = Math.max(0, pY - me), ust = Math.min(100, pY + me);
    const rows = [
      ['Hata payı', '± %' + h.fmt(me, 2)],
      [`%${duzey} güven aralığı`, `%${h.fmt(alt, 2)} – %${h.fmt(ust, 2)}`],
      ['Standart hata', '%' + h.fmt(se * 100, 2)],
      ['z değeri', h.fmt(z, 4)],
    ];
    if (N !== null) rows.push(['Sonlu evren düzeltme katsayısı', h.fmt(fpc, 4)]);
    let note = 'Hata payı yalnızca rastgele örnekleme hatasını kapsar; soru biçimi, yanıtsızlık ve kapsam dışı kalma gibi hatalar bu sayıya dahil değildir.';
    if (pY === 0 || pY === 100) note = 'Oran %0 ya da %100 olduğunda bu formül hata payını sıfır verir; bu gerçek belirsizliği yansıtmaz. ' + note;
    else if (n * p < 10 || n * (1 - p) < 10) note = 'Örneklem küçük ya da oran uç değere yakın olduğundan normal yaklaşım kaba kalabilir; sonucu temkinli yorumlayın. ' + note;
    return { rows, note };
  },
  cases: [
    { in: { n: '1000', guven: '95', oran: '50' }, out: { 'Hata payı': '± %3,1', '%95 güven aralığı': '%46,9 – %53,1', 'Standart hata': '%1,58', 'z değeri': '1,96' } },
    { in: { n: '400', guven: '95', oran: '50' }, out: { 'Hata payı': '± %4,9', '%95 güven aralığı': '%45,1 – %54,9', 'Standart hata': '%2,5' } },
    { in: { n: '385', guven: '95', oran: '50' }, out: { 'Hata payı': '± %4,99' } },
    { in: { n: '100', guven: '95', oran: '50' }, out: { 'Hata payı': '± %9,8', 'Standart hata': '%5' } },
    { in: { n: '1000', guven: '99', oran: '50' }, out: { 'Hata payı': '± %4,07', '%99 güven aralığı': '%45,93 – %54,07' } },
    { in: { n: '500', guven: '95', oran: '30' }, out: { 'Hata payı': '± %4,02', '%95 güven aralığı': '%25,98 – %34,02', 'Standart hata': '%2,05' } },
    { in: { n: '200', guven: '95', oran: '50', evren: '1000' }, out: { 'Hata payı': '± %6,2', 'Sonlu evren düzeltme katsayısı': '0,8949', 'Standart hata': '%3,16' } },
    { in: { n: '2400', guven: '95', oran: '42' }, out: { 'Hata payı': '± %1,97', '%95 güven aralığı': '%40,03 – %43,97' } },
    { in: { n: '600', guven: '90', oran: '50' }, out: { 'Hata payı': '± %3,36' } },
    { in: { n: '50', guven: '95', oran: '10' }, out: { 'Hata payı': '± %8,32', '%95 güven aralığı': '%1,68 – %18,32' } },
    { in: { n: '1000', guven: '95', oran: '50', evren: '1000' }, out: { 'Hata payı': '± %0' } },
    { in: { n: '0', guven: '95', oran: '50' }, error: true },
    { in: { n: '500', guven: '95', oran: '120' }, error: true },
    { in: { n: '500', guven: '95', oran: '50', evren: '300' }, error: true },
    { in: { n: '12,5', guven: '95', oran: '50' }, error: true },
  ],
  howto: [
    '"Örneklem büyüklüğü" alanına analize giren, tamamlanmış anket sayısını yazın.',
    'Güven düzeyini seçin; kamuoyu araştırmalarında açıklanan hata payları neredeyse her zaman %95 düzeyine göredir.',
    '"Bulunan oran" alanına ankette çıkan yüzdeyi yazın. Tüm sorular için tek ve en temkinli bir hata payı istiyorsanız 50 olarak bırakın.',
    'Hedef kitleniz küçükse ve örneklem bu kitlenin önemli bir bölümünü kapsıyorsa "Evren büyüklüğü" alanını doldurun.',
    '"Hesapla" düğmesine basın; ilk satır hata payını, ikinci satır oranın güven aralığını gösterir.',
  ],
  sections: [
    { h: 'Hata payı nedir?', p: [
      'Bir araştırma evrenin tamamı yerine bir örneklemle yapıldığında, bulunan yüzde evrendeki gerçek yüzdeden bir miktar farklı çıkar. Bu farkın, seçilen güven düzeyinde ulaşabileceği en büyük değere hata payı denir ve sonuçla birlikte "± puan" olarak bildirilir. "Katılımcıların %50\'si memnun, hata payı ±3,1" ifadesi, gerçek oranın %95 güvenle %46,9 ile %53,1 arasında olduğunu söyler.',
      'Hata payı bir kusur ya da yapılan bir yanlışın ölçüsü değildir; örneklemle çalışmanın kaçınılmaz ve hesaplanabilir sonucudur. Raporda yer almaması, sonuçların ne kadar kesin olduğunun değerlendirilmesini olanaksız kılar.',
    ] },
    { h: 'Formül', p: [
      'Bir oran için hata payı şu formülle bulunur: <strong>E = z × √(p × (1 − p) ÷ n)</strong>. z güven düzeyinin kritik değeri (%90 için 1,645; %95 için 1,96; %99 için 2,576), p ondalık olarak oran, n ise örneklem büyüklüğüdür. Karekökün içindeki ifade oranın standart hatasıdır.',
      'Örneklem, sonlu bir evrenin kayda değer bir bölümünü oluşturuyorsa sonuç <strong>√((N − n) ÷ (N − 1))</strong> katsayısıyla çarpılır. Bu sonlu evren düzeltmesi hata payını küçültür; örneklem evrenin %5\'inden azsa etkisi önemsizdir ve genellikle uygulanmaz. Evrenin tamamına ulaşıldığında katsayı sıfır olur, çünkü artık tahmin edilecek bir şey kalmamıştır.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '1.000 kişiyle yapılan bir ankette %95 güven düzeyi ve %50 oran için: p × (1 − p) = 0,25; 0,25 ÷ 1.000 = 0,00025; karekökü 0,01581. Bu değer standart hatadır (%1,58). 1,96 ile çarpıldığında 0,03099, yani <strong>± %3,1</strong> bulunur. Güven aralığı %46,9 – %53,1\'dir.',
      'Aynı ankette bir soruya verilen "evet" yanıtı %30 ise hesap değişir. 500 kişilik bir örneklemde: 0,3 × 0,7 = 0,21; 0,21 ÷ 500 = 0,00042; karekökü 0,02049; 1,96 ile çarpımı 0,0402. Hata payı ± %4,02, güven aralığı %25,98 – %34,02 olur.',
      '1.000 kişilik bir okuldan 200 öğrenciyle görüşüldüğünü düşünelim. Düzeltmesiz hata payı ± %6,93 iken, düzeltme katsayısı √(800 ÷ 999) ≈ 0,8949 uygulandığında ± %6,2\'ye iner.',
    ] },
    { h: 'Örneklem büyüklüğüne göre hata payı (%95 güven, oran %50)', ul: [
      '<strong>100 kişi:</strong> ± %9,8',
      '<strong>400 kişi:</strong> ± %4,9',
      '<strong>600 kişi:</strong> ± %4',
      '<strong>1.000 kişi:</strong> ± %3,1',
      '<strong>1.500 kişi:</strong> ± %2,53',
      '<strong>2.400 kişi:</strong> ± %2',
    ], p: [
      'Hata payı örneklem büyüklüğünün kareköküyle ters orantılıdır. 100 kişiden 400 kişiye çıkmak hatayı yarıya indirirken, 1.000\'den 2.400\'e çıkmak yalnızca bir puanlık iyileşme sağlar. Araştırma şirketlerinin çoğunlukla 1.000 – 2.500 kişilik örneklemlerle çalışmasının nedeni bu azalan getiridir.',
    ] },
    { h: 'Sonuçları yorumlarken dikkat edilecekler', ul: [
      '<strong>İki oran arasındaki fark:</strong> Bir ankette iki seçenek %44 ve %41 çıkmışsa ve hata payı ±3 ise, aradaki 3 puanlık fark tek başına birinin önde olduğunu göstermez. İki oran arasındaki farkın hata payı, tek bir oranın hata payından büyüktür.',
      '<strong>Alt gruplar:</strong> Açıklanan hata payı toplam örneklem içindir. 1.000 kişilik anketin içindeki 150 kişilik bir yaş grubunun sonuçları için hata payı yaklaşık ± %8\'dir.',
      '<strong>Uç oranlar:</strong> Oran %50\'den uzaklaştıkça hata payı küçülür; ancak %5\'in altındaki ya da %95\'in üstündeki oranlarda ve küçük örneklemlerde bu formül kaba kalır.',
      '<strong>Örnekleme dışı hatalar:</strong> Yönlendirici sorular, yanıt vermeyenlerin farklı düşünmesi ya da belirli kesimlere ulaşılamaması hata payına yansımaz, ama sonucu ondan çok daha fazla saptırabilir.',
    ] },
    { h: 'Varsayımlar', p: [
      'Hesap, katılımcıların evrenden basit rastgele örneklemeyle seçildiğini ve oranın örnekleme dağılımının normal dağılıma yakın olduğunu varsayar. Kota, kartopu ya da gönüllü katılıma dayalı çevrim içi anketlerde seçim rastgele olmadığından, formülle bulunan hata payı gerçek belirsizliği olduğundan küçük gösterir. Ağırlıklandırma ya da küme örneklemesi kullanılan araştırmalarda da gerçek hata payı burada hesaplanandan büyüktür.',
      'Bu araç bilgilendirme ve planlama amaçlıdır. Yayımlanacak araştırma raporlarında yöntemin ve hata payının bir istatistik uzmanınca doğrulanması önerilir.',
    ] },
  ],
  faq: [
    ['Hata payı nasıl hesaplanır?', 'Bir oran için z × √(p × (1 − p) ÷ n) formülüyle. %95 güven düzeyinde z = 1,96 alınır. 1.000 kişilik örneklem ve %50 oran için sonuç ± %3,1\'dir.'],
    ['Oranı neden %50 almalıyım?', 'p × (1 − p) çarpımı %50\'de en büyük değerini aldığı için hata payı da en büyük çıkar. Anketin tamamı için tek bir hata payı bildirilecekse bu en temkinli değer kullanılır; hiçbir sorunun gerçek hata payı bundan büyük olmaz.'],
    ['Hata payını yarıya indirmek için ne yapmalıyım?', 'Örneklemi dört katına çıkarmanız gerekir, çünkü hata payı örneklem büyüklüğünün kareköküyle ters orantılıdır. ± %5 için yaklaşık 385, ± %2,5 için yaklaşık 1.537 kişi gerekir.'],
    ['Evren büyüklüğü hata payını etkiler mi?', 'Yalnızca örneklem evrenin önemli bir bölümünü oluşturuyorsa. 1.000 kişilik bir örneklemin hata payı, evren 100 bin de olsa 80 milyon da olsa pratikte aynıdır. Evren birkaç bin kişiyse düzeltme hata payını gözle görülür biçimde küçültür.'],
    ['Hata payı ile güven aralığı aynı şey mi?', 'Yakından ilişkilidir ama aynı değildir. Hata payı aralığın yarı genişliğidir; güven aralığı ise bulunan oranın hata payı kadar altı ve üstü arasındaki bölgedir.'],
    ['Güven düzeyini %99 yaparsam ne olur?', 'Hata payı büyür. Aynı örneklemde %95 yerine %99 seçmek hata payını yaklaşık üçte bir oranında artırır; 1.000 kişi için ± %3,1 yerine ± %4,07 olur. Daha yüksek güven, daha geniş aralık demektir.'],
    ['Ortalama (örneğin puan ortalaması) için hata payını bununla bulabilir miyim?', 'Hayır. Bu araç yüzdeler içindir. Bir ortalamanın hata payı standart sapmaya bağlıdır ve güven aralığı aracıyla hesaplanır.'],
    ['Yazdığım değerler bir yere gönderiliyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; veriler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['orneklem-buyuklugu-hesapla', 'guven-araligi-hesapla', 'yuzde-hesapla', 'standart-sapma-hesapla', 'olasilik-hesapla'],
};
