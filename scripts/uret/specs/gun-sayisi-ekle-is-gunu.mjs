export default {
  slug: 'gun-sayisi-ekle-is-gunu',
  title: 'Tarihe İş Günü Ekleme',
  h1Tail: 'hafta sonlarını ve tatilleri atlayarak',
  pageTitle: 'Tarihe İş Günü Ekleme – X İş Günü Sonrası Hangi Tarih?',
  description: 'Bir tarihe iş günü ekleyin ya da çıkarın. Hafta sonları ve yazdığınız tatil günleri atlanır; sonuç tarihi, günü ve geçen takvim günü gösterilir.',
  card: 'Bir tarihten 5, 10 ya da 30 iş günü sonrasını bulun; hafta sonları ve girdiğiniz tatil günleri otomatik atlanır.',
  category: 'zaman',
  keywords: ['tarihe iş günü ekleme', 'iş günü sonrası hangi tarih', '10 iş günü ne zaman', 'iş günü hesaplama', '15 iş günü kaç gün', 'iş günü ekle', 'iş günü geri sayma'],
  lead: 'Bir başlangıç tarihine <strong>iş günü</strong> ekleyerek ya da çıkararak sonuç tarihini bulun. "Kargonuz 5 iş günü içinde teslim edilir", "başvurunuz 15 iş gününde sonuçlanır" gibi sürelerin hangi takvim gününe denk geldiğini hafta sonlarını ve kendi yazdığınız tatilleri atlayarak hesaplar.',
  button: 'Hesapla',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date' },
    { id: 'gun', label: 'Eklenecek iş günü', type: 'number', placeholder: 'Örn. 10', hint: 'Geriye saymak için eksi değer yazın (örn. -5).' },
    { id: 'cumartesi', label: 'Cumartesi', type: 'select', options: [['hayir', 'İş günü değil'], ['evet', 'İş günü sayılsın']] },
    { id: 'tatiller', label: 'Atlanacak tatil günleri (isteğe bağlı)', type: 'textarea', placeholder: '01.05.2026\n19.05.2026', hint: 'Her satıra ya da boşlukla ayırarak GG.AA.YYYY biçiminde bir tarih yazın.', wide: true },
  ],
  compute(v, h) {
    const bas = h.date(v.baslangic, 'Başlangıç tarihi');
    const n = h.int(v.gun, 'Eklenecek iş günü');
    if (n === 0) h.err('"Eklenecek iş günü" sıfır olamaz; ileri saymak için pozitif, geri saymak için negatif bir tam sayı yazın.');
    if (Math.abs(n) > 10000) h.err('"Eklenecek iş günü" en fazla 10.000 olabilir.');
    const cmt = v.cumartesi === 'evet';
    const tatil = new Set();
    for (const p of String(v.tatiller ?? '').split(/[\s,;]+/).filter(Boolean)) tatil.add(h.date(p, 'Atlanacak tatil günleri').getTime());
    const haftaSonu = (d) => { const g = d.getUTCDay(); return g === 0 || (!cmt && g === 6); };
    const yon = n > 0 ? 1 : -1;
    let d = bas, sayilan = 0, hs = 0, tt = 0;
    while (sayilan < Math.abs(n)) {
      d = h.gunEkle(d, yon);
      if (haftaSonu(d)) hs++;
      else if (tatil.has(d.getTime())) tt++;
      else sayilan++;
    }
    const takvim = Math.abs(h.gunFarki(bas, d));
    return {
      rows: [
        ['Sonuç tarihi', `${h.fmtDate(d)} ${h.gunAdi(d)}`],
        ['Başlangıç', `${h.fmtDate(bas)} ${h.gunAdi(bas)}`],
        ['Geçen takvim günü', `${h.fmt(takvim, 0)} gün`],
        ['Atlanan hafta sonu günü', `${h.fmt(hs, 0)} gün`],
        ['Atlanan tatil günü', `${h.fmt(tt, 0)} gün`],
      ],
      note: `Başlangıç günü sayılmaz; sayım ${yon > 0 ? 'ertesi günden ileriye' : 'bir önceki günden geriye'} doğru yapılır. İş günü olarak pazartesi–${cmt ? 'cumartesi' : 'cuma'} alınmıştır. Yalnızca listeye yazdığınız tatiller atlanır.`,
    };
  },
  cases: [
    { in: { baslangic: '02.03.2026', gun: '5', cumartesi: 'hayir' }, out: { 'Sonuç tarihi': '09.03.2026 Pazartesi', 'Başlangıç': '02.03.2026 Pazartesi', 'Geçen takvim günü': '7 gün', 'Atlanan hafta sonu günü': '2 gün', 'Atlanan tatil günü': '0 gün' } },
    { in: { baslangic: '27.04.2026', gun: '5', cumartesi: 'hayir', tatiller: '01.05.2026' }, out: { 'Sonuç tarihi': '05.05.2026 Salı', 'Geçen takvim günü': '8 gün', 'Atlanan hafta sonu günü': '2 gün', 'Atlanan tatil günü': '1 gün' } },
    { in: { baslangic: '06.03.2026', gun: '1', cumartesi: 'hayir' }, out: { 'Sonuç tarihi': '09.03.2026 Pazartesi', 'Geçen takvim günü': '3 gün' } },
    { in: { baslangic: '02.03.2026', gun: '10', cumartesi: 'hayir' }, out: { 'Sonuç tarihi': '16.03.2026 Pazartesi', 'Geçen takvim günü': '14 gün' } },
    { in: { baslangic: '02.03.2026', gun: '5', cumartesi: 'evet' }, out: { 'Sonuç tarihi': '07.03.2026 Cumartesi', 'Atlanan hafta sonu günü': '0 gün' } },
    { in: { baslangic: '09.03.2026', gun: '-5', cumartesi: 'hayir' }, out: { 'Sonuç tarihi': '02.03.2026 Pazartesi', 'Geçen takvim günü': '7 gün' } },
    { in: { baslangic: '07.03.2026', gun: '1', cumartesi: 'hayir' }, out: { 'Sonuç tarihi': '09.03.2026 Pazartesi', 'Atlanan hafta sonu günü': '1 gün' } },
    { in: { baslangic: '02.03.2026', gun: '0', cumartesi: 'hayir' }, error: true },
    { in: { baslangic: '02.03.2026', gun: '2,5', cumartesi: 'hayir' }, error: true },
    { in: { baslangic: '02.03.2026', gun: '5', cumartesi: 'hayir', tatiller: '32.03.2026' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanına sürenin başladığı günü girin (sipariş, başvuru, tebliğ ya da teslim tarihi gibi).',
    '"Eklenecek iş günü" alanına gün sayısını tam sayı olarak yazın. Bir tarihten geriye saymak için sayının başına eksi işareti koyun.',
    'Cumartesi günleri de çalışılıyorsa "Cumartesi" listesinden "İş günü sayılsın" seçeneğini işaretleyin.',
    'Aralığa denk gelen resmî tatil ya da izin günleri varsa bunları tatil kutusuna GG.AA.YYYY biçiminde, her satıra bir tane olacak şekilde yazın.',
    '"Hesapla" düğmesine basın; sonuç tarihini, gününü ve arada kaç takvim günü geçtiğini görün.',
  ],
  sections: [
    { h: 'İş günü ile takvim günü arasındaki fark', p: [
      'Takvim günü, hafta sonu ve tatil ayrımı yapmadan birbirini izleyen her gündür. İş günü ise çalışılan günleri ifade eder; yaygın kullanımda pazartesiden cumaya kadar olan ve resmî tatile denk gelmeyen günlerdir. Bu yüzden "10 iş günü" iki tam hafta, yani en az 14 takvim günü sürer; araya tatil girerse daha da uzar.',
      'Kargo ve teslimat süreleri, banka işlemleri, iade ve cayma süreçleri, başvuru sonuçları ve pek çok sözleşme maddesi iş günü üzerinden tanımlanır. Bu süreleri takvim günü gibi saymak, beklenen tarihi olduğundan erken hesaplamaya yol açar.',
    ] },
    { h: 'Sayım kuralı', p: [
      'Araç, yaygın uygulamaya uygun olarak <strong>başlangıç gününü saymaz</strong>; sayım ertesi günden başlar. Her gün için sırayla bakılır: gün hafta sonuysa atlanır, tatil listenizdeyse atlanır, değilse bir iş günü sayılır. İstenen sayıya ulaşıldığında durulan gün sonuç tarihidir.',
      'Başlangıç tarihi hafta sonuna ya da tatile denk gelse bile kural değişmez: cumartesi günü başlayan 1 iş günlük süre, izleyen pazartesi günü dolar. Negatif değer yazdığınızda aynı sayım geriye doğru yapılır; bu, "teslimden 5 iş günü önce hazır olmalı" gibi geriye planlamalarda işe yarar.',
    ] },
    { h: 'Çözümlü örnek', p: [
      'Başlangıç 2 Mart 2026 Pazartesi, eklenecek süre 5 iş günü olsun. Sayım 3 Mart Salı ile başlar: salı (1), çarşamba (2), perşembe (3), cuma (4). 7 Mart Cumartesi ve 8 Mart Pazar atlanır. 9 Mart Pazartesi beşinci iş günüdür. Sonuç <strong>9 Mart 2026 Pazartesi</strong>; arada 7 takvim günü geçmiş, 2 hafta sonu günü atlanmıştır.',
      'Tatil içeren bir örnek: 27 Nisan 2026 Pazartesi gününe 5 iş günü ekleyelim ve tatil kutusuna 01.05.2026 yazalım. Salı (1), çarşamba (2), perşembe (3) sayılır. 1 Mayıs Cuma tatil olduğu için atlanır, ardından cumartesi ve pazar atlanır. 4 Mayıs Pazartesi (4) ve 5 Mayıs Salı (5) sayılır. Sonuç <strong>5 Mayıs 2026 Salı</strong> olur; tatil yazılmasaydı sonuç 4 Mayıs Pazartesi çıkardı.',
    ] },
    { h: 'Tatil günlerini neden siz yazıyorsunuz?', p: [
      'Resmî tatillerin bir bölümü her yıl aynı tarihtedir, ancak dinî bayramlar Ay takvimine bağlı olduğu için her yıl farklı günlere gelir; arife günlerinde yarım gün uygulaması, idari izinler ve kuruma özel tatiller de değişkendir. Sabit bir listeye güvenmek yanlış sonuç verebileceğinden araç tatilleri sizden alır. Böylece yalnızca kendi durumunuzda geçerli olan günleri, örneğin iş yerinizin yıllık kapanış günlerini ya da kendi izninizi de hesaba katabilirsiniz.',
      'Tarihleri alt alta ya da aralarında boşluk bırakarak yazabilirsiniz. Listeye yazdığınız bir tarih zaten hafta sonuna denk geliyorsa iki kez sayılmaz; yalnızca hafta sonu olarak atlanır. Hesap aralığının dışında kalan tarihler sonucu etkilemez.',
    ] },
    { h: 'Hızlı başvuru: iş günü kaç takvim günü eder?', p: [
      'Araya tatil girmediği ve pazartesi–cuma düzeni geçerli olduğu varsayımıyla, hafta içi bir günde başlayan süreler için yaklaşık karşılıklar şöyledir:',
    ], ul: [
      '<strong>3 iş günü:</strong> 3 ile 5 takvim günü arası (başlangıç gününe bağlı)',
      '<strong>5 iş günü:</strong> 7 takvim günü',
      '<strong>7 iş günü:</strong> 9 ile 11 takvim günü arası',
      '<strong>10 iş günü:</strong> 14 takvim günü',
      '<strong>15 iş günü:</strong> 21 takvim günü',
      '<strong>20 iş günü:</strong> 28 takvim günü',
      '<strong>30 iş günü:</strong> 42 takvim günü',
    ] },
    { h: 'Sık yapılan hatalar', ul: [
      'Başlangıç gününü birinci gün saymak: sonuç bir iş günü erken çıkar. Kurumunuz başlangıç gününü de sayıyorsa gün sayısını bir eksik yazın.',
      'Cuma günü başlayan kısa süreleri takvim günü gibi hesaplamak: cuma günü verilen 1 iş günlük süre pazartesi dolar, cumartesi değil.',
      'Bayram tatilinin tamamını listeye yazmayı unutmak: birkaç gün süren tatillerde her günü ayrı ayrı girin.',
      'Cumartesi çalışılan bir iş yeri için varsayılan ayarı kullanmak: süre gereğinden uzun hesaplanır.',
    ] },
    { h: 'Uyarı', p: [
      'Sonuç bilgilendirme amaçlıdır. Hukuki süreler, vergi ve sigorta bildirimleri, ihale ve itiraz süreleri gibi konularda sürenin hangi gün başladığı, hangi günlerin sayıldığı ve son günün tatile gelmesi hâlinde ne olacağı ilgili mevzuatla belirlenir ve iş günü yerine takvim günü esas alınabilir. Hak kaybına yol açabilecek işlemlerde güncel mevzuatı kontrol edin ya da bir uzmana danışın.',
    ] },
  ],
  faq: [
    ['10 iş günü kaç takvim günü eder?', 'Pazartesi–cuma çalışma düzeninde ve araya tatil girmediğinde 10 iş günü tam iki hafta, yani 14 takvim günü sürer. 2 Mart 2026 Pazartesi gününe 10 iş günü eklendiğinde sonuç 16 Mart 2026 Pazartesi olur.'],
    ['Başlangıç günü sayılıyor mu?', 'Hayır. Sayım başlangıç tarihinin ertesi gününden başlar. Kurumunuz ilk günü de sayıyorsa gün sayısını bir azaltarak yazabilirsiniz.'],
    ['Cuma günü verilen 1 iş günlük süre ne zaman dolar?', 'İzleyen pazartesi günü dolar; çünkü cumartesi ve pazar iş günü sayılmaz. 6 Mart 2026 Cuma için sonuç 9 Mart 2026 Pazartesi çıkar.'],
    ['Resmî tatiller otomatik atlanıyor mu?', 'Hayır. Bayram ve idari izin günleri yıldan yıla değiştiği için araç yalnızca sizin tatil kutusuna yazdığınız tarihleri atlar. Aralığa denk gelen tatilleri GG.AA.YYYY biçiminde ekleyin.'],
    ['Bir tarihten geriye doğru iş günü sayabilir miyim?', 'Evet. Gün sayısını eksi işaretiyle yazın. Örneğin 9 Mart 2026 Pazartesi için -5 yazdığınızda sonuç 2 Mart 2026 Pazartesi olur.'],
    ['Cumartesi iş günü sayılır mı?', 'Bu, kuruma ve işin türüne göre değişir. Araçta varsayılan olarak sayılmaz; cumartesi çalışılan bir düzen için "İş günü sayılsın" seçeneğini işaretleyebilirsiniz. Resmî bir süre hesaplıyorsanız ilgili düzenlemedeki tanıma bakın.'],
    ['İki tarih arasında kaç iş günü olduğunu da hesaplayabilir miyim?', 'Bu araç bir tarihe iş günü ekler. İki tarih arasındaki iş günü sayısını bulmak için sitedeki iş günü hesaplama aracını kullanabilirsiniz.'],
    ['Yazdığım tarihler saklanıyor mu?', 'Hayır. Hesaplama tamamen tarayıcınızda yapılır; tarihler ve tatil listeniz sunucuya gönderilmez, kaydedilmez.'],
  ],
  related: ['is-gunu-hesapla', 'tarih-ekle-cikar', 'vade-tarihi-hesapla', 'ayin-son-gunu', 'hafta-sonu-sayisi-hesapla', 'hangi-gun-hesapla'],
};
