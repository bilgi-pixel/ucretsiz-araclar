export default {
  slug: 'timelapse-hesapla',
  title: 'Timelapse Çekim Aralığı Hesaplama',
  h1Tail: 'aralık, kare sayısı, depolama',
  pageTitle: 'Timelapse Hesaplama – Çekim Aralığı, Kare Sayısı ve Depolama',
  description: 'Timelapse için çekim aralığını hesaplayın: olayın süresini, istediğiniz video uzunluğunu ve kare hızını girin; kare sayısı, hızlanma oranı ve kart alanı çıksın.',
  card: 'Olay süresi ve hedef video uzunluğundan timelapse çekim aralığını, kare sayısını ve gereken kart alanını bulun.',
  category: 'gunluk',
  keywords: ['timelapse hesaplama', 'timelapse çekim aralığı', 'hızlandırılmış çekim', 'intervalometre ayarı', 'timelapse kare sayısı', 'zaman atlamalı video', 'time lapse interval'],
  lead: 'Saatler süren bir gün batımını, inşaatı ya da bulut hareketini kaç saniyede bir fotoğraflamalısınız? Olayın gerçek süresini, bitmiş videonun uzunluğunu ve kare hızını yazın; araç <strong>çekim aralığını</strong>, toplam kare sayısını, hızlanma oranını ve isterseniz gereken depolama alanını hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'olay', label: 'Olayın süresi (dakika)', type: 'number', placeholder: 'Örn. 120' },
    { id: 'video', label: 'Hedef video süresi (saniye)', type: 'number', placeholder: 'Örn. 20' },
    { id: 'fps', label: 'Kare hızı', type: 'select', options: [['25', '25 kare/sn'], ['24', '24 kare/sn'], ['30', '30 kare/sn'], ['50', '50 kare/sn'], ['60', '60 kare/sn']] },
    { id: 'boyut', label: 'Fotoğraf başına dosya boyutu (MB, isteğe bağlı)', type: 'number', placeholder: 'Örn. 25' },
  ],
  compute(v, h) {
    const olayDk = h.pos(v.olay, 'Olayın süresi');
    const videoSn = h.pos(v.video, 'Hedef video süresi');
    const fps = Number(v.fps) || 25;
    const olaySn = olayDk * 60;
    const kare = Math.ceil(videoSn * fps - 1e-9);
    if (kare < 2) h.err('Video en az 2 kare içermeli; hedef video süresini uzatın.');
    const aralik = olaySn / kare;
    if (videoSn >= olaySn) h.err('Hedef video, olayın kendisinden kısa olmalı; aksi halde hızlandırma olmaz.');
    const hiz = olaySn / videoSn;
    const sureYaz = (sn) => {
      const t = Math.round(sn);
      const s = Math.floor(t / 3600), d = Math.floor((t % 3600) / 60), k = t % 60;
      const p = [];
      if (s) p.push(s + ' sa');
      if (d) p.push(d + ' dk');
      if (k || !p.length) p.push(k + ' sn');
      return p.join(' ');
    };
    const rows = [
      ['Çekim aralığı', h.fmt(aralik, 2) + ' sn'],
      ['Toplam kare sayısı', h.fmt(kare, 0) + ' kare'],
      ['Hızlanma oranı', h.fmt(hiz, 1) + '×'],
      ['Çekim süresi', sureYaz(olaySn)],
      ['Dakikada çekilen kare', h.fmt(60 / aralik, 1) + ' kare'],
    ];
    if (String(v.boyut ?? '').trim() !== '') {
      const mb = h.pos(v.boyut, 'Dosya boyutu');
      const toplam = mb * kare;
      rows.push(['Gereken depolama', toplam >= 1000 ? h.fmt(toplam / 1000, 2) + ' GB' : h.fmt(toplam, 0) + ' MB']);
    }
    let note = 'Aralık, olay süresinin kare sayısına bölünmesiyle bulunur. Intervalometreniz yalnızca tam saniye kabul ediyorsa aşağı yuvarlayın.';
    if (aralik < 1) note = 'Aralık 1 saniyenin altında: çoğu makine bu hızda sürekli çekemez. Video çekip kurguda hızlandırmayı ya da hedef videoyu kısaltmayı düşünün.';
    return { rows, note };
  },
  cases: [
    { in: { olay: '120', video: '20', fps: '25' }, out: { 'Çekim aralığı': '14,4 sn', 'Toplam kare sayısı': '500 kare', 'Hızlanma oranı': '360×', 'Çekim süresi': '2 sa' } },
    { in: { olay: '60', video: '10', fps: '30', boyut: '25' }, out: { 'Çekim aralığı': '12 sn', 'Toplam kare sayısı': '300 kare', 'Gereken depolama': '7,5 GB', 'Dakikada çekilen kare': '5 kare' } },
    { in: { olay: '30', video: '15', fps: '24' }, out: { 'Çekim aralığı': '5 sn', 'Toplam kare sayısı': '360 kare', 'Hızlanma oranı': '120×', 'Çekim süresi': '30 dk' } },
    { in: { olay: '480', video: '60', fps: '25' }, out: { 'Çekim aralığı': '19,2 sn', 'Toplam kare sayısı': '1.500 kare', 'Çekim süresi': '8 sa' } },
    { in: { olay: '10', video: '20', fps: '30', boyut: '1,5' }, out: { 'Çekim aralığı': '1 sn', 'Toplam kare sayısı': '600 kare', 'Gereken depolama': '900 MB' } },
    { in: { olay: '90', video: '12', fps: '25' }, out: { 'Çekim aralığı': '18 sn', 'Çekim süresi': '1 sa 30 dk' } },
    { in: { olay: '1', video: '90', fps: '25' }, error: true },
    { in: { olay: '', video: '20', fps: '25' }, error: true },
  ],
  howto: [
    '"Olayın süresi" alanına çekeceğiniz olayın gerçekte kaç dakika süreceğini yazın; iki saatlik gün batımı için 120.',
    '"Hedef video süresi" alanına bitmiş timelapse klibinin kaç saniye olmasını istediğinizi girin.',
    'Videoyu hangi kare hızında dışa aktaracaksanız onu seçin. Türkiye\'de yayın ve çoğu sosyal medya içeriği için 25 kare/sn yaygındır.',
    'Kart alanını da görmek isterseniz tek bir fotoğrafın yaklaşık boyutunu megabayt olarak yazın; makinenizde çektiğiniz bir karenin dosya boyutuna bakabilirsiniz.',
    '"Hesapla" düğmesine basın ve çıkan aralığı intervalometreye ya da makinenin aralıklı çekim menüsüne girin.',
  ],
  sections: [
    { h: 'Timelapse aralığı nasıl hesaplanır?', p: [
      'Timelapse, belirli aralıklarla çekilen fotoğrafların video karesi olarak arka arkaya oynatılmasıdır. Hesabın iki adımı vardır. Önce videonun kaç kareden oluşacağı bulunur: <strong>kare sayısı = video süresi × kare hızı</strong>. Sonra olayın süresi bu sayıya bölünür: <strong>aralık = olay süresi (sn) ÷ kare sayısı</strong>.',
      'Çözümlü örnek: iki saatlik bir gün batımını 20 saniyelik, 25 kare/sn bir klibe sığdırmak istiyorsunuz. Kare sayısı 20 × 25 = 500 olur. Olay 120 dakika, yani 7.200 saniyedir. Aralık 7.200 ÷ 500 = 14,4 saniye çıkar. Gerçekte 7.200 saniye süren olay 20 saniyede izleneceği için hızlanma oranı 7.200 ÷ 20 = 360 kattır. Araç bu örnek için tam olarak bu değerleri verir.',
    ] },
    { h: 'Konuya göre tipik aralıklar', p: [
      'Hesap size matematiksel olarak gereken aralığı verir; ancak sonuç akıcı görünsün diye konunun hızına uygun bir aralık seçmek gerekir. Aşağıdaki değerler timelapse çekenlerin yaygın başlangıç noktalarıdır; kesin kural değildir, ışığa ve kadraja göre ayarlanır.',
    ], ul: [
      '<strong>1–2 saniye:</strong> yürüyen kalabalık, trafik, hızlı hareket eden bulutlar',
      '<strong>2–5 saniye:</strong> gün batımı ve gün doğumu, yavaş bulutlar, şehir manzarası',
      '<strong>10–30 saniye:</strong> gölgelerin hareketi, yıldızlar, gece gökyüzü',
      '<strong>1–5 dakika:</strong> çiçek açması, buzun erimesi, uzun süren etkinlik kurulumları',
      '<strong>5–30 dakika:</strong> inşaat, bitki büyümesi gibi günler ya da haftalar süren işler',
    ] },
    { h: 'Aralık, enstantane ve yazma süresi ilişkisi', p: [
      'Seçtiğiniz aralık, tek bir karenin pozlama süresinden ve makinenin o kareyi karta yazma süresinden uzun olmalıdır. Gece çekiminde 20 saniyelik pozlama kullanıyorsanız aralığı 20 saniyeye ayarlayamazsınız; araya en az birkaç saniye pay bırakmak gerekir. Aksi halde makine kare atlar ve videoda sıçramalar oluşur.',
      'Hareketin kesik kesik değil akıcı görünmesi için enstantaneyi aralığın yaklaşık yarısı kadar uzun tutmak yaygın bir yaklaşımdır. Gündüz bunu yapabilmek için ND filtre gerekir. Ayrıca pozlamayı, odağı ve beyaz dengesini elle sabitlemek, kareler arasında parlaklık titremesini (flicker) azaltır.',
    ] },
    { h: 'Depolama ve pil planlaması', p: [
      'Uzun timelapse çekimlerinde asıl sınır çoğu zaman kart ve pildir. Araç, fotoğraf başına boyutu girdiğinizde toplam alanı hesaplar: 300 kare ve kare başına 25 MB için 300 × 25 = 7.500 MB, yani 7,5 GB gerekir. RAW çekiyorsanız dosyalar JPEG\'in birkaç katı yer tutar; kurguda pozlama ve renk düzeltme payı isteyenler yine de RAW\'ı tercih eder.',
      'Kare sayısı pil ömrünü de belirler. Makinenizin kılavuzunda bir şarjla kaç kare çekebildiği yazar; hesaplanan kare sayısı bu değere yaklaşıyorsa yedek pil ya da harici güç düşünün. Soğuk havada pil kapasitesi belirgin biçimde düşer; kış çekimlerinde bunu hesaba katın.',
    ] },
    { h: 'Kare hızı seçimi', p: [
      'Sinema görünümü için 24, Türkiye ve Avrupa\'daki yayın standardı için 25, bilgisayar ve telefon ekranları için 30 kare/sn yaygındır. Kare hızını yükseltmek aynı video süresi için daha fazla fotoğraf gerektirir ve aralığı kısaltır. 50 ya da 60 kare/sn timelapse nadiren gerekir; kurguda yavaşlatma yapmayı planlıyorsanız anlamlıdır.',
      'Kararsız kaldığınızda gereğinden sık çekmek güvenlidir: fazla kareleri kurguda atlayarak videoyu hızlandırabilirsiniz, ama çekilmemiş kareleri sonradan üretemezsiniz.',
    ] },
    { h: 'Sınırlar ve varsayımlar', p: [
      'Araç kare sayısını yukarı yuvarlar ve aralığı olay süresinin kare sayısına bölümü olarak verir. İlk kare başlangıç anında çekildiği için son kare olayın bitiminden bir aralık önce alınır; bu fark pratikte önemsizdir. Aralık 1 saniyenin altına düşerse araç uyarı notu gösterir, çünkü çoğu fotoğraf makinesi bu hızda uzun süre kesintisiz çekemez; böyle durumlarda normal video çekip kurguda hızlandırmak daha sağlıklıdır. Hedef video olayın kendisinden uzunsa hesap yapılmaz, çünkü bu hızlandırma değil yavaşlatma olur.',
    ] },
  ],
  faq: [
    ['10 saniyelik timelapse için kaç fotoğraf gerekir?', 'Kare hızına bağlıdır: 24 kare/sn için 240, 25 kare/sn için 250, 30 kare/sn için 300 fotoğraf gerekir. Formül video süresi çarpı kare hızıdır.'],
    ['Gün batımı için hangi aralığı seçmeliyim?', 'Çoğu gün batımı için 2–5 saniye iyi sonuç verir. Olayın tamamını belirli bir video süresine sığdırmak istiyorsanız süreleri bu araca girin; çıkan aralık 5 saniyeden çok uzunsa hedef videoyu uzatmayı düşünebilirsiniz.'],
    ['Hızlanma oranı ne demek?', 'Gerçek sürenin video süresine oranıdır. 360× değeri, gerçekte 6 dakika süren bir bölümün videoda 1 saniyede geçtiği anlamına gelir.'],
    ['Intervalometrem ondalıklı saniye kabul etmiyor, ne yapmalıyım?', 'Sonucu aşağı yuvarlayın; örneğin 14,4 yerine 14 saniye girin. Böylece biraz fazla kare çekersiniz ve video hedeflediğinizden kısa kalmaz. Fazla kareleri kurguda kırpabilirsiniz.'],
    ['Telefonla timelapse çekerken bu hesap geçerli mi?', 'Mantık aynıdır. Telefonların otomatik hızlandırılmış çekim modları aralığı kendisi seçer; aralığı elle ayarlayabildiğiniz bir uygulama ya da mod kullanıyorsanız buradaki sonucu girebilirsiniz.'],
    ['Hyperlapse için de kullanılabilir mi?', 'Evet. Hyperlapse, kameranın kareler arasında yer değiştirdiği bir timelapse türüdür; aralık ve kare sayısı hesabı aynıdır. Yalnızca her kare arasında yürüyüp kadrajı hizalayacak kadar zaman bırakmanız gerekir.'],
    ['Dosya boyutunu bilmiyorsam ne yazmalıyım?', 'Bu alan isteğe bağlıdır, boş bırakabilirsiniz. Tahmin için makinenizle aynı ayarda bir kare çekip dosya boyutuna bakın; sahnenin ayrıntısına göre boyut değişeceğinden bir miktar pay ekleyin.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. Hesap tümüyle tarayıcınızda yapılır; hiçbir değer sunucuya gönderilmez ya da kaydedilmez.'],
  ],
  related: ['fotograf-depolama-hesapla', 'zaman-kodu-cevir', 'pozlama-hesapla', 'saniye-sure-cevir', 'megapiksel-hesapla'],
};
