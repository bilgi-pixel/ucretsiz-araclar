export default {
  slug: 'crop-faktoru-hesapla',
  title: 'Crop Faktörü ve Eşdeğer Odak Uzaklığı Hesaplama',
  h1Tail: 'tam kare karşılığı',
  pageTitle: 'Crop Faktörü Hesaplama – Eşdeğer Odak Uzaklığı ve Diyafram',
  description: 'Objektifinizin APS-C, Mikro 4/3 ya da 1 inç sensördeki tam kare eşdeğer odak uzaklığını, eşdeğer diyaframını ve görüş açısını crop faktörüyle hesaplayın.',
  card: 'Objektifin kırpılmış sensördeki tam kare eşdeğer odak uzaklığını, diyaframını ve görüş açısını bulun.',
  category: 'gunluk',
  keywords: ['crop faktörü hesaplama', 'eşdeğer odak uzaklığı', 'aps-c tam kare karşılığı', 'kırpma çarpanı', 'crop factor', '35 mm eşdeğeri', 'mikro 4/3 odak uzaklığı'],
  lead: 'Objektifin üzerinde yazan odak uzaklığının, kullandığınız sensörde <strong>tam kare (35 mm) karşılığı</strong> kaç milimetre eder? Sensör tipini seçin ya da kendi crop faktörünüzü yazın; araç eşdeğer odak uzaklığını, alan derinliği bakımından eşdeğer diyaframı ve köşegen görüş açısını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'odak', label: 'Objektif odak uzaklığı (mm)', type: 'number', placeholder: 'Örn. 35' },
    { id: 'sensor', label: 'Sensör tipi', type: 'select', options: [
      ['1.5', 'APS-C (1,5×)'],
      ['1.6', 'APS-C (1,6×)'],
      ['1', 'Tam kare (1×)'],
      ['1.3', 'APS-H (1,3×)'],
      ['2', 'Mikro 4/3 (2×)'],
      ['2.7', '1 inç (2,7×)'],
      ['0.79', 'Orta format 44×33 mm (0,79×)'],
      ['ozel', 'Özel crop faktörü'],
    ] },
    { id: 'ozel', label: 'Özel crop faktörü', type: 'number', placeholder: 'Örn. 5,6', hint: 'Yalnızca "Özel" seçiliyse kullanılır' },
    { id: 'diyafram', label: 'Diyafram (f/, isteğe bağlı)', type: 'number', placeholder: 'Örn. 1,8' },
  ],
  compute(v, h) {
    const f = h.pos(v.odak, 'Objektif odak uzaklığı');
    let c;
    if (v.sensor === 'ozel') {
      c = h.pos(v.ozel, 'Özel crop faktörü');
      if (c > 20) h.err('Crop faktörü 20\'den büyük olamaz; değeri kontrol edin.');
    } else c = Number(v.sensor);
    const fe = f * c;
    const kosegen = Math.sqrt(36 * 36 + 24 * 24);
    const aci = 2 * Math.atan(kosegen / (2 * fe)) * 180 / Math.PI;
    let tur;
    if (fe < 24) tur = 'Ultra geniş açı';
    else if (fe < 35) tur = 'Geniş açı';
    else if (fe <= 60) tur = 'Normal (standart)';
    else if (fe <= 135) tur = 'Kısa tele (portre)';
    else if (fe <= 300) tur = 'Tele';
    else tur = 'Süper tele';
    const rows = [
      ['Eşdeğer odak uzaklığı', h.fmt(fe, 1) + ' mm'],
      ['Crop faktörü', h.fmt(c, 2) + '×'],
      ['Köşegen görüş açısı', h.fmt(aci, 2) + '°'],
      ['Objektif sınıfı', tur],
      ['Sensör köşegeni', h.fmt(kosegen / c, 1) + ' mm'],
    ];
    if (String(v.diyafram ?? '').trim() !== '') {
      const N = h.pos(v.diyafram, 'Diyafram');
      rows.splice(1, 0, ['Eşdeğer diyafram (alan derinliği)', 'f/' + h.fmt(N * c, 1)]);
    }
    return {
      rows,
      note: 'Eşdeğer diyafram yalnızca alan derinliği ve toplam ışık içindir; pozlama ayarı objektifteki f değeriyle yapılır.',
    };
  },
  cases: [
    { in: { odak: '50', sensor: '1.5' }, out: { 'Eşdeğer odak uzaklığı': '75 mm', 'Crop faktörü': '1,5×', 'Objektif sınıfı': 'Kısa tele (portre)' } },
    { in: { odak: '25', sensor: '2', diyafram: '1,8' }, out: { 'Eşdeğer odak uzaklığı': '50 mm', 'Eşdeğer diyafram (alan derinliği)': 'f/3,6', 'Köşegen görüş açısı': '46,79°' } },
    { in: { odak: '35', sensor: '1.6' }, out: { 'Eşdeğer odak uzaklığı': '56 mm', 'Objektif sınıfı': 'Normal (standart)' } },
    { in: { odak: '50', sensor: '1' }, out: { 'Eşdeğer odak uzaklığı': '50 mm', 'Köşegen görüş açısı': '46,79°', 'Sensör köşegeni': '43,3 mm' } },
    { in: { odak: '9', sensor: 'ozel', ozel: '2,7' }, out: { 'Eşdeğer odak uzaklığı': '24,3 mm', 'Objektif sınıfı': 'Geniş açı' } },
    { in: { odak: '200', sensor: '1.5', diyafram: '2,8' }, out: { 'Eşdeğer odak uzaklığı': '300 mm', 'Eşdeğer diyafram (alan derinliği)': 'f/4,2', 'Objektif sınıfı': 'Tele' } },
    { in: { odak: '0', sensor: '1.5' }, error: true },
    { in: { odak: '50', sensor: 'ozel', ozel: '' }, error: true },
  ],
  howto: [
    '"Objektif odak uzaklığı" alanına objektifin üzerinde yazan milimetre değerini girin. Zoom objektiflerde ilgilendiğiniz ucu (örneğin 18 ya da 55) yazın.',
    '"Sensör tipi" listesinden makinenizin sensör biçimini seçin. Listede yoksa "Özel crop faktörü" seçip çarpanı alttaki alana yazın.',
    'Alan derinliği karşılaştırması da yapmak istiyorsanız "Diyafram" alanına objektifin f değerini girin; bu alan isteğe bağlıdır.',
    '"Hesapla" düğmesine basın. İlk satırda tam kare eşdeğer odak uzaklığı, altında görüş açısı ve objektifin hangi sınıfa düştüğü gösterilir.',
  ],
  sections: [
    { h: 'Crop faktörü ne anlama gelir?', p: [
      'Crop faktörü (kırpma çarpanı), bir sensörün köşegeninin 36 × 24 mm ölçüsündeki tam kare sensörün köşegenine oranının tersidir. Tam kare sensörün köşegeni yaklaşık 43,3 mm\'dir. Köşegeni 28,8 mm olan bir APS-C sensörde bu oran 43,3 ÷ 28,8 ≈ 1,5 çıkar. Sensör küçüldükçe objektifin oluşturduğu görüntü dairesinin daha küçük bir bölümü kaydedilir; fotoğraf, tam karede çekilip ortasından kırpılmış gibi görünür. Adı da buradan gelir.',
      'Önemli bir ayrım: objektifin odak uzaklığı fiziksel bir özelliktir ve hangi gövdeye takılırsa takılsın değişmez. 50 mm\'lik objektif APS-C gövdede de 50 mm\'dir. Değişen şey görüş açısıdır. "Eşdeğer odak uzaklığı", aynı görüş açısını tam karede hangi objektifin vereceğini söyleyen bir karşılaştırma sayısıdır.',
    ] },
    { h: 'Formüller ve çözümlü örnek', p: [
      'Temel eşitlik basittir: <strong>eşdeğer odak = odak uzaklığı × crop faktörü</strong>. 1,5× çarpanlı bir APS-C gövdeye 50 mm objektif taktığınızda 50 × 1,5 = 75 mm eşdeğeri elde edersiniz; yani kadrajınız tam karedeki 75 mm\'lik bir portre objektifininkiyle aynıdır.',
      'Alan derinliği için benzer bir çarpma yapılır: <strong>eşdeğer diyafram = f değeri × crop faktörü</strong>. Mikro 4/3 gövdede 25 mm f/1,8 objektif, kadraj bakımından 50 mm\'ye, arka plan bulanıklığı bakımından ise tam karedeki f/3,6\'ya denk gelir. Köşegen görüş açısı da <strong>2 × arctan(43,27 ÷ (2 × eşdeğer odak))</strong> ile bulunur; 50 mm eşdeğeri için bu 46,79 derecedir ve insan gözünün doğal algısına yakın kabul edildiğinden "normal objektif" diye anılır.',
    ] },
    { h: 'Yaygın sensör biçimleri ve çarpanları', ul: [
      '<strong>Tam kare (36 × 24 mm):</strong> 1× — karşılaştırmanın referansı',
      '<strong>APS-H:</strong> yaklaşık 1,3×',
      '<strong>APS-C:</strong> üreticiye göre 1,5× ya da 1,6×',
      '<strong>Mikro 4/3 (17,3 × 13 mm):</strong> 2×',
      '<strong>1 inç tipi (13,2 × 8,8 mm):</strong> yaklaşık 2,7×',
      '<strong>Orta format 44 × 33 mm:</strong> yaklaşık 0,79× — çarpan 1\'den küçük olduğu için görüş açısı genişler',
    ], p: [
      'Telefon kameralarında çarpan çok daha büyüktür ve modelden modele değişir. Telefonunuzun ana kamerasının gerçek odak uzaklığı birkaç milimetredir; teknik özelliklerde yazan "24 mm" ya da "26 mm" ise zaten eşdeğer değerdir. Gerçek odak uzaklığını ve eşdeğerini biliyorsanız ikisini birbirine bölerek çarpanı bulabilir, "Özel" seçeneğiyle kullanabilirsiniz.',
    ] },
    { h: 'Eşdeğer diyafram pozlamayı değiştirmez', p: [
      'En sık karıştırılan konu budur. f/1,8 objektif hangi sensörde olursa olsun birim alana aynı yoğunlukta ışık düşürür; pozlama ayarınız, enstantaneniz ve ışıkölçer okumanız değişmez. Eşdeğer diyafram iki şeyi karşılaştırmak için kullanılır: aynı kadrajda elde edilecek alan derinliği ve sensörün topladığı toplam ışık miktarı. Küçük sensör aynı f değerinde daha az toplam ışık topladığı için aynı baskı boyutunda genellikle daha fazla gren üretir.',
      'Dolayısıyla "APS-C\'de 35 mm f/1,4 almak, tam karede 50 mm f/2 kullanmak gibidir" cümlesi kadraj ve arka plan bulanıklığı için doğrudur; ama enstantane hesaplarken objektifin f/1,4 olduğunu unutmayın.',
    ] },
    { h: 'Türkiye\'de sık karşılaşılan senaryolar', p: [
      'Giriş seviyesi aynasız ve DSLR gövdelerin çoğu APS-C sensörlüdür ve kit olarak 18–55 mm objektifle satılır. Bu objektif 1,5× çarpanla 27–82,5 mm, 1,6× çarpanla 28,8–88 mm aralığını kaplar; yani geniş açıdan kısa teleye uzanan genel amaçlı bir zoom\'dur. Düğün ve mezuniyet çekimleri için "50 mm portre objektifi" alan APS-C kullanıcıları, gerçekte 75–80 mm eşdeğerinde çalıştıklarını ve dar mekânlarda geri çekilecek yer bulamayabileceklerini bu hesapla önceden görebilir.',
      'Kuş ve doğa fotoğrafçıları ise çarpanı avantaja çevirir: 300 mm bir objektif APS-C gövdede 450 mm eşdeğeri kadraj verir. Manzara ve mimari çekenler içinse durum terstir; 16 mm eşdeğeri için APS-C\'de yaklaşık 10–11 mm objektif gerekir.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Çarpanlar yuvarlanmış anma değerleridir; aynı sınıftaki iki sensör arasında yüzde birkaç fark olabilir. Görüş açısı sonsuza odaklanmış, bozulmasız bir objektif varsayımıyla ve 3:2 oranlı tam kare köşegeni üzerinden hesaplanır. Sensörünüzün en-boy oranı farklıysa (örneğin 4:3) yatay ve dikey açılar aynı eşdeğer odakta bile bir miktar değişir. Yakın çekimde odak nefes alması ve balıkgözü objektiflerin izdüşümü bu hesabın dışındadır.',
    ] },
  ],
  faq: [
    ['Crop faktörü odak uzaklığını gerçekten değiştirir mi?', 'Hayır. Odak uzaklığı objektifin optik özelliğidir ve sabittir. Crop faktörü yalnızca sensörün görüntünün ne kadarını kaydettiğini, dolayısıyla görüş açısını değiştirir. Eşdeğer odak uzaklığı bir karşılaştırma değeridir.'],
    ['APS-C için 1,5 mi 1,6 mı seçmeliyim?', 'Bu, gövdenizin üreticisine bağlıdır; sensör genişliği yaklaşık 23,5 mm olanlar 1,5×, yaklaşık 22,3 mm olanlar 1,6× çarpanlıdır. Emin değilseniz kullanım kılavuzundaki sensör boyutuna bakın ya da 36\'yı sensör genişliğine bölün.'],
    ['Crop sensöre özel objektiflerde de çarpan uygulanır mı?', 'Evet. Objektifin üzerindeki odak uzaklığı her zaman gerçek değerdir; APS-C için tasarlanmış 35 mm objektif de tam kare için tasarlanmış 35 mm objektif de APS-C gövdede aynı kadrajı verir. Fark yalnızca görüntü dairesinin büyüklüğündedir.'],
    ['Eşdeğer diyafram ne işe yarar?', 'Farklı sensörlerde aynı kadrajı çekerken elde edeceğiniz alan derinliğini karşılaştırmanızı sağlar. Mikro 4/3\'te f/1,8 ile çekilen kare, arka plan bulanıklığı bakımından tam karede f/3,6 ile çekilene benzer. Pozlama için kullanılmaz.'],
    ['Telekonvertör ya da hız artırıcı adaptörü nasıl hesaba katarım?', 'Önce objektifin odak uzaklığını adaptörün çarpanıyla çarpın: 1,4× telekonvertörle 200 mm, 280 mm olur; 0,71× hız artırıcıyla 50 mm, 35,5 mm olur. Bulduğunuz değeri "odak uzaklığı" alanına yazıp sensörünüzü seçin.'],
    ['Video çekerken çarpan değişir mi?', 'Bazı gövdeler videoda sensörün yalnızca bir bölümünü kullanır ve ek bir kırpma uygular. Bu durumda toplam çarpan, sensör çarpanı ile video kırpma oranının çarpımıdır. Toplam değeri "Özel crop faktörü" alanına yazabilirsiniz.'],
    ['Orta formatta çarpan neden 1\'den küçük?', 'Çünkü sensör tam kareden büyüktür. 0,79× çarpanlı bir gövdede 63 mm objektif yaklaşık 50 mm eşdeğeri görüş açısı verir; yani aynı odak uzaklığı daha geniş görür.'],
    ['Bilgilerim bir yere gönderiliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; girdiğiniz değerler sunucuya iletilmez ve kaydedilmez.'],
  ],
  related: ['kamera-lens-gorus-acisi-hesapla', 'alan-derinligi-hesapla', 'pozlama-hesapla', 'megapiksel-hesapla', 'fotograf-baski-boyutu-hesapla'],
};
