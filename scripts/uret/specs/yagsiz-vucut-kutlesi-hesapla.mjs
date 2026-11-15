export default {
  slug: 'yagsiz-vucut-kutlesi-hesapla',
  title: 'Yağsız Vücut Kütlesi Hesaplama',
  h1Tail: 'LBM',
  pageTitle: 'Yağsız Vücut Kütlesi Hesaplama – LBM (Boer, James, Hume)',
  description: 'Boy, kilo ve cinsiyetten yağsız vücut kütlenizi (LBM) hesaplayın. Yağ oranınızı biliyorsanız doğrudan hesap yapılır; Boer, James ve Hume sonuçları da gösterilir.',
  card: 'Yağsız vücut kütlenizi Boer, James ve Hume formülleriyle ya da bildiğiniz yağ oranından hesaplayın.',
  category: 'saglik',
  keywords: ['yağsız vücut kütlesi hesaplama', 'lbm hesaplama', 'yağsız kütle', 'boer formülü', 'kas kütlesi hesaplama', 'lean body mass', 'yağsız vücut ağırlığı'],
  lead: 'Kilonuzun yağ dışında kalan kısmını, yani <strong>yağsız vücut kütlenizi</strong> hesaplayın. Vücut yağ oranınızı biliyorsanız sonuç doğrudan ondan bulunur; bilmiyorsanız araç boy, kilo ve cinsiyete dayalı Boer formülünü kullanır ve James ile Hume formüllerini de karşılaştırma için verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'cinsiyet', label: 'Cinsiyet', type: 'select', options: [['erkek', 'Erkek'], ['kadin', 'Kadın']] },
    { id: 'kilo', label: 'Kilo (kg)', type: 'number', placeholder: 'Örn. 80' },
    { id: 'boy', label: 'Boy (cm)', type: 'number', placeholder: 'Örn. 180' },
    { id: 'yagOrani', label: 'Vücut yağ oranı (%) – isteğe bağlı', type: 'number', placeholder: 'Örn. 20', hint: 'Biliyorsanız yazın; boş bırakırsanız Boer formülü kullanılır.' },
  ],
  compute(v, h) {
    const kilo = h.pos(v.kilo, 'Kilo');
    const boy = h.pos(v.boy, 'Boy');
    if (kilo < 20 || kilo > 300) h.err('Kilo 20 ile 300 kg arasında olmalı; formüller yetişkinler içindir.');
    if (boy < 100 || boy > 250) h.err('Boy 100 ile 250 cm arasında olmalı; metre yerine santimetre yazın (1,80 değil 180).');
    const erkek = v.cinsiyet !== 'kadin';
    const boer = erkek ? 0.407 * kilo + 0.267 * boy - 19.2 : 0.252 * kilo + 0.473 * boy - 48.3;
    const k2 = (kilo / boy) * (kilo / boy);
    const james = erkek ? 1.1 * kilo - 128 * k2 : 1.07 * kilo - 148 * k2;
    const hume = erkek ? 0.3281 * kilo + 0.33929 * boy - 29.5336 : 0.29569 * kilo + 0.41813 * boy - 43.2933;
    const yaz = (x) => (x > 0 && x < kilo ? h.fix(x, 1) + ' kg' : '— (bu ölçülerde formül geçersiz)');
    const yagVar = String(v.yagOrani ?? '').trim() !== '';
    let lbm, yontem;
    if (yagVar) {
      const yag = h.num(v.yagOrani, 'Vücut yağ oranı');
      if (yag < 2 || yag > 70) h.err('Vücut yağ oranı %2 ile %70 arasında olmalı.');
      lbm = kilo * (1 - yag / 100);
      yontem = 'Girilen yağ oranından';
    } else {
      lbm = boer;
      yontem = 'Boer formülü (tahmin)';
      if (!(lbm > 0 && lbm < kilo)) h.err('Bu boy ve kilo birleşimi için formül anlamlı sonuç vermiyor; değerleri kontrol edin ya da yağ oranınızı girin.');
    }
    return {
      rows: [
        ['Yağsız vücut kütlesi', h.fix(lbm, 1) + ' kg'],
        ['Yöntem', yontem],
        ['Yağ kütlesi', h.fix(kilo - lbm, 1) + ' kg'],
        ['Yağsız kütle oranı', '%' + h.fix(lbm / kilo * 100, 1)],
        ['Boer formülü', yaz(boer)],
        ['James formülü', yaz(james)],
        ['Hume formülü', yaz(hume)],
      ],
      note: yagVar
        ? 'Sonuç, yazdığınız yağ oranının doğruluğu kadar doğrudur. Formül satırları karşılaştırma içindir.'
        : 'Formüller ortalama yapıdaki yetişkinler için tahmin verir; çok kaslı ya da çok kilolu kişilerde sapma büyür.',
    };
  },
  cases: [
    { in: { cinsiyet: 'erkek', kilo: '80', boy: '180' }, out: { 'Yağsız vücut kütlesi': '61,4 kg', 'Yöntem': 'Boer formülü (tahmin)', 'Yağ kütlesi': '18,6 kg', 'Boer formülü': '61,4 kg', 'James formülü': '62,7 kg', 'Hume formülü': '57,8 kg' } },
    { in: { cinsiyet: 'kadin', kilo: '60', boy: '165' }, out: { 'Yağsız vücut kütlesi': '44,9 kg', 'Boer formülü': '44,9 kg', 'James formülü': '44,6 kg', 'Hume formülü': '43,4 kg' } },
    { in: { cinsiyet: 'erkek', kilo: '80', boy: '180', yagOrani: '20' }, out: { 'Yağsız vücut kütlesi': '64,0 kg', 'Yöntem': 'Girilen yağ oranından', 'Yağ kütlesi': '16,0 kg', 'Yağsız kütle oranı': '%80,0', 'Boer formülü': '61,4 kg' } },
    { in: { cinsiyet: 'kadin', kilo: '55', boy: '160' }, out: { 'Yağsız vücut kütlesi': '41,2 kg', 'James formülü': '41,4 kg', 'Hume formülü': '39,9 kg' } },
    { in: { cinsiyet: 'erkek', kilo: '70', boy: '175' }, out: { 'Yağsız vücut kütlesi': '56,0 kg', 'James formülü': '56,5 kg', 'Hume formülü': '52,8 kg' } },
    { in: { cinsiyet: 'kadin', kilo: '60', boy: '165', yagOrani: '25' }, out: { 'Yağsız vücut kütlesi': '45,0 kg', 'Yağ kütlesi': '15,0 kg', 'Yağsız kütle oranı': '%75,0' } },
    { in: { cinsiyet: 'erkek', kilo: '80', boy: '1,80' }, error: true },
    { in: { cinsiyet: 'erkek', kilo: '80', boy: '180', yagOrani: '95' }, error: true },
    { in: { cinsiyet: 'kadin', kilo: '', boy: '165' }, error: true },
  ],
  howto: [
    'Cinsiyetinizi seçin; formüllerin katsayıları kadın ve erkek için farklıdır.',
    'Kilonuzu kilogram, boyunuzu santimetre olarak yazın.',
    'Vücut yağ oranınızı bir ölçümden biliyorsanız yüzde olarak girin; bilmiyorsanız alanı boş bırakın.',
    '"Hesapla" düğmesine basın. İlk satır yağsız vücut kütlenizi, ikinci satır hangi yöntemin kullanıldığını gösterir.',
    'Alttaki üç satırdan Boer, James ve Hume formüllerinin sonuçlarını karşılaştırın.',
  ],
  sections: [
    { h: 'Yağsız vücut kütlesi nedir?', p: [
      'Yağsız vücut kütlesi (İngilizce kısaltmasıyla LBM), toplam vücut ağırlığından yağ kütlesi çıkarıldığında geriye kalan her şeydir: kaslar, kemikler, iç organlar, kan, deri ve vücut suyu. Bu yüzden "kas kütlesi" ile aynı şey değildir; kas, yağsız kütlenin en büyük ama tek olmayan bileşenidir.',
      'Değer birçok yerde işe yarar. Dinlenme hâlinde harcanan enerjinin büyük kısmını yağsız doku belirlediği için bazı bazal metabolizma formülleri kilo yerine yağsız kütleyi kullanır. Sporcular protein hedeflerini çoğu zaman yağsız kütle üzerinden planlar. Kilo verme sürecinde ise tartıdaki düşüşün yağdan mı yoksa yağsız dokudan mı geldiğini izlemek için kullanılır.',
    ] },
    { h: 'İki hesaplama yolu', p: [
      '<strong>Yağ oranı biliniyorsa</strong> hesap tek satırdır: yağsız kütle = kilo × (1 − yağ oranı ÷ 100). 80 kg ağırlığında ve yağ oranı %20 olan biri için 80 × 0,80 = <strong>64,0 kg</strong> yağsız kütle, 16,0 kg yağ kütlesi bulunur. Yağ oranınız bir ölçüme dayanıyorsa bu yol formüllerden daha güvenilirdir.',
      '<strong>Yağ oranı bilinmiyorsa</strong> boy, kilo ve cinsiyetten tahmin yapan formüller devreye girer. Bu formüller, çok sayıda kişide yapılan vücut bileşimi ölçümlerinden türetilmiş doğrusal ya da ikinci dereceden denklemlerdir ve ortalama yapıdaki yetişkinler için makul bir tahmin verir.',
    ] },
    { h: 'Formüller', p: ['Aşağıda <em>K</em> kilogram cinsinden ağırlığı, <em>B</em> santimetre cinsinden boyu gösterir.'], ul: [
      '<strong>Boer (erkek):</strong> 0,407 × K + 0,267 × B − 19,2',
      '<strong>Boer (kadın):</strong> 0,252 × K + 0,473 × B − 48,3',
      '<strong>James (erkek):</strong> 1,1 × K − 128 × (K ÷ B)²',
      '<strong>James (kadın):</strong> 1,07 × K − 148 × (K ÷ B)²',
      '<strong>Hume (erkek):</strong> 0,32810 × K + 0,33929 × B − 29,5336',
      '<strong>Hume (kadın):</strong> 0,29569 × K + 0,41813 × B − 43,2933',
    ] },
    { h: 'Çözümlü örnek: 80 kg, 180 cm erkek', p: [
      'Boer formülüyle: 0,407 × 80 = 32,56; 0,267 × 180 = 48,06; toplam 80,62; bundan 19,2 çıkarılınca <strong>61,4 kg</strong> bulunur. Geriye kalan 18,6 kg tahmini yağ kütlesidir. James formülünde önce K ÷ B = 80 ÷ 180 = 0,4444, karesi 0,1975 bulunur; 1,1 × 80 − 128 × 0,1975 = 88 − 25,28 = 62,7 kg. Hume formülü ise 26,25 + 61,07 − 29,53 = 57,8 kg verir.',
      'Üç formül arasında bu örnekte yaklaşık 5 kg fark vardır. Bu durum formüllerin tahmin niteliğini açıkça gösterir: sonucu tek bir kesin sayı olarak değil, bir aralık olarak okumak gerekir.',
    ] },
    { h: 'Formüllerin zayıf kaldığı durumlar', p: [
      'Boy ve kilo, iki kişinin vücut bileşimi hakkında sınırlı bilgi taşır. Aynı boy ve kiloda bir vücut geliştirmeci ile hareketsiz yaşayan biri için formüller aynı sonucu verir, oysa gerçek yağsız kütleleri çok farklıdır. Kaslı kişilerde formüller yağsız kütleyi olduğundan düşük, yağ oranı yüksek kişilerde olduğundan yüksek gösterme eğilimindedir.',
      'James formülünün bilinen bir kusuru vardır: kilo boya göre çok arttığında formüldeki kare terimi baskın hâle gelir ve sonuç önce azalmaya başlar, uç değerlerde anlamsızlaşır. Araç, bir formül sıfırın altında ya da toplam kilonun üzerinde bir değer ürettiğinde o satırı geçersiz olarak işaretler. Çok kilolu kişilerde Boer formülü daha tutarlı kabul edilir; ana sonuç olarak onun seçilmesinin nedeni budur.',
    ] },
    { h: 'Sonucu nasıl kullanabilirsiniz?', p: [
      'Tek bir ölçümden çok zaman içindeki eğilim anlamlıdır. Kilo verirken yağsız kütlenin büyük ölçüde korunması, kaybın ağırlıklı olarak yağdan geldiğini düşündürür. Bunu izleyebilmek için formüle değil, aynı yöntemle yinelenen yağ oranı ölçümlerine dayanmak gerekir; çünkü formül yalnızca boy ve kiloya baktığından kilo düştüğünde yağsız kütleyi de otomatik olarak düşük gösterir.',
      'Bu araç bilgilendirme amaçlıdır. İlaç dozu, beslenme tedavisi ya da antrenman planı gibi kararlar için hekim, diyetisyen ya da ilgili uzmana danışın.',
    ] },
  ],
  faq: [
    ['Yağsız vücut kütlesi ile kas kütlesi aynı şey mi?', 'Hayır. Yağsız vücut kütlesi kasların yanında kemikleri, organları, kanı ve vücut suyunu da içerir. İskelet kası bu kütlenin yalnızca bir bölümüdür.'],
    ['Yağsız vücut kütlesi nasıl hesaplanır?', 'Yağ oranı biliniyorsa kilo, (1 − yağ oranı ÷ 100) ile çarpılır. Bilinmiyorsa Boer, James ya da Hume gibi boy, kilo ve cinsiyete dayalı formüllerle tahmin edilir.'],
    ['Hangi formül daha güvenilir?', 'Ortalama yapıdaki yetişkinlerde üçü de birbirine yakın sonuç verir. Kilo arttıkça James formülü bozulur; bu yüzden geniş bir aralıkta Boer formülü daha tutarlı kabul edilir.'],
    ['Yağsız kütle oranı kaç olmalı?', 'Bu oran, 100\'den yağ oranının çıkarılmasıyla bulunur; dolayısıyla "ideal" değer sağlıklı yağ oranı aralığına bağlıdır ve yaş ile cinsiyete göre değişir. Kadınlarda fizyolojik olarak yağ oranı daha yüksek, yağsız kütle oranı daha düşüktür.'],
    ['Formül sonucu ile cihaz ölçümüm farklı çıktı, hangisi doğru?', 'Formüller yalnızca boy ve kiloya bakar; vücut bileşimi ölçen yöntemler ise kişiye özgü veri kullanır. Doğru uygulanmış bir ölçüm genellikle formülden daha bilgilendiricidir, ancak cihazların da su durumu gibi etkenlerden etkilendiğini unutmayın.'],
    ['Su içmek ya da tuzlu yemek sonucu etkiler mi?', 'Vücut suyu yağsız kütlenin parçasıdır. Tartıdaki günlük su kaynaklı oynamalar formül sonucunu da oynatır; bu, gerçek bir kas artışı ya da kaybı anlamına gelmez.'],
    ['Çocuklar için kullanılabilir mi?', 'Buradaki formüller yetişkin verilerinden türetilmiştir. Çocuklar ve ergenler için ayrı denklemler vardır; onlar için bu sonuçlar kullanılmamalıdır.'],
    ['Yazdığım bilgiler bir sunucuya gidiyor mu?', 'Hayır. Tüm hesap tarayıcınızda yapılır; kilo, boy ve yağ oranı bilgileriniz cihazınızdan çıkmaz.'],
  ],
  related: ['vucut-yag-orani-hesapla', 'bazal-metabolizma-hesapla', 'vki-hesapla', 'protein-ihtiyaci-hesapla', 'ideal-kilo-hesapla'],
};
