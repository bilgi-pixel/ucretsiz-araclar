export default {
  slug: 'beygir-kw-cevir',
  title: 'Beygir Gücü Kilovat Çevirici',
  h1Tail: 'HP/PS ↔ kW',
  pageTitle: 'Beygir Gücü Kilovat Çevirici – HP\'den kW\'ye, kW\'den Beygire',
  description: 'Motor gücünü beygirden kilovata, kilovattan beygire çevirin. Metrik beygir (PS, 735,5 W) ve mekanik beygir (hp, 745,7 W) ayrımını yaparak doğru sonucu verir.',
  card: 'Araç ve motor gücünü beygirden kW\'ye, kW\'den beygire çevirin; metrik (PS) ve mekanik (hp) beygir ayrımıyla.',
  category: 'birim',
  keywords: ['beygir kw çevirme', 'kw beygir hesaplama', '1 beygir kaç kw', 'hp kw dönüştürme', '1 kw kaç beygir', 'ps kw çevirme', 'ruhsat kw beygir', 'motor gücü kw hp'],
  lead: 'Motor gücünü beygir gücü ile kilovat (kW) arasında çevirin. Araç, Avrupa\'da ve Türkiye\'de kullanılan <strong>metrik beygiri (1 PS = 0,7355 kW)</strong> ve ABD kaynaklarındaki <strong>mekanik beygiri (1 hp = 0,7457 kW)</strong> ayrı ayrı hesaplar.',
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Güç', type: 'number', placeholder: 'Örn. 110' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['hp', 'Beygir gücü → Kilovat'], ['kw', 'Kilovat → Beygir gücü']] },
    { id: 'tur', label: 'Beygir türü', type: 'select', options: [['ps', 'Metrik beygir (PS / BG) – 735,5 W'], ['hp', 'Mekanik beygir (hp) – 745,7 W']], hint: 'Türkiye ve Avrupa\'daki araç kataloglarında metrik beygir kullanılır.' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Güç');
    const PS = 735.49875;
    const HP = 745.69987158227022;
    const mekanik = v.tur === 'hp';
    const w = v.yon === 'kw' ? x * 1000 : x * (mekanik ? HP : PS);
    const kwRow = ['Kilovat', h.fmt(w / 1000, 4) + ' kW'];
    const wRow = ['Watt', h.fmt(w, 1) + ' W'];
    const psRow = ['Metrik beygir (PS)', h.fmt(w / PS, 2) + ' PS'];
    const hpRow = ['Mekanik beygir (hp)', h.fmt(w / HP, 2) + ' hp'];
    const rows = v.yon === 'kw'
      ? (mekanik ? [hpRow, psRow, kwRow, wRow] : [psRow, hpRow, kwRow, wRow])
      : [kwRow, wRow, psRow, hpRow];
    return {
      rows,
      note: '1 PS = 735,49875 W; 1 hp = 745,69987 W. Araç kataloglarındaki "HP" ya da "BG" çoğunlukla metrik beygirdir.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'hp', tur: 'ps' }, out: { 'Kilovat': '73,5499 kW', 'Mekanik beygir (hp)': '98,63 hp', 'Metrik beygir (PS)': '100 PS' } },
    { in: { deger: '110', yon: 'kw', tur: 'ps' }, out: { 'Metrik beygir (PS)': '149,56 PS', 'Mekanik beygir (hp)': '147,51 hp', 'Kilovat': '110 kW' } },
    { in: { deger: '1', yon: 'hp', tur: 'hp' }, out: { 'Kilovat': '0,7457 kW', 'Watt': '745,7 W', 'Metrik beygir (PS)': '1,01 PS' } },
    { in: { deger: '1', yon: 'hp', tur: 'ps' }, out: { 'Kilovat': '0,7355 kW', 'Watt': '735,5 W' } },
    { in: { deger: '150', yon: 'hp', tur: 'ps' }, out: { 'Kilovat': '110,3248 kW' } },
    { in: { deger: '100', yon: 'kw', tur: 'hp' }, out: { 'Mekanik beygir (hp)': '134,1 hp', 'Metrik beygir (PS)': '135,96 PS' } },
    { in: { deger: '0', yon: 'kw', tur: 'ps' }, out: { 'Metrik beygir (PS)': '0 PS' } },
    { in: { deger: '110 kw', yon: 'kw', tur: 'ps' }, error: true },
    { in: { deger: '-50', yon: 'hp', tur: 'ps' }, error: true },
  ],
  howto: [
    'Ruhsatta, katalogda ya da motor etiketinde yazan güç değerini "Güç" alanına girin.',
    'Değer beygir cinsindense "Beygir gücü → Kilovat", kilovat cinsindense "Kilovat → Beygir gücü" yönünü seçin.',
    '"Beygir türü" listesinden metrik (PS) ya da mekanik (hp) beygiri işaretleyin; Türkiye ve Avrupa kaynakları için metrik beygir doğru seçimdir.',
    '"Çevir" düğmesine basın. Sonuçta kilovat, watt ve her iki beygir türünün karşılığı birlikte listelenir.',
  ],
  sections: [
    { h: 'Beygir gücü nedir?', p: [
      'Beygir gücü, buhar makinelerinin yaygınlaştığı dönemde bir makinenin yaptığı işi atların iş kapasitesiyle karşılaştırmak için ortaya atılmış bir güç birimidir. SI\'da gücün birimi watttır ve teknik belgelerde kilovat kullanılır; ancak otomotivde ve motor satışında beygir alışkanlığı sürmektedir. Sorun şu ki "beygir" tek bir birim değildir: tanımı ülkeye ve geleneğe göre değişen birkaç farklı beygir vardır.',
      '<strong>Metrik beygir</strong>, 75 kilogramlık bir kütleyi saniyede bir metre yukarı kaldıran güçtür ve 735,49875 watta eşittir. Almancada PS, Fransızcada CV, Türkçede BG ya da yaygın ama gevşek bir kullanımla HP olarak yazılır. <strong>Mekanik (imperial) beygir</strong> ise saniyede 550 foot-pound iş olarak tanımlanır ve yaklaşık 745,7 watttır; ABD ve İngiltere kaynaklarında "hp" denildiğinde bu kastedilir. İkisi arasındaki fark yaklaşık yüzde 1,4\'tür.',
    ] },
    { h: 'Çeviri formülleri', p: [
      'Metrik beygir için: <strong>kW = PS × 0,7355</strong> ve <strong>PS = kW × 1,3596</strong>. Mekanik beygir için: <strong>kW = hp × 0,7457</strong> ve <strong>hp = kW × 1,3410</strong>.',
      'Kafadan yaklaşık hesap için kW değerine üçte birini eklemek yeterlidir: 90 kW + 30 = yaklaşık 120 beygir (kesin değer 122,37 PS). Tersine, beygir değerinin dörtte üçünü almak kW için iyi bir tahmindir.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Ruhsattan beygire:</strong> Ruhsatta motor gücü 110 kW yazan bir otomobil 110 × 1000 ÷ 735,49875 = 149,56 PS eder; kataloglarda bu araç "150 beygir" olarak anılır. Aynı güç mekanik beygirle 147,51 hp\'dir.',
      '<strong>Katalogdan kilovata:</strong> 100 PS\'lik bir motor 73,5499 kW gücündedir. Bu değer mekanik beygir cinsinden 98,63 hp eder; yani bir ABD kaynağı aynı motoru 99 hp olarak yazabilir.',
      '<strong>ABD kaynağı:</strong> 1 hp (mekanik) 0,7457 kW, yani 745,7 W\'tır ve 1,01 PS\'ye denk gelir.',
    ] },
    { h: 'Sık rastlanan motor güçleri (metrik beygir)', ul: [
      '<strong>75 PS</strong> ≈ 55,16 kW',
      '<strong>90 PS</strong> ≈ 66,19 kW',
      '<strong>110 PS</strong> ≈ 80,90 kW',
      '<strong>130 PS</strong> ≈ 95,61 kW',
      '<strong>150 PS</strong> ≈ 110,32 kW',
      '<strong>200 PS</strong> ≈ 147,10 kW',
      '<strong>300 PS</strong> ≈ 220,65 kW',
    ] },
    { h: 'Türkiye\'de nerede karşınıza çıkar?', p: [
      'Araç tescil belgesinde (ruhsat) motor gücü kilovat olarak yazılır; ilanlarda ve kataloglarda ise aynı araç beygir ile tanıtılır. İkinci el araç bakarken ruhsattaki kW değerini beygire çevirerek ilandaki bilginin tutarlı olup olmadığını kontrol edebilirsiniz. Elektrikli araçlarda motor gücü doğrudan kW ile verilir; içten yanmalı araçlarla karşılaştırmak için beygire çevirmek gerekir.',
      'Otomobil dışında tarım traktörleri, jeneratörler, dıştan takma tekne motorları, kompresörler ve sanayi tipi elektrik motorları da beygirle anılır. Elektrik motorlarının etiketinde hem kW hem HP değeri bulunur; 0,75 kW\'lik motor "1 beygir", 1,5 kW\'lik motor "2 beygir", 2,2 kW\'lik motor "3 beygir" olarak bilinir. Bu adlar yuvarlak anma değerleridir.',
      'Vergi, sigorta ya da teşvik gibi konularda motor gücüne bağlı sınırlar olabilir. Bu sınırlar ve hangi birimin esas alındığı zaman içinde değişebildiği için karar vermeden önce güncel mevzuatı ve resmî kaynakları kontrol edin.',
    ] },
    { h: 'Hangi beygir türünü seçmeliyim?', p: [
      'Kaynağınız Türkiye, Almanya, Fransa, İtalya gibi metrik sistem kullanan bir ülkedense ve güç "PS", "CV", "BG" ya da Türkçe bir katalogda "HP" olarak yazıyorsa metrik beygiri seçin. Kaynak ABD ya da İngiltere menşeliyse ve "hp" ya da "bhp" yazıyorsa mekanik beygir uygundur. Emin olamadığınızda sonuç kutusundaki iki satıra da bakın; fark yüzde 1,4 düzeyinde olduğundan gündelik karşılaştırmalarda belirleyici değildir, ancak resmî belge doldururken doğru birimi kullanmak gerekir.',
      'Bir not daha: "bhp" (fren beygiri) ayrı bir birim değil, gücün motor çıkışında ölçüldüğünü anlatan bir ölçüm biçimidir. Tekerlekte ölçülen güç, aktarma kayıpları nedeniyle motor gücünden düşüktür; dinamometre sonuçlarını katalog değeriyle karşılaştırırken bunu hesaba katın.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç negatif değer kabul etmez ve yalnızca birim dönüştürür; tork, devir ya da aktarma kaybı hesabı yapmaz. Sonuçlar bilgilendirme amaçlıdır; resmî işlemlerde aracın tescil belgesindeki değer esas alınır.',
    ] },
  ],
  faq: [
    ['1 beygir kaç kW eder?', 'Metrik beygir (PS) 0,7355 kW, mekanik beygir (hp) 0,7457 kW eder. Türkiye\'deki araç kataloglarında metrik beygir kullanıldığı için pratikte 1 beygir yaklaşık 0,735 kW\'dir.'],
    ['1 kW kaç beygirdir?', '1 kW yaklaşık 1,36 metrik beygir (PS) ya da 1,341 mekanik beygirdir (hp).'],
    ['Ruhsatta 81 kW yazıyor, aracım kaç beygir?', '81 kW yaklaşık 110,13 PS eder; kataloglarda bu güç 110 beygir olarak geçer.'],
    ['HP ile PS aynı şey mi?', 'Tam olarak değil. PS metrik beygirdir (735,5 W), hp ise mekanik beygirdir (745,7 W). Ancak Türkiye\'de "HP" yazımı çoğunlukla metrik beygir anlamında kullanılır. Aradaki fark yaklaşık yüzde 1,4\'tür.'],
    ['BG ne demek?', 'BG, "beygir gücü" ifadesinin Türkçe kısaltmasıdır ve metrik beygiri gösterir. PS ve CV ile aynı büyüklüktedir.'],
    ['Elektrikli araçların gücü neden kW ile veriliyor?', 'Kilovat SI birimidir ve elektrik motorlarının gücü doğrudan elektriksel büyüklüklerle ifade edildiği için kW kullanılır. Karşılaştırma için kW değerini 1,36 ile çarparak metrik beygire çevirebilirsiniz.'],
    ['Beygir gücü ile tork aynı şey mi?', 'Hayır. Tork motorun döndürme kuvvetidir (Nm), güç ise bu kuvvetin ne kadar hızlı iş yaptığını gösterir. Güç, tork ile devir sayısının çarpımıyla orantılıdır.'],
    ['Yazdığım değerler kaydediliyor mu?', 'Hayır. Çeviri tarayıcınızda yapılır; girdiğiniz sayılar sunucuya gönderilmez ve saklanmaz.'],
  ],
  related: ['watt-beygir-cevir', 'kw-watt-cevir', 'motor-guc-tork-hesapla', 'nm-lbft-cevir', 'btu-kw-cevir'],
};
