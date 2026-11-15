export default {
  slug: 'sarj-suresi-hesapla',
  title: 'Batarya Şarj Süresi Hesaplama',
  pageTitle: 'Batarya Şarj Süresi Hesaplama – Pil ve Akü Kaç Saatte Dolar?',
  description: 'Batarya, pil ya da akünün kaç saatte dolacağını hesaplayın. Kapasite, şarj akımı, başlangıç ve hedef doluluk ile şarj verimine göre süreyi ve C oranını verir.',
  card: 'Batarya ya da akünüzün kaç saatte dolacağını kapasite, şarj akımı ve doluluk aralığına göre hesaplayın.',
  category: 'elektrik',
  keywords: ['şarj süresi hesaplama', 'batarya kaç saatte dolar', 'akü şarj süresi', 'pil şarj süresi hesaplama', 'mah şarj süresi', 'powerbank kaç saatte dolar', 'c oranı hesaplama'],
  lead: 'Bir bataryanın, pilin ya da akünün belirli bir şarj akımıyla ne kadar sürede dolacağını bulun. Araç kapasiteyi şarj akımına böler, <strong>başlangıç ve hedef doluluk</strong> aralığını ve <strong>şarj verimini</strong> hesaba katar; sonucu saat ve dakika olarak verir.',
  button: 'Hesapla',
  inputs: [
    { id: 'kapasite', label: 'Batarya kapasitesi', type: 'number', placeholder: 'Örn. 5000' },
    { id: 'akim', label: 'Şarj akımı', type: 'number', placeholder: 'Örn. 2000' },
    { id: 'birim', label: 'Birim', type: 'select', options: [['m', 'mAh ve mA'], ['a', 'Ah ve A']] },
    { id: 'bas', label: 'Başlangıç doluluk (%)', type: 'number', value: '0' },
    { id: 'hedef', label: 'Hedef doluluk (%)', type: 'number', value: '100' },
    { id: 'verim', label: 'Şarj verimi (%)', type: 'number', value: '85', hint: 'Şarj sırasında ısıya giden kaybı karşılar. Kayıpsız kuramsal süre için 100 yazın.' },
  ],
  compute(v, h) {
    const kap = h.pos(v.kapasite, 'Batarya kapasitesi');
    const akim = h.pos(v.akim, 'Şarj akımı');
    const bas = h.nonneg(v.bas, 'Başlangıç doluluk');
    const hedef = h.pos(v.hedef, 'Hedef doluluk');
    const verim = h.pos(v.verim, 'Şarj verimi');
    if (hedef > 100) h.err('"Hedef doluluk" yüzde 100\'den büyük olamaz.');
    if (bas >= hedef) h.err('"Hedef doluluk", başlangıç doluluğundan büyük olmalı (örn. başlangıç 20, hedef 80).');
    if (verim > 100) h.err('"Şarj verimi" yüzde 100\'den büyük olamaz.');
    const kb = v.birim === 'a' ? 'Ah' : 'mAh';
    const eksik = kap * (hedef - bas) / 100;
    const saat = eksik / (akim * verim / 100);
    const dk = Math.round(saat * 60);
    const c = akim / kap;
    return {
      rows: [
        ['Şarj süresi', `${Math.floor(dk / 60)} saat ${dk % 60} dakika`],
        ['Süre (ondalık)', h.fmt(saat, 2) + ' saat'],
        ['Doldurulacak kapasite', h.fmt(eksik, 2) + ' ' + kb],
        ['Kayıpsız kuramsal süre', h.fmt(eksik / akim, 2) + ' saat'],
        ['Şarj hızı', h.fmt(c, 3) + ' C'],
      ],
      note: 'Hesap sabit şarj akımı varsayar. Lityum bataryalarda son bölümde akım azaldığı için tam dolum hesaplanandan uzun sürebilir. Üreticinin izin verdiği şarj akımını aşmayın.',
    };
  },
  cases: [
    { in: { kapasite: '5000', akim: '2000', birim: 'm', bas: '0', hedef: '100', verim: '100' }, out: { 'Şarj süresi': '2 saat 30 dakika', 'Süre (ondalık)': '2,5 saat', 'Şarj hızı': '0,4 C' } },
    { in: { kapasite: '60', akim: '6', birim: 'a', bas: '0', hedef: '100', verim: '100' }, out: { 'Şarj süresi': '10 saat 0 dakika', 'Doldurulacak kapasite': '60 Ah', 'Şarj hızı': '0,1 C' } },
    { in: { kapasite: '100', akim: '10', birim: 'a', bas: '50', hedef: '100', verim: '100' }, out: { 'Şarj süresi': '5 saat 0 dakika', 'Doldurulacak kapasite': '50 Ah' } },
    { in: { kapasite: '3000', akim: '1000', birim: 'm', bas: '20', hedef: '80', verim: '90' }, out: { 'Şarj süresi': '2 saat 0 dakika', 'Doldurulacak kapasite': '1.800 mAh', 'Kayıpsız kuramsal süre': '1,8 saat' } },
    { in: { kapasite: '5000', akim: '1000', birim: 'm' }, out: { 'Şarj süresi': '5 saat 53 dakika', 'Süre (ondalık)': '5,88 saat', 'Şarj hızı': '0,2 C' } },
    { in: { kapasite: '4000', akim: '2000', birim: 'm', bas: '0', hedef: '100', verim: '80' }, out: { 'Şarj süresi': '2 saat 30 dakika', 'Kayıpsız kuramsal süre': '2 saat' } },
    { in: { kapasite: '5000', akim: '2000', birim: 'm', bas: '80', hedef: '50', verim: '85' }, error: true },
    { in: { kapasite: '5000', akim: '0', birim: 'm', bas: '0', hedef: '100', verim: '85' }, error: true },
    { in: { kapasite: '5000', akim: '2000', birim: 'm', bas: '0', hedef: '110', verim: '85' }, error: true },
  ],
  howto: [
    'Bataryanın kapasitesini ve şarj cihazının verdiği akımı yazın. İkisini de aynı ölçekte girin ve "Birim" listesinden mAh/mA ya da Ah/A seçin.',
    'Bataryanın şu anki doluluk oranını ve ulaşmak istediğiniz oranı yüzde olarak girin. Tam boştan tam doluya hesap için 0 ve 100 bırakın.',
    'Şarj verimini olduğu gibi bırakın ya da değiştirin; kayıpsız kuramsal süreyi görmek için 100 yazabilirsiniz.',
    '"Hesapla" düğmesine basın. Süre saat-dakika ve ondalık saat olarak, ayrıca doldurulacak kapasite ve şarj hızı (C) gösterilir.',
  ],
  sections: [
    { h: 'Şarj süresi nasıl hesaplanır?', p: [
      'Kapasite, bataryanın depolayabildiği yük miktarıdır ve miliamper-saat (mAh) ya da amper-saat (Ah) ile ölçülür. Şarj akımı ise birim zamanda bataryaya aktarılan yüktür. İkisinin oranı süreyi verir: 2.000 mAh kapasiteli boş bir pili 1.000 mA ile doldurmak kuramsal olarak 2 saat sürer.',
      'Gerçekte şarj edilen enerjinin tamamı bataryada depolanmaz; bir bölümü ısıya dönüşür. Bu kayıp şarj verimi ile ifade edilir ve süreyi uzatır. Ayrıca çoğu zaman batarya tamamen boş değildir ya da yüzde 100\'e kadar doldurulmaz; bu yüzden yalnızca aradaki fark hesaba girer.',
    ], ul: [
      '<strong>Doldurulacak kapasite</strong> = kapasite × (hedef − başlangıç) ÷ 100',
      '<strong>Süre (saat)</strong> = doldurulacak kapasite ÷ (şarj akımı × verim)',
      '<strong>Şarj hızı (C)</strong> = şarj akımı ÷ kapasite',
    ] },
    { h: 'Çözümlü örnekler', p: [
      '<strong>Telefon bataryası:</strong> 5.000 mAh kapasiteli boş bir batarya 2.000 mA ile kayıpsız olarak 5.000 ÷ 2.000 = 2,5 saatte, yani 2 saat 30 dakikada dolar. Şarj hızı 2.000 ÷ 5.000 = 0,4 C\'dir.',
      '<strong>Kısmi şarj:</strong> 3.000 mAh\'lik bataryayı yüzde 20\'den yüzde 80\'e çıkarmak için 3.000 × 0,6 = 1.800 mAh gerekir. 1.000 mA akım ve yüzde 90 verimle süre 1.800 ÷ (1.000 × 0,9) = 2 saattir; kayıpsız kuramsal süre 1,8 saat olurdu.',
      '<strong>Araç aküsü:</strong> 60 Ah\'lik boş bir akü 6 amperlik şarj cihazıyla kuramsal olarak 60 ÷ 6 = 10 saatte dolar; şarj hızı 0,1 C\'dir. Yarı dolu 100 Ah\'lik bir aküyü 10 amperle tamamlamak ise 50 ÷ 10 = 5 saat sürer.',
      '<strong>Varsayılan verimle:</strong> 5.000 mAh, 1.000 mA ve yüzde 85 verimle süre 5.000 ÷ 850 = 5,88 saat, yaklaşık 5 saat 53 dakikadır.',
    ] },
    { h: 'C oranı ne anlatır?', p: [
      'C oranı, şarj ya da deşarj akımının kapasiteye bölümüdür ve bataryanın ne kadar hızlı doldurulduğunu kapasiteden bağımsız olarak ifade eder. 1 C, bataryayı kuramsal olarak bir saatte dolduran akımdır; 0,5 C iki saatte, 0,1 C on saatte doldurur. 2.000 mAh\'lik bir pil için 1 C 2.000 mA, 0,5 C ise 1.000 mA demektir.',
      'Her batarya türünün ve modelinin izin verilen en yüksek şarj hızı farklıdır ve üreticinin teknik föyünde belirtilir. Bu sınırın üzerinde şarj, bataryanın ısınmasına, ömrünün kısalmasına ve güvenlik riskine yol açar. Araçtaki "Şarj hızı" satırını üreticinin önerdiği değerle karşılaştırın.',
    ] },
    { h: 'Hesaplanan süre neden gerçeğinden farklı olabilir?', ul: [
      '<strong>Sabit akım – sabit gerilim aşaması:</strong> Lityum iyon bataryalar önce sabit akımla, belirli bir gerilime ulaştıktan sonra giderek azalan akımla şarj edilir. Bu yüzden son yüzde 10–20\'lik bölüm, öncesine göre çok daha yavaş dolar.',
      '<strong>Şarj cihazının gerçek akımı:</strong> Adaptörün üzerinde yazan değer verebileceği en yüksek akımdır; cihazın çektiği akım kabloya, şarj protokolüne ve sıcaklığa göre daha düşük olabilir.',
      '<strong>Şarj sırasında kullanım:</strong> Telefon şarj olurken kullanılıyorsa akımın bir bölümü bataryaya değil cihaza gider.',
      '<strong>Sıcaklık koruması:</strong> Batarya ısındığında şarj devresi akımı kendiliğinden düşürür.',
      '<strong>Akü tipi:</strong> Kurşun-asit akülerde de son aşama düşük akımla ilerler ve tam dolum kuramsal süreden uzun sürer.',
    ] },
    { h: 'Batarya sağlığı için öneriler', p: [
      'Lityum bataryalar sürekli tam dolu ya da tam boş tutulmaktan hoşlanmaz; gündelik kullanımda orta aralıkta tutmak yıpranmayı azaltır. Birçok telefon ve dizüstü bilgisayarda bu amaçla şarjı belirli bir yüzdede durduran seçenekler bulunur. Araçta hedef doluluğu 80 yazarak bu tür kısmi şarjın ne kadar süreceğini görebilirsiniz.',
      'Kurşun-asit akülerde ise durum terstir: uzun süre yarı boş bekletmek aküye zarar verir, bu yüzden kullanım sonrası tam şarj edilmesi önerilir. Hangi bataryayı kullanıyorsanız kullanın, ona uygun şarj cihazını seçin; farklı kimyalar için tasarlanmış şarj cihazları birbirinin yerine kullanılmamalıdır.',
    ] },
    { h: 'Güvenlik uyarısı', p: [
      'Bu sayfa yalnızca süre tahmini yapar; hangi akımla şarj etmeniz gerektiğini söylemez. Üreticinin izin verdiği şarj akımını ve gerilimini aşmak, hasarlı ya da şişmiş bataryaları şarj etmek yangın riski taşır. Şarj sırasında bataryayı yanıcı malzemelerden uzak tutun ve gözetimsiz bırakmamaya çalışın.',
    ] },
  ],
  faq: [
    ['5000 mAh batarya kaç saatte dolar?', 'Şarj akımına bağlıdır. 2.000 mA ile kayıpsız 2,5 saat, yüzde 85 verimle yaklaşık 2 saat 56 dakika; 1.000 mA ile yüzde 85 verimde yaklaşık 5 saat 53 dakika sürer.'],
    ['Şarj verimi için hangi değeri kullanmalıyım?', 'Varsayılan yüzde 85 genel amaçlı bir kabuldür. Lityum bataryalarda kayıp daha az, kurşun-asit akülerde daha fazladır. Kesin değer bataryanın türüne ve şarj hızına göre değişir.'],
    ['Daha güçlü adaptör şarjı her zaman kısaltır mı?', 'Hayır. Şarj akımını cihazın kendi şarj devresi belirler. Adaptör cihazın kabul ettiğinden fazlasını verebilse bile cihaz yalnızca desteklediği kadarını çeker.'],
    ['Akü şarj süresini de hesaplayabilir miyim?', 'Evet. "Ah ve A" birimini seçip akü kapasitesini ve şarj cihazının akımını yazın. 60 Ah akü 6 amperle kuramsal olarak 10 saatte dolar; gerçekte son aşama nedeniyle biraz daha uzun sürer.'],
    ['Yüzde 80\'den sonra şarj neden yavaşlıyor?', 'Lityum bataryalarda hücre gerilimi üst sınıra yaklaşınca şarj devresi akımı kademeli olarak azaltır. Bu, bataryayı korumak içindir ve hesaplanan sabit akımlı süreye eklenen bir gecikme yaratır.'],
    ['1 C şarj ne demektir?', 'Kapasiteye sayısal olarak eşit akımla şarj demektir. 3.000 mAh\'lik bir batarya için 1 C, 3.000 mA\'dır ve kuramsal olarak bir saatte doldurur.'],
    ['Kapasiteyi mAh, akımı A olarak girebilir miyim?', 'İki değerin aynı ölçekte olması gerekir. Akımı miliampere çevirmek için 1000 ile çarpın: 2 A, 2.000 mA\'dır. Ardından "mAh ve mA" birimini seçin.'],
    ['Girdiğim değerler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; değerler sunucuya gönderilmez.'],
  ],
  related: ['mah-wh-cevir', 'powerbank-sarj-sayisi-hesapla', 'aku-kullanim-suresi-hesapla', 'elektrikli-arac-sarj-maliyeti-hesapla', 'pil-seri-paralel-hesapla'],
};
