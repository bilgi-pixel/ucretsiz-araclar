export default {
  slug: 'kva-kw-cevir',
  title: 'kVA kW Çevirici',
  h1Tail: 'kVA ↔ kW',
  pageTitle: 'kVA kW Çevirici – kVA\'dan kW\'a, kW\'tan kVA\'ya Hesaplama',
  description: 'kVA değerini kW\'a, kW değerini kVA\'ya güç faktörüne göre çevirin. Reaktif gücü (kVAR) ve faz açısını da gösterir; jeneratör ve trafo seçiminde kullanışlıdır.',
  card: 'kVA\'yı kW\'a ya da kW\'ı kVA\'ya güç faktörüyle çevirin; reaktif güç (kVAR) ve faz açısı da hesaplanır.',
  category: 'elektrik',
  keywords: ['kva kw çevirme', '1 kva kaç kw', 'kw kva hesaplama', 'kva nedir', 'jeneratör kva kw', '100 kva kaç kw', 'kva kvar hesaplama'],
  lead: 'Görünür gücü (kVA) aktif güce (kW) ya da aktif gücü görünür güce çevirin. İki birim arasındaki oran <strong>güç faktörüdür</strong> (cos φ): kW = kVA × cos φ. Araç ayrıca reaktif gücü ve faz açısını verir.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Değer', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['kvakw', 'kVA → kW'], ['kwkva', 'kW → kVA']] },
    { id: 'cosfi', label: 'Güç faktörü (cos φ)', type: 'number', value: '0,8', hint: '0 ile 1 arasında. Jeneratör etiketlerinde çoğunlukla 0,8 kabul edilir.' },
  ],
  compute(v, h) {
    const x = h.pos(v.deger, 'Değer');
    const pf = h.pos(v.cosfi, 'Güç faktörü');
    if (pf > 1) h.err('"Güç faktörü" 1\'den büyük olamaz; 0 ile 1 arasında bir değer yazın (örn. 0,8).');
    const kva = v.yon === 'kwkva' ? x / pf : x;
    const kw = kva * pf;
    const kvar = kva * Math.sqrt(Math.max(0, 1 - pf * pf));
    const aci = Math.acos(pf) * 180 / Math.PI;
    const rows = v.yon === 'kwkva'
      ? [['Görünür güç', h.fmt(kva, 3) + ' kVA'], ['Aktif güç', h.fmt(kw, 3) + ' kW']]
      : [['Aktif güç', h.fmt(kw, 3) + ' kW'], ['Görünür güç', h.fmt(kva, 3) + ' kVA']];
    rows.push(['Reaktif güç', h.fmt(kvar, 3) + ' kVAR']);
    rows.push(['Faz açısı (φ)', h.fmt(aci, 2) + '°']);
    return { rows, note: 'kW = kVA × cos φ; kVAR = kVA × sin φ. Sonuç bilgilendirme amaçlıdır; jeneratör ve trafo seçimi için uzman görüşü alın.' };
  },
  cases: [
    { in: { deger: '100', yon: 'kvakw', cosfi: '0,8' }, out: { 'Aktif güç': '80 kW', 'Reaktif güç': '60 kVAR', 'Faz açısı (φ)': '36,87°' } },
    { in: { deger: '50', yon: 'kwkva', cosfi: '0,8' }, out: { 'Görünür güç': '62,5 kVA', 'Reaktif güç': '37,5 kVAR' } },
    { in: { deger: '10', yon: 'kvakw', cosfi: '1' }, out: { 'Aktif güç': '10 kW', 'Reaktif güç': '0 kVAR', 'Faz açısı (φ)': '0°' } },
    { in: { deger: '250', yon: 'kvakw', cosfi: '0,9' }, out: { 'Aktif güç': '225 kW', 'Reaktif güç': '108,972 kVAR' } },
    { in: { deger: '15', yon: 'kwkva', cosfi: '0,6' }, out: { 'Görünür güç': '25 kVA', 'Reaktif güç': '20 kVAR', 'Faz açısı (φ)': '53,13°' } },
    { in: { deger: '1', yon: 'kvakw' }, out: { 'Aktif güç': '0,8 kW' } },
    { in: { deger: '100', yon: 'kvakw', cosfi: '1,2' }, error: true },
    { in: { deger: '100', yon: 'kvakw', cosfi: '0' }, error: true },
    { in: { deger: '', yon: 'kvakw', cosfi: '0,8' }, error: true },
  ],
  howto: [
    '"Değer" alanına elinizdeki gücü yazın: jeneratör ya da trafo etiketindeki kVA değerini veya yüklerinizin toplam kW değerini.',
    '"Çeviri yönü" listesinden kVA\'dan kW\'a mı, kW\'tan kVA\'ya mı çevireceğinizi seçin.',
    'Güç faktörünü girin. Etikette yazıyorsa onu kullanın; bilinmiyorsa jeneratör hesaplarında 0,8 yaygın kabuldür.',
    '"Çevir" düğmesine basın. Aktif güç, görünür güç, reaktif güç ve faz açısı ayrı satırlarda görünür.',
  ],
  sections: [
    { h: 'kVA ve kW arasındaki fark', p: [
      'Alternatif akımda üç ayrı güç tanımı vardır. <strong>Aktif güç</strong> (kW) ısıya, ışığa ya da mekanik işe dönüşen, yani gerçekten tüketilen güçtür ve elektrik sayacının ölçtüğü enerji bu gücün zamanla çarpımıdır. <strong>Reaktif güç</strong> (kVAR) motor ve trafolardaki manyetik alanı kurmak için şebeke ile yük arasında gidip gelen, iş yapmayan güçtür. <strong>Görünür güç</strong> (kVA) ise bu ikisinin vektörel toplamıdır ve kaynağın taşımak zorunda olduğu toplam yükü gösterir.',
      'Jeneratör, trafo ve kesintisiz güç kaynağı gibi cihazların kapasitesi bu nedenle kVA ile belirtilir: sargılar ve kablolar akımın tamamını taşır, akımın faydalı olup olmaması onları ilgilendirmez. Tüketici cihazların gücü ise çoğunlukla kW ile verilir. İkisini karşılaştırabilmek için çeviri gerekir.',
    ] },
    { h: 'Formüller ve güç üçgeni', p: [
      'Üç güç bir dik üçgenin kenarları gibi düşünülür: yatay kenar aktif güç, dikey kenar reaktif güç, hipotenüs görünür güçtür. Aktif güç ile görünür güç arasındaki açı φ, bu açının kosinüsü de güç faktörüdür.',
    ], ul: [
      '<strong>kW = kVA × cos φ</strong>',
      '<strong>kVA = kW ÷ cos φ</strong>',
      '<strong>kVAR = kVA × sin φ</strong> = √(kVA² − kW²)',
      '<strong>φ = arccos(cos φ)</strong>',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Örnek 1:</strong> Etiketinde 100 kVA yazan ve güç faktörü 0,8 olan bir jeneratör 100 × 0,8 = 80 kW aktif güç verebilir. Reaktif güç √(100² − 80²) = 60 kVAR, faz açısı 36,87 derecedir.',
      '<strong>Örnek 2:</strong> Toplam 50 kW gücündeki yükleri, güç faktörü 0,8 iken besleyecek kaynağın en az 50 ÷ 0,8 = 62,5 kVA olması gerekir. Bu yükün reaktif gücü 37,5 kVAR\'dır.',
      '<strong>Örnek 3:</strong> 15 kW çeken ve güç faktörü 0,6 olan kompanzasyonsuz bir tesis şebekeden 15 ÷ 0,6 = 25 kVA çeker; reaktif güç 20 kVAR, faz açısı 53,13 derecedir. Güç faktörü düştükçe aynı iş için gereken görünür gücün ne kadar arttığı bu örnekte açıkça görülür.',
    ] },
    { h: 'Güç faktörü 0,8 iken hızlı başvuru', ul: [
      '<strong>5 kVA</strong> = 4 kW',
      '<strong>10 kVA</strong> = 8 kW',
      '<strong>25 kVA</strong> = 20 kW',
      '<strong>50 kVA</strong> = 40 kW',
      '<strong>100 kVA</strong> = 80 kW',
      '<strong>250 kVA</strong> = 200 kW',
      '<strong>400 kVA</strong> = 320 kW',
      '<strong>630 kVA</strong> = 504 kW',
      '<strong>1.000 kVA</strong> = 800 kW',
    ] },
    { h: 'Jeneratör ve trafo seçerken', p: [
      'Bir işyerine ya da şantiyeye jeneratör seçerken önce çalışacak yüklerin kW değerleri toplanır, ardından bu toplam güç faktörüne bölünerek kVA bulunur. Bulunan değere doğrudan eşit bir cihaz almak yerine pay bırakmak gerekir; çünkü motorlar ilk kalkışta kısa süreliğine nominal akımlarının birkaç katını çeker ve jeneratörlerin sürekli tam yükte çalıştırılması önerilmez.',
      'Trafolarda da durum benzerdir: 400 kVA bir trafo, güç faktörü 0,95 olan iyi kompanze edilmiş bir tesiste 380 kW\'a kadar aktif güç taşıyabilirken, güç faktörü 0,7\'ye düşmüş bir tesiste yalnızca 280 kW taşır. Kompanzasyonun trafodan daha fazla yararlanmayı sağlaması bu yüzdendir.',
    ] },
    { h: 'Sık yapılan hatalar ve uyarı', p: [
      'En sık görülen hata kVA ile kW\'ı aynı şey saymaktır; 10 kVA\'lık bir kesintisiz güç kaynağına 10 kW yük bağlanamaz. İkinci hata güç faktörünü yüzde olarak girmektir: 0,8 yerine 80 yazıldığında araç hata verir, çünkü değer 0 ile 1 arasında olmalıdır. Üçüncüsü, farklı güç faktörlü yüklerin kVA değerlerini doğrudan toplamaktır; doğrusu aktif güçleri ve reaktif güçleri ayrı ayrı toplayıp görünür gücü bunlardan hesaplamaktır.',
      'Sonuçlar bilgilendirme amaçlıdır. Jeneratör, trafo ve kompanzasyon panosu boyutlandırması; kalkış akımları, eş zamanlılık, harmonikler ve yürürlükteki mevzuat dikkate alınarak elektrik mühendisi tarafından yapılmalıdır.',
    ] },
  ],
  faq: [
    ['1 kVA kaç kW eder?', 'Güç faktörüne bağlıdır. Güç faktörü 0,8 iken 1 kVA 0,8 kW, güç faktörü 1 iken tam 1 kW eder. Güç faktörü bilinmeden kesin bir karşılık söylenemez.'],
    ['100 kVA jeneratör kaç kW verir?', 'Güç faktörü 0,8 kabul edildiğinde 100 kVA jeneratör 80 kW aktif güç verir. Üreticiler çoğunlukla etikette hem kVA hem kW değerini birlikte belirtir.'],
    ['kW değeri kVA değerinden büyük olabilir mi?', 'Hayır. Güç faktörü en fazla 1 olabildiği için aktif güç, görünür güçten büyük olamaz; en iyi durumda ikisi eşittir.'],
    ['kVAR nedir, neden hesaplanıyor?', 'kVAR reaktif gücün birimidir. Motor ve trafoların manyetik alanı için gereken bu güç iş yapmaz ama hatlarda akım taşınmasına neden olur. Kompanzasyon panosundaki kondansatörlerin boyutu bu değere göre belirlenir.'],
    ['Güç faktörünü nereden öğrenebilirim?', 'Motor ve cihaz etiketlerinde cos φ olarak yazar. Tesisin tamamı için değer, enerji analizöründen ya da aktif ve reaktif tüketim değerlerinden hesaplanabilir.'],
    ['Evdeki cihazlar için kVA hesabı gerekir mi?', 'Günlük kullanımda gerekmez; konut sayaçları aktif enerjiyi ölçer. Ancak eve kesintisiz güç kaynağı ya da jeneratör alırken kapasite VA ya da kVA ile verildiğinden bu çeviri işe yarar.'],
    ['Faz açısı ne anlama gelir?', 'Gerilim ile akım dalgaları arasındaki zaman kaymasının açı olarak ifadesidir. Açı sıfırken güç faktörü 1\'dir ve tüm güç aktiftir; açı büyüdükçe reaktif gücün payı artar.'],
    ['Girdiğim değerler bir yere gönderiliyor mu?', 'Hayır. Çeviri tümüyle tarayıcınızda yapılır; değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['guc-faktoru-hesapla', 'kw-amper-cevir', 'amper-watt-cevir', 'jenerator-gucu-hesapla', 'uc-faz-guc-hesapla'],
};
