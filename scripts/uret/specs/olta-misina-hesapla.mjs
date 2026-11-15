export default {
  slug: 'olta-misina-hesapla',
  title: 'Makaraya Sarılan Misina Uzunluğu Hesaplama',
  h1Tail: 'makara kapasitesi ve dolgu',
  pageTitle: 'Makaraya Sarılan Misina Uzunluğu Hesaplama – Makara Kapasitesi',
  description: 'Makaranın üzerinde yazan kapasiteden yola çıkarak farklı çaptaki misinadan kaç metre saracağını ve gereken dolgu misinası miktarını hesaplayın.',
  card: 'Makara kapasitesinden farklı çaptaki misinanın kaç metre sığacağını ve gereken dolgu (alt sargı) uzunluğunu bulun.',
  category: 'gunluk',
  keywords: ['makara misina kapasitesi', 'makaraya kaç metre misina sarılır', 'misina uzunluğu hesaplama', 'dolgu misinası hesaplama', 'ip misina makara kapasitesi', 'makara kapasite çevirme', 'olta makarası misina'],
  lead: 'Makaranızın kapasitesi tek bir misina çapı için yazılmışsa, <strong>başka çaptaki misinadan kaç metre saracağını</strong> bu araçla bulun. İsterseniz sarmak istediğiniz uzunluğu da yazın; araç makaranın ne kadar dolacağını ve boşluğu kapatmak için gereken dolgu misinasını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'capBilinen', label: 'Makarada yazan misina çapı (mm)', type: 'number', placeholder: 'Örn. 0,30' },
    { id: 'uzunlukBilinen', label: 'Makarada yazan kapasite (m)', type: 'number', placeholder: 'Örn. 150' },
    { id: 'capYeni', label: 'Saracağınız misinanın çapı (mm)', type: 'number', placeholder: 'Örn. 0,20' },
    { id: 'istenen', label: 'Sarmak istediğiniz uzunluk (m, isteğe bağlı)', type: 'number', placeholder: 'Örn. 150', hint: 'Boş bırakırsanız yalnızca tam kapasite hesaplanır.' },
    { id: 'capDolgu', label: 'Dolgu misinası çapı (mm, isteğe bağlı)', type: 'number', placeholder: 'Örn. 0,30', hint: 'Alt sargı olarak kullanacağınız ucuz misinanın çapı.' },
  ],
  compute(v, h) {
    const d1 = h.pos(v.capBilinen, 'Makarada yazan misina çapı');
    const l1 = h.pos(v.uzunlukBilinen, 'Makarada yazan kapasite');
    const d2 = h.pos(v.capYeni, 'Saracağınız misinanın çapı');
    if (d1 > 3 || d2 > 3) h.err('Misina çapı 3 mm\'den büyük olamaz; çapı milimetre olarak yazın (örn. 0,30).');
    const kapasite = l1 * (d1 / d2) * (d1 / d2);
    const rows = [
      ['Yeni misina kapasitesi', h.fmt(kapasite, 1) + ' m'],
      ['Kapasite oranı', h.fmt(kapasite / l1 * 100, 1) + ' %'],
    ];
    const bos = (s) => String(s ?? '').trim() === '';
    if (!bos(v.istenen)) {
      const ist = h.pos(v.istenen, 'Sarmak istediğiniz uzunluk');
      if (ist > kapasite * (1 + 1e-9)) h.err(`Bu makaraya ${h.fmt(d2, 3)} mm misinadan en fazla ${h.fmt(kapasite, 1)} m sığar; daha kısa bir uzunluk yazın.`);
      const doluluk = Math.min(1, ist / kapasite);
      rows.push(['Makara doluluğu', h.fmt(doluluk * 100, 1) + ' %']);
      rows.push(['Kalan boşluk (aynı misinayla)', h.fmt(kapasite - ist, 1) + ' m']);
      if (!bos(v.capDolgu)) {
        const d3 = h.pos(v.capDolgu, 'Dolgu misinası çapı');
        if (d3 > 3) h.err('Dolgu misinası çapı 3 mm\'den büyük olamaz.');
        rows.push(['Gereken dolgu misinası', h.fmt(l1 * (d1 / d3) * (d1 / d3) * (1 - doluluk), 1) + ' m']);
      }
    } else if (!bos(v.capDolgu)) {
      h.err('Dolgu misinası hesabı için "Sarmak istediğiniz uzunluk" alanını da doldurun.');
    }
    return {
      rows,
      note: 'Hesap, kapasitenin misina kesit alanıyla ters orantılı olduğu kabulüne dayanır. Sarım sıkılığı ve ip misinaların gerçek çapı sonucu yüzde 10–20 oynatabilir.',
    };
  },
  cases: [
    { in: { capBilinen: '0,30', uzunlukBilinen: '150', capYeni: '0,20' }, out: { 'Yeni misina kapasitesi': '337,5 m', 'Kapasite oranı': '225 %' } },
    { in: { capBilinen: '0,30', uzunlukBilinen: '150', capYeni: '0,15', istenen: '300', capDolgu: '0,30' }, out: { 'Yeni misina kapasitesi': '600 m', 'Makara doluluğu': '50 %', 'Kalan boşluk (aynı misinayla)': '300 m', 'Gereken dolgu misinası': '75 m' } },
    { in: { capBilinen: '0,20', uzunlukBilinen: '240', capYeni: '0,40' }, out: { 'Yeni misina kapasitesi': '60 m', 'Kapasite oranı': '25 %' } },
    { in: { capBilinen: '0,25', uzunlukBilinen: '200', capYeni: '0,35' }, out: { 'Yeni misina kapasitesi': '102 m' } },
    { in: { capBilinen: '0,30', uzunlukBilinen: '150', capYeni: '0,30', istenen: '150' }, out: { 'Yeni misina kapasitesi': '150 m', 'Makara doluluğu': '100 %', 'Kalan boşluk (aynı misinayla)': '0 m' } },
    { in: { capBilinen: '0,35', uzunlukBilinen: '200', capYeni: '0,20', istenen: '150', capDolgu: '0,35' }, out: { 'Yeni misina kapasitesi': '612,5 m', 'Makara doluluğu': '24,5 %', 'Gereken dolgu misinası': '151 m' } },
    { in: { capBilinen: '0,30', uzunlukBilinen: '150', capYeni: '0,20', istenen: '400' }, error: true },
    { in: { capBilinen: '0', uzunlukBilinen: '150', capYeni: '0,20' }, error: true },
    { in: { capBilinen: '30', uzunlukBilinen: '150', capYeni: '20' }, error: true },
  ],
  howto: [
    'Makaranın kafasında ya da kutusunda yazan kapasite çiftlerinden birini seçin; örneğin "0,30 mm – 150 m". Çapı ve uzunluğu ilk iki alana yazın.',
    'Saracağınız misinanın çapını milimetre olarak girin. Çap, misina makarasının etiketinde yazar.',
    'Yalnızca tam kapasiteyi merak ediyorsanız "Hesapla" düğmesine basın.',
    'Belirli bir uzunluk saracaksanız bu uzunluğu, altını dolduracağınız misinanın çapıyla birlikte yazın; araç gereken dolgu miktarını metre olarak verir.',
    'Dolguyu sararken sonucu kesin ölçü değil hedef olarak alın; son birkaç metreyi makaranın dudağına bakarak ayarlayın.',
  ],
  sections: [
    { h: 'Makara kapasitesi neden çapın karesiyle değişir?', p: [
      'Makaranın kafası sabit hacimli bir oluktur. Bu oluğa sığan misinanın uzunluğu, misinanın kapladığı kesit alanına bağlıdır; kesit alanı ise çapın karesiyle orantılıdır. Çap yarıya inerse kesit dörtte bire düşer ve aynı oluğa dört kat uzun misina sığar. Bu nedenle çevirme formülü şöyledir: <strong>yeni kapasite = bilinen kapasite × (bilinen çap ÷ yeni çap)²</strong>.',
      'Üreticiler kapasiteyi genellikle iki ya da üç çap için verir. Bu çiftlerin hangisini girdiğinizin önemi yoktur; hepsi aynı oluk hacmini anlattığı için yakın sonuçlar verir. Küçük farklar, üreticinin değerleri yuvarlamasından kaynaklanır.',
    ] },
    { h: 'Çözümlü örnekler', p: [
      'Makaranızda "0,30 mm – 150 m" yazıyor ve 0,20 mm misina saracaksınız. Çap oranı 0,30 ÷ 0,20 = 1,5; karesi 2,25. Kapasite 150 × 2,25 = <strong>337,5 metre</strong> olur. Tersine, 0,20 mm için 240 metre alan bir makaraya 0,40 mm misina sarmak isterseniz oran 0,5, karesi 0,25 olduğundan yalnızca 60 metre sığar.',
      'Dolgu örneği: Aynı "0,30 mm – 150 m" makaraya 0,15 mm ip misinadan 300 metre sarmak istiyorsunuz. Bu çapta tam kapasite 150 × (0,30 ÷ 0,15)² = 600 metredir; 300 metre makaranın yüzde 50\'sini doldurur. Kalan yarıyı 0,30 mm düz misinayla kapatacaksanız 150 × 0,5 = <strong>75 metre</strong> dolgu gerekir.',
    ] },
    { h: 'Dolgu misinası (alt sargı) neden kullanılır?', p: [
      'İnce ip misinalar pahalıdır ve balıkçılıkta çoğu zaman 100–150 metresi yeterlidir. Makara ise yarı boş kaldığında atış mesafesi düşer, çünkü misina kafanın dudağına sürtünerek çıkar. Çözüm, kafanın dibine ucuz düz misina sarıp üstüne asıl misinayı bağlamaktır. Böylece makara dudak hizasına kadar dolar, pahalı misinadan da tasarruf edilir.',
      'Dolgu ile ana misina sağlam bir birleştirme düğümüyle bağlanmalıdır. İri bir balık bütün ana misinayı boşaltırsa yük bu düğüme biner. Düğümün kılavuz halkalardan rahat geçecek kadar ince olması da atış sırasında takılmayı önler.',
    ] },
    { h: 'Sonucu etkileyen etkenler', ul: [
      '<strong>Etiket çapı ile gerçek çap:</strong> Özellikle ip misinalarda etikette yazan çap gerçekte olduğundan ince gösterilebilir. Örgü yapısı yassılaştığı için ölçmek de zordur.',
      '<strong>Sarım sıkılığı:</strong> Gevşek sarılan misina daha fazla yer kaplar. Sararken misinayı parmaklarınız ya da nemli bir bez arasından geçirerek gergin tutun.',
      '<strong>Doluluk payı:</strong> Makara ağzına kadar doldurulmaz; dudağın 1–2 milimetre altında bırakmak, atışta misinanın topak halinde boşalmasını önler.',
      '<strong>Misina türü:</strong> Florokarbon ve düz misina yuvarlak kesitlidir ve hesap bunlarda daha tutarlıdır. İp misina sıkışarak yassılır ve hesaplanandan biraz fazla sığabilir.',
    ] },
    { h: 'Pratik sarma yöntemi', p: [
      'Hesapla bulunan dolgu uzunluğu iyi bir başlangıçtır, ancak en sağlam yöntem ters sarımdır. Yedek bir kafanız ya da boş bir makaranız varsa önce ana misinayı, üstüne makara dolana kadar dolguyu sarın; sonra hepsini diğer kafaya aktarın. Böylece dolgu altta, ana misina üstte kalır ve doluluk tam ayarlanmış olur. Yedek kafa yoksa bu sayfadaki sonucu kullanıp son metreleri gözle tamamlayabilirsiniz.',
      'Dolgu misinasının metresini ölçmek için misinayı kulaç hesabıyla saymak yerine makara kolunun tur sayısından yararlanabilirsiniz: makaranın bir kol turunda sardığı misina boyu teknik özelliklerinde yazar. Yine de kafa doldukça tur başına sarılan boy arttığı için bu da yaklaşık bir ölçüdür.',
    ] },
    { h: 'Hızlı başvuru: çap oranına göre kapasite', ul: [
      'Yeni çap bilinen çapın <strong>yarısı</strong> ise kapasite 4 katına çıkar.',
      'Yeni çap bilinen çapın <strong>üçte ikisi</strong> ise kapasite 2,25 katına çıkar.',
      'Yeni çap bilinen çapın <strong>1,5 katı</strong> ise kapasite yaklaşık yüzde 44\'e iner.',
      'Yeni çap bilinen çapın <strong>2 katı</strong> ise kapasite dörtte bire iner.',
    ] },
  ],
  faq: [
    ['Makaraya kaç metre misina sarılır?', 'Bu, makaranın kafa hacmine ve misina çapına bağlıdır. Makaranın üzerinde yazan çap-uzunluk çiftini ve kullanacağınız misinanın çapını araca yazdığınızda sığacak uzunluğu görürsünüz; örneğin 0,30 mm için 150 metre alan bir kafa 0,25 mm misinadan 216 metre alır.'],
    ['Kapasite libre (lb) olarak yazıyorsa ne yapmalıyım?', 'Libre değeri çapı değil kopma dayanımını gösterir ve aynı dayanımdaki misinaların çapı markadan markaya değişir. Makaranın kutusunda ya da kullanım kılavuzunda milimetre karşılığı çoğunlukla ayrıca verilir; hesabı o çapla yapın.'],
    ['İp misina için sonuç ne kadar güvenilir?', 'Yaklaşık bir değer olarak kullanılmalıdır. İp misinaların etiket çapı gerçek çaptan sapabildiği ve örgü sıkıştığı için yüzde 10–20 fark görülebilir. Bu yüzden dolguyu biraz eksik sarıp son ayarı ana misinayı sardıktan sonra yapmak güvenlidir.'],
    ['Dolgu misinası hangi çapta olmalı?', 'Kesin bir kural yoktur; 0,25–0,35 mm arası ucuz düz misinalar yaygın olarak kullanılır. Çok kalın dolgu, üstüne sarılan ince misinanın aralara gömülmesine neden olabilir. Hangi çapı seçerseniz seçin, araca o çapı yazmanız yeterlidir.'],
    ['Makarayı tam ağzına kadar doldurmalı mıyım?', 'Hayır. Dudak hizasının 1–2 milimetre altında bırakmak önerilir. Fazla dolu makarada misina halkalar halinde kendiliğinden boşalır ve atışta düğüm olur; az dolu makarada ise atış mesafesi kısalır.'],
    ['Çıkrık (baitcasting) makaralarda da geçerli mi?', 'Evet. Formül oluğun hacmine dayandığı için makara tipinden bağımsızdır; sinek makaraları ve tekne tipi çıkrıklar için de aynı oran kullanılır. Yalnızca girdiğiniz kapasite değerinin o makaraya ait olduğundan emin olun.'],
    ['Farklı çaplarda iki kapasite yazıyorsa hangisini girmeliyim?', 'Saracağınız misinanın çapına en yakın olanı seçin. Çaplar birbirine yaklaştıkça yuvarlama ve sarım farklarının etkisi azalır, sonuç daha isabetli olur.'],
    ['Yazdığım ölçüler bir yere gönderiliyor mu?', 'Hayır. Hesap yalnızca tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve saklanmaz.'],
  ],
  related: ['rulo-uzunlugu-hesapla', 'silindir-hacmi-hesapla', 'tekne-hizi-hesapla', 'cm-inc-cevir', 'kumas-metraj-hesapla'],
};
