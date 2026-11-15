export default {
  slug: 'ruh-hali-takip-cizelgesi',
  title: 'Ruh Hali Takip Çizelgesi Oluşturma',
  h1Tail: 'aylık yazdırılabilir PDF',
  pageTitle: 'Ruh Hali Takip Çizelgesi Oluştur – Aylık Duygu Durum Takibi PDF',
  description: 'Her gün için puan daireleri, uyku süresi ve not alanı içeren aylık ruh hali takip çizelgesini PDF olarak oluşturun. Günler hazır yazılır; isterseniz ay grafiği eklenir.',
  card: 'Günleri hazır yazılmış, puan daireli ve not alanlı aylık ruh hali takip çizelgesini A4 ya da A5 PDF olarak oluşturun.',
  category: 'planlama',
  pdf: true,
  keywords: ['ruh hali takip çizelgesi', 'duygu durum takip çizelgesi', 'ruh hali günlüğü', 'mod takip tablosu', 'aylık ruh hali takibi pdf', 'yazdırılabilir duygu takip çizelgesi', 'günlük ruh hali kaydı'],
  lead: 'Günlerinizin nasıl geçtiğini kısa bir işaretle kaydedebileceğiniz aylık bir <strong>ruh hali takip çizelgesi</strong> oluşturun. Her gün bir satırdır: puan daireleri, o gece kaç saat uyuduğunuz ve günü neyin etkilediğine dair kısa not alanı. İsterseniz sayfanın altına puanları noktalayıp birleştireceğiniz bir ay grafiği eklenir.',
  button: 'Çizelgeyi oluştur',
  inputs: [
    { id: 'baslangic', label: 'Başlangıç ayı (bir gün seçin)', type: 'date', hint: 'Seçtiğiniz günün ayı ilk sayfa olur. Boş bırakırsanız içinde bulunduğunuz ay alınır.' },
    { id: 'ay', label: 'Ay sayısı', type: 'number', value: '1', hint: '1 ile 12 arasında. Her ay bir sayfadır.' },
    { id: 'olcek', label: 'Puan ölçeği', type: 'select', options: [['5', '5 kademeli (çok kötü – çok iyi)'], ['3', '3 kademeli (kötü – orta – iyi)']] },
    { id: 'grafik', label: 'Ay grafiği', type: 'select', options: [['evet', 'Eklensin'], ['hayir', 'Eklenmesin']] },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Günlerim', hint: 'En fazla 36 karakter.' },
  ],
  compute(v, h) {
    const ilk = h.dateOrToday(v.baslangic, 'Başlangıç ayı');
    const n = h.posint(v.ay, 'Ay sayısı');
    if (n > 12) h.err('Ay sayısı en fazla 12 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Ruh Hali Takip Çizelgesi';
    if (baslik.length > 36) h.err('Sayfa başlığı en fazla 36 karakter olabilir.');
    const L = v.olcek === '3' ? 3 : 5, grafik = v.grafik !== 'hayir';
    const a5 = v.boyut === 'a5';
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 8 : 12;
    const F = (p) => Math.max(5, p * k);
    const iw = W - 2 * m;
    const KISA = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const ACIKLAMA = L === 5 ? '1 Çok kötü  ·  2 Kötü  ·  3 Orta  ·  4 İyi  ·  5 Çok iyi' : '1 Kötü  ·  2 Orta  ·  3 İyi';
    const yil = ilk.getUTCFullYear(), ay0 = ilk.getUTCMonth();
    const aylar = [];
    for (let i = 0; i < n; i++) {
      const b = new Date(Date.UTC(yil, ay0 + i, 1));
      aylar.push({ b, gun: new Date(Date.UTC(yil, ay0 + i + 1, 0)).getUTCDate(), ad: `${h.ayAdi(b.getUTCMonth() + 1)} ${b.getUTCFullYear()}` });
    }
    const sayfalar = aylar.map(({ b, gun, ad }) => {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, F(17), { kalin: true }]);
      ops.push(['yazi', ad, W - m, m + 7 * k, F(12), { hiza: 'sag', ton: 0.3, kalin: true }]);
      ops.push(['cizgi', m, m + 10 * k, W - m, m + 10 * k, { kalinlik: 0.6, ton: 0.2 }]);
      ops.push(['yazi', ACIKLAMA, m, m + 15.5 * k, F(8.5), { ton: 0.3 }]);
      ops.push(['yazi', 'Her akşam bir daire işaretleyin.', W - m, m + 15.5 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
      const y0 = m + 19 * k, bh = 9 * k, altH = grafik ? 44 * k : 10 * k, rh = (H - m - altH - y0 - bh) / 31;
      const cG = 24 * k, cR = L * 8 * k, cU = 18 * k, xR = m + cG, xU = xR + cR, xN = xU + cU, th = bh + gun * rh;
      ops.push(['kutu', m, y0, iw, bh, { dolgu: 0.9, cizgi: 0.55 }]);
      ops.push(['yazi', 'Gün', m + 2 * k, y0 + 5.8 * k, F(8), { kalin: true }]);
      ops.push(['yazi', 'Ruh hali', xR + cR / 2, y0 + 3.8 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      for (let j = 0; j < L; j++) ops.push(['yazi', String(j + 1), xR + (j + 0.5) * 8 * k, y0 + 7.8 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      ops.push(['yazi', 'Uyku', xU + cU / 2, y0 + 3.8 * k, F(7.5), { kalin: true, hiza: 'orta' }]);
      ops.push(['yazi', '(saat)', xU + cU / 2, y0 + 7.8 * k, F(6.5), { hiza: 'orta', ton: 0.35 }]);
      ops.push(['yazi', 'Günü ne etkiledi? / Not', xN + 2 * k, y0 + 5.8 * k, F(8), { kalin: true }]);
      for (let d = 1; d <= gun; d++) {
        const hg = (b.getUTCDay() + d - 1) % 7;
        if (hg === 0 || hg === 6) ops.push(['kutu', m, y0 + bh + (d - 1) * rh, iw, rh, { dolgu: 0.94, cizgi: 0.94, kalinlik: 0.1 }]);
      }
      ops.push(['kutu', m, y0 + bh, iw, th - bh, { cizgi: 0.55 }]);
      for (const x of [xR, xU, xN]) ops.push(['cizgi', x, y0, x, y0 + th, { kalinlik: 0.25, ton: 0.55 }]);
      const r = Math.min(2 * k, rh * 0.36);
      for (let d = 1; d <= gun; d++) {
        const ry = y0 + bh + (d - 1) * rh, hg = (b.getUTCDay() + d - 1) % 7, cy = ry + rh / 2;
        if (d > 1) ops.push(['cizgi', m, ry, m + iw, ry, { kalinlik: 0.2, ton: 0.7 }]);
        ops.push(['yazi', String(d), m + 9 * k, cy + 1.1 * k, F(8.5), { kalin: true, hiza: 'sag' }]);
        ops.push(['yazi', KISA[hg], m + 12 * k, cy + 1.1 * k, F(7.5), { ton: 0.4 }]);
        for (let j = 0; j < L; j++) ops.push(['daire', xR + (j + 0.5) * 8 * k, cy, r, { cizgi: 0.35, kalinlik: 0.3 }]);
      }
      if (grafik) {
        // Ay grafiği: 31 gün × L düzey, işaretlenecek noktalar
        const gy = H - m - 40 * k, x0 = m + 8 * k, cw = (iw - 8 * k) / 31, ust = gy + 10 * k, alt = H - m - 8 * k, adim = (alt - ust) / (L - 1);
        ops.push(['yazi', 'Ay grafiği', m, gy + 4 * k, F(8.5), { kalin: true }]);
        ops.push(['yazi', 'Her günün puanını noktanın üstüne işaretleyip noktaları birleştirin.', W - m, gy + 4 * k, F(7), { hiza: 'sag', ton: 0.45 }]);
        ops.push(['kutu', x0, ust - 3 * k, iw - 8 * k, alt - ust + 6 * k, { cizgi: 0.55 }]);
        for (let j = 0; j < L; j++) {
          const y = alt - j * adim;
          ops.push(['yazi', String(j + 1), m + 5 * k, y + 1 * k, F(7), { hiza: 'sag', ton: 0.35 }]);
          ops.push(['cizgi', x0, y, x0 + iw - 8 * k, y, { kalinlik: 0.15, ton: 0.85 }]);
          for (let d = 1; d <= gun; d++) ops.push(['daire', x0 + (d - 0.5) * cw, y, 0.35 * k, { dolgu: 0.55, cizgi: 0.55, kalinlik: 0.1 }]);
        }
        for (let d = 1; d <= gun; d += 2) ops.push(['yazi', String(d), x0 + (d - 0.5) * cw, H - m - 1 * k, F(5.5), { hiza: 'orta', ton: 0.4 }]);
      } else {
        ops.push(['yazi', 'Ayın geneli için bir cümle:', m, H - m - 3 * k, F(8.5), { kalin: true }]);
        ops.push(['cizgi', m + 50 * k, H - m - 2.4 * k, W - m, H - m - 2.4 * k, { kalinlik: 0.2, ton: 0.6 }]);
      }
      return ops;
    });
    const toplam = aylar.reduce((a, x) => a + x.gun, 0), son = aylar[n - 1];
    return {
      rows: [
        ['Sayfa sayısı', `${n} sayfa`],
        ['İlk ay', `${aylar[0].ad} (${aylar[0].gun} gün)`],
        ['Son ay', `${son.ad} (${son.gun} gün)`],
        ['Toplam gün', `${toplam} gün`],
        ['Puan ölçeği', `${L} kademeli`],
        ['Ay grafiği', grafik ? 'Var' : 'Yok'],
        ['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)'],
      ],
      note: 'Bu çizelge kişisel kayıt içindir; tıbbi tavsiye ya da tanı aracı değildir. Uzun süren ya da ağırlaşan sıkıntılarda bir ruh sağlığı uzmanına başvurun.',
      pdf: { ad: 'ruh-hali-takip-cizelgesi', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { baslangic: '2026-11-18', ay: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'İlk ay': 'Kasım 2026 (30 gün)', 'Toplam gün': '30 gün', 'Puan ölçeği': '5 kademeli', 'Ay grafiği': 'Var', 'Kâğıt': 'A4 dikey (210 × 297 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2028-02-29', ay: '1', olcek: '3', boyut: 'a5' }, out: { 'İlk ay': 'Şubat 2028 (29 gün)', 'Toplam gün': '29 gün', 'Puan ölçeği': '3 kademeli', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 1 },
    { in: { baslangic: '2026-11-18', ay: '3', grafik: 'hayir' }, out: { 'Sayfa sayısı': '3 sayfa', 'Son ay': 'Ocak 2027 (31 gün)', 'Toplam gün': '92 gün', 'Ay grafiği': 'Yok' }, pdfSayfa: 3 },
    { in: { baslangic: '2027-01-01', ay: '12', boyut: 'a5' }, out: { 'İlk ay': 'Ocak 2027 (31 gün)', 'Son ay': 'Aralık 2027 (31 gün)', 'Toplam gün': '365 gün' }, pdfSayfa: 12 },
    { in: { baslangic: '2027-02-10', ay: '2', olcek: '3', grafik: 'hayir', boyut: 'a5', baslik: 'Günlerim' }, out: { 'İlk ay': 'Şubat 2027 (28 gün)', 'Son ay': 'Mart 2027 (31 gün)', 'Toplam gün': '59 gün' }, pdfSayfa: 2 },
    { in: { baslangic: '2026-11-18', ay: '13' }, error: true },
    { in: { baslangic: '2026-11-18', ay: '0' }, error: true },
    { in: { baslangic: '2026-11-18', ay: '1', baslik: 'Bu başlık otuz altı karakterden daha uzun bir başlıktır' }, error: true },
  ],
  howto: [
    'Takibe başlamak istediğiniz aydan bir gün seçin; çizelge o ayın bütün günlerini içerir. Alan boşsa içinde bulunduğunuz ay alınır.',
    'Kaç aylık çizelge istediğinizi yazın; her ay ayrı bir sayfadır.',
    'Puan ölçeğini seçin. Beş kademeli ölçek daha ince ayrım yapar; üç kademeli ölçek daha hızlı doldurulur.',
    'Ay grafiğini isteyip istemediğinizi, kâğıt boyutunu ve varsa başlığı belirleyip "Çizelgeyi oluştur" düğmesine basın.',
    'Önizlemeyi kontrol edip "PDF indir" ile kaydedin; dikey yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfanın düzeni', p: [
      'Her sayfa bir takvim ayıdır; başlığın sağında ay ve yıl, altında puanların ne anlama geldiğini gösteren kısa bir açıklama yer alır. Tablonun her satırı bir gündür ve dört sütundan oluşur. <strong>Gün</strong> sütununda ayın günü ile kısaltılmış gün adı hazır basılıdır. <strong>Ruh hali</strong> sütununda seçtiğiniz ölçeğe göre üç ya da beş daire bulunur; günün genel havasına en yakın olanı işaretlersiniz. <strong>Uyku</strong> sütununa bir önceki gece yaklaşık kaç saat uyuduğunuzu yazarsınız. En geniş sütun olan <strong>"Günü ne etkiledi?"</strong> alanı birkaç kelimelik not içindir.',
      'Hafta sonu satırları açık gri zeminle basılır. Ay grafiğini eklediyseniz sayfanın altında yatay ekseni günler, dikey ekseni puanlar olan noktalı bir alan görürsünüz. Grafiği eklemediyseniz tablo satırları biraz daha yüksek olur ve en altta ayın geneli için tek cümlelik bir alan kalır.',
    ] },
    { h: 'Nasıl doldurulur?', ol: [
      'Çizelgeyi her gün aynı saatte, tercihen akşam yatmadan önce doldurun. Günün en kötü ya da en iyi anını değil, <em>genelini</em> düşünün.',
      'Üzerinde uzun uzun durmadan bir daire işaretleyin; ilk akla gelen puan çoğu zaman yeterince doğrudur.',
      'Uyku sütununa bir önceki gecenin yaklaşık süresini yazın: 6, 7,5 gibi.',
      'Not alanına günü belirleyen bir iki şeyi yazın: "sınav", "arkadaşlarla yemek", "yağmur, evde kaldım", "baş ağrısı" gibi.',
      'Grafik varsa, o günün sütununda puanınıza denk gelen noktayı kalemle belirginleştirin ve bir önceki günün noktasına çizgiyle bağlayın.',
    ] },
    { h: 'Örnek: bir haftalık kayıt', p: [
      'Kasım 2026 sayfasını yazdırdığınızı düşünelim; sayfada 30 satır vardır ve 1 Kasım pazar gününe denk geldiği için ilk satır gri zeminlidir. Beş kademeli ölçekle 16 Kasım pazartesi için 3 işaretleyip uykuya 6, nota "yoğun mesai" yazarsınız. Salı 2, uyku 5, not "geç yattım, toplantı kötü geçti". Çarşamba 4, uyku 7,5, not "yürüyüş". Perşembe 4, cuma 5 ("maaş günü, akşam sinema"), cumartesi 4, pazar 3 ("pazartesi kaygısı").',
      'Grafikte bu yedi nokta birleştiğinde salı günü dibe inen, cuma günü tepeye çıkan bir çizgi oluşur. Tek başına şaşırtıcı değildir; ama birkaç hafta sonra salı çukurunun yinelendiğini ya da düşük puanlı günlerin çoğunda uyku sütununda 5–6 yazdığını fark edebilirsiniz. Çizelgenin sağladığı şey budur: hafızanın genelleyip sildiği ayrıntıyı saklamak.',
    ] },
    { h: 'Üç kademeli mi, beş kademeli mi?', p: [
      'Beş kademeli ölçekte 1 çok kötü, 2 kötü, 3 orta, 4 iyi, 5 çok iyi anlamına gelir. "Fena değildi" ile "güzeldi" arasındaki farkı kaydetmek isteyenler için uygundur ve grafikte daha hareketli bir çizgi verir. Üç kademeli ölçekte yalnızca kötü, orta ve iyi vardır; karar vermek birkaç saniye sürer. Çocuklarla birlikte doldurulacaksa ya da kayıt tutma alışkanlığınız yoksa üç kademeli ölçekle başlamak sürdürmeyi kolaylaştırır.',
      'Hangi ölçeği seçerseniz seçin, ay boyunca aynı ölçütle puan vermeye çalışın. Puanlar yalnızca kendi günlerinizi birbiriyle karşılaştırmak içindir; başkasının çizelgesiyle kıyaslamanın bir anlamı yoktur.',
    ] },
    { h: 'Bu çizelge ne değildir?', p: [
      'Bu sayfa kişisel bir kayıt aracıdır; <strong>tıbbi tavsiye, psikolojik test ya da tanı aracı değildir</strong>. Puanlarınızı yorumlamaz, bir sonuç ya da iyileşme vaat etmez. Düşük puanlı günler herkesin hayatında olur ve tek başına bir sorun göstermez.',
      'Bununla birlikte keyifsizlik, ilgi kaybı, yoğun kaygı ya da uyku ve iştah değişiklikleri haftalarca sürüyor, işinizi, okulunuzu ya da ilişkilerinizi etkiliyorsa bir hekime ya da ruh sağlığı uzmanına başvurmanız yerinde olur. Görüşmeye doldurduğunuz çizelgeyi götürmek, son haftaları anlatmanızı kolaylaştırabilir. Kendinize zarar verme düşünceleriniz varsa beklemeyin; yakınınızdaki birine haber verin ve acil durumda 112\'yi arayın.',
    ] },
    { h: 'Yazdırma, saklama ve sınırlar', p: [
      'Kâğıt yönünü dikey, ölçeği %100 seçin. A5 sayfa günlük ya da ajanda arasına sığar ve daha kişisel bir kullanım sağlar; not sütunu daraldığı için yazınız büyükse A4 seçin. Bu çizelgeye yazdıklarınız özeldir: ortak kullanılan bir panoya asmak yerine bir defterin içinde ya da çekmecede tutmak isteyebilirsiniz.',
      'Bir dosyada en fazla 12 ay bulunur. Sayfa her zaman ayın 1\'inden başlar; ay ortasında başlıyorsanız önceki satırları boş bırakın. Uyku sütunu yalnızca hatırlatıcı bir sayıdır; uyku düzeninizi ayrıntılı izlemek için ayrı bir uyku çizelgesi daha uygundur. Dosya elle doldurulmak üzere tasarlanmıştır; form alanı içermez ve yazdıklarınızı kaydetmez.',
    ] },
  ],
  faq: [
    ['Ruh hali takip çizelgesi ücretsiz mi?', 'Evet. Araç ücretsizdir ve kayıt gerektirmez; PDF dosyasını dilediğiniz kadar indirip yazdırabilirsiniz.'],
    ['Günde kaç kez doldurmalıyım?', 'Sayfa günde bir kayıt için tasarlanmıştır. Akşam, günün geneline bakarak tek bir daire işaretlemeniz yeterlidir. Gün içindeki iniş çıkışları not sütununa yazabilirsiniz.'],
    ['Bir günü atlarsam ne yapmalıyım?', 'Hatırlıyorsanız ertesi gün doldurun; hatırlamıyorsanız satırı boş bırakın. Tahminle doldurulmuş kayıt, boş satırdan daha yanıltıcıdır. Grafikte çizgiyi boş günün üzerinden atlayarak devam ettirebilirsiniz.'],
    ['Uyku sütununu doldurmak zorunda mıyım?', 'Hayır. Bu sütun, ruh haliyle uyku süresi arasında bir ilişki olup olmadığını kendi kaydınızda görmeniz için eklenmiştir. İsterseniz boş bırakabilir ya da başka bir sayı (örneğin yürüdüğünüz dakika) için kullanabilirsiniz.'],
    ['Ay grafiği ne işe yarar?', 'Günlük puanları noktalayıp birleştirdiğinizde ayın seyri tek bir çizgi olarak görünür. Haftalık yinelenen iniş çıkışlar ya da uzun süren düşük dönemler, daire sütununa bakmaktan daha kolay fark edilir.'],
    ['Bu çizelge depresyon ya da başka bir rahatsızlığı gösterir mi?', 'Hayır. Çizelge tanı koymaz ve puanlarınızı yorumlamaz. Kendinizi uzun süredir kötü hissediyorsanız değerlendirmeyi bir hekim ya da ruh sağlığı uzmanı yapmalıdır.'],
    ['Çocuklar için kullanılabilir mi?', 'Evet. Üç kademeli ölçek çocuklar için daha anlaşılırdır; daireleri renkli kalemle boyayabilir ya da içine yüz ifadesi çizebilirler. Doldurmayı bir zorunluluk değil, günü birlikte konuşma fırsatı olarak sunmak daha iyi sonuç verir.'],
    ['Girdiğim bilgiler bir yere kaydediliyor mu?', 'Hayır. PDF tarayıcınızın içinde oluşturulur; seçtiğiniz tarih ve başlık sunucuya gönderilmez. Çizelgeye elle yazdıklarınız ise yalnızca sizin kâğıdınızda kalır.'],
  ],
  related: ['uyku-takip-cizelgesi', 'aliskanlik-takip-cizelgesi', 'su-icme-takip-cizelgesi', 'egzersiz-takip-cizelgesi', 'aylik-planlayici'],
};
