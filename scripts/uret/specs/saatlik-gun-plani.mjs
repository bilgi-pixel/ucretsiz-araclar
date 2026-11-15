export default {
  slug: 'saatlik-gun-plani',
  title: 'Saatlik Gün Planı Oluşturma',
  h1Tail: 'saat saat yazdırılabilir çizelge',
  pageTitle: 'Saatlik Gün Planı Oluştur – Saat Saat Günlük Program PDF',
  description: 'Saatleri hazır yazılmış, 30 ya da 60 dakikalık satırlara bölünmüş saatlik gün planını PDF olarak oluşturun. Başlangıç ve bitiş saatini siz seçin; A4 ya da A5.',
  card: 'Günü saat saat planlayın: başlangıç ve bitiş saatini seçin, 30 ya da 60 dakikalık satırlı gün çizelgesini PDF olarak indirin.',
  category: 'planlama',
  pdf: true,
  keywords: ['saatlik gün planı', 'saatlik planlayıcı', 'saat saat günlük program', 'zaman bloklama şablonu', 'saatlik çizelge pdf', 'günlük saat çizelgesi', 'yarım saatlik program'],
  lead: 'Günü saat saat görmek isteyenler için saatleri hazır yazılmış bir <strong>saatlik gün planı</strong> oluşturun. Günün kaçta başlayıp kaçta bittiğini ve satırların 30 mu 60 mı dakikalık olacağını seçin; yanında öncelikler, yapılacaklar ve notlar bölümü olan sayfalar PDF olarak hazırlanır.',
  button: 'Planı oluştur',
  inputs: [
    { id: 'bas', label: 'Başlangıç saati', type: 'number', value: '7', hint: '0 ile 23 arasında tam saat.' },
    { id: 'bit', label: 'Bitiş saati', type: 'number', value: '22', hint: '1 ile 24 arasında tam saat; başlangıçtan büyük olmalı.' },
    { id: 'aralik', label: 'Satır aralığı', type: 'select', options: [['30', '30 dakika'], ['60', '60 dakika']] },
    { id: 'tarihli', label: 'Tarih', type: 'select', options: [['evet', 'Sayfalara tarih yazılsın'], ['hayir', 'Tarihsiz (tarihi elle yazarım)']] },
    { id: 'baslangic', label: 'İlk günün tarihi', type: 'date', hint: 'Boş bırakırsanız bugünden başlar. Tarihsiz seçenekte kullanılmaz.' },
    { id: 'gun', label: 'Sayfa (gün) sayısı', type: 'number', value: '1', hint: '1 ile 31 arasında.' },
    { id: 'boyut', label: 'Kâğıt boyutu', type: 'select', options: [['a4', 'A4 (dikey)'], ['a5', 'A5 (dikey)']] },
    { id: 'baslik', label: 'Sayfa başlığı (isteğe bağlı)', type: 'text', placeholder: 'Örn. Gün Planı', hint: 'En fazla 40 karakter.', wide: true },
  ],
  compute(v, h) {
    const bas = h.int(v.bas, 'Başlangıç saati'), bit = h.int(v.bit, 'Bitiş saati');
    if (bas < 0 || bas > 23) h.err('Başlangıç saati 0 ile 23 arasında olmalı.');
    if (bit < 1 || bit > 24) h.err('Bitiş saati 1 ile 24 arasında olmalı.');
    if (bit <= bas) h.err('Bitiş saati başlangıç saatinden büyük olmalı (örn. 7 ve 22).');
    const aralik = v.aralik === '60' ? 60 : 30;
    const a5 = v.boyut === 'a5';
    const satir = (bit - bas) * 60 / aralik, enCok = a5 ? 30 : 40;
    if (satir < 4) h.err('Plan en az 4 satır içermeli; saat aralığını genişletin ya da 30 dakikalık satır seçin.');
    if (satir > enCok) h.err(`Bu kâğıda en fazla ${enCok} satır sığar, seçiminiz ${satir} satır tutuyor. Saat aralığını daraltın ya da 60 dakikalık satır seçin.`);
    const tarihli = v.tarihli !== 'hayir';
    const ilk = tarihli ? h.dateOrToday(v.baslangic, 'İlk günün tarihi') : null;
    if (ilk && (ilk.getUTCFullYear() < 1900 || ilk.getUTCFullYear() > 2200)) h.err('Tarih 1900 ile 2200 yılları arasında olmalı.');
    const n = h.posint(v.gun, 'Sayfa (gün) sayısı');
    if (n > 31) h.err('Sayfa sayısı en fazla 31 olabilir.');
    const baslik = (v.baslik || '').trim() || 'Gün Planı';
    if (baslik.length > 40) h.err('Sayfa başlığı en fazla 40 karakter olabilir.');
    const W = a5 ? 148 : 210, H = a5 ? 210 : 297, k = a5 ? 0.7 : 1, m = a5 ? 9 : 12;
    const f = (p) => Math.max(5, p * k);
    const iki = (x) => String(x).padStart(2, '0');
    const sayfalar = [];
    for (let i = 0; i < n; i++) {
      const ops = [];
      ops.push(['yazi', baslik, m, m + 7 * k, f(17), { kalin: true }]);
      if (tarihli) {
        const t = h.gunEkle(ilk, i);
        ops.push(['yazi', `${t.getUTCDate()} ${h.ayAdi(t.getUTCMonth() + 1)} ${t.getUTCFullYear()}`, W - m, m + 4 * k, f(11), { hiza: 'sag', kalin: true }]);
        ops.push(['yazi', h.gunAdi(t), W - m, m + 9 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
      } else {
        ops.push(['yazi', 'Tarih:', W - m - 38 * k, m + 7 * k, f(9), { hiza: 'sag', ton: 0.35 }]);
        ops.push(['cizgi', W - m - 36 * k, m + 7.6 * k, W - m, m + 7.6 * k, { kalinlik: 0.25, ton: 0.5 }]);
      }
      ops.push(['cizgi', m, m + 12 * k, W - m, m + 12 * k, { kalinlik: 0.6, ton: 0.2 }]);
      const ust = m + 16 * k, alt = H - m, bosluk = 4 * k, tw = W - 2 * m;
      const sw = tw * 0.6, yx = m + sw + bosluk, yw = tw - sw - bosluk, saatW = 13 * k;
      const rh = (alt - ust) / satir;
      // Saat çizelgesi
      ops.push(['kutu', m, ust, saatW, alt - ust, { dolgu: 0.94, cizgi: 0.5 }]);
      ops.push(['kutu', m, ust, sw, alt - ust, { cizgi: 0.5 }]);
      for (let r = 0; r < satir; r++) {
        const dk = bas * 60 + r * aralik, tam = dk % 60 === 0, y = ust + r * rh;
        if (r > 0) ops.push(['cizgi', tam ? m : m + saatW, y, m + sw, y, tam ? { kalinlik: 0.3, ton: 0.45 } : { kalinlik: 0.2, ton: 0.7, kesik: true }]);
        const yy = y + Math.min(rh * 0.5 + 1.2 * k, 5.5 * k);
        if (tam) ops.push(['yazi', `${iki(dk / 60)}.00`, m + saatW - 1.8 * k, yy, f(8.5), { kalin: true, hiza: 'sag' }]);
        else ops.push(['yazi', `.${iki(dk % 60)}`, m + saatW - 1.8 * k, yy, f(7), { hiza: 'sag', ton: 0.5 }]);
      }
      // Yan sütun
      const bolum = (y, yuk, ad) => {
        ops.push(['kutu', yx, y, yw, yuk, { cizgi: 0.5 }]);
        ops.push(['kutu', yx, y, yw, 7 * k, { dolgu: 0.92, cizgi: 0.5 }]);
        ops.push(['yazi', ad, yx + 2 * k, y + 5 * k, f(8.5), { kalin: true }]);
        return y + 7 * k;
      };
      const sat = 8 * k, onYuk = 7 * k + 3 * sat + 3 * k, notYuk = 7 * k + 6 * sat + 3 * k;
      let y = bolum(ust, onYuk, 'Bugünün öncelikleri');
      for (let j = 0; j < 3; j++) {
        ops.push(['yazi', `${j + 1}.`, yx + 2.5 * k, y + (j + 1) * sat - 1 * k, f(10), { kalin: true, ton: 0.3 }]);
        ops.push(['cizgi', yx + 8 * k, y + (j + 1) * sat, yx + yw - 2.5 * k, y + (j + 1) * sat, { kalinlik: 0.2, ton: 0.7 }]);
      }
      const yapY = ust + onYuk + bosluk, yapYuk = alt - notYuk - bosluk - yapY;
      y = bolum(yapY, yapYuk, 'Saati olmayan işler');
      for (let yy = y + sat; yy < yapY + yapYuk - 2 * k; yy += sat) {
        ops.push(['kutu', yx + 2.5 * k, yy - 4 * k, 3.6 * k, 3.6 * k, { cizgi: 0.4 }]);
        ops.push(['cizgi', yx + 8 * k, yy, yx + yw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.7 }]);
      }
      y = bolum(alt - notYuk, notYuk, 'Notlar');
      for (let yy = y + sat; yy < alt - 2 * k; yy += sat) ops.push(['cizgi', yx + 2.5 * k, yy, yx + yw - 2.5 * k, yy, { kalinlik: 0.2, ton: 0.75 }]);
      sayfalar.push(ops);
    }
    const rows = [
      ['Sayfa sayısı', `${n} sayfa`],
      ['Saat aralığı', `${iki(bas)}.00 – ${iki(bit)}.00`],
      ['Satır sayısı', `${satir} satır (${aralik} dakikalık)`],
      ['Planlanan süre', `${bit - bas} saat`],
    ];
    if (tarihli) {
      const son = h.gunEkle(ilk, n - 1);
      rows.push(['İlk gün', `${h.fmtDate(ilk)} ${h.gunAdi(ilk)}`], ['Son gün', `${h.fmtDate(son)} ${h.gunAdi(son)}`]);
    } else rows.push(['Tarih', 'Elle yazılacak']);
    rows.push(['Kâğıt', a5 ? 'A5 dikey (148 × 210 mm)' : 'A4 dikey (210 × 297 mm)']);
    return {
      rows,
      note: 'Yazdırırken kâğıt yönünü dikey, ölçeği "gerçek boyut" (%100) seçin.',
      pdf: { ad: 'saatlik-gun-plani', baslik, boyut: a5 ? 'a5' : 'a4', yatay: false, sayfalar },
    };
  },
  cases: [
    { in: { bas: '7', bit: '22', aralik: '30', baslangic: '2026-11-18', gun: '1' }, out: { 'Sayfa sayısı': '1 sayfa', 'Saat aralığı': '07.00 – 22.00', 'Satır sayısı': '30 satır (30 dakikalık)', 'Planlanan süre': '15 saat', 'İlk gün': '18.11.2026 Çarşamba' }, pdfSayfa: 1 },
    { in: { bas: '0', bit: '24', aralik: '60', baslangic: '2027-01-01', gun: '7' }, out: { 'Saat aralığı': '00.00 – 24.00', 'Satır sayısı': '24 satır (60 dakikalık)', 'İlk gün': '01.01.2027 Cuma', 'Son gün': '07.01.2027 Perşembe' }, pdfSayfa: 7 },
    { in: { bas: '8', bit: '18', aralik: '30', tarihli: 'hayir', gun: '3', boyut: 'a5' }, out: { 'Satır sayısı': '20 satır (30 dakikalık)', 'Tarih': 'Elle yazılacak', 'Kâğıt': 'A5 dikey (148 × 210 mm)' }, pdfSayfa: 3 },
    { in: { bas: '6', bit: '21', aralik: '30', baslangic: '2028-02-28', gun: '2', boyut: 'a5', baslik: 'Sınav Haftası' }, out: { 'Satır sayısı': '30 satır (30 dakikalık)', 'Son gün': '29.02.2028 Salı' }, pdfSayfa: 2 },
    { in: { bas: '5', bit: '23', aralik: '60', baslangic: '2026-11-16', gun: '5' }, out: { 'Satır sayısı': '18 satır (60 dakikalık)', 'Planlanan süre': '18 saat', 'İlk gün': '16.11.2026 Pazartesi', 'Son gün': '20.11.2026 Cuma' }, pdfSayfa: 5 },
    { in: { bas: '4', bit: '24', aralik: '30', baslangic: '2026-11-18' }, out: { 'Satır sayısı': '40 satır (30 dakikalık)' }, pdfSayfa: 1 },
    { in: { bas: '0', bit: '24', aralik: '30', baslangic: '2026-11-18' }, error: true },
    { in: { bas: '18', bit: '9', baslangic: '2026-11-18' }, error: true },
    { in: { bas: '6', bit: '22', aralik: '30', boyut: 'a5', baslangic: '2026-11-18' }, error: true },
    { in: { bas: '9', bit: '10', aralik: '60', baslangic: '2026-11-18' }, error: true },
  ],
  howto: [
    '"Başlangıç saati" ve "Bitiş saati" alanlarına gününüzün planlamak istediğiniz bölümünü tam saat olarak yazın; örneğin 7 ve 22.',
    'Satır aralığını seçin. 30 dakikalık satırlar kısa işleri ve ders saatlerini ayırmak için, 60 dakikalık satırlar daha geniş yazı alanı için uygundur.',
    'Sayfalara tarih yazılmasını istiyorsanız ilk günün tarihini ve kaç günlük sayfa istediğinizi girin. Aynı sayfayı çoğaltıp her gün kullanacaksanız "Tarihsiz" seçeneğini işaretleyin.',
    'Kâğıt boyutunu seçin, isterseniz sayfa başlığını değiştirin.',
    '"Planı oluştur" düğmesine basın, önizlemeyi kontrol edin ve "PDF indir" ile dosyayı kaydedip dikey yönde, %100 ölçekle yazdırın.',
  ],
  sections: [
    { h: 'Sayfada neler var?', p: [
      'Sayfanın sol tarafındaki geniş sütun saat çizelgesidir. En solda gri bir şerit içinde saatler yazar: tam saatler "07.00" biçiminde kalın, yarım saatler ".30" biçiminde küçük ve gri. Tam saat çizgileri düz, yarım saat çizgileri kesiklidir; böylece göz saat başlarını kolayca bulur. Her satır, yanında yazan saatte başlayan zaman dilimini gösterir; son satırın alt kenarı seçtiğiniz bitiş saatidir.',
      'Sağdaki dar sütunda üç kutu bulunur. <strong>Bugünün öncelikleri</strong> üç numaralı satırdan oluşur. <strong>Saati olmayan işler</strong> onay kutulu bir listedir; gün içinde boşluk bulduğunuzda yapacağınız, belli bir saate bağlı olmayan işler buraya yazılır. En altta altı satırlık <strong>Notlar</strong> kutusu vardır. Tarihli seçenekte sağ üst köşeye tarih ve gün adı basılır; tarihsiz seçenekte aynı yerde elle doldurulacak bir "Tarih" çizgisi bulunur.',
    ] },
    { h: 'Satır sayısı nasıl hesaplanır?', p: [
      'Satır sayısı, bitiş saati ile başlangıç saati arasındaki farkın satır aralığına bölünmesiyle bulunur: <strong>satır = (bitiş − başlangıç) × 60 ÷ aralık</strong>. Saat 7 ile 22 arası 15 saattir; 30 dakikalık aralıkla 15 × 60 ÷ 30 = 30 satır, 60 dakikalık aralıkla 15 satır eder. Gece yarısından gece yarısına tam gün, 60 dakikalık aralıkla 24 satır tutar.',
      'Satırlar sayfa yüksekliğine eşit olarak dağıtılır; satır sayısı azaldıkça her satır yükselir. A4 sayfaya en fazla 40, A5 sayfaya en fazla 30 satır sığdırılır; bunun üstünde satırlar elle yazılamayacak kadar daralacağı için araç uyarı verir. Örneğin A4 kâğıtta 04.00 ile 24.00 arası 30 dakikalık satırlarla tam 40 satır eder ve kabul edilir; 00.00 ile 24.00 arası 30 dakikalık satırlarla 48 satır tutar ve reddedilir. Bu durumda ya saat aralığını daraltın ya da 60 dakikalık satıra geçin.',
    ] },
    { h: 'Zaman bloklama yöntemiyle kullanım', p: [
      'Saatlik planın en yaygın kullanımı zaman bloklamadır: yapılacak işleri bir liste halinde bırakmak yerine her birine günün içinde belirli bir saat aralığı ayırırsınız. İşin satırlarını bir köşeli parantezle ya da kutuyla çevreleyip içine adını yazmak yeterlidir.',
    ], ol: [
      'Önce saati değişmeyen işleri yerleştirin: ders, toplantı, servis, yemek, namaz, spor, çocukların okul çıkışı.',
      'Üç önceliğinizi en verimli olduğunuz saatlere blok olarak koyun. Çoğu kişi için bu, sabahın ilk iki üç saatidir.',
      'Bloklar arasında on beş yirmi dakikalık boşluklar bırakın. Arka arkaya dizilmiş bloklar ilk gecikmede bütün günü kaydırır.',
      'Küçük ve benzer işleri (telefonlar, e-postalar, evrak) tek bir blokta toplayın.',
      'Gün içinde plan bozulursa kalan saatleri yeniden çizin; çizelgenin amacı tutturmak değil, zamanın nereye gittiğini görmektir.',
    ] },
    { h: 'Kimler için uygun?', ul: [
      '<strong>Öğrenciler:</strong> ders, etüt ve mola saatlerini ayırmak; sınav haftasında her güne bir sayfa hazırlamak.',
      '<strong>Randevuyla çalışanlar:</strong> kuaför, klinik, danışman, özel ders veren öğretmen gibi günü müşteri saatlerine bölünen meslekler.',
      '<strong>Vardiyalı ve erken başlayanlar:</strong> başlangıç saatini 5 ya da 6 yaparak sayfayı kendi gününe uydurmak isteyenler.',
      '<strong>Evden çalışanlar:</strong> iş, ev işleri ve dinlenme arasındaki sınırı kâğıt üzerinde görmek isteyenler.',
      '<strong>Zaman kaydı tutanlar:</strong> planı önceden yazmak yerine, gün boyunca ne yaptığını satır satır not edip akşam değerlendirenler.',
    ] },
    { h: 'Yazdırma ve çoğaltma', p: [
      'Yazdırma penceresinde yönü <strong>dikey</strong>, ölçeği <strong>gerçek boyut</strong> ya da %100 seçin. Tarihsiz tek sayfa oluşturup yazıcının kopya sayısını artırmak, aynı düzeni her gün kullanacaklar için en pratik yoldur. Tarihli sayfalar ise haftalık ya da aylık set halinde basılıp sol kenarından delinerek klasöre takılabilir.',
      'A5 boyutunda satırlar daralır; 30 dakikalık aralıkla en fazla 15 saatlik bir gün sığar. Daha uzun bir günü A5 kâğıtta planlamak için 60 dakikalık satır seçebilirsiniz.',
    ] },
    { h: 'Sınırlar', p: [
      'Saatler tam saat olarak girilir; 08.30 gibi buçuklu bir başlangıç tanımlanamaz. Satır aralığı 30 ya da 60 dakikadır. Plan aynı gün içinde kalır; gece yarısını aşan bir vardiya için iki ayrı sayfa (örneğin 20 ile 24 ve 0 ile 8) hazırlayabilirsiniz. Bir seferde en fazla 31 sayfa üretilir ve sayfa başlığı 40 karakterle sınırlıdır.',
    ] },
  ],
  faq: [
    ['Saatlik gün planı ücretsiz mi?', 'Evet. Araç ücretsizdir, kayıt gerektirmez ve dilediğiniz kadar sayfa oluşturup yazdırabilirsiniz.'],
    ['Günlük planlayıcıdan farkı nedir?', 'Günlük planlayıcıda saat hanesi boştur ve ağırlık yapılacaklar listesindedir. Saatlik gün planında ise sayfanın büyük bölümü, saatleri hazır yazılmış satırlardan oluşur; günü zaman dilimlerine bölerek planlamak isteyenler içindir.'],
    ['Saatler 24 saat düzeninde mi yazılıyor?', 'Evet. Saatler 07.00, 13.00, 21.00 biçiminde 24 saat düzeninde yazılır. Bitiş saati olarak 24 girerseniz son satır gece yarısında biter.'],
    ['15 dakikalık satır seçebilir miyim?', 'Hayır, satır aralığı 30 ya da 60 dakikadır. On beş dakikalık satırlar tek sayfada elle yazılamayacak kadar dar kalır. Daha ince ayrım için 30 dakikalık satırı ortasından elle bölebilirsiniz.'],
    ['Neden "en fazla satır" uyarısı alıyorum?', 'Seçtiğiniz saat aralığı ve satır aralığı kâğıda sığacak satır sayısını aşıyor demektir. A4 için sınır 40, A5 için 30 satırdır. Saat aralığını daraltmak, 60 dakikalık satıra geçmek ya da A4 seçmek sorunu çözer.'],
    ['Aynı sayfayı her gün kullanmak istiyorum, ne yapmalıyım?', '"Tarihsiz" seçeneğini işaretleyip tek sayfa oluşturun ve yazıcıdan istediğiniz kadar kopya alın. Tarihi her sabah sağ üstteki çizgiye elle yazarsınız.'],
    ['Bir haftalık saatlik plan alabilir miyim?', 'Evet. Tarihli seçenekte ilk günün tarihini girip sayfa sayısına 7 yazın; her güne bir sayfa olmak üzere yedi sayfalık bir dosya oluşur.'],
    ['Girdiğim bilgiler saklanıyor mu?', 'Hayır. PDF dosyası tarayıcınızda, kendi cihazınızda üretilir. Saatler, tarih ve başlık sunucuya gönderilmez.'],
  ],
  related: ['gunluk-planlayici', 'haftalik-planlayici', 'yapilacaklar-listesi-olustur', 'ders-programi-olustur', 'aliskanlik-takip-cizelgesi'],
};
