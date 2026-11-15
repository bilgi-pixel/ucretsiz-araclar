export default {
  slug: 'ip-kamera-bant-genisligi-hesapla',
  title: 'IP Kamera Bant Genişliği Hesaplama',
  h1Tail: 'çözünürlük, kare hızı ve codec\'e göre',
  pageTitle: 'IP Kamera Bant Genişliği Hesaplama – Kamera Başına Kaç Mbps?',
  description: 'Çözünürlük, kare hızı, sıkıştırma biçimi ve sahne hareketine göre IP kameranın tahmini bit hızını ve tüm kameralar için gereken ağ bant genişliğini hesaplayın.',
  card: 'Çözünürlük, kare hızı ve codec\'e göre IP kameranın tahmini bit hızını ve toplam ağ bant genişliğini bulun.',
  category: 'gunluk',
  keywords: ['ip kamera bant genişliği hesaplama', 'kamera bitrate hesaplama', 'ip kamera kaç mbps', 'kamera upload hızı', 'h265 bitrate hesaplama', 'nvr bant genişliği', 'kamera internet hızı ihtiyacı'],
  lead: 'Bir IP kamera sistemi kurarken ağ anahtarının, kablosuz köprünün ya da uzaktan izleme için internet yükleme hızının yetip yetmeyeceğini bilmek gerekir. Bu araç; çözünürlük, kare hızı, sıkıştırma biçimi ve sahnedeki hareket düzeyinden kamera başına <strong>tahmini bit hızını</strong> ve tüm kameralar için gereken toplam bant genişliğini hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'kamera', label: 'Kamera sayısı', type: 'number', placeholder: 'Örn. 4' },
    { id: 'cozunurluk', label: 'Çözünürlük', type: 'select', options: [['1080', '2 MP – 1920×1080 (Full HD)'], ['720', '1 MP – 1280×720 (HD)'], ['1440', '4 MP – 2560×1440'], ['1944', '5 MP – 2592×1944'], ['2160', '8 MP – 3840×2160 (4K)']] },
    { id: 'fps', label: 'Kare hızı (fps)', type: 'number', value: '15' },
    { id: 'codec', label: 'Sıkıştırma biçimi', type: 'select', options: [['h264', 'H.264'], ['h265', 'H.265 (HEVC)']] },
    { id: 'hareket', label: 'Sahnedeki hareket', type: 'select', options: [['dusuk', 'Düşük (koridor, depo, otopark)'], ['orta', 'Orta (ofis, mağaza içi)'], ['yuksek', 'Yüksek (cadde, kalabalık giriş)']] },
    { id: 'bilinen', label: 'Bilinen bit hızı (Mbps, isteğe bağlı)', type: 'number', placeholder: 'Örn. 4', hint: 'Doldurursanız tahmin yerine bu değer kullanılır' },
    { id: 'pay', label: 'Yedek pay (%)', type: 'number', value: '20' },
  ],
  compute(v, h) {
    const n = h.posint(v.kamera, 'Kamera sayısı');
    const pay = h.nonneg(v.pay, 'Yedek pay');
    const bilinen = h.opt(v.bilinen, 0, 'Bilinen bit hızı');
    if (bilinen < 0) h.err('Bilinen bit hızı negatif olamaz; boş bırakabilir ya da pozitif bir değer yazabilirsiniz.');
    let per, yontem;
    if (bilinen > 0) {
      per = bilinen;
      yontem = 'Girilen bit hızı kullanıldı';
    } else {
      const fps = h.pos(v.fps, 'Kare hızı');
      if (fps > 120) h.err('Kare hızı 120 fps\'den büyük olamaz; güvenlik kameralarında genellikle 10–30 fps kullanılır.');
      const piksel = { 720: 1280 * 720, 1080: 1920 * 1080, 1440: 2560 * 1440, 1944: 2592 * 1944, 2160: 3840 * 2160 }[v.cozunurluk || '1080'];
      if (!piksel) h.err('Listeden bir çözünürlük seçin.');
      const hareket = { dusuk: 1, orta: 2, yuksek: 4 }[v.hareket || 'dusuk'];
      if (!hareket) h.err('Listeden bir hareket düzeyi seçin.');
      const codec = v.codec === 'h265' ? 0.5 : 1;
      per = piksel * fps * hareket * 0.07 * codec / 1e6;
      yontem = 'Tahmin: piksel × fps × hareket katsayısı × 0,07' + (codec < 1 ? ' × 0,5 (H.265)' : '');
    }
    const toplam = per * n;
    const gerekli = toplam * (1 + pay / 100);
    return {
      rows: [
        ['Gereken bant genişliği', h.fmt(gerekli, 2) + ' Mbps'],
        ['Kameraların toplam bit hızı', h.fmt(toplam, 2) + ' Mbps'],
        ['Kamera başına bit hızı', h.fmt(per, 2) + ' Mbps'],
        ['Kamera başına (kbps)', h.fmt(per * 1000, 0) + ' kbps'],
        ['Günlük veri (24 saat)', h.fmt(toplam * 10.8, 2) + ' GB'],
        ['Yöntem', yontem],
      ],
      note: 'Tahmini değerler yaygın bir yaklaşık formüle dayanır; gerçek bit hızı kamera modeline, ayarlara ve sahneye göre değişir. Kesin değer için kameranın ayar ekranındaki bit hızını "Bilinen bit hızı" alanına yazın.',
    };
  },
  cases: [
    { in: { kamera: '1', cozunurluk: '1080', fps: '25', codec: 'h264', hareket: 'dusuk', bilinen: '', pay: '0' }, out: { 'Gereken bant genişliği': '3,63 Mbps', 'Kamera başına bit hızı': '3,63 Mbps', 'Kamera başına (kbps)': '3.629 kbps', 'Günlük veri (24 saat)': '39,19 GB' } },
    { in: { kamera: '4', cozunurluk: '1080', fps: '25', codec: 'h265', hareket: 'orta', bilinen: '', pay: '20' }, out: { 'Gereken bant genişliği': '17,42 Mbps', 'Kameraların toplam bit hızı': '14,52 Mbps', 'Kamera başına bit hızı': '3,63 Mbps' } },
    { in: { kamera: '8', cozunurluk: '1080', fps: '15', codec: 'h264', hareket: 'dusuk', bilinen: '4', pay: '25' }, out: { 'Gereken bant genişliği': '40 Mbps', 'Kameraların toplam bit hızı': '32 Mbps', 'Kamera başına bit hızı': '4 Mbps', 'Kamera başına (kbps)': '4.000 kbps', 'Günlük veri (24 saat)': '345,6 GB', 'Yöntem': 'Girilen bit hızı kullanıldı' } },
    { in: { kamera: '1', cozunurluk: '1440', fps: '20', codec: 'h264', hareket: 'orta', bilinen: '', pay: '0' }, out: { 'Gereken bant genişliği': '10,32 Mbps', 'Kamera başına (kbps)': '10.322 kbps' } },
    { in: { kamera: '2', cozunurluk: '2160', fps: '15', codec: 'h265', hareket: 'dusuk', bilinen: '', pay: '10' }, out: { 'Gereken bant genişliği': '9,58 Mbps', 'Kameraların toplam bit hızı': '8,71 Mbps', 'Kamera başına bit hızı': '4,35 Mbps' } },
    { in: { kamera: '16', cozunurluk: '720', fps: '25', codec: 'h264', hareket: 'dusuk', bilinen: '', pay: '0' }, out: { 'Gereken bant genişliği': '25,8 Mbps', 'Kamera başına bit hızı': '1,61 Mbps' } },
    { in: { kamera: '4', cozunurluk: '1080', fps: '0', codec: 'h264', hareket: 'dusuk', bilinen: '', pay: '20' }, error: true },
    { in: { kamera: '', cozunurluk: '1080', fps: '15', codec: 'h264', hareket: 'dusuk', bilinen: '', pay: '20' }, error: true },
    { in: { kamera: '2,5', cozunurluk: '1080', fps: '15', codec: 'h264', hareket: 'dusuk', bilinen: '', pay: '20' }, error: true },
  ],
  howto: [
    'Aynı ağ hattını ya da internet bağlantısını kullanacak kamera sayısını yazın.',
    'Kameraların çözünürlüğünü, kare hızını ve sıkıştırma biçimini seçin; bu değerler kameranın video ayarlarında yer alır.',
    'Sahnedeki hareket düzeyini seçin: neredeyse hiç değişmeyen görüntü için düşük, sürekli insan ya da araç geçen yerler için yüksek.',
    'Kameranızın gerçek bit hızını biliyorsanız "Bilinen bit hızı" alanına yazın; bu durumda tahmin yerine bu değer kullanılır.',
    'Yedek payı belirleyip "Hesapla" düğmesine basın ve gereken bant genişliğini ağ donanımınızın ya da internet yükleme hızınızın kapasitesiyle karşılaştırın.',
  ],
  sections: [
    { h: 'Bit hızı ve bant genişliği ilişkisi', p: [
      'IP kamera görüntüyü sıkıştırıp ağ üzerinden sürekli bir veri akışı olarak gönderir. Bu akışın saniyedeki büyüklüğüne bit hızı (bitrate) denir ve megabit/saniye ile ölçülür. Ağın taşıması gereken yük, kameraların bit hızlarının toplamıdır. Kayıt cihazına giden hat, kablosuz köprü, ağ anahtarının yukarı bağlantı portu ya da uzaktan izleme için kullanılan internet hattı bu toplamı kaldıramazsa görüntü donar, kareler atlanır ya da kayıtta boşluklar oluşur.',
      'Toplam şu şekilde bulunur: <strong>gereken bant genişliği = kamera sayısı × kamera başına bit hızı × (1 + yedek pay)</strong>. Zor olan kısım kamera başına bit hızını bilmektir; araç bunu ya sizden doğrudan alır ya da aşağıdaki yöntemle tahmin eder.',
    ] },
    { h: 'Tahmin yöntemi', p: [
      'Sıkıştırılmış videonun bit hızı için yaygın kullanılan kaba bir kural vardır: <strong>bit hızı (bit/sn) = piksel sayısı × kare hızı × hareket katsayısı × 0,07</strong>. Hareket katsayısı düşük hareketli sahnelerde 1, orta düzeyde 2, yüksek hareketli sahnelerde 4 alınır. Bu kural H.264 için geçerlidir; H.265 benzer kalitede kabaca yarı bit hızıyla çalışabildiğinden araç H.265 seçildiğinde sonucu 0,5 ile çarpar.',
      'Çözümlü örnek: 1920×1080 çözünürlükte 2.073.600 piksel vardır. Saniyede 25 kare, H.264 ve düşük hareket için 2.073.600 × 25 × 1 × 0,07 = 3.628.800 bit/sn, yani yaklaşık 3,63 Mbps bulunur. Aynı kamera orta hareketli bir sahnede 7,26 Mbps\'ye çıkar; H.265 ile bu değer yeniden 3,63 Mbps\'ye iner. Böyle dört kamera toplam 14,52 Mbps üretir ve yüzde 20 payla 17,42 Mbps\'lik kapasite gerekir.',
      'Bu bir yaklaşımdır. Üreticilerin önerdiği değerler, kameranın görüntü işleme kalitesi, akıllı sıkıştırma özellikleri ve seçilen kalite düzeyi sonucu belirgin biçimde değiştirebilir. Elinizde kameranın kendisi varsa ayar ekranındaki bit hızını kullanmak her zaman daha doğrudur.',
    ] },
    { h: 'Bit hızını etkileyen ayarlar', ul: [
      '<strong>Çözünürlük:</strong> Piksel sayısı arttıkça veri artar. 4K görüntü, Full HD\'nin dört katı piksel içerir.',
      '<strong>Kare hızı:</strong> Saniyede 25 kare yerine 12–15 kare kullanmak bit hızını önemli ölçüde düşürür; çoğu güvenlik kaydı için bu akıcılık yeterlidir.',
      '<strong>Sıkıştırma biçimi:</strong> H.265 ve üreticilere özgü geliştirilmiş kipler aynı kaliteyi daha az veriyle taşır; kayıt cihazının da aynı biçimi desteklemesi gerekir.',
      '<strong>Sabit ya da değişken bit hızı:</strong> Sabit kipte kamera her zaman ayarlanan değeri gönderir. Değişken kipte ayarlanan değer üst sınırdır ve sakin sahnelerde akış küçülür.',
      '<strong>Anahtar kare aralığı:</strong> Tam karelerin sıklığı arttıkça veri miktarı da artar.',
      '<strong>Işık koşulları:</strong> Düşük ışıkta oluşan kumlanma, sıkıştırmayı zorlaştırarak gece bit hızını yükseltebilir.',
    ] },
    { h: 'Ana akım, alt akım ve uzaktan izleme', p: [
      'IP kameraların çoğu aynı anda iki akış üretir: kayıt için yüksek çözünürlüklü ana akım ve canlı izleme ile mobil uygulama için düşük çözünürlüklü alt akım. Yerel ağda kayıt cihazına giden yük ana akımların toplamıdır. Telefondan uzaktan izlerken ise çoğunlukla alt akım kullanılır ve internet hattının <strong>yükleme (upload)</strong> yönü devreye girer. Ev ve küçük iş yeri aboneliklerinde yükleme hızı indirme hızından çok daha düşük olduğundan, uzaktan izlemede takılma yaşanıyorsa ilk bakılacak yer burasıdır.',
      'Uzaktan izleme ihtiyacını hesaplamak için aynı anda izlenecek kamera sayısını ve alt akımın bit hızını "Bilinen bit hızı" alanına yazarak aracı ayrıca çalıştırabilirsiniz. Kayıtların bulutta tutulduğu sistemlerde ise tüm kameraların kayıt akışı sürekli olarak internete yüklenir; bu durumda toplam değer doğrudan yükleme hızınızla karşılaştırılmalıdır.',
    ] },
    { h: 'Ağ donanımı açısından değerlendirme', p: [
      'Hesaplanan değer, o hattan geçecek sürekli yüktür. 100 Mbps\'lik bir port üzerinde 70–80 Mbps\'lik sürekli kamera trafiği kâğıt üzerinde sığsa da anlık dalgalanmalara yer bırakmaz; kamera sayısı arttıkça kayıt cihazına giden yukarı bağlantının gigabit olması tercih edilir. Kablosuz köprülerde kutunun üzerindeki hız değil, sahadaki gerçek aktarım hızı esas alınmalıdır; mesafe, engeller ve parazit bu değeri çok düşürebilir. Yedek pay tam olarak bu belirsizlikler için vardır.',
      'Kameraların bit hızı aynı zamanda disk ihtiyacını belirler: sonuçtaki "Günlük veri" satırı, tüm kameraların 24 saatlik sürekli kayıtta üreteceği yaklaşık veri miktarını gösterir. Saklama süresine göre disk boyutunu belirlemek için güvenlik kamerası depolama aracını kullanabilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Araç tüm kameraların aynı ayarlarda olduğunu varsayar. Farklı çözünürlükte kameralarınız varsa her grubu ayrı hesaplayıp sonuçları toplayın. Ses akışı, kameranın yönetim trafiği ve ağ protokollerinin ek yükü hesaba dâhil değildir; bunlar toplamın küçük bir bölümüdür ve yedek pay içinde karşılanır. Sonuçlar planlama amaçlı tahminlerdir; büyük sistemlerde üreticinin tasarım araçlarını ve bir ağ uzmanının görüşünü esas alın.',
    ] },
  ],
  faq: [
    ['Bir IP kamera kaç Mbps kullanır?', 'Ayarlara göre çok değişir. Tahmin formülüne göre Full HD, 25 fps, H.264 ve düşük hareketli bir sahnede yaklaşık 3,6 Mbps; aynı kamera H.265 ile yaklaşık 1,8 Mbps kullanır. 4K kameralarda değer birkaç katına çıkar.'],
    ['8 kamera için ne kadar bant genişliği gerekir?', 'Kamera başına 4 Mbps kabul edilirse toplam 32 Mbps, yüzde 25 payla 40 Mbps gerekir. Kendi kameralarınızın bit hızını yazarak kesin değeri bulabilirsiniz.'],
    ['Uzaktan izleme için indirme mi yükleme mi önemli?', 'Kameraların bulunduğu yerdeki hattın yükleme hızı önemlidir, çünkü görüntü oradan internete gönderilir. İzleyen tarafta ise indirme hızı kullanılır.'],
    ['H.265 gerçekten yarı yarıya tasarruf sağlar mı?', 'Benzer görüntü kalitesinde kabaca yarıya yakın tasarruf yaygın bir kabuldür, ancak gerçek kazanç kameraya ve sahneye göre değişir. Hem kameranın hem kayıt cihazının H.265 desteklemesi gerekir.'],
    ['Kare hızını düşürmek görüntü kalitesini bozar mı?', 'Tek tek karelerin netliği değişmez; yalnızca hareket daha az akıcı görünür. Saniyede 12–15 kare çoğu güvenlik uygulamasında yeterlidir, plaka okuma ya da hızlı hareketin izlenmesi gibi işlerde daha yüksek değer gerekebilir.'],
    ['Değişken bit hızında hangi değeri yazmalıyım?', 'Ağ kapasitesini planlarken ayarlanan üst sınırı yazın; böylece en yoğun anda da hattın yeteceğinden emin olursunuz. Ortalama kullanım bundan düşük kalacaktır.'],
    ['Tahmin ile kameramın gösterdiği değer neden farklı?', 'Formül genel bir yaklaşımdır; üreticiler farklı sıkıştırma ayarları ve akıllı kodlama teknikleri kullanır. Fark olduğunda kameranın kendi değeri geçerlidir; onu "Bilinen bit hızı" alanına yazın.'],
    ['Girdiğim bilgiler kaydediliyor mu?', 'Hayır. Hesaplama tarayıcınızda yapılır; kamera sayısı ve ayar bilgileri sunucuya gönderilmez.'],
  ],
  related: ['guvenlik-kamerasi-depolama-hesapla', 'bant-genisligi-hesapla', 'poe-guc-butcesi-hesapla', 'raid-kapasite-hesapla', 'ip-alt-ag-hesapla'],
};
