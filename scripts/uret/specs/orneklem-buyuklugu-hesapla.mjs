export default {
  slug: 'orneklem-buyuklugu-hesapla',
  title: 'Örneklem Büyüklüğü Hesaplama',
  h1Tail: 'anket ve araştırma için',
  pageTitle: 'Örneklem Büyüklüğü Hesaplama – Anket İçin Kaç Kişi Gerekir?',
  description: 'Güven düzeyi, hata payı ve evren büyüklüğüne göre anketiniz için gereken en az katılımcı sayısını hesaplayın. Cochran formülü ve sonlu evren düzeltmesi kullanılır.',
  card: 'Güven düzeyi, hata payı ve evren büyüklüğünü girin; anket ya da tez araştırmanız için gereken en az örneklem sayısını bulun.',
  category: 'matematik',
  keywords: ['örneklem büyüklüğü hesaplama', 'anket kaç kişiye yapılmalı', 'örneklem sayısı hesaplama', 'cochran formülü', 'evren örneklem hesaplama', 'tez örneklem büyüklüğü', '%95 güven %5 hata payı örneklem', 'sonlu evren düzeltmesi'],
  lead: 'Bir anket ya da oran araştırmasında, istediğiniz <strong>güven düzeyi</strong> ve <strong>hata payını</strong> sağlamak için en az kaç kişiye ulaşmanız gerektiğini bulun. Evren büyüklüğünü yazarsanız sonuç sonlu evren düzeltmesiyle küçültülür; yanıt oranı girerseniz kaç kişiye davet göndermeniz gerektiği de hesaplanır.',
  button: 'Hesapla',
  inputs: [
    { id: 'guven', label: 'Güven düzeyi', type: 'select', options: [['95', '%95'], ['90', '%90'], ['99', '%99'], ['80', '%80'], ['98', '%98']] },
    { id: 'hata', label: 'Hata payı (%)', type: 'number', value: '5', hint: 'Kabul edilebilir sapma, ± yüzde puan olarak' },
    { id: 'oran', label: 'Tahmini oran (%)', type: 'number', value: '50', hint: 'Bilinmiyorsa 50 bırakın; en büyük örneklemi verir' },
    { id: 'evren', label: 'Evren büyüklüğü (isteğe bağlı)', type: 'number', placeholder: 'Örn. 10000', hint: 'Hedef kitledeki toplam kişi sayısı; çok büyük ya da bilinmiyorsa boş bırakın' },
    { id: 'yanit', label: 'Beklenen yanıt oranı (%) (isteğe bağlı)', type: 'number', placeholder: 'Örn. 40' },
  ],
  compute(v, h) {
    const zTablo = { '80': 1.2815515655, '90': 1.6448536270, '95': 1.9599639845, '98': 2.3263478740, '99': 2.5758293035 };
    const duzey = String(v.guven);
    if (!(duzey in zTablo)) h.err('Listeden bir güven düzeyi seçin.');
    const z = zTablo[duzey];
    const e = h.pos(v.hata, 'Hata payı (%)');
    if (e >= 50) h.err('"Hata payı (%)" 50\'den küçük olmalı; yaygın değerler 1 ile 10 arasındadır.');
    const pY = h.num(v.oran, 'Tahmini oran (%)');
    if (!(pY > 0 && pY < 100)) h.err('"Tahmini oran (%)" 0 ile 100 arasında olmalı (uçlar hariç). Bilmiyorsanız 50 yazın.');
    const evrenVar = String(v.evren ?? '').trim() !== '';
    const N = evrenVar ? h.posint(v.evren, 'Evren büyüklüğü') : null;
    const yanitVar = String(v.yanit ?? '').trim() !== '';
    const r = yanitVar ? h.pos(v.yanit, 'Beklenen yanıt oranı (%)') : null;
    if (r !== null && r > 100) h.err('"Beklenen yanıt oranı (%)" 100\'den büyük olamaz.');
    const p = pY / 100, d = e / 100;
    const n0 = z * z * p * (1 - p) / (d * d);
    const yukari = (x) => Math.ceil(x - 1e-9);
    const ham = N === null ? n0 : n0 / (1 + (n0 - 1) / N);
    let n = Math.max(1, yukari(ham));
    if (N !== null && n > N) n = N;
    const rows = [
      ['Gerekli örneklem büyüklüğü', h.fmt(n, 0)],
      ['Yuvarlanmamış değer', h.fmt(ham, 2)],
    ];
    if (N !== null) {
      rows.push(['Sonsuz evren için değer', h.fmt(yukari(n0), 0)]);
      rows.push(['Evrenin yüzdesi', '%' + h.fmt(n / N * 100, 2)]);
    }
    rows.push(['z değeri', h.fmt(z, 4)]);
    let note = 'Sonuç, basit rastgele örnekleme ve bir oranın (yüzdenin) tahmini için geçerlidir; kesirli değer her zaman yukarı yuvarlanır.';
    if (r !== null) {
      const davet = yukari(n / (r / 100));
      rows.push(['Davet edilecek kişi sayısı', h.fmt(davet, 0)]);
      if (N !== null && davet > N) note = 'Bu yanıt oranıyla gereken davet sayısı evren büyüklüğünü aşıyor; hedefe ulaşmak için yanıt oranını artırmanız ya da hata payını genişletmeniz gerekir. ' + note;
    }
    return { rows, note };
  },
  cases: [
    { in: { guven: '95', hata: '5', oran: '50' }, out: { 'Gerekli örneklem büyüklüğü': '385', 'Yuvarlanmamış değer': '384,15', 'z değeri': '1,96' } },
    { in: { guven: '95', hata: '5', oran: '50', evren: '10000' }, out: { 'Gerekli örneklem büyüklüğü': '370', 'Yuvarlanmamış değer': '369,97', 'Sonsuz evren için değer': '385', 'Evrenin yüzdesi': '%3,7' } },
    { in: { guven: '99', hata: '5', oran: '50' }, out: { 'Gerekli örneklem büyüklüğü': '664', 'z değeri': '2,5758' } },
    { in: { guven: '95', hata: '3', oran: '50' }, out: { 'Gerekli örneklem büyüklüğü': '1.068' } },
    { in: { guven: '90', hata: '5', oran: '50' }, out: { 'Gerekli örneklem büyüklüğü': '271' } },
    { in: { guven: '95', hata: '5', oran: '50', evren: '1000' }, out: { 'Gerekli örneklem büyüklüğü': '278', 'Evrenin yüzdesi': '%27,8' } },
    { in: { guven: '95', hata: '5', oran: '20' }, out: { 'Gerekli örneklem büyüklüğü': '246', 'Yuvarlanmamış değer': '245,85' } },
    { in: { guven: '95', hata: '2', oran: '50' }, out: { 'Gerekli örneklem büyüklüğü': '2.401' } },
    { in: { guven: '95', hata: '4', oran: '30', evren: '2500' }, out: { 'Gerekli örneklem büyüklüğü': '420', 'Evrenin yüzdesi': '%16,8' } },
    { in: { guven: '95', hata: '5', oran: '50', evren: '100' }, out: { 'Gerekli örneklem büyüklüğü': '80' } },
    { in: { guven: '95', hata: '5', oran: '50', yanit: '40' }, out: { 'Gerekli örneklem büyüklüğü': '385', 'Davet edilecek kişi sayısı': '963' } },
    { in: { guven: '95', hata: '0', oran: '50' }, error: true },
    { in: { guven: '95', hata: '5', oran: '100' }, error: true },
    { in: { guven: '95', hata: '5', oran: '50', evren: '-20' }, error: true },
    { in: { guven: '95', hata: 'beş', oran: '50' }, error: true },
  ],
  howto: [
    'Güven düzeyini seçin. Sosyal bilimlerde ve pazar araştırmalarında standart tercih %95\'tir.',
    '"Hata payı" alanına sonucun gerçek değerden en çok kaç yüzde puan sapmasını kabul ettiğinizi yazın; ±5 için 5, ±3 için 3.',
    'Ölçeceğiniz oran hakkında bir ön bilginiz yoksa "Tahmini oran" alanını 50 olarak bırakın.',
    'Hedef kitlenizin toplam büyüklüğü belliyse (örneğin bir okulun 1.200 öğrencisi) "Evren büyüklüğü" alanına yazın; bilinmiyorsa ya da yüz binlerin üzerindeyse boş bırakın.',
    'İsterseniz beklediğiniz yanıt oranını girin ve "Hesapla" düğmesine basın; ilk satır ulaşmanız gereken en az tamamlanmış anket sayısıdır.',
  ],
  sections: [
    { h: 'Örneklem büyüklüğü neden hesaplanır?', p: [
      'Bir evrenin tamamına ulaşmak çoğu zaman olanaksız ya da gereksiz derecede pahalıdır; bunun yerine evrenden seçilen bir örnekleme soru sorulur ve sonuç evrene genellenir. Örneklem çok küçükse bulunan yüzdeler şansa bağlı olarak gerçek değerden uzak çıkabilir; gereğinden büyükse zaman ve bütçe boşa harcanır. Örneklem büyüklüğü hesabı, istenen kesinliğe ulaşmak için yeterli olan en küçük sayıyı verir.',
      'Lisansüstü tezlerde, müşteri memnuniyeti anketlerinde, kamuoyu yoklamalarında ve kalite denetimlerinde bu hesap çalışmanın yöntem bölümünün ilk adımlarından biridir ve çoğunlukla gerekçesiyle birlikte raporlanması istenir.',
    ] },
    { h: 'Kullanılan formül', p: [
      'Evren çok büyük olduğunda Cochran formülü kullanılır: <strong>n₀ = z² × p × (1 − p) ÷ e²</strong>. Burada z seçilen güven düzeyinin standart normal dağılımdaki kritik değeri (%95 için 1,96), p tahmin edilen oran, e ise ondalık olarak yazılmış hata payıdır.',
      'Evren büyüklüğü N biliniyorsa sonlu evren düzeltmesi uygulanır: <strong>n = n₀ ÷ (1 + (n₀ − 1) ÷ N)</strong>. Bu düzeltme küçük evrenlerde gereken sayıyı belirgin biçimde azaltır; evren büyüdükçe etkisi kaybolur. Sonuç tam sayı çıkmazsa her zaman yukarı yuvarlanır, çünkü aşağı yuvarlamak hedeflenen hata payını bir miktar aşmak anlamına gelir.',
    ] },
    { h: 'Çözümlü örnek', p: [
      '%95 güven düzeyi, ±%5 hata payı ve %50 tahmini oran için: z² = 1,96² ≈ 3,8415; p × (1 − p) = 0,25; e² = 0,0025. n₀ = 3,8415 × 0,25 ÷ 0,0025 ≈ 384,15 bulunur ve yukarı yuvarlanarak <strong>385</strong> kişi elde edilir. Araştırma yöntemleri kitaplarında sıkça geçen "384" ya da "385" sayısının kaynağı budur.',
      'Aynı koşullarda evren 10.000 kişi ise: n = 384,15 ÷ (1 + 383,15 ÷ 10.000) ≈ 369,97, yani <strong>370</strong> kişi yeterlidir. Evren 1.000 kişiye düştüğünde gereken sayı 278\'e, 100 kişilik bir evrende ise 80\'e iner. Küçük evrenlerde örneklemin evrene oranının çok yükseldiğine dikkat edin; 100 kişilik bir grupta çoğu zaman herkese ulaşmaya çalışmak daha pratiktir.',
    ] },
    { h: 'Tahmini oran neden %50 alınır?', p: [
      'p × (1 − p) çarpımı en büyük değerini p = 0,5 iken alır (0,25). Dolayısıyla %50 varsayımı, gereken örneklemi olabilecek en yüksek düzeyde hesaplar ve gerçek oran ne çıkarsa çıksın hedeflenen hata payının aşılmamasını güvenceye alır. Önceki bir çalışmadan ya da pilot uygulamadan oranın örneğin %20 dolayında olduğunu biliyorsanız bu değeri girebilirsiniz; aynı koşullarda gereken sayı 385\'ten 246\'ya düşer.',
    ] },
    { h: 'Hızlı başvuru değerleri (sonsuz evren, oran %50)', ul: [
      '<strong>%90 güven, ±%5:</strong> 271 kişi',
      '<strong>%95 güven, ±%10:</strong> 97 kişi',
      '<strong>%95 güven, ±%5:</strong> 385 kişi',
      '<strong>%95 güven, ±%3:</strong> 1.068 kişi',
      '<strong>%95 güven, ±%2:</strong> 2.401 kişi',
      '<strong>%99 güven, ±%5:</strong> 664 kişi',
    ], p: [
      'Tablodan görüleceği gibi hata payını yarıya indirmek örneklemi yaklaşık dört katına çıkarır; kesinlik arttıkça maliyet hızla yükselir.',
    ] },
    { h: 'Yanıt oranı ve saha planlaması', p: [
      'Hesaplanan sayı, analiz edilebilir biçimde tamamlanmış anket sayısıdır. Davet edilen herkes yanıt vermeyeceği için daha fazla kişiye ulaşmanız gerekir. Yanıt oranı alanına beklentinizi yazdığınızda araç gereken sayıyı bu orana böler: 385 tamamlanmış anket için %40 yanıt oranıyla 963 kişiye davet gönderilmelidir. Eksik ya da geçersiz doldurulan formlar için ayrıca küçük bir pay bırakmak iyi bir alışkanlıktır.',
    ] },
    { h: 'Sınırlar ve dikkat edilecekler', p: [
      'Formül, katılımcıların evrenden basit rastgele yöntemle seçildiğini varsayar. Tabakalı ya da küme örneklemesi kullanılıyorsa tasarım etkisi nedeniyle daha büyük bir örneklem gerekebilir. Kolayda örnekleme ile (yalnızca ulaşılabilen kişilerle) toplanan veride sayı ne kadar büyük olursa olsun sonuçlar evrene güvenle genellenemez; büyük örneklem, yanlı seçimi düzeltmez.',
      'Bu hesap bir oranın tahmini içindir. Grup ortalamalarının karşılaştırılması, korelasyon ya da regresyon gibi analizlerde gereken sayı güç analiziyle belirlenir ve farklı çıkabilir. Alt gruplar (örneğin şehirler ya da yaş grupları) için ayrı ayrı sonuç raporlanacaksa her alt grubun kendi içinde yeterli sayıya ulaşması gerekir. Sonuçlar planlama amaçlı bilgi verir; tez ve yayın çalışmalarında yöntemi danışmanınızla ya da bir istatistik uzmanıyla doğrulayın.',
    ] },
  ],
  faq: [
    ['Anket için en az kaç kişi gerekir?', 'Bu, istenen güven düzeyine ve hata payına bağlıdır. En yaygın koşul olan %95 güven ve ±%5 hata payı için, büyük bir evrende 385 kişi yeterlidir. ±%3 hata payı için 1.068 kişi gerekir.'],
    ['Evren büyüdükçe örneklem de sürekli büyür mü?', 'Hayır. Evren büyüdükçe gereken sayı bir üst sınıra yaklaşır. %95 güven ve ±%5 hata payında 10.000 kişilik evren için 370, 100.000 kişilik evren için 383, çok büyük evrenler için 385 kişi gerekir. Bir ülke çapındaki araştırma ile bir il çapındaki araştırmanın benzer örneklem büyüklükleri kullanabilmesinin nedeni budur.'],
    ['Evren büyüklüğünü bilmiyorsam ne yapmalıyım?', 'Alanı boş bırakın. Araç evreni sonsuz kabul eder ve en temkinli (en büyük) sayıyı verir. Evren birkaç on binin üzerindeyse düzeltmenin etkisi zaten çok küçüktür.'],
    ['Hata payı ile güven düzeyi arasındaki fark nedir?', 'Hata payı, bulduğunuz yüzdenin gerçek değerden en çok ne kadar sapabileceğini; güven düzeyi ise bu iddianın ne sıklıkla doğru çıkacağını anlatır. "%95 güvenle ±%5" ifadesi, aynı yöntemle yapılan 100 araştırmanın yaklaşık 95\'inde sonucun gerçek değerin 5 puan yakınında olacağı anlamına gelir.'],
    ['Sonuç neden hep yukarı yuvarlanıyor?', 'Kesirli sayıda kişi olamayacağı ve aşağı yuvarlama hedeflenen hata payını aşacağı için. 384,15 değeri bu nedenle 384 değil 385 olarak verilir.'],
    ['Hesaplanan sayıya ulaşamazsam ne olur?', 'Araştırma geçersiz olmaz, ancak hata payınız planladığınızdan geniş olur. Ulaştığınız katılımcı sayısıyla gerçekleşen hata payını ayrıca hesaplayıp raporda belirtmeniz gerekir.'],
    ['Bu hesap deneysel çalışmalar için de geçerli mi?', 'Hayır. İki grubun karşılaştırıldığı deneylerde ya da ilişki analizlerinde örneklem büyüklüğü, beklenen etki büyüklüğü ve istatistiksel güç üzerinden hesaplanır. Bu araç yalnızca bir oranın belirli bir kesinlikle tahmini içindir.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesap tarayıcınızda yapılır; yazdığınız değerler sunucuya gönderilmez.'],
  ],
  related: ['hata-payi-hesapla', 'guven-araligi-hesapla', 'yuzde-hesapla', 'standart-sapma-hesapla', 'z-skoru-hesapla'],
};
