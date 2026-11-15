export default {
  slug: 'derece-grad-cevir',
  title: 'Derece Grad Çevirici',
  h1Tail: '° ↔ grad (gon)',
  pageTitle: "Derece Grad Çevirici – Dereceyi Grada, Gradı Dereceye Çevirme",
  description: "Dereceyi grada (gon), gradı dereceye çevirin. 90° = 100 grad eşitliğiyle çalışır; derece-dakika-saniye, radyan ve devir karşılığını da birlikte gösterir.",
  card: "Dereceyi grada, gradı dereceye çevirin; haritacılık ve ölçme işleri için DMS, radyan ve devir karşılığıyla.",
  category: 'birim',
  keywords: ['derece grad çevirme', 'grad derece çevirme', '1 grad kaç derece', '100 grad kaç derece', 'gon derece çevirme', 'grad hesaplama', 'açı birimleri grad'],
  lead: "Bir açıyı dereceden grada ya da graddan dereceye çevirin. Grad (gon), tam turu 400 eşit parçaya bölen açı birimidir; dik açı <strong>100 grad = 90°</strong> eder. Araç sonucu derece-dakika-saniye, radyan ve devir olarak da verir.",
  button: 'Çevir',
  inputs: [
    { id: 'deger', label: 'Açı değeri', type: 'number', placeholder: 'Örn. 100', hint: 'Negatif açı girebilirsiniz; ondalık için virgül ya da nokta kullanın.' },
    { id: 'yon', label: 'Çeviri yönü', type: 'select', options: [['derece', 'Derece → Grad'], ['grad', 'Grad → Derece']] },
  ],
  compute(v, h) {
    const x = h.num(v.deger, 'Açı değeri');
    const derece = v.yon === 'grad' ? x * 0.9 : x;
    const grad = v.yon === 'grad' ? x : x / 0.9;
    const ss = Math.round(Math.abs(derece) * 360000);
    const d = Math.floor(ss / 360000);
    const m = Math.floor((ss % 360000) / 6000);
    const s = (ss % 6000) / 100;
    const isaret = derece < 0 && ss > 0 ? '-' : '';
    const dereceSatir = ['Derece', h.fmt(derece, 6) + '°'];
    const gradSatir = ['Grad', h.fmt(grad, 6) + ' grad'];
    const rows = v.yon === 'grad' ? [dereceSatir, gradSatir] : [gradSatir, dereceSatir];
    rows.push(['Derece dakika saniye', `${isaret}${d}° ${m}′ ${h.fmt(s, 2)}″`]);
    rows.push(['Radyan', h.fmt(derece * Math.PI / 180, 6) + ' rad']);
    rows.push(['Devir', h.fmt(derece / 360, 6) + ' devir']);
    return { rows, note: '1 grad = 0,9° ve 1° = 10/9 grad (tam oran). Tam tur 360° = 400 grad = 2π radyandır.' };
  },
  cases: [
    { in: { deger: '90', yon: 'derece' }, out: { 'Grad': '100 grad', 'Derece dakika saniye': '90° 0′ 0″', 'Devir': '0,25 devir' } },
    { in: { deger: '100', yon: 'grad' }, out: { 'Derece': '90°', 'Radyan': '1,570796 rad' } },
    { in: { deger: '1', yon: 'grad' }, out: { 'Derece': '0,9°', 'Derece dakika saniye': '0° 54′ 0″' } },
    { in: { deger: '1', yon: 'derece' }, out: { 'Grad': '1,111111 grad' } },
    { in: { deger: '45', yon: 'derece' }, out: { 'Grad': '50 grad' } },
    { in: { deger: '400', yon: 'grad' }, out: { 'Derece': '360°', 'Devir': '1 devir', 'Radyan': '6,283185 rad' } },
    { in: { deger: '57,25', yon: 'grad' }, out: { 'Derece': '51,525°', 'Derece dakika saniye': '51° 31′ 30″' } },
    { in: { deger: '-200', yon: 'grad' }, out: { 'Derece': '-180°', 'Derece dakika saniye': '-180° 0′ 0″' } },
    { in: { deger: 'yüz', yon: 'grad' }, error: true },
    { in: { deger: '', yon: 'derece' }, error: true },
  ],
  howto: [
    "'Açı değeri' alanına çevirmek istediğiniz açıyı yazın. Ölçü aletinden okuduğunuz ondalıklı grad değerini doğrudan girebilirsiniz.",
    "'Çeviri yönü' listesinden dereceden grada ya da graddan dereceye çevirmeyi seçin.",
    "'Çevir' düğmesine basın. İlk satır karşılık gelen değeri, sonraki satırlar aynı açının derece-dakika-saniye, radyan ve devir yazımını gösterir.",
    "Sonuçları rapora ya da hesap tablosuna aktarmak için 'Sonucu kopyala' düğmesini kullanın.",
  ],
  sections: [
    { h: 'Grad nedir?', p: [
      "Grad, tam bir turu 400 eşit parçaya bölen açı birimidir. Uluslararası kullanımda <strong>gon</strong> adıyla da anılır; hesap makinelerinde GRAD kipi olarak görünür. Bu birimde dik açı 100, doğru açı 200, tam tur 400 grad eder. Derece sisteminde ise aynı açılar 90, 180 ve 360'tır.",
      "Gradın alt birimleri onluk sistemle ilerler: bir grad 100 santigrada, bir santigrad 100 santisantigrada bölünür. Bu sayede 57,2536 grad gibi bir değer tek bir ondalık sayı olarak yazılır ve doğrudan toplanıp çıkarılır. Derecede ise dakika ve saniye altmışlık olduğundan toplama yaparken elde aktarmak gerekir. Gradın ölçme işlerinde tercih edilmesinin başlıca nedeni bu hesap kolaylığıdır.",
    ] },
    { h: 'Çeviri formülü', p: [
      "400 grad 360 dereceye eşit olduğundan oran 10'a 9'dur. Dereceden grada geçmek için değer 10/9 ile çarpılır: <strong>grad = derece × 10 ÷ 9</strong>. Graddan dereceye geçmek için 0,9 ile çarpılır: <strong>derece = grad × 0,9</strong>. Oran tam olduğu için çeviride yaklaşıklık yoktur; yalnızca 9'a bölümden gelen devirli ondalıklar yuvarlanır.",
      "Pratik bir yol: grad değerinden onda birini çıkarırsanız dereceyi bulursunuz. 150 grad için 150 − 15 = 135 derece. Tersine, derece değerine dokuzda birini eklerseniz grad elde edersiniz: 135 + 15 = 150 grad.",
    ] },
    { h: 'Çözümlü örnekler', p: [
      "Örnek 1: 90° kaç graddır? 90 × 10 ÷ 9 = 100 grad. Dik açının grad sistemindeki yuvarlak karşılığı budur ve çeyrek devire denk gelir.",
      "Örnek 2: 1 grad kaç derecedir? 1 × 0,9 = 0,9°. Derecenin ondalık kısmını 60 ile çarparak dakikaya çevirirsek 0,9 × 60 = 54 bulunur; yani 1 grad tam 54 açı dakikasıdır.",
      "Örnek 3: Bir ölçü aletinden okunan 57,25 gradlık açı 57,25 × 0,9 = 51,525° eder. Ondalık kısım 0,525 × 60 = 31,5 dakika, kalan 0,5 dakika da 30 saniyedir. Sonuç 51° 31′ 30″ olarak yazılır.",
      "Örnek 4: 1° ise 10 ÷ 9 = 1,111111 graddır. Sayı devirli olduğundan araç altı ondalık basamak gösterir.",
    ] },
    { h: 'Karşılaştırma tablosu', ul: [
      "<strong>0°</strong> = 0 grad",
      "<strong>30°</strong> = 33,3333 grad",
      "<strong>45°</strong> = 50 grad",
      "<strong>60°</strong> = 66,6667 grad",
      "<strong>90°</strong> = 100 grad (dik açı)",
      "<strong>135°</strong> = 150 grad",
      "<strong>180°</strong> = 200 grad (doğru açı)",
      "<strong>270°</strong> = 300 grad",
      "<strong>360°</strong> = 400 grad (tam tur)",
    ] },
    { h: 'Grad nerede kullanılır?', p: [
      "Gradın asıl kullanım alanı haritacılık ve ölçme işleridir. Türkiye'de harita ve kadastro çalışmalarında, aplikasyon ve poligon hesaplarında açılar yaygın olarak grad cinsinden ölçülür ve kaydedilir; total station ve teodolit gibi aletlerin ayar menüsünde açı birimi olarak derece ya da grad (gon) seçilebilir. Harita mühendisliği ve harita-kadastro öğrencileri semt açısı, kırılma açısı ve düşey açı hesaplarını bu birimle yapar.",
      "İnşaat şantiyesinde ise proje çizimleri ve gündelik ölçümler çoğunlukla dereceyle ifade edilir. Ölçme ekibinden gelen grad cinsinden bir değeri mimari projeyle karşılaştırmak ya da derece bekleyen bir yazılıma girmek gerektiğinde bu çeviriye ihtiyaç duyulur.",
      "Eğim ifadelerinde geçen 'yüzde' ile grad karıştırılmamalıdır. Yüzde 100 eğim 45 dereceye, yani 50 grada karşılık gelir; grad bir açı birimidir, yüzde eğim ise yükseklik farkının yatay mesafeye oranıdır.",
    ] },
    { h: 'Hesap makinesinde GRAD kipi', p: [
      "Bilimsel hesap makinelerinde açı kipi DEG, RAD ve GRAD arasında değiştirilebilir. Ekranın üstünde küçük bir G ya da GRA göstergesi varsa makine grad kipindedir. Bu durumda sin 90 yazdığınızda 1 yerine yaklaşık 0,9877 görürsünüz; çünkü makine 90 gradın, yani 81 derecenin sinüsünü hesaplamıştır. Sınavlarda beklenmedik sonuçların sık rastlanan nedenlerinden biri, yanlışlıkla açık kalmış GRAD kipidir.",
    ] },
    { h: 'Sınırlar', p: [
      "Araç pozitif ve negatif her açıyı kabul eder, 400 gradı aşan değerleri tam tura indirgemez. Derece ve grad değerleri altı ondalık basamağa, derece-dakika-saniye satırındaki saniye yüzde bire yuvarlanır. Arazi ölçmelerinde sonucun güvenilirliği alet duyarlılığına ve ölçme yöntemine bağlıdır; resmî ve mühendislik işlerinde ilgili yönetmelik ve meslek kurallarını esas alın.",
    ] },
  ],
  faq: [
    ['1 grad kaç derecedir?', "1 grad 0,9 derecedir. Derece ve dakika olarak 0° 54′ eder. Tersine 1 derece yaklaşık 1,1111 graddır."],
    ['100 grad kaç derecedir?', "100 grad tam olarak 90 derecedir, yani bir dik açıdır. 200 grad 180 dereceye, 400 grad 360 dereceye eşittir."],
    ['Grad ile gon aynı birim mi?', "Evet. Gon, gradın uluslararası standartlarda kullanılan adıdır. Ölçü aletlerinin menüsünde ve teknik belgelerde gon ya da kısaca g olarak geçebilir."],
    ['Grad ile gradyan ya da derece Celsius karışır mı?', "Karıştırılmamalıdır. Grad bir açı birimidir. Gradyan matematikte eğim vektörünü ifade eder; santigrat derece ise sıcaklık birimidir ve bu çeviriyle ilgisi yoktur."],
    ['Dereceyi grada kafadan nasıl çeviririm?', "Derece değerine dokuzda birini ekleyin. 90 için 90 + 10 = 100 grad, 45 için 45 + 5 = 50 grad, 18 için 18 + 2 = 20 grad bulunur."],
    ['Grad neden 400 parçadır?', "Dik açıyı 100'e bölerek açı hesabını onluk sisteme uydurmak için. Böylece açının kesirleri ondalık sayı olarak yazılır ve altmışlık dakika-saniye dönüşümüne gerek kalmaz."],
    ['Sonuçta derece-dakika-saniye neden veriliyor?', "Birçok proje, tapu eki ve yazılım açıyı derece-dakika-saniye olarak ister. Grad cinsinden ölçülmüş bir açıyı bu biçimde de görmek ikinci bir çeviri yapma zahmetinden kurtarır."],
    ['Girdiğim değerler kaydediliyor mu?', "Hayır. Çeviri tümüyle tarayıcınızda yapılır; girilen açılar sunucuya gönderilmez ve saklanmaz."],
  ],
  related: ['derece-radyan-cevir', 'dms-ondalik-derece-cevir', 'radyan-devir-cevir', 'ucgen-acisi-hesapla', 'dik-ucgen-hesapla'],
};
