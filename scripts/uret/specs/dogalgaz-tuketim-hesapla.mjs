export default {
  slug: 'dogalgaz-tuketim-hesapla',
  title: 'Doğal Gaz Tüketimi (m³ – kWh) Hesaplama',
  h1Tail: 'm³ ↔ kWh',
  pageTitle: 'Doğal Gaz m³ kWh Hesaplama – Tüketim ve Tutar Çevirici',
  description: 'Doğal gaz tüketimini metreküpten kWh\'ye ya da kWh\'den metreküpe çevirin. 10,64 kWh/m³ katsayısı değiştirilebilir; MJ, kcal karşılığı ve tutar da hesaplanır.',
  card: 'Doğal gaz tüketimini m³ ile kWh arasında çevirin; enerji karşılığını ve birim fiyata göre tutarı görün.',
  category: 'gunluk',
  keywords: ['doğal gaz m3 kwh hesaplama', '1 m3 doğalgaz kaç kwh', 'doğalgaz tüketim hesaplama', 'doğalgaz faturası kwh', 'kwh m3 çevirme', 'doğalgaz fatura hesaplama', 'sm3 kwh'],
  lead: 'Doğal gaz sayacı metreküp ölçer, fatura ise enerji birimi olan kWh üzerinden düzenlenir. Tüketiminizi <strong>m³\'ten kWh\'ye</strong> ya da tersine çevirin; isterseniz metreküp fiyatını girerek tutarı ve kWh başına maliyeti de görün.',
  button: 'Hesapla',
  inputs: [
    { id: 'deger', label: 'Tüketim', type: 'number', placeholder: 'Örn. 100' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['m3', 'm³ → kWh'], ['kwh', 'kWh → m³']] },
    { id: 'isilDeger', label: 'Çevrim katsayısı (kWh/m³)', type: 'number', value: '10,64', hint: 'Faturalarda kullanılan yaygın değer 10,64\'tür; faturanızda farklı bir katsayı varsa onu yazın.' },
    { id: 'fiyat', label: 'Birim fiyat (TL/m³, isteğe bağlı)', type: 'number', placeholder: 'Faturanızdaki m³ fiyatı' },
  ],
  compute(v, h) {
    const x = h.nonneg(v.deger, 'Tüketim');
    const k = h.pos(v.isilDeger, 'Çevrim katsayısı');
    if (k < 5 || k > 15) h.err('Çevrim katsayısı 5 ile 15 kWh/m³ arasında olmalı. Doğal gaz için yaygın değer 10,64\'tür.');
    const fiyat = h.opt(v.fiyat, null, 'Birim fiyat');
    if (fiyat !== null && fiyat < 0) h.err('"Birim fiyat" negatif olamaz.');
    const m3 = v.yon === 'kwh' ? x / k : x;
    const kwh = m3 * k;
    const rows = [
      v.yon === 'kwh' ? ['Hacim', h.fmt(m3, 3) + ' m³'] : ['Enerji', h.fmt(kwh, 2) + ' kWh'],
      v.yon === 'kwh' ? ['Enerji', h.fmt(kwh, 2) + ' kWh'] : ['Hacim', h.fmt(m3, 3) + ' m³'],
      ['Megajul karşılığı', h.fmt(kwh * 3.6, 1) + ' MJ'],
      ['Kilokalori karşılığı', h.fmt(kwh * 859.845, 0) + ' kcal'],
    ];
    if (fiyat !== null) {
      rows.push(['Tutar', h.para(m3 * fiyat)]);
      rows.push(['kWh başına maliyet', h.fmt(fiyat / k, 4) + ' TL/kWh']);
    }
    return {
      rows,
      note: 'kWh = m³ × çevrim katsayısı. 1 kWh = 3,6 MJ = 859,845 kcal. Tutar tek bir birim fiyatla hesaplanır; sabit bedeller ve yuvarlamalar dahil değildir.',
    };
  },
  cases: [
    { in: { deger: '100', yon: 'm3' }, out: { 'Enerji': '1.064 kWh', 'Hacim': '100 m³', 'Megajul karşılığı': '3.830,4 MJ', 'Kilokalori karşılığı': '914.875 kcal' } },
    { in: { deger: '1064', yon: 'kwh' }, out: { 'Hacim': '100 m³', 'Enerji': '1.064 kWh' } },
    { in: { deger: '1', yon: 'm3' }, out: { 'Enerji': '10,64 kWh', 'Megajul karşılığı': '38,3 MJ', 'Kilokalori karşılığı': '9.149 kcal' } },
    { in: { deger: '250', yon: 'm3', fiyat: '8' }, out: { 'Enerji': '2.660 kWh', 'Tutar': '2.000,00 TL', 'kWh başına maliyet': '0,7519 TL/kWh' } },
    { in: { deger: '50', yon: 'm3', isilDeger: '10' }, out: { 'Enerji': '500 kWh', 'Megajul karşılığı': '1.800 MJ' } },
    { in: { deger: '500', yon: 'kwh' }, out: { 'Hacim': '46,992 m³', 'Megajul karşılığı': '1.800 MJ' } },
    { in: { deger: '-10', yon: 'm3' }, error: true },
    { in: { deger: '100', yon: 'm3', isilDeger: '0' }, error: true },
    { in: { deger: 'yüz', yon: 'm3' }, error: true },
  ],
  howto: [
    'Sayaçtan okuduğunuz ya da faturada gördüğünüz tüketim değerini "Tüketim" alanına yazın.',
    'Değer metreküp ise "m³ → kWh", kilovatsaat ise "kWh → m³" yönünü seçin.',
    'Çevrim katsayısını kontrol edin. Varsayılan 10,64 kWh/m³ değeridir; faturanızda başka bir katsayı yazıyorsa onu girin.',
    'Tutarı görmek istiyorsanız metreküp birim fiyatını ekleyin, ardından "Hesapla" düğmesine basın.',
  ],
  sections: [
    { h: 'Doğal gaz neden kWh ile faturalanır?', p: [
      'Sayaç, içinden geçen gazın hacmini ölçer; ancak gazın işe yarayan yanı hacmi değil, yandığında verdiği ısıdır. Aynı bir metreküp gaz, bileşimine göre biraz daha fazla ya da biraz daha az enerji verebilir. Bu yüzden faturalama hacim yerine enerji birimi üzerinden yapılır ve tüketilen metreküp, bir çevrim katsayısıyla kilovatsaate dönüştürülür.',
      'Türkiye\'de konut faturalarında bu dönüşüm için yaygın olarak <strong>1 m³ = 10,64 kWh</strong> katsayısı kullanılır. Bu değer, metreküp başına 9.155 kcal üst ısıl değer kabulüne dayanır. Faturanızda tüketim satırının yanında yazan katsayı farklıysa hesabı o değerle yapmak gerekir; araçta katsayı alanı bu nedenle değiştirilebilir bırakılmıştır.',
    ] },
    { h: 'Formül ve çözümlü örnekler', p: [
      'Hesap tek bir çarpmadır: <strong>kWh = m³ × çevrim katsayısı</strong>. Tersine, <strong>m³ = kWh ÷ çevrim katsayısı</strong>. Örneğin bir ayda 100 m³ gaz kullandıysanız enerji karşılığı 100 × 10,64 = <strong>1.064 kWh</strong> olur. Bu enerji 1.064 × 3,6 = 3.830,4 megajule ve yaklaşık 914.875 kilokaloriye eşittir.',
      'Tersine örnek: faturada 500 kWh yazıyorsa hacim 500 ÷ 10,64 = <strong>46,992 m³</strong> eder. Metreküp fiyatı da girilirse tutar hesaplanır: 250 m³ tüketim ve 8 TL/m³ fiyat için tutar 250 × 8 = 2.000,00 TL, kWh başına maliyet ise 8 ÷ 10,64 = 0,7519 TL olur. Buradaki fiyat yalnızca hesabı göstermek için seçilmiş bir sayıdır; güncel tarife için faturanıza ya da dağıtım şirketinizin duyurularına bakın.',
    ] },
    { h: 'Sayaç okuması ile fatura arasındaki fark', p: [
      'Mekanik sayaç, gazı o anki basınç ve sıcaklıkta ölçer. Gaz sıkıştırılabilir bir akışkan olduğundan, aynı miktar gaz daha yüksek basınçta daha az hacim kaplar. Faturalarda bu nedenle ölçülen hacim, belirli bir sıcaklık ve basınca indirgenmiş <strong>standart metreküp</strong> (Sm³) değerine çevrilir; bunun için basınç ve sıcaklığa bağlı bir düzeltme katsayısı uygulanabilir. Konut tipi düşük basınçlı aboneliklerde bu katsayı çoğunlukla bire çok yakındır, ancak faturanızda ayrıca gösteriliyorsa sayaç farkını önce bu katsayıyla çarpıp sonra kWh\'ye çevirmelisiniz.',
      'Tüketimi kendiniz izlemek için sayacın siyah hanelerindeki değeri dönem başında ve sonunda not edin; farkı bu araca metreküp olarak yazın. Kırmızı haneler metreküpün ondalık kısmıdır.',
    ] },
    { h: 'kWh başına maliyet ne işe yarar?', p: [
      'Isınma seçeneklerini karşılaştırırken yakıtların birim fiyatları doğrudan kıyaslanamaz; çünkü biri metreküp, biri kilogram, biri kilovatsaat ile satılır. Hepsini kWh başına maliyete çevirmek ortak bir ölçü sağlar. Araç, girdiğiniz metreküp fiyatını çevrim katsayısına bölerek gazın kWh başına maliyetini verir.',
      'Bu değer yakıtın içindeki enerjinin fiyatıdır; odaya ulaşan ısının değil. Kombi ya da kazan, yakıttaki enerjinin tamamını ısıya dönüştüremez. Faydalı ısının maliyetini bulmak için kWh başına maliyeti cihazınızın verimine bölmeniz gerekir. Elektrikli ısıtıcı ya da ısı pompasıyla karşılaştırma yaparken de her cihazın kendi verimini ya da performans katsayısını hesaba katın.',
    ] },
    { h: 'Hızlı başvuru değerleri (10,64 kWh/m³ ile)', ul: [
      '<strong>1 m³</strong> = 10,64 kWh = 38,3 MJ',
      '<strong>10 m³</strong> = 106,4 kWh',
      '<strong>50 m³</strong> = 532 kWh',
      '<strong>100 m³</strong> = 1.064 kWh',
      '<strong>250 m³</strong> = 2.660 kWh',
      '<strong>100 kWh</strong> = 9,398 m³',
      '<strong>1.000 kWh</strong> = 93,985 m³',
    ] },
    { h: 'Sık yapılan hatalar ve sınırlar', ul: [
      'Fatura tutarını yalnızca tüketim × fiyat sanmak: faturada vergi ve bazı sabit kalemler de bulunabilir; araç bunları eklemez.',
      'kWh fiyatını m³ fiyatı alanına yazmak: faturanızdaki fiyat kWh başınaysa önce 10,64 ile çarparak metreküp fiyatına çevirin ya da tutarı kWh × fiyat olarak elle hesaplayın.',
      'Elektrik kWh\'si ile gaz kWh\'sini aynı maliyette düşünmek: birim aynı olsa da iki enerjinin fiyatı ve cihaz verimleri farklıdır.',
      'Tüplü gaz ya da LPG için aynı katsayıyı kullanmak: 10,64 değeri şebeke doğal gazı içindir; başka yakıtların ısıl değeri farklıdır.',
    ], p: [
      'Sonuçlar bilgilendirme amaçlıdır ve resmi fatura hesabının yerini tutmaz. Kesin tutar ve geçerli katsayılar için dağıtım şirketinizin faturasını esas alın.',
    ] },
  ],
  faq: [
    ['1 m³ doğal gaz kaç kWh eder?', 'Faturalarda yaygın olarak kullanılan katsayıyla 1 m³ doğal gaz 10,64 kWh enerjiye karşılık gelir. Faturanızda farklı bir çevrim katsayısı yazıyorsa hesabı o değerle yapın.'],
    ['kWh değerini metreküpe nasıl çeviririm?', 'kWh değerini çevrim katsayısına bölersiniz. 1.064 kWh ÷ 10,64 = 100 m³ eder. Araçta "kWh → m³" yönünü seçmeniz yeterlidir.'],
    ['10,64 katsayısı nereden geliyor?', 'Metreküp başına 9.155 kcal üst ısıl değer kabulünden gelir. Bu ısı miktarının kilovatsaat karşılığı yaklaşık 10,64 kWh\'dir. Gazın gerçek ısıl değeri kaynağa göre küçük oynamalar gösterebilir.'],
    ['Sayaçtaki metreküp ile faturadaki metreküp neden farklı olabilir?', 'Sayaç gazı bulunduğu basınç ve sıcaklıkta ölçer; fatura ise standart koşullara indirgenmiş hacmi kullanır. Aradaki fark düzeltme katsayısından kaynaklanır ve konutlarda genellikle çok küçüktür.'],
    ['Araç fatura tutarımı tam olarak verir mi?', 'Hayır, yaklaşık bir değer verir. Tutar, tüketimin girdiğiniz birim fiyatla çarpımıdır. Vergi dahil ortalama fiyatı girerseniz sonuç faturaya yaklaşır; sabit bedeller ve yuvarlamalar yine de fark yaratabilir.'],
    ['Kombi verimini hesaba katıyor mu?', 'Hayır. Araç yakıtın içerdiği enerjiyi hesaplar. Eve ulaşan faydalı ısıyı bulmak için kWh sonucunu cihazınızın verim oranıyla çarpmanız gerekir.'],
    ['Megajul ve kilokalori satırları ne işe yarar?', 'Bazı teknik belgelerde ve cihaz etiketlerinde enerji MJ ya da kcal olarak verilir. Bu satırlar aynı tüketimin diğer birimlerdeki karşılığını gösterir: 1 kWh, 3,6 MJ ve yaklaşık 860 kcal eder.'],
    ['Yazdığım tüketim bilgileri saklanıyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; girdiğiniz değerler sunucuya gönderilmez ve kaydedilmez.'],
  ],
  related: ['elektrik-tuketim-hesapla', 'kombi-kapasite-hesapla', 'kwh-kcal-cevir', 'kwh-joule-cevir', 'su-tuketimi-hesapla', 'isi-kaybi-hesapla'],
};
