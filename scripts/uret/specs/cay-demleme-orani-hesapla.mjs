export default {
  slug: 'cay-demleme-orani-hesapla',
  title: 'Çay Demleme Oranı Hesaplama',
  h1Tail: 'kaç bardağa ne kadar çay ve su?',
  pageTitle: 'Çay Demleme Oranı Hesaplama – Kaç Bardağa Ne Kadar Çay ve Su?',
  description: 'Bardak sayısını ve dem koyuluğunu seçin; demliğe koyacağınız kuru çayı gram olarak, dem suyunu ve çaydanlıkta kaynatmanız gereken sıcak suyu hesaplayın.',
  card: 'Bardak sayısına ve dem koyuluğuna göre demliğe konacak kuru çayı, dem suyunu ve sıcak su miktarını bulun.',
  category: 'gunluk',
  keywords: ['çay demleme oranı', 'kaç bardak çaya ne kadar çay', 'çay su oranı', 'demlik çay ölçüsü', 'çay nasıl demlenir ölçü', '10 kişilik çay ne kadar', 'dem oranı hesaplama'],
  lead: 'Kaç bardak çay ikram edeceğinizi ve çayın ne kadar koyu içileceğini belirtin; araç iki katlı çaydanlık için <strong>demliğe konacak kuru çayı</strong>, üzerine eklenecek dem suyunu ve bardakları tamamlamak için alt çaydanlıkta bulunması gereken sıcak suyu hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'bardak', label: 'Bardak sayısı', type: 'number', placeholder: 'Örn. 6' },
    { id: 'hacim', label: 'Bardak hacmi (ml)', type: 'number', value: '100', hint: 'İnce belli çay bardağı yaklaşık 100 ml, kupa 200–250 ml alır.' },
    { id: 'dem', label: 'Dem koyuluğu', type: 'select', options: [['orta', 'Orta (bardağın 1/3\'ü dem)'], ['acik', 'Açık (bardağın 1/4\'ü dem)'], ['koyu', 'Koyu (bardağın yarısı dem)']] },
    { id: 'cayOran', label: 'Kuru çay (100 ml dem suyu için gram)', type: 'number', value: '6', hint: 'Başlangıç değeri 6 g; damak zevkinize ve çayın cinsine göre değiştirin.' },
  ],
  compute(v, h) {
    const n = h.posint(v.bardak, 'Bardak sayısı');
    if (n > 500) h.err('Bardak sayısı en fazla 500 olabilir.');
    const hacim = h.pos(v.hacim, 'Bardak hacmi');
    if (hacim > 1000) h.err('Bardak hacmi 1000 ml\'den büyük olamaz; değeri mililitre olarak yazın.');
    const g100 = h.pos(v.cayOran, 'Kuru çay oranı');
    if (g100 > 30) h.err('100 ml dem suyu için 30 gramdan fazla çay girilemez; yaygın değerler 4 ile 8 gram arasındadır.');
    const pay = v.dem === 'koyu' ? 1 / 2 : v.dem === 'acik' ? 1 / 4 : 1 / 3;
    const toplam = n * hacim;
    const demMl = toplam * pay;
    const cay = demMl * g100 / 100;
    return {
      rows: [
        ['Kuru çay', h.fmt(cay, 1) + ' g'],
        ['Demliğe eklenecek su', h.fmt(demMl, 0) + ' ml'],
        ['Bardakları tamamlayacak sıcak su', h.fmt(toplam - demMl, 0) + ' ml'],
        ['Toplam su', h.fmt(toplam, 0) + ' ml'],
        ['Bardak başına dem', h.fmt(hacim * pay, 1) + ' ml'],
        ['Bardak başına kuru çay', h.fmt(cay / n, 2) + ' g'],
      ],
      note: 'Çay yaprakları suyun bir kısmını emer, alt çaydanlıkta da buharlaşma olur; uzun süre ocakta kalacaksa hesaplanan sıcak suya pay ekleyin.',
    };
  },
  cases: [
    { in: { bardak: '6', hacim: '100', dem: 'orta', cayOran: '6' }, out: { 'Kuru çay': '12 g', 'Demliğe eklenecek su': '200 ml', 'Bardakları tamamlayacak sıcak su': '400 ml', 'Toplam su': '600 ml', 'Bardak başına dem': '33,3 ml', 'Bardak başına kuru çay': '2 g' } },
    { in: { bardak: '4', hacim: '100', dem: 'koyu', cayOran: '6' }, out: { 'Kuru çay': '12 g', 'Demliğe eklenecek su': '200 ml', 'Bardakları tamamlayacak sıcak su': '200 ml', 'Toplam su': '400 ml' } },
    { in: { bardak: '8', hacim: '100', dem: 'acik', cayOran: '6' }, out: { 'Kuru çay': '12 g', 'Demliğe eklenecek su': '200 ml', 'Bardakları tamamlayacak sıcak su': '600 ml', 'Bardak başına kuru çay': '1,5 g' } },
    { in: { bardak: '10', hacim: '120', dem: 'orta', cayOran: '5' }, out: { 'Kuru çay': '20 g', 'Demliğe eklenecek su': '400 ml', 'Bardakları tamamlayacak sıcak su': '800 ml', 'Toplam su': '1.200 ml' } },
    { in: { bardak: '12', hacim: '100', dem: 'orta', cayOran: '6' }, out: { 'Kuru çay': '24 g', 'Demliğe eklenecek su': '400 ml', 'Bardakları tamamlayacak sıcak su': '800 ml' } },
    { in: { bardak: '1', hacim: '100', dem: 'acik', cayOran: '6' }, out: { 'Kuru çay': '1,5 g', 'Demliğe eklenecek su': '25 ml', 'Bardakları tamamlayacak sıcak su': '75 ml' } },
    { in: { bardak: '0', hacim: '100', dem: 'orta', cayOran: '6' }, error: true },
    { in: { bardak: '2,5', hacim: '100', dem: 'orta', cayOran: '6' }, error: true },
    { in: { bardak: '6', hacim: '100', dem: 'orta', cayOran: '' }, error: true },
  ],
  howto: [
    'İkram edeceğiniz toplam bardak sayısını yazın; ikinci bardakları da hesaba katın.',
    'Bardak hacmini kontrol edin. İnce belli bardak için 100 ml uygundur; kupa kullanıyorsanız 200 ya da 250 yazın.',
    'Çayın nasıl içileceğine göre dem koyuluğunu seçin: açık, orta ya da koyu.',
    'İsterseniz kuru çay oranını değiştirin; değer büyüdükçe dem sertleşir.',
    '"Hesapla" düğmesine basın; demliğe konacak çay ve su ile alt çaydanlıkta gereken sıcak su listelenir.',
  ],
  sections: [
    { h: 'İki katlı çaydanlıkta hesap mantığı', p: [
      'Türk usulü çayda bardağa önce demlikten koyu dem, sonra alt çaydanlıktan sıcak su konur. Dolayısıyla hazırlanacak iki ayrı sıvı vardır ve hesap üç adımda yapılır. Önce bardaklara girecek toplam sıvı bulunur: <strong>toplam = bardak sayısı × bardak hacmi</strong>. Sonra bunun ne kadarının dem olacağı belirlenir: <strong>dem suyu = toplam × dem payı</strong>. Kalan kısım sıcak sudur. Son olarak demin sertliğini belirleyen kuru çay hesaplanır: <strong>kuru çay = dem suyu × gram oranı ÷ 100</strong>.',
      'Araçtaki dem payları gündelik dildeki karşılıklarıyla seçilmiştir: açık çayda bardağın dörtte biri, orta çayda üçte biri, koyu çayda yarısı dem ile doldurulur. Kuru çay için varsayılan değer, her 100 ml dem suyuna 6 gramdır. Bu, bir ölçüm standardı değil, çoğu damak için makul bir başlangıç noktasıdır; kullandığınız çayın cinsine, yaprak iriliğine ve alışkanlığınıza göre değiştirebilirsiniz.',
    ] },
    { h: 'Çözümlü örnek: altı bardak orta demli çay', p: [
      'Altı ince belli bardak, her biri 100 ml: toplam sıvı 6 × 100 = 600 ml. Orta dem için üçte biri dem olacağından demliğe <strong>200 ml</strong> su eklenir; bardakları tamamlamak için alt çaydanlıkta en az <strong>400 ml</strong> sıcak su bulunmalıdır. Kuru çay 200 × 6 ÷ 100 = <strong>12 gram</strong> eder, yani bardak başına 2 gram.',
      'Aynı 12 gram çay ve 200 ml dem suyu ile koyu içenlere dört, açık içenlere sekiz bardak çay çıkar. Sofrada farklı tercihler varsa bardak sayısını orta deme göre hesaplayıp alt çaydanlığa fazladan su koymak pratik bir çözümdür: dem sabit kalır, her bardak sıcak suyla istenen açıklığa getirilir.',
    ] },
    { h: 'Kalabalık sofralar için hızlı tablo (100 ml bardak, orta dem, 6 g oran)', ul: [
      '<strong>4 bardak:</strong> 8 g çay, 133 ml dem suyu, 267 ml sıcak su',
      '<strong>6 bardak:</strong> 12 g çay, 200 ml dem suyu, 400 ml sıcak su',
      '<strong>10 bardak:</strong> 20 g çay, 333 ml dem suyu, 667 ml sıcak su',
      '<strong>12 bardak:</strong> 24 g çay, 400 ml dem suyu, 800 ml sıcak su',
      '<strong>20 bardak:</strong> 40 g çay, 667 ml dem suyu, 1.333 ml sıcak su',
      '<strong>30 bardak:</strong> 60 g çay, 1.000 ml dem suyu, 2.000 ml sıcak su',
    ] },
    { h: 'Demleme adımları', ol: [
      'Alt çaydanlığa hesaplanan toplam sudan biraz fazlasını koyup kaynatın; buharlaşma ve tazeleme için pay bırakın.',
      'Kuru çayı tartıp demliğe koyun. Dilerseniz çayı kısa bir süre ılık suyla çalkalayıp süzerek tozunu alabilirsiniz.',
      'Kaynamış suyu demlikteki çayın üzerine, hesaplanan dem suyu kadar dökün.',
      'Demliği alt çaydanlığın üzerine yerleştirin, ocağı kısın ve çayın demlenmesini bekleyin. Yaprakların dibe çökmesi demin hazır olduğunun yaygın işaretidir.',
      'Bardağa önce demi, sonra sıcak suyu koyun. Demi uzun süre ocakta bekletmeyin; bekledikçe acılaşır.',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Çayı göz kararı koymak: kaşık ölçüsü çayın yaprak iriliğine göre çok değişir. Bir kez tartıp kendi kaşığınızın kaç gram aldığını öğrenmek işinizi kolaylaştırır.',
      'Demliğe gereğinden fazla su koymak: dem zayıflar ve bardağın yarısından fazlasını demle doldurmak zorunda kalırsınız.',
      'Yaprakların emdiği suyu unutmak: kuru çay ağırlığının birkaç katı kadar su tutar; dem suyunu hesaplanan değerin biraz üzerinde tutmak son bardakta eksik kalmayı önler.',
      'Alt çaydanlığı az doldurmak: sıcak su biterse yeni su kaynayana kadar dem bekler ve acılaşır.',
      'Demi sürekli kaynatmak: çay kaynatılmaz, demlenir; yüksek ateş burukluğu artırır.',
    ] },
    { h: 'Sınırlar ve kişisel ayar', p: [
      'Çayın tadı yalnızca orana bağlı değildir; çayın harmanı, suyun sertliği, demleme süresi ve demliğin malzemesi sonucu etkiler. Bu yüzden araçtaki oranlar bir tarif değil, hesap kolaylığıdır. İlk denemeden sonra dem size hafif geldiyse gram oranını bir birim artırın, sert geldiyse azaltın; beğendiğiniz değeri bulduktan sonra bardak sayısı kaç olursa olsun aynı tadı tutturabilirsiniz. Poşet çay ve süzgeçli tek demlik yöntemleri farklı çalışır; bu hesap iki katlı çaydanlık içindir.',
    ] },
  ],
  faq: [
    ['6 bardak çay için ne kadar kuru çay gerekir?', 'Orta dem ve 100 ml dem suyuna 6 gram oranıyla 12 gram kuru çay ve 200 ml dem suyu gerekir. Bardakları tamamlamak için ayrıca 400 ml sıcak su lazımdır.'],
    ['Demliğe ne kadar su koymalıyım?', 'Toplam bardak hacminin dem payı kadar: açık çayda dörtte biri, orta çayda üçte biri, koyu çayda yarısı. On bardak orta demli çay için yaklaşık 333 ml dem suyu yeterlidir; yaprakların emeceği su için biraz fazlasını ekleyebilirsiniz.'],
    ['Bir bardak çaya kaç gram çay düşer?', 'Varsayılan ayarlarla orta demde bardak başına 2 gram, açık demde 1,5 gram, koyu demde 3 gram kuru çay düşer. Gram oranını değiştirirseniz bu değerler de değişir.'],
    ['Kupa için nasıl hesaplarım?', 'Bardak hacmine kupanızın aldığı miktarı yazın; çoğu kupa 200 ile 250 ml arasındadır. Araç dem ve sıcak su miktarını bu hacme göre hesaplar.'],
    ['Kuru çay oranını neye göre değiştirmeliyim?', 'İnce kıyılmış çaylar daha çabuk ve yoğun dem verir, iri yapraklı çaylar daha fazla miktar isteyebilir. Deminiz hafif kalıyorsa oranı 7 ya da 8\'e çıkarın, buruk geliyorsa 5\'e indirin.'],
    ['Hesaplanan sıcak su neden yetmeyebilir?', 'Araç bardaklara girecek net miktarı verir. Kaynama sırasında buharlaşma olur ve çay yaprakları dem suyunun bir kısmını tutar. Çay uzun süre ocakta kalacaksa alt çaydanlığa belirgin biçimde fazla su koyun.'],
    ['Yeşil çay ya da bitki çayı için kullanılabilir mi?', 'Hayır. Bu hesap siyah çayın iki katlı çaydanlıkta dem ve sıcak suyla hazırlanmasına göredir. Yeşil çay ve bitki çayları doğrudan içilecek yoğunlukta demlenir ve farklı oranlar ister.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; hiçbir veri sunucuya gönderilmez.'],
  ],
  related: ['kahve-su-orani-hesapla', 'pirinc-su-orani-hesapla', 'mutfak-olcu-donustur', 'tarif-olcekle', 'masa-kisi-sayisi-hesapla'],
};
