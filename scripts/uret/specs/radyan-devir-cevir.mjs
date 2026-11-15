export default {
  slug: 'radyan-devir-cevir',
  title: 'Radyan Devir Çevirici',
  h1Tail: 'rad ↔ tur',
  pageTitle: 'Radyan Devir Çevirici – Radyanı Tura, Devri Radyana Çevirme',
  description: 'Radyanı devire (tam tura), deviri radyana çevirin. 1 devir = 2π radyan eşitliğiyle çalışır; derece ve grad karşılığını, π cinsinden değeri de gösterir.',
  card: 'Radyanı tam tura, turu radyana çevirin; derece, grad ve π cinsinden karşılığıyla birlikte.',
  category: 'birim',
  keywords: ['radyan devir çevirme', '1 devir kaç radyan', 'radyan tur çevirici', '2 pi radyan kaç devir', 'devir radyan hesaplama', 'tam tur kaç radyan', 'radyan kaç tur'],
  lead: 'Bir açıyı radyandan devire (tam tura) ya da devirden radyana çevirin. Araç <strong>1 devir = 2π radyan</strong> eşitliğini kullanır ve aynı açının derece, grad ve π cinsinden karşılığını da verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Açı değeri', type: 'number', placeholder: 'Örn. 2,5', hint: 'Ters yöndeki dönüşler için negatif değer yazabilirsiniz.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['rad', 'Radyan → Devir'], ['devir', 'Devir → Radyan']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    const IKI_PI = 2 * Math.PI;
    const devir = v.yon === 'devir' ? x : x / IKI_PI;
    const rad = v.yon === 'devir' ? x * IKI_PI : x;
    const satirRad = ['Radyan', h.fmt(rad, 6) + ' rad'];
    const satirDevir = ['Devir', h.fmt(devir, 6) + ' devir'];
    return {
      rows: [
        v.yon === 'devir' ? satirRad : satirDevir,
        v.yon === 'devir' ? satirDevir : satirRad,
        ['π cinsinden', h.fmt(devir * 2, 6) + 'π rad'],
        ['Derece', h.fmt(devir * 360, 4) + '°'],
        ['Grad', h.fmt(devir * 400, 4) + ' grad'],
      ],
      note: '1 devir = 2π rad ≈ 6,283185 rad = 360° = 400 grad. Sonuçlar en fazla altı ondalık basamakla gösterilir.',
    };
  },
  cases: [
    { in: { deger: '1', yon: 'devir' }, out: { 'Radyan': '6,283185 rad', 'Derece': '360°', 'π cinsinden': '2π rad' } },
    { in: { deger: '1', yon: 'rad' }, out: { 'Devir': '0,159155 devir', 'Derece': '57,2958°' } },
    { in: { deger: '0,5', yon: 'devir' }, out: { 'Radyan': '3,141593 rad', 'Derece': '180°', 'Grad': '200 grad' } },
    { in: { deger: '0,25', yon: 'devir' }, out: { 'Radyan': '1,570796 rad', 'π cinsinden': '0,5π rad', 'Derece': '90°' } },
    { in: { deger: '10', yon: 'devir' }, out: { 'Radyan': '62,831853 rad', 'Derece': '3.600°' } },
    { in: { deger: '3,14159265359', yon: 'rad' }, out: { 'Devir': '0,5 devir', 'Derece': '180°' } },
    { in: { deger: '0', yon: 'rad' }, out: { 'Devir': '0 devir' } },
    { in: { deger: 'abc', yon: 'rad' }, error: true },
    { in: { deger: '', yon: 'devir' }, error: true },
  ],
  howto: [
    '"Açı değeri" alanına çevirmek istediğiniz sayıyı yazın. Ondalık kısım için virgül ya da nokta kullanabilirsiniz; saat yönündeki dönüşü göstermek için başına eksi işareti koyabilirsiniz.',
    '"Çeviri yönü" listesinden radyandan devire mi, devirden radyana mı geçeceğinizi seçin.',
    '"Çevir" düğmesine basın. İlk satırda aradığınız karşılık, altında aynı açının π cinsinden, derece ve grad olarak değeri görünür.',
    'Sonucu ödevinize, hesap tablonuza ya da programınıza aktarmak için "Sonucu kopyala" düğmesini kullanın.',
  ],
  sections: [
    { h: 'Radyan ve devir ne demektir?', p: [
      'Radyan, açıyı çember üzerindeki yay uzunluğuyla tanımlayan birimdir: yarıçapı kadar uzunlukta bir yayı gören merkez açı 1 radyandır. Bir çemberin çevresi 2π çarpı yarıçap olduğu için, çemberin tamamını dolanan açı 2π radyana, yani yaklaşık 6,283185 radyana eşittir. Radyan Uluslararası Birim Sistemi\'nin açı birimidir ve fizikte, mühendislikte, programlama dillerinin trigonometri fonksiyonlarında varsayılan birim olarak kullanılır.',
      'Devir ise bir cismin kendi ekseni ya da bir merkez çevresinde attığı tam turdur. Türkçede "tur" ya da "tam dönüş" olarak da söylenir; İngilizce kaynaklarda "revolution" ya da "turn" adıyla ve çoğu zaman "rev" kısaltmasıyla geçer. Motor millerinin, çarkların, tekerleklerin ve disklerin hareketi gündelik dilde hep devirle anlatılır, çünkü kaç tur atıldığını saymak sezgiseldir. Hesap yaparken ise formüllerin çoğu radyan ister; bu iki birim arasında gidip gelmek bu yüzden çok sık gerekir.',
    ] },
    { h: 'Çeviri formülü', p: [
      'İki birim arasındaki bağ tek bir eşitliktir: <strong>1 devir = 2π radyan</strong>. Devirden radyana geçmek için değeri 2π ile çarparsınız: <strong>rad = devir × 2π</strong>. Radyandan devire geçmek için 2π\'ye bölersiniz: <strong>devir = rad ÷ 2π</strong>. π sayısı irrasyonel olduğu için sonuçlar çoğu zaman ondalıklı çıkar; bu nedenle araç değeri "π cinsinden" satırında da verir. Örneğin çeyrek tur 1,570796 radyandır, ama matematik derslerinde bunu 0,5π, yani π/2 olarak yazmak hem daha kısa hem de tam değerdir.',
      'Dereceyle ilişki de aynı mantığı izler: tam tur 360 derece olduğundan 1 radyan 360 ÷ 2π ≈ 57,2958 derecedir. Grad (gon) biriminde tam tur 400 grad sayılır; haritacılıkta ve bazı ölçüm aletlerinde kullanılır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Bir çark 10 tam tur atıyor. Açısal yer değiştirme kaç radyandır? 10 × 2π = 62,831853 rad. Araçta "Devir → Radyan" yönünü seçip 10 yazdığınızda bu değeri ve 3.600 derece karşılığını görürsünüz.',
      '<strong>Örnek 2:</strong> Bir sarkaç kolu 1 radyan dönüyor. Bu, tam turun ne kadarıdır? 1 ÷ 2π = 0,159155 devir, yani bir turun yaklaşık yüzde 16\'sı. Derece karşılığı 57,2958°\'dir.',
      '<strong>Örnek 3:</strong> Bir robot kolunun eklemi yarım tur dönecek. Denetleyiciye radyan girilmesi gerekiyor: 0,5 × 2π = 3,141593 rad, yani tam olarak π radyan ve 180 derece.',
    ] },
    { h: 'Nerelerde işe yarar?', p: [
      'Lise ve üniversite fizik derslerinde dönme hareketi sorularında açısal yer değiştirme çoğunlukla "tur" olarak verilir, ancak açısal hız ve açısal ivme formülleri radyan üzerinden çalışır. Yay uzunluğu hesabında da aynı durum geçerlidir: yay uzunluğu, yarıçap ile radyan cinsinden açının çarpımıdır. Yarıçapı 0,3 metre olan bir tekerlek 5 tur attığında aldığı yol 0,3 × 5 × 2π ≈ 9,42 metredir; burada tur sayısını önce radyana çevirmek gerekir.',
      'Makine ve otomasyon tarafında step motor, servo ve enkoder ayarlarında konum bazen devir, bazen radyan olarak istenir. CNC tezgâhlarında, robot kollarında ve döner tablalarda sürücü yazılımı ile mekanik tasarım farklı birimler kullanabilir. Yazılım geliştirirken de sinüs ve kosinüs gibi fonksiyonlar radyan bekler; bir animasyonda nesneyi "üç çeyrek tur" döndürmek istiyorsanız 0,75 devrin 4,712389 radyan olduğunu bilmeniz gerekir.',
    ] },
    { h: 'Hızlı başvuru değerleri', ul: [
      '<strong>1/8 devir</strong> = π/4 rad ≈ 0,785398 rad = 45°',
      '<strong>1/4 devir</strong> = π/2 rad ≈ 1,570796 rad = 90°',
      '<strong>1/2 devir</strong> = π rad ≈ 3,141593 rad = 180°',
      '<strong>3/4 devir</strong> = 3π/2 rad ≈ 4,712389 rad = 270°',
      '<strong>1 devir</strong> = 2π rad ≈ 6,283185 rad = 360°',
      '<strong>2 devir</strong> = 4π rad ≈ 12,566371 rad = 720°',
      '<strong>1 rad</strong> ≈ 0,159155 devir ≈ 57,2958°',
    ] },
    { h: 'Sık yapılan hatalar', p: [
      'En yaygın hata, π ile 2π\'yi karıştırmaktır. π radyan tam tur değil, yarım turdur; tam tur 2π radyandır. İkinci hata, hesap makinesinin açı kipini kontrol etmemektir: makine derece kipindeyken radyan değeri girilirse trigonometrik sonuçlar tamamen yanlış çıkar. Üçüncü hata, açı ile açısal hızı karıştırmaktır. Dakikadaki devir sayısı (devir/dakika) bir hız birimidir ve radyan/saniyeye çevrilirken ayrıca 60\'a bölmek gerekir; bu sayfa yalnızca açının kendisini çevirir.',
      'Bir tam turdan büyük ya da negatif değerler de geçerlidir. 2,5 devir, iki tam turun üzerine yarım tur daha dönüldüğünü; eksi işaretli bir değer ise dönüşün ters yönde olduğunu anlatır. Matematikte saat yönünün tersi pozitif kabul edilir.',
    ] },
    { h: 'Duyarlılık ve sınırlar', p: [
      'Hesaplama, tarayıcınızın çift duyarlıklı kayan nokta aritmetiğiyle ve π\'nin yaklaşık on beş anlamlı basamağıyla yapılır; sonuç altı ondalık basamağa yuvarlanarak gösterilir. Bu duyarlılık ders, atölye ve yazılım işlerinin tamamı için fazlasıyla yeterlidir. Radyan değerini elle yazarken π\'yi kısaltırsanız (örneğin 3,14) devir sonucu tam 0,5 yerine 0,499747 gibi çıkabilir; bu aracın değil, girilen değerin yuvarlanmasının sonucudur.',
    ] },
  ],
  faq: [
    ['1 devir kaç radyandır?', '1 devir tam olarak 2π radyandır; ondalık gösterimle yaklaşık 6,283185 radyan eder. Aynı açı 360 dereceye ve 400 grada karşılık gelir.'],
    ['1 radyan kaç devirdir?', '1 radyan, 1 ÷ 2π ≈ 0,159155 devirdir. Başka bir deyişle tam turun yaklaşık altıda birinden biraz azıdır ve 57,2958 dereceye eşittir.'],
    ['π radyan kaç turdur?', 'π radyan yarım turdur, yani 0,5 devir ya da 180 derecedir. Tam tur için 2π radyan gerekir. İkisini karıştırmak dönme hareketi sorularında en sık yapılan hatadır.'],
    ['Devir ile tur aynı şey midir?', 'Evet. Devir, tur ve tam dönüş aynı açıyı anlatır: bir cismin başladığı konuma geri gelecek kadar dönmesi. İngilizce kaynaklardaki "revolution" ve "turn" sözcükleri de bu anlamdadır.'],
    ['Devir/dakikayı radyan/saniyeye nasıl çeviririm?', 'Önce devir sayısını 2π ile çarparak radyana, sonra 60\'a bölerek saniyeye çevirirsiniz. Örneğin 1.500 devir/dakika, 1.500 × 2π ÷ 60 ≈ 157,08 rad/s eder. Bu sayfa açı çevirir; hız için ayrıca 60\'a bölmeyi unutmayın.'],
    ['Negatif ya da 1\'den büyük devir yazabilir miyim?', 'Evet. 3,5 devir üç tam tur ve yarım tur demektir; negatif değer ise ters yöndeki dönüşü gösterir. Araç her iki durumu da olduğu gibi çevirir, açıyı 0–1 tur arasına indirgemez.'],
    ['Sonuç neden π cinsinden de gösteriliyor?', 'Çünkü okul matematiğinde ve teknik çizimlerde açılar çoğunlukla π/2, 3π/4 gibi yazılır. "π cinsinden" satırındaki katsayı, açının kaç π radyan olduğunu doğrudan verir; 0,5π demek π/2 demektir.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz sayı hiçbir sunucuya gönderilmez ve saklanmaz. Sayfa açıldıktan sonra çevrimdışı da çalışır.'],
  ],
  related: ['derece-radyan-cevir', 'derece-grad-cevir', 'hz-rpm-cevir', 'aci-hizi-hesapla', 'dms-ondalik-derece-cevir'],
};
