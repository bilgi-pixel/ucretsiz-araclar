export default {
  slug: 'ev-temizlik-cizelgesi',
  title: 'Ev Temizlik Çizelgesi Oluşturma',
  h1Tail: 'yazdırılabilir PDF iş bölümü tablosu',
  pageTitle: 'Ev Temizlik Çizelgesi Oluştur – Haftalık Temizlik Planı PDF',
  description: 'Günlük ve haftalık ev işlerini onay kutularıyla gösteren temizlik çizelgesini PDF olarak oluşturun. Kendi işlerinizi yazın; A4 ya da A5, 1–12 hafta.',
  card: 'Günlük işler için yedi günlük onay kutuları, haftalık işler için sorumlu ve gün sütunları olan ev temizlik çizelgesini PDF yapın.',
  category: 'planlama',
  pdf: true,
  keywords: ['ev temizlik çizelgesi', 'temizlik planı', 'haftalık temizlik çizelgesi', 'ev işleri çizelgesi pdf', 'temizlik takip listesi', 'ev işi paylaşım tablosu', 'yazdırılabilir temizlik planı', 'günlük temizlik listesi'],
  lead: 'Evdeki günlük ve haftalık işleri tek sayfada toplayan bir <strong>ev temizlik çizelgesi</strong> oluşturun. Günlük işlerin karşısında haftanın yedi günü için onay kutuları, haftalık işlerin karşısında sorumlu kişi ve gün sütunları bulunur; iş listesini kendi evinize göre yazabilirsiniz.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç tarihi', type: 'date', hint: 'Boş bırakırsanız bu hafta kullanılır. Çizelge seçtiğiniz günün haftasının pazartesisinden başlar.' },
    { id: 'hafta', label: 'Hafta sayısı', type: 'number', value: '4', hint: '1 ile 12 arasında. Her hafta bir sayfadır.' },
    { id: 'gunluk', label: 'Günlük işler (isteğe bağlı)', type: 'textarea', placeholder: 'Yatakları toplamak\nBulaşıkları yıkamak\nÇöpü çıkarmak', hint: 'Her satıra bir iş; en fazla 12 iş, en fazla 30 karakter. Boş bırakırsanız sekiz hazır iş kullanılır.', wide: true },
    { id: 'haftalik', label: 'Haftalık işler (isteğe bağlı)', type: 'textarea', placeholder: 'Banyoyu ovmak\nToz almak\nYerleri silmek', hint: 'Her satıra bir iş; en fazla 12 iş, en fazla 30 karakter. Boş bırakırsanız sekiz hazır iş kullanılır.', wide: true },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Bizim Evin İş Planı', hint: 'En fazla 30 karakter.', wide: true },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç tarihi');
    const n = h.posint(v.hafta, 'Hafta sayısı');
    if (n > 12) h.err('Hafta sayısı en fazla 12 olabilir; daha uzun dönem için başlangıç tarihini ilerletip aracı yeniden çalıştırın.');
    const baslik = (v.baslik || '').trim() || 'Ev Temizlik Çizelgesi';
    if (baslik.length > 30) h.err('Sayfa başlığı en fazla 30 karakter olabilir.');
    let gun = h.lines(v.gunluk), haf = h.lines(v.haftalik);
    if (!gun.length) gun = ['Yatakları toplamak', 'Bulaşıkları yıkamak', 'Tezgâh ve ocağı silmek', 'Çöpü çıkarmak', 'Yerleri süpürmek', 'Çamaşır yıkamak ya da katlamak', 'Lavabo ve aynayı silmek', 'Ortalığı toplamak'];
    if (!haf.length) haf = ['Çarşafları değiştirmek', 'Banyo ve tuvaleti ovmak', 'Toz almak', 'Yerleri silmek', 'Buzdolabını gözden geçirmek', 'Cam ve aynaları silmek', 'Halıları süpürmek', 'Çöp kovalarını yıkamak'];
    if (gun.length > 12) h.err('En fazla 12 günlük iş yazabilirsiniz; benzer işleri tek satırda birleştirin.');
    if (haf.length > 12) h.err('En fazla 12 haftalık iş yazabilirsiniz; benzer işleri tek satırda birleştirin.');
    if ([...gun, ...haf].some((s) => s.length > 30)) h.err('İş adları en fazla 30 karakter olabilir; uzun satırı kısaltın.');
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, m = a5 ? 9 : 12;
    const hh = a5 ? 8 : 9, ara = a5 ? 4 : 5, pt = a5 ? 8 : 9.5, kare = a5 ? 3 : 3.6;
    const ust = m + 15, tw = W - 2 * m, iw = tw * 0.44, gw = (tw - iw) / 7;
    const rh = Math.min(8.5, (H - m - ust - 2 * hh - ara) / (gun.length + haf.length));
    const pzt = h.gunEkle(ilk, -((ilk.getUTCDay() + 6) % 7));
    const KISA = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const b = h.gunEkle(pzt, i * 7), ops = [];
      ops.push(['yazi', baslik, m, m + 7, a5 ? 14 : 18, { kalin: true }]);
      ops.push(['yazi', `${h.fmtDate(b)} – ${h.fmtDate(h.gunEkle(b, 6))}`, W - m, m + 7, a5 ? 8.5 : 10, { hiza: 'sag', ton: 0.35 }]);
      ops.push(['cizgi', m, m + 10.5, W - m, m + 10.5, { kalinlik: 0.6, ton: 0.2 }]);
      // Günlük işler tablosu
      let y = ust;
      ops.push(['kutu', m, y, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Günlük işler', m + 2, y + hh / 2 + pt * 0.13, pt, { kalin: true }]);
      for (let g = 0; g < 7; g++) {
        const x = m + iw + g * gw + gw / 2, d = h.gunEkle(b, g);
        ops.push(['yazi', KISA[g], x, y + hh * 0.45, pt - 1, { kalin: true, hiza: 'orta' }]);
        ops.push(['yazi', String(d.getUTCDate()), x, y + hh - 1.2, pt - 2.5, { hiza: 'orta', ton: 0.35 }]);
      }
      y += hh;
      gun.forEach((ad, r) => {
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', ad, m + 2, y + rh / 2 + pt * 0.12, pt]);
        for (let g = 0; g < 7; g++) ops.push(['kutu', m + iw + g * gw + (gw - kare) / 2, y + (rh - kare) / 2, kare, kare, { dolgu: 1, cizgi: 0.35 }]);
        y += rh;
      });
      for (let g = 0; g < 7; g++) ops.push(['cizgi', m + iw + g * gw, ust, m + iw + g * gw, y, { kalinlik: 0.2, ton: g === 5 ? 0.35 : 0.7 }]);
      // Haftalık işler tablosu
      y += ara;
      const y2 = y, sw = tw * 0.22, dw = tw * 0.2, yw = tw - iw - sw - dw;
      ops.push(['kutu', m, y, tw, hh, { dolgu: 0.86, cizgi: 0.5 }]);
      ops.push(['yazi', 'Haftalık işler', m + 2, y + hh / 2 + pt * 0.13, pt, { kalin: true }]);
      ops.push(['yazi', 'Sorumlu', m + iw + sw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Gün', m + iw + sw + dw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', 'Yapıldı', m + iw + sw + dw + yw / 2, y + hh / 2 + pt * 0.13, pt - 1, { kalin: true, hiza: 'orta' }]);
      y += hh;
      haf.forEach((ad, r) => {
        ops.push(['kutu', m, y, tw, rh, r % 2 ? { dolgu: 0.965, cizgi: 0.55 } : { cizgi: 0.55 }]);
        ops.push(['yazi', ad, m + 2, y + rh / 2 + pt * 0.12, pt]);
        ops.push(['kutu', m + iw + sw + dw + (yw - kare) / 2, y + (rh - kare) / 2, kare, kare, { dolgu: 1, cizgi: 0.35 }]);
        y += rh;
      });
      for (const x of [m + iw, m + iw + sw, m + iw + sw + dw]) ops.push(['cizgi', x, y2, x, y, { kalinlik: 0.2, ton: 0.7 }]);
      // Kalan yer yeterliyse aylık işler ve notlar alanı
      y += ara;
      if (H - m - y >= 16) {
        ops.push(['kutu', m, y, tw, H - m - y, { cizgi: 0.55 }]);
        ops.push(['yazi', 'Ayda bir yapılacak büyük işler ve notlar', m + 2, y + 5.2, pt - 0.5, { kalin: true }]);
        for (let yy = y + 13; yy < H - m - 2; yy += 7.5) ops.push(['cizgi', m + 2.5, yy, W - m - 2.5, yy, { kalinlik: 0.2, ton: 0.78 }]);
      }
      sayfalar.push(ops);
    }
    const son = h.gunEkle(pzt, n * 7 - 1);
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk hafta', `${h.fmtDate(pzt)} – ${h.fmtDate(h.gunEkle(pzt, 6))}`],
        ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`],
        ['Günlük iş', `${gun.length} satır`],
        ['Haftalık iş', `${haf.length} satır`],
        ['Haftalık onay kutusu', `${gun.length * 7 + haf.length} kutu`],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Yazdırırken ölçeği "gerçek boyut" (%100) seçin. Sorumlu ve gün hücreleri elle doldurulmak üzere boş basılır.',
      pdf: { ad: 'ev-temizlik-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', hafta: '4' }, out: { 'Sayfa sayısı': '4 sayfa', 'İlk hafta': '16.11.2026 – 22.11.2026', 'Son gün': '13.12.2026 Pazar', 'Günlük iş': '8 satır', 'Haftalık iş': '8 satır', 'Haftalık onay kutusu': '64 kutu' }, pdfSayfa: 4 },
    { in: { baslangic: '2027-01-01', hafta: '1', boyut: 'a5', gunluk: 'Bulaşık\nÇöp\nYatak', haftalik: 'Banyo\nToz\nCamlar\nÜtü' }, out: { 'İlk hafta': '28.12.2026 – 03.01.2027', 'Son gün': '03.01.2027 Pazar', 'Günlük iş': '3 satır', 'Haftalık iş': '4 satır', 'Haftalık onay kutusu': '25 kutu', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', hafta: '2' }, out: { 'İlk hafta': '28.02.2028 – 05.03.2028', 'Son gün': '12.03.2028 Pazar' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-16', hafta: '12', boyut: 'a5' }, out: { 'Sayfa sayısı': '12 sayfa', 'Son gün': '07.02.2027 Pazar' }, pdfSayfa: 12 },
    { in: { baslangic: '2026-11-22', hafta: '1', gunluk: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12', haftalik: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12', boyut: 'a5', baslik: 'Yurt Odası İş Planı' }, out: { 'İlk hafta': '16.11.2026 – 22.11.2026', 'Haftalık onay kutusu': '96 kutu' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', hafta: '13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1', gunluk: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13' }, error: true },
    { in: { baslangic: '2026-11-18', hafta: '1', haftalik: 'Bu iş adı otuz karakterden çok daha uzun yazılmış bir satırdır' }, error: true },
  ],
  howto: [
    '"Başlangıç tarihi" alanından çizelgenin başlayacağı haftadan bir gün seçin; boş bırakırsanız bu hafta alınır. "Hafta sayısı" alanına kaç haftalık çıktı istediğinizi yazın.',
    '"Günlük işler" alanına her gün yapılan işleri satır satır yazın. Bu işlerin karşısına pazartesiden pazara yedi onay kutusu basılır.',
    '"Haftalık işler" alanına haftada bir yapılan işleri yazın. Bu işlerin karşısında sorumlu kişi, yapılacağı gün ve "yapıldı" kutusu yer alır.',
    'İki alanı da boş bırakırsanız genel bir eve uygun sekizer hazır iş kullanılır. Kâğıt boyutunu seçin, isterseniz başlık yazın.',
    '"Çizelgeyi oluştur" düğmesine basın; önizlemeyi kontrol edip "PDF indir" ile kaydedin ve %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Her sayfa bir haftayı kapsar; sağ üstte haftanın ilk ve son günü yazar. Sayfanın üst tablosu <strong>günlük işler</strong> içindir. Sol sütunda iş adları, sağında pazartesiden pazara yedi dar sütun bulunur. Sütun başlıklarında günün kısaltması ve altında ayın kaçı olduğu yazar; her kesişimde küçük bir onay kutusu vardır. Hafta içi ile hafta sonunu ayıran çizgi biraz daha koyudur.',
      'Alt tablo <strong>haftalık işler</strong> içindir. Burada her işin karşısında üç hücre bulunur: işi kimin yapacağını yazdığınız "Sorumlu", hangi gün yapılacağını yazdığınız "Gün" ve iş bitince işaretlediğiniz "Yapıldı" kutusu. İş listeniz kısaysa sayfanın altında kalan yere "Ayda bir yapılacak büyük işler ve notlar" başlıklı çizgili bir alan eklenir; perde yıkama, dolap içi düzenleme, fırın temizliği gibi seyrek işleri buraya not edebilirsiniz.',
      'Satırlar okumayı kolaylaştırmak için bir beyaz bir açık gri zeminle basılır; onay kutularının içi her zaman beyazdır.',
    ] },
    { h: 'Günlük ve haftalık işleri ayırmanın mantığı', p: [
      'Ev işlerinin çoğu iki ritimden birine uyar. Bulaşık, çöp, tezgâh gibi işler her gün birikir ve ertelendiğinde ertesi günün yükünü ikiye katlar. Banyo ovmak, çarşaf değiştirmek, toz almak gibi işler ise haftada bir yapıldığında yeterlidir. İkisini aynı listeye yazmak, haftalık işlerin her gün göz önünde durup yapılmamış hissi yaratmasına yol açar. Bu çizelgede iki grup ayrı tablodadır: günlük tabloda her gün için kutu, haftalık tabloda tek kutu vardır.',
      'Haftalık işleri haftanın günlerine yaymak, cumartesiyi baştan sona temizliğe ayırmanın önüne geçer. "Gün" sütununa salı için banyo, perşembe için toz, cumartesi için yerler gibi bir dağılım yazarsanız her güne on beş yirmi dakikalık tek bir büyük iş düşer.',
    ] },
    { h: 'Çözümlü örnek: kutu sayısı', p: [
      'Hazır listeyle sayfada 8 günlük ve 8 haftalık iş bulunur. Günlük işlerin her biri için 7 kutu olduğundan günlük tabloda 8 × 7 = 56 kutu, haftalık tabloda 8 kutu vardır; bir haftada işaretlenecek toplam kutu sayısı 64 olur. Sonuç tablosundaki "Haftalık onay kutusu" satırı bu değeri gösterir.',
      'Üç günlük ve dört haftalık işten oluşan kısa bir listede hesap 3 × 7 + 4 = 25 kutudur. Tarih tarafında da hesap bellidir: 18 Kasım 2026 çarşamba gününü seçip 4 hafta isterseniz ilk sayfa 16 Kasım pazartesi ile başlar, son sayfa 13 Aralık 2026 pazar günü biter.',
    ] },
    { h: 'İş bölümü için öneriler', ul: [
      '<strong>Listeyi birlikte yazın.</strong> Evdeki herkesin katıldığı on dakikalık bir konuşmada hazırlanan liste, tek kişinin hazırlayıp astığı listeden daha çok benimsenir.',
      '<strong>Sorumlu sütununu dönüşümlü doldurun.</strong> Kimsenin sevmediği işleri her hafta başka birine yazmak, yükün tek kişide kalmasını önler. Birkaç haftalık çıktı almak bunu baştan planlamayı kolaylaştırır.',
      '<strong>Çocuklara yaşlarına uygun iş verin.</strong> Yatağını toplamak, masayı kurmak, oyuncakları kaldırmak gibi işler için ayrı satır açın; kutuyu kendilerinin işaretlemesi işi oyuna yaklaştırır.',
      '<strong>İşi tanımlayın.</strong> "Mutfak" yerine "tezgâh ve ocağı silmek" yazmak, işin bittiğinin ne zaman söylenebileceğini netleştirir.',
      '<strong>Listeyi kısa tutun.</strong> On iki satırlık üst sınır bilinçlidir; çok uzun bir liste birkaç gün sonra göz ardı edilir. Az ama sürdürülen iş, çok ama yarım kalan işten iyidir.',
      '<strong>Boş kutuyu suçlama aracı yapmayın.</strong> Çizelge hatırlatmak içindir; atlanan günün kutusu boş kalır ve hafta devam eder.',
    ] },
    { h: 'Kimler kullanabilir?', p: [
      'Çizelge aileler için olduğu kadar ev arkadaşları, öğrenci evleri ve yurt odaları için de uygundur; ortak alanların temizliği çoğu zaman "sıra kimdeydi" tartışmasına döner ve duvardaki bir kâğıt bu soruyu kendiliğinden yanıtlar. Küçük ofislerde mutfak ve ortak alan düzeni, apartmanlarda merdiven temizliği nöbeti için de iş adlarını değiştirerek kullanılabilir.',
    ] },
    { h: 'Yazdırma ve sınırlar', p: [
      'Yazdırma penceresinde ölçeği <strong>%100</strong> ya da "gerçek boyut" seçin. Sayfayı buzdolabına, mutfak panosuna ya da kapı arkasına asın ve yanına bir kalem bağlayın. Şeffaf dosyaya koyup silinebilir kalem kullanırsanız aynı sayfayı tekrar tekrar doldurabilirsiniz.',
      'Her tabloya en fazla 12 iş, her işe en fazla 30 karakter yazılabilir. Bir seferde en fazla 12 hafta üretilir ve hafta her zaman pazartesi başlar. Araç kimin hangi işi yapacağını atamaz; sorumlu ve gün hücreleri elle doldurulur. Dosya doldurulabilir form değildir.',
    ] },
  ],
  faq: [
    ['Ev temizlik çizelgesini ücretsiz indirebilir miyim?', 'Evet. Çizelge tamamen ücretsizdir; kayıt ya da indirme sınırı yoktur. İstediğiniz kadar hafta için oluşturup yazdırabilirsiniz.'],
    ['İş listesini kendi evime göre değiştirebilir miyim?', 'Evet. Günlük ve haftalık işler için ayrı alanlar vardır; her birine en fazla 12 işi satır satır yazabilirsiniz. Boş bıraktığınız alan için sekiz hazır iş kullanılır.'],
    ['Günlük işlerde neden yedi kutu, haftalık işlerde tek kutu var?', 'Günlük işler her gün yeniden yapıldığı için her güne bir kutu ayrılır. Haftalık işler hafta içinde bir kez yapılır; bu yüzden hangi gün ve kim tarafından yapılacağını yazacağınız hücreler ile tek bir "yapıldı" kutusu yeterlidir.'],
    ['Sorumlu sütununa isimleri hazır yazdırabilir miyim?', 'Hayır, sorumlu ve gün hücreleri boş basılır. Böylece aynı çıktıyı her hafta farklı bir iş bölümüyle doldurabilir, işleri dönüşümlü paylaştırabilirsiniz.'],
    ['Aylık işler için yer var mı?', 'İş listeniz sayfayı doldurmuyorsa altta "Ayda bir yapılacak büyük işler ve notlar" alanı oluşur. İki tabloya da on ikişer iş yazdığınızda A5 sayfada bu alana yer kalmayabilir; A4 seçmek alanı geri getirir.'],
    ['Çizelgeyi ev arkadaşlarımla kullanabilir miyim?', 'Evet. Haftalık tablodaki "Sorumlu" sütunu tam olarak bunun içindir. Günlük işlerde kutunun içine yapan kişinin baş harfini yazmak da kimin ne yaptığını gösterir.'],
    ['Tarihsiz, her hafta kullanılabilen bir çıktı alabilir miyim?', 'Çizelge tarihli basılır; ancak tek haftalık çıktıyı şeffaf dosyaya koyup silinebilir kalemle doldurursanız gün kısaltmaları değişmediği için her hafta yeniden kullanabilirsiniz.'],
    ['Yazdığım işler ya da tarihler kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde üretilir; yazdığınız iş adları ve seçtiğiniz tarihler hiçbir sunucuya gönderilmez. Sayfa açıldıktan sonra internet olmadan da çalışır.'],
  ],
  related: ['yapilacaklar-listesi-olustur', 'haftalik-planlayici', 'aliskanlik-takip-cizelgesi', 'haftalik-yemek-plani', 'alisveris-listesi-olustur'],
};
