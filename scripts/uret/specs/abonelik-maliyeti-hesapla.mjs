export default {
  slug: 'abonelik-maliyeti-hesapla',
  title: 'Abonelik Yıllık Maliyeti Hesaplama',
  h1Tail: 'tüm abonelikleriniz yılda ne tutuyor?',
  pageTitle: 'Abonelik Yıllık Maliyeti Hesaplama – Aylık Üyelikler Yılda Ne Eder?',
  description: 'Dizi, müzik, oyun, bulut ve spor salonu gibi aboneliklerinizi listeleyin; yıllık toplamı, aylık ve günlük ortalamayı ve en pahalı kalemi anında görün.',
  card: 'Aboneliklerinizi alt alta yazın; aylık, yıllık ve çok yıllık toplam maliyeti ve her kalemin payını görün.',
  category: 'gunluk',
  keywords: ['abonelik maliyeti hesaplama', 'aylık abonelikler yıllık ne kadar', 'abonelik takibi', 'dijital abonelik gideri', 'üyelik ücreti hesaplama', 'yıllık abonelik toplamı', 'abonelik bütçesi'],
  lead: 'Tek tek bakıldığında küçük görünen aylık ödemeler bir araya geldiğinde ciddi bir yıllık gidere dönüşür. Aboneliklerinizi satır satır yazın; araç hepsini <strong>yıllık tutara</strong> çevirip toplasın, aylık ve günlük ortalamayı çıkarsın ve bütçenizde en çok yer tutan kalemi göstersin.',
  button: 'Hesapla',
  inputs: [
    { id: 'liste', label: 'Abonelikler (her satıra bir tane)', type: 'textarea', wide: true, placeholder: 'Dizi platformu; 230\nMüzik; 60\nBulut depolama; 480; yıllık', hint: 'Biçim: Ad; tutar; dönem. Dönem yazılmazsa aylık kabul edilir. Dönem: aylık, yıllık ya da haftalık.' },
    { id: 'yil', label: 'Kaç yıllık toplam görülsün?', type: 'number', value: '5' },
  ],
  compute(v, h) {
    const satirlar = h.lines(v.liste);
    if (!satirlar.length) h.err('En az bir abonelik yazın. Örnek: Müzik; 60');
    if (satirlar.length > 100) h.err('En fazla 100 satır girebilirsiniz.');
    const yil = h.posint(v.yil === '' ? '5' : v.yil, 'Yıl sayısı');
    if (yil > 50) h.err('"Yıl sayısı" en fazla 50 olabilir.');
    const kalemler = satirlar.map((s, i) => {
      const p = s.split(';').map((x) => x.trim());
      if (p.length < 2 || p[0] === '' || p[1] === '') h.err(`${i + 1}. satır anlaşılamadı. Biçim: Ad; tutar; dönem (örn. Müzik; 60; aylık).`);
      const tutar = h.nonneg(p[1], `${i + 1}. satırdaki tutar`);
      const d = (p[2] || 'aylık').toLocaleLowerCase('tr');
      let kat;
      if (d.startsWith('ay')) kat = 12;
      else if (d.startsWith('y')) kat = 1;
      else if (d.startsWith('h')) kat = 52;
      else h.err(`${i + 1}. satırdaki dönem "${p[2]}" tanınmadı. aylık, yıllık ya da haftalık yazın.`);
      return { ad: p[0], yillik: tutar * kat };
    });
    const toplam = kalemler.reduce((a, k) => a + k.yillik, 0);
    const sirali = kalemler.slice().sort((a, b) => b.yillik - a.yillik);
    const enPahali = sirali[0];
    const text = sirali.map((k) => `${k.ad}: ${h.para(k.yillik)}/yıl (aylık ${h.para(k.yillik / 12)}, pay %${h.fmt(toplam > 0 ? k.yillik / toplam * 100 : 0, 1)})`).join('\n');
    return {
      rows: [
        ['Yıllık toplam', h.para(toplam)],
        ['Aylık ortalama', h.para(toplam / 12)],
        ['Günlük ortalama', h.para(toplam / 365)],
        ['Abonelik sayısı', `${kalemler.length} abonelik`],
        ['En pahalı abonelik', `${enPahali.ad} (${h.para(enPahali.yillik)}/yıl)`],
        ['Seçilen sürede toplam', `${h.para(toplam * yil)} (${yil} yıl)`],
      ],
      text,
      note: 'Haftalık ödemeler 52, aylık ödemeler 12 ile çarpılarak yıllığa çevrilir. Çok yıllık toplam, fiyatların hiç değişmediği varsayımıyla hesaplanır; zam geldikçe gerçek tutar daha yüksek olur.',
    };
  },
  cases: [
    { in: { liste: 'Dizi platformu; 230\nMüzik; 60\nBulut depolama; 480; yıllık', yil: '5' }, out: { 'Yıllık toplam': '3.960,00 TL', 'Aylık ortalama': '330,00 TL', 'Günlük ortalama': '10,85 TL', 'Abonelik sayısı': '3 abonelik', 'En pahalı abonelik': 'Dizi platformu (2.760,00 TL/yıl)', 'Seçilen sürede toplam': '19.800,00 TL (5 yıl)' } },
    { in: { liste: 'Spor salonu; 1500', yil: '5' }, out: { 'Yıllık toplam': '18.000,00 TL', 'Aylık ortalama': '1.500,00 TL', 'Günlük ortalama': '49,32 TL' }, text: 'Spor salonu: 18.000,00 TL/yıl (aylık 1.500,00 TL, pay %100)' },
    { in: { liste: 'Dergi; 50; haftalık', yil: '1' }, out: { 'Yıllık toplam': '2.600,00 TL', 'Aylık ortalama': '216,67 TL', 'Seçilen sürede toplam': '2.600,00 TL (1 yıl)' } },
    { in: { liste: 'A; 99,90\nB; 149,90; Aylık', yil: '2' }, out: { 'Yıllık toplam': '2.997,60 TL', 'Aylık ortalama': '249,80 TL', 'En pahalı abonelik': 'B (1.798,80 TL/yıl)', 'Seçilen sürede toplam': '5.995,20 TL (2 yıl)' } },
    { in: { liste: 'Oyun üyeliği; 1200; yıllık\n\nMüzik; 90; aylık', yil: '1' }, out: { 'Yıllık toplam': '2.280,00 TL', 'Aylık ortalama': '190,00 TL', 'Abonelik sayısı': '2 abonelik', 'En pahalı abonelik': 'Oyun üyeliği (1.200,00 TL/yıl)' } },
    { in: { liste: '' }, error: true },
    { in: { liste: 'Müzik' }, error: true },
    { in: { liste: 'Müzik; 60; günlük' }, error: true },
  ],
  howto: [
    'Banka ya da kredi kartı ekstrenizi açın ve düzenli olarak tekrarlayan ödemeleri bulun.',
    'Her aboneliği ayrı bir satıra "Ad; tutar" biçiminde yazın. Yıllık ya da haftalık ödenenlerin sonuna noktalı virgülle dönemi ekleyin.',
    'Kaç yıllık toplam görmek istediğinizi belirleyin; varsayılan değer 5 yıldır.',
    '"Hesapla" düğmesine basın. Toplamlar üstte, her aboneliğin yıllık tutarı ve toplam içindeki payı büyükten küçüğe sıralı biçimde altta görünür.',
    'Listeyi gözden geçirin; kullanmadığınız ya da payı beklediğinizden yüksek çıkan kalemleri iptal etmeyi ya da daha uygun pakete geçmeyi değerlendirin.',
  ],
  sections: [
    { h: 'Hesap nasıl yapılıyor?', p: [
      'Farklı dönemlerde ödenen abonelikleri karşılaştırabilmek için hepsi önce yıllık tutara çevrilir. Aylık ödemeler 12 ile, haftalık ödemeler 52 ile çarpılır; yıllık ödemeler olduğu gibi alınır. <strong>Yıllık toplam</strong> bu değerlerin toplamıdır. Aylık ortalama yıllık toplamın 12\'ye, günlük ortalama 365\'e bölünmesiyle bulunur.',
      'Her kalemin payı, o kalemin yıllık tutarının toplama oranıdır. Liste büyükten küçüğe sıralandığı için tasarruf edilebilecek en büyük kalemi ilk satırda görürsünüz.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Aylık 230 TL\'lik bir dizi platformu, aylık 60 TL\'lik bir müzik üyeliği ve yılda bir kez 480 TL ödenen bir bulut depolama paketi olsun. Dizi platformu 230 × 12 = 2.760 TL, müzik 60 × 12 = 720 TL, bulut depolama 480 TL eder. Yıllık toplam 2.760 + 720 + 480 = <strong>3.960 TL</strong>\'dir.',
      'Bu tutar ayda ortalama 330 TL\'ye, günde yaklaşık 10,85 TL\'ye denk gelir. Fiyatlar hiç değişmese bile beş yılda 19.800 TL ödenir. En büyük kalem dizi platformudur ve toplamın yaklaşık yüzde 69,7\'sini oluşturur; yani bu örnekte tasarruf aranacak ilk yer orasıdır.',
    ] },
    { h: 'Hangi ödemeler abonelik sayılır?', p: [
      'Otomatik yenilenen ve siz iptal etmedikçe kartınızdan çekilmeye devam eden her ödeme bu listeye girebilir. Çoğu zaman akla ilk gelen birkaç dijital servistir, ama ekstre dikkatle tarandığında liste uzar:',
    ], ul: [
      'Dizi, film, spor yayını ve müzik platformları',
      'Oyun üyelikleri ve oyun içi sezonluk paketler',
      'Bulut depolama, e-posta ve ofis yazılımı paketleri',
      'Telefon uygulamalarının "premium" sürümleri (fotoğraf düzenleme, meditasyon, dil öğrenme, not alma)',
      'Spor salonu, yüzme havuzu ve kurs üyelikleri',
      'Gazete, dergi ve dijital yayın abonelikleri',
      'Alışveriş sitelerinin ücretsiz kargo ve ayrıcalık üyelikleri',
      'Alan adı, barındırma ve güvenlik yazılımı yenilemeleri',
      'Kredi kartı aidatı ve ek hizmet paketleri',
    ] },
    { h: 'Abonelikler neden fark edilmeden büyür?', p: [
      'Aylık tutarlar tek başına küçük olduğu için kararı kolaylaştırır; "ayda bir kahve parası" benzetmesi bunun en bilinen örneğidir. Ancak ödeme otomatik olduğundan her ay yeniden karar vermezsiniz ve kullanmayı bıraktığınız bir servis aylarca çekilmeye devam edebilir. Ücretsiz deneme süresi bittiğinde ücretli plana geçen üyelikler de bu listenin sessiz kalemleridir.',
      'İkinci etken fiyat artışlarıdır. Servisler fiyat güncellemesini çoğu zaman e-postayla duyurur ve bu bildirimler gözden kaçar. Yılda bir kez bu aracı güncel fiyatlarla doldurmak, bir önceki yılla arasındaki farkı net biçimde ortaya koyar.',
    ] },
    { h: 'Tasarruf için pratik yöntemler', ul: [
      '<strong>Son üç ayda kullandınız mı?</strong> Yanıt hayırsa iptal edin; gerektiğinde yeniden abone olmak birkaç dakika sürer.',
      '<strong>Dönüşümlü kullanım:</strong> İzlemek istediğiniz içerik bittiğinde bir platformu kapatıp diğerini açmak, hepsini aynı anda ödemekten ucuzdur.',
      '<strong>Yıllık plan:</strong> Uzun süre kullanacağınızdan emin olduğunuz servislerde yıllık ödeme genellikle aylık ödemeden daha uygundur; iki seçeneği bu araçta ayrı satırlar olarak yazıp farkı görebilirsiniz.',
      '<strong>Aile ya da paylaşımlı paketler:</strong> Servisin kullanım koşulları izin veriyorsa kişi başı maliyeti düşürür.',
      '<strong>Yenileme tarihlerini not edin:</strong> Yıllık yenilemelerden birkaç gün önce hatırlatıcı kurmak, istemediğiniz bir yılı daha ödemenizi önler.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç fiyat artışlarını, kur farkını, vergileri ve kampanya dönemlerini bilmez; yazdığınız tutarı sabit kabul eder. Dövizle fiyatlanan abonelikler için ekstrenizde gördüğünüz TL tutarını yazmanız en doğru sonucu verir. Çok yıllık toplam bir tahmin değil, "fiyatlar hiç değişmeseydi" senaryosudur ve gerçekte ödeyeceğiniz tutarın alt sınırı olarak düşünülmelidir. Sonuçlar bilgilendirme amaçlıdır; mali bir tavsiye niteliği taşımaz.',
    ] },
  ],
  faq: [
    ['Aylık 100 TL\'lik abonelik yılda ne kadar eder?', '1.200 TL eder. Beş yıl boyunca aynı fiyatla devam etse 6.000 TL\'ye ulaşır. Günlük karşılığı yaklaşık 3,29 TL\'dir.'],
    ['Listeyi hangi biçimde yazmalıyım?', 'Her satıra bir abonelik gelecek şekilde "Ad; tutar; dönem" yazın. Dönem kısmı isteğe bağlıdır; yazmazsanız aylık kabul edilir. Örnek: "Bulut depolama; 480; yıllık".'],
    ['Neden virgül yerine noktalı virgül kullanılıyor?', 'Türkçede virgül ondalık ayırıcıdır. 99,90 gibi kuruşlu tutarların doğru okunabilmesi için alanlar noktalı virgülle ayrılır.'],
    ['Üç ayda bir ödenen bir üyeliği nasıl girerim?', 'Tutarı üçe bölüp aylık olarak ya da dört ile çarpıp yıllık olarak yazabilirsiniz. Üç ayda bir 600 TL ödeniyorsa "Üyelik; 2400; yıllık" satırı doğru sonucu verir.'],
    ['Günlük ortalama neye yarar?', 'Abonelik yükünü gündelik harcamalarla kıyaslamayı kolaylaştırır. Günde 10,85 TL gibi bir rakam, toplam giderin her gün cebinizden çıkan karşılığıdır.'],
    ['Aynı aboneliğin aylık ve yıllık planını nasıl karşılaştırırım?', 'Önce yalnızca aylık planı yazıp yıllık toplamına bakın, sonra aynı satırı yıllık plan fiyatıyla değiştirin. İki yıllık toplam arasındaki fark, yıllık planın size sağlayacağı tasarruftur.'],
    ['En fazla kaç satır girebilirim?', 'Tek seferde 100 satıra kadar abonelik girebilirsiniz; bu sınır kişisel kullanım için fazlasıyla yeterlidir.'],
    ['Abonelik listem bir yere kaydediliyor mu?', 'Hayır. Yazdıklarınız yalnızca tarayıcınızda işlenir; sunucuya gönderilmez ve saklanmaz. Sayfayı kapattığınızda liste silinir, bu yüzden saklamak isterseniz sonucu kopyalayın.'],
  ],
  related: ['kucuk-harcama-yillik-hesapla', 'calisma-saati-fiyat-hesapla', 'birikim-hesapla', 'yuzde-hesapla', 'harclik-plani-hesapla'],
};
